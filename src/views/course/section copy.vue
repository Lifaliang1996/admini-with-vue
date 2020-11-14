<template>
  <el-card class="course-sections">
    <div class="header" slot="header">
      <span>{{ courseName }}</span>
      <el-button type="primary" icon="el-icon-plus" @click="openSectionEdit"
        >添加章节</el-button
      >
    </div>

    <el-tree :data="sections" :props="defaultProps" node-key="id" draggable>
      <template v-slot="{ node, data }">
        <div class="inner">
          <span>{{ node.label }}</span>

          <!-- 章节操作 -->
          <span v-if="data.sectionName">
            <el-button size="mini" @click="openSectionEdit(data)"
              >编辑</el-button
            >
            <el-button
              type="primary"
              size="mini"
              @click="openLessonCreate(data)"
              >添加课时</el-button
            >
            <el-select
              size="mini"
              :value="data.status"
              @change="handleCreateOrUpdateSection(data, $event)"
            >
              <el-option :key="0" label="已隐藏" :value="0" />
              <el-option :key="1" label="未发布" :value="1" />
              <el-option :key="2" label="已发布" :value="2" />
            </el-select>
          </span>
          <!-- 课时操作 -->
          <span v-else>
            <el-button size="mini" @click="openLessonEdit(data)"
              >编辑</el-button
            >
            <el-button type="success" size="mini">上传视频</el-button>
            <el-select
              size="mini"
              :value="data.status"
              @change="handleCreateOrUpdateLesson(data, $event)"
            >
              <el-option :key="0" label="已隐藏" :value="0" />
              <el-option :key="1" label="未发布" :value="1" />
              <el-option :key="2" label="已发布" :value="2" />
            </el-select>
          </span>
        </div>
      </template>
    </el-tree>

    <!-- 章节编辑 -->
    <el-dialog
      class="add-dialog"
      :title="isUpdate ? '修改章节' : '添加章节'"
      :visible.sync="sectionDialogFormVisible"
      @closed="closeSectionEdit"
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
      <div slot="footer" class="dialog-footer">
        <el-button @click="sectionDialogFormVisible = false">取 消</el-button>
        <el-button
          type="primary"
          :disabled="sectionLoading"
          @click="handleCreateOrUpdateSection"
          >确 定</el-button
        >
      </div>
    </el-dialog>

    <!-- 课时编辑 -->
    <el-dialog
      class="add-dialog"
      :title="isUpdate ? '修改课时' : '添加课时'"
      :visible.sync="lessonDialogFormVisible"
      @closed="closeLessonEdit"
    >
      <el-form
        ref="lessonForm"
        :model="lessonForm"
        :rules="lessonRules"
        label-width="80px"
      >
        <el-form-item label="课程名称" prop="courseName">
          <el-input v-model="lessonForm.courseName" disabled />
        </el-form-item>
        <el-form-item label="章节名称" prop="sectionName">
          <el-input v-model="lessonForm.sectionName" disabled />
        </el-form-item>
        <el-form-item label="课时名称" prop="sectionName">
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
        <el-button @click="lessonDialogFormVisible = false">取 消</el-button>
        <el-button
          type="primary"
          :disabled="lessonLoading"
          @click="handleCreateOrUpdateLesson"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </el-card>
</template>

<script lang="ts">
import Vue from 'vue'
import {
  getCourseById,
  getSectionAndLesson,
  saveOrUpdateLesson,
  saveOrUpdateSection
} from '@/network/course'
import { Form } from 'element-ui'

export default Vue.extend({
  name: 'CourseSection',
  props: {
    courseId: {
      type: [String, Number],
      required: true
    }
  },

  data () {
    return {
      courseName: '',
      sections: [],
      defaultProps: {
        children: 'lessonDTOS',
        label: (data: { sectionName?: string; theme?: string }) =>
          data.sectionName || data.theme
      },
      isUpdate: false,
      // 章节弹出框是否显示
      sectionDialogFormVisible: false,
      // 章节正在提交
      sectionLoading: false,
      // 章节表单
      sectionForm: {
        // id: '',
        courseId: this.courseId,
        courseName: '',
        sectionName: '',
        description: '',
        orderNum: 0,
        status: 0
      },
      // 章节表单验证
      sectionRules: {
        courseName: [{ required: true, message: '必填项', trigger: 'blur' }],
        sectionName: [{ required: true, message: '必填项', trigger: 'blur' }]
      },
      // 课时弹出框是否显示
      lessonDialogFormVisible: false,
      // 课时正在提交
      lessonLoading: false,
      // 课时表单
      lessonForm: {
        // id: 0,
        courseId: this.courseId,
        courseName: '',
        sectionId: 0,
        sectionName: '',
        theme: '',
        duration: 0,
        isFree: false,
        orderNum: 0,
        status: 0
      },
      // 课时表单验证
      lessonRules: {
        courseName: [{ required: true, message: '必填项', trigger: 'blur' }],
        sectionName: [{ required: true, message: '必填项', trigger: 'blur' }],
        theme: [{ required: true, message: '必填项', trigger: 'blur' }],
        duration: [{ required: true, message: '必填项', trigger: 'blur' }],
        isFree: [{ required: true, message: '必填项', trigger: 'blur' }]
      }
    }
  },

  created () {
    this.loadCourse()
    this.loadSectionAndLesson()
  },

  methods: {
    // 获取课程信息
    async loadCourse () {
      try {
        const { data } = await getCourseById(this.courseId)
        this.courseName = data.data.courseName
        this.sectionForm.courseName = this.courseName
      } catch {}
    },

    // 获取章节信息
    async loadSectionAndLesson () {
      try {
        const { data } = await getSectionAndLesson(this.courseId)
        this.sections = data.data
      } catch {}
    },

    // 打开章节编辑
    openSectionEdit (section: any) {
      if (section.id) {
        this.isUpdate = true
        this.sectionForm = {
          courseName: this.courseName,
          ...section
        }
      }
      this.sectionDialogFormVisible = true
    },

    // 关闭章节编辑
    closeSectionEdit () {
      this.sectionForm = {
        courseId: this.courseId,
        courseName: this.courseName,
        sectionName: '',
        description: '',
        orderNum: 0,
        status: 0
      }
      this.isUpdate = false
    },

    async handleCreateOrUpdateSection (section: any, newStatus: number) {
      this.sectionLoading = true
      try {
        if ([0, 1, 2].includes(newStatus)) {
          // 更改状态
          await saveOrUpdateSection({
            ...section,
            duration: section.durationNum || 0,
            status: newStatus
          })
          section.status = newStatus
          this.$message.success('更改章节状态成功')
        } else {
          // 修改整个
          await (this.$refs.sectionForm as Form).validate()
          await saveOrUpdateSection(this.sectionForm)
          this.loadSectionAndLesson()
          this.$message.success('操作章节成功')
        }
        this.sectionDialogFormVisible = false
      } catch {}
      this.sectionLoading = false
    },

    // 打开课时添加
    openLessonCreate (section: any) {
      this.lessonForm = {
        courseId: this.courseId,
        courseName: this.courseName,
        sectionId: section.id,
        sectionName: section.sectionName,
        theme: '',
        duration: 0,
        isFree: false,
        orderNum: 0,
        status: 0
      }
      this.lessonDialogFormVisible = true
    },

    // 打开课时编辑
    openLessonEdit (lesson: any) {
      this.isUpdate = true
      const section: any = this.sections.find(
        (section: any) => section.id === lesson.sectionId
      )
      this.lessonForm = {
        ...lesson,
        courseName: this.courseName,
        sectionName: section.sectionName,
        duration: lesson.durationNum
      }
      this.lessonDialogFormVisible = true
    },

    // 关闭课时编辑对
    closeLessonEdit () {
      this.isUpdate = false
    },

    async handleCreateOrUpdateLesson (lesson: any, newStatus: number) {
      this.lessonLoading = true
      try {
        if ([0, 1, 2].includes(newStatus)) {
          // 更改状态
          await saveOrUpdateLesson({
            ...lesson,
            duration: lesson.durationNum || 0,
            status: newStatus
          })
          lesson.status = newStatus
          this.$message.success('更改课时状态成功')
        } else {
          // 编辑整个
          await (this.$refs.lessonForm as Form).validate()
          await saveOrUpdateLesson(this.lessonForm)
          this.loadSectionAndLesson()
          this.$message.success('操作课时成功')
          this.lessonDialogFormVisible = false
        }
      } catch {}
      this.lessonLoading = false
    }
  }
})
</script>

<style lang="scss" scoped>
.course-sections .add-dialog .el-form {
  width: 90%;
  max-width: 660px;
  margin: 0 auto;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

::v-deep .el-tree-node__content {
  height: auto;
}

.inner {
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  border-bottom: 1px solid #ebeef5;

  .el-select {
    margin-left: 10px;
    width: 90px;
  }
}
</style>
