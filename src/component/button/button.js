// 写组件类
class ClButton extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });
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
          padding: 8px 16px;
          border: 0;
          border-radius: 4px;
          background: #1677ff;
          color: white;
          cursor: pointer;
        }

        button:hover {
          background: #4096ff;
        }
      </style>

      <button type="button">
        <slot></slot>
      </button>
    `;
  }
}
// 注册组件
if (!customElements.get('cl-button')) {
  customElements.define('cl-button', ClButton);
}