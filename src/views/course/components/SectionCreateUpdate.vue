<template>
  <el-dialog
    class="add-dialog"
    :title="isUpdate ? '修改章节' : '添加章节'"
    :visible="value"
    :before-close="closeSectionEdit"
  >
    <el-form
      ref="sectionForm"
      :model="sectionForm"
      :rules="sectionRules"
      label-width="80px"
    >
      <el-form-item label="课程名称" prop="courseName">
        <el-input v-model="sectionForm.courseName" disabled></el-input>
      </el-form-item>
      <el-form-item label="章节名称" prop="sectionName">
        <el-input v-model="sectionForm.sectionName"></el-input>
      </el-form-item>
      <el-form-item label="章节描述">
        <el-input v-model="sectionForm.description"></el-input>
      </el-form-item>
      <el-form-item label="章节排序">
        <el-input v-model="sectionForm.orderNum" type="number">
          <template #append>数字控制排序，数字越大越靠后</template>
        </el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="closeSectionEdit">取 消</el-button>
        <el-button
          type="primary"
          :disabled="sectionLoading"
          @click="handleCreateOrUpdateSection"
          >确 定</el-button
        >
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { saveOrUpdateSection } from '@/network/course'
import { Form } from 'element-ui'
import Vue from 'vue'

export default Vue.extend({
  name: 'SectionCreateUpdate',

  props: {
    // 是否显示
    value: {
      type: Boolean,
      required: true
    },
    courseId: {
      type: [String, Number],
      required: true
    },
    courseName: {
      type: String,
      default: '课程'
    },
    currentEdit: {
      type: Object,
      default () {
        return {}
      }
    }
  },

  data () {
    return {
      sectionLoading: false,
      isUpdate: false,
      sectionForm: {},
      sectionRules: {
        courseName: [{ required: true, message: '必填项', trigger: 'blur' }],
        sectionName: [{ required: true, message: '必填项', trigger: 'blur' }]
      }
    }
  },

  watch: {
    currentEdit (section: any) {
      this.isUpdate = false

      const form: any = {
        courseId: this.courseId,
        courseName: this.courseName,
        sectionName: section?.sectionName ?? '',
        description: section?.description ?? '',
        orderNum: section?.orderNum ?? 0,
        status: section?.status ?? 0
      }

      if (section.id) {
        // 如果是修改
        form.id = section.id
        this.isUpdate = true
      }
      this.sectionForm = form
    }
  },

  methods: {
    // 关闭章节编辑
    closeSectionEdit () {
      this.$emit('input', false)
    },

    async handleCreateOrUpdateSection () {
      this.sectionLoading = true
      try {
        await (this.$refs.sectionForm as Form).validate()
        await saveOrUpdateSection(this.sectionForm)
        this.closeSectionEdit()
        this.$emit('success')
        this.$message.success('操作章节成功')
      } catch {}
      this.sectionLoading = false
    }
  }
})
</script>

<style scoped></style>
