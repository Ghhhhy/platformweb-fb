// arrangeFundsSelectTable 资金安排 待分指标挑选列表
export default {
  '9163013': {
    tableCols: [
      {
        field: 'bgtExeFlag',
        title: '指标可执行标志',
        width: 180,
        align: 'left',
        filters: false,
        editRender: {
          name: '$vxeSelect',
          defaultValue: '1',
          props: {
            disabled: true
          },
          options: [
            { value: '1', label: '1-可执行' },
            { value: '2', label: '2-待分' }
          ]
        }
      },
      {
        title: '本级指标文号',
        field: 'corBgtDocNoName',
        width: 180,
        align: 'left',
        filters: false
      },
      {
        title: '主管业务处',
        field: 'manageMofDep',
        width: 180,
        align: 'left',
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
            }
          }
        }
      },
      {
        title: '预算单位',
        field: 'agency',
        width: 180,
        align: 'left',
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
            }
          }
        }
      },
      {
        title: '资金主管处室',
        field: 'bgtMofDep',
        width: 180,
        align: 'left',
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
            }
          }
        }
      },
      {
        title: '资金性质',
        field: 'fundType',
        width: 180,
        align: 'left',
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
            }
          }
        }
      },
      {
        title: '资金来源',
        field: 'foundType',
        width: 180,
        align: 'left',
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
            }
          }
        }
      },
      {
        title: '收支结构',
        field: 'incomePayType',
        width: 180,
        align: 'left',
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
              queryparams: {
                eleCode: 'income_pay_type'
              },
              isleaf: true
            }
          }
        }
      },
      {
        title: '指标类型',
        field: 'bgtType',
        width: 180,
        align: 'left',
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
            }
          }
        }
      },
      {
        title: '指标来源类型',
        field: 'bgtSource',
        width: 180,
        align: 'left',
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
            }
          }
        }
      },
      {
        title: '指标来源',
        field: 'sourceType',
        width: 180,
        align: 'left',
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
            }
          }
        }
      },
      {
        title: '支出功能科目',
        field: 'expFunc',
        width: 180,
        align: 'left',
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
            }
          }
        }
      },
      {
        title: '政府经济分类',
        field: 'govBgtEco',
        width: 180,
        align: 'left',
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
            }
          }
        }
      },
      {
        title: '项目名称',
        field: 'proName',
        width: 180,
        align: 'left',
        filters: false
      },
      {
        title: '来源id',
        field: 'sumId',
        width: 180,
        align: 'left',
        filters: false
      },
      {
        title: '指标金额',
        field: 'aviAmt',
        width: 150,
        align: 'right',
        filters: false,
        cellRender: { name: '$vxeMoney', props: { min: 0 } }
      },
      {
        title: '已用金额',
        field: 'useAmt',
        width: 150,
        align: 'right',
        filters: false,
        cellRender: { name: '$vxeMoney', props: { min: 0 } }
      },
      {
        title: '剩余金额',
        field: 'canuseAmt',
        width: 150,
        align: 'right',
        filters: false,
        cellRender: { name: '$vxeMoney', props: { min: 0 } }
      }
    ],
    editTableCols: [],
    formItems: [],
    validateRules: {},
    extendAttrs: {},
    formData: {}
  }
}
