// 页面：项目库管理 => 项目申报管理 => 转移支付项目申报 & 项目申报 & 项目审核（主管部门、业务处室、评审中心）
// 页面：项目库管理 => 上下级项目管理 => 项目上报 & 下级项目审核
// 页面：项目库管理 => 项目储备情况 => 项目终止
// 项目主视图表 表头配置 张颖捷 2020-7-13 15:34
export const columns = [
  {
    title: '项目类别',
    field: 'pro_cat_',
    width: 120
  },
  {
    title: '支出项目类别',
    field: 'payout_kind_',
    width: 120
  },
  {
    title: '存续状态',
    field: 'exist_statue_code',
    width: 120
  },
  {
    title: '项目编码',
    field: 'pro_code',
    width: 120
  },
  {
    title: '项目名称',
    field: 'pro_name',
    width: 120
  },
  {
    title: '项目单位',
    field: 'use_agency_',
    width: 120
  },
  {
    title: '项目总额',
    field: 'pro_total_amt',
    width: 120
  },
  {
    title: '其他资金',
    field: 'scoi_invest_fund',
    width: 120,
    editRender: {
      name: '$moneyRender'
    }
  },
  {
    title: '主管部门',
    field: 'dept_',
    width: 120
  },
  {
    title: '财政内部机构',
    field: 'mof_dep_',
    width: 120
  },
  {
    title: '项目开始时间',
    field: 'pro_start_year',
    width: 120
  },
  {
    title: '项目结束时间',
    field: 'end_year',
    width: 120
  },
  {
    title: '项目期限(年)',
    field: 'pro_term',
    width: 120
  },
  {
    title: '申报联系人',
    field: 'apply_link_man',
    width: 120
  },
  {
    title: '申报联系电话',
    field: 'apply_link_tel',
    width: 120
  },
  {
    title: '热点分类',
    field: 'hot_std_',
    width: 120
  },
  {
    title: '分配方式',
    field: 'distri_type_code',
    width: 120
  },
  {
    title: '上级转移支付项目代码',
    field: 'cen_tra_pro_',
    width: 120
  },
  {
    title: '分年支出计划',
    field: 'detail_table',
    width: 120
  },
  {
    title: '目标表',
    field: 'mb_table',
    width: 120
  },
  {
    title: '绩效指标',
    field: 'zb_table',
    width: 120
  },
  {
    title: '项目授权',
    field: 'sq_table',
    width: 120
  }
]

export default {
  personalMsgEgisExtend: columns
}
