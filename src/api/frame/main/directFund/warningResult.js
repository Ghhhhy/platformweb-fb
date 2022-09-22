import { post } from '@/api/http'

export default {
  // 查询
  getData(params) {
    return post('large-monitor-platform/lmp/warningresult/action/query', params)
  }
}
