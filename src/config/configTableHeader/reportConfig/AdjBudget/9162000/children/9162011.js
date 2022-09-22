// 800025_reduce 政府购买服务表
export default {
  '9162011': {
    tableCols: [
      {
        title: '预算单位',
        field: 'agency',
        width: 180,
        align: 'left',
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
        title: '项目代码',
        field: 'proCode',
        width: 120,
        align: 'left'
      },
      {
        title: '项目名称',
        field: 'proName',
        width: 120,
        align: 'left'
      },
      {
        title: '支出功能分类',
        field: 'expFunc',
        width: 180,
        align: 'left',
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
        title: '部门预算经济分类',
        field: 'depBgtEco',
        width: 180,
        align: 'left',
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
        title: '政府预算经济分类',
        field: 'govBgtEco',
        width: 180,
        align: 'left',
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
        title: '是否政府采购',
        field: 'bgtGovpurFlag',
        width: 180,
        align: 'left',
        cellRender: {
          name: '$vxeSelect',
          props: {
            disabled: true
          },
          options: [{
            value: '1',
            label: '是'
          }, {
            value: '0',
            label: '否'
          }]
        }
      },
      {
        title: '购买服务内容',
        field: 'govBuyDes',
        width: 180,
        align: 'left',
        cellRender: {
          name: '$vxeInput'
        }
      },
      {
        title: '购买数量',
        field: 'buyNo',
        width: 180,
        cellRender: {
          name: '$vxeInput', props: { type: 'integer', min: 0 }
        }
      },
      {
        title: '购买金额',
        field: 'gmje',
        children: [
          {
            title: '原金额',
            field: 'oldBuyAmt',
            minWidth: 140,
            align: 'right',
            combinedType: ['average', 'total']
          },
          {
            title: '调减金额',
            field: 'buyAmt',
            minWidth: 140,
            cellRender: { name: '$vxeMoney', props: { type: 'float' } },
            align: 'right',
            combinedType: ['average', 'total']
          }
        ]
      },
      {
        title: '合计',
        field: 'hj',
        children: [
          {
            title: '原金额',
            field: 'oldF2',
            minWidth: '140',
            align: 'right',
            combinedType: ['average', 'total']
          },
          {
            title: '调减金额',
            field: 'f2',
            width: 180,
            formula: '{f00111}+{f00112}+{f00113}+{f00114}+{f00121}+{f00122}+{f0013}+{f0014}+{f002}+{f0031}+{f0032}+{f0033}+{f0034}+{f0039}',
            cellRender: { name: '$vxeCalculate' },
            align: 'right',
            combinedType: ['average', 'total']
          }
        ]
      },
      {
        'align': 'left',
        'children': [
          {
            'align': 'left',
            'children': [
              {
                title: '一般公共预算资金',
                children: [
                  {
                    title: '原金额',
                    field: 'oldF00111',
                    minWidth: 140,
                    align: 'right',
                    cellRender: { name: '$vxeMoney' },
                    combinedType: ['average', 'total']
                  },
                  {
                    title: '调减金额',
                    field: 'f00111',
                    minWidth: 140,
                    cellRender: { name: '$vxeMoney' },
                    align: 'right',
                    combinedType: ['average', 'total']
                  }
                ]
              },
              {
                title: '一般债券',
                children: [
                  {
                    title: '原金额',
                    field: 'oldF00112',
                    minWidth: 140,
                    align: 'right',
                    cellRender: { name: '$vxeMoney' },
                    combinedType: ['average', 'total']
                  },
                  {
                    title: '调减金额',
                    field: 'f00112',
                    minWidth: 140,
                    cellRender: { name: '$vxeMoney' },
                    align: 'right',
                    combinedType: ['average', 'total']
                  }
                ]
              },
              {
                title: '外国政府和国际组织贷款',
                children: [
                  {
                    title: '原金额',
                    field: 'oldF00113',
                    minWidth: 140,
                    align: 'right',
                    cellRender: { name: '$vxeMoney' },
                    combinedType: ['average', 'total']
                  },
                  {
                    title: '调减金额',
                    field: 'f00113',
                    minWidth: 140,
                    cellRender: { name: '$vxeMoney' },
                    align: 'right',
                    combinedType: ['average', 'total']
                  }
                ]
              },
              {
                title: '外国政府和国际组织赠款',
                children: [
                  {
                    title: '原金额',
                    field: 'oldF00114',
                    minWidth: 140,
                    align: 'right',
                    cellRender: { name: '$vxeMoney' },
                    combinedType: ['average', 'total']
                  },
                  {
                    title: '调减金额',
                    field: 'f00114',
                    minWidth: 140,
                    cellRender: { name: '$vxeMoney' },
                    align: 'right',
                    combinedType: ['average', 'total']
                  }
                ]
              }
            ],
            'extendProps': {},
            'required': true,
            'sortable': false,
            'title': '一般公共预算资金',
            'visible': true,
            'width': 180
          },
          {
            'align': 'left',
            'children': [
              {
                title: '政府性基金预算资金',
                children: [
                  {
                    title: '原金额',
                    field: 'oldF00121',
                    minWidth: 140,
                    align: 'right',
                    cellRender: { name: '$vxeMoney' },
                    combinedType: ['average', 'total']
                  },
                  {
                    title: '调减金额',
                    field: 'f00121',
                    minWidth: 140,
                    cellRender: { name: '$vxeMoney' },
                    align: 'right',
                    combinedType: ['average', 'total']
                  }
                ]
              },
              {
                title: '专项债券',
                children: [
                  {
                    title: '原金额',
                    field: 'oldF00122',
                    minWidth: 140,
                    align: 'right',
                    cellRender: { name: '$vxeMoney' },
                    combinedType: ['average', 'total']
                  },
                  {
                    title: '调减金额',
                    field: 'f00122',
                    minWidth: 140,
                    cellRender: { name: '$vxeMoney' },
                    align: 'right',
                    combinedType: ['average', 'total']
                  }
                ]
              }
            ],
            'extendProps': {},
            'required': true,
            'sortable': false,
            'title': '政府性基金预算资金',
            'visible': true,
            'width': 180
          },
          {
            title: '国有资本经营预算资金',
            children: [
              {
                title: '原金额',
                field: 'oldF0013',
                minWidth: 140,
                align: 'right',
                cellRender: { name: '$vxeMoney' },
                combinedType: ['average', 'total']
              },
              {
                title: '调减金额',
                field: 'f0013',
                minWidth: 140,
                cellRender: { name: '$vxeMoney' },
                align: 'right',
                combinedType: ['average', 'total']
              }
            ]
          },
          {
            title: '社会保险基金预算资金',
            children: [
              {
                title: '原金额',
                field: 'oldF0014',
                minWidth: 140,
                align: 'right',
                cellRender: { name: '$vxeMoney' },
                combinedType: ['average', 'total']
              },
              {
                title: '调减金额',
                field: 'f0014',
                minWidth: 140,
                cellRender: { name: '$vxeMoney' },
                align: 'right',
                combinedType: ['average', 'total']
              }
            ]
          }
        ],
        'extendProps': {},
        'required': false,
        'sortable': false,
        'title': '政府预算资金',
        'visible': true,
        'width': 180
      },
      {
        title: '财政专户管理资金',
        children: [
          {
            title: '原金额',
            field: 'oldF002',
            minWidth: 140,
            align: 'right',
            cellRender: { name: '$vxeMoney' },
            combinedType: ['average', 'total']
          },
          {
            title: '调减金额',
            field: 'f002',
            minWidth: 140,
            cellRender: { name: '$vxeMoney' },
            align: 'right',
            combinedType: ['average', 'total']
          }
        ]
      },
      {
        'align': 'left',
        'children': [
          {
            title: '事业收入资金',
            children: [
              {
                title: '原金额',
                field: 'oldF0031',
                minWidth: 140,
                align: 'right',
                cellRender: { name: '$vxeMoney' },
                combinedType: ['average', 'total']
              },
              {
                title: '调减金额',
                field: 'f0031',
                minWidth: 140,
                cellRender: { name: '$vxeMoney' },
                align: 'right',
                combinedType: ['average', 'total']
              }
            ]
          },
          {
            title: '上级补助收入资金',
            children: [
              {
                title: '原金额',
                field: 'oldF0032',
                minWidth: 140,
                align: 'right',
                cellRender: { name: '$vxeMoney' },
                combinedType: ['average', 'total']
              },
              {
                title: '调减金额',
                field: 'f0032',
                minWidth: 140,
                cellRender: { name: '$vxeMoney' },
                align: 'right',
                combinedType: ['average', 'total']
              }
            ]
          },
          {
            title: '附属单位上缴收入资金',
            children: [
              {
                title: '原金额',
                field: 'oldF0033',
                minWidth: 140,
                align: 'right',
                cellRender: { name: '$vxeMoney' },
                combinedType: ['average', 'total']
              },
              {
                title: '调减金额',
                field: 'f0033',
                minWidth: 140,
                cellRender: { name: '$vxeMoney' },
                align: 'right',
                combinedType: ['average', 'total']
              }
            ]
          },
          {
            title: '事业单位经营收入资金',
            children: [
              {
                title: '原金额',
                field: 'oldF0034',
                minWidth: 140,
                align: 'right',
                cellRender: { name: '$vxeMoney' },
                combinedType: ['average', 'total']
              },
              {
                title: '调减金额',
                field: 'f0034',
                minWidth: 140,
                cellRender: { name: '$vxeMoney' },
                align: 'right',
                combinedType: ['average', 'total']
              }
            ]
          },
          {
            title: '其他资金收入',
            children: [
              {
                title: '原金额',
                field: 'oldF0039',
                minWidth: 140,
                align: 'right',
                cellRender: { name: '$vxeMoney' },
                combinedType: ['average', 'total']
              },
              {
                title: '调减金额',
                field: 'f0039',
                minWidth: 140,
                cellRender: { name: '$vxeMoney' },
                align: 'right',
                combinedType: ['average', 'total']
              }
            ]
          }
        ],
        'extendProps': {},
        'required': false,
        'sortable': false,
        'title': '单位资金',
        'visible': true,
        'width': 180
      },
      {
        title: '备注',
        field: 'remark',
        width: 180,
        align: 'left',
        cellRender: {
          name: '$vxeInput',
          props: { type: 'text' }
        }
      }
    ],
    editTableCols: [
      {
        title: '预算单位',
        field: 'agency',
        width: 180,
        align: 'left',
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
        title: '项目代码',
        field: 'proCode',
        width: 120,
        align: 'left'
      },
      {
        title: '项目名称',
        field: 'proName',
        width: 120,
        align: 'left'
      },
      {
        title: '支出功能分类',
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
            },
            queryparams: {
              eleCode: 'VW_BAS_EXP_FUNC'
            }
          }
        }
      },
      {
        title: '部门预算经济分类',
        field: 'depBgtEco',
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
            },
            queryparams: {
              eleCode: 'VW_BAS_DEP_BGT_ECO'
            }
          }
        }
      },
      {
        title: '政府预算经济分类',
        field: 'govBgtEco',
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
              isleaf: true,
              disabled: true
            },
            queryparams: {
              eleCode: 'VW_BAS_GOV_BGT_ECO'
            }
          }
        }
      },
      {
        title: '是否政府采购',
        field: 'bgtGovpurFlag',
        width: 180,
        align: 'left',
        editRender: {
          name: '$vxeSelect',
          props: {
            disabled: true
          },
          options: [{
            value: '1',
            label: '是'
          }, {
            value: '0',
            label: '否'
          }]
        }
      },
      {
        title: '购买服务内容',
        field: 'govBuyDes',
        width: 180,
        align: 'left',
        editRender: {
          name: '$vxeInput'
        }
      },
      {
        title: '购买数量',
        field: 'buyNo',
        width: 180,
        editRender: {
          name: '$vxeInput', props: { type: 'integer', min: 0 }
        }
      },
      {
        title: '购买金额',
        field: 'gmje',
        children: [
          {
            title: '原金额',
            field: 'oldBuyAmt',
            minWidth: 140,
            align: 'right',
            combinedType: ['average', 'total']
          },
          {
            title: '调减金额',
            field: 'buyAmt',
            minWidth: 140,
            editRender: { name: '$vxeMoney', props: { } },
            align: 'right',
            combinedType: ['average', 'total']
          }
        ]
      },
      {
        title: '合计',
        field: 'hj',
        children: [
          {
            title: '原金额',
            field: 'oldF2',
            minWidth: '140',
            align: 'right',
            cellRender: { name: '$vxeMoney' },
            combinedType: ['average', 'total']
          },
          {
            title: '调减金额',
            field: 'f2',
            width: 180,
            formula: '{f00111}+{f00112}+{f00113}+{f00114}+{f00121}+{f00122}+{f0013}+{f0014}+{f002}+{f0031}+{f0032}+{f0033}+{f0034}+{f0039}',
            editRender: { name: '$vxeCalculate' },
            align: 'right',
            combinedType: ['average', 'total']
          }
        ]
      },
      {
        'align': 'left',
        'children': [
          {
            'align': 'left',
            'children': [
              {
                title: '一般公共预算资金',
                children: [
                  {
                    title: '原金额',
                    field: 'oldF00111',
                    minWidth: 140,
                    align: 'right',
                    cellRender: { name: '$vxeMoney' },
                    combinedType: ['average', 'total']
                  },
                  {
                    title: '调减金额',
                    field: 'f00111',
                    minWidth: 140,
                    editRender: { name: '$vxeMoney' },
                    align: 'right',
                    combinedType: ['average', 'total']
                  }
                ]
              },
              {
                title: '一般债券',
                children: [
                  {
                    title: '原金额',
                    field: 'oldF00112',
                    minWidth: 140,
                    align: 'right',
                    cellRender: { name: '$vxeMoney' },
                    combinedType: ['average', 'total']
                  },
                  {
                    title: '调减金额',
                    field: 'f00112',
                    minWidth: 140,
                    editRender: { name: '$vxeMoney' },
                    align: 'right',
                    combinedType: ['average', 'total']
                  }
                ]
              },
              {
                title: '外国政府和国际组织贷款',
                children: [
                  {
                    title: '原金额',
                    field: 'oldF00113',
                    minWidth: 140,
                    align: 'right',
                    cellRender: { name: '$vxeMoney' },
                    combinedType: ['average', 'total']
                  },
                  {
                    title: '调减金额',
                    field: 'f00113',
                    minWidth: 140,
                    editRender: { name: '$vxeMoney' },
                    align: 'right',
                    combinedType: ['average', 'total']
                  }
                ]
              },
              {
                title: '外国政府和国际组织赠款',
                children: [
                  {
                    title: '原金额',
                    field: 'oldF00114',
                    minWidth: 140,
                    align: 'right',
                    cellRender: { name: '$vxeMoney' },
                    combinedType: ['average', 'total']
                  },
                  {
                    title: '调减金额',
                    field: 'f00114',
                    minWidth: 140,
                    editRender: { name: '$vxeMoney' },
                    align: 'right',
                    combinedType: ['average', 'total']
                  }
                ]
              }
            ],
            'extendProps': {},
            'required': true,
            'sortable': false,
            'title': '一般公共预算资金',
            'visible': true,
            'width': 180
          },
          {
            'align': 'left',
            'children': [
              {
                title: '政府性基金预算资金',
                children: [
                  {
                    title: '原金额',
                    field: 'oldF00121',
                    minWidth: 140,
                    align: 'right',
                    cellRender: { name: '$vxeMoney' },
                    combinedType: ['average', 'total']
                  },
                  {
                    title: '调减金额',
                    field: 'f00121',
                    minWidth: 140,
                    editRender: { name: '$vxeMoney' },
                    align: 'right',
                    combinedType: ['average', 'total']
                  }
                ]
              },
              {
                title: '专项债券',
                children: [
                  {
                    title: '原金额',
                    field: 'oldF00122',
                    minWidth: 140,
                    align: 'right',
                    cellRender: { name: '$vxeMoney' },
                    combinedType: ['average', 'total']
                  },
                  {
                    title: '调减金额',
                    field: 'f00122',
                    minWidth: 140,
                    editRender: { name: '$vxeMoney' },
                    align: 'right',
                    combinedType: ['average', 'total']
                  }
                ]
              }
            ],
            'extendProps': {},
            'required': true,
            'sortable': false,
            'title': '政府性基金预算资金',
            'visible': true,
            'width': 180
          },
          {
            title: '国有资本经营预算资金',
            children: [
              {
                title: '原金额',
                field: 'oldF0013',
                minWidth: 140,
                align: 'right',
                cellRender: { name: '$vxeMoney' },
                combinedType: ['average', 'total']
              },
              {
                title: '调减金额',
                field: 'f0013',
                minWidth: 140,
                editRender: { name: '$vxeMoney' },
                align: 'right',
                combinedType: ['average', 'total']
              }
            ]
          },
          {
            title: '社会保险基金预算资金',
            children: [
              {
                title: '原金额',
                field: 'oldF0014',
                minWidth: 140,
                align: 'right',
                cellRender: { name: '$vxeMoney' },
                combinedType: ['average', 'total']
              },
              {
                title: '调减金额',
                field: 'f0014',
                minWidth: 140,
                editRender: { name: '$vxeMoney' },
                align: 'right',
                combinedType: ['average', 'total']
              }
            ]
          }
        ],
        'extendProps': {},
        'required': false,
        'sortable': false,
        'title': '政府预算资金',
        'visible': true,
        'width': 180
      },
      {
        title: '财政专户管理资金',
        children: [
          {
            title: '原金额',
            field: 'oldF002',
            minWidth: 140,
            align: 'right',
            cellRender: { name: '$vxeMoney' },
            combinedType: ['average', 'total']
          },
          {
            title: '调减金额',
            field: 'f002',
            minWidth: 140,
            editRender: { name: '$vxeMoney' },
            align: 'right',
            combinedType: ['average', 'total']
          }
        ]
      },
      {
        'align': 'left',
        'children': [
          {
            title: '事业收入资金',
            children: [
              {
                title: '原金额',
                field: 'oldF0031',
                minWidth: 140,
                align: 'right',
                cellRender: { name: '$vxeMoney' },
                combinedType: ['average', 'total']
              },
              {
                title: '调减金额',
                field: 'f0031',
                minWidth: 140,
                editRender: { name: '$vxeMoney' },
                align: 'right',
                combinedType: ['average', 'total']
              }
            ]
          },
          {
            title: '上级补助收入资金',
            children: [
              {
                title: '原金额',
                field: 'oldF0032',
                minWidth: 140,
                align: 'right',
                cellRender: { name: '$vxeMoney' },
                combinedType: ['average', 'total']
              },
              {
                title: '调减金额',
                field: 'f0032',
                minWidth: 140,
                editRender: { name: '$vxeMoney' },
                align: 'right',
                combinedType: ['average', 'total']
              }
            ]
          },
          {
            title: '附属单位上缴收入资金',
            children: [
              {
                title: '原金额',
                field: 'oldF0033',
                minWidth: 140,
                align: 'right',
                cellRender: { name: '$vxeMoney' },
                combinedType: ['average', 'total']
              },
              {
                title: '调减金额',
                field: 'f0033',
                minWidth: 140,
                editRender: { name: '$vxeMoney' },
                align: 'right',
                combinedType: ['average', 'total']
              }
            ]
          },
          {
            title: '事业单位经营收入资金',
            children: [
              {
                title: '原金额',
                field: 'oldF0034',
                minWidth: 140,
                align: 'right',
                cellRender: { name: '$vxeMoney' },
                combinedType: ['average', 'total']
              },
              {
                title: '调减金额',
                field: 'f0034',
                minWidth: 140,
                editRender: { name: '$vxeMoney' },
                align: 'right',
                combinedType: ['average', 'total']
              }
            ]
          },
          {
            title: '其他资金收入',
            children: [
              {
                title: '原金额',
                field: 'oldF0039',
                minWidth: 140,
                align: 'right',
                cellRender: { name: '$vxeMoney' },
                combinedType: ['average', 'total']
              },
              {
                title: '调减金额',
                field: 'f0039',
                minWidth: 140,
                editRender: { name: '$vxeMoney' },
                align: 'right',
                combinedType: ['average', 'total']
              }
            ]
          }
        ],
        'extendProps': {},
        'required': false,
        'sortable': false,
        'title': '单位资金',
        'visible': true,
        'width': 180
      },
      {
        title: '备注',
        field: 'remark',
        width: 180,
        align: 'left',
        editRender: {
          name: '$vxeInput',
          props: { type: 'text' }
        }
      }
    ],
    formItems: [],
    validateRules: {},
    extendAttrs: {},
    formData: {}
  }
}
