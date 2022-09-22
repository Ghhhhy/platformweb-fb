// 页面：专项资金预算管理 => 专项资金预算编审 => 专项资金预算编制（主管部门）
// 页面：专项资金预算管理 => 专项资金预算编审 => 专项资金预算编制（业务处）
// 页面：专项资金预算管理 => 专项资金预算编审 => 专项资金预算编制（绩效处）
// 页面：专项资金预算管理 => 专项资金预算编审 => 专项资金预算编制（预算处）
// 纳入部门预算-项目预算明细 (reportguid: 12585) 表头配置 张颖捷 2020-07-14 19:33
export const columns = [
  {
    title: '预算单位',
    field: 'agency_',
    width: 120
  },
  {
    title: '项目编码',
    field: 'pro_code',
    width: 120
  },
  {
    title: '项目名称',
    field: 'pro_name',
    width: 120
  },
  {
    title: '支出功能分类',
    field: 'exp_func_',
    width: 120
  },
  {
    title: '政府预算经济分类',
    field: 'govexpeco',
    width: 120
  },
  {
    title: '部门预算经济分类',
    field: 'exp_eco_',
    width: 120
  },
  {
    title: '政府采购',
    field: 'is_gov',
    width: 120
  },
  {
    title: '政府购买服务',
    field: 'is_govbuy',
    width: 120
  },
  {
    title: '是否新增资产',
    field: 'is_newproperty',
    width: 120
  },
  {
    title: '控制数',
    field: 'canresolve_sum',
    width: 120
  },
  {
    title: '合计',
    field: 'total',
    width: 120
  },
  {
    title: '专项资金项目（省级）',
    field: 'mof_app_spcl_bgt_pro',
    width: 120
  },
  {
    title: '专项资金项目（中央）',
    field: 'mof_app_spcl_bgt_cen',
    width: 120
  },
  {
    title: '政府性基金拨款（省级）',
    field: 'mof_app_gov_fund_pro',
    width: 120
  },
  {
    title: '专项资金项目（中央）',
    field: 'mof_app_gov_fund_cen',
    width: 120
  }
]
export default {
  bringInDeptBudget: columns
}
