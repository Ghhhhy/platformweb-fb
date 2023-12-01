/*
 * @Author: hupengcheng 1286335855@qq.com
 * @Date: 2023-09-12 15:58:40
 * @LastEditors: hupengcheng 1286335855@qq.com
 * @LastEditTime: 2023-10-09 13:53:09
 * @FilePath: \platformweb-fb\public\static\js\config\serverGatewayMap.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const api = 'http://223.223.190.114:12218'
// const api = 'http://223.223.190.114:21105'
// const api = 'http://10.100.32.125:7914'
// const api = 'http://43.143.57.251:6007'

// 帆软报表服务地址
let reportService = 'http://10.100.59.193:48000/boss/ReportServer?reportlet='

window.gloableToolFn = {
  serverGatewayMap: {
    production: {
      // --------------------------- apass服务 ---------------------------------//
      'mp-b-sso-service': '/apaas/api/mp-b-sso-service/',
      'mp-b-user-service': '/apaas/api/mp-b-user-service',
      'mp-b-perm-service': '/apaas/api/mp-b-perm-service/',
      'mp-b-basedata-service': '/apaas/api/mp-b-basedata-service/',
      'mp-d-aggregation-service': '/apaas/api/mp-d-aggregation-service',
      // --------------------------- apass服务 sh---------------------------------//
      // 'mp-b-sso-service': '/api/mp-b-sso-service/',
      // 'mp-b-user-service': '/api/mp-b-user-service',
      // 'mp-b-perm-service': '/api/mp-b-perm-service/',
      // 'mp-b-basedata-service': '/api/mp-b-basedata-service/',
      // 'mp-d-aggregation-service': '/api/mp-d-aggregation-service',
      // --------------------------- 文件相关服务 --------------------------------//
      fileservice: '/apaas/api/fileservice/',
      reportServiceProxy: '/reportService/',
      filePreviewService: '/apaas/api/filePreviewService/',
      // --------------------------- 后台服务 -----------------------------------//
      'large-monitor-platform': '',
      'dfr-monitor-service': ''
    },
    development: {
      // --------------------------- apass服务 ---------------------------------//
      'mp-b-sso-service': api + '/apaas/api/mp-b-sso-service/',
      'mp-b-user-service': api + '/apaas/api/mp-b-user-service/',
      'mp-b-perm-service': api + '/apaas/api/mp-b-perm-service/',
      'mp-b-basedata-service': api + '/apaas/api/mp-b-basedata-service/',
      'mp-d-aggregation-service': api + '/apaas/api/mp-d-aggregation-service',
      // fileservice: api + '/apaas/api/fileservice/',
      // --------------------------- apass  sh 服务 ---------------------------------//
      // 'mp-b-sso-service': api + '/mp-b-sso-service/',
      // 'mp-b-user-service': api + '/mp-b-user-service/',
      // 'userservice': api + '/userservice/',
      // 'mp-b-perm-service': api + '/mp-b-perm-service/',
      // 'mp-b-basedata-service': api + '/mp-b-basedata-service/',
      // 'mp-d-aggregation-service': api + '/mp-d-aggregation-service',
      // --------------------------- 文件服务 ----------------------------------//
      fileservice: api + '/apaas/api/fileservice/',
      filePreviewService: api + '/filePreviewService',
      // --------------------------- 后台服务 ----------------------------------//
      // 'large-monitor-platform': 'http://192.168.0.113:6602',
      // 'large-monitor-platform': 'http://127.0.0.1:6602',
      // 'large-monitor-platform': api,
      // 'dfr-monitor-service': 'http://127.0.0.1:6603',
      'large-monitor-platform': api,
      'dfr-monitor-service': api,
      'budget': 'http://10.100.32.125:9008' + '/budget'
    },
    gloableUrl: {
      // 是否退出到门户（平台）
      isLoginOutToPortal: true,
      // 门户（平台）登录地址
      portalLoginUrl: 'http://223.223.190.114:12100/'
      // 上海
      // portalLoginUrl: 'http://43.143.57.251:6007/'
      // portalLoginUrl: 'http://223.223.190.114:21105/'
      // portalLoginUrl: 'http://10.100.32.125:9007/'
    }
  },
  // 是否开启水印
  enableWaterMark: false,
  // behaviorcollector-开启行为采集
  openBehaviorcollector: false,
  getReportUrl: () => reportService,
  getIssueUrl: 'https://yth.czj.sh.cegn.cn/itsm/src/login/loginShczj.html',
  getBbsUrl: 'https://yth.czj.sh.cegn.cn/shbbs/',
  getProjectUrl: 'http://120.79.87.6:1995/'
}
