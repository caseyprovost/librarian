import Vue from 'vue'
import vSelect from 'vue-select'
import App from './App.vue'
import router from './router'
import '@/assets/css/tailwind.css'
import store from './store'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faCoffee, faChild, faCircle, faArchive, faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { faComment } from '@fortawesome/free-regular-svg-icons'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon, FontAwesomeLayers, FontAwesomeLayersText } from '@fortawesome/vue-fontawesome'

library.add(
  faCoffee,
  faChild,
  faCircle,
  faPlusCircle,
  faArchive,
  faComment,
  faTwitter
)

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('font-awesome-layers', FontAwesomeLayers)
Vue.component('font-awesome-layers-text', FontAwesomeLayersText)

Vue.config.productionTip = false
Vue.component('v-select', vSelect)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
