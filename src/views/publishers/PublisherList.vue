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
          <th class="text-left border-b border-indigo-900 text-teal-500 px-4 py-2">Name</th>
          <th class="text-left border-b border-indigo-900 text-teal-500 px-4 py-2">Description</th>
          <th class="text-left border-b border-indigo-900 text-teal-500 px-4 py-2"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="record in collection" :key="record.id">
          <td class="text-left border-b border-indigo-900 px-4 py-2">
            <a href="#" class="text-indigo-500 hover:underline">{{ record.name }}</a>
          </td>
          <td class="text-left border-b border-indigo-900 px-4 py-2">
            {{ truncateString(record.description, 50) }}
          </td>
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
import { Vue, Component } from 'vue-property-decorator'
import { loadPaginationMixin, listPageMixin } from '@/utilities.ts'

const paginationMixin = loadPaginationMixin('publishers')

@Component({
  mixins: [paginationMixin, listPageMixin]
})
export default class PublisherList extends Vue {
  truncateString (str, num) {
    return str.length > num ? str.slice(0, num > 3 ? num - 3 : num) + '...' : str
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
