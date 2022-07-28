// 追加调剂所有主界面列配置
// formValidate
export default {
  '9166209': {
    tableCols: [],
    editTableCols: [],
    formItems: [],
    validateRules: {
      manageMofDep: [
        {
          required: true,
          max: 60,
          message: '资金主管处室不可为空'
        }
      ],
      sourceType: [
        {
          required: true,
          message: '指标来源不能为空'
        }
      ],
      bgtType: [
        {
          required: true,
          message: '指标类型不能为空'
        }
      ],
      isTrack: [{
        required: true,
        message: '是否追踪不能为空'
      }],
      isDirectFinanc: [{
        required: true,
        message: '是否直达资金不能为空'
      }],
      isDir: [{
        required: true,
        message: '直达资金配套标识不能为空'
      }],
      isScientific: [{
        required: true,
        message: '科研资金标识不能为空'
      }],
      isAlle: [{
        required: true,
        message: '扶贫资金标识不能为空'
      }],
      isSub: [{
        required: true,
        message: '是否补贴到人到企业不能为空'
      }],
      isThrExp: [{
        required: true,
        message: '是否三公经费不能为空'
      }],
      thrExp: [{
        required: true,
        message: '三公经费不能为空'
      }],
      isUseupAmt: [{
        required: true,
        message: '是否使用上级资金不能为空'
      }],
      resPro: [
        {
          required: true,
          message: '上级来源项目不能为空'
        }
      ],
      fundsource: [
        {
          required: true,
          message: '请输入资金来源'
        }],
      // tpFunc: [
      //   {
      //     required: true,
      //     message: '请输入转移支付功能科目'
      //   }
      // ],
      fundType:
      [
        {
          required: true,
          message: '请输入资金性质'
        }
      ],
      // expFunc: [
      //   {
      //     required: true,
      //     message: '请输入支出功能分类科目'
      //   }
      // ],
      govBgtEco: [
        {
          required: true,
          message: '请输入政府经济分类'
        }
      ],
      incomeSort: [{
        required: true,
        message: '请输入下级转移性收入科目'
      }],
      remark: [{
        max: 2000,
        message: '输入长度在1~2000字符'
      }]
    },
    extendAttrs: {},
    formData: {}
  }
}
