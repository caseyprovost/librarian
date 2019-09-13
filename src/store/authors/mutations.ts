import { MutationTree } from 'vuex'
import { AuthorListState } from '@/store/types'
import { Author } from '@/models'

export const mutations: MutationTree<AuthorListState> = {
  setCollection (state, payload : Author[]) {
    state.collection = payload
  },
  setMetaData (state, payload: object) {
    state.totalCount = payload.stats.total.count
  },
  incrementPage (state) {
    if (state.currentPage === null) {
      state.currentPage = 1
    }
    state.currentPage++
  },
  decrementPage (state) {
    if (state.currentPage === null) {
      state.currentPage = 1
    }
    state.currentPage--
  }
}
