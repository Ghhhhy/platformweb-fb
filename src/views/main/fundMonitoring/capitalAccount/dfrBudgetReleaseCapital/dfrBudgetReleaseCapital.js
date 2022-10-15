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
          // { value: '2020', label: '2020年' },
          // { value: '2021', label: '2021年' },
          { value: '2022', label: '2022年' }
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
    fiscalYear: '2022',
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
        width: 200,
        align: 'center',
        children: [
          {
            title: '中央安排',
            field: 'amountQszydf',
            width: 200,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '省级安排',
            field: 'amountQssnjdf',
            width: 200,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '市级安排',
            field: 'amountQssjdf',
            width: 200,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '县级安排',
            field: 'amountQsxjdf',
            width: 200,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '总资金',
            field: 'aAmount',
            width: 200,
            align: 'right',
            cellRender: {
              name: '$vxeMoney'
            },
            formula: '({amountQszydf}+{amountQssnjdf}+{amountQssjdf}+{amountQsxjdf})'
          }
        ]
      },
      {
        title: '省级',
        width: 200,
        align: 'center',
        children: [
          {
            title: '预算金额',
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
                title: '省级安排',
                field: 'amountSnjsnjdf',
                width: 200,
                align: 'right',
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '总金额',
                field: 'saAmount',
                width: 200,
                align: 'right',
                cellRender: {
                  name: '$vxeMoney'
                },
                formula: '({amountSnjzyxd}+{amountSnjsnjdf})'
              }
            ]
          },
          {
            title: '整合资金情况',
            width: 200,
            align: 'center',
            children: [
              {
                title: '整合金额',
                width: 200,
                align: 'right',
                children: [
                  {
                    title: '中央安排',
                    field: 'sqzyapAmount',
                    width: 200,
                    align: 'right',
                    cellRender: { name: '$vxeMoney' }
                  },
                  {
                    title: '省级安排',
                    field: 'sqdfapAmount',
                    width: 200,
                    align: 'right',
                    cellRender: { name: '$vxeMoney' }
                  },
                  {
                    title: '总金额',
                    field: 'sqaAmount',
                    width: 200,
                    align: 'right',
                    cellRender: {
                      name: '$vxeMoney'
                    },
                    formula: '({sqzyapAmount}+{sqdfapAmount})'
                  }
                ]
              },
              {
                title: '整合后金额',
                width: 200,
                align: 'right',
                children: [
                  {
                    title: '中央安排',
                    field: 'shzyapAmount',
                    width: 200,
                    align: 'right',
                    cellRender: { name: '$vxeMoney' }
                  },
                  {
                    title: '省级安排',
                    field: 'shdfapAmount',
                    width: 200,
                    align: 'right',
                    cellRender: { name: '$vxeMoney' }
                  },
                  {
                    title: '总金额',
                    field: 'shaAmount',
                    width: 200,
                    align: 'right',
                    cellRender: {
                      name: '$vxeMoney'
                    },
                    formula: '({shzyapAmount}+{shdfapAmount})'
                  }
                ]
              }
            ]
          },
          {
            title: '分配本级',
            width: 200,
            align: 'right',
            children: [
              {
                title: '中央安排',
                field: 'amountSnjzybjfp',
                width: 200,
                align: 'right',
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '省级安排',
                field: 'amountSnjsnjbjfp',
                width: 200,
                align: 'right',
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '总金额',
                field: 'sbjfpaAmount',
                width: 200,
                align: 'right',
                cellRender: {
                  name: '$vxeMoney'
                },
                formula: '({amountSnjzybjfp}+{amountSnjsnjbjfp})'
              }
            ]
          },
          {
            title: '分配市县',
            width: 200,
            align: 'right',
            children: [
              {
                title: '中央安排',
                field: 'amountSnjzyxjfp',
                width: 200,
                align: 'right',
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '省级安排',
                field: 'amountSnjsnjxjfp',
                width: 200,
                align: 'right',
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '总金额',
                field: 'ssxfpaAmount',
                width: 200,
                align: 'right',
                cellRender: {
                  name: '$vxeMoney'
                },
                formula: '({amountSnjzyxjfp}+{amountSnjsnjxjfp})'
              }
            ]
          },
          {
            title: '未分配',
            width: 200,
            align: 'right',
            children: [
              {
                title: '中央安排',
                field: 'szywfpAmount',
                width: 200,
                align: 'right',
                cellRender: { name: '$vxeMoney' },
                formula: '{amountSnjzyxd}-({amountSnjzybjfp} - {amountSnjzyxjfp})'
              },
              {
                title: '省级安排',
                field: 'sdfwfpAmount',
                width: 200,
                align: 'right',
                cellRender: { name: '$vxeMoney' },
                formula: '{amountSnjsnjdf} - {amountSnjsnjbjfp} - {amountSnjsnjxjfp}'
              },
              {
                title: '总金额',
                field: 'swfpaAmount',
                width: 200,
                align: 'right',
                cellRender: {
                  name: '$vxeMoney'
                },
                formula: '({szywfpAmount}+{sdfwfpAmount})'
              }
            ]
          },
          {
            title: '进度',
            width: 200,
            align: 'right',
            children: [
              {
                title: '中央安排',
                field: 'szyjd',
                width: 200,
                align: 'right',
                cellRender: { name: '$vxeRatio' },
                formula: '{amountSnjysZyap}-0==0?0:({amountSnjfpbjZyap}+{amountSnjfpxjZyap})/{amountSnjysZyap}*100'
              },
              {
                title: '省级安排',
                field: 'sdfjd',
                width: 200,
                align: 'right',
                cellRender: { name: '$vxeRatio' }
              },
              {
                title: '总进度',
                field: 'sajd',
                width: 200,
                align: 'right',
                cellRender: {
                  name: '$vxeRatio'
                },
                formula: '({szyjd}/2+{sdfjd}/2)'
              }
            ]
          }
        ]
      },
      {
        title: '市级',
        width: 200,
        align: 'center',
        children: [
          {
            title: '预算金额',
            width: 200,
            align: 'right',
            children: [
              {
                title: '中央安排',
                field: 'amountSjzydf',
                width: 200,
                align: 'right',
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '省级安排',
                field: 'amountSjsnjdf',
                width: 200,
                align: 'right',
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '市级安排',
                field: 'amountSjsjdf',
                width: 200,
                align: 'right',
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '总金额',
                field: 'shiaAmount',
                width: 200,
                align: 'right',
                cellRender: {
                  name: '$vxeMoney'
                },
                formula: '({amountSjzydf}+{amountSjsnjdf}+{amountSjsjdf})'
              }
            ]
          },
          {
            title: '整合资金情况',
            width: 200,
            align: 'center',
            children: [
              {
                title: '整合金额',
                width: 200,
                align: 'right',
                children: [
                  {
                    title: '中央安排',
                    field: 'shqzyapAmount',
                    width: 200,
                    align: 'right',
                    cellRender: { name: '$vxeMoney' }
                  },
                  {
                    title: '省级安排',
                    field: 'shqdfapAmount',
                    width: 200,
                    align: 'right',
                    cellRender: { name: '$vxeMoney' }
                  },
                  {
                    title: '市级安排',
                    field: 'shidfapAmount1',
                    width: 200,
                    align: 'right',
                    cellRender: { name: '$vxeMoney' }
                  },
                  {
                    title: '总金额',
                    field: 'shqaAmount',
                    width: 200,
                    align: 'right',
                    cellRender: {
                      name: '$vxeMoney'
                    },
                    formula: '({shqzyapAmount}+{shqdfapAmount}+{shidfapAmount1})'
                  }
                ]
              },
              {
                title: '整合后金额',
                width: 200,
                align: 'right',
                children: [
                  {
                    title: '中央安排',
                    field: 'shhzyapAmount',
                    width: 200,
                    align: 'right',
                    cellRender: { name: '$vxeMoney' }
                  },
                  {
                    title: '省级安排',
                    field: 'shhdfapAmount',
                    width: 200,
                    align: 'right',
                    cellRender: { name: '$vxeMoney' }
                  },
                  {
                    title: '市级安排',
                    field: 'shidfapAmount1',
                    width: 200,
                    align: 'right',
                    cellRender: { name: '$vxeMoney' }
                  },
                  {
                    title: '总金额',
                    field: 'shhaAmount',
                    width: 200,
                    align: 'right',
                    cellRender: {
                      name: '$vxeMoney'
                    },
                    formula: '({shhzyapAmount}+{shhdfapAmount}+{shidfapAmount1})'
                  }
                ]
              }
            ]
          },
          {
            title: '分配本级',
            width: 200,
            align: 'right',
            children: [
              {
                title: '中央安排',
                field: 'amountSjzybjfp',
                width: 200,
                align: 'right',
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '省级安排',
                field: 'amountSjsnjbjfp',
                width: 200,
                align: 'right',
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '市级安排',
                field: 'amountSjsjbjfp',
                width: 200,
                align: 'right',
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '总金额',
                field: 'shbjfpaAmount',
                width: 200,
                align: 'right',
                cellRender: {
                  name: '$vxeMoney'
                },
                formula: '({amountSjzybjfp}+{amountSjsnjbjfp}+{amountSjsjbjfp})'
              }
            ]
          },
          {
            title: '分配县级',
            width: 200,
            align: 'right',
            children: [
              {
                title: '中央安排',
                field: 'amountSjzyxjfp',
                width: 200,
                align: 'right',
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '省级安排',
                field: 'amountSjsnjxjfp',
                width: 200,
                align: 'right',
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '市级安排',
                field: 'amountSjsjxjfp',
                width: 200,
                align: 'right',
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '总金额',
                field: 'shxjfpaAmount',
                width: 200,
                align: 'right',
                cellRender: {
                  name: '$vxeMoney'
                },
                formula: '({amountSjzyxjfp}+{amountSjsnjxjfp}+{amountSjsjxjfp})'
              }
            ]
          },
          {
            title: '未分配',
            width: 200,
            align: 'right',
            children: [
              {
                title: '中央安排',
                field: 'shzywfpAmount',
                width: 200,
                align: 'right',
                cellRender: { name: '$vxeMoney' },
                formula: '{amountSjzydf}-({amountSjzybjfp} - {amountSjzyxjfp})'
              },
              {
                title: '省级安排',
                field: 'shdfwfpAmount',
                width: 200,
                align: 'right',
                cellRender: { name: '$vxeMoney' },
                formula: '{amountSjsnjdf}-({amountSjsnjbjfp} - {amountSjsnjxjfp})'
              },
              {
                title: '市级安排',
                field: 'shidfapAmount1',
                width: 200,
                align: 'right',
                cellRender: { name: '$vxeMoney' },
                formula: '{amountSjsjdf}-({amountSjsjbjfp} - {amountSjsjxjfp})'
              },
              {
                title: '总金额',
                field: 'shwfpaAmount',
                width: 200,
                align: 'right',
                cellRender: {
                  name: '$vxeMoney'
                },
                formula: '({shzywfpAmount}+{shdfwfpAmount}+{shidfapAmount1})'
              }
            ]
          },
          {
            title: '进度',
            width: 200,
            align: 'right',
            children: [
              {
                title: '中央安排',
                field: 'shzyjd',
                width: 200,
                align: 'right',
                cellRender: { name: '$vxeRatio' },
                formula: '{amountSjysZyap}-0==0?0:({amountSjfpbjZyap}+{amountSjfpxjZyap})/{amountSjysZyap}*100'
              },
              {
                title: '省级安排',
                field: 'shdfjd',
                width: 200,
                align: 'right',
                cellRender: { name: '$vxeRatio' }
              },
              {
                title: '市级安排',
                field: 'shidfapAmount1',
                width: 200,
                align: 'right',
                cellRender: { name: '$vxeRatio' }
              },
              {
                title: '总进度',
                field: 'shajd',
                width: 200,
                align: 'right',
                cellRender: {
                  name: '$vxeRatio'
                },
                formula: '({shzyjd}/2+{shdfjd}/2)'
              }
            ]
          }
        ]
      },
      {
        title: '县级',
        width: 200,
        align: 'center',
        children: [
          {
            title: '预算金额',
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
                title: '省级安排',
                field: 'amountXjsnjfdf',
                width: 200,
                align: 'right',
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '市级安排',
                field: 'amountXjsjdf',
                width: 200,
                align: 'right',
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '县级安排',
                field: 'amountXjxjdf',
                width: 200,
                align: 'right',
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '总金额',
                field: 'xaAmount',
                width: 200,
                align: 'right',
                cellRender: {
                  name: '$vxeMoney'
                },
                formula: '({amountXjzydf}+{amountXjsnjfdf}+{amountXjsjdf}+{amountXjxjdf})'
              }
            ]
          },
          {
            title: '整合资金情况',
            width: 200,
            align: 'center',
            children: [
              {
                title: '整合金额',
                width: 200,
                align: 'right',
                children: [
                  {
                    title: '中央安排',
                    field: 'xqzyapAmount',
                    width: 200,
                    align: 'right',
                    cellRender: { name: '$vxeMoney' }
                  },
                  {
                    title: '省级安排',
                    field: 'xqdfapAmount',
                    width: 200,
                    align: 'right',
                    cellRender: { name: '$vxeMoney' }
                  },
                  {
                    title: '市级安排',
                    field: 'xdfapAmount3',
                    width: 200,
                    align: 'right',
                    cellRender: { name: '$vxeMoney' }
                  },
                  {
                    title: '县级安排',
                    field: 'xdfapAmount2',
                    width: 200,
                    align: 'right',
                    cellRender: { name: '$vxeMoney' }
                  },
                  {
                    title: '总金额',
                    field: 'snallAmount3',
                    width: 200,
                    align: 'right',
                    cellRender: {
                      name: '$vxeMoney'
                    },
                    formula: '({xqzyapAmount}+{xqdfapAmount})'
                  }
                ]
              },
              {
                title: '整合后金额',
                width: 200,
                align: 'right',
                children: [
                  {
                    title: '中央安排',
                    field: 'xhzyapAmount',
                    width: 200,
                    align: 'right',
                    cellRender: { name: '$vxeMoney' }
                  },
                  {
                    title: '省级安排',
                    field: 'xhdfapAmount',
                    width: 200,
                    align: 'right',
                    cellRender: { name: '$vxeMoney' }
                  },
                  {
                    title: '市级安排',
                    field: 'xdfapAmount3',
                    width: 200,
                    align: 'right',
                    cellRender: { name: '$vxeMoney' }
                  },
                  {
                    title: '县级安排',
                    field: 'xdfapAmount2',
                    width: 200,
                    align: 'right',
                    cellRender: { name: '$vxeMoney' }
                  },
                  {
                    title: '总金额',
                    field: 'xhaAmount',
                    width: 200,
                    align: 'right',
                    cellRender: {
                      name: '$vxeMoney'
                    },
                    formula: '({xhzyapAmount}+{xhdfapAmount})'
                  }
                ]
              }
            ]
          },
          {
            title: '已分配',
            width: 200,
            align: 'right',
            children: [
              {
                title: '中央安排',
                field: 'amountXjzybjfp',
                width: 200,
                align: 'right',
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '省级安排',
                field: 'amountXjsnjbjfp',
                width: 200,
                align: 'right',
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '市级安排',
                field: 'amountXjsjbjfp',
                width: 200,
                align: 'right',
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '县级安排',
                field: 'amountXjxjbjfp',
                width: 200,
                align: 'right',
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '总金额',
                field: 'xyfpaAmount',
                width: 200,
                align: 'right',
                cellRender: {
                  name: '$vxeMoney'
                },
                formula: '({amountXjzybjfp}+{amountXjsnjbjfp}+{amountXjsjbjfp}+{amountXjxjbjfp})'
              }
            ]
          },
          {
            title: '未分配',
            width: 200,
            align: 'right',
            children: [
              {
                title: '中央安排',
                field: 'xzywfpAmount',
                width: 200,
                align: 'right',
                cellRender: { name: '$vxeMoney' },
                formula: '({amountXjzydf}-{amountXjzybjfp})'
              },
              {
                title: '省级安排',
                field: 'xdfwfpAmount',
                width: 200,
                align: 'right',
                cellRender: { name: '$vxeMoney' },
                formula: '({amountXjsnjfdf} - {amountXjsnjbjfp})'
              },
              {
                title: '市级安排',
                field: 'xdfapAmount3',
                width: 200,
                align: 'right',
                cellRender: { name: '$vxeMoney' },
                formula: '({amountXjsjdf} - {amountXjsjbjfp})'
              },
              {
                title: '县级安排',
                field: 'xdfapAmount2',
                width: 200,
                align: 'right',
                cellRender: { name: '$vxeMoney' },
                formula: '({xzywfpAmount} - {amountXjxjbjfp})'
              },
              {
                title: '总金额',
                field: 'xwfpaAmount',
                width: 200,
                align: 'right',
                cellRender: {
                  name: '$vxeMoney'
                },
                formula: '({xzywfpAmount}+{xdfwfpAmount}+{xdfapAmount3}+{xdfapAmount2})'
              }
            ]
          },
          {
            title: '进度',
            width: 200,
            align: 'right',
            children: [
              {
                title: '中央安排',
                field: 'xzyjd',
                width: 200,
                align: 'right',
                cellRender: { name: '$vxeRatio' },
                formula: '{amountXjysZyap}-0==0?0:{amountXjfpZyap}/{amountXjysZyap}*100'
              },
              {
                title: '省级安排',
                field: 'xdfjd',
                width: 200,
                align: 'right',
                cellRender: { name: '$vxeRatio' }
              },
              {
                title: '市级安排',
                field: 'xdfapAmount3',
                width: 200,
                align: 'right',
                cellRender: { name: '$vxeRatio' }
              },
              {
                title: '县级安排',
                field: 'xdfapAmount2',
                width: 200,
                align: 'right',
                cellRender: { name: '$vxeRatio' }
              },
              {
                title: '总进度',
                field: 'xajd',
                width: 200,
                align: 'right',
                cellRender: {
                  name: '$vxeRatio'
                },
                formula: '({xzyjd}/2+{xdfjd}/2)'
              }
            ]
          }
        ]
      }
    ],
    tableData: []
    // tableData: [
    //   {
    //     speTypeCode: '1001',
    //     speTypeName: '直达资金',
    //     amountQszyap: 1083481488,
    //     dfAmount: 48734785,
    //     aAmount: 1136345273,
    //     amountSnjysZyap: 10881488,
    //     sdfapAmount: 487785,
    //     saAmount: 11365273,
    //     sqzyapAmount: 10881488,
    //     sqdfapAmount: 389938.09,
    //     sqaAmount: 11271462.09,
    //     shzyapAmount: 0,
    //     shdfapAmount: 0,
    //     shaAmount: 0,
    //     amountSnjfpbjZyap: 24232,
    //     sdfbjfpAmount: 43533,
    //     sbjfpaAmount: 67453,
    //     amountSnjfpxjZyap: 23245,
    //     sdfsxfpAmount: 645,
    //     ssxfpaAmount: 335,
    //     szywfpAmount: 24546,
    //     sdfwfpAmount: 7684,
    //     swfpaAmount: 1626,
    //     szyjd: 86,
    //     sdfjd: 26,
    //     sajd: 59,
    //     amountSjysZyap: 596,
    //     shidfapAmount: 6496,
    //     shiaAmount: 696,
    //     shqzyapAmount: 692,
    //     shqdfapAmount: 94611,
    //     shqaAmount: 6962,
    //     shhzyapAmount: 61623,
    //     shhdfapAmount: 365466,
    //     shhaAmount: 164612,
    //     amountSjfpbjZyap: 95231,
    //     shdfbjfpAmount: 6913,
    //     shbjfpaAmount: 999,
    //     amountSjfpxjZyap: 666,
    //     shdfxjfpAmount: 54649,
    //     shxjfpaAmount: 2568621,
    //     shzywfpAmount: 38882,
    //     shdfwfpAmount: 2607503,
    //     shwfpaAmount: 674,
    //     shzyjd: 45,
    //     shdfjd: 78,
    //     shajd: 64,
    //     amountXjysZyap: 7654,
    //     xdfapAmount: 344,
    //     xaAmount: 5364,
    //     xqzyapAmount: 124,
    //     xqdfapAmount: 345,
    //     xqaAmount: 124,
    //     xhzyapAmount: 245,
    //     xhdfapAmount: 4566,
    //     xhaAmount: 457,
    //     amountXjfpZyap: 354,
    //     xdfyfpAmount: 1213,
    //     xyfpaAmount: 44,
    //     xzywfpAmount: 464,
    //     xdfwfpAmount: 4364,
    //     xwfpaAmount: 41464,
    //     xzyjd: 45,
    //     xdfjd: 66,
    //     xajd: 45,
    //     children: [
    //       {
    //         speTypeCode: '10001',
    //         speTypeName: '共同财政事权转移支付',
    //         amountQszyap: 1083481488,
    //         dfAmount: 48734785,
    //         aAmount: 1136345273,
    //         amountSnjysZyap: 10881488,
    //         sdfapAmount: 487785,
    //         saAmount: 11365273,
    //         sqzyapAmount: 10881488,
    //         sqdfapAmount: 389938.09,
    //         sqaAmount: 11271462.09,
    //         shzyapAmount: 0,
    //         shdfapAmount: 0,
    //         shaAmount: 0,
    //         amountSnjfpbjZyap: 24232,
    //         sdfbjfpAmount: 43533,
    //         sbjfpaAmount: 67453,
    //         amountSnjfpxjZyap: 23245,
    //         sdfsxfpAmount: 645,
    //         ssxfpaAmount: 335,
    //         szywfpAmount: 24546,
    //         sdfwfpAmount: 7684,
    //         swfpaAmount: 1626,
    //         szyjd: 86,
    //         sdfjd: 26,
    //         sajd: 59,
    //         amountSjysZyap: 596,
    //         shidfapAmount: 6496,
    //         shiaAmount: 696,
    //         shqzyapAmount: 692,
    //         shqdfapAmount: 94611,
    //         shqaAmount: 6962,
    //         shhzyapAmount: 61623,
    //         shhdfapAmount: 365466,
    //         shhaAmount: 164612,
    //         amountSjfpbjZyap: 95231,
    //         shdfbjfpAmount: 6913,
    //         shbjfpaAmount: 999,
    //         amountSjfpxjZyap: 666,
    //         shdfxjfpAmount: 54649,
    //         shxjfpaAmount: 2568621,
    //         shzywfpAmount: 38882,
    //         shdfwfpAmount: 2607503,
    //         shwfpaAmount: 674,
    //         shzyjd: 45,
    //         shdfjd: 78,
    //         shajd: 64,
    //         amountXjysZyap: 7654,
    //         xdfapAmount: 344,
    //         xaAmount: 5364,
    //         xqzyapAmount: 124,
    //         xqdfapAmount: 345,
    //         xqaAmount: 124,
    //         xhzyapAmount: 245,
    //         xhdfapAmount: 4566,
    //         xhaAmount: 457,
    //         amountXjfpZyap: 354,
    //         xdfyfpAmount: 1213,
    //         xyfpaAmount: 44,
    //         xzywfpAmount: 464,
    //         xdfwfpAmount: 4364,
    //         xwfpaAmount: 41464,
    //         xzyjd: 45,
    //         xdfjd: 66,
    //         xajd: 45,
    //         children: [
    //           {
    //             speTypeCode: '10001',
    //             speTypeName: '城乡义务教育补助经费',
    //             amountQszyap: 1083481488,
    //             dfAmount: 48734785,
    //             aAmount: 1136345273,
    //             amountSnjysZyap: 10881488,
    //             sdfapAmount: 487785,
    //             saAmount: 11365273,
    //             sqzyapAmount: 10881488,
    //             sqdfapAmount: 389938.09,
    //             sqaAmount: 11271462.09,
    //             shzyapAmount: 0,
    //             shdfapAmount: 0,
    //             shaAmount: 0,
    //             amountSnjfpbjZyap: 24232,
    //             sdfbjfpAmount: 43533,
    //             sbjfpaAmount: 67453,
    //             amountSnjfpxjZyap: 23245,
    //             sdfsxfpAmount: 645,
    //             ssxfpaAmount: 335,
    //             szywfpAmount: 24546,
    //             sdfwfpAmount: 7684,
    //             swfpaAmount: 1626,
    //             szyjd: 86,
    //             sdfjd: 26,
    //             sajd: 59,
    //             amountSjysZyap: 596,
    //             shidfapAmount: 6496,
    //             shiaAmount: 696,
    //             shqzyapAmount: 692,
    //             shqdfapAmount: 94611,
    //             shqaAmount: 6962,
    //             shhzyapAmount: 61623,
    //             shhdfapAmount: 365466,
    //             shhaAmount: 164612,
    //             amountSjfpbjZyap: 95231,
    //             shdfbjfpAmount: 6913,
    //             shbjfpaAmount: 999,
    //             amountSjfpxjZyap: 666,
    //             shdfxjfpAmount: 54649,
    //             shxjfpaAmount: 2568621,
    //             shzywfpAmount: 38882,
    //             shdfwfpAmount: 2607503,
    //             shwfpaAmount: 674,
    //             shzyjd: 45,
    //             shdfjd: 78,
    //             shajd: 64,
    //             amountXjysZyap: 7654,
    //             xdfapAmount: 344,
    //             xaAmount: 5364,
    //             xqzyapAmount: 124,
    //             xqdfapAmount: 345,
    //             xqaAmount: 124,
    //             xhzyapAmount: 245,
    //             xhdfapAmount: 4566,
    //             xhaAmount: 457,
    //             amountXjfpZyap: 354,
    //             xdfyfpAmount: 1213,
    //             xyfpaAmount: 44,
    //             xzywfpAmount: 464,
    //             xdfwfpAmount: 4364,
    //             xwfpaAmount: 41464,
    //             xzyjd: 45,
    //             xdfjd: 66,
    //             xajd: 45
    //           },
    //           {
    //             speTypeCode: '1007',
    //             speTypeName: '支出地方高校改革发展资金',
    //             sbamountQszyap: 16122680000,
    //             sbbjfpAmount: 16122680000,
    //             sbxjfpAmount: 0,
    //             sbpayAppAmt: 264559042.41,
    //             sbjfpAmount: 0,
    //             sxjfpAmount: 0,
    //             spayAppAmt: 0,
    //             xbjfpAmount: 0,
    //             xpayAppAmt: 0
    //           },
    //           {
    //             speTypeCode: '101101',
    //             speTypeName: '机关事业单位基本养老保险（人社厅）',
    //             sbamountQszyap: 3258540000,
    //             sbbjfpAmount: 726410000,
    //             sbxjfpAmount: 2532130000,
    //             sbpayAppAmt: 726410000,
    //             sbjfpAmount: 0,
    //             sxjfpAmount: 0,
    //             spayAppAmt: 0,
    //             xbjfpAmount: 32380000,
    //             xpayAppAmt: 0
    //           },
    //           {
    //             speTypeCode: '101102',
    //             speTypeName: '企业职工基本养老保险（人社厅）',
    //             sbamountQszyap: 1365220000,
    //             sbbjfpAmount: 1365220000,
    //             sbxjfpAmount: 0,
    //             sbpayAppAmt: 9283240000,
    //             sbjfpAmount: 0,
    //             sxjfpAmount: 0,
    //             spayAppAmt: 0,
    //             xbjfpAmount: 0,
    //             xpayAppAmt: 0
    //           },
    //           {
    //             speTypeCode: '101103',
    //             speTypeName: '城乡居民基本养老保险（人社厅）',
    //             sbamountQszyap: 5709410000,
    //             sbbjfpAmount: 0,
    //             sbxjfpAmount: 5709410000,
    //             sbpayAppAmt: 0,
    //             sbjfpAmount: 0,
    //             sxjfpAmount: 0,
    //             spayAppAmt: 0,
    //             xbjfpAmount: 0,
    //             xpayAppAmt: 0
    //           },
    //           {
    //             speTypeCode: '1012',
    //             speTypeName: '困难群众救助补助资金',
    //             sbamountQszyap: 4896150000,
    //             sbbjfpAmount: 0,
    //             sbxjfpAmount: 4896150000,
    //             sbpayAppAmt: 0,
    //             sbjfpAmount: 0,
    //             sxjfpAmount: 0,
    //             spayAppAmt: 0,
    //             xbjfpAmount: 7413218,
    //             xpayAppAmt: 300320
    //           },
    //           {
    //             speTypeCode: '1017',
    //             speTypeName: '城乡居民基本医疗保险补助',
    //             sbamountQszyap: 12933620000,
    //             sbbjfpAmount: 0,
    //             sbxjfpAmount: 12933620000,
    //             sbpayAppAmt: 0,
    //             sbjfpAmount: 0,
    //             sxjfpAmount: 0,
    //             spayAppAmt: 0,
    //             xbjfpAmount: 0,
    //             xpayAppAmt: 0
    //           },
    //           {
    //             speTypeCode: '1018',
    //             speTypeName: '基本公共卫生服务补助资金',
    //             sbamountQszyap: 2268876000,
    //             sbbjfpAmount: 55148000,
    //             sbxjfpAmount: 2213728000,
    //             sbpayAppAmt: 420665.38,
    //             sbjfpAmount: 0,
    //             sxjfpAmount: 0,
    //             spayAppAmt: 0,
    //             xbjfpAmount: 0,
    //             xpayAppAmt: 0
    //           }
    //         ]
    //       },
    //       {
    //         speTypeCode: '10002',
    //         speTypeName: '一般性转移支付',
    //         sbamountQszyap: 30269701613,
    //         sbbjfpAmount: 6278751613,
    //         sbxjfpAmount: 4690950000,
    //         sbpayAppAmt: 138576576.31,
    //         sbjfpAmount: 0,
    //         sxjfpAmount: 0,
    //         spayAppAmt: 0,
    //         xbjfpAmount: 106680674.01,
    //         xpayAppAmt: 5026387.94,
    //         children: [
    //           {
    //             speTypeCode: '10002',
    //             speTypeName: '生猪（牛羊）调出大县奖励资金',
    //             sbamountQszyap: 11669701613,
    //             sbbjfpAmount: 6278751613,
    //             sbxjfpAmount: 5390950000,
    //             sbpayAppAmt: 138576576.31,
    //             sbjfpAmount: 0,
    //             sxjfpAmount: 0,
    //             spayAppAmt: 0,
    //             xbjfpAmount: 106680674.01,
    //             xpayAppAmt: 5026387.94
    //           },
    //           {
    //             speTypeCode: '10027',
    //             speTypeName: '县级基本财力保障机制奖补资金',
    //             sbamountQszyap: 1116122680000,
    //             sbbjfpAmount: 1116122680000,
    //             sbxjfpAmount: 0,
    //             sbpayAppAmt: 264559042.41,
    //             sbjfpAmount: 0,
    //             sxjfpAmount: 0,
    //             spayAppAmt: 0,
    //             xbjfpAmount: 0,
    //             xpayAppAmt: 0
    //           },
    //           {
    //             speTypeCode: '101201',
    //             speTypeName: '中央财政衔接推进乡村振兴补助资金',
    //             sbamountQszyap: 3258540000,
    //             sbbjfpAmount: 726410000,
    //             sbxjfpAmount: 2532130000,
    //             sbpayAppAmt: 726410000,
    //             sbjfpAmount: 0,
    //             sxjfpAmount: 0,
    //             spayAppAmt: 0,
    //             xbjfpAmount: 32380000,
    //             xpayAppAmt: 0
    //           }
    //         ]
    //       },
    //       {
    //         speTypeCode: '10003',
    //         speTypeName: '支持基层落实减税降费和重点民生等专项转移支付',
    //         sbamountQszyap: 10669701613,
    //         sbbjfpAmount: 6278751613,
    //         sbxjfpAmount: 1390950000,
    //         sbpayAppAmt: 138576576.31,
    //         sbjfpAmount: 0,
    //         sxjfpAmount: 0,
    //         spayAppAmt: 0,
    //         xbjfpAmount: 106680674.01,
    //         xpayAppAmt: 5026387.94,
    //         children: [
    //           {
    //             speTypeCode: '100031',
    //             speTypeName: '其他减税降费资金转移支付',
    //             sbamountQszyap: 11669701613,
    //             sbbjfpAmount: 6278751613,
    //             sbxjfpAmount: 5390950000,
    //             sbpayAppAmt: 138576576.31,
    //             sbjfpAmount: 0,
    //             sxjfpAmount: 0,
    //             spayAppAmt: 0,
    //             xbjfpAmount: 106680674.01,
    //             xpayAppAmt: 5026387.94
    //           },
    //           {
    //             speTypeCode: '10037',
    //             speTypeName: '增值税留抵退税资金转移支付',
    //             sbamountQszyap: 1116122680000,
    //             sbbjfpAmount: 1116122680000,
    //             sbxjfpAmount: 0,
    //             sbpayAppAmt: 264559042.41,
    //             sbjfpAmount: 0,
    //             sxjfpAmount: 0,
    //             spayAppAmt: 0,
    //             xbjfpAmount: 0,
    //             xpayAppAmt: 0
    //           }
    //         ]
    //       },
    //       {
    //         speTypeCode: '10004',
    //         speTypeName: '专项转移支付',
    //         sbamountQszyap: 164674613,
    //         sbbjfpAmount: 164674613,
    //         sbxjfpAmount: 950000,
    //         sbpayAppAmt: 138576576.31,
    //         sbjfpAmount: 0,
    //         sxjfpAmount: 0,
    //         spayAppAmt: 0,
    //         xbjfpAmount: 106680674.01,
    //         xpayAppAmt: 5026387.94,
    //         children: [
    //           {
    //             speTypeCode: '100041',
    //             speTypeName: '普惠金融发展专项资金',
    //             sbamountQszyap: 64674613,
    //             sbbjfpAmount: 64674613,
    //             sbxjfpAmount: 5390950000,
    //             sbpayAppAmt: 138576576.31,
    //             sbjfpAmount: 0,
    //             sxjfpAmount: 0,
    //             spayAppAmt: 0,
    //             xbjfpAmount: 106680674.01,
    //             xpayAppAmt: 5026387.94
    //           }
    //         ]
    //       }
    //     ]
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
