// 报表服务地址
let reportService = 'http://10.100.59.193:48000/boss/ReportServer?reportlet='

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
  development: { // 新版
    // 基础数据服务
    'mp-b-basedata-service': 'http://10.100.32.125:7914/apaas/api/mp-b-basedata-service/',
    // 开发服务映射地址
    'mp-b-sso-service': 'http://10.100.32.125:7914/apaas/api/mp-b-sso-service/',
    // 权限服务
    'mp-b-user-service': 'http://10.100.32.125:7914/apaas/api/mp-b-user-service/',
    'mp-b-perm-service': 'http://10.100.32.125:7914/apaas/api/mp-b-perm-service',
    // 'mp-b-basedata-service': 'http:///apaas/api/mp-b-basedata-service/',
    // // 开发服务映射地址
    // 'mp-b-sso-service': 'http:///apaas/api/mp-b-sso-service/',
    // // 权限服务
    // 'mp-b-user-service': 'http:///apaas/api/mp-b-user-service/',
    // 'mp-b-perm-service': 'http:///apaas/api/mp-b-perm-service',
    // // 指标管理服务
    // 'mp-b-budget-service': 'http://10.77.18.172:34405',
    // // 开发服务映射地址
    // 'mp-b-sso-service': 'http://223.223.190.114:12218/apaas/api/mp-b-sso-service/',
    // // 权限服务
    // 'mp-b-user-service': 'http://223.223.190.114:12218/apaas/api/mp-b-user-service/',
    // 'mp-b-perm-service': 'http://223.223.190.114:12218/apaas/api/mp-b-perm-service',
    // 'mp-b-basedata-service': 'http://223.223.190.114:12218/apaas/api/mp-b-basedata-service/',
    // 监控
    'large-monitor-platform': 'http://127.0.0.1:6602/',
    // 'large-monitor-platform': 'http:///lmp/',
    // // 直达资金监控服务
    // 'dfr-service': 'http://10.77.18.172:34416/',
    // 'dfr-monitor-service': 'http:///dfr/',
    'dfr-monitor-service': 'http://127.0.0.1:6603/',
    // 监控
    // 'large-monitor-platform': 'http://10.76.56.21:6601',
    // 文件服务器
    fileservice: 'http://10.100.63.9:48000/zuulqs/openapi/mp-t-file-service/',
    // 文件预览服务器
    filePreviewService: 'http://10.100.63.9:48000/zuulqs/openapi/mp-t-file-service/',
    // 用款申请前台服务
    'pay-voucher-service': 'http://10.77.18.172:51001',
    // 待办事项服务
    'pay-todo-service': 'http://10.77.18.172:50131',
    // 'fileservice': 'http://10.100.62.12:8999/apaas/api/fileservice',
    'bisConfig': 'http://10.52.5.238:8888/api/budget/bisConfig',
    'bisProject': 'http://10.52.5.238:8888/api/budget/bisProject',
    'bisBudget': 'http://10.52.5.238:8888/api/budget/bisBudget',
    'bisBasicinfo': 'http://10.52.5.238:8888/api/budget/bisBasicinfo',
    'bisTodo': 'http://10.52.5.238:8888/api/budget/bisTodo',
    // 'bisReport': 'http://10.52.5.238:8888/api/budget/bisReport',
    'bisReport': 'http://10.77.18.172:36220/gateway/api/bisReport/',
    'bisSpeFundBudget': 'http://10.52.5.238:8888/api/budget/bisSpeFundBudget',
    'bisBudgetReply': 'http://10.52.5.238:8888/api/budget/bisBudgetReply',
    'bisFinancialbudget': 'http://10.52.5.238:8888/api/budget/bisFinancialbudget',
    'bisBudgetAdjust': 'http://10.52.5.238:8888/api/budget/bisBudgetAdjust'

  },
  gloableUrl: {
    isLoginOutToPortal: true,
    // 准生产门户
    // portalLoginUrl: 'http://10.77.18.155:8081/ezweb/portal/main1/loginNew.jsp?max=1',
    // 福建准生产门户
    // portalLoginUrl: 'http://10.100.32.125:9007/'
    // 福建生产
    portalLoginUrl: 'http://10.100.59.193:7001/'
  },
  globalConfig: {
    // 是否展示待办
    todoOpen: true
  }
}
window.gloableToolFn.getReportUrl = () => {
  return reportService
}
