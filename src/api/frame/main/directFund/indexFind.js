import { post } from '@/api/http'

/**
 * 待分配指标列表
 * @param params
 * @return {Promise<unknown>}
 */
export function querydf(params) {
  return post('dfr-monitor-service/dfr/bgtInfoQuery/querydf', params)
}

/**
 * 待分配指标来源去向
 * @param params
 * @return {Promise<unknown>}
 */
export function queryDetaildf(params) {
  return post('dfr-monitor-service/dfr/bgtInfoQuery/queryDetaildf', params)
}

/**
 * 本级可执行指标列表
 * @param params
 * @return {Promise<unknown>}
 */
export function querykzx(params) {
  return post('dfr-monitor-service/dfr/bgtInfoQuery/querykzx', params)
}

/**
 * 本级可执行指标来源去向
 * @param params
 * @return {Promise<unknown>}
 */
export function queryDetailkzx(params) {
  return post('dfr-monitor-service/dfr/bgtInfoQuery/queryDetailkzx', params)
}

/**
 * 获取指标树
 * @return {Promise<unknown>}
 */
export function getIndexFindTree() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: [
          {
            name: '指标系统',
            code: '001',
            children: [
              {
                name: '预算执行',
                code: '00102',
                children: [
                  {
                    name: '处室待分配指标管理',
                    code: '0010202',
                    children: [
                      {
                        name: '2022年待分配指标登记',
                        code: '001020201',
                        request: {
                          list: querydf,
                          detail: queryDetaildf
                        }
                      }
                    ]
                  },
                  {
                    name: '可执行指标管理',
                    code: '0010203',
                    children: [
                      {
                        name: '2022年本级可执行指标登记',
                        code: '001020301',
                        request: {
                          list: querykzx,
                          detail: queryDetailkzx
                        }
                      }
                    ]
                  }
                  // {
                  //   name: '转移支付指标管理',
                  //   code: '0010206',
                  //   children: [
                  //     {
                  //       name: '2022年上级转移支付补助导入',
                  //       code: '001020601'
                  //     }
                  //   ]
                  // }
                ]
              }
            ]
          }
        ],
        code: '000000'
      })
    }, 300)
  })
}
