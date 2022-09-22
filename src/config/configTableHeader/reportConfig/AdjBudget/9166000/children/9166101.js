// 追加调剂所有主界面列配置
export default {
  '9166101': {
    tableCols: [
      {
        field: 'manageMofDep',
        title: '财政内部机构',
        align: 'left',
        width: 120,
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
        field: 'proCat',
        title: '项目类别',
        align: 'left',
        width: 180,
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
        title: '项目名称',
        field: 'proName',
        width: 240,
        sortable: false,
        filters: false,
        align: 'left'
      },
      {
        title: '本次申请金额',
        field: 'applyUp',
        width: 120,
        sortable: false,
        filters: false,
        align: 'right',
        combinedType: ['average', 'subTotal', 'total', 'totalAll'],
        cellRender: { name: '$vxeMoney', props: { min: 0 } }
      },
      {
        title: '指标调整文号',
        field: 'docNo',
        width: 200,
        sortable: false,
        filters: false,
        align: 'left'
      },
      {
        title: '指标文号',
        field: 'adjDocNo',
        width: 200,
        sortable: false,
        filters: false,
        align: 'left'
      },
      {
        title: '申请单号',
        field: 'adjBatchNo',
        width: 100,
        filters: false,
        align: 'left'
      },
      {
        field: 'incomeSort',
        title: '收入功能分类',
        align: 'left',
        width: 180,
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
        field: 'expFunc',
        title: '支出功能分类',
        align: 'left',
        width: 180,
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
        field: 'govBgtEco',
        title: '政府预算经济分类',
        align: 'left',
        width: 200,
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
        title: '预算资金来源',
        field: 'fundsource',
        align: 'left',
        width: 240,
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
        field: 'fundType',
        title: '资金性质',
        align: 'left',
        width: 200,
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
        field: 'foundType',
        title: '资金来源',
        align: 'left',
        width: 240,
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
        field: 'budgetLevel',
        title: '预算级次',
        align: 'left',
        width: 120,
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
      }
    ],
    editTableCols: [],
    formItems: [],
    validateRules: {},
    extendAttrs: {},
    formData: {}
  }
}
