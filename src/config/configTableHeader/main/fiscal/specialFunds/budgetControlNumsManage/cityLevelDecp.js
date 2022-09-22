// 页面：专项资金预算管理 => 专项资金预算控制数管理 => 专项资金预算控制数分解（财政业务部门）
// 地市分解 (reportguid: 10092) 表头配置 张颖捷 2020-07-14 19:17
export const columns = [
  {
    title: '管理处室',
    field: 'management_department',
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
    title: '是否一般转移性支付',
    field: 'general_transfer_payment',
    width: 120
  },
  {
    title: '补助市县支出（各市含省管县）',
    field: 'subsidy_for_city_and_county_expenditure',
    width: 120
  },
  {
    title: '小计',
    field: 'subtotal',
    width: 120
  },
  {
    title: '西安',
    field: 'xi_an',
    width: 120
  },
  {
    title: '铜川',
    field: 'tongchuan',
    width: 120
  },
  {
    title: '宝鸡',
    field: 'baoji',
    width: 120
  },
  {
    title: '咸阳',
    field: 'xianyang',
    width: 120
  },
  {
    title: '渭南',
    field: 'weinan',
    width: 120
  },
  {
    title: '汉中',
    field: 'hanzhong',
    width: 120
  },
  {
    title: '安康',
    field: 'ankang',
    width: 120
  },
  {
    title: '商洛',
    field: 'shangluo',
    width: 120
  },
  {
    title: '延安',
    field: 'yan_an',
    width: 120
  },
  {
    title: '榆林',
    field: 'yulin',
    width: 120
  },
  {
    title: '杨凌',
    field: 'yangling',
    width: 120
  },
  {
    title: '西咸',
    field: 'xixian',
    width: 120
  },
  {
    title: '韩城',
    field: 'hancheng',
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
  cityLevelDecp: columns
}
