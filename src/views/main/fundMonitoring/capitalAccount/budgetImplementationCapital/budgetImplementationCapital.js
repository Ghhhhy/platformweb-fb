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
      title: '地区',
      field: 'mofDivCodes',
      width: '8',
      align: 'left',
      name: '$vxeTree',
      itemRender: {
        name: '$vxeTree',
        options: [],
        props: {
          defaultCheckedKeys: [],
          config: {
            valueKeys: ['code', 'name', 'id', 'codeFragment'],
            format: '{name}',
            treeProps: {
              labelFormat: '{code}-{name}', // {code}-{name}
              nodeKey: 'id',
              label: 'label',
              children: 'children'
            },
            placeholder: '地区',
            clearable: true,
            multiple: true,
            readonly: false,
            isleaf: true
          }
        }
      }
    },
    // {
    //   title: '开始日期',
    //   field: 'startTime',
    //   width: 200,
    //   align: 'center',
    //   filters: false,
    //   itemRender: {
    //     name: '$vxeTime',
    //     props: {
    //       clearable: true,
    //       // format: 'YYYY-MM-DD', // "当前日期为：YYYY-MM-DD，星期W，为第Q季度，时间为：hh:mm:ss:c"
    //       'value-format': 'yyyy-MM-dd',
    //       type: 'date',
    //       placeholder: '开始日期'
    //     }
    //   }
    // },
    {
      title: '截止日期',
      field: 'endTime',
      width: 200,
      align: 'center',
      filters: false,
      itemRender: {
        name: '$vxeTime',
        props: {
          clearable: true,
          // format: 'YYYY-MM-DD', // "当前日期为：YYYY-MM-DD，星期W，为第Q季度，时间为：hh:mm:ss:c"
          'value-format': 'yyyy-MM-dd 23:59:59',
          type: 'date',
          placeholder: '截止日期'
        }
      }
    }
  ],
  highQueryConfigToSx: [
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
      title: '地区',
      field: 'mofDivCodes',
      width: '8',
      align: 'left',
      name: '$vxeTree',
      itemRender: {
        name: '$vxeTree',
        options: [],
        props: {
          defaultCheckedKeys: [],
          config: {
            valueKeys: ['code', 'name', 'id', 'codeFragment'],
            format: '{name}',
            treeProps: {
              labelFormat: '{code}-{name}', // {code}-{name}
              nodeKey: 'id',
              label: 'label',
              children: 'children'
            },
            placeholder: '地区',
            clearable: true,
            multiple: true,
            readonly: false,
            isleaf: true
          }
        }
      }
    },
    {
      title: '开始日期',
      field: 'startTime',
      width: 200,
      align: 'center',
      filters: false,
      itemRender: {
        name: '$vxeTime',
        props: {
          clearable: true,
          // format: 'YYYY-MM-DD', // "当前日期为：YYYY-MM-DD，星期W，为第Q季度，时间为：hh:mm:ss:c"
          'value-format': 'yyyy-MM-dd',
          type: 'date',
          placeholder: '开始日期'
        }
      }
    },
    {
      title: '结束日期',
      field: 'endTime',
      width: 200,
      align: 'center',
      filters: false,
      itemRender: {
        name: '$vxeTime',
        props: {
          clearable: true,
          // format: 'YYYY-MM-DD', // "当前日期为：YYYY-MM-DD，星期W，为第Q季度，时间为：hh:mm:ss:c"
          'value-format': 'yyyy-MM-dd 23:59:59',
          type: 'date',
          placeholder: '结束日期'
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
    startTime: '',
    endTime: ''
  },
  basicInfo: {
    type: 'form',
    tableConfig: {
      globalConfig: {
        // 全局配置
        seq: true, // 序号列
        useMoneyFilter: true,
        customExportConfig: {
          addUnitColumn: true,
          addReportTitleColumn: true,
          unit: '万元'
        }
      }
    },
    tableColumnsConfig: [
      // {
      //   title: '资金编码',
      //   type: 'code',
      //   fixed: false,
      //   align: 'left',
      //   width: 160,
      //   field: 'code',
      //   visible: false
      // },
      {
        title: '资金名称',
        type: 'name',
        treeNode: true,
        exportVisibleWidth: true,
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
        visible: !store.getters.isSx,
        sortable: true,
        cellRender: { name: '$vxeMoney' }
      },
      {
        title: '中央下达(不含分配下级)',
        width: 100,
        field: 'amountZyxdBhxj',
        align: 'right',
        visible: store.getters.isSx,
        type: 'amountZyxd',
        cellRender: { name: '$vxeMoney' }
      },
      {
        title: '整合',
        width: 200,
        field: 'amountZhje',
        align: 'right',
        type: 'amountZhje',
        sortable: true,
        visible: store.getters.isSx,
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
            formula: $formula('budgetImplementationCapital.amountPayAll')
          },
          {
            title: '进度',
            align: 'right',
            width: 200,
            field: 'jLoad',
            sortable: true,
            formula: $formula('budgetImplementationCapital.jLoad'),
            cellRender: {
              name: '$vxeRatio'
            },
            // 如果用自定义slot 会导致导出导出进度失败 因为陕西需要在超小精度下暂时 故做此处理
            slots: store.getters.isFuJian ? undefined : { // 解决值太小没有展示的问题
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
        width: 200,
        align: 'center',
        children: [
          {
            title: '整合金额',
            width: 100,
            field: 'amountSnjzhje',
            align: 'right',
            type: 'amountSnjzhje',
            cellRender: { name: '$vxeMoney' },
            visible: store.getters.isSx
          },
          {
            title: '中央下达',
            field: 'amountSnjxd',
            width: 100,
            align: 'right',
            cellRender: { name: '$vxeMoney' },
            visible: !(store.getters.isSx || store.getters.isFuJian)// 福建和陕西不要
          },
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
            cellRender: { name: '$vxeMoney' },
            formula: '{amountSnjxd}-{amountSnjbjfp}-{amountSnjxjfp}'
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
            sortable: true,
            formula: $formula('budgetImplementationCapital.sLoad'),
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
            width: 100,
            field: 'amountSjzhje',
            align: 'right',
            type: 'amountSjzhje',
            cellRender: { name: '$vxeMoney' },
            visible: store.getters.isSx
          },
          {
            title: '中央下达',
            field: 'amountSjxd',
            width: 100,
            align: 'right',
            cellRender: { name: '$vxeMoney' },
            visible: !store.getters.isSx && !store.getters.isFuJian
          },
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
            cellRender: { name: '$vxeMoney' },
            formula: '{amountSjxd}-{amountSbjfp}-{amountSxjfp}'
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
            sortable: true,
            formula: $formula('budgetImplementationCapital.aLoad'),
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
            title: '整合金额',
            width: 100,
            field: 'amountXjzhje',
            align: 'right',
            type: 'amountXjzhje',
            cellRender: { name: '$vxeMoney' },
            visible: store.getters.isSx
          },
          {
            title: '中央下达',
            field: 'amountXjxd',
            width: 100,
            align: 'right',
            cellRender: { name: '$vxeMoney' },
            visible: !store.getters.isSx && !store.getters.isFuJian
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
            visible: store.getters.isSx
          },
          {
            title: '已分配',
            field: 'amountXjfp',
            width: 100,
            align: 'right',
            cellRender: { name: '$vxeMoney' },
            visible: !store.getters.isSx
          },
          {
            title: '未分配',
            field: 'amountXjwfp',
            width: 100,
            align: 'right',
            cellRender: { name: '$vxeMoney' },
            formula: '{amountXjxd}-{amountXjfp}'
          },
          {
            title: '已支出',
            field: 'amountXjpay',
            width: 100,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '分配进度',
            field: 'xLoad',
            width: 100,
            align: 'right',
            formula: $formula('budgetImplementationCapital.xLoad'),
            cellRender: {
              name: '$vxeRatio'
            },
            visible: !store.getters.isSx
          }
        ]
      }
    ],
    tableColumnsConfigCity: [
      // {
      //   title: '资金编码',
      //   type: 'code',
      //   fixed: false,
      //   align: 'left',
      //   width: 160,
      //   field: 'code',
      //   visible: false
      // },
      {
        title: '资金名称',
        type: 'name',
        treeNode: true,
        fixed: 'left',
        align: 'left',
        width: 250,
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
        type: 'amountSnjxd',
        sortable: true,
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
        visible: store.getters.isSx
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
            field: 'amountPayAll',
            formula: '{amountSnjpay}+{amountSjpay}+{amountXjpay}'
          },
          {
            title: '进度',
            align: 'right',
            width: 200,
            field: 'jLoad',
            formula: '({amountZyxd2}-0==0)?0:Math.round(({amountPayAll}/{amountZyxd2}*100)*10)/10',
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
            cellRender: { name: '$vxeMoney' },
            visible: store.getters.isSx
          },
          {
            title: '中央下达',
            field: 'amountSnjxd',
            width: 200,
            align: 'right',
            cellRender: { name: '$vxeMoney' },
            visible: !(store.getters.isSx || store.getters.isFuJian)
          },
          {
            title: '分配本级',
            field: 'amountSnjbjfp',
            width: 200,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '分配下级',
            field: 'amountSnjxjfp',
            width: 200,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '未分配',
            field: 'amountSnjwfp',
            width: 200,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
            // formula: '{amountZyxd}-{amountSnjbjfp}-{amountSnjxjfp}'
          },
          {
            title: '本级已支出',
            field: 'amountSnjpay',
            width: 200,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '分配进度',
            field: 'sLoad',
            width: 200,
            align: 'right',
            formula: '({amountZyxd}-0==0)?0:Math.round(({amountSnjbjfp}+{amountSnjxjfp})/{amountZyxd}*100*10)/10',
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
            type: 'amountSjzhje',
            cellRender: { name: '$vxeMoney' },
            visible: store.getters.isSx
          },
          {
            title: '中央下达',
            field: 'amountSjxd',
            width: 100,
            align: 'right',
            cellRender: { name: '$vxeMoney' },
            visible: !(store.getters.isSx || store.getters.isFuJian)
          },
          {
            title: '分配本级',
            field: 'amountSbjfp',
            width: 100,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '分配下级',
            field: 'amountSxjfp',
            width: 100,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '未分配',
            field: 'amountSjwfp',
            width: 100,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
            // formula: '{amountZyxd}-{amountSbjfp}-{amountSxjfp}'
          },
          {
            title: '本级已支出',
            field: 'amountSjpay',
            width: 120,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '分配进度',
            field: 'aLoad',
            width: 100,
            align: 'right',
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
            type: 'amountXjzhje',
            cellRender: { name: '$vxeMoney' },
            visible: !(store.getters.isSx || store.getters.isFuJian)
          },
          {
            title: '中央下达',
            field: 'amountXjxd',
            width: 100,
            align: 'right',
            cellRender: { name: '$vxeMoney' },
            visible: !(store.getters.isSx || store.getters.isFuJian)
          },
          {
            title: '已分配',
            field: 'amountXjfp',
            width: 100,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '未分配',
            field: 'amountXjwfp',
            width: 100,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
            // formula: '{amountZyxd}-{amountXjfp}'
          },
          {
            title: '已支出',
            field: 'amountXjpay',
            width: 100,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '分配进度',
            field: 'xLoad',
            width: 100,
            align: 'right',
            formula: '({amountZyxd}-0==0)?0:Math.round({amountXjfp}/{amountZyxd}*100*10)/10',
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
if (store.getters.isSx) {
  const sxColumns = {
    title: '镇级',
    width: 200,
    align: 'center',
    children: [
      {
        title: '整合金额',
        width: 200,
        field: 'amountZjzhje',
        align: 'right',
        type: 'amountXjzhje',
        sortable: true,
        cellRender: { name: '$vxeMoney' }
      },
      {
        title: '已分配',
        field: 'amountZjfp',
        width: 200,
        align: 'right',
        sortable: true,
        cellRender: { name: '$vxeMoney' }
      },
      {
        title: '未分配',
        field: 'amountZjwfp',
        width: 200,
        align: 'right',
        sortable: true,
        cellRender: { name: '$vxeMoney' }
      },
      {
        title: '已支出',
        field: 'amountZjpay',
        width: 200,
        align: 'right',
        sortable: true,
        cellRender: { name: '$vxeMoney' }
      },
      {
        title: '分配进度',
        field: 'zLoad',
        width: 200,
        align: 'right',
        sortable: true,
        formula: '({amountZjfp}+{amountZjwfp}-0==0)?0:({amountZjfp}/({amountZjfp}+{amountZjwfp})*100)',
        cellRender: {
          name: '$vxeRatio'
        }
      }
    ]
  }
  proconf.basicInfo.tableColumnsConfig = proconf.basicInfo.tableColumnsConfig.concat(sxColumns)
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
