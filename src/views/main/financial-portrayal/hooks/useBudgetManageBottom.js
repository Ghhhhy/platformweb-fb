import { ref } from '@vue/composition-api'
export const useBudgetManageBottom = () => {
  const budgetManageTableData = ref([
    {
      period: '本期',
      begin: '41412.00',
      newly: '4124124142.99',
      reduce: '124124.90',
      end: '12414124.89',
      clearRatio: '41'
    },
    {
      period: '去年同期',
      begin: '41412.00',
      newly: '4124124142.99',
      reduce: '124124.90',
      end: '12414124.89',
      clearRatio: '41'
    }
  ])
  return {
    budgetManageTableData
  }
}
