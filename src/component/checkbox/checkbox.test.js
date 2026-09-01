import { afterEach, describe, expect, it, vi } from 'vitest';
import './checkbox.js';

describe('cl-checkbox', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  // 验证组件首次挂载时会把 checked、disabled 和 value Attribute 同步到原生复选框。
  it('将初始 Attributes 同步到内部复选框', () => {
    const element = document.createElement('cl-checkbox');
    element.setAttribute('checked', '');
    element.setAttribute('disabled', '');
    element.setAttribute('value', 'weekend');

    document.body.appendChild(element);

    const checkbox = element.shadowRoot.querySelector('.checkbox');

    expect(checkbox.checked).toBe(true);
    expect(checkbox.disabled).toBe(true);
    expect(checkbox.value).toBe('weekend');
  });

  // 验证外部通过 Property 修改状态时，同名 Attribute 和内部原生控件会保持一致。
  it('将 Property 修改同步到 Attributes 和内部复选框', () => {
    const element = document.createElement('cl-checkbox');
    document.body.appendChild(element);

    element.checked = true;
    element.disabled = true;
    element.value = 'custom';

    const checkbox = element.shadowRoot.querySelector('.checkbox');

    expect(element.hasAttribute('checked')).toBe(true);
    expect(element.hasAttribute('disabled')).toBe(true);
    expect(element.getAttribute('value')).toBe('custom');
    expect(checkbox.checked).toBe(true);
    expect(checkbox.disabled).toBe(true);
    expect(checkbox.value).toBe('custom');

    element.checked = false;
    element.disabled = false;

    expect(element.hasAttribute('checked')).toBe(false);
    expect(element.hasAttribute('disabled')).toBe(false);
    expect(checkbox.checked).toBe(false);
    expect(checkbox.disabled).toBe(false);
  });

  // 验证用户操作内部复选框后，组件会对外派发一次可冒泡、可穿透 Shadow DOM 的 change 事件。
  it('在内部状态变化时派发带明细的 change 事件', () => {
    const element = document.createElement('cl-checkbox');
    element.value = 'idea';
    document.body.appendChild(element);

    const listener = vi.fn();
    const checkbox = element.shadowRoot.querySelector('.checkbox');
    element.addEventListener('change', listener);

    checkbox.checked = true;
    checkbox.dispatchEvent(new Event('change', { bubbles: true, composed: true }));

    expect(listener).toHaveBeenCalledTimes(1);

    const changeEvent = listener.mock.calls[0][0];

    expect(changeEvent.detail).toEqual({ checked: true, value: 'idea' });
    expect(changeEvent.bubbles).toBe(true);
    expect(changeEvent.composed).toBe(true);
    expect(element.checked).toBe(true);
  });

  // 验证标签为“其他”且已选中时显示补充输入框，取消选中后隐藏并清空内容。
  it('根据“其他”的选中状态控制补充输入框', () => {
    const element = document.createElement('cl-checkbox');
    element.textContent = '其他';
    element.setAttribute('checked', '');
    document.body.appendChild(element);

    const otherInput = element.shadowRoot.querySelector('.other-input');

    expect(otherInput.hidden).toBe(false);

    otherInput.value = '户外写生';
    element.checked = false;

    expect(otherInput.hidden).toBe(true);
    expect(otherInput.value).toBe('');
  });

  // 验证普通标签即使被选中也不会显示仅供“其他”选项使用的补充输入框。
  it('普通选项被选中时仍隐藏补充输入框', () => {
    const element = document.createElement('cl-checkbox');
    element.textContent = '露营';
    element.setAttribute('checked', '');

    document.body.appendChild(element);

    expect(element.shadowRoot.querySelector('.other-input').hidden).toBe(true);
  });

  // 验证元素重新挂载后不会重复渲染，也不会为同一次操作派发重复事件。
  it('重复挂载时不重复渲染和绑定事件', () => {
    const element = document.createElement('cl-checkbox');
    document.body.appendChild(element);

    element.remove();
    document.body.appendChild(element);

    const listener = vi.fn();
    const checkbox = element.shadowRoot.querySelector('.checkbox');
    element.addEventListener('change', listener);
    checkbox.checked = true;
    checkbox.dispatchEvent(new Event('change', { bubbles: true, composed: true }));

    expect(element.shadowRoot.querySelectorAll('.checkbox')).toHaveLength(1);
    expect(listener).toHaveBeenCalledTimes(1);
  });
});
