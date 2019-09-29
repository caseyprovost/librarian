import { ActionTree } from 'vuex'
import { BookListState, RootState } from '@/store/types'
import { Book, Publisher, Author } from '@/models'

export const actions: ActionTree<BookListState, RootState> = {
  fetchCollection ({ commit, state: BookListState }): any {
    const scope = Book
      .page(this.getters['books/currentPage'] || 1)
      .per(50)
      .stats({ total: 'count' })

    return scope.all().then((response) => {
      commit('setCollection', response.data)
      commit('setMetaData', response.meta)
    })
  },
  fetchAuthors ({ commit, state: BookState }): any {
    const scope = Author
      .page(1)
      .per(100)
      .stats({ total: 'count' })

    return scope.all().then((response) => {
      commit('setAuthors', response.data)
      // commit('setMetaData', response.meta)
    })
  },
  fetchPublishers ({ commit, state: BookState }): any {
    const scope = Publisher
      .page(1)
      .per(100)
      .stats({ total: 'count' })

    return scope.all().then((response) => {
      commit('setPublishers', response.data)
      // commit('setMetaData', response.meta)
    })
  },
  fetchPublisher ({ commit, state: BookListState }, id): any {
    return Publisher.find(id).then((response) => {
      commit('setPublisher', response.data)
    })
  },
  fetchAuthor ({ commit, state: BookListState }, id): any {
    return Author.find(id).then((response) => {
      commit('setAuthor', response.data)
    })
  },
  async fetchRecord ({ commit, state: BookListState }, id): any {
    return Book.find(id).then((response) => {
      commit('setRecord', response.data)
    })
  },
  incrementPage ({ commit, state: BookListState }): any {
    commit('incrementPage')
    this.dispatch('books/fetchCollection')
  },
  decrementPage ({ commit, state: BookListState }): any {
    commit('decrementPage')
    this.dispatch('books/fetchCollection')
  }
}
