import { ref } from '@vue/composition-api'
export const useTimeSequenceChart = () => {
  // 当前时间
  const currentDate = new Date()
  const year = currentDate.getFullYear()
  const month = currentDate.getMonth() + 1
  const currentMonth = ref(currentDate.getMonth() + 1)

  // 获取当前月每天的数组
  const getCurrentMonthDate = () => {
    const days = []
    const daysNum = new Date(year, month, 0).getDate()
    for (let i = 1; i <= daysNum; i++) {
      days.push(i < 10 ? `0${i}` : i)
    }
    return days
  }
  // 当前月每日的数组
  const currentCurrentMonthDate = ref(getCurrentMonthDate())
  return {
    currentMonth,
    currentCurrentMonthDate
  }
}
