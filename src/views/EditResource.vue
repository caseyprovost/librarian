<template>
  <div>
    This is the edit page
  </div>
</template>

<script type="ts">
import { Vue } from 'vue-property-decorator'
import * as models from '@/models'
import pluralize from 'pluralize'

export default Vue.extend({
  props: {
    id: {
      type: String,
      required: true
    },
    collectionName: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      record: null,
      validations: {}
    }
  },
  mounted () {
    this.fetchRecord();
  },
  methods: {
    async fetchRecord() {
      let { data } = await this.model.find(this.id)
      if (data) {
        this.record = data
        console.log(this.model.schema)
      }
    }
  },
  computed: {
    modelName: function () {
      return pluralize(this.collectionName.replace(/^\w/, (c) => c.toUpperCase()), 1)
    },
    model: function () {
      return models[this.modelName]
    }
  }
})
</script>

<style type="scss">

</style>
