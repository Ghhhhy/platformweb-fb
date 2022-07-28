// 指标管理--》指标冻结
// 界面配置文件
const frozenConfig = {
  statusButtons: [
    {
      type: 'button',
      iconName: 'base-daiban.png',
      iconNameActive: 'base-daiban-active.png',
      label: '未冻结',
      code: '9'
    },
    {
      type: 'button',
      iconName: 'base-yiban.png',
      iconNameActive: 'base-yiban-active.png',
      label: '已冻结',
      code: '10'
    }
  ],
  curStatusButton: {
    type: 'button',
    code: '9',
    curValue: '9'
  },
  statusDefaultNum: {
    '9': 0,
    '10': 0
  },
  // buttons: [
  //   { code: 'toolbar-frozen', label: '冻结', actionType: '1', glType: '1', actionName: '冻结', action: '' },
  //   { code: 'toolbar-thaw', label: '解冻', actionType: '1', glType: '1', actionName: '解冻', action: '' }
  // ],
  buttonsInfos: {
    '9': [
      { code: 'toolbar-frozen', label: '冻结', actionType: '1', glType: '1', actionName: '冻结', action: '' }
    ],
    '10': [
      { code: 'toolbar-thaw', label: '解冻', actionType: '1', glType: '1', actionName: '解冻', action: '' }
    ]
  },
  lefttreeConfig: {
    curRadio: 'agency',
    placeholder: '请输入关键字',
    radioGroup: [
      {
        code: 'bgt_mof_dep',
        label: '资金管理处室'
      },
      {
        code: 'agency',
        label: '预算单位'
      },
      {
        code: 'expfunc',
        label: '功能分类'
      }
    ]
  },
  queryFormConfig: [
    {
      field: 'bgt_mof_dep_',
      title: '资金管理处室',
      itemRender: {
        name: '$formTreeInput',
        props: {
          reloaddata: true,
          isServer: true,
          ajaxType: 'post',
          // placeholder: '资金管理处室',
          editConfig: { placeholder: '资金管理处室', initLoadTree: false },
          serverUri: 'mp-b-budget-service/v1/common/budget/elementtree',
          queryparams: {
            eleCode: 'bgt_mof_dep'
          }
        }
      }
    },
    {
      field: 'agency_',
      title: '预算单位',
      itemRender: {
        name: '$formTreeInput',
        props: {
          reloaddata: true,
          isServer: true,
          ajaxType: 'post',
          // placeholder: '预算单位',
          editConfig: { placeholder: '预算单位', initLoadTree: false },
          serverUri: 'mp-b-budget-service/v1/common/budget/elementtree',
          queryparams: {
            eleCode: 'agency'
          }
        }
      }
    },
    {
      field: 'exp_func_',
      title: '功能分类',
      itemRender: {
        name: '$formTreeInput',
        props: {
          reloaddata: true,
          isServer: true,
          ajaxType: 'post',
          // placeholder: '功能分类',
          editConfig: { placeholder: '功能分类', initLoadTree: false },
          serverUri: 'mp-b-budget-service/v1/common/budget/elementtree',
          queryparams: {
            eleCode: 'expfunc'
          }
        }
      }
    },
    {
      field: 'pay_type_',
      title: '支付方式',
      itemRender: {
        name: '$formTreeInput',
        props: {
          reloaddata: true,
          isServer: true,
          ajaxType: 'post',
          // placeholder: '支付方式',
          editConfig: { placeholder: '支付方式', initLoadTree: false },
          serverUri: 'mp-b-budget-service/v1/common/budget/elementtree',
          queryparams: {
            eleCode: 'paytype'
          }
        }
      }
    },
    {
      title: '政府预算经济科目分类',
      field: 'gov_bgt_eco_',
      itemRender: {
        name: '$formTreeInput',
        props: {
          type: 'text',
          reloaddata: true,
          isServer: true,
          ajaxType: 'post',
          // placeholder: '政府预算经济科目分类',
          editConfig: { placeholder: '政府预算经济科目分类', initLoadTree: false },
          serverUri: 'mp-b-budget-service/v1/common/budget/elementtree',
          queryparams: {
            eleCode: 'govbgteco'
          }
        }
      }
    },
    {
      title: '资金性质',
      field: 'fund_type_',
      itemRender: {
        name: '$formTreeInput',
        props: {
          reloaddata: true,
          isServer: true,
          ajaxType: 'post',
          // placeholder: '资金性质',
          editConfig: { placeholder: '资金性质', initLoadTree: false },
          serverUri: 'mp-b-budget-service/v1/common/budget/elementtree',
          queryparams: {
            eleCode: 'fundtype'
          }
        }
      }
    },
    {
      field: 'bgt_type_',
      title: '指标类型',
      itemRender: {
        name: '$formTreeInput',
        props: {
          reloaddata: true,
          isServer: true,
          ajaxType: 'post',
          editConfig: { placeholder: '指标类型', initLoadTree: false },
          serverUri: 'mp-b-budget-service/v1/common/budget/elementtree',
          queryparams: {
            eleCode: 'bgttype'
          }
        }
      }
    }
  ],
  queryFormBaseData: {
    bgt_mof_dep_: '',
    agency_: '',
    exp_func_: '',
    pay_type_: '',
    gov_bgt_eco_: '',
    fund_type_: '',
    bgt_type_: ''
  },
  tableColumns: [
    {
      title: '资金管理处室',
      field: 'bgt_mof_dep_name',
      width: '200',
      filterRender: {
        name: '$input',
        props: {
          type: 'text'
        }
      }
    },
    {
      title: '指标额度',
      field: 'avi_amt',
      width: '200',
      align: 'right',
      formatter: 'formatMoney',
      // 金额格式
      cellRender: {
        name: '$moneyRender'
      },
      type: 'number',
      combinedType: ['average', 'subTotal', 'total', 'totalAll']
    },
    {
      title: '已用额度',
      field: 'use_amt',
      width: '200',
      align: 'right',
      formatter: 'formatMoney',
      // 金额格式
      cellRender: {
        name: '$moneyRender'
      },
      type: 'number',
      combinedType: ['average', 'subTotal', 'total', 'totalAll']
    },
    {
      title: '可用额度',
      field: 'canuse_amt',
      width: '200',
      align: 'right',
      formatter: 'formatMoney',
      // 金额格式
      cellRender: {
        name: '$moneyRender'
      },
      type: 'number',
      combinedType: ['average', 'subTotal', 'total', 'totalAll']
    },
    {
      title: '冻结金额',
      field: 'frozenamt',
      width: '150',
      align: 'right',
      formatter: 'formatMoney',
      // 金额格式
      cellRender: {
        name: '$moneyRender'
      },
      type: 'number',
      combinedType: ['average', 'subTotal', 'total', 'totalAll']
    },
    {
      title: '资金性质',
      field: 'fund_type_name',
      width: '200',
      filterRender: {
        name: '$input',
        props: {
          type: 'text'
        }
      }
    },
    {
      title: '预算单位',
      field: 'agency_name',
      width: '200',
      filterRender: {
        name: '$input',
        props: {
          type: 'text'
        }
      }
    },
    {
      title: '指标来源类型',
      field: 'bgt_source_name',
      width: '200',
      filterRender: {
        name: '$input',
        props: {
          type: 'text'
        }
      }
    },
    {
      title: '功能分类',
      field: 'exp_func_name',
      width: '200',
      filterRender: {
        name: '$input',
        props: {
          type: 'text'
        }
      }
    },
    {
      title: '政府预算经济科目分类',
      field: 'gov_bgt_eco',
      width: '200',
      filterRender: {
        name: '$input',
        props: {
          type: 'text'
        }
      }
    },
    {
      title: '支出级次',
      field: 'dir_name',
      width: '200',
      filterRender: {
        name: '$input',
        props: {
          type: 'text'
        }
      }
    },
    {
      title: '指标摘要',
      field: 'bgt_rem_name',
      width: '200',
      filterRender: {
        name: '$input',
        props: {
          type: 'text'
        }
      }
    },
    {
      title: '指标文号',
      field: 'cor_bgt_doc_no',
      width: '200',
      filterRender: {
        name: '$input',
        props: {
          type: 'text'
        }
      }
    },
    {
      title: '预算来源',
      field: 'version_name',
      width: '200',
      filterRender: {
        name: '$input',
        props: {
          type: 'text'
        }
      }
    }
  ],
  thawtableColumns: [
    {
      title: '资金管理处室',
      field: 'bgt_mof_dep_name',
      width: '200',
      filterRender: {
        name: '$input',
        props: {
          type: 'text'
        }
      }
    },
    {
      title: '指标冻结额度',
      field: 'avi_amt',
      width: '200',
      align: 'right',
      formatter: 'formatMoney'
    },
    {
      title: '已解冻额度',
      field: 'use_amt',
      width: '200',
      align: 'right',
      formatter: 'formatMoney'
    },
    {
      title: '未解冻额度',
      field: 'canuse_amt',
      width: '200',
      align: 'right',
      formatter: 'formatMoney'
    },
    {
      title: '资金性质',
      field: 'fund_type_name',
      width: '200',
      filterRender: {
        name: '$input',
        props: {
          type: 'text'
        }
      }
    },
    {
      title: '预算单位',
      field: 'agency_name',
      width: '200',
      filterRender: {
        name: '$input',
        props: {
          type: 'text'
        }
      }
    },
    {
      title: '指标来源类型',
      field: 'bgt_source_name',
      width: '200',
      filterRender: {
        name: '$input',
        props: {
          type: 'text'
        }
      }
    },
    {
      title: '功能分类',
      field: 'exp_func_name',
      width: '200',
      filterRender: {
        name: '$input',
        props: {
          type: 'text'
        }
      }
    },
    {
      title: '政府预算经济科目分类',
      field: 'gov_bgt_eco',
      width: '200',
      filterRender: {
        name: '$input',
        props: {
          type: 'text'
        }
      }
    },
    {
      title: '支出级次',
      field: 'dir_name',
      width: '200',
      filterRender: {
        name: '$input',
        props: {
          type: 'text'
        }
      }
    },
    {
      title: '指标摘要',
      field: 'bgt_rem_name',
      width: '200',
      filterRender: {
        name: '$input',
        props: {
          type: 'text'
        }
      }
    },
    {
      title: '指标文号',
      field: 'cor_bgt_doc_no',
      width: '200',
      filterRender: {
        name: '$input',
        props: {
          type: 'text'
        }
      }
    },
    {
      title: '预算来源',
      field: 'version_name',
      width: '200',
      filterRender: {
        name: '$input',
        props: {
          type: 'text'
        }
      }
    }
  ],
  frozenFormConfig: [
    {
      field: 'frozentype',
      title: '冻结方式',
      span: 12,
      itemRender: {
        name: '$vxeFormRadio',
        value: '0',
        options: [
          {
            value: '0',
            label: '金额'
          },
          {
            value: '1',
            label: '比例'
          }
        ]
      }
    },
    {
      field: 'frozenamt',
      title: '冻结金额',
      span: 20,
      itemRender: {
        name: '$vxeFormInput',
        props: {
          type: 'float',
          placeholder: '冻结金额'
        }
      }
    },
    {
      field: 'remark',
      title: '冻结意见',
      span: 20,
      itemRender: {
        name: '$textarea',
        props: {
          type: 'text',
          placeholder: '请输入内容'
        }
      }
    }
  ],
  frozenFormData: {
    frozentype: '0',
    frozenamt: '',
    remark: ''
  },
  thawFormConfig: [
    {
      field: 'thawtype',
      title: '解冻方式',
      span: 12,
      itemRender: {
        name: '$vxeFormRadio',
        value: '0',
        options: [
          {
            value: '0',
            label: '金额'
          },
          {
            value: '1',
            label: '比例'
          }
        ]
      }
    },
    {
      field: 'thawamt',
      title: '解冻金额',
      span: 20,
      itemRender: {
        name: '$vxeFormInput',
        props: {
          type: 'float',
          placeholder: '冻结金额'
        }
      }
    },
    {
      field: 'remark',
      title: '解冻意见',
      span: 20,
      itemRender: {
        name: '$textarea',
        props: {
          type: 'text',
          placeholder: '请输入内容'
        }
      }
    }
  ],
  thawFormData: {
    thawtype: '0',
    thawamt: '',
    remark: ''
  }
}

export default function(key) {
  if (key) {
    return frozenConfig[key]
  }
}
