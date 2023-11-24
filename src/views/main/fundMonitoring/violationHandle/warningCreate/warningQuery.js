// import store from '@/store/index'
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
    {
      title: '规则',
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
            placeholder: '规则',
            clearable: true,
            multiple: true,
            readonly: false,
            isleaf: true
          }
        }
      }
    }, {
      title: '支付时间',
      field: 'xpayDate',
      itemRender: {
        name: '$vxeInput',
        defaultValue: '',
        props: {
          clearable: true,
          format: 'YYYY-MM-DD',
          type: 'date', // "当前日期为：YYYY-MM-DD，星期W，为第Q季度，时间为：hh:mm:ss:c"
          placeholder: '支付时间',
          'value-format': 'yyyy-MM-dd 00:00:00',
          'label-format': 'yyyy-MM-dd'
        }
      }
    },
    {
      title: '触发监控时间',
      field: 'triggerMonitorDate',
      itemRender: {
        name: '$vxeInput',
        defaultValue: '',
        props: {
          clearable: true,
          format: 'YYYY-MM-DD',
          type: 'date', // "当前日期为：YYYY-MM-DD，星期W，为第Q季度，时间为：hh:mm:ss:c"
          placeholder: '触发监控时间'
        }
      }
    },
    {
      title: '追踪项目',
      field: 'trackProCode',
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
            placeholder: '追踪项目',
            clearable: true,
            multiple: true,
            readonly: false,
            isleaf: true
          }
        }
      }
    },
    {
      title: '警告开始时间',
      field: 'warnStartDate',
      sortable: false,
      align: 'left',
      itemRender: {
        name: '$vxeTime',
        defaultValue: '',
        format: 'YYYY-MM-DD',
        props: {
          clearable: true,
          type: 'date', //
          placeholder: '警告开始时间'
        }
      }
    },
    {
      title: '警告结束时间',
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
          placeholder: '警告结束时间'
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
      title: '指标接收开始时间',
      field: 'recStartTime',
      sortable: false,
      align: 'left',
      itemRender: {
        name: '$vxeTime',
        defaultValue: '',
        format: 'YYYY-MM-DD',
        props: {
          clearable: true,
          type: 'date', //
          placeholder: '指标接收开始时间',
          'value-format': 'yyyy-MM-dd 00:00:00',
          'label-format': 'yyyy-MM-dd'
        }
      }
    },
    {
      title: '指标接收截止时间',
      field: 'recEndTime',
      sortable: false,
      align: 'left',
      itemRender: {
        name: '$vxeTime',
        defaultValue: '',
        format: 'YYYY-MM-DD',
        props: {
          clearable: true,
          type: 'date', //
          placeholder: '指标接收截止时间',
          'value-format': 'yyyy-MM-dd 23:59:59',
          'label-format': 'yyyy-MM-dd'
        }
      }
    },
    {
      title: '支付开始时间',
      field: 'xPayDateStart',
      sortable: false,
      align: 'left',
      itemRender: {
        name: '$vxeTime',
        defaultValue: '',
        format: 'YYYY-MM-DD',
        props: {
          clearable: true,
          type: 'date', //
          placeholder: '支付开始时间',
          'value-format': 'yyyy-MM-dd 00:00:00',
          'label-format': 'yyyy-MM-dd'
        }
      }
    },
    {
      title: '支付截止时间',
      field: 'xPayDateEnd',
      sortable: false,
      align: 'left',
      itemRender: {
        name: '$vxeTime',
        defaultValue: '',
        format: 'YYYY-MM-DD',
        props: {
          clearable: true,
          type: 'date', //
          placeholder: '支付截止时间',
          'value-format': 'yyyy-MM-dd 23:59:59',
          'label-format': 'yyyy-MM-dd'
        }
      }
    }
  ],
  highQueryConfigHLJ: [
    {
      title: '支付时间',
      field: 'xpayDate',
      width: 200,
      itemRender: {
        name: '$vxeTime',
        defaultValue: '',
        props: {
          clearable: true,
          format: 'YYYY-MM-DD',
          type: 'date',
          placeholder: '支付时间'
        }
      }
    }, {
      title: '触发监控时间',
      field: 'triggerMonitorDate',
      width: 200,
      itemRender: {
        name: '$vxeTime',
        defaultValue: '',
        props: {
          clearable: true,
          format: 'YYYY-MM-DD',
          type: 'date',
          placeholder: '触发监控时间'
        }
      }
    }
  ],
  highQueryData: {
    fiscalYear: '',
    fiRuleCode_code__multiple: '',
    fiRuleCode: '',
    ruleCodes: '',
    xpayDate: '',
    triggerMonitorDate: '',
    trackProCodeList: '',
    warnStartDate: '',
    warnEndDate: '',
    dealWarnStartDate: '',
    dealWarnEndDate: '',
    recStartTime: '',
    recEndTime: '',
    xPayDateStart: '',
    xPayDateEnd: ''
  },
  highQueryDataHLJ: {
    xpayDate: '',
    triggerMonitorDate: ''
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
        title: '地区名称',
        treeNode: true,
        align: 'left',
        width: 260,
        field: 'name',
        filters: false,
        cellRender: {
          name: '$vxeIcon'
        }
      },
      {
        title: '橙色预警',
        field: '',
        sortable: false,
        align: 'center',
        children: [
          {
            title: '预警数据',
            field: 'orangeUndoNum',
            filters: false,
            align: 'center',
            cellRender: {
              name: '$vxeIcon6',
              props: {
                $refs: this
              }
            }
          },
          {
            title: '生成问询单',
            sortable: false,
            align: 'center',
            children: [
              {
                title: '认定正常',
                field: 'orangeNormalNum',
                align: 'center',
                filters: false,
                cellRender: {
                  name: '$vxeIcon3',
                  props: {
                    $refs: this
                  }
                }
              },
              {
                title: '已整改',
                field: 'orangeDoneNum',
                filters: false,
                align: 'center',
                cellRender: {
                  name: '$vxeIcon3',
                  props: {
                    $refs: this
                  }
                }
              },
              {
                title: '未完成',
                field: 'orangeNotRectifiedNum',
                filters: false,
                align: 'center',
                cellRender: {
                  name: '$vxeIcon6',
                  props: {
                    $refs: this
                  }
                }
              }
            ]
          }
        ]
      },
      {
        title: '黄色预警',
        field: '',
        sortable: false,
        align: 'center',
        children: [
          {
            title: '预警数据',
            field: 'yellowUndoNum',
            filters: false,
            align: 'center',
            cellRender: {
              name: '$vxeIcon2',
              props: {
                $refs: this
              }
            }
          },
          {
            title: '生成问询单',
            sortable: false,
            align: 'center',
            children: [
              {
                title: '认定正常',
                field: 'yellowNormalNum',
                align: 'center',
                filters: false,
                cellRender: {
                  name: '$vxeIcon3',
                  props: {
                    $refs: this
                  }
                }
              },
              {
                title: '已整改',
                field: 'yellowDoneNum',
                filters: false,
                align: 'center',
                cellRender: {
                  name: '$vxeIcon3',
                  props: {
                    $refs: this
                  }
                }
              },
              {
                title: '未完成',
                field: 'yellowNotRectifiedNum',
                filters: false,
                align: 'center',
                cellRender: {
                  name: '$vxeIcon2',
                  props: {
                    $refs: this
                  }
                }
              }
            ]
          }
        ]
      },
      {
        title: '蓝色预警',
        field: '',
        sortable: false,
        align: 'center',
        children: [
          {
            title: '预警数据',
            field: 'blueUndoNum',
            filters: false,
            align: 'center',
            cellRender: {
              name: '$vxeIcon7',
              props: {
                $refs: this
              }
            }
          },
          {
            title: '生成问询单',
            sortable: false,
            align: 'center',
            children: [
              {
                title: '认定正常',
                field: 'blueNormalNum',
                align: 'center',
                filters: false,
                cellRender: {
                  name: '$vxeIcon3',
                  props: {
                    $refs: this
                  }
                }
              },
              {
                title: '已整改',
                field: 'blueDoneNum',
                filters: false,
                align: 'center',
                cellRender: {
                  name: '$vxeIcon3',
                  props: {
                    $refs: this
                  }
                }
              },
              {
                title: '未完成',
                field: 'blueNotRectifiedNum',
                filters: false,
                align: 'center',
                cellRender: {
                  name: '$vxeIcon7',
                  props: {
                    $refs: this
                  }
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
export {
  proconf
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
