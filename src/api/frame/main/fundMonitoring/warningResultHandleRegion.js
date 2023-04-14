//  监控函数api
import { post, get } from '@/api/http'
export default {
  // 获取表格数据
  queryTableDatas (params) {
    return post('dfr-monitor-service/dfr/warningResultHandleRegion/query', params)
  },
  // 获取表格数据
  queryDetailDatas (params) {
    return post('dfr-monitor-service/dfr/warningResultHandleRegion/queryDetail', params)
  },
  // 查询附件
  getFile(params) {
    return get('fileservice/v2/files', params)
  },
  update(params) {
    return post('dfr-monitor-service/dfr/warningResultHandleRegion/update', params)
  },
  updateYellow(params) {
    return post('dfr-monitor-service/dfr/warningResultHandleRegion/updateYellow', params)
  },
  detailQuery(params) {
    return post('dfr-monitor-service/dfr/warningResultHandleRegion/detailQuery', params)
  },
  getProTreeData(params) {
    return post('dfr-monitor-service/dfr/mofDivList/queryPro', params)
  },
  getCapitalTreeData(params) {
    return post('dfr-monitor-service/dfr/mofDivList/queryCapital', params)
  }
}
