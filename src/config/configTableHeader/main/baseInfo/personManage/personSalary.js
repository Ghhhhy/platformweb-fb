// 页面：基础信息管理 => 人员信息管理 => 单位人员工资
// 单位人员工资表 表头配置  2020-8-5 17:28
// 负责人：黄丹
export const columns = [
  {
    title: '单位编码',
    field: 'agency_code',
    align: 'right',
    width: 200
  },
  {
    title: '单位名称',
    field: 'agency_name',
    align: 'left',
    width: 200
  },
  {
    title: '行政（参公）在职人数',
    field: 'adm_staff_num',
    combinedType: ['average', 'total'],
    align: 'right',
    width: 200
  },
  {
    title: '事业在职人数',
    field: 'ins_staff_num',
    combinedType: ['average', 'total'],
    align: 'right',
    width: 200
  },
  {
    title: '工勤人数',
    field: 'worker_num',
    combinedType: ['average', 'total'],
    align: 'right',
    width: 200
  },
  {
    title: '离休人数',
    field: 'wc_retiree_num',
    combinedType: ['average', 'total'],
    align: 'right',
    width: 200
  },
  {
    title: '退休人数',
    field: 'retiree_num',
    combinedType: ['average', 'total'],
    align: 'right',
    width: 200
  },
  {
    title: '行政（参公）基本工资',
    field: 'adm_base_pay',
    editRender: { name: '$moneyRender', props: { type: 'float' } },
    // combinedType: ['average', 'total'],
    align: 'right',
    width: 200
  },
  {
    title: '行政（参公）津补贴',
    field: 'total_subs',
    editRender: { name: '$moneyRender', props: { type: 'float' } },
    // combinedType: ['average', 'total'],
    align: 'right',
    width: 200
  },
  {
    title: '行政（参公）改革性补贴',
    field: 'adm_ref_subs',
    editRender: { name: '$moneyRender', props: { type: 'float' } },
    // combinedType: ['average', 'total'],
    align: 'right',
    width: 200
  },
  {
    title: '行政（参公）公务交通补贴',
    field: 'adm_offc_trs_subs',
    editRender: { name: '$moneyRender', props: { type: 'float' } },
    // combinedType: ['average', 'total'],
    align: 'right',
    width: 200
  },
  {
    title: '事业基本工资',
    field: 'ins_base_pay',
    editRender: { name: '$moneyRender', props: { type: 'float' } },
    // combinedType: ['average', 'total'],
    align: 'right',
    width: 200
  },
  {
    title: '事业改革性补贴',
    field: 'ins_ref_subs',
    editRender: { name: '$moneyRender', props: { type: 'float' } },
    // combinedType: ['average', 'total'],
    align: 'right',
    width: 200
  },
  {
    title: '事业绩效工资',
    field: 'merit_pay',
    editRender: { name: '$moneyRender', props: { type: 'float' } },
    // combinedType: ['average', 'total'],
    align: 'right',
    width: 200
  },
  {
    title: '事业公务交通补贴',
    field: 'ins_offc_trs_subs',
    editRender: { name: '$moneyRender', props: { type: 'float' } },
    // combinedType: ['average', 'total'],
    align: 'right',
    width: 200
  },
  {
    title: '奖金（第十三个月工资）',
    field: 'bonus',
    editRender: { name: '$moneyRender', props: { type: 'float' } },
    // combinedType: ['average', 'total'],
    align: 'right',
    width: 200
  },
  {
    title: '住房货币化补贴',
    field: 'hous_mone_subs',
    editRender: { name: '$moneyRender', props: { type: 'float' } },
    // combinedType: ['average', 'total'],
    align: 'right',
    width: 200
  },
  {
    title: '住房公积金（单位）',
    field: 'subs_h_os_fd',
    editRender: { name: '$moneyRender', props: { type: 'float' } },
    // combinedType: ['average', 'total'],
    align: 'right',
    width: 200
  },
  {
    title: '基本养老保险缴费（单位）',
    field: 'subs_end_is',
    editRender: { name: '$moneyRender', props: { type: 'float' } },
    // combinedType: ['average', 'total'],
    align: 'right',
    width: 200
  },
  {
    title: '职业年金缴费（单位）',
    field: 'subs_occ_is',
    editRender: { name: '$moneyRender', props: { type: 'float' } },
    // combinedType: ['average', 'total'],
    align: 'right',
    width: 200
  },
  {
    title: '职工基本医疗保险缴费（单位）',
    field: 'subs_med_is',
    editRender: { name: '$moneyRender', props: { type: 'float' } },
    // combinedType: ['average', 'total'],
    align: 'right',
    width: 200
  },
  {
    title: '工伤保险',
    field: 'subs_wk_ij_is',
    editRender: { name: '$moneyRender', props: { type: 'float' } },
    // combinedType: ['average', 'total'],
    align: 'right',
    width: 200
  },
  {
    title: '生育保险',
    field: 'subs_bir_ij_is',
    editRender: { name: '$moneyRender', props: { type: 'float' } },
    // combinedType: ['average', 'total'],
    align: 'right',
    width: 200
  },
  {
    title: '失业保险',
    field: 'subs_unpt_is',
    editRender: { name: '$moneyRender', props: { type: 'float' } },
    // combinedType: ['average', 'total'],
    align: 'right',
    width: 200
  },
  {
    title: '个人采暖补贴',
    field: 'heat_subs',
    editRender: { name: '$moneyRender', props: { type: 'float' } },
    // combinedType: ['average', 'total'],
    align: 'right',
    width: 200
  },
  {
    title: '独生子女费',
    field: 'one_cld_pat_subs',
    editRender: { name: '$moneyRender', props: { type: 'float' } },
    // combinedType: ['average', 'total'],
    align: 'right',
    width: 200
  },
  {
    title: '离休费',
    field: 'adm_ret_pay',
    editRender: { name: '$moneyRender', props: { type: 'float' } },
    // combinedType: ['average', 'total'],
    align: 'right',
    width: 200
  },
  {
    title: '离休生活补贴',
    field: 'adm_ret_life',
    editRender: { name: '$moneyRender', props: { type: 'float' } },
    // combinedType: ['average', 'total'],
    align: 'right',
    width: 200
  },
  {
    title: '离休改革性补贴',
    field: 'ret_ref_subs',
    editRender: { name: '$moneyRender', props: { type: 'float' } },
    // combinedType: ['average', 'total'],
    align: 'right',
    width: 200
  },
  {
    title: '未参保退休费',
    field: 'ins_ret_pay',
    editRender: { name: '$moneyRender', props: { type: 'float' } },
    // combinedType: ['average', 'total'],
    align: 'right',
    width: 200
  },
  {
    title: '未参保退休生活补贴',
    field: 'ins_ret_life',
    editRender: { name: '$moneyRender', props: { type: 'float' } },
    // combinedType: ['average', 'total'],
    align: 'right',
    width: 200
  },
  {
    title: '离休人员采暖补贴',
    field: 'ret_heat_subs',
    editRender: { name: '$moneyRender', props: { type: 'float' } },
    // combinedType: ['average', 'total'],
    align: 'right',
    width: 200
  },
  {
    title: '护理费',
    field: 'nurs_fee',
    editRender: { name: '$moneyRender', props: { type: 'float' } },
    // combinedType: ['average', 'total'],
    align: 'right',
    width: 200
  },
  {
    title: '工资月份',
    field: 'sala_month',
    align: 'right',
    width: 200
  }
]

export const proconf = {
  buttonConf: { // table工具栏配置
    moneyConversion: false,
    search: false,
    advancedSearch: false,
    buttons: [
      { code: 'toolbar-refresh', name: '刷新', status: 'primary' },
      { code: 'toolbar-sync', name: '同步' }
    ]
  }
}
