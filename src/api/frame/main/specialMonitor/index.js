import { post } from '@/api/http'

/**
 * 预警数量top5
 * @return {*}
 */
export const warningTop5ByCategory = (params) => {
  return post('large-monitor-platform/lmp/warnInfo/queryWarningTop5ByCategory', params)
}

/**
 * 我的预警处理
 * @return {*}
 */
export const myWarningPresentStation = (params) => {
  return post('large-monitor-platform/lmp/warnInfo/queryMyWarningPresentStation', params)
}

/**
 * 三保-分类关注-分类别
 * @return {*}
 */
export const concernsByType = (params) => {
  return post('large-monitor-platform/lmp/threeSafeReport/concernsByType', params)
}

/**
 * “三保”支出与库款对比情况
 * @return {*}
 */
export const treasuryComparison = () => {
  return post('large-monitor-platform/lmp/threeSafeReport/treasuryComparison')
}

/**
 * “三保”支出与财力对比情况
 * @return {*}
 */
export const comparison = () => {
  // return post('lmp/threeSafeReport/comparison')
  return Promise.resolve({
    data: [
      {
        year: '第一季度',
        data1: parseInt(Math.random() * 100),
        data2: parseInt(Math.random() * 100),
        data3: parseInt(Math.random() * 100),
        data4: parseInt(Math.random() * 100),
        data5: parseInt(Math.random() * 100),
        surplus: parseInt(Math.random() * 100),
        children: [
          {
            year: '第一季度',
            data1: parseInt(Math.random() * 100),
            data2: parseInt(Math.random() * 100),
            data3: parseInt(Math.random() * 100),
            data4: parseInt(Math.random() * 100),
            data5: parseInt(Math.random() * 100),
            surplus: parseInt(Math.random() * 100)
          },
          {
            year: '第一季度',
            data1: parseInt(Math.random() * 100),
            data2: parseInt(Math.random() * 100),
            data3: parseInt(Math.random() * 100),
            data4: parseInt(Math.random() * 100),
            data5: parseInt(Math.random() * 100),
            surplus: parseInt(Math.random() * 100)
          },
          {
            year: '第一季度',
            data1: parseInt(Math.random() * 100),
            data2: parseInt(Math.random() * 100),
            data3: parseInt(Math.random() * 100),
            data4: parseInt(Math.random() * 100),
            data5: parseInt(Math.random() * 100),
            surplus: parseInt(Math.random() * 100)
          }
        ]
      },
      {
        year: '第二季度',
        data1: parseInt(Math.random() * 100),
        data2: parseInt(Math.random() * 100),
        data3: parseInt(Math.random() * 100),
        data4: parseInt(Math.random() * 100),
        data5: parseInt(Math.random() * 100),
        surplus: -parseInt(Math.random() * 100)
      },
      {
        year: '第三季度',
        data1: parseInt(Math.random() * 100),
        data2: parseInt(Math.random() * 100),
        data3: parseInt(Math.random() * 100),
        data4: parseInt(Math.random() * 100),
        data5: parseInt(Math.random() * 100),
        surplus: -parseInt(Math.random() * 100)
      }
    ]
  })
}
