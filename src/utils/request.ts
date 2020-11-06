import axios, { AxiosError } from 'axios'
import store from '@/store'
import { Message } from 'element-ui'
import router from '@/router'
import qs from 'qs'

const request = axios.create({})

request.interceptors.request.use(config => {
  const { user } = store.state
  // 已登录设置 token
  if (user && user.access_token) {
    config.headers.Authorization = user.access_token
  }
  return config
})

// 清除登录用户信息并跳转到登录页
function toLogin () {
  store.commit('setUser', null)
  router.push({
    name: 'login',
    query: {
      back: router.currentRoute.fullPath
    }
  })
}

// 刷新 token
function refreshToken () {
  return axios({
    method: 'POST',
    url: '/front/user/refresh_token',
    data: qs.stringify({
      refreshtoken: store.state.user.refresh_token
    })
  })
}

let refreshing = false // 是否正在刷新 token
let delayedRequests: Function[] = [] // 正在刷新 token 时发起的请求，等到刷新 token 成功后再发起

request.interceptors.response.use(
  res => {
    return res
  },
  async (error: AxiosError) => {
    if (error.response) {
      const status = error.response?.status
      if (status === 400) {
        Message.error('请求参数错误！')
      } else if (status === 401) {
        // 不能刷新，重新登录
        if (!store.state?.user?.refresh_token) {
          toLogin()
          return Promise.reject(error)
        }

        // 正在刷新 token，保存请求延迟执行
        if (refreshing) {
          return new Promise(resolve => {
            delayedRequests.push(() => {
              resolve(request(error.config))
            })
          })
        }

        // 刷新 token
        // 成功 > 重新发起请求
        // 失败 > 清除登录信息并重新登录
        try {
          refreshing = true
          const { data } = await refreshToken()
          if (data.state !== 1) {
            throw new Error('刷新 Token 失败')
          }
          store.commit('setUser', data.content)
          // 重新发起延迟执行的请求
          delayedRequests.forEach(cb => cb())
          delayedRequests = []
          return request(error.config)
        } catch (error) {
          toLogin()
          return Promise.reject(error)
        } finally {
          refreshing = false
        }
      } else if (status === 403) {
        Message.error('没有权限，请联系管理员！')
      } else if (status === 404) {
        Message.error('请求资源不存在，请联系管理员！')
      } else if (status >= 500) {
        Message.error('服务器内部错误，请联系管理员！')
      }
    } else if (error.request) {
      Message.error('请求超时，请刷新重试！')
    } else {
      Message.error(`请求错误：${error.message}`)
    }

    return Promise.reject(error)
  }
)

export default request
