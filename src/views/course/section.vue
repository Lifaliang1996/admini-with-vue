<template>
  <el-card class="course-sections">
    <template #header>
      <div class="header">
        <span>{{ courseName }}</span>
        <el-button type="primary" icon="el-icon-plus" @click="openSectionEdit"
          >添加章节</el-button
        >
      </div>
    </template>

    <el-tree
      :data="sections"
      :props="defaultProps"
      node-key="id"
      draggable
      default-expand-all
      :allow-drop="handleAllowDrag"
      @node-drop="handleDrop"
    >
      <template v-slot="{ node, data }">
        <div class="inner">
          <span>{{ node.label }}</span>

          <!-- 章节操作 -->
          <span v-if="data.sectionName">
            <el-button size="mini" @click="openSectionEdit(data)"
              >编辑</el-button
            >
            <el-button type="primary" size="mini" @click="openLessonEdit(data)"
              >添加课时</el-button
            >
            <el-select
              size="mini"
              :value="data.status"
              @change="changeSectionStatus(data, $event)"
            >
              <el-option :key="0" label="已隐藏" :value="0" />
              <el-option :key="1" label="未发布" :value="1" />
              <el-option :key="2" label="已发布" :value="2" />
            </el-select>
          </span>

          <!-- 课时操作 -->
          <span v-else>
            <el-button size="mini" @click="openLessonEdit(null, data)"
              >编辑</el-button
            >
            <el-button
              type="success"
              size="mini"
              @click="
                $router.push({
                  name: 'course-upload-video',
                  pramas: { courseId: data.courseId },
                  query: {
                    sectionId: data.sectionId,
                    lessonId: data.id
                  }
                })
              "
              >上传视频</el-button
            >
            <el-select
              size="mini"
              :value="data.status"
              @change="changeLessonStatus(data, $event)"
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
    <section-create-update
      v-model="sectionDialogFormVisible"
      :course-id="courseId"
      :course-name="courseName"
      :current-edit="currentEditSection"
      @success="loadSectionAndLesson"
    />

    <!-- 课时编辑 -->
    <lesson-create-update
      v-model="lessonDialogFormVisible"
      :course-id="courseId"
      :course-name="courseName"
      :current-edit="currentEditLesson"
      :current-section="currentEditSection"
      @success="loadSectionAndLesson"
    />
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
import { TreeNode } from 'element-ui/types/tree'
import SectionCreateUpdate from './components/SectionCreateUpdate.vue'
import LessonCreateUpdate from './components/LessonCreateUpdate.vue'

export default Vue.extend({
  name: 'CourseSection',

  metaInfo: {
    title: '内容管理'
  },

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
      sectionDialogFormVisible: false,
      lessonDialogFormVisible: false,
      // 当前正在编辑的章节
      currentEditSection: {},
      // 当前正在编辑的课时
      currentEditLesson: {}
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
        this.currentEditSection = section
      } else {
        this.currentEditSection = {}
      }
      this.sectionDialogFormVisible = true
    },
    // 更改章节状态
    async changeSectionStatus (section: any, newStatus: number) {
      await saveOrUpdateSection({
        ...section,
        status: newStatus
      })
      section.status = newStatus
      this.$message.success('更改章节状态成功')
    },
    // 打开课时编辑
    openLessonEdit (section: any, lesson: any) {
      if (lesson?.theme) {
        // 修改
        this.currentEditLesson = lesson
        this.currentEditSection =
          this.sections.find(
            (section: { id: number }) => section.id === lesson.sectionId
          ) || {}
      } else {
        // 添加
        this.currentEditLesson = {}
        this.currentEditSection = section
      }
      this.lessonDialogFormVisible = true
    },
    // 更改课时状态
    async changeLessonStatus (lesson: any, newStatus: number) {
      await saveOrUpdateLesson({
        ...lesson,
        duration: lesson.durationNum || 0,
        status: newStatus
      })
      lesson.status = newStatus
      this.$message.success('更改课时状态成功')
    },
    // 判断是否可拖动
    handleAllowDrag (
      draggingNode: TreeNode<number, any>,
      dropNode: TreeNode<number, any>,
      type: string
    ) {
      return (
        draggingNode.data.sectionId === dropNode.data.sectionId &&
        type !== 'inner'
      )
    },
    // 拖拽成功排序
    async handleDrop (
      dragNode: TreeNode<number, any>,
      dropNode: TreeNode<number, any>
    ) {
      try {
        await Promise.all(
          dropNode.parent?.childNodes.map(
            (node: TreeNode<number, any>, index: number) => {
              if (dragNode.data.lessonDTOS) {
                // 拖动章节
                return saveOrUpdateSection({
                  id: node.data.id,
                  orderNum: index
                })
              } else {
                // 拖动课时
                return saveOrUpdateLesson({
                  id: node.data.id,
                  orderNum: index
                })
              }
            }
          ) as []
        )
        this.$message.success('排序成功')
        this.loadSectionAndLesson()
      } catch {
        this.$message.error('排序失败，请刷新重试')
      }
    }
  },

  components: {
    SectionCreateUpdate,
    LessonCreateUpdate
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
