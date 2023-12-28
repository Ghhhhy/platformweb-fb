import store from '@/store/index'
let proconf = {
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
      // { code: 'detail', label: '查看详情', status: 'primary' }
    ]
  },
  highQueryConfig: [
    // {
    //   title: '业务年度',
    //   field: 'fiscalYear',
    //   width: '8',
    //   align: 'left',
    //   formula: '',
    //   visible: !store.getters.isFuJian,
    //   itemRender: {
    //     name: '$vxeInput',
    //     // options: [
    //     //   // { value: '2020', label: '2020年' },
    //     //   // { value: '2021', label: '2021年' },
    //     //   { value: '2022', label: '2022年' },
    //     //   { value: '2023', label: '2023年' }
    //     // ],
    //     props: {
    //       clearable: true,
    //       type: 'year',
    //       valueFormat: 'yyyy',
    //       placeholder: '业务年度'
    //     }
    //   }
    // },
    {
      title: '处室名称',
      field: 'manageMofDeps',
      visible: !store.getters.isXm,
      width: '8',
      align: 'left',
      name: '$vxeTree',
      itemRender: {
        name: '$vxeTree',
        options: [],
        props: {
          config: {
            valueKeys: ['code', 'name', 'guid'],
            format: '{name}',
            treeProps: {
              labelFormat: '{code}-{name}', // {code}-{name}
              nodeKey: 'guid',
              label: 'label',
              children: 'children'
            },
            placeholder: '处室名称',
            clearable: true,
            multiple: true,
            readonly: false,
            isleaf: true
          }
        }
      }
    },
    {
      title: '资金名称',
      field: 'proCodes',
      width: '8',
      align: 'left',
      name: '$vxeTree',
      itemRender: {
        name: '$vxeTree',
        options: [],
        props: {
          config: {
            valueKeys: ['code', 'name', 'id'],
            format: '{name}',
            treeProps: {
              labelFormat: '{code}-{name}', // {code}-{name}
              nodeKey: 'id',
              label: 'label',
              children: 'children'
            },
            placeholder: '资金名称',
            clearable: true,
            multiple: true,
            readonly: false,
            isleaf: true
          }
        }
      }
    },
    // {
    //   title: '功能科目',
    //   field: 'expFuncName',
    //   width: '8',
    //   align: 'left',
    //   formula: '',
    //   name: '$vxeInput',
    //   itemRender: {
    //     name: '$vxeInput',
    //     props: {
    //       placeholder: '功能科目'
    //     }
    //   }
    // },
    {
      title: '功能科目',
      field: 'expFuncCodes',
      width: '8',
      align: 'left',
      name: '$vxeTree',
      itemRender: {
        name: '$vxeTree',
        options: [],
        props: {
          config: {
            valueKeys: ['code', 'name', 'id'],
            format: '{name}',
            treeProps: {
              labelFormat: '{code}-{name}', // {code}-{name}
              nodeKey: 'id',
              label: 'label',
              children: 'children'
            },
            placeholder: '功能科目',
            clearable: true,
            multiple: true,
            readonly: false,
            isleaf: true
          }
        }
      }
    },
    {
      title: '项目名称',
      field: 'proName',
      width: '8',
      align: 'left',
      formula: '',
      name: '$vxeInput',
      itemRender: {
        name: '$vxeInput',
        props: {
          clearable: true,
          placeholder: '项目名称'
        }
      }
    },
    {
      title: '惠企利民',
      field: 'hqlm',
      width: '8',
      align: 'left',
      formula: '',
      name: '$vxeSelect',
      itemRender: {
        name: '$vxeSelect',
        options: [
          // 福建惠企利民01，02，03
          { value: '', label: '' },
          { value: '01', label: '利民' },
          { value: '02', label: '惠企' },
          { value: '03', label: '惠企利民' },
          { value: '99', label: '其他' }
        ],
        props: {
          clearable: true,
          placeholder: '惠企利民'
        }
      }
    },
    {
      title: '截止日期',
      field: 'endTime',
      width: '8',
      align: 'center',
      formula: '',
      itemRender: {
        name: '$vxeTime',
        props: {
          clearable: true,
          format: 'YYYY-MM-DD', // "当前日期为：YYYY-MM-DD，星期W，为第Q季度，时间为：hh:mm:ss:c"
          type: 'date',
          placeholder: '截止日期'
        }
      }
    }
  ],
  highQueryData: {
    fiscalYear: store.state.userInfo.year,
    speTypeName: '',
    expFuncName: '',
    proName: '',
    hqlm: '',
    endTime: '',
    proCodes: '',
    expFuncCodes: ''
  },
  // 新增弹窗高级查询
  sethighQueryConfig: [
    // {
    //   title: '规则模板编码',
    //   field: 'declareCode',
    //   width: '8',
    //   align: 'left',
    //   formula: '',
    //   name: '$vxeInput',
    //   itemRender: {
    //     name: '$vxeInput',
    //     options: [],
    //     props: {
    //       placeholder: '规则模板编码'
    //     }
    //   }
    // },
    {
      title: '规则模板名称',
      field: 'ruleTemplateName',
      'width': 180,
      align: 'left',
      formula: '',
      name: '$vxeInput',
      itemRender: {
        name: '$vxeInput',
        options: [],
        props: {
          clearable: true,
          placeholder: '规则模板名称'
        }
      }
    }
  ],
  sethighQueryData: {
    declareCode: '',
    ruleTemplateName: ''
  },
  tableConfig: {
    globalConfig: {
      // 全局配置
      seq: true, // 序号列
      useMoneyFilter: true
    }
  },
  PoliciesTableColumns: [
    {
      title: '区划名称',
      align: 'left',
      width: 260,
      field: 'mofDivName',
      fixed: 'left'
    },
    {
      title: '资金名称',
      align: 'left',
      width: 160,
      field: 'speTypeName'
    },
    {
      title: '预算单位',
      align: 'left',
      width: 160,
      field: 'agencyName'
    },
    {
      title: '项目编码',
      align: 'left',
      width: 160,
      field: 'proCode'
    },
    {
      title: '项目名称',
      align: 'left',
      width: 160,
      field: 'proName'
    },
    {
      title: '预算数',
      width: 150,
      align: 'center',
      children: [
        {
          title: '总金额',
          align: 'right',
          cellRender: { name: '$vxeMoney' },
          width: 100,
          field: 'amountYszje',
          formula: '{amountYszyap}+{amountYssnjap}+{amountYssjap}+{amountYsxjap}'
        },
        {
          title: '中央安排',
          align: 'right',
          cellRender: { name: '$vxeMoney' },
          width: 100,
          field: 'amountYszyap'
        },
        {
          title: '省级安排',
          align: 'right',
          cellRender: { name: '$vxeMoney' },
          width: 100,
          field: 'amountYssnjap'
        },
        {
          title: '市级安排',
          align: 'right',
          cellRender: { name: '$vxeMoney' },
          width: 100,
          field: 'amountYssjap'
        },
        {
          title: '县级安排',
          align: 'right',
          cellRender: { name: '$vxeMoney' },
          width: 100,
          field: 'amountYsxjap'
        }
      ]
    },
    {
      title: '支出数',
      width: 150,
      align: 'center',
      children: [
        {
          title: '总金额',
          align: 'right',
          cellRender: { name: '$vxeMoney' },
          width: 100,
          field: 'amountZczje',
          formula: '{amountZczyap}+{amountZcsnjap}+{amountZcsjap}+{amountZcxjap}'
        },
        {
          title: '中央安排',
          align: 'right',
          cellRender: { name: '$vxeMoney' },
          width: 100,
          field: 'amountZczyap'
        },
        {
          title: '省级安排',
          align: 'right',
          cellRender: { name: '$vxeMoney' },
          width: 100,
          field: 'amountZcsnjap'
        },
        {
          title: '市级安排',
          align: 'right',
          cellRender: { name: '$vxeMoney' },
          width: 100,
          field: 'amountZcsjap'
        },
        {
          title: '县级安排',
          align: 'right',
          cellRender: { name: '$vxeMoney' },
          width: 100,
          field: 'amountZcxjap'
        }
      ]
    },
    {
      title: '支出功能科目',
      align: 'left',
      width: 160,
      field: 'expFuncName'
    },
    {
      title: '是否惠企利民',
      align: 'left',
      width: 160,
      field: 'hqlm'
    },
    {
      title: '发放表',
      align: 'left',
      width: 160,
      field: 'ffb',
      formatter({ row }) {
        if (row.ffb) return row.ffb
        if (['惠企', '利民', '惠企利民'].includes(row.hqlm) && !row.ffb) return '详情查看'
        return ''
      }
    },
    {
      title: '是否拨入专户项目',
      align: 'left',
      width: 160,
      field: 'brzhxm'
    }
  ],
  PoliciesTableColumnsCity: [
    {
      title: '区划名称',
      align: 'left',
      width: 160,
      field: 'mofDivName',
      fixed: 'left'
    },
    {
      title: '资金名称',
      align: 'left',
      width: 160,
      field: 'speTypeName'
    },
    {
      title: '预算单位',
      align: 'left',
      width: 160,
      field: 'agencyName'
    },
    {
      title: '项目编码',
      align: 'left',
      width: 160,
      field: 'proCode'
    },
    {
      title: '项目名称',
      align: 'left',
      width: 160,
      field: 'proName'
    },
    {
      title: '预算数',
      width: 150,
      align: 'center',
      children: [
        {
          title: '总金额',
          align: 'right',
          cellRender: { name: '$vxeMoney' },
          width: 100,
          field: 'amountYszje',
          formula: '{amountYszyap}+{amountYssnjap}+{amountYssjap}+{amountYsxjap}'
        },
        {
          title: '中央安排',
          align: 'right',
          cellRender: { name: '$vxeMoney' },
          width: 100,
          field: 'amountYszyap'
        },
        {
          title: '市级安排',
          align: 'right',
          cellRender: { name: '$vxeMoney' },
          width: 100,
          field: 'amountYssnjap'
        },
        {
          title: '区级安排',
          align: 'right',
          cellRender: { name: '$vxeMoney' },
          width: 100,
          field: 'amountYsxjap'
        }
      ]
    },
    {
      title: '支出数',
      width: 150,
      align: 'center',
      children: [
        {
          title: '总金额',
          align: 'right',
          cellRender: { name: '$vxeMoney' },
          width: 100,
          field: 'amountZczje',
          formula: '{amountZczyap}+{amountZcsnjap}+{amountZcsjap}+{amountZcxjap}'
        },
        {
          title: '中央安排',
          align: 'right',
          cellRender: { name: '$vxeMoney' },
          width: 100,
          field: 'amountZczyap'
        },
        {
          title: '市级安排',
          align: 'right',
          cellRender: { name: '$vxeMoney' },
          width: 100,
          field: 'amountZcsnjap'
        },
        {
          title: '区级安排',
          align: 'right',
          cellRender: { name: '$vxeMoney' },
          width: 100,
          field: 'amountZcxjap'
        }
      ]
    },
    {
      title: '支出功能科目',
      align: 'left',
      width: 160,
      field: 'expFuncName'
    },
    {
      title: '是否惠企利民',
      align: 'left',
      width: 160,
      field: 'hqlm'
    },
    {
      title: '发放表',
      align: 'left',
      width: 160,
      field: 'ffb'
    },
    {
      title: '是否拨入专户项目',
      align: 'left',
      width: 160,
      field: 'brzhxm'
    }
  ]
}
if (store.getters.isSx) {
  proconf = {
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
        // { code: 'detail', label: '查看详情', status: 'primary' }
      ]
    },
    highQueryConfig: [
      // {
      //   title: '业务年度',
      //   field: 'fiscalYear',
      //   width: '8',
      //   align: 'left',
      //   formula: '',
      //   name: '$vxeSelect',
      //   itemRender: {
      //     name: '$vxeSelect',
      //     options: [
      //       { value: '2022', label: '2022年' },
      //       { value: '2023', label: '2023年' }
      //     ],
      //     defaultValue: store.state?.userInfo?.year,
      //     props: {
      //       placeholder: '业务年度'
      //     }
      //   }
      // },
      {
        title: '资金名称',
        field: 'proCodes',
        width: '8',
        align: 'left',
        name: '$vxeTree',
        itemRender: {
          name: '$vxeTree',
          options: [],
          props: {
            config: {
              valueKeys: ['code', 'name', 'id'],
              format: '{name}',
              treeProps: {
                labelFormat: '{code}-{name}', // {code}-{name}
                nodeKey: 'id',
                label: 'label',
                children: 'children'
              },
              placeholder: '资金名称',
              multiple: true,
              readonly: false,
              isleaf: true
            }
          }
        }
      },
      {
        title: '功能科目',
        field: 'expFuncCodeName',
        width: '8',
        align: 'left',
        formula: '',
        name: '$vxeInput',
        itemRender: {
          name: '$vxeInput',
          props: {
            placeholder: '功能科目'
          }
        }
      },
      {
        title: '项目名称',
        field: 'proName',
        width: '8',
        align: 'left',
        formula: '',
        name: '$vxeInput',
        itemRender: {
          name: '$vxeInput',
          props: {
            placeholder: '项目名称'
          }
        }
      },
      {
        title: '预算单位',
        field: 'agencyCodeName',
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
              'multiple': false,
              'readonly': true,
              'isleaf': true
            }
          }
        }
      },
      {
        title: '惠企利民',
        field: 'hqlm',
        width: '8',
        align: 'left',
        formula: '',
        name: '$vxeSelect',
        itemRender: {
          name: '$vxeSelect',
          options: [

            { value: '其他', label: '其他' },
            { value: '002001', label: '利民' },
            { value: '002002', label: '惠企' },
            { value: '002003', label: '惠企利民' }
          ],
          props: {
            placeholder: '惠企利民'
          }
        }
      },
      {
        title: '截止日期',
        field: 'endTime',
        width: '8',
        align: 'center',
        formula: '',
        itemRender: {
          name: '$vxeTime',
          props: {
            format: 'YYYY-MM-DD', // "当前日期为：YYYY-MM-DD，星期W，为第Q季度，时间为：hh:mm:ss:c"
            type: 'date',
            placeholder: '截止日期'
          }
        }
      }
    ],
    highQueryData: {
      fiscalYear: store.state?.userInfo?.year,
      proCodes: '',
      expFuncCodeName: '',
      agencyCodeName: '',
      proName: '',
      hqlm: '',
      endTime: ''
    },
    // 新增弹窗高级查询
    sethighQueryConfig: [
      // {
      //   title: '规则模板编码',
      //   field: 'declareCode',
      //   width: '8',
      //   align: 'left',
      //   formula: '',
      //   name: '$vxeInput',
      //   itemRender: {
      //     name: '$vxeInput',
      //     options: [],
      //     props: {
      //       placeholder: '规则模板编码'
      //     }
      //   }
      // },
      {
        title: '规则模板名称',
        field: 'ruleTemplateName',
        'width': 180,
        align: 'left',
        formula: '',
        name: '$vxeInput',
        itemRender: {
          name: '$vxeInput',
          options: [],
          props: {
            placeholder: '规则模板名称'
          }
        }
      }
    ],
    sethighQueryData: {
      declareCode: '',
      ruleTemplateName: ''
    },
    tableConfig: {
      globalConfig: {
        // 全局配置
        checkType: 'checkbox',
        seq: true, // 序号列
        useMoneyFilter: true
      }
    },
    PoliciesTableColumns: [
      {
        title: '区划名称',
        align: 'left',
        width: 160,
        field: 'mofDivName',
        fixed: 'left'
      },
      {
        title: '项目编码',
        align: 'left',
        width: 160,
        sortable: true,
        field: 'proCode'
      },
      {
        title: '项目名称',
        align: 'left',
        width: 160,
        sortable: true,
        field: 'proName'
      },
      {
        title: '预算数',
        width: 260,
        align: 'center',
        children: [
          {
            title: '总金额',
            align: 'right',
            sortable: true,
            cellRender: { name: '$vxeMoney' },
            width: 200,
            field: 'amountYszje',
            combinedType: [
              'average',
              'subTotal',
              'total',
              'totalAll'
            ],
            formula: '{amountYszyap}+{amountYssnjap}+{amountYssjap}+{amountYsxjap}'
          },
          {
            title: '中央安排',
            align: 'right',
            sortable: true,
            cellRender: { name: '$vxeMoney' },
            width: 200,
            combinedType: [
              'average',
              'subTotal',
              'total',
              'totalAll'
            ],
            field: 'amountYszyap'
          },
          {
            title: '省级安排',
            align: 'right',
            combinedType: [
              'average',
              'subTotal',
              'total',
              'totalAll'
            ],
            sortable: true,
            cellRender: { name: '$vxeMoney' },
            width: 200,
            field: 'amountYssnjap'
          },
          {
            title: '市级安排',
            align: 'right',
            combinedType: [
              'average',
              'subTotal',
              'total',
              'totalAll'
            ],
            sortable: true,
            cellRender: { name: '$vxeMoney' },
            width: 200,
            field: 'amountYssjap'
          },
          {
            title: '县级安排',
            align: 'right',
            combinedType: [
              'average',
              'subTotal',
              'total',
              'totalAll'
            ],
            sortable: true,
            cellRender: { name: '$vxeMoney' },
            width: 200,
            field: 'amountYsxjap'
          }
        ]
      },
      {
        title: '支出数',
        width: 260,
        align: 'center',
        children: [
          {
            title: '总金额',
            align: 'right',
            combinedType: [
              'average',
              'subTotal',
              'total',
              'totalAll'
            ],
            sortable: true,
            cellRender: { name: '$vxeMoney' },
            width: 200,
            field: 'amountZczje',
            formula: '{amountZczyap}+{amountZcsnjap}+{amountZcsjap}+{amountZcxjap}'
          },
          {
            title: '中央安排',
            align: 'right',
            combinedType: [
              'average',
              'subTotal',
              'total',
              'totalAll'
            ],
            sortable: true,
            cellRender: { name: '$vxeMoney' },
            width: 200,
            field: 'amountZczyap'
          },
          {
            title: '省级安排',
            align: 'right',
            combinedType: [
              'average',
              'subTotal',
              'total',
              'totalAll'
            ],
            sortable: true,
            cellRender: { name: '$vxeMoney' },
            width: 200,
            field: 'amountZcsnjap'
          },
          {
            title: '市级安排',
            align: 'right',
            combinedType: [
              'average',
              'subTotal',
              'total',
              'totalAll'
            ],
            sortable: true,
            cellRender: { name: '$vxeMoney' },
            width: 200,
            field: 'amountZcsjap'
          },
          {
            title: '县级安排',
            align: 'right',
            combinedType: [
              'average',
              'subTotal',
              'total',
              'totalAll'
            ],
            sortable: true,
            cellRender: { name: '$vxeMoney' },
            width: 200,
            field: 'amountZcxjap'
          }
        ]
      },
      {
        title: '资金名称',
        align: 'left',
        sortable: true,
        width: 160,
        field: 'trackProName'
      },
      {
        title: '预算单位',
        align: 'left',
        sortable: true,
        width: 160,
        field: 'agencyName'
      },
      {
        title: '支出功能科目',
        align: 'left',
        width: 160,
        sortable: true,
        field: 'expFuncName'
      },
      {
        title: '是否惠企利民',
        align: 'left',
        width: 160,
        sortable: true,
        field: 'hqlm'
      },
      {
        title: '发放表',
        align: 'left',
        sortable: true,
        width: 160,
        field: 'ffb'
      },
      {
        title: '是否拨入专户项目',
        align: 'left',
        width: 160,
        sortable: true,
        field: 'brzhxm'
      }
    ]
  }
}
export { proconf }
