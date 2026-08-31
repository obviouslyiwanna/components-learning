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

| Attribute | 说明 |
| --- | --- |
| `variant` | 按钮颜色语义，可选 `primary`（默认）、`default`、`success`、`warning`、`danger`、`neutral` |
| `disabled` | 禁用按钮，存在该 Attribute 即为禁用 |

## Properties

| Property | 说明 |
| --- | --- |
| `variant` | 读写按钮颜色语义 |
| `disabled` | 读写禁用状态 |

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

- 当前只提供基础颜色语义，没有尺寸、outline 等变体。
- `type` 等其他 Attribute 尚未同步到内部原生按钮。
