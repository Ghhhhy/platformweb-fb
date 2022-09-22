// 追加调剂所有主界面列配置
// detailTable
export default {
  '9166205': {
    tableCols: [
      {
        field: 'proCat',
        title: '项目类别',
        align: 'left',
        sortable: false,
        filters: false,
        cellRender: {
          name: '$vxeTree',
          props: {
            disabled: true,
            config: {
              isHump: true
            }
          }
        }
      },
      {
        field: 'speType',
        title: '专项资金目录',
        align: 'left',
        width: 240,
        sortable: false,
        filters: false,
        cellRender: {
          name: '$vxeTree',
          props: {
            config: {
              disabled: true,
              isHump: true
            }
          }
        }
      },
      {
        title: '项目代码',
        field: 'proCode',
        sortable: false,
        filters: false,
        align: 'left'
      },
      {
        title: '项目名称',
        field: 'proName',
        sortable: false,
        filters: false,
        align: 'left'
      },
      {
        field: 'agency',
        title: '项目单位',
        align: 'left',
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
        field: 'manageMofDep',
        title: '财政内部机构',
        align: 'left',
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
        sortable: false,
        filters: false,
        align: 'right',
        cellRender: { name: '$vxeMoney', props: { min: 0 } }
      },
      {
        title: '已纳入预算金额',
        field: 'budgetAmt',
        align: 'right',
        cellRender: { name: '$vxeMoney', props: { min: 0 } }
      },
      {
        title: '可申请调剂预算金额',
        field: 'unuseBudgetAmt',
        sortable: false,
        filters: false,
        align: 'right',
        cellRender: { name: '$vxeMoney', props: { min: 0 } }
      }
    ],
    editTableCols: [],
    formItems: [],
    validateRules: {},
    extendAttrs: {},
    formData: {}
  }
}
