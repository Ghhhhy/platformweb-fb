import Big from '@/utils/big.js'
import columnConfigFallBack from '@/config/configTableHeader/reportConfig'
import parseReport from '@/utils/parseReportConfig.js'

export default {
  data() {
    return {
      param5: {},
      fiscalConfig: null,
      calTool: {}
    }
  },
  computed: {
    curNavModule() {
      // 获取当前菜单信息
      return this.$store.state.curNavModule
    },
    userInfo() {
      // 获取用户信息
      return this.$store.state.userInfo
    }
  },
  methods: {
    initParams5() {
      // 初始化param5
      let param5Str = this.curNavModule.param5
      if (param5Str && param5Str !== '') {
        let param5Strs = param5Str.split(',')
        param5Strs.forEach(s => {
          let ss = s.split('=')
          let key = ss[0]
          let value = ss[1]
          this.param5[key] = value
        })
      }
    },
    getTabButtons(defaultBtn) {
      let self = this
      return new Promise((resolve, reject) => {
        let param = {
          menuGuid: self.curNavModule.guid
        }
        self.handleHttpMethod(self.$http.get('bisConfig/config/interface/status2button', param), true, '加载菜单配置中...').then(res => {
          if (res) {
            let data = res.data
            if (defaultBtn) {
              data.buttons.forEach(item => {
                if (String(item.code) === defaultBtn) {
                  data.curButton = item
                }
              })
            }
            resolve(data)
          } else {
            reject(new Error('状态按钮配置获取失败'))
          }
        })
      })
    },
    // 获取报表配置(前端解析过的)
    // @params {
    //   dicCode: String报表编码,
    //   needAlert: boolean是否需要请求报错提示,
    //   callback: null || function操作报表配置数据的回调函数
    // }
    // @return Promise结构的数据, then的res是一个含有dicInfo、dicCols和isDefaultTable的新报表配置对象
    getDicConfigOrigin(dicCode, callback = null, needAlert = true) {
      let self = this
      return new Promise((resolve, reject) => {
        const params = { dicCode }
        self.handleHttpMethod(self.$http.get('bisConfig/config/report/getBossReportConfigOrigin', params), false, '', needAlert)
          .then(res => {
            if (res) {
              // 将报表的源数据解析成能够被报表组件读取的数据格式
              const newReport = parseReport(res.data)
              // 若有回调，则使用回调函数对新报表数据再次处理
              if (callback) {
                callback(newReport)
              }
              // 返回新报表数据
              resolve(newReport)
            } else {
              // 请求没有返回数据的情况下，使用本地默认报表配置
              const defaultTable = columnConfigFallBack(dicCode)
              if (defaultTable) {
                console.warn(`报表配置[${dicCode}]获取失败，取默认配置`)
                // 加入默认配置的识别符
                defaultTable.isDefaultTable = true
                // 回调函数，对数据额外操作
                if (callback) {
                  callback(defaultTable)
                }
                // 返回新报表
                resolve(defaultTable)
              } else {
                reject(new Error(`报表配置[${dicCode}]获取失败`))
              }
            }
          })
      })
    },
    /**
     * @param {string} dicCode 报表编码
     * @param {object} tableConf 表格额外配置（金额切换开关等）
     * @param {boolean} needAlert 如果查不到配置是否需要报错
     * @param {boolean} fallback 如果查不到配置是否走默认fallback
     * @returns config 配置信息
     */
    getDicConfig(dicCode, tableConf = {}, needAlert = true, fallback = false) {
      let self = this
      return new Promise((resolve, reject) => {
        let params = {
          dicCode
        }
        self.handleHttpMethod(self.$http.get('bisConfig/config/report/getBossReportConfig', params), false, '', needAlert).then(res => {
          if (res) {
            if (res.data.extendAttrs) {
              tableConf.defaultMoneyUnit = parseInt(res.data.extendAttrs.defaultMoneyUnit || '10000')
              tableConf.disabledMoneyConversion = (res.data.extendAttrs.disabledMoneyConversion || 'false') === 'true'
              if (res.data.extendAttrs.moneyUnitOptions && res.data.extendAttrs.moneyUnitOptions === 'true') {
                let moneyUnitOptions =
                [
                  {
                    value: 1,
                    label: '元',
                    inputDigits: `${Number((res.data.extendAttrs.inputDigits || '2'))}`,
                    viewDigits: `${Number((res.data.extendAttrs.viewDigits || '2'))}`
                  },
                  {
                    value: 10000,
                    label: '万元',
                    inputDigits: `${Number((res.data.extendAttrs.inputDigits10000 || '2'))}`,
                    viewDigits: `${Number((res.data.extendAttrs.viewDigits10000 || '2'))}`
                  }
                ]
                tableConf.moneyUnitOptions = moneyUnitOptions
              }
            }
            resolve(res.data)
          } else {
            if (fallback) {
              let fallbackData = columnConfigFallBack(dicCode)
              if (fallbackData) {
                tableConf.defaultMoneyUnit = parseInt(fallbackData.extendAttrs?.defaultMoneyUnit || '10000')
                tableConf.disabledMoneyConversion = (fallbackData.extendAttrs?.disabledMoneyConversion || 'false') === 'true'
                console.warn(`报表配置[${dicCode}]获取失败，取默认配置成功`)
                fallbackData.isFallBackData = true
                resolve(fallbackData)
              } else {
                console.error(`报表配置[${dicCode}]获取失败，取默认配置失败`)
                reject(new Error(`报表配置[${dicCode}]获取失败`))
              }
            } else {
              console.error(`报表配置[${dicCode}]获取失败，且不取默认配置`)
              reject(new Error(`报表配置[${dicCode}]获取失败`))
            }
          }
        })
      })
    },
    getProSourceList(proCode) {
      let self = this
      return new Promise((resolve, reject) => {
        if (proCode) {
          let params = { proCode }
          self.handleHttpMethod(self.$http.get('bisBudget/depBudget/bgtTraRec/bgtTraResByProId', params)).then(res => {
            if (res) {
              resolve(res.data)
            } else {
              reject(new Error(`项目来源[${proCode}]获取失败`))
            }
          })
        }
      })
    },
    handleHttpMethod(promise, needLoading = false, message = '正在请求中，请稍候...', needAlert = true) {
      let loading = {
        close: () => { }
      }
      if (needLoading) {
        loading = this.$loading({
          lock: true,
          text: message || '正在请求中',
          spinner: 'ri-loader-4-line roll',
          background: 'rgba(0, 0, 0, 0.7)'
        })
      }
      return new Promise((resolve, reject) => {
        promise.then(res => {
          if (res) {
            if (res.code === '100000') {
              resolve({ data: res.data })
            } else {
              if (needAlert) {
                if (res.code === 0) {
                  if (res.errorInfor.response.status === 404) {
                    this.$XModal.message({ status: 'error', message: `404 NOT FOUND [${res.errorInfor.response.config.url}]` })
                  } else {
                    let message = res.errorInfor.response.data.msg || res.errorInfor.response.data.message
                    this.$XModal.message({ status: 'error', message: message })
                  }
                } else if (res.msg) {
                  this.$XModal.message({ status: 'error', message: `错误：[${res.code}-${res.msg}]`, duration: 3980 })
                } else if (res.message) {
                  if (res.message === '系统异常(网关异常)') {
                    message = false
                    if (res.data.includes('Unable to find instance')) {
                      message = '-无法找到应用服务实例-' + res.data.match('.*Unable to find instance for (.*)')[1]
                    }
                    this.$XModal.message({ status: 'error', message: `错误：[${res.code}-${res.message}${message || ''}]`, duration: 3980 })
                  } else {
                    this.$XModal.message({ status: 'error', message: `错误：[${res.code}-${res.message}]`, duration: 3980 })
                  }
                } else {
                  this.$XModal.message({ status: 'error', message: '未知错误', duration: 3980 })
                }
              }
            }
          } else {
            this.$XModal.message({ status: 'error', message: '服务错误，请查看日志', duration: 3980 })
            console.log(res)
          }
          loading.close()
          resolve(false)
        }).catch(err => {
          loading.close()
          this.$XModal.message({ status: 'error', message: '网络连接失败，或前端逻辑错误。请查看日志', duration: 3980 })
          console.log(err)
          resolve(false)
        })
      })
    },
    isBlank(value) {
      return (value === undefined || value === null || value === '')
    },
    initFiscalConfig() {
      let self = this
      return new Promise((resolve, reject) => {
        self.fiscalConfig = null
        self.$ToolFn.pageFn.getPageConfig({}, this).then((res) => {
          if (res) {
            self.fiscalConfig = res.data
          }
          resolve()
        }).catch(err => {
          console.log(err)
          resolve()
        })
      })
    },
    deepCopy(obj, cache = []) {
      if (obj === null || typeof obj !== 'object') {
        return obj
      }
      const objType = Object.prototype.toString.call(obj).slice(8, -1)
      // 考虑 正则对象的copy
      if (objType === 'RegExp') {
        return new RegExp(obj)
      }
      // 考虑 Date 实例 copy
      if (objType === 'Date') {
        return new Date(obj)
      }
      // 考虑 Error 实例 copy
      if (objType === 'Error') {
        return new Error(obj)
      }
      const hit = cache.filter((c) => c.original === obj)[0]
      if (hit) {
        return hit.copy
      }
      const copy = Array.isArray(obj) ? [] : {}
      cache.push({ original: obj, copy })
      Object.keys(obj).forEach((key) => {
        copy[key] = this.deepCopy(obj[key], cache)
      })
      return copy
    },
    getUuid(hexDigits = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz') { // 获取mapid
      let s = []
      for (let i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
      }
      s[14] = '4'
      s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1)
      s[8] = s[13] = s[18] = s[23] = ''
      let uuid = s.join('')
      return uuid
    }
  },
  created() {
    this.initParams5()
    this.calTool = {
      plus: function (num1, num2) { // 精确加法
        num1 = this.isNumber(num1) ? num1 : 0
        num2 = this.isNumber(num2) ? num2 : 0
        let BigNumA = new Big(num1)
        let BigNumB = new Big(num2)
        return BigNumA.plus(BigNumB).toNumber()
      },
      minus: function (num1, num2) { // 精确减法
        num1 = this.isNumber(num1) ? num1 : 0
        num2 = this.isNumber(num2) ? num2 : 0
        let BigNumA = new Big(num1)
        let BigNumB = new Big(num2)
        return BigNumA.minus(BigNumB).toNumber()
      },
      times: function (num1, num2) { // 精确乘法
        num1 = this.isNumber(num1) ? num1 : 0
        num2 = this.isNumber(num2) ? num2 : 0
        let BigNumA = new Big(num1)
        let BigNumB = new Big(num2)
        return BigNumA.times(BigNumB).toNumber()
      },
      div: function (num1, num2) { // 精确除法
        num1 = this.isNumber(num1) ? num1 : 0
        num2 = this.isNumber(num2) ? num2 : 1
        let BigNumA = new Big(num1)
        let BigNumB = new Big(num2)
        return BigNumA.div(BigNumB).toNumber()
      },
      isNumber(str) {
        /* 是否为数字 */
        return /^(-?\d+)(\.\d+)?$/.test(str)
      }
    }
  }
}
