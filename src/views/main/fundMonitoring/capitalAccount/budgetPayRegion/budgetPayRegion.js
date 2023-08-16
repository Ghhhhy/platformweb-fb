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
    tableColumnsConfig: [
      {
        title: '地区名称',
        type: 'name',
        treeNode: true,
        fixed: 'left',
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
        title: '全省',
        width: 100,
        align: 'center',
        children: [
          {
            title: '资金总量',
            field: 'amountZjzl',
            width: 100,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '整合资金',
            field: 'cAmount',
            width: 100,
            align: 'right',
            cellRender: { name: '$vxeMoney' },
            visible: false
          },
          {
            title: '支出资金',
            field: 'amountZjzc',
            width: 100,
            align: 'right',
            cellRender: {
              name: '$vxeMoney'
            }
          },
          {
            title: '支出进度',
            field: 'pPro',
            width: 100,
            align: 'right',
            cellRender: {
              name: '$vxeRatio'
            },
            formula: '(({amountZjzl}+{cAmount})-0==0?0:Math.round({amountZjzc}/({amountZjzl}+{cAmount})*100*10)/10'
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
            align: 'right',
            children: [
              {
                title: '中央安排',
                field: 'amountSnjzyxd',
                width: 100,
                align: 'right',
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '地方安排',
                field: 'amountSnjdfdf',
                width: 100,
                align: 'right',
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '总金额',
                field: 'saaAmount',
                width: 100,
                align: 'right',
                cellRender: {
                  name: '$vxeMoney'
                },
                formula: '({amountSnjzyxd}+{amountSnjdfdf})'
              }
            ]
          },
          {
            title: '整合金额',
            width: 100,
            align: 'right',
            children: [
              {
                title: '中央安排',
                field: 'szyapcAmount',
                width: 100,
                align: 'right',
                cellRender: { name: '$vxeMoney' },
                visible: false
              },
              {
                title: '地方安排',
                field: 'sdfapcAmount',
                width: 100,
                align: 'right',
                cellRender: { name: '$vxeMoney' },
                visible: false
              },
              {
                title: '总金额',
                field: 'sacAmount',
                width: 100,
                align: 'right',
                cellRender: {
                  name: '$vxeMoney'
                },
                formula: '({szyapcAmount}+{sdfapcAmount})',
                visible: false
              }
            ]
          },
          {
            title: '支出金额',
            width: 100,
            align: 'right',
            children: [
              {
                title: '中央安排',
                field: 'amountSnjzypay',
                width: 100,
                align: 'right',
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '地方安排',
                field: 'amountSnjdfpay',
                width: 100,
                align: 'right',
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '总金额',
                field: 'sapAmount',
                width: 100,
                align: 'right',
                cellRender: {
                  name: '$vxeMoney'
                },
                formula: '({amountSnjzypay}+{amountSnjdfpay})'
              }
            ]
          },
          {
            title: '支出进度',
            width: 100,
            align: 'right',
            children: [
              {
                title: '中央安排',
                field: 'szyappPro',
                width: 100,
                align: 'right',
                cellRender: { name: '$vxeRatio' },
                formula: '{amountSnjzyxd}-0==0?0:Math.round({amountSnjzypay}/{amountSnjzyxd}*100*10)/10'
              },
              {
                title: '地方安排',
                field: 'sdfappPro',
                width: 100,
                align: 'right',
                cellRender: { name: '$vxeRatio' },
                formula: '{amountSnjdfdf}-0==0?0:Math.round({amountSnjdfpay}/{amountSnjdfdf}*100*10/10)'
              },
              {
                title: '总进度',
                field: 'sapPro',
                width: 100,
                align: 'right',
                cellRender: {
                  name: '$vxeRatio'
                },
                formula: '{saaAmount}-0==0?0:Math.round({sapAmount}/{saaAmount}*100*10)/10'
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
            align: 'right',
            children: [
              {
                title: '中央安排',
                field: 'amountSjzydf',
                width: 100,
                align: 'right',
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '地方安排',
                field: 'amountSjdfdf',
                width: 100,
                align: 'right',
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '总金额',
                field: 'shaaAmount',
                width: 100,
                align: 'right',
                cellRender: {
                  name: '$vxeMoney'
                },
                formula: '({amountSjzydf}+{amountSjdfdf})'
              }
            ]
          },
          {
            title: '整合金额',
            width: 100,
            align: 'right',
            children: [
              {
                title: '中央安排',
                field: 'shzyapcAmount',
                width: 100,
                align: 'right',
                cellRender: { name: '$vxeMoney' },
                visible: false
              },
              {
                title: '地方安排',
                field: 'shdfapcAmount',
                width: 100,
                align: 'right',
                cellRender: { name: '$vxeMoney' },
                visible: false
              },
              {
                title: '总金额',
                field: 'shacAmount',
                width: 100,
                align: 'right',
                cellRender: {
                  name: '$vxeMoney'
                },
                formula: '({shzyapcAmount}+{shdfapcAmount})',
                visible: false
              }
            ]
          },
          {
            title: '支出金额',
            width: 100,
            align: 'right',
            children: [
              {
                title: '中央安排',
                field: 'amountSjzypay',
                width: 100,
                align: 'right',
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '地方安排',
                field: 'amountSjdfpay',
                width: 100,
                align: 'right',
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '总金额',
                field: 'shapAmount',
                width: 100,
                align: 'right',
                cellRender: {
                  name: '$vxeMoney'
                },
                formula: '({amountSjzypay}+{amountSjdfpay})'
              }
            ]
          },
          {
            title: '支出进度',
            width: 100,
            align: 'right',
            children: [
              {
                title: '中央安排',
                field: 'shzyappPro',
                width: 100,
                align: 'right',
                cellRender: { name: '$vxeRatio' },
                formula: '{amountSjzydf}-0==0?0:Math.round({amountSjzypay}/{amountSjzydf}*100*10)/10'
              },
              {
                title: '地方安排',
                field: 'shdfappPro',
                width: 100,
                align: 'right',
                cellRender: { name: '$vxeRatio' },
                formula: '{amountSjdfdf}-0==0?0:Math.round({amountSjdfpay}/{amountSjdfdf}*100*10)/10'
              },
              {
                title: '总进度',
                field: 'shapPro',
                width: 100,
                align: 'right',
                cellRender: {
                  name: '$vxeRatio'
                },
                formula: '{shaaAmount}-0==0?0:Math.round({shapAmount}/{shaaAmount}*100*10)/10'
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
            align: 'right',
            children: [
              {
                title: '中央安排',
                field: 'amountXjzydf',
                width: 100,
                align: 'right',
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '地方安排',
                field: 'amountXjdfdf',
                width: 100,
                align: 'right',
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '总金额',
                field: 'xaaAmount',
                width: 100,
                align: 'right',
                cellRender: {
                  name: '$vxeMoney'
                },
                formula: '({amountXjzydf}+{amountXjdfdf})'
              }
            ]
          },
          {
            title: '整合金额',
            width: 100,
            align: 'right',
            children: [
              {
                title: '中央安排',
                field: 'xzyapcAmount',
                width: 100,
                align: 'right',
                cellRender: { name: '$vxeMoney' },
                visible: false
              },
              {
                title: '地方安排',
                field: 'xdfapcAmount',
                width: 100,
                align: 'right',
                cellRender: { name: '$vxeMoney' },
                visible: false
              },
              {
                title: '总金额',
                field: 'xacAmount',
                width: 100,
                align: 'right',
                cellRender: {
                  name: '$vxeMoney'
                },
                formula: '({xzyapcAmount}+{xdfapcAmount})',
                visible: false
              }
            ]
          },
          {
            title: '支出金额',
            width: 100,
            align: 'right',
            children: [
              {
                title: '中央安排',
                field: 'amountXjzypay',
                width: 100,
                align: 'right',
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '地方安排',
                field: 'amountXjdfpay',
                width: 100,
                align: 'right',
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '总金额',
                field: 'xapAmount',
                width: 100,
                align: 'right',
                cellRender: {
                  name: '$vxeMoney'
                },
                formula: '({amountXjzypay}+{amountXjdfpay})'
              }
            ]
          },
          {
            title: '支出进度',
            width: 100,
            align: 'right',
            children: [
              {
                title: '中央安排',
                field: 'xzyapPro',
                width: 100,
                align: 'right',
                cellRender: { name: '$vxeRatio' },
                formula: '{amountXjzydf}-0==0?0:Math.round({amountXjzypay}/{amountXjzydf}*100*10)/10'
              },
              {
                title: '地方安排',
                field: 'xdfappPro',
                width: 100,
                align: 'right',
                cellRender: { name: '$vxeRatio' },
                formula: '{amountXjdfdf}-0==0?0:Math.round({amountXjdfpay}/{amountXjdfdf}*100*10)/10'
              },
              {
                title: '总进度',
                field: 'xapPro',
                width: 100,
                align: 'right',
                cellRender: {
                  name: '$vxeRatio'
                },
                formula: '{xaaAmount}-0==0?0:Math.round({xapAmount}/{xaaAmount}*100*10)/10'
              }
            ]
          }
        ]
      },
      {
        title: '支出总数',
        width: 100,
        align: 'center',
        children: [
          {
            title: '中央安排',
            field: 'zzyapAmount',
            width: 100,
            align: 'right',
            cellRender: { name: '$vxeMoney' },
            formula: '{amountSnjzypay}+{amountSjzypay}+{amountXjzypay}'
          },
          {
            title: '地方安排',
            field: 'zdfapAmount',
            width: 100,
            align: 'right',
            cellRender: { name: '$vxeMoney' },
            formula: '{amountSnjdfpay}+{amountSjdfpay}+{amountXjdfpay}'
          },
          {
            title: '总金额',
            field: 'zaAmount',
            width: 100,
            align: 'right',
            cellRender: {
              name: '$vxeMoney'
            },
            formula: '({zzyapAmount}+{zdfapAmount})'
          }
        ]
      }
    ],
    tableColumnsConfigCity: [
      {
        title: '地区名称',
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
        width: 200,
        align: 'center',
        children: [
          {
            title: '资金总量',
            field: 'amountZjzl',
            width: 200,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '整合资金',
            field: 'cAmount',
            width: 200,
            align: 'right',
            cellRender: { name: '$vxeMoney' },
            visible: false
          },
          {
            title: '支出资金',
            field: 'amountZjzc',
            width: 200,
            align: 'right',
            cellRender: {
              name: '$vxeMoney'
            }
          },
          {
            title: '支出进度',
            field: 'pPro',
            width: 200,
            align: 'right',
            cellRender: {
              name: '$vxeRatio'
            },
            // formula: '{amountZjzl}-0==0?0:Math.round({amountZjzc}/{amountZjzl}*100*10)/10'
            formula: '({amountZjzl}-0==0?0:{amountZjzc}/{amountZjzl}*100)'
            // formula: '(({amountZjzl}+{cAmount})-0==0?0:Math.round({amountZjzc}/({amountZjzl}+{cAmount})*100*10)/10'
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
            align: 'right',
            children: [
              {
                title: '中央安排',
                field: 'amountSnjzyxd',
                width: 200,
                align: 'right',
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '地方安排',
                field: 'amountSnjdfdf',
                width: 200,
                align: 'right',
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '总金额',
                field: 'saaAmount',
                width: 200,
                align: 'right',
                cellRender: {
                  name: '$vxeMoney'
                },
                formula: '({amountSnjzyxd}+{amountSnjdfdf})'
              }
            ]
          },
          {
            title: '整合金额',
            width: 200,
            align: 'right',
            children: [
              {
                title: '中央安排',
                field: 'szyapcAmount',
                width: 200,
                align: 'right',
                cellRender: { name: '$vxeMoney' },
                visible: false
              },
              {
                title: '地方安排',
                field: 'sdfapcAmount',
                width: 200,
                align: 'right',
                cellRender: { name: '$vxeMoney' },
                visible: false
              },
              {
                title: '总金额',
                field: 'sacAmount',
                width: 200,
                align: 'right',
                cellRender: {
                  name: '$vxeMoney'
                },
                formula: '({szyapcAmount}+{sdfapcAmount})',
                visible: false
              }
            ]
          },
          {
            title: '支出金额',
            width: 200,
            align: 'right',
            children: [
              {
                title: '中央安排',
                field: 'amountSnjzypay',
                width: 200,
                align: 'right',
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '地方安排',
                field: 'amountSnjdfpay',
                width: 200,
                align: 'right',
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '总金额',
                field: 'sapAmount',
                width: 200,
                align: 'right',
                cellRender: {
                  name: '$vxeMoney'
                },
                formula: '({amountSnjzypay}+{amountSnjdfpay})'
              }
            ]
          },
          {
            title: '支出进度',
            width: 200,
            align: 'right',
            children: [
              {
                title: '中央安排',
                field: 'szyappPro',
                width: 200,
                align: 'right',
                cellRender: { name: '$vxeRatio' },
                formula: '{amountSnjzyxd}-0==0?0:Math.round({amountSnjzypay}/{amountSnjzyxd}*100*10)/10'
              },
              {
                title: '地方安排',
                field: 'sdfappPro',
                width: 200,
                align: 'right',
                cellRender: { name: '$vxeRatio' },
                formula: '{amountSnjdfdf}-0==0?0:Math.round({amountSnjdfpay}/{amountSnjdfdf}*100*10)/10'
              },
              {
                title: '总进度',
                field: 'sapPro',
                width: 200,
                align: 'right',
                cellRender: {
                  name: '$vxeRatio'
                },
                formula: '{saaAmount}-0==0?0:Math.round({sapAmount}/{saaAmount}*100*10)/10'
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
            align: 'right',
            children: [
              {
                title: '中央安排',
                field: 'amountXjzydf',
                width: 200,
                align: 'right',
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '地方安排',
                field: 'amountXjdfdf',
                width: 200,
                align: 'right',
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '总金额',
                field: 'xaaAmount',
                width: 200,
                align: 'right',
                cellRender: {
                  name: '$vxeMoney'
                },
                formula: '({amountXjzydf}+{amountXjdfdf})'
              }
            ]
          },
          {
            title: '整合金额',
            width: 200,
            align: 'right',
            children: [
              {
                title: '中央安排',
                field: 'xzyapcAmount',
                width: 200,
                align: 'right',
                cellRender: { name: '$vxeMoney' },
                visible: false
              },
              {
                title: '地方安排',
                field: 'xdfapcAmount',
                width: 200,
                align: 'right',
                cellRender: { name: '$vxeMoney' },
                visible: false
              },
              {
                title: '总金额',
                field: 'xacAmount',
                width: 200,
                align: 'right',
                cellRender: {
                  name: '$vxeMoney'
                },
                formula: '({xzyapcAmount}+{xdfapcAmount})',
                visible: false
              }
            ]
          },
          {
            title: '支出金额',
            width: 200,
            align: 'right',
            children: [
              {
                title: '中央安排',
                field: 'amountXjzypay',
                width: 200,
                align: 'right',
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '地方安排',
                field: 'amountXjdfpay',
                width: 200,
                align: 'right',
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '总金额',
                field: 'xapAmount',
                width: 200,
                align: 'right',
                cellRender: {
                  name: '$vxeMoney'
                },
                formula: '({amountXjzypay}+{amountXjdfpay})'
              }
            ]
          },
          {
            title: '支出进度',
            width: 200,
            align: 'right',
            children: [
              {
                title: '中央安排',
                field: 'xzyapPro',
                width: 200,
                align: 'right',
                cellRender: { name: '$vxeRatio' },
                formula: '{amountXjzydf}-0==0?0:Math.round({amountXjzypay}/{amountXjzydf}*100*10)/10'
              },
              {
                title: '地方安排',
                field: 'xdfappPro',
                width: 200,
                align: 'right',
                cellRender: { name: '$vxeRatio' },
                formula: '{amountXjdfdf}-0==0?0:Math.round({amountXjdfpay}/{amountXjdfdf}*100*10)/10'
              },
              {
                title: '总进度',
                field: 'xapPro',
                width: 200,
                align: 'right',
                cellRender: {
                  name: '$vxeRatio'
                },
                formula: '{xaaAmount}-0==0?0:Math.round({xapAmount}/{xaaAmount}*100*10)/10'
              }
            ]
          }
        ]
      },
      {
        title: '支出总数',
        width: 200,
        align: 'center',
        children: [
          {
            title: '中央安排',
            field: 'zzyapAmount',
            width: 200,
            align: 'right',
            cellRender: { name: '$vxeMoney' },
            formula: '{amountSnjzypay}+{amountSjzypay}+{amountXjzypay}'
          },
          {
            title: '地方安排',
            field: 'zdfapAmount',
            width: 200,
            align: 'right',
            cellRender: { name: '$vxeMoney' },
            formula: '{amountSnjdfpay}+{amountSjdfpay}+{amountXjdfpay}'
          },
          {
            title: '总金额',
            field: 'zaAmount',
            width: 200,
            align: 'right',
            cellRender: {
              name: '$vxeMoney'
            },
            formula: '({zzyapAmount}+{zdfapAmount})'
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
