export default [
  // 政策法规管理
  {
    path: '/PoliciesAndRegulationsManagement',
    name: 'PoliciesAndRegulationsManagement',
    component: () =>
      import(
        '../../../views/main/MointoringMatters/PoliciesAndRegulationsManagement/PoliciesAndRegulationsManagement.vue'
      )
  },
  // 政策法规查询
  {
    path: '/PoliciesAndRegulationsSelect',
    name: 'PoliciesAndRegulationsSelect',
    component: () =>
      import(
        '../../../views/main/MointoringMatters/PoliciesAndRegulationsManagement/PoliciesAndRegulationsManagement.vue'
      )
  },
  // 监控规则函数管理
  {
    path: '/MonitoringRuleFunctionManagement',
    name: 'MonitoringRuleFunctionManagement',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () =>
      import(
        '../../../views/main/MointoringMatters/MonitoringRuleFunctionManagement/MonitoringRuleFunctionManagement.vue'
      )
  },
  // 监控事项申报-部门
  {
    path: '/DeclarationOfMonitoringItemsDepartment',
    name: 'DeclarationOfMonitoringItemsDepartment',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () =>
      import(
        '../../../views/main/MointoringMatters/DeclarationOfMonitoringItemsDepartment/DeclarationOfMonitoringItemsDepartment.vue'
      )
  },
  // 监控事项申报-财政
  {
    path: '/DeclarationOfMonitoringItemsFinance',
    name: 'DeclarationOfMonitoringItemsFinance',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () =>
      import(
        '../../../views/main/MointoringMatters/DeclarationOfMonitoringItemsFinance/DeclarationOfMonitoringItemsFinance.vue'
      )
  },
  // 监控事项申报-监控
  {
    path: '/DeclarationOfMonitoringItemsMonitor',
    name: 'DeclarationOfMonitoringItemsMonitor',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () =>
      import(
        '../../../views/main/MointoringMatters/DeclarationOfMonitoringItemsMonitor/DeclarationOfMonitoringItemsMonitor.vue'
      )
  },
  // 监控事项审核-财政
  {
    path: '/DeclarationOfMonitoringItemsFlowFinance',
    name: 'DeclarationOfMonitoringItemsFlowFinance',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () =>
      import(
        '../../../views/main/MointoringMatters/DeclarationOfMonitoringItemsFlowFinance/DeclarationOfMonitoringItemsFlowFinance.vue'
      )
  },
  // 监控事项审核-监控
  {
    path: '/DeclarationOfMonitoringItemsFlowMonitor',
    name: 'DeclarationOfMonitoringItemsFlowMonitor',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () =>
      import(
        '../../../views/main/MointoringMatters/DeclarationOfMonitoringItemsFlowMonitor/DeclarationOfMonitoringItemsFlowMonitor.vue'
      )
  },
  // 监控事项批复
  {
    path: '/ApprovalOfMonitoringMatters',
    name: 'ApprovalOfMonitoringMatters',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () =>
      import(
        '../../../views/main/MointoringMatters/ApprovalOfMonitoringMatters/ApprovalOfMonitoringMatters.vue'
      )
  },
  // 监控事项查看
  {
    path: '/ApprovalOfMonitoringSelectMatters',
    name: 'ApprovalOfMonitoringSelectMatters',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () =>
      import(
        '../../../views/main/MointoringMatters/ApprovalOfMonitoringMatters/ApprovalOfMonitoringMatters.vue'
      )
  },
  // 监控规则模板库管理
  {
    path: '/MonitoringRuleTemplateLibraryManagement',
    name: 'MonitoringRuleTemplateLibraryManagement',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () =>
      import(
        '../../../views/main/MointoringMatters/MonitoringRuleTemplateLibraryManagement/MonitoringRuleTemplateLibraryManagement.vue'
      )
  },
  // 系统级规则管理
  {
    path: '/SystemLevelRules',
    name: 'SystemLevelRules',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () =>
      import(
        '../../../views/main/MointoringMatters/SystemLevelRules/SystemLevelRules.vue'
      )
  },
  {
    path: '/MapRuleSetting',
    name: 'MapRuleSetting',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () =>
      import(
        '../../../views/main/MointoringMatters/MapRuleSetting/MapRuleSetting.vue'
      )
  },
  {
    path: '/SystemLevelRulesBySpe',
    name: 'SystemLevelRulesBySpe',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () =>
      import(
        '../../../views/main/MointoringMatters/SystemLevelRules/SystemLevelRules.vue'
      )
  },
  // 系统级规则审核
  {
    path: '/SystemLevelRulesFlow',
    name: 'SystemLevelRulesFlow',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () =>
      import(
        '../../../views/main/MointoringMatters/SystemLevelRulesFlow/SystemLevelRulesFlow.vue'
      )
  },
  // 财政级规则管理
  {
    path: '/FinanceLevelRules',
    name: 'FinanceLevelRules',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () =>
      import(
        '../../../views/main/MointoringMatters/SystemLevelRules/SystemLevelRules.vue'
      )
  },
  // 财政级规则审核
  {
    path: '/FinanceLevelRulesFlow',
    name: 'FinanceLevelRulesFlow',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () =>
      import(
        '../../../views/main/MointoringMatters/SystemLevelRulesFlow/SystemLevelRulesFlow.vue'
      )
  },
  // 部门级规则管理
  {
    path: '/DepartmentLevelRules',
    name: 'DepartmentLevelRules',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () =>
      import(
        '../../../views/main/MointoringMatters/SystemLevelRules/SystemLevelRules.vue'
      )
  },
  // 部门级规则审核
  {
    path: '/DepartmentLevelRulesFlow',
    name: 'DepartmentLevelRulesFlow',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () =>
      import(
        '../../../views/main/MointoringMatters/SystemLevelRulesFlow/SystemLevelRulesFlow.vue'
      )
  },
  // 监控规则查看
  {
    path: '/MonitorRulesView',
    name: 'MonitorRulesView',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () =>
      import(
        '../../../views/main/MointoringMatters/MonitorRulesView/MonitorRulesView.vue'
      )
  },
  // 监控规则查看全辖
  {
    path: '/SXMonitorRulesView',
    name: 'SXMonitorRulesView',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () =>
      import(
        '../../../views/main/MointoringMatters/MonitorRulesView/MonitorRulesView.vue'
      )
  },
  // 监控规则查看
  {
    path: '/MonitorRulesViewFJWK',
    name: 'MonitorRulesViewFJWK',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () => import('@/views/main/MointoringMatters/MonitorRulesViewFJWK/MonitorRulesViewFJWK.vue')
  },
  // 直达监控规则查看
  {
    path: '/MonitorRulesViewZD',
    name: 'MonitorRulesViewZD',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () =>
      import(
        '../../../views/main/MointoringMatters/MonitorRulesView/MonitorRulesView.vue'
      )
  },
  // 监控规则查看
  {
    path: '/MonitorRulesViewShow',
    name: 'MonitorRulesViewShow',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () => import('../../../views/main/MointoringMatters/MonitorRulesView/MonitorRulesView.vue')
  },
  // 监控规则查看
  {
    path: '/SXMonitorRulesViewShow',
    name: 'SXMonitorRulesViewShow',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () => import('../../../views/main/MointoringMatters/MonitorRulesView/MonitorRulesView.vue')
  },
  // 直达监控规则查看
  {
    path: '/MonitorRulesViewByZd',
    name: 'MonitorRulesViewByZd',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () =>
      import(
        '../../../views/main/MointoringMatters/MonitorRulesView/MonitorRulesView.vue'
      )
  },
  {
    path: '/SXMonitorRulesViewByZd',
    name: 'SXMonitorRulesViewByZd',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () =>
      import(
        '../../../views/main/MointoringMatters/MonitorRulesView/MonitorRulesView.vue'
      )
  },
  {
    path: '/MonitorRulesViewBySpe',
    name: 'MonitorRulesViewBySpe',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () =>
      import(
        '../../../views/main/MointoringMatters/MonitorRulesView/MonitorRulesView.vue'
      )
  },
  {
    path: '/MonitorRulesViewThreeGuarantees',
    name: 'MonitorRulesViewThreeGuarantees',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () =>
      import(
        '../../../views/main/MointoringMatters/MonitorRulesView/MonitorRulesView.vue'
      )
  },
  {
    path: '/MonitorRulesViewThreePublic',
    name: 'MonitorRulesViewThreePublic',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () =>
      import(
        '../../../views/main/MointoringMatters/MonitorRulesView/MonitorRulesView.vue'
      )
  },
  {
    path: '/MonitorRulesViewDfr',
    name: 'MonitorRulesViewDfr',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () =>
      import(
        '../../../views/main/MointoringMatters/MonitorRulesView/MonitorRulesView.vue'
      )
  },
  {
    path: '/MonitorRulesViewFJ',
    name: 'MonitorRulesViewFJ',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () =>
      import(
        '../../../views/main/MointoringMatters/MonitorRulesViewFJ/MonitorRulesViewFJ.vue'
      )
  },
  // 中央专项监控规则业务人员查看
  {
    path: '/MonitorRulesViewFJSpecial',
    name: 'MonitorRulesViewFJSpecial',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () =>
      import(
        '../../../views/main/MointoringMatters/MonitorRulesViewFJSpecial/MonitorRulesViewFJSpecial.vue'
      )
  },
  // 地方专项监控规则业务人员查看
  {
    path: '/MonitorRulesViewFJLocal',
    name: 'MonitorRulesViewFJLocal',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () =>
      import(
        '../../../views/main/MointoringMatters/MonitorRulesViewFJSpecial/MonitorRulesViewFJSpecial.vue'
      )
  },
  // 专项监控规则查看
  {
    path: '/MonitorRulesViewSpecial',
    name: 'MonitorRulesViewSpecial',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () =>
      import(
        '../../../views/main/MointoringMatters/MonitorRulesViewSpecial/MonitorRulesViewSpecial.vue'
      )
  },
  // 同户名转账统计
  {
    path: '/SameNameTransferStatistics',
    name: 'SameNameTransferStatistics',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () =>
      import(
        '../../../views/main/MointoringMatters/BudgetImplementWarningDataMager/BudgetImplementWarningDataMager.vue'
      )
  },
  // 其他监控统计
  {
    path: '/OtherMonitoringStatistics',
    name: 'OtherMonitoringStatistics',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () =>
      import(
        '../../../views/main/MointoringMatters/BudgetImplementWarningDataMager/BudgetImplementWarningDataMager.vue'
      )
  },
  // 流程督办监控统计
  {
    path: '/ProcessSupervisionAndMonitoringStatistics',
    name: 'ProcessSupervisionAndMonitoringStatistics',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () =>
      import(
        '../../../views/main/MointoringMatters/BudgetImplementWarningDataMager/BudgetImplementWarningDataMager.vue'
      )
  },
  // 超出大额支付统计
  {
    path: '/BudgetImplementWarningDataMager',
    name: 'BudgetImplementWarningDataMager',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () =>
      import(
        '../../../views/main/MointoringMatters/BudgetImplementWarningDataMager/BudgetImplementWarningDataMager.vue'
      )
  },
  // 资金用途使用不规范统计
  {
    path: '/NonStandardStatisticsOfUse',
    name: 'NonStandardStatisticsOfUse',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () =>
      import(
        '../../../views/main/MointoringMatters/BudgetImplementWarningDataMager/BudgetImplementWarningDataMager.vue'
      )
  },
  // 支出不规范统计
  {
    path: '/ExpenditureStatisticsAreNotStandardized',
    name: 'ExpenditureStatisticsAreNotStandardized',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () =>
      import(
        '../../../views/main/MointoringMatters/BudgetImplementWarningDataMager/BudgetImplementWarningDataMager.vue'
      )
  },
  // 支付信息不规范统计
  {
    path: '/PaymentInformationIsNotStandardizedStatistics',
    name: 'PaymentInformationIsNotStandardizedStatistics',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () =>
      import(
        '../../../views/main/MointoringMatters/BudgetImplementWarningDataMager/BudgetImplementWarningDataMager.vue'
      )
  },
  // 工资支出相关统计
  {
    path: '/SalaryExpenditureRelatedStatistics',
    name: 'SalaryExpenditureRelatedStatistics',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () =>
      import(
        '../../../views/main/MointoringMatters/BudgetImplementWarningDataMager/BudgetImplementWarningDataMager.vue'
      )
  },
  // 禁止使用科目统计
  {
    path: '/SubjectStatisticsAreProhibited',
    name: 'SubjectStatisticsAreProhibited',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () =>
      import(
        '../../../views/main/MointoringMatters/BudgetImplementWarningDataMager/BudgetImplementWarningDataMager.vue'
      )
  },
  // 预警数据审核（预算执行）
  {
    path: '/BudgetAccountingWarningDataMager',
    name: 'BudgetAccountingWarningDataMager',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () =>
      import(
        '../../../views/main/MointoringMatters/BudgetAccountingWarningDataMager/BudgetAccountingWarningDataMager.vue'
      )
  },
  // 预警数据审核（直达资金）
  {
    path: '/BudgetAccountingWarningDataMagerByZd',
    name: 'BudgetAccountingWarningDataMagerByZd',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () =>
      import(
        '../../../views/main/MointoringMatters/BudgetAccountingWarningDataMager/BudgetAccountingWarningDataMager.vue'
      )
  },
  // 预警数据审核（财政专户资金）
  {
    path: '/BudgetAccountingWarningDataMagerByZh',
    name: 'BudgetAccountingWarningDataMagerByZh',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () =>
      import(
        '../../../views/main/MointoringMatters/BudgetAccountingWarningDataMager/BudgetAccountingWarningDataMager.vue'
      )
  },
  {
    path: '/BudgetAccountingWarningDataMagerBySg',
    name: 'BudgetAccountingWarningDataMagerBySg',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () => import('../../../views/main/MointoringMatters/BudgetAccountingWarningDataMager/BudgetAccountingWarningDataMager.vue')
  },
  // 预警数据审核（专项监控）
  {
    path: '/BudgetAccountingWarningDataMagerBySpe',
    name: 'BudgetAccountingWarningDataMagerBySpe',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () =>
      import(
        '../../../views/main/MointoringMatters/BudgetAccountingWarningDataMager/BudgetAccountingWarningDataMager.vue'
      )
  },
  // 预警数据审核（三保）
  {
    path: '/BudgetAccountingWarningDataMagerBySb',
    name: 'BudgetAccountingWarningDataMagerBySb',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () =>
      import(
        '../../../views/main/MointoringMatters/BudgetAccountingWarningDataMager/BudgetAccountingWarningDataMager.vue'
      )
  },
  // 预警数据批量处理
  {
    path: '/BudgetAccountingWarningBatchManage',
    name: 'BudgetAccountingWarningBatchManage',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () =>
      import(
        '../../../views/main/MointoringMatters/BudgetAccountingWarningDataMager/BudgetAccountingWarningBatchManage.vue'
      )
  },
  // 单位核算预警数据管理
  {
    path: '/AgencyBusinessAccountingWarningDataMager',
    name: 'AgencyBusinessAccountingWarningDataMager',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () =>
      import(
        '../../../views/main/MointoringMatters/AgencyBusinessAccountingWarningDataMager/AgencyBusinessAccountingWarningDataMager.vue'
      )
  },
  // 支付j监控规则
  {
    path: '/PayMonitorRulesMager',
    name: 'PayMonitorRulesMager',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () =>
      import(
        '../../../views/main/MointoringMatters/PayMonitorRulesMager/PayMonitorRulesMager.vue'
      )
  },
  // 统计分析报表（按区划）
  {
    path: '/StatisticalFormsByCompartment',
    name: 'StatisticalFormsByCompartment',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () =>
      import(
        '../../../views/main/MointoringMatters/StatisticalFormsByCompartment/StatisticalFormsByCompartment.vue'
      )
  },
  {
    path: '/statisticalFormsByCompartmentByZh',
    name: 'statisticalFormsByCompartmentByZh',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () =>
      import(
        '../../../views/main/MointoringMatters/StatisticalFormsByCompartment/StatisticalFormsByCompartment.vue'
      )
  },
  {
    path: '/SXstatisticalFormsByCompartmentByZh',
    name: 'SXstatisticalFormsByCompartmentByZh',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () =>
      import(
        '../../../views/main/MointoringMatters/StatisticalFormsByCompartment/StatisticalFormsByCompartment.vue'
      )
  },
  {
    path: '/StatisticalFormsByCompartmentByPay',
    name: 'StatisticalFormsByCompartmentByPay',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () =>
      import(
        '../../../views/main/MointoringMatters/StatisticalFormsByCompartment/StatisticalFormsByCompartment.vue'
      )
  },
  {
    path: '/SXStatisticalFormsByCompartmentByPay',
    name: 'SXStatisticalFormsByCompartmentByPay',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () =>
      import(
        '../../../views/main/MointoringMatters/StatisticalFormsByCompartment/StatisticalFormsByCompartment.vue'
      )
  },
  // 统计分析报表（按规则）
  {
    path: '/StatisticalFormsByRule',
    name: 'StatisticalFormsByRule',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () =>
      import(
        '../../../views/main/MointoringMatters/StatisticalFormsByRule/StatisticalFormsByRule.vue'
      )
  },
  {
    path: '/StatisticalFormsByRuleByPay',
    name: 'StatisticalFormsByRuleByPay',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () => import('../../../views/main/MointoringMatters/StatisticalFormsByRule/StatisticalFormsByRule.vue')
  },
  {
    path: '/SXStatisticalFormsByRuleByPay',
    name: 'SXStatisticalFormsByRuleByPay',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () => import('../../../views/main/MointoringMatters/StatisticalFormsByRule/StatisticalFormsByRule.vue')
  },
  // 转移支付-统计分析报表（按预警级别）
  {
    path: '/StatisticalFormsByRankByPay',
    name: 'StatisticalFormsByRankByPay',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () =>
      import(
        '../../../views/main/MointoringMatters/StatisticalFormsByRank/StatisticalFormsByRank.vue'
      )
  },
  // 转移支付-统计分析报表（按预警级别）
  {
    path: '/SXStatisticalFormsByRankByPay',
    name: 'SXStatisticalFormsByRankByPay',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () =>
      import(
        '../../../views/main/MointoringMatters/StatisticalFormsByRank/StatisticalFormsByRank.vue'
      )
  },
  {
    path: '/StatisticalFormsByRuleByZh',
    name: 'StatisticalFormsByRuleByZh',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () => import('../../../views/main/MointoringMatters/StatisticalFormsByRule/StatisticalFormsByRule.vue')
  },
  {
    path: '/SXStatisticalFormsByRuleByZh',
    name: 'SXStatisticalFormsByRuleByZh',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () => import('../../../views/main/MointoringMatters/StatisticalFormsByRule/StatisticalFormsByRule.vue')
  },
  // 统计分析报表（按预警级别）
  {
    path: '/StatisticalFormsByRank',
    name: 'StatisticalFormsByRank',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () =>
      import(
        '../../../views/main/MointoringMatters/StatisticalFormsByRank/StatisticalFormsByRank.vue'
      )
  },
  {
    path: '/StatisticalFormsByRankByZh',
    name: 'StatisticalFormsByRankByZh',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () =>
      import(
        '../../../views/main/MointoringMatters/StatisticalFormsByRank/StatisticalFormsByRank.vue'
      )
  },
  {
    path: '/SXStatisticalFormsByRankByZh',
    name: 'SXStatisticalFormsByRankByZh',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () =>
      import(
        '../../../views/main/MointoringMatters/StatisticalFormsByRank/StatisticalFormsByRank.vue'
      )
  },
  // 预警明细查询（按规则）
  {
    path: '/WarningDetailsByRule',
    name: 'WarningDetailsByRule',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () =>
      import(
        '../../../views/main/MointoringMatters/WarningDetailsByRule/WarningDetailsByRule.vue'
      )
  },
  {
    path: '/warningDetailsByRuleByZh',
    name: 'warningDetailsByRuleByZh',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () =>
      import(
        '../../../views/main/MointoringMatters/WarningDetailsByRule/WarningDetailsByRule.vue'
      )
  },
  {
    path: '/SXwarningDetailsByRuleByZh',
    name: 'SXwarningDetailsByRuleByZh',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () =>
      import(
        '../../../views/main/MointoringMatters/WarningDetailsByRule/WarningDetailsByRule.vue'
      )
  },
  {
    path: '/WarningDetailsByRuleByPay',
    name: 'WarningDetailsByRuleByPay',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () => import('../../../views/main/MointoringMatters/WarningDetailsByRule/WarningDetailsByRule.vue')
  },
  {
    path: '/SXWarningDetailsByRuleByPay',
    name: 'SXWarningDetailsByRuleByPay',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () => import('../../../views/main/MointoringMatters/WarningDetailsByRule/WarningDetailsByRule.vue')
  },
  // 预警明细查询（按区划）
  {
    path: '/WarningDetailsByCompartment',
    name: 'WarningDetailsByCompartment',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () =>
      import(
        '../../../views/main/MointoringMatters/WarningDetailsByCompartment/WarningDetailsByCompartment.vue'
      )
  },
  // 会计核算-统计分析报表（按区划）
  {
    path: '/StatisticalFormsByCompartmentHs',
    name: 'StatisticalFormsByCompartmentHs',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () =>
      import(
        '../../../views/main/MointoringMatters/StatisticalFormsByCompartment/StatisticalFormsByCompartment.vue'
      )
  },
  // 会计核算-统计分析报表（按规则）
  {
    path: '/StatisticalFormsByRuleHs',
    name: 'StatisticalFormsByRuleHs',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () =>
      import(
        '../../../views/main/MointoringMatters/StatisticalFormsByRule/StatisticalFormsByRule.vue'
      )
  },
  {
    path: '/StatisticalFormsByRuleBgt',
    name: 'StatisticalFormsByRuleBgt',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () => import('../../../views/main/MointoringMatters/StatisticalFormsByRule/StatisticalFormsByRule.vue')
  },
  // 会计核算-统计分析报表（按预警级别）
  {
    path: '/StatisticalFormsByRankHs',
    name: 'StatisticalFormsByRankHs',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () =>
      import(
        '../../../views/main/MointoringMatters/StatisticalFormsByRank/StatisticalFormsByRank.vue'
      )
  },
  // 会计核算-预警明细查询（按规则）
  {
    path: '/WarningDetailsByRuleHs',
    name: 'WarningDetailsByRuleHs',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () =>
      import(
        '../../../views/main/MointoringMatters/WarningDetailsByRule/WarningDetailsByRule.vue'
      )
  },
  // 会计核算-预警明细查询（按区划）
  {
    path: '/WarningDetailsByCompartmentHs',
    name: 'WarningDetailsByCompartmentHs',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () =>
      import(
        '../../../views/main/MointoringMatters/WarningDetailsByCompartment/WarningDetailsByCompartment.vue'
      )
  },
  // 枚举值设置
  {
    path: '/enumerationSet',
    name: 'enumerationSet',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () =>
      import(
        '../../../views/main/MointoringMatters/EnumerationSet/EnumerationSet.vue'
      )
  },
  // 预警明细查询（按规则）
  {
    path: '/WarningDetailsByRuleAll',
    name: 'WarningDetailsByRuleAll',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () =>
      import(
        '../../../views/main/MointoringMatters/WarningDetailsByRule/WarningDetailsByRule.vue'
      )
  },
  // 预警明细查询（按区划）
  {
    path: '/WarningDetailsByCompartmentAll',
    name: 'WarningDetailsByCompartmentAll',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () =>
      import(
        '../../../views/main/MointoringMatters/WarningDetailsByCompartment/WarningDetailsByCompartment.vue'
      )
  },
  // 监控主题分析（按区划）
  {
    path: '/MonitorThemeByCompartment',
    name: 'MonitorThemeByCompartment',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () =>
      import(
        '../../../views/main/MointoringMatters/MonitorThemeByCompartment/MonitorThemeByCompartment.vue'
      )
  },
  // 监控主题分析（按规则）
  {
    path: '/MonitorThemeByRule',
    name: 'MonitorThemeByRule',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () =>
      import(
        '../../../views/main/MointoringMatters/MonitorThemeByRule/MonitorThemeByRule.vue'
      )
  },
  // 监控主题分析（按预警级别）
  {
    path: '/MonitorThemeByRank',
    name: 'MonitorThemeByRank',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () =>
      import(
        '../../../views/main/MointoringMatters/MonitorThemeByRank/MonitorThemeByRank.vue'
      )
  },
  // 问询函生成
  {
    path: '/InquiryLetterCreate',
    name: 'InquiryLetterCreate',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () =>
      import(
        '../../../views/main/MointoringMatters/InquiryLetterCreate/InquiryLetterCreate.vue'
      )
  },
  // 问询函复核
  {
    path: '/InquiryLetterReview',
    name: 'InquiryLetterReview',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () =>
      import(
        '../../../views/main/MointoringMatters/InquiryLetterReview/InquiryLetterReview.vue'
      )
  },
  // 问询函回复（单位）
  {
    path: '/InquiryLetterReplyByAgency',
    name: 'InquiryLetterReplyByAgency',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () =>
      import(
        '../../../views/main/MointoringMatters/InquiryLetterReplyByAgency/InquiryLetterReplyByAgency.vue'
      )
  },
  // 问询函回复（财政）
  {
    path: '/InquiryLetterReplyByFinance',
    name: 'InquiryLetterReplyByFinance',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () =>
      import(
        '../../../views/main/MointoringMatters/InquiryLetterReplyByFinance/InquiryLetterReplyByFinance.vue'
      )
  },
  // 问询函备案
  {
    path: '/InquiryLetterRecords',
    name: 'InquiryLetterRecords',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () =>
      import(
        '../../../views/main/MointoringMatters/InquiryLetterRecords/InquiryLetterRecords.vue'
      )
  },
  // 问询函生成
  {
    path: '/InquiryLetterCreateBySpe',
    name: 'InquiryLetterCreateBySpe',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () =>
      import(
        '../../../views/main/MointoringMatters/InquiryLetterCreate/InquiryLetterCreate.vue'
      )
  },
  // 问询函复核
  {
    path: '/InquiryLetterReviewBySpe',
    name: 'InquiryLetterReviewBySpe',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () =>
      import(
        '../../../views/main/MointoringMatters/InquiryLetterReview/InquiryLetterReview.vue'
      )
  },
  // 问询函回复（单位）
  {
    path: '/InquiryLetterReplyByAgencyBySpe',
    name: 'InquiryLetterReplyByAgencyBySpe',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () =>
      import(
        '../../../views/main/MointoringMatters/InquiryLetterReplyByAgency/InquiryLetterReplyByAgency.vue'
      )
  },
  // 问询函回复（财政）
  {
    path: '/InquiryLetterReplyByFinanceBySpe',
    name: 'InquiryLetterReplyByFinanceBySpe',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () =>
      import(
        '../../../views/main/MointoringMatters/InquiryLetterReplyByFinance/InquiryLetterReplyByFinance.vue'
      )
  },
  // 问询函备案
  {
    path: '/InquiryLetterRecordsBySpe',
    name: 'InquiryLetterRecordsBySpe',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () =>
      import(
        '../../../views/main/MointoringMatters/InquiryLetterRecords/InquiryLetterRecords.vue'
      )
  },
  // 财政画像
  {
    path: '/financialPortrayal',
    name: 'FinancialPortrayal',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () => import('../../../views/main/financial-portrayal/index.vue')
  },
  // 预警总览
  {
    path: '/warningOverview',
    name: 'WarningOverview',
    meta: {
      requireAuth: true
    },
    component: () => import('@/views/main/warningOverview/index.vue')
  },
  // 主题分析
  {
    path: '/subjectAnalysis',
    name: 'SubjectAnalysis',
    meta: {
      requireAuth: true
    },
    component: () => import('@/views/main/subjectAnalysis/index.vue')
  },
  {
    path: '/threeGuaranteesExpenditure',
    name: 'ThreeGuaranteesExpenditure',
    meta: {
      title: '“三保”支出监控总览',
      requireAuth: true
    },
    component: () =>
      import('@/views/px-to-vw-page/threeGuaranteesExpenditure/index.vue')
  },
  {
    path: '/threePublicExpenses',
    name: 'ThreePublicExpenses',
    meta: {
      title: '“三公”经费监控总览',
      requireAuth: true
    },
    component: () =>
      import('@/views/px-to-vw-page/threePublicExpenses/index.vue')
  },
  // 监控报告生成
  {
    path: '/MonitoeReportCreate',
    name: 'MonitoeReportCreate',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () =>
      import(
        '../../../views/main/MointoringMatters/MonitoeReportCreate/MonitoeReportCreate.vue'
      )
  },
  // 监控报告查看
  {
    path: '/MonitoeReportQuery',
    name: 'MonitoeReportQuery',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () =>
      import(
        '../../../views/main/MointoringMatters/MonitoeReportQuery/MonitoeReportQuery.vue'
      )
  },
  // 基础资料库维护
  {
    path: '/BasicDatabaseMaintenance',
    name: 'BasicDatabaseMaintenance',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () =>
      import(
        '../../../views/main/MointoringMatters/BasicDatabaseMaintenance/BasicDatabaseMaintenance.vue'
      )
  },
  // 上下级对账管理
  {
    path: '/checkPayBill',
    name: 'checkPayBill',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () =>
      import(
        '../../../views/main/MointoringMatters/CheckPayBill/CheckPayBill.vue'
      )
  },
  // 财政运行基础表录入
  {
    path: '/FinancialBasicTableEntry',
    name: 'FinancialBasicTableEntry',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () =>
      import(
        '../../../views/main/MointoringMatters/FinancialBasicTableEntry/FinancialBasicTableEntry.vue'
      )
  },
  {
    path: '/StatisticalFormsByRuleSpe',
    name: 'StatisticalFormsByRuleSpe',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () =>
      import(
        '../../../views/main/MointoringMatters/StatisticalFormsByRule/StatisticalFormsByRule.vue'
      )
  },
  // 统计分析报表（按预警级别） 专项
  {
    path: '/StatisticalFormsByRankSpe',
    name: 'StatisticalFormsByRankSpe',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () =>
      import(
        '../../../views/main/MointoringMatters/StatisticalFormsByRank/StatisticalFormsByRank.vue'
      )
  },
  // 预警明细查询（按规则）
  {
    path: '/WarningDetailsByRuleSpe',
    name: 'WarningDetailsByRuleSpe',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () =>
      import(
        '../../../views/main/MointoringMatters/WarningDetailsByRule/WarningDetailsByRule.vue'
      )
  },
  // 预警明细查询（按区划）
  {
    path: '/WarningDetailsByCompartmentSpe',
    name: 'WarningDetailsByCompartmentSpe',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () =>
      import(
        '../../../views/main/MointoringMatters/WarningDetailsByCompartment/WarningDetailsByCompartment.vue'
      )
  },
  {
    path: '/BgtPaySummary',
    name: 'BgtPaySummary',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () =>
      import(
        '../../../views/main/MointoringMatters/ThreeGuarantees/BgtPaySummary.vue'
      )
  },
  // 高风险县
  {
    path: '/HighRiskCounty',
    name: 'HighRiskCounty',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () =>
      import(
        '../../../views/main/MointoringMatters/HighRiskCounty/HighRiskCounty.vue'
      )
  }, // 三保-科目配置
  {
    path: '/ProjectConf',
    name: 'ProjectConf',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () =>
      import(
        '../../../views/main/MointoringMatters/ProjectConf/ProjectConf.vue'
      )
  }, // 库款保障水平预警表（按日）
  {
    path: '/TreasuryGuaranteeLevWarnDay',
    name: 'TreasuryGuaranteeLevWarnDay',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () =>
      import(
        '../../../views/main/MointoringMatters/TreasuryGuaranteeLevWarn/TreasuryGuaranteeLevWarnDay.vue'
      )
  },
  // 库款保障水平预警表（按月）
  {
    path: '/TreasuryGuaranteeLevWarnMonth',
    name: 'TreasuryGuaranteeLevWarnMonth',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () =>
      import(
        '../../../views/main/MointoringMatters/TreasuryGuaranteeLevWarn/TreasuryGuaranteeLevWarnMonth.vue'
      )
  },
  // 三保监控报告生成
  {
    path: '/sanBaoMonitoeReportCreate',
    name: 'sanBaoMonitoeReportCreate',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () =>
      import(
        '../../../views/main/MointoringMatters/MonitoeReportCreate/sanBaoMonitoeReportCreate.vue'
      )
  }, // “三公”风险预警表
  // 专项监控报告生成
  {
    path: '/SpeProMonitoeReportCreate',
    name: 'SpeProMonitoeReportCreate',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () => import('@/views/main/MointoringMatters/MonitoeReportCreate/SpeProMonitoeReportCreate.vue')
  },
  {
    path: '/ThrExpReportRiskWarn',
    name: 'ThrExpReportRiskWarn',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () =>
      import(
        '../../../views/main/MointoringMatters/ThrExpReport/ThrExpReportRiskWarn.vue'
      )
  },
  // “三公”执行情况表
  {
    path: '/ThrExpReportImplementation',
    name: 'ThrExpReportImplementation',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () =>
      import(
        '../../../views/main/MointoringMatters/ThrExpReport/ThrExpReportImplementation.vue'
      )
  },
  // “三公”经费监测表
  {
    path: '/ThrExpReportFundMonitor',
    name: 'ThrExpReportFundMonitor',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () =>
      import(
        '../../../views/main/MointoringMatters/ThrExpReport/ThrExpReportFundMonitor.vue'
      )
  },
  // “三公”经费监测表
  {
    path: '/sangongVoucher',
    name: 'sangongVoucher',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () =>
      import(
        '../../../views/main/MointoringMatters/ThrExpReport/sangongVoucher.vue'
      )
  },
  {
    path: '/threePublicExpensesTableEntry',
    name: 'threePublicExpensesTableEntry',
    meta: {
      title: '“三公”经费月报明细表'
    },
    component: () =>
      import(
        '@/views/main/MointoringMatters/threePublicExpensesTableEntry/index.vue'
      )
  }, // 三公监控报告生成
  {
    path: '/sanGongMonitoeReportCreate',
    name: 'sanGongMonitoeReportCreate',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () =>
      import(
        '../../../views/main/MointoringMatters/MonitoeReportCreate/sanGongMonitoeReportCreate.vue'
      )
  },
  // 统计分析报表（按区划）
  {
    path: '/sangongStatisticalFormsByCompartment',
    name: 'sangongStatisticalFormsByCompartment',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () =>
      import(
        '../../../views/main/MointoringMatters/StatisticalFormsByCompartment/StatisticalFormsByCompartment.vue'
      )
  },
  // 三公统计分析报表（按规则）
  {
    path: '/sangongStatisticalFormsByRule',
    name: 'sangongStatisticalFormsByRule',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () =>
      import(
        '../../../views/main/MointoringMatters/StatisticalFormsByRule/StatisticalFormsByRule.vue'
      )
  },
  {
    path: '/SpeStatisticalFormsByRule',
    name: 'SpeStatisticalFormsByRule',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () => import('../../../views/main/MointoringMatters/StatisticalFormsByRule/StatisticalFormsByRule.vue')
  },
  {
    path: '/SpeStatisticalFormsByRank',
    name: 'SpeStatisticalFormsByRank',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () => import('../../../views/main/MointoringMatters/StatisticalFormsByRank/StatisticalFormsByRank.vue')
  },
  {
    path: '/SXSpeStatisticalFormsByRank',
    name: 'SXSpeStatisticalFormsByRank',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () => import('../../../views/main/MointoringMatters/StatisticalFormsByRank/StatisticalFormsByRank.vue')
  },
  // 三公统计分析报表（按预警级别）
  {
    path: '/sangongStatisticalFormsByRank',
    name: 'sangongStatisticalFormsByRank',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () =>
      import(
        '../../../views/main/MointoringMatters/StatisticalFormsByRank/StatisticalFormsByRank.vue'
      )
  },
  // 陕西部分菜单单独分离出一个
  {
    path: '/SXStatisticalFormsByRank',
    name: 'SXStatisticalFormsByRank',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () => import('../../../views/main/MointoringMatters/StatisticalFormsByRank/StatisticalFormsByRank.vue')
  },
  {
    path: '/SXsangongWarningDetailsByRule',
    name: 'SXsangongWarningDetailsByRule',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () => import('../../../views/main/MointoringMatters/WarningDetailsByRule/WarningDetailsByRule.vue')
  },
  {
    path: '/SXsangongStatisticalFormsByRule',
    name: 'SXsangongStatisticalFormsByRule',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () => import('../../../views/main/MointoringMatters/StatisticalFormsByRule/StatisticalFormsByRule.vue')
  },
  {
    path: '/SXsangongStatisticalFormsByRank',
    name: 'SXsangongStatisticalFormsByRank',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () => import('../../../views/main/MointoringMatters/StatisticalFormsByRank/StatisticalFormsByRank.vue')
  },
  {
    path: '/SXsangongStatisticalFormsByCompartment',
    name: 'SXsangongStatisticalFormsByCompartment',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () => import('../../../views/main/MointoringMatters/StatisticalFormsByCompartment/StatisticalFormsByCompartment.vue')
  },
  {
    path: '/SXStatisticalFormsByRankBgt',
    name: 'SXStatisticalFormsByRankBgt',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () => import('../../../views/main/MointoringMatters/StatisticalFormsByRank/StatisticalFormsByRank.vue')
  },
  {
    path: '/SXStatisticalFormsByRankHs',
    name: 'SXStatisticalFormsByRankHs',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () => import('../../../views/main/MointoringMatters/StatisticalFormsByRank/StatisticalFormsByRank.vue')
  },
  {
    path: '/SXStatisticalFormsByRuleBgt',
    name: 'SXStatisticalFormsByRuleBgt',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () => import('../../../views/main/MointoringMatters/StatisticalFormsByRule/StatisticalFormsByRule.vue')
  },
  {
    path: '/SXStatisticalFormsByRuleHs',
    name: 'SXStatisticalFormsByRuleHs',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () => import('../../../views/main/MointoringMatters/StatisticalFormsByRule/StatisticalFormsByRule.vue')
  },
  {
    path: '/SXStatisticalFormsByCompartmentBgt',
    name: 'SXStatisticalFormsByCompartmentBgt',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () => import('../../../views/main/MointoringMatters/StatisticalFormsByCompartment/StatisticalFormsByCompartment.vue')
  },
  {
    path: '/SXStatisticalFormsByCompartmentHs',
    name: 'SXStatisticalFormsByCompartmentHs',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () => import('../../../views/main/MointoringMatters/StatisticalFormsByCompartment/StatisticalFormsByCompartment.vue')
  },
  {
    path: '/SXStatisticalFormsByCompartment',
    name: 'SXStatisticalFormsByCompartment',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () => import('../../../views/main/MointoringMatters/StatisticalFormsByCompartment/StatisticalFormsByCompartment.vue')
  },
  // 陕西部分菜单单独分离出一个
  {
    path: '/SXStatisticalFormsByRule',
    name: 'SXStatisticalFormsByRule',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () => import('../../../views/main/MointoringMatters/StatisticalFormsByRule/StatisticalFormsByRule.vue')
  },
  // 陕西部分菜单单独分离出一个
  {
    path: '/SXMonitorThemeByCompartment',
    name: 'SXMonitorThemeByCompartment',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () => import('../../../views/main/MointoringMatters/MonitorThemeByCompartment/MonitorThemeByCompartment.vue')
  },
  // 三公预警明细查询（按规则）
  {
    path: '/sangongWarningDetailsByRule',
    name: 'sangongWarningDetailsByRule',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () => import('../../../views/main/MointoringMatters/WarningDetailsByRule/WarningDetailsByRule.vue')
  },
  {
    path: '/ProjectLifecycle',
    name: 'ProjectLifecycle',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () => import('@/views/main/MointoringMatters/ProjectLifecycle/ProjectLifecycle.vue')
  },
  {
    path: '/TemplatelibraryManager',
    name: 'TemplatelibraryManager',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () => import('../../../views/main/MointoringMatters/TemplatelibraryManager/TemplatelibraryManager.vue')
  },
  // 动态监控情况报告
  {
    path: '/dynamicMonitoeReportCreate',
    name: 'dynamicMonitoeReportCreate',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () => import('@/views/main/MointoringMatters/MonitoeReportCreate/dynamicMonitoeReportCreate.vue')
  },
  // 监控主题分析（按区划+预警级别）
  {
    path: '/MonitorThemeByCompartmentAndWarn',
    name: 'MonitorThemeByCompartmentAndWarn',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () => import('@/views/main/MointoringMatters/StatisticalFormsByCompartment/StatisticalFormsByCompartment.vue')
  },
  {
    path: '/SpeStatisticalFormsByCompartment',
    name: 'SpeStatisticalFormsByCompartment',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () => import('../../../views/main/MointoringMatters/StatisticalFormsByCompartment/StatisticalFormsByCompartment.vue')
  },
  // 专项预警级别+区划全辖菜单
  {
    path: '/SXSpeStatisticalFormsByCompartment',
    name: 'SXSpeStatisticalFormsByCompartment',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () => import('../../../views/main/MointoringMatters/StatisticalFormsByCompartment/StatisticalFormsByCompartment.vue')
  },
  {
    path: '/SXWarningDetailsByRuleBgt',
    name: 'SXWarningDetailsByRuleBgt',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () => import('../../../views/main/MointoringMatters/WarningDetailsByRule/WarningDetailsByRule.vue')
  },
  // 陕西部分菜单单独分离出一个
  {
    path: '/SXWarningDetailsByRule',
    name: 'SXWarningDetailsByRule',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () => import('../../../views/main/MointoringMatters/WarningDetailsByRule/WarningDetailsByRule.vue')
  },
  // 陕西部分菜单单独分离出一个
  {
    path: '/SXWarningDetailsByRuleAll',
    name: 'SXWarningDetailsByRuleAll',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () => import('../../../views/main/MointoringMatters/WarningDetailsByRule/WarningDetailsByRule.vue')
  },
  // 陕西部分菜单单独分离出一个
  {
    path: '/SXMonitorThemeByRule',
    name: 'SXMonitorThemeByRule',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () => import('../../../views/main/MointoringMatters/MonitorThemeByRule/MonitorThemeByRule.vue')
  },
  // 财政运行基础表列表
  {
    path: '/FinancialBasicTableEntryList',
    name: 'FinancialBasicTableEntryList',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () => import('../../../views/main/MointoringMatters/FinancialBasicTableEntry/index.vue')
  },
  {
    path: '/SXMonitorThemeByCompartmentAndWarn',
    name: 'SXMonitorThemeByCompartmentAndWarn',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () => import('../../../views/main/MointoringMatters/StatisticalFormsByCompartment/StatisticalFormsByCompartment.vue')
  },
  // 陕西部分菜单单独分离出一个
  {
    path: '/SXMonitorThemeByRank',
    name: 'SXMonitorThemeByRank',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () => import('../../../views/main/MointoringMatters/MonitorThemeByRank/MonitorThemeByRank.vue')
  },
  // 预警明细查询（按规则）
  {
    path: '/WarningDetailsByRuleAllSpe',
    name: 'WarningDetailsByRuleAllSpe',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () => import('../../../views/main/MointoringMatters/WarningDetailsByRule/WarningDetailsByRule.vue')
  },
  // 直达资金监控
  {
    path: '/directFundsCreate',
    name: 'directFundsCreate',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () => import('../../../views/main/MointoringMatters/MonitoeReportCreate/sanBaoMonitoeReportCreate.vue')
  },
  {
    path: '/SXWarningDetailsByRuleAllSpe',
    name: 'SXWarningDetailsByRuleAllSpe',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () => import('../../../views/main/MointoringMatters/WarningDetailsByRule/WarningDetailsByRule.vue')
  },
  {
    path: '/SXSpeStatisticalFormsByRule',
    name: 'SXSpeStatisticalFormsByRule',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () => import('../../../views/main/MointoringMatters/StatisticalFormsByRule/StatisticalFormsByRule.vue')
  },
  {
    path: '/StatisticalFormsByCompartmentBgt',
    name: 'StatisticalFormsByCompartmentBgt',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () => import('../../../views/main/MointoringMatters/StatisticalFormsByCompartment/StatisticalFormsByCompartment.vue')
  },
  // 三保 统计分析查询（区划+预警级别）
  {
    path: '/sangbaoStatisticalFormsByCompartment',
    name: 'sangbaoStatisticalFormsByCompartment',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () =>
      import(
        '../../../views/main/MointoringMatters/StatisticalFormsByCompartment/StatisticalFormsByCompartment.vue'
      )
  },
  // 三保 统计分析查询（区划+预警级别）
  {
    path: '/SXsangbaoStatisticalFormsByCompartment',
    name: 'SXsangbaoStatisticalFormsByCompartment',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () =>
      import(
        '../../../views/main/MointoringMatters/StatisticalFormsByCompartment/StatisticalFormsByCompartment.vue'
      )
  },
  // 三保 统计分析查询（规则+区划）
  {
    path: '/sangbaoStatisticalFormsByRule',
    name: 'sangbaoStatisticalFormsByRule',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () => import('../../../views/main/MointoringMatters/StatisticalFormsByRule/StatisticalFormsByRule.vue')
  },
  // 三保 统计分析查询（规则+区划） 全辖
  {
    path: '/SXsangbaoStatisticalFormsByRule',
    name: 'SXsangbaoStatisticalFormsByRule',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () => import('../../../views/main/MointoringMatters/StatisticalFormsByRule/StatisticalFormsByRule.vue')
  },
  // 三保 统计分析报表（规则+预警级别）
  {
    path: '/sangbaoStatisticalFormsByRank',
    name: 'sangbaoStatisticalFormsByRank',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () =>
      import(
        '../../../views/main/MointoringMatters/StatisticalFormsByRank/StatisticalFormsByRank.vue'
      )
  },
  // 三保 统计分析报表（规则+预警级别） 全辖
  {
    path: '/SXsangbaoStatisticalFormsByRank',
    name: 'SXsangbaoStatisticalFormsByRank',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () =>
      import(
        '../../../views/main/MointoringMatters/StatisticalFormsByRank/StatisticalFormsByRank.vue'
      )
  },
  // 三保 预警明细查询
  {
    path: '/sangbaoWarningDetailsByRule',
    name: 'sangbaoWarningDetailsByRule',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () => import('../../../views/main/MointoringMatters/WarningDetailsByRule/WarningDetailsByRule.vue')
  },
  // 三保 预警明细查询 全辖
  {
    path: '/SXsangbaoWarningDetailsByRule',
    name: 'SXsangbaoWarningDetailsByRule',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () => import('../../../views/main/MointoringMatters/WarningDetailsByRule/WarningDetailsByRule.vue')
  }
]
