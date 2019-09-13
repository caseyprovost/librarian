import { Module } from 'vuex'
import getters from '@/store/authors/getters'
import { actions } from '@/store/authors/actions'
import { mutations } from '@/store/authors/mutations'
import { AuthorListState, RootState } from '@/store/types'

export const state: AuthorListState = {
  collection: [],
  filters: [],
  sorts: [],
  currentPage: 1,
  totalCount: 0,
  totalPages: 0
}

const namespaced: boolean = true

export const authors: Module<AuthorListState, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations
}
