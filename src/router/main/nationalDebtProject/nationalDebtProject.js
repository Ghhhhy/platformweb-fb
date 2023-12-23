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
  // 增发国债资金项目基本信息审核
  {
    path: '/PmProDetAduit',
    name: 'PmProDetAduit',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () =>
      import('../../../views/main/FinanceDepartmentMaintainsInfo/FinanceDepartmentMaintainsInfoFirstAudit.vue')
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
      import('../../../views/main/FinanceDepartmentMaintainsInfo/FinanceDepartmentMaintainsInfoSecondAudit.vue')
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
  // 增发国债资金项目基本信息月报审核
  {
    path: '/PmProDetMonAudit',
    name: 'PmProDetMonAudit',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () =>
      import('../../../views/main/MonthlyInfoTbl/MonthlyInfoTblFirstAudit.vue')
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
      import('../../../views/main/MonthlyInfoTbl/MonthlyInfoTblSecondAudit.vue')
  }
]
