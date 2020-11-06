import request from '@/utils/request'

// 新增或修改菜单
export const createOrUpdateMenu = (data: Record<string, any>) => {
  return request({
    method: 'POST',
    url: '/boss/menu/saveOrUpdate',
    data
  })
}

// 获取编辑页菜单
export const getEditMenuInfo = (id = -1) => {
  return request({
    method: 'GET',
    url: '/boss/menu/getEditMenuInfo',
    params: {
      id
    }
  })
}

// 获取所有菜单
export const getAllMenu = () => {
  return request({
    method: 'GET',
    url: '/boss/menu/getAll'
  })
}

// 获取所有菜单
export const deleteMenu = (id: number) => {
  return request({
    method: 'DELETE',
    url: `/boss/menu/${id}`
  })
}
