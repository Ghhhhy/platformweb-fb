// 页面：预算编制管理 => 部门预算控制数 => 预算控制数（预算处） => 修订轨迹
// 页面：预算编制管理 => 部门预算控制数 => 预算控制数（主管部门）=> 修订轨迹
// 陕西省本级控制数 (reportguid: 246551) 表头配置 张颖捷 2020-07-14 19:45
export const revisedTrackColumns = [
  // {
  //   title: '内部机构',
  //   field: 'mof_dep_name',
  //   align: 'left',
  //   width: 120
  // },
  // {
  //   title: '主管部门',
  //   field: 'capital_type_name',
  //   align: 'left',
  //   width: 120
  // },
  // {
  //   title: '单位编码',
  //   field: 'agency_code',
  //   align: 'left',
  //   width: 120
  // },
  // {
  //   title: '单位名称',
  //   field: 'agency_name',
  //   align: 'left',
  //   width: 120
  // },
  {
    title: '操作类型',
    field: 'operationtypes',
    align: 'center',
    width: 120
  },
  {
    title: '操作项',
    field: 'celldesc',
    align: 'left',
    width: 180
  },
  {
    title: '旧值',
    field: 'prevalue',
    align: 'right',
    width: 100,
    formatter: 'formatMoney',
    cellRender: {
      name: '$moneyRender',
      defaultValue: 0
    }
  },
  {
    title: '修改值',
    field: 'newvalue',
    align: 'right',
    width: 100,
    formatter: 'formatMoney',
    cellRender: {
      name: '$moneyRender',
      defaultValue: 0
    }
  },
  {
    title: '修改人',
    field: 'lastuser',
    align: 'left',
    width: 120
  },
  {
    title: '修改时间',
    field: 'lasttime',
    align: 'center',
    width: 150
  }
]
export default {
  shannxiBudgetControlNum: revisedTrackColumns
}
