// 页面：项目库管理 => 人员公用项目管理 => 项目确认（预算单位）
// 页面：项目库管理 => 人员公用项目管理 => 项目确认（主管部门）
// 修改记录 表头配置  2020-7-13 16:44
// 负责人：黄丹
export const columns = [
  {
    title: '修改项',
    field: 'field',
    width: '120'
  },
  {
    title: '原值',
    field: 'old_val',
    width: '120'
  },
  {
    title: '修改值',
    field: 'new_val',
    width: '120'
  },
  {
    title: '操作人',
    field: 'lastuser',
    width: '120'
  },
  {
    title: '操作时间',
    field: 'create_time',
    width: '120'
  }
]

export default {
  updateRecord: columns
}
