// import store from '@/store/index'
import store from '@/store'

export let proconf = {
  // BsToolBar 状态栏
  toolBarStatusButtons: [
    {
      type: 'button',
      iconName: 'base-all.png',
      iconNameActive: 'base-all-active.png',
      iconUrl: '',
      label: '待处理',
      code: '0',
      curValue: '0'
    },
    {
      type: 'button',
      iconName: 'base-all.png',
      iconNameActive: 'base-all-active.png',
      iconUrl: '',
      label: '已审核',
      code: '1',
      curValue: '1'
    },
    {
      type: 'button',
      iconName: 'base-all.png',
      iconNameActive: 'base-all-active.png',
      iconUrl: '',
      label: '已退回',
      code: '2',
      curValue: '2'
    }
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
          { value: '0', label: '待处理' },
          { value: '1', label: '已处理' }
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
    }
    // {
    //   title: '预算单位',
    //   field: 'agencyCodeList',
    //   width: '8',
    //   align: 'left',
    //   formula: '',
    //   name: '$vxeInput',
    //   itemRender: {
    //     name: '$vxeInput',
    //     options: [],
    //     props: {
    //       placeholder: '预算单位'
    //     }
    //   }
    // }
  ],
  highQueryData: {
    status: '',
    payApplyNumber: '',
    businessFunctionCode: '',
    createTime: '',
    agencyCodeList: ''
  },
  PoliciesTableColumns: [
    {
      'title': '状态',
      'field': 'status',
      width: '180px',
      'align': 'center',
      'cellRender': {
        'name': '$vxeSelect',
        'options': [
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
      field: 'payAppAmt',
      sortable: false,
      align: 'right',
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
      field: 'govBgtEcoName',
      sortable: false,
      align: 'left'
    },
    {
      title: '部门经济分类',
      width: '180px',
      field: 'depBgtEcoName',
      sortable: false,
      align: 'left'
    },
    {
      title: '资金用途',
      width: '180px',
      field: 'useDes',
      sortable: false,
      align: 'left'
    },
    {
      title: '付款人',
      width: '180px',
      field: 'payAcctName',
      sortable: false,
      align: 'left'
    },
    {
      title: '付款人账号',
      width: '180px',
      field: 'payAcctNo',
      sortable: false,
      align: 'left'
    },
    {
      title: '付款人开户行',
      width: '180px',
      field: 'payAcctBankName',
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
      title: '收款人开户行',
      width: '180px',
      field: 'payeeAcctBankName',
      sortable: false,
      align: 'left'
    },
    {
      title: '支出功能分类',
      width: '180px',
      field: 'expFuncName',
      sortable: false,
      align: 'left'
    },
    {
      title: '支付方式',
      width: '180px',
      field: 'setModeName',
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
      align: 'left'
    },
    {
      'title': '预警级别',
      'field': 'warningLevel',
      'align': 'center',
      'cellRender': {
        'name': '$vxeSelect',
        options: store.state.warnInfo.warnLevelOptions.map(item => {
          return {
            ...item,
            value: String(item.value)
          }
        }),
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
        options: store.state.warnInfo.warnControlTypeOptions.map(item => {
          return {
            ...item,
            value: String(item.value)
          }
        }),
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
    // {
    //   title: '收支类别',
    //   field: 'pro_cat_name',
    //   span: 8,
    //   titleWidth: '180',
    //   itemRender: {
    //     name: '$vxeInput',
    //     props: { disabled: true, placeholder: '收支类别' }
    //   }
    // },
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
      field: 'depProName',
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
