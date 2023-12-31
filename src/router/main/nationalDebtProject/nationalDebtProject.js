/*
 * @Author: caoweiwei caoweiwei@bosssoft.com.cn
 * @Date: 2023-12-30 19:46:50
 * @LastEditors: caoweiwei caoweiwei@bosssoft.com.cn
 * @LastEditTime: 2023-12-31 18:17:20
 * @FilePath: \platformweb-fb\src\router\main\nationalDebtProject\nationalDebtProject.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export default [
  // 增发国债资金项目基本信息录入
  {
    path: '/PmProDetInput',
    name: 'PmProDetInput',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () =>
      import('../../../views/main/FinanceDepartmentMaintainsInfo/FinanceDepartmentMaintainsInfo.vue')
  },
  // 增发国债资金项目基本信息审核-主管部门
  {
    path: '/PmProDetAduit',
    name: 'PmProDetAduit',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () =>
      import('../../../views/main/FinanceDepartmentMaintainsInfo/FinanceDepartmentMaintainsInfoAudit.vue')
  },
  // 增发国债资金项目基本信息审核-业务处室
  {
    path: '/PmProBusAduit',
    name: 'PmProBusAduit',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () =>
      import('../../../views/main/FinanceDepartmentMaintainsInfo/FinanceDepartmentMaintainsInfoAudit.vue')
  },
  // 增发国债资金项目基本信息审核-预算处
  {
    path: '/PmProBudAduit',
    name: 'PmProBudAduit',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () =>
      import('../../../views/main/FinanceDepartmentMaintainsInfo/FinanceDepartmentMaintainsInfoAudit.vue')
  },
  // 增发国债资金项目基本信息终审
  {
    path: '/PmProDetFinalAduit',
    name: 'PmProDetFinalAduit',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () =>
      import('../../../views/main/FinanceDepartmentMaintainsInfo/FinanceDepartmentMaintainsInfoList.vue')
  },
  // 增发国债资金项目基本信息月报录入
  {
    path: '/PmProDetMonInput',
    name: 'PmProDetMonInput',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () =>
      import('../../../views/main/MonthlyInfoTbl/MonthlyInfoTbl.vue')
  },
  // 增发国债资金项目基本信息月报审核-主管部门
  {
    path: '/PmProDetMonAudit',
    name: 'PmProDetMonAudit',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () =>
      import('../../../views/main/MonthlyInfoTbl/MonthlyInfoTblAudit.vue')
  },
  // 增发国债资金项目基本信息月报审核-业务处室
  {
    path: '/PmProBusMonAudit',
    name: 'PmProBusMonAudit',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () =>
      import('../../../views/main/MonthlyInfoTbl/MonthlyInfoTblAudit.vue')
  },
  // 增发国债资金项目基本信息月报审核-预算处
  {
    path: '/PmProBudMonAudit',
    name: 'PmProBudMonAudit',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () =>
      import('../../../views/main/MonthlyInfoTbl/MonthlyInfoTblAudit.vue')
  },
  // 增发国债资金项目基本信息月报终审
  {
    path: '/PmProDetMonFinalAudit',
    name: 'PmProDetMonFinalAudit',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () =>
      import('../../../views/main/MonthlyInfoTbl/MonthlyInfoTblList.vue')
  }
]
