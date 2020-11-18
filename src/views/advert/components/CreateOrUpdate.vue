<template>
  <el-card>
    <el-form ref="adForm" :model="adForm" :rules="rules" label-width="80px">
      <el-form-item label="广告名称" prop="name">
        <el-input v-model="adForm.name" />
      </el-form-item>
      <el-form-item label="广告位置">
        <el-select v-model="adForm.spaceId" placeholder="请选择">
          <el-option
            v-for="space in adSpaceList"
            :key="space.id"
            :value="space.id"
            :label="space.name"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="开始时间" prop="startTime">
        <el-date-picker
          v-model="adForm.startTime"
          type="datetime"
          placeholder="选择日期时间"
        />
      </el-form-item>
      <el-form-item label="结束时间" prop="endTime">
        <el-date-picker
          v-model="adForm.endTime"
          type="datetime"
          placeholder="选择日期时间"
        />
      </el-form-item>
      <el-form-item label="上线/下线">
        <el-switch
          v-model="adForm.status"
          :active-value="1"
          :inactive-value="0"
          active-color="#13ce66"
          inactive-color="#ff4949"
        />
      </el-form-item>
      <el-form-item label="广告图片">
        <upload-image v-model="adForm.img" url="/front/upload/img" />
      </el-form-item>
      <el-form-item label="广告链接" prop="link">
        <el-input v-model="adForm.link" />
      </el-form-item>
      <el-form-item label="广告备注">
        <el-input
          v-model="adForm.text"
          type="textarea"
          placeholder="请输入内容"
        />
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
import { getAllSpaces, getAdById, createOrUpdateAdvert } from '@/network/advert'
import UploadImage from '@/components/upload-image/index.vue'
import { Form } from 'element-ui'

export default Vue.extend({
  name: 'AdvertCreateOrUpdate',

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
      adForm: {
        // id: 0,
        name: '',
        spaceId: null,
        text: '',
        img: '',
        link: '',
        startTime: '',
        endTime: '',
        status: 0
      },
      rules: {
        name: [{ required: true, message: '必填项', trigger: 'blur' }],
        startTime: [{ required: true, message: '必填项', trigger: 'blur' }],
        endTime: [{ required: true, message: '必填项', trigger: 'blur' }],
        link: [{ required: true, message: '必填项', trigger: 'blur' }]
      },
      adSpaceList: [],
      isLoading: false
    }
  },

  created () {
    if (this.isUpdate) this.loadAdById()
    this.loadAllAdSpace()
  },

  methods: {
    async loadAdById () {
      try {
        const { data } = await getAdById(this.id)
        if (data.success) {
          this.adForm = data.content
        }
      } catch {}
    },
    async loadAllAdSpace () {
      try {
        const { data } = await getAllSpaces()
        if (data.success) {
          this.adSpaceList = data.content
        }
      } catch {}
    },
    async handleCreateUpdateAdvert () {
      this.isLoading = false
      try {
        await (this.$refs.adForm as Form).validate()
        const { data } = await createOrUpdateAdvert(this.adForm)
        if (data.success) {
          this.$message.success(this.isUpdate ? '修改广告成功' : '添加广告成功')
          this.$router.push({ name: 'advert' })
        } else {
          throw new Error()
        }
      } catch (error) {
        this.$message.error('操作失败')
      }
      this.isLoading = true
    },
    resetAdForm () {
      ;(this.$refs.adForm as Form).resetFields()
    }
  },

  components: {
    UploadImage
  }
})
</script>

<style scoped></style>
