import { del, get, post } from '@/api/http'
import store from '@/store/index'

/**
 * 文件操作
 * 对接平台
 */

const {
  year,
  app: { guid: appid },
  province,
  guid: userguid
} = store.state.userInfo

/**
 * 获取文件信息
 * @param params
 * @return {Promise | Promise<unknown>}
 */
export function getFiles(billguid = '') {
  const params = {
    year,
    province,
    billguid
  }
  return get('fileservice/v2/files', params)
}

/**
 * 删除文件
 * @param params
 * @return {Promise | Promise<unknown>}
 */
export function deleteFile(fileguids) {
  return del(`fileservice/v2/files?fileguids=${fileguids}&appid=${appid}`)
}

/**
 * 上传文件
 * @param params
 * @return {Promise | Promise<unknown>}
 */
export function uploadFile(params) {
  const formData = new FormData()
  formData.append('year', year)
  formData.append('appid', appid)
  formData.append('province', province)
  formData.append('userguid', userguid)
  Object.entries(params).forEach(([key, value]) => {
    formData.append(key, value)
  })
  return post('fileservice/v2/upload', formData, null, 'multipart/form-data', 'openapi')
}

/**
 * 下载文件
 * @param fileguid
 */
export function downloadFile(fileguid) {
  const params = {
    appid,
    fileguid
  }
  return get('fileservice/v2/find/fileExists', params)
}
