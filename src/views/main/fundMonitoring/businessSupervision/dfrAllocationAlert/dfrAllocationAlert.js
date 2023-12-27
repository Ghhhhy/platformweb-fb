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
    //   itemRender: {
    //     name: '$vxeInput',
    //     // options: [
    //     //   // { value: '2020', label: '2020年' },
    //     //   // { value: '2021', label: '2021年' },
    //     //   { value: '2022', label: '2022年' },
    //     //   { value: '2023', label: '2023年' }
    //     // ],
    //     props: {
    //       type: 'year',
    //       valueFormat: 'yyyy',
    //       placeholder: '业务年度'
    //     }
    //   }
    // }
  ],
  highQueryData: {
    fiscalYear: store.state?.userInfo?.year
  },
  basicInfo: {
    type: 'form',
    tableConfig: {
      globalConfig: {
        // 全局配置
        seq: true, // 序号列
        useMoneyFilter: true,
        checkType: 'checkbox'
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
        title: '专项资金目录编码',
        field: 'speTypeCode',
        width: 120,
        sortable: true,
        filters: true,
        align: 'center',
        cellRender: {
          name: '$vxeInput',
          options: [],
          props: {
            placeholder: '专项资金目录编码'
          }
        }
      },
      {
        title: '专项资金目录名称',
        field: 'speTypeName',
        width: 120,
        sortable: true,
        filters: true,
        align: 'center',
        cellRender: {
          name: '$vxeInput',
          options: [],
          props: {
            placeholder: '专项资金目录编码'
          }
        }
      },
      {
        title: '下达区划编码',
        field: 'xdRecDivCode',
        width: 120,
        sortable: false,
        filters: true,
        align: 'center',
        cellRender: {
          name: '$vxeInput',
          options: [],
          props: {
            placeholder: '下达区划编码'
          }
        }
      },
      {
        title: '下达区划名称',
        field: 'xdRecDivName',
        width: 120,
        sortable: false,
        filters: true,
        align: 'center',
        cellRender: {
          name: '$vxeInput',
          options: [],
          props: {
            placeholder: '下达区划名称'
          }
        }
      },
      {
        title: '指标文号',
        field: 'corBgtDocNo',
        width: 120,
        sortable: true,
        filters: true,
        align: 'center',
        cellRender: {
          name: '$vxeInput',
          options: [],
          props: {
            placeholder: '指标文号'
          }
        }
      },
      {
        title: '项目编码',
        field: 'proCode',
        width: 120,
        sortable: true,
        filters: true,
        align: 'center',
        cellRender: {
          name: '$vxeInput',
          options: [],
          props: {
            placeholder: '项目编码'
          }
        }
      },
      {
        title: '项目名称',
        field: 'proName',
        width: 120,
        sortable: true,
        filters: true,
        align: 'center',
        cellRender: {
          name: '$vxeInput',
          options: [],
          props: {
            placeholder: '项目名称'
          }
        }
      },
      {
        title: '下达金额',
        field: 'amount',
        width: 120,
        sortable: true,
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
        title: '下达时间',
        field: 'xdTime',
        width: 120,
        sortable: true,
        filters: false,
        align: 'center',
        cellRender: {
          name: '$vxeInput',
          options: [],
          props: {
            placeholder: '下达时间'
          }
        }
      },
      {
        title: '登记时间',
        field: 'djTime',
        width: 120,
        sortable: true,
        filters: false,
        align: 'center',
        cellRender: {
          name: '$vxeInput',
          options: [],
          props: {
            placeholder: '登记时间'
          }
        }
      },
      {
        title: '登记天数',
        field: 'djDate',
        width: 120,
        sortable: true,
        filters: false,
        align: 'center',
        cellRender: {
          name: '$vxeInput',
          options: [],
          props: {
            placeholder: '登记时间'
          }
        }
      },
      {
        title: '未登记预警',
        field: 'wdjWarn',
        width: 120,
        sortable: true,
        align: 'center',
        name: '$vxeSelect',
        cellRender: {
          name: '$vxeSelect',
          options: [
            { value: '0', label: '' }, { value: '1', label: '预警' }
          ],
          props: {
            placeholder: '认定结果'
          }
        }
      },
      {
        title: '分配金额',
        field: 'fpAmount',
        width: 120,
        sortable: true,
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
        title: '分配时间',
        field: 'fpTime',
        width: 120,
        sortable: true,
        filters: false,
        align: 'center',
        cellRender: {
          name: '$vxeInput',
          options: [],
          props: {
            placeholder: '分配时间'
          }
        }
      },
      {
        title: '分配天数',
        field: 'fpDate',
        width: 120,
        sortable: true,
        align: 'center'
      },
      {
        title: '已登记未分配预警',
        field: 'ydjwfpWarn',
        width: 120,
        sortable: true,
        align: 'center',
        name: '$vxeSelect',
        cellRender: {
          name: '$vxeSelect',
          options: [
            { value: '0', label: '' }, { value: '1', label: '预警' }
          ],
          props: {
            placeholder: '认定结果'
          }
        }
      },
      {
        title: '追加金额',
        field: '',
        width: 120,
        sortable: true,
        align: 'center',
        children: [
          {
            title: '本级',
            field: 'zjBjamount',
            width: 120,
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
            title: '下级',
            field: 'zjXjamount',
            width: 120,
            sortable: true,
            filters: true,
            align: 'center',
            combinedType: [
              'average',
              'subTotal',
              'total',
              'totalAll'
            ],
            cellRender: { name: '$vxeMoney' }
          }
        ]
      },
      {
        title: '追加时间',
        field: 'zjTime',
        width: 120,
        sortable: true,
        align: 'center'
      },
      {
        title: '已分配追加天数',
        field: 'yfpzjDate',
        width: 120,
        sortable: true,
        align: 'center'
      },
      {
        title: '已分配未追加预警',
        field: 'yfpwzjWarn',
        width: 120,
        sortable: true,
        align: 'center',
        name: '$vxeSelect',
        cellRender: {
          name: '$vxeSelect',
          options: [
            { value: '0', label: '' }, { value: '1', label: '预警' }
          ],
          props: {
            placeholder: '认定结果'
          }
        }
      },
      {
        title: '指标来源代码',
        field: 'sourceTypeCode',
        width: 120,
        sortable: true,
        filters: true,
        align: 'center',
        cellRender: {
          name: '$vxeInput',
          options: [],
          props: {
            placeholder: '指标来源代码'
          }
        }
      },
      {
        title: '指标来源名称',
        field: 'sourceTypeName',
        width: 120,
        sortable: true,
        filters: true,
        align: 'center',
        cellRender: {
          name: '$vxeInput',
          options: [],
          props: {
            placeholder: '指标来源名称'
          }
        }
      },
      {
        title: '资金来源代码',
        field: 'foundTypeCode',
        width: 120,
        sortable: true,
        filters: true,
        align: 'center',
        cellRender: {
          name: '$vxeInput',
          options: [],
          props: {
            placeholder: '资金来源代码'
          }
        }
      },
      {
        title: '资金来源名称',
        field: 'foundTypeName',
        width: 120,
        sortable: true,
        filters: true,
        align: 'center',
        cellRender: {
          name: '$vxeInput',
          options: [],
          props: {
            placeholder: '资金来源名称'
          }
        }
      },
      {
        title: '资金性质代码',
        field: 'fundTypeCode',
        width: 120,
        sortable: true,
        filters: true,
        align: 'center',
        cellRender: {
          name: '$vxeInput',
          options: [],
          props: {
            placeholder: '资金性质代码'
          }
        }
      },
      {
        title: '资金性质名称',
        field: 'fundTypeName',
        width: 120,
        sortable: true,
        filters: true,
        align: 'center',
        cellRender: {
          name: '$vxeInput',
          options: [],
          props: {
            placeholder: '资金性质名称'
          }
        }
      },
      {
        title: '支出功能科目',
        filters: true,
        width: 140,
        field: 'expFuncName',
        sortable: false,
        align: 'right',
        cellRender: {
          name: '$vxeInput',
          options: [],
          props: {
            placeholder: '支出功能科目'
          }
        }
      },
      {
        title: '政府支出经济分类',
        filters: true,
        width: 140,
        field: 'govBgtEcoName',
        sortable: false,
        align: 'right',
        cellRender: {
          name: '$vxeInput',
          options: [],
          props: {
            placeholder: '政府支出经济分类'
          }
        }
      },
      {
        title: '部门支出经济分类',
        filters: true,
        width: 140,
        field: 'depBgtEcoName',
        sortable: false,
        align: 'right',
        cellRender: {
          name: '$vxeInput',
          options: [],
          props: {
            placeholder: '部门支出经济分类'
          }
        }
      },
      {
        title: '指标管理处室',
        field: 'bgtMofDepName',
        width: 120,
        sortable: true,
        align: 'center',
        cellRender: {
          name: '$vxeInput',
          options: [],
          defaultValue: '',
          props: {
            format: '{bgtMofDepCode}-{bgtMofDepName}'
          }
        },
        props: {
          format: '{bgtMofDepCode}-{bgtMofDepName}'
        }
      },
      // {
      //   title: '业务主管处室代码',
      //   field: 'manageMofDepCode',
      //   width: 120,
      //   sortable: false,
      //   filters: false,
      //   align: 'center'
      // },
      {
        title: '业务主管处室',
        field: 'manageMofDepName',
        width: 120,
        sortable: true,
        align: 'center',
        cellRender: {
          name: '$vxeInput',
          options: [],
          defaultValue: '',
          props: {
            format: '{manageMofDepCode}-{manageMofDepName}'
          }
        },
        props: {
          format: '{manageMofDepCode}-{manageMofDepName}'
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
