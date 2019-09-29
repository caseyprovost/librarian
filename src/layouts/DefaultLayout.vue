<template>
  <div id="app" class="flex-wrap">
    <div id="brand" class="text-3xl text-center float-left py-1 font-medium text-indigo-700">
      Librarian
    </div>
    <div id="nav" v-if="currentUser" class="py-4 px-6 shadow text-right">
      Welcome, {{ currentUser.name }} | <a href="#" @click="logout" class="hover:text-teal-500 hover:underline">Logout</a>
    </div>
    <div class="flex align-items-stretch">
      <div id="sidebar" v-if="currentUser" class="shadow">
        <ul class="sidebar-nav pt-16">
          <li v-for="link in modelLinks" :key="link.name">
            <router-link :to="link.path" class="px-8 py-2 block" activeClass="active">
              {{ link.name }}
            </router-link>
          </li>
        </ul>
      </div>
      <div id="main" class="px-4 w-full">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue } from 'vue-property-decorator'

export default Vue.extend({
  data () {
    return {
      modelLinks: [
        { name: 'Dashboard', path: '/dashboard' },
        { name: 'Books', path: '/books' },
        { name: 'Authors', path: '/authors' },
        { name: 'Publishers', path: '/publishers' }
      ]
    }
  },
  methods: {
    logout () {
      this.$store.dispatch('logout').then(() => {
        this.$router.push({ path: '/' })
      })
    }
  },
  computed: {
    currentUser: function () {
      return this.$store.getters.currentUser
    }
  }
})
</script>

<style lang="scss">
@import "vue-select/src/scss/vue-select.scss";

.vs__search::placeholder,
.vs__dropdown-toggle,
.vs__dropdown-menu {
  @apply text-indigo-100;
  @apply border;
  @apply border-indigo-900;
  @apply p-2;
}

.vs__selected {
  @apply text-gray-500;
}

.vs__clear,
.vs__open-indicator {
  fill: #394066;
  @apply text-indigo-100;
}

body {
  font-family: Nunito,Helvetica Neue,Helvetica,Arial,sans-serif;
  background: #262141;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #777CA4;
}

#sidebar {
  width: 268px;
  border-right: 1px solid #302850;
  border-top: 1px solid #302850;
  box-sizing: border-box;
  background: #2E2950;
  @apply text-gray-500;
}

#main {
  position: relative;
  min-height: 100vh;
  box-sizing: border-box;
}

#nav {
  margin-left: 227px;
  border-left: 1px solid #302850;
  border-bottom: 1px solid #302850;
  background: #2E2950;
}

#brand {
  width: 234px;
}

.sidebar-nav a.active {
  @apply text-indigo-100;
  @apply bg-indigo-800;
}

.sidebar-nav a:hover {
  @apply text-indigo-100;
  @apply bg-indigo-800;
}
</style>
