window.gloableToolFn.serverGatewayMap = {
  production: { // 生产环境
    // ---------------------------apass系统相关服务---------------------------
    // 基础数据服务
    'mp-b-basedata-service': 'http://10.77.18.172:32303',
    // 登录token校验
    'mp-b-sso-service': 'http://10.77.18.172:32304/',
    // 权限服务
    'mp-b-user-service': 'http://10.77.18.172:32302',
    'mp-b-perm-service': 'http://10.77.18.172:32301',
    // ---------------------------其他业务模块服务---------------------------
    // 文件服务器
    fileservice: 'http://10.77.18.172:32306',
    // 文件预览服务器
    filePreviewService: 'https://10.77.36.64:8088/filePreviewService',
    // ---------------------------其他业务模块服务---------------------------
    // ----------------预算执行系统----------------
    // 支付后端服务
    'pay-voucher-service': 'http://10.77.18.172:51001',
    // 指标管理服务
    'mp-b-budget-service': 'http://10.77.18.172:34405',
    // ---------------------------本系统服务---------------------------
    // 监控
    'large-monitor-platform': 'http://10.77.36.66:10053',
    // 直达资金监控服务
    'dfr-service': 'http://10.77.36.66:10055',
    'dfr-monitor-service': 'http://10.77.36.66:10055'
  },
  development: { // 本地开发环境
    // ---------------------------apass系统相关服务---------------------------
    // 基础数据服务
    // 'mp-b-basedata-service': 'http://223.223.190.114:11206/apaas/api/mp-b-basedata-service/',
    // // 登录token校验
    // 'mp-b-sso-service': 'http://223.223.190.114:11206/apaas/api/mp-b-sso-service/',
    // // 权限服务
    // 'mp-b-user-service': 'http://223.223.190.114:11206/apaas/api/mp-b-user-service/',
    // 'mp-b-perm-service': 'http://223.223.190.114:11206/apaas/api/mp-b-perm-service',
    'mp-b-basedata-service': 'http://10.70.13.201:82/mp-b-basedata-service/',
    // 登录token校验
    'mp-b-sso-service': 'http://10.70.13.201:82/mp-b-sso-service/',
    // 权限服务
    'mp-b-user-service': 'http://10.70.13.201:82/mp-b-user-service/',
    'mp-b-perm-service': 'http://10.70.13.201:82/mp-b-perm-service',
    // ---------------------------其他业务模块服务---------------------------
    // 文件服务器
    fileservice: 'http://10.77.18.172:32306',
    // 文件预览服务器
    filePreviewService: 'https://10.77.36.64:8088/filePreviewService',
    // ---------------------------其他业务模块服务---------------------------
    // ----------------预算执行系统----------------
    // 支付后端服务
    'pay-voucher-service': 'http://10.77.18.172:51001',
    // 指标管理服务
    'mp-b-budget-service': 'http://223.223.190.114:11206',
    // ---------------------------本系统服务---------------------------
    // 监控
    // 'large-monitor-platform': 'http://10.77.36.66:10053',
    // 'large-monitor-platform': 'http://223.223.190.114:11206',
    'large-monitor-platform': 'http://127.0.0.1:6602',
    // 直达资金监控服务
    'dfr-service': 'http://223.223.190.114:11206/',
    // 'dfr-monitor-service': 'http://223.223.190.114:11206/',
    'dfr-monitor-service': 'http://127.0.0.1:6603'
  },
  gloableUrl: {
    isLoginOutToPortal: true,
    // 准生产门户
    // portalLoginUrl: 'http://10.77.18.155:8081/ezweb/portal/main1/loginNew.jsp?max=1',
    // 生产门户
    portalLoginUrl: 'http://10.77.18.66/ezweb/portal/main1/loginNew.jsp?max=1'
  }
}
