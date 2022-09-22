// 下拉菜单 @author黄丹

import { post } from '@/api/http'
export default {
  getDropMenuData(params) {
    return post('fiscal-config/queryTreeAssistData', params)
  }
}
