<template>
  <menu-create-update is-update />
</template>

<script lang="ts">
import Vue from 'vue'
import MenuCreateUpdate from './components/CreateOrUpdate.vue'

export default Vue.extend({
  name: 'MenuUpdate',

  metaInfo: {
    title: '更新菜单'
  },

  components: {
    MenuCreateUpdate
  }
})
</script>

<style scoped></style>
