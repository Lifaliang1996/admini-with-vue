<template>
  <create-update />
</template>

<script lang="ts">
import Vue from 'vue'
import CreateUpdate from './components/CreateOrUpdate.vue'

export default Vue.extend({
  name: 'AdvertCreate',

  metaInfo: {
    title: '添加广告'
  },

  components: {
    CreateUpdate
  }
})
</script>

<style scoped></style>
