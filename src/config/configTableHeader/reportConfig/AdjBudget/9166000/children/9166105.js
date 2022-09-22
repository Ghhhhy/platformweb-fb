export default {
  '9166105': {
    tableCols: [
      {
        field: 'proCat',
        title: '项目类别',
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
              isHump: true
            },
            disabled: true
          }
        }
      },
      {
        title: '项目代码',
        field: 'proCode',
        width: 150,
        sortable: false,
        filters: false,
        align: 'left'
      },
      {
        title: '项目名称',
        field: 'proName',
        width: 150,
        sortable: false,
        filters: false,
        align: 'left'
      },
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
        title: '项目金额',
        field: 'f5',
        width: 150,
        sortable: false,
        filters: false,
        align: 'right',
        cellRender: { name: '$vxeMoney', props: { min: 0 } }
      },
      {
        title: '可申请追加预算金额',
        field: 'unuseBudgetAmt',
        width: 150,
        sortable: false,
        filters: false,
        align: 'right',
        cellRender: { name: '$vxeMoney', props: { min: 0 } }
      },
      {
        title: '本次申请追加金额',
        field: 'adjAddamt',
        width: 150,
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
