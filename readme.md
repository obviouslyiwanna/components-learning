# @carriefish/component-learning

一个使用原生 JavaScript、Web Components 和 Webpack 构建的组件库。

当前处于早期 `0.x` 阶段，组件 API 可能继续调整。

## 安装

```bash
npm install @carriefish/component-learning
```

## 快速开始

在应用入口中引入一次组件库：

```js
import '@carriefish/component-learning';
```

之后可以直接在 HTML 中使用自定义元素：

```html
<cl-button>提交</cl-button>
<cl-checkbox value="agreement">同意协议</cl-checkbox>
<cl-tag>推荐</cl-tag>

<cl-card>
  <span slot="title">卡片标题</span>
  卡片内容
</cl-card>
```

## 组件

| 组件 | 用途 | API 文档 |
| --- | --- | --- |
| `cl-button` | 提供带默认插槽的原生按钮 | [Button](docs/components/button.md) |
| `cl-checkbox` | 提供选中、禁用、值同步和变更事件 | [Checkbox](docs/components/checkbox.md) |
| `cl-tag` | 展示轻量标签内容 | [Tag](docs/components/tag.md) |
| `cl-card` | 展示带标题和正文区域的卡片 | [Card](docs/components/card.md) |

## 原生 Demo

[examples/index.html](examples/index.html) 展示了全部组件，并包含 `cl-checkbox` 的 Attribute、Property 和事件交互。

先生成组件库文件：

```bash
npm install
npm run build
```

然后用浏览器打开 `examples/index.html`。Demo 会直接加载本地的 `dist/index.js`，不依赖 React 或其他框架。

## API 约定

- Boolean Attribute 通过属性是否存在表示真假，例如 `checked` 和 `disabled`。
- 可变状态优先通过组件 Property 设置，例如 `checkbox.checked = true`。
- 组件自定义事件会在对应组件文档中列出；未列出的事件不属于当前公共 API。
- 插槽名称和使用方式以对应组件文档为准。

## 开发

```bash
npm install
npm run build
```

源码入口是 `src/index.js`，构建后的入口是 `dist/index.js`。

## 浏览器支持

组件依赖 Custom Elements、Shadow DOM、Slots 和 CustomEvent。请在支持这些 Web Components 标准的现代浏览器中使用。

## License

MIT
