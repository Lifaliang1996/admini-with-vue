<template>
  <create-update />
</template>

<script lang="ts">
import Vue from 'vue'
import CreateUpdate from './components/CreateOrUpdate.vue'

export default Vue.extend({
  name: 'ResourceCreate',

  metaInfo: {
    title: '添加资源'
  },

  components: {
    CreateUpdate
  }
})
</script>

<style scoped></style>
