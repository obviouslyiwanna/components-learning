// 写组件类
class ClButton extends HTMLElement {
  static get observedAttributes() {
    return ['disabled', 'variant'];
  }

  constructor() {
    super();

    this.attachShadow({ mode: "open" });
    this.button = null;
  }
  // 组件拥有自己的shadow DOM 渲染原生按钮
  connectedCallback() {
    // 避免重复渲染
    if (this.shadowRoot.querySelector('button')) {
      return;
    }

    this.shadowRoot.innerHTML = `
      <button type="button">
        <slot></slot>
      </button>
      <style>
        button {
          --button-background: #1890ff;
          --button-hover-background: #40a9ff;
          --button-active-background: #096dd9;
          --button-border: #1890ff;
          --button-hover-border: #40a9ff;
          --button-active-border: #096dd9;
          --button-text: #ffffff;
          --button-hover-text: #ffffff;
          --button-active-text: #ffffff;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 32px;
          padding: 4px 15px;
          border: 1px solid var(--button-border);
          border-radius: 6px;
          background: var(--button-background);
          color: var(--button-text);
          cursor: pointer;
          font: inherit;
          font-size: 14px;
          font-weight: 400;
          line-height: 1.5715;
          box-shadow: 0 2px 0 rgb(0 0 0 / 2%);
          transition:
            color 160ms ease,
            background 160ms ease,
            border-color 160ms ease,
            box-shadow 160ms ease;
        }

        button:not(:disabled):hover {
          background: var(--button-hover-background);
          border-color: var(--button-hover-border);
          color: var(--button-hover-text);
        }

        button:not(:disabled):active {
          background: var(--button-active-background);
          border-color: var(--button-active-border);
          color: var(--button-active-text);
        }

        button:focus-visible {
          outline: 2px solid rgb(24 144 255 / 35%);
          outline-offset: 2px;
        }

        button:disabled {
          border-color: #d9d9d9;
          background: #f5f5f5;
          color: rgb(0 0 0 / 25%);
          cursor: not-allowed;
          box-shadow: none;
        }

        :host([variant="default"]) button,
        :host([variant="neutral"]) button {
          --button-background: #ffffff;
          --button-hover-background: #ffffff;
          --button-active-background: #ffffff;
          --button-border: #d9d9d9;
          --button-hover-border: #40a9ff;
          --button-active-border: #096dd9;
          --button-text: rgb(0 0 0 / 85%);
          --button-hover-text: #40a9ff;
          --button-active-text: #096dd9;
        }

        :host([variant="success"]) button {
          --button-background: #16a34a;
          --button-hover-background: #22c55e;
          --button-active-background: #15803d;
          --button-border: #16a34a;
          --button-hover-border: #22c55e;
          --button-active-border: #15803d;
        }

        :host([variant="warning"]) button {
          --button-background: #d97706;
          --button-hover-background: #f59e0b;
          --button-active-background: #b45309;
          --button-border: #d97706;
          --button-hover-border: #f59e0b;
          --button-active-border: #b45309;
        }

        :host([variant="danger"]) button {
          --button-background: #dc2626;
          --button-hover-background: #ef4444;
          --button-active-background: #b91c1c;
          --button-border: #dc2626;
          --button-hover-border: #ef4444;
          --button-active-border: #b91c1c;
        }
      </style>
    `;

    // 保存 Shadow DOM 里的原生按钮
    this.button = this.shadowRoot.querySelector('button');

    // 内部按钮创建完成后，先同步一次初始 Attribute 状态。
    this.syncState();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    // 值没有变化，或者内部按钮还没创建好时，不执行同步。
    if (oldValue === newValue || !this.button) {
      return;
    }

    // 把发生变化的 Attribute 交给统一的状态同步方法处理。
    this.syncState(name);
  }

  // 将 <cl-button> 宿主元素上的状态同步到 Shadow DOM 内部的原生按钮。
  syncState(changedAttribute) {
    if (!this.button) {
      return;
    }

    if (!changedAttribute || changedAttribute === 'disabled') {
      this.button.disabled = this.hasAttribute('disabled');
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

  // 读取按钮样式类型；没有设置时使用 primary 作为默认值。
  get variant() {
    return this.getAttribute('variant') ?? 'primary';
  }

  // 设置按钮样式类型；修改 Attribute 后，Shadow DOM 中的 :host CSS 会匹配对应样式。
  set variant(value) {
    this.setAttribute('variant', value);
  }
}
// 注册组件
if (!customElements.get('cl-button')) {
  customElements.define('cl-button', ClButton);
}
