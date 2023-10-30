/*
 * @Author: hupengcheng 1286335855@qq.com
 * @Date: 2023-10-22 16:35:11
 * @LastEditors: hupengcheng 1286335855@qq.com
 * @LastEditTime: 2023-10-22 16:35:55
 * @FilePath: \platformweb-fb\src\api\frame\main\fundMonitoring\benefitDistributionCapital.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { post } from '@/api/http'
export default {
  getProTreeData(params) {
    return post('dfr-monitor-service/dfr/mofDivList/queryPro', params)
  }
}
