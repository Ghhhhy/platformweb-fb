// 页面：专项资金预算管理 => 专项资金预算控制数管理 => 专项资金预算控制数分解（财政业务部门）
// 待分解专项资金 (reportguid: 10087) 表头配置 张颖捷 2020-07-14 19:06
export const columns = [
  {
    title: '资金归属处室',
    field: 'found_belong_dept',
    width: 120
  },
  {
    title: '专项资金目录',
    field: 'special_fund_catalog',
    width: 120
  },
  {
    title: '主管部门',
    field: 'dept',
    width: 120
  },
  {
    title: '预算下达控制室',
    field: 'budget_down_room',
    width: 120
  },
  {
    title: '已分解控制数',
    field: 'resolved_control_num',
    width: 120
  },
  {
    title: '待分解控制数',
    field: 'unresolve_control_num',
    width: 120
  }
]
export default {
  specFundToBeDecp: columns
}
