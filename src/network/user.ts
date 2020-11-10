import request from '@/utils/request'
import qs from 'qs'

interface User {
  phone: string
  password: string
}

// 登录
export const login = (user: User) => {
  return request({
    method: 'POST',
    url: '/front/user/login',
    // content-type 自动设置为 application/x-www-form-urlencoded
    data: qs.stringify(user)
  })
}

// 获取登录用户信息
export const getUserInfo = () => {
  return request({
    method: 'GET',
    url: '/front/user/getInfo'
  })
}

// 查询用户列表
export const getUserPages = (data: object) => {
  return request({
    method: 'POST',
    url: '/boss/user/getUserPages',
    data
  })
}

// 禁用用户
export const forbidUser = (userId: number) => {
  return request({
    method: 'GET',
    url: '/boss/user/forbidUser',
    params: {
      userId
    }
  })
}

// 启用用户
export const enableUser = (userId: number) => {
  return request({
    method: 'GET',
    url: '/boss/user/enableUser',
    params: {
      userId
    }
  })
}
