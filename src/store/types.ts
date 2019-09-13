import { Publisher, Author, Book } from '@/models'

export interface User {
  created_at: string;
  email: string;
  id: number;
  jti: string;
  name: string;
  updated_at: string
}

export interface CollectionMetaData {
  stats: object | null
}

export interface RootState {
  layout: string;
  currentUser: User | null;
}

export interface PaginatedCollectionState {
  currentPage: number;
  totalCount: number;
  totalPages: number;
}

export interface FilteredCollectionState {
  filters: [];
  sorts: [];
}

export interface PublisherListState extends PaginatedCollectionState, FilteredCollectionState {
  collection: Publisher[] | [];
}

export interface AuthorListState extends PaginatedCollectionState, FilteredCollectionState {
  collection: Author[] | [];
}

export interface BookListState extends PaginatedCollectionState, FilteredCollectionState {
  collection: Book[] | [];
}
