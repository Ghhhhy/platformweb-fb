// 9163003 追加主界面查询配置
export default {
  '9163003': {
    tableCols: [],
    editTableCols: [],
    formItems: [ // 高级查询
      {
        field: 'agency',
        title: '预算单位',
        span: 4,
        type: 'treeinput-multiple',
        itemRender: {
          name: '$vxeTree',
          props: {
            placeholder: '预算单位',
            queryparams: {
              eleCode: 'vw_bas_agency_pr_tree'
            },
            config: {
              multiple: true,
              isHump: true,
              treeProps: {
                // 树配置选项
                labelFormat: '{code}-{name}', // {code}-{name}
                nodeKey: 'id', // 树的主键
                label: 'name', // 树的显示lalel字段
                children: 'children' // 树的嵌套字段
              },
              axiosConfig: {
                successCode: '100000', // 成功code
                statusField: 'code',
                method: 'post', // 请求方式
                url: 'bisConfig/config/common/queryTreeAssistData' // 'queryTreeAssistData', // 是否调用接口直接获取数据，当此项有值时将会自动家数据
              },
              isleaf: true
            }
          }
        }
      },
      // {
      //   title: '支出项目类别',
      //   field: 'payoutKind',
      //   span: 4,
      //   align: 'center',
      //   type: 'treeinput-multiple',
      //   itemRender: {
      //     name: '$vxeTree',
      //     props: {
      //       queryparams: {
      //         eleCode: 'vw_payoutkind',
      //         sxspecroleguid: '3250FC3332E1421DA1B0388AA0D34BDC'
      //       },
      //       config: {
      //         placeholder: '支出项目类别',
      //         multiple: true,
      //         treeProps: {
      //           // 树配置选项
      //           labelFormat: '{code}-{name}', // {code}-{name}
      //           nodeKey: 'id', // 树的主键
      //           label: 'label', // 树的显示lalel字段
      //           children: 'children' // 树的嵌套字段
      //         },
      //         axiosConfig: {
      //           successCode: '100000', // 成功code
      //           statusField: 'code',
      //           method: 'post', // 请求方式
      //           url: 'bisConfig/config/common/queryTreeAssistData' // 'queryTreeAssistData', // 是否调用接口直接获取数据，当此项有值时将会自动家数据
      //         }
      //       }
      //     }
      //   }
      // },
      {
        title: '项目名称',
        field: 'proName',
        span: 4,
        type: 'text',
        itemRender: {
          name: '$vxeInput',
          defaultValue: '',
          props: {
            placeholder: '项目名称'
          }
        }
      },
      {
        title: '资金来源',
        align: '',
        span: 4,
        field: 'fundsource',
        type: 'treeinput-multiple',
        itemRender: {
          name: '$vxeTree',
          props: {
            queryparams: {
              eleCode: 'FUNDTYPE'
            },
            config: {
              placeholder: '资金来源',
              multiple: true,
              treeProps: {
                // 树配置选项
                labelFormat: '{code}-{name}', // {code}-{name}
                nodeKey: 'id', // 树的主键
                label: 'label', // 树的显示lalel字段
                children: 'children' // 树的嵌套字段
              },
              axiosConfig: {
                successCode: '100000', // 成功code
                statusField: 'code',
                method: 'post', // 请求方式
                url: 'bisConfig/config/common/queryTreeAssistData' // 'queryTreeAssistData', // 是否调用接口直接获取数据，当此项有值时将会自动家数据
              }
            }
          }
        }
      },
      {
        title: '功能科目',
        field: 'expFunc',
        align: 'center',
        span: 4,
        type: 'treeinput-multiple',
        itemRender: {
          name: '$vxeTree',
          props: {
            queryparams: {
              eleCode: 'VW_BAS_EXP_FUNC',
              sxspecroleguid: '3250FC3332E1421DA1B0388AA0D34BDC'
            },
            config: {
              placeholder: '功能科目',
              multiple: true,
              treeProps: {
                // 树配置选项
                labelFormat: '{code}-{name}', // {code}-{name}
                nodeKey: 'id', // 树的主键
                label: 'label', // 树的显示lalel字段
                children: 'children' // 树的嵌套字段
              },
              axiosConfig: {
                successCode: '100000', // 成功code
                statusField: 'code',
                method: 'post', // 请求方式
                url: 'bisConfig/config/common/queryTreeAssistData' // 'queryTreeAssistData', // 是否调用接口直接获取数据，当此项有值时将会自动家数据
              }
            }
          }
        }
      },
      {
        title: '项目类别',
        field: 'proCat',
        align: 'center',
        span: 4,
        type: 'treeinput-multiple',
        itemRender: {
          name: '$vxeTree',
          props: {
            queryparams: {
              eleCode: 'PROCAT',
              sxspecroleguid: '3250FC3332E1421DA1B0388AA0D34BDC'
            },
            config: {
              placeholder: '项目类别',
              multiple: true,
              treeProps: {
                // 树配置选项
                labelFormat: '{code}-{name}', // {code}-{name}
                nodeKey: 'id', // 树的主键
                label: 'label', // 树的显示lalel字段
                children: 'children' // 树的嵌套字段
              },
              axiosConfig: {
                successCode: '100000', // 成功code
                statusField: 'code',
                method: 'post', // 请求方式
                url: 'bisConfig/config/common/queryTreeAssistData' // 'queryTreeAssistData', // 是否调用接口直接获取数据，当此项有值时将会自动家数据
              }
            }
          }
        }
      }
    ],
    validateRules: {},
    extendAttrs: {},
    formData: {
      agency: '',
      agencyId: '',
      agencyCode: '',
      agencyName: '',

      payoutKind: '',
      payoutKindId: '',
      payoutKindCode: '',
      payoutKindName: '',

      docNo: '',
      adjDocNo: '',
      proName: '',
      c3: '',

      fundsource: '',
      fundsourceId: '',
      fundsourceCode: '',
      fundsourceName: '',

      expFunc: '',
      expFuncId: '',
      expFuncCode: '',
      expFuncName: '',

      proCat: '',
      proCatId: '',
      proCatCode: '',
      proCatName: ''
    }
  }
}
