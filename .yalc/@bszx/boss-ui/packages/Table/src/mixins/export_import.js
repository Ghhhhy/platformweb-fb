/*
 * @Author: 轻语
 * @Date: 2021-11-15 16:58:22
 * @LastEditors: xkj
 * @LastEditTime: 2023-02-08 14:51:33
 * @Description:
 */
import { Import } from '../components/import/import/import'
import { Export } from '../components/export/export/export.js'
import { rowUuidKeyName } from '../tools/const.js'
export default {
  props: {
  },
  data() {
    return {
      importConfig: {},
      exportModalData: {},
      importData: [], // 导入数据
      importModalVisible: false, // 导入弹框
      fileConfig: {
        fileName: '',
        maxSize: 1024 * 1024 * 10
      }, // 导入文件配置
      exportModalVisible: false // 导出弹框
    }
  },
  watch: {
    importModalVisible: {
      handler(newvalue, oldvalue) {
        this.fileConfig.fileName = ''
      },
      immediate: true
    }
  },
  methods: {
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
        columns: checkColumns,
        style: `
          @page :right{
            margin-top: 30px;
            margin-bottom: 30px;
            margin-right: 2cm;
          }
          @page :left{
            margin-top: 30px;
            margin-bottom: 30px;
            margin-right: 2cm;
          }
          @page {
            size: A4 landscape;
          }
          `
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
      const { tableData, fullData, treeExpandData } = this.getTableData()
      // 深拷贝，为后续计算真实值做准备
      const [
        computedFullData,
        computedExpandData
      ] = [
        this.$XEUtils.clone(fullData, true),
        this.$XEUtils.clone(treeExpandData, true)
      ]
      const fullDataTreeArr = this.$XEUtils.toTreeArray(computedFullData)
      const treeExpandDataTreeArr = this.$XEUtils.toTreeArray(computedExpandData)

      this.$XEUtils.eachTree(computedFullData, item => {
        if (self.isTreeSeqToFlat) {
          const findIndex = fullDataTreeArr.findIndex(it => it[rowUuidKeyName] === item[rowUuidKeyName])
          item.seqIndex = fullDataTreeArr[0]?.id === '#' ? item.id === '#' ? '#' : findIndex : findIndex + 1
        }
      })

      this.$XEUtils.eachTree(computedExpandData, item => {
        if (self.isTreeSeqToFlat) {
          const findIndex = treeExpandDataTreeArr.findIndex(it => it[rowUuidKeyName] === item[rowUuidKeyName])
          item.seqIndex = treeExpandDataTreeArr[0]?.id === '#' ? item.id === '#' ? '#' : findIndex : findIndex + 1
        }
      })
      const latestTableData = {
        columns, // 表头配置
        fullData: computedFullData, // 使用计算后的fullData
        tableData,
        treeExpandData: computedExpandData // 使用计算后的expendData
      }

      const selection = this.selection

      const isRH = window['__BS_UI_GLOBAL_CONFIG__']?.project?.name === 'rh'

      this.exportModalData = Object.assign({
        isExportTree: !!self.treeConfigIn,
        saveType: '.xlsx',
        fileName: this.title || 'export', // 文件名
        dataType: !isRH ? 'fullData' : !self.treeConfigIn ? 'fullData' : 'treeExpandData', // fullData || selection
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
      }, this.tableGlobalConfig.customExportConfig, obj || {}, latestTableData)
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
      // let valiRule = []
      let viewData = obj.viewData.map((row, rowIndex) => {
        Object.keys(row).forEach((key, keyIndex) => {
          let parseViewValue = self.reverseParseViewDataTosource(viewToSourceMap[tableColumnsTitleFieldMap[key]], row[key])
          // const customVal = String(parseViewValue).replace(/null|undefined|\s+/ig, '') !== ''
          if (tableColumnsFieldMap[tableColumnsTitleFieldMap[key.replace('(元)', '')]]) {
            // self.validCellRules({ type: 'all', row, column: tableColumnsFieldMap[tableColumnsTitleFieldMap[key]], val: parseViewValue, valiRules: obj.valiRules })
            //   .then(() => {
            //     if (customVal) {
            row[tableColumnsTitleFieldMap[key.replace('(元)', '')]] = parseViewValue
            if (tableColumnsTitleFieldMap[key.replace('(元)', '')] === 'iname') {
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
        return this.reductionColFormula(colFormulaConfig, self.reductionColFormula(colFormulaConfig, row))
      })
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
      let tableColumnsConfig = this.deepCopy(this.tableColumnsConfig)
      if (this.$parent.tableColumnsImportConfig) {
        tableColumnsConfig = this.$parent.tableColumnsImportConfig
      }
      if (tableColumnsConfig[0].title !== '序号' && this.tableGlobalConfigIn.exportConfig.seqIndex) {
        let seq = {
          field: 'seqIndex',
          title: '序号',
          type: 'seqIndex'
        }
        tableColumnsConfig.unshift(seq)
      }
      this.$Export.exportExcel({
        saveType: '.xlsx',
        fileName: '导入模版', // 文件名
        dataType: 'fullData',
        isExportOnlyViewTitle: !this.importConfig.isTreeTitle, // 是否只导出数据源表头字段，
        isExportOriginalData: false, // 是否导出源数据
        columns: tableColumnsConfig, // 表头配置
        index: false // 是否添加序号,
      }, this)
    },
    triggerImportOption(config = {}) {
      // 触发导入
      this.importConfig = config
      this.importConfig.downloadTemplate = this.tableGlobalConfigIn?.importConfig?.downloadTemplate || true
      this.importConfig.useloadTemplate = this.tableGlobalConfigIn?.importConfig?.useloadTemplate || false
      this.importConfig.loadTemplateUrl = this.tableGlobalConfigIn?.importConfig?.loadTemplateUrl || ''
      this.importConfig.replaceFileName = this.tableGlobalConfigIn?.importConfig?.replaceFileName || false
      this.importConfig.isMultiple = this.tableGlobalConfigIn?.importConfig?.isMultiple || ''
      this.importConfig.DownloadTemplateWay = this.tableGlobalConfigIn?.importConfig?.DownloadTemplateWay || ''
      this.importConfig.isTreeTitle = this.tableGlobalConfigIn?.importConfig?.isTreeTitle || false
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
          fileName: 'importTemplate', // 文件名
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
    async onImportFileClick(conf) {
      // 导入文件
      let self = this
      await this.$Import.importExcel({
        ...conf
      }, (result, filename, files) => {
        if (conf.isMultiple) {
          self.importFileList.push(...files)
        } else {
          self.importData = result
          self.fileConfig.fileName = filename
          self.importFileList = files
        }
        conf.cb && conf.cb(files)
      })
    },
    onImportClick() {
      // 导入提交
      if (!this?.importData?.length && !Object.keys(this?.importData).length) {
        this.$XModal.message({ status: 'error', message: '无数据导入请重新导入数据！' })
      } else {
        this.importModalVisible = false
        if (typeof (this.importConfig.importSuccessCallback) === 'function') {
          this.importConfig.importSuccessCallback(this.importData, this.importFileList)
        } else {
          this.$emit('importSuccessCallback', this.importData, this.importFileList)
        }
      }
    },
    onDownloadTemplateClickByPort() {
      this.$emit('onDownloadTemplateClickByPort')
    },
    importClear() {
      this.importData = null
      this.fileConfig.fileName = ''
      this.importFileList = []
    },
    onImportUpload() {
      // 导入提交
      if (this?.importFileList.length <= 0) {
        this.$XModal.message({ status: 'error', message: '请先导入文件！' })
      } else {
        if (typeof (this.importConfig.importSuccessCallback) === 'function') {
          this.importConfig.importSuccessCallback(this?.importFileList)
        }
        this.$refs.ImportModel.closeAndClear()
      }
    }
  },
  mounted() {
    this.$Import = new Import()
    this.$Export = new Export()
  }
}
