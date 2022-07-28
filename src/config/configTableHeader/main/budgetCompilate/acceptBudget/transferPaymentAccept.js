// 页面：预算编制管理 => 接受上级转移支付预算 => 省级接受上级支付预算（预算处（科））
// 页面：预算编制管理 => 接受上级转移支付预算 => 市县接收上级转移支付预算(预算处(科))
// 转移支付接收表 表头配置 张颖捷 2020-7-14 09:52
export const columns = [
  {
    title: '上级指标文号',
    field: 'sup_bgt_doc_no',
    width: 120
  },
  {
    title: '指标文标题',
    field: 'bgt_doc_title',
    width: 120
  },
  {
    title: '指标说明',
    field: 'bgt_dec',
    width: 120
  },
  {
    title: '项目',
    field: 'pro_',
    width: 120
  },
  {
    title: '资金性质',
    field: 'fund_type_',
    width: 120
  },
  {
    title: '收入分类科目',
    field: 'income_sort_',
    width: 120
  },
  {
    title: '转移支付功能分类科目',
    field: 'tp_func_',
    width: 120
  },
  {
    title: '支出功能分类科目',
    field: 'exp_func_',
    width: 120
  },
  {
    title: '政府支出经济分类',
    field: 'gov_bgt_eco_',
    width: 120
  },
  {
    title: '指标金额',
    field: 'amount',
    width: 120
  },
  {
    title: '来源方财政区划',
    field: 'ori_div_code',
    width: 120
  },
  {
    title: '确认时间',
    field: 'receive_time',
    width: 120
  },
  {
    title: '预算级次代码',
    field: 'budget_level_',
    width: 120
  }
]

export default {
  transferPaymentAccept: columns
}
