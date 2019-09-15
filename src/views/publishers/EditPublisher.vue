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
          <div class="w-full px-3">
            <label class="block uppercase tracking-wide text-xs font-bold mb-2" for="description">
              Description
            </label>
            <textarea class="appearance-none block w-full rounded py-3 px-4 mb-2 leading-tight" id="description" v-model="editableRecord.description"></textarea>
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
    <div v-if="!editableRecord">
      Loading
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { Publisher } from '@/models'
import { mapGetters } from 'vuex'

@Component
export default class EditPublisher extends Vue {
  @Prop() id!: string

  editableRecord = null
  saving = false
  success = false

  mounted () {
    this.syncRecord()
  }

  syncRecord () {
    this.$store.dispatch('publishers/fetchRecord', this.id).then(() => {
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
    return this.$store.getters['publishers/record']
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
