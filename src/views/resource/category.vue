<template>
  <div>
    <!-- 操作选项 -->
    <el-card shadow="never">
      <div style="margin-bottom: 5px;">
        <el-button @click="handleOpened" type="primary" size="small"
          >添加</el-button
        >
      </div>
    </el-card>

    <!-- 资源列表 -->
    <el-card shadow="never">
      <el-table v-loading="isLoading" :data="categories" style="width: 100%">
        <el-table-column prop="id" align="center" label="ID"></el-table-column>
        <el-table-column
          prop="name"
          align="center"
          label="分类名称"
        ></el-table-column>
        <el-table-column
          prop="createdTime"
          align="center"
          label="添加时间"
        ></el-table-column>
        <el-table-column
          prop="sort"
          align="center"
          label="排序"
        ></el-table-column>
        <el-table-column label="操作" align="center" min-width="150">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleOpened(scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-dialog
      @open="handleOpened"
      @closed="handleClosed"
      :title="isUpdate ? '修改分类' : '添加分类'"
      :visible.sync="dialogFormVisible"
      style="min-width: 980px;"
    >
      <el-form
        :model="categoryForm"
        label-width="70px"
        style="width: 60%; margin: auto"
      >
        <el-form-item label="名称：">
          <el-input v-model="categoryForm.name"></el-input>
        </el-form-item>
        <el-form-item label="排序：">
          <el-input-number
            v-model="categoryForm.sort"
            style="width: 100%;"
            controls-position="right"
            :min="0"
          ></el-input-number>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {
  getAllCategory,
  createOrUpdateCategory,
  deleteCategory
} from '@/network/resource'

export default Vue.extend({
  name: 'ResourceCategory',
  data () {
    return {
      categoryForm: {
        id: NaN,
        name: '',
        sort: 0
      },
      categories: [], // 资源分类
      isLoading: true,
      dialogFormVisible: false, // 弹出框
      isUpdate: false // 是否是修改
    }
  },

  created () {
    this.loadAllCategory()
  },

  methods: {
    // 加载资源分类
    async loadAllCategory () {
      this.isLoading = true
      try {
        const { data } = await getAllCategory()
        if (data.code === '000000') {
          this.categories = data.data
        }
      } catch (error) {}
      this.isLoading = false
    },
    // 打开对话框
    handleOpened (item: { name: string; id: number; sort: number }) {
      if (item?.id) {
        this.isUpdate = true
        this.categoryForm.name = item.name
        this.categoryForm.sort = item.sort
        this.categoryForm.id = item.id
      }
      this.dialogFormVisible = true
    },
    // 关闭对话框
    handleClosed () {
      this.categoryForm = {
        id: NaN,
        name: '',
        sort: 0
      }
      this.dialogFormVisible = false
      this.isUpdate = false
    },
    // 删除分类
    async handleDelete (item: { id: number }) {
      try {
        await this.$confirm('确定要删除此分类吗？', '删除提示', {
          type: 'warning'
        })
        const { data } = await deleteCategory(item.id)
        if (data.code === '000000' && data.data) {
          this.$message.success('删除成功')
          this.loadAllCategory()
        }
      } catch (error) {
        this.$message.error(`删除失败：${error.message}`)
      }
    },
    // 提交添加或修改
    async onSubmit () {
      try {
        const { data } = await createOrUpdateCategory(this.categoryForm)
        if (data.data) {
          if (this.isUpdate) {
            this.$message.success('修改分类成功')
          } else {
            this.$message.success('添加分类成功')
          }
          this.dialogFormVisible = false
          this.loadAllCategory()
        }
      } catch (error) {}
    }
  }
})
</script>

<style lang="scss" scoped></style>
