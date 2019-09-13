import Vue from 'vue'
import Vuex, { StoreOptions } from 'vuex'
import VuexPersistence from 'vuex-persist'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { RootState } from '@/store/types'
import getters from '@/store/getters'
import { mutations } from '@/store/mutations'
import { actions } from '@/store/actions'

import { publishers } from './publishers/index'
import { authors } from './authors/index'
import { books } from './books/index'

Vue.use(Vuex)
Vue.use(VueAxios, axios)

const vuexLocalStorage = new VuexPersistence<RootState>({
  key: 'vuex',
  storage: window.localStorage
})

const store: StoreOptions<RootState> = {
  state: {
    layout: 'default-layout',
    currentUser: null
  },
  modules: {
    publishers,
    authors,
    books
  },
  strict: true,
  mutations,
  actions,
  getters,
  plugins: [vuexLocalStorage.plugin]
}

export default new Vuex.Store<RootState>(store)
