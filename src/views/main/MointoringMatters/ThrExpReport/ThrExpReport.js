// import store from '@/store/index'
export let proconf = {
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
      // { code: 'Export', label: '导出', status: 'primary' }
    ]
  },
  highQueryConfig: [
    {
      title: '日期',
      field: 'date',
      itemRender: {
        name: '$vxeTime',
        defaultValue: '',
        props: {
          format: 'YYYY-MM-DD',
          type: 'date', // "当前日期为：YYYY-MM-DD，星期W，为第Q季度，时间为：hh:mm:ss:c"
          placeholder: '账务日期'
        }
      }
    }
  ],
  highQueryData: {
    date: ''
  },
  highQueryConfig1: [
    {
      title: '预算单位',
      field: 'agencyCodeList',
      width: '8',
      align: 'left',
      formula: '',
      name: '$vxeTree',
      itemRender: {
        name: '$vxeTree',
        options: [],
        'props': {
          'config': {
            'treeProps': {
              'nodeKey': 'id',
              'label': 'label',
              'children': 'children'
            },
            'placeholder': '预算单位',
            'multiple': true,
            'readonly': true,
            'isleaf': false
          }
        }
      }
    }
  ],
  highQueryData1: {
    agencyCodeList: []
  },
  PoliciesTableColumns: [
    {
      title: '年度',
      field: 'fiscalYear',
      width: '100',
      sortable: false,
      align: 'left'
    },
    {
      title: '区划',
      field: 'mofDiv',
      width: '190',
      sortable: false,
      align: 'left'
    },
    {
      title: '合计',
      field: '',
      width: '150',
      sortable: false,
      align: 'left',
      children: [
        {
          title: '调整预算数',
          field: 'adjustedBudgetAmount',
          width: '150',
          align: 'center',
          'filters': '[object Object]',
          'filterRender': {
            'name': 'FilterNumberCompare'
          },
          'combinedType': 'average,subTotal,total,totalAll',
          'cellRender': {
            'name': '$vxeMoney',
            'options': [],
            'defaultValue': '',
            'props': {}
          },
          'name': '$vxeMoney',
          'fixed': '',
          'formula': '',
          'constraint': '',
          'sortable': '',
          'associatedQuery': '',
          'className': '',
          'combinedType_select_sort': '平均值,选中合计,当前页合计,所有合计'
        },
        {
          title: '执行数',
          field: 'executionsAmount',
          width: '150',
          align: 'center',
          'filters': '[object Object]',
          'filterRender': {
            'name': 'FilterNumberCompare'
          },
          'combinedType': 'average,subTotal,total,totalAll',
          'cellRender': {
            'name': '$vxeMoney',
            'options': [],
            'defaultValue': '',
            'props': {}
          },
          'name': '$vxeMoney',
          'fixed': '',
          'formula': '',
          'constraint': '',
          'sortable': '',
          'associatedQuery': '',
          'className': '',
          'combinedType_select_sort': '平均值,选中合计,当前页合计,所有合计'
        },
        {
          title: '预警',
          field: 'warn',
          width: '150',
          type: 'html',
          align: 'center',
          'cellRender': {
            'name': '$vxeSelect',
            'options': [
              {
                'value': '<span style="color:red">红色预警</span>',
                'label': '超预算'
              },
              {
                'value': '<span>正常</span>',
                'label': '正常'
              }
            ],
            'defaultValue': '',
            'props': {}
          }
        },
        {
          title: '支出进度',
          field: 'expenditureProgress',
          width: '150',
          align: 'center',
          type: 'html'
        }
      ]
    },
    {
      title: '因公出国（境）费',
      field: '',
      width: '150',
      sortable: false,
      align: 'left',
      children: [
        {
          title: '调整预算数',
          field: 'goAbroadAdjustedBudgetAmount',
          width: '150',
          align: 'center',
          'filters': '[object Object]',
          'filterRender': {
            'name': 'FilterNumberCompare'
          },
          'combinedType': 'average,subTotal,total,totalAll',
          'cellRender': {
            'name': '$vxeMoney',
            'options': [],
            'defaultValue': '',
            'props': {}
          },
          'name': '$vxeMoney',
          'fixed': '',
          'formula': '',
          'constraint': '',
          'sortable': '',
          'associatedQuery': '',
          'className': '',
          'combinedType_select_sort': '平均值,选中合计,当前页合计,所有合计'
        },
        {
          title: '执行数',
          field: 'goAbroadExecutionsAmount',
          width: '150',
          align: 'center',
          'filters': '[object Object]',
          'filterRender': {
            'name': 'FilterNumberCompare'
          },
          'combinedType': 'average,subTotal,total,totalAll',
          'cellRender': {
            'name': '$vxeMoney',
            'options': [],
            'defaultValue': '',
            'props': {}
          },
          'name': '$vxeMoney',
          'fixed': '',
          'formula': '',
          'constraint': '',
          'sortable': '',
          'associatedQuery': '',
          'className': '',
          'combinedType_select_sort': '平均值,选中合计,当前页合计,所有合计'
        },
        {
          title: '预警',
          field: 'goAbroadWarn',
          width: '150',
          type: 'html',
          align: 'center',
          'cellRender': {
            'name': '$vxeSelect',
            'options': [
              {
                'value': '<span style="color:red">红色预警</span>',
                'label': '超预算'
              },
              {
                'value': '<span>正常</span>',
                'label': '正常'
              }
            ],
            'defaultValue': '',
            'props': {}
          }
        },
        {
          title: '支出进度',
          field: 'goAbroadExpenditureProgress',
          width: '150',
          align: 'center',
          type: 'html'
        }
      ]
    },
    {
      title: '公务接待费',
      field: '',
      width: '150',
      sortable: false,
      align: 'left',
      children: [
        {
          title: '调整预算数',
          field: 'receptionAdjustedBudgetAmount',
          width: '150',
          align: 'center',
          'filters': '[object Object]',
          'filterRender': {
            'name': 'FilterNumberCompare'
          },
          'combinedType': 'average,subTotal,total,totalAll',
          'cellRender': {
            'name': '$vxeMoney',
            'options': [],
            'defaultValue': '',
            'props': {}
          },
          'name': '$vxeMoney',
          'fixed': '',
          'formula': '',
          'constraint': '',
          'sortable': '',
          'associatedQuery': '',
          'className': '',
          'combinedType_select_sort': '平均值,选中合计,当前页合计,所有合计'
        },
        {
          title: '执行数',
          field: 'receptionExecutionsAmount',
          width: '150',
          align: 'center',
          'filters': '[object Object]',
          'filterRender': {
            'name': 'FilterNumberCompare'
          },
          'combinedType': 'average,subTotal,total,totalAll',
          'cellRender': {
            'name': '$vxeMoney',
            'options': [],
            'defaultValue': '',
            'props': {}
          },
          'name': '$vxeMoney',
          'fixed': '',
          'formula': '',
          'constraint': '',
          'sortable': '',
          'associatedQuery': '',
          'className': '',
          'combinedType_select_sort': '平均值,选中合计,当前页合计,所有合计'
        },
        {
          title: '预警',
          field: 'receptionWarn',
          width: '150',
          type: 'html',
          align: 'center',
          'cellRender': {
            'name': '$vxeSelect',
            'options': [
              {
                'value': '<span style="color:red">红色预警</span>',
                'label': '超预算'
              },
              {
                'value': '<span>正常</span>',
                'label': '正常'
              }
            ],
            'defaultValue': '',
            'props': {}
          }
        },
        {
          title: '支出进度',
          field: 'receptionExpenditureProgress',
          width: '150',
          align: 'center',
          type: 'html'
        }
      ]
    },
    {
      title: '公务用车购置及运行维护费',
      field: '',
      width: '150',
      sortable: false,
      align: 'left',
      children: [
        {
          title: '小计',
          field: '',
          width: '150',
          align: 'center',
          children: [
            {
              title: '调整预算数',
              field: 'vehicleSubtotalAdjustedBudgetAmount',
              width: '150',
              align: 'center',
              'filters': '[object Object]',
              'filterRender': {
                'name': 'FilterNumberCompare'
              },
              'combinedType': 'average,subTotal,total,totalAll',
              'cellRender': {
                'name': '$vxeMoney',
                'options': [],
                'defaultValue': '',
                'props': {}
              },
              'name': '$vxeMoney',
              'fixed': '',
              'formula': '',
              'constraint': '',
              'sortable': '',
              'associatedQuery': '',
              'className': '',
              'combinedType_select_sort': '平均值,选中合计,当前页合计,所有合计'
            },
            {
              title: '执行数',
              field: 'vehicleSubtotalExecutionsAmount',
              width: '150',
              align: 'center',
              'filters': '[object Object]',
              'filterRender': {
                'name': 'FilterNumberCompare'
              },
              'combinedType': 'average,subTotal,total,totalAll',
              'cellRender': {
                'name': '$vxeMoney',
                'options': [],
                'defaultValue': '',
                'props': {}
              },
              'name': '$vxeMoney',
              'fixed': '',
              'formula': '',
              'constraint': '',
              'sortable': '',
              'associatedQuery': '',
              'className': '',
              'combinedType_select_sort': '平均值,选中合计,当前页合计,所有合计'
            },
            {
              title: '预警',
              field: 'vehicleSubtotalWarn',
              width: '150',
              type: 'html',
              align: 'center',
              'cellRender': {
                'name': '$vxeSelect',
                'options': [
                  {
                    'value': '<span style="color:red">红色预警</span>',
                    'label': '超预算'
                  },
                  {
                    'value': '<span>正常</span>',
                    'label': '正常'
                  }
                ],
                'defaultValue': '',
                'props': {}
              }
            },
            {
              title: '支出进度',
              field: 'vehicleSubtotalExpenditureProgress',
              width: '150',
              align: 'center',
              type: 'html'
            }
          ]
        },
        {
          title: '公车购置（30913）',
          field: '',
          width: '150',
          align: 'center',
          children: [
            {
              title: '调整预算数',
              field: 'vehiclePurchaseAdjustedBudgetAmount30913',
              width: '150',
              align: 'center',
              'filters': '[object Object]',
              'filterRender': {
                'name': 'FilterNumberCompare'
              },
              'combinedType': 'average,subTotal,total,totalAll',
              'cellRender': {
                'name': '$vxeMoney',
                'options': [],
                'defaultValue': '',
                'props': {}
              },
              'name': '$vxeMoney',
              'fixed': '',
              'formula': '',
              'constraint': '',
              'sortable': '',
              'associatedQuery': '',
              'className': '',
              'combinedType_select_sort': '平均值,选中合计,当前页合计,所有合计'
            },
            {
              title: '执行数',
              field: 'vehiclePurchaseExecutionsAmount30913',
              width: '150',
              align: 'center',
              'filters': '[object Object]',
              'filterRender': {
                'name': 'FilterNumberCompare'
              },
              'combinedType': 'average,subTotal,total,totalAll',
              'cellRender': {
                'name': '$vxeMoney',
                'options': [],
                'defaultValue': '',
                'props': {}
              },
              'name': '$vxeMoney',
              'fixed': '',
              'formula': '',
              'constraint': '',
              'sortable': '',
              'associatedQuery': '',
              'className': '',
              'combinedType_select_sort': '平均值,选中合计,当前页合计,所有合计'
            },
            {
              title: '预警',
              field: 'vehiclePurchaseWarn30913',
              width: '150',
              type: 'html',
              align: 'center',
              'cellRender': {
                'name': '$vxeSelect',
                'options': [
                  {
                    'value': '<span style="color:red">红色预警</span>',
                    'label': '超预算'
                  },
                  {
                    'value': '<span>正常</span>',
                    'label': '正常'
                  }
                ],
                'defaultValue': '',
                'props': {}
              }
            },
            {
              title: '支出进度',
              field: 'vehiclePurchaseExpenditureProgress30913',
              width: '150',
              align: 'center',
              type: 'html'
            }
          ]
        },
        {
          title: '公车购置（31013）',
          field: '',
          width: '150',
          align: 'center',
          children: [
            {
              title: '调整预算数',
              field: 'vehiclePurchaseAdjustedBudgetAmount31013',
              width: '150',
              align: 'center',
              'filters': '[object Object]',
              'filterRender': {
                'name': 'FilterNumberCompare'
              },
              'combinedType': 'average,subTotal,total,totalAll',
              'cellRender': {
                'name': '$vxeMoney',
                'options': [],
                'defaultValue': '',
                'props': {}
              },
              'name': '$vxeMoney',
              'fixed': '',
              'formula': '',
              'constraint': '',
              'sortable': '',
              'associatedQuery': '',
              'className': '',
              'combinedType_select_sort': '平均值,选中合计,当前页合计,所有合计'
            },
            {
              title: '执行数',
              field: 'vehiclePurchaseExecutionsAmount31013',
              width: '150',
              align: 'center',
              'filters': '[object Object]',
              'filterRender': {
                'name': 'FilterNumberCompare'
              },
              'combinedType': 'average,subTotal,total,totalAll',
              'cellRender': {
                'name': '$vxeMoney',
                'options': [],
                'defaultValue': '',
                'props': {}
              },
              'name': '$vxeMoney',
              'fixed': '',
              'formula': '',
              'constraint': '',
              'sortable': '',
              'associatedQuery': '',
              'className': '',
              'combinedType_select_sort': '平均值,选中合计,当前页合计,所有合计'
            },
            {
              title: '预警',
              field: 'vehiclePurchaseWarn31013',
              width: '150',
              type: 'html',
              align: 'center',
              'cellRender': {
                'name': '$vxeSelect',
                'options': [
                  {
                    'value': '<span style="color:red">红色预警</span>',
                    'label': '超预算'
                  },
                  {
                    'value': '<span>正常</span>',
                    'label': '正常'
                  }
                ],
                'defaultValue': '',
                'props': {}
              }
            },
            {
              title: '支出进度',
              field: 'vehiclePurchaseExpenditureProgress31013',
              width: '150',
              align: 'center',
              type: 'html'
            }
          ]
        },
        {
          title: '公车运维',
          field: '',
          width: '150',
          align: 'center',
          children: [
            {
              title: '调整预算数',
              field: 'vehicleDevopsAdjustedBudgetAmount',
              width: '150',
              align: 'center',
              'filters': '[object Object]',
              'filterRender': {
                'name': 'FilterNumberCompare'
              },
              'combinedType': 'average,subTotal,total,totalAll',
              'cellRender': {
                'name': '$vxeMoney',
                'options': [],
                'defaultValue': '',
                'props': {}
              },
              'name': '$vxeMoney',
              'fixed': '',
              'formula': '',
              'constraint': '',
              'sortable': '',
              'associatedQuery': '',
              'className': '',
              'combinedType_select_sort': '平均值,选中合计,当前页合计,所有合计'
            },
            {
              title: '执行数',
              field: 'vehicleDevopsExecutionsAmount',
              width: '150',
              align: 'center',
              'filters': '[object Object]',
              'filterRender': {
                'name': 'FilterNumberCompare'
              },
              'combinedType': 'average,subTotal,total,totalAll',
              'cellRender': {
                'name': '$vxeMoney',
                'options': [],
                'defaultValue': '',
                'props': {}
              },
              'name': '$vxeMoney',
              'fixed': '',
              'formula': '',
              'constraint': '',
              'sortable': '',
              'associatedQuery': '',
              'className': '',
              'combinedType_select_sort': '平均值,选中合计,当前页合计,所有合计'
            },
            {
              title: '预警',
              field: 'vehicleDevopsWarn',
              width: '150',
              type: 'html',
              align: 'center',
              'cellRender': {
                'name': '$vxeSelect',
                'options': [
                  {
                    'value': '<span style="color:red">红色预警</span>',
                    'label': '超预算'
                  },
                  {
                    'value': '<span>正常</span>',
                    'label': '正常'
                  }
                ],
                'defaultValue': '',
                'props': {}
              }
            },
            {
              title: '支出进度',
              field: 'vehicleDevopsExpenditureProgress',
              width: '150',
              align: 'center',
              type: 'html'
            }
          ]
        }
      ]
    },
    {
      title: '会议费',
      field: '',
      width: '150',
      sortable: false,
      align: 'left',
      children: [
        {
          title: '调整预算数',
          field: 'meetingAdjustedBudgetAmount',
          width: '150',
          align: 'center',
          'filters': '[object Object]',
          'filterRender': {
            'name': 'FilterNumberCompare'
          },
          'combinedType': 'average,subTotal,total,totalAll',
          'cellRender': {
            'name': '$vxeMoney',
            'options': [],
            'defaultValue': '',
            'props': {}
          },
          'name': '$vxeMoney',
          'fixed': '',
          'formula': '',
          'constraint': '',
          'sortable': '',
          'associatedQuery': '',
          'className': '',
          'combinedType_select_sort': '平均值,选中合计,当前页合计,所有合计'
        },
        {
          title: '执行数',
          field: 'meetingExecutionsAmount',
          width: '150',
          align: 'center',
          'filters': '[object Object]',
          'filterRender': {
            'name': 'FilterNumberCompare'
          },
          'combinedType': 'average,subTotal,total,totalAll',
          'cellRender': {
            'name': '$vxeMoney',
            'options': [],
            'defaultValue': '',
            'props': {}
          },
          'name': '$vxeMoney',
          'fixed': '',
          'formula': '',
          'constraint': '',
          'sortable': '',
          'associatedQuery': '',
          'className': '',
          'combinedType_select_sort': '平均值,选中合计,当前页合计,所有合计'
        },
        {
          title: '预警',
          field: 'meetingWarn',
          width: '150',
          type: 'html',
          align: 'center',
          'cellRender': {
            'name': '$vxeSelect',
            'options': [
              {
                'value': '<span style="color:red">红色预警</span>',
                'label': '超预算'
              },
              {
                'value': '<span>正常</span>',
                'label': '正常'
              }
            ],
            'defaultValue': '',
            'props': {}
          }
        },
        {
          title: '支出进度',
          field: 'meetingExpenditureProgress',
          width: '150',
          align: 'center',
          type: 'html'
        }
      ]
    },
    {
      title: '培训费',
      field: '',
      width: '150',
      sortable: false,
      align: 'left',
      children: [
        {
          title: '调整预算数',
          field: 'trainAdjustedBudgetAmount',
          width: '150',
          align: 'center',
          'filters': '[object Object]',
          'filterRender': {
            'name': 'FilterNumberCompare'
          },
          'combinedType': 'average,subTotal,total,totalAll',
          'cellRender': {
            'name': '$vxeMoney',
            'options': [],
            'defaultValue': '',
            'props': {}
          },
          'name': '$vxeMoney',
          'fixed': '',
          'formula': '',
          'constraint': '',
          'sortable': '',
          'associatedQuery': '',
          'className': '',
          'combinedType_select_sort': '平均值,选中合计,当前页合计,所有合计'
        },
        {
          title: '执行数',
          field: 'trainExecutionsAmount',
          width: '150',
          align: 'center',
          'filters': '[object Object]',
          'filterRender': {
            'name': 'FilterNumberCompare'
          },
          'combinedType': 'average,subTotal,total,totalAll',
          'cellRender': {
            'name': '$vxeMoney',
            'options': [],
            'defaultValue': '',
            'props': {}
          },
          'name': '$vxeMoney',
          'fixed': '',
          'formula': '',
          'constraint': '',
          'sortable': '',
          'associatedQuery': '',
          'className': '',
          'combinedType_select_sort': '平均值,选中合计,当前页合计,所有合计'
        },
        {
          title: '预警',
          field: 'trainWarn',
          width: '150',
          type: 'html',
          align: 'center',
          'cellRender': {
            'name': '$vxeSelect',
            'options': [
              {
                'value': '<span style="color:red">红色预警</span>',
                'label': '超预算'
              },
              {
                'value': '<span>正常</span>',
                'label': '正常'
              }
            ],
            'defaultValue': '',
            'props': {}
          }
        },
        {
          title: '支出进度',
          field: 'trainExpenditureProgress',
          width: '150',
          align: 'center',
          type: 'html'
        }
      ]
    }
  ],
  PoliciesTableColumns1: [
    {
      title: '年度',
      field: 'fiscalYear',
      width: '100',
      sortable: false,
      align: 'left'
    },
    {
      title: '区划',
      field: 'mofDiv',
      width: '190',
      sortable: false,
      align: 'left'
    },
    {
      title: '合计',
      field: '',
      width: '150',
      sortable: false,
      align: 'left',
      children: [
        {
          title: '年初预算数',
          field: 'beginningBudgetAmount',
          width: '150',
          align: 'center',
          'filters': '[object Object]',
          'filterRender': {
            'name': 'FilterNumberCompare'
          },
          'combinedType': 'average,subTotal,total,totalAll',
          'cellRender': {
            'name': '$vxeMoney',
            'options': [],
            'defaultValue': '',
            'props': {}
          },
          'name': '$vxeMoney',
          'fixed': '',
          'formula': '',
          'constraint': '',
          'sortable': '',
          'associatedQuery': '',
          'className': '',
          'combinedType_select_sort': '平均值,选中合计,当前页合计,所有合计'
        },
        {
          title: '预算调整数',
          field: 'budgetAdjustmentAmount',
          width: '150',
          align: 'center',
          'filters': '[object Object]',
          'filterRender': {
            'name': 'FilterNumberCompare'
          },
          'combinedType': 'average,subTotal,total,totalAll',
          'cellRender': {
            'name': '$vxeMoney',
            'options': [],
            'defaultValue': '',
            'props': {}
          },
          'name': '$vxeMoney',
          'fixed': '',
          'formula': '',
          'constraint': '',
          'sortable': '',
          'associatedQuery': '',
          'className': '',
          'combinedType_select_sort': '平均值,选中合计,当前页合计,所有合计'
        },
        {
          title: '调整预算数',
          field: 'adjustedBudgetAmount',
          width: '150',
          align: 'center',
          'filters': '[object Object]',
          'filterRender': {
            'name': 'FilterNumberCompare'
          },
          'combinedType': 'average,subTotal,total,totalAll',
          'cellRender': {
            'name': '$vxeMoney',
            'options': [],
            'defaultValue': '',
            'props': {}
          },
          'name': '$vxeMoney',
          'fixed': '',
          'formula': '',
          'constraint': '',
          'sortable': '',
          'associatedQuery': '',
          'className': '',
          'combinedType_select_sort': '平均值,选中合计,当前页合计,所有合计'
        },
        {
          title: '执行数',
          // type: 'html',
          field: 'executionsAmount',
          width: '150',
          align: 'center',
          'filters': '[object Object]',
          'filterRender': {
            'name': 'FilterNumberCompare'
          },
          'combinedType': 'average,subTotal,total,totalAll',
          'cellRender': {
            'name': '$vxeMoney',
            'options': [],
            'defaultValue': '',
            'props': {}
          },
          'name': '$vxeMoney',
          'fixed': '',
          'formula': '',
          'constraint': '',
          'sortable': '',
          'associatedQuery': '',
          'className': '',
          'combinedType_select_sort': '平均值,选中合计,当前页合计,所有合计'
        },
        {
          title: '支出进度',
          field: 'expenditureProgress',
          width: '150',
          align: 'center',
          type: 'html'
        },
        {
          title: '未列支金额',
          // type: 'html',
          field: 'unlistedAmount',
          width: '150',
          align: 'center',
          'filters': '[object Object]',
          'filterRender': {
            'name': 'FilterNumberCompare'
          },
          'combinedType': 'average,subTotal,total,totalAll',
          'cellRender': {
            'name': '$vxeMoney',
            'options': [],
            'defaultValue': '',
            'props': {}
          },
          'name': '$vxeMoney',
          'fixed': '',
          'formula': '',
          'constraint': '',
          'sortable': '',
          'associatedQuery': '',
          'className': '',
          'combinedType_select_sort': '平均值,选中合计,当前页合计,所有合计'
        }
      ]
    },
    {
      title: '因公出国（境）费',
      field: '',
      width: '150',
      sortable: false,
      align: 'left',
      children: [
        {
          title: '年初预算数',
          field: 'goAbroadBeginningBudgetAmount',
          width: '150',
          align: 'center',
          'filters': '[object Object]',
          'filterRender': {
            'name': 'FilterNumberCompare'
          },
          'combinedType': 'average,subTotal,total,totalAll',
          'cellRender': {
            'name': '$vxeMoney',
            'options': [],
            'defaultValue': '',
            'props': {}
          },
          'name': '$vxeMoney',
          'fixed': '',
          'formula': '',
          'constraint': '',
          'sortable': '',
          'associatedQuery': '',
          'className': '',
          'combinedType_select_sort': '平均值,选中合计,当前页合计,所有合计'
        },
        {
          title: '预算调整数',
          field: 'goAbroadBudgetAdjustmentAmount',
          width: '150',
          align: 'center',
          'filters': '[object Object]',
          'filterRender': {
            'name': 'FilterNumberCompare'
          },
          'combinedType': 'average,subTotal,total,totalAll',
          'cellRender': {
            'name': '$vxeMoney',
            'options': [],
            'defaultValue': '',
            'props': {}
          },
          'name': '$vxeMoney',
          'fixed': '',
          'formula': '',
          'constraint': '',
          'sortable': '',
          'associatedQuery': '',
          'className': '',
          'combinedType_select_sort': '平均值,选中合计,当前页合计,所有合计'
        },
        {
          title: '调整预算数',
          field: 'goAbroadAdjustedBudgetAmount',
          width: '150',
          align: 'center',
          'filters': '[object Object]',
          'filterRender': {
            'name': 'FilterNumberCompare'
          },
          'combinedType': 'average,subTotal,total,totalAll',
          'cellRender': {
            'name': '$vxeMoney',
            'options': [],
            'defaultValue': '',
            'props': {}
          },
          'name': '$vxeMoney',
          'fixed': '',
          'formula': '',
          'constraint': '',
          'sortable': '',
          'associatedQuery': '',
          'className': '',
          'combinedType_select_sort': '平均值,选中合计,当前页合计,所有合计'
        },
        {
          title: '执行数',
          // type: 'html',
          field: 'goAbroadExecutionsAmount',
          width: '150',
          align: 'center',
          'filters': '[object Object]',
          'filterRender': {
            'name': 'FilterNumberCompare'
          },
          'combinedType': 'average,subTotal,total,totalAll',
          'cellRender': {
            'name': '$vxeMoney',
            'options': [],
            'defaultValue': '',
            'props': {}
          },
          'name': '$vxeMoney',
          'fixed': '',
          'formula': '',
          'constraint': '',
          'sortable': '',
          'associatedQuery': '',
          'className': '',
          'combinedType_select_sort': '平均值,选中合计,当前页合计,所有合计'
        },
        {
          title: '支出进度',
          field: 'goAbroadExpenditureProgress',
          width: '150',
          align: 'center',
          type: 'html'
        },
        {
          title: '未列支金额',
          // type: 'html',
          field: 'goAbroadUnlistedAmount',
          width: '150',
          align: 'center',
          'filters': '[object Object]',
          'filterRender': {
            'name': 'FilterNumberCompare'
          },
          'combinedType': 'average,subTotal,total,totalAll',
          'cellRender': {
            'name': '$vxeMoney',
            'options': [],
            'defaultValue': '',
            'props': {}
          },
          'name': '$vxeMoney',
          'fixed': '',
          'formula': '',
          'constraint': '',
          'sortable': '',
          'associatedQuery': '',
          'className': '',
          'combinedType_select_sort': '平均值,选中合计,当前页合计,所有合计'
        }
      ]
    },
    {
      title: '公务接待费',
      field: '',
      width: '150',
      sortable: false,
      align: 'left',
      children: [
        {
          title: '年初预算数',
          field: 'receptionBeginningBudgetAmount',
          width: '150',
          align: 'center',
          'filters': '[object Object]',
          'filterRender': {
            'name': 'FilterNumberCompare'
          },
          'combinedType': 'average,subTotal,total,totalAll',
          'cellRender': {
            'name': '$vxeMoney',
            'options': [],
            'defaultValue': '',
            'props': {}
          },
          'name': '$vxeMoney',
          'fixed': '',
          'formula': '',
          'constraint': '',
          'sortable': '',
          'associatedQuery': '',
          'className': '',
          'combinedType_select_sort': '平均值,选中合计,当前页合计,所有合计'
        },
        {
          title: '预算调整数',
          field: 'receptionBudgetAdjustmentAmount',
          width: '150',
          align: 'center',
          'filters': '[object Object]',
          'filterRender': {
            'name': 'FilterNumberCompare'
          },
          'combinedType': 'average,subTotal,total,totalAll',
          'cellRender': {
            'name': '$vxeMoney',
            'options': [],
            'defaultValue': '',
            'props': {}
          },
          'name': '$vxeMoney',
          'fixed': '',
          'formula': '',
          'constraint': '',
          'sortable': '',
          'associatedQuery': '',
          'className': '',
          'combinedType_select_sort': '平均值,选中合计,当前页合计,所有合计'
        },
        {
          title: '调整预算数',
          field: 'receptionAdjustedBudgetAmount',
          width: '150',
          align: 'center',
          'filters': '[object Object]',
          'filterRender': {
            'name': 'FilterNumberCompare'
          },
          'combinedType': 'average,subTotal,total,totalAll',
          'cellRender': {
            'name': '$vxeMoney',
            'options': [],
            'defaultValue': '',
            'props': {}
          },
          'name': '$vxeMoney',
          'fixed': '',
          'formula': '',
          'constraint': '',
          'sortable': '',
          'associatedQuery': '',
          'className': '',
          'combinedType_select_sort': '平均值,选中合计,当前页合计,所有合计'
        },
        {
          title: '执行数',
          // type: 'html',
          field: 'receptionExecutionsAmount',
          width: '150',
          align: 'center',
          'filters': '[object Object]',
          'filterRender': {
            'name': 'FilterNumberCompare'
          },
          'combinedType': 'average,subTotal,total,totalAll',
          'cellRender': {
            'name': '$vxeMoney',
            'options': [],
            'defaultValue': '',
            'props': {}
          },
          'name': '$vxeMoney',
          'fixed': '',
          'formula': '',
          'constraint': '',
          'sortable': '',
          'associatedQuery': '',
          'className': '',
          'combinedType_select_sort': '平均值,选中合计,当前页合计,所有合计'
        },
        {
          title: '支出进度',
          field: 'receptionExpenditureProgress',
          width: '150',
          align: 'center',
          type: 'html'
        },
        {
          title: '未列支金额',
          // type: 'html',
          field: 'receptionUnlistedAmount',
          width: '150',
          align: 'center',
          'filters': '[object Object]',
          'filterRender': {
            'name': 'FilterNumberCompare'
          },
          'combinedType': 'average,subTotal,total,totalAll',
          'cellRender': {
            'name': '$vxeMoney',
            'options': [],
            'defaultValue': '',
            'props': {}
          },
          'name': '$vxeMoney',
          'fixed': '',
          'formula': '',
          'constraint': '',
          'sortable': '',
          'associatedQuery': '',
          'className': '',
          'combinedType_select_sort': '平均值,选中合计,当前页合计,所有合计'
        }
      ]
    },
    {
      title: '公务用车购置及运行维护费',
      field: '',
      width: '150',
      sortable: false,
      align: 'left',
      children: [
        {
          title: '小计',
          field: '',
          width: '150',
          align: 'center',
          children: [
            {
              title: '年初预算数',
              field: 'vehicleSubtotalBeginningBudgetAmount',
              width: '150',
              align: 'center',
              'filters': '[object Object]',
              'filterRender': {
                'name': 'FilterNumberCompare'
              },
              'combinedType': 'average,subTotal,total,totalAll',
              'cellRender': {
                'name': '$vxeMoney',
                'options': [],
                'defaultValue': '',
                'props': {}
              },
              'name': '$vxeMoney',
              'fixed': '',
              'formula': '',
              'constraint': '',
              'sortable': '',
              'associatedQuery': '',
              'className': '',
              'combinedType_select_sort': '平均值,选中合计,当前页合计,所有合计'
            },
            {
              title: '预算调整数',
              field: 'vehicleSubtotalBudgetAdjustmentAmount',
              width: '150',
              align: 'center',
              'filters': '[object Object]',
              'filterRender': {
                'name': 'FilterNumberCompare'
              },
              'combinedType': 'average,subTotal,total,totalAll',
              'cellRender': {
                'name': '$vxeMoney',
                'options': [],
                'defaultValue': '',
                'props': {}
              },
              'name': '$vxeMoney',
              'fixed': '',
              'formula': '',
              'constraint': '',
              'sortable': '',
              'associatedQuery': '',
              'className': '',
              'combinedType_select_sort': '平均值,选中合计,当前页合计,所有合计'
            },
            {
              title: '调整预算数',
              field: 'vehicleSubtotalAdjustedBudgetAmount',
              width: '150',
              align: 'center',
              'filters': '[object Object]',
              'filterRender': {
                'name': 'FilterNumberCompare'
              },
              'combinedType': 'average,subTotal,total,totalAll',
              'cellRender': {
                'name': '$vxeMoney',
                'options': [],
                'defaultValue': '',
                'props': {}
              },
              'name': '$vxeMoney',
              'fixed': '',
              'formula': '',
              'constraint': '',
              'sortable': '',
              'associatedQuery': '',
              'className': '',
              'combinedType_select_sort': '平均值,选中合计,当前页合计,所有合计'
            },
            {
              title: '执行数',
              // type: 'html',
              field: 'vehicleSubtotalExecutionsAmount',
              width: '150',
              align: 'center',
              'filters': '[object Object]',
              'filterRender': {
                'name': 'FilterNumberCompare'
              },
              'combinedType': 'average,subTotal,total,totalAll',
              'cellRender': {
                'name': '$vxeMoney',
                'options': [],
                'defaultValue': '',
                'props': {}
              },
              'name': '$vxeMoney',
              'fixed': '',
              'formula': '',
              'constraint': '',
              'sortable': '',
              'associatedQuery': '',
              'className': '',
              'combinedType_select_sort': '平均值,选中合计,当前页合计,所有合计'
            },
            {
              title: '支出进度',
              field: 'vehicleSubtotalExpenditureProgress',
              width: '150',
              align: 'center',
              type: 'html'
            },
            {
              title: '未列支金额',
              // type: 'html',
              field: 'vehicleSubtotalUnlistedAmount',
              width: '150',
              align: 'center',
              'filters': '[object Object]',
              'filterRender': {
                'name': 'FilterNumberCompare'
              },
              'combinedType': 'average,subTotal,total,totalAll',
              'cellRender': {
                'name': '$vxeMoney',
                'options': [],
                'defaultValue': '',
                'props': {}
              },
              'name': '$vxeMoney',
              'fixed': '',
              'formula': '',
              'constraint': '',
              'sortable': '',
              'associatedQuery': '',
              'className': '',
              'combinedType_select_sort': '平均值,选中合计,当前页合计,所有合计'
            }
          ]
        },
        {
          title: '公车购置（30913）',
          field: '',
          width: '150',
          align: 'center',
          children: [
            {
              title: '年初预算数',
              field: 'vehiclePurchaseBeginningBudgetAmount',
              width: '150',
              align: 'center',
              'filters': '[object Object]',
              'filterRender': {
                'name': 'FilterNumberCompare'
              },
              'combinedType': 'average,subTotal,total,totalAll',
              'cellRender': {
                'name': '$vxeMoney',
                'options': [],
                'defaultValue': '',
                'props': {}
              },
              'name': '$vxeMoney',
              'fixed': '',
              'formula': '',
              'constraint': '',
              'sortable': '',
              'associatedQuery': '',
              'className': '',
              'combinedType_select_sort': '平均值,选中合计,当前页合计,所有合计'
            },
            {
              title: '预算调整数',
              field: 'vehiclePurchaseBudgetAdjustmentAmount',
              width: '150',
              align: 'center',
              'filters': '[object Object]',
              'filterRender': {
                'name': 'FilterNumberCompare'
              },
              'combinedType': 'average,subTotal,total,totalAll',
              'cellRender': {
                'name': '$vxeMoney',
                'options': [],
                'defaultValue': '',
                'props': {}
              },
              'name': '$vxeMoney',
              'fixed': '',
              'formula': '',
              'constraint': '',
              'sortable': '',
              'associatedQuery': '',
              'className': '',
              'combinedType_select_sort': '平均值,选中合计,当前页合计,所有合计'
            },
            {
              title: '调整预算数',
              field: 'vehiclePurchaseAdjustedBudgetAmount30913',
              width: '150',
              align: 'center',
              'filters': '[object Object]',
              'filterRender': {
                'name': 'FilterNumberCompare'
              },
              'combinedType': 'average,subTotal,total,totalAll',
              'cellRender': {
                'name': '$vxeMoney',
                'options': [],
                'defaultValue': '',
                'props': {}
              },
              'name': '$vxeMoney',
              'fixed': '',
              'formula': '',
              'constraint': '',
              'sortable': '',
              'associatedQuery': '',
              'className': '',
              'combinedType_select_sort': '平均值,选中合计,当前页合计,所有合计'
            },
            {
              title: '执行数',
              // type: 'html',
              field: 'vehiclePurchaseExecutionsAmount30913',
              width: '150',
              align: 'center',
              'filters': '[object Object]',
              'filterRender': {
                'name': 'FilterNumberCompare'
              },
              'combinedType': 'average,subTotal,total,totalAll',
              'cellRender': {
                'name': '$vxeMoney',
                'options': [],
                'defaultValue': '',
                'props': {}
              },
              'name': '$vxeMoney',
              'fixed': '',
              'formula': '',
              'constraint': '',
              'sortable': '',
              'associatedQuery': '',
              'className': '',
              'combinedType_select_sort': '平均值,选中合计,当前页合计,所有合计'
            },
            {
              title: '支出进度',
              field: 'vehiclePurchaseExpenditureProgress30913',
              width: '150',
              align: 'center',
              type: 'html'
            },
            {
              title: '未列支金额',
              // type: 'html',
              field: 'vehiclePurchaseUnlistedAmount30913',
              width: '150',
              align: 'center',
              'filters': '[object Object]',
              'filterRender': {
                'name': 'FilterNumberCompare'
              },
              'combinedType': 'average,subTotal,total,totalAll',
              'cellRender': {
                'name': '$vxeMoney',
                'options': [],
                'defaultValue': '',
                'props': {}
              },
              'name': '$vxeMoney',
              'fixed': '',
              'formula': '',
              'constraint': '',
              'sortable': '',
              'associatedQuery': '',
              'className': '',
              'combinedType_select_sort': '平均值,选中合计,当前页合计,所有合计'
            }
          ]
        },
        {
          title: '公车购置（31013）',
          field: '',
          width: '150',
          align: 'center',
          children: [
            {
              title: '年初预算数',
              field: 'vehiclePurchaseBeginningBudgetAmount',
              width: '150',
              align: 'center',
              'filters': '[object Object]',
              'filterRender': {
                'name': 'FilterNumberCompare'
              },
              'combinedType': 'average,subTotal,total,totalAll',
              'cellRender': {
                'name': '$vxeMoney',
                'options': [],
                'defaultValue': '',
                'props': {}
              },
              'name': '$vxeMoney',
              'fixed': '',
              'formula': '',
              'constraint': '',
              'sortable': '',
              'associatedQuery': '',
              'className': '',
              'combinedType_select_sort': '平均值,选中合计,当前页合计,所有合计'
            },
            {
              title: '预算调整数',
              field: 'vehiclePurchaseBudgetAdjustmentAmount',
              width: '150',
              align: 'center',
              'filters': '[object Object]',
              'filterRender': {
                'name': 'FilterNumberCompare'
              },
              'combinedType': 'average,subTotal,total,totalAll',
              'cellRender': {
                'name': '$vxeMoney',
                'options': [],
                'defaultValue': '',
                'props': {}
              },
              'name': '$vxeMoney',
              'fixed': '',
              'formula': '',
              'constraint': '',
              'sortable': '',
              'associatedQuery': '',
              'className': '',
              'combinedType_select_sort': '平均值,选中合计,当前页合计,所有合计'
            },
            {
              title: '调整预算数',
              field: 'vehiclePurchaseAdjustedBudgetAmount31013',
              width: '150',
              align: 'center',
              'filters': '[object Object]',
              'filterRender': {
                'name': 'FilterNumberCompare'
              },
              'combinedType': 'average,subTotal,total,totalAll',
              'cellRender': {
                'name': '$vxeMoney',
                'options': [],
                'defaultValue': '',
                'props': {}
              },
              'name': '$vxeMoney',
              'fixed': '',
              'formula': '',
              'constraint': '',
              'sortable': '',
              'associatedQuery': '',
              'className': '',
              'combinedType_select_sort': '平均值,选中合计,当前页合计,所有合计'
            },
            {
              title: '执行数',
              // type: 'html',
              field: 'vehiclePurchaseExecutionsAmount31013',
              width: '150',
              align: 'center',
              'filters': '[object Object]',
              'filterRender': {
                'name': 'FilterNumberCompare'
              },
              'combinedType': 'average,subTotal,total,totalAll',
              'cellRender': {
                'name': '$vxeMoney',
                'options': [],
                'defaultValue': '',
                'props': {}
              },
              'name': '$vxeMoney',
              'fixed': '',
              'formula': '',
              'constraint': '',
              'sortable': '',
              'associatedQuery': '',
              'className': '',
              'combinedType_select_sort': '平均值,选中合计,当前页合计,所有合计'
            },
            {
              title: '支出进度',
              field: 'vehiclePurchaseExpenditureProgress31013',
              width: '150',
              align: 'center',
              type: 'html'
            },
            {
              title: '未列支金额',
              // type: 'html',
              field: 'vehiclePurchaseUnlistedAmount31013',
              width: '150',
              align: 'center',
              'filters': '[object Object]',
              'filterRender': {
                'name': 'FilterNumberCompare'
              },
              'combinedType': 'average,subTotal,total,totalAll',
              'cellRender': {
                'name': '$vxeMoney',
                'options': [],
                'defaultValue': '',
                'props': {}
              },
              'name': '$vxeMoney',
              'fixed': '',
              'formula': '',
              'constraint': '',
              'sortable': '',
              'associatedQuery': '',
              'className': '',
              'combinedType_select_sort': '平均值,选中合计,当前页合计,所有合计'
            }
          ]
        },
        {
          title: '公车运维',
          field: '',
          width: '150',
          align: 'center',
          children: [
            {
              title: '年初预算数',
              field: 'vehicleDevopsBeginningBudgetAmount',
              width: '150',
              align: 'center',
              'filters': '[object Object]',
              'filterRender': {
                'name': 'FilterNumberCompare'
              },
              'combinedType': 'average,subTotal,total,totalAll',
              'cellRender': {
                'name': '$vxeMoney',
                'options': [],
                'defaultValue': '',
                'props': {}
              },
              'name': '$vxeMoney',
              'fixed': '',
              'formula': '',
              'constraint': '',
              'sortable': '',
              'associatedQuery': '',
              'className': '',
              'combinedType_select_sort': '平均值,选中合计,当前页合计,所有合计'
            },
            {
              title: '预算调整数',
              field: 'vehicleDevopsBudgetAdjustmentAmount',
              width: '150',
              align: 'center',
              'filters': '[object Object]',
              'filterRender': {
                'name': 'FilterNumberCompare'
              },
              'combinedType': 'average,subTotal,total,totalAll',
              'cellRender': {
                'name': '$vxeMoney',
                'options': [],
                'defaultValue': '',
                'props': {}
              },
              'name': '$vxeMoney',
              'fixed': '',
              'formula': '',
              'constraint': '',
              'sortable': '',
              'associatedQuery': '',
              'className': '',
              'combinedType_select_sort': '平均值,选中合计,当前页合计,所有合计'
            },
            {
              title: '调整预算数',
              field: 'vehicleDevopsAdjustedBudgetAmount',
              width: '150',
              align: 'center',
              'filters': '[object Object]',
              'filterRender': {
                'name': 'FilterNumberCompare'
              },
              'combinedType': 'average,subTotal,total,totalAll',
              'cellRender': {
                'name': '$vxeMoney',
                'options': [],
                'defaultValue': '',
                'props': {}
              },
              'name': '$vxeMoney',
              'fixed': '',
              'formula': '',
              'constraint': '',
              'sortable': '',
              'associatedQuery': '',
              'className': '',
              'combinedType_select_sort': '平均值,选中合计,当前页合计,所有合计'
            },
            {
              title: '执行数',
              // type: 'html',
              field: 'vehicleDevopsExecutionsAmount',
              width: '150',
              align: 'center',
              'filters': '[object Object]',
              'filterRender': {
                'name': 'FilterNumberCompare'
              },
              'combinedType': 'average,subTotal,total,totalAll',
              'cellRender': {
                'name': '$vxeMoney',
                'options': [],
                'defaultValue': '',
                'props': {}
              },
              'name': '$vxeMoney',
              'fixed': '',
              'formula': '',
              'constraint': '',
              'sortable': '',
              'associatedQuery': '',
              'className': '',
              'combinedType_select_sort': '平均值,选中合计,当前页合计,所有合计'
            },
            {
              title: '支出进度',
              field: 'vehicleDevopsExpenditureProgress',
              width: '150',
              align: 'center',
              type: 'html'
            },
            {
              title: '未列支金额',
              // type: 'html',
              field: 'vehicleDevopsUnlistedAmount',
              width: '150',
              align: 'center',
              'filters': '[object Object]',
              'filterRender': {
                'name': 'FilterNumberCompare'
              },
              'combinedType': 'average,subTotal,total,totalAll',
              'cellRender': {
                'name': '$vxeMoney',
                'options': [],
                'defaultValue': '',
                'props': {}
              },
              'name': '$vxeMoney',
              'fixed': '',
              'formula': '',
              'constraint': '',
              'sortable': '',
              'associatedQuery': '',
              'className': '',
              'combinedType_select_sort': '平均值,选中合计,当前页合计,所有合计'
            }
          ]
        }
      ]
    },
    {
      title: '会议费',
      field: '',
      width: '150',
      sortable: false,
      align: 'left',
      children: [
        {
          title: '年初预算数',
          field: 'meetingBeginningBudgetAmount',
          width: '150',
          align: 'center',
          'filters': '[object Object]',
          'filterRender': {
            'name': 'FilterNumberCompare'
          },
          'combinedType': 'average,subTotal,total,totalAll',
          'cellRender': {
            'name': '$vxeMoney',
            'options': [],
            'defaultValue': '',
            'props': {}
          },
          'name': '$vxeMoney',
          'fixed': '',
          'formula': '',
          'constraint': '',
          'sortable': '',
          'associatedQuery': '',
          'className': '',
          'combinedType_select_sort': '平均值,选中合计,当前页合计,所有合计'
        },
        {
          title: '预算调整数',
          field: 'meetingBudgetAdjustmentAmount',
          width: '150',
          align: 'center',
          'filters': '[object Object]',
          'filterRender': {
            'name': 'FilterNumberCompare'
          },
          'combinedType': 'average,subTotal,total,totalAll',
          'cellRender': {
            'name': '$vxeMoney',
            'options': [],
            'defaultValue': '',
            'props': {}
          },
          'name': '$vxeMoney',
          'fixed': '',
          'formula': '',
          'constraint': '',
          'sortable': '',
          'associatedQuery': '',
          'className': '',
          'combinedType_select_sort': '平均值,选中合计,当前页合计,所有合计'
        },
        {
          title: '调整预算数',
          field: 'meetingAdjustedBudgetAmount',
          width: '150',
          align: 'center',
          'filters': '[object Object]',
          'filterRender': {
            'name': 'FilterNumberCompare'
          },
          'combinedType': 'average,subTotal,total,totalAll',
          'cellRender': {
            'name': '$vxeMoney',
            'options': [],
            'defaultValue': '',
            'props': {}
          },
          'name': '$vxeMoney',
          'fixed': '',
          'formula': '',
          'constraint': '',
          'sortable': '',
          'associatedQuery': '',
          'className': '',
          'combinedType_select_sort': '平均值,选中合计,当前页合计,所有合计'
        },
        {
          title: '执行数',
          // type: 'html',
          field: 'meetingExecutionsAmount',
          width: '150',
          align: 'center',
          'filters': '[object Object]',
          'filterRender': {
            'name': 'FilterNumberCompare'
          },
          'combinedType': 'average,subTotal,total,totalAll',
          'cellRender': {
            'name': '$vxeMoney',
            'options': [],
            'defaultValue': '',
            'props': {}
          },
          'name': '$vxeMoney',
          'fixed': '',
          'formula': '',
          'constraint': '',
          'sortable': '',
          'associatedQuery': '',
          'className': '',
          'combinedType_select_sort': '平均值,选中合计,当前页合计,所有合计'
        },
        {
          title: '支出进度',
          field: 'meetingExpenditureProgress',
          width: '150',
          align: 'center',
          type: 'html'
        },
        {
          title: '未列支金额',
          // type: 'html',
          field: 'meetingUnlistedAmount',
          width: '150',
          align: 'center',
          'filters': '[object Object]',
          'filterRender': {
            'name': 'FilterNumberCompare'
          },
          'combinedType': 'average,subTotal,total,totalAll',
          'cellRender': {
            'name': '$vxeMoney',
            'options': [],
            'defaultValue': '',
            'props': {}
          },
          'name': '$vxeMoney',
          'fixed': '',
          'formula': '',
          'constraint': '',
          'sortable': '',
          'associatedQuery': '',
          'className': '',
          'combinedType_select_sort': '平均值,选中合计,当前页合计,所有合计'
        }
      ]
    },
    {
      title: '培训费',
      field: '',
      width: '150',
      sortable: false,
      align: 'left',
      children: [
        {
          title: '年初预算数',
          field: 'trainBeginningBudgetAmount',
          width: '150',
          align: 'center',
          'filters': '[object Object]',
          'filterRender': {
            'name': 'FilterNumberCompare'
          },
          'combinedType': 'average,subTotal,total,totalAll',
          'cellRender': {
            'name': '$vxeMoney',
            'options': [],
            'defaultValue': '',
            'props': {}
          },
          'name': '$vxeMoney',
          'fixed': '',
          'formula': '',
          'constraint': '',
          'sortable': '',
          'associatedQuery': '',
          'className': '',
          'combinedType_select_sort': '平均值,选中合计,当前页合计,所有合计'
        },
        {
          title: '预算调整数',
          field: 'trainBudgetAdjustmentAmount',
          width: '150',
          align: 'center',
          'filters': '[object Object]',
          'filterRender': {
            'name': 'FilterNumberCompare'
          },
          'combinedType': 'average,subTotal,total,totalAll',
          'cellRender': {
            'name': '$vxeMoney',
            'options': [],
            'defaultValue': '',
            'props': {}
          },
          'name': '$vxeMoney',
          'fixed': '',
          'formula': '',
          'constraint': '',
          'sortable': '',
          'associatedQuery': '',
          'className': '',
          'combinedType_select_sort': '平均值,选中合计,当前页合计,所有合计'
        },
        {
          title: '调整预算数',
          field: 'trainAdjustedBudgetAmount',
          width: '150',
          align: 'center',
          'filters': '[object Object]',
          'filterRender': {
            'name': 'FilterNumberCompare'
          },
          'combinedType': 'average,subTotal,total,totalAll',
          'cellRender': {
            'name': '$vxeMoney',
            'options': [],
            'defaultValue': '',
            'props': {}
          },
          'name': '$vxeMoney',
          'fixed': '',
          'formula': '',
          'constraint': '',
          'sortable': '',
          'associatedQuery': '',
          'className': '',
          'combinedType_select_sort': '平均值,选中合计,当前页合计,所有合计'
        },
        {
          title: '执行数',
          // type: 'html',
          field: 'trainExecutionsAmount',
          width: '150',
          align: 'center',
          'filters': '[object Object]',
          'filterRender': {
            'name': 'FilterNumberCompare'
          },
          'combinedType': 'average,subTotal,total,totalAll',
          'cellRender': {
            'name': '$vxeMoney',
            'options': [],
            'defaultValue': '',
            'props': {}
          },
          'name': '$vxeMoney',
          'fixed': '',
          'formula': '',
          'constraint': '',
          'sortable': '',
          'associatedQuery': '',
          'className': '',
          'combinedType_select_sort': '平均值,选中合计,当前页合计,所有合计'
        },
        {
          title: '支出进度',
          field: 'trainExpenditureProgress',
          width: '150',
          align: 'center',
          type: 'html'
        },
        {
          title: '未列支金额',
          // type: 'html',
          field: 'trainUnlistedAmount',
          width: '150',
          align: 'center',
          'filters': '[object Object]',
          'filterRender': {
            'name': 'FilterNumberCompare'
          },
          'combinedType': 'average,subTotal,total,totalAll',
          'cellRender': {
            'name': '$vxeMoney',
            'options': [],
            'defaultValue': '',
            'props': {}
          },
          'name': '$vxeMoney',
          'fixed': '',
          'formula': '',
          'constraint': '',
          'sortable': '',
          'associatedQuery': '',
          'className': '',
          'combinedType_select_sort': '平均值,选中合计,当前页合计,所有合计'
        }
      ]
    }
  ],
  PoliciesTableColumns2: [
    {
      title: '区划',
      field: 'mofDiv',
      width: '190',
      sortable: false,
      align: 'left'
    },
    {
      title: '合计',
      field: '',
      width: '150',
      sortable: false,
      align: 'left',
      children: [
        {
          title: '上年决算数',
          field: 'finalAccounts',
          width: '150',
          align: 'center',
          'filters': '[object Object]',
          'filterRender': {
            'name': 'FilterNumberCompare'
          },
          'combinedType': 'average,subTotal,total,totalAll',
          'cellRender': {
            'name': '$vxeMoney',
            'options': [],
            'defaultValue': '',
            'props': {}
          },
          'name': '$vxeMoney',
          'fixed': '',
          'formula': '',
          'constraint': '',
          'sortable': '',
          'associatedQuery': '',
          'className': '',
          'combinedType_select_sort': '平均值,选中合计,当前页合计,所有合计'
        },
        {
          title: '预算数',
          field: 'budgetAmount',
          width: '150',
          align: 'center',
          'filters': '[object Object]',
          'filterRender': {
            'name': 'FilterNumberCompare'
          },
          'combinedType': 'average,subTotal,total,totalAll',
          'cellRender': {
            'name': '$vxeMoney',
            'options': [],
            'defaultValue': '',
            'props': {}
          },
          'name': '$vxeMoney',
          'fixed': '',
          'formula': '',
          'constraint': '',
          'sortable': '',
          'associatedQuery': '',
          'className': '',
          'combinedType_select_sort': '平均值,选中合计,当前页合计,所有合计'
        },
        {
          title: '执行数',
          field: 'executionsAmount',
          width: '150',
          align: 'center',
          'filters': '[object Object]',
          'filterRender': {
            'name': 'FilterNumberCompare'
          },
          'combinedType': 'average,subTotal,total,totalAll',
          'cellRender': {
            'name': '$vxeMoney',
            'options': [],
            'defaultValue': '',
            'props': {}
          },
          'name': '$vxeMoney',
          'fixed': '',
          'formula': '',
          'constraint': '',
          'sortable': '',
          'associatedQuery': '',
          'className': '',
          'combinedType_select_sort': '平均值,选中合计,当前页合计,所有合计'
        },
        {
          title: '核算数',
          // type: 'html',
          field: 'accountingAmount',
          width: '150',
          align: 'center',
          'filters': '[object Object]',
          'filterRender': {
            'name': 'FilterNumberCompare'
          },
          'combinedType': 'average,subTotal,total,totalAll',
          'cellRender': {
            'name': '$vxeMoney',
            'options': [],
            'defaultValue': '',
            'props': {}
          },
          'name': '$vxeMoney',
          'fixed': '',
          'formula': '',
          'constraint': '',
          'sortable': '',
          'associatedQuery': '',
          'className': '',
          'combinedType_select_sort': '平均值,选中合计,当前页合计,所有合计'
        }
      ]
    },
    {
      title: '因公出国（境）费',
      field: '',
      width: '150',
      sortable: false,
      align: 'left',
      children: [
        {
          title: '上年决算数',
          field: 'finalAccounts30212',
          width: '150',
          align: 'center',
          'filters': '[object Object]',
          'filterRender': {
            'name': 'FilterNumberCompare'
          },
          'combinedType': 'average,subTotal,total,totalAll',
          'cellRender': {
            'name': '$vxeMoney',
            'options': [],
            'defaultValue': '',
            'props': {}
          },
          'name': '$vxeMoney',
          'fixed': '',
          'formula': '',
          'constraint': '',
          'sortable': '',
          'associatedQuery': '',
          'className': '',
          'combinedType_select_sort': '平均值,选中合计,当前页合计,所有合计'
        },
        {
          title: '预算数',
          field: 'budgetAmount30212',
          width: '150',
          align: 'center',
          'filters': '[object Object]',
          'filterRender': {
            'name': 'FilterNumberCompare'
          },
          'combinedType': 'average,subTotal,total,totalAll',
          'cellRender': {
            'name': '$vxeMoney',
            'options': [],
            'defaultValue': '',
            'props': {}
          },
          'name': '$vxeMoney',
          'fixed': '',
          'formula': '',
          'constraint': '',
          'sortable': '',
          'associatedQuery': '',
          'className': '',
          'combinedType_select_sort': '平均值,选中合计,当前页合计,所有合计'
        },
        {
          title: '执行数',
          field: 'executionsAmount30212',
          width: '150',
          align: 'center',
          'filters': '[object Object]',
          'filterRender': {
            'name': 'FilterNumberCompare'
          },
          'combinedType': 'average,subTotal,total,totalAll',
          'cellRender': {
            'name': '$vxeMoney',
            'options': [],
            'defaultValue': '',
            'props': {}
          },
          'name': '$vxeMoney',
          'fixed': '',
          'formula': '',
          'constraint': '',
          'sortable': '',
          'associatedQuery': '',
          'className': '',
          'combinedType_select_sort': '平均值,选中合计,当前页合计,所有合计'
        },
        {
          title: '核算数',
          // type: 'html',
          field: 'accountingAmount30212',
          width: '150',
          align: 'center',
          'filters': '[object Object]',
          'filterRender': {
            'name': 'FilterNumberCompare'
          },
          'combinedType': 'average,subTotal,total,totalAll',
          'cellRender': {
            'name': '$vxeMoney',
            'options': [],
            'defaultValue': '',
            'props': {}
          },
          'name': '$vxeMoney',
          'fixed': '',
          'formula': '',
          'constraint': '',
          'sortable': '',
          'associatedQuery': '',
          'className': '',
          'combinedType_select_sort': '平均值,选中合计,当前页合计,所有合计'
        }
      ]
    },
    {
      title: '公务接待费',
      field: '',
      width: '150',
      sortable: false,
      align: 'left',
      children: [
        {
          title: '上年决算数',
          field: 'finalAccounts30217',
          width: '150',
          align: 'center',
          'filters': '[object Object]',
          'filterRender': {
            'name': 'FilterNumberCompare'
          },
          'combinedType': 'average,subTotal,total,totalAll',
          'cellRender': {
            'name': '$vxeMoney',
            'options': [],
            'defaultValue': '',
            'props': {}
          },
          'name': '$vxeMoney',
          'fixed': '',
          'formula': '',
          'constraint': '',
          'sortable': '',
          'associatedQuery': '',
          'className': '',
          'combinedType_select_sort': '平均值,选中合计,当前页合计,所有合计'
        },
        {
          title: '预算数',
          field: 'budgetAmount30217',
          width: '150',
          align: 'center',
          'filters': '[object Object]',
          'filterRender': {
            'name': 'FilterNumberCompare'
          },
          'combinedType': 'average,subTotal,total,totalAll',
          'cellRender': {
            'name': '$vxeMoney',
            'options': [],
            'defaultValue': '',
            'props': {}
          },
          'name': '$vxeMoney',
          'fixed': '',
          'formula': '',
          'constraint': '',
          'sortable': '',
          'associatedQuery': '',
          'className': '',
          'combinedType_select_sort': '平均值,选中合计,当前页合计,所有合计'
        },
        {
          title: '执行数',
          field: 'executionsAmount30217',
          width: '150',
          align: 'center',
          'filters': '[object Object]',
          'filterRender': {
            'name': 'FilterNumberCompare'
          },
          'combinedType': 'average,subTotal,total,totalAll',
          'cellRender': {
            'name': '$vxeMoney',
            'options': [],
            'defaultValue': '',
            'props': {}
          },
          'name': '$vxeMoney',
          'fixed': '',
          'formula': '',
          'constraint': '',
          'sortable': '',
          'associatedQuery': '',
          'className': '',
          'combinedType_select_sort': '平均值,选中合计,当前页合计,所有合计'
        },
        {
          title: '核算数',
          // type: 'html',
          field: 'accountingAmount30217',
          width: '150',
          align: 'center',
          'filters': '[object Object]',
          'filterRender': {
            'name': 'FilterNumberCompare'
          },
          'combinedType': 'average,subTotal,total,totalAll',
          'cellRender': {
            'name': '$vxeMoney',
            'options': [],
            'defaultValue': '',
            'props': {}
          },
          'name': '$vxeMoney',
          'fixed': '',
          'formula': '',
          'constraint': '',
          'sortable': '',
          'associatedQuery': '',
          'className': '',
          'combinedType_select_sort': '平均值,选中合计,当前页合计,所有合计'
        }
      ]
    },
    {
      title: '公务用车购置及运行维护费',
      field: '',
      width: '150',
      sortable: false,
      align: 'left',
      children: [
        {
          title: '小计',
          field: '',
          width: '150',
          align: 'center',
          children: [
            {
              title: '上年决算数',
              field: 'finalAccountsBus',
              width: '150',
              align: 'center',
              'filters': '[object Object]',
              'filterRender': {
                'name': 'FilterNumberCompare'
              },
              'combinedType': 'average,subTotal,total,totalAll',
              'cellRender': {
                'name': '$vxeMoney',
                'options': [],
                'defaultValue': '',
                'props': {}
              },
              'name': '$vxeMoney',
              'fixed': '',
              'formula': '',
              'constraint': '',
              'sortable': '',
              'associatedQuery': '',
              'className': '',
              'combinedType_select_sort': '平均值,选中合计,当前页合计,所有合计'
            },
            {
              title: '预算数',
              field: 'budgetAmountBus',
              width: '150',
              align: 'center',
              'filters': '[object Object]',
              'filterRender': {
                'name': 'FilterNumberCompare'
              },
              'combinedType': 'average,subTotal,total,totalAll',
              'cellRender': {
                'name': '$vxeMoney',
                'options': [],
                'defaultValue': '',
                'props': {}
              },
              'name': '$vxeMoney',
              'fixed': '',
              'formula': '',
              'constraint': '',
              'sortable': '',
              'associatedQuery': '',
              'className': '',
              'combinedType_select_sort': '平均值,选中合计,当前页合计,所有合计'
            },
            {
              title: '执行数',
              field: 'executionsAmountBus',
              width: '150',
              align: 'center',
              'filters': '[object Object]',
              'filterRender': {
                'name': 'FilterNumberCompare'
              },
              'combinedType': 'average,subTotal,total,totalAll',
              'cellRender': {
                'name': '$vxeMoney',
                'options': [],
                'defaultValue': '',
                'props': {}
              },
              'name': '$vxeMoney',
              'fixed': '',
              'formula': '',
              'constraint': '',
              'sortable': '',
              'associatedQuery': '',
              'className': '',
              'combinedType_select_sort': '平均值,选中合计,当前页合计,所有合计'
            },
            {
              title: '核算数',
              // type: 'html',
              field: 'accountingAmountBus',
              width: '150',
              align: 'center',
              'filters': '[object Object]',
              'filterRender': {
                'name': 'FilterNumberCompare'
              },
              'combinedType': 'average,subTotal,total,totalAll',
              'cellRender': {
                'name': '$vxeMoney',
                'options': [],
                'defaultValue': '',
                'props': {}
              },
              'name': '$vxeMoney',
              'fixed': '',
              'formula': '',
              'constraint': '',
              'sortable': '',
              'associatedQuery': '',
              'className': '',
              'combinedType_select_sort': '平均值,选中合计,当前页合计,所有合计'
            }
          ]
        },
        {
          title: '公车购置（30913）',
          field: '',
          width: '150',
          align: 'center',
          children: [
            {
              title: '上年决算数',
              field: 'finalAccounts30913',
              width: '150',
              align: 'center',
              'filters': '[object Object]',
              'filterRender': {
                'name': 'FilterNumberCompare'
              },
              'combinedType': 'average,subTotal,total,totalAll',
              'cellRender': {
                'name': '$vxeMoney',
                'options': [],
                'defaultValue': '',
                'props': {}
              },
              'name': '$vxeMoney',
              'fixed': '',
              'formula': '',
              'constraint': '',
              'sortable': '',
              'associatedQuery': '',
              'className': '',
              'combinedType_select_sort': '平均值,选中合计,当前页合计,所有合计'
            },
            {
              title: '预算数',
              field: 'budgetAmount30913',
              width: '150',
              align: 'center',
              'filters': '[object Object]',
              'filterRender': {
                'name': 'FilterNumberCompare'
              },
              'combinedType': 'average,subTotal,total,totalAll',
              'cellRender': {
                'name': '$vxeMoney',
                'options': [],
                'defaultValue': '',
                'props': {}
              },
              'name': '$vxeMoney',
              'fixed': '',
              'formula': '',
              'constraint': '',
              'sortable': '',
              'associatedQuery': '',
              'className': '',
              'combinedType_select_sort': '平均值,选中合计,当前页合计,所有合计'
            },
            {
              title: '执行数',
              field: 'executionsAmount30913',
              width: '150',
              align: 'center',
              'filters': '[object Object]',
              'filterRender': {
                'name': 'FilterNumberCompare'
              },
              'combinedType': 'average,subTotal,total,totalAll',
              'cellRender': {
                'name': '$vxeMoney',
                'options': [],
                'defaultValue': '',
                'props': {}
              },
              'name': '$vxeMoney',
              'fixed': '',
              'formula': '',
              'constraint': '',
              'sortable': '',
              'associatedQuery': '',
              'className': '',
              'combinedType_select_sort': '平均值,选中合计,当前页合计,所有合计'
            },
            {
              title: '核算数',
              // type: 'html',
              field: 'accountingAmount30913',
              width: '150',
              align: 'center',
              'filters': '[object Object]',
              'filterRender': {
                'name': 'FilterNumberCompare'
              },
              'combinedType': 'average,subTotal,total,totalAll',
              'cellRender': {
                'name': '$vxeMoney',
                'options': [],
                'defaultValue': '',
                'props': {}
              },
              'name': '$vxeMoney',
              'fixed': '',
              'formula': '',
              'constraint': '',
              'sortable': '',
              'associatedQuery': '',
              'className': '',
              'combinedType_select_sort': '平均值,选中合计,当前页合计,所有合计'
            }
          ]
        },
        {
          title: '公车购置（31013）',
          field: '',
          width: '150',
          align: 'center',
          children: [
            {
              title: '上年决算数',
              field: 'finalAccounts31013',
              width: '150',
              align: 'center',
              'filters': '[object Object]',
              'filterRender': {
                'name': 'FilterNumberCompare'
              },
              'combinedType': 'average,subTotal,total,totalAll',
              'cellRender': {
                'name': '$vxeMoney',
                'options': [],
                'defaultValue': '',
                'props': {}
              },
              'name': '$vxeMoney',
              'fixed': '',
              'formula': '',
              'constraint': '',
              'sortable': '',
              'associatedQuery': '',
              'className': '',
              'combinedType_select_sort': '平均值,选中合计,当前页合计,所有合计'
            },
            {
              title: '预算数',
              field: 'budgetAmount31013',
              width: '150',
              align: 'center',
              'filters': '[object Object]',
              'filterRender': {
                'name': 'FilterNumberCompare'
              },
              'combinedType': 'average,subTotal,total,totalAll',
              'cellRender': {
                'name': '$vxeMoney',
                'options': [],
                'defaultValue': '',
                'props': {}
              },
              'name': '$vxeMoney',
              'fixed': '',
              'formula': '',
              'constraint': '',
              'sortable': '',
              'associatedQuery': '',
              'className': '',
              'combinedType_select_sort': '平均值,选中合计,当前页合计,所有合计'
            },
            {
              title: '执行数',
              field: 'executionsAmount31013',
              width: '150',
              align: 'center',
              'filters': '[object Object]',
              'filterRender': {
                'name': 'FilterNumberCompare'
              },
              'combinedType': 'average,subTotal,total,totalAll',
              'cellRender': {
                'name': '$vxeMoney',
                'options': [],
                'defaultValue': '',
                'props': {}
              },
              'name': '$vxeMoney',
              'fixed': '',
              'formula': '',
              'constraint': '',
              'sortable': '',
              'associatedQuery': '',
              'className': '',
              'combinedType_select_sort': '平均值,选中合计,当前页合计,所有合计'
            },
            {
              title: '核算数',
              // type: 'html',
              field: 'accountingAmount31013',
              width: '150',
              align: 'center',
              'filters': '[object Object]',
              'filterRender': {
                'name': 'FilterNumberCompare'
              },
              'combinedType': 'average,subTotal,total,totalAll',
              'cellRender': {
                'name': '$vxeMoney',
                'options': [],
                'defaultValue': '',
                'props': {}
              },
              'name': '$vxeMoney',
              'fixed': '',
              'formula': '',
              'constraint': '',
              'sortable': '',
              'associatedQuery': '',
              'className': '',
              'combinedType_select_sort': '平均值,选中合计,当前页合计,所有合计'
            }
          ]
        },
        {
          title: '公车运维',
          field: '',
          width: '150',
          align: 'center',
          children: [
            {
              title: '上年决算数',
              field: 'finalAccounts30231',
              width: '150',
              align: 'center',
              'filters': '[object Object]',
              'filterRender': {
                'name': 'FilterNumberCompare'
              },
              'combinedType': 'average,subTotal,total,totalAll',
              'cellRender': {
                'name': '$vxeMoney',
                'options': [],
                'defaultValue': '',
                'props': {}
              },
              'name': '$vxeMoney',
              'fixed': '',
              'formula': '',
              'constraint': '',
              'sortable': '',
              'associatedQuery': '',
              'className': '',
              'combinedType_select_sort': '平均值,选中合计,当前页合计,所有合计'
            },
            {
              title: '预算数',
              field: 'budgetAmount30231',
              width: '150',
              align: 'center',
              'filters': '[object Object]',
              'filterRender': {
                'name': 'FilterNumberCompare'
              },
              'combinedType': 'average,subTotal,total,totalAll',
              'cellRender': {
                'name': '$vxeMoney',
                'options': [],
                'defaultValue': '',
                'props': {}
              },
              'name': '$vxeMoney',
              'fixed': '',
              'formula': '',
              'constraint': '',
              'sortable': '',
              'associatedQuery': '',
              'className': '',
              'combinedType_select_sort': '平均值,选中合计,当前页合计,所有合计'
            },
            {
              title: '执行数',
              field: 'executionsAmount30231',
              width: '150',
              align: 'center',
              'filters': '[object Object]',
              'filterRender': {
                'name': 'FilterNumberCompare'
              },
              'combinedType': 'average,subTotal,total,totalAll',
              'cellRender': {
                'name': '$vxeMoney',
                'options': [],
                'defaultValue': '',
                'props': {}
              },
              'name': '$vxeMoney',
              'fixed': '',
              'formula': '',
              'constraint': '',
              'sortable': '',
              'associatedQuery': '',
              'className': '',
              'combinedType_select_sort': '平均值,选中合计,当前页合计,所有合计'
            },
            {
              title: '核算数',
              // type: 'html',
              field: 'accountingAmount30231',
              width: '150',
              align: 'center',
              'filters': '[object Object]',
              'filterRender': {
                'name': 'FilterNumberCompare'
              },
              'combinedType': 'average,subTotal,total,totalAll',
              'cellRender': {
                'name': '$vxeMoney',
                'options': [],
                'defaultValue': '',
                'props': {}
              },
              'name': '$vxeMoney',
              'fixed': '',
              'formula': '',
              'constraint': '',
              'sortable': '',
              'associatedQuery': '',
              'className': '',
              'combinedType_select_sort': '平均值,选中合计,当前页合计,所有合计'
            }
          ]
        }
      ]
    },
    {
      title: '会议费',
      field: '',
      width: '150',
      sortable: false,
      align: 'left',
      children: [
        {
          title: '上年决算数',
          field: 'finalAccounts30215',
          width: '150',
          align: 'center',
          'filters': '[object Object]',
          'filterRender': {
            'name': 'FilterNumberCompare'
          },
          'combinedType': 'average,subTotal,total,totalAll',
          'cellRender': {
            'name': '$vxeMoney',
            'options': [],
            'defaultValue': '',
            'props': {}
          },
          'name': '$vxeMoney',
          'fixed': '',
          'formula': '',
          'constraint': '',
          'sortable': '',
          'associatedQuery': '',
          'className': '',
          'combinedType_select_sort': '平均值,选中合计,当前页合计,所有合计'
        },
        {
          title: '预算数',
          field: 'budgetAmount30215',
          width: '150',
          align: 'center',
          'filters': '[object Object]',
          'filterRender': {
            'name': 'FilterNumberCompare'
          },
          'combinedType': 'average,subTotal,total,totalAll',
          'cellRender': {
            'name': '$vxeMoney',
            'options': [],
            'defaultValue': '',
            'props': {}
          },
          'name': '$vxeMoney',
          'fixed': '',
          'formula': '',
          'constraint': '',
          'sortable': '',
          'associatedQuery': '',
          'className': '',
          'combinedType_select_sort': '平均值,选中合计,当前页合计,所有合计'
        },
        {
          title: '执行数',
          field: 'executionsAmount30215',
          width: '150',
          align: 'center',
          'filters': '[object Object]',
          'filterRender': {
            'name': 'FilterNumberCompare'
          },
          'combinedType': 'average,subTotal,total,totalAll',
          'cellRender': {
            'name': '$vxeMoney',
            'options': [],
            'defaultValue': '',
            'props': {}
          },
          'name': '$vxeMoney',
          'fixed': '',
          'formula': '',
          'constraint': '',
          'sortable': '',
          'associatedQuery': '',
          'className': '',
          'combinedType_select_sort': '平均值,选中合计,当前页合计,所有合计'
        },
        {
          title: '核算数',
          // type: 'html',
          field: 'accountingAmount30215',
          width: '150',
          align: 'center',
          'filters': '[object Object]',
          'filterRender': {
            'name': 'FilterNumberCompare'
          },
          'combinedType': 'average,subTotal,total,totalAll',
          'cellRender': {
            'name': '$vxeMoney',
            'options': [],
            'defaultValue': '',
            'props': {}
          },
          'name': '$vxeMoney',
          'fixed': '',
          'formula': '',
          'constraint': '',
          'sortable': '',
          'associatedQuery': '',
          'className': '',
          'combinedType_select_sort': '平均值,选中合计,当前页合计,所有合计'
        }
      ]
    },
    {
      title: '培训费',
      field: '',
      width: '150',
      sortable: false,
      align: 'left',
      children: [
        {
          title: '上年决算数',
          field: 'finalAccounts30216',
          width: '150',
          align: 'center',
          'filters': '[object Object]',
          'filterRender': {
            'name': 'FilterNumberCompare'
          },
          'combinedType': 'average,subTotal,total,totalAll',
          'cellRender': {
            'name': '$vxeMoney',
            'options': [],
            'defaultValue': '',
            'props': {}
          },
          'name': '$vxeMoney',
          'fixed': '',
          'formula': '',
          'constraint': '',
          'sortable': '',
          'associatedQuery': '',
          'className': '',
          'combinedType_select_sort': '平均值,选中合计,当前页合计,所有合计'
        },
        {
          title: '预算数',
          field: 'budgetAmount30216',
          width: '150',
          align: 'center',
          'filters': '[object Object]',
          'filterRender': {
            'name': 'FilterNumberCompare'
          },
          'combinedType': 'average,subTotal,total,totalAll',
          'cellRender': {
            'name': '$vxeMoney',
            'options': [],
            'defaultValue': '',
            'props': {}
          },
          'name': '$vxeMoney',
          'fixed': '',
          'formula': '',
          'constraint': '',
          'sortable': '',
          'associatedQuery': '',
          'className': '',
          'combinedType_select_sort': '平均值,选中合计,当前页合计,所有合计'
        },
        {
          title: '执行数',
          field: 'executionsAmount30216',
          width: '150',
          align: 'center',
          'filters': '[object Object]',
          'filterRender': {
            'name': 'FilterNumberCompare'
          },
          'combinedType': 'average,subTotal,total,totalAll',
          'cellRender': {
            'name': '$vxeMoney',
            'options': [],
            'defaultValue': '',
            'props': {}
          },
          'name': '$vxeMoney',
          'fixed': '',
          'formula': '',
          'constraint': '',
          'sortable': '',
          'associatedQuery': '',
          'className': '',
          'combinedType_select_sort': '平均值,选中合计,当前页合计,所有合计'
        },
        {
          title: '核算数',
          // type: 'html',
          field: 'accountingAmount30216',
          width: '150',
          align: 'center',
          'filters': '[object Object]',
          'filterRender': {
            'name': 'FilterNumberCompare'
          },
          'combinedType': 'average,subTotal,total,totalAll',
          'cellRender': {
            'name': '$vxeMoney',
            'options': [],
            'defaultValue': '',
            'props': {}
          },
          'name': '$vxeMoney',
          'fixed': '',
          'formula': '',
          'constraint': '',
          'sortable': '',
          'associatedQuery': '',
          'className': '',
          'combinedType_select_sort': '平均值,选中合计,当前页合计,所有合计'
        }
      ]
    }
  ],
  PoliciesTableColumns3: [
    {
      title: '区划',
      field: 'mofDiv',
      width: '190',
      sortable: false,
      align: 'left'
    },
    {
      title: '业务处室',
      field: 'manageMofDep',
      width: '190',
      sortable: false,
      align: 'left'
    },
    {
      title: '部门经济分类',
      field: 'depBgtEco',
      width: '190',
      sortable: false,
      align: 'left'
    },
    {
      title: '预算单位',
      field: 'agency',
      width: '190',
      sortable: false,
      align: 'left'
    },
    {
      title: '年初预算批复金额',
      field: '',
      width: '150',
      sortable: false,
      align: 'left',
      children: [
        {
          title: '合计',
          field: 'vehiclePurchaseBeginningBudgetAmountSum',
          width: '150',
          align: 'center',
          'filters': '[object Object]',
          'filterRender': {
            'name': 'FilterNumberCompare'
          },
          'combinedType': 'average,subTotal,total,totalAll',
          'cellRender': {
            'name': '$vxeMoney',
            'options': [],
            'defaultValue': '',
            'props': {}
          },
          'name': '$vxeMoney',
          'fixed': '',
          'formula': '',
          'constraint': '',
          'sortable': '',
          'associatedQuery': '',
          'className': '',
          'combinedType_select_sort': '平均值,选中合计,当前页合计,所有合计'
        },
        {
          title: '因公出国（境）(30212)',
          field: 'vehiclePurchaseBeginningBudgetAmount30212',
          width: '150',
          align: 'center',
          'filters': '[object Object]',
          'filterRender': {
            'name': 'FilterNumberCompare'
          },
          'combinedType': 'average,subTotal,total,totalAll',
          'cellRender': {
            'name': '$vxeMoney',
            'options': [],
            'defaultValue': '',
            'props': {}
          },
          'name': '$vxeMoney',
          'fixed': '',
          'formula': '',
          'constraint': '',
          'sortable': '',
          'associatedQuery': '',
          'className': '',
          'combinedType_select_sort': '平均值,选中合计,当前页合计,所有合计'
        },
        {
          title: '公务接待费（30217）',
          field: 'vehiclePurchaseBeginningBudgetAmount30217',
          width: '150',
          align: 'center',
          'filters': '[object Object]',
          'filterRender': {
            'name': 'FilterNumberCompare'
          },
          'combinedType': 'average,subTotal,total,totalAll',
          'cellRender': {
            'name': '$vxeMoney',
            'options': [],
            'defaultValue': '',
            'props': {}
          },
          'name': '$vxeMoney',
          'fixed': '',
          'formula': '',
          'constraint': '',
          'sortable': '',
          'associatedQuery': '',
          'className': '',
          'combinedType_select_sort': '平均值,选中合计,当前页合计,所有合计'
        },
        {
          title: '公务用车运行维护(30231)',
          // type: 'html',
          field: 'vehiclePurchaseBeginningBudgetAmount30231',
          width: '150',
          align: 'center',
          'filters': '[object Object]',
          'filterRender': {
            'name': 'FilterNumberCompare'
          },
          'combinedType': 'average,subTotal,total,totalAll',
          'cellRender': {
            'name': '$vxeMoney',
            'options': [],
            'defaultValue': '',
            'props': {}
          },
          'name': '$vxeMoney',
          'fixed': '',
          'formula': '',
          'constraint': '',
          'sortable': '',
          'associatedQuery': '',
          'className': '',
          'combinedType_select_sort': '平均值,选中合计,当前页合计,所有合计'
        },
        {
          title: '公务用车购置(30913)',
          // type: 'html',
          field: 'vehiclePurchaseBeginningBudgetAmount30913',
          width: '150',
          align: 'center',
          'filters': '[object Object]',
          'filterRender': {
            'name': 'FilterNumberCompare'
          },
          'combinedType': 'average,subTotal,total,totalAll',
          'cellRender': {
            'name': '$vxeMoney',
            'options': [],
            'defaultValue': '',
            'props': {}
          },
          'name': '$vxeMoney',
          'fixed': '',
          'formula': '',
          'constraint': '',
          'sortable': '',
          'associatedQuery': '',
          'className': '',
          'combinedType_select_sort': '平均值,选中合计,当前页合计,所有合计'
        },
        {
          title: '公务用车购置(31013)',
          // type: 'html',
          field: 'vehiclePurchaseBeginningBudgetAmount31013',
          width: '150',
          align: 'center',
          'filters': '[object Object]',
          'filterRender': {
            'name': 'FilterNumberCompare'
          },
          'combinedType': 'average,subTotal,total,totalAll',
          'cellRender': {
            'name': '$vxeMoney',
            'options': [],
            'defaultValue': '',
            'props': {}
          },
          'name': '$vxeMoney',
          'fixed': '',
          'formula': '',
          'constraint': '',
          'sortable': '',
          'associatedQuery': '',
          'className': '',
          'combinedType_select_sort': '平均值,选中合计,当前页合计,所有合计'
        }
      ]
    },
    {
      title: '变动预算金额（当年预算金额）',
      field: '',
      width: '150',
      sortable: false,
      align: 'left',
      children: [
        {
          title: '合计',
          field: 'vehiclePurchaseBudgetAdjustmentAmountSum',
          width: '150',
          align: 'center',
          'filters': '[object Object]',
          'filterRender': {
            'name': 'FilterNumberCompare'
          },
          'combinedType': 'average,subTotal,total,totalAll',
          'cellRender': {
            'name': '$vxeMoney',
            'options': [],
            'defaultValue': '',
            'props': {}
          },
          'name': '$vxeMoney',
          'fixed': '',
          'formula': '',
          'constraint': '',
          'sortable': '',
          'associatedQuery': '',
          'className': '',
          'combinedType_select_sort': '平均值,选中合计,当前页合计,所有合计'
        },
        {
          title: '因公出国（境）(30212)',
          field: 'vehiclePurchaseBudgetAdjustmentAmount30212',
          width: '150',
          align: 'center',
          'filters': '[object Object]',
          'filterRender': {
            'name': 'FilterNumberCompare'
          },
          'combinedType': 'average,subTotal,total,totalAll',
          'cellRender': {
            'name': '$vxeMoney',
            'options': [],
            'defaultValue': '',
            'props': {}
          },
          'name': '$vxeMoney',
          'fixed': '',
          'formula': '',
          'constraint': '',
          'sortable': '',
          'associatedQuery': '',
          'className': '',
          'combinedType_select_sort': '平均值,选中合计,当前页合计,所有合计'
        },
        {
          title: '公务接待费（30217）',
          field: 'vehiclePurchaseBudgetAdjustmentAmount30217',
          width: '150',
          align: 'center',
          'filters': '[object Object]',
          'filterRender': {
            'name': 'FilterNumberCompare'
          },
          'combinedType': 'average,subTotal,total,totalAll',
          'cellRender': {
            'name': '$vxeMoney',
            'options': [],
            'defaultValue': '',
            'props': {}
          },
          'name': '$vxeMoney',
          'fixed': '',
          'formula': '',
          'constraint': '',
          'sortable': '',
          'associatedQuery': '',
          'className': '',
          'combinedType_select_sort': '平均值,选中合计,当前页合计,所有合计'
        },
        {
          title: '公务用车运行维护(30231)',
          // type: 'html',
          field: 'vehiclePurchaseBudgetAdjustmentAmount30231',
          width: '150',
          align: 'center',
          'filters': '[object Object]',
          'filterRender': {
            'name': 'FilterNumberCompare'
          },
          'combinedType': 'average,subTotal,total,totalAll',
          'cellRender': {
            'name': '$vxeMoney',
            'options': [],
            'defaultValue': '',
            'props': {}
          },
          'name': '$vxeMoney',
          'fixed': '',
          'formula': '',
          'constraint': '',
          'sortable': '',
          'associatedQuery': '',
          'className': '',
          'combinedType_select_sort': '平均值,选中合计,当前页合计,所有合计'
        },
        {
          title: '公务用车购置(30913)',
          // type: 'html',
          field: 'vehiclePurchaseBudgetAdjustmentAmount30913',
          width: '150',
          align: 'center',
          'filters': '[object Object]',
          'filterRender': {
            'name': 'FilterNumberCompare'
          },
          'combinedType': 'average,subTotal,total,totalAll',
          'cellRender': {
            'name': '$vxeMoney',
            'options': [],
            'defaultValue': '',
            'props': {}
          },
          'name': '$vxeMoney',
          'fixed': '',
          'formula': '',
          'constraint': '',
          'sortable': '',
          'associatedQuery': '',
          'className': '',
          'combinedType_select_sort': '平均值,选中合计,当前页合计,所有合计'
        },
        {
          title: '公务用车购置(31013)',
          // type: 'html',
          field: 'vehiclePurchaseBudgetAdjustmentAmount31013',
          width: '150',
          align: 'center',
          'filters': '[object Object]',
          'filterRender': {
            'name': 'FilterNumberCompare'
          },
          'combinedType': 'average,subTotal,total,totalAll',
          'cellRender': {
            'name': '$vxeMoney',
            'options': [],
            'defaultValue': '',
            'props': {}
          },
          'name': '$vxeMoney',
          'fixed': '',
          'formula': '',
          'constraint': '',
          'sortable': '',
          'associatedQuery': '',
          'className': '',
          'combinedType_select_sort': '平均值,选中合计,当前页合计,所有合计'
        }
      ]
    },
    {
      title: '预算执行金额',
      field: '',
      width: '150',
      sortable: false,
      align: 'left',
      children: [
        {
          title: '合计',
          field: 'vehiclePurchaseExecutionsAmountSum',
          width: '150',
          align: 'center',
          'filters': '[object Object]',
          'filterRender': {
            'name': 'FilterNumberCompare'
          },
          'combinedType': 'average,subTotal,total,totalAll',
          'cellRender': {
            'name': '$vxeMoney',
            'options': [],
            'defaultValue': '',
            'props': {}
          },
          'name': '$vxeMoney',
          'fixed': '',
          'formula': '',
          'constraint': '',
          'sortable': '',
          'associatedQuery': '',
          'className': '',
          'combinedType_select_sort': '平均值,选中合计,当前页合计,所有合计'
        },
        {
          title: '因公出国（境）(30212)',
          field: 'vehiclePurchaseExecutionsAmount30212',
          width: '150',
          align: 'center',
          'filters': '[object Object]',
          'filterRender': {
            'name': 'FilterNumberCompare'
          },
          'combinedType': 'average,subTotal,total,totalAll',
          'cellRender': {
            'name': '$vxeMoney',
            'options': [],
            'defaultValue': '',
            'props': {}
          },
          'name': '$vxeMoney',
          'fixed': '',
          'formula': '',
          'constraint': '',
          'sortable': '',
          'associatedQuery': '',
          'className': '',
          'combinedType_select_sort': '平均值,选中合计,当前页合计,所有合计'
        },
        {
          title: '公务接待费（30217）',
          field: 'vehiclePurchaseExecutionsAmount30217',
          width: '150',
          align: 'center',
          'filters': '[object Object]',
          'filterRender': {
            'name': 'FilterNumberCompare'
          },
          'combinedType': 'average,subTotal,total,totalAll',
          'cellRender': {
            'name': '$vxeMoney',
            'options': [],
            'defaultValue': '',
            'props': {}
          },
          'name': '$vxeMoney',
          'fixed': '',
          'formula': '',
          'constraint': '',
          'sortable': '',
          'associatedQuery': '',
          'className': '',
          'combinedType_select_sort': '平均值,选中合计,当前页合计,所有合计'
        },
        {
          title: '公务用车运行维护(30231)',
          // type: 'html',
          field: 'vehiclePurchaseExecutionsAmount30231',
          width: '150',
          align: 'center',
          'filters': '[object Object]',
          'filterRender': {
            'name': 'FilterNumberCompare'
          },
          'combinedType': 'average,subTotal,total,totalAll',
          'cellRender': {
            'name': '$vxeMoney',
            'options': [],
            'defaultValue': '',
            'props': {}
          },
          'name': '$vxeMoney',
          'fixed': '',
          'formula': '',
          'constraint': '',
          'sortable': '',
          'associatedQuery': '',
          'className': '',
          'combinedType_select_sort': '平均值,选中合计,当前页合计,所有合计'
        },
        {
          title: '公务用车购置(30913)',
          // type: 'html',
          field: 'vehiclePurchaseExecutionsAmount30913',
          width: '150',
          align: 'center',
          'filters': '[object Object]',
          'filterRender': {
            'name': 'FilterNumberCompare'
          },
          'combinedType': 'average,subTotal,total,totalAll',
          'cellRender': {
            'name': '$vxeMoney',
            'options': [],
            'defaultValue': '',
            'props': {}
          },
          'name': '$vxeMoney',
          'fixed': '',
          'formula': '',
          'constraint': '',
          'sortable': '',
          'associatedQuery': '',
          'className': '',
          'combinedType_select_sort': '平均值,选中合计,当前页合计,所有合计'
        },
        {
          title: '公务用车购置(31013)',
          // type: 'html',
          field: 'vehiclePurchaseExecutionsAmount31013',
          width: '150',
          align: 'center',
          'filters': '[object Object]',
          'filterRender': {
            'name': 'FilterNumberCompare'
          },
          'combinedType': 'average,subTotal,total,totalAll',
          'cellRender': {
            'name': '$vxeMoney',
            'options': [],
            'defaultValue': '',
            'props': {}
          },
          'name': '$vxeMoney',
          'fixed': '',
          'formula': '',
          'constraint': '',
          'sortable': '',
          'associatedQuery': '',
          'className': '',
          'combinedType_select_sort': '平均值,选中合计,当前页合计,所有合计'
        }
      ]
    },
    {
      title: '执行进度',
      field: '',
      width: '150',
      sortable: false,
      align: 'left',
      children: [
        {
          title: '合计',
          field: 'vehicleDevopsExpenditureProgressSum',
          width: '150',
          align: 'center',
          type: 'html'
        },
        {
          title: '因公出国（境）(30212)',
          field: 'vehicleDevopsExpenditureProgress30312',
          width: '150',
          align: 'center',
          type: 'html'
        },
        {
          title: '公务接待费（30217）',
          field: 'vehicleDevopsExpenditureProgress30217',
          width: '150',
          align: 'center',
          type: 'html'
        },
        {
          title: '公务用车运行维护(30231)',
          field: 'vehicleDevopsExpenditureProgress30231',
          width: '150',
          align: 'center',
          type: 'html'
        },
        {
          title: '公务用车购置(30913)',
          field: 'vehicleDevopsExpenditureProgress30913',
          width: '150',
          align: 'center',
          type: 'html'
        },
        {
          title: '公务用车购置(31013)',
          field: 'vehicleDevopsExpenditureProgress31013',
          width: '150',
          align: 'center',
          type: 'html'
        }
      ]
    }
  ],
  highQueryConfig2: [
    {
      title: '区划',
      field: 'mofDivCodeList',
      width: '8',
      align: 'left',
      formula: '',
      name: '$vxeTree',
      itemRender: {
        name: '$vxeTree',
        options: [],
        'props': {
          'config': {
            'treeProps': {
              'nodeKey': 'id',
              'label': 'label',
              'children': 'children'
            },
            'placeholder': '区划',
            'multiple': true,
            'readonly': true,
            'isleaf': false
          }
        }
      }
    },
    {
      title: '预算单位',
      field: 'agencyCodeList',
      width: '8',
      align: 'left',
      formula: '',
      name: '$vxeTree',
      itemRender: {
        name: '$vxeTree',
        options: [],
        'props': {
          'config': {
            'treeProps': {
              'nodeKey': 'id',
              'label': 'label',
              'children': 'children'
            },
            'placeholder': '预算单位',
            'multiple': true,
            'readonly': true,
            'isleaf': false
          }
        }
      }
    },
    {
      title: '部门经济分类名称',
      field: 'depBgtEcoName',
      width: '8',
      align: 'left',
      formula: '',
      name: '$vxeInput',
      itemRender: {
        name: '$vxeInput',
        options: [],
        props: {
          placeholder: '部门经济分类名称'
        }
      }
    },
    {
      title: '处室名称',
      field: 'manageMofDepName',
      width: '8',
      align: 'left',
      formula: '',
      name: '$vxeInput',
      itemRender: {
        name: '$vxeInput',
        options: [],
        props: {
          placeholder: '处室名称'
        }
      }
    }
  ],
  highQueryData2: {
    date: '',
    mofDivCodeList: '',
    agencyCodeList: '',
    depBgtEcoName: '',
    manageMofDepName: ''
  },
  // table 操作按钮
  gloableOptionRow: {
    renderDefault(h, cellRender, params, context) {
      let self = context.$grid.$parent
      let { row, column } = params
      // const main = self.$parent.$parent.$parent.$parent
      // let status = main._data.toolBarStatusSelect.curValue
      return [
        <el-tooltip content="新增" placement="top" effect="light">
          <a class="gloable-option-row-add gloable-option-row  fn-inline" onClick={() => self.onOptionRowClick({ row, column, optionType: 'add' })}>新增</a>
        </el-tooltip>,
        <el-tooltip content="附件" placement="top" effect="light">
          <a class="gloable-option-row-attachment gloable-option-row  fn-inline" onClick={() => self.onOptionRowClick({ row, column, optionType: 'attachment' })}>附件</a>,
        </el-tooltip>
      ]
    }
  }
}
