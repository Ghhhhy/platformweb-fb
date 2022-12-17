const routers = [
  {
    path: '/rulesStatistic',
    name: 'RulesStatistic',
    meta: {
      title: '预警结果按规则统计'
    },
    component: () => import('@/views/main/statisticAnalysis/rulesStatistic/index.vue')
  }
]

export default routers
