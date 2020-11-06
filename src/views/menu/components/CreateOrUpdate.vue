<template>
  <el-card class="box-card">
    <div slot="header">{{ isUpdate ? '修改菜单' : '添加菜单' }}</div>
    <el-form ref="form" :model="menuInfo" :rules="rules" label-width="80px">
      <el-form-item label="菜单名称" prop="name">
        <el-input v-model="menuInfo.name"></el-input>
      </el-form-item>
      <el-form-item label="菜单路径">
        <el-input v-model="menuInfo.href"></el-input>
      </el-form-item>
      <el-form-item label="上级菜单">
        <el-select v-model="menuInfo.parentId" placeholder="请选择">
          <el-option key="no" label="无上级菜单" :value="-1"> </el-option>
          <el-option
            v-for="item in parentMenuList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="描述" prop="description">
        <el-input v-model="menuInfo.description"></el-input>
      </el-form-item>
      <el-form-item label="前端图标" prop="icon">
        <el-input v-model="menuInfo.icon"></el-input>
      </el-form-item>
      <el-form-item label="是否显示">
        <el-radio-group v-model="menuInfo.shown">
          <el-radio :label="true"></el-radio>
          <el-radio :label="false"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="排序">
        <el-input-number
          v-model="menuInfo.orderNum"
          :min="1"
          label="排序"
        ></el-input-number>
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
import { createOrUpdateMenu, getEditMenuInfo } from '@/network/menu'

export default Vue.extend({
  name: 'MenuCreate',
  props: {
    isUpdate: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      menuInfo: {
        parentId: -1,
        name: '',
        href: '',
        icon: '',
        orderNum: 1,
        description: '',
        shown: true
      },
      rules: {
        name: [{ required: true, message: '请输入菜单名称', trigger: 'blur' }],
        description: [
          { required: true, message: '请输入菜单描述', trigger: 'blur' }
        ],
        icon: [{ required: true, message: '请输入前端图标', trigger: 'blur' }]
      },
      parentMenuList: []
    }
  },

  created () {
    this.loadEditMenuInfo()
  },

  methods: {
    // 获取菜单
    async loadEditMenuInfo () {
      try {
        const id = this.$route.params.id || -1
        const { data } = await getEditMenuInfo(id)
        if (data.code === '000000') {
          if (data.data.menuInfo) {
            this.menuInfo = data.data.menuInfo
          }
          this.parentMenuList = data.data.parentMenuList
        }
      } catch (error) {}
    },
    // 提交
    async onSubmit () {
      try {
        await (this.$refs.form as Form).validate()
        const { data } = await createOrUpdateMenu(this.menuInfo)
        if (data.code === '000000') {
          this.$router.push({ name: 'menu' })
        }
      } catch (error) {}
    },
    // 重置表单
    resetForm () {
      (this.$refs.form as Form).resetFields()
    }
  }
})
</script>

<style scoped></style>
