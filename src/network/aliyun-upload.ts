import request from '@/utils/request'

// 获取阿里云图片上传凭证
export const getAliyunImageUploadAddressAndAuth = () => {
  return request({
    method: 'GET',
    url: '/boss/course/upload/aliyunImagUploadAddressAdnAuth.json'
  })
}

// 获取阿里云视频上传凭证
export const getAliyunVideoUploadAddressAndAuth = (params: {
  fileName: string
  imageUrl: string
}) => {
  return request({
    method: 'GET',
    url: '/boss/course/upload/aliyunVideoUploadAddressAdnAuth.json',
    params
  })
}

// 刷新阿里云视频上传凭证
export const refreshAliyunVideoUploadAddressAndAuth = (videoId: number | string) => {
  return request({
    method: 'GET',
    url: '/boss/course/upload/refreshAliyunVideoUploadAddressAdnAuth.json',
    params: {
      videoId
    }
  })
}

// 阿里云转码
export const aliyunTransCodeVideo = (data: object) => {
  return request({
    method: 'POST',
    url: '/boss/course/upload/aliyunTransCode.json',
    data
  })
}

// 获取阿里云转码进度
export const getAliyunTransCodePercent = (lessonId: number | string) => {
  return request({
    method: 'GET',
    url: '/boss/course/upload/aliyunTransCodePercent.json',
    params: {
      lessonId
    }
  })
}
