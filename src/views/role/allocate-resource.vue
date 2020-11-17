<template>
  <el-card v-loading="isLoading">
    <template #header>
      <span>分配菜单</span>
    </template>
    <el-tree
      ref="resourceTree"
      :data="roleResource"
      :default-checked-keys="selectedResource"
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
import { getRoleResources, allocateRoleResources } from '@/network/resource'

export default Vue.extend({
  name: 'RoleAllocateResource',

  metaInfo: {
    title: '分配资源'
  },

  props: {
    roleId: {
      type: [Number, String],
      required: true
    }
  },

  data () {
    return {
      roleResource: [],
      defaultProps: {
        children: 'resourceList',
        label: 'name'
      },
      isLoading: true
    }
  },

  computed: {
    selectedResource (): number[] {
      const selected: number[] = []
      this.filterSelectedResource(this.roleResource, selected)
      return selected
    }
  },

  created () {
    this.loadRoleResource()
  },

  methods: {
    // 加载角色拥有菜单信息
    async loadRoleResource () {
      this.isLoading = true
      try {
        const { data } = await getRoleResources(this.roleId)
        if (data.code === '000000') {
          this.roleResource = data.data
        }
      } catch (error) {}
      this.isLoading = false
    },
    // 筛选选中的菜单
    filterSelectedResource (resourceList: any, result: number[]) {
      resourceList.forEach((menu: any) => {
        if (menu.selected) result.push(menu.id as number)
        if (menu.subMenuList) this.filterSelectedResource(menu.resourceList, result)
      })
    },
    // 清空选中
    resetChecked () {
      ;(this.$refs.resourceTree as Tree).setCheckedKeys([])
    },
    // 提交分配菜单
    async handleAllocate () {
      this.isLoading = true
      try {
        const checked = (this.$refs.resourceTree as Tree).getCheckedKeys()
        const { data } = await allocateRoleResources(this.roleId, checked)
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
