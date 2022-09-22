// refineBgtTable 细化预算的table表头政采可编辑
export default {
  '9163019': {
    tableCols: [
      {
        title: '预算级次',
        field: 'budgetLevel',
        align: 'left',
        width: 180,
        cellRender: {
          name: '$vxeTree',
          props: {
            config: {
              multiple: false,
              isHump: true
            }
          }
        }
      },
      {
        title: '支出功能分类',
        field: 'expFunc',
        align: 'left',
        width: 180,
        cellRender: {
          name: '$vxeTree',
          props: {
            config: {
              multiple: false,
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
            },
            queryparams: {
              eleCode: 'EXPFUNC',
              sxspecroleguid: '3250FC3332E1421DA1B0388AA0D34BDC'
            }
          }
        }
      },
      {
        title: '部门支出经济科目',
        field: 'depBgtEco',
        align: 'left',
        width: 180,
        filters: false,
        cellRender: {
          name: '$vxeTree',
          props: {
            config: {
              multiple: false,
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
            },
            disabled: true,
            queryparams: {
              eleCode: 'DEPBGTECO',
              sxspecroleguid: '3250FC3332E1421DA1B0388AA0D34BDC'
            }
          }
        }
      },
      {
        title: '政府支出经济科目',
        field: 'govBgtEco',
        filters: false,
        align: 'left',
        width: 180,
        cellRender: {
          name: '$vxeTree',
          props: {
            config: {
              multiple: false,
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
      {
        field: 'fundsource',
        title: '资金来源',
        align: 'left',
        filters: false,
        width: 180,
        cellRender: {
          name: '$vxeTree',
          props: {
            config: {
              multiple: false,
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
            },
            queryparams: {
              eleCode: 'vw_boss_t_fb_fundsource',
              sxspecroleguid: '999004',
              queryConditions: 'and substr(code, 0, 4) in (\'0001\', \'0002\', \'0003\')'
            }
          }
        }
      },
      {
        title: '是否政府采购',
        field: 'isGov',
        align: 'left',
        width: 180,
        cellRender: {
          name: '$vxeSelect',
          options: [
            { value: '1', label: '是' },
            { value: '0', label: '否' }
          ]
        }
      },
      {
        title: '预算申请金额',
        field: 'adjAddamt',
        align: 'right',
        width: 150,
        combinedType: ['average', 'subTotal', 'total', 'totalAll'],
        cellRender: {
          name: '$vxeMoney',
          props: {
          }
        }
      }
    ],
    editTableCols: [
      {
        title: '预算级次',
        field: 'budgetLevel',
        align: 'left',
        width: 180,
        cellRender: {
          name: '$vxeTree',
          props: {
            config: {
              multiple: false,
              isHump: true
            }
          }
        }
      },
      {
        title: '支出功能分类',
        field: 'expFunc',
        align: 'left',
        width: 180,
        editRender: {
          name: '$vxeTree',
          props: {
            config: {
              multiple: false,
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
            },
            queryparams: {
              eleCode: 'VW_BAS_EXP_FUNC',
              sxspecroleguid: '3250FC3332E1421DA1B0388AA0D34BDC'
            }
          }
        }
      },
      {
        title: '部门支出经济科目',
        field: 'depBgtEco',
        align: 'left',
        width: 180,
        filters: false,
        editRender: {
          name: '$vxeTree',
          props: {
            config: {
              multiple: false,
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
            },
            disabled: true,
            queryparams: {
              eleCode: 'VW_BAS_DEP_BGT_ECO'
            }
          }
        }
      },
      {
        title: '政府支出经济科目',
        field: 'govBgtEco',
        filters: false,
        align: 'left',
        width: 180,
        editRender: {
          name: '$vxeTree',
          props: {
            config: {
              multiple: false,
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
              queryparams: {
                eleCode: 'VW_BAS_GOV_BGT_ECO'
              },
              isleaf: true
            }
          }
        }
      },
      {
        field: 'fundType',
        title: '资金性质',
        align: 'left',
        filters: false,
        width: 180,
        editRender: {
          name: '$vxeTree',
          props: {
            config: {
              multiple: false,
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
            },
            queryparams: {
              eleCode: 'FUNDTYPE'
              // TODO
              // queryConditions: 'and substr(code, 0, 4) in (\'0001\', \'0002\', \'0003\')'
            }
          }
        }
      },
      {
        title: '是否政府采购',
        field: 'isGov',
        align: 'left',
        width: 180,
        editRender: {
          name: '$vxeSelect',
          options: [
            { value: '1', label: '是' },
            { value: '0', label: '否' }
          ]
        }
      },
      {
        title: '预算申请金额',
        field: 'adjAddamt',
        align: 'right',
        width: 150,
        combinedType: ['average', 'subTotal', 'total', 'totalAll'],
        editRender: {
          name: '$vxeMoney',
          props: {
          }
        }
      }
    ],
    formItems: [],
    validateRules: {
      expFunc: [{ required: true, type: 'treeinput', trigger: 'change', message: '请输入支出功能分类' }],
      fundType: [{ required: true, type: 'treeinput', trigger: 'change', message: '请输入资金性质' }],
      isGov: [{ required: true, type: 'select', trigger: 'change', message: '请输入是否政府采购' }],
      adjAddamt: [
        {
          required: true,
          message: '请输入预算追加金额',
          trigger: 'change',
          validator(data) {
            return new Promise((resolve, reject) => {
              let value = data.cellValue
              if (value < 0.01) {
                reject(new Error('请输入预算追加金额！'))
              } else {
                resolve(true)
              }
            })
          }
        }
      ]
    },
    extendAttrs: {},
    formData: {}
  }
}
