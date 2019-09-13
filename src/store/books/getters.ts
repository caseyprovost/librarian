import { BookListState } from '@/store/types'
import { Book } from '@/models'

export default {
  collection (state : BookListState) : Book[] | [] {
    return state.collection
  },
  currentPage (state : BookListState) : number {
    return state.currentPage || 1
  },
  totalCount (state : BookListState) : number {
    return state.totalCount || 0
  },
  filters (state : BookListState) : [] {
    return state.filters
  },
  sorts (state : BookListState) : [] {
    return state.sorts
  },
  totalPages (state : BookListState) : number {
    const rawPageCount = (state.totalCount / 50)
    return Math.ceil(rawPageCount)
  },
  hasPrevPage (state : BookListState) : boolean {
    return state.currentPage > 1
  },
  hasNextPage (state : BookListState) : boolean {
    return state.currentPage < state.totalPages
  }
}
