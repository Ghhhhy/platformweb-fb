/*
 * @Date:   2017-05-29 09:54:53
 * Author: Titans
 * @Last Modified time: 2019-09-18 10:56:49
 */
/* eslint-disable */
import BigNumber from './big.js'
export default {
  each(object, callback) {
    /* js原生each方法 */
    let type = (function(obj) {
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
      [].every.call(object, function(v, i) {
        return callback.call(v, i, v) !== false
      })
    } else if (type === 'Object') {
      for (let i in object) {
        if (callback.call(object[i], i, object[i]) === false) {
          break
        }
      }
    } // 为对象格式时,返回:key, value
  },
  utilFn: { // 工具类函数
    getUuid(hexDigits = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz") {
      /*获取uuid*/
      let s = []
      for (let i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
      }
      s[14] = "4" // bits 12-15 of the time_hi_and_version field to 0010
      s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1) // bits 6-7 of the clock_seq_hi_and_reserved to 01
      s[8] = s[13] = s[18] = s[23] = ""
      let uuid = s.join("")
      return uuid
    },
    jsonStringify(columns) {
      // 对象转换成json字符串
      return JSON.stringify(columns, function(key, val) {
        if (typeof val === 'function') {
          return val + ''
        }
        return val
      })
    },
    jsonParse(str) {
      // json字符串转换成对象
      return JSON.parse(str, function(k, v) {
        try {
          if (
            v.indexOf &&
            (v.indexOf('function') > -1 || v.indexOf('=>') > -1)
          ) {
            // return eval('(function(){return ' + v + ' })()')
            // eslint-disable-next-line no-new-func
            let func = new Function('return ' + v)
            return func()
          }
          return v
        } catch (e) {}
      })
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
          newObj = obj
        }
        // eslint-disable-next-line no-proto
        // newObj.__proto__ = obj.__proto__
      }
      return newObj
    },
    numTostring(digit, num) { // num位数不够digit位前面添加0
      let str = num.toString()
      let len = str.length
      let arr = str.split('')
      let zeroNum = digit - len
      for (let i = 0; i < zeroNum; i++) {
        arr.unshift('0')
      }
      return arr.join('')
    },
    checkPwd(str) {
      /* 检测密码强度 */
      let Lv = 0
      if (str.length < 6) {
        return Lv
      }
      if (/[0-9]/.test(str)) {
        Lv++
      }
      if (/[a-z]/.test(str)) {
        Lv++
      }
      if (/[A-Z]/.test(str)) {
        Lv++
      }
      // eslint-disable-next-line no-useless-escape
      if (/[\.|-|_]/.test(str)) {
        Lv++
      }
      return Lv
    },
    jsonToStr(jsonStr) {
      let str = JSON.stringify(jsonStr, function(key, val) {
        if (typeof val === 'function') {
          return val + ''
        }
        return val
      })

      return str

    },
    strToJson(str) {
      let json = JSON.parse(str, function (k, v) {
        try {
          if (v.indexOf && (v.indexOf('function') > -1 || v.indexOf('=>') > -1)) {
            let func = new Function('return ' + v)
            return func()
          }
          return v
          }
        catch (error) {
          return v
          }
        })
      return json
      // return JSON.parse(str)
    },
    // 防抖函数（当前项目运用它的初衷是，避免快速切换页签产生多次异步请求导致左侧树数据异常）
    //        使用的时候，一定要在调用处的组件对象的data里创建timeout属性
    //        func应该是要箭头函数才起作用
    // @params func函数对象，immediate是否立即执行，time延迟时间，self传进需要调用的对象
    // @return 返回处理后的执行函数
    debounce(func, immediate = false, time = 500, self = this) {
      return function () {
        if (self.timeout) {
          clearTimeout(self.timeout)
        }
        if (immediate) {
          self.timeout = setTimeout(_ => {}, time)
          func.call(self)
        } else {
          self.timeout = setTimeout(_ => {
            func.call(self)
          }, time)
        }
      }
    }
  },
  transformFn: { // 转化函数
    formatNum(num) {
      if (typeof num === 'string') {
        return num.split('').reverse().join('').replace(/(\d{3})/g, '$1,').replace(/\,$/, '').split('').reverse().join('')
      } else if (typeof num === 'number') {
        return (num).toString().split('').reverse().join('').replace(/(\d{3})/g, '$1,').replace(/\,$/, '').split('').reverse().join('')
      }
    },
    trimStr(nullStr) {
      if (nullStr === null || typeof(nullStr) === 'undefined') {
        return ''
      } else {
        return nullStr
      }
    },
    getByteLength(val) {
      let len = 0
      for (let i in val) {
        // eslint-disable-next-line no-control-regex
        if (val[i].match(/[^\x00-\xff]/ig) !== null) // 全角
        {
          len += 2
        } else {
          len += 1
        }
      }
      return len
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
        console.error("除数不能为0")
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
    digitUppercase(money) {
      /* 现金额大写 */
      if (typeof money === 'number') {
        money = new String(money)
      };
      money = money.replace(/,/g, '') // 替换tomoney()中的“,”
      money = money.replace(/ /g, '') // 替换tomoney()中的空格
      money = money.replace(/￥/g, '') // 替换掉可能出现的￥字符
      // if (isNaN(n)) { //验证输入的字符是否为数字
      //     //alert("请检查小写金额是否正确");
      //     return "";
      // };
      // let fraction = ['角', '分']
      // let digit = [
      //   '零', '壹', '贰', '叁', '肆',
      //   '伍', '陆', '柒', '捌', '玖'
      // ]
      // let unit = [
      //   ['元', '万', '亿', '万', '亿'],
      //   ['', '拾', '佰', '仟']
      // ]
      // let head = n < 0 ? '欠' : ''
      // n = Math.abs(n)
      // let s = ''
      // for (let i = 0; i < fraction.length; i++) {
      //   s += (digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '')
      // }
      // s = s || '整'
      // n = Math.floor(n)
      // for (let i = 0; i < unit[0].length && n > 0; i++) {
      //   let p = ''
      //   for (let j = 0; j < unit[1].length && n > 0; j++) {
      //     p = digit[n % 10] + unit[1][j] + p
      //     n = Math.floor(n / 10)
      //   }
      //   s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s
      // }
      // return head + s.replace(/(零.)*零元/, '元')
      //   .replace(/(零.)+/g, '零')
      //   .replace(/^整$/, '零元整')
      var cnNums = new Array('零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖');	 //汉字的数字
      var cnIntRadice = new Array('', '拾', '佰', '仟'); //基本单位
      var cnIntUnits = new Array('', '万', '亿', '万亿');  //对应整数部分扩展单位
      var cnDecUnits = new Array('角', '分', '毫', '厘'); //对应小数部分单位
      var cnInteger = '整';	//整数金额时后面跟的字符
      var cnIntLast = '元';	//整数完以后的单位
      //最大处理的数字
      var maxNum = 999999999999999.9999;
      var integerNum;	 //金额整数部分
      var decimalNum;	 //金额小数部分
      //输出的中文金额字符串
      var chineseStr = '';
      var parts;		//分离金额后用的数组，预定义
      if (money == '') { return ''; }

      money = parseFloat(money);
      if (money >= maxNum) {
        //超出最大处理数字
        return '超出最大处理数字';
      }
      if (money == 0) {
        chineseStr = cnNums[0] + cnIntLast + cnInteger;
        return chineseStr;
      }

    //四舍五入保留两位小数,转换为字符串
      money = Math.round(money * 100).toString();
      if(money.length <= 1)money =  '0' + money
    integerNum = money.substr(0,money.length-2);
    decimalNum = money.substr(money.length-2);
      //获取整型部分转换
      if (parseInt(integerNum, 10) > 0) {
        var zeroCount = 0;
        var IntLen = integerNum.length;
        for (var i = 0; i < IntLen; i++) {
          var n = integerNum.substr(i, 1);
          var p = IntLen - i - 1;
          var q = p / 4;
          var m = p % 4;
          if (n == '0') {
            zeroCount++;
          } else {
            if (zeroCount > 0) {
              chineseStr += cnNums[0];
            }
            //归零
            zeroCount = 0;
            chineseStr += cnNums[parseInt(n)] + cnIntRadice[m];
          }
          if (m == 0 && zeroCount < 4) {
            chineseStr += cnIntUnits[q];
          }
        }
        chineseStr += cnIntLast;
      }
      //小数部分
      if (decimalNum != '' && decimalNum != '00') {
        var decLen = decimalNum.length;
        for (var i = 0; i < decLen; i++) {
          var n = decimalNum.substr(i, 1);
          if(n != '0')chineseStr += cnNums[Number(n)] + cnDecUnits[i];
        }
      }
      if (chineseStr == '') {
        chineseStr += cnNums[0] + cnIntLast + cnInteger;
      } else if (decimalNum == '' || /^0*$/.test(decimalNum)) {
        chineseStr += cnInteger;
      }
      return chineseStr;
    },
    numberToChinese(num, type) {
      /* 将阿拉伯数字翻译成中文的大写数字 */
      if (typeof num === 'number') {
        num = new String(num)
      };
      num = num.replace(/,/g, '') // 替换tomoney()中的“,”
      num = num.replace(/ /g, '') // 替换tomoney()中的空格
      num = num.replace(/￥/g, '') // 替换掉可能出现的￥字符
      let rel = num < 0 ? (type === 'money' ? '欠' : '负') : ''
      num = num < 0 ? -(num) : num
      let AA = new Array('零', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十')
      let BB = new Array('', '十', '百', '千', /* "萬", "億", */ '万', '亿', '点', '')
      let a = ('' + num).replace(/(^0*)/g, '').split('.')
      let k = 0
      let re = ''
      for (let i = a[0].length - 1; i >= 0; i--) {
        switch (k) {
          case 0:
            re = BB[7] + re
            break
          case 4:
            if (!new RegExp('0{4}//d{' + (a[0].length - i - 1) + '}$')
              .test(a[0])) {
              re = BB[4] + re
            }
            break
          case 8:
            re = BB[5] + re
            BB[7] = BB[5]
            k = 0
            break
        }
        if (k % 4 === 2 && a[0].charAt(i + 2) !== 0 && a[0].charAt(i + 1) === 0) {
          re = AA[0] + re
        }
        if (a[0].charAt(i) !== 0) {
          re = AA[a[0].charAt(i)] + BB[k % 4] + re
        }
        k++
      }

      if (a.length > 1) // 加上小数部分(如果有小数部分)
      {
        re += BB[6]
        for (let i = 0; i < a[1].length; i++) {
          re += AA[a[1].charAt(i)]
        }
      }
      if (re === '一十') {
        re = '十'
      }
      if (re.match(/^一/) && re.length === 3) {
        re = re.replace('一', '')
      }
      return rel + re
    }
  },
  numberFn: { // 数字
    strToInt(n) {
      if (n === null || typeof(n) === 'undefined' || isNaN(n)) {
        return 0
      } else {
        let newNumber = parseInt(n)
        if (isNaN(newNumber)) {
          return 0
        } else {
          return newNumber
        }
      }
    },
    strToInt45(n) {
      if (n === null || typeof(n) === 'undefined' || isNaN(n)) {
        return 0
      } else {
        let newNumber = Math.round(n)
        if (isNaN(newNumber)) {
          return 0
        } else {
          return newNumber
        }
      }
    },
    strToFloat(n) {
      if (n === null || typeof(n) === 'undefined' || isNaN(n)) {
        return 0
      } else if (typeof(n) === 'number') {
        return n
      } else {
        let newNumber = parseFloat(n)
        if (isNaN(newNumber)) {
          return 0
        } else {
          return newNumber
        }
      }
    },
    reduceCalc(arr, cb) {
      return arr.reduce(cb)
    },
    mathPow10(n) { // 10的N次方
      if (n >= 0) {
        return Number('1'.padEnd(+n + 1, 0))
      } else {
        return 1 / Number('1'.padEnd(-n + 1, 0))
      }
    },
    accurateJiafa(arg1, arg2) { // 精确加法
      let r1, r2, m
      try { r1 = arg1.toString().split('.')[1].length } catch (e) { r1 = 0 }
      try { r2 = arg2.toString().split('.')[1].length } catch (e) { r2 = 0 }
      m = this.mathPow10(Math.max(r1, r2))
      return (arg1 * m + arg2 * m) / m
    },
    accurateJianfa(arg1, arg2) { // 精确减法
      let r1, r2, m, n
      try { r1 = arg1.toString().split('.')[1].length } catch (e) { r1 = 0 }
      try { r2 = arg2.toString().split('.')[1].length } catch (e) { r2 = 0 }
      m = this.mathPow10(Math.max(r1, r2))
      // last modify by deeka
      // 动态控制精度长度
      n = (r1 >= r2) ? r1 : r2
      return ((arg1 * m - arg2 * m) / m).toFixed(n)
    },
    accurateChengFa(arg1, arg2) { // 精确乘法
      let m = 0; let s1 = arg1.toString(); let s2 = arg2.toString()
      try { m += s1.split('.')[1].length } catch (e) { }
      try { m += s2.split('.')[1].length } catch (e) { }
      return Number(s1.replace('.', '')) * Number(s2.replace('.', '')) / this.mathPow10(m)
    },
    accurateChuFa(arg1, arg2) { // 精确除法
      let t1 = 0; let t2 = 0; let r1; let r2
      try { t1 = arg1.toString().split('.')[1].length } catch (e) { }
      try { t2 = arg2.toString().split('.')[1].length } catch (e) { }
      r1 = Number(arg1.toString().replace('.', ''))
      r2 = Number(arg2.toString().replace('.', ''))
      return this.accurateChengFa(r1 / r2, this.mathPow10(t2 - t1))
    },
    accurateFixed(number, n) { // 保留小数位数(四舍五入)
      n = n ? parseInt(n) : 0
      if (n <= 0) return String(Math.round(number))
      number = Math.round(number * this.mathPow10(n)) / this.mathPow10(n)
      return String(number)
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
    transInputToNumber(number) {
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
        numberArr = [numberArr[0], '.', numberArr[1]]
      } else {
      }
      return result + numberArr.join('')
    },
    double45(arg1, number) {
      /* 获取小数四舍五入,保留N位小数 */
      try {
        let baifen = 1
        for (let h = 0; h < number; h++) {
          baifen = baifen * 10
        }
        let f_x = Math.round(arg1 * baifen) / baifen
        return f_x
      } catch (e) {
        return arg1
      }
    },
    zhengchu(exp1, exp2) {
      let n1 = Math.round(exp1) // 四舍五入
      let n2 = Math.round(exp2) // 四舍五入
      let rslt = n1 / n2 // 除
      if (rslt >= 0) {
        rslt = Math.floor(rslt) // 返回小于等于原rslt的最大整数。
      } else {
        rslt = Math.ceil(rslt) // 返回大于等于原rslt的最小整数。
      }
      return rslt
    },
    random(min, max) {
      /* 随机数范围 */
      if (arguments.length === 2) {
        return Math.floor(min + Math.random() * ((max + 1) - min))
      } else {
        return 0
      }
    }
  },
  TypeFn: { // 类型判断
    isType(o, type) {
      // 'String' 'Number' 'Array' 'Boolean' 'Function' 'Object' 'Undefined' 'Null'  'Date' 'RegExp' 'Symbol' 'Promise' 'Set'
      return Object.prototype.toString.call(o).slice(8, -1) === type
    },
    isFalse(o) {
      if (o === '' || o === undefined || o === null || o === 0 || o === false || o === NaN || o === 0.0) return true
      return false
    },
    isTrue(o) {
      return !this.isFalse(o)
    }
  },
  DateFn: { // 时间处理函数
    formatDate(date, format) {
      /* 通用化格式时间 */
      // new Date( year, month, date, hrs, min, sec)
      // new Date() ;     //参数可以为整数; 也可以为字符串; 但格式必须正确
      // examplenew Date(2009,1,1);       //正确  new Date("2009/1/1");    //正确
      // example  formatDate(new Date(), "当前日期为：YYYY-MM-DD，星期w，为第qq季度，时间为：hh:mm:ss:c")
      date = new Date(date)
      let o = {
        'M+': date.getMonth() + 1, // month  MM
        'D+': date.getDate(), // day  DD
        'h+': date.getHours(), // hour  hh
        'm+': date.getMinutes(), // minute mm
        's+': date.getSeconds(), // second ss==
        'q+': Math.floor((date.getMonth() + 3) / 3), // quarter 季度 q
        'c': date.getMilliseconds(), // millisecond 毫秒 c
        'w': ['一', '二', '三', '四', '五', '六', '日'][date.getDay() - 1] // week 星期 w
      }
      if (/(Y+)/.test(format)) { // year  YYYY
        format = format.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
      }
      for (let k in o) {
        if (new RegExp('(' + k + ')').test(format)) {
          format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length))
        }
      }
      return format
    },
    parserDate(date) { // 如何将标准时间 Thu Mar 07 2019 12:00:00 GMT+0800 (中国标准时间)转换为2019-03-07 12:00:00
      date = new Date(date)
      let resDate = date.getFullYear() + '-' + (function(p) {
        return p < 10 ? '0' + p : p
      })(date.getMonth() + 1) + '-' + (function(p) {
        return p < 10 ? '0' + p : p
      })(date.getDate())
      let resTime = (function(p) {
        return p < 10 ? '0' + p : p
      })(date.getHours()) + ':' + (function(p) {
        return p < 10 ? '0' + p : p
      })(date.getMinutes()) + ':' + (function(p) {
        return p < 10 ? '0' + p : p
      })(date.getSeconds())
      return resDate + ' ' + resTime
    },
    parseSandardDate(date) { // 如何将2019-03-07 12:00:00转换为标准时间 Thu Mar 07 2019 12:00:00 GMT+0800 (中国标准时间)
      let t = Date.parse(date)
      if (!isNaN(t)) {
        return new Date(Date.parse(date.replace(/-/g, '/')))
      } else {
        return new Date()
      }
    },
    getmillisecond(time1) { // 时间格式‘2016 - 01 - 01 17: 22: 37’字符串转为时间戳（毫秒）
      let date = new Date(time1.replace(/-/g, '/')) // 开始时间
      return date.getTime()
    },
    betweenTime(date1, date2) {
      date1 = new Date(date1.replace(/-/g, '/'))
      date2 = new Date(date2.replace(/-/g, '/'))
      let date3 = date2.getTime() - date1.getTime() // 时间差的毫秒数
      // 计算出相差天数
      let days = Math.floor(date3 / (24 * 3600 * 1000))
      // 计算出小时数
      let leave1 = date3 % (24 * 3600 * 1000) // 计算天数后剩余的毫秒数
      let hours = Math.floor(leave1 / (3600 * 1000))
      // 计算相差分钟数
      let leave2 = leave1 % (3600 * 1000) // 计算小时数后剩余的毫秒数
      let minutes = Math.floor(leave2 / (60 * 1000))
      // 计算相差秒数
      let leave3 = leave2 % (60 * 1000) // 计算分钟数后剩余的毫秒数
      let seconds = Math.round(leave3 / 1000)
      //
      let str = ''
      if (days > 0) {
        str += days + '天 '
      }
      if (hours > 0) {
        str += hours + '小时 '
      }
      if (minutes > 0) {
        str += minutes + ' 分钟'
      }
      if (seconds > 0) {
        str += seconds + ' 秒'
      }
      return str
    },
    betweenTimeByLong(date1, date2) {
      let date3 = date2 - date1 // 时间差的毫秒数
      // 计算出相差天数
      let days = Math.floor(date3 / (24 * 3600 * 1000))
      // 计算出小时数
      let leave1 = date3 % (24 * 3600 * 1000) // 计算天数后剩余的毫秒数
      let hours = Math.floor(leave1 / (3600 * 1000))
      // 计算相差分钟数
      let leave2 = leave1 % (3600 * 1000) // 计算小时数后剩余的毫秒数
      let minutes = Math.floor(leave2 / (60 * 1000))
      // 计算相差秒数
      let leave3 = leave2 % (60 * 1000) // 计算分钟数后剩余的毫秒数
      let seconds = Math.round(leave3 / 1000)
      //
      let str = ''
      if (days > 0) {
        str += days + '天 '
      }
      if (hours > 0) {
        str += hours + '小时 '
      }
      if (minutes > 0) {
        str += minutes + ' 分钟'
      }
      if (seconds > 0) {
        str += seconds + ' 秒'
      }
      return str
    },
    formatDateValue(value) {
      /* 检测年月日时分秒20190609110000 返回yyyy-MM-dd hh:mm:ss */
      let me = this
      if (typeof(value) === 'undefined' || value === '') {
        return ''
      }
      if (value.length !== 14) { // 长度14
        return value
      } else if (!(value.indexOf('15') === 0 || value.indexOf('16') === 0 || value.indexOf('17') === 0 ||
          value.indexOf('19') === 0 || value.indexOf('20') === 0)) {
        // 不是18或者19或者20开头
        return value
      } else if (isNaN(value)) { // 是字符串（非数字）
        return value
      } else {
        let yue = me.strToInt(value.substring(4, 6))
        let day = me.strToInt(value.substring(6, 8))
        let hour = me.strToInt(value.substring(8, 10))
        let min = me.strToInt(value.substring(10, 12))
        let second = strToInt(value.substring(12, 14))
        if (yue < 1 || yue > 12) { // 月小于1大于12
          return value
        } else if (day < 1 || day > 31) { // 日小于1大于31
          return value
        } else if (hour < 0 || hour > 24) { // 时 小于0大于24
          return value
        } else if (min < 0 || min > 59) { // 分 小于0大于59
          return value
        } else if (second < 0 || second > 59) { // 秒 小于0大于59
          return value
        } else {
          return value.substring(0, 4) + '-' + value.substring(4, 6) + '-' + value.substring(6, 8) +
            ' ' + value.substring(8, 10) + ':' + value.substring(10, 12) + ':' + value.substring(12, 14)
        }
      }
    },
    getMonths(time, len, direction) {
      /* 返回指定长度的月份集合 */
      /*
       * @param  {time} 时间
       * @param  {len} 长度
       * @param  {direction} 方向：  1: 前几个月;  2: 后几个月;  3:前后几个月  默认 3
       * @return {Array} 数组
       * @example   getMonths('2018-1-29', 6, 1)  // ->  ["2018-1", "2017-12", "2017-11", "2017-10", "2017-9", "2017-8", "2017-7"]
       */
      let mm = new Date(time).getMonth()
      let yy = new Date(time).getFullYear()
      direction = isNaN(direction) ? 3 : direction
      let index = mm
      let cutMonth = function(index) {
        if (index <= len && index >= -len) {
          return direction === 1 ? formatPre(index).concat(cutMonth(++index)) :
            direction === 2 ? formatNext(index).concat(cutMonth(++index)) : formatCurr(index).concat(cutMonth(++index))
        }
        return []
      }
      let formatNext = function(i) {
        let y = Math.floor(i / 12)
        let m = i % 12
        return [yy + y + '-' + (m + 1)]
      }
      let formatPre = function(i) {
        let y = Math.ceil(i / 12)
        let m = i % 12
        m = m === 0 ? 12 : m
        return [yy - y + '-' + (13 - m)]
      }
      let formatCurr = function(i) {
        let y = Math.floor(i / 12)
        let yNext = Math.ceil(i / 12)
        let m = i % 12
        let mNext = m === 0 ? 12 : m
        return [yy - yNext + '-' + (13 - mNext), yy + y + '-' + (m + 1)]
      }
      // 数组去重
      let unique = function(arr) {
        if (Array.hasOwnProperty('from')) {
          return Array.from(new Set(arr))
        } else {
          let n = {}
          let r = []
          for (let i = 0; i < arr.length; i++) {
            if (!n[arr[i]]) {
              n[arr[i]] = true
              r.push(arr[i])
            }
          }
          return r
        }
      }
      return direction !== 3 ? cutMonth(index) : unique(cutMonth(index).sort(function(t1, t2) {
        return new Date(t1).getTime() - new Date(t2).getTime()
      }))
    },
    getDays(time, len, diretion) {
      /* 返回指定长度的天数集合 */
      /**
       * @param  {time} 时间
       * @param  {len} 长度
       * @param  {direction} 方向： 1: 前几天;  2: 后几天;  3:前后几天  默认 3
       * @return {Array} 数组
       *
       * @example date.getDays('2018-1-29', 6) // -> ["2018-1-26", "2018-1-27", "2018-1-28", "2018-1-29", "2018-1-30", "2018-1-31", "2018-2-1"]
       */
      let tt = new Date(time)
      let getDay = function(day) {
        let t = new Date(time)
        t.setDate(t.getDate() + day)
        let m = t.getMonth() + 1
        return t.getFullYear() + '-' + m + '-' + t.getDate()
      }
      let arr = []
      if (diretion === 1) {
        for (let i = 1; i <= len; i++) {
          arr.unshift(getDay(-i))
        }
      } else if (diretion === 2) {
        for (let i = 1; i <= len; i++) {
          arr.push(getDay(i))
        }
      } else {
        for (let i = 1; i <= len; i++) {
          arr.unshift(getDay(-i))
        }
        arr.push(tt.getFullYear() + '-' + (tt.getMonth() + 1) + '-' + tt.getDate())
        for (let i = 1; i <= len; i++) {
          arr.push(getDay(i))
        }
      }
      return diretion === 1 ? arr.concat([tt.getFullYear() + '-' + (tt.getMonth() + 1) + '-' + tt.getDate()]) :
        diretion === 2 ? [tt.getFullYear() + '-' + (tt.getMonth() + 1) + '-' + tt.getDate()].concat(arr) : arr
    },
    formatHMS(s) {
      /* 秒转化为时分秒 */
      /**
       * @param  {s} 秒数
       * @return {String} 字符串
       *
       * @example formatHMS(3610) // -> 1h0m10s
       */
      let str = ''
      if (s > 3600) {
        str = Math.floor(s / 3600) + 'h' + Math.floor(s % 3600 / 60) + 'm' + s % 60 + 's'
      } else if (s > 60) {
        str = Math.floor(s / 60) + 'm' + s % 60 + 's'
      } else {
        str = s % 60 + 's'
      }
      return str
    },
    getweek(date) {
      /* 获取星期几 */
      date = new Date(date)
      return ['一', '二', '三', '四', '五', '六', '日'][date.getDay() - 1] // week 星期
    },
    getquarter(date) {
      /* 获取第几季度 */
      d = new Date(date)
      return ['第一季度', '第二季度', '第三季度', '第四季度'][Math.floor((d.getMonth() + 3) / 3) - 1] // quarter 季度 q
    },
    getMonthOfDay(time) {
      /* 获取某月有多少天 */
      let date = new Date(time)
      let year = date.getFullYear()
      let mouth = date.getMonth() + 1
      let days

      // 当月份为二月时，根据闰年还是非闰年判断天数
      if (mouth === 2) {
        days = (year % 4 === 0 && year % 100 === 0 && year % 400 === 0) || (year % 4 === 0 && year % 100 !== 0) ? 28 : 29
      } else if (mouth === 1 || mouth === 3 || mouth === 5 || mouth === 7 || mouth === 8 || mouth === 10 || mouth === 12) {
        // 月份为：1,3,5,7,8,10,12 时，为大月.则天数为31；
        days = 31
      } else {
        // 其他月份，天数为：30.
        days = 30
      }
      return days
    },
    getYearOfDay(time) {
      /* 获取某年有多少天 */
      let firstDayYear = this.getFirstDayOfYear(time)
      let lastDayYear = this.getLastDayOfYear(time)
      let numSecond = (new Date(lastDayYear).getTime() - new Date(firstDayYear).getTime()) / 1000
      return Math.ceil(numSecond / (24 * 3600))
    },
    getFirstDayOfYear(time) {
      /* 获取某年的第一天 */
      let year = new Date(time).getFullYear()
      return year + '-01-01 00:00:00'
    },
    getLastDayOfYear(time) {
      /* 获取某年最后一天 */
      let year = new Date(time).getFullYear()
      let dateString = year + '-12-01 00:00:00'
      let endDay = this.getMonthOfDay(dateString)
      return year + '-12-' + endDay + ' 23:59:59'
    },
    getDayOfYear(time) {
      /* 获取某个日期是当年中的第几天 */
      return Math.ceil(((new Date(time).getTime() - new Date(this.getFirstDayOfYear(time)).getTime()) / 1000) / (24 * 3600))
    },
    getDayOfYearWeek(time) {
      /* 获取某个日期在这一年的第几周 */
      return Math.ceil(this.getDayOfYear(time) / 7)
    },
    datedifferencedays(sDate1, sDate2) { // 获取两个日期之间的时间间隔 sDate1和sDate2默认是2019-6-8或标准时间格式
      let dateSpan = (new Date(sDate2.replace(/-/g, '/'))) - (new Date(sDate1.replace(/-/g, '/')))
      return Math.floor(Math.abs(dateSpan) / (24 * 3600 * 1000))
    },
    CurentTime() { // 返回"2019-04-18 15:49:04"
      let date = new Date()
      return this.formatDate(date, 'YYYY-MM-DD hh:mm:ss')
      // let now = new Date();
      // let year = now.getFullYear(); //年
      // let month = now.getMonth() + 1; //月
      // let day = now.getDate(); //日
      // let hh = now.getHours(); //时
      // let mm = now.getMinutes(); //分
      // let ss = now.getSeconds(); //秒
      // let clock = year + "-";
      // if (month < 10)
      //     clock += "0";
      // clock += month + "-";
      // if (day < 10)
      //     clock += "0";
      // clock += day + " ";
      // if (hh < 10)
      //     clock += "0";
      // clock += hh + ":";
      // if (mm < 10) clock += '0';
      // clock += mm + ":";
      // if (ss < 10) clock += '0';
      // clock += ss;
      // return (clock);
    },
    getDiffYear(nowValue) {
      // 20140102101010
      let reg1 = /^((?!0000)[0-9]{4}((0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-8])|(0[13-9]|1[0-2])(29|30)|(0[13578]|1[02])31)|([0-9]{2}(0[48]|[2468][048]|[13579][26])|(0[48]|[2468][048]|[13579][26])00)0229)(([0-2][0-3])|([0-1][0-9]))[0-5][0-9][0-5][0-9]$/
      // 2015-05-23T03:00:00.000Z
      let reg2 = /^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d.\d\d\dZ$/
      if (reg1.test(nowValue) || reg2.test(nowValue)) {
        let year = 0
        let month = 0
        let day = 0
        if (reg1.test(nowValue)) {
          year = nowValue.substring(0, 4)
          month = nowValue.substring(4, 6)
          day = nowValue.substring(6, 8)
        } else {
          year = nowValue.substring(0, 4)
          month = nowValue.substring(5, 7)
          day = nowValue.substring(8, 10)
        }
        let birthDate = new Date(year + '/' + month + '/' + day)
        let returnAge
        let birthYear = birthDate.getYear()
        let birthMonth = birthDate.getMonth() + 1
        let birthDay = birthDate.getDate()
        d = new Date()
        let nowYear = d.getYear()
        let nowMonth = d.getMonth() + 1
        let nowDay = d.getDate()

        if (nowYear === birthYear) {
          returnAge = 0 // 同年 则为0岁
        } else {
          let ageDiff = nowYear - birthYear // 年之差
          if (ageDiff > 0) {
            if (nowMonth === birthMonth) {
              let dayDiff = nowDay - birthDay // 日之差
              if (dayDiff < 0) {
                returnAge = ageDiff - 1
              } else {
                returnAge = ageDiff
              }
            } else {
              let monthDiff = nowMonth - birthMonth // 月之差
              if (monthDiff < 0) {
                returnAge = ageDiff - 1
              } else {
                returnAge = ageDiff
              }
            }
          } else {
            returnAge = -1 // 返回-1 表示出生日期输入错误 晚于今天
          }
        }
        return returnAge // 返回周岁年龄
      } else {
        return ''
      }
    },
    formatRemainTime(endTime) {
      /* 格式化现在距${endTime}（2030-10-5）的剩余时间. {Date} endTime  @return {String} */
      let startDate = new Date() // 开始时间
      let endDate = new Date(endTime) // 结束时间
      let t = endDate.getTime() - startDate.getTime() // 时间差
      let d = 0
      let h = 0
      let m = 0
      let s = 0
      if (t >= 0) {
        d = Math.floor(t / 1000 / 3600 / 24)
        h = Math.floor(t / 1000 / 60 / 60 % 24)
        m = Math.floor(t / 1000 / 60 % 60)
        s = Math.floor(t / 1000 % 60)
      }
      return (function(dd) {
        return Math.round(dd * 100) / 100
      })(d) + '天 ' + (function(dd) {
        return Math.round(dd * 100) / 100
      })(h) + '小时 ' + (function(dd) {
        return Math.round(dd * 100) / 100
      })(m) + '分钟 ' + (function(dd) {
        return Math.round(dd * 100) / 100
      })(s) + '秒'
    },
    formatFrontTime(startTime) {
      /* 格式化startTime到现在的逝去时间. {Date} startTime  @return {String} */
      let startDate = new Date(startTime) // 开始时间
      let endDate = new Date() // 结束时间
      let t = endDate.getTime() - startDate.getTime() // 时间差
      let d = 0
      let h = 0
      let m = 0
      let s = 0
      if (t >= 0) {
        d = Math.floor(t / 1000 / 3600 / 24)
        h = Math.floor(t / 1000 / 60 / 60 % 24)
        m = Math.floor(t / 1000 / 60 % 60)
        s = Math.floor(t / 1000 % 60)
      }
      return (function(dd) {
        return Math.round(dd * 100) / 100
      })(d) + '天 ' + (function(dd) {
        return Math.round(dd * 100) / 100
      })(h) + '小时 ' + (function(dd) {
        return Math.round(dd * 100) / 100
      })(m) + '分钟 ' + (function(dd) {
        return Math.round(dd * 100) / 100
      })(s) + '秒'
    }
  },
  ArrayFn: { // 数组处理函数
    groupbytype(arr, field) {
      let map = {}
      let dest = []
      for (let i = 0; i < arr.length; i++) {
        let ai = arr[i]
        if (!map[ai[field]]) {
          dest.push({
            Group: ai[field],
            data: [ai]
          })
          map[ai[field]] = ai
        } else {
          for (let j = 0; j < dest.length; j++) {
            let dj = dest[j]
            if (dj[field] === ai[field]) {
              dj.data.push(ai)
              break
            }
          }
        }
      }
      return dest
    },
    arrmovebit(arr, movedirection, movebit) {
      for (let i = 0; i < movebit; i++) {
        if (movedirection === 'right') {
          arr.unshift(arr.pop())
        } else {
          arr.push(arr.shift())
        }
      }
      return arr
    },
    arrunique(arr) {
      /* 数组去重 */
      if (Array.hasOwnProperty('from')) {
        return Array.from(new Set(arr))
      } else if (Array.hasOwnProperty('some')) { // Array.hasOwnProperty('some') || Array.hasOwnProperty("indexOf")
        let tmp = []
        for (let i in arr) {
          if (!(tmp.some(function(currentValue) {
              return currentValue === arr[i]
            }))) {
            // if (tmp.indexOf(arr[i]) === -1) {
            tmp.push(arr[i])
          }
        }
        return tmp
      } else {
        let n = {}
        let r = []
        for (let i = 0; i < arr.length; i++) {
          if (!n[arr[i]]) {
            n[arr[i]] = true
            r.push(arr[i])
          }
        }
        return r
      }
    },
    arrsort(srry, key, isasc) {
      srry.sort(function(a, b) {
        if (isasc === 'asc') {
          if (typeof(a[key]) === 'string' && typeof(b[key]) === 'string') {
            return (a[key].toString()).localeCompare(b[key].toString())
          }
          return a[key] - b[key]
        } else {
          if (typeof(a[key]) === 'string' && typeof(b[key]) === 'string') {
            return (b[key].toString()).localeCompare(a[key].toString())
          }
          return b[key] - a[key]
        }
      })
      return srry
    },
    muchfieldarrsort(sarr, keys) {
      /** sarr：原始数组。 keys:要排序的多个字段,必须为数组 */
      return sarr.sort(compare)

      function compare(a, b) { // 按合并类型递归排序
        let c = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : groupfieldarr[0];
        let i = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
        if (a[keys] === b[keys]) { // 等于的话进行判断是否还有后续字段需要排序，没有则返回0；有则递归进行后续字段排序处理。
          if (i === (keys.length - 1)) { // 没有后续字段
            i = 0
            return 0
          }
          i += 1
          return compare(a, b, keys[i], i) // 递归排序后续字段
        } else if (a[keys] > b[keys]) { // 大于返回1
          return 1
        } else { // 小于返回-1
          return -1
        }
      }
    },
    getNavByKeyValue(arr, value, key = 'code') {
      let curObj = {}

      function rever(data, key, value) {
        data.some((item, index) => {
          if (item[key] === value) {
            curObj = item
            return true
          }
          if (item.children && item.children.length) {
            rever(item.children, key, value)
          }
        })
      }
      rever(arr)
      return curObj
    },
    contains(arr, value) {
      /* 判断一个元素是否在数组中 */
      return arr.some(function(currentValue) {
        return currentValue === value
      })
      // return arr.indexOf(val) !== -1 ? true : false;
    },
    getIndex(arr, obj) { // 根据数据取得再数组中的索引
      // for (let i = 0; i < arr.length; i++) {
      //     if (obj === arr[i]) {
      //         return i;
      //     }
      // }
      // return -1;
      let i = 0
      let bool = arr.some(function(currentValue, index) {
        i = index
        return currentValue === obj
      })
      if (bool) return i
      return -1
    },
    sort(arr, type) {
      /* 数组排序2 */
      /**
       * @param  {arr} 数组
       * @param  {type} 1：从小到大   2：从大到小   3：随机
       * @return {Array}
       */
      type = type || 1
      return arr.sort(function(a, b) {
        switch (type) {
          case 1:
            return a - b
          case 2:
            return b - a
          case 3:
            return Math.random() - 0.5
          default:
            return arr
        }
      })
    },
    union(a, b) {
      /* 求两个集合的并集 */
      let newArr = a.concat(b)
      return this.arrunique(newArr)
    },
    intersect(a, b) {
      /* 求两个集合的交集 */
      let _this = this
      a = this.unique(a)
      return this.map(a, function(o) {
        return _this.contains(b) ? o : null
      })
    },
    max(arr) {
      /* 最大值 */
      return Math.max.apply(null, arr)
    },
    min(arr) {
      /* 最小值 */
      return Math.min.apply(null, arr)
    },
    sum(arr) {
      /* 求和 */
      return arr.reduce(function(pre, cur) {
        return pre + cur
      })
    },
    average(arr) {
      /* 平均值 */
      return this.sum(arr) / arr.length
    }
  },
  StringFn: { // 字符串处理函数
    randomStr(len = 32) { // 生成随机字符串
      const $chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
      const maxPos = $chars.length;
      let str = '';
      for (let i = 0; i < len; i++) {
        str += $chars.charAt(Math.floor(Math.random() * maxPos));
      }
      return str;
    },
    trim(str, type) {
      /* 去除空格 @param  {str} @param  {type} 1-所有空格  2-前后空格  3-前空格 4-后空格 @return {String} */
      type = type || 1
      switch (type) {
        case 1:
          return str.replace(/\s+/g, '')
        case 2:
          return str.replace(/(^\s*)|(\s*$)/g, '')
        case 3:
          return str.replace(/(^\s*)/g, '')
        case 4:
          return str.replace(/(\s*$)/g, '')
        default:
          return str
      }
    },
    interceptString(str, len) { // 字符串截取后面加入...
      if (str.length > len) {
        return str.substring(0, len) + '...'
      } else {
        return str
      }
    },
    toNumber(str) { // 获取字符串中数字
      return str.replace(/\D/g, '')
    },
    toCN(str) { // 保留中文
      let regEx = /[^\u4e00-\u9fa5\uf900-\ufa2d]/g
      return str.replace(regEx, '')
    },
    toInt(str) { // 转成int
      let temp = str.replace(/\D/g, '')
      return isNaN(parseInt(temp)) ? str.toString() : parseInt(temp)
    },
    startsWith(str, tag) { // 是否是以XX开头
      return str.substring(0, tag.length) === tag
    },
    endWith(str, tag) { // 是否已XX结尾
      return str.substring(str.length - tag.length) === tag
    },
    replaceAll(str, from, to) { // 替换全部 将str中的所有from替换为to
      return str.replace(new RegExp(from, 'gm'), to)
    },
    changeCase(str, type) {
      /* type:  1:首字母大写  2：首字母小写  3：大小写转换  4：全部大写  5：全部小写  @return {String} */
      type = type || 4
      switch (type) {
        case 1:
          return str.replace(/\b\w+\b/g, function(word) {
            return word.substring(0, 1).toUpperCase() + word.substring(1).toLowerCase()
          })
        case 2:
          return str.replace(/\b\w+\b/g, function(word) {
            return word.substring(0, 1).toLowerCase() + word.substring(1).toUpperCase()
          })
        case 3:
          return str.split('').map(function(word) {
            if (/[a-z]/.test(word)) {
              return word.toUpperCase()
            } else {
              return word.toLowerCase()
            }
          }).join('')
        case 4:
          return str.toUpperCase()
        case 5:
          return str.toLowerCase()
        default:
          return str
      }
    },
    camelToUnderline(str) { // 小驼峰转下划线
      return str.replace(/\B([A-Z])/g, '_$1').toLowerCase()
    },
    StringBuffer() { // 字符串缓存
      let StringBufferarr = function() {
        this._strs = new Array()
      }
      StringBufferarr.prototype.append = function(str) {
        this._strs.push(str)
      }
      StringBufferarr.prototype.toString = function() {
        return this._strs.join('')
      }
      return new StringBufferarr()
    },
    filterTag(str) {
      /* 过滤html代码(把<>转换字符串) */
      let me = this
      str = me.replaceAll(str, /&/ig, '&amp;')
      str = me.replaceAll(str, /</ig, '&lt;')
      str = me.replaceAll(str, />/ig, '&gt;')
      str = me.replaceAll(str, ' ', '&nbsp;')
      return str
    }
  },
  validateFn: { // 校验
    rule: {
      notEmpty(str) {
        str = str && str.toString()
        /* 是否为空 */
        return !!(str && str.trim() !== '')
      },
      isNumber(str) {
        /* 是否为数字 */
        return /^[0-9]*$/.test(str)
      },
      isZipCode(str) {
        /* 是否为邮编 */
        return /^[0-9]{6}$/.test(str)
      },
      isIdCardNo(str) {
        /* 是否为身份证好 */
        return (/^(\d{6})()?(\d{4})(\d{2})(\d{2})(\d{3})(\w)$/.test(str)) | (/^(\d{6})()?(\d{2})(\d{2})(\d{2})(\d{3})$/.test(str))
      },
      isMobile(str) {
        /* 是否为手机号码 */
        return str.length === 11 && /^1[3|4|5|7|8|9][0-9]\d{4,8}$/.test(str)
      },
      isQQ(str) {
        /* 是否为QQ号码 */
        return /^\s*[.0-9]{5,11}\s*$/.test(str)
      },
      isEmail(str) {
        /* 是否为邮箱 */
        return /\w@\w*\.\w/.test(str)
      },
      isUrl(str) {
        /* 是否为网页url */
        return /(https?|ftp|mms):\/\/([A-z0-9]+[_\-]?[A-z0-9]+\.)*[A-z0-9]+\-?[A-z0-9](\/.*)*\/?/.test(str)
      },
      isPhone(str) {
        /* 是否为固定电话 */
        return /^(0[0-9]{2,3}-?)?([2-9][0-9]{6,7})+(-?[0-9]{1,4})?$/.test(str)
      },
      isTel(str) {
        /* 是否为手机号码或固定电话 */
        let _length = str.length
        let _mobile = /^(1[3|4|5|7|8||9][0-9]{1})+\d{8}$/
        let _tel = /^(0[0-9]{2,3}-?)?([2-9][0-9]{6,7})+(-?[0-9]{1,4})?$/
        return (_tel.test(str) && _length <= 12) || (_mobile.test(str) && _length === 11)
      },
      isIp(str) {
        /* 是否为ip地址 */
        return /^(([1-9]|([1-9]\d)|(1\d\d)|(2([0-4]\d|5[0-5])))\.)(([1-9]|([1-9]\d)|(1\d\d)|(2([0-4]\d|5[0-5])))\.){2}([1-9]|([1-9]\d)|(1\d\d)|(2([0-4]\d|5[0-5])))$/.test(str)
      },
      cnLength(str, params) {
        /* 验证字符串长度是否在params([smax,smin])范围内 */
        let _length = str.length
        let _totalLen = _length
        let smin = 0
        let smax = 0
        if (params instanceof Array) {
          switch (params.length) {
            case 0:
              return false
            case 1:
              smax = parseInt(params[0])
              if (smax === 0 || isNaN(smax)) {
                return false
              }
              break
            default:
              smin = parseInt(params[0])
              smax = parseInt(params[1])
              if (smax === 0 || isNaN(smax) || isNaN(smin)) {
                return false
              }
          }
        } else {
          return false
        }
        for (let i = 0; i < _length; i++) {
          if (str.charCodeAt(i) > 127) {
            _totalLen += 2
          }
        }
        return _totalLen >= smin && _totalLen <= smax
      },
      chineseMax(str, params) {
        /* 验证字符串长度是否在0-params范围内 */
        let _length = str.length
        let smin = 0
        let smax = parseInt(params)
        return _length >= smin && _length <= smax
      },
      charMin(str, params) {
        /* 验证字符串的长度是否大于params */
        return str.length >= parseInt(params)
      },
      cnMax(str, params) {
        /* 验证字符数字是否小于params */
        return Number(str) <= Number(params)
      },
      cnMin(str, params) {
        /* 验证字符数字是否大于params */
        return Number(str) > Number(params)
      },
      userName(str) {
        /* 只允许输入中英文字符，数字和下划线 */
        return /^[a-zA-Z0-9_\u4e00-\u9fa5]+$/.test(str)
      },
      userNameExtend(str) {
        /* 只允许输入中英文字符，数字和下划线,括号  以及 ·.、 */
        return /^[a-zA-Z0-9_\(\)\{\}·.、\[\]\（\）\【\】\u4e00-\u9fa5]+$/.test(str)
      },
      chrnum(str) {
        /* 字母和数字的验证 */
        return /^([a-zA-Z0-9]+)$/.test(str)
      },
      decimal2(str) {
        /* 是否为两位小数 */
        return /^-?\d+\.?\d{0,2}$/.test(str)
      },
      decimal_num(str) {
        /* 是否为数字和小数 */
        return /(^d*.?d*[0-9]+d*$)|(^[0-9]+d*.d*$)/.test(str)
      },
      chinese(str) {
        /* 是否为中文 */
        return /^[\u4e00-\u9fa5]+$/.test(str)
      },
      userPassword(str) {
        /* 密码的验证a-zA-Z0-9 5-17位 */
        return /^[a-zA-Z]\w{5,17}$/.test(str)
      },
      isDefaultPassword(str, params) {
        /* 是否默认密码params(["123456",'111111','111222']) */
        params = params || ["123456", '111111', '111222']
        let isd = false
        for (let strp in params) {
          if (str.toString() === params[strp]) {
            isd = true
          }
        }
        return isd
      },
      isSimplePassword(str) {
        /* 是否简单密码 */
        function isASC(test) {
          for (let i = 1; i < test.length; i++) {
            if (test.charCodeAt(i) !== (test.charCodeAt(i - 1) + 1)) {
              return false
            }
          }
          return true
        }

        function isDESC(test) {
          for (let i = 1; i < test.length; i++) {
            if (test.charCodeAt(i) !== (test.charCodeAt(i - 1) - 1)) {
              return false
            }
          }
          return true
        }

        function isSame(test) {
          for (let i = 1; i < test.length; i++) {
            if (test.charCodeAt(i) !== (test.charCodeAt(i - 1))) {
              return false
            }
          }
          return true
        }
        return !(isASC(str) || isDESC(str) || isSame(str))
      },
      identifier(str) {
        /* 是否是编号 */
        return /^[a-zA-Z0-9_\u4e00-\u9fa5\-]+$/.test(str)
      },
      isPic(str) {
        /* 是否是图片 */
        return /.jpg|.png|.gif|.jpeg$/.test(str.toLowerCase())
      },
      isInteger(str) {
        /* 是否是正整数 */
        return /^[1-9]+[0-9]*$/.test(str)
      },
      isPInt(str) {
        /* 校验正整数 */
        return /^[0-9]*[0-9][0-9]*$/.test(str)
      },
      onlyEn_Num(str) {
        /* 只允许输入英文字符，数字和下划线 */
        return /^\w+$/.test(str)
      },
      onlyCn_En_Num(str) {
        /* 只允许输入中英文字符，数字和下划线 */
        return /^[a-zA-Z0-9_\u4e00-\u9fa5]+$/.test(str)
      },
      onlyCn_En_Num_Point(str) {
        /* 只能包括中英文字母、数字、下划线和中文标点符号 */
        return /^[a-zA-Z0-9_\u4e00-\u9fa5，。“”；！？@、]+$/.test(str)
      },
      onlyCn_En_Num_Point_zhong_ying(str) {
        /* 只能包括中英文字母、数字、下划线和中英文标点符号 */
        return /^[a-zA-Z0-9_\u4e00-\u9fa5，。“”；！？@、,.?!"";]+$/.test(str)
      },
      onlyCn_En_Num_Point_extend(str) {
        /* 只能包括中英文字母、数字、下划线和中文标点符号及部分特殊符号 */
        return /^[a-zA-Z0-9_\u4e00-\u9fa5，。“”；！：？@、\(\)\{\}·.:\[\]\（\）\【\】]+$/.test(str)
      },
      onlyCn_En_Num_Point_return(str) {
        /* 只能包括中英文字母、数字、下划线和中英文标点符号、空格、回车、括号类符号 */
        return /^[a-zA-Z0-9_\u4e00-\u9fa5，,。.“”；"";：·:！!？?@、.\(\)\（\）\[\]\{\}\【\】\n\s]+$/.test(str)
      },
      onlyCn_En_Num_bufen_return(str) {
        /* 只能包括中英文字母、数字、下划线、横杠和中英文标点符号、空格、回车、括号类符号 */
        return /^[a-zA-Z0-9_\u4e00-\u9fa5，,。.“”；‘’''"";：:！!？?@、.<>\-《》\(\)\（\）\[\]\{\}\【\】\n\s]+$/.test(str)
      },
      onlyCn_En_Num_Point_all_extend(str) {
        /* 只能包括中英文字母、数字、下划线、中文标点符号、空格和回车及部分特殊符号 */
        return /^[a-zA-Z0-9_\u4e00-\u9fa5，。“”；：！？@、\(\)\{\}·.\[\]\（\）\【\】\n\s]+$/.test(str)
      },
      onlyNum_Point(str) {
        /* 只能是数字、小数点后两位 */
        return /^(\d)*(\.(\d){1,2})?$/.test(str)
      },
      onlyNum_Point3(str) {
        /* 只能是数字、小数点后两位 */
        return /^(\d)*(\.(\d){0,3})?$/.test(str)
      },
      doubles7(str) {
        /* 是否小于9999999 */
        let par = parseInt(str)
        return par <= 9999999
      },
      doubles5(str) {
        /* 是否小于999 */
        let par = parseInt(str)
        return par <= 999
      },
      onlyNum_Point4(str) {
        /* 是否数字、小数点后四位 */
        return /^(\d)*(\.(\d){0,4})?$/.test(str)
      },
      onlyNum_Point7(str) {
        /* 是否数字、小数点后七位 */
        return /^(\d)*(\.(\d){0,7})?$/.test(str)
      },
      socode(str) {
        /* 是否统一社会信用代码 */
        return /^[0-9A-Z]+$/.test(str)
      },
      onlycar_number_Eng(str) {
        /* 是否为车牌号 */
        return /(^[\u4E00-\u9FA5]{1}[A-Z0-9]{6}$)|(^[A-Z]{2}[A-Z0-9]{2}[A-Z0-9\u4E00-\u9FA5]{1}[A-Z0-9]{4}$)|(^[\u4E00-\u9FA5]{1}[A-Z0-9]{5}[挂学警军港澳]{1}$)|(^[A-Z]{2}[0-9]{5}$)|(^(08|38){1}[A-Z0-9]{4}[A-Z0-9挂学警军港澳]{1}$)|(^[A-Z]{2}[\u4E00-\u9FA5]{1}[A-Z0-9]{4}[A-Z0-9挂学警军港澳]{1}$)/.test(str)
      },
      onlyChNun_Eng(str) {
        /* 是否为英文字母、数字和中文 */
        // return /^[\u4e00-\u9fa5]{1}[A-Z]{1}[A-Z_0-9]{5}$/.test(str);
        return /^(([\u4e00-\u9fa5]|[a-zA-Z0-9])+)$/.test(str)
      }
    },
    validate(type, str, params, callback) {
      // 全局数据或字符校验方法 @params: type:校验规则名 str：校验数据或字符 params:若校验规则中有两个参数则为校验附加参数，否则可以传入回掉函数,回调函数校验通过返回true,否则返回new error(提示)， callback:回掉函数
      // 调用
      // this.$ToolFn.validateFn.validate("isDefaultPassword", "111222",["123456", '111111', '111222'], function (e) {
      //   console.log(e) /* 是否默认密码params(["123456",'111111','111222']) */
      // })
      let validResult = this.rule[type](str, params)
      if (!validResult) {
        typeof params == 'function' && params(new Error(this.promptMsg[type]))
        typeof callback == 'function' && callback(new Error(this.promptMsg[type]))
        validResult = this.promptMsg[type]
      } else {
        typeof params == 'function' && params(true)
        typeof callback == 'function' && callback(true)
      }
      return validResult
    },
    promptMsg: { // 错误信息
      'notEmpty': '不能为空！',
      'isNumber': '只能输入数字！',
      'isZipCode': '邮政编码不正确!',
      'isIdCardNo': '身份证号码格式不正确!',
      'isMobile': '手机号码格式不正确!',
      'isPhone': '电话号码格式不正确!',
      'isTel': '联系电话格式不正确!',
      'isQQ': 'QQ号码格式不正确！',
      'isEmail': 'email格式不正确！',
      'isUrl': '网址格式不正确！',
      'isIp': 'ip地址格式不正确!',
      'cnLength': '您可输入{0}到{1}个字符，中文占3个字符！',
      'chineseMax': '您最多能输入{0}个字!',
      'cnMax': '请输入介于0到{0}之间的数字!',
      'cnMin': '请输入大于{0}的数字!',
      'userName': '只能包括中英文、数字和下划线!',
      'chrnum': '只能输入数字和字母(字符A-Z, a-z, 0-9)！',
      'chinese': '只能输入中文！',
      'userPassword': '以字母开头，长度在6-18之间，只能包含字符、数字或下划线！',
      'isDefaultPassword': '登录密码不能为默认密码！',
      'isSimplePassword': '登录密码太简单！',
      'isPic': '只能是jpg、png、gif、jpeg格式的图片！',
      'isPInt': '只能输入非负整数！',
      'charMin': '至少15位',
      'isInteger': '只能输入正整数！',
      'onlyEn_Num': '只能输入英文，数字和下划线!',
      'onlyCn_En_Num': '只能输入中英文，数字和下划线!',
      'onlyCn_En_Num_Point': '只能输入中英文，数字、下划线和中文标点符号!',
      'onlyCn_En_Num_Point_zhong_ying': '只能输入中英文，数字、下划线和标点符号!',
      'onlyCn_En_Num_Point_extend': '只能输入中英文，数字、下划线和中文标点符号及部分特殊符号!',
      'onlyCn_En_Num_Point_all_extend': '只能包括中英文、数字、下划线、中文标点符号、空格和回车及部分特殊符号',
      'onlyCn_En_Num_Point_return': '只能输入中英文，数字、下划线、中英文标点符号、空格、换行及括号类符号!',
      'orgTreeValid': '您还没有选择用户！',
      'equalTo': '请输入相同的值！',
      'decimal2': '请输入数字，小数点后保留2位！',
      'onlyNum_Point': '只能输入自然数，小数点后两位！',
      'onlyNum_Point3': '只能输入自然数，最多小数点后三位！',
      'onlyNum_Point4': '只能输入自然数，最多小数点后四位！',
      'onlyNum_Point7': '只能输入自然数，最多小数点后七位！',
      'onlycar_number_Eng': '请输入正确的车牌号！',
      'onlyCn_En_Num_bufen_return': '只能输入中英文字符、中英文标点符号、空格以及下划线和中线',
      'decimal_num': '请输入数字或小数',
      'onlyChNun_Eng': '只能输入英文字母、数字和中文！',
      'socode': '统一社会信用代码!',
      'doubles7': '您输入的值的整数部分不能大于9999999，请重新输入！',
      'doubles5': '您输入的值的整数部分不能大于999，请重新输入！'
    }
  },
  pageFn: {
    getPageConfig(data, self) {
      let curNavModule = self.$store.state.curNavModule
      // let curMenuObj = self.$store.state.curMenuObj
      return new Promise((resolve, reject) => {
        self.$http['get']("bisBudget/bgtFbConfig/getFbPageConfig",
          {
            menuguid: curNavModule.guid,
          })
          .then(res => {
            resolve(res)
          }).catch(err => {
            reject(err)
          })
      })
    }
  }
}
