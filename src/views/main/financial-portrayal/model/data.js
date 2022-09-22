import { nextTick, unref } from '@vue/composition-api'
import { getColor } from './getEchartsConfig'
import { formatterThousands } from '@/utils/thousands'

export const periodXAxis = () => {
  return ['本期', '上年同期']
}

export const industrialAddedXAxis = () => {
  return ['规上工业增加值', '战略性新兴产业增加值']
}

export const mainIndustrialXAxis = () => {
  return ['煤炭开采和洗选业', '石油和天然气开采业', '装备制造业']
}

export const gdpYAxis = () => {
  return ['第一产业', '第二产业', '第三产业']
}

export const fixedAssetsXAxis = () => {
  return [...gdpYAxis(), '基础设施投资', '民间投资', '房地产开发投资']
}

export const importAndExportXAxis = () => {
  return ['出口总值', '进口总值']
}

export const leadingIndicatorXAxis = () => {
  return [...periodXAxis(), '采购经理指数']
}

// 先行指数右侧y轴
export const leadingIndicatorRightYAxis = () => {
  const arr = []
  for (let i = 0; i <= 100; i += 25) {
    arr.push(i)
  }
  return arr
}

export const governmentDebtlimitXAxis = () => {
  return ['一般债券', '专项债券']
}

// 政府债券legend
export const governmentDebtLegend = () => {
  return governmentDebtlimitXAxis().map((item, index) => {
    return {
      label: item,
      color: getColor(index < 1 ? 'blue' : 'green')
    }
  })
}

export const directFundsXAxis = () => {
  return ['中央下达', '地方安排']
}

export const financialSupportXAxis = () => {
  return ['财政开支人员', '财政补助开支人员', '学生人数']
}
// 公共column配置
const common = {
  formatter: (row, column, cellValue) => formatterThousands(cellValue),
  align: 'right',
  headerAlign: 'center',
  showOverflowTooltip: true
}

// 社保table-column
export const socialSecurityColumn = () => {
  return [
    {
      prop: 'period',
      label: '',
      width: '148',
      align: 'left',
      headerAlign: 'center'
    },
    {
      prop: 'fundIncome',
      label: '当年基金收入',
      ...common
    },
    {
      prop: 'fundExpend',
      label: '当年基金支出',
      ...common
    },
    {
      prop: 'fundTotal',
      label: '基金累计余额',
      ...common
    },
    {
      prop: 'payPeople',
      label: '缴费人数',
      ...common
    },
    {
      prop: 'enjoyPeople',
      label: '享受待遇人数',
      ...common
    },
    {
      prop: 'ratio',
      label: '占社保基金总额',
      ...common,
      formatter: (row, column, cellValue) => `${cellValue}%`
    }
  ]
}

// 社会保险基金预算table-column
export const socialSecurityBudgetColumn = () => {
  return [
    {
      prop: 'period',
      label: '',
      width: '148',
      align: 'left',
      headerAlign: 'center'
    },
    {
      prop: 'budgetIncome',
      label: '社会保险基金预算收入',
      ...common
    },
    {
      prop: 'budgetExpend',
      label: '社会保险基金预算支出',
      ...common
    }
  ]
}

// 暂付款
export const suspensePaymentColumn = () => {
  return [
    {
      prop: 'period',
      label: '',
      width: '148',
      align: 'left',
      headerAlign: 'center'
    },
    {
      prop: 'begin',
      label: '期初额',
      ...common
    },
    {
      prop: 'newly',
      label: '当年新增',
      ...common
    },
    {
      prop: 'reduce',
      label: '当年减少',
      ...common
    },
    {
      prop: 'end',
      label: '期末额',
      ...common
    },
    {
      prop: 'clearRatio',
      label: '清理率',
      ...common,
      formatter: (row, column, cellValue) => `${cellValue}%`
    }
  ]
}

// 表格属性
export const tableProps = () => {
  return {
    border: true,
    canResize: true,
    cellStyle: { padding: '10px 20px' },
    headerCellStyle: { background: '#FAF9FA', fontSize: '14px', color: '#021330' }
  }
}

// 获取当前月以及之前月份
export const beforeMonthArr = () => {
  const currentMonth = new Date().getMonth() + 1
  const arr = []
  for (let i = 1; i <= currentMonth; i++) {
    arr.push(i)
  }
  return arr
}

export const rigidSpendingXaxis = () => {
  return ['“三保”支出', '企业职工养老保险', '债券付息支出', '债券发行费支出', '自有财力偿还债券', '招商引资支出', '支持中小企业发展', '财力安排用于暂存']
}

// 模块tab
export const moduleTabs = [
  {
    label: '区域基本情况',
    value: 'BaseInfo'
  },
  {
    label: '财政运行情况',
    value: 'FinancialOperation',
    children: [
      {
        label: '财政收支',
        value: 0
      },
      {
        label: '收入稳健指数',
        value: 1
      },
      {
        label: '支出结构指数',
        value: 2
      },
      {
        label: '预算管理',
        value: 3
      },
      {
        label: '运行保障',
        value: 4
      },
      {
        label: '直达资金',
        value: 5
      }
    ]
  },
  {
    label: '政府债务指标',
    value: 'GovernmentDebtIndicators'
  },
  {
    label: '社会保险情况',
    value: 'SocialSecurity'
  }
]

/**
 * 获取当前需要缩放的zoom 以设计图1920为基准
 * @param currentRenderComponent
 * @returns {Promise<number>}
 */
export const getZoom = async (currentRenderComponent) => {
  await nextTick()
  const originWidth = 1920
  const clientWidth = document.documentElement.clientWidth || document.body.clientWidth
  let ratio = clientWidth / originWidth
  if (clientWidth < 1920) {
    ratio -= 0.02
    if (unref(currentRenderComponent)?.value === 'FinancialOperation') {
      ratio -= 0.03
    }
  }
  return ratio
}
