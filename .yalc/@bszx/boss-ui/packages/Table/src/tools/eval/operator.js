/* eslint-disable */

// 当新的运算符注册时
const operatorListener = []
// 运算符
var operatorList = []
/**
 * 运算符单元，兼容ie8
 */
function OperatorUnit(name, level, fun) {
  this.name = name
  this.level = level
  this.fun = fun
}
OperatorUnit.prototype.check = function() {
  if (this.name == null || this.name.trim().length == 0 || this.level < 0 || this.fun == null) {
    throw new Error('运算符检查失败')
  }
}
OperatorUnit.prototype.copyTo = function(cfg) {
  let keys = ['name', 'level', 'fun']
  keys.forEach(function(a) {
    if (cfg[a] != null) {
      this[a] = cfg[a]
    }
  }.bind(this))
}
/**
 * @param {Object} item添加单元并且运行
 */
function addOperator(item) {
  if (item instanceof OperatorUnit) {
    item.check()
    operatorList.push(item)
    // 触发
    let map = {}
    operatorList.forEach((a) => {
      map[a.name] = a
    })
    for (let i = 0; i < operatorListener.length; i++) {
      if (operatorListener[i]) {
        operatorListener[i](operatorList, map)
      }
    }
    return
  }
  throw item
}

function registerOperator(cfg) {
  if (cfg.operator == null) {
    throw 'operator属性不能为null'
  }
  // cfg.operator
  let src = null
  for (let i = 0; i < operatorList.length; i++) {
    if (operatorList[i] && operatorList[i].name == cfg.operator) {
      src = operatorList[i]
      src.copyTo(cfg)
    }
  }
  if (!src) {
    addOperator(new OperatorUnit(cfg.operator, cfg.level, cfg.fun))
  }
}
module.exports = {
  operatorListener,
  registerOperator
}
