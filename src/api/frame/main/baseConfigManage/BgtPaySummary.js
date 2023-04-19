//  申报api
import { post, get } from '@/api/http'
export default {
  // 获取表格数据
  queryTableDatas(params) {
    return post('large-monitor-platform/lmp/warn/rpt/bgtPaySummary', params)
  },
  getTreewhere(params) {
    return get('mp-b-basedata-service/v2/basedata/simpletree/where', params)
  },
  // 获取左侧树
  getLeftTree(params) {
    return get('mp-b-basedata-service/v2/basedata/simpletree/where', params)
  }
}
