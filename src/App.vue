<template>
  <div id="app">
    <div class="content">
      <h2>Dialog Component</h2>
      <button class="btn" type="button" @click="showDialog">Full</button>
      <button class="btn" type="button" @click="showAlert">Alert</button>
      <button class="btn" type="button" @click="showConfirm">Confirm</button>
      <button class="btn" type="button" @click="customizeBtnDialog">Customize</button>
      <button
        class="btn"
        type="button"
        @click="dialogStatus=true"
      >Component Call</button>
    </div>
    <Dialog
      v-model="dialogStatus"
      title="Title"
      content="content"
      showCancel
      @cancel="componentCallCancel"
      @confirm="componentCallConfrim"
    />
    <footer class="footer">
      <p>Please open the console.</p>
    </footer>
  </div>
</template>

<script>
import Dialog from './Dialog/Dialog.vue'

export default {
  name: 'App',
  data() {
    return {
      dialogStatus: false
    }
  },
  methods: {
    componentCallConfrim() {
      this.dialogStatus = false
      console.log('Component Call: Press to confirm')
    },
    componentCallCancel() {
      console.log('Component Call: Press to cancel')
    },
    showDialog() {
      this.$dialog
        .alert({
          icon: '/icon.png',
          title: "This's Title",
          content: 'Prompt text.\nPrompt text.'
        })
        .then(() => {
          console.log('You press to confirm')
        })
    },
    showAlert() {
      this.$dialog.alert("This's Alert").then(() => {
        console.log('You press to confirm')
      })
    },
    showConfirm() {
      this.$dialog
        .confirm({
          title: 'Confirm',
          content: "This's Confirm"
        })
        .then(() => {
          console.log('You press to confirm')
        })
        .catch(() => {
          console.log('You press to cancel')
        })
    },
    customizeBtnDialog() {
      this.$dialog.alert({
        title: 'Customize',
        content: 'Button text customization.',
        buttonText: 'YES'
      }).then(() => {
        console.log('You press to confirm')
      })
    }
  },
  components: {
    Dialog
  }
}
</script>

<style lang="scss">
html,
body {
  height: 100%;
}
body {
  margin: 0;
  min-height: 100%;
}
#app {
  min-height: 100%;
  display: flex;
  flex-direction: column;
  font-family: BlinkMacSystemFont, "Helvetica Neue", "Helvetica", "Arial",
    "PingFang SC", "Hiragino Sans GB", "Heiti SC", "Microsoft YaHei",
    "WenQuanYi Micro Hei", "sans-serif";
  text-align: center;
}
.content {
  flex: 1;
}
.btn {
  display: block;
  margin: 0 auto;
  margin-bottom: 20px;
  width: 304px;
  height: 88px;
  font-size: 36px;
  color: #fff;
  background-color: #23b0f7;
  border: none;
  border-radius: 50px;
  outline: none;
}
.footer {
  min-height: 50px;
}
</style>
