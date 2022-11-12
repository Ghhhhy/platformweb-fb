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
    }
  ],
  highQueryData: {
    fiscalYear: '2022'
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
        title: '区划名称',
        align: 'left',
        width: 160,
        field: 'mofDivName'
      },
      {
        title: '资金名称',
        align: 'left',
        width: 160,
        field: 'amountName'
      },
      {
        title: '预算单位',
        align: 'left',
        width: 160,
        field: 'agencyCodeName'
      },
      {
        title: '预算数',
        width: 260,
        align: 'center',
        children: [
          {
            title: '总金额',
            align: 'right',
            cellRender: { name: '$vxeMoney' },
            width: 200,
            field: 'yaAmount',
            formula: '{yzyapAmount}+{ysjapAmount}+{yshjapAmount}+{yxjapAmount}'
          },
          {
            title: '中央安排',
            align: 'right',
            cellRender: { name: '$vxeMoney' },
            width: 200,
            field: 'yzyapAmount'
          },
          {
            title: '省级安排',
            align: 'right',
            cellRender: { name: '$vxeMoney' },
            width: 200,
            field: 'ysjapAmount'
          },
          {
            title: '市级安排',
            align: 'right',
            cellRender: { name: '$vxeMoney' },
            width: 200,
            field: 'yshjapAmount'
          },
          {
            title: '县级安排',
            align: 'right',
            cellRender: { name: '$vxeMoney' },
            width: 200,
            field: 'yxjapAmount'
          }
        ]
      },
      {
        title: '支出数',
        width: 260,
        align: 'center',
        children: [
          {
            title: '总金额',
            align: 'right',
            cellRender: { name: '$vxeMoney' },
            width: 200,
            field: 'zaAmount',
            formula: '{zzyapAmount}+{zsjapAmount}+{zshjapAmount}+{zxjapAmount}'
          },
          {
            title: '中央安排',
            align: 'right',
            cellRender: { name: '$vxeMoney' },
            width: 200,
            field: 'zzyapAmount'
          },
          {
            title: '省级安排',
            align: 'right',
            cellRender: { name: '$vxeMoney' },
            width: 200,
            field: 'zsjapAmount'
          },
          {
            title: '市级安排',
            align: 'right',
            cellRender: { name: '$vxeMoney' },
            width: 200,
            field: 'zshjapAmount'
          },
          {
            title: '县级安排',
            align: 'right',
            cellRender: { name: '$vxeMoney' },
            width: 200,
            field: 'zxjapAmount'
          }
        ]
      },
      {
        title: '支出功能科目',
        align: 'left',
        width: 160,
        field: 'xjExpFuncName'
      },
      {
        title: '是否惠企利民',
        align: 'left',
        width: 160,
        field: 'sfUseful'
      },
      {
        title: '发放表',
        align: 'left',
        width: 160,
        field: 'grantFrom'
      },
      {
        title: '是否拨入专户项目',
        align: 'left',
        width: 160,
        field: 'sfaccount'
      }
    ],
    tableColumnsConfigCity: [
      {
        title: '区划名称',
        align: 'left',
        width: 160,
        field: 'mofDivName'
      },
      {
        title: '资金名称',
        align: 'left',
        width: 160,
        field: 'amountName'
      },
      {
        title: '预算单位',
        align: 'left',
        width: 160,
        field: 'agencyCodeName'
      },
      {
        title: '预算数',
        width: 260,
        align: 'center',
        children: [
          {
            title: '总金额',
            align: 'right',
            cellRender: { name: '$vxeMoney' },
            width: 200,
            field: 'yaAmount',
            formula: '{yzyapAmount}+{ysjapAmount}+{yshjapAmount}+{yxjapAmount}'
          },
          {
            title: '中央安排',
            align: 'right',
            cellRender: { name: '$vxeMoney' },
            width: 200,
            field: 'yzyapAmount'
          },
          {
            title: '市级安排',
            align: 'right',
            cellRender: { name: '$vxeMoney' },
            width: 200,
            field: 'ysjapAmount'
          },
          {
            title: '区级安排',
            align: 'right',
            cellRender: { name: '$vxeMoney' },
            width: 200,
            field: 'yxjapAmount'
          }
        ]
      },
      {
        title: '支出数',
        width: 260,
        align: 'center',
        children: [
          {
            title: '总金额',
            align: 'right',
            cellRender: { name: '$vxeMoney' },
            width: 200,
            field: 'zaAmount',
            formula: '{zzyapAmount}+{zsjapAmount}+{zshjapAmount}+{zxjapAmount}'
          },
          {
            title: '中央安排',
            align: 'right',
            cellRender: { name: '$vxeMoney' },
            width: 200,
            field: 'zzyapAmount'
          },
          {
            title: '市级安排',
            align: 'right',
            cellRender: { name: '$vxeMoney' },
            width: 200,
            field: 'zsjapAmount'
          },
          {
            title: '区级安排',
            align: 'right',
            cellRender: { name: '$vxeMoney' },
            width: 200,
            field: 'zxjapAmount'
          }
        ]
      },
      {
        title: '支出功能科目',
        align: 'left',
        width: 160,
        field: 'xjExpFuncName'
      },
      {
        title: '是否惠企利民',
        align: 'left',
        width: 160,
        field: 'sfUseful'
      },
      {
        title: '发放表',
        align: 'left',
        width: 160,
        field: 'grantFrom'
      },
      {
        title: '是否拨入专户项目',
        align: 'left',
        width: 160,
        field: 'sfaccount'
      }
    ],
    // tableData: []
    tableData: [
      {
        mofDivName: '合计',
        proCode: '',
        proCodeName: '',
        yaAmount: 1522615641.58,
        yzyapAmount: 941648.5,
        ysjapAmount: 949219.64,
        yshjapAmount: 818,
        yxjapAmount: 8597,
        zaAmount: 7974456.95,
        zzyapAmount: 9874,
        zsjapAmount: 811874,
        zshjapAmount: 5298,
        zxjapAmount: 4819.85,
        amountName: '',
        agencyCodeName: '',
        xjExpFuncName: '',
        sfUseful: '',
        grantFrom: '',
        sfaccount: ''
      },
      {
        mofDivName: '[6100]陕西省本级',
        proCode: '610000000000021041340',
        proCodeName: '优抚对象补助资金',
        yaAmount: 1522615641.58,
        yzyapAmount: 941648.5,
        ysjapAmount: 949219.64,
        yshjapAmount: 818,
        yxjapAmount: 8597,
        zaAmount: 7974456.95,
        zzyapAmount: 9874,
        zsjapAmount: 811874,
        zshjapAmount: 5298,
        zxjapAmount: 4819.85,
        amountName: '学生资助补助经费',
        agencyCodeName: '[208003]西安理工大学',
        xjExpFuncName: '[2050299]其他普通教育支出',
        sfUseful: '利民',
        grantFrom: '',
        sfaccount: '是'
      },
      {
        mofDivName: '[6100]陕西省本级',
        proCode: '61000000000002116515',
        proCodeName: '高校学生国家奖助学金',
        yaAmount: 1525641.58,
        yzyapAmount: 9648.5,
        ysjapAmount: 94919.64,
        yshjapAmount: 18,
        yxjapAmount: 8497,
        zaAmount: 79756.95,
        zzyapAmount: 98754,
        zsjapAmount: 8118474,
        zshjapAmount: 52948,
        zxjapAmount: 4819.5,
        amountName: '优抚对象补助经费',
        agencyCodeName: '[208001]省教育厅机关',
        xjExpFuncName: '[2080899]其他优抚支出',
        sfUseful: '利民',
        grantFrom: '',
        sfaccount: '是'
      },
      {
        mofDivName: '[6100]陕西省本级',
        proCode: '610000000000021046440',
        proCodeName: '家庭经济困难学生生活补助',
        yaAmount: 1521.58,
        yzyapAmount: 948.5,
        ysjapAmount: 949.64,
        yshjapAmount: 88,
        yxjapAmount: 97,
        zaAmount: 797.95,
        zzyapAmount: 74,
        zsjapAmount: 814,
        zshjapAmount: 52,
        zxjapAmount: 49.85,
        amountName: '学生资助补助经费',
        agencyCodeName: '[208007]陕西科技大学',
        xjExpFuncName: '[2050299]其他普通教育支出',
        sfUseful: '利民',
        grantFrom: '',
        sfaccount: '是'
      }
    ]
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
