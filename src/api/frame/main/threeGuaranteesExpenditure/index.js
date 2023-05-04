import { post } from '@/api/http'

/**
 * 三公-整体情况
 * @return {*}
 */
export const overallSituation = () => {
  return post('large-monitor-platform/lmp/threeSafeReport/overallSituation')
}

/**
 * 三保-分类关注-分资金
 * @return {*}
 */
export const concernsByCapital = () => {
  return post('large-monitor-platform/lmp/threeSafeReport/concernsByCapital')
}

/**
 * 三保-分类关注-分类别
 * @return {*}
 */
export const concernsByType = () => {
  return post('large-monitor-platform/lmp/threeSafeReport/concernsByType')
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
        year: '规则1',
        data1: parseInt(Math.random() * 100),
        data2: parseInt(Math.random() * 100),
        data3: parseInt(Math.random() * 100),
        data4: parseInt(Math.random() * 100),
        data5: parseInt(Math.random() * 100),
        surplus: parseInt(Math.random() * 100),
        children: [
          {
            year: '规则1',
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
        year: '规则2',
        data1: parseInt(Math.random() * 100),
        data2: parseInt(Math.random() * 100),
        data3: parseInt(Math.random() * 100),
        data4: parseInt(Math.random() * 100),
        data5: parseInt(Math.random() * 100),
        surplus: -parseInt(Math.random() * 100)
      },
      {
        year: '规则3',
        data1: parseInt(Math.random() * 100),
        data2: parseInt(Math.random() * 100),
        data3: parseInt(Math.random() * 100),
        data4: parseInt(Math.random() * 100),
        data5: parseInt(Math.random() * 100),
        surplus: -parseInt(Math.random() * 100)
      },
      {
        year: '规则4',
        data1: parseInt(Math.random() * 100),
        data2: parseInt(Math.random() * 100),
        data3: parseInt(Math.random() * 100),
        data4: parseInt(Math.random() * 100),
        data5: parseInt(Math.random() * 100),
        surplus: parseInt(Math.random() * 100)
      }
    ]
  })
}
