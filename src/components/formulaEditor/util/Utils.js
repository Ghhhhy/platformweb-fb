// Utils   Author:Titans@2396757591@qq.com
const Utils = {
  getbasicDataType(obj) {
    // 获取数据类型
    return Object.prototype.toString.call(obj).slice(8, -1)
  },
  hyphenate(str) {
    // 小驼峰转成连字符
    return str.replace(/\B([A-Z])/g, '-$1').toLowerCase()
  },
  smallHump(str) {
    // 连字符转成小驼峰
    return str.replace(/(\w*)-(\w*)/g, function ($1, $2, $3) {
      return $2 + $3[0].toUpperCase() + $3.slice(1)
    })
  },
  isString(a) {
    // 是不是string
    return typeof a === 'string'
  },
  isNumber(b) {
    // 是不是number
    return isNaN(b)
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
  isObjectEmpty(a) {
    if (a == null) { return !0 }
    if (a.length > 0) { return !1 }
    if (a.length === 0) { return !0 }
    for (let b in a) {
      if (hasOwnProperty.call(a, b)) { return !1 }
    }
    return isNaN(a)
  },
  isValueWidget(a) {
    111111
    222222
    222222
    return !!fml.ValueWidgets[a]
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
    return arr.reduce(cb)
  },
  accurateJiafa(num1, num2) { // 精确加法
    let n1 = String(num1)
    let n2 = String(num2)
    let f1 = n1.split('.')[1]
    let f2 = n2.split('.')[1]
    let b1 = f1 ? f1.length : 0
    let b2 = f2 ? f2.length : 0
    let r1 = n1.replace('.', '')
    let r2 = n2.replace('.', '')
    try {
      if (b1 > b2) {
        r2 = r2 + new Array(b1 - b2).fill(0).join('')
        return String((Number(r1) + Number(r2)) / ('1' + new Array(b1).fill(0).join('')))
      } else if (b2 > b1) {
        r1 = r1 + new Array(b2 - b1).fill(0).join('')
        return String((Number(r1) + Number(r2)) / ('1' + new Array(b2).fill(0).join('')))
      } else {
        return String(Number(r1) + Number(r2)) / ('1' + new Array(b2).fill(0).join(''))
      }
    } catch (e) {
      return ''
    }
  },
  accurateJianfa(num1, num2) { // 精确减法
    let n1 = String(num1)
    let n2 = String(num2)
    let f1 = n1.split('.')[1]
    let f2 = n2.split('.')[1]
    let b1 = f1 ? f1.length : 0
    let b2 = f2 ? f2.length : 0
    let r1 = n1.replace('.', '')
    let r2 = n2.replace('.', '')
    try {
      if (b1 > b2) {
        r2 = r2 + new Array(b1 - b2).fill(0).join('')
        return String((r1 - r2) / ('1' + new Array(b1).fill(0).join('')))
      } else if (b2 > b1) {
        r1 = r1 + new Array(b2 - b1).fill(0).join('')
        return String((r1 - r2) / ('1' + new Array(b2).fill(0).join('')))
      } else {
        return String(r1 - r2) / ('1' + new Array(b2).fill(0).join(''))
      }
    } catch (e) {
      return ''
    }
  },
  accurateChuFa(divisor, dividend) { /* 获取小数相除的精确结果 */
    if (parseFloat(divisor) === 0 || parseFloat(dividend) === 0) {
      return '0'
    }
    let n1 = String(divisor)
    let n2 = String(dividend)
    let f1 = n1.split('.')[1]
    let f2 = n2.split('.')[1]
    let b1 = f1 ? f1.length : 0
    let b2 = f2 ? f2.length : 0
    let r1 = n1.replace('.', '')
    let r2 = n2.replace('.', '')
    try {
      if (b1 > b2) {
        r2 = r2 + new Array(b1 - b2).fill(0).join('')
      } else if (b2 > b1) {
        r1 = r1 + new Array(b2 - b1).fill(0).join('')
      } else { }
      return String(r1 / r2)
    } catch (e) {
      return ''
    }
  },
  accurateChengFa(multiplier1, multiplier2) { /* 获取小数相乘的精确结果 */
    if (parseFloat(multiplier1) === 0 || parseFloat(multiplier2) === 0) {
      return '0'
    }
    let m = 0
    let n1 = String(multiplier1)
    let n2 = String(multiplier2)
    let f1 = n1.split('.')[1]
    let f2 = n2.split('.')[1]
    m += f1 ? f1.length : 0
    m += f2 ? f2.length : 0
    let result = String(n1.replace('.', '') * n2.replace('.', ''))
    try {
      if (m === 0) {
        return result
      } else {
        return String(result / ('1' + new Array(m).fill(0).join('')))
      }
    } catch (e) {
      return ''
    }
  },
  transToNumberLocalString(number, digits = 0) {
    // 返回逗号隔开千分位的数字
    let result = ''
    number = String(number)
    digits = parseInt(digits)
    if (number.indexOf('-') === 0) {
      result = '-'
    }
    number = Number(number).toLocaleString()
    let numberArr = number.split('').filter((item, index) => {
      return new RegExp('^[0-9.,]$').test(item)
    }).join('').split('.')
    if (numberArr[0] === '' && numberArr[1]) {
      numberArr[0] = '0'
    }
    if (digits === 0) {
      numberArr = [numberArr[0]]
      return result + numberArr[0]
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
    let result = ''
    number = String(number)
    digits = parseInt(digits)
    if (number.indexOf('-') === 0) {
      result = '-'
    }
    let numberArr = number.split('').filter((item, index) => {
      return new RegExp('^[0-9.]$').test(item)
    }).join('').split('.')
    if (numberArr[0] === '' && numberArr[1]) {
      numberArr[0] = '0'
    }
    if (digits === 0) {
      return result + numberArr[0]
    } else {
      let numberArr1 = numberArr[1] ? numberArr[1].split('') : []
      numberArr1 = [...numberArr1, ...new Array(digits).fill('0')]
      numberArr1.length = digits
      numberArr = [numberArr[0], '.', ...numberArr1]
      return result + numberArr.join('')
    }
  },
  transInputToNumber(number) {
    let result = ''
    number = String(number)
    if (number.indexOf('-') === 0) {
      result = '-'
    }
    let numberArr = number.split('').filter((item, index) => {
      return new RegExp('^[0-9.]$').test(item)
    }).join('').split('.')
    if (numberArr[0] === '' && numberArr[1]) {
      numberArr[0] = '0'
    }
    if (numberArr.length > 1) {
      numberArr = [numberArr[0], '.', numberArr[1]]
    } else {
    }
    return result + numberArr.join('')
  },
  digitUppercase(money) {
    // 汉字的数字
    let cnNums = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖']
    // 基本单位
    let cnIntRadice = ['', '拾', '佰', '仟']
    // 对应整数部分扩展单位
    let cnIntUnits = ['', '万', '亿', '兆']
    // 对应小数部分单位
    let cnDecUnits = ['角', '分', '毫', '厘']
    // 整数金额时后面跟的字符
    let cnInteger = '整'
    // 整型完以后的单位
    let cnIntLast = '元'
    // 最大处理的数字
    let maxNum = 999999999999999.9999
    // 金额整数部分
    let integerNum
    // 金额小数部分
    let decimalNum
    // 输出的中文金额字符串
    // 分离金额后用的数组，预定义
    let parts
    let chineseStr = money < 0 ? '欠' : ''
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
  flatten(a, b, c) {
    if (c || (c = [])) {
      for (let d = 0, e = a.length; d < e; d++) {
        let f = a[d]
        Array.isArray(f) ? this.flatten(f, b, c) : ((b && !b(f)) || c.push(f))
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
  }
}
export default Utils
