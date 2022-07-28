// 专项转移支付调剂-新增-选择预算来源-指标查预算项目列表头
export default {
  '9165224': {
    tableCols: [
      {
        title: '项目名称',
        field: 'proName',
        align: 'left',
        filters: false,
        cellRender: {
          name: '$vxeInput'
        }
      },
      {
        field: 'proCat',
        title: '项目类别',
        align: 'left',
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
        title: '当年项目资金需求',
        field: 'f5',
        align: 'right',
        filters: false,
        cellRender: { name: '$vxeMoney', props: { type: 'float', min: 0 } }
      },
      {
        title: '可安排金额',
        field: 'unuseBudgetAmt',
        align: 'right',
        filters: false,
        cellRender: { name: '$vxeMoney', props: { type: 'float', min: 0 } }
      },
      {
        field: 'speType',
        title: '专项资金目录',
        align: 'left',
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
        field: 'subMofDiv',
        title: '下级财政区划',
        align: 'left',
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
        title: '主管业务处',
        align: 'left',
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
