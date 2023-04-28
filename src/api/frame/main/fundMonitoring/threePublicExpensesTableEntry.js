import { post } from '@/api/http'

/**
 * 获取列表信息
 * @param params
 * @return {*}
 */
export const getThreePublicTable = (params) => {
  return post('large-monitor-platform/lmp/threePublicExpensesTableEntry/getThreePublicTable', params)
}

/**
 * 新增
 * @param params
 * @return {*}
 */
export const addThreePublicTable = (params) => {
  return post('large-monitor-platform/lmp/threePublicExpensesTableEntry/addThreePublicTable', params)
}

/**
 * 提交
 * @param params
 * @return {*}
 */
export const updateThreePublicTable = (params) => {
  return post('large-monitor-platform/lmp/threePublicExpensesTableEntry/updateThreePublicTable', params)
}

/**
 * 撤回
 * @param params
 * @return {*}
 */
export const revokeThreePublicTable = (params) => {
  return post('large-monitor-platform/lmp/threePublicExpensesTableEntry/revokeThreePublicTable', params)
}
