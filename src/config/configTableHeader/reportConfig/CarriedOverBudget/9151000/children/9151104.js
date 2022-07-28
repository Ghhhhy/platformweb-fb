// 结转结余预算编制 -》[结余]资金预算编制-》主表 | 导入的表头
export default {
  '9151104': {
    tableCols: [
      {
        title: '指标文号标题',
        field: 'bgtDocTitle',
        align: 'left',
        width: 180,
        visible: true,
        cellRender: {
          name: '$vxeInput',
          props: {
            clearable: true
          }
        }
      },
      {
        title: '指标文号',
        field: 'corBgtDocNo',
        align: 'left',
        width: 180,
        visible: true,
        cellRender: {
          name: '$vxeTree',
          props: {
            queryparams: {
              eleCode: 'COR_BGT_DOC_NO',
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
                url: 'bisConfig/config/common/queryTreeAssistData' // 是否调用接口直接获取数据，当此项有值时将会自动家数据
              }
            }
          }
        }
      },
      {
        title: '项目编码',
        field: 'proCode',
        align: 'left',
        width: 180,
        visible: true,
        cellRender: {
          name: '$vxeInput',
          props: {
            clearable: true
          }
        }
      },
      {
        title: '指标文号日期',
        field: 'docDate',
        align: 'left',
        width: 180,
        visible: true,
        cellRender: {
          name: '$vxeTime',
          props: {
            clearable: true,
            format: 'YYYY-MM-DD'
          }
        }
      },
      {
        title: '项目名称',
        field: 'proName',
        align: 'left',
        width: 180,
        visible: true,
        cellRender: {
          name: '$vxeTime',
          props: {
            clearable: true
          }
        }
      },
      {
        title: '指标来源',
        field: 'sourceType',
        align: 'left',
        width: 180,
        visible: true,
        cellRender: {
          name: '$vxeTree',
          props: {
            queryparams: {
              eleCode: 'SOURCE_TYPE',
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
                url: 'bisConfig/config/common/queryTreeAssistData' // 是否调用接口直接获取数据，当此项有值时将会自动家数据
              }
            }
          }
        }
      },
      {
        title: '指标文号描述',
        field: 'bgtDec',
        align: 'left',
        width: 180,
        visible: true,
        cellRender: {
          name: '$vxeInput',
          props: {
            clearable: true
          }
        }
      },
      {
        title: '调整日期',
        field: 'adjDate',
        align: 'left',
        width: 180,
        visible: true,
        cellRender: {
          name: '$vxeTime',
          props: {
            clearable: true,
            format: 'YYYY-MM-DD'
          }
        }
      },
      {
        title: '指标金额',
        field: 'amount',
        align: 'right',
        width: 180,
        visible: true,
        combinedType: ['average', 'subTotal', 'total', 'totalAll'],
        cellRender: {
          name: '$vxeMoney',
          props: {
            clearable: true
          }
        }
      },
      {
        title: '资金主管处室',
        field: 'bgtMofDep',
        align: 'left',
        width: 180,
        visible: true,
        cellRender: {
          name: '$vxeTree',
          props: {
            queryparams: {
              eleCode: 'BGT_MOF_DEP',
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
                url: 'bisConfig/config/common/queryTreeAssistData' // 是否调用接口直接获取数据，当此项有值时将会自动家数据
              }
            }
          }
        }
      },
      {
        title: '资金性质',
        field: 'fundType',
        align: 'left',
        width: 180,
        visible: true,
        cellRender: {
          name: '$vxeTree',
          props: {
            queryparams: {
              eleCode: 'FUND_TYPE',
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
                url: 'bisConfig/config/common/queryTreeAssistData' // 是否调用接口直接获取数据，当此项有值时将会自动家数据
              }
            }
          }
        }
      },
      {
        title: '预算级次',
        field: 'budgetLevel',
        align: 'left',
        width: 180,
        visible: true,
        cellRender: {
          name: '$vxeTree',
          props: {
            queryparams: {
              eleCode: 'BUDGET_LEVEL',
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
                url: 'bisConfig/config/common/queryTreeAssistData' // 是否调用接口直接获取数据，当此项有值时将会自动家数据
              }
            }
          }
        }
      },
      {
        title: '财政内部机构',
        field: 'manageMofDep',
        align: 'left',
        width: 180,
        visible: true,
        cellRender: {
          name: '$vxeTree',
          props: {
            queryparams: {
              eleCode: 'MANAGE_MOF_DEP',
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
                url: 'bisConfig/config/common/queryTreeAssistData' // 是否调用接口直接获取数据，当此项有值时将会自动家数据
              }
            }
          }
        }
      },
      {
        title: '支付方式',
        field: 'payType',
        align: 'left',
        width: 180,
        visible: true,
        cellRender: {
          name: '$vxeTree',
          props: {
            queryparams: {
              eleCode: 'PAY_TYPE',
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
                url: 'bisConfig/config/common/queryTreeAssistData' // 是否调用接口直接获取数据，当此项有值时将会自动家数据
              }
            }
          }
        }
      },
      {
        title: '预算单位',
        field: 'agency',
        align: 'left',
        width: 180,
        visible: true,
        cellRender: {
          name: '$vxeTree',
          props: {
            queryparams: {
              eleCode: 'AGENCY',
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
                url: 'bisConfig/config/common/queryTreeAssistData' // 是否调用接口直接获取数据，当此项有值时将会自动家数据
              }
            }
          }
        }
      },
      {
        title: '支出功能分类',
        field: 'expFunc',
        align: 'left',
        width: 180,
        visible: true,
        cellRender: {
          name: '$vxeTree',
          props: {
            queryparams: {
              eleCode: 'EXP_FUNC',
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
                url: 'bisConfig/config/common/queryTreeAssistData' // 是否调用接口直接获取数据，当此项有值时将会自动家数据
              }
            }
          }
        }
      },
      {
        title: '指标类型',
        field: 'bgtType',
        align: 'left',
        width: 180,
        visible: true,
        cellRender: {
          name: '$vxeTree',
          props: {
            queryparams: {
              eleCode: 'BGTTYPE',
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
                url: 'bisConfig/config/common/queryTreeAssistData' // 是否调用接口直接获取数据，当此项有值时将会自动家数据
              }
            }
          }
        }
      },
      {
        title: '资金来源',
        field: 'foundType',
        align: 'left',
        width: 180,
        visible: true,
        cellRender: {
          name: '$vxeTree',
          props: {
            queryparams: {
              eleCode: 'FOUND_TYPE',
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
                url: 'bisConfig/config/common/queryTreeAssistData' // 是否调用接口直接获取数据，当此项有值时将会自动家数据
              }
            }
          }
        }
      },
      {
        title: '收支结构标识',
        field: 'isIncomePay',
        align: 'left',
        width: 180,
        visible: true,
        cellRender: {
          name: '$vxeTree',
          props: {
            queryparams: {
              eleCode: 'IS_INCOME_PAY',
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
                url: 'bisConfig/config/common/queryTreeAssistData' // 是否调用接口直接获取数据，当此项有值时将会自动家数据
              }
            }
          }
        }
      },
      {
        title: '主管部门',
        field: 'dept',
        align: 'left',
        width: 180,
        visible: true,
        cellRender: {
          name: '$vxeTree',
          props: {
            queryparams: {
              eleCode: 'DEPT',
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
                url: 'bisConfig/config/common/queryTreeAssistData' // 是否调用接口直接获取数据，当此项有值时将会自动家数据
              }
            }
          }
        }
      },
      {
        title: '指标摘要',
        field: 'bgtRem',
        align: 'left',
        width: 180,
        visible: true,
        cellRender: {
          name: '$vxeTree',
          props: {
            queryparams: {
              eleCode: 'BGT_REM',
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
                url: 'bisConfig/config/common/queryTreeAssistData' // 是否调用接口直接获取数据，当此项有值时将会自动家数据
              }
            }
          }
        }
      },
      {
        title: '直达资金标识',
        field: 'isDir',
        align: 'left',
        width: 180,
        visible: true,
        cellRender: {
          name: '$vxeTree',
          props: {
            queryparams: {
              eleCode: 'IS_DIR',
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
                url: 'bisConfig/config/common/queryTreeAssistData' // 是否调用接口直接获取数据，当此项有值时将会自动家数据
              }
            }
          }
        }
      },
      {
        title: '是否扶贫',
        field: 'isAlle',
        align: 'left',
        width: 180,
        visible: true,
        cellRender: {
          name: '$vxeTree',
          props: {
            queryparams: {
              eleCode: 'IS_ALLE',
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
                url: 'bisConfig/config/common/queryTreeAssistData' // 是否调用接口直接获取数据，当此项有值时将会自动家数据
              }
            }
          }
        }
      },
      {
        title: '工资标识',
        field: 'isSal',
        align: 'left',
        width: 180,
        visible: true,
        cellRender: {
          name: '$vxeTree',
          props: {
            queryparams: {
              eleCode: 'IS_SAL',
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
                url: 'bisConfig/config/common/queryTreeAssistData' // 是否调用接口直接获取数据，当此项有值时将会自动家数据
              }
            }
          }
        }
      },
      {
        title: '是否工会经费',
        field: 'isFun',
        align: 'left',
        width: 180,
        visible: true,
        cellRender: {
          name: '$vxeTree',
          props: {
            queryparams: {
              eleCode: 'IS_FUN',
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
                url: 'bisConfig/config/common/queryTreeAssistData' // 是否调用接口直接获取数据，当此项有值时将会自动家数据
              }
            }
          }
        }
      },
      {
        title: '三公经费',
        field: 'thrExp',
        align: 'left',
        width: 180,
        visible: true,
        cellRender: {
          name: '$vxeTree',
          props: {
            queryparams: {
              eleCode: 'THR_EXP',
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
                url: 'bisConfig/config/common/queryTreeAssistData' // 是否调用接口直接获取数据，当此项有值时将会自动家数据
              }
            }
          }
        }
      },
      {
        title: '收支类型',
        field: 'proCat',
        align: 'left',
        width: 180,
        visible: true,
        cellRender: {
          name: '$vxeTree',
          props: {
            queryparams: {
              eleCode: 'PRO_CAT',
              queryConditions: 'and code in (\'331\',\'332\')'
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
                url: 'bisConfig/config/common/queryTreeAssistData' // 是否调用接口直接获取数据，当此项有值时将会自动家数据
              }
            }
          }
        }
      },
      {
        title: '社会投入资金',
        field: 'scoiInvestFund',
        align: 'right',
        width: 180,
        visible: true,
        combinedType: ['average', 'subTotal', 'total', 'totalAll'],
        cellRender: {
          name: '$vxeMoney',
          props: {
            clearable: true
          }
        }
      },
      {
        title: '分配方式',
        field: 'distriType',
        align: 'left',
        width: 180,
        visible: true,
        cellRender: {
          name: '$vxeTree',
          props: {
            queryparams: {
              eleCode: 'DISTRITYPE',
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
                url: 'bisConfig/config/common/queryTreeAssistData' // 是否调用接口直接获取数据，当此项有值时将会自动家数据
              }
            }
          }
        }
      },
      {
        title: '部门预算经济分类',
        field: 'depBgtEco',
        align: 'left',
        width: 200,
        visible: true,
        cellRender: {
          name: '$vxeTree',
          props: {
            queryparams: {
              eleCode: 'DEP_BGT_ECO',
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
                url: 'bisConfig/config/common/queryTreeAssistData' // 是否调用接口直接获取数据，当此项有值时将会自动家数据
              }
            }
          }
        }
      },
      {
        title: '政府预算经济分类',
        field: 'govBgtEco',
        align: 'left',
        width: 200,
        visible: true,
        cellRender: {
          name: '$vxeTree',
          props: {
            queryparams: {
              eleCode: 'GOV_BGT_ECO',
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
                url: 'bisConfig/config/common/queryTreeAssistData' // 是否调用接口直接获取数据，当此项有值时将会自动家数据
              }
            }
          }
        }
      },
      {
        title: '是否直达资金的配套',
        field: 'isMat',
        align: 'left',
        width: 200,
        visible: true,
        cellRender: {
          name: '$vxeTree',
          props: {
            queryparams: {
              eleCode: 'IS_MAT',
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
                url: 'bisConfig/config/common/queryTreeAssistData' // 是否调用接口直接获取数据，当此项有值时将会自动家数据
              }
            }
          }
        }
      },
      {
        title: '指标来源类型',
        field: 'bgtSource',
        align: 'left',
        width: 180,
        visible: true,
        cellRender: {
          name: '$vxeTree',
          props: {
            queryparams: {
              eleCode: 'BGT_SOURCE',
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
                url: 'bisConfig/config/common/queryTreeAssistData' // 是否调用接口直接获取数据，当此项有值时将会自动家数据
              }
            }
          }
        }
      },
      {
        title: '是否补贴到人到企',
        field: 'isSub',
        align: 'left',
        width: 180,
        visible: true,
        cellRender: {
          name: '$vxeTree',
          props: {
            queryparams: {
              eleCode: 'IS_SUB',
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
                url: 'bisConfig/config/common/queryTreeAssistData' // 是否调用接口直接获取数据，当此项有值时将会自动家数据
              }
            }
          }
        }
      },
      {
        title: '是否政府采购',
        field: 'isGovPur',
        align: 'left',
        width: 180,
        visible: true,
        cellRender: {
          name: '$vxeTree',
          props: {
            queryparams: {
              eleCode: 'HOLD8',
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
                url: 'bisConfig/config/common/queryTreeAssistData' // 是否调用接口直接获取数据，当此项有值时将会自动家数据
              }
            }
          }
        }
      }
    ],
    editTableCols: [
      {
        title: '指标文号标题',
        field: 'bgtDocTitle',
        align: 'left',
        width: 180,
        visible: true,
        editRender: {
          name: '$vxeInput',
          props: {
            clearable: true
          }
        }
      },
      {
        title: '指标文号',
        field: 'corBgtDocNo',
        align: 'left',
        width: 180,
        visible: true,
        editRender: {
          name: '$vxeTree',
          props: {
            queryparams: {
              eleCode: 'COR_BGT_DOC_NO',
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
                url: 'bisConfig/config/common/queryTreeAssistData' // 是否调用接口直接获取数据，当此项有值时将会自动家数据
              }
            }
          }
        }
      },
      {
        title: '项目编码',
        field: 'proCode',
        align: 'left',
        width: 180,
        visible: true,
        editRender: {
          name: '$vxeInput',
          props: {
            clearable: true
          }
        }
      },
      {
        title: '指标文号日期',
        field: 'docDate',
        align: 'left',
        width: 180,
        visible: true,
        editRender: {
          name: '$vxeTime',
          props: {
            clearable: true,
            format: 'YYYY-MM-DD'
          }
        }
      },
      {
        title: '项目名称',
        field: 'proName',
        align: 'left',
        width: 180,
        visible: true,
        editRender: {
          name: '$vxeTime',
          props: {
            clearable: true
          }
        }
      },
      {
        title: '指标来源',
        field: 'sourceType',
        align: 'left',
        width: 180,
        visible: true,
        editRender: {
          name: '$vxeTree',
          props: {
            queryparams: {
              eleCode: 'SOURCE_TYPE',
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
                url: 'bisConfig/config/common/queryTreeAssistData' // 是否调用接口直接获取数据，当此项有值时将会自动家数据
              }
            }
          }
        }
      },
      {
        title: '指标文号描述',
        field: 'bgtDec',
        align: 'left',
        width: 180,
        visible: true,
        editRender: {
          name: '$vxeInput',
          props: {
            clearable: true
          }
        }
      },
      {
        title: '调整日期',
        field: 'adjDate',
        align: 'left',
        width: 180,
        visible: true,
        editRender: {
          name: '$vxeTime',
          props: {
            clearable: true,
            format: 'YYYY-MM-DD'
          }
        }
      },
      {
        title: '指标金额',
        field: 'amount',
        align: 'right',
        width: 180,
        visible: true,
        combinedType: ['average', 'subTotal', 'total', 'totalAll'],
        editRender: {
          name: '$vxeMoney',
          props: {
            clearable: true
          }
        }
      },
      {
        title: '资金主管处室',
        field: 'bgtMofDep',
        align: 'left',
        width: 180,
        visible: true,
        editRender: {
          name: '$vxeTree',
          props: {
            queryparams: {
              eleCode: 'BGT_MOF_DEP',
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
                url: 'bisConfig/config/common/queryTreeAssistData' // 是否调用接口直接获取数据，当此项有值时将会自动家数据
              }
            }
          }
        }
      },
      {
        title: '资金性质',
        field: 'fundType',
        align: 'left',
        width: 180,
        visible: true,
        editRender: {
          name: '$vxeTree',
          props: {
            queryparams: {
              eleCode: 'FUND_TYPE',
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
                url: 'bisConfig/config/common/queryTreeAssistData' // 是否调用接口直接获取数据，当此项有值时将会自动家数据
              }
            }
          }
        }
      },
      {
        title: '预算级次',
        field: 'budgetLevel',
        align: 'left',
        width: 180,
        visible: true,
        editRender: {
          name: '$vxeTree',
          props: {
            queryparams: {
              eleCode: 'BUDGET_LEVEL',
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
                url: 'bisConfig/config/common/queryTreeAssistData' // 是否调用接口直接获取数据，当此项有值时将会自动家数据
              }
            }
          }
        }
      },
      {
        title: '财政内部机构',
        field: 'manageMofDep',
        align: 'left',
        width: 180,
        visible: true,
        editRender: {
          name: '$vxeTree',
          props: {
            queryparams: {
              eleCode: 'MANAGE_MOF_DEP',
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
                url: 'bisConfig/config/common/queryTreeAssistData' // 是否调用接口直接获取数据，当此项有值时将会自动家数据
              }
            }
          }
        }
      },
      {
        title: '支付方式',
        field: 'payType',
        align: 'left',
        width: 180,
        visible: true,
        editRender: {
          name: '$vxeTree',
          props: {
            queryparams: {
              eleCode: 'PAY_TYPE',
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
                url: 'bisConfig/config/common/queryTreeAssistData' // 是否调用接口直接获取数据，当此项有值时将会自动家数据
              }
            }
          }
        }
      },
      {
        title: '预算单位',
        field: 'agency',
        align: 'left',
        width: 180,
        visible: true,
        editRender: {
          name: '$vxeTree',
          props: {
            queryparams: {
              eleCode: 'AGENCY',
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
                url: 'bisConfig/config/common/queryTreeAssistData' // 是否调用接口直接获取数据，当此项有值时将会自动家数据
              }
            }
          }
        }
      },
      {
        title: '支出功能分类',
        field: 'expFunc',
        align: 'left',
        width: 180,
        visible: true,
        editRender: {
          name: '$vxeTree',
          props: {
            queryparams: {
              eleCode: 'EXP_FUNC',
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
                url: 'bisConfig/config/common/queryTreeAssistData' // 是否调用接口直接获取数据，当此项有值时将会自动家数据
              }
            }
          }
        }
      },
      {
        title: '指标类型',
        field: 'bgtType',
        align: 'left',
        width: 180,
        visible: true,
        editRender: {
          name: '$vxeTree',
          props: {
            queryparams: {
              eleCode: 'BGTTYPE',
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
                url: 'bisConfig/config/common/queryTreeAssistData' // 是否调用接口直接获取数据，当此项有值时将会自动家数据
              }
            }
          }
        }
      },
      {
        title: '资金来源',
        field: 'foundType',
        align: 'left',
        width: 180,
        visible: true,
        editRender: {
          name: '$vxeTree',
          props: {
            queryparams: {
              eleCode: 'FOUND_TYPE',
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
                url: 'bisConfig/config/common/queryTreeAssistData' // 是否调用接口直接获取数据，当此项有值时将会自动家数据
              }
            }
          }
        }
      },
      {
        title: '收支结构标识',
        field: 'isIncomePay',
        align: 'left',
        width: 180,
        visible: true,
        editRender: {
          name: '$vxeTree',
          props: {
            queryparams: {
              eleCode: 'IS_INCOME_PAY',
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
                url: 'bisConfig/config/common/queryTreeAssistData' // 是否调用接口直接获取数据，当此项有值时将会自动家数据
              }
            }
          }
        }
      },
      {
        title: '主管部门',
        field: 'dept',
        align: 'left',
        width: 180,
        visible: true,
        editRender: {
          name: '$vxeTree',
          props: {
            queryparams: {
              eleCode: 'DEPT',
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
                url: 'bisConfig/config/common/queryTreeAssistData' // 是否调用接口直接获取数据，当此项有值时将会自动家数据
              }
            }
          }
        }
      },
      {
        title: '指标摘要',
        field: 'bgtRem',
        align: 'left',
        width: 180,
        visible: true,
        editRender: {
          name: '$vxeTree',
          props: {
            queryparams: {
              eleCode: 'BGT_REM',
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
                url: 'bisConfig/config/common/queryTreeAssistData' // 是否调用接口直接获取数据，当此项有值时将会自动家数据
              }
            }
          }
        }
      },
      {
        title: '直达资金标识',
        field: 'isDir',
        align: 'left',
        width: 180,
        visible: true,
        editRender: {
          name: '$vxeTree',
          props: {
            queryparams: {
              eleCode: 'IS_DIR',
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
                url: 'bisConfig/config/common/queryTreeAssistData' // 是否调用接口直接获取数据，当此项有值时将会自动家数据
              }
            }
          }
        }
      },
      {
        title: '是否扶贫',
        field: 'isAlle',
        align: 'left',
        width: 180,
        visible: true,
        editRender: {
          name: '$vxeTree',
          props: {
            queryparams: {
              eleCode: 'IS_ALLE',
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
                url: 'bisConfig/config/common/queryTreeAssistData' // 是否调用接口直接获取数据，当此项有值时将会自动家数据
              }
            }
          }
        }
      },
      {
        title: '工资标识',
        field: 'isSal',
        align: 'left',
        width: 180,
        visible: true,
        editRender: {
          name: '$vxeTree',
          props: {
            queryparams: {
              eleCode: 'IS_SAL',
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
                url: 'bisConfig/config/common/queryTreeAssistData' // 是否调用接口直接获取数据，当此项有值时将会自动家数据
              }
            }
          }
        }
      },
      {
        title: '是否工会经费',
        field: 'isFun',
        align: 'left',
        width: 180,
        visible: true,
        editRender: {
          name: '$vxeTree',
          props: {
            queryparams: {
              eleCode: 'IS_FUN',
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
                url: 'bisConfig/config/common/queryTreeAssistData' // 是否调用接口直接获取数据，当此项有值时将会自动家数据
              }
            }
          }
        }
      },
      {
        title: '三公经费',
        field: 'thrExp',
        align: 'left',
        width: 180,
        visible: true,
        editRender: {
          name: '$vxeTree',
          props: {
            queryparams: {
              eleCode: 'THR_EXP',
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
                url: 'bisConfig/config/common/queryTreeAssistData' // 是否调用接口直接获取数据，当此项有值时将会自动家数据
              }
            }
          }
        }
      },
      {
        title: '收支类型',
        field: 'proCat',
        align: 'left',
        width: 180,
        visible: true,
        editRender: {
          name: '$vxeTree',
          props: {
            queryparams: {
              eleCode: 'PRO_CAT',
              queryConditions: 'and code in (\'331\',\'332\')'
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
                url: 'bisConfig/config/common/queryTreeAssistData' // 是否调用接口直接获取数据，当此项有值时将会自动家数据
              }
            }
          }
        }
      },
      {
        title: '社会投入资金',
        field: 'scoiInvestFund',
        align: 'right',
        width: 180,
        visible: true,
        combinedType: ['average', 'subTotal', 'total', 'totalAll'],
        editRender: {
          name: '$vxeMoney',
          props: {
            clearable: true
          }
        }
      },
      {
        title: '分配方式',
        field: 'distriType',
        align: 'left',
        width: 180,
        visible: true,
        editRender: {
          name: '$vxeTree',
          props: {
            queryparams: {
              eleCode: 'DISTRITYPE',
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
                url: 'bisConfig/config/common/queryTreeAssistData' // 是否调用接口直接获取数据，当此项有值时将会自动家数据
              }
            }
          }
        }
      },
      {
        title: '部门预算经济分类',
        field: 'depBgtEco',
        align: 'left',
        width: 200,
        visible: true,
        editRender: {
          name: '$vxeTree',
          props: {
            queryparams: {
              eleCode: 'DEP_BGT_ECO',
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
                url: 'bisConfig/config/common/queryTreeAssistData' // 是否调用接口直接获取数据，当此项有值时将会自动家数据
              }
            }
          }
        }
      },
      {
        title: '政府预算经济分类',
        field: 'govBgtEco',
        align: 'left',
        width: 200,
        visible: true,
        editRender: {
          name: '$vxeTree',
          props: {
            queryparams: {
              eleCode: 'GOV_BGT_ECO',
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
                url: 'bisConfig/config/common/queryTreeAssistData' // 是否调用接口直接获取数据，当此项有值时将会自动家数据
              }
            }
          }
        }
      },
      {
        title: '是否直达资金的配套',
        field: 'isMat',
        align: 'left',
        width: 200,
        visible: true,
        editRender: {
          name: '$vxeTree',
          props: {
            queryparams: {
              eleCode: 'IS_MAT',
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
                url: 'bisConfig/config/common/queryTreeAssistData' // 是否调用接口直接获取数据，当此项有值时将会自动家数据
              }
            }
          }
        }
      },
      {
        title: '指标来源类型',
        field: 'bgtSource',
        align: 'left',
        width: 180,
        visible: true,
        editRender: {
          name: '$vxeTree',
          props: {
            queryparams: {
              eleCode: 'BGT_SOURCE',
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
                url: 'bisConfig/config/common/queryTreeAssistData' // 是否调用接口直接获取数据，当此项有值时将会自动家数据
              }
            }
          }
        }
      },
      {
        title: '是否补贴到人到企',
        field: 'isSub',
        align: 'left',
        width: 180,
        visible: true,
        editRender: {
          name: '$vxeTree',
          props: {
            queryparams: {
              eleCode: 'IS_SUB',
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
                url: 'bisConfig/config/common/queryTreeAssistData' // 是否调用接口直接获取数据，当此项有值时将会自动家数据
              }
            }
          }
        }
      },
      {
        title: '是否政府采购',
        field: 'isGovPur',
        align: 'left',
        width: 180,
        visible: true,
        editRender: {
          name: '$vxeTree',
          props: {
            queryparams: {
              eleCode: 'HOLD8',
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
                url: 'bisConfig/config/common/queryTreeAssistData' // 是否调用接口直接获取数据，当此项有值时将会自动家数据
              }
            }
          }
        }
      }
    ],
    formItems: [
      {
        title: '指标文号标题',
        field: 'bgtDocTitle',
        align: 'left',
        width: 180,
        visible: true,
        itemRender: {
          name: '$vxeInput',
          props: {
            clearable: true
          }
        }
      },
      {
        title: '指标文号',
        field: 'corBgtDocNo',
        align: 'left',
        width: 180,
        visible: true,
        itemRender: {
          name: '$vxeTree',
          props: {
            queryparams: {
              eleCode: 'COR_BGT_DOC_NO',
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
                url: 'bisConfig/config/common/queryTreeAssistData' // 是否调用接口直接获取数据，当此项有值时将会自动家数据
              }
            }
          }
        }
      },
      {
        title: '项目编码',
        field: 'proCode',
        align: 'left',
        width: 180,
        visible: true,
        itemRender: {
          name: '$vxeInput',
          props: {
            clearable: true
          }
        }
      },
      {
        title: '指标文号日期',
        field: 'docDate',
        align: 'left',
        width: 180,
        visible: true,
        itemRender: {
          name: '$vxeTime',
          props: {
            clearable: true,
            format: 'YYYY-MM-DD'
          }
        }
      },
      {
        title: '项目名称',
        field: 'proName',
        align: 'left',
        width: 180,
        visible: true,
        itemRender: {
          name: '$vxeTime',
          props: {
            clearable: true
          }
        }
      },
      {
        title: '指标来源',
        field: 'sourceType',
        align: 'left',
        width: 180,
        visible: true,
        itemRender: {
          name: '$vxeTree',
          props: {
            queryparams: {
              eleCode: 'SOURCE_TYPE',
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
                url: 'bisConfig/config/common/queryTreeAssistData' // 是否调用接口直接获取数据，当此项有值时将会自动家数据
              }
            }
          }
        }
      },
      {
        title: '指标文号描述',
        field: 'bgtDec',
        align: 'left',
        width: 180,
        visible: true,
        itemRender: {
          name: '$vxeInput',
          props: {
            clearable: true
          }
        }
      },
      {
        title: '调整日期',
        field: 'adjDate',
        align: 'left',
        width: 180,
        visible: true,
        itemRender: {
          name: '$vxeTime',
          props: {
            clearable: true,
            format: 'YYYY-MM-DD'
          }
        }
      },
      {
        title: '指标金额',
        field: 'amount',
        align: 'right',
        width: 180,
        visible: true,
        combinedType: ['average', 'subTotal', 'total', 'totalAll'],
        itemRender: {
          name: '$vxeMoney',
          props: {
            clearable: true
          }
        }
      },
      {
        title: '资金主管处室',
        field: 'bgtMofDep',
        align: 'left',
        width: 180,
        visible: true,
        itemRender: {
          name: '$vxeTree',
          props: {
            queryparams: {
              eleCode: 'BGT_MOF_DEP',
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
                url: 'bisConfig/config/common/queryTreeAssistData' // 是否调用接口直接获取数据，当此项有值时将会自动家数据
              }
            }
          }
        }
      },
      {
        title: '资金性质',
        field: 'fundType',
        align: 'left',
        width: 180,
        visible: true,
        itemRender: {
          name: '$vxeTree',
          props: {
            queryparams: {
              eleCode: 'FUND_TYPE',
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
                url: 'bisConfig/config/common/queryTreeAssistData' // 是否调用接口直接获取数据，当此项有值时将会自动家数据
              }
            }
          }
        }
      },
      {
        title: '预算级次',
        field: 'budgetLevel',
        align: 'left',
        width: 180,
        visible: true,
        itemRender: {
          name: '$vxeTree',
          props: {
            queryparams: {
              eleCode: 'BUDGET_LEVEL',
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
                url: 'bisConfig/config/common/queryTreeAssistData' // 是否调用接口直接获取数据，当此项有值时将会自动家数据
              }
            }
          }
        }
      },
      {
        title: '财政内部机构',
        field: 'manageMofDep',
        align: 'left',
        width: 180,
        visible: true,
        itemRender: {
          name: '$vxeTree',
          props: {
            queryparams: {
              eleCode: 'MANAGE_MOF_DEP',
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
                url: 'bisConfig/config/common/queryTreeAssistData' // 是否调用接口直接获取数据，当此项有值时将会自动家数据
              }
            }
          }
        }
      },
      {
        title: '支付方式',
        field: 'payType',
        align: 'left',
        width: 180,
        visible: true,
        itemRender: {
          name: '$vxeTree',
          props: {
            queryparams: {
              eleCode: 'PAY_TYPE',
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
                url: 'bisConfig/config/common/queryTreeAssistData' // 是否调用接口直接获取数据，当此项有值时将会自动家数据
              }
            }
          }
        }
      },
      {
        title: '预算单位',
        field: 'agency',
        align: 'left',
        width: 180,
        visible: true,
        itemRender: {
          name: '$vxeTree',
          props: {
            queryparams: {
              eleCode: 'AGENCY',
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
                url: 'bisConfig/config/common/queryTreeAssistData' // 是否调用接口直接获取数据，当此项有值时将会自动家数据
              }
            }
          }
        }
      },
      {
        title: '支出功能分类',
        field: 'expFunc',
        align: 'left',
        width: 180,
        visible: true,
        itemRender: {
          name: '$vxeTree',
          props: {
            queryparams: {
              eleCode: 'EXP_FUNC',
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
                url: 'bisConfig/config/common/queryTreeAssistData' // 是否调用接口直接获取数据，当此项有值时将会自动家数据
              }
            }
          }
        }
      },
      {
        title: '指标类型',
        field: 'bgtType',
        align: 'left',
        width: 180,
        visible: true,
        itemRender: {
          name: '$vxeTree',
          props: {
            queryparams: {
              eleCode: 'BGTTYPE',
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
                url: 'bisConfig/config/common/queryTreeAssistData' // 是否调用接口直接获取数据，当此项有值时将会自动家数据
              }
            }
          }
        }
      },
      {
        title: '资金来源',
        field: 'foundType',
        align: 'left',
        width: 180,
        visible: true,
        itemRender: {
          name: '$vxeTree',
          props: {
            queryparams: {
              eleCode: 'FOUND_TYPE',
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
                url: 'bisConfig/config/common/queryTreeAssistData' // 是否调用接口直接获取数据，当此项有值时将会自动家数据
              }
            }
          }
        }
      },
      {
        title: '收支结构标识',
        field: 'isIncomePay',
        align: 'left',
        width: 180,
        visible: true,
        itemRender: {
          name: '$vxeTree',
          props: {
            queryparams: {
              eleCode: 'IS_INCOME_PAY',
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
                url: 'bisConfig/config/common/queryTreeAssistData' // 是否调用接口直接获取数据，当此项有值时将会自动家数据
              }
            }
          }
        }
      },
      {
        title: '主管部门',
        field: 'dept',
        align: 'left',
        width: 180,
        visible: true,
        itemRender: {
          name: '$vxeTree',
          props: {
            queryparams: {
              eleCode: 'DEPT',
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
                url: 'bisConfig/config/common/queryTreeAssistData' // 是否调用接口直接获取数据，当此项有值时将会自动家数据
              }
            }
          }
        }
      },
      {
        title: '指标摘要',
        field: 'bgtRem',
        align: 'left',
        width: 180,
        visible: true,
        itemRender: {
          name: '$vxeTree',
          props: {
            queryparams: {
              eleCode: 'BGT_REM',
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
                url: 'bisConfig/config/common/queryTreeAssistData' // 是否调用接口直接获取数据，当此项有值时将会自动家数据
              }
            }
          }
        }
      },
      {
        title: '直达资金标识',
        field: 'isDir',
        align: 'left',
        width: 180,
        visible: true,
        itemRender: {
          name: '$vxeTree',
          props: {
            queryparams: {
              eleCode: 'IS_DIR',
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
                url: 'bisConfig/config/common/queryTreeAssistData' // 是否调用接口直接获取数据，当此项有值时将会自动家数据
              }
            }
          }
        }
      },
      {
        title: '是否扶贫',
        field: 'isAlle',
        align: 'left',
        width: 180,
        visible: true,
        itemRender: {
          name: '$vxeTree',
          props: {
            queryparams: {
              eleCode: 'IS_ALLE',
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
                url: 'bisConfig/config/common/queryTreeAssistData' // 是否调用接口直接获取数据，当此项有值时将会自动家数据
              }
            }
          }
        }
      },
      {
        title: '工资标识',
        field: 'isSal',
        align: 'left',
        width: 180,
        visible: true,
        itemRender: {
          name: '$vxeTree',
          props: {
            queryparams: {
              eleCode: 'IS_SAL',
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
                url: 'bisConfig/config/common/queryTreeAssistData' // 是否调用接口直接获取数据，当此项有值时将会自动家数据
              }
            }
          }
        }
      },
      {
        title: '是否工会经费',
        field: 'isFun',
        align: 'left',
        width: 180,
        visible: true,
        itemRender: {
          name: '$vxeTree',
          props: {
            queryparams: {
              eleCode: 'IS_FUN',
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
                url: 'bisConfig/config/common/queryTreeAssistData' // 是否调用接口直接获取数据，当此项有值时将会自动家数据
              }
            }
          }
        }
      },
      {
        title: '三公经费',
        field: 'thrExp',
        align: 'left',
        width: 180,
        visible: true,
        itemRender: {
          name: '$vxeTree',
          props: {
            queryparams: {
              eleCode: 'THR_EXP',
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
                url: 'bisConfig/config/common/queryTreeAssistData' // 是否调用接口直接获取数据，当此项有值时将会自动家数据
              }
            }
          }
        }
      },
      {
        title: '收支类型',
        field: 'proCat',
        align: 'left',
        width: 180,
        visible: true,
        itemRender: {
          name: '$vxeTree',
          props: {
            queryparams: {
              eleCode: 'PRO_CAT',
              queryConditions: 'and code in (\'331\',\'332\')'
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
                url: 'bisConfig/config/common/queryTreeAssistData' // 是否调用接口直接获取数据，当此项有值时将会自动家数据
              }
            }
          }
        }
      },
      {
        title: '社会投入资金',
        field: 'scoiInvestFund',
        align: 'right',
        width: 180,
        visible: true,
        combinedType: ['average', 'subTotal', 'total', 'totalAll'],
        itemRender: {
          name: '$vxeMoney',
          props: {
            clearable: true
          }
        }
      },
      {
        title: '分配方式',
        field: 'distriType',
        align: 'left',
        width: 180,
        visible: true,
        itemRender: {
          name: '$vxeTree',
          props: {
            queryparams: {
              eleCode: 'DISTRITYPE',
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
                url: 'bisConfig/config/common/queryTreeAssistData' // 是否调用接口直接获取数据，当此项有值时将会自动家数据
              }
            }
          }
        }
      },
      {
        title: '部门预算经济分类',
        field: 'depBgtEco',
        align: 'left',
        width: 200,
        visible: true,
        itemRender: {
          name: '$vxeTree',
          props: {
            queryparams: {
              eleCode: 'DEP_BGT_ECO',
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
                url: 'bisConfig/config/common/queryTreeAssistData' // 是否调用接口直接获取数据，当此项有值时将会自动家数据
              }
            }
          }
        }
      },
      {
        title: '政府预算经济分类',
        field: 'govBgtEco',
        align: 'left',
        width: 200,
        visible: true,
        itemRender: {
          name: '$vxeTree',
          props: {
            queryparams: {
              eleCode: 'GOV_BGT_ECO',
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
                url: 'bisConfig/config/common/queryTreeAssistData' // 是否调用接口直接获取数据，当此项有值时将会自动家数据
              }
            }
          }
        }
      },
      {
        title: '是否直达资金的配套',
        field: 'isMat',
        align: 'left',
        width: 200,
        visible: true,
        itemRender: {
          name: '$vxeTree',
          props: {
            queryparams: {
              eleCode: 'IS_MAT',
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
                url: 'bisConfig/config/common/queryTreeAssistData' // 是否调用接口直接获取数据，当此项有值时将会自动家数据
              }
            }
          }
        }
      },
      {
        title: '指标来源类型',
        field: 'bgtSource',
        align: 'left',
        width: 180,
        visible: true,
        itemRender: {
          name: '$vxeTree',
          props: {
            queryparams: {
              eleCode: 'BGT_SOURCE',
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
                url: 'bisConfig/config/common/queryTreeAssistData' // 是否调用接口直接获取数据，当此项有值时将会自动家数据
              }
            }
          }
        }
      },
      {
        title: '是否补贴到人到企',
        field: 'isSub',
        align: 'left',
        width: 180,
        visible: true,
        itemRender: {
          name: '$vxeTree',
          props: {
            queryparams: {
              eleCode: 'IS_SUB',
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
                url: 'bisConfig/config/common/queryTreeAssistData' // 是否调用接口直接获取数据，当此项有值时将会自动家数据
              }
            }
          }
        }
      },
      {
        title: '是否政府采购',
        field: 'isGovPur',
        align: 'left',
        width: 180,
        visible: true,
        itemRender: {
          name: '$vxeTree',
          props: {
            queryparams: {
              eleCode: 'HOLD8',
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
                url: 'bisConfig/config/common/queryTreeAssistData' // 是否调用接口直接获取数据，当此项有值时将会自动家数据
              }
            }
          }
        }
      }
    ],
    validateRules: {
      distriType: [{
        required: true,
        trigger: 'change',
        message: '分配方式不得为空'
      }],
      isIncomePay: [{
        required: true,
        trigger: 'change',
        message: '收支结构标识不得为空'
      }],
      isFun: [{
        required: true,
        trigger: 'change',
        message: '是否工会经费不得为空'
      }],
      isAlle: [{
        required: true,
        trigger: 'change',
        message: '是否扶贫不得为空'
      }],
      bgtDocTitle: [{
        required: true,
        trigger: 'change',
        message: '指标文号标题不得为空'
      }, {
        max: 200,
        message: '指标文号标题最大长度：200',
        trigger: 'change'
      }],
      payType: [{
        required: true,
        trigger: 'change',
        message: '支付方式不得为空'
      }],
      adjDate: [{
        required: true,
        trigger: 'change',
        message: '调整日期不得为空'
      }],
      foundType: [{
        required: true,
        trigger: 'change',
        message: '资金来源不得为空'
      }],
      budgetLevel: [{
        required: true,
        trigger: 'change',
        message: '预算级次不得为空'
      }],
      isSal: [{
        required: true,
        trigger: 'change',
        message: '工资标识不得为空'
      }],
      isMat: [{
        required: true,
        trigger: 'change',
        message: '是否直达资金的配套不得为空'
      }],
      bgtDec: [{
        required: true,
        trigger: 'change',
        message: '指标文号描述不得为空'
      }, {
        max: 200,
        message: '指标文号描述最大长度：200',
        trigger: 'change'
      }],
      sourceType: [{
        required: true,
        trigger: 'change',
        message: '指标来源不得为空'
      }],
      govBgtEco: [{
        required: true,
        trigger: 'change',
        message: '政府预算经济分类不得为空'
      }],
      proCode: [{
        required: true,
        trigger: 'change',
        message: '项目编码不得为空'
      }, {
        max: 200,
        message: '项目编码最大长度：200',
        trigger: 'change'
      }],
      fundType: [{
        required: true,
        trigger: 'change',
        message: '资金性质不得为空'
      }],
      bgtMofDep: [{
        required: true,
        trigger: 'change',
        message: '资金主管处室不得为空'
      }],
      manageMofDep: [{
        required: true,
        trigger: 'change',
        message: '财政内部机构不得为空'
      }],
      bgtRem: [{
        required: true,
        trigger: 'change',
        message: '指标摘要不得为空'
      }],
      bgtType: [{
        required: true,
        trigger: 'change',
        message: '指标类型不得为空'
      }],
      proName: [{
        required: true,
        trigger: 'change',
        message: '项目名称不得为空'
      }, {
        max: 200,
        message: '项目名称最大长度：200',
        trigger: 'change'
      }],
      thrExp: [{
        required: true,
        trigger: 'change',
        message: '三公经费不得为空'
      }],
      amount: [{
        required: true,
        trigger: 'change',
        message: '指标金额不得为空'
      }],
      agency: [{
        required: true,
        trigger: 'change',
        message: '预算单位不得为空'
      }],
      corBgtDocNo: [{
        required: true,
        trigger: 'change',
        message: '指标文号不得为空'
      }],
      expFunc: [{
        required: true,
        trigger: 'change',
        message: '支出功能分类不得为空'
      }],
      docDate: [{
        required: true,
        trigger: 'change',
        message: '指标文号日期不得为空'
      }],
      dept: [{
        required: true,
        trigger: 'change',
        message: '主管部门不得为空'
      }],
      proCat: [{
        required: true,
        trigger: 'change',
        message: '收支类型不得为空'
      }],
      depBgtEco: [{
        required: true,
        trigger: 'change',
        message: '部门预算经济分类不得为空'
      }],
      isDir: [{
        required: true,
        trigger: 'change',
        message: '直达资金标识不得为空'
      }],
      scoiInvestFund: [{
        required: true,
        trigger: 'change',
        message: '社会投入资金不得为空'
      }],
      isSub: [{
        required: true,
        trigger: 'change',
        message: '是否补贴到人到企业不得为空'
      }],
      bgtSource: [{
        required: true,
        trigger: 'change',
        message: '指标来源类型不得为空'
      }],
      isGovPur: [{
        required: true,
        trigger: 'change',
        message: '是否政府采购不得为空'
      }]
    }
  },
  extendAttrs: {},
  formData: {}
}
