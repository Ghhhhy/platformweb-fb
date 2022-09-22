// 页面：预算编制管理 => 预算确认 => 状态转换
// 系统状态转换表 表头配置  2020-7-14 11:41
// 负责人：黄丹
export const columns = [
  {
    title: '单位编码',
    field: 'agencycode',
    width: '120'
  },
  {
    title: '单位名称',
    field: 'agencyname',
    width: '120'
  }
]

export default {
  systemStateTransition: columns
}
