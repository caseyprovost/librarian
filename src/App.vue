<template>
  <div id="app">
    <component v-bind:is="layout"></component>
  </div>
</template>

<script lang="ts">
import { Vue } from 'vue-property-decorator'
import DefaultLayout from './layouts/DefaultLayout'
import AuthenticationLayout from './layouts/AuthenticationLayout'

export default Vue.extend({
  components: {
    'default-layout': DefaultLayout,
    'authentication-layout': AuthenticationLayout
  },
  computed: {
    layout () {
      if (this.currentUser) { return 'default-layout' } else { return 'authentication-layout' }
    },
    currentUser: function () {
      return JSON.parse(localStorage.getItem('currentUser'))
    }
  }
})
</script>

<style lang="scss">
</style>
