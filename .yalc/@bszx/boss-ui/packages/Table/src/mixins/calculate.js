/*
 * @Author: 轻语
 * @Date: 2021-11-04 11:40:35
 * @LastEditors: xietingting
 * @LastEditTime: 2022-12-28 16:38:36
 * @Description:
 */
import EvalCall from '../../../tools/Eval.js'
import util from '../tools/utils.js'
export default {
  props: {
    calculateConstraintConfig: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  watch: {
    calculateConstraintConfig: {
      handler() {
        this.initCalculateConstraintConfig()
      },
      deep: true
      // immediate: true
    }
  },
  data() {
    return {
      // 执行顺序： 取数-->行内计算-->分级汇总-->父级行内计算-->单元格交叉计算(涉及的行计算)-->行约束-->单元格约束
      calculateConstraintConfigIn: {
        enabled: true, // 是否开启此项功能
        enabledType: { // 执行开关
          performGetData: false, // 取数
          performColFormula: true, // 列公式
          gradedSummary: true, // 分级汇总
          performRowCodeFormula: true, // 单元格交叉计算
          performColConstraint: false, // 列约束
          performCellConstraint: false// 单元格约束
        },
        extendMapInfoField: false, // 是否扩展mapInfo字段  item__level,item__pcode,item__pNestCode
        calcAndConstraintTableId: '', // 数据依赖的当前表id，tableId$guid || viewName$viewName
        gradedSummaryFields: [], // 分级汇总字段 关联暗含字段dataType数据类型 有效数据类型 'list'||'tree'  treeConfig为tree 则为tree，否责为list
        calcAndConstraintItemCodeField: 'itemCode', // 配置了rowCodeFormulaConfig等时使用的itemcode行坐标字段名
        // rowCodeCalcItemCodeField: 'itemCode', // 配置了rowCodeFormulaConfig时使用的itemcode字段名
        // 示例中1001为tableId
        rowformulaConfig: { // 行公式配置
          // 单元格交叉计算
          // rowFormulaMap= { "colField:rowIndex":"{tableId:colField:rowIndex}[运算符]" }
          // '4:profit': '{1001:income:0}+{1001:tax:1}+{1001:deduction:2}+{1001:profit:3}'
        },
        rowCodeFormulaConfig: { // 单元格公式配置
          // 单元格交叉计算
          // rowFormulaMap= { "colField:itemcode":"{tableId:colField:itemcode}[运算符]" }
          // '1001:bonus': '{1001:income:1002}+{1001:bonus:1003}'
          // '1002:bonus': '{1001:income:1002}*{1001:age:1002}+{1001:bonus:1003}'
        },
        colFormulaConfig: { // 列公式配置
          // 单条数据计算
          // rowFormulaMap= { "colfield":"{colfield}[运算符]" }
          // profit: '{income}-{tax}-{deduction}',
          // income: '{age}*2'
        },
        getDataAxiosConfig: { // 提取请求配置
          dataField: 'data',
          successCode: '100000', // 成功code
          statusField: 'rscode',
          method: 'get', // 请求方式
          url: 'fb-govbudget-service/govFiscal/govReport/reportDataExtract' // 'queryTreeAssistData', //
          //  [{ itemCode: "002", colField: "f005", value: "1500.0" }, { itemCode: "002001", colField: "f005", value: "500.0" }]
        },
        getDataParams: { // 提取公共参数

        },
        cellDataConfig: [// 提取和计算 数据库 数据集合
          //  { itemcode: "002", itemname: "一般公共预算", colField: "f001", inputType: 1, formulaShow: "提取",formula:'tableId:colField:itemcode'}
        ],
        getDataConfig: { // 取数配置
          // 'itemcode:field': 'tableId$xxxx::field:itemcode'
          // 'tableId:bonus:itemcode': 'tableId_value:colField'
        },
        colConstraintConfig: {
          //   'age': 'income::value::{age}>=18?Math.pow({age},4)/2:0--&&--name::style::{age}>18&&{age}<=60--??--color=#F00&fontSize=20px--+--{age}>60--??--color=#ff0&fontSize=20px'
        },
        rowCodeConstraintConfig: {
          //    '1001:age': '1001:income::value::{1001:age:1001}>=18?Math.pow({1001:age:1001},4)/2:0--&&--1002:name::style::{1001:age:1001}>18&&{1001:age:1001}<=60??color=#F00&fontSize=20px--+--{1001:age:1001}>60??color=#ff0&fontSize=20px',

        },
        getDataRenderMap: { // 取数渲染配置

        }
      },
      constrainRowDataMap: { // 约束最终渲染数据
        itemcode: { // 单条数据唯一标识
          age: { // 作用字段
            visible: true, // 是否可见
            editble: true, // 是否可编辑
            clear: true, // 是否置空
            style: { // 样式

            }
          }
        }
      },
      constrainDataMap: {}
    }
  },
  methods: {
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
        if (!self.isTreeTable) {
          if (Array.isArray(row.children) && row.children.length && this.treeConfigIn) {
            row.children = self.addMissingFieldsAndCalcColFormula(row.children)
          }
        } else {
          if (Array.isArray(row.children) && row.children.length) {
            row.children = self.addMissingFieldsAndCalcColFormula(row.children)
          }
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
                  } else {
                  }
                }
              } else {
                let calcResult = EvalCall.exec(formula)
                hasCalcColFormulaMap[item] = calcResult === Infinity || calcResult === -Infinity || isNaN(calcResult) ? '' : util.accurateFixed(calcResult, 2)
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
            console.log(colFormulaMap, hasCalcColFormulaMap)
            console.error('请核查公式')
          }
        }
      } catch (e) {
      // console.log(i)
        console.log(colFormulaMap, hasCalcColFormulaMap)
        console.error('请核查公式')
      }
      // console.log(hasCalcColFormulaMap)
      // debugger
      // console.log(row, hasCalcColFormulaMap)
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
      // console.log(columns)
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
      this.hasEditCol = obj.hasEditCol
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
    generateColumnsAllMap(columns, obj) {
    // 生成导入view映射数据
      let self = this
      obj = obj || {
        hasEditCol: false,
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
            if (conlum.editRender) {
              obj.hasEditCol = true
            }
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
    },
    initCalculateConstraintConfig() { // 初始化计算和约束配置
      this.calculateConstraintConfigIn = Object.assign({}, this.calculateConstraintConfigIn, this.calculateConstraintConfig)
      if (this.calculateConstraintConfigIn.cellDataConfig && this.calculateConstraintConfigIn.cellDataConfig.length) {
        this.generateGetDataConfigMap(this.calculateConstraintConfigIn.cellDataConfig)
      }
      this.constrainRowDataMap = {}
    },
    // 取数
    generateGetDataConfigMap(cellDataConfig) { // 生成取数和单元格计算
    //  cellDataConfig = [{ itemcode: "002", itemname: "一般公共预算", cells: [{ itemcode: "002", colField: "f001", inputType: 1, formulaShow: "提取",formula:'tableId:colField:itemcode' }] }]
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
    }
  },
  mounted() {
    this.initCalculateConstraintConfig()
  }
}
