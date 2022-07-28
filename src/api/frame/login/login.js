import { get } from '@/api/http'
export default {
  getPlatform(params) {
    return get('mp-b-perm-service/v1/app', params)
  }
}
