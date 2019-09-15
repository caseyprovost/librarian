import { MutationTree } from 'vuex'
import { PublisherListState } from '@/store/types'
import { Publisher } from '@/models'

export const mutations: MutationTree<PublisherListState> = {
  setCollection (state, payload : Publisher[]) {
    state.collection = payload
  },
  setMetaData (state, payload: object) {
    state.totalCount = payload.stats.total.count
  },
  setRecord (state, payload: Publisher) {
    state.record = payload
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
