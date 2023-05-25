const api = 'http://223.223.190.114:12218'

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
      // --------------------------- 文件相关服务 --------------------------------//
      fileservice: '/apaas/api/fileservice/',
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
      // --------------------------- 文件服务 ----------------------------------//
      fileservice: api + '/apaas/api/fileservice/',
      filePreviewService: api + '/filePreviewService',
      // --------------------------- 后台服务 ----------------------------------//
      // 'large-monitor-platform': 'http://192.168.0.113:6602',
      'large-monitor-platform': api,
      'dfr-monitor-service': api
    },
    gloableUrl: {
      // 是否退出到门户（平台）
      isLoginOutToPortal: true,
      // 门户（平台）登录地址
      portalLoginUrl: 'http://223.223.190.114:12100/'
    }
  },
  // 是否开启水印
  enableWaterMark: false,
  getReportUrl: () => reportService,
  getIssueUrl: () => {
    return 'https://yth.czj.sh.cegn.cn/itsm/src/login/loginShczj.html'
  },
  getBbsUrl: () => {
    return 'https://yth.czj.sh.cegn.cn/shbbs/'
  }
}
