// 专项转移支付调剂-新增调剂-挑选项目列表头
export default {
  '9165222': {
    tableCols: [
      {
        title: '状态',
        field: 'status',
        align: 'left',
        width: 180,
        filters: false,
        cellRender: {
          name: '$vxeSelect',
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
        title: '项目类别',
        align: 'left',
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
        title: '项目名称',
        field: 'proName',
        align: 'left',
        width: 180,
        filters: false,
        cellRender: {
          name: '$vxeInput'
        }
      },
      {
        title: '当年项目资金需求',
        field: 'f5',
        align: 'right',
        width: 200,
        filters: false,
        cellRender: { name: '$vxeMoney', props: { type: 'float', min: 0 } }
      },
      {
        title: '已安排预算金额',
        field: 'budgetAmt',
        align: 'right',
        width: 200,
        filters: false,
        cellRender: { name: '$vxeMoney', props: { type: 'float', min: 0 } }
      },
      {
        title: '可安排追加金额',
        field: 'unuseBudgetAmt',
        align: 'right',
        width: 200,
        filters: false,
        cellRender: { name: '$vxeMoney', props: { type: 'float', min: 0 } }
      },
      {
        title: '本次追加总额',
        field: 'curAddtoamt',
        align: 'right',
        width: 200,
        filters: false,
        cellRender: { name: '$vxeMoney', props: { type: 'float', min: 0 } }
      },
      {
        field: 'speType',
        title: '专项资金目录',
        align: 'left',
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
        field: 'bgtMofDep',
        title: '资金管理处室',
        align: 'left',
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
      }
    ],
    editTableCols: [],
    formItems: [],
    validateRules: {},
    extendAttrs: {},
    formData: {}
  }
}
