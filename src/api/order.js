import request from '@/utils/request'

export default {

  getPageList(page, limit, searchObj) {
    return request({
      url: `/admin/order/getPageList/${page}/${limit}`,
      method: 'post',
      data: searchObj
    })
  },

  getInfo(id) {
    return request({
      url: `/admin/order/getInfo/${id}`,
      method: 'get'
    })
  }
}