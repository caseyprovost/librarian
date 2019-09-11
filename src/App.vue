<template>
  <div id="app">
    <component :is="layout"></component>
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
  mounted () {
    if (this.currentUser) { this.$store.commit('SET_LAYOUT', 'default-layout') } else { this.$store.commit('SET_LAYOUT', 'authentication-layout') }
  },
  computed: {
    layout () {
      return this.$store.getters.layout
    },
    currentUser () {
      return this.$store.getters.currentUser
    }
  }
})
</script>

<style lang="scss">
</style>
