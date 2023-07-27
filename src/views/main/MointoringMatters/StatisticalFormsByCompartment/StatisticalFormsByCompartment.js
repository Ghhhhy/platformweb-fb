// import store from '@/store/index'
export let proconf = {
  // BsToolBar 状态栏
  toolBarStatusButtons: [
    {
      type: 'button',
      iconName: 'base-all.png',
      iconNameActive: 'base-all-active.png',
      iconUrl: '',
      label: '全部',
      code: '1',
      curValue: '1'
    }
  ],
  // BsToolBar 右侧按钮
  statusRightToolBarButton: {
    '1': [
      // { code: 'Export', label: '导出', status: 'primary' }
    ]
  },
  highQueryConfig: [
    {
      title: '业务年度',
      field: 'fiscalYear',
      'width': 180,
      align: 'left',
      formula: '',
      name: '$vxeSelect',
      itemRender: {
        name: '$vxeSelect',
        options: [
          { value: '2021', label: '2021' },
          { value: '2022', label: '2022' },
          { value: '2023', label: '2023' }
        ],
        props: {
          placeholder: '业务年度'
        }
      }
    },
    {
      title: '区划',
      field: 'mofDivCodeList',
      width: '8',
      align: 'left',
      formula: '',
      name: '$vxeTree',
      itemRender: {
        name: '$vxeTree',
        options: [],
        'props': {
          'config': {
            'treeProps': {
              'nodeKey': 'id',
              'label': 'label',
              'children': 'children'
            },
            'placeholder': '区划',
            'multiple': true,
            'readonly': true,
            'isleaf': false
          }
        }
      }
    },
    {
      title: '预算单位',
      field: 'agencyCodeList',
      width: '8',
      align: 'left',
      formula: '',
      name: '$vxeTree',
      itemRender: {
        name: '$vxeTree',
        options: [],
        'props': {
          'config': {
            'treeProps': {
              'nodeKey': 'id',
              'label': 'label',
              'children': 'children'
            },
            'placeholder': '预算单位',
            'multiple': true,
            'readonly': true,
            'isleaf': false
          }
        }
      }
    }
  ],
  highQueryData: {
    fiscalYear: ''
  },
  PoliciesTableColumns: [
    {
      title: '地区名称',
      field: 'mofDivName',
      width: '150',
      sortable: false,
      fixed: 'left',
      align: 'left'
    },
    {
      title: '整体预警情况',
      field: 'totals',
      sortable: false,
      align: 'left',
      children: [
        {
          title: '累计预警',
          field: 'wholeCount',
          width: '150',
          align: 'center'
        },
        {
          title: '已处理',
          field: 'wholeHandleCount',
          width: '150',
          align: 'center'
        },
        {
          title: '未处理',
          field: 'wholeNoHandleCount',
          width: '150',
          align: 'center'
        }
      ]
    },
    {
      title: '红色预警',
      field: 'red',
      sortable: false,
      align: 'left',
      children: [
        {
          title: '小计',
          field: 'redTotal',
          align: 'center',
          children: [
            {
              title: '累计预警',
              field: 'redWholeCount',
              width: '150',
              align: 'center'
            },
            {
              title: '已处理',
              field: 'redWholeHandleCount',
              width: '150',
              align: 'center'
            },
            {
              title: '未处理',
              field: 'redWholeNoHandleCount',
              width: '150',
              align: 'center'
            }
          ]
        },
        {
          title: '系统级',
          field: 'redSys',
          align: 'center',
          children: [
            {
              title: '累计预警',
              field: 'redSysCount',
              width: '150',
              align: 'center'
            },
            {
              title: '已处理',
              field: 'redSysHandleCount',
              width: '150',
              align: 'center'
            },
            {
              title: '未处理',
              field: 'redSysNoHandleCount',
              width: '150',
              align: 'center'
            }
          ]
        },
        {
          title: '财政级',
          field: 'redFin',
          align: 'center',
          children: [
            {
              title: '累计预警',
              field: 'redFinCount',
              width: '150',
              align: 'center'
            },
            {
              title: '已处理',
              field: 'redFinHandleCount',
              width: '150',
              align: 'center'
            },
            {
              title: '未处理',
              field: 'redFinNoHandleCount',
              width: '150',
              align: 'center'
            }
          ]
        }
      ]
    },
    {
      title: '橙色预警',
      field: 'orange',
      sortable: false,
      align: 'left',
      children: [
        {
          title: '小计',
          field: 'orangeTotal',
          align: 'center',
          children: [
            {
              title: '累计预警',
              field: 'orangeWholeCount',
              width: '150',
              align: 'center'
            },
            {
              title: '已处理',
              field: 'orangeWholeHandleCount',
              width: '150',
              align: 'center'
            },
            {
              title: '未处理',
              field: 'orangeWholeNoHandleCount',
              width: '150',
              align: 'center'
            }
          ]
        },
        {
          title: '系统级',
          field: 'orangeSys',
          align: 'center',
          children: [
            {
              title: '累计预警',
              field: 'orangeSysCount',
              width: '150',
              align: 'center'
            },
            {
              title: '已处理',
              field: 'orangeSysHandleCount',
              width: '150',
              align: 'center'
            },
            {
              title: '未处理',
              field: 'orangeSysNoHandleCount',
              width: '150',
              align: 'center'
            }
          ]
        },
        {
          title: '财政级',
          field: 'orangeFin',
          align: 'center',
          children: [
            {
              title: '累计预警',
              field: 'orangeFinCount',
              width: '150',
              align: 'center'
            },
            {
              title: '已处理',
              field: 'orangeFinHandleCount',
              width: '150',
              align: 'center'
            },
            {
              title: '未处理',
              field: 'orangeFinNoHandleCount',
              width: '150',
              align: 'center'
            }
          ]
        }
      ]
    },
    {
      title: '黄色预警',
      field: 'yellow',
      sortable: false,
      align: 'left',
      children: [
        {
          title: '小计',
          field: 'yellowTitle',
          align: 'center',
          children: [
            {
              title: '累计预警',
              field: 'yellowWholeCount',
              width: '150',
              align: 'center'
            },
            {
              title: '已处理',
              field: 'yellowWholeHandleCount',
              width: '150',
              align: 'center'
            },
            {
              title: '未处理',
              field: 'yellowWholeNoHandleCount',
              width: '150',
              align: 'center'
            }
          ]
        },
        {
          title: '系统级',
          field: 'yellowSys',
          align: 'center',
          children: [
            {
              title: '累计预警',
              field: 'yellowSysCount',
              width: '150',
              align: 'center'
            },
            {
              title: '已处理',
              field: 'yellowSysHandleCount',
              width: '150',
              align: 'center'
            },
            {
              title: '未处理',
              field: 'yellowSysNoHandleCount',
              width: '150',
              align: 'center'
            }
          ]
        },
        {
          title: '财政级',
          field: 'yellowFin',
          align: 'center',
          children: [
            {
              title: '累计预警',
              field: 'yellowFinCount',
              width: '150',
              align: 'center'
            },
            {
              title: '已处理',
              field: 'yellowFinHandleCount',
              width: '150',
              align: 'center'
            },
            {
              title: '未处理',
              field: 'yellowFinNoHandleCount',
              width: '150',
              align: 'center'
            }
          ]
        }
      ]
    },
    {
      title: '蓝色预警',
      field: 'blue',
      sortable: false,
      align: 'left',
      children: [
        {
          title: '小计',
          field: 'blueTotal',
          align: 'center',
          children: [
            {
              title: '累计预警',
              field: 'blueWholeCount',
              width: '150',
              align: 'center'
            },
            {
              title: '已处理',
              field: 'blueWholeHandleCount',
              width: '150',
              align: 'center'
            },
            {
              title: '未处理',
              field: 'blueWholeNoHandleCount',
              width: '150',
              align: 'center'
            }
          ]
        },
        {
          title: '系统级',
          field: 'blueSys',
          align: 'center',
          children: [
            {
              title: '累计预警',
              field: 'blueSysCount',
              width: '150',
              align: 'center'
            },
            {
              title: '已处理',
              field: 'blueSysHandleCount',
              width: '150',
              align: 'center'
            },
            {
              title: '未处理',
              field: 'blueSysNoHandleCount',
              width: '150',
              align: 'center'
            }
          ]
        },
        {
          title: '财政级',
          field: 'blueFin',
          align: 'center',
          children: [
            {
              title: '累计预警',
              field: 'blueFinCount',
              width: '150',
              align: 'center'
            },
            {
              title: '已处理',
              field: 'blueFinHandleCount',
              width: '150',
              align: 'center'
            },
            {
              title: '未处理',
              field: 'blueFinNoHandleCount',
              width: '150',
              align: 'center'
            }
          ]
        }
      ]
    },
    {
      title: '责令改正事项',
      field: 'thing',
      sortable: false,
      align: 'left',
      children: [
        {
          title: '次数',
          field: 'orderCorrectionCount',
          width: '150',
          align: 'center'
        },
        {
          title: '涉及金额',
          field: 'orderCorrectionAmount ',
          width: '150',
          align: 'center'
        },
        {
          title: '已改正事项次数',
          field: 'correctedCount',
          width: '150',
          align: 'center'
        },
        {
          title: '已改正事项涉及金额',
          field: 'correctedAmount',
          width: '150',
          align: 'center'
        }
      ]
    }
  ],
  PoliciesTableColumnsWithRate: [
    {
      title: '地区名称',
      field: 'mofDivName',
      width: '150',
      sortable: false,
      fixed: 'left',
      align: 'left'
    },
    {
      title: '整体预警情况',
      field: 'totals',
      sortable: false,
      align: 'left',
      children: [
        {
          title: '累计预警',
          field: 'wholeCount',
          width: '150',
          align: 'center'
        },
        {
          title: '已处理',
          field: 'wholeHandleCount',
          width: '150',
          align: 'center'
        },
        {
          title: '未处理',
          field: 'wholeNoHandleCount',
          width: '150',
          align: 'center'
        },
        {
          title: '处理率',
          field: 'wholeHandleCountRate',
          formula: '{wholeCount}-0==0?0:{wholeHandleCount}/{wholeCount}*100',
          cellRender: {
            name: '$vxeRatio'
          },
          width: '150',
          align: 'center'
        }
      ]
    },
    {
      title: '红色预警',
      field: 'red',
      sortable: false,
      align: 'left',
      children: [
        {
          title: '小计',
          field: 'redTotal',
          align: 'center',
          children: [
            {
              title: '累计预警',
              field: 'redWholeCount',
              width: '150',
              align: 'center'
            },
            {
              title: '已处理',
              field: 'redWholeHandleCount',
              width: '150',
              align: 'center'
            },
            {
              title: '未处理',
              field: 'redWholeNoHandleCount',
              width: '150',
              align: 'center'
            },
            {
              title: '处理率',
              field: 'redWholeHandleCountRate',
              formula: '{redWholeCount}-0==0?0:{redWholeHandleCount}/{redWholeCount}*100',
              cellRender: {
                name: '$vxeRatio'
              },
              width: '150',
              align: 'center'
            }
          ]
        },
        {
          title: '系统级',
          field: 'redSys',
          align: 'center',
          children: [
            {
              title: '累计预警',
              field: 'redSysCount',
              width: '150',
              align: 'center'
            },
            {
              title: '已处理',
              field: 'redSysHandleCount',
              width: '150',
              align: 'center'
            },
            {
              title: '未处理',
              field: 'redSysNoHandleCount',
              width: '150',
              align: 'center'
            },
            {
              title: '处理率',
              field: 'redSysHandleCountRate',
              formula: '{redSysCount}-0==0?0:{redSysHandleCount}/{redSysCount}*100',
              cellRender: {
                name: '$vxeRatio'
              },
              width: '150',
              align: 'center'
            }
          ]
        },
        {
          title: '财政级',
          field: 'redFin',
          align: 'center',
          children: [
            {
              title: '累计预警',
              field: 'redFinCount',
              width: '150',
              align: 'center'
            },
            {
              title: '已处理',
              field: 'redFinHandleCount',
              width: '150',
              align: 'center'
            },
            {
              title: '未处理',
              field: 'redFinNoHandleCount',
              width: '150',
              align: 'center'
            },
            {
              title: '处理率',
              field: 'redFinHandleCountRate',
              formula: '{redFinCount}-0==0?0:{redFinHandleCount}/{redFinCount}*100',
              cellRender: {
                name: '$vxeRatio'
              },
              width: '150',
              align: 'center'
            }
          ]
        }
      ]
    },
    {
      title: '橙色预警',
      field: 'orange',
      sortable: false,
      align: 'left',
      children: [
        {
          title: '小计',
          field: 'orangeTotal',
          align: 'center',
          children: [
            {
              title: '累计预警',
              field: 'orangeWholeCount',
              width: '150',
              align: 'center'
            },
            {
              title: '已处理',
              field: 'orangeWholeHandleCount',
              width: '150',
              align: 'center'
            },
            {
              title: '未处理',
              field: 'orangeWholeNoHandleCount',
              width: '150',
              align: 'center'
            },
            {
              title: '处理率',
              field: 'orangeWholeHandleCountRate',
              formula: '{orangeWholeCount}-0==0?0:{orangeWholeHandleCount}/{orangeWholeCount}*100',
              cellRender: {
                name: '$vxeRatio'
              },
              width: '150',
              align: 'center'
            }
          ]
        },
        {
          title: '系统级',
          field: 'orangeSys',
          align: 'center',
          children: [
            {
              title: '累计预警',
              field: 'orangeSysCount',
              width: '150',
              align: 'center'
            },
            {
              title: '已处理',
              field: 'orangeSysHandleCount',
              width: '150',
              align: 'center'
            },
            {
              title: '未处理',
              field: 'orangeSysNoHandleCount',
              width: '150',
              align: 'center'
            },
            {
              title: '处理率',
              field: 'orangeFinHandleCountRate',
              formula: '{orangeSysCount}-0==0?0:{orangeSysHandleCount}/{orangeSysCount}*100',
              cellRender: {
                name: '$vxeRatio'
              },
              width: '150',
              align: 'center'
            }
          ]
        },
        {
          title: '财政级',
          field: 'orangeFin',
          align: 'center',
          children: [
            {
              title: '累计预警',
              field: 'orangeFinCount',
              width: '150',
              align: 'center'
            },
            {
              title: '已处理',
              field: 'orangeFinHandleCount',
              width: '150',
              align: 'center'
            },
            {
              title: '未处理',
              field: 'orangeFinNoHandleCount',
              width: '150',
              align: 'center'
            },
            {
              title: '处理率',
              field: 'orangeFinHandleCountRate',
              formula: '{orangeFinCount}-0==0?0:{orangeFinHandleCount}/{orangeFinCount}*100',
              cellRender: {
                name: '$vxeRatio'
              },
              width: '150',
              align: 'center'
            }
          ]
        }
      ]
    },
    {
      title: '黄色预警',
      field: 'yellow',
      sortable: false,
      align: 'left',
      children: [
        {
          title: '小计',
          field: 'yellowTotal',
          align: 'center',
          children: [
            {
              title: '累计预警',
              field: 'yellowWholeCount',
              width: '150',
              align: 'center'
            },
            {
              title: '已处理',
              field: 'yellowWholeHandleCount',
              width: '150',
              align: 'center'
            },
            {
              title: '未处理',
              field: 'yellowWholeNoHandleCount',
              width: '150',
              align: 'center'
            },
            {
              title: '处理率',
              field: 'yellowWholeHandleCountRate',
              formula: '{yellowWholeCount}-0==0?0:{yellowWholeHandleCount}/{yellowWholeCount}*100',
              cellRender: {
                name: '$vxeRatio'
              },
              width: '150',
              align: 'center'
            }
          ]
        },
        {
          title: '系统级',
          field: 'yellowSys',
          align: 'center',
          children: [
            {
              title: '累计预警',
              field: 'yellowSysCount',
              width: '150',
              align: 'center'
            },
            {
              title: '已处理',
              field: 'yellowSysHandleCount',
              width: '150',
              align: 'center'
            },
            {
              title: '未处理',
              field: 'yellowSysNoHandleCount',
              width: '150',
              align: 'center'
            },
            {
              title: '处理率',
              field: 'yellowSysHandleCountRate',
              formula: '{yellowSysCount}-0==0?0:{yellowSysHandleCount}/{yellowSysCount}*100',
              cellRender: {
                name: '$vxeRatio'
              },
              width: '150',
              align: 'center'
            }
          ]
        },
        {
          title: '财政级',
          field: 'yellowFin',
          align: 'center',
          children: [
            {
              title: '累计预警',
              field: 'yellowFinCount',
              width: '150',
              align: 'center'
            },
            {
              title: '已处理',
              field: 'yellowFinHandleCount',
              width: '150',
              align: 'center'
            },
            {
              title: '未处理',
              field: 'yellowFinNoHandleCount',
              width: '150',
              align: 'center'
            },
            {
              title: '处理率',
              field: 'yellowFinHandleCountRate',
              formula: '{yellowFinCount}-0==0?0:{yellowFinHandleCount}/{yellowFinCount}*100',
              cellRender: {
                name: '$vxeRatio'
              },
              width: '150',
              align: 'center'
            }
          ]
        }
      ]
    },
    {
      title: '蓝色预警',
      field: 'blue',
      sortable: false,
      align: 'left',
      children: [
        {
          title: '小计',
          field: 'blueTotal',
          align: 'center',
          children: [
            {
              title: '累计预警',
              field: 'blueWholeCount',
              width: '150',
              align: 'center'
            },
            {
              title: '已处理',
              field: 'blueWholeHandleCount',
              width: '150',
              align: 'center'
            },
            {
              title: '未处理',
              field: 'blueWholeNoHandleCount',
              width: '150',
              align: 'center'
            },
            {
              title: '处理率',
              field: 'blueSysHandleCountRate',
              formula: '{blueWholeCount}-0==0?0:{blueWholeHandleCount}/{blueWholeCount}*100',
              cellRender: {
                name: '$vxeRatio'
              },
              width: '150',
              align: 'center'
            }
          ]
        },
        {
          title: '系统级',
          field: 'blueSys',
          align: 'center',
          children: [
            {
              title: '累计预警',
              field: 'blueSysCount',
              width: '150',
              align: 'center'
            },
            {
              title: '已处理',
              field: 'blueSysHandleCount',
              width: '150',
              align: 'center'
            },
            {
              title: '未处理',
              field: 'blueSysNoHandleCount',
              width: '150',
              align: 'center'
            },
            {
              title: '处理率',
              field: 'blueSysHandleCountRate',
              formula: '{blueSysCount}-0==0?0:{blueSysHandleCount}/{blueSysCount}*100',
              cellRender: {
                name: '$vxeRatio'
              },
              width: '150',
              align: 'center'
            }
          ]
        },
        {
          title: '财政级',
          field: 'blueFin',
          align: 'center',
          children: [
            {
              title: '累计预警',
              field: 'blueFinCount',
              width: '150',
              align: 'center'
            },
            {
              title: '已处理',
              field: 'blueFinHandleCount',
              width: '150',
              align: 'center'
            },
            {
              title: '未处理',
              field: 'blueFinNoHandleCount',
              width: '150',
              align: 'center'
            },
            {
              title: '处理率',
              field: 'blueFinHandleCountRate',
              width: '150',
              formula: '{blueFinCount}-0==0?0:{blueFinHandleCount}/{blueFinCount}*100',
              cellRender: {
                name: '$vxeRatio'
              },
              align: 'center'
            }
          ]
        }
      ]
    },
    {
      title: '监控问询情况',
      field: 'thing',
      sortable: false,
      align: 'left',
      children: [
        {
          title: '累计问询单',
          field: 'correctedCount',
          width: '150',
          align: 'center'
        },
        {
          title: '涉及金额',
          field: 'correctedAmount',
          width: '150',
          align: 'center'
        },
        {
          title: '已处理',
          field: 'orderCorrectionCount',
          width: '150',
          align: 'center'
        },
        {
          title: '已处理涉及金额',
          field: 'orderCorrectionAmount',
          width: '150',
          align: 'center'
        }
      ]
    }
  ],

  // table 操作按钮
  gloableOptionRow: {
    renderDefault(h, cellRender, params, context) {
      let self = context.$grid.$parent
      let { row, column } = params
      // const main = self.$parent.$parent.$parent.$parent
      // let status = main._data.toolBarStatusSelect.curValue
      return [
        <el-tooltip content="新增" placement="top" effect="light">
          <a class="gloable-option-row-add gloable-option-row  fn-inline" onClick={() => self.onOptionRowClick({ row, column, optionType: 'add' })}>新增</a>
        </el-tooltip>,
        <el-tooltip content="附件" placement="top" effect="light">
          <a class="gloable-option-row-attachment gloable-option-row  fn-inline" onClick={() => self.onOptionRowClick({ row, column, optionType: 'attachment' })}>附件</a>,
        </el-tooltip>
      ]
    }
  }
}
