/*
 * 清单化管理
 */
const routers = [
  {
    path: '/superiorTransferBudgetProject', // 上级转移支付预算项目
    name: 'SuperiorTransferBudgetProject',
    component: () => import('@/views/main/inventory/superiorTransferBudgetProject/index.vue')
  },
  {
    path: '/correspondingTransferBudgetProject', // 本级预算项目
    name: 'correspondingTransferBudgetProject',
    component: () => import('@/views/main/inventory/correspondingTransferBudgetProject/index.vue')
  }
]

routers.forEach(router => {
  router.meta = {
    requireAuth: true,
    ...(router.meta || {})
  }
})

export default routers
