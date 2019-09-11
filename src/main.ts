import Vue from 'vue'
import axios from 'axios'
import vSelect from 'vue-select'
import App from './App.vue'
import router from './router'
import '@/assets/css/tailwind.css'

Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.component('v-select', vSelect)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
