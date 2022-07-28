export default {
  '9166107': {
    tableCols: [],
    editTableCols: [
      {
        title: '转移支付功能科目',
        field: 'tpFunc',
        width: 180,
        editRender: {
          name: '$vxeTree',
          props: {
            isServer: true,
            elecode: 'EXPFUNC',
            serverUri: 'fiscal-config/queryTreeAssistData',
            isleaf: true,
            queryparams: {
              eleCode: 'EXPFUNC',
              sxspecroleguid: '3250FC3332E1421DA1B0388AA0D34BDC'
            }
          }
        }
      },
      {
        field: 'expFunc',
        title: '支出功能分类:',
        width: 180,
        span: 6,
        editRender: {
          name: '$vxeTree',
          props: {
            elecode: 'EXPFUNC',
            isServer: true,
            isleaf: true,
            disabled: true,
            serverUri: 'fiscal-config/queryTreeAssistData',
            queryparams: {
              elecode: 'EXPFUNC',
              sxspecroleguid: '3250FC3332E1421DA1B0388AA0D34BDC',
              queryConditions: ' and code like \'230%\''
            }
          }
        }
      },
      {
        title: '下级转移性收入科目',
        field: 'incomeSort',
        width: 180,
        filters: false,
        editRender: {
          name: '$vxeTree',
          props: {
            queryparams: {
              eleCode: 'INCOMESORT',
              queryConditions: ' and code not like \'230%\''
            },
            format: '{code}-{name}',
            config: {
              isHump: true,
              multiple: false,
              readonly: false,
              isleaf: true,
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
              }
            }
          }
        }
      },
      {
        title: '政府支出经济分类',
        field: 'govBgtEco',
        width: 220,
        editRender: {
          name: '$vxeTree',
          props: {
            isleaf: true,
            isServer: true,
            disabled: false,
            serverUri: 'fiscal-config/queryTreeAssistData',
            elecode: 'GOVBGTECO',
            queryparams: {
              eleCode: 'GOVBGTECO',
              sxspecroleguid: '999004'
            }
          }
        }
      },
      {
        title: '预算资金来源',
        field: 'fundsource',
        width: 180,
        editRender: {
          name: '$vxeTree',
          props: {
            isServer: true,
            isleaf: true,
            elecode: 'vw_boss_t_fb_fundsource',
            queryparams: {
              eleCode: 'vw_boss_t_fb_fundsource',
              queryConditions: ' and code not in (\'0005\',\'0006\',\'0007\',\'0008\') and code not like \'0004%\' '
            }
          }
        }
      },
      {
        title: '资金性质',
        field: 'fundType',
        width: 180,
        editRender: {
          name: '$vxeTree',
          props: {
            disabled: true,
            isServer: true,
            isleaf: true,
            elecode: 'FUNDTYPE',
            queryparams: {
              eleCode: 'FUNDTYPE',
              sxspecroleguid: '3250FC3332E1421DA1B0388AA0D34BDC',
              queryConditions: ' and code like \'1%\''
            }
          }
        }
      },
      {
        title: '资金来源',
        field: 'foundType',
        width: 180,
        editRender: {
          name: '$vxeTree',
          props: {
            disabled: true,
            isServer: true,
            isleaf: true,
            elecode: 'FOUNDTYPE',
            queryparams: {
              eleCode: 'FOUNDTYPE',
              sxspecroleguid: '3250FC3332E1421DA1B0388AA0D34BDC'
            }
          }
        }
      },
      {
        title: '本次申请追加金额',
        field: 'adjAddamt',
        sortable: false,
        filters: false,
        width: 180,
        align: 'right',
        editRender: { name: '$vxeMoney', props: { min: 0 } }
      }
    ],
    formItems: [],
    validateRules: {},
    extendAttrs: {},
    formData: {}
  }
}
