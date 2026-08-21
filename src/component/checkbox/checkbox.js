class ClCheckbox extends HTMLElemnt {
  constructor() {
    super();

    this.attachShadow({ mode:'open'});
  }

  connectedCallback() {
    if (this.shadowRoot.querySelector('input')) {
      return;
    }

    this.shadowRoot.innerHTML = `
      <style>
        label {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          cursor: pointer;
        }

        input {
          cursor: pointer;
        }
      </style>

      <label>
        <input type="checkbox" />
        <slot></slot>
      </label>
    `;
  }
}

if (!customElements.get('cl-checkbox')) {
  customElements.define('cl-checkbox', ClCheckbox);
}