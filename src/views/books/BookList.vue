<template>
  <div>
    <div class="mt-4 mb-4 flex">
      <div class="w-2/4 flex-1">
        <h2 class="inline-block text-2xl text-gray-500 mr-2 align-middle">Books</h2>
        <button class="flex-inline shadow text-xs bg-teal-700 hover:bg-teal-600 focus:shadow-outline focus:outline-none text-teal-100 font-bold py-1 px-2 rounded align-middle" @click="createBook">
          <font-awesome-icon icon="plus-circle"" />
          <span>Create Book</span>
      </button>
      </div>
      <div class="flex pagination flex-row-reverse w-2/4">
        <button class="ml-1 pagination-button" :disabled="!hasNextPage" @click="nextPage">&gt;</button>
        <button class="px-4 pagination-button" :disabled="!hasPrevPage" @click="prevPage">&lt;</button>
        <span class="py-2 px-2">Displaying page {{ currentPage }} of {{ totalPages }}</span>
      </div>
    </div>
    <div>
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
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { loadPaginationMixin, listPageMixin } from '@/utilities.ts'

const paginationMixin = loadPaginationMixin('books')

@Component({
  mixins: [paginationMixin, listPageMixin]
})
export default class BookList extends Vue {
  createBook() {
    this.$router.push({ path: '/books/new' })
  }
}
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
