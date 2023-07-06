//  监控函数api
import { post, get } from '@/api/http'
export default {
  // 获取表格数据
  queryTableDatas(params) {
    return post('large-monitor-platform/lmp/executeWarn/warnInfos', params)
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
    return get('large-monitor-platform/lmp/mofDivTree', params)
  },
  // 获取区划树
  getLeftTree2(params) {
    return post('large-monitor-platform/lmp/regulation/queryMofTree', params)
  },
  // 疑似违规标记
  doMark(params) {
    return post('large-monitor-platform/lmp/warn/rpt/marking', params)
  },
  check(params) {
    return post('large-monitor-platform/lmp/totalWarn/checkData/' + params)
  },
  // 获取下拉树
  getTree(params) {
    return post('large-monitor-platform/lmp/ruleClassify/tree/' + params)
  },
  // 获取服务器时间
  getCurrentTime(params) {
    return post('large-monitor-platform/lmp/commom/getCurrentTime', params)
  }
}
