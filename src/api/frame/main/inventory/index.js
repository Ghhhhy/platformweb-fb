import { post } from '@/api/http'

export default {
  upPro(params) { // 查询上级转移支付项目
    return post('/bisBudget/api/budget/bisBudget/cfg/bgtCfgAgencyToReport/queryReportTree', params)
  },
  localPro(params) { // 2、查询本级预算项目
    return post('/bisBudget/api/budget/bisProject/project/exchange/localPro', params)
  },
  doSave(params) { // 保存
    return post('large-monitor-platform/lmp/warn/mMcObj/batchSave', params)
  },
  getQuery(params) {
    return post('large-monitor-platform/lmp/warn/mMcObj/query', params)
  }
}
