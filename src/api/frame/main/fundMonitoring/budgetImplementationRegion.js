//  监控函数api
import { post, get } from '@/api/http'
import store from '@/store/index'
export default {
  // 获取表格数据
  queryTableDatas (params) {
    return post('dfr-monitor-service/dfr/zdzjledger/query', params)
  },
  queryCaliberDeclareContent(params) {
    return post('dfr-monitor-service/dfr/zdzjledger/queryCaliberDeclareContent', params)
  },
  // 明细分页查询
  detailPageQuery (params) {
    return post('dfr-monitor-service/dfr/zdzjledger/detailPageQuery', params)
  },
  // 直达资金项目台账
  xmPageQuery (params) {
    return post('dfr-monitor-service/dfr/zdzjledger/XmPageQuery', params)
  },
  // 专项监督项目台账
  xmSpecialPageQuery(params) {
    return post('dfr-monitor-service/dfr/zdzjledger/XmSpecialPageQuery', params)
  },
  // 获取左侧树
  getTreeData(params) {
    let url = 'large-monitor-platform/lmp/mofDivTree'
    if (store.getters.isSx) {
      url = 'mp-b-basedata-service/v2/basedata/simpletree/where'
    }
    return get(url, params)
  },
  getMofTreeData(params) {
    return post('dfr-monitor-service/dfr/mofDivList/query', params)
  },
  // 获取合计
  querySum (params) {
    return post('dfr-monitor-service/dfr/zdzjledger/sum', params)
  },
  getProTreeData(params) {
    return post('dfr-monitor-service/dfr/mofDivList/queryPro', params)
  },
  getProSpeTreeData(params) {
    return post('dfr-monitor-service/dfr/mofDivList/queryProSpeTree', params)
  },
  getCapitalTreeData(params) {
    return post('dfr-monitor-service/dfr/mofDivList/queryCapital', params)
  },
  // 获取功能分类
  getExpFuncTreeData() {
    return get('large-monitor-platform/lmp/expFuncTree/')
  },
  // 数据增量同步
  doDataSourceAdd() {
    return get('dfr-monitor-service/dfr/zdzjledger/doDataSourceAdd')
  },
  getManageMofDepTreeData() {
    return get('large-monitor-platform/lmp/manageMofDep/')
  },
  // 华青数据导入
  importHuaqing(params) {
    const formData = new FormData()
    Object.entries(params).forEach(([key, value]) => {
      formData.append(key, value)
    })
    return post('dfr-monitor-service/dfr/dfrExcelImport/importDfrData', formData, null, 'multipart/form-data')
  },
  getCzProTreeData(params) {
    return post('dfr-monitor-service/dfr/mofDivList/queryCzPro', params)
  },
  // 新表格查询
  queryTableData(params) {
    return post('dfr-monitor-service/dfr/autoLedger/query', params)
  }
}
