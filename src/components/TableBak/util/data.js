// data   Author:Titans@2396757591@qq.com
import { pagerConfig, tableFormConfig, footerConfig, contextMenuConfig } from '../config/tableDefaultConfig'
export default {
  tableGlobalConfigIn: {
    editable: true, // 可编辑
    resizable: true, // 所有的列是否允许拖动列宽调整大小
    align: 'center', // left（左对齐）, center（居中对齐）, right（右对齐）
    headerAlign: 'center', // left（左对齐）, center（居中对齐）, right（右对齐）
    footerAlign: 'right', // left（左对齐）, center（居中对齐）, right（右对齐）
    highlightCell: false, // 只对 edit-config 配置时有效，是否在编辑时高亮单元格边框（只支持部分）,
    highlightCurrentRow: true, // 高亮行
    showOverflow: 'tooltip', // 单行省略并显示提示文字
    showHeaderOverflow: 'tooltip', // 头部单行省略并显示
    showFooterOverflow: 'tooltip', // 尾部单行省略并显示
    exportConfig: { // 默认导出配置
      filename: 'exportDowload',
      original: false, // 是否导出数据源
      mode: 'current', // 模式当前显示
      type: 'xlsx',
      types: ['csv', 'xlsx'],
      columnFilterMethod(column, $columnIndex, ColumnConfigs) { // 导出过滤
        let filterConlumsType = ['dragSort', 'seq', 'checkbox', 'radio', 'optionRow']
        return filterConlumsType.indexOf(column.type) === -1
      }
    },
    tooltipConfig: { // toolTip配置
      enabled: false,
      theme: 'dark', // dark, light,
      enterable: false,
      leaveDelay: 300,
      contentMethod({ items, row, rowIndex, $rowIndex, column, columnIndex, $columnIndex, type, cell, $event }) {
        if (row && column.property && column.editRender && column.editRender.name === '$treeinput' && row[column.property]) {
          const treeArr = row[column.property].split('##')
          const code = (treeArr[1] === ' ' || !treeArr[1]) ? '' : treeArr[1]
          const name = (treeArr[2] === ' ' || !treeArr[2]) ? '' : treeArr[2]
          return name ? `${code}-${name}` : ''
        }
        if (row && column.property) {
          return row[column.property] && (row[column.property]).toString().length > 8 ? row[column.property] || cell.innerText : ''
        } else {
          return column.own.title.length > 8 ? column.own.title : ''
        }
      }
    }
  },
  contextMenuConfigIn: { // 右键菜单配置
    ...contextMenuConfig
  },
  sortConfigIn: { // 排序配置
    orders: 'desc',
    sortMethod: ({ $table, data, column, property, order }) => {
      // obj
      // let prevRowCp = prevRow.split('##').shift()
      // let nexRowCp = nexRow.split('##').shift()
      // console.log(prevRow, nexRow, prevRowCp.join('-') - nexRowCp.join('-'))
      // return prevRowCp.join('-') - nexRowCp.join('-')
      return $table.$parent.$parent.arrSort({ $table, data, column, property, order })
    }
  },
  filterConfig: {
    remote: false,
    filterMethod({ value, row, column }) {
      return row[column.property].toLowerCase().indexOf(value.toLowerCase()) >= 0
    }
  },
  footerConfigIn: { // 表尾配置
    ...footerConfig
  },
  editConfigIn: false,
  editConfigInCp: { // 行内编辑配置
    trigger: 'dblclick',
    mode: 'cell'
  },
  expandConfigIn: { // 展开配置
  },
  tableConfigCp: { // 表格渲染配置
    globalConfig: { // 全局默认渲染列配置
      // 全局配置
      checkType: 'checkbox',
      seq: true,
      filters: true,
      sortable: false
    },
    cellRenderConfig: {
    },
    formatters: {
    },
    filters: {
    },
    renderers: {
    },
    methods: {
    }
  },
  validConfig: { // 校验配置
    autoPos: true,
    message: 'tooltip',
    maxWidth: '300'
  },
  editRulesIn: { // 校验规则

  },
  toolbarConfigIn: { // table工具栏配置
  },
  toolbarConfigInCp: {
    yearlist: [],
    disabledMoneyConversion: false,
    moneyConversion: true, // 是否有金额转换
    search: false, // 是否有search
    advancedSearch: false, // 是否有高级search
    calculator: true,
    refresh: true,
    import: false, // 导入
    export: true, // 导出
    print: false, // 打印
    zoom: true, // 缩放
    custom: true, // 选配展示列
    slots: {
      tools: 'toolbarTools'
      // buttons: 'toolbarSlots'
    }
  },
  toolbarConfigInCopy: {
    yearlist: []
  },
  pagerConfigIn: { // 分页配置
    total: 0,
    currentPage: 1,
    pageSize: 20,
    ...pagerConfig
  },
  pagerConfigInCp: {
    total: 0,
    currentPage: 1,
    pageSize: 20,
    ...pagerConfig
  },
  tableColumnsConfigIn: [], // 表格列渲染数据
  tableDataIn: [], // 表格数据，
  deepTableData: [],
  seqConfig: { // 序号配置项
    startIndex: 1, // 设置序号的起始值 number0
    seqMethod({ row, $rowIndex, rowIndex, column, columnIndex }) {
      return $rowIndex + 1
    }
  },
  selection: [], // 当前选中集合
  formSearchData: {
    filterValue: '',
    year: ''
  }, // 表格搜索参数集合
  tableFormConfigIn: { ...tableFormConfig }, // 表格form配置
  currentPage: 1,
  pageSize: 20,
  moneyUnit: 1,
  filterValue: '',
  ifRenderTable: false,
  tableColumnsFieldMap: {}, // 字段映射
  tableColumnsFieldArr: [], // 字段数组
  tableColumnsSingArr: [], // 简单表头列信息映射
  tableColumnsTitleFieldMap: {}, // 简单表头列中文名字段映射
  calculateConstraintConfig: {
    rowformulaConfig: { // 行公式配置
      // '4:profit': '{0:income}+{1:tax}+{2:deduction}+{3:profit}'
    },
    colFormulaConfig: { // 列公式配置
      // profit: '{income}-{tax}-{deduction}',
      // income: '{age}*2'
    },
    constraintConfig: { // 表间约束配置

    }
  }
}
