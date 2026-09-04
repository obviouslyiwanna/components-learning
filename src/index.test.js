import { describe, expect, it } from 'vitest';
import './index';

describe('组件库入口', () => {
  // 验证消费者只导入组件库入口时，全部公开组件都会完成注册。
  it('注册所有公开的自定义元素', () => {
    const componentNames = [
      'cl-button',
      'cl-checkbox',
      'cl-input',
      'cl-tag',
      'cl-card',
    ];

    componentNames.forEach((componentName) => {
      expect(customElements.get(componentName)).toBeDefined();
    });
  });
});
