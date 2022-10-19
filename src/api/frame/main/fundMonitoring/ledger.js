//  数据抽取api
import { get, post } from '@/api/http'
export default {
  // 获取表格数据
  queryTableDatas (params) {
    return post('dfr-monitor-service/dfr/ledger/pageQuery', params)
  },
  // 增加
  addLedger (params) {
    return post('dfr-monitor-service/dfr/ledger/addLedger', params)
  },
  // 修改
  updateLedger (params) {
    return post('dfr-monitor-service/dfr/ledger/updateLedger', params)
  },
  // 删除
  deleteLedger (params) {
    return post('dfr-monitor-service/dfr/ledger/deleteLedger', params)
  },
  // 数据源数据同步
  dirDataSourceSync () {
    return get('dfr-monitor-service/dfr/zdzjledger/doDataSourceSync')
  }
}
