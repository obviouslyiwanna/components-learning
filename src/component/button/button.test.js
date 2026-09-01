import { afterEach, describe, expect, it } from 'vitest';
import './button.js';

describe('cl-button', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  // 验证组件挂载时会创建 Shadow DOM，并渲染真正可交互的原生按钮。
  it('挂载后渲染内部原生按钮', () => {
    const element = document.createElement('cl-button');

    document.body.appendChild(element);

    const button = element.shadowRoot.querySelector('button');

    expect(button).not.toBeNull();
  });

  // 验证初始 disabled Attribute 会在首次渲染时同步到内部原生按钮。
  it('将初始 disabled Attribute 同步到内部按钮', () => {
    const element = document.createElement('cl-button');
    element.setAttribute('disabled', '');

    document.body.appendChild(element);

    expect(element.shadowRoot.querySelector('button').disabled).toBe(true);
  });

  // 验证 disabled Property 与同名 Attribute 双向反射，并持续更新内部按钮状态。
  it('通过 disabled Property 切换禁用状态', () => {
    const element = document.createElement('cl-button');
    document.body.appendChild(element);

    element.disabled = true;

    expect(element.hasAttribute('disabled')).toBe(true);
    expect(element.shadowRoot.querySelector('button').disabled).toBe(true);

    element.disabled = false;

    expect(element.hasAttribute('disabled')).toBe(false);
    expect(element.shadowRoot.querySelector('button').disabled).toBe(false);
  });

  // 验证未设置 variant 时使用 primary，设置 Property 后会写回 Attribute。
  it('提供默认 variant 并反射 Property 修改', () => {
    const element = document.createElement('cl-button');

    expect(element.variant).toBe('primary');

    element.variant = 'danger';

    expect(element.variant).toBe('danger');
    expect(element.getAttribute('variant')).toBe('danger');
  });

  // 验证元素被移除后重新挂载不会重复创建 Shadow DOM 内容。
  it('重复挂载时不重复渲染内部按钮', () => {
    const element = document.createElement('cl-button');
    document.body.appendChild(element);

    element.remove();
    document.body.appendChild(element);

    expect(element.shadowRoot.querySelectorAll('button')).toHaveLength(1);
  });
});
