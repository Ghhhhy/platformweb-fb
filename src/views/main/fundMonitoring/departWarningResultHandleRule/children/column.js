// import store from '@/store/index'
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
  gloableOptionRow1: {
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
          <a class="gloable-option-row-attachment gloable-option-row  fn-inline" onClick={() => self.onOptionRowClick({ row, column, optionType: 'attachment1' })}>附件</a>,
        </el-tooltip>
      ]
    }
  },
  highQueryConfig: [
    {
      title: '单位名称',
      field: 'agencyName',
      width: '8',
      align: 'left',
      formula: '',
      name: '$vxeInput',
      itemRender: {
        name: '$vxeInput',
        props: {
          placeholder: '单位名称'
        }
      }
    }
  ],
  highQueryData: {
    businessOffice: ''
  },
  // 红灯系统整改
  redUndoNum: [
    {
      title: '预警规则',
      field: 'fiRuleName',
      width: 140,
      align: 'center',
      filters: false
    },
    {
      title: '年度',
      field: 'fiscalYear',
      sortable: false,
      filters: false,
      width: 140,
      align: 'center'
    },
    {
      title: '地区',
      field: 'mofDivName',
      sortable: false,
      filters: false,
      width: 140,
      align: 'left'
    },
    {
      title: '单位(处室)',
      field: 'businessOffice',
      sortable: false,
      filters: false,
      width: 140,
      align: 'left'
    },
    {
      title: '问题明细',
      field: 'detail',
      sortable: false,
      filters: false,
      width: 400,
      align: 'right'
    },
    {
      title: '预警结果',
      field: 'warnResult',
      sortable: false,
      filters: false,
      width: 140,
      align: 'center',
      cellRender: {
        name: '$vxeIcon1',
        props: {
          // 不显示数值
          showValue: false,
          $refs: this
        }
      }
    },
    {
      title: '预警时间',
      field: 'fiDate',
      filters: false,
      width: 140,
      sortable: false,
      align: 'right'
    },
    {
      title: '处理结果',
      filters: false,
      width: 140,
      field: 'rectifyDetail',
      sortable: false,
      align: 'right'
    },
    {
      title: '整改时间',
      filters: false,
      width: 140,
      field: 'rectifyTime',
      sortable: false,
      align: 'right'
    }
  ],
  redDoneNum: [
    {
      title: '预警规则',
      field: 'fiRuleName',
      width: 140,
      align: 'center'
    },
    {
      title: '年度',
      field: 'fiscalYear',
      sortable: false,
      filters: false,
      width: 140,
      align: 'center'
    },
    {
      title: '地区',
      field: 'mofDivName',
      sortable: false,
      filters: false,
      width: 140
    },
    {
      title: '单位(处室)',
      field: 'businessOffice',
      sortable: false,
      filters: false,
      width: 140
    },
    {
      title: '问题明细',
      field: 'detail',
      sortable: false,
      filters: false,
      width: 400,
      align: 'right'
    },
    {
      title: '预警结果',
      field: 'warnResult',
      sortable: false,
      filters: false,
      width: 140,
      align: 'center',
      cellRender: {
        name: '$vxeIcon3',
        props: {
          // 不显示数值
          showValue: false,
          $refs: this
        }
      }
    },
    {
      title: '预警时间',
      field: 'fiDate',
      filters: false,
      width: 140,
      sortable: false,
      align: 'right'
    },
    {
      title: '处理结果',
      filters: false,
      width: 140,
      field: 'rectifyDetail',
      sortable: false,
      align: 'right'
    },
    {
      title: '整改时间',
      filters: false,
      width: 140,
      field: 'rectifyTime',
      sortable: false,
      align: 'right'
    }
  ],
  orangeUndoNum: [
    {
      title: '预警规则',
      field: 'fiRuleName',
      width: 140,
      align: 'center',
      filters: false
    },
    {
      title: '年度',
      field: 'fiscalYear',
      sortable: false,
      filters: false,
      width: 140,
      align: 'center'
    },
    {
      title: '区划名称',
      field: 'mofDivName',
      sortable: false,
      filters: false,
      width: 140,
      align: 'center'
    },
    {
      title: '单位名称',
      field: 'agencyName',
      sortable: false,
      filters: false,
      width: 140,
      align: 'center'
    },
    {
      title: '专项资金',
      field: 'speTypeName',
      sortable: false,
      filters: false,
      width: 140,
      align: 'center'
    },
    {
      title: '明细',
      field: 'detail',
      sortable: false,
      filters: false,
      width: 400,
      align: 'center'
    },
    {
      title: '预警结果',
      field: 'warnResult',
      sortable: false,
      filters: false,
      width: 140,
      align: 'center',
      cellRender: {
        name: '$vxeIcon6',
        props: {
          // 不显示数值
          showValue: false,
          $refs: this
        }
      }
    },
    {
      title: '预警时间',
      field: 'fiDate',
      filters: false,
      width: 140,
      sortable: false,
      align: 'center'
    },
    {
      title: '认定结果',
      field: 'affirmResult',
      filters: false,
      width: 140,
      sortable: false,
      align: 'center',
      name: '$vxeSelect',
      cellRender: {
        name: '$vxeSelect',
        options: [
          { value: '0', label: '未认定' }, { value: '1', label: '正常' },
          { value: '2', label: '违规' }
        ],
        props: {
          placeholder: '认定结果'
        }
      }
    },
    {
      title: '违规类型',
      filters: false,
      width: 140,
      field: 'warnType',
      sortable: false,
      align: 'center'
    },
    {
      title: '基本情况描述',
      filters: false,
      width: 140,
      field: 'matterDetail',
      sortable: false,
      align: 'center'
    },
    {
      title: '整改要求',
      filters: false,
      width: 140,
      field: 'rectifyAsk',
      sortable: false,
      align: 'center'
    },
    {
      title: '认定附件',
      filters: false,
      width: 140,
      sortable: false,
      align: 'center',
      field: 'gloableOptionRow1',
      className: 'gloableOptionRow1',
      cellRender: {
        name: '$payVoucherInputGloableOptionRow1',
        options: [],
        defaultValue: '',
        props: {}
      },
      name: '$payVoucherInputGloableOptionRow1'
    },
    {
      title: '退回金额',
      filters: false,
      width: 140,
      field: 'returnAmt',
      sortable: false,
      align: 'right',
      cellRender: { name: '$vxeMoney' }
    },
    {
      title: '调帐金额',
      filters: false,
      width: 140,
      field: 'transferAmt',
      sortable: false,
      align: 'right',
      cellRender: { name: '$vxeMoney' }
    },
    {
      title: '其他金额',
      filters: false,
      width: 140,
      field: 'otherAmt',
      sortable: false,
      align: 'right',
      cellRender: { name: '$vxeMoney' }
    },
    {
      title: '认定时间',
      filters: false,
      width: 140,
      field: 'affirmTime',
      sortable: false,
      align: 'center'
    },
    {
      title: '整改意见',
      filters: false,
      width: 140,
      field: 'rectifyDetail',
      sortable: false,
      align: 'center'
    },
    {
      title: '整改附件',
      filters: false,
      width: 140,
      sortable: false,
      align: 'center',
      field: 'gloableOptionRow',
      className: 'gloableOptionRow',
      cellRender: {
        name: '$payVoucherInputGloableOptionRow',
        options: [],
        defaultValue: '',
        props: {}
      },
      name: '$payVoucherInputGloableOptionRow'
    },
    {
      title: '整改时间',
      filters: false,
      width: 140,
      field: 'rectifyTime',
      sortable: false,
      align: 'center'
    }
  ],
  orangeDoneNum: [
    {
      title: '预警规则',
      field: 'fiRuleName',
      width: 140,
      align: 'center',
      filters: false
    },
    {
      title: '年度',
      field: 'fiscalYear',
      sortable: false,
      filters: false,
      width: 140,
      align: 'center'
    },
    {
      title: '区划名称',
      field: 'mofDivName',
      sortable: false,
      filters: false,
      width: 140,
      align: 'center'
    },
    {
      title: '单位名称',
      field: 'agencyName',
      sortable: false,
      filters: false,
      width: 140,
      align: 'center'
    },
    {
      title: '专项资金',
      field: 'speTypeName',
      sortable: false,
      filters: false,
      width: 140,
      align: 'center'
    },
    {
      title: '明细',
      field: 'detail',
      sortable: false,
      filters: false,
      width: 400,
      align: 'center'
    },
    {
      title: '预警结果',
      field: 'warnResult',
      sortable: false,
      filters: false,
      width: 140,
      align: 'center',
      cellRender: {
        name: '$vxeIcon3',
        props: {
          // 不显示数值
          showValue: false,
          $refs: this
        }
      }
    },
    {
      title: '预警时间',
      field: 'fiDate',
      filters: false,
      width: 140,
      sortable: false,
      align: 'center'
    },
    {
      title: '认定结果',
      field: 'affirmResult',
      filters: false,
      width: 140,
      sortable: false,
      align: 'center',
      name: '$vxeSelect',
      cellRender: {
        name: '$vxeSelect',
        options: [
          { value: '0', label: '未认定' }, { value: '1', label: '正常' },
          { value: '2', label: '违规' }
        ],
        props: {
          placeholder: '认定结果'
        }
      }
    },
    {
      title: '违规类型',
      filters: false,
      width: 140,
      field: 'warnType',
      sortable: false,
      align: 'center'
    },
    {
      title: '基本情况描述',
      filters: false,
      width: 140,
      field: 'matterDetail',
      sortable: false,
      align: 'center'
    },
    {
      title: '整改要求',
      filters: false,
      width: 140,
      field: 'rectifyAsk',
      sortable: false,
      align: 'center'
    },
    {
      title: '认定附件',
      filters: false,
      width: 140,
      sortable: false,
      align: 'center',
      field: 'gloableOptionRow1',
      className: 'gloableOptionRow1',
      cellRender: {
        name: '$payVoucherInputGloableOptionRow1',
        options: [],
        defaultValue: '',
        props: {}
      },
      name: '$payVoucherInputGloableOptionRow1'
    },
    {
      title: '退回金额',
      filters: false,
      width: 140,
      field: 'returnAmt',
      sortable: false,
      align: 'right',
      cellRender: { name: '$vxeMoney' }
    },
    {
      title: '调帐金额',
      filters: false,
      width: 140,
      field: 'transferAmt',
      sortable: false,
      align: 'right',
      cellRender: { name: '$vxeMoney' }
    },
    {
      title: '其他金额',
      filters: false,
      width: 140,
      field: 'otherAmt',
      sortable: false,
      align: 'right',
      cellRender: { name: '$vxeMoney' }
    },
    {
      title: '认定时间',
      filters: false,
      width: 140,
      field: 'affirmTime',
      sortable: false,
      align: 'center'
    },
    {
      title: '整改意见',
      filters: false,
      width: 140,
      field: 'rectifyDetail',
      sortable: false,
      align: 'center'
    },
    {
      title: '整改附件',
      filters: false,
      width: 140,
      sortable: false,
      align: 'center',
      field: 'gloableOptionRow',
      className: 'gloableOptionRow',
      cellRender: {
        name: '$payVoucherInputGloableOptionRow',
        options: [],
        defaultValue: '',
        props: {}
      },
      name: '$payVoucherInputGloableOptionRow'
    },
    {
      title: '整改时间',
      filters: false,
      width: 140,
      field: 'rectifyTime',
      sortable: false,
      align: 'center'
    }
  ],
  yellowUndoNum: [
    {
      title: '预警规则',
      field: 'fiRuleName',
      width: 140,
      align: 'center',
      filters: false
    },
    {
      title: '年度',
      field: 'fiscalYear',
      sortable: false,
      filters: false,
      width: 140,
      align: 'center'
    },
    {
      title: '区划名称',
      field: 'mofDivName',
      sortable: false,
      filters: false,
      width: 140,
      align: 'center'
    },
    {
      title: '单位名称',
      field: 'agencyName',
      sortable: false,
      filters: false,
      width: 140,
      align: 'center'
    },
    {
      title: '专项资金',
      field: 'speTypeName',
      sortable: false,
      filters: false,
      width: 140,
      align: 'center'
    },
    {
      title: '明细',
      field: 'detail',
      sortable: false,
      filters: false,
      width: 400,
      align: 'center'
    },
    {
      title: '预警结果',
      field: 'warnResult',
      sortable: false,
      filters: false,
      width: 140,
      align: 'center',
      cellRender: {
        name: '$vxeIcon2',
        props: {
          // 不显示数值
          showValue: false,
          $refs: this
        }
      }
    },
    {
      title: '预警时间',
      field: 'fiDate',
      filters: false,
      width: 140,
      sortable: false,
      align: 'center'
    },
    {
      title: '认定结果',
      field: 'affirmResult',
      filters: false,
      width: 140,
      sortable: false,
      align: 'center',
      name: '$vxeSelect',
      cellRender: {
        name: '$vxeSelect',
        options: [
          { value: '0', label: '未认定' }, { value: '1', label: '正常' },
          { value: '2', label: '违规' }
        ],
        props: {
          placeholder: '认定结果'
        }
      }
    },
    {
      title: '违规类型',
      filters: false,
      width: 140,
      field: 'warnType',
      sortable: false,
      align: 'center'
    },
    {
      title: '基本情况描述',
      filters: false,
      width: 140,
      field: 'matterDetail',
      sortable: false,
      align: 'center'
    },
    {
      title: '整改要求',
      filters: false,
      width: 140,
      field: 'rectifyAsk',
      sortable: false,
      align: 'center'
    },
    {
      title: '认定附件',
      filters: false,
      width: 140,
      sortable: false,
      align: 'center',
      field: 'gloableOptionRow1',
      className: 'gloableOptionRow1',
      cellRender: {
        name: '$payVoucherInputGloableOptionRow1',
        options: [],
        defaultValue: '',
        props: {}
      },
      name: '$payVoucherInputGloableOptionRow1'
    },
    {
      title: '退回金额',
      filters: false,
      width: 140,
      field: 'returnAmt',
      sortable: false,
      align: 'right',
      cellRender: { name: '$vxeMoney' }
    },
    {
      title: '调帐金额',
      filters: false,
      width: 140,
      field: 'transferAmt',
      sortable: false,
      align: 'right',
      cellRender: { name: '$vxeMoney' }
    },
    {
      title: '其他金额',
      filters: false,
      width: 140,
      field: 'otherAmt',
      sortable: false,
      align: 'right',
      cellRender: { name: '$vxeMoney' }
    },
    {
      title: '认定时间',
      filters: false,
      width: 140,
      field: 'affirmTime',
      sortable: false,
      align: 'center'
    },
    {
      title: '整改意见',
      filters: false,
      width: 140,
      field: 'rectifyDetail',
      sortable: false,
      align: 'center'
    },
    {
      title: '整改附件',
      filters: false,
      width: 140,
      sortable: false,
      align: 'center',
      field: 'gloableOptionRow',
      className: 'gloableOptionRow',
      cellRender: {
        name: '$payVoucherInputGloableOptionRow',
        options: [],
        defaultValue: '',
        props: {}
      },
      name: '$payVoucherInputGloableOptionRow'
    },
    {
      title: '整改时间',
      filters: false,
      width: 140,
      field: 'rectifyTime',
      sortable: false,
      align: 'center'
    }
  ],
  yellowDoneNum: [
    {
      title: '预警规则',
      field: 'fiRuleName',
      width: 140,
      align: 'center',
      filters: false
    },
    {
      title: '年度',
      field: 'fiscalYear',
      sortable: false,
      filters: false,
      width: 140,
      align: 'center'
    },
    {
      title: '区划名称',
      field: 'mofDivName',
      sortable: false,
      filters: false,
      width: 140,
      align: 'center'
    },
    {
      title: '单位名称',
      field: 'agencyName',
      sortable: false,
      filters: false,
      width: 140,
      align: 'center'
    },
    {
      title: '专项资金',
      field: 'speTypeName',
      sortable: false,
      filters: false,
      width: 140,
      align: 'center'
    },
    {
      title: '明细',
      field: 'detail',
      sortable: false,
      filters: false,
      width: 400,
      align: 'center'
    },
    {
      title: '预警结果',
      field: 'warnResult',
      sortable: false,
      filters: false,
      width: 140,
      align: 'center',
      cellRender: {
        name: '$vxeIcon3',
        props: {
          // 不显示数值
          showValue: false,
          $refs: this
        }
      }
    },
    {
      title: '预警时间',
      field: 'fiDate',
      filters: false,
      width: 140,
      sortable: false,
      align: 'center'
    },
    {
      title: '认定结果',
      field: 'affirmResult',
      filters: false,
      width: 140,
      sortable: false,
      align: 'center',
      name: '$vxeSelect',
      cellRender: {
        name: '$vxeSelect',
        options: [
          { value: '0', label: '未认定' }, { value: '1', label: '正常' },
          { value: '2', label: '违规' }
        ],
        props: {
          placeholder: '认定结果'
        }
      }
    },
    {
      title: '违规类型',
      filters: false,
      width: 140,
      field: 'warnType',
      sortable: false,
      align: 'center'
    },
    {
      title: '基本情况描述',
      filters: false,
      width: 140,
      field: 'matterDetail',
      sortable: false,
      align: 'center'
    },
    {
      title: '整改要求',
      filters: false,
      width: 140,
      field: 'rectifyAsk',
      sortable: false,
      align: 'center'
    },
    {
      title: '认定附件',
      filters: false,
      width: 140,
      sortable: false,
      align: 'center',
      field: 'gloableOptionRow1',
      className: 'gloableOptionRow1',
      cellRender: {
        name: '$payVoucherInputGloableOptionRow1',
        options: [],
        defaultValue: '',
        props: {}
      },
      name: '$payVoucherInputGloableOptionRow1'
    },
    {
      title: '退回金额',
      filters: false,
      width: 140,
      field: 'returnAmt',
      sortable: false,
      align: 'right',
      cellRender: { name: '$vxeMoney' }
    },
    {
      title: '调帐金额',
      filters: false,
      width: 140,
      field: 'transferAmt',
      sortable: false,
      align: 'right',
      cellRender: { name: '$vxeMoney' }
    },
    {
      title: '其他金额',
      filters: false,
      width: 140,
      field: 'otherAmt',
      sortable: false,
      align: 'right',
      cellRender: { name: '$vxeMoney' }
    },
    {
      title: '认定时间',
      filters: false,
      width: 140,
      field: 'affirmTime',
      sortable: false,
      align: 'center'
    },
    {
      title: '认定人',
      field: 'affirmPersomName',
      filters: false,
      width: 140,
      sortable: false,
      align: 'center'
    },
    {
      title: '整改意见',
      filters: false,
      width: 140,
      field: 'rectifyDetail',
      sortable: false,
      align: 'center'
    },
    {
      title: '整改附件',
      filters: false,
      width: 140,
      sortable: false,
      align: 'center',
      field: 'gloableOptionRow',
      className: 'gloableOptionRow',
      cellRender: {
        name: '$payVoucherInputGloableOptionRow',
        options: [],
        defaultValue: '',
        props: {}
      },
      name: '$payVoucherInputGloableOptionRow'
    },
    {
      title: '整改时间',
      filters: false,
      width: 140,
      field: 'rectifyTime',
      sortable: false,
      align: 'center'
    }
  ],
  yellowUndoNumw: [
    {
      title: '预警规则',
      field: 'fiRuleName',
      width: 140,
      align: 'center',
      filters: false
    },
    {
      title: '年度',
      field: 'fiscalYear',
      sortable: false,
      filters: false,
      width: 140,
      align: 'center'
    },
    {
      title: '区划名称',
      field: 'mofDivName',
      sortable: false,
      filters: false,
      width: 140,
      align: 'center'
    },
    {
      title: '单位名称',
      field: 'agencyName',
      sortable: false,
      filters: false,
      width: 140,
      align: 'center'
    },
    {
      title: '专项资金',
      field: 'speTypeName',
      sortable: false,
      filters: false,
      width: 140,
      align: 'center'
    },
    {
      title: '明细',
      field: 'detail',
      sortable: false,
      filters: false,
      width: 400,
      align: 'center'
    },
    {
      title: '预警结果',
      field: 'warnResult',
      sortable: false,
      filters: false,
      width: 140,
      align: 'center',
      cellRender: {
        name: '$vxeIcon1',
        props: {
          // 不显示数值
          showValue: false,
          $refs: this
        }
      }
    },
    {
      title: '预警时间',
      field: 'fiDate',
      filters: false,
      width: 140,
      sortable: false,
      align: 'center'
    },
    {
      title: '认定结果',
      field: 'affirmResult',
      filters: false,
      width: 140,
      sortable: false,
      align: 'center',
      name: '$vxeSelect',
      cellRender: {
        name: '$vxeSelect',
        options: [
          { value: '0', label: '未认定' }, { value: '1', label: '正常' },
          { value: '2', label: '违规' }
        ],
        props: {
          placeholder: '认定结果'
        }
      }
    },
    {
      title: '认定人',
      field: 'affirmPersomName',
      filters: false,
      width: 140,
      sortable: false,
      align: 'center'
    },
    {
      title: '违规类型',
      filters: false,
      width: 140,
      field: 'warnType',
      sortable: false,
      align: 'center'
    },
    {
      title: '基本情况描述',
      filters: false,
      width: 140,
      field: 'matterDetail',
      sortable: false,
      align: 'center'
    },
    {
      title: '整改要求',
      filters: false,
      width: 140,
      field: 'rectifyAsk',
      sortable: false,
      align: 'center'
    },
    {
      title: '认定附件',
      filters: false,
      width: 140,
      sortable: false,
      align: 'center',
      field: 'gloableOptionRow1',
      className: 'gloableOptionRow1',
      cellRender: {
        name: '$payVoucherInputGloableOptionRow1',
        options: [],
        defaultValue: '',
        props: {}
      },
      name: '$payVoucherInputGloableOptionRow1'
    },
    {
      title: '退回金额',
      filters: false,
      width: 140,
      field: 'returnAmt',
      sortable: false,
      align: 'right',
      cellRender: { name: '$vxeMoney' }
    },
    {
      title: '调帐金额',
      filters: false,
      width: 140,
      field: 'transferAmt',
      sortable: false,
      align: 'right',
      cellRender: { name: '$vxeMoney' }
    },
    {
      title: '其他金额',
      filters: false,
      width: 140,
      field: 'otherAmt',
      sortable: false,
      align: 'right',
      cellRender: { name: '$vxeMoney' }
    },
    {
      title: '认定时间',
      filters: false,
      width: 140,
      field: 'affirmTime',
      sortable: false,
      align: 'center'
    },
    {
      title: '整改意见',
      filters: false,
      width: 140,
      field: 'rectifyDetail',
      sortable: false,
      align: 'center'
    },
    {
      title: '整改附件',
      filters: false,
      width: 140,
      sortable: false,
      align: 'center',
      field: 'gloableOptionRow',
      className: 'gloableOptionRow',
      cellRender: {
        name: '$payVoucherInputGloableOptionRow',
        options: [],
        defaultValue: '',
        props: {}
      },
      name: '$payVoucherInputGloableOptionRow'
    },
    {
      title: '整改时间',
      filters: false,
      width: 140,
      field: 'rectifyTime',
      sortable: false,
      align: 'center'
    }
  ],
  yellowDoneNumw: [
    {
      title: '预警规则',
      field: 'fiRuleName',
      width: 140,
      align: 'center',
      filters: false
    },
    {
      title: '年度',
      field: 'fiscalYear',
      sortable: false,
      filters: false,
      width: 140,
      align: 'center'
    },
    {
      title: '区划名称',
      field: 'mofDivName',
      sortable: false,
      filters: false,
      width: 140,
      align: 'center'
    },
    {
      title: '单位名称',
      field: 'agencyName',
      sortable: false,
      filters: false,
      width: 140,
      align: 'center'
    },
    {
      title: '专项资金',
      field: 'speTypeName',
      sortable: false,
      filters: false,
      width: 140,
      align: 'center'
    },
    {
      title: '明细',
      field: 'detail',
      sortable: false,
      filters: false,
      width: 400,
      align: 'center'
    },
    {
      title: '预警结果',
      field: 'warnResult',
      sortable: false,
      filters: false,
      width: 140,
      align: 'center',
      cellRender: {
        name: '$vxeIcon3',
        props: {
          // 不显示数值
          showValue: false,
          $refs: this
        }
      }
    },
    {
      title: '预警时间',
      field: 'fiDate',
      filters: false,
      width: 140,
      sortable: false,
      align: 'center'
    },
    {
      title: '认定结果',
      field: 'affirmResult',
      filters: false,
      width: 140,
      sortable: false,
      align: 'center',
      name: '$vxeSelect',
      cellRender: {
        name: '$vxeSelect',
        options: [
          { value: '0', label: '未认定' }, { value: '1', label: '正常' },
          { value: '2', label: '违规' }
        ],
        props: {
          placeholder: '认定结果'
        }
      }
    },
    {
      title: '认定人',
      field: 'affirmPersomName',
      filters: false,
      width: 140,
      sortable: false,
      align: 'center'
    },
    {
      title: '违规类型',
      filters: false,
      width: 140,
      field: 'warnType',
      sortable: false,
      align: 'center'
    },
    {
      title: '基本情况描述',
      filters: false,
      width: 140,
      field: 'matterDetail',
      sortable: false,
      align: 'center'
    },
    {
      title: '整改要求',
      filters: false,
      width: 140,
      field: 'rectifyAsk',
      sortable: false,
      align: 'center'
    },
    {
      title: '认定附件',
      filters: false,
      width: 140,
      sortable: false,
      align: 'center',
      field: 'gloableOptionRow1',
      className: 'gloableOptionRow1',
      cellRender: {
        name: '$payVoucherInputGloableOptionRow1',
        options: [],
        defaultValue: '',
        props: {}
      },
      name: '$payVoucherInputGloableOptionRow1'
    },
    {
      title: '退回金额',
      filters: false,
      width: 140,
      field: 'returnAmt',
      sortable: false,
      align: 'right',
      cellRender: { name: '$vxeMoney' }
    },
    {
      title: '调帐金额',
      filters: false,
      width: 140,
      field: 'transferAmt',
      sortable: false,
      align: 'right',
      cellRender: { name: '$vxeMoney' }
    },
    {
      title: '其他金额',
      filters: false,
      width: 140,
      field: 'otherAmt',
      sortable: false,
      align: 'right',
      cellRender: { name: '$vxeMoney' }
    },
    {
      title: '认定时间',
      filters: false,
      width: 140,
      field: 'affirmTime',
      sortable: false,
      align: 'center'
    },
    {
      title: '整改意见',
      filters: false,
      width: 140,
      field: 'rectifyDetail',
      sortable: false,
      align: 'center'
    },
    {
      title: '整改附件',
      filters: false,
      width: 140,
      sortable: false,
      align: 'center',
      field: 'gloableOptionRow',
      className: 'gloableOptionRow',
      cellRender: {
        name: '$payVoucherInputGloableOptionRow',
        options: [],
        defaultValue: '',
        props: {}
      },
      name: '$payVoucherInputGloableOptionRow'
    },
    {
      title: '整改时间',
      filters: false,
      width: 140,
      field: 'rectifyTime',
      sortable: false,
      align: 'center'
    }
  ],
  blueUndoNum: [
    {
      title: '预警规则',
      field: 'fiRuleName',
      width: 140,
      align: 'center',
      filters: false
    },
    {
      title: '年度',
      field: 'fiscalYear',
      sortable: false,
      filters: false,
      width: 140,
      align: 'center'
    },
    {
      title: '区划名称',
      field: 'mofDivName',
      sortable: false,
      filters: false,
      width: 140,
      align: 'center'
    },
    {
      title: '单位名称',
      field: 'agencyName',
      sortable: false,
      filters: false,
      width: 140,
      align: 'center'
    },
    {
      title: '专项资金',
      field: 'speTypeName',
      sortable: false,
      filters: false,
      width: 140,
      align: 'center'
    },
    {
      title: '明细',
      field: 'detail',
      sortable: false,
      filters: false,
      width: 400,
      align: 'center'
    },
    {
      title: '预警结果',
      field: 'warnResult',
      sortable: false,
      filters: false,
      width: 140,
      align: 'center',
      cellRender: {
        name: '$vxeIcon7',
        props: {
          // 不显示数值
          showValue: false,
          $refs: this
        }
      }
    },
    {
      title: '预警时间',
      field: 'fiDate',
      filters: false,
      width: 140,
      sortable: false,
      align: 'center'
    },
    {
      title: '认定结果',
      field: 'affirmResult',
      filters: false,
      width: 140,
      sortable: false,
      align: 'center',
      name: '$vxeSelect',
      cellRender: {
        name: '$vxeSelect',
        options: [
          { value: '0', label: '未认定' }, { value: '1', label: '正常' },
          { value: '2', label: '违规' }
        ],
        props: {
          placeholder: '认定结果'
        }
      }
    },
    {
      title: '违规类型',
      filters: false,
      width: 140,
      field: 'warnType',
      sortable: false,
      align: 'center'
    },
    {
      title: '基本情况描述',
      filters: false,
      width: 140,
      field: 'matterDetail',
      sortable: false,
      align: 'center'
    },
    {
      title: '整改要求',
      filters: false,
      width: 140,
      field: 'rectifyAsk',
      sortable: false,
      align: 'center'
    },
    {
      title: '认定附件',
      filters: false,
      width: 140,
      sortable: false,
      align: 'center',
      field: 'gloableOptionRow1',
      className: 'gloableOptionRow1',
      cellRender: {
        name: '$payVoucherInputGloableOptionRow1',
        options: [],
        defaultValue: '',
        props: {}
      },
      name: '$payVoucherInputGloableOptionRow1'
    },
    {
      title: '退回金额',
      filters: false,
      width: 140,
      field: 'returnAmt',
      sortable: false,
      align: 'right',
      cellRender: { name: '$vxeMoney' }
    },
    {
      title: '调帐金额',
      filters: false,
      width: 140,
      field: 'transferAmt',
      sortable: false,
      align: 'right',
      cellRender: { name: '$vxeMoney' }
    },
    {
      title: '其他金额',
      filters: false,
      width: 140,
      field: 'otherAmt',
      sortable: false,
      align: 'right',
      cellRender: { name: '$vxeMoney' }
    },
    {
      title: '认定时间',
      filters: false,
      width: 140,
      field: 'affirmTime',
      sortable: false,
      align: 'center'
    },
    {
      title: '整改意见',
      filters: false,
      width: 140,
      field: 'rectifyDetail',
      sortable: false,
      align: 'center'
    },
    {
      title: '整改附件',
      filters: false,
      width: 140,
      sortable: false,
      align: 'center',
      field: 'gloableOptionRow',
      className: 'gloableOptionRow',
      cellRender: {
        name: '$payVoucherInputGloableOptionRow',
        options: [],
        defaultValue: '',
        props: {}
      },
      name: '$payVoucherInputGloableOptionRow'
    },
    {
      title: '整改时间',
      filters: false,
      width: 140,
      field: 'rectifyTime',
      sortable: false,
      align: 'center'
    }
  ],
  blueDoneNum: [
    {
      title: '预警规则',
      field: 'fiRuleName',
      width: 140,
      align: 'center',
      filters: false
    },
    {
      title: '年度',
      field: 'fiscalYear',
      sortable: false,
      filters: false,
      width: 140,
      align: 'center'
    },
    {
      title: '区划名称',
      field: 'mofDivName',
      sortable: false,
      filters: false,
      width: 140,
      align: 'center'
    },
    {
      title: '单位名称',
      field: 'agencyName',
      sortable: false,
      filters: false,
      width: 140,
      align: 'center'
    },
    {
      title: '专项资金',
      field: 'speTypeName',
      sortable: false,
      filters: false,
      width: 140,
      align: 'center'
    },
    {
      title: '明细',
      field: 'detail',
      sortable: false,
      filters: false,
      width: 400,
      align: 'center'
    },
    {
      title: '预警结果',
      field: 'warnResult',
      sortable: false,
      filters: false,
      width: 140,
      align: 'center',
      cellRender: {
        name: '$vxeIcon3',
        props: {
          // 不显示数值
          showValue: false,
          $refs: this
        }
      }
    },
    {
      title: '预警时间',
      field: 'fiDate',
      filters: false,
      width: 140,
      sortable: false,
      align: 'center'
    },
    {
      title: '认定结果',
      field: 'affirmResult',
      filters: false,
      width: 140,
      sortable: false,
      align: 'center',
      name: '$vxeSelect',
      cellRender: {
        name: '$vxeSelect',
        options: [
          { value: '0', label: '未认定' }, { value: '1', label: '正常' },
          { value: '2', label: '违规' }
        ],
        props: {
          placeholder: '认定结果'
        }
      }
    },
    {
      title: '认定人',
      field: 'affirmPersomName',
      filters: false,
      width: 140,
      sortable: false,
      align: 'center'
    },
    {
      title: '违规类型',
      filters: false,
      width: 140,
      field: 'warnType',
      sortable: false,
      align: 'center'
    },
    {
      title: '基本情况描述',
      filters: false,
      width: 140,
      field: 'matterDetail',
      sortable: false,
      align: 'center'
    },
    {
      title: '整改要求',
      filters: false,
      width: 140,
      field: 'rectifyAsk',
      sortable: false,
      align: 'center'
    },
    {
      title: '认定附件',
      filters: false,
      width: 140,
      sortable: false,
      align: 'center',
      field: 'gloableOptionRow1',
      className: 'gloableOptionRow1',
      cellRender: {
        name: '$payVoucherInputGloableOptionRow1',
        options: [],
        defaultValue: '',
        props: {}
      },
      name: '$payVoucherInputGloableOptionRow1'
    },
    {
      title: '退回金额',
      filters: false,
      width: 140,
      field: 'returnAmt',
      sortable: false,
      align: 'right',
      cellRender: { name: '$vxeMoney' }
    },
    {
      title: '调帐金额',
      filters: false,
      width: 140,
      field: 'transferAmt',
      sortable: false,
      align: 'right',
      cellRender: { name: '$vxeMoney' }
    },
    {
      title: '其他金额',
      filters: false,
      width: 140,
      field: 'otherAmt',
      sortable: false,
      align: 'right',
      cellRender: { name: '$vxeMoney' }
    },
    {
      title: '认定时间',
      filters: false,
      width: 140,
      field: 'affirmTime',
      sortable: false,
      align: 'center'
    },
    {
      title: '整改意见',
      filters: false,
      width: 140,
      field: 'rectifyDetail',
      sortable: false,
      align: 'center'
    },
    {
      title: '整改附件',
      filters: false,
      width: 140,
      sortable: false,
      align: 'center',
      field: 'gloableOptionRow',
      className: 'gloableOptionRow',
      cellRender: {
        name: '$payVoucherInputGloableOptionRow',
        options: [],
        defaultValue: '',
        props: {}
      },
      name: '$payVoucherInputGloableOptionRow'
    },
    {
      title: '整改时间',
      filters: false,
      width: 140,
      field: 'rectifyTime',
      sortable: false,
      align: 'center'
    }
  ],
  blueUndoNumw: [
    {
      title: '预警规则',
      field: 'fiRuleName',
      width: 140,
      align: 'center',
      filters: false
    },
    {
      title: '年度',
      field: 'fiscalYear',
      sortable: false,
      filters: false,
      width: 140,
      align: 'center'
    },
    {
      title: '区划名称',
      field: 'mofDivName',
      sortable: false,
      filters: false,
      width: 140,
      align: 'center'
    },
    {
      title: '单位名称',
      field: 'agencyName',
      sortable: false,
      filters: false,
      width: 140,
      align: 'center'
    },
    {
      title: '专项资金',
      field: 'speTypeName',
      sortable: false,
      filters: false,
      width: 140,
      align: 'center'
    },
    {
      title: '明细',
      field: 'detail',
      sortable: false,
      filters: false,
      width: 400,
      align: 'center'
    },
    {
      title: '预警结果',
      field: 'warnResult',
      sortable: false,
      filters: false,
      width: 140,
      align: 'center',
      cellRender: {
        name: '$vxeIcon1',
        props: {
          // 不显示数值
          showValue: false,
          $refs: this
        }
      }
    },
    {
      title: '预警时间',
      field: 'fiDate',
      filters: false,
      width: 140,
      sortable: false,
      align: 'center'
    },
    {
      title: '认定结果',
      field: 'affirmResult',
      filters: false,
      width: 140,
      sortable: false,
      align: 'center',
      name: '$vxeSelect',
      cellRender: {
        name: '$vxeSelect',
        options: [
          { value: '0', label: '未认定' }, { value: '1', label: '正常' },
          { value: '2', label: '违规' }
        ],
        props: {
          placeholder: '认定结果'
        }
      }
    },
    {
      title: '认定人',
      field: 'affirmPersomName',
      filters: false,
      width: 140,
      sortable: false,
      align: 'center'
    },
    {
      title: '违规类型',
      filters: false,
      width: 140,
      field: 'warnType',
      sortable: false,
      align: 'center'
    },
    {
      title: '基本情况描述',
      filters: false,
      width: 140,
      field: 'matterDetail',
      sortable: false,
      align: 'center'
    },
    {
      title: '整改要求',
      filters: false,
      width: 140,
      field: 'rectifyAsk',
      sortable: false,
      align: 'center'
    },
    {
      title: '认定附件',
      filters: false,
      width: 140,
      sortable: false,
      align: 'center',
      field: 'gloableOptionRow1',
      className: 'gloableOptionRow1',
      cellRender: {
        name: '$payVoucherInputGloableOptionRow1',
        options: [],
        defaultValue: '',
        props: {}
      },
      name: '$payVoucherInputGloableOptionRow1'
    },
    {
      title: '退回金额',
      filters: false,
      width: 140,
      field: 'returnAmt',
      sortable: false,
      align: 'right',
      cellRender: { name: '$vxeMoney' }
    },
    {
      title: '调帐金额',
      filters: false,
      width: 140,
      field: 'transferAmt',
      sortable: false,
      align: 'right',
      cellRender: { name: '$vxeMoney' }
    },
    {
      title: '其他金额',
      filters: false,
      width: 140,
      field: 'otherAmt',
      sortable: false,
      align: 'right',
      cellRender: { name: '$vxeMoney' }
    },
    {
      title: '认定时间',
      filters: false,
      width: 140,
      field: 'affirmTime',
      sortable: false,
      align: 'center'
    },
    {
      title: '整改意见',
      filters: false,
      width: 140,
      field: 'rectifyDetail',
      sortable: false,
      align: 'center'
    },
    {
      title: '整改附件',
      filters: false,
      width: 140,
      sortable: false,
      align: 'center',
      field: 'gloableOptionRow',
      className: 'gloableOptionRow',
      cellRender: {
        name: '$payVoucherInputGloableOptionRow',
        options: [],
        defaultValue: '',
        props: {}
      },
      name: '$payVoucherInputGloableOptionRow'
    },
    {
      title: '整改时间',
      filters: false,
      width: 140,
      field: 'rectifyTime',
      sortable: false,
      align: 'center'
    }
  ],
  blueDoneNumw: [
    {
      title: '预警规则',
      field: 'fiRuleName',
      width: 140,
      align: 'center',
      filters: false
    },
    {
      title: '年度',
      field: 'fiscalYear',
      sortable: false,
      filters: false,
      width: 140,
      align: 'center'
    },
    {
      title: '区划名称',
      field: 'mofDivName',
      sortable: false,
      filters: false,
      width: 140,
      align: 'center'
    },
    {
      title: '单位名称',
      field: 'agencyName',
      sortable: false,
      filters: false,
      width: 140,
      align: 'center'
    },
    {
      title: '专项资金',
      field: 'speTypeName',
      sortable: false,
      filters: false,
      width: 140,
      align: 'center'
    },
    {
      title: '明细',
      field: 'detail',
      sortable: false,
      filters: false,
      width: 400,
      align: 'center'
    },
    {
      title: '预警结果',
      field: 'warnResult',
      sortable: false,
      filters: false,
      width: 140,
      align: 'center',
      cellRender: {
        name: '$vxeIcon3',
        props: {
          // 不显示数值
          showValue: false,
          $refs: this
        }
      }
    },
    {
      title: '预警时间',
      field: 'fiDate',
      filters: false,
      width: 140,
      sortable: false,
      align: 'center'
    },
    {
      title: '认定结果',
      field: 'affirmResult',
      filters: false,
      width: 140,
      sortable: false,
      align: 'center',
      name: '$vxeSelect',
      cellRender: {
        name: '$vxeSelect',
        options: [
          { value: '0', label: '未认定' }, { value: '1', label: '正常' },
          { value: '2', label: '违规' }
        ],
        props: {
          placeholder: '认定结果'
        }
      }
    },
    {
      title: '认定人',
      field: 'affirmPersomName',
      filters: false,
      width: 140,
      sortable: false,
      align: 'center'
    },
    {
      title: '违规类型',
      filters: false,
      width: 140,
      field: 'warnType',
      sortable: false,
      align: 'center'
    },
    {
      title: '基本情况描述',
      filters: false,
      width: 140,
      field: 'matterDetail',
      sortable: false,
      align: 'center'
    },
    {
      title: '整改要求',
      filters: false,
      width: 140,
      field: 'rectifyAsk',
      sortable: false,
      align: 'center'
    },
    {
      title: '认定附件',
      filters: false,
      width: 140,
      sortable: false,
      align: 'center',
      field: 'gloableOptionRow1',
      className: 'gloableOptionRow1',
      cellRender: {
        name: '$payVoucherInputGloableOptionRow1',
        options: [],
        defaultValue: '',
        props: {}
      },
      name: '$payVoucherInputGloableOptionRow1'
    },
    {
      title: '退回金额',
      filters: false,
      width: 140,
      field: 'returnAmt',
      sortable: false,
      align: 'right',
      cellRender: { name: '$vxeMoney' }
    },
    {
      title: '调帐金额',
      filters: false,
      width: 140,
      field: 'transferAmt',
      sortable: false,
      align: 'right',
      cellRender: { name: '$vxeMoney' }
    },
    {
      title: '其他金额',
      filters: false,
      width: 140,
      field: 'otherAmt',
      sortable: false,
      align: 'right',
      cellRender: { name: '$vxeMoney' }
    },
    {
      title: '认定时间',
      filters: false,
      width: 140,
      field: 'affirmTime',
      sortable: false,
      align: 'center'
    },
    {
      title: '整改意见',
      filters: false,
      width: 140,
      field: 'rectifyDetail',
      sortable: false,
      align: 'center'
    },
    {
      title: '整改附件',
      filters: false,
      width: 140,
      sortable: false,
      align: 'center',
      field: 'gloableOptionRow',
      className: 'gloableOptionRow',
      cellRender: {
        name: '$payVoucherInputGloableOptionRow',
        options: [],
        defaultValue: '',
        props: {}
      },
      name: '$payVoucherInputGloableOptionRow'
    },
    {
      title: '整改时间',
      filters: false,
      width: 140,
      field: 'rectifyTime',
      sortable: false,
      align: 'center'
    }
  ]
}
const statusButtons = [
  {
    code: '1',
    label: '待整改',
    iconName: 'base-all.png',
    iconNameActive: 'base-all-active.png',
    type: 'button',
    curValue: '1'
  },
  {
    code: '2',
    label: '已整改',
    iconName: 'base-all.png',
    iconNameActive: 'base-all-active.png',
    type: 'button',
    curValue: '2'
  }
]
const statusButtons0 = [
  {
    code: '9',
    label: '待整改',
    iconName: 'base-all.png',
    iconNameActive: 'base-all-active.png',
    type: 'button',
    curValue: '9'
  },
  {
    code: '10',
    label: '已整改',
    iconName: 'base-all.png',
    iconNameActive: 'base-all-active.png',
    type: 'button',
    curValue: '10'
  }
]
const statusButtons1 = [
  {
    code: '5',
    label: '待认定',
    iconName: 'base-all.png',
    iconNameActive: 'base-all-active.png',
    type: 'button',
    curValue: '5'
  },
  {
    code: '6',
    label: '已认定',
    iconName: 'base-all.png',
    iconNameActive: 'base-all-active.png',
    type: 'button',
    curValue: '6'
  },
  {
    code: '7',
    label: '待整改',
    iconName: 'base-all.png',
    iconNameActive: 'base-all-active.png',
    type: 'button',
    curValue: '7'
  },
  {
    code: '8',
    label: '已整改',
    iconName: 'base-all.png',
    iconNameActive: 'base-all-active.png',
    type: 'button',
    curValue: '8'
  }
]
const statusButtons3 = [
  {
    code: '9',
    label: '待认定',
    iconName: 'base-all.png',
    iconNameActive: 'base-all-active.png',
    type: 'button',
    curValue: '9'
  },
  {
    code: '10',
    label: '已认定',
    iconName: 'base-all.png',
    iconNameActive: 'base-all-active.png',
    type: 'button',
    curValue: '10'
  },
  {
    code: '11',
    label: '待整改',
    iconName: 'base-all.png',
    iconNameActive: 'base-all-active.png',
    type: 'button',
    curValue: '11'
  },
  {
    code: '12',
    label: '已整改',
    iconName: 'base-all.png',
    iconNameActive: 'base-all-active.png',
    type: 'button',
    curValue: '12'
  }
]
const statusButtons2 = [
  {
    code: '7',
    label: '全部',
    iconName: 'base-all.png',
    iconNameActive: 'base-all-active.png',
    type: 'button',
    curValue: '7'
  }
]
const curStatusButton = {
  label: '待整改',
  code: '1',
  type: 'button',
  curValue: '1'
}
const curStatusButton0 = {
}
const curStatusButton1 = {
  label: '已整改',
  code: '2',
  type: 'button',
  curValue: '2'
}
const curStatusButton3 = {
  label: '待整改',
  code: '5',
  type: 'button',
  curValue: '5'
}
const curStatusButton4 = {
  label: '已整改',
  code: '6',
  type: 'button',
  curValue: '6'
}
const curStatusButton5 = {
  label: '待整改',
  code: '7',
  type: 'button',
  curValue: '7'
}
const curStatusButton6 = {
  label: '已整改',
  code: '8',
  type: 'button',
  curValue: '8'
}
const curStatusButton7 = {
  label: '全部',
  code: '7',
  type: 'button',
  curValue: '7'
}
const curStatusButton8 = {
  label: '待认定',
  code: '5',
  type: 'button',
  curValue: '5'
}
const curStatusButton9 = {
  label: '已认定',
  code: '6',
  type: 'button',
  curValue: '6'
}
const curStatusButton10 = {
  label: '待整改',
  code: '9',
  type: 'button',
  curValue: '9'
}
const curStatusButton11 = {
  label: '已整改',
  code: '10',
  type: 'button',
  curValue: '10'
}
const curStatusButton12 = {
  label: '待认定',
  code: '9',
  type: 'button',
  curValue: '9'
}
const curStatusButton13 = {
  label: '已认定',
  code: '10',
  type: 'button',
  curValue: '10'
}
const curStatusButton14 = {
  label: '待整改',
  code: '11',
  type: 'button',
  curValue: '11'
}
const curStatusButton15 = {
  label: '已整改',
  code: '12',
  type: 'button',
  curValue: '12'
}
const buttons1 = {
  1: [
    {
      label: '整改意见',
      code: 'rectify_ask',
      status: 'primary'
    }
  ],
  2: [
    {
      label: '意见修改',
      code: 'rectify_ask_update',
      status: 'primary'
    }
  ],
  3: [
    {
      label: '整改意见',
      code: 'rectify_ask',
      status: 'primary'
    }
  ],
  4: [
    {
      label: '意见修改',
      code: 'rectify_ask_update',
      status: 'primary'
    }
  ],
  5: [
    {
      label: '人工认定',
      code: 'peo_set',
      status: 'primary'
    }
  ],
  6: [
    {
      label: '认定修改',
      code: 'peo_set_update',
      status: 'primary'
    }
  ],
  7: [
    {
      label: '整改意见',
      code: 'rectify_ask',
      status: 'primary'
    }
  ],
  8: [
    {
      label: '意见修改',
      code: 'rectify_ask_update',
      status: 'primary'
    }
  ],
  9: [
    {
      label: '整改意见',
      code: 'rectify_ask',
      status: 'primary'
    }
  ],
  10: [
    {
      label: '意见修改',
      code: 'rectify_ask_update',
      status: 'primary'
    }
  ]
}
const buttons2 = {
  1: [
  ],
  2: [
  ],
  3: [
  ],
  4: [
  ],
  5: [
  ],
  6: [
  ],
  7: [
  ],
  8: [
  ],
  9: [
  ],
  10: [
  ],
  11: [
  ],
  12: [
  ]
}
export default proconf
export {
  statusButtons,
  statusButtons0,
  curStatusButton,
  buttons1,
  curStatusButton0,
  curStatusButton1,
  statusButtons1,
  curStatusButton3,
  curStatusButton4,
  curStatusButton5,
  curStatusButton6,
  curStatusButton8,
  curStatusButton9,
  curStatusButton10,
  curStatusButton11,
  curStatusButton12,
  curStatusButton13,
  curStatusButton14,
  curStatusButton15,
  buttons2,
  statusButtons3,
  curStatusButton7,
  statusButtons2
}
