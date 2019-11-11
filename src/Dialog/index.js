import Vue from 'vue'
import Dialog from './Dialog.vue'

const DialogComponent = {}

DialogComponent.install = function initComponent() {
  const DialogInstance = Vue.extend(Dialog)
  let currentDialog
  const initInstance = () => {
    // 若存在弹窗实例，先销毁再创建
    if (currentDialog) {
      currentDialog.remove()
    }
    currentDialog = new DialogInstance()
    const DialogDOM = currentDialog.$mount().$el
    document.body.appendChild(DialogDOM)
  }

  /**
   * 初始化弹窗组件，调用组件内部 init 方法
   * 该方法包含取消回调
   */
  function dialogInit() {
    return currentDialog.init().then((val) => {
      currentDialog = null
      return Promise.resolve(val)
    }).catch(err => Promise.reject(err))
  }

  // 在Vue的原型上添加实例方法，以全局调用
  Vue.prototype.$dialog = {
    // 提示弹窗（只有确认事件回调）
    alert(dialogContent) {
      initInstance()
      // 关闭取消事件回调
      currentDialog.noCatch = true
      // 只传递字符串时，默认设置为内容文本
      if (typeof dialogContent === 'string') {
        currentDialog.content = dialogContent
      } else if (typeof dialogContent === 'object') {
        Object.assign(currentDialog, dialogContent)
      }
      return currentDialog.init().then((val) => {
        currentDialog = null
        return Promise.resolve(val)
      })
    },
    // 确认弹窗，包含取消事件回调
    confirm(dialogContent) {
      initInstance()
      currentDialog.showCancel = true
      if (typeof dialogContent === 'string') {
        currentDialog.content = dialogContent
      } else if (typeof dialogContent === 'object') {
        Object.assign(currentDialog, dialogContent)
      }
      return dialogInit()
    }
  }
}

export default DialogComponent
