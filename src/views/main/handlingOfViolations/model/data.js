import store from '@/store/index'
import { inject, computed, unref } from '@vue/composition-api'
import router from '@/router'
import { transJson2 } from '@/utils/params'
import { TabEnum, WarnLevelEnum, RouterPathEnum } from './enum'
import { $title } from '@/hooks/useTitle/useTitle.js'
const dict = JSON.parse(JSON.stringify(store.getters.dict))
const pagePath = inject('pagePath')
/**
 * 页面标识映射节点类型：用于给接口做权限区分
 * @type {{DIVISION_AUDIT: number, DEPARTMENT_AUDIT: number, UNIT_FEEDBACK: number, UNIT_AUDIT: number, DEPARTMENT_REAUDIT: number, DIVISION_REAUDIT: number}}
 */
export const pagePathMapNodeType = {
  // 监控预警单位反馈
  [RouterPathEnum().UNIT_FEEDBACK]: 2001,
  // 监控预警单位审核
  [RouterPathEnum().UNIT_AUDIT]: 2002,
  // 监控预警主管部门初审
  [RouterPathEnum().DEPARTMENT_AUDIT]: 2003,
  // 监控预警主管部门复审
  [RouterPathEnum().DEPARTMENT_REAUDIT]: 2004,
  // 监控预警处室初审
  [RouterPathEnum().DIVISION_AUDIT]: 2005,
  // 监控预警处室复审
  [RouterPathEnum().DIVISION_REAUDIT]: 2006
}

// 全部-tab
export const allTab = {
  type: 'button',
  label: '全部',
  code: TabEnum.ALL,
  value: TabEnum.ALL,
  iconName: 'base-all.png',
  iconNameActive: 'base-all-active.png'
}

// 退回-tab
export const returnTab = {
  type: 'button',
  label: '被退回',
  code: TabEnum.RETURN,
  value: TabEnum.RETURN,
  iconName: 'ali_returned.png',
  iconNameActive: 'ali_returned-active.png'
}

// 禁止-tab
export const disabledTab = {
  type: 'button',
  label: '被禁止',
  code: TabEnum.DISABLED,
  value: TabEnum.DISABLED,
  iconName: 'base-daiban.png',
  iconNameActive: 'base-daiban-active.png'
}

// 未送审、已送审-tabs
export const sendAuditTabs = [
  {
    type: 'button',
    label: '未送审',
    code: TabEnum.NO_SEND,
    value: TabEnum.NO_SEND,
    iconName: 'ali_no_sent.png',
    iconNameActive: 'ali_no_sent-active.png'
  },
  {
    type: 'button',
    label: '已送审',
    code: TabEnum.SENDED,
    value: TabEnum.SENDED,
    iconName: 'ali_sended.png',
    iconNameActive: 'ali_sended-active.png'
  }
]

// 待审核、已审核-tabs
export const doAuditTabs = [
  {
    type: 'button',
    label: '未审核',
    code: TabEnum.NO_AUDIT,
    value: TabEnum.NO_AUDIT,
    iconName: 'ali_no_audit.png',
    iconNameActive: 'ali_no_audit-active.png'
  },
  {
    type: 'button',
    label: '已审核',
    code: TabEnum.AUDITED,
    value: TabEnum.AUDITED,
    iconName: 'ali_audit.png',
    iconNameActive: 'ali_audit-active.png'
  }
]

// 预警级别options
export const warnLevelOptions = [
  { value: WarnLevelEnum.YELLOW, label: '黄色预警', iconClass: 'ri-alarm-warning-fill', iconStyle: { color: '#F1C40E' } },
  { value: WarnLevelEnum.ORANGE, label: '橙色预警', iconClass: 'ri-alarm-warning-fill', iconStyle: { color: '#E67E22' } },
  { value: WarnLevelEnum.RED, label: '红色预警', iconClass: 'ri-alarm-warning-fill', iconStyle: { color: '#E74C3C' } },
  { value: WarnLevelEnum.BLUE, label: '蓝色预警', iconClass: 'ri-alarm-warning-fill', iconStyle: { color: '#3298DB' } }
]

// 监控处理方式Options（参照原项目内几种方式）
export const controlTypeOptions = store.state.warnInfo.warnControlTypeOptions.map(item => {
  return {
    value: String(item.warnLevel),
    ...item
  }
})

console.log(store.state.warnInfo, controlTypeOptions)

warnLevelOptions.forEach(option => {
  const storeWarn = store.state.warnInfo.warnLevelOptions.find(item => item.warnLevel === option.value)
  if (storeWarn) {
    option = {
      ...option,
      ...storeWarn
    }
  }
})

// 预警类别options
export const warnTypeOptions = [
  { value: 1, label: '流向' },
  { value: 2, label: '流速' },
  { value: 3, label: '流量' },
  { value: 4, label: '其他' }
]
// 是否直达资金options
export const isDirOptions = [
  { value: '1', label: '是' },
  { value: '0', label: '否' }
]
// 是否专项监控isSpeType
export const isSpeTypeOps = [
  { value: '1', label: '是' },
  { value: '0', label: '否' }
]

// 业务状态options
export const getStatusCodeOptions = () => {
  const options = [
    { value: TabEnum.RETURN, label: '被退回' },
    { value: TabEnum.DISABLED, label: '被禁止' },
    { value: TabEnum.RETURN_SELF, label: '已退回' },
    { value: TabEnum.DISABLED_SELF, label: '已禁止' }
  ]
  if (RouterPathEnum().UNIT_FEEDBACK === router.currentRoute.path) {
    // 单位反馈
    options.unshift(...[{ value: TabEnum.NO_SEND, label: '待送审' }, { value: TabEnum.SENDED, label: '已送审' }])
  } else if (Object.keys(RouterPathEnum()).includes(router.currentRoute.path)) {
    // 除开单位反馈的所有违规处理菜单
    options.unshift(...[{ value: TabEnum.NO_AUDIT, label: '待审核' }, { value: TabEnum.AUDITED, label: '已审核' }])
  } else {
    // 其他菜单全部显示（主题分析菜单需要用到）
    options.unshift(
      ...[{ value: TabEnum.NO_SEND, label: '待送审' }, { value: TabEnum.SENDED, label: '已送审' }],
      ...[{ value: TabEnum.NO_AUDIT, label: '待审核' }, { value: TabEnum.AUDITED, label: '已审核' }]
    )
  }
  return options
}

/**
 * 首页列表筛选表单
 * @type {[{field: string, itemRender: {name: string, options: [{label: string, value: string}, {label: string, value: string}, {label: string, value: string}, {label: string, value: string}], props: {clearable: boolean, placeholder: string}}, titleWidth: number, title: string}, {field: string, itemRender: {name: string, options: [{label: string, value: string}, {label: string, value: string}, {label: string, value: string}, {label: string, value: string}], props: {clearable: boolean, placeholder: string}}, titleWidth: number, title: string}, {field: string, itemRender: {name: string, options: [{label: string, value: string}, {label: string, value: string}], props: {clearable: boolean, placeholder: string}}, titleWidth: number, title: string}, {field: string, itemRender: {name: string, props: {clearable: boolean, labelFormat: string, valueFormat: string, placeholder: string, type: string}}, titleWidth: number, title: string}, {field: string, itemRender: {name: string, props: {clearable: boolean, placeholder: string}}, titleWidth: number, title: string}]}
 */
export const searchFormCommonSchemas = [
  {
    title: '预警级别',
    field: 'warnLevel',
    titleWidth: 0,
    itemRender: {
      name: '$select',
      options: dict.map((item) => {
        let option = warnLevelOptions.find(ii => ii.value === item.value)
        return { ...item, iconClass: option?.iconClass, iconStyle: { color: item.color } }
      }),
      props: {
        clearable: true,
        placeholder: '预警级别'
      }
    }
  },
  // {
  //   title: '预警类别',
  //   field: 'warnType',
  //   titleWidth: 0,
  //   itemRender: {
  //     name: '$select',
  //     options: warnTypeOptions,
  //     props: {
  //       clearable: true,
  //       placeholder: '预警类别'
  //     }
  //   }
  // },
  {
    title: '是否直达资金',
    field: 'isDir',
    titleWidth: 0,
    itemRender: {
      name: '$select',
      options: isDirOptions,
      props: {
        clearable: true,
        placeholder: '是否直达资金'
      }
    }
  },
  {
    title: '是否专项主题',
    field: 'isSpeType',
    titleWidth: 0,
    itemRender: {
      name: '$select',
      options: isSpeTypeOps,
      props: {
        clearable: true,
        placeholder: '是否专项主题'
      }
    }
  },
  {
    title: '预警日期',
    field: 'createTime',
    titleWidth: 0,
    itemRender: {
      name: '$input',
      props: {
        type: 'date',
        placeholder: '预警日期',
        clearable: true,
        valueFormat: 'yyyy-MM-dd',
        labelFormat: 'yyyy年MM月dd日'
      }
    }
  },
  {
    title: '最小金额',
    field: 'minAmount',
    titleWidth: 0,
    itemRender: {
      name: '$input',
      props: {
        type: 'float',
        placeholder: '最小金额',
        clearable: true
      }
    }
  },
  {
    title: '最大金额',
    field: 'maxAmount',
    titleWidth: 0,
    itemRender: {
      name: '$input',
      props: {
        type: 'float',
        placeholder: '最大金额',
        clearable: true
      }
    }
  },
  {
    title: '预警名称',
    field: 'ruleName',
    titleWidth: 0,
    itemRender: {
      name: '$input',
      props: {
        placeholder: '预警名称',
        clearable: true
      }
    }
  },
  {
    title: '业务编号',
    field: 'businessNo',
    titleWidth: 0,
    itemRender: {
      name: '$input',
      props: {
        placeholder: '业务编号',
        clearable: true
      }
    }
  }
]

// 【全部】页卡特有过滤筛选
export const searchFormAllTabSchema = [
  {
    title: '业务状态',
    field: 'statusCode',
    titleWidth: 0,
    itemRender: {
      name: '$select',
      options: [],
      props: {
        placeholder: '业务状态',
        clearable: true
      }
    }
  }
]

/**
 * 是否直达资金column
 */
export const getIsDirColumn = (params = {}) => {
  return {
    title: '是否直达资金',
    field: 'isDir',
    width: 100,
    filters: false,
    cellRender: {
      name: '$vxeSelect',
      options: isDirOptions
    },
    ...params
  }
}

export const getAgencyNameColumn = (params = {}) => {
  return {
    title: '预算单位',
    field: 'agencyName',
    width: 200,
    ...params
  }
}
export const getMofDivCodeColumn = (params = {}) => {
  return {
    title: '财政区划',
    field: 'mofDivCode',
    width: 250,
    formatter({ row }) {
      return row.mofDivCode && row.mofDivName ? `${row.mofDivCode}-${row.mofDivName}` : ''
    },
    ...params
  }
}

export const getDeptNameColumn = (params = {}) => {
  return {
    title: '主管部门',
    field: 'deptName',
    width: 200,
    ...params
  }
}

export const getManageMofDepNameColumn = (params = {}) => {
  return {
    title: '业务处室',
    field: 'manageMofDepName',
    width: 200,
    ...params
  }
}

/**
 * 单位部门处室
 * @type {[{field: string, width: number, title: string, align: string}, {field: string, width: number, title: string, align: string}, {field: string, width: number, title: string, align: string}]}
 */
export const getUnitColumns = () => {
  return [
    {
      title: '预算单位',
      field: 'agencyName',
      width: 200
    },
    {
      title: '主管部门',
      field: 'deptName',
      width: 200
    },
    {
      title: '业务处室',
      field: 'manageMofDepName',
      width: 200
    }
  ]
}
// 支付申请编号
export const getPayAppNo = (params = {}) => {
  return {
    title: '支付申请编号',
    field: 'payAppNo',
    width: 180,
    sortable: false,
    filters: false
  }
}
// 预警日期
export const getCreateTimeColumn = (params = {}) => {
  return {
    title: '预警日期',
    field: 'createTime',
    width: 120,
    ...params
  }
}

export const getWarningCodeColumn = (params = {}) => {
  return {
    title: '处理单编号',
    field: 'warningCode',
    width: 200,
    ...params
  }
}

export const getControlTypeColumn = (params = {}) => {
  return {
    title: '监控处理方式',
    field: 'controlType',
    filters: false,
    width: 140,
    cellRender: {
      name: '$vxeSelect',
      options: controlTypeOptions
    },
    ...params
  }
}

export const getWarnLevelColumn = (warnLevelRenderName = '$customIcon') => {
  return {
    title: '预警级别',
    field: 'warnLevel',
    width: 160,
    filters: dict.map((item) => {
      let option = warnLevelOptions.find(ii => ii.value === item.value)
      return { ...item, iconClass: option?.iconClass, iconStyle: { color: item.color } }
    }),
    filterRender: {
      name: '$vxeSelect'
    },
    cellRender: {
      name: warnLevelRenderName,
      options: dict.map((item) => {
        let option = warnLevelOptions.find(ii => ii.value === item.value)
        return { ...item, iconClass: option?.iconClass, iconStyle: { color: item.color } }
      }),
      props: {
        showLabel: true
      }
    }
  }
}

export const getBusinessNoColumn = (params = {}) => {
  return {
    title: '业务编号',
    field: 'payCertNo',
    width: 260,
    ...params
  }
}

export const getRuleNameColumn = (params = {}) => {
  return {
    title: '预警名称',
    field: 'ruleName',
    align: 'left',
    width: 100,
    ...params
  }
}

export const getAmountColumn = (params = {}) => {
  return {
    title: '金额',
    field: 'amount',
    width: 160,
    align: 'right',
    filters: false,
    cellRender: {
      name: '$vxeMoney'
    },
    ...params
  }
}

export const getWarnTypeColumn = (params = {}) => {
  return {
    title: '预警类别',
    field: 'warnType',
    width: 160,
    visible: false,
    filters: false,
    cellRender: {
      name: '$vxeSelect',
      options: warnTypeOptions
    },
    ...params
  }
}

/**
 * 首页table-columns
 * @return {[{field: string, width: number, sortable: boolean, title: string, cellRender: {name: string, options: [{label: string, value: string, iconClass: string}, {label: string, value: string, iconClass: string}, {label: string, value: string, iconClass: string}, {label: string, value: string, iconClass: string}]}}, {field: string, width: number, sortable: boolean, title: string, cellRender: {name: string, options: [{label: string, value: string}, {label: string, value: string}, {label: string, value: string}]}}, {field: string, width: number, sortable: boolean, title: string}, {field: string, width: number, sortable: boolean, title: string}, {field: string, width: number, sortable: boolean, title: string, align: string}, null, null, null, null, null, null, null, null]}
 */
export const getCommonColumns = (warnLevelRenderName = '$customIcon') => {
  const columns = [
    getCreateTimeColumn(),
    getRuleNameColumn(),
    getAmountColumn(),
    getWarnLevelColumn(warnLevelRenderName),
    getControlTypeColumn(),
    getWarningCodeColumn({
      visible: !store.getters.isFuJian// 福建去掉处理单编号
    }),
    getAgencyNameColumn(),
    getMofDivCodeColumn({
      visible: !store.getters.isFuJian// 福建去掉处理单编号
    }),
    getDeptNameColumn(),
    getManageMofDepNameColumn(),
    getBusinessNoColumn({
      field: 'businessNo'
    }),
    // getWarnTypeColumn(),
    getIsDirColumn()
  ]
  const projectCode = transJson2(store.state.curNavModule.param5 || '')?.projectCode
  if (projectCode !== 'SH') {
    columns.unshift(getPayAppNo())
  }
  columns.forEach(column => {
    column.sortable = column.sortable || false
    column.align = column.align || 'center'
  })
  return columns
}

/**
 * 业务状态cloumn
 * @type {[{field: string, width: number, filters: boolean, title: string, cellRender: {name: string, options: [{label: string, value: string, iconClass: string}, {label: string, value: string, iconClass: string}, {label: string, value: string, iconClass: string}, {label: string, value: string, iconClass: string}]}}]}
 */
export const getStatusCodeColumn = () => {
  return {
    title: '业务状态',
    field: 'statusName',
    width: 120,
    filters: false,
    align: 'center'
    // cellRender: {
    //   name: '$vxeSelect',
    //   options: getStatusCodeOptions()
    // }
  }
}

/**
 * 处理说明、处理意见cloumn
 * @type {[{field: string, width: number, filters: boolean, title: string, cellRender: {name: string, options: [{label: string, value: string, iconClass: string}, {label: string, value: string, iconClass: string}, {label: string, value: string, iconClass: string}, {label: string, value: string, iconClass: string}]}}]}
 */
export const getAuditDescriptionColumn = (params = {}) => {
  return {
    title: '处理说明/意见',
    field: 'dealResult',
    width: 260,
    filters: false,
    align: 'center',
    ...params
  }
}

// 处理相关columns
export const auditInfoColumns = [
  {
    field: 'createBy',
    title: '处理人',
    width: 220,
    filters: false,
    sortable: false
  },
  {
    field: 'curStatusName',
    title: '处理状态',
    width: 220,
    filters: false,
    sortable: false
  },
  {
    field: 'handleTime',
    title: '处理日期',
    width: 160,
    filters: false,
    sortable: false
  }
]

/**
 * 获取审核表单
 * @param isUnitFeedback 是否是单位反馈
 * @param isAudit 是否是审核
 * @return {[{field: string, itemRender: {name: string, props: {clearable: boolean, placeholder: string}}, title: (string), required: boolean, span: number}]}
 */

// 是否是处室复审页面（终审） //福建没有按主题区分 不加regulationClass也有处理预警相关的能力
const isReallyDivisionReAudit = computed(() => {
  return ['/divisionReAudit', '/divisionReAuditBySpe'].includes(unref(pagePath))
})
const isFuJian = store.getters.isFuJian
const isRequired = computed(() => {
  if (!isFuJian) return true
  return isFuJian && isReallyDivisionReAudit.value
})
export const getAuditFormSchemas = (isUnitFeedback = false) => {
  return [
    {
      title: isUnitFeedback ? '处理说明' : '处理意见',
      field: 'dealResult',
      required: isRequired.value,
      span: 24,
      itemRender: {
        name: '$input',
        props: {
          placeholder: '请输入',
          clearable: true
        }
      }
    }
  ]
}

// 单据columns
export const getReceiptsColumns = () => {
  return [
    {
      title: '业务单据日期',
      field: 'createTime',
      width: 100,
      sortable: false,
      filters: false
    },
    {
      title: '项目分类',
      field: 'proCatName',
      width: 100,
      sortable: false,
      filters: false
    },
    // {
    //   title: '资金渠道',
    //   field: 'fundDitchName',
    //   width: 100,
    //   sortable: false,
    //   filters: false
    // },
    {
      title: '资金性质',
      field: 'fundTypeName',
      width: 100,
      sortable: false,
      filters: false
    },
    {
      title: '项目名称',
      field: 'proName',
      width: 100,
      sortable: false,
      filters: false
    },
    {
      title: '支出功能分类',
      field: 'expFuncName',
      width: 130,
      sortable: false,
      filters: false,
      formatter({ row }) {
        const mapping = [row.expFuncCode, row.expFuncName]
        return mapping.filter(Boolean).join('-')
      }
    },
    {
      title: '政府经济分类',
      field: 'govBgtEcoName',
      width: 130,
      sortable: false,
      filters: false,
      formatter({ row }) {
        const mapping = [row.govBgtEcoCode, row.govBgtEcoName]
        return mapping.filter(Boolean).join('-')
      }
    },
    {
      title: '部门经济分类',
      field: 'depBgtEcoName',
      width: 130,
      sortable: false,
      filters: false,
      formatter({ row }) {
        const mapping = [row.depBgtEcoCode, row.depBgtEcoName]
        return mapping.filter(Boolean).join('-')
      }
    },
    {
      title: '收款人全称',
      field: 'payeeAcctName',
      width: 120,
      sortable: false,
      filters: false
    },
    {
      title: '收款人账号',
      field: 'payeeAcctNo',
      width: 160,
      sortable: false,
      filters: false
    },
    {
      title: '收款人开户行',
      field: 'payeeAcctBankName',
      width: 120,
      sortable: false,
      filters: false
    },
    {
      title: '支出用途',
      field: 'useDes',
      width: 120,
      sortable: false,
      filters: false
    }
  ]
}

// 单据搜索表单
export const receiptsSearchFormSchemas = [
  {
    title: '业务编号',
    field: 'payAppNo',
    span: 6,
    titleWidth: 0,
    itemRender: {
      name: '$input',
      props: {
        placeholder: '业务编号',
        clearable: true
      }
    }
  },
  {
    title: '收款人全称',
    field: 'payeeAcctName',
    span: 6,
    titleWidth: 0,
    itemRender: {
      name: '$input',
      props: {
        placeholder: '收款人全称',
        clearable: true
      }
    }
  },
  {
    title: '最小金额',
    field: 'minAmt',
    titleWidth: 0,
    itemRender: {
      name: '$input',
      props: {
        type: 'float',
        placeholder: '最小金额',
        clearable: true
      }
    }
  },
  {
    title: '最大金额',
    field: 'maxAmt',
    titleWidth: 0,
    itemRender: {
      name: '$input',
      props: {
        type: 'float',
        placeholder: '最大金额',
        clearable: true
      }
    }
  }
]

// 文件columns
export const fileColumns = [
  {
    title: '附件文件名称',
    field: 'filename',
    sortable: false,
    filters: false,
    width: 'auto'
  },
  {
    title: '上传时间',
    field: 'createtime',
    width: 'auto',
    sortable: false,
    filters: false
  },
  {
    title: '文件大小',
    field: 'filesize',
    width: 120,
    sortable: false,
    filters: false,
    formatter: ({ row, column, cellValue }) => {
      return (cellValue / 1024).toFixed(2) + 'KB'
    }
  },
  {
    title: '操作',
    field: 'columnAction',
    align: 'center',
    sortable: false,
    filters: false,
    width: 80
  }
]

// 序号列
export const indexColumn = {
  title: '序号',
  width: 60,
  type: 'seq',
  sortable: false,
  filters: false
}
export const fjAddColumns = [
  // {
  //   title: '预算单位编码',
  //   field: 'agencyCode',
  //   width: 180,
  //   sortable: false,
  //   filters: false
  // },
  // {
  //   title: '预算单位名称',
  //   field: 'agencyName',
  //   width: 180,
  //   sortable: false,
  //   filters: false
  // },
  // {
  //   title: '支付申请编号',
  //   field: 'payAppNo',
  //   width: 180,
  //   sortable: false,
  //   filters: false
  // },
  // {
  //   title: '支付金额',
  //   field: 'payAppAmt',
  //   width: 180,
  //   sortable: false,
  //   filters: false
  // },
  {
    title: '资金用途',
    field: 'useDes',
    width: 180,
    sortable: false,
    filters: false
  },
  {
    title: '支出项目',
    field: 'proName',
    width: 180,
    sortable: false,
    filters: false
  },
  {
    title: '结算方式',
    field: 'setModeName',
    width: 180,
    sortable: false,
    filters: false
  }, {
    title: $title('payAcctName'),
    field: 'payAcctName',
    width: 180,
    sortable: false,
    filters: false
  }, {
    title: $title('payAcctNo'),
    field: 'payAcctNo',
    width: 180,
    sortable: false,
    filters: false
  }, {
    title: $title('payAcctBankName'),
    field: 'payAcctBankName',
    width: 180,
    sortable: false,
    filters: false
  }, {
    title: $title('payeeAcctName'),
    field: 'payeeAcctName',
    width: 180,
    sortable: false,
    filters: false
  }, {
    title: '政府经济分类编码',
    field: 'govBgtEcoCode',
    width: 180,
    sortable: false,
    filters: false
  }, {
    title: '政府经济分类名称',
    field: 'govBgtEcoName',
    width: 180,
    sortable: false,
    filters: false
  },
  {
    title: '功能分类编码',
    field: 'expFuncCode',
    width: 180,
    sortable: false,
    filters: false
  }, {
    title: '功能分类名称',
    field: 'expFuncName',
    width: 180,
    sortable: false,
    filters: false
  }, {
    title: '部门经济分类编码',
    field: 'depBgtEcoCode',
    width: 180,
    sortable: false,
    filters: false
  }, {
    title: '部门经济分类名称',
    field: 'depBgtEcoName',
    width: 180,
    sortable: false,
    filters: false
  }, {
    title: '资金性质',
    field: 'fundTypeName',
    width: 180,
    sortable: false,
    filters: false
  }, {
    title: '申请人',
    field: 'applyName',
    width: 180,
    sortable: false,
    filters: false
  }, {
    title: '申请人电话',
    field: 'applyDial',
    width: 180,
    sortable: false,
    filters: false
  }, {
    title: '资金归口',
    field: 'bgtMofDepName',
    width: 180,
    sortable: false,
    filters: false
  }, {
    title: '业务类型',
    field: 'payBusTypeName',
    width: 180,
    sortable: false,
    filters: false
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
    visible: !store.getters.isFuJian,
    cellRender: {
      name: '$gloableOptionRow'
    }
  }
]
export let proconf = {
  fjAddColumns: [
    // {
    //   title: '预算单位编码',
    //   field: 'agencyCode',
    //   width: 180,
    //   sortable: false,
    //   filters: false
    // },
    // {
    //   title: '预算单位名称',
    //   field: 'agencyName',
    //   width: 180,
    //   sortable: false,
    //   filters: false
    // },
    // {
    //   title: '支付申请编号',
    //   field: 'payAppNo',
    //   width: 180,
    //   sortable: false,
    //   filters: false
    // },
    // {
    //   title: '支付金额',
    //   field: 'payAppAmt',
    //   width: 180,
    //   sortable: false,
    //   filters: false
    // },
    {
      title: '资金用途',
      field: 'useDes',
      width: 180,
      sortable: false,
      filters: false
    },
    {
      title: '支出项目',
      field: 'proName',
      width: 180,
      sortable: false,
      filters: false
    },
    {
      title: '结算方式',
      field: 'setModeName',
      width: 180,
      sortable: false,
      filters: false
    }, {
      title: $title('payAcctName'),
      field: 'payAcctName',
      width: 180,
      sortable: false,
      filters: false
    }, {
      title: $title('payAcctNo'),
      field: 'payAcctNo',
      width: 180,
      sortable: false,
      filters: false
    }, {
      title: $title('payAcctBankName'),
      field: 'payAcctBankName',
      width: 180,
      sortable: false,
      filters: false
    }, {
      title: $title('payeeAcctName'),
      field: 'payeeAcctName',
      width: 180,
      sortable: false,
      filters: false
    }, {
      title: '政府经济分类编码',
      field: 'govBgtEcoCode',
      width: 180,
      sortable: false,
      filters: false
    }, {
      title: '政府经济分类名称',
      field: 'govBgtEcoName',
      width: 180,
      sortable: false,
      filters: false
    },
    {
      title: '功能分类编码',
      field: 'expFuncCode',
      width: 180,
      sortable: false,
      filters: false
    }, {
      title: '功能分类名称',
      field: 'expFuncName',
      width: 180,
      sortable: false,
      filters: false
    }, {
      title: '部门经济分类编码',
      field: 'depBgtEcoCode',
      width: 180,
      sortable: false,
      filters: false
    }, {
      title: '部门经济分类名称',
      field: 'depBgtEcoName',
      width: 180,
      sortable: false,
      filters: false
    }, {
      title: '资金性质',
      field: 'fundTypeName',
      width: 180,
      sortable: false,
      filters: false
    }, {
      title: '申请人',
      field: 'applyName',
      visible: store.getters.isSx,
      width: 180,
      sortable: false,
      filters: false
    }, {
      title: '申请人电话',
      field: 'applyDial',
      visible: store.getters.isSx,
      width: 180,
      sortable: false,
      filters: false
    }, {
      title: '资金归口',
      field: 'bgtMofDepName',
      width: 180,
      sortable: false,
      filters: false
    }, {
      title: '业务类型',
      field: 'payBusTypeName',
      width: 180,
      sortable: false,
      filters: false
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
      visible: !store.getters.isFuJian,
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
      return [
        <el-tooltip content="运行轨迹" placement="top" effect="light">
          <a class="gloable-option-row-optionlog gloable-option-row  fn-inline" onClick={() => self.onOptionRowClick({ row, column, optionType: 'processTrack' })}>运行轨迹</a>
        </el-tooltip>
      ]
    }
  }
}
