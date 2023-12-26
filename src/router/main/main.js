// 主菜单列表页面路由
const subRoutes = []
function importAll(r) {
  r.keys().forEach(
    key => subRoutes.push(r(key).default)
  )
}
importAll(require.context('./directFund', false, /.js$/))
importAll(require.context('./children', false, /.js$/))
importAll(require.context('./baseDataManage', false, /.js$/))
importAll(require.context('./fundMonitoring', false, /.js$/))
importAll(require.context('./indexFind', false, /.js$/))
importAll(require.context('./fujianLedge', false, /.js$/))
importAll(require.context('./handlingOfViolations', false, /.js$/))
importAll(require.context('./statisticAnalysis', false, /.js$/))
importAll(require.context('./monitoringSubjectAnalysis', false, /.js$/))
importAll(require.context('./specialMonitor', false, /.js$/))
importAll(require.context('./report', false, /.js$/))
importAll(require.context('./inventory', false, /.js$/))
importAll(require.context('./nationalDebtProject', false, /.js$/))

const MainRoute = {
  path: '/Main',
  name: 'Main',
  redirect: '',
  component: () => import('../../views/main/Index.vue'), // 主内容
  meta: {
    requireAuth: true
  },
  children: [
    {
      path: '/Home',
      name: 'Home',
      meta: {
        keepAlive: true,
        requireAuth: true
      },
      component: () => import('../../views/main/home/Home.vue') // 主内容
    },
    {
      path: '/HomeCard',
      name: 'HomeCard',
      meta: {
        keepAlive: true,
        requireAuth: true
      },
      component: () => import('../../views/main/home/HomeCard.vue') // 主内容
    },
    {
      path: '/FormTemplate', // test--template:Titans
      name: 'FormTemplate',
      meta: {
        keepAlive: true,
        requireAuth: true
      },
      component: () => import('../../views/test/template/FormTemplate.vue')
    },
    {
      path: '/TableManageSys', // 动态表头配置
      name: 'TableManageSys',
      meta: {
        keepAlive: true,
        requireAuth: true
      },
      component: () => import('../../views/manageSystem/table/Main.vue')
    },
    {
      path: '/Monitor', // test--template:Titans
      name: 'Monitor',
      meta: {
        // keepAlive: true,
        requireAuth: true
      },
      component: () => import('../../views/main/monitor/index.vue')
    }
  ]
}
MainRoute.children = MainRoute.children.concat(...subRoutes)
const MircoRoute = {
  path: window.__MICRO_APP_BASE_ROUTE__ || '/lmp', /** 根据项目运行的不同环境，设置路径的前缀 */
  name: window.__MICRO_APP_BASE_ROUTE__ || 'lmp',
  meta: {
    keepAlive: true,
    requireAuth: true
  },
  component: () => import('@/views/main/empty.vue'),
  children: []
}
MircoRoute.children = MircoRoute.children.concat(...subRoutes)
export { MainRoute, MircoRoute }
