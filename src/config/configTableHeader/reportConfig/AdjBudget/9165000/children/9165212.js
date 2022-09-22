// 专项转移支付调剂-新增-最下表指标来源的列表头
export default {
  '9165212': {
    tableCols: [],
    editTableCols: [
      {
        title: '上级指标文号',
        field: 'corBgtDocNo',
        filters: false,
        align: 'left',
        width: 120,
        cellRender: {
          name: '$vxeInput'
        }
      },
      {
        title: '项目名称',
        field: 'proName',
        filters: false,
        align: 'left',
        width: 180,
        cellRender: {
          name: '$vxeInput'
        }
      },
      {
        title: '资金性质',
        field: 'fundType',
        filters: false,
        align: 'left',
        width: 180,
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
        filters: false,
        align: 'left',
        width: 180,
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
        width: 200,
        cellRender: { name: '$vxeMoney', props: { type: 'float', min: 0 } }
      },
      {
        title: '可安排金额',
        field: 'unuseBudgetAmt',
        align: 'right',
        filters: false,
        width: 120,
        cellRender: { name: '$vxeMoney', props: { type: 'float', min: 0 } }
      },
      {
        title: '该科目追减金额',
        field: 'adjCutamt',
        align: 'right',
        combinedType: ['average', 'total', 'totalAll', 'switchTotal'],
        filters: false,
        width: 150,
        editRender: { name: '$vxeMoney', props: { type: 'float', min: 0 } }
      },
      {
        field: 'proCat',
        title: '项目类别',
        filters: false,
        align: 'left',
        width: 200,
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
        filters: false,
        align: 'left',
        width: 200,
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
        filters: false,
        align: 'left',
        width: 200,
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
        field: 'bgtExeFlag',
        title: '指标可执行标志',
        filters: false,
        align: 'left',
        width: 120,
        cellRender: {
          name: '$vxeSelect',
          options: [
            {
              value: '1',
              label: '1-可执行'
            },
            {
              value: '2',
              label: '2-待分'
            }
          ]
        }
      }
    ],
    formItems: [],
    validateRules: {
      adjCutamt: [
        { required: true, trigger: 'change', message: '请输入调减金额' }
      ]
    },
    extendAttrs: {},
    formData: {}
  }
}
