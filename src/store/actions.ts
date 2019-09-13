import { ActionTree } from 'vuex'
import axios from 'axios'
import { RootState } from '@/store/types'
import { ApplicationRecord } from '@/models'

const baseURL = 'https://master-auth.book-ecosystem.dev/users/sign_in'
const headers = { 'Content-Type': 'application/json', 'Accept': 'application/json' }

export const actions: ActionTree<RootState, RootState> = {
  login ({ commit, state: RootState }, data : object) : any {
    return axios.request({
      url: baseURL,
      data: data,
      headers: headers,
      method: 'post',
      responseType: 'json'
    }).then((response) => {
      ApplicationRecord.jwt = response.headers['authorization'].replace('Bearer ', '')
      commit('login', response.data)
      commit('setLayout', 'default-layout')
    })
  },
  logout ({ commit }) {
    return new Promise((resolve, reject) => {
      commit('logout')
      commit('setLayout', 'authentication-layout')
      resolve()
    })
  },
  setLayout ({ commit }, data : string) {
    return new Promise((resolve, reject) => {
      commit('setLayout', data)
      resolve()
    })
  }
}
