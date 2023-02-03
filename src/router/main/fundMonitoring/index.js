/*
 * 直达资金监控路由
 */
const routers = [
  {
    path: '/BudgetImplementationCapital', // 中央直达资金预算执行情况_分资金
    name: 'BudgetImplementationCapital',
    component: () => import('../../../views/main/fundMonitoring/capitalAccount/budgetImplementationCapital/budgetImplementationCapital.vue')
  },
  {
    path: '/BudgetImplementationRegion', // 中央直达资金预算执行情况_分地区
    name: 'BudgetImplementationRegion',
    component: () => import('../../../views/main/fundMonitoring/capitalAccount/budgetImplementationRegion/budgetImplementationRegion.vue')
  },
  {
    path: '/BudgetImplementationCapitalCZ', // 中央参照直达资金预算执行情况_分资金
    name: 'BudgetImplementationCapitalCZ',
    component: () => import('../../../views/main/fundMonitoring/capitalAccount/budgetImplementationCapital/budgetImplementationCapital.vue')
  },
  {
    path: '/BudgetImplementationRegionCZ', // 中央参照直达资金预算执行情况_分地区
    name: 'BudgetImplementationRegionCZ',
    component: () => import('../../../views/main/fundMonitoring/capitalAccount/budgetImplementationRegion/budgetImplementationRegion.vue')
  },
  {
    path: '/BudgetDisburseRegionCZ', // // 参照直达资金支出_分地区
    name: 'BudgetDisburseRegionCZ',
    component: () => import('../../../views/main/fundMonitoring/capitalAccount/budgetDisburseRegion/budgetDisburseRegion.vue')
  },
  {
    path: '/BudgetDisburseCapitalCZ', // 参照直达资金支出_分资金
    name: 'BudgetDisburseCapitalCZ',
    component: () => import('../../../views/main/fundMonitoring/capitalAccount/budgetDisburseCapital/budgetDisburseCapital.vue')
  },
  {
    path: '/BudgetDisburseRegion', // // 直达资金支出_分地区
    name: 'BudgetDisburseRegion',
    component: () => import('../../../views/main/fundMonitoring/capitalAccount/budgetDisburseRegion/budgetDisburseRegion.vue')
  },
  {
    path: '/BudgetDisburseCapital', // 直达资金支出_分资金
    name: 'BudgetDisburseCapital',
    component: () => import('../../../views/main/fundMonitoring/capitalAccount/budgetDisburseCapital/budgetDisburseCapital.vue')
  },
  {
    path: '/BudgetDisburseDiscount', // 直达资金惠企利民发放明细
    name: 'BudgetDisburseDiscount',
    component: () => import('../../../views/main/fundMonitoring/capitalAccount/budgetDisburseDiscount/budgetDisburseDiscount.vue')
  },
  {
    path: '/BudgetDisburseDiscountCZ', // 参照直达资金惠企利民发放明细
    name: 'BudgetDisburseDiscountCZ',
    component: () => import('../../../views/main/fundMonitoring/capitalAccount/budgetDisburseDiscount/budgetDisburseDiscount.vue')
  },
  {
    path: '/BudgetDisburseObject', // 直达资金项目查询
    name: 'BudgetDisburseObject',
    component: () => import('../../../views/main/fundMonitoring/capitalAccount/budgetDisburseObject/budgetDisburseObject.vue')
  },
  {
    path: '/BudgetDisburseObjectCZ', // 参照直达资金项目查询
    name: 'BudgetDisburseObjectCZ',
    component: () => import('../../../views/main/fundMonitoring/capitalAccount/budgetDisburseObject/budgetDisburseObject.vue')
  },
  {
    path: '/BudgetDisburseSubject', // 直达资金支出_分科目
    name: 'BudgetDisburseSubject',
    component: () => import('../../../views/main/fundMonitoring/capitalAccount/budgetDisburseSubject/budgetDisburseSubject.vue')
  },
  {
    path: '/BudgetDisburseSubjectCZ', // 参照直达资金支出_分科目
    name: 'BudgetDisburseSubjectCZ',
    component: () => import('../../../views/main/fundMonitoring/capitalAccount/budgetDisburseSubject/budgetDisburseSubject.vue')
  },
  {
    path: '/BudgetReleaseRegion', // 中央和地方预算下达分地区直达
    name: 'BudgetReleaseRegion',
    component: () => import('../../../views/main/fundMonitoring/capitalAccount/budgetReleaseRegion/budgetReleaseRegion.vue')
  },
  {
    path: '/BudgetReleaseCapital', // 中央和地方预算下达分资金直达
    name: 'BudgetReleaseCapital',
    component: () => import('../../../views/main/fundMonitoring/capitalAccount/budgetReleaseCapital/budgetReleaseCapital.vue')
  },
  {
    path: '/BudgetReleaseRegionCZ', // 中央和地方预算下达分地区直达参照
    name: 'BudgetReleaseRegionCZ',
    component: () => import('../../../views/main/fundMonitoring/capitalAccount/budgetReleaseRegion/budgetReleaseRegion.vue')
  },
  {
    path: '/BudgetReleaseCapitalCZ', // 中央和地方预算下达分资金直达参照
    name: 'BudgetReleaseCapitalCZ',
    component: () => import('../../../views/main/fundMonitoring/capitalAccount/budgetReleaseCapital/budgetReleaseCapital.vue')
  },
  {
    path: '/BudgetPayRegion', // 中央和地方预算支出分地区
    name: 'BudgetPayRegion',
    component: () => import('../../../views/main/fundMonitoring/capitalAccount/budgetPayRegion/budgetPayRegion.vue')
  },
  {
    path: '/BudgetPayCapital', // 中央和地方预算支出分资金
    name: 'BudgetPayCapital',
    component: () => import('../../../views/main/fundMonitoring/capitalAccount/budgetPayCapital/budgetPayCapital.vue')
  },
  {
    path: '/BudgetPayRegionCZ', // 中央和地方预算支出分地区参照
    name: 'BudgetPayRegionCZ',
    component: () => import('../../../views/main/fundMonitoring/capitalAccount/budgetPayRegion/budgetPayRegion.vue')
  },
  {
    path: '/BudgetPayCapitalCZ', // 中央和地方预算支出分资金参照
    name: 'BudgetPayCapitalCZ',
    component: () => import('../../../views/main/fundMonitoring/capitalAccount/budgetPayCapital/budgetPayCapital.vue')
  },
  {
    path: '/BudgetCarryRegion', // 直达资金分地区结转情况表
    name: 'BudgetCarryRegion',
    component: () => import('../../../views/main/fundMonitoring/capitalAccount/budgetCarryRegion/budgetCarryRegion.vue')
  },
  {
    path: '/MisuseSubject', // 疑似错用科目
    name: 'MisuseSubject',
    component: () => import('../../../views/main/fundMonitoring/businessSupervision/misuseSubject/misuseSubject.vue')
  },
  {
    path: '/IndexNormative', // 指标数据规范性检查
    name: 'IndexNormative',
    component: () => import('../../../views/main/fundMonitoring/businessSupervision/indexNormative/indexNormative.vue')
  },
  {
    path: '/PayDataNormative', // 支付数据规范性检查
    name: 'PayDataNormative',
    component: () => import('../../../views/main/fundMonitoring/businessSupervision/payDataNormative/payDataNormative.vue')
  },
  {
    path: '/UnitPayment', // 单位支付情况
    name: 'UnitPayment',
    component: () => import('../../../views/main/fundMonitoring/businessSupervision/unitPayment/unitPayment.vue')
  },
  {
    path: '/AllocationReleaseStatus', // 分配下达情况查询
    name: 'AllocationReleaseStatus',
    component: () => import('../../../views/main/fundMonitoring/businessSupervision/allocationReleaseStatus/allocationReleaseStatus.vue')
  },
  {
    path: '/TargetSurplus', // 待分指标余额情况
    name: 'TargetSurplus',
    component: () => import('../../../views/main/fundMonitoring/businessSupervision/targetSurplus/targetSurplus.vue')
  },
  {
    path: '/CreateProcessing', // 监控处理单生成
    name: 'CreateProcessing',
    component: () => import('../../../views/main/fundMonitoring/violationHandle/warningCreate/warningCreate.vue')
  },
  {
    path: '/DepartmentRetroact', // 主管处室反馈
    name: 'DepartmentRetroact',
    component: () => import('../../../views/main/fundMonitoring/violationHandle/createProcessing/createProcessing.vue')
  },
  {
    path: '/DepartmentRetroact ', // 部门反馈
    name: 'DepartmentRetroact ',
    component: () => import('../../../views/main/fundMonitoring/violationHandle/createProcessing/createProcessing.vue')
  },
  {
    path: '/CompanyRetroact', // 单位反馈
    name: 'CompanyRetroact',
    component: () => import('../../../views/main/fundMonitoring/violationHandle/createProcessing/createProcessing.vue')
  },
  {
    path: '/ArchiveProcessing', // 归档
    name: 'ArchiveProcessing',
    component: () => import('../../../views/main/fundMonitoring/violationHandle/createProcessing/createProcessing.vue')
  },
  {
    path: '/QueryProcessing', // 查询
    name: 'QueryProcessing',
    component: () => import('../../../views/main/fundMonitoring/violationHandle/warningCreate/warningCreate.vue')
  },
  {
    path: '/BudgetFocus', // 直达资金重点关注
    name: 'BudgetFocus',
    component: () => import('../../../views/main/fundMonitoring/capitalAccount/budgetFocus/budgetFocus.vue')
  },
  {
    path: '/DataExtraction', // 数据抽取
    name: 'DataExtraction',
    component: () => import('../../../views/main/fundMonitoring/dataExtraction/dataExtraction.vue')
  },
  {
    path: '/Ledger', // 数据源维护
    name: 'Ledger',
    component: () => import('../../../views/main/fundMonitoring/ledger/ledger.vue')
  },
  {
    path: '/WarnRegion', // 直达资金地方预警汇总
    name: 'WarnRegion',
    component: () => import('../../../views/main/fundMonitoring/violationHandle/warningCreate/warningQuery.vue')
  },
  {
    path: '/WarnRegionSummary', // 地方监控预警汇总
    name: 'WarnRegionSummary',
    component: () => import('../../../views/main/fundMonitoring/warnRegionSummary/warnRegionSummary.vue')
  },
  {
    path: '/WarnRuleSummary', // 地方监控预警汇总-分规则
    name: 'WarnRuleSummary',
    component: () => import('../../../views/main/fundMonitoring/warnRuleSummary/warnRuleSummary.vue')
  },
  {
    path: '/WarningResult',
    name: 'WarningResult',
    meta: {
      keepAlive: true
    },
    component: () =>
      import('../../../views/main/fundMonitoring/warningResult/warningResult.vue') // 直达资金监控预警结果(全省)
  },
  {
    path: '/WarningResultHandleRegion',
    name: 'WarningResultHandleRegion',
    meta: {
      keepAlive: true
    },
    component: () =>
      import('../../../views/main/fundMonitoring/warningResultHandleRegion/warningResultHandleRegion.vue') // 直达资金监控预警处理_地区
  },
  {
    path: '/WarningResultHandleRule',
    name: 'WarningResultHandleRule',
    meta: {
      keepAlive: true
    },
    component: () =>
      import('../../../views/main/fundMonitoring/warningResultHandleRule/warningResultHandleRule.vue') // 直达资金监控预警处理_分规则
  },
  {
    path: '/NotImportBgtDetail', // 未导入指标明细查询
    name: 'NotImportBgtDetail',
    component: () => import('../../../views/main/fundMonitoring/businessSupervision/notImportBgtDetail/notImportBgtDetail.vue')
  },
  {
    path: '/UnsentBgtDetail', // 未发送指标明细查询
    name: 'UnsentBgtDetail',
    component: () => import('../../../views/main/fundMonitoring/businessSupervision/unsentBgtDetail/unsentBgtDetail.vue')
  },
  {
    path: '/PrjDataCheck', // 项目数据规范性检查
    name: 'PrjDataCheck',
    component: () => import('../../../views/main/fundMonitoring/businessSupervision/prjDataCheck/prjDataCheck.vue')
  },
  {
    path: '/PayDataNormativeAfterThird', // 支付数据规范性检查（每月3号后挂接的支付）
    name: 'PayDataNormativeAfterThird',
    component: () => import('../../../views/main/fundMonitoring/businessSupervision/payDataNormativeAfterThird/payDataNormativeAfterThird.vue')
  },
  {
    path: '/NotFillBenefitDetail', // 未填报惠企利民发放明细
    name: 'NotFillBenefitDetail',
    component: () => import('../../../views/main/fundMonitoring/businessSupervision/notFillBenefitDetail/notFillBenefitDetail.vue')
  },
  {
    path: '/AbnormalPaymentRatio', // 资金支付比例异常情况
    name: 'AbnormalPaymentRatio',
    component: () => import('../../../views/main/fundMonitoring/businessSupervision/abnormalPaymentRatio/abnormalPaymentRatio.vue')
  },
  {
    path: '/CarryImplementationRegion', // 结转资金预算下达_分地区
    name: 'CarryImplementationRegion',
    component: () => import('../../../views/main/fundMonitoring/capitalCarryForward/carryImplementationRegion/carryImplementationRegion.vue')
  },
  {
    path: '/CarryImplementationCapital', // 结转资金预算下达_分资金
    name: 'CarryImplementationCapital',
    component: () => import('../../../views/main/fundMonitoring/capitalCarryForward/carryImplementationCapital/carryImplementationCapital.vue')
  },
  {
    path: '/CarryPayRegion', // 结转资金资金支出_分地区
    name: 'CarryPayRegion',
    component: () => import('../../../views/main/fundMonitoring/capitalCarryForward/carryPayRegion/carryPayRegion.vue')
  },
  {
    path: '/CarryPayCapital', // 结转资金资金支出_分资金
    name: 'CarryPayCapital',
    component: () => import('../../../views/main/fundMonitoring/capitalCarryForward/carryPayCapital/carryPayCapital.vue')
  },
  {
    path: '/CarryPlm', // 直达机制项目全生命周期管理情况表
    name: 'CarryPlm',
    component: () => import('../../../views/main/fundMonitoring/capitalCarryForward/carryPlm/carryPlm.vue')
  },
  {
    path: '/CarryMoneyRegion', // 直达机制资金分地区结转情况表
    name: 'CarryMoneyRegion',
    component: () => import('../../../views/main/fundMonitoring/capitalCarryForward/carryMoneyRegion/carryMoneyRegion.vue')
  },
  {
    path: '/DfrBudgetReleaseRegion', // 直达资金预算下达分地区
    name: 'DfrBudgetReleaseRegion',
    component: () => import('../../../views/main/fundMonitoring/capitalAccount/dfrBudgetReleaseRegion/dfrBudgetReleaseRegion.vue')
  },
  {
    path: '/DfrBudgetReleaseCapital', // 直达资金预算下达分资金
    name: 'DfrBudgetReleaseCapital',
    component: () => import('../../../views/main/fundMonitoring/capitalAccount/dfrBudgetReleaseCapital/dfrBudgetReleaseCapital.vue')
  },
  {
    path: '/DfrBudgetReleaseRegionCZ', // 参照直达资金预算下达_分地区
    name: 'DfrBudgetReleaseRegionCZ',
    component: () => import('../../../views/main/fundMonitoring/capitalAccount/dfrBudgetReleaseRegion/dfrBudgetReleaseRegion.vue')
  },
  {
    path: '/DfrBudgetReleaseCapitalCZ', // 参照直达资金预算下达_分资金
    name: 'DfrBudgetReleaseCapitalCZ',
    component: () => import('../../../views/main/fundMonitoring/capitalAccount/dfrBudgetReleaseCapital/dfrBudgetReleaseCapital.vue')
  },
  {
    path: '/BenefitEnterprisesAndPeople', // 惠企利民
    name: 'BenefitEnterprisesAndPeople',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () => {
      if (process.env.VUE_APP_CONF_ISHB) {
        return import('../../../hb/views/Benifit/BenifitPeople.vue')
      } else {
        return import('../../../views/main/fundMonitoring/benefitPeople/benefitPeople.vue')
      }
    }
  },
  {
    path: '/BenefitEnterprisesAndPeopleBySH', // 惠企利民-上海
    name: 'BenefitEnterprisesAndPeopleBySH',
    meta: {
      requireAuth: true
    },
    component: () => import('@/views/main/fundMonitoring/benefitPeopleBySH/benefitPeople.vue')
  },
  {
    path: '/benefitPeopleConfirm', // 惠企利民确认
    name: 'benefitPeopleConfirm',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () => import('../../../views/main/fundMonitoring/benefitPeopleConfirm/benefitPeopleConfirm.vue')
  },
  {
    path: '/BenefitEnterprisesAndPeopleImport', // 支付接口数据导入
    name: 'BenefitEnterprisesAndPeopleImport',
    component: () => import('../../../views/main/fundMonitoring/benefitEnterprisesAndPeopleImport/BenefitEnterprisesAndPeopleImport.vue')
  },
  {
    path: '/dfrAllocationWarning', // 直达资金分配预警表
    name: 'dfrAllocationWarning',
    component: () => import('../../../views/main/fundMonitoring/businessSupervision/dfrAllocationAlert/dfrAllocationAlert.vue')
  },
  {
    path: '/dfrAllocation', // 直达资金分配表
    name: 'dfrAllocation',
    component: () => import('../../../views/main/fundMonitoring/businessSupervision/dfrAllocation/dfrAllocation.vue')
  },
  {
    path: '/dfrAllocationProgressTracking', // 直达资金分配进度跟踪表
    name: 'dfrAllocationProgressTracking',
    component: () => import('../../../views/main/fundMonitoring/capitalAccount/dfrAllocationProgressTracking/dfrAllocationProgressTracking.vue')
  },
  {
    path: '/userProRelation', // 用户资金权限配置
    name: 'userProRelation',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () => import('../../../views/main/fundMonitoring/UserProRelation/userProRelation.vue')
  },
  {
    path: '/escalation', // 财政上报
    name: 'escalation',
    component: () => import('@/views/main/fundMonitoring/escalation/escalation.vue')
  },
  {
    path: '/confirmEscalation', // 财政上报地市确认
    name: 'confirmEscalation',
    component: () => import('@/views/main/fundMonitoring/escalation/confirmEscalation.vue')
  },
  {
    path: '/dfrMultipleQuery', // 直达资金综合查询
    name: 'dfrMultipleQuery',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () => import('../../../views/main/fundMonitoring/dfrMultipleQuery/dfrMultipleQuery.vue')
  },
  {
    path: '/notRecCenterBgtDetail', // 未接收中央指标明细
    name: 'notRecCenterBgtDetail',
    component: () => import('@/views/main/fundMonitoring/businessSupervision/notRecCenterBgtDetail/notRecCenterBgtDetail.vue')
  },
  {
    path: '/expenditureProgressRanking', // 直达资金支出进度排名
    name: 'ExpenditureProgressRanking',
    component: () => import('@/views/main/fundMonitoring/expenditureProgressRanking/index.vue')
  },
  {
    path: '/payProcessingDepCapital', // 直达资金分处室分资金支出进度情况统计表
    name: 'payProcessingDepCapital',
    component: () => import('../../../views/main/fundMonitoring/capitalAccount/payProcessingDepCapital/payProcessingDepCapital.vue')
  },
  {
    path: '/payProcessingDepCapital', // 中央直达资金分资金分配下达、支出进度情况表
    name: 'payProcessingDepCapital',
    component: () => import('../../../views/main/fundMonitoring/capitalAccount/fpxdZcjdCapital/fpxdZcjdCapital.vue')
  },
  {
    path: '/payProcessingDepCapital', // 中央直达资金分县市分配下达、支出进度情况表
    name: 'payProcessingDepCapital',
    component: () => import('../../../views/main/fundMonitoring/capitalAccount/fpxdZcjdRegion/fpxdZcjdRegion.vue')
  },
  {
    path: '/monitorCity', // 直达资金分市（州）直达资金监控工作情况表
    name: 'monitorCity',
    component: () => import('../../../views/main/fundMonitoring/capitalAccount/monitorCity/monitorCity.vue')
  },
  {
    path: '/monitorCounty', //  直达资金分县（市、区）直达资金监控工作情况表
    name: 'monitorCounty',
    component: () => import('../../../views/main/fundMonitoring/capitalAccount/monitorCounty/monitorCounty.vue')
  },
  {
    path: '/centerZdzjSituation', //  中央直达资金情况表
    name: 'centerZdzjSituation',
    component: () => import('../../../views/main/fundMonitoring/capitalAccount/centerZdzjSituation/centerZdzjSituation.vue')
  }
]

// 直达资金所有页面统一增加keepAlive
routers.forEach(router => {
  router.meta = {
    keepAlive: true,
    requireAuth: true,
    ...(router.meta || {})
  }
})

export default routers
