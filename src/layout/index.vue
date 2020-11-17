<template>
  <el-container class="layout">
    <el-aside style="width: auto;">
      <app-aside :is-collapse="isCollapse" />
    </el-aside>
    <el-container>
      <el-header>
        <app-header v-model="isCollapse" />
      </el-header>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import Vue from 'vue'
import AppAside from './components/app-aside.vue'
import AppHeader from './components/app-header.vue'

export default Vue.extend({
  name: 'Layout',

  data () {
    return {
      isCollapse: false
    }
  },

  components: {
    AppAside,
    AppHeader
  }
})
</script>

<style scoped>
.layout {
  height: 100vh;
  min-width: 980px;
}

.el-header {
  background-color: #fff;
}

.el-aside {
  height: 100%;
}

.el-main {
  background-color: #e9eef3;
}
</style>
