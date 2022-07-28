/*
 * @Author: your name
 * @Date: 2021-08-23 10:07:58
 * @LastEditTime: 2021-09-03 15:40:05
 * @LastEditors: dell-pc-PC
 * @Description: In User Settings Edit
 * @FilePath: \caizheng-front\src\api\serverGatewayMap.js
 */
export default {
  development_ceshi: { // 新版
    'mp-b-basedata-service': 'http://10.100.62.12:8999/apaas/api/mp-b-basedata-service',
    'fiscal-config': 'http://10.100.62.12:8999/apaas/api/',
    'mp-b-sso-service': 'http://10.100.62.12:8999/apaas/api/mp-b-sso-service',
    'mp-b-perm-service': 'http://10.100.62.12:8999/apaas/api/mp-b-perm-service',
    'mp-b-user-service': 'http://10.100.62.12:8999/apaas/api/mp-b-user-service',
    'mp-b-project-service': 'http://10.100.62.12:8999/apaas/api/',
    'project-service': 'http://10.100.32.122:7999/gateway/api/project-service/',
    'bisConfig': 'http://10.100.62.12:8999/api/budget/bisConfig',
    'bisEdgeService': 'http://localhost:8888',
    // 'bisProject': 'http://localhost:8888/api/bisProject',
    'bisProject': 'http://10.100.62.12:8999/api/budget/bisProject',
    'bisReport': 'http://10.100.62.12:8999/api/budget/bisReport',
    'bisConfigInner': 'http://10.100.62.12:8999/api/budget/bisConfig',
    'bisBudget': 'http://10.100.62.12:8999/api/budget/bisBudget',
    'bisBasicinfo': 'http://10.100.62.12:8999/api/budget/bisBasicinfo',
    'fileservice': 'http://10.100.62.12:8999/apaas/api/fileservice'
  },
  development_shengchan: { // 生產
    'mp-b-basedata-service': 'http://10.100.59.194:7001/apaas/api/mp-b-basedata-service',
    'fiscal-config': 'http://10.100.59.194:7001/apaas/api/',
    'mp-b-sso-service': 'http://10.100.59.194:7001/apaas/api/mp-b-sso-service',
    'mp-b-perm-service': 'http://10.100.59.194:7001/apaas/api/mp-b-perm-service',
    'mp-b-user-service': 'http://10.100.59.194:7001/apaas/api/mp-b-user-service',
    'mp-b-project-service': 'http://10.100.59.194:7001/apaas/api/',
    'project-service': 'http://10.100.59.194:7001/gateway/api/project-service/',
    'bisConfig': 'http://10.100.59.194:7001/api/budget/bisConfig',
    'bisEdgeService': 'http://10.100.59.194:7001',
    // 'bisProject': 'http://127.0.0.1:8888/api/budget/bisProject',
    'bisProject': 'http://10.100.59.194:7001/api/budget/bisProject',
    'bisReport': 'http://10.100.59.194:7001/api/budget/bisReport',
    'bisConfigInner': 'http://10.100.59.194:7001/api/budget/bisConfig',
    'bisBudget': 'http://10.100.59.194:7001/api/budget/bisBudget',
    'bisBasicinfo': 'http://10.100.59.194:7001/api/budget/bisBasicinfo',
    'fileservice': 'http://10.100.59.194:7001/apaas/api/fileservice'
  },
  development_old: { // 新版
    // 'mp-b-basedata-service': 'http://10.100.32.122:7001',
    // 'mp-b-sso-service': 'http://10.100.32.122:7010',
    // 'mp-b-perm-service': 'http://10.100.32.122:7007',
    // 'mp-b-user-service': 'http://10.100.32.122:7011',
    'mp-b-basedata-service': 'http://192.168.31.100:9004',
    'mp-b-sso-service': 'http://192.168.31.100:9001',
    'mp-b-perm-service': 'http://192.168.31.100:9003',
    'mp-b-user-service': 'http://192.168.31.100:9002',
    'mp-b-budget-service': 'http://192.168.1.118:8009',
    'fileservice': 'http://10.100.62.12:8999/apaas/api/fileservice',
    'bisConfig': 'http://192.168.31.186:8888/api/budget/bisConfig',
    'bisProject': 'http://127.0.0.1:8888/api/budget/bisProject',
    'bisBudget': 'http://127.0.0.1:8888/api/budget/bisBudget',
    'bisBasicinfo': 'http://127.0.0.1:8888/api/budget/bisBasicinfo',
    'bisTodo': 'http://127.0.0.1:8888/api/budget/bisTodo',
    'bisReport': 'http://127.0.0.1:8888/api/budget/bisReport',
    'bisSpeFundBudget': 'http://127.0.0.1:8888/api/budget/bisSpeFundBudget',
    'bisFinancialbudget': 'http://127.0.0.1:8888/api/budget/bisFinancialbudget',
    'pems_allpro': 'http://223.223.190.130:30171',
    'chj-test-service': 'http://10.52.5.117:8888/api', // chj-test界面的服务端地址，可注释掉
    'bisGovbudget': 'http://192.168.31.186:8888/api/bisGovbudget/govbudget'
  },
  development: { // 新版
    'mp-b-basedata-service': 'http://192.168.31.100:9004',
    'mp-b-sso-service': 'http://192.168.31.100:9001',
    'mp-b-perm-service': 'http://192.168.31.100:9003',
    'mp-b-user-service': 'http://192.168.31.100:9002',
    // 'mp-b-perm-service': 'http://10.77.26.15:43001',
    // 'mp-b-basedata-service': 'http://10.77.26.15:43003',
    // 'mp-b-sso-service': 'http://10.77.26.15:43005',
    // 'mp-b-user-service': 'http://10.77.26.15:43002',
    'mp-b-budget-service': 'http://192.168.1.118:8009',
    'fileservice': 'http://10.100.62.12:8999/apaas/api/fileservice',
    'bisConfig': 'http://192.168.31.100:8888/api/budget/bisConfig',
    // 'bisConfig': 'http://192.168.31.91:8888/api/bisConfig', // zpx
    // 'bisConfig': 'http://10.76.56.107:8888/api/budget/bisConfig', // zzb
    'bisProject': 'http://192.168.31.100:8888/api/budget/bisProject',
    'bisBudget': 'http://192.168.31.100:8888/api/budget/bisBudget',
    'bisBasicinfo': 'http://192.168.31.100:8888/api/budget/bisBasicinfo',
    'bisTodo': 'http://192.168.31.100:8888/api/budget/bisTodo',
    'bisReport': 'http://192.168.31.100:8888/api/budget/bisReport',
    'bisSpeFundBudget': 'http://192.168.31.100:8888/api/budget/bisSpeFundBudget',
    'bisFinancialbudget': 'http://192.168.31.100:8888/api/budget/bisFinancialbudget',
    'pems_allpro': 'http://223.223.190.130:30171',
    'chj-test-service': 'http://10.52.5.117:8888/api', // chj-test界面的服务端地址，可注释掉
    'bisGovbudget': 'http://192.168.31.100:8888/api/budget/bisGovbudget',
    // 'bisGovbudget': 'http://10.76.56.107:8888/api/budget/bisGovbudget',
    'bisBudgetSync': 'http://192.168.31.187:8888/api/budget/bisBudgetSync'
  },
  gloableUrl: {
    isLoginOutToPortal: true,
    portalLoginUrl: 'http://10.100.62.11:8999/'
  }
}
