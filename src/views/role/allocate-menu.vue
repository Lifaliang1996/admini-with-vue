<template>
  <el-card v-loading="isLoading">
    <div slot="header">
      <span>分配菜单</span>
    </div>
    <el-tree
      ref="menusTree"
      :data="roleMenus"
      :default-checked-keys="selectedMenus"
      show-checkbox
      default-expand-all
      node-key="id"
      :props="defaultProps"
    >
    </el-tree>
    <div style="margin-top: 40px; padding: 0 20px;">
      <el-button @click="resetChecked">清 空</el-button>
      <el-button @click="handleAllocate" type="primary">提 交</el-button>
    </div>
  </el-card>
</template>

<script lang="ts">
import Vue from 'vue'
import { Tree } from 'element-ui'
import { getRoleMenus, allocateRoleMenus } from '@/network/menu'

export default Vue.extend({
  name: 'RoleAllocateMenu',
  props: {
    roleId: {
      type: [Number, String],
      required: true
    }
  },

  data () {
    return {
      roleMenus: [],
      defaultProps: {
        children: 'subMenuList',
        label: 'name'
      },
      isLoading: true
    }
  },

  computed: {
    selectedMenus (): number[] {
      const selected: number[] = []
      this.filterSelectedMenus(this.roleMenus, selected)
      return selected
    }
  },

  created () {
    this.loadRoleMenus()
  },

  methods: {
    // 加载角色拥有菜单信息
    async loadRoleMenus () {
      this.isLoading = true
      try {
        const { data } = await getRoleMenus(this.roleId)
        if (data.code === '000000') {
          this.roleMenus = data.data
        }
      } catch (error) {}
      this.isLoading = false
    },
    // 筛选选中的菜单
    filterSelectedMenus (menuList: any, result: number[]) {
      menuList.forEach((menu: any) => {
        if (menu.selected) result.push(menu.id as number)
        if (menu.subMenuList) this.filterSelectedMenus(menu.subMenuList, result)
      })
    },
    // 清空选中
    resetChecked () {
      ;(this.$refs.menusTree as Tree).setCheckedKeys([])
    },
    // 提交分配菜单
    async handleAllocate () {
      this.isLoading = true
      try {
        const checked = (this.$refs.menusTree as Tree).getCheckedKeys()
        const { data } = await allocateRoleMenus(this.roleId, checked)
        if (data.data) {
          this.$message.success('分配菜单成功')
          this.$router.push({
            name: 'role'
          })
        }
      } catch (error) {}
      this.isLoading = false
    }
  }
})
</script>

<style scoped></style>
