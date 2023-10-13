//  监控函数api
import { post, get } from '@/api/http'
export default {
  // 获取表格数据
  queryTableDatas(params) {
    return post('large-monitor-platform/lmp/warn/rpt/queryClassRpt3ByRule', params)
  },
  // 获取违规明细
  getViolationsDetailDatas(params) {
    return post('large-monitor-platform/lmp/warn/rpt/queryRptInfoByRule', params)
  },
  getTreewhere(params) {
    return get('mp-b-basedata-service/v2/basedata/simpletree/where', params)
  },
  // 疑似违规标记
  doMark(params) {
    return post('large-monitor-platform/lmp/warn/rpt/marking', params)
  },
  // 获取左侧树
  getLeftTree(params) {
    return get('mp-b-basedata-service/v2/basedata/simpletree/where', params)
  },
  getTree(params) {
    return post('large-monitor-platform/lmp/ruleClassify/tree/' + params)
  }
}
