//  监控函数api
import { post, get } from '@/api/http'
export default {
  // 获取表格数据
  queryTableDatas(params) {
    return post('large-monitor-platform/lmp/executeWarn/warnInfos', params)
  },
  queryTableDatas1(params) {
    return post('large-monitor-platform/lmp/executeWarn/payDiBillInfo', params)
  },
  // 获取违规明细
  getViolationsDetailDatas(params) {
    return post('large-monitor-platform/lmp/warn/rpt/queryRptInfoByRule', params)
  },
  getTreewhere(params) {
    return get('large-monitor-platform/lmp/mofDivTree', params)
  },
  // 获取左侧树
  getTreeData(params) {
    return post('large-monitor-platform/lmp/ruleClassify/tree/' + params)
  },
  // 获取违规明细-通过logId
  getViolationsDetailDataByLogId(params) {
    return post('large-monitor-platform/lmp/warnLog/warnInfoByLogId', params)
  },
  // 获取左侧树
  getTreeDataNew(params) {
    return post('large-monitor-platform/lmp/regulation/queryRuleTypeTree', params)
  },
  doMark(params) {
    return post('large-monitor-platform/lmp/warn/rpt/marking', params)
  },
  // 获取下拉树
  getLeftTree(params) {
    // return post('large-monitor-platform/lmp/ruleClassify/tree/' + params)
    return get('large-monitor-platform/lmp/mofDivTree', params)
  },
  // 获取主题树
  getLeftTree1(params) {
    return post('large-monitor-platform/lmp/regulation/queryRuleTree', params)
  },
  dataDoMark(params) {
    return post('large-monitor-platform/lmp/executeWarn/manualSign', params)
  }
}
