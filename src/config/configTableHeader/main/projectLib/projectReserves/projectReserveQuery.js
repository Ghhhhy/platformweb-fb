// 页面：项目库管理 => 项目储备情况 => 储备情况查询
// 项目储备查询表 表头配置 张颖捷 2020-7-13 15:46
export const columns = [
  {
    title: '预算单位',
    field: 'agency_name',
    width: 300
  },
  {
    title: '项目类别',
    field: 'pro_cat_name',
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
    width: 200
  },
  {
    title: '存续状态',
    field: 'exist_statue_code',
    width: 120
  },
  {
    title: '专项资金目录',
    field: 'spe_type_name',
    width: 200
  },
  {
    title: '项目金额',
    field: 'pro_total_amt',
    width: 120
  },
  {
    title: '预算金额',
    field: 'reply_amt',
    width: 120
  },
  {
    title: '执行金额',
    field: 'pay_amt',
    width: 120
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
  }
]

export default {
  projectReserveQuery: columns
}
