/*
 * @Author: 轻语
 * @Date: 2021-11-03 11:31:06
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-02-03 14:44:09
 * @Description:
 */
export default {
  props: {
    editConfig: { // table 编辑配置
      type: [Object, Boolean],
      default () {
        return {
          trigger: 'dblclick',
          mode: 'cell'
        }
      }
    }
  },
  watch: {
    editConfig: { // table edit配置监听
      handler() {
        this.initEditConfig()
      },
      deep: true,
      immediate: true
    }
  },
  data() {
    return {
      editConfigIn: false,
      editConfigInCp: { // 行内编辑配置
        trigger: 'dblclick',
        mode: 'cell',
        activeMethod: this.isActiveCellEdit,
        showStatus: true
      }
    }
  },
  methods: {
    initEditConfig() { // 编辑配置
      // 暂时性方案，后期调整
      if (this.getBasicDataType(this.editConfig) === 'Boolean') {
        this.editConfigIn = {
          trigger: 'dblclick',
          mode: 'cell',
          activeMethod: () => {
            return false
          },
          showStatus: false
        }
      } else if (this.getBasicDataType(this.editConfig) === 'Object') {
        if (this.editConfig.editable !== false) {
          this.editConfigIn = Object.assign(this.editConfigInCp, this.editConfig)
        } else {
          this.editConfigIn = {
            trigger: 'dblclick',
            mode: 'cell',
            activeMethod: () => false,
            showStatus: false
          }
        }
      }
    },
    isEditForFormula(row, rowIndex, column, columnIndex) {
      let isForFormulaData = column.property + ':' + row.itemcode
      let isForFormula = true
      // 自动计算的列不允许计算
      if (this.calculateConstraintConfigIn.rowCodeFormulaConfig[isForFormulaData] || this.calculateConstraintConfigIn.colFormulaConfig[column.property]) {
        isForFormula = false
      } else {
        isForFormula = true
      }
      return isForFormula
    },
    isActiveCellEdit({ row, rowIndex, column, columnIndex }) {
      let isEditForFormula = this.isEditForFormula(row, rowIndex, column, columnIndex)
      return isEditForFormula
    },
    performTableDataCalculate(obj) { // 行改变事件执行单元格计算并刷新视图
      // 执行顺序： 取数-->行内计算-->分级汇总-->父级行内计算-->单元格交叉计算(涉及的行计算)-->行约束-->单元格约束
      return this.rePerformRowCalcAndConstraintSingleAndRerender(obj)
    },
    rePerformRowCalcAndConstraintSingleAndRerender(obj) { // 执行行所涉及的所有计算约束并重新渲染
      let self = this
      return new Promise((resolve, reject) => {
        self.rePerformRowCalcAndConstraintSingle(obj).then(({ row, data, dataCodeRowMap, dataCodeRowArr }) => {
          self.updateBodyTopRows()
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
          let { enabledType, colFormulaConfig, extendMapInfoField, calcAndConstraintTableId, dataType, calcAndConstraintItemCodeField, colConstraintConfig, rowCodeConstraintConfig, rowCodeFormulaConfig, gradedSummaryFields, enabled } = self.calculateConstraintConfigIn
          if (enabled) {
            let isTreeData = dataType === undefined ? self.treeConfigIn : dataType === 'tree' ? 1 : 0
            let tableId = calcAndConstraintTableId || self.id
            let treeData = this.getDataCodeTreeData(data, calcAndConstraintItemCodeField, self.gradedSummaryFields || gradedSummaryFields, isTreeData)
            let { dataCodeRowMap, dataCodeRowArr } = self.recursiveDataCodeRowMap(treeData, calcAndConstraintItemCodeField, true)
            // self.performGetDataAll({ data, dataCodeRowMap, dataCodeRowArr, getDataRenderMap, tableId: tableId, row }) // 渲染取数
            if (enabledType.performColFormula) {
              self.performColFormulaSingle({ column, data, dataCodeRowMap, gradedSummaryFields: self.gradedSummaryFields || gradedSummaryFields, calcAndConstraintItemCodeField, dataCodeRowArr, colFormulaConfig, tableId: tableId, row, calcColType: 'lastLevel', property: column.property }) // 行内计算
            }
            if (enabledType.gradedSummary && row['item__pNestCode']) {
              let gradedSummaryRow = dataCodeRowMap[row['item__pNestCode'].split('_')[0]]
              if (gradedSummaryRow) {
                self.performGradedSummarySingle({ column, data: treeData, dataCodeRowMap, dataCodeRowArr, gradedSummaryFields: self.gradedSummaryFields || gradedSummaryFields, row: gradedSummaryRow, tableId: tableId }) // 分级汇总
              }
            }
            // 行汇总更新视图显示
            if (enabledType.gradedSummary && self.gradedSummaryFields?.length) {
              self.performGradedSummaryAll({ data, gradedSummaryFields: self.gradedSummaryFields, tableId: self.tableId }) // 分级汇总
            }
            if (enabledType.performColFormula && extendMapInfoField && row['item__pNestCode']) {
              let prows = row['item__pNestCode'].split('_').map((itemC, indexC) => {
                return dataCodeRowMap[itemC]
              })
              prows.pop()
              prows.forEach((row) => {
                self.performColFormulaSingle({ data, dataCodeRowMap, column, dataCodeRowArr, calcAndConstraintItemCodeField, gradedSummaryFields: self.gradedSummaryFields || gradedSummaryFields, colFormulaConfig, row, tableId: tableId, calcColType: 'parent' }) // 父级行内计算
              })
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
    editClosed(obj) {
      this.performTableDataCalculate(obj).then(({ row }) => {
        this.updateFooter()
        this.$emit('editClosed', obj, this, this.$refs.xGrid)
        this.$emit('ProxyEvent', 'editClosed', obj, this, this.$refs.xGrid)
      })
    },
    editActived(obj) {
      this.$emit('editActived', obj, this, this.$refs.xGrid)
      this.$emit('ProxyEvent', 'editActived', obj, this, this.$refs.xGrid)
    }, // 只对 edit-config 配置时有效，单元格被激活编辑时会触发该事件 { row, rowIndex, $rowIndex, column, columnIndex, $columnIndex }
    editDisabled(obj) {
      this.$emit('editDisabled', obj, this, this.$refs.xGrid)
      this.$emit('ProxyEvent', 'editDisabled', obj, this, this.$refs.xGrid)
    } // 只对 edit-config 配置时有效，当单元格激活时如果是禁用状态时会触发该事件 { row, rowIndex, $rowIndex, column, columnIndex, $columnIndex }
  },
  mounted() {
    this.initEditConfig()
  }
}
