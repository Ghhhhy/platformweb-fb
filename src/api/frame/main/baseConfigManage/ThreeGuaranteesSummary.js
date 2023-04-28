//  申报api
import { post, get } from '@/api/http'
export default {
  // 获取表格数据
  queryTableDatas(params) {
    return post(
      'large-monitor-platform/lmp/three/threeGuaranteesSummary',
      params
    )
  },
  queryTableDatas1(params) {
    return post('large-monitor-platform/lmp/three/newThreeGuarantees', params)
  },
  // 获取左侧树
  getLeftTree(params) {
    return get('large-monitor-platform/lmp/mofDivTree', params)
  },
  refech(params) {
    return post('large-monitor-platform/lmp/three/fresh', params)
  }
}
