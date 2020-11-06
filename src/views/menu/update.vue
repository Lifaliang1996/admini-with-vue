<template>
  <menu-create-update :isUpdate="true" />
</template>

<script lang="ts">
import Vue from 'vue'
import MenuCreateUpdate from './components/CreateOrUpdate.vue'

export default Vue.extend({
  name: 'MenuUpdate',
  components: {
    MenuCreateUpdate
  }
})
</script>

<style scoped></style>
