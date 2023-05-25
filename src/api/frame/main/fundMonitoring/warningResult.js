//  监控函数api
import { post, get } from '@/api/http'
export default {
  // 获取表格数据
  queryTableDatas (params) {
    return post('dfr-monitor-service/dfr/warningResult/query', params)
  },
  queryTableDatassh (params) {
    return post('dfr-monitor-service/dfr/warningResult/sh/query', params)
  },
  // 获取表格数据
  queryDetailDatas (params) {
    return post('dfr-monitor-service/dfr/warningResult/queryDetail', params)
  },
  // 查询附件
  getFile(params) {
    return get('fileservice/v2/files', params)
  },
  update(params) {
    return post('dfr-monitor-service/dfr/warningResult/update', params)
  },
  updateYellow(params) {
    return post('dfr-monitor-service/dfr/warningResult/updateYellow', params)
  },
  detailQuery(params) {
    return post('dfr-monitor-service/dfr/warningResult/detailQuery', params)
  },
  getProTreeData(params) {
    return post('dfr-monitor-service/dfr/mofDivList/queryPro', params)
  }
}
