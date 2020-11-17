import request from '@/utils/request'

// 获取广告列表
export const getAdList = () => {
  return request({
    method: 'GET',
    url: '/front/ad/getAdList'
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
