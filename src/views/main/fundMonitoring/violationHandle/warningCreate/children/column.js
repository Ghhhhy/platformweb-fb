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
    tooltipFormat: '{mofDivCode}-{mofDivName}',
    formatter({ row }) {
      return row.mofDivCode && row.mofDivName ? `${row.mofDivCode}-${row.mofDivName}` : ''
    },
    exportFormatter: true
  },
  {
    title: '业务处室',
    width: 180,
    field: 'manageMofDepName',
    sortable: false,
    filters: false,
    align: 'center'
  },
  // {
  //   title: '单位编码',
  //   width: 180,
  //   field: 'unitCode',
  //   sortable: false,
  //   filters: false,
  //   align: 'center'
  // },
  {
    title: '预算单位',
    width: 180,
    field: 'agencyName',
    sortable: false,
    filters: store.getters.isXm ? [{ data: '' }] : false,
    filterRender: {
      name: 'FilterInput'
    },
    align: 'center',
    tooltipFormat: '{agencyCode}-{agencyName}',
    formatter({ row }) {
      return row.agencyCode && row.agencyName ? `${row.agencyCode}-${row.agencyName}` : ''
    },
    exportFormatter: true // 导出formatter展示的数据 @BsUI >= 2.1.2-beta.12

  },
  {
    title: '支付凭证号',
    width: 180,
    field: 'payCertNo',
    sortable: false,
    filters: false,
    align: 'center'
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
    title: store.getters.isFuJian ? '监控时间' : '违规时间',
    width: 180,
    field: 'warnTime',
    sortable: true,
    filters: false,
    align: 'center'
  },
  // {
  //   title: '监控类型',
  //   field: 'triggerClass',
  //   align: 'center',
  //   width: 180,
  //   cellRender: {
  //     name: '$vxeSelect',
  //     options: [
  //       {
  //         value: 1,
  //         label: '事中触发'
  //       },
  //       {
  //         value: 2,
  //         label: '定时触发'
  //       }
  //     ],
  //     defaultValue: '',
  //     props: {}
  //   },
  //   name: '$vxeSelect'
  // },
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
    filters: store.state.warnInfo.warnLevelOptions,
    filterRender: {
      name: '$vxeSelect'
    },
    cellRender: {
      name: '$warningLevelRender',
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
      options: store.state.warnInfo.warnControlTypeOptions.map(item => {
        return {
          ...item,
          value: String(item.value)
        }
      }),
      props: {}
    },
    name: '$vxeSelect'
  },
  {
    title: '支付金额',
    field: 'paymentAmount',
    sortable: true,
    filters: false,
    align: 'right',
    width: 160,
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
    width: 280,
    field: 'trackProName',
    sortable: false,
    filters: false,
    align: 'center',
    exportFormatter: true, // 导出formatter展示的数据 @BsUI >= 2.1.2-beta.12
    tooltipFormat: '{trackProCode}-{trackProName}',
    formatter({ row }) {
      if (row.trackProCode && row.trackProName) {
        return `${row.trackProCode}-${row.trackProName}`
      }
      return `${row.trackProName}`
    }
  },
  {
    title: '预算项目',
    width: 220,
    field: 'proName',
    sortable: false,
    filters: false,
    align: 'center',
    tooltipFormat: '{proCode}-{proName}',
    formatter({ row }) {
      if (row.proCode && row.proName) {
        return `${row.proCode}-${row.proName}`
      }
      return `${row.proName}`
    },
    exportFormatter: true
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
    sortable: true,
    filters: false,
    align: 'center'
  }, {
    title: '接收金额',
    width: 180,
    field: 'recAmount',
    sortable: true,
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
    title: '指标管理处室编码',
    width: 180,
    field: 'bgtMofDepCode',
    sortable: false,
    filters: false,
    align: 'center'
  },
  {
    title: '指标管理处室名称',
    width: 180,
    field: 'bgtMofDepName',
    sortable: false,
    filters: false,
    align: 'center'
  },
  {
    field: 'curAmt',
    title: '指标余额',
    titleWidth: '180',
    sortable: true,
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
    sortable: true,
    span: 8,
    itemRender: {
      name: '$vxeInput',
      props: { placeholder: '超时下达金额', disabled: true }
    }
  },
  {
    field: 'timeoutIssueTime',
    title: '超时下达时间',
    sortable: true,
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
    title: '生成时间',
    width: 180,
    field: 'warnDealGenTime',
    sortable: true,
    filters: false,
    align: 'center'
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
      title: '支付凭证号',
      field: 'payCertNo',
      width: 180,
      align: 'left',
      formula: '',
      name: '$vxeInput',
      itemRender: {
        name: '$vxeInput',
        props: {
          clearable: true,
          placeholder: '支付凭证号'
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
          clearable: true,
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
          clearable: true,
          placeholder: '主题'
        }
      }
    },
    {
      title: '违规开始时间',
      field: 'warnStartTime',
      width: 200,
      align: 'center',
      filters: false,
      itemRender: {
        name: '$vxeTime',
        props: {
          // format: 'YYYY-MM-DD 00:00:00', // "当前日期为：YYYY-MM-DD，星期W，为第Q季度，时间为：hh:mm:ss:c"
          type: 'date',
          'label-format': 'yyyy-MM-dd',
          'value-format': 'yyyy-MM-dd 00:00:00',
          placeholder: '违规开始时间'
        }
      }
    },
    {
      title: '违规结束时间',
      field: 'warnTime',
      width: 200,
      align: 'center',
      filters: false,
      itemRender: {
        name: '$vxeTime',
        props: {
          // format: 'YYYY-MM-DD 00:00:00', // "当前日期为：YYYY-MM-DD，星期W，为第Q季度，时间为：hh:mm:ss:c"
          type: 'date',
          'label-format': 'yyyy-MM-dd',
          'value-format': 'yyyy-MM-dd 23:59:59',
          placeholder: '违规结束时间'
        }
      }
    },
    // {
    //   title: '监控类型',
    //   field: 'triggerClass',
    //   formula: '',
    //   align: 'left',
    //   width: 180,
    //   itemRender: {
    //     name: '$vxeSelect',
    //     options: [
    //       {
    //         value: 1,
    //         label: '事中触发'
    //       },
    //       {
    //         value: 2,
    //         label: '定时触发'
    //       }
    //     ],
    //     props: {
    //       placeholder: '监控类型'
    //     },
    //     defaultValue: ''
    //   },
    //   name: '$vxeSelect'
    // },
    {
      title: '监控规则',
      field: 'ruleCodes',
      width: '8',
      align: 'left',
      name: '$vxeTree',
      itemRender: {
        name: '$vxeTree',
        options: [],
        props: {
          format: '{code}',
          config: {
            valueKeys: ['code', 'name', 'id', 'codeFragment'],
            format: '{name}',
            treeProps: {
              labelFormat: '{code}-{name}', // {code}-{name}
              nodeKey: 'id',
              label: 'label',
              children: 'children'
            },
            placeholder: '监控规则',
            multiple: true,
            readonly: false,
            isleaf: true
          }
        }
      }
    },
    {
      title: '追踪项目',
      field: 'trackProName',
      width: '8',
      align: 'left',
      name: '$vxeTree',
      itemRender: {
        name: '$vxeTree',
        options: [],
        props: {
          config: {
            valueKeys: ['code', 'name', 'id'],
            format: '{name}',
            treeProps: {
              labelFormat: '{code}-{name}', // {code}-{name}
              nodeKey: 'id',
              label: 'label',
              children: 'children'
            },
            placeholder: '追踪项目',
            clearable: true,
            multiple: true,
            readonly: false,
            isleaf: true
          }
        }
      }
    },
    {
      title: store.getters.isFuJian ? '预警开始时间' : '警告开始时间',
      field: 'warnStartDate',
      sortable: false,
      align: 'left',
      itemRender: {
        name: '$vxeTime',
        defaultValue: '',
        format: 'YYYY-MM-DD',
        props: {
          type: 'date', //
          placeholder: '警告开始时间',
          value: ''
        }
      }
    },
    {
      title: store.getters.isFuJian ? '预警结束时间' : '警告结束时间',
      field: 'warnEndDate',
      sortable: false,
      align: 'left',
      itemRender: {
        name: '$vxeTime',
        defaultValue: '',
        format: 'YYYY-MM-DD',
        props: {
          type: 'date', //
          placeholder: '警告结束时间',
          value: ''
        }
      }
    },
    {
      title: '开始处理时间',
      field: 'dealWarnStartDate',
      sortable: false,
      align: 'left',
      itemRender: {
        name: '$vxeTime',
        defaultValue: '',
        format: 'YYYY-MM-DD',
        props: {
          type: 'date', //
          placeholder: '开始处理时间',
          value: ''
        }
      }
    },
    {
      title: '结束处理时间',
      field: 'dealWarnEndDate',
      sortable: false,
      align: 'left',
      itemRender: {
        name: '$vxeTime',
        format: 'YYYY-MM-DD',
        props: {
          type: 'date', //
          placeholder: '结束处理时间',
          value: ''
        }
      }
    },
    {
      title: '指标接收开始时间',
      field: 'recStartTime',
      sortable: false,
      align: 'left',
      itemRender: {
        name: '$vxeTime',
        defaultValue: '',
        format: 'YYYY-MM-DD',
        props: {
          type: 'date', //
          placeholder: '指标接收开始时间',
          'value-format': 'yyyy-MM-dd 00:00:00',
          'label-format': 'yyyy-MM-dd'
        }
      }
    },
    {
      title: '指标接收截止时间',
      field: 'recEndTime',
      sortable: false,
      align: 'left',
      itemRender: {
        name: '$vxeTime',
        defaultValue: '',
        format: 'YYYY-MM-DD',
        props: {
          type: 'date', //
          placeholder: '指标接收截止时间',
          'value-format': 'yyyy-MM-dd 23:59:59',
          'label-format': 'yyyy-MM-dd'
        }
      }
    },
    {
      title: '支付开始时间',
      field: 'xPayDateStart',
      sortable: false,
      align: 'left',
      itemRender: {
        name: '$vxeTime',
        defaultValue: '',
        format: 'YYYY-MM-DD',
        props: {
          type: 'date', //
          placeholder: '支付开始时间',
          'value-format': 'yyyy-MM-dd 00:00:00',
          'label-format': 'yyyy-MM-dd'
        }
      }
    },
    {
      title: '支付截止时间',
      field: 'xPayDateEnd',
      sortable: false,
      align: 'left',
      itemRender: {
        name: '$vxeTime',
        defaultValue: '',
        format: 'YYYY-MM-DD',
        props: {
          type: 'date', //
          placeholder: '支付截止时间',
          'value-format': 'yyyy-MM-dd 23:59:59',
          'label-format': 'yyyy-MM-dd'
        }
      }
    }
  ],
  highQueryData: {
    agencyCodeList: '',
    payCertNo: '',
    businessNo: '',
    regulationClassName: '',
    warnTime: '',
    warnStartTime: '',
    triggerClass: '',
    warningLevel: '',
    fiRuleName: '',
    trackProName: '',
    warnStartDate: '',
    warnEndDate: '',
    dealWarnStartDate: '',
    dealWarnEndDate: '',
    recStartTime: '',
    recEndTime: '',
    xPayDateStart: '',
    xPayDateEnd: ''
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
      tooltipFormat: '{mofDivCode}-{mofDivName}',
      formatter({ row }) {
        return row.mofDivCode && row.mofDivName ? `${row.mofDivCode}-${row.mofDivName}` : ''
      },
      exportFormatter: true
    },
    {
      title: '预算单位',
      width: 180,
      field: 'agencyName',
      sortable: false,
      filters: false,
      align: 'center',
      tooltipFormat: '{agencyCode}-{agencyName}',
      formatter({ row }) {
        return row.agencyCode && row.agencyName ? `${row.agencyCode}-${row.agencyName}` : ''
      },
      exportFormatter: true
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
      title: store.getters.isFuJian ? '监控时间' : '违规时间',
      width: 180,
      field: 'warnTime',
      sortable: true,
      filters: false,
      align: 'center'
    },
    // {
    //   title: '监控类型',
    //   field: 'triggerClass',
    //   align: 'center',
    //   width: 180,
    //   cellRender: {
    //     name: '$vxeSelect',
    //     options: [
    //       {
    //         value: 1,
    //         label: '事中触发'
    //       },
    //       {
    //         value: 2,
    //         label: '定时触发'
    //       }
    //     ],
    //     defaultValue: '',
    //     props: {}
    //   },
    //   name: '$vxeSelect'
    // },
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
      filters: store.state.warnInfo.warnLevelOptions,
      filterRender: {
        name: '$vxeSelect'
      },
      cellRender: {
        name: '$warningLevelRender',
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
        options: store.state.warnInfo.warnControlTypeOptions.map(item => {
          return {
            ...item,
            value: String(item.value)
          }
        }),
        props: {}
      },
      name: '$vxeSelect'
    },
    {
      title: '支付金额',
      field: 'paymentAmount',
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
      visible: !store.getters.isFuJian,
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
      },
      tooltipFormat: '{proCode}-{proName}',
      formatter({ row }) {
        if (row.proCode && row.proName) {
          return `${row.proCode}-${row.proName}`
        }
        return `${row.proName}`
      },
      exportFormatter: true
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
      sortable: true,
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
      title: '创建时间',
      field: 'createTime',
      span: 8,
      titleWidth: '180',
      sortable: true,
      visible: store.getters.isFuJian,
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '创建时间' }
      }
    },
    {
      title: '监控时间',
      field: 'fiDate',
      span: 8,
      sortable: true,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { type: 'datetime', disabled: true, placeholder: '监控时间' }
      }
    },
    {
      title: '支付日期',
      field: 'xpayDate',
      span: 8,
      titleWidth: '180',
      sortable: true,
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '支付日期' }
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
      title: '指标管理处室编码',
      field: 'bgtMofDepCode',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '指标管理处室编码' }
      }
    }, {
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
      title: '追踪项目',
      field: 'trackProName',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '追踪项目' }
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
      sortable: true,
      itemRender: {
        name: '$vxeInput',
        props: { placeholder: '指标接收时间', disabled: true }
      }
    }, {
      field: 'recAmount',
      title: '接收金额',
      titleWidth: '180',
      sortable: true,
      span: 8,
      itemRender: {
        name: '$vxeInput',
        props: { placeholder: '接收金额', disabled: true }
      }
    }, {
      field: 'allocationAmount',
      title: '已分配金额',
      titleWidth: '180',
      sortable: true,
      span: 8,
      itemRender: {
        name: '$vxeInput',
        props: { placeholder: '已分配金额', disabled: true }
      }
    },
    {
      field: 'curAmt',
      title: '指标余额',
      sortable: true,
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
      sortable: true,
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
      sortable: true,
      itemRender: {
        name: '$vxeInput',
        props: { placeholder: '超时下达时间', disabled: true }
      }
    },
    {
      field: 'bgtMofDepCode',
      title: '指标管理处室编码',
      titleWidth: '180',
      span: 8,
      itemRender: {
        name: '$vxeInput',
        props: { placeholder: '指标管理处室编码', disabled: true }
      }
    },
    {
      field: 'bgtMofDepName',
      title: '指标管理处室名称',
      titleWidth: '180',
      span: 8,
      itemRender: {
        name: '$vxeInput',
        props: { placeholder: '指标管理处室名称', disabled: true }
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
      },
      tooltipFormat: '{proCode}-{proName}',
      formatter({ row }) {
        if (row.proCode && row.proName) {
          return `${row.proCode}-${row.proName}`
        }
        return `${row.proName}`
      },
      exportFormatter: true
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
      sortable: true,
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
      tooltipFormat: '{mofDivCode}-{mofDivName}',
      formatter({ row }) {
        return row.mofDivCode && row.mofDivName ? `${row.mofDivCode}-${row.mofDivName}` : ''
      },
      exportFormatter: true
    },
    {
      title: '预算单位',
      width: 180,
      field: 'agencyName',
      sortable: false,
      filters: false,
      align: 'center',
      tooltipFormat: '{agencyCode}-{agencyName}',
      formatter({ row }) {
        return row.agencyCode && row.agencyName ? `${row.agencyCode}-${row.agencyName}` : ''
      },
      exportFormatter: true
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
      title: store.getters.isFuJian ? '监控时间' : '违规时间',
      width: 180,
      field: 'warnTime',
      sortable: true,
      filters: false,
      align: 'center'
    },
    // {
    //   title: '监控类型',
    //   field: 'triggerClass',
    //   align: 'center',
    //   width: 180,
    //   cellRender: {
    //     name: '$vxeSelect',
    //     options: [
    //       {
    //         value: 1,
    //         label: '事中触发'
    //       },
    //       {
    //         value: 2,
    //         label: '定时触发'
    //       }
    //     ],
    //     defaultValue: '',
    //     props: {}
    //   },
    //   name: '$vxeSelect'
    // },
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
      filters: store.state.warnInfo.warnLevelOptions,
      filterRender: {
        name: '$vxeSelect'
      },
      cellRender: {
        name: '$warningLevelRender',
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
        options: store.state.warnInfo.warnControlTypeOptions.map(item => {
          return {
            ...item,
            value: String(item.value)
          }
        }),
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
      sortable: true,
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
      title: '指标管理处室',
      width: 180,
      field: 'bgtMofDepName',
      visible: store.getters.isHLJ,
      formatter({ row }) {
        if (row.bgtMofDepCode && row.bgtMofDepName) {
          return `${row.bgtMofDepCode}-${row.bgtMofDepName}`
        }
        return `${row.bgtMofDepName}`
      }
    },
    {
      title: '预警级别',
      field: store.getters.isNeiMeng ? 'warnLevel' : 'warningLevel',
      align: 'center',
      width: 180,
      filters: store.state.warnInfo.warnLevelOptions,
      filterRender: {
        name: '$vxeSelect'
      },
      cellRender: {
        name: '$warningLevelRender',
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
        options: store.state.warnInfo.warnControlTypeOptions.map(item => {
          return {
            ...item,
            value: String(item.value)
          }
        }),
        props: {}
      },
      name: '$vxeSelect'
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
        options: store.state.warnInfo.warnControlTypeOptions.map(item => {
          return {
            ...item,
            value: String(item.value)
          }
        }),
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
      sortable: true,
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
        options: store.state.warnInfo.warnControlTypeOptions.map(item => {
          return {
            ...item,
            value: String(item.value)
          }
        }),
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
      sortable: true,
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
  getColumns(status, business, showLog, regulationClass, isFlow) {
    // 根据business拿到具体的column
    console.log(budgetManagementColumns)
    // 6和1 代表 支付
    // 8和2  代表 指标[]
    const isIndex = [6, '6', 2, '2'].includes(business)
    // const isBgtIndex = [8, '8', 2, 2].includes(business)
    const re = ['0207'].includes(regulationClass)
    console.log('000000000000000', store.state.warnInfo.warnLevelOptions)
    let columns1 = business && isIndex ? budgetImpColumns.filter(item => { return item.field !== 'paymentAmount' }) : budgetImpColumns
    let columns = business && isIndex && re ? budgetManagementColumns : columns1
    // 厦门
    // if (business && !isBgtIndex) {
    //   const { province } = store.state.userInfo
    //   if (province?.slice(0, 4) === '3502') { // 项目项目隐藏三个字段
    //   }
    // }
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
          name: '$gloableOptionRowLog1'
        }
      })
    }
    // console.log('1111111111111', operatorColumns, isFlow)
    let otherColumnsCopy = [
      // {
      //   title: '生成时间',
      //   width: 180,
      //   field: 'warnDealGenTime',
      //   sortable: false,
      //   filters: false,
      //   align: 'center'
      // },
      ...otherColumns
    ]
    if (isFlow) {
      otherColumnsCopy = [
        {
          title: '生成时间',
          width: 180,
          field: 'warnDealGenTime',
          sortable: true,
          filters: false,
          align: 'center'
        }
      ]
    }
    if (status.indexOf('UndoNum') > 0) {
      return [
        ...columns,
        ...operatorColumns
      ]
    }
    if (status.indexOf('NormalNum') > 0) {
      return [
        ...columns,
        ...otherColumnsCopy,
        ...tempOperatorColumns
      ]
    }
    if (status.indexOf('DoneNum') > 0 || status.indexOf('NotRectifiedNum') > 0) {
      return [
        ...violationColumn,
        ...columns,
        ...otherColumnsCopy,
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
export default proconf
export {
  statusButtons,
  curStatusButton,
  curStatusButton1,
  curStatusButton2,
  curStatusButton3
}
