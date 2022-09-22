// 页面：项目库管理 => 项目申报管理 => 转移支付项目申报、项目申报
// 专项资金二级-转移支付因素法 表头配置 张颖捷 2020-7-13 16:12
export const columns = [
  {
    title: '年度',
    field: 'year',
    width: 120
  },
  {
    title: '下级财政区划',
    field: 'down_mof_div_code',
    width: 120
  },
  {
    title: '申报金额',
    field: 'declaration_amt',
    width: 120
  }
]

// 页面：项目库管理 => 项目申报管理 => 人员及公用项目查看 => 查看详情
// 表头配置 黄丹 2020-7-21 21:06
export const projectFund = [
  {
    title: '年度',
    field: 'year',
    width: 'fit',
    align: 'center'
  },
  {
    title: '申报金额',
    field: 'declaration_amt',
    width: 'fit',
    align: 'center',
    cellRender: {
      disable: true,
      name: '$moneyRender',
      props: {
        type: 'float'
      }
    }
  }
]

export default {
  columns
}
