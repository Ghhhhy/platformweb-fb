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
          { value: '2022', label: '2022年' },
          { value: '2023', label: '2023年' }
        ],
        props: {
          placeholder: '业务年度'
        }
      }
    },
    {
      title: '资金名称',
      field: 'proCodes',
      width: '8',
      align: 'left',
      name: '$vxeTree',
      itemRender: {
        name: '$vxeTree',
        options: [],
        props: {
          config: {
            valueKeys: ['code', 'name', 'id'],
            format: '{name}',
            treeProps: {
              labelFormat: '{code}-{name}', // {code}-{name}
              nodeKey: 'id',
              label: 'label',
              children: 'children'
            },
            placeholder: '资金名称',
            multiple: true,
            readonly: false,
            isleaf: true
          }
        }
      }
    }
  ],
  highQueryData: {
    fiscalYear: '',
    proCodes: ''
  },
  basicInfo: {
    type: 'form',
    tableConfig: {
      globalConfig: {
        // 全局配置
        checkType: 'checkbox',
        seq: true, // 序号列
        useMoneyFilter: true
      }
    },
    tableColumnsConfig: [
      {
        title: '地区',
        type: 'name',
        align: 'left',
        treeNode: true,
        width: 260,
        field: 'name',
        cellRender: { name: '$vxeIcon' }
      },
      {
        title: '待分指标结转',
        width: 200,
        align: 'center',
        children: [
          {
            title: '指标余额',
            field: 'amountdfcur',
            width: 200,
            align: 'right',
            sortable: true,
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '结转金额',
            field: 'amountdfjz',
            width: 200,
            align: 'right',
            sortable: true,
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '结转进度',
            field: 'dfjzjd',
            width: 200,
            sortable: true,
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
            title: '指标余额',
            field: 'amountzfcur',
            width: 200,
            align: 'right',
            sortable: true,
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '结转金额',
            field: 'amountCarry',
            width: 200,
            align: 'right',
            sortable: true,
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '结转进度',
            field: 'zfjzjd',
            width: 200,
            align: 'right',
            sortable: true,
            formula: '({amountzfcur}-0==0)?0:({amountCarry}/{amountzfcur}*100)',
            cellRender: {
              name: '$vxeRatio'
            }
          },
          {
            title: '支出金额',
            field: 'amountPay',
            width: 200,
            align: 'right',
            sortable: true,
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '支出进度',
            field: 'payPro',
            width: 200,
            align: 'right',
            sortable: true,
            formula: '({amountzfcur}-0==0)?0:({amountPay}/{amountzfcur}*100)',
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
