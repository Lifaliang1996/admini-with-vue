import request from '@/utils/request'

// 获取所有角色列表
export const getRoleAll = () => {
  return request({
    method: 'GET',
    url: '/boss/role/all'
  })
}

// 添加或修改角色
export const createOrUpdateRole = (data: object) => {
  return request({
    method: 'POST',
    url: '/boss/role/saveOrUpdate',
    data
  })
}

// 删除角色
export const deleteRole = (id: number) => {
  return request({
    method: 'DELETE',
    url: `/boss/role/${id}`
  })
}

// 获取用户拥有的角色
export const getRollByUser = (userId: number) => {
  return request({
    method: 'GET',
    url: `/boss/role/user/${userId}`
  })
}

// 给用户分配角色
export const allocateUserRoles = (userId: number, roleIdList: object) => {
  return request({
    method: 'POST',
    url: '/boss/role/allocateUserRoles',
    data: {
      userId,
      roleIdList
    }
  })
}
