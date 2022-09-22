import { post, get } from '@/api/http'
export default {
  // 获取左侧树
  getTreeData(params) {
    return get('mp-b-basedata-service/v2/basedata/page', params)
  },
  // 查询一卡通数据
  pageQuery (params) {
    return post('dfr-monitor-service/dfr/benefitEnterprisesAndPeople/pageQuery', params)
  },
  // 查询一体化支付凭证数据
  pagePayQuery (params) {
    return post('dfr-monitor-service/dfr/benefitEnterprisesAndPeople/pagePayQuery', params)
  },
  // 导入一卡通数据
  addBenefitPeople (params) {
    return post('dfr-monitor-service/dfr/benefitEnterprisesAndPeople/addBenefitPeople', params)
  },
  // 手动挂接
  update (params) {
    return post('dfr-monitor-service/dfr/benefitEnterprisesAndPeople/update', params)
  },
  // 取消挂接
  notHook (params) {
    return post('dfr-monitor-service/dfr/benefitEnterprisesAndPeople/notHook', params)
  },
  // 导入
  importBenefit (params) {
    return post('dfr-monitor-service/dfr/benefitEnterprisesAndPeople/import', params)
  }
}
