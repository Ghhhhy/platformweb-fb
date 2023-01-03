const routers = [
  {
    path: '/rulesStatistic',
    name: 'RulesStatistic',
    meta: {
      title: '预警结果按规则统计'
    },
    component: () => import('@/views/main/statisticAnalysis/rulesStatistic/index.vue')
  },
  {
    path: '/unitStatistic',
    name: 'UnitStatistic',
    meta: {
      title: '预警结果按预算单位统计'
    },
    component: () => import('@/views/main/statisticAnalysis/unitStatistic/index.vue')
  },
  {
    path: '/efficiencySheetStatistic',
    name: 'EfficiencySheetStatistic',
    meta: {
      title: '直接支付开单效率统计表'
    },
    component: () => import('@/views/main/statisticAnalysis/efficiencySheetStatistic/index.vue')
  }
]

export default routers
