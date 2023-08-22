export default [
  // 数据源管理
  {
    path: '/DataSourceManagement',
    name: 'DataSourceManagement',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () =>
      import('../../../views/main/baseDataManage/DataSourceManagement.vue')
  },
  // 转移支付指标下达明细（13区）
  {
    path: '/TransferPayGiveDetails',
    name: 'TransferPayGiveDetails',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () =>
      import('../../../views/main/TransferPayGiveDetails/TransferPayGiveDetails.vue')
  },
  // 违规类型管理
  {
    path: '/ViolationTypeManagement',
    name: 'ViolationTypeManagement',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () =>
      import(
        '../../../views/main/violationTypeManagement/violationTypeManagement.vue'
      )
  },
  // 规则分类管理
  {
    path: '/WarnLevelManagement',
    name: 'WarnLevelManagement',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () =>
      import('../../../views/main/warnLevelManagement/warnLevelManagement.vue')
  },
  {
    path: '/InquiryLetterType',
    name: 'InquiryLetterType',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () =>
      import(
        '../../../views/main/MointoringMatters/InquiryLetterType/InquiryLetterType.vue'
      )
  },
  {
    path: '/CentralTransferPayment',
    name: 'CentralTransferPayment',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () =>
      import(
        '../../../views/main/MointoringMatters/CentralTransferPayment/CentralTransferPayment.vue'
      )
  },
  {
    path: '/CentralTransferPaymentBySpecial',
    name: 'CentralTransferPaymentBySpecial',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () =>
      import(
        '../../../views/main/MointoringMatters/CentralTransferPayment/CentralTransferPayment.vue'
      )
  },
  {
    path: '/UserRegulationRelation', // 用户资金权限配置
    name: 'UserRegulationRelation',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () =>
      import(
        '../../../views/main/fundMonitoring/UserRegulationRelation/UserRegulationRelation.vue'
      )
  },
  //  三宝资金支出情况表
  {
    path: '/ThreeGuaranteesDetail',
    name: 'ThreeGuaranteesDetail',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () =>
      import(
        '../../../views/main/MointoringMatters/ThreeGuarantees/ThreeGuaranteesDetail.vue'
      )
  },
  {
    path: '/ThreeGuaranteesSummary',
    name: 'ThreeGuaranteesSummary',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () =>
      import(
        '../../../views/main/MointoringMatters/ThreeGuarantees/ThreeGuaranteesSummary.vue'
      )
  },
  {
    path: '/NewThreeGuarantees',
    name: 'NewThreeGuarantees',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () =>
      import(
        '../../../views/main/MointoringMatters/ThreeGuarantees/NewThreeGuarantees.vue'
      )
  },
  {
    path: '/NewThreeGuaranteesByys',
    name: 'NewThreeGuaranteesByys',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () =>
      import(
        '../../../views/main/MointoringMatters/ThreeGuarantees/NewThreeGuaranteesByys.vue'
      )
  },
  {
    path: '/MonitorRuleContactConfiguration',
    name: 'MonitorRuleContactConfiguration',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () =>
      import(
        '../../../views/main/MonitorRuleContactConfiguration/MonitorRuleContactConfiguration.vue'
      )
  },
  // 登录日志
  {
    path: '/loginLog',
    name: 'loginLog',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () =>
      import(
        '../../../views/main/loginLog/loginLog.vue'
      )
  }
]
