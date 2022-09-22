// 追加调剂所有主界面列配置
// chooseTable
export default {
  '9166214': {
    tableCols: [],
    editTableCols: [
      {
        title: '状态',
        field: 'status',
        width: 120,
        align: 'left',
        editRender: {
          name: '$select',
          props: { disabled: true },
          options: [{
            value: '1',
            label: '已储备未安排预算'
          }, {
            value: '2',
            label: '已安排预算'
          }]
        }
      },
      {
        field: 'proCat',
        width: 120,
        title: '项目类别',
        align: 'left',
        editRender: {
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
        width: 200,
        editRender: {
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
        width: 120,
        align: 'left'
      },
      {
        title: '项目单位',
        field: 'agency',
        width: 120,
        align: 'left',
        editRender: {
          name: '$vxeTree',
          props: {
            config: {
              isHump: true
            }
          }
        }
      },
      // 项目资金管理处室
      {
        field: 'bgtMofDep',
        width: 120,
        title: '资金管理处室',
        align: 'left',
        editRender: {
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
        width: 120,
        title: '财政内部机构',
        align: 'left',
        editRender: {
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
        width: 120,
        field: 'f5',
        align: 'left',
        cellRender: { name: '$vxeMoney', props: { min: 0 } }
      },
      {
        title: '已安排预算金额',
        width: 120,
        field: 'budgetAmt',
        align: 'left',
        cellRender: { name: '$vxeMoney', props: { min: 0 } }
      },
      {
        title: '可安排追加金额',
        width: 120,
        field: 'unuseBudgetAmt',
        align: 'left',
        cellRender: { name: '$vxeMoney', props: { min: 0 } }
      }
    ],
    formItems: [],
    validateRules: {},
    extendAttrs: {},
    formData: {}
  }
}
