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
          <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="block uppercase tracking-wide text-xs font-bold mb-2" for="hometown">
              Hometown
            </label>
            <input class="appearance-none block w-full rounded py-3 px-4 mb-2 leading-tight" id="hometown" type="text" v-model="record.hometown">
            <p class="text-red-500 text-xs italic" v-if="hasError('hometown')">
              {{ errorText('hometown') }}
            </p>
          </div>
          <div class="w-full md:w-1/2 px-3">
            <label class="block uppercase tracking-wide text-xs font-bold mb-2" for="date_of_birth">
              Born On
            </label>
            <input class="appearance-none block w-full rounded py-3 px-4 leading-tight" id="date_of_birth" type="date" v-model="record.dateOfBirth">
          </div>
          <div class="flex flex-wrap mt-4">
            <div class="w-full px-3">
              <button class="shadow text-sm bg-teal-700 hover:bg-teal-600 focus:shadow-outline focus:outline-none text-teal-100 font-bold py-2 px-4 rounded" type="submit">
                Save Author
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

<script type="ts">
import { Vue } from 'vue-property-decorator'
import { Author } from '@/models'

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
      let { data } = await Author.find(this.id)
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
  }
})
</script>

<style type="scss" scoped="true">
  .form-wrapper {
    background: #211C37;
    @apply p-4;
    @apply mt-4;
  }

  input[type="text"],
  input[type="date"] {
    background: #211C37;
    @apply text-gray-500;
    @apply border;
    @apply border-indigo-900;
  }

  input[type="text"]:focus,
  input[type="date"]:focus {
    @apply border-indigo-800;
    @apply outline-none;
  }

  label {
    color: #777CA4;
  }
</style>
