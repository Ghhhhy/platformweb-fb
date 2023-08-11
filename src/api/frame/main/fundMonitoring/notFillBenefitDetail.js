import { post } from '@/api/http'
export default {
  // 获取表格数据
  queryTableDatas (params) {
    return post('dfr-monitor-service/dfr/notFillBenefitDetail/pageQuery', params)
  },
  getProTreeData(params) {
    return post('dfr-monitor-service/dfr/mofDivList/queryPro', params)
  }
}
