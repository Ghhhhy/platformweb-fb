/*
 * 直达资金监控路由
 */
export default [
  {
    path: '/dfrViolationProcessing',
    name: 'dfrViolationProcessing',
    meta: {
      keepAlive: true
    },
    component: () =>
      import('../../../views/main/directFund/violationProcessing/dfrViolationProcessingBill.vue') // 违规处理
  },
  {
    path: '/dfrViolationProcessingAudit',
    name: 'dfrViolationProcessingAudit',
    meta: {
      keepAlive: true
    },
    component: () =>
      import('../../../views/main/directFund/violationProcessing/dfrViolationProcessingBillAudit.vue') // 违规处理
  },
  {
    path: '/dfrViolationProcessingUnitAudit',
    name: 'dfrViolationProcessingUnitAudit',
    meta: {
      keepAlive: true
    },
    component: () =>
      import('../../../views/main/directFund/violationProcessing/dfrViolationProcessingBillUnitAudit.vue') // 违规处理
  },
  {
    path: '/dfrViolationProcessingResult',
    name: 'dfrViolationProcessingResult',
    meta: {
      keepAlive: true
    },
    component: () =>
      import('../../../views/main/directFund/violationProcessing/dfrViolationProcessingResult.vue') // 违规处理
  },
  {
    path: '/dfrViolationProcessingResultAudit',
    name: 'dfrViolationProcessingResultAudit',
    meta: {
      keepAlive: true
    },
    component: () =>
      import('../../../views/main/directFund/violationProcessing/dfrViolationProcessingResultAudit.vue') // 违规处理
  },
  {
    path: '/dfrReportData',
    name: 'dfrReportData',
    meta: {
      keepAlive: true
    },
    component: () =>
      import('../../../views/main/directFund/report/index.vue') // 直达资金报表-输出表 参照政府预算汇总
  },
  {
    path: '/dfrReportDataAudit',
    name: 'dfrReportDataAudit',
    meta: {
      keepAlive: true
    },
    component: () =>
      import('../../../views/main/directFund/report/index.vue') // 本级报表编制审核
  },
  {
    path: '/Focus',
    name: 'Focus',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () => import('../../../views/main/directFund/dfrFocus/Focus.vue')
  },
  {
    path: '/indexFind', // 指标查询
    name: 'IndexFind',
    component: () => import('@/views/main/directFund/indexFind/index.vue')
  },
  {
    path: '/directFundsChart', // 直达资金图表
    name: 'DirectFundsChart',
    component: () => import('@/views/px-to-vw-page/directFunds/index.vue')
  }
]
