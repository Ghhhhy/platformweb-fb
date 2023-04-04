// methods   Author:Titans@2396757591@qq.com
/* eslint-disable no-new-func */
/* eslint-disable no-eval */
/* eslint-disable  no-useless-call */
import util from '../tool/util.js'
import EvalCall from '../../../tools/Eval.js'
// import { defaultRenderers } from '../config/formDefaultConfig.js'

const initMethods = {
  initCreated() { // 初始化Created
    this.itemChangeTimer = this.debounce(200)
  },
  initMounted() { // 初始化Mounted
    this.initFirst()
  },
  initFirst() { // 组件初始化
    this.initMoneyUnit(this.defaultMoneyUnit)
    // this.initFormInitGloabalData()
    this.initFormConfig() // 废弃
    this.initFormItemsConfig()
    this.initFormGloabalConfig()
    // this.registFormItemRender(defaultRenderers)
    this.registFormItemRender(this.formConfigCp.renderers)
    this.registRenderers(this.formItemsConfigIn)
    this.initCalculateConstraintConfig()
    this.initFormValidationConfig()
    this.initFormDataList()
  },
  initCalculateConstraintConfig() {
    // 初始化计算和约束配置
    this.calculateConstraintConfigIn = this.deepAssign({}, this.calculateConstraintConfigIn, this.calculateConstraintConfig)
    this.constrainDataMap = {}
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
    this.formConfigCp = this.deepAssign({}, this.formConfigCp, this.formConfig)
  },
  initFormItemsConfig(newVal) { // 初始化标格项配置
    this.formItemsConfigIn = this.formItemsConfig
    this.itemsAllMap = this.generateItemsAllMap(this.formItemsConfigIn)
  },
  initFormGloabalConfig(newVal) { // 初始化表格配置
    this.formGloabalConfigIn = this.deepAssign(
      this.formGloabalConfigIn,
      this.formGloabalConfig
    )
  },
  initFormValidationConfig(newVal) { // 初始化表格校验
    this.formValidationConfigIn = this.formValidationConfig
  },
  initFormDataList(newVal) { // 初始化表单数据
    this.formDataListInit = this.initDefaultFormDataList(this.deepCopy(this.formDataList))
    let formDataListIn = this.deepAssign({}, this.formDataList, this.formDataListInit)
    this.performanCalc(formDataListIn)
    this.formDataListIn = formDataListIn
    this.formDataBeforeChange = this.deepCopy(this.formDataListIn)
    this.$nextTick(() => {
      this.performConstraintAndRerender({ data: this.formDataListIn })
    })
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
        if (render && ((render.props && render.props.multiple) || render.name === '$vxeCheckbox')) {
          if (Array.isArray(obj[item.field])) {
            obj[item.field + '__multiple'] = [...obj[item.field]]
          } else if (typeof obj[item.field] === 'string') {
            obj[item.field + '__multiple'] = obj[item.field].split(',')
          } else if (typeof obj[item.field] === 'number') {
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
  generateItemsAllMap(items, obj = { // 生成列配置数据映射
    fieldMap: {},
    titleFieldMap: {},
    formulaConfig: {},
    titleMap: {},
    constraintConfig: {}
  }) {
    let self = this
    items.forEach((item, index) => {
      if (Array.isArray(item.children) && item.children.length) {
        self.generateItemsAllMap(item.children, obj)
      } else {
        if (item.title) {
          obj.titleMap[item.title] = item
        }
        if (item.field) {
          if (item.formula) {
            obj.formulaConfig[item.field] = item.formula
          }
          if (item.constraintExp) { // 获取表单项约束配置constraintExp
            obj.constraintConfig[item.field] = item.constraintExp
          }
          obj.fieldMap[item.field] = item
          obj.titleFieldMap[item.title] = item.field
        }
      }
    })
    return obj
  },
  initFormInitGloabalData() { // 初始化所有配置
    this.formInitGloabalDataIn = this.deepAssign(
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
const formOptionFn = {
  itemOption(obj) { // 项其他事件
    this.$emit('itemOption', obj, this)
  },
  itemChange(obj) { // 项改变事件
    // this.$refs.form.$el.children.forEach((item) => {
    //   if (item.getElementsByClassName('vxe-form--item-title-label').length && item.getElementsByClassName('vxe-form--item-title-label')[0].textContent === '预算单位') {
    //     if (item.getElementsByClassName('vxe-input--inner').length) {
    //       item.getElementsByClassName('vxe-input--inner')[0].style.backgroundColor = '#e00'
    //       item.getElementsByClassName('vxe-input--inner')[0].style.color = '#fff'
    //     }
    //   }
    // })
    const { enabled, itemFormulaConfig, constraintConfig } = this.calculateConstraintConfigIn
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
    if (obj.data[obj.property] !== this.formDataBeforeChange[[obj.property]] && (enabled && Object.keys(itemFormulaConfig).length && Object.keys(constraintConfig).length)) {
      this.performConstraintAndRerender(obj).then(() => {
        // this.$refs.form.$forceUpdate()
        this.reRenderForm()
        this.$nextTick(() => {
          this.formDataBeforeChange = this.deepCopy(obj.data)
          this.$emit('itemChange', obj, this)
        })
      })
    } else {
      this.$nextTick(() => {
        this.$emit('itemChange', obj, this)
      })
    }
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
        self.$message({
          showClose: true,
          dangerouslyUseHTMLString: true,
          message: `<strong class="cred f14">${errorInfor.join('</br>')}</strong>`
        })
        reject(errMap)
      })
    })
  }
}
const calculateTool = { // 计算部分
  performanCalc(data) { // 执行计算
    let { enabled, enabledType, itemFormulaConfig } = this.calculateConstraintConfigIn
    if (enabled && enabledType.performFormula) {
      let { formulaConfig } = this.itemsAllMap
      let formulaConfigCp = {}
      if (this.isEmptyObj(itemFormulaConfig)) { // 是否存在配置约束项目，如果有以配置为主，否则以项公式为主
        formulaConfigCp = Object.assign({}, this.calculateConstraintConfigIn.itemFormulaConfig, formulaConfig)
      }
      this.reductionFormula(formulaConfigCp, data || this.getFormData())
    }
  },
  reductionFormula(formulaMap, obj) { // 执行计算
    // objFormulaMap= { "colfield":"{colfield}[运算符]" }
    // let formulaMapCp = this.deepCopy(formulaMap)
    let formulaMapCp = this.replaceExpressionAll(formulaMap, obj, 'number', true)
    let hasCalcFormulaMap = {}

    try {
      // let i = 0
      // let ifDoWhile = true
      // while (ifDoWhile) {
      //   let formulaMapArr = Object.keys(formulaMapCp)
      //   if (formulaMapArr.length) {
      //     for (let cmai = 0; cmai < formulaMapArr.length; cmai++) {
      //       i++
      //       let item = formulaMapArr[cmai]
      //       let formula = formulaMapCp[item]
      //       let regR = new RegExp('({[a-zA-Z0-9_]*})', 'ig')
      //       let objsKey = formula.match(regR) === null ? [] : formula.match(regR)
      //       if (objsKey.length) {
      //         for (let keyCF in objsKey) {
      //           let keyC = objsKey[keyCF].replace(/\{|\}/g, '')
      //           let reg = new RegExp('({' + keyC + '})', 'ig')
      //           if (obj[keyC] !== undefined && !(hasCalcFormulaMap[keyC] !== undefined || formulaMapCp[keyC])) {
      //             formulaMapCp[item] = formula.replace(reg, isNaN(parseFloat(obj[keyC])) ? 0 : parseFloat(obj[keyC]))
      //           } else if (hasCalcFormulaMap[keyC] !== undefined) {
      //             formulaMapCp[item] = formula.replace(reg, hasCalcFormulaMap[keyC])
      //           } else if (!formulaMapCp[keyC]) {
      //             formulaMapCp[item] = formula.replace(reg, 0)
      //           }
      //         }
      //       } else {
      //         let calcResult = Eval.excu(formula)
      //         hasCalcFormulaMap[item] = calcResult === Infinity || calcResult === -Infinity || isNaN(calcResult) ? '' : util.accurateFixed(calcResult, 2)
      //         delete formulaMapCp[item]
      //       }
      //     }
      //   } else {
      //     ifDoWhile = false
      //   }
      //   if (i === 100000) {
      //     console.log(formulaMap, hasCalcFormulaMap)
      //     console.error('请核查公式')
      //   }
      // }
      Object.keys(formulaMapCp).forEach((item) => {
        let calcResult = EvalCall.exec(formulaMapCp[item])
        hasCalcFormulaMap[item] = calcResult === Infinity || calcResult === -Infinity || isNaN(calcResult) ? '' : util.accurateFixed(calcResult, 2)
      })
    } catch (e) {
      // console.log(i)
      console.log(formulaMap, hasCalcFormulaMap)
      console.error('请核查公式')
    }
    return Object.assign(obj, hasCalcFormulaMap)
  }
}
const calculateConstraintTool = { // 约束部分
  performConstraintAndRerender({ data, property }) {
    // 执行约束并重新渲染
    let self = this
    let { constraintConfig } = this.itemsAllMap
    if (this.isEmptyObj(this.calculateConstraintConfigIn.constraintConfig)) { // calculateConstraintConfig是否存在配置约束项目，如果有以配置为主，否则以表单项配置的约束为主
      Object.assign(this.calculateConstraintConfigIn.constraintConfig, constraintConfig)
    }
    this.constrainDataMap = {}
    let { enabled, enabledType } = this.calculateConstraintConfigIn
    if (enabled && enabledType.performConstraint) { // 是否执行约束
      return new Promise((resolve, reject) => {
        if ((!property && enabledType.initPerformConstraint) || property) {
          self.genarateConstraintMap({ constraintConfig: this.deepCopy(self.calculateConstraintConfigIn.constraintConfig || {}), data, dataMap: self.constrainDataMap }, property)
          self.updatedDataAfterConstraint({ data: data, constrainDataMap: self.constrainDataMap, itemsAllMap: self.itemsAllMap })
        }
        resolve(data)
      })
    } else {
      return new Promise((resolve, reject) => {
        resolve(data)
      })
    }
  },
  genarateConstraintMap({ constraintConfig, data, dataMap }, property) {
    // 生成约束map
    if (property) {
      if (constraintConfig[property]) {
        //  this.parsingConstraintConfigSing({ constraintConfig, itemConstraintConfig: constraintConfig[property], data, dataMap })
        this.parsingConstraintConfigToMapData({ constraintConfig, itemConstraintConfig: this.parseConditions(constraintConfig[property], data), data, dataMap })
      }
    } else {
      this.constrainDataMap = this.genarateDataConstraintMap({ constraintConfig, data, dataMap })
      console.log(this.constrainDataMap)
    }
  },
  genarateDataConstraintMap({ constraintConfig, data, dataMap }) {
    // 生成单条数据约束map
    let self = this
    this.each(constraintConfig, (key, item) => {
      // self.parsingConstraintConfigSing({ constraintConfig, itemConstraintConfig: constraintConfig[key], data, dataMap })
      self.parsingConstraintConfigToMapData({ constraintConfig, itemConstraintConfig: this.parseConditions(constraintConfig[key], data), data, dataMap })
    })
    return dataMap
  },
  parsingConstraintConfigSing({ constraintConfig, itemConstraintConfig, data, dataMap }) { // 将单个约束的值替换为具体的值参与约束执行  废弃
    let self = this
    // let regR = new RegExp('({[a-zA-Z0-9_]*})', 'ig')
    // let datasKey = itemConstraintConfig.match(regR) || []
    // datasKey = Array.from(new Set(datasKey))
    // if (datasKey.length) {
    //   for (let keyC in datasKey) {
    //     let reg = new RegExp('(' + datasKey[keyC] + ')', 'ig')
    //     let keyF = datasKey[keyC].replace(/\{|\}/g, '')
    //     itemConstraintConfig = itemConstraintConfig.replace(reg, data[keyF] === null || data[keyF] === undefined || data[keyF] === '' ? '\'0\'' : ('\'' + data[keyF] + '\''))
    //   }
    // }
    self.parsingConstraintConfigToMapData({ constraintConfig, itemConstraintConfig: this.parseConditions(itemConstraintConfig, data), data, dataMap })
  },
  parsingConstraintConfigToMapData({ constraintConfig, itemConstraintConfig, data, dataMap }) {
    // 生成单条数据约束map
    let self = this
    itemConstraintConfig.split('--&&--').forEach((item, index) => {
      let dataConstraintArr = item.split('::')
      dataMap[dataConstraintArr[0]] = dataMap[dataConstraintArr[0]] || {}
      dataMap[dataConstraintArr[0]][dataConstraintArr[1]] = self.parsingConstraintConfigToValueData(dataConstraintArr[2], dataConstraintArr[1])
      if (constraintConfig[dataConstraintArr[0]] && (dataConstraintArr[1] === 'clear' || dataConstraintArr[1] === 'value')) {
        if (dataConstraintArr[1] === 'clear') {
          data[dataConstraintArr[0]] = ''
        } else if (dataConstraintArr[1] === 'value') {
          data[dataConstraintArr[0]] = dataMap[dataConstraintArr[0]][dataConstraintArr[1]]
        } else {
        }
        // self.parsingConstraintConfigSing({ constraintConfig, itemConstraintConfig: constraintConfig[dataConstraintArr[0]], data, dataMap })
        self.parsingConstraintConfigToMapData({ constraintConfig, itemConstraintConfig: this.parseConditions(constraintConfig[dataConstraintArr[0]], data), data, dataMap })
      }
    })
  },
  evalEpression(expression) {
    // 执行表达式
    // eslint-disable-next-line no-new-func
    try {
      return this.$macroFn.RUN(expression)
    } catch (e) {
      console.error(e)
    }
  },
  // pasingExpression(expression) {
  //   let str = ''
  //   this.each(expression.split('--+--'), (index, item) => {
  //     if (index === 0) {
  //       str += 'if(' + item.split('--??--')[0] + '){return "' + item.split('--??--')[1] + '"}'
  //     } else {
  //       str += 'else if(' + item.split('--??--')[0] + '){return "' + item.split('--??--')[1] + '"}'
  //     }
  //   })
  //   str += 'else{return ""}'
  //   return new Function(str)()
  // },
  transExpressionToObject(value) {
    // 获取全部参数,并转换成json对象
    try {
      let valueArr = value.split('&')
      let len = valueArr.length
      let result = {}
      for (let i = 0; i < len; i++) {
        let pos = valueArr[i].indexOf('=')
        if (pos === -1) {
          continue
        }
        let name = valueArr[i].substring(0, pos)
        // eslint-disable-next-line no-useless-escape
        result[name] = valueArr[i].substring(pos + 1).match(new RegExp('({[a-zA-Z0-9_:\$]*})', 'ig')) ? this.evalEpression(valueArr[i].substring(pos + 1)) : valueArr[i].substring(pos + 1)
      }
      return result
    } catch (e) {
      console.error(e)
      return {}
    }
  },
  parsingConstraintConfigToValueData(expression, type) {
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
        //  value = this.transExpressionToObject(this.evalEpression(expression))
        value = this.evalEpression(expression)
        break
      case 'getData':
        value = {}
        break
      case 'queryparams':
        value = this.evalEpression(expression)
        break
      case 'options':
        value = this.evalEpression(expression)
        break
    }
    return value
  },
  updatedDataAfterConstraint({ data, constrainDataMap, itemsAllMap }) { // 更新表格数据
    let self = this
    let { fieldMap } = itemsAllMap
    self.each(constrainDataMap, (itemkey, item) => {
      if (item.value !== undefined) {
        data[itemkey] = item.value
      } else if (item.clear) {
        data[itemkey] = ''
      } else {
      }
      if (item.editable !== undefined && fieldMap[itemkey]) {
        let render = fieldMap[itemkey].itemRender
        if (render) {
          render.props = render.props || {}
          render.props.editable = item.editable
        }
      }
      if (item.disabled !== undefined && fieldMap[itemkey]) {
        let render = fieldMap[itemkey].itemRender
        if (render) {
          render.props = render.props || {}
          render.props.disabled = item.disabled
        }
      }
      if (item.visible !== undefined && fieldMap[itemkey]) {
        fieldMap[itemkey].visible = item.visible
      }
      if (Array.isArray(item.options) && fieldMap[itemkey].itemRender) {
        fieldMap[itemkey].itemRender.options = item.options
      }
      if (item.queryparams instanceof Object && fieldMap[itemkey].itemRender && fieldMap[itemkey].props) {
        fieldMap[itemkey].prop.queryparams = Object.assign(fieldMap[itemkey].prop.queryparams, item.queryparams)
      }
    })
    return data
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
  ...util,
  ...formOptionFn,
  ...initMethods,
  ...registFn,
  ...calculateTool,
  ...calculateConstraintTool,
  ...otherFn
}
