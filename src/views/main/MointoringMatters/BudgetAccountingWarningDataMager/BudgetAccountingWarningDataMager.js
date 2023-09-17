// import store from '@/store/index'
export let proconf = {
  // BsToolBar 状态栏
  toolBarStatusButtons: [
    {
      type: 'button',
      iconName: 'base-daiban.png',
      iconNameActive: 'base-daiban-active.png',
      iconUrl: '',
      label: '待处理',
      code: '0',
      curValue: '0'
    },
    {
      type: 'button',
      iconName: 'base-yiban.png',
      iconNameActive: 'base-yiban-active.png',
      iconUrl: '',
      label: '已处理',
      code: '1',
      curValue: '1'
    },
    {
      type: 'button',
      iconName: 'base-all.png',
      iconNameActive: 'base-all-active.png',
      iconUrl: '',
      label: '已作废',
      code: '4',
      curValue: '4'
    }
  /*   {
      type: 'button',
      iconName: 'base-all.png',
      iconNameActive: 'base-all-active.png',
      iconUrl: '',
      label: '已退回',
      code: '2',
      curValue: '2'
    } */
  ],
  // BsToolBar 右侧按钮
  detailButtons: {
    '0': [
      { code: 'handle', label: '处理', status: 'primary' },
      { code: 'toorbar_checktotal', label: '查看汇总' },
      { code: 'lookDetail', label: '查看详情' }
    ],
    '1': [
      { code: 'toorbar_checktotal', label: '查看汇总' },
      { code: 'lookDetail', label: '查看详情' }
    ],
    '2': [
      { code: 'toorbar_checktotal', label: '查看汇总' },
      { code: 'lookDetail', label: '查看详情' }
    ],
    '4': [
      { code: 'toorbar_checktotal', label: '查看汇总' },
      { code: 'lookDetail', label: '查看详情' }
    ]
  },
  statusRightToolBarButton: {
    '0': [
      { code: 'toorbar_checkinfo', label: '查看明细', status: 'primary' }
    ],
    '1': [
      { code: 'toorbar_checkinfo', label: '查看明细', status: 'primary' }
    ],
    '2': [
      { code: 'toorbar_checkinfo', label: '查看明细', status: 'primary' }
    ],
    '4': [
      { code: 'toorbar_checkinfo', label: '查看明细', status: 'primary' }
    ]
  },
  highQueryConfig: [
    {
      title: '状态',
      field: 'status',
      width: '8',
      align: 'left',
      formula: '',
      name: '$vxeSelect',
      itemRender: {
        name: '$vxeSelect',
        options: [
          {
            'value': '0',
            'label': '待处理'
          }
        ],
        props: {
          placeholder: '状态'
        }
      }
    },
    {
      title: '支付申请编号',
      field: 'payApplyNumber',
      width: '8',
      align: 'left',
      formula: '',
      name: '$vxeInput',
      itemRender: {
        name: '$vxeInput',
        options: [],
        props: {
          placeholder: '支付申请编号'
        }
      }
    },
    {
      title: '监控时间',
      field: 'createTime',
      width: '8',
      align: 'left',
      formula: '',
      name: '$vxeTime',
      itemRender: {
        name: '$vxeTime',
        options: [],
        props: {
          placeholder: '监控时间'
        }
      }
    },
    {
      title: '预警数量大于',
      field: 'warnTotal',
      width: '8',
      align: 'left',
      formula: '',
      name: '$vxeInput',
      itemRender: {
        name: '$vxeInput',
        options: [],
        props: {
          placeholder: '预警数量大于'
        }
      }
    }
  ],
  highQueryData: {
    status: '',
    businessFunctionCode: '',
    createTime: '',
    warnTotal: '',
    payApplyNumber: ''
  },
  highQueryConfig1: [
    {
      title: '状态',
      field: 'status',
      width: '8',
      align: 'left',
      formula: '',
      name: '$vxeSelect',
      itemRender: {
        name: '$vxeSelect',
        options: [
          {
            'value': '0',
            'label': '待处理'
          }
        ],
        props: {
          placeholder: '状态'
        }
      }
    },
    {
      title: '支付申请编号',
      field: 'payAppNo',
      width: '8',
      align: 'left',
      formula: '',
      name: '$vxeInput',
      itemRender: {
        name: '$vxeInput',
        options: [],
        props: {
          placeholder: '支付申请编号'
        }
      }
    },
    {
      title: '监控时间',
      field: 'createTime',
      width: '8',
      align: 'left',
      formula: '',
      name: '$vxeTime',
      itemRender: {
        name: '$vxeTime',
        options: [],
        props: {
          placeholder: '监控时间'
        }
      }
    },
    {
      title: '预算单位',
      field: 'agencyCodeList',
      width: '8',
      align: 'left',
      formula: '',
      name: '$vxeTree',
      itemRender: {
        name: '$vxeTree',
        options: [],
        'props': {
          'config': {
            'treeProps': {
              'nodeKey': 'id',
              'label': 'label',
              'children': 'children'
            },
            'placeholder': '预算单位',
            'multiple': true,
            'readonly': true,
            'isleaf': false
          }
        }
      }
    },
    {
      title: '预警级别',
      field: 'warnLevel',
      width: '8',
      align: 'left',
      formula: '',
      name: '$vxeSelect',
      itemRender: {
        name: '$vxeSelect',
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
            label: '灰色预警'
          },
          {
            value: '5',
            label: '蓝色预警'
          }
        ],
        props: {
          placeholder: '预警级别'
        }
      }
    }
  ],
  highQueryData1: {
    status: '',
    businessFunctionCode: '',
    createTime: '',
    warnLevel: '',
    warnTotal: '',
    payApplyNumber: ''
  },
  PoliciesTableColumns: [
    {
      title: '触发菜单名称',
      width: '180px',
      field: 'fromMenuName',
      sortable: false,
      align: 'left'
    },
    {
      'title': '状态',
      'field': 'status',
      width: '180px',
      'align': 'center',
      'cellRender': {
        'name': '$vxeSelect',
        'options': [
          {
            'value': '0',
            'label': '待处理'
          },
          {
            'value': '1',
            'label': '放行'
          },
          {
            'value': '2',
            'label': '改正'
          },
          {
            'value': '3',
            'label': '禁止'
          }
        ],
        'defaultValue': '',
        'props': {}
      },
      'sortable': 'true',
      'name': '$vxeSelect'
    },
    {
      title: '支付申请编号',
      width: '180px',
      field: 'payAppNo',
      sortable: false,
      align: 'left'
    },
    {
      title: '预算单位',
      width: '180px',
      field: 'agency',
      sortable: false,
      align: 'left'
    },
    {
      title: '预算项目',
      width: '180px',
      field: 'proName',
      sortable: false,
      align: 'left'
    },
    {
      title: '指标文号',
      width: '180px',
      field: 'corBgtDocNoName',
      sortable: false,
      align: 'left'
    },
    {
      title: '支付金额',
      width: '180px',
      field: 'paymentAmount',
      sortable: false,
      align: 'right',
      'filters': '[object Object]',
      'filterRender': {
        'name': 'FilterNumberCompare'
      },
      'combinedType': 'average,subTotal,total,totalAll',
      'cellRender': {
        'name': '$vxeMoney',
        'options': [],
        'defaultValue': '',
        'props': {}
      },
      'name': '$vxeMoney',
      'fixed': '',
      'formula': '',
      'combinedType_select_sort': '平均值,选中合计,当前页合计,所有合计',
      'combinedType__multiple': [
        'average',
        'subTotal',
        'total',
        'totalAll'
      ],
      'combinedType__viewSort': '平均值,选中合计,当前页合计,所有合计'
    },
    {
      title: '政府经济分类',
      width: '180px',
      field: 'govEconomyType',
      sortable: false,
      align: 'left'
    },
    {
      title: '部门经济分类',
      width: '180px',
      field: 'deptEconomyType',
      sortable: false,
      align: 'left'
    },
    {
      title: '资金用途',
      width: '180px',
      field: 'useOfFunds',
      sortable: false,
      align: 'left'
    },
    {
      title: '付款人',
      width: '180px',
      field: 'payer',
      sortable: false,
      align: 'left'
    },
    {
      title: '付款人账号',
      width: '180px',
      field: 'payAccount',
      sortable: false,
      align: 'left'
    },
    {
      title: '付款人开户行',
      width: '180px',
      field: 'payBankName',
      sortable: false,
      align: 'left'
    },
    {
      title: '收款人',
      width: '180px',
      field: 'payeeAcctName',
      sortable: false,
      align: 'left'
    },
    {
      title: '收款人账号',
      width: '180px',
      field: 'payeeAcctNo',
      sortable: false,
      align: 'left'
    },
    {
      title: '联系人',
      width: '180px',
      field: 'applyName',
      sortable: false,
      align: 'left'
    },
    {
      title: '联系电话',
      width: '180px',
      field: 'applyDial',
      sortable: false,
      align: 'left'
    },
    {
      title: '收款人开户行',
      width: '180px',
      field: 'payeeAcctBankName',
      sortable: false,
      align: 'left'
    },
    {
      title: '支出功能分类',
      width: '180px',
      field: 'funcType',
      sortable: false,
      align: 'left'
    },
    {
      title: '支付方式',
      width: '180px',
      field: 'paymentMethod',
      sortable: false,
      align: 'left'
    },
    // {
    //   title: '日期',
    //   width: '180px',
    //   field: 'date',
    //   sortable: false,
    //   align: 'left'
    // },
    // {
    //   title: '业务类型',
    //   width: '180px',
    //   field: 'businessType',
    //   sortable: false,
    //   align: 'left'
    // },
    // {
    //   title: '单据编号',
    //   width: '180px',
    //   field: 'invoiceCode',
    //   sortable: false,
    //   align: 'left'
    // },
    // {
    //   title: '摘要',
    //   width: '180px',
    //   field: 'summary',
    //   sortable: false,
    //   align: 'left'
    // },
    // {
    //   title: '金额',
    //   field: 'amount',
    //   width: '180px',
    //   sortable: false,
    //   align: 'right',
    //   'filters': '[object Object]',
    //   'filterRender': {
    //     'name': 'FilterNumberCompare'
    //   },
    //   'combinedType': 'average,subTotal,total,totalAll',
    //   'cellRender': {
    //     'name': '$moneyRender',
    //     'options': [],
    //     'defaultValue': '',
    //     'props': {}
    //   },
    //   'name': '$moneyRender',
    //   'combinedType__multiple': [
    //     'average',
    //     'subTotal',
    //     'total',
    //     'totalAll'
    //   ]
    // },
    {
      title: '监控时间',
      width: '180px',
      field: 'createTime',
      sortable: false,
      align: 'left'
    },
    {
      title: '操作',
      field: 'gloableOptionRow',
      className: 'gloableOptionRow',
      align: 'center',
      fixed: 'right',
      sortable: false,
      filters: false,
      width: 100,
      cellRender: {
        name: '$gloableOptionRow'
      }
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
        <el-tooltip content="附件" placement="top" effect="light">
          <a class="gloable-option-row-attachment gloable-option-row  fn-inline" onClick={() => self.onOptionRowClick({ row, column, optionType: 'attachment' })}>附件</a>,
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
      align: 'left',
      cellRender: {
        name: '$vxeTableHref',
        options: [],
        defaultValue: '',
        props: {}
      }
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
            'label': '灰色预警'
          },
          {
            'value': '5',
            'label': '蓝色预警'
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
            'label': '禁止'
          },
          {
            'value': '5',
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
      field: 'payAppNo',
      title: '支付申请编号',
      titleWidth: '180',
      span: 8,
      itemRender: {
        name: '$vxeInput',
        props: { placeholder: '支付申请编号', disabled: true }
      }
    },
    {
      field: 'agencyName',
      title: '预算单位',
      titleWidth: '180',
      span: 8,
      itemRender: {
        name: '$vxeInput',
        props: { placeholder: '预算单位', disabled: true }
      }
    },
    {
      field: 'corBgtDocNoName',
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
      field: 'proName',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '预算项目' } }
    },
    {
      title: '收支类别',
      field: 'proCatName',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '收支类别' }
      }
    },
    {
      title: '付款人',
      field: 'payAcctName',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '付款人' }
      }
    },
    {
      title: '付款人账号',
      field: 'payAcctNo',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '付款人账号' }
      }
    },
    {
      title: '付款银行',
      field: 'payAcctBankName',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '付款银行' }
      }
    },
    {
      title: '收款人',
      field: 'payeeAcctName',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '收款人' }
      }
    },
    {
      title: '收款人账号',
      field: 'payeeAcctNo',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '收款人账号' }
      }
    },
    {
      title: '收款银行',
      field: 'payeeAcctBankName',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '收款银行' }
      }
    },
    {
      field: 'payAppAmt',
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
      field: 'useDes',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '资金用途' }
      }
    },
    {
      title: '政府经济分类',
      field: 'govBgtEcoName',
      titleWidth: '180',
      span: 8,
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '政府经济分类' }
      }
    },
    {
      title: '部门经济分类',
      field: 'depBgtEcoName',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '部门经济分类' }
      }
    },
    {
      title: '资金性质',
      field: 'fundTypeName',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '资金性质' }
      }
    },
    {
      title: '功能分类',
      field: 'expFuncName',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '功能分类' }
      }
    },
    {
      title: '支付方式',
      field: 'payTypeName',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '支付方式' }
      }
    },
    {
      title: '结算方式',
      field: 'setModeName',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '结算方式' }
      }
    },
    {
      title: '业务处室',
      field: 'manageMofDepName',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '业务处室' }
      }
    },
    {
      title: '工资标识',
      field: 'isSalName',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '工资标识' }
      }
    },
    {
      title: '是否工会经费',
      field: 'isFunName',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '是否工会经费' }
      }
    },
    {
      title: '三公经费',
      field: 'thrExpName',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '三公经费' }
      }
    },
    {
      title: '直达资金标识',
      field: 'isDirName',
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
    },
    {
      title: '联系人',
      field: 'applyName',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '联系人' }
      }
    },
    {
      title: '联系电话',
      field: 'applyDial',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '联系电话' }
      }
    }
  ],
  incomeMsgConfig1: [
    {
      field: 'corBgtDocNo',
      title: '本级指标文号',
      titleWidth: '180',
      span: 8,
      itemRender: {
        name: '$vxeInput',
        props: { placeholder: '本级指标文号', disabled: true }
      }
    },
    {
      field: 'bgtDocTitle',
      title: '指标文标题',
      titleWidth: '180',
      span: 8,
      itemRender: {
        name: '$vxeInput',
        props: { placeholder: '指标文标题', disabled: true }
      }
    },
    {
      field: 'docDate',
      title: '发文时间',
      titleWidth: '180',
      span: 8,
      itemRender: {
        name: '$vxeInput',
        props: { placeholder: '发文时间', disabled: true }
      }
    },
    {
      field: 'bgtDec',
      title: '指标说明',
      titleWidth: '180',
      span: 8,
      itemRender: {
        name: '$vxeInput',
        props: { placeholder: '指标说明', disabled: true }
      }
    },
    {
      title: '项目名称',
      field: 'proName',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '项目名称' } }
    },
    {
      title: '调整批次号',
      field: 'batNum',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '调整批次号' }
      }
    },
    {
      title: '指标来源名称',
      field: 'sourceTypeName',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '指标来源名称' }
      }
    },
    {
      title: '调整日期',
      field: 'adjDate',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '调整日期' }
      }
    },
    {
      title: '调入金额',
      field: 'amount',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '调入金额' }
      }
    },
    {
      title: '资金性质名称',
      field: 'fundTypeName',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '资金性质名称' }
      }
    },
    {
      title: '支出功能分类科目名称',
      field: 'expFuncName',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '支出功能分类科目名称' }
      }
    },
    {
      title: '政府支出经济分类名称',
      field: 'govBgtEcoName',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '政府支出经济分类名称' }
      }
    },
    {
      field: 'depBgtEcoName',
      title: '部门支出经济分类名',
      titleWidth: '180',
      span: 8,
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '部门支出经济分类名' }
      }
    },
    {
      title: '指标管理处室名称',
      field: 'bgtMofDepName',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '指标管理处室名称' }
      }
    },
    {
      title: '业务主管处室名称',
      field: 'manageMofDepName',
      titleWidth: '180',
      span: 8,
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '业务主管处室名称' }
      }
    },
    {
      title: '支付方式',
      field: 'payTypeName',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '支付方式' }
      }
    },
    {
      title: '预算单位',
      field: 'agencyName',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '预算单位' }
      }
    },
    {
      title: '直达资金标识',
      field: 'dirName',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '直达资金标识' }
      }
    },
    {
      title: '版本名称',
      field: 'versionName',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '版本名称' }
      }
    },
    {
      title: '上级指标文号',
      field: 'supBgtDocNo',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '上级指标文号' }
      }
    },
    {
      title: '指标类型名称',
      field: 'bgtTypeName',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '指标类型名称' }
      }
    },
    {
      title: '转移支付功能分类科目',
      field: 'tpFuncName',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '转移支付功能分类科目' }
      }
    },
    {
      title: '指标数据来源类型',
      field: 'bdsName',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '指标数据来源类型' }
      }
    },
    {
      title: '指标余额',
      field: 'curAmt',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '指标余额' }
      }
    },
    {
      title: '需要追踪项目名称',
      field: 'trackProName',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '需要追踪项目名称' }
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
    fiDate: '',
    payBusType: '',
    todoName: '',
    voidOrNot: ''
  },
  incomeMsgHsConfig: [
    {
      field: 'acctSetName',
      title: '账套',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '账套' }
      }
    },
    {
      field: 'vouSrcCode',
      title: '类型',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '类型' }
      }
    },
    {
      field: 'agencyAcctVoucherType',
      title: '凭证类型',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '凭证类型' }
      }
    },
    {
      field: 'voucherNo',
      title: '凭证号',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '凭证号' }
      }
    },
    {
      title: '日期',
      field: 'voucherDate',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '日期' }
      }
    },
    {
      title: '摘要',
      field: 'voucherAbs',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '摘要' }
      }
    },
    {
      title: '附件',
      field: 'vouCnt',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '附件' }
      }
    }
  ],
  incomeMsgConfig2: [
    {
      title: '项目代码',
      field: 'proCode',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '项目代码' } }
    },
    {
      title: '项目名称',
      field: 'proName',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '项目名称' } }
    },
    {
      title: '预算级次名称',
      field: 'budgetLevelName',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '预算级次名称' }
      }
    },
    {
      title: '资金性质名称',
      field: 'fundTypeName',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '资金性质名称' }
      }
    },
    {
      title: '支出功能分类科目名称',
      field: 'expFuncName',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '支出功能分类科目名称' }
      }
    },
    {
      title: '政府支出经济分类名称',
      field: 'govBgtEcoName',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '政府支出经济分类名称' }
      }
    },
    {
      field: 'depBgtEcoName',
      title: '部门支出经济分类名',
      titleWidth: '180',
      span: 8,
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '部门支出经济分类名' }
      }
    },
    {
      title: '业务主管处室名称',
      field: 'manageMofDepName',
      titleWidth: '180',
      span: 8,
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '业务主管处室名称' }
      }
    },
    {
      title: '支付方式',
      field: 'payTypeName',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '支付方式' }
      }
    },
    {
      title: '预算单位',
      field: 'agencyName',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '预算单位' }
      }
    },
    {
      title: '直达资金标识',
      field: 'dirName',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '直达资金标识' }
      }
    },
    {
      title: '批复金额',
      field: 'replyAmt',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '批复金额' }
      }
    },
    {
      title: '调整金额',
      field: 'adjAmt',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '调整金额' }
      }
    },
    {
      title: '测算金额',
      field: 'estAmt',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '测算金额' }
      }
    },
    {
      title: '项目当年总金额（审核）',
      field: 'declaraAmt',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '项目当年总金额（审核）' }
      }
    },
    {
      title: '项目财政拨款金额（审核）',
      field: 'supportAmt',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '项目财政拨款（审核）' }
      }
    },
    {
      title: '是否政府采购',
      field: 'isGov',
      width: '8',
      align: 'left',
      formula: '',
      name: '$vxeSelect',
      itemRender: {
        name: '$vxeSelect',
        options: [
          {
            value: '0',
            label: '否'
          },
          {
            value: '1',
            label: '是'
          }
        ],
        props: {
          placeholder: '是否政府采购'
        }
      }
    }
  ],
  incomeMsgHsData: {
    acctSetCode: '',
    acctSetName: '',
    vouSrcCode: '',
    agencyAcctVoucherType: '',
    vouId: '',
    voucherNo: '',
    voucherDate: '',
    voucherAbs: '',
    vouCnt: ''
  },
  handletableColumnsHsConfig: [
    {
      title: '支付凭证号',
      field: 'originalBillNo',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '支付凭证号' }
      }
    },
    {
      title: '往来单位',
      field: 'currentName',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '往来单位' }
      }
    },
    {
      field: 'proName',
      title: '预算项目',
      titleWidth: '180',
      span: 8,
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '预算项目' }
      }
    },
    {
      title: '自用项目',
      field: 'proName',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '自用项目' }
      }
    },
    {
      title: '资金性质',
      field: 'fundTypeName',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '资金性质' }
      }
    },
    {
      title: '支出功能分类',
      field: 'expFuncName',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '支出功能分类' }
      }
    },
    {
      title: '政府支出经济分类',
      field: 'govBgtEcoName',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '政府支出经济分类' }
      }
    },
    {
      title: '部门经济分类',
      field: 'depBgtEcoName',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '部门经济分类' }
      }
    },
    {
      title: '借方科目',
      field: 'jfName',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '借方科目' }
      }
    },
    {
      title: '贷方科目',
      field: 'dfName',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '贷方科目' }
      }
    },
    {
      title: '金额',
      field: 'stadAmt',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '金额' }
      }
    }
  ],
  infoMsgHsData: {
    originalBillNo: '',
    currentCode: '',
    currentName: '', // 往来单位
    depProCode: '',
    depProName: '', // 预算项目代码
    proCode: '',
    proName: '', // 自用项目
    fundTypeCode: '',
    fundTypeName: '', // 资金性质
    expFuncCode: '',
    expFuncName: '', // 支出功能分类
    govBgtEcoCode: '',
    govBgtEcoName: '', // 政府支出经济分类
    depBgtEcoCode: '',
    depBgtEcoName: '',
    dfCode: '',
    dfName: '',
    jCode: '',
    jName: '',
    stadAmt: ''
  }
}
