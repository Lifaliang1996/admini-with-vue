<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  metaInfo: {
    title: '后台管理系统',
    titleTemplate: '%s - 微光教育'
  }
})
</script>

<style lang="scss"></style>
