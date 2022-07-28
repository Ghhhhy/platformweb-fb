// 追加调剂所有主界面列配置
// apBudgetTable
export default {
  '9166204': {
    tableCols: [
      {
        field: 'bgtExeFlag',
        title: '指标可执行标志',
        sortable: false,
        filters: false,
        width: 140,
        align: 'left'
      },
      {
        title: '上级指标文号',
        field: 'corBgtDocNo',
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
        title: '项目代码',
        field: 'proCode',
        width: 200,
        sortable: false,
        filters: false,
        align: 'left'
      },
      {
        title: '指标金额',
        field: 'aviamt',
        width: 100,
        sortable: false,
        filters: false,
        align: 'right',
        cellRender: { name: '$vxeMoney', props: { min: 0 } }
      },
      {
        title: '可用金额',
        field: 'ctrlvoucherfuAmt',
        width: 100,
        sortable: false,
        filters: false,
        align: 'right',
        cellRender: { name: '$vxeMoney', props: { min: 0 } }
      },
      {
        title: '本次调减金额',
        field: 'adjCutamt',
        width: 120,
        sortable: false,
        filters: false,
        align: 'right',
        editRender: { name: '$vxeMoney', props: { min: 0 } }
      },
      {
        title: '主管业务处',
        field: 'manageMofDep',
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
        title: '资金主管处室',
        field: 'bgtMofDep',
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
        title: '资金性质',
        field: 'fundType',
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
        title: '资金来源',
        field: 'foundType',
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
        title: '指标类型',
        field: 'bgtType',
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
        title: '指标来源类型',
        field: 'bgtSource',
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
        title: '指标来源',
        field: 'sourceType',
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
        title: '预算级次',
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
      }],
    editTableCols: [],
    formItems: [],
    validateRules: {},
    extendAttrs: {},
    formData: {}
  }
}
