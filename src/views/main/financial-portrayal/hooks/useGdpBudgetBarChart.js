import { reactive, onMounted } from '@vue/composition-api'

export const useGdpBudgetBarChart = () => {
  const amountList = reactive({
    value: 39829372,
    color: '#69D9AC'
  })
  const LastAmountList = [{
    value: 40283718,
    color: '#021330',
    title: '去年同期'
  }]
  const AdjustList = [
    {
      value: 2392483264,
      color: '#6395FA',
      title: '调整数'
    },
    {
      value: '53%',
      color: '#6395FA',
      title: '调整比例'
    }
  ]
  const GovernmentAdjust1 = [
    {
      value: 2392483264,
      color: '#6395FA',
      title: '调整数'
    }
  ]
  const GovernmentAdjust2 = [
    {
      value: '53%',
      color: '#6395FA',
      title: '调整比例'
    }
  ]
  const GovernmentAdjust3 = [
    {
      value: '53%',
      color: '#021330',
      title: '上年同期'
    }
  ]
  const GovernmentPayAdjust1 = [
    {
      value: 2392483264,
      color: '#6395FA',
      title: '调整数'
    }
  ]
  const GovernmentPayAdjust2 = [
    {
      value: '53%',
      color: '#6395FA',
      title: '调整比例'
    }
  ]
  const GovernmentPayAdjust3 = [
    {
      value: '53%',
      color: '#021330',
      title: '上年同期'
    }
  ]
  onMounted(() => {
    // 模拟异步请求 后续改为接口赋值
    setTimeout(() => {
    })
  })
  return {
    amountList,
    LastAmountList,
    AdjustList,
    GovernmentAdjust1,
    GovernmentAdjust2,
    GovernmentAdjust3,
    GovernmentPayAdjust1,
    GovernmentPayAdjust2,
    GovernmentPayAdjust3
  }
}
