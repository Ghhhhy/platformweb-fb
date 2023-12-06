//  监控函数api
import { post } from '@/api/http'

export default {
  // 获取高级搜索要素通用接口
  getHighConfigElement(params) {
    return post('dfr-monitor-service/dfr/common/element', params)
  },
  // 报表主界面接口
  getReportTableDatas(params) {
    return post('dfr-monitor-service//dfr/common/query', params)
  },
  // 穿透界面接口
  getDetailTableDatas(params) {
    return post('dfr-monitor-service//dfr/common/detailPageQuery', params)
  }
}
