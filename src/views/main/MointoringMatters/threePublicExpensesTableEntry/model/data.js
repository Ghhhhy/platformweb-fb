import { eachTree, toDateString } from 'xe-utils'
import { TabEnum, TableTabsEnum } from './enum'

// tabs
export const tabs = [
  {
    type: 'button',
    iconName: 'base-daiban.png',
    iconNameActive: 'base-daiban-active.png',
    iconUrl: '',
    label: '未提交',
    code: TabEnum.UNSUBMIT,
    curValue: TabEnum.UNSUBMIT
  },
  {
    type: 'button',
    iconName: 'base-yiban.png',
    iconNameActive: 'base-yiban-active.png',
    iconUrl: '',
    label: '已提交',
    code: TabEnum.SUBMIT,
    curValue: TabEnum.SUBMIT
  }
]

// 搜索表单
export const formSchemas = [
  {
    field: 'month',
    span: 5,
    itemRender: {
      name: '$input',
      defaultValue: toDateString(new Date(), 'yyyy-MM'),
      props: {
        type: 'month',
        placeholder: '月份'
      }
    }
  }
]

// 表格上的tab
export const tableTabs = [
  {
    value: TableTabsEnum.MONITOR_BASIC_INFORMATION,
    label: '监控基本情况'
  },
  {
    value: TableTabsEnum.NO_BUDGET,
    label: '无预算、超预算列支'
  },
  {
    value: TableTabsEnum.FUNDS_IS_NOT_STANDARDIZED,
    label: '资金使用不规范、不到位'
  }
]

const checkboxColumn = {
  type: 'checkbox',
  minWidth: 60,
  fixed: 'left'
}

// 序号列
export const seqIndexColumn = {
  type: 'seq',
  title: '序号',
  minWidth: 60,
  fixed: 'left'
}

// 监控基本情况
export const tableColumnsByMonitorBasicInfo = [
  {
    field: 'payAmtAll',
    title: '监控资金总量',
    minWidth: 140,
    editRender: {
      name: '$input',
      immediate: true,
      props: {
        type: 'number',
        placeholder: '请输入',
        clearable: true
      }
    }
  },
  {
    field: 'warningTotal',
    title: '预警数量',
    minWidth: 120,
    editRender: {
      name: '$input',
      immediate: true,
      props: {
        type: 'number',
        placeholder: '请输入',
        clearable: true
      }
    }
  },
  {
    field: 'warningAmtTotal',
    title: '合计金额',
    minWidth: 120,
    editRender: {
      name: '$input',
      immediate: true,
      props: {
        type: 'number',
        placeholder: '请输入',
        clearable: true
      }
    }
  },
  {
    field: 'handledTotal',
    title: '已处理',
    minWidth: 120,
    editRender: {
      name: '$input',
      immediate: true,
      props: {
        type: 'number',
        placeholder: '请输入',
        clearable: true
      }
    }
  },
  {
    field: 'handledAmtTotal',
    title: '合计金额',
    minWidth: 120,
    editRender: {
      name: '$input',
      immediate: true,
      props: {
        type: 'number',
        placeholder: '请输入',
        clearable: true
      }
    }
  },
  {
    field: 'dealTotal',
    title: '生成存疑数据问询单',
    minWidth: 220,
    editRender: {
      name: '$input',
      immediate: true,
      props: {
        type: 'number',
        placeholder: '请输入',
        clearable: true
      }
    }
  },
  {
    field: 'finishTotal',
    title: '已完成',
    minWidth: 120,
    editRender: {
      name: '$input',
      immediate: true,
      props: {
        type: 'number',
        placeholder: '请输入',
        clearable: true
      }
    }
  }
]

// 无预算、超预算列支columns
export const tableColumnsByNoBudget = [
  checkboxColumn,
  seqIndexColumn,
  {
    field: 'deptName',
    title: '部门',
    minWidth: 120
  },
  {
    field: 'agencyName',
    title: '单位',
    minWidth: 120
  },
  {
    field: 'depBgtEcoName',
    title: '“三公”经费部门经济分类',
    minWidth: 180
  },
  {
    field: 'fundTypeName',
    title: '资金性质（一般公共预算、政府性基金预算、国有资本预算及自有资金）',
    minWidth: 180
  },
  {
    field: 'budgetAmt',
    title: '预算数（包括年初预算数及调整预算数）',
    minWidth: 160,
    editRender: {
      name: '$input',
      immediate: true,
      props: {
        type: 'number',
        placeholder: '请输入',
        clearable: true
      }
    }
  },
  {
    field: 'budgetExecuteAmt',
    title: '预算执行数（同预算数口径）',
    minWidth: 160,
    editRender: {
      name: '$input',
      immediate: true,
      props: {
        type: 'number',
        placeholder: '请输入',
        clearable: true
      }
    }
  },
  {
    field: 'executePro',
    title: '执行率(%)',
    minWidth: 140,
    editRender: {
      name: '$input',
      immediate: true,
      props: {
        type: 'number',
        placeholder: '请输入',
        clearable: true
      }
    }
  },
  {
    field: 'problemInformation',
    title: '问题基本情况',
    minWidth: 140
  },
  {
    field: 'handleIdeaResult',
    title: '处理意见及结果',
    minWidth: 160
  }
]

// 资金使用不规范、不到位
export const tableColumnsByFundsIsNotStandardized = [
  checkboxColumn,
  seqIndexColumn,
  {
    field: 'deptName',
    title: '部门',
    minWidth: 120
  },
  {
    field: 'agencyName',
    title: '单位',
    minWidth: 120
  },
  {
    title: '支付明细（支付凭证中相关信息填报）',
    minWidth: 480,
    children: [
      {
        title: '“三公”经费部门经济分类',
        field: 'depBgtEcoName',
        minWidth: 120
      },
      {
        field: 'fundTypeName',
        title: '资金性质（一般公共预算、政府性基金预算、国有资金预算及自有资金）',
        minWidth: 120
      },
      {
        field: 'xpayDate',
        title: '交易日期',
        minWidth: 120,
        editRender: {
          name: '$input',
          props: {
            type: 'datetime',
            placeholder: '请选择',
            clearable: true
          }
        }
      },
      {
        field: 'payAppAmt',
        title: '交易金额',
        minWidth: 120,
        editRender: {
          name: '$input',
          immediate: true,
          props: {
            type: 'number',
            placeholder: '请输入',
            clearable: true
          }
        }
      },
      {
        field: 'useDes',
        title: '用途',
        minWidth: 120
      },
      {
        field: 'setModeName',
        title: '结算方式',
        minWidth: 120
      },
      {
        field: 'payeeAcctName',
        title: '收款人名称',
        minWidth: 160
      },
      {
        field: 'payeeAcctNo',
        title: '收款人账号',
        minWidth: 160
      }
    ]
  },
  {
    field: 'problemInformation',
    title: '问题基本情况',
    minWidth: 160
  },
  {
    field: 'violateType',
    title: '违规类型',
    minWidth: 120
  },
  {
    field: 'handleIdeaResult',
    title: '处理意见及结果',
    minWidth: 160
  }
]
eachTree([...tableColumnsByMonitorBasicInfo, ...tableColumnsByNoBudget, ...tableColumnsByFundsIsNotStandardized], (item) => {
  item.resizable = true
  if (!item.children?.length) {
    item.editRender = item.editRender || {
      name: '$input',
      props: {
        placeholder: '请输入',
        clearable: true
      }
    }
  }
  item.align = item.align || 'center'
})

// 表格底部提示
export const tableFooterTips = {
  [TableTabsEnum.NO_BUDGET]: '注：1、无预算是指预算和指标处理不规范，指标无法对应预算时产生的情况。2、超预算是指有预算时，支出超过预算的情况。',
  [TableTabsEnum.FUNDS_IS_NOT_STANDARDIZED]: '注：1、违规类型分为超标准列支，应列未列，年底突击列支，违反中央有关规定列支及其他。2、资金性质难以分清三本预算的，填报为财政拨款/专户管理资金/自有资金。'
}
