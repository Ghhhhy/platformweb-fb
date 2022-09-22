/* eslint-disable no-mixed-operators */
/* eslint-disable no-new-func */
// Formula   Author:Titans@2396757591@qq.com
import Utils from './Utils'
const Formula = {
  Formulamount: 'TFormula.Formula.', // 公式挂载引用位置
  evalFormula(a) {
    // 执行公式
    let self = this
    let b = Utils.each(Formula, function (a, c) {
      return 'let ' + a + '=' + self.Formulamount + a
    })
    let it = b.join(';') + ';'
    let c = new Function(it + 'return ' + a)()
    return c
  },
  UUID(a) {
    return a ? (a ^ 16 * Math.random() >> a / 4).toString(16) : ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, this.UUID)
  },
  GCD(a, b) {
    return b ? this.GCD(b, a % b) : a
  },
  LCM(a, b) {
    return a * b / this.GCD(a, b)
  },
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
  IF(a, b, c) {
    // intro: 'IF函数判断一个条件能否满足；如果满足返回一个值，如果不满足则返回另外一个值'
    // usage: 'IF(逻辑表达式,为true时返回的值,为false时返回的值)'
    return a ? b : c
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
    b = this.isEmpty(b) ? 1 : b
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
  MID(a, b, c) {
    // intro: 'MID返回文本中从指定位置开始的指定数目的字符'
    // usage: 'MID(文本,开始位置_数字,指定数目)'
    a = a || ''
    return Utils.isNumber(b) && Utils.isNumber(c) ? a.substr(b - 1, c) : a
  },
  AVERAGE() {
    // intro: 'AVERAGE函数可以获取一组数值的算术平均值'
    //   usage: 'AVERAGE(数字1,数字2,...)'
    let numArray = Utils.flatten(arguments, function (a) {
      return Utils.isNumber(a)
    })
    return Utils.reduceCalc(numArray, Utils.accurateJiafa) / numArray.length
  },
  COUNT() {
    // intro: 'COUNT函数可以获取参数的数量'
    // usage: 'COUNT(值,值,...)'
    return Utils.flatten(arguments).length
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
    // intro: 'ROUND函数可以将数字四舍五入到指定的位数'
    // usage: 'ROUND(数字,数字位数)'
    return Math.round(a * Math.pow(10, b)) / Math.pow(10, b)
  },
  CEILING(a, b) {
    // intro: 'CEILING函数可以将数字增大到最接近原值的指定因数的倍数'
    // usage: 'CEILING(数字,因数)'
    // example: 'CEILING(7,6)返回12，因为12比7大的同时，也是6的倍数中最接近7的数字'
    if (b === 0) {
      return 0
    } else {
      let c = b < 0 ? -1 : 0
      b = Math.abs(b)
      let d = b - Math.floor(b)
      let e = 0
      d > 0 && (e = -Math.floor(Math.log(d) / Math.log(10)))
      return a >= 0 ? this.ROUND(Math.ceil(a / b) * b, e) : c === 0 ? -this.ROUND(Math.floor(Math.abs(a) / b) * b, e) : -this.ROUND(Math.ceil(Math.abs(a) / b) * b, e)
    }
  },
  FLOOR(a, b) {
    // intro: 'FLOOR函数可将数字减小到最接近原值的指定因数的倍数'
    // usage: 'FLOOR(数字,因数)'
    // example: 'FLOOR(7,6)返回6，因为6比7小的同时，也是6的倍数中最接近7的数字'
    if (b === 0) {
      return 0
    } else if (!(a > 0 && b > 0 || a < 0 && b < 0)) {
      return 0
    } else {
      b = Math.abs(b)
      let c = b - Math.floor(b)
      let d = 0
      c > 0 && (d = -Math.floor(Math.log(c) / Math.log(10)))
      return a >= 0 ? this.ROUND(Math.floor(a / b) * b, d) : -this.ROUND(Math.floor(Math.abs(a) / b) * b, d)
    }
  },
  INT(a) {
    // intro: 'INT函数可以获取一个数的整数部分'
    // usage: 'INT(数字)'
    //   example: 'INT(3.1415)返回3，也就是3.1415的整数部分'
    return Utils.isNumber(a) ? Math.floor(a) : 0
  },
  LOG(a, b) {
    // intro: 'LOG函数可以根据指定底数返回数字的对数'
    // usage: 'LOG(数字,底数)'
    //   example: 'LOG(100,10)返回2，也就是以10为底数100的对数'
    b = void 0 === b ? 10 : b
    return Utils.isNumber(b) ? Math.log(a) / Math.log(b) : 0
  },
  MOD(a, b) {
    // name: 'MOD'
    // intro: 'MOD函数可以获取两数相除的余数'
    //   usage: 'MOD(被除数,除数)'
    if (b === 0) { return 0 }
    let c = Math.abs(a % b)
    return b > 0 ? c : -c
  },
  POWER(a, b) {
    // intro: 'POWER函数可以获取数字乘幂的结果'
    // usage: 'POWER(数字,指数)'
    let c = Math.pow(a, b)
    return isNaN(c) ? 0 : c
  },
  PRODUCT() {
    // intro: 'PRODUCT函数可以获取一组数值的乘积'
    // usage: 'PRODUCT(数字1,数字2,...)'
    let numArray = Utils.flatten(arguments, function (a) {
      return Utils.isNumber(a)
    })
    return Utils.reduceCalc(numArray, Utils.accurateChengFa)
  },
  SQRT(a) {
    // intro: 'SQRT函数可以获取一个数字的正平方根'
    // usage: 'SQRT(数字)'
    return a < 0 ? 0 : Math.sqrt(a)
  },
  SUM() {
    let numArray = Utils.flatten(arguments, function (a) {
      return Utils.isNumber(a)
    })
    return Utils.reduceCalc(numArray, Utils.accurateJiafa)
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
  FIXED(a, b) {
    // intro: 'FIXED函数可将数字舍入到指定的小数位数并输出为文本'
    // usage: 'FIXED(数字,小数位数)'
    b = void 0 === b ? 0 : b
    return Utils.isNumber(b) && b >= 0 ? Number(a).toFixed(b) : ''
  },
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
  },
  TEXT(a, b) {
    // intro: 'TEXT函数可以将数字转化成文本'
    // usage: 'TEXT(数字)'
    return Utils.isNull(a) ? '' : Utils.isDate(a) && !Utils.isEmpty(b) ? Utils.date2Str(a, b) : Utils.num2Str(a, b)
  },
  VALUE(a) {
    // intro: 'VALUE函数可以将文本转化为数字'
    // usage: 'VALUE(文本)'
    return Utils.isEmpty(a) ? 0 : isNaN(a) ? 0 : parseFloat(a)
  },
  ISEMPTY(a) {
    // intro: 'ISEMPTY函数可以用来判断值是否为空文本、空对象或者空数组'
    // usage: 'ISEMPTY(文本)'
    return Utils.isObjectEmpty(a)
  }
}

export default Formula
