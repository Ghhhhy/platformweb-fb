import { post, get } from '@/api/http'
export default {
  getProTreeData(params) {
    return post('dfr-monitor-service/dfr/mofDivList/queryPro', params)
  },
  // 获取左侧树
  getTreeData(params) {
    return get('large-monitor-platform/lmp/mofDivTree', params)
  },
  // 获取左侧树
  getTreeData1(params) {
    return get('large-monitor-platform/lmp/mofDivTree', params)
  },
  getMofTreeData(params) {
    return post('dfr-monitor-service/dfr/mofDivList/getBgtMof', params)
  },
  // 获取表格数据 处室指标查询-处室指标综合查看文号汇总
  queryTableDatas (params) {
    return post('dfr-monitor-service/dfr/dfrMultipleQuery/query', params)
  },
  // 获取表格数据 处室指标查询-处室指标综合查看文号汇总明细
  queryTableDatas1 (params) {
    return post('dfr-monitor-service/dfr/dfrMultipleQuery/queryDetail', params)
  },
  // 获取表格数据 处室指标查询-处室指标综合查看汇总
  queryTableDatasByDep (params) {
    return post('dfr-monitor-service/dfr/dfrMultipleQuery/query1', params)
  },
  // 获取表格数据 处室指标查询-处室指标综合查看汇总明细
  queryTableDatasByDep1 (params) {
    return post('dfr-monitor-service/dfr/dfrMultipleQuery/queryDetail1', params)
  },
  // 获取表格数据 单位指标查询-单位指标综合查看文号汇总
  queryTableDatasByAgency (params) {
    return post('dfr-monitor-service/dfr/dfrMultipleQuery/queryAgency', params)
  },
  // 获取表格数据 单位指标查询-单位指标综合查看文号汇总明细
  queryTableDatasByAgency1 (params) {
    return post('dfr-monitor-service/dfr/dfrMultipleQuery/queryDetailAgency', params)
  },
  // 获取表格数据 单位指标查询-单位指标综合查看汇总
  queryTableByAgency (params) {
    return post('dfr-monitor-service/dfr/dfrMultipleQuery/queryAgency1', params)
  },
  // 获取表格数据 单位指标查询-单位指标综合查看汇总明细
  queryTableByAgency1 (params) {
    return post('dfr-monitor-service/dfr/dfrMultipleQuery/queryDetailAgency1', params)
  },
  // 市县指标查询-市县补助指标文号汇总
  queryMofDiv (params) {
    return post('dfr-monitor-service/dfr/dfrMultipleQuery/queryMofDiv', params)
  },
  // 市县指标查询-市县补助指标文号汇总明细
  queryDetailMofDiv (params) {
    return post('dfr-monitor-service/dfr/dfrMultipleQuery/queryDetailMofDiv', params)
  },
  // 市县指标查询-市县补助指标汇总
  queryMofDiv1 (params) {
    return post('dfr-monitor-service/dfr/dfrMultipleQuery/queryMofDiv1', params)
  },
  // 市县指标查询-市县补助指标汇总明细
  queryDetailMofDiv1 (params) {
    return post('dfr-monitor-service/dfr/dfrMultipleQuery/queryDetailMofDiv1', params)
  },
  querySum (params) {
    return post('dfr-monitor-service/dfr/dfrMultipleQuery/querySum', params)
  }
}
