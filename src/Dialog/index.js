import Vue from 'vue'
import dialogComponent from './Dialog.vue'

const DialogInstance = Vue.extend(dialogComponent)
let instance

/**
 * 返回当前dom元素是否为body的子节点
 */
function isInDocument(element) {
  return document.body.contains(element)
}

/**
 * 获取数据类型
 * @param {any} param
 */
function getType(param) {
  let type = Object.prototype.toString.call(param)
  type = type.split(' ')[1].replace(']', '')
  return type
}

/**
 * 若传递参数为字符串类型，默认设置为文本内容，否则直接返回
 */
function optionAdapter(param) {
  const type = getType(param)
  // 弹窗默认参数
  const result = {
    showDialog: true,
    icon: undefined,
    title: undefined,
    showCancel: false,
    confirmText: 'Confirm',
    cancelText: 'Cancel'
  }
  if (type === 'String') {
    result.content = param
  } else {
    Object.assign(result, param)
  }
  return result
}

/**
 * @description 渲染并挂载组件
 * @returns {*} 已渲染组件的实例
 */
function initComponent() {
  let result
  // 若实例存在，且DOM节点为body子节点，直接返回实例（单例模式）
  if (instance && isInDocument(instance.$el)) {
    result = instance
  } else {
    instance = new DialogInstance().$mount()
    document.body.appendChild(instance.$el)
    result = instance
  }
  return result
}

/**
 * @param {any} options 组件 Props
 * @returns {Promise}
 * 函数调用时回调事件的触发：
 * 由于返回的是一个Promise，将[resolve、reject]方法
 * 一并和 options 混入到组件 props 内。
 * 组件内部触发[cancel、confirm]事件时，同时触发 callback 方法
 * 再传递当前方法事件名称，callbak 方法再处理方法名称决定 resolve或reject
 */
function Dialog(options) {
  return new Promise((resolve, reject) => {
    // 组件实例
    const dialog = initComponent()
    // 参数合并，修改组件 Props
    Object.assign(dialog, options, {
      resolve, // Promise 成功回调
      reject, // Promise 失败回调

      /**
       * @param {String} action ['confirm', 'cancel']
       * 组件内部点击确认/取消按钮按钮后，触发该回调。
       */
      callback: (action) => {
        dialog[action === 'confirm' ? 'resolve' : 'reject'](action)
      }
    })
  })
}
/**
 * Vue 插件方法。
 * 挂载实例到 Vue 原型
 * 全局注册 Dialog 组件
 */
Dialog.install = () => {
  Vue.prototype.$dialog = Dialog
  Vue.component('Dialog', dialogComponent)
}
/**
 * 警告弹窗，不包含取消事件回调
 */
Dialog.alert = (options) => {
  const props = optionAdapter(options)
  return Dialog({
    ...props
  }).catch(err => err)
}
/**
 * 确认弹窗，包含取消、确认事件回调
 */
Dialog.confirm = (options) => {
  const props = optionAdapter(options)
  return Dialog({
    ...props,
    showCancel: true
  })
}

export default Dialog
