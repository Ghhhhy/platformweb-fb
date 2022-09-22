// 页面：专项资金预算管理 => 专项资金预算控制数管理 => 专项资金预算控制数分解（财政业务部门）
// 全部专项资金 (reportguid: 10086) 表头配置 张颖捷 2020-07-14 18:50
export const columns = [
  {
    title: '资金归属处室',
    field: 'mof_dep_name'
  },
  {
    title: '专项资金目录',
    field: 'spe_name'
  },
  {
    title: '主管部门',
    field: 'dept_name'
  },
  {
    title: '预算分类',
    field: 'budget_type',
    editRender: {
      name: '$treeinput',
      props: {
        isServer: true,
        elecode: 'vw_special_type',
        queryparams: {
          eleCode: 'vw_special_type',
          sxspecroleguid: '3250FC3332E1421DA1B0388AA0D34BDC'
        }
      }
    }
  },
  {
    title: '预算下达控制数',
    field: 'control'
  },
  {
    title: '已分解控制数',
    field: 'resolved_control'
  },
  {
    title: '待分解控制数',
    field: 'unresolve_control',
    editRender: { name: 'input' }
  }
]
export default {
  allSpecFund: columns
}
