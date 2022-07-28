// 页面：项目库管理 => 项目申报管理 => 项目审核(主管部门)
// 项目类别对模板 表头配置
export const columns = [
  {
    title: '项目类别',
    field: 'pro_cat_name',
    width: 120
  },
  {
    title: '支出项目类别',
    field: 'payout_kind_name',
    width: 250
  },
  {
    title: '存续状态',
    field: 'exist_statue_code',
    width: 120
  },
  {
    title: '项目编码',
    field: 'pro_code',
    width: 200
  },
  {
    title: '项目名称',
    field: 'pro_name',
    width: 250
  },
  {
    title: '项目单位',
    field: 'use_agency_name',
    width: 200
  },
  {
    title: '项目总额',
    field: 'pro_total_amt',
    width: 120
  },
  {
    title: '其中：社会投入金额',
    field: 'scoi_invest_fund',
    width: 150
  },
  {
    title: '主管部门',
    field: 'dept_name',
    width: 200
  },
  {
    title: '财政内部机构',
    field: 'mof_dep_name',
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
    field: 'hot_std_name',
    width: 120
  },
  {
    title: '分配方式',
    field: 'distri_type_code',
    width: 120
  },
  {
    title: '上级转移支付项目代码',
    field: 'cen_tra_pro_code',
    width: 200
  }
]

export default {
  projectCheckSuper: columns
}
