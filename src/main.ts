import Vue from 'vue'
import vSelect from 'vue-select'
import App from './App.vue'
import router from './router'
import '@/assets/css/tailwind.css'
import store from './store'

Vue.config.productionTip = false
Vue.component('v-select', vSelect)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
