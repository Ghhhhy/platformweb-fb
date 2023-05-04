import { post, get, postFormData } from '@/api/http'
export default {
  // 获取左侧树
  getTreeData(params) {
    return post('large-monitor-platform/lmp/elementQuery/elementtree', params)
  },
  getTreeData1(params) {
    return get('large-monitor-platform/lmp/pro', params)
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
  // 通过支付接口取消挂接
  notHookByInterFace (params) {
    return post('dfr-monitor-service/dfr/benefitEnterprisesAndPeople/notHookByInterFace', params)
  },
  // 删除
  delete (params) {
    return post('dfr-monitor-service/dfr/benefitEnterprisesAndPeople/delete', params)
  },
  // 编辑
  updateImport (params) {
    return post('dfr-monitor-service/dfr/benefitEnterprisesAndPeople/updateImport', params)
  },
  // 导入
  importBenefit (params) {
    return post('dfr-monitor-service/dfr/benefitEnterprisesAndPeople/import', params)
  },
  // 到人到户导入 | 企业补贴导入
  importPersonAndCompany (params) {
    return postFormData('dfr-monitor-service/dfr/benefitEnterprisesAndPeople/savePayDetailExcel', params)
  }
}
