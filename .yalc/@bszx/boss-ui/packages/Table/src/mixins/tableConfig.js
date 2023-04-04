/*
 * @Author: 轻语
 * @Date: 2021-11-04 15:10:39
 * @LastEditors: Comer
 * @LastEditTime: 2023-04-04 10:11:44
 * @Description: 渲染自定义render、globalConfig、initTableColumns、initPagerConfig
 */

import { pagerConfig, tableColumnsDefaultConfig, filterTypeMap } from '../config/tableDefaultConfig'
export default {
  props: {
    tableColumnsConfig: { // 表头配置
      type: Array,
      default () {
        return []
      }
    },
    tableConfig: { // 表格配置
      type: Object,
      default () {
        return {}
      }
    },
    title: {
      type: String,
      default: ''
    },
    tableFormConfig: { // 表格form配置
      type: [Object, Boolean],
      default () {
        return false
      }
    }
  },
  watch: {
    tableColumnsConfig: { // 表头配置监听
      handler() {
        this.initTable()
      },
      deep: true,
      immediate: true
    },
    tableFormConfig: { // table Form配置监听
      handler() {
        this.initTableFormConfig()
      },
      deep: true,
      immediate: true
    }
  },
  data() {
    return {
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
      showRowDropHelpTip: false,
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
          rowDrop: false, //  是否开启列拖拽
          optionSort: false //  是否添加并开启行手动上移下移排序
        },
        formatters: {},
        renderers: {},
        methods: {}
      },
      tableColumnsFieldMap: {}, // 字段映射
      tableColumnsFieldArr: [], // 字段数组
      tableColumnsSingArr: [], // 简单表头列信息映射
      tableColumnsTitleFieldMap: {}, // 简单表头列中文名字段映射
      tableColumnsSingEditFieldArr: [] // 可编辑字段数组
    }
  },
  methods: {
    initTable() {
      this.renderCellClassIn = this.renderCellClass
      this.initTableFormConfig()
      this.initTableConfig()
      this.initTableColumns()
      this.initPagerConfig()
    },
    initTableFormConfig() {
      if (this.getBasicDataType(this.tableFormConfig) === 'Boolean') {
        this.tableFormConfigIn = undefined
      } else {
        this.tableFormConfigIn = Object.assign({}, this.tableFormConfig)
      }
    },
    initTableConfig() { // 初始化表格列和渲染器配置
      this.tableConfigCp = Object.assign({
        globalConfig: {
          checkType: 'checkbox',
          seq: true,
          filters: true,
          sortable: false
        }
      }, this.tableConfig || this.tableGlobalConfigIn.tableConfig)
      const renders = { ...this.tableConfigCp.renderers }
      this.registerTableRender(renders)
    },
    registerTableRender(renders) { // 注册全局&自定义渲染器
      for (let i in renders) {
        this.$VXETable.renderer.add(i, renders[i])
      }
    },
    initTableColumns(columnsConfig) { // 初始化列配置
      this.calculateConstraintConfigIn = Object.assign({}, this.calculateConstraintConfigIn)
      const tableColumnsConfig = (this.tableGlobalConfig.dragColumnsConfig && this.tableGlobalConfig.dragColumnsConfig.cacheStatus) ? this.initCacheColumn() : (columnsConfig || this.tableColumnsConfig)
      if (tableColumnsConfig.length) {
        this.generateCalcColFormulaMap(tableColumnsConfig)
        const tableColumnsConfigIn = this.unidirectionalData ? this.deepCopy(this.generateTableColumns(tableColumnsConfig, this.tableConfigCp.globalConfig)) : this.generateTableColumns(tableColumnsConfig, this.tableConfigCp.globalConfig)
        // 隐藏列，以支持导出功能需要展示 而页面不需要展示的列
        this.tableColumnsConfigIn = tableColumnsConfigIn.filter(k => !k.isHide)
        if (this.project.name === 'pay') {
          let cellRender = {
            'name': '$vxeTree',
            'options': [],
            'defaultValue': '',
            'props': {
              'format': '{code}-{name}'
            }
          }
          let crtColumns = this.tableColumnsConfigIn
          crtColumns.forEach((item, index) => {
            if (item.title === '预算单位' && !item.isDataQuery) {
              item.field = 'agency_'
              item.cellRender = cellRender
            }
            if ((item.title === '支出功能分类' || item.title === '功能分类') && !item.isDataQuery) {
              item.field = 'exp_func_'
              item.cellRender = cellRender
            }
            if ((item.title === '业务主管处' || item.title === '业务主管处室') && !item.isDataQuery) {
              item.field = 'manage_mof_dep_'
              item.cellRender = cellRender
            }
            if ((item.title === '政府支出经济分类' || item.title === '政府预算经济分类' || item.title === '政府经济分类') && !item.isDataQuery) {
              item.field = 'gov_bgt_eco_'
              item.cellRender = cellRender
            }
            if (item.title === '资金性质' && !item.isDataQuery) {
              item.field = 'fund_type_'
              item.cellRender = cellRender
            }
            if (item.title === '指标来源' && !item.isDataQuery) {
              item.field = 'source_type_'
              item.cellRender = cellRender
            }
            if (item.title === '支付方式' && !item.isDataQuery) {
              item.field = 'pay_type_'
              item.cellRender = cellRender
            }
            if (item.title === '三公经费' && !item.isDataQuery) {
              item.field = 'thr_exp_'
              item.cellRender = cellRender
            }
            if (item.title === '工资标识' && !item.isDataQuery) {
              item.field = 'is_sal_'
              item.cellRender = cellRender
            }
            if (item.title === '是否扶贫' && !item.isDataQuery) {
              item.field = 'is_alle_'
              item.cellRender = cellRender
            }
            if (item.title === '是否政府采购' && !item.isDataQuery) {
              item.field = 'is_gov_pur_'
              item.cellRender = cellRender
            }
            if (item.title === '是否工会经费' && !item.isDataQuery) {
              item.field = 'is_fun_'
              item.cellRender = cellRender
            }
            if (item.title === '账户类型' && !item.isDataQuery) {
              item.field = 'acc_type_'
              item.cellRender = cellRender
            }
            if (item.title === '指标文号' && !item.isDataQuery) {
              item.field = 'cor_bgt_doc_no_name'
            }
            if ((item.title === '部门支出经济分类' || item.title === '部门经济科目' || item.title === '部门预算经济分类' || item.title === '经济分类' || item.title === '部门经济分类') && !item.isDataQuery) {
              item.field = 'dep_bgt_eco_'
              item.cellRender = cellRender
            }
            if (item.title === '代理银行' && !item.isDataQuery) {
              item.field = 'pay_bank_'
              item.cellRender = cellRender
            }
            if (item.title === '清算银行' && !item.isDataQuery) {
              item.field = 'clear_bank_'
              item.cellRender = cellRender
            }
            if ((item.title === '收支科目类别' || item.title === '收支科目类型') && !item.isDataQuery) { // TODO
              item.field = 'pro_cat_'
              item.cellRender = cellRender
            }
            if ((item.title === '计划说明' && !item.oldUse) && !item.isDataQuery) {
              item.field = 'use_des'
            }
            if (item.title === '结算方式' && !item.isDataQuery) {
              item.field = 'set_mode_'
              item.cellRender = cellRender
            }
          })
        }
      } else {
        this.tableColumnsConfigIn = []
      }
      return this.tableColumnsConfigIn
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
    // 生成表头， 添加手动拖拽、check、seq
    generateTableColumns(columns, globalConfig) {
      let tableColumnsConfigIn = []
      if (globalConfig.rowDrop) {
        tableColumnsConfigIn.push(tableColumnsDefaultConfig['rowDrop'])
      }
      if (globalConfig.checkType) {
        tableColumnsConfigIn.push(tableColumnsDefaultConfig[globalConfig.checkType])
      }
      if (globalConfig.seq) {
        tableColumnsConfigIn.push(tableColumnsDefaultConfig['seq'])
      }
      tableColumnsConfigIn = [...tableColumnsConfigIn, ...columns]
      if (globalConfig.optionSort) {
        tableColumnsConfigIn.push(tableColumnsDefaultConfig['optionSort'])
      }
      this.registerGlobalColumnsConfig(tableColumnsConfigIn)
      return tableColumnsConfigIn
    },
    initPagerConfig() {
      // 更新分页配置
      if (this.getBasicDataType(this.pagerConfig) === 'Boolean') {
        this.pagerConfigIn = undefined
      } else {
        this.pagerConfigIn = Object.assign({}, this.pagerConfigIn ? this.pagerConfigIn : this.pagerConfigInCp, this.pagerConfig)
      }
    },
    // 注册列格式化，渲染器，过滤项目等全局函数
    registerGlobalColumnsConfig(arr = []) {
      let self = this
      function reverseRegisterGlobalColumnsConfig(arr) {
        arr.forEach((item, index) => {
          self.registerSingleRowConfig(arr, item, index)
          if (Array.isArray(item.children) && item.children.length) {
            self.registerGlobalColumnsConfig(item.children)
          }
        })
      }
      reverseRegisterGlobalColumnsConfig(arr)
    },
    registerSingleRowConfig(arr, item, index) {
      // 注册 单条数据配置项
      arr[index] = this.registerSingleRowFilter(item)
    },
    registerSingleRowFilter(item) {
      // 绑定单条列过滤器配置
      if (Array.isArray(item.children)) {
        return item
      }
      try {
        let itemRender = item.cellRender || item.editRender
        if (itemRender && ((item.filters + '' === 'true') || item.filters + '' === 'undefined')) {
          if (itemRender.name && filterTypeMap[itemRender.name]) {
            if (itemRender.name === '$vxeInput') {
              if (this.getBasicDataType(itemRender.props) === 'Object' && filterTypeMap['$vxeInput'][itemRender.name + itemRender.props.type]) {
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
    cellClickBak(obj) {
      let self = this
      const { xGrid } = self.$refs
      if (self.tableConfigCp.globalConfig.cellClickCheck && self.tableGlobalConfigIn.cellClickCheck) {
        // const { row, rowIndex, $rowIndex, column, columnIndex, $columnIndex, triggerRadio, triggerCheckbox, triggerTreeNode, triggerExpandNode, $event } = obj
        const { row, $event, column } = obj
        if (column.type !== 'checkbox') {
          if ($event.shiftKey) {
            // option
            self.$emit('cellClick', obj, self, self.$refs.xGrid)
            self.$emit('ProxyEvent', 'cellClick', obj, self, self.$refs.xGrid)
          } else {
            xGrid.setCheckboxRow([row], !xGrid.isCheckedByCheckboxRow(row)).then(() => {
              self.selection = self.$refs.xGrid.getCheckboxRecords()
              self.updateBodyTopRows()
              self.updateFooter().then(() => {
                xGrid.setCurrentRow(row).then(() => {
                  self.$emit('cellClick', obj, self, self.$refs.xGrid)
                  self.$emit('ProxyEvent', 'cellClick', obj, self, self.$refs.xGrid)
                })
              }).catch(() => {
                self.$emit('cellClick', obj, self, self.$refs.xGrid)
                self.$emit('ProxyEvent', 'cellClick', obj, self, self.$refs.xGrid)
              })
            })
          }
        }
      } else {
        self.$emit('cellClick', obj, self, self.$refs.xGrid)
        self.$emit('ProxyEvent', 'cellClick', obj, self, self.$refs.xGrid)
      }
    }, // 单元格被点击时会触发该事件 { row, rowIndex, $rowIndex, column, columnIndex, $columnIndex, $event }
    cellClick(obj) {
      let self = this
      const { xGrid } = self.$refs
      if (self.tableConfigCp.globalConfig.cellClickCheck && self.tableGlobalConfigIn.cellClickCheck) {
        // const { row, rowIndex, $rowIndex, column, columnIndex, $columnIndex, triggerRadio, triggerCheckbox, triggerTreeNode, triggerExpandNode, $event } = obj
        const { row, $event, column } = obj
        if (column.type !== 'checkbox' || column.type !== 'radio') {
          if (this.tableCheckType === 'checkbox') {
            if ($event.shiftKey) {
              // option
              self.$emit('cellClick', obj, self, self.$refs.xGrid)
              self.$emit('ProxyEvent', 'cellClick', obj, self, self.$refs.xGrid)
            } else {
              xGrid.setCheckboxRow([row], !xGrid.isCheckedByCheckboxRow(row)).then(() => {
                self.selection = self.$refs.xGrid.getCheckboxRecords()
                self.updateBodyTopRows()
                self.updateFooter().then(() => {
                  xGrid.setCurrentRow(row).then(() => {
                    self.$emit('cellClick', obj, self, self.$refs.xGrid)
                    self.$emit('ProxyEvent', 'cellClick', obj, self, self.$refs.xGrid)
                  })
                }).catch(() => {
                  self.$emit('cellClick', obj, self, self.$refs.xGrid)
                  self.$emit('ProxyEvent', 'cellClick', obj, self, self.$refs.xGrid)
                })
              })
            }
          } else if (this.tableCheckType === 'radio') {
            if ($event.shiftKey) {
              // option
              self.$emit('cellClick', obj, self, self.$refs.xGrid)
              self.$emit('ProxyEvent', 'cellClick', obj, self, self.$refs.xGrid)
            } else {
              xGrid.clearRadioRow().setRadioRow(row).then(() => {
                self.selection = [self.$refs.xGrid.getRadioRecord(true)]
                self.updateBodyTopRows()
                self.updateFooter().then(() => {
                  xGrid.setCurrentRow(row).then(() => {
                    self.$emit('cellClick', obj, self, self.$refs.xGrid)
                    self.$emit('ProxyEvent', 'cellClick', obj, self, self.$refs.xGrid)
                  })
                }).catch(() => {
                  self.$emit('cellClick', obj, self, self.$refs.xGrid)
                  self.$emit('ProxyEvent', 'cellClick', obj, self, self.$refs.xGrid)
                })
              })
            }
          }
        }
      } else {
        self.$emit('cellClick', obj, self, self.$refs.xGrid)
        self.$emit('ProxyEvent', 'cellClick', obj, self, self.$refs.xGrid)
      }
      this.performTableDataCalculate(obj)
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
    cellOptionCallBack() { // 渲染器回调事件
      this.$emit('cellOptionCallBack', ...arguments, this, this.$refs.xGrid)
      this.$emit('ProxyEvent', 'cellOptionCallBack', ...arguments, this, this.$refs.xGrid)
    },
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
    }, // 当最大化或还原操作被手动点击时会后触发该事件 { type, $event }
    keyboardDelMethod(obj) {
      this.performTableDataCalculate(obj).then(({ row }) => {
        this.$emit('keyboardDelMethod', obj, this, this.$refs.xGrid)
        this.$emit('ProxyEvent', 'keyboardDelMethod', obj, this, this.$refs.xGrid)
      })
    },
    keyboardBackMethod(obj) {
      this.performTableDataCalculate(obj).then(({ row }) => {
        this.$emit('keyboardBackMethod', obj, this, this.$refs.xGrid)
        this.$emit('ProxyEvent', 'keyboardBackMethod', obj, this, this.$refs.xGrid)
      })
    },
    keyboardEditMethod(obj) {
      this.performTableDataCalculate(obj).then(({ row }) => {
        this.$emit('keyboardEditMethod', obj, this, this.$refs.xGrid)
        this.$emit('ProxyEvent', 'keyboardEditMethod', obj, this, this.$refs.xGrid)
      })
    },
    onOptionRowClick(obj) {
      // 操作列点击事件
      this.$emit('onOptionRowClick', obj, this)
      this.$emit('ProxyEvent', 'onOptionRowClick', obj, this, this.$refs.xGrid)
      let methods = this.tableConfigCp.methods
      typeof (methods?.onOptionRowClick) === 'function' && methods.onOptionRowClick(obj, this)
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
  },
  mounted() {
    this.initTable()
  }
}
