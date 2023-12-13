import store from '@/store/index'
import { proconf as warningQuery } from '@/views/main/fundMonitoring/violationHandle/warningCreate/warningQuery.js'
const sqlWarnLevelForColorFieldMapping = { // 从处室生成/查询过来得colorType
  '1': 'red',
  '2': 'orange',
  '3': 'yellow',
  '4': 'blue',
  '5': 'gray'// 目前只有陕西有灰
}
const proconf = {
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
      { code: 'export', label: '导出', status: 'primary' }
    ]
  },
  statusRightToolBarButtonByBusDept: {
    '1': [
      { code: 'export', label: '导出', status: 'primary' }
    ]
  },
  incomeMsgConfig: [
    {
      field: 'warningCode',
      title: '监控数据编码',
      titleWidth: '180',
      span: 8,
      itemRender: {
        name: '$vxeInput',
        props: { placeholder: '监控数据编码', disabled: true }
      }
    },
    {
      field: 'payAppNo',
      title: '支付申请编号',
      titleWidth: '180',
      span: 8,
      itemRender: {
        name: '$vxeInput',
        props: { placeholder: '支付申请编号', disabled: true }
      }
    },
    {
      field: 'agencyName',
      title: '预算单位',
      titleWidth: '180',
      span: 8,
      itemRender: {
        name: '$vxeInput',
        props: { placeholder: '预算单位', disabled: true }
      }
    },
    {
      field: 'corBgtDocNoName',
      title: '指标文号',
      titleWidth: '180',
      span: 8,
      itemRender: {
        name: '$vxeInput',
        props: { placeholder: '指标文号', disabled: true }
      }
    },
    {
      title: '预算项目',
      field: 'proName',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '预算项目' } }
    },
    {
      title: '收支类别',
      field: 'proCatName',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '收支类别' }
      }
    },
    {
      title: '付款人',
      field: 'payAcctName',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '付款人' }
      }
    },
    {
      title: '付款人账号',
      field: 'payAcctNo',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '付款人账号' }
      }
    },
    {
      title: '付款银行',
      field: 'payAcctBankName',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '付款银行' }
      }
    },
    {
      title: '收款人',
      field: 'payeeAcctName',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '收款人' }
      }
    },
    {
      title: '收款人账号',
      field: 'payeeAcctNo',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '收款人账号' }
      }
    },
    {
      title: '收款银行',
      field: 'payeeAcctBankName',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '收款银行' }
      }
    },
    {
      field: 'payAppAmt',
      title: '支付金额',
      titleWidth: '180',
      span: 8,
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '支付金额' }
      }
    },
    {
      title: '资金用途',
      field: 'useDes',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '资金用途' }
      }
    },
    {
      title: '政府经济分类',
      field: 'govBgtEcoName',
      titleWidth: '180',
      span: 8,
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '政府经济分类' }
      }
    },
    {
      title: '部门经济分类',
      field: 'depBgtEcoName',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '部门经济分类' }
      }
    },
    {
      title: '资金性质',
      field: 'fundTypeName',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '资金性质' }
      }
    },
    {
      title: '功能分类',
      field: 'expFuncName',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '功能分类' }
      }
    },
    {
      title: '支付方式',
      field: 'payTypeName',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '支付方式' }
      }
    },
    {
      title: '结算方式',
      field: 'setModeName',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '结算方式' }
      }
    },
    {
      title: '业务处室',
      field: 'manageMofDepName',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '业务处室' }
      }
    },
    {
      title: '工资标识',
      field: 'isSalName',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '工资标识' }
      }
    },
    {
      title: '是否工会经费',
      field: 'isFunName',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '是否工会经费' }
      }
    },
    {
      title: '三公经费',
      field: 'thrExpName',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '三公经费' }
      }
    },
    {
      title: '直达资金标识',
      field: 'isDirName',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '直达资金标识' }
      }
    },
    {
      title: '监控时间',
      field: 'fiDate',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { type: 'datetime', disabled: true, placeholder: '监控时间' }
      }
    }
  ],
  incomeMsgData: {
    warningCode: '',
    payApplyNumber: '',
    agencyName: '',
    targetDocNum: '',
    projectName: '',
    projectTypeName: '',
    payer: '',
    payAccount: '',
    payBankName: '',
    payee: '',
    receiveAccount: '',
    receiveBankName: '',
    paymentAmount: '',
    useOfFunds: '',
    govEconomyType: '',
    deptEconomyType: '',
    natureOfFunds: '',
    funcType: '',
    paymentMethod: '',
    settlementMethod: '',
    businessOffice: '',
    salaryMark: '',
    isUnionFunds: '',
    isThrExp: '',
    directFund: '',
    createTime: '',
    fiDate: ''
  },
  highQueryConfig: [
    /*
    {
      title: '监控主题',
      field: 'regulationClass',
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
            'placeholder': '监控主题',
            'multiple': false,
            'readonly': true,
            'isleaf': true
          }
        }
      }
    },
    */
    {
      title: '监控规则',
      field: 'ruleCodes',
      width: '8',
      align: 'left',
      name: '$vxeTree',
      itemRender: {
        name: '$vxeTree',
        options: [],
        props: {
          config: {
            valueKeys: ['code', 'name', 'id', 'codeFragment'],
            format: '{name}',
            treeProps: {
              labelFormat: '{code}-{name}', // {code}-{name}
              nodeKey: 'id',
              label: 'label',
              children: 'children'
            },
            placeholder: '监控规则',
            clearable: true,
            multiple: true,
            readonly: false,
            isleaf: true
          }
        }
      }
    },
    {
      title: store.getters.isFuJian ? '预警开始时间' : '警告开始时间',
      field: 'warnStartDate',
      sortable: false,
      align: 'left',
      itemRender: {
        name: '$vxeTime',
        clearable: true,
        defaultValue: '',
        format: 'YYYY-MM-DD',
        props: {
          clearable: true,
          type: 'date', //
          placeholder: store.getters.isFuJian ? '预警开始时间' : '警告开始时间'
        }
      }
    },
    {
      title: store.getters.isFuJian ? '预警结束时间' : '警告结束时间',
      field: 'warnEndDate',
      sortable: false,
      align: 'left',
      itemRender: {
        name: '$vxeTime',
        defaultValue: '',
        format: 'YYYY-MM-DD',
        props: {
          clearable: true,
          type: 'date', //
          placeholder: store.getters.isFuJian ? '预警结束时间' : '警告结束时间'
        }
      }
    },
    {
      title: '开始处理时间',
      field: 'dealWarnStartDate',
      sortable: false,
      align: 'left',
      itemRender: {
        name: '$vxeTime',
        defaultValue: '',
        format: 'YYYY-MM-DD',
        props: {
          clearable: true,
          type: 'date', //
          placeholder: '开始处理时间'
        }
      }
    },
    {
      title: '结束处理时间',
      field: 'dealWarnEndDate',
      sortable: false,
      align: 'left',
      itemRender: {
        name: '$vxeTime',
        defaultValue: '',
        format: 'YYYY-MM-DD',
        props: {
          clearable: true,
          type: 'date', //
          placeholder: '结束处理时间'
        }
      }
    },
    {
      title: '业务模块',
      field: 'businessModuleName',
      width: '8',
      align: 'left',
      formula: '',
      name: '$vxeSelect',
      itemRender: {
        name: '$vxeSelect',
        options: [
          { value: '预算执行', label: '预算执行' },
          { value: '预算管理', label: '预算管理' }
        ],
        props: {
          clearable: true,
          placeholder: '业务模块'
        }
      }
    }
  ],
  highQueryData: {
    regulationClass: '',
    fiRuleName: '',
    ruleCodes: '',
    warnStartDate: '',
    warnEndDate: '',
    dealWarnStartDate: '',
    dealWarnEndDate: ''
  },
  basicInfo: {
    type: 'form',
    tableConfig: {
      globalConfig: {
        // 全局配置
        seq: true // 序号列
      }
    },
    tableColumnsConfig: [
      {
        title: '规则名称',
        field: 'fiRuleName',
        sortable: true,
        align: 'center',
        width: 200
      },
      {
        title: `${store.getters.dict.find(item => String(item.value) === '1')?.label}`,
        field: 'level1',
        sortable: false,
        align: 'center',
        // width: 400,
        children: [
          {
            title: '预警数据',
            field: `${sqlWarnLevelForColorFieldMapping[1]}UndoNum`,
            warnLevel: '1',
            dealLevel: 'Undo',
            filters: false,
            align: 'center',
            // width: 100,
            cellRender: {
              name: `$vxeIcon${store.getters.dict.find(item => String(item.value) === '1')?.lightIconNumber || ''}`
            }
          },
          {
            title: '生成问询单',
            sortable: false,
            align: 'center',
            // width: 300,
            children: [
              {
                title: '认定正常',
                field: `${sqlWarnLevelForColorFieldMapping[1]}NormalNum`,
                align: 'center',
                warnLevel: '1',
                dealLevel: 'Normal',
                filters: false,
                width: 100,
                cellRender: {
                  name: '$vxeIcon3'
                }
              },
              {
                title: '已整改',
                field: `${sqlWarnLevelForColorFieldMapping[1]}DoneNum`,
                filters: false,
                warnLevel: '1',
                dealLevel: 'Done',
                align: 'center',
                // width: 100,
                cellRender: {
                  name: '$vxeIcon3'
                }
              },
              {
                title: '未完成',
                field: `${sqlWarnLevelForColorFieldMapping[1]}NotRectifiedNum`,
                filters: false,
                align: 'center',
                warnLevel: '1',
                dealLevel: 'NotRectified',
                // width: 100,
                cellRender: {
                  name: `$vxeIcon${store.getters.dict.find(item => String(item.value) === '1')?.lightIconNumber || ''}`
                }
              }
            ]
          }
        ]
      },
      {
        title: `${store.getters.dict.find(item => String(item.value) === '2')?.label}`,
        field: 'level2',
        // width: 400,
        sortable: false,
        align: 'center',
        children: [
          {
            title: '预警数据',
            field: `${sqlWarnLevelForColorFieldMapping[2]}UndoNum`,
            filters: false,
            warnLevel: '2',
            dealLevel: 'Undo',
            align: 'center',
            // width: 100,
            cellRender: {
              name: `$vxeIcon${store.getters.dict.find(item => String(item.value) === '2')?.lightIconNumber || ''}`
            }
          },
          {
            title: '生成问询单',
            sortable: false,
            align: 'center',
            // width: 300,
            children: [
              {
                title: '认定正常',
                field: `${sqlWarnLevelForColorFieldMapping[2]}NormalNum`,
                align: 'center',
                width: 100,
                warnLevel: '2',
                dealLevel: 'Normal',
                filters: false,
                cellRender: {
                  name: '$vxeIcon3'
                }
              },
              {
                title: '已整改',
                field: `${sqlWarnLevelForColorFieldMapping[2]}DoneNum`,
                filters: false,
                align: 'center',
                warnLevel: '2',
                dealLevel: 'Done',
                // width: 100,
                cellRender: {
                  name: '$vxeIcon3'
                }
              },
              {
                title: '未完成',
                field: `${sqlWarnLevelForColorFieldMapping[2]}NotRectifiedNum`,
                filters: false,
                // width: 100,
                warnLevel: '2',
                dealLevel: 'NotRectified',
                align: 'center',
                cellRender: {
                  name: `$vxeIcon${store.getters.dict.find(item => String(item.value) === '2')?.lightIconNumber || ''}`
                }
              }
            ]
          }
        ]
      },
      {
        title: `${store.getters.dict.find(item => String(item.value) === '3')?.label}`,
        field: 'level3',
        sortable: false,
        // width: 500,
        align: 'center',
        children: [
          {
            title: '预警数据',
            field: `${sqlWarnLevelForColorFieldMapping[3]}UndoNum`,
            filters: false,
            warnLevel: '3',
            dealLevel: 'Undo',
            align: 'center',
            // width: 100,
            cellRender: {
              name: `$vxeIcon${store.getters.dict.find(item => String(item.value) === '3')?.lightIconNumber || ''}`
            }
          },
          {
            title: '生成问询单',
            sortable: false,
            align: 'center',
            // width: 300,
            children: [
              {
                title: '认定正常',
                field: `${sqlWarnLevelForColorFieldMapping[3]}NormalNum`,
                align: 'center',
                warnLevel: '3',
                dealLevel: 'Normal',
                filters: false,
                // width: 100,
                cellRender: {
                  name: '$vxeIcon3'
                }
              },
              {
                title: '已整改',
                field: `${sqlWarnLevelForColorFieldMapping[3]}DoneNum`,
                filters: false,
                align: 'center',
                warnLevel: '3',
                dealLevel: 'Done',
                // width: 100,
                cellRender: {
                  name: '$vxeIcon3'
                }
              },
              {
                title: '未完成',
                field: `${sqlWarnLevelForColorFieldMapping[3]}NotRectifiedNum`,
                filters: false,
                warnLevel: '3',
                dealLevel: 'NotRectified',
                align: 'center',
                // width: 100,
                cellRender: {
                  name: `$vxeIcon${store.getters.dict.find(item => String(item.value) === '3')?.lightIconNumber || ''}`
                }
              }
            ]
          }
        ]
      }
    ],
    tableData: []
  }
}
if (store.getters.isNeiMeng) { // 内蒙要求 [直达资金监控处理单查询] 查询条件和 [直达资金监控处理单查询(全辖)] 相同
  proconf.highQueryConfig = warningQuery.highQueryConfig
  proconf.highQueryData = warningQuery.highQueryData
}
export default function (tableType, configType) {
  if (tableType && configType) {
    return window.deepCopy(proconf[tableType][configType])
  } else if (tableType) {
    return window.deepCopy(proconf[tableType])
  } else {
    return null
  }
}
