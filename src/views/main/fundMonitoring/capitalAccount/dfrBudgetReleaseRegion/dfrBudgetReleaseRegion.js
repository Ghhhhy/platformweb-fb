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
    //   name: '$vxeSelect',
    //   itemRender: {
    //     name: '$vxeInput',
    //     options: [
    //       // { value: '2020', label: '2020年' },
    //       { value: '2022', label: '2022年' },
    //       { value: '2023', label: '2023年' }
    //     ],
    //     props: {
    //       clearable: true,
    //       type: 'year',
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
    tableColumnsConfig: [
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
        width: 100,
        align: 'center',
        children: [
          {
            title: '中央安排',
            field: 'amountQszydf',
            width: 100,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '省级安排',
            field: 'amountQssnjdf',
            width: 100,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '市级安排',
            field: 'amountQssjdf',
            width: 100,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '县级安排',
            field: 'amountQsxjdf',
            width: 100,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '总资金',
            field: 'aAmount',
            width: 100,
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
                title: '省级安排',
                field: 'amountSnjsnjdf',
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
                formula: '({amountSnjzyxd}+{amountSnjsnjdf})'
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
                    title: '省级安排',
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
                    cellRender: { name: '$vxeMoney' }
                  },
                  {
                    title: '省级安排',
                    field: 'shdfapAmount',
                    width: 100,
                    align: 'right',
                    cellRender: { name: '$vxeMoney' }
                  },
                  {
                    title: '总金额',
                    field: 'shaAmount',
                    width: 100,
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
                title: '省级安排',
                field: 'amountSnjsnjbjfp',
                width: 100,
                align: 'right',
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '总金额',
                field: 'sbjfpaAmount',
                width: 100,
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
                title: '省级安排',
                field: 'amountSnjsnjxjfp',
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
                formula: '({amountSnjzyxjfp}+{amountSnjsnjxjfp})'
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
                formula: $formula('budgetReleaseRegion.szywfpAmount')// 同分地区的未分配计算
              },
              {
                title: '省级安排',
                field: 'sdfwfpAmount',
                width: 100,
                align: 'right',
                cellRender: { name: '$vxeMoney' },
                formula: $formula('budgetReleaseRegion.sdfwfpAmount')// 同分地区的未分配计算
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
                formula: $formula('dfrBudgetReleaseRegion.szyjd')
              },
              {
                title: '省级安排',
                field: 'sdfjd',
                width: 100,
                align: 'right',
                cellRender: { name: '$vxeRatio' },
                formula: $formula('dfrBudgetReleaseRegion.sdfjd')
              },
              {
                title: '总进度',
                field: 'sajd',
                width: 100,
                align: 'right',
                cellRender: {
                  name: '$vxeRatio'
                },
                formula: $formula('dfrBudgetReleaseRegion.sajd')
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
                title: '省级安排',
                field: 'amountSjsnjdf',
                width: 100,
                align: 'right',
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '市级安排',
                field: 'amountSjsjdf',
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
                formula: '({amountSjzydf}+{amountSjsnjdf}+{amountSjsjdf})'
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
                    title: '省级安排',
                    field: 'shqdfapAmount',
                    width: 100,
                    align: 'right',
                    cellRender: { name: '$vxeMoney' }
                  },
                  {
                    title: '市级安排',
                    field: 'sjzhsjapAmount',
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
                    formula: '({shqzyapAmount}+{shqdfapAmount}+{sjzhsjapAmount})'
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
                    cellRender: { name: '$vxeMoney' }
                  },
                  {
                    title: '省级安排',
                    field: 'shhdfapAmount',
                    width: 100,
                    align: 'right',
                    cellRender: { name: '$vxeMoney' }
                  },
                  {
                    title: '市级安排',
                    field: 'sjzhhsjapAmount',
                    width: 100,
                    align: 'right',
                    cellRender: { name: '$vxeMoney' }
                  },
                  {
                    title: '总金额',
                    field: 'shhaAmount',
                    width: 100,
                    align: 'right',
                    cellRender: {
                      name: '$vxeMoney'
                    },
                    formula: '({shhzyapAmount}+{shhdfapAmount}+{sjzhhsjapAmount})'
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
                title: '省级安排',
                field: 'amountSjsnjbjfp',
                width: 100,
                align: 'right',
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '市级安排',
                field: 'amountSjsjbjfp',
                width: 100,
                align: 'right',
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '总金额',
                field: 'shbjfpaAmount',
                width: 100,
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
                title: '省级安排',
                field: 'amountSjsnjxjfp',
                width: 100,
                align: 'right',
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '市级安排',
                field: 'amountSjsjxjfp',
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
                formula: '({amountSjzyxjfp}+{amountSjsnjxjfp}+{amountSjsjxjfp})'
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
                title: '省级安排',
                field: 'shdfwfpAmount',
                width: 100,
                align: 'right',
                cellRender: { name: '$vxeMoney' },
                formula: '{amountSjsnjdf}-{amountSjsnjbjfp}'
              },
              {
                title: '市级安排',
                field: 'shidfapAmount1',
                width: 100,
                align: 'right',
                cellRender: { name: '$vxeMoney' },
                formula: '{amountSjsjdf}-{amountSjsjbjfp} - {amountSjsjxjfp}'
              },
              {
                title: '总金额',
                field: 'shwfpaAmount',
                width: 100,
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
            width: 100,
            align: 'right',
            children: [
              {
                title: '中央安排',
                field: 'shzyjd',
                width: 100,
                align: 'right',
                cellRender: { name: '$vxeRatio' },
                formula: $formula('dfrBudgetReleaseRegion.shzyjd')
              },
              {
                title: '省级安排',
                field: 'shdfjd',
                width: 100,
                align: 'right',
                cellRender: { name: '$vxeRatio' },
                formula: $formula('dfrBudgetReleaseRegion.shdfjd')
              },
              {
                title: '市级安排',
                field: 'sjsjapjd',
                width: 100,
                align: 'right',
                cellRender: { name: '$vxeRatio' },
                formula: $formula('dfrBudgetReleaseRegion.sjsjapjd')
              },
              {
                title: '总进度',
                field: 'shajd',
                width: 100,
                align: 'right',
                cellRender: {
                  name: '$vxeRatio'
                },
                formula: $formula('dfrBudgetReleaseRegion.shajd')
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
                title: '省级安排',
                field: 'amountXjsnjfdf',
                width: 100,
                align: 'right',
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '市级安排',
                field: 'amountXjsjdf',
                width: 100,
                align: 'right',
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '县级安排',
                field: 'amountXjxjdf',
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
                formula: '({amountXjzydf}+{amountXjsnjfdf}+{amountXjsjdf}+{amountXjxjdf})'
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
                    title: '省级安排',
                    field: 'xqdfapAmount',
                    width: 100,
                    align: 'right',
                    cellRender: { name: '$vxeMoney' }
                  },
                  {
                    title: '市级安排',
                    field: 'xdfapzhAmount',
                    width: 100,
                    align: 'right',
                    cellRender: { name: '$vxeMoney' }
                  },
                  {
                    title: '县级安排',
                    field: 'xdfapzhAmount',
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
                    cellRender: { name: '$vxeMoney' }
                  },
                  {
                    title: '省级安排',
                    field: 'xhdfapAmount',
                    width: 100,
                    align: 'right',
                    cellRender: { name: '$vxeMoney' }
                  },
                  {
                    title: '市级安排',
                    field: 'xdfapzhhAmount',
                    width: 100,
                    align: 'right',
                    cellRender: { name: '$vxeMoney' }
                  },
                  {
                    title: '县级安排',
                    field: 'xdfapzhAmount',
                    width: 100,
                    align: 'right',
                    cellRender: { name: '$vxeMoney' }
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
                title: '省级安排',
                field: 'amountXjsnjbjfp',
                width: 100,
                align: 'right',
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '市级安排',
                field: 'amountXjsjbjfp',
                width: 100,
                align: 'right',
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '县级安排',
                field: 'amountXjxjbjfp',
                width: 100,
                align: 'right',
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '总金额',
                field: 'xyfpaAmount',
                width: 100,
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
            width: 100,
            align: 'right',
            children: [
              {
                title: '中央安排',
                field: 'xzywfpAmount',
                width: 100,
                align: 'right',
                cellRender: { name: '$vxeMoney' },
                formula: '({amountXjzydf}-{amountXjzybjfp})'
              },
              {
                title: '省级安排',
                field: 'xdfwfpAmount',
                width: 100,
                align: 'right',
                cellRender: { name: '$vxeMoney' },
                formula: '({amountXjsnjfdf} - {amountXjsnjbjfp})'
              },
              {
                title: '市级安排',
                field: 'xdfapAmount3',
                width: 100,
                align: 'right',
                cellRender: { name: '$vxeMoney' },
                formula: '({amountXjsjdf} - {amountXjsjbjfp})'
              },
              {
                title: '县级安排',
                field: 'xdfapAmount2',
                width: 100,
                align: 'right',
                cellRender: { name: '$vxeMoney' },
                formula: '({amountXjxjdf} - {amountXjxjbjfp})'
              },
              {
                title: '总金额',
                field: 'xwfpaAmount',
                width: 100,
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
            width: 100,
            align: 'right',
            children: [
              {
                title: '中央安排',
                field: 'xzyjd',
                width: 100,
                align: 'right',
                cellRender: { name: '$vxeRatio' },
                formula: $formula('dfrBudgetReleaseRegion.xzyjd')
              },
              {
                title: '省级安排',
                field: 'xdfjd',
                width: 100,
                align: 'right',
                cellRender: { name: '$vxeRatio' },
                formula: $formula('dfrBudgetReleaseRegion.xdfjd')
              },
              {
                title: '市级安排',
                field: 'xjsjapjd',
                width: 100,
                align: 'right',
                cellRender: { name: '$vxeRatio' },
                formula: $formula('dfrBudgetReleaseRegion.xjsjapjd')
              },
              {
                title: '县级安排',
                field: 'xjxjapjd',
                width: 100,
                align: 'right',
                cellRender: { name: '$vxeRatio' },
                formula: $formula('dfrBudgetReleaseRegion.xjxjapjd')
              },
              {
                title: '总进度',
                field: 'xajd',
                width: 100,
                align: 'right',
                cellRender: {
                  name: '$vxeRatio'
                },
                formula: $formula('dfrBudgetReleaseRegion.xajd')
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
            title: '市级安排',
            field: 'amountQssnjdf',
            width: 200,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '区级安排',
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
                field: 'amountSnjzyxd',
                width: 200,
                align: 'right',
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '市级安排',
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
                    title: '市级安排',
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
                    title: '市级安排',
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
                title: '市级安排',
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
            title: '分配区',
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
                title: '市级安排',
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
                formula: $formula('budgetReleaseRegion.szywfpAmount')// 同分地区的未分配计算
              },
              {
                title: '市级安排',
                field: 'sdfwfpAmount',
                width: 200,
                align: 'right',
                cellRender: { name: '$vxeMoney' },
                formula: $formula('budgetReleaseRegion.sdfwfpAmount')// 同分地区的未分配计算
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
                formula: '{amountSnjzyxd}-0==0?0:({amountSnjzybjfp}+{amountSnjsnjxjfp})/{amountSnjzyxd}*100'
              },
              {
                title: '市级安排',
                field: 'sdfjd',
                width: 200,
                align: 'right',
                cellRender: { name: '$vxeRatio' },
                formula: '{amountSnjsnjdf}-0==0?0:({amountSnjsnjbjfp}+{amountSnjsnjxjfp})/{amountSnjsnjdf}*100'
              },
              {
                title: '总进度',
                field: 'sajd',
                width: 200,
                align: 'right',
                cellRender: {
                  name: '$vxeRatio'
                },
                formula: '{saAmount}-0==0?0:({sbjfpaAmount}+{ssxfpaAmount})/{saAmount}*100'
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
                title: '市级安排',
                field: 'amountXjsnjfdf',
                width: 200,
                align: 'right',
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '区级安排',
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
                    title: '市级安排',
                    field: 'xqdfapAmount',
                    width: 200,
                    align: 'right',
                    cellRender: { name: '$vxeMoney' }
                  },
                  {
                    title: '区级安排',
                    field: 'xdfapzhAmount',
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
                    title: '市级安排',
                    field: 'xhdfapAmount',
                    width: 200,
                    align: 'right',
                    cellRender: { name: '$vxeMoney' }
                  },
                  {
                    title: '区级安排',
                    field: 'xdfapzhAmount',
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
                title: '市级安排',
                field: 'amountXjsnjbjfp',
                width: 200,
                align: 'right',
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '区级安排',
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
                title: '市级安排',
                field: 'xdfwfpAmount',
                width: 200,
                align: 'right',
                cellRender: { name: '$vxeMoney' },
                formula: '({amountXjsnjfdf} - {amountXjsnjbjfp})'
              },
              {
                title: '区级安排',
                field: 'xdfapAmount2',
                width: 200,
                align: 'right',
                cellRender: { name: '$vxeMoney' },
                formula: '({amountXjxjdf} - {amountXjxjbjfp})'
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
                formula: '{amountXjzydf}-0==0?0:{amountXjzybjfp}/{amountXjzydf}*100'
              },
              {
                title: '市级安排',
                field: 'xdfjd',
                width: 200,
                align: 'right',
                cellRender: { name: '$vxeRatio' },
                formula: '{amountXjsnjfdf}-0 == 0?0:{amountXjsnjbjfp}/{amountXjsnjfdf}*100'
              },
              {
                title: '区级安排',
                field: 'xjxjapjd',
                width: 200,
                align: 'right',
                cellRender: { name: '$vxeRatio' },
                formula: '{amountXjxjdf}-0 == 0?0:{amountXjxjbjfp}/{amountXjxjdf}*100'
              },
              {
                title: '总进度',
                field: 'xajd',
                width: 200,
                align: 'right',
                cellRender: {
                  name: '$vxeRatio'
                },
                formula: '{xaAmount}-0==0?0:{xyfpaAmount}/{xaAmount}*100'
              }
            ]
          }
        ]
      }
    ]
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
          width: 100,
          align: 'center',
          children: [
            {
              title: '中央安排',
              field: 'amountQszydf',
              width: 100,
              align: 'right',
              cellRender: { name: '$vxeMoney' }
            },
            {
              title: '省级安排',
              field: 'amountQssnjdf',
              width: 100,
              align: 'right',
              cellRender: { name: '$vxeMoney' }
            },
            {
              title: '市级安排',
              field: 'amountQssjdf',
              width: 100,
              align: 'right',
              cellRender: { name: '$vxeMoney' }
            },
            {
              title: '县级安排',
              field: 'amountQsxjdf',
              width: 100,
              align: 'right',
              cellRender: { name: '$vxeMoney' }
            },
            {
              title: '总资金',
              field: 'aAmount',
              width: 100,
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
                  title: '省级安排',
                  field: 'amountSnjsnjdf',
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
                  formula: '({amountSnjzyxd}+{amountSnjsnjdf})'
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
                      title: '省级安排',
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
                      cellRender: { name: '$vxeMoney' }
                    },
                    {
                      title: '省级安排',
                      field: 'shdfapAmount',
                      width: 100,
                      align: 'right',
                      cellRender: { name: '$vxeMoney' }
                    },
                    {
                      title: '总金额',
                      field: 'shaAmount',
                      width: 100,
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
                  title: '省级安排',
                  field: 'amountSnjsnjbjfp',
                  width: 100,
                  align: 'right',
                  cellRender: { name: '$vxeMoney' }
                },
                {
                  title: '总金额',
                  field: 'sbjfpaAmount',
                  width: 100,
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
                  title: '省级安排',
                  field: 'amountSnjsnjxjfp',
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
                  formula: '({amountSnjzyxjfp}+{amountSnjsnjxjfp})'
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
                  formula: '{amountSnjzyxd}-{amountSnjzybjfp}'
                },
                {
                  title: '省级安排',
                  field: 'sdfwfpAmount',
                  width: 100,
                  align: 'right',
                  cellRender: { name: '$vxeMoney' },
                  formula: '{amountSnjsnjdf} - {amountSnjsnjbjfp}'
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
                  formula: '{amountSnjzyxd}-0==0?0:({amountSnjzybjfp}+{amountSnjsnjxjfp})/{amountSnjzyxd}*100'
                },
                {
                  title: '省级安排',
                  field: 'sdfjd',
                  width: 100,
                  align: 'right',
                  cellRender: { name: '$vxeRatio' },
                  formula: '{amountSnjsnjdf}-0==0?0:({amountSnjsnjbjfp}+{amountSnjsnjxjfp})/{amountSnjsnjdf}*100'
                },
                {
                  title: '总进度',
                  field: 'sajd',
                  width: 100,
                  align: 'right',
                  cellRender: {
                    name: '$vxeRatio'
                  },
                  formula: '{saAmount}-0==0?0:({sbjfpaAmount}+{ssxfpaAmount})/{saAmount}*100'
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
                  title: '省级安排',
                  field: 'amountSjsnjdf',
                  width: 100,
                  align: 'right',
                  cellRender: { name: '$vxeMoney' }
                },
                {
                  title: '市级安排',
                  field: 'amountSjsjdf',
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
                  formula: '({amountSjzydf}+{amountSjsnjdf}+{amountSjsjdf})'
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
                      title: '省级安排',
                      field: 'shqdfapAmount',
                      width: 100,
                      align: 'right',
                      cellRender: { name: '$vxeMoney' }
                    },
                    {
                      title: '市级安排',
                      field: 'sjzhsjapAmount',
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
                      formula: '({shqzyapAmount}+{shqdfapAmount}+{sjzhsjapAmount})'
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
                      cellRender: { name: '$vxeMoney' }
                    },
                    {
                      title: '省级安排',
                      field: 'shhdfapAmount',
                      width: 100,
                      align: 'right',
                      cellRender: { name: '$vxeMoney' }
                    },
                    {
                      title: '市级安排',
                      field: 'sjzhhsjapAmount',
                      width: 100,
                      align: 'right',
                      cellRender: { name: '$vxeMoney' }
                    },
                    {
                      title: '总金额',
                      field: 'shhaAmount',
                      width: 100,
                      align: 'right',
                      cellRender: {
                        name: '$vxeMoney'
                      },
                      formula: '({shhzyapAmount}+{shhdfapAmount}+{sjzhhsjapAmount})'
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
                  title: '省级安排',
                  field: 'amountSjsnjbjfp',
                  width: 100,
                  align: 'right',
                  cellRender: { name: '$vxeMoney' }
                },
                {
                  title: '市级安排',
                  field: 'amountSjsjbjfp',
                  width: 100,
                  align: 'right',
                  cellRender: { name: '$vxeMoney' }
                },
                {
                  title: '总金额',
                  field: 'shbjfpaAmount',
                  width: 100,
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
                  title: '省级安排',
                  field: 'amountSjsnjxjfp',
                  width: 100,
                  align: 'right',
                  cellRender: { name: '$vxeMoney' }
                },
                {
                  title: '市级安排',
                  field: 'amountSjsjxjfp',
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
                  formula: '({amountSjzyxjfp}+{amountSjsnjxjfp}+{amountSjsjxjfp})'
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
                  title: '省级安排',
                  field: 'shdfwfpAmount',
                  width: 100,
                  align: 'right',
                  cellRender: { name: '$vxeMoney' },
                  formula: '{amountSjsnjdf}-{amountSjsnjbjfp}'
                },
                {
                  title: '市级安排',
                  field: 'shidfapAmount1',
                  width: 100,
                  align: 'right',
                  cellRender: { name: '$vxeMoney' },
                  formula: '{amountSjsjdf}-{amountSjsjbjfp} - {amountSjsjxjfp}'
                },
                {
                  title: '总金额',
                  field: 'shwfpaAmount',
                  width: 100,
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
              width: 100,
              align: 'right',
              children: [
                {
                  title: '中央安排',
                  field: 'shzyjd',
                  width: 100,
                  align: 'right',
                  cellRender: { name: '$vxeRatio' },
                  formula: '{amountSjzydf}-0==0?0:({amountSjzybjfp}+{amountSjzyxjfp})/{amountSjzydf}*100'
                },
                {
                  title: '省级安排',
                  field: 'shdfjd',
                  width: 100,
                  align: 'right',
                  cellRender: { name: '$vxeRatio' },
                  formula: '{amountSjsnjdf}-0==0?0:({amountSjsnjxjfp}+{amountSjsnjbjfp})/{amountSjsnjdf}*100'
                },
                {
                  title: '市级安排',
                  field: 'sjsjapjd',
                  width: 100,
                  align: 'right',
                  cellRender: { name: '$vxeRatio' },
                  formula: '{amountSjsjdf}-0==0?0:({amountSjsjbjfp}+{amountSjsjxjfp})/{amountSjsjdf}*100'
                },
                {
                  title: '总进度',
                  field: 'shajd',
                  width: 100,
                  align: 'right',
                  cellRender: {
                    name: '$vxeRatio'
                  },
                  formula: '{shiaAmount}-0==0?0:({shbjfpaAmount}+{shxjfpaAmount})/{shiaAmount}*100'
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
                  title: '省级安排',
                  field: 'amountXjsnjfdf',
                  width: 100,
                  align: 'right',
                  cellRender: { name: '$vxeMoney' }
                },
                {
                  title: '市级安排',
                  field: 'amountXjsjdf',
                  width: 100,
                  align: 'right',
                  cellRender: { name: '$vxeMoney' }
                },
                {
                  title: '县级安排',
                  field: 'amountXjxjdf',
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
                  formula: '({amountXjzydf}+{amountXjsnjfdf}+{amountXjsjdf}+{amountXjxjdf})'
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
                      title: '省级安排',
                      field: 'xqdfapAmount',
                      width: 100,
                      align: 'right',
                      cellRender: { name: '$vxeMoney' }
                    },
                    {
                      title: '市级安排',
                      field: 'xdfapzhAmount',
                      width: 100,
                      align: 'right',
                      cellRender: { name: '$vxeMoney' }
                    },
                    {
                      title: '县级安排',
                      field: 'xdfapzhAmount',
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
                      cellRender: { name: '$vxeMoney' }
                    },
                    {
                      title: '省级安排',
                      field: 'xhdfapAmount',
                      width: 100,
                      align: 'right',
                      cellRender: { name: '$vxeMoney' }
                    },
                    {
                      title: '市级安排',
                      field: 'xdfapzhhAmount',
                      width: 100,
                      align: 'right',
                      cellRender: { name: '$vxeMoney' }
                    },
                    {
                      title: '县级安排',
                      field: 'xdfapzhAmount',
                      width: 100,
                      align: 'right',
                      cellRender: { name: '$vxeMoney' }
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
                  title: '省级安排',
                  field: 'amountXjsnjbjfp',
                  width: 100,
                  align: 'right',
                  cellRender: { name: '$vxeMoney' }
                },
                {
                  title: '市级安排',
                  field: 'amountXjsjbjfp',
                  width: 100,
                  align: 'right',
                  cellRender: { name: '$vxeMoney' }
                },
                {
                  title: '县级安排',
                  field: 'amountXjxjbjfp',
                  width: 100,
                  align: 'right',
                  cellRender: { name: '$vxeMoney' }
                },
                {
                  title: '总金额',
                  field: 'xyfpaAmount',
                  width: 100,
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
              width: 100,
              align: 'right',
              children: [
                {
                  title: '中央安排',
                  field: 'xzywfpAmount',
                  width: 100,
                  align: 'right',
                  cellRender: { name: '$vxeMoney' },
                  formula: '({amountXjzydf}-{amountXjzybjfp})'
                },
                {
                  title: '省级安排',
                  field: 'xdfwfpAmount',
                  width: 100,
                  align: 'right',
                  cellRender: { name: '$vxeMoney' },
                  formula: '({amountXjsnjfdf} - {amountXjsnjbjfp})'
                },
                {
                  title: '市级安排',
                  field: 'xdfapAmount3',
                  width: 100,
                  align: 'right',
                  cellRender: { name: '$vxeMoney' },
                  formula: '({amountXjsjdf} - {amountXjsjbjfp})'
                },
                {
                  title: '县级安排',
                  field: 'xdfapAmount2',
                  width: 100,
                  align: 'right',
                  cellRender: { name: '$vxeMoney' },
                  formula: '({amountXjxjdf} - {amountXjxjbjfp})'
                },
                {
                  title: '总金额',
                  field: 'xwfpaAmount',
                  width: 100,
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
              width: 100,
              align: 'right',
              children: [
                {
                  title: '中央安排',
                  field: 'xzyjd',
                  width: 100,
                  align: 'right',
                  cellRender: { name: '$vxeRatio' },
                  formula: '{amountXjzydf}-0==0?0:{amountXjzybjfp}/{amountXjzydf}*100'
                },
                {
                  title: '省级安排',
                  field: 'xdfjd',
                  width: 100,
                  align: 'right',
                  cellRender: { name: '$vxeRatio' },
                  formula: '{amountXjsnjfdf}-0 == 0?0:{amountXjsnjbjfp}/{amountXjsnjfdf}*100'
                },
                {
                  title: '市级安排',
                  field: 'xjsjapjd',
                  width: 100,
                  align: 'right',
                  cellRender: { name: '$vxeRatio' },
                  formula: '{amountXjsjdf}-0 == 0?0:{amountXjsjbjfp}/{amountXjsjdf}*100'
                },
                {
                  title: '县级安排',
                  field: 'xjxjapjd',
                  width: 100,
                  align: 'right',
                  cellRender: { name: '$vxeRatio' },
                  formula: '{amountXjxjdf}-0 == 0?0:{amountXjxjbjfp}/{amountXjxjdf}*100'
                },
                {
                  title: '总进度',
                  field: 'xajd',
                  width: 100,
                  align: 'right',
                  cellRender: {
                    name: '$vxeRatio'
                  },
                  formula: '{xaAmount}-0==0?0:{xyfpaAmount}/{xaAmount}*100'
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
              title: '预算金额',
              width: 200,
              align: 'right',
              children: [
                {
                  title: '中央安排',
                  field: 'amountZjysZyap',
                  width: 200,
                  align: 'right',
                  sortable: true,
                  cellRender: { name: '$vxeMoney' }
                },
                {
                  title: '省级安排',
                  field: 'zdfapAmount',
                  width: 200,
                  align: 'right',
                  sortable: true,
                  cellRender: { name: '$vxeMoney' }
                },
                {
                  title: '市级安排',
                  field: 'zdfapAmount3s',
                  width: 200,
                  align: 'right',
                  sortable: true,
                  cellRender: { name: '$vxeMoney' }
                },
                {
                  title: '县级安排',
                  field: 'zdfapAmount2x',
                  width: 200,
                  align: 'right',
                  sortable: true,
                  cellRender: { name: '$vxeMoney' }
                },
                {
                  title: '镇级安排',
                  field: 'zdfapAmount1z',
                  width: 200,
                  align: 'right',
                  sortable: true,
                  cellRender: { name: '$vxeMoney' }
                },
                {
                  title: '总金额',
                  field: 'zaAmount',
                  width: 200,
                  sortable: true,
                  align: 'right',
                  cellRender: {
                    name: '$vxeMoney'
                  },
                  formula: '({amountZjysZyap}+{zdfapAmount3s}+{zdfapAmount2x}+{zdfapAmount1z})'
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
                      field: 'zqzyapAmount',
                      width: 200,
                      align: 'right',
                      sortable: true,
                      cellRender: { name: '$vxeMoney' }
                    },
                    {
                      title: '省级安排',
                      field: 'zqdfapAmount',
                      width: 200,
                      align: 'right',
                      sortable: true,
                      cellRender: { name: '$vxeMoney' }
                    },
                    {
                      title: '市级安排',
                      field: 'zdfapAmount3zh',
                      width: 200,
                      align: 'right',
                      sortable: true,
                      cellRender: { name: '$vxeMoney' }
                    },
                    {
                      title: '县级安排',
                      field: 'zdfapAmount2xj',
                      width: 200,
                      align: 'right',
                      sortable: true,
                      cellRender: { name: '$vxeMoney' }
                    },
                    {
                      title: '镇级安排',
                      field: 'zdfapAmount1zj',
                      width: 200,
                      align: 'right',
                      sortable: true,
                      cellRender: { name: '$vxeMoney' }
                    },
                    {
                      title: '总金额',
                      field: 'zsnallAmount3z',
                      width: 200,
                      align: 'right',
                      sortable: true,
                      cellRender: {
                        name: '$vxeMoney'
                      },
                      formula: '({zqdfapAmount}+{zdfapAmount3zh}+{zdfapAmount2xj}+{zdfapAmount1zj})'
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
                      field: 'zhzyapAmount',
                      width: 200,
                      align: 'right',
                      sortable: true,
                      cellRender: { name: '$vxeMoney' }
                    },
                    {
                      title: '省级安排',
                      field: 'zhdfapAmount',
                      width: 200,
                      align: 'right',
                      sortable: true,
                      cellRender: { name: '$vxeMoney' }
                    },
                    {
                      title: '市级安排',
                      field: 'zdfapAmount3zhh',
                      width: 200,
                      align: 'right',
                      sortable: true,
                      cellRender: { name: '$vxeMoney' }
                    },
                    {
                      title: '县级安排',
                      field: 'zdfapAmount2zhh',
                      width: 200,
                      align: 'right',
                      sortable: true,
                      cellRender: { name: '$vxeMoney' }
                    },
                    {
                      title: '镇级安排',
                      field: 'zdfapAmount1zhh',
                      width: 200,
                      align: 'right',
                      sortable: true,
                      cellRender: { name: '$vxeMoney' }
                    },
                    {
                      title: '总金额',
                      field: 'zhaAmount',
                      width: 200,
                      align: 'right',
                      sortable: true,
                      cellRender: {
                        name: '$vxeMoney'
                      },
                      formula: '({zhzyapAmount}+{zhdfapAmount}+{zdfapAmount3zhh}+{zdfapAmount2zhh}+{zdfapAmount1zhh})'
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
                  field: 'amountZjfpZyap',
                  width: 200,
                  align: 'right',
                  sortable: true,
                  cellRender: { name: '$vxeMoney' }
                },
                {
                  title: '省级安排',
                  field: 'zdfyfpAmount',
                  width: 200,
                  align: 'right',
                  sortable: true,
                  cellRender: { name: '$vxeMoney' }
                },
                {
                  title: '市级安排',
                  field: 'zdfapAmount3yfpzh',
                  width: 200,
                  align: 'right',
                  sortable: true,
                  cellRender: { name: '$vxeMoney' }
                },
                {
                  title: '县级安排',
                  field: 'zdfapAmount2yfpzh',
                  width: 200,
                  align: 'right',
                  sortable: true,
                  cellRender: { name: '$vxeMoney' }
                },
                {
                  title: '镇级安排',
                  field: 'zdfapAmount1yfpzh',
                  width: 200,
                  align: 'right',
                  sortable: true,
                  cellRender: { name: '$vxeMoney' }
                },
                {
                  title: '总金额',
                  field: 'zyfpaAmount',
                  width: 200,
                  align: 'right',
                  sortable: true,
                  cellRender: {
                    name: '$vxeMoney'
                  },
                  formula: '({amountZjfpZyap}+{zdfyfpAmount})'
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
                  field: 'zzywfpAmount',
                  width: 200,
                  align: 'right',
                  sortable: true,
                  cellRender: { name: '$vxeMoney' },
                  formula: '{amountZjysZyap}-{amountZjfpZyap}'
                },
                {
                  title: '省级安排',
                  field: 'zdfwfpAmountwfp',
                  width: 200,
                  align: 'right',
                  sortable: true,
                  cellRender: { name: '$vxeMoney' }
                },
                {
                  title: '市级安排',
                  field: 'zdfapAmount3wfp',
                  width: 200,
                  align: 'right',
                  sortable: true,
                  cellRender: { name: '$vxeMoney' }
                },
                {
                  title: '县级安排',
                  field: 'zdfapAmount2xjwfp',
                  width: 200,
                  align: 'right',
                  sortable: true,
                  cellRender: { name: '$vxeMoney' }
                },
                {
                  title: '镇级安排',
                  field: 'zdfapAmount1xjwfp',
                  width: 200,
                  align: 'right',
                  sortable: true,
                  cellRender: { name: '$vxeMoney' }
                },
                {
                  title: '总金额',
                  field: 'zwfpaAmount',
                  width: 200,
                  align: 'right',
                  sortable: true,
                  cellRender: {
                    name: '$vxeMoney'
                  },
                  formula: '({amountZjysZyap}-{amountZjfpZyap})'
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
                  field: 'zzyjd',
                  width: 200,
                  align: 'right',
                  sortable: true,
                  cellRender: { name: '$vxeRatio' },
                  formula: '{zyfpaAmount}+{zwfpaAmount}-0==0?0:{zyfpaAmount}/({zyfpaAmount}+{zwfpaAmount})*100'
                },
                {
                  title: '省级安排',
                  field: 'zdfjd',
                  width: 200,
                  formula: '0',
                  sortable: true,
                  align: 'right',
                  cellRender: { name: '$vxeRatio' }
                },
                {
                  title: '市级安排',
                  field: 'zdfapAmount3',
                  width: 200,
                  formula: '0',
                  sortable: true,
                  align: 'right',
                  cellRender: { name: '$vxeRatio' }
                },
                {
                  title: '县级安排',
                  field: 'zdfapAmount2',
                  width: 200,
                  formula: '0',
                  sortable: true,
                  align: 'right',
                  cellRender: { name: '$vxeRatio' }
                },
                {
                  title: '镇级安排',
                  field: 'zdfapAmount1',
                  width: 200,
                  formula: '0',
                  sortable: true,
                  align: 'right',
                  cellRender: { name: '$vxeRatio' }
                },
                {
                  title: '总进度',
                  field: 'zajd',
                  width: 200,
                  align: 'right',
                  sortable: true,
                  cellRender: {
                    name: '$vxeRatio'
                  },
                  formula: '({zzyjd})'
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
