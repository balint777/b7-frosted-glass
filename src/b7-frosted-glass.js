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
					filter: blur(var(--frosted-glass-blur-radius, 5rem));
					transform: translate(var(--frosted-glass_-_offset-left, 0px), var(--frosted-glass_-_offset-top, 0px));
					pointer-events: none;
				}
				
				#overlay {
					background-color: var(--frosted-glass-tint, transparent);
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
		
		window.addEventListener('resize', _ => this._handleResize());
		if (this.isFixed) window.addEventListener('scroll', _ => this._updateBlurPosition(), {passive: false});
		this._handleResize();
	}

	_handleResize() {
		if (!this._resizing) window.requestAnimationFrame(_ => {
			this._updateBlurPosition();
			this._updateBlurContent();
			this._resizing = false;
		});
		this._resizing = true;
	}

	_updateBlurPosition() {
		const rect = this.blurContainer.getBoundingClientRect();
		const rect2 = this.container.getBoundingClientRect();
		this.blurContent.style.setProperty('--frosted-glass_-_offset-left', `${ 0 - (rect.left - rect2.left) }px`);
		this.blurContent.style.setProperty('--frosted-glass_-_offset-top', `${ 0 - (rect.top - rect2.top) }px`);
	}

	_stampWithStyles(node, to) {
		if (node.nodeName == 'B7-FROSTED-GLASS') return null;
		let copy = (node.nodeName == 'B7-FROSTED-GLASS-CONTAINER') ? document.createElement('div') : node.cloneNode(false);
		to.appendChild(copy);
		node.childNodes.forEach(child => {
			let child_copy = this._stampWithStyles(child, copy);
			if (child_copy) copy.appendChild(child_copy);
		});
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
