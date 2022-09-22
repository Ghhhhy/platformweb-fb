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
        title: '地区',
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
        title: '待分指标结转',
        width: 200,
        align: 'center',
        children: [
          {
            title: '指标金额',
            field: 'amountdfcur',
            width: 200,
            sortable: false,
            filters: false,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '结转金额',
            field: 'amountdfjz',
            width: 200,
            sortable: false,
            filters: false,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '结转进度',
            field: 'dfjzjd',
            sortable: false,
            filters: false,
            width: 200,
            align: 'right',
            formula: '({amountdfcur}-0==0)?0:({amountdfjz}/{amountdfcur}*100)',
            cellRender: {
              name: '$vxeRatio'
            }
          }
        ]
      },
      {
        title: '国库集中支付结余',
        width: 200,
        align: 'center',
        children: [
          {
            title: '指标金额',
            field: 'amountzfcur',
            sortable: false,
            filters: false,
            width: 200,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '结转金额',
            field: 'amountCarry',
            sortable: false,
            filters: false,
            width: 200,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '结转进度',
            field: 'zfjzjd',
            sortable: false,
            filters: false,
            width: 200,
            align: 'right',
            formula: '({amountzfcur}-0==0)?0:({amountCarry}/{amountzfcur}*100)',
            cellRender: {
              name: '$vxeRatio'
            }
          },
          {
            title: '支出金额',
            sortable: false,
            filters: false,
            field: 'amountpay',
            width: 200,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '支出进度',
            field: 'payPro',
            sortable: false,
            filters: false,
            width: 200,
            align: 'right',
            formula: '({amountzfcur}-0==0)?0:({amountpay}/{amountzfcur}*100)',
            cellRender: {
              name: '$vxeRatio'
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
