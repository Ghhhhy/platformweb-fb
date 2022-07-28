// 追加调剂所有主界面列配置
// subBudgetTable
export default {
  '9166207': {
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
              eleCode: 'EXPFUNC'
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
              queryConditions: ' and code like \'230%\''
            }
          }
        }
      },
      {
        field: 'incomeSort',
        title: '下级转移性收入科目',
        align: 'left',
        width: 240,
        editRender: {
          name: '$vxeTree',
          props: {
            isleaf: true,
            isServer: true,
            serverUri: 'fiscal-config/queryTreeAssistData',
            elecode: 'INCOMESORT',
            queryparams: {
              eleCode: 'INCOMESORT'
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
              eleCode: 'GOVBGTECO'
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
              eleCode: 'FOUNDTYPE'
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
