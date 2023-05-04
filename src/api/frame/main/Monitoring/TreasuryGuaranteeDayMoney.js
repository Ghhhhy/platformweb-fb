//  监控函数api
import { post, get } from '@/api/http'
export default {
  // 获取表格数据
  queryTableDatas(params) {
    return post(
      'large-monitor-platform/lmp/three/threeGuaranteesSummaryMoney',
      params
    )
  },
  getLeftTree(params) {
    return get('large-monitor-platform/lmp/mofDivTree', params)
  },
  getTreewhere(params) {
    return get('mp-b-basedata-service/v2/basedata/simpletree/where', params)
  },
  queryTableDatasTotal(params) {
    return post('large-monitor-platform/lmp/three/threeGuaranteesMoney', params)
  }
}
