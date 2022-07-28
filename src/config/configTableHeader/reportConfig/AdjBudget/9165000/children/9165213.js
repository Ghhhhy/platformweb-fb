// 专项转移支付调剂-新增-预算科目调整-细化预算列表头
export default {
  '9165213': {
    tableCols: [],
    editTableCols: [
      {
        title: '项目名称',
        field: 'proName',
        align: 'left',
        width: 200,
        editRender: {
          name: '$vxeInput'
        }
      },
      {
        field: 'proCat',
        title: '项目类别',
        align: 'left',
        width: 200,
        editRender: {
          name: '$vxeTree',
          props: {
            queryparams: {
              eleCode: 'PROCAT',
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
        field: 'fundType',
        title: '资金性质',
        align: 'left',
        width: 200,
        filters: false,
        editRender: {
          name: '$vxeTree',
          props: {
            queryparams: {
              eleCode: 'FUNDTYPE',
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
        field: 'speType',
        title: '专项资金目录',
        align: 'left',
        width: 200,
        filters: false,
        editRender: {
          name: '$vxeTree',
          props: {
            queryparams: {
              eleCode: 'vw_special_TYPE',
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
        title: '政府支出经济分类',
        field: 'govBgtEco',
        align: 'left',
        width: 200,
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
        align: 'left',
        width: 120,
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
        align: 'left',
        width: 200,
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
        field: 'subMofDiv',
        title: '下级财政区划',
        align: 'left',
        width: 200,
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
        align: 'left',
        width: 200,
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
      }
    ],
    formItems: [],
    validateRules: {},
    extendAttrs: {},
    formData: {}
  }
}
