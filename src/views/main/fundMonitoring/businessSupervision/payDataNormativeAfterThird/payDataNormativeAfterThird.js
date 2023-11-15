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
      title: '月份',
      field: 'createDateStr',
      width: '8',
      align: 'left',
      formula: '',
      name: '$vxeSelect',
      itemRender: {
        name: '$vxeSelect',
        options: [
          { value: '', label: '全部' },
          { value: '1', label: '1月' },
          { value: '2', label: '2月' },
          { value: '3', label: '3月' },
          { value: '4', label: '4月' },
          { value: '5', label: '5月' },
          { value: '6', label: '6月' },
          { value: '7', label: '7月' },
          { value: '8', label: '8月' },
          { value: '9', label: '9月' },
          { value: '10', label: '10月' },
          { value: '11', label: '11月' },
          { value: '12', label: '12月' }
        ],
        props: {
          clearable: true,
          placeholder: '月份'
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
      width: 180,
      align: 'left',
      formula: '',
      name: '$vxeInput',
      itemRender: {
        name: '$vxeInput',
        options: [],
        props: {
          clearable: true,
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
      title: '地区名称',
      width: 180,
      field: '',
      sortable: true,
      filters: false,
      align: 'center',
      formatter({ row }) {
        return row.mofDivCode && row.mofDivName ? `${row.mofDivCode}-${row.mofDivName}` : ''
      }
    },
    {
      title: '处室名称',
      width: 180,
      field: 'manageMofDepName',
      sortable: true,
      filters: false,
      align: 'center'
    },
    {
      title: '支出功能分类科目',
      width: 180,
      field: 'expFuncName',
      sortable: true,
      filters: false,
      align: 'center'
    },
    {
      title: '项目名称',
      width: 180,
      field: 'proName',
      sortable: true,
      filters: false,
      align: 'center'
    },
    {
      title: '指标文号',
      width: 180,
      field: 'corBgtDocNoName',
      sortable: true,
      filters: false,
      align: 'center'
    },
    {
      title: '用途',
      width: 180,
      field: 'useDes',
      sortable: true,
      filters: false,
      align: 'center'
    },
    {
      title: '付款账户名称',
      width: 180,
      field: 'payAcctName',
      sortable: true,
      filters: false,
      align: 'center'
    },
    {
      title: '付款方账户',
      width: 180,
      field: 'payAcctNo',
      sortable: true,
      filters: false,
      align: 'center'
    },
    {
      title: '支付日期',
      width: 180,
      field: 'payTime',
      sortable: true,
      filters: false,
      align: 'center'
    },
    {
      title: '导入日期',
      width: 180,
      field: 'createTime',
      sortable: true,
      filters: false,
      align: 'center'
    },
    {
      title: '支付日期明细',
      width: 180,
      field: 'payDateDetail',
      sortable: true,
      filters: false,
      align: 'center'
    },
    {
      title: '支付确认日期明细',
      width: 180,
      field: 'xpayDate',
      sortable: true,
      filters: false,
      align: 'center'
    },
    {
      title: '金额',
      width: 180,
      field: 'payAppAmt',
      sortable: true,
      filters: false,
      align: 'right',
      cellRender: { name: '$vxeMoney' }
    },
    {
      title: '收款账户名称',
      width: 180,
      field: 'payeeAcctName',
      sortable: true,
      filters: false,
      align: 'center'
    },
    {
      title: '收款方账户',
      width: 180,
      field: 'payeeAcctNo',
      sortable: true,
      filters: false,
      align: 'center'
    },
    {
      title: '结算方式',
      width: 180,
      field: 'setModeName',
      sortable: true,
      filters: false,
      align: 'center'
    }
  ]
}
