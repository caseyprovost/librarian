import { AuthorListState } from '@/store/types'
import { Author } from '@/models'

export default {
  collection (state : AuthorListState) : Author[] | [] {
    return state.collection
  },
  currentPage (state : AuthorListState) : number {
    return state.currentPage || 1
  },
  totalCount (state : AuthorListState) : number {
    return state.totalCount || 0
  },
  filters (state : AuthorListState) : [] {
    return state.filters
  },
  sorts (state : AuthorListState) : [] {
    return state.sorts
  },
  totalPages (state : AuthorListState) : number {
    const rawPageCount = (state.totalCount / 50)
    return Math.ceil(rawPageCount)
  },
  hasPrevPage (state : AuthorListState) : boolean {
    return state.currentPage > 1
  },
  hasNextPage (state : AuthorListState) : boolean {
    return state.currentPage < state.totalPages
  }
}
