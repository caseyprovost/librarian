<template>
  <div class="form-wrapper">
    <div v-if="record">
      <h2 class="text-2xl mb-4 font-medium">{{ record.name }}</h2>
      <form @submit.prevent="submitForm" class="w-full">
        <div class="flex flex-wrap -mx-3 mb-6">
          <div class="w-full px-3">
            <label class="block uppercase tracking-wide text-xs font-bold mb-2" for="name">
              Name
            </label>
            <input class="appearance-none block w-full rounded py-3 px-4 mb-2 leading-tight" id="name" type="text" v-model="record.name">
            <p class="text-red-500 text-xs italic" v-if="hasError('name')">
              {{ errorText('name') }}
            </p>
          </div>
        </div>
        <div class="flex flex-wrap -mx-3 mb-6">
          <div class="w-full px-3">
            <label class="block uppercase tracking-wide text-xs font-bold mb-2" for="description">
              Description
            </label>
            <textarea class="appearance-none block w-full rounded py-3 px-4 mb-2 leading-tight" id="description" v-model="record.description"></textarea>
            <p class="text-red-500 text-xs italic" v-if="hasError('description')">
              {{ errorText('description') }}
            </p>
          </div>
        </div>
        <div class="flex flex-wrap -mx-3 mb-4">
          <div class="flex flex-wrap">
            <div class="w-full px-3">
              <button class="shadow text-sm bg-teal-700 hover:bg-teal-600 focus:shadow-outline focus:outline-none text-teal-100 font-bold py-2 px-4 rounded" type="submit">
                Save Publisher
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
import { Publisher } from '@/models'
import { mapGetters } from 'vuex'

export default Vue.extend({
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      record: null
    }
  },
  mounted () {
    this.fetchRecord()
  },
  methods: {
    async fetchRecord () {
      let { data } = await Publisher.find(this.id)
      if (data) {
        this.record = data
      }
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
    // ...mapGetters({
    //   record: 'publishers/record'
    // })
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
  textarea {
    background: #211C37;
    @apply text-gray-500;
    @apply border;
    @apply border-indigo-900;
  }

  input[type="text"]:focus,
  input[type="date"]:focus,
  textarea:focus {
    @apply border-indigo-800;
    @apply outline-none;
  }

  label {
    color: #777CA4;
  }
</style>
