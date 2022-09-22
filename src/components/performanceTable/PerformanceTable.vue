<!--    Author:Titans@2396757591@qq.com -->
<template>
  <div :style="{ height: height || tableDataIn.length * 32 + 90 + 'px' }">
    <BsTable
      ref="performanceTable"
      :toolbar-config="toolbarConfig"
      :table-columns-config="tableColumnsConfigIn"
      :table-data="tableDataIn"
      :table-config="tableConfig"
      :edit-rules="editRules"
      :table-global-config="tableGlobalConfig"
      :edit-config="editConfig"
      :merge-cells="mergeCells"
      :pager-config="false"
      :cell-style="cellStyle"
      @cellClick="cellClick"
    >
      <template v-slot:toolbarSlots>
      </template>
      <template v-slot:toolbar-custom-slot>
        <div class="toolbar-custom-vxebtn-group mgr10">
          <slot name="toolbar-custom-btn"></slot>
          <vxe-button
            content="新增"
            name="addBtn"
            @click="onToolbarCustomBtnClick('add')"
          />
          <vxe-button
            content="删除"
            name="deleteBtn"
            @click="onToolbarCustomBtnClick('delete')"
          />
        </div>
      </template>
    </bsTable>
  </div>
</template>

<script>
import tools from './tools.js'
export default {
  name: 'PerformanceTable',
  components: {
  },
  props: {
    height: {
      type: [String],
      default: ''
    },
    config: {
      type: [Object],
      default() {
        return {

        }
      }
    },
    cellStyle: {
      type: [Object, Function, String],
      default() {
        return ({ column, rowIndex, row, $table }) => {
          let self = $table.$parent.$parent.$parent
          let { mergeKeys } = self.configIn
          if (self.curSelectedCellInfo && mergeKeys[mergeKeys.length - 1] && column.property === mergeKeys[mergeKeys.length - 1]) {
            let mergeInfo = self.curSelectedCellInfo['row']['_mergeInfo'][mergeKeys[mergeKeys.length - 1]]
            if (mergeInfo && ((mergeInfo.mergeFrom && mergeInfo.mergeFrom.indexOf(rowIndex) >= 0) || (mergeInfo.mergeTo === rowIndex))) {
              return {
                backgroundColor: '#62aaff',
                color: '#ffffff'
              }
            } else {
              return {
              }
            }
          } else {
            return {
            }
          }
        }
      }
    },
    tableColumnsConfig: {
      type: Array,
      default() {
        return [
          {
            title: '指标类型',
            field: 'indicatorsType',
            width: 150,
            align: 'left',
            filters: false,
            cellRender: {
              name: '$vxeInput',
              props: {
                type: 'text',
                placeholder: '请录入指标类型'
              }
            }
          },
          {
            title: '一级指标',
            field: 'level1Indicators',
            width: 150,
            align: 'left',
            filters: false,
            cellRender: {
              name: '$vxeInput',
              props: {
                type: 'text',
                placeholder: '请录入一级指标'
              }
            }
          },
          {
            title: '二级指标',
            field: 'level2Indicators',
            width: 150,
            align: 'left',
            filters: false,
            cellRender: {
              name: '$vxeInput',
              props: {
                type: 'text',
                placeholder: '请录入二级指标'
              }
            }
          },
          {
            title: '三级指标',
            field: 'level3Indicators',
            width: 150,
            align: 'left',
            filters: false,
            editRender: {
              name: '$vxeInput',
              props: {
                type: 'text',
                placeholder: '请录入三级指标'
              }
            }
          },
          {
            title: '指标方向',
            field: 'indicatorsDirection',
            width: 150,
            align: 'left',
            filters: false,
            editRender: {
              name: '$vxeSelect',
              options: [
                { value: '1', label: '大于' },
                { value: '2', label: '大于等于' },
                { value: '3', label: '等于' },
                { value: '4', label: '小于' },
                { value: '5', label: '小于等于' }
              ],
              props: {
                type: 'text',
                placeholder: '请录入指标方向'
              }
            }
          },
          {
            title: '指标性质',
            field: 'indicatorsNature',
            width: 150,
            align: 'left',
            filters: false,
            editRender: {
              name: '$vxeRenderConditions',
              props: {
                format: '{indicatorsDirection}',
                default: {
                  name: '$vxeInput',
                  conditionsProps: {
                  },
                  props: {
                    type: 'text',
                    placeholder: '请录入三级指标'
                  }
                },
                options: {
                  default: {
                    name: '$vxeInput',
                    linkageRowValue: {

                    },
                    conditionsProps: {
                      diabled: '1?true:false',
                      editable: '1?true:false'
                    },
                    props: {
                      type: 'text',
                      placeholder: '请录入指标性质'
                    }
                  },
                  '1': {
                    name: '$vxeInput',
                    linkageRowValue: {

                    },
                    props: {
                      type: 'text',
                      placeholder: '请录入指标性质'
                    }
                  },
                  '2': {
                    name: '$vxeSelect',
                    options: [
                      { value: '1', label: '正向' },
                      { value: '2', label: '反向' },
                      { value: '3', label: '定性' }
                    ],
                    props: {
                      type: 'text',
                      placeholder: '请录入指标性质'
                    }
                  }
                }
              }
            }
          },
          {
            title: '目标值',
            field: 'indicatorsTargetvalue',
            width: 150,
            align: 'left',
            filters: false,
            editRender: {
              name: '$vxeInput',
              props: {
                type: 'text',
                placeholder: '请录入目标值'
              }
            }
          },
          {
            title: '计量单位',
            field: 'indicatorsMeasuringUnit',
            width: 150,
            align: 'left',
            filters: false,
            editRender: {
              name: '$vxeInput',
              props: {
                type: 'text',
                option: [],
                placeholder: '请录入计量单位'
              }
            }
          },
          {
            title: '备注',
            field: 'indicatorsMarkText',
            align: 'left',
            filters: false,
            editRender: {
              name: '$vxeEditDownTextarea',
              props: {
                type: 'text',
                placeholder: '请录入备注'
              }
            }
          },
          {
            title: '分值',
            field: 'indicatorsScore',
            width: 150,
            align: 'left',
            filters: false,
            editRender: {
              name: '$vxeInput',
              props: {
                type: 'float',
                digits: 2,
                placeholder: '请录入分值'
              }
            }
          }
        ]
      }
    },
    tableData: {
      type: Array,
      default() {
        return [
          {
            indicatorsType: '绩效指标', // 指标
            level1Indicators: '产出指标', // 一级指标
            level2Indicators: '数量指标', // 二级指标
            level3Indicators: '参与会议人数', // 三级指标
            indicatorsNature: '', // 指标性质
            indicatorsDirection: '1', // 指标方向
            indicatorsMeasuringUnit: '1', // 计量单位
            indicatorsTargetvalue: '', // 目标值,
            indicatorsMarkText: '', // 备注,
            indicatorsScore: '' // 分值
          },
          {
            indicatorsType: '绩效指标', // 指标
            level1Indicators: '产出指标', // 一级指标
            level2Indicators: '质量指标', // 二级指标
            level3Indicators: '会议代表人数', // 三级指标
            indicatorsNature: '', // 指标性质
            indicatorsDirection: '1', // 指标方向
            indicatorsMeasuringUnit: '1', // 计量单位
            indicatorsTargetvalue: '', // 目标值,
            indicatorsMarkText: '', // 备注,
            indicatorsScore: '' // 分值
          },
          {
            indicatorsType: '绩效指标', // 指标
            level1Indicators: '产出指标', // 一级指标
            level2Indicators: '数量指标', // 二级指标
            level3Indicators: '会议代表人数', // 三级指标
            indicatorsNature: '', // 指标性质
            indicatorsDirection: '1', // 指标方向
            indicatorsMeasuringUnit: '1', // 计量单位
            indicatorsTargetvalue: '', // 目标值,
            indicatorsMarkText: '', // 备注,
            indicatorsScore: '' // 分值
          },
          {
            indicatorsType: '绩效指标', // 指标
            level1Indicators: '质量指标', // 一级指标
            level2Indicators: '数量指标', // 二级指标
            level3Indicators: '参与会议人数', // 三级指标
            indicatorsNature: '', // 指标性质
            indicatorsDirection: '1', // 指标方向
            indicatorsMeasuringUnit: '1', // 计量单位
            indicatorsTargetvalue: '', // 目标值,
            indicatorsMarkText: '', // 备注,
            indicatorsScore: '' // 分值
          }
        ]
      }
    },
    editRules: {
      type: Object,
      default() {
        return {
        }
      }
    }

  },
  data() {
    return {
      editConfig: {
        showStatus: false
      },
      tableGlobalConfig: {
        rowDrop: false, // 行拖拽
        stripe: false, // 斑马纹
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
      toolbarConfig: {
        reverseCheck: false,
        moneyInputSwich: false, // 是否开启money单位切换输入
        batchModify: false, // 批量修改
        yearlist: [],
        disabledMoneyConversion: false,
        moneyConversion: false, // 是否有金额转换
        search: false, // 是否有search 可选值：true(本地过滤)||false(关闭本地过滤)||'remoteSearch'(远程过滤)
        advancedSearch: false, // 是否有高级search
        calculator: false,
        refresh: false,
        import: false, // 导入
        export: false, // 导出
        print: false, // 打印
        zoom: true, // 缩放
        custom: false, // 选配展示列
        slots: {
          tools: 'toolbarTools',
          buttons: 'toolbarSlots'
        }
      },

      configIn: {
        mergeKeys: ['indicatorsType', 'level1Indicators', 'level2Indicators'], // 合并列子段，注意合并顺序
        addType: 'last', // prev,
        addKeysMap: {
          indicatorsType: true, // 指标
          level1Indicators: true, // 一级指标
          level2Indicators: true, // 二级指标
          level3Indicators: false, // 三级指标
          indicatorsNature: false, // 指标性质
          indicatorsDirection: false, // 指标方向
          indicatorsMeasuringUnit: false, // 计量单位
          indicatorsTargetvalue: false, // 目标值,
          indicatorsMarkText: false, // 备注,
          indicatorsScore: false // 分值
        }
      },
      tableColumnsConfigIn: [],
      tableDataIn: [],
      mergeCells: [],
      colspanmergeMap: {},
      curSelectedCellInfo: null,
      curSelectedCellInfoAdd: null,
      curSelectedCellInfoDelete: null
    }
  },
  methods: {
    ...tools,
    generateMergeCells(data) { // 生成合并单元格数据
      let { mergeKeys } = this.configIn
      let { keyColIndexMap } = this.getColumnsMap(this.tableColumnsConfig)
      let colspanmergeMap = this.getColspanMergeMap(data || this.tableData, mergeKeys)
      this.colspanmergeMap = colspanmergeMap
      let mergeCells = []
      Object.keys(colspanmergeMap).forEach((key) => {
        mergeCells.push(
          { row: colspanmergeMap[key]['startIndex'], col: keyColIndexMap[colspanmergeMap[key]['key']], rowspan: colspanmergeMap[key]['rowSpan'], colspan: 1 }
        )
      })
      this.mergeCells = mergeCells
    },
    onToolbarCustomBtnClick(optionType) {
      switch (optionType) {
        case 'add':
          this.addRow()
          break
        case 'delete':
          this.deleteRow()
          break
      }
    },
    cellClick(obj) { //  { row, rowIndex, $rowIndex, column, columnIndex, $columnIndex, triggerRadio, triggerCheckbox, $event }
      // let { mergeKeys } = this.configIn
      if (obj) {
        let { mergeKeys } = this.configIn
        this.curSelectedCellInfo = obj
        let mergeInfo = this.curSelectedCellInfo['row']['_mergeInfo'][mergeKeys[mergeKeys.length - 1]]
        this.curSelectedCellInfoAdd = obj
        this.curSelectedCellInfoAdd = {
          row: this.$refs.performanceTable.getTableData().fullData[mergeInfo.mergeTo],
          rowIndex: mergeInfo.mergeTo,
          column: { property: mergeKeys[mergeKeys.length - 1] }
        }
      } else {
        this.curSelectedCellInfo = null
        this.curSelectedCellInfoAdd = null
      }
      // this.$refs.performanceTable.tableOptionFn().revertData()
    },
    addRow(data) {
      if (this.curSelectedCellInfoAdd) {
        let { addKeysMap, addType } = this.configIn
        let curSelectedCellInfoAdd = this.curSelectedCellInfoAdd
        let addRow = {}
        let fullData = this.$refs.performanceTable.getTableData().fullData
        Object.keys(Object.assign({}, addKeysMap, data || {})).forEach((key) => {
          if (addKeysMap[key] === false) {
            addRow[key] = ''
          } else if (addKeysMap[key] === true) {
            addRow[key] = curSelectedCellInfoAdd.row[key]
          } else if (addKeysMap[key] !== false && addKeysMap[key] !== true) {
            addRow[key] = addKeysMap[key]
          } else {

          }
        })
        let colspanmergeMap = this.colspanmergeMap
        let lastIndex = colspanmergeMap[curSelectedCellInfoAdd.rowIndex + '__' + curSelectedCellInfoAdd.column.property].rowSpan + curSelectedCellInfoAdd.rowIndex
        fullData.splice(addType === 'prev' ? curSelectedCellInfoAdd.rowIndex : lastIndex, 0, addRow)
        this.setTableData(fullData)
        // this.cellClick(null)
        this.$emit('addRow', addRow)
      } else {
        this.$XModal.message({ status: 'info', message: '请选择二级指标后再新增！' })
      }
    },
    deleteRow() {
      if (this.curSelectedCellInfo) {
        let data = this.$refs.performanceTable.getTableData().fullData
        let deleteRow = data.splice(this.curSelectedCellInfo.index, 1)
        this.setTableData(data)
        this.cellClick(null)
        this.$emit('deleteRow', deleteRow)
      } else {
        this.$XModal.message({ status: 'info', message: '请选择三级指标后再删除!' })
      }
    },
    setTableData(data) {
      this.tableDataIn = this.deepCopy(data || this.tableData)
      this.generateMergeCells(this.tableDataIn)
    },
    getlastLevelData(data, result = []) {
      data.forEach(function (item) {
        if (!(Array.isArray(item.children) && item.children.length)) {

        } else {
          item._mapInfo = {
            parentId: item.id,
            levelNo: 3,
            secondIndCode: item.indId
          }
          result.push(item)
        }
      })
    },
    getRenderData(data) { // 有data即为回显数据
      let treeData = this.listToTreeByNestCodeLength(data, 'indCode')
      console.log(treeData)
    },
    setConfig(config) {
      this.configIn = Object.assign(this.configIn, config || this.config)
    },
    setTableColumnsConfig(tableColumnsConfig) {
      this.tableColumnsConfigIn = tableColumnsConfig || this.tableColumnsConfig
    },
    init(obj) {
      this.curSelectedCellInfo = null
      this.setConfig()
      this.setTableColumnsConfig()
      this.setTableData()
    }
  },
  crated() {
    // debugger
  },
  mounted() {
    // debugger
    this.init()
  },
  watch: {
    height: {
      handler() {
      },
      immediate: true
    },
    config: {
      handler() {
        this.setConfig()
      },
      deep: true,
      immediate: true
    },
    cellStyle: {
      handler() {
      },
      immediate: true
    },

    tableColumnsConfig: {
      handler() {
        this.setTableColumnsConfig()
      },
      immediate: true
    },
    editRules: {
      handler() {
      },
      immediate: true
    },
    tableData: {
      handler() {
        this.setTableData()
      },
      immediate: true
    }
  }
}
</script>

<style lang='scss'>
</style>
