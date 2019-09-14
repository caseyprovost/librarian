<template>
  <div class="form-wrapper">
    <div v-if="editableRecord">
      <h2 class="text-2xl mb-4 font-medium">{{ editableRecord.name }}</h2>
      <form @submit.prevent="submitForm" class="w-full">
        <div class="flex flex-wrap -mx-3 mb-6">
          <div class="w-full px-3">
            <label class="block uppercase tracking-wide text-xs font-bold mb-2" for="name">
              Name
            </label>
            <input class="appearance-none block w-full rounded py-3 px-4 mb-2 leading-tight" id="name" type="text" v-model="editableRecord.name">
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
            <input class="appearance-none block w-full rounded py-3 px-4 mb-2 leading-tight" id="hometown" type="text" v-model="editableRecord.hometown">
            <p class="text-red-500 text-xs italic" v-if="hasError('hometown')">
              {{ errorText('hometown') }}
            </p>
          </div>
          <div class="w-full md:w-1/2 px-3">
            <label class="block uppercase tracking-wide text-xs font-bold mb-2" for="date_of_birth">
              Born On
            </label>
            <input class="appearance-none block w-full rounded py-3 px-4 leading-tight" id="date_of_birth" type="date" v-model="editableRecord.dateOfBirth">
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
    <div v-if="!editableRecord">
      Loading
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { Author } from '@/models'
import { mapGetters } from 'vuex'

@Component
export default class EditAuthor extends Vue {
  @Prop() id!: string

  editableRecord = null
  saving = false
  success = false

  mounted () {
    this.syncRecord()
  }

  syncRecord () {
    this.$store.dispatch('authors/fetchRecord', this.id).then(() => {
      this.editableRecord = this.record.dup()
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

  hasError (field) : boolean {
    if (this.editableRecord && this.editableRecord.errors) {
      return this.editableRecord.errors[field] !== null
    } else {
      return false
    }
  }

  errorText (field) : string {
    if (this.editableRecord.errors && this.editableRecord.errors[field]) {
      return this.editableRecord.errors[field].message
    } else {
      return ''
    }
  }

  get record () : Author | null {
    return this.$store.getters['authors/record']
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
