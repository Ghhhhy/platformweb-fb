// 页面：项目库管理 => 人员公用项目管理 => 一键测算
// 项目主视图 表头配置  2020-7-13 16:40
// 负责人：黄丹
export const columns = [
  {
    title: '项目类别',
    field: 'pro_cat_name',
    width: '120'
  },
  {
    title: '项目名称',
    field: 'pro_name',
    width: '120'
  },
  {
    title: '申报单位',
    field: 'agency_name',
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
    title: '项目总额',
    field: 'pro_total_amt',
    width: '120'
  },
  {
    title: '项目来源',
    field: 'pro_source',
    width: '120'
  },
  {
    title: '存续状态',
    field: 'exist_statue_code',
    width: '120'
  }
]

export default {
  projectInfo: columns
}
