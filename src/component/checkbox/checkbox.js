class ClCheckbox extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    if (this.shadowRoot.querySelector('input[type="checkbox"]')) {
      return;
    }

    this.shadowRoot.innerHTML = `
      <style>
        .wrapper {
          display: inline-flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .checkbox-row {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          cursor: pointer;
        }

        .text-input {
          margin-top: 10px;
        }

        .text-input[hidden] {
          display: none;
        }
      </style>

      <div class="wrapper">
        <label class="checkbox-row">
          <input class="checkbox" type="checkbox" />
          <slot></slot>
        </label>

        <input
          class="text-input"
          type="text"
          placeholder="请输入内容"
          hidden
        />
      </div>
    `;

    const checkbox = this.shadowRoot.querySelector('.checkbox');
    const textInput = this.shadowRoot.querySelector('.text-input');

    checkbox.addEventListener('change', () => {
      textInput.hidden = !checkbox.checked;

      // 可选：取消勾选时清空内容
      if (!checkbox.checked) { 
        textInput.value = '';
      }
    });
  }
}

if (!customElements.get('cl-checkbox')) {
  customElements.define('cl-checkbox', ClCheckbox);
}