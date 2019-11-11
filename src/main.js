import Vue from 'vue'
import App from './App.vue'
import Dialog from './Dialog/index'

Vue.config.productionTip = false
Vue.use(Dialog)

new Vue({
  render: h => h(App)
}).$mount('#app')
