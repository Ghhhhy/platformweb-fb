// 页面：预算编制管理 => 预算管理 => 部门预算编报（预算单位） => 支出预算
// 页面：预算编制管理 => 预算确认 => 预算数据审阅（主管部门） => 支出预算
// 页面：预算编制管理 => 预算确认 => 预算数据审阅（资产处） => 支出预算
// 页面：预算编制管理 => 预算确认 => 预算数据审阅（业务处） => 支出预算
// 页面：预算编制管理 => 预算确认 => 预算绩效审核（绩效处） => 支出预算
// 页面：预算编制管理 => 预算确认 => 预算数据评审（评审中心） => 支出预算
// 页面：预算编制管理 => 预算确认 => 预算数据审阅（预算处） => 支出预算
// 本级项目支出预算表 表头配置  2020-7-14 09:34
// 负责人：黄丹
export const columns = [
  {
    title: '预算单位',
    field: 'agency_',
    width: '120'
  },
  {
    title: '项目类别',
    field: 'pro_cat_',
    width: '120'
  },
  {
    title: '支出项目类别',
    field: 'payout_kind_name',
    width: '120'
  },
  {
    title: '专项资金目录',
    field: 'spe_type_name',
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
    title: '政府预算经济分类',
    field: 'gov_bgt_eco_',
    width: '120'
  },
  {
    title: '部门预算经济分类',
    field: 'dep_bgt_eco_',
    width: '120'
  },
  {
    title: '是否政府采购',
    field: 'is_gov',
    width: '120'
  },
  {
    title: '是否新增资产配置',
    field: 'is_asset',
    width: '120'
  },
  {
    title: '是否有政府购买服务',
    field: 'is_govbuy',
    width: '120'
  },
  {
    title: '资金性质',
    field: 'fund_type_',
    width: '120'
  },
  {
    title: '资金来源',
    field: 'found_type_',
    width: '120'
  },
  {
    title: '预算金额',
    field: 'apply_up',
    width: '120'
  },
  {
    title: '公共预算拨款',
    field: 'f0001',
    width: '120'
  },
  {
    title: '专项资金项目',
    field: 'f0002',
    width: '120'
  },
  {
    title: '政府性基金拨款',
    field: 'f0003',
    width: '120'
  },
  {
    title: '事业收入',
    field: 'f0004',
    width: '120'
  },
  {
    title: '实户资金余额',
    field: 'f0005',
    width: '120'
  },
  {
    title: '事业单位经营收入',
    field: 'f0006',
    width: '120'
  },
  {
    title: '附属单位上缴收入',
    field: 'f0007',
    width: '120'
  },
  {
    title: '其他自有资金',
    field: 'f0008',
    width: '120'
  },
  {
    title: '上年结转',
    field: 'f0009',
    width: '120'
  }
]

export default {
  projectExpenditureBudget: columns
}
