import {
  getRuleNameColumn,
  getWarnLevelColumn,
  getControlTypeColumn,
  getWarnTypeColumn,
  getIsDirColumn,
  warnLevelOptions,
  isDirOptions
} from '@/views/main/handlingOfViolations/model/data'
import { isSpeTypeOps } from '../../../handlingOfViolations/model/data'

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
      options: warnLevelOptions,
      props: {
        clearable: true,
        placeholder: '预警级别'
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
    title: '是否专项监控',
    field: 'isSpeType',
    titleWidth: 0,
    itemRender: {
      name: '$select',
      options: isSpeTypeOps,
      props: {
        clearable: true,
        placeholder: '是否专项监控'
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
    title: '规则名称',
    field: 'ruleName',
    titleWidth: 0,
    itemRender: {
      name: '$input',
      props: {
        placeholder: '规则名称',
        clearable: true
      }
    }
  }
]

/**
 * 监控信息columns
 * @return {[{field: string, sortable: boolean, filters: boolean, title: string}, {field: string, sortable: boolean, filters: boolean, title: string}, {field: string, width: number, sortable: boolean, filters: boolean, title: string}]}
 */
export const getWarnInfoColumns = () => {
  return [
    getWarnLevelColumn,
    getControlTypeColumn,
    getWarnTypeColumn
  ]
}

/**
 * 预警数量columns
 * @return {[{field: string, width: number, sortable: boolean, filters: boolean, title: string, align: string}, {field: string, width: number, sortable: boolean, filters: boolean, title: string, align: string}, {field: string, children: [{field: string, width: number, sortable: boolean, filters: boolean, title: string, align: string}, {field: string, width: number, sortable: boolean, filters: boolean, title: string, align: string}], sortable: boolean, filters: boolean, title: string, align: string}]}
 */
export const getWarnCountColumns = () => {
  return [
    {
      title: '预警总数量',
      field: 'warnTotal',
      align: 'right',
      width: 140,
      sortable: false,
      combinedType: [
        'subTotal',
        'total',
        'totalAll'
      ],
      cellRender: {
        name: '$vxeInput',
        props: {
          type: 'number'
        }
      },
      filters: false
    },
    {
      title: '在途',
      field: 'onWay',
      width: 140,
      align: 'right',
      combinedType: [
        'subTotal',
        'total',
        'totalAll'
      ],
      cellRender: {
        name: '$vxeInput',
        props: {
          type: 'number'
        }
      },
      sortable: false,
      filters: false
    },
    {
      title: '终审',
      field: 'end',
      align: 'left',
      sortable: false,
      filters: false,
      width: 280,
      children: [
        {
          title: '放行',
          field: 'release',
          width: 140,
          align: 'right',
          combinedType: [
            'subTotal',
            'total',
            'totalAll'
          ],
          cellRender: {
            name: '$vxeInput',
            props: {
              type: 'number'
            }
          },
          sortable: false,
          filters: false
        },
        {
          title: '禁止',
          field: 'prohibit',
          width: 140,
          align: 'right',
          combinedType: [
            'subTotal',
            'total',
            'totalAll'
          ],
          cellRender: {
            name: '$vxeInput',
            props: {
              type: 'number'
            }
          },
          sortable: false,
          filters: false
        }
      ]
    }
  ]
}

/**
 * cell-class-name
 * */
export function cellCursorUnderlineClassName({ column }, fields = ['warnTotal', 'onWay', 'release', 'prohibit']) {
  if (fields.includes(column.property)) {
    return 'cursor-underline'
  }
}

/**
 * 主列表columns
 * @return {[{field: string, sortable: boolean, filters: boolean, title: string, align: string}, {field: string, sortable: boolean, filters: boolean, title: string}, {field: string, sortable: boolean, filters: boolean, title: string}, {field: string, width: number, sortable: boolean, filters: boolean, title: string}, {field: string, width: number, sortable: boolean, filters: boolean, title: string, align: string}, null, null, null]}
 */
export const getIndexColumns = () => {
  return [
    getRuleNameColumn(),
    ...getWarnInfoColumns(),
    ...getWarnCountColumns(),
    getIsDirColumn()
  ]
}
