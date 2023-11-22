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
      title: '专项资金名称',
      field: 'speTypeName',
      width: '8',
      align: 'left',
      formula: ''
    }
  ],
  highQueryData: {
    speTypeName: ''
  },
  basicInfo: {
    type: 'form',
    tableConfig: {
      globalConfig: {
        // 全局配置
        seq: true // 序号列
        // checkType: 'checkbox'
      }
    },
    tableColumnsConfig: [
      // {
      //   title: '地区名称',
      //   type: 'name',
      //   align: 'left',
      //   sortable: false,
      //   filters: false,
      //   treeNode: true,
      //   width: 260,
      //   field: 'name',
      //   cellRender: { name: '$vxeIcon' }
      // },
      {
        title: '专项资金编码',
        field: 'speTypeCode',
        width: 200,
        // treeNode: true,
        sortable: false,
        filters: true,
        // cellRender: { name: '$vxeIcon' },
        align: 'center',
        cellRender: {
          name: '$vxeInput',
          options: [],
          props: {
            placeholder: '专项资金编码'
          }
        }
      },
      {
        title: '专项资金名称',
        field: 'speTypeName',
        width: 150,
        sortable: false,
        filters: true,
        align: 'center',
        cellRender: {
          name: '$vxeInput',
          options: [],
          props: {
            placeholder: '专项资金名称'
          }
        }
      },
      {
        title: '预算总金额',
        field: 'budgetSum',
        width: 150,
        sortable: true,
        filters: false,
        align: 'center',
        combinedType: [
          'average',
          'subTotal',
          'total',
          'totalAll'
        ],
        cellRender: { name: '$vxeMoney' }
      },
      {
        title: '已下达金额',
        field: 'xdamount',
        width: 150,
        sortable: true,
        filters: false,
        align: 'center',
        combinedType: [
          'average',
          'subTotal',
          'total',
          'totalAll'
        ],
        cellRender: { name: '$vxeMoney' }
      },
      {
        title: '已支付金额',
        field: 'payAppAmt',
        width: 150,
        sortable: true,
        filters: false,
        align: 'center',
        combinedType: [
          'average',
          'subTotal',
          'total',
          'totalAll'
        ],
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
