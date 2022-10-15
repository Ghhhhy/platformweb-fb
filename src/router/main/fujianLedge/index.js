/*
 * 福建定制化直达表
 */
const routers = [
  {
    path: '/provincialDirectNotificationArrange', // 全省直达通报（含地方安排）
    name: 'ProvincialDirectNotificationArrange',
    component: () => import('@/views/main/fujianLedge/provincialDirectNotificationArrange/index.vue')
  },
  {
    path: '/provincialDirectNotificationNotArrange', // 全省直达通报（不含地方安排）
    name: 'ProvincialDirectNotificationNotArrange',
    component: () => import('@/views/main/fujianLedge/provincialDirectNotificationNotArrange/index.vue')
  },
  {
    path: '/cityDirectNotificationArrange', // 市直达通报（含地方安排）
    name: 'CityDirectNotification',
    component: () => import('@/views/main/fujianLedge/cityDirectNotificationArrange/index.vue')
  },
  {
    path: '/cityDirectNotificationNotArrange', // 市直达通报（不含地方安排）
    name: 'CityDirectNotificationNotArrange',
    component: () => import('@/views/main/fujianLedge/cityDirectNotificationNotArrange/index.vue')
  },
  {
    path: '/centralFundsProvincialDistribution', // 中央直达资金省级分配情况
    name: 'CentralFundsProvincialDistribution',
    component: () => import('@/views/main/fujianLedge/centralFundsProvincialDistribution/index.vue')
  },
  {
    path: '/provincialFundsDistribution', // 省级配套直达资金分配情况
    name: 'ProvincialFundsDistribution',
    component: () => import('@/views/main/fujianLedge/provincialFundsDistribution/index.vue')
  },
  {
    path: '/dailyNotificationCentralFunds', // 每日通报表_中央资金
    name: 'DailyNotificationCentralFunds',
    component: () => import('@/views/main/fujianLedge/dailyNotificationCentralFunds/index.vue')
  },
  {
    path: '/provincialhqmxSituation', // 全省惠企明细数据情况表
    name: 'provincialhqmxSituation',
    component: () => import('@/views/main/fujianLedge/provincialhqmxSituation/index.vue')
  },
  {
    path: '/dataqualityWarningSituationDistrict', // 数据质量预警情况表_分地区
    name: 'dataqualityWarningSituationDistrict',
    component: () => import('@/views/main/fujianLedge/dataqualityWarningSituationDistrict/index.vue')
  },
  {
    path: '/dataqualityWarningSituationOffice', // 数据质量预警情况表_分处室
    name: 'dataqualityWarningSituationOffice',
    component: () => import('@/views/main/fujianLedge/dataqualityWarningSituationOffice/index.vue')
  },
  {
    path: '/dfrCarryforwardDistrict', // 直达资金结转分地区
    name: 'dfrCarryforwardDistrict',
    component: () => import('@/views/main/fujianLedge/dfrCarryforwardDistrict/index.vue')
  },
  {
    path: '/dfrCarryforwardOffice', // 直达资金结转分资金
    name: 'dfrCarryforwardOffice',
    component: () => import('@/views/main/fujianLedge/dfrCarryforwardOffice/index.vue')
  },
  {
    path: '/dfrBudgetExeSituationOffice', // 直达资金预算执行情况表_处室
    name: 'dfrBudgetExeSituationOffice',
    component: () => import('@/views/main/fujianLedge/dfrBudgetExeSituationOffice/index.vue')
  },
  {
    path: '/dfrBudgetExeSituationDistrict', // 直达资金预算执行情况表_地区
    name: 'dfrBudgetExeSituationDistrict',
    component: () => import('@/views/main/fujianLedge/dfrBudgetExeSituationDistrict/index.vue')
  },
  {
    path: '/dfrPaySituationDistrict', // 中央直达资金支出情况_分地区(按月份)
    name: 'dfrPaySituationDistrict',
    component: () => import('@/views/main/fujianLedge/dfrPaySituationDistrict/index.vue')
  },
  {
    path: '/dfrPaySituationFund', // 中央直达资金支出情况_分资金(按月份)
    name: 'dfrPaySituationFund',
    component: () => import('@/views/main/fujianLedge/dfrPaySituationFund/index.vue')
  }
]

routers.forEach(router => {
  router.meta = {
    keepAlive: true,
    requireAuth: true,
    ...(router.meta || {})
  }
})

export default routers
