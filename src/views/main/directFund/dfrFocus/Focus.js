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
  highQueryConfig: [
    {
      title: '年份',
      field: 'year',
      'width': 180,
      align: 'left',
      formula: '',
      name: '$vxeSelect',
      itemRender: {
        name: '$vxeSelect',
        options: [
          { value: '2021', label: '2021' },
          { value: '2022', label: '2022' }
        ],
        props: {
          placeholder: '年份'
        }
      }
    },
    {
      title: '预算单位',
      field: 'agencyCode',
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
            'multiple': false,
            'readonly': true,
            'isleaf': true
          }
        }
      }
    },
    {
      title: '项目名称',
      field: 'proName',
      width: '8',
      align: 'left',
      formula: '',
      name: '$vxeInput',
      itemRender: {
        name: '$vxeInput',
        options: [],
        props: {
          placeholder: '项目名称'
        }
      }
    },
    {
      title: '资金用途',
      field: 'useDes',
      width: '8',
      align: 'left',
      formula: '',
      name: '$vxeInput',
      itemRender: {
        name: '$vxeInput',
        options: [],
        props: {
          placeholder: '资金用途'
        }
      }
    },
    {
      title: '付款方账户名称',
      field: 'payAcctName',
      width: '8',
      align: 'left',
      formula: '',
      name: '$vxeInput',
      itemRender: {
        name: '$vxeInput',
        options: [],
        props: {
          placeholder: '付款方账户名称'
        }
      }
    },
    {
      title: '收款方账户名称',
      field: 'payeeAcctName',
      width: '8',
      align: 'left',
      formula: '',
      name: '$vxeInput',
      itemRender: {
        name: '$vxeInput',
        options: [],
        props: {
          placeholder: '收款方账户名称'
        }
      }
    },
    {
      title: '结算方式',
      field: 'setModeName',
      'width': 180,
      align: 'left',
      formula: '',
      name: '$vxeSelect',
      itemRender: {
        name: '$vxeSelect',
        options: [
          { value: '电子转账支付', label: '电子转账支付' },
          { value: '电子现金支付', label: '电子现金支付' },
          { value: '现金支票', label: '现金支票' }
        ],
        props: {
          placeholder: '结算方式'
        }
      }
    },
    {
      'title': '付款日期',
      'field': 'xpayDate',
      'width': '8',
      'align': 'left',
      'formula': '',
      'name': '$vxeTime',
      'itemRender': {
        'name': '$vxeTime',
        'options': [],
        'props': {
          'placeholder': '付款日期'
        }
      }
    }
  ],
  // BsToolBar 右侧按钮
  // highQueryConfig: [
  //   {
  //     title: '数据源名称',
  //     field: 'dataSourceName',
  //     width: '8',
  //     align: 'left',
  //     formula: '',
  //     name: '$vxeInput',
  //     itemRender: {
  //       name: '$vxeInput',
  //       options: [],
  //       props: {
  //         placeholder: '数据源名称'
  //       }
  //     }
  //   },
  //   {
  //     title: '业务模块',
  //     field: 'businessModuleName',
  //     width: '8',
  //     align: 'left',
  //     formula: '',
  //     name: '$vxeInput',
  //     itemRender: {
  //       name: '$vxeInput',
  //       options: [],
  //       props: {
  //         placeholder: '业务模块'
  //       }
  //     }
  //   }
  // ],
  highQueryData: {
    dataSourceName: '',
    businessModuleName: ''
  },
  PoliciesTableColumns: [
    {
      title: '地区名称',
      field: 'mofDivName',
      sortable: false,
      width: 200,
      align: 'left'
    },
    {
      title: '专项名称',
      field: 'speType',
      sortable: false,
      width: 200,
      align: 'left'
    },
    {
      title: '指标文号',
      field: 'corBgtDocNoName',
      sortable: false,
      width: 200,
      align: 'left'
    },
    {
      title: '预算单位',
      field: 'agency',
      sortable: false,
      width: 200,
      align: 'left'
    },
    {
      title: '项目名称',
      field: 'proName',
      sortable: false,
      width: 200,
      align: 'left'
    },
    {
      title: '金额',
      field: 'payAmt',
      sortable: false,
      width: 200,
      align: 'left'
    },
    {
      title: '资金用途',
      field: 'useDes',
      sortable: false,
      width: 200,
      align: 'left'
    },
    {
      title: '支出功能科目分类编码',
      field: 'expFuncCode',
      sortable: false,
      width: 200,
      align: 'left'
    },
    {
      title: '支出功能科目分类名称',
      field: 'expFuncName',
      sortable: false,
      width: 200,
      align: 'left'
    },
    {
      title: '付款方账户名称',
      field: 'payAcctName',
      sortable: false,
      width: 200,
      align: 'left'
    },
    {
      title: '付款方银行账号',
      field: 'payAcctNo',
      sortable: false,
      width: 200,
      align: 'left'
    },
    {
      title: '收款方账户名称',
      field: 'payeeAcctName',
      sortable: false,
      width: 200,
      align: 'left'
    },
    {
      title: '收款方银行账号',
      field: 'payeeAcctNo',
      sortable: false,
      width: 200,
      align: 'left'
    },
    {
      title: '付款日期',
      field: 'xpayDate',
      sortable: false,
      width: 200,
      align: 'left'
    },
    {
      title: '结算方式',
      field: 'setMode',
      sortable: false,
      width: 200,
      align: 'left'
    },
    {
      title: '业务年度',
      field: 'fiscalYear',
      sortable: false,
      width: 200,
      align: 'left'
    }
    // ,{
    //   title: '数据源地址',
    //   field: 'adapterAddr',
    //   sortable: false,
    //   align: 'left'
    // }
  ],
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
