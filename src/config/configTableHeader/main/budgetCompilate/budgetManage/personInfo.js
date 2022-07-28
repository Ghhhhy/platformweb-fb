// 页面：预算编制管理 => 预算管理 => 部门预算编报（预算单位） => 基础信息
// 页面：预算编制管理 => 预算确认 => 预算数据审阅（主管部门） => 基础信息
// 页面：预算编制管理 => 预算确认 => 预算数据审阅（资产处） => 基础信息
// 页面：预算编制管理 => 预算确认 => 预算数据审阅（业务处） => 基础信息
// 页面：预算编制管理 => 预算确认 => 预算绩效审核（绩效处） => 基础信息
// 页面：预算编制管理 => 预算确认 => 预算数据评审（评审中心） => 基础信息
// 页面：预算编制管理 => 预算确认 => 预算数据审阅（预算处） => 基础信息
// 人员信息表 表头配置  2020-7-14 09:14
// 负责人：黄丹
export const columns = [
  {
    title: '姓名',
    field: 'per_name',
    width: '120'
  },
  {
    title: '证件类型',
    field: 'iden_type_code',
    width: '120'
  },
  {
    title: '证件号码',
    field: 'iden_no',
    width: '120'
  },
  {
    title: '性别',
    field: 'sex_code',
    width: '120'
  },
  {
    title: '民族',
    field: 'nat_code',
    width: '120'
  },
  {
    title: '学历',
    field: 'sch_rec_code',
    width: '120'
  },
  {
    title: '人员状态',
    field: 'per_sta_code',
    width: '120'
  },
  {
    title: '职务',
    field: 'pos_code',
    width: '120'
  },
  {
    title: '职级',
    field: 'gr_code',
    width: '120'
  },
  {
    title: '人员身份',
    field: 'per_ide_code',
    width: '120'
  },
  {
    title: '单位代码',
    field: 'agency_',
    width: '120'
  },
  {
    title: '在职人员来源代码',
    field: 'per_sou_code',
    width: '120'
  },
  {
    title: '是否在编',
    field: 'is_auth',
    width: '120'
  },
  {
    title: '国籍（地区）',
    field: 'nation',
    width: '120'
  },
  {
    title: '参加工作时间',
    field: 'work_init_date',
    width: '120'
  },
  {
    title: '入职时间',
    field: 'enter_agency_date',
    width: '120'
  },
  {
    title: '工龄',
    field: 'serv_len',
    width: '120'
  },
  {
    title: '是否工资统发',
    field: 'is_uni_sala',
    width: '120'
  },
  {
    title: '技术等级',
    field: 'tec_worker_gr_code',
    width: '120'
  },
  {
    title: '启用日期',
    field: 'start_date',
    width: '120'
  },
  {
    title: '停用日期',
    field: 'end_date',
    width: '120'
  }
]

export default {
  personInfo: columns
}
