class ClInput extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.input = null;
  }

  connectedCallback() {
    // 避免组件重复挂载时重复渲染输入框。
    if (this.shadowRoot.querySelector('input')) {
      return;
    }

    this.shadowRoot.innerHTML = '<input type="text" />';
    // 保存内部输入框，供 value 的 getter 和 setter 使用。
    this.input = this.shadowRoot.querySelector('input');
  }

  // 读取内部原生输入框的当前值。
  get value() {
    return this.input ? this.input.value : '';
  }

  // 设置内部原生输入框的值。
  set value(value) {
    if (this.input) {
      this.input.value = value;
    }
  }
}

// 避免重复注册。
if (!customElements.get('cl-input')) {
  customElements.define('cl-input', ClInput);
}
