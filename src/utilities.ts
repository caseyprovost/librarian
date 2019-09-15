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
  mounted: function () {
    this.fetchCollection()
  }
}

const formMixin = {
  methods: {
    hasError (field) : boolean {
      if (this.editableRecord.errors) {
        return this.editableRecord.errors[field] !== null
      } else {
        return false
      }
    },
    errorText (field) : string {
      if (this.editableRecord.errors && this.editableRecord.errors[field]) {
        return this.editableRecord.errors[field].message
      } else {
        return ''
      }
    }
  }
}

export {
  loadPaginationMixin,
  listPageMixin,
  formMixin
}
