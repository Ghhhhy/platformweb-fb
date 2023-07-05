// import Store from '@/utils/store'
export let proconf = {
  // 高级查询配置
  formConfig: [
    {
      title: '指标来源',
      field: 'source_type_',
      itemRender: {
        name: '$formTreeInput',
        props: {
          reloaddata: true,
          isServer: true,
          ajaxType: 'post',
          serverUri: 'pay-clear-service/v2/elementtree',
          editConfig: { placeholder: '指标来源' },
          queryparams: {
            elementCode: 'source_type'
          }
        }
      }
    },
    {
      title: '功能分类',
      field: 'exp_func_',
      itemRender: {
        name: '$formTreeInput',
        props: {
          reloaddata: true,
          isServer: true,
          ajaxType: 'post',
          serverUri: 'pay-clear-service/v2/elementtree',
          editConfig: { placeholder: '功能分类' },
          queryparams: {
            elementCode: 'EXP_FUNC'
          }
        }
      }
    },
    {
      title: '预算单位',
      field: 'agency_',
      itemRender: {
        name: '$formTreeInput',
        props: {
          reloaddata: true,
          isServer: true,
          ajaxType: 'post',
          serverUri: 'pay-clear-service/v2/elementtree',
          editConfig: { placeholder: '预算单位' },
          queryparams: {
            elementCode: 'agency'
          }
        }
      }
    },
    {
      title: '月',
      field: 'plan_month',
      itemRender: {
        name: '$vxeFormSelect',
        props: {
          placeholder: '请选择月份'
        },
        options: [
          {
            value: '01',
            label: '1月'
          },
          {
            value: '02',
            label: '2月'
          },
          {
            value: '03',
            label: '3月'
          },
          {
            value: '04',
            label: '4月'
          },
          {
            value: '05',
            label: '5月'
          },
          {
            value: '06',
            label: '6月'
          },
          {
            value: '07',
            label: '7月'
          },
          {
            value: '08',
            label: '8月'
          },
          {
            value: '09',
            label: '9月'
          },
          {
            value: '10',
            label: '10月'
          },
          {
            value: '11',
            label: '11月'
          },
          {
            value: '12',
            label: '12月'
          }]
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
          serverUri: 'pay-clear-service/v2/elementtree',
          editConfig: { placeholder: '资金性质' },
          queryparams: {
            elementCode: 'fund_type'
          }
        }
      }
    },
    // {
    //   title: '收入分类科目',
    //   field: 'incomesort_',
    //   itemRender: {
    //     name: '$formTreeInput',
    //     props: {
    //       reloaddata: true,
    //       isServer: true,
    //       ajaxType: 'post',
    //       serverUri: 'pay-clear-service/v2/elementtree',
    //       editConfig: { placeholder: '收入分类科目' },
    //       queryparams: {
    //         elementCode: 'income_sort'
    //       }
    //     }
    //   }
    // },
    // {
    //   title: '项目',
    //   field: 'pro_',
    //   itemRender: {
    //     name: '$formTreeInput',
    //     props: {
    //       reloaddata: true,
    //       isServer: true,
    //       ajaxType: 'post',
    //       serverUri: 'pay-clear-service/v2/elementtree',
    //       editConfig: { placeholder: '项目' },
    //       queryparams: {
    //         elementCode: 'pro'
    //       }
    //     }
    //   }
    // },
    {
      title: '支付方式',
      field: 'pay_type_',
      itemRender: {
        name: '$formTreeInput',
        props: {
          reloaddata: true,
          isServer: true,
          ajaxType: 'post',
          serverUri: 'pay-clear-service/v2/elementtree',
          editConfig: { placeholder: '支付方式' },
          queryparams: {
            elementCode: 'pay_type'
          }
        }
      }
    },
    {
      title: '单位零余额账户类型',
      field: 'agency_acct_',
      itemRender: {
        name: '$formTreeInput',
        props: {
          reloaddata: true,
          isServer: true,
          ajaxType: 'post',
          serverUri: 'pay-clear-service/v2/elementtree',
          editConfig: { placeholder: '单位零余额账户类型' },
          queryparams: {
            elementCode: 'agency_acct'
          }
        }
      }
    }
    // {
    //   title: '结算方式',
    //   field: 'set_mode_',
    //   itemRender: {
    //     name: '$formTreeInput',
    //     props: {
    //       reloaddata: true,
    //       isServer: true,
    //       ajaxType: 'post',
    //       serverUri: 'pay-clear-service/v2/elementtree',
    //       editConfig: { placeholder: '结算方式' },
    //       queryparams: {
    //         elementCode: 'set_mode'
    //       }
    //     }
    //   }
    // },
    // {
    //   title: '预算支出分类科目',
    //   field: 'dep_bgt_eco_',
    //   itemRender: {
    //     name: '$formTreeInput',
    //     props: {
    //       reloaddata: true,
    //       isServer: true,
    //       ajaxType: 'post',
    //       serverUri: 'pay-clear-service/v2/elementtree',
    //       editConfig: { placeholder: '预算支出分类科目' },
    //       queryparams: {
    //         elementCode: 'dep_bgt_eco'
    //       }
    //     }
    //   }
    // },
    // {
    //   title: '资金来往对象类别',
    //   field: 'fund_traobj_type_',
    //   itemRender: {
    //     name: '$formTreeInput',
    //     props: {
    //       reloaddata: true,
    //       isServer: true,
    //       ajaxType: 'post',
    //       serverUri: 'pay-clear-service/v2/elementtree',
    //       editConfig: { placeholder: '资金来往对象类' },
    //       queryparams: {
    //         elementCode: 'fund_traobj_type'
    //       }
    //     }
    //   }
    // },
    // {
    //   title: '单位内设机构',
    //   field: 'internal_dep_',
    //   itemRender: {
    //     name: '$formTreeInput',
    //     props: {
    //       reloaddata: true,
    //       isServer: true,
    //       ajaxType: 'post',
    //       serverUri: 'pay-clear-service/v2/elementtree',
    //       editConfig: { placeholder: '单位内设机构' },
    //       queryparams: {
    //         elementCode: 'internal_dep'
    //       }
    //     }
    //   }
    // },
    // {
    //   title: '清算账户',
    //   field: 'clear_acct_',
    //   itemRender: {
    //     name: '$formTreeInput',
    //     props: {
    //       reloaddata: true,
    //       isServer: true,
    //       ajaxType: 'post',
    //       serverUri: 'pay-clear-service/v2/elementtree',
    //       editConfig: { placeholder: '清算账户' },
    //       queryparams: {
    //         elementCode: 'clear_acct'
    //       }
    //     }
    //   }
    // },
    // {
    //   title: '财政零余额账户',
    //   field: 'cz_acct_',
    //   itemRender: {
    //     name: '$formTreeInput',
    //     props: {
    //       reloaddata: true,
    //       isServer: true,
    //       ajaxType: 'post',
    //       serverUri: 'pay-clear-service/v2/elementtree',
    //       editConfig: { placeholder: '财政零余额账户' },
    //       queryparams: {
    //         elementCode: 'cz_acct'
    //       }
    //     }
    //   }
    // }
  ],
  // 指标额度表头配置
  itemsConfig: [
    {
      title: '预算单位',
      field: 'agency',
      width: 200,
      align: 'left'
    },
    {
      title: '单位主管处室',
      field: 'manage_mof_dep_name',
      width: 141,
      align: 'left'
    },
    // {
    //   title: '支付方式',
    //   field: 'pay_type_name',
    //   width: 150,
    //   align: 'center'
    // },
    // {
    //   title: '部门预算经济科目分类',
    //   field: 'dep_bgt_eco',
    //   width: 220,
    //   align: 'center'
    // },
    {
      title: '支出项目',
      field: 'pro_name',
      width: 150,
      align: 'left'
    },
    {
      title: '指标已用额度',
      field: 'useamt',
      width: 180,
      align: 'right',
      combinedType: ['average', 'subTotal', 'total', 'totalAll'],
      cellRender: {
        name: '$moneyRender'
      }
    },
    {
      title: '指标总金额',
      field: 'aviamt',
      width: 150,
      align: 'right',
      combinedType: ['average', 'subTotal', 'total', 'totalAll'],
      cellRender: {
        name: '$moneyRender'
      }
    },
    {
      title: '指标可用额度',
      field: 'canuseamt',
      width: 180,
      align: 'right',
      combinedType: ['average', 'subTotal', 'total', 'totalAll'],
      cellRender: {
        name: '$moneyRender'
      }
    },
    {
      title: '功能分类',
      field: 'exp_func',
      width: 150,
      align: 'left'
    },
    {
      title: '政府预算经济科目分类',
      field: 'gov_bgt_eco',
      width: 220,
      align: 'left'
    },
    // {
    //   title: '支付率',
    //   field: '',
    //   width: 120,
    //   align: 'center'
    // },
    {
      title: '资金性质',
      field: 'fund_type_name',
      width: 150,
      align: 'left'
    },
    {
      title: '指标来源类型',
      field: 'source_type_name',
      width: 180,
      align: 'left'
    },
    {
      title: '支付方式',
      field: 'pay_type_name',
      width: 150,
      align: 'left'
    },
    {
      title: '在途调减金额',
      field: '',
      width: 180,
      align: 'left'
    },
    {
      title: '预算来源',
      field: '',
      width: 150,
      align: 'left'
    },
    {
      title: '三公经费',
      field: '',
      width: 150,
      align: 'left'
    },
    {
      title: '来源项目',
      field: 'ori_pro',
      width: 150,
      align: 'left'
    },
    {
      title: '指标文号',
      field: '',
      width: 160,
      align: 'left'
    },
    {
      title: '资金管理处室',
      field: '',
      width: 180,
      align: 'left'
    },
    // {
    //   title: '资金性质',
    //   field: 'fund_type_name',
    //   width: 150,
    //   align: 'center'
    // },
    // {
    //   title: '功能分类',
    //   field: 'exp_func',
    //   width: 150,
    //   align: 'center'
    // },
    // {
    //   title: '政府预算经济科目分类',
    //   field: 'gov_bgt_eco',
    //   width: 220,
    //   align: 'center'
    // },
    // {
    //   title: '指标来源类型',
    //   field: 'source_type_name',
    //   width: 180,
    //   align: 'center'
    // },
    {
      title: '工资标识',
      field: '',
      width: 150,
      align: 'left'
    },
    {
      title: '是否扶贫',
      field: '',
      width: 150,
      align: 'left'
    },
    {
      title: '支出级次',
      field: '',
      width: 150,
      align: 'left'
    },
    {
      title: '指标摘要',
      field: '',
      width: 150,
      align: 'left'
    },
    {
      title: '是否政府采购',
      field: '',
      width: 180,
      align: 'left'
    },
    {
      title: '是否工会经费',
      field: '',
      width: 180,
      align: 'left'
    },
    // {
    //   title: '支付方式',
    //   field: 'pay_type_name',
    //   width: 150,
    //   align: 'center'
    // },
    {
      title: '账户类型',
      field: 'accf_name',
      width: 150,
      align: 'left'
    },
    {
      title: '部门预算经济科目分类',
      field: 'dep_bgt_eco',
      width: 220,
      align: 'left'
    }
  ]
}
