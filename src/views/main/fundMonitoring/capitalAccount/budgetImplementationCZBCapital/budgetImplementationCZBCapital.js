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
    // {
    //   title: '业务年度',
    //   field: 'fiscalYear',
    //   width: '8',
    //   align: 'left',
    //   formula: '',
    //   name: '$vxeSelect',
    //   itemRender: {
    //     name: '$vxeSelect',
    //     options: [
    //       { value: '2022', label: '2022年' },
    //       { value: '2023', label: '2023年' }
    //     ],
    //     defaultValue: store.state?.userInfo?.year,
    //     props: {
    //       placeholder: '业务年度'
    //     }
    //   }
    // },
    {
      title: '地区',
      field: 'mofDivCodes',
      width: '8',
      align: 'left',
      name: '$vxeTree',
      itemRender: {
        name: '$vxeTree',
        options: [],
        props: {
          defaultCheckedKeys: [store.state?.userInfo?.province],
          config: {
            valueKeys: ['code', 'name', 'id'],
            format: '{name}',
            treeProps: {
              labelFormat: '{code}-{name}', // {code}-{name}
              nodeKey: 'code',
              label: 'name',
              children: 'children'
            },
            placeholder: '地区',
            multiple: true,
            readonly: false,
            isleaf: true
          }
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
    fiscalYear: store.state?.userInfo?.year,
    mofDivCodes: [],
    mofDivCodes_code__multiple: [],
    mofDivCodes_code: store.state?.userInfo?.province,
    mofDivCodes_name: store.state?.userInfo?.admdivname,
    endTime: ''
  },
  basicInfo: {
    type: 'form',
    tableConfig: {
      globalConfig: {
        // 全局配置
        checkType: 'checkbox',
        seq: false, // 序号列
        useMoneyFilter: true
      }
    },
    tableColumnsConfig: [
      {
        title: '资金名称',
        type: 'name',
        treeNode: true,
        fixed: 'left',
        align: 'left',
        width: 160,
        field: 'name',
        cellRender: {
          name: '$vxeIcon',
          props: {
            $refs: this
          }
        }
      },
      {
        title: '中央下达',
        width: 200,
        field: 'amountZyxd',
        align: 'right',
        type: 'amountZyxd',
        formula: '{amountSnjxd}+{amountSjxd}+{amountXjxd}',
        sortable: true,
        cellRender: { name: '$vxeMoney' }
      },
      {
        title: '支出',
        width: 260,
        align: 'center',
        children: [
          {
            title: '金额',
            align: 'right',
            sortable: true,
            cellRender: { name: '$vxeMoney' },
            width: 200,
            field: 'amountPayAll',
            formula: '{amountSnjpay}+{amountSjpay}+{amountXjpay}'
          },
          {
            title: '进度',
            align: 'right',
            width: 200,
            field: 'jLoad',
            formula: '(({amountSnjxd}+{amountSjxd}+{amountXjxd})-0==0)?0:({amountPayAll}/({amountSnjxd}+{amountSjxd}+{amountXjxd})*100)',
            cellRender: {
              name: '$vxeRatio'
            }
          }
        ]
      },
      {
        title: '省级',
        width: 200,
        align: 'center',
        children: [
          {
            title: '分配本级',
            field: 'amountSnjbjfp',
            width: 200,
            align: 'right',
            sortable: true,
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '分配下级',
            field: 'amountSnjxjfp',
            width: 200,
            align: 'right',
            sortable: true,
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '未分配',
            field: 'amountSnjwfp',
            width: 200,
            align: 'right',
            sortable: true,
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '本级已支出',
            field: 'amountSnjpay',
            width: 200,
            align: 'right',
            sortable: true,
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '分配进度',
            field: 'sLoad',
            width: 200,
            align: 'right',
            formula: '({amountSnjxd}+{amountSnjxjfp}-0==0)?0:(({amountSnjbjfp}+{amountSnjxjfp})/({amountSnjxd}+{amountSnjxjfp})*100)',
            cellRender: {
              name: '$vxeRatio'
            }
          }
        ]
      },
      {
        title: '市级',
        width: 200,
        align: 'center',
        children: [
          {
            title: '分配本级',
            field: 'amountSbjfp',
            width: 200,
            align: 'right',
            sortable: true,
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '分配下级',
            field: 'amountSxjfp',
            width: 200,
            align: 'right',
            sortable: true,
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '未分配',
            field: 'amountSjwfp',
            width: 200,
            align: 'right',
            sortable: true,
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '本级已支出',
            field: 'amountSjpay',
            width: 200,
            align: 'right',
            sortable: true,
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '分配进度',
            field: 'aLoad',
            width: 200,
            align: 'right',
            formula: '({amountSjxd}+{amountSxjfp}-0==0)?0:(({amountSbjfp}+{amountSxjfp})/({amountSjxd}+{amountSxjfp})*100)',
            cellRender: {
              name: '$vxeRatio'
            }
          }
        ]
      },
      {
        title: '县级',
        width: 200,
        align: 'center',
        children: [
          {
            title: '已分配',
            field: 'amountXjfp',
            width: 200,
            align: 'right',
            sortable: true,
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '未分配',
            field: 'amountXjwfp',
            width: 200,
            align: 'right',
            sortable: true,
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '已支出',
            field: 'amountXjpay',
            width: 200,
            align: 'right',
            sortable: true,
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '分配进度',
            field: 'xLoad',
            width: 200,
            align: 'right',
            formula: '({amountXjfp}+{amountXjwfp}-0==0)?0:(({amountXjfp})/({amountXjfp}+{amountXjwfp})*100)',
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
