// 页面：预算编制管理 => 预算管理 => 部门预算编报（预算单位） => 支出预算
// 页面：预算编制管理 => 预算确认 => 预算数据审阅（主管部门） => 支出预算
// 页面：预算编制管理 => 预算确认 => 预算数据审阅（资产处） => 支出预算
// 页面：预算编制管理 => 预算确认 => 预算数据审阅（业务处） => 支出预算
// 页面：预算编制管理 => 预算确认 => 预算绩效审核（绩效处） => 支出预算
// 页面：预算编制管理 => 预算确认 => 预算数据评审（评审中心） => 支出预算
// 页面：预算编制管理 => 预算确认 => 预算数据审阅（预算处） => 支出预算
// 政府采购预算汇总表 表头配置  2020-7-14 09:34
// 负责人：黄丹
export const columns = [
  {
    title: '预算单位',
    field: 'agency_',
    width: '120'
  },
  {
    title: '项目编码',
    field: 'pro_code',
    width: '120'
  },
  {
    title: '项目名称',
    field: 'pro_name',
    width: '120'
  },
  {
    title: '支出功能分类',
    field: 'exp_func_',
    width: '120'
  },
  {
    title: '部门预算经济分类',
    field: 'dep_bgt_eco_',
    width: '120'
  },
  {
    title: ' 政府预算经济分类',
    field: 'gov_bgt_eco_',
    width: '120'
  },
  {
    title: '政府采购品目代码',
    field: 'gpdir_',
    width: '120'
  },
  {
    title: '计量单位',
    field: 'measmt_unit',
    width: '120'
  },
  {
    title: '单价',
    field: 'price',
    width: '120'
  },
  {
    title: '采购数量',
    field: 'pur_qua',
    width: '120'
  },
  {
    title: '采购金额',
    field: 'pur_amt',
    width: '120'
  },
  {
    title: '业务类型代码',
    field: 'busi_type',
    width: '120'
  },
  {
    title: '资金性质代码',
    field: 'fund_type_',
    width: '120'
  },
  {
    title: '调整批次号',
    field: 'adj_batch_no',
    width: '120'
  }
]

export default {
  governmentProcurementBudgetSummary: columns
}
