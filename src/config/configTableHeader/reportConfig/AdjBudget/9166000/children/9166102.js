// mainQuery
export default {
  '9166102': {
    tableCols: [],
    editTableCols: [],
    formItems: [
      {
        field: 'proName',
        title: '项目名称',
        span: 4,
        itemRender: {
          name: '$vxeInput',
          props: {
            disabled: false,
            type: 'text',
            placeholder: '项目名称'
          }
        }
      },
      {
        field: 'foundType',
        title: '资金来源',
        span: 4,
        itemRender: {
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
              eleCode: 'FOUNDTYPE',
              queryConditions: ' and code like \'1%\''
            }
          }
        }

      },
      {
        field: 'expFunc',
        title: '功能分类',
        span: 4,
        itemRender: {
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
              eleCode: 'EXPFUNC'
            }
          }
        }

      },
      {
        field: 'govBgtEco',
        title: '政府经济分类',
        span: 4,
        itemRender: {
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
              eleCode: 'GOVBGTECO'
            }
          }
        }
      },
      {
        field: 'adjBatchNo',
        title: '申请单号',
        span: 4,
        itemRender: {
          name: '$vxeInput',
          props: {
            disabled: false,
            type: 'text',
            placeholder: '申请单号'
          }
        }
      },
      {
        field: 'docNo',
        title: '指标调整文号',
        span: 4,
        itemRender: {
          name: '$vxeInput',
          props: {
            disabled: false,
            type: 'text',
            placeholder: '指标调整文号'
          }
        }
      },
      {
        field: 'adjDocNo',
        title: '指标文号',
        span: 4,
        itemRender: {
          name: '$vxeInput',
          props: {
            disabled: false,
            type: 'text',
            placeholder: '指标文号'
          }
        }
      }
    ],
    validateRules: {},
    extendAttrs: {},
    formData: {}
  }
}
