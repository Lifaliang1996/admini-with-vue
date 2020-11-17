<template>
  <div class="aside" :class="{ collapse: isCollapse }">
    <div class="logo" title="回到首页" @click="$router.push('/')">
      <i class="el-icon-magic-stick icon"></i>
      <h1>Light Edu</h1>
    </div>

    <el-menu
      :default-active="defaultActive"
      :collapse="isCollapse"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      router
    >
      <el-submenu index="1">
        <template #title>
          <i class="el-icon-s-tools"></i>
          <span>权限管理</span>
        </template>
        <el-menu-item index="/role">
          <i class="el-icon-user-solid"></i>
          <template #title>
            <span>角色管理</span>
          </template>
        </el-menu-item>
        <el-menu-item index="/menu">
          <i class="el-icon-menu"></i>
          <template #title>
            <span>菜单管理</span>
          </template>
        </el-menu-item>
        <el-menu-item index="/resource">
          <i class="el-icon-s-goods"></i>
          <template #title>
            <span>资源管理</span>
          </template>
        </el-menu-item>
      </el-submenu>
      <el-menu-item index="/course">
        <i class="el-icon-video-camera-solid"></i>
        <template #title>
          <span>课程管理</span>
        </template>
      </el-menu-item>
      <el-menu-item index="/user">
        <i class="el-icon-s-custom"></i>
        <template #title>
          <span>用户管理</span>
        </template>
      </el-menu-item>
      <el-submenu index="4">
        <template #title>
          <i class="el-icon-s-shop"></i>
          <span>广告管理</span>
        </template>
        <el-menu-item index="/advert">
          <i class="el-icon-menu"></i>
          <template #title>
            <span>广告列表</span>
          </template>
        </el-menu-item>
        <el-menu-item index="/advert-space">
          <i class="el-icon-menu"></i>
          <template #title>
            <span>广告位列表</span>
          </template>
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'AppAside',

  props: {
    isCollapse: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    defaultActive () {
      return this.$route.fullPath.replace(/^(\/[^/]+?)(\/.+)/, '$1')
    }
  }
})
</script>

<style lang="scss" scoped>
.aside {
  width: 160px;
  height: 100%;
  background-color: #545c64;
  overflow: hidden;
  transition: width 0.8s;

  .logo {
    display: flex;
    padding: 10px 0 10px 17px;
    color: #fff;
    cursor: pointer;

    &:hover {
      background-color: #434a50;
    }
  }

  .icon {
    margin-right: 5px;
    font-size: 30px;
  }

  h1 {
    display: block;
    margin: 0;
    width: 105px;
    color: #eeeeee;
    white-space: nowrap;
    overflow: hidden;
    transition: width 0.6s 0.1s;
  }

  &.collapse {
    width: 65px;

    h1 {
      width: 0;
    }
  }

  .el-menu {
    border: none;

    &.el-menu--collapse {
      width: 100%;
    }
  }
}</style
>>
