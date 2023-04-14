export default [
  {
    path: '/SpecialBudgetItemsEnforcedAnalysis',
    name: 'SpecialBudgetItemsEnforcedAnalysis',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () => import('../../../views/main/monitoringSubjectAnalysis/specialBudgetItemsEnforcedAnalysis/specialBudgetItemsEnforcedAnalysis.vue')
  },
  {
    path: '/NotAccordingToStipulations',
    name: 'NotAccordingToStipulations',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () => import('../../../views/main/monitoringSubjectAnalysis/notAccordingToStipulations/notAccordingToStipulations.vue')
  }
]
