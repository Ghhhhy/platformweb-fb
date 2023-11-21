import store from '@/store/index'
let proconf = {
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
      // { code: 'sign', label: '疑似违规', status: 'primary' },
      { code: 'detail', label: '查看详情', status: 'primary' }
    ]
  },
  statusRightToolBarButton1: {
    '1': [
      // { code: 'sign', label: '疑似违规', status: 'primary' },
      { code: 'detail', label: '查看详情', status: 'primary' }
    ]
  },
  statusRightToolBarButtonToSx: {
    '1': [
      { code: 'mark', label: '标记疑点', status: 'primary' },
      { code: 'detail', label: '查看详情', status: 'primary' }
    ]
  },
  highQueryConfig: [
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
      field: 'warnLevel',
      'width': 180,
      align: 'left',
      formula: '',
      name: '$vxeSelect',
      itemRender: {
        name: '$vxeSelect',
        options: store.state.warnInfo.warnLevelOptions.map(item => {
          return {
            ...item,
            value: String(item.value)
          }
        }),
        defaultValue: '',
        props: { disabled: false, placeholder: '预警级别' }
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
    // },
    // {
    //   title: '主题',
    //   field: 'regulation_class',
    //   'width': 180,
    //   align: 'left',
    //   formula: '',
    //   name: '$vxeSelect',
    //   itemRender: {
    //     name: '$vxeSelect',
    //     options: [
    //     ],
    //     props: {
    //       placeholder: '主题'
    //     }
    //   }
    },
    {
      title: '监控类型',
      field: 'triggerClass',
      'width': 180,
      align: 'left',
      formula: '',
      name: '$vxeSelect',
      itemRender: {
        name: '$vxeSelect',
        options: [
          { value: '0', label: '实时' },
          { value: '1', label: '定时' }
        ],
        props: {
          placeholder: '监控类型'
        }
      }
    },
    {
      title: '资金用途',
      field: 'useDes',
      'width': 180,
      align: 'left',
      formula: '',
      name: '$vxeInput',
      itemRender: {
        name: '$vxeInput',
        options: [],
        props: {
          placeholder: '资金用途'
        }
      }
    },
    {
      title: '业务数据开始时间',
      field: 'businessTime',
      itemRender: {
        name: '$vxeTime',
        defaultValue: '',
        props: {
          format: 'YYYY-MM-DD',
          type: 'date', // "当前日期为：YYYY-MM-DD，星期W，为第Q季度，时间为：hh:mm:ss:c"
          placeholder: '业务数据开始时间'
        }
      }
    },
    {
      title: '业务数据结束时间',
      field: 'endTime',
      itemRender: {
        name: '$vxeTime',
        defaultValue: '',
        props: {
          format: 'YYYY-MM-DD',
          type: 'date', // "当前日期为：YYYY-MM-DD，星期W，为第Q季度，时间为：hh:mm:ss:c"
          placeholder: '业务数据结束时间'
        }
      }
    },
    {
      title: '是否疑似违规',
      field: 'isSign',
      'width': 180,
      align: 'left',
      formula: '',
      name: '$vxeSelect',
      itemRender: {
        name: '$vxeSelect',
        options: [
          { value: 0, label: '疑点信息' },
          { value: 1, label: '正常' },
          { value: 2, label: '违规' }
        ],
        props: {
          placeholder: '是否标记'
        }
      }
    },
    {
      title: '支付申请编号',
      field: 'businessNo',
      name: '$vxeInput',
      itemRender: {
        name: '$vxeInput',
        props: {
          placeholder: '支付申请编号'
        }
      }
    },
    {
      title: '是否作废',
      field: 'voidOrNot',
      width: 180,
      align: 'left',
      formula: '',
      name: '$vxeSelect',
      itemRender: {
        name: '$vxeSelect',
        options: [
          { value: '1', label: '是' },
          { value: '2', label: '否' }
        ],
        props: {
          placeholder: '是否作废'
        }
      }
    }
  ],
  highQueryConfigPay: [
    // {
    //   title: '管理级次',
    //   field: 'regulationType',
    //   width: '8',
    //   align: 'left',
    //   formula: '',
    //   name: '$vxeSelect',
    //   itemRender: {
    //     name: '$vxeSelect',
    //     options: [
    //       { value: '1', label: '系统级' },
    //       { value: '2', label: '财政级' },
    //       { value: '3', label: '部门级' }
    //     ],
    //     props: {
    //       placeholder: '管理级次'
    //     }
    //   }
    // },
    {
      title: '预警级别',
      field: 'warningLevel',
      'width': 180,
      align: 'left',
      formula: '',
      name: '$vxeSelect',
      itemRender: {
        name: '$vxeSelect',
        options: [
          { value: 1, label: '拦截' },
          { value: 2, label: '预警' },
          { value: 3, label: '冻结' }
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
      // },
      // {
      //   title: '主题',
      //   field: 'regulation_class',
      //   'width': 180,
      //   align: 'left',
      //   formula: '',
      //   name: '$vxeSelect',
      //   itemRender: {
      //     name: '$vxeSelect',
      //     options: [
      //     ],
      //     props: {
      //       placeholder: '主题'
      //     }
      //   }
    },
    // {
    //   title: '监控类型',
    //   field: 'triggerClass',
    //   'width': 180,
    //   align: 'left',
    //   formula: '',
    //   name: '$vxeSelect',
    //   itemRender: {
    //     name: '$vxeSelect',
    //     options: [
    //       { value: '0', label: '实时' },
    //       { value: '1', label: '定时' }
    //     ],
    //     props: {
    //       placeholder: '监控类型'
    //     }
    //   }
    // },
    {
      title: '资金用途',
      field: 'useDes',
      'width': 180,
      align: 'left',
      formula: '',
      name: '$vxeInput',
      itemRender: {
        name: '$vxeInput',
        options: [],
        props: {
          placeholder: '资金用途'
        }
      }
    },
    {
      title: '业务数据开始时间',
      field: 'businessTime',
      itemRender: {
        name: '$vxeTime',
        defaultValue: '',
        props: {
          format: 'YYYY-MM-DD',
          type: 'date', // "当前日期为：YYYY-MM-DD，星期W，为第Q季度，时间为：hh:mm:ss:c"
          placeholder: '业务数据开始时间'
        }
      }
    },
    {
      title: '业务数据结束时间',
      field: 'endTime',
      itemRender: {
        name: '$vxeTime',
        defaultValue: '',
        props: {
          format: 'YYYY-MM-DD',
          type: 'date', // "当前日期为：YYYY-MM-DD，星期W，为第Q季度，时间为：hh:mm:ss:c"
          placeholder: '业务数据结束时间'
        }
      }
    },
    // {
    //   title: '是否疑似违规',
    //   field: 'isSign',
    //   'width': 180,
    //   align: 'left',
    //   formula: '',
    //   name: '$vxeSelect',
    //   itemRender: {
    //     name: '$vxeSelect',
    //     options: [
    //       { value: 0, label: '疑点信息' },
    //       { value: 1, label: '正常' },
    //       { value: 2, label: '违规' }
    //     ],
    //     props: {
    //       placeholder: '是否标记'
    //     }
    //   }
    // },
    {
      title: '支付申请编号',
      field: 'businessNo',
      name: '$vxeInput',
      itemRender: {
        name: '$vxeInput',
        props: {
          placeholder: '支付申请编号'
        }
      }
    }
  ],
  highQueryConfigFullJurisdiction: [
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
      field: 'warnLevel',
      'width': 180,
      align: 'left',
      formula: '',
      name: '$vxeSelect',
      itemRender: {
        name: '$vxeSelect',
        options: store.state.warnInfo.warnLevelOptions.map(item => {
          return {
            ...item,
            value: String(item.value)
          }
        }),
        defaultValue: '',
        props: { disabled: false, placeholder: '预警级别' }
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
      // },
      // {
      //   title: '主题',
      //   field: 'regulation_class',
      //   'width': 180,
      //   align: 'left',
      //   formula: '',
      //   name: '$vxeSelect',
      //   itemRender: {
      //     name: '$vxeSelect',
      //     options: [
      //     ],
      //     props: {
      //       placeholder: '主题'
      //     }
      //   }
    },
    {
      title: '监控类型',
      field: 'triggerClass',
      'width': 180,
      align: 'left',
      formula: '',
      name: '$vxeSelect',
      itemRender: {
        name: '$vxeSelect',
        options: [
          { value: '0', label: '实时' },
          { value: '1', label: '定时' }
        ],
        props: {
          placeholder: '监控类型'
        }
      }
    },
    {
      title: '资金用途',
      field: 'useDes',
      'width': 180,
      align: 'left',
      formula: '',
      name: '$vxeInput',
      itemRender: {
        name: '$vxeInput',
        options: [],
        props: {
          placeholder: '资金用途'
        }
      }
    },
    {
      title: '业务数据开始时间',
      field: 'businessTime',
      itemRender: {
        name: '$vxeTime',
        defaultValue: '',
        props: {
          format: 'YYYY-MM-DD',
          type: 'date', // "当前日期为：YYYY-MM-DD，星期W，为第Q季度，时间为：hh:mm:ss:c"
          placeholder: '业务数据开始时间'
        }
      }
    },
    {
      title: '业务数据结束时间',
      field: 'endTime',
      itemRender: {
        name: '$vxeTime',
        defaultValue: '',
        props: {
          format: 'YYYY-MM-DD',
          type: 'date', // "当前日期为：YYYY-MM-DD，星期W，为第Q季度，时间为：hh:mm:ss:c"
          placeholder: '业务数据结束时间'
        }
      }
    },
    {
      title: '是否疑似违规',
      field: 'isSign',
      'width': 180,
      align: 'left',
      formula: '',
      name: '$vxeSelect',
      itemRender: {
        name: '$vxeSelect',
        options: [
          { value: 0, label: '疑点信息' },
          { value: 1, label: '正常' },
          { value: 2, label: '违规' }
        ],
        props: {
          placeholder: '是否标记'
        }
      }
    },
    {
      title: '支付申请编号',
      field: 'businessNo',
      name: '$vxeInput',
      itemRender: {
        name: '$vxeInput',
        props: {
          placeholder: '支付申请编号'
        }
      }
    },
    {
      title: '专项资金编码',
      field: 'trackProCode',
      name: '$vxeInput',
      itemRender: {
        name: '$vxeInput',
        props: {
          placeholder: '专项资金编码'
        }
      }
    },
    {
      title: '专项资金名称',
      field: 'trackProName',
      name: '$vxeInput',
      itemRender: {
        name: '$vxeInput',
        props: {
          placeholder: '专项资金名称'
        }
      }
    },
    {
      title: '是否作废',
      field: 'voidOrNot',
      width: '180',
      align: 'left',
      formula: '',
      name: '$vxeSelect',
      itemRender: {
        name: '$vxeSelect',
        options: [
          { value: '1', label: '是' },
          { value: '2', label: '否' }
        ],
        props: {
          placeholder: '是否作废'
        }
      }
    }
  ],
  highQueryData: {
    regulationType: '',
    warningLevel: '',
    firulename: '',
    endTime: '',
    businessNo: ''
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
      'width': 180,
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
  // 新增弹窗列表
  monitorSetTableColumnsConfig: [
    {
      title: '规则模板编码',
      field: 'ruleTemplateCode',
      sortable: false,
      align: 'left'
    },
    {
      title: '规则模板名称',
      field: 'ruleTemplateName',
      sortable: false,
      align: 'left'
    },
    {
      title: '规则说明',
      field: 'ruleRemark',
      sortable: false,
      align: 'left'
    }
  ],
  mountTableColumnsConfig: [
    {
      title: '函数名称',
      field: 'functionName',
      sortable: false,
      align: 'left'
    },
    {
      title: '函数参数',
      field: 'functionParameter',
      sortable: false,
      align: 'left'
    },
    {
      title: '函数描述',
      field: 'description',
      sortable: false,
      align: 'left'
    },
    {
      title: '关系',
      field: 'relation',
      align: 'left',
      sortable: false,
      formula: '',
      name: '$vxeSelect',
      editRender: {
        name: '$vxeSelect',
        options: [
          { value: '1', label: '等于' },
          { value: '2', label: '大于' },
          { value: '3', label: '小于' },
          { value: '4', label: '包含' },
          { value: '5', label: '不包含' },
          { value: '6', label: '大于等于' },
          { value: '7', label: '小于等于' },
          { value: '8', label: '开头' },
          { value: '9', label: '不等于' },
          { value: '10', label: '不为开头' }
        ],
        props: {
          placeholder: '关系'
        }
      }
    },
    {
      title: '值类型',
      field: 'paramType',
      sortable: false,
      align: 'left',
      formula: '',
      name: '$vxeSelect',
      editRender: {
        name: '$vxeSelect',
        options: [
          { value: '1', label: '文本' },
          { value: '2', label: '数字' },
          { value: '3', label: '值域' },
          { value: '4', label: '值集' }
        ],
        props: {
          placeholder: '关系'
        }
      }
    },
    {
      title: '参数值',
      sortable: false,
      field: 'param',
      align: 'left',
      formula: '',
      name: '$vxeInput',
      editRender: {
        name: '$vxeInput',
        options: [],
        props: {
          placeholder: '参数值'
        }
      }
    }
  ],
  PoliciesTableColumns: [
    {
      title: '标记状态',
      field: 'manualSign',
      align: 'center',
      sortable: true,
      width: 180,
      visible: !!store.getters.isSx,
      cellRender: {
        'name': '$vxeSelect',
        options: [
          {
            'value': '0',
            'label': '未标记'
          },
          {
            'value': '1',
            'label': '疑点数据'
          }
        ],
        'defaultValue': '',
        'props': {}
      },
      'name': '$vxeSelect'
    },
    {
      title: '查看状态',
      field: 'readStatus',
      align: 'center',
      sortable: true,
      visible: !!store.getters.isSx,
      width: 180,
      'cellRender': {
        'name': '$vxeSelect',
        options: [
          {
            'value': '0',
            'label': '未读'
          },
          {
            'value': '1',
            'label': '已读'
          }
        ],
        'defaultValue': '',
        'props': {}
      },
      'name': '$vxeSelect'
    },
    {
      title: '规则编码',
      'width': 180,
      field: 'firulecode',
      sortable: true,
      filters: false,
      align: 'center'
    },
    {
      title: '规则名称',
      'width': 180,
      field: 'firulename',
      sortable: true,
      filters: false,
      align: 'center'
    },
    {
      title: '主题',
      'width': 180,
      field: 'regulationClassName',
      sortable: true,
      filters: false,
      align: 'center'
    },
    {
      title: '区划',
      'width': 180,
      field: 'mofdivcode',
      sortable: true,
      filters: false,
      align: 'center'
    },
    {
      title: '预警级别',
      'width': 180,
      field: 'warnLevel',
      sortable: true,
      align: 'center',
      filters: false,
      cellRender: {
        name: '$warningLevelRender'
      }
    },
    {
      title: '管理级次',
      'width': 180,
      field: 'regulationtype',
      sortable: true,
      filters: false,
      align: 'center'
    },
    {
      title: '预算单位',
      'width': 180,
      field: 'agency',
      sortable: true,
      filters: false,
      align: 'center'
    },
    {
      'title': '处理情况',
      'field': 'status',
      'align': 'center',
      'width': 180,
      sortable: true,
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
      sortable: true,
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
      field: 'useDes',
      sortable: true,
      filters: false,
      align: 'center'
    },
    {
      title: '监控拦截时间',
      'width': 180,
      field: 'createTime',
      sortable: true,
      filters: false,
      align: 'center'
    },
    {
      title: '业务数据开始时间',
      'width': 180,
      field: 'businessTime',
      sortable: true,
      filters: false,
      align: 'center'
    },
    {
      title: '违规处理时间',
      'width': 180,
      field: 'handleTime',
      sortable: true,
      filters: false,
      align: 'center'
    },
    {
      title: '是否作废',
      field: 'voidOrNot',
      align: 'center',
      width: 180,
      sortable: true,
      cellRender: {
        name: '$vxeSelect',
        'options': [
          {
            'value': '1',
            'label': '是'
          },
          {
            'value': '2',
            'label': '否'
          }
        ],
        defaultValue: '',
        props: {}
      },
      name: '$vxeSelect'
    },
    {
      'title': '操作',
      'field': 'gloableOptionRow',
      'className': 'gloableOptionRow',
      'align': 'center',
      'fixed': 'right',
      'sortable': 'false',
      'width': '100',
      'cellRender': {
        'name': '$payVoucherInputGloableOptionRow',
        'options': [],
        'defaultValue': '',
        'props': {}
      },
      'name': '$payVoucherInputGloableOptionRow',
      'formula': '',
      'constraint': '',
      'combinedType': '',
      'associatedQuery': '',
      'combinedType_select_sort': '',
      'filters': ''
    }
  ],
  PoliciesTableColumns1: [
    {
      title: '标记状态',
      field: 'manualSign',
      align: 'center',
      sortable: true,
      width: 180,
      visible: !!store.getters.isSx,
      cellRender: {
        'name': '$vxeSelect',
        options: [
          {
            'value': '0',
            'label': '未标记'
          },
          {
            'value': '1',
            'label': '疑点数据'
          }
        ],
        'defaultValue': '',
        'props': {}
      },
      'name': '$vxeSelect'
    },
    {
      title: '查看状态',
      field: 'readStatus',
      align: 'center',
      sortable: true,
      visible: !!store.getters.isSx,
      width: 180,
      'cellRender': {
        'name': '$vxeSelect',
        options: [
          {
            'value': '0',
            'label': '未读'
          },
          {
            'value': '1',
            'label': '已读'
          }
        ],
        'defaultValue': '',
        'props': {}
      },
      'name': '$vxeSelect'
    },
    {
      title: '是否疑似违规',
      field: 'isSign',
      'width': 180,
      align: 'left',
      formula: '',
      sortable: true,
      'cellRender': {
        'name': '$vxeSelect',
        options: [
          { value: 0, label: '疑点信息' },
          { value: 1, label: '正常' },
          { value: 2, label: '违规' }
        ],
        props: {
          placeholder: '是否标记'
        }
      }
    },
    {
      title: '处理信息',
      field: 'handleResult',
      'width': 180,
      sortable: true,
      filters: false,
      align: 'center'
    },
    {
      title: '规则名称',
      'width': 180,
      field: 'firulename',
      sortable: true,
      filters: false,
      align: 'center'
    },
    {
      title: '主题',
      'width': 180,
      field: 'regulationClassName',
      sortable: true,
      filters: false,
      align: 'center'
    },
    {
      title: '资金用途',
      'width': 180,
      field: 'useDes',
      sortable: true,
      filters: false,
      align: 'left'
    },
    {
      title: '支付申请编号',
      width: 180,
      field: 'businessNo',
      sortable: true,
      filters: false,
      align: 'left'
    },
    // {
    //   title: '触发菜单',
    //   'width': 180,
    //   field: 'fromMenuName',
    //   sortable: false,
    //   filters: false,
    //   align: 'center'
    // },
    {
      title: '区划',
      'width': 180,
      field: 'mofDiv',
      sortable: true,
      filters: false,
      align: 'center'
    },
    {
      title: '预警级别',
      'width': 180,
      field: 'warnLevel',
      sortable: true,
      align: 'center',
      filters: false,
      cellRender: {
        'name': '$vxeSelect',
        options: [
          { value: 1, label: '拦截' },
          { value: 2, label: '预警' },
          { value: 3, label: '冻结' }
        ]
      }
    },
    {
      title: '管理级次',
      'width': 180,
      field: 'regulationtype',
      sortable: true,
      filters: false,
      align: 'center'
    },
    {
      title: '预算单位',
      'width': 180,
      field: 'agency',
      sortable: true,
      filters: false,
      align: 'center'
    },
    // {
    //   'title': '处理情况',
    //   'field': 'status',
    //   'align': 'center',
    //   'width': 180,
    //   'cellRender': {
    //     'name': '$vxeSelect',
    //     options: [
    //       {
    //         'value': '1',
    //         'label': '待处理'
    //       },
    //       {
    //         'value': '2',
    //         'label': '已处理'
    //       }
    //     ],
    //     'defaultValue': '',
    //     'props': {}
    //   },
    //   'name': '$vxeSelect'
    // },
    {
      title: '监控类型',
      field: 'triggerClass',
      'width': 180,
      align: 'left',
      sortable: true,
      formula: '',
      'cellRender': {
        'name': '$vxeSelect',
        options: [
          { value: 1, label: '事中触发' },
          { value: 2, label: '定时触发' }
        ],
        props: {
          placeholder: '监控类型'
        }
      }
    },
    {
      title: '监控拦截时间',
      'width': 180,
      field: 'createTime',
      sortable: true,
      filters: false,
      align: 'center'
    },
    {
      title: '业务数据开始时间',
      'width': 180,
      field: 'businessTime',
      sortable: true,
      filters: false,
      align: 'center'
    },
    {
      title: '是否作废',
      field: 'voidOrNot',
      align: 'center',
      width: 180,
      sortable: true,
      cellRender: {
        name: '$vxeSelect',
        'options': [
          {
            'value': '1',
            'label': '是'
          },
          {
            'value': '2',
            'label': '否'
          }
        ],
        defaultValue: '',
        props: {}
      },
      name: '$vxeSelect'
    },
    // {
    //   title: '违规处理时间',
    //   'width': 180,
    //   field: 'handleTime',
    //   sortable: false,
    //   filters: false,
    //   align: 'center'
    // },
    {
      'title': '操作',
      'field': 'gloableOptionRow',
      'className': 'gloableOptionRow',
      'align': 'center',
      'fixed': 'right',
      'sortable': 'false',
      'width': '100',
      'cellRender': {
        'name': '$payVoucherInputGloableOptionRow',
        'options': [],
        'defaultValue': '',
        'props': {}
      },
      'name': '$payVoucherInputGloableOptionRow',
      'formula': '',
      'constraint': '',
      'combinedType': '',
      'associatedQuery': '',
      'combinedType_select_sort': '',
      'filters': ''
    }
  ],
  PoliciesTableColumnsFullJurisdiction: [
    {
      title: '标记状态',
      field: 'manualSign',
      align: 'center',
      sortable: true,
      width: 180,
      visible: !!store.getters.isSx,
      cellRender: {
        'name': '$vxeSelect',
        options: [
          {
            'value': '0',
            'label': '未标记'
          },
          {
            'value': '1',
            'label': '疑点数据'
          }
        ],
        'defaultValue': '',
        'props': {}
      },
      'name': '$vxeSelect'
    },
    {
      title: '查看状态',
      field: 'readStatus',
      align: 'center',
      sortable: true,
      visible: !!store.getters.isSx,
      width: 180,
      'cellRender': {
        'name': '$vxeSelect',
        options: [
          {
            'value': '0',
            'label': '未读'
          },
          {
            'value': '1',
            'label': '已读'
          }
        ],
        'defaultValue': '',
        'props': {}
      },
      'name': '$vxeSelect'
    },
    {
      title: '是否疑似违规',
      field: 'isSign',
      'width': 180,
      align: 'left',
      formula: '',
      sortable: true,
      'cellRender': {
        'name': '$vxeSelect',
        options: [
          { value: 0, label: '疑点信息' },
          { value: 1, label: '正常' },
          { value: 2, label: '违规' }
        ],
        props: {
          placeholder: '是否标记'
        }
      }
    },
    {
      title: '处理信息',
      field: 'handleResult',
      'width': 180,
      sortable: true,
      filters: false,
      align: 'center'
    },
    {
      title: '规则名称',
      'width': 180,
      field: 'firulename',
      sortable: true,
      filters: false,
      align: 'center'
    },
    {
      title: '主题',
      'width': 180,
      field: 'regulationClassName',
      sortable: true,
      filters: false,
      align: 'center'
    },
    {
      title: '资金用途',
      'width': 180,
      field: 'useDes',
      sortable: true,
      filters: false,
      align: 'left'
    },
    {
      title: '支付申请编号',
      width: 180,
      field: 'businessNo',
      sortable: true,
      filters: false,
      align: 'left'
    },
    {
      title: '支付金额',
      field: 'payAppAmt',
      sortable: true,
      filters: false,
      align: 'right',
      width: 180,
      combinedType: [
        'average',
        'subTotal',
        'total',
        'totalAll'
      ],
      cellRender: { name: '$vxeMoney' }
    },
    // {
    //   title: '触发菜单',
    //   'width': 180,
    //   field: 'fromMenuName',
    //   sortable: true,
    //   filters: false,
    //   align: 'center'
    // },
    {
      title: '区划',
      'width': 180,
      field: 'mofDiv',
      sortable: true,
      filters: false,
      align: 'center'
    },
    {
      title: '预警级别',
      'width': 180,
      field: 'warnLevel',
      sortable: true,
      align: 'center',
      filters: false,
      cellRender: {
        'name': '$vxeSelect',
        options: [
          { value: 1, label: '拦截' },
          { value: 2, label: '预警' },
          { value: 3, label: '冻结' }
        ]
      }
    },
    {
      title: '管理级次',
      'width': 180,
      field: 'regulationtype',
      sortable: true,
      filters: false,
      align: 'center'
    },
    {
      title: '预算单位',
      'width': 180,
      field: 'agency',
      sortable: true,
      filters: false,
      align: 'center'
    },
    {
      title: '专项资金编码',
      'width': 180,
      field: 'trackProCode',
      sortable: true,
      filters: false,
      align: 'center'
    },
    {
      title: '专项资金名称',
      'width': 180,
      field: 'trackProName',
      sortable: true,
      filters: false,
      align: 'center'
    },
    {
      title: '监控类型',
      field: 'triggerClass',
      'width': 180,
      align: 'left',
      formula: '',
      sortable: true,
      'cellRender': {
        'name': '$vxeSelect',
        options: [
          { value: 1, label: '事中触发' },
          { value: 2, label: '定时触发' }
        ],
        props: {
          placeholder: '监控类型'
        }
      }
    },
    {
      title: '监控拦截时间',
      'width': 180,
      field: 'createTime',
      sortable: true,
      filters: false,
      align: 'center'
    },
    {
      title: '业务数据开始时间',
      'width': 180,
      field: 'businessTime',
      sortable: true,
      filters: false,
      align: 'center'
    },
    {
      title: '是否作废',
      field: 'voidOrNot',
      align: 'center',
      width: 180,
      sortable: true,
      cellRender: {
        name: '$vxeSelect',
        'options': [
          {
            'value': '1',
            'label': '是'
          },
          {
            'value': '2',
            'label': '否'
          }
        ],
        defaultValue: '',
        props: {}
      },
      name: '$vxeSelect'
    },
    // {
    //   title: '违规处理时间',
    //   'width': 180,
    //   field: 'handleTime',
    //   sortable: true,
    //   filters: false,
    //   align: 'center'
    // },
    {
      'title': '操作',
      'field': 'gloableOptionRow',
      'className': 'gloableOptionRow',
      'align': 'center',
      'fixed': 'right',
      'sortable': 'false',
      'width': '100',
      'cellRender': {
        'name': '$payVoucherInputGloableOptionRow',
        'options': [],
        'defaultValue': '',
        'props': {}
      },
      'name': '$payVoucherInputGloableOptionRow',
      'formula': '',
      'constraint': '',
      'combinedType': '',
      'associatedQuery': '',
      'combinedType_select_sort': '',
      'filters': ''
    }
  ],
  PoliciesTableColumnsToBudgetExecute: [
    {
      title: '标记状态',
      field: 'manualSign',
      align: 'center',
      sortable: true,
      width: 180,
      visible: !!store.getters.isSx,
      cellRender: {
        'name': '$vxeSelect',
        options: [
          {
            'value': '0',
            'label': '未标记'
          },
          {
            'value': '1',
            'label': '疑点数据'
          }
        ],
        'defaultValue': '',
        'props': {}
      },
      'name': '$vxeSelect'
    },
    {
      title: '查看状态',
      field: 'readStatus',
      align: 'center',
      sortable: true,
      visible: !!store.getters.isSx,
      width: 180,
      'cellRender': {
        'name': '$vxeSelect',
        options: [
          {
            'value': '0',
            'label': '未读'
          },
          {
            'value': '1',
            'label': '已读'
          }
        ],
        'defaultValue': '',
        'props': {}
      },
      'name': '$vxeSelect'
    },
    {
      title: '是否疑似违规',
      field: 'isSign',
      'width': 180,
      align: 'left',
      sortable: true,
      formula: '',
      'cellRender': {
        'name': '$vxeSelect',
        options: [
          { value: 0, label: '疑点信息' },
          { value: 1, label: '正常' },
          { value: 2, label: '违规' }
        ],
        props: {
          placeholder: '是否标记'
        }
      }
    },
    {
      title: '处理信息',
      field: 'handleResult',
      'width': 180,
      sortable: true,
      filters: false,
      align: 'center'
    },
    {
      title: '规则名称',
      'width': 180,
      field: 'firulename',
      sortable: true,
      filters: false,
      align: 'center'
    },
    {
      title: '主题',
      'width': 180,
      field: 'regulationClassName',
      sortable: true,
      filters: false,
      align: 'center'
    },
    {
      title: '资金用途',
      'width': 180,
      field: 'useDes',
      sortable: true,
      filters: false,
      align: 'left'
    },
    {
      title: '支付申请编号',
      width: 180,
      field: 'businessNo',
      sortable: true,
      filters: false,
      align: 'left'
    },
    {
      title: '金额',
      field: 'payAppAmt',
      sortable: true,
      filters: false,
      align: 'right',
      width: 180,
      combinedType: [
        'average',
        'subTotal',
        'total',
        'totalAll'
      ],
      cellRender: { name: '$vxeMoney' }
    },
    {
      title: '区划',
      'width': 180,
      field: 'mofDiv',
      sortable: true,
      filters: false,
      align: 'center'
    },
    {
      title: '预警级别',
      'width': 180,
      field: 'warnLevel',
      sortable: true,
      align: 'center',
      filters: false,
      cellRender: {
        'name': '$vxeSelect',
        options: [
          { value: 1, label: '拦截' },
          { value: 2, label: '预警' },
          { value: 3, label: '冻结' }
        ]
      }
    },
    {
      title: '管理级次',
      'width': 180,
      field: 'regulationtype',
      sortable: true,
      filters: false,
      align: 'center'
    },
    {
      title: '预算单位',
      'width': 180,
      field: 'agency',
      sortable: true,
      filters: false,
      align: 'center'
    },
    {
      title: '监控类型',
      field: 'triggerClass',
      'width': 180,
      align: 'left',
      formula: '',
      sortable: true,
      'cellRender': {
        'name': '$vxeSelect',
        options: [
          { value: 1, label: '事中触发' },
          { value: 2, label: '定时触发' }
        ],
        props: {
          placeholder: '监控类型'
        }
      }
    },
    {
      title: '监控拦截时间',
      'width': 180,
      field: 'createTime',
      sortable: true,
      filters: false,
      align: 'center'
    },
    {
      title: '业务数据开始时间',
      'width': 180,
      field: 'businessTime',
      sortable: true,
      filters: false,
      align: 'center'
    },
    {
      title: '是否作废',
      field: 'voidOrNot',
      align: 'center',
      width: 180,
      sortable: true,
      cellRender: {
        name: '$vxeSelect',
        'options': [
          {
            'value': '1',
            'label': '是'
          },
          {
            'value': '2',
            'label': '否'
          }
        ],
        defaultValue: '',
        props: {}
      },
      name: '$vxeSelect'
    },
    {
      'title': '操作',
      'field': 'gloableOptionRow',
      'className': 'gloableOptionRow',
      'align': 'center',
      'fixed': 'right',
      'sortable': 'false',
      'width': '100',
      'cellRender': {
        'name': '$payVoucherInputGloableOptionRow',
        'options': [],
        'defaultValue': '',
        'props': {}
      },
      'name': '$payVoucherInputGloableOptionRow',
      'formula': '',
      'constraint': '',
      'combinedType': '',
      'associatedQuery': '',
      'combinedType_select_sort': '',
      'filters': ''
    }
  ],
  PoliciesTableColumnsToThrExp: [
    {
      title: '标记状态',
      field: 'manualSign',
      align: 'center',
      sortable: true,
      width: 180,
      visible: !!store.getters.isSx,
      cellRender: {
        'name': '$vxeSelect',
        options: [
          {
            'value': '0',
            'label': '未标记'
          },
          {
            'value': '1',
            'label': '疑点数据'
          }
        ],
        'defaultValue': '',
        'props': {}
      },
      'name': '$vxeSelect'
    },
    {
      title: '查看状态',
      field: 'readStatus',
      align: 'center',
      sortable: true,
      visible: !!store.getters.isSx,
      width: 180,
      'cellRender': {
        'name': '$vxeSelect',
        options: [
          {
            'value': '0',
            'label': '未读'
          },
          {
            'value': '1',
            'label': '已读'
          }
        ],
        'defaultValue': '',
        'props': {}
      },
      'name': '$vxeSelect'
    },
    {
      title: '是否疑似违规',
      field: 'isSign',
      'width': 180,
      align: 'left',
      formula: '',
      sortable: true,
      'cellRender': {
        'name': '$vxeSelect',
        options: [
          { value: 0, label: '疑点信息' },
          { value: 1, label: '正常' },
          { value: 2, label: '违规' }
        ],
        props: {
          placeholder: '是否标记'
        }
      }
    },
    {
      title: '处理信息',
      field: 'handleResult',
      'width': 180,
      sortable: true,
      filters: false,
      align: 'center'
    },
    {
      title: '规则名称',
      'width': 180,
      field: 'firulename',
      sortable: true,
      filters: false,
      align: 'center'
    },
    {
      title: '主题',
      'width': 180,
      field: 'regulationClassName',
      sortable: true,
      filters: false,
      align: 'center'
    },
    {
      title: '资金用途',
      'width': 180,
      field: 'useDes',
      sortable: true,
      filters: false,
      align: 'left'
    },
    {
      title: '支付申请编号',
      width: 180,
      field: 'businessNo',
      sortable: true,
      filters: false,
      align: 'left'
    },
    {
      title: '支付金额',
      field: 'payAppAmt',
      sortable: true,
      filters: false,
      align: 'right',
      width: 180,
      combinedType: [
        'average',
        'subTotal',
        'total',
        'totalAll'
      ],
      cellRender: { name: '$vxeMoney' }
    },
    // {
    //   title: '触发菜单',
    //   'width': 180,
    //   field: 'fromMenuName',
    //   sortable: true,
    //   filters: false,
    //   align: 'center'
    // },
    {
      title: '区划',
      'width': 180,
      field: 'mofDiv',
      sortable: true,
      filters: false,
      align: 'center'
    },
    {
      title: '预警级别',
      'width': 180,
      field: 'warnLevel',
      sortable: true,
      align: 'center',
      filters: false,
      cellRender: {
        'name': '$vxeSelect',
        options: [
          { value: 1, label: '拦截' },
          { value: 2, label: '预警' },
          { value: 3, label: '冻结' }
        ]
      }
    },
    {
      title: '管理级次',
      'width': 180,
      field: 'regulationtype',
      sortable: true,
      filters: false,
      align: 'center'
    },
    {
      title: '预算单位',
      'width': 180,
      field: 'agency',
      sortable: true,
      filters: false,
      align: 'center'
    },
    {
      title: '专项资金编码',
      'width': 180,
      field: 'trackProCode',
      sortable: true,
      filters: false,
      align: 'center'
    },
    {
      title: '专项资金名称',
      'width': 180,
      field: 'trackProName',
      sortable: true,
      filters: false,
      align: 'center'
    },
    {
      title: '政府经济分类',
      'width': 180,
      field: 'govBgtEcoName',
      sortable: true,
      filters: false,
      align: 'center'
    },
    {
      title: '部门经济分类',
      'width': 180,
      field: 'depBgtEcoName',
      sortable: true,
      filters: false,
      align: 'center'
    },
    {
      title: '三公经费标识',
      'width': 180,
      field: 'thrExpName',
      sortable: true,
      filters: false,
      align: 'center'
    },
    // {
    //   'title': '处理情况',
    //   'field': 'status',
    //   'align': 'center',
    //   'width': 180,
    //   'cellRender': {
    //     'name': '$vxeSelect',
    //     options: [
    //       {
    //         'value': '1',
    //         'label': '待处理'
    //       },
    //       {
    //         'value': '2',
    //         'label': '已处理'
    //       }
    //     ],
    //     'defaultValue': '',
    //     'props': {}
    //   },
    //   'name': '$vxeSelect'
    // },
    {
      title: '监控类型',
      field: 'triggerClass',
      'width': 180,
      align: 'left',
      formula: '',
      sortable: true,
      'cellRender': {
        'name': '$vxeSelect',
        options: [
          { value: 1, label: '事中触发' },
          { value: 2, label: '定时触发' }
        ],
        props: {
          placeholder: '监控类型'
        }
      }
    },
    {
      title: '监控拦截时间',
      'width': 180,
      field: 'createTime',
      sortable: true,
      filters: false,
      align: 'center'
    },
    {
      title: '业务数据开始时间',
      'width': 180,
      field: 'businessTime',
      sortable: true,
      filters: false,
      align: 'center'
    },
    {
      title: '是否作废',
      field: 'voidOrNot',
      align: 'center',
      width: 180,
      sortable: true,
      cellRender: {
        name: '$vxeSelect',
        'options': [
          {
            'value': '1',
            'label': '是'
          },
          {
            'value': '2',
            'label': '否'
          }
        ],
        defaultValue: '',
        props: {}
      },
      name: '$vxeSelect'
    },
    // {
    //   title: '违规处理时间',
    //   'width': 180,
    //   field: 'handleTime',
    //   sortable: false,
    //   filters: false,
    //   align: 'center'
    // },
    {
      'title': '操作',
      'field': 'gloableOptionRow',
      'className': 'gloableOptionRow',
      'align': 'center',
      'fixed': 'right',
      'sortable': 'false',
      'width': '100',
      'cellRender': {
        'name': '$payVoucherInputGloableOptionRow',
        'options': [],
        'defaultValue': '',
        'props': {}
      },
      'name': '$payVoucherInputGloableOptionRow',
      'formula': '',
      'constraint': '',
      'combinedType': '',
      'associatedQuery': '',
      'combinedType_select_sort': '',
      'filters': ''
    }
  ],
  // table 操作按钮
  gloableOptionRow: {
    renderDefault(h, cellRender, params, context) {
      let self = context.$grid.$parent
      let { row, column } = params
      // const main = self.$parent.$parent.$parent.$parent
      // let status = main._data.toolBarStatusSelect.curValue
      return [
        // <el-tooltip content="修改" placement="top" effect="light">
        //   <a class="gloable-option-row-edit gloable-option-row  fn-inline" onClick={() => self.onOptionRowClick({ row, column, optionType: 'uodate' })}>修改</a>
        // </el-tooltip>,
        <el-tooltip content="附件" placement="top" effect="light">
          <a class="gloable-option-row-attachment gloable-option-row  fn-inline" onClick={() => self.onOptionRowClick({ row, column, optionType: 'attachment' })}>附件</a>,
        </el-tooltip>
      ]
    }
  }
}
if (store.getters.isSx) { // 陕西的预警级别   展示的是预警文字（黄色预警这种） 而不是预警处理提示
  let index = proconf.PoliciesTableColumns1.findIndex(item => item.field === 'warnLevel' || item.title === '预警级别')
  proconf.PoliciesTableColumns1[index].cellRender = {
    name: '$warningLevelRender'
  }
}
export {
  proconf
}
