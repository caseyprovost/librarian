import { MutationTree } from 'vuex'
import { BookListState } from '@/store/types'
import { Book, Author, Publisher } from '@/models'

export const mutations: MutationTree<BookListState> = {
  setCollection (state, payload : Book[]) {
    state.collection = payload
  },
  setMetaData (state, payload: object) {
    state.totalCount = payload.stats.total.count
  },
  setRecord (state, payload: Book) {
    state.record = payload
  },
  setAuthor (state, payload: Author) {
    state.author = payload
  },
  setPublisher (state, payload: Publisher) {
    state.publisher = payload
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
  },
  setAuthors (state, payload : Author[]) {
    state.authors = payload
  },
  setPublishers (state, payload : Publisher[]) {
    state.publishers = payload
  }
}
