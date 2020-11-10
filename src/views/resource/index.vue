<template>
  <div>
    <!-- 筛选条件 -->
    <el-card shadow="never">
      <el-form
        ref="searchForm"
        :model="form"
        :inline="true"
        size="small"
        label-width="80px"
      >
        <el-form-item label="资源名称">
          <el-input
            type="text"
            v-model="form.name"
            placeholder="资源名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="资源路径">
          <el-input
            type="text"
            v-model="form.url"
            placeholder="资源路径"
          ></el-input>
        </el-form-item>
        <el-form-item label="资源分类">
          <el-select
            v-model="form.categoryId"
            placeholder="请选择资源分类"
            clearable
          >
            <el-option
              v-for="item in category"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-button @click="search" type="primary" size="small"
          >查询搜索</el-button
        >
        <el-button @click="reset" size="small" style="margin-left: 20px"
          >重置</el-button
        >
      </el-form>
    </el-card>

    <!-- 操作选项 -->
    <el-card shadow="never">
      <div style="margin-bottom: 5px;">
        <el-button
          @click="$router.push({ name: 'resource-create' })"
          type="primary"
          size="small"
          >添加</el-button
        >
        <el-button
          @click="$router.push({ name: 'resource-category' })"
          size="small"
          >资源分类</el-button
        >
      </div>
    </el-card>

    <!-- 资源列表 -->
    <el-card shadow="never">
      <el-table v-loading="isLoading" :data="resources" style="width: 100%">
        <el-table-column prop="id" align="center" label="ID"></el-table-column>
        <el-table-column
          prop="name"
          align="center"
          label="资源名称"
        ></el-table-column>
        <el-table-column
          prop="url"
          align="center"
          min-width="150"
          label="资源路径"
        ></el-table-column>
        <el-table-column
          prop="description"
          align="center"
          label="描述"
        ></el-table-column>
        <el-table-column
          prop="createdTime"
          align="center"
          label="添加时间"
        ></el-table-column>
        <el-table-column label="操作" align="center" min-width="150">
          <template slot-scope="scope">
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

      <el-pagination
        style="margin-top: 20px"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        background
        :disabled="isLoading"
        :current-page="form.current"
        :page-sizes="[10, 15, 20]"
        :page-size="form.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Form } from 'element-ui'
import {
  getResourcePages,
  deleteResource,
  getAllCategory
} from '@/network/resource'

export default Vue.extend({
  name: 'ResourceIndex',
  data () {
    return {
      // 筛选条件
      form: {
        id: '',
        name: '',
        startCreateTime: '',
        url: '',
        categoryId: '',
        endCreateTime: '',
        current: 1,
        size: 10
      },
      resources: [], // 资源列表
      category: [], // 资源分类
      totalCount: 0,
      isLoading: true
    }
  },

  created () {
    this.loadResources()
    this.loadAllCategory()
  },

  methods: {
    // 加载资源列表
    async loadResources () {
      this.isLoading = true
      try {
        const { data } = await getResourcePages(this.form)
        if (data.code === '000000') {
          this.resources = data.data.records
          this.totalCount = data.data.total
        }
      } catch (error) {}
      this.isLoading = false
    },
    // 加载资源分类
    async loadAllCategory () {
      try {
        const { data } = await getAllCategory()
        if (data.code === '000000') {
          this.category = data.data
        }
      } catch (error) {}
    },
    async handleEdit (item: any) {
      this.$router.push({
        name: 'resource-update',
        params: {
          id: item.id
        }
      })
    },
    async handleDelete (index: number, item: Record<string, number>) {
      try {
        await this.$confirm('确定要删除此资源吗？', '提示')
        this.isLoading = true
        const { data } = await deleteResource(item.id)
        if (data.code === '000000') {
          this.$message.success('删除成功')
          this.form.current = 1
          this.loadResources()
        }
      } catch (error) {}
      this.isLoading = false
    },
    handleSizeChange (val: number) {
      this.form.size = val
      this.form.current = 1
      this.loadResources()
    },
    handleCurrentChange (val: number) {
      this.form.current = val
      this.loadResources()
    },
    // 查询搜索资源
    search () {
      this.form.current = 1
      this.loadResources()
    },
    // 重置查询状态
    reset () {
      this.form = {
        id: '',
        name: '',
        startCreateTime: '',
        url: '',
        categoryId: '',
        endCreateTime: '',
        current: 1,
        size: 10
      }
      this.form.current = 1
      this.loadResources()
    }
  }
})
</script>

<style lang="scss" scoped></style>
