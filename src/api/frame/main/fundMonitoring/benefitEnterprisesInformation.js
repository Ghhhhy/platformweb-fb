/*
 * @Author: hupengcheng 1286335855@qq.com
 * @Date: 2023-10-09 13:54:24
 * @LastEditors: hupengcheng 1286335855@qq.com
 * @LastEditTime: 2023-10-12 14:11:28
 * @FilePath: \platformweb-fb\src\api\frame\main\fundMonitoring\benefitEnterprisesInformation.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { post } from '@/api/http'
export default {
  // 获取表格数据
  getReportTasks(params = {}) {
    return post('large-monitor-platform/lmp/corpInfo/query', params)
  },
  // 删除
  deleteTask(params) {
    return post('large-monitor-platform/lmp/corpInfo/del', params)
  },
  // 新增
  addTask(params) {
    return post('large-monitor-platform/lmp/corpInfo/add', params)
  },
  // 修改
  updateTask(params) {
    return post('large-monitor-platform/lmp/corpInfo/update', params)
  }
}
