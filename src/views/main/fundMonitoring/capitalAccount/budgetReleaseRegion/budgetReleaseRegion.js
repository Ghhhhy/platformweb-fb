import store from '@/store/index'
import { $formula } from '@/hooks/useFormula/useFormula'
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
    // {
    //   title: '业务年度',
    //   field: 'fiscalYear',
    //   width: '8',
    //   align: 'left',
    //   formula: '',
    //   visible: !store.getters.isFuJian,
    //   itemRender: {
    //     name: '$vxeInput',
    //     // options: [
    //     //   // { value: '2020', label: '2020年' },
    //     //   // { value: '2021', label: '2021年' },
    //     //   { value: '2022', label: '2022年' },
    //     //   { value: '2023', label: '2023年' }
    //     // ],
    //     props: {
    //       clearable: true,
    //       type: 'year',
    //       valueFormat: 'yyyy',
    //       placeholder: '业务年度'
    //     }
    //   }
    // },
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
      width: 200,
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
            title: '中央安排',
            field: 'amountZjzl',
            width: 100,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '地方安排',
            field: 'amountZjzc',
            width: 100,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '总金额',
            field: 'aAmount',
            width: 100,
            align: 'right',
            cellRender: {
              name: '$vxeMoney'
            },
            formula: '({amountZjzl}+{amountZjzc})'
          }
        ]
      },
      {
        title: '省级',
        width: 100,
        align: 'center',
        children: [
          {
            title: '预算金额',
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
                field: 'saAmount',
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
            title: '整合资金情况',
            width: 100,
            align: 'center',
            children: [
              {
                title: '整合金额',
                width: 100,
                align: 'right',
                children: [
                  {
                    title: '中央安排',
                    field: 'sqzyapAmount',
                    width: 100,
                    align: 'right',
                    cellRender: { name: '$vxeMoney' }
                  },
                  {
                    title: '地方安排',
                    field: 'sqdfapAmount',
                    width: 100,
                    align: 'right',
                    cellRender: { name: '$vxeMoney' }
                  },
                  {
                    title: '总金额',
                    field: 'sqaAmount',
                    width: 100,
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
                width: 100,
                align: 'right',
                children: [
                  {
                    title: '中央安排',
                    field: 'shzyapAmount',
                    width: 100,
                    align: 'right',
                    cellRender: { name: '$vxeMoney' },
                    formula: '({sqzyapAmount}+{amountSnjysZyap})'
                  },
                  {
                    title: '地方安排',
                    field: 'amountSnjysDfap11',
                    width: 100,
                    align: 'right',
                    cellRender: { name: '$vxeMoney' },
                    formula: '({sqdfapAmount}+{amountSnjysDfap})'
                  },
                  {
                    title: '总金额',
                    field: 'shaAmount',
                    width: 100,
                    align: 'right',
                    cellRender: {
                      name: '$vxeMoney'
                    },
                    formula: '({shzyapAmount}+{amountSnjysDfap})'
                  }
                ]
              }
            ]
          },
          {
            title: '分配本级',
            width: 100,
            align: 'right',
            children: [
              {
                title: '中央安排',
                field: 'amountSnjzybjfp',
                width: 100,
                align: 'right',
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '地方安排',
                field: 'amountSnjdfbjfp',
                width: 100,
                align: 'right',
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '总金额',
                field: 'amountSnjfpAll',
                width: 100,
                align: 'right',
                cellRender: {
                  name: '$vxeMoney'
                },
                formula: '({amountSnjzybjfp}+{amountSnjdfbjfp})'
              }
            ]
          },
          {
            title: '分配市县',
            width: 100,
            align: 'right',
            children: [
              {
                title: '中央安排',
                field: 'amountSnjzyxjfp',
                width: 100,
                align: 'right',
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '地方安排',
                field: 'amountSnjdfxjfp',
                width: 100,
                align: 'right',
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '总金额',
                field: 'ssxfpaAmount',
                width: 100,
                align: 'right',
                cellRender: {
                  name: '$vxeMoney'
                },
                formula: '({amountSnjzyxjfp}+{amountSnjdfxjfp})'
              }
            ]
          },
          {
            title: '未分配',
            width: 100,
            align: 'right',
            children: [
              {
                title: '中央安排',
                field: 'szywfpAmount',
                width: 100,
                align: 'right',
                cellRender: { name: '$vxeMoney' },
                formula: $formula('budgetReleaseRegion.szywfpAmount')
              },
              {
                title: '地方安排',
                field: 'sdfwfpAmount',
                width: 100,
                align: 'right',
                cellRender: { name: '$vxeMoney' },
                formula: $formula('budgetReleaseRegion.sdfwfpAmount')
              },
              {
                title: '总金额',
                field: 'swfpaAmount',
                width: 100,
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
            width: 100,
            align: 'right',
            children: [
              {
                title: '中央安排',
                field: 'szyjd',
                width: 100,
                align: 'right',
                cellRender: { name: '$vxeRatio' },
                formula: $formula('budgetReleaseRegion.szyjd')
              },
              {
                title: '地方安排',
                field: 'sdfjd',
                width: 100,
                align: 'right',
                cellRender: { name: '$vxeRatio' },
                formula: $formula('budgetReleaseRegion.sdfjd')
              },
              {
                title: '总进度',
                field: 'sajd',
                width: 100,
                align: 'right',
                cellRender: {
                  name: '$vxeRatio'
                },
                formula: $formula('budgetReleaseRegion.sajd')
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
            title: '预算金额',
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
                field: 'shiaAmount',
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
            title: '整合资金情况',
            width: 100,
            align: 'center',
            children: [
              {
                title: '整合金额',
                width: 100,
                align: 'right',
                children: [
                  {
                    title: '中央安排',
                    field: 'shqzyapAmount',
                    width: 100,
                    align: 'right',
                    cellRender: { name: '$vxeMoney' }
                  },
                  {
                    title: '地方安排',
                    field: 'shqdfapAmount',
                    width: 100,
                    align: 'right',
                    cellRender: { name: '$vxeMoney' }
                  },
                  {
                    title: '总金额',
                    field: 'shqaAmount',
                    width: 100,
                    align: 'right',
                    cellRender: {
                      name: '$vxeMoney'
                    },
                    formula: '({shqzyapAmount}+{shqdfapAmount})'
                  }
                ]
              },
              {
                title: '整合后金额',
                width: 100,
                align: 'right',
                children: [
                  {
                    title: '中央安排',
                    field: 'shhzyapAmount',
                    width: 100,
                    align: 'right',
                    cellRender: { name: '$vxeMoney' },
                    formula: '({shqzyapAmount}+{amountSjysZyap})'
                  },
                  {
                    title: '地方安排',
                    field: 'shhdfapAmount',
                    width: 100,
                    align: 'right',
                    cellRender: { name: '$vxeMoney' },
                    formula: '({shqdfapAmount}+{amountSjysDfap})'
                  },
                  {
                    title: '总金额',
                    field: 'shhaAmount',
                    width: 100,
                    align: 'right',
                    cellRender: {
                      name: '$vxeMoney'
                    },
                    formula: '({shhzyapAmount}+{shhdfapAmount})'
                  }
                ]
              }
            ]
          },
          {
            title: '分配本级',
            width: 100,
            align: 'right',
            children: [
              {
                title: '中央安排',
                field: 'amountSjzybjfp',
                width: 100,
                align: 'right',
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '地方安排',
                field: 'amountSjdfbjfp',
                width: 100,
                align: 'right',
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '总金额',
                field: 'amountSjfpbjAll',
                width: 100,
                align: 'right',
                cellRender: {
                  name: '$vxeMoney'
                },
                formula: '({amountSjzybjfp}+{amountSjdfbjfp})'
              }
            ]
          },
          {
            title: '分配县级',
            width: 100,
            align: 'right',
            children: [
              {
                title: '中央安排',
                field: 'amountSjzyxjfp',
                width: 100,
                align: 'right',
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '地方安排',
                field: 'amountSjdfxjfp',
                width: 100,
                align: 'right',
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '总金额',
                field: 'shxjfpaAmount',
                width: 100,
                align: 'right',
                cellRender: {
                  name: '$vxeMoney'
                },
                formula: '({amountSjzyxjfp}+{amountSjdfxjfp})'
              }
            ]
          },
          {
            title: '未分配',
            width: 100,
            align: 'right',
            children: [
              {
                title: '中央安排',
                field: 'shzywfpAmount',
                width: 100,
                align: 'right',
                cellRender: { name: '$vxeMoney' },
                formula: $formula('budgetReleaseRegion.shzywfpAmount')// 同分地区的未分配计算
              },
              {
                title: '地方安排',
                field: 'shdfwfpAmount',
                width: 100,
                align: 'right',
                cellRender: { name: '$vxeMoney' },
                formula: $formula('budgetReleaseRegion.shdfwfpAmount')// 同分地区的未分配计算
              },
              {
                title: '总金额',
                field: 'shwfpaAmount',
                width: 100,
                align: 'right',
                cellRender: {
                  name: '$vxeMoney'
                },
                formula: '({shzywfpAmount}+{shdfwfpAmount})'
              }
            ]
          },
          {
            title: '进度',
            width: 100,
            align: 'right',
            children: [
              {
                title: '中央安排',
                field: 'shzyjd',
                width: 100,
                align: 'right',
                cellRender: { name: '$vxeRatio' },
                formula: $formula('budgetReleaseRegion.shzyjd')
                // formula: '({amountSjfpbjZyap}+{amountSjfpxjZyap})/{amountSjysZyap}'
              },
              {
                title: '地方安排',
                field: 'shdfjd',
                width: 100,
                align: 'right',
                cellRender: { name: '$vxeRatio' },
                formula: $formula('budgetReleaseRegion.shdfjd')
                // formula: '({amountSjfpbjDfap}+{amountSjfpxjDfap})/{amountSjysDfap}'
              },
              {
                title: '总进度',
                field: 'shajd',
                width: 100,
                align: 'right',
                cellRender: {
                  name: '$vxeRatio'
                },
                formula: $formula('budgetReleaseRegion.shajd')
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
            title: '预算金额',
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
                field: 'xaAmount',
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
            title: '整合资金情况',
            width: 100,
            align: 'center',
            children: [
              {
                title: '整合金额',
                width: 100,
                align: 'right',
                children: [
                  {
                    title: '中央安排',
                    field: 'xqzyapAmount',
                    width: 100,
                    align: 'right',
                    cellRender: { name: '$vxeMoney' }
                  },
                  {
                    title: '地方安排',
                    field: 'xqdfapAmount',
                    width: 100,
                    align: 'right',
                    cellRender: { name: '$vxeMoney' }
                  },
                  {
                    title: '总金额',
                    field: 'snallAmount3',
                    width: 100,
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
                width: 100,
                align: 'right',
                children: [
                  {
                    title: '中央安排',
                    field: 'xhzyapAmount',
                    width: 100,
                    align: 'right',
                    cellRender: { name: '$vxeMoney' },
                    formula: '({xqzyapAmount}+{amountXjysZyap})'
                  },
                  {
                    title: '地方安排',
                    field: 'xhdfapAmount',
                    width: 100,
                    align: 'right',
                    cellRender: { name: '$vxeMoney' },
                    formula: '({xqdfapAmount}+{amountXjysDfap})'
                  },
                  {
                    title: '总金额',
                    field: 'xhaAmount',
                    width: 100,
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
            width: 100,
            align: 'right',
            children: [
              {
                title: '中央安排',
                field: 'amountXjzybjfp',
                width: 100,
                align: 'right',
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '地方安排',
                field: 'amountXjdfbjfp',
                width: 100,
                align: 'right',
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '总金额',
                field: 'amountXjfpAll',
                width: 100,
                align: 'right',
                cellRender: {
                  name: '$vxeMoney'
                },
                formula: '({amountXjzybjfp}+{amountXjdfbjfp})'
              }
            ]
          },
          {
            title: '未分配',
            width: 100,
            align: 'right',
            children: [
              {
                title: '中央安排',
                field: 'amountXjfpxjZyap',
                width: 100,
                align: 'right',
                cellRender: { name: '$vxeMoney' },
                formula: '({amountXjzydf}-{amountXjzybjfp})'
              },
              {
                title: '地方安排',
                field: 'amountXjfpxjDfap',
                width: 100,
                align: 'right',
                cellRender: { name: '$vxeMoney' },
                formula: '({amountXjdfdf}-{amountXjdfbjfp})'
              },
              {
                title: '总金额',
                field: 'xwfpaAmount',
                width: 100,
                align: 'right',
                cellRender: {
                  name: '$vxeMoney'
                },
                formula: '({amountXjfpxjZyap}+{amountXjfpxjDfap})'
              }
            ]
          },
          {
            title: '进度',
            width: 100,
            align: 'right',
            children: [
              {
                title: '中央安排',
                field: 'xzyjd',
                width: 100,
                align: 'right',
                cellRender: { name: '$vxeRatio' },
                formula: $formula('budgetReleaseRegion.xzyjd')
              },
              {
                title: '地方安排',
                field: 'xdfjd',
                width: 100,
                align: 'right',
                cellRender: { name: '$vxeRatio' },
                formula: $formula('budgetReleaseRegion.xdfjd')
              },
              {
                title: '总进度',
                field: 'xajd',
                width: 100,
                align: 'right',
                cellRender: {
                  name: '$vxeRatio'
                },
                formula: $formula('budgetReleaseRegion.xajd')
              }
            ]
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
        title: '全市',
        width: 150,
        align: 'center',
        children: [
          {
            title: '中央安排',
            field: 'amountZjzl',
            width: 150,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '地方安排',
            field: 'amountZjzc',
            width: 150,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '总金额',
            field: 'aAmount',
            width: 150,
            align: 'right',
            cellRender: {
              name: '$vxeMoney'
            },
            formula: '({amountZjzl}+{amountZjzc})'
          }
        ]
      },
      {
        title: '市级',
        width: 150,
        align: 'center',
        children: [
          {
            title: '预算金额',
            width: 150,
            align: 'right',
            children: [
              {
                title: '中央安排',
                field: 'amountSnjzyxd',
                width: 150,
                align: 'right',
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '地方安排',
                field: 'amountSnjdfdf',
                width: 150,
                align: 'right',
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '总金额',
                field: 'saAmount',
                width: 150,
                align: 'right',
                cellRender: {
                  name: '$vxeMoney'
                },
                formula: '({amountSnjzyxd}+{amountSnjdfdf})'
              }
            ]
          },
          {
            title: '整合资金情况',
            width: 150,
            align: 'center',
            children: [
              {
                title: '整合金额',
                width: 150,
                align: 'right',
                children: [
                  {
                    title: '中央安排',
                    field: 'sqzyapAmount',
                    width: 150,
                    align: 'right',
                    cellRender: { name: '$vxeMoney' }
                  },
                  {
                    title: '地方安排',
                    field: 'sqdfapAmount',
                    width: 150,
                    align: 'right',
                    cellRender: { name: '$vxeMoney' }
                  },
                  {
                    title: '总金额',
                    field: 'sqaAmount',
                    width: 150,
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
                width: 150,
                align: 'right',
                children: [
                  {
                    title: '中央安排',
                    field: 'shzyapAmount',
                    width: 150,
                    align: 'right',
                    cellRender: { name: '$vxeMoney' },
                    formula: '({sqzyapAmount}+{amountSnjysZyap})'
                  },
                  {
                    title: '地方安排',
                    field: 'amountSnjysDfap11',
                    width: 150,
                    align: 'right',
                    cellRender: { name: '$vxeMoney' },
                    formula: '({sqdfapAmount}+{amountSnjysDfap})'
                  },
                  {
                    title: '总金额',
                    field: 'shaAmount',
                    width: 150,
                    align: 'right',
                    cellRender: {
                      name: '$vxeMoney'
                    },
                    formula: '({shzyapAmount}+{amountSnjysDfap})'
                  }
                ]
              }
            ]
          },
          {
            title: '分配本级',
            width: 150,
            align: 'right',
            children: [
              {
                title: '中央安排',
                field: 'amountSnjzybjfp',
                width: 150,
                align: 'right',
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '地方安排',
                field: 'amountSnjdfbjfp',
                width: 150,
                align: 'right',
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '总金额',
                field: 'amountSnjfpAll',
                width: 150,
                align: 'right',
                cellRender: {
                  name: '$vxeMoney'
                },
                formula: '({amountSnjzybjfp}+{amountSnjdfbjfp})'
              }
            ]
          },
          {
            title: '分配市县',
            width: 150,
            align: 'right',
            children: [
              {
                title: '中央安排',
                field: 'amountSnjzyxjfp',
                width: 150,
                align: 'right',
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '地方安排',
                field: 'amountSnjdfxjfp',
                width: 150,
                align: 'right',
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '总金额',
                field: 'ssxfpaAmount',
                width: 150,
                align: 'right',
                cellRender: {
                  name: '$vxeMoney'
                },
                formula: '({amountSnjzyxjfp}+{amountSnjdfxjfp})'
              }
            ]
          },
          {
            title: '未分配',
            width: 150,
            align: 'right',
            children: [
              {
                title: '中央安排',
                field: 'szywfpAmount',
                width: 150,
                align: 'right',
                cellRender: { name: '$vxeMoney' },
                formula: $formula('budgetReleaseRegion.szywfpAmount')// 同分地区的未分配计算
              },
              {
                title: '地方安排',
                field: 'sdfwfpAmount',
                width: 150,
                align: 'right',
                cellRender: { name: '$vxeMoney' },
                formula: $formula('budgetReleaseRegion.sdfwfpAmount')// 同分地区的未分配计算
              },
              {
                title: '总金额',
                field: 'swfpaAmount',
                width: 150,
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
            width: 150,
            align: 'right',
            children: [
              {
                title: '中央安排',
                field: 'szyjd',
                width: 150,
                align: 'right',
                cellRender: { name: '$vxeRatio' },
                formula: '(({amountSnjzyxd}-0==0)?0:({amountSnjzybjfp}+{amountSnjzyxjfp})*100/{amountSnjzyxd})'
                // formula: '({amountSnjfpbjZyap}+{amountSnjfpxjZyap})/{amountSnjysZyap}'
              },
              {
                title: '地方安排',
                field: 'sdfjd',
                width: 150,
                align: 'right',
                cellRender: { name: '$vxeRatio' },
                formula: '(({amountSnjdfdf}-0==0)?0:({amountSnjdfbjfp}+{amountSnjdfxjfp})*100/{amountSnjdfdf})'
                // formula: '({amountSnjfpbjDfap}{amountSnjfpxjDfap})/{amountSnjysDfap}'
              },
              {
                title: '总进度',
                field: 'sajd',
                width: 150,
                align: 'right',
                cellRender: {
                  name: '$vxeRatio'
                },
                formula: '({saAmount}-0==0?0:({amountSnjfpAll}+{ssxfpaAmount})/{saAmount})*100'
              }
            ]
          }
        ]
      },
      {
        title: '区级',
        width: 150,
        align: 'center',
        children: [
          {
            title: '预算金额',
            width: 150,
            align: 'right',
            children: [
              {
                title: '中央安排',
                field: 'amountXjzydf',
                width: 150,
                align: 'right',
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '地方安排',
                field: 'amountXjdfdf',
                width: 150,
                align: 'right',
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '总金额',
                field: 'xaAmount',
                width: 150,
                align: 'right',
                cellRender: {
                  name: '$vxeMoney'
                },
                formula: '({amountXjzydf}+{amountXjdfdf})'
              }
            ]
          },
          {
            title: '整合资金情况',
            width: 150,
            align: 'center',
            children: [
              {
                title: '整合金额',
                width: 150,
                align: 'right',
                children: [
                  {
                    title: '中央安排',
                    field: 'xqzyapAmount',
                    width: 150,
                    align: 'right',
                    cellRender: { name: '$vxeMoney' }
                  },
                  {
                    title: '地方安排',
                    field: 'xqdfapAmount',
                    width: 150,
                    align: 'right',
                    cellRender: { name: '$vxeMoney' }
                  },
                  {
                    title: '总金额',
                    field: 'snallAmount3',
                    width: 150,
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
                width: 150,
                align: 'right',
                children: [
                  {
                    title: '中央安排',
                    field: 'xhzyapAmount',
                    width: 150,
                    align: 'right',
                    cellRender: { name: '$vxeMoney' },
                    formula: '({xqzyapAmount}+{amountXjysZyap})'
                  },
                  {
                    title: '地方安排',
                    field: 'xhdfapAmount',
                    width: 150,
                    align: 'right',
                    cellRender: { name: '$vxeMoney' },
                    formula: '({xqdfapAmount}+{amountXjysDfap})'
                  },
                  {
                    title: '总金额',
                    field: 'xhaAmount',
                    width: 150,
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
            width: 150,
            align: 'right',
            children: [
              {
                title: '中央安排',
                field: 'amountXjzybjfp',
                width: 150,
                align: 'right',
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '地方安排',
                field: 'amountXjdfbjfp',
                width: 150,
                align: 'right',
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '总金额',
                field: 'amountXjfpAll',
                width: 150,
                align: 'right',
                cellRender: {
                  name: '$vxeMoney'
                },
                formula: '({amountXjzybjfp}+{amountXjdfbjfp})'
              }
            ]
          },
          {
            title: '未分配',
            width: 150,
            align: 'right',
            children: [
              {
                title: '中央安排',
                field: 'amountXjfpxjZyap',
                width: 150,
                align: 'right',
                cellRender: { name: '$vxeMoney' },
                formula: '({amountXjzydf}-{amountXjzybjfp})'
              },
              {
                title: '地方安排',
                field: 'amountXjfpxjDfap',
                width: 150,
                align: 'right',
                cellRender: { name: '$vxeMoney' },
                formula: '({amountXjdfdf}-{amountXjdfbjfp})'
              },
              {
                title: '总金额',
                field: 'xwfpaAmount',
                width: 150,
                align: 'right',
                cellRender: {
                  name: '$vxeMoney'
                },
                formula: '({amountXjfpxjZyap}+{amountXjfpxjDfap})'
              }
            ]
          },
          {
            title: '进度',
            width: 150,
            align: 'right',
            children: [
              {
                title: '中央安排',
                field: 'xzyjd',
                width: 150,
                align: 'right',
                cellRender: { name: '$vxeRatio' },
                // formula: '({amountXjfpZyap}/{amountXjysZyap})'
                formula: '(({amountXjzydf}-0==0)?0:({amountXjzybjfp})*100/{amountXjzydf})'
                // formatter: ({ row }) => {
                //   return row.amountXjfpZyap / row.amountXjysZyap
                // }
              },
              {
                title: '地方安排',
                field: 'xdfjd',
                width: 150,
                align: 'right',
                cellRender: { name: '$vxeRatio' },
                // formula: '({amountXjfpDfap}/{amountXjysDfap})'
                formula: '(({amountXjdfdf}-0==0)?0:({amountXjdfbjfp})*100/{amountXjdfdf})'
                // formatter: ({ row }) => {
                //   return row.amountXjfpDfap / row.amountXjysDfap
                // }
              },
              {
                title: '总进度',
                field: 'xajd',
                width: 150,
                align: 'right',
                cellRender: {
                  name: '$vxeRatio'
                },
                formula: '({xaAmount}-0==0?0:{amountXjfpAll}/{xaAmount})*100'
                // formatter: ({ row }) => {
                //   return row.xzyjd / 2 + row.xdfjd / 2
                // }
              }
            ]
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
      // {
      //   title: '业务年度',
      //   field: 'fiscalYear',
      //   width: '8',
      //   align: 'left',
      //   formula: '',
      //   name: '$vxeSelect',
      //   visible: !store.getters.isSx,
      //   itemRender: {
      //     name: '$vxeSelect',
      //     options: [
      //       { value: '2022', label: '2022年' },
      //       { value: '2023', label: '2023年' }
      //     ],
      //     defaultValue: store.state?.userInfo?.year,
      //     props: {
      //       clearable: true,
      //       placeholder: '业务年度'
      //     }
      //   }
      // },
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
        width: 200,
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
      fiscalYear: store.state?.userInfo?.year,
      proCodes: '',
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
              title: '中央安排',
              // field: 'amountZjzl',
              field: 'amountZyxdbhxj',
              width: 100,
              align: 'right',
              cellRender: { name: '$vxeMoney' }
            },
            {
              title: '地方安排',
              // field: 'amountZjzc',
              field: 'amountQsdfbhxj',
              width: 100,
              align: 'right',
              cellRender: { name: '$vxeMoney' }
            },
            {
              title: '总金额',
              field: 'aAmount',
              width: 100,
              align: 'right',
              cellRender: {
                name: '$vxeMoney'
              },
              // formula: '({amountZjzl}+{amountZjzc})'
              formula: '({amountZyxdbhxj}+{amountQsdfbhxj})'
            }
          ]
        },
        {
          title: '省级',
          width: 100,
          align: 'center',
          children: [
            {
              title: '预算金额',
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
                  field: 'saAmount',
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
              title: '整合资金情况',
              width: 100,
              align: 'center',
              children: [
                {
                  title: '整合金额',
                  width: 100,
                  align: 'right',
                  children: [
                    {
                      title: '中央安排',
                      field: 'sqzyapAmount',
                      width: 100,
                      align: 'right',
                      cellRender: { name: '$vxeMoney' }
                    },
                    {
                      title: '地方安排',
                      field: 'sqdfapAmount',
                      width: 100,
                      align: 'right',
                      cellRender: { name: '$vxeMoney' }
                    },
                    {
                      title: '总金额',
                      field: 'sqaAmount',
                      width: 100,
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
                  width: 100,
                  align: 'right',
                  children: [
                    {
                      title: '中央安排',
                      field: 'shzyapAmount',
                      width: 100,
                      align: 'right',
                      cellRender: { name: '$vxeMoney' },
                      formula: '({sqzyapAmount}+{amountSnjzyxd})'
                    },
                    {
                      title: '地方安排',
                      field: 'amountSnjysDfap11',
                      width: 100,
                      align: 'right',
                      cellRender: { name: '$vxeMoney' },
                      formula: '({sqdfapAmount}+{amountSnjdfdf})'
                    },
                    {
                      title: '总金额',
                      field: 'shaAmount',
                      width: 100,
                      align: 'right',
                      cellRender: {
                        name: '$vxeMoney'
                      },
                      formula: '({shzyapAmount}+{amountSnjysDfap11})'
                    }
                  ]
                }
              ]
            },
            {
              title: '分配本级',
              width: 100,
              align: 'right',
              children: [
                {
                  title: '中央安排',
                  field: 'amountSnjzybjfp',
                  width: 100,
                  align: 'right',
                  cellRender: { name: '$vxeMoney' }
                },
                {
                  title: '地方安排',
                  field: 'amountSnjdfbjfp',
                  width: 100,
                  align: 'right',
                  cellRender: { name: '$vxeMoney' }
                },
                {
                  title: '总金额',
                  field: 'amountSnjfpAll',
                  width: 100,
                  align: 'right',
                  cellRender: {
                    name: '$vxeMoney'
                  },
                  formula: '({amountSnjzybjfp}+{amountSnjdfbjfp})'
                }
              ]
            },
            {
              title: '分配市县',
              width: 100,
              align: 'right',
              children: [
                {
                  title: '中央安排',
                  field: 'amountSnjzyxjfp',
                  width: 100,
                  align: 'right',
                  cellRender: { name: '$vxeMoney' }
                },
                {
                  title: '地方安排',
                  field: 'amountSnjdfxjfp',
                  width: 100,
                  align: 'right',
                  cellRender: { name: '$vxeMoney' }
                },
                {
                  title: '总金额',
                  field: 'ssxfpaAmount',
                  width: 100,
                  align: 'right',
                  cellRender: {
                    name: '$vxeMoney'
                  },
                  formula: '({amountSnjzyxjfp}+{amountSnjdfxjfp})'
                }
              ]
            },
            {
              title: '未分配',
              width: 100,
              align: 'right',
              children: [
                {
                  title: '中央安排',
                  field: 'szywfpAmount',
                  width: 100,
                  align: 'right',
                  cellRender: { name: '$vxeMoney' },
                  // formula: '({amountSnjzyxd}-{amountSnjzybjfp})'
                  formula: '({amountSnjzyxd}-{amountSnjzybjfp}-{amountSnjzyxjfp})'
                },
                {
                  title: '地方安排',
                  field: 'sdfwfpAmount',
                  width: 100,
                  align: 'right',
                  cellRender: { name: '$vxeMoney' },
                  formula: '({amountSnjdfdf}-{amountSnjdfbjfp})'
                },
                {
                  title: '总金额',
                  field: 'swfpaAmount',
                  width: 100,
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
              width: 100,
              align: 'right',
              children: [
                {
                  title: '中央安排',
                  field: 'szyjd',
                  width: 100,
                  align: 'right',
                  cellRender: { name: '$vxeRatio' },
                  formula: '(({amountSnjzyxd}-0==0)?0:({amountSnjzybjfp}+{amountSnjzyxjfp})*100/{amountSnjzyxd})'
                  // formula: '({amountSnjfpbjZyap}+{amountSnjfpxjZyap})/{amountSnjysZyap}'
                },
                {
                  title: '地方安排',
                  field: 'sdfjd',
                  width: 100,
                  align: 'right',
                  cellRender: { name: '$vxeRatio' },
                  formula: '(({amountSnjdfdf}-0==0)?0:({amountSnjdfbjfp}+{amountSnjdfxjfp})*100/{amountSnjdfdf})'
                  // formula: '({amountSnjfpbjDfap}{amountSnjfpxjDfap})/{amountSnjysDfap}'
                },
                {
                  title: '总进度',
                  field: 'sajd',
                  width: 100,
                  align: 'right',
                  cellRender: {
                    name: '$vxeRatio'
                  },
                  formula: '({saAmount}-0==0?0:({amountSnjfpAll}+{ssxfpaAmount})/{saAmount})*100'
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
              title: '预算金额',
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
                  field: 'shiaAmount',
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
              title: '整合资金情况',
              width: 100,
              align: 'center',
              children: [
                {
                  title: '整合金额',
                  width: 100,
                  align: 'right',
                  children: [
                    {
                      title: '中央安排',
                      field: 'shqzyapAmount',
                      width: 100,
                      align: 'right',
                      cellRender: { name: '$vxeMoney' }
                    },
                    {
                      title: '地方安排',
                      field: 'shqdfapAmount',
                      width: 100,
                      align: 'right',
                      cellRender: { name: '$vxeMoney' }
                    },
                    {
                      title: '总金额',
                      field: 'shqaAmount',
                      width: 100,
                      align: 'right',
                      cellRender: {
                        name: '$vxeMoney'
                      },
                      formula: '({shqzyapAmount}+{shqdfapAmount})'
                    }
                  ]
                },
                {
                  title: '整合后金额',
                  width: 100,
                  align: 'right',
                  children: [
                    {
                      title: '中央安排',
                      field: 'shhzyapAmount',
                      width: 100,
                      align: 'right',
                      cellRender: { name: '$vxeMoney' },
                      formula: '({shqzyapAmount}+{amountSjzydf})'
                    },
                    {
                      title: '地方安排',
                      field: 'shhdfapAmount',
                      width: 100,
                      align: 'right',
                      cellRender: { name: '$vxeMoney' },
                      formula: '({shqdfapAmount}+{amountSjdfdf})'
                    },
                    {
                      title: '总金额',
                      field: 'shhaAmount',
                      width: 100,
                      align: 'right',
                      cellRender: {
                        name: '$vxeMoney'
                      },
                      formula: '({shhzyapAmount}+{shhdfapAmount})'
                    }
                  ]
                }
              ]
            },
            {
              title: '分配本级',
              width: 100,
              align: 'right',
              children: [
                {
                  title: '中央安排',
                  field: 'amountSjzybjfp',
                  width: 100,
                  align: 'right',
                  cellRender: { name: '$vxeMoney' }
                },
                {
                  title: '地方安排',
                  field: 'amountSjdfbjfp',
                  width: 100,
                  align: 'right',
                  cellRender: { name: '$vxeMoney' }
                },
                {
                  title: '总金额',
                  field: 'amountSjfpbjAll',
                  width: 100,
                  align: 'right',
                  cellRender: {
                    name: '$vxeMoney'
                  },
                  formula: '({amountSjzybjfp}+{amountSjdfbjfp})'
                }
              ]
            },
            {
              title: '分配县级',
              width: 100,
              align: 'right',
              children: [
                {
                  title: '中央安排',
                  field: 'amountSjzyxjfp',
                  width: 100,
                  align: 'right',
                  cellRender: { name: '$vxeMoney' }
                },
                {
                  title: '地方安排',
                  field: 'amountSjdfxjfp',
                  width: 100,
                  align: 'right',
                  cellRender: { name: '$vxeMoney' }
                },
                {
                  title: '总金额',
                  field: 'shxjfpaAmount',
                  width: 100,
                  align: 'right',
                  cellRender: {
                    name: '$vxeMoney'
                  },
                  formula: '({amountSjzyxjfp}+{amountSjdfxjfp})'
                }
              ]
            },
            {
              title: '未分配',
              width: 100,
              align: 'right',
              children: [
                {
                  title: '中央安排',
                  field: 'shzywfpAmount',
                  width: 100,
                  align: 'right',
                  cellRender: { name: '$vxeMoney' },
                  formula: '{amountSjzydf}-{amountSjzybjfp}'
                },
                {
                  title: '地方安排',
                  field: 'shdfwfpAmount',
                  width: 100,
                  align: 'right',
                  cellRender: { name: '$vxeMoney' },
                  formula: '{amountSjdfdf}-{amountSjdfbjfp}'
                },
                {
                  title: '总金额',
                  field: 'shwfpaAmount',
                  width: 100,
                  align: 'right',
                  cellRender: {
                    name: '$vxeMoney'
                  },
                  formula: '({shzywfpAmount}+{shdfwfpAmount})'
                }
              ]
            },
            {
              title: '进度',
              width: 100,
              align: 'right',
              children: [
                {
                  title: '中央安排',
                  field: 'shzyjd',
                  width: 100,
                  align: 'right',
                  cellRender: { name: '$vxeRatio' },
                  formula: '(({amountSjzydf}-0==0)?0:({amountSjzybjfp}+{amountSjzyxjfp})*100/{amountSjzydf})'
                  // formula: '({amountSjfpbjZyap}+{amountSjfpxjZyap})/{amountSjysZyap}'
                },
                {
                  title: '地方安排',
                  field: 'shdfjd',
                  width: 100,
                  align: 'right',
                  cellRender: { name: '$vxeRatio' },
                  formula: '(({amountSjdfdf}-0==0)?0:({amountSjdfbjfp}+{amountSjdfxjfp})*100/{amountSjdfdf})'
                  // formula: '({amountSjfpbjDfap}+{amountSjfpxjDfap})/{amountSjysDfap}'
                },
                {
                  title: '总进度',
                  field: 'shajd',
                  width: 100,
                  align: 'right',
                  cellRender: {
                    name: '$vxeRatio'
                  },
                  formula: '({shiaAmount}-0)==0?0:({amountSjfpbjAll}+{shxjfpaAmount})/{shiaAmount}*100'
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
              title: '预算金额',
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
                  field: 'xaAmount',
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
              title: '整合资金情况',
              width: 100,
              align: 'center',
              children: [
                {
                  title: '整合金额',
                  width: 100,
                  align: 'right',
                  children: [
                    {
                      title: '中央安排',
                      field: 'xqzyapAmount',
                      width: 100,
                      align: 'right',
                      cellRender: { name: '$vxeMoney' }
                    },
                    {
                      title: '地方安排',
                      field: 'xqdfapAmount',
                      width: 100,
                      align: 'right',
                      cellRender: { name: '$vxeMoney' }
                    },
                    {
                      title: '总金额',
                      field: 'snallAmount3',
                      width: 100,
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
                  width: 100,
                  align: 'right',
                  children: [
                    {
                      title: '中央安排',
                      field: 'xhzyapAmount',
                      width: 100,
                      align: 'right',
                      cellRender: { name: '$vxeMoney' },
                      formula: '({xqzyapAmount}+{amountXjzydf})'
                    },
                    {
                      title: '地方安排',
                      field: 'xhdfapAmount',
                      width: 100,
                      align: 'right',
                      cellRender: { name: '$vxeMoney' },
                      formula: '({xqdfapAmount}+{amountXjdfdf})'
                    },
                    {
                      title: '总金额',
                      field: 'xhaAmount',
                      width: 100,
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
              width: 100,
              align: 'right',
              children: [
                {
                  title: '中央安排',
                  field: 'amountXjzybjfp',
                  width: 100,
                  align: 'right',
                  cellRender: { name: '$vxeMoney' }
                },
                {
                  title: '地方安排',
                  field: 'amountXjdfbjfp',
                  width: 100,
                  align: 'right',
                  cellRender: { name: '$vxeMoney' }
                },
                {
                  title: '总金额',
                  field: 'amountXjfpAll',
                  width: 100,
                  align: 'right',
                  cellRender: {
                    name: '$vxeMoney'
                  },
                  formula: '({amountXjzybjfp}+{amountXjdfbjfp})'
                }
              ]
            },
            {
              title: '未分配',
              width: 100,
              align: 'right',
              children: [
                {
                  title: '中央安排',
                  field: 'amountXjfpxjZyap',
                  width: 100,
                  align: 'right',
                  cellRender: { name: '$vxeMoney' },
                  formula: '({amountXjzydf}-{amountXjzybjfp})'
                },
                {
                  title: '地方安排',
                  field: 'amountXjfpxjDfap',
                  width: 100,
                  align: 'right',
                  cellRender: { name: '$vxeMoney' },
                  formula: '({amountXjdfdf}-{amountXjdfbjfp})'
                },
                {
                  title: '总金额',
                  field: 'xwfpaAmount',
                  width: 100,
                  align: 'right',
                  cellRender: {
                    name: '$vxeMoney'
                  },
                  formula: '({amountXjfpxjZyap}+{amountXjfpxjDfap})'
                }
              ]
            },
            {
              title: '进度',
              width: 100,
              align: 'right',
              children: [
                {
                  title: '中央安排',
                  field: 'xzyjd',
                  width: 100,
                  align: 'right',
                  cellRender: { name: '$vxeRatio' },
                  // formula: '({amountXjfpZyap}/{amountXjysZyap})'
                  formula: '(({amountXjzydf}-0==0)?0:({amountXjzybjfp})*100/{amountXjzydf})'
                  // formatter: ({ row }) => {
                  //   return row.amountXjfpZyap / row.amountXjysZyap
                  // }
                },
                {
                  title: '地方安排',
                  field: 'xdfjd',
                  width: 100,
                  align: 'right',
                  cellRender: { name: '$vxeRatio' },
                  // formula: '({amountXjfpDfap}/{amountXjysDfap})'
                  formula: '(({amountXjdfdf}-0==0)?0:({amountXjdfbjfp})*100/{amountXjdfdf})'
                  // formatter: ({ row }) => {
                  //   return row.amountXjfpDfap / row.amountXjysDfap
                  // }
                },
                {
                  title: '总进度',
                  field: 'xajd',
                  width: 100,
                  align: 'right',
                  cellRender: {
                    name: '$vxeRatio'
                  },
                  formula: '({xaAmount}-0==0?0:{amountXjfpAll}/{xaAmount})*100'
                  // formatter: ({ row }) => {
                  //   return row.xzyjd / 2 + row.xdfjd / 2
                  // }
                }
              ]
            }
          ]
        },
        {
          title: '镇级',
          width: 150,
          align: 'center',
          children: [
            {
              title: '预算金额',
              width: 150,
              align: 'right',
              children: [
                {
                  title: '中央安排',
                  field: 'amountZjysZyap',
                  width: 150,
                  align: 'right',
                  sortable: true,
                  cellRender: { name: '$vxeMoney' }
                },
                {
                  title: '地方安排',
                  field: 'amountZjysDfap',
                  width: 150,
                  align: 'right',
                  sortable: true,
                  cellRender: { name: '$vxeMoney' }
                },
                {
                  title: '总金额',
                  field: 'zaAmount',
                  width: 150,
                  align: 'right',
                  sortable: true,
                  cellRender: {
                    name: '$vxeMoney'
                  },
                  formula: '({amountZjysZyap}+{amountZjysDfap})'
                }
              ]
            },
            {
              title: '整合资金情况',
              width: 150,
              align: 'center',
              children: [
                {
                  title: '整合金额',
                  width: 150,
                  align: 'right',
                  children: [
                    {
                      title: '中央安排',
                      field: 'zqzyapAmount',
                      width: 150,
                      align: 'right',
                      sortable: true,
                      cellRender: { name: '$vxeMoney' }
                    },
                    {
                      title: '地方安排',
                      field: 'zqdfapAmount',
                      width: 150,
                      align: 'right',
                      sortable: true,
                      cellRender: { name: '$vxeMoney' }
                    },
                    {
                      title: '总金额',
                      field: 'znallAmount3',
                      width: 150,
                      align: 'right',
                      sortable: true,
                      cellRender: { name: '$vxeMoney' },
                      formula: '({zqzyapAmount}+{zqdfapAmount})'
                    }
                  ]
                },
                {
                  title: '整合后金额',
                  width: 150,
                  align: 'right',
                  children: [
                    {
                      title: '中央安排',
                      field: 'zhzyapAmount',
                      width: 150,
                      align: 'right',
                      sortable: true,
                      cellRender: { name: '$vxeMoney' },
                      formula: '({zqzyapAmount}+{amountZjysZyap})'
                    },
                    {
                      title: '地方安排',
                      field: 'zhdfapAmount',
                      width: 150,
                      align: 'right',
                      sortable: true,
                      cellRender: { name: '$vxeMoney' },
                      formula: '({zqdfapAmount}+{amountZjysDfap})'
                    },
                    {
                      title: '总金额',
                      field: 'zhaAmount',
                      width: 150,
                      align: 'right',
                      sortable: true,
                      cellRender: { name: '$vxeMoney' },
                      formula: '({zhzyapAmount}+{zhdfapAmount})'
                    }
                  ]
                }
              ]
            },
            {
              title: '已分配',
              width: 150,
              align: 'right',
              children: [
                {
                  title: '中央安排',
                  field: 'amountZjfpZyap',
                  width: 150,
                  align: 'right',
                  sortable: true,
                  cellRender: { name: '$vxeMoney' }
                },
                {
                  title: '地方安排',
                  field: 'amountZjfpDfap',
                  width: 150,
                  align: 'right',
                  sortable: true,
                  cellRender: { name: '$vxeMoney' }
                },
                {
                  title: '总金额',
                  field: 'zyfpaAmount',
                  width: 150,
                  align: 'right',
                  sortable: true,
                  cellRender: {
                    name: '$vxeMoney'
                  },
                  formula: '({amountZjfpZyap}+{amountZjfpDfap})'
                }
              ]
            },
            {
              title: '未分配',
              width: 150,
              align: 'right',
              children: [
                {
                  title: '中央安排',
                  field: 'amountZjwfpZyap',
                  width: 150,
                  align: 'right',
                  sortable: true,
                  cellRender: { name: '$vxeMoney' },
                  formula: '({amountZjysZyap}-{amountZjfpZyap})'
                },
                {
                  title: '地方安排',
                  field: 'amountZjfpxjDfap',
                  width: 150,
                  align: 'right',
                  sortable: true,
                  cellRender: { name: '$vxeMoney' },
                  formula: '({amountZjysDfap}-{amountZjfpDfap})'
                },
                {
                  title: '总金额',
                  field: 'zwfpaAmount',
                  width: 150,
                  align: 'right',
                  sortable: true,
                  cellRender: {
                    name: '$vxeMoney'
                  },
                  formula: '({amountZjwfpZyap}+{amountZjfpxjDfap})'
                }
              ]
            },
            {
              title: '进度',
              width: 150,
              align: 'right',
              children: [
                {
                  title: '中央安排',
                  field: 'zzyjd',
                  width: 150,
                  align: 'right',
                  sortable: true,
                  cellRender: { name: '$vxeRatio' },
                  // formula: '({amountXjfpZyap}/{amountXjysZyap})'
                  formula: '(({amountZjfpZyap}+{amountZjwfpZyap}-0==0)?0:({amountZjfpZyap})*100/({amountZjfpZyap}+{amountZjwfpZyap}))'
                  // formatter: ({ row }) => {
                  //   return row.amountXjfpZyap / row.amountXjysZyap
                  // }
                },
                {
                  title: '地方安排',
                  field: 'zdfjd',
                  width: 150,
                  align: 'right',
                  sortable: true,
                  cellRender: { name: '$vxeRatio' },
                  // formula: '({amountXjfpDfap}/{amountXjysDfap})'
                  formula: '(({amountZjysDfap}-0==0)?0:({amountZjfpDfap})*100/{amountZjysDfap})'
                  // formatter: ({ row }) => {
                  //   return row.amountXjfpDfap / row.amountXjysDfap
                  // }
                },
                {
                  title: '总进度',
                  field: 'zajd',
                  width: 150,
                  align: 'right',
                  sortable: true,
                  cellRender: {
                    name: '$vxeRatio'
                  },
                  formula: '({zzyjd})'
                  // formatter: ({ row }) => {
                  //   return row.xzyjd / 2 + row.xdfjd / 2
                  // }
                }
              ]
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
