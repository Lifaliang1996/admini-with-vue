<template>
  <div>
    <!-- 筛选条件 -->
    <el-card shadow="never">
      <el-row type="flex" justify="space-between" align="middle">
        <el-form
          ref="searchForm"
          :model="searchForm"
          :inline="true"
          size="small"
          label-width="80px"
        >
          <el-form-item label="课程名称">
            <el-input
              type="text"
              v-model="searchForm.courseName"
              placeholder="请输入课程名称"
            ></el-input>
          </el-form-item>
          <el-form-item label="课程状态">
            <el-select
              v-model="searchForm.status"
              placeholder="请选择课程状态"
              clearable
            >
              <el-option :value="1" :key="1" label="上架"></el-option>
              <el-option :value="0" :key="0" label="下架"></el-option>
            </el-select>
          </el-form-item>
          <el-button @click="searchCoursePages" size="small"
            >查询搜索</el-button
          >
        </el-form>
        <el-button
          @click="$router.push({ name: 'course-create' })"
          type="primary"
          icon="el-icon-plus"
          >新建课程</el-button
        >
      </el-row>
    </el-card>

    <!-- 课程列表 -->
    <el-card shadow="never">
      <el-table v-loading="isLoading" :data="courseList" style="width: 100%">
        <el-table-column
          prop="id"
          align="center"
          label="ID"
          width="60"
        ></el-table-column>
        <el-table-column
          prop="courseName"
          align="center"
          label="课程名称"
        ></el-table-column>
        <el-table-column align="center" label="价格">
          <template v-slot="scope">
            <span>{{ scope.row.price | formatPrice }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="sortNum"
          align="center"
          label="排序"
        ></el-table-column>
        <el-table-column align="center" label="状态" width="80">
          <template v-slot="scope">
            <el-switch
              @change="handleChangeStatus(scope.row)"
              v-model="scope.row.status"
              :title="scope.row.status === 0 ? '已下架' : '已上架'"
              :disabled="scope.row.isChangeLoading"
              active-color="#13ce66"
              inactive-color="#ff4949"
              :active-value="1"
              :inactive-value="0"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template v-slot="scope">
            <el-button
              @click="
                $router.push({
                  name: 'course-update',
                  params: {
                    courseId: scope.row.id
                  }
                })
              "
              size="mini"
              >编辑</el-button
            >
            <el-button
              @click="
                $router.push({
                  name: 'course-section',
                  params: {
                    courseId: scope.row.id
                  }
                })
              "
              size="mini"
              >内容管理</el-button
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
        :current-page="searchForm.currentPage"
        :page-sizes="[10, 15, 20]"
        :page-size="searchForm.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { getQueryCourses, changeState } from '@/network/course'

export default Vue.extend({
  name: 'CourseIndex',

  metaInfo: {
    title: '课程管理'
  },

  data () {
    return {
      // 筛选条件
      searchForm: {
        currentPage: 1,
        pageSize: 15,
        courseName: '',
        status: null
      },
      courseList: [], // 用户列表
      totalCount: 0,
      isLoading: true
    }
  },

  created () {
    this.loadQueryCourses()
  },

  filters: {
    formatPrice (value: number) {
      return value ? `￥${value.toFixed(2)}` : '暂无价格'
    }
  },

  methods: {
    // 加载课程列表
    async loadQueryCourses () {
      this.isLoading = true
      try {
        const { data } = await getQueryCourses(this.searchForm)
        if (data.code === '000000') {
          this.courseList = data.data.records.map((course: any) => {
            course.isChangeLoading = false
            return course
          })
          this.totalCount = data.data.total
        }
      } catch (error) {}
      this.isLoading = false
    },
    handleSizeChange (val: number) {
      this.searchForm.pageSize = val
      this.searchForm.currentPage = 1
      this.loadQueryCourses()
    },
    handleCurrentChange (val: number) {
      this.searchForm.currentPage = val
      this.loadQueryCourses()
    },
    // 查询搜索资源
    searchCoursePages () {
      this.searchForm.currentPage = 1
      this.loadQueryCourses()
    },
    // 课程上下架
    async handleChangeStatus (course: any) {
      course.isChangeLoading = true
      try {
        await changeState(course.id, course.status)
        this.$message.success(course.status === 0 ? '下架成功' : '上架成功')
      } catch (error) {}
      course.isChangeLoading = false
    }
  }
})
</script>

<style lang="scss" scoped></style>
