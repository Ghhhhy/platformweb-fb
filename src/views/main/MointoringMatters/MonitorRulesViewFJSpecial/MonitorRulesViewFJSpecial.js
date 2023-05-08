// import store from '@/store/index'
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
      title: '业务年度',
      field: 'fiscalYear',
      width: '8',
      align: 'left',
      formula: '',
      name: '$vxeSelect',
      itemRender: {
        name: '$vxeSelect',
        options: [
          // // { value: '2020', label: '2020年' },
          // // { value: '2021', label: '2021年' },
          { value: '2022', label: '2022年' },
          { value: '2023', label: '2023年' }
        ],
        props: {
          placeholder: '业务年度'
        }
      }
    },
    {
      title: '截止日期',
      field: 'endTime',
      width: 100,
      align: 'center',
      filters: false,
      itemRender: {
        name: '$vxeTime',
        props: {
          format: 'YYYY-MM-DD', // "当前日期为：YYYY-MM-DD，星期W，为第Q季度，时间为：hh:mm:ss:c"
          type: 'date',
          placeholder: '截止日期'
        }
      }
    }
  ],
  highQueryData: {
    fiscalYear: '2022',
    mofDivCodes: '',
    endTime: ''
  },
  basicInfo: {
    type: 'form',
    tableConfig: {
      globalConfig: {
        // 全局配置
        seq: true // 序号列
      }
    },
    tableColumnsConfig: [
      {
        title: '规则分类',
        type: 'ruleType',
        align: 'left',
        valign: 'top',
        width: 150,
        field: 'ruleType',
        sortable: 'true'
      },
      {
        title: '规则名称',
        width: 180,
        field: 'ruleName',
        align: 'left',
        valign: 'top',
        type: 'ruleName',
        sortable: 'true'
      },
      {
        title: '规则描述',
        width: 300,
        field: 'ruleDes',
        valign: 'top',
        align: 'left',
        type: 'ruleDes',
        sortable: 'true'
      },
      {
        title: '规则依据',
        width: 450,
        field: 'ruleBasis',
        align: 'left',
        valign: 'top',
        type: 'ruleBasis',
        sortable: 'true'
      },
      {
        title: '试用范围',
        width: 150,
        field: 'ruleRange',
        align: 'left',
        valign: 'top',
        type: 'ruleRange',
        sortable: 'true'
      },
      {
        title: '预警白名单',
        width: 300,
        align: 'left',
        valign: 'top',
        children: [
          {
            title: '描述',
            width: 300,
            field: 'des',
            align: 'left',
            valign: 'top',
            type: 'des',
            sortable: 'true',
            cellRender: { name: '$textarea' }
          },
          {
            title: '依据',
            field: 'basis',
            width: 400,
            align: 'left',
            valign: 'top',
            sortable: 'true',
            cellRender: { name: '$textarea' }
          }
        ]
      }
    ],
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
