export default [
  // 数据源管理
  {
    path: '/DataSourceManagement',
    name: 'DataSourceManagement',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () => import('../../../views/main/baseDataManage/DataSourceManagement.vue')
  },
  // 违规类型管理
  {
    path: '/ViolationTypeManagement',
    name: 'ViolationTypeManagement',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () => import('../../../views/main/violationTypeManagement/violationTypeManagement.vue')
  },
  // 规则分类管理
  {
    path: '/WarnLevelManagement',
    name: 'WarnLevelManagement',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () => import('../../../views/main/warnLevelManagement/warnLevelManagement.vue')
  },
  {
    path: '/InquiryLetterType',
    name: 'InquiryLetterType',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () => import('../../../views/main/MointoringMatters/InquiryLetterType/InquiryLetterType.vue')
  },
  {
    path: '/CentralTransferPayment',
    name: 'CentralTransferPayment',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () => import('../../../views/main/MointoringMatters/CentralTransferPayment/CentralTransferPayment.vue')
  },
  {
    path: '/CentralTransferPaymentBySpecial',
    name: 'CentralTransferPaymentBySpecial',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () => import('../../../views/main/MointoringMatters/CentralTransferPayment/CentralTransferPayment.vue')
  },
  {
    path: '/UserRegulationRelation', // 用户资金权限配置
    name: 'UserRegulationRelation',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () => import('../../../views/main/fundMonitoring/UserRegulationRelation/UserRegulationRelation.vue')
  }
]
