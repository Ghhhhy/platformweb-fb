import store from '@/store/index'
// 内蒙1一般公共预算收入当月环比增幅超过50%
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
      'title': '上月最小收入',
      'field': 'minLastMonth',
      'width': '8',
      'align': 'left',
      'formula': '',
      'typeKeyValue': 'LastMonth',
      'name': '$vxeMoney',
      'itemRender': {
        'name': '$vxeMoney',
        'options': [],
        'defaultValue': '',
        'props': {
          'placeholder': '上月最小收入'
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
      'title': '上月最大收入',
      'field': 'maxLastMonth',
      'typeKeyValue': 'LastMonth',
      'width': '8',
      'align': 'left',
      'formula': '',
      'type': 'maxRange',
      'name': '$vxeMoney',
      'itemRender': {
        'name': '$vxeMoney',
        'options': [],
        'defaultValue': '',
        'props': {
          'placeholder': '上月最大收入'
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
      'title': '当月最小收入',
      'field': 'minCurrentMonth',
      'typeKeyValue': 'CurrentMonth',
      'width': '8',
      'align': 'left',
      'formula': '',
      'name': '$vxeMoney',
      'itemRender': {
        'name': '$vxeMoney',
        'options': [],
        'defaultValue': '',
        'props': {
          'placeholder': '当月最小收入'
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
      'title': '当月最大收入',
      'field': 'maxCurrentMonth',
      'typeKeyValue': 'CurrentMonth',
      'width': '8',
      'align': 'left',
      'formula': '',
      'name': '$vxeMoney',
      'itemRender': {
        'name': '$vxeMoney',
        'options': [],
        'defaultValue': '',
        'props': {
          'placeholder': '当月最大收入'
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
      'title': '最小增幅',
      'field': 'minAmplitude',
      'typeKeyValue': 'Amplitude',
      'width': '8',
      'align': 'left',
      'formula': '',
      'name': '$vxeMoney',
      'itemRender': {
        'name': '$vxeMoney',
        'options': [],
        'defaultValue': '',
        'props': {
          'placeholder': '最小增幅'
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
      'title': '最大增幅',
      'field': 'maxAmplitude',
      'typeKeyValue': 'Amplitude',
      'width': '8',
      'align': 'left',
      'formula': '',
      'name': '$vxeMoney',
      'itemRender': {
        'name': '$vxeMoney',
        'options': [],
        'defaultValue': '',
        'props': {
          'placeholder': '最大增幅'
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
        'width': 400,
        'field': 'mofDivName',
        'cellRender': {
          'name': '$vxeIcon'
        }
      },
      {
        'title': '区划代码',
        'width': 300,
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
        'filters': true,
        'field': 'levels',
        'align': 'right',
        'type': 'levels',
        'cellRender': {
          'name': '$vxeInput'
        }
      },
      {
        'title': '当年一般公共预算收入',
        'width': 700,
        'min-width': '600px',
        'max-width': '1200px',
        'align': 'center',
        'children': [
          {
            'title': '上月',
            'width': 250,
            'field': 'lastMonth',
            'align': 'right',
            'type': 'lastMonth',
            'cellRender': {
              'name': '$vxeMoney'
            },
            'visible': true
          },
          {
            'title': '当月',
            'field': 'currentMonth',
            'width': 250,
            'align': 'right',
            'cellRender': {
              'name': '$vxeMoney'
            },
            'visible': true
          },
          {
            'title': '增幅',
            'field': 'amplitude',
            'filters': true,
            'width': 300,
            'align': 'right',
            'formula': 'Math.round(({ currentMonth}-{ lastMonth})/{ lastMonth})',
            'cellRender': {
              'name': '$vxeMoney'
            }
          }
        ]
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
