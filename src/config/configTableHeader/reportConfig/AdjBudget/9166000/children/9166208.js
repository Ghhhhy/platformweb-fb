// 追加调剂所有主界面列配置
// refineBudgetTableEditRules
export default {
  '9166208': {
    tableCols: [],
    editTableCols: [],
    formItems: [],
    validateRules: {
      manageMofDep: [{ required: true, type: 'treeinput', trigger: 'change', message: '请输入资金管理处室' }],
      isTrack: [{ required: true, type: 'treeinput', trigger: 'change', message: '请输入是否追踪' }],
      isDirectFinanc: [{ required: true, type: 'treeinput', trigger: 'change', message: '请输入是否直达资金标识' }],
      isDir: [{ required: true, type: 'treeinput', trigger: 'change', message: '请输入直达资金标识' }],
      isScientific: [{ required: true, type: 'treeinput', trigger: 'change', message: '请输入科研资金标识' }],
      resPro: [{ required: false, type: 'treeinput', trigger: 'change', message: '请输入上级来源项目' }],
      isAlle: [{ required: true, type: 'treeinput', trigger: 'change', message: '请输入扶贫资金标识' }],
      isSub: [{ required: true, type: 'treeinput', trigger: 'change', message: '请输入是否补贴到人到企业' }],
      isThrExp: [{ required: true, type: 'treeinput', trigger: 'change', message: '请输入是否三公经费' }],
      thrExp: [{ required: true, type: 'treeinput', trigger: 'change', message: '请输入三公经费' }],
      fundsource: [{ required: true, type: 'treeinput', trigger: 'change', message: '请输入预算资金来源' }],
      fundType: [{ required: true, type: 'treeinput', trigger: 'change', message: '请输入资金性质' }],
      foundType: [{ required: true, type: 'treeinput', trigger: 'change', message: '请输入资金来源' }],
      expFunc: [{ required: true, type: 'treeinput', trigger: 'change', message: '请输入支出功能分类' }],
      tpFunc: [{ required: true, type: 'treeinput', trigger: 'change', message: '请输入转移支付功能科目' }],
      govBgtEco: [{ required: false, type: 'treeinput', trigger: 'change', message: '请输入政府经济支出经济分类' }],
      incomeSort: [{ required: false, type: 'treeinput', trigger: 'change', message: '请输入下级转移性收入科目' }],
      budgetLevel: [{ required: true, type: 'treeinput', trigger: 'change', message: '请选择预算级次' }]
    },
    extendAttrs: {},
    formData: {}
  }
}
