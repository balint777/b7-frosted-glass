import {LitElement, html} from 'lit-element';

class B7FrostedGlass extends LitElement
{
	constructor()
	{
		super();
		this.isFixed = false;
	}

	render ()
	{
		return html`
			<style>
				:host {
					position: relative;
					background: white;
				}

				#blur {
					height: 100%;
					left: 0;
					overflow: hidden;
					position: absolute;
					top: 0;
					transform: translateY(0);
					width: 100%;
				}

				#blur-content {
					left: 0;
					position: absolute;
					width: 100vw;
					left: var(--frosted-glass_-_offset-left, 0px);
					top: var(--frosted-glass_-_offset-top, 0px);
					filter: blur(var(--frosted-glass-blur-radius, 5rem));
					transform: translateY(var(--frosted-glass_-_scroll-offset, 0px));
					pointer-events: none;
				}
				
				#overlay {
					background-color: var(--frosted-glass-overlay-color, transparent);
					bottom: 0;
					content: '';
					left: 0;
					position: absolute;
					right: 0;
					top: 0;
				}

				#content {
					position: relative;
				}
				#content.fixed {
					bottom: 0;
					left: 0;
					position: absolute;
					right: 0;
					top: 0;
				}
			</style>

			<div id="blur">
				<div id="blur-content"></div>
				<div id="overlay"></div>
			</div>
			<div id="content" clsass="${this.isFixed ? ' fixed': ''}">
				<slot></slot>
			</div>
		`;
	}

	firstUpdated()
	{
		this.container = ((element, selector) => {
			while (element && element.nodeType === 1) {
				if (element.matches(selector)) return element;
				element = element.parentNode;
			}
			return null;
		})(this, 'b7-frosted-glass-container');
		this.blurContainer = this.shadowRoot.getElementById('blur');
		this.blurContent = this.shadowRoot.getElementById('blur-content');
		this.isFixed = window.getComputedStyle(this).position === 'fixed';
		
		this._updateBlurContent();
		
		window.addEventListener('resize', _ => this.handleResize());
		this.handleResize();

		if (!this.isFixed) { return; }
		
		window.addEventListener('scroll', _ => this.handleScroll(), {passive: false});
		this.handleScroll();
	}

	handleResize() {
		const rect = this.blurContainer.getBoundingClientRect();
		this.blurContent.style.setProperty('--frosted-glass_-_offset-left', `-${rect.left}px`);
		this.blurContent.style.setProperty('--frosted-glass_-_offset-top', `-${this.isFixed ? rect.top : rect.top + window.scrollY}px`);
		this._updateBlurContent();
	}

	handleScroll() {
		this.blurContent.style.setProperty('--frosted-glass_-_scroll-offset', `-${window.scrollY}px`);
	}

	_stampWithStyles(node, to) {
		let copy = (node.nodeName == 'B7-FROSTED-GLASS' || node.nodeName == 'B7-FROSTED-GLASS-CONTAINER') ? document.createElement('div') : node.cloneNode(false);
		to.appendChild(copy);
		node.childNodes.forEach(child => copy.appendChild(this._stampWithStyles(child, copy)));
		if (node.nodeType == 1) {
			let style = window.getComputedStyle(copy);
			let s = window.getComputedStyle(node);
			let css = [];
			for (let std of s) {
				if (s[std] != style[std]) {
					css.push(`${std}:${s[std]}`);
				}
			}
			copy.style.cssText = css.join(';');
		}
		return copy;
	}

	_updateBlurContent() {
		if (!this._updatingBlurContent) window.requestAnimationFrame(_ => {
			this.blurContent.childNodes.forEach(child => this.blurContent.removeChild(child));
			this._stampWithStyles(this.container, this.blurContent);
			this._updatingBlurContent = false;
		});
		this._updatingBlurContent = true;
	}
}

customElements.define('b7-frosted-glass', B7FrostedGlass);
