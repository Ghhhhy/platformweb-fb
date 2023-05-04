import { get } from '@/api/http'

/**
 * 获取用户的角色
 * @param params
 * @returns {Promise | Promise<unknown>}
 */
export function getUserRoles(params) {
  return get('mp-b-perm-service/v2/userroles', params)
}
