// import store from '@/store/index'
export let proconf = {
  // BsToolBar 状态栏
  toolBarStatusButtons: [
    {
      type: 'button',
      iconName: 'base-all.png',
      iconNameActive: 'base-all-active.png',
      iconUrl: '',
      label: '全部',
      code: '1',
      curValue: '1'
    }
  ],
  // BsToolBar 右侧按钮
  statusRightToolBarButton: {
    '1': [
      // { code: 'detail', label: '查看详情', status: 'primary' }
    ]
  },
  highQueryConfig: [
    {
      field: 'agencyName',
      title: '预算单位',
      width: '180',
      align: 'left',
      formula: '',
      name: '$vxeInput',
      itemRender: {
        name: '$vxeInput',
        props: {
          placeholder: '预算单位'
        }
      }
    },
    // {
    //   field: 'violateType',
    //   title: '违规类型',
    //   width: 180,
    //   itemRender: {
    //     name: '$vxeSelect',
    //     options: [
    //       {
    //         value: '指标使用不当',
    //         label: '指标使用不当'
    //       },
    //       {
    //         value: '支出进度太慢',
    //         label: '支出进度太慢'
    //       },
    //       {
    //         value: '资金使用方向错误',
    //         label: '资金使用方向错误'
    //       },
    //       {
    //         value: '资金超支',
    //         label: '资金超支'
    //       }
    //     ],
    //     props: {
    //       placeholder: '违规类型',
    //       disabled: false
    //     }
    //   }
    // },
    {
      title: '监控规则',
      field: 'fiRuleName',
      width: '8',
      align: 'left',
      formula: '',
      name: '$vxeInput',
      itemRender: {
        name: '$vxeInput',
        options: [],
        props: {
          placeholder: '监控规则'
        }
      }
    }
    // ,
    // {
    //   title: '下发时间',
    //   field: 'issueTime',
    //   itemRender: { name: '$input', props: { disabled: false, type: 'date', placeholder: '请选择下发时间' } }
    // }
    // {
    //   title: '整改时间',
    //   field: 'issueTime',
    //   itemRender: { name: '$input', props: { type: 'date', placeholder: '请选择整改时间' } }
    // }
  ],
  highQueryData: {
    issueTime: '',
    fiRuleName: ''
  },
  createHighQueryConfig: [
    {
      field: 'agencyName',
      title: '预算单位',
      width: '180',
      align: 'left',
      formula: '',
      name: '$vxeInput',
      itemRender: {
        name: '$vxeInput',
        props: {
          placeholder: '预算单位'
        }
      }
    },
    {
      title: '监控规则',
      field: 'fiRuleName',
      width: '8',
      align: 'left',
      formula: '',
      name: '$vxeInput',
      itemRender: {
        name: '$vxeInput',
        options: [],
        props: {
          placeholder: '监控规则'
        }
      }
    }
  ],
  createHighQueryData: {
    fiRuleName: ''
  },
  warnQueryConfig: [
    {
      title: '管理级次',
      field: 'regulationType',
      width: '8',
      align: 'left',
      formula: '',
      name: '$vxeSelect',
      itemRender: {
        name: '$vxeSelect',
        options: [
          { value: '1', label: '系统级' },
          { value: '2', label: '财政级' },
          { value: '3', label: '部门级' }
        ],
        props: {
          placeholder: '管理级次'
        }
      }
    },
    {
      title: '预警级别',
      field: 'warningLevel',
      'width': 180,
      align: 'center',
      formula: '',
      name: '$vxeSelect',
      itemRender: {
        name: '$vxeSelect',
        options: [
          { value: '1', label: '黄色预警' },
          { value: '2', label: '橙色预警' },
          { value: '3', label: '红色预警' },
          { value: '4', label: '蓝色预警' }
        ],
        props: {
          placeholder: '预警级别'
        }
      }
    },
    {
      title: '规则名称',
      field: 'firulename',
      width: '8',
      align: 'left',
      formula: '',
      name: '$vxeInput',
      itemRender: {
        name: '$vxeInput',
        options: [],
        props: {
          placeholder: '规则名称'
        }
      }
    }
  ],
  warnQueryData: {
    regulationType: '',
    warningLevel: '',
    firulename: ''
  },
  // 新增弹窗高级查询
  sethighQueryConfig: [
    // {
    //   title: '规则模板编码',
    //   field: 'declareCode',
    //   width: '8',
    //   align: 'left',
    //   formula: '',
    //   name: '$vxeInput',
    //   itemRender: {
    //     name: '$vxeInput',
    //     options: [],
    //     props: {
    //       placeholder: '规则模板编码'
    //     }
    //   }
    // },
    {
      title: '规则模板名称',
      field: 'ruleTemplateName',
      width: 180,
      align: 'left',
      formula: '',
      name: '$vxeInput',
      itemRender: {
        name: '$vxeInput',
        options: [],
        props: {
          placeholder: '规则模板名称'
        }
      }
    }
  ],
  sethighQueryData: {
    declareCode: '',
    ruleTemplateName: ''
  },
  policiesTableColumns: [
    {
      title: '年度',
      width: 180,
      field: 'fiscalYear',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '区划',
      width: 180,
      field: 'mofDivCode',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '预算单位',
      width: 180,
      field: 'agencyName',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '单号',
      width: 180,
      field: 'dealNo',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '监控规则',
      width: 180,
      field: 'fiRuleName',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '预警级别',
      field: 'warnLevel',
      width: 180,
      align: 'center',
      formula: '',
      name: '$vxeSelect',
      itemRender: {
        name: '$vxeSelect',
        options: [
          { value: '1', label: '黄色预警' },
          { value: '2', label: '橙色预警' },
          { value: '3', label: '红色预警' },
          { value: '4', label: '蓝色预警' }
        ],
        props: {
          placeholder: '预警级别'
        }
      }
    },
    {
      title: '处理方式',
      field: 'handleType',
      align: 'center',
      width: 180,
      cellRender: {
        name: '$vxeSelect',
        options: [
          {
            value: 1,
            label: '预警，无需上传附件'
          },
          {
            value: 2,
            label: '预警，需上传附件'
          },
          {
            value: 3,
            label: '拦截'
          },
          {
            value: 4,
            label: '记录'
          }
        ],
        defaultValue: '',
        props: {}
      },
      name: '$vxeSelect'
    },
    {
      title: '处理结果',
      width: 180,
      field: 'handleResult',
      sortable: false,
      filters: false,
      align: 'center',
      cellRender: {
        name: '$vxeSelect',
        options: [
          {
            value: 1,
            label: '通过'
          },
          {
            value: 2,
            label: '不通过'
          }
        ],
        defaultValue: '',
        props: {}
      },
      name: '$vxeSelect'
    },
    {
      title: '查看详情',
      field: 'gloableOptionRow',
      align: 'center',
      sortable: false,
      filters: false,
      width: 180,
      cellRender: {
        name: '$ReportTaskGloableOptionRow'
      }
    },
    {
      title: '生成状态',
      width: 180,
      field: 'status',
      sortable: false,
      filters: false,
      align: 'center',
      cellRender: {
        name: '$vxeSelect',
        options: [
          {
            value: 0,
            label: '未下发'
          },
          {
            value: 1,
            label: '已下发'
          },
          {
            value: 2,
            label: '单位已整改'
          },
          {
            value: 3,
            label: '部门已整改'
          },
          {
            value: 4,
            label: '处室已整改'
          },
          {
            value: 5,
            label: '归档'
          }
        ],
        defaultValue: '',
        props: {}
      },
      name: '$vxeSelect'
      // 0 未下发；1 已下发；2已整改；3已归档
    }
  ],
  logoTableColumns: [
    {
      title: '区划',
      width: 180,
      field: 'mofDivCode',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '预算单位',
      width: 180,
      field: 'agencyName',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '监控规则',
      width: 265,
      field: 'fiRuleName',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '预警级别',
      field: 'warnLevel',
      width: 180,
      align: 'center',
      formula: '',
      name: '$vxeSelect',
      itemRender: {
        name: '$vxeSelect',
        options: [
          { value: '1', label: '黄色预警' },
          { value: '2', label: '橙色预警' },
          { value: '3', label: '红色预警' },
          { value: '4', label: '蓝色预警' }
        ],
        props: {
          placeholder: '预警级别'
        }
      }
    },
    {
      title: '查看详情',
      field: 'gloableOptionRow',
      align: 'center',
      sortable: false,
      filters: false,
      width: 180,
      cellRender: {
        name: '$ReportTaskGloableOptionRow'
      }
    }
  ],
  warnTableColumns: [
    {
      title: '区划',
      'width': 180,
      field: 'mofDivCode',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '预警级别',
      'width': 180,
      field: 'warnlevel',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '管理级次',
      'width': 180,
      field: 'regulationtype',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '预算单位编码',
      'width': 180,
      field: 'agencycode',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '预算单位名称',
      'width': 180,
      field: 'agencyname',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '规则编码',
      'width': 180,
      field: 'firulecode',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '规则名称',
      'width': 180,
      field: 'firulename',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      'title': '处理情况',
      'field': 'status',
      'align': 'center',
      'width': 180,
      'cellRender': {
        'name': '$vxeSelect',
        options: [
          {
            'value': '1',
            'label': '待处理'
          },
          {
            'value': '2',
            'label': '已处理'
          }
        ],
        'defaultValue': '',
        'props': {}
      },
      'name': '$vxeSelect'
    },
    {
      title: '支付申请编码',
      'width': 180,
      field: 'fivouno',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      'title': '支付申请金额',
      'field': 'paymentamount',
      'width': '200',
      'align': 'right',
      'filters': '[object Object]',
      'filterRender': {
        'name': 'FilterNumberCompare'
      },
      'combinedType': 'average,subTotal,total,totalAll',
      'cellRender': {
        'name': '$moneyRender',
        'options': [],
        'defaultValue': '',
        'props': {}
      },
      'name': '$moneyRender',
      'fixed': '',
      'formula': '',
      'constraint': '',
      'sortable': 'true',
      'associatedQuery': '',
      'className': '',
      'combinedType_select_sort': '平均值,选中合计,当前页合计,所有合计'
    },
    {
      title: '资金用途',
      'width': 180,
      field: 'useoffunds',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '监控拦截时间',
      'width': 180,
      field: 'createTime',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '违规处理时间',
      'width': 180,
      field: 'handleTime',
      sortable: false,
      filters: false,
      align: 'center'
    }
  ],
  createBtnConfig: {
    changeBtns: true,
    buttons: [
      {
        type: 'button',
        label: '待下发-待下发',
        code: 'unIssue',
        iconName: 'base-daiban.png',
        iconNameActive: 'base-daiban-active.png'
      },
      {
        type: 'button',
        label: '已下发-已下发',
        code: 'issued',
        iconName: 'base-zhibaio.png',
        iconNameActive: 'base-zhibaio-active.png'
      }
      // {
      //   type: 'button',
      //   label: '预警明细列表',
      //   code: 'warnList',
      //   iconName: 'base-daiban.png',
      //   iconNameActive: 'base-daiban-active.png'
      // }
    ],
    curButton: {
      label: '待下发',
      code: 'unIssue',
      type: 'button'
    },
    buttonsInfo: {
      'unIssue': [
        {
          label: '生成',
          code: 'create',
          status: 'primary'
        }
      ],
      'issued': [
      ]
    }
  },
  retroactBtnConfig: {
    changeBtns: true,
    buttons: [
      {
        type: 'button',
        label: '待整改-待整改',
        code: 'rectify',
        iconName: 'base-daiban.png',
        iconNameActive: 'base-daiban-active.png'
      },
      {
        type: 'button',
        label: '已整改-已整改',
        code: 'rectified',
        iconName: 'base-zhibaio.png',
        iconNameActive: 'base-zhibaio-active.png'
      }
      // {
      //   type: 'button',
      //   label: '预警明细列表',
      //   code: 'warnList',
      //   iconName: 'base-daiban.png',
      //   iconNameActive: 'base-daiban-active.png'
      // }
    ],
    curButton: {
      label: '待整改',
      code: 'rectify',
      type: 'button'
    },
    buttonsInfo: {
      'rectify': [
        {
          label: '整改反馈',
          code: 'feedback',
          status: 'primary'
        }
      ],
      'rectified': [
      ]
    }
  },
  archiveBtnConfig: {
    changeBtns: true,
    buttons: [
      {
        type: 'button',
        label: '待归档-待归档',
        code: 'archive',
        iconName: 'base-daiban.png',
        iconNameActive: 'base-daiban-active.png'
      },
      {
        type: 'button',
        label: '已归档-已归档',
        code: 'archived',
        iconName: 'base-zhibaio.png',
        iconNameActive: 'base-zhibaio-active.png'
      }
      // {
      //   type: 'button',
      //   label: '预警明细列表',
      //   code: 'warnList',
      //   iconName: 'base-daiban.png',
      //   iconNameActive: 'base-daiban-active.png'
      // }
    ],
    curButton: {
      label: '待归档-待归档',
      code: 'archive',
      type: 'button'
    },
    buttonsInfo: {
      'archive': [
        {
          label: '归档',
          code: 'archiving',
          status: 'primary'
        }
      ],
      'archived': [
      ]
    }
  },
  searchBtnConfig: {
    changeBtns: true,
    buttons: [
      {
        type: 'button',
        label: '查询',
        code: 'search',
        iconName: 'base-daiban.png',
        iconNameActive: 'base-daiban-active.png'
      }
    ],
    curButton: {
      type: 'button',
      label: '查询',
      code: 'search',
      iconName: 'base-daiban.png',
      iconNameActive: 'base-daiban-active.png'
    },
    buttonsInfo: {
      'search': [
        {
          label: '查看详情',
          code: 'checkDetail',
          status: 'primary'
        },
        {
          label: '校验',
          code: 'check',
          status: 'primary'
        }
      ]
    }
  },
  gloableOptionRow: {
    renderDefault(h, cellRender, params, context) {
      let self = context.$grid.$parent
      let { row, column } = params
      return [
        <el-tooltip content="" placement="" effect="light">
          <span style="color: #4293F4; text-decoration: underline" onClick={() => self.onOptionRowClick({ row, column })}>查看</span>
        </el-tooltip>
      ]
    }
  },
  // 处理
  handletableColumnsConfig: [
    {
      title: '规则名称',
      field: 'regulationName',
      sortable: false,
      align: 'left'
    },
    {
      'title': '预警级别',
      'field': 'warningLevel',
      'align': 'center',
      'cellRender': {
        'name': '$vxeSelect',
        'options': [
          {
            'value': '1',
            'label': '黄色预警'
          },
          {
            'value': '2',
            'label': '橙色预警'
          },
          {
            'value': '3',
            'label': '红色预警'
          },
          {
            'value': '4',
            'label': '非人工蓝色预警'
          }
        ],
        'defaultValue': '',
        'props': {}
      },
      'sortable': 'true',
      'name': '$vxeSelect'
    },
    {
      'title': '处理方式',
      'field': 'handleType',
      'align': 'center',
      'cellRender': {
        'name': '$vxeSelect',
        'options': [
          {
            'value': '1',
            'label': '预警，无需上传附件'
          },
          {
            'value': '2',
            'label': '预警，需上传附件'
          },
          {
            'value': '3',
            'label': '拦截'
          },
          {
            'value': '4',
            'label': '记录'
          }
        ],
        'defaultValue': '',
        'props': {}
      },
      'sortable': 'true',
      'name': '$vxeSelect'
    }
  ],
  incomeMsgConfig: [
    {
      field: 'warningCode',
      title: '监控数据编码',
      titleWidth: '180',
      span: 8,
      itemRender: {
        name: '$vxeInput',
        props: { placeholder: '监控数据编码', disabled: true }
      }
    },
    {
      field: 'pay_app_no',
      title: '支付申请编号',
      titleWidth: '180',
      span: 8,
      itemRender: {
        name: '$vxeInput',
        props: { placeholder: '支付申请编号', disabled: true }
      }
    },
    {
      field: 'agency_name',
      title: '预算单位',
      titleWidth: '180',
      span: 8,
      itemRender: {
        name: '$vxeInput',
        props: { placeholder: '预算单位', disabled: true }
      }
    },
    {
      field: 'cor_bgt_doc_no_name',
      title: '指标文号',
      titleWidth: '180',
      span: 8,
      itemRender: {
        name: '$vxeInput',
        props: { placeholder: '指标文号', disabled: true }
      }
    },
    {
      title: '预算项目',
      field: 'pro_name',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '预算项目' } }
    },
    {
      title: '收支类别',
      field: 'pro_cat_name',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '收支类别' }
      }
    },
    {
      title: '付款人',
      field: 'pay_acct_name',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '付款人' }
      }
    },
    {
      title: '付款人账号',
      field: 'pay_acct_no',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '付款人账号' }
      }
    },
    {
      title: '付款银行',
      field: 'pay_acct_bank_name',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '付款银行' }
      }
    },
    {
      title: '收款人',
      field: 'payee_acct_name',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '收款人' }
      }
    },
    {
      title: '收款人账号',
      field: 'payee_acct_no',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '收款人账号' }
      }
    },
    {
      title: '收款银行',
      field: 'payee_acct_bank_name',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '收款银行' }
      }
    },
    {
      field: 'pay_app_amt',
      title: '支付金额',
      titleWidth: '180',
      span: 8,
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '支付金额' }
      }
    },
    {
      title: '资金用途',
      field: 'use_des',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '资金用途' }
      }
    },
    {
      title: '政府经济分类',
      field: 'gov_bgt_eco_name',
      titleWidth: '180',
      span: 8,
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '政府经济分类' }
      }
    },
    {
      title: '部门经济分类',
      field: 'dep_bgt_eco_name',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '部门经济分类' }
      }
    },
    {
      title: '资金性质',
      field: 'fund_type_name',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '资金性质' }
      }
    },
    {
      title: '功能分类',
      field: 'exp_func_name',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '功能分类' }
      }
    },
    {
      title: '支付方式',
      field: 'pay_type_name',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '支付方式' }
      }
    },
    {
      title: '结算方式',
      field: 'set_mode_name',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '结算方式' }
      }
    },
    {
      title: '业务处室',
      field: 'manage_mof_dep_name',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '业务处室' }
      }
    },
    {
      title: '工资标识',
      field: 'is_sal_name',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '工资标识' }
      }
    },
    {
      title: '是否工会经费',
      field: 'is_fun_name',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '是否工会经费' }
      }
    },
    {
      title: '三公经费',
      field: 'thr_exp_name',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '三公经费' }
      }
    },
    {
      title: '直达资金标识',
      field: 'is_dir_name',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '直达资金标识' }
      }
    },
    {
      title: '监控时间',
      field: 'fiDate',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { type: 'datetime', disabled: true, placeholder: '监控时间' }
      }
    }
  ],
  incomeMsgData: {
    warningCode: '',
    payApplyNumber: '',
    agencyName: '',
    targetDocNum: '',
    projectName: '',
    projectTypeName: '',
    payer: '',
    payAccount: '',
    payBankName: '',
    payee: '',
    receiveAccount: '',
    receiveBankName: '',
    paymentAmount: '',
    useOfFunds: '',
    govEconomyType: '',
    deptEconomyType: '',
    natureOfFunds: '',
    funcType: '',
    paymentMethod: '',
    settlementMethod: '',
    businessOffice: '',
    salaryMark: '',
    isUnionFunds: '',
    isThrExp: '',
    directFund: '',
    createTime: '',
    fiDate: ''
  },
  // 生成时部分字段可编辑
  createConfig: [
    {
      field: 'violateType',
      title: '违规类型',
      titleWidth: '180',
      span: 8,
      itemRender: {
        name: '$vxeSelect',
        props: { placeholder: '违规类型' },
        options: [
          {
            value: '指标使用不当',
            label: '指标使用不当'
          },
          {
            value: '支出进度太慢',
            label: '支出进度太慢'
          },
          {
            value: '资金使用方向错误',
            label: '资金使用方向错误'
          },
          {
            value: '资金超支',
            label: '资金超支'
          }
        ]
      }
    },
    {
      field: 'fiRuleName',
      title: '监控规则',
      titleWidth: '180',
      span: 8,
      itemRender: {
        name: '$vxeInput',
        props: { placeholder: '监控规则', disabled: true }
      }
    },
    {
      title: '预警级别',
      field: 'warnLevel',
      align: 'center',
      titleWidth: '180',
      span: 8,
      itemRender: {
        name: '$vxeSelect',
        props: { disabled: true, placeholder: '预警级别' },
        options: [
          {
            value: '1',
            label: '黄色预警'
          },
          {
            value: '2',
            label: '橙色预警'
          },
          {
            value: '3',
            label: '红色预警'
          },
          {
            value: '4',
            label: '非人工蓝色预警'
          }
        ],
        defaultValue: ''
      },
      name: '$vxeSelect'
    },
    {
      title: '处理方式',
      field: 'handleType',
      align: 'center',
      titleWidth: '180',
      span: 8,
      itemRender: {
        name: '$vxeSelect',
        options: [
          {
            value: 1,
            label: '预警，无需上传附件'
          },
          {
            value: 2,
            label: '预警，需上传附件'
          },
          {
            value: 3,
            label: '拦截'
          },
          {
            value: 4,
            label: '记录'
          }
        ],
        defaultValue: '',
        props: { placeholder: '处理方式' }
      },
      name: '$vxeSelect'
    },
    {
      title: '处理结果',
      field: 'handleResult',
      align: 'center',
      titleWidth: '180',
      span: 8,
      itemRender: {
        name: '$vxeSelect',
        options: [
          {
            value: 1,
            label: '通过'
          },
          {
            value: 2,
            label: '不通过'
          }
        ],
        defaultValue: '',
        props: { placeholder: '处理结果' }
      },
      name: '$vxeSelect'
    },
    {
      title: '区划',
      field: 'mofDivCode',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '区划' } }
    },
    {
      title: '生成日期',
      field: 'issueTime',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '生成日期' }
      }
    }
  ],
  createDataList: {
    issueTime: '',
    mofDivCode: '',
    handleType: '',
    handleResult: '',
    warnLevel: '',
    violateType: '',
    fiRuleName: ''
  },
  createTableColumns: [ // 归档查询
    {
      title: '年度',
      width: 180,
      field: 'fiscalYear',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '区划',
      width: 180,
      field: 'mofDivCode',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '预算单位',
      width: 180,
      field: 'agencyName',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '监控处理单号',
      width: 180,
      field: 'dealNo',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '生成日期',
      width: 180,
      field: 'issueTime',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      field: 'violateType',
      title: '违规类型',
      width: 180,
      disabled: true,
      itemRender: {
        name: '$vxeSelect',
        disabled: true,
        options: [
          {
            value: '指标使用不当',
            label: '指标使用不当'
          },
          {
            value: '支出进度太慢',
            label: '支出进度太慢'
          },
          {
            value: '资金使用方向错误',
            label: '资金使用方向错误'
          },
          {
            value: '资金超支',
            label: '资金超支'
          }
        ]
      }
    },
    {
      title: '监控规则',
      width: 180,
      field: 'fiRuleName',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '预警级别',
      field: 'warnLevel',
      width: 180,
      align: 'center',
      formula: '',
      name: '$vxeSelect',
      itemRender: {
        name: '$vxeSelect',
        options: [
          { value: '1', label: '黄色预警' },
          { value: '2', label: '橙色预警' },
          { value: '3', label: '红色预警' },
          { value: '4', label: '蓝色预警' }
        ],
        props: {
          placeholder: '预警级别'
        }
      }
    },
    {
      title: '处理方式',
      field: 'handleType',
      align: 'center',
      cellRender: {
        name: '$vxeSelect',
        options: [
          {
            value: 1,
            label: '预警，无需上传附件'
          },
          {
            value: 2,
            label: '预警，需上传附件'
          },
          {
            value: 3,
            label: '拦截'
          },
          {
            value: 4,
            label: '记录'
          }
        ],
        defaultValue: '',
        props: {}
      },
      name: '$vxeSelect'
    },
    {
      title: '单位整改意见',
      width: 180,
      field: 'information1',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '部门整改意见',
      width: 180,
      field: 'information2',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '主管处室意见',
      width: 180,
      field: 'information3',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '归档状态',
      width: 180,
      field: 'status',
      align: 'center',
      cellRender: {
        name: '$vxeSelect',
        options: [
          {
            value: 0,
            label: '未下发'
          },
          {
            value: 1,
            label: '已下发'
          },
          {
            value: 2,
            label: '单位已整改'
          },
          {
            value: 3,
            label: '部门已整改'
          },
          {
            value: 4,
            label: '处室已整改'
          },
          {
            value: 5,
            label: '归档'
          }
        ],
        defaultValue: '',
        props: {}
      },
      name: '$vxeSelect'
      // 0 未下发；1 已下发；2已整改；3已归档
    }
  ],
  // 整改查看时不可编辑
  checkConfig: [
    {
      field: 'violateType',
      title: '违规类型',
      titleWidth: '180',
      span: 8,
      itemRender: {
        name: '$vxeSelect',
        props: { disabled: true, placeholder: '违规类型' },
        options: [
          {
            value: '指标使用不当',
            label: '指标使用不当'
          },
          {
            value: '支出进度太慢',
            label: '支出进度太慢'
          },
          {
            value: '资金使用方向错误',
            label: '资金使用方向错误'
          },
          {
            value: '资金超支',
            label: '资金超支'
          }
        ]
      }
    },
    {
      field: 'fiRuleName',
      title: '监控规则',
      titleWidth: '180',
      span: 8,
      itemRender: {
        name: '$vxeInput',
        props: { placeholder: '监控规则', disabled: true }
      }
    },
    {
      title: '预警级别',
      field: 'warnLevel',
      align: 'center',
      titleWidth: '180',
      span: 8,
      itemRender: {
        name: '$vxeSelect',
        props: { disabled: true, placeholder: '预警级别' },
        options: [
          {
            value: '1',
            label: '黄色预警'
          },
          {
            value: '2',
            label: '橙色预警'
          },
          {
            value: '3',
            label: '红色预警'
          },
          {
            value: '4',
            label: '非人工蓝色预警'
          }
        ],
        defaultValue: ''
      },
      name: '$vxeSelect'
    },
    {
      title: '处理方式',
      field: 'handleType',
      align: 'center',
      titleWidth: '180',
      span: 8,
      itemRender: {
        name: '$vxeSelect',
        options: [
          {
            value: 1,
            label: '预警，无需上传附件'
          },
          {
            value: 2,
            label: '预警，需上传附件'
          },
          {
            value: 3,
            label: '拦截'
          },
          {
            value: 4,
            label: '记录'
          }
        ],
        defaultValue: '',
        props: { disabled: true, placeholder: '处理方式' }
      },
      name: '$vxeSelect'
    },
    {
      title: '处理结果',
      field: 'handleResult',
      align: 'center',
      titleWidth: '180',
      span: 8,
      itemRender: {
        name: '$vxeSelect',
        options: [
          {
            value: 1,
            label: '通过'
          },
          {
            value: 2,
            label: '不通过'
          }
        ],
        defaultValue: '',
        props: { disabled: true, placeholder: '处理结果' }
      },
      name: '$vxeSelect'
    },
    {
      title: '区划',
      field: 'mofDivCode',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '区划' } }
    },
    {
      title: '生成日期',
      field: 'issueTime',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '生成日期' }
      }
    }
  ]
}
