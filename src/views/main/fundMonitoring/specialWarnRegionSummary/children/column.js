// import store from '@/store/index'
const proconf = {
  highQueryConfig: [
    {
      title: '区划名称',
      field: 'mofDivName',
      width: '8',
      align: 'left',
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
              label: 'name',
              children: 'children'
            },
            placeholder: '区划名称',
            multiple: true,
            readonly: false,
            isleaf: false
          }
        }
      }
    },
    {
      title: '级次',
      field: 'levels',
      width: '8',
      align: 'left',
      formula: '',
      name: '$vxeSelect',
      itemRender: {
        name: '$vxeSelect',
        options: [
          { value: '0', label: '全部' },
          { value: '1', label: '省本级' },
          { value: '2', label: '市本级' },
          { value: '3', label: '县级' }
        ],
        props: {
          placeholder: '级次'
        }
      }
    },
    {
      title: '专项资金',
      field: 'speTypeName',
      width: '8',
      align: 'center',
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
              label: 'name',
              children: 'children'
            },
            placeholder: '专项资金',
            multiple: true,
            readonly: false,
            isleaf: false
          }
        }
      }
    },
    {
      title: '项目名称',
      field: 'projectName',
      width: '8',
      align: 'left',
      formula: '',
      name: '$vxeInput',
      itemRender: {
        name: '$vxeInput',
        props: {
          placeholder: '项目名称'
        }
      }
    },
    {
      title: '处室名称',
      field: 'businessOffice',
      width: '8',
      align: 'center',
      formula: '',
      name: '$vxeInput',
      itemRender: {
        name: '$vxeInput',
        props: {
          placeholder: '处室名称'
        }
      }
    }
  ],
  highQueryData: {
    mofDivName: '',
    speTypeCode: '',
    projectName: '',
    levels: '',
    businessOffice: ''
  },
  // 支出明细
  expenditureColumn: [
    {
      title: '预算单位',
      field: 'agencyCodeName',
      align: 'center'
    },
    {
      title: '项目名称',
      field: 'proCodeName',
      sortable: false,
      align: 'center'
    },
    {
      title: '金额',
      field: 'paymentAmount',
      sortable: false,
      filters: false,
      align: 'right',
      cellRender: { name: '$vxeMoney' }
    },
    {
      title: '其中：中央直达资金',
      field: 'payAppAmt',
      sortable: false,
      align: 'right',
      cellRender: { name: '$vxeMoney' }
    },
    {
      title: '用途',
      field: 'useDes',
      sortable: false,
      align: 'center'
    },
    {
      title: '付款方账户名称',
      field: 'payAcctName',
      sortable: false,
      align: 'center'
    },
    {
      title: '付款方账号',
      field: 'payAcctNo',
      sortable: false,
      align: 'center'
    },
    {
      title: '收款方账户名称',
      field: 'payeeAcctName',
      sortable: false,
      align: 'center'
    },
    {
      title: '收款方账号',
      field: 'payeeAcctNo',
      sortable: false,
      align: 'center'
    },
    {
      title: '付款日期',
      field: 'xpayDate',
      sortable: false,
      align: 'center'
    }
  ],
  // 项目明细
  projectColumn: [
    {
      title: '资金名称',
      field: 'speTypeName',
      align: 'center'
    },
    {
      title: '预算单位',
      field: 'agencyName',
      sortable: false,
      align: 'center'
    },
    {
      title: '项目名称',
      field: 'proName',
      sortable: false,
      align: 'center'
    },
    {
      title: '支出功能科目',
      field: 'xjExpFuncName',
      sortable: false,
      align: 'center'
    },
    {
      title: '预算金额',
      align: 'center',
      children: [
        {
          title: '总金额',
          field: 'fpAmount',
          sortable: false,
          align: 'right',
          cellRender: { name: '$vxeMoney' }
        },
        {
          title: '其中：中央直达资金',
          field: 'fpAmount',
          sortable: false,
          align: 'right',
          cellRender: { name: '$vxeMoney' }
        }
      ]
    },
    {
      title: '支付金额',
      align: 'center',
      children: [
        {
          title: '总金额',
          field: 'payAppAmt',
          sortable: false,
          align: 'right',
          cellRender: { name: '$vxeMoney' }
        },
        {
          title: '其中：中央直达资金',
          field: 'payAppAmt',
          sortable: false,
          align: 'right',
          cellRender: { name: '$vxeMoney' }
        }
      ]
    },
    {
      title: '惠企利民',
      field: '',
      sortable: false,
      align: 'center'
    }
  ],
  // 指标明细
  targetColumn: [
    {
      title: '处室名称',
      field: 'bgtMofDepName',
      align: 'center'
    },
    {
      title: '单位名称',
      field: 'agencyName',
      sortable: false,
      align: 'center'
    },
    {
      title: '中央直达资金名称',
      field: 'speTypeName',
      sortable: false,
      align: 'center'
    },
    {
      title: '支出科目名称',
      field: 'xjExpFuncName',
      sortable: false,
      align: 'center'
    },
    {
      title: '本级专项资金名称',
      field: 'sSpeTypeName',
      sortable: false,
      align: 'center'
    },
    {
      title: '上级文号',
      field: 'corBgtDocNo',
      sortable: false,
      align: 'center'
    },
    {
      title: '本级文号',
      field: 'xjCorBgtDocNo',
      sortable: false,
      align: 'center'
    },
    {
      title: '预算金额',
      field: 'fpAmount',
      sortable: false,
      align: 'right',
      cellRender: { name: '$vxeMoney' }
    },
    {
      title: '支出金额',
      field: 'payAppAmt',
      sortable: false,
      align: 'right',
      cellRender: { name: '$vxeMoney' }
    }
  ],
  // 指标预警未处理明细
  redUndoNum: [
    {
      title: '地区名称',
      field: 'name',
      sortable: false,
      filters: false
    },
    {
      title: '处室名称',
      field: 'businessOffice',
      sortable: false,
      filters: false,
      width: 140,
      align: 'center'
    },
    {
      title: '逾期天数',
      field: 'yqDay',
      sortable: false,
      filters: false,
      width: 140,
      align: 'right'
    },
    {
      title: '上级项目名称',
      filters: false,
      width: 140,
      field: 'trackProName',
      sortable: false,
      align: 'right'
    },
    {
      title: '预算级次',
      filters: false,
      width: 140,
      field: 'budgetLevelName',
      sortable: false,
      align: 'right'
    },
    {
      title: '上级指标文号',
      filters: false,
      width: 140,
      field: 'supBgtDocNo',
      sortable: false,
      align: 'right'
    },
    {
      title: '资金主管处室编码',
      filters: false,
      width: 140,
      field: 'bgtMofDepCode',
      sortable: false,
      align: 'right'
    },
    {
      title: '资金主管处室名称',
      filters: false,
      width: 140,
      field: 'bgtMofDepName',
      sortable: false,
      align: 'right'
    },
    {
      title: '本级指标文号',
      filters: false,
      width: 140,
      field: 'corBgtDocNo',
      sortable: false,
      align: 'right'
    },
    // {
    //   title: '支出功能科目编码',
    //   filters: false,
    //   width: 140,
    //   field: 'expFuncCode',
    //   sortable: false,
    //   align: 'right'
    // },
    {
      title: '支出功能科目',
      filters: false,
      width: 140,
      field: 'expFuncName',
      formatter({ row }) {
        return row.expFuncCode && row.expFuncName ? `${row.expFuncCode}-${row.expFuncName}` : ''
      },
      sortable: false,
      align: 'right'
    },
    {
      title: '政府支出经济分类',
      filters: false,
      width: 140,
      field: 'govBgtEcoName',
      formatter({ row }) {
        return row.govBgtEcoCode && row.govBgtEcoName ? `${row.govBgtEcoCode}-${row.govBgtEcoName}` : ''
      },
      sortable: false,
      align: 'right'
    },
    {
      title: '部门支出经济分类',
      filters: false,
      width: 140,
      field: 'depBgtEcoName',
      formatter({ row }) {
        return row.depBgtEcoCode && row.depBgtEcoName ? `${row.depBgtEcoCode}-${row.depBgtEcoName}` : ''
      },
      sortable: false,
      align: 'right'
    },
    {
      title: '本级项目名称',
      filters: false,
      width: 140,
      field: 'proName',
      sortable: false,
      align: 'right'
    },
    {
      title: '直达资金标识编码',
      filters: false,
      width: 140,
      field: 'isDirCode',
      sortable: false,
      align: 'right'
    },
    {
      title: '直达资金标识名称',
      filters: false,
      width: 140,
      field: 'isDirName',
      sortable: false,
      align: 'right'
    },
    {
      title: '接收金额',
      filters: false,
      width: 140,
      field: 'amount',
      sortable: false,
      align: 'right',
      cellRender: { name: '$vxeMoney' }
    },
    {
      title: '未分配金额',
      filters: false,
      width: 140,
      field: 'curAmt',
      sortable: false,
      align: 'right',
      cellRender: { name: '$vxeMoney' }
    }
  ],
  // 指标预警已处理明细
  redDoneNum: [
    {
      title: '地区名称',
      field: 'name',
      sortable: false,
      filters: false
    },
    {
      title: '处室名称',
      field: 'businessOffice',
      sortable: false,
      filters: false,
      width: 140,
      align: 'center'
    },
    {
      title: '处理结果',
      filters: false,
      width: 140,
      field: 'rectifyDetail',
      sortable: false,
      align: 'right'
    },
    {
      title: '整改意见',
      field: 'rectifyAsk',
      sortable: false,
      width: 140,
      filters: false,
      align: 'right'
    },
    {
      title: '整改时间',
      field: 'rectifyTime',
      sortable: false,
      filters: false,
      width: 140,
      align: 'right'
    },
    {
      title: '逾期天数',
      field: 'yqDay',
      sortable: false,
      filters: false,
      width: 140,
      align: 'right'
    },
    {
      title: '上级项目名称',
      filters: false,
      width: 140,
      field: 'trackProName',
      sortable: false,
      align: 'right'
    },
    {
      title: '预算级次',
      filters: false,
      width: 140,
      field: 'budgetLevelName',
      sortable: false,
      align: 'right'
    },
    {
      title: '上级指标文号',
      filters: false,
      width: 140,
      field: 'supBgtDocNo',
      sortable: false,
      align: 'right'
    },
    {
      title: '资金主管处室编码',
      filters: false,
      width: 140,
      field: 'bgtMofDepCode',
      sortable: false,
      align: 'right'
    },
    {
      title: '资金主管处室名称',
      filters: false,
      width: 140,
      field: 'bgtMofDepName',
      sortable: false,
      align: 'right'
    },
    {
      title: '本级指标文号',
      filters: false,
      width: 140,
      field: 'corBgtDocNo',
      sortable: false,
      align: 'right'
    },
    // {
    //   title: '支出功能科目编码',
    //   filters: false,
    //   width: 140,
    //   field: 'expFuncCode',
    //   sortable: false,
    //   align: 'right'
    // },
    {
      title: '支出功能科目',
      filters: false,
      width: 140,
      field: 'expFuncName',
      sortable: false,
      align: 'right'
    },
    {
      title: '政府支出经济分类',
      filters: false,
      width: 140,
      field: 'govBgtEcoName',
      formatter({ row }) {
        return row.govBgtEcoCode && row.govBgtEcoName ? `${row.govBgtEcoCode}-${row.govBgtEcoName}` : ''
      },
      sortable: false,
      align: 'right'
    },
    {
      title: '部门支出经济分类',
      filters: false,
      width: 140,
      field: 'depBgtEcoName',
      formatter({ row }) {
        return row.depBgtEcoCode && row.depBgtEcoName ? `${row.depBgtEcoCode}-${row.depBgtEcoName}` : ''
      },
      sortable: false,
      align: 'right'
    },
    {
      title: '本级项目名称',
      filters: false,
      width: 140,
      field: 'proName',
      sortable: false,
      align: 'right'
    },
    {
      title: '直达资金标识编码',
      filters: false,
      width: 140,
      field: 'isDirCode',
      sortable: false,
      align: 'right'
    },
    {
      title: '直达资金标识名称',
      filters: false,
      width: 140,
      field: 'isDirName',
      sortable: false,
      align: 'right'
    },
    {
      title: '接收金额',
      filters: false,
      width: 140,
      field: 'amount',
      sortable: false,
      align: 'right',
      cellRender: { name: '$vxeMoney' }
    },
    {
      title: '未分配金额',
      filters: false,
      width: 140,
      field: 'curAmt',
      sortable: false,
      align: 'right',
      cellRender: { name: '$vxeMoney' }
    }
  ],
  // 支出预警-未处理明细
  notuploadColumn: [
    {
      title: '地区名称',
      field: 'name',
      width: 140,
      sortable: false,
      filters: false
    },
    {
      title: '处室名称',
      field: 'businessOffice',
      align: 'center',
      width: 140,
      filters: false
    },
    {
      title: '专项资金',
      field: 'speTypeName',
      sortable: false,
      filters: false,
      width: 140,
      align: 'center'
    },
    {
      title: '指标文号',
      field: 'targetDocNum',
      sortable: false,
      filters: false,
      width: 140,
      align: 'center'
    },
    {
      title: '制单人',
      field: 'checkPerson',
      sortable: false,
      filters: false,
      width: 140,
      align: 'right'
    },
    {
      title: '预警时间',
      field: 'warnTime',
      sortable: false,
      filters: false,
      width: 140,
      align: 'right'
    }
  ],
  // 是否上传附件-已整改明细
  uploadColumn: [
    {
      title: '地区名称',
      field: 'name',
      width: 140,
      sortable: false,
      filters: false
    },
    {
      title: '处室名称',
      field: 'businessOffice',
      align: 'center',
      width: 140,
      filters: false
    },
    {
      title: '专项资金',
      field: 'speTypeName',
      sortable: false,
      filters: false,
      width: 140,
      align: 'center'
    },
    {
      title: '指标文号',
      field: 'targetDocNum',
      sortable: false,
      width: 140,
      filters: false,
      align: 'center'
    },
    {
      title: '制单人',
      field: 'checkPerson',
      sortable: false,
      width: 140,
      filters: false,
      align: 'right'
    },
    {
      title: '预警时间',
      field: 'warnTime',
      sortable: false,
      width: 140,
      filters: false,
      align: 'right'
    },
    {
      title: '整改意见',
      field: 'rectifyAsk',
      sortable: false,
      width: 140,
      filters: false,
      align: 'right'
    },
    {
      title: '整改时间',
      field: 'rectifyTime',
      sortable: false,
      filters: false,
      width: 140,
      align: 'right'
    },
    {
      title: '逾期天数',
      field: 'yqDay',
      sortable: false,
      filters: false,
      width: 140,
      align: 'right'
    }

  ],
  // 支出预警-未认定明细
  notpayColumn: [
    {
      title: '地区名称',
      field: 'name',
      align: 'center',
      width: 140,
      filters: false
    },
    {
      title: '规则名称',
      field: 'fiRuleName',
      align: 'center',
      filters: false,
      width: 140
    },
    {
      title: '处室名称',
      field: 'businessOffice',
      align: 'center',
      width: 140,
      filters: false
    },
    {
      title: '单位名称',
      field: 'agencyName',
      align: 'center',
      width: 140,
      filters: false
    },
    {
      title: '专项资金',
      field: 'speTypeName',
      width: 140,
      filters: false,
      sortable: false,
      align: 'center'
    },
    {
      title: '项目名称',
      field: 'projectName',
      sortable: false,
      filters: false,
      width: 140,
      align: 'center'
    },
    {
      title: '金额',
      field: 'paymentAmount',
      width: 140,
      sortable: false,
      filters: false,
      align: 'right',
      cellRender: { name: '$vxeMoney' }
    },
    {
      title: '用途',
      field: 'useOfFunds',
      sortable: false,
      filters: false,
      width: 140,
      align: 'center'
    },
    {
      title: '付款方账户名称',
      field: 'payer',
      sortable: false,
      filters: false,
      width: 140,
      align: 'center'
    },
    {
      title: '收款方账户名称',
      field: 'payee',
      sortable: false,
      filters: false,
      width: 140,
      align: 'center'
    },
    {
      title: '上级指标文号',
      field: 'zfSupBgtDocNo',
      sortable: false,
      filters: false,
      width: 140,
      align: 'center'
    },
    {
      title: '指标文号',
      field: 'targetDocNum',
      sortable: false,
      filters: false,
      width: 140,
      align: 'center'
    },
    // {
    //   title: '支出功能科目编码',
    //   filters: false,
    //   width: 140,
    //   field: 'zfExpFuncCode',
    //   sortable: false,
    //   align: 'right'
    // },
    {
      title: '支出功能科目',
      filters: false,
      width: 140,
      field: 'expFuncName',
      formatter({ row }) {
        return row.zfExpFuncCode && row.zfExpFuncName ? `${row.zfExpFuncCode}-${row.zfExpFuncName}` : ''
      },
      sortable: false,
      align: 'right'
    },
    {
      title: '政府支出经济分类',
      filters: false,
      width: 140,
      field: 'zfGovBgtEcoName',
      formatter({ row }) {
        return row.zfGovBgtEcoCode && row.zfGovBgtEcoName ? `${row.zfGovBgtEcoCode}-${row.zfGovBgtEcoName}` : ''
      },
      sortable: false,
      align: 'right'
    },
    {
      title: '部门支出经济分类',
      filters: false,
      width: 140,
      field: 'zfDepBgtEcoName',
      formatter({ row }) {
        return row.zfDepBgtEcoCode && row.zfDepBgtEcoName ? `${row.zfDepBgtEcoCode}-${row.zfDepBgtEcoName}` : ''
      },
      sortable: false,
      align: 'right'
    },
    {
      title: '支付方式',
      filters: false,
      width: 140,
      field: 'payTypeName',
      sortable: false,
      align: 'right'
    },
    {
      title: '收款人银行',
      filters: false,
      width: 140,
      field: 'payeeAcctBankName',
      sortable: false,
      align: 'right'
    },
    {
      title: '收款方账号',
      field: 'receiveAccount',
      sortable: false,
      filters: false,
      width: 140,
      align: 'center'
    },
    {
      title: '付款方账号',
      field: 'payAccount',
      sortable: false,
      filters: false,
      width: 140,
      align: 'center'
    },
    {
      title: '付款日期',
      field: 'xpayDate',
      sortable: false,
      filters: false,
      width: 140,
      align: 'center'
    },
    {
      title: '预警时间',
      field: 'warnTime',
      sortable: false,
      filters: false,
      width: 140,
      align: 'center'
    }
  ],
  // 支出预警-已认定明细
  payokColumn: [
    {
      title: '地区名称',
      field: 'name',
      align: 'center',
      width: 140,
      filters: false
    },
    {
      title: '规则名称',
      field: 'fiRuleName',
      filters: false,
      width: 140,
      align: 'center'
    },
    {
      title: '处室名称',
      field: 'businessOffice',
      align: 'center',
      width: 140,
      filters: false
    },
    {
      title: '单位名称',
      field: 'agencyName',
      filters: false,
      width: 140,
      align: 'center'
    },
    {
      title: '专项资金',
      field: 'speTypeName',
      filters: false,
      width: 140,
      sortable: false,
      align: 'center'
    },
    {
      title: '项目名称',
      field: 'projectName',
      filters: false,
      width: 140,
      sortable: false,
      align: 'center'
    },
    {
      title: '金额',
      filters: false,
      field: 'paymentAmount',
      width: 140,
      sortable: false,
      align: 'right',
      cellRender: { name: '$vxeMoney' }
    },
    {
      title: '用途',
      field: 'useOfFunds',
      width: 140,
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '认定结果',
      field: 'affirmResult',
      width: 140,
      sortable: false,
      filters: false,
      align: 'center',
      formula: '',
      name: '$vxeSelect',
      cellRender: {
        name: '$vxeSelect',
        options: [
          { value: '1', label: '正常' },
          { value: '2', label: '违规' }
        ],
        props: {
          placeholder: '认定结果'
        }
      }
    },
    {
      title: '认定意见',
      field: 'matterDetail',
      sortable: false,
      width: 140,
      filters: false,
      align: 'center'
    },
    {
      title: '认定人',
      field: 'createPersonName',
      sortable: false,
      width: 140,
      filters: false,
      align: 'center'
    },
    {
      title: '认定时间',
      field: 'affirmTime',
      sortable: false,
      width: 140,
      filters: false,
      align: 'center'
    },
    {
      title: '支付时间',
      field: 'xPatyTime',
      sortable: false,
      width: 140,
      filters: false,
      align: 'center'
    },
    {
      title: '付款方账户名称',
      field: 'payer',
      sortable: false,
      width: 140,
      filters: false,
      align: 'center'
    },
    {
      title: '收款方账户名称',
      field: 'payee',
      sortable: false,
      width: 140,
      filters: false,
      align: 'center'
    },
    {
      title: '上级指标文号',
      field: 'zfSupBgtDocNo',
      sortable: false,
      filters: false,
      width: 140,
      align: 'center'
    },
    {
      title: '指标文号',
      field: 'targetDocNum',
      sortable: false,
      filters: false,
      width: 140,
      align: 'center'
    },
    // {
    //   title: '支出功能科目编码',
    //   filters: false,
    //   width: 140,
    //   field: 'zfExpFuncCode',
    //   sortable: false,
    //   align: 'right'
    // },
    {
      title: '支出功能科目',
      filters: false,
      width: 140,
      field: 'expFuncName',
      formatter({ row }) {
        return row.zfExpFuncCode && row.zfExpFuncName ? `${row.zfExpFuncCode}-${row.zfExpFuncName}` : ''
      },
      sortable: false,
      align: 'right'
    },
    {
      title: '政府支出经济分类',
      filters: false,
      width: 140,
      field: 'zfGovBgtEcoName',
      formatter({ row }) {
        return row.zfGovBgtEcoCode && row.zfGovBgtEcoName ? `${row.zfGovBgtEcoCode}-${row.zfGovBgtEcoName}` : ''
      },
      sortable: false,
      align: 'right'
    },
    {
      title: '部门支出经济分类',
      filters: false,
      width: 140,
      field: 'zfDepBgtEcoName',
      formatter({ row }) {
        return row.zfDepBgtEcoCode && row.zfDepBgtEcoName ? `${row.zfDepBgtEcoCode}-${row.zfDepBgtEcoName}` : ''
      },
      sortable: false,
      align: 'right'
    },
    {
      title: '支付方式',
      filters: false,
      width: 140,
      field: 'payTypeName',
      sortable: false,
      align: 'right'
    },
    {
      title: '收款人银行',
      filters: false,
      width: 140,
      field: 'payeeAcctBankName',
      sortable: false,
      align: 'right'
    },
    {
      title: '收款方账号',
      field: 'receiveAccount',
      sortable: false,
      width: 140,
      filters: false,
      align: 'center'
    },
    {
      title: '付款方账号',
      field: 'payAccount',
      sortable: false,
      width: 140,
      filters: false,
      align: 'center'
    }
  ],
  // 支出预警-已整改明细
  payedColumn: [
    {
      title: '地区名称',
      field: 'name',
      align: 'center',
      width: 140,
      filters: false
    },
    {
      title: '规则名称',
      field: 'fiRuleName',
      width: 140,
      filters: false,
      align: 'center'
    },
    {
      title: '处室名称',
      field: 'businessOffice',
      align: 'center',
      width: 140,
      filters: false
    },
    {
      title: '单位名称',
      field: 'agencyName',
      width: 140,
      filters: false,
      align: 'center'
    },
    {
      title: '专项资金',
      field: 'speTypeName',
      sortable: false,
      width: 140,
      filters: false,
      align: 'center'
    },
    {
      title: '项目名称',
      field: 'projectName',
      sortable: false,
      width: 140,
      filters: false,
      align: 'center'
    },
    {
      title: '金额',
      field: 'paymentAmount',
      width: 140,
      filters: false,
      sortable: false,
      align: 'right',
      cellRender: { name: '$vxeMoney' }
    },
    {
      title: '用途',
      field: 'useOfFunds',
      width: 140,
      filters: false,
      sortable: false,
      align: 'center'
    },
    {
      title: '认定意见',
      field: 'matterDetail',
      width: 140,
      filters: false,
      sortable: false,
      align: 'center'
    },
    {
      title: '违规类型',
      filters: false,
      width: 140,
      field: 'warnType',
      sortable: false,
      align: 'center'
    },
    {
      title: '整改结果',
      field: 'rectifyDetail',
      width: 140,
      filters: false,
      sortable: false,
      align: 'center'
    },
    {
      title: '整改意见',
      field: 'rectifyAsk',
      width: 140,
      filters: false,
      sortable: false,
      align: 'center'
    },
    {
      title: '整改时间',
      field: 'rectifyTime',
      width: 140,
      filters: false,
      sortable: false,
      align: 'center'
    },
    {
      title: '支付日期',
      field: 'xpayDate',
      width: 140,
      filters: false,
      sortable: false,
      align: 'center'
    },
    {
      title: '付款方账户名称',
      field: 'payer',
      width: 140,
      filters: false,
      sortable: false,
      align: 'center'
    },
    {
      title: '收款方账户名称',
      field: 'payee',
      width: 140,
      filters: false,
      sortable: false,
      align: 'center'
    },
    {
      title: '上级指标文号',
      field: 'zfSupBgtDocNo',
      sortable: false,
      filters: false,
      width: 140,
      align: 'center'
    },
    {
      title: '指标文号',
      field: 'targetDocNum',
      width: 140,
      filters: false,
      sortable: false,
      align: 'center'
    },
    // {
    //   title: '支出功能科目编码',
    //   filters: false,
    //   width: 140,
    //   field: 'zfExpFuncCode',
    //   sortable: false,
    //   align: 'right'
    // },
    {
      title: '支出功能科目',
      filters: false,
      width: 140,
      field: 'expFuncName',
      formatter({ row }) {
        return row.zfExpFuncCode && row.zfExpFuncName ? `${row.zfExpFuncCode}-${row.zfExpFuncName}` : ''
      },
      sortable: false,
      align: 'right'
    },
    {
      title: '政府支出经济分类',
      filters: false,
      width: 140,
      field: 'zfGovBgtEcoName',
      formatter({ row }) {
        return row.zfGovBgtEcoCode && row.zfGovBgtEcoName ? `${row.zfGovBgtEcoCode}-${row.zfGovBgtEcoName}` : ''
      },
      sortable: false,
      align: 'right'
    },
    {
      title: '部门支出经济分类',
      filters: false,
      width: 140,
      field: 'zfDepBgtEcoName',
      formatter({ row }) {
        return row.zfDepBgtEcoCode && row.zfDepBgtEcoName ? `${row.zfDepBgtEcoCode}-${row.zfDepBgtEcoName}` : ''
      },
      sortable: false,
      align: 'right'
    },
    {
      title: '支付方式',
      filters: false,
      width: 140,
      field: 'payTypeName',
      sortable: false,
      align: 'right'
    },
    {
      title: '收款人银行',
      filters: false,
      width: 140,
      field: 'payeeAcctBankName',
      sortable: false,
      align: 'right'
    },
    {
      title: '收款方账号',
      field: 'receiveAccount',
      width: 140,
      filters: false,
      sortable: false,
      align: 'center'
    },
    {
      title: '付款方账号',
      width: 140,
      filters: false,
      field: 'payAccount',
      sortable: false,
      align: 'center'
    }
  ],

  // 未导入惠企利民-未处理明细
  notgetColumn: [
    {
      title: '地区名称',
      field: 'name',
      align: 'center',
      width: 140,
      filters: false
    },
    {
      title: '处室名称',
      field: 'businessOffice',
      align: 'center',
      width: 140,
      filters: false
    },
    {
      title: '指标文号',
      field: 'targetDocNum',
      width: 140,
      filters: false,
      sortable: false,
      align: 'center'
    },
    {
      title: '专项资金',
      field: 'speTypeName',
      width: 140,
      filters: false,
      sortable: false,
      align: 'center'
    },
    {
      title: '项目',
      field: 'projectName',
      width: 140,
      filters: false,
      sortable: false,
      align: 'center'
    },
    {
      title: '金额',
      width: 140,
      filters: false,
      field: 'paymentAmount',
      sortable: false,
      align: 'right',
      cellRender: { name: '$vxeMoney' }
    }
  ],
  // 未导入惠企利民-已整改明细

  getColumn: [
    {
      title: '地区名称',
      field: 'agencyCodeName',
      width: 140,
      filters: false,
      align: 'center'
    },
    {
      title: '处室名称',
      field: 'businessOffice',
      align: 'center',
      width: 140,
      filters: false
    },
    {
      title: '指标文号',
      field: 'targetDocNum',
      width: 140,
      filters: false,
      sortable: false,
      align: 'center'
    },
    {
      title: '专项资金',
      field: 'speTypeName',
      width: 140,
      filters: false,
      sortable: false,
      align: 'center'
    },
    {
      title: '项目',
      field: 'projectName',
      width: 140,
      filters: false,
      sortable: false,
      align: 'center'
    },
    {
      title: '金额',
      width: 140,
      filters: false,
      field: 'paymentAmount',
      sortable: false,
      align: 'right',
      cellRender: { name: '$vxeMoney' }
    }
  ]

}
export default proconf
