class B7FrostedGlass extends HTMLElement
{
	constructor() {
		super();
		let shadowRoot = this.attachShadow({mode: 'open'});
		this.shadowRoot.innerHTML = this.render();

		this._updateBlurPositionTask = _ =>
		{
			const rect = this.blurContainer.getBoundingClientRect();
			const rect2 = this.container.getBoundingClientRect();
			this.blurContent.host.style.setProperty('--b7-frosted-glass_-_offset-left', `${ 0 - (rect.left - rect2.left + this.container.scrollLeft) }px`);
			this.blurContent.host.style.setProperty('--b7-frosted-glass_-_offset-top', `${ 0 - (rect.top - rect2.top + this.container.scrollTop) }px`);
			this._updatingBlurPosition = false;
		}

		this._handleResizeTask = _ =>
		{
			this._updateBlurPosition();
			this._updateBlurContent();
			this._resizing = false;
		}
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
					filter: blur(var(--b7-frosted-glass-blur-radius, 5rem));
					transform: translate(var(--b7-frosted-glass_-_offset-left, 0px), var(--b7-frosted-glass_-_offset-top, 0px));
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
		this.rootNode = this.getRootNode();
		this.container = this.rootNode.querySelector('.b7-frosted-glass-container') || ((this.rootNode.nodeType == Node.DOCUMENT_FRAGMENT_NODE) ? this.rootNode.host : this.rootNode.querySelector('body'));
		this.blurContainer = this.shadowRoot.getElementById('blur');
		this.blurContent = this.shadowRoot.getElementById('blur-content').attachShadow({mode: 'open'});
		
		this.blurContentStylesheet = document.createElement('style');
		this.blurContentStylesheet.innerText = [].slice.call(this.rootNode.styleSheets)
		.reduce((prev, styleSheet) => {
			try {
				return prev +
					[].slice.call(styleSheet.cssRules).reduce((prev, cssRule) => prev + cssRule.cssText, '');
			} catch (e) {
				return prev;
			}
		}, '');
		this.blurContent.appendChild(this.blurContentStylesheet);
		
		this._updateBlurContent();
		
		window.addEventListener('resize', this._handleResize.bind(this));
		//if (window.getComputedStyle(this).position === 'fixed') {
			// window.addEventListener('scroll', _ => this._updateBlurPosition(), {passive: true});
			if (window.getComputedStyle(this.container).overflow == 'visible') {
				window.addEventListener('scroll', _ => this._updateBlurPosition(), {passive: true});
			} else {
				this.container.addEventListener('scroll', this._updateBlurPosition.bind(this), {passive: true});
			}
		//}
		this._handleResize();
	}

	_handleResize() {
		if (!this._resizing) window.requestAnimationFrame(this._handleResizeTask);
		this._resizing = true;
	}

	_updateBlurPosition() {
		if (!this._updatingBlurPosition) window.requestAnimationFrame(this._updateBlurPositionTask);
		this._updatingBlurPosition = true;
	}

	_stampWithStyles(node, target) {
		if (['B7-FROSTED-GLASS', 'LINK'].indexOf(node.nodeName) >= 0) return null;
		let copy = null;
		if ([Node.ELEMENT_NODE, Node.TEXT_NODE].indexOf(node.nodeType) >= 0) {
			copy = node.cloneNode(false);
			target.appendChild(copy);
		}
		if ([Node.DOCUMENT_NODE, Node.DOCUMENT_FRAGMENT_NODE].indexOf(node.nodeType) >= 0) {
			copy = target;
		}
		
		node.childNodes.forEach(child => this._stampWithStyles(child, copy));
		if (node.nodeType == Node.ELEMENT_NODE && ['BODY', 'STYLE', 'HTML', 'HEAD'].indexOf(node.nodeName) < 0) {
			let style = window.getComputedStyle(copy);
			let s = window.getComputedStyle(node);
			let css = [];
			for (let std of s) {
				if (s[std] == style[std]) continue;
				if (['pointer-events', 'perspective-origin', 'transform-origin'].indexOf(std) < 0) {
					css.push(`${std}:${s[std]}`);
				}
				if (['perspective-origin', 'transform-origin'].indexOf(std) >= 0 && node == this.container) {
					let parts = s[std].split(' ');
					css.push(`${std}: calc(${parts[0]} - var(--b7-frosted-glass_-_offset-left)) calc(${parts[1]} - var(--b7-frosted-glass_-_offset-top))`);
				}
			}
			copy.style.cssText = css.join(';');
			if (node == this.container) copy.style.overflow = 'visible';
		}
		return copy;
	}

	_updateBlurContent() {
		if (!this._updatingBlurContent) window.requestAnimationFrame(_ => {
			this.blurContent.childNodes.forEach(child => {
				if (child != this.blurContentStylesheet) this.blurContent.removeChild(child);
			});
			this._stampWithStyles(this.container, this.blurContent);
			this._updatingBlurContent = false;
		});
		this._updatingBlurContent = true;
	}
}

window.customElements.define('b7-frosted-glass', B7FrostedGlass);
