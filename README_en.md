# Dialog-vue
This is the dialog component, built using Vue.

> A tiny component, the code quality is not high, and it is not optimal.（Because it is a rookie）

[中文文档](/README_zh-CN.md)

[Preview](https://y-hui.github.io/Dialog-vue/example/)

Registration component

```javascript
import Dialog from 'Dialog/index'
Vue.use(Dialog)
```

## Function Call

If the value passed is a string, the default setting is `content`.

Alert
```javascript
this.$dialog.alert('Content')

this.$dialog.alert({
  title: "Alert",
  content: 'Contains only one confirmation button'
}).then(() => {
  console.log('You press to confirm')
})
```
Confirm
```javascript
this.$dialog.confirm('Content').then(() => {
  console.log('You press to confirm')
}).catch(() => {
  console.log('You press to cancel')
})

this.$dialog.confirm({
  title: "Confirm",
  content: 'Includes confirm, cancel button'
}).then(() => {
  console.log('You press to confirm')
}).catch(() => {
  console.log('You press to cancel')
})
```

## JavaScript Call

```javascript
import Dialog from './Dialog'

Dialog.alert('Dialog')

Dialog.confirm({
  title: "Confirm",
  content: 'Includes confirm, cancel button'
}).then(() => {
  console.log('You press to confirm')
}).catch(() => {
  console.log('You press to cancel')
})
```

## Component call
```html
<Dialog
  v-model="dialogStatus"
  title="Title"
  content="content"
  showCancel
  @cancel="componentCallCancel"
  @confirm="componentCallConfrim"
/>
```

## Options

| Props       | Description                          | Type    | Default   |
| ----------- | ------------------------------------ | ------- | --------- |
| v-model     | Whether to show popup                | Boolean | -         |
| icon        | icon path / local (require)          | String  | -         |
| title       | Title                                | String  | -         |
| content     | Content.  You can use `\n` to wrap   | String  | -         |
| showCancel  | Whether to display the cancel button | Boolean | false     |
| confirmText | Confirm button text                  | String  | `Confirm` |
| cancelText  | Cancel button text                   | String  | `Cancel`  |

## Event

| Event name | Description                                    |
| ---------- | ---------------------------------------------- |
| @cancel    | Cancel event. Or click on the mask to trigger. |
| @confirm   | Confirm event.                                 |