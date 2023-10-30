/*
 * @Author: hupengcheng 1286335855@qq.com
 * @Date: 2023-10-19 11:33:16
 * @LastEditors: hupengcheng 1286335855@qq.com
 * @LastEditTime: 2023-10-22 16:59:29
 * @FilePath: \platformweb-fb\src\views\main\fundMonitoring\benefitDistributionRegion\benefitDistributionRegion.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

// 转化为金额展示
function fmoney(s, n) {
  n = n > 0 && n <= 20 ? n : 2
  s = parseFloat((s + '').replace(/[^\d.-]/g, '')).toFixed(n) + ''
  let l = s.split('.')[0].split('').reverse()
  let r = s.split('.')[1]
  let t = ''
  for (let i = 0; i < l.length; i++) {
    t += l[i] + ((i + 1) % 3 === 0 && (i + 1) !== l.length ? ',' : '')
  }
  return t.split('').reverse().join('') + '.' + r
}
export let proconf = {
  tableColumnsConfig: [
    {
      title: '资金名称',
      treeNode: true,
      fixed: 'left',
      align: 'left',
      width: 200,
      field: 'cenTraProName',
      cellRender: {
        name: '$vxeIcon'
      }
    },
    {
      title: '地区名称',
      width: 200,
      field: 'mofDivName',
      align: 'right',
      type: 'amountSnjxd',
      cellRender: { name: '$vxeInput' }
    },
    {
      title: '利民',
      width: 260,
      align: 'center',
      children: [
        {
          title: '笔数',
          align: 'right',
          // cellRender: { name: '$vxeInput' },
          width: 200,
          field: 'count',
          slots: {
            default({ row }) {
              return [
                (row.count ? <a>{fmoney(row.count, 2)}</a> : '')
              ]
            }
          }
          // formula: '{amountSnjpay}+{amountSjpay}+{amountXjpay}'
        },
        {
          title: '金额',
          align: 'right',
          width: 200,
          field: 'money',
          formula: '({count}*2)',
          // formula: '({amountZyxd2}-0==0)?0:({amountPayAll}/{amountZyxd2}*100)'
          slots: {
            default({ row }) {
              return [
                <a>{row.money}</a>
              ]
            }
          }
        }
      ]
    },
    {
      title: '惠企',
      width: 200,
      align: 'center',
      children: [
        {
          title: '民企',
          width: 200,
          field: 'privateEnterprise',
          align: 'right',
          cellRender: { name: '$vxeMoney' },
          children: [
            {
              title: '笔数',
              align: 'right',
              width: 200,
              field: 'privateEnterpriseCount'
            },
            {
              title: '金额',
              align: 'right',
              width: 200,
              field: 'privateEnterpriseMoney'
            }
          ]
        },
        {
          title: '国企',
          field: 'countryEnterprise',
          width: 200,
          align: 'right',
          cellRender: { name: '$vxeMoney' },
          children: [
            {
              title: '笔数',
              align: 'right',
              width: 200,
              field: 'countryEnterpriseCount'
            },
            {
              title: '金额',
              align: 'right',
              width: 200,
              field: 'countryEnterpriseMoney'
            }
          ]
        },
        {
          title: '重点企业',
          field: 'importantEnterprise',
          width: 200,
          align: 'right',
          cellRender: { name: '$vxeInput' },
          children: [
            {
              title: '笔数',
              align: 'right',
              width: 200,
              field: 'importantEnterpriseCount'
            },
            {
              title: '金额',
              align: 'right',
              width: 200,
              field: 'importantEnterpriseMoney'
            }
          ]
        }
      ]
    }
  ]
}
