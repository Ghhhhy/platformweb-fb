import store from '@/store/index'

import { TabEnum, WarnLevelEnum } from './enum'
import { budgetUnitTreeSelect } from '../../../../../common/model/data'

// 全部-tab
export const allTab = {
  type: 'button',
  label: '全部',
  code: TabEnum.ALL,
  value: TabEnum.ALL,
  iconName: 'base-all.png',
  iconNameActive: 'base-all-active.png'
}

// 预警级别options
export const warnLevelOptions = [
  { value: WarnLevelEnum.YELLOW, label: '黄色预警', iconClass: 'ri-alarm-warning-fill', iconStyle: { color: '#F1C40E' } },
  { value: WarnLevelEnum.ORANGE, label: '橙色预警', iconClass: 'ri-alarm-warning-fill', iconStyle: { color: '#E67E22' } },
  { value: WarnLevelEnum.RED, label: '红色预警', iconClass: 'ri-alarm-warning-fill', iconStyle: { color: '#E74C3C' } },
  { value: WarnLevelEnum.BLUE, label: '蓝色预警', iconClass: 'ri-alarm-warning-fill', iconStyle: { color: '#3298DB' } }
]

// 监控处理方式Options（参照原项目内几种方式）
export const controlTypeOptions = store.state.warnInfo.warnInfoOptions
// [
//   { value: '1', label: '禁止' },
//   { value: '2', label: '冻结' },
//   { value: '3', label: '警示' },
//   { value: '4', label: '提醒' }
// ]

warnLevelOptions.forEach(option => {
  const storeWarn = store.state.warnInfo.warnInfoOptions.find(item => item.warnLevel === option.value)
  if (storeWarn) {
    option = {
      ...option,
      ...storeWarn
    }
  }
})

// 预警类别options
export const warnTypeOptions = [
  { value: '1', label: '流向' },
  { value: '2', label: '流速' },
  { value: '3', label: '流量' },
  { value: '4', label: '其他' }
]
// 是否直达资金options
export const isDirOptions = [
  { value: '1', label: '是' },
  { value: '0', label: '否' }
]

/**
 * 首页列表筛选表单
 * @type {[{field: string, itemRender: {name: string, options: [{label: string, value: string}, {label: string, value: string}, {label: string, value: string}, {label: string, value: string}], props: {clearable: boolean, placeholder: string}}, titleWidth: number, title: string}, {field: string, itemRender: {name: string, options: [{label: string, value: string}, {label: string, value: string}, {label: string, value: string}, {label: string, value: string}], props: {clearable: boolean, placeholder: string}}, titleWidth: number, title: string}, {field: string, itemRender: {name: string, options: [{label: string, value: string}, {label: string, value: string}], props: {clearable: boolean, placeholder: string}}, titleWidth: number, title: string}, {field: string, itemRender: {name: string, props: {clearable: boolean, labelFormat: string, valueFormat: string, placeholder: string, type: string}}, titleWidth: number, title: string}, {field: string, itemRender: {name: string, props: {clearable: boolean, placeholder: string}}, titleWidth: number, title: string}]}
 */
export const searchFormCommonSchemas = [
  {
    title: '预警级别',
    field: 'warningLevel',
    titleWidth: 0,
    itemRender: {
      name: '$select',
      options: warnLevelOptions,
      props: {
        clearable: true,
        placeholder: '预警级别'
      }
    }
  },
  {
    title: '预警类别',
    field: 'warnType',
    titleWidth: 0,
    itemRender: {
      name: '$select',
      options: warnTypeOptions,
      props: {
        clearable: true,
        placeholder: '预警类别'
      }
    }
  },
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
    title: '开始日期',
    field: 'startTime',
    titleWidth: 0,
    itemRender: {
      name: '$input',
      props: {
        type: 'date',
        placeholder: '开始日期',
        clearable: true,
        valueFormat: 'yyyy-MM-dd',
        labelFormat: 'yyyy年MM月dd日'
      }
    }
  },
  {
    title: '结束日期',
    field: 'endTime',
    titleWidth: 0,
    itemRender: {
      name: '$input',
      props: {
        type: 'date',
        placeholder: '结束日期',
        clearable: true,
        valueFormat: 'yyyy-MM-dd',
        labelFormat: 'yyyy年MM月dd日'
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
    title: '预算单位',
    field: 'budgetCode',
    titleWidth: 0,
    itemRender: {
      name: '$formTreeInput',
      props: {
        placeholder: '预算单位',
        clearable: true,
        ...budgetUnitTreeSelect
      }
    }
  }
]

// 主列表columns
export const getIndexColumns = () => {
  return [
    {
      title: '规则名称',
      field: 'ruleName',
      width: 300,
      sortable: false,
      filters: false,
      className: 'cursor-underline'
    },
    {
      title: '预警级别',
      field: 'warnLevel',
      width: 100,
      sortable: false,
      filters: false
    },
    {
      title: '处理方式',
      field: 'controlType',
      width: 100,
      sortable: false,
      filters: false
    },
    {
      title: '预警类别',
      field: 'warnType',
      width: 100,
      sortable: false,
      filters: false
    },
    {
      title: '预警总数量',
      field: 'warnTotal',
      align: 'right',
      width: 100,
      sortable: false,
      filters: false
    },
    {
      title: '未处理',
      field: 'noHandleCount',
      width: 100,
      align: 'right',
      sortable: false,
      filters: false
    },
    {
      title: '禁止',
      field: 'disabled',
      width: 100,
      align: 'right',
      sortable: false,
      filters: false
    },
    {
      title: '放行',
      field: 'pass',
      width: 100,
      align: 'right',
      sortable: false,
      filters: false
    },
    {
      title: '作废',
      field: 'cancellation',
      width: 100,
      align: 'right',
      sortable: false,
      filters: false
    }
  ]
}

// 单据搜索表单
export const receiptsSearchFormSchemas = [
  {
    title: '业务记录编号',
    field: 'signNo',
    span: 6,
    titleWidth: 0,
    itemRender: {
      name: '$input',
      props: {
        placeholder: '业务记录编号',
        clearable: true
      }
    }
  },
  {
    title: '收款人全称',
    field: 'payee',
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
    field: 'minMoney',
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
    field: 'maxMoney',
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
    filters: false
  },
  {
    title: '上传时间',
    field: 'createtime',
    width: 160,
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
  width: 80,
  type: 'seq',
  sortable: false,
  filters: false
}
