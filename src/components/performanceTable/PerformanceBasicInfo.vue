<!--    Author:Titans@2396757591@qq.com -->
<template>
  <div :style="{ height: height + errorRules.length * 25 + 'px' }" class="performanceTable-basicinfo-table">
    <BsForm ref="form" :default-money-unit="10000" :form-data-list="formDataIn" :form-validation-config="editRules" @itemChange="itemChange">
      <BsTable
        :toolbar-config="false"
        :pager-config="false"
        :table-config="tableConfig"
        :table-global-config="tableGlobalConfig"
        :table-columns-config="colMapColumnsConfigIn"
        :table-data="tableDataIn"
        :merge-cells="mergeCellsIn"
      >
        <template v-slot:celldefault="{ column,rowIndex }">
          <div class="performanceTable-basicinfo-table-item">
            <span v-if="!itemRenderMapIn[rowIndex + '_' + column.property]" class="block"></span>
            <span v-if="itemRenderMapIn[rowIndex + '_' + column.property] && itemRenderMapIn[rowIndex + '_' + column.property].field === ''" class="block" :style="{ textAlign: itemRenderMapIn[rowIndex + '_' + column.property].align || 'left' }">
              <i v-show="hasRequired(itemRenderMapIn[rowIndex + '_' + column.property])" class="valid-required">*</i>
              <span>{{ itemRenderMapIn[rowIndex + '_' + column.property].title }}</span>
            </span>
            <div v-if="itemRenderMapIn[rowIndex + '_' + column.property] && itemRenderMapIn[rowIndex + '_' + column.property].field" :class="ruleErrorMap && ruleErrorMap[itemRenderMapIn[rowIndex + '_' + column.property].field] ? 'valid-error' : ''">
              <vxe-form-item
                :span="24"
                :title-width="0"
                title=""
                :field="itemRenderMapIn[rowIndex + '_' + column.property].field"
                :item-render="itemRenderMapIn[rowIndex + '_' + column.property].itemRender"
                :align="(itemRenderMapIn[rowIndex + '_' + column.property].align) || 'left'"
              />
              <div v-if="ruleErrorMap && ruleErrorMap[itemRenderMapIn[rowIndex + '_' + column.property].field]" class="valid-item-error">
                {{ ruleErrorMap && ruleErrorMap[itemRenderMapIn[rowIndex + '_' + column.property].field] && ruleErrorMap[itemRenderMapIn[rowIndex + '_' + column.property].field].message }}
              </div>
            </div>
          </div>
        </template>
      </BsTable>
    </BsForm>
  </div>
</template>

<script>
import tools from './tools.js'
export default {
  name: 'PerformanceBasicInfo',
  components: {},
  props: {
    height: {
      type: Number,
      default: 370
    },
    colMapColumnsConfig: {
      type: Array,
      default() {
        return [
          {
            title: '',
            field: 'A',
            width: 200,
            align: 'right'
          },
          {
            title: '',
            width: 200,
            field: 'B',
            align: 'left',
            filters: false
          },
          {
            title: '',
            field: 'C',
            align: 'left'
          }
        ]
      }
    },
    itemRenderMap: {
      type: Object,
      default() {
        return {
          '1_A': {
            field: '',
            title: '项目绩效目标表',
            align: 'center',
            merge: {
              rowSpan: 1,
              colSpan: 3
            }
          },
          '2_A': {
            field: '',
            title: '项目编码',
            align: 'left'
          },
          '2_B': {
            field: 'projectCode',
            title: '项目编码',
            merge: {
              rowSpan: 1,
              colSpan: 2
            },
            itemRender: {
              name: '$vxeInput',
              props: {
                type: 'text',
                editable: false,
                placeholder: '请录入项目编码'
              }
            }
          },
          '3_A': {
            field: '',
            title: '项目名称'
          },
          '3_B': {
            field: 'projectName',
            title: '项目名称',
            merge: {
              rowSpan: 1,
              colSpan: 2
            },
            itemRender: {
              name: '$vxeInput',
              props: {
                type: 'text',
                editable: false,
                placeholder: '请录入项目名称'
              }
            }
          },
          '4_A': {
            field: '',
            title: '主管部门'
          },
          '4_B': {
            field: 'competentDepartment',
            merge: {
              rowSpan: 1,
              colSpan: 2
            },
            itemRender: {
              name: '$vxeInput',
              props: {
                type: 'text',
                editable: false,
                placeholder: '请录入主管部门'
              }
            }
          },
          '5_A': {
            field: '',
            title: '实施单位'
          },
          '5_B': {
            field: 'implementingAgencies',
            title: '实施单位',
            merge: {
              rowSpan: 1,
              colSpan: 2
            },
            itemRender: {
              name: '$vxeInput',
              props: {
                type: 'text',
                editable: false,
                placeholder: '请录入实施单位'
              }
            }
          },
          '6_A': {
            field: '',
            title: '资金金额',
            merge: {
              rowSpan: 4,
              colSpan: 1
            }
          },
          '6_B': {
            field: '',
            title: '实施期资金总额',
            validReqiredField: 'amount'
          },
          '6_C': {
            field: 'amount',
            title: '实施期资金总额',
            itemRender: {
              name: '$vxeMoney',
              props: {
                type: 'float',
                editable: true,
                placeholder: '请录入实施期资金总额'
              }
            }
          },
          '7_B': {
            field: '',
            title: '财政拨款数',
            validReqiredField: 'financialAllocation'
          },
          '7_C': {
            field: 'financialAllocation',
            title: '财政拨款数',
            itemRender: {
              name: '$vxeMoney',
              props: {
                type: 'float',
                editable: true,
                placeholder: '请录入财政拨款数'
              }
            }
          },
          '8_B': {
            field: '',
            title: '非财政拨款数',
            validReqiredField: 'nonFinancialAllocations'
          },
          '8_C': {
            field: 'nonFinancialAllocations',
            title: '非财政拨款数',
            itemRender: {
              name: '$vxeMoney',
              props: {
                type: 'float',
                editable: true,
                placeholder: '请录入非财政拨款数'
              }
            }
          },
          '9_B': {
            field: '',
            title: '预算执行权重（%）'
          },
          '9_C': {
            field: 'budgetExecutionWeight',
            title: '财政预算执行权重（%）',
            itemRender: {
              name: '$vxeInput',
              props: {
                type: 'float',
                editable: false,
                placeholder: '请录入预算执行权重（%）'
              }
            }
          },
          '10_A': {
            field: '',
            title: '项目总体目标',
            validReqiredField: 'overallProjectObjective'
          },
          '10_B': {
            field: 'overallProjectObjective',
            title: '项目总体目标',
            align: 'left',
            merge: {
              rowSpan: 1,
              colSpan: 2
            },
            itemRender: {
              name: '$vxeEditDownTextarea',
              props: {
                type: 'text',
                maxlength: 1000,
                rows: 3,
                placeholder: '请录入项目总体目标'
              }
            }
          }
        }
      }
    },
    editRules: {
      type: Object,
      default() {
        return {
          nonFinancialAllocations: [
            {
              required: true,
              message: '非财政拨款数',
              type: 'number',
              trigger: 'change',
              min: 1000
            }
          ],
          overallProjectObjective: [{
            required: true,
            message: '请录入项目总体目标',
            trigger: 'change',
            validator({ cellValue, rule, rules, row, rowIndex, column, columnIndex, $table }) {
              return new Promise((resolve, reject) => {
                let result = true
                if (cellValue.length <= 10) {
                  result = '长度至少为10个字符'
                }
                if (result === true) {
                  resolve(true)
                } else {
                  reject(new Error(result))
                }
              })
            }
          }]
        }
      }
    },
    formData: {
      type: Object,
      default() {
        return {
          projectCode: '1001', // 项目编码
          projectName: 'test', // 项目名称
          competentDepartment: '财政厅', // 主管部门
          implementingAgencies: '财政预算一体化', // 主管部门
          amount: '1111111', // 实施期资金总额
          financialAllocation: '111111.11', // 财政拨款数
          nonFinancialAllocations: '22222.22', // 非财政拨款数
          budgetExecutionWeight: '30%', // 预算执行权重（%）,
          overallProjectObjective: '' // 项目总体目标,
        }
      }
    }
  },
  data() {
    return {
      constrainDataMap: {

      },
      tableGlobalConfig: {
        mouseConfig: {
          selected: false
        },
        rowDrop: false, // 行拖拽
        stripe: false, // 斑马纹
        showHeader: false,
        keepSource: true,
        highlightCurrentRow: false,
        highlightHoverRow: false
      },
      tableConfig: {
        globalConfig: {
          filters: false,
          checkType: false,
          seq: false
        }
      },
      colMapColumnsConfigIn: [],
      itemRenderMapIn: {},
      tableDataIn: [],
      mergeCellsIn: [],
      formDataIn: {},
      itemRenderDefault: {
        name: '$vxeInput',
        props: {
          type: 'text',
          editable: false,
          placeholder: ''
        }
      },
      errorRules: [],
      ruleErrorMap: {}
    }
  },
  methods: {
    ...tools,
    hasRequired(obj) {
      if (obj.validReqiredField && this.editRules[obj.validReqiredField]) {
        return this.editRules[obj.validReqiredField].some(rule => rule.required)
      }
      return false
    },
    itemChange(obj) {
      this.$emit('itemChange', obj)
    },
    setColColumnsConfig(columns) {
      this.colMapColumnsConfigIn = columns.map((item) => {
        return Object.assign(item, {
          filters: false,
          sortable: false,
          cellRender: undefined,
          editRender: undefined,
          slots: {
            // default: 'expandDefault',
            // content: 'expandContent'
            // const { $rowIndex, $seq, $table, column, columnIndex, fixed, level, row, rowIndex, seq, type } = obj
            default(obj, h, fixedType) {
              const { $table } = obj
              let $scopedSlots = $table.$parent.$parent.$scopedSlots
              Object.assign(obj, { h })
              if ($scopedSlots.celldefault) {
                return $scopedSlots.celldefault(obj)
              } else if ($scopedSlots.cellEdit) {
                return $scopedSlots.cellEdit(obj)
              } else {
                return ''
              }
            },
            edit(obj, h, fixedType) {
              const { $table } = obj
              let $scopedSlots = $table.$parent.$parent.$scopedSlots
              Object.assign(obj, { h })
              if ($scopedSlots.cellEdit) {
                return $scopedSlots.cellEdit(obj)
              } else if ($scopedSlots.celldefault) {
                return $scopedSlots.celldefault(obj)
              } else {
                return ''
              }
            }
          }
        })
      })
    },
    setTbodyAndMergeInfo(renderMap) {
      this.itemRenderMapIn = renderMap
      let { keyColIndexMap } = this.getColumnsMap(this.colMapColumnsConfigIn)
      let mergeCells = []
      let tableData = []
      Object.keys(renderMap).forEach((item) => {
        let maprowCol = item.split('_')
        tableData[maprowCol[0]] = tableData[maprowCol[0]] || {}
        tableData[maprowCol[0]][maprowCol[1]] = ''
        if (renderMap[item].merge && (renderMap[item].merge.rowSpan !== 1 || renderMap[item].merge.colSpan !== 1)) {
          mergeCells.push({
            row: parseInt(maprowCol[0]),
            col: keyColIndexMap[maprowCol[1]],
            rowspan: renderMap[item].merge.rowSpan,
            colspan: renderMap[item].merge.colSpan
          })
        }
      })
      this.tableDataIn = tableData.map(row => {
        return row || {}
      })
      this.mergeCellsIn = mergeCells
    },
    validate(cb) {
      return new Promise((resolve, reject) => {
        this.beginValidate(cb).then((res) => {
          resolve(res)
        }).catch((errMap) => {
          reject(errMap)
        })
      })
    },
    newRule(rule) { // 错误规则信息
      return {
        $options: rule,
        required: rule.required,
        min: rule.min,
        max: rule.min,
        type: rule.type,
        property: rule.property,
        pattern: rule.pattern,
        validator: rule.validator,
        maxWidth: rule.maxWidth,
        message: rule.message
      }
    },
    validCellRules({ data, cellValue, rules, property }) { // 校验单元格
      let self = this
      try {
        const errorRules = []
        const syncVailds = []
        if (rules) {
          rules.forEach(rule => {
            if (typeof self.validateCb === 'function' && rule.asyncValidate) {
              let customValid
              customValid = self.validatorCb({
                cellValue,
                rule,
                rules,
                data,
                property
              })
              if (customValid) {
                if (self.getbasicDataType(customValid) === 'Error') {
                  errorRules.push(self.newRule({ message: customValid.message, rule: self.newRule(rule) }))
                } else if (customValid.catch) {
                  // 如果为异步校验（注：异步校验是并发无序的）
                  syncVailds.push(
                    customValid.catch(e => {
                      errorRules.push(self.newRule({ type: 'custom', message: e ? e.message : rule.message, rule: self.newRule(rule) }))
                    })
                  )
                }
              }
            } else if (typeof rule.validator === 'function') {
              let customValid
              customValid = rule.validator({
                cellValue,
                rule,
                rules,
                data,
                property
              })
              if (customValid) {
                if (self.getbasicDataType(customValid) === 'Error') {
                  errorRules.push(self.newRule({ property, message: customValid.message, rule: self.newRule(rule) }))
                } else if (customValid.catch) {
                  // 如果为异步校验（注：异步校验是并发无序的）
                  syncVailds.push(
                    customValid.catch(e => {
                      errorRules.push(self.newRule({ property, type: 'custom', message: e ? e.message : rule.message, rule: self.newRule(rule) }))
                    })
                  )
                }
              }
            } else {
              const isNumber = rule.type === 'number'
              const numVal = isNumber ? (isNaN(parseFloat(cellValue)) ? 0 : parseFloat(cellValue)) : String(cellValue || '').length
              if (rule.required && (cellValue === null || cellValue === undefined || cellValue === '')) {
                self.validRuleErr = true
                errorRules.push(self.newRule(Object.assign(rule, { property })))
              } else if (rule.required && ((isNumber && isNaN(cellValue)) || (!isNaN(rule.min) && numVal < parseFloat(rule.min)) || (!isNaN(rule.max) && numVal > parseFloat(rule.max)) || (rule.pattern && !(rule.pattern.test ? rule.pattern : new RegExp(rule.pattern)).test(cellValue)))) {
                errorRules.push(self.newRule(Object.assign(rule, { property })))
              }
            }
          })
        }
        return Promise.all(syncVailds).then(() => {
          if (errorRules.length) {
            const rest = { rules: errorRules, rule: errorRules[0] }
            return Promise.reject(rest)
          }
        })
      } catch (e) {
      }
    },
    beginValidate () {
      let self = this
      this.clearRuleErrorMap()
      const itemValids = []
      let errorRules = []
      let { editRules } = this
      let data = this.$refs.form.getFormData()
      Object.keys(editRules).forEach((key) => {
        itemValids.push(self.validCellRules({ data, cellValue: data[key], rules: editRules[key], property: key }).then(() => {
        }).catch(({ rule, rules }) => {
          return Promise.reject(errorRules = errorRules.concat(rules))
        }))
      })
      return Promise.all(itemValids).then(() => {
      }).catch(() => {
        this.updateErrorRules(errorRules)
        return Promise.reject(errorRules)
      })
    },
    updateErrorRules(errorRules) {
      let errMap = {}
      this.errorRules = errorRules
      errorRules.forEach((item, index) => {
        errMap[item.property] = item
      })
      this.ruleErrorMap = errMap
    },
    clearRuleErrorMap() {
      this.errorRules = []
      this.ruleErrorMap = null
    },
    setFormData(data) {
      this.formDataIn = data
    },
    init() {
      this.setColColumnsConfig(this.colMapColumnsConfig)
      this.setTbodyAndMergeInfo(this.itemRenderMap)
      this.setFormData(this.formData)
    }
  },
  crated() {},
  mounted() {
    this.init()
  },
  watch: {
    height: {
      handler() {},
      immediate: true
    },
    colMapColumnsConfig: {
      handler() {
        this.setColColumnsConfig(this.colMapColumnsConfig)
      },
      immediate: true
    },
    itemRenderMap: {
      handler() {
        this.setTbodyAndMergeInfo(this.itemRenderMap)
      },
      immediate: true
    },
    editRules: {
      handler() {},
      immediate: true
    },
    formData: {
      handler() {
        this.setFormData(this.formData)
      },
      immediate: true
    }
  }
}
</script>

<style lang='scss'>
.performanceTable-basicinfo-table{
  .Titans-table  .vxe-table--main-wrapper{
      border:none;
  }
  .vxe-table .vxe-table--border-line {
    border-bottom: none;
  }
  .Titans-form{
     height:100%;
  }
  .vxe-form{
    height:100%;
    .vxe-cell{
    .vxe-form--item{
      padding: 0;
      line-height: 30px;
      height: auto;
      display: block;
    }

    .performanceTable-basicinfo-table-item{
      .text,
      .block{
        display: block;
        padding:0 5px;
      }
      .valid-required{
        font-size: 16px;
        color: #f00;
      }
    }
    .valid-error{
      position: relative;
      .valid-item-error{
        color: #f00;
        font-size: 12px;
        line-height: 20px;
        height: 20px;
      }
    }
   }
  }
  .vxe-grid{
    .vxe-table .vxe-cell {
      height: auto;
      line-height: 32px;
      display: block;
      padding: 0;
    }
    .vxe-table .vxe-editable .vxe-body--column,
    .vxe-table .vxe-body--column.col--ellipsis,
    .vxe-table .vxe-footer--column.col--ellipsis {
       height: auto;
       min-height:32px;
       line-height: 32px;
       padding: 0;

    }
    .vxe-table .vxe-body--column.col--ellipsis>.vxe-cell,
    .vxe-table .vxe-footer--column.col--ellipsis>.vxe-cell,
    .vxe-table .vxe-header--column.col--ellipsis>.vxe-cell {
        max-height: unset;
        white-space: unset!important;
    }
  }
}

</style>
