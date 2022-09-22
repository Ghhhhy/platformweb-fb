import { post } from '@/api/http'
export default {
  getUnitTree(params) {
    return post('fiscal-config/queryTreeAssistData', params)
  }
}
