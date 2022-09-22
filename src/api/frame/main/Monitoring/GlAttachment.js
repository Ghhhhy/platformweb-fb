import { get } from '@/api/http'

export default {
  // 获取表格内容数据
  getFile(params) {
    return get('fileservice/v2/files', params)
  }
}
