import { get, post } from '@/api/http'

export default {
  // 获取任务列表
  getTaskTable(params) {
    return get('pay-report-service/v1/task/query?log_type=query', params)
  },

  saveTask(params) {
    return post('pay-report-service/v1/task/save?log_type=insert', params)
  },

  deleteTask(params) {
    return post('pay-report-service/v1/task/delete?log_type=delete', params)
  },
  queryAllMofDiv(params) {
    return get('mp-b-basedata-service/v2/basedata/provinciallevel', params)
  },
  querySelectedMofDiv(params) {
    return get('pay-report-service/v1/task/taskAllots?log_type=query', params)
  },
  querySelectedReport(params) {
    return get('pay-report-service/v1/task/taskConfig?log_type=query', params)
  },

  queryAllReport(params) {
    return post('bisReport/report/getQueryTable', params)
  },
  saveTaskConfig(params) {
    return post('pay-report-service/v1/task/saveTaskConfig?log_type=insert', params)
  },
  saveTaskAllot(params) {
    return post('pay-report-service/v1/task/saveAllots?log_type=insert', params)
  }
}
