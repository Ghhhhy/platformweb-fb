// 专项转移支付调剂(追减)-新增-挑选指标的列表头
export default {
  '9165225': {
    tableCols: [
      {
        title: '项目名称',
        field: 'proName',
        sortable: false,
        filters: false,
        align: 'left',
        width: 200
      },
      {
        title: '项目标识',
        field: 'proCode',
        sortable: false,
        filters: false,
        align: 'left',
        width: 200
      },
      {
        title: '专项资金目录',
        field: 'speType',
        sortable: false,
        filters: false,
        width: 200,
        align: 'left',
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
        title: '指标可执行标志',
        field: 'bgtExeFlag',
        sortable: false,
        filters: false,
        align: 'left',
        width: 200,
        cellRender: {
          name: '$vxeSelect',
          props: {
            disabled: true
          },
          options: [{
            value: '1',
            label: '1-可执行'
          }, {
            value: '2',
            label: '2-待分'
          }]
        }
      },
      {
        title: '指标文号',
        field: 'corBgtDocNo',
        sortable: false,
        filters: false,
        align: 'left',
        width: 200
      },
      {
        title: '主管业务处室',
        field: 'bgtMofDepName',
        sortable: false,
        filters: false,
        width: 200,
        align: 'left',
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
        sortable: false,
        filters: false,
        width: 200,
        align: 'left',
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
        sortable: false,
        filters: false,
        width: 200,
        align: 'left',
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
        sortable: false,
        filters: false,
        width: 200,
        align: 'left',
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
        sortable: false,
        filters: false,
        width: 200,
        align: 'left',
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
        sortable: false,
        filters: false,
        width: 200,
        align: 'left',
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
        sortable: false,
        filters: false,
        width: 200,
        align: 'left',
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
        width: 200,
        align: 'left',
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
        title: '指标金额',
        field: 'aviamt',
        sortable: false,
        filters: false,
        width: 200,
        align: 'right',
        combinedType: ['average', 'subTotal', 'total', 'totalAll'],
        cellRender: {
          name: '$vxeMoney',
          props: {
            type: 'float',
            min: 0
          }
        }
      },
      {
        title: '已安排计划金额',
        field: 'useamt',
        sortable: false,
        filters: false,
        width: 200,
        align: 'right',
        combinedType: ['average', 'subTotal', 'total', 'totalAll'],
        cellRender: {
          name: '$vxeMoney',
          props: {
            type: 'float',
            min: 0
          }
        }
      },
      {
        title: '已支付金额',
        field: 'voucherAviamt',
        sortable: false,
        filters: false,
        width: 200,
        align: 'right',
        combinedType: ['average', 'subTotal', 'total', 'totalAll'],
        cellRender: {
          name: '$vxeMoney',
          props: {
            type: 'float',
            min: 0
          }
        }
      },
      {
        title: '可追减金额',
        field: 'canuseamt',
        sortable: false,
        filters: false,
        width: 200,
        align: 'right',
        combinedType: ['average', 'subTotal', 'total', 'totalAll'],
        cellRender: {
          name: '$vxeMoney',
          props: {
            type: 'float',
            min: 0
          }
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
