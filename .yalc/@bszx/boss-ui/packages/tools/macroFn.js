/* eslint-disable */
// 全局通用库   Author:Titans@2396757591@qq.com -->
(function (global, factory) {
  const BigNumber = require('./big.js').default
  typeof exports === 'object' && typeof module !== 'undefined' ?
    module.exports = factory(BigNumber) :
    typeof define === 'function' && define.amd ?
      define(factory(BigNumber)) :
      (this.$MacroFn = factory(BigNumber))
})(this, function (BigNumber) {
  const Utils = {
    getbasicDataType(obj) {
      // 获取数据类型
      return Object.prototype.toString.call(obj).slice(8, -1)
    },
    humpToHyphena(str) {
      // 小驼峰转成下划线
      return str.replace(/\B([A-Z])/g, '_$1').toLowerCase()
    },
    hyphenToCamel(str) { // 下划线转小驼峰
      return str.replace(/[A-Za-z]{1,}/ig, function ($0, $1, $2) {
        return $0.toLowerCase()
      }).replace(/([^_])(?:_+([^_]))/g, function ($0, $1, $2) {
        return $1 + $2.toUpperCase()
      })
    },
    isString(a) {
      // 是不是string
      return typeof a === 'string'
    },
    isNumber(b) {
      // 是不是number
      return !isNaN(Number(b))
    },
    isFunction(b) {
      // 是不是函数
      return typeof a === 'function'
    },
    isObjectEmpty(a) {
      if (a == null) { return !0 }
      if (a.length > 0) { return !1 }
      if (a.length === 0) { return !0 }
      for (let b in a) {
        if (hasOwnProperty.call(a, b)) { return !1 }
      }
      return isNaN(a)
    },
    isDate(a) {
      // 是不是日期
      return a instanceof Date
    },
    isArray(b) {
      // 是不是array
      return Array.isArray(b)
    },
    isEmpty(a) {
      // 是不是空
      return a === '' || a === null
    },
    isBlank(a) {
      // 是不是空字符
      return a === null || a.replace(/\s+/ig, '') === ''
    },
    isNull(a) {
      // 是不是null
      return a == null
    },
    deepCopy(obj) {
      // 深拷贝通用方法
      let me = this
      if (typeof obj !== 'object' || obj === null) return obj
      let newObj = obj instanceof Array ? [] : {}
      for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
          newObj[key] = typeof obj[key] === 'object' ? me.deepCopy(obj[key]) : obj[key]
        }
      }
      return newObj
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
    },
    accurateJianfa(arg1, arg2) { // 精确减法
      arg1 = isNaN(Number(arg1)) ? 0 : Number(arg1)
      arg2 = isNaN(Number(arg2)) ? 0 : Number(arg2)
      return new BigNumber(arg1).minus(new BigNumber(arg2)).toNumber()
    },
    accurateChengFa(arg1, arg2) { // 精确乘法
      arg1 = isNaN(Number(arg1)) ? 0 : Number(arg1)
      arg2 = isNaN(Number(arg2)) ? 0 : Number(arg2)
      return new BigNumber(arg1).mul(new BigNumber(arg2)).toNumber()
    },
    accurateChuFa(arg1 = 0, arg2 = 0, precision = 8) { // 精确除法
      arg1 = isNaN(Number(arg1)) ? 0 : Number(arg1)
      arg2 = isNaN(Number(arg2)) ? 0 : Number(arg2)
      if (!arg2) {
        return ''
      } else {
        return new BigNumber(arg1).div(new BigNumber(arg2)).toNumber()
      }
    },
    accurateRound(number, n) { // 保留小数位数(四舍五入)
      // return bigDecimal.round(number, n)
      n = n ? parseInt(n) : 0
      if (n >= 0) {
        return String(Number(number).toFixed(2))
      }
      return String(Math.round(number))
    },
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
    flatten(a, b, level = 1, c = [], levelNo = 1) {
      // flatten([1, [2, 3], 4, [5, [6, 7]]], undefined, 3) // [1, 2, 3, 4, 5, 6, 7]
      for (let d = 0, e = a.length; d < e; d++) {
        let f = a[d]
        if (Array.isArray(f) && level > levelNo) {
          this.flatten(f, b, level, c, levelNo + 1)
        } else if (level >= levelNo) {
          (b ? (b(f) && c.push(f)) : c.push(f))
        }
        // Array.isArray(f) ? this.flatten(f, b, c) : (b ? (b(f) && c.push(f)) : c.push(f))
        // ((b && b(f)) || c.push(f))
      }
      return c
    },
    setFlattenArgs(a, b = (p) => { return p }, c) {
      if (c || (c = [])) {
        for (let d = 0, e = a.length; d < e; d++) {
          let f = a[d]
          Array.isArray(f) ? this.flatten(f, b, c) : c.push(b(a[d]))
          // ((b && b(f)) || c.push(f))
        }
      }
      return c
    },
    leftPad(a, b, c) {
      let d = String(a)
      for (c || (c = ' '); d.length < b;) { d = c + d }
      return d.toString()
    },
    startWith(a, b) {
      let c = a.length
      return !(b === null || b === '' || c === 0 || b.length > c) && a.substr(0, b.length) === b
    },
    getFieldInfoByFormula(a) {
      let b = {}
      let c = a + ''
      // eslint-disable-next-line no-useless-escape
      let d = c.match(/(\$[0-9a-zA-Z\._]+)(#[0-9a-f]+)?(@[0-9a-f]+)?/)
      let e = ['', 'field', 'entryId', 'appId']
      this.each(d, function (a, c) {
        c !== 0 && a && (b[e[c]] = a.substr(1))
      })
      return b
    },
    getFieldInfoById(a) {
      let b = {}
      a = '#' + a
      let c = a.match(/(#[0-9a-f]+)(@[0-9a-f]+)?/)
      let d = ['', 'entryId', 'appId']
      this.each(c, function (c, a) {
        a !== 0 && c && (b[d[a]] = c.substr(1))
      })
      return b
    },
    num2Str(a, b) {
      if (this.isEmpty(a)) { return '' }
      let c = a + ''
      if (this.isEmpty(b)) { return c }
      let d = /\[Num0\]/
      if (d.test(b)) {
        return b.replace(d, c)
      }
      d = /\[Num1\]/
      if (d.test(b)) {
        return b.replace(d, this.num2CN(c, !1))
      }
      d = /\[Num2\]/
      if (d.test(b)) {
        return b.replace(d, this.num2CN(c, !0))
      }
      d = /[#0]+,?[#0]*\.?[#0]*%?/
      let e = b.match(d)
      if (e && e.length > 0) {
        let f = e[0]
        c = this.numberFormat(a, f)
        return b.replace(d, c)
      }
      return b
    },
    numberFormat(a, b) {
      let c = ''
      let d = a + ''
      if (/%$/.test(b)) {
        c = '%'
        a = 100 * a
        b = b.replace('%', '')
        let e = d.indexOf('.')
        if (e > -1) {
          let f = d.length - 3 - e
          f = f < 0 ? 0 : f > 8 ? 8 : f
          a = parseFloat(a.toFixed(f))
        }
        d = a + ''
      }
      let g = b.split('.')
      let h = g[0]
      let i = g[1]
      if (i !== '') {
        let j = i ? i.length : 0
        d = parseFloat(a).toFixed(j)
        let k = d.split('')
        for (let l = j; l > 0 && i.charAt(l - 1) === '#'; l--) {
          let m = k.pop()
          if (m !== '0') {
            k.push(m)
            break
          }
        }
        let n = k.pop()
        n === '.' && (n = '')
        d = k.join('') + n
      }
      let o = d.split('.')
      let p = o[0]
      if (/,/.test(h)) { o[0] = p.replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g, '$1,') } else {
        let q = h.match(/[0]+[0#]*$/)
        q && q.length > 0 && (o[0] = this.leftPad(p, q[0].length, '0'))
      }
      return o.join('.') + c
    },
    num2CN(a, b) {
      let c = b ? '零壹贰叁肆伍陆柒捌玖' : '〇一二三四五六七八九'
      let d = b ? '个拾佰仟万亿' : '个十百千万亿'
      let e = Math.floor(Math.abs(a))
      let f = Math.abs(a).toString()
      let g = f.replace(/\..*$/, '')
      let h = f.split('.')
      let i = c
      let j = d
      let k = '-.'
      let l = i[0]
      let m = new RegExp(i[0] + '*$')
      let n = new RegExp(i[0] + '+', 'g')
      let p = ''
      let o = a < 0 ? k[0] : ''
      if (h.length >= 2) {
        let q = h[1]
        if (q) {
          p = k[1]
          for (let r = 0; r < q.length; r++) { p += i[+q[r]] }
        }
      }
      if (g.length === 1) { return o + i[e] + p }
      if (g.length <= 5) {
        let s = ''
        let t = 0
        for (e = g.length; e--;) {
          let u = +g[t]
          s += this.num2CN(g[t], b) + (u && e ? j[e] : '')
          t++
        }
        s = s.replace(n, l)
        s = s.replace(m, '')
        return o + s + p
      }
      let v = g.length / 4 >> 0
      let w = g.length % 4
      let s = ''
      while (w === 0 || !j[3 + v]) {
        w += 4
        v--
      }
      if (+g.substr(0, w)) {
        s = this.num2CN(g.substr(0, w), b) + j[3 + v]
        let x = g.substr(w)
        x[0] === '0' && (s += i[0])
        s += this.num2CN(x, b)
      } else {
        s = this.num2CN(g.substr(0, w), b) + this.num2CN(g.substr(w), b)
      }
      s = s.replace(n, l)
      s = s.replace(m, '')
      return o + s + p
    },
    date2Str(a, b) {
      if (!a) { return '' }
      let c = b.length
      let d = ''
      let e = b.charAt(0)
      let f = 0
      let g = e
      if (c > 0) {
        for (let h = 1; h < c; h++) {
          let i = b.charAt(h)
          if (e !== i) {
            d += this._compileDateFormat({
              char: e,
              str: g,
              len: h - f
            }, a)
            e = i
            f = h
            g = e
          } else {
            g += i
          }
        }
        d += this._compileDateFormat({
          char: e,
          str: g,
          len: c - f
        }, a)
      }
      return d
    },
    _compileDateFormat(a, b) {
      let c = a.str
      let d = a.len
      let e = a.char
      switch (e) {
        case 'E':
          c = d > 2 ? Date._DN[b.getDay()] : d > 1 ? Date._SDN[b.getDay()] : b.getDay() + ''
          break
        case 'y':
          c = d <= 3 ? (b.getFullYear() + '').slice(2, 4) : b.getFullYear()
          break
        case 'M':
          c = d > 2 ? Date._MN[b.getMonth()] : d < 2 ? b.getMonth() + 1 : this.leftPad(b.getMonth() + 1 + '', 2, '0')
          break
        case 'd':
          c = d > 1 ? this.leftPad(b.getDate() + '', 2, '0') : b.getDate()
          break
        case 'h':
          let f = b.getHours() % 12
          f === 0 && (f = 12)
          c = d > 1 ? this.leftPad(f + '', 2, '0') : f
          break
        case 'H':
          c = d > 1 ? this.leftPad(b.getHours() + '', 2, '0') : b.getHours()
          break
        case 'm':
          c = d > 1 ? this.leftPad(b.getMinutes() + '', 2, '0') : b.getMinutes()
          break
        case 's':
          c = d > 1 ? this.leftPad(b.getSeconds() + '', 2, '0') : b.getSeconds()
          break
        case 'a':
          c = b.getHours() < 12 ? 'am' : 'pm'
          break
        default:
          c = a.str
      }
      return c
    },
    replaceToString(expression) { // 把传入的标记字符串替换为字符串
      return (expression).replace(/@\(([\u4e00-\u9fa5A_Za-z0-9#&\-\+=]{1,})\)/ig, ($1, $2, $3) => {
        return '\'' + $2 + '\''
      })
    },
    toNumber(str, digits, locale) {
      let num = (String(str).match(/[0-9.]{1}/ig) || []).join('')
      return locale ? Number(num).toLocaleString('zh-Hans-CN', {
        style: 'decimal',
        minimumIntegerDigit: 1,
        minimumFractionDigits: 1,
        maximumFractionDigits: 20,
        minimumSignificantDigits: 1,
        maximumSignificantDigits: 21
      }) : num.split('.').splice(0, 2).map((item, index) => {
        return index === 1 ? item.padEnd(digits, 0) : (item ? item : 0)
      }).filter((item, index) => {
        return index === 0 ? true : (digits > 0 || Number(item) !== 0)
      }).join('.')
    }
  }
  const MacroFnUsage = [
    {
      name: '逻辑函数',
      children: [{
        name: 'AND',
        intro: '如果所有参数都为真，AND函数返回布尔值true，否则返回布尔值 false',
        usage: 'AND(逻辑表达式1,逻辑表达式2,...)',
        example: 'AND({语文成绩}>90,{数学成绩}>90,{英语成绩}>90)，如果三门课成绩都> 90，返回true，否则返回false'
      },
      {
        name: 'OR',
        intro: '如果任意参数为真，OR 函数返回布尔值true；如果所有参数为假，返回布尔值false。',
        usage: 'OR(逻辑表达式1,逻辑表达式2,...)',
        example: 'OR({语文成绩}>90,{数学成绩}>90,{英语成绩}>90)，任何一门课成绩> 90，返回true，否则返回false'
      },
      {
        name: 'BOOL',
        intro: 'BOOL函数返回布尔值,其中0,"",undefined,null,NaN 返回false',
        usage: 'BOOL(表达式)',
        example: 'BOOL(0) 返回 false, '
      },
      {
        name: 'FALSE',
        intro: 'FALSE函数返回布尔值false',
        usage: 'FALSE()',
        example: '略'
      },
      {
        name: 'TRUE',
        intro: 'TRUE函数返回布尔值true',
        usage: 'TRUE()',
        example: '略'
      },
      {
        name: 'NOT',
        intro: 'NOT函数返回与指定表达式相反的布尔值。',
        usage: 'NOT(逻辑表达式)',
        example: 'NOT({语文成绩}>60)，如果语文成绩大于60返回false，否则返回true'
      },
      {
        name: 'IF',
        intro: 'IF函数判断一个条件能否满足；如果满足返回一个值，如果不满足则返回另外一个值',
        usage: 'IF(逻辑表达式,为true时返回的值,为false时返回的值)',
        example: 'IF({语文成绩}>60,"及格","不及格")，当语文成绩>60时返回及格，否则返回不及格。'
      },
      {
        name: 'IFS',
        intro: 'IFS形如if elseif else,需要结合IF(使用)',
        usage: 'IFS(IF(),IF(),IF(),IF())',
        example: 'IFS(IF(ISEMPTY(1),1),IF(GT(20,10),2)), 返回2'
      },
      {
        name: 'XOR',
        intro: 'XOR函数可以返回所有参数的异或值',
        usage: 'XOR(逻辑表达式1, 逻辑表达式2,...)',
        example: 'XOR({语文成绩}>90,{数学成绩}>90)，如果两门成绩都>90,返回false；如果两门成绩都<90，返回false；如果其中一门>90，另外一门<90，返回true'
      },
      {
        name: 'COUNTIF',
        intro: 'COUNTIF函数可以获取数组中满足条件的参数个数',
        usage: 'COUNTIF(数组,"条件")',
        example: 'COUNTIF(子表单.性别, "女")，可得到子表单中性别填的是"女"的数据条数；COUNTIF([1,2,3,4],">2")，可得到1,2,3,4中大于2的数字数量，结果为2。'
      },
      ]
    },
    {
      name: '数学函数',
      children: [
        {
          name: 'PLUS',
          intro: 'PLUS函数可以获取传入参数的和',
          usage: 'PLUS(数字,数字,数字)',
          example: '数字(-8,8,1)可以返回1，也就是-8+8+1=1'
        },
        {
          name: 'MINUS',
          intro: 'MINUS函数可以获取传入参数的差',
          usage: 'MINUS(数字,数字,数字)',
          example: '数字(9,8,1)可以返回0，也就是9-8-1=0'
        },
        {
          name: 'MUL',
          intro: 'MUL函数可以获取传入参数的精确乘积',
          usage: 'MUL(数字,数字,数字)',
          example: '数字(8,8,0)可以返回640，也就是8*8*10=640'
        },
        {
          name: 'DIV',
          intro: 'DIV函数可以获取传入参数的余数',
          usage: 'DIV(数字,数字,数字)',
          example: '数字(640,8,10)可以返回8，也就是640/8/10=8'
        },
        {
          name: 'MOD',
          intro: 'MOD函数可以获取两数相除的余数',
          usage: 'MOD(被除数,除数)',
          example: 'MOD(4,3)返回1，也就是4/3的余数'
        },
        {
          name: 'MAX',
          intro: 'MAX函数可以获取一组数值的最大值',
          usage: 'MAX(数字1,数字2,...)',
          example: 'MAX({语文成绩},{数学成绩},{英语成绩})返回三门课程中的最高分'
        },
        {
          name: 'MIN',
          intro: 'MIN函数可以获取一组数值的最小值',
          usage: 'MIN(数字1,数字2,...)',
          example: 'MAX({语文成绩},{数学成绩},{英语成绩})返回三门课程中的最低分'
        },
        {
          name: 'ABS',
          intro: 'ABS函数可以获取一个数的绝对值',
          usage: 'ABS(数字)',
          example: 'ABS(-8)可以返回8，也就是-8的绝对值'
        },
        {
          name: 'FIXED',
          intro: 'FIXED函数可将数字截取到指定的小数位数并输出为文本',
          usage: 'FIXED(数字,小数位数)',
          example: 'FIXED(3.1415,2)返回"3.14"'
        },
        {
          name: 'ROUND',
          intro: 'ROUND函数可以将数字四舍五入到指定的位数',
          usage: 'ROUND(数字,数字位数)',
          example: 'ROUND(3.1485,2)返回3.15'
        },
        {
          name: 'AVERAGE',
          intro: 'AVERAGE函数可以获取一组数值的算术平均值',
          usage: 'AVERAGE(数字1,数字2,...)',
          example: 'AVERAGE({语文成绩},{数学成绩}, {英语成绩})返回三门课程的平均分'
        },
        {
          name: 'FLOOR',
          intro: '向下取整',
          usage: 'FLOOR(数字)',
          example: 'FLOOR(6.22)返回6'
        },
        {
          name: 'CEIL',
          intro: 'CEIL向上取整',
          usage: 'CEIL(数字)',
          example: 'CEIL(7.222)返回8'
        },
        {
          name: 'SQRT',
          intro: 'SQRT函数可以获取一个数字的正平方根',
          usage: 'SQRT(数字)',
          example: 'SQRT(9)返回3，也就是9的正平方根'
        },
        {
          name: 'POW',
          intro: 'POW函数可以获取数字乘幂的结果',
          usage: 'POW(数字,指数)',
          example: 'POW(3，2)返回9，也就是3的2次方'
        },
        {
          name: 'LOG',
          intro: 'LOG函数可以根据指定底数返回数字的对数',
          usage: 'LOG(数字,底数)',
          example: 'LOG(100,10)返回2，也就是以10为底数100的对数'
        },
        {
          name: 'SUMPRODUCT',
          intro: 'SUMPRODUCT函数可以将数组间对应的元素相乘，并返回乘积之和，适用于加权求和',
          usage: 'SUMPRODUCT(数组,数组...)',
          example: 'SUMPRODUCT([1,2,3],[0.1,0.2,0.3])返回1.4，也就是 1×0.1 + 2×0.2 + 3×0.3的值'
        },
        {
          name: 'GCD',
          intro: 'GCD函数可以获取传入的最大公约数',
          usage: 'GCD(值,值,...)',
          example: 'GCD(1,2,3)返回6'
        },
        {
          name: 'LCM',
          intro: 'LCM函数可以获取传入的最小公倍数',
          usage: 'LCM(值,值,...)',
          example: 'LCM(6,2,8)返回2'
        },

        {
          name: 'LARGE',
          intro: 'LARGE函数可以获取数据集中第k个最大值',
          usage: 'LARGE(数组,k)',
          example: 'LARGE({学生成绩.数学成绩},1)返回子表单"学生成绩"中排名第1的"数学成绩"'
        },
        {
          name: 'VALUE',
          intro: 'VALUE函数可以将文本转化为数字',
          usage: 'VALUE(文本)',
          example: 'VALUE("3.1415")返回3.1415'
        }
      ]
    },
    {
      name: '条件函数',
      children: [
        {
          name: 'ISEMPTY',
          intro: 'ISEMPTY函数可以用来判断值是否为空文本、空对象或者空数组',
          usage: 'ISEMPTY(文本)',
          example: '略'
        },
        {
          name: 'EQ',
          intro: 'EQ函数可以用来判断值是否相等',
          usage: 'EQ(a,b)',
          example: '略'
        },
        {
          name: 'AEQ',
          intro: 'AEQ函数可以用来判断值是否绝对等于',
          usage: 'AEQ(a,b)',
          example: '略'
        },
        {
          name: 'NE',
          intro: 'NE函数可以用来判断值是否不相等',
          usage: 'NE(a,b)',
          example: '略'
        },
        {
          name: 'ANE',
          intro: 'ANE函数可以用来判断值是否绝对不等于',
          usage: 'ANE(a,b)',
          example: '略'
        },
        {
          name: 'GT',
          intro: 'GT函数可以用来判断前者是否大于后者',
          usage: 'GT(a,b)',
          example: 'GT(2,1), 2>1 返回true'
        },
        {
          name: 'GE',
          intro: 'GE函数可以用来判断前者是否大于等于后者',
          usage: 'GE(a,b)',
          example: 'GE(2,2), 2>=2 返回true'
        },
        {
          name: 'LT',
          intro: 'LT函数可以用来判断前者是否小于后者',
          usage: 'LT(a,b)',
          example: 'LT(2,1), 2<1 返回false'
        },
        {
          name: 'LE',
          intro: 'LE函数可以用来判断前者是否大于等于后者',
          usage: 'LE(2,1)',
          example: 'LE(2,1), 2<=1 返回false'
        }
      ]
    },
    {
      name: '文本函数',
      children: [{
        name: 'CONCATENATE',
        intro: 'CONCATENATE函数可以将多个文本合并成一个文本',
        usage: 'CONCATENATE(文本1,文本2,...)',
        example: 'CONCATENATE("三年二班","周杰伦")会返回"三年二班周杰伦"'
      },
      {
        name: 'EXACT',
        intro: 'EXACT函数可以比较两个文本是否完全相同，完全相同则返回true，否则返回false',
        usage: 'EXACT(文本1, 文本2)',
        example: 'EXACT({手机号},{中奖手机号})，如果两者相同，返回true，如果不相同，返回false'
      },
      {
        name: 'LEFT',
        intro: 'LEFT函数可以从一个文本的第一个字符开始返回指定个数的字符',
        usage: 'LEFT(文本,文本长度)',
        example: 'LEFT("三年二班周杰伦",2)返回"三年"，也就是"三年二班周杰伦"的从左往右的前2个字符'
      },
      {
        name: 'LEN',
        intro: 'LEN函数可以获取文本中的字符个数',
        usage: 'LEN(文本)',
        example: 'LEN("朝辞白帝彩云间")返回7，因为这句诗中有7个字符'
      },
      {
        name: 'LOWER',
        intro: 'LOWER函数可以将一个文本中的所有大写字母转换为小写字母',
        usage: 'LOWER(文本)',
        example: 'LOWER("JAYZ")返回"jayz"'
      },
      {
        name: 'MID',
        intro: 'MID返回文本中从指定位置开始的指定数目的字符',
        usage: 'MID(文本,开始位置_数字,指定数目)',
        example: 'MID("简道云应用定制工具",4,6)返回"应用定制工具"'
      },
      {
        name: 'REPLACE',
        intro: 'REPLACE函数可以根据指定的字符数，将部分文本替换为不同的文本',
        usage: 'REPLACE(文本,开始位置,替换长度,新文本)',
        example: 'REPLACE("简道云应用定制工具",4,6,"企业数据管理平台")返回"简道云企业数据管理平台"'
      },
      {
        name: 'REPT',
        intro: 'REPT函数可以将文本重复一定次数',
        usage: 'REPT(文本,重复次数)',
        example: 'REPT("简道云",3)返回"简道云简道云简道云"'
      },
      {
        name: 'RIGHT',
        intro: 'RIGHT函数可以获取由给定文本右端指定数量的字符构成的文本值',
        usage: 'RIGHT(文本,文本长度)',
        example: 'RIGHT("三年二班周杰伦",3)返回"周杰伦"，也就是"三年二班周杰伦"从右往左的前3个字符'
      },
      {
        name: 'SEARCH',
        intro: 'SEARCH函数可以获取文本1在文本2中的开始位置',
        usage: 'SEARCH(文本1,文本2)',
        example: 'SEARCH("2016","简道云2016")返回4'
      },
      {
        name: 'SPLIT',
        intro: 'SPLIT函数可以将文本按指定分割符分割成数组',
        usage: 'SPLIT(文本,分隔符_文本)',
        example: 'SPLIT("简道云-应用定制工具","-")返回"简道云，应用定制工具"'
      },
      {
        name: 'TEXT',
        intro: 'TEXT函数可以将数字转化成文本',
        usage: 'TEXT(数字)',
        example: 'TEXT(3.1415)返回"3.1415"'
      },
      {
        name: 'TRIM',
        intro: 'TRIM函数可以删除文本首尾的空格',
        usage: 'TRIM(文本)',
        example: 'TRIM("   简道云   ")返回"简道云"'
      },
      {
        name: 'UPPER',
        intro: 'UPPER函数可以将一个文本中的所有小写字母转换为大写字母',
        usage: 'UPPER(文本)',
        example: 'UPPER("jayz")返回"JAYZ"'
      },
      {
        name: 'HTP',
        intro: 'HTP函数可以小驼峰转成下划线',
        usage: 'HTP()',
        example: 'HTP(@(lastNickName))返回last_nick_name'
      },
      {
        name: 'PTH',
        intro: 'PTH函数可以下划线转小驼峰',
        usage: 'PTH()',
        example: 'PTH(@(lastNickName))返回last_nick_name'
      },
      ]
    },
    {
      name: '日期函数',
      children: [{
        name: 'DATE',
        intro: 'DATE函数可以将时间戳转换为日期对象',
        usage: 'DATE(时间戳)',
        example: '略'
      }, {
        name: 'DATEDELTA',
        intro: 'DATEDELTA函数可以将指定日期加/减指定天数',
        usage: 'DATEDELTA(指定日期,需要加减的天数)',
        example: '略'
      }, {
        name: 'DAY',
        intro: 'DAY函数可以获取某日期是当月的第几日',
        usage: 'DAY(时间戳)',
        example: '略'
      }, {
        name: 'DAYS',
        intro: 'DAYS函数可以返回两个日期之间相差的天数。',
        usage: 'DAYS(结束日期,开始日期)',
        example: '略'
      }, {
        name: 'DAYS360',
        intro: 'DAYS360按照一年 360 天的算法，返回两个日期间相差的天数',
        usage: 'DAYS360(结束日期,开始日期)',
        example: '略'
      }, {
        name: 'HOUR',
        intro: 'HOUR函数可以返回某日期的小时数',
        usage: 'HOUR(时间戳)',
        example: '略'
      }, {
        name: 'ISOWEEKNUM',
        intro: 'ISOWEEKNUM函数可以返回指定日期在全年中的ISO周数',
        usage: 'ISOWEEKNUM(指定日期)',
        example: '略'
      }, {
        name: 'MINUTE',
        intro: 'MINUTE函数可以返回某日期的分钟数',
        usage: 'MINUTE(日期)',
        example: '略'
      }, {
        name: 'MONTH',
        intro: 'MONTH返回某日期的月份',
        usage: 'MONTH(日期)',
        example: '略'
      }, {
        name: 'NOW',
        intro: 'NOW函数可以获取当前时间',
        usage: 'NOW()',
        example: '略'
      }, {
        name: 'SECOND',
        intro: 'SECOND函数可以返回某日期的秒数',
        usage: 'SECOND(日期)',
        example: '略'
      }, {
        name: 'SYSTIME',
        intro: 'SYSTIME函数可以获取当前服务器时间',
        usage: 'SYSTIME()',
        example: '略'
      }, {
        name: 'TIME',
        intro: 'TIME函数可以返回特定时间的十进制数字',
        usage: 'TIME(时_数字,分_数字,秒_数字)',
        example: '略'
      }, {
        name: 'TIMESTAMP',
        intro: 'TIMESTAMP函数可以将日期对象转换成时间戳。',
        usage: 'TIMESTAMP(日期)',
        example: '略'
      }, {
        name: 'TODAY',
        intro: 'TODAY函数可以返回今天',
        usage: 'TODAY()',
        example: '略'
      }, {
        name: 'WEEKNUM',
        intro: 'WEEKNUM函数可以返回指定日期在当年是第几周',
        usage: 'WEEKNUM(指定日期)',
        example: '略'
      }, {
        name: 'YEAR',
        intro: 'YEAR函数可以返回某日期的年份',
        usage: 'YEAR(时间戳)',
        example: '略'
      }]
    },
    {
      name: '其它函数',
      children: [
        {
          name: 'UUID',
          intro: 'UUID函数随机码生成器。可适用于随机流水号的使用场景等',
          usage: 'UUID()',
          example: '略'
        },
        {
          name: 'COUNT',
          intro: 'COUNT函数可以获取参数的数量',
          usage: 'COUNT(值,值,...)',
          example: 'COUNT(小明,小王,小张,小李)返回4，也就是人员的数量'
        },
        {
          name: 'STRTOOBJ',
          intro: 'STRTOOBJ函数可以获取将字符串参数转化为对象',
          usage: 'STRTOOBJ()',
          example: 'STRTOOBJ("a=1&b=2")返回{a:1,b:2}'
        },
        {
          name: 'STRTOARRAY',
          intro: 'STRTOARRAY将逗号隔开的字符串转化为数组',
          usage: 'STRTOARRAY("...,...,...")',
          example: 'STRTOARRAY("1,2,3")返回[1,2,3]'
        },
        {
          name: 'STRTOARRAYOBJ',
          intro: 'STRTOARRAYOBJ函数可以将加号隔开的字符串参数转化为数组<对象>',
          usage: 'STRTOARRAYOBJ("...=...&...=...+...=...&...=...")',
          example: 'TOARRAYOBJ("a=b&c=w&e=1+a=2&b=3&c=4")返回[{ "a": "b", "c": "w", "e": "1" }, { "a": "2", "b": "3", "c": "4" }]'
        },
        {
          name: 'RETURN',
          intro: 'RETURN函数可以原模原样返回传入',
          usage: 'RETURN(*)',
          example: 'RETURN("*")返回"*"'
        },
        {
          name: 'GETEMPTY',
          intro: 'GETEMPTY函数可以返回传入类型的空值',
          usage: 'RETURN()',
          example: 'RETURN()返回"",RETURN("object")返回{}'
        },
        {
          name: 'OPTIONS',
          intro: 'OPTIONS函数可以将字符串转换为下拉选择项数组',
          usage: 'OPTIONS(*)',
          example: 'OPTIONS("1#是+2#否")返回[{"value":"1","label":"是"},{"value":"2","label":"否"}]'
        },
        {
          name: 'RUN',
          intro: 'RUN函数用来执行组合的表达式',
          usage: 'RUN()',
          // $MacroFn.PLUS(0.1, 0.2)  //0.3
          // $MacroFn.RUN('IFS(IF(AND(GT(20,18),LE(20,60)),STRTOOBJ(@(color=#F00&fontSize=12px))),IF(LE(20,60),STRTOOBJ(@(color=#ff0&fontSize=20px))))')  // { color: '#F00', fontSize: '12px' }
          // $MacroFn.RUN('ROUND(MAX(@(123222),IF(GT(PLUS(0.1,0.2,2,5),10),MUL(123,2),ISEMPTY(1)?DIV(123,321):1111222.225)),2)') // 1111222.23
          example: 'RUN("IFS(IF(AND(GT(20,18),LE(20,60)),STRTOOBJ(@(color=#F00&fontSize=12px))),IF(LE(20,60),STRTOOBJ(@(color=#ff0&fontSize=20px))))")返回{color: "#F00", fontSize: "12px"}'
        },

      ]
    }
  ]
  // 逻辑函数10
  const LogicFn = {
    AND() {
      // intro: '如果所有参数都为真，AND函数返回布尔值true，否则返回布尔值 false'
      // usage: 'AND(逻辑表达式1,逻辑表达式2,...)'
      for (let a = Utils.flatten(arguments), b = 0, c = a.length; b < c; b++) {
        if (!a[b]) { return !1 }
      }
      return !0
    },
    OR() {
      // intro: '如果任意参数为真，OR 函数返回布尔值true；如果所有参数为假，返回布尔值false。'
      // usage: 'OR(逻辑表达式1,逻辑表达式2,...)'
      for (let a = Utils.flatten(arguments), b = 0, c = a.length; b < c; b++) {
        if (a[b]) { return !0 }
      }
      return !1
    },
    BOOL(data) { // 转化为布尔值 
      return Boolean(String(data).replace(/undefined|null｜NaN|0/ig, ''))
    },
    FALSE() {
      // intro: 'FALSE函数返回布尔值false'
      //   usage: 'FALSE()'
      return !1
    },
    TRUE() {
      // intro: 'TRUE函数返回布尔值true'
      // usage: 'TRUE()'
      return !0
    },
    NOT(a) {
      // intro: 'NOT函数返回与指定表达式相反的布尔值。'
      // usage: 'NOT(逻辑表达式)'
      return !a
    },
    XOR() {
      // intro: 'XOR函数可以返回所有参数的异或值'
      //   usage: 'XOR(逻辑表达式1, 逻辑表达式2,...)'
      let a = 0
      let b = Utils.flatten(arguments)
      for (let c = 0, d = b.length; c < d; c++) {
        b[c] && a++
      }
      return !!(1 & Math.floor(Math.abs(a)))
    },
    IF(a, b, c) {
      // intro: 'IF函数判断一个条件能否满足；如果满足返回一个值，如果不满足则返回另外一个值'
      // usage: 'IF(逻辑表达式,为true时返回的值,为false时返回的值)'
      return a ? b : c
    },
    IFS() {
      return Utils.flatten(arguments).filter((item) => {
        return item !== undefined
      })[0]
    },
    COUNTIF() {
      // intro: 'COUNTIF函数可以获取数组中满足条件的参数个数'
      // usage: 'COUNTIF(数组,"条件")'
      let arr = arguments[0]; let condition = arguments[1]
      let len = 0
      if (condition.indexOf('>') === -1 && condition.indexOf('=') === -1 && condition.indexOf('<') === -1) {
        for (let i = 0; i < arr.length; i++) {
          let a = arr[i]
          if (a === condition) {
            len++
          }
        }
        return len
      } else {
        for (let i = 0; i < arr.length; i++) {
          let a = arr[i]
          if (typeof a === 'number' && !!new Function('return ' + a + condition)()) {
            len++
          }
        }
        return len
      }
    },
  }
  // 数学函数 22
  const MathFn = {
    PLUS() { // 加法
      return Utils.reduceCalc(Utils.flatten(arguments), Utils.accurateJiafa)
    },
    MINUS() { // 减法
      return Utils.reduceCalc(Utils.flatten(arguments), Utils.accurateJianfa)
    },
    MUL() { // 乘法
      return Utils.reduceCalc(Utils.flatten(arguments), Utils.accurateChengFa)
    },
    DIV() { // 除法
      return Utils.reduceCalc(Utils.flatten(arguments), Utils.accurateChuFa)
    },
    MOD(a, b) {
      // name: 'MOD'
      // intro: 'MOD函数可以获取两数相除的余数'
      //   usage: 'MOD(被除数,除数)'
      if (b === 0) { return 0 }
      let c = Math.abs(a % b)
      return b > 0 ? c : -c
    },
    MAX() {
      // intro: 'MAX函数可以获取一组数值的最大值'
      // usage: 'MAX(数字1,数字2,...)'
      let a = Utils.flatten(arguments, function (a) {
        return Utils.isNumber(a)
      })
      return a.length === 0 ? 0 : Math.max.apply(Math, a)
    },
    MIN() {
      // intro: 'MIN函数可以获取一组数值的最小值'
      // usage: 'MIN(数字1,数字2,...)'
      let a = Utils.flatten(arguments, function (a) {
        return Utils.isNumber(a)
      })
      return a.length === 0 ? 0 : Math.min.apply(Math, a)
    },
    ABS(a) {
      // intro: 'ABS函数可以获取一个数的绝对值'
      // usage: 'ABS(数字)'
      return Utils.isNumber(a) ? Math.abs(a) : 0
    },
    ROUND(a, b) {
      return Utils.accurateRound(a, b)
      // intro: 'ROUND函数可以将数字四舍五入到指定的位数'
      // usage: 'ROUND(数字,数字位数)'
      // return Math.round(a * Math.pow(10, b)) / Math.pow(10, b)
    },
    FIXED(a, b) {
      return Utils.accurateFixed(a, b)
      // intro: 'FIXED函数可将数字舍入到指定的小数位数并输出为文本'
      // usage: 'FIXED(数字,小数位数)'
      // b = void 0 === b ? 0 : b
      // return Utils.isNumber(b) && b >= 0 ? Number(a).toFixed(b) : ''
    },
    AVERAGE() {
      // intro: 'AVERAGE函数可以获取一组数值的算术平均值'
      //   usage: 'AVERAGE(数字1,数字2,...)'
      let numArray = Utils.flatten(arguments, function (a) {
        return Utils.isNumber(a)
      })
      return Utils.reduceCalc(numArray, Utils.accurateJiafa) / numArray.length
    },
    FLOOR(a) { // 向下取整
      return isNaN(Math.floor(a)) ? '' : Math.floor(a)
    },
    CEIL(a) { // 向上取整
      return isNaN(Math.ceil(a)) ? '' : Math.ceil(a)
    },
    SQRT(a) {
      // intro: 'SQRT函数可以获取一个数字的正平方根'
      // usage: 'SQRT(数字)'
      return a < 0 ? 0 : Math.sqrt(a)
    },
    POW(a, b) {
      // intro: 'POWER函数可以获取数字乘幂的结果'
      // usage: 'POWER(数字,指数)'
      let c = Utils.reduceCalc(new Array(isNaN(parseInt(b)) ? 1 : parseInt(b)).fill(a), Utils.accurateChengFa)
      return isNaN(c) ? 0 : c
    },
    LOG(a, b) {
      // intro: 'LOG函数可以根据指定底数返回数字的对数'
      // usage: 'LOG(数字,底数)'
      //   example: 'LOG(100,10)返回2，也就是以10为底数100的对数'
      b = void 0 === b ? 10 : b
      return Utils.isNumber(b) ? Math.log(a) / Math.log(b) : 0
    },
    SUMPRODUCT() {
      // intro: 'SUMPRODUCT函数可以将数组间对应的元素相乘，并返回乘积之和，适用于加权求和'
      // usage: 'SUMPRODUCT(数组,数组...)'
      //   example: 'SUMPRODUCT([1,2,3],[0.1,0.2,0.3])返回1.4，也就是 1×0.1 + 2×0.2 + 3×0.3的值'
      let a = 0
      let b = []
      let c = -1
      for (let d = 0; d < arguments.length; d++) {
        if (arguments[d] instanceof Array) {
          c = c < 0 ? arguments[d].length : Math.min(arguments[d].length, c)
          b.push(arguments[d])
        }
      }
      for (let e, f, g, h = 0; h < c; h++) {
        for (e = 1, f = 0; f < b.length; f++) {
          g = parseFloat(b[f][h])
          isNaN(g) && (g = 0)
          e *= g
        }
        a += e
      }
      return a
    },
    GCD(a, b) { // 最大公约数
      return b ? this.GCD(b, a % b) : a
    },
    LCM(a, b) { // 最小公倍数
      return a * b / this.GCD(a, b)
    },
    LARGE(a, b) {
      // intro: 'LARGE函数可以获取数据集中第k个最大值'
      // usage: 'LARGE(数组,k)'
      a = Utils.flatten(a, function (a) {
        return Utils.isNumber(a)
      })
      return a.sort(function (a, b) {
        return b - a
      })[b - 1]
    },
    VALUE(a) {
      // intro: 'VALUE函数可以将文本转化为数字'
      // usage: 'VALUE(文本)'
      return Utils.toNumber(a)
    },
    NUMBER(a) {
      return Utils.isEmpty(a) ? 0 : isNaN(Number(a)) ? 0 : Number(a)
    }
  }
  // 条件 9
  const ConditionsFn = {
    ISEMPTY(a) {
      // intro: 'ISEMPTY函数可以用来判断值是否为空文本、空对象或者空数组'
      // usage: 'ISEMPTY(文本)'
      return Utils.isObjectEmpty(a)
    },
    EQ(a, b) { // EQUAL等于
      return a == b
    },
    AEQ(a, b) { // 绝对等于
      return a === b
    },
    NE(a, b) { //  NOT EQUAL不等于
      return a != b
    },
    ANE(a, b) { // 绝对不等于
      return a !== b
    },
    GT(a, b) { // GREATER THAN大于　
      return a > b
    },
    GE(a, b) { // GREATER THAN OR EQUAL 大于等于
      return a >= b
    },
    LT(a, b) { // LESS THAN小于
      return a < b
    },
    LE(a, b) { // LESS THAN OR EQUAL 小于等于
      return a <= b
    }
  }
  // 文本处理函数 17
  const TextFn = {
    CONCATENATE() {
      // intro: 'CONCATENATE函数可以将多个文本合并成一个文本'
      // usage: 'CONCATENATE(文本1,文本2,...)'
      let a = Utils.flatten(arguments)
      for (let b = 0; (b = a.indexOf(!0)) > -1;) {
        a[b] = 'TRUE'
      }
      for (let c = 0; (c = a.indexOf(!1)) > -1;) {
        a[c] = 'FALSE'
      }
      return a.join('')
    },
    EXACT(a, b) {
      // intro: 'EXACT函数可以比较两个文本是否完全相同，完全相同则返回true，否则返回false'
      // usage: 'EXACT(文本1, 文本2)'
      return a === b
    },
    LEFT(a, b) {
      // intro: 'LEFT函数可以从一个文本的第一个字符开始返回指定个数的字符'
      // usage: 'LEFT(文本,文本长度)'
      b = macroFn.isEmpty(b) ? 1 : b
      return a ? a.substring(0, b) : ''
    },
    LEN(a) {
      // intro: 'LEN函数可以获取文本中的字符个数'
      //   usage: 'LEN(文本)'
      return Utils.isString(a) ? a ? a.length : 0 : a && a.length ? a.length : 0
    },
    LOWER(a) {
      // intro: 'LOWER函数可以将一个文本中的所有大写字母转换为小写字母'
      // usage: 'LOWER(文本)'
      return Utils.isString(a) ? a ? a.toLowerCase() : a : ''
    },
    MID(a, b, c) {
      // intro: 'MID返回文本中从指定位置开始的指定数目的字符'
      // usage: 'MID(文本,开始位置_数字,指定数目)'
      a = a || ''
      return Utils.isNumber(b) && Utils.isNumber(c) ? a.substr(b - 1, c) : a
    },
    REPLACE(a, b, c, d) {
      // intro: 'REPLACE函数可以根据指定的字符数，将部分文本替换为不同的文本'
      // usage: 'REPLACE(文本,开始位置,替换长度,新文本)'
      a = a || ''
      d = d || ''
      if (Utils.isNumber(b) && Utils.isNumber(c)) {
        return a.substr(0, b - 1) + d + a.substr(b - 1 + c)
      }
      return a
    },
    REPT(a, b) {
      // intro: 'REPT函数可以将文本重复一定次数'
      // usage: 'REPT(文本,重复次数)'
      b = b || 0
      return new Array(b + 1).join(a)
    },
    RIGHT(a, b) {
      // name: 'RIGHT'
      // intro: 'RIGHT函数可以获取由给定文本右端指定数量的字符构成的文本值'
      b = void 0 === b ? 1 : b
      return a ? a.substring(a.length - b) : ''
    },
    SEARCH(a, b, c) {
      // intro: 'SEARCH函数可以获取文本1在文本2中的开始位置'
      // usage: 'SEARCH(文本1,文本2)'
      if (Utils.isString(a) && Utils.isString(b)) {
        c = Utils.isNull(c) ? 0 : c
        return b.toLowerCase().indexOf(a.toLowerCase(), c - 1) + 1
      } else {
        return 0
      }
    },
    SPLIT(a, b) {
      // intro: 'SPLIT函数可以将文本按指定分割符分割成数组'
      //   usage: 'SPLIT(文本,分隔符_文本)'
      return Utils.isString(a) ? a.split(b) : []
    },
    TEXT(a, b) {
      // intro: 'TEXT函数可以将数字转化成文本'
      // usage: 'TEXT(数字)'
      return Utils.isNull(a) ? '' : Utils.isDate(a) && !Utils.isEmpty(b) ? Utils.date2Str(a, b) : Utils.num2Str(a, b)
    },
    TRIM(a) {
      // intro: 'TRIM函数可以删除文本首尾的空格'
      //   usage: 'TRIM(文本)'
      return Utils.isString(a) ? a.replace(/ +/g, ' ').trim() : ''
    },
    UPPER(a) {
      // intro: 'UPPER函数可以将一个文本中的所有小写字母转换为大写字母'
      //   usage: 'UPPER(文本)'
      return Utils.isString(a) ? a.toUpperCase() : ''
    },
    HTP(str) { // 小驼峰转成下划线
      return Utils.humpToHyphena(String(str))
    },
    PTH(str) { // 下划线转小驼峰
      return Utils.hyphenToCamel(String(str))
    },
    STRING(obj) {
      return String(obj)
    }
  }
  // 日期时间函数 16
  const DateFn = {
    DATE() {
      // name: 'DATE'
      // intro: 'DATE函数可以将时间戳转换为日期对象'
      //   usage: 'DATE(时间戳)'
      return arguments.length === 6 ? new Date(parseInt(arguments[0], 10), parseInt(arguments[1], 10) - 1, parseInt(arguments[2], 10), parseInt(arguments[3], 10), parseInt(arguments[4], 10), parseInt(arguments[5], 10)) : arguments.length === 3 ? new Date(parseInt(arguments[0], 10), parseInt(arguments[1], 10) - 1, parseInt(arguments[2], 10)) : new Date(arguments[0])
    },
    TIME(a, b, c) {
      // intro: 'TIME函数可以返回特定时间的十进制数字'
      // usage: 'TIME(时_数字,分_数字,秒_数字)'
      return (3600 * a + 60 * b + c) / 86400
    },
    TIMESTAMP(a) {
      // intro: 'TIMESTAMP函数可以将日期对象转换成时间戳。'
      // usage: 'TIMESTAMP(日期)'
      return Utils.isDate(a) ? a.getTime() : 0
    },
    TODAY() {
      // intro: 'TODAY函数可以返回今天'
      // usage: 'TODAY()'
      return new Date()
    },
    NOW() {
      // intro: 'NOW函数可以获取当前时间'
      // usage: 'NOW()'
      return new Date()
    },
    SYSTIME() {
      // intro: 'SYSTIME函数可以获取当前服务器时间'
      // usage: 'SYSTIME()'
      return new Date()
    },
    DAY(a) {
      // intro: 'DAY函数可以获取某日期是当月的第几日'
      // usage: 'DAY(时间戳)'
      return new Date(a).getDate()
    },
    MONTH(a) {
      // intro: 'MONTH返回某日期的月份'
      // usage: 'MONTH(日期)'
      return new Date(a).getMonth() + 1
    },
    YEAR(a) {
      // intro: 'YEAR函数可以返回某日期的年份'
      // usage: 'YEAR(时间戳)'
      return new Date(a).getFullYear()
    },
    HOUR(a) {
      // intro: 'HOUR函数可以返回某日期的小时数'
      // usage: 'HOUR(时间戳)'
      return new Date(a).getHours()
    },
    MINUTE(a) {
      // intro: 'MINUTE函数可以返回某日期的分钟数'
      // usage: 'MINUTE(日期)'
      return new Date(a).getMinutes()
    },
    SECOND(a) {
      // intro: 'SECOND函数可以返回某日期的秒数'
      // usage: 'SECOND(日期)'
      return new Date(a).getSeconds()
    },
    DAYS(a, b) {
      // intro: 'DAYS函数可以返回两个日期之间相差的天数。'
      // usage: 'DAYS(结束日期,开始日期)'
      let c = new Date(a.getFullYear(), a.getMonth(), a.getDate())
      let d = new Date(b.getFullYear(), b.getMonth(), b.getDate())
      return (c - d) / 864e5
    },
    DATEDELTA(a, b) {
      // intro: 'DATEDELTA函数可以将指定日期加/减指定天数'
      // usage: 'DATEDELTA(指定日期,需要加减的天数)'
      Utils.isNumber(b) || (b = 0)
      return new Date(a.getTime() + 864e5 * b)
    },
    ISOWEEKNUM(a) {
      a.setHours(0, 0, 0)
      a.setDate(a.getDate() + 4 - (a.getDay() || 7))
      let b = new Date(a.getFullYear(), 0, 1)
      return Math.ceil(((a - b) / 864e5 + 1) / 7)
    },
    WEEKNUM(a, b) {
      // intro: 'ISOWEEKNUM函数可以返回指定日期在全年中的ISO周数'
      // usage: 'ISOWEEKNUM(指定日期)'
      let c = b === 2 ? 1 : 0
      let d = new Date(a.getFullYear(), 0, 1)
      let e = (c + 7 - d.getDay()) % 7
      let f = e > 0 ? 1 : 0
      let g = d.getTime() + 24 * e * 60 * 60 * 1e3
      return Math.floor((a.getTime() - g) / 864e5 / 7 + 1) + f
    }
  }
  const Constraint = {
    CT_GROUP(toItemField, type, result) {

    }
  }
  // 其他函数 9
  const otherFn = {
    UUID(a) {
      return a ? (a ^ 16 * Math.random() >> a / 4).toString(16) : ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, this.UUID)
    },
    COUNT() {
      // intro: 'COUNT函数可以获取参数的数量'
      // usage: 'COUNT(值,值,...)'
      return Utils.flatten(arguments).length
    },
    STRTOOBJ(value) {
      // 获取全部参数,并转换成json对象
      let valueArr = value.split('&')
      let len = valueArr.length
      let result = {}
      for (let i = 0; i < len; i++) {
        let pos = valueArr[i].indexOf('=')
        if (pos === -1) {
          continue
        }
        let name = valueArr[i].substring(0, pos)
        result[name] = valueArr[i].substring(pos + 1).match(new RegExp('({[a-zA-Z0-9_]*})', 'ig')) ? RUN(valueArr[i].substring(pos + 1)) : valueArr[i].substring(pos + 1)
      }
      return result
    },
    STRTOARRAY(value) { // 将逗号隔开的字符串转化为数组
      return String(value).split(',')
    },
    STRTOARRAYOBJ(value) { // 将加号隔开的字符串参数转化为数组<对象>
      // TOARRAYOBJ('a=b&c=w&e=1+a=2&b=3&c=4')
      return String(value).split('+').map(item => {
        return otherFn.STRTOOBJ(item)
      })
    },
    RETURN(obj) { // 复杂数据
      return obj
    },
    GETEMPTY(type) { // 获取空值
      if (type === undefined) {
        return ''
      } else {
        switch (null) {
          case null:
            return null
          case 'Array':
            return []
          case 'Object':
            return {}
          case 'Number':
            return 0
          case 'String':
            return ''
          case 'Boolean':
            return false
          case 'Map':
            return new Map()
          case 'Set':
            return new Set()
        }
      }
    },
    OPTIONS(str) {
      // '009#博士后+001#小学+002#初中+003#高中+004#中专+005#大专+006#本科+007#硕士+008#博士'
      return String(str).split('+').map((item, index) => {
        return { value: item.split('#')[0], label: item.split('#')[1] }
      })
    },
    RUN(a) {
      // 执行
      let aa = Utils.replaceToString(a)
      return new Function('with(window.$$MacroFn){return ' + aa + '}')()
    },
  }
  const macroFn = {
    ...LogicFn,
    ...MathFn,
    ...ConditionsFn,
    ...TextFn,
    ...DateFn,
    ...Constraint,
    ...otherFn
  }
  // Object.keys(macroFn).forEach((FnName) => {
  //   macroFn[FnName].bind(macroFn)
  // })
  window.$$MacroFn = macroFn
  function RUN(a) {
    // 执行
    let aa = Utils.replaceToString(a)
    return new Function('with(window.$$MacroFn){return ' + aa + '}')()
  }
  return { ...macroFn, MacroFnUsage }
})