// 追加调剂所有主界面列配置
// apBudgetdetailTable
export default {
  '9166212': {
    tableCols: [
      {
        field: 'manageMofDep',
        title: '财政内部机构',
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
        title: '项目代码',
        field: 'proCode',
        width: 200,
        sortable: false,
        filters: false,
        align: 'left'
      },
      {
        title: '项目名称',
        field: 'proName',
        width: 200,
        sortable: false,
        filters: false,
        align: 'left'
      },
      {
        title: '预算级次代码',
        field: 'budgetLevel',
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
        title: '项目金额',
        field: 'f5',
        width: 120,
        align: 'right',
        sortable: false,
        filters: false,
        cellRender: { name: '$vxeMoney', props: { min: 0 } }
      },
      {
        title: '预算可用金额',
        field: 'adjAddamt',
        width: 120,
        align: 'right',
        sortable: false,
        filters: false,
        cellRender: { name: '$vxeMoney', props: { min: 0 } }
      },
      {
        title: '本次申请调剂金额',
        field: 'adjCutamt',
        width: 150,
        sortable: false,
        filters: false,
        align: 'right',
        editRender: { name: '$vxeMoney', props: { min: 0 } }
      },
      {
        title: '支出功能科目',
        field: 'expFunc',
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
        title: '政府经济分类',
        field: 'govBgtEco',
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
        field: 'fundType',
        title: '资金性质',
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
        field: 'fundsource',
        title: '预算资金来源',
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
      }],
    editTableCols: [],
    formItems: [],
    validateRules: {},
    extendAttrs: {},
    formData: {}
  }
}
