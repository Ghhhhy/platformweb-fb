export const getWarningLevelSelectOption = () => {
  return [
    { label: '系统级', value: 1 },
    { label: '财政级', value: 2 },
    { label: '部门级', value: 3 }
  ]
}

export const getRuleList = () => {
  const arr = []
  for (let i = 1; i < 100; i++) {
    arr.push(`规则名称${i}`)
  }
  return arr
}
export const getValueList = () => {
  const arr = [[]]
  for (let i = 0; i < 4; i++) {
    arr[i] = []
    for (let j = 0; j < 100; j++) {
      if (j % 4 === i) {
        arr[i][j] = parseInt(Math.random() * 1000)
      } else {
        arr[i][j] = 0
      }
    }
  }
  return arr
}
