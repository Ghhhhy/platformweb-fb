import { reactive, ref, toRaw, computed, onMounted, unref, inject, watch } from '@vue/composition-api'
import { getFinOperaData, getFinOperaInfo } from '@/api/frame/main/financial-portrayal'
// 财政画像
export const useXmind = () => {
  // 接口数据
  const originData = ref({})
  // 请求参数
  const reqSearchParams = inject('reqSearchParams')
  // 转换后的数据
  const financialTree = reactive({
    // 财政总收入
    income: {
      label: '收入',
      detail: {
        // 本期金额
        allIncomeCurrentPeriodAmount: { label: '本期金额', value: 0 },
        // 上年同期
        allIncomeLastPeriodAmount: { label: '上年同期', value: 0 }
      },
      color: '#475C91',
      arrowPosition: 'bottom',
      children: [
        {
          label: '一般公共预算收入',
          detail: {
            // 本期金额
            publicBudgetIncomeCurrentPeriodAmount: { label: '本期金额', value: 0 },
            // 本期占比
            publicBudgetIncomeCurrentPeriodProportion: { label: '本期占比', value: 0 },
            // 上年同期
            publicBudgetIncomeLastPeriodAmount: { label: '上年同期', value: 0 },
            // 上期占比
            publicBudgetIncomeLastPeriodProportion: { label: '上期占比', value: 0 }
          },
          color: '#475C91',
          arrowPosition: 'top',
          children: [
            {
              label: '税收收入',
              detail: {
                // 本期金额
                taxRevenue: { label: '本期金额', value: 0 },
                // 本期占比
                taxRevenueProportion: { label: '本期占比', value: 0 },
                // 上年同期
                taxRevenuePeriod: { label: '上年同期', value: 0 },
                // 上期占比
                taxRevenuePeriodProportion: { label: '上期占比', value: 0 }
              },
              color: '#5B8FF9',
              arrowPosition: 'left',
              // 有下级显示加号
              ableSpread: true,
              showChild: false,
              incomeType: 1,
              children: []
            },
            {
              label: '非税收收入',
              detail: {
                // 本期金额
                nonTaxRevenue: { label: '本期金额', value: 0 },
                // 本期占比
                nonTaxRevenueProportion: { label: '本期占比', value: 0 },
                // 上年同期
                nonTaxRevenuePeriod: { label: '上年同期', value: 0 },
                // 上期占比
                nonTaxRevenuePeriodProportion: { label: '上期占比', value: 0 }
              },
              color: '#5AD8A6',
              arrowPosition: 'left',
              // 有下级显示加号
              ableSpread: true,
              showChild: false,
              incomeType: 2,
              children: []
            },
            {
              label: '上级补助收入',
              detail: {
                // 本期金额
                pubSubsidyIncome: { label: '本期金额', value: 0 },
                // 本期占比
                pubSubsidyIncomeProportion: { label: '本期占比', value: 0 },
                // 上年同期
                pubSubsidyIncomePeriod: { label: '上年同期', value: 0 },
                // 上期占比
                pubSubsidyIncomePeriodProportion: { label: '上期占比', value: 0 }
              },
              color: '#F6BD16',
              arrowPosition: 'left',
              // 有下级显示加号
              ableSpread: true,
              showChild: false,
              incomeType: 3,
              children: []
            },
            {
              label: '上年结转收入',
              detail: {
                // 本期金额
                pubCarryForwardIncome: { label: '本期金额', value: 0 },
                // 本期占比
                pubCarryForwardIncomeProportion: { label: '本期占比', value: 0 },
                // 上年同期
                pubCarryForwardIncomePeriod: { label: '上年同期', value: 0 },
                // 上期占比
                pubCarryForwardIncomePeriodProportion: { label: '上期占比', value: 0 }
              },
              arrowPosition: 'left',
              color: '#475C91'
            },
            {
              label: '调入资金',
              detail: {
                // 本期金额
                pubTransferFunds: { label: '本期金额', value: 0 },
                // 本期占比
                pubTransferFundsProportion: { label: '本期占比', value: 0 },
                // 上年同期
                pubTransferFundsPeriod: { label: '上年同期', value: 0 },
                // 上期占比
                pubTransferFundsPeriodProportion: { label: '上期占比', value: 0 }
              },
              color: '#E86452',
              arrowPosition: 'left',
              // 有下级显示加号
              ableSpread: true,
              showChild: false,
              incomeType: 4,
              children: []
            },
            {
              label: '债务（转债）收入',
              detail: {
                // 本期金额
                pubDebtIncome: { label: '本期金额', value: 0 },
                // 本期占比
                pubDebtIncomeProportion: { label: '本期占比', value: 0 },
                // 上年同期
                pubDebtIncomePeriod: { label: '上年同期', value: 0 },
                // 上期占比
                pubDebtIncomePeriodProportion: { label: '上期占比', value: 0 }
              },
              arrowPosition: 'left',
              color: '#475C91'
            },
            {
              label: '调入预算稳定调节基金',
              detail: {
                // 本期金额
                pubInStabilityAdjustmentFund: { label: '本期金额', value: 0 },
                // 本期占比
                pubInStabilityAdjustmentFundProportion: { label: '本期占比', value: 0 },
                // 上年同期
                pubInStabilityAdjustmentFundPeriod: { label: '上年同期', value: 0 },
                // 上期占比
                pubInStabilityAdjustmentFundPeriodProportion: { label: '上期占比', value: 0 }
              },
              arrowPosition: 'left',
              color: '#475C91'
            },
            {
              label: '上缴收入',
              detail: {
                // 本期金额
                pubTotalFiscalRevenue: { label: '本期金额', value: 0 },
                // 本期占比
                pubTotalFiscalRevenueProportion: { label: '本期占比', value: 0 },
                // 上年同期
                pubTotalFiscalRevenuePeriod: { label: '上年同期', value: 0 },
                // 上期占比
                pubTotalFiscalRevenuePeriodProportion: { label: '上期占比', value: 0 }
              },
              arrowPosition: 'left',
              color: '#6DC8EC',
              // 有下级显示加号
              ableSpread: true,
              showChild: false,
              incomeType: 5,
              children: []
            }
          ]
        },
        {
          label: '政府性基金收入',
          detail: {
            // 本期金额
            govIncomeCurrentPeriodAmount: { label: '本期金额', value: 0 },
            // 本期占比
            govIncomeCurrentPeriodProportion: { label: '本期占比', value: 0 },
            // 上年同期
            govIncomeLastPeriodAmount: { label: '上年同期', value: 0 },
            // 上期占比
            govIncomeLastPeriodProportion: { label: '上期占比', value: 0 }
          },
          color: '#475C91',
          arrowPosition: 'top',
          children: [
            {
              label: '政府性基金收入',
              detail: {
                // 本期金额
                govGovernmentFundIncome: { label: '本期金额', value: 0 },
                // 本期占比
                govGovernmentFundIncomeProportion: { label: '本期占比', value: 0 },
                // 上年同期
                govGovernmentFundIncomePeriod: { label: '上年同期', value: 0 },
                // 上期占比
                govGovernmentFundIncomePeriodProportion: { label: '上期占比', value: 0 }
              },
              color: '#945FB9',
              arrowPosition: 'left',
              // 有下级显示加号
              ableSpread: true,
              showChild: false,
              incomeType: 6,
              children: []
            },
            {
              label: '上级补助收入',
              detail: {
                // 本期金额
                govSuperiorSubsidyIncome: { label: '本期金额', value: 0 },
                // 本期占比
                govSuperiorSubsidyIncomeProportion: { label: '本期占比', value: 0 },
                // 上年同期
                govSuperiorSubsidyIncomePeriod: { label: '上年同期', value: 0 },
                // 上期占比
                govSuperiorSubsidyIncomePeriodProportion: { label: '上期占比', value: 0 }
              },
              color: '#FF9845',
              arrowPosition: 'left',
              // 有下级显示加号
              ableSpread: true,
              showChild: false,
              incomeType: 7,
              children: []
            },
            {
              label: '上年结转收入',
              detail: {
                // 本期金额
                govCarryForwardIncome: { label: '本期金额', value: 0 },
                // 本期占比
                govCarryForwardIncomeProportion: { label: '本期占比', value: 0 },
                // 上年同期
                govCarryForwardIncomePeriod: { label: '上年同期', value: 0 },
                // 上期占比
                govCarryForwardIncomePeriodProportio: { label: '上期占比', value: 0 }
              },
              arrowPosition: 'left',
              color: '#475C91'
            },
            {
              label: '调入资金',
              detail: {
                // 本期金额
                govTransferFunds: { label: '本期金额', value: 0 },
                // 本期占比
                govTransferFundsProportio: { label: '本期占比', value: 0 },
                // 上年同期
                govTransferFundsPeriod: { label: '上年同期', value: 0 },
                // 上期占比
                govTransferFundsPeriodProportion: { label: '上期占比', value: 0 }
              },
              arrowPosition: 'left',
              color: '#475C91'
            },
            {
              label: '债务（转债）收入',
              detail: {
                // 本期金额
                govDebtIncome: { label: '本期金额', value: 0 },
                // 本期占比
                govDebtIncomeProportion: { label: '本期占比', value: 0 },
                // 上年同期
                govDebtIncomePeriod: { label: '上年同期', value: 0 },
                // 上期占比
                govDebtIncomePeriodProportion: { label: '上期占比', value: 0 }
              },
              arrowPosition: 'left',
              color: '#1E9493',
              children: []
            }
          ]
        },
        {
          label: '国有资本经营收入',
          detail: {
            // 国有资本经营收入-本期金额
            stateOwnedIncomeCurrentPeriodAmount: { label: '本期金额', value: 0 },
            // 国有资本经营收入-本期占比
            stateOwnedIncomeCurrentPeriodProportion: { label: '本期占比', value: 0 },
            // 国有资本经营收入-上年同期
            stateOwnedIncomeLastPeriodAmount: { label: '上年同期', value: 0 },
            // 国有资本经营收入-上期占比
            stateOwnedIncomeLastPeriodProportion: { label: '上期占比', value: 0 }
          },
          color: '#475C91',
          arrowPosition: 'top'
        }
      ]
    },
    expend: {
      label: '支出',
      detail: {
        // 本期金额
        allIncomeCurrentPeriodAmount: { label: '本期金额', value: 0 },
        // 上年同期
        allIncomeLastPeriodAmount: { label: '上年同期', value: 0 }
      },
      color: '#475C91',
      arrowPosition: 'top',
      children: [
        {
          label: '一般公共预算支出',
          detail: {
            // 本期金额
            publicBudgetExpenditureCurrentPeriodAmount: { label: '本期金额', value: 0 },
            // 本期占比
            publicBudgetExpenditureCurrentPeriodProportion: { label: '本期占比', value: 0 },
            // 上年同期
            publicBudgetExpenditureLastPeriodAmount: { label: '上年同期', value: 0 },
            // 上期占比
            publicBudgetExpenditureLastPeriodProportion: { label: '上期占比', value: 0 }
          },
          color: '#475C91',
          arrowPosition: 'top',
          children: [
            {
              label: '一般公共预算支出',
              detail: {
                // 本期金额
                pubPublicBudgetExpenditure: { label: '本期金额', value: 0 },
                // 本期占比
                pubPublicBudgetExpenditureProportion: { label: '本期占比', value: 0 },
                // 上年同期
                pubPublicBudgetExpenditurePeriod: { label: '上年同期', value: 0 },
                // 上期占比
                pubPublicBudgetExpenditurePeriodProportion: { label: '上期占比', value: 0 }
              },
              color: '#69D9AC',
              arrowPosition: 'right',
              // 有下级显示加号
              ableSpread: true,
              showChild: false,
              incomeType: 8,
              children: []
            },
            {
              label: '上解上级支出',
              detail: {
                // 本期金额
                pubExplainSuperiorExpenditure: { label: '本期金额', value: 0 },
                // 本期占比
                pubExplainSuperiorExpenditureProportion: { label: '本期占比', value: 0 },
                // 上年同期
                pubExplainSuperiorExpenditurePeriod: { label: '上年同期', value: 0 },
                // 上期占比
                pubExplainSuperiorExpenditurePeriodProportion: { label: '上期占比', value: 0 }
              },
              color: '#F6BD16',
              arrowPosition: 'right',
              children: []
            },
            {
              label: '债务还本支出',
              detail: {
                // 本期金额
                pubDebtRepaymentExpenditure: { label: '本期金额', value: 0 },
                // 本期占比
                pubDebtRepaymentExpenditureProportion: { label: '本期占比', value: 0 },
                // 上年同期
                pubDebtRepaymentExpenditurePeriod: { label: '上年同期', value: 0 },
                // 上期占比
                pubDebtRepaymentExpenditurePeriodProportion: { label: '上期占比', value: 0 }
              },
              color: '#E86452',
              arrowPosition: 'right',
              children: []
            },
            {
              label: '安排预算稳定调节基金',
              detail: {
                // 本期金额
                pubStabilityAdjustmentFund: { label: '本期金额', value: 0 },
                // 本期占比
                pubStabilityAdjustmentFundProportion: { label: '本期占比', value: 0 },
                // 上年同期
                pubStabilityAdjustmentFundPeriod: { label: '上年同期', value: 0 },
                // 上期占比
                pubStabilityAdjustmentFundPeriodProportion: { label: '上期占比', value: 0 }
              },
              color: '#475C91',
              arrowPosition: 'right'
            }
          ]
        },
        {
          label: '政府性基金支出',
          detail: {
            // 本期金额
            govExpenditureCurrentPeriodAmount: { label: '本期金额', value: 0 },
            // 本期占比
            govExpenditureCurrentPeriodProportion: { label: '本期占比', value: 0 },
            // 上年同期
            govExpenditureLastPeriodAmount: { label: '上年同期', value: 0 },
            // 上期占比
            govExpenditureLastPeriodProportion: { label: '上期占比', value: 0 }
          },
          color: '#475C91',
          arrowPosition: 'top',
          children: [
            {
              label: '政府性基金支出',
              detail: {
                // 本期金额
                govGovernmentFundExpenditure: { label: '本期金额', value: 0 },
                // 本期占比
                govGovernmentFundExpenditureProportion: { label: '本期占比', value: 0 },
                // 上年同期
                govGovernmentFundExpenditurePeriod: { label: '上年同期', value: 0 },
                // 上期占比
                govGovernmentFundExpenditurePeriodProportion: { label: '上期占比', value: 0 }
              },
              color: '#475C91',
              arrowPosition: 'right',
              // 有下级显示加号
              ableSpread: true,
              showChild: false,
              incomeType: 9,
              children: []
            },
            {
              label: '债务还本支出',
              detail: {
                // 本期金额
                govDebtRepaymentExpenditure: { label: '本期金额', value: 0 },
                // 本期占比
                govDebtRepaymentExpenditureProportion: { label: '本期占比', value: 0 },
                // 上年同期
                govDebtRepaymentExpenditurePeriod: { label: '上年同期', value: 0 },
                // 上期占比
                govDebtRepaymentExpenditurePeriodProportion: { label: '上期占比', value: 0 }
              },
              color: '#475C91',
              arrowPosition: 'right'
            }
          ]
        },
        {
          label: '国有资本经营支出',
          detail: {
            // 国有资本经营支出-本期金额
            stateOwnedExpenditureCurrentPeriodAmount: { label: '本期金额', value: 0 },
            // 国有资本经营支出-本期占比
            stateOwnedExpenditureCurrentPeriodProportion: { label: '本期占比', value: 0 },
            // 国有资本经营支出-上年同期
            stateOwnedExpenditureLastPeriodAmount: { label: '上年同期', value: 0 },
            // 国有资本经营支出-上期占比
            stateOwnedExpenditureLastPeriodProportion: { label: '上期占比', value: 0 }
          },
          color: '#475C91',
          arrowPosition: 'top'
        }
      ]
    }
  })

  // 当前左边明细
  const currentleftDetail = ref([])
  // 当前右边明细
  const currentRightDetail = ref([])
  // 支出节点
  const expendBgNode = computed(() => {
    return financialTree.expend.children
  })
  // 收入节点
  const incomeBgNode = computed(() => {
    return financialTree.income.children
  })

  // 获取两侧的数据
  const getJustifyDetail = (type = 'expend') => {
    return toRaw(financialTree)[type].children.reduce((arr, item) => {
      if (item.children) {
        arr.push(...item.children)
      }
      return arr
    }, [])
  }

  // 请求后端数据
  const initDate = async () => {
    const parmas = {
      ...unref(reqSearchParams)
    }
    const res = await getFinOperaData(parmas)
    originData.value = res.data || {}
    assginFinancial(financialTree.expend)
    assginFinancial(financialTree.income)
    currentleftDetail.value = getJustifyDetail('expend')
    currentRightDetail.value = getJustifyDetail('income')
  }

  // 对后端数据赋值给financialTree对应字段
  const assginFinancial = (data) => {
    Object.keys(data.detail).forEach(key => {
      // 获取原始值给对应的detail赋值
      data.detail[key].value = unref(originData)[key] || 0
      // 有下级则继续遍历+递归
      if (data.children?.length) {
        data.children.forEach(child => {
          assginFinancial(child)
        })
      }
    })
  }

  // 获取明细
  const getFinOperaInfoHandle = async (type, currentInfo) => {
    const { data } = await getFinOperaInfo({
      ...unref(reqSearchParams),
      incomeType: currentInfo.incomeType
    })
    const res = data?.map(item => {
      return {
        label: item.incomeSortName,
        showLabel: true,
        color: currentInfo.color,
        arrowPosition: type === 'income' ? 'left' : 'right',
        detail: {
          currentPeriodAmount: { label: '本期金额', value: item.currentPeriodAmount },
          currentPeriodProportion: { label: '本期占比', value: item.currentPeriodProportion },
          lastPeriodAmount: { label: '上年同期', value: item.lastPeriodAmount },
          lastPeriodProportion: { label: '上期占比', value: item.lastPeriodProportion }
        }
      }
    })
    return res || []
  }

  // 改变line-xmind的图标状态(单状态原则，只能一个展开或是收起)
  const changeNextChildState = (status, type, currentInfo) => {
    financialTree[type].children.forEach(oneLevel => {
      oneLevel.children?.forEach(twoLevel => {
        twoLevel.showChild = false
        if (twoLevel.incomeType === currentInfo.incomeType && status) {
          twoLevel.showChild = status
        }
      })
    })
  }

  // 点击获取展开明细或收起
  const lastChildrenChange = async ({ status, type, currentInfo }) => {
    // 先改变展开或收起的状态
    changeNextChildState(status, type, currentInfo)
    // 只有展开时才请求
    let nextChildren = status ? await getFinOperaInfoHandle(type, currentInfo) : []
    if (type === 'expend') {
      currentleftDetail.value = status ? nextChildren : getJustifyDetail('expend')
    } else {
      currentRightDetail.value = status ? nextChildren : getJustifyDetail('income')
    }
  }

  // 监听顶部搜索改变重新拉去数据
  watch(reqSearchParams, () => {
    initDate()
  }, { deep: true })

  onMounted(() => {
    currentleftDetail.value = getJustifyDetail('expend')
    currentRightDetail.value = getJustifyDetail('income')
    initDate()
  })

  return {
    financialTree,
    getJustifyDetail,
    expendBgNode,
    incomeBgNode,
    currentleftDetail,
    currentRightDetail,
    lastChildrenChange
  }
}
