<template>
  <create-or-update />
</template>

<script lang="ts">
import Vue from 'vue'
import CreateOrUpdate from './components/CreateOrUpdate.vue'

export default Vue.extend({
  name: 'CourseCreate',

  metaInfo: {
    title: '添加课程'
  },

  components: {
    CreateOrUpdate
  }
})
</script>

<style scoped></style>
