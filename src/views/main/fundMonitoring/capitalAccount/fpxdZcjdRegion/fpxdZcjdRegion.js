import store from '@/store/index'
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
          // { value: '2020', label: '2020年' },
          // { value: '2021', label: '2021年' },
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
      width: 200,
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
    fiscalYear: store.state.userInfo.year,
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
    tableColumnsConfig: [
      {
        title: '地区名称',
        type: 'name',
        treeNode: true,
        fixed: false,
        align: 'left',
        width: 200,
        field: 'name',
        cellRender: {
          name: '$vxeIcon',
          props: {
            $refs: this
          }
        }
      },
      {
        title: '资金总量',
        field: 'amountTotal',
        width: 100,
        align: 'right',
        cellRender: { name: '$vxeMoney' }
      },
      {
        title: '分配金额',
        field: 'amountFp',
        width: 100,
        align: 'right',
        cellRender: {
          name: '$vxeMoney'
        }
      },
      {
        title: '分配进度',
        field: 'fpjd',
        width: 100,
        align: 'right',
        cellRender: { name: '$vxeRatio' },
        formula: '(({amountTotal}-0==0)?0:({amountFp})*100/{amountTotal})'
      },
      {
        title: '支出金额',
        field: 'amountPay',
        width: 100,
        align: 'right',
        cellRender: {
          name: '$vxeMoney'
        }
      },
      {
        title: '支出进度',
        field: 'zcjd',
        width: 100,
        align: 'right',
        cellRender: { name: '$vxeRatio' },
        formula: '(({amountTotal}-0==0)?0:({amountPay})*100/{amountTotal})'
      },
      {
        title: '短进度',
        field: 'djd',
        width: 100,
        align: 'right',
        cellRender: { name: '$vxeRatio' },
        formula: '(({amountTotal}-0==0)?0:({amountShort})*100/{amountTotal})'
      },
      {
        title: '短支额',
        field: 'amountShort',
        width: 100,
        align: 'right',
        cellRender: {
          name: '$vxeMoney'
        }
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
