<template>
  <el-dialog
    class="add-dialog"
    :title="isUpdate ? '修改课时' : '添加课时'"
    :visible="value"
    :before-close="closeLessonEdit"
  >
    <el-form
      ref="lessonForm"
      :model="lessonForm"
      :rules="lessonRules"
      label-width="80px"
    >
      <el-form-item label="课程名称">
        <el-input :value="courseName" disabled />
      </el-form-item>
      <el-form-item label="章节名称">
        <el-input :value="currentSection.sectionName" disabled />
      </el-form-item>
      <el-form-item label="课时名称" prop="theme">
        <el-input v-model="lessonForm.theme" />
      </el-form-item>
      <el-form-item label="时长" prop="duration">
        <el-input v-model="lessonForm.duration" type="number">
          <template #append>分钟</template>
        </el-input>
      </el-form-item>
      <el-form-item label="课时排序">
        <el-input v-model="lessonForm.orderNum" type="number">
          <template #append>数字控制排序，数字越大越靠后</template>
        </el-input>
      </el-form-item>
      <el-form-item label="开放试听" prop="isFree">
        <el-switch
          v-model="lessonForm.isFree"
          active-color="#13ce66"
          inactive-color="#ff4949"
        />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="closeLessonEdit">取 消</el-button>
      <el-button
        type="primary"
        :disabled="lessonLoading"
        @click="handleCreateOrUpdateLesson"
        >确 定</el-button
      >
    </div>
  </el-dialog>
</template>

<script lang="ts">
import { saveOrUpdateLesson } from '@/network/course'
import { Form } from 'element-ui'
import Vue from 'vue'

export default Vue.extend({
  name: 'LessonCreateUpdate',
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
      required: true
    },
    currentEdit: {
      type: Object,
      default () {
        return {}
      }
    },
    currentSection: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      lessonLoading: false,
      isUpdate: false,
      lessonForm: {},
      lessonRules: {
        theme: [{ required: true, message: '必填项', trigger: 'blur' }],
        duration: [{ required: true, message: '必填项', trigger: 'blur' }],
        isFree: [{ required: true, message: '必填项', trigger: 'blur' }]
      }
    }
  },

  watch: {
    currentEdit (lesson: any) {
      this.isUpdate = false

      const form: any = {
        courseId: this.courseId,
        sectionId: this.currentSection.id,
        theme: lesson.theme ?? '',
        duration: lesson.durationNum ?? 0,
        isFree: lesson.isFree ?? false,
        orderNum: lesson.orderNum ?? 0,
        status: lesson.status ?? 0
      }

      if (lesson.id) {
        // 如果是修改
        form.id = lesson.id
        this.isUpdate = true
      }
      this.lessonForm = form
    }
  },

  methods: {
    // 关闭课时编辑对
    closeLessonEdit () {
      this.$emit('input', false)
    },

    async handleCreateOrUpdateLesson () {
      this.lessonLoading = true
      try {
        await (this.$refs.lessonForm as Form).validate()
        await saveOrUpdateLesson(this.lessonForm)
        this.closeLessonEdit()
        this.$emit('success')
        this.$message.success('操作课时成功')
      } catch {}
      this.lessonLoading = false
    }
  }
})
</script>

<style scoped></style>
