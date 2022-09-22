const tableConf = {
  formConfig: [
    {
      field: 'pro_cat_',
      title: '项目类别',
      span: 8,
      itemRender: {
        name: '$formTreeInput',
        props: {
          isServer: true,
          isleaf: true,
          elecode: 'procat',
          queryparams: {
            eleCode: 'procat',
            sxspecroleguid: '3250FC3332E1421DA1B0388AA0D34BDC',
            queryConditions: 'and code like \'3%\' and code not in (\'33\')'
          }
        }
      }
    },
    {
      field: 'payout_kind_',
      title: '支出项目类别',
      span: 8,
      itemRender: {
        name: '$formTreeInput',
        props: {
          isleaf: true,
          isServer: true,
          elecode: 'vw_payoutkind',
          queryparams: {
            eleCode: 'vw_payoutkind',
            sxspecroleguid: '3250FC3332E1421DA1B0388AA0D34BDC',
            queryConditions: ''
          }
        }
      }
    },

    {
      field: 'pro_catalogue_',
      title: '专用项目目录',
      span: 8,
      itemRender: {
        name: '$formTreeInput',
        props: {
          disabled: true,
          isServer: true,
          isleaf: true,
          elecode: 'vw_pm_profession_project',
          queryparams: {
            eleCode: 'vw_pm_profession_project',
            sxspecroleguid: '3250FC3332E1421DA1B0388AA0D34BDC'
          }
        }
      }
    },
    {
      field: 'exist_statue_code',
      title: '存续状态',
      span: 8,
      itemRender: {
        name: '$vxeFormSelect',
        options: [
          {
            value: '001',
            label: '一次性项目'
          },
          {
            value: '002',
            label: '经常性项目'
          },
          {
            value: '003',
            label: '阶段性项目'
          }],
        props: {
          placeholder: '请选择存续状态'
        }
      }
    },
    {
      field: 'spe_type_',
      title: '专项资金目录',
      span: 8,
      itemRender: {
        name: '$formTreeInput',
        props: {
          isServer: false,
          isleaf: true,
          elecode: 'vw_special_type',
          queryparams: {
            eleCode: 'vw_special_type',
            sxspecroleguid: '3250FC3332E1421DA1B0388AA0D34BDC'
          }
        }
      }
    },
    {
      field: 'pro_code',
      title: '项目编码',
      span: 8,
      itemRender: {
        name: '$input',
        props: {
          disabled: true,
          type: 'text'
        }
      }
    },
    {
      field: 'pro_name',
      title: '项目名称',
      span: 8,
      itemRender: {
        name: '$input',
        props: {
          type: 'text',
          placeholder: '请输入内容'
        }
      }
    },
    {
      field: 'use_agency_name',
      title: '项目单位',
      span: 8,
      itemRender: {
        name: '$input',
        props: {
          disabled: true,
          type: 'text',
          placeholder: '请输入内容'
        }
      }
    },
    {
      field: 'dept_name',
      title: '主管部门',
      span: 8,
      itemRender: {
        name: '$input',
        props: {
          disabled: true,
          type: 'text'
        }
      }
    },
    {
      field: 'mof_dep_name',
      title: '财政内部机构',
      span: 8,
      itemRender: {
        name: '$input',
        props: {
          disabled: true,
          type: 'text'
        }
      }
    },
    {
      field: 'fun_res_',
      title: '职能职责',
      span: 8,
      itemRender: {
        name: '$treeinput',
        props: {
          isServer: true,
          queryparams: {
            eleCode: 'vw_pm_funcresp',
            sxspecroleguid: '3250FC3332E1421DA1B0388AA0D34BDC'
          }
        }
      }
    },
    {
      field: 'pro_start_year',
      title: '项目起始年度',
      span: 8,
      itemRender: {
        name: '$vxeFormInput',
        props: {
          type: 'year',
          placeholder: '选择日期'
        }
      }
    },
    {
      field: 'end_year',
      title: '项目终止年度',
      span: 8,
      itemRender: {
        name: '$vxeFormInput',
        props: {
          type: 'year',
          placeholder: '选择日期'
        }
      }
    },
    {
      field: 'pro_term',
      title: '项目期限(年)',
      span: 8,
      itemRender: {
        name: '$input',
        props: {
          disabled: true,
          type: 'input',
          placeholder: '请输入内容'
        }
      }
    },
    {
      field: 'pro_total_amt',
      title: '项目总金额',
      span: 8,
      itemRender: {
        name: '$input',
        props: {
          disabled: true,
          type: 'number',
          placeholder: '请输入数字'
        }
      }
    },
    {
      field: 'scoi_invest_fund',
      title: '其中：社会投入资金',
      span: 8,
      itemRender: {
        name: '$input',
        props: {
          disabled: true,
          type: 'number',
          placeholder: '请输入数字'
        }
      }
    },
    {
      field: 'apply_link_man',
      title: '申报单位联系人',
      span: 8,
      itemRender: {
        name: '$input',
        props: {
          type: 'text',
          placeholder: '请输入内容'
        }
      }
    },
    {
      field: 'apply_link_tel',
      title: '联系电话',
      span: 8,
      itemRender: {
        name: '$input',
        props: {
          placeholder: '请输入内容'
        }
      }
    },
    // {
    //   field: 'is_track',
    //   title: '是否追踪',
    //   span: 8,
    //   itemRender: {
    //     name: '$vxeFormRadio',
    //     options: [
    //       {
    //         value: '1',
    //         label: '是'
    //       },
    //       {
    //         value: '0',
    //         label: '否'
    //       }
    //     ]
    //   }
    // },
    // {
    //   field: 'is_captial_cons_pro',
    //   title: '是否基建项目',
    //   span: 8,
    //   itemRender: {
    //     name: '$vxeFormRadio',
    //     options: [
    //       {
    //         value: '1',
    //         label: '是'
    //       },
    //       {
    //         value: '0',
    //         label: '否'
    //       }
    //     ]
    //   }
    // },
    // {
    //   field: 'is_scientific',
    //   title: '是否科研项目',
    //   span: 8,
    //   itemRender: {
    //     name: '$vxeFormRadio',
    //     options: [
    //       {
    //         value: '1',
    //         label: '是'
    //       },
    //       {
    //         value: '0',
    //         label: '否'
    //       }
    //     ]
    //   }
    // },
    {
      field: 'is_gov_info_server',
      title: '是否信息化项目',
      span: 8,
      itemRender: {
        name: '$vxeFormRadio',
        options: [
          {
            value: '1',
            label: '是'
          },
          {
            value: '0',
            label: '否'
          }]
      }
    },
    {
      field: 'is_gov',
      title: '是否包含政府采购预算',
      span: 8,
      itemRender: {
        name: '$vxeFormRadio',
        options: [
          {
            value: '1',
            label: '是'
          },
          {
            value: '0',
            label: '否'
          }]
      }
    },
    {
      field: 'is_asset',
      title: '是否资产配置项目',
      span: 8,
      itemRender: {
        name: '$vxeFormRadio',
        options: [
          {
            value: '1',
            label: '是'
          },
          {
            value: '0',
            label: '否'
          }]
      }
    },
    {
      field: 'is_govbuy',
      title: '是否包含政府购买服务预算',
      span: 8,
      itemRender: {
        name: '$vxeFormRadio',
        options: [
          {
            value: '1',
            label: '是'
          },
          {
            value: '0',
            label: '否'
          }]
      }
    },
    {
      field: 'degisn_consideration',
      title: '设立依据',
      span: 24,
      itemRender: {
        name: '$textarea',
        props: {
          type: 'text',
          placeholder: '请输入：政策依据，具体文件要求，会议要求，对应部门单位职能，工作方案并在项目附件中上传具体依据'
        }
      }
    },
    {
      field: 'pro_desc',
      title: '项目概述',
      span: 24,
      itemRender: {
        name: '$textarea',
        props: {
          type: 'text',
          placeholder: '请输入：项目目标，项目实施方式，项目资金来源及项目风险，项目实施情况等'
        }
      }
    },
    {
      field: 'money_measure',
      title: '经费测算',
      span: 24,
      itemRender: {
        name: '$textarea',
        props: {
          type: 'text',
          placeholder: '请输入经费具体测算方法，测算依据'
        }
      }
    },
    {
      field: 'pro_plan',
      title: '项目实施方案',
      span: 24,
      itemRender: {
        name: '$textarea',
        props: {
          type: 'text',
          placeholder: '请输入：项目实施地点，项目实施时间，实施方式等'
        }
      }
    },
    {
      field: 'pro_necessary',
      title: '项目必要性',
      span: 24,
      itemRender: {
        name: '$textarea',
        props: {
          type: 'text',
          placeholder: '请输入内容'
        }
      }
    },
    {
      field: 'pro_feasibility',
      title: '项目可行性',
      span: 24,
      itemRender: {
        name: '$textarea',
        props: {
          type: 'text',
          placeholder: '请输入内容'
        }
      }
    }
  ]
}
export default tableConf
