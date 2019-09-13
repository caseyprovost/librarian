import { PublisherListState } from '@/store/types'
import { Publisher } from '@/models'

export default {
  collection (state : PublisherListState) : Publisher[] | [] {
    return state.collection
  },
  currentPage (state : PublisherListState) : number {
    return state.currentPage || 1
  },
  totalCount (state : PublisherListState) : number {
    return state.totalCount || 0
  },
  filters (state : PublisherListState) : [] {
    return state.filters
  },
  sorts (state : PublisherListState) : [] {
    return state.sorts
  },
  totalPages (state : PublisherListState) : number {
    const rawPageCount = (state.totalCount / 50)
    return Math.ceil(rawPageCount)
  },
  hasPrevPage (state : PublisherListState) : boolean {
    return state.currentPage > 1
  },
  hasNextPage (state : PublisherListState) : boolean {
    return state.currentPage < state.totalPages
  }
}
