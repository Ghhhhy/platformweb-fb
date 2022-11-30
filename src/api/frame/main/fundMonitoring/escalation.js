//  监控函数api
import { post } from '@/api/http'
export default {
  // 获取表格数据
  queryTableDatas (params) {
    return post('dfr-monitor-service/dfr/dfrData/queryLog', params)
  },
  getMofTreeData(params) {
    return post('dfr-monitor-service/dfr/mofDivList/query', params)
  },
  addLog (params) {
    return post('dfr-monitor-service/dfr/dfrData/addLog', params)
  },
  deleteLog (params) {
    return post('dfr-monitor-service/dfr/dfrData/deleteLog', params)
  },
  refreshLog (params) {
    return post('dfr-monitor-service/dfr/dfrData/refreshLog', params)
  },
  cancelEscalation (params) {
    return post('dfr-monitor-service/dfr/dfrData/cancelEscalation', params)
  },
  confirmEscalation (params) {
    return post('dfr-monitor-service/dfr/dfrData/confirmEscalation', params)
  },
  queryLogDetail (params) {
    return post('dfr-monitor-service/dfr/dfrData/queryLogDetail', params)
  },
  queryLogs (params) {
    return post('dfr-monitor-service/dfr/dfrData/queryLogs', params)
  },
  updateLog (params) {
    return post('dfr-monitor-service/dfr/dfrData/updateLog', params)
  },
  queryHeader(params) {
    return post('dfr-monitor-service/dfr/dfrData/queryHeader', params)
  },
  queryDetail(params) {
    return post('dfr-monitor-service/dfr/dfrData/queryDetail', params)
  },
  querySumDetail(params) {
    return post('dfr-monitor-service/dfr/dfrData/querySumDetail', params)
  },
  queryUnit(params) {
    return post('dfr-monitor-service/dfr/dfrData/queryUnit', params)
  },
  detailPageQuery(params) {
    return post('dfr-monitor-service/dfr/dfrData/detailPageQuery', params)
  }
}
