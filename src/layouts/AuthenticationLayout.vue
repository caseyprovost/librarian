<template>
  <div class="home flex">
    <div class="m-auto w-1/4">
      <h1 class="text-center text-teal-500 text-4xl">Librarian</h1>
      <h3 class="text-center text-indigo-500 text-xl">Let out the inner wizard</h3>
      <Login v-show="displayLogin" />
      <Signup v-show="displaySignup" />
      <ForgotPassword v-show="displayForgotPassword" />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue } from 'vue-property-decorator'
import Login from '@/components/Login.vue'
import Signup from '@/components/Signup.vue'
import ForgotPassword from '@/components/ForgotPassword.vue'

export default Vue.extend({
  components: {
    Login,
    Signup,
    ForgotPassword
  },
  data () {
    return {
      displayLogin: true,
      displaySignup: false,
      displayForgotPassword: false
    }
  }
})
</script>

<style lang="scss" scoped>
  body {
    background: #1a202c;
  }
</style>
