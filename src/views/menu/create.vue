<template>
  <menu-create-update />
</template>

<script lang="ts">
import Vue from 'vue'
import MenuCreateUpdate from './components/CreateOrUpdate.vue'

export default Vue.extend({
  name: 'MenuCreate',

  metaInfo: {
    title: '添加菜单'
  },

  components: {
    MenuCreateUpdate
  }
})
</script>

<style scoped></style>
