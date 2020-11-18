<template>
  <create-update :is-update="true" :id="id" />
</template>

<script lang="ts">
import Vue from 'vue'
import CreateUpdate from './components/CreateOrUpdate.vue'

export default Vue.extend({
  name: 'AdvertSpaceUpdate',

  metaInfo: {
    title: '修改广告位'
  },

  props: {
    id: {
      type: [Number, String],
      required: true
    }
  },

  components: {
    CreateUpdate
  }
})
</script>

<style scoped></style>
