import request from '@/utils/request'

export default {

  getPageList(page, limit, searchObj) {
    return request({
      url: `/admin/user/getPageList/${page}/${limit}`,
      method: 'post',
      data: searchObj
    })
  },

  deleteUserId(id) {
    return request({
      url: `/admin/user/${id}`,
      method: 'delete',
    })
  },

  updateUser(user) {
    return request({
      url: `/admin/user/update`,
      method: 'post',
      data: user
    })
  },

  getUserInfo(id) {
    return request({
      url: `/admin/user/getUserInfo/${id}`,
      method: 'get'
    })
  }
}