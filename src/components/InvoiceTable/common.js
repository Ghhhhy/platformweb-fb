// 各种支付阶段用到的工具类
export let commonFn = {
  transJson(str) {
    if (!str) return
    var params = str.split(',')
    var result = {}
    if (params && params.length > 0) {
      for (var i = 0; i < params.length; i++) {
        var map = params[i].split('=')
        result[map[0]] = map[1]
      }
    }
    return result
  },
  inputOnKeyUp(obj) {
    // 保证只有数字和小数点
    obj = obj.replace(/[^\d.]/g, '')
    // 必须保证第一位为数字而不是.
    obj = obj.replace(/^\./g, '')
    // 保证只有出现一个.而没有多个.
    obj = obj.replace(/\.{2,}/g, '.')
    // 保证.只出现一次，而不能出现两次以上
    obj = obj.replace('.', '$#$').replace(/\./g, '').replace('$#$', '.')
    // 保证小数点后只有两位
    // obj.value = obj.value.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3')
    // 如果第一位是0，第二位不是点，就置为空
    var str = obj
    var len1 = str.substr(0, 1)
    var len2 = str.substr(1, 1)
    if (str.length > 1 && len1 === 0 && len2 !== '.') {
      obj = ''
    }
    // 控制金额位数，最大百亿
    var maxNumber = 99999999999.99
    if (Number(str) > maxNumber) {
      obj = str.substring(0, 11)
    }
    return obj
    // 千分位
    // obj.value = obj.value.replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,')
  },
  /**
   * 转千分位+保留两位小数
   */
  format(val) {
    if (!val) return ''
    val = val + ''
    var d = val.split('.')[1] || '00'
    if (d.length === 1) {
      // 补齐小数点后两位
      d = d + '0'
    }
    const m = val.split('.')[0]
    return m.replace(/\B(?=(\d{3})+\b)/g, '$&,') + '.' + d
  },
  isNumber(num) {
    if (num === undefined) {
      return
    }
    if (isNaN(num) && num.trim() !== '' && num !== null) {
      return true
    } else {
      return false
    }
  },
  // // 千分位转数字
  thousandToNum(str) {
    str = str + ''
    str = str.replace(/,/gi, '')
    return parseFloat(str).toFixed(2)
  },
  /**
   * 用于金额录入框失去焦点后补全小数位 onblur="inputOnBlur(this)" <br>
   * 2019-04-09 by zl
   */
  inputOnBlur(obj) {
    if (obj.value) {
      obj.value = this.format(obj.value)
    }
  },
  /**
   * 生成id
   */
  generatorId() {
    var S4 = function () {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
    }
    return (S4() + S4() + S4() + S4() + S4() + S4() + S4() + S4())
  }
}
