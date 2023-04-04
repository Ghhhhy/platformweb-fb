/* eslint-disable */
const {
  // 运算符类型
  operatorListener
} = require('./operator.js')
// 运行环境的一些适配
const {
  getUUID,
  findByIndex,
  findStrAndSplit,
  constant: {
    // 常量
    operatUnitType,
    findValueDynamicType,
    // 三目运算符
    threeEyeDynamicType,
    // 方法
    funDynamicType,
    // 需要计算的参数
    runDynamicType
  }
} = require('./env.js')
/**
 * 查找最近的字符
 */
function findNearestStr(str, open, close) {
  var findStr = true
  findStrAndSplit(str, '(', ')', (tmpstr, find) => {
    if (find && findStr) {
      findStr = false
      str = tmpstr
    }
  })
  return !findStr ? {
    value: str,
    scriptStr: `${open}${str}${close}`
  } : {}
}
/**
 * 编译引用变量
 * @param {Object} str
 */
function compileReference(str) {
  let vars = []
  // 变量整理
  findStrAndSplit(str, '[', ']', (tmpstr, find) => {
    if (find) {
      let unit = createDynamicUnit(runDynamicType, tmpstr)
      unit.scripts = scriptCompile(tmpstr)
      vars.push(unit)
    } else {
      tmpstr.split('.').forEach((a) => {
        if (a && a.length > 0) {
          vars.push(usedUnitMapper['string'].fun(a))
        }
      })
    }
  })
  return vars
}
var syntaxChain, operatorMap
// 当运算符规则改变时
operatorListener.push((list, map) => {
  operatorMap = map
  var res = []
  list.forEach((a) => {
    let key = a.name
    res.push({
      name: key,
      type: operatUnitType,
      fun(content) {
        addCodeBuffer(content,
          // 只检查类型即可
          createOperatUnit(this.name))
      }
    })
  })
  unChangeSyntaxChain.forEach((a) => res.push(a))
  syntaxChain = res.sort((a, b) => {
    return b.name.length - a.name.length
  })
})
// 不变的语法
const unChangeSyntaxChain = [
  // 点
  {
    name: '.',
    type: runDynamicType,
    fun(content, str) {
      const arrIndex = content.codeBuffer.length - 1
      let item = content.codeBuffer[arrIndex]
      if (item === null || item === undefined) {
        throwSyntaxError(str)
      }
      item.value += this.name
    }
  },
  // 小括号
  {
    name: '(',
    type: runDynamicType,
    fun(content, str) {
      const {
        value,
        scriptStr
      } = findNearestStr(str.substring(content.index, str.length), '(', ')')
      content.index += scriptStr.length
      const codeBuffer = content.codeBuffer
      // 添加
      let item = codeBuffer[codeBuffer.length - 1]
      if (item && operatUnitType != item.type) {
        // 设置为方法
        item.type = funDynamicType
        item.vars = item.value
        item.value += scriptStr
        item.params = value
      } else {
        // 设置动态执行单元
        let unit = createDynamicUnit(runDynamicType, scriptStr)
        addCodeBuffer(content, unit)
      }
      return false
    }
  },
  // 三目运算符
  {
    name: '?',
    type: runDynamicType,
    fun(content, str) {
      const codeBuffer = content.codeBuffer
      if (codeBuffer.length > 0) {
        let limit
        if ((limit = str.lastIndexOf(':')) && limit > content.index) {
          // 三目
          let unit = createDynamicUnit(threeEyeDynamicType, str)
          // 之前
          unit.checkCodes = scriptCompile(str.substr(0, content.index))
          // 找到成功的表达式
          unit.correctCodes = scriptCompile(str.substring(content.index + 1, limit))
          // 找到失败的表达式
          unit.errorCodes = scriptCompile(str.substring(limit + 1, str.length))
          content.codeBuffer = [unit]
          content.index = str.length
        }
      }
    }
  }
]
// 静态单元
function createStaticUnit(type, value) {
  return {
    type: type,
    control: 1,
    value: value,
    isStatic: true
  }
}
// 运算符单元
function createOperatUnit(str) {
  return {
    type: operatUnitType,
    control: 0,
    value: String(str),
    isStatic: true
  }
}
// 动态执行单元
function createDynamicUnit(type, value) {
  return {
    type: type,
    control: 1,
    value: String(value),
    isStatic: false
  }
}
const usedUnitBuilder = [{
  // 数字
  reg: /(^\d+$|(^\d+?\.{0,1}\d+$))/,
  type: 'number',
  level: 2,
  fun: (str) => createStaticUnit(1, str)
}, {
  // 字符串
  reg: /^('|").*('|")$/,
  type: 'string',
  level: 2,
  fun: (str) => {
    let res
    if (res = /^['"](.*)['"]$/.exec(str)) {
      str = String(res[1])
    }
    return createStaticUnit(2, str)
  }
}, {
  // 引用
  type: 'reference',
  level: 3,
  reg: /^([a-z]|\_).*$/i,
  fun: (str) => {
    return createDynamicUnit(findValueDynamicType, str)
  }
},
{
  // 引用
  type: '=',
  level: 3,
  reg: /^([a-z]|\_).*$/i,
  fun: (str) => {
    return createDynamicUnit(findValueDynamicType, str)
  }
}
].sort((a, b) => b.level - a.level)
// 单元映射
const usedUnitMapper = (() => {
  let map = {}
  usedUnitBuilder.forEach((a) => {
    map[a.type] = a
  })
  return map
})()
// 检查/创建用户单元
function checkAndCreateUsedUnit(str) {
  // 去掉首位空格
  let unit
  for (let i = 0; i < usedUnitBuilder.length; i++) {
    unit = usedUnitBuilder[i]
    if (unit.reg.test(str)) {
      return unit.fun(str)
    }
  }
  throwSyntaxError(str)
};
// 添加单元
function addCodeBuffer(content, item) {
  let up
  // 如果不是一个运算符且之前有连续的，那么不需要拆开比如说Math.max
  if (content.codeBuffer.length > 0 && item.type != operatUnitType) {
    up = content.codeBuffer[content.codeBuffer.length - 1]
    if (up.type == operatUnitType) {
      up = null
    }
  }
  if (up) {
    up.value += item.value
  } else {
    content.codeBuffer.push(item)
  }
}
// 整理方法参数
function paseFunParams(str) {
  let bracketsIndex = 0
  let lastIndex = 0
  // 参数
  let params = []
  let chartmp
  for (let i = 0; i < str.length; i++) {
    chartmp = str.charAt(i)
    if (chartmp == '(') {
      bracketsIndex++
    } else if (chartmp == ')') {
      bracketsIndex--
    } else if (chartmp == ',' && bracketsIndex == 0) {
      params.push(str.substring(lastIndex, i))
      lastIndex = i + 1
    }
  }
  if (lastIndex < str.length) {
    params.push(str.substring(lastIndex, str.length))
  }
  return params
}
/**
 * 编译
 * @param {Object} str
 */
function stringCompile(str) {
  const content = {
    index: 0,
    codeBuffer: []
  }
  var minIndex, minSyntax, tmpstr
  while (content.index < str.length) {
    minIndex = 0x7fffffff
    minSyntax = null
    syntaxChain.forEach((syntax) => {
      let i = findByIndex(str, syntax.name, content.index)
      if (i > -1 && i < minIndex) {
        minIndex = i
        minSyntax = syntax
      }
    })
    minIndex = Math.min(minIndex, str.length)
    if (content.index < minIndex) {
      addCodeBuffer(content,
        // 只检查类型即可
        checkAndCreateUsedUnit(str.substring(content.index, minIndex)))
    } else if (content.index == minIndex && minSyntax.name === '-') { 
      // 遇见 - 缺少左半边单元自动补0
      addCodeBuffer(content, 
       createStaticUnit(1, 0));
     } else if (content.index == minIndex && minSyntax.name === '+') {
      // 遇见 + 缺少左半边单元自动补''
      addCodeBuffer(content,
       createStaticUnit(2, ''));
     }else {
      
     }
    content.index = minIndex
    if (minSyntax) {
      if (minSyntax.fun(content, str) !== false) {
        content.index += minSyntax.name.length
      }
    }
  }
  let buffer = content.codeBuffer
  buffer.forEach((a) => {
    if (a.isStatic) {
      let numType = usedUnitMapper['number']
      if (operatUnitType !== a.type && numType.reg.test(a.value)) {
        // 数字判断
        a.value = Number(a.value)
      }
    } else {
      switch (a.type) {
        case runDynamicType:
          // 需要计算的
          let res
          if (res = /^\((.+)\)$/.exec(a.value)) {
            a.scripts = scriptCompile(res[1])
          }
          break
        case funDynamicType:
          // 方法
          a.vars = compileReference(a.vars)
          a.params = paseFunParams(a.params).map((a) => scriptCompile(a))
          break
        case findValueDynamicType:
          // 寻址
          a.scripts = compileReference(a.value)
          break
        case threeEyeDynamicType:
          // 三目
          break
        default:
          console.log(a)
          break
      }
    }
  })
  return buffer
}
/**
 * 恢复字符串
 */
function recoveryCharPool(charPool, codes) {
  if (codes) {
    for (let i = 0; i < codes.length; i++) {
      let code = codes[i]
      if (code instanceof Array) {
        recoveryCharPool(charPool, code)
      } else {
        if (code.isStatic && charPool[code.value]) {
          code.value = charPool[code.value]
          // 预定的
          code.reserve = true
        } else {
          code.value = code.value
          // 预定的
          code.reserve = false
        }
        recoveryCharPool(charPool, code.vars)
        recoveryCharPool(charPool, code.params)
        recoveryCharPool(charPool, code.scripts)
      }
    }
  }
}
/**
 * 重排序
 * @param {Object} scripts
 */
function operatorCompile(codeSource) {
  // 编译
  let
    // 操作符栈
    stack = []
  // 代码
  let codes = []
  // 单元表
  let units = []
  // 操作符列表
  let operators = [
    // 第一个不处理，免得出现1+null的现象
    null
  ]
  let operator; let unit
  while (codeSource.length > 0) {
    unit = codeSource.shift();
    ((unit.type == operatUnitType) ? operators : units).push(unit)
  }
  for (let i = 0; i < units.length; i++) {
    operator = operators[i]
    if (operator != null) {
      // 按照运算符优先级处理
      while (stack.length > 0 && operatorMap[operator.value].level <= operatorMap[stack[stack.length - 1].value]
        .level) {
        codes.push(stack.pop())
      }
      stack.push(operator)
    }
    codes.push(units[i])
  }
  while (stack.length > 0) {
    codes.push(stack.pop())
  }
  return codes
}

function scriptCompile(str) {
  if (/\d\-\-\d/.test(str)) {
    throw 'Invalid left-hand side expression in postfix operation'
  }
  // 去掉首尾空字符串
  str = str.replace(/(^\s*)|(\s*$)/g, '')
  // 处理负数,比如-1转变为0-1
    .replace(/^\-\d|[\=\+\:\<\>\|\&]\-\d/g, (a) => {
      let regres
      if (regres = /(.+)\-(.+)/.exec(a)) {
        return `${regres[1]}0-${regres[2]}`
      }
      return `0${a}`
    })
  let charPool = {}
  '"\''.split('').forEach((a) => {
    str = str.replace(new RegExp(`${a}([^${a}]+)${a}`, 'g'), (b, tmp) => {
      let id = `stri${getUUID(28)}`
      charPool[id] = tmp
      return id
    })
  })
  let codes = stringCompile(str)
  recoveryCharPool(charPool, codes)
  return operatorCompile(codes)
}
module.exports = {
  scriptCompile
}
