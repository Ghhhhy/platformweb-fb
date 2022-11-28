//  监控函数api
import { get, post, del } from '@/api/http'
export default {
  // 查询附件
  getFile(params) {
    return get('fileservice/v2/files', params)
  },
  // 删除附件
  deleteAttachment(params) {
    return del('fileservice/v2/files?' + params)
  },
  // 获取表格数据
  queryTableDatas(params) {
    return post('large-monitor-platform/lmp/function/pageQuery', params)
  },
  // 业务下拉列表
  getbusLists(params) {
    return post('large-monitor-platform/lmp/businessFunctions/list', params)
  },
  // 新增
  addPolicies(params) {
    return post('large-monitor-platform/lmp/function/add ', params)
  },
  // 回显修改信息
  getDetail(params) {
    return post('large-monitor-platform/lmp/function/detail', params)
  },
  // 修改
  changePolicies(params) {
    return post('large-monitor-platform/lmp/function/update', params)
  },
  // 删除
  delPolicies(params) {
    return post('large-monitor-platform/lmp/function/delete', params)
  },
  // 获取表格数据
  querygetTableDatas(params) {
    return get('large-monitor-platform/v2/payvoucher/loadtabledatas', params)
  },
  // 附近上传
  fileUpload(params) {
    return post('fileservice/v2/upload', params, null, 'multipart/form-data', 'openapi')
  },
  // 获取表格数据
  queryDataSourceDatas(params) {
    return post('large-monitor-platform/lmp/dataSource/pageQuery', params)
  },
  // 全量数据监控-列表查询。
  queryTableDatass(params) {
    return post('large-monitor-platform/lmp//warnLog/pageQuery', params)
  },
  // 监控规则-列表查询
  qyeryRuleList(params) {
    return post('large-monitor-platform/lmp/warnLog/ruleList ', params)
  },
  // 全量数据监控 - 新增
  warnLogAdd(params) {
    return post('large-monitor-platform/lmp/warnLog/add', params)
  },
  // 跳转到详情页
  getDetailData(params) {
    return get('large-monitor-platform/lmp/regulation/detail/' + params)
  },
  // 监控主题
  monitorTheme() {
    return post('large-monitor-platform/lmp/ruleClassify/tree/2')
  },
  // 函数接口类型
  getFunctionApiType(params) {
    return post('large-monitor-platform/lmp/dictInfo/pageQuery', params)
  },
  deleteData(params) {
    return post('large-monitor-platform/lmp/warnLog/deleteWarn', params)
  },
  getSql(params) {
    return post('large-monitor-platform/lmp/function/sqlDetail', params)
  },
  checkSql(params) {
    return post('large-monitor-platform/lmp/function/checkSql', params)
  },
  getLeftTree(params) {
    return get('large-monitor-platform/lmp/mofDivTree', params)
  },
  deleteWarnByLogId(params) {
    return post('large-monitor-platform/lmp/warnLog/deleteWarnByLogId', params)
  }
}
