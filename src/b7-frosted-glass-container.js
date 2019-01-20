import {LitElement, html} from 'lit-element';

class B7FrostedGlassContainer extends LitElement
{
	constructor()
	{
		super();
		this.stretch = false
	}

	render ()
	{
		return html`
			<style>
				:host {
					display: block;
					overflow: hidden;
				}

				.stretch {
					margin: -5%;
				}
			</style>
			<div class=${this.stretch ? `stretch` : ''}>
				<slot></slot>
			</div>
		`;
	}

	firstRendered()
	{
	}
}

customElements.define('b7-frosted-glass-container', B7FrostedGlassContainer);
