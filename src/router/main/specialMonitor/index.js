const routers = [
  /*
 * 专项监控分析 - 监控预警总览
 */
  {
    path: '/DepartmentView', // 监控处室
    name: 'DepartmentView',
    component: () => import('@/views/specialMonitor/overView/departmentView/index.vue')
  },
  {
    path: '/ManagerView', // 主管处室
    name: 'ManagerView',
    component: () => import('@/views/specialMonitor/overView/departmentView/index.vue')
  },
  {
    path: '/UnitView', // 单位
    name: 'UnitView',
    component: () => import('@/views/specialMonitor/overView/departmentView/index.vue')
  },
  /*
 * 监控项目管理
 */
  {
    path: '/MonitoringProjectManagement',
    name: 'MonitoringProjectManagement',
    component: () => import('@/views/specialMonitor/MonitoringProjectManagement/MonitoringProjectManagement.vue')
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
