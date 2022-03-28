import request from '@/utils/request'

export default {

  getPageList(page, limit, searchObj) {
    return request({
      url: `/admin/hospital/getPageList/${page}/${limit}`,
      method: 'post',
      data: searchObj
    })
  },

  deleteHospitalId(id) {
    return request({
      url: `/admin/hospital/${id}`,
      method: 'delete'
    })
  },

  getInfo(id) {
    return request({
      url: `/admin/hospital/getInfoById/${id}`,
      method: 'get'
    })
  },

  insert(hospital) {
    return request({
      url: `/admin/hospital/save`,
      method: 'post',
      data: hospital
    })
  },

  update(hospital) {
    return request({
      url: `/admin/hospital/update`,
      method: 'post',
      data: hospital
    })
  },
}