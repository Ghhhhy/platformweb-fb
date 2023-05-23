/*
 * @Description:
 * @Author: 强子
 * @Date: 2023-03-03 16:39:13
 * @LastEditors: 罗景丹 luojingdan@bosssoft.com.cn
 * @LastEditTime: 2023-05-23 16:17:13
 */
export default [
  {
    path: '/datavReportSearch',
    name: 'datavReportSearch',
    meta: {
      keepAlive: true
    },
    component: () => import('../../../views/platformReport/DataReport/reportSearch.vue')
  }
]
