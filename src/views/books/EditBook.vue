<template>
  <div class="form-wrapper">
    <div v-if="record">
      <h2 class="text-2xl mb-4 font-medium">{{ record.title }}</h2>
      <form @submit.prevent="submitForm" class="w-full">
        <div class="flex flex-wrap -mx-3 mb-6">
          <div class="w-full px-3">
            <label class="block uppercase tracking-wide text-xs font-bold mb-2" for="title">
              Title
            </label>
            <input class="appearance-none block w-full rounded py-3 px-4 mb-2 leading-tight" id="title" type="text" v-model="record.title">
            <p class="text-red-500 text-xs italic" v-if="hasError('title')">
              {{ errorText('title') }}
            </p>
          </div>
        </div>
        <div class="flex flex-wrap -mx-3 mb-6">
          <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="block uppercase tracking-wide text-xs font-bold mb-2" for="page_count">
              Page Count
            </label>
            <input class="appearance-none block w-full rounded py-3 px-4 mb-2 leading-tight" id="page_count" type="text" v-model="record.pageCount">
            <p class="text-red-500 text-xs italic" v-if="hasError('pageCount')">
              {{ errorText('pageCount') }}
            </p>
          </div>
          <div class="w-full md:w-1/2 px-3">
            <label class="block uppercase tracking-wide text-xs font-bold mb-2" for="publication_date">
              Date Published
            </label>
            <input class="appearance-none block w-full rounded py-3 px-4 leading-tight" id="publication_date" type="date" v-model="record.publicationDate">
          </div>
        </div>
        <div class="flex flex-wrap -mx-3 mb-6">
          <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="block uppercase tracking-wide text-xs font-bold mb-2" for="author_uuid">
              Author
            </label>
            <v-select label="name" :value="selectedAuthor" :options="authorsForSelect" @input="setSelectedAuthor" class="appearance-none block w-full leading-tight"></v-select>
            <p class="text-red-500 text-xs italic" v-if="hasError('author')">
              {{ errorText('author') }}
            </p>
          </div>
          <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="block uppercase tracking-wide text-xs font-bold mb-2" for="publisher_uuid">
              Publisher
            </label>
            <v-select label="name" :value="selectedPublisher" :options="publishersForSelect" @input="setSelectedPublisher" class="appearance-none block w-full leading-tight"></v-select>
            <p class="text-red-500 text-xs italic" v-if="hasError('publisher')">
              {{ errorText('publisher') }}
            </p>
          </div>
        </div>
        <div class="flex flex-wrap -mx-3 mb-6">
          <div class="flex flex-wrap mt-4">
            <div class="w-full px-3">
              <button class="shadow text-sm bg-teal-700 hover:bg-teal-600 focus:shadow-outline focus:outline-none text-teal-100 font-bold py-2 px-4 rounded" type="submit">
                Save Book
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
    <div v-if="!record">
      Loading
    </div>
  </div>
</template>

<script lang="ts">
import { Vue } from 'vue-property-decorator'
import { Scope } from 'spraypaint'
import { Book, Author, Publisher } from '@/models'

export default Vue.extend({
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      record: null,
      author: null,
      publisher: null,
      publishers: [],
      authors: [],
      selectedPublisher: null,
      selectedAuthor: null
    }
  },
  mounted () {
    this.fetchRecord().then(() => {
      this.fetchAuthor()
      this.fetchPublisher()
      this.loadPublishers().then(() => {
        this.selectedPublisher = this.publishers.find(p => p.id === this.record.publisherUuid)
      })
      this.loadAuthors().then(() => {
        this.selectedAuthor = this.authors.find(p => p.id === this.record.authorUuid)
      })
    })
  },
  methods: {
    async fetchRecord () {
      let { data } = await Book.find(this.id)
      if (data) {
        this.record = data
      }
    },
    async fetchAuthor () {
      let { data } = await Author.find(this.authorUuid)
      if (data) {
        this.author = data
      }
    },
    async fetchPublisher () {
      let { data } = await Publisher.find(this.publisherUuid)
      if (data) {
        this.publisher = data
      }
    },
    async loadPublishers () {
      let { data, meta } = await this.publisherScope.all()
      this.publishers = this.sortRecordsByAttriibute(data, 'name')
      // this.totalCount = meta.stats.total.count
    },
    async loadAuthors () {
      let { data, meta } = await this.authorScope.all()
      this.authors = this.sortRecordsByAttriibute(data, 'name')
      // this.totalCount = meta.stats.total.count
    },
    setSelectedPublisher (value) {
      this.selectedPublisher = this.publishers.find(p => p.id === value.id)
      this.record.publisherUuid = value.id
    },
    setSelectedAuthor (value) {
      this.selectedAuthor = this.authors.find(p => p.id === value.id)
      this.record.authorUuid = value.id
    },
    sortRecordsByAttriibute (records, attribute) {
      return records.sort((a, b) => {
        // Use toUpperCase() to ignore character casing
        const attributeA = a[attribute].toUpperCase()
        const attributeB = b[attribute].toUpperCase()

        let comparison = 0

        if (attributeA > attributeB) {
          comparison = 1
        } else if (attributeA < attributeB) {
          comparison = -1
        }

        return comparison
      })
    },
    async submitForm () {
      let success = await this.record.save()
    },
    hasError (field) {
      if (this.record.errors) {
        return this.record.errors[field] !== null
      } else {
        return false
      }
    },
    errorText (field) {
      if (this.record.errors && this.record.errors[field]) {
        return this.record.errors[field].message
      } else {
        return ''
      }
    }
  },
  computed: {
    publisherScope () {
      return Publisher
        .page(1)
        .per(100)
        .stats({ total: 'count' })
    },
    authorScope () {
      return Author
        .page(1)
        .per(100)
        .stats({ total: 'count' })
    },
    publishersForSelect () {
      if (this.publishers.length === 0) { return [] } else {
        return this.publishers.map((publisher) => {
          return {
            id: publisher.id,
            name: publisher.name
          }
        })
      }
    },
    authorsForSelect () {
      if (this.authors.length === 0) { return [] } else {
        return this.authors.map((author) => {
          return {
            id: author.id,
            name: author.name
          }
        })
      }
    }
  }
})
</script>

<style lang="scss" scoped>
  .form-wrapper {
    background: #211C37;
    @apply p-4;
    @apply mt-4;
  }

  input[type="text"],
  input[type="date"],
  select {
    background: #211C37;
    @apply text-gray-500;
    @apply border;
    @apply border-indigo-900;
  }

  input[type="text"]:focus,
  input[type="date"]:focus,
  select:focus {
    @apply border-indigo-800;
    @apply outline-none;
  }

  label {
    color: #777CA4;
  }
</style>
