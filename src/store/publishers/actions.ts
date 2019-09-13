import { ActionTree } from 'vuex'
import { PublisherListState, RootState } from '@/store/types'
import { Publisher } from '@/models'

export const actions: ActionTree<PublisherListState, RootState> = {
  fetchCollection ({ commit, state: PublisherListState }): any {
    const scope = Publisher
      .page(this.getters['publishers/currentPage'] || 1)
      .per(50)
      .stats({ total: 'count' })

    scope.all().then((response) => {
      commit('setCollection', response.data)
      commit('setMetaData', response.meta)
    })
  },
  incrementPage ({ commit, state: PublisherListState }): any {
    commit('incrementPage')
    dispatch('fetchCollection')
  },
  decrementPage ({ commit, state: PublisherListState }): any {
    commit('incrementPage')
    dispatch('fetchCollection')
  }
}
