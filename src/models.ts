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
  static baseUrl = process.env.BOOKSHELF_DOMAIN
  static apiNamespace = 'v1'
  static schemaCache = null

  static generateAuthHeader (token) {
    return `Bearer ${token}`
  }

  static async schema () {
    if (this.schemaCache === null) {
      let response = await fetch(`${this.baseUrl}${this.apiNamespace}/vandal/schema.json`)
      let data = await response.json()
      this.schemaCache = data
    }

    return this.schemaCache
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

  async author () {
    if (this.authorUuid) {
      let { data } = await Author.find(this.authorUuid)
      return data
    } else {
      return null
    }
  }

  async publisher () {
    if (this.publisherUuid) {
      let { data } = await Publisher.find(this.publisherUuid)
      return data
    } else {
      return null
    }
  }
}

@Model()
export class Author extends ApplicationRecord {
  static baseUrl = process.env.AUTHORS_DOMAIN
  static apiNamespace = 'v1'
  static schemaCache = null
  static jsonapiType = 'authors'

  foos: string[]

  @Attr() name: string
  @Attr() bio: string
  @Attr() hometown: string
  @Attr() dateOfBirth: string
  @Attr() createdAt: string
  @Attr() updatedAt: string
}

@Model()
export class Publisher extends ApplicationRecord {
  static baseUrl = process.env.PUBLISHERS_DOMAIN
  static apiNamespace = 'v1'
  static schemaCache = null
  static jsonapiType = 'publishers'

  foos: string[]

  @Attr() name: string
  @Attr() description: string
  @Attr() createdAt: string
  @Attr() updatedAt: string
}
