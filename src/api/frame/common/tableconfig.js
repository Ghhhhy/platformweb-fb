import { get, post, put, del } from '@/api/http'
export default {
  inseartConfig(params) {
    return post('mp-b-perm-service/v1/tableconf', params)
  },
  deleteConfig(params) {
    return del('mp-b-perm-service/v1/tableconf', params)
  },
  updateConfig(params) {
    return put('mp-b-perm-service/v1/tableconf', params)
  },
  getConfig(params) {
    return get('mp-b-perm-service/v1/tableconf', params)
  }
}
