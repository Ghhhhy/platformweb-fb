// 页面：预算编制管理 => 预算管理 => 部门预算编报（预算单位） => 支出预算
// 页面：预算编制管理 => 预算确认 => 预算数据审阅（主管部门） => 支出预算
// 页面：预算编制管理 => 预算确认 => 预算数据审阅（资产处） => 支出预算
// 页面：预算编制管理 => 预算确认 => 预算数据审阅（业务处） => 支出预算
// 页面：预算编制管理 => 预算确认 => 预算绩效审核（绩效处） => 支出预算
// 页面：预算编制管理 => 预算确认 => 预算数据评审（评审中心） => 支出预算
// 页面：预算编制管理 => 预算确认 => 预算数据审阅（预算处） => 支出预算
// 会议费预算表 表头配置  2020-7-14 09:34
// 负责人：黄丹
export const columns = [
  {
    title: '单位编码',
    field: 'agency_',
    width: '200'
  },
  {
    title: '会议名称',
    field: 'cc2',
    width: '200'
  },
  {
    title: '项目名称',
    field: 'pro_name',
    width: '120'
  },
  {
    title: '开始时间',
    field: 'cc4',
    width: '120'
  },
  {
    title: '会议类别',
    field: 'cc5',
    width: '120'
  },
  {
    title: '会议代表人数（人）',
    field: 'cc6',
    width: '120'
  },
  {
    title: '工作人员数（人）',
    field: 'cc7',
    width: '120'
  },
  {
    title: '会议地点（市、区）',
    field: 'cc8',
    width: '120'
  },
  {
    title: '会议场所名称（饭店）',
    field: 'cc9',
    width: '120'
  },
  {
    title: '会议天数（天）',
    field: 'cc10',
    width: '120'
  },
  {
    title: '会议费支出安排（万元）',
    field: '无',
    width: '120'
  },
  {
    title: '会议费支出安排（万元）',
    field: '无',
    width: '120'
  },
  {
    title: '资金来源（万元）',
    field: '无',
    width: '120'
  },
  {
    title: '召开理由和依据',
    field: 'cc20',
    width: '120'
  },
  {
    title: '项目编码',
    field: 'pro_code',
    width: '120'
  }
]

export default {
  conferenceFee: columns
}
