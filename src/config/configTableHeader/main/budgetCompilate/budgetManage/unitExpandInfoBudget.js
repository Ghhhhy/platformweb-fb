// 页面：预算编制管理 => 预算管理 => 部门预算编报（预算单位） => 基础信息
// 页面：预算编制管理 => 预算确认 => 预算数据审阅（主管部门） => 基础信息
// 页面：预算编制管理 => 预算确认 => 预算数据审阅（资产处） => 基础信息
// 页面：预算编制管理 => 预算确认 => 预算数据审阅（业务处） => 基础信息
// 页面：预算编制管理 => 预算确认 => 预算绩效审核（绩效处） => 基础信息
// 页面：预算编制管理 => 预算确认 => 预算数据评审（评审中心） => 基础信息
// 页面：预算编制管理 => 预算确认 => 预算数据审阅（预算处） => 基础信息
// 单位扩展信息 表头配置  2020-7-14 09:14
// 负责人：黄丹
export const columns = [
  {
    title: '实有在编人数',
    field: 'actunow_staf_num',
    width: '120'
  },
  {
    title: '实有人数',
    field: 'actu_staf_num',
    width: '120'
  },
  {
    title: '--',
    field: '--',
    width: '120'
  },
  {
    title: '行政编制数',
    field: 'admin_staf_num',
    width: '120'
  },
  {
    title: '事业编制数',
    field: 'inst_staf_num',
    width: '120'
  },
  {
    title: '工勤人员编制数',
    field: 'worker_staf_num',
    width: '120'
  }
]

export default {
  unitExpandInfoBudget: columns
}
