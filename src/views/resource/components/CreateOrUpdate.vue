<template>
  <el-card class="box-card">
    <div slot="header">{{ isUpdate ? '修改资源' : '添加资源' }}</div>
    <el-form ref="form" :model="resourceForm" :rules="rules" v-loading="isLoading" label-width="80px">
      <el-form-item label="资源名称" prop="name">
        <el-input v-model="resourceForm.name"></el-input>
      </el-form-item>
      <el-form-item label="资源路径" prop="url">
        <el-input v-model="resourceForm.url"></el-input>
      </el-form-item>
      <el-form-item label="资源分类" prop="categoryId">
        <el-select
          v-model="resourceForm.categoryId"
          placeholder="请选择资源分类"
        >
          <el-option
            v-for="item in resourceCategory"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="资源描述" prop="description">
        <el-input v-model="resourceForm.description"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">{{
          isUpdate ? '修改' : '创建'
        }}</el-button>
        <el-button v-if="!isUpdate" @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script lang="ts">
import Vue from 'vue'
import { Form } from 'element-ui'
import { getAllCategory, getResource, saveOrUpdate } from '@/network/resource'

export default Vue.extend({
  name: 'ResourceCreateUpdate',
  props: {
    // 是否是修改
    isUpdate: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      resourceForm: {
        name: '',
        categoryId: null,
        url: '',
        description: ''
      },
      rules: {
        name: [{ required: true, message: '请输入资源名称', trigger: 'blur' }],
        categoryId: [
          { required: true, message: '请输入资源分类', trigger: 'blur' }
        ],
        url: [{ required: true, message: '请输入资源路径', trigger: 'blur' }]
      },
      resourceCategory: [],
      isLoading: false
    }
  },

  created () {
    this.loadCategory()
    this.isUpdate && this.loadResource()
  },

  methods: {
    // 加载资源分类
    async loadCategory () {
      this.isLoading = true
      try {
        const { data } = await getAllCategory()
        if (data.code === '000000') {
          this.resourceCategory = data.data
        }
      } catch (error) {}
      this.isLoading = false
    },
    // 获取要修改的资源信息
    async loadResource () {
      this.isLoading = true
      try {
        const id = this.$route.params.id
        const { data } = await getResource(id)
        if (data.code === '000000' && data.data) {
          this.resourceForm = data.data
        } else {
          this.$message.error('该资源不存在!')
        }
      } catch (error) {}
      this.isLoading = false
    },
    // 提交
    async onSubmit () {
      try {
        await (this.$refs.form as Form).validate()
        this.isLoading = true
        const { data } = await saveOrUpdate(this.resourceForm)
        if (data.code === '000000') {
          this.$message.success('提交成功')
          this.$router.push({ name: 'resource' })
        }
      } catch (error) {}
      this.isLoading = false
    },
    // 重置表单
    resetForm () {
      ;(this.$refs.form as Form).resetFields()
    }
  }
})
</script>

<style scoped></style>
