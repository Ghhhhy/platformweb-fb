//  监控函数api
import { post } from '@/api/http'
export default {
  // 获取表格数据
  queryTableDatas (params) {
    return post('dfr-monitor-service/dfr/warnCapital/querySummary', params)
  },
  // 获取表格数据
  queryDetailDatas (params) {
    return post('dfr-monitor-service/dfr/warnCapital/querySummaryDetail', params)
  },
  getMofTreeData(params) {
    return post('dfr-monitor-service/dfr/mofDivList/query', params)
  },
  getProTreeData(params) {
    return post('dfr-monitor-service/dfr/mofDivList/queryPro', params)
  },
  getRuleTreeData(params) {
    return post('dfr-monitor-service/dfr/mofDivList/queryRule', params)
  }
}
