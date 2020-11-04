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
