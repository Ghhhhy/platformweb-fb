// import { post } from '@/api/http'

/**
 * 获取指标数据
 * @param params
 * @return {Promise<unknown>}
 */
export function getData(params) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: {
          records: [
            {
              column1: '07-社会保障处',
              column2: '',
              column3: '城乡居民基本医疗保险',
              column4: '2022年',
              column5: 6700100000,
              column6: '',
              column7: '2101202-财政',
              column8: '03-执行变动',
              column9: '1101-一般公共预算',
              column10: '0-否',
              column11: '财社（2011）162号',
              olumn12: '城乡居民基本医疗保险补助',
              column13: '否'
            }
          ],
          total: 1
        }
      })
    }, 300)
  })
}

/**
 * 获取指标数
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
export function getIndexSourceGone() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: [
          {
            column1: '内财社（2022）711号',
            column2: '[409004]',
            column3: '医疗服务与保障',
            column4: '医疗服务与保障',
            column5: '21015-信息化建设',
            column6: 11000899,
            column7: 11000899,
            column8: 0,
            column9: 0,
            column10: '0-否',
            column11: '07-社会保障处',
            olumn12: '03-执行变动',
            column13: '1101。一般公共预算',
            column14: '2022年',
            column15: '财社（2022）',
            column16: '医疗服务与保障',
            column17: '【中央】医疗服务与保障能力',
            column18: '国库集中支付'
          }
        ]
      })
    }, 300)
  })
}
