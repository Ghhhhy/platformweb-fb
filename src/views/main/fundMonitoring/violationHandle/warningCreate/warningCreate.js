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
    {
      title: '监控规则',
      field: 'fiRuleName',
      width: '8',
      align: 'left',
      formula: '',
      name: '$vxeInput',
      itemRender: {
        name: '$vxeInput',
        options: [],
        props: {
          placeholder: '监控规则'
        }
      }
    }
  ],
  highQueryData: {
    regulationClass: '',
    fiRuleName: ''
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
      // {
      //   title: '红色预警',
      //   field: '',
      //   width: 500,
      //   sortable: false,
      //   align: 'center',
      //   children: [
      //     {
      //       title: '预警数据',
      //       field: 'redUndoNum',
      //       filters: false,
      //       align: 'center',
      //       width: 200,
      //       cellRender: {
      //         name: '$vxeIcon6',
      //         props: {
      //           $refs: this
      //         }
      //       }
      //     },
      //     {
      //       title: '生成问询单',
      //       sortable: false,
      //       align: 'center',
      //       width: 300,
      //       children: [
      //         {
      //           title: '认定正常',
      //           field: 'redNormalNum',
      //           align: 'center',
      //           filters: false,
      //           width: 100,
      //           cellRender: {
      //             name: '$vxeIcon3',
      //             props: {
      //               $refs: this
      //             }
      //           }
      //         },
      //         {
      //           title: '已整改',
      //           field: 'redDoneNum',
      //           filters: false,
      //           align: 'center',
      //           width: 100,
      //           cellRender: {
      //             name: '$vxeIcon3',
      //             props: {
      //               $refs: this
      //             }
      //           }
      //         },
      //         {
      //           title: '未完成',
      //           field: 'redNotRectifiedNum',
      //           filters: false,
      //           align: 'center',
      //           width: 100,
      //           cellRender: {
      //             name: '$vxeIcon6',
      //             props: {
      //               $refs: this
      //             }
      //           }
      //         }
      //       ]
      //     }
      //   ]
      // },
      {
        title: '橙色预警',
        field: '',
        sortable: false,
        align: 'center',
        width: 400,
        children: [
          {
            title: '预警数据',
            field: 'orangeUndoNum',
            filters: false,
            align: 'center',
            width: 100,
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
            width: 300,
            children: [
              {
                title: '认定正常',
                field: 'orangeNormalNum',
                align: 'center',
                filters: false,
                width: 100,
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
                width: 100,
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
                width: 100,
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
        width: 400,
        sortable: false,
        align: 'center',
        children: [
          {
            title: '预警数据',
            field: 'yellowUndoNum',
            filters: false,
            align: 'center',
            width: 100,
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
            width: 300,
            children: [
              {
                title: '认定正常',
                field: 'yellowNormalNum',
                align: 'center',
                width: 100,
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
                width: 100,
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
                width: 100,
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
        width: 500,
        align: 'center',
        children: [
          {
            title: '预警数据',
            field: 'blueUndoNum',
            filters: false,
            align: 'center',
            width: 100,
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
            width: 300,
            children: [
              {
                title: '认定正常',
                field: 'blueNormalNum',
                align: 'center',
                filters: false,
                width: 100,
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
                width: 100,
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
                width: 100,
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
export default function (tableType, configType) {
  if (tableType && configType) {
    return window.deepCopy(proconf[tableType][configType])
  } else if (tableType) {
    return window.deepCopy(proconf[tableType])
  } else {
    return null
  }
}
