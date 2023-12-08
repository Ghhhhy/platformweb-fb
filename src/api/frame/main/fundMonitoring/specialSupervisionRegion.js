//  监控函数api
import { post, get } from '@/api/http'
import { Base64 } from 'js-base64'
import store from '@/store/index'

export default {
  queryTableData(params) {
    return post('dfr-monitor-service/dfr/autoLedger/query', params)
  },
  // 获取表格数据
  queryTableDatas (params) {
    return post('dfr-monitor-service/dfr/zdzjledger/query', params)
  },
  // 明细分页查询
  detailPageQuery (params) {
    if (store.state.userInfo.province.slice(0, 2) === '31') {
      params = Base64.encode(JSON.stringify(params))
    }
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
  getProSpeTreeData(params) {
    return post('dfr-monitor-service/dfr/mofDivList/queryProSpeTree', params)
  },
  // 华青数据导入
  importHuaqing(params) {
    const formData = new FormData()
    Object.entries(params).forEach(([key, value]) => {
      formData.append(key, value)
    })
    return post('dfr-monitor-service/dfr/dfrExcelImport/importDfrData', formData, null, 'multipart/form-data')
  },
  // 获取高级搜索要素通用接口
  getHighConfigElement(params) {
    return post('dfr-monitor-service/dfr/common/element', params)
  },
  // 报表主界面接口
  getReportTableDatas(params) {
    return post('dfr-monitor-service//dfr/common/query', params)
  },
  // 穿透界面接口
  getDetailTableDatas(params) {
    return post('dfr-monitor-service//dfr/common/detailPageQuery', params)
  }
}
