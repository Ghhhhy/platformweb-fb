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
            multiple: false,
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
        title: '资金名称',
        type: 'name',
        treeNode: true,
        fixed: false,
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
        title: '全省',
        width: 260,
        align: 'center',
        children: [
          {
            title: '资金总量',
            align: 'right',
            cellRender: { name: '$vxeMoney' },
            width: 100,
            field: 'amountZyxd'
          },
          {
            title: '整合金额',
            align: 'right',
            cellRender: { name: '$vxeMoney' },
            width: 100,
            field: 'amountQsZhje',
            visible: false
          },
          {
            title: '支出金额',
            align: 'right',
            cellRender: { name: '$vxeMoney' },
            width: 100,
            field: 'amountQsZcje'
          },
          {
            title: '支出进度',
            align: 'right',
            width: 100,
            field: 'pro',
            formula: '{amountZyxd}-0==0?0:Math.round({amountQsZcje}/{amountZyxd}*100*10)/10',
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
            title: '资金总量',
            width: 100,
            align: 'center',
            children: [
              {
                title: '中央安排',
                field: 'amountSnjxd',
                width: 100,
                align: 'right',
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '省级安排',
                field: 'amountSnjZjzlSjap',
                width: 100,
                align: 'right',
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '总金额',
                field: 'amountSnjZjzlZje',
                width: 100,
                align: 'right',
                cellRender: { name: '$vxeMoney' },
                formula: '{amountSnjxd}+{amountSnjZjzlSjap}'
              }
            ]
          },
          {
            title: '整合金额',
            width: 100,
            align: 'center',
            children: [
              {
                title: '中央安排',
                field: 'amountSnjZhjeZyap',
                width: 100,
                align: 'right',
                cellRender: { name: '$vxeMoney' },
                visible: false
              },
              {
                title: '省级安排',
                field: 'amountSnjZhjeSnjap',
                width: 100,
                align: 'right',
                cellRender: { name: '$vxeMoney' },
                visible: false
              },
              {
                title: '总金额',
                field: 'amountSnjZhjeZje',
                width: 100,
                align: 'right',
                cellRender: { name: '$vxeMoney' },
                formula: '{amountSnjZhjeZyap}+{amountSnjZhjeSnjap}',
                visible: false
              }
            ]
          },
          {
            title: '支出金额',
            width: 100,
            align: 'center',
            children: [
              {
                title: '中央安排',
                field: 'amountSnjpay',
                width: 100,
                align: 'right',
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '省级安排',
                field: 'amountSnjZcjeSnjap',
                width: 100,
                align: 'right',
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '总金额',
                field: 'amountSnjZcjeZje',
                width: 100,
                align: 'right',
                cellRender: { name: '$vxeMoney' },
                formula: '{amountSnjpay}+{amountSnjZcjeSnjap}'
              }
            ]
          },
          {
            title: '支出进度',
            width: 100,
            align: 'center',
            children: [
              {
                title: '中央安排',
                field: 'numberSnjZcjdZyap',
                width: 100,
                align: 'right',
                formula: '{amountSnjxd}-0==0?0:Math.round({amountSnjpay}/{amountSnjxd}*100*10)/10',
                cellRender: {
                  name: '$vxeRatio'
                }
              },
              {
                title: '省级安排',
                field: 'numberSnjZcjdSnjap',
                width: 100,
                align: 'right',
                formula: '{amountSnjZjzlSjap}-0==0?0:Math.round({amountSnjZcjeSnjap}/{amountSnjZjzlSjap}*100*10)/10',
                cellRender: {
                  name: '$vxeRatio'
                }
              },
              {
                title: '总金额',
                field: 'numberSnjZcjdzje',
                width: 100,
                align: 'right',
                formula: '{amountSnjZjzlZje}-0==0?0:Math.round({amountSnjZcjeZje}/{amountSnjZjzlZje}*100*10)/10',
                cellRender: {
                  name: '$vxeRatio'
                }
              }
            ]
          }
        ]
      },
      {
        title: '市级',
        width: 100,
        align: 'center',
        children: [
          {
            title: '资金总量',
            width: 100,
            align: 'center',
            children: [
              {
                title: '中央安排',
                field: 'amountSjxd',
                width: 100,
                align: 'right',
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '省级安排',
                field: 'amountSjZjzlSnjap',
                width: 100,
                align: 'right',
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '市级安排',
                field: 'amountSjZjzlSjap',
                width: 100,
                align: 'right',
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '总金额',
                field: 'amountSjZjzlZje',
                width: 100,
                align: 'right',
                cellRender: { name: '$vxeMoney' },
                formula: '{amountSjxd}+{amountSjZjzlSnjap}+{amountSjZjzlSjap}'
              }
            ]
          },
          {
            title: '整合金额',
            width: 100,
            align: 'center',
            children: [
              {
                title: '中央安排',
                field: 'amountSjZhjeZyap',
                width: 100,
                align: 'right',
                cellRender: { name: '$vxeMoney' },
                visible: false
              },
              {
                title: '省级安排',
                field: 'amountSjZhjeSnjap',
                width: 100,
                align: 'right',
                cellRender: { name: '$vxeMoney' },
                visible: false
              },
              {
                title: '市级安排',
                field: 'amountSjZhjeSjap',
                width: 100,
                align: 'right',
                cellRender: { name: '$vxeMoney' },
                visible: false
              },
              {
                title: '总金额',
                field: 'amountSjZhjezje',
                width: 100,
                align: 'right',
                cellRender: { name: '$vxeMoney' },
                visible: false
              }
            ]
          },
          {
            title: '支出金额',
            width: 100,
            align: 'center',
            children: [
              {
                title: '中央安排',
                field: 'amountSjpay',
                width: 100,
                align: 'right',
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '省级安排',
                field: 'amountSjZcjeSnjap',
                width: 100,
                align: 'right',
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '市级安排',
                field: 'amountSjZcjeSjap',
                width: 100,
                align: 'right',
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '总金额',
                field: 'amountSjZcjeZje',
                width: 100,
                align: 'right',
                cellRender: { name: '$vxeMoney' },
                formula: '{amountSjpay}+{amountSjZcjeSnjap}+{amountSjZcjeSjap}'
              }
            ]
          },
          {
            title: '支出进度',
            width: 100,
            align: 'center',
            children: [
              {
                title: '中央安排',
                field: 'numberSjZcjdZyap',
                width: 100,
                align: 'right',
                formula: '{amountSjxd}-0==0?0:Math.round({amountSjpay}/{amountSjxd}*100*10)/10',
                cellRender: {
                  name: '$vxeRatio'
                }
              },
              {
                title: '省级安排',
                field: 'numberSjZcjdSnjap',
                width: 100,
                align: 'right',
                formula: '{amountSjZjzlSnjap}-0==0?0:Math.round({amountSjZcjeSnjap}/{amountSjZjzlSnjap}*100*10)/10',
                cellRender: {
                  name: '$vxeRatio'
                }
              },
              {
                title: '市级安排',
                field: 'numberSjZcjdSjap',
                width: 100,
                align: 'right',
                formula: '{amountSjZjzlSjap}-0==0?0:Math.round({amountSjZcjeSjap}/{amountSjZjzlSjap}*100*10)/10',
                cellRender: {
                  name: '$vxeRatio'
                }
              },
              {
                title: '总金额',
                field: 'numberSjZcjdZje',
                width: 100,
                align: 'right',
                formula: '{amountSjZjzlZje}-0==0?0:Math.round({amountSjZcjeZje}/{amountSjZjzlZje}*100*10)/10',
                cellRender: {
                  name: '$vxeRatio'
                }
              }
            ]
          }
        ]
      },
      {
        title: '县级',
        width: 100,
        align: 'center',
        children: [
          {
            title: '资金总量',
            width: 100,
            align: 'center',
            children: [
              {
                title: '中央安排',
                field: 'amountXjxd',
                width: 100,
                align: 'right',
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '省级安排',
                field: 'amountXjZjzlSnjap',
                width: 100,
                align: 'right',
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '市级安排',
                field: 'amountXjZjzlSjap',
                width: 100,
                align: 'right',
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '县级安排',
                field: 'amountXjZjzlXjap',
                width: 100,
                align: 'right',
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '总金额',
                field: 'amountXjZjzlZje',
                width: 100,
                align: 'right',
                cellRender: { name: '$vxeMoney' },
                formula: '{amountXjxd}+{amountXjZjzlSnjap}+{amountXjZjzlSjap}+{amountXjZjzlXjap}'
              }
            ]
          },
          {
            title: '整合金额',
            width: 100,
            align: 'center',
            children: [
              {
                title: '中央安排',
                field: 'amountXjZhjeZyap',
                width: 100,
                align: 'right',
                cellRender: { name: '$vxeMoney' },
                visible: false
              },
              {
                title: '省级安排',
                field: 'amountXjZhjeSnjap',
                width: 100,
                align: 'right',
                cellRender: { name: '$vxeMoney' },
                visible: false
              },
              {
                title: '市级安排',
                field: 'amountXjZhjeSjap',
                width: 100,
                align: 'right',
                cellRender: { name: '$vxeMoney' },
                visible: false
              },
              {
                title: '县级安排',
                field: 'amountXjZhjeXjap',
                width: 100,
                align: 'right',
                cellRender: { name: '$vxeMoney' },
                visible: false
              },
              {
                title: '总金额',
                field: 'amountXjZhjeZje',
                width: 100,
                align: 'right',
                cellRender: { name: '$vxeMoney' },
                visible: false
              }
            ]
          },
          {
            title: '支出金额',
            width: 100,
            align: 'center',
            children: [
              {
                title: '中央安排',
                field: 'amountXjpay',
                width: 100,
                align: 'right',
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '省级安排',
                field: 'amountXjZcjeSnjap',
                width: 100,
                align: 'right',
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '市级安排',
                field: 'amountXjZcjeSjap',
                width: 100,
                align: 'right',
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '县级安排',
                field: 'amountXjZcjeXjap',
                width: 100,
                align: 'right',
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '总金额',
                field: 'amountXjZcjeZje',
                width: 100,
                formula: '{amountXjpay}+{amountXjZcjeSnjap}+{amountXjZcjeSjap}+{amountXjZcjeXjap}',
                align: 'right',
                cellRender: { name: '$vxeMoney' }
              }
            ]
          },
          {
            title: '支出进度',
            width: 100,
            align: 'center',
            children: [
              {
                title: '中央安排',
                field: 'numberXjZcjdZyap',
                width: 100,
                align: 'right',
                formula: '{amountXjxd}-0==0?0:Math.round({amountXjpay}/{amountXjxd}*100*10)/10',
                cellRender: {
                  name: '$vxeRatio'
                }
              },
              {
                title: '省级安排',
                field: 'numberXjZcjdSnjap',
                width: 100,
                align: 'right',
                formula: '{amountXjZjzlSnjap}-0==0?0:Math.round({amountXjZcjeSnjap}/{amountXjZjzlSnjap}*100*10)/10',
                cellRender: {
                  name: '$vxeRatio'
                }
              },
              {
                title: '市级安排',
                field: 'numberXjZcjdSjap',
                width: 100,
                align: 'right',
                formula: '{amountXjZjzlSjap}-0==0?0:Math.round({amountXjZcjeSjap}/{amountXjZjzlSjap}*100*10)/10',
                cellRender: {
                  name: '$vxeRatio'
                }
              },
              {
                title: '县级安排',
                field: 'numberXjZcjdXjap',
                width: 100,
                align: 'right',
                formula: '{amountXjZjzlXjap}-0==0?0:Math.round({amountXjZcjeXjap}/{amountXjZjzlXjap}*100*10)/10',
                cellRender: {
                  name: '$vxeRatio'
                }
              },
              {
                title: '总金额',
                field: 'numberXjZcjdZje',
                width: 100,
                align: 'right',
                formula: '{amountXjZjzlZje}-0==0?0:Math.round({amountXjZcjeZje}/{amountXjZjzlZje}*100*10)/10',
                cellRender: {
                  name: '$vxeRatio'
                }
              }
            ]
          }
        ]
      },
      {
        title: '支出总数',
        width: 260,
        align: 'center',
        children: [
          {
            title: '中央安排',
            align: 'right',
            cellRender: { name: '$vxeMoney' },
            width: 100,
            field: 'amountZczsZyap',
            formula: '{amountSnjpay}+{amountSjpay}+{amountXjpay}'
          },
          {
            title: '省级安排',
            align: 'right',
            cellRender: { name: '$vxeMoney' },
            width: 100,
            formula: '{amountSnjZcjeSnjap}+{amountSjZcjeSnjap}+{amountXjZcjeSnjap}',
            field: 'amountZczsSnjap'
          },
          {
            title: '市级安排',
            align: 'right',
            cellRender: { name: '$vxeMoney' },
            width: 100,
            formula: '{amountSjZcjeSjap}+{amountXjZcjeSjap}',
            field: 'amountZczsSjap'
          },
          {
            title: '县级安排',
            align: 'right',
            cellRender: { name: '$vxeMoney' },
            width: 100,
            formula: '{amountXjZcjeXjap}',
            field: 'amountZczsXjap'
          },
          {
            title: '总金额',
            align: 'right',
            cellRender: { name: '$vxeMoney' },
            width: 100,
            field: 'amountZczsZje',
            formula: '{amountZczsZyap}+{amountZczsSnjap}+{amountZczsSjap}+{amountZczsXjap}'
          }
        ]
      }
    ],
    tableColumnsConfigCity: [
      {
        title: '资金名称',
        type: 'name',
        treeNode: true,
        fixed: false,
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
        title: '全省',
        width: 260,
        align: 'center',
        children: [
          {
            title: '资金总量',
            align: 'right',
            cellRender: { name: '$vxeMoney' },
            width: 200,
            field: 'amountZyxd'
          },
          {
            title: '整合金额',
            align: 'right',
            cellRender: { name: '$vxeMoney' },
            width: 200,
            field: 'amountQsZhje',
            visible: false
          },
          {
            title: '支出金额',
            align: 'right',
            cellRender: { name: '$vxeMoney' },
            width: 200,
            field: 'amountQsZcje'
          },
          {
            title: '支出进度',
            align: 'right',
            width: 200,
            field: 'pro',
            formula: '{amountZyxd}-0==0?0:Math.round({amountQsZcje}/{amountZyxd}*100*10)/10',
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
            title: '资金总量',
            width: 200,
            align: 'center',
            children: [
              {
                title: '中央安排',
                field: 'amountSnjxd',
                width: 200,
                align: 'right',
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '市级安排',
                field: 'amountSnjZjzlSjap',
                width: 200,
                align: 'right',
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '总金额',
                field: 'amountSnjZjzlZje',
                width: 200,
                align: 'right',
                cellRender: { name: '$vxeMoney' },
                formula: '{amountSnjxd}+{amountSnjZjzlSjap}'
              }
            ]
          },
          {
            title: '整合金额',
            width: 200,
            align: 'center',
            children: [
              {
                title: '中央安排',
                field: 'amountSnjZhjeZyap',
                width: 200,
                align: 'right',
                cellRender: { name: '$vxeMoney' },
                visible: false
              },
              {
                title: '市级安排',
                field: 'amountSnjZhjeSnjap',
                width: 200,
                align: 'right',
                cellRender: { name: '$vxeMoney' },
                visible: false
              },
              {
                title: '总金额',
                field: 'amountSnjZhjeZje',
                width: 200,
                align: 'right',
                cellRender: { name: '$vxeMoney' },
                formula: '{amountSnjZhjeZyap}+{amountSnjZhjeSnjap}',
                visible: false
              }
            ]
          },
          {
            title: '支出金额',
            width: 200,
            align: 'center',
            children: [
              {
                title: '中央安排',
                field: 'amountSnjpay',
                width: 200,
                align: 'right',
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '市级安排',
                field: 'amountSnjZcjeSnjap',
                width: 200,
                align: 'right',
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '总金额',
                field: 'amountSnjZcjeZje',
                width: 200,
                align: 'right',
                cellRender: { name: '$vxeMoney' },
                formula: '{amountSnjpay}+{amountSnjZcjeSnjap}'
              }
            ]
          },
          {
            title: '支出进度',
            width: 200,
            align: 'center',
            children: [
              {
                title: '中央安排',
                field: 'numberSnjZcjdZyap',
                width: 200,
                align: 'right',
                formula: '{amountSnjxd}-0==0?0:Math.round({amountSnjpay}/{amountSnjxd}*100*10)/10',
                cellRender: {
                  name: '$vxeRatio'
                }
              },
              {
                title: '市级安排',
                field: 'numberSnjZcjdSnjap',
                width: 200,
                align: 'right',
                formula: '{amountSnjZjzlSjap}-0==0?0:Math.round({amountSnjZcjeSnjap}/{amountSnjZjzlSjap}*100*10)/10',
                cellRender: {
                  name: '$vxeRatio'
                }
              },
              {
                title: '总金额',
                field: 'numberSnjZcjdzje',
                width: 200,
                align: 'right',
                formula: '{amountSnjZjzlZje}-0==0?0:Math.round({amountSnjZcjeZje}/{amountSnjZjzlZje}*100*10)/10',
                cellRender: {
                  name: '$vxeRatio'
                }
              }
            ]
          }
        ]
      },
      {
        title: '区级',
        width: 200,
        align: 'center',
        children: [
          {
            title: '资金总量',
            width: 200,
            align: 'center',
            children: [
              {
                title: '中央安排',
                field: 'amountXjxd',
                width: 200,
                align: 'right',
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '市级安排',
                field: 'amountXjZjzlSnjap',
                width: 200,
                align: 'right',
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '区级安排',
                field: 'amountXjZjzlXjap',
                width: 200,
                align: 'right',
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '总金额',
                field: 'amountXjZjzlZje',
                width: 200,
                align: 'right',
                cellRender: { name: '$vxeMoney' },
                formula: '{amountXjxd}+{amountXjZjzlSnjap}+{amountXjZjzlSjap}+{amountXjZjzlXjap}'
              }
            ]
          },
          {
            title: '整合金额',
            width: 200,
            align: 'center',
            children: [
              {
                title: '中央安排',
                field: 'amountXjZhjeZyap',
                width: 200,
                align: 'right',
                cellRender: { name: '$vxeMoney' },
                visible: false
              },
              {
                title: '市级安排',
                field: 'amountXjZhjeSnjap',
                width: 200,
                align: 'right',
                cellRender: { name: '$vxeMoney' },
                visible: false
              },
              {
                title: '区级安排',
                field: 'amountXjZhjeXjap',
                width: 200,
                align: 'right',
                cellRender: { name: '$vxeMoney' },
                visible: false
              },
              {
                title: '总金额',
                field: 'amountXjZhjeZje',
                width: 200,
                align: 'right',
                cellRender: { name: '$vxeMoney' },
                visible: false
              }
            ]
          },
          {
            title: '支出金额',
            width: 200,
            align: 'center',
            children: [
              {
                title: '中央安排',
                field: 'amountXjpay',
                width: 200,
                align: 'right',
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '市级安排',
                field: 'amountXjZcjeSnjap',
                width: 200,
                align: 'right',
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '区级安排',
                field: 'amountXjZcjeXjap',
                width: 200,
                align: 'right',
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '总金额',
                field: 'amountXjZcjeZje',
                width: 200,
                formula: '{amountXjpay}+{amountXjZcjeSnjap}+{amountXjZcjeSjap}+{amountXjZcjeXjap}',
                align: 'right',
                cellRender: { name: '$vxeMoney' }
              }
            ]
          },
          {
            title: '支出进度',
            width: 200,
            align: 'center',
            children: [
              {
                title: '中央安排',
                field: 'numberXjZcjdZyap',
                width: 200,
                align: 'right',
                formula: '{amountXjxd}-0==0?0:Math.round({amountXjpay}/{amountXjxd}*100*10)/10',
                cellRender: {
                  name: '$vxeRatio'
                }
              },
              {
                title: '市级安排',
                field: 'numberXjZcjdSnjap',
                width: 200,
                align: 'right',
                formula: '{amountXjZjzlSnjap}-0==0?0:Math.round({amountXjZcjeSnjap}/{amountXjZjzlSnjap}*100*10)/10',
                cellRender: {
                  name: '$vxeRatio'
                }
              },
              {
                title: '区级安排',
                field: 'numberXjZcjdXjap',
                width: 200,
                align: 'right',
                formula: '{amountXjZjzlXjap}-0==0?0:Math.round({amountXjZcjeXjap}/{amountXjZjzlXjap}*100*10)/10',
                cellRender: {
                  name: '$vxeRatio'
                }
              },
              {
                title: '总金额',
                field: 'numberXjZcjdZje',
                width: 200,
                align: 'right',
                formula: '{amountXjZjzlZje}-0==0?0:Math.round({amountXjZcjeZje}/{amountXjZjzlZje}*100*10)/10',
                cellRender: {
                  name: '$vxeRatio'
                }
              }
            ]
          }
        ]
      },
      {
        title: '支出总数',
        width: 260,
        align: 'center',
        children: [
          {
            title: '中央安排',
            align: 'right',
            cellRender: { name: '$vxeMoney' },
            width: 200,
            field: 'amountZczsZyap',
            formula: '{amountSnjpay}+{amountSjpay}+{amountXjpay}'
          },
          {
            title: '市级安排',
            align: 'right',
            cellRender: { name: '$vxeMoney' },
            width: 200,
            formula: '{amountSnjZcjeSnjap}+{amountSjZcjeSnjap}+{amountXjZcjeSnjap}',
            field: 'amountZczsSnjap'
          },
          {
            title: '区级安排',
            align: 'right',
            cellRender: { name: '$vxeMoney' },
            width: 200,
            formula: '{amountXjZcjeXjap}',
            field: 'amountZczsXjap'
          },
          {
            title: '总金额',
            align: 'right',
            cellRender: { name: '$vxeMoney' },
            width: 200,
            field: 'amountZczsZje',
            formula: '{amountZczsZyap}+{amountZczsSnjap}+{amountZczsSjap}+{amountZczsXjap}'
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
        name: '$vxeSelect',
        itemRender: {
          name: '$vxeSelect',
          options: [
            { value: '2022', label: '2022年' },
            { value: '2023', label: '2023年' }
          ],
          defaultValue: store.state?.userInfo?.year,
          props: {
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
      mofDivCodes: [store.state?.userInfo?.province],
      mofDivCodes_code__multiple: [store.state?.userInfo?.province],
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
          title: '全省',
          width: 260,
          align: 'center',
          children: [
            {
              title: '资金总量',
              align: 'right',
              cellRender: { name: '$vxeMoney' },
              width: 100,
              field: 'amountZyxd'
            },
            {
              title: '整合金额',
              align: 'right',
              cellRender: { name: '$vxeMoney' },
              width: 100,
              field: 'amountQsZhje',
              visible: false
            },
            {
              title: '支出金额',
              align: 'right',
              cellRender: { name: '$vxeMoney' },
              width: 100,
              field: 'amountQsZcje'
            },
            {
              title: '支出进度',
              align: 'right',
              width: 100,
              field: 'pro',
              formula: '{amountZyxd}-0==0?0:Math.round({amountQsZcje}/{amountZyxd}*100*10)/10',
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
              title: '资金总量',
              width: 100,
              align: 'center',
              children: [
                {
                  title: '中央安排',
                  field: 'amountSnjxd',
                  width: 100,
                  align: 'right',
                  cellRender: { name: '$vxeMoney' }
                },
                {
                  title: '省级安排',
                  field: 'amountSnjZjzlSjap',
                  width: 100,
                  align: 'right',
                  cellRender: { name: '$vxeMoney' }
                },
                {
                  title: '总金额',
                  field: 'amountSnjZjzlZje',
                  width: 100,
                  align: 'right',
                  cellRender: { name: '$vxeMoney' },
                  formula: '{amountSnjxd}+{amountSnjZjzlSjap}'
                }
              ]
            },
            {
              title: '整合金额',
              width: 100,
              align: 'center',
              children: [
                {
                  title: '中央安排',
                  field: 'amountSnjZhjeZyap',
                  width: 100,
                  align: 'right',
                  cellRender: { name: '$vxeMoney' },
                  visible: false
                },
                {
                  title: '省级安排',
                  field: 'amountSnjZhjeSnjap',
                  width: 100,
                  align: 'right',
                  cellRender: { name: '$vxeMoney' },
                  visible: false
                },
                {
                  title: '总金额',
                  field: 'amountSnjZhjeZje',
                  width: 100,
                  align: 'right',
                  cellRender: { name: '$vxeMoney' },
                  formula: '{amountSnjZhjeZyap}+{amountSnjZhjeSnjap}',
                  visible: false
                }
              ]
            },
            {
              title: '支出金额',
              width: 100,
              align: 'center',
              children: [
                {
                  title: '中央安排',
                  field: 'amountSnjpay',
                  width: 100,
                  align: 'right',
                  cellRender: { name: '$vxeMoney' }
                },
                {
                  title: '省级安排',
                  field: 'amountSnjZcjeSnjap',
                  width: 100,
                  align: 'right',
                  cellRender: { name: '$vxeMoney' }
                },
                {
                  title: '总金额',
                  field: 'amountSnjZcjeZje',
                  width: 100,
                  align: 'right',
                  cellRender: { name: '$vxeMoney' },
                  formula: '{amountSnjpay}+{amountSnjZcjeSnjap}'
                }
              ]
            },
            {
              title: '支出进度',
              width: 100,
              align: 'center',
              children: [
                {
                  title: '中央安排',
                  field: 'numberSnjZcjdZyap',
                  width: 100,
                  align: 'right',
                  formula: '{amountSnjxd}-0==0?0:Math.round({amountSnjpay}/{amountSnjxd}*100*10)/10',
                  cellRender: {
                    name: '$vxeRatio'
                  }
                },
                {
                  title: '省级安排',
                  field: 'numberSnjZcjdSnjap',
                  width: 100,
                  align: 'right',
                  formula: '{amountSnjZjzlSjap}-0==0?0:Math.round({amountSnjZcjeSnjap}/{amountSnjZjzlSjap}*100*10)/10',
                  cellRender: {
                    name: '$vxeRatio'
                  }
                },
                {
                  title: '总金额',
                  field: 'numberSnjZcjdzje',
                  width: 100,
                  align: 'right',
                  formula: '{amountSnjZjzlZje}-0==0?0:Math.round({amountSnjZcjeZje}/{amountSnjZjzlZje}*100*10)/10',
                  cellRender: {
                    name: '$vxeRatio'
                  }
                }
              ]
            }
          ]
        },
        {
          title: '市级',
          width: 100,
          align: 'center',
          children: [
            {
              title: '资金总量',
              width: 100,
              align: 'center',
              children: [
                {
                  title: '中央安排',
                  field: 'amountSjxd',
                  width: 100,
                  align: 'right',
                  cellRender: { name: '$vxeMoney' }
                },
                {
                  title: '省级安排',
                  field: 'amountSjZjzlSnjap',
                  width: 100,
                  align: 'right',
                  cellRender: { name: '$vxeMoney' }
                },
                {
                  title: '市级安排',
                  field: 'amountSjZjzlSjap',
                  width: 100,
                  align: 'right',
                  cellRender: { name: '$vxeMoney' }
                },
                {
                  title: '总金额',
                  field: 'amountSjZjzlZje',
                  width: 100,
                  align: 'right',
                  cellRender: { name: '$vxeMoney' },
                  formula: '{amountSjxd}+{amountSjZjzlSnjap}+{amountSjZjzlSjap}'
                }
              ]
            },
            {
              title: '整合金额',
              width: 100,
              align: 'center',
              children: [
                {
                  title: '中央安排',
                  field: 'amountSjZhjeZyap',
                  width: 100,
                  align: 'right',
                  cellRender: { name: '$vxeMoney' },
                  visible: false
                },
                {
                  title: '省级安排',
                  field: 'amountSjZhjeSnjap',
                  width: 100,
                  align: 'right',
                  cellRender: { name: '$vxeMoney' },
                  visible: false
                },
                {
                  title: '市级安排',
                  field: 'amountSjZhjeSjap',
                  width: 100,
                  align: 'right',
                  cellRender: { name: '$vxeMoney' },
                  visible: false
                },
                {
                  title: '总金额',
                  field: 'amountSjZhjezje',
                  width: 100,
                  align: 'right',
                  cellRender: { name: '$vxeMoney' },
                  visible: false
                }
              ]
            },
            {
              title: '支出金额',
              width: 100,
              align: 'center',
              children: [
                {
                  title: '中央安排',
                  field: 'amountSjpay',
                  width: 100,
                  align: 'right',
                  cellRender: { name: '$vxeMoney' }
                },
                {
                  title: '省级安排',
                  field: 'amountSjZcjeSnjap',
                  width: 100,
                  align: 'right',
                  cellRender: { name: '$vxeMoney' }
                },
                {
                  title: '市级安排',
                  field: 'amountSjZcjeSjap',
                  width: 100,
                  align: 'right',
                  cellRender: { name: '$vxeMoney' }
                },
                {
                  title: '总金额',
                  field: 'amountSjZcjeZje',
                  width: 100,
                  align: 'right',
                  cellRender: { name: '$vxeMoney' },
                  formula: '{amountSjpay}+{amountSjZcjeSnjap}+{amountSjZcjeSjap}'
                }
              ]
            },
            {
              title: '支出进度',
              width: 100,
              align: 'center',
              children: [
                {
                  title: '中央安排',
                  field: 'numberSjZcjdZyap',
                  width: 100,
                  align: 'right',
                  formula: '{amountSjxd}-0==0?0:Math.round({amountSjpay}/{amountSjxd}*100*10)/10',
                  cellRender: {
                    name: '$vxeRatio'
                  }
                },
                {
                  title: '省级安排',
                  field: 'numberSjZcjdSnjap',
                  width: 100,
                  align: 'right',
                  formula: '{amountSjZjzlSnjap}-0==0?0:Math.round({amountSjZcjeSnjap}/{amountSjZjzlSnjap}*100*10)/10',
                  cellRender: {
                    name: '$vxeRatio'
                  }
                },
                {
                  title: '市级安排',
                  field: 'numberSjZcjdSjap',
                  width: 100,
                  align: 'right',
                  formula: '{amountSjZjzlSjap}-0==0?0:Math.round({amountSjZcjeSjap}/{amountSjZjzlSjap}*100*10)/10',
                  cellRender: {
                    name: '$vxeRatio'
                  }
                },
                {
                  title: '总金额',
                  field: 'numberSjZcjdZje',
                  width: 100,
                  align: 'right',
                  formula: '{amountSjZjzlZje}-0==0?0:Math.round({amountSjZcjeZje}/{amountSjZjzlZje}*100*10)/10',
                  cellRender: {
                    name: '$vxeRatio'
                  }
                }
              ]
            }
          ]
        },
        {
          title: '县级',
          width: 100,
          align: 'center',
          children: [
            {
              title: '资金总量',
              width: 100,
              align: 'center',
              children: [
                {
                  title: '中央安排',
                  field: 'amountXjxd',
                  width: 100,
                  align: 'right',
                  cellRender: { name: '$vxeMoney' }
                },
                {
                  title: '省级安排',
                  field: 'amountXjZjzlSnjap',
                  width: 100,
                  align: 'right',
                  cellRender: { name: '$vxeMoney' }
                },
                {
                  title: '市级安排',
                  field: 'amountXjZjzlSjap',
                  width: 100,
                  align: 'right',
                  cellRender: { name: '$vxeMoney' }
                },
                {
                  title: '县级安排',
                  field: 'amountXjZjzlXjap',
                  width: 100,
                  align: 'right',
                  cellRender: { name: '$vxeMoney' }
                },
                {
                  title: '总金额',
                  field: 'amountXjZjzlZje',
                  width: 100,
                  align: 'right',
                  cellRender: { name: '$vxeMoney' },
                  formula: '{amountXjxd}+{amountXjZjzlSnjap}+{amountXjZjzlSjap}+{amountXjZjzlXjap}'
                }
              ]
            },
            {
              title: '整合金额',
              width: 100,
              align: 'center',
              children: [
                {
                  title: '中央安排',
                  field: 'amountXjZhjeZyap',
                  width: 100,
                  align: 'right',
                  cellRender: { name: '$vxeMoney' },
                  visible: false
                },
                {
                  title: '省级安排',
                  field: 'amountXjZhjeSnjap',
                  width: 100,
                  align: 'right',
                  cellRender: { name: '$vxeMoney' },
                  visible: false
                },
                {
                  title: '市级安排',
                  field: 'amountXjZhjeSjap',
                  width: 100,
                  align: 'right',
                  cellRender: { name: '$vxeMoney' },
                  visible: false
                },
                {
                  title: '县级安排',
                  field: 'amountXjZhjeXjap',
                  width: 100,
                  align: 'right',
                  cellRender: { name: '$vxeMoney' },
                  visible: false
                },
                {
                  title: '总金额',
                  field: 'amountXjZhjeZje',
                  width: 100,
                  align: 'right',
                  cellRender: { name: '$vxeMoney' },
                  visible: false
                }
              ]
            },
            {
              title: '支出金额',
              width: 100,
              align: 'center',
              children: [
                {
                  title: '中央安排',
                  field: 'amountXjpay',
                  width: 100,
                  align: 'right',
                  cellRender: { name: '$vxeMoney' }
                },
                {
                  title: '省级安排',
                  field: 'amountXjZcjeSnjap',
                  width: 100,
                  align: 'right',
                  cellRender: { name: '$vxeMoney' }
                },
                {
                  title: '市级安排',
                  field: 'amountXjZcjeSjap',
                  width: 100,
                  align: 'right',
                  cellRender: { name: '$vxeMoney' }
                },
                {
                  title: '县级安排',
                  field: 'amountXjZcjeXjap',
                  width: 100,
                  align: 'right',
                  cellRender: { name: '$vxeMoney' }
                },
                {
                  title: '总金额',
                  field: 'amountXjZcjeZje',
                  width: 100,
                  formula: '{amountXjpay}+{amountXjZcjeSnjap}+{amountXjZcjeSjap}+{amountXjZcjeXjap}',
                  align: 'right',
                  cellRender: { name: '$vxeMoney' }
                }
              ]
            },
            {
              title: '支出进度',
              width: 100,
              align: 'center',
              children: [
                {
                  title: '中央安排',
                  field: 'numberXjZcjdZyap',
                  width: 100,
                  align: 'right',
                  formula: '{amountXjxd}-0==0?0:Math.round({amountXjpay}/{amountXjxd}*100*10)/10',
                  cellRender: {
                    name: '$vxeRatio'
                  }
                },
                {
                  title: '省级安排',
                  field: 'numberXjZcjdSnjap',
                  width: 100,
                  align: 'right',
                  formula: '{amountXjZjzlSnjap}-0==0?0:Math.round({amountXjZcjeSnjap}/{amountXjZjzlSnjap}*100*10)/10',
                  cellRender: {
                    name: '$vxeRatio'
                  }
                },
                {
                  title: '市级安排',
                  field: 'numberXjZcjdSjap',
                  width: 100,
                  align: 'right',
                  formula: '{amountXjZjzlSjap}-0==0?0:Math.round({amountXjZcjeSjap}/{amountXjZjzlSjap}*100*10)/10',
                  cellRender: {
                    name: '$vxeRatio'
                  }
                },
                {
                  title: '县级安排',
                  field: 'numberXjZcjdXjap',
                  width: 100,
                  align: 'right',
                  formula: '{amountXjZjzlXjap}-0==0?0:Math.round({amountXjZcjeXjap}/{amountXjZjzlXjap}*100*10)/10',
                  cellRender: {
                    name: '$vxeRatio'
                  }
                },
                {
                  title: '总金额',
                  field: 'numberXjZcjdZje',
                  width: 100,
                  align: 'right',
                  formula: '{amountXjZjzlZje}-0==0?0:Math.round({amountXjZcjeZje}/{amountXjZjzlZje}*100*10)/10',
                  cellRender: {
                    name: '$vxeRatio'
                  }
                }
              ]
            }
          ]
        },
        {
          title: '镇级',
          width: 200,
          align: 'center',
          children: [
            {
              title: '资金总量',
              width: 200,
              align: 'center',
              children: [
                {
                  title: '中央安排',
                  field: 'amountZjxd',
                  width: 200,
                  align: 'right',
                  sortable: true,
                  cellRender: { name: '$vxeMoney' }
                },
                {
                  title: '省级安排',
                  field: 'amountZjZjzlSnjap',
                  width: 200,
                  align: 'right',
                  sortable: true,
                  cellRender: { name: '$vxeMoney' }
                },
                {
                  title: '市级安排',
                  field: 'amountZjZjzlSjap',
                  width: 200,
                  align: 'right',
                  sortable: true,
                  cellRender: { name: '$vxeMoney' }
                },
                {
                  title: '县级安排',
                  field: 'amountZjZjzlXjap',
                  width: 200,
                  align: 'right',
                  sortable: true,
                  cellRender: { name: '$vxeMoney' }
                },
                {
                  title: '镇级安排',
                  field: 'amountZjZjzlZjap',
                  width: 200,
                  align: 'right',
                  sortable: true,
                  cellRender: { name: '$vxeMoney' }
                },
                {
                  title: '总金额',
                  field: 'amountXjZjzlZje',
                  width: 200,
                  align: 'right',
                  sortable: true,
                  cellRender: { name: '$vxeMoney' },
                  formula: '{amountXjxd}'
                }
              ]
            },
            {
              title: '整合金额',
              width: 200,
              align: 'center',
              children: [
                {
                  title: '中央安排',
                  field: 'amountXjZhjeZyap',
                  width: 200,
                  align: 'right',
                  sortable: true,
                  cellRender: { name: '$vxeMoney' }
                },
                {
                  title: '省级安排',
                  field: 'amountXjZhjeSnjap',
                  width: 200,
                  align: 'right',
                  sortable: true,
                  cellRender: { name: '$vxeMoney' }
                },
                {
                  title: '市级安排',
                  field: 'amountXjZhjeSjap',
                  width: 200,
                  align: 'right',
                  sortable: true,
                  cellRender: { name: '$vxeMoney' }
                },
                {
                  title: '县级安排',
                  field: 'amountXjZhjeXjap',
                  width: 200,
                  align: 'right',
                  sortable: true,
                  cellRender: { name: '$vxeMoney' }
                },
                {
                  title: '镇级安排',
                  field: 'amountZjZhjeZjap',
                  width: 200,
                  align: 'right',
                  sortable: true,
                  cellRender: { name: '$vxeMoney' }
                },
                {
                  title: '总金额',
                  field: 'amountXjZhjeZje',
                  width: 200,
                  align: 'right',
                  sortable: true,
                  cellRender: { name: '$vxeMoney' }
                }
              ]
            },
            {
              title: '支出金额',
              width: 200,
              align: 'center',
              children: [
                {
                  title: '中央安排',
                  field: 'amountXjpay',
                  width: 200,
                  align: 'right',
                  sortable: true,
                  cellRender: { name: '$vxeMoney' }
                },
                {
                  title: '省级安排',
                  field: 'amountXjZcjeSnjap',
                  width: 200,
                  align: 'right',
                  sortable: true,
                  cellRender: { name: '$vxeMoney' }
                },
                {
                  title: '市级安排',
                  field: 'amountXjZcjeSjap',
                  width: 200,
                  align: 'right',
                  sortable: true,
                  cellRender: { name: '$vxeMoney' }
                },
                {
                  title: '县级安排',
                  field: 'amountXjZcjeXjap',
                  width: 200,
                  align: 'right',
                  sortable: true,
                  cellRender: { name: '$vxeMoney' }
                },
                {
                  title: '镇级安排',
                  field: 'amountZjZcjeZjap',
                  width: 200,
                  align: 'right',
                  sortable: true,
                  cellRender: { name: '$vxeMoney' }
                },
                {
                  title: '总金额',
                  field: 'amountXjZcjeZje',
                  width: 200,
                  align: 'right',
                  sortable: true,
                  cellRender: { name: '$vxeMoney' }
                }
              ]
            },
            {
              title: '支出进度',
              width: 200,
              align: 'center',
              children: [
                {
                  title: '中央安排',
                  field: 'numberXjZcjdZyap',
                  width: 200,
                  align: 'right',
                  sortable: true,
                  formula: '{amountXjxd}-0==0?0:{amountXjpay}/{amountXjxd}*100',
                  cellRender: {
                    name: '$vxeRatio'
                  }
                },
                {
                  title: '省级安排',
                  field: 'numberXjZcjdSnjap',
                  width: 200,
                  align: 'right',
                  formula: '0',
                  sortable: true,
                  cellRender: {
                    name: '$vxeRatio'
                  }
                },
                {
                  title: '市级安排',
                  field: 'numberXjZcjdSjap',
                  width: 200,
                  align: 'right',
                  formula: '0',
                  sortable: true,
                  cellRender: {
                    name: '$vxeRatio'
                  }
                },
                {
                  title: '县级安排',
                  field: 'numberXjZcjdXjap',
                  width: 200,
                  align: 'right',
                  formula: '0',
                  sortable: true,
                  cellRender: {
                    name: '$vxeRatio'
                  }
                },
                {
                  title: '镇级安排',
                  field: 'numberZjZcjdZjap',
                  width: 200,
                  align: 'right',
                  sortable: true,
                  cellRender: { name: '$vxeMoney' }
                },
                {
                  title: '总金额',
                  field: 'numberXjZcjdZje',
                  width: 200,
                  align: 'right',
                  sortable: true,
                  formula: '{numberXjZcjdZyap}',
                  cellRender: {
                    name: '$vxeRatio'
                  }
                }
              ]
            }
          ]
        },
        {
          title: '支出总数',
          width: 260,
          align: 'center',
          children: [
            {
              title: '中央安排',
              align: 'right',
              sortable: true,
              cellRender: { name: '$vxeMoney' },
              width: 200,
              field: 'amountZczsZyap',
              formula: '{amountSnjpay}+{amountSjpay}+{amountXjpay}+{amountZjpay}'
            },
            {
              title: '省级安排',
              align: 'right',
              sortable: true,
              cellRender: { name: '$vxeMoney' },
              width: 200,
              field: 'amountZczsSnjap'
            },
            {
              title: '市级安排',
              align: 'right',
              sortable: true,
              cellRender: { name: '$vxeMoney' },
              width: 200,
              field: 'amountZczsSjap'
            },
            {
              title: '县级安排',
              align: 'right',
              sortable: true,
              cellRender: { name: '$vxeMoney' },
              width: 200,
              field: 'amountZczsXjap'
            },
            {
              title: '总金额',
              align: 'right',
              sortable: true,
              cellRender: { name: '$vxeMoney' },
              width: 200,
              field: 'amountZczsZje',
              formula: '{amountZczsZyap}'
            }
          ]
        }
      ],
      tableData: []
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
