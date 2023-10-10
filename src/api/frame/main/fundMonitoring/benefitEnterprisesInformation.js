import { get, del } from '@/api/http'
export default {
  getReportTasks(params = {}) {
    return get('http://192.168.0.222:6602/corpInfo/query', params)
  },
  // BsTabPanel批量删除
  deleteTasks(params) {
    return del('http://192.168.0.222:6602/corpInfo/delete', params)
  },
  //
  getTreeData1(params) {
    return get('large-monitor-platform/lmp/mofDivTree', params)
  }
}
