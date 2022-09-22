// 专项转移支付调剂-新增-选择预算来源-指标列表头配置 | 调整-新增-指定来源的表头 | 调整-新增-选择预算来源-指标列表头配置
export default {
  '9165223': {
    tableCols: [
      {
        field: 'bgtExeFlag',
        title: '指标可执行标志',
        filters: false,
        width: 180,
        cellRender: {
          name: '$vxeSelect',
          options: [
            {
              value: '1',
              label: '1-可执行'
            },
            {
              value: '2',
              label: '2-待分'
            }]
        }
      },
      {
        title: '上级指标文号',
        field: 'corBgtDocNo',
        width: 180,
        filters: false,
        cellRender: {
          name: '$vxeInput'
        }
      },
      {
        title: '指标金额',
        field: 'aviAmt',
        combinedType: ['average', 'total', 'totalAll', 'switchTotal'],
        width: 180,
        filters: false,
        align: 'right',
        cellRender: { name: '$vxeMoney', props: { type: 'float', min: 0 } }
      },
      {
        title: '已用金额',
        field: 'voucherAviamt',
        combinedType: ['average', 'total', 'totalAll', 'switchTotal'],
        width: 180,
        filters: false,
        align: 'right',
        cellRender: { name: '$vxeMoney', props: { type: 'float', min: 0 } }
      },
      {
        title: '剩余金额',
        field: 'unuseBudgetAmt',
        combinedType: ['average', 'total', 'totalAll', 'switchTotal'],
        width: 180,
        filters: false,
        align: 'right',
        cellRender: { name: '$vxeMoney', props: { type: 'float', min: 0 } }
      },
      {
        title: '本次安排金额',
        field: 'adjCutamt',
        combinedType: ['average', 'total', 'totalAll', 'switchTotal'],
        width: 180,
        filters: false,
        align: 'right',
        cellRender: { name: '$vxeMoney', props: { type: 'float', min: 0 } }
      },
      {
        title: '主管业务处',
        field: 'manageMofDep',
        width: 180,
        filters: false,
        cellRender: {
          name: '$vxeTree',
          props: {
            config: {
              isHump: true
            }
          }
        }
      },
      {
        title: '资金主管处室',
        field: 'bgtMofDep',
        width: 180,
        filters: false,
        cellRender: {
          name: '$vxeTree',
          props: {
            config: {
              isHump: true
            }
          }
        }
      },
      {
        title: '资金性质',
        field: 'fundType',
        width: 180,
        filters: false,
        cellRender: {
          name: '$vxeTree',
          props: {
            config: {
              isHump: true
            }
          }
        }
      },
      {
        title: '资金来源',
        field: 'foundType',
        width: 180,
        filters: false,
        cellRender: {
          name: '$vxeTree',
          props: {
            config: {
              isHump: true
            }
          }
        }
      },
      {
        title: '指标类型',
        field: 'bgtType',
        width: 180,
        filters: false,
        cellRender: {
          name: '$vxeTree',
          props: {
            config: {
              isHump: true
            }
          }
        }
      },
      {
        field: 'docDate',
        title: '发文日期',
        width: 180,
        filters: false
      },
      {
        field: 'isTrack',
        title: '是否追踪',
        width: 180,
        filters: false,
        cellRender: {
          name: '$vxeSelect',
          options: [
            {
              value: '1',
              label: '是'
            },
            {
              value: '0',
              label: '否'
            }]
        }
      },
      {
        title: '指标来源类型',
        field: 'bgtSource',
        width: 180,
        filters: false,
        cellRender: {
          name: '$vxeTree',
          props: {
            config: {
              isHump: true
            }
          }
        }
      },
      {
        title: '指标来源',
        field: 'sourceType',
        width: 180,
        filters: false,
        cellRender: {
          name: '$vxeTree',
          props: {
            config: {
              isHump: true
            }
          }
        }
      },
      {
        title: '预算级次代码',
        field: 'budgetLevel',
        width: 180,
        filters: false,
        cellRender: {
          name: '$vxeTree',
          props: {
            config: {
              isHump: true
            }
          }
        }
      },
      {
        title: '支出功能科目',
        field: 'expFunc',
        width: 180,
        filters: false,
        cellRender: {
          name: '$vxeTree',
          props: {
            config: {
              isHump: true
            }
          }
        }
      },
      {
        title: '政府经济分类',
        field: 'govBgtEco',
        width: 180,
        filters: false,
        cellRender: {
          name: '$vxeTree',
          props: {
            config: {
              isHump: true
            }
          }
        }
      },
      {
        title: '收入分类科目',
        field: 'incomeSort',
        width: 180,
        filters: false,
        cellRender: {
          name: '$vxeTree',
          props: {
            config: {
              isHump: true
            }
          }
        }
      },
      {
        title: '转移支付功能分类科目',
        field: 'tpFunc',
        width: 220,
        filters: false,
        cellRender: {
          name: '$vxeTree',
          props: {
            config: {
              isHump: true
            }
          }
        }
      },
      {
        title: '项目名称',
        field: 'proName',
        width: 180,
        filters: false,
        align: 'left',
        cellRender: {
          name: '$vxeInput'
        }
      },
      {
        title: '项目代码',
        field: 'proCode',
        width: 180,
        filters: false,
        align: 'left',
        cellRender: {
          name: '$vxeInput'
        }
      },
      {
        title: '指标文标题',
        field: 'bgtDocTitle',
        width: 180,
        filters: false,
        align: 'left',
        cellRender: {
          name: '$vxeInput'
        }
      },
      {
        title: '指标说明',
        field: 'bgtDec',
        width: 180,
        filters: false,
        align: 'left',
        cellRender: {
          name: '$vxeInput'
        }
      }
    ],
    editTableCols: [],
    formItems: [],
    validateRules: {},
    extendAttrs: {},
    formData: {}
  }
}
