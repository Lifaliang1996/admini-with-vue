import request from '@/utils/request'

interface Category {
  name: string
  sort: number
  id?: number
}

// 按条件分页获取资源列表
export const getResourcePages = (data: object) => {
  return request({
    method: 'POST',
    url: '/boss/resource/getResourcePages',
    data
  })
}

// 获取单个资源
export const getResource = (id: number | string) => {
  return request({
    method: 'GET',
    url: `/boss/resource/${id}`
  })
}

// 添加或修改资源
export const saveOrUpdate = (data: object) => {
  return request({
    method: 'POST',
    url: '/boss/resource/saveOrUpdate',
    data
  })
}

// 删除资源
export const deleteResource = (id: number | string) => {
  return request({
    method: 'DELETE',
    url: `/boss/resource/${id}`
  })
}

// 获取所有分类
export const getAllCategory = () => {
  return request({
    method: 'GET',
    url: '/boss/resource/category/getAll'
  })
}

// 添加或修改分类
export const createOrUpdateCategory = (data: Category) => {
  return request({
    method: 'POST',
    url: '/boss/resource/category/saveOrderUpdate',
    data
  })
}

// 删除分类
export const deleteCategory = (id: number | string) => {
  return request({
    method: 'DELETE',
    url: `/boss/resource/category/${id}`
  })
}
