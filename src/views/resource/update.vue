<template>
  <create-update is-update />
</template>

<script lang="ts">
import Vue from 'vue'
import CreateUpdate from './components/CreateOrUpdate.vue'

export default Vue.extend({
  name: 'ResourceUpdate',

  metaInfo: {
    title: '更新资源'
  },

  components: {
    CreateUpdate
  }
})
</script>

<style scoped></style>
