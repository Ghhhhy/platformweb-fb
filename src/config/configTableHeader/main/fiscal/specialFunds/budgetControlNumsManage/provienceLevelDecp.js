// 页面：专项资金预算管理 => 专项资金预算控制数管理 => 专项资金预算控制数分解（财政业务部门）
// 省本级分解 (reportguid: 10091) 表头配置 张颖捷 2020-07-14 19:03
export const columns = [
  {
    title: '资金主管处室',
    field: 'mof_dep_name',
    width: 120
  },
  {
    title: '专项资金名称',
    field: 'spe_name',
    width: 120
  },
  {
    title: '省级主管部门',
    field: 'dept_name',
    width: 120
  },
  {
    title: '预算单位',
    field: 'agency_',
    width: 120
  },
  {
    title: '项目名称',
    field: 'pro_',
    width: 120
  },
  {
    title: '支出功能分类（项）',
    field: 'exp_func_',
    width: 120
  },
  {
    title: '部门经济分类',
    field: 'exp_eco_',
    width: 120
  },
  {
    title: '政府经济分类（款）',
    field: 'govexpeco',
    width: 120
  },
  {
    title: '可分解合计',
    field: 'canresolve_sum',
    width: 120
  },
  {
    title: '编入部门预算数',
    field: 'br_budget_num',
    width: 120
  },
  {
    title: '已办文下达',
    field: 'done_w_down',
    width: 120
  },
  {
    title: '待分解',
    field: 'unresolve',
    width: 120
  },
  {
    title: '备注',
    field: 'remark',
    width: 120
  }
]
export default {
  provienceLevelDecp: columns
}
