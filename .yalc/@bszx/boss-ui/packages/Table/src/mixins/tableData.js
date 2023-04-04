/*
 * @Author: 轻语
 * @Date: 2021-11-04 14:29:46
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-02-03 14:44:48
 * @Description:
 */
import EvalCall from '../../../tools/Eval.js'

import { rowUuidKeyName, rowUniqueLevelKey } from '../tools/const'
import toolsUtils from '../tools/utils'

export default {
  props: {
    tableData: { // 表内容
      type: Array,
      default: () => []
    },
    id: {
      type: String,
      default () {
        return 'TableGeneral'
      }
    }
  },
  data() {
    return {
      tableDataIn: [], // 表格数据，
      tableDataMap: {}, // 表格映射数据，
      tableColumnsFieldMap: {}, // 字段映射
      tableColumnsFieldArr: [], // 字段数组
      selection: [] // 当前选中集合
    }
  },
  watch: {
    tableData: { // 表格数据
      handler() {
        this.initTableData()
      },
      immediate: true
    }
  },
  methods: {
    initTableData(data) { // 初始化表格数据
      // 执行顺序： 取数-->行内计算-->分级汇总-->父级行内计算-->单元格交叉计算(涉及的行计算)-->行约束-->单元格约束
      let self = this
      this.initCalculateConstraintConfig()

      this.selection = []
      data = Array.isArray(data || this.tableData) ? (data || this.tableData) : []
      // 给树形表格(非treeTable，是配置了treeConfig的table)数据设置属性
      this.treeConfig && this.setRowProperty(data)
      return new Promise((resolve) => {
        this.rePerformAllCalcAndConstraintByData(self.unidirectionalData ? self.deepCopy(data) : data).then(({ dataCodeRowMap, afterCalcData }) => {
          self.tableDataMap = dataCodeRowMap
          self.tableDataIn = self.addMissingFields(afterCalcData)
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
    rePerformAllCalcAndConstraintByData(data, calculateConstraintConfigIn) { // 重新计算和生成约束数据
      // 执行顺序： 取数--> 行内计算--> 分级汇总--> 父级行内计算--> 单元格交叉计算(涉及的行计算)--> 行约束--> 单元格约束
      let self = this
      return new Promise((resolve, reject) => {
        try {
          if (Array.isArray(data) && data.length) {
            let {
              enabledType,
              colFormulaConfig,
              calcAndConstraintTableId,
              dataType,
              calcAndConstraintItemCodeField,
              rowCodeFormulaConfig,
              colConstraintConfig,
              rowCodeConstraintConfig,
              getDataRenderMap,
              gradedSummaryFields,
              enabled
            } = calculateConstraintConfigIn || self.calculateConstraintConfigIn
            if (enabled) {
              let isTreeData = dataType === undefined ? self.treeConfigIn : dataType === 'tree' ? 1 : 0
              let tableId = calcAndConstraintTableId || self.id
              let treeData = this.getDataCodeTreeData(data, calcAndConstraintItemCodeField, self.gradedSummaryFields || gradedSummaryFields, isTreeData)
              let { dataCodeRowMap, dataCodeRowArr } = self.recursiveDataCodeRowMap(treeData, calcAndConstraintItemCodeField, true)
              // 取数
              if (enabledType.performGetData) {
                self.performGetDataAll({ data, dataCodeRowMap, dataCodeRowArr, getDataRenderMap, tableId }) // 渲染取数
              }
              if (enabledType.performColFormula) {
                self.performColFormulaAll({ data, dataCodeRowMap, dataCodeRowArr, gradedSummaryFields: self.gradedSummaryFields || gradedSummaryFields, colFormulaConfig, tableId: tableId, calcColType: 'lastLevel', calculateConstraintConfigIn }) // 行内计算
              }
              if (enabledType.gradedSummary) {
                self.performGradedSummaryAll({ data: treeData, dataCodeRowMap, dataCodeRowArr, gradedSummaryFields: self.gradedSummaryFields || gradedSummaryFields, tableId: tableId }) // 分级汇总
              }
              if (enabledType.performColFormula) {
                self.performColFormulaAll({ data, dataCodeRowMap, dataCodeRowArr, gradedSummaryFields: self.gradedSummaryFields || gradedSummaryFields, colFormulaConfig, tableId: tableId, calcColType: 'parent', calculateConstraintConfigIn }) // 父级行内计算
              }
              if (enabledType.performRowCodeFormula) {
                self.performRowCodeFormula({ data, dataCodeRowMap, dataCodeRowArr, rowCodeFormulaConfig, tableId: tableId, calculateConstraintConfigIn }) // 单元格交叉计算
              }
              if (enabledType.performColConstraint) {
                self.performRowConstraintAll({ data, dataCodeRowMap, dataCodeRowArr, colConstraintConfig, tableId: tableId, calculateConstraintConfigIn }) // 行内约束
              }
              if (enabledType.performCellConstraint) {
                self.performCellConstraintAll({ data, dataCodeRowMap, dataCodeRowArr, rowCodeConstraintConfig, tableId: tableId, calculateConstraintConfigIn }) // 单元格约束
              }
              if (enabledType.performColConstraint || enabledType.performCellConstraint) {
                self.updatedDataAfterConstraint({ data, constrainRowDataMap: self.constrainRowDataMap, dataCodeRowMap, dataCodeRowArr, calculateConstraintConfigIn })
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
    performGetDataAll({ data, dataCodeRowMap, getDataRenderMap }) { // 执行 取数
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
    // 添加缺失字段并执行全量列计算
    addMissingFields(tableData) {
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
    // 平行数据生成树形数据，以便下一步转换添加映射
    getDataCodeTreeData(data, calcAndConstraintItemCodeField, gradedSummaryFields, isTreeData) {
      if (isTreeData) {
        return data
      } else if (Array.isArray(gradedSummaryFields) && gradedSummaryFields.length && calcAndConstraintItemCodeField) {
        return this.listToTreeByNestCodeLength(data, calcAndConstraintItemCodeField)
      } else {
        return data
      }
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
            // return preResult + (isNaN(curItemGradedSummaryValue) ? 0 : curItemGradedSummaryValue)
            return self.amendVal(preResult, (isNaN(curItemGradedSummaryValue) ? 0 : curItemGradedSummaryValue), '+')
          }, 0)
        })
      }
      return row
    },
    // 数据运算，将小数转为整数计算 symbol +-*/符号
    amendVal(num1, num2, symbol) {
      let str1 = num1.toString()
      let str2 = num2.toString()
      let result
      let str1Length
      let str2Length
      // 解决整数没有小数点方法
      try { str1Length = str1.split('.')[1].length } catch (error) { str1Length = 0 }
      try { str2Length = str2.split('.')[1].length } catch (error) { str2Length = 0 }
      var step = Math.pow(10, Math.max(str1Length, str2Length))
      // 处理类似这类小数转整数也会失精度，所以转整数后再四舍五入取整下 8969.3 * 100 = 896929.999999999999，18.24 * 100 = 1823.9999999999998
      num1 = Math.round(num1 * step)
      num2 = Math.round(num2 * step)
      switch (symbol) {
        case '+':
          result = (num1 + num2) / step
          break
        case '-':
          result = (num1 - num2) / step
          break
        case '*':
          result = (num1 * num2) / step / step
          break
        case '/':
          result = num1 / num2
          break
        default:
          break
      }
      return result
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
      if (this.isEmptyObj(colFormulaConfig)) {
        return data
      }
      let self = this
      dataCodeRowArr.forEach((row) => {
        self.performColFormulaSingle({ data, dataCodeRowMap, dataCodeRowArr, gradedSummaryFields, colFormulaConfig, tableId, calcColType, row })
      })
      return data
    },
    performColFormulaSingle({ column, data, dataCodeRowMap, dataCodeRowArr, gradedSummaryFields, colFormulaConfig, tableId, calcColType, row, property = null }) { // 执行 单条 行计算
      // calcColType  执行  lastLevel:最底级，parent:父级 all:全部
      if (this.isEmptyObj(colFormulaConfig)) {
        return row
      }
      let self = this
      switch (calcColType) {
        case 'all': // 全部计算
          self.reductionColFormula(colFormulaConfig, row, property)
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
            self.reductionColFormula(colFormulaConfig, row, column && column.property, property)
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
      // if (this.editConfigIn.formulaEditable && property && colFormulaMapCp[property]) {
      //   delete colFormulaMapCp[property]
      // }
      // // 初始化回显时如果该字段有值，就显示自身默认值，不做公式计算
      // if (this.editConfigIn.formulaEditable && !property) {
      //   const colFormulaMapArr = Object.keys(colFormulaMapCp)
      //   colFormulaMapArr.forEach(key => {
      //     if (row[key] || row[key] === 0) {
      //       delete colFormulaMapCp[key]
      //     }
      //   })
      // }
      if (this.editConfigIn.formulaEditable && property && colFormulaMapCp[property]) {
        delete colFormulaMapCp[property]
      }
      let colFormulaMapArr = Object.keys(colFormulaMapCp)
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
          colFormulaMapArr = Object.keys(colFormulaMapCp)
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
                  } else {
                  }
                }
              } else {
                let calcResult = EvalCall.exec(formula)

                hasCalcColFormulaMap[item] = calcResult === Infinity || calcResult === -Infinity || isNaN(calcResult) ? '' : this.accurateFixed(calcResult, 2)
                // 列单独配置元和万元单位
                if (visibleColumnObj[item] && visibleColumnObj[item].params && visibleColumnObj[item].params.moneyUnit) {
                  hasCalcColFormulaMap[item] = this.transToNumber(this.accurateChuFa(hasCalcColFormulaMap[item], visibleColumnObj[item].params.moneyUnit), visibleColumnObj[item].params.digits || 2)
                }
                delete colFormulaMapCp[item]
              }
            }
          } else {
            ifDoWhile = false
          }
          if (i === 100000) {
            console.error('请核查公式')
          }
        }
      } catch (e) {
        console.error('请核查公式')
      }
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
              let regR = new RegExp('({[a-zA-Z0-9_:$]*})', 'ig')
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
                let calcResult = EvalCall.exec(formula)

                hasCalcrowFormulaMap[item] = calcResult === Infinity || calcResult === -Infinity || isNaN(calcResult) ? '' : this.accurateFixed(calcResult, 2)
                delete rowFormulaMapCp[item]
              }
            }
          } else {
            ifDoWhile = false
          }
          if (i === 1000000) {
            console.error('请核查公式')
          }
        }
      } catch (e) {
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
              let regR = new RegExp('({[a-zA-Z0-9_:$]*})', 'ig')
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
                let calcResult = EvalCall.exec(formula)

                hasCalcrowCodeFormulaMap[item] = calcResult === Infinity || calcResult === -Infinity || isNaN(calcResult) ? '' : this.accurateFixed(calcResult, 2)
                delete rowCodeFormulaMapCp[item]
              }
            }
          } else {
            ifDoWhile = false
          }
          if (i === 1000000) {
            console.error('请核查公式')
          }
        }
      } catch (e) {
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
        let regR = new RegExp('({[a-zA-Z0-9_:$]*})', 'ig')
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
    },
    // 树形表格（treeConfig）给数据设置特殊属性
    setRowProperty(tableData, level = 0) {
      if (!tableData || typeof tableData !== 'object') return
      for (let row of Array.isArray(tableData) ? tableData : [tableData]) {
        // 设置唯一标识
        !row[rowUuidKeyName] && Reflect.set(row, rowUuidKeyName, toolsUtils.generateUuid(`${rowUuidKeyName}_`))
        // 设置节点层级
        !row[rowUniqueLevelKey] && Reflect.set(row, rowUniqueLevelKey, level)
        row?.children?.length && this.setRowProperty(row.children, level + 1)
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initTableData()
    })
  }
}
