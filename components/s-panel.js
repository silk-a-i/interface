class SPanel extends HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
  }

  static get observedAttributes() {
    return ['title'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'title' && this.shadowRoot) {
      const titleSpan = this.shadowRoot.querySelector('.panel-header span')
      if (titleSpan) {
        titleSpan.textContent = newValue || 'Panel'
      }
    }
  }

  connectedCallback () {
    const title = this.getAttribute('title') || 'Panel'
    const isOpen = this.hasAttribute('open')

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: flex;
          flex-direction: column;
          background: rgba(255, 255, 255, 0.06);
          border-radius: 8px;
          overflow: hidden;
        }
        .panel-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px;
          cursor: pointer;
          background: rgba(255, 255, 255, 0.1);
          transition: background 0.3s ease;
        }
        .panel-header:hover {
          background: rgba(255, 255, 255, 0.15);
        }
        .panel-content {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.3s ease, padding 0.3s ease;
          padding: 0 12px;
        }
        .panel-content.open {
          max-height: 500px;
          padding: 12px;
        }
        .toggle-icon {
          transition: transform 0.3s ease;
        }
        .toggle-icon.rotated {
          transform: rotate(180deg);
        }
      </style>
      <div class="panel-header">
        <span>${title}</span>
        <span class="toggle-icon">▼</span>
      </div>
      <div class="panel-content ${isOpen ? 'open' : ''}">
        <slot></slot>
      </div>
    `

    const header = this.shadowRoot.querySelector('.panel-header')
    const content = this.shadowRoot.querySelector('.panel-content')
    const icon = this.shadowRoot.querySelector('.toggle-icon')

    header.addEventListener('click', (e) => {
      e.preventDefault()
      e.stopPropagation()
      content.classList.toggle('open')
      icon.classList.toggle('rotated')
    })
  }
}

customElements.define('s-panel', SPanel)
