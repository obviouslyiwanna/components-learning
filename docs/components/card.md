# cl-card

`cl-card` 提供标题区和内容区，用于组织一组相关信息。

## 基础使用

```html
<cl-card>
  <span slot="title">卡片标题</span>
  卡片正文内容
</cl-card>
```

## Attributes

当前没有组件专属 Attribute。

## Properties

当前没有组件专属 Property。

## Events

当前不派发自定义事件。

## Slots

| 名称 | 说明 |
| --- | --- |
| `title` | 卡片标题内容 |
| 默认插槽 | 卡片正文内容 |

## 当前限制

- 当前没有边框、阴影、内边距等外观变体。
- 标题为空时仍会保留标题区域的下方间距。
