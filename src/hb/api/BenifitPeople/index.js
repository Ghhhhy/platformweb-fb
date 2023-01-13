//  集中支付申请api
import { get, post } from '@/api/http'
// 直达资金惠企利民
let benifitPeople = 'pay-voucher-service'
export default {
  // ----------------------- 惠企利民挂接 start ---------------------
  // 明细导入
  importBenefit(params) {
    return post(benifitPeople + '/v2/benefit/action/insert', params)
  },
  // 挂接
  hook(params) {
    return post(benifitPeople + '/v2/benefit/action/ishook', params)
  },
  // 取消挂接
  notHook(params) {
    return post(benifitPeople + 'lmp/hb/v2/benefit/action/canclehook', params)
  },
  // 获取明细数据--未挂接
  getTableDetailDataUnhook(params) {
    return post(benifitPeople + '/v2/benefit/loadtabledatas', params)
  },
  // 获取明细数据--已挂接
  getTableDetailDataHooked(params) {
    return post(benifitPeople + '/v2/benefit/voucherdetail', params)
  },
  // 获取支付凭证数据
  getTableCertData(params) {
    return post(benifitPeople + '/v2/benefit/voucherbill', params)
  },
  // 获取左侧树
  getTreeData(params) {
    return get('large-monitor-platform' + '/lmp/hb/v2/benefit/action/getPro', params)
  },
  deleteDetail(params) {
    return post(benifitPeople + '/v2/benefit/action/discardhook', params)
  }
  // ----------------------- 惠企利民挂接 end ---------------------
}
