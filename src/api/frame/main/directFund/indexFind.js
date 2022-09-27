import { post } from '@/api/http'

/**
 * 获取指标数据
 * @param params
 * @return {Promise<unknown>}
 */
export function getData(params) {
  return post('dfr-monitor-service/dfr/bgtInfoQuery/querydf', params)
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
                        code: '001020201'
                      }
                    ]
                  },
                  {
                    name: '可执行指标管理',
                    code: '0010203',
                    children: [
                      {
                        name: '2022年本级可执行指标登记',
                        code: '001020301'
                      }
                    ]
                  },
                  {
                    name: '转移支付指标管理',
                    code: '0010206',
                    children: [
                      {
                        name: '2022年上级转移支付补助导入',
                        code: '001020601'
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      })
    }, 300)
  })
}

/**
 * 获取指标来源去向
 */
export function getIndexSourceGone(params) {
  return post('dfr-monitor-service/dfr/bgtInfoQuery/queryDetaildf', params)
}
