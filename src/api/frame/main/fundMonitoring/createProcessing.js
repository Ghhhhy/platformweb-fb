//  监控函数api
import { post, get } from '@/api/http'
export default {
  // 查询附件
  getFile(params) {
    return get('fileservice/v2/files', params)
  },
  // 获取表格数据
  queryTableDatas (params) {
    return post('large-monitor-platform/lmp/executeWarn/warnInfos', params)
  },
  getIsFlow () {
    return post('large-monitor-platform/lmp/totalWarn/getIsFlow')
  },
  // 生成
  handleAdd (params) {
    return post('large-monitor-platform/lmp/totalWarn/add', params)
  },
  // 下发
  handleIssue (params) {
    return post('large-monitor-platform/lmp/totalWarn/issue', params)
  },
  // 反馈
  handleFeedback (params) {
    return post('large-monitor-platform/lmp/totalWarn/update', params)
  },
  // 归档
  handleFile(params) {
    return post('large-monitor-platform/lmp/totalWarn/file', params)
  },
  // 详情信息查询
  getDetail(params) {
    return post('large-monitor-platform/lmp/totalWarn/detail', params)
  },
  getMarkDetail(params) {
    return post('large-monitor-platform/lmp/warn/rpt/queryRptInfoByRule', params)
  },
  getMarkData(params) {
    return post('large-monitor-platform/lmp/totalWarn/queryWarnInfoByLogo', params)
  },
  // 预算回显信息
  budgetgetDetail(params, prams2 = 0) {
    return get('large-monitor-platform/lmp/executeWarn/getDetail/' + params + `/${prams2}`)
  },
  // 获取违规类型枚举
  queryViolationType(params) {
    return get('large-monitor-platform/lmp/violationType/pageQuery', params)
  },
  // 获取未归档数据
  getNoFile(params) {
    return post('large-monitor-platform/lmp/totalWarn/queryNoFile', params)
  },
  // 获取数量
  getCount(params) {
    return post('large-monitor-platform/lmp/totalWarn/getCount', params)
  },
  // 获取预警情况
  queryWarning (params) {
    return post('large-monitor-platform/lmp/totalWarn/queryWarning', params)
  },
  queryDetailDatas (params) {
    return post('large-monitor-platform/lmp/totalWarn/queryDetailDatas', params)
  },
  querySum(params) {
    return post('large-monitor-platform/lmp/totalWarn/querySum', params)
  },
  queryWarningByMof (params) {
    return post('large-monitor-platform/lmp/totalWarn/queryWarningByMof', params)
  },
  queryDetailDatasByMof (params) {
    return post('large-monitor-platform/lmp/totalWarn/queryDetailDatasByMof', params)
  },
  querySumByMof(params) {
    return post('large-monitor-platform/lmp/totalWarn/querySumByMof', params)
  },
  getTreewhere(params) {
    return post('large-monitor-platform/lmp/elementQuery/elementtree', params)
  },
  getTreeAgency(params) {
    return post('large-monitor-platform/lmp/elementQuery/elementtree', params)
  },
  handleNormal(params) {
    return post('large-monitor-platform/lmp/totalWarn/handleNormal', params)
  },
  doBack(params) {
    return post('large-monitor-platform/lmp/totalWarn/back', params)
  },
  getFiRule(params) {
    return post('large-monitor-platform/lmp/totalWarn/getFiRule', params)
  },
  getRuleTreeData(params) {
    return post('dfr-monitor-service/dfr/mofDivList/queryRule', params)
  },
  // 规则校验
  ruleTest(params) {
    return post('large-monitor-platform/lmp/totalWarn/checkBusinessData', params)
  },
  // 获取下拉树
  getTree(params) {
    return post('large-monitor-platform/lmp/ruleClassify/tree/' + params)
  },
  // 联查业务数据
  queryBusinessData(params) {
    return post('large-monitor-platform/lmp/totalWarn/queryBusinessData', params)
  },
  // 业务下拉列表
  getbusLists(params) {
    return post('large-monitor-platform/lmp/businessFunctions/list', params)
  },
  // 获取日志
  getLogs(param) {
    return get('large-monitor-platform/lmp/totalWarn/log/' + param)
  },
  // 获取服务器时间
  getCurrentTime(params) {
    return post('large-monitor-platform/lmp/commom/getCurrentTime', params)
  },
  // 获取告警信息
  getWarningTips(params) {
    return get('large-monitor-platform/lmp/totalWarn/warningTips/' + params)
  },
  getisShowViolateType() {
    return get('large-monitor-platform/lmp/payReportConfig/query')
  },
  getProTreeData(params) {
    return post('dfr-monitor-service/dfr/mofDivList/queryPro', params)
  },
  getProSpeTreeData(params) {
    return post('dfr-monitor-service/dfr/mofDivList/queryProSpeTree', params)
  },
  createdWarning(params) {
    return post('large-monitor-platform/lmp/totalWarn/add', params)
  },
  getWorkFlowDetail(params) {
    return post('large-monitor-platform/lmp/workFlow/workFlowDetail', params)
  },
  workFlowUpdate(params) {
    return post('large-monitor-platform/lmp/workFlow/workFlowUpdate', params)
  },
  workFlowRevoke(params) {
    return post('large-monitor-platform/lmp/workFlow/workFlowRevoke', params)
  },
  workFlowGetLogs(params) {
    return post('large-monitor-platform/lmp/workFlow/workFlowGetLogs', params)
  }
}
