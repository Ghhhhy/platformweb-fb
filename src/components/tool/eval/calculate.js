/* eslint-disable */
const {
  // 运算符类型
  operatorListener
} = require('./operator.js')
const {
  getUUID,
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
// 运算符
var operatorMap
operatorListener.push((list, map) => {
  operatorMap = map
})
// 计算
function calculateToSharedVars(scripts, sharedVarss) {
  let stack = []
  let item
  for (let i = 0; i < scripts.length; i++) {
    item = scripts[i]
    if (item.control == 1) {
      if (item.isStatic) {
        // 静态
        stack.push(item.value)
      } else {
        switch (item.type) {
          case threeEyeDynamicType:
            // 三目
            let test = calculate(item.checkCodes, sharedVarss)
            stack.push(calculate(
              test
              // 成功的
                ? item.correctCodes
              // 失败的
                : item.errorCodes, sharedVarss))
            break
          case findValueDynamicType:
            // 引用
            stack.push(findVarsValue(item.scripts, sharedVarss).handle)
            break
          case runDynamicType:
            // 需要动态运行的脚本
            stack.push(calculate(item.scripts, sharedVarss))
            break
          case funDynamicType:
            // 方法
            let {
              root,
              handle
            } = findVarsValue(item.vars, sharedVarss)
            if (handle) {
              let params = []
              if (item.params.length > 0) {
                for (let k = 0; k < item.params.length; k++) {
                  params.push(calculate(item.params[k], sharedVarss))
                }
              }
              stack.push(handle.apply(root || env, params))
            } else {
              stack.push(null)
            }
            break
        }
      }
    } else if (item.control == 0) {
      // 运算符
      let b = stack.pop()
      let a = stack.pop()
      stack.push(operatorMap[item.value].fun(a, b, stack))
    }
  }
  return stack.pop()
};
const calculate = calculateToSharedVars
/**
 * 变量查找
 */
function findVarsValue(vars, _selfSharedVars) {
  // 句柄
  let handle
  let root
  // 计数
  let key
  for (let i = 0; i < vars.length; i++) {
    key = calculate([vars[i]], _selfSharedVars)
    if (i == 0) {
      if (vars[i].reserve) {
        handle = vars[i].value
      } else {
        // 环境变量里面找
        for (let k = 0; k < _selfSharedVars.length; k++) {
          root = _selfSharedVars[k]
          handle = root[key]
          if (handle != null) {
            break
          }
        }
      }
    } else {
      if (handle != null) {
        root = handle
        handle = handle[key]
      }
    }
  }
  return {
    root: root,
    handle: handle
  }
}
// 常量
module.exports = {
  calculate
}
