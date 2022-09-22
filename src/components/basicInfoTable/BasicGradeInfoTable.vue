<!--  基础分级信息表  Author:Titans@2396757591@qq.com -->
<template>
  <div :class="mode" class="basic-info-table" :style="{ height: tableRenderData.length * 34 + 40 + 'px' }">
    <BsTable
      :id="id"
      ref="basicInfoTable"
      :auto-resize="false"
      :table-global-config="tableGlobalConfig"
      :footer-config="{ showFooter: false }"
      :keyboard-config="{ isArrow: false }"
      :table-config="tableConfig"
      :table-columns-config="tableRenderColumnsConfig"
      :table-data="tableRenderData"
      :expand-config="false"
      :tree-config="false"
      :edit-config="mode !== 'detail' ? editConfig : false"
      :toolbar-config="toolbarConfig"
      :edit-rules="renderEditRules"
      :pager-config="false"
      :default-money-unit="defaultMoneyUnit"
      :calculate-constraint-config="calculateConstraintConfigIn"
      @editClosed="editClosed"
      @editActived="editActived"
      @cellClick="cellClick"
      @cellOptionCallBack="cellOptionCallBack"
    >
      <template v-slot:titleRequired="{ row, column }">
        <span> <span calss="fn-inline">{{ row[column.property] }}</span><span class="required">{{ row.required ? '*' : '' }}</span></span>
      </template>
    </bsTable>
  </div>
</template>

<script>
export default {
  name: 'BasicGradeInforTable',
  components: {},
  props: {
    id: { // 表格id
      type: String,
      default () {
        return 'gradeInfor'
      }
    },
    defaultMoneyUnit: {
      type: Number,
      default () {
        return 1
      }
    },
    itemsConfig: { // 项配置，可以是嵌套数据结构
      type: [Array],
      default() {
        return [
          {
            title: '基础信息',
            children: [
              {
                title: '姓名',
                field: 'name',
                width: 150,
                align: 'center',
                filters: false,
                editRender: {
                  name: '$vxeInput',
                  defaultValue: '默认的名字',
                  props: {
                    type: 'string',
                    redonly: true,
                    placeholder: '请输入姓名'
                  }
                }
              },
              {
                title: '年龄',
                field: 'age',
                sortable: true,
                width: 120,
                filters: false,
                align: 'center',
                combinedType: ['average'],
                editRender: {
                  name: '$vxeInput',
                  defaultValue: 1,
                  props: {
                    min: 0,
                    type: 'number',
                    placeholder: '抢输入年龄',
                    redonly: true
                  }
                }
              },
              {
                title: '类别',
                field: 'category',
                width: 150,
                editRender: {
                  name: '$vxeSelect',
                  defaultValue: '前端',
                  options: [
                    { value: '前端', label: '前端' },
                    { value: '后端', label: '后端' },
                    { value: '运维', label: '测试' },
                    { value: '实施', label: '实施' },
                    { value: '测试', label: '测试' }
                  ],
                  props: {
                    multiple: true,
                    placeholder: '请输入角色'
                  }
                }
              }
            ]
          },
          {
            title: '收入统计',
            children: [
              {
                title: '收入',
                field: 'income',
                fieldType: 'money',
                formula: '{age}>=18?Math.pow({age},4)/2:0',
                width: 150,
                align: 'right',
                cellRender: {
                  name: '$vxeMoney',
                  defaultValue: 0,
                  props: {
                    min: -1111111111,
                    type: 'float'
                  }
                }
              },
              {
                title: '扣除',
                field: 'deduction',
                width: 150,
                align: 'right',
                editRender: {
                  name: '$vxeMoney',
                  defaultValue: 0,
                  props: {
                    min: -1111111111,
                    type: 'float'
                  }
                }
              },
              {
                title: '奖金',
                width: 150,
                align: 'right',
                field: 'bonus',
                editRender: {
                  name: '$vxeMoney',
                  defaultValue: 0,
                  props: {
                    min: -1111111111,
                    type: 'float'
                  }
                }
              },
              {
                title: '实际收入',
                width: 180,
                align: 'right',
                field: 'actualIncome',
                editRender: {
                  name: '$vxeMoney',
                  defaultValue: 0,
                  props: {
                    min: -1111111111,
                    type: 'float'
                  }
                }
              }]
          }
        ]
      }
    },
    mode: { // 模式
      type: [String],
      default() {
        return 'edit' // edit(一直保持编辑状态),detail(展示状态),activeEdit(激活编辑)
      }
    },
    editConfig: { // 编辑配置
      type: [Object],
      default() {
        return {
        }
      }
    },
    editRules: { // 校验规则
      type: [Object],
      default() {
        return {
          name: [
            {
              required: true,
              type: 'string',
              // message: '名称长度需在 3 到 5 个字符',
              message() {
                return '名称长度需在 2 到 20 个字符'
              },
              min: 2,
              max: 20,
              pattern: /^[a-zA-Z0-9_\s\u4e00-\u9fa5]+$/i,
              trigger: 'change'
            },
            {
              required: true,
              type: 'string',
              message: '请输入昵称',
              trigger: 'change',
              // eslint-disable-next-line no-useless-escape
              // pattern: /^[a-zA-Z0-9_\(\)\{\}·.、\[\]\（\）\【\】\u4e00-\u9fa5]+$/i
              // pattern: /^[a-zA-Z0-9_\(\)\{\}·.、\[\]\（\）\【\】\u4e00-\u9fa5]+$/i
              validator({ cellValue, rule, rules, row, rowIndex, column, columnIndex, $table }) {
                return new Promise((resolve, reject) => {
                  let result = false
                  if (cellValue.length >= 10) {
                    // eslint-disable-next-line no-useless-escape
                    result = /^[a-zA-Z0-9_\(\)\{\}·.、\[\]\（\）\【\】\u4e00-\u9fa5]+$/i.test(cellValue)
                  } else {
                    result = false
                  }
                  if (result) {
                    resolve(true)
                  } else {
                    reject(new Error(
                      '名称必须不能有特殊字符，且字数数不能少于10个！'
                    ))
                  }
                })
              }
            }
          ],
          sex: [
            {
              required: true,
              message: '请选择性别',
              trigger: 'change'
            }
          ],
          age: [
            {
              required: true,
              message: '请输入年龄',
              min: 1,
              max: 150,
              type: 'number',
              trigger: 'change'
            }
          ],
          income: [
            {
              required: true,
              message: '请输入收入',
              trigger: 'change'
            }
          ]
        }
      }
    },
    renderColumnsConfig: { // 实际渲染列
      type: Array,
      default() {
        return [
          { // 序号
            title: '序号',
            type: 'seq',
            width: 80,
            align: 'center',
            className: 'table-sep',
            sortable: false
          },
          { // 序号
            title: '基本信息名称',
            align: 'left',
            className: 'table-title',
            field: 'renderTitle',
            sortable: false,
            cellRender: {
              name: '$vxeInput',
              props: {
                type: 'text'
              }
            }
          },
          // {
          //   title: '基本信息名称',
          //   className: 'table-title',
          //   align: 'left',
          //   titleAlign: 'left',
          //   field: 'renderTitle',
          //   slots: {
          //     // default: 'expandContent',
          //     // content: 'expand'
          //     // const { $rowIndex, $seq, $table, column, columnIndex, fixed, level, row, rowIndex, seq, type } = obj
          //     default(obj, h, fixedType) {
          //       const { $table } = obj
          //       let $scopedSlots = $table.$parent.$parent.$scopedSlots
          //       if ($scopedSlots.titleRequired) {
          //         return $scopedSlots.titleRequired(obj)
          //       } else {
          //         return obj.row[obj.column.property]
          //       }
          //     }
          //   }
          //   // <template v-if="ifRenderExpandContentTable" v-slot:expandContent="{ row, $rowIndex, rowIndex ,fixed }">
          //   //  <vue :ref="'expandContentTableRef' + (fixed ? fixed + rowIndex : rowIndex)"></vue>
          //   // </template>
          // },
          { // 序号
            title: '基本信息值',
            align: 'left',
            titleAlign: 'left',
            className: 'table-value',
            field: 'renderValue',
            sortable: false,
            editRender: {
              name: '$vxeBasicInfoRenderer',
              props: {
                type: 'text'
              }
            }
          }
        ]
      }
    },
    data: { // 数据包
      type: [Object],
      default() {
        return {
          actualIncome: '52000',
          age: '27',
          bonus: '10000',
          category: '前端',
          deduction: '3000',
          income: 50000,
          name: '张三'
        }
      }
    },
    cellStyle: { // 单元格样式
      type: [Object, Function],
      default() {
        return {
        }
      }
    },
    toolbarConfig: {
      type: Object,
      default() {
        return {
          moneyInputSwich: true,
          visible: false }
      }
    }
  },
  data() {
    return {
      calculateConstraintConfigIn: {
        calcAndConstraintItemCodeField: 'mapid', // 配置了rowCodeFormulaConfig时使用的itemcode字段名
        enabledType: { // 执行开关
          performGetData: false, // 取数
          performColFormula: true, // 列公式
          gradedSummary: false, // 分级汇总
          performRowCodeFormula: true, // 单元格交叉计算
          performColConstraint: false, // 列约束
          performCellConstraint: false// 单元格约束
        },
        colFormulaConfig: { // 公式配置
          // rowFormulaMap= { "colfield":"{colfield}[运算符]" }
          // profit: '{income}-{tax}-{deduction}',
        },
        rowCodeFormulaConfig: {
          // 单元格交叉计算
          // rowFormulaMap= { "colField:itemcode":"{tableId:colField:itemcode}[运算符]" }
          // '1001:bonus': '{1001:1002:income}+{1001:1003:bonus}',
        },
        constraintConfig: { // 约束配置

        }
      },
      tableGlobalConfig: {
        mouseConfig: { selected: false },
        tooltipConfig: { showAll: false }
      },
      tableConfig: {
        globalConfig: { // 全局默认渲染列配置
          // 全局配置
          checkType: '', // hasCheckbox 可选值 ''||checkbox||radio
          seq: false, // 序号列
          cellClickCheck: false, // 是否开启点击行任意单元格选择
          filters: false,
          sortable: false,
          rowDrop: false, //  是否开启列拖拽
          optionSort: false //  是否添加并开启行手动上移下移排序
        }
      },
      tableRenderMap: { // 渲染数据
        curmap: {
          mapid: '',
          editable: true,
          index: 0,
          nestIndex: 0,
          itemConfig: {},
          render: {},
          level: 0,
          formula: '',
          renderTitle: ''.padEnd(4 * (2 - 1)) + '',
          title: '', // 标题
          renderField: 'renderValue', // 渲染数据
          isTree: 'render.name $vxeTree', // 是不是下拉树，
          field: '', // 原本字段
          needmap: '' // 是否需要反响映射
        },
        map: {},
        mapSource: {},
        renderMap: {}
      },
      editRulesMap: {},
      tableRenderData: {}, // table渲染数据
      renderEditRules: {},
      tableRenderColumnsConfig: []
    }
  },
  methods: {
    getbasicDataType(obj) {
      // 获取数据类型
      return Object.prototype.toString.call(obj).slice(8, -1)
    },
    getUuid(hexDigits = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz') { // 获取mapid
      let s = []
      for (let i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
      }
      s[14] = '4'
      s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1)
      s[8] = s[13] = s[18] = s[23] = ''
      let uuid = s.join('')
      return uuid
    },
    chunk(arr, size) { // 分组
      var arr2 = []
      for (var i = 0; i < arr.length; i = i + size) {
        arr2.push(arr.slice(i, i + size))
      }
      return arr2
    },
    editClosed(obj, $bstable, $grid) { // 结束编辑事件
      const { map } = this.tableRenderMap
      this.$emit('editClosed', obj, { $bstable, $grid, basicInfoTable: this }, { itemMap: map[obj.row.mapid], data: this.getData() })
      this.$emit('ProxyEvent', 'editClosed', obj, { $bstable, $grid, basicInfoTable: this }, { itemMap: map[obj.row.mapid], data: this.getData() })
    },
    editActived(obj, $bstable, $grid) { // 开始编辑事件
      const { map } = this.tableRenderMap
      this.$emit('editActived', obj, { $bstable, $grid, basicInfoTable: this }, { itemMap: map[obj.row.mapid], data: this.getData() })
      this.$emit('ProxyEvent', 'editActived', obj, { $bstable, $grid, basicInfoTable: this }, { itemMap: map[obj.row.mapid], data: this.getData() })
    },
    cellClick(obj, $bstable, $grid) { // 行点击事件
      // this.initData(this.getData().data) // 强制触发更新和重计算
      const { map } = this.tableRenderMap
      this.$emit('cellClick', obj, { $bstable, $grid, basicInfoTable: this }, { itemMap: map[obj.row.mapid], data: this.getData() })
      this.$emit('ProxyEvent', 'cellClick', obj, { $bstable, $grid, basicInfoTable: this }, { itemMap: map[obj.row.mapid], data: this.getData() })
    },
    cellOptionCallBack(obj, option, $bstable, $grid) { // 单元格操作其他回调
      // this.initData(this.getData().data) // 强制触发更新和重计算
      const { map } = this.tableRenderMap
      this.$emit('cellOptionCallBack', obj, option, { $bstable, $grid, basicInfoTable: this }, { itemMap: map[obj.row.mapid], data: this.getData() })
      this.$emit('ProxyEvent', 'cellOptionCallBack', obj, option, { $bstable, $grid, basicInfoTable: this }, { itemMap: map[obj.row.mapid], data: this.getData() })
    },
    cellStyleIn({ row, rowIndex, $rowIndex, column, columnIndex, $columnIndex }) { // 单元格样式
      const { map } = this.tableRenderMap
      if (typeof this.cellStyle === 'function') {
        return this.cellStyle({ row, rowIndex, $rowIndex, column, columnIndex, $columnIndex }, map[row.mapid], this.getData())
      } else {
        if ($columnIndex % 2 !== 0 || $columnIndex === 0) {
          return { backgroundColor: 'var(--zebra-color)' }
        }
      }
    },
    initEditRules(editRules) { // 添加校验
      const { mapSource } = this.tableRenderMap
      let editRulesMap = {}
      Object.keys(editRules).forEach((item, index) => {
        if (mapSource[item]) {
          editRulesMap[mapSource[item].mapid] = editRules[item]
          if (editRules[item] && editRules[item][0].required) {
            mapSource[item].required = true
          } else {
            mapSource[item].required = false
          }
        }
      })
      this.editRulesMap = editRulesMap
      let self = this
      this.renderEditRules = {
        renderValue: [{
          validator(obj) {
            return new Promise((resolve, reject) => {
              self.validator(obj).then(res => {
                resolve(true)
              }).catch(e => {
                reject(e)
              })
            })
          }
        }]
      }
    },
    newRule(rule) { // 错误规则信息
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
    validCellRules({ row, cellValue, rowIndex, column, columnIndex }) { // 校验单元格
      let self = this
      const { map } = this.tableRenderMap
      const errorRules = []
      const syncVailds = []
      const rules = this.editRulesMap[row.mapid]
      if (rules) {
        rules.forEach(rule => {
          if (typeof rule.validator === 'function') {
            let customValid
            customValid = rule.validator({
              cellValue,
              rule,
              rules,
              row,
              rowIndex,
              column,
              columnIndex,
              itemMap: map[row.mapid]
            })
            if (customValid) {
              if (self.getbasicDataType(customValid) === 'Error') {
                self.validRuleErr = true
                errorRules.push(self.newRule({ type: 'custom', message: customValid.message, rule: self.newRule(rule) }))
              } else if (customValid.catch) {
                // 如果为异步校验（注：异步校验是并发无序的）
                syncVailds.push(
                  customValid.catch(e => {
                    self.validRuleErr = true
                    errorRules.push(self.newRule({ type: 'custom', message: e ? e.message : rule.message, rule: self.newRule(rule) }))
                  })
                )
              }
            }
          } else {
            const isNumber = rule.type === 'number'
            const numVal = isNumber ? (isNaN(parseFloat(cellValue)) ? 0 : parseFloat(cellValue)) : String(cellValue).length
            if (rule.required && (cellValue === null || cellValue === undefined || cellValue === '')) {
              self.validRuleErr = true
              errorRules.push(self.newRule(rule))
            } else if (
              (isNumber && isNaN(cellValue)) ||
              (!isNaN(rule.min) && numVal < parseFloat(rule.min)) ||
              (!isNaN(rule.max) && numVal > parseFloat(rule.max)) ||
              (rule.pattern && !(rule.pattern.test ? rule.pattern : new RegExp(rule.pattern)).test(cellValue))
            ) {
              self.validRuleErr = true
              errorRules.push(self.newRule(rule))
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
    },
    validator(obj) { // 校验器
      let self = this
      return new Promise((resolve, reject) => {
        return self.validCellRules(obj).then(() => {
          resolve(true)
        }).catch((error) => {
          reject(new Error(typeof error.rule.message === 'function' ? error.rule.message(error.rule) : error.rule.message))
        })
      })
    },
    validateRow(row) { // 校验一条或多条数据
      let self = this
      return new Promise((resolve, reject) => {
        self.$refs.basicInfoTable.tableOptionFn().validate(row).then(res => {
          resolve(res)
        }).catch(e => {
          reject(e)
        })
      })
    },
    validateAll() { // 校验全表
      let self = this
      return new Promise((resolve, reject) => {
        self.$refs.basicInfoTable.tableOptionFn().fullValidate(self.$refs.basicInfoTable.getTableData().fullData).then(res => {
          resolve(res)
        }).catch(e => {
          reject(e)
        })
      })
    },
    getData() { // 获取表格数据
      const { map } = this.tableRenderMap
      let { fullData } = this.$refs.basicInfoTable.getPureTableData()
      let resultData = {}
      fullData.forEach((item, index) => {
        if (map[item.mapid].needmap) {
          Object.assign(resultData, {
            [item.renderField]: item.renderValue
          })
        }
        if (map[item.mapid].isTree) {
          let { isHump } = (map[item.mapid].render && map[item.mapid].render.props && map[item.mapid].render.props.config) || { isHump: false }
          let fieldkeys = isHump ? ['Code', 'Name', 'Id'] : (item.renderField.endsWith('_') ? ['code', 'name', 'id'] : ['_code', '_name', '_id'])
          Object.assign(resultData, {
            [map[item.mapid].field + fieldkeys[0]]: item[map[item.mapid].renderField + fieldkeys[0]] || '',
            [map[item.mapid].field + fieldkeys[1]]: item[map[item.mapid].renderField + fieldkeys[1]] || '',
            [map[item.mapid].field + fieldkeys[2]]: item[map[item.mapid].renderField + fieldkeys[2]] || ''
          })
        }
      })
      return {
        viewData: resultData, // 渲染的可视数据
        data: Object.assign({}, this.data, resultData), // 全量数据，
        originalData: Object.assign({}, this.data) // 原始数据
      }
    },
    generateSingItemRenderMap(column, level, columnIndex, nestIndex, map) { // 生成单条数据映射
      let uuid = this.getUuid()
      let renderField = nestIndex.split('.').join('_')
      let render = column.cellRender || column.editRender
      let curmap = {
        mapid: uuid,
        editable: !!column.editRender,
        index: map.list.length + 1,
        nestIndex: nestIndex,
        itemConfig: column,
        render: render,
        level: level,
        formula: column.formula ? column.formula + '' : '',
        renderTitle: ''.padEnd(4 * (level - 1)) + column.title,
        title: column.title, // 标题
        renderField: 'renderValue', // 渲染数据
        isTree: render && render.name === '$vxeTree', // 是不是下拉树，
        field: column.field || renderField, // 原本字段
        needmap: !!column.field // 是否需要反响映射
      }
      map.list.push(curmap)
      map.map[uuid] = curmap
      map.mapSource[column.field || renderField] = curmap
      map.renderMap[renderField] = curmap
    },
    generateRenderMap(columns, level = 1, nestIndex = '', map = { list: [], renderMap: {}, map: {}, mapSource: {} }) { // 生成渲染项映射
      columns.forEach((column, columnIndex) => {
        if (column.visible !== false) {
          this.generateSingItemRenderMap(column, level, columnIndex, nestIndex ? (nestIndex + '.' + columnIndex) : (columnIndex + ''), map)
        }
        if (Array.isArray(column.children) && column.children.length) {
          this.generateRenderMap(column.children, level + 1, columnIndex, map)
        }
      })
      return map
    },
    initItems(columns) { // 初始化table项
      this.tableRenderMap = this.generateRenderMap(columns || this.itemsConfig)
      this.tableRenderColumnsConfig = this.renderColumnsConfig
      this.tableRenderColumnsGroups = Math.floor(this.tableRenderColumnsConfig / 2)
    },
    initData(obj) { // 初始化表格数据
      obj = obj || this.data
      const { list } = this.tableRenderMap
      this.tableRenderData = list.map((item, index) => {
        let resultData = {
          index: item.index, // 行索引
          nestIndex: item.nestIndex, // 嵌套关系
          renderTitle: item.required ? item.renderTitle + '<span class="required">*</span>' : item.renderTitle, // 渲染标题
          editable: item.editable, // 是否可编辑
          mapid: item.mapid, // 反向映射唯一id
          required: item.required,
          renderField: item.field, // 渲染字段
          renderValue: obj[item.field] // 渲染值
        }
        if (item.isTree) {
          let { isHump } = (item.render && item.render.props && item.render.props.config) || { isHump: false }
          let fieldkeys = isHump ? ['Code', 'Name', 'Id'] : (item.renderField.endsWith('_') ? ['code', 'name', 'id'] : ['_code', '_name', '_id'])
          Object.assign(resultData, {
            [item.renderField + fieldkeys[0]]: obj[item.field + fieldkeys[0]],
            [item.renderField + fieldkeys[1]]: obj[item.field + fieldkeys[1]],
            [item.renderField + fieldkeys[2]]: obj[item.field + fieldkeys[2]]
          })
        }
        return resultData
      })
    },
    initFormula() { // 初始化公式 转化成渲染格式
      let self = this
      const { list, mapSource } = this.tableRenderMap
      let resultData = {}
      list.forEach((item, index) => {
        if (item.formula) {
          resultData[item.mapid + ':' + item.renderField] = self.transColFormulaToCellFomula(item.formula, item, mapSource)
          item.renderFormule = resultData[item.renderField + ':' + item.mapid]
        }
      })
      this.calculateConstraintConfigIn = Object.assign(
        this.calculateConstraintConfigIn,
        {
          rowCodeCalcItemCodeField: 'mapid', // 配置了rowCodeFormulaConfig时使用的itemcode字段名
          rowCodeFormulaConfig: resultData // { "colField:itemcode":"{tableId:colField:itemcode}[运算符]" }
        })
      return resultData
    },
    transColFormulaToCellFomula(formula, map, mapSource) { // 转化单条数据映射
      let regR = new RegExp('({[a-zA-Z0-9_]*})', 'ig')
      let rowsKey = formula.match(regR) === null ? [] : formula.match(regR)
      if (rowsKey.length) {
        for (let keyCF in rowsKey) {
          let keyC = rowsKey[keyCF].replace(/\{|\}/g, '')
          let reg = new RegExp('({' + keyC + '})', 'ig')
          if (mapSource[keyC]) {
            formula = formula.replace(reg, '{' + this.id + ':' + map.renderField + ':' + mapSource[keyC].mapid + '}')
          } else {
            if (this.data[keyC]) {
              formula = formula.replace(reg, isNaN(parseFloat(this.data[keyC])) ? 0 : parseFloat(this.data[keyC]))
            } else {
              formula = formula.replace(reg, '{' + this.id + ':' + keyC + ':' + null + '}')
            }
          }
        }
      }
      return formula
    },
    init() { // 初始化
      this.initItems()
      this.initFormula()
      this.initEditRules(this.editRules)
      this.initData(this.data)
    }
  },
  crated() {},
  mounted() {
    this.init()
  },
  watch: {
    toolbarConfig: {
      handler() {
      },
      deep: true,
      immediate: true
    },
    itemsConfig: {
      handler() {
        this.initItems()
        this.initFormula()
      },
      deep: true,
      immediate: true
    },
    defaultMoneyUnit: {
      handler() {},
      immediate: true
    },
    id: {
      handler() {},
      immediate: true
    },
    mode: {
      handler() {},
      immediate: true
    },
    editConfig: {
      handler() {},
      deep: true,
      immediate: true
    },
    renderColumnsConfig: {
      handler() {},
      immediate: true
    },
    editRules: {
      handler() {
        this.initEditRules(this.editRules)
        this.initData(this.data)
      },
      immediate: true
    },
    data: {
      handler() {
        this.initData(this.data)
      },
      deep: true,
      immediate: true
    }
  }
}
</script>

<style lang='scss'>
.basic-info-table{
 .vxe-grid {
   .vxe-table.border--default .vxe-table--header-wrapper,
   .vxe-table.border--full .vxe-table--header-wrapper,
   .vxe-table.border--outer .vxe-table--header-wrapper{
      background: var(--hightlight-color);
   }
   .vxe-table .vxe-body--row {
      background: #ffffff;
     &.row--stripe {
       background: var(--zebra-color);
     }
      .vxe-body--column{
        height:34px;
      }
      .required{
        color: #f00;
        font-size: 18px;
        padding: 0 0 0 5px;
        position: relative;
        top: 3px;
      }
     .vxe-body--column * {
       border: none;
       background: transparent;
       &.is--disabled {
         background: #f7fafd;
       }
     }
    }
  }
 }
.basic-info-table.detail{
  .vxe-grid .vxe-table .vxe-body--row {
    .required{
     display:none;
    }
  }
}
.vxe-select-option{
   max-width: unset;
}
</style>
