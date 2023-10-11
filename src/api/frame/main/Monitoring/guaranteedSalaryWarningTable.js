//  规则管理审核api
import { post } from '@/api/http'
export default {
  // 获取表格数据
  queryTableDatas(params) {
    return post('large-monitor-platform/lmp/three/guaranteedSalary', params)
  }
}
