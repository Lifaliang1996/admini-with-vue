<template>
  <create-update is-update />
</template>

<script lang="ts">
import Vue from 'vue'
import CreateUpdate from './components/CreateOrUpdate.vue'

export default Vue.extend({
  name: 'ResourceUpdate',
  components: {
    CreateUpdate
  }
})
</script>

<style scoped></style>
