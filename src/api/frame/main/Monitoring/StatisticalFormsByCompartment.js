//  监控函数api
import { post } from '@/api/http'
export default {
  // 获取表格数据
  queryTableDatas(params) {
    return post('large-monitor-platform/lmp/warn/rpt/queryRptByMof', params)
  },
  // 违规情况数据
  getViolationsDatas(params) {
    return post('large-monitor-platform/lmp/warn/rpt/queryRptByWarnLevel', params)
  },
  // 疑似违规标记
  doMark(params) {
    return post('large-monitor-platform/lmp/warn/rpt/marking', params)
  }
}
