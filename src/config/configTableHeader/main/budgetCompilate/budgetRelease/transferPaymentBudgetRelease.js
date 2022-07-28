// 页面：预算编制管理 => 预算下达 => 提前下达转移支付预算（业务处）
// 转移支付预算（下达） 表头配置 张颖捷 2020-7-14 10:06
export const columns = [
  {
    title: '预算单位',
    field: 'agency_name',
    width: 120
  },
  {
    title: '项目名称',
    field: 'pro_name',
    width: 120
  },
  {
    title: '功能科目',
    field: 'exp_func_code',
    width: 120
  },
  {
    title: '经济科目',
    field: 'gov_bgt_eco_code',
    width: 120
  },
  {
    title: '资金来源',
    field: 'fundsource',
    width: 120
  },
  {
    title: '总金额',
    field: 'apply_up',
    width: 120
  },
  {
    title: '已下达金额',
    field: 'checkedamt',
    width: 120
  },
  {
    title: '未下达金额',
    field: 'cur_amt',
    width: 120
  },
  {
    title: '已下达百分比',
    field: 'planper',
    width: 120
  }
]

export default {
  transferPaymentBudgetRelease: columns
}
