// 页面：项目库管理 => 项目申报管理 => 项目快速录入
// 项目快速录入主表.专项资金目录 表头配置 2020-7-20 17:21
// 负责人：黄丹
import Store from '@/utils/store'
export let proconf = {
  toolButton: {
    // table工具栏配置 未处理
    buttons: [
      { code: 'toolbar-insert', name: '新增', status: 'primary' },
      { code: 'toolbar-update', name: '修改' },
      { code: 'toolbar-delete', name: '删除' },
      { code: 'toolbar-refresh', name: '刷新' }
      // {
      //   code: 'toolbar-more',
      //   name: '导入',
      //   disable: false,
      //   dropdowns: [
      //     { code: 'toolbar-import', name: '项目导入' },
      //     { code: 'toolbar-download', name: '下载模板' }
      //   ]
      // }
      // { code: 'toolbar-viewlog', name: '操作日志' }

    ]
  },
  insertToolBarItem: [
    {
      label: '项目基本信息',
      code: 0
    },
    {
      label: '分年度支出计划',
      code: 1
    }
  ]
}
export const columns = [
  {
    title: '项目类别',
    field: 'pro_cat_name',
    width: '120',
    align: 'left',
    filterRender: {
      name: 'input',
      props: {
        type: 'text'
      }
    },
    filters: [{ data: '' }],
    // obj 中 option 筛选器内容 row 被遍历的列
    filterMethod: obj => {
      // 当被遍历的列（row）的属性（payout_kind_name = obj.column.property） 与筛选器（option）的数据相同时 返回true 返回true的数据会被显示在列表
      return !(
        obj.row[obj.column.property].search(obj.option.data) === -1
      )
    }
  },
  {
    title: '存续状态',
    field: 'exist_statue_code',
    width: '120',
    align: 'left',
    filterMultiple: true,
    formatter: (value, column) => {
      if (value.cellValue === '001') {
        return '一次性项目'
      }
      if (value.cellValue === '002') {
        return '经常性项目'
      }
      if (value.cellValue === '003') {
        return '阶段性项目'
      }
    },
    filters: [
      { label: '一次性项目', value: '001' },
      { label: '经常性项目', value: '002' },
      { label: '阶段性项目', value: '003' }
    ]
  },
  {
    title: '专项资金目录',
    field: 'spe_type_name',
    width: '150',
    align: 'left',
    filterRender: {
      name: 'input',
      props: {
        type: 'text'
      }
    },
    filters: [{ data: '' }],
    // obj 中 option 筛选器内容 row 被遍历的列
    filterMethod: obj => {
      // 当被遍历的列（row）的属性（payout_kind_name = obj.column.property） 与筛选器（option）的数据相同时 返回true 返回true的数据会被显示在列表
      return !(
        obj.row[obj.column.property].search(obj.option.data) === -1
      )
    }
  },
  {
    title: '支出项目类别',
    field: 'payout_kind_name',
    width: '200',
    align: 'left',
    filterRender: {
      name: 'input',
      props: {
        type: 'text'
      }
    },
    filters: [{ data: '' }],
    // obj 中 option 筛选器内容 row 被遍历的列
    filterMethod: obj => {
      // 当被遍历的列（row）的属性（payout_kind_name = obj.column.property） 与筛选器（option）的数据相同时 返回true 返回true的数据会被显示在列表
      return !(
        obj.row[obj.column.property].search(obj.option.data) === -1
      )
    }
  },
  {
    title: '项目代码',
    field: 'pro_code',
    width: '200',
    align: 'right',
    filterRender: {
      name: 'input',
      props: {
        type: 'text'
      }
    },
    filters: [{ data: '' }],
    // obj 中 option 筛选器内容 row 被遍历的列
    filterMethod: obj => {
      // 当被遍历的列（row）的属性（payout_kind_name = obj.column.property） 与筛选器（option）的数据相同时 返回true 返回true的数据会被显示在列表
      return !(
        obj.row[obj.column.property].search(obj.option.data) === -1
      )
    }
  },
  {
    title: '项目名称',
    field: 'pro_name',
    width: '120',
    align: 'left',
    // filterRender: {
    //   name: 'input',
    //   props: {
    //     type: 'text'
    //   }
    // },
    // filters: [{ data: '' }],
    // // obj 中 option 筛选器内容 row 被遍历的列
    // filterMethod: obj => {
    //   // 当被遍历的列（row）的属性（payout_kind_name = obj.column.property） 与筛选器（option）的数据相同时 返回true 返回true的数据会被显示在列表
    //   return !(
    //     obj.row[obj.column.property].search(obj.option.data) === -1
    //   )
    // }
    cellRender: {
      name: '$href'
    }
  },
  {
    title: '项目单位',
    field: 'use_agency_name',
    width: '200',
    align: 'left',
    filterRender: {
      name: 'input',
      props: {
        type: 'text'
      }
    },
    filters: [{ data: '' }],
    // obj 中 option 筛选器内容 row 被遍历的列
    filterMethod: obj => {
      // 当被遍历的列（row）的属性（payout_kind_name = obj.column.property） 与筛选器（option）的数据相同时 返回true 返回true的数据会被显示在列表
      return !(
        obj.row[obj.column.property].search(obj.option.data) === -1
      )
    }
  },
  {
    title: '主管部门',
    field: 'dept_name',
    width: '200',
    align: 'left',
    filterRender: {
      name: 'input',
      props: {
        type: 'text'
      }
    },
    filters: [{ data: '' }],
    // obj 中 option 筛选器内容 row 被遍历的列
    filterMethod: obj => {
      // 当被遍历的列（row）的属性（payout_kind_name = obj.column.property） 与筛选器（option）的数据相同时 返回true 返回true的数据会被显示在列表
      return !(
        obj.row[obj.column.property].search(obj.option.data) === -1
      )
    }
  },
  {
    title: '财政内部机构',
    field: 'mof_dep_name',
    width: '200',
    align: 'left',
    filterRender: {
      name: 'input',
      props: {
        type: 'text'
      }
    },
    filters: [{ data: '' }],
    // obj 中 option 筛选器内容 row 被遍历的列
    filterMethod: obj => {
      // 当被遍历的列（row）的属性（payout_kind_name = obj.column.property） 与筛选器（option）的数据相同时 返回true 返回true的数据会被显示在列表
      return !(
        obj.row[obj.column.property].search(obj.option.data) === -1
      )
    }
  },
  {
    title: '职能职责',
    field: 'fun_res_name',
    width: '150',
    align: 'left',
    editRender: {
      name: 'text'
    }
  },
  {
    title: '项目起始年度',
    field: 'pro_start_year',
    align: 'right',
    width: '150'
  },
  {
    title: '项目终止年度',
    field: 'end_year',
    align: 'right',
    width: '150'
  },
  {
    title: '项目期限(年)',
    field: 'pro_term',
    align: 'right',
    width: '150'
  },
  {
    title: '项目金额',
    field: 'pro_total_amt',
    width: '120',
    align: 'right',
    combinedType: ['average', 'total'],
    filterMultiple: false,
    // obj 中 value是选中选项的值 row 被遍历的列
    filterMethod: obj => {
      // 当被遍历的列（row）的属性（payout_kind_name） 与筛选器（option）的数据相同时 返回true 返回true的数据会被显示在列表
      return obj.row.pro_total_amt > obj.value
    },
    editRender: {
      name: '$moneyRender'
    }
  },
  {
    title: '申报单位联系人',
    field: 'apply_link_man',
    align: 'left',
    width: '150'
  },
  {
    title: '申报联系电话',
    field: 'apply_link_tel',
    align: 'right',
    width: '150'
  },
  {
    title: '设立依据',
    field: 'degisn_consideration',
    align: 'left',
    width: '150'
  },
  {
    title: '项目概述',
    field: 'pro_desc',
    align: 'left',
    width: '150'
  }
]

// 资金计划项目
export let moneyPlanFormItems = [
  {
    field: 'year',
    title: '年度',
    span: 8,
    editRender: {
      name: '$input',
      props: {
        disabled: true,
        type: 'text'
      }
    }
  },
  {
    field: 'declaration_amt',
    title: '项目总额',
    span: 8,
    formula: '{support_amount}+{scoi_invest_fund}',
    editRender: {
      name: '$calculateRender',
      props: {
        type: 'float',
        min: 0
      }
    },
    align: 'right'
  },
  {
    field: 'support_amount',
    title: '财政拨款',
    span: 8,
    editRender: {
      name: '$moneyRender',
      props: {
        type: 'float',
        min: 0
      }
    },
    align: 'right'
  },
  {
    field: 'scoi_invest_fund',
    title: '其中：社会投入金额',
    span: 8,
    editRender: {
      name: '$moneyRender',
      props: {
        type: 'float',
        min: 0
      }
    },
    align: 'right'
  },
  {
    field: 'remark',
    title: '备注',
    span: 8,
    editRender: {
      name: '$input',
      props: {
        type: 'text',
        placeholder: '请输入备注'
      }
    }
  }
]

// 查看资金计划项目
export let checkMoneyPlanFormItems = [
  {
    field: 'year',
    title: '年度',
    span: 8,
    editRender: {
      name: '$input',
      props: {
        disabled: true,
        type: 'text'
      }
    }
  },
  // {
  //   field: 'declaration_amt',
  //   title: '项目金额',
  //   span: 8,
  //   cellRender: {
  //     name: '$moneyRender',
  //     props: {
  //       disabled: true,
  //       type: 'float'
  //     }
  //   }
  // }
  {
    field: 'declaration_amt',
    title: '项目总额',
    span: 8,
    formula: '{support_amount}+{scoi_invest_fund}',
    editRender: {
      name: '$calculateRender',
      props: {
        disabled: true,
        type: 'float',
        min: 0
      }
    },
    align: 'right'
  },
  {
    field: 'support_amount',
    title: '财政拨款',
    span: 8,
    editRender: {
      name: '$moneyRender',
      props: {
        disabled: true,
        type: 'float',
        min: 0
      }
    },
    align: 'right'
  },
  {
    field: 'scoi_invest_fund',
    title: '其中：社会投入金额',
    span: 8,
    editRender: {
      name: '$moneyRender',
      props: {
        disabled: true,
        type: 'float',
        min: 0
      }
    },
    align: 'right'
  },
  {
    field: 'remark',
    title: '备注',
    span: 8,
    editRender: {
      name: '$input',
      props: {
        disabled: true,
        type: 'text',
        placeholder: '请输入备注'
      }
    }
  }
]

export let insertFormItems = [
  {
    field: 'pro_cat_',
    title: '项目类别',
    span: 8,
    itemRender: {
      name: '$formTreeInput',
      props: {
        type: 'text',
        isleaf: true,
        isServer: true,
        elecode: 'PROCAT',
        serverUri: 'fiscal-config/queryTreeAssistData',
        queryparams: {
          useRight: false,
          batchno: 1,
          datatype: 1,
          eleCode: 'PROCAT',
          sxspecroleguid: '999004'
        }
      }
    }
  },
  {
    field: 'spe_type_',
    title: '专项资金目录',
    span: 8,
    itemRender: {
      name: '$treeinput',
      isServer: true,
      props: {
        isServer: false,
        isleaf: true,
        elecode: 'vw_special_type',
        queryparams: {
          useRight: false,
          eleCode: 'vw_special_type',
          sxspecroleguid: '999004'
        }
      }
    }
  },
  {
    field: 'payout_kind_',
    title: '支出项目类别',
    span: 8,
    itemRender: {
      name: '$formTreeInput',
      props: {
        isServer: true,
        isleaf: true,
        elecode: 'vw_payoutkind',
        serverUri: 'fiscal-config/queryTreeAssistData',
        queryparams: {
          useRight: false,
          batchno: 1,
          datatype: 1,
          eleCode: 'vw_payoutkind',
          sxspecroleguid: '999004'
        }
      }
    }
  },
  {
    field: 'exist_statue_code',
    title: '存续状态',
    span: 8,
    itemRender: {
      name: '$vxeFormSelect',
      options: [
        {
          value: '001',
          label: '一次性项目'
        },
        {
          value: '002',
          label: '经常性项目'
        },
        {
          value: '003',
          label: '阶段性项目'
        }
      ],
      props: {
        placeholder: '请选择存续状态'
      }
    }
  },
  {
    field: 'pro_code',
    title: '项目代码',
    span: 8,
    itemRender: {
      name: '$input',
      props: {
        disabled: true,
        type: 'text',
        placeholder: '项目代码'
      }
    }
  },
  {
    field: 'pro_name',
    title: '项目名称',
    span: 8,
    itemRender: {
      name: '$input',
      props: {
        type: 'text',
        placeholder: '项目名称'
      }
    }
  },
  {
    field: 'use_agency_name',
    title: '项目单位',
    span: 8,
    itemRender: {
      name: '$input',
      props: {
        disabled: true,
        type: 'text',
        placeholder: '项目单位'
      }
    }
  },
  {
    field: 'dept_name',
    title: '主管部门',
    span: 8,
    itemRender: {
      name: '$input',
      props: {
        disabled: true,
        type: 'text',
        placeholder: '主管部门'
      }
    }
  },
  {
    field: 'mof_dep_name',
    title: '财政内部机构',
    span: 8,
    itemRender: {
      name: '$input',
      props: {
        disabled: true,
        type: 'text',
        placeholder: '财政内部机构'
      }
    }
  },
  {
    field: 'fun_res_',
    title: '职能职责',
    span: 8,
    itemRender: {
      name: '$formTreeInput',
      props: {
        isServer: true,
        queryparams: {
          eleCode: 'vw_pm_funcresp',
          sxspecroleguid: '3250FC3332E1421DA1B0388AA0D34BDC'
        }
      }
    }
  },
  {
    field: 'pro_start_year',
    title: '项目起始年度',
    span: 8,
    itemRender: {
      name: '$vxeFormInput',
      props: {
        disabled: true,
        type: 'year',
        placeholder: '项目起始年度'
      }
    }
  },
  {
    field: 'end_year',
    title: '项目终止年度',
    span: 8,
    itemRender: {
      name: '$vxeFormInput',
      props: {
        disabled: true,
        type: 'year',
        placeholder: '项目终止年度'
      }
    }
  },
  {
    field: 'pro_term',
    title: '项目期限(年)',
    span: 8,
    itemRender: {
      name: '$input',
      props: {
        disabled: true,
        type: 'input',
        placeholder: '请输入内容'
      }
    }
  },
  {
    field: 'pro_total_amt',
    title: '项目金额',
    span: 8,
    itemRender: {
      name: '$vxeFormInput',
      props: {
        disabled: true,
        type: 'float',
        placeholder: '项目金额'
      }
    }
  },
  {
    field: 'scoi_invest_fund',
    title: '其中：社会投入金额',
    span: 8,
    itemRender: {
      name: '$input',
      props: {
        disabled: true,
        type: 'number',
        placeholder: '请输入数字'
      }
    }
  },
  {
    field: 'apply_link_man',
    title: '申报单位联系人',
    span: 8,
    itemRender: {
      name: '$input',
      props: {
        type: 'text',
        placeholder: '请输入内容'
      }
    }
  },
  {
    field: 'apply_link_tel',
    title: '联系电话',
    span: 8,
    itemRender: {
      name: '$input',
      props: {
        placeholder: '请输入电话'
      }
    }
  },
  {
    field: 'distri_type_code',
    title: '分配方式',
    span: 8,
    itemRender: {
      name: '$vxeFormSelect',
      props: {
        placeholder: '请选择分配方式',
        disabled: true
      },
      options: [{
        value: '1',
        label: '因素法'
      },
      {
        value: '2',
        label: '项目法'
      },
      {
        value: '3',
        label: '因素和项目法'
      }
      ]
    }
  },

  {
    field: 'is_captial_cons_pro',
    title: '是否基建项目',
    span: 8,
    itemRender: {
      name: '$vxeFormRadio',
      options: [{
        value: 1,
        label: '是'
      },
      {
        value: 0,
        label: '否'
      }
      ]
    }
  },
  {
    field: 'is_scientific',
    title: '是否科研项目',
    span: 8,
    itemRender: {
      name: '$vxeFormRadio',
      options: [{
        value: 1,
        label: '是'
      },
      {
        value: 0,
        label: '否'
      }
      ]
    }
  },
  {
    field: 'is_gov_info_server',
    title: '是否信息化项目',
    span: 8,
    itemRender: {
      name: '$vxeFormRadio',
      options: [{
        value: '1',
        label: '是'
      },
      {
        value: '0',
        label: '否'
      }
      ]
    }
  },
  {
    field: 'is_track',
    title: '是否追踪',
    span: 8,
    itemRender: {
      name: '$vxeFormRadio',
      options: [
        {
          value: '1',
          label: '是'
        },
        {
          value: '0',
          label: '否'
        }
      ]
    }
  },
  {
    title: '是否涉密',
    field: 'is_secret_pro',
    span: 8,
    itemRender: {
      disabled: true,
      name: '$vxeFormRadio',
      options: [

        {
          value: '1',
          label: '是'
        },
        {
          value: '0',
          label: '否'
        }
      ]
    }
  },
  {
    field: 'degisn_consideration',
    title: '设立依据',
    span: 24,
    itemRender: {
      name: '$textarea',
      props: {
        type: 'text',
        placeholder: '请输入：政策依据，具体文件要求，会议要求，对应部门单位职能，工作方案并在项目附件中上传具体依据'
      }
    }
  },
  {
    field: 'pro_desc',
    title: '项目概述',
    span: 24,
    itemRender: {
      name: '$textarea',
      props: {
        type: 'text',
        placeholder: '请输入：项目目标，项目实施方式，项目资金来源及项目风险，项目实施情况等'
      }
    }
  },
  {
    field: 'money_measure',
    title: '经费测算',
    span: 24,
    itemRender: {
      name: '$textarea',
      props: {
        type: 'text',
        placeholder: '请输入经费具体测算方法，测算依据'
      }
    }
  },
  {
    field: 'pro_plan',
    title: '项目实施方案',
    span: 24,
    itemRender: {
      name: '$textarea',
      props: {
        type: 'text',
        placeholder: '请输入：项目实施地点，项目实施时间，实施方式等'
      }
    }
  },
  {
    field: 'pro_necessary',
    title: '项目必要性',
    span: 24,
    itemRender: {
      name: '$textarea',
      props: {
        type: 'text',
        placeholder: '请输入内容'
      }
    }
  },
  {
    field: 'pro_feasibility',
    title: '项目可行性',
    span: 24,
    itemRender: {
      name: '$textarea',
      props: {
        type: 'text',
        placeholder: '请输入内容'
      }
    }
  }

]

export let checkFormItems = [
  {
    field: 'pro_cat_',
    title: '项目类别',
    span: 8,
    itemRender: {
      name: '$treeinput',
      isServer: true,
      elecode: 'PROCAT',
      props: {
        disabled: true,
        isServer: true,
        isleaf: true,
        elecode: 'PROCAT',
        serverUri: 'fiscal-config/queryTreeAssistData',
        queryparams: {
          useRight: false,
          batchno: 1,
          datatype: 1,
          eleCode: 'PROCAT',
          sxspecroleguid: '999004'
        }
      }
    }
  },
  {
    field: 'spe_type_',
    title: '专项资金目录',
    span: 8,
    itemRender: {
      name: '$treeinput',
      isServer: true,
      props: {
        disabled: true,
        isServer: true,
        isleaf: true,
        elecode: 'vw_special_type',
        serverUri: 'fiscal-config/queryTreeAssistData',
        queryparams: {
          useRight: false,
          batchno: 1,
          datatype: 1,
          eleCode: 'vw_special_type',
          sxspecroleguid: '999004'
        }
      }
    }
  },
  {
    field: 'payout_kind_',
    title: '支出项目类别',
    span: 8,
    itemRender: {
      name: '$treeinput',
      isServer: true,
      elecode: 'vw_payoutkind',
      props: {
        disabled: true,
        isServer: true,
        isleaf: true,
        elecode: 'vw_payoutkind',
        serverUri: 'fiscal-config/queryTreeAssistData',
        queryparams: {
          useRight: false,
          batchno: 1,
          datatype: 1,
          eleCode: 'vw_payoutkind',
          sxspecroleguid: '999004'
        }
      }
    }
  },
  {
    field: 'exist_statue_code',
    title: '存续状态',
    span: 8,
    itemRender: {
      name: '$select',
      props: {
        disabled: true,
        type: 'select',
        options: [
          {
            value: '001',
            label: '一次性项目'
          },
          {
            value: '002',
            label: '经常性项目'
          },
          {
            value: '003',
            label: '阶段性项目'
          }
        ],
        placeholder: '请选择存续状态'
      }
    }
  },
  {
    field: 'pro_code',
    title: '项目代码',
    span: 8,
    itemRender: {
      name: '$input',
      props: {
        disabled: true,
        type: 'text',
        placeholder: ''
      }
    }
  },
  {
    field: 'pro_name',
    title: '项目名称',
    span: 8,
    itemRender: {
      name: '$input',
      props: {
        disabled: true,
        type: 'text',
        placeholder: ''
      }
    }
  },
  {
    field: 'use_agency_name',
    title: '项目单位',
    span: 8,
    itemRender: {
      name: '$input',
      props: {
        disabled: true,
        type: 'text',
        placeholder: ''
      }
    }
  },
  {
    field: 'dept_name',
    title: '主管部门',
    span: 8,
    itemRender: {
      name: '$input',
      props: {
        disabled: true,
        type: 'text',
        placeholder: '主管部门'
      }
    }
  },
  {
    field: 'mof_dep_name',
    title: '财政内部机构',
    span: 8,
    itemRender: {
      name: '$input',
      props: {
        disabled: true,
        type: 'text',
        placeholder: '财政内部机构'
      }
    }
  },
  {
    field: 'fun_res_',
    title: '职能职责',
    span: 8,
    itemRender: {
      name: '$treeinput',
      props: {
        disabled: true,
        isServer: true,
        queryparams: {
          eleCode: 'vw_pm_funcresp',
          sxspecroleguid: '3250FC3332E1421DA1B0388AA0D34BDC'
        }
      }
    }
  },
  {
    field: 'pro_start_year',
    title: '项目起始年度',
    span: 8,
    itemRender: {
      name: '$input',
      props: {
        disabled: true,
        type: 'text',
        placeholder: ''
      }
    }
  },
  {
    field: 'end_year',
    title: '项目终止年度',
    span: 8,
    itemRender: {
      name: '$input',
      props: {
        disabled: true,
        type: 'text',
        placeholder: ''
      }
    }
  },
  {
    field: 'pro_term',
    title: '项目期限(年)',
    span: 8,
    itemRender: {
      name: '$input',
      props: {
        disabled: true,
        type: 'input',
        placeholder: '请输入内容'
      }
    }
  },
  {
    field: 'pro_total_amt',
    title: '项目金额',
    span: 8,
    itemRender: {
      name: '$input',
      props: {
        disabled: true,
        type: 'text',
        placeholder: ''
      }
    }
  },
  {
    field: 'scoi_invest_fund',
    title: '其中：社会投入金额',
    span: 8,
    itemRender: {
      name: '$input',
      props: {
        disabled: true,
        type: 'number',
        placeholder: '请输入数字'
      }
    }
  },
  {
    field: 'apply_link_man',
    title: '申报单位联系人',
    span: 8,
    itemRender: {
      name: '$input',
      props: {
        disabled: true,
        type: 'text',
        placeholder: '请输入内容'
      }
    }
  },
  {
    field: 'apply_link_tel',
    title: '联系电话',
    span: 8,
    itemRender: {
      name: '$input',
      props: {
        disabled: true,
        placeholder: '请输入内容'
      }
    }
  },
  {
    field: 'distri_type_code',
    title: '分配方式',
    span: 8,
    itemRender: {
      name: '$vxeFormSelect',
      props: {
        placeholder: '请选择分配方式',
        disabled: true
      },
      options: [{
        value: '1',
        label: '因素法'
      },
      {
        value: '2',
        label: '项目法'
      },
      {
        value: '3',
        label: '因素和项目法'
      }
      ]
    }
  },

  {
    field: 'is_captial_cons_pro',
    title: '是否基建项目',
    span: 8,
    itemRender: {
      name: '$vxeFormRadio',
      props: {
        disabled: true
      },
      options: [{
        value: 1,
        label: '是'
      },
      {
        value: 0,
        label: '否'
      }
      ]
    }
  },
  {
    field: 'is_scientific',
    title: '是否科研项目',
    span: 8,
    itemRender: {
      name: '$vxeFormRadio',
      props: {
        disabled: true
      },
      options: [{
        value: 1,
        label: '是'
      },
      {
        value: 0,
        label: '否'
      }
      ]
    }
  },
  {
    field: 'is_gov_info_server',
    title: '是否信息化项目',
    span: 8,
    itemRender: {
      name: '$vxeFormRadio',
      props: {
        disabled: true
      },
      options: [{
        value: '1',
        label: '是'
      },
      {
        value: '0',
        label: '否'
      }
      ]
    }
  },
  {
    field: 'is_track',
    title: '是否追踪',
    span: 8,
    itemRender: {
      name: '$vxeFormRadio',
      props: {
        disabled: true
      },
      options: [
        {
          value: '1',
          label: '是'
        },
        {
          value: '0',
          label: '否'
        }
      ]
    }
  },
  {
    field: 'is_secret_pro',
    title: '是否涉密',
    span: 8,
    itemRender: {
      name: '$vxeFormRadio',
      props: {
        disabled: true
      },
      options: [
        {
          value: '1',
          label: '是'
        },
        {
          value: '0',
          label: '否'
        }
      ]
    }
  },

  {
    field: 'degisn_consideration',
    title: '设立依据',
    span: 24,
    itemRender: {
      name: '$textarea',
      props: {
        type: 'text',
        disabled: true,
        placeholder: '请输入：政策依据，具体文件要求，会议要求，对应部门单位职能，工作方案并在项目附件中上传具体依据'
      }
    }
  },
  {
    field: 'pro_desc',
    title: '项目概述',
    span: 24,
    itemRender: {
      name: '$textarea',
      props: {
        type: 'text',
        disabled: true,
        placeholder: '请输入：项目目标，项目实施方式，项目资金来源及项目风险，项目实施情况等'
      }
    }
  },
  {
    field: 'money_measure',
    title: '经费测算',
    span: 24,
    itemRender: {
      name: '$textarea',
      props: {
        type: 'text',
        disabled: true,
        placeholder: '请输入经费具体测算方法，测算依据'
      }
    }
  },
  {
    field: 'pro_plan',
    title: '项目实施方案',
    span: 24,
    itemRender: {
      name: '$textarea',
      props: {
        type: 'text',
        disabled: true,
        placeholder: '请输入：项目实施地点，项目实施时间，实施方式等'
      }
    }
  },
  {
    field: 'pro_necessary',
    title: '项目必要性',
    span: 24,
    itemRender: {
      name: '$textarea',
      props: {
        type: 'text',
        disabled: true,
        placeholder: '请输入内容'
      }
    }
  },
  {
    field: 'pro_feasibility',
    title: '项目可行性',
    span: 24,
    itemRender: {
      name: '$textarea',
      props: {
        type: 'text',
        disabled: true,
        placeholder: '请输入内容'
      }
    }
  }

]

export const insertFormData = {
  // pro_cat_: '',
  pro_cat_name: '', // 项目类别
  pro_cat_id: '', // 项目类别
  pro_cat_code: '', // 项目类别
  spe_type_name: '', // 专项资金目录
  spe_type_id: '', // 专项资金目录
  spe_type_code: '', // 专项资金目录
  payout_kind_name: '', // 支出项目类别
  payout_kind_id: '', // 支出项目类别
  payout_kind_code: '', // 支出项目类别
  exist_statue_code: '', // 存续状态
  pro_code: '', // 项目代码
  pro_name: '', // 项目名称
  scoi_invest_fund: '',
  use_agency_name: '', // 预算单位
  use_agency_id: '', // 预算单位
  use_agency_code: '', // 预算单位
  dept_name: '', // 主管单位
  dept_id: '', // 主管单位
  dept_code: '', // 主管单位
  mof_dep_name: '', // 财政内部机构
  mof_dep_id: '', // 财政内部机构
  mof_dep_code: '', // 财政内部机构
  pro_start_year: '', // 项目起始年度
  end_year: '', // 项目终止年度
  pro_total_amt: '', // 项目金额
  pro_term: '', // 项目年限
  apply_link_man: '', // 联系人
  apply_link_tel: '', // 联系方式
  distri_type_code: '2',
  is_captial_cons_pro: 0,
  is_scientific: 0,
  is_gov_info_server: '0',
  is_track: '0',
  is_secret_pro: '0',
  money_measure: '',
  pro_plan: '',
  pro_necessary: '',
  pro_feasibility: '',
  degisn_consideration: '', // 设立依据
  pro_desc: ''// 项目概述
}

// 表格校验
export let formValidationConfig = {
  pro_cat_: [
    {
      required: true,
      type: 'string',
      message: '项目类别不能为空',
      trigger: 'change'
      // itemValue就是当前这个字段的值，rule是该字段的校验规则，rules是整个表单的校验规则，property就是当前字段
      // validator({ itemValue, rule, rules, data, property }) {
      //   return new Promise((resolve, reject) => {
      //     if (data.pro_cat_code) {
      //       resolve(true)
      //     } else {
      //       reject(new Error(rule.message))
      //     }
      //   })
      // }
    }
  ],
  exist_statue_code: [
    {
      required: true,
      type: 'string',
      message: '存续状态不能为空',
      trigger: 'change'
    }
  ],
  spe_type_: [
    {
      required: false,
      type: 'string',
      message: '专项资金目录不能为空',
      trigger: 'change'
    }
  ],
  payout_kind_: [
    {
      required: true,
      type: 'string',
      message: '支出项目类别不能为空',
      trigger: 'change'
    }
  ],
  pro_name: [
    {
      required: true,
      type: 'string',
      message: '项目名称不能为空',
      trigger: 'change'
    },
    {
      required: true,
      message: '项目名称长度不能大于60',
      trigger: 'change',
      // itemValue就是当前这个字段的值，rule是该字段的校验规则，rules是整个表单的校验规则，property就是当前字段
      validator({ itemValue, rule, rules, data, property }) {
        return new Promise((resolve, reject) => {
          if (data.pro_name.length <= 60) {
            resolve(true)
          } else {
            reject(new Error(rule.message))
          }
        })
      }
    }
  ],
  pro_start_year: [
    {
      required: true,
      type: 'string',
      message: '项目起始年度不能为空',
      trigger: 'change'
    },
    {
      required: true,
      message: '项目起始年度必须小于项目结束年度',
      trigger: 'change',
      // itemValue就是当前这个字段的值，rule是该字段的校验规则，rules是整个表单的校验规则，property就是当前字段
      validator({ itemValue, rule, rules, data, property }) {
        return new Promise((resolve, reject) => {
          if (data.exist_statue_code !== '003') {
            resolve(true)
          }
          if (parseInt(data.pro_start_year) > parseInt(Store('userInfo').year)) {
            reject(new Error('起始年度必须小于预算年度'))
            return
          }
          if (!data.end_year) {
            resolve(true)
            return
          }
          if (parseInt(data.pro_start_year) < parseInt(data.end_year)) {
            resolve(true)
          } else {
            reject(new Error(rule.message))
          }
        })
      }
    }
  ],
  end_year: [
    {
      required: true,
      type: 'string',
      message: '项目结束年度不能为空',
      validator: ({ itemValue, rule, rules, data, property }) => {
        return new Promise((resolve, reject) => {
          if (data.exist_statue_code === '003') {
            if (itemValue > data.pro_start_year) {
              resolve(true)
            } else {
              reject(new Error('项目结束年度应在项目起始年度之后'))
            }
          } else {
            resolve(true)
          }
        })
      },
      trigger: 'change'
    }
  ],
  fun_res_: [
    {
      required: true,
      type: 'string',
      message: '职能职责不能为空',
      // pattern: /^[a-zA-Z0-9_\u4e00-\u9fa5]+$/i,
      trigger: 'change'
    }
  ],
  pro_total_amt: [
    {
      required: true,
      type: 'string',
      trigger: 'change'
    }
  ],
  apply_link_man: [
    {
      required: true,
      type: 'string',
      message: '申报单位联系人不能为空',
      // pattern: /^[a-zA-Z0-9_\u4e00-\u9fa5]+$/i,
      trigger: 'change'
    },
    {
      required: true,
      message: '申报单位联系人长度不能大于60',
      trigger: 'change',
      // itemValue就是当前这个字段的值，rule是该字段的校验规则，rules是整个表单的校验规则，property就是当前字段
      validator({ itemValue, rule, rules, data, property }) {
        return new Promise((resolve, reject) => {
          if (data.apply_link_man.length <= 60) {
            resolve(true)
          } else {
            reject(new Error(rule.message))
          }
        })
      }
    }
  ],
  apply_link_tel: [
    {
      required: true,
      type: 'text',
      message: '联系方式格式不正确',
      trigger: 'change'
    },
    {
      validator: ({
        itemValue,
        rule,
        rules,
        data,
        property,
        $form
      }) => {
        return new Promise((resolve, reject) => {
          if (
            $form.$ToolFn.validateFn.validate(
              'isTel',
              itemValue,
              '123',
              function (e) {
                console.log(e)
              }
            ) === true
          ) {
            resolve(true)
          } else {
            reject(
              new Error('手机号码须11位 ，电话号码 - 不能放在首位')
            )
          }
        })
      },
      trigger: 'change'
    }
  ],
  degisn_consideration: [
    {
      required: true,
      type: 'string',
      message: '设立依据长度不能为空且在2000汉字以内',
      pattern: /^(.|\n){0,2000}$/i,
      trigger: 'change',
      max: 2000
    }
  ],
  pro_desc: [
    {
      required: true,
      type: 'string',
      message: '项目概述长度不能为空且在150汉字以内',
      trigger: 'change',
      max: 150
    }
  ],
  money_measure: [
    {
      // required: true,
      type: 'string',
      message: '经费测算长度不能为空且在2000汉字以内',
      // pattern: /^[a-zA-Z0-9_\u4e00-\u9fa5]+$/i,
      trigger: 'change',
      min: 1,
      max: 2000
    }
  ],
  pro_plan: [
    {
      // required: true,
      type: 'string',
      message: '项目实施方案长度不能为空且在2000汉字以内',
      // pattern: /^[a-zA-Z0-9_\u4e00-\u9fa5]+$/i,
      trigger: 'change',
      min: 1,
      max: 2000
    }
  ],
  pro_necessary: [
    {
      // required: true,
      type: 'string',
      message: '项目必要性长度不能为空且在2000汉字以内',
      // pattern: /^[a-zA-Z0-9_\u4e00-\u9fa5]+$/i,
      trigger: 'change',
      min: 1,
      max: 2000
    }
  ],
  pro_feasibility: [
    {
      // required: true,
      type: 'string',
      message: '项目可行性长度不能为空且在2000汉字以内',
      // pattern: /^[a-zA-Z0-9_\u4e00-\u9fa5]+$/i,
      trigger: 'change',
      min: 1,
      max: 2000
    }
  ]
}

export default {
  ProjectQuickInput: columns
}
