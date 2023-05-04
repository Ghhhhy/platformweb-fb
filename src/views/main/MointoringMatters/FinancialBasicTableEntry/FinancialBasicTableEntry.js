// import store from '@/store/index'
export let proconf = {
  // BsToolBar 状态栏
  toolBarStatusButtons: [
    {
      type: 'button',
      iconName: 'base-daiban.png',
      iconNameActive: 'base-daiban-active.png',
      iconUrl: '',
      label: '未提交',
      code: '0',
      curValue: '0'
    },
    {
      type: 'button',
      iconName: 'base-yiban.png',
      iconNameActive: 'base-yiban-active.png',
      iconUrl: '',
      label: '已提交',
      code: '1',
      curValue: '1'
    }
  ],
  toolBarStatusButtons1: [
    {
      type: 'button',
      iconName: 'base-daiban.png',
      iconNameActive: 'base-daiban-active.png',
      iconUrl: '',
      label: '未录入',
      code: '-1',
      curValue: '-1'
    },
    {
      type: 'button',
      iconName: 'base-daiban.png',
      iconNameActive: 'base-daiban-active.png',
      iconUrl: '',
      label: '未提交',
      code: '0',
      curValue: '0'
    },
    {
      type: 'button',
      iconName: 'base-yiban.png',
      iconNameActive: 'base-yiban-active.png',
      iconUrl: '',
      label: '已提交',
      code: '1',
      curValue: '1'
    }
  ],
  // BsToolBar 右侧按钮
  statusRightToolBarButton: {
    '0': [
      { code: 'save', label: '保存', status: 'primary' },
      { code: 'confirm', label: '提交' },
      { code: 'import', label: '导入' }
    ],
    '1': [
      { code: 'revoke', label: '撤回', status: 'primary' },
      { code: 'export', label: '导出' },
      { code: 'print', label: '打印' }
    ]
    // '2': [
    //   { code: 'revoke', label: '撤销' }
    // ],
    // '3': [
    //   { code: 'check', label: '查看' }
    // ]
  },
  statusRightToolBarButtonByBusDept: {
    '1': [
      { code: 'approval', label: '批复', status: 'primary' },
      { code: 'check', label: '查看' },
      // { code: 'del', label: '删除' }
      { code: 'returnData', label: '退回' }
    ],
    '2': [
      { code: 'revoke', label: '撤销' }
    ]
  },
  PoliciesTableColumns: [
    {
      title: '事项编码',
      field: 'declareCode',
      sortable: false,
      filters: false,
      align: 'left'
    },
    {
      title: '事项名称',
      field: 'declareName',
      sortable: false,
      align: 'left'
    },
    {
      title: '所属财政',
      field: 'mofDivName',
      sortable: false,
      align: 'left'
    },
    {
      title: '所属机构',
      field: 'manageMofName',
      sortable: false,
      align: 'left'
    },
    {
      title: '申报人',
      field: 'createPersonName',
      sortable: false,
      align: 'left'
    },
    {
      title: '申报电话',
      field: 'declarePersonTel',
      sortable: false,
      align: 'left'
    },
    {
      title: '状态',
      field: 'flowStatusName',
      sortable: false,
      align: 'left'
    },
    {
      title: '操作',
      field: 'gloableOptionRow',
      className: 'gloableOptionRow',
      align: 'center',
      fixed: 'right',
      sortable: false,
      filters: false,
      width: 100,
      cellRender: {
        name: '$gloableOptionRow'
      }
    }
  ],
  highQueryConfig: [
    {
      title: '月份',
      field: 'month',
      'width': 180,
      align: 'left',
      formula: '',
      name: '$vxeSelect',
      itemRender: {
        name: '$vxeSelect',
        options: [
          { value: 1, label: '1月' },
          { value: 2, label: '2月' },
          { value: 3, label: '3月' },
          { value: 4, label: '4月' },
          { value: 5, label: '5月' },
          { value: 6, label: '6月' },
          { value: 7, label: '7月' },
          { value: 8, label: '8月' },
          { value: 9, label: '9月' },
          { value: 10, label: '10月' },
          { value: 11, label: '11月' },
          { value: 12, label: '12月' }
        ],
        props: {
          placeholder: '月份'
        }
      }
    }
  ],
  highQueryData: {
    month: ''
  },
  // table 操作按钮
  gloableOptionRow: {
    renderDefault(h, cellRender, params, context) {
      let self = context.$grid.$parent
      let { row, column } = params
      // const main = self.$parent.$parent.$parent.$parent
      // let status = main._data.toolBarStatusSelect.curValue
      return [
        <el-tooltip content="附件" placement="top" effect="light">
          <a class="gloable-option-row-attachment gloable-option-row  fn-inline"
            onClick={() => self.onOptionRowClick({ row, column, optionType: 'attachment' })}
          >附件</a>,
        </el-tooltip>,
        <el-tooltip content="操作日志" placement="top" effect="light">
          <a class="gloable-option-row-optionlog gloable-option-row  fn-inline"
            onClick={() => self.onOptionRowClick({ row, column, optionType: 'report' })}
          >操作日志</a>
        </el-tooltip>
      ]
    }
  },
  columns: [
    {
      'title': '一、综合类指标',
      'field': 'ceshi',
      'fixed': '',
      'width': '1050',
      'align': 'center',
      'formula': '',
      'constraint': '',
      'combinedType': '',
      'sortable': '1',
      'associatedQuery': {
        'queryMethods': '',
        'queryUrl': '',
        'params': {}
      },
      'children': [
        {
          'title': '1.户籍人口（万人）',
          'field': 'ceshi',
          'width': '150',
          'align': 'center',
          'undefined': {},
          'children': [
            {
              'title': '上年同期',
              'field': 'registeredResidencePeriod',
              'width': '150',
              'align': 'center',
              'undefined': {}
            },
            {
              'title': '本期',
              'field': 'registeredResidence',
              'width': '150',
              'align': 'center',
              'undefined': {}
            }
          ]
        },
        {
          'title': '2.常住人口（万人）',
          'field': 'ceshi',
          'width': '150',
          'align': 'center',
          'undefined': {},
          'children': [
            {
              'title': '上年同期',
              'field': 'residentPopulation',
              'width': '150',
              'align': 'center',
              'undefined': {}
            },
            {
              'title': '本期',
              'field': 'residentPopulationPeriod',
              'width': '150',
              'align': 'center',
              'undefined': {}
            }
          ]
        },
        {
          'title': '3.国民生产总值（亿元）和增速',
          'field': 'ceshi',
          'width': '150',
          'align': 'center',
          'undefined': {},
          'children': [
            {
              'title': '3.1 第一产业',
              'field': 'ceshi',
              'width': '150',
              'align': 'center',
              'undefined': {},
              'children': [
                {
                  'title': '上年同期',
                  'field': 'gdpFirst',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                },
                {
                  'title': '本期',
                  'field': 'gdpFirstPeriod',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                }
              ]
            },
            {
              'title': '3.2 第二产业',
              'field': 'ceshi',
              'width': '150',
              'align': 'center',
              'undefined': {},
              'children': [
                {
                  'title': '上年同期',
                  'field': 'gdpSecond',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                },
                {
                  'title': '本期',
                  'field': 'gdpSecondPeriod',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                }
              ]
            },
            {
              'title': '3.3 第三产业',
              'field': 'ceshi',
              'width': '150',
              'align': 'center',
              'undefined': {},
              'children': [
                {
                  'title': '上年同期',
                  'field': 'gdpThird',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                },
                {
                  'title': '本期',
                  'field': 'gdpThirdPeriod',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                }
              ]
            },
            {
              'title': '3.4 国内生产总值增速（%）',
              'field': 'ceshi',
              'width': '150',
              'align': 'center',
              'undefined': {},
              'children': [
                {
                  'title': '上年同期',
                  'field': 'gdpGrowth',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                },
                {
                  'title': '本期',
                  'field': 'gdpGrowthPeriod',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                }
              ]
            }
          ]
        },
        {
          'title': '4.工业增加值（亿元）',
          'field': 'ceshi',
          'width': '150',
          'align': 'center',
          'undefined': {},
          'children': [
            {
              'title': '4.1 规上工业增加值',
              'field': 'ceshi',
              'width': '150',
              'align': 'center',
              'undefined': {},
              'children': [
                {
                  'title': '上年同期',
                  'field': 'industrialOutput',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                },
                {
                  'title': '本期',
                  'field': 'industrialOutputPeriod',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                }
              ]
            },
            {
              'title': '4.2 战略性新兴产业增加值',
              'field': 'ceshi',
              'width': '150',
              'align': 'center',
              'undefined': {},
              'children': [
                {
                  'title': '上年同期',
                  'field': 'risingOutput',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                },
                {
                  'title': '本期',
                  'field': 'risingOutputPeriod',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                }
              ]
            }
          ]
        },
        {
          'title': '5.主要行业增加值（填写当地前三位经济支柱行业）',
          'field': 'ceshi',
          'width': '150',
          'align': 'center',
          'undefined': {},
          'children': [
            {
              'title': '5.1 煤炭开采和洗选业',
              'field': 'ceshi',
              'width': '150',
              'align': 'center',
              'undefined': {},
              'children': [
                {
                  'title': '上年同期',
                  'field': 'coalMining',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                },
                {
                  'title': '本期',
                  'field': 'coalMiningPeriod',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                }
              ]
            },
            {
              'title': '5.2 石油和天然气开采业',
              'field': 'ceshi',
              'width': '150',
              'align': 'center',
              'undefined': {},
              'children': [
                {
                  'title': '上年同期',
                  'field': 'oilGasExtraction',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                },
                {
                  'title': '本期',
                  'field': 'oilGasExtractionPeriod',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                }
              ]
            },
            {
              'title': '5.3 装备制造业',
              'field': 'ceshi',
              'width': '150',
              'align': 'center',
              'undefined': {},
              'children': [
                {
                  'title': '上年同期',
                  'field': 'equipmentManufacturing',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                },
                {
                  'title': '本期',
                  'field': 'equipmentManufacturingPeriod',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                }
              ]
            },
            {
              'title': '5.4 不在上述行业的经济支柱行业，自行添加',
              'field': 'ceshi',
              'width': '150',
              'align': 'center',
              'undefined': {},
              'children': [
                {
                  'title': '上年同期',
                  'field': 'otherIndustry',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                },
                {
                  'title': '本期',
                  'field': 'otherIndustryPeriod',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                }
              ]
            }
          ]
        },
        {
          'title': '6.固定资产投资增速（%）和增加额（亿元）',
          'field': 'ceshi',
          'width': '150',
          'align': 'center',
          'undefined': {},
          'children': [
            {
              'title': '6.1 第一产业增速',
              'field': 'ceshi',
              'width': '150',
              'align': 'center',
              'undefined': {},
              'children': [
                {
                  'title': '上年同期',
                  'field': 'fixedAssetsFirstGrowthPeriod',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                },
                {
                  'title': '本期',
                  'field': 'fixedAssetsFirstGrowth',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                }
              ]
            },
            {
              'title': '6.2 第二产业增速',
              'field': 'ceshi',
              'width': '150',
              'align': 'center',
              'undefined': {},
              'children': [
                {
                  'title': '上年同期',
                  'field': 'fixedAssetsSecondGrowthPeriod',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                },
                {
                  'title': '本期',
                  'field': 'fixedAssetsSecondGrowth',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                }
              ]
            },
            {
              'title': '6.3 第三产业增速',
              'field': 'ceshi',
              'width': '150',
              'align': 'center',
              'undefined': {},
              'children': [
                {
                  'title': '上年同期',
                  'field': 'fixedAssetsThirdGrowthPeriod',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                },
                {
                  'title': '本期',
                  'field': 'fixedAssetsThirdGrowth',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                }
              ]
            },
            {
              'title': '6.4 基础设施投资增速',
              'field': 'ceshi',
              'width': '150',
              'align': 'center',
              'undefined': {},
              'children': [
                {
                  'title': '上年同期',
                  'field': 'fixedAssetsInfrastructureGrowthPeriod',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                },
                {
                  'title': '本期',
                  'field': 'fixedAssetsInfrastructureGrowth',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                }
              ]
            },
            {
              'title': '6.5 民间投资增速',
              'field': 'ceshi',
              'width': '150',
              'align': 'center',
              'undefined': {},
              'children': [
                {
                  'title': '上年同期',
                  'field': 'fixedAssetsPrivateInvestmentGrowthPeriod',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                },
                {
                  'title': '本期',
                  'field': 'fixedAssetsPrivateInvestmentGrowth',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                }
              ]
            },
            {
              'title': '6.6 房地产开发投资增速',
              'field': 'ceshi',
              'width': '150',
              'align': 'center',
              'undefined': {},
              'children': [
                {
                  'title': '上年同期',
                  'field': 'fixedAssetsRealEstateGrowthPeriod',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                },
                {
                  'title': '本期',
                  'field': 'fixedAssetsRealEstateGrowth',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                }
              ]
            },
            {
              'title': '6.7 第一产业增加额',
              'field': 'ceshi',
              'width': '150',
              'align': 'center',
              'undefined': {},
              'children': [
                {
                  'title': '上年同期',
                  'field': 'fixedAssetsFirstPeriod',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                },
                {
                  'title': '本期',
                  'field': 'fixedAssetsFirst',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                }
              ]
            },
            {
              'title': '6.8 第二产业增加额',
              'field': 'ceshi',
              'width': '150',
              'align': 'center',
              'undefined': {},
              'children': [
                {
                  'title': '上年同期',
                  'field': 'fixedAssetsSecondPeriod',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                },
                {
                  'title': '本期',
                  'field': 'fixedAssetsSecond',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                }
              ]
            },
            {
              'title': '6.9 第三产业增加额',
              'field': 'ceshi',
              'width': '150',
              'align': 'center',
              'undefined': {},
              'children': [
                {
                  'title': '上年同期',
                  'field': 'fixedAssetsThirdPeriod',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                },
                {
                  'title': '本期',
                  'field': 'fixedAssetsThird',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                }
              ]
            },
            {
              'title': '6.10 基础设施投资增加额',
              'field': 'ceshi',
              'width': '150',
              'align': 'center',
              'undefined': {},
              'children': [
                {
                  'title': '上年同期',
                  'field': 'fixedAssetsInfrastructurePeriod',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                },
                {
                  'title': '本期',
                  'field': 'fixedAssetsInfrastructure',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                }
              ]
            },
            {
              'title': '6.11 民间投资增加额',
              'field': 'ceshi',
              'width': '150',
              'align': 'center',
              'undefined': {},
              'children': [
                {
                  'title': '上年同期',
                  'field': 'fixedAssetsPrivateInvestmentPeriod',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                },
                {
                  'title': '本期',
                  'field': 'fixedAssetsPrivateInvestment',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                }
              ]
            },
            {
              'title': '6.12 房地产开发投资增加额',
              'field': 'ceshi',
              'width': '150',
              'align': 'center',
              'undefined': {},
              'children': [
                {
                  'title': '上年同期',
                  'field': 'fixedAssetsRealEstatePeriod',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                },
                {
                  'title': '本期',
                  'field': 'fixedAssetsRealEstate',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                }
              ]
            }
          ]
        },
        {
          'title': '7.社会消费品零售总额（亿元）',
          'field': 'ceshi',
          'width': '150',
          'align': 'center',
          'undefined': {},
          'children': [
            {
              'title': '上年同期',
              'field': 'retailTotalPeriod',
              'width': '150',
              'align': 'center',
              'undefined': {}
            },
            {
              'title': '本期',
              'field': 'retailTotal',
              'width': '150',
              'align': 'center',
              'undefined': {}
            }
          ]
        },
        {
          'title': '8.进出口总值（亿元）',
          'field': 'ceshi',
          'width': '150',
          'align': 'center',
          'undefined': {},
          'children': [
            {
              'title': '8.1 进口总值（亿元）',
              'field': 'ceshi',
              'width': '150',
              'align': 'center',
              'undefined': {},
              'children': [
                {
                  'title': '上年同期',
                  'field': 'exportTotalPeriod',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                },
                {
                  'title': '本期',
                  'field': 'exportTotal',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                }
              ]
            },
            {
              'title': '8.2 出口总值（亿元）',
              'field': 'ceshi',
              'width': '150',
              'align': 'center',
              'undefined': {},
              'children': [
                {
                  'title': '上年同期',
                  'field': 'importTotalPeriod',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                },
                {
                  'title': '本期',
                  'field': 'importTotal',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                }
              ]
            }
          ]
        },
        {
          'title': '9.先行指标',
          'field': 'ceshi',
          'width': '150',
          'align': 'center',
          'undefined': {},
          'children': [
            {
              'title': '9.1 用电量（千瓦时）',
              'field': 'ceshi',
              'width': '150',
              'align': 'center',
              'undefined': {},
              'children': [
                {
                  'title': '上年同期',
                  'field': 'electricityConsumptionPeriod',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                },
                {
                  'title': '本期',
                  'field': 'electricityConsumption',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                }
              ]
            },
            {
              'title': '9.2 金融机构人民币存款余额（亿元）',
              'field': 'ceshi',
              'width': '150',
              'align': 'center',
              'undefined': {},
              'children': [
                {
                  'title': '上年同期',
                  'field': 'depositBalancePeriod',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                },
                {
                  'title': '本期',
                  'field': 'depositBalance',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                }
              ]
            },
            {
              'title': '9.3 金融机构人民币贷款余额（亿元）',
              'field': 'ceshi',
              'width': '150',
              'align': 'center',
              'undefined': {},
              'children': [
                {
                  'title': '上年同期',
                  'field': 'loanBalancePeriod',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                },
                {
                  'title': '本期',
                  'field': 'loanBalance',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                }
              ]
            },
            {
              'title': '9.4 采购经理指数MPI（%）',
              'field': 'ceshi',
              'width': '150',
              'align': 'center',
              'undefined': {},
              'children': [
                {
                  'title': '上年同期',
                  'field': 'pmiIndexPeriod',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                },
                {
                  'title': '本期',
                  'field': 'pmiIndex',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                }
              ]
            }
          ]
        },
        {
          'title': '10.居民消费价格指数CPI（%）',
          'field': 'ceshi',
          'width': '150',
          'align': 'center',
          'undefined': {},
          'children': [
            {
              'title': '上年同期',
              'field': 'cpiIndexPeriod',
              'width': '150',
              'align': 'center',
              'undefined': {}
            },
            {
              'title': '本期',
              'field': 'cpiIndex',
              'width': '150',
              'align': 'center',
              'undefined': {}
            }
          ]
        },
        {
          'title': '11.工业品出厂价格指数PPI（%）',
          'field': 'ceshi',
          'width': '150',
          'align': 'center',
          'undefined': {},
          'children': [
            {
              'title': '上年同期',
              'field': 'ppiIndexPeriod',
              'width': '150',
              'align': 'center',
              'undefined': {}
            },
            {
              'title': '本期',
              'field': 'ppiIndex',
              'width': '150',
              'align': 'center',
              'undefined': {}
            }
          ]
        },
        {
          'title': '12.失业率',
          'field': 'ceshi',
          'width': '150',
          'align': 'center',
          'undefined': {},
          'children': [
            {
              'title': '上年同期',
              'field': 'unemploymentRatePeriod',
              'width': '150',
              'align': 'center',
              'undefined': {}
            },
            {
              'title': '本期',
              'field': 'unemploymentRate',
              'width': '150',
              'align': 'center',
              'undefined': {}
            }
          ]
        }
      ],
      'className': '',
      'dragSort': null,
      'renderType': '',
      'renderName': '',
      'options': '',
      'defaultValue': '',
      'filters': '',
      'props': {},
      '_XID': 'row_192'
    },
    {
      'title': '二、财政收入类指标',
      'field': 'ceshi',
      'fixed': '',
      'width': '1050',
      'align': 'center',
      'formula': '',
      'constraint': '',
      'combinedType': '',
      'sortable': '1',
      'associatedQuery': {
        'queryMethods': '',
        'queryUrl': '',
        'params': {}
      },
      'children': [
        {
          'title': '1.一般公共预算',
          'field': 'ceshi',
          'width': '150',
          'align': 'center',
          'undefined': {},
          'children': [
            {
              'title': '1.1 一般公共预算收入',
              'field': 'ceshi',
              'width': '150',
              'align': 'center',
              'undefined': {},
              'children': [
                {
                  'title': '上年同期',
                  'field': 'param1',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                },
                {
                  'title': '本期',
                  'field': 'param2',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                }
              ]
            },
            {
              'title': '1.1.1 税收收入',
              'field': 'ceshi',
              'width': '150',
              'align': 'center',
              'undefined': {},
              'children': [
                {
                  'title': '上年同期',
                  'field': 'param3',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                },
                {
                  'title': '本期',
                  'field': 'param4',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                }
              ]
            },
            {
              'title': '1.1.1.1 增值税',
              'field': 'ceshi',
              'width': '150',
              'align': 'center',
              'undefined': {},
              'children': [
                {
                  'title': '上年同期',
                  'field': 'param5',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                },
                {
                  'title': '本期',
                  'field': 'param6',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                }
              ]
            },
            {
              'title': '1.1.1.2 消费税',
              'field': 'ceshi',
              'width': '150',
              'align': 'center',
              'undefined': {},
              'children': [
                {
                  'title': '上年同期',
                  'field': 'param7',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                },
                {
                  'title': '本期',
                  'field': 'param8',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                }
              ]
            },
            {
              'title': '1.1.1.3 企业所得税',
              'field': 'ceshi',
              'width': '150',
              'align': 'center',
              'undefined': {},
              'children': [
                {
                  'title': '上年同期',
                  'field': 'param9',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                },
                {
                  'title': '本期',
                  'field': 'param10',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                }
              ]
            },
            {
              'title': '1.1.1.4 个人所得税',
              'field': 'ceshi',
              'width': '150',
              'align': 'center',
              'undefined': {},
              'children': [
                {
                  'title': '上年同期',
                  'field': 'param11',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                },
                {
                  'title': '本期',
                  'field': 'param12',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                }
              ]
            },
            {
              'title': '1.1.1.5 资源税',
              'field': 'ceshi',
              'width': '150',
              'align': 'center',
              'undefined': {},
              'children': [
                {
                  'title': '上年同期',
                  'field': 'param13',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                },
                {
                  'title': '本期',
                  'field': 'param14',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                }
              ]
            },
            {
              'title': '1.1.1.6 城镇土地使用税',
              'field': 'ceshi',
              'width': '150',
              'align': 'center',
              'undefined': {},
              'children': [
                {
                  'title': '上年同期',
                  'field': 'param15',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                },
                {
                  'title': '本期',
                  'field': 'param16',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                }
              ]
            },
            {
              'title': '1.1.1.7 土地增值税',
              'field': 'ceshi',
              'width': '150',
              'align': 'center',
              'undefined': {},
              'children': [
                {
                  'title': '上年同期',
                  'field': 'param17',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                },
                {
                  'title': '本期',
                  'field': 'param18',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                }
              ]
            },
            {
              'title': '1.1.1.8 城市维护建设税',
              'field': 'ceshi',
              'width': '150',
              'align': 'center',
              'undefined': {},
              'children': [
                {
                  'title': '上年同期',
                  'field': 'param19',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                },
                {
                  'title': '本期',
                  'field': 'param20',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                }
              ]
            },
            {
              'title': '1.1.1.9 耕地占用税',
              'field': 'ceshi',
              'width': '150',
              'align': 'center',
              'undefined': {},
              'children': [
                {
                  'title': '上年同期',
                  'field': 'param21',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                },
                {
                  'title': '本期',
                  'field': 'param22',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                }
              ]
            },
            {
              'title': '1.1.1.10 契税',
              'field': 'ceshi',
              'width': '150',
              'align': 'center',
              'undefined': {},
              'children': [
                {
                  'title': '上年同期',
                  'field': 'param23',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                },
                {
                  'title': '本期',
                  'field': 'param24',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                }
              ]
            },
            {
              'title': '1.1.2 非税收入',
              'field': 'ceshi',
              'width': '150',
              'align': 'center',
              'undefined': {},
              'children': [
                {
                  'title': '上年同期',
                  'field': 'param25',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                },
                {
                  'title': '本期',
                  'field': 'param26',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                }
              ]
            },
            {
              'title': '1.1.2.1 专项收入',
              'field': 'ceshi',
              'width': '150',
              'align': 'center',
              'undefined': {},
              'children': [
                {
                  'title': '上年同期',
                  'field': 'param27',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                },
                {
                  'title': '本期',
                  'field': 'param28',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                }
              ]
            },
            {
              'title': '1.1.2.2 行政事业性收费',
              'field': 'ceshi',
              'width': '150',
              'align': 'center',
              'undefined': {},
              'children': [
                {
                  'title': '上年同期',
                  'field': 'param29',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                },
                {
                  'title': '本期',
                  'field': 'param30',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                }
              ]
            },
            {
              'title': '1.1.2.3 罚没收入',
              'field': 'ceshi',
              'width': '150',
              'align': 'center',
              'undefined': {},
              'children': [
                {
                  'title': '上年同期',
                  'field': 'param31',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                },
                {
                  'title': '本期',
                  'field': 'param32',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                }
              ]
            },
            {
              'title': '1.1.2.4 国有资源（资产）有偿使用收入',
              'field': 'ceshi',
              'width': '150',
              'align': 'center',
              'undefined': {},
              'children': [
                {
                  'title': '上年同期',
                  'field': 'param33',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                },
                {
                  'title': '本期',
                  'field': 'param34',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                }
              ]
            },
            {
              'title': '1.1.2.5 其他收入（就构成作简要说明，可自行增加）',
              'field': 'ceshi',
              'width': '150',
              'align': 'center',
              'undefined': {},
              'children': [
                {
                  'title': '上年同期',
                  'field': 'param35',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                },
                {
                  'title': '本期',
                  'field': 'param36',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                }
              ]
            },
            {
              'title': '1.2 上级补助收入',
              'field': 'ceshi',
              'width': '150',
              'align': 'center',
              'undefined': {},
              'children': [
                {
                  'title': '上年同期',
                  'field': 'param37',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                },
                {
                  'title': '本期',
                  'field': 'param38',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                }
              ]
            },
            {
              'title': '1.2.1 中央对该地区补助财政收入',
              'field': 'ceshi',
              'width': '150',
              'align': 'center',
              'undefined': {},
              'children': [
                {
                  'title': '上年同期',
                  'field': 'param39',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                },
                {
                  'title': '本期',
                  'field': 'param40',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                }
              ]
            },
            {
              'title': '1.2.2 省以下对该地区补助财政收入',
              'field': 'ceshi',
              'width': '150',
              'align': 'center',
              'undefined': {},
              'children': [
                {
                  'title': '上年同期',
                  'field': 'param41',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                },
                {
                  'title': '本期',
                  'field': 'param42',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                }
              ]
            },
            {
              'title': '1.3 上年结转收入',
              'field': 'ceshi',
              'width': '150',
              'align': 'center',
              'undefined': {},
              'children': [
                {
                  'title': '上年同期',
                  'field': 'param43',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                },
                {
                  'title': '本期',
                  'field': 'param44',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                }
              ]
            },
            {
              'title': '1.4 调入资金',
              'field': 'ceshi',
              'width': '150',
              'align': 'center',
              'undefined': {},
              'children': [
                {
                  'title': '上年同期',
                  'field': 'param45',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                },
                {
                  'title': '本期',
                  'field': 'param46',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                }
              ]
            },
            {
              'title': '1.4.1 政府性基金调入',
              'field': 'ceshi',
              'width': '150',
              'align': 'center',
              'undefined': {},
              'children': [
                {
                  'title': '上年同期',
                  'field': 'param47',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                },
                {
                  'title': '本期',
                  'field': 'param48',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                }
              ]
            },
            {
              'title': '1.4.2 国有资本经营预算调入',
              'field': 'ceshi',
              'width': '150',
              'align': 'center',
              'undefined': {},
              'children': [
                {
                  'title': '上年同期',
                  'field': 'param49',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                },
                {
                  'title': '本期',
                  'field': 'param50',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                }
              ]
            },
            {
              'title': '1.5 债务（转贷）收入',
              'field': 'ceshi',
              'width': '150',
              'align': 'center',
              'undefined': {},
              'children': [
                {
                  'title': '上年同期',
                  'field': 'param51',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                },
                {
                  'title': '本期',
                  'field': 'param52',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                }
              ]
            },
            {
              'title': '1.6 调入预算稳定调节基金',
              'field': 'ceshi',
              'width': '150',
              'align': 'center',
              'undefined': {},
              'children': [
                {
                  'title': '上年同期',
                  'field': 'param53',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                },
                {
                  'title': '本期',
                  'field': 'param54',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                }
              ]
            },
            {
              'title': '1.7 财政总收入',
              'field': 'ceshi',
              'width': '150',
              'align': 'center',
              'undefined': {},
              'children': [
                {
                  'title': '上年同期',
                  'field': 'param55',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                },
                {
                  'title': '本期',
                  'field': 'param56',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                }
              ]
            },
            {
              'title': '1.7.1 上划中央级收入',
              'field': 'ceshi',
              'width': '150',
              'align': 'center',
              'undefined': {},
              'children': [
                {
                  'title': '上年同期',
                  'field': 'param57',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                },
                {
                  'title': '本期',
                  'field': 'param58',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                }
              ]
            },
            {
              'title': '1.7.2 上划省级收入',
              'field': 'ceshi',
              'width': '150',
              'align': 'center',
              'undefined': {},
              'children': [
                {
                  'title': '上年同期',
                  'field': 'param59',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                },
                {
                  'title': '本期',
                  'field': 'param60',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                }
              ]
            },
            {
              'title': '1.7.3 上划市级收入',
              'field': 'ceshi',
              'width': '150',
              'align': 'center',
              'undefined': {},
              'children': [
                {
                  'title': '上年同期',
                  'field': 'param61',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                },
                {
                  'title': '本期',
                  'field': 'param62',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                }
              ]
            },
            {
              'title': '1.8 分行业税收收入',
              'field': 'ceshi',
              'width': '150',
              'align': 'center',
              'undefined': {},
              'children': [
                {
                  'title': '上年同期',
                  'field': 'param63',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                },
                {
                  'title': '本期',
                  'field': 'param64',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                }
              ]
            },
            {
              'title': '1.8.1 煤炭开采和洗选业',
              'field': 'ceshi',
              'width': '150',
              'align': 'center',
              'undefined': {},
              'children': [
                {
                  'title': '上年同期',
                  'field': 'param65',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                },
                {
                  'title': '本期',
                  'field': 'param66',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                }
              ]
            },
            {
              'title': '1.8.2 石油和天然气开采业',
              'field': 'ceshi',
              'width': '150',
              'align': 'center',
              'undefined': {},
              'children': [
                {
                  'title': '上年同期',
                  'field': 'param67',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                },
                {
                  'title': '本期',
                  'field': 'param68',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                }
              ]
            },
            {
              'title': '1.8.3 装备制造业',
              'field': 'ceshi',
              'width': '150',
              'align': 'center',
              'undefined': {},
              'children': [
                {
                  'title': '上年同期',
                  'field': 'param69',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                },
                {
                  'title': '本期',
                  'field': 'param70',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                }
              ]
            },
            {
              'title': '1.8.4 房地产业',
              'field': 'ceshi',
              'width': '150',
              'align': 'center',
              'undefined': {},
              'children': [
                {
                  'title': '上年同期',
                  'field': 'param71',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                },
                {
                  'title': '本期',
                  'field': 'param72',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                }
              ]
            },
            {
              'title': '1.8.5 建筑业',
              'field': 'ceshi',
              'width': '150',
              'align': 'center',
              'undefined': {},
              'children': [
                {
                  'title': '上年同期',
                  'field': 'param73',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                },
                {
                  'title': '本期',
                  'field': 'param74',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                }
              ]
            },
            {
              'title': '1.8.6 住宿餐饮业',
              'field': 'ceshi',
              'width': '150',
              'align': 'center',
              'undefined': {},
              'children': [
                {
                  'title': '上年同期',
                  'field': 'param75',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                },
                {
                  'title': '本期',
                  'field': 'param76',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                }
              ]
            }
          ]
        },
        {
          'title': '2.政府性基金',
          'field': 'ceshi',
          'width': '150',
          'align': 'center',
          'undefined': {},
          'children': [
            {
              'title': '2.1 政府性基金收入',
              'field': 'ceshi',
              'width': '150',
              'align': 'center',
              'undefined': {},
              'children': [
                {
                  'title': '上年同期',
                  'field': 'param77',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                },
                {
                  'title': '本期',
                  'field': 'param78',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                }
              ]
            },
            {
              'title': '2.1.1 国有土地使用权出让金收入',
              'field': 'ceshi',
              'width': '150',
              'align': 'center',
              'undefined': {},
              'children': [
                {
                  'title': '上年同期',
                  'field': 'param79',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                },
                {
                  'title': '本期',
                  'field': 'param80',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                }
              ]
            },
            {
              'title': '2.1.2 车辆通行费收入',
              'field': 'ceshi',
              'width': '150',
              'align': 'center',
              'undefined': {},
              'children': [
                {
                  'title': '上年同期',
                  'field': 'param81',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                },
                {
                  'title': '本期',
                  'field': 'param82',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                }
              ]
            },
            {
              'title': '2.2 上级补助收入',
              'field': 'ceshi',
              'width': '150',
              'align': 'center',
              'undefined': {},
              'children': [
                {
                  'title': '上年同期',
                  'field': 'param83',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                },
                {
                  'title': '本期',
                  'field': 'param84',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                }
              ]
            },
            {
              'title': '2.2.1 中央对该地区补助财政收入',
              'field': 'ceshi',
              'width': '150',
              'align': 'center',
              'undefined': {},
              'children': [
                {
                  'title': '上年同期',
                  'field': 'param85',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                },
                {
                  'title': '本期',
                  'field': 'param86',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                }
              ]
            },
            {
              'title': '2.2.2 省以下对该地区补助财政收入',
              'field': 'ceshi',
              'width': '150',
              'align': 'center',
              'undefined': {},
              'children': [
                {
                  'title': '上年同期',
                  'field': 'param87',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                },
                {
                  'title': '本期',
                  'field': 'param88',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                }
              ]
            },
            {
              'title': '2.3 上年结转收入',
              'field': 'ceshi',
              'width': '150',
              'align': 'center',
              'undefined': {},
              'children': [
                {
                  'title': '上年同期',
                  'field': 'param89',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                },
                {
                  'title': '本期',
                  'field': 'param90',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                }
              ]
            },
            {
              'title': '2.4 调入资金',
              'field': 'ceshi',
              'width': '150',
              'align': 'center',
              'undefined': {},
              'children': [
                {
                  'title': '上年同期',
                  'field': 'param91',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                },
                {
                  'title': '本期',
                  'field': 'param92',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                }
              ]
            },
            {
              'title': '2.5 债务（转贷）收入',
              'field': 'ceshi',
              'width': '150',
              'align': 'center',
              'undefined': {},
              'children': [
                {
                  'title': '上年同期',
                  'field': 'param93',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                },
                {
                  'title': '本期',
                  'field': 'param94',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                }
              ]
            },
            {
              'title': '2.6 收入总计',
              'field': 'ceshi',
              'width': '150',
              'align': 'center',
              'undefined': {},
              'children': [
                {
                  'title': '上年同期',
                  'field': 'param95',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                },
                {
                  'title': '本期',
                  'field': 'param96',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                }
              ]
            }
          ]
        },
        {
          'title': '3.国有资本经营预算收入',
          'field': 'ceshi',
          'width': '150',
          'align': 'center',
          'undefined': {},
          'children': [
            {
              'title': '上年同期',
              'field': 'param97',
              'width': '150',
              'align': 'center',
              'undefined': {}
            },
            {
              'title': '本期',
              'field': 'param98',
              'width': '150',
              'align': 'center',
              'undefined': {}
            }
          ]
        }
      ],
      'className': '',
      'dragSort': null,
      'renderType': '',
      'renderName': '',
      'options': '',
      'defaultValue': '',
      'filters': '',
      'props': {},
      '_XID': 'row_192'
    },
    {
      'title': '三、财政支出类指标',
      'field': 'ceshi',
      'fixed': '',
      'width': '1050',
      'align': 'center',
      'formula': '',
      'constraint': '',
      'combinedType': '',
      'sortable': '1',
      'associatedQuery': {
        'queryMethods': '',
        'queryUrl': '',
        'params': {}
      },
      'children': [
        {
          'title': '1.一般公共预算',
          'field': 'ceshi',
          'width': '150',
          'align': 'center',
          'undefined': {},
          'children': [
            {
              'title': '1.1 一般公共预算支出',
              'field': 'ceshi',
              'width': '150',
              'align': 'center',
              'undefined': {},
              'children': [
                {
                  'title': '上年同期',
                  'field': 'param99',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                },
                {
                  'title': '本期',
                  'field': 'param100',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                }
              ]
            },
            {
              'title': '1.1.1 一般公共服务支出',
              'field': 'ceshi',
              'width': '150',
              'align': 'center',
              'undefined': {},
              'children': [
                {
                  'title': '上年同期',
                  'field': 'param101',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                },
                {
                  'title': '本期',
                  'field': 'param102',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                }
              ]
            },
            {
              'title': '1.1.2 教育支出',
              'field': 'ceshi',
              'width': '150',
              'align': 'center',
              'undefined': {},
              'children': [
                {
                  'title': '上年同期',
                  'field': 'param103',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                },
                {
                  'title': '本期',
                  'field': 'param104',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                }
              ]
            },
            {
              'title': '1.1.3 科学技术支出',
              'field': 'ceshi',
              'width': '150',
              'align': 'center',
              'undefined': {},
              'children': [
                {
                  'title': '上年同期',
                  'field': 'param105',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                },
                {
                  'title': '本期',
                  'field': 'param106',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                }
              ]
            },
            {
              'title': '1.1.4 社会保障和就业支出',
              'field': 'ceshi',
              'width': '150',
              'align': 'center',
              'undefined': {},
              'children': [
                {
                  'title': '上年同期',
                  'field': 'param107',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                },
                {
                  'title': '本期',
                  'field': 'param108',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                }
              ]
            },
            {
              'title': '1.1.5 医疗卫生与计划生育支出',
              'field': 'ceshi',
              'width': '150',
              'align': 'center',
              'undefined': {},
              'children': [
                {
                  'title': '上年同期',
                  'field': 'param109',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                },
                {
                  'title': '本期',
                  'field': 'param110',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                }
              ]
            },
            {
              'title': '1.1.6 节能环保支出',
              'field': 'ceshi',
              'width': '150',
              'align': 'center',
              'undefined': {},
              'children': [
                {
                  'title': '上年同期',
                  'field': 'param111',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                },
                {
                  'title': '本期',
                  'field': 'param112',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                }
              ]
            },
            {
              'title': '1.1.7 城乡社区支出',
              'field': 'ceshi',
              'width': '150',
              'align': 'center',
              'undefined': {},
              'children': [
                {
                  'title': '上年同期',
                  'field': 'param113',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                },
                {
                  'title': '本期',
                  'field': 'param114',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                }
              ]
            },
            {
              'title': '1.1.8 农林水支出',
              'field': 'ceshi',
              'width': '150',
              'align': 'center',
              'undefined': {},
              'children': [
                {
                  'title': '上年同期',
                  'field': 'param115',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                },
                {
                  'title': '本期',
                  'field': 'param116',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                }
              ]
            },
            {
              'title': '1.1.9 交通运输支出',
              'field': 'ceshi',
              'width': '150',
              'align': 'center',
              'undefined': {},
              'children': [
                {
                  'title': '上年同期',
                  'field': 'param117',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                },
                {
                  'title': '本期',
                  'field': 'param118',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                }
              ]
            },
            {
              'title': '1.1.10 住房保障支出',
              'field': 'ceshi',
              'width': '150',
              'align': 'center',
              'undefined': {},
              'children': [
                {
                  'title': '上年同期',
                  'field': 'param119',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                },
                {
                  'title': '本期',
                  'field': 'param120',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                }
              ]
            },
            {
              'title': '1.1.11 债务发行费支出',
              'field': 'ceshi',
              'width': '150',
              'align': 'center',
              'undefined': {},
              'children': [
                {
                  'title': '上年同期',
                  'field': 'param121',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                },
                {
                  'title': '本期',
                  'field': 'param122',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                }
              ]
            },
            {
              'title': '1.1.12 债务付息支出',
              'field': 'ceshi',
              'width': '150',
              'align': 'center',
              'undefined': {},
              'children': [
                {
                  'title': '上年同期',
                  'field': 'param123',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                },
                {
                  'title': '本期',
                  'field': 'param124',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                }
              ]
            },
            {
              'title': '1.2 上解上级支出',
              'field': 'ceshi',
              'width': '150',
              'align': 'center',
              'undefined': {},
              'children': [
                {
                  'title': '上年同期',
                  'field': 'param125',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                },
                {
                  'title': '本期',
                  'field': 'param126',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                }
              ]
            },
            {
              'title': '1.3 债务还本支出',
              'field': 'ceshi',
              'width': '150',
              'align': 'center',
              'undefined': {},
              'children': [
                {
                  'title': '上年同期',
                  'field': 'param127',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                },
                {
                  'title': '本期',
                  'field': 'param128',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                }
              ]
            },
            {
              'title': '1.4 安排预算稳定调节基金',
              'field': 'ceshi',
              'width': '150',
              'align': 'center',
              'undefined': {},
              'children': [
                {
                  'title': '上年同期',
                  'field': 'param129',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                },
                {
                  'title': '本期',
                  'field': 'param130',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                }
              ]
            },
            {
              'title': '1.5 支出总计',
              'field': 'ceshi',
              'width': '150',
              'align': 'center',
              'undefined': {},
              'children': [
                {
                  'title': '上年同期',
                  'field': 'param131',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                },
                {
                  'title': '本期',
                  'field': 'param132',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                }
              ]
            }
          ]
        },
        {
          'title': '2.政府性基金',
          'field': 'ceshi',
          'width': '150',
          'align': 'center',
          'undefined': {},
          'children': [
            {
              'title': '2.1 政府性基金支出',
              'field': 'ceshi',
              'width': '150',
              'align': 'center',
              'undefined': {},
              'children': [
                {
                  'title': '上年同期',
                  'field': 'param133',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                },
                {
                  'title': '本期',
                  'field': 'param134',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                }
              ]
            },
            {
              'title': '2.1.1 债务付息支出',
              'field': 'ceshi',
              'width': '150',
              'align': 'center',
              'undefined': {},
              'children': [
                {
                  'title': '上年同期',
                  'field': 'param135',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                },
                {
                  'title': '本期',
                  'field': 'param136',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                }
              ]
            },
            {
              'title': '2.1.2 债务发行费支出',
              'field': 'ceshi',
              'width': '150',
              'align': 'center',
              'undefined': {},
              'children': [
                {
                  'title': '上年同期',
                  'field': 'param137',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                },
                {
                  'title': '本期',
                  'field': 'param138',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                }
              ]
            },
            {
              'title': '2.2 债务还本支出',
              'field': 'ceshi',
              'width': '150',
              'align': 'center',
              'undefined': {},
              'children': [
                {
                  'title': '上年同期',
                  'field': 'param139',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                },
                {
                  'title': '本期',
                  'field': 'param140',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                }
              ]
            },
            {
              'title': '2.3 支出总计',
              'field': 'ceshi',
              'width': '150',
              'align': 'center',
              'undefined': {},
              'children': [
                {
                  'title': '上年同期',
                  'field': 'param141',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                },
                {
                  'title': '本期',
                  'field': 'param142',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                }
              ]
            }
          ]
        },
        {
          'title': '3.国有资本经营预算支出',
          'field': 'ceshi',
          'width': '150',
          'align': 'center',
          'undefined': {},
          'children': [
            {
              'title': '上年同期',
              'field': 'param143',
              'width': '150',
              'align': 'center',
              'undefined': {}
            },
            {
              'title': '本期',
              'field': 'param144',
              'width': '150',
              'align': 'center',
              'undefined': {}
            }
          ]
        }
      ],
      'className': '',
      'dragSort': null,
      'renderType': '',
      'renderName': '',
      'options': '',
      'defaultValue': '',
      'filters': '',
      'props': {},
      '_XID': 'row_192'
    },
    {
      'title': '四、运行保障类指标',
      'field': 'ceshi',
      'fixed': '',
      'width': '1050',
      'align': 'center',
      'formula': '',
      'constraint': '',
      'combinedType': '',
      'sortable': '1',
      'associatedQuery': {
        'queryMethods': '',
        'queryUrl': '',
        'params': {}
      },
      'children': [
        {
          'title': '1.刚性支出',
          'field': 'ceshi',
          'width': '150',
          'align': 'center',
          'undefined': {},
          'children': [
            {
              'title': '1.1 “三保”支出',
              'field': 'ceshi',
              'width': '150',
              'align': 'center',
              'undefined': {},
              'children': [
                {
                  'title': '上年同期',
                  'field': 'param145',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                },
                {
                  'title': '本期',
                  'field': 'param146',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                }
              ]
            },
            {
              'title': '1.1.1 保工资支出',
              'field': 'ceshi',
              'width': '150',
              'align': 'center',
              'undefined': {},
              'children': [
                {
                  'title': '上年同期',
                  'field': 'param147',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                },
                {
                  'title': '本期',
                  'field': 'param148',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                }
              ]
            },
            {
              'title': '1.1.2 保运转支出',
              'field': 'ceshi',
              'width': '150',
              'align': 'center',
              'undefined': {},
              'children': [
                {
                  'title': '上年同期',
                  'field': 'param149',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                },
                {
                  'title': '本期',
                  'field': 'param150',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                }
              ]
            },
            {
              'title': '1.1.3 保基本民生支出',
              'field': 'ceshi',
              'width': '150',
              'align': 'center',
              'undefined': {},
              'children': [
                {
                  'title': '上年同期',
                  'field': 'param151',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                },
                {
                  'title': '本期',
                  'field': 'param152',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                }
              ]
            },
            {
              'title': '其中：按国家标准测算的基本民生支出预算',
              'field': 'ceshi',
              'width': '150',
              'align': 'center',
              'undefined': {},
              'children': [
                {
                  'title': '上年同期',
                  'field': 'param153',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                },
                {
                  'title': '本期',
                  'field': 'param154',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                }
              ]
            },
            {
              'title': '1.2 对企业职工养老保险的补助',
              'field': 'ceshi',
              'width': '150',
              'align': 'center',
              'undefined': {},
              'children': [
                {
                  'title': '上年同期',
                  'field': 'param155',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                },
                {
                  'title': '本期',
                  'field': 'param156',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                }
              ]
            },
            {
              'title': '1.3 债卷付息支出',
              'field': 'ceshi',
              'width': '150',
              'align': 'center',
              'undefined': {},
              'children': [
                {
                  'title': '上年同期',
                  'field': 'param157',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                },
                {
                  'title': '本期',
                  'field': 'param158',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                }
              ]
            },
            {
              'title': '1.4 债卷发行费用支出',
              'field': 'ceshi',
              'width': '150',
              'align': 'center',
              'undefined': {},
              'children': [
                {
                  'title': '上年同期',
                  'field': 'param159',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                },
                {
                  'title': '本期',
                  'field': 'param160',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                }
              ]
            },
            {
              'title': '1.5 自由财力偿还债卷本金',
              'field': 'ceshi',
              'width': '150',
              'align': 'center',
              'undefined': {},
              'children': [
                {
                  'title': '上年同期',
                  'field': 'param161',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                },
                {
                  'title': '本期',
                  'field': 'param162',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                }
              ]
            },
            {
              'title': '1.6 招商引资支出',
              'field': 'ceshi',
              'width': '150',
              'align': 'center',
              'undefined': {},
              'children': [
                {
                  'title': '上年同期',
                  'field': 'param163',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                },
                {
                  'title': '本期',
                  'field': 'param164',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                }
              ]
            },
            {
              'title': '1.7 支持中小企业发展支出',
              'field': 'ceshi',
              'width': '150',
              'align': 'center',
              'undefined': {},
              'children': [
                {
                  'title': '上年同期',
                  'field': 'param165',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                },
                {
                  'title': '本期',
                  'field': 'param166',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                }
              ]
            },
            {
              'title': '1.8 财力安排用于暂付款消化金额',
              'field': 'ceshi',
              'width': '150',
              'align': 'center',
              'undefined': {},
              'children': [
                {
                  'title': '上年同期',
                  'field': 'param167',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                },
                {
                  'title': '本期',
                  'field': 'param168',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                }
              ]
            }
          ]
        },
        {
          'title': '2.财政供养人口（万人）',
          'field': 'ceshi',
          'width': '150',
          'align': 'center',
          'undefined': {},
          'children': [
            {
              'title': '上年同期',
              'field': 'param169',
              'width': '150',
              'align': 'center',
              'undefined': {}
            },
            {
              'title': '本期',
              'field': 'param170',
              'width': '150',
              'align': 'center',
              'undefined': {}
            }
          ]
        },
        {
          'title': '2.1 财政支开人数',
          'field': 'ceshi',
          'width': '150',
          'align': 'center',
          'undefined': {},
          'children': [
            {
              'title': '上年同期',
              'field': 'param171',
              'width': '150',
              'align': 'center',
              'undefined': {}
            },
            {
              'title': '本期',
              'field': 'param172',
              'width': '150',
              'align': 'center',
              'undefined': {}
            }
          ]
        },
        {
          'title': '2.2 财政补助开支人数',
          'field': 'ceshi',
          'width': '150',
          'align': 'center',
          'undefined': {},
          'children': [
            {
              'title': '上年同期',
              'field': 'param169',
              'width': '173',
              'align': 'center',
              'undefined': {}
            },
            {
              'title': '本期',
              'field': 'param174',
              'width': '150',
              'align': 'center',
              'undefined': {}
            }
          ]
        },
        {
          'title': '2.3 学生人数',
          'field': 'ceshi',
          'width': '150',
          'align': 'center',
          'undefined': {},
          'children': [
            {
              'title': '上年同期',
              'field': 'param175',
              'width': '150',
              'align': 'center',
              'undefined': {}
            },
            {
              'title': '本期',
              'field': 'param176',
              'width': '150',
              'align': 'center',
              'undefined': {}
            }
          ]
        },
        {
          'title': '3.库款情况',
          'field': 'ceshi',
          'width': '150',
          'align': 'center',
          'undefined': {},
          'children': [
            {
              'title': '上年同期',
              'field': 'param177',
              'width': '150',
              'align': 'center',
              'undefined': {}
            },
            {
              'title': '本期',
              'field': 'param178',
              'width': '150',
              'align': 'center',
              'undefined': {}
            }
          ]
        },
        {
          'title': '3.1 库款流入',
          'field': 'ceshi',
          'width': '150',
          'align': 'center',
          'undefined': {},
          'children': [
            {
              'title': '上年同期',
              'field': 'param179',
              'width': '150',
              'align': 'center',
              'undefined': {}
            },
            {
              'title': '本期',
              'field': 'param180',
              'width': '150',
              'align': 'center',
              'undefined': {}
            }
          ]
        },
        {
          'title': '3.1.1 转移性收入',
          'field': 'ceshi',
          'width': '150',
          'align': 'center',
          'undefined': {},
          'children': [
            {
              'title': '上年同期',
              'field': 'param181',
              'width': '150',
              'align': 'center',
              'undefined': {}
            },
            {
              'title': '本期',
              'field': 'param182',
              'width': '150',
              'align': 'center',
              'undefined': {}
            }
          ]
        },
        {
          'title': '3.1.2 暂付款收回',
          'field': 'ceshi',
          'width': '150',
          'align': 'center',
          'undefined': {},
          'children': [
            {
              'title': '上年同期',
              'field': 'param183',
              'width': '150',
              'align': 'center',
              'undefined': {}
            },
            {
              'title': '本期',
              'field': 'param184',
              'width': '150',
              'align': 'center',
              'undefined': {}
            }
          ]
        },
        {
          'title': '3.1.3 债卷收入',
          'field': 'ceshi',
          'width': '150',
          'align': 'center',
          'undefined': {},
          'children': [
            {
              'title': '上年同期',
              'field': 'param185',
              'width': '150',
              'align': 'center',
              'undefined': {}
            },
            {
              'title': '本期',
              'field': 'param186',
              'width': '150',
              'align': 'center',
              'undefined': {}
            }
          ]
        },
        {
          'title': '3.2 库款流出',
          'field': 'ceshi',
          'width': '150',
          'align': 'center',
          'undefined': {},
          'children': [
            {
              'title': '上年同期',
              'field': 'param187',
              'width': '150',
              'align': 'center',
              'undefined': {}
            },
            {
              'title': '本期',
              'field': 'param188',
              'width': '150',
              'align': 'center',
              'undefined': {}
            }
          ]
        },
        {
          'title': '3.2.1 转移性支出',
          'field': 'ceshi',
          'width': '150',
          'align': 'center',
          'undefined': {},
          'children': [
            {
              'title': '上年同期',
              'field': 'param189',
              'width': '150',
              'align': 'center',
              'undefined': {}
            },
            {
              'title': '本期',
              'field': 'param190',
              'width': '150',
              'align': 'center',
              'undefined': {}
            }
          ]
        },
        {
          'title': '3.2.2 暂付款流出',
          'field': 'ceshi',
          'width': '150',
          'align': 'center',
          'undefined': {},
          'children': [
            {
              'title': '上年同期',
              'field': 'param191',
              'width': '150',
              'align': 'center',
              'undefined': {}
            },
            {
              'title': '本期',
              'field': 'param192',
              'width': '150',
              'align': 'center',
              'undefined': {}
            }
          ]
        },
        {
          'title': '3.2.3 暂存库流出',
          'field': 'ceshi',
          'width': '150',
          'align': 'center',
          'undefined': {},
          'children': [
            {
              'title': '上年同期',
              'field': 'param193',
              'width': '150',
              'align': 'center',
              'undefined': {}
            },
            {
              'title': '本期',
              'field': 'param194',
              'width': '150',
              'align': 'center',
              'undefined': {}
            }
          ]
        },
        {
          'title': '3.3 库款保障倍数',
          'field': 'ceshi',
          'width': '150',
          'align': 'center',
          'undefined': {},
          'children': [
            {
              'title': '上年同期',
              'field': 'param195',
              'width': '150',
              'align': 'center',
              'undefined': {}
            },
            {
              'title': '本期',
              'field': 'param196',
              'width': '150',
              'align': 'center',
              'undefined': {}
            }
          ]
        }
      ],
      'className': '',
      'dragSort': null,
      'renderType': '',
      'renderName': '',
      'options': '',
      'defaultValue': '',
      'filters': '',
      'props': {},
      '_XID': 'row_192'
    },
    {
      'title': '五、直达资金类指标',
      'field': 'ceshi',
      'fixed': '',
      'width': '1050',
      'align': 'center',
      'formula': '',
      'constraint': '',
      'combinedType': '',
      'sortable': '1',
      'associatedQuery': {
        'queryMethods': '',
        'queryUrl': '',
        'params': {}
      },
      'children': [
        {
          'title': '1.上级下达直达资金金额',
          'field': 'ceshi',
          'width': '150',
          'align': 'center',
          'undefined': {},
          'children': [
            {
              'title': '上年同期',
              'field': 'param197',
              'width': '150',
              'align': 'center',
              'undefined': {}
            },
            {
              'title': '本期',
              'field': 'param198',
              'width': '150',
              'align': 'center',
              'undefined': {}
            }
          ]
        },
        {
          'title': '1.1 中央下达',
          'field': 'ceshi',
          'width': '150',
          'align': 'center',
          'undefined': {},
          'children': [
            {
              'title': '上年同期',
              'field': 'param199',
              'width': '150',
              'align': 'center',
              'undefined': {}
            },
            {
              'title': '本期',
              'field': 'param200',
              'width': '150',
              'align': 'center',
              'undefined': {}
            }
          ]
        },
        {
          'title': '1.2 地方安排',
          'field': 'ceshi',
          'width': '150',
          'align': 'center',
          'undefined': {},
          'children': [
            {
              'title': '上年同期',
              'field': 'param201',
              'width': '150',
              'align': 'center',
              'undefined': {}
            },
            {
              'title': '本期',
              'field': 'param202',
              'width': '150',
              'align': 'center',
              'undefined': {}
            }
          ]
        },
        {
          'title': '2.直达资金分配进度',
          'field': 'ceshi',
          'width': '150',
          'align': 'center',
          'undefined': {},
          'children': [
            {
              'title': '上年同期',
              'field': 'param203',
              'width': '150',
              'align': 'center',
              'undefined': {}
            },
            {
              'title': '本期',
              'field': 'param204',
              'width': '150',
              'align': 'center',
              'undefined': {}
            }
          ]
        },
        {
          'title': '2.1 中央下达资金分配进度',
          'field': 'ceshi',
          'width': '150',
          'align': 'center',
          'undefined': {},
          'children': [
            {
              'title': '上年同期',
              'field': 'param205',
              'width': '150',
              'align': 'center',
              'undefined': {}
            },
            {
              'title': '本期',
              'field': 'param206',
              'width': '150',
              'align': 'center',
              'undefined': {}
            }
          ]
        },
        {
          'title': '2.2 地方安排资金分配进度',
          'field': 'ceshi',
          'width': '150',
          'align': 'center',
          'undefined': {},
          'children': [
            {
              'title': '上年同期',
              'field': 'param207',
              'width': '150',
              'align': 'center',
              'undefined': {}
            },
            {
              'title': '本期',
              'field': 'param208',
              'width': '150',
              'align': 'center',
              'undefined': {}
            }
          ]
        },
        {
          'title': '3.直达资金支出金额',
          'field': 'ceshi',
          'width': '150',
          'align': 'center',
          'undefined': {},
          'children': [
            {
              'title': '上年同期',
              'field': 'param209',
              'width': '150',
              'align': 'center',
              'undefined': {}
            },
            {
              'title': '本期',
              'field': 'param210',
              'width': '150',
              'align': 'center',
              'undefined': {}
            }
          ]
        },
        {
          'title': '3.1 中央下达',
          'field': 'ceshi',
          'width': '150',
          'align': 'center',
          'undefined': {},
          'children': [
            {
              'title': '上年同期',
              'field': 'param211',
              'width': '150',
              'align': 'center',
              'undefined': {}
            },
            {
              'title': '本期',
              'field': 'param212',
              'width': '150',
              'align': 'center',
              'undefined': {}
            }
          ]
        },
        {
          'title': '3.2 地方安排',
          'field': 'ceshi',
          'width': '150',
          'align': 'center',
          'undefined': {},
          'children': [
            {
              'title': '上年同期',
              'field': 'param213',
              'width': '150',
              'align': 'center',
              'undefined': {}
            },
            {
              'title': '本期',
              'field': 'param214',
              'width': '150',
              'align': 'center',
              'undefined': {}
            }
          ]
        },
        {
          'title': '4.直达资金支出进度',
          'field': 'ceshi',
          'width': '150',
          'align': 'center',
          'undefined': {},
          'children': [
            {
              'title': '上年同期',
              'field': 'param215',
              'width': '150',
              'align': 'center',
              'undefined': {}
            },
            {
              'title': '本期',
              'field': 'param216',
              'width': '150',
              'align': 'center',
              'undefined': {}
            }
          ]
        },
        {
          'title': '4.1 中央下达资金支出进度',
          'field': 'ceshi',
          'width': '150',
          'align': 'center',
          'undefined': {},
          'children': [
            {
              'title': '上年同期',
              'field': 'param217',
              'width': '150',
              'align': 'center',
              'undefined': {}
            },
            {
              'title': '本期',
              'field': 'param218',
              'width': '150',
              'align': 'center',
              'undefined': {}
            }
          ]
        },
        {
          'title': '4.2 地方安排资金支出进度',
          'field': 'ceshi',
          'width': '150',
          'align': 'center',
          'undefined': {},
          'children': [
            {
              'title': '上年同期',
              'field': 'param219',
              'width': '150',
              'align': 'center',
              'undefined': {}
            },
            {
              'title': '本期',
              'field': 'param220',
              'width': '150',
              'align': 'center',
              'undefined': {}
            }
          ]
        }
      ],
      'className': '',
      'dragSort': null,
      'renderType': '',
      'renderName': '',
      'options': '',
      'defaultValue': '',
      'filters': '',
      'props': {},
      '_XID': 'row_192'
    },
    {
      'title': '六、政府债务类指标',
      'field': 'ceshi',
      'fixed': '',
      'width': '1050',
      'align': 'center',
      'formula': '',
      'constraint': '',
      'combinedType': '',
      'sortable': '1',
      'associatedQuery': {
        'queryMethods': '',
        'queryUrl': '',
        'params': {}
      },
      'children': [
        {
          'title': '1.政府债务限额',
          'field': 'ceshi',
          'width': '150',
          'align': 'center',
          'undefined': {},
          'children': [
            {
              'title': '上年同期',
              'field': 'param336',
              'width': '150',
              'align': 'center',
              'undefined': {}
            },
            {
              'title': '本期',
              'field': 'param337',
              'width': '150',
              'align': 'center',
              'undefined': {}
            }
          ]
        },
        {
          'title': '1.1 一般债卷',
          'field': 'ceshi',
          'width': '150',
          'align': 'center',
          'undefined': {},
          'children': [
            {
              'title': '上年同期',
              'field': 'param338',
              'width': '150',
              'align': 'center',
              'undefined': {}
            },
            {
              'title': '本期',
              'field': 'param339',
              'width': '150',
              'align': 'center',
              'undefined': {}
            }
          ]
        },
        {
          'title': '1.2 专项债卷',
          'field': 'ceshi',
          'width': '150',
          'align': 'center',
          'undefined': {},
          'children': [
            {
              'title': '上年同期',
              'field': 'param340',
              'width': '150',
              'align': 'center',
              'undefined': {}
            },
            {
              'title': '本期',
              'field': 'param341',
              'width': '150',
              'align': 'center',
              'undefined': {}
            }
          ]
        },
        {
          'title': '2.政府债务余额',
          'field': 'ceshi',
          'width': '150',
          'align': 'center',
          'undefined': {},
          'children': [
            {
              'title': '上年同期',
              'field': 'param342',
              'width': '150',
              'align': 'center',
              'undefined': {}
            },
            {
              'title': '本期',
              'field': 'param343',
              'width': '150',
              'align': 'center',
              'undefined': {}
            }
          ]
        },
        {
          'title': '2.1 一般债卷',
          'field': 'ceshi',
          'width': '150',
          'align': 'center',
          'undefined': {},
          'children': [
            {
              'title': '上年同期',
              'field': 'param344',
              'width': '150',
              'align': 'center',
              'undefined': {}
            },
            {
              'title': '本期',
              'field': 'param345',
              'width': '150',
              'align': 'center',
              'undefined': {}
            }
          ]
        },
        {
          'title': '2.2 专项债卷',
          'field': 'ceshi',
          'width': '150',
          'align': 'center',
          'undefined': {},
          'children': [
            {
              'title': '上年同期',
              'field': 'param346',
              'width': '150',
              'align': 'center',
              'undefined': {}
            },
            {
              'title': '本期',
              'field': 'param347',
              'width': '150',
              'align': 'center',
              'undefined': {}
            }
          ]
        },
        {
          'title': '3.年内新增政府债卷限额',
          'field': 'ceshi',
          'width': '150',
          'align': 'center',
          'undefined': {},
          'children': [
            {
              'title': '上年同期',
              'field': 'param348',
              'width': '150',
              'align': 'center',
              'undefined': {}
            },
            {
              'title': '本期',
              'field': 'param349',
              'width': '150',
              'align': 'center',
              'undefined': {}
            }
          ]
        },
        {
          'title': '3.1 一般债卷',
          'field': 'ceshi',
          'width': '150',
          'align': 'center',
          'undefined': {},
          'children': [
            {
              'title': '上年同期',
              'field': 'param350',
              'width': '150',
              'align': 'center',
              'undefined': {}
            },
            {
              'title': '本期',
              'field': 'param351',
              'width': '150',
              'align': 'center',
              'undefined': {}
            }
          ]
        },
        {
          'title': '3.2 专项债卷',
          'field': 'ceshi',
          'width': '150',
          'align': 'center',
          'undefined': {},
          'children': [
            {
              'title': '上年同期',
              'field': 'param352',
              'width': '150',
              'align': 'center',
              'undefined': {}
            },
            {
              'title': '本期',
              'field': 'param353',
              'width': '150',
              'align': 'center',
              'undefined': {}
            }
          ]
        },
        {
          'title': '4.年内发行债卷额',
          'field': 'ceshi',
          'width': '150',
          'align': 'center',
          'undefined': {},
          'children': [
            {
              'title': '上年同期',
              'field': 'param354',
              'width': '150',
              'align': 'center',
              'undefined': {}
            },
            {
              'title': '本期',
              'field': 'param355',
              'width': '150',
              'align': 'center',
              'undefined': {}
            }
          ]
        },
        {
          'title': '4.1 一般债卷',
          'field': 'ceshi',
          'width': '150',
          'align': 'center',
          'undefined': {},
          'children': [
            {
              'title': '上年同期',
              'field': 'param356',
              'width': '150',
              'align': 'center',
              'undefined': {}
            },
            {
              'title': '本期',
              'field': 'param357',
              'width': '150',
              'align': 'center',
              'undefined': {}
            }
          ]
        },
        {
          'title': '4.2 专项债卷',
          'field': 'ceshi',
          'width': '150',
          'align': 'center',
          'undefined': {},
          'children': [
            {
              'title': '上年同期',
              'field': 'param358',
              'width': '150',
              'align': 'center',
              'undefined': {}
            },
            {
              'title': '本期',
              'field': 'param359',
              'width': '150',
              'align': 'center',
              'undefined': {}
            }
          ]
        },
        {
          'title': '5.年内偿还债卷额',
          'field': 'ceshi',
          'width': '150',
          'align': 'center',
          'undefined': {},
          'children': [
            {
              'title': '上年同期',
              'field': 'param360',
              'width': '150',
              'align': 'center',
              'undefined': {}
            },
            {
              'title': '本期',
              'field': 'param361',
              'width': '150',
              'align': 'center',
              'undefined': {}
            }
          ]
        },
        {
          'title': '5.1 一般债卷',
          'field': 'ceshi',
          'width': '150',
          'align': 'center',
          'undefined': {},
          'children': [
            {
              'title': '上年同期',
              'field': 'param362',
              'width': '150',
              'align': 'center',
              'undefined': {}
            },
            {
              'title': '本期',
              'field': 'param363',
              'width': '150',
              'align': 'center',
              'undefined': {}
            }
          ]
        },
        {
          'title': '5.2 专项债卷',
          'field': 'ceshi',
          'width': '150',
          'align': 'center',
          'undefined': {},
          'children': [
            {
              'title': '上年同期',
              'field': 'param364',
              'width': '150',
              'align': 'center',
              'undefined': {}
            },
            {
              'title': '本期',
              'field': 'param365',
              'width': '150',
              'align': 'center',
              'undefined': {}
            }
          ]
        }
      ],
      'className': '',
      'dragSort': null,
      'renderType': '',
      'renderName': '',
      'options': '',
      'defaultValue': '',
      'filters': '',
      'props': {},
      '_XID': 'row_192'
    },
    {
      'title': '七、预算管理类指标',
      'field': 'ceshi',
      'fixed': '',
      'width': '1050',
      'align': 'center',
      'formula': '',
      'constraint': '',
      'combinedType': '',
      'sortable': '1',
      'associatedQuery': {
        'queryMethods': '',
        'queryUrl': '',
        'params': {}
      },
      'children': [
        {
          'title': '1.预算执行进度',
          'field': 'ceshi',
          'width': '150',
          'align': 'center',
          'undefined': {},
          'children': [
            {
              'title': '1.1 一般公共预算收入执行进度',
              'field': 'ceshi',
              'width': '150',
              'align': 'center',
              'undefined': {},
              'children': [
                {
                  'title': '上年同期',
                  'field': 'param221',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                },
                {
                  'title': '本期',
                  'field': 'param222',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                }
              ]
            },
            {
              'title': '1.2 一般公共预算支出执行进度',
              'field': 'ceshi',
              'width': '150',
              'align': 'center',
              'undefined': {},
              'children': [
                {
                  'title': '上年同期',
                  'field': 'param223',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                },
                {
                  'title': '本期',
                  'field': 'param224',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                }
              ]
            },
            {
              'title': '1.3 政府性基金预算收入执行进度',
              'field': 'ceshi',
              'width': '150',
              'align': 'center',
              'undefined': {},
              'children': [
                {
                  'title': '上年同期',
                  'field': 'param225',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                },
                {
                  'title': '本期',
                  'field': 'param226',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                }
              ]
            },
            {
              'title': '1.4 政府性基金预算支出执行进度',
              'field': 'ceshi',
              'width': '150',
              'align': 'center',
              'undefined': {},
              'children': [
                {
                  'title': '上年同期',
                  'field': 'param227',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                },
                {
                  'title': '本期',
                  'field': 'param228',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                }
              ]
            }
          ]
        },
        {
          'title': '2.预算数',
          'field': 'ceshi',
          'width': '150',
          'align': 'center',
          'undefined': {},
          'children': [
            {
              'title': '2.1 一般公共预算收入（含调整数）',
              'field': 'ceshi',
              'width': '150',
              'align': 'center',
              'undefined': {},
              'children': [
                {
                  'title': '上年同期',
                  'field': 'param229',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                },
                {
                  'title': '本期',
                  'field': 'param230',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                }
              ]
            },
            {
              'title': '其中：调整数',
              'field': 'ceshi',
              'width': '150',
              'align': 'center',
              'undefined': {},
              'children': [
                {
                  'title': '上年同期',
                  'field': 'param231',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                },
                {
                  'title': '本期',
                  'field': 'param232',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                }
              ]
            },
            {
              'title': '2.2 一般公共预算支出（含调整数）',
              'field': 'ceshi',
              'width': '150',
              'align': 'center',
              'undefined': {},
              'children': [
                {
                  'title': '上年同期',
                  'field': 'param233',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                },
                {
                  'title': '本期',
                  'field': 'param234',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                }
              ]
            },
            {
              'title': '其中：调整数',
              'field': 'ceshi',
              'width': '150',
              'align': 'center',
              'undefined': {},
              'children': [
                {
                  'title': '上年同期',
                  'field': 'param235',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                },
                {
                  'title': '本期',
                  'field': 'param236',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                }
              ]
            },
            {
              'title': '2.3 政府性基金预算收入（含调整数）',
              'field': 'ceshi',
              'width': '150',
              'align': 'center',
              'undefined': {},
              'children': [
                {
                  'title': '上年同期',
                  'field': 'param237',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                },
                {
                  'title': '本期',
                  'field': 'param238',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                }
              ]
            },
            {
              'title': '其中：调整数',
              'field': 'ceshi',
              'width': '150',
              'align': 'center',
              'undefined': {},
              'children': [
                {
                  'title': '上年同期',
                  'field': 'param239',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                },
                {
                  'title': '本期',
                  'field': 'param240',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                }
              ]
            },
            {
              'title': '2.4 政府性基金预算支出（含调整数）',
              'field': 'ceshi',
              'width': '150',
              'align': 'center',
              'undefined': {},
              'children': [
                {
                  'title': '上年同期',
                  'field': 'param241',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                },
                {
                  'title': '本期',
                  'field': 'param242',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                }
              ]
            },
            {
              'title': '其中：调整数',
              'field': 'ceshi',
              'width': '150',
              'align': 'center',
              'undefined': {},
              'children': [
                {
                  'title': '上年同期',
                  'field': 'param243',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                },
                {
                  'title': '本期',
                  'field': 'param244',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                }
              ]
            }
          ]
        },
        {
          'title': '3.暂付款',
          'field': 'ceshi',
          'width': '150',
          'align': 'center',
          'undefined': {},
          'children': [
            {
              'title': '3.1 暂付款期初余额',
              'field': 'ceshi',
              'width': '150',
              'align': 'center',
              'undefined': {},
              'children': [
                {
                  'title': '上年同期',
                  'field': 'param245',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                },
                {
                  'title': '本期',
                  'field': 'param246',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                }
              ]
            },
            {
              'title': '3.2 当年新增暂付款金额',
              'field': 'ceshi',
              'width': '150',
              'align': 'center',
              'undefined': {},
              'children': [
                {
                  'title': '上年同期',
                  'field': 'param247',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                },
                {
                  'title': '本期',
                  'field': 'param248',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                }
              ]
            },
            {
              'title': '3.3 当年减少暂付款金额',
              'field': 'ceshi',
              'width': '150',
              'align': 'center',
              'undefined': {},
              'children': [
                {
                  'title': '上年同期',
                  'field': 'param249',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                },
                {
                  'title': '本期',
                  'field': 'param250',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                }
              ]
            },
            {
              'title': '3.4 暂付款期末余额',
              'field': 'ceshi',
              'width': '150',
              'align': 'center',
              'undefined': {},
              'children': [
                {
                  'title': '上年同期',
                  'field': 'param251',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                },
                {
                  'title': '本期',
                  'field': 'param252',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                }
              ]
            }
          ]
        }
      ],
      'className': '',
      'dragSort': null,
      'renderType': '',
      'renderName': '',
      'options': '',
      'defaultValue': '',
      'filters': '',
      'props': {},
      '_XID': 'row_192'
    },
    {
      'title': '八、社会保险类指标',
      'field': 'ceshi',
      'fixed': '',
      'width': '1050',
      'align': 'center',
      'formula': '',
      'constraint': '',
      'combinedType': '',
      'sortable': '1',
      'associatedQuery': {
        'queryMethods': '',
        'queryUrl': '',
        'params': {}
      },
      'children': [
        {
          'title': '1.城乡居民养老保险基金',
          'field': 'ceshi',
          'width': '150',
          'align': 'center',
          'undefined': {},
          'children': [
            {
              'title': '1.1 当年基金收入',
              'field': 'ceshi',
              'width': '150',
              'align': 'center',
              'undefined': {},
              'children': [
                {
                  'title': '上年同期',
                  'field': 'param253',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                },
                {
                  'title': '本期',
                  'field': 'param254',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                }
              ]
            },
            {
              'title': '1.2 当年基金支出',
              'field': 'ceshi',
              'width': '150',
              'align': 'center',
              'undefined': {},
              'children': [
                {
                  'title': '上年同期',
                  'field': 'param255',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                },
                {
                  'title': '本期',
                  'field': 'param256',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                }
              ]
            },
            {
              'title': '1.3 基金累计金额',
              'field': 'ceshi',
              'width': '150',
              'align': 'center',
              'undefined': {},
              'children': [
                {
                  'title': '上年同期',
                  'field': 'param257',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                },
                {
                  'title': '本期',
                  'field': 'param258',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                }
              ]
            },
            {
              'title': '1.4 缴费人数',
              'field': 'ceshi',
              'width': '150',
              'align': 'center',
              'undefined': {},
              'children': [
                {
                  'title': '上年同期',
                  'field': 'param259',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                },
                {
                  'title': '本期',
                  'field': 'param260',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                }
              ]
            },
            {
              'title': '1.5 享受待遇人数',
              'field': 'ceshi',
              'width': '150',
              'align': 'center',
              'undefined': {},
              'children': [
                {
                  'title': '上年同期',
                  'field': 'param261',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                },
                {
                  'title': '本期',
                  'field': 'param262',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                }
              ]
            }
          ]
        },
        {
          'title': '2.城乡居民医疗保险基金',
          'field': 'ceshi',
          'width': '150',
          'align': 'center',
          'undefined': {},
          'children': [
            {
              'title': '2.1 当年基金收入',
              'field': 'ceshi',
              'width': '150',
              'align': 'center',
              'undefined': {},
              'children': [
                {
                  'title': '上年同期',
                  'field': 'param263',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                },
                {
                  'title': '本期',
                  'field': 'param264',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                }
              ]
            },
            {
              'title': '2.2 当年基金支出',
              'field': 'ceshi',
              'width': '150',
              'align': 'center',
              'undefined': {},
              'children': [
                {
                  'title': '上年同期',
                  'field': 'param265',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                },
                {
                  'title': '本期',
                  'field': 'param266',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                }
              ]
            },
            {
              'title': '2.3 基金累计金额',
              'field': 'ceshi',
              'width': '150',
              'align': 'center',
              'undefined': {},
              'children': [
                {
                  'title': '上年同期',
                  'field': 'param267',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                },
                {
                  'title': '本期',
                  'field': 'param268',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                }
              ]
            },
            {
              'title': '2.4 缴费人数',
              'field': 'ceshi',
              'width': '150',
              'align': 'center',
              'undefined': {},
              'children': [
                {
                  'title': '上年同期',
                  'field': 'param269',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                },
                {
                  'title': '本期',
                  'field': 'param270',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                }
              ]
            },
            {
              'title': '2.5 享受待遇人数',
              'field': 'ceshi',
              'width': '150',
              'align': 'center',
              'undefined': {},
              'children': [
                {
                  'title': '上年同期',
                  'field': 'param271',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                },
                {
                  'title': '本期',
                  'field': 'param272',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                }
              ]
            }
          ]
        },
        {
          'title': '3.职工养老保险基金',
          'field': 'ceshi',
          'width': '150',
          'align': 'center',
          'undefined': {},
          'children': [
            {
              'title': '3.1 当年基金收入',
              'field': 'ceshi',
              'width': '150',
              'align': 'center',
              'undefined': {},
              'children': [
                {
                  'title': '上年同期',
                  'field': 'param273',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                },
                {
                  'title': '本期',
                  'field': 'param274',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                }
              ]
            },
            {
              'title': '3.2 当年基金支出',
              'field': 'ceshi',
              'width': '150',
              'align': 'center',
              'undefined': {},
              'children': [
                {
                  'title': '上年同期',
                  'field': 'param275',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                },
                {
                  'title': '本期',
                  'field': 'param276',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                }
              ]
            },
            {
              'title': '3.3 基金累计金额',
              'field': 'ceshi',
              'width': '150',
              'align': 'center',
              'undefined': {},
              'children': [
                {
                  'title': '上年同期',
                  'field': 'param277',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                },
                {
                  'title': '本期',
                  'field': 'param278',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                }
              ]
            },
            {
              'title': '3.4 缴费人数',
              'field': 'ceshi',
              'width': '150',
              'align': 'center',
              'undefined': {},
              'children': [
                {
                  'title': '上年同期',
                  'field': 'param279',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                },
                {
                  'title': '本期',
                  'field': 'param280',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                }
              ]
            },
            {
              'title': '3.5 享受待遇人数',
              'field': 'ceshi',
              'width': '150',
              'align': 'center',
              'undefined': {},
              'children': [
                {
                  'title': '上年同期',
                  'field': 'param281',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                },
                {
                  'title': '本期',
                  'field': 'param282',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                }
              ]
            }
          ]
        },
        {
          'title': '4.机关事业单位养老保险基金',
          'field': 'ceshi',
          'width': '150',
          'align': 'center',
          'undefined': {},
          'children': [
            {
              'title': '4.1 当年基金收入',
              'field': 'ceshi',
              'width': '150',
              'align': 'center',
              'undefined': {},
              'children': [
                {
                  'title': '上年同期',
                  'field': 'param283',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                },
                {
                  'title': '本期',
                  'field': 'param284',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                }
              ]
            },
            {
              'title': '4.2 当年基金支出',
              'field': 'ceshi',
              'width': '150',
              'align': 'center',
              'undefined': {},
              'children': [
                {
                  'title': '上年同期',
                  'field': 'param285',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                },
                {
                  'title': '本期',
                  'field': 'param286',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                }
              ]
            },
            {
              'title': '4.3 基金累计金额',
              'field': 'ceshi',
              'width': '150',
              'align': 'center',
              'undefined': {},
              'children': [
                {
                  'title': '上年同期',
                  'field': 'param287',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                },
                {
                  'title': '本期',
                  'field': 'param288',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                }
              ]
            },
            {
              'title': '4.4 缴费人数',
              'field': 'ceshi',
              'width': '150',
              'align': 'center',
              'undefined': {},
              'children': [
                {
                  'title': '上年同期',
                  'field': 'param289',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                },
                {
                  'title': '本期',
                  'field': 'param290',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                }
              ]
            },
            {
              'title': '4.5 享受待遇人数',
              'field': 'ceshi',
              'width': '150',
              'align': 'center',
              'undefined': {},
              'children': [
                {
                  'title': '上年同期',
                  'field': 'param291',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                },
                {
                  'title': '本期',
                  'field': 'param292',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                }
              ]
            }
          ]
        },
        {
          'title': '5.社会保险基金预算',
          'field': 'ceshi',
          'width': '150',
          'align': 'center',
          'undefined': {},
          'children': [
            {
              'title': '5.1 社会保险基金预算收入',
              'field': 'ceshi',
              'width': '150',
              'align': 'center',
              'undefined': {},
              'children': [
                {
                  'title': '上年同期',
                  'field': 'param293',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                },
                {
                  'title': '本期',
                  'field': 'param294',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                }
              ]
            },
            {
              'title': '5.2 社会保险基金预算支出',
              'field': 'ceshi',
              'width': '150',
              'align': 'center',
              'undefined': {},
              'children': [
                {
                  'title': '上年同期',
                  'field': 'param295',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                },
                {
                  'title': '本期',
                  'field': 'param296',
                  'width': '150',
                  'align': 'center',
                  'undefined': {}
                }
              ]
            }
          ]
        }
      ],
      'className': '',
      'dragSort': null,
      'renderType': '',
      'renderName': '',
      'options': '',
      'defaultValue': '',
      'filters': '',
      'props': {},
      '_XID': 'row_192'
    }
  ],
  PoliciesTableColumns1: [
    {
      title: '年度',
      field: 'fiscalYear',
      sortable: false,
      align: 'center'
    },
    {
      title: '区划编码',
      field: 'mofDivCode',
      sortable: false
    },
    {
      title: '区划名称',
      field: 'mofDivName',
      sortable: false,
      align: 'center'
    },
    {
      title: '月份',
      field: 'month',
      sortable: false,
      align: 'center'
    },
    {
      title: '状态',
      field: 'status',
      sortable: false,
      align: 'center',
      'cellRender': {
        'name': '$vxeSelect',
        'options': [
          {
            'value': '-1',
            'label': '未录入'
          },
          {
            'value': '0',
            'label': '未提交'
          },
          {
            'value': '1',
            'label': '已提交'
          }],
        'defaultValue': '',
        'props': {}
      }
    }],
  PoliciesTableColumns2: [
    {
      title: '年度',
      field: 'fiscalYear',
      sortable: false,
      align: 'center'
    },
    {
      title: '区划编码',
      field: 'mofDivCode',
      sortable: false
    },
    {
      title: '区划名称',
      field: 'mofDivName',
      sortable: false,
      align: 'center'
    },
    {
      title: '月份',
      field: 'month',
      sortable: false,
      align: 'center'
    },
    {
      title: '创建人',
      field: 'createPersonName',
      sortable: false,
      align: 'center'
    },
    {
      title: '创建时间',
      field: 'createTime',
      sortable: false,
      align: 'center'
    },
    {
      title: '状态',
      field: 'status',
      sortable: false,
      align: 'center',
      'cellRender': {
        'name': '$vxeSelect',
        'options': [
          {
            'value': '-1',
            'label': '未录入'
          },
          {
            'value': '0',
            'label': '未提交'
          },
          {
            'value': '1',
            'label': '已提交'
          }],
        'defaultValue': '',
        'props': {}
      }
    }]
}
