<template>
  <div>
    <el-card class="box-card">
      <div slot="header">
        <el-button size="small" @click="$router.push({ name: 'menu-create' })"
          >添加菜单</el-button
        >
      </div>
      <el-table v-loading="isLoading" :data="allMenu" style="width: 100%">
        <el-table-column
          type="index"
          align="center"
          label="序号"
        ></el-table-column>
        <el-table-column
          prop="name"
          align="center"
          label="菜单名称"
        ></el-table-column>
        <el-table-column
          prop="description"
          align="center"
          min-width="150"
          label="菜单简介"
        ></el-table-column>
        <el-table-column
          prop="level"
          align="center"
          label="菜单级数"
        ></el-table-column>
        <el-table-column
          prop="icon"
          align="center"
          label="前端图标"
        ></el-table-column>
        <el-table-column
          prop="orderNum"
          align="center"
          label="排序"
        ></el-table-column>
        <el-table-column label="操作" align="center" min-width="150">
          <template v-slot="scope">
            <el-button size="mini" @click="handleEdit(scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { getAllMenu, deleteMenu } from '@/network/menu'

export default Vue.extend({
  name: 'MenuIndex',
  data () {
    return {
      allMenu: [],
      isLoading: true
    }
  },

  created () {
    this.loadAllMenu()
  },

  methods: {
    // 加载所有菜单
    async loadAllMenu () {
      this.isLoading = true
      try {
        const { data } = await getAllMenu()
        if (data.code === '000000') {
          this.allMenu = data.data
        }
      } catch (error) {}
      this.isLoading = false
    },
    async handleEdit (menu: any) {
      this.$router.push({
        name: 'menu-update',
        params: {
          id: menu.id
        }
      })
    },
    async handleDelete (index: number, menu: Record<string, number>) {
      try {
        await this.$confirm('确定要删除此菜单吗？', '提示')
        this.isLoading = true
        const { data } = await deleteMenu(menu.id)
        if (data.code === '000000') {
          this.$message.success('删除成功')
          this.allMenu.splice(index, 1)
        }
      } catch (error) {}
      this.isLoading = false
    }
  }
})
</script>

<style lang="scss" scoped></style>
