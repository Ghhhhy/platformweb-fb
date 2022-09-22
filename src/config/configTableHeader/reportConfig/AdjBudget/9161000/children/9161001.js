// fiscalMinusLrCloumns
export default {
  '9161001': {
    tableCols: [
      {
        title: '指标文号',
        field: 'docNo',
        align: 'left',
        minWidth: 180,
        sortable: false,
        tooltip: true,
        visible: true,
        formatter: ''
      },
      {
        title: '指标调整文号',
        field: 'adjDocNo',
        align: 'left',
        minWidth: 180,
        sortable: false,
        tooltip: true,
        visible: true,
        formatter: ''
      },
      {
        title: '项目单位',
        field: 'agency',
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
        minWidth: 180,
        align: 'left',
        cellRender: {
          name: '$href'
        }
      },
      {
        title: '支出功能分类',
        field: 'expFunc',
        sortable: false,
        minWidth: 180,
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
        title: '部门支出经济分类',
        field: 'depBgtEco',
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
      // {
      //   title: '预算金额（小计）',
      //   field: 'budgetSum', // todo
      //   minWidth: 180,
      //   sortable: false,
      //   filters: false,
      //   editRender: {
      //     name: '$vxeMoney', props: {  min: 0 }
      //   },
      //   align: 'right',
      //   combinedType: ['average', 'subTotal', 'total', 'totalAll']
      // },
      {
        title: '本级追减金额(财政资金)',
        field: 'minusAmt',
        minWidth: 180,
        sortable: false,
        filters: false,
        cellRender: {
          name: '$vxeMoney', props: { min: 0 }
        },
        align: 'right',
        combinedType: ['average', 'subTotal', 'total', 'totalAll']
      },
      {
        title: '申请单号',
        field: 'adjBatchNo',
        minWidth: 180,
        align: 'left'
      },
      {
        title: '申请日期',
        field: 'createTime',
        minWidth: 180,
        align: 'left'
      }
    ],
    editTableCols: [],
    formItems: [],
    validateRules: {},
    extendAttrs: {},
    formData: {}
  }
}
