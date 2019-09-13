import { Module } from 'vuex'
import getters from '@/store/publishers/getters'
import { actions } from '@/store/publishers/actions'
import { mutations } from '@/store/publishers/mutations'
import { PublisherListState, RootState } from '@/store/types'

export const state: PublisherListState = {
  collection: [],
  filters: [],
  sorts: [],
  currentPage: 1,
  totalCount: 0,
  totalPages: 0
}

const namespaced: boolean = true

export const publishers: Module<PublisherListState, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations
}
