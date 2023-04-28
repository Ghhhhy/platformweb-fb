export default [
  // 政策法规管理
  {
    path: '/PoliciesAndRegulationsManagement',
    name: 'PoliciesAndRegulationsManagement',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () => import('../../../views/main/MointoringMatters/PoliciesAndRegulationsManagement/PoliciesAndRegulationsManagement.vue')
  },
  // 政策法规查询
  {
    path: '/PoliciesAndRegulationsSelect',
    name: 'PoliciesAndRegulationsSelect',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () => import('../../../views/main/MointoringMatters/PoliciesAndRegulationsManagement/PoliciesAndRegulationsManagement.vue')
  },
  // 监控规则函数管理
  {
    path: '/MonitoringRuleFunctionManagement',
    name: 'MonitoringRuleFunctionManagement',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () => import('../../../views/main/MointoringMatters/MonitoringRuleFunctionManagement/MonitoringRuleFunctionManagement.vue')
  },
  // 监控事项申报-部门
  {
    path: '/DeclarationOfMonitoringItemsDepartment',
    name: 'DeclarationOfMonitoringItemsDepartment',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () => import('../../../views/main/MointoringMatters/DeclarationOfMonitoringItemsDepartment/DeclarationOfMonitoringItemsDepartment.vue')
  },
  // 监控事项申报-财政
  {
    path: '/DeclarationOfMonitoringItemsFinance',
    name: 'DeclarationOfMonitoringItemsFinance',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () => import('../../../views/main/MointoringMatters/DeclarationOfMonitoringItemsFinance/DeclarationOfMonitoringItemsFinance.vue')
  },
  // 监控事项申报-监控
  {
    path: '/DeclarationOfMonitoringItemsMonitor',
    name: 'DeclarationOfMonitoringItemsMonitor',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () => import('../../../views/main/MointoringMatters/DeclarationOfMonitoringItemsMonitor/DeclarationOfMonitoringItemsMonitor.vue')
  },
  // 监控事项审核-财政
  {
    path: '/DeclarationOfMonitoringItemsFlowFinance',
    name: 'DeclarationOfMonitoringItemsFlowFinance',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () => import('../../../views/main/MointoringMatters/DeclarationOfMonitoringItemsFlowFinance/DeclarationOfMonitoringItemsFlowFinance.vue')
  },
  // 监控事项审核-监控
  {
    path: '/DeclarationOfMonitoringItemsFlowMonitor',
    name: 'DeclarationOfMonitoringItemsFlowMonitor',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () => import('../../../views/main/MointoringMatters/DeclarationOfMonitoringItemsFlowMonitor/DeclarationOfMonitoringItemsFlowMonitor.vue')
  },
  // 监控事项批复
  {
    path: '/ApprovalOfMonitoringMatters',
    name: 'ApprovalOfMonitoringMatters',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () => import('../../../views/main/MointoringMatters/ApprovalOfMonitoringMatters/ApprovalOfMonitoringMatters.vue')
  },
  // 监控事项查看
  {
    path: '/ApprovalOfMonitoringSelectMatters',
    name: 'ApprovalOfMonitoringSelectMatters',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () => import('../../../views/main/MointoringMatters/ApprovalOfMonitoringMatters/ApprovalOfMonitoringMatters.vue')
  },
  // 监控规则模板库管理
  {
    path: '/MonitoringRuleTemplateLibraryManagement',
    name: 'MonitoringRuleTemplateLibraryManagement',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () => import('../../../views/main/MointoringMatters/MonitoringRuleTemplateLibraryManagement/MonitoringRuleTemplateLibraryManagement.vue')
  },
  // 系统级规则管理
  {
    path: '/SystemLevelRules',
    name: 'SystemLevelRules',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () => import('../../../views/main/MointoringMatters/SystemLevelRules/SystemLevelRules.vue')
  },
  {
    path: '/SystemLevelRulesBySpe',
    name: 'SystemLevelRulesBySpe',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () => import('../../../views/main/MointoringMatters/SystemLevelRules/SystemLevelRules.vue')
  },
  // 系统级规则审核
  {
    path: '/SystemLevelRulesFlow',
    name: 'SystemLevelRulesFlow',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () => import('../../../views/main/MointoringMatters/SystemLevelRulesFlow/SystemLevelRulesFlow.vue')
  },
  // 财政级规则管理
  {
    path: '/FinanceLevelRules',
    name: 'FinanceLevelRules',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () => import('../../../views/main/MointoringMatters/SystemLevelRules/SystemLevelRules.vue')
  },
  // 财政级规则审核
  {
    path: '/FinanceLevelRulesFlow',
    name: 'FinanceLevelRulesFlow',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () => import('../../../views/main/MointoringMatters/SystemLevelRulesFlow/SystemLevelRulesFlow.vue')
  },
  // 部门级规则管理
  {
    path: '/DepartmentLevelRules',
    name: 'DepartmentLevelRules',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () => import('../../../views/main/MointoringMatters/SystemLevelRules/SystemLevelRules.vue')
  },
  // 部门级规则审核
  {
    path: '/DepartmentLevelRulesFlow',
    name: 'DepartmentLevelRulesFlow',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () => import('../../../views/main/MointoringMatters/SystemLevelRulesFlow/SystemLevelRulesFlow.vue')
  },
  // 监控规则查看
  {
    path: '/MonitorRulesView',
    name: 'MonitorRulesView',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () => import('../../../views/main/MointoringMatters/MonitorRulesView/MonitorRulesView.vue')
  },
  // 直达监控规则查看
  {
    path: '/MonitorRulesViewZD',
    name: 'MonitorRulesViewZD',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () => import('../../../views/main/MointoringMatters/MonitorRulesView/MonitorRulesView.vue')
  },
  {
    path: '/MonitorRulesViewFJ',
    name: 'MonitorRulesViewFJ',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () => import('../../../views/main/MointoringMatters/MonitorRulesViewFJ/MonitorRulesViewFJ.vue')
  },
  // 专项监控规则查看
  {
    path: '/MonitorRulesViewSpecial',
    name: 'MonitorRulesViewSpecial',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () => import('../../../views/main/MointoringMatters/MonitorRulesViewSpecial/MonitorRulesViewSpecial.vue')
  },
  // 同户名转账统计
  {
    path: '/SameNameTransferStatistics',
    name: 'SameNameTransferStatistics',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () => import('../../../views/main/MointoringMatters/BudgetImplementWarningDataMager/BudgetImplementWarningDataMager.vue')
  },
  // 其他监控统计
  {
    path: '/OtherMonitoringStatistics',
    name: 'OtherMonitoringStatistics',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () => import('../../../views/main/MointoringMatters/BudgetImplementWarningDataMager/BudgetImplementWarningDataMager.vue')
  },
  // 流程督办监控统计
  {
    path: '/ProcessSupervisionAndMonitoringStatistics',
    name: 'ProcessSupervisionAndMonitoringStatistics',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () => import('../../../views/main/MointoringMatters/BudgetImplementWarningDataMager/BudgetImplementWarningDataMager.vue')
  },
  // 超出大额支付统计
  {
    path: '/BudgetImplementWarningDataMager',
    name: 'BudgetImplementWarningDataMager',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () => import('../../../views/main/MointoringMatters/BudgetImplementWarningDataMager/BudgetImplementWarningDataMager.vue')
  },
  // 资金用途使用不规范统计
  {
    path: '/NonStandardStatisticsOfUse',
    name: 'NonStandardStatisticsOfUse',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () => import('../../../views/main/MointoringMatters/BudgetImplementWarningDataMager/BudgetImplementWarningDataMager.vue')
  },
  // 支出不规范统计
  {
    path: '/ExpenditureStatisticsAreNotStandardized',
    name: 'ExpenditureStatisticsAreNotStandardized',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () => import('../../../views/main/MointoringMatters/BudgetImplementWarningDataMager/BudgetImplementWarningDataMager.vue')
  },
  // 支付信息不规范统计
  {
    path: '/PaymentInformationIsNotStandardizedStatistics',
    name: 'PaymentInformationIsNotStandardizedStatistics',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () => import('../../../views/main/MointoringMatters/BudgetImplementWarningDataMager/BudgetImplementWarningDataMager.vue')
  },
  // 工资支出相关统计
  {
    path: '/SalaryExpenditureRelatedStatistics',
    name: 'SalaryExpenditureRelatedStatistics',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () => import('../../../views/main/MointoringMatters/BudgetImplementWarningDataMager/BudgetImplementWarningDataMager.vue')
  },
  // 禁止使用科目统计
  {
    path: '/SubjectStatisticsAreProhibited',
    name: 'SubjectStatisticsAreProhibited',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () => import('../../../views/main/MointoringMatters/BudgetImplementWarningDataMager/BudgetImplementWarningDataMager.vue')
  },
  // 预警数据审核（预算执行）
  {
    path: '/BudgetAccountingWarningDataMager',
    name: 'BudgetAccountingWarningDataMager',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () => import('../../../views/main/MointoringMatters/BudgetAccountingWarningDataMager/BudgetAccountingWarningDataMager.vue')
  },
  // 预警数据审核（直达资金）
  {
    path: '/BudgetAccountingWarningDataMagerByZd',
    name: 'BudgetAccountingWarningDataMagerByZd',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () => import('../../../views/main/MointoringMatters/BudgetAccountingWarningDataMager/BudgetAccountingWarningDataMager.vue')
  },
  // 预警数据审核（财政专户资金）
  {
    path: '/BudgetAccountingWarningDataMagerByZh',
    name: 'BudgetAccountingWarningDataMagerByZh',
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
    component: () => import('../../../views/main/MointoringMatters/BudgetAccountingWarningDataMager/BudgetAccountingWarningDataMager.vue')
  },
  // 单位核算预警数据管理
  {
    path: '/AgencyBusinessAccountingWarningDataMager',
    name: 'AgencyBusinessAccountingWarningDataMager',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () => import('../../../views/main/MointoringMatters/AgencyBusinessAccountingWarningDataMager/AgencyBusinessAccountingWarningDataMager.vue')
  },
  // 支付j监控规则
  {
    path: '/PayMonitorRulesMager',
    name: 'PayMonitorRulesMager',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () => import('../../../views/main/MointoringMatters/PayMonitorRulesMager/PayMonitorRulesMager.vue')
  },
  // 统计分析报表（按区划）
  {
    path: '/StatisticalFormsByCompartment',
    name: 'StatisticalFormsByCompartment',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () => import('../../../views/main/MointoringMatters/StatisticalFormsByCompartment/StatisticalFormsByCompartment.vue')
  },
  // 统计分析报表（按规则）
  {
    path: '/StatisticalFormsByRule',
    name: 'StatisticalFormsByRule',
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
    component: () => import('../../../views/main/MointoringMatters/StatisticalFormsByRank/StatisticalFormsByRank.vue')
  },
  // 预警明细查询（按规则）
  {
    path: '/WarningDetailsByRule',
    name: 'WarningDetailsByRule',
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
    component: () => import('../../../views/main/MointoringMatters/WarningDetailsByCompartment/WarningDetailsByCompartment.vue')
  },
  // 会计核算-统计分析报表（按区划）
  {
    path: '/StatisticalFormsByCompartmentHs',
    name: 'StatisticalFormsByCompartmentHs',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () => import('../../../views/main/MointoringMatters/StatisticalFormsByCompartment/StatisticalFormsByCompartment.vue')
  },
  // 会计核算-统计分析报表（按规则）
  {
    path: '/StatisticalFormsByRuleHs',
    name: 'StatisticalFormsByRuleHs',
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
    component: () => import('../../../views/main/MointoringMatters/StatisticalFormsByRank/StatisticalFormsByRank.vue')
  },
  // 会计核算-预警明细查询（按规则）
  {
    path: '/WarningDetailsByRuleHs',
    name: 'WarningDetailsByRuleHs',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () => import('../../../views/main/MointoringMatters/WarningDetailsByRule/WarningDetailsByRule.vue')
  },
  // 会计核算-预警明细查询（按区划）
  {
    path: '/WarningDetailsByCompartmentHs',
    name: 'WarningDetailsByCompartmentHs',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () => import('../../../views/main/MointoringMatters/WarningDetailsByCompartment/WarningDetailsByCompartment.vue')
  },
  // 枚举值设置
  {
    path: '/enumerationSet',
    name: 'enumerationSet',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () => import('../../../views/main/MointoringMatters/EnumerationSet/EnumerationSet.vue')
  },
  // 预警明细查询（按规则）
  {
    path: '/WarningDetailsByRuleAll',
    name: 'WarningDetailsByRuleAll',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () => import('../../../views/main/MointoringMatters/WarningDetailsByRule/WarningDetailsByRule.vue')
  },
  // 预警明细查询（按区划）
  {
    path: '/WarningDetailsByCompartmentAll',
    name: 'WarningDetailsByCompartmentAll',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () => import('../../../views/main/MointoringMatters/WarningDetailsByCompartment/WarningDetailsByCompartment.vue')
  },
  // 监控主题分析（按区划）
  {
    path: '/MonitorThemeByCompartment',
    name: 'MonitorThemeByCompartment',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () => import('../../../views/main/MointoringMatters/MonitorThemeByCompartment/MonitorThemeByCompartment.vue')
  },
  // 监控主题分析（按规则）
  {
    path: '/MonitorThemeByRule',
    name: 'MonitorThemeByRule',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () => import('../../../views/main/MointoringMatters/MonitorThemeByRule/MonitorThemeByRule.vue')
  },
  // 监控主题分析（按预警级别）
  {
    path: '/MonitorThemeByRank',
    name: 'MonitorThemeByRank',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () => import('../../../views/main/MointoringMatters/MonitorThemeByRank/MonitorThemeByRank.vue')
  },
  // 问询函生成
  {
    path: '/InquiryLetterCreate',
    name: 'InquiryLetterCreate',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () => import('../../../views/main/MointoringMatters/InquiryLetterCreate/InquiryLetterCreate.vue')
  },
  // 问询函复核
  {
    path: '/InquiryLetterReview',
    name: 'InquiryLetterReview',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () => import('../../../views/main/MointoringMatters/InquiryLetterReview/InquiryLetterReview.vue')
  },
  // 问询函回复（单位）
  {
    path: '/InquiryLetterReplyByAgency',
    name: 'InquiryLetterReplyByAgency',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () => import('../../../views/main/MointoringMatters/InquiryLetterReplyByAgency/InquiryLetterReplyByAgency.vue')
  },
  // 问询函回复（财政）
  {
    path: '/InquiryLetterReplyByFinance',
    name: 'InquiryLetterReplyByFinance',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () => import('../../../views/main/MointoringMatters/InquiryLetterReplyByFinance/InquiryLetterReplyByFinance.vue')
  },
  // 问询函备案
  {
    path: '/InquiryLetterRecords',
    name: 'InquiryLetterRecords',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () => import('../../../views/main/MointoringMatters/InquiryLetterRecords/InquiryLetterRecords.vue')
  },
  // 问询函生成
  {
    path: '/InquiryLetterCreateBySpe',
    name: 'InquiryLetterCreateBySpe',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () => import('../../../views/main/MointoringMatters/InquiryLetterCreate/InquiryLetterCreate.vue')
  },
  // 问询函复核
  {
    path: '/InquiryLetterReviewBySpe',
    name: 'InquiryLetterReviewBySpe',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () => import('../../../views/main/MointoringMatters/InquiryLetterReview/InquiryLetterReview.vue')
  },
  // 问询函回复（单位）
  {
    path: '/InquiryLetterReplyByAgencyBySpe',
    name: 'InquiryLetterReplyByAgencyBySpe',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () => import('../../../views/main/MointoringMatters/InquiryLetterReplyByAgency/InquiryLetterReplyByAgency.vue')
  },
  // 问询函回复（财政）
  {
    path: '/InquiryLetterReplyByFinanceBySpe',
    name: 'InquiryLetterReplyByFinanceBySpe',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () => import('../../../views/main/MointoringMatters/InquiryLetterReplyByFinance/InquiryLetterReplyByFinance.vue')
  },
  // 问询函备案
  {
    path: '/InquiryLetterRecordsBySpe',
    name: 'InquiryLetterRecordsBySpe',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () => import('../../../views/main/MointoringMatters/InquiryLetterRecords/InquiryLetterRecords.vue')
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
    component: () => import('@/views/px-to-vw-page/threeGuaranteesExpenditure/index.vue')
  },
  {
    path: '/threePublicExpenses',
    name: 'ThreePublicExpenses',
    meta: {
      title: '“三公”经费监控总览',
      requireAuth: true
    },
    component: () => import('@/views/px-to-vw-page/threePublicExpenses/index.vue')
  },
  // 监控报告生成
  {
    path: '/MonitoeReportCreate',
    name: 'MonitoeReportCreate',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () => import('../../../views/main/MointoringMatters/MonitoeReportCreate/MonitoeReportCreate.vue')
  },
  // 监控报告查看
  {
    path: '/MonitoeReportQuery',
    name: 'MonitoeReportQuery',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () => import('../../../views/main/MointoringMatters/MonitoeReportQuery/MonitoeReportQuery.vue')
  },
  // 基础资料库维护
  {
    path: '/BasicDatabaseMaintenance',
    name: 'BasicDatabaseMaintenance',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () => import('../../../views/main/MointoringMatters/BasicDatabaseMaintenance/BasicDatabaseMaintenance.vue')
  },
  // 财政运行基础表录入
  {
    path: '/FinancialBasicTableEntry',
    name: 'FinancialBasicTableEntry',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () => import('../../../views/main/MointoringMatters/FinancialBasicTableEntry/FinancialBasicTableEntry.vue')
  },
  {
    path: '/StatisticalFormsByRuleSpe',
    name: 'StatisticalFormsByRuleSpe',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () => import('../../../views/main/MointoringMatters/StatisticalFormsByRule/StatisticalFormsByRule.vue')
  },
  // 统计分析报表（按预警级别） 专项
  {
    path: '/StatisticalFormsByRankSpe',
    name: 'StatisticalFormsByRankSpe',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () => import('../../../views/main/MointoringMatters/StatisticalFormsByRank/StatisticalFormsByRank.vue')
  },
  // 预警明细查询（按规则）
  {
    path: '/WarningDetailsByRuleSpe',
    name: 'WarningDetailsByRuleSpe',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () => import('../../../views/main/MointoringMatters/WarningDetailsByRule/WarningDetailsByRule.vue')
  },
  // 预警明细查询（按区划）
  {
    path: '/WarningDetailsByCompartmentSpe',
    name: 'WarningDetailsByCompartmentSpe',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () => import('../../../views/main/MointoringMatters/WarningDetailsByCompartment/WarningDetailsByCompartment.vue')
  },
  {
    path: '/BgtPaySummary',
    name: 'BgtPaySummary',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () => import('../../../views/main/MointoringMatters/ThreeGuarantees/BgtPaySummary.vue')
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
  }
]
