// refineBgtTableTz
export default {
  '9163017': {
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
        title: '支出功能分类',
        field: 'expFunc',
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
            queryparams: {
              eleCode: 'DEPBGTECO',
              sxspecroleguid: '3250FC3332E1421DA1B0388AA0D34BDC',
              queryConditions: 'and length(code) <= 5'
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
            },
            disabled: true,
            queryparams: {
              eleCode: 'GOVBGTECO',
              sxspecroleguid: '3250FC3332E1421DA1B0388AA0D34BDC'
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
          props: {
            disabled: true
          },
          options: [
            { value: '1', label: '是' },
            { value: '0', label: '否' }
          ]
        }
      },
      {
        title: '安排金额',
        field: 'adjAddamt',
        align: 'right',
        width: 180,
        combinedType: ['average', 'subTotal', 'total', 'totalAll'],
        cellRender: {
          name: '$vxeMoney',
          props: {
            min: 0,
            disabled: true
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
        title: '支出功能分类',
        field: 'expFunc',
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
            queryparams: {
              eleCode: 'VW_BAS_DEP_BGT_ECO',
              sxspecroleguid: '3250FC3332E1421DA1B0388AA0D34BDC',
              queryConditions: 'and length(code) <= 5'
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
              isleaf: true
            },
            disabled: true,
            queryparams: {
              eleCode: 'VW_BAS_GOV_BGT_ECO',
              sxspecroleguid: '3250FC3332E1421DA1B0388AA0D34BDC'
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
              // TODO 这里有个queryCondition
              // queryConditions: 'and substr(code, 0, 4) in (\'0001\', \'0002\', \'0003\')'
            }
          }
        }
      },
      {
        field: 'foundType',
        title: '资金来源',
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
              eleCode: 'FOUNDTYPE'
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
          props: {
            disabled: true
          },
          options: [
            { value: '1', label: '是' },
            { value: '0', label: '否' }
          ]
        }
      },
      {
        title: '安排金额',
        field: 'adjAddamt',
        align: 'right',
        width: 180,
        combinedType: ['average', 'subTotal', 'total', 'totalAll'],
        cellRender: {
          name: '$vxeMoney',
          props: {
            min: 0,
            disabled: true
          }
        }
      }
    ],
    formItems: [],
    validateRules: {
      expFunc: [{ required: true, type: 'treeinput', trigger: 'change', message: '请输入支出功能分类' }],
      fundType: [{ required: true, type: 'treeinput', trigger: 'change', message: '请输入资金性质' }],
      foundType: [{ required: true, type: 'treeinput', trigger: 'change', message: '请输入资金来源' }],
      govBgtEco: [{ required: true, type: 'treeinput', trigger: 'change', message: '请输入政府经济分类' }],
      depBgtEco: [{ required: true, type: 'treeinput', trigger: 'change', message: '请输入部门经济分类' }],
      adjAddamt: [
        {
          required: true,
          message: '请输入预算追加金额',
          trigger: 'change',
          validator(data) {
            return new Promise((resolve, reject) => {
              let value = data.cellValue
              if (value < 0.01) {
                reject(new Error('请输入安排金额！'))
              } else {
                resolve(true)
              }
            })
          }
        }]
    },
    extendAttrs: {},
    formData: {}
  }
}
