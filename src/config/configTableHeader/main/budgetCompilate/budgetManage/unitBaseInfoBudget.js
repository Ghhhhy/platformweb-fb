// 页面：预算编制管理 => 预算管理 => 部门预算编报（预算单位） => 基础信息
// 页面：预算编制管理 => 预算确认 => 预算数据审阅（主管部门） => 基础信息
// 页面：预算编制管理 => 预算确认 => 预算数据审阅（资产处） => 基础信息
// 页面：预算编制管理 => 预算确认 => 预算数据审阅（业务处） => 基础信息
// 页面：预算编制管理 => 预算确认 => 预算绩效审核（绩效处） => 基础信息
// 页面：预算编制管理 => 预算确认 => 预算数据评审（评审中心） => 基础信息
// 页面：预算编制管理 => 预算确认 => 预算数据审阅（预算处） => 基础信息
// 单位信息基本表-预算  表头配置  2020-7-14 09:14
// 负责人：黄丹
export const columns = [
  {
    title: '单位代码',
    field: 'agency_code',
    width: '120'
  },
  {
    title: '行政级别',
    field: 'agency_adm_level_name',
    width: '120'
  },
  {
    title: '财政区划代码',
    field: 'mof_div_code',
    width: '120'
  },
  {
    title: '单位全称',
    field: 'agency_name',
    width: '120'
  },
  {
    title: '单位类型',
    field: 'agency_type_name',
    width: '120'
  },
  {
    title: '行政区划代码',
    field: 'adm_div_code',
    width: '120'
  },
  {
    title: '单位简称',
    field: 'agency_abbreviation',
    width: '120'
  },
  {
    title: '经费供给方式',
    field: 'fund_guar_name',
    width: '120'
  },
  {
    title: '邮政编码',
    field: 'zip',
    width: '120'
  },
  {
    title: '统一社会信用代码',
    field: 'unifsoc_cred_code',
    width: '120'
  },
  {
    title: '内部机构',
    field: 'mof_dep_name',
    width: '120'
  },
  {
    title: '行业分类代码',
    field: 'ind_code',
    width: '120'
  },
  {
    title: '单位负责人',
    field: 'agency_leader_per_name',
    width: '120'
  },
  {
    title: '单位地址',
    field: 'agency_add',
    width: '120'
  },
  {
    title: '--',
    field: '--',
    width: '120'
  }
]

export default {
  unitBaseInfoBudget: columns
}
