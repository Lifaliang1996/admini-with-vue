<template>
  <el-card>
    <el-form ref="spaceForm" :model="spaceForm" :rules="rules" label-width="100px">
      <el-form-item label="广告位名称" prop="name">
        <el-input v-model="spaceForm.name" />
      </el-form-item>
      <el-form-item label="SpaceKey">
        <el-input v-model="spaceForm.spaceKey" />
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          :loading="isLoading"
          @click="handleCreateUpdateAdvert"
          >提 交</el-button
        >
        <el-button v-if="!isUpdate" @click="resetAdForm">重 置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script lang="ts">
import Vue from 'vue'
import { Form } from 'element-ui'
import { createOrUpdateAdSpace, getAdSpaceById } from '@/network/advert'

export default Vue.extend({
  name: 'AdvertSpaceCreateOrUpdate',

  props: {
    isUpdate: {
      type: Boolean,
      default: false
    },
    id: {
      type: [Number, String]
    }
  },

  data () {
    return {
      spaceForm: {
        // id: 0,
        name: '',
        spaceKey: ''
      },
      rules: {
        name: [{ required: true, message: '必填项', trigger: 'blur' }]
      },
      isLoading: false
    }
  },

  created () {
    if (this.isUpdate) this.loadAdSpaceById()
  },

  methods: {
    async loadAdSpaceById () {
      try {
        const { data } = await getAdSpaceById(this.id)
        if (data.success) {
          this.spaceForm = data.content
        }
      } catch {}
    },
    async handleCreateUpdateAdvert () {
      this.isLoading = false
      try {
        await (this.$refs.spaceForm as Form).validate()
        const { data } = await createOrUpdateAdSpace(this.spaceForm)
        if (data.success) {
          this.$message.success(this.isUpdate ? '修改广告位成功' : '添加广告位成功')
          this.$router.push({ name: 'advert-space' })
        } else {
          throw new Error()
        }
      } catch (error) {
        this.$message.error('操作失败')
      }
      this.isLoading = true
    },
    resetAdForm () {
      ;(this.$refs.spaceForm as Form).resetFields()
    }
  }
})
</script>

<style scoped></style>
