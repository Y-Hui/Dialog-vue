<template>
  <transition name="fade">
    <div class="dialog-wrap" v-show="showDialog" @click.self="cancel" @touchmove.prevent>
      <div class="dialog">
        <!-- icon -->
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
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Dialog',
  model: {
    prop: 'value',
    event: 'changeDisplay'
  },
  props: {
    value: {
      type: Boolean
    },
    // icon url
    icon: {
      type: String
    },
    title: {
      type: String
    },
    content: {
      type: String
    },
    // Whether to show the cancel button
    showCancel: {
      type: Boolean,
      default: false
    },
    // Confirm button text
    confirmText: {
      type: String,
      default: 'Confirm'
    },
    // Cancel button text
    cancelText: {
      type: String,
      default: 'Cancel'
    },
    // 回调函数
    callback: {
      type: Function
    }
  },
  data() {
    return {
      showDialog: false
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
      this.$emit('changeDisplay', dialogStatus)
    }
  },
  methods: {
    confirm() {
      this.showDialog = false
      this.$emit('confirm')
      this.functionCall('confirm')
    },
    cancel() {
      this.showDialog = false
      this.$emit('cancel')
      this.functionCall('cancel')
    },
    /**
     * 函数调用触发回调函数
     */
    functionCall(action) {
      if (this.callback) {
        this.callback(action)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.dialog-wrap {
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
  .dialog {
    animation: zoomIn 0.2s ease-out forwards;
  }
}
.fade-leave-active {
  animation: fade 0.25s ease-out reverse;
  .dialog {
    animation: zoomIn 0.2s ease-out reverse forwards;
  }
}

// .zoomIn-enter-active {
//   animation: zoomIn 0.2s ease-out;
// }
// .zoomIn-leave-active {
//   animation: zoomIn 0.2s ease-out reverse;
// }

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
