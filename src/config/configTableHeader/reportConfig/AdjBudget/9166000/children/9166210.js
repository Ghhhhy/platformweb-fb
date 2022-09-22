// 追加调剂所有主界面列配置
// apBudgetTableQuery
export default {
  '9166210': {
    tableCols: [],
    editTableCols: [],
    formItems: [
      {
        field: 'proName',
        title: '项目名称',
        span: 4,
        itemRender: {
          name: '$vxeInput',
          props: {
            disabled: false,
            type: 'text',
            placeholder: '项目名称'
          }
        }
      }
    ],
    validateRules: {},
    extendAttrs: {},
    formData: {}
  }
}
