// 页面：预算编制管理 => 预算管理 => 部门预算编报（预算单位） => 支出预算
// 页面：预算编制管理 => 预算确认 => 预算数据审阅（主管部门） => 支出预算
// 页面：预算编制管理 => 预算确认 => 预算数据审阅（资产处） => 支出预算
// 页面：预算编制管理 => 预算确认 => 预算数据审阅（业务处） => 支出预算
// 页面：预算编制管理 => 预算确认 => 预算绩效审核（绩效处） => 支出预算
// 页面：预算编制管理 => 预算确认 => 预算数据评审（评审中心） => 支出预算
// 页面：预算编制管理 => 预算确认 => 预算数据审阅（预算处） => 支出预算
// 资产购置计划汇总表 表头配置  2020-7-14 09:34
// 负责人：黄丹
export const columns = [
  {
    title: '预算单位',
    field: 'agency_',
    width: '120'
  },
  {
    title: '项目编码',
    field: 'pro_code',
    width: '120'
  },
  {
    title: '项目名称',
    field: 'pro_name',
    width: '120'
  },
  {
    title: '支出功能分类',
    field: 'exp_func_',
    width: '120'
  },
  {
    title: '资产分类',
    field: 'asset_class_',
    width: '120'
  },
  {
    title: '资产名称',
    field: 'asset_name',
    width: '120'
  },
  {
    title: '资产数量',
    field: 'num',
    width: '120'
  },
  {
    title: '资产编制数',
    field: 'asset_no',
    width: '120'
  },
  {
    title: '资产申请数量',
    field: 'asset_qua',
    width: '120'
  },
  {
    title: '单价',
    field: 'price',
    width: '120'
  },
  {
    title: '总金额',
    field: 'sum_amt',
    width: '120'
  }
]

export default {
  assetPurchasePlanSummary: columns
}
