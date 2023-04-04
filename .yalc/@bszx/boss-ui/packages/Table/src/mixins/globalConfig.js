/*
 * @Author: 轻语
 * @Date: 2021-11-04 09:48:06
 * @LastEditors: Comer
 * @LastEditTime: 2022-11-09 16:24:01
 * @Description: table全局配置
 */
export default {
  props: {
    tableGlobalConfig: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  watch: {
    tableGlobalConfig: { // 全局配置
      handler() {
        this.initTableGlobalConfig()
      },
      deep: true,
      immediate: true
    },
    batchModifyFields: { // 批量修改项字段
      handler() {
        this.initTableGlobalConfig()
      },
      deep: true,
      immediate: true
    }
  },
  data() {
    return {
      tableGlobalConfigIn: {
        headCellWordwrap: true,
        cellEditableStatusStyle: false,
        importConfig: {},
        tooltipNotShowFields: ['nickname'], // 列不显示tooltip
        keepSource: true,
        mouseConfig: { selected: true },
        columnDrop: false, // 列拖拽
        cacheStatus: false,
        dragColumnsConfig: {
          cacheStatus: false, // 是否开启列顺序缓存
          openDrag: false
        },
        rowDrop: true, // 行拖拽
        stripe: false, // 斑马纹
        storage: false, // 是否开启列设置缓存
        editable: true, // 可编辑
        resizable: true, // 所有的列是否允许拖动列宽调整大小
        align: 'center', // left（左对齐）, center（居中对齐）, right（右对齐）
        headerAlign: 'center', // left（左对齐）, center（居中对齐）, right（右对齐）
        footerAlign: 'right', // left（左对齐）, center（居中对齐）, right（右对齐）
        highlightCell: false, // 只对 edit-config 配置时有效，是否在编辑时高亮单元格边框（只支持部分）,
        highlightCurrentRow: true, // 高亮行
        highlightHoverRow: true,
        showOverflow: 'tooltip', // 单行省略并显示提示文字
        showHeader: true,
        showHeaderOverflow: 'tooltip', // 头部单行省略并显示
        showFooterOverflow: 'tooltip', // 尾部单行省略并显示
        exportConfig: { // 默认导出配置
          filename: 'exportDowload',
          original: false, // 是否导出数据源
          mode: 'current', // 输出数据的方式 current, selected, all 当前表 选择行 抑或 全部
          type: 'xlsx',
          types: ['csv', 'txt'],
          moneyUnitTransform: false, // 导出金额是否按选取的单位元和万元展示转换
          isExportZero: true, // 导出金额是否按默认值展示 默认true
          seqIndex: true, // 是否添加序号
          columnFilterMethod(column, $columnIndex, ColumnConfigs) { // 导出过滤
            let filterConlumsType = ['dragSort', 'seq', 'checkbox', 'radio', 'optionRow']
            return filterConlumsType.indexOf(column.type) === -1
          }
        },
        tooltipConfigIn: { // toolTip配置
          enabled: false,
          showAll: false, // 所有单元格开启 tooltip 显示
          theme: 'dark', // dark, light,
          enterable: false,
          moneyColShow: true,
          leaveDelay: 300,
          wordLength: 8,
          // 多余几个字显示配置
          contentMethod: ({ items, row, rowIndex, $rowIndex, column, _columnIndex, $columnIndex, type, cell, $event }) => {
            if (this.tableGlobalConfigIn.tooltipNotShowFields.indexOf(column.property) >= 0) {
              return ''
            }
            let render = column.editRender || column.cellRender
            try {
              let word = this.tableConfig.wordLength || this.tableGlobalConfigIn.tooltipConfigIn.wordLength
              if (typeof (row) === 'object') {
                // 如果是字符串 就替换体面的br 为换行
                if (typeof row[column.property] === 'string') {
                  var reg = new RegExp('</br>', 'g')
                  row[column.property] = row[column.property].replace(reg, '\n')
                }
                if (this.getBasicDataType(column.own.tooltipFormat) === 'String') {
                  return this.formatFn(column.own.tooltipFormat, row, this.publicData.rowPublicData)
                }
                let filedViewSort = String(column.property).endsWith('_') ? (column.property + '_viewSort') : (column.property + '__viewSort')
                if (row && column.property && render && (render.name === '$vxeMoney' || render.name === '$vxeCalculate') && row[column.property] && this.tableGlobalConfigIn.tooltipConfigIn.moneyColShow) {
                  // 处理单独列转为万元情况
                  if (column.params && column.params.moneyUnit === 10000) {
                    // return this.digitUppercase(row[column.property] * 10000)
                    return this.digitUppercase(Number(((row[column.property + '__viewSort'] || '') + '').replace(/,/g, '')) * 10000)
                  }
                  // return this.digitUppercase(row[column.property])
                  return this.digitUppercase(Number(((row[column.property + '__viewSort'] || '') + '').replace(/,/g, '')) * this.moneyUnit)
                } else if (row[column.property + '__viewSort'] !== undefined) {
                  return String(row[column.property + '__viewSort']).length > word ? row[column.property + '__viewSort'] : ''
                } else if (row[filedViewSort] !== undefined) {
                  return String(row[filedViewSort]).length > word ? row[filedViewSort] : ''
                } else if (row && column.property) {
                  return row[column.property] && row[column.property].toString().length > word ? row[column.property] || cell.innerText : ''
                } else {
                  return column.own.title.length > word ? column.own.title : ''
                }
              } else if (type === 'footer') {
                if (column.property && render && (render.name === '$vxeMoney' || render.name === '$vxeCalculate') && items[_columnIndex] && this.tableGlobalConfigIn.tooltipConfigIn.moneyColShow) {
                  // 处理单独列转为万元情况
                  const digits = render?.props?.digits || 2
                  if (column.params && column.params.moneyUnit === 10000) {
                    // return this.digitUppercase(this.viewFooterData[$rowIndex][_columnIndex] * 10000)
                    return this.digitUppercase(this.transToNumber(this.viewFooterData[$rowIndex][_columnIndex], digits) * 10000)
                  }
                  // return this.digitUppercase(this.viewFooterData[$rowIndex][_columnIndex])
                  return self.digitUppercase(self.transToNumbe(self.viewFooterData[$rowIndex][_columnIndex], digits))
                } else {
                  return items[_columnIndex] && String(items[_columnIndex]).length > word ? items[_columnIndex] : ''
                }
              } else if (type === 'header') {
                return column.own.title.length > word ? column.own.title : ''
              } else {

              }
            } catch (e) {
              throw (e)
            }
          }
        },
        tableConfig: { // 全局默认渲染列配置
          checkType: 'checkbox', // radio
          seq: true,
          filters: true,
          sortable: false
        }
      }
    }
  },
  methods: {
    initTableGlobalConfig() { // 初始化全局配置
      this.tableGlobalConfigIn = Object.assign({}, this.tableGlobalConfigIn, this.tableGlobalConfig)
    }
  },
  created() {
    this.initTableGlobalConfig()
  }
}
