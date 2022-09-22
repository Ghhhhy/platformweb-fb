// 页面：项目库管理 => 项目基础信息管理 => 专项资金目录维护
// 页面：项目库管理 => 人员公用项目管理 => 项目确认（预算单位）
// 页面：项目库管理 => 人员公用项目管理 => 项目确认（主管部门）
// 项目主视图 表头配置  2020-7-13 16:18
// 负责人：黄丹
export const columns = [
  {
    title: '项目类别',
    field: 'pro_cat_name',
    width: '120'
  },
  {
    title: '支出项目类别',
    field: 'payout_kind_name',
    width: '120'
  },
  {
    title: '存续状态',
    field: 'exist_statue_code',
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
    title: '项目单位',
    field: 'use_agency_name',
    width: '120'
  },
  {
    title: '项目总额',
    field: 'pro_total_amt',
    width: '120'
  },
  {
    title: '其中：社会投入金额',
    field: 'scoi_invest_fund',
    width: '120'
  },
  {
    title: '主管部门',
    field: 'dept_name',
    width: '120'
  },
  {
    title: '财政内部机构',
    field: 'mof_dep_name',
    width: '120'
  },
  {
    title: '项目开始时间',
    field: 'pro_start_year',
    width: '120'
  },
  {
    title: '项目结束时间',
    field: 'end_year',
    width: '120'
  },
  {
    title: '项目期限(年)',
    field: 'pro_term',
    width: '120'
  },
  {
    title: '申报联系人',
    field: 'apply_link_man',
    width: '120'
  },
  {
    title: '申报联系电话',
    field: 'apply_link_tel',
    width: '120'
  },
  {
    title: '热点分类',
    field: 'hot_std_',
    width: '120'
  },
  {
    title: '分配方式',
    field: 'distri_type_code',
    width: '120'
  },
  {
    title: '上级转移支付项目代码',
    field: 'cen_tra_pro_code',
    width: '120'
  },
  {
    title: '分年支出计划',
    field: 'detail_table',
    width: '120'
  },
  {
    title: '目标表',
    field: 'mb_table',
    width: '120'
  },
  {
    title: '绩效指标',
    field: 'zb_table',
    width: '120'
  },
  {
    title: '项目授权',
    field: 'sq_table',
    width: '120'
  }
]

export default {
  projectEnsure: columns
}
