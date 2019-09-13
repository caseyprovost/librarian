import { ActionTree } from 'vuex'
import { BookListState, RootState } from '@/store/types'
import { Book } from '@/models'

export const actions: ActionTree<BookListState, RootState> = {
  fetchCollection ({ commit, state: BookListState }): any {
    const scope = Book
      .page(this.getters['publishers/currentPage'] || 1)
      .per(50)
      .stats({ total: 'count' })

    scope.all().then((response) => {
      commit('setCollection', response.data)
      commit('setMetaData', response.meta)
    })
  },
  incrementPage ({ commit, state: BookListState }): any {
    commit('incrementPage')
    dispatch('fetchCollection')
  },
  decrementPage ({ commit, state: BookListState }): any {
    commit('incrementPage')
    dispatch('fetchCollection')
  }
}
