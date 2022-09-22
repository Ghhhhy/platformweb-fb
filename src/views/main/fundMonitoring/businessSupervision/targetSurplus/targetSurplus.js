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
      { code: 'bore', label: '口径说明', status: 'primary' },
      { code: 'export', label: '导出', status: 'primary' }
    ]
  },
  statusRightToolBarButtonByBusDept: {
    '1': [
      { code: 'bore', label: '口径说明', status: 'primary' },
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
        sortable: false,
        filters: false,
        width: 260,
        field: 'name',
        cellRender: { name: '$vxeIcon' }
      },
      {
        title: '直达资金',
        width: 200,
        align: 'center',
        children: [
          {
            title: '数量',
            field: 'numberz',
            width: 200,
            sortable: false,
            filters: false,
            align: 'right'
          },
          {
            title: '余额',
            field: 'amountz',
            width: 200,
            sortable: false,
            filters: false,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          }
        ]
      },
      {
        title: '参照资金',
        width: 200,
        align: 'center',
        children: [
          {
            title: '数量',
            field: 'numberc',
            width: 200,
            sortable: false,
            filters: false,
            align: 'right'
          },
          {
            title: '余额',
            field: 'amountc',
            width: 200,
            sortable: false,
            filters: false,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
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
