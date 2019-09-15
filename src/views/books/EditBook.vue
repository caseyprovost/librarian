<template>
  <div class="form-wrapper">
    <div v-if="editableRecord">
      <h2 class="text-2xl mb-4 font-medium">{{ editableRecord.title }}</h2>
      <form @submit.prevent="submitForm" class="w-full">
        <div class="flex flex-wrap -mx-3 mb-6">
          <div class="w-full px-3">
            <label class="block uppercase tracking-wide text-xs font-bold mb-2" for="title">
              Title
            </label>
            <input class="appearance-none block w-full rounded py-3 px-4 mb-2 leading-tight" id="title" type="text" v-model="editableRecord.title">
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
            <input class="appearance-none block w-full rounded py-3 px-4 mb-2 leading-tight" id="page_count" type="text" v-model="editableRecord.pageCount">
            <p class="text-red-500 text-xs italic" v-if="hasError('pageCount')">
              {{ errorText('pageCount') }}
            </p>
          </div>
          <div class="w-full md:w-1/2 px-3">
            <label class="block uppercase tracking-wide text-xs font-bold mb-2" for="publication_date">
              Date Published
            </label>
            <input class="appearance-none block w-full rounded py-3 px-4 leading-tight" id="publication_date" type="date" v-model="editableRecord.publicationDate">
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
    <div v-if="!editableRecord">
      Loading
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { mapGetters } from 'vuex'
import { Book, Author, Publisher } from '@/models'

@Component
export default class EditBook extends Vue {
  @Prop() id!: string

  editableRecord = null
  saving = false
  success = false
  author = null
  publisher = null
  selectedPublisher = null
  selectedAuthor = null

  mounted () {
    this.syncRecord()
  }

  syncRecord () {
    this.$store.dispatch('books/fetchRecord', this.id).then(() => {
      this.editableRecord = this.record.dup()

      this.record.author().then((data) => {
        this.selectedAuthor = data
      })

      this.record.publisher().then((data) => {
        this.selectedPublisher = data
      })

      this.$store.dispatch('books/fetchPublishers')
      this.$store.dispatch('books/fetchAuthors')
    })
  }

  loadPublishers () {
    this.$store.dispatch('publishers/fetchcollection', this.id).then((collection) => {
      this.publishers = this.sortRecordsByAttriibute(collection, 'name')
    })
  }

  loadAuthors () {
    this.$store.dispatch('authors/fetchcollection', this.id).then((collection) => {
      this.authors = this.sortRecordsByAttriibute(collection, 'name')
    })
  }

  setSelectedPublisher (value) {
    this.selectedPublisher = this.publishers.find(p => p.id === value.id)
    this.editableRecord.publisherUuid = value.id
  }

  setSelectedAuthor (value) {
    this.editableRecord.authorUuid = value.id
    this.selectedAuthor = this.authors.find(p => p.id === value.id)
  }

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
  }

  async submitForm () {
    let success = await this.editableRecord.save()

    if (success) {
      this.syncRecord()
      console.log('success')
    } else {
      console.log('error')
    }
  }

  hasError (field) {
    if (this.editableRecord.errors) {
      return this.editableRecord.errors[field] !== null
    } else {
      return false
    }
  }

  errorText (field) {
    if (this.editableRecord.errors && this.editableRecord.errors[field]) {
      return this.editableRecord.errors[field].message
    } else {
      return ''
    }
  }

  get publishersForSelect () {
    if (this.publishers.length === 0) { return [] } else {
      return this.publishers.map((publisher) => {
        return {
          id: publisher.id,
          name: publisher.name
        }
      })
    }
  }

  get authorsForSelect () {
    if (this.authors.length === 0) { return [] } else {
      return this.authors.map((author) => {
        return {
          id: author.id,
          name: author.name
        }
      })
    }
  }

  get record () : Book | null {
    return this.$store.getters['books/record']
  }

  get authors () : Author[] {
    return this.$store.getters['books/authors']
  }

  get publishers () : Publisher[] {
    return this.$store.getters['books/publishers']
  }
}
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
