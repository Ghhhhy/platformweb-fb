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
            formula: '(({amountZjzl}+{cAmount})-0==0?0:Math.round({amountZjzc}/({amountZjzl}+{cAmount})*100*10)/10'
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
    // tableData: [
    //   {
    //     'recDivCode': '619900000',
    //     'children': [
    //       {
    //         'recDivCode': '610000000',
    //         'agencyName': '陕西省本级',
    //         aAmount: 1234436538412.99,
    //         cAmount: 72474699200,
    //         pAmount: 12042109128,
    //         pPro: 55,
    //         szyapaAmount: 787212,
    //         sdfapaAmount: 8644254,
    //         saaAmount: 34212425,
    //         szyapcAmount: 45445,
    //         sdfapcAmount: 24112,
    //         sacAmount: 454212,
    //         szyappAmount: 753743,
    //         sdfappAmount: 4545,
    //         sapAmount: 373,
    //         szyappPro: 45,
    //         sdfappPro: 74,
    //         sapPro: 65,
    //         shzyapaAmount: 76546,
    //         shdfapaAmount: 464,
    //         shaaAmount: 785764,
    //         shzyapcAmount: 45646,
    //         shdfapcAmount: 45674,
    //         shacAmount: 4564,
    //         shzyappAmount: 45476,
    //         shdfappAmount: 4642,
    //         shapAmount: 4657,
    //         shzyappPro: 65,
    //         shdfappPro: 75,
    //         shapPro: 45,
    //         xzyapaAmount: 64542,
    //         xdfapaAmount: 57476,
    //         xaaAmount: 75466,
    //         xzyapcAmount: 456485,
    //         xdfapcAmount: 464646,
    //         xacAmount: 46546,
    //         xzyappAmount: 45752,
    //         xdfappAmount: 75876,
    //         xapAmount: 4646,
    //         xzyappPro: 85,
    //         xdfappPro: 45,
    //         xapPro: 65,
    //         zzyapAmount: 75478754,
    //         zdfapAmount: 6765545644,
    //         zaAmount: 546554576
    //       },
    //       {
    //         'recDivCode': '610000000',
    //         'children': [
    //           {
    //             'recDivCode': '610100000',
    //             'children': [
    //               {
    //                 'recDivCode': '610100000',
    //                 'agencyName': '西安市本级',
    //                 aAmount: 1234436538412.99,
    //                 cAmount: 72474699200,
    //                 pAmount: 12042109128,
    //                 pPro: 55,
    //                 szyapaAmount: 787212,
    //                 sdfapaAmount: 8644254,
    //                 saaAmount: 34212425,
    //                 szyapcAmount: 45445,
    //                 sdfapcAmount: 24112,
    //                 sacAmount: 454212,
    //                 szyappAmount: 753743,
    //                 sdfappAmount: 4545,
    //                 sapAmount: 373,
    //                 szyappPro: 45,
    //                 sdfappPro: 74,
    //                 sapPro: 65,
    //                 shzyapaAmount: 76546,
    //                 shdfapaAmount: 464,
    //                 shaaAmount: 785764,
    //                 shzyapcAmount: 45646,
    //                 shdfapcAmount: 45674,
    //                 shacAmount: 4564,
    //                 shzyappAmount: 45476,
    //                 shdfappAmount: 4642,
    //                 shapAmount: 4657,
    //                 shzyappPro: 65,
    //                 shdfappPro: 75,
    //                 shapPro: 45,
    //                 xzyapaAmount: 64542,
    //                 xdfapaAmount: 57476,
    //                 xaaAmount: 75466,
    //                 xzyapcAmount: 456485,
    //                 xdfapcAmount: 464646,
    //                 xacAmount: 46546,
    //                 xzyappAmount: 45752,
    //                 xdfappAmount: 75876,
    //                 xapAmount: 4646,
    //                 xzyappPro: 85,
    //                 xdfappPro: 45,
    //                 xapPro: 65,
    //                 zzyapAmount: 75478754,
    //                 zdfapAmount: 6765545644,
    //                 zaAmount: 546554576
    //               },
    //               {
    //                 'recDivCode': '610198000',
    //                 'children': [
    //                   {
    //                     'recDivCode': '610102000',
    //                     'children': [
    //                       {
    //                         'recDivCode': '610102000',
    //                         'agencyName': '新城区本级',
    //                         aAmount: 1234436538412.99,
    //                         cAmount: 72474699200,
    //                         pAmount: 12042109128,
    //                         pPro: 55,
    //                         szyapaAmount: 787212,
    //                         sdfapaAmount: 8644254,
    //                         saaAmount: 34212425,
    //                         szyapcAmount: 45445,
    //                         sdfapcAmount: 24112,
    //                         sacAmount: 454212,
    //                         szyappAmount: 753743,
    //                         sdfappAmount: 4545,
    //                         sapAmount: 373,
    //                         szyappPro: 45,
    //                         sdfappPro: 74,
    //                         sapPro: 65,
    //                         shzyapaAmount: 76546,
    //                         shdfapaAmount: 464,
    //                         shaaAmount: 785764,
    //                         shzyapcAmount: 45646,
    //                         shdfapcAmount: 45674,
    //                         shacAmount: 4564,
    //                         shzyappAmount: 45476,
    //                         shdfappAmount: 4642,
    //                         shapAmount: 4657,
    //                         shzyappPro: 65,
    //                         shdfappPro: 75,
    //                         shapPro: 45,
    //                         xzyapaAmount: 64542,
    //                         xdfapaAmount: 57476,
    //                         xaaAmount: 75466,
    //                         xzyapcAmount: 456485,
    //                         xdfapcAmount: 464646,
    //                         xacAmount: 46546,
    //                         xzyappAmount: 45752,
    //                         xdfappAmount: 75876,
    //                         xapAmount: 4646,
    //                         xzyappPro: 85,
    //                         xdfappPro: 45,
    //                         xapPro: 65,
    //                         zzyapAmount: 75478754,
    //                         zdfapAmount: 6765545644,
    //                         zaAmount: 546554576
    //                       },
    //                       {
    //                         'recDivCode': '610102000',
    //                         'agencyName': '新城区辖区'
    //                       }
    //                     ],
    //                     'agencyName': '新城区',
    //                     aAmount: 1234436538412.99,
    //                     cAmount: 72474699200,
    //                     pAmount: 12042109128,
    //                     pPro: 55,
    //                     szyapaAmount: 787212,
    //                     sdfapaAmount: 8644254,
    //                     saaAmount: 34212425,
    //                     szyapcAmount: 45445,
    //                     sdfapcAmount: 24112,
    //                     sacAmount: 454212,
    //                     szyappAmount: 753743,
    //                     sdfappAmount: 4545,
    //                     sapAmount: 373,
    //                     szyappPro: 45,
    //                     sdfappPro: 74,
    //                     sapPro: 65,
    //                     shzyapaAmount: 76546,
    //                     shdfapaAmount: 464,
    //                     shaaAmount: 785764,
    //                     shzyapcAmount: 45646,
    //                     shdfapcAmount: 45674,
    //                     shacAmount: 4564,
    //                     shzyappAmount: 45476,
    //                     shdfappAmount: 4642,
    //                     shapAmount: 4657,
    //                     shzyappPro: 65,
    //                     shdfappPro: 75,
    //                     shapPro: 45,
    //                     xzyapaAmount: 64542,
    //                     xdfapaAmount: 57476,
    //                     xaaAmount: 75466,
    //                     xzyapcAmount: 456485,
    //                     xdfapcAmount: 464646,
    //                     xacAmount: 46546,
    //                     xzyappAmount: 45752,
    //                     xdfappAmount: 75876,
    //                     xapAmount: 4646,
    //                     xzyappPro: 85,
    //                     xdfappPro: 45,
    //                     xapPro: 65,
    //                     zzyapAmount: 75478754,
    //                     zdfapAmount: 6765545644,
    //                     zaAmount: 546554576
    //                   },
    //                   {
    //                     'recDivCode': '610103000',
    //                     'children': [
    //                       {
    //                         'recDivCode': '610103000',
    //                         'agencyName': '碑林区本级'
    //                       },
    //                       {
    //                         'recDivCode': '610103000',
    //                         'agencyName': '碑林区辖区'
    //                       }
    //                     ],
    //                     'agencyName': '碑林区'
    //                   },
    //                   {
    //                     'recDivCode': '610104000',
    //                     'children': [
    //                       {
    //                         'recDivCode': '610104000',
    //                         'agencyName': '莲湖区本级'
    //                       },
    //                       {
    //                         'recDivCode': '610104000',
    //                         'agencyName': '莲湖区辖区'
    //                       }
    //                     ],
    //                     'agencyName': '莲湖区'
    //                   },
    //                   {
    //                     'recDivCode': '610111000',
    //                     'children': [
    //                       {
    //                         'recDivCode': '610111000',
    //                         'agencyName': '灞桥区本级'
    //                       },
    //                       {
    //                         'recDivCode': '610111000',
    //                         'agencyName': '灞桥区辖区'
    //                       }
    //                     ],
    //                     'agencyName': '灞桥区'
    //                   },
    //                   {
    //                     'recDivCode': '610112000',
    //                     'children': [
    //                       {
    //                         'recDivCode': '610112000',
    //                         'agencyName': '未央区本级'
    //                       },
    //                       {
    //                         'recDivCode': '610112000',
    //                         'agencyName': '未央区辖区'
    //                       }
    //                     ],
    //                     'agencyName': '未央区'
    //                   },
    //                   {
    //                     'recDivCode': '610113000',
    //                     'children': [
    //                       {
    //                         'recDivCode': '610113000',
    //                         'agencyName': '雁塔区本级'
    //                       },
    //                       {
    //                         'recDivCode': '610113000',
    //                         'agencyName': '雁塔区辖区'
    //                       }
    //                     ],
    //                     'agencyName': '雁塔区'
    //                   },
    //                   {
    //                     'recDivCode': '610114000',
    //                     'children': [
    //                       {
    //                         'recDivCode': '610114000',
    //                         'agencyName': '阎良区本级'
    //                       },
    //                       {
    //                         'recDivCode': '610114000',
    //                         'agencyName': '颜良区辖区'
    //                       }
    //                     ],
    //                     'agencyName': '阎良区'
    //                   },
    //                   {
    //                     'recDivCode': '610115000',
    //                     'children': [
    //                       {
    //                         'recDivCode': '610115000',
    //                         'agencyName': '临潼区本级'
    //                       },
    //                       {
    //                         'recDivCode': '610115000',
    //                         'agencyName': '临潼区辖区'
    //                       }
    //                     ],
    //                     'agencyName': '临潼区'
    //                   },
    //                   {
    //                     'recDivCode': '610116000',
    //                     'children': [
    //                       {
    //                         'recDivCode': '610116000',
    //                         'agencyName': '长安区本级'
    //                       },
    //                       {
    //                         'recDivCode': '610116000',
    //                         'agencyName': '长安区辖区'
    //                       }
    //                     ],
    //                     'agencyName': '长安区'
    //                   },
    //                   {
    //                     'recDivCode': '610117000',
    //                     'children': [
    //                       {
    //                         'recDivCode': '610117000',
    //                         'agencyName': '高陵区本级'
    //                       },
    //                       {
    //                         'recDivCode': '610117000',
    //                         'agencyName': '高陵区辖区'
    //                       }
    //                     ],
    //                     'agencyName': '高陵区'
    //                   },
    //                   {
    //                     'recDivCode': '610118000',
    //                     'children': [
    //                       {
    //                         'recDivCode': '610118000',
    //                         'agencyName': '鄠邑区本级'
    //                       },
    //                       {
    //                         'recDivCode': '610118000',
    //                         'agencyName': '鄠邑区辖区'
    //                       }
    //                     ],
    //                     'agencyName': '鄠邑区'
    //                   },
    //                   {
    //                     'recDivCode': '610122000',
    //                     'children': [
    //                       {
    //                         'recDivCode': '610122000',
    //                         'agencyName': '蓝田县本级'
    //                       },
    //                       {
    //                         'recDivCode': '610122000',
    //                         'agencyName': '蓝田县辖区'
    //                       }
    //                     ],
    //                     'agencyName': '蓝田县'
    //                   },
    //                   {
    //                     'recDivCode': '610124000',
    //                     'children': [
    //                       {
    //                         'recDivCode': '610124000',
    //                         'agencyName': '周至县本级'
    //                       },
    //                       {
    //                         'recDivCode': '610124000',
    //                         'agencyName': '周至县辖区'
    //                       }
    //                     ],
    //                     'agencyName': '周至县'
    //                   },
    //                   {
    //                     'recDivCode': '610131000',
    //                     'children': [
    //                       {
    //                         'recDivCode': '610131000',
    //                         'agencyName': '西安市高新区本级'
    //                       },
    //                       {
    //                         'recDivCode': '610131000',
    //                         'agencyName': '西安市高新区辖区'
    //                       }
    //                     ],
    //                     'agencyName': '西安市高新区'
    //                   },
    //                   {
    //                     'recDivCode': '610132000',
    //                     'children': [
    //                       {
    //                         'recDivCode': '610132000',
    //                         'agencyName': '西安市经济开发区本级'
    //                       },
    //                       {
    //                         'recDivCode': '610132000',
    //                         'agencyName': '西安市经济开发区辖区'
    //                       }
    //                     ],
    //                     'agencyName': '西安市经济开发区'
    //                   },
    //                   {
    //                     'recDivCode': '610133000',
    //                     'children': [
    //                       {
    //                         'recDivCode': '610133000',
    //                         'agencyName': '西安市曲江新区本级'
    //                       },
    //                       {
    //                         'recDivCode': '610133000',
    //                         'agencyName': '西安市曲江新区辖区'
    //                       }
    //                     ],
    //                     'agencyName': '西安市曲江新区'
    //                   },
    //                   {
    //                     'recDivCode': '610136000',
    //                     'children': [
    //                       {
    //                         'recDivCode': '610136000',
    //                         'agencyName': '西安市浐灞生态区本级'
    //                       },
    //                       {
    //                         'recDivCode': '610136000',
    //                         'agencyName': '西安市浐灞生态区辖区'
    //                       }
    //                     ],
    //                     'agencyName': '西安市浐灞生态区'
    //                   },
    //                   {
    //                     'recDivCode': '610139000',
    //                     'children': [
    //                       {
    //                         'recDivCode': '610139000',
    //                         'agencyName': '西安市国际港务区本级'
    //                       },
    //                       {
    //                         'recDivCode': '610139000',
    //                         'agencyName': '西安市国际港务区辖区'
    //                       }
    //                     ],
    //                     'agencyName': '西安市国际港务区'
    //                   },
    //                   {
    //                     'recDivCode': '610140000',
    //                     'children': [
    //                       {
    //                         'recDivCode': '610140000',
    //                         'agencyName': '西安市航天基地本级'
    //                       },
    //                       {
    //                         'recDivCode': '610140000',
    //                         'agencyName': '西安市航天基地辖区'
    //                       }
    //                     ],
    //                     'agencyName': '西安市航天基地'
    //                   },
    //                   {
    //                     'recDivCode': '610141000',
    //                     'children': [
    //                       {
    //                         'recDivCode': '610141000',
    //                         'agencyName': '西安市航空基地本级'
    //                       },
    //                       {
    //                         'recDivCode': '610141000',
    //                         'agencyName': '西安市航空基地辖区'
    //                       }
    //                     ],
    //                     'agencyName': '西安市航空基地'
    //                   },
    //                   {
    //                     'recDivCode': '610150000',
    //                     'children': [
    //                       {
    //                         'recDivCode': '610150000',
    //                         'agencyName': '西咸新区本级'
    //                       },
    //                       {
    //                         'recDivCode': '610150000',
    //                         'children': [
    //                           {
    //                             'recDivCode': '610150101',
    //                             'agencyName': '沣西新城本级'
    //                           },
    //                           {
    //                             'recDivCode': '610150102',
    //                             'agencyName': '空港新城本级'
    //                           },
    //                           {
    //                             'recDivCode': '610150103',
    //                             'agencyName': '泾河新城本级'
    //                           },
    //                           {
    //                             'recDivCode': '610150104',
    //                             'agencyName': '沣东新城本级'
    //                           },
    //                           {
    //                             'recDivCode': '610150105',
    //                             'agencyName': '秦汉新城本级'
    //                           }
    //                         ],
    //                         'agencyName': '西咸新区辖区'
    //                       }
    //                     ],
    //                     'agencyName': '西咸新区'
    //                   }
    //                 ],
    //                 'agencyName': '西安市辖区'
    //               }
    //             ],
    //             'agencyName': '西安市'
    //           },
    //           {
    //             'recDivCode': '610200000',
    //             'children': [
    //               {
    //                 'recDivCode': '610200000',
    //                 'agencyName': '铜川市本级'
    //               },
    //               {
    //                 'recDivCode': '610200000',
    //                 'children': [
    //                   {
    //                     'recDivCode': '610202000',
    //                     'children': [
    //                       {
    //                         'recDivCode': '610202000',
    //                         'agencyName': '王益区本级'
    //                       },
    //                       {
    //                         'recDivCode': '610202000',
    //                         'agencyName': '王益区辖区'
    //                       }
    //                     ],
    //                     'agencyName': '王益区'
    //                   },
    //                   {
    //                     'recDivCode': '610203000',
    //                     'children': [
    //                       {
    //                         'recDivCode': '610203000',
    //                         'agencyName': '印台区本级'
    //                       },
    //                       {
    //                         'recDivCode': '610203000',
    //                         'agencyName': '印台区辖区'
    //                       }
    //                     ],
    //                     'agencyName': '印台区'
    //                   },
    //                   {
    //                     'recDivCode': '610204000',
    //                     'children': [
    //                       {
    //                         'recDivCode': '610204000',
    //                         'agencyName': '耀州区本级'
    //                       },
    //                       {
    //                         'recDivCode': '610204000',
    //                         'agencyName': '耀州区辖区'
    //                       }
    //                     ],
    //                     'agencyName': '耀州区'
    //                   },
    //                   {
    //                     'recDivCode': '610222000',
    //                     'children': [
    //                       {
    //                         'recDivCode': '610222000',
    //                         'agencyName': '宜君县本级'
    //                       },
    //                       {
    //                         'recDivCode': '610222000',
    //                         'agencyName': '宜君县辖区'
    //                       }
    //                     ],
    //                     'agencyName': '宜君县'
    //                   },
    //                   {
    //                     'recDivCode': '610223000',
    //                     'children': [
    //                       {
    //                         'recDivCode': '610223000',
    //                         'agencyName': '铜川新区本级'
    //                       },
    //                       {
    //                         'recDivCode': '610223000',
    //                         'agencyName': '铜川新区辖区'
    //                       }
    //                     ],
    //                     'agencyName': '铜川新区'
    //                   }
    //                 ],
    //                 'agencyName': '铜川市辖区'
    //               }
    //             ],
    //             'agencyName': '铜川市'
    //           },
    //           {
    //             'recDivCode': '610399000',
    //             'children': [
    //               {
    //                 'recDivCode': '610300000',
    //                 'agencyName': '宝鸡市本级'
    //               },
    //               {
    //                 'recDivCode': '610300000',
    //                 'children': [
    //                   {
    //                     'recDivCode': '610302000',
    //                     'children': [
    //                       {
    //                         'recDivCode': '610302000',
    //                         'agencyName': '渭滨区本级'
    //                       },
    //                       {
    //                         'recDivCode': '610302000',
    //                         'agencyName': '渭滨区辖区'
    //                       }
    //                     ],
    //                     'agencyName': '渭滨区'
    //                   },
    //                   {
    //                     'recDivCode': '610303000',
    //                     'children': [
    //                       {
    //                         'recDivCode': '610303000',
    //                         'agencyName': '金台区本级'
    //                       },
    //                       {
    //                         'recDivCode': '610303000',
    //                         'agencyName': '金台区辖区'
    //                       }
    //                     ],
    //                     'agencyName': '金台区'
    //                   },
    //                   {
    //                     'recDivCode': '610304000',
    //                     'children': [
    //                       {
    //                         'recDivCode': '610304000',
    //                         'agencyName': '陈仓区本级'
    //                       },
    //                       {
    //                         'recDivCode': '610304000',
    //                         'agencyName': '陈仓区辖区'
    //                       }
    //                     ],
    //                     'agencyName': '陈仓区'
    //                   },
    //                   {
    //                     'recDivCode': '610322000',
    //                     'children': [
    //                       {
    //                         'recDivCode': '610322000',
    //                         'agencyName': '凤翔县本级'
    //                       },
    //                       {
    //                         'recDivCode': '610322000',
    //                         'agencyName': '凤翔县辖区'
    //                       }
    //                     ],
    //                     'agencyName': '凤翔县'
    //                   },
    //                   {
    //                     'recDivCode': '610323000',
    //                     'children': [
    //                       {
    //                         'recDivCode': '610323000',
    //                         'agencyName': '岐山县本级'
    //                       },
    //                       {
    //                         'recDivCode': '610323000',
    //                         'agencyName': '岐山县辖区'
    //                       }
    //                     ],
    //                     'agencyName': '岐山县'
    //                   },
    //                   {
    //                     'recDivCode': '610324000',
    //                     'children': [
    //                       {
    //                         'recDivCode': '610324000',
    //                         'agencyName': '扶风县本级'
    //                       },
    //                       {
    //                         'recDivCode': '610324000',
    //                         'agencyName': '扶风县辖区'
    //                       }
    //                     ],
    //                     'agencyName': '扶风县'
    //                   },
    //                   {
    //                     'recDivCode': '610326000',
    //                     'children': [
    //                       {
    //                         'recDivCode': '610326000',
    //                         'agencyName': '眉县本级'
    //                       },
    //                       {
    //                         'recDivCode': '610326000',
    //                         'agencyName': '眉县辖区'
    //                       }
    //                     ],
    //                     'agencyName': '眉县'
    //                   },
    //                   {
    //                     'recDivCode': '610327000',
    //                     'children': [
    //                       {
    //                         'recDivCode': '610327000',
    //                         'agencyName': '陇县本级'
    //                       },
    //                       {
    //                         'recDivCode': '610327000',
    //                         'agencyName': '陇县辖区'
    //                       }
    //                     ],
    //                     'agencyName': '陇县'
    //                   },
    //                   {
    //                     'recDivCode': '610328000',
    //                     'children': [
    //                       {
    //                         'recDivCode': '610328000',
    //                         'agencyName': '千阳县本级'
    //                       },
    //                       {
    //                         'recDivCode': '610328000',
    //                         'agencyName': '千阳县辖区'
    //                       }
    //                     ],
    //                     'agencyName': '千阳县'
    //                   },
    //                   {
    //                     'recDivCode': '610329000',
    //                     'children': [
    //                       {
    //                         'recDivCode': '610329000',
    //                         'agencyName': '麟游县本级'
    //                       },
    //                       {
    //                         'recDivCode': '610329000',
    //                         'agencyName': '麟游县辖区'
    //                       }
    //                     ],
    //                     'agencyName': '麟游县'
    //                   },
    //                   {
    //                     'recDivCode': '610330000',
    //                     'children': [
    //                       {
    //                         'recDivCode': '610330000',
    //                         'agencyName': '凤县本级'
    //                       },
    //                       {
    //                         'recDivCode': '610330000',
    //                         'agencyName': '凤县辖区'
    //                       }
    //                     ],
    //                     'agencyName': '凤县'
    //                   },
    //                   {
    //                     'recDivCode': '610331000',
    //                     'children': [
    //                       {
    //                         'recDivCode': '610331000',
    //                         'agencyName': '太白县本级'
    //                       },
    //                       {
    //                         'recDivCode': '610331000',
    //                         'agencyName': '太白县辖区'
    //                       }
    //                     ],
    //                     'agencyName': '太白县'
    //                   },
    //                   {
    //                     'recDivCode': '610332000',
    //                     'children': [
    //                       {
    //                         'recDivCode': '610332000',
    //                         'agencyName': '宝鸡市高新区本级'
    //                       },
    //                       {
    //                         'recDivCode': '610332000',
    //                         'agencyName': '宝鸡市高新区辖区'
    //                       }
    //                     ],
    //                     'agencyName': '宝鸡市高新区'
    //                   },
    //                   {
    //                     'recDivCode': '610333000',
    //                     'children': [
    //                       {
    //                         'recDivCode': '610333000',
    //                         'agencyName': '宝鸡市蔡家坡经济开发区本级'
    //                       },
    //                       {
    //                         'recDivCode': '610333000',
    //                         'agencyName': '宝鸡市蔡家坡经济开发区辖区'
    //                       }
    //                     ],
    //                     'agencyName': '宝鸡市蔡家坡经济开发区'
    //                   }
    //                 ],
    //                 'agencyName': '宝鸡市辖区'
    //               }
    //             ],
    //             'agencyName': '宝鸡市'
    //           },
    //           {
    //             'recDivCode': '610400000',
    //             'children': [
    //               {
    //                 'recDivCode': '610400000',
    //                 'agencyName': '咸阳市本级'
    //               },
    //               {
    //                 'recDivCode': '610400000',
    //                 'children': [
    //                   {
    //                     'recDivCode': '610402000',
    //                     'children': [
    //                       {
    //                         'recDivCode': '610402000',
    //                         'agencyName': '秦都区本级'
    //                       },
    //                       {
    //                         'recDivCode': '610402000',
    //                         'agencyName': '秦都区辖区'
    //                       }
    //                     ],
    //                     'agencyName': '秦都区'
    //                   },
    //                   {
    //                     'recDivCode': '610404000',
    //                     'children': [
    //                       {
    //                         'recDivCode': '610404000',
    //                         'agencyName': '渭城区本级'
    //                       },
    //                       {
    //                         'recDivCode': '610404000',
    //                         'agencyName': '渭城区辖区'
    //                       }
    //                     ],
    //                     'agencyName': '渭城区'
    //                   },
    //                   {
    //                     'recDivCode': '610422000',
    //                     'children': [
    //                       {
    //                         'recDivCode': '610422000',
    //                         'agencyName': '三原县本级'
    //                       },
    //                       {
    //                         'recDivCode': '610422000',
    //                         'agencyName': '三原县辖区'
    //                       }
    //                     ],
    //                     'agencyName': '三原县'
    //                   },
    //                   {
    //                     'recDivCode': '610423000',
    //                     'children': [
    //                       {
    //                         'recDivCode': '610882000',
    //                         'agencyName': '泾阳县本级'
    //                       },
    //                       {
    //                         'recDivCode': '610423000',
    //                         'agencyName': '泾阳县辖区'
    //                       }
    //                     ],
    //                     'agencyName': '泾阳县'
    //                   },
    //                   {
    //                     'recDivCode': '610424000',
    //                     'children': [
    //                       {
    //                         'recDivCode': '610424000',
    //                         'agencyName': '乾县本级'
    //                       },
    //                       {
    //                         'recDivCode': '610424000',
    //                         'agencyName': '乾县辖区'
    //                       }
    //                     ],
    //                     'agencyName': '乾县'
    //                   },
    //                   {
    //                     'recDivCode': '610425000',
    //                     'children': [
    //                       {
    //                         'recDivCode': '610425000',
    //                         'agencyName': '礼泉县本级'
    //                       },
    //                       {
    //                         'recDivCode': '610425000',
    //                         'agencyName': '礼泉县辖区'
    //                       }
    //                     ],
    //                     'agencyName': '礼泉县'
    //                   },
    //                   {
    //                     'recDivCode': '610426000',
    //                     'children': [
    //                       {
    //                         'recDivCode': '610426000',
    //                         'agencyName': '永寿县本级'
    //                       },
    //                       {
    //                         'recDivCode': '610426000',
    //                         'agencyName': '永寿县辖区'
    //                       }
    //                     ],
    //                     'agencyName': '永寿县'
    //                   },
    //                   {
    //                     'recDivCode': '610428000',
    //                     'children': [
    //                       {
    //                         'recDivCode': '610428000',
    //                         'agencyName': '长武县本级'
    //                       },
    //                       {
    //                         'recDivCode': '610428000',
    //                         'agencyName': '长武县辖区'
    //                       }
    //                     ],
    //                     'agencyName': '长武县'
    //                   },
    //                   {
    //                     'recDivCode': '610429000',
    //                     'children': [
    //                       {
    //                         'recDivCode': '610429000',
    //                         'agencyName': '旬邑县本级'
    //                       },
    //                       {
    //                         'recDivCode': '610429000',
    //                         'agencyName': '旬邑县辖区'
    //                       }
    //                     ],
    //                     'agencyName': '旬邑县'
    //                   },
    //                   {
    //                     'recDivCode': '610430000',
    //                     'children': [
    //                       {
    //                         'recDivCode': '610430000',
    //                         'agencyName': '淳化县本级'
    //                       },
    //                       {
    //                         'recDivCode': '610430000',
    //                         'agencyName': '淳化县辖区'
    //                       }
    //                     ],
    //                     'agencyName': '淳化县'
    //                   },
    //                   {
    //                     'recDivCode': '610431000',
    //                     'children': [
    //                       {
    //                         'recDivCode': '610431000',
    //                         'agencyName': '武功县本级'
    //                       },
    //                       {
    //                         'recDivCode': '610431000',
    //                         'agencyName': '武功县辖区'
    //                       }
    //                     ],
    //                     'agencyName': '武功县'
    //                   },
    //                   {
    //                     'recDivCode': '610481000',
    //                     'children': [
    //                       {
    //                         'recDivCode': '610481000',
    //                         'agencyName': '兴平市本级'
    //                       },
    //                       {
    //                         'recDivCode': '610481000',
    //                         'agencyName': '兴平市辖区'
    //                       }
    //                     ],
    //                     'agencyName': '兴平市'
    //                   },
    //                   {
    //                     'recDivCode': '610482000',
    //                     'children': [
    //                       {
    //                         'recDivCode': '610482000',
    //                         'agencyName': '彬州市本级'
    //                       },
    //                       {
    //                         'recDivCode': '610482000',
    //                         'agencyName': '彬州市辖区'
    //                       }
    //                     ],
    //                     'agencyName': '彬州市'
    //                   },
    //                   {
    //                     'recDivCode': '610492000',
    //                     'children': [
    //                       {
    //                         'recDivCode': '610492000',
    //                         'agencyName': '咸阳市高新区本级'
    //                       },
    //                       {
    //                         'recDivCode': '610492000',
    //                         'agencyName': '咸阳市高新区辖区'
    //                       }
    //                     ],
    //                     'agencyName': '咸阳市高新区'
    //                   }
    //                 ],
    //                 'agencyName': '咸阳市辖区'
    //               }
    //             ],
    //             'agencyName': '咸阳市'
    //           },
    //           {
    //             'recDivCode': '610500000',
    //             'children': [
    //               {
    //                 'recDivCode': '610500000',
    //                 'agencyName': '渭南市本级'
    //               },
    //               {
    //                 'recDivCode': '610500000',
    //                 'children': [
    //                   {
    //                     'recDivCode': '610502000',
    //                     'children': [
    //                       {
    //                         'recDivCode': '610502000',
    //                         'agencyName': '临渭区本级'
    //                       },
    //                       {
    //                         'recDivCode': '610502000',
    //                         'agencyName': '临渭区辖区'
    //                       }
    //                     ],
    //                     'agencyName': '临渭区'
    //                   },
    //                   {
    //                     'recDivCode': '610503000',
    //                     'children': [
    //                       {
    //                         'recDivCode': '610503000',
    //                         'agencyName': '华州区本级'
    //                       },
    //                       {
    //                         'recDivCode': '610503000',
    //                         'agencyName': '华州区辖区'
    //                       }
    //                     ],
    //                     'agencyName': '华州区'
    //                   },
    //                   {
    //                     'recDivCode': '610522000',
    //                     'children': [
    //                       {
    //                         'recDivCode': '610522000',
    //                         'agencyName': '潼关县本级'
    //                       },
    //                       {
    //                         'recDivCode': '610522000',
    //                         'agencyName': '潼关县辖区'
    //                       }
    //                     ],
    //                     'agencyName': '潼关县'
    //                   },
    //                   {
    //                     'recDivCode': '610523000',
    //                     'children': [
    //                       {
    //                         'recDivCode': '610523000',
    //                         'agencyName': '大荔县本级'
    //                       },
    //                       {
    //                         'recDivCode': '610523000',
    //                         'agencyName': '大荔县辖区'
    //                       }
    //                     ],
    //                     'agencyName': '大荔县'
    //                   },
    //                   {
    //                     'recDivCode': '610524000',
    //                     'children': [
    //                       {
    //                         'recDivCode': '610524000',
    //                         'agencyName': '合阳县本级'
    //                       },
    //                       {
    //                         'recDivCode': '610524000',
    //                         'agencyName': '合阳县辖区'
    //                       }
    //                     ],
    //                     'agencyName': '合阳县'
    //                   },
    //                   {
    //                     'recDivCode': '610525000',
    //                     'children': [
    //                       {
    //                         'recDivCode': '610525000',
    //                         'agencyName': '澄城县本级'
    //                       },
    //                       {
    //                         'recDivCode': '610525000',
    //                         'agencyName': '澄城县辖区'
    //                       }
    //                     ],
    //                     'agencyName': '澄城县'
    //                   },
    //                   {
    //                     'recDivCode': '610526000',
    //                     'children': [
    //                       {
    //                         'recDivCode': '610526000',
    //                         'agencyName': '蒲城县本级'
    //                       },
    //                       {
    //                         'recDivCode': '610526000',
    //                         'agencyName': '蒲城县辖区'
    //                       }
    //                     ],
    //                     'agencyName': '蒲城县'
    //                   },
    //                   {
    //                     'recDivCode': '610527000',
    //                     'children': [
    //                       {
    //                         'recDivCode': '610527000',
    //                         'agencyName': '白水县本级'
    //                       },
    //                       {
    //                         'recDivCode': '610527000',
    //                         'agencyName': '白水县辖区'
    //                       }
    //                     ],
    //                     'agencyName': '白水县'
    //                   },
    //                   {
    //                     'recDivCode': '610528000',
    //                     'children': [
    //                       {
    //                         'recDivCode': '610528000',
    //                         'agencyName': '富平县本级'
    //                       },
    //                       {
    //                         'recDivCode': '610528000',
    //                         'agencyName': '富平县辖区'
    //                       }
    //                     ],
    //                     'agencyName': '富平县'
    //                   },
    //                   {
    //                     'recDivCode': '610581000',
    //                     'children': [
    //                       {
    //                         'recDivCode': '610581000',
    //                         'agencyName': '韩城市本级'
    //                       },
    //                       {
    //                         'recDivCode': '610581000',
    //                         'agencyName': '韩城市辖区'
    //                       }
    //                     ],
    //                     'agencyName': '韩城市'
    //                   },
    //                   {
    //                     'recDivCode': '610582000',
    //                     'children': [
    //                       {
    //                         'recDivCode': '610582000',
    //                         'agencyName': '华阴市本级'
    //                       },
    //                       {
    //                         'recDivCode': '610582000',
    //                         'agencyName': '华阴市辖区'
    //                       }
    //                     ],
    //                     'agencyName': '华阴市'
    //                   },
    //                   {
    //                     'recDivCode': '610583000',
    //                     'children': [
    //                       {
    //                         'recDivCode': '610583000',
    //                         'agencyName': '渭南市高新区本级'
    //                       },
    //                       {
    //                         'recDivCode': '610583000',
    //                         'agencyName': '渭南市高新区辖区'
    //                       }
    //                     ],
    //                     'agencyName': '渭南市高新区'
    //                   },
    //                   {
    //                     'recDivCode': '610584000',
    //                     'children': [
    //                       {
    //                         'recDivCode': '610584000',
    //                         'agencyName': '渭南市经济技术开发区本级'
    //                       },
    //                       {
    //                         'recDivCode': '610584000',
    //                         'agencyName': '渭南市经济技术开发区辖区'
    //                       }
    //                     ],
    //                     'agencyName': '渭南市经济技术开发区'
    //                   },
    //                   {
    //                     'recDivCode': '610585000',
    //                     'children': [
    //                       {
    //                         'recDivCode': '610585000',
    //                         'agencyName': '渭南市卤阳湖开发区本级'
    //                       },
    //                       {
    //                         'recDivCode': '610585000',
    //                         'agencyName': '渭南市卤阳湖开发区辖区'
    //                       }
    //                     ],
    //                     'agencyName': '渭南市卤阳湖开发区'
    //                   }
    //                 ],
    //                 'agencyName': '渭南市辖区'
    //               }
    //             ],
    //             'agencyName': '渭南市'
    //           },
    //           {
    //             'recDivCode': '610699000',
    //             'children': [
    //               {
    //                 'recDivCode': '610600000',
    //                 'agencyName': '延安市本级'
    //               },
    //               {
    //                 'recDivCode': '610600000',
    //                 'children': [
    //                   {
    //                     'recDivCode': '610602000',
    //                     'children': [
    //                       {
    //                         'recDivCode': '610602000',
    //                         'agencyName': '宝塔区本级'
    //                       },
    //                       {
    //                         'recDivCode': '610602000',
    //                         'agencyName': '宝塔区辖区'
    //                       }
    //                     ],
    //                     'agencyName': '宝塔区'
    //                   },
    //                   {
    //                     'recDivCode': '610603000',
    //                     'children': [
    //                       {
    //                         'recDivCode': '610603000',
    //                         'agencyName': '安塞区本级'
    //                       },
    //                       {
    //                         'recDivCode': '610603000',
    //                         'agencyName': '安塞区辖区'
    //                       }
    //                     ],
    //                     'agencyName': '安塞区'
    //                   },
    //                   {
    //                     'recDivCode': '610621000',
    //                     'children': [
    //                       {
    //                         'recDivCode': '610621000',
    //                         'agencyName': '延长县本级'
    //                       },
    //                       {
    //                         'recDivCode': '610621000',
    //                         'agencyName': '延长县辖区'
    //                       }
    //                     ],
    //                     'agencyName': '延长县'
    //                   },
    //                   {
    //                     'recDivCode': '610622000',
    //                     'children': [
    //                       {
    //                         'recDivCode': '610622000',
    //                         'agencyName': '延川县本级'
    //                       },
    //                       {
    //                         'recDivCode': '610622000',
    //                         'agencyName': '延川县辖区'
    //                       }
    //                     ],
    //                     'agencyName': '延川县'
    //                   },
    //                   {
    //                     'recDivCode': '610625000',
    //                     'children': [
    //                       {
    //                         'recDivCode': '610625000',
    //                         'agencyName': '志丹县本级'
    //                       },
    //                       {
    //                         'recDivCode': '610625000',
    //                         'agencyName': '志丹县辖区'
    //                       }
    //                     ],
    //                     'agencyName': '志丹县'
    //                   },
    //                   {
    //                     'recDivCode': '610626000',
    //                     'children': [
    //                       {
    //                         'recDivCode': '610626000',
    //                         'agencyName': '吴起县本级'
    //                       },
    //                       {
    //                         'recDivCode': '610626000',
    //                         'agencyName': '吴起县辖区'
    //                       }
    //                     ],
    //                     'agencyName': '吴起县'
    //                   },
    //                   {
    //                     'recDivCode': '610627000',
    //                     'children': [
    //                       {
    //                         'recDivCode': '610627000',
    //                         'agencyName': '甘泉县本级'
    //                       },
    //                       {
    //                         'recDivCode': '610627000',
    //                         'agencyName': '甘泉县辖区'
    //                       }
    //                     ],
    //                     'agencyName': '甘泉县'
    //                   },
    //                   {
    //                     'recDivCode': '610628000',
    //                     'children': [
    //                       {
    //                         'recDivCode': '610628000',
    //                         'agencyName': '富县本级'
    //                       },
    //                       {
    //                         'recDivCode': '610628000',
    //                         'agencyName': '富县辖区'
    //                       }
    //                     ],
    //                     'agencyName': '富县'
    //                   },
    //                   {
    //                     'recDivCode': '610629000',
    //                     'children': [
    //                       {
    //                         'recDivCode': '610629000',
    //                         'agencyName': '洛川县本级'
    //                       },
    //                       {
    //                         'recDivCode': '610629000',
    //                         'agencyName': '洛川县辖区'
    //                       }
    //                     ],
    //                     'agencyName': '洛川县'
    //                   },
    //                   {
    //                     'recDivCode': '610630000',
    //                     'children': [
    //                       {
    //                         'recDivCode': '610630000',
    //                         'agencyName': '宜川县本级'
    //                       },
    //                       {
    //                         'recDivCode': '610630000',
    //                         'agencyName': '宜川县辖区'
    //                       }
    //                     ],
    //                     'agencyName': '宜川县'
    //                   },
    //                   {
    //                     'recDivCode': '610631000',
    //                     'children': [
    //                       {
    //                         'recDivCode': '610631000',
    //                         'agencyName': '黄龙县本级'
    //                       },
    //                       {
    //                         'recDivCode': '610631000',
    //                         'agencyName': '黄龙县辖区'
    //                       }
    //                     ],
    //                     'agencyName': '黄龙县'
    //                   },
    //                   {
    //                     'recDivCode': '610632000',
    //                     'children': [
    //                       {
    //                         'recDivCode': '610632000',
    //                         'agencyName': '黄陵县本级'
    //                       },
    //                       {
    //                         'recDivCode': '610632000',
    //                         'agencyName': '黄陵县辖区'
    //                       }
    //                     ],
    //                     'agencyName': '黄陵县'
    //                   },
    //                   {
    //                     'recDivCode': '610633000',
    //                     'children': [
    //                       {
    //                         'recDivCode': '610633000',
    //                         'agencyName': '延安市经济技术开发区本级'
    //                       },
    //                       {
    //                         'recDivCode': '610633000',
    //                         'agencyName': '延安市经济技术开发区辖区'
    //                       }
    //                     ],
    //                     'agencyName': '延安市经济技术开发区'
    //                   },
    //                   {
    //                     'recDivCode': '610681000',
    //                     'children': [
    //                       {
    //                         'recDivCode': '610681000',
    //                         'agencyName': '子长市本级'
    //                       },
    //                       {
    //                         'recDivCode': '610681000',
    //                         'agencyName': '子长市辖区'
    //                       }
    //                     ],
    //                     'agencyName': '子长市'
    //                   }
    //                 ],
    //                 'agencyName': '延安市辖区'
    //               }
    //             ],
    //             'agencyName': '延安市'
    //           },
    //           {
    //             'recDivCode': '610700000',
    //             'children': [
    //               {
    //                 'recDivCode': '610700000',
    //                 'agencyName': '汉中市本级'
    //               },
    //               {
    //                 'recDivCode': '610700000',
    //                 'children': [
    //                   {
    //                     'recDivCode': '610702000',
    //                     'children': [
    //                       {
    //                         'recDivCode': '610702000',
    //                         'agencyName': '汉台区本级'
    //                       },
    //                       {
    //                         'recDivCode': '610702000',
    //                         'agencyName': '汉台区辖区'
    //                       }
    //                     ],
    //                     'agencyName': '汉台区'
    //                   },
    //                   {
    //                     'recDivCode': '610703101',
    //                     'agencyName': '南郑区大河坎镇'
    //                   },
    //                   {
    //                     'recDivCode': '610703000',
    //                     'children': [
    //                       {
    //                         'recDivCode': '610703000',
    //                         'agencyName': '南郑区本级'
    //                       },
    //                       {
    //                         'recDivCode': '610703000',
    //                         'agencyName': '南郑区辖区'
    //                       }
    //                     ],
    //                     'agencyName': '南郑区'
    //                   },
    //                   {
    //                     'recDivCode': '610722000',
    //                     'children': [
    //                       {
    //                         'recDivCode': '610722000',
    //                         'agencyName': '城固县本级'
    //                       },
    //                       {
    //                         'recDivCode': '610722000',
    //                         'agencyName': '城固县辖区'
    //                       }
    //                     ],
    //                     'agencyName': '城固县'
    //                   },
    //                   {
    //                     'recDivCode': '610723000',
    //                     'children': [
    //                       {
    //                         'recDivCode': '610723000',
    //                         'agencyName': '洋县本级'
    //                       },
    //                       {
    //                         'recDivCode': '610723000',
    //                         'agencyName': '洋县辖区'
    //                       }
    //                     ],
    //                     'agencyName': '洋县'
    //                   },
    //                   {
    //                     'recDivCode': '610724000',
    //                     'children': [
    //                       {
    //                         'recDivCode': '610724000',
    //                         'agencyName': '西乡县本级'
    //                       },
    //                       {
    //                         'recDivCode': '610724000',
    //                         'agencyName': '西乡县辖区'
    //                       }
    //                     ],
    //                     'agencyName': '西乡县'
    //                   },
    //                   {
    //                     'recDivCode': '610725000',
    //                     'children': [
    //                       {
    //                         'recDivCode': '610725000',
    //                         'agencyName': '勉县本级'
    //                       },
    //                       {
    //                         'recDivCode': '610725000',
    //                         'agencyName': '勉县辖区'
    //                       }
    //                     ],
    //                     'agencyName': '勉县'
    //                   },
    //                   {
    //                     'recDivCode': '610726000',
    //                     'children': [
    //                       {
    //                         'recDivCode': '610726000',
    //                         'agencyName': '宁强县本级'
    //                       },
    //                       {
    //                         'recDivCode': '610726000',
    //                         'agencyName': '宁强县辖区'
    //                       }
    //                     ],
    //                     'agencyName': '宁强县'
    //                   },
    //                   {
    //                     'recDivCode': '610727000',
    //                     'children': [
    //                       {
    //                         'recDivCode': '610727000',
    //                         'agencyName': '略阳县本级'
    //                       },
    //                       {
    //                         'recDivCode': '610727000',
    //                         'agencyName': '略阳县辖区'
    //                       }
    //                     ],
    //                     'agencyName': '略阳县'
    //                   },
    //                   {
    //                     'recDivCode': '610728000',
    //                     'children': [
    //                       {
    //                         'recDivCode': '610728000',
    //                         'agencyName': '镇巴县本级'
    //                       },
    //                       {
    //                         'recDivCode': '610728000',
    //                         'agencyName': '镇巴县辖区'
    //                       }
    //                     ],
    //                     'agencyName': '镇巴县'
    //                   },
    //                   {
    //                     'recDivCode': '610729000',
    //                     'children': [
    //                       {
    //                         'recDivCode': '610729000',
    //                         'agencyName': '留坝县本级'
    //                       },
    //                       {
    //                         'recDivCode': '610729000',
    //                         'agencyName': '留坝县辖区'
    //                       }
    //                     ],
    //                     'agencyName': '留坝县'
    //                   },
    //                   {
    //                     'recDivCode': '610730000',
    //                     'children': [
    //                       {
    //                         'recDivCode': '610730000',
    //                         'agencyName': '佛坪县本级'
    //                       },
    //                       {
    //                         'recDivCode': '610730000',
    //                         'agencyName': '佛坪县辖区'
    //                       }
    //                     ],
    //                     'agencyName': '佛坪县'
    //                   },
    //                   {
    //                     'recDivCode': '610731000',
    //                     'children': [
    //                       {
    //                         'recDivCode': '610731000',
    //                         'agencyName': '汉中市经济开发区本级'
    //                       },
    //                       {
    //                         'recDivCode': '610731000',
    //                         'agencyName': '汉中市经济开发区辖区'
    //                       }
    //                     ],
    //                     'agencyName': '汉中市经济开发区'
    //                   },
    //                   {
    //                     'recDivCode': '610732000',
    //                     'children': [
    //                       {
    //                         'recDivCode': '610732000',
    //                         'agencyName': '汉中市兴元新区本级'
    //                       },
    //                       {
    //                         'recDivCode': '610732000',
    //                         'agencyName': '汉中市兴元新区辖区'
    //                       }
    //                     ],
    //                     'agencyName': '汉中市兴元新区'
    //                   }
    //                 ],
    //                 'agencyName': '汉中市辖区'
    //               }
    //             ],
    //             'agencyName': '汉中市'
    //           },
    //           {
    //             'recDivCode': '610800000',
    //             'children': [
    //               {
    //                 'recDivCode': '610800000',
    //                 'agencyName': '榆林市本级'
    //               },
    //               {
    //                 'recDivCode': '610800000',
    //                 'children': [
    //                   {
    //                     'recDivCode': '610802000',
    //                     'children': [
    //                       {
    //                         'recDivCode': '610802000',
    //                         'agencyName': '榆阳区本级'
    //                       },
    //                       {
    //                         'recDivCode': '610802000',
    //                         'agencyName': '榆阳区辖区'
    //                       }
    //                     ],
    //                     'agencyName': '榆阳区'
    //                   },
    //                   {
    //                     'recDivCode': '610803000',
    //                     'children': [
    //                       {
    //                         'recDivCode': '610803000',
    //                         'agencyName': '横山区本级'
    //                       },
    //                       {
    //                         'recDivCode': '610803000',
    //                         'agencyName': '横山区辖区'
    //                       }
    //                     ],
    //                     'agencyName': '横山区'
    //                   },
    //                   {
    //                     'recDivCode': '610822000',
    //                     'children': [
    //                       {
    //                         'recDivCode': '610822000',
    //                         'agencyName': '府谷县本级'
    //                       },
    //                       {
    //                         'recDivCode': '610822000',
    //                         'agencyName': '府谷县辖区'
    //                       }
    //                     ],
    //                     'agencyName': '府谷县'
    //                   },
    //                   {
    //                     'recDivCode': '610824000',
    //                     'children': [
    //                       {
    //                         'recDivCode': '610824000',
    //                         'agencyName': '靖边县本级'
    //                       },
    //                       {
    //                         'recDivCode': '610824000',
    //                         'agencyName': '靖边县辖区'
    //                       }
    //                     ],
    //                     'agencyName': '靖边县'
    //                   },
    //                   {
    //                     'recDivCode': '610825000',
    //                     'children': [
    //                       {
    //                         'recDivCode': '610825000',
    //                         'agencyName': '定边县本级'
    //                       },
    //                       {
    //                         'recDivCode': '610825000',
    //                         'agencyName': '定边县辖区'
    //                       }
    //                     ],
    //                     'agencyName': '定边县'
    //                   },
    //                   {
    //                     'recDivCode': '610826000',
    //                     'children': [
    //                       {
    //                         'recDivCode': '610826000',
    //                         'agencyName': '绥德县本级'
    //                       },
    //                       {
    //                         'recDivCode': '610826000',
    //                         'agencyName': '绥德县辖区'
    //                       }
    //                     ],
    //                     'agencyName': '绥德县'
    //                   },
    //                   {
    //                     'recDivCode': '610827000',
    //                     'children': [
    //                       {
    //                         'recDivCode': '610827000',
    //                         'agencyName': '米脂县本级'
    //                       },
    //                       {
    //                         'recDivCode': '610827000',
    //                         'agencyName': '米脂县辖区'
    //                       }
    //                     ],
    //                     'agencyName': '米脂县'
    //                   },
    //                   {
    //                     'recDivCode': '610828000',
    //                     'children': [
    //                       {
    //                         'recDivCode': '610828000',
    //                         'agencyName': '佳县本级'
    //                       },
    //                       {
    //                         'recDivCode': '610828000',
    //                         'agencyName': '佳县辖区'
    //                       }
    //                     ],
    //                     'agencyName': '佳县'
    //                   },
    //                   {
    //                     'recDivCode': '610829000',
    //                     'children': [
    //                       {
    //                         'recDivCode': '610829000',
    //                         'agencyName': '吴堡县本级'
    //                       },
    //                       {
    //                         'recDivCode': '610829000',
    //                         'agencyName': '吴堡县辖区'
    //                       }
    //                     ],
    //                     'agencyName': '吴堡县'
    //                   },
    //                   {
    //                     'recDivCode': '610830000',
    //                     'children': [
    //                       {
    //                         'recDivCode': '610830000',
    //                         'agencyName': '清涧县本级'
    //                       },
    //                       {
    //                         'recDivCode': '610830000',
    //                         'agencyName': '清涧县辖区'
    //                       }
    //                     ],
    //                     'agencyName': '清涧县'
    //                   },
    //                   {
    //                     'recDivCode': '610831000',
    //                     'children': [
    //                       {
    //                         'recDivCode': '610831000',
    //                         'agencyName': '子洲县本级'
    //                       },
    //                       {
    //                         'recDivCode': '610831000',
    //                         'agencyName': '子洲县辖区'
    //                       }
    //                     ],
    //                     'agencyName': '子洲县'
    //                   },
    //                   {
    //                     'recDivCode': '610832000',
    //                     'children': [
    //                       {
    //                         'recDivCode': '610832000',
    //                         'agencyName': '榆横工业区本级'
    //                       },
    //                       {
    //                         'recDivCode': '610832000',
    //                         'agencyName': '榆横工业区辖区'
    //                       }
    //                     ],
    //                     'agencyName': '榆横工业区'
    //                   },
    //                   {
    //                     'recDivCode': '610833000',
    //                     'children': [
    //                       {
    //                         'recDivCode': '610833000',
    //                         'agencyName': '榆神工业区本级'
    //                       },
    //                       {
    //                         'recDivCode': '610833000',
    //                         'agencyName': '榆神工业区辖区'
    //                       }
    //                     ],
    //                     'agencyName': '榆神工业区'
    //                   },
    //                   {
    //                     'recDivCode': '610881000',
    //                     'children': [
    //                       {
    //                         'recDivCode': '610881000',
    //                         'agencyName': '神木市本级'
    //                       },
    //                       {
    //                         'recDivCode': '610881000',
    //                         'agencyName': '神木市辖区'
    //                       }
    //                     ],
    //                     'agencyName': '神木市'
    //                   },
    //                   {
    //                     'recDivCode': '610000000',
    //                     'children': [
    //                       {
    //                         'recDivCode': '610882000',
    //                         'agencyName': '大柳塔镇本级'
    //                       },
    //                       {
    //                         'recDivCode': '610000000',
    //                         'agencyName': '大柳塔镇辖区'
    //                       }
    //                     ],
    //                     'agencyName': '大柳塔镇'
    //                   }
    //                 ],
    //                 'agencyName': '榆林市辖区'
    //               }
    //             ],
    //             'agencyName': '榆林市'
    //           },
    //           {
    //             'recDivCode': '610900000',
    //             'children': [
    //               {
    //                 'recDivCode': '610900000',
    //                 'agencyName': '安康市本级'
    //               },
    //               {
    //                 'recDivCode': '610900000',
    //                 'children': [
    //                   {
    //                     'recDivCode': '610902000',
    //                     'children': [
    //                       {
    //                         'recDivCode': '610902000',
    //                         'agencyName': '汉滨区本级'
    //                       },
    //                       {
    //                         'recDivCode': '610902000',
    //                         'agencyName': '汉滨区辖区'
    //                       }
    //                     ],
    //                     'agencyName': '汉滨区'
    //                   },
    //                   {
    //                     'recDivCode': '610921000',
    //                     'children': [
    //                       {
    //                         'recDivCode': '610921000',
    //                         'agencyName': '汉阴县本级'
    //                       },
    //                       {
    //                         'recDivCode': '610921000',
    //                         'agencyName': '汉阴县辖区'
    //                       }
    //                     ],
    //                     'agencyName': '汉阴县'
    //                   },
    //                   {
    //                     'recDivCode': '610922000',
    //                     'children': [
    //                       {
    //                         'recDivCode': '610922000',
    //                         'agencyName': '石泉县本级'
    //                       },
    //                       {
    //                         'recDivCode': '610922000',
    //                         'agencyName': '石泉县辖区'
    //                       }
    //                     ],
    //                     'agencyName': '石泉县'
    //                   },
    //                   {
    //                     'recDivCode': '610923000',
    //                     'children': [
    //                       {
    //                         'recDivCode': '610923000',
    //                         'agencyName': '宁陕县本级'
    //                       },
    //                       {
    //                         'recDivCode': '610923000',
    //                         'agencyName': '宁陕县辖区'
    //                       }
    //                     ],
    //                     'agencyName': '宁陕县'
    //                   },
    //                   {
    //                     'recDivCode': '610924000',
    //                     'children': [
    //                       {
    //                         'recDivCode': '610924000',
    //                         'agencyName': '紫阳县本级'
    //                       },
    //                       {
    //                         'recDivCode': '610924000',
    //                         'agencyName': '紫阳县辖区'
    //                       }
    //                     ],
    //                     'agencyName': '紫阳县'
    //                   },
    //                   {
    //                     'recDivCode': '610925000',
    //                     'children': [
    //                       {
    //                         'recDivCode': '610925000',
    //                         'agencyName': '岚皋县本级'
    //                       },
    //                       {
    //                         'recDivCode': '610925000',
    //                         'agencyName': '岚皋县辖区'
    //                       }
    //                     ],
    //                     'agencyName': '岚皋县'
    //                   },
    //                   {
    //                     'recDivCode': '610926000',
    //                     'children': [
    //                       {
    //                         'recDivCode': '610926000',
    //                         'agencyName': '平利县本级'
    //                       },
    //                       {
    //                         'recDivCode': '610926000',
    //                         'agencyName': '平利县辖区'
    //                       }
    //                     ],
    //                     'agencyName': '平利县'
    //                   },
    //                   {
    //                     'recDivCode': '610927000',
    //                     'children': [
    //                       {
    //                         'recDivCode': '610927000',
    //                         'agencyName': '镇坪县本级'
    //                       },
    //                       {
    //                         'recDivCode': '610927000',
    //                         'agencyName': '镇坪县辖区'
    //                       }
    //                     ],
    //                     'agencyName': '镇坪县'
    //                   },
    //                   {
    //                     'recDivCode': '610928000',
    //                     'children': [
    //                       {
    //                         'recDivCode': '610928000',
    //                         'agencyName': '旬阳县本级'
    //                       },
    //                       {
    //                         'recDivCode': '610928000',
    //                         'agencyName': '旬阳县辖区'
    //                       }
    //                     ],
    //                     'agencyName': '旬阳县'
    //                   },
    //                   {
    //                     'recDivCode': '610929000',
    //                     'children': [
    //                       {
    //                         'recDivCode': '610929000',
    //                         'agencyName': '白河县本级'
    //                       },
    //                       {
    //                         'recDivCode': '610929000',
    //                         'agencyName': '白河县辖区'
    //                       }
    //                     ],
    //                     'agencyName': '白河县'
    //                   },
    //                   {
    //                     'recDivCode': '610930000',
    //                     'children': [
    //                       {
    //                         'recDivCode': '610930000',
    //                         'agencyName': '安康市高新技术产业开发区本级'
    //                       },
    //                       {
    //                         'recDivCode': '610930000',
    //                         'agencyName': '安康市高新技术产业开发区辖区'
    //                       }
    //                     ],
    //                     'agencyName': '安康市高新技术产业开发区'
    //                   },
    //                   {
    //                     'recDivCode': '610932000',
    //                     'children': [
    //                       {
    //                         'recDivCode': '610932000',
    //                         'agencyName': '安康市恒口示范区本级'
    //                       },
    //                       {
    //                         'recDivCode': '610932000',
    //                         'agencyName': '安康市恒口示范区辖区'
    //                       }
    //                     ],
    //                     'agencyName': '安康市恒口示范区'
    //                   }
    //                 ],
    //                 'agencyName': '安康市辖区'
    //               }
    //             ],
    //             'agencyName': '安康市'
    //           },
    //           {
    //             'recDivCode': '611000000',
    //             'children': [
    //               {
    //                 'recDivCode': '611000000',
    //                 'agencyName': '商洛市本级'
    //               },
    //               {
    //                 'recDivCode': '611000000',
    //                 'children': [
    //                   {
    //                     'recDivCode': '611002000',
    //                     'children': [
    //                       {
    //                         'recDivCode': '611002000',
    //                         'agencyName': '商州区本级'
    //                       },
    //                       {
    //                         'recDivCode': '611002000',
    //                         'agencyName': '商州区辖区'
    //                       }
    //                     ],
    //                     'agencyName': '商州区'
    //                   },
    //                   {
    //                     'recDivCode': '611021000',
    //                     'children': [
    //                       {
    //                         'recDivCode': '611021000',
    //                         'agencyName': '洛南县本级'
    //                       },
    //                       {
    //                         'recDivCode': '611021000',
    //                         'agencyName': '洛南县辖区'
    //                       }
    //                     ],
    //                     'agencyName': '洛南县'
    //                   },
    //                   {
    //                     'recDivCode': '611022000',
    //                     'children': [
    //                       {
    //                         'recDivCode': '611022000',
    //                         'agencyName': '丹凤县本级'
    //                       },
    //                       {
    //                         'recDivCode': '611022000',
    //                         'agencyName': '丹凤县辖区'
    //                       }
    //                     ],
    //                     'agencyName': '丹凤县'
    //                   },
    //                   {
    //                     'recDivCode': '611023000',
    //                     'children': [
    //                       {
    //                         'recDivCode': '611023000',
    //                         'agencyName': '商南县本级'
    //                       },
    //                       {
    //                         'recDivCode': '611023000',
    //                         'agencyName': '商南县辖区'
    //                       }
    //                     ],
    //                     'agencyName': '商南县'
    //                   },
    //                   {
    //                     'recDivCode': '611024000',
    //                     'children': [
    //                       {
    //                         'recDivCode': '611024000',
    //                         'agencyName': '山阳县本级'
    //                       },
    //                       {
    //                         'recDivCode': '611024000',
    //                         'agencyName': '山阳县辖区'
    //                       }
    //                     ],
    //                     'agencyName': '山阳县'
    //                   },
    //                   {
    //                     'recDivCode': '611025000',
    //                     'children': [
    //                       {
    //                         'recDivCode': '611025000',
    //                         'agencyName': '镇安县本级'
    //                       },
    //                       {
    //                         'recDivCode': '611025000',
    //                         'agencyName': '镇安县辖区'
    //                       }
    //                     ],
    //                     'agencyName': '镇安县'
    //                   },
    //                   {
    //                     'recDivCode': '611026000',
    //                     'children': [
    //                       {
    //                         'recDivCode': '611026000',
    //                         'agencyName': '柞水县本级'
    //                       },
    //                       {
    //                         'recDivCode': '611026000',
    //                         'agencyName': '柞水县辖区'
    //                       }
    //                     ],
    //                     'agencyName': '柞水县'
    //                   }
    //                 ],
    //                 'agencyName': '商洛市辖区'
    //               }
    //             ],
    //             'agencyName': '商洛市'
    //           },
    //           {
    //             'recDivCode': '610432000',
    //             'children': [
    //               {
    //                 'recDivCode': '610432000',
    //                 'agencyName': '杨凌示范区本级'
    //               },
    //               {
    //                 'recDivCode': '610432000',
    //                 'children': [
    //                   {
    //                     'recDivCode': '610403000',
    //                     'children': [
    //                       {
    //                         'recDivCode': '610403000',
    //                         'agencyName': '杨陵区本级'
    //                       },
    //                       {
    //                         'recDivCode': '610403000',
    //                         'agencyName': '杨陵区辖区'
    //                       }
    //                     ],
    //                     'agencyName': '杨陵区'
    //                   }
    //                 ],
    //                 'agencyName': '杨凌示范区辖区'
    //               }
    //             ],
    //             'agencyName': '杨凌示范区'
    //           }
    //         ],
    //         'agencyName': '陕西省辖区',
    //         jAmount: 1088341488,
    //         dfAmount: 48773485,
    //         aAmount: 1136534273,
    //         szyapAmount: 10881488,
    //         sdfapAmount: 487785,
    //         saAmount: 11365273,
    //         sqzyapAmount: 10881488,
    //         sqdfapAmount: 389938.09,
    //         sqaAmount: 11271462.09,
    //         shzyapAmount: 0,
    //         shdfapAmount: 0,
    //         shaAmount: 0,
    //         szybjfpAmount: 24232,
    //         sdfbjfpAmount: 43533,
    //         sbjfpaAmount: 67453,
    //         szysxfpAmount: 23245,
    //         sdfsxfpAmount: 645,
    //         ssxfpaAmount: 335,
    //         szywfpAmount: 24546,
    //         sdfwfpAmount: 7684,
    //         swfpaAmount: 1626,
    //         szyjd: 86,
    //         sdfjd: 26,
    //         sajd: 59,
    //         shizyapAmount: 596,
    //         shidfapAmount: 6496,
    //         shiaAmount: 696,
    //         shqzyapAmount: 692,
    //         shqdfapAmount: 94611,
    //         shqaAmount: 6962,
    //         shhzyapAmount: 61623,
    //         shhdfapAmount: 365466,
    //         shhaAmount: 164612,
    //         shzybjfpAmount: 95231,
    //         shdfbjfpAmount: 6913,
    //         shbjfpaAmount: 999,
    //         shzyxjfpAmount: 666,
    //         shdfxjfpAmount: 54649,
    //         shxjfpaAmount: 2568621,
    //         shzywfpAmount: 38882,
    //         shdfwfpAmount: 2607503,
    //         shwfpaAmount: 674,
    //         shzyjd: 45,
    //         shdfjd: 78,
    //         shajd: 64,
    //         xzyapAmount: 7654,
    //         xdfapAmount: 344,
    //         xaAmount: 5364,
    //         xqzyapAmount: 124,
    //         xqdfapAmount: 345,
    //         xqaAmount: 124,
    //         xhzyapAmount: 245,
    //         xhdfapAmount: 4566,
    //         xhaAmount: 457,
    //         xzyyfpAmount: 354,
    //         xdfyfpAmount: 1213,
    //         xyfpaAmount: 44,
    //         xzywfpAmount: 464,
    //         xdfwfpAmount: 4364,
    //         xwfpaAmount: 41464,
    //         xzyjd: 45,
    //         xdfjd: 66,
    //         xajd: 45
    //       }
    //     ],
    //     'agencyName': '陕西省',
    //     aAmount: 1234436538412.99,
    //     cAmount: 72474699200,
    //     pAmount: 12042109128,
    //     pPro: 55,
    //     szyapaAmount: 787212,
    //     sdfapaAmount: 8644254,
    //     saaAmount: 34212425,
    //     szyapcAmount: 45445,
    //     sdfapcAmount: 24112,
    //     sacAmount: 454212,
    //     szyappAmount: 753743,
    //     sdfappAmount: 4545,
    //     sapAmount: 373,
    //     szyappPro: 45,
    //     sdfappPro: 74,
    //     sapPro: 65,
    //     shzyapaAmount: 76546,
    //     shdfapaAmount: 464,
    //     shaaAmount: 785764,
    //     shzyapcAmount: 45646,
    //     shdfapcAmount: 45674,
    //     shacAmount: 4564,
    //     shzyappAmount: 45476,
    //     shdfappAmount: 4642,
    //     shapAmount: 4657,
    //     shzyappPro: 65,
    //     shdfappPro: 75,
    //     shapPro: 45,
    //     xzyapaAmount: 64542,
    //     xdfapaAmount: 57476,
    //     xaaAmount: 75466,
    //     xzyapcAmount: 456485,
    //     xdfapcAmount: 464646,
    //     xacAmount: 46546,
    //     xzyappAmount: 45752,
    //     xdfappAmount: 75876,
    //     xapAmount: 4646,
    //     xzyappPro: 85,
    //     xdfappPro: 45,
    //     xapPro: 65,
    //     zzyapAmount: 75478754,
    //     zdfapAmount: 6765545644,
    //     zaAmount: 546554576
    //   }
    // ]

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
