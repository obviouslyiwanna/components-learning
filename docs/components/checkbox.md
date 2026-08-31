# cl-checkbox

`cl-checkbox` 封装原生复选框，支持 `checked`、`disabled`、`value` 的 Attribute 与 Property 同步，并派发可穿过 Shadow DOM 的自定义 `change` 事件。

## 基础使用

```html
<cl-checkbox id="agreement" value="agreement" checked>
  同意协议
</cl-checkbox>

<script>
  const checkbox = document.querySelector('#agreement');

  checkbox.addEventListener('change', (event) => {
    console.log(event.detail.checked);
    console.log(event.detail.value);
  });

  checkbox.checked = false;
</script>
```

## Attributes

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `checked` | Boolean Attribute | `false` | 属性存在时为选中状态 |
| `disabled` | Boolean Attribute | `false` | 属性存在时禁用内部复选框 |
| `value` | string | `""` | 当前选项的业务值 |

Boolean Attribute 通过属性是否存在判断状态。不要使用 `checked="false"` 表示未选中；应直接移除 `checked`。

## Properties

| 名称 | 类型 | 说明 |
| --- | --- | --- |
| `checked` | boolean | 读取或设置选中状态，并同步 `checked` Attribute |
| `disabled` | boolean | 读取或设置禁用状态，并同步 `disabled` Attribute |
| `value` | string | 读取或设置选项值，并同步 `value` Attribute |

```js
const checkbox = document.querySelector('cl-checkbox');

checkbox.checked = true;
checkbox.disabled = false;
checkbox.value = 'weekend';
```

## Events

| 事件 | 冒泡 | 穿过 Shadow DOM | `detail` |
| --- | --- | --- | --- |
| `change` | 是 | 是 | `{ checked: boolean, value: string }` |

`change` 只在用户改变内部原生复选框时派发。通过代码设置 `checkbox.checked` 不会自动派发事件。

## Slots

| 名称 | 说明 |
| --- | --- |
| 默认插槽 | 复选框的文字标签 |

## “其他”选项

当默认插槽的纯文本严格等于 `其他` 且复选框被选中时，组件会显示一个内部文本输入框：

```html
<cl-checkbox value="other">其他</cl-checkbox>
```

## 当前限制

- “其他”输入框的内容还没有对应的公共 Property 或自定义事件。
- “其他”判断依赖插槽的中文文本，尚未抽象为独立 Attribute。
- 当前不支持表单关联，不会像原生表单控件一样自动参与 `<form>` 提交。
