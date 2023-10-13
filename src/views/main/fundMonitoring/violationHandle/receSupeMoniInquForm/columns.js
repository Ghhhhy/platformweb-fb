import Vue from 'vue'
const h = new Vue().$createElement
const warningLevelColor = {
  1: {
    warningLabel: '黄色预警',
    color: '#FFD43C',
    colorStyle: 'color: #FFD43C;'
  },
  2: {
    warningLabel: '橙色预警',
    color: '#FF6F20',
    colorStyle: 'color:#FF6F20;'
  },
  3: {
    warningLabel: '红色预警',
    color: '#ff0000',
    colorStyle: 'color: #ff0000;'
  },
  4: {
    warningLabel: '灰色预警',
    color: '#F1F1F1',
    colorStyle: 'color: #F1F1F1;'
  },
  5: {
    warningLabel: '蓝色预警',
    color: '#0000ff',
    colorStyle: 'color:blue;'
  }
}
console.log('h', h)
export const tableColumns = [
  {
    title: '问询单编码',
    width: 180,
    field: 'dealNo',
    sortable: false,
    filters: false,
    align: 'center'
  },
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
    cellRender: {
      name: '$vxeInput',
      options: [],
      defaultValue: '',
      props: {
        format: '{mofDivCode}-{mofDivName}'
      }
    },
    props: {
      format: '{mofDivCode}-{mofDivName}'
    }
  },
  {
    title: '预算单位',
    width: 180,
    field: 'agencyName',
    sortable: false,
    filters: false,
    align: 'center',
    cellRender: {
      name: '$vxeInput',
      options: [],
      defaultValue: '',
      props: {
        format: '{agencyCode}-{agencyName}'
      }
    },
    props: {
      format: '{agencyCode}-{agencyName}'
    }
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
    width: 100,
    field: 'warnLevel',
    sortable: false,
    filters: false,
    align: 'center',
    cellRender: {
      name: '$warningLevel',
      props: {}
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
    title: '违规详情',
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
    title: '市级监控部门整改意见',
    field: 'information4',
    align: 'center',
    sortable: false,
    filters: false,
    width: 180
  },
  {
    title: '市级监控部门处理人',
    field: 'handler4',
    align: 'center',
    sortable: false,
    filters: false,
    width: 180
  },
  {
    title: '市级监控部门处理时间',
    field: 'updateTime4',
    align: 'center',
    sortable: false,
    filters: false,
    width: 180
  },
  {
    title: '市级监控部门附件',
    field: 'attachmentid5',
    align: 'center',
    sortable: false,
    filters: false,
    width: 180,
    cellRender: {
      name: '$payVoucherInputGloableOptionRow'
    }
  }, {
    title: '县级监控部门整改意见',
    field: 'information5',
    align: 'center',
    sortable: false,
    filters: false,
    width: 180
  }, {
    title: '县级监控部门处理人',
    field: 'handler5',
    align: 'center',
    sortable: false,
    filters: false,
    width: 180
  }, {
    title: '县级监控部门处理时间',
    field: 'updateTime5',
    align: 'center',
    sortable: false,
    filters: false,
    width: 180
  }, {
    title: '县级监控部门附件',
    field: 'attachmentid6',
    align: 'center',
    sortable: false,
    filters: false,
    width: 180,
    cellRender: {
      name: '$payVoucherInputGloableOptionRow'
    }
  }
]
export const queryColumns = [
  {
    title: '问询单编码',
    width: 180,
    field: 'dealNo',
    formula: '',
    align: 'left',
    name: '$vxeInput',
    itemRender: {
      name: '$vxeInput',
      options: [],
      props: {
        placeholder: '问询单编码'
      }
    }
  },
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
    title: '违规类型',
    width: 180,
    field: 'violateType',
    formula: '',
    align: 'left',
    name: '$vxeInput',
    itemRender: {
      name: '$vxeInput',
      options: [],
      props: {
        placeholder: '违规类型'
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
    title: '违规时间范围-开始',
    field: 'warnStartTime',
    width: 200,
    align: 'center',
    filters: false,
    itemRender: {
      name: '$vxeTime',
      props: {
        format: 'YYYY-MM-DD', // "当前日期为：YYYY-MM-DD，星期W，为第Q季度，时间为：hh:mm:ss:c"
        type: 'date',
        placeholder: '违规时间-开始'
      }
    }
  },
  {
    title: '违规时间范围-结束',
    field: 'warnTime',
    width: 200,
    align: 'center',
    filters: false,
    itemRender: {
      name: '$vxeTime',
      props: {
        format: 'YYYY-MM-DD', // "当前日期为：YYYY-MM-DD，星期W，为第Q季度，时间为：hh:mm:ss:c"
        type: 'date',
        placeholder: '违规时间-结束'
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
        { value: '5', label: '蓝色预警' }
      ],
      props: {
        placeholder: '预警级别'
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
]
export const tabButtonColumns = [
  {
    type: 'button',
    label: '待接收',
    code: '0',
    iconName: 'base-daiban.png',
    iconNameActive: 'base-daiban-active.png'
  },
  {
    type: 'button',
    label: '已接收',
    code: '1',
    iconName: 'base-yiban.png',
    iconNameActive: 'base-yiban-active.png'
  }
]
export const suspectedViolationFormItem = (ctx) => [
  {
    field: 'violateType',
    title: '违规类型',
    span: 8,
    itemRender: {
      name: '$select',
      props: { disabled: true, placeholder: '违规类型' },
      options: []
    }
  },
  {
    field: 'fiRuleName',
    title: '监控规则',
    span: 8,
    itemRender: {
      name: '$input',
      props: { placeholder: '监控规则', disabled: true }
    }
  },
  {
    title: '预警级别',
    field: 'warnLevel',
    align: 'center',
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
          value: '5',
          label: '蓝色预警'
        },
        {
          value: '4',
          label: '灰色预警'
        }
      ],
      defaultValue: ''
    },
    name: '$select'
  },
  {
    title: '处理方式',
    field: 'handleType',
    align: 'center',
    span: 8,
    itemRender: {
      name: '$select',
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
          label: '禁止'
        },
        {
          value: '5',
          label: '记录'
        }
      ],
      defaultValue: '',
      props: { disabled: true, placeholder: '处理方式' }
    },
    name: '$vxeSelect'
  },
  {
    title: '区划',
    field: 'mofDivCode',
    span: 8,
    itemRender: {
      name: '$input',
      props: { disabled: true, placeholder: '区划' }
    }
  },
  {
    title: '疑似违规说明',
    class: 'one-row',
    field: 'doubtViolateExplain',
    span: 8,
    itemRender: {
      name: '$textarea',
      props: { disabled: true, placeholder: '请输入指导意见说明' } }
  }
]
export const departmentalGuidanceFormItem = (ctx) => [
  {
    field: 'commentDept',
    title: '指导意见',
    titleWidth: '180',
    span: 8,
    itemRender: {
      name: '$select',
      props: { placeholder: '指导意见', clearable: true, disabled: ctx.showType === 'detail' },
      options: [
        {
          label: '认定正常',
          value: '2'
        },
        {
          label: '单位已整改',
          value: '5'
        },
        {
          label: '监控部门发本级处室反馈',
          value: '8'
        },
        {
          label: '监控部门下发区县反馈',
          value: '9'
        }
      ]
    }
  },
  {
    field: `phone${ctx.budgetlevelFieldNum}`,
    title: '联系电话',
    titleWidth: '180',
    span: 8,
    itemRender: {
      name: '$input',
      props: { required: true, placeholder: '请输入联系电话', disabled: ctx.showType === 'detail' }
    }
  },
  {
    title: '发送人',
    field: `handler${ctx.budgetlevelFieldNum}`,
    span: 8,
    titleWidth: '180',
    itemRender: {
      name: '$input',
      props: { required: true, disabled: true, placeholder: '请输入发送人' } }
  },
  {
    title: '发送时间',
    field: `updateTime${ctx.budgetlevelFieldNum}`,
    span: 8,
    titleWidth: '180',
    itemRender: {
      name: '$input',
      props: { disabled: true, placeholder: '请输入发送时间' } }
  },
  {
    title: '指导意见说明',
    class: 'one-row',
    field: `information${ctx.budgetlevelFieldNum}`,
    span: 8,
    titleWidth: '180',
    itemRender: {
      name: '$textarea',
      props: { disabled: ctx.showType === 'detail', resize: 'vertical', autosize: { minRows: 2, maxRows: 5 }, placeholder: '请输入指导意见说明' },
      autosize: { minRows: 2, maxRows: 5 }
    }
  }
]
export const renderers = {
  $payVoucherInputGloableOptionRow: {
    renderDefault(h, cellRender, params, context) {
      let _this = context.$grid.$parent
      let { row, column } = params
      return [
        <el-tooltip content="附件" placement="top" effect="light">
          <a class="gloable-option-row-attachment gloable-option-row  fn-inline" onClick={() => _this.onOptionRowClick({ row, column, optionType: 'attachment' })}>附件</a>
        </el-tooltip>
      ]
    }
  },
  $ReportTaskGloableOptionRow: {
    renderDefault(h, cellRender, params, context) {
      let _this = context.$grid.$parent
      let { row, column } = params
      return [
        <el-tooltip content="" placement="" effect="light">
          <a class="gloable-option-row-attachment gloable-option-row  fn-inline" onClick={() => _this.onOptionRowClick({ row, column, optionType: 'show' })}>查看</a>
        </el-tooltip>
      ]
    }
  },
  $warningLevel: {
    renderDefault(h, cellRender, params, context) {
      let { row, column } = params
      return [
        <el-tooltip content="" placement="" effect="light">
          <a class="gloable-option-row-attachment gloable-option-row  fn-inline" style={ warningLevelColor[Number(row[column.property])].colorStyle}>{warningLevelColor[row[column.property]].warningLabel}</a>
        </el-tooltip>
      ]
    }
  }
}
