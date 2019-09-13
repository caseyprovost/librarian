<template>
  <div id="app">
    <component :is="layout"></component>
  </div>
</template>

<script lang="ts">
import { Vue } from 'vue-property-decorator'
import DefaultLayout from './layouts/DefaultLayout'
import AuthenticationLayout from './layouts/AuthenticationLayout'
import { mapGetters } from 'vuex'

export default Vue.extend({
  components: {
    'default-layout': DefaultLayout,
    'authentication-layout': AuthenticationLayout
  },
  mounted () {
    const layout = this.currentUser ? 'default-layout' : 'authentication-layout'
    this.$store.dispatch('setLayout', layout)
  },
  computed: {
    ...mapGetters([
      'layout',
      'currentUser'
    ])
  }
})
</script>

<style lang="scss">
</style>
