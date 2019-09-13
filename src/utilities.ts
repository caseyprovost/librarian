import { mapGetters } from 'vuex'

const loadPaginationMixin = (collectionName : string) => {
  return {
    methods: {
      fetchCollection () {
        this.$store.dispatch(`${collectionName}/fetchCollection`)
      },
      nextPage () {
        this.$store.dispatch(`${collectionName}/incrementPage`)
      },
      prevPage () {
        this.$store.dispatch(`${collectionName}/decrementPage`)
      },
      editPath (id) {
        return `/${collectionName}/${id}/edit`
      }
    },
    computed: {
      ...mapGetters({
        collection: `${collectionName}/collection`,
        totalCount: `${collectionName}/totalCount`,
        currentPage: `${collectionName}/currentPage`,
        totalPages: `${collectionName}/totalPages`,
        hasPrevPage: `${collectionName}/hasPrevPage`,
        hasNextPage: `${collectionName}/hasNextPage`,
        filters: `${collectionName}/filters`,
        sorts: `${collectionName}/sorts`
      })
    }
  }
}

const listPageMixin = {
  mounted: function() {
    this.fetchCollection()
  }
}

export {
  loadPaginationMixin,
  listPageMixin
}
