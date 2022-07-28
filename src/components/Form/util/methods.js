// methods   Author:Titans@2396757591@qq.com
/* eslint-disable no-new-func */
/* eslint-disable no-eval */
/* eslint-disable  no-useless-call */
import evalCalcUtil from '../../tool/eval/index.js'
import { defaultRenderers } from '../config/formDefaultConfig.js'
import util from '../tool/util.js'
const initMethods = {
  initCreated() { // 初始化Created
    this.itemChangeTimer = this.debounce(() => { }, 200)
  },
  initMounted() { // 初始化Mounted
    this.initFirst()
  },
  initFirst() { // 组件初始化
    // this.moneyUnit = this.defaultMoneyUnit
    this.initMoneyUnit(this.defaultMoneyUnit)
    this.registFormItemRender(defaultRenderers)
    this.initFormConfig()
    this.initFormItemsConfig()
    this.initFormGloabalConfig()
    // this.registFormItemRender(this.formConfigCp.renderers)
    // this.registRenderers(this.formItemsConfigIn)
    this.initFormValidationConfig()
    this.initFormDataList()
  },
  initMoneyUnit(moneyUnit) {
    this.moneyUnit = moneyUnit
    let self = this
    this.moneyUnitOptions.forEach((item, index) => {
      if (item.value === moneyUnit) {
        self.curSelectMoneyUnitOption = item
      }
    })
    let form = this.$refs.form
    if (!form) {
      return
    }
    form.$forceUpdate()
  },
  initFormConfig() {
    this.formConfigCp = Object.assign({}, this.formConfigCp, this.formConfig)
  },
  initFormItemsConfig(newVal) { // 初始化标格项配置
    this.formItemsConfigIn = this.formItemsConfig
    this.itemsAllMap = this.generateItemsAllMap(this.formItemsConfigIn)
  },
  initFormGloabalConfig(newVal) { // 初始化表格配置
    this.formGloabalConfigIn = Object.assign(
      this.formGloabalConfigIn,
      this.formGloabalConfig
    )
  },
  initFormValidationConfig(newVal) { // 初始化表格校验
    this.formValidationConfigIn = this.formValidationConfig
  },
  initFormDataList(newVal) { // 初始化表单数据
    this.formDataListInit = this.initDefaultFormDataList(this.deepCopy(this.formDataList))
    this.formDataListIn = Object.assign({}, this.formDataList, this.formDataListInit)
    return this.formDataListIn
  },
  initDefaultFormDataList(obj) { // 初始化表格数据
    // Object.keys(this.formDataListIn).forEach(item => {
    //   this.formDataListIn[item] = this.formDataListIn[item] === undefined || this.formDataListIn[item] === null ? '' : this.formDataListIn[item]
    // })
    let self = this
    let moneyInputSwich = self.moneyInputSwich || false
    let moneyUnit = moneyInputSwich ? (self.moneyUnit || 1) : 1
    this.formItemsConfigIn.forEach((item, index) => {
      if (item.field) {
        let render = item.itemRender
        obj[item.field] = typeof obj[item.field] !== 'object' ? (obj[item.field] === undefined ? '' : obj[item.field]) : (obj[item.field] === null ? '' : obj[item.field])
        if (render && render.props && render.props.multiple) {
          if (Array.isArray(obj[item.field])) {
            obj[item.field + '__multiple'] = [...obj[item.field]]
          } else if (typeof obj[item.field] === 'string') {
            obj[item.field + '__multiple'] = obj[item.field].split(',')
          } else if (typeof obj[item.field] === 'number') {
            // obj[item.field] = obj[item.field]
            obj[item.field + '__multiple'] = String(obj[item.field]).split(',')
          } else {
            obj[item.field] = ''
            obj[item.field + '__multiple'] = []
          }
        } else if (render && render.name === '$vxeMoney') {
          obj[item.field + '__moneySwitchinput'] = self.accurateChuFa((obj[item.field] + '').replace(/null|undefined|NaN/ig, ''), moneyUnit) + ''
        } else if (item.field === 'moneyUnit') {
          obj[item.field] = obj[item.field] || this.defaultMoneyUnit
        }
      }
    })
    return obj
  },
  generateItemsAllMap(items, obj = {
    fieldMap: {},
    titleFieldMap: {},
    formulaConfig: {},
    titleMap: {}
  }) {
    // 生成导入view映射数据
    let self = this
    items.forEach((item, index) => {
      if (Array.isArray(item.children) && item.children.length) {
        self.generateItemsAllMap(item.children, obj)
      } else {
        if (item.formula) {
          obj.formulaConfig[item.field] = item.formula
          obj.titleMap[item.title] = item
        }
        if (item.field) {
          obj.fieldMap[item.field] = item
          obj.titleFieldMap[item.title] = item.field
        }
      }
    })
    return obj
  },
  initFormInitGloabalData() { // 废弃
    this.formInitGloabalDataIn = Object.assign(
      {},
      this.formInitGloabalDataCp,
      this.formInitGloabalData
    )
  }
}
const registFn = { // 废弃
  registSingelItemRenderer(item) {
    // 绑定每个数据项渲染器配置
    // let self = this
    // let itemRender = item.itemRender
    // let pullTypes = ['$select', 'select', '$treeinput', '$radio', '$checkbox']
    // if (itemRender) {
    //   if (pullTypes.indexOf(itemRender.name) >= 0) {
    //     if (self.getbasicDataType(itemRender) === 'Object') {
    //       if (!Array.isArray(itemRender.options)) {
    //         let options = self.getbasicDataType(basicConf[item.field]) === 'Object' && basicConf[item.field].options
    //         if (options) {
    //           itemRender.options = options
    //         } else {
    //           let ajaxConf = typeConf[itemRender.name]
    //           if (ajaxConf) {
    //             self['$' + ajaxConf.methods](ajaxConf.url, Object.assign({}, ajaxConf.requestparams, this.formInitGloabalDataCp)).then(res => {
    //               itemRender.options = res
    //             }).catch(e => {
    //             })
    //           } else {
    //             let ajaxConf = pullConf[itemRender.name]
    //             if (ajaxConf) {
    //               self['$' + ajaxConf.methods](ajaxConf.url, Object.assign({}, ajaxConf.requestparams, this.formInitGloabalDataCp)).then(res => {
    //                 itemRender.options = res
    //               }).catch(e => {
    //               })
    //             }
    //           }
    //         }
    //         item['itemRender'] = itemRender
    //       }
    //     }
    //   }
    // } else {
    let formRenderConfig = this.formConfigCp.formRenderConfig
    if (item.field && formRenderConfig[item.field] && !item['itemRender']) {
      item['itemRender'] = formRenderConfig[item.field]
    }
    // }
  },
  registRenderers(arr = []) {
    // 初始化绑定数据项渲染器
    let self = this
    arr.forEach((item, index) => {
      self.registSingelItemRenderer(item)
      if (Array.isArray(item.children) && item.children) {
        self.registRenderers(item.children)
      }
    })
  },
  registFormItemRender(renderers) {
    // 注册渲染器
    for (let i in renderers) {
      this.$VXETable.renderer.add(i, renderers[i])
    }
  }
}
const axiosEvent = {
  $post(url, params, origin) {
    let self = this
    return new Promise((resolve, reject) => {
      self.$http.post(url, {
        params: params
      })
        .then(response => {
          if (response.code === 200) {
            resolve(response.data)
          } else {
            resolve([])
          }
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  $get(url, params, origin) {
    let self = this
    return new Promise((resolve, reject) => {
      self.$http.get(url, {
        params: params
      })
        .then(response => {
          if (response.code === 200) {
            resolve(response.data)
          } else {
            resolve([])
          }
        })
        .catch(error => {
          reject(error)
        })
    })
  }
}
const formOptionFn = {
  itemOption(obj) { // 项其他事件
    this.$emit('itemOption', obj, this)
  },
  itemChange(obj) { // 项改变事件
    if (!this.$refs.form) {
      return
    }
    switch (obj.property) {
      case 'moneyUnit':
        this.moneyUnit = obj.itemValue
        this.initMoneyUnit(this.moneyUnit)
        break
    }
    this.performanCalc(obj.data)
    this.performConstraintAndRerender()
    this.$nextTick(() => {
      this.$emit('itemChange', obj, this)
    })
  },
  getPureFormData(data) {
    let obj = data || this.getFormData()
    Object.keys(obj).forEach((key, ki) => {
      if (key.indexOf('__') >= 0) {
        delete obj[key]
      }
    })
    return obj
  },
  getFormData() { // 获取表单数据
    return this.deepCopy(this.$refs.form.data)
  },
  reset() {
    // 重置表单
    let self = this
    return new Promise((resolve, reject) => {
      self.formDataListIn = Object.assign({}, self.formDataListInit)
      self.$emit('reset', self.formDataListIn, self, this.$refs.form)
      resolve(self.formDataListIn)
    })
  },
  clearValidate(field) { // 手动清除校验状态
    return this.$refs.form.clearValidate(field)
  },
  updateStatus(scope) { // 更新项状态（当使用自定义渲染时可能会用到）
    return this.$refs.form.updateStatus(scope)
  },
  formOptionsFn() { // vxeForm操作
    return this.$refs.form
  },
  toggleCollapse(obj) { // 当折叠按钮被手动点击时会触发该事件 { collapse, data, $event }
    this.$emit('toggleCollapse', obj, self, this.$refs.form)
  }
}
const otherFn = { // 废弃
  onFormSubmit(obj) {
    // 表单提交时会触发该事件 { data, $event }
    // debugger
    let self = this
    this.$emit('onSubmitClick', obj, self, this.$refs.form)
    let axiosDatas = self.formConfigCp.axiosDatas
    typeof axiosDatas.saveData === 'function' && axiosDatas.saveData(obj, self)
    // .then(
    //   saveResult => {
    //     typeof (saveResult) === 'function' && saveResult.call(self)
    //   }
    // ).catch(error => {
    //   console.log(error)
    // })
  },
  submitInvalid(obj) {
    // 表单提交时如果校验不通过会触发该事件 { data, errMap, $event }
    this.$emit('submitInvalid', obj, self, this.$refs.form)
  },
  clearFormData(formData, needClearFieldS) {
    // 清空表单数据
    this.formItemsConfigIn.forEach((item, index) => {
      if ((!needClearFieldS || needClearFieldS.indexOf(item.field) >= 0) && item.field) {
        let render = item.itemRender
        if (item.itemRender.name === '$vxeTree') {
          const { props } = item.itemRender
          let { multiple, showField, isHump } = (props && props.config) || { multiple: false, showField: '', isHump: false }
          if (showField) {
            formData[showField] = ''
          } else {
            formData[item.field + (isHump ? 'Id' : 'id')] = ''
            formData[item.field + (isHump ? 'Code' : 'code')] = ''
            formData[item.field + (isHump ? 'Name' : 'name')] = ''
            if (multiple) {
              formData[item.field + (isHump ? 'Id__multiple' : 'id__multiple')] = []
              formData[item.field + (isHump ? 'Code__multiple' : 'code__multiple')] = []
              formData[item.field + (isHump ? 'Name__multiple' : 'name__multiple')] = []
            }
          }
        } else if (render && render.props && render.props.multiple) {
          if (Array.isArray(formData[item.field])) {
            formData[item.field] = []
          } else {
            formData[item.field] = ''
          }
          formData[item.field + '__multiple'] = []
        } else {
          formData[item.field] = typeof formData[item.field] !== 'object' ? ((formData[item.field] === undefined || isNaN(formData[item.field])) ? '' : formData[item.field]) : (formData[item.field] === null ? '' : formData[item.field])
          // formData[item.field] = (typeof (formData[item.field]) === 'object' && self.getbasicDataType(formData[item.field]) !== 'Null') ? formData[item.field] : (formData[item.field] === null || formData[item.field] === undefined ? '' : formData[item.field])
        }
      }
    })
    return formData
  },
  resetData({ nosetFields }) { // 废弃
    let nosetFieldsCp = Array.isArray(nosetFields) ? nosetFields : []
    let self = this
    Object.keys(self.formDataListIn).forEach((item, index) => {
      if (nosetFieldsCp.indexOf(item) === -1) {
        self.formDataListIn[item] = null
      }
    })
  },
  validItemRules(type, property, val) {
    let self = this
    const { data, editRules } = this
    const errorRules = []
    const syncVailds = []
    if (property && editRules) {
      const rules = self.$XEUtils.get(editRules, property)
      if (rules) {
        const itemValue = self.$XEUtils.isUndefined(val) ? self.$XEUtils.get(data, property) : val
        rules.forEach(rule => {
          if (type === 'all' || !rule.trigger || type === rule.trigger) {
            if (self.$XEUtils.isFunction(rule.validator)) {
              const customValid = rule.validator({
                itemValue,
                rule,
                rules,
                data,
                property,
                $form: this
              })
              if (customValid) {
                if (self.$XEUtils.isError(customValid)) {
                  errorRules.push(self.newRule({ type: 'custom', trigger: rule.trigger, message: customValid.message, rule: self.newRule(rule) }))
                } else if (customValid.catch) {
                  // 如果为异步校验（注：异步校验是并发无序的）
                  syncVailds.push(
                    customValid.catch(e => {
                      errorRules.push(self.newRule({ type: 'custom', trigger: rule.trigger, message: e ? e.message : rule.message, rule: self.newRule(rule) }))
                    })
                  )
                }
              }
            } else {
              const isNumber = rule.type === 'number'
              const numVal = isNumber ? self.$XEUtils.toNumber(itemValue) : self.$XEUtils.getSize(itemValue)
              if (itemValue === null || itemValue === undefined || itemValue === '') {
                if (rule.required) {
                  errorRules.push(self.newRule(rule))
                }
              } else if (
                (isNumber && isNaN(itemValue)) ||
                (!isNaN(rule.min) && numVal < parseFloat(rule.min)) ||
                (!isNaN(rule.max) && numVal > parseFloat(rule.max)) ||
                (rule.pattern && !(rule.pattern.test ? rule.pattern : new RegExp(rule.pattern)).test(itemValue))
              ) {
                errorRules.push(self.newRule(rule))
              }
            }
          }
        })
      }
    }
    return Promise.all(syncVailds).then(() => {
      if (errorRules.length) {
        const rest = { rules: errorRules, rule: errorRules[0] }
        return Promise.reject(rest)
      }
    })
  },
  validate(cb) {
    let self = this
    return new Promise((resolve, reject) => {
      self.$refs.form.validate(cb).then((res) => {
        resolve(res)
      }).catch((errMap) => {
        let errorInfor = []
        self.each(errMap, (item, key) => {
          errorInfor.push(errMap[item][0].rule.$options.message)
        })
        self.$XModal.message({ status: 'error', message: `错误：[${errorInfor[0]}]` })
        reject(errMap)
      })
    })
  }
}
const calculateTool = { // 计算部分
  performanCalc(data) { // 执行计算
    let { formulaConfig } = this.itemsAllMap
    let formulaConfigCp = Object.assign({}, this.calculateConstraintConfigIn.itemFormulaConfig, formulaConfig)
    this.reductionFormula(formulaConfigCp, data || this.getFormData())
  },
  reductionFormula(formulaMap, obj) { // 执行计算
    // objFormulaMap= { "colfield":"{colfield}[运算符]" }
    let formulaMapCp = this.deepCopy(formulaMap)
    let hasCalcFormulaMap = {}
    let i = 0
    let ifDoWhile = true
    try {
      while (ifDoWhile) {
        let formulaMapArr = Object.keys(formulaMapCp)
        if (formulaMapArr.length) {
          for (let cmai = 0; cmai < formulaMapArr.length; cmai++) {
            i++
            let item = formulaMapArr[cmai]
            let formula = formulaMapCp[item]
            let regR = new RegExp('({[a-zA-Z0-9_]*})', 'ig')
            let objsKey = formula.match(regR) === null ? [] : formula.match(regR)
            if (objsKey.length) {
              for (let keyCF in objsKey) {
                let keyC = objsKey[keyCF].replace(/\{|\}/g, '')
                let reg = new RegExp('({' + keyC + '})', 'ig')
                if (obj[keyC] !== undefined && !(hasCalcFormulaMap[keyC] !== undefined || formulaMapCp[keyC])) {
                  formulaMapCp[item] = formula.replace(reg, isNaN(parseFloat(obj[keyC])) ? 0 : parseFloat(obj[keyC]))
                } else if (hasCalcFormulaMap[keyC] !== undefined) {
                  formulaMapCp[item] = formula.replace(reg, hasCalcFormulaMap[keyC])
                } else if (!formulaMapCp[keyC]) {
                  formulaMapCp[item] = formula.replace(reg, 0)
                }
              }
            } else {
              let calcResult = evalCalcUtil.eval(formula)
              hasCalcFormulaMap[item] = calcResult === Infinity || calcResult === -Infinity || isNaN(calcResult) ? '' : calcResult
              delete formulaMapCp[item]
            }
          }
        } else {
          ifDoWhile = false
        }
        if (i === 100000) {
          console.log(formulaMap, hasCalcFormulaMap)
          console.error('请核查公式')
        }
      }
    } catch (e) {
      // console.log(i)
      console.log(formulaMap, hasCalcFormulaMap)
      console.error('请核查公式')
    }
    return Object.assign(obj, hasCalcFormulaMap)
  }
}
const calculateConstraintTool = { // 约束部分
  genarateConstraintMap(constraintConfig, row) {
    // 生成约束map
    this.constrainDataMap = this.genarateRowConstraintMap(this.deepCopy(constraintConfig || {}), row, this.constrainDataMap)
  },
  genarateRowConstraintMap(rowConstraintConfig, row, dataMap) {
    // 生成单条数据约束map
    let self = this
    this.each(rowConstraintConfig, (key, item) => {
      let regR = new RegExp('({[a-zA-Z0-9_]*})', 'ig')
      let rowsKey = rowConstraintConfig[key].match(regR) || []
      rowsKey = [...new Set(rowsKey)]
      if (rowsKey.length) {
        for (let keyC in rowsKey) {
          let reg = new RegExp('(' + rowsKey[keyC] + ')', 'ig')
          let keyF = rowsKey[keyC].replace(/\{|\}/g, '')
          rowConstraintConfig[key] = rowConstraintConfig[key].replace(reg, row[keyF] === null || row[keyF] === undefined ? '' : row[keyF])
        }
      }
      self.parsingRowConstraintConfigToMapData(rowConstraintConfig[key], dataMap)
    })
    return dataMap
  },
  parsingRowConstraintConfigToMapData(rowConstraintConfig, dataMap) {
    // 生成单条数据约束map
    let self = this
    rowConstraintConfig.split('--&&--').forEach((item, index) => {
      let rowConstraintArr = item.split('::')
      dataMap[rowConstraintArr[0]] = dataMap[rowConstraintArr[0]] || {}
      dataMap[rowConstraintArr[0]][rowConstraintArr[1]] = self.parsingRowConstraintConfigToValueData(rowConstraintArr[2], rowConstraintArr[1])
    })
  },
  evalEpression(expression) {
    // 执行表达式
    // eslint-disable-next-line no-new-func
    return new Function('return ' + expression)()
  },
  pasingExpression(expression) {
    let str = ''
    this.each(expression.split('--+--'), (index, item) => {
      if (index === 0) {
        str += 'if(' + item.split('--??--')[0] + '){return "' + item.split('--??--')[1] + '"}'
      } else {
        str += 'else if(' + item.split('--??--')[0] + '){return "' + item.split('--??--')[1] + '"}'
      }
    })
    str += 'else{return ""}'
    return new Function(str)()
  },
  transExpressionToObject(value) {
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
      result[name] = valueArr[i].substring(pos + 1).match(new RegExp('({[a-zA-Z0-9_]*})', 'ig')) ? this.evalEpression(valueArr[i].substring(pos + 1)) : valueArr[i].substring(pos + 1)
    }
    return result
  },
  parsingRowConstraintConfigToValueData(expression, type) {
    // 生成当条
    // type: visible editble clear style value getData
    let value = null
    switch (type) {
      case 'visible':
        value = !!this.evalEpression(expression)
        break
      case 'disabled':
        value = !!this.evalEpression(expression)
        break
      case 'editable':
        value = !!this.evalEpression(expression)
        break
      case 'clear':
        value = !!this.evalEpression(expression)
        break
      case 'value':
        value = this.evalEpression(expression)
        break
      case 'style':
        value = this.transExpressionToObject(this.pasingExpression(expression))
        break
      case 'getData':
        value = {}
        break
    }
    return value
  },
  performConstraintAndRerender() {
    // 执行约束并重新渲染
    this.constrainRowDataMap = {}
    this.genarateConstraintMap(this.calculateConstraintConfigIn.constraintConfig, this.getFormData())
  },
  reRenderForm() {
    // 重新渲染表单
    this.ifRenderForm = false
    this.$nextTick(() => {
      this.ifRenderForm = true
    })
  }
}
export default {
  ...axiosEvent,
  ...util,
  ...formOptionFn,
  ...initMethods,
  ...registFn,
  ...calculateTool,
  ...calculateConstraintTool,
  ...otherFn
}
