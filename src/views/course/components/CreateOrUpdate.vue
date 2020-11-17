<template>
  <div>
    <el-card v-loading="isLoading">
      <!-- 步骤条 -->
      <template #header>
        <div>
          <el-steps :active="stepActive" finish-status="success" simple>
            <el-step
              v-for="(step, index) in stepTitles"
              :key="index"
              :title="step"
            ></el-step>
          </el-steps>
        </div>
      </template>

      <!-- 表单 -->
      <el-form
        ref="courseForm"
        :model="course"
        :rules="rules"
        label-width="80px"
      >
        <!-- 基本信息 -->
        <div v-show="stepActive === 0">
          <el-form-item label="课程名称" prop="courseName">
            <el-input
              v-model="course.courseName"
              maxlength="20"
              show-word-limit
            />
          </el-form-item>
          <el-form-item label="课程简介" prop="brief">
            <el-input v-model="course.brief" maxlength="100" show-word-limit />
          </el-form-item>
          <el-form-item label="讲师姓名" prop="teacherDTO.teacherName">
            <el-input
              v-model="course.teacherDTO.teacherName"
              maxlength="25"
              show-word-limit
            />
          </el-form-item>
          <el-form-item label="讲师职位" prop="teacherDTO.position">
            <el-input
              v-model="course.teacherDTO.position"
              maxlength="50"
              show-word-limit
            />
          </el-form-item>
          <el-form-item label="讲师简介" prop="teacherDTO.description">
            <el-input
              v-model="course.teacherDTO.description"
              maxlength="100"
              show-word-limit
            />
          </el-form-item>
          <el-form-item label="课程概述" prop="previewFirstField">
            <el-row type="flex" justify="space-between">
              <el-input
                v-model="course.previewFirstField"
                style="width: 49%;"
                placeholder="概述1"
                maxlength="20"
                show-word-limit
              />
              <el-input
                v-model="course.previewSecondField"
                style="width: 49%;"
                placeholder="概述2"
                maxlength="20"
                show-word-limit
              />
            </el-row>
          </el-form-item>
          <el-form-item label="课程排序" prop="sortNum">
            <el-input v-model="course.sortNum" type="number">
              <template #append>数字控制排序，数字越大越靠后</template>
            </el-input>
          </el-form-item>
        </div>

        <!-- 课程封面 -->
        <div v-show="stepActive === 1">
          <el-form-item label="课程封面">
            <upload-image v-model="course.courseListImg" />
          </el-form-item>
          <el-form-item label="介绍封面">
            <upload-image v-model="course.courseImgUrl" />
          </el-form-item>
        </div>

        <!-- 销售信息 -->
        <div v-show="stepActive === 2">
          <el-form-item label="售卖价格" prop="discounts">
            <el-input v-model="course.discounts" type="number">
              <template #append>元</template>
            </el-input>
          </el-form-item>
          <el-form-item label="原价">
            <el-input v-model="course.price" type="number">
              <template #append>元</template>
            </el-input>
          </el-form-item>
          <el-form-item label="销量">
            <el-input v-model="course.sales" type="number">
              <template #append>单</template>
            </el-input>
          </el-form-item>
          <el-form-item label="活动标签">
            <el-input
              v-model="course.discountsTag"
              maxlength="4"
              show-word-limit
            />
          </el-form-item>
        </div>

        <!-- 秒杀活动 -->
        <div v-show="stepActive === 3">
          <el-form-item label="限时秒杀">
            <el-switch
              v-model="course.activityCourse"
              active-color="#13ce66"
              inactive-color="#ff4949"
            />
          </el-form-item>
          <div v-if="course.activityCourse">
            <el-form-item label="开始时间">
              <el-date-picker
                v-model="course.activityCourseDTO.beginTime"
                type="date"
                placeholder="选择日期"
              />
            </el-form-item>
            <el-form-item label="结束时间">
              <el-date-picker
                v-model="course.activityCourseDTO.endTime"
                type="date"
                placeholder="选择日期"
              />
            </el-form-item>
            <el-form-item label="秒杀价格">
              <el-input v-model="course.activityCourseDTO.amount" type="number">
                <template #append>元</template>
              </el-input>
            </el-form-item>
            <el-form-item label="秒杀库存">
              <el-input v-model="course.activityCourseDTO.stock" type="number">
                <template #append>单</template>
              </el-input>
            </el-form-item>
          </div>
        </div>

        <!-- 课程详情 -->
        <div v-show="stepActive === 4">
          <el-form-item label="课程详情">
            <text-editor v-model="course.courseDescriptionMarkDown" />
          </el-form-item>
          <el-form-item label="是否上架">
            <el-switch
              v-model="course.status"
              :active-value="1"
              :inactive-value="0"
              active-color="#13ce66"
              inactive-color="#ff4949"
            />
          </el-form-item>
        </div>

        <!-- 操作按钮 -->
        <el-form-item>
          <el-button v-show="stepActive > 0" @click="stepActive--"
            >上一步</el-button
          >
          <el-button v-show="stepActive < 4" type="primary" @click="nextStep"
            >下一步</el-button
          >
          <el-button
            v-show="stepActive === 4"
            :loading="isLoading"
            type="primary"
            @click="handleSubmit"
            >提 交</el-button
          >
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import UploadImage from './UploadImage.vue'
import TextEditor from '@/components/text-editor/index.vue'
import { getCourseById, saveOrUpdateCourse } from '@/network/course'
import { Form } from 'element-ui'

export default Vue.extend({
  name: 'CourseCreateOrUpdate',

  props: {
    isUpdate: {
      type: Boolean,
      default: false
    },
    courseId: {
      type: [String, Number]
    }
  },

  data () {
    return {
      stepTitles: ['基本信息', '课程封面', '销售信息', '秒杀活动', '课程详情'],
      stepActive: 0,
      course: {
        // id: 0,
        courseName: '',
        brief: '',
        teacherDTO: {
          // id: 0,
          courseId: 0,
          teacherName: '',
          teacherHeadPicUrl: '',
          position: '',
          description: ''
        },
        courseDescriptionMarkDown: '',
        price: 0,
        discounts: 0,
        priceTag: '',
        discountsTag: '',
        isNew: true,
        isNewDes: '',
        courseListImg: '',
        courseImgUrl: '',
        sortNum: 0,
        previewFirstField: '',
        previewSecondField: '',
        status: 0,
        sales: 0,
        activityCourse: false,
        activityCourseDTO: {
          // id: 0,
          // courseId: 0,
          beginTime: '',
          endTime: '',
          amount: 0,
          stock: 0
        },
        autoOnlineTime: ''
      },
      rules: {
        courseName: [
          { required: true, message: '请输入课程名称', trigger: 'blur' }
        ],
        brief: [{ required: true, message: '请输入课程简介', trigger: 'blur' }],
        'teacherDTO.teacherName': [
          { required: true, message: '请输入讲师姓名', trigger: 'blur' }
        ],
        'teacherDTO.position': [
          { required: true, message: '请输入讲师职位', trigger: 'blur' }
        ],
        'teacherDTO.description': [
          { required: true, message: '请输入讲师简介', trigger: 'blur' }
        ],
        previewFirstField: [
          { required: true, message: '请输入课程概述', trigger: 'blur' }
        ],
        sortNum: [
          { required: true, message: '请输入课程排序', trigger: 'blur' }
        ],
        discounts: [
          { required: true, message: '请输入售卖价格', trigger: 'blur' }
        ]
      },
      isLoading: false
    }
  },

  created () {
    if (this.isUpdate) this.loadCourse()
  },

  methods: {
    async loadCourse () {
      this.isLoading = true
      try {
        const { data } = await getCourseById(this.courseId)
        if (data.data) {
          if (!data.data.activityCourseDTO) {
            data.data.activityCourseDTO = {
              beginTime: '',
              endTime: '',
              amount: 0,
              stock: 0
            }
          }
          this.course = data.data
        }
      } catch {}
      this.isLoading = false
    },

    async nextStep () {
      if (this.stepActive >= this.stepTitles.length) return
      try {
        await (this.$refs.courseForm as Form).validate()
        this.stepActive++
      } catch {
        this.$message.warning('请填写完整')
      }
    },

    // 提交课程
    async handleSubmit () {
      this.isLoading = true
      try {
        await (this.$refs.courseForm as Form).validate()
        const { data } = await saveOrUpdateCourse(this.course)
        if (data.code === '000000') {
          this.$message.success('保存成功')
          this.$router.back()
        }
      } catch {}
      this.isLoading = false
    }
  },

  components: {
    UploadImage,
    TextEditor
  }
})
</script>

<style scoped></style>
