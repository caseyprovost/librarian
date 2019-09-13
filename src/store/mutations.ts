import { MutationTree } from 'vuex'
import { RootState, User } from '@/store/types'

export const mutations: MutationTree<RootState> = {
  setLayout (state, payload : string) {
    state.layout = payload
  },
  login (state, payload: User) {
    state.currentUser = payload
  },
  logout (state) {
    state.currentUser = null
  }
}
