import { afterEach, describe, expect, it } from 'vitest';
import './card.js';

describe('cl-card', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  // 验证组件挂载时会渲染卡片的文章、标题区和内容区结构。
  it('挂载后渲染卡片结构', () => {
    const element = document.createElement('cl-card');

    document.body.appendChild(element);

    expect(element.shadowRoot.querySelector('article')).not.toBeNull();
    expect(element.shadowRoot.querySelector('header')).not.toBeNull();
    expect(element.shadowRoot.querySelector('section')).not.toBeNull();
  });

  // 验证带 title 名称的子元素进入标题插槽，普通子元素进入默认内容插槽。
  it('将标题和正文分配到对应插槽', () => {
    const element = document.createElement('cl-card');
    const title = document.createElement('h2');
    const content = document.createElement('p');
    title.slot = 'title';
    title.textContent = '周末计划';
    content.textContent = '去露营';
    element.append(title, content);

    document.body.appendChild(element);

    const titleSlot = element.shadowRoot.querySelector('slot[name="title"]');
    const contentSlot = element.shadowRoot.querySelector('section slot');

    expect(titleSlot.assignedElements()).toEqual([title]);
    expect(contentSlot.assignedElements()).toEqual([content]);
  });

  // 验证元素被重新挂载时不会重复创建卡片主体。
  it('重复挂载时不重复渲染卡片结构', () => {
    const element = document.createElement('cl-card');
    document.body.appendChild(element);

    element.remove();
    document.body.appendChild(element);

    expect(element.shadowRoot.querySelectorAll('article')).toHaveLength(1);
  });
});
