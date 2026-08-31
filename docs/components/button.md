# cl-button

`cl-button` 在 Shadow DOM 中渲染一个原生 `<button type="button">`，组件内容通过默认插槽传入。

## 基础使用

```html
<cl-button id="submit-button">提交</cl-button>

<script>
  document.querySelector('#submit-button').addEventListener('click', () => {
    console.log('clicked');
  });
</script>
```

## Attributes

当前没有组件专属 Attribute。

## Properties

当前没有组件专属 Property。

## Events

组件当前不派发自定义事件。可以在宿主元素上监听内部原生按钮产生的 `click` 事件。

| 事件 | 说明 |
| --- | --- |
| `click` | 用户点击内部原生按钮时触发的原生事件 |

## Slots

| 名称 | 说明 |
| --- | --- |
| 默认插槽 | 按钮显示内容 |

## 当前限制

- 宿主元素上的 `disabled`、`type` 等 Attribute 尚未同步到内部原生按钮。
- 当前没有主题、尺寸或类型变体。
