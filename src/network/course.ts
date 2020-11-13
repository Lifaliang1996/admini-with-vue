import request from '@/utils/request'

interface CoursesQuery {
  currentPage: number
  pageSize: number
  courseName?: string
  status?: number | null
}

// 分页查询课程
export const getQueryCourses = (data: CoursesQuery) => {
  return request({
    method: 'POST',
    url: '/boss/course/getQueryCourses',
    data
  })
}

// 根据 ID 查询课程
export const getCourseById = (courseId: string | number) => {
  return request({
    method: 'GET',
    url: '/boss/course/getCourseById',
    params: {
      courseId
    }
  })
}

// 课程上下架
export const changeState = (courseId: number, status: number) => {
  return request({
    method: 'GET',
    url: '/boss/course/changeState',
    params: {
      courseId,
      status
    }
  })
}

// 上传图片
export const uploadImage = (
  data: object,
  onUploadProgress?: ((progressEvent: any) => void) | undefined
) => {
  return request({
    method: 'POST',
    url: '/boss/course/upload',
    data,
    onUploadProgress
  })
}

// 添加或修改课程
export const saveOrUpdateCourse = (data: object) => {
  return request({
    method: 'POST',
    url: '/boss/course/saveOrUpdateCourse',
    data
  })
}

// 获取课程章节信息
export const getSectionAndLesson = (courseId: string | number) => {
  return request({
    method: 'GET',
    url: '/boss/course/section/getSectionAndLesson',
    params: {
      courseId
    }
  })
}

// 添加或修改章节
export const saveOrUpdateSection = (data: object) => {
  return request({
    method: 'POST',
    url: '/boss/course/section/saveOrUpdateSection',
    data
  })
}

// 添加或修改课时
export const saveOrUpdateLesson = (data: object) => {
  return request({
    method: 'POST',
    url: '/boss/course/lesson/saveOrUpdate',
    data
  })
}
