export default {
  '9163006': {
    tableCols: [
      {
        title: '预算级次',
        field: 'budgetLevel',
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
            },
            disabled: true,
            queryparams: {
              eleCode: 'BUDGETLEVEL',
              sxspecroleguid: '3250FC3332E1421DA1B0388AA0D34BDC'
            }
          }
        }
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
            },
            queryparams: {
              eleCode: 'EXPFUNC',
              sxspecroleguid: '3250FC3332E1421DA1B0388AA0D34BDC'
            }
          }
        }
      },
      {
        title: '部门预算经济分类',
        field: 'depBgtEco',
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
              eleCode: 'DEPBGTECO',
              sxspecroleguid: '3250FC3332E1421DA1B0388AA0D34BDC'
            }
          }
        }
      },
      {
        title: '政府支出经济分类',
        field: 'govBgtEco',
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
              eleCode: 'GOVBGTECO',
              sxspecroleguid: '3250FC3332E1421DA1B0388AA0D34BDC'
            }
          }
        }
      },
      {
        'align': 'left',
        'cellRender': {
          'name': '$vxeTree',
          'props': {
            'clearable': false,
            'config': {
              'axiosConfig': {
                'method': 'post',
                'statusField': 'code',
                'successCode': '100000',
                'url': 'bisConfig/config/common/queryTreeAssistData'
              },
              'disabled': false,
              'format': '{code}-{name}',
              'isHump': true,
              'isLazeLoad': false,
              'isleaf': 1,
              'levelno': -1,
              'multiple': false,
              'placeholder': '请选择资金来源',
              'treeProps': {
                'children': 'children',
                'label': 'name',
                'labelFormat': '{code}-{name}',
                'nodeKey': 'id'
              },
              'valueKeys': [
                'code',
                'name',
                'id'
              ]
            },
            'placeholder': '请选择资金来源',
            'queryparams': {
              'queryConditions': '',
              'eleCode': 'FOUNDTYPE'
            }
          }
        },
        'extendProps': {},
        'field': 'foundType',
        'required': true,
        'sortable': false,
        'title': '资金来源',
        'visible': true,
        'width': 180
      },
      {
        'align': 'left',
        'cellRender': {
          'name': '$vxeCalculate',
          'props': {
            'clearable': false,
            'disabled': true
          }
        },
        'combinedType': [
          'average',
          'subTotal',
          'total',
          'totalAll'
        ],
        'extendProps': {},
        'field': 'f2',
        'formula': '{f00111}+{f00112}+{f00113}+{f00114}+{f00121}+{f00122}+{f0013}+{f0014}+{f002}+{f0031}+{f0032}+{f0033}+{f0034}+{f0039}',
        'required': false,
        'sortable': false,
        'title': '预算金额合计',
        'visible': true,
        'width': 180
      },
      {
        'align': 'left',
        'children': [
          {
            'align': 'left',
            'children': [
              {
                'align': 'left',
                'combinedType': [
                  'average',
                  'subTotal',
                  'total',
                  'totalAll'
                ],
                'cellRender': {
                  'name': '$vxeMoney',
                  'props': {
                    'clearable': false,
                    'placeholder': '请输入一般公共预算资金'
                  }
                },
                'extendProps': {},
                'field': 'f00111',
                'required': false,
                'sortable': false,
                'title': '一般公共预算资金',
                'visible': true,
                'width': 180,
                'filters': [
                  {
                    'data': {
                      'type': 'has',
                      'isCase': false,
                      'value': '',
                      'dataType': 'float',
                      'valuegt': ''
                    }
                  }
                ],
                'filterRender': {
                  'name': 'FilterComplex'
                }
              },
              {
                'align': 'left',
                'combinedType': [
                  'average',
                  'subTotal',
                  'total',
                  'totalAll'
                ],
                'cellRender': {
                  'name': '$vxeMoney',
                  'props': {
                    'clearable': false,
                    'placeholder': '请输入一般债券'
                  }
                },
                'extendProps': {},
                'field': 'f00112',
                'required': false,
                'sortable': false,
                'title': '一般债券',
                'visible': true,
                'width': 180,
                'filters': [
                  {
                    'data': {
                      'type': 'has',
                      'isCase': false,
                      'value': '',
                      'dataType': 'float',
                      'valuegt': ''
                    }
                  }
                ],
                'filterRender': {
                  'name': 'FilterComplex'
                }
              },
              {
                'align': 'left',
                'combinedType': [
                  'average',
                  'subTotal',
                  'total',
                  'totalAll'
                ],
                'cellRender': {
                  'name': '$vxeMoney',
                  'props': {
                    'clearable': false,
                    'placeholder': '请输入外国政府和国际组织贷款'
                  }
                },
                'extendProps': {},
                'field': 'f00113',
                'required': false,
                'sortable': false,
                'title': '外国政府和国际组织贷款',
                'visible': true,
                'width': 180,
                'filters': [
                  {
                    'data': {
                      'type': 'has',
                      'isCase': false,
                      'value': '',
                      'dataType': 'float',
                      'valuegt': ''
                    }
                  }
                ],
                'filterRender': {
                  'name': 'FilterComplex'
                }
              },
              {
                'align': 'left',
                'combinedType': [
                  'average',
                  'subTotal',
                  'total',
                  'totalAll'
                ],
                'cellRender': {
                  'name': '$vxeMoney',
                  'props': {
                    'clearable': false,
                    'placeholder': '请输入外国政府和国际组织赠款'
                  }
                },
                'extendProps': {},
                'field': 'f00114',
                'required': false,
                'sortable': false,
                'title': '外国政府和国际组织赠款',
                'visible': true,
                'width': 180,
                'filters': [
                  {
                    'data': {
                      'type': 'has',
                      'isCase': false,
                      'value': '',
                      'dataType': 'float',
                      'valuegt': ''
                    }
                  }
                ],
                'filterRender': {
                  'name': 'FilterComplex'
                }
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
                'align': 'left',
                'combinedType': [
                  'average',
                  'subTotal',
                  'total',
                  'totalAll'
                ],
                'cellRender': {
                  'name': '$vxeMoney',
                  'props': {
                    'clearable': false,
                    'placeholder': '请输入政府性基金预算资金'
                  }
                },
                'extendProps': {},
                'field': 'f00121',
                'required': false,
                'sortable': false,
                'title': '政府性基金预算资金',
                'visible': true,
                'width': 180,
                'filters': [
                  {
                    'data': {
                      'type': 'has',
                      'isCase': false,
                      'value': '',
                      'dataType': 'float',
                      'valuegt': ''
                    }
                  }
                ],
                'filterRender': {
                  'name': 'FilterComplex'
                }
              },
              {
                'align': 'left',
                'combinedType': [
                  'average',
                  'subTotal',
                  'total',
                  'totalAll'
                ],
                'cellRender': {
                  'name': '$vxeMoney',
                  'props': {
                    'clearable': false,
                    'placeholder': '请输入专项债券'
                  }
                },
                'extendProps': {},
                'field': 'f00122',
                'required': false,
                'sortable': false,
                'title': '专项债券',
                'visible': true,
                'width': 180,
                'filters': [
                  {
                    'data': {
                      'type': 'has',
                      'isCase': false,
                      'value': '',
                      'dataType': 'float',
                      'valuegt': ''
                    }
                  }
                ],
                'filterRender': {
                  'name': 'FilterComplex'
                }
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
            'align': 'left',
            'combinedType': [
              'average',
              'subTotal',
              'total',
              'totalAll'
            ],
            'cellRender': {
              'name': '$vxeMoney',
              'props': {
                'clearable': false
              }
            },
            'extendProps': {},
            'field': 'f0013',
            'required': true,
            'sortable': false,
            'title': '国有资本经营预算资金',
            'visible': true,
            'width': 180,
            'filters': [
              {
                'data': {
                  'type': 'has',
                  'isCase': false,
                  'value': '',
                  'dataType': 'float',
                  'valuegt': ''
                }
              }
            ],
            'filterRender': {
              'name': 'FilterComplex'
            }
          },
          {
            'align': 'left',
            'combinedType': [
              'average',
              'subTotal',
              'total',
              'totalAll'
            ],
            'cellRender': {
              'name': '$vxeMoney',
              'props': {
                'clearable': false
              }
            },
            'extendProps': {},
            'field': 'f0014',
            'required': true,
            'sortable': false,
            'title': '社会保险基金预算资金',
            'visible': true,
            'width': 180,
            'filters': [
              {
                'data': {
                  'type': 'has',
                  'isCase': false,
                  'value': '',
                  'dataType': 'float',
                  'valuegt': ''
                }
              }
            ],
            'filterRender': {
              'name': 'FilterComplex'
            }
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
        'align': 'left',
        'combinedType': [
          'average',
          'subTotal',
          'total',
          'totalAll'
        ],
        'cellRender': {
          'name': '$vxeMoney',
          'props': {
            'clearable': false
          }
        },
        'extendProps': {},
        'field': 'f002',
        'required': true,
        'sortable': false,
        'title': '财政专户管理资金',
        'visible': true,
        'width': 180
      },
      {
        'align': 'left',
        'children': [
          {
            'align': 'left',
            'combinedType': [
              'average',
              'subTotal',
              'total',
              'totalAll'
            ],
            'cellRender': {
              'name': '$vxeMoney',
              'props': {
                'clearable': false
              }
            },
            'extendProps': {},
            'field': 'f0031',
            'required': true,
            'sortable': false,
            'title': '事业收入资金',
            'visible': true,
            'width': 180,
            'filters': [
              {
                'data': {
                  'type': 'has',
                  'isCase': false,
                  'value': '',
                  'dataType': 'float',
                  'valuegt': ''
                }
              }
            ],
            'filterRender': {
              'name': 'FilterComplex'
            }
          },
          {
            'align': 'left',
            'combinedType': [
              'average',
              'subTotal',
              'total',
              'totalAll'
            ],
            'cellRender': {
              'name': '$vxeMoney',
              'props': {
                'clearable': false
              }
            },
            'extendProps': {},
            'field': 'f0032',
            'required': true,
            'sortable': false,
            'title': '上级补助收入资金',
            'visible': true,
            'width': 180,
            'filters': [
              {
                'data': {
                  'type': 'has',
                  'isCase': false,
                  'value': '',
                  'dataType': 'float',
                  'valuegt': ''
                }
              }
            ],
            'filterRender': {
              'name': 'FilterComplex'
            }
          },
          {
            'align': 'left',
            'combinedType': [
              'average',
              'subTotal',
              'total',
              'totalAll'
            ],
            'cellRender': {
              'name': '$vxeMoney',
              'props': {
                'clearable': false
              }
            },
            'extendProps': {},
            'field': 'f0033',
            'required': true,
            'sortable': false,
            'title': '附属单位上缴收入资金',
            'visible': true,
            'width': 180,
            'filters': [
              {
                'data': {
                  'type': 'has',
                  'isCase': false,
                  'value': '',
                  'dataType': 'float',
                  'valuegt': ''
                }
              }
            ],
            'filterRender': {
              'name': 'FilterComplex'
            }
          },
          {
            'align': 'left',
            'combinedType': [
              'average',
              'subTotal',
              'total',
              'totalAll'
            ],
            'cellRender': {
              'name': '$vxeMoney',
              'props': {
                'clearable': false
              }
            },
            'extendProps': {},
            'field': 'f0034',
            'required': true,
            'sortable': false,
            'title': '事业单位经营收入资金',
            'visible': true,
            'width': 180,
            'filters': [
              {
                'data': {
                  'type': 'has',
                  'isCase': false,
                  'value': '',
                  'dataType': 'float',
                  'valuegt': ''
                }
              }
            ],
            'filterRender': {
              'name': 'FilterComplex'
            }
          },
          {
            'align': 'left',
            'combinedType': [
              'average',
              'subTotal',
              'total',
              'totalAll'
            ],
            'cellRender': {
              'name': '$vxeMoney',
              'props': {
                'clearable': false,
                'placeholder': '请输入其他资金收入'
              }
            },
            'extendProps': {},
            'field': 'f0039',
            'required': true,
            'sortable': false,
            'title': '其他收入资金',
            'visible': true,
            'width': 180,
            'filters': [
              {
                'data': {
                  'type': 'has',
                  'isCase': false,
                  'value': '',
                  'dataType': 'float',
                  'valuegt': ''
                }
              }
            ],
            'filterRender': {
              'name': 'FilterComplex'
            }
          }
        ],
        'extendProps': {},
        'required': false,
        'sortable': false,
        'title': '单位资金',
        'visible': true,
        'width': 180
      }
    ],
    editTableCols: [
      {
        title: '预算级次',
        field: 'budgetLevel',
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
            disabled: true,
            queryparams: {
              eleCode: 'BUDGETLEVEL',
              sxspecroleguid: '3250FC3332E1421DA1B0388AA0D34BDC'
            }
          }
        }
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
              eleCode: 'EXPFUNC',
              sxspecroleguid: '3250FC3332E1421DA1B0388AA0D34BDC'
            }
          }
        }
      },
      {
        title: '部门预算经济分类',
        field: 'depBgtEco',
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
              eleCode: 'DEPBGTECO',
              sxspecroleguid: '3250FC3332E1421DA1B0388AA0D34BDC'
            }
          }
        }
      },
      {
        title: '政府支出经济分类',
        field: 'govBgtEco',
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
              eleCode: 'GOVBGTECO',
              sxspecroleguid: '3250FC3332E1421DA1B0388AA0D34BDC'
            }
          }
        }
      },
      {
        'align': 'left',
        'editRender': {
          'name': '$vxeTree',
          'props': {
            'clearable': false,
            'config': {
              'axiosConfig': {
                'method': 'post',
                'statusField': 'code',
                'successCode': '100000',
                'url': 'bisConfig/config/common/queryTreeAssistData'
              },
              'disabled': false,
              'format': '{code}-{name}',
              'isHump': true,
              'isLazeLoad': false,
              'isleaf': 1,
              'levelno': -1,
              'multiple': false,
              'placeholder': '请选择资金来源',
              'treeProps': {
                'children': 'children',
                'label': 'name',
                'labelFormat': '{code}-{name}',
                'nodeKey': 'id'
              },
              'valueKeys': [
                'code',
                'name',
                'id'
              ]
            },
            'placeholder': '请选择资金来源',
            'queryparams': {
              'queryConditions': '',
              'eleCode': 'FOUNDTYPE'
            }
          }
        },
        'extendProps': {},
        'field': 'foundType',
        'required': true,
        'sortable': false,
        'title': '资金来源',
        'visible': true,
        'width': 180
      },
      {
        'align': 'left',
        'cellRender': {
          'name': '$vxeCalculate',
          'props': {
            'clearable': false,
            'disabled': true
          }
        },
        'combinedType': [
          'average',
          'subTotal',
          'total',
          'totalAll'
        ],
        'extendProps': {},
        'field': 'f2',
        'formula': '{f00111}+{f00112}+{f00113}+{f00114}+{f00121}+{f00122}+{f0013}+{f0014}+{f002}+{f0031}+{f0032}+{f0033}+{f0034}+{f0039}',
        'required': false,
        'sortable': false,
        'title': '预算金额合计',
        'visible': true,
        'width': 180
      },
      {
        'align': 'left',
        'children': [
          {
            'align': 'left',
            'children': [
              {
                'align': 'left',
                'combinedType': [
                  'average',
                  'subTotal',
                  'total',
                  'totalAll'
                ],
                'editRender': {
                  'name': '$vxeMoney',
                  'props': {
                    'clearable': false,
                    'placeholder': '请输入一般公共预算资金'
                  }
                },
                'extendProps': {},
                'field': 'f00111',
                'required': false,
                'sortable': false,
                'title': '一般公共预算资金',
                'visible': true,
                'width': 180,
                'filters': [
                  {
                    'data': {
                      'type': 'has',
                      'isCase': false,
                      'value': '',
                      'dataType': 'float',
                      'valuegt': ''
                    }
                  }
                ],
                'filterRender': {
                  'name': 'FilterComplex'
                }
              },
              {
                'align': 'left',
                'combinedType': [
                  'average',
                  'subTotal',
                  'total',
                  'totalAll'
                ],
                'editRender': {
                  'name': '$vxeMoney',
                  'props': {
                    'clearable': false,
                    'placeholder': '请输入一般债券'
                  }
                },
                'extendProps': {},
                'field': 'f00112',
                'required': false,
                'sortable': false,
                'title': '一般债券',
                'visible': true,
                'width': 180,
                'filters': [
                  {
                    'data': {
                      'type': 'has',
                      'isCase': false,
                      'value': '',
                      'dataType': 'float',
                      'valuegt': ''
                    }
                  }
                ],
                'filterRender': {
                  'name': 'FilterComplex'
                }
              },
              {
                'align': 'left',
                'combinedType': [
                  'average',
                  'subTotal',
                  'total',
                  'totalAll'
                ],
                'editRender': {
                  'name': '$vxeMoney',
                  'props': {
                    'clearable': false,
                    'placeholder': '请输入外国政府和国际组织贷款'
                  }
                },
                'extendProps': {},
                'field': 'f00113',
                'required': false,
                'sortable': false,
                'title': '外国政府和国际组织贷款',
                'visible': true,
                'width': 180,
                'filters': [
                  {
                    'data': {
                      'type': 'has',
                      'isCase': false,
                      'value': '',
                      'dataType': 'float',
                      'valuegt': ''
                    }
                  }
                ],
                'filterRender': {
                  'name': 'FilterComplex'
                }
              },
              {
                'align': 'left',
                'combinedType': [
                  'average',
                  'subTotal',
                  'total',
                  'totalAll'
                ],
                'editRender': {
                  'name': '$vxeMoney',
                  'props': {
                    'clearable': false,
                    'placeholder': '请输入外国政府和国际组织赠款'
                  }
                },
                'extendProps': {},
                'field': 'f00114',
                'required': false,
                'sortable': false,
                'title': '外国政府和国际组织赠款',
                'visible': true,
                'width': 180,
                'filters': [
                  {
                    'data': {
                      'type': 'has',
                      'isCase': false,
                      'value': '',
                      'dataType': 'float',
                      'valuegt': ''
                    }
                  }
                ],
                'filterRender': {
                  'name': 'FilterComplex'
                }
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
                'align': 'left',
                'combinedType': [
                  'average',
                  'subTotal',
                  'total',
                  'totalAll'
                ],
                'editRender': {
                  'name': '$vxeMoney',
                  'props': {
                    'clearable': false,
                    'placeholder': '请输入政府性基金预算资金'
                  }
                },
                'extendProps': {},
                'field': 'f00121',
                'required': false,
                'sortable': false,
                'title': '政府性基金预算资金',
                'visible': true,
                'width': 180,
                'filters': [
                  {
                    'data': {
                      'type': 'has',
                      'isCase': false,
                      'value': '',
                      'dataType': 'float',
                      'valuegt': ''
                    }
                  }
                ],
                'filterRender': {
                  'name': 'FilterComplex'
                }
              },
              {
                'align': 'left',
                'combinedType': [
                  'average',
                  'subTotal',
                  'total',
                  'totalAll'
                ],
                'editRender': {
                  'name': '$vxeMoney',
                  'props': {
                    'clearable': false,
                    'placeholder': '请输入专项债券'
                  }
                },
                'extendProps': {},
                'field': 'f00122',
                'required': false,
                'sortable': false,
                'title': '专项债券',
                'visible': true,
                'width': 180,
                'filters': [
                  {
                    'data': {
                      'type': 'has',
                      'isCase': false,
                      'value': '',
                      'dataType': 'float',
                      'valuegt': ''
                    }
                  }
                ],
                'filterRender': {
                  'name': 'FilterComplex'
                }
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
            'align': 'left',
            'combinedType': [
              'average',
              'subTotal',
              'total',
              'totalAll'
            ],
            'editRender': {
              'name': '$vxeMoney',
              'props': {
                'clearable': false
              }
            },
            'extendProps': {},
            'field': 'f0013',
            'required': true,
            'sortable': false,
            'title': '国有资本经营预算资金',
            'visible': true,
            'width': 180,
            'filters': [
              {
                'data': {
                  'type': 'has',
                  'isCase': false,
                  'value': '',
                  'dataType': 'float',
                  'valuegt': ''
                }
              }
            ],
            'filterRender': {
              'name': 'FilterComplex'
            }
          },
          {
            'align': 'left',
            'combinedType': [
              'average',
              'subTotal',
              'total',
              'totalAll'
            ],
            'editRender': {
              'name': '$vxeMoney',
              'props': {
                'clearable': false
              }
            },
            'extendProps': {},
            'field': 'f0014',
            'required': true,
            'sortable': false,
            'title': '社会保险基金预算资金',
            'visible': true,
            'width': 180,
            'filters': [
              {
                'data': {
                  'type': 'has',
                  'isCase': false,
                  'value': '',
                  'dataType': 'float',
                  'valuegt': ''
                }
              }
            ],
            'filterRender': {
              'name': 'FilterComplex'
            }
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
        'align': 'left',
        'combinedType': [
          'average',
          'subTotal',
          'total',
          'totalAll'
        ],
        'editRender': {
          'name': '$vxeMoney',
          'props': {
            'clearable': false
          }
        },
        'extendProps': {},
        'field': 'f002',
        'required': true,
        'sortable': false,
        'title': '财政专户管理资金',
        'visible': true,
        'width': 180
      },
      {
        'align': 'left',
        'children': [
          {
            'align': 'left',
            'combinedType': [
              'average',
              'subTotal',
              'total',
              'totalAll'
            ],
            'editRender': {
              'name': '$vxeMoney',
              'props': {
                'clearable': false
              }
            },
            'extendProps': {},
            'field': 'f0031',
            'required': true,
            'sortable': false,
            'title': '事业收入资金',
            'visible': true,
            'width': 180,
            'filters': [
              {
                'data': {
                  'type': 'has',
                  'isCase': false,
                  'value': '',
                  'dataType': 'float',
                  'valuegt': ''
                }
              }
            ],
            'filterRender': {
              'name': 'FilterComplex'
            }
          },
          {
            'align': 'left',
            'combinedType': [
              'average',
              'subTotal',
              'total',
              'totalAll'
            ],
            'editRender': {
              'name': '$vxeMoney',
              'props': {
                'clearable': false
              }
            },
            'extendProps': {},
            'field': 'f0032',
            'required': true,
            'sortable': false,
            'title': '上级补助收入资金',
            'visible': true,
            'width': 180,
            'filters': [
              {
                'data': {
                  'type': 'has',
                  'isCase': false,
                  'value': '',
                  'dataType': 'float',
                  'valuegt': ''
                }
              }
            ],
            'filterRender': {
              'name': 'FilterComplex'
            }
          },
          {
            'align': 'left',
            'combinedType': [
              'average',
              'subTotal',
              'total',
              'totalAll'
            ],
            'editRender': {
              'name': '$vxeMoney',
              'props': {
                'clearable': false
              }
            },
            'extendProps': {},
            'field': 'f0033',
            'required': true,
            'sortable': false,
            'title': '附属单位上缴收入资金',
            'visible': true,
            'width': 180,
            'filters': [
              {
                'data': {
                  'type': 'has',
                  'isCase': false,
                  'value': '',
                  'dataType': 'float',
                  'valuegt': ''
                }
              }
            ],
            'filterRender': {
              'name': 'FilterComplex'
            }
          },
          {
            'align': 'left',
            'combinedType': [
              'average',
              'subTotal',
              'total',
              'totalAll'
            ],
            'editRender': {
              'name': '$vxeMoney',
              'props': {
                'clearable': false
              }
            },
            'extendProps': {},
            'field': 'f0034',
            'required': true,
            'sortable': false,
            'title': '事业单位经营收入资金',
            'visible': true,
            'width': 180,
            'filters': [
              {
                'data': {
                  'type': 'has',
                  'isCase': false,
                  'value': '',
                  'dataType': 'float',
                  'valuegt': ''
                }
              }
            ],
            'filterRender': {
              'name': 'FilterComplex'
            }
          },
          {
            'align': 'left',
            'combinedType': [
              'average',
              'subTotal',
              'total',
              'totalAll'
            ],
            'editRender': {
              'name': '$vxeMoney',
              'props': {
                'clearable': false,
                'placeholder': '请输入其他资金收入'
              }
            },
            'extendProps': {},
            'field': 'f0039',
            'required': true,
            'sortable': false,
            'title': '其他收入资金',
            'visible': true,
            'width': 180,
            'filters': [
              {
                'data': {
                  'type': 'has',
                  'isCase': false,
                  'value': '',
                  'dataType': 'float',
                  'valuegt': ''
                }
              }
            ],
            'filterRender': {
              'name': 'FilterComplex'
            }
          }
        ],
        'extendProps': {},
        'required': false,
        'sortable': false,
        'title': '单位资金',
        'visible': true,
        'width': 180
      }
    ],
    formItems: [],
    validateRules: {
      expFunc: [{ required: true, type: 'treeinput', trigger: 'change', message: '请输入支出功能分类科目' }],
      foundType: [{ required: true, type: 'treeinput', trigger: 'change', message: '请选择资金来源' }],
      govBgtEco: [{ required: true, type: 'treeinput', trigger: 'change', message: '政府支出经济分类不能为空' }],
      f2: [
        {
          required: true,
          message: '请输入预算金额',
          trigger: 'change',
          validator(data) {
            return new Promise((resolve, reject) => {
              let value = data.cellValue
              if (value < 0.01) {
                reject(new Error('预算金额合计必须大于0！'))
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
