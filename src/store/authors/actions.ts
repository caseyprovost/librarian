import { ActionTree } from 'vuex'
import { AuthorListState, RootState } from '@/store/types'
import { Author } from '@/models'

export const actions: ActionTree<AuthorListState, RootState> = {
  fetchCollection ({ commit, state: AuthorListState }): any {
    const scope = Author
      .page(this.getters['publishers/currentPage'] || 1)
      .per(50)
      .stats({ total: 'count' })

    scope.all().then((response) => {
      commit('setCollection', response.data)
      commit('setMetaData', response.meta)
    })
  },
  incrementPage ({ commit, state: AuthorListState }): any {
    commit('incrementPage')
    dispatch('fetchCollection')
  },
  decrementPage ({ commit, state: AuthorListState }): any {
    commit('incrementPage')
    dispatch('fetchCollection')
  }
}
