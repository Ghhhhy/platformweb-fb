import { post, get } from '@/api/http'
export default {
  // 获取左侧树
  getTreeData(params) {
    return get('mp-b-basedata-service/v2/basedata/page', params)
  },
  getTreeData1(params) {
    return get('large-monitor-platform/lmp/mofDivTree', params)
  },
  // 查询一体化支付凭证数据
  pagePayQuery (params) {
    return post('dfr-monitor-service/dfr/benefitPeopleConfirm/pagePayQuery', params)
  },
  // 确认
  confirm (params) {
    return post('dfr-monitor-service/dfr/benefitPeopleConfirm/confirm', params)
  },
  // 取消确认
  notConfirm (params) {
    return post('dfr-monitor-service/dfr/benefitPeopleConfirm/notConfirm', params)
  }
}
