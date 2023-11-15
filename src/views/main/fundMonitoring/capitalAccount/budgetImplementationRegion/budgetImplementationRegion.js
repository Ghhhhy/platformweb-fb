import store from '@/store/index'
import { $formula } from '@/hooks/useFormula/useFormula'
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
      visible: !store.getters.isFuJian,
      itemRender: {
        name: '$vxeInput',
        // options: [
        //   // { value: '2020', label: '2020年' },
        //   // { value: '2021', label: '2021年' },
        //   { value: '2022', label: '2022年' },
        //   { value: '2023', label: '2023年' }
        // ],
        props: {
          clearable: true,
          type: 'year',
          valueFormat: 'yyyy',
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
            clearable: true,
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
      width: 100,
      align: 'center',
      filters: false,
      itemRender: {
        name: '$vxeTime',
        props: {
          clearable: true,
          format: 'YYYY-MM-DD', // "当前日期为：YYYY-MM-DD，星期W，为第Q季度，时间为：hh:mm:ss:c"
          type: 'date',
          placeholder: '截止日期'
        }
      }
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
      // {
      //   title: '地区编码',
      //   type: 'code',
      //   treeNode: true,
      //   align: 'left',
      //   width: 260,
      //   field: 'name',
      //   cellRender: {
      //     name: '$vxeIcon'
      //   },
      //   visible: false
      // },
      {
        title: '地区名称',
        type: 'name',
        treeNode: true,
        align: 'left',
        fixed: 'left',
        width: 200,
        field: 'name',
        cellRender: {
          name: '$vxeIcon'
        }
      },
      {
        title: '中央下达',
        width: 100,
        field: 'amountZyxd',
        align: 'right',
        type: 'amountZyxd',
        cellRender: { name: '$vxeMoney' }
      },
      {
        title: '中央下达(不含分配下级)',
        width: 100,
        field: 'amountZyxdBhxj',
        visible: store.getters.isSx,
        align: 'right',
        type: 'amountZyxd',
        cellRender: { name: '$vxeMoney' }
      },
      {
        title: '整合',
        width: 100,
        field: 'amountZhje',
        align: 'right',
        type: 'amountZhje',
        cellRender: { name: '$vxeMoney' },
        visible: false
      },
      {
        title: '支出',
        width: 260,
        align: 'center',
        children: [
          {
            title: '金额',
            align: 'right',
            width: 100,
            field: 'amountPayAll',
            formula: $formula('budgetImplementationRegion.amountPayAll'),
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '进度',
            align: 'right',
            width: 100,
            field: 'jLoad',
            formula: $formula('budgetImplementationRegion.jLoad'),
            cellRender: {
              name: '$vxeRatio'
            },
            slots: { // 解决值太小没有展示的问题
              default({ row }) {
                let amount1 = parseFloat(row.amountZyxd || 0)
                if (store.getters.isSx) {
                  amount1 = parseFloat(row.amountZyxdBhxj || 0)
                }
                let amount5 = parseFloat(row.amountPayAll || 0)
                let culAmount = amount1
                let culAmount2 = (amount5 / culAmount * 100)
                let precision = 1
                if (store.getters.isSx) {
                  precision = 2
                }
                return [
                  <div>{culAmount && culAmount2.toFixed(precision)}%</div>
                ]
              }
            }
          }
        ]
      },
      {
        title: '省级',
        width: 100,
        align: 'center',
        children: [
          {
            title: '整合金额',
            width: 120,
            field: 'amountSnjzhje',
            align: 'right',
            areaType: 'province',
            type: 'amountSnjzhje',
            cellRender: { name: '$vxeMoney' },
            visible: store.getters.isSx
          },
          {
            title: '中央下达',
            field: 'amountSnjxd',
            width: 120,
            areaType: 'province',
            align: 'right',
            cellRender: { name: '$vxeMoney' },
            visible: false
          },
          {
            title: '分配本级',
            field: 'amountSnjbjfp',
            width: 120,
            areaType: 'province',
            align: 'right',
            sortable: true,
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '分配下级',
            field: 'amountSnjxjfp',
            width: 120,
            areaType: 'province',
            align: 'right',
            sortable: true,
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '未分配',
            field: 'amountSnjwfp',
            width: 120,
            areaType: 'province',
            align: 'right',
            sortable: true,
            cellRender: { name: '$vxeMoney' },
            formula: '{amountSnjxd}-{amountSnjbjfp}-{amountSnjxjfp}'
          },
          {
            title: '本级已支出',
            field: 'amountSnjpay',
            width: 160,
            areaType: 'province',
            align: 'right',
            sortable: true,
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '分配进度',
            field: 'sLoad',
            width: 160,
            areaType: 'province',
            align: 'right',
            formula: $formula('budgetImplementationRegion.sLoad'),
            cellRender: {
              name: '$vxeRatio'
            }
          }
        ]
      },
      {
        title: '市级',
        width: 100,
        align: 'center',
        children: [
          {
            title: '整合金额',
            width: 120,
            field: 'amountSjzhje',
            align: 'right',
            areaType: 'city',
            type: 'amountSjzhje',
            sortable: true,
            cellRender: { name: '$vxeMoney' },
            visible: store.getters.isSx
          },
          {
            title: '中央下达',
            field: 'amountSjxd',
            width: 120,
            align: 'right',
            areaType: 'city',
            cellRender: { name: '$vxeMoney' },
            visible: false
          },
          {
            title: '分配本级',
            field: 'amountSbjfp',
            width: 120,
            areaType: 'city',
            align: 'right',
            sortable: true,
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '分配下级',
            field: 'amountSxjfp',
            width: 120,
            areaType: 'city',
            align: 'right',
            sortable: true,
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '未分配',
            field: 'amountSjwfp',
            width: 120,
            areaType: 'city',
            align: 'right',
            sortable: true,
            cellRender: { name: '$vxeMoney' },
            formula: '{amountSjxd}-{amountSbjfp}-{amountSxjfp}'
          },
          {
            title: '本级已支出',
            field: 'amountSjpay',
            width: 140,
            areaType: 'city',
            align: 'right',
            sortable: true,
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '分配进度',
            field: 'aLoad',
            width: 120,
            areaType: 'city',
            align: 'right',
            formula: $formula('budgetImplementationRegion.aLoad'),
            cellRender: {
              name: '$vxeRatio'
            }
          }
        ]
      },
      {
        title: '县级',
        width: 100,
        align: 'center',
        children: [
          {
            title: '整合金额',
            width: 120,
            field: 'amountXjzhje',
            align: 'right',
            areaType: 'county',
            type: 'amountXjzhje',
            sortable: true,
            visible: store.getters.isSx,
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '中央下达',
            field: 'amountXjxd',
            width: 120,
            areaType: 'county',
            align: 'right',
            cellRender: { name: '$vxeMoney' },
            visible: false
          },
          {
            title: '分配本级',
            field: 'amountXbjfp',
            width: 120,
            areaType: 'county',
            align: 'right',
            sortable: true,
            cellRender: { name: '$vxeMoney' },
            visible: store.getters.isSx
          },
          {
            title: '分配下级',
            field: 'amountXxjfp',
            width: 120,
            areaType: 'county',
            align: 'right',
            sortable: true,
            cellRender: { name: '$vxeMoney' },
            visible: !store.getters.isFuJian
          },
          {
            title: '已分配',
            field: 'amountXjfp',
            width: 100,
            align: 'right',
            cellRender: { name: '$vxeMoney' },
            visible: store.getters.isFuJian
          },
          {
            title: '未分配',
            field: 'amountXjwfp',
            width: 120,
            areaType: 'county',
            align: 'right',
            sortable: true,
            cellRender: { name: '$vxeMoney' },
            formula: '{amountXjxd}-{amountXjfp}'
          },
          {
            title: '已支出',
            field: 'amountXjpay',
            width: 120,
            areaType: 'county',
            align: 'right',
            sortable: true,
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '分配进度',
            field: 'xLoad',
            width: 120,
            areaType: 'county',
            align: 'right',
            formula: $formula('budgetImplementationRegion.xLoad'),
            cellRender: {
              name: '$vxeRatio'
            }
          }
        ]
      },
      {
        title: '镇级',
        width: 100,
        align: 'center',
        visible: store.getters.isSx,
        children: store.getters.isSx && [
          {
            title: '整合金额',
            width: 120,
            field: 'amountZjzhje',
            align: 'right',
            areaType: 'town',
            type: 'amountXjzhje',
            sortable: true,
            visible: store.getters.isSx,
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '已分配',
            field: 'amountZjfp',
            width: 120,
            areaType: 'town',
            align: 'right',
            sortable: true,
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '未分配',
            field: 'amountZjwfp',
            width: 120,
            areaType: 'town',
            align: 'right',
            sortable: true,
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '已支出',
            field: 'amountZjpay',
            width: 120,
            areaType: 'town',
            align: 'right',
            sortable: true,
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '分配进度',
            field: 'zLoad',
            width: 120,
            areaType: 'town',
            align: 'right',
            formula: '({amountZjfp}+{amountZjwfp}-0==0)?0:({amountZjfp}/({amountZjfp}+{amountZjwfp})*100)',
            cellRender: {
              name: '$vxeRatio'
            }
          }
        ]
      }
    ],
    // 直辖（市、区、镇）
    tableColumnsConfigCity: [
      // {
      //   title: '地区编码',
      //   type: 'code',
      //   treeNode: true,
      //   align: 'left',
      //   width: 260,
      //   field: 'name',
      //   cellRender: {
      //     name: '$vxeIcon'
      //   },
      //   visible: false
      // },
      {
        title: '地区名称',
        type: 'name',
        treeNode: true,
        fixed: 'left',
        align: 'left',
        width: 260,
        field: 'name',
        cellRender: {
          name: '$vxeIcon'
        }
      },
      {
        title: '中央下达',
        width: 200,
        field: 'amountZyxd',
        align: 'right',
        type: 'amountZyxd',
        cellRender: { name: '$vxeMoney' }
      },
      {
        title: '中央下达（不含分配下级）',
        width: 200,
        field: 'amountZyxd2',
        align: 'right',
        type: 'amountZyxd',
        cellRender: { name: '$vxeMoney' }
      },
      {
        title: '整合',
        width: 200,
        field: 'amountZhje',
        align: 'right',
        type: 'amountZhje',
        cellRender: { name: '$vxeMoney' },
        visible: false
      },
      {
        title: '支出',
        width: 260,
        align: 'center',
        children: [
          {
            title: '金额',
            align: 'right',
            cellRender: { name: '$vxeMoney' },
            width: 200,
            sortable: true,
            field: 'amountPayAll',
            formula: '{amountSnjpay}+{amountSjpay}+{amountXjpay}'
          },
          {
            title: '进度',
            align: 'right',
            width: 200,
            field: 'jLoad',
            formula: '({amountZyxd2}-0==0)?0:Math.round(({amountPayAll}/{amountZyxd2}*100*10)/10)',
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
            title: '整合金额',
            width: 200,
            field: 'amountSnjzhje',
            align: 'right',
            type: 'amountSnjzhje',
            areaType: 'city',
            cellRender: { name: '$vxeMoney' },
            visible: store.getters.isSx
          },
          {
            title: '中央下达',
            field: 'amountSnjxd',
            width: 200,
            align: 'right',
            areaType: 'city',
            cellRender: { name: '$vxeMoney' },
            visible: false
          },
          {
            title: '分配本级',
            field: 'amountSnjbjfp',
            width: 200,
            align: 'right',
            areaType: 'city',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '分配下级',
            field: 'amountSnjxjfp',
            width: 200,
            align: 'right',
            areaType: 'city',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '未分配',
            field: 'amountSnjwfp',
            width: 200,
            align: 'right',
            areaType: 'city',
            cellRender: { name: '$vxeMoney' }
            // formula: '{amountZyxd}-{amountSnjbjfp}-{amountSnjxjfp}'
          },
          {
            title: '本级已支出',
            field: 'amountSnjpay',
            width: 200,
            align: 'right',
            areaType: 'city',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '分配进度',
            field: 'sLoad',
            width: 200,
            align: 'right',
            areaType: 'city',
            formula: '({amountZyxd}-0==0)?0:Math.round(({amountSnjbjfp}+{amountSnjxjfp})/{amountZyxd}*100*10)/10',
            // formula: '({amountZyxd}-0==0)?0:Number(({amountSnjbjfp}+{amountSnjxjfp})/{amountZyxd}*100).toFixed(1)',
            cellRender: {
              name: '$vxeRatio'
            }
          }
        ]
      },
      {
        title: '区级',
        width: 100,
        align: 'center',
        children: [
          {
            title: '整合金额',
            width: 100,
            field: 'amountSjzhje',
            align: 'right',
            areaType: 'region',
            type: 'amountSjzhje',
            cellRender: { name: '$vxeMoney' },
            visible: store.getters.isSx
          },
          {
            title: '中央下达',
            field: 'amountSjxd',
            width: 100,
            align: 'right',
            areaType: 'region',
            cellRender: { name: '$vxeMoney' },
            visible: false
          },
          {
            title: '分配本级',
            field: 'amountSbjfp',
            width: 100,
            align: 'right',
            areaType: 'region',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '分配下级',
            field: 'amountSxjfp',
            width: 100,
            align: 'right',
            areaType: 'region',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '未分配',
            field: 'amountSjwfp',
            width: 100,
            align: 'right',
            areaType: 'region',
            cellRender: { name: '$vxeMoney' }
            // formula: '{amountZyxd}-{amountSbjfp}-{amountSxjfp}'
          },
          {
            title: '本级已支出',
            field: 'amountSjpay',
            width: 120,
            areaType: 'region',
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '分配进度',
            field: 'aLoad',
            width: 100,
            align: 'right',
            areaType: 'region',
            formula: '({amountZyxd}-0==0)?0:Math.round(({amountSbjfp}+{amountSxjfp})/{amountZyxd}*100*10)/10',
            cellRender: {
              name: '$vxeRatio'
            }
          }
        ]
      },
      {
        title: '镇级',
        width: 100,
        align: 'center',
        children: [
          {
            title: '整合金额',
            width: 100,
            field: 'amountXjzhje',
            align: 'right',
            areaType: 'town',
            type: 'amountXjzhje',
            cellRender: { name: '$vxeMoney' },
            visible: store.getters.isSx
          },
          {
            title: '中央下达',
            field: 'amountXjxd',
            width: 100,
            align: 'right',
            areaType: 'town',
            cellRender: { name: '$vxeMoney' },
            visible: false
          },
          {
            title: '已分配',
            field: 'amountXjfp',
            width: 100,
            align: 'right',
            areaType: 'town',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '未分配',
            field: 'amountXjwfp',
            width: 100,
            align: 'right',
            areaType: 'town',
            cellRender: { name: '$vxeMoney' }
            // formula: '{amountZyxd}-{amountXjfp}'
          },
          {
            title: '已支出',
            field: 'amountXjpay',
            width: 100,
            align: 'right',
            areaType: 'town',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '分配进度',
            field: 'xLoad',
            width: 100,
            align: 'right',
            areaType: 'town',
            formula: '({amountZyxd}-0==0)?0:Math.round(({amountXjfp}/{amountZyxd}*100)*10)/10',
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
