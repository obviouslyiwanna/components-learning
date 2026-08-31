class ClCheckbox extends HTMLElement {
  // 三种属性：checked、disabled、value，选择其他的时候会显示一个输入框
  static get observedAttributes() {
    return ['checked', 'disabled', 'value'];
  }

  // 初始化 Shadow DOM，并保存后续需要操作的内部元素引用。
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    this.checkbox = null;
    this.labelSlot = null;
    this.otherInput = null;
  }

  // 组件挂载时渲染内部结构，并绑定插槽和原生复选框的事件。
  connectedCallback() {
    // 避免组件重复挂载时重复渲染和绑定事件。
    if (this.shadowRoot.querySelector('input[type="checkbox"]')) {
      return;
    }

    this.shadowRoot.innerHTML = `
      <style>
        .checkbox-wrapper {
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

        .other-input {
          width: 180px;
          box-sizing: border-box;
          margin-top: 8px;
          padding: 6px 8px;
        }

        .other-input[hidden] {
          display: none;
        }
      </style>

      <div class="checkbox-wrapper">
        <label class="checkbox-row">
          <input class="checkbox" type="checkbox" />
          <slot></slot>
        </label>

        <input
          class="other-input"
          type="text"
          placeholder="请输入其他内容"
          hidden
        />
      </div>
    `;

    this.checkbox = this.shadowRoot.querySelector('.checkbox');
    this.labelSlot = this.shadowRoot.querySelector('slot');
    this.otherInput = this.shadowRoot.querySelector('.other-input');
    this.syncState();

    // 插槽内容变化时，重新判断是否需要显示“其他内容”输入框。
    this.labelSlot.addEventListener('slotchange', () => {
      this.updateOtherInput();
    });

    // 将原生复选框的变化同步到组件，并向外派发自定义 change 事件。
    this.checkbox.addEventListener('change', (event) => {
      event.stopPropagation();

      this.checked = this.checkbox.checked;
      this.updateOtherInput();
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

  // 监听宿主元素 Attribute 变化，并同步到 Shadow DOM 内部控件。
  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue || !this.checkbox) {
      return;
    }

    this.syncState(name);
  }

  // 将宿主元素上的 checked、disabled、value 状态同步到原生复选框。
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

    this.updateOtherInput();
  }

  // 根据插槽文本和选中状态，控制“其他内容”输入框的显示与清空。
  updateOtherInput() {
    if (!this.checkbox || !this.labelSlot || !this.otherInput) {
      return;
    }

    const labelText = this.labelSlot
      .assignedNodes({ flatten: true })
      .map((node) => node.textContent ?? '')
      .join('')
      .trim();
    const shouldShow = labelText === '其他' && this.checkbox.checked;

    this.otherInput.hidden = !shouldShow;

    if (!shouldShow) {
      this.otherInput.value = '';
    }
  }

  // 读取复选框选中状态；内部控件尚未创建时回退到 checked Attribute。
  get checked() {
    return this.checkbox ? this.checkbox.checked : this.hasAttribute('checked');
  }

  // 设置复选框选中状态，并通过 Attribute 触发内部状态同步。
  set checked(value) {
    if (value) {
      this.setAttribute('checked', '');
    } else {
      this.removeAttribute('checked');
    }
  }

  // 读取复选框是否禁用。
  get disabled() {
    return this.hasAttribute('disabled');
  }

  // 设置复选框禁用状态。
  set disabled(value) {
    if (value) {
      this.setAttribute('disabled', '');
    } else {
      this.removeAttribute('disabled');
    }
  }

  // 读取复选框的值；没有设置时返回空字符串。
  get value() {
    return this.getAttribute('value') ?? '';
  }

  // 设置复选框的值。
  set value(value) {
    this.setAttribute('value', value);
  }
}

if (!customElements.get('cl-checkbox')) {
  customElements.define('cl-checkbox', ClCheckbox);
}
