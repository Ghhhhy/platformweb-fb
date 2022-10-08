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
          { value: '2020', label: '2020年' },
          { value: '2021', label: '2021年' },
          { value: '2022', label: '2022年' }
        ],
        props: {
          placeholder: '业务年度'
        }
      }
    }
  ],
  highQueryData: {
    fiscalYear: ''
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
        title: '地区名称',
        type: 'name',
        align: 'left',
        treeNode: true,
        width: 260,
        sortable: false,
        filters: false,
        field: 'name',
        cellRender: { name: '$vxeIcon' }
      },
      {
        title: '[202]外交支出',
        width: 180,
        field: 'amount202',
        align: 'right',
        sortable: false,
        filters: false,
        cellRender: { name: '$vxeMoney' }
      },
      {
        title: '[203]国防支出',
        width: 180,
        field: 'amount203',
        align: 'right',
        sortable: false,
        filters: false,
        cellRender: { name: '$vxeMoney' }
      },
      {
        title: '[204]公共安全支出',
        width: 180,
        field: 'amount204',
        align: 'right',
        sortable: false,
        filters: false,
        cellRender: { name: '$vxeMoney' }
      },
      {
        title: '[227]预备费',
        width: 180,
        field: 'amount227',
        align: 'right',
        sortable: false,
        filters: false,
        cellRender: { name: '$vxeMoney' }
      },
      {
        title: '[230]转移性支出',
        width: 180,
        field: 'amount230',
        align: 'right',
        sortable: false,
        filters: false,
        cellRender: { name: '$vxeMoney' }
      },
      {
        title: '[232]债务付息支出',
        width: 180,
        field: 'amount232',
        align: 'right',
        sortable: false,
        filters: false,
        cellRender: { name: '$vxeMoney' }
      },
      {
        title: '[233]债务发行费用支出',
        width: 180,
        field: 'amount233',
        align: 'right',
        sortable: false,
        filters: false,
        cellRender: { name: '$vxeMoney' }
      },
      {
        title: '科目为空',
        width: 180,
        field: 'amountnull',
        align: 'right',
        sortable: false,
        filters: false,
        cellRender: { name: '$vxeMoney' }
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
