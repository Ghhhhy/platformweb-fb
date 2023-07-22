import store from '@/store/index'
const proconf = {
  gloableOptionRow: {
    renderDefault(h, cellRender, params, context) {
      let self = context.$grid.$parent
      let { row, column } = params
      // const main = self.$parent.$parent.$parent.$parent
      // let status = main._data.toolBarStatusSelect.curValue
      return [
        // <el-tooltip content="修改" placement="top" effect="light">
        //   <a class="gloable-option-row-edit gloable-option-row  fn-inline" onClick={() => self.onOptionRowClick({ row, column, optionType: 'uodate' })}>修改</a>
        // </el-tooltip>,
        <el-tooltip content="附件" placement="top" effect="light">
          <a class="gloable-option-row-attachment gloable-option-row  fn-inline" onClick={() => self.onOptionRowClick({ row, column, optionType: 'attachment' })}>附件</a>,
        </el-tooltip>
      ]
    }
  },
  gloableOptionRowDetial: {
    renderDefault(h, cellRender, params, context) {
      let self = context.$grid.$parent
      let { row, column } = params
      return [
        <el-tooltip content="" placement="" effect="light">
          <span style="color: #4293F4; text-decoration: underline" onClick={() => self.onOptionRowClick({ row, column, optionType: 'show' })}>查看</span>
        </el-tooltip>
      ]
    }
  },
  highQueryConfig: [
    {
      title: '问询单编码',
      width: 180,
      field: 'dealNo',
      formula: '',
      align: 'left',
      name: '$vxeInput',
      itemRender: {
        name: '$vxeInput',
        options: [],
        props: {
          placeholder: '问询单编码'
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
            'isleaf': true
          }
        }
      }
    },
    {
      title: '业务数据单号',
      width: 180,
      field: 'businessNo',
      formula: '',
      align: 'left',
      name: '$vxeInput',
      itemRender: {
        name: '$vxeInput',
        options: [],
        props: {
          placeholder: '业务数据单号'
        }
      }
    },
    {
      title: '主题',
      width: 180,
      field: 'regulationClassName',
      formula: '',
      align: 'left',
      name: '$vxeInput',
      itemRender: {
        name: '$vxeInput',
        options: [],
        props: {
          placeholder: '主题'
        }
      }
    },
    {
      title: '违规时间范围-开始',
      field: 'warnStartTime',
      width: 200,
      align: 'center',
      filters: false,
      itemRender: {
        name: '$vxeTime',
        props: {
          format: 'YYYY-MM-DD', // "当前日期为：YYYY-MM-DD，星期W，为第Q季度，时间为：hh:mm:ss:c"
          type: 'date',
          placeholder: '违规时间-开始'
        }
      }
    },
    {
      title: '违规时间范围-结束',
      field: 'warnTime',
      width: 200,
      align: 'center',
      filters: false,
      itemRender: {
        name: '$vxeTime',
        props: {
          format: 'YYYY-MM-DD', // "当前日期为：YYYY-MM-DD，星期W，为第Q季度，时间为：hh:mm:ss:c"
          type: 'date',
          placeholder: '违规时间-结束'
        }
      }
    },
    {
      title: '监控类型',
      field: 'triggerClass',
      formula: '',
      align: 'left',
      width: 180,
      itemRender: {
        name: '$vxeSelect',
        options: [
          {
            value: 1,
            label: '事中触发'
          },
          {
            value: 2,
            label: '定时触发'
          }
        ],
        props: {
          placeholder: '监控类型'
        },
        defaultValue: ''
      },
      name: '$vxeSelect'
    },
    {
      title: '监控规则',
      field: 'fiRuleName',
      width: '8',
      align: 'left',
      formula: '',
      name: '$vxeInput',
      itemRender: {
        name: '$vxeInput',
        options: [],
        props: {
          placeholder: '监控规则'
        }
      }
    }
  ],
  highQueryData: {
    agencyCodeList: '',
    businessNo: '',
    regulationClassName: '',
    warnTime: '',
    triggerClass: '',
    warningLevel: '',
    fiRuleName: '',
    dealNo: ''
  },
  // 预警数据明细
  undoNum: [
    {
      title: '区划',
      width: 180,
      field: 'mofDivName',
      sortable: false,
      filters: false,
      align: 'center',
      cellRender: {
        name: '$vxeInput',
        options: [],
        defaultValue: '',
        props: {
          format: '{mofDivCode}-{mofDivName}'
        }
      },
      props: {
        format: '{mofDivCode}-{mofDivName}'
      }
    },
    {
      title: '预算单位',
      width: 180,
      field: 'agencyName',
      sortable: false,
      filters: false,
      align: 'center',
      cellRender: {
        name: '$vxeInput',
        options: [],
        defaultValue: '',
        props: {
          format: '{agencyCode}-{agencyName}'
        }
      },
      props: {
        format: '{agencyCode}-{agencyName}'
      }
    },
    {
      title: '业务数据单号',
      width: 180,
      field: 'businessNo',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '主题',
      width: 180,
      field: 'regulationClassName',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '违规时间',
      width: 180,
      field: 'warnTime',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '业务数据时间',
      width: 180,
      field: 'businessTime',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '监控类型',
      field: 'triggerClass',
      align: 'center',
      width: 180,
      cellRender: {
        name: '$vxeSelect',
        options: [
          {
            value: 1,
            label: '事中触发'
          },
          {
            value: 2,
            label: '定时触发'
          }
        ],
        defaultValue: '',
        props: {}
      },
      name: '$vxeSelect'
    },
    {
      title: '监控规则',
      width: 180,
      field: 'fiRuleName',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      'title': '预警级别',
      'field': 'warnLevel',
      'fixed': '',
      'width': '100',
      'type': 'html',
      'align': 'center',
      'formula': '',
      'constraint': '',
      'combinedType': '',
      'sortable': '1',
      'associatedQuery': {
        'queryMethods': '',
        'queryUrl': '',
        'params': {}
      },
      'dragSort': null,
      'className': '',
      'combinedType_select_sort': '',
      'filters': ''
    },
    {
      title: '处理方式',
      field: 'handleType',
      align: 'center',
      width: 180,
      cellRender: {
        name: '$vxeSelect',
        options: [
          {
            value: 1,
            label: '预警，无需上传附件'
          },
          {
            value: 2,
            label: '预警，需上传附件'
          },
          {
            value: 5,
            label: '记录'
          }
        ],
        defaultValue: '',
        props: {}
      },
      name: '$vxeSelect'
    },
    {
      title: '支付金额',
      field: 'paymentAmount',
      sortable: false,
      filters: false,
      align: 'right',
      width: 180,
      combinedType: [
        'average',
        'subTotal',
        'total',
        'totalAll'
      ],
      cellRender: { name: '$vxeMoney' }
    },
    {
      title: '违规详情',
      field: 'gloableOptionRowDetial',
      align: 'center',
      sortable: false,
      filters: false,
      width: 120,
      fixed: 'right',
      cellRender: {
        name: '$ReportTaskGloableOptionRow'
      }
    }
  ],
  // 认定正常明细
  normalNum: [
    {
      field: 'dealNo',
      title: '问询单编码',
      titleWidth: '180',
      span: 8,
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '问询单编码' } }
    },
    {
      title: '区划',
      width: 180,
      field: 'mofDivName',
      sortable: false,
      filters: false,
      align: 'center',
      cellRender: {
        name: '$vxeInput',
        options: [],
        defaultValue: '',
        props: {
          format: '{mofDivCode}-{mofDivName}'
        }
      },
      props: {
        format: '{mofDivCode}-{mofDivName}'
      }
    },
    {
      title: '预算单位',
      width: 180,
      field: 'agencyName',
      sortable: false,
      filters: false,
      align: 'center',
      cellRender: {
        name: '$vxeInput',
        options: [],
        defaultValue: '',
        props: {
          format: '{agencyCode}-{agencyName}'
        }
      },
      props: {
        format: '{agencyCode}-{agencyName}'
      }
    },
    {
      title: '业务数据单号',
      width: 180,
      field: 'businessNo',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '主题',
      width: 180,
      field: 'regulationClassName',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '违规时间',
      width: 180,
      field: 'warnTime',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '监控类型',
      field: 'triggerClass',
      align: 'center',
      width: 180,
      cellRender: {
        name: '$vxeSelect',
        options: [
          {
            value: 1,
            label: '事中触发'
          },
          {
            value: 2,
            label: '定时触发'
          }
        ],
        defaultValue: '',
        props: {}
      },
      name: '$vxeSelect'
    },
    {
      title: '监控规则',
      width: 180,
      field: 'fiRuleName',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      'title': '预警级别',
      'field': 'warnLevel',
      'fixed': '',
      'width': '100',
      'type': 'html',
      'align': 'center',
      'formula': '',
      'constraint': '',
      'combinedType': '',
      'sortable': '1',
      'associatedQuery': {
        'queryMethods': '',
        'queryUrl': '',
        'params': {}
      },
      'dragSort': null,
      'className': '',
      'combinedType_select_sort': '',
      'filters': ''
    },
    {
      title: '处理方式',
      field: 'handleType',
      align: 'center',
      width: 180,
      cellRender: {
        name: '$vxeSelect',
        options: [
          {
            value: 1,
            label: '预警，无需上传附件'
          },
          {
            value: 2,
            label: '预警，需上传附件'
          },
          {
            value: 5,
            label: '记录'
          }
        ],
        defaultValue: '',
        props: {}
      },
      name: '$vxeSelect'
    },
    {
      title: '支付金额',
      field: 'paymentAmount',
      sortable: false,
      filters: false,
      align: 'right',
      width: 180,
      combinedType: [
        'average',
        'subTotal',
        'total',
        'totalAll'
      ],
      cellRender: { name: '$vxeMoney' }
    },
    {
      title: '处室意见',
      field: 'departmentStatus',
      align: 'center',
      width: 180,
      cellRender: {
        name: '$vxeSelect',
        options: [
          {
            value: '2',
            label: '认定正常'
          },
          {
            value: '3',
            label: '需要核实（下发单位）'
          }
        ],
        defaultValue: '',
        props: {}
      },
      name: '$vxeSelect'
    },
    {
      title: '处室联系方式',
      width: 180,
      field: 'phone2',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '处室下发人',
      width: 180,
      field: 'handler2',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '处室指导意见',
      width: 180,
      field: 'information2',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '预算单位核实意见',
      field: 'agencyStatus',
      align: 'center',
      width: 180,
      cellRender: {
        name: '$vxeSelect',
        options: [
          {
            value: '1',
            label: '已整改'
          },
          {
            value: '2',
            label: '核实无误'
          }
        ],
        defaultValue: '',
        props: {}
      },
      name: '$vxeSelect'
    },
    {
      title: '预算单位联系方式',
      width: 180,
      field: 'phone1',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '预算单位处理人',
      width: 180,
      field: 'handler1',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '预算单位核实意见说明',
      width: 180,
      field: 'information1',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '违规详情',
      field: 'gloableOptionRowDetial',
      align: 'center',
      sortable: false,
      filters: false,
      width: 120,
      fixed: 'right',
      cellRender: {
        name: '$ReportTaskGloableOptionRow'
      }
    }
  ],
  msgConfig: [
    {
      field: 'warningCode',
      title: '监控数据编码',
      titleWidth: '180',
      span: 8,
      itemRender: {
        name: '$vxeInput',
        props: { placeholder: '监控数据编码', disabled: true }
      }
    },
    {
      field: 'pay_app_no',
      title: '支付申请编号',
      titleWidth: '180',
      span: 8,
      itemRender: {
        name: '$vxeInput',
        props: { placeholder: '支付申请编号', disabled: true }
      }
    },
    {
      title: '预算单位名称',
      span: 8,
      titleWidth: '180',
      field: 'agencyName',
      sortable: false,
      filters: false,
      align: 'center',
      itemRender: {
        name: '$vxeInput',
        props: { placeholder: '预算单位名称', disabled: true }
      }
    },
    {
      field: 'cor_bgt_doc_no_name',
      title: '指标文号',
      titleWidth: '180',
      span: 8,
      itemRender: {
        name: '$vxeInput',
        props: { placeholder: '指标文号', disabled: true }
      }
    },
    {
      title: '预算项目',
      field: 'proName',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '预算项目' } }
    },
    {
      title: '收支类别',
      field: 'proCatName',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '收支类别' }
      }
    },
    {
      title: '付款人',
      field: 'pay_acct_name',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '付款人' }
      }
    },
    {
      title: '付款人账号',
      field: 'pay_acct_no',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '付款人账号' }
      }
    },
    {
      title: '付款银行',
      field: 'pay_acct_bank_name',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '付款银行' }
      }
    },
    {
      title: '收款人',
      field: 'payee_acct_name',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '收款人' }
      }
    },
    {
      title: '收款人账号',
      field: 'payee_acct_no',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '收款人账号' }
      }
    },
    {
      title: '收款银行',
      field: 'payee_acct_bank_name',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '收款银行' }
      }
    },
    {
      field: 'pay_app_amt',
      title: '支付金额',
      titleWidth: '180',
      span: 8,
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '支付金额' }
      }
    },
    {
      title: '资金用途',
      field: 'use_des',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '资金用途' }
      }
    },
    {
      title: '政府经济分类',
      field: 'govEconomyType',
      titleWidth: '180',
      span: 8,
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '政府经济分类' }
      }
    },
    {
      title: '部门经济分类',
      field: 'deptEconomyType',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '部门经济分类' }
      }
    },
    {
      title: '资金性质',
      field: 'natureOfFunds',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '资金性质' }
      }
    },
    {
      title: '功能分类',
      field: 'funcType',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '功能分类' }
      }
    },
    {
      title: '支付方式',
      field: 'paymentMethod',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '支付方式' }
      }
    },
    {
      title: '结算方式',
      field: 'settlementMethod',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '结算方式' }
      }
    },
    {
      title: '业务处室',
      field: 'businessOffice',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '业务处室' }
      }
    },
    {
      title: '工资标识',
      field: 'salaryMark',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '工资标识' }
      }
    },
    {
      title: '是否工会经费',
      field: 'isUnionFunds',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '是否工会经费' }
      }
    },
    {
      title: '三公经费',
      field: 'isThrExp',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '三公经费' }
      }
    },
    {
      title: '直达资金标识',
      field: 'directFund',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '直达资金标识' }
      }
    },
    {
      title: '监控时间',
      field: 'fiDate',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { type: 'datetime', disabled: true, placeholder: '监控时间' }
      }
    },
    {
      title: '业务类型',
      field: 'payBusType',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '业务类型' }
      }
    },
    {
      title: '当前岗',
      field: 'todoName',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '当前岗' }
      }
    },
    {
      title: '是否作废',
      field: 'voidOrNot',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '是否作废' }
      }
    },
    {
      title: '业务处理时间',
      field: 'businessTime',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '业务处理时间' }
      }
    }
  ],
  businessMsgConfig: [
    {
      field: 'pay_app_no',
      title: '支付申请编号',
      titleWidth: '180',
      span: 8,
      itemRender: {
        name: '$vxeInput',
        props: { placeholder: '支付申请编号', disabled: true }
      }
    },
    {
      title: '预算单位名称',
      span: 8,
      titleWidth: '180',
      field: 'agencyName',
      sortable: false,
      filters: false,
      align: 'center',
      itemRender: {
        name: '$vxeInput',
        props: { placeholder: '预算单位名称', disabled: true }
      }
    },
    {
      field: 'cor_bgt_doc_no_name',
      title: '指标文号',
      titleWidth: '180',
      span: 8,
      itemRender: {
        name: '$vxeInput',
        props: { placeholder: '指标文号', disabled: true }
      }
    },
    {
      title: '预算项目',
      field: 'proName',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '预算项目' } }
    },
    {
      title: '收支类别',
      field: 'proCatName',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '收支类别' }
      }
    },
    {
      title: '付款人',
      field: 'pay_acct_name',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '付款人' }
      }
    },
    {
      title: '付款人账号',
      field: 'pay_acct_no',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '付款人账号' }
      }
    },
    {
      title: '付款银行',
      field: 'pay_acct_bank_name',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '付款银行' }
      }
    },
    {
      title: '收款人',
      field: 'payee_acct_name',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '收款人' }
      }
    },
    {
      title: '收款人账号',
      field: 'payee_acct_no',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '收款人账号' }
      }
    },
    {
      title: '收款银行',
      field: 'payee_acct_bank_name',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '收款银行' }
      }
    },
    {
      field: 'pay_app_amt',
      title: '支付金额',
      titleWidth: '180',
      span: 8,
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '支付金额' }
      }
    },
    {
      title: '资金用途',
      field: 'use_des',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '资金用途' }
      }
    },
    {
      title: '政府经济分类',
      field: 'govEconomyType',
      titleWidth: '180',
      span: 8,
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '政府经济分类' }
      }
    },
    {
      title: '部门经济分类',
      field: 'deptEconomyType',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '部门经济分类' }
      }
    },
    {
      title: '资金性质',
      field: 'natureOfFunds',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '资金性质' }
      }
    },
    {
      title: '功能分类',
      field: 'funcType',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '功能分类' }
      }
    },
    {
      title: '支付方式',
      field: 'paymentMethod',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '支付方式' }
      }
    },
    {
      title: '结算方式',
      field: 'settlementMethod',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '结算方式' }
      }
    },
    {
      title: '业务处室',
      field: 'businessOffice',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '业务处室' }
      }
    },
    {
      title: '工资标识',
      field: 'salaryMark',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '工资标识' }
      }
    },
    {
      title: '是否工会经费',
      field: 'isUnionFunds',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '是否工会经费' }
      }
    },
    {
      title: '三公经费',
      field: 'isThrExp',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '三公经费' }
      }
    },
    {
      title: '直达资金标识',
      field: 'directFund',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '直达资金标识' }
      }
    },
    {
      title: '业务类型',
      field: 'payBusType',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '业务类型' }
      }
    },
    {
      title: '当前岗',
      field: 'todoName',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '当前岗' }
      }
    },
    {
      title: '是否作废',
      field: 'voidOrNot',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '是否作废' }
      }
    }
  ],
  businessMsgData: {
    warningCode: '',
    payApplyNumber: '',
    agencyName: '',
    targetDocNum: '',
    projectName: '',
    projectTypeName: '',
    payer: '',
    payAccount: '',
    payBankName: '',
    payee: '',
    receiveAccount: '',
    receiveBankName: '',
    paymentAmount: '',
    useOfFunds: '',
    govEconomyType: '',
    deptEconomyType: '',
    natureOfFunds: '',
    funcType: '',
    paymentMethod: '',
    settlementMethod: '',
    businessOffice: '',
    salaryMark: '',
    isUnionFunds: '',
    isThrExp: '',
    directFund: '',
    createTime: '',
    fiDate: '',
    payBusType: '',
    todoName: '',
    voidOrNot: ''
  },
  notRectifiedNum: [
    {
      field: 'dealNo',
      title: '问询单编码',
      titleWidth: '180',
      span: 8,
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '问询单编码' } }
    },
    {
      title: '违规类型',
      width: 180,
      field: 'violateType',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '疑似违规说明',
      width: 180,
      field: 'doubtViolateExplain',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '区划',
      width: 180,
      field: 'mofDivName',
      sortable: false,
      filters: false,
      align: 'center',
      cellRender: {
        name: '$vxeInput',
        options: [],
        defaultValue: '',
        props: {
          format: '{mofDivCode}-{mofDivName}'
        }
      },
      props: {
        format: '{mofDivCode}-{mofDivName}'
      }
    },
    {
      title: '预算单位',
      width: 180,
      field: 'agencyName',
      sortable: false,
      filters: false,
      align: 'center',
      cellRender: {
        name: '$vxeInput',
        options: [],
        defaultValue: '',
        props: {
          format: '{agencyCode}-{agencyName}'
        }
      },
      props: {
        format: '{agencyCode}-{agencyName}'
      }
    },
    {
      title: '业务数据单号',
      width: 180,
      field: 'businessNo',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '主题',
      width: 180,
      field: 'regulationClassName',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '违规时间',
      width: 180,
      field: 'warnTime',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '监控类型',
      field: 'triggerClass',
      align: 'center',
      width: 180,
      cellRender: {
        name: '$vxeSelect',
        options: [
          {
            value: 1,
            label: '事中触发'
          },
          {
            value: 2,
            label: '定时触发'
          }
        ],
        defaultValue: '',
        props: {}
      },
      name: '$vxeSelect'
    },
    {
      title: '监控规则',
      width: 180,
      field: 'fiRuleName',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      'title': '预警级别',
      'field': 'warnLevel',
      'fixed': '',
      'width': '100',
      'type': 'html',
      'align': 'center',
      'formula': '',
      'constraint': '',
      'combinedType': '',
      'sortable': '1',
      'associatedQuery': {
        'queryMethods': '',
        'queryUrl': '',
        'params': {}
      },
      'dragSort': null,
      'className': '',
      'combinedType_select_sort': '',
      'filters': ''
    },
    {
      title: '处理方式',
      field: 'handleType',
      align: 'center',
      width: 180,
      cellRender: {
        name: '$vxeSelect',
        options: [
          {
            value: 1,
            label: '预警，无需上传附件'
          },
          {
            value: 2,
            label: '预警，需上传附件'
          },
          {
            value: 5,
            label: '记录'
          }
        ],
        defaultValue: '',
        props: {}
      },
      name: '$vxeSelect'
    },
    {
      title: '支付金额',
      field: 'paymentAmount',
      sortable: false,
      filters: false,
      align: 'right',
      width: 180,
      combinedType: [
        'average',
        'subTotal',
        'total',
        'totalAll'
      ],
      cellRender: { name: '$vxeMoney' }
    },
    {
      title: '处室意见',
      field: 'departmentStatus',
      align: 'center',
      width: 180,
      cellRender: {
        name: '$vxeSelect',
        options: [
          {
            value: '2',
            label: '认定正常'
          },
          {
            value: '3',
            label: '需要核实（下发单位）'
          }
        ],
        defaultValue: '',
        props: {}
      },
      name: '$vxeSelect'
    },
    {
      title: '处室联系方式',
      width: 180,
      field: 'phone2',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '处室下发人',
      width: 180,
      field: 'handler2',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '处室指导意见',
      width: 180,
      field: 'information2',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '预算单位核实意见',
      field: 'agencyStatus',
      align: 'center',
      width: 180,
      cellRender: {
        name: '$vxeSelect',
        options: [
          {
            value: '1',
            label: '已整改'
          },
          {
            value: '2',
            label: '核实无误'
          }
        ],
        defaultValue: '',
        props: {}
      },
      name: '$vxeSelect'
    },
    {
      title: '预算单位联系方式',
      width: 180,
      field: 'phone1',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '预算单位处理人',
      width: 180,
      field: 'handler1',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '预算单位核实意见说明',
      width: 180,
      field: 'information1',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '违规详情',
      field: 'gloableOptionRowDetial',
      align: 'center',
      sortable: false,
      filters: false,
      width: 120,
      fixed: 'right',
      cellRender: {
        name: '$ReportTaskGloableOptionRow'
      }
    }
  ],
  doneNum: [
    {
      field: 'dealNo',
      title: '问询单编码',
      titleWidth: '180',
      span: 8,
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '问询单编码' } }
    },
    {
      title: '违规类型',
      width: 180,
      field: 'violateType',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '疑似违规说明',
      width: 180,
      field: 'doubtViolateExplain',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '区划',
      width: 180,
      field: 'mofDivName',
      sortable: false,
      filters: false,
      align: 'center',
      cellRender: {
        name: '$vxeInput',
        options: [],
        defaultValue: '',
        props: {
          format: '{mofDivCode}-{mofDivName}'
        }
      },
      props: {
        format: '{mofDivCode}-{mofDivName}'
      }
    },
    {
      title: '预算单位',
      width: 180,
      field: 'agencyName',
      sortable: false,
      filters: false,
      align: 'center',
      cellRender: {
        name: '$vxeInput',
        options: [],
        defaultValue: '',
        props: {
          format: '{agencyCode}-{agencyName}'
        }
      },
      props: {
        format: '{agencyCode}-{agencyName}'
      }
    },
    {
      title: '业务数据单号',
      width: 180,
      field: 'businessNo',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '主题',
      width: 180,
      field: 'regulationClassName',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '违规时间',
      width: 180,
      field: 'warnTime',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '监控类型',
      field: 'triggerClass',
      align: 'center',
      width: 180,
      cellRender: {
        name: '$vxeSelect',
        options: [
          {
            value: 1,
            label: '事中触发'
          },
          {
            value: 2,
            label: '定时触发'
          }
        ],
        defaultValue: '',
        props: {}
      },
      name: '$vxeSelect'
    },
    {
      title: '监控规则',
      width: 180,
      field: 'fiRuleName',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      'title': '预警级别',
      'field': 'warnLevel',
      'fixed': '',
      'width': '100',
      'type': 'html',
      'align': 'center',
      'formula': '',
      'constraint': '',
      'combinedType': '',
      'sortable': '1',
      'associatedQuery': {
        'queryMethods': '',
        'queryUrl': '',
        'params': {}
      },
      'dragSort': null,
      'className': '',
      'combinedType_select_sort': '',
      'filters': ''
    },
    {
      title: '处理方式',
      field: 'handleType',
      align: 'center',
      width: 180,
      cellRender: {
        name: '$vxeSelect',
        options: [
          {
            value: 1,
            label: '预警，无需上传附件'
          },
          {
            value: 2,
            label: '预警，需上传附件'
          },
          {
            value: 5,
            label: '记录'
          }
        ],
        defaultValue: '',
        props: {}
      },
      name: '$vxeSelect'
    },
    {
      title: '处室意见',
      field: 'departmentStatus',
      align: 'center',
      width: 180,
      cellRender: {
        name: '$vxeSelect',
        options: [
          {
            value: '2',
            label: '认定正常'
          },
          {
            value: '3',
            label: '需要核实（下发单位）'
          }
        ],
        defaultValue: '',
        props: {}
      },
      name: '$vxeSelect'
    },
    {
      title: '处室联系方式',
      width: 180,
      field: 'phone2',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '处室下发人',
      width: 180,
      field: 'handler2',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '处室指导意见',
      width: 180,
      field: 'information2',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '预算单位核实意见',
      field: 'agencyStatus',
      align: 'center',
      width: 180,
      cellRender: {
        name: '$vxeSelect',
        options: [
          {
            value: '1',
            label: '已整改'
          },
          {
            value: '2',
            label: '核实无误'
          }
        ],
        defaultValue: '',
        props: {}
      },
      name: '$vxeSelect'
    },
    {
      title: '预算单位联系方式',
      width: 180,
      field: 'phone1',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '预算单位处理人',
      width: 180,
      field: 'handler1',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '预算单位核实意见说明',
      width: 180,
      field: 'information1',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '支付金额',
      field: 'paymentAmount',
      sortable: false,
      filters: false,
      width: 180,
      align: 'right',
      combinedType: [
        'average',
        'subTotal',
        'total',
        'totalAll'
      ],
      cellRender: { name: '$vxeMoney' }
    },
    // {
    //   title: '附件',
    //   filters: false,
    //   width: 140,
    //   sortable: false,
    //   align: 'center',
    //   field: 'gloableOptionRow',
    //   className: 'gloableOptionRow',
    //   cellRender: {
    //     name: '$payVoucherInputGloableOptionRow',
    //     options: [],
    //     defaultValue: '',
    //     props: {}
    //   },
    //   name: '$payVoucherInputGloableOptionRow'
    // },
    {
      title: '违规详情',
      field: 'gloableOptionRowDetial',
      align: 'center',
      sortable: false,
      filters: false,
      width: 120,
      fixed: 'right',
      cellRender: {
        name: '$ReportTaskGloableOptionRow'
      }
    }
  ],
  msgData: {
    warningCode: '',
    payApplyNumber: '',
    agencyName: '',
    targetDocNum: '',
    projectName: '',
    projectTypeName: '',
    payer: '',
    payAccount: '',
    payBankName: '',
    payee: '',
    receiveAccount: '',
    receiveBankName: '',
    paymentAmount: '',
    useOfFunds: '',
    govEconomyType: '',
    deptEconomyType: '',
    natureOfFunds: '',
    funcType: '',
    paymentMethod: '',
    settlementMethod: '',
    businessOffice: '',
    salaryMark: '',
    isUnionFunds: '',
    isThrExp: '',
    directFund: '',
    createTime: '',
    fiDate: '',
    payBusType: '',
    todoName: '',
    voidOrNot: ''
  },
  handletableColumnsConfig: [
    {
      title: '规则名称',
      field: 'regulationName',
      sortable: false,
      align: 'left',
      cellRender: {
        name: '$vxeTableHref'
      }
    },
    {
      'title': '预警级别',
      'field': 'warningLevel',
      'align': 'center',
      'cellRender': {
        'name': '$vxeSelect',
        options: store.state.warnInfo.warnLevelOptions.map(item => {
          return {
            ...item,
            value: String(item.value)
          }
        }),
        'defaultValue': '',
        'props': {}
      },
      'sortable': 'true',
      'name': '$vxeSelect'
    },
    {
      'title': '处理方式',
      'field': 'handleType',
      'align': 'center',
      'cellRender': {
        'name': '$vxeSelect',
        'options': [
          {
            'value': '1',
            'label': '预警，无需上传附件'
          },
          {
            'value': '2',
            'label': '预警，需上传附件'
          },
          {
            'value': '3',
            'label': '拦截'
          },
          {
            'value': '4',
            'label': '禁止'
          },
          {
            'value': '5',
            'label': '记录'
          }
        ],
        'defaultValue': '',
        'props': {}
      },
      'sortable': 'true',
      'name': '$vxeSelect'
    }
  ],
  createConfig: [
    {
      field: 'dealNo',
      title: '问询单编码',
      titleWidth: '180',
      span: 8,
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '问询单编码' } }
    },
    {
      field: 'dealType',
      title: '问询单类型',
      titleWidth: '180',
      span: 8,
      itemRender: {
        name: '$vxeSelect',
        props: { placeholder: '问询单类型' },
        options: [
          {
            value: '1',
            label: '对本级问询'
          },
          {
            value: '2',
            label: '对下级问询'
          }
        ]
      }
    },
    {
      field: 'violateType',
      title: '违规类型',
      titleWidth: '180',
      span: 8,
      itemRender: {
        name: '$vxeSelect',
        props: { placeholder: '违规类型' },
        options: [
        ]
      }
    },
    {
      field: 'fiRuleName',
      title: '监控规则',
      titleWidth: '180',
      span: 8,
      itemRender: {
        name: '$vxeInput',
        props: { placeholder: '监控规则', disabled: true }
      }
    },
    {
      title: '预警级别',
      field: 'warnLevel',
      align: 'center',
      titleWidth: '180',
      span: 8,
      itemRender: {
        name: '$vxeSelect',
        props: { disabled: true, placeholder: '预警级别' },
        options: [
          {
            value: '1',
            label: '黄色预警'
          },
          {
            value: '2',
            label: '橙色预警'
          },
          {
            value: '3',
            label: '红色预警'
          },
          {
            value: '5',
            label: '蓝色预警'
          },
          {
            value: '4',
            label: '灰色预警'
          }
        ],
        defaultValue: ''
      },
      name: '$vxeSelect'
    },
    {
      title: '处理方式',
      field: 'handleType',
      align: 'center',
      titleWidth: '180',
      span: 8,
      itemRender: {
        name: '$vxeSelect',
        options: [
          {
            value: 1,
            label: '预警，无需上传附件'
          },
          {
            value: 2,
            label: '预警，需上传附件'
          },
          {
            value: 3,
            label: '拦截'
          },
          {
            value: 4,
            label: '禁止'
          },
          {
            value: '5',
            label: '记录'
          }
        ],
        defaultValue: '',
        props: { disabled: true, placeholder: '处理方式' }
      },
      name: '$vxeSelect'
    },
    // {
    //   title: '处理结果',
    //   field: 'handleResult',
    //   align: 'center',
    //   titleWidth: '180',
    //   span: 8,
    //   itemRender: {
    //     name: '$vxeSelect',
    //     options: [
    //       {
    //         value: 0,
    //         label: '未处理'
    //       },
    //       {
    //         value: 1,
    //         label: '通过'
    //       },
    //       {
    //         value: 2,
    //         label: '不通过'
    //       }
    //     ],
    //     defaultValue: '',
    //     props: { disabled: true, placeholder: '处理结果' }
    //   },
    //   name: '$vxeSelect'
    // },
    {
      title: '区划',
      field: 'mofDivCode',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '区划' } }
    },
    {
      title: '生成日期',
      field: 'issueTime',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '生成日期' }
      }
    }
  ],
  checkConfig: [
    {
      field: 'violateType',
      title: '违规类型',
      titleWidth: '180',
      span: 8,
      itemRender: {
        name: '$vxeSelect',
        props: { placeholder: '违规类型', disabled: true },
        options: [
        ]
      }
    },
    {
      field: 'fiRuleName',
      title: '监控规则',
      titleWidth: '180',
      span: 8,
      itemRender: {
        name: '$vxeInput',
        props: { placeholder: '监控规则', disabled: true }
      }
    },
    {
      title: '预警级别',
      field: 'warnLevel',
      align: 'center',
      titleWidth: '180',
      span: 8,
      itemRender: {
        name: '$vxeSelect',
        props: { disabled: true, placeholder: '预警级别' },
        options: [
          {
            value: '1',
            label: '黄色预警'
          },
          {
            value: '2',
            label: '橙色预警'
          },
          {
            value: '3',
            label: '红色预警'
          },
          {
            value: '5',
            label: '蓝色预警'
          },
          {
            value: '4',
            label: '灰色预警'
          }
        ],
        defaultValue: ''
      },
      name: '$vxeSelect'
    },
    {
      title: '处理方式',
      field: 'handleType',
      align: 'center',
      titleWidth: '180',
      span: 8,
      itemRender: {
        name: '$vxeSelect',
        options: [
          {
            value: 1,
            label: '预警，无需上传附件'
          },
          {
            value: 2,
            label: '预警，需上传附件'
          },
          {
            value: 3,
            label: '拦截'
          },
          {
            value: 4,
            label: '禁止'
          },
          {
            value: '5',
            label: '记录'
          }
        ],
        defaultValue: '',
        props: { disabled: true, placeholder: '处理方式' }
      },
      name: '$vxeSelect'
    },
    {
      title: '处理结果',
      field: 'handleResult',
      align: 'center',
      titleWidth: '180',
      span: 8,
      itemRender: {
        name: '$vxeSelect',
        options: [
          {
            value: 0,
            label: '未处理'
          },
          {
            value: 1,
            label: '通过'
          },
          {
            value: 2,
            label: '不通过'
          }
        ],
        defaultValue: '',
        props: { disabled: true, placeholder: '处理结果' }
      },
      name: '$vxeSelect'
    },
    {
      title: '区划',
      field: 'mofDivCode',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '区划' } }
    },
    {
      title: '生成日期',
      field: 'issueTime',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '生成日期' }
      }
    }
  ],
  createDataList: {
    issueTime: '',
    mofDivCode: '',
    handleType: '',
    handleResult: '',
    warnLevel: '',
    violateType: '',
    fiRuleName: '',
    dealNo: '',
    dealType: ''
  }
}
const statusButtons = [
  {
    code: '1',
    label: '预警数据',
    iconName: 'base-all.png',
    iconNameActive: 'base-all-active.png',
    type: 'button',
    curValue: '1'
  },
  {
    code: '2',
    label: '认定正常',
    iconName: 'base-all.png',
    iconNameActive: 'base-all-active.png',
    type: 'button',
    curValue: '2'
  },
  {
    code: '3',
    label: '已整改',
    iconName: 'base-all.png',
    iconNameActive: 'base-all-active.png',
    type: 'button',
    curValue: '3'
  },
  {
    code: '4',
    label: '未完成',
    iconName: 'base-all.png',
    iconNameActive: 'base-all-active.png',
    type: 'button',
    curValue: '4'
  }
]

const curStatusButton = {
  label: '预警数据',
  code: '1',
  type: 'button',
  curValue: '1'
}
const curStatusButton1 = {
  label: '认定正常',
  code: '2',
  type: 'button',
  curValue: '2'
}
const curStatusButton2 = {
  label: '已整改',
  code: '3',
  type: 'button',
  curValue: '3'
}
const curStatusButton3 = {
  label: '未完成',
  code: '4',
  type: 'button',
  curValue: '4'
}
const buttons1 = {
  1: [
    {
      label: '生成',
      code: 'create',
      status: 'primary'
    }
  ],
  2: [
  ],
  3: [
    {
      label: '联查业务数据',
      code: 'queryBusinessData',
      status: 'primary'
    },
    {
      label: '整改详情',
      code: 'show_detail',
      status: 'primary'
    }
  ],
  4: [
  ]
}
const buttons2 = {
  1: [
  ],
  2: [
  ],
  4: [
  ],
  3: [
    {
      label: '联查业务数据',
      code: 'queryBusinessData',
      status: 'primary'
    },
    {
      label: '整改详情',
      code: 'show_detail',
      status: 'primary'
    }
  ]
}
const monitorResultPages = ['BudgetMonitorWarningResults', 'BudgetImpMonitorWarningResults', 'AccountMonitorWarningResults', 'SanGongMonitorWarningResults', 'SanBaoMonitorWarningResults']
export default proconf
export {
  statusButtons,
  curStatusButton,
  curStatusButton1,
  curStatusButton2,
  curStatusButton3,
  buttons1,
  buttons2,
  monitorResultPages
}
