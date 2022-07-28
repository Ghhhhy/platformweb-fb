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
      // { code: 'detail', label: '查看详情', status: 'primary' }
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
          { value: '2020', label: '2020年' },
          { value: '2021', label: '2021年' },
          { value: '2022', label: '2022年' }
        ],
        props: {
          placeholder: '业务年度'
        }
      }
    }
  ],
  highQueryData: {
    regulationType: '',
    warningLevel: '',
    firulename: ''
  },
  // 新增弹窗高级查询
  sethighQueryConfig: [
    // {
    //   title: '规则模板编码',
    //   field: 'declareCode',
    //   width: '8',
    //   align: 'left',
    //   formula: '',
    //   name: '$vxeInput',
    //   itemRender: {
    //     name: '$vxeInput',
    //     options: [],
    //     props: {
    //       placeholder: '规则模板编码'
    //     }
    //   }
    // },
    {
      title: '规则模板名称',
      field: 'ruleTemplateName',
      'width': 180,
      align: 'left',
      formula: '',
      name: '$vxeInput',
      itemRender: {
        name: '$vxeInput',
        options: [],
        props: {
          placeholder: '规则模板名称'
        }
      }
    }
  ],
  sethighQueryData: {
    declareCode: '',
    ruleTemplateName: ''
  },
  PoliciesTableColumns: [
    {
      title: '区划名称',
      align: 'left',
      width: 160,
      field: 'mofDivName'
    },
    {
      title: '项目编码',
      align: 'left',
      width: 160,
      field: 'proCode'
    },
    {
      title: '项目名称',
      align: 'left',
      width: 160,
      field: 'proCodeName'
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
  ]
}
