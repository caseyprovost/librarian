import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'

Vue.use(Vuex)

const vuexLocalStorage = new VuexPersist({
  key: 'vuex',
  storage: window.localStorage
})

export const store = new Vuex.Store({
  state: {
    layout: 'default-layout',
    currentUser: null
  },
  mutations: {
    SET_LAYOUT (state, payload) {
      state.layout = payload
    },
    SET_CURRENT_USER (state, payload) {
      state.currentUser = payload
    },
    REMOVE_CURRENT_USER (state) {
      state.currentUser = null
    }
  },
  getters: {
    layout (state) {
      return state.layout
    },
    currentUser (state) {
      return state.currentUser
    }
  },
  plugins: [vuexLocalStorage.plugin]
})
