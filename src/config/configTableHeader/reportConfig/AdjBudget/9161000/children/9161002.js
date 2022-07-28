// minusBudgetColumns
export default {
  '9161002': {
    tableCols: [],
    editTableCols: [
      {
        title: '指标可执行标志',
        field: 'bgtExeFlag',
        sortable: false,
        filters: false,
        align: 'left',
        minWidth: 180,
        cellRender: {
          name: '$vxeSelect',
          props: {
            disabled: true
          },
          options: [
            {
              value: '2',
              label: '待分'
            },
            {
              value: '1',
              label: '可执行'
            }
          ]
        }
      },
      {
        title: '指标文号',
        field: 'corBgtDocNo',
        sortable: false,
        filters: false,
        align: 'left',
        minWidth: 180
      },
      {
        title: '财政内部机构',
        field: 'manageMofDep',
        align: 'left',
        minWidth: 180,
        sortable: false,
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
        align: 'left',
        minWidth: 180,
        sortable: false,
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
        align: 'left',
        minWidth: 180,
        sortable: false,
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
        align: 'left',
        minWidth: 180,
        sortable: false,
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
        title: '指标来源类型',
        field: 'bgtSource',
        align: 'left',
        minWidth: 180,
        sortable: false,
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
        title: '支出功能分类',
        field: 'expFunc',
        align: 'left',
        minWidth: 180,
        sortable: false,
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
        title: '政府支出经济分类',
        field: 'govBgtEco',
        sortable: false,
        filters: false,
        align: 'left',
        minWidth: 180,
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
        sortable: false,
        filters: false,
        align: 'left',
        minWidth: 180
      },
      {
        title: '指标金额',
        field: 'aviamt',
        minWidth: 180,
        sortable: false,
        filters: false,
        align: 'right',
        cellRender: {
          name: '$vxeMoney'
        },
        combinedType: ['average', 'subTotal', 'total', 'totalAll']
      },
      {
        title: '已安排计划金额',
        field: 'useamt',
        minWidth: 180,
        sortable: false,
        filters: false,
        align: 'right',
        cellRender: {
          name: '$vxeMoney'
        },
        combinedType: ['average', 'subTotal', 'total', 'totalAll']
      },
      {
        title: '已支付金额',
        field: 'voucherAviamt',
        minWidth: 180,
        sortable: false,
        filters: false,
        align: 'right',
        cellRender: {
          name: '$vxeMoney'
        },
        combinedType: ['average', 'subTotal', 'total', 'totalAll']
      },
      {
        title: '可追减金额',
        field: 'canuseamt',
        sortable: false,
        minWidth: 180,
        align: 'right',
        cellRender: {
          name: '$vxeMoney'
        },
        combinedType: ['average', 'subTotal', 'total', 'totalAll']
      },
      {
        title: '本次追减金额',
        field: 'minusAmt',
        minWidth: 180,
        sortable: false,
        filters: false,
        editRender: {
          name: '$vxeMoney',
          props: { disabled: false, min: 0 }
        },
        align: 'right',
        combinedType: ['average', 'subTotal', 'total', 'totalAll']
      }
    ],
    formItems: [],
    validateRules: {},
    extendAttrs: {},
    formData: {}
  }
}
