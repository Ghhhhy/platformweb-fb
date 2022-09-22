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
        title: '地区/项目',
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
        title: '上年',
        width: 200,
        align: 'center',
        children: [
          {
            title: '指标金额',
            field: 'amountBgt',
            sortable: false,
            filters: false,
            width: 200,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '支出金额',
            field: 'amountPay',
            sortable: false,
            filters: false,
            width: 200,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '指标余额',
            field: 'aAmount11',
            width: 200,
            sortable: false,
            filters: false,
            align: 'right',
            formula: '{amountBgt}-{amountPay}',
            cellRender: {
              name: '$vxeMoney'
            }
          }
        ]
      },
      {
        title: '当年',
        width: 200,
        align: 'center',
        children: [
          {
            title: '结转金额',
            field: 'amountCurCarry',
            sortable: false,
            filters: false,
            width: 200,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '支出金额',
            field: 'amountCurPay',
            width: 200,
            align: 'right',
            sortable: false,
            filters: false,
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '指标金额',
            field: 'aAmount1',
            sortable: false,
            filters: false,
            width: 200,
            formula: '{amountCurCarry}-{amountCurPay}',
            align: 'right',
            cellRender: {
              name: '$vxeMoney'
            }
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
