// 事后工作流改造
let workFlowRouters = [// monitProcFeedbackSpe2 monitProcFeedbackDfr2...
  {
    path: '/monitProcFeedbackDfr',
    name: 'monitProcFeedbackDfr',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () => import('@/views/main/monitProcFeedback/monitProcFeedback.vue')
  },
  {
    path: '/monitProcFeedbackSpe',
    name: 'monitProcFeedbackSpe',
    meta: {
      keepAlive: true,
      requireAuth: true
    },
    component: () => import('@/views/main/monitProcFeedback/monitProcFeedback.vue')
  }
]
for (let i = 2; i < 7; i++) {
  // 专项 Spe 直达资金Dfr
  const routerMeteList = ['Spe', 'Dfr']
  routerMeteList.forEach(str => {
    const element = {
      path: `/monitProcFeedback${str}${i}`, // 单位提交材料说明 2部门核实 3财政部门初审 4财政部门复审 5预算单位整改 6财政部门审核
      name: `/monitProcFeedback${str}${i}`,
      meta: {
        keepAlive: true,
        requireAuth: true
      },
      component: () => import('@/views/main/monitProcFeedback/monitProcFeedback.vue')
    }
    workFlowRouters.push(element)
  })
}
export {
  workFlowRouters
}
