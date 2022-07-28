// 接收配置api
import { get, post } from '@/api/http'

export default {
  // 获取配置
  getConfig() {
    return get('pay-report-service/v1/receiveConfig/getReceiveConfig?log_type=query')
  },
  // 保存配置
  saveConfig(data) {
    return post('pay-report-service/v1/receiveConfig/saveReceiveConfig?log_type=update', data)
  }
}
