const routers = [
  {
    path: '/indexFind', // 指标查询
    name: 'IndexFind',
    component: () => import('@/views/main/directFund/indexFind/index.vue')
  }
]

export default routers
