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
    // 生产文件服务器
    // fileservice: 'https://10.77.36.64:8088/apaas/api/fileservice',
    // 生产文件预览服务器 实际地址 'http://10.77.18.193:7110'
    // filePreviewService: 'https://10.77.36.64:8088/filePreviewService',
    // 准生产文件服务器 实际地址：http://10.77.18.172:32306
    fileservice: 'https://10.77.36.65:8080/apaas/api/fileservice',
    // 准生产文件预览服务器 实际地址 http://10.77.18.54:7110/;
    filePreviewService: 'https://10.77.36.65:8080/filePreviewService',
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
    'dfr-monitor-service': 'http://10.77.36.66:10055',
    gloableUrl: {
      isLoginOutToPortal: true,
      // 准生产门户
      portalLoginUrl: 'http://10.77.18.155:8081/ezweb/portal/main1/loginNew.jsp?max=1'
      // 生产门户
      // portalLoginUrl: 'http://10.77.18.66/ezweb/portal/main1/loginNew.jsp?max=1'
    }
  },
  development: { // 本地开发环境
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
    // 准生产文件预览服务器
    filePreviewService: 'http://10.77.18.54:7110',
    // filePreviewService: 'https://10.77.36.65:8080/filePreviewService',
    // ---------------------------其他业务模块服务---------------------------
    // ----------------预算执行系统----------------
    // 支付后端服务
    'pay-voucher-service': 'http://10.77.18.172:51001',
    // 指标管理服务
    'mp-b-budget-service': 'http://10.77.18.172:34405',
    // ---------------------------本系统服务---------------------------
    // 监控
    // 'large-monitor-platform': 'http://10.77.36.66:10053',
    'large-monitor-platform': 'http://127.0.0.1:6602',
    // 直达资金监控服务
    'dfr-service': 'https://10.77.36.65:8080',
    'dfr-monitor-service': 'http://127.0.0.1:6603',
    gloableUrl: {
      isLoginOutToPortal: true,
      // 准生产门户
      portalLoginUrl: 'http://10.77.18.155:8081/ezweb/portal/main1/loginNew.jsp?max=1'
      // 生产门户
      // portalLoginUrl: 'http://10.77.18.66/ezweb/portal/main1/loginNew.jsp?max=1'
    }
  },
  gloableUrl: {
    isLoginOutToPortal: true
  },
  getGroups: {
    group1: ['6100'], // 省本级
    group2: [
      '6101' // 西安堆
    ],
    group3: [
      '6103' // 关中
    ],
    group4: [
      '6102' // 陕北
    ],
    group5: [
      '6107' // 陕南
    ]
  },
  getProjectUrl: {
    group1: 'http://10.77.18.172:34224/#',
    group2: 'http://10.77.18.172:50252/#',
    group3: 'http://10.77.18.172:50252/#',
    group4: 'http://10.77.18.172:50252/#',
    group5: 'http://10.77.18.172:50252/#'
  }
}
