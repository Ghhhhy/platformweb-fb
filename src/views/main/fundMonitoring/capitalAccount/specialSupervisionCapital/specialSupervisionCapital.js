import store from '@/store/index'
let proconf = {
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
      visible: !store.getters.isFuJian,
      formula: '',
      itemRender: {
        name: '$vxeInput',
        // options: [
        //   // { value: '2020', label: '2020年' },
        //   // { value: '2021', label: '2021年' },
        //   { value: '2022', label: '2022年' },
        //   { value: '2023', label: '2023年' }
        // ],
        props: {
          type: 'year',
          valueFormat: 'yyyy',
          placeholder: '业务年度',
          clearable: true
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
          config: {
            valueKeys: ['code', 'name', 'id', 'codeFragment'],
            format: '{name}',
            treeProps: {
              labelFormat: '{code}-{name}', // {code}-{name}  {codeFragment}-{name}
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
    //   width: 100,
    //   align: 'center',
    //   filters: false,
    //   itemRender: {
    //     name: '$vxeTime',
    //     props: {
    //       clearable: true,
    //       format: 'YYYY-MM-DD', // "当前日期为：YYYY-MM-DD，星期W，为第Q季度，时间为：hh:mm:ss:c"
    //       type: 'date',
    //       placeholder: '开始日期'
    //     }
    //   }
    // },
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
    },
    {
      title: '区划',
      field: 'isCentral',
      width: '8',
      align: 'left',
      formula: '',
      itemRender: {
        name: '$vxeSelect',
        options: [
          { value: '1', label: '中央' },
          { value: '2', label: '地区' }
        ],
        props: {
          placeholder: '请选择',
          clearable: true
        }
      }
    },
    {
      title: '是否直达资金',
      field: 'isZd',
      width: '8',
      align: 'left',
      formula: '',
      itemRender: {
        name: '$vxeSelect',
        options: [
          { value: '1', label: '是' },
          { value: '0', label: '否' }
        ],
        props: {
          placeholder: '是否直达资金',
          clearable: true
        }
      }
    }
    /*,

    } */
  ],
  highQueryData: {
    fiscalYear: store.state.userInfo.year,
    mofDivCodes: '',
    startTime: '',
    endTime: ''
    // isCentral: '',
    // isZd: ''
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
        fixed: false,
        align: 'left',
        width: 280,
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
        width: 100,
        field: 'amountZyxd',
        align: 'right',
        type: 'amountSnjxd',
        cellRender: { name: '$vxeMoney' }
      },
      // {
      //   title: '是否直达资金',
      //   width: 150,
      //   field: 'isZd',
      //   align: 'right',
      //   formatter: (value, column) => {
      //     let { row } = value
      //     return row['isZd'] && row['isZd'] === 1 ? '是' : '否'
      //   }
      // },
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
            cellRender: { name: '$vxeMoney' },
            width: 100,
            field: 'amountPayAll',
            formula: '{amountSnjpay}+{amountSjpay}+{amountXjpay}'
          },
          {
            title: '进度',
            align: 'right',
            width: 100,
            field: 'jLoad',
            formula: '({amountZyxd}-0==0)?0:Math.round({amountPayAll}/{amountZyxd}*100*10)/10',
            cellRender: {
              name: '$vxeRatio'
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
            width: 100,
            field: 'amountSnjzhje',
            align: 'right',
            type: 'amountSnjzhje',
            cellRender: { name: '$vxeMoney' },
            visible: false
          },
          {
            title: '中央下达',
            field: 'amountSnjxd',
            width: 100,
            align: 'right',
            cellRender: { name: '$vxeMoney' },
            visible: false
          },
          {
            title: '分配本级',
            field: 'amountSnjbjfp',
            width: 100,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '分配下级',
            field: 'amountSnjxjfp',
            width: 100,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '未分配',
            field: 'amountSnjwfp',
            width: 100,
            align: 'right',
            cellRender: { name: '$vxeMoney' },
            formula: '{amountSnjxd}-{amountSnjbjfp}-{amountSnjxjfp}'
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
            width: 100,
            align: 'right',
            formula: '({amountSnjxd}-0==0)?0:Math.round(({amountSnjbjfp}+{amountSnjxjfp})/{amountSnjxd}*100*10)/10',
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
            width: 100,
            field: 'amountSjzhje',
            align: 'right',
            type: 'amountSjzhje',
            cellRender: { name: '$vxeMoney' },
            visible: false
          },
          {
            title: '中央下达',
            field: 'amountSjxd',
            width: 100,
            align: 'right',
            cellRender: { name: '$vxeMoney' },
            visible: false
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
            cellRender: { name: '$vxeMoney' },
            formula: '{amountSjxd}-{amountSbjfp}-{amountSxjfp}'
          },
          {
            title: '本级已支出',
            field: 'amountSjpay',
            width: 200,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '分配进度',
            field: 'aLoad',
            width: 100,
            align: 'right',
            formula: '({amountSjxd}-0==0)?0:Math.round(({amountSbjfp}+{amountSxjfp})/{amountSjxd}*100*10)/10',
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
            width: 100,
            field: 'amountXjzhje',
            align: 'right',
            type: 'amountXjzhje',
            cellRender: { name: '$vxeMoney' },
            visible: false
          },
          {
            title: '中央下达',
            field: 'amountXjxd',
            width: 100,
            align: 'right',
            cellRender: { name: '$vxeMoney' },
            visible: false
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
            formula: '({amountXjxd}-0==0)?0:Math.round({amountXjfp}/{amountXjxd}*100*10)/10',
            cellRender: {
              name: '$vxeRatio'
            }
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
        fixed: false,
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
            field: 'amountPayAll',
            formula: '{amountSnjpay}+{amountSjpay}+{amountXjpay}'
          },
          {
            title: '进度',
            align: 'right',
            width: 200,
            field: 'jLoad',
            formula: '({amountZyxd2}-0==0)?0:({amountPayAll}/{amountZyxd2}*100)',
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
            visible: false
          },
          {
            title: '中央下达',
            field: 'amountSnjxd',
            width: 200,
            align: 'right',
            cellRender: { name: '$vxeMoney' },
            visible: false
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
            visible: false
          },
          {
            title: '中央下达',
            field: 'amountSjxd',
            width: 100,
            align: 'right',
            cellRender: { name: '$vxeMoney' },
            visible: false
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
            width: 200,
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
            visible: false
          },
          {
            title: '中央下达',
            field: 'amountXjxd',
            width: 100,
            align: 'right',
            cellRender: { name: '$vxeMoney' },
            visible: false
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
  proconf = {
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
            config: {
              valueKeys: ['code', 'name', 'id', 'codeFragment'],
              format: '{name}',
              treeProps: {
                labelFormat: '{codeFragment}-{name}', // {code}-{name}
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
      //   width: 100,
      //   align: 'center',
      //   filters: false,
      //   itemRender: {
      //     name: '$vxeTime',
      //     props: {
      //       clearable: true,
      //       format: 'YYYY-MM-DD', // "当前日期为：YYYY-MM-DD，星期W，为第Q季度，时间为：hh:mm:ss:c"
      //       type: 'date',
      //       placeholder: '开始日期'
      //     }
      //   }
      // },
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
      mofDivCodes: '',
      startTime: '',
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
          fixed: false,
          align: 'left',
          width: 280,
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
          width: 100,
          field: 'amountZyxd',
          align: 'right',
          type: 'amountSnjxd',
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
              cellRender: { name: '$vxeMoney' },
              width: 100,
              field: 'amountPayAll',
              formula: '{amountSnjpay}+{amountSjpay}+{amountXjpay}'
            },
            {
              title: '进度',
              align: 'right',
              width: 100,
              field: 'jLoad',
              formula: '({amountZyxd}-0==0)?0:({amountPayAll}/{amountZyxd}*100)',
              cellRender: {
                name: '$vxeRatio'
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
              width: 100,
              field: 'amountSnjzhje',
              align: 'right',
              type: 'amountSnjzhje',
              cellRender: { name: '$vxeMoney' },
              visible: false
            },
            {
              title: '中央下达',
              field: 'amountSnjxd',
              width: 100,
              align: 'right',
              cellRender: { name: '$vxeMoney' },
              visible: false
            },
            {
              title: '分配本级',
              field: 'amountSnjbjfp',
              width: 100,
              align: 'right',
              cellRender: { name: '$vxeMoney' }
            },
            {
              title: '分配下级',
              field: 'amountSnjxjfp',
              width: 100,
              align: 'right',
              cellRender: { name: '$vxeMoney' }
            },
            {
              title: '未分配',
              field: 'amountSnjwfp',
              width: 100,
              align: 'right',
              cellRender: { name: '$vxeMoney' },
              formula: '{amountSnjxd}-{amountSnjbjfp}-{amountSnjxjfp}'
            },
            {
              title: '本级已支出',
              field: 'amountSnjpay',
              width: 100,
              align: 'right',
              cellRender: { name: '$vxeMoney' }
            },
            {
              title: '分配进度',
              field: 'sLoad',
              width: 100,
              align: 'right',
              formula: '({amountSnjxd}-0==0)?0:(({amountSnjbjfp}+{amountSnjxjfp})/{amountSnjxd}*100)',
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
              width: 100,
              field: 'amountSjzhje',
              align: 'right',
              type: 'amountSjzhje',
              cellRender: { name: '$vxeMoney' },
              visible: false
            },
            {
              title: '中央下达',
              field: 'amountSjxd',
              width: 100,
              align: 'right',
              cellRender: { name: '$vxeMoney' },
              visible: false
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
              cellRender: { name: '$vxeMoney' },
              formula: '{amountSjxd}-{amountSbjfp}-{amountSxjfp}'
            },
            {
              title: '本级已支出',
              field: 'amountSjpay',
              width: 100,
              align: 'right',
              cellRender: { name: '$vxeMoney' }
            },
            {
              title: '分配进度',
              field: 'aLoad',
              width: 100,
              align: 'right',
              formula: '({amountSjxd}-0==0)?0:(({amountSbjfp}+{amountSxjfp})/{amountSjxd}*100)',
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
              width: 100,
              field: 'amountXjzhje',
              align: 'right',
              type: 'amountXjzhje',
              cellRender: { name: '$vxeMoney' },
              visible: false
            },
            {
              title: '中央下达',
              field: 'amountXjxd',
              width: 100,
              align: 'right',
              cellRender: { name: '$vxeMoney' },
              visible: false
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
              formula: '({amountXjxd}-0==0)?0:({amountXjfp}/{amountXjxd}*100)',
              cellRender: {
                name: '$vxeRatio'
              }
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
          fixed: false,
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
              field: 'amountPayAll',
              formula: '{amountSnjpay}+{amountSjpay}+{amountXjpay}'
            },
            {
              title: '进度',
              align: 'right',
              width: 200,
              field: 'jLoad',
              formula: '({amountZyxd2}-0==0)?0:({amountPayAll}/{amountZyxd2}*100)',
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
              visible: false
            },
            {
              title: '中央下达',
              field: 'amountSnjxd',
              width: 200,
              align: 'right',
              cellRender: { name: '$vxeMoney' },
              visible: false
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
              formula: '({amountZyxd}-0==0)?0:(({amountSnjbjfp}+{amountSnjxjfp})/{amountZyxd}*100)',
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
              visible: false
            },
            {
              title: '中央下达',
              field: 'amountSjxd',
              width: 100,
              align: 'right',
              cellRender: { name: '$vxeMoney' },
              visible: false
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
              width: 100,
              align: 'right',
              cellRender: { name: '$vxeMoney' }
            },
            {
              title: '分配进度',
              field: 'aLoad',
              width: 100,
              align: 'right',
              formula: '({amountZyxd}-0==0)?0:(({amountSbjfp}+{amountSxjfp})/{amountZyxd}*100)',
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
              visible: false
            },
            {
              title: '中央下达',
              field: 'amountXjxd',
              width: 100,
              align: 'right',
              cellRender: { name: '$vxeMoney' },
              visible: false
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
              formula: '({amountZyxd}-0==0)?0:({amountXjfp}/{amountZyxd}*100)',
              cellRender: {
                name: '$vxeRatio'
              }
            }
          ]
        }
      ],
      tableData: [],
      mockData: JSON.parse(JSON.stringify({
        'code': '000000',
        'message': 'success',
        'data': {
          'head': [{
            'id': '1',
            'parentId': '',
            'reportCode': 'zxjd_fzj',
            'reportName': '转移支付重点监督_分资金',
            'title': '资金名称',
            'field': 'name',
            'children': []
          },
          {
            'id': '2',
            'parentId': '',
            'reportCode': 'zxjd_fzj',
            'reportName': '转移支付重点监督_分资金',
            'title': '中央下达',
            'field': 'amountZyxd',
            'children': []
          },
          {
            'id': '3',
            'parentId': '',
            'reportCode': 'zxjd_fzj',
            'reportName': '转移支付重点监督_分资金',
            'title': '省级',
            'field': 'amountSnjxd',
            'children': [{
              'id': '4',
              'parentId': '3',
              'reportCode': 'zxjd_fzj',
              'reportName': '转移支付重点监督_分资金',
              'title': '分配本级',
              'field': 'amountSnjbjfp',
              'children': []
            },
            {
              'id': '5',
              'parentId': '3',
              'reportCode': 'zxjd_fzj',
              'reportName': '转移支付重点监督_分资金',
              'title': '分配下级',
              'field': 'amountSnjxjfp',
              'children': []
            },
            {
              'id': '6',
              'parentId': '3',
              'reportCode': 'zxjd_fzj',
              'reportName': '转移支付重点监督_分资金',
              'title': '未分配',
              'field': 'amountSnjwfp',
              'children': []
            },
            {
              'id': '7',
              'parentId': '3',
              'reportCode': 'zxjd_fzj',
              'reportName': '转移支付重点监督_分资金',
              'title': '分配进度',
              'field': 'amountSnfpjd',
              'children': []
            }
            ]
          },
          {
            'id': '8',
            'parentId': null,
            'reportCode': 'zxjd_fzj',
            'reportName': '转移支付重点监督_分资金',
            'title': '市级',
            'field': 'amountSjxd',
            'children': [{
              'id': '9',
              'parentId': '8',
              'reportCode': 'zxjd_fzj',
              'reportName': '转移支付重点监督_分资金',
              'title': '分配本级',
              'field': 'amountSjbjfp',
              'children': []
            },
            {
              'id': '10',
              'parentId': '8',
              'reportCode': 'zxjd_fzj',
              'reportName': '转移支付重点监督_分资金',
              'title': '分配下级',
              'field': 'amountSjxjfp',
              'children': []
            },
            {
              'id': '11',
              'parentId': '8',
              'reportCode': 'zxjd_fzj',
              'reportName': '转移支付重点监督_分资金',
              'title': '未分配',
              'field': 'amountSjwfp',
              'children': []
            },
            {
              'id': '12',
              'parentId': '8',
              'reportCode': 'zxjd_fzj',
              'reportName': '转移支付重点监督_分资金',
              'title': '分配进度',
              'field': 'amountSjfpjd',
              'children': []
            }
            ]
          },
          {
            'id': '13',
            'parentId': null,
            'reportCode': 'zxjd_fzj',
            'reportName': '转移支付重点监督_分资金',
            'title': '县级',
            'field': 'amountXjxd',
            'children': [{
              'id': '14',
              'parentId': '13',
              'reportCode': 'zxjd_fzj',
              'reportName': '转移支付重点监督_分资金',
              'title': '分配本级',
              'field': 'amountXjbjfp',
              'children': []
            },
            {
              'id': '15',
              'parentId': '13',
              'reportCode': 'zxjd_fzj',
              'reportName': '转移支付重点监督_分资金',
              'title': '分配下级',
              'field': 'amountXjxjfp',
              'children': []
            },
            {
              'id': '16',
              'parentId': '13',
              'reportCode': 'zxjd_fzj',
              'reportName': '转移支付重点监督_分资金',
              'title': '未分配',
              'field': 'amountXjwfp',
              'children': []
            },
            {
              'id': '17',
              'parentId': '13',
              'reportCode': 'zxjd_fzj',
              'reportName': '转移支付重点监督_分资金',
              'title': '分配进度',
              'field': 'amountXjfpjd',
              'children': []
            }
            ]
          },
          {
            'id': '18',
            'parentId': null,
            'reportCode': 'zxjd_fzj',
            'reportName': '转移支付重点监督_分资金',
            'title': '支出',
            'field': 'zc',
            'children': [{
              'id': '19',
              'parentId': '18',
              'reportCode': 'zxjd_fzj',
              'reportName': '转移支付重点监督_分资金',
              'title': '金额',
              'field': 'amountPay',
              'children': []
            },
            {
              'id': '20',
              'parentId': '18',
              'reportCode': 'zxjd_fzj',
              'reportName': '转移支付重点监督_分资金',
              'title': '进度',
              'field': 'amountFpjd',
              'children': []
            }
            ]
          }
          ],
          'records': [{
            'id': '09',
            'code': '09',
            'name': '专项监督资金',
            'parentId': '0',
            'children': [{
              'id': '1',
              'code': '1',
              'name': '一般性转移支付',
              'parentId': '09',
              'children': [{
                'id': '10000015Z155110000004',
                'code': '10000015Z155110000004',
                'name': '中央财政衔接推进乡村振兴补助资金',
                'parentId': '1',
                'children': null,
                'speTypeCode': null,
                'speTypeName': null,
                'recAmount': null,
                'amountZyxd': '7277990000.00',
                'amountSnjxd': '6967760000.00',
                'amountSnjbjfp': '1351199265.02',
                'amountSnjxjfp': '5604710734.98',
                'amountSnjwfp': null,
                'amountSnjpay': '0',
                'amountSjxd': '3790330734.98',
                'amountSbjfp': '0',
                'amountSxjfp': '2932760734.98',
                'amountSjpay': '0',
                'amountXjxd': '5057370734.98',
                'amountSjwfp': null,
                'amountXjfp': '0',
                'amountXjwfp': null,
                'amountXjpay': '0',
                'amountXbjfp': null,
                'amountXxjfp': null,
                'amountZjxd': null,
                'amountZjfp': null,
                'amountZjwfp': null,
                'amountZjpay': null
              }],
              'speTypeCode': null,
              'speTypeName': null,
              'recAmount': null,
              'amountZyxd': '7277990000.00',
              'amountSnjxd': '6967760000.00',
              'amountSnjbjfp': '1351199265.02',
              'amountSnjxjfp': '5604710734.98',
              'amountSnjwfp': '0',
              'amountSnjpay': '0',
              'amountSjxd': '3790330734.98',
              'amountSbjfp': '0',
              'amountSxjfp': '2932760734.98',
              'amountSjpay': '0',
              'amountXjxd': '5057370734.98',
              'amountSjwfp': '0',
              'amountXjfp': '0',
              'amountXjwfp': '0',
              'amountXjpay': '0',
              'amountXbjfp': '0',
              'amountXxjfp': '0',
              'amountZjxd': '0',
              'amountZjfp': '0',
              'amountZjwfp': '0',
              'amountZjpay': '0'
            },
            {
              'id': '2',
              'code': '2',
              'name': '共同财政事权转移支付',
              'parentId': '09',
              'children': [{
                'id': '10000013Z135050009055',
                'code': '10000013Z135050009055',
                'name': '现代职业教育质量提升计划资金',
                'parentId': '2',
                'children': null,
                'speTypeCode': null,
                'speTypeName': null,
                'recAmount': null,
                'amountZyxd': '957500000.00',
                'amountSnjxd': '1031310000.00',
                'amountSnjbjfp': '557443938.56',
                'amountSnjxjfp': '481670000.00',
                'amountSnjwfp': null,
                'amountSnjpay': '57353.83',
                'amountSjxd': '477670000.00',
                'amountSbjfp': '0',
                'amountSxjfp': '286810000.00',
                'amountSjpay': '0',
                'amountXjxd': '217000000.00',
                'amountSjwfp': null,
                'amountXjfp': '0',
                'amountXjwfp': null,
                'amountXjpay': '0',
                'amountXbjfp': null,
                'amountXxjfp': null,
                'amountZjxd': null,
                'amountZjfp': null,
                'amountZjwfp': null,
                'amountZjpay': null
              },
              {
                'id': '10000013Z135060000035',
                'code': '10000013Z135060000035',
                'name': '车辆购置税收入补助地方资金',
                'parentId': '2',
                'children': null,
                'speTypeCode': null,
                'speTypeName': null,
                'recAmount': null,
                'amountZyxd': '3920400000.00',
                'amountSnjxd': '3934400000.00',
                'amountSnjbjfp': '0',
                'amountSnjxjfp': '2231420000.00',
                'amountSnjwfp': null,
                'amountSnjpay': '0',
                'amountSjxd': '1312760000.00',
                'amountSbjfp': '0',
                'amountSxjfp': '46300000.00',
                'amountSjpay': '0',
                'amountXjxd': '950960000.00',
                'amountSjwfp': null,
                'amountXjfp': '0',
                'amountXjwfp': null,
                'amountXjpay': '0',
                'amountXbjfp': null,
                'amountXxjfp': null,
                'amountZjxd': null,
                'amountZjfp': null,
                'amountZjwfp': null,
                'amountZjpay': null
              },
              {
                'id': '10000013Z135080000005',
                'code': '10000013Z135080000005',
                'name': '就业补助资金',
                'parentId': '2',
                'children': null,
                'speTypeCode': null,
                'speTypeName': null,
                'recAmount': null,
                'amountZyxd': '1565070000.00',
                'amountSnjxd': '1683980000.00',
                'amountSnjbjfp': '0',
                'amountSnjxjfp': '1683980000.00',
                'amountSnjwfp': null,
                'amountSnjpay': '0',
                'amountSjxd': '1790240000.00',
                'amountSbjfp': '0',
                'amountSxjfp': '413430000.00',
                'amountSjpay': '0',
                'amountXjxd': '188260000.00',
                'amountSjwfp': null,
                'amountXjfp': '0',
                'amountXjwfp': null,
                'amountXjpay': '0',
                'amountXbjfp': null,
                'amountXxjfp': null,
                'amountZjxd': null,
                'amountZjfp': null,
                'amountZjwfp': null,
                'amountZjpay': null
              },
              {
                'id': '10000013Z135080000029',
                'code': '10000013Z135080000029',
                'name': '农村危房改造补助资金',
                'parentId': '2',
                'children': null,
                'speTypeCode': null,
                'speTypeName': null,
                'recAmount': null,
                'amountZyxd': '161359600.00',
                'amountSnjxd': '171680000.00',
                'amountSnjbjfp': '0',
                'amountSnjxjfp': '171680000.00',
                'amountSnjwfp': null,
                'amountSnjpay': '0',
                'amountSjxd': '171680000.00',
                'amountSbjfp': '0',
                'amountSxjfp': '160404500.00',
                'amountSjpay': '0',
                'amountXjxd': '150084100.00',
                'amountSjwfp': null,
                'amountXjfp': '0',
                'amountXjwfp': null,
                'amountXjpay': '0',
                'amountXbjfp': null,
                'amountXxjfp': null,
                'amountZjxd': null,
                'amountZjfp': null,
                'amountZjwfp': null,
                'amountZjpay': null
              },
              {
                'id': '10000013Z135110079006',
                'code': '10000013Z135110079006',
                'name': '成品油税费改革转移支付',
                'parentId': '2',
                'children': null,
                'speTypeCode': null,
                'speTypeName': null,
                'recAmount': null,
                'amountZyxd': '587073000.00',
                'amountSnjxd': '480400000.00',
                'amountSnjbjfp': '0',
                'amountSnjxjfp': '480400000.00',
                'amountSnjwfp': null,
                'amountSnjpay': '0',
                'amountSjxd': '640440000.00',
                'amountSbjfp': '0',
                'amountSxjfp': '160720000.00',
                'amountSjpay': '0',
                'amountXjxd': '107353000.00',
                'amountSjwfp': null,
                'amountXjfp': '0',
                'amountXjwfp': null,
                'amountXjpay': '0',
                'amountXbjfp': null,
                'amountXxjfp': null,
                'amountZjxd': null,
                'amountZjfp': null,
                'amountZjwfp': null,
                'amountZjpay': null
              },
              {
                'id': '10000015Z155050000001',
                'code': '10000015Z155050000001',
                'name': '城乡义务教育补助经费',
                'parentId': '2',
                'children': null,
                'speTypeCode': null,
                'speTypeName': null,
                'recAmount': null,
                'amountZyxd': '5241909350.00',
                'amountSnjxd': '5853600000.00',
                'amountSnjbjfp': '555636932.03',
                'amountSnjxjfp': '5376840000.00',
                'amountSnjwfp': null,
                'amountSnjpay': '0',
                'amountSjxd': '5333740000.00',
                'amountSbjfp': '0',
                'amountSxjfp': '5242542150.00',
                'amountSjpay': '0',
                'amountXjxd': '4673951500.00',
                'amountSjwfp': null,
                'amountXjfp': '0',
                'amountXjwfp': null,
                'amountXjpay': '0',
                'amountXbjfp': null,
                'amountXxjfp': null,
                'amountZjxd': null,
                'amountZjfp': null,
                'amountZjwfp': null,
                'amountZjpay': null
              },
              {
                'id': '10000015Z155080000002',
                'code': '10000015Z155080000002',
                'name': '医疗救助补助资金',
                'parentId': '2',
                'children': null,
                'speTypeCode': null,
                'speTypeName': null,
                'recAmount': null,
                'amountZyxd': '1023710000.00',
                'amountSnjxd': '1229810000.00',
                'amountSnjbjfp': '0',
                'amountSnjxjfp': '1229810000.00',
                'amountSnjwfp': null,
                'amountSnjpay': '0',
                'amountSjxd': '1222740000.00',
                'amountSbjfp': '0',
                'amountSxjfp': '231480000.00',
                'amountSjpay': '0',
                'amountXjxd': '32450000.00',
                'amountSjwfp': null,
                'amountXjfp': '0',
                'amountXjwfp': null,
                'amountXjpay': '0',
                'amountXbjfp': null,
                'amountXxjfp': null,
                'amountZjxd': null,
                'amountZjfp': null,
                'amountZjwfp': null,
                'amountZjpay': null
              },
              {
                'id': '10000017Z175070060001',
                'code': '10000017Z175070060001',
                'name': '水利发展资金',
                'parentId': '2',
                'children': null,
                'speTypeCode': null,
                'speTypeName': null,
                'recAmount': null,
                'amountZyxd': '1825550000.00',
                'amountSnjxd': '2403530000.00',
                'amountSnjbjfp': '31824525.00',
                'amountSnjxjfp': '2373590000.00',
                'amountSnjwfp': null,
                'amountSnjpay': '0',
                'amountSjxd': '2036500000.00',
                'amountSbjfp': '0',
                'amountSxjfp': '533000000.00',
                'amountSjpay': '0',
                'amountXjxd': '292110000.00',
                'amountSjwfp': null,
                'amountXjfp': '0',
                'amountXjwfp': null,
                'amountXjpay': '0',
                'amountXbjfp': null,
                'amountXxjfp': null,
                'amountZjxd': null,
                'amountZjfp': null,
                'amountZjwfp': null,
                'amountZjpay': null
              },
              {
                'id': '10000017Z175080010001',
                'code': '10000017Z175080010001',
                'name': '困难群众救助补助资金',
                'parentId': '2',
                'children': null,
                'speTypeCode': null,
                'speTypeName': null,
                'recAmount': null,
                'amountZyxd': '3823731300.00',
                'amountSnjxd': '5470630000.00',
                'amountSnjbjfp': '0',
                'amountSnjxjfp': '5470630000.00',
                'amountSnjwfp': null,
                'amountSnjpay': '0',
                'amountSjxd': '5443440000.00',
                'amountSbjfp': '0',
                'amountSxjfp': '3159868700.00',
                'amountSjpay': '0',
                'amountXjxd': '1540160000.00',
                'amountSjwfp': null,
                'amountXjfp': '0',
                'amountXjwfp': null,
                'amountXjpay': '0',
                'amountXbjfp': null,
                'amountXxjfp': null,
                'amountZjxd': null,
                'amountZjfp': null,
                'amountZjwfp': null,
                'amountZjpay': null
              },
              {
                'id': '10000019Z195110010002',
                'code': '10000019Z195110010002',
                'name': '农田建设补助资金',
                'parentId': '2',
                'children': null,
                'speTypeCode': null,
                'speTypeName': null,
                'recAmount': null,
                'amountZyxd': '955625000.00',
                'amountSnjxd': '829940000.00',
                'amountSnjbjfp': '0',
                'amountSnjxjfp': '829940000.00',
                'amountSnjwfp': null,
                'amountSnjpay': '0',
                'amountSjxd': '710010000.00',
                'amountSbjfp': '0',
                'amountSxjfp': '403515000.00',
                'amountSjpay': '0',
                'amountXjxd': '649130000.00',
                'amountSjwfp': null,
                'amountXjfp': '0',
                'amountXjwfp': null,
                'amountXjpay': '0',
                'amountXbjfp': null,
                'amountXxjfp': null,
                'amountZjxd': null,
                'amountZjfp': null,
                'amountZjwfp': null,
                'amountZjpay': null
              },
              {
                'id': '10000019Z195110010002',
                'code': '10000019Z195110010002',
                'name': '农田建设补助资金',
                'parentId': '2',
                'children': null,
                'speTypeCode': null,
                'speTypeName': null,
                'recAmount': null,
                'amountZyxd': '955625000.00',
                'amountSnjxd': '829940000.00',
                'amountSnjbjfp': '0',
                'amountSnjxjfp': '829940000.00',
                'amountSnjwfp': null,
                'amountSnjpay': '0',
                'amountSjxd': '710010000.00',
                'amountSbjfp': '0',
                'amountSxjfp': '403515000.00',
                'amountSjpay': '0',
                'amountXjxd': '649130000.00',
                'amountSjwfp': null,
                'amountXjfp': '0',
                'amountXjwfp': null,
                'amountXjpay': '0',
                'amountXbjfp': null,
                'amountXxjfp': null,
                'amountZjxd': null,
                'amountZjfp': null,
                'amountZjwfp': null,
                'amountZjpay': null
              },
              {
                'id': '10000022Z221108000003',
                'code': '10000022Z221108000003',
                'name': '中央支持地方公共文化服务体系建设补助资金',
                'parentId': '2',
                'children': null,
                'speTypeCode': null,
                'speTypeName': null,
                'recAmount': null,
                'amountZyxd': '465518200.00',
                'amountSnjxd': '481430000.00',
                'amountSnjbjfp': '10473000.00',
                'amountSnjxjfp': '444677000.00',
                'amountSnjwfp': null,
                'amountSnjpay': '0',
                'amountSjxd': '351643000.00',
                'amountSbjfp': '0',
                'amountSxjfp': '91204600.00',
                'amountSjpay': '0',
                'amountXjxd': '168326800.00',
                'amountSjwfp': null,
                'amountXjfp': '0',
                'amountXjwfp': null,
                'amountXjpay': '0',
                'amountXbjfp': null,
                'amountXxjfp': null,
                'amountZjxd': null,
                'amountZjfp': null,
                'amountZjwfp': null,
                'amountZjpay': null
              }
              ],
              'speTypeCode': null,
              'speTypeName': null,
              'recAmount': null,
              'amountZyxd': '21483071450.00',
              'amountSnjxd': '24400650000.00',
              'amountSnjbjfp': '1155378395.59',
              'amountSnjxjfp': '21604577000.00',
              'amountSnjwfp': '0',
              'amountSnjpay': '57353.83',
              'amountSjxd': '20200873000.00',
              'amountSbjfp': '0',
              'amountSxjfp': '11132789950.00',
              'amountSjpay': '0',
              'amountXjxd': '9618915400.00',
              'amountSjwfp': '0',
              'amountXjfp': '0',
              'amountXjwfp': '0',
              'amountXjpay': '0',
              'amountXbjfp': '0',
              'amountXxjfp': '0',
              'amountZjxd': '0',
              'amountZjfp': '0',
              'amountZjwfp': '0',
              'amountZjpay': '0'
            },
            {
              'id': '3',
              'code': '3',
              'name': '专项转移支付',
              'parentId': '09',
              'children': [{
                'id': '10000014Z145060020001',
                'code': '10000014Z145060020001',
                'name': '大气污染防治资金',
                'parentId': '3',
                'children': null,
                'speTypeCode': null,
                'speTypeName': null,
                'recAmount': null,
                'amountZyxd': '1276720000.00',
                'amountSnjxd': '1138540000.00',
                'amountSnjbjfp': '22584861.00',
                'amountSnjxjfp': '1130960000.00',
                'amountSnjwfp': null,
                'amountSnjpay': '0',
                'amountSjxd': '1359700000.00',
                'amountSbjfp': '0',
                'amountSxjfp': '306330000.00',
                'amountSjpay': '0',
                'amountXjxd': '215770000.00',
                'amountSjwfp': null,
                'amountXjfp': '0',
                'amountXjwfp': null,
                'amountXjpay': '0',
                'amountXbjfp': null,
                'amountXxjfp': null,
                'amountZjxd': null,
                'amountZjfp': null,
                'amountZjwfp': null,
                'amountZjpay': null
              },
              {
                'id': '10000015Z155110010001',
                'code': '10000015Z155110010001',
                'name': '普惠金融发展专项资金',
                'parentId': '3',
                'children': null,
                'speTypeCode': null,
                'speTypeName': null,
                'recAmount': null,
                'amountZyxd': '570580000.00',
                'amountSnjxd': '511330000.00',
                'amountSnjbjfp': '0',
                'amountSnjxjfp': '461330000.00',
                'amountSnjwfp': null,
                'amountSnjpay': '0',
                'amountSjxd': '457000000.00',
                'amountSbjfp': '0',
                'amountSxjfp': '346630000.00',
                'amountSjpay': '0',
                'amountXjxd': '410210000.00',
                'amountSjwfp': null,
                'amountXjfp': '0',
                'amountXjwfp': null,
                'amountXjpay': '0',
                'amountXbjfp': null,
                'amountXxjfp': null,
                'amountZjxd': null,
                'amountZjfp': null,
                'amountZjwfp': null,
                'amountZjpay': null
              },
              {
                'id': '10000019Z195110010003',
                'code': '10000019Z195110010003',
                'name': '自然灾害防治体系建设补助资金',
                'parentId': '3',
                'children': null,
                'speTypeCode': null,
                'speTypeName': null,
                'recAmount': null,
                'amountZyxd': '368480000.00',
                'amountSnjxd': '344900000.00',
                'amountSnjbjfp': '12360000.00',
                'amountSnjxjfp': '332540000.00',
                'amountSnjwfp': null,
                'amountSnjpay': '0',
                'amountSjxd': '328690000.00',
                'amountSbjfp': '0',
                'amountSxjfp': '111910000.00',
                'amountSjpay': '0',
                'amountXjxd': '139340000.00',
                'amountSjwfp': null,
                'amountXjfp': '0',
                'amountXjwfp': null,
                'amountXjpay': '0',
                'amountXbjfp': null,
                'amountXxjfp': null,
                'amountZjxd': null,
                'amountZjfp': null,
                'amountZjwfp': null,
                'amountZjpay': null
              },
              {
                'id': '10000019Z195110010006',
                'code': '10000019Z195110010006',
                'name': '土地指标跨省域调剂收入安排的支出',
                'parentId': '3',
                'children': null,
                'speTypeCode': null,
                'speTypeName': null,
                'recAmount': null,
                'amountZyxd': '249850000.00',
                'amountSnjxd': '254740000.00',
                'amountSnjbjfp': '0',
                'amountSnjxjfp': '254740000.00',
                'amountSnjwfp': null,
                'amountSnjpay': '0',
                'amountSjxd': '184400000.00',
                'amountSbjfp': '0',
                'amountSxjfp': '152440000.00',
                'amountSjpay': '0',
                'amountXjxd': '217890000.00',
                'amountSjwfp': null,
                'amountXjfp': '0',
                'amountXjwfp': null,
                'amountXjpay': '0',
                'amountXbjfp': null,
                'amountXxjfp': null,
                'amountZjxd': null,
                'amountZjfp': null,
                'amountZjwfp': null,
                'amountZjpay': null
              }
              ],
              'speTypeCode': null,
              'speTypeName': null,
              'recAmount': null,
              'amountZyxd': '2465630000.00',
              'amountSnjxd': '2249510000.00',
              'amountSnjbjfp': '34944861.00',
              'amountSnjxjfp': '2179570000.00',
              'amountSnjwfp': '0',
              'amountSnjpay': '0',
              'amountSjxd': '2329790000.00',
              'amountSbjfp': '0',
              'amountSxjfp': '917310000.00',
              'amountSjpay': '0',
              'amountXjxd': '983210000.00',
              'amountSjwfp': '0',
              'amountXjfp': '0',
              'amountXjwfp': '0',
              'amountXjpay': '0',
              'amountXbjfp': '0',
              'amountXxjfp': '0',
              'amountZjxd': '0',
              'amountZjfp': '0',
              'amountZjwfp': '0',
              'amountZjpay': '0'
            }
            ],
            'speTypeCode': null,
            'speTypeName': null,
            'recAmount': null,
            'amountZyxd': '31226691450.00',
            'amountSnjxd': '33617920000.00',
            'amountSnjbjfp': '2541522521.61',
            'amountSnjxjfp': '29388857734.98',
            'amountSnjwfp': '0',
            'amountSnjpay': '57353.83',
            'amountSjxd': '26320993734.98',
            'amountSbjfp': '0',
            'amountSxjfp': '14982860684.98',
            'amountSjpay': '0',
            'amountXjxd': '15659496134.98',
            'amountSjwfp': '0',
            'amountXjfp': '0',
            'amountXjwfp': '0',
            'amountXjpay': '0',
            'amountXbjfp': '0',
            'amountXxjfp': '0',
            'amountZjxd': '0',
            'amountZjfp': '0',
            'amountZjwfp': '0',
            'amountZjpay': '0'
          }]
        }
      }))
    }

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
