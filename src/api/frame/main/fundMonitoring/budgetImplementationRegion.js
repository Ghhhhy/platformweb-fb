//  监控函数api
import { post, get } from '@/api/http'
export default {
  // 获取表格数据
  queryTableDatas (params) {
    return post('dfr-monitor-service/dfr/zdzjledger/query', params)
  },
  // 明细分页查询
  detailPageQuery (params) {
    return post('dfr-monitor-service/dfr/zdzjledger/detailPageQuery', params)
  },
  // 直达资金项目台账
  xmPageQuery (params) {
    return post('dfr-monitor-service/dfr/zdzjledger/XmPageQuery', params)
  },
  // 获取左侧树
  getTreeData(params) {
    return get('large-monitor-platform/lmp/mofDivTree', params)
  },
  getMofTreeData(params) {
    return post('dfr-monitor-service/dfr/mofDivList/query', params)
  },
  getProTreeData(params) {
    return post('dfr-monitor-service/dfr/mofDivList/queryPro', params)
  },
  // 获取功能分类
  getExpFuncTreeData() {
    return get('large-monitor-platform/lmp/expFuncTree/')
  }
}
