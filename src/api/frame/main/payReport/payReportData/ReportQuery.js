
import { post, get } from '@/api/http'

export default {
  // 获取单位数据
  getQueryTable(params) {
    return post('bisReport/report/getQueryTable', params)
  },
  // 获取报表表头
  queryBossFiscalTableConfig(reportguid) {
    return get(`bisReport/queryBossFiscalTableConfig?reportguid=${reportguid}`)
  },
  // 通过单位获取报表数据
  queryBossDesignReportData(params) {
    return post('bisReport/queryBossDesignReportData', params)
  },
  // 汇总提交
  doSave(params) {
    return post('pay-report-service/v1/payreportdata/save', params)
  },
  // 送审
  doAudit(params) {
    return post('pay-report-service/v1/payreportdata/doaudit', params)
  },
  // 查询提交数据
  getSummaryTableData(params) {
    return post('pay-report-service/v1/payreportdata/data', params)
  },
  isArea() {
    return get('pay-report-service/v1/payreportdata/isArea')
  },
  summaryData(tableId, fieldSize, summaryType) {
    return get('pay-report-service/v1/payreportdata/summary/' + tableId + '/' + fieldSize + '/' + summaryType)
  },
  currentLevelCommit(params) { // 本级提交
    return post('pay-report-service/v1/payreportdata/commit', params)
  },
  currentLevelBack(params) { // 撤销
    return post('pay-report-service/v1/payreportdata/back' + '/' + params)
  },
  doSummmarySave(params) {
    return post('pay-report-service/v1/payreportdata/summary/save', params)
  }
}
