class ClTag extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({
      mode: "open"
    });
  }

  connectedCallback() {
    if (this.shadowRoot.querySelector('span')){
      return;
    }

    this.shadowRoot.innerHTML = `
      <span>
        <slot></slot>
      </span>
      <style>
        span {
          display: inline-flex;
          align-items: center;
          padding: 4px 10px;
          border-radius: 999px;
          font-size: 12px;
          line-height: 20px;
          background: #f0f5ff;
          color: #2f54eb;
          border: 1px solid #adc6ff;
          box-sizing: border-box;
        }
      </style>`
  };
}

if (!customElements.get('cl-tag')) {
  customElements.define('cl-tag', ClTag);
}