
// import bigDecimal from './js-big-decimal.js'
// let bigDecimalCall = bigDecimal
// console.log(bigNumberCall)
import BigNumber from './big.js'
export default {
  getbasicDataType(obj) {
    // 获取数据类型
    return Object.prototype.toString.call(obj).slice(8, -1)
  },
  isEmptyObj(obj) { // 空对象
    return (this.getbasicDataType(obj) === 'object' && Object.keys(obj).length) || this.getbasicDataType(obj) === null
  },
  hyphenate(str) {
    // 小驼峰转成连字符
    return str.replace(/\B([A-Z])/g, '-$1').toLowerCase()
  },
  hyphenToCamel(str) { // 下划线转小驼峰
    return str.replace(/[A-Za-z]{1,}/ig, function ($0, $1, $2) {
      return $0.toLowerCase()
    }).replace(/([^_])(?:_+([^_]))/g, function ($0, $1, $2) {
      return $1 + $2.toUpperCase()
    })
  },
  smallHump(str) {
    // 连字符转成小驼峰
    return str.replace(/(\w*)-(\w*)/g, function ($1, $2, $3) {
      return $2 + $3[0].toUpperCase() + $3.slice(1)
    })
  },
  muchfieldarrsort(sarr, keys) {
    // 多字段排序s
    /** sarr：原始数组。 keys:要排序的多个字段,必须为数组 */
    return sarr.sort(compare)
    function compare(a, b, c = keys[0], i = 0) { // 按合并类型递归排序
      // let c = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : groupfieldarr[0];
      // let i = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
      if (a[c] === b[c]) { // 等于的话进行判断是否还有后续字段需要排序，没有则返回0；有则递归进行后续字段排序处理。
        if (i === (keys.length - 1)) { // 没有后续字段
          i = 0
          return 0
        }
        i += 1
        return compare(a, b, keys[i], i) // 递归排序后续字段
      } else if (a[c] > b[c]) { // 大于返回1
        return 1
      } else { // 小于返回-1
        return -1
      }
    }
  },
  listToTree(tempData, idkey = 'id', pidKey = 'pid') { // 平行数据 idkey和pidKey 生成嵌套数据
    let map = {}
    tempData.forEach(function (item) {
      map[item[idkey]] = item
      item.children = []
    })
    let treeData = []
    tempData.forEach(item => {
      const mapItem = map[item[pidKey]]
      if (mapItem) {
        (mapItem.children || (mapItem.children = [])).push(item)
      } else {
        treeData.push(item)
      }
    })
    return treeData
  },
  listToTreeByNestCodeLength(data, nestCodeKey) { // 平行数据 根据nestCodeKey 长度 生成嵌套数据
    let map = {} // 构建map
    data.forEach(function (item) {
      map[item[nestCodeKey]] = item
      item.children = []
    })
    let treeData = []
    data.forEach(item => {
      let pnestCodeKey = item[nestCodeKey]
      pnestCodeKey = pnestCodeKey.slice(0, pnestCodeKey.length - 1)
      let mapItem = map[item[pnestCodeKey]]
      while (!mapItem && pnestCodeKey !== '') {
        pnestCodeKey = pnestCodeKey.slice(0, pnestCodeKey.length - 1)
        mapItem = map[pnestCodeKey]
      }
      if (mapItem) {
        (mapItem.children || (mapItem.children = [])).push(item)
      } else {
        treeData.push(item)
      }
    })
    return treeData
  },
  deepCopy(obj) {
    // 深拷贝通用方法
    let me = this
    let newObj = null
    if (typeof obj !== 'object' || obj === null) {
      newObj = obj
    } else {
      if (obj instanceof Array) {
        newObj = obj.map((item, index) => {
          return me.deepCopy(item)
        })
      } else if (obj instanceof Object) {
        newObj = {}
        for (let key in obj) {
          newObj[key] = me.deepCopy(obj[key])
        }
      } else if (obj instanceof Map) {
        newObj = new Map()
        obj.keys().forEach((mapV, mapK) => {
          newObj.set(mapK, me.deepCopy(mapV))
        })
      } else if (obj instanceof Set) {
        newObj = new Map()
        Set.forEach((setV, setI) => {
          newObj.add(me.deepCopy(setV))
        })
      } else {
      }
      // eslint-disable-next-line no-proto
      // newObj.__proto__ = obj.__proto__
    }
    return newObj
  },
  toNumberLocaleString(num) {
    return (num + '').replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g, '$1,').replace(/(,$)/, '')
  },
  reduceCalc(arr, cb) {
    return arr.reduce(cb.bind(this))
  },
  mathPow10(n) { // 10的N次方
    if (n >= 0) {
      return Number('1'.padEnd(+n + 1, 0))
    } else {
      return 1 / Number('1'.padEnd(-n + 1, 0))
    }
  },
  accurateJiafa(arg1, arg2) { // 精确加法
    arg1 = isNaN(Number(arg1)) ? 0 : Number(arg1)
    arg2 = isNaN(Number(arg2)) ? 0 : Number(arg2)
    return new BigNumber(arg1).plus(new BigNumber(arg2)).toNumber()
    // return bigDecimal.add(arg1, arg2)
    // let r1, r2, m
    // try { r1 = arg1.toString().split('.')[1].length } catch (e) { r1 = 0 }
    // try { r2 = arg2.toString().split('.')[1].length } catch (e) { r2 = 0 }
    // m = this.mathPow10(Math.max(r1, r2))
    // return (arg1 * m + arg2 * m) / m
  },
  accurateJianfa(arg1, arg2) { // 精确减法
    arg1 = isNaN(Number(arg1)) ? 0 : Number(arg1)
    arg2 = isNaN(Number(arg2)) ? 0 : Number(arg2)
    return new BigNumber(arg1).minus(new BigNumber(arg2)).toNumber()
    // return bigDecimal.subtract(arg1, arg2)
    // let r1, r2, m, n
    // try { r1 = arg1.toString().split('.')[1].length } catch (e) { r1 = 0 }
    // try { r2 = arg2.toString().split('.')[1].length } catch (e) { r2 = 0 }
    // m = this.mathPow10(Math.max(r1, r2))
    // // last modify by deeka
    // // 动态控制精度长度
    // n = (r1 >= r2) ? r1 : r2
    // return this.accurateFixed(((arg1 * m - arg2 * m) / m), n)
  },
  accurateChengFa(arg1, arg2) { // 精确乘法
    arg1 = isNaN(Number(arg1)) ? 0 : Number(arg1)
    arg2 = isNaN(Number(arg2)) ? 0 : Number(arg2)
    return new BigNumber(arg1).mul(new BigNumber(arg2)).toNumber()
    // // return bigDecimal.multiply(arg1, arg2)
    // let m = 0; let s1 = arg1.toString(); let s2 = arg2.toString()
    // try { m += s1.split('.')[1].length } catch (e) { }
    // try { m += s2.split('.')[1].length } catch (e) { }
    // return Number(s1.replace('.', '')) * Number(s2.replace('.', '')) / this.mathPow10(m)
  },
  accurateChuFa(arg1 = 0, arg2 = 0, precision = 8) { // 精确除法
    arg1 = isNaN(Number(arg1)) ? 0 : Number(arg1)
    arg2 = isNaN(Number(arg2)) ? 0 : Number(arg2)
    if (!arg2) {
      console.error('除数不能为0')
      return ''
    } else {
      return new BigNumber(arg1).div(new BigNumber(arg2)).toNumber()
    }
    // // return bigDecimal.divide(arg1, arg2, precision)
    // let t1 = 0; let t2 = 0; let r1; let r2
    // try { t1 = arg1.toString().split('.')[1].length } catch (e) { }
    // try { t2 = arg2.toString().split('.')[1].length } catch (e) { }
    // r1 = Number(arg1.toString().replace('.', ''))
    // r2 = Number(arg2.toString().replace('.', ''))
    // return this.accurateChengFa(r1 / r2, this.mathPow10(t2 - t1))
  },
  // accurateFixed(number, n) { // 保留小数位数(四舍五入)
  //   // return bigDecimal.round(number, n)
  //   n = n ? parseInt(n) : 0
  //   if (n <= 0) {
  //     return String(Math.round(number))
  //   } else {
  //     number = this.transInputToNumber(number * this.mathPow10(n) / this.mathPow10(n), n)
  //   }
  //   return String(number)
  // },
  accurateFixed(number, n) { // 保留小数位数(截取)
    let numberArr = this.transInputToNumber(number, n).split('.')
    if (n > 0) {
      return numberArr[0] + (numberArr[1] ? ('.' + numberArr[1].slice(0, n)) : '')
    } else {
      return numberArr[0] || ''
    }
  },
  transToNumberLocalString(number, digits = 0) {
    // 返回逗号隔开千分位的数字
    let result = ''
    digits = parseInt(digits)
    // number = Number(number).toFixed(digits)
    number = this.accurateFixed(number, digits)
    if (isNaN(number)) {
      number = this.accurateFixed('', digits)
    }
    if (number.indexOf('-') === 0) {
      result = '-'
    }
    number = Number(number).toLocaleString('zh-Hans-CN', {
      style: 'decimal',
      minimumIntegerDigit: 1,
      minimumFractionDigits: 1,
      maximumFractionDigits: 20,
      minimumSignificantDigits: 1,
      maximumSignificantDigits: 21
    })
    let numberArr = number.split('').filter((item, index) => {
      return new RegExp('^[0-9.,]$').test(item)
    }).join('').split('.')
    if (numberArr[0] === '') {
      numberArr[0] = '0'
    }
    if (digits === 0) {
      numberArr = [numberArr[0], (numberArr[1] ? '.' + numberArr[1] : '')]
      return result + numberArr[0] + numberArr[1]
    } else {
      let numberArr1 = numberArr[1] ? numberArr[1].split('') : []
      numberArr1 = [...numberArr1, ...new Array(digits).fill('0')]
      numberArr1.length = digits
      numberArr = [numberArr[0], '.', ...numberArr1]
      return result + numberArr.join('')
    }
  },
  transToNumber(number, digits = 0) {
    //  任意字符过滤为数字
    digits = isNaN(parseInt(digits)) ? 0 : parseInt(digits)
    try {
      number = this.accurateFixed(number, digits)
      if (isNaN(number)) {
        number = this.accurateFixed('', digits)
      }
      return number
    } catch (e) {
      return ''
    }
  },
  transInputToNumber(number, maxDigits) {
    let result = ''
    number = String(number)
    if (number.indexOf('-') === 0) {
      result = '-'
    }
    let numberArr = number.split('').filter((item, index) => {
      return new RegExp('^[0-9.]$').test(item)
    }).join('').split('.')

    if (numberArr[0] === '' && numberArr[1] !== undefined) {
      numberArr[0] = '0'
    }
    if (numberArr.length > 1) {
      if (maxDigits >= 0) {
        numberArr[1] = numberArr[1].substr(0, maxDigits)
      }
      numberArr = [numberArr[0], '.', numberArr[1]]
    } else {
    }
    return result + numberArr.join('')
  },
  digitUppercase(money, type = 'money') {
    // 汉字的数字
    // digitUppercase(-111111111111111.1111, 'number') "负一百一十一万一千一百一十一亿一千一百一十一万一千一百一十一点一一"
    // digitUppercase(-111111111111111.1111) "欠壹佰壹拾壹万壹仟壹佰壹拾壹亿壹仟壹佰壹拾壹万壹仟壹佰壹拾壹元壹角壹分"
    let cnNums = type === 'number' ? ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十'] : ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖']
    // 基本单位
    let cnIntRadice = type === 'number' ? ['', '十', '百', '千'] : ['', '拾', '佰', '仟']
    // 对应整数部分扩展单位
    let cnIntUnits = type === 'number' ? ['', '万', '亿', '万'] : ['', '万', '亿', '万']
    // 对应小数部分单位
    let cnDecUnits = type === 'number' ? ['', '', '', ''] : ['角', '分', '毫', '厘']
    // 整数金额时后面跟的字符
    let cnInteger = type === 'number' ? '' : '整'
    // 整型完以后的单位
    let cnIntLast = type === 'number' ? '' : '元'
    // 最大处理的数字
    let maxNum = 999999999999999.9999
    // 金额整数部分
    let integerNum
    // 金额小数部分
    let decimalNum
    // 输出的中文金额字符串
    // 分离金额后用的数组，预定义
    let parts
    let chineseStr = money < 0 ? type === 'number' ? '负' : '欠' : ''
    money = (money + '').split('').filter((item, index) => {
      return new RegExp('^[0-9.]$').test(item)
    }).join('')
    if (money === '') { return '' }
    money = Math.abs(money) + ''
    if (money >= maxNum) {
      // 超出最大处理数字
      return ''
    }
    if (money === 0) {
      chineseStr = chineseStr + (cnNums[0] + cnIntLast + cnInteger)
      return chineseStr
    }
    // 转换为字符串
    if (money.indexOf('.') === -1) {
      integerNum = money
      decimalNum = ''
    } else {
      parts = money.split('.')
      integerNum = parts[0]
      decimalNum = parts[1].substr(0, 4)
    }
    // 获取整型部分转换
    if (parseInt(integerNum, 10) > 0) {
      let zeroCount = 0
      let IntLen = integerNum.length
      for (let i = 0; i < IntLen; i++) {
        let n = integerNum.substr(i, 1)
        let p = IntLen - i - 1
        let q = p / 4
        let m = p % 4
        if (n === '0') {
          zeroCount++
        } else {
          if (zeroCount > 0) {
            chineseStr += cnNums[0]
          }
          // 归零
          zeroCount = 0
          chineseStr += cnNums[parseInt(n)] + cnIntRadice[m]
        }
        if (m === 0 && zeroCount < 4) {
          chineseStr += cnIntUnits[q]
        }
      }
      chineseStr += cnIntLast
    }
    // 小数部分
    if (decimalNum !== '') {
      chineseStr = chineseStr + (type === 'number' ? '点' : '')
      let decLen = decimalNum.length
      for (let i = 0; i < decLen; i++) {
        let n = decimalNum.substr(i, 1)
        if (n !== '0') {
          chineseStr += cnNums[Number(n)] + cnDecUnits[i]
        }
      }
    }
    if (chineseStr === '') {
      chineseStr += cnNums[0] + cnIntLast + cnInteger
    } else if (decimalNum === '') {
      chineseStr += cnInteger
    }
    return chineseStr
  },
  performGradedSummarySingData(obj, gradedCalcFields) { // 分级汇总单条数据计算
    let self = this
    if (Array.isArray(obj.children) && obj.children.length) {
      gradedCalcFields.forEach((key) => {
        obj[key] = obj.children.reduce((preResult, next) => {
          let curItemGradedSummaryValue = 0
          if (Array.isArray(next.children) && next.children.length) {
            curItemGradedSummaryValue = parseFloat(self.performGradedSummarySingData(next, gradedCalcFields)[key])
          } else {
            curItemGradedSummaryValue = parseFloat(next[key])
          }
          return preResult + (isNaN(curItemGradedSummaryValue) ? 0 : curItemGradedSummaryValue)
        }, 0)
      })
    }
    return obj
  },
  performGradedSummaryData(data, gradedCalcFields) { // 数组分级汇总计算
    let self = this
    data.forEach((item) => {
      self.performGradedSummarySingData(item, gradedCalcFields)
    })
    return data
  },
  each(object, callback) {
    /* js原生each方法 */
    let type = (function (obj) {
      switch (obj.constructor) {
        case Object:
          return 'Object'
        case Array:
          return 'Array'

        case NodeList:
          return 'NodeList'
        default:
          return 'null'
      }
    })(object)
    // 为数组或类数组时, 返回: index, value
    if (type === 'Array' || type === 'NodeList') {
      // 由于存在类数组NodeList, 所以不能直接调用every方法
      [].every.call(object, function (v, i) {
        return callback.call(v, i, v) !== false
      })
    } else if (type === 'Object') {
      // 为对象格式时,返回:key, value
      for (let i in object) {
        if (callback.call(object[i], i, object[i]) === false) {
          break
        }
      }
    }
  },
  assign(dist) { // 表层合并
    [...arguments].slice(1).forEach((obj) => {
      for (var key in obj) {
        if (obj.hasOwnProperty(key) && key !== 'constructor' && obj[key] !== undefined) {
          dist[key] = obj[key]
        }
      }
    })
    return dist
  },
  deepAssignOne(dist, src, level = 0, maxLevel = 5) { // 深度合并一个
    let self = this
    for (var key in src) {
      if (src.hasOwnProperty(key)) {
        var value = src[key]
        if (this.getbasicDataType(value) === 'Object') {
          if (this.getbasicDataType(dist[key]) !== 'Object') {
            dist[key] = {}
          }
          if (level < maxLevel) {
            self.deepAssignOne(dist[key], value, level + 1, maxLevel)
          } else {
            dist[key] = src[key]
          }
        } else if (Array.isArray(value)) {
          dist[key] = []
          dist[key] = dist[key].concat(value)
        } else if (value !== undefined) {
          dist[key] = value
        }
      }
    }
  },
  deepAssign() { // // 深度合并多个
    let self = this
    let arg = [...arguments]
    var rst = arg[0]
    arg.slice(1).forEach((src) => {
      self.deepAssignOne(rst, src)
    })
    return rst
  },
  getErrorKey(data, key, valikey = (key) => { return true }, map = {}, list = []) { // 金典递归来获取数据里的重复key
    let self = this
    data.forEach((item, index) => {
      if (!map[item[key]] && item[key] && valikey(item[key])) {
        map[item[key]] = item
      } else {
        console.log('存在错误key的集合为', item, item[key])
        list.push(item)
        if (map[item[key]]) {
          list.push(map[item[key]])
        }
      }
      if (Array.isArray(item.children) && item.children.length) {
        self.getErrorKey(item.children, key, valikey, map, list)
      }
    })
    return list
  },
  debounce: (function (debounce) {
    return debounce(1000)
  })(function (delay) {
    // 利用闭包保存定时器
    let timer = null
    return function (cb) {
      // 在规定时间内再次触发会先清除定时器后再重设定时器
      clearTimeout(timer)
      timer = setTimeout(function () {
        cb()
      }, delay)
    }
  }),
  debounceItemChange: (function (debounce) {
    return debounce(1000)
  })(function (delay) {
    // 利用闭包保存定时器
    let timer = null
    return function (cb) {
      // 在规定时间内再次触发会先清除定时器后再重设定时器
      clearTimeout(timer)
      timer = setTimeout(function () {
        cb()
      }, delay)
    }
  }),
  formatFn(format, obj, otheDataObj) {
    let regR = new RegExp('({[a-zA-Z0-9_]*})', 'ig')
    let rowsKey = format.match(regR).map((key, keyIndex) => {
      return key.replace(/{|}/gi, '')
    })
    console.log(rowsKey)
    rowsKey.map((key, indexkey) => {
      format = format.replace(new RegExp('{' + key + '}', 'ig'), obj[key] || (otheDataObj && otheDataObj[key]) || '')
    })
    return format
  },
  arrSortGloabal(data, property, type, order = 'asc') {
    // 通用 排序
    data.sort(function (a, b) {
      if (order === 'asc') {
        if (type === 'number') {
          return a[property] - b[property]
        }
        return (String(a[property])).localeCompare(String(b[property]))
      } else {
        if (type === 'number') {
          return b[property] - a[property]
        }
        return (String(b[property])).localeCompare(String(a[property]))
      }
    })
    return data
  }
}
