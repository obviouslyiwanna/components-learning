import { afterEach, describe, expect, it } from 'vitest';
import './input.js';

describe('cl-input', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  // 验证组件挂载时会在 Shadow DOM 中创建文本输入框。
  it('挂载后渲染内部文本输入框', () => {
    const element = document.createElement('cl-input');

    document.body.appendChild(element);

    const input = element.shadowRoot.querySelector('input');

    expect(input).not.toBeNull();
    expect(input.type).toBe('text');
  });

  // 验证 value Property 的写入和读取都代理到内部原生输入框。
  it('通过 value Property 读写输入值', () => {
    const element = document.createElement('cl-input');
    document.body.appendChild(element);

    element.value = '周末灵感';

    expect(element.value).toBe('周末灵感');
    expect(element.shadowRoot.querySelector('input').value).toBe('周末灵感');
  });

  // 验证内部输入值发生变化后，组件 getter 会返回最新的真实值。
  it('读取内部输入框的最新值', () => {
    const element = document.createElement('cl-input');
    document.body.appendChild(element);

    element.shadowRoot.querySelector('input').value = '露营';

    expect(element.value).toBe('露营');
  });

  // 验证元素被重新挂载时不会重复创建内部输入框。
  it('重复挂载时不重复渲染内部输入框', () => {
    const element = document.createElement('cl-input');
    document.body.appendChild(element);

    element.remove();
    document.body.appendChild(element);

    expect(element.shadowRoot.querySelectorAll('input')).toHaveLength(1);
  });
});
