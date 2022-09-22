// methods   Author:Titans@2396757591@qq.com
/* eslint-disable no-eval */
import { tableColumns, defaultRenderers, defaultFormatters } from '../config/tableDefaultConfig'
import FindText from '../tool/find'
import formatters from './formatter'
const util = {
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
    return str.replace(/(\w*)-(\w*)/g, function($1, $2, $3) {
      return $2 + $3[0].toUpperCase() + $3.slice(1)
    })
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
  isObj(x) {
    let type = typeof x
    return x !== null && (type === 'object' || type === 'function')
  },
  toObject(val) {
    if (val === null || val === undefined) {
      throw new TypeError('Cannot convert undefined or null to object')
    }

    return Object(val)
  },
  assignKey(to, from, key) {
    let self = this
    let hasOwnProperty = Object.prototype.hasOwnProperty
    let val = from[key]
    if (val === undefined || val === null) {
      return
    }
    if (hasOwnProperty.call(to, key)) {
      if (to[key] === undefined || to[key] === null) {
        throw new TypeError('Cannot convert undefined or null to object (' + key + ')')
      }
    }
    if (!hasOwnProperty.call(to, key) || !self.isObj(val)) {
      to[key] = val
    } else {
      to[key] = self.assign(Object(to[key]), from[key])
    }
  },
  assign(to, from) {
    let self = this
    let propIsEnumerable = Object.prototype.propertyIsEnumerable
    if (to === from) {
      return to
    }
    from = Object(from)
    for (let key in from) {
      if (hasOwnProperty.call(from, key)) {
        self.assignKey(to, from, key)
      }
    }
    if (Object.getOwnPropertySymbols) {
      let symbols = Object.getOwnPropertySymbols(from)
      for (let i = 0; i < symbols.length; i++) {
        if (propIsEnumerable.call(from, symbols[i])) {
          self.assignKey(to, from, symbols[i])
        }
      }
    }
    return to
  },
  deepAssign(target) {
    // 深度合并
    // deepAssign({ a: { b: 0 } }, { a: { b: 1, c: 2 } }, { a: { c: 3 } })
    let self = this
    target = self.toObject(target)
    for (let s = 1; s < arguments.length; s++) {
      self.assign(target, arguments[s])
    }
    return target
  },
  setMoneyUnitCp(Unitlevel, oldUnitlevel) {
    // 设置金额单位 废弃
    if (Unitlevel === '') {
      return
    }
    let xGrid = this.$refs.xGrid
    if (!xGrid) {
      return
    }
    // let fullData = this.getData()
    let fullData = xGrid.getTableData().fullData
    let fullDataCp = Object.freeze(JSON.parse(JSON.stringify(fullData)))
    let conlums = xGrid.getTableColumn().fullColumn
    fullData.forEach((row, rowIndex) => {
      conlums.forEach((column, conlumIndex) => {
        if (column.own.fieldType) {
          let value = (typeof (row[column.own.field]) === 'number' || typeof (row[column.own.field]) === 'string') ? parseFloat(row[column.own.field].toString().split(',').join('')) : 0
          console.log('处理前', value)
          value = isNaN(value) ? 0 : value
          value = value * oldUnitlevel / Unitlevel
          console.log('处理前', value)
          // eslint-disable-next-line no-useless-escape
          row[column.own.field] = parseFloat(value.toFixed(2))
          row[column.own.field] = Number(row[column.own.field].toFixed(2)).toLocaleString()
        }
      })
    })
    console.log(fullData, conlums, fullDataCp)
    xGrid.reloadData(fullData).then().catch()
  },
  transformMoneyByUnit(data, conlums, type = 'big', unit, rendererList = ['$moneyRender']) {
    // 循环转化金额数据
    let self = this
    let dataCp = [...data]
    console.log(dataCp)
    dataCp.forEach((row, rowIndex) => {
      self.transformRowMoneyByUnit(row, conlums, type, unit, rendererList)
    })
    return dataCp
  },
  transformRowMoneyByUnit(row, conlums, type, unit, rendererList) {
    // 递归转化单条数据
    let self = this
    conlums.forEach((conlum, conlumIndex) => {
      let itemRender = conlum.cellRender || conlum.editRender || conlum.contentRender
      if (itemRender && rendererList.indexOf(itemRender.name) >= 0 && !conlum.children) {
        if (type === 'big') {
          row[conlum.field] = (parseFloat(row[conlum.field]) / unit).toFixed(2)
        } else {
          row[conlum.field] = (parseFloat(row[conlum.field]) * unit).toFixed(2)
        }
      }
      if (Array.isArray(conlum.children) && conlum.children.length) {
        self.transformRowMoneyByUnit(row, conlum.children, type, unit, rendererList)
      }
    })
  }
}
const sortMethos = {
  arrSortString({ $table, data, column, property, order }) {
    // 字符 排序
    data.sort(function (a, b) {
      if (!(a[property] !== undefined && b[property] !== undefined)) {
        if (order === 'asc') {
          return true
        } else {
          return false
        }
      }
      if (order === 'asc') {
        return (a[property].toString()).localeCompare(b[property].toString())
      } else {
        return (b[property].toString()).localeCompare(a[property].toString())
      }
    })
    return data
  },
  arrSortNumber({ $table, data, column, property, order }) {
    // 数字 排序
    data.sort(function (a, b) {
      if (!(a[property] !== undefined && b[property] !== undefined)) {
        if (order === 'asc') {
          return true
        } else {
          return false
        }
      }
      if (order === 'asc') {
        return a[property] - b[property]
      } else {
        return b[property] - a[property]
      }
    })
    return data
  },
  arrSortGloabal({ $table, data, column, property, order }) {
    // 通用 排序
    data.sort(function (a, b) {
      if (!(a[property] !== undefined && b[property] !== undefined)) {
        if (order === 'asc') {
          return true
        } else {
          return false
        }
      }
      if (order === 'asc') {
        if (isNaN(Number(a[property]))) {
          return (a[property].toString()).localeCompare(b[property].toString())
        }
        return a[property] - b[property]
      } else {
        if (isNaN(Number(a[property]))) {
          return (b[property].toString()).localeCompare(a[property].toString())
        }
        return b[property] - a[property]
      }
    })
    return data
  },
  arrSortTreeString({ $table, data, column, property, order }) {
    // tree 排序
    data.sort(function (a, b) {
      if (!(a[property] !== undefined && b[property] !== undefined)) {
        if (order === 'asc') {
          return true
        } else {
          return false
        }
      }
      let valueA = a[property].split('##')
      let valueB = b[property].split('##')
      valueA.shift()
      valueA = valueA.join('-')
      valueB.shift()
      valueB = valueB.join('-')
      if (order === 'asc') {
        return (valueA.toString()).localeCompare(valueB.toString())
      } else {
        return (valueB.toString()).localeCompare(valueA.toString())
      }
    })
    return data
  },
  arrSortNumberOption({ $table, data, column, property, order }) {
    // options 排序
    let render = column.own && (column.own.editRender || column.own.cellRender || column.own.contentRender)
    if (render && render.name) {
      let options = render.options || []
      data.sort(function (a, b) {
        if (!(a[property] !== undefined && b[property] !== undefined)) {
          if (order === 'asc') {
            return true
          } else {
            return false
          }
        }
        let valueA = ''
        let valueB = ''
        options.forEach((item, index) => {
          if (item.value === a[property]) {
            valueA = item.label
          }
          if (item.value === b[property]) {
            valueB = item.label
          }
        })
        if (order === 'asc') {
          return (valueA).localeCompare(valueB)
        } else {
          return (valueB).localeCompare(valueA)
        }
      })
      return data
    } else {
      return this.arrSortGloabal({ $table, data, column, property, order })
    }
  },
  arrSortNumberCheckbox({ $table, data, column, property, order, rTypeSuffix }) {
    // checkbox 排序
    // let render = column.own && (column.own.editRender || column.own.cellRender || column.own.contentRender)
    // if (render && render.name) {
    //   let options = render.options || []
    //   data.sort(function (a, b) {
    //     a[property] = Array.isArray(a[property]) ? a[property] : []
    //     b[property] = Array.isArray(b[property]) ? b[property] : []
    //     let valueA = []
    //     let valueB = []
    //     options.forEach((item, index) => {
    //       let indexOfA = a[property].indexOf(item.value)
    //       let indexOfB = b[property].indexOf(item.value)
    //       if (indexOfA >= 0) {
    //         valueA[indexOfA] = item.label
    //       }
    //       if (indexOfB >= 0) {
    //         valueA[indexOfB] = item.label
    //       }
    //     })
    //     if (order === 'asc') {
    //       return (valueA.join('')).localeCompare(valueB.join(''))
    //     } else {
    //       return (valueB.join('')).localeCompare(valueA.join(''))
    //     }
    //   })
    //   return data
    // } else {
    //   return this.arrSortGloabal({ $table, data, column, property, order })
    // }
    data.sort(function (a, b) {
      if (!(a[property] === undefined && b[property] === undefined)) {
        if (order === 'asc') {
          return true
        } else {
          return false
        }
      }
      if (order === 'asc') {
        return (a[property + rTypeSuffix]).localeCompare(b[property + rTypeSuffix])
      } else {
        return (b[property + rTypeSuffix]).localeCompare(a[property + rTypeSuffix])
      }
    })
    return data
  },
  arrSort({ $table, data, column, property, order }) {
    // 排序
    let self = this
    let render = column.own && (column.own.editRender || column.own.cellRender || column.own.contentRender)
    if (render && render.name) {
      switch (render.name) {
        case '$treeinput':
          return self.arrSortTreeString({ $table, data, column, property, order })
        case '$treeText':
          return self.arrSortTreeString({ $table, data, column, property, order })
        case '$span':
          return self.arrSortString({ $table, data, column, property, order })
        case '$href':
          return self.arrSortString({ $table, data, column, property, order })
        case '$EditDownTextarea':
          return self.arrSortString({ $table, data, column, property, order })
        case '$EditDownConditions':
          return self.arrSortString({ $table, data, column, property, order })
        case '$moneyRender':
          return self.arrSortNumber({ $table, data, column, property, order })
        case '$calculateRender':
          return self.arrSortNumber({ $table, data, column, property, order })
        case '$vxeDays':
          return self.arrSortNumber({ $table, data, column, property, order })
        case '$vxeRadio':
          return self.arrSortNumberOption({ $table, data, column, property, order })
        case '$vxeTime':
          return self.arrSortNumber({ $table, data, column, property, order })
        case '$vxeMoney':
          return self.arrSortNumber({ $table, data, column, property, order })
        case '$select':
          return self.arrSortNumberOption({ $table, data, column, property, order })
        case '$vxeSelect':
          if (render.props.multiple) {
            return self.arrSortNumberCheckbox({ $table, data, column, property, order, rTypeSuffix: '_select_sort' })
          } else {
            return self.arrSortNumberOption({ $table, data, column, property, order, rTypeSuffix: '_select_sort' })
          }
        case '$vxeCheckbox':
          return self.arrSortNumberCheckbox({ $table, data, column, property, order, rTypeSuffix: '_checkbox_sort' })
        default:
          return self.arrSortGloabal({ $table, data, column, property, order })
      }
    } else {
      data.sort(function(a, b) {
        if (order === 'asc') {
          if (isNaN(Number(a[property]))) {
            return (a[property].toString()).localeCompare(b[property].toString())
          }
          return a[property] - b[property]
        } else {
          if (isNaN(Number(a[property]))) {
            return (b[property].toString()).localeCompare(a[property].toString())
          }
          return b[property] - a[property]
        }
      })
    }
    return data
  }
}
const initMethods = {
  initCreated() {
    // 初始化Created
    this.registTableRender(defaultRenderers)
    this.registGlobleFormatters(defaultFormatters)
  },
  initMounted() {
    // this.tableOptionFn()
    // 初始化Mounted
    this.moneyUnit = this.defaultMoneyUnit
    this.initFirst()
    // this.setColumnDrop()
  },
  initFirst() {
    // 组件初始化
    this.initTableGlobalConfig()
    this.initContextMenuConfig()
    this.initSeqConfig()
    this.initExpandConfig()
    this.initToolbar()
    this.initEditConfig()
    this.initTableFormConfig()
    this.initTable()
    // this.handleRefresh()
    this.initTableData()
    this.$nextTick(() => {
      this.$nextTick(() => {
        this.FindText = new FindText(this.$refs.xGrid.$refs.xTable)
      })
    })
  },
  initTable() {
    // this.$refs.xGrid.clearAll()
    // this.$refs.xGrid && this.$refs.xGrid.handleReserveStatus()
    this.initTableConfig()
    this.registTableRender(this.tableConfigCp.renderers)
    this.initEditRules()
    this.initTableConlums()
    this.setPagerConfig()
  },
  initTableGlobalConfig() {
    // 初始化全局配置
    this.tableGlobalConfigIn = Object.assign({}, this.tableGlobalConfigIn, this.tableGlobalConfig)
  },
  initTableConfig() {
    // 初始化表格列和渲染器配置
    // this.tableConfigCp = this.deepAssign(this.tableConfigCp, this.tableConfig)
    this.tableConfigCp = Object.assign({}, this.tableConfigCp, this.tableConfig)
  },
  initTableConlums() {
    // 初始化列配置
    // let globalConfig = this.tableConfigCp.globalConfig
    // this.tableColumnsConfigIn = []
    // if (globalConfig.checkType) {
    //   this.tableColumnsConfigIn.push(tableColumns[globalConfig.checkType])
    // }
    // if (globalConfig.seq) {
    //   this.tableColumnsConfigIn.push(tableColumns['seq'])
    // }
    // this.tableColumnsConfigIn = [...this.tableColumnsConfigIn, ...this.tableColumnsConfig]
    // this.tableColumnsConfigIn = this.generateOptionRow(this.tableColumnsConfigIn, globalConfig)
    // if (globalConfig.optionSort) {
    //   this.tableColumnsConfigIn.push(tableColumns['optionSort'])
    // }
    // this.registGloableConlumsConfig(this.tableColumnsConfigIn)
    // this.tableColumnsFieldMap = {}
    // this.tableColumnsFieldArr = []
    // this.tableColumnsSingArr = []
    // this.tableColumnsTitleFieldMap = {}
    this.calculateConstraintConfig = {
      rowformulaConfig: { // 行公式配置
      },
      colFormulaConfig: { // 列公式配置
      },
      constraintConfig: { // 表间约束配置
      }
    }
    this.generateCalcColFormulaMap(this.tableColumnsConfig)
    this.tableColumnsConfigIn = this.deepCopy(this.generateTableConlums(this.tableColumnsConfig, this.tableConfigCp.globalConfig))
  },
  generateTableConlums(conlums, globalConfig) {
    // 生成表头
    let tableColumnsConfigIn = []
    if (globalConfig.checkType) {
      tableColumnsConfigIn.push(tableColumns[globalConfig.checkType])
    }
    if (globalConfig.seq) {
      tableColumnsConfigIn.push(tableColumns['seq'])
    }
    tableColumnsConfigIn = [...tableColumnsConfigIn, ...conlums]
    if (globalConfig.optionSort) {
      tableColumnsConfigIn.push(tableColumns['optionSort'])
    }
    // tableColumnsConfigIn = this.generateOptionRow(tableColumnsConfigIn, globalConfig)
    this.registGloableConlumsConfig(tableColumnsConfigIn)
    return tableColumnsConfigIn
  },
  generateOptionRow(tableColumnsConfigIn, globalConfig) {
    // 初始化操作列 废弃
    if (globalConfig.hasOptionRow) {
      let optionRow = tableColumns['optionRow']
      if (this.getbasicDataType(this.tableConfigCp.cellRenderConfig.optionRow) === 'Object') {
        let cellRender = optionRow.cellRender
        cellRender = Object.assign({}, this.tableConfigCp.cellRenderConfig.optionRow)
        optionRow[this.tableConfigCp.cellRenderConfig.optionRow.type] = cellRender
      }
      tableColumnsConfigIn.push(optionRow)
    }
    return tableColumnsConfigIn
    // optionRow.slots = this.tableConfigCp.slots.optionRow
  },
  initToolbar() {
    // 初始化工具栏
    if (this.getbasicDataType(this.toolbarConfig) === 'Boolean') {
      this.toolbarConfigIn = undefined
      this.toolbarConfigInCopy = {}
    } else {
      this.toolbarConfigIn = Object.assign({}, this.toolbarConfigInCp, this.toolbarConfig)
      this.toolbarConfigInCopy = this.toolbarConfigIn
      if (this.toolbarConfigInCopy.yearlist.length) {
        this.formSearchData.year = this.toolbarConfigInCopy.yearlist[0]
      }
    }
  },
  initTableData() {
    // 初始化表格数据
    // this.tableDataIn = this.tableData
    this.tableDataIn = this.reductionRowFormula(this.calculateConstraintConfig.rowformulaConfig, this.addMissingFieldsAndCalcColFormula([...this.tableData]), this.id)
    // this.tableDataIn.forEach(v => {
    //   this.deepTableData.push(v)
    // })
    this.selection = []
    if (this.$refs.xGrid) {
      this.$refs.xGrid.removeCheckboxRow()
    }
    // this.tableDataIn = JSON.parse(JSON.stringify(this.tableData))
  },
  initTableFormConfig() {
    if (this.getbasicDataType(this.tableFormConfig) === 'Boolean') {
      this.tableFormConfigIn = undefined
    } else {
      this.tableFormConfigIn = Object.assign({}, this.tableFormConfig)
    }
  },
  initSeqConfig(startIndex = 0) {
    // 初始化序号配置项
    let self = this
    this.seqConfig = {
      startIndex: 1, // 设置序号的起始值 number0
      seqMethod({ row, $rowIndex, rowIndex, column, columnIndex, seq, $seq }) {
        if (self.pagerConfigIn && !self.treeConfig) {
          return self.pagerConfigIn.pageSize * (self.pagerConfigIn.currentPage - 1) + seq
        } else {
          return $seq === '' || $seq === undefined ? seq : $seq + '.' + seq
        }
      }
    }
  },
  initEditConfig() { // 编辑配置
    if (this.getbasicDataType(this.editConfig) === 'Boolean') {
      this.editConfigIn = undefined
    } else {
      this.editConfigIn = Object.assign({
        trigger: 'dblclick',
        mode: 'cell'
      }, this.editConfig)
    }
  },
  initExpandConfig() {
    // 编辑展开配置
    if (this.getbasicDataType(this.expandConfig) === 'Undefined' || this.getbasicDataType(this.expandConfig) === 'Boolean') {
      this.expandConfigIn = {
        expandAll: false
      }
    } else {
      this.expandConfigIn = Object.assign({}, this.expandConfig)
    }
  },
  initContextMenuConfig() {
    // 更新右键配置
    if (this.getbasicDataType(this.contextMenuConfig) === 'Undefined' || this.getbasicDataType(this.contextMenuConfig) === 'Boolean') {
      this.contextMenuConfigIn = {}
    } else {
      this.contextMenuConfigIn = Object.assign({}, this.contextMenuConfigIn, this.contextMenuConfig)
    }
  },
  initTreeConfig() {
    // 表格树配置
    if (this.getbasicDataType(this.treeConfig) === 'Boolean') {
      this.treeConfigIn = this.treeConfig
    } else {
      this.treeConfigIn = Object.assign({}, this.treeConfig)
    }
  },
  initFooterConfig() {
    // 更新footer配置
    this.footerConfigIn = Object.assign({}, this.footerConfigIn, this.footerConfig)
  },
  initEditRules() {
    // 编辑校验规则
    this.editRulesIn = Object.assign({}, this.editRulesIn, this.addTreeReg({ ...this.editRules }))
  }
  // initTableEvent() {
  //   this.tableEventIn = Object.assign(this.tableEventIn, this.tableEvent)
  //   this.resgistEventProxy()
  // }
}
const registFn = {
  registGlobleFormatters(obj) {
    let self = this
    Object.keys(obj).forEach((item, index) => {
      self.$VXETable.formats.add(item, obj[item].bind(self))
    })
  },
  registGloableConlumsConfig(arr = []) {
    // 注册列格式化，渲染器，过滤项目等全局函数
    let self = this
    function reverRegistGloableConlumsConfig(arrc) {
      arrc.forEach((item, index) => {
        self.registSingelRowFormater(item)
        // self.registSingelRowRenderer(item)
        // self.registSingRowCalcRenderer(item)
        self.registSingelRowSorts(item)
        // self.registSingelRowConfig(item)
        self.registSingelRowFilter(item)
        if (Array.isArray(item.children) && item.children.length) {
          self.registGloableConlumsConfig(item.children)
        }
      })
    }
    reverRegistGloableConlumsConfig(arr)
  },
  registSingelRowConfig(item) {
    // 注册
  },
  registSingRowCalcRenderer(item) {
    // 注册单条数据计算渲染器
    if (item.formula && !item.editRender) {
      item.editRender = {
        name: '$calculateRender'
      }
    }
  },
  registSingelRowFilter(item) {
    // 绑定单条列过滤器配置
    if (Array.isArray(item.children)) {
      return
    }
    if (item.filters !== undefined || item.filters || item.filterRender !== undefined || item.filterRender) {
      // if (item.filters === false) {
      //   delete item.filters
      //   delete item.filterRender
      //   delete item.filterMethod
      // }

      // type+editable
      // { value: '$vxeInput', label: '输入框' },
      // { value: '$vxeSelect', label: '下拉选择' },
      // { value: '$vxeCalculate', label: '计算' },
      // { value: '$vxeMoney', label: '金额' },
      // { value: '$vxeEditDownTextarea', label: '文本输入框' },
      // { value: '$vxeDays', label: '天数' },
      // { value: '$vxeTime', label: '时间' },
      // { value: '$vxeRadio', label: '单选' },
      // { value: '$vxeCheckbox', label: '复选' },
      // { value: '$treeinput', label: '下拉树' },
      // { value: '$EditDownJson', label: 'JSON' },
      // { value: '$href', label: '链接' }
      return
    }
    let self = this
    let itemRender = item.cellRender || item.editRender || item.contentRender
    if (item.filters === undefined || item.filters === true) {
      if (item.field && self.tableConfigCp.filters[item.field]) {
        item.filters = self.tableConfigCp.filters[item.field].filters ? self.tableConfigCp.filters[item.field].filters : [{ data: '' }]
        if (typeof (self.tableConfigCp.filters[item.field].filterMethod) === 'function') {
          item.filterMethod = self.tableConfigCp.filters[item.field].filterMethod ? self.tableConfigCp.filters[item.field].filterMethod : ({ option, row, column }) => {
            return row[column.property] === Number(option.data)
          }
        }
      } else if (item.field && itemRender) {
        switch (itemRender.name) {
          case '$select':
            item.filters = Array.isArray(itemRender.options) ? itemRender.options : []
            item.filterMultiple = true
            break
          case '$vxeSelect':
            item.filters = Array.isArray(itemRender.options) ? itemRender.options : []
            item.filterMultiple = true
            break
          case '$calculateRender':
            item.filters = [{ data: { type: 'has', isCase: false, value: '' } }]
            item.filterRender = { name: 'FilterComplex' }
            break
          case '$vxeCalculate':
            item.filters = [{ data: { type: 'has', isCase: false, value: '' } }]
            item.filterRender = { name: 'FilterComplex' }
            break
          case '$moneyRender':
            item.filters = [{ data: { type: 'has', isCase: false, value: '' } }]
            item.filterRender = { name: 'FilterComplex' }
            break
          case '$vxeMoney':
            item.filters = [{ data: { type: 'has', isCase: false, value: '' } }]
            item.filterRender = { name: 'FilterComplex' }
            break
          case '$href':
            item.filters = [{ data: '' }]
            item.filterRender = { name: 'FilterInput' }
            break
          case '$vxeRadio':
            item.filters = Array.isArray(itemRender.options) ? itemRender.options : []
            item.filterMultiple = true
            break
          case '$vxeCheckbox':
            item.filters = [{ data: { vals: [], sVal: '' } }]
            item.filterRender = { name: 'FilterChoose' }
            break
          case '$vxeInput':
            // text, search, number, integer, float, password, date, datetime, week, month, year
            if (this.getbasicDataType(itemRender.props) === 'Object' && itemRender.props.type) {
              switch (itemRender.props.type) {
                case 'text':
                  item.filters = [{ data: { vals: [], sVal: '' } }]
                  item.filterRender = { name: 'FilterContent' }
                  break
                case 'float':
                  item.filters = [{ data: { type: 'has', isCase: false, value: '' } }]
                  item.filterRender = { name: 'FilterComplex' }
                  break
                case 'number':
                  item.filters = [{ data: { type: 'has', isCase: false, value: '' } }]
                  item.filterRender = { name: 'FilterComplex' }
                  break
                case 'year':
                  item.filters = [{ data: { type: 'has', isCase: false, value: '' } }]
                  item.filterRender = { name: 'FilterComplex' }
                  break
                case 'date':
                  item.filters = [{ data: { type: 'has', isCase: false, value: '' } }]
                  item.filterRender = { name: 'FilterComplex' }
                  break
                default:
                  if (itemRender.name === '$optionSort' || itemRender.name === 'optionRow') {
                    delete item.filters
                    delete item.filterRender
                    delete item.filterMethod
                  } else {
                    item.filters = [{ data: '' }]
                    item.filterRender = { name: 'FilterInput' }
                  }
                  break
              }
            } else {
              item.filters = [{ data: '' }]
              item.filterRender = { name: 'FilterInput' }
            }
            break
          case '$EditDownTextarea':
            item.filters = [{ data: { vals: [], sVal: '' } }]
            item.filterRender = { name: 'FilterContent' }
            break
          case '$vxeEditDownTextarea':
            item.filters = [{ data: { vals: [], sVal: '' } }]
            item.filterRender = { name: 'FilterContent' }
            break
          case '$treeinput':
            item.filters = [{ data: { vals: [], sVal: '' } }]
            item.filterRender = { name: 'FilterContent' }
            break
          default:
            if (['seq', 'checkbox', 'dragSort', 'radio', 'optionRow'].indexOf(item.type)) {
              delete item.filters
              delete item.filterRender
              delete item.filterMethod
            } else {
              item.filters = [{ data: '' }]
              item.filterRender = { name: 'FilterInput' }
            }
            break
        }
      } else {
        item.filters = [{ data: '' }]
        item.filterRender = { name: 'FilterInput' }
      }
    }
  },
  registSingelRowFormater(item) {
    // 绑定单条列格式化配置
    let self = this
    if (item.field && self.tableConfigCp.formatters[item.field]) {
      item.formatter = self.tableConfigCp.formatters[item.field]
    }
  },
  registSingelRowRenderer(item) {
    // 绑定单条列渲染器配置
    let self = this
    let itemRender = item.cellRender || item.editRender || item.contentRender
    if (item.field && self.tableConfigCp.cellRenderConfig[item.field] && !itemRender) {
      item[self.tableConfigCp.cellRenderConfig[item.field].type] = self.tableConfigCp.cellRenderConfig[item.field]
    }
  },
  registSingelRowSorts(item) {
    // 绑定单条列排序配置
    // let self = this
    if (!item.children && item['sortable'] === undefined) {
      item['sortable'] = item['sortable'] || true
      // let itemRender = item.cellRender || item.editRender || item.contentRender
      // if (itemRender && (itemRender.name === '$treeinput' || itemRender.name === '$treeText')) {
      //   item['sortable'] = false
      //   item['sortMethod'] = function (prevRow, nexRow) {
      //     let prevRowCp = prevRow.split('##').shift()
      //     let nexRowCp = nexRow.split('##').shift()
      //     console.log(prevRow, nexRow, prevRowCp.join('-') - nexRowCp.join('-'))
      //     return prevRowCp.join('-') - nexRowCp.join('-')
      //   }
      // }
    }
  },
  registRenderers(arr = []) {
    // 初始化绑定列渲染器
    let self = this
    function reverRegistRenderers(arrc) {
      arrc.forEach((item, index) => {
        reverRegistRenderers(item)
        if (Array.isArray(item.children) && item.children.length) {
          self.s(item.children)
        }
      })
    }
    reverRegistRenderers(arr)
  },
  registFilters(arr = []) {
    // 初始化绑定列过滤器函数
    let self = this
    arr.forEach((item, index) => {
      self.registSingelRowFilter(item)
      if (Array.isArray(item.children) && item.children.length) {
        self.registFormatters(item.children)
      }
    })
  },
  registFormatters(arr = []) {
    // 初始化绑定列格式化函数
    let self = this
    arr.forEach((item, index) => {
      self.registSingelRowFormater(item)
      if (Array.isArray(item.children) && item.children.length) {
        self.registFormatters(item.children)
      }
    })
  },
  registTableRender(renderers) {
    // 注册渲染器
    for (let i in renderers) {
      this.$VXETable.renderer.add(i, renderers[i])
    }
  }
}
const tableOptionFn = {
  tableOptionFn() {
    // 全局表格组件xgrid调用实例
    return this.$refs.xGrid
  },
  updateFooter() {
    // 更新表尾
    return this.$refs.xGrid.updateFooter()
  },
  exportData(obj) {
    // 导出数据
    this.$refs.xGrid.openExport({
      // 默认勾选源
      original: true
    })
  },
  importDataEvent() {
    // 导入数据
    this.$refs.xGrid.importData()
  },
  setAllCheckboxRow() {
    // 设置所有选中
    this.$refs.xGrid.setAllCheckboxRow(true)
    this.updateFooter().then(() => { }).catch(() => { })
  },
  clearCheckboxRow() {
    // 清除所有选中
    this.$refs.xGrid.clearCheckboxRow()
    this.updateFooter().then(() => {}).catch(() => {})
  },
  removeCheckboxRow() {
    // 删除选中行操作
    let self = this
    this.$XModal.confirm('您确定要删除所选中数据吗?').then(type => {
      if (type === 'confirm') {
        self.$refs.xGrid.removeCheckboxRow()
      }
    })
  },
  revertEvent() {
    // 撤销操作
    this.$XModal.confirm('您确定要还原数据吗?').then(type => {
      if (type === 'confirm') {
        this.$refs.xGrid.revertData()
      }
    })
  },
  deleteRowData(rows) {
    // 删除选中行操作
    let self = this
    this.$XModal.confirm('您确定要删除所选中数据吗?').then(type => {
      if (type === 'confirm') {
        self.$refs.xGrid.removeCheckboxRow(rows)
      }
    })
  },
  async copySelectionRowData(obj = {}) {
    // 复制选中行数据
    let self = this
    const { rowIndexTo, data } = obj
    let rowTo = rowIndexTo === undefined ? -1 : rowIndexTo
    let newRowSelectionsData = data || self.$refs.xGrid.getCheckboxRecords()
    if (newRowSelectionsData.length) {
      newRowSelectionsData.forEach((item, index) => {
        Object.assign({}, item, {
          insertMark: '新数据',
          date: new Date().format('YYYY-MM-DD hh:mm:ss:c'),
          isNew: true
        })
      })
      await self.$refs.xGrid.insert(newRowSelectionsData)
      await self.$refs.xGrid.setActiveCell(rowTo)
    } else {
      self.$XModal.message({ message: '请先选择新增数据的模版!' })
    }
  },
  async copyRowData(obj = {}) {
    // 复制行
    let self = this
    const { rowSource, rowIndexTo } = obj
    let rowSourceData = rowSource === undefined ? 0 : rowSource
    let rowTo = rowIndexTo === undefined ? -1 : rowIndexTo
    // 复制行
    let newRowDataObj = { ...self.$refs.xGrid.getData(rowSourceData) }
    newRowDataObj = Object.assign({}, newRowDataObj, {
      insertMark: '新数据',
      date: new Date().format('YYYY-MM-DD hh:mm:ss:c'),
      isNew: true,
      _XID: ''
    })
    let { row } = await self.$refs.xGrid.insert(newRowDataObj, rowTo)
    await self.$refs.xGrid.setCurrentRow(row)
    await self.$refs.xGrid.setActiveCell(row)
    await self.$refs.xGrid.validate(row).catch(errMap => errMap)
    // this.$XModal.message({ message: `复制单条数据完成，行号为 ${rowTo + 1}` })
  },
  async insertRowData(obj = {}) {
    // 新增行
    let self = this
    const { data, rowIndexTo } = obj
    let rowTo = rowIndexTo === undefined ? -1 : rowIndexTo
    let dataObj = Object.assign({}, data === undefined ? {} : data, {
      insertMark: '新数据',
      date: new Date().format('YYYY-MM-DD hh:mm:ss:c'),
      isNew: true,
      _XID: ''
    })
    let { row } = await self.$refs.xGrid.insertAt(dataObj, rowTo)
    await self.$refs.xGrid.setCurrentRow(row)
    await self.$refs.xGrid.setActiveCell(row)
    await self.$refs.xGrid.validate(row).catch(errMap => {
      console.log('validate', errMap)
      return errMap
    })

    // await this.$refs.xGrid.fullValidate(row).catch(errMap => {
    //   console.log('fullValidate', errMap)
    //   return errMap
    // })
    // this.$XModal.message({ message: `复制单条数据完成，行号为 ${rowTo + 1}` })
  },
  refreshTable(data) {
    // 重新加载数据刷新视图
    let xGrid = this.$refs.xGrid
    // xGrid.reloadData(xGrid.getTableData().fullData)
    xGrid.reloadData(data || this.tableDataIn).then().catch()
  },
  reloadTableConlums(conlums) {
    // 重加载表头
    this.$refs.xGrid.reloadColumn(this.generateTableConlums(conlums, this.tableConfigCp.globalConfig))
  },
  getTableData() {
    const listData = this.getListData()
    const insertRecords = this.$refs.xGrid.getInsertRecords()
    const updateRecords = this.$refs.xGrid.getUpdateRecords()
    const removeRecords = this.$refs.xGrid.getRemoveRecords()
    const { keepSource, tableSourceData } = this.$refs.xGrid.$refs.xTable
    const { fullData, visibleData, tableData, footerData } = this.$refs.xGrid.getTableData()
    const { tableColumnsConfig, selection, editRules } = this
    return { keepSource, tableSourceData, fullData, visibleData, tableData, footerData, tableColumnsConfig, selection, editRules, listData, insertRecords, updateRecords, removeRecords }
  },
  getOptionData() {
    // 获取当前操作数据
    return this.$refs.xGrid.getRecordset()
  },
  getInsertRowData() {
    // 获取新增行
    return this.$refs.xGrid.getInsertRecords()
    // this.$XModal.alert(insertRecords.length)
  },
  getSelectionData() {
    // 获取选中
    return this.$refs.xGrid.getCheckboxRecords()
    // this.$XModal.alert(selectRecords.length)
  },
  getData(rowIndex = []) {
    return this.$refs.xGrid.getData(rowIndex)
  },
  validate(row = true) {
    return this.$refs.xGrid.validate(row)
  },
  async validEvent(row = true) {
    // 校验
    const errMap = await this.$refs.xGrid.validate(row).catch(errMap => errMap)
    if (errMap) {
      this.$XModal.message({ status: 'error', message: '校验不通过！' })
    } else {
      this.$XModal.message({ status: 'success', message: '校验成功！' })
    }
  },
  async fullValidEvent(row = true) {
    // 所有校验
    const errMap = await this.$refs.xGrid.fullValidate(row).catch(errMap => errMap)
    if (errMap) {
      let msgList = []
      Object.values(errMap).forEach(errList => {
        errList.forEach(params => {
          let { rowIndex, column, rules } = params
          rules.forEach(rule => {
            msgList.push(`第 ${rowIndex} 行 ${column.title} 校验错误：${rule.message}`)
          })
        })
      })
      this.$XModal.message({
        status: 'error',
        message: () => {
          return [
            <div class="red" style="max-height: 400px;overflow: auto;">
              {
                msgList.map(msg => <div>{ msg }</div>)
              }
            </div>
          ]
        }
      })
    } else {
      this.$XModal.message({ status: 'success', message: '校验成功！' })
    }
  },
  async selectValidEvent() {
    // 选中校验
    let selectRecords = this.$refs.xGrid.getCheckboxRecords()
    if (selectRecords.length > 0) {
      const errMap = await this.$refs.xGrid.validate(selectRecords).catch(errMap => errMap)
      if (errMap) {
        this.$XModal.message({ status: 'error', message: '校验不通过！' })
        return false
      } else {
        this.$XModal.message({ status: 'success', message: '校验成功！' })
        return true
      }
    } else {
      this.$XModal.message({ status: 'warning', message: '未选中数据！' })
    }
  },
  insertEvent(row, column) {
    // 插入数据
    let xTable = this.$refs.xTable
    xTable.insertAt(null, row)
      .then(({ row }) => xTable.setActiveCell(row, column.property))
  }
}
const tableEventFn = {
  setColumnDrop() {
    let Sortable = this.$Sortable
    this.$nextTick(() => {
      let xTable = this.$refs.xGrid
      this.sortable = Sortable.create(xTable.$el.querySelector('.body--wrapper>.vxe-table--header .vxe-header--row'), {
        handle: '.vxe-header--column:not(.col--expand)',
        onEnd: ({ newIndex, oldIndex }) => {
          let tableColumn = xTable.getColumns()
          let currRow = tableColumn.splice(oldIndex, 1)[0]
          tableColumn.splice(newIndex, 0, currRow)
          xTable.loadColumn(tableColumn)
        }
      })
    })
  },
  onContextMenuClick({ menu, row, column, columnIndex, rowIndex }, event) { // 右键菜单
    event = event || window.event
    let self = this
    let xGrid = this.$refs.xGrid
    switch (menu.code) {
      case 'hideColumn':// 隐藏当前列
        xGrid.hideColumn(column)
        break
      case 'showAllColumn': // 显示所有列
        xGrid.resetColumn()
        break
      case 'recover_all': // 显示所有列
        self.reloadTableConlums(self.tableColumnsConfig)
        break
      case 'resetColumn': // 重新加载
        xGrid.resetColumn({ visible: true, resizable: true })
        break
      case 'toggleAllCheckboxRow': // 重新加载
        xGrid.toggleAllCheckboxRow()
        break
      case 'reload': // 重新加载
        break
      case 'insertAt': // 插入数据
        self.insertRowData({ data: row, rowIndexTo: -1 })
        break
      case 'remove': // 移除数据
        xGrid.remove(row)
        break
      case 'clear': // 清除单元格数据
        xGrid.clearData(row, column.property)
        break
      case 'verify': // 校验并定位到第一个错误
        // this.validate().catch(errMap => console.log(errMap))
        this.validEvent()
        break
      case 'maximize': // 表格最大化
        xGrid.maximize()
        break
      case 'revert': // 表格还原
        self.revertEvent()
        break
      case 'zoom': // 切换表格最大化
        xGrid.zoom()
        break
      // case 'copy': // 复制文本
      //   if (self.$XEClipboard.copy(row[column.property])) {
      //     self.$XModal.message({ message: '已复制到剪贴板！', status: 'success' })
      //   }
      //   break
      // case 'paste': // 复制文本
      //   let clipboardData = (event.clipboardData || event.originalEvent.clipboardData)
      //   row[column.property] = clipboardData
      //   break
      //  case 'save':
      //  self.$XModal.message({ message: '保存成功', status: 'success' })
      //  break
      case 'exportDataXlsx':
        console.log('this.$Export', this, this.$Export)
        this.triggerExportOption()
        // this.$Export.exportExcel({
        //   columns: this.tableColumnsConfig,
        //   datas: this.getTableData().fullData
        // })
        // xGrid.openExport({
        //   filename: 'export',
        //   sheetName: 'Sheet1',
        //   type: 'xlsx',
        //   isPrint: true
        // })
        break
      case 'print':
        xGrid.print({
          filename: 'printData',
          mode: 'current',
          isHeader: true,
          isFooter: true
        })
        break
      case 'logCurrentData':
        console.log(this.getTableData())
        //  console.log(this.transformMoneyByUnit(this.getTableData().tableData, this.tableColumnsConfig, 'big', 10000))
        break
      case 'exportDataPdf':
        xGrid.exportData({
          filename: '导出',
          type: 'pdf'
        })
        break
      case 'clearSort':
        xGrid.clearSort()
        break
      case 'sortAsc':
        xGrid.sort(column.property, 'asc')
        break
      case 'sortDesc':
        xGrid.sort(column.property, 'desc')
        break
    }
    return false
  },
  handleCheckboxChange(obj, e) {
    // 多选选中或去选某一条事件
    this.selection = obj.records
    this.$emit('checkboxChange', obj, e)
    this.updateFooter().then(() => {}).catch(() => {})
  },
  handleCheckboxAllChange(obj, e) {
    // 全选选中或去选某一条事件
    this.selection = obj.records
    this.$emit('checkboxAll', obj, e)
    this.updateFooter().then(() => {}).catch(() => {})
  },
  onOptionRowClick(obj) {
    // 操作列点击事件
    let methods = this.tableConfigCp.methods
    typeof (methods.onOptionRowClick) === 'function' && methods.onOptionRowClick(obj, this)
  },
  onOptionSortRowClick({ row, column, $rowIndex, data, items, optionType }) {
    switch (optionType) {
      case 'upSort':
        if ($rowIndex > 0) {
          let temp = data[$rowIndex - 1]
          data[$rowIndex - 1] = data[$rowIndex]
          data[$rowIndex] = temp
          // [data[$rowIndex - 1]], data[$rowIndex]] = [data[$rowIndex], data[$rowIndex-1]] ts
        }
        break
      case 'downSort':
        if ($rowIndex < data.length - 1) {
          let temp = data[$rowIndex + 1]
          data[$rowIndex + 1] = data[$rowIndex]
          data[$rowIndex] = temp
          // [data[$rowIndex + 1]], data[$rowIndex]] = [data[$rowIndex], data[$rowIndex + 1]] ts
        }
        break
      case 'topSort':
        if ($rowIndex > 0) {
          data.unshift(data.splice($rowIndex, 1)[0])
        }
        break
      case 'bottomSort':
        if ($rowIndex < data.length - 1) {
          data.push(data.splice($rowIndex, 1)[0])
        }
        break
      default:
        break
    }
    this.$refs.xGrid.reloadData(data).then().catch()
  }
}
const toolBarEvent = {
  toolbarButtonClickEvent(obj, e) { // toolbar事件代理
    // 工具栏左侧按钮点击事件
    let self = this
    let methods = this.tableConfigCp.methods
    if (typeof (obj.button.callback) === 'function') {
      obj.button.callback(obj, self, e)
    } else {
      typeof (methods.toolbarButtonClickEvent) === 'function' && methods.toolbarButtonClickEvent(obj, self, e)
    }
  },
  onToolbarOperrateClick(code) {
    switch (code) {
      case 'refresh':
        this.$emit('onToolbarBtnClick', { context: this, xGrid: this.$refs.xGrid, code: 'refresh' })
        // this.reloadTableConlums(this.tableColumnsConfig)
        // this.refreshTable()
        break
      case 'calculator':
        this.$XModal.message({ status: 'info', message: '此功能正在开发中' })
        break
      case 'zoom':
        this.$refs.xGrid.zoom().then(() => { }).catch(() => {})
        break
      case 'export':
        this.triggerExportOption()
        break
      case 'custom':
        break
      case 'import':
        this.triggerImportOption()
        break
    }
  },
  setMoneyUnit(Unitlevel, oldUnitlevel) {
    // 设置金额单位
    let xGrid = this.$refs.xGrid
    if (!xGrid) {
      return
    }
    // let fullData = this.getData()
    // let fullData = xGrid.getTableData().tableData
    // xGrid.reloadData(fullData)
    xGrid.$forceUpdate()
    xGrid.updateFooter().then(() => {}).catch(() => {})
  }
}
const pageEvent = { // 分页事件
  setPagerConfig() {
    // 处理异常情况，total为function
    if (this.getbasicDataType(this.pagerConfig.total) === 'Function') {
      this.pagerConfig.total = 0
    }
    // 更新分页配置
    if (this.getbasicDataType(this.pagerConfig) === 'Boolean') {
      this.pagerConfigIn = undefined
    } else {
      this.pagerConfigIn = Object.assign({}, this.pagerConfigIn ? this.pagerConfigIn : this.pagerConfigInCp, this.pagerConfig)
    }
  },
  handlePageChange({ currentPage, pageSize }) {
    // 分页改变事件
    this.pagerConfigIn.currentPage = currentPage
    this.pagerConfigIn.pageSize = pageSize
    this.loadData()
  },
  handleRefresh() {
    // 刷新
    this.formSearchSubmit({ data: {} })
  },
  getColumnsList() {
    let newColumnsList = []
    this.tableColumnsConfig.forEach(v => {
      newColumnsList.push(v.field)
    })
    return newColumnsList
  },
  delSearchfromMain() {
    // 父组件调用此方法清空查询数据
    this.formSearchData.filterValue = ''
  },
  formSearchSubmit({ data, $event }) {
    let newTbleDatas = []
    // this.formSearchData.filterValue
    let search = this.formSearchData.filterValue
    if (search !== '') {
      console.log('this.tableDataIn', this.tableData)
      this.tableDataIn.forEach(dataNews => {
        let newColumnsList = this.getColumnsList()
        console.log(newColumnsList)
        for (let i = 0; i < Object.keys(dataNews).length; i++) {
          if (newColumnsList.includes(Object.keys(dataNews)[i]) && String(dataNews[Object.keys(dataNews)[i]]).indexOf(search) > -1) {
            newTbleDatas.push(dataNews)
            break
          }
        }
      })
      this.refreshTable(newTbleDatas)
    } else {
      this.refreshTable(this.tableDataIn)
    }
  },
  loadData() {
    // 加载数据
    let self = this
    let searchParams = {
      params: this.formSearchData,
      currentPage: this.pagerConfigIn.currentPage,
      pageSize: this.pagerConfigIn.pageSize
    }
    self.$emit('ajaxData', searchParams, this)
  },
  onAdvancedSearchBtnClick() {
    this.$emit('onAdvancedSearchBtnClick', {
      params: this.formSearchData,
      currentPage: this.pagerConfigIn.currentPage,
      pageSize: this.pagerConfigIn.pageSize
    }, this)
  }
  // filterData(data) {
  //   if (this.tableOptionFn()) {
  //     this.tableOptionFn().getTableData().tableData.filter((item, index) => {
  //       return Object.keys(item).reduce((prev, next) => {
  //         return '' + (self.getbasicDataType(item[prev]) === 'String' || self.getbasicDataType(item[prev]) === 'Number' ? item[prev] : '') +
  //           (self.getbasicDataType(item[next]) === 'String' || self.getbasicDataType(item[next]) === 'Number' ? item[next] : '')
  //       }).indexOf(data.keyword)
  //     })
  //   }
  // }
}
const proxyFn = {
  // resgistEventProxy() {
  // let arg=[...arguments]
  //   // 注册事件代理
  //   let self = this
  //   Object.keys(self.tableEventIn).forEach((item, index) => {
  //     self.$on(self.hyphenate(item), self.tableEventIn[item].bind(self))
  //   })
  // }
  handleSearch() {
    const filterName = this.$XEUtils.toString(this.filterName).trim().toLowerCase()
    if (filterName) {
      const filterRE = new RegExp(filterName, 'gi')
      const options = { children: 'list' }
      const searchProps = ['name', 'desc', 'type', 'enum', 'defVal']
      const rest = this.$XEUtils.searchTree(this.tableData, item => searchProps.some(key => item[key].toLowerCase().indexOf(filterName) > -1), options)
      this.$XEUtils.eachTree(rest, item => {
        searchProps.forEach(key => {
          item[key] = item[key].replace(filterRE, match => `<span class="keyword-lighten">${match}</span>`)
        })
      }, options)
      this.apiList = rest
      this.$nextTick(() => {
        if (this.$refs.xTable) {
          this.$refs.xTable.setAllTreeExpand(true)
        }
      })
    } else {
      this.apiList = this.tableData
      this.$nextTick(() => {
        if (this.$refs.xTable) {
          this.$refs.xTable.setTreeExpand(this.defaultExpandRows, true)
        }
      })
    }
  },
  // 调用频率间隔 500 毫秒
  searchEvent() {
    this.$XEUtils.debounce(function () {
      this.handleSearch()
    }, 500, { leading: false, trailing: true })
  }
}
const axiosEvent = {
  async $asyncGet(url, params, cb) { // 使用异步调用，返回结果后再执行
    await this.$http.get(url, params, origin)
  },
  async $asyncPost(url, params, cb) { // 使用异步调用，返回结果后再执行
    await this.$http.post(url, params, origin)
  },
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
const tableEvent = {
  keydown(obj) {
    this.$emit('keydown', obj, this, this.$refs.xGrid)
  }, // 当表格被激活且键盘被按下时会触发的事件  { $event }
  radioChange(obj) {
    this.$emit('radioChange', obj, this, this.$refs.xGrid)
  }, // 只对 type = radio 有效， 当手动勾选并且值发生改变时触发的事件 { row, rowIndex, $rowIndex, column, columnIndex, $columnIndex, $event }
  cellClick(obj) {
    this.$emit('cellClick', obj, this, this.$refs.xGrid)
  }, // 单元格被点击时会触发该事件 { row, rowIndex, $rowIndex, column, columnIndex, $columnIndex, $event }
  cellDblclick(obj) {
    this.$emit('cellDblclick', obj, this, this.$refs.xGrid)
  }, // 单元格被双击时会触发该事件 { row, rowIndex, $rowIndex, column, columnIndex, $columnIndex, $event }
  cellContextMenu(obj) {
    this.$emit('cellContextMenu', obj, this, this.$refs.xGrid)
  }, // 只对 context - menu 配置时有效， 单元格被鼠标右键时触发该事件 { type, row, rowIndex, $rowIndex, column, columnIndex, $columnIndex, $event }
  cellMouseenter(obj) {
    this.$emit('cellMouseenter', obj, this, this.$refs.xGrid)
  }, // 当单元格 hover 进入时会触发该事件 { row, rowIndex, $rowIndex, column, columnIndex, $columnIndex, $event }
  cellMouseleave(obj) {
    this.$emit('cellMouseleave', obj, this, this.$refs.xGrid)
  }, // 当单元格 hover 退出时会触发该事件 { row, rowIndex, $rowIndex, column, columnIndex, $columnIndex, $event }
  headerCellClick(obj) {
    this.$emit('headerCellClick', obj, this, this.$refs.xGrid)
  }, // 表头单元格被点击时会触发该事件 { $rowIndex, column, columnIndex, $columnIndex, triggerResizable, triggerSort, triggerFilter, $event }
  headerCellDblclick(obj) {
    this.$emit('headerCellDblclick', obj, this, this.$refs.xGrid)
  }, // 表头单元格被双击时会触发该事件 { $rowIndex, column, columnIndex, $columnIndex, $event }
  // headerCellContextMenu(obj) {
  //   this.$emit('headerCellContextMenu', obj, this, this.$refs.xGrid)
  // }, // 只对 context-menu 配置时有效，表头单元格被鼠标右键时触发该事件 { type, column, columnIndex, $event }
  footerCellClick(obj) {
    this.$emit('footerCellClick', obj, this, this.$refs.xGrid)
  }, // 表尾单元格被点击时会触发该事件 // { items, $rowIndex, column, columnIndex, $columnIndex, $event }
  footerCellDblclick(obj) {
    this.$emit('footerCellDblclick', obj, this, this.$refs.xGrid)
  }, // 表尾单元格被双击时会触发该事件 { items, $rowIndex, column, columnIndex, $columnIndex, $event }
  footerCellContextMenu(obj) {
    this.$emit('footerCellContextMenu', obj, this, this.$refs.xGrid)
  }, // 只对 context - menu 配置时有效， 表尾单元格被鼠标右键时触发该事件 { type, column, columnIndex, $event }
  sortChange(obj) {
    this.$emit('sortChange', obj, this, this.$refs.xGrid)
  }, // 当排序条件发生变化时会触发该事件 { column, column.property, order, $event }
  filterChange(obj) {
    this.$emit('filterChange', obj, this, this.$refs.xGrid)
  }, // 当筛选条件发生变化时会触发该事件 { column, property, values, datas, filters, $event }{ column, property, values, datas, filters, $event }
  resizableChange(obj) {
    this.$emit('resizableChange', obj, this, this.$refs.xGrid)
  }, // 当列宽拖动发生变化时会触发该事件 { $rowIndex, column, columnIndex, $columnIndex, $event }
  toggleRowExpand(obj) {
    this.$emit('toggleRowExpand', obj, this, this.$refs.xGrid)
  }, // 当行展开或收起时会触发该事件 { expanded, row, rowIndex, $rowIndex, column, columnIndex, $columnIndex, $event }
  toggleTreeExpand(obj) {
    this.$emit('toggleTreeExpand', obj, this, this.$refs.xGrid)
  }, // 当树节点展开或收起时会触发该事件 { expanded, row, column, columnIndex, $columnIndex, $event }
  contextMenuClick(obj) {
    this.$emit('contextMenuClick', obj, this, this.$refs.xGrid)
  }, // 只对 context-menu 配置时有效，当点击快捷菜单时会触发该事件 { menu, type, row, rowIndex, column, columnIndex, $event }
  currentChange(obj) {
    // this.performColCalculate(obj)
    this.$nextTick(() => {
      this.$emit('currentChange', obj, this, this.$refs.xGrid)
    })
  }, // 只对 highlightCurrentRow 有效，当手动选中行并且值发生改变时触发的事件 { row, rowIndex, $rowIndex, column, columnIndex, $columnIndex, $event }
  editClosed(obj) {
    this.performColCalculate(obj)
    this.$nextTick(() => {
      this.$emit('editClosed', obj, this, this.$refs.xGrid)
    })
  }, // 只对 edit-config 配置时有效，单元格编辑状态下被关闭时会触发该事件 { row, rowIndex, $rowIndex, column, columnIndex, $columnIndex }
  editActived(obj) {
    this.$emit('editActived', obj, this, this.$refs.xGrid)
  }, // 只对 edit-config 配置时有效，单元格被激活编辑时会触发该事件 { row, rowIndex, $rowIndex, column, columnIndex, $columnIndex }
  editDisabled(obj) {
    this.$emit('editDisabled', obj, this, this.$refs.xGrid)
  }, // 只对 edit-config 配置时有效，当单元格激活时如果是禁用状态时会触发该事件 { row, rowIndex, $rowIndex, column, columnIndex, $columnIndex }
  validError(obj) {
    this.$emit('validError', obj, this, this.$refs.xGrid)
  }, // 只对 edit-rules 配置时有效，当数据校验不通过时会触发该事件 { rule, row, rowIndex, $rowIndex, column, columnIndex, $columnIndex }
  scroll(obj) {
    this.$emit('scroll', obj, this, this.$refs.xGrid)
  }, // 表格滚动时会触发该事件 { type, scrollTop, scrollLeft, isX, isY, $event }
  custom(obj) {
    this.$emit('custom', obj, this, this.$refs.xGrid)
  },
  formSubmitInvalid(obj) {
    this.$emit('formSubmitInvalid', obj, this, this.$refs.xGrid)
  }, // 只对 form-config 配置时有效，表单提交时如果校验不通过会触发该事件 { data, errMap, $event }
  formReset(obj) {
    this.$emit('formReset', obj, this, this.$refs.xGrid)
  }, // 只对 form-config 配置时有效，表单重置时会触发该事件 { data, $event }
  formToggleCollapse(obj) {
    this.$emit('formToggleCollapse', obj, this, this.$refs.xGrid)
  }, // 只对 form-config 配置时有效，当折叠按钮被手动点击时会触发该事件 { collapse, data, $event }
  zoom(obj) {
    this.$emit('zoom', obj, this, this.$refs.xGrid)
  } // 当最大化或还原操作被手动点击时会后触发该事件 { type, $event }
  // checkboxChange(obj) {
  //   this.$emit('checkboxChange', obj,  this, this.$refs.xGrid)
  // } // 只对 type=checkbox 有效，当手动勾选并且值发生改变时触发的事件 { records, reserves, indeterminates, checked, row, rowIndex, $rowIndex, column, columnIndex, $columnIndex, $event }
  //  checkboxAll(obj) {
  //    this.$emit('checkboxAll', obj,  this, this.$refs.xGrid)
  //  }, // 只对 type=checkbox 有效，当手动勾选全选时触发的事件 { records, reserves, indeterminates, checked, $event }
  // 如果与工具栏关联， 在自定义列按钮被手动点击后会触发该事件 { type, $event }
  // pageChange(obj) {
  //      this.$emit('pageChange', obj,  this, this.$refs.xGrid)
  // }, // 只对 pager-config 配置时有效，分页发生改变时会触发该事件 { type, currentPage, pageSize, $event }
  // formSubmit (obj) {
  //   this.$emit('formSubmit', obj,  this, this.$refs.xGrid)
  // }, // 只对 form-config 配置时有效，表单提交时会触发该事件 { data, $event }
}
const calculateConstraintTool = {
  addMissingFieldsAndCalcColFormula(tableData) {
    // 添加缺失字段并执行全量列计算
    let self = this
    tableData = Array.isArray(tableData) ? tableData : []
    tableData.forEach((row) => {
      // self.tableColumnsFieldArr.forEach((item) => {
      //   // 遍历配置项生成的前缀数组，并且其前缀在数据包中不存在时，动态给其绑定一个前缀
      //   if (row[item] === undefined) {
      //     row[item] = ''
      //   }
      // })
      self.tableColumnsFieldArr.forEach((item) => {
        // 遍历配置项生成的前缀数组，并且其前缀在数据包中不存在时，动态给其绑定一个前缀
        row[item] = (typeof (row[item]) !== 'object' && self.getbasicDataType(row[item]) !== 'Null') ? (row[item] + '').replace(/null|NaN|undefined/ig, '') : row[item]
      })
      row = this.reductionColFormula(this.calculateConstraintConfig.colFormulaConfig, row)
      if (Array.isArray(row.children) && row.children.length && this.treeConfigIn) {
        row.children = self.addMissingFieldsAndCalcColFormula(row.children)
      }
    })
    return tableData
  },
  reductionColFormula(colFormulaMap, row) {
    // 单条数据计算
    // rowFormulaMap= { "colfield":"{colfield}[运算符]" }
    let colFormulaMapCp = this.deepCopy(colFormulaMap)
    let hasCalcColFormulaMap = {}
    let i = 0
    let ifWhilekey = true
    try {
      while (ifWhilekey) {
        let colFormulaMapArr = Object.keys(colFormulaMapCp)
        if (colFormulaMapArr.length) {
          for (let cmai = 0; cmai < colFormulaMapArr.length; cmai++) {
            i++
            let item = colFormulaMapArr[cmai]
            let formula = colFormulaMapCp[item]
            let regR = new RegExp('({[a-zA-Z0-9_]*})', 'ig')
            let rowsKey = formula.match(regR) === null ? [] : formula.match(regR)
            if (rowsKey.length) {
              for (let keyCF in rowsKey) {
                let keyC = rowsKey[keyCF].replace(/\{|\}/g, '')
                let reg = new RegExp('({' + keyC + '})', 'ig')
                if (row[keyC] !== undefined && !(hasCalcColFormulaMap[keyC] && colFormulaMapCp[keyC])) {
                  colFormulaMapCp[item] = formula.replace(reg, isNaN(parseFloat(row[keyC])) ? 0 : parseFloat(row[keyC]))
                } else if (hasCalcColFormulaMap[keyC]) {
                  colFormulaMapCp[item] = formula.replace(reg, hasCalcColFormulaMap[keyC])
                } else if (!colFormulaMapCp[keyC]) {
                  colFormulaMapCp[item] = formula.replace(reg, 0)
                }
              }
            } else {
              let calcResult = eval(formula)
              hasCalcColFormulaMap[item] = calcResult === Infinity || calcResult === -Infinity || isNaN(calcResult) ? '' : calcResult.toFixed(2)
              delete colFormulaMapCp[item]
            }
          }
        } else {
          ifWhilekey = false
        }
        if (i === 1000) {
          throw (new Error('请检查公式'))
        }
      }
    } catch (e) {
      // console.log(i)
      console.log(e, '当前公式为', colFormulaMapCp)
    }
    // console.log(hasCalcColFormulaMap)
    return Object.assign(row, hasCalcColFormulaMap)
  },
  reductionRowFormula(rowFormulaMap, data, tableId) {
    // 单元格交叉计算
    // rowFormulaMap= { "colField:rowIndex":"{tableId:colField:rowIndex}[运算符]" }
    let rowFormulaMapCp = this.deepCopy(rowFormulaMap)
    let hasCalcrowFormulaMap = {}
    let i = 0
    let ifWhilekey = true
    try {
      while (ifWhilekey) {
        let rowFormulaMapArr = Object.keys(rowFormulaMapCp)
        if (rowFormulaMapArr.length) {
          for (let cmai = 0; cmai < rowFormulaMapArr.length; cmai++) {
            i++
            let item = rowFormulaMapArr[cmai]
            let formula = rowFormulaMapCp[item]
            let regR = new RegExp('({[a-zA-Z0-9_:]*})', 'ig')
            let rowsKey = formula.match(regR) === null ? [] : formula.match(regR)
            if (rowsKey.length) {
              for (let keyCF in rowsKey) {
                let formulaArr = rowsKey[keyCF].replace(/\{|\}/g, '').split(':')
                let reg = new RegExp('({' + formulaArr.join(':') + '})', 'ig')
                if (formulaArr[0] === tableId) {
                  if (data[formulaArr[2]] && data[formulaArr[2]][formulaArr[1]] !== undefined && !(hasCalcrowFormulaMap[formulaArr[1] + ':' + formulaArr[2]] && rowFormulaMapCp[formulaArr[1] + ':' + formulaArr[2]])) {
                    rowFormulaMapCp[item] = formula.replace(reg, isNaN(parseFloat(data[formulaArr[2]][formulaArr[1]])) ? 0 : parseFloat(data[formulaArr[2]][formulaArr[1]]))
                  } else if (hasCalcrowFormulaMap[formulaArr[1] + ':' + formulaArr[2]]) {
                    rowFormulaMapCp[item] = formula.replace(reg, hasCalcrowFormulaMap[formulaArr[1] + ':' + formulaArr[2]])
                  } else if (!rowFormulaMapCp[formulaArr[1] + ':' + formulaArr[2]]) {
                    rowFormulaMapCp[item] = formula.replace(reg, 0)
                  }
                } else {
                  rowFormulaMapCp[item] = formula.replace(reg, 0)
                }
              }
            } else {
              let calcResult = eval(formula)
              hasCalcrowFormulaMap[item] = calcResult === Infinity || calcResult === -Infinity || isNaN(calcResult) ? '' : calcResult.toFixed(2)
              delete rowFormulaMapCp[item]
            }
          }
        } else {
          ifWhilekey = false
        }
        if (i === 100000) {
          throw (new Error('请检查公式'))
        }
      }
    } catch (e) {
      // console.log(i)
      console.log(e, '当前公式为', hasCalcrowFormulaMap)
    }
    Object.keys(hasCalcrowFormulaMap).forEach((item, index) => {
      let rowCellArr = item.split(':')
      if (data[rowCellArr[1]]) {
        data[rowCellArr[1]][rowCellArr[0]] = hasCalcrowFormulaMap[item]
      }
    })
    return data
  },
  // calculateRowData({ row }) {
  //   // 计算
  //   row = this.calculate(row, this.tableColumnsConfigIn)
  //   this.$refs.xGrid.reloadRow([row]).then(() => {}).catch(e => {})
  //   return row
  // },
  riverColumnsGenerateCalcColFormulaMap(columns, obj) {
    // 递归生成列计算全量映射
    let self = this
    obj = obj || {
      tableColumnsFieldMap: {},
      tableColumnsFieldArr: [],
      tableColumnsSingArr: [],
      tableColumnsTitleFieldMap: {},
      colFormulaConfig: {}
    }
    columns.forEach((conlum, index) => {
      if (Array.isArray(conlum.children) && conlum.children.length) {
        self.riverColumnsGenerateCalcColFormulaMap(conlum.children, obj)
      } else {
        if (conlum.field) {
          obj.tableColumnsFieldMap[conlum.field] = conlum
          obj.tableColumnsFieldArr.push(conlum.field)
          obj.tableColumnsSingArr.push(conlum)
          obj.tableColumnsTitleFieldMap[conlum.title] = conlum.field
          if (conlum.formula) {
            obj.colFormulaConfig[conlum.field] = conlum.formula
          }
        }
      }
    })
    return obj
  },
  generateCalcColFormulaMap(columns) {
    // 生成列计算公式映射
    let self = this
    let obj = this.riverColumnsGenerateCalcColFormulaMap(columns)
    self.tableColumnsFieldMap = obj.tableColumnsFieldMap
    self.tableColumnsFieldArr = obj.tableColumnsFieldArr
    self.tableColumnsSingArr = obj.tableColumnsSingArr
    self.tableColumnsTitleFieldMap = obj.tableColumnsTitleFieldMap
    this.calculateConstraintConfig = Object.assign({}, this.calculateConstraintConfig, {
      colFormulaConfig: obj.colFormulaConfig
    })
  },
  performColCalculate({ row, rowIndex, $rowIndex, column, columnIndex, $columnIndex }) {
    // 行改变事件执行列计算并刷新视图
    row = this.reductionColFormula(this.calculateConstraintConfig.colFormulaConfig, row)
    this.$refs.xGrid.reloadRow([row]).then(() => { }).catch(e => { })
    if (Object.keys(this.calculateConstraintConfig.rowformulaConfig).length) {
      this.$nextTick(() => {
        // xGrid.reloadData(xGrid.getTableData().fullData)
        this.$refs.xGrid.reloadData(this.reductionRowFormula(this.calculateConstraintConfig.rowformulaConfig, this.getListData(), this.id)).then().catch()
      })
    }
  },
  generateColumnsAllMap(columns, obj) {
    // 生成导入view映射数据
    let self = this
    obj = obj || {
      tableColumnsFieldMap: {},
      tableColumnsTitleFieldMap: {},
      viewToSourceMap: {},
      colFormulaConfig: {},
      rowsObjTemp: {},
      tableColumnsTitleMap: {}
    }
    columns.forEach((conlum, index) => {
      if (Array.isArray(conlum.children) && conlum.children.length) {
        self.riverColumnsGenerateCalcColFormulaMap(conlum.children, obj)
      } else {
        if (conlum.formula) {
          obj.colFormulaConfig[conlum.field] = conlum.formula
          obj.tableColumnsFieldMap[conlum.title] = conlum
        }
        if (conlum.field) {
          obj.rowsObjTemp[conlum.field] = ''
          let map = {
            needMap: true,
            options: [],
            multiple: false,
            formula: conlum.formula
          }
          obj.tableColumnsFieldMap[conlum.field] = conlum
          obj.tableColumnsTitleFieldMap[conlum.title] = conlum.field
          let itemRender = conlum.cellRender || conlum.editRender || conlum.contentRender
          if (itemRender) {
            switch (itemRender.name) {
              case '$vxeSelect':
                if (itemRender.props && itemRender.props.multiple) {
                  map = Object.assign({}, map, {
                    needMap: true,
                    name: itemRender.name,
                    options: Array.isArray(itemRender.options) ? itemRender.options : [],
                    multiple: true
                  })
                } else {
                  map = Object.assign({}, map, {
                    needMap: true,
                    name: itemRender.name,
                    options: Array.isArray(itemRender.options) ? itemRender.options : [],
                    multiple: false
                  })
                }
                break
              case '$vxeRadio':
                map = Object.assign({}, map, {
                  needMap: true,
                  name: itemRender.name,
                  options: Array.isArray(itemRender.options) ? itemRender.options : [],
                  multiple: false
                })
                break
              case '$vxeCheckbox':
                map = Object.assign({}, map, {
                  needMap: true,
                  name: itemRender.name,
                  options: Array.isArray(itemRender.options) ? itemRender.options : [],
                  multiple: true
                })
                break
              case '$vxeSwitch':
                map = Object.assign({}, map, {
                  needMap: true,
                  name: itemRender.name,
                  options: Array.isArray(itemRender.options) ? itemRender.options : [],
                  multiple: false
                })
                break
              default:
                map = Object.assign({}, map, {
                  needMap: false,
                  // pattern: ((itemRenderName, itemRenderType) => {
                  //   switch (itemRenderName) {
                  //     case '$vxeInput':
                  //       // text, search, number, integer, float, password, date, time, datetime, week, month, year
                  //       switch (itemRenderType) {
                  //         case 'string':
                  //           return (str) => {
                  //             // 空
                  //             str = str && str.toString()
                  //             return !(str && str.trim() !== '')
                  //           }
                  //         case 'number':
                  //           // 数字
                  //           return (str) => {
                  //             return /^[0-9]*$/.test(str)
                  //           }
                  //         case 'integer':
                  //           // 数字
                  //           return (str) => {
                  //             return /^[1-9]+[0-9]*$/.test(str)
                  //           }
                  //         case 'time':
                  //           // 时间
                  //           return (str) => {
                  //             return /^\d*(?:\.\d{0,2})?$/.test(str)
                  //           }
                  //         case 'year':
                  //           // 年
                  //           return (str) => {
                  //             return /^[1,9]{4}/.test(str)
                  //           }
                  //         case 'float':
                  //           // 2位小叔
                  //           return (str) => {
                  //             return /^-?\d+\.?\d{0,2}$/.test(str)
                  //           }
                  //       }
                  //       break
                  //     case '$vxeMoney':
                  //       return (str) => {
                  //         return /^-?\d+\.?\d{0,2}$/.test(str)
                  //       }
                  //     case '$vxeCalculate':
                  //       return (str) => {
                  //         return /^-?\d+\.?\d{0,2}$/.test(str)
                  //       }
                  //     case '$vxeEditDownTextarea':
                  //       return (str) => {
                  //         str = str && str.toString()
                  //         return !(str && str.trim() !== '')
                  //       }
                  //     case '$vxeDays': {
                  //       return (str) => {
                  //         return /^-?\d+\.?\d{0,2}$/.test(str)
                  //       }
                  //     }
                  //     case '$vxeTime': {
                  //       return (str) => {
                  //         return /^-?\d+\.?\d{0,2}$/.test(str)
                  //       }
                  //     }
                  //     case '$vxeText': {
                  //       return (str) => {
                  //         return /^-?\d+\.?\d{0,2}$/.test(str)
                  //       }
                  //     }

                  //     default:
                  //       break
                  //   }
                  // })(itemRender.name, itemRender.props && itemRender.props.type),
                  name: itemRender.name,
                  options: Array.isArray(itemRender.options) ? itemRender.options : [],
                  multiple: false
                })
                break
            }
          } else {
            map = Object.assign({}, map, {
              needMap: false
            })
          }
          obj.viewToSourceMap[conlum.field] = map
        }
      }
    })
    return obj
  },
  deaImportViewData(obj = {
    conlums: [],
    viewData: [],
    editRules: {}
  }) {
    // 处理 导入数据
    let self = this
    let { viewToSourceMap, tableColumnsTitleFieldMap, tableColumnsFieldMap, rowsObjTemp, colFormulaConfig } = this.generateColumnsAllMap(obj.conlums)
    let validResult = true
    let validResultFieldTitle = []
    // let valiRule = []
    let viewData = obj.viewData.map((row, rowIndex) => {
      Object.keys(row).forEach((key, keyIndex) => {
        let parseViewValue = self.reverseParseViewDataTosource(viewToSourceMap[tableColumnsTitleFieldMap[key]], row[key])
        // const customVal = String(parseViewValue).replace(/null|undefined|\s+/ig, '') !== ''
        if (tableColumnsFieldMap[tableColumnsTitleFieldMap[key]]) {
          // self.validCellRules({ type: 'all', row, column: tableColumnsFieldMap[tableColumnsTitleFieldMap[key]], val: parseViewValue, editRules: obj.editRules })
          //   .then(() => {
          //     if (customVal) {
          row[tableColumnsTitleFieldMap[key]] = parseViewValue
          //   }
          // })
          // .catch(({ rule }) => {
          //   validResult = false
          //   valiRule.push(rule)
          //   if (customVal) {
          //     row[tableColumnsTitleFieldMap[key]] = parseViewValue
          //   }
          // })
        } else {
          validResultFieldTitle.push(key)
        }
      })
      row = Object.assign({}, rowsObjTemp, row)
      return this.reductionColFormula(colFormulaConfig, self.reductionColFormula(colFormulaConfig, row))
    })
    return validResult && !validResultFieldTitle.length && viewData
  },
  dealExportViewData(obj = {
    conlums: [],
    viewData: []
  }) {
    // 处理 导入数据
    let self = this
    let { viewToSourceMap, tableColumnsTitleFieldMap, rowsObjTemp, colFormulaConfigm, colFormulaConfig } = this.generateColumnsAllMap(obj.conlums)
    return obj.viewData.map((row, rowIndex) => {
      Object.keys(row).map((key, keyIndex) => {
        row[tableColumnsTitleFieldMap[key]] = self.reverseParseViewDataTosource(viewToSourceMap[tableColumnsTitleFieldMap[key]], row[key])
      })
      row = Object.assign({}, rowsObjTemp, row)
      return this.reductionColFormula(colFormulaConfigm, self.reductionColFormula(colFormulaConfig, row))
    })
  },
  reverseParseViewDataTosource(viewToSourceMap, value) {
    // 处理单个 导入数据
    //  needMap: true,
    //  name: itemRender.name,
    //  options: Array.isArray(itemRender.options) ? itemRender.options : [],
    //  multiple: true,
    //  formula: conlum.formula
    if (viewToSourceMap && viewToSourceMap.needMap) {
      let transValue = ''
      let viewValue = typeof (value) === 'string' ? value : ''
      if (viewToSourceMap.multiple) {
        if (viewValue.length) {
          let viewToSourceValueArr = []
          viewToSourceMap.options.forEach((item, index) => {
            if (viewValue.indexOf(item.label) >= 0) {
              viewToSourceValueArr.push(item.value)
            }
          })
          transValue = viewToSourceValueArr.join(',')
        } else {
          transValue = ''
        }
      } else {
        viewToSourceMap.options.forEach((item, index) => {
          if (viewValue.indexOf(item.label) >= 0) {
            transValue = item.value
          }
        })
      }
      return transValue
    } else {
      return value
    }
  },
  newRule(rule) {
    // 错误规则信息
    return Object.assign({}, {
      $options: rule,
      required: rule.required,
      min: rule.min,
      max: rule.min,
      type: rule.type,
      pattern: rule.pattern,
      validator: rule.validator,
      trigger: rule.trigger,
      maxWidth: rule.maxWidth,
      message: rule.message
    })
  },
  validCellRules(argObj) {
    // 校验单元格
    let self = this
    const { type, row, column, val, editRules } = argObj
    const property = column.field
    const errorRules = []
    const syncVailds = []
    if (property && editRules) {
      const rules = self.$XEUtils.get(editRules, property)
      if (rules) {
        const cellValue = self.$XEUtils.isUndefined(val) ? self.$XEUtils.get(row, property) : val
        rules.forEach(rule => {
          if (type === 'all' || !rule.trigger || type === rule.trigger) {
            if (self.$XEUtils.isFunction(rule.validator)) {
              let customValid
              customValid = rule.validator({
                cellValue,
                rule,
                rules,
                row,
                rowIndex: row.index,
                column,
                $table: this
              })
              if (customValid) {
                if (self.$XEUtils.isError(customValid)) {
                  this.validRuleErr = true
                  errorRules.push(self.newRule({ type: 'custom', trigger: rule.trigger, message: customValid.message, rule: self.newRule(rule) }))
                } else if (customValid.catch) {
                  // 如果为异步校验（注：异步校验是并发无序的）
                  syncVailds.push(
                    customValid.catch(e => {
                      this.validRuleErr = true
                      errorRules.push(self.newRule({ type: 'custom', trigger: rule.trigger, message: e ? e.message : rule.message, rule: self.newRule(rule) }))
                    })
                  )
                }
              }
            } else {
              const isNumber = rule.type === 'number'
              const numVal = isNumber ? self.$XEUtils.toNumber(cellValue) : self.$XEUtils.getSize(cellValue)
              if (rule.required && (cellValue === null || cellValue === undefined || cellValue === '')) {
                this.validRuleErr = true
                errorRules.push(self.newRule(rule))
              } else if (
                (isNumber && isNaN(cellValue)) ||
                (!isNaN(rule.min) && numVal < parseFloat(rule.min)) ||
                (!isNaN(rule.max) && numVal > parseFloat(rule.max)) ||
                (rule.pattern && !(rule.pattern.test ? rule.pattern : new RegExp(rule.pattern)).test(cellValue))
              ) {
                this.validRuleErr = true
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
  exportByTempalte(obj = {
    data: [], // 模版数据，只拿第一行导出列配置
    conlums: [] // 所有表头
  }) {
    // 按模版导出
    let exportConlums = []
    let exportConlumsTitle = obj.data[0]
    const { tableColumnsTitleMap } = this.generateColumnsAllMap(obj.conlums)
    exportConlumsTitle.forEach((item, index) => {
      tableColumnsTitleMap[item] && exportConlums.push(tableColumnsTitleMap[item])
    })
    const fullData = this.getTableData().fullData
    const selection = this.selection
    this.$Export.exportExcel({
      isExportTree: true,
      saveType: '.xlsx',
      fileName: 'export', // 文件名
      dataType: 'fullData',
      isExportHead: true, // 是否导出表头
      isExportFooter: false, // 是否导出表尾部
      isExportOnlySourceField: false, // 是否只导出数据源表头字段，
      isExportOnlyViewTitle: false, // 是否只导出数据表头名称，
      isExportOriginalData: false, // 是否导出源数据
      isExportData: true, // 是否导出数据
      columns: exportConlums, // 表头配置
      fullData: fullData,
      datas: [], // 源数据,
      selection: selection, // 选中数据
      index: true // 是否添加序号,
    }, this)
  }
}
const otherFn = {
  getListData() {
    // 获取表单数据
    const { fullData } = this.$refs.xGrid.getTableData()
    const data = fullData || []
    return this.deepCopy(this.dealData(data))
  },
  dealData(data) {
    let newData = []
    data.forEach((item) => {
      const itemVal = Object.assign({}, item)
      Object.keys(itemVal).map((val) => {
        let value = String(itemVal[val]) || ''
        if (value.includes('initId')) {
          const prefix = val.substr(0, val.indexOf('id'))
          itemVal[val] = ''
          itemVal[prefix + 'code'] = ''
          itemVal[prefix + 'name'] = ''
        }
      })
      newData.push(itemVal)
    })
    return newData
  },
  regTreePrefix(item) {
    const reg = /\w*_$/g
    return reg.test(item)
  },
  // 遍历正则对象，给树统一自动添加正则
  addTreeReg(formValidationConfig) {
    const reg = /^(?!initId)/g
    Object.keys(formValidationConfig).forEach((item) => {
      if (this.regTreePrefix(item)) {
        formValidationConfig[item][0].pattern = reg
      }
    })

    return formValidationConfig
  },
  // 遍历，动态给树组件添加双向绑定的前缀
  addTreePrefixKey2(treeData) {
    const reg = /_id$/
    let treeArr = treeData || []
    treeArr.forEach((row) => {
      Object.keys(row).forEach((item) => {
        // 以_id结尾，并且其前缀在数据包中不存在时，动态给其绑定一个前缀
        if (reg.test(item)) {
          const prefix = item.substr(0, item.indexOf('id'))
          if (!row.hasOwnProperty(prefix)) {
            this.$set(row, prefix, '')
          }
        }
      })
    })
    return treeData
  }
}
export default {
  ...util, // 工具类
  ...sortMethos,
  ...axiosEvent,
  ...initMethods, // prop更新方法以及初始化函数
  ...registFn, // 渲染注册函数
  ...tableEventFn, // 表格事件
  ...toolBarEvent, // toolbar事件
  ...pageEvent, // 分页事件
  ...formatters, // 全局formatter函数
  ...tableOptionFn, // 表格操作函数
  ...proxyFn, // 代理函数
  ...tableEvent, // 表格事件
  ...otherFn, // 其他函数
  ...calculateConstraintTool
}
