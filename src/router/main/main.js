import directFund from './directFund/directFund'

// 主菜单列表页面路由
const subRoutes = []
function importAll(r) {
  r.keys().forEach(
    key => subRoutes.push(r(key).default)
  )
}
importAll(require.context('./children', false, /.js$/))
importAll(require.context('./baseDataManage', false, /.js$/))
importAll(require.context('./fundMonitoring', false, /.js$/))
importAll(require.context('./indexFind', false, /.js$/))
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
      path: '/Monitor', // test--template:Titans
      name: 'Monitor',
      meta: {
        // keepAlive: true,
        requireAuth: true
      },
      component: () => import('../../views/main/monitor/index.vue')
    },
    ...directFund

  ]
}
MainRoute.children = MainRoute.children.concat(...subRoutes)

export default MainRoute
