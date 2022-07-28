// 页面：专项资金预算管理 => 专项资金预算控制数管理 => 专项资金预算控制数分解（财政业务部门）
// 专项资金分解汇总 (reportguid: 10090) 表头配置 张颖捷 2020-07-14 19:21
export const columns = [
  {
    title: '厅内管理处室',
    field: 'office_management_office',
    width: 120
  },
  {
    title: '省级主管部门',
    field: 'provincial_authorities',
    width: 120
  },
  {
    title: '专项资金名称',
    field: 'name_of_special_fund',
    width: 120
  },
  {
    title: '支出功能分类科目编码（项级）',
    field: 'expense_function_ledger_account_code ',
    width: 120
  },
  {
    title: '政府经济分类科目代码（款级）',
    field: 'gov_economic_classification_subject_code',
    width: 120
  },
  {
    title: '预算分类',
    field: 'budget_classification',
    width: 120
  },
  {
    title: '2020年分配结果',
    field: 'distribution_results',
    width: 120
  },
  {
    title: '合计',
    field: 'total',
    width: 120
  },
  {
    title: '省本级',
    field: 'provincial_level',
    width: 120
  },
  {
    title: '小计',
    field: 'subtotal',
    width: 120
  },
  {
    title: '编入部门预算',
    field: 'put_into_department_budget',
    width: 120
  },
  {
    title: '已办文下达',
    field: 'issued_documents',
    width: 120
  },
  {
    title: '待分解',
    field: 'to_be_decomposed',
    width: 120
  },
  {
    title: '补助市县明细',
    field: 'details_of subsidy_to_cities_and_counties',
    width: 120
  },
  {
    title: '小计',
    field: 'subtotal',
    width: 120
  },
  {
    title: '已落实地区数',
    field: 'number_of_districts_implemented',
    width: 120
  },
  {
    title: '待分解',
    field: 'to_be_decomposed',
    width: 120
  },
  {
    title: '备注',
    field: '"remarks"',
    width: 120
  }
]
export default {
  specFundDecpStat: columns
}
