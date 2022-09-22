// 800022_reduce 政府采购预算表
export default {
  '9162010': {
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
        field: 'proCode',
        title: '项目代码',
        align: 'left',
        width: 180
      },
      {
        field: 'proName',
        title: '项目名称',
        align: 'left',
        width: 180
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
        width: 200,
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
        title: '政府采购品目',
        field: 'purClass',
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
            disabled: false,
            queryparams: {
              eleCode: 'PURITEM',
              sxspecroleguid: '3250FC3332E1421DA1B0388AA0D34BDC'
            }
          }
        }
      },
      {
        title: '政府采购方式',
        field: 'purmet',
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
              eleCode: 'PURMET',
              sxspecroleguid: '3250FC3332E1421DA1B0388AA0D34BDC'
            }
          }
        }
      },
      {
        title: '采购组织形式',
        field: 'purorgform',
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
              eleCode: 'PURORGFORM',
              sxspecroleguid: '3250FC3332E1421DA1B0388AA0D34BDC'
            }
          }
        }
      },
      // {
      //   title: '规格型号',
      //   field: 'purorgform',
      //   width: 180,
      //   align: 'left',
      //   cellRender: { name: '$vxeInput' }
      // },
      {
        title: '计量单位',
        field: 'measmtUnit',
        width: 180,
        cellRender: {
          name: '$vxeSelect',
          options: [
            { value: '001', label: '辆' },
            { value: '002', label: '亩' },
            { value: '003', label: '台' },
            { value: '004', label: '件' },
            { value: '005', label: '个' },
            { value: '006', label: '平方米' },
            { value: '007', label: '公里' },
            { value: '008', label: '个/吨' },
            { value: '009', label: '本' },
            { value: '010', label: '根' },
            { value: '011', label: '副' },
            { value: '012', label: '架' },
            { value: '013', label: '顶' },
            { value: '014', label: '具' },
            { value: '015', label: '卷' },
            { value: '016', label: '孔/座' },
            { value: '017', label: '块/平方米' },
            { value: '018', label: '立方米' },
            { value: '019', label: '立方米/座' },
            { value: '020', label: '把' },
            { value: '021', label: '门' },
            { value: '022', label: '盘' },
            { value: '023', label: '吨/座' },
            { value: '024', label: '千伏安' },
            { value: '025', label: '扇' },
            { value: '026', label: '双' },
            { value: '027', label: '艘' },
            { value: '028', label: '艘/吨' },
            { value: '029', label: '部' },
            { value: '030', label: '台/蒸吨' },
            { value: '031', label: '套' },
            { value: '032', label: '条' },
            { value: '033', label: '条/公里' },
            { value: '034', label: '条/米' },
            { value: '035', label: '项' },
            { value: '036', label: '延长公里' },
            { value: '037', label: '眼' },
            { value: '038', label: '盏' },
            { value: '039', label: '张' },
            { value: '040', label: '支' },
            { value: '041', label: '只' },
            { value: '042', label: '株' },
            { value: '043', label: '组' },
            { value: '044', label: '座' },
            { value: '045', label: '座（幢）' },
            { value: '046', label: '座/立方米' },
            { value: '047', label: '座/米' },
            { value: '048', label: '座/平方米' },
            { value: '049', label: '座/延长米' },
            { value: '050', label: '端' },
            { value: '051', label: '层' },
            { value: '052', label: '间' },
            { value: '053', label: '批' },
            { value: '060', label: '元/人月' },
            { value: '061', label: '元/人年' },
            { value: '062', label: '元/人' },
            { value: '063', label: '元/辆年' },
            { value: '064', label: '元/平方米月' },
            { value: '065', label: '元/部' },
            { value: '066', label: '元/平方米年' }
          ]
        }
      },
      {
        title: '单价',
        field: 'dj',
        children: [
          {
            title: '原金额',
            field: 'oldPrice',
            minWidth: '140',
            align: 'right',
            combinedType: ['average', 'total']
          },
          {
            title: '调减金额',
            field: 'price',
            minWidth: '140',
            cellRender: { name: '$vxeMoney', props: { type: 'float' } },
            align: 'right',
            combinedType: ['average', 'total']
          }
        ]
      },
      {
        title: '采购数量',
        field: 'cgsl',
        children: [
          {
            title: '原采购数量',
            field: 'oldPurQua',
            minWidth: '140',
            align: 'right',
            combinedType: ['average', 'total']
          },
          {
            title: '调减采购数量',
            field: 'purQua',
            minWidth: '140',
            align: 'right',
            cellRender: { name: '$vxeInput', props: { type: 'integer', min: 0, default: 0 } },
            combinedType: ['average', 'total']
          }
        ]
      },
      {
        title: '预算采购金额',
        field: 'yscgje',
        children: [
          {
            title: '原金额',
            field: 'oldPurAmt',
            minWidth: '140',
            align: 'right',
            combinedType: ['average', 'total']
          },
          {
            title: '调减金额',
            field: 'purAmt',
            minWidth: '140',
            align: 'right',
            combinedType: ['average', 'subTotal', 'total', 'totalAll'],
            formula: '{oldPurQua}*{oldPrice} - ({oldPurQua}-{purQua})*({oldPrice}-{price})',
            cellRender: { name: '$vxeCalculate' }
          }
        ]
      },
      {
        title: '总计',
        field: 'zj',
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
        field: 'purEndTime',
        title: '采购截止时间',
        align: 'left',
        width: 180,
        cellRender: {
          name: '$vxeSelect',
          options: [{
            value: '1',
            label: '1月'
          }, {
            value: '2',
            label: '2月'
          }, {
            value: '3',
            label: '3月'
          }, {
            value: '4',
            label: '4月'
          }, {
            value: '5',
            label: '5月'
          }, {
            value: '6',
            label: '6月'
          }, {
            value: '7',
            label: '7月'
          }, {
            value: '8',
            label: '8月'
          }, {
            value: '9',
            label: '9月'
          }]
        }
      },
      {
        title: '备注',
        field: 'remark',
        width: 180,
        align: 'left',
        cellRender: { name: '$vxeInput', props: { type: 'text' } }
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
        field: 'proCode',
        title: '项目代码',
        align: 'left',
        width: 180
      },
      {
        field: 'proName',
        title: '项目名称',
        align: 'left',
        width: 180
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
        width: 200,
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
        title: '政府采购品目',
        field: 'purClass',
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
            disabled: false,
            queryparams: {
              eleCode: 'PURITEM'
            }
          }
        }
      },
      {
        title: '政府采购方式',
        field: 'purmet',
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
              eleCode: 'PURMET'
            }
          }
        }
      },
      {
        title: '采购组织形式',
        field: 'purorgform',
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
              eleCode: 'PURORGFORM'
            }
          }
        }
      },
      // {
      //   title: '规格型号',
      //   field: 'purorgform',
      //   width: 180,
      //   align: 'left',
      //   editRender: { name: '$vxeInput' }
      // },
      {
        title: '计量单位',
        field: 'measmtUnit',
        width: 180,
        editRender: {
          name: '$vxeSelect',
          options: [
            { value: '001', label: '辆' },
            { value: '002', label: '亩' },
            { value: '003', label: '台' },
            { value: '004', label: '件' },
            { value: '005', label: '个' },
            { value: '006', label: '平方米' },
            { value: '007', label: '公里' },
            { value: '008', label: '个/吨' },
            { value: '009', label: '本' },
            { value: '010', label: '根' },
            { value: '011', label: '副' },
            { value: '012', label: '架' },
            { value: '013', label: '顶' },
            { value: '014', label: '具' },
            { value: '015', label: '卷' },
            { value: '016', label: '孔/座' },
            { value: '017', label: '块/平方米' },
            { value: '018', label: '立方米' },
            { value: '019', label: '立方米/座' },
            { value: '020', label: '把' },
            { value: '021', label: '门' },
            { value: '022', label: '盘' },
            { value: '023', label: '吨/座' },
            { value: '024', label: '千伏安' },
            { value: '025', label: '扇' },
            { value: '026', label: '双' },
            { value: '027', label: '艘' },
            { value: '028', label: '艘/吨' },
            { value: '029', label: '部' },
            { value: '030', label: '台/蒸吨' },
            { value: '031', label: '套' },
            { value: '032', label: '条' },
            { value: '033', label: '条/公里' },
            { value: '034', label: '条/米' },
            { value: '035', label: '项' },
            { value: '036', label: '延长公里' },
            { value: '037', label: '眼' },
            { value: '038', label: '盏' },
            { value: '039', label: '张' },
            { value: '040', label: '支' },
            { value: '041', label: '只' },
            { value: '042', label: '株' },
            { value: '043', label: '组' },
            { value: '044', label: '座' },
            { value: '045', label: '座（幢）' },
            { value: '046', label: '座/立方米' },
            { value: '047', label: '座/米' },
            { value: '048', label: '座/平方米' },
            { value: '049', label: '座/延长米' },
            { value: '050', label: '端' },
            { value: '051', label: '层' },
            { value: '052', label: '间' },
            { value: '053', label: '批' },
            { value: '060', label: '元/人月' },
            { value: '061', label: '元/人年' },
            { value: '062', label: '元/人' },
            { value: '063', label: '元/辆年' },
            { value: '064', label: '元/平方米月' },
            { value: '065', label: '元/部' },
            { value: '066', label: '元/平方米年' }
          ]
        }
      },
      {
        title: '单价',
        field: 'dj',
        children: [
          {
            title: '原金额',
            field: 'oldPrice',
            minWidth: '140',
            align: 'right',
            cellRender: { name: '$vxeMoney' },
            combinedType: ['average', 'total']
          },
          {
            title: '调减金额',
            field: 'price',
            minWidth: '140',
            editRender: { name: '$vxeMoney', props: { } },
            align: 'right',
            combinedType: ['average', 'total']
          }
        ]
      },
      {
        title: '采购数量',
        field: 'cgsl',
        children: [
          {
            title: '原采购数量',
            field: 'oldPurQua',
            minWidth: '140',
            align: 'right',
            combinedType: ['average', 'total']
          },
          {
            title: '调减采购数量',
            field: 'purQua',
            minWidth: '140',
            align: 'right',
            editRender: { name: '$vxeInput', props: { type: 'integer', min: 0, default: 0 } },
            combinedType: ['average', 'total']
          }
        ]
      },
      {
        title: '预算采购金额',
        field: 'yscgje',
        children: [
          {
            title: '原金额',
            field: 'oldPurAmt',
            minWidth: '140',
            align: 'right',
            cellRender: { name: '$vxeMoney' },
            combinedType: ['average', 'total']
          },
          {
            title: '调减金额',
            field: 'purAmt',
            minWidth: '140',
            align: 'right',
            combinedType: ['average', 'subTotal', 'total', 'totalAll'],
            formula: '{oldPurQua}*{oldPrice} - ({oldPurQua}-{purQua})*({oldPrice}-{price})',
            editRender: { name: '$vxeCalculate' }
          }
        ]
      },
      {
        title: '总计',
        field: 'zj',
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
        field: 'purEndTime',
        title: '采购截止时间',
        align: 'left',
        width: 180,
        editRender: {
          name: '$vxeSelect',
          options: [{
            value: '1',
            label: '1月'
          }, {
            value: '2',
            label: '2月'
          }, {
            value: '3',
            label: '3月'
          }, {
            value: '4',
            label: '4月'
          }, {
            value: '5',
            label: '5月'
          }, {
            value: '6',
            label: '6月'
          }, {
            value: '7',
            label: '7月'
          }, {
            value: '8',
            label: '8月'
          }, {
            value: '9',
            label: '9月'
          }]
        }
      },
      {
        title: '备注',
        field: 'remark',
        width: 180,
        align: 'left',
        editRender: { name: '$vxeInput', props: { type: 'text' } }
      }
    ],
    formItems: [],
    validateRules: {},
    extendAttrs: {},
    formData: {}
  }
}
