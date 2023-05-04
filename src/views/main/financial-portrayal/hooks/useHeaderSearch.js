import { ref } from '@vue/composition-api'
// 顶部筛选
export const useHeaderSearch = () => {
  // 默认日期(时间戳)
  const defaultDate = ref(new Date().getTime())
  // 当前date-picker选中的日期
  const currentDate = ref(defaultDate.value)
  // 区划树默认选中的code
  const defaultMofDivCode = ref('')
  // 当前区划树选中code
  const currentMofDivCode = ref('')
  // 区划树选中切换
  const treeSelectChange = code => {
    currentMofDivCode.value = code
  }
  // 日期切换
  const dateChangeHandle = timestamp => {
    currentDate.value = timestamp
  }

  // 请求所需参数 主要是提供给子孙组件使用（子孙组件自行监听改变，重新请求更新数据）
  const reqSearchParams = ref({
    mofDivCode: defaultMofDivCode.value || '',
    fiscalYear: new Date(defaultDate.value || '').getFullYear(),
    acctPeriod: new Date(defaultDate.value || '').getMonth() + 1,
    month: new Date(defaultDate.value || '').getMonth() + 1
  })

  // 点击搜索设置请求参数
  const setReqSearchParams = () => {
    reqSearchParams.value = {
      mofDivCode: currentMofDivCode.value || '',
      fiscalYear: new Date(currentDate.value || '').getFullYear(),
      acctPeriod: new Date(currentDate.value || '').getMonth() + 1,
      month: new Date(currentDate.value || '').getMonth() + 1
    }
  }

  // 点击重置恢复默认值
  const resetReqSearchParams = () => {
    reqSearchParams.value = {
      mofDivCode: defaultMofDivCode.value || '',
      fiscalYear: new Date(defaultDate.value || '').getFullYear(),
      acctPeriod: new Date(defaultDate.value || '').getMonth() + 1,
      month: new Date(defaultDate.value || '').getMonth() + 1
    }
  }
  return {
    defaultDate,
    defaultMofDivCode,
    treeSelectChange,
    dateChangeHandle,
    reqSearchParams,
    setReqSearchParams,
    resetReqSearchParams
  }
}
