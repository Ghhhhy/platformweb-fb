import store from '@/store/index'
// 内蒙8土地出让收入大于一般公共预算收入
const proconf = {
  // BsToolBar 状态栏
  toolBarStatusButtons: [
    {
      type: 'button',
      iconName: 'base-all.png',
      iconNameActive: 'base-all-active.png',
      iconUrl: '',
      label: '全部',
      code: '1',
      curValue: '1'
    }
  ],
  // BsToolBar 右侧按钮
  statusRightToolBarButton: {
    '1': [
      { code: 'export', label: '导出', status: 'primary' }
    ]
  },
  statusRightToolBarButtonByBusDept: {
    '1': [
      { code: 'export', label: '导出', status: 'primary' }
    ]
  },
  highQueryConfig: [
    {
      title: '区划',
      field: 'mofDivCode',
      align: 'left',
      name: '$vxeTree',
      itemRender: {
        name: '$vxeTree',
        options: [],
        defaultValue: '',
        props: {
          placeholder: '请选择区划',
          isServer: true,
          format: '{code}-{name}',
          config: {
            treeProps: {
              nodeKey: 'guid',
              label: 'name',
              children: 'children',
              labelFormat: '{code}-{name}'
            },
            placeholder: '请选择区划',
            multiple: true,
            isleaf: false,
            axiosConfig: {
              method: 'post',
              successCode: '100000',
              statusField: 'rscode',
              url: 'dfr-monitor-service/dfr/mofDivList/query'
            }
          },
          queryparams: {
            fiscalYear: '2023'
          }
        }
      }
    },
    {
      title: '级次',
      field: 'levels',
      width: '8',
      align: 'left',
      formula: '',
      name: '$vxeSelect',
      itemRender: {
        name: '$vxeSelect',
        options: [
          { value: '0', label: '全部' },
          { value: '1', label: '省本级' },
          { value: '2', label: '市本级' },
          { value: '3', label: '县级' }
        ],
        props: {
          placeholder: '级次'
        }
      }
    },
    {
      field: 'income_sort_',
      title: '收入科目（土地出让收入）',
      width: '8',
      itemRender: {
        name: '$formTreeInput',
        props: {
          'placeholder': '收入科目（土地出让收入）',
          type: 'text',
          isleaf: true,
          isServer: true,
          elecode: 'income_sort',
          editConfig: {
            initLoadTree: false
          },
          serverUri: 'mp-b-budget-service/v1/common/budget/elementtree',
          queryparams: {
            eleCode: 'income_sort'
          }
        }
      }
    },
    {
      'title': '当年当月累计最小收入',
      'field': 'minCurrentMonthAmount',
      'width': '8',
      'align': 'left',
      'formula': '',
      'name': '$vxeMoney',
      'itemRender': {
        'name': '$vxeMoney',
        'options': [],
        'defaultValue': '',
        'props': {
          'placeholder': '当年当月累计最小收入'
        }
      },
      'fixed': '',
      'constraint': '',
      'combinedType': '',
      'sortable': '',
      'filters': '',
      'associatedQuery': '',
      'className': ''
    },
    {
      'title': '当年当月累计最大收入',
      'field': 'maxCurrentMonthAmount',
      'width': '8',
      'align': 'left',
      'formula': '',
      'name': '$vxeMoney',
      'itemRender': {
        'name': '$vxeMoney',
        'options': [],
        'defaultValue': '',
        'props': {
          'placeholder': '当年当月累计最大收入'
        }
      },
      'fixed': '',
      'constraint': '',
      'combinedType': '',
      'sortable': '',
      'filters': '',
      'associatedQuery': '',
      'className': ''
    },
    {
      'title': '当年累计一般公共预算最小收入',
      'field': 'minYearBudgetAmount',
      'width': '8',
      'align': 'left',
      'formula': '',
      'name': '$vxeMoney',
      'itemRender': {
        'name': '$vxeMoney',
        'options': [],
        'defaultValue': '',
        'props': {
          'placeholder': '当年累计一般公共预算最小收入'
        }
      },
      'fixed': '',
      'constraint': '',
      'combinedType': '',
      'sortable': '',
      'filters': '',
      'associatedQuery': '',
      'className': ''
    },
    {
      'title': '当年累计一般公共预算最大收入',
      'field': 'maxYearBudgetAmount',
      'width': '8',
      'align': 'left',
      'formula': '',
      'name': '$vxeMoney',
      'itemRender': {
        'name': '$vxeMoney',
        'options': [],
        'defaultValue': '',
        'props': {
          'placeholder': '当年累计一般公共预算最大收入'
        }
      },
      'fixed': '',
      'constraint': '',
      'combinedType': '',
      'sortable': '',
      'filters': '',
      'associatedQuery': '',
      'className': ''
    }
  ],
  highQueryData: {
    fiscalYear: store.state.userInfo.year,
    proCodes: '',
    endTime: ''
  },
  basicInfo: {
    type: 'form',
    tableConfig: {
      globalConfig: {
        // 全局配置
        seq: true, // 序号列
        useMoneyFilter: true
      }
    },
    // 非直辖（省、市、县）
    tableColumnsConfig: [
      {
        'title': '地区名称',
        'type': 'mofDivName',
        'treeNode': true,
        'fixed': 'left',
        'align': 'left',
        'width': 240,
        'field': 'mofDivName',
        'cellRender': {
          'name': '$vxeIcon'
        }
      },
      {
        'title': '区划代码',
        'width': 150,
        'field': 'mofDivCode',
        'filters': true,
        'align': 'right',
        'type': 'mofDivCode',
        'cellRender': {
          'name': '$vxeInput'
        }
      },
      {
        'title': '级次（省、市、县）',
        'min-width': '200px',
        'max-width': '300px',
        'filters': true,
        'field': 'levels',
        'align': 'right',
        'type': 'levels',
        'cellRender': {
          'name': '$vxeInput'
        }
      },
      {
        'title': '收入科目编码（土地出让收入）',
        'width': 260,
        'filters': true,
        'field': 'incomeSortCode',
        'align': 'right',
        'type': 'incomeSortCode',
        'cellRender': {
          'name': '$vxeInput'
        }
      },
      {
        'title': '收入科目名称（土地出让收入）',
        'width': 260,
        'filters': true,
        'field': 'incomeSortName',
        'align': 'right',
        'type': 'incomeSortName',
        'cellRender': {
          'name': '$vxeInput'
        }
      },
      {
        'title': '当年当月累计收入（土地出让收入）',
        'width': 320,
        'field': 'currentMonthAmount',
        'align': 'right',
        'type': 'currentMonthAmount',
        'cellRender': {
          'name': '$vxeMoney'
        },
        'visible': true
      },
      {
        'title': '当年累计一般公共预算收入',
        'field': 'yearBudgetAmount',
        'width': 320,
        'align': 'right',
        'cellRender': {
          'name': '$vxeMoney'
        },
        'visible': true
      }
    ],
    // 直辖（市、区、镇）
    tableColumnsConfigCity: [],
    tableData: []
  }
}
export default function (tableType, configType) {
  if (tableType && configType) {
    return window.deepCopy(proconf[tableType][configType])
  } else if (tableType) {
    return window.deepCopy(proconf[tableType])
  } else {
    return null
  }
}
