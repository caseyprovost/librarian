<template>
  <div class="w-full">
    <form class="px-8 pt-6 pb-8 mb-4 text-lg" @submit.prevent="submitForm">
      <div class="mb-2">
        <input v-model="email" class="bg-black shadow opacity-50 appearance-none border border-indigo-800 rounded-lg w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username">
      </div>
      <div class="mb-1">
        <input v-model="password" class="bg-black opacity-50 shadow appearance-none border border-indigo-800 rounded w-full py-2 px-3 text-gray-300 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************">
        <!--<p class="text-red-500 text-xs italic">Please choose a password.</p>-->
      </div>
      <div class="mb-6">
        <button class="w-full bg-indigo-700 hover:bg-indigo-900 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline" type="submit">
          Sign In
        </button>
      </div>
      <div class="flex items-center justify-between">
        <a class="inline-block align-baseline font-bold text-sm text-teal-500 hover:text-teal-800" href="#">
          Forgot Password?
        </a>
        <a class="inline-block align-baseline font-bold text-sm text-teal-500 hover:text-teal-800" href="#">
          Create an Account
        </a>
      </div>
    </form>
    <p class="text-center text-gray-500 text-xs">
      &copy;2019 Acme Corp. All rights reserved.
    </p>
  </div>
</template>

<script lang="ts">
import { Vue } from 'vue-property-decorator'
import { ApplicationRecord } from '@/models'

export default Vue.extend({
  data () {
    return {
      submitting: false,
      email: null,
      password: null,
      errors: {}
    }
  },
  methods: {
    submitForm () {
      const data = { user: { email: this.email, password: this.password } }
      this.$store.dispatch('login', data).then(() => {
        this.$router.push({ path: '/dashboard' })
      })
    }
  }
})
</script>
