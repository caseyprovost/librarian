import {
  SpraypaintBase,
  Model,
  Attr,
  HasMany,
  HasOne,
  BelongsTo
} from 'spraypaint'

@Model()
export class ApplicationRecord extends SpraypaintBase {
  static baseUrl = 'https://bookshelf.book-ecosystem.dev/'
  static apiNamespace = 'v1'

  static generateAuthHeader(token) {
    return `Bearer ${token}`
  }
}

@Model()
export class Book extends ApplicationRecord {
  static jsonapiType = 'books'

  foos: string[]

  @Attr() title: string
  @Attr() summary: string
  @Attr() pageCount: number
  @Attr() publicationDate: string
  @Attr() publisherUuid: string
  @Attr() authorUuid: string
  @Attr() createdAt: string
  @Attr() updatedAt: string

  get fullName () {
    return `${this.firstName} ${this.lastName}`
  }
}
