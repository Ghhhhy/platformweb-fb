// 专项转移支付调剂-新增-挑选指标的条件查询列配置 | 调剂主界面高级查询表单配置
export default {
  '9165233': {
    tableCols: [],
    editTableCols: [],
    formItems: [
      {
        title: '资金性质',
        field: 'fundType',
        span: 4,
        itemRender: {
          name: '$vxeTree',
          props: {
            queryparams: {
              eleCode: 'FUND_TYPE',
              queryConditions: ''
            },
            format: '{code}-{name}',
            config: {
              placeholder: '项目类别',
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
        title: '政府经济分类',
        field: 'govBgtEco',
        span: 4,
        itemRender: {
          name: '$vxeTree',
          props: {
            queryparams: {
              eleCode: 'VW_BAS_GOV_BGT_ECO',
              queryConditions: ''
            },
            format: '{code}-{name}',
            config: {
              placeholder: '政府经济分类',
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
        title: '项目名称',
        field: 'proName',
        span: 4,
        itemRender: {
          name: '$vxeInput',
          props: {
            placeholder: '项目名称'
          }
        }
      }
    ],
    validateRules: {},
    extendAttrs: {},
    formData: {}
  }
}
