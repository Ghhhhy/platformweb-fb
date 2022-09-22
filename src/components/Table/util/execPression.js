import cal from '../tool/util'

// 计算思路：拆分拆分拆分
// 1+2+3 => [1,2,3]+
// 1+2*3+4 => [1, 2*3, 4]+ => [1] [2, 3] [4]*
// split expression by operator considering parentheses
// [](https://miro.medium.com/max/789/1*yKSG4mq5YCLJCBnfEUG0eQ.png)
const split = (expression, operator) => {
  const result = []
  let braces = 0
  let currentChunk = ''
  for (let i = 0; i < expression.length; ++i) {
    const curCh = expression[i]
    if (curCh === '(') {
      braces++
    } else if (curCh === ')') {
      braces--
    }
    if (braces === 0 && operator === curCh) {
      result.push(currentChunk)
      currentChunk = ''
    } else currentChunk += curCh
  }
  if (currentChunk !== '') {
    result.push(currentChunk)
  }
  return result
}
// this will only take strings containing * operator [ no + ]
const parseDivisionSeparatedExpression = (expression) => {
  const numbersString = split(expression, '/')
  const numbers = numbersString.map(noStr => {
    if (noStr[0] === '(') {
      const expr = noStr.substr(1, noStr.length - 2)
      // recursive call to the main function
      return parsePlusSeparatedExpression(expr)
    }
    return noStr
  })
  const result = numbers.reduce((acc, no) => {
    return cal.accurateChuFa(acc, no)
  })
  return result
}
// this will only take strings containing * operator [ no + ]
const parseMultiplicationSeparatedExpression = (expression) => {
  const numbersString = split(expression, '*')
  const numbers = numbersString.map(noStr => parseDivisionSeparatedExpression(noStr))
  const initialValue = numbers[0]
  const result = numbers.slice(1).reduce((acc, no) => {
    return cal.accurateChengFa(acc, no)
  }, initialValue)
  return result
}
// both * -
const parseMinusSeparatedExpression = (expression) => {
  const numbersString = split(expression, '-')
  const numbers = numbersString.map(noStr => parseMultiplicationSeparatedExpression(noStr))
  const initialValue = numbers[0]
  const result = numbers.slice(1).reduce((acc, no) => {
    return cal.accurateJianfa(acc, no)
  }, initialValue)
  return result
}
// * - +
export const parsePlusSeparatedExpression = (expression) => {
  const numbersString = split(expression, '+')
  const numbers = numbersString.map(noStr => parseMinusSeparatedExpression(noStr))
  const initialValue = 0.0
  const result = numbers.reduce((acc, no) => {
    return cal.accurateJiafa(acc, no)
  }, initialValue)
  return result
}
