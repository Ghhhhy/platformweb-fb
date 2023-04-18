//  规则管理审核api
import { post, get } from '@/api/http'
export default {
  // 获取表格数据
  queryTableDatas(params) {
    return post('large-monitor-platform/lmp/ask/pageQuery', params)
  },
  // 获取数量
  queryTableDatasCount(params) {
    return post('large-monitor-platform/lmp/ask/count', params)
  },
  // 复核
  pass(params) {
    return post('large-monitor-platform/lmp/ask/pass', params)
  },
  // 退回
  back(params) {
    return post('large-monitor-platform/lmp/ask/back', params)
  },
  // 撤销
  revoke(params) {
    return post('large-monitor-platform/lmp/ask/noPass', params)
  },
  // 获取左侧树
  getLeftTree(params) {
    return get('large-monitor-platform/lmp/mofDivTree', params)
  },
  getTypeList(params) {
    return post('large-monitor-platform/lmp/ask/getTypeList', params)
  },
  print(params) {
    return post('large-monitor-platform/lmp/ask/upload', params)
  }
}
