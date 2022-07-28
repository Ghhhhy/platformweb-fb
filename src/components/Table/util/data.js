// data   Author:Titans@2396757591@qq.com
import { pagerConfig, tableFormConfig, footerConfig, contextMenuConfig } from '../config/tableDefaultConfig'
import GlobalConfig from '../../GlobalConfig/index.js'
export default function () {
  let self = this
  return {
    showRowDropHelpTip: false,
    scrollLoading: false,
    scrollLoadConfigCp: {
      tatal: 0, // 总数据条数
      currentPage: 1, // 当前加载第几页数据
      enabled: true, // 是否开启滚动加载
      curGt: 100, // 当前加载的数据条数
      gt: 100, // 指定大于指定行时自动启动纵向虚拟滚动，如果为 0 则总是启用，如果为 - 1 则关闭（注：启用纵向虚拟滚动之后将不能支持动态行高）
      pageSize: 100, // 指定每次滚动加载的数据size
      loadData(obj) {
        return new Promise((resolve, reject) => {
          resolve({
            tatal: 0, // 总数据条数
            data: [] // 数据
          })
        })
      }
    },
    viewFooterData: [],
    tableGlobalConfigIn: {
      mouseConfig: { selected: true },
      columnDrop: false, // 列拖拽
      dragColumnsConfig: {
        cacheStatus: false,
        openDrag: false
      },
      rowDrop: true, // 行拖拽
      stripe: true, // 斑马纹
      storage: true, // 是否开启列设置缓存
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
      tooltipNotShowFields: [], // 列不显示tooltip
      tooltipConfig: { // toolTip配置
        showAll: GlobalConfig.table.tooltipConfig.showAll, // 所有单元格开启 tooltip 显示
        theme: 'dark', // dark, light,
        enterable: false,
        leaveDelay: 300,
        contentMethod({ items, row, rowIndex, $rowIndex, column, _columnIndex, $columnIndex, type, cell, $event }) {
          if (self.tableGlobalConfigIn.tooltipNotShowFields.indexOf(column.property) >= 0) {
            return ''
          }
          let render = column.editRender || column.cellRender
          try {
            if (typeof (row) === 'object') {
              // 调整
              // else if (row && column.property && render && render.name === '$treeinput' && row[column.property]) {
              //   const treeArr = row[column.property].split('##')
              //   const code = (treeArr[1] === ' ' || !treeArr[1]) ? '' : treeArr[1]
              //   const name = (treeArr[2] === ' ' || !treeArr[2]) ? '' : treeArr[2]
              //   return name ? `${code}-${name}` : ''
              // }
              if (self.getbasicDataType(column.own.tooltipFormat) === 'String') {
                return self.formatFn(column.own.tooltipFormat, row, self.publicData.rowPublicData)
              }
              let filedViewSort = String(column.property).endsWith('_') ? (column.property + '_viewSort') : (column.property + '__viewSort')
              if (row && column.property && render && (render.name === '$vxeMoney' || render.name === '$vxeCalculate') && row[column.property]) {
                if (GlobalConfig.table.tooltipConfig.moneyColshow) {
                  return self.digitUppercase(row[column.property])
                } else {
                  return ''
                }
              } else if (row[column.property + '__viewSort'] !== undefined) {
                return String(row[column.property + '__viewSort']).length > 8 ? row[column.property + '__viewSort'] : ''
              } else if (row[filedViewSort] !== undefined) {
                return String(row[filedViewSort]).length > 8 ? row[filedViewSort] : ''
              } else if (row && column.property) {
                return row[column.property] && (row[column.property]).toString().length > 8 ? row[column.property] || cell.innerText : ''
              } else {
                return column.own.title.length > 8 ? column.own.title : ''
              }
            } else if (type === 'footer') {
              if (column.property && render && (render.name === '$vxeMoney' || render.name === '$vxeCalculate') && items[_columnIndex]) {
                if (GlobalConfig.table.tooltipConfig.moneyColshow) {
                  return self.digitUppercase(self.viewFooterData[$rowIndex][_columnIndex])
                } else {
                  return ''
                }
              } else {
                return items[_columnIndex] && String(items[_columnIndex]).length > 8 ? items[_columnIndex] : ''
              }
            } else if (type === 'header') {
              return column.own.title.length > 8 ? column.own.title : ''
            } else {

            }
          } catch (e) {
            throw (e)
          }
        }
      },
      tableConfig: { // 全局默认渲染列配置
        // 全局配置
        checkType: 'checkbox',
        seq: true,
        filters: true,
        sortable: false
      }
    },
    contextMenuConfigIn: { // 右键菜单配置
      ...contextMenuConfig
    },
    sortConfigIn: { // 排序配置
      orders: 'desc',
      sortMethod: ({ $table, data, column, property, order }) => {
        $table.clearCheckboxRow()
        let sortedData = $table.$parent.$parent.arrSort({ $table, data, column, property, order })
        this.$emit('onTableSorted', { $table, data, column, property, order, sortedData })
        return sortedData
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
    rowVisibleConfigIn: {
      visibleMethod(obj) {
        return true
      }
    },
    expandConfigIn: { // 展开配置
    },
    tableConfigCp: { // 表格渲染配置
      globalConfig: { // 全局默认渲染列配置
        // 全局配置
        checkType: 'checkbox', // hasCheckbox 可选值 ''||checkbox||radio
        seq: true, // 序号列
        cellClickCheck: false, // 是否开启点击行任意单元格选择
        filters: true,
        sortable: false,
        export: {
          moneyHasThousands: true
        },

        rowDrop: true, //  是否开启列拖拽
        optionSort: true //  是否添加并开启行手动上移下移排序
      },
      formatters: {},
      renderers: {},
      methods: {}
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
      reverseCheck: false,
      moneyInputSwich: true, // 是否开启money单位切换输入
      batchModify: false, // 批量修改
      yearlist: [],
      disabledMoneyConversion: false,
      moneyConversion: true, // 是否有金额转换
      search: false, // 是否有search 可选值：true(本地过滤)||false(关闭本地过滤)||'remoteSearch'(远程过滤)
      advancedSearch: false, // 是否有高级search
      calculator: true,
      refresh: true,
      import: false, // 导入
      export: true, // 导出
      exportCustom: false, // 如果导出需要自主控制，则自定义控制
      print: false, // 打印
      zoom: true, // 缩放
      custom: true, // 选配展示列
      moneyUnitOptions: [ // 金额单位配置
        {
          value: 1,
          label: '元', // 元
          inputDigits: 2, // 录入最大允许位数
          viewDigits: 2 // 显示位数
        },
        {
          value: 10000,
          label: '万元', // 万元
          inputDigits: 2, // 录入最大允许位数
          viewDigits: 2 // 显示位数
        }
      ],
      slots: {
        tools: 'toolbarTools'
        // buttons: 'toolbarSlots'
      }
    },
    toolbarConfigInCopy: {
      yearlist: []
    },
    curSelectMoneyUnitOption: { // 当前选择金额单位配置
      value: 1,
      label: '元', // 元
      inputDigits: 2, // 录入最大允许位数
      viewDigits: 2 // 显示位数
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
    gradedSummaryFields: [], // 分级汇总字段
    tableDataIn: [], // 表格数据，
    deepTableData: [],
    tableDataMap: {}, // 表格映射数据，
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
    filtertext: '', // 模糊过滤
    filtertextCp: '', // 模糊过滤渲染匹配数据
    tableFormConfigIn: { ...tableFormConfig }, // 表格form配置
    currentPage: 1,
    pageSize: 20,
    moneyUnit: 1,
    filterValue: '',
    ifRenderTable: true,
    tableColumnsFieldMap: {}, // 字段映射
    tableColumnsFieldArr: [], // 字段数组
    tableColumnsSingArr: [], // 简单表头列信息映射
    tableColumnsTitleFieldMap: {}, // 简单表头列中文名字段映射
    tableColumnsSingEditFieldArr: [], // 可编辑字段数组
    calculateConstraintConfigIn: { // 执行顺序： 取数-->行内计算-->分级汇总-->父级行内计算-->单元格交叉计算(涉及的行计算)-->行约束-->单元格约束
      enabled: true, // 是否开启此项功能
      enabledType: { // 执行开关
        performGetData: false, // 取数
        performColFormula: true, // 列公式
        gradedSummary: false, // 分级汇总
        performRowCodeFormula: false, // 单元格交叉计算
        performColConstraint: false, // 列约束
        performCellConstraint: false// 单元格约束
      },
      extendMapInfoField: true, // 是否扩展mapInfo字段  item__level,item__pcode,item__pNestCode
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
    constrainDataMap: {},
    printConfigIn: {},
    editConfigInCp: { // 行内编辑配置
      trigger: 'dblclick',
      mode: 'cell',
      activeMethod: self.isActiveCellEdit,
      showStatus: true
    },
    exportModalData: {},
    importData: [], // 导入数据
    importModalVisible: false, // 导入弹框
    fileConfig: {
      fileName: '',
      maxSize: 1024 * 1024 * 10
    }, // 导入文件配置
    exportModalVisible: false, // 导出弹框
    highConfigIn: {
      scrollY: {
        gt: -1
      },
      scrollX: {
        gt: -1
      }
    }
  }
}
