const calculateConstraintConfigIn = {
  // rowformulaConfig: { // 行公式配置
  //   // 单元格交叉计算
  //   // rowFormulaMap= { "colField:rowIndex":"{tableId:colField:rowIndex}[运算符]" }
  //   // '4:profit': '{0:income}+{1:tax}+{2:deduction}+{3:profit}'
  // },
  // rowCodeFormulaConfig: {
  //   // 单元格交叉计算
  //   // rowFormulaMap= { "colField:itemcode":"{tableId:colField:itemcode}[运算符]" }
  //   '1001:bonus': '{1002:income}+{1003:bonus}',
  //   '1002:bonus': '{1002:income}*{1002:age}+{1003:bonus}'
  // },
  // colFormulaConfig: { // 列公式配置
  //   // 单条数据计算
  //   // rowFormulaMap= { "colfield":"{colfield}[运算符]" }
  //   // profit: '{income}-{tax}-{deduction}',
  //   income: '{age}*2'
  // },
  constraintConfig: { // 表间约束配置
    calculate: { // number 计算
      '4:formula': '{age}>=18?Math.pow({age},4)/2:0' // 计算 number
    },
    visible: { // Boolean  显示
      '4:formula': 'cell:{age}>=18?Math.pow({age},4)/2:0' // 显示 true||false
    },
    editble: { //  Boolean 是否可编辑
      '4:formula': 'cell||column:{age}>=18?Math.pow({age},4)/2:0' // 可编辑 true||false
    },
    clear: { // 置空 true||false

    },
    control: {

    },
    style: { // 样式 "fontSize=12px&color=#333"
      '4:formula2': '{age}>=18?Math.pow({age},4)/2:0' // 控制 表达式
    },
    getData: { // await getData

    }
  },
  dataSource: {
    source: '', // 约束配置条件
    actionType: 'cell', // 作用对象 cell||col||row||column
    controlType: 'calculate', // 作用类型 calculate||visible||editble||clear||control||style||getData
    constraintRelyonData: { // 依赖数据源
    },
    opratorRelyonData: { // 操作依赖数据源
    },
    actionToCell: '', // 作用单元格
    actionValue: '' // value
  }
}
