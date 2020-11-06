<template>
  <div class="header">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
      <el-breadcrumb-item v-for="item in breadcrumb" :key="item.path" :to="item.path">{{ item.title }}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-dropdown>
      <span class="el-dropdown-link">
        <el-avatar
          :size="40"
          :src="userInfo.portrait || require('@/assets/img/default-avatar.png')"
        ></el-avatar>
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>{{ userInfo.userName }}</el-dropdown-item>
        <el-dropdown-item divided @click.native="logout">退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { getUserInfo } from '@/network/user'

export default Vue.extend({
  name: 'AppHeader',
  data () {
    return {
      userInfo: {}
    }
  },

  computed: {
    breadcrumb () {
      return this.$route.meta.breadcrumb
    }
  },

  created () {
    this.loadUserInfo()
  },

  methods: {
    // 加载登录用户信息
    async loadUserInfo () {
      try {
        const { data } = await getUserInfo()
        this.userInfo = data.content
      } catch (error) {}
    },
    // 退出登录
    logout () {
      this.$confirm('确定退出登录吗？', '退出登录', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.commit('setUser', null)
        this.$router.push({
          name: 'login'
        })
      }).catch()
    }
  }
})
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: space-between;

  .el-dropdown-link {
    display: flex;
    align-items: center;
  }
}
</style>
