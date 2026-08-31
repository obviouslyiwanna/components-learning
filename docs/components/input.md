# cl-input

`cl-input` 在 Shadow DOM 中渲染一个最基础的原生 `<input type="text">`，不包含样式和复杂功能。

## 基础使用

```html
<cl-input id="username-input"></cl-input>

<script>
  const input = document.querySelector('#username-input');

  input.value = 'Carrie';
  console.log(input.value);
</script>
```

## Attributes

当前没有组件专属 Attribute。

## Properties

| 名称 | 类型 | 说明 |
| --- | --- | --- |
| `value` | string | 读取或设置内部原生输入框的值 |

```js
const input = document.querySelector('cl-input');

input.value = '学习 Web Components';
console.log(input.value);
```

## Events

当前没有组件自定义事件。组件内部的原生输入事件暂未封装为公共 API。

## 当前限制

- 当前只支持文本输入，不支持 `placeholder`、`disabled`、`type` 等 Attribute。
- 当前不支持表单关联，不会自动参与 `<form>` 提交。
- 组件不提供额外样式，外观使用浏览器原生样式。
