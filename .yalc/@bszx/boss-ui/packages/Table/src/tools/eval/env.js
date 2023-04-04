/* eslint-disable */

// foreach
if (!Array.prototype.forEach) {
  Array.prototype.forEach = function(fun) {
    for (let i = 0; i < this.length; i++) {
      fun(this[i], i)
    }
  }
}
// 数组的map
if (!Array.prototype.map) {
  Array.prototype.map = function(fun) {
    let res = []
    for (let i = 0; i < this.length; i++) {
      res.push(fun(this[i], i))
    }
    return res
  }
}
// string
if (!String.prototype.trimRight) {
  String.prototype.trimRight = function() {
    var str = this
    for (var i = str.length - 1; i >= 0; i--) {
      if (str.charAt(i) != ' ') break
    }
    return str.slice(0, i + 1)
  }
}
if (!String.prototype.trim) {
  String.prototype.trim = function() {
    return this.replace(/(^\s*)|(\s*$)/g, '')
  }
}
/**
 * 字符串按位置查找
 */
function findByIndex(str, target, beg) {
  let _slef = str
  if (beg == null) {
    beg = 0
  }
  if (_slef.length >= target.length + beg) {
    let index, count
    for (let i = beg; i < _slef.length; i++) {
      index = i
      count = 0
      for (let j = 0; j < target.length; j++) {
        if (_slef.charAt(index++) != target.charAt(j)) {
          break
        }
        count++
      }
      if (count == target.length) {
        return i
      }
    }
  }
  return -1
}
/**
 * 根据关键字开始/结束进行栈帧式查找
 */
function findStrAndSplit(str, open, close, fun) {
  if (open.length != close.length) {
    throwSyntaxError()
  }
  let stack = []
  let num; let lastIndex = 0
  let tmpstr; let chartmp
  for (let i = 0; i < str.length; i++) {
    chartmp = str.substring(i, i + open.length)
    if (chartmp == open) {
      stack.push(i)
    } else if (chartmp == close) {
      num = stack.pop()
      if (stack.length == 0) {
        tmpstr = str.substring(lastIndex, num)
        if (tmpstr && tmpstr.length > 0) {
          fun(tmpstr, false, lastIndex, num)
        }
        num += open.length
        tmpstr = str.substring(num, i)
        fun(tmpstr, true, num, i)
        lastIndex = i + close.length
      }
    }
  }
  if (lastIndex < str.length) {
    tmpstr = str.substring(lastIndex, str.length)
    if (tmpstr && tmpstr.length > 0) {
      fun(tmpstr, false, lastIndex, str.length)
    }
  }
}
module.exports = {
  findByIndex,
  findStrAndSplit,
  constant: {
    // 运算符类型
    operatUnitType: 0,
    // 三目运算符
    threeEyeDynamicType: 5,
    // 普通寻址
    findValueDynamicType: 4,
    // 方法
    funDynamicType: -2,
    // 需要计算的参数
    runDynamicType: -1
  },
  // id
  getUUID(len) {
    len = len || 32
    let res = ''
    for (let i = 0; i < len; i++) {
      res += String.fromCharCode(97 + Math.floor(Math.random() * 26))
    }
    return res
  }

}
