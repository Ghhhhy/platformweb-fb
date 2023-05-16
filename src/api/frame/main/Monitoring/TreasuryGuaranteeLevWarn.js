//  监控函数api
import { post, get } from '@/api/http'
export default {
  // 库款保障水平预警表（按月）
  queryTableDatas(params) {
    return post(
      'large-monitor-platform/lmp/treasuryGuaranteeLevWarn/getListByMonth',
      params
    )
  },
  // 库款保障水平预警明细表
  getInfoByMonth(params) {
    return post(
      'large-monitor-platform/lmp/treasuryGuaranteeLevWarn/getInfoByMonth',
      params
    )
  },
  // 库款保障水平预警表（按日）
  getListByDay(params) {
    return post(
      'large-monitor-platform/lmp/treasuryGuaranteeLevWarn/getListByDay',
      params
    )
  },
  getTreewhere(params) {
    return get('large-monitor-platform/lmp/mofDivTree', params)
  },
  // 获取左侧树
  getLeftTree(params) {
    return get('large-monitor-platform/lmp/mofDivTree', params)
  }
}
