import { RouterPathEnum, regulationClassOptions } from '@/views/main/handlingOfViolations/model/enum'

const templateRouters = [
  {
    path: RouterPathEnum().UNIT_FEEDBACK,
    name: 'UnitFeedback',
    meta: {
      title: '监控预警单位反馈'
    },
    component: () => import('@/views/main/handlingOfViolations/index.vue')
  },
  {
    path: RouterPathEnum().UNIT_AUDIT,
    name: 'UnitAudit',
    meta: {
      title: '监控预警单位审核'
    },
    component: () => import('@/views/main/handlingOfViolations/index.vue')
  },
  {
    path: RouterPathEnum().DEPARTMENT_AUDIT,
    name: 'DepartmentAudit',
    meta: {
      title: '监控预警主管部门初审'
    },
    component: () => import('@/views/main/handlingOfViolations/index.vue')
  },
  {
    path: RouterPathEnum().DEPARTMENT_REAUDIT,
    name: 'DepartmentReaudit',
    meta: {
      title: '监控预警主管部门复审'
    },
    component: () => import('@/views/main/handlingOfViolations/index.vue')
  },
  {
    path: RouterPathEnum().DIVISION_AUDIT,
    name: 'DivisionAudit',
    meta: {
      title: '监控预警处室初审'
    },
    component: () => import('@/views/main/handlingOfViolations/index.vue')
  },
  {
    path: RouterPathEnum().DIVISION_REAUDIT,
    name: 'DivisionReaudit',
    meta: {
      title: '监控预警处室复审'
    },
    component: () => import('@/views/main/handlingOfViolations/index.vue')
  },
  {
    path: RouterPathEnum().DIVISION_FEED_BACK,
    name: 'divisionFeedAudit',
    meta: {
      title: '监控预警业务处室反馈'
    },
    component: () => import('@/views/main/handlingOfViolations/index.vue')
  },
  {
    path: RouterPathEnum().DIVISION_FEED_AUDIT,
    name: 'divisionFeedAudit',
    meta: {
      title: '监控预警业务处室审核'
    },
    component: () => import('@/views/main/handlingOfViolations/index.vue')
  }
]

const routers = regulationClassOptions.reduce((preVal, curVal) => {
  preVal.push(
    ...templateRouters.map(item => {
      return {
        ...item,
        path: item.path + curVal.suffix,
        name: item.name + curVal.suffix
      }
    })
  )
  return preVal
}, [])

export default routers
