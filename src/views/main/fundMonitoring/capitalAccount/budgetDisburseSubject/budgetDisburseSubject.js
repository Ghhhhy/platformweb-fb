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
      title: '支出科目',
      field: 'expFuncCode',
      // width: 200,
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
              nodeKey: 'code',
              label: 'label',
              children: 'children'
            },
            placeholder: '支出科目',
            clearable: true,
            multiple: false,
            readonly: false,
            isleaf: false,
            axiosConfig: {
              successCode: '000000', // 成功code
              statusField: 'code',
              method: 'get', // 请求方式
              url: 'large-monitor-platform/lmp/expFuncTree'
            }
          }
        }
      }
    },
    {
      title: '截止日期',
      field: 'endTime',
      // width: 100,
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
    expFuncName: '',
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
        title: '科目名称',
        align: 'left',
        // width: 160,
        field: 'codeAndName',
        treeNode: true,
        fixed: 'left',
        cellRender: {
          name: '$vxeIcon',
          props: {
            $refs: this
          }
        }
      },
      {
        title: '预算数',
        // width: 100,
        align: 'right',
        children: [
          {
            title: '合计',
            align: 'right',
            cellRender: { name: '$vxeMoney' },
            // width: 100,
            field: 'amountYshj',
            formula: '{amountZykzx}+{amountDfkzx}'
          },
          {
            title: '中央',
            align: 'right',
            cellRender: { name: '$vxeMoney' },
            // width: 100,
            field: 'amountZykzx'
          },
          {
            title: '地方配套',
            align: 'right',
            // width: 100,
            field: 'amountDfkzx',
            cellRender: { name: '$vxeMoney' }
          }
        ]
      },
      {
        title: '支出数',
        // width: 100,
        align: 'right',
        children: [
          {
            title: '合计',
            align: 'right',
            cellRender: { name: '$vxeMoney' },
            // width: 100,
            field: 'amountZchj',
            formula: '{amountZypay}+{amountDfpay}'
          },
          {
            title: '中央',
            align: 'right',
            cellRender: { name: '$vxeMoney' },
            // width: 100,
            field: 'amountZypay'
          },
          {
            title: '地方配套',
            align: 'right',
            // width: 100,
            field: 'amountDfpay',
            cellRender: { name: '$vxeMoney' }
          }
        ]
      },
      {
        title: '支出进度',
        // width: 100,
        align: 'right',
        children: [
          {
            title: '合计',
            align: 'right',
            formula: '{amountYshj}-0==0?0:Math.round({amountZchj}/{amountYshj}*100*10)/10',
            cellRender: {
              name: '$vxeRatio'
            },
            // width: 100,
            field: 'hjZcjd'
          },
          {
            title: '中央',
            align: 'right',
            formula: '{amountZykzx}-0==0?0:Math.round({amountZypay}/{amountZykzx}*100*10)/10',
            cellRender: {
              name: '$vxeRatio'
            },
            // width: 100,
            field: 'zyZcjd'
          },
          {
            title: '地方配套',
            align: 'right',
            // width: 100,
            field: 'dfptZcjd',
            formula: '{amountDfkzx}-0==0?0:Math.round({amountDfpay}/{amountDfkzx}*100*10)/10',
            cellRender: {
              name: '$vxeRatio'
            }
          }
        ]
      }
    ],
    tableData: []
    // tableData: [
    //   {
    //     subjectName: '合计',
    //     jAmount: 1088148800,
    //     aaAmount: 1088148800,
    //     apayAmount: 4984169,
    //     apayPro: 26,
    //     sBudget: 941916,
    //     sPay: 56158,
    //     sPro: 56,
    //     shBudget: 8924861,
    //     shPay: 4566158,
    //     shPro: 82,
    //     xBudget: 889458,
    //     xPay: 786516,
    //     xPro: 85
    //   },
    //   {
    //     subjectName: '[2080899]其他优抚支出',
    //     jAmount: 108814800,
    //     aaAmount: 108814880,
    //     apayAmount: 4984769,
    //     apayPro: 26,
    //     sBudget: 9419716,
    //     sPay: 561578,
    //     sPro: 56,
    //     shBudget: 89261,
    //     shPay: 45658,
    //     shPro: 82,
    //     xBudget: 8858,
    //     xPay: 7816,
    //     xPro: 85
    //   },
    //   {
    //     subjectName: '[2101401]优抚对象医疗补助',
    //     jAmount: 108814500,
    //     aaAmount: 10848800,
    //     apayAmount: 4987469,
    //     apayPro: 46,
    //     sBudget: 941916,
    //     sPay: 56158,
    //     sPro: 56,
    //     shBudget: 8924861,
    //     shPay: 4566158,
    //     shPro: 82,
    //     xBudget: 889458,
    //     xPay: 786516,
    //     xPro: 85
    //   },
    //   {
    //     subjectName: '[2050302]中等职业教育',
    //     jAmount: 1088148800,
    //     aaAmount: 1088147400,
    //     apayAmount: 4984759,
    //     apayPro: 91,
    //     sBudget: 94147,
    //     sPay: 56158,
    //     sPro: 56,
    //     shBudget: 89245761,
    //     shPay: 4566158,
    //     shPro: 82,
    //     xBudget: 889458,
    //     xPay: 786516,
    //     xPro: 85
    //   },
    //   {
    //     subjectName: '[2082601]财政对企业职工基本养老保险基金的补助',
    //     jAmount: 1088147700,
    //     aaAmount: 1088147700,
    //     apayAmount: 4984779,
    //     apayPro: 91,
    //     sBudget: 941776,
    //     sPay: 56177,
    //     sPro: 56,
    //     shBudget: 8927761,
    //     shPay: 4566778,
    //     shPro: 82,
    //     xBudget: 877458,
    //     xPay: 777516,
    //     xPro: 85
    //   }
    // ]
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
            clearable: true,
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
          title: '科目名称',
          align: 'left',
          width: 160,
          fixed: 'left',
          field: 'name',
          treeNode: true,
          cellRender: {
            name: '$vxeIcon',
            props: {
              $refs: this
            }
          }
        },
        {
          title: '预算数',
          width: 200,
          align: 'right',
          children: [
            {
              title: '合计',
              align: 'right',
              sortable: true,
              cellRender: { name: '$vxeMoney' },
              width: 200,
              field: 'amountYshj',
              formula: '{amountZykzx}+{amountDfkzx}'
            },
            {
              title: '中央',
              align: 'right',
              sortable: true,
              cellRender: { name: '$vxeMoney' },
              width: 200,
              field: 'amountZykzx'
            },
            {
              title: '地方配套',
              align: 'right',
              width: 200,
              field: 'amountDfkzx',
              sortable: true,
              cellRender: { name: '$vxeMoney' }
            }
          ]
        },
        {
          title: '支出数',
          width: 200,
          align: 'right',
          children: [
            {
              title: '合计',
              align: 'right',
              sortable: true,
              cellRender: { name: '$vxeMoney' },
              width: 200,
              field: 'amountZchj',
              formula: '{amountZypay}+{amountDfpay}'
            },
            {
              title: '中央',
              align: 'right',
              sortable: true,
              cellRender: { name: '$vxeMoney' },
              width: 200,
              field: 'amountZypay'
            },
            {
              title: '地方配套',
              align: 'right',
              width: 200,
              field: 'amountDfpay',
              sortable: true,
              cellRender: { name: '$vxeMoney' }
            }
          ]
        },
        {
          title: '支出进度',
          width: 200,
          align: 'right',
          children: [
            {
              title: '合计',
              align: 'right',
              formula: '{amountYshj}-0==0?0:{amountZchj}/{amountYshj}*100',
              sortable: true,
              cellRender: {
                name: '$vxeRatio'
              },
              width: 200,
              field: 'hjZcjd'
            },
            {
              title: '中央',
              align: 'right',
              sortable: true,
              formula: '{amountZykzx}-0==0?0:{amountZypay}/{amountZykzx}*100',
              cellRender: {
                name: '$vxeRatio'
              },
              width: 200,
              field: 'zyZcjd'
            },
            {
              title: '地方配套',
              align: 'right',
              width: 200,
              sortable: true,
              field: 'dfptZcjd',
              formula: '{amountDfkzx}-0==0?0:{amountDfpay}/{amountDfkzx}*100',
              cellRender: {
                name: '$vxeRatio'
              }
            }
          ]
        }
      ],
      tableData: []
      // tableData: [
      //   {
      //     subjectName: '合计',
      //     jAmount: 1088148800,
      //     aaAmount: 1088148800,
      //     apayAmount: 4984169,
      //     apayPro: 26,
      //     sBudget: 941916,
      //     sPay: 56158,
      //     sPro: 56,
      //     shBudget: 8924861,
      //     shPay: 4566158,
      //     shPro: 82,
      //     xBudget: 889458,
      //     xPay: 786516,
      //     xPro: 85
      //   },
      //   {
      //     subjectName: '[2080899]其他优抚支出',
      //     jAmount: 108814800,
      //     aaAmount: 108814880,
      //     apayAmount: 4984769,
      //     apayPro: 26,
      //     sBudget: 9419716,
      //     sPay: 561578,
      //     sPro: 56,
      //     shBudget: 89261,
      //     shPay: 45658,
      //     shPro: 82,
      //     xBudget: 8858,
      //     xPay: 7816,
      //     xPro: 85
      //   },
      //   {
      //     subjectName: '[2101401]优抚对象医疗补助',
      //     jAmount: 108814500,
      //     aaAmount: 10848800,
      //     apayAmount: 4987469,
      //     apayPro: 46,
      //     sBudget: 941916,
      //     sPay: 56158,
      //     sPro: 56,
      //     shBudget: 8924861,
      //     shPay: 4566158,
      //     shPro: 82,
      //     xBudget: 889458,
      //     xPay: 786516,
      //     xPro: 85
      //   },
      //   {
      //     subjectName: '[2050302]中等职业教育',
      //     jAmount: 1088148800,
      //     aaAmount: 1088147400,
      //     apayAmount: 4984759,
      //     apayPro: 91,
      //     sBudget: 94147,
      //     sPay: 56158,
      //     sPro: 56,
      //     shBudget: 89245761,
      //     shPay: 4566158,
      //     shPro: 82,
      //     xBudget: 889458,
      //     xPay: 786516,
      //     xPro: 85
      //   },
      //   {
      //     subjectName: '[2082601]财政对企业职工基本养老保险基金的补助',
      //     jAmount: 1088147700,
      //     aaAmount: 1088147700,
      //     apayAmount: 4984779,
      //     apayPro: 91,
      //     sBudget: 941776,
      //     sPay: 56177,
      //     sPro: 56,
      //     shBudget: 8927761,
      //     shPay: 4566778,
      //     shPro: 82,
      //     xBudget: 877458,
      //     xPay: 777516,
      //     xPro: 85
      //   }
      // ]
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
