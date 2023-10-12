/*
 * @Author: hupengcheng 1286335855@qq.com
 * @Date: 2023-10-11 13:47:49
 * @LastEditors: hupengcheng 1286335855@qq.com
 * @LastEditTime: 2023-10-12 14:07:28
 * @FilePath: \platformweb-fb\src\api\frame\main\Monitoring\CheckPayBill.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

// 上下级对账api
import { post } from '@/api/http'
export default {
  getReportDetail(params) {
    return post('large-monitor-platform/lmp/report/transferPay/detailById', params)
  }
}
