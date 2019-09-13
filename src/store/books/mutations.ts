import { MutationTree } from 'vuex'
import { BookListState } from '@/store/types'
import { Book } from '@/models'

export const mutations: MutationTree<BookListState> = {
  setCollection (state, payload : Book[]) {
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
