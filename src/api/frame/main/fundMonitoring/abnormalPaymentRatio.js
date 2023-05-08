import { post, get } from '@/api/http'
export default {
  // 获取左侧树
  getTreeData(params) {
    return get('large-monitor-platform/lmp/mofDivTree', params)
  },
  // 获取表格数据
  queryTableDatas (params) {
    return post('dfr-monitor-service/dfr/abnormalPaymentRatio/pageQuery', params)
  }
}
