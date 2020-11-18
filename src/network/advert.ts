import request from '@/utils/request'

// 获取广告列表
export const getAdList = () => {
  return request({
    method: 'GET',
    url: '/front/ad/getAdList'
  })
}

// 获取单个广告
export const getAdById = (id: string | number) => {
  return request({
    method: 'GET',
    url: '/front/ad/getAdById',
    params: {
      id
    }
  })
}

// 更改广告的状态 上线/下线
export const updateAdStatus = (id: number, status: number) => {
  return request({
    method: 'GET',
    url: '/front/ad/updateStatus',
    params: {
      id,
      status
    }
  })
}

// 新增或修改广告
export const createOrUpdateAdvert = (data: object) => {
  return request({
    method: 'POST',
    url: '/front/ad/space/saveOrUpdate',
    data
  })
}

// 获取广告位列表
export const getAllSpaces = () => {
  return request({
    method: 'GET',
    url: '/front/ad/space/getAllSpaces'
  })
}

// 获取单个广告位
export const getAdSpaceById = (id: string | number) => {
  return request({
    method: 'GET',
    url: '/front/ad/space/getSpaceById',
    params: {
      id
    }
  })
}

// 新增或修改广告位
export const createOrUpdateAdSpace = (data: object) => {
  return request({
    method: 'POST',
    url: '/front/ad/space/saveOrUpdate',
    data
  })
}
