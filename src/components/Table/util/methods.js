/* eslint-disable no-useless-escape */
/* eslint-disable no-eval */
/* eslint-disable no-new-func */
// methods   Author:Titans@2396757591@qq.com
import { tableColumns, filterTypeMap } from '../config/tableDefaultConfig'
import formatters from './formatter'
import util from '../tool/util.js'
import evalCalcUtil from '../../tool/eval/index.js'
import { getColumnMoneyFilterConfig } from '../tool/tableColumnMoneyFilter'
import XEUtils from 'xe-utils'

// 唯一行id属性名称
export const rowUuidKeyName = '__BOSS_UUID'

// 设置树形表格唯一键
const setRowUuidKey = (rows, instance) => {
  if (instance?.treeConfig && instance?.isTreeSeqToFlat && rows) {
    XEUtils.eachTree(Array.isArray(rows) ? rows : [rows], item => {
      !item[rowUuidKeyName] && Reflect.set(item, rowUuidKeyName, XEUtils.uniqueId(`${rowUuidKeyName}_`))
    })
  }
}

const sortMethods = {
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
  },
  arrSortString({ $table, data, column, property, order }) {
    // 字符 排序
    data.sort(function (a, b) {
      if (order === 'asc') {
        return (String(a[property])).localeCompare(String(b[property]))
      } else {
        return (String(b[property])).localeCompare(String(a[property]))
      }
    })
    return data
  },
  arrSortNumber({ $table, data, column, property, order }) {
    // 数字 排序
    data.sort(function (a, b) {
      if (order === 'asc') {
        return a[property] - b[property]
      } else {
        return b[property] - a[property]
      }
    })
    return data
  },
  arrSortStringSuffix({ $table, data, column, property, order, rTypeSuffix }) {
    // 通用 排序 new
    data.sort(function (a, b) {
      if (order === 'asc') {
        return (String(a[property])).localeCompare(String(b[property]))
      } else {
        return (String(b[property])).localeCompare(String(a[property]))
      }
    })
    return data
  },
  arrSortNumberSuffix({ $table, data, column, property, order, rTypeSuffix }) {
    // 通用 排序 new
    data.sort(function (a, b) {
      if (order === 'asc') {
        return parseFloat(a[property]) - parseFloat(b[property])
      } else {
        return parseFloat(b[property]) - parseFloat(a[property])
      }
    })
    return data
  },
  arrSort({ $table, data, column, property, order }) {
    // 排序
    let self = this
    const sortTypeMap = {
      // number类型排序
      $vxeMoney: 'arrSortNumberSuffix',
      $vxeDays: 'arrSortNumberSuffix',
      $vxeCalculate: 'arrSortNumberSuffix',
      // 字符类型排序
      $vxeTree: 'arrSortStringSuffix',
      $vxeInput: 'arrSortStringSuffix',
      $vxeSelect: 'arrSortStringSuffix',
      $vxeEditDownTextarea: 'arrSortStringSuffix',
      $vxeTime: 'arrSortStringSuffix',
      $vxeRadio: 'arrSortStringSuffix',
      $vxeCheckbox: 'arrSortStringSuffix',
      $$vxeEditDownJson: 'arrSortStringSuffix',
      $vxeEditDownConditions: 'arrSortStringSuffix',
      $vxeInterlet: 'arrSortStringSuffix'
    }
    let render = (column.own && (column.own.editRender || column.own.cellRender || column.own.contentRender))
    if (render && render.name && sortTypeMap[render.name]) {
      return self[sortTypeMap[render.name]]({ $table, data, column, property, order, rTypeSuffix: '__viewSort' })
    } else {
      data.sort(function (a, b) {
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
        self.registSingelRowConfig(arrc, item, index)
        if (Array.isArray(item.children) && item.children.length) {
          self.registGloableConlumsConfig(item.children)
        }
      })
    }
    reverRegistGloableConlumsConfig(arr)
  },
  registSingelRowConfig(arr, item, index) {
    // 注册 单条数据配置项
    let self = this
    arr[index] = self.registSingelRowFilter(item)
    // self.registSingelRowFormater(item)
    // self.registSingelRowSorts(item)
    // self.registSingelRowRenderer(item)
    // self.registSingRowCalcRenderer(item)
  },
  registSingRowCalcRenderer(item) {
    // 注册单条数据计算渲染器
    if (item.formula && !item.editRender) {
      item.editRender = {
        name: '$vxeCalculate'
      }
    }
  },
  registSingelRowFilter_old(item) {
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
            item.filters = [{ data: { type: 'has', isCase: false, value: '', dataType: 'float' } }]
            item.filterRender = { name: 'FilterComplex' }
            break
          case '$vxeCalculate':
            item.filters = [{ data: { type: 'has', isCase: false, value: '', dataType: 'float' } }]
            item.filterRender = { name: 'FilterComplex' }
            break
          case '$moneyRender':
            item.filters = [{ data: { type: 'has', isCase: false, value: '', dataType: 'float' } }]
            item.filterRender = { name: 'FilterComplex' }
            break
          case '$vxeMoney':
            item.filters = [{ data: { type: 'has', isCase: false, value: '', dataType: 'float' } }]
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
                  item.filters = [{ data: { type: 'has', isCase: false, value: '', dataType: 'float' } }]
                  item.filterRender = { name: 'FilterComplex' }
                  break
                case 'number':
                  item.filters = [{ data: { type: 'has', isCase: false, value: '', dataType: 'number' } }]
                  item.filterRender = { name: 'FilterComplex' }
                  break
                case 'year':
                  item.filters = [{ data: { type: 'has', isCase: false, value: '', dataType: 'year' } }]
                  item.filterRender = { name: 'FilterComplex' }
                  break
                case 'date':
                  item.filters = [{ data: { type: 'has', isCase: false, value: '', dataType: 'date' } }]
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
  registSingelRowFilter(item) {
    // 绑定单条列过滤器配置
    if (Array.isArray(item.children)) {
      return item
    }
    try {
      let itemRender = item.cellRender || item.editRender
      if (itemRender && ((item.filters + '' === 'true') || item.filters + '' === 'undefined')) {
        if (itemRender.name && filterTypeMap[itemRender.name]) {
          if (itemRender.name === '$vxeInput') {
            if (this.getbasicDataType(itemRender.props) === 'Object' && filterTypeMap['$vxeInput'][itemRender.name + itemRender.props.type]) {
              item = Object.assign({}, item, filterTypeMap['$vxeInput'][itemRender.name + itemRender.props.type])
            } else {
              item = Object.assign({}, item, filterTypeMap['$vxeInput'][itemRender.name + 'global'])
            }
          } else {
            item = Object.assign({}, item, filterTypeMap[itemRender.name])
          }
        } else {
          switch (itemRender.name) {
            default:
              if (['seq', 'checkbox', 'dragSort', 'radio', 'optionRow'].indexOf(item.type) >= 0) {
                delete item.filters
                delete item.filterRender
                delete item.filterMethod
              } else {
                item.filters = [{ data: '' }]
                item.filterRender = { name: 'FilterInput' }
              }
              break
          }
        }
      } else if (!(typeof item.filters === 'object')) {
        item.filters = false
      } else {
      }
    } catch (e) {
      throw (e)
    }
    return item
  },
  registSingelRowFormater(item) {
    // 绑定单条列格式化配置 废弃
    let self = this
    if (item.field && self.tableConfigCp.formatters[item.field]) {
      item.formatter = self.tableConfigCp.formatters[item.field]
    }
  },
  registSingelRowRenderer(item) {
    // 绑定单条列渲染器配置 废弃
    let self = this
    let itemRender = item.cellRender || item.editRender || item.contentRender
    if (item.field && self.tableConfigCp.cellRenderConfig[item.field] && !itemRender) {
      item[self.tableConfigCp.cellRenderConfig[item.field].type] = self.tableConfigCp.cellRenderConfig[item.field]
    }
  },
  registSingelRowSorts(item) {
    // 绑定单条列排序配置
    if (!item.children && item['sortable'] === undefined) {
      item['sortable'] = item['sortable'] || true
    }
  },
  registRenderers(arr = []) {
    // 初始化绑定列渲染器
    let self = this
    function reverRegistRenderers(arrc) {
      arrc.forEach((item, index) => {
        reverRegistRenderers(item)
        if (Array.isArray(item.children) && item.children.length) {
          self.registRenderers(item.children)
        }
      })
    }
    reverRegistRenderers(arr)
  },
  registFilters(arr = []) {
    // 初始化绑定列过滤器函数 废弃
    let self = this
    arr.forEach((item, index) => {
      self.registSingelRowFilter(item)
      if (Array.isArray(item.children) && item.children.length) {
        self.registFormatters(item.children)
      }
    })
  },
  registFormatters(arr = []) {
    // 初始化绑定列格式化函数 废弃
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
const initMethods = {
  initCreated() {
    this.initColumnMoneyFilter()

    // 初始化Created
    // 即将废弃
    // this.registTableRender(defaultRenderers)
    // this.registGlobleFormatters(defaultFormatters)
    // this.tableGlobalConfig.dragColumnsConfig && this.tableGlobalConfig.dragColumnsConfig.openDrag && this.setColumnDrop()
  },
  initMounted() {
    // 初始化Mounted
    this.initFirst()
    if ((this.tableGlobalConfigIn.dragColumnsConfig && this.tableGlobalConfigIn.dragColumnsConfig.openDrag) || this.tableGlobalConfigIn.columnDrop) {
      this.setColumnDrop()
    }
    if (this.tableGlobalConfigIn.rowDrop) {
      this.setRowDrop()
    }
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
    this.initCalculateConstraintConfig()
    this.initTableConfig()
    this.initEditRules()
    this.initTable()
    this.initTableData()
  },
  initTable() {
    this.initTableConlums()
    this.setPagerConfig()
  },
  initColumnMoneyFilter() {
    // 金额过滤
    this.setColumnMoneyFilter(this.tableColumnsConfig)
    this.completeMoneyFilter = true
  },
  initTableGlobalConfig() {
    // 初始化全局配置
    this.tableGlobalConfigIn = Object.assign({}, this.tableGlobalConfigIn, this.tableGlobalConfig)
  },
  initTableConfig() {
    // 初始化表格列和渲染器配置
    this.tableConfigCp = Object.assign({
      globalConfig: {
        checkType: 'checkbox',
        seq: true,
        filters: true,
        sortable: false
      }
    }, this.tableConfig || this.tableGlobalConfigIn.tableConfig)
    this.registTableRender(this.tableConfigCp.renderers)
  },
  initCacheColumn() {
    let data = JSON.parse(localStorage.getItem(this.tableId || '') || '[]').map((k, v) => ({ field: k, index: v }))
    let tableColumnsConfig = JSON.parse(JSON.stringify(this.tableColumnsConfig))
    let arr = data.length
      ? tableColumnsConfig.map(item => {
        let obj = {}
        for (let item2 of data) {
          if (item.field === item2.field) {
            obj = { ...item, ...item2 }
          }
        }
        return obj
      }) : []
    arr.sort((a, b) => {
      return a.index - b.index
    })
    return arr.length ? arr : tableColumnsConfig
  },
  initTableConlums(columnsConfig) {
    // 初始化列配置
    this.calculateConstraintConfigIn = Object.assign({}, this.calculateConstraintConfigIn)
    const tableColumnsConfig = (this.tableGlobalConfig.dragColumnsConfig && this.tableGlobalConfig.dragColumnsConfig.cacheStatus) ? this.initCacheColumn() : (columnsConfig || this.tableColumnsConfig)
    if (tableColumnsConfig.length) {
      this.generateCalcColFormulaMap(tableColumnsConfig)
      this.tableColumnsConfigIn = this.unidirectionalData ? this.deepCopy(this.generateTableConlums(tableColumnsConfig, this.tableConfigCp.globalConfig)) : this.generateTableConlums(tableColumnsConfig, this.tableConfigCp.globalConfig)
    } else {
      this.tableColumnsConfigIn = []
    }
    return this.tableColumnsConfigIn
  },
  initScrollLoadConfig(scrollLoadConfig) {
    this.scrollLoadConfigCp = Object.assign({}, this.scrollLoadConfigCp, scrollLoadConfig || this.scrollLoadConfig)
  },
  generateTableConlums(conlums, globalConfig) {
    // 生成表头
    let tableColumnsConfigIn = []
    if (globalConfig.rowDrop) {
      tableColumnsConfigIn.push(tableColumns['rowDrop'])
    }
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
  },
  generateBottomGroupTotal() {
    // 根据表格上面已算好的分组合计，求最下面的分组合计

  },
  initCalculateConstraintConfig() {
    // 初始化计算和约束配置
    this.calculateConstraintConfigIn = Object.assign({}, this.calculateConstraintConfigIn, this.calculateConstraintConfig)
    if (this.calculateConstraintConfigIn.cellDataConfig && this.calculateConstraintConfigIn.cellDataConfig.length) {
      this.generatGetDataConfigMap(this.calculateConstraintConfigIn.cellDataConfig)
    }
    this.constrainRowDataMap = {}
  },
  initToolbar(toolbarConfig) {
    // 初始化工具栏
    let curtoolbarConfig = toolbarConfig || this.toolbarConfig
    if (this.getbasicDataType(curtoolbarConfig) === 'Boolean') {
      this.toolbarConfigIn = undefined
      this.toolbarConfigInCopy = this.toolbarConfigInCp || {}
    } else {
      if (curtoolbarConfig.visible === false) {
        this.toolbarConfigIn = undefined
        this.toolbarConfigInCopy = this.toolbarConfigInCp
      } else {
        this.toolbarConfigIn = Object.assign({}, this.toolbarConfigInCp, curtoolbarConfig)
        this.toolbarConfigInCopy = this.toolbarConfigIn
      }
      if (this.toolbarConfigInCopy.yearlist.length) {
        this.formSearchData.year = this.toolbarConfigInCopy.yearlist[0]
      }
      this.setMoneyUnit(this.moneyUnit)
    }
  },
  loadScrollTableData(data) {
    // 加载滚动加载数据
    let self = this
    this.initCalculateConstraintConfig()
    // 初始化表格数据
    this.selection = []
    if (this.$refs.xGrid) {
      this.$refs.xGrid.$refs.xTable.tableSourceData = []
      this.$refs.xGrid.removeCheckboxRow()
    }
    this.tableDataIn = this.getTableData().fullData.concat(this.addMissingFieldsAndCalcColFormula(data))
    this.$nextTick().then(() => {
      if (self.$refs.xGrid) {
        self.$refs.xGrid.reloadData(self.tableDataIn).then(() => {
          self.$refs.xGrid.clearFilter().then(() => {
            self.$refs.xGrid.$refs.xTable.tableSourceData = self.deepCopy(self.getTableData().fullData)
            self.$refs.xGrid.$refs.xTable.handleDefaults()
          })
        })
      }
    })
    return this.tableDataIn
  },
  initCalcPublicData() {
    // calcPublicData: {
    // }
    // rowCalcData: { },
    // cellCaclData: { },
    // cellCodeCalcData: { }
    // }
  },
  initTableData(data) { // 初始化表格数据
    // 执行顺序： 取数-->行内计算-->分级汇总-->父级行内计算-->单元格交叉计算(涉及的行计算)-->行约束-->单元格约束
    let self = this
    this.initCalculateConstraintConfig()
    this.selection = []
    data = Array.isArray(data || this.tableData) ? (data || this.tableData) : []

    // 为树形数据设置唯一属性
    setRowUuidKey(data, this)

    return new Promise((resolve, reject) => {
      this.rePerformAllCalcAndConstraintByData(self.unidirectionalData ? self.deepCopy(data) : data, true).then(({ dataCodeRowMap, dataCodeRowArr, afterCalcData }) => {
        self.tableDataMap = dataCodeRowMap
        self.tableDataIn = self.addMissingFields(self.deepCopy(afterCalcData))
        self.$nextTick().then(() => {
          let xGrid = self.$refs.xGrid
          if (xGrid) {
            xGrid.reloadData(self.tableDataIn).then(() => {
              xGrid.clearFilter().then(() => {
                xGrid.$refs.xTable.tableSourceData = self.deepCopy(self.getTableData().fullData)
                xGrid.$refs.xTable.handleDefaults()
                self.$emit('onTableDataLoaded', self.tableDataIn, self, xGrid)
                resolve(self.tableDataIn)
              })
            })
          } else {
            resolve(self.tableDataIn)
          }
        })
      })
    })
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
      seqMethod(data) {
        const { seq, $seq, row } = data

        if (self.pagerConfigIn && !self.treeConfig) {
          return (self.pagerConfigIn.pageSize > 0 ? self.pagerConfigIn.pageSize : 20) * ((self.pagerConfigIn.currentPage > 0 ? self.pagerConfigIn.currentPage : 1) - 1) + seq
        } else {
          let finalSeq = $seq === '' || $seq === undefined ? seq : $seq + '.' + seq
          if (self.isTreeSeqToFlat) {
            const arr = XEUtils.toTreeArray(self.getTableData().treeExpandData)
            const index = arr.findIndex(item => item[rowUuidKeyName] === row[rowUuidKeyName])
            // 根据第一行是否是合计行判断
            if (arr[0]?.id === '#') {
              finalSeq = row.id === '#' ? '#' : index
            } else {
              finalSeq = index + 1
            }
          }

          // return $seq === '' || $seq === undefined ? seq : $seq + '.' + seq
          return finalSeq
        }
      }
    }
  },
  initEditConfig() { // 编辑配置
    // 暂时性方案，后期调整
    if (this.getbasicDataType(this.editConfig) === 'Boolean') {
      // this.editConfigIn = false
      this.editConfigIn = {
        trigger: 'dblclick',
        mode: 'cell',
        activeMethod: ({ row, rowIndex, column, columnIndex }) => {
          return false
        },
        showStatus: false
      }
    } else if (this.getbasicDataType(this.editConfig) === 'Object') {
      if (this.editConfig.editable !== false) {
        this.editConfigIn = Object.assign(this.editConfigInCp, this.editConfig)
      } else {
        this.editConfigIn = {
          trigger: 'dblclick',
          mode: 'cell',
          activeMethod: ({ row, rowIndex, column, columnIndex }) => {
            return false
          },
          showStatus: false
        }
      }
    }
  },
  refreshTableIsEdit() {
    // 重新渲染刷新表格

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
      this.treeConfigIn = Object.assign({
        dblExpandAll: false, // 双击展开当前节点树形数据
        onlyDblTreeNodeExpand: false, // 在不允许编辑模式下是否仅仅双击树列才允许执行展开
        dblExpand: false, // 是否执行双击展开树形数据
        children: 'children',
        // 是否为手风琴效果
        accordion: false
      }, this.treeConfig)
    }
  },
  initFooterConfig() {
    // 更新footer配置
    this.footerConfigIn = Object.assign({}, this.footerConfigIn, this.footerConfig)
  },
  initEditRules() {
    // 编辑校验规则
    this.editRulesIn = Object.assign({}, this.editRules)
    // this.editRulesIn = Object.assign({}, this.editRulesIn, this.addTreeReg({ ...this.editRules }))
  }
}
const tableOptionFn = {
  // 获取传入表头数据
  transTableCloumnToSource(cloumn) {
    if (!cloumn) return []
    const newColumn = []
    cloumn.forEach((k, v) => {
      k.own && newColumn.push(k.own)
      if (k && k.children) {
        newColumn[v].children = []
        newColumn[v].children.push(...this.transTableCloumnToSource(k.children))
      }
    })
    return newColumn
  },
  tableOptionFn() {
    // 全局表格组件xgrid调用实例
    return this.$refs.xGrid
  },
  updateFooter() {
    // 更新表尾
    return this.$refs.xGrid.updateFooter()
  },
  updateData() {
    // 刷新数据
    this.$refs.xGrid.updateData().then(() => {
      this.$refs.xGrid.updateFooter()
    })
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
    this.$refs.xGrid.setAllCheckboxRow(true).then(() => {
      this.updateFooter().then(() => { }).catch(() => { })
    })
  },
  clearCheckboxRow() {
    // 清除所有选中
    this.$refs.xGrid.clearCheckboxRow().then(() => {
      this.updateFooter().then(() => { }).catch(() => { })
    })
  },
  removeCheckboxRow() {
    // 删除选中行操作
    let self = this
    self.$refs.xGrid.removeCheckboxRow()
  },
  revertEvent() {
    // 撤销操作
    this.$XModal.confirm('您确定要还原数据吗?').then(type => {
      if (type === 'confirm') {
        // this.$refs.xGrid.revertData()
        this.reLoadTable()
      }
    })
  },
  deleteSelectedRow() {
    // 删除选中记录行的数据（不是复选框的）
    let self = this
    this.$XModal.confirm('您确定要删除所选中数据吗?').then(type => {
      if (type === 'confirm') {
        self.$refs.xGrid.removeCurrentRow()
      }
    })
  },
  deleteRowData(rows) {
    // 删除选中行操作
    let self = this
    return new Promise((resolve, reject) => {
      self.$XModal.confirm('您确定要删除所选中数据吗?').then(type => {
        if (type === 'confirm') {
          self.$refs.xGrid.removeCheckboxRow(rows).then((res) => {
            resolve(res)
          }).catch(e => {
            reject(e)
          })
        } else {
          resolve(false)
        }
      })
    })
  },
  async copySelectionRowData(obj = {}) {
    // 复制选中行数据
    let self = this
    return new Promise((resolve, reject) => {
      const { rowIndexTo, data } = obj
      let rowTo = rowIndexTo === undefined ? -1 : rowIndexTo
      let newRowSelectionsData = data || self.$refs.xGrid.getCheckboxRecords()
      if (newRowSelectionsData.length) {
        newRowSelectionsData.forEach((item, index) => {
          Object.keys(item).forEach((key) => {
            if (key.indexOf('__') >= 0) {
              delete item[key]
            }
          })
          item = Object.assign({}, item, {
            insertMark: '新数据',
            date: new Date().format('YYYY-MM-DD hh:mm:ss:c'),
            isNew: true,
            _XID: ''
          })
        })
        self.$refs.xGrid.insert(newRowSelectionsData).then(({ row, rows }) => {
          self.$refs.xGrid.setActiveCell(rowTo).then(() => {
            resolve({ tableData: self.getTableData, row: row }, self)
          }).catch(e => {
            reject(e)
          })
        }).catch(e => {
          reject(e)
        })
      } else {
        reject(new Error('请先选择新增数据的模版!'))
        self.$XModal.message({ message: '请先选择新增数据的模版!' })
      }
    })
  },
  async copyRowData(obj = {}) {
    // 复制行
    let self = this
    const { rowSource, rowIndexTo } = obj
    let rowSourceData = rowSource === undefined ? 0 : rowSource
    let rowTo = rowIndexTo === undefined ? -1 : rowIndexTo
    // 复制行
    let newRowDataObj = { ...self.$refs.xGrid.getData(rowSourceData) }
    Object.keys(newRowDataObj).forEach((key) => {
      if (key.indexOf('__') >= 0) {
        delete newRowDataObj[key]
      }
    })
    newRowDataObj = Object.assign({}, newRowDataObj, {
      insertMark: '新数据',
      date: new Date().format('YYYY-MM-DD hh:mm:ss:c'),
      isNew: true,
      _XID: ''
    })
    let { row } = await self.$refs.xGrid.insertAt(newRowDataObj, rowTo)
    await self.$refs.xGrid.setCurrentRow(row)
    await self.$refs.xGrid.setActiveCell(row)
    await self.$refs.xGrid.validate(row).catch(errMap => errMap)
    // this.$XModal.message({ message: `复制单条数据完成，行号为 ${rowTo + 1}` })
  },
  async insertRowData(obj = {}) {
    // 新增行
    let self = this
    return new Promise((resolve, reject) => {
      const { data, rowIndexTo } = obj
      let rowTo = rowIndexTo === undefined ? -1 : rowIndexTo
      let dataObj = Object.assign({}, data === undefined ? {} : data, {
        insertMark: '新数据',
        date: new Date().format('YYYY-MM-DD hh:mm:ss:c'),
        isNew: true,
        _XID: ''
      })
      Object.keys(dataObj).forEach((key) => {
        if (key.indexOf('__') >= 0) {
          delete dataObj[key]
        }
      })
      self.$refs.xGrid.insertAt(dataObj, rowTo).then(({ row }) => {
        self.$refs.xGrid.setCurrentRow(row).then(() => {
          self.$refs.xGrid.setActiveCell(row).then(() => {
            self.$refs.xGrid.validate(row).then(() => {
              resolve({ tableData: self.getTableData, row: row }, self)
            }).catch(errMap => {
              console.log('validate', errMap)
              resolve({ tableData: self.getTableData, row: row, errMap: errMap }, self)
            })
          }).catch(e => {
            reject(e)
          })
        }).catch(e => {
          reject(e)
        })
      }).catch(e => {
        reject(e)
      })
    })
    // await this.$refs.xGrid.fullValidate(row).catch(errMap => {
    //   console.log('fullValidate', errMap)
    //   return errMap
    // })
    // this.$XModal.message({ message: `复制单条数据完成，行号为 ${rowTo + 1}` })
  },
  reLoadTable() {
    let self = this
    let xGrid = this.$refs.xGrid
    this.initTable()
    // xGrid.reloadData(xGrid.getTableData().fullData)
    xGrid.reloadColumn(self.initTableConlums())
    xGrid.reloadData(self.initTableData()).then().catch()
  },
  reLoadTableData() {
    let xGrid = this.$refs.xGrid
    // xGrid.reloadData(xGrid.getTableData().fullData)
    xGrid.reloadData(this.initTableData()).then().catch()
  },
  refreshTable(data) {
    // 重新加载所有
    if (data) {
      // 重新加载数据刷新视图 调整 即将废弃
      let xGrid = this.$refs.xGrid
      // xGrid.reloadData(xGrid.getTableData().fullData)
      xGrid.reloadData(data || this.tableDataIn).then().catch()
    } else {
      this.initMounted()
      this.ifRenderTable = false
      this.$nextTick(() => {
        this.ifRenderTable = true
      })
    }
  },
  reloadTableConlums(conlums) {
    // 重加载表头
    this.$refs.xGrid.reloadColumn(conlums ? this.generateTableConlums(conlums, this.tableConfigCp.globalConfig) : self.initTableConlums()).then().catch()
  },
  reloadTableRenderData(data = []) {
    // 重加载渲染数据
    let xGrid = this.$refs.xGrid
    xGrid.reloadData(data)
    this.selection = []
    if (xGrid) {
      xGrid.removeCheckboxRow()
    }
  },
  reCalcAndReLoadTableData({ data, modifyItem, modifyData }) {
    // 重新计算tableData并刷新视图
    let self = this
    return new Promise((resolve, reject) => {
      self.rePerformAllCalcAndConstraintByData(data, true).then(({ dataCodeRowMap, dataCodeRowArr, afterCalcData }) => {
        self.updateFooter().then(() => {
          resolve({ data: afterCalcData, modifyItem, modifyData })
        }).catch((e) => {
          reject(e)
        })
      })
    })
  },
  clearDataRenderField(data) {
    // 删除__字段
    let self = this
    return data.map((item, index) => {
      let itemN = Object.assign({}, item)
      Object.keys(itemN).forEach((key, ki) => {
        if (key.indexOf('__') >= 0) {
          delete itemN[key]
        }
        if (Array.isArray(itemN.children) && itemN.children.length) {
          itemN.children = self.clearDataRenderField(itemN.children)
        }
      })
      return itemN
    })
  },
  /**
   * 根据列表展开情况过滤导出数据
   * @param fullData
   * @param cloneFullData
   * @returns {*}
   */
  fliterTableDataUnexpand(fullData, cloneFullData = this.$XEUtils.clone(fullData, true)) {
    fullData.forEach((row, rowIndex) => {
      if (!this.$refs.xGrid?.isTreeExpandByRow(row)) {
        Reflect.deleteProperty(cloneFullData[rowIndex], 'children')
      } else {
        this.fliterTableDataUnexpand(row.children, cloneFullData[rowIndex].children)
      }
    })
    return cloneFullData
  },
  getTableData() {
    // 获取表格数据
    // const listData = this.getListData()
    const insertRecords = this.$refs.xGrid.getInsertRecords()
    const updateRecords = this.$refs.xGrid.getUpdateRecords()
    const removeRecords = this.$refs.xGrid.getRemoveRecords()
    const { keepSource, tableSourceData } = this.$refs.xGrid.$refs.xTable
    const { fullData, visibleData, tableData, footerData } = this.$refs.xGrid.getTableData()
    const treeExpandData = this.fliterTableDataUnexpand(fullData)

    const selection = this.$refs.xGrid.getCheckboxRecords(true)
    const { tableColumnsConfig, editRules } = this
    // const combinedData = this.getCombinedData(fullData, tableColumnsConfig)
    const combinedData = []
    return { combinedData, keepSource, tableSourceData, fullData, visibleData, tableData, footerData, tableColumnsConfig, selection, editRules, insertRecords, removeRecords, updateRecords, treeExpandData }
  },
  getCombinedData(data, tableColumnsConfig, combinedData = {}) {
    let self = this
    data.forEach((row, index) => {
      tableColumnsConfig.forEach((column, columnIndex) => {
        if (Array.isArray(column.children) && column.children.length) {
          self.getCombinedData(data, column.children, combinedData)
        } else if (column.combinedType && column.combinedType.indexOf('total') >= 0) {
          combinedData[column.field] = this.accurateJiafa((combinedData[column.field] || 0), (+this.transToNumber(row[column.field], 3) || 0))
        }
      })
    })
    return combinedData
  },
  getPureTableData() {
    // 获取表格纯净数据
    const listData = this.getListData()
    const insertRecords = this.$refs.xGrid.getInsertRecords()
    const updateRecords = this.$refs.xGrid.getUpdateRecords()
    const removeRecords = this.$refs.xGrid.getRemoveRecords()
    const { keepSource, tableSourceData } = this.$refs.xGrid.$refs.xTable
    const { fullData, visibleData, tableData, footerData } = this.$refs.xGrid.getTableData()
    const selection = this.$refs.xGrid.getCheckboxRecords()
    const { tableColumnsConfig, editRules } = this
    // const combinedData = this.getCombinedData(fullData, tableColumnsConfig)
    const combinedData = []
    return { combinedData, keepSource, tableSourceData: this.clearDataRenderField(tableSourceData), fullData: this.clearDataRenderField(fullData), visibleData: this.clearDataRenderField(visibleData), tableData: this.clearDataRenderField(tableData), footerData, tableColumnsConfig, selection: this.clearDataRenderField(selection), editRules, listData: this.clearDataRenderField(listData), insertRecords: this.clearDataRenderField(insertRecords), updateRecords: this.clearDataRenderField(updateRecords), removeRecords: this.clearDataRenderField(removeRecords) }
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
  validateChangeData() {
    // 只校验临时变动的数据，例如新增或修改
    return this.$refs.xGrid.validate()
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
                msgList.map(msg => <div>{msg}</div>)
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
  },
  transTableColumnsToSource(columns) {
    // 表格渲染数据转换为传入数据格式
    if (!columns) return []
    const newColumns = []
    let self = this
    columns.forEach((column, columnIndex) => {
      newColumns.push(column.own || {})
      if (Array.isArray(column.children) && column.children.length) {
        newColumns[columnIndex].children = self.transTableColumnToSource(column.children)
      }
    })
    return newColumns
  }
}
const tableEventFn = {
  setRowDrop() {
    // 行拖拽排序
    this.$nextTick(() => {
      const xTable = this.$refs.xGrid
      if (!xTable) return
      let Sortable = this.$Sortable
      let XEUtils = this.$XEUtils
      this.sortable = Sortable.create(xTable.$el.querySelector('.body--wrapper>.vxe-table--body tbody'), {
        handle: '.drag-btn',
        onEnd: ({ item, oldIndex }) => {
          const options = { children: 'children' }
          const targetTrElem = item
          const wrapperElem = targetTrElem.parentNode
          const prevTrElem = targetTrElem.previousElementSibling
          const tableTreeData = this.tableDataIn
          const selfRow = xTable.getRowNode(targetTrElem).item
          const selfNode = XEUtils.findTree(tableTreeData, row => row === selfRow, options)
          if (prevTrElem) {
            // 移动到节点
            const prevRow = xTable.getRowNode(prevTrElem).item
            const prevNode = XEUtils.findTree(tableTreeData, row => row === prevRow, options)
            if (XEUtils.findTree(selfRow[options.children], row => prevRow === row, options)) {
              // 错误的移动
              const oldTrElem = wrapperElem.children[oldIndex]
              wrapperElem.insertBefore(targetTrElem, oldTrElem)
              return this.$XModal.message({ message: '不允许自己给自己拖动！', status: 'error' })
            }
            const currRow = selfNode.items.splice(selfNode.index, 1)[0]
            if (xTable.isTreeExpandByRow(prevRow)) {
              // 移动到当前的子节点
              prevRow[options.children].splice(0, 0, currRow)
            } else {
              // 移动到相邻节点
              prevNode.items.splice(prevNode.index + (selfNode.index < prevNode.index ? 0 : 1), 0, currRow)
            }
          } else {
            // 移动到第一行
            const currRow = selfNode.items.splice(selfNode.index, 1)[0]
            tableTreeData.unshift(currRow)
          }
          // 如果变动了树层级，需要刷新数据
          this.tableDataIn = [...tableTreeData]
        }
      })
    })
  },
  setColumnDrop() { // 设置列拖拽
    let self = this
    let Sortable = this.$Sortable
    this.$nextTick(() => {
      const xTable = this.$refs.xGrid
      this.sortable = Sortable.create(xTable.$el.querySelector('.body--wrapper>.vxe-table--header .vxe-header--row'), {
        handle: '.vxe-header--column:not(.col--fixed)',
        onEnd: ({ item, newIndex, oldIndex }) => {
          const { fullColumn, tableColumn } = xTable.getTableColumn()
          const targetThElem = item
          const wrapperElem = targetThElem.parentNode
          const newColumn = fullColumn[newIndex]
          if (newColumn.fixed) {
            // 错误的移动
            if (newIndex > oldIndex) {
              wrapperElem.insertBefore(targetThElem, wrapperElem.children[oldIndex])
            } else {
              wrapperElem.insertBefore(wrapperElem.children[oldIndex], targetThElem)
            }
            return this.$XModal.message({ message: '固定列不允许拖动！', status: 'error' })
          }
          // 转换真实索引
          const oldColumnIndex = xTable.getColumnIndex(tableColumn[oldIndex])
          const newColumnIndex = xTable.getColumnIndex(tableColumn[newIndex])
          // 移动到目标列
          const currRow = fullColumn.splice(oldColumnIndex, 1)[0]
          fullColumn.splice(newColumnIndex, 0, currRow)
          // 是否开启列顺序缓存
          if (this.tableGlobalConfig.dragColumnsConfig.cacheStatus) {
            // resize之后的宽度拿不到，故暂时只缓存字段名
            const storageColumn = this.transTableCloumnToSource(fullColumn).filter(k => !!k.field).map(k => k && k.field)
            this.$store.commit('setCacheColumn', { key: this.tableId, value: storageColumn })
          }
          xTable.loadColumn(fullColumn)
          self.$emit('ProxyEvent', 'columnDrag', tableColumn)
          self.$emit('columnDrag', tableColumn)
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
        // self.copySelectionRowData()
        self.insertRowData({})
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
      //   debugger
      //   let clipboardData = (event.clipboardData || event.originalEvent.clipboardData)
      //   debugger
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
        console.log('当前行数据:', row, '\n', '当前单元格数据:', row && row[column.property], '\n', '当前列配置数据:', column, '\n', '当前行索引:', rowIndex, '\n', '当前列索引:', columnIndex, '\n')
        // console.log(row && row[column.property], row, column, columnIndex, rowIndex)
        console.log('当前表格数据:', this.getTableData())
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
  triggerReverseCheck() {
    // 反选
    let self = this
    let xGrid = self.$refs.xGrid
    return new Promise((resolve, reject) => {
      // let selectionNew = []
      let selection = xGrid.getCheckboxRecords()
      let { tableData } = xGrid.getTableData()
      // tableData.forEach((row, rowIndex) => {
      //   if (!selection.some((item, index) => {
      //     return row._XID === item._XID
      //   })) {
      //     selectionNew.push(row)
      //   }
      // })
      // xGrid.clearCheckboxRow().then(() => {
      xGrid.setCheckboxRow(tableData, true).then(() => {
        xGrid.setCheckboxRow(selection, false).then(() => {
          self.selection = xGrid.getCheckboxRecords()
          resolve(self.selection)
        }).catch(e => {
          reject(e)
        })
      }).catch(e => {
        reject(e)
      })
      // }).catch(e => {
      //   reject(e)
      // })
    })
  },
  handleCheckboxChange(obj, e) {
    // 多选选中或去选某一条事件
    this.selection = obj ? obj.records : this.getSelectionData()
    this.updateFooter().then(() => {
      this.$emit('checkboxChange', obj, e)
      this.$emit('ProxyEvent', 'checkboxChange', obj, this, this.$refs.xGrid)
    }).catch(() => { })
  },
  handleCheckboxAllChange(obj, e) {
    // 全选选中或去选某一条事件
    this.selection = obj.records
    this.updateFooter().then(() => {
      this.$emit('checkboxAll', obj, e)
      this.$emit('ProxyEvent', 'checkboxAll', obj, this, this.$refs.xGrid)
    }).catch(() => { })
  },
  onOptionRowClick(obj) {
    // 操作列点击事件
    this.$emit('onOptionRowClick', obj, this)
    this.$emit('ProxyEvent', 'onOptionRowClick', obj, this, this.$refs.xGrid)
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
    self.$emit('onToolbarBtnClick', obj, this)
    let methods = this.tableConfigCp.methods
    if (typeof (obj.button.callback) === 'function') {
      obj.button.callback(obj, self, e)
    } else {
      typeof (methods.toolbarButtonClickEvent) === 'function' && methods.toolbarButtonClickEvent(obj, self, e)
    }
  },
  onToolbarOperrateClick(code) {
    let self = this
    switch (code) {
      case 'reverseCheck':
        this.triggerReverseCheck().then((res) => {
          this.$emit('triggerReverseCheck', { records: res }, this)
          this.$emit('ProxyEvent', 'triggerReverseCheck', { records: res }, this)
        }).catch(e => {
          console.log(e)
          throw (e)
        })
        break
      case 'refresh':
        this.$emit('onToolbarBtnClick', { context: this, xGrid: this.$refs.xGrid, code: 'refresh' })
        // this.reloadTableConlums(this.tableColumnsConfig)
        // this.refreshTable()
        break
      case 'calculator':
        this.$XModal.message({ status: 'info', message: '此功能正在开发中' })
        break
      case 'zoom':
        this.$refs.xGrid.zoom().then(() => { }).catch(() => { })
        break
      case 'export':
        if (this.toolbarConfigIn && this.toolbarConfigIn.exportCustom) {
          this.$emit('onToolbarBtnClick', { context: this, xGrid: this.$refs.xGrid, code: 'export' })
        } else {
          this.triggerExportOption()
        }
        break
      case 'custom':
        break
      case 'import':
        this.triggerImportOption(
          {
            downloadTemplateCallback(Cb) {
              self.downLoadImportTemplate()
            },
            importSuccessCallback(res) {
              this.$emit('importSuccessCallback', res)
            }
          }
        )
        break
      case 'expandAll':
        this.expendAllLoading = true
        // 设置宏任务，延迟执行避免js进程同步运行大量操作导致渲染进程loading假死
        setTimeout(() => {
          const handle = this.expandAllState
            ? () => this.$refs.xGrid?.clearTreeExpand?.()
            : () => this.$refs.xGrid?.setAllTreeExpand?.(true)
          handle()
            .finally(() => {
              this.expandAllState = !this.expandAllState
              this.expendAllLoading = false
            })
        }, 16.67)
        break
    }
  },
  setMoneyUnit(Unitlevel, oldUnitlevel) { // 设置金额单位
    this.toolbarConfigInCopy.moneyUnitOptions.forEach((item, index) => {
      if (item.value === Unitlevel) {
        this.curSelectMoneyUnitOption = item
      }
    })
    let xGrid = this.$refs.xGrid
    if (!xGrid) {
      return
    }
    xGrid.$forceUpdate()
    xGrid.updateFooter().then(() => { }).catch(() => { })
  },
  /**
   * 口径说明点击（显示弹窗）
   */
  caliberDeclareHandle() {
    this.caliberDeclareVisible = !this.caliberDeclareVisible
  }
}
const pageEvent = { // 分页事件
  setPagerConfig() {
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
      this.tableDataIn.forEach(dataNews => {
        let newColumnsList = this.tableColumnsFieldArr
        console.log(newColumnsList)
        for (let i = 0; i < Object.keys(dataNews).length; i++) {
          if (newColumnsList.includes(Object.keys(dataNews)[i]) && String(dataNews[Object.keys(dataNews)[i]]).indexOf(search) > -1) {
            newTbleDatas.push(dataNews)
            break
          }
        }
      })
      this.reloadTableRenderData(newTbleDatas)
    } else {
      this.reloadTableRenderData(this.tableDataIn)
    }
  },
  onFuzzySearchEnter() {
    if (this.toolbarConfigInCopy.search !== 'remoteSearch') {
      if (window.event.keyCode === 13 && this.filtertext) {

      }
    } else {
      if (window.event.keyCode === 13 && this.filtertext) {
        this.filtertextCp = this.filtertext
        this.$refs.xGrid.updateData()
      } else {
        this.filtertextCp = ''
        this.$refs.xGrid.updateData()
      }
    }
  },
  getHighlightedFilterText(val) { // 渲染施加高亮
    if (this.filtertextCp) {
      let regf = new RegExp(this.filtertextCp, 'ig')
      return String(val).replace(regf, match => {
        if (match) {
          return `<span class="filter-lighting">${match}</span>`
        } else {
          return ''
        }
      })
    } else {
      return val
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
  cellOptionCallBack() { // 渲染器回调事件
    this.$emit('cellOptionCallBack', ...arguments, this, this.$refs.xGrid)
    this.$emit('ProxyEvent', 'cellOptionCallBack', ...arguments, this, this.$refs.xGrid)
  },
  // cellChange() { // 渲染器回调事件
  //   this.$emit('cellChange', ...arguments, this, this.$refs.xGrid)
  // },
  keydown(obj) {
    // 添加enter 切换下一个编辑单元格
    // let self = this
    // let event = obj.event || window.event
    // const { xGrid } = self.$refs
    // const { row, rowIndex, column } = xGrid.getActiveRecord()
    // if (event.keyCode === 13 && row !== null) {
    //   const { fullData } = self.getTableData()
    //   let indexof = self.tableColumnsSingEditFieldArr.indexOf(column.property)
    //   if (indexof + 1 < self.tableColumnsSingEditFieldArr.length) {
    //     xGrid.setActiveCell(row, self.tableColumnsSingEditFieldArr[indexof + 1])
    //   } else {
    //     xGrid.setCurrentRow(fullData[rowIndex + 1]).then(() => {
    //       xGrid.setActiveCell(fullData[rowIndex + 1], self.tableColumnsSingEditFieldArr[0])
    //     })
    //   }
    // } else {
    this.$emit('keydown', obj, this, this.$refs.xGrid)
    this.$emit('ProxyEvent', 'keydown', obj, this, this.$refs.xGrid)
    // }
  }, // 当表格被激活且键盘被按下时会触发的事件  { $event }
  radioChange(obj) {
    this.$emit('radioChange', obj, this, this.$refs.xGrid)
    this.$emit('ProxyEvent', 'radioChange', obj, this, this.$refs.xGrid)
  }, // 只对 type = radio 有效， 当手动勾选并且值发生改变时触发的事件 { row, rowIndex, $rowIndex, column, columnIndex, $columnIndex, $event }
  cellClick(obj) {
    let self = this
    const { xGrid } = this.$refs
    if (this.tableConfigCp.globalConfig.cellClickCheck && this.tableGlobalConfigIn.cellClickCheck) {
      // const { row, rowIndex, $rowIndex, column, columnIndex, $columnIndex, triggerRadio, triggerCheckbox, triggerTreeNode, triggerExpandNode, $event } = obj
      const { row, $event, column } = obj
      if (column.type !== 'checkbox') {
        if ($event.shiftKey) {
          // option
        } else {
          xGrid.setCheckboxRow([row], !xGrid.isCheckedByCheckboxRow(row)).then(() => {
            self.selection = this.$refs.xGrid.getCheckboxRecords()
            self.updateFooter().then(() => {
              xGrid.setCurrentRow(row).then(() => {

              })
            }).catch(() => { })
          })
        }
      }
    }
    this.$emit('cellClick', obj, this, this.$refs.xGrid)
    this.$emit('ProxyEvent', 'cellClick', obj, this, this.$refs.xGrid)
  }, // 单元格被点击时会触发该事件 { row, rowIndex, $rowIndex, column, columnIndex, $columnIndex, $event }
  cellDblclick(obj) {
    const { row, column } = obj
    if (this.treeConfigIn && this.treeConfigIn.dblExpand) {
      if (this.editConfigIn && column.treeNode) {
        if (this.treeConfigIn.dblExpandAll) {
          this.dblRowExpandAll(row)
        } else {
          this.tableOptionFn().toggleTreeExpand(row).then(() => { })
        }
      } else if (!this.editConfigIn && this.treeConfigIn.onlyDblTreeNodeExpand && column.treeNode) {
        if (this.treeConfigIn.dblExpandAll) {
          this.dblRowExpandAll(row)
        } else {
          this.tableOptionFn().toggleTreeExpand(row).then(() => { })
        }
      } else if (!this.editConfigIn) {
        if (this.treeConfigIn.dblExpandAll) {
          this.dblRowExpandAll(row)
        } else {
          this.tableOptionFn().toggleTreeExpand(row).then(() => { })
        }
      } else {

      }
    } else {
      this.$emit('cellDblclick', obj, this, this.$refs.xGrid)
      this.$emit('ProxyEvent', 'cellDblclick', obj, this, this.$refs.xGrid)
    }
  }, // 单元格被双击时会触发该事件 { row, rowIndex, $rowIndex, column, columnIndex, $columnIndex, $event }
  dblRowExpandAll(row) {
    let self = this
    self.tableOptionFn().toggleTreeExpand(row).then((res) => {
      if (Array.isArray(row[this.treeConfigIn.children]) && row[this.treeConfigIn.children].length) {
        row[this.treeConfigIn.children].forEach((item, index) => {
          self.dblRowExpandAll(item)
        })
      }
    })
  },
  cellContextMenu(obj) {
    this.$emit('cellContextMenu', obj, this, this.$refs.xGrid)
    this.$emit('ProxyEvent', 'cellContextMenu', obj, this, this.$refs.xGrid)
  }, // 只对 context - menu 配置时有效， 单元格被鼠标右键时触发该事件 { type, row, rowIndex, $rowIndex, column, columnIndex, $columnIndex, $event }
  cellMouseenter(obj) {
    this.$emit('cellMouseenter', obj, this, this.$refs.xGrid)
    this.$emit('ProxyEvent', 'cellMouseenter', obj, this, this.$refs.xGrid)
  }, // 当单元格 hover 进入时会触发该事件 { row, rowIndex, $rowIndex, column, columnIndex, $columnIndex, $event }
  cellMouseleave(obj) {
    this.$emit('cellMouseleave', obj, this, this.$refs.xGrid)
    this.$emit('ProxyEvent', 'cellMouseleave', obj, this, this.$refs.xGrid)
  }, // 当单元格 hover 退出时会触发该事件 { row, rowIndex, $rowIndex, column, columnIndex, $columnIndex, $event }
  headerCellClick(obj) {
    this.$emit('headerCellClick', obj, this, this.$refs.xGrid)
    this.$emit('ProxyEvent', 'headerCellClick', obj, this, this.$refs.xGrid)
  }, // 表头单元格被点击时会触发该事件 { $rowIndex, column, columnIndex, $columnIndex, triggerResizable, triggerSort, triggerFilter, $event }
  headerCellDblclick(obj) {
    this.$emit('headerCellDblclick', obj, this, this.$refs.xGrid)
    this.$emit('ProxyEvent', 'headerCellDblclick', obj, this, this.$refs.xGrid)
  }, // 表头单元格被双击时会触发该事件 { $rowIndex, column, columnIndex, $columnIndex, $event }
  // headerCellContextMenu(obj) {
  //   this.$emit('headerCellContextMenu', obj, this, this.$refs.xGrid)
  // }, // 只对 context-menu 配置时有效，表头单元格被鼠标右键时触发该事件 { type, column, columnIndex, $event }
  footerCellClick(obj) {
    this.$emit('footerCellClick', obj, this, this.$refs.xGrid)
    this.$emit('ProxyEvent', 'footerCellClick', obj, this, this.$refs.xGrid)
  }, // 表尾单元格被点击时会触发该事件 // { items, $rowIndex, column, columnIndex, $columnIndex, $event }
  footerCellDblclick(obj) {
    this.$emit('footerCellDblclick', obj, this, this.$refs.xGrid)
    this.$emit('ProxyEvent', 'footerCellDblclick', obj, this, this.$refs.xGrid)
  }, // 表尾单元格被双击时会触发该事件 { items, $rowIndex, column, columnIndex, $columnIndex, $event }
  footerCellContextMenu(obj) {
    this.$emit('footerCellContextMenu', obj, this, this.$refs.xGrid)
    this.$emit('ProxyEvent', 'footerCellContextMenu', obj, this, this.$refs.xGrid)
  }, // 只对 context - menu 配置时有效， 表尾单元格被鼠标右键时触发该事件 { type, column, columnIndex, $event }
  sortChange(obj) {
    this.$emit('sortChange', obj, this, this.$refs.xGrid)
    this.$emit('ProxyEvent', 'sortChange', obj, this, this.$refs.xGrid)
  }, // 当排序条件发生变化时会触发该事件 { column, column.property, order, $event }
  filterChange(obj) {
    this.$emit('filterChange', obj, this, this.$refs.xGrid)
    this.$emit('ProxyEvent', 'filterChange', obj, this, this.$refs.xGrid)
  }, // 当筛选条件发生变化时会触发该事件 { column, property, values, datas, filters, $event }{ column, property, values, datas, filters, $event }
  resizableChange(obj) {
    this.$emit('resizableChange', obj, this, this.$refs.xGrid)
    this.$emit('ProxyEvent', 'resizableChange', obj, this, this.$refs.xGrid)
  }, // 当列宽拖动发生变化时会触发该事件 { $rowIndex, column, columnIndex, $columnIndex, $event }
  toggleRowExpand(obj) {
    // 懒加载子节点需要给子节点设置唯一键
    setRowUuidKey(obj.row, this)

    this.$emit('toggleRowExpand', obj, this, this.$refs.xGrid)
    this.$emit('ProxyEvent', 'toggleRowExpand', obj, this, this.$refs.xGrid)
  }, // 当行展开或收起时会触发该事件 { expanded, row, rowIndex, $rowIndex, column, columnIndex, $columnIndex, $event }
  toggleTreeExpand(obj) {
    this.$emit('toggleTreeExpand', obj, this, this.$refs.xGrid)
    this.$emit('ProxyEvent', 'toggleTreeExpand', obj, this, this.$refs.xGrid)
  }, // 当树节点展开或收起时会触发该事件 { expanded, row, column, columnIndex, $columnIndex, $event }
  contextMenuClick(obj) {
    this.$emit('contextMenuClick', obj, this, this.$refs.xGrid)
    this.$emit('ProxyEvent', 'contextMenuClick', obj, this, this.$refs.xGrid)
  }, // 只对 context-menu 配置时有效，当点击快捷菜单时会触发该事件 { menu, type, row, rowIndex, column, columnIndex, $event }
  currentChange(obj) {
    // this.performTableDataCalculate(obj)
    this.$nextTick(() => {
      this.$emit('currentChange', obj, this, this.$refs.xGrid)
      this.$emit('ProxyEvent', 'currentChange', obj, this, this.$refs.xGrid)
    })
  }, // 只对 highlightCurrentRow 有效，当手动选中行并且值发生改变时触发的事件 { row, rowIndex, $rowIndex, column, columnIndex, $columnIndex, $event }
  editClosed(obj) {
    // this.performAfterEditClosedCalculate(obj).then((row) => {
    obj.data = obj.data || obj.$grid.getTableData().fullData || []
    this.performTableDataCalculate(obj).then(({ row }) => {
      this.$emit('editClosed', obj, this, this.$refs.xGrid)
      this.$emit('ProxyEvent', 'editClosed', obj, this, this.$refs.xGrid)
    })
  }, //
  editActived(obj) {
    this.$emit('editActived', obj, this, this.$refs.xGrid)
    this.$emit('ProxyEvent', 'editActived', obj, this, this.$refs.xGrid)
  }, // 只对 edit-config 配置时有效，单元格被激活编辑时会触发该事件 { row, rowIndex, $rowIndex, column, columnIndex, $columnIndex }
  editDisabled(obj) {
    this.$emit('editDisabled', obj, this, this.$refs.xGrid)
    this.$emit('ProxyEvent', 'editDisabled', obj, this, this.$refs.xGrid)
  }, // 只对 edit-config 配置时有效，当单元格激活时如果是禁用状态时会触发该事件 { row, rowIndex, $rowIndex, column, columnIndex, $columnIndex }
  validError(obj) {
    this.$emit('validError', obj, this, this.$refs.xGrid)
    this.$emit('ProxyEvent', 'validError', obj, this, this.$refs.xGrid)
  }, // 只对 edit-rules 配置时有效，当数据校验不通过时会触发该事件 { rule, row, rowIndex, $rowIndex, column, columnIndex, $columnIndex }
  scroll(obj) {
    // 页面滚动
    let self = this
    // const { type, scrollTop, scrollLeft, isX, isY, $event } = obj
    const { scrollTop, $event } = obj
    this.$emit('scroll', obj, this, this.$refs.xGrid)
    this.$emit('ProxyEvent', 'scroll', obj, this, this.$refs.xGrid)
    if (self.scrollLoadConfigCp && self.scrollLoadConfigCp.enabled) {
      if (+scrollTop + $event.target.offsetHeight > ($event.target.scrollHeight - 20)) {
        self.debounceItemChange(() => { self.performScrollLoad(obj) })
      }
    }
  }, // 表格滚动时会触发该事件 { type, scrollTop, scrollLeft, isX, isY, $event }
  performScrollLoad(obj) {
    // 兼容手机端和PC端滚动加载
    let self = this
    // 滚动条的位置 在页面上返回内容的可视高度 返回整个元素的高度（包括带滚动条的隐蔽的地方）
    self.scrollLoading = true
    self.scrollLoadConfigCp.loadData(self.scrollLoadConfigCp, this.formSearchData)
      .then((res) => {
        self.scrollLoading = false
        if (res && res.data && res.data.length) {
          self.loadScrollTableData(res.data)
          Object.assign(self.scrollLoadConfigCp, {
            curGt: self.scrollLoadConfigCp.curGt + res.data.length,
            currentPage: self.scrollLoadConfigCp.currentPage + 1,
            tatal: res.total
          })
        }
      })
  },
  custom(obj) {
    this.$emit('custom', obj, this, this.$refs.xGrid)
    this.$emit('ProxyEvent', 'custom', obj, this, this.$refs.xGrid)
  },
  formSubmitInvalid(obj) {
    this.$emit('formSubmitInvalid', obj, this, this.$refs.xGrid)
    this.$emit('ProxyEvent', 'formSubmitInvalid', obj, this, this.$refs.xGrid)
  }, // 只对 form-config 配置时有效，表单提交时如果校验不通过会触发该事件 { data, errMap, $event }
  formReset(obj) {
    this.$emit('formReset', obj, this, this.$refs.xGrid)
    this.$emit('ProxyEvent', 'formReset', obj, this, this.$refs.xGrid)
  }, // 只对 form-config 配置时有效，表单重置时会触发该事件 { data, $event }
  formToggleCollapse(obj) {
    this.$emit('formToggleCollapse', obj, this, this.$refs.xGrid)
    this.$emit('ProxyEvent', 'formToggleCollapse', obj, this, this.$refs.xGrid)
  }, // 只对 form-config 配置时有效，当折叠按钮被手动点击时会触发该事件 { collapse, data, $event }
  zoom(obj) {
    this.$emit('zoom', obj, this, this.$refs.xGrid)
    this.$emit('ProxyEvent', 'zoom', obj, this, this.$refs.xGrid)
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
const calculateTool = {
  // 执行顺序： 取数-->行内计算-->分级汇总-->父级行内计算-->单元格交叉计算(涉及的行计算)-->行约束-->单元格约束
  addMissingFieldsAndCalcColFormula(tableData) {
    // 添加缺失字段并执行全量列计算
    let self = this
    tableData = Array.isArray(tableData) ? tableData : []
    tableData.forEach((row) => {
      self.tableColumnsFieldArr.forEach((item) => {
        // let render = self.tableColumnsFieldMap[item].editRender || self.tableColumnsFieldMap[item].cellRender
        // 遍历配置项生成的前缀数组，并且其前缀在数据包中不存在时，动态给其绑定一个前缀
        // if (render && render.props && render.props.multiple) {
        //   if (Array.isArray(row[item])) {
        //     row[item + '__multiple'] = [...row[item]]
        //   } else if (typeof row[item] === 'string') {
        //     row[item + '__multiple'] = row[item].split(',')
        //   } else {
        //     row[item + '__multiple'] = []
        //   }
        // } else if (render && render.name === '$vxeMoney') {
        //   row[item + '__moneySwitchinput'] = self.accurateChuFa((row[item] + '').replace(/null|undefined|NaN/ig, ''), self.moneyUnit) + ''
        // } else {
        // }
        // 遍历配置项生成的前缀数组，并且其前缀在数据包中不存在时，动态给其绑定一个前缀
        row[item] = typeof row[item] !== 'object' ? (row[item] === undefined ? '' : row[item]) : (row[item] === null ? '' : row[item])
      })
      row = this.reductionColFormula(this.calculateConstraintConfigIn.colFormulaConfig, row)
      if (Array.isArray(row.children) && row.children.length && this.treeConfigIn) {
        row.children = self.addMissingFieldsAndCalcColFormula(row.children)
      }
    })
    self.reductionRowCodeFormula(this.calculateConstraintConfigIn.rowCodeFormulaConfig, tableData, self.id)
    return tableData
  },
  reductionColFormula(colFormulaMap, row, property) {
    // 单条数据计算
    // rowFormulaMap= { "colfield":"{colfield}[运算符]" }
    let xGrid = this.$refs.xGrid
    const { visibleColumn = [] } = (xGrid && xGrid.getTableColumn && xGrid.getTableColumn()) || {}
    let visibleColumnObj = {}
    visibleColumn.forEach(item => {
      if (!visibleColumnObj[item.property]) {
        visibleColumnObj[item.property] = item
      }
    })
    // property 标识当前编辑字段配置的有公式，但是该字段值是可编辑的，标记候后的值保存，不用重新按公式计算新值
    let colFormulaMapCp = this.deepCopy(colFormulaMap)
    let hasCalcColFormulaMap = {}
    let i = 0
    let ifDoWhile = true
    // 处理当前编辑字段配置的有公式，但是该字段值是可编辑的，编辑后的值保存，不用重新按公式计算新值
    // debugger
    if (this.editConfigIn.formulaEditable && property && colFormulaMapCp[property]) {
      delete colFormulaMapCp[property]
    }
    // 初始化回显时如果该字段有值，就显示自身默认值，不做公式计算
    if (this.editConfigIn.formulaEditable && !property) {
      const colFormulaMapArr = Object.keys(colFormulaMapCp)
      colFormulaMapArr.forEach(key => {
        if (row[key] || row[key] === 0) {
          delete colFormulaMapCp[key]
        }
      })
    }
    try {
      while (ifDoWhile) {
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
                let reg = new RegExp('({' + keyC.replace(/\$/ig, '\\$') + '})', 'ig')
                if (row[keyC] !== undefined && !(hasCalcColFormulaMap[keyC] !== undefined || colFormulaMapCp[keyC])) {
                  colFormulaMapCp[item] = formula.replace(reg, isNaN(parseFloat(row[keyC])) ? 0 : parseFloat(row[keyC]))
                } else if (hasCalcColFormulaMap[keyC] !== undefined) {
                  colFormulaMapCp[item] = formula.replace(reg, hasCalcColFormulaMap[keyC])
                } else if (!colFormulaMapCp[keyC]) {
                  colFormulaMapCp[item] = formula.replace(reg, 0)
                }
              }
            } else {
              // let calcResult = eval(formula)
              let calcResult = evalCalcUtil.eval(formula)
              hasCalcColFormulaMap[item] = calcResult === Infinity || calcResult === -Infinity || isNaN(calcResult) || calcResult === null ? '' : util.accurateFixed(calcResult, 2)
              // 列单独配置元和万元单位
              if (visibleColumnObj[item] && visibleColumnObj[item].params && visibleColumnObj[item].params.moneyUnit) {
                hasCalcColFormulaMap[item] = this.accurateFixed(this.transToNumber(this.accurateChuFa(hasCalcColFormulaMap[item], visibleColumnObj[item].params.moneyUnit), visibleColumnObj[item].params.digits || 2), 2)
              }
              // feat：对于$vxeRatio渲染的百分比 可根据配置保留小数位
              if (visibleColumnObj[item]?.cellRender?.name === '$vxeRatio') {
                // 保留小数位数支持：外部单列配置 || 全局配置 || 默认配置
                const digits = visibleColumnObj[item]?.params?.digits || this.formulaDigits || 2
                // XEUtils.round四舍五入
                hasCalcColFormulaMap[item] = calcResult === Infinity || calcResult === -Infinity || isNaN(calcResult) || calcResult === null
                  ? ''
                  : XEUtils.round(calcResult, digits)
              }
              delete colFormulaMapCp[item]
            }
          }
        } else {
          ifDoWhile = false
        }
        if (i === 100000) {
          console.log(colFormulaMap, hasCalcColFormulaMap)
          console.error('请核查公式')
        }
      }
    } catch (e) {
      // console.log(i)
      // console.log(colFormulaMap, hasCalcColFormulaMap)
      // console.error('请核查公式')
    }
    // console.log(hasCalcColFormulaMap)
    // debugger
    return Object.assign(row, hasCalcColFormulaMap)
  },
  reductionRowFormula(rowFormulaMap, data, tableId) {
    // 单元格交叉计算
    // rowFormulaMap= { "colField:rowIndex":"{tableId:colField:rowIndex}[运算符]" }
    let rowFormulaMapCp = this.deepCopy(rowFormulaMap)
    let hasCalcrowFormulaMap = {}
    let i = 0
    let ifDoWhile = true
    try {
      while (ifDoWhile) {
        let rowFormulaMapArr = Object.keys(rowFormulaMapCp)
        if (rowFormulaMapArr.length) {
          for (let cmai = 0; cmai < rowFormulaMapArr.length; cmai++) {
            i++
            let item = rowFormulaMapArr[cmai]
            let formula = rowFormulaMapCp[item]
            let regR = new RegExp('({[a-zA-Z0-9_:\$]*})', 'ig')
            let rowsKey = formula.match(regR) === null ? [] : formula.match(regR)
            if (rowsKey.length) {
              for (let keyCF in rowsKey) {
                let formulaArr = rowsKey[keyCF].replace(/\{|\}/g, '').split(':')
                let reg = new RegExp('({' + formulaArr.join(':').replace(/\$/ig, '\\$') + '})', 'ig')
                if (formulaArr[0] === tableId) {
                  if (data[formulaArr[2]] && data[formulaArr[2]][formulaArr[1]] !== undefined && !(hasCalcrowFormulaMap[formulaArr[1] + ':' + formulaArr[2]] !== undefined || rowFormulaMapCp[formulaArr[1] + ':' + formulaArr[2]])) {
                    rowFormulaMapCp[item] = formula.replace(reg, isNaN(parseFloat(data[formulaArr[2]][formulaArr[1]])) ? 0 : parseFloat(data[formulaArr[2]][formulaArr[1]]))
                  } else if (hasCalcrowFormulaMap[formulaArr[1] + ':' + formulaArr[2]] !== undefined) {
                    rowFormulaMapCp[item] = formula.replace(reg, hasCalcrowFormulaMap[formulaArr[1] + ':' + formulaArr[2]])
                  } else if (!rowFormulaMapCp[formulaArr[1] + ':' + formulaArr[2]]) {
                    rowFormulaMapCp[item] = formula.replace(reg, 0)
                  }
                } else {
                  rowFormulaMapCp[item] = formula.replace(reg, 0)
                }
              }
            } else {
              let calcResult = evalCalcUtil.eval(formula)
              hasCalcrowFormulaMap[item] = calcResult === Infinity || calcResult === -Infinity || isNaN(calcResult) ? '' : util.accurateFixed(calcResult, 2)
              delete rowFormulaMapCp[item]
            }
          }
        } else {
          ifDoWhile = false
        }
        if (i === 1000000) {
          console.log(rowFormulaMap, hasCalcrowFormulaMap)
          console.error('请核查公式')
        }
      }
    } catch (e) {
      console.log(rowFormulaMap, hasCalcrowFormulaMap)
      console.error('请核查公式')
    }
    Object.keys(hasCalcrowFormulaMap).forEach((item, index) => {
      let rowCellArr = item.split(':')
      if (data[rowCellArr[1]]) {
        data[rowCellArr[1]][rowCellArr[0]] = hasCalcrowFormulaMap[item] === '0.00' ? '' : hasCalcrowFormulaMap[item]
      }
    })
    return data
  },
  reverDataCodeRowMap(data, codeKey, obj) {
    // 递归生成数据code映射
    let self = this
    obj = obj || {
      dataCodeRowMap: {}
    }
    data.forEach((item, index) => {
      if (Array.isArray(item.children) && item.children.length) {
        self.reverDataCodeRowMap(item.children, codeKey, obj)
      } else {
        obj.dataCodeRowMap[item[codeKey]] = item
      }
    })
    return obj
  },
  reverCalcRowCodeFormula(reverCalcRowCodeFormula, data, tableId) {
    // 递归进行单元格交叉依赖计算
    let self = this
    Object.keys(reverCalcRowCodeFormula).map((item, index) => {
      return {
        itemcode: item.split(':')[1],
        property: item.split(':')[0]
      }
    }).forEach((item, id) => {
      let formColCalList = self.getFormColCalBack(self.id + item.property + item.itemcode)
      if (Object.keys(formColCalList).length) {
        self.reductionRowCodeFormula(formColCalList, self.$refs.xGrid.getTableData().fullData, self.id)
      }
    })
  },
  getDataCodeRowMapCumulativeResult(dataCodeRowMap, field) {
    // 获取重复itemcode的计算结果
    return isNaN(parseFloat(dataCodeRowMap[field])) ? 0 : parseFloat(dataCodeRowMap[field])
  },
  reductionRowCodeFormula(rowCodeFormulaMap, data, tableId) {
    // 单元格交叉计算根据行 code
    // rowCodeFormulaMap= { "colField:rowCode":"{tableId:colField:rowCode}[运算符]" }
    let self = this
    let { calcAndConstraintTableId, dataType, calcAndConstraintItemCodeField, gradedSummaryFields } = self.calculateConstraintConfigIn
    let isTreeData = dataType === undefined ? self.treeConfigIn : dataType === 'tree' ? 1 : 0
    tableId = calcAndConstraintTableId || self.id
    let treeData = this.getDataCodeTreeData(data, calcAndConstraintItemCodeField, gradedSummaryFields, isTreeData)
    let { dataCodeRowMap } = self.recursiveDataCodeRowMap(treeData, calcAndConstraintItemCodeField, true)
    let rowCodeFormulaMapCp = this.deepCopy(rowCodeFormulaMap)
    let hasCalcrowCodeFormulaMap = {}
    let i = 0
    let ifDoWhile = true
    try {
      while (ifDoWhile) {
        let rowCodeFormulaMapArr = Object.keys(rowCodeFormulaMapCp)
        if (rowCodeFormulaMapArr.length) {
          for (let cmai = 0; cmai < rowCodeFormulaMapArr.length; cmai++) {
            i++
            let item = rowCodeFormulaMapArr[cmai]
            let formula = rowCodeFormulaMapCp[item]
            let regR = new RegExp('({[a-zA-Z0-9_:\$]*})', 'ig')
            let rowsKey = formula.match(regR) === null ? [] : formula.match(regR)
            if (rowsKey.length) {
              for (let keyCF in rowsKey) {
                let formulaArr = rowsKey[keyCF].replace(/\{|\}/g, '').split(':')
                let reg = new RegExp('({' + formulaArr.join(':').replace(/\$/ig, '\\$') + '})', 'ig')
                if (formulaArr[0] === tableId) {
                  if (dataCodeRowMap[formulaArr[2]] && !(hasCalcrowCodeFormulaMap[formulaArr[1] + ':' + formulaArr[2]] || rowCodeFormulaMapCp[formulaArr[1] + ':' + formulaArr[2]])) {
                    rowCodeFormulaMapCp[item] = formula.replace(reg, self.getDataCodeRowMapCumulativeResult(dataCodeRowMap[formulaArr[2]], formulaArr[1]))
                  } else if (hasCalcrowCodeFormulaMap[formulaArr[1] + ':' + formulaArr[2]]) {
                    rowCodeFormulaMapCp[item] = formula.replace(reg, hasCalcrowCodeFormulaMap[formulaArr[1] + ':' + formulaArr[2]])
                  } else if (!rowCodeFormulaMapCp[formulaArr[1] + ':' + formulaArr[2]]) {
                    rowCodeFormulaMapCp[item] = formula.replace(reg, 0)
                  }
                } else {
                  rowCodeFormulaMapCp[item] = formula.replace(reg, 0)
                }
              }
            } else {
              let calcResult = evalCalcUtil.eval(formula)
              hasCalcrowCodeFormulaMap[item] = calcResult === Infinity || calcResult === -Infinity || isNaN(calcResult) ? '' : util.accurateFixed(calcResult, 2)
              delete rowCodeFormulaMapCp[item]
            }
          }
        } else {
          ifDoWhile = false
        }
        if (i === 1000000) {
          console.log(rowCodeFormulaMap, hasCalcrowCodeFormulaMap)
          console.error('请核查公式')
        }
      }
    } catch (e) {
      console.log(rowCodeFormulaMap, hasCalcrowCodeFormulaMap)
      throw (e)
    }
    try {
      let rowCodeFormumaMap = self.checkWhetherExcuteColCalculate(this.deepCopy(hasCalcrowCodeFormulaMap))
      for (let itemCode in rowCodeFormumaMap) {
        let row = dataCodeRowMap[itemCode]
        if (row) {
          row = Object.assign(row, rowCodeFormumaMap[itemCode].curRowCodeFormulaMap)
          self.reductionColFormula(rowCodeFormumaMap[itemCode].rowCodeFormulaFieldMap, row)
        }
      }
    } catch (e) {
      throw (e)
    }

    // Object.keys(hasCalcrowCodeFormulaMap).forEach((item, index) => {
    //   let rowCellArr = item.split(':')
    //   if (dataCodeRowMap[rowCellArr[1]]) {
    //     dataCodeRowMap[rowCellArr[1]].forEach((row, rowIndex) => {
    //       row[rowCellArr[0]] = hasCalcrowCodeFormulaMap[item] === '0.00' ? '' : hasCalcrowCodeFormulaMap[item]
    //       row = self.reductionColFormula(, row)
    //     })
    //   }
    // })
    // this.reverCalcRowCodeFormula(rowCodeFormulaMap, data, tableId)
    return data
  },
  checkWhetherExcuteColCalculate(hasCalcrowCodeFormulaMap) {
    // 记录当前数据单元格交叉公式计算字段
    let self = this
    let rowCodeFormumaMap = {}
    Object.keys(hasCalcrowCodeFormulaMap).forEach((item, index) => {
      rowCodeFormumaMap[item.split(':')[0]] = {}
    })
    Object.keys(rowCodeFormumaMap).forEach((itemCode, itemCodeIndex) => {
      let rowCodeFormulaFieldMap = Object.assign({}, self.calculateConstraintConfigIn.colFormulaConfig) // 单元格交叉计算
      let curRowCodeFormulaMap = {}
      Object.keys(hasCalcrowCodeFormulaMap).forEach((item, index) => {
        let rowCellArr = item.split(':')
        if (rowCellArr[0] === itemCode) {
          curRowCodeFormulaMap[rowCellArr[1]] = hasCalcrowCodeFormulaMap[item] === '0.00' ? '' : hasCalcrowCodeFormulaMap[item]
          delete rowCodeFormulaFieldMap[rowCellArr[0]]
        }
      })
      rowCodeFormumaMap[itemCode] = {
        rowCodeFormulaFieldMap: Object.assign({}, self.calculateConstraintConfigIn.colFormulaConfig, rowCodeFormulaFieldMap),
        curRowCodeFormulaMap: curRowCodeFormulaMap
      }
    })
    return rowCodeFormumaMap
  },
  riverColumnsGenerateCalcColFormulaMap(columns, obj) {
    // 递归生成列计算全量映射
    let self = this
    obj = obj || {
      tableColumnsFieldMap: {},
      tableColumnsFieldArr: [],
      tableColumnsSingArr: [],
      tableColumnsTitleFieldMap: {},
      colFormulaConfig: {},
      tableColumnsSingEditFieldArr: [],
      gradedSummaryFields: []
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
          if (conlum.editRender) {
            obj.tableColumnsSingEditFieldArr.push(conlum.field)
          }
          if ((conlum.combinedType && conlum.combinedType.indexOf('needGradedSummary') >= 0) || conlum.needResponsive || conlum.gradedSummary) {
            obj.gradedSummaryFields.push(conlum.field)
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
    self.gradedSummaryFields = (Array.isArray(obj.gradedSummaryFields) && obj.gradedSummaryFields.length) ? obj.gradedSummaryFields : null
    self.tableColumnsTitleFieldMap = obj.tableColumnsTitleFieldMap
    self.tableColumnsSingEditFieldArr = obj.tableColumnsSingEditFieldArr
    this.calculateConstraintConfigIn = Object.assign({}, this.calculateConstraintConfigIn, {
      colFormulaConfig: obj.colFormulaConfig
    })
  },
  getFormColCalBack(formulaConditions) {
    // 根据单元格位置查询计算的公式
    // let self = this
    let formColCalList = {}
    let rowFormula = this.calculateConstraintConfigIn.rowFormula
    if (rowFormula) {
      Object.keys(rowFormula).forEach((v, index) => {
        if (v === formulaConditions) {
          rowFormula[v].forEach(j => {
            formColCalList = Object.assign(formColCalList, j)
          })
        }
      })
      return formColCalList
    } else {
      return ''
    }
  },
  performTableDataCalculate(obj) { // 行改变事件执行单元格计算并刷新视图
    // 执行顺序： 取数-->行内计算-->分级汇总-->父级行内计算-->单元格交叉计算(涉及的行计算)-->行约束-->单元格约束
    return this.rePerformRowCalcAndConstraintSingleAndRerender(obj)
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
          obj.tableColumnsTitleMap[conlum.title] = conlum
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
  isEditForFormula(row, rowIndex, column, columnIndex) {
    let isForFormulaData = column.property + ':' + row.itemcode
    let isForFormula = true
    let self = this
    if (self.calculateConstraintConfigIn.rowCodeFormulaConfig[isForFormulaData] || self.calculateConstraintConfigIn.colFormulaConfig[column.property]) {
      isForFormula = false
    } else {
      isForFormula = true
    }
    return isForFormula
    // if (this.calculateConstraintConfigIn.constraintConfig === '') {
    //   return true
    // } else {
    //   return false
    // }
  },
  isActiveCellEdit({ row, rowIndex, column, columnIndex }) {
    let isEditForFormula = this.isEditForFormula(row, rowIndex, column, columnIndex)
    return isEditForFormula
  }
}
const calcAndConstraint = { // 计算约束部分
  // 执行顺序： 取数--> 行内计算--> 分级汇总--> 父级行内计算--> 单元格交叉计算(涉及的行计算)--> 行约束--> 单元格约束
  addMissingFields(tableData) {
    // 添加缺失字段并执行全量列计算
    let self = this
    tableData = Array.isArray(tableData) ? tableData : []
    tableData.forEach((row) => {
      self.tableColumnsFieldArr.forEach((item) => {
        row[item] = typeof row[item] !== 'object' ? (row[item] === undefined ? '' : row[item]) : (row[item] === null ? '' : row[item])
      })
      if (Array.isArray(row.children) && row.children.length && this.treeConfigIn) {
        row.children = self.addMissingFields(row.children)
      }
    })
    return tableData
  },
  // 取数
  generatGetDataConfigMap(cellDataConfig) { // 生成取数和单元格计算
    //  [{ itemcode: "002", itemname: "一般公共预算", cells: [{ itemcode: "002", colField: "f001", inputType: 1, formulaShow: "提取",formula:'tableId:colField:itemcode' }] }]
    let rowCodeFormulaConfig = {}
    let getDataConfig = {}
    cellDataConfig.forEach((cell) => {
      if (cell.formulaShow === '提取') {
        getDataConfig[cell.itemCode + ':' + cell.colField] = cell.formula
      } else if (cell.formulaShow === '计算') {
        rowCodeFormulaConfig[cell.itemCode + ':' + cell.colField] = cell.formula
      } else {
      }
    })
    this.calculateConstraintConfigIn.rowCodeFormulaConfig = rowCodeFormulaConfig
    this.calculateConstraintConfigIn.getDataConfig = getDataConfig
  },
  performGetData() { // 获取数据
    let self = this
    return new Promise((resolve, reject) => {
      let { getDataAxiosConfig, getDataParams, getDataConfig } = this.calculateConstraintConfigIn
      let dataFieldArr = getDataAxiosConfig.dataField ? getDataAxiosConfig.dataField.split('.')[0] ? getDataAxiosConfig.dataField.split('.') : ['data'] : ['data']
      if (!getDataAxiosConfig.url || getDataAxiosConfig.data) {
        resolve(getDataConfig)
      } else {
        self.$http[getDataAxiosConfig.method](
          getDataAxiosConfig.url,
          Object.assign({ tableId: this.id }, getDataParams || {})
        ).then((res) => {
          let resData = {}
          if (self.getbasicDataType(res) === 'Array') {
            resData = res
            self.$XModal.message({ status: 'success', message: '操作成功' })
          } else if (self.getbasicDataType(res) === 'Object') {
            if (
              res[getDataAxiosConfig.statusField || 'rscode'] ===
              (getDataAxiosConfig.successCode || '200')
            ) {
              dataFieldArr.forEach((item, index) => {
                if (index === 0) {
                  resData = res[item]
                } else {
                  resData = resData[item]
                }
              })
              resolve(self.generatGetDataMap(resData))
              self.$XModal.message({ status: 'success', message: '操作成功' })
            } else {
              console.log('获取取树数据异常，当前返回数据为：\n', res)
              self.$XModal.message({ status: 'error', message: '获取取树数据异常' })
              reject(res)
            }
          } else {
            console.log('获取取数数据异常，当前返回数据为：\n', res)
            self.$XModal.message({ status: 'error', message: '获取取树数据异常' })
            reject(res)
          }
        }).catch(e => {
          self.$XModal.message({ status: 'error', message: '获取取树数据异常' })
          reject(e)
        })
      }
    })
  },
  generatGetDataMap(res) { // 生成取数map
    //  [{ itemCode: "002", colField: "f005", value: "1500.0" }, { itemCode: "002001", colField: "f005", value: "500.0" }]
    let getDataRenderMap = {}
    res.forEach((item, index) => {
      getDataRenderMap[item.itemCode + ':' + item.colField] = item.value
    })
    this.calculateConstraintConfigIn.getDataRenderMap = getDataRenderMap
    return getDataRenderMap
  },
  // 全量计算和生成约束数据
  performGetDataOption(data) { // 执行取数 并 重新计算和执行约束并渲染表格
    let self = this
    return new Promise((resolve, reject) => {
      self.performGetData().then((getDataRenderMap) => {
        self.calculateConstraintConfigIn.getDataRenderMap = getDataRenderMap
        self.rePerformAllCalcAndConstraintByData(data || self.getTableData().fullData).then(({
          dataCodeRowMap,
          dataCodeRowArr,
          afterCalcData }) => {
          resolve(data)
        }).catch(e => {
          reject(e)
        })
      }).catch(e => {
        reject(e)
      })
    })
  },
  rePerformRowCalcAndConstraintAllAndRerender(data) { // 执行行所设计的所有计算约束并重新渲染
    let self = this
    return new Promise((resolve, reject) => {
      self.rePerformAllCalcAndConstraintByData(data).then(({
        dataCodeRowMap,
        dataCodeRowArr,
        afterCalcData }) => {
        self.updateFooter().then(() => {
        }).catch((e) => {
          throw (e)
        })
      }).catch(e => {
        throw (e)
      })
    })
  },
  rePerformAllCalcAndConstraintByData(data) { // 重新计算和生成约束数据
    // 执行顺序： 取数--> 行内计算--> 分级汇总--> 父级行内计算--> 单元格交叉计算(涉及的行计算)--> 行约束--> 单元格约束
    let self = this
    return new Promise((resolve, reject) => {
      try {
        if (Array.isArray && data.length) {
          let { enabledType, colFormulaConfig, calcAndConstraintTableId, dataType, calcAndConstraintItemCodeField, rowCodeFormulaConfig, colConstraintConfig, rowCodeConstraintConfig, getDataRenderMap, gradedSummaryFields, enabled } = self.calculateConstraintConfigIn
          if (enabled) {
            let isTreeData = dataType === undefined ? self.treeConfigIn : dataType === 'tree' ? 1 : 0
            let tableId = calcAndConstraintTableId || self.id
            let treeData = this.getDataCodeTreeData(data, calcAndConstraintItemCodeField, self.gradedSummaryFields || gradedSummaryFields, isTreeData)
            let { dataCodeRowMap, dataCodeRowArr } = self.recursiveDataCodeRowMap(treeData, calcAndConstraintItemCodeField, true)
            if (enabledType.performGetData) {
              self.performGetDataAll({ data, dataCodeRowMap, dataCodeRowArr, getDataRenderMap, tableId: tableId }) // 渲染取数
            }
            if (enabledType.performColFormula) {
              self.performColFormulaAll({ data, dataCodeRowMap, dataCodeRowArr, gradedSummaryFields: self.gradedSummaryFields || gradedSummaryFields, colFormulaConfig, tableId: tableId, calcColType: 'lastLevel' }) // 行内计算
            }
            if (enabledType.gradedSummary) {
              self.performGradedSummaryAll({ data: treeData, dataCodeRowMap, dataCodeRowArr, gradedSummaryFields: self.gradedSummaryFields || gradedSummaryFields, tableId: tableId }) // 分级汇总
            }
            if (enabledType.performColFormula) {
              self.performColFormulaAll({ data, dataCodeRowMap, dataCodeRowArr, gradedSummaryFields: self.gradedSummaryFields || gradedSummaryFields, colFormulaConfig, tableId: tableId, calcColType: 'parent' }) // 父级行内计算
            }
            if (enabledType.performRowCodeFormula) {
              self.performRowCodeFormula({ data, dataCodeRowMap, dataCodeRowArr, rowCodeFormulaConfig, tableId: tableId }) // 单元格交叉计算
            }
            if (enabledType.performColConstraint) {
              self.performRowConstraintAll({ data, dataCodeRowMap, dataCodeRowArr, colConstraintConfig, tableId: tableId }) // 行内约束
            }
            if (enabledType.performCellConstraint) {
              self.performCellConstraintAll({ data, dataCodeRowMap, dataCodeRowArr, rowCodeConstraintConfig, tableId: tableId }) // 单元格约束
            }
            if (enabledType.performColConstraint || enabledType.performCellConstraint) {
              self.updatedDataAfterConstraint({ data, constrainRowDataMap: self.constrainRowDataMap, dataCodeRowMap, dataCodeRowArr })
            }
            resolve({
              dataCodeRowMap,
              dataCodeRowArr,
              afterCalcData: data
            })
          } else {
            resolve({
              dataCodeRowMap: {},
              dataCodeRowArr: data,
              afterCalcData: data
            })
          }
        } else {
          resolve({
            dataCodeRowMap: {},
            dataCodeRowArr: [],
            afterCalcData: []
          })
        }
      } catch (e) {
        reject(e)
      }
    })
  },
  rePerformRowCalcAndConstraintSingleAndRerender(obj) { // 执行行所涉及的所有计算约束并重新渲染
    let self = this
    return new Promise((resolve, reject) => {
      self.rePerformRowCalcAndConstraintSingle(obj).then(({ row, data, dataCodeRowMap, dataCodeRowArr }) => {
        self.updateFooter().then(() => {
          resolve(true)
        }).catch((e) => {
          resolve(false)
        })
      }).catch(e => {
        resolve(false)
      })
    })
  },

  rePerformRowCalcAndConstraintSingle({ row, data, column }) { // 重新计算和生成单条约束数据
    // 执行顺序： 取数-->行内计算-->分级汇总-->父级行内计算-->单元格交叉计算(涉及的行计算)-->行约束-->单元格约束
    let self = this
    return new Promise((resolve, reject) => {
      try {
        let { enabledType, colFormulaConfig, calcAndConstraintTableId, dataType, calcAndConstraintItemCodeField, colConstraintConfig, rowCodeConstraintConfig, rowCodeFormulaConfig, gradedSummaryFields, enabled } = self.calculateConstraintConfigIn
        if (enabled) {
          let isTreeData = dataType === undefined ? self.treeConfigIn : dataType === 'tree' ? 1 : 0
          let tableId = calcAndConstraintTableId || self.id
          let treeData = this.getDataCodeTreeData(data, calcAndConstraintItemCodeField, self.gradedSummaryFields || gradedSummaryFields, isTreeData)
          let { dataCodeRowMap, dataCodeRowArr } = self.recursiveDataCodeRowMap(treeData, calcAndConstraintItemCodeField, true)
          // self.performGetDataAll({ data, dataCodeRowMap, dataCodeRowArr, getDataRenderMap, tableId: tableId, row }) // 渲染取数
          if (enabledType.performColFormula) {
            self.performColFormulaSingle({ column, data, dataCodeRowMap, gradedSummaryFields: self.gradedSummaryFields || gradedSummaryFields, calcAndConstraintItemCodeField, dataCodeRowArr, colFormulaConfig, tableId: tableId, row, calcColType: 'lastLevel' }) // 行内计算
          }
          if (enabledType.gradedSummary) {
            let gradedSummaryRow = dataCodeRowMap[row['item__pNestCode'].split('_')[0]]
            if (gradedSummaryRow) {
              self.performGradedSummarySingle({ column, data: treeData, dataCodeRowMap, dataCodeRowArr, gradedSummaryFields: self.gradedSummaryFields || gradedSummaryFields, row: gradedSummaryRow, tableId: tableId }) // 分级汇总
            }
          }
          if (enabledType.performColFormula) {
            self.performColFormulaSingle({ data, dataCodeRowMap, column, dataCodeRowArr, calcAndConstraintItemCodeField, gradedSummaryFields: self.gradedSummaryFields || gradedSummaryFields, colFormulaConfig, row, tableId: tableId, calcColType: 'parent' }) // 父级行内计算
          }
          if (enabledType.performRowCodeFormula) {
            self.performRowCodeFormula({ data, dataCodeRowMap, column, dataCodeRowArr, rowCodeFormulaConfig, tableId: tableId }) // 单元格交叉计算
          }
          if (enabledType.performColConstraint) {
            self.performRowConstraintSingle({ data, row, column, dataCodeRowMap, dataCodeRowArr, colConstraintConfig, tableId: tableId }) // 行内约束
          }
          if (enabledType.performCellConstraint) {
            self.performCellConstraintSingle({ data, row, column, dataCodeRowMap, dataCodeRowArr, rowCodeConstraintConfig, tableId: tableId }) // 单元格约束
          }
          if (enabledType.performColConstraint || enabledType.performCellConstraint) {
            self.updatedDataAfterConstraint({ data, constrainRowDataMap: self.constrainRowDataMap, dataCodeRowMap, dataCodeRowArr })
          }
          resolve({ row, data, dataCodeRowMap, dataCodeRowArr })
        } else {
          resolve({ row, data, dataCodeRowMap: {}, dataCodeRowArr: data })
        }
      } catch (e) {
        console.error(e)
        reject(e)
      }
    })
  },
  getDataCodeTreeData(data, calcAndConstraintItemCodeField, gradedSummaryFields, isTreeData) { // 平行数据生成树形数据，以便下一步转换添加映射
    if (isTreeData) {
      return data
    } else if (Array.isArray(gradedSummaryFields) && gradedSummaryFields.length && calcAndConstraintItemCodeField) {
      return this.listToTreeByNestCodeLength(data, calcAndConstraintItemCodeField)
    } else {
      return data
    }
  },
  recursiveDataCodeRowMap(data, codeKey, traverseTree, levelNo = 1, pCode = '', pNCode, obj = { dataCodeRowMap: {}, dataCodeRowArr: [] }) { // 递归生成数据code映射
    let { extendMapInfoField } = this.calculateConstraintConfigIn
    let self = this
    data.forEach((row, index) => {
      if (extendMapInfoField) {
        row['item__level'] = levelNo
        row['item__pcode'] = pCode
        row['item__pNestCode'] = (pNCode ? pNCode + '_' + row[codeKey] : row[codeKey])
      }
      obj.dataCodeRowMap[row[codeKey]] = row
      obj.dataCodeRowArr.push(row)
      if (traverseTree) {
        if (Array.isArray(row.children) && row.children.length) {
          row['last__level'] = 0
          self.recursiveDataCodeRowMap(row.children, codeKey, traverseTree, levelNo + 1, row[codeKey], row['item__pNestCode'], obj)
        } else {
          row['last__level'] = 1
        }
      } else {
        row['last__level'] = 1
      }
    })
    return obj
  },
  performGetDataAll({ data, dataCodeRowMap, getDataRenderMap, tableId }) { // 执行 取数
    if (this.isEmptyObj(getDataRenderMap)) {
      return data
    }
    Object.keys(getDataRenderMap).forEach((renderItemKey) => {
      let renderItemKeyArr = renderItemKey.split(':')
      if (dataCodeRowMap[renderItemKeyArr[0]]) {
        dataCodeRowMap[renderItemKeyArr[0]][renderItemKeyArr[1]] = getDataRenderMap[renderItemKey] || ''
      }
    })
  },
  performGetDataSingle({ data, dataCodeRowMap, calcAndConstraintItemCodeField, getDataRenderMap, tableId, row }) { // 执行 单条数据 取数
    if (this.isEmptyObj(getDataRenderMap)) {
      return data
    }
    Object.keys(getDataRenderMap).forEach((renderItemKey) => {
      let renderItemKeyArr = renderItemKey.split(':')
      if (renderItemKeyArr[0] === row[calcAndConstraintItemCodeField]) {
        row[renderItemKeyArr[0]][renderItemKeyArr[1]] = getDataRenderMap[renderItemKey]
      }
    })
    return data
  },
  performColFormulaAll({ data, dataCodeRowMap, dataCodeRowArr, gradedSummaryFields, colFormulaConfig, tableId, calcColType }) { // 执行 行计算
    // calcColType  执行  lastLevel:最底级，parent:父级 all:全部
    if (this.isEmptyObj(colFormulaConfig)) {
      return data
    }
    let self = this
    dataCodeRowArr.forEach((row) => {
      self.performColFormulaSingle({ data, dataCodeRowMap, dataCodeRowArr, gradedSummaryFields, colFormulaConfig, tableId, calcColType, row })
    })
    return data
  },
  performColFormulaSingle({ data, dataCodeRowMap, dataCodeRowArr, gradedSummaryFields, colFormulaConfig, tableId, calcColType, row }) { // 执行 单条 行计算
    // calcColType  执行  lastLevel:最底级，parent:父级 all:全部
    if (this.isEmptyObj(colFormulaConfig)) {
      return row
    }
    let self = this
    switch (calcColType) {
      case 'all': // 全部计算
        self.reductionColFormula(colFormulaConfig, row)
        break
      case 'parent': // 仅计算父级
        if (row['last__level'] === 1) {
          self.reductionColFormula(colFormulaConfig, row)
        } else if ((Array.isArray(row.children) && row.children.length) || (row['last__level'] !== 0)) {
          self.reductionColFormula(self.getParentColFormulaConfig(self.deepCopy(colFormulaConfig), gradedSummaryFields), row)
        } else {
          self.reductionColFormula(colFormulaConfig, row)
        }
        break
      case 'lastLevel': // 仅计算最低级
        if (!(Array.isArray(row.children) && row.children.length) || (row['last__level'] !== 0)) {
          self.reductionColFormula(colFormulaConfig, row)
        }
        break
    }
    return row
  },
  getParentColFormulaConfig(colFormulaConfig, gradedSummaryFields) { // 分级汇总后如果父级既有分级汇总 也有 计算 以分级汇总为主
    gradedSummaryFields.forEach((item) => {
      delete colFormulaConfig[item]
    })
    return colFormulaConfig
  },
  performGradedSummaryAll({ data, dataCodeRowMap, gradedSummaryFields, tableId }) { // 执行 数组分级汇总计算
    if (!(Array.isArray(gradedSummaryFields) && gradedSummaryFields.length)) {
      return data
    }
    let self = this
    data.forEach((row) => {
      self.performGradedSummarySingle({ row, gradedSummaryFields })
    })
    return data
  },
  performGradedSummarySingle({ row, data, gradedSummaryFields }) { // 执行 单条数据分级汇总计算
    if (!(Array.isArray(gradedSummaryFields) && gradedSummaryFields.length)) {
      return row
    }
    let self = this
    if (Array.isArray(row.children) && row.children.length) {
      gradedSummaryFields.forEach((key) => {
        row[key] = row.children.reduce((preResult, next) => {
          let curItemGradedSummaryValue = 0
          if (Array.isArray(next.children) && next.children.length) {
            curItemGradedSummaryValue = parseFloat(self.performGradedSummarySingle({ row: next, gradedSummaryFields })[key])
          } else {
            curItemGradedSummaryValue = parseFloat(next[key])
          }
          return preResult + (isNaN(curItemGradedSummaryValue) ? 0 : curItemGradedSummaryValue)
        }, 0)
      })
    }
    return row
  },
  performRowCodeFormula({ data, dataCodeRowMap, rowCodeFormulaConfig, tableId }) { // 执行 单元格交叉计算
    this.reductionRowCodeFormula(rowCodeFormulaConfig, data, tableId)
  },
  performRowConstraintAll({ data, dataCodeRowMap, dataCodeRowArr, colConstraintConfig, tableId }) { // 执行 行内约束
    this.genarateRowConstraintMapAll({ data, dataCodeRowMap, dataCodeRowArr, colConstraintConfig, tableId })
  },
  performCellConstraintAll({ data, dataCodeRowMap, rowCodeConstraintConfig, dataCodeRowArr, tableId }) { // 执行 单元格约束
    this.genarateCellConstraintMapAll({ data, dataCodeRowMap, rowCodeConstraintConfig, dataCodeRowArr, tableId })
  },
  performRowConstraintSingle({ data, dataCodeRowMap, colConstraintConfig, dataCodeRowArr, tableId, row }) { // 执行 单条数据的行内约束
    this.genarateRowConstraintMapSingle({ data, dataCodeRowMap, colConstraintConfig, tableId, row })
  },
  performCellConstraintSingle({ rowCodeConstraintConfig, data, dataCodeRowMap, tableId, row, column }) { // 执行 单条数据的行内约束
    let { calcAndConstraintItemCodeField } = this.calculateConstraintConfigIn
    let curCellConstraint = rowCodeConstraintConfig[row[calcAndConstraintItemCodeField] + ':' + (column.property || column.field)]
    if (curCellConstraint) {
      this.genarateCellConstraintMapSingle(dataCodeRowMap, curCellConstraint, tableId)
    }
  }
}
const constraintTool = {
  // 约束部分 行内约束
  // 底级取数-->行计算-->分级汇总-->父级行计算-->单元格交叉计算-->约束
  genarateRowConstraintMapAll({ colConstraintConfig, tableData, dataCodeRowMap, dataCodeRowArr, tableId }) {
    // 生成约束map
    let self = this
    this.each(dataCodeRowArr, (rowIndex, row) => {
      self.genarateRowConstraintMapSingle({ colConstraintConfig, row, tableId })
    })
  },
  genarateRowConstraintMapSingle({ colConstraintConfig, row, tableId }) { // 生成单条数据约束map
    let self = this
    let { calcAndConstraintItemCodeField } = this.calculateConstraintConfigIn
    self.constrainRowDataMap[row[calcAndConstraintItemCodeField]] = self.constrainRowDataMap[row[calcAndConstraintItemCodeField]] || {}
    let dataMap = self.constrainRowDataMap[row[calcAndConstraintItemCodeField]]
    this.each(colConstraintConfig, (key, item) => {
      self.parsingRowConstraintConfigToMapData(colConstraintConfig[key], row, dataMap, tableId, colConstraintConfig)
    })
  },
  parsingRowConstraintConfigToMapData(expression, row, dataMap, tableId, colConstraintConfig) { // 生成单条数据约束map
    let self = this
    expression.split('--&&--').forEach((item, index) => {
      let rowConstraintArr = item.split('::')
      dataMap[rowConstraintArr[0]] = dataMap[rowConstraintArr[0]] || {}
      dataMap[rowConstraintArr[0]][rowConstraintArr[1]] = self.parsingRowConstraintConfigToValueData(rowConstraintArr[2], rowConstraintArr[1], row)
      if (rowConstraintArr[1] === 'value' || rowConstraintArr[1] === 'clear') { // 如果a的值改变导致c的值改变，c的值改变又会改变其他，则递归调用
        if (colConstraintConfig[rowConstraintArr[0]]) {
          self.parsingRowConstraintConfigToValueData(colConstraintConfig[rowConstraintArr[0]], row, dataMap, tableId, colConstraintConfig)
        }
      }
    })
  },
  parsingRowConstraintConfigToValueData(expression, type, row, tableId) {
    // 生成当条age:1001:1001
    // type: visible editble clear style value getData
    let value = null
    switch (type) {
      case 'visible':
        value = !!this.evalEpression(this.replaceRowEpressionValue(expression, row, tableId))
        break
      case 'editable':
        value = !!this.evalEpression(this.replaceRowEpressionValue(expression, row, tableId))
        break
      case 'clear':
        value = !!this.evalEpression(this.replaceRowEpressionValue(expression, row, tableId))
        break
      case 'value':
        value = this.evalEpression(this.replaceRowEpressionValue(expression, row, tableId))
        break
      case 'style':
        value = this.transExpressionToObject(this.pasingExpression(this.replaceRowEpressionValue(expression, row, tableId)), row)
        break
      case 'getData':
        value = {}
        break
    }
    return value
  },
  replaceRowEpressionValue(expression, row, tableId) {
    let regR = new RegExp('({[a-zA-Z0-9_]*})', 'ig')
    let rowsKey = expression.match(regR) || []
    rowsKey = Array.from(new Set(rowsKey))
    if (rowsKey.length) {
      for (let keyC in rowsKey) {
        let reg = new RegExp('(' + rowsKey[keyC].replace(/\$/ig, '\\$') + ')', 'ig')
        let keyF = rowsKey[keyC].replace(/\{|\}/g, '')
        expression = expression.replace(reg, row[keyF] || 0)
      }
    }
    return expression
  },
  evalEpression(expression) {
    // 执行表达式
    // eslint-disable-next-line no-new-func
    return new Function('return ' + expression)()
  },
  pasingExpression(expression) {
    let str = ''
    try {
      this.each(expression.split('--+--'), (index, item) => {
        if (index === 0) {
          str += 'if(' + item.split('--??--')[0] + '){return "' + item.split('--??--')[1] + '"}'
        } else {
          str += 'else if(' + item.split('--??--')[0] + '){return "' + item.split('--??--')[1] + '"}'
        }
      })
      str += 'else{return ""}'
      return new Function(str)()
    } catch (e) {
      console.error(e)
      return ''
    }
  },
  performRowConstraintAndRerender(row) {
    // 执行当前行约束并重新渲染
    let calcAndConstraintItemCodeField = this.calculateConstraintConfigIn.calcAndConstraintItemCodeField
    if (this.calculateConstraintConfigIn.constraintConfig.row) {
      this.constrainRowDataMap[row[calcAndConstraintItemCodeField]] = self.constrainRowDataMap[row[calcAndConstraintItemCodeField]] || {}
      this.constrainRowDataMap[row[calcAndConstraintItemCodeField]] = self.genarateRowConstraintMap(self.deepCopy(this.calculateConstraintConfigIn.constraintConfig.row), row, self.constrainRowDataMap[row[calcAndConstraintItemCodeField]])
      this.$refs.xGrid.refreshColumn()
    }
  },
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
        result[name] = valueArr[i].substring(pos + 1).match(new RegExp('({[a-zA-Z0-9_:\$]*})', 'ig')) ? this.evalEpression(valueArr[i].substring(pos + 1)) : valueArr[i].substring(pos + 1)
      }
      return result
    } catch (e) {
      console.error(e)
      return {}
    }
  },
  performConstraintAndRerender() {
    // 执行约束并重新渲染
    this.constrainRowDataMap = {}
    this.genarateConstraintMap(this.calculateConstraintConfigIn.constraintConfig, this.getTableData().fullData)
    this.$refs.xGrid.refreshColumn()
  },
  // 约束部分 单元格间约束
  genarateCellConstraintMapAll({ rowCodeConstraintConfig, data, dataCodeRowMap, tableId }) {
    let self = this
    self.each(rowCodeConstraintConfig, (itemkey, item) => {
      self.genarateCellConstraintMapSingle(dataCodeRowMap, item, tableId, rowCodeConstraintConfig)
    })
  },
  genarateCellConstraintMapSingle(dataCodeRowMap, item, tableId, rowCodeConstraintConfig) {
    let self = this
    try {
      let { constrainRowDataMap } = this
      item.split('--&&--').forEach((item, index) => {
        let rowConstraintArr = item.split('::')
        let itemCodeFieldArr = rowConstraintArr[0].split(':')
        constrainRowDataMap[itemCodeFieldArr[0]] = constrainRowDataMap[itemCodeFieldArr[0]] || {}
        constrainRowDataMap[itemCodeFieldArr[0]][itemCodeFieldArr[1]] = constrainRowDataMap[itemCodeFieldArr[0]][itemCodeFieldArr[1]] || {}
        constrainRowDataMap[itemCodeFieldArr[0]][itemCodeFieldArr[1]][rowConstraintArr[1]] = self.parsingCellConstraintConfigToValueData(rowConstraintArr[2], rowConstraintArr[1], dataCodeRowMap, tableId)
        if (rowConstraintArr[1] === 'value' || rowConstraintArr[1] === 'clear') { // 如果a的值改变导致c的值改变，c的值改变又会改变其他，则递归调用
          if (rowCodeConstraintConfig[itemCodeFieldArr[0] + ':' + itemCodeFieldArr[1]]) {
            self.genarateCellConstraintMapSingle(dataCodeRowMap, rowCodeConstraintConfig[itemCodeFieldArr[0] + ':' + itemCodeFieldArr[1]], tableId, rowCodeConstraintConfig)
          }
        }
      })
    } catch (e) {
      console.error(e)
    }
  },
  parsingCellConstraintConfigToValueData(expression, type, dataCodeRowMap, tableId) {
    // 生成当条age:1001:1001
    // type: visible editble clear style value getData
    let value = null
    switch (type) {
      case 'visible':
        value = !!this.evalEpression(this.replaceCellEpressionValue(expression, dataCodeRowMap, tableId))
        break
      case 'editable':
        value = !!this.evalEpression(this.replaceCellEpressionValue(expression, dataCodeRowMap, tableId))
        break
      case 'clear':
        value = !!this.evalEpression(this.replaceCellEpressionValue(expression, dataCodeRowMap, tableId))
        break
      case 'value':
        value = this.evalEpression(this.replaceCellEpressionValue(expression, dataCodeRowMap, tableId))
        break
      case 'style':
        value = this.transExpressionToObject(this.pasingExpression(this.replaceCellEpressionValue(expression, dataCodeRowMap, tableId)), dataCodeRowMap)
        break
      case 'getData':
        value = {}
        break
    }
    return value
  },
  replaceCellEpressionValue(expression, dataCodeRowMap, tableId) {
    try {
      let self = this
      let regR = new RegExp('({[a-zA-Z0-9_:\$]*})', 'ig')
      let rowsKey = expression.match(regR) || []
      rowsKey = Array.from(new Set(rowsKey))
      if (rowsKey.length) {
        for (let keyCF in rowsKey) {
          let formulaArr = rowsKey[keyCF].replace(/\{|\}/g, '').split(':')
          let reg = new RegExp('({' + formulaArr.join(':').replace(/\$/ig, '\\$') + '})', 'ig')
          if (formulaArr[0] === tableId) {
            if (dataCodeRowMap[formulaArr[2]]) {
              expression = expression.replace(reg, self.getDataCodeRowMapCumulativeResult(dataCodeRowMap[formulaArr[2]], formulaArr[1]))
            } else {
              expression = expression.replace(reg, 0)
            }
          } else {
            expression = expression.replace(reg, 0)
          }
        }
      }
      return expression
    } catch (e) {
      console.error(e)
      return ''
    }
  },
  updatedDataAfterConstraint({ data, constrainRowDataMap, dataCodeRowMap, dataCodeRowArr }) { // 更新表格数据
    let self = this
    let calcAndConstraintItemCodeField = this.calculateConstraintConfigIn.calcAndConstraintItemCodeField
    self.each(dataCodeRowArr, (rowIndex, row) => {
      let curRowConstrainRowDataMap = constrainRowDataMap[row[calcAndConstraintItemCodeField]]
      self.each(curRowConstrainRowDataMap, (itemkey, item) => {
        if (item.value !== undefined) {
          row[itemkey] = item.value
        } else if (item.clear) {
          row[itemkey] = ''
        } else {

        }
      })
    })
    return data
  }
}
const otherFn = {
  getListData() {
    // 获取表单数据
    const { fullData } = this.$refs.xGrid.getTableData()
    const data = fullData || []
    return this.dealData(data)
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
  },
  // 递归总计带children的合计总和
  loopAddSubTotal(total = 0, itemData = {}, property) {
    if (itemData.children && itemData.children.length) {
      itemData.children.forEach(it => {
        total = otherFn.loopAddSubTotal(total, it, property)
      })
    }
    let itVal = ((typeof (itemData[property]) === 'number' || typeof (itemData[property]) === 'string') && itemData[property] !== '') ? parseFloat(itemData[property].toString().split(',').join('')) : 0
    total += Number(itVal)
    return total
  }
}
const batchModify = { // 批量修改
  onBatchModifyItemChange(obj, modifyForm) {
    this.$emit('onBatchModifyItemChange', obj, modifyForm)
  },
  omBatchModifySureClick({ modifyItem, formData }) {
    // 批量修改确认
    const selection = this.selection
    selection.forEach((row, index) => {
      row = Object.assign(row, formData)
    })
    self.reCalcAndReLoadTableData({ data: this.getTableData().fullData, modifyItem, modifyData: formData }).then((obj) => {
      self.$emit('onBatchModifySuccess', obj, self, self.$refs.xGrid)
    })
  }
}
const exportAndImportFn = {
  /**
   * 导出数据行相关数据字段计算
   * @description 金额列根据单位计算；进度百分比列添加'%'
   * @params row {Object} 当前行数据
   * @params moneyKeys {Array} 金额列field数组
   * @params ratioKeys {Array} 进度列field数组
   * */
  computedExportRow(row, moneyKeys, ratioKeys) {
    // 金额列根据单位进行计算
    moneyKeys.forEach(key => {
      row[key] = (row[key] && this.moneyUnit) ? (row[key] / this.moneyUnit) : ''
    })
    // 进度列增加%
    // ratioKeys.forEach(key => {
    //   row[key] = row[key] ? Number.prototype.toFixed.call(row[key], 1) : ''
    // })
  },
  getPrintOption(exportModalFormData) {
    const checkColumns = []
    this.$XEUtils.eachTree(exportModalFormData.columns, column => {
      const isColGroup = column.children && column.children.length
      if (!isColGroup) {
        checkColumns.push(column)
      }
    })
    return {
      data: exportModalFormData[exportModalFormData.dataType],
      isHeader: true,
      columns: checkColumns
    }
  },
  onPrintClick(obj) {
    this.$refs.xGrid.$refs.xTable.print(Object.assign({}, this.getPrintOption(obj)))
    // this.$VXETable.print()
  },
  triggerExportOption(obj) {
    // 触发导出动作
    let self = this
    const columns = this.deepCopy(this.tableColumnsConfig)
    const { tableData, fullData, treeExpandData, selection } = this.getTableData()

    // 获取金额、进度特殊字段列表
    const [moneyKeys, ratioKeys] = [[], []]
    this.$XEUtils.eachTree(columns, item => {
      if (item?.type === 'money' || item.cellRender?.name === '$vxeMoney') {
        moneyKeys.push(item.field)
      } else if (item.cellRender?.name === '$vxeRatio') {
        ratioKeys.push(item.field)
      }
    })
    // 深拷贝，为后续计算真实值做准备
    const [
      computedFullData,
      computedExpandData
    ] = [
      this.$XEUtils.clone(fullData, true),
      this.$XEUtils.clone(treeExpandData, true)
    ]
    const fullDataTreeArr = XEUtils.toTreeArray(computedFullData)
    const treeExpandDataTreeArr = XEUtils.toTreeArray(computedExpandData)

    this.$XEUtils.eachTree(computedFullData, item => {
      if (self.isTreeSeqToFlat) {
        const findIndex = fullDataTreeArr.findIndex(it => it[rowUuidKeyName] === item[rowUuidKeyName])
        item.seqIndex = fullDataTreeArr[0]?.id === '#' ? item.id === '#' ? '#' : findIndex : findIndex + 1
      }

      this.computedExportRow(item, moneyKeys, ratioKeys)
    })

    this.$XEUtils.eachTree(computedExpandData, item => {
      if (self.isTreeSeqToFlat) {
        const findIndex = treeExpandDataTreeArr.findIndex(it => it[rowUuidKeyName] === item[rowUuidKeyName])
        item.seqIndex = treeExpandDataTreeArr[0]?.id === '#' ? item.id === '#' ? '#' : findIndex : findIndex + 1
      }
      this.computedExportRow(item, moneyKeys, ratioKeys)
    })

    const latestTableData = {
      columns, // 表头配置
      fullData: computedFullData, // 使用计算后的fullData
      tableData,
      treeExpandData: computedExpandData, // 使用计算后的expendData
      selection
    }
    this.exportModalData = Object.assign({
      isExportTree: !!self.treeConfigIn,
      saveType: '.xlsx',
      fileName: 'export', // 文件名
      dataType: !self.treeConfigIn ? 'fullData' : 'treeExpandData',
      isExportHead: true, // 是否导出表头
      isExportFooter: false, // 是否导出表尾部
      isExportOnlySourceField: false, // 是否只导出数据源表头字段，
      isExportOnlyViewTitle: false, // 是否只导出数据表头名称，
      isExportOriginalData: false, // 是否导出源数据
      isExportData: true, // 是否导出数据
      columns: columns, // 表头配置
      fullData: fullData,
      tableData: tableData,
      treeExpandData: treeExpandData,
      datas: [], // 源数据, 如果胃空数组则取dataType 对应的数据，否则直接以datas导出
      selection: selection, // 选中数据
      index: true, // 是否添加序号,
      ignoreColsTypes: [
        'dragSort',
        'seq',
        'checkbox',
        'radio',
        'optionRow',
        'expand',
        'attach',
        'ach',
        'list',
        'attachlist'
      ], // 忽略导出的列类型
      viewValueFormat(value, row, column) {
        // 视图数据格式化方法
        // return value
      }
    }, this.tableGlobalConfig.customExportConfig, this.exportModalData || {}, obj || {}, latestTableData)
    this.exportModalVisible = true
  },
  onExportClick(obj, ec) {
    // 确定导出点击事件
    obj.successCb = () => {
      this.exportModalVisible = false
    }
    if (obj.onlyConfigExport) {
      this.$emit('onExportClick', obj, ec)
    } else {
      console.log(obj)
      this.$Export.exportExcel(obj, this)
    }
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
  deaImportViewData(obj = {
    conlums: [],
    viewData: [],
    valiRules: {}
  }) {
    // 处理 导入数据
    let self = this
    let { viewToSourceMap, tableColumnsTitleFieldMap, tableColumnsFieldMap, rowsObjTemp, colFormulaConfig } = this.generateColumnsAllMap(obj.conlums)
    let validResult = true
    let validResultFieldTitle = []
    let formatData = false
    // let valiRule = []
    if (process.env.VUE_APP_CONF_ISHB) {
      let valiRule = {}
      obj.viewData.map((row, rowIndex) => {
        for (let key in tableColumnsFieldMap) {
          let column = tableColumnsFieldMap[key]
          let flag = false
          // 每一列不重复校验
          let fieldValue = row[column.title]
          let field = column.field
          if (column.required) {
            // 必填
            if (field === 'pay_amt' || field === 'pay_app_amt' || field === 'xpay_amt') {
              // 金额需大于0
              if (!fieldValue || isNaN(fieldValue) || row[field] * 1 < 0) {
                flag = true
                let msg = `第${rowIndex + 1}行${column.title}需为大于0的数字`
                this.collectValidError(valiRule, rowIndex, field, column, msg)
              }
            } else {
              if (!fieldValue) {
                flag = true
                this.collectValidError(valiRule, rowIndex, field, column, `第${rowIndex + 1}行${column.title}为必填项`)
              }
            }
          }
          if (column.reg && !flag) {
            let value = fieldValue
            if (!column.reg.test(value)) {
              flag = true
              this.collectValidError(valiRule, rowIndex, field, column, `第${rowIndex + 1}行${column.msg}`)
            }
          }
          if (column.validator && typeof (column.validator) === 'function' && !flag) {
            let data = row
            let res = column.validator.call(this, data)
            if (!res.result) {
              this.collectValidError(valiRule, rowIndex, field, column, `第${rowIndex + 1}行${res.msg}`)
            }
          }
          // 校验规则
          if (obj.valiRules) {
            let valiRules = Object.keys(obj.valiRules)
            if (valiRules && valiRules.length > 0) {
              if (fieldValue) {
                valiRules.forEach(ruleField => {
                  if (ruleField === field) {
                    let reg = obj.valiRules[ruleField]
                    if (reg instanceof RegExp) {
                      let r = new RegExp(reg)
                      if (!r.test(fieldValue)) {
                        this.collectValidError(valiRule, rowIndex, field, column, `第${rowIndex + 1}行${obj.valiRules[ruleField + '_msg']}`)
                      }
                    } else if (reg instanceof Function) {
                      let res = reg.call(this, fieldValue, row, column.title)
                      if (res && !res.result) {
                        this.collectValidError(valiRule, rowIndex, field, column, `第${rowIndex + 1}行${res.msg}`)
                      }
                    }
                  }
                })
              }
            }
          }
        }
      })
      if (Object.keys(valiRule).length > 0) {
        return {
          result: false,
          valiRule: valiRule
        }
      }
      this.importModalVisible = false
    }
    let viewData = obj.viewData.map((row, rowIndex) => {
      Object.keys(row).forEach((key, keyIndex) => {
        let parseViewValue = self.reverseParseViewDataTosource(viewToSourceMap[tableColumnsTitleFieldMap[key]], row[key])
        // const customVal = String(parseViewValue).replace(/null|undefined|\s+/ig, '') !== ''
        if (tableColumnsFieldMap[tableColumnsTitleFieldMap[key]]) {
          // self.validCellRules({ type: 'all', row, column: tableColumnsFieldMap[tableColumnsTitleFieldMap[key]], val: parseViewValue, valiRules: obj.valiRules })
          //   .then(() => {
          //     if (customVal) {
          row[tableColumnsTitleFieldMap[key]] = parseViewValue
          if (tableColumnsTitleFieldMap[key] === 'iname') {
            row['itemcode'] = parseViewValue.split('-')[0].replace(/\s+/ig, '')
          }
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
          if (key !== '序号' || key !== 'seqIndex') {
            validResultFieldTitle.push(key)
          }
        }
      })
      row = Object.assign({}, rowsObjTemp, row)
      formatData = true
      return this.reductionColFormula(colFormulaConfig, self.reductionColFormula(colFormulaConfig, row))
    })
    if (formatData) return viewData
    self.reductionRowCodeFormula(this.calculateConstraintConfigIn.rowCodeFormulaConfig, viewData, self.id)
    return validResult && !validResultFieldTitle.length && viewData
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
      return value + ''.replace(/null|NaN|undefined|,/ig, '')
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
      maxWidth: rule.maxWidth,
      message: rule.message
    })
  },
  validCellRules(argObj) {
    // 校验单元格
    let self = this
    const { type, row, column, val, valiRules } = argObj
    const property = column.field
    const errorRules = []
    const syncVailds = []
    if (property && valiRules) {
      const rules = self.$XEUtils.get(valiRules, property)
      if (rules) {
        const cellValue = val
        // const cellValue = self.$XEUtils.isUndefined(val) ? self.$XEUtils.get(row, property) : val
        rules.forEach(rule => {
          if (type === 'all') {
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
                  errorRules.push(self.newRule({ type: 'custom', message: customValid.message, rule: self.newRule(rule) }))
                } else if (customValid.catch) {
                  // 如果为异步校验（注：异步校验是并发无序的）
                  syncVailds.push(
                    customValid.catch(e => {
                      this.validRuleErr = true
                      errorRules.push(self.newRule({ type: 'custom', message: e ? e.message : rule.message, rule: self.newRule(rule) }))
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
  },
  downLoadImportTemplate(obj, tabPanal) {
    // 下载导入模版
    const tableColumnsConfig = this.tableColumnsConfig
    this.$Export.exportExcel({
      saveType: '.xlsx',
      fileName: '导入模版', // 文件名
      dataType: 'fullData',
      isExportOnlyViewTitle: true, // 是否只导出数据源表头字段，
      columns: tableColumnsConfig, // 表头配置
      index: false // 是否添加序号,
    }, this)
  },
  triggerImportOption(config = {}) {
    // 触发导入
    this.importConfig = config
    this.importModalVisible = true
  },
  triggerDownloadTemplate(obj) {
    this.onDownloadTemplateClick(obj)
  },
  onDownloadTemplateClick(obj) {
    // 下载模版
    if (typeof (this.importConfig.downloadTemplateCallback) === 'function') {
      this.importConfig.downloadTemplateCallback(this.importData)
    } else {
      this.importData = []
      const columns = this.tableColumnsConfig
      const selection = this.selection
      let defaultConfig = {
        isExportTree: !!self.treeConfigIn,
        saveType: '.xlsx',
        fileName: 'importTempplate', // 文件名
        dataType: 'fullData',
        isExportOnlySourceField: true, // 是否只导出数据源表头字段，
        isExportOnlyViewTitle: false, // 是否只导出数据表头名称，
        isExportHead: true, // 是否导出表头
        exportViewTitleType: 'nestTitle',
        isExportFooter: false, // 是否导出表尾部
        isExportOriginalData: true, // 是否导出源数据
        isExportData: true, // 是否导出数据
        columns: columns, // 表头配置
        datas: [], // 源数据,
        selection: selection, // 选中数据
        index: true, // 是否添加序号,
        ignoreColsTypes: [
          'dragSort',
          'seq',
          'checkbox',
          'radio',
          'optionRow',
          'expand',
          'attach',
          'ach',
          'list',
          'attachlist'
        ] // 忽略导出的列类型
      }
      this.$Export.exportExcel(obj ? Object.assign(defaultConfig, obj) : obj, this)
    }
  },
  async onImportFileClick() {
    // 导入文件
    let self = this
    await this.$Import.importExcel({
    }, (result, filename) => {
      // this.tableDataIn = result
      self.importData = result
      self.fileConfig.fileName = filename
    })
  },
  onImportClick() {
    // 导入提交
    if (!this.importData.length) {
      this.$XModal.message({ status: 'error', message: '无数据导入请重新导入数据！' })
    } else {
      this.importModalVisible = false
      if (typeof (this.importConfig.importSuccessCallback) === 'function') {
        this.importConfig.importSuccessCallback(this.importData)
      } else {
        this.$emit('importSuccessCallback', this.importData)
      }
    }
  }
}

// 设置column金额过滤
const useMoneyFilter = {
  setColumnMoneyFilter (columns) {
    columns?.forEach(column => {
      const flag = column.cellRender?.name === '$vxeMoney' || column.type === 'money'
        ? (this.tableConfig.globalConfig?.useMoneyFilter && column.useMoneyFilter !== false) || column.useMoneyFilter
        : false

      if (flag) {
        Object.assign(column, getColumnMoneyFilterConfig(column))
      }
      column.children && this.setColumnMoneyFilter(column.children)
    })
  }
}

export default {
  ...util, // 工具类
  ...sortMethods, // 排序
  ...axiosEvent, // 请求
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
  ...batchModify, // 批量修改
  ...calculateTool, // 单元格计算
  ...calcAndConstraint, // 计算约束部分
  ...constraintTool, // 约束解析
  ...exportAndImportFn, // 导入导出工具类
  ...useMoneyFilter // 金额筛选
}
