import store from '@/store/index'
// 内蒙7税收占比小于80%
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
      field: 'mofDivCodes',
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
      title: '月份',
      field: 'month',
      width: '8',
      align: 'left',
      formula: '',
      name: '$vxeSelect',
      itemRender: {
        name: '$vxeSelect',
        options: [
          { value: '1', label: '一月' },
          { value: '2', label: '二月' },
          { value: '3', label: '三月' },
          { value: '4', label: '四月' },
          { value: '5', label: '五月' },
          { value: '6', label: '六月' },
          { value: '7', label: '七月' },
          { value: '8', label: '八月' },
          { value: '9', label: '九月' },
          { value: '10', label: '十月' },
          { value: '11', label: '十一月' },
          { value: '12', label: '十二月' }
        ],
        props: {
          placeholder: '月份'
        }
      }
    },
    {
      'title': '当年当月累计最小收入',
      'field': 'minCurrentMonthAmount',
      'typeKeyValue': 'CurrentMonthAmount',
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
      'typeKeyValue': 'CurrentMonthAmount',
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
      'title': '上年同期累计最小收入',
      'field': 'minLastCurrentMonthAmount',
      'typeKeyValue': 'LastCurrentMonthAmount',
      'width': '8',
      'align': 'left',
      'formula': '',
      'name': '$vxeMoney',
      'itemRender': {
        'name': '$vxeMoney',
        'options': [],
        'defaultValue': '',
        'props': {
          'placeholder': '上年同期累计最小收入'
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
      'title': '上年同期累计最大收入',
      'field': 'maxLastCurrentMonthAmount',
      'typeKeyValue': 'LastCurrentMonthAmount',
      'width': '8',
      'align': 'left',
      'formula': '',
      'name': '$vxeMoney',
      'itemRender': {
        'name': '$vxeMoney',
        'options': [],
        'defaultValue': '',
        'props': {
          'placeholder': '上年同期累计最大收入'
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
      'title': '最小占比',
      'field': 'minProportion',
      'typeKeyValue': 'Proportion',
      'width': '8',
      'align': 'left',
      'formula': '',
      'name': '$vxeMoney',
      'itemRender': {
        'name': '$vxeMoney',
        'options': [],
        'defaultValue': '',
        'props': {
          'placeholder': '最小占比'
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
      'title': '最大占比',
      'field': 'maxProportion',
      'typeKeyValue': 'Proportion',
      'width': '8',
      'align': 'left',
      'formula': '',
      'name': '$vxeMoney',
      'itemRender': {
        'name': '$vxeMoney',
        'options': [],
        'defaultValue': '',
        'props': {
          'placeholder': '最大占比'
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
        'type': 'name',
        'treeNode': true,
        'fixed': 'left',
        'align': 'left',
        'width': 400,
        'field': 'name',
        'cellRender': {
          'name': '$vxeIcon'
        }
      },
      {
        'title': '区划代码',
        'width': 200,
        'field': 'code',
        'filters': true,
        'fixed': 'left',
        'align': 'left',
        'type': 'code',
        'cellRender': {
          'name': '$vxeInput'
        }
      },
      {
        'title': '级次（省、市、县）',
        'filters': true,
        'field': 'levels',
        'fixed': 'left',
        'align': 'left',
        'type': 'levels',
        'cellRender': {
          'name': '$vxeInput'
        }
      },
      {
        'title': '当年当月累计收入（税收收入二级科目）',
        'width': 350,
        'field': 'amountCurrentMonth',
        'align': 'right',
        'type': 'amountCurrentMonth',
        'cellRender': {
          'name': '$vxeMoney'
        },
        'visible': true
      },
      {
        'title': '上年同期累计收入（税收收入二级科目）',
        'field': 'amountLastMonth',
        'width': 350,
        'align': 'right',
        'cellRender': {
          'name': '$vxeMoney'
        },
        'visible': true
      },
      {
        'title': '占比',
        'field': 'proportion',
        'filters': true,
        'width': 200,
        'align': 'right',
        'cellRender': {
          'name': '$vxeMoney'
        }
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
