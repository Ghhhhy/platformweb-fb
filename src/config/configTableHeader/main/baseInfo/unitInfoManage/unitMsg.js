// 页面：基础信息管理 => 单位信息管理 => 单位信息维护（预算单位）
// 页面：基础信息管理 => 单位信息管理 => 单位信息审核（预算处）
// 页面：基础信息管理 => 单位信息管理 => 单位信息审核（业务处）
// 页面：基础信息管理 => 单位信息管理 => 单位信息审核（主管部门）
// 单位基本信息表 表头配置  2020-7-13 11:00
// 负责人：黄丹
export const columns = [
  // {
  //   title: '操作',
  //   field: 'opt',
  //   align: 'center',
  //   width: 120,
  //   fixed: 'left',
  //   sortable: false
  // },
  {
    title: '部门标识',
    field: 'capital_type_',
    width: 200,
    align: 'left',
    editRender: {
      name: '$treeText'
    }
  },
  {
    title: '单位代码',
    field: 'agency_code',
    align: 'left',
    width: 200
  },
  {
    title: '单位名称',
    field: 'agency_name',
    align: 'left',
    width: 200
  },
  {
    title: '内部机构',
    field: 'mof_dep_',
    width: 200,
    align: 'left',
    editRender: {
      name: '$treeText'
    }
  },
  {
    title: '单位简称',
    field: 'agency_abbreviation',
    align: 'left',
    width: 200
  },
  {
    title: '统一社会信用代码',
    field: 'unifsoc_cred_code',
    align: 'left',
    width: 200
  },
  {
    title: '单位类型',
    field: 'agency_type_',
    width: 200,
    align: 'left',
    editRender: {
      name: '$treeText'
    }
  },
  {
    title: '单位行政级别',
    field: 'agency_adm_level_',
    width: 200,
    align: 'left',
    editRender: {
      name: '$treeText'
    }
  },
  // {
  //   title: '经费供给方式',
  //   field: 'fund_guar_',
  //   width: 200,
  //   align: 'left',
  //   editRender: {
  //     name: '$treeText'
  //   }
  // },
  {
    title: '单位经费保障方式',
    field: 'supdep_',
    width: 200,
    align: 'left',
    editRender: {
      name: '$treeText'
    }
  },
  {
    title: '执行会计制度',
    field: 'executive_acc_',
    width: 200,
    align: 'left',
    editRender: {
      name: '$treeText'
    }
  },
  {
    title: '国民经济行业分类',
    field: 'ind_',
    width: 200,
    align: 'left',
    editRender: {
      name: '$treeText'
    }
  },
  {
    title: '单位负责人',
    field: 'agency_leader_per_name',
    align: 'left',
    width: 200
  },
  {
    title: '单位地址',
    field: 'agency_add',
    align: 'left',
    width: 200
  },
  {
    title: '邮政编码',
    field: 'zip',
    align: 'left',
    width: 200
  },
  {
    title: '财政区划',
    field: 'mof_div_code',
    align: 'left',
    width: 200
  },
  {
    title: '单位所在地区划',
    field: 'location_',
    width: 200,
    align: 'left',
    editRender: {
      name: '$treeText'
    }
  },
  {
    title: '支出功能分类',
    field: 'exp_func_',
    align: 'left',
    width: 200,
    editRender: {
      name: '$treeText'
    }
  },
  {
    title: '是否编制部门预算',
    field: 'is_pre_dep_bgt',
    width: 200,
    align: 'left',
    editRender: {
      name: '$select',
      options: [
        { label: '是', value: '1' },
        { label: '否', value: '0' }
      ]
    }
  },
  {
    title: '是否编制部门决算',
    field: 'is_pre_depar_fin_accounts',
    width: 200,
    align: 'left',
    editRender: {
      name: '$select',
      options: [
        { label: '是', value: 1 },
        { label: '否', value: 0 }
      ]
    }
  },
  {
    title: '是否编制政府部门财务报告',
    field: 'is_pre_fin_rep_gov_dep',
    width: 230,
    align: 'left',
    editRender: {
      name: '$select',
      options: [
        { label: '是', value: 1 },
        { label: '否', value: 0 }
      ]
    }
  },
  {
    title: '是否编制行政事业单位国有资产报告',
    field: 'is_pre_sta_own_asse_rep',
    width: 280,
    align: 'left',
    editRender: {
      name: '$select',
      options: [
        { label: '是', value: '1' },
        { label: '否', value: '0' }
      ]
    }
  }
]

export default {
  unitMsg: columns
}
