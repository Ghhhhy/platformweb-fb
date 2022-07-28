export default {
  '9163010': {
    tableCols: [],
    editTableCols: [
      {
        title: '预算单位',
        field: 'agency',
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
              eleCode: 'AGENCY',
              sxspecroleguid: '3250FC3332E1421DA1B0388AA0D34BDC'
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
        minWidth: 180,
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
              eleCode: 'GOVBGTECO',
              sxspecroleguid: '3250FC3332E1421DA1B0388AA0D34BDC'
            }
          }
        }
      },
      {
        title: '是否政府采购',
        field: 'bgtGovpurFlag',
        width: 200,
        align: 'left',
        editRender: {
          name: '$vxeSelect',
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
        field: 'buyAmt',
        width: 180,
        editRender: {
          name: '$vxeMoney', props: { type: 'float', min: 0 }
        },
        align: 'right',
        combinedType: ['average', 'total']
      },
      // {
      //   title: '合计',
      //   field: 'f2',
      //   width: 180,
      //   align: 'right',
      //   formula: '{f0001}+{f00010002}+{f00020001}+{f00020002}+{f00020003}+{f00020004}+{f00030001}+{f00030002}+{f00030003}+{f00030004}+{f000400010002}+{f000400010001}+{f000400010003}+{f00040002}+{f0005}+{f0006}+{f0007}+{f0008}+{f00090001}+{f00090002}+{f0010}',
      //   editRender: { name: '$vxeCalculate' },
      //   combinedType: ['average', 'total']
      // },
      // {
      //   title: '公共预算拨款',
      //   width: 180,
      //   children: [
      //     {
      //       title: '一般公共预算拨款',
      //       field: 'f0001',
      //       width: 180,
      //       editRender: { name: '$vxeMoney', props: { type: 'float' } },
      //       align: 'right',
      //       combinedType: ['average', 'total']
      //     },
      //     {
      //       title: '非税收入',
      //       field: 'f00010002',
      //       width: 180,
      //       editRender: { name: '$vxeMoney', props: { type: 'float' } },
      //       align: 'right',
      //       combinedType: ['average', 'total']
      //     }
      //   ]
      // },
      // {
      //   title: '专项资金项目',
      //   field: 'f0002',
      //   width: 180,
      //   children: [
      //     {
      //       title: '专项资金项目（省级）',
      //       field: 'f00020001',
      //       width: 220,
      //       editRender: { name: '$vxeMoney', props: { type: 'float', disabled: true } },
      //       align: 'right',
      //       combinedType: ['average', 'total']
      //     },
      //     {
      //       title: '专项资金项目（中央）',
      //       field: 'f00020002',
      //       width: 220,
      //       editRender: { name: '$vxeMoney', props: { type: 'float', disabled: true } },
      //       align: 'right',
      //       combinedType: ['average', 'total']
      //     },
      //     {
      //       title: '专项资金项目（市级）',
      //       field: 'f00020003',
      //       width: 180,
      //       editRender: { name: '$vxeMoney', props: { type: 'float', disabled: true } },
      //       align: 'right',
      //       combinedType: ['average', 'total']
      //     },
      //     {
      //       title: '专项资金项目（县级）',
      //       field: 'f00020004',
      //       width: 180,
      //       editRender: { name: '$vxeMoney', props: { type: 'float', disabled: true } },
      //       align: 'right',
      //       combinedType: ['average', 'total']
      //     }
      //   ]
      // },
      // {
      //   title: '政府性基金拨款',
      //   field: 'f0003',
      //   width: 180,
      //   children: [
      //     {
      //       title: '政府性基金拨款（省级）',
      //       field: 'f00030001',
      //       width: 220,
      //       editRender: { name: '$vxeMoney', props: { type: 'float' } },
      //       align: 'right',
      //       combinedType: ['average', 'total']
      //     },
      //     {
      //       title: '政府性基金拨款（中央）',
      //       field: 'f00030002',
      //       width: 220,
      //       editRender: { name: '$vxeMoney', props: { type: 'float' } },
      //       align: 'right',
      //       combinedType: ['average', 'total']
      //     },
      //     {
      //       title: '政府性基金拨款（市级）',
      //       field: 'f00030003',
      //       width: 180,
      //       editRender: { name: '$vxeMoney', props: { type: 'float' } },
      //       align: 'right',
      //       combinedType: ['average', 'total']
      //     },
      //     {
      //       title: '政府性基金拨款（县级）',
      //       field: 'f00030004',
      //       width: 180,
      //       editRender: { name: '$vxeMoney', props: { type: 'float' } },
      //       align: 'right',
      //       combinedType: ['average', 'total']
      //     }
      //   ]
      // },
      // {
      //   title: '国有资本经营预算资金',
      //   field: 'f0010',
      //   width: 180,
      //   editRender: { name: '$vxeMoney', props: { type: 'float' } },
      //   align: 'right',
      //   combinedType: ['average', 'total']
      // },
      // {
      //   title: '事业收入',
      //   field: 'f0004',
      //   width: 180,
      //   children: [
      //     {
      //       title: '纳入财政专户管理的收费',
      //       field: 'f00040001',
      //       width: 180,
      //       children: [
      //         {
      //           title: '教育收费',
      //           field: 'f000400010001',
      //           width: 180,
      //           editRender: { name: '$vxeMoney', props: { type: 'float', disabled: true } },
      //           align: 'right',
      //           combinedType: ['average', 'total']
      //         },
      //         {
      //           title: '医疗收费',
      //           field: 'f000400010002',
      //           width: 180,
      //           editRender: { name: '$vxeMoney', props: { type: 'float', disabled: true } },
      //           align: 'right',
      //           combinedType: ['average', 'total']
      //         },
      //         {
      //           title: '非税成本反还',
      //           field: 'f000400010003',
      //           width: 180,
      //           editRender: { name: '$vxeMoney', props: { type: 'float', disabled: true } },
      //           align: 'right',
      //           combinedType: ['average', 'total']
      //         }
      //       ]
      //     },
      //     {
      //       title: '其他事业收入',
      //       field: 'f00040002',
      //       width: 180,
      //       editRender: { name: '$vxeMoney', props: { type: 'float', disabled: true } },
      //       align: 'right',
      //       combinedType: ['average', 'total']
      //     }
      //   ]
      // },
      // {
      //   title: '实户资金余额',
      //   field: 'f0005',
      //   width: 180,
      //   editRender: { name: '$vxeMoney', props: { type: 'float', disabled: true } },
      //   align: 'right',
      //   combinedType: ['average', 'total']
      // },
      // {
      //   title: '事业单位经营收入',
      //   field: 'f0006',
      //   width: 180,
      //   editRender: { name: '$vxeMoney', props: { type: 'float', disabled: true } },
      //   align: 'right',
      //   combinedType: ['average', 'total']
      // },
      // {
      //   title: '附属单位上缴收入',
      //   field: 'f0007',
      //   width: 180,
      //   editRender: { name: '$vxeMoney', props: { type: 'float', disabled: true } },
      //   align: 'right',
      //   combinedType: ['average', 'total']
      // },
      // {
      //   title: '其他自有资金',
      //   field: 'f0008',
      //   width: 180,
      //   editRender: { name: '$vxeMoney', props: { type: 'float', disabled: true } },
      //   align: 'right',
      //   combinedType: ['average', 'total']
      // },
      // {
      //   title: '上年结转',
      //   field: 'f0009',
      //   width: 180,
      //   children: [
      //     {
      //       title: '上年公共预算结转',
      //       field: 'f00090001',
      //       width: 180,
      //       editRender: { name: '$vxeMoney', props: { type: 'float' } },
      //       align: 'right',
      //       combinedType: ['average', 'total']
      //     },
      //     {
      //       title: '上年基金预算结转',
      //       field: 'f00090002',
      //       width: 180,
      //       editRender: { name: '$vxeMoney', props: { type: 'float' } },
      //       align: 'right',
      //       combinedType: ['average', 'total']
      //     }
      //   ]
      // },
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
    validateRules: {
      govBuyDes: [{ required: true, type: 'string', trigger: 'change', message: '请输入购买服务内容' }],
      buyNo: [{ required: true, type: 'integer', trigger: 'change', message: '请输入购买数量' }],
      buyAmt: [{ required: true, type: 'float', trigger: 'change', message: '请输入购买金额' }],
      fundsource: [{ required: true, type: 'treeinput', trigger: 'change', message: '请输入预算资金来源' }],
      remark: [{ type: 'string', max: 200, min: 0, trigger: 'change', message: '备注长度需在0-200之间' }],
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
