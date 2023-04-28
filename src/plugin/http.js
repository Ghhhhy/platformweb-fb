/*
 * @Description: http
 * @Author: Comer
 * @Date: 2023-03-20 16:40:00
 * @LastEditors: Comer
 * @LastEditTime: 2023-03-20 18:27:31
 */

import Vue from 'vue'
import {
  get,
  post,
  put,
  del,
  postStringify,
  DownLoadToFile,
  downLoad,
  httpGlobalGatewayAgent,
  smSecretUtils,
  globalGatewayAgentConfig
} from '../api/http'

Vue.prototype.$http = {
  get,
  post,
  put,
  del,
  postStringify,
  DownLoadToFile,
  downLoad,
  httpGlobalGatewayAgent,
  smSecretUtils,
  globalGatewayAgentConfig
}
