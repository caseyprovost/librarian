import { Module } from 'vuex'
import getters from '@/store/books/getters'
import { actions } from '@/store/books/actions'
import { mutations } from '@/store/books/mutations'
import { BookListState, RootState } from '@/store/types'

export const state: BookListState = {
  collection: [],
  filters: [],
  sorts: [],
  publishers: [],
  authors: [],
  currentPage: 1,
  totalCount: 0,
  totalPages: 0
}

const namespaced: boolean = true

export const books: Module<BookListState, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations
}
