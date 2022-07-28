export default {
  '9166103': {
    tableCols: [],
    editTableCols: [],
    formItems: [
      {
        field: 'bgtDocTitle',
        title: '指标标题',
        span: 8,
        itemRender: {
          name: '$vxeInput',
          props: {
            disabled: false,
            type: 'text'
          }
        }
      },
      {
        field: 'bgtDec',
        title: '指标说明',
        span: 8,
        itemRender: {
          name: '$vxeInput',
          props: {
            disabled: false,
            type: 'text'
          }
        }
      },
      {
        field: 'docDate',
        title: '发文日期',
        span: 8,
        itemRender: {
          name: '$vxeInput',
          props: {
            disabled: false,
            type: 'date'
          }
        }
      }
    ],
    validateRules: {},
    extendAttrs: {},
    formData: {}
  }
}
