// 专项转移支付调剂-新增-细化预算的列表头
export default {
  '9165211': {
    tableCols: [],
    editTableCols: [
      {
        title: '政府支出经济分类',
        field: 'govBgtEco',
        width: 220,
        filters: false,
        editRender: {
          name: '$vxeTree',
          props: {
            queryparams: {
              eleCode: 'VW_BAS_GOV_BGT_ECO',
              queryConditions: ''
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
        field: 'isDirectFinanc',
        title: '是否直达资金',
        width: 180,
        filters: false,
        editRender: {
          name: '$vxeSelect',
          props: {
            placeholder: '请选择'
          },
          options: [
            { value: '1', label: '是' },
            { value: '0', label: '否' }
          ]
        }
      },
      {
        field: 'isDir',
        title: '直达资金标识',
        width: 180,
        filters: false,
        editRender: {
          name: '$vxeTree',
          props: {
            queryparams: {
              eleCode: 'DIRECTFUNDS',
              queryConditions: ''
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
        title: '该科目追加金额',
        field: 'adjAddamt',
        width: 180,
        filters: false,
        editRender: {
          name: '$vxeMoney',
          props: { type: 'float', min: 0 }
        }
      },
      {
        field: 'subMofDiv',
        title: '下级财政区划',
        filters: false,
        editRender: {
          name: '$vxeTree',
          props: {
            queryparams: {
              eleCode: 'VW_BAS_MOF_DIV',
              queryConditions: ''
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
        title: '资金来源',
        field: 'foundType',
        width: 180,
        filters: false,
        editRender: {
          name: '$vxeTree',
          props: {
            queryparams: {
              eleCode: 'FOUNDTYPE',
              queryConditions: ''
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
        title: '资金性质',
        field: 'fundType',
        width: 180,
        filters: false,
        editRender: {
          name: '$vxeTree',
          props: {
            queryparams: {
              eleCode: 'FUNDTYPE',
              queryConditions: ' and (code like \'1%\' and code <> \'14\')'
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
        field: 'expFunc',
        title: '支出功能分类:',
        width: 180,
        filters: false,
        editRender: {
          name: '$vxeTree',
          props: {
            queryparams: {
              eleCode: 'VW_BAS_EXP_FUNC'
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
        title: '转移支付功能科目',
        field: 'tpFunc',
        width: 180,
        filters: false,
        editRender: {
          name: '$vxeTree',
          props: {
            queryparams: {
              eleCode: 'EXPFUNC'
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
      }
    ],
    formItems: [],
    validateRules: {},
    extendAttrs: {},
    formData: {}
  }
}
