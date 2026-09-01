import { afterEach, describe, expect, it } from 'vitest';
import './tag.js';

describe('cl-tag', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  // 验证组件挂载时会创建标签容器和默认插槽。
  it('挂载后渲染标签结构', () => {
    const element = document.createElement('cl-tag');

    document.body.appendChild(element);

    expect(element.shadowRoot.querySelector('span')).not.toBeNull();
    expect(element.shadowRoot.querySelector('slot')).not.toBeNull();
  });

  // 验证宿主元素中的内容会被分配给默认插槽，而不是复制进 Shadow DOM。
  it('将子元素分配给默认插槽', () => {
    const element = document.createElement('cl-tag');
    const content = document.createElement('strong');
    content.textContent = '户外';
    element.appendChild(content);

    document.body.appendChild(element);

    const slot = element.shadowRoot.querySelector('slot');

    expect(slot.assignedElements()).toEqual([content]);
  });

  // 验证元素被重新挂载时不会重复创建标签容器。
  it('重复挂载时不重复渲染标签结构', () => {
    const element = document.createElement('cl-tag');
    document.body.appendChild(element);

    element.remove();
    document.body.appendChild(element);

    expect(element.shadowRoot.querySelectorAll('span')).toHaveLength(1);
  });
});
