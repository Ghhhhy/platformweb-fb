// 追加调剂所有主界面列配置
// chooseQueryPro
export default {
  '9166213': {
    tableCols: [],
    editTableCols: [],
    formItems: [
      {
        field: 'status',
        title: '项目状态',
        span: 3,
        itemRender: {
          name: '$select',
          options: [
            {
              value: '1',
              label: '已储备未安排预算'
            },
            {
              value: '2',
              label: '已安排预算'
            }
          ],
          props: {
            placeholder: '项目状态'
          }
        }
      },
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
