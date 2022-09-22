// 页面：预算编制管理 => 预算管理 => 部门预算编报（预算单位） => 支出预算
// 页面：预算编制管理 => 预算确认 => 预算数据审阅（主管部门） => 支出预算
// 页面：预算编制管理 => 预算确认 => 预算数据审阅（资产处） => 支出预算
// 页面：预算编制管理 => 预算确认 => 预算数据审阅（业务处） => 支出预算
// 页面：预算编制管理 => 预算确认 => 预算绩效审核（绩效处） => 支出预算
// 页面：预算编制管理 => 预算确认 => 预算数据评审（评审中心） => 支出预算
// 页面：预算编制管理 => 预算确认 => 预算数据审阅（预算处） => 支出预算
// 培训费预算表 表头配置  2020-7-14 09:34
// 负责人：黄丹
export const columns = [
  {
    title: '单位编码',
    field: 'agency_',
    width: '120'
  },
  {
    title: '单位批准文号',
    field: 'cc24',
    width: '120'
  },
  {
    title: '项目名称',
    field: 'pro_name',
    width: '120'
  },
  {
    title: '培训名称',
    field: 'cc26',
    width: '200'
  },
  {
    title: '培训内容',
    field: 'cc27',
    width: '200'
  },
  {
    title: '开始时间',
    field: 'cc4',
    width: '120'
  },
  {
    title: '培训地点',
    field: 'cc29',
    width: '120'
  },
  {
    title: '参训人数',
    field: 'cc30',
    width: '120'
  },
  {
    title: '培训费支出安排（万元）',
    field: '无',
    width: '120'
  },
  {
    title: '培训天数（天）',
    field: 'cc31',
    width: '120'
  },
  {
    title: '授课老师（人）',
    field: 'cc32',
    width: '120'
  },
  {
    title: '总计（万元）',
    field: 'cc35rp1',
    width: '120'
  },
  {
    title: '其他（万元）',
    field: 'cc38rp1',
    width: '120'
  },
  {
    title: '培训费支出安排（万元）',
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
    field: 'cc20rp1',
    width: '120'
  },
  {
    title: '项目编码',
    field: 'pro_code',
    width: '120.00'
  }
]

export default {
  trainingFee: columns
}
