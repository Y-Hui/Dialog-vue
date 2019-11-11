<template>
  <div class="dialog-wrap" @touchmove.prevent>
    <transition name="fade">
      <div class="mask" v-if="showDialog" @click="cancel"></div>
    </transition>
    <transition name="zoomIn">
      <div class="dialog" v-if="showDialog">
        <!-- 图片图标 -->
        <img class="dialog__img-icon" v-if="icon" :src="icon" />
        <h4 class="dialog__title" v-if="title">{{title}}</h4>
        <slot>
          <p class="dialog__text">{{content}}</p>
        </slot>
        <div class="dialog__footer">
          <button
            class="dialog-btn"
            type="button"
            v-if="showCancel"
            @click="cancel"
          >{{cancelText}}</button>
          <button
            class="dialog-btn dialog-btn--blue"
            type="button"
            @click="confirm"
          >{{confirmText}}</button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
let timer

export default {
  name: 'Dialog',
  props: {
    value: {
      type: Boolean
    },
    // 图标链接
    icon: {
      type: String
    },
    // 标题文字
    title: {
      type: String
    },
    // 弹窗内容
    content: {
      type: String
    },
    // 是否显示取消按钮
    showCancel: {
      type: Boolean,
      default: false
    },
    // 按钮文本
    confirmText: {
      type: String,
      default: 'Confirm'
    },
    cancelText: {
      type: String,
      default: 'Cancel'
    }
  },
  data() {
    return {
      showDialog: false,
      resolve: Function,
      reject: Function,
      promise: Promise,
      noCatch: false, // 不需要取消事件的回调
      functionCall: false // 是否为函数调用
    }
  },
  mounted() {
    if (this.value) {
      this.showDialog = true
    }
  },
  watch: {
    value(status) {
      this.showDialog = status
    },
    showDialog(dialogStatus) {
      this.$emit('input', dialogStatus)
    }
  },
  methods: {
    // 初始化弹窗(函数调用)
    init() {
      this.functionCall = true
      this.showDialog = true
      this.promise = new Promise((resolve, reject) => {
        this.resolve = resolve
        this.reject = reject
      })
      return this.promise
    },
    // 确认事件
    confirm() {
      // 函数调用时需要销毁组件
      if (this.functionCall) {
        this.showDialog = false
        this.resolve('confirm')
        this.remove()
      } else {
        this.$emit('confirm')
      }
    },
    // 取消事件
    cancel() {
      // 函数调用时需要销毁组件
      if (this.functionCall) {
        this.showDialog = false
        // 默认添加取消事件回调
        if (this.noCatch === false) {
          this.reject('cancel')
        }
        this.remove()
      } else {
        this.showDialog = false
        this.$emit('cancel')
      }
    },
    // 移除 DOM 节点
    remove() {
      timer = setTimeout(() => {
        this.$destroy()
        clearTimeout(timer)
      }, 300)
    }
  },
  destroyed() {
    if (this.functionCall) {
      document.body.removeChild(this.$el)
    }
    clearTimeout(timer)
  }
}
</script>

<style lang="scss" scoped>
.mask {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 30;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}
.dialog {
  position: fixed;
  top: 25%;
  right: 0;
  left: 0;
  margin: auto;
  z-index: 30;
  box-sizing: border-box;
  padding: 30px;
  width: 526px;
  text-align: center;
  background-color: #fff;
  border-radius: 20px;
  &__icon {
    margin: 30px 0;
    font-size: 138px;
  }
  &__img-icon {
    margin: 30px 0;
    width: 138px;
  }
  &__title {
    margin: 0;
    font-size: 36px;
    color: #23b0f7;
  }
  &__text {
    margin-top: 30px;
    margin-bottom: 0;
    font-size: 28px;
    white-space: pre-wrap;
    color: #616161;
  }
  &__footer {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 60px;
    .dialog-btn:not(:first-child) {
      margin-left: 20px;
    }
  }
}
.dialog-btn {
  width: 316px;
  height: 80px;
  background-color: #fff;
  border-radius: 50px;
  border: 1px solid #dedede;
  outline: none;
  &--blue {
    color: #fff;
    background-color: #23b0f7;
    border: 1px solid #23b0f7;
  }
}

.fade-enter-active {
  animation: fade 0.25s ease-out;
}
.fade-leave-active {
  animation: fade 0.25s ease-out reverse;
}

.zoomIn-enter-active {
  animation: zoomIn 0.2s ease-out;
}
.zoomIn-leave-active {
  animation: zoomIn 0.2s ease-out reverse;
}

@keyframes fade {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes zoomIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
