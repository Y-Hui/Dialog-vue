# 使用 Vue 封装的弹窗组件
> 一个微小的组件，代码质量并不高，未能实现最佳。（因为菜）

[English Doc](/README_en.md)

[在线预览](https://y-hui.github.io/Dialog-vue/example/)

注册组件
```javascript
import Dialog from 'Dialog/index'
Vue.use(Dialog)
```

## 函数式调用
若向函数内传递的值为字符串类型，默认解析为`content`

警告弹窗
```javascript
this.$dialog.alert('内容文字')

this.$dialog.alert({
  title: "警告弹窗",
  content: '只包含一个确定按钮'
}).then(() => {
  console.log('你点击了确定按钮')
})
```
确认弹窗
```javascript
this.$dialog.confirm('内容文字').then(() => {
  console.log('你点击了确定按钮')
}).catch(() => {
  console.log('你点击了取消按钮')
})

this.$dialog.confirm({
  title: "确认弹窗",
  content: '包含确定、取消按钮'
}).then(() => {
  console.log('你点击了确定按钮')
}).catch(() => {
  console.log('你点击了取消按钮')
})
```

## JS 函数内调用
```javascript
import Dialog from './Dialog'

Dialog.alert('Dialog')

Dialog.confirm({
  title: "确认弹窗",
  content: '包含确定、取消按钮'
}).then(() => {
  console.log('你点击了确定按钮')
}).catch(() => {
  console.log('你点击了取消按钮')
})
```

## 组件调用
```html
<Dialog
  v-model="dialogStatus"
  showCancel
  title="Title"
  content="content"
  @cancel="componentCallCancel"
  @confirm="componentCallConfrim"
/>
```

## 配置

| Props       | 说明                                 | 类型    | 默认值    |
| ----------- | ------------------------------------ | ------- | --------- |
| v-model     | 是否显示弹窗                         | Boolean | -         |
| icon        | icon 链接 / 本地路径（require 导入） | String  | -         |
| title       | 标题                                 | String  | -         |
| content     | 文本内容。支持`\n`换行               | String  | -         |
| showCancel  | 是否显示取消按钮                     | Boolean | false     |
| confirmText | 确认按钮文字                         | String  | `Confirm` |
| cancelText  | 取消按钮文字                         | String  | `Cancel`  |

## 事件

| Event    | 说明                           |
| -------- | ------------------------------ |
| @cancel  | 取消事件。点击遮罩层同样触发。 |
| @confirm | 确认事件                       |

