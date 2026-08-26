当前为早期版本，包含 cl-button 和 cl-checkbox。
API 可能会继续调整。
 # @carriefish/component-learning

Native Web Components library built with JavaScript and Webpack.

## Install

```bash
npm install @carriefish/component-learning
```

## Use

Import the package entry once in your application:

```js
import '@carriefish/component-learning';
```

Then use the custom elements in HTML:

```html
<cl-button>提交</cl-button>
<cl-checkbox>同意协议</cl-checkbox>
```

The package currently provides:

- `cl-button`: a native button with slotted content.
- `cl-checkbox`: a checkbox that reveals a text input when checked.

This package is currently an early `0.x` release, so the component API may change in later versions.

## Development

```bash
npm install
npm run build
```

The distributable entry is `dist/index.js`.

## License

MIT
