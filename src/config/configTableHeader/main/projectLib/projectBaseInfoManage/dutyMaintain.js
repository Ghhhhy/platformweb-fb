// 页面：项目库管理 => 项目基础信息管理 => 职能职责维护
// 职能职责维护表  表头配置  2020-7-13 15:36
// 负责人：黄丹
export const columns = [
  {
    title: '主管部门',
    field: 'bgt_dept_',
    sortable: true,
    align: 'left',
    editRender: {
      name: '$treeText'
    }

  },
  {
    title: '职能职责代码',
    field: 'fun_res_code',
    align: 'right',
    sortable: true
  },
  {
    title: '职能职责名称',
    field: 'fun_res_name',
    align: 'left'
  },
  {
    title: '职能职责描述',
    field: 'fun_res_des',
    align: 'left'
  },
  {
    title: '职能职责目标',
    field: 'fun_resc_target',
    align: 'left'
  },
  {
    title: '启用状态',
    field: 'is_enable',
    align: 'left',
    formatter: (value, column) => {
      return value.cellValue === 1 ? '是' : '否'
    }
  }
]

export default {
  dutyMaintain: columns
}
