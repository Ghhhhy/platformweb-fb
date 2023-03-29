import Vue from 'vue'
import VueRouter from 'vue-router'
import main from './main/main.js'
import test from './test.js'
import handlingOfViolations from '@/router/main/handlingOfViolations/index.js'
Vue.use(VueRouter)

const handlingOfViolationsRouters = []
// iframe环境（因项目存在嵌入到其他系统，因此把这块路由提到顶级）
if (window.self !== window.top) {
  handlingOfViolationsRouters.push(...handlingOfViolations)
} else {
  main.children.push(...handlingOfViolations)
}
const routes = [
  ...test,
  {
    path: '/'
    // redirect: 'Main'
  },
  {
    path: '/Login',
    name: 'Login',
    component: () => import('../views/loginModule/Login.vue') // 登录
  },
  {
    path: '/Portal',
    name: 'Portal',
    component: () => import('../views/portal/Index.vue') // 主页
  },
  {
    ...main
  },
  ...handlingOfViolationsRouters,
  {
    path: '/Template', // test--template:Titans
    name: 'Template',
    component: () => import('../views/test/template/FormTemplate.vue')
  },
  {
    path: '/BlankTemplate', // test--blankTemplate:Titans
    name: 'BlankTemplate',
    component: () => import('../views/test/blankTemplate/index.vue')
  },
  {
    path: '/FineReportTemplate', // test--FineReportTemplate:chj
    name: 'FineReportTemplate',
    component: () => import('../views/test/FineReportTemplate/index.vue')
  },
  {
    path: '/testTree', // test--upload:Comer
    name: 'testTree',
    component: () => import('../views/test/tree/testBsTree.vue')
  },
  {
    path: '/testTreeInput', // test--upload:Comer
    name: 'testTreeInput',
    component: () => import('../views/test/tree/testInput.vue')
  },
  {
    path: '/Testfrom', // test--testform:Titans
    name: 'TestForm',
    component: () => import('../views/test/form/test.vue')
  },
  {
    path: '/testUpload', // test--upload:Comer
    name: 'testUpload',
    component: () => import('../views/test/upload/test.vue')
  },
  {
    path: '/testTable',
    name: 'testTable',
    component: () => import('../views/test/table/test.vue')
  }
]

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
const router = new VueRouter({
  routes
})

export default router
