class B7FrostedGlass extends HTMLElement
{
	constructor() {
		super();
		let shadowRoot = this.attachShadow({mode: 'open'});
		this.shadowRoot.innerHTML = this.render();
	}

	render ()
	{
		let html = (strings) => strings.join();
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
			</style>

			<div id="blur">
				<div id="blur-content"></div>
				<div id="overlay"></div>
			</div>
			<div id="content">
				<slot></slot>
			</div>
		`;
	}

	connectedCallback()
	{
		this.blurContainer = this.shadowRoot.getElementById('blur');
		this.blurContent = this.shadowRoot.getElementById('blur-content').attachShadow({mode: 'open'});
		
		this._updateBlurContent();
		
		window.addEventListener('resize', _ => this._handleResize());
		if (window.getComputedStyle(this).position === 'fixed') {
			window.addEventListener('scroll', _ => this._updateBlurPosition(), {passive: true});
		}
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
		const rect2 = this.ownerDocument.documentElement.getBoundingClientRect();
		this.blurContent.host.style.setProperty('--frosted-glass_-_offset-left', `${ 0 - (rect.left - rect2.left) }px`);
		this.blurContent.host.style.setProperty('--frosted-glass_-_offset-top', `${ 0 - (rect.top - rect2.top) }px`);
	}

	_stampWithStyles(node, to) {
		if (node.nodeName == 'B7-FROSTED-GLASS') return null;
		let copy = node.cloneNode(false);
		if (node.nodeType != Node.DOCUMENT_TYPE_NODE) to.appendChild(copy);
		node.childNodes.forEach(child => this._stampWithStyles(child, copy));
		if (node.nodeType == Node.ELEMENT_NODE && node.nodeName != 'BODY' && node.nodeName != 'STYLE' && node.nodeName != 'HTML' && node.nodeName != 'HEAD') {
			let style = window.getComputedStyle(copy);
			let s = window.getComputedStyle(node);
			let css = [];
			for (let std of s) {
				if (s[std] != style[std] && ['pointer-events', 'perspective-origin', 'transform-origin'].indexOf(std) < 0) {
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
			this._stampWithStyles(this.ownerDocument.documentElement, this.blurContent);
			this._updatingBlurContent = false;
		});
		this._updatingBlurContent = true;
	}
}

window.customElements.define('b7-frosted-glass', B7FrostedGlass);
