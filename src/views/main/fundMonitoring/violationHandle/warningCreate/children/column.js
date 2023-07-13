import store from '@/store/index'
// 预算执行表头
const budgetImpColumns = [
  {
    title: '区划',
    width: 180,
    field: 'mofDivName',
    sortable: false,
    filters: false,
    align: 'center',
    formatter({ row }) {
      return row.mofDivCode && row.mofDivName ? `${row.mofDivCode}-${row.mofDivName}` : ''
    }
  },
  {
    title: '业务处室',
    width: 180,
    field: 'manageMofDepName',
    sortable: false,
    filters: false,
    align: 'center'
  },
  {
    title: '单位编码',
    width: 180,
    field: 'unitCode',
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
    align: 'center',
    formatter({ row }) {
      return row.agencyCode && row.agencyName ? `${row.agencyCode}-${row.agencyName}` : ''
    }
  },
  // {
  //   title: '凭证时间',
  //   width: 180,
  //   field: 'voucherTime',
  //   sortable: false,
  //   filters: false,
  //   align: 'center'
  // },
  {
    title: '业务数据单号',
    width: 180,
    field: 'businessNo',
    sortable: false,
    filters: false,
    align: 'center'
  },
  {
    title: '主题',
    width: 180,
    field: 'regulationClassName',
    sortable: false,
    filters: false,
    align: 'center'
  },
  {
    title: '违规时间',
    width: 180,
    field: 'warnTime',
    sortable: false,
    filters: false,
    align: 'center'
  },
  {
    title: '监控类型',
    field: 'triggerClass',
    align: 'center',
    width: 180,
    cellRender: {
      name: '$vxeSelect',
      options: [
        {
          value: 1,
          label: '事中触发'
        },
        {
          value: 2,
          label: '定时触发'
        }
      ],
      defaultValue: '',
      props: {}
    },
    name: '$vxeSelect'
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
    align: 'center',
    width: 180,
    cellRender: {
      name: '$vxeSelect',
      options: store.state.warnInfo.warnLevelOptions.map(item => {
        return {
          ...item,
          value: String(item.value)
        }
      }),
      defaultValue: '',
      props: { disabled: true, placeholder: '预警级别' }
    },
    name: '$vxeSelect'
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
          label: '拦截'
        },
        {
          value: 2,
          label: '预警，需上传附件'
        },
        {
          value: 3,
          label: '预警，无需上传附件'
        },
        {
          value: 4,
          label: '提醒'
        },
        {
          value: 5,
          label: '记录'
        }
      ],
      defaultValue: '',
      props: {}
    },
    name: '$vxeSelect'
  },
  {
    title: '支付金额',
    field: 'paymentAmount',
    sortable: false,
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
    title: '追踪项目',
    width: 180,
    field: 'trackProCode',
    sortable: false,
    filters: false,
    align: 'center',
    formatter({ row }) {
      return row.trackProCode && row.trackProName ? `${row.trackProCode}-${row.trackProName}` : ''
    }
  }
]
// 预算管理表头(只用于专项监督0207)
const budgetManagementColumns = [
  {
    title: '监控规则',
    width: 180,
    field: 'fiRuleName',
    sortable: false,
    filters: false,
    align: 'center'
  },
  {
    title: '超时下达类型',
    width: 180,
    field: 'timeoutIssueType',
    sortable: false,
    filters: false,
    align: 'center'
  },
  {
    title: '指标文号',
    width: 180,
    field: 'corBgtDocNo',
    sortable: false,
    filters: false,
    align: 'center'
  },
  {
    title: '预算年度',
    width: 100,
    field: 'fiscalYear',
    sortable: false,
    filters: false,
    align: 'center'
  },
  // {
  //   title: '上级财政',
  //   width: 180,
  //   field: 'recDivName',
  //   sortable: false,
  //   filters: false,
  //   align: 'center'
  // },
  // {
  //   title: '下级财政',
  //   width: 180,
  //   field: 'mofDivName',
  //   sortable: false,
  //   filters: false,
  //   align: 'center'
  // },
  {
    title: '项目名称',
    width: 180,
    field: 'proName',
    sortable: false,
    filters: false,
    align: 'center'
  },
  {
    title: '指标接收时间',
    width: 180,
    field: 'recTime',
    sortable: false,
    filters: false,
    align: 'center'
  }, {
    title: '接收金额',
    width: 180,
    field: 'recAmount',
    sortable: false,
    filters: false,
    align: 'center'
  }, {
    title: '已分配金额',
    width: 180,
    field: 'allocationAmount',
    sortable: false,
    filters: false,
    align: 'center'
  },
  {
    field: 'curAmt',
    title: '指标余额',
    titleWidth: '180',
    span: 8,
    itemRender: {
      name: '$vxeInput',
      props: { placeholder: '指标余额', disabled: true }
    }
  },
  {
    field: 'timeoutIssueAmount',
    title: '超时下达金额',
    titleWidth: '180',
    span: 8,
    itemRender: {
      name: '$vxeInput',
      props: { placeholder: '超时下达金额', disabled: true }
    }
  },
  {
    field: 'timeoutIssueTime',
    title: '超时下达时间',
    titleWidth: '180',
    span: 8,
    itemRender: {
      name: '$vxeInput',
      props: { placeholder: '超时下达时间', disabled: true }
    }
  }
]
// 违规类型
const violationColumn = [
  // {
  //   title: '违规类型',
  //   width: 180,
  //   field: 'violateType',
  //   sortable: false,
  //   filters: false,
  //   align: 'center'
  // },
  {
    title: '疑似违规说明',
    width: 180,
    field: 'doubtViolateExplain',
    sortable: false,
    filters: false,
    align: 'center'
  }
]
// 其他类型列
const otherColumns = [
  {
    title: '处室意见',
    field: 'departmentStatus',
    align: 'center',
    width: 180,
    cellRender: {
      name: '$vxeSelect',
      options: [
        {
          value: '2',
          label: '认定正常'
        },
        {
          value: '3',
          label: '需要核实（下发单位）'
        }
      ],
      defaultValue: '',
      props: {}
    },
    name: '$vxeSelect'
  },
  {
    title: '处室联系方式',
    width: 180,
    field: 'phone2',
    sortable: false,
    filters: false,
    align: 'center'
  },
  {
    title: '处室下发人',
    width: 180,
    field: 'handler2',
    sortable: false,
    filters: false,
    align: 'center'
  },
  {
    title: '处室指导意见',
    width: 180,
    field: 'information2',
    sortable: false,
    filters: false,
    align: 'center'
  },
  {
    title: '预算单位核实意见',
    field: 'agencyStatus',
    align: 'center',
    width: 180,
    cellRender: {
      name: '$vxeSelect',
      options: [
        {
          value: '1',
          label: '已整改'
        },
        {
          value: '2',
          label: '核实无误'
        }
      ],
      defaultValue: '',
      props: {}
    },
    name: '$vxeSelect'
  },
  {
    title: '预算单位联系方式',
    width: 180,
    field: 'phone1',
    sortable: false,
    filters: false,
    align: 'center'
  },
  {
    title: '预算单位处理人',
    width: 180,
    field: 'handler1',
    sortable: false,
    filters: false,
    align: 'center'
  },
  {
    title: '预算单位核实意见说明',
    width: 180,
    field: 'information1',
    sortable: false,
    filters: false,
    align: 'center'
  }
]
// 操作列
const operatorColumns = [
  {
    title: '违规详情',
    field: 'gloableOptionRowDetial',
    align: 'center',
    sortable: false,
    filters: false,
    width: 120,
    fixed: 'right',
    cellRender: {
      name: '$ReportTaskGloableOptionRow'
    }
  },
  {
    title: '附件',
    field: 'gloableOptionRow',
    className: 'gloableOptionRow',
    align: 'center',
    fixed: 'right',
    sortable: false,
    filters: false,
    width: 100,
    cellRender: {
      name: '$payVoucherInputGloableOptionRow'
    }
  }
]
const proconf = {
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
  },
  gloableOptionRowDetial: {
    renderDefault(h, cellRender, params, context) {
      let self = context.$grid.$parent
      let { row, column } = params
      return [
        <el-tooltip content="" placement="" effect="light">
          <span style="color: #4293F4; text-decoration: underline" onClick={() => self.onOptionRowClick({ row, column, optionType: 'show' })}>查看</span>
        </el-tooltip>
      ]
    }
  },
  gloableOptionRowLog: {
    renderDefault(h, cellRender, params, context) {
      let self = context.$grid.$parent
      let { row, column } = params
      return [
        <el-tooltip content="" placement="" effect="light">
          <span style="color: #4293F4; text-decoration: underline" onClick={() => self.onOptionRowClick({ row, column, optionType: 'viewLog' })}>查看</span>
        </el-tooltip>
      ]
    }
  },
  highQueryConfig: [
    {
      title: '预算单位',
      field: 'agencyCodeList',
      width: '8',
      align: 'left',
      name: '$vxeTree',
      itemRender: {
        name: '$vxeTree',
        options: [],
        'props': {
          'config': {
            'treeProps': {
              'code': 'id',
              'name': 'label',
              'children': 'children'
            },
            'placeholder': '预算单位',
            'multiple': true,
            'readonly': true,
            'isleaf': true
          }
        }
      }
    },
    {
      title: '业务数据单号',
      width: 180,
      field: 'businessNo',
      formula: '',
      align: 'left',
      name: '$vxeInput',
      itemRender: {
        name: '$vxeInput',
        options: [],
        props: {
          placeholder: '业务数据单号'
        }
      }
    },
    {
      title: '主题',
      width: 180,
      field: 'regulationClassName',
      formula: '',
      align: 'left',
      name: '$vxeInput',
      itemRender: {
        name: '$vxeInput',
        options: [],
        props: {
          placeholder: '主题'
        }
      }
    },
    {
      title: '违规时间',
      field: 'warnTime',
      width: 200,
      align: 'center',
      filters: false,
      itemRender: {
        name: '$vxeTime',
        props: {
          format: 'YYYY-MM-DD', // "当前日期为：YYYY-MM-DD，星期W，为第Q季度，时间为：hh:mm:ss:c"
          type: 'date',
          placeholder: '违规时间'
        }
      }
    },
    {
      title: '监控类型',
      field: 'triggerClass',
      formula: '',
      align: 'left',
      width: 180,
      itemRender: {
        name: '$vxeSelect',
        options: [
          {
            value: 1,
            label: '事中触发'
          },
          {
            value: 2,
            label: '定时触发'
          }
        ],
        props: {
          placeholder: '监控类型'
        },
        defaultValue: ''
      },
      name: '$vxeSelect'
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
    },
    {
      title: '追踪项目',
      field: 'trackProName',
      width: '8',
      align: 'left',
      formula: '',
      name: '$vxeInput',
      itemRender: {
        name: '$vxeInput',
        options: [],
        props: {
          placeholder: '追踪项目'
        }
      }
    }
  ],
  highQueryData: {
    agencyCodeList: '',
    businessNo: '',
    regulationClassName: '',
    warnTime: '',
    triggerClass: '',
    warningLevel: '',
    fiRuleName: '',
    trackProName: ''
  },
  // 预警数据明细
  undoNum: [
    {
      title: '区划',
      width: 180,
      field: 'mofDivName',
      sortable: false,
      filters: false,
      align: 'center',
      formatter({ row }) {
        return row.mofDivCode && row.mofDivName ? `${row.mofDivCode}-${row.mofDivName}` : ''
      }
    },
    {
      title: '预算单位',
      width: 180,
      field: 'agencyName',
      sortable: false,
      filters: false,
      align: 'center',
      formatter({ row }) {
        return row.agencyCode && row.agencyName ? `${row.agencyCode}-${row.agencyName}` : ''
      }
    },
    {
      title: '业务数据单号',
      width: 180,
      field: 'businessNo',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '主题',
      width: 180,
      field: 'regulationClassName',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '违规时间',
      width: 180,
      field: 'warnTime',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '监控类型',
      field: 'triggerClass',
      align: 'center',
      width: 180,
      cellRender: {
        name: '$vxeSelect',
        options: [
          {
            value: 1,
            label: '事中触发'
          },
          {
            value: 2,
            label: '定时触发'
          }
        ],
        defaultValue: '',
        props: {}
      },
      name: '$vxeSelect'
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
      align: 'center',
      width: 180,
      itemRender: {
        name: '$vxeSelect',
        options: store.state.warnInfo.warnLevelOptions.map(item => {
          return {
            ...item,
            value: String(item.value)
          }
        }),
        defaultValue: '',
        props: { disabled: true, placeholder: '预警级别' }
      },
      name: '$vxeSelect'
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
            label: '拦截'
          },
          {
            value: 2,
            label: '预警，需上传附件'
          },
          {
            value: 3,
            label: '预警，无需上传附件'
          },
          {
            value: 4,
            label: '提醒'
          },
          {
            value: 5,
            label: '记录'
          }
        ],
        defaultValue: '',
        props: {}
      },
      name: '$vxeSelect'
    },
    {
      title: '支付金额',
      field: 'paymentAmount',
      sortable: false,
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
      title: '违规详情',
      field: 'gloableOptionRowDetial',
      align: 'center',
      sortable: false,
      filters: false,
      width: 120,
      fixed: 'right',
      cellRender: {
        name: '$ReportTaskGloableOptionRow'
      }
    }, {
      title: '附件',
      field: 'gloableOptionRow',
      className: 'gloableOptionRow',
      align: 'center',
      fixed: 'right',
      sortable: false,
      filters: false,
      width: 100,
      cellRender: {
        name: '$payVoucherInputGloableOptionRow'
      }
    }
  ],
  // 认定正常明细
  normalNum: [
    ...budgetImpColumns,
    {
      title: '处室意见',
      field: 'departmentStatus',
      align: 'center',
      width: 180,
      cellRender: {
        name: '$vxeSelect',
        options: [
          {
            value: '2',
            label: '认定正常'
          },
          {
            value: '3',
            label: '需要核实（下发单位）'
          }
        ],
        defaultValue: '',
        props: {}
      },
      name: '$vxeSelect'
    },
    {
      title: '处室联系方式',
      width: 180,
      field: 'phone2',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '处室下发人',
      width: 180,
      field: 'handler2',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '处室指导意见',
      width: 180,
      field: 'information2',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '预算单位核实意见',
      field: 'agencyStatus',
      align: 'center',
      width: 180,
      cellRender: {
        name: '$vxeSelect',
        options: [
          {
            value: '1',
            label: '已整改'
          },
          {
            value: '2',
            label: '核实无误'
          }
        ],
        defaultValue: '',
        props: {}
      },
      name: '$vxeSelect'
    },
    {
      title: '预算单位联系方式',
      width: 180,
      field: 'phone1',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '预算单位处理人',
      width: 180,
      field: 'handler1',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '预算单位核实意见说明',
      width: 180,
      field: 'information1',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '违规详情',
      field: 'gloableOptionRowDetial',
      align: 'center',
      sortable: false,
      filters: false,
      width: 120,
      fixed: 'right',
      cellRender: {
        name: '$ReportTaskGloableOptionRow'
      }
    },
    {
      title: '附件',
      field: 'gloableOptionRow',
      className: 'gloableOptionRow',
      align: 'center',
      fixed: 'right',
      sortable: false,
      filters: false,
      width: 100,
      cellRender: {
        name: '$payVoucherInputGloableOptionRow'
      }
    }
  ],
  msgConfig: [
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
      title: '预算单位名称',
      span: 8,
      titleWidth: '180',
      field: 'agencyName',
      sortable: false,
      filters: false,
      align: 'center',
      itemRender: {
        name: '$vxeInput',
        props: { placeholder: '预算单位名称', disabled: true }
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
        props: { disabled: true, placeholder: '预算项目' }
      }
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
      field: 'govEconomyType',
      titleWidth: '180',
      span: 8,
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '政府经济分类' }
      }
    },
    {
      title: '部门经济分类',
      field: 'deptEconomyType',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '部门经济分类' }
      }
    },
    {
      title: '资金性质',
      field: 'natureOfFunds',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '资金性质' }
      }
    },
    {
      title: '功能分类',
      field: 'funcType',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '功能分类' }
      }
    },
    {
      title: '支付方式',
      field: 'paymentMethod',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '支付方式' }
      }
    },
    {
      title: '结算方式',
      field: 'settlementMethod',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '结算方式' }
      }
    },
    {
      title: '业务处室',
      field: 'businessOffice',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '业务处室' }
      }
    },
    {
      title: '工资标识',
      field: 'salaryMark',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '工资标识' }
      }
    },
    // {
    //   title: '是否工会经费',
    //   field: 'isUnionFunds',
    //   span: 8,
    //   titleWidth: '180',
    //   itemRender: {
    //     name: '$vxeInput',
    //     props: { disabled: true, placeholder: '是否工会经费' }
    //   }
    // },
    // {
    //   title: '三公经费',
    //   field: 'isThrExp',
    //   span: 8,
    //   titleWidth: '180',
    //   itemRender: {
    //     name: '$vxeInput',
    //     props: { disabled: true, placeholder: '三公经费' }
    //   }
    // },
    {
      title: '直达资金标识',
      field: 'directFund',
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
      title: '业务类型',
      field: 'payBusType',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '业务类型' }
      }
    },
    {
      title: '当前岗',
      field: 'todoName',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '当前岗' }
      }
    },
    {
      title: '是否作废',
      field: 'voidOrNot',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '是否作废' }
      }
    }, {
      title: '追踪项目',
      field: 'trackProName',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '追踪项目' }
      }
    }, {
      title: '支付日期',
      field: 'xpayDate',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '支付日期' }
      }
    }

  ],
  indexMsgConfig: [
    {
      field: 'timeoutIssueType',
      title: '超时下达类型',
      titleWidth: '180',
      span: 8,
      itemRender: {
        name: '$vxeInput',
        props: { placeholder: '超时下达类型', disabled: true }
      }
    },
    {
      field: 'corBgtDocNo',
      title: '指标文号',
      titleWidth: '180',
      span: 8,
      itemRender: {
        name: '$vxeInput',
        props: { placeholder: '指标文号', disabled: true }
      }
    },
    {
      field: 'fiscalYear',
      title: '预算年度',
      titleWidth: '180',
      span: 8,
      itemRender: {
        name: '$vxeInput',
        props: { placeholder: '预算年度', disabled: true }
      }
    },
    // {
    //   field: 'recDivName',
    //   title: '上级财政',
    //   titleWidth: '180',
    //   span: 8,
    //   itemRender: {
    //     name: '$vxeInput',
    //     props: { placeholder: '上级财政', disabled: true }
    //   }
    // }, {
    //   field: 'mofDivName',
    //   title: '下级财政',
    //   titleWidth: '180',
    //   span: 8,
    //   itemRender: {
    //     name: '$vxeInput',
    //     props: { placeholder: '下级财政', disabled: true }
    //   }
    // },
    {
      field: 'proName',
      title: '项目名称',
      titleWidth: '180',
      span: 8,
      itemRender: {
        name: '$vxeInput',
        props: { placeholder: '项目名称', disabled: true }
      }
    }, {
      field: 'recTime',
      title: '指标接收时间',
      titleWidth: '180',
      span: 8,
      itemRender: {
        name: '$vxeInput',
        props: { placeholder: '指标接收时间', disabled: true }
      }
    }, {
      field: 'recAmount',
      title: '接收金额',
      titleWidth: '180',
      span: 8,
      itemRender: {
        name: '$vxeInput',
        props: { placeholder: '接收金额', disabled: true }
      }
    }, {
      field: 'allocationAmount',
      title: '已分配金额',
      titleWidth: '180',
      span: 8,
      itemRender: {
        name: '$vxeInput',
        props: { placeholder: '已分配金额', disabled: true }
      }
    },
    {
      field: 'curAmt',
      title: '指标余额',
      titleWidth: '180',
      span: 8,
      itemRender: {
        name: '$vxeInput',
        props: { placeholder: '指标余额', disabled: true }
      }
    },
    {
      field: 'timeoutIssueAmount',
      title: '超时下达金额',
      titleWidth: '180',
      span: 8,
      itemRender: {
        name: '$vxeInput',
        props: { placeholder: '超时下达金额', disabled: true }
      }
    },
    {
      field: 'timeoutIssueTime',
      title: '超时下达时间',
      titleWidth: '180',
      span: 8,
      itemRender: {
        name: '$vxeInput',
        props: { placeholder: '超时下达时间', disabled: true }
      }
    }

  ],
  bgtMsgConfig: [
    // {
    //   field: 'warningCode',
    //   title: '监控数据编码',
    //   titleWidth: '180',
    //   span: 8,
    //   itemRender: {
    //     name: '$vxeInput',
    //     props: { placeholder: '监控数据编码', disabled: true }
    //   }
    // },
    // {
    //   field: 'payApplyNumber',
    //   title: '支付申请编号',
    //   titleWidth: '180',
    //   span: 8,
    //   itemRender: {
    //     name: '$vxeInput',
    //     props: { placeholder: '支付申请编号', disabled: true }
    //   }
    // },
    // {
    //   field: 'agencyName',
    //   title: '预算单位',
    //   titleWidth: '180',
    //   span: 8,
    //   itemRender: {
    //     name: '$vxeInput',
    //     props: { placeholder: '预算单位', disabled: true }
    //   }
    // },
    {
      // field: 'targetDocNum',
      field: 'corBgtDocNo',
      title: '指标文号',
      titleWidth: '180',
      span: 8,
      itemRender: {
        name: '$vxeInput',
        props: { placeholder: '指标文号', disabled: true }
      }
    },
    {
      // title: '预算项目',
      // field: 'projectName',
      title: '指标文标题',
      field: 'bgtDocTitle',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '指标文标题' } }
    },
    {
      title: '指标说明',
      field: 'bgtDec',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '指标说明' }
      }
    },
    {
      title: '项目代码',
      field: 'proCode',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '项目代码' }
      }
    },
    {
      title: '项目名称',
      field: 'proName',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '项目名称' }
      }
    },
    {
      title: '指标来源',
      field: 'sourceTypeName',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '指标来源' }
      }
    },
    {
      title: '资金性质名称',
      field: 'fundTypeName',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '资金性质' }
      }
    },
    {
      title: '资金支出名称',
      field: 'expFuncName',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '资金支出名称' }
      }
    },
    {
      title: '政府支出经济分类科目名称',
      field: 'govBgtEcoName',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '政府支出经济分类科目名称' }
      }
    }
    // {
    //   field: 'paymentAmount',
    //   title: '支付金额',
    //   titleWidth: '180',
    //   span: 8,
    //   itemRender: {
    //     name: '$vxeInput',
    //     props: { disabled: true, placeholder: '支付金额' }
    //   }
    // },
    // {
    //   title: '资金用途',
    //   field: 'useOfFunds',
    //   span: 8,
    //   titleWidth: '180',
    //   itemRender: {
    //     name: '$vxeInput',
    //     props: { disabled: true, placeholder: '资金用途' }
    //   }
    // },
    // {
    //   title: '政府经济分类',
    //   field: 'govEconomyType',
    //   titleWidth: '180',
    //   span: 8,
    //   itemRender: {
    //     name: '$vxeInput',
    //     props: { disabled: true, placeholder: '政府经济分类' }
    //   }
    // },
    // {
    //   title: '部门经济分类',
    //   field: 'deptEconomyType',
    //   span: 8,
    //   titleWidth: '180',
    //   itemRender: {
    //     name: '$vxeInput',
    //     props: { disabled: true, placeholder: '部门经济分类' }
    //   }
    // },
    // {
    //   title: '资金性质',
    //   field: 'natureOfFunds',
    //   span: 8,
    //   titleWidth: '180',
    //   itemRender: {
    //     name: '$vxeInput',
    //     props: { disabled: true, placeholder: '资金性质' }
    //   }
    // },
    // {
    //   title: '功能分类',
    //   field: 'funcType',
    //   span: 8,
    //   titleWidth: '180',
    //   itemRender: {
    //     name: '$vxeInput',
    //     props: { disabled: true, placeholder: '功能分类' }
    //   }
    // },
    // {
    //   title: '支付方式',
    //   field: 'paymentMethod',
    //   span: 8,
    //   titleWidth: '180',
    //   itemRender: {
    //     name: '$vxeInput',
    //     props: { disabled: true, placeholder: '支付方式' }
    //   }
    // },
    // {
    //   title: '结算方式',
    //   field: 'settlementMethod',
    //   span: 8,
    //   titleWidth: '180',
    //   itemRender: {
    //     name: '$vxeInput',
    //     props: { disabled: true, placeholder: '结算方式' }
    //   }
    // },
    // {
    //   title: '业务处室',
    //   field: 'businessOffice',
    //   span: 8,
    //   titleWidth: '180',
    //   itemRender: {
    //     name: '$vxeInput',
    //     props: { disabled: true, placeholder: '业务处室' }
    //   }
    // },
    // {
    //   title: '工资标识',
    //   field: 'salaryMark',
    //   span: 8,
    //   titleWidth: '180',
    //   itemRender: {
    //     name: '$vxeInput',
    //     props: { disabled: true, placeholder: '工资标识' }
    //   }
    // },
    // {
    //   title: '是否工会经费',
    //   field: 'isUnionFunds',
    //   span: 8,
    //   titleWidth: '180',
    //   itemRender: {
    //     name: '$vxeInput',
    //     props: { disabled: true, placeholder: '是否工会经费' }
    //   }
    // },
    // {
    //   title: '三公经费',
    //   field: 'isThrExp',
    //   span: 8,
    //   titleWidth: '180',
    //   itemRender: {
    //     name: '$vxeInput',
    //     props: { disabled: true, placeholder: '三公经费' }
    //   }
    // },
    // {
    //   title: '直达资金标识',
    //   field: 'directFund',
    //   span: 8,
    //   titleWidth: '180',
    //   itemRender: {
    //     name: '$vxeInput',
    //     props: { disabled: true, placeholder: '直达资金标识' }
    //   }
    // },
    // {
    //   title: '监控时间',
    //   field: 'fiDate',
    //   span: 8,
    //   titleWidth: '180',
    //   itemRender: {
    //     name: '$vxeInput',
    //     props: { type: 'datetime', disabled: true, placeholder: '监控时间' }
    //   }
    // }
  ],
  businessMsgConfig: [
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
      title: '预算单位名称',
      span: 8,
      titleWidth: '180',
      field: 'agencyName',
      sortable: false,
      filters: false,
      align: 'center',
      itemRender: {
        name: '$vxeInput',
        props: { placeholder: '预算单位名称', disabled: true }
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
        props: { disabled: true, placeholder: '预算项目' }
      }
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
      field: 'govEconomyType',
      titleWidth: '180',
      span: 8,
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '政府经济分类' }
      }
    },
    {
      title: '部门经济分类',
      field: 'deptEconomyType',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '部门经济分类' }
      }
    },
    {
      title: '资金性质',
      field: 'natureOfFunds',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '资金性质' }
      }
    },
    {
      title: '功能分类',
      field: 'funcType',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '功能分类' }
      }
    },
    {
      title: '支付方式',
      field: 'paymentMethod',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '支付方式' }
      }
    },
    {
      title: '结算方式',
      field: 'settlementMethod',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '结算方式' }
      }
    },
    {
      title: '业务处室',
      field: 'businessOffice',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '业务处室' }
      }
    },
    {
      title: '工资标识',
      field: 'salaryMark',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '工资标识' }
      }
    },
    {
      title: '是否工会经费',
      field: 'isUnionFunds',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '是否工会经费' }
      }
    },
    // {
    //   title: '三公经费',
    //   field: 'isThrExp',
    //   span: 8,
    //   titleWidth: '180',
    //   itemRender: {
    //     name: '$vxeInput',
    //     props: { disabled: true, placeholder: '三公经费' }
    //   }
    // },
    // {
    //   title: '直达资金标识',
    //   field: 'directFund',
    //   span: 8,
    //   titleWidth: '180',
    //   itemRender: {
    //     name: '$vxeInput',
    //     props: { disabled: true, placeholder: '直达资金标识' }
    //   }
    // },
    {
      title: '业务类型',
      field: 'payBusType',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '业务类型' }
      }
    },
    {
      title: '当前岗',
      field: 'todoName',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '当前岗' }
      }
    },
    {
      title: '是否作废',
      field: 'voidOrNot',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '是否作废' }
      }
    }
  ],
  businessMsgData: {
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
    voidOrNot: '',
    trackProName: '',
    xpayDate: ''
  },
  notRectifiedNum: [
    ...violationColumn,
    ...budgetImpColumns,
    ...otherColumns,
    ...operatorColumns
  ],
  doneNum: [
    {
      title: '违规类型',
      width: 180,
      field: 'violateType',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '疑似违规说明',
      width: 180,
      field: 'doubtViolateExplain',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '区划',
      width: 180,
      field: 'mofDivName',
      sortable: false,
      filters: false,
      align: 'center',
      formatter({ row }) {
        return row.mofDivCode && row.mofDivName ? `${row.mofDivCode}-${row.mofDivName}` : ''
      }
    },
    {
      title: '预算单位',
      width: 180,
      field: 'agencyName',
      sortable: false,
      filters: false,
      align: 'center',
      formatter({ row }) {
        return row.agencyCode && row.agencyName ? `${row.agencyCode}-${row.agencyName}` : ''
      }
    },
    {
      title: '业务数据单号',
      width: 180,
      field: 'businessNo',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '主题',
      width: 180,
      field: 'regulationClassName',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '违规时间',
      width: 180,
      field: 'warnTime',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '监控类型',
      field: 'triggerClass',
      align: 'center',
      width: 180,
      cellRender: {
        name: '$vxeSelect',
        options: [
          {
            value: 1,
            label: '事中触发'
          },
          {
            value: 2,
            label: '定时触发'
          }
        ],
        defaultValue: '',
        props: {}
      },
      name: '$vxeSelect'
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
      align: 'center',
      width: 180,
      itemRender: {
        name: '$vxeSelect',
        options: store.state.warnInfo.warnLevelOptions.map(item => {
          return {
            ...item,
            value: String(item.value)
          }
        }),
        defaultValue: '',
        props: { disabled: true, placeholder: '预警级别' }
      },
      name: '$vxeSelect'
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
            label: '拦截'
          },
          {
            value: 2,
            label: '预警，需上传附件'
          },
          {
            value: 3,
            label: '预警，无需上传附件'
          },
          {
            value: 4,
            label: '提醒'
          },
          {
            value: 5,
            label: '记录'
          }
        ],
        defaultValue: '',
        props: {}
      },
      name: '$vxeSelect'
    },
    {
      title: '处室意见',
      field: 'departmentStatus',
      align: 'center',
      width: 180,
      cellRender: {
        name: '$vxeSelect',
        options: [
          {
            value: '2',
            label: '认定正常'
          },
          {
            value: '3',
            label: '需要核实（下发单位）'
          }
        ],
        defaultValue: '',
        props: {}
      },
      name: '$vxeSelect'
    },
    {
      title: '处室联系方式',
      width: 180,
      field: 'phone2',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '处室下发人',
      width: 180,
      field: 'handler2',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '处室指导意见',
      width: 180,
      field: 'information2',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '预算单位核实意见',
      field: 'agencyStatus',
      align: 'center',
      width: 180,
      cellRender: {
        name: '$vxeSelect',
        options: [
          {
            value: '1',
            label: '已整改'
          },
          {
            value: '2',
            label: '核实无误'
          }
        ],
        defaultValue: '',
        props: {}
      },
      name: '$vxeSelect'
    },
    {
      title: '预算单位联系方式',
      width: 180,
      field: 'phone1',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '预算单位处理人',
      width: 180,
      field: 'handler1',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '预算单位核实意见说明',
      width: 180,
      field: 'information1',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '支付金额',
      field: 'paymentAmount',
      sortable: false,
      filters: false,
      width: 180,
      align: 'right',
      combinedType: [
        'average',
        'subTotal',
        'total',
        'totalAll'
      ],
      cellRender: { name: '$vxeMoney' }
    },
    // {
    //   title: '附件',
    //   filters: false,
    //   width: 140,
    //   sortable: false,
    //   align: 'center',
    //   field: 'gloableOptionRow',
    //   className: 'gloableOptionRow',
    //   cellRender: {
    //     name: '$payVoucherInputGloableOptionRow',
    //     options: [],
    //     defaultValue: '',
    //     props: {}
    //   },
    //   name: '$payVoucherInputGloableOptionRow'
    // },
    {
      title: '违规详情',
      field: 'gloableOptionRowDetial',
      align: 'center',
      sortable: false,
      filters: false,
      width: 120,
      fixed: 'right',
      cellRender: {
        name: '$ReportTaskGloableOptionRow'
      }
    }, {
      title: '附件',
      field: 'gloableOptionRow',
      className: 'gloableOptionRow',
      align: 'center',
      fixed: 'right',
      sortable: false,
      filters: false,
      width: 100,
      cellRender: {
        name: '$payVoucherInputGloableOptionRow'
      }
    }
  ],
  msgData: {
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
    voidOrNot: '',
    trackProName: '',
    xpayDate: ''
  },
  indexMsgData: {
    timeoutIssueType: '',
    corBgtDocNo: '',
    fiscalYear: '',
    recDivName: '',
    mofDivName: '',
    violateType5: '', // 项目类别
    proName: '',
    recTime: '',
    recAmount: '',
    allocationAmount: '',
    fiRuleName: '',
    violateType11: '', // 违规责任单位
    timeoutIssueAmount: '',
    timeoutIssueTime: '',
    curAmt: ''
  },
  handletableColumnsConfig: [
    {
      title: '规则名称',
      field: 'regulationName',
      sortable: false,
      align: 'left',
      cellRender: {
        name: '$vxeTableHref'
      }
    },
    {
      title: '预警级别',
      field: 'warnLevel',
      align: 'center',
      width: 180,
      itemRender: {
        name: '$vxeSelect',
        options: store.state.warnInfo.warnLevelOptions.map(item => {
          return {
            ...item,
            value: String(item.value)
          }
        }),
        defaultValue: '',
        props: { disabled: true, placeholder: '预警级别' }
      },
      name: '$vxeSelect'
    },
    {
      'title': '处理方式',
      'field': 'handleType',
      'align': 'center',
      'cellRender': {
        'name': '$vxeSelect',
        'options': [
          {
            value: 1,
            label: '拦截'
          },
          {
            value: 2,
            label: '预警，需上传附件'
          },
          {
            value: 3,
            label: '预警，无需上传附件'
          },
          {
            value: 4,
            label: '提醒'
          },
          {
            value: 5,
            label: '记录'
          }
        ],
        'defaultValue': '',
        'props': {}
      },
      'sortable': 'true',
      'name': '$vxeSelect'
    }
  ],
  createConfig: [
    {
      field: 'violateType',
      title: '违规类型',
      titleWidth: '180',
      visible: true,
      span: 8,
      itemRender: {
        name: '$vxeSelect',
        props: { placeholder: '违规类型' },
        options: [
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
      width: 180,
      itemRender: {
        name: '$vxeSelect',
        options: store.state.warnInfo.warnLevelOptions.map(item => {
          return {
            ...item,
            value: String(item.value)
          }
        }),
        defaultValue: '',
        props: { disabled: true, placeholder: '预警级别' }
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
            label: '拦截'
          },
          {
            value: 2,
            label: '预警，需上传附件'
          },
          {
            value: 3,
            label: '预警，无需上传附件'
          },
          {
            value: 4,
            label: '提醒'
          },
          {
            value: 5,
            label: '记录'
          }
        ],
        defaultValue: '',
        props: { disabled: true, placeholder: '处理方式' }
      },
      name: '$vxeSelect'
    },
    // {
    //   title: '处理结果',
    //   field: 'handleResult',
    //   align: 'center',
    //   titleWidth: '180',
    //   span: 8,
    //   itemRender: {
    //     name: '$vxeSelect',
    //     options: [
    //       {
    //         value: 0,
    //         label: '未处理'
    //       },
    //       {
    //         value: 1,
    //         label: '通过'
    //       },
    //       {
    //         value: 2,
    //         label: '不通过'
    //       }
    //     ],
    //     defaultValue: '',
    //     props: { disabled: true, placeholder: '处理结果' }
    //   },
    //   name: '$vxeSelect'
    // },
    {
      title: '区划',
      field: 'mofDivCode',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '区划' }
      }
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
  checkConfig: [
    {
      field: 'violateType',
      title: '违规类型',
      titleWidth: '180',
      span: 8,
      itemRender: {
        name: '$vxeSelect',
        props: { placeholder: '违规类型', disabled: true },
        options: [
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
      width: 180,
      itemRender: {
        name: '$vxeSelect',
        options: store.state.warnInfo.warnLevelOptions.map(item => {
          return {
            ...item,
            value: String(item.value)
          }
        }),
        defaultValue: '',
        props: { disabled: true, placeholder: '预警级别' }
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
            label: '拦截'
          },
          {
            value: 2,
            label: '预警，需上传附件'
          },
          {
            value: 3,
            label: '预警，无需上传附件'
          },
          {
            value: 4,
            label: '提醒'
          },
          {
            value: 5,
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
            value: 0,
            label: '未处理'
          },
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
        props: { disabled: true, placeholder: '区划' }
      }
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
  /**
   * 根据传入的参数去动态生成表头数据
   * @param {*} status  数据的状态
   * @param {*} business  所属业务
   */
  getColumns(status, business, showLog, regulationClass) {
    // 根据business拿到具体的column
    console.log(budgetManagementColumns)
    // 6和1 代表 支付
    // 8和2  代表 指标[]
    const isIndex = [6, '6', 2, '2'].includes(business)
    const re = ['0207'].includes(regulationClass)
    console.log('000000000000000', store.state.warnInfo.warnLevelOptions)
    let columns1 = business && isIndex ? budgetImpColumns.filter(item => { return item.field !== 'paymentAmount' }) : budgetImpColumns
    let columns = business && isIndex && re ? budgetManagementColumns : columns1
    const tempOperatorColumns = [...operatorColumns]
    if (showLog) {
      tempOperatorColumns.splice(1, 0, {
        title: '监控处理日志',
        field: 'gloableOptionRowLog',
        align: 'center',
        sortable: false,
        filters: false,
        width: 120,
        fixed: 'right',
        cellRender: {
          name: '$gloableOptionRowLog'
        }
      })
    }
    console.log('1111111111111', operatorColumns)
    if (status.indexOf('UndoNum') > 0) {
      return [
        ...columns,
        ...operatorColumns
      ]
    }
    if (status.indexOf('NormalNum') > 0) {
      return [
        ...columns,
        ...otherColumns,
        ...operatorColumns
      ]
    }
    if (status.indexOf('DoneNum') > 0 || status.indexOf('NotRectifiedNum') > 0) {
      return [
        ...violationColumn,
        ...columns,
        ...otherColumns,
        ...tempOperatorColumns
      ]
    }
  }
}
const statusButtons = [
  {
    code: '1',
    label: '预警数据',
    iconName: 'base-all.png',
    iconNameActive: 'base-all-active.png',
    type: 'button',
    curValue: '1'
  },
  {
    code: '2',
    label: '认定正常',
    iconName: 'base-all.png',
    iconNameActive: 'base-all-active.png',
    type: 'button',
    curValue: '2'
  },
  {
    code: '3',
    label: '已整改',
    iconName: 'base-all.png',
    iconNameActive: 'base-all-active.png',
    type: 'button',
    curValue: '3'
  },
  {
    code: '4',
    label: '未完成',
    iconName: 'base-all.png',
    iconNameActive: 'base-all-active.png',
    type: 'button',
    curValue: '4'
  }
]

const curStatusButton = {
  label: '预警数据',
  code: '1',
  type: 'button',
  curValue: '1'
}
const curStatusButton1 = {
  label: '认定正常',
  code: '2',
  type: 'button',
  curValue: '2'
}
const curStatusButton2 = {
  label: '已整改',
  code: '3',
  type: 'button',
  curValue: '3'
}
const curStatusButton3 = {
  label: '未完成',
  code: '4',
  type: 'button',
  curValue: '4'
}
const buttons1 = {
  1: [
    {
      label: '生成',
      code: 'create',
      status: 'primary'
    }
  ],
  2: [
  ],
  3: [
    // {
    //   label: '联查业务数据',
    //   code: 'queryBusinessData',
    //   status: 'primary'
    // },
    {
      label: '整改详情',
      code: 'show_detail',
      status: 'primary'
    }
  ],
  4: [
  ]
}
const buttons2 = {
  1: [
  ],
  2: [
  ],
  4: [
  ],
  3: [
    // {
    //   label: '联查业务数据',
    //   code: 'queryBusinessData',
    //   status: 'primary'
    // },
    {
      label: '整改详情',
      code: 'show_detail',
      status: 'primary'
    }
  ]
}
export default proconf
export {
  statusButtons,
  curStatusButton,
  curStatusButton1,
  curStatusButton2,
  curStatusButton3,
  buttons1,
  buttons2
}
