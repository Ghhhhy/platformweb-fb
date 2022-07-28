// 页面：基础信息管理 => 人员信息管理 => 人员信息维护
// 人员扩展信息表 表头配置 张颖捷 2020-7-13 10:54
export const columns = [
  {
    title: '工资级别',
    field: 'sala_gr_name',
    width: 120
  },
  {
    title: '绩效工资',
    field: 'merit_pay',
    width: 120
  },
  {
    title: '人员经费保障方式',
    field: 'fund_mode',
    width: 120
  },
  {
    title: '工资关系所在单位',
    field: 'sala_agency_name',
    width: 120
  },
  {
    title: '工资卡卡号',
    field: 'sala_card_no',
    width: 120
  },
  {
    title: '工资卡开户银行',
    field: 'sala_card_bank',
    width: 120
  },
  {
    title: '公务卡卡号',
    field: 'gov_cred_card_no',
    width: 120
  },
  {
    title: '工资性质（代表正常工资、补发工资）',
    field: 'sala_property',
    width: 120
  },
  {
    title: '工资月份',
    field: 'sala_month',
    width: 120
  },
  {
    title: '岗位工资级别',
    field: 'pos_sala_gr_name',
    width: 120
  },
  {
    title: '保留补贴',
    field: 'ret_subs',
    width: 120
  },
  {
    title: '地区补贴',
    field: 'region_subs',
    width: 120
  },
  {
    title: '特殊岗位津贴',
    field: 'spec_pos_wance',
    width: 120
  },
  {
    title: '艰苦边远地区补贴',
    field: 'sub_had_ars_subs',
    width: 120
  },
  {
    title: '住房公积金补贴',
    field: 'hous_subs',
    width: 120
  },
  {
    title: '养老补贴',
    field: 'pens_subs',
    width: 120
  },
  {
    title: '乡镇补贴',
    field: 'rural_subs',
    width: 120
  },
  {
    title: '住房货币化补贴',
    field: 'hous_mone_subs',
    width: 120
  },
  {
    title: '医疗补贴',
    field: 'medical_subs',
    width: 120
  },
  {
    title: '自雇费',
    field: 'self_subs',
    width: 120
  },
  {
    title: '年终一次性奖金',
    field: 'year_onebos',
    width: 120
  },
  {
    title: '生活补贴',
    field: 'live_subs',
    width: 120
  },
  {
    title: '工作津贴',
    field: 'work_wance',
    width: 120
  },
  {
    title: '津补贴合计',
    field: 'total_subs',
    width: 120
  },
  {
    title: '改革性补贴',
    field: 'ref_subs',
    width: 120
  },
  {
    title: '公务交通补贴',
    field: 'offc_trs_subs',
    width: 120
  },
  {
    title: '补发工资',
    field: 'back_pay',
    width: 120
  },
  {
    title: '其他',
    field: 'other',
    width: 120
  },
  {
    title: '应发工资',
    field: 'wage_sala',
    width: 120
  },
  {
    title: '扣养老保险',
    field: 'ded_end_ins',
    width: 120
  },
  {
    title: '职务(岗位)工资',
    field: 'pos_sala',
    width: 120
  },
  {
    title: '扣职业年金',
    field: 'ded_occ_ant',
    width: 120
  },
  {
    title: '扣住房公积金',
    field: 'ded_hos_fund',
    width: 120
  },
  {
    title: '扣个人所得税',
    field: 'ded_ps_inc_tax',
    width: 120
  },
  {
    title: '扣医疗保险',
    field: 'ded_med_ins',
    width: 120
  },
  {
    title: '扣大额医疗',
    field: 'dedlg_amt_trt_mt',
    width: 120
  },
  {
    title: '扣大病医疗',
    field: 'ded_ills_trt_mt',
    width: 120
  },
  {
    title: '其他扣款',
    field: 'oth_deds',
    width: 120
  },
  {
    title: '扣款合计',
    field: 'total_ded',
    width: 120
  },
  {
    title: '实发工资',
    field: 'net_sala',
    width: 120
  },
  {
    title: '财政补助养老保险',
    field: 'finc_subs_end_is',
    width: 120
  },
  {
    title: '级别(技术等级、薪级)工资',
    field: 'grad_sala',
    width: 120
  },
  {
    title: '财政补助职业年金',
    field: 'finc_subs_occ_is',
    width: 120
  },
  {
    title: '财政补助住房公积金',
    field: 'finc_subs_h_os_fd',
    width: 120
  },
  {
    title: '财政补助医疗保险',
    field: 'finc_subs_med_is',
    width: 120
  },
  {
    title: '财政补助大病保险',
    field: 'finc_subs_ills_is',
    width: 120
  },
  {
    title: '财政补助工伤保险',
    field: 'finc_subs_wk_ij_is',
    width: 120
  },
  {
    title: '财政补助生育保险',
    field: 'finc_subs_bir_ij_is',
    width: 120
  },
  {
    title: '扣缴基数',
    field: 'wi_hd_base',
    width: 120
  },
  {
    title: '教护10%',
    field: 'tec_nurs',
    width: 120
  },
  {
    title: '教护龄津贴',
    field: 'tec_nurs_ag_wc',
    width: 120
  },
  {
    title: '浮动工资',
    field: 'flot_wage',
    width: 120
  },
  {
    title: '国家规定津补贴',
    field: 'nation_reg_sub',
    width: 120
  },
  {
    title: '基础性绩效',
    field: 'basc_perf',
    width: 120
  },
  {
    title: '奖励性绩效',
    field: 'inct_perf',
    width: 120
  },
  {
    title: '绩效工资总量',
    field: 'tol_perf_pay',
    width: 120
  },
  {
    title: '扣失业保险',
    field: 'ded_unpt_is',
    width: 120
  },
  {
    title: '财政补助失业保险',
    field: 'finc_subs_unpt_is',
    width: 120
  },
  {
    title: '人员状态',
    field: 'per_sta_code',
    width: 120
  },
  {
    title: '离休生活补贴',
    field: 'wc_ret_life',
    width: 120
  },
  {
    title: '独生子女父母补助金',
    field: 'one_cld_pat_subs',
    width: 120
  },
  {
    title: '护理费',
    field: 'nurs_fee',
    width: 120
  },
  {
    title: '退休生活补贴',
    field: 'ret_wance',
    width: 120
  },
  {
    title: '警衔津贴',
    field: 'police_rk_wc',
    width: 120
  },
  {
    title: '地方出台津补贴',
    field: 'local_reg_sub',
    width: 120
  },
  {
    title: '工资类型',
    field: 'wage_struct',
    width: 120
  },
  {
    title: '整月补月数',
    field: 'mon_bene_num',
    width: 120
  },
  {
    title: '零星补扣月数',
    field: 'fram_bene_num',
    width: 120
  },
  {
    title: '是否特殊岗位',
    field: 'is_spec_pos',
    width: 120
  }
]

export default {
  personalMsgEgisExtend: columns
}
