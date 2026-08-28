class ClCheckbox extends HTMLElement {
  static get observedAttributes() {
    return ['checked', 'disabled', 'value'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    this.checkbox = null;
  }

  connectedCallback() {
    if (this.shadowRoot.querySelector('input[type="checkbox"]')) {
      return;
    }

    this.shadowRoot.innerHTML = `
      <style>
        .checkbox-row {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          cursor: pointer;
        }
      </style>

      <label class="checkbox-row">
        <input class="checkbox" type="checkbox" />
        <slot></slot>
      </label>
    `;

    this.checkbox = this.shadowRoot.querySelector('.checkbox');
    this.syncState();

    this.checkbox.addEventListener('change', (event) => {
      event.stopPropagation();

      this.checked = this.checkbox.checked;
      this.dispatchEvent(
        new CustomEvent('change', {
          bubbles: true,
          composed: true,
          detail: {
            checked: this.checked,
            value: this.value,
          },
        }),
      );
    });
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue || !this.checkbox) {
      return;
    }

    this.syncState(name);
  }

  syncState(changedAttribute) {
    if (!this.checkbox) {
      return;
    }

    if (!changedAttribute || changedAttribute === 'checked') {
      this.checkbox.checked = this.hasAttribute('checked');
    }

    if (!changedAttribute || changedAttribute === 'disabled') {
      this.checkbox.disabled = this.hasAttribute('disabled');
    }

    if (!changedAttribute || changedAttribute === 'value') {
      this.checkbox.value = this.value;
    }
  }

  get checked() {
    return this.checkbox ? this.checkbox.checked : this.hasAttribute('checked');
  }

  set checked(value) {
    if (value) {
      this.setAttribute('checked', '');
    } else {
      this.removeAttribute('checked');
    }
  }

  get disabled() {
    return this.hasAttribute('disabled');
  }

  set disabled(value) {
    if (value) {
      this.setAttribute('disabled', '');
    } else {
      this.removeAttribute('disabled');
    }
  }

  get value() {
    return this.getAttribute('value') ?? '';
  }

  set value(value) {
    this.setAttribute('value', value);
  }
}

if (!customElements.get('cl-checkbox')) {
  customElements.define('cl-checkbox', ClCheckbox);
}
