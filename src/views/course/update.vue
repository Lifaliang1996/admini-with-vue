<template>
  <create-or-update is-update :course-id="courseId" />
</template>

<script lang="ts">
import Vue from 'vue'
import CreateOrUpdate from './components/CreateOrUpdate.vue'

export default Vue.extend({
  name: 'CourseUpdate',
  props: {
    courseId: {
      type: [String, Number],
      required: true
    }
  },
  components: {
    CreateOrUpdate
  }
})
</script>

<style scoped></style>
