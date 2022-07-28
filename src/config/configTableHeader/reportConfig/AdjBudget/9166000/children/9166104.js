export default {
  '9166104': {
    tableCols: [],
    editTableCols: [],
    formItems: [],
    validateRules: {
      bgtDocTitle: [
        {
          required: true,
          message: '指标文标题不能为空',
          type: 'string',
          trigger: 'change'
        }
      ],
      bgtDec: [
        {
          required: true,
          message: '指标说明不能为空',
          type: 'string',
          trigger: 'change'
        }
      ],
      docDate: [
        {
          required: true,
          message: '发文日期不能为空',
          type: 'date',
          trigger: 'change'
        }
      ]
    },
    extendAttrs: {},
    formData: {}
  }
}
