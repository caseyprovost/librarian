<template>
  <div class="mt-4">
    <div class="flex pagination flex-row-reverse pb-4">
      <button class="ml-1 pagination-button" :disabled="!hasNextPage" @click="nextPage">&gt;</button>
      <button class="px-4 pagination-button" :disabled="!hasPrevPage" @click="prevPage">&lt;</button>
      <span class="py-2 px-2">Displaying page {{ currentPage }} of {{ totalPages }}</span>
     </div>
    <table class="table w-full">
      <thead>
        <tr>
          <th class="text-left border-b border-indigo-900 text-teal-500 px-4 py-2">Title</th>
          <th class="text-left border-b border-indigo-900 text-teal-500 px-4 py-2">Published On</th>
          <th class="text-left border-b border-indigo-900 text-teal-500 px-4 py-2">Page Count</th>
          <th class="text-left border-b border-indigo-900 text-teal-500 px-4 py-2"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="record in collection" :key="record.id">
          <td class="text-left border-b border-indigo-900 px-4 py-2">
            <a href="#" class="text-indigo-500 hover:underline">{{ record.title }}</a>
          </td>
          <td class="text-left border-b border-indigo-900 px-4 py-2">{{ record.publicationDate }}</td>
          <td class="text-left border-b border-indigo-900 px-4 py-2">{{ record.pageCount }}</td>
          <td class="text-left border-b border-indigo-900 px-4 py-2">
            <router-link :to="editPath(record.id)" class="text-blue-500 mx-2 hover:underline">
              edit
            </router-link>
            <a href="#" class="text-red-500 mx-2 hover:underline">delete</a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { Vue } from 'vue-property-decorator'
import { Book } from '@/models'
import { mapGetters } from 'vuex'

export default Vue.extend({
  data () {
    return {}
  },
  mounted () {
    this.fetchCollection()
  },
  methods: {
    fetchCollection () {
      this.$store.dispatch('books/fetchCollection')
    },
    nextPage () {
      this.$store.dispatch('books/incrementPage')
    },
    prevPage () {
      this.$store.dispatch('books/decrementPage')
    },
    editPath (id) {
      return `/books/${id}/edit`
    },
    truncateString (str, num) {
      return str.length > num ? str.slice(0, num > 3 ? num - 3 : num) + '...' : str
    }
  },
  computed: {
    ...mapGetters({
      collection: 'books/collection',
      totalCount: 'books/totalCount',
      currentPage: 'books/currentPage',
      totalPages: 'books/totalPages',
      hasPrevPage: 'books/hasPrevPage',
      hasNextPage: 'books/hasNextPage',
      filters: 'books/filters',
      sorts: 'books/sorts'
    })
  }
})
</script>

<style lang="scss" scoped>
table {
  background: #211C37;
  td {
    background: #211C37;
  }
}

.pagination-button {
  @apply px-4 py-1 bg-purple-900 text-purple-300 text-xl;

  &:hover {
    @apply bg-purple-700;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.4;
    background: #44337a !important;
  }
}
</style>
