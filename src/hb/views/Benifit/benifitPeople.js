import { commonFn } from '@/components/InvoiceTable/common.js'
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
      title: '支付凭证号',
      field: 'payCertNo',
      width: '8',
      align: 'left',
      formula: '',
      name: '$vxeInput',
      itemRender: {
        name: '$vxeInput',
        props: {
          clearable: true,
          placeholder: '支付凭证号'
        }
      }
    },
    {
      title: '金额',
      field: 'amount',
      width: '8',
      align: 'left',
      formula: '',
      name: '$vxeInput',
      itemRender: {
        name: '$vxeInput',
        props: {
          clearable: true,
          placeholder: '金额'
        }
      }
    }
  ],
  highQueryConfig1: [
    {
      title: '支付凭证号',
      field: 'payCertNo',
      width: '8',
      align: 'left',
      formula: '',
      name: '$vxeInput',
      itemRender: {
        name: '$vxeInput',
        props: {
          clearable: true,
          placeholder: '支付凭证号'
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
        props: {
          clearable: true,
          placeholder: '项目名称'
        }
      }
    },
    {
      title: '预算单位',
      field: 'agencyName',
      width: '8',
      align: 'left',
      formula: '',
      name: '$vxeInput',
      itemRender: {
        name: '$vxeInput',
        props: {
          clearable: true,
          placeholder: '预算单位'
        }
      }
    },
    {
      title: '指标文号',
      field: 'corBgtDocNoName',
      width: '8',
      align: 'left',
      formula: '',
      name: '$vxeInput',
      itemRender: {
        name: '$vxeInput',
        props: {
          clearable: true,
          placeholder: '指标文号'
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
        props: {
          clearable: true,
          placeholder: '资金用途'
        }
      }
    }
  ],
  // 新增弹窗高级查询
  sethighQueryConfig: [
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
  statusButtons: [
    {
      code: '1',
      label: '待挂接',
      iconName: 'base-all.png',
      iconNameActive: 'base-all-active.png',
      type: 'button',
      curValue: '1'
    },
    {
      code: '2',
      label: '已挂接',
      iconName: 'base-all.png',
      iconNameActive: 'base-all-active.png',
      type: 'button',
      curValue: '2'
    }
  ],
  curStatusButton: {
    label: '待挂接',
    code: '1',
    type: 'button',
    curValue: '1'
  },
  buttons: {
    1: [
      {
        label: '补贴到人导入',
        code: 'importPerson'
      },
      {
        label: '补贴到企业导入',
        code: 'importEnterprise'
      },
      {
        label: '挂接',
        code: 'hook_set',
        status: 'primary'
      },
      {
        label: '删除',
        code: 'delete',
        status: 'primary'
      }
    ],
    2: [
      {
        label: '取消挂接',
        code: 'hook_not',
        status: 'primary'
      }
    ]
  },
  sethighQueryData: {
    declareCode: '',
    ruleTemplateName: ''
  },
  templateColumns: [
    {
      field: 'pro_code',
      title: '项目代码',
      width: 180,
      sortable: false,
      filters: false,
      align: 'left'
    },
    {
      field: 'pay_cert_no',
      title: '支付凭证号',
      width: 180,
      sortable: false,
      filters: false,
      align: 'left'
    },
    {
      field: 'town_code',
      title: '街道(乡镇)编码',
      width: 180,
      sortable: false,
      filters: false,
      align: 'left'
    },
    {
      field: 'town_name',
      title: '街道(乡镇)名称',
      width: 180,
      sortable: false,
      filters: false,
      align: 'left'
    },
    {
      field: 'village_code',
      title: '村编码',
      width: 180,
      sortable: false,
      filters: false,
      align: 'left'
    },
    {
      field: 'village_name',
      title: '村名称',
      width: 180,
      sortable: false,
      filters: false,
      align: 'left'
    },
    {
      field: 'per_name',
      title: '姓名*',
      width: 180,
      sortable: false,
      filters: false,
      align: 'left'
    }, {
      field: 'iden_type',
      title: '证件类型*',
      width: 180,
      sortable: false,
      filters: false,
      align: 'left'
    }, {
      field: 'iden_no',
      title: '证件号码*',
      width: 180,
      sortable: false,
      filters: false,
      align: 'left'
    }, {
      field: 'to_peop_family',
      title: '按户或按人补助*（01到人 02到户）',
      width: 180,
      sortable: false,
      filters: false,
      align: 'left'
    }, {
      field: 'pay_amt',
      title: '应发金额(元)*',
      width: 180,
      sortable: false,
      filters: false,
      align: 'left'
    }, {
      field: 'xpay_amt',
      title: '实发金额(元)*',
      width: 180,
      sortable: false,
      filters: false,
      align: 'left'
    }, {
      field: 'add_word',
      title: '备注',
      width: 180,
      sortable: false,
      filters: false,
      align: 'left'
    }, {
      field: 'pay_month',
      title: '发放月份*',
      width: 180,
      sortable: false,
      filters: false,
      align: 'left'
    }, {
      field: 'pay_month',
      title: '月份*',
      width: 180,
      sortable: false,
      filters: false,
      align: 'left'
    }, {
      field: 'mof_div_code',
      title: '区划',
      width: 180,
      sortable: false,
      filters: false,
      align: 'left'
    }, {
      field: 'mof_div_code',
      title: '社会统一信用代码*',
      width: 180,
      sortable: false,
      filters: false,
      align: 'left'
    },
    {
      field: 'corp_name',
      title: '企业名称*',
      width: 180,
      sortable: false,
      filters: false,
      align: 'left'
    }
  ],
  // 已挂接表头
  hookedTableColumns: [
    {
      title: '单位代码',
      width: 180,
      field: 'agency_code',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '收款人全称',
      width: 180,
      field: 'payee_acct_name',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '收款人账号',
      width: 180,
      field: 'payee_acct_no',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '收款人开户行',
      width: 180,
      field: 'payee_acct_bank_name',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '支付金额',
      width: 180,
      field: 'pay_amt',
      sortable: false,
      filters: false,
      align: 'center',
      cellRender: { name: '$vxeMoney' }
    },
    {
      title: '实际支付金额',
      width: 180,
      field: 'xpay_amt',
      sortable: false,
      filters: false,
      align: 'center',
      cellRender: { name: '$vxeMoney' }
    },
    {
      title: '附件',
      width: 180,
      field: 'add_word',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '金额单位',
      width: 180,
      field: 'amt_unit',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '支付凭证号',
      width: 180,
      field: 'pay_cert_no',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '支付申请主键',
      width: 180,
      field: 'pay_apply_id',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '业务追溯识别码',
      width: 180,
      field: 'tracking_id',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '财政区划代码',
      width: 180,
      field: 'mof_div_code',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '外币金额',
      width: 180,
      field: 'foreign_amt',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '币种代码',
      width: 180,
      field: 'currency_code',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '汇率',
      width: 180,
      field: 'est_rat',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '收款人代码',
      width: 180,
      field: 'receiver_code',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '预算年度',
      width: 180,
      field: 'fiscal_year',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '更新时间',
      width: 180,
      field: 'update_time',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '是否删除',
      width: 180,
      field: 'is_deleted',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '创建时间',
      width: 180,
      field: 'create_time',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '项目是否惠企利民',
      width: 180,
      field: 'is_to_peop_enterp',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '姓名',
      width: 180,
      field: 'per_name',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '证件号码',
      width: 180,
      field: 'iden_no',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '企业名称',
      width: 180,
      field: 'corp_name',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '统一社会信用代码',
      width: 180,
      field: 'unifsoc_cred_code',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '发放月份',
      width: 180,
      field: 'pay_month',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '惠企利民标识',
      width: 180,
      field: 'to_peop_enterp',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '街道(乡镇)编码',
      width: 180,
      field: 'town_code',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '街道(乡镇)名称',
      width: 180,
      field: 'town_name',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '村编码',
      width: 180,
      field: 'village_code',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '村名称',
      width: 180,
      field: 'village_name',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '按户按人补助标识',
      width: 180,
      field: 'to_peop_family',
      sortable: false,
      filters: false,
      align: 'center'
    }
  ],
  unHookTableColumns: [
    {
      field: 'id',
      title: '主键',
      width: 180,
      sortable: false,
      filters: false,
      align: 'left'
    },
    {
      field: 'fiscal_year',
      title: '年度',
      width: 180,
      sortable: false,
      filters: false,
      align: 'left'
    },
    {
      field: 'mof_div_code',
      title: '财政区划代码',
      width: 180,
      sortable: false,
      filters: false,
      align: 'left'
    },
    {
      field: 'mof_div_type',
      title: '行政区划类型',
      width: 180,
      sortable: false,
      filters: false,
      align: 'left'
    },
    {
      field: 'nhbh',
      title: '编号',
      width: 180,
      sortable: false,
      filters: false,
      align: 'left'
    },
    {
      field: 'iden_no',
      title: '证件号码',
      width: 180,
      sortable: false,
      filters: false,
      align: 'left'
    },
    {
      field: 'amount',
      title: '金额',
      width: 180,
      sortable: false,
      filters: false,
      align: 'left'
    },
    {
      field: 'xpay_date',
      title: '实际支付日期',
      width: 180,
      sortable: false,
      filters: false,
      align: 'left'
    },
    {
      field: 'szbs',
      title: '四字标识',
      width: 180,
      sortable: false,
      filters: false,
      align: 'left'
    },
    {
      field: 'pro_code',
      title: '项目代码',
      width: 180,
      sortable: false,
      filters: false,
      align: 'left'
    },
    {
      field: 'pro_name',
      title: '项目名称',
      width: 180,
      sortable: false,
      filters: false,
      align: 'left'
    },
    {
      field: 'pay_cert_no',
      title: '支付凭证号',
      width: 180,
      sortable: false,
      filters: false,
      align: 'left'
    },
    {
      field: 'thirdindi',
      title: '可执行指标ID',
      width: 180,
      sortable: false,
      filters: false,
      align: 'left'
    },
    {
      field: 'create_time',
      title: '创建时间',
      width: 180,
      sortable: false,
      filters: false,
      align: 'left'
    },
    {
      field: 'fetched',
      title: '提取状态',
      width: 180,
      sortable: false,
      filters: false,
      align: 'left',
      cellRender: {
        name: '$vxe-select',
        options: [
          { value: '1', label: '未提取' },
          { value: '2', label: '已提取' },
          { value: '3', label: '已修改' }
        ]
      }
    },
    {
      field: 'is_deleted',
      title: '是否删除',
      width: 180,
      sortable: false,
      filters: false,
      align: 'left'
    },
    {
      field: 'is_hook',
      title: '挂接状态',
      width: 180,
      sortable: false,
      filters: false,
      align: 'left',
      cellRender: {
        name: '$vxe-select',
        options: [
          { value: '0', label: '未挂接' },
          { value: '1', label: '已挂接' }
        ]
      }
    },
    {
      field: 'payee_acct_name',
      title: '收款人全称',
      width: 180,
      sortable: false,
      filters: false,
      align: 'left'
    },
    {
      field: 'payee_acct_no',
      title: '收款人账号',
      width: 180,
      sortable: false,
      filters: false,
      align: 'left'
    },
    {
      field: 'payee_acct_bank_name',
      title: '收款人开户银行',
      width: 180,
      sortable: false,
      filters: false,
      align: 'left'
    },
    {
      field: 'pay_cert_id',
      title: '支付凭证主键',
      width: 180,
      sortable: false,
      filters: false,
      align: 'left'
    },
    {
      field: 'is_import',
      title: '是否手动导入',
      width: 180,
      sortable: false,
      filters: false,
      align: 'left',
      cellRender: {
        name: '$vxe-select',
        options: [
          { value: '0', label: '非手动导入' },
          { value: '1', label: '手动导入' }
        ]
      }
    }
  ],
  PoliciesTableColumns1: [
    {
      title: '金额(元)',
      width: 180,
      field: 'payAmt',
      sortable: false,
      filters: false,
      align: 'center',
      cellRender: { name: '$vxeMoney' }
    },
    {
      title: '支付凭证号',
      width: 180,
      field: 'payCertNo',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '指标文号',
      width: 180,
      field: 'cor_bgt_doc_no',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '预算项目',
      width: 180,
      field: 'pro_name',
      sortable: false,
      filters: false,
      align: 'center',
      formula: '',
      formatter({ row }) {
        return row.proCode && row.proName ? `${row.proCode}-${row.proName}` : ''
      }
    },
    {
      title: '预算单位',
      width: 180,
      field: 'agency',
      sortable: false,
      filters: false,
      align: 'center',
      formula: '',
      formatter({ row }) {
        return row.agencyCode && row.agencyName ? `${row.agencyCode}-${row.agencyName}` : ''
      }
    },
    {
      title: '付款账户名称',
      width: 180,
      field: 'payAcctName',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '付款方账户',
      width: 180,
      field: 'payAcctNo',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '付款人开户银行',
      width: 180,
      field: 'payAcctBankName',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '收款账户名称',
      width: 180,
      field: 'payeeAcctName',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '收款方账户',
      width: 180,
      field: 'payeeAcctNo',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '收款人开户银行',
      width: 180,
      field: 'payeeAcctBankName',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '支付方式',
      width: 180,
      field: 'payTypeName',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '资金性质',
      width: 180,
      field: 'fundTypeName',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '资金用途',
      width: 180,
      field: 'useDes',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '结算方式',
      width: 180,
      field: 'setModeName',
      sortable: false,
      filters: false,
      align: 'center'
    }
  ],
  // 导入到人到企业模板校验
  importPeopleEnterReg: {
    town_code: /^\S{12}$/,
    town_code_msg: '街道(乡镇)编码长度应为12位',
    village_code: /^\S{9}$/,
    village_code_msg: '村编码长度应为9位',
    iden_no: function (value, row) {
      let type = row['证件类型*']
      // type: 证件类型， value：证件号码
      let reg, msg
      if (type) {
        if (type.indexOf('01') > -1) {
          // 身份证
          reg = /^[1-9]\d{5}(18|19|20|(3\d))\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
          msg = '身份证号码格式错误'
        } else if (type.indexOf('02') > -1) {
          // 残疾人证20
          reg = /^\S{20}$/
          msg = '残疾人证号码长度应为20位'
        } else if (type.indexOf('03') > -1) {
          // 护照9
          reg = /^\S{9}$/
          msg = '护照号码格式错误'
        } else {
          return true
        }
        if (reg.test(value)) {
          return {
            result: true
          }
        } else {
          return {
            result: false,
            msg: msg
          }
        }
      }
    },
    pay_amt: function (value, row, title) {
      let money = commonFn.thousandToNum(value)
      if (isNaN(money * 1) || money * 1 <= 0) {
        return {
          result: false,
          msg: `${title}需为大于0的数字`
        }
      }
    },
    xpay_amt: function (value, row, title) {
      let money = commonFn.thousandToNum(value)
      if (isNaN(money * 1) || money * 1 <= 0) {
        return {
          result: false,
          msg: `${title}需为大于0的数字`
        }
      }
    },
    mof_div_code: /^\S{18}$/,
    mof_div_code_msg: '社会统一信用代码长度应为18位'
  }
}
