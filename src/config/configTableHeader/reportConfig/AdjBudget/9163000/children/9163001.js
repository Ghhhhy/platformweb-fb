// 9163001 部门预算追加挑选项目列表表头
export default {
  '9163001': {
    tableCols: [
      {
        title: '状态',
        field: 'status',
        width: 180,
        align: 'left',
        filters: false,
        editRender: {
          name: '$vxeSelect',
          props: {
            disabled: true
          },
          options: [
            { value: '1', label: '已储备' },
            { value: '2', label: '已安排预算' }
          ]
        }
      },
      {
        title: '预算单位',
        field: 'agency',
        width: 180,
        align: 'left',
        filters: false,
        editRender: {
          name: '$vxeTree',
          props: {
            config: {
              multiple: false,
              isHump: true
            }
          }
        }
      },
      {
        title: '项目类别',
        field: 'proCat',
        width: 180,
        align: 'left',
        filters: false,
        editRender: {
          name: '$vxeTree',
          props: {
            config: {
              multiple: false,
              isHump: true
            }
          }
        }
      },
      {
        title: '项目名称',
        field: 'proName',
        width: 180,
        align: 'left',
        filters: false
      },
      {
        title: '是否政府采购',
        field: 'isGov',
        width: 180,
        align: 'left',
        filters: false,
        editRender: {
          name: '$vxeSelect',
          props: {
            disabled: true
          },
          options: [
            { value: '1', label: '是' },
            { value: '0', label: '否' }
          ]
        }
      },
      {
        title: '当前项目申报金额',
        field: 'f5',
        width: 150,
        align: 'right',
        ilters: false,
        cellRender: { name: '$vxeMoney', props: { min: 0 } }
      },
      {
        title: '已安排预算金额',
        field: 'budgetAmt',
        width: 150,
        align: 'right',
        filters: false,
        cellRender: { name: '$vxeMoney', props: { min: 0 } }
      },
      {
        title: '可申请预算金额',
        field: 'unuseBudgetAmt',
        width: 150,
        align: 'right',
        filters: false,
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
