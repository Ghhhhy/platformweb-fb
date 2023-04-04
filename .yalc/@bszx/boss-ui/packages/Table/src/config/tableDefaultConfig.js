/* eslint-disable no-new-wrappers */
/* eslint-disable no-eval */
// tableDefaultConfig   Author:Titans@2396757591@qq.com
/* eslint-disable */

const defaultGlobalUtils = {
  calculateRender(h, { props, name }, { $columnIndex, $rowIndex, items, column, data, row, $seq, $table, $type, columnIndex, isEdit, level, rowIndex, seq }, context) {
    props = props || {}
    let val = isNaN(parseFloat(row[column.property])) ? '' : parseFloat(row[column.property])
    if (val !== '') {
      row[column.property] = val.toFixed(2)
      if (context.$grid.$parent.toolbarConfigInCopy.disabledMoneyConversion) {
        val = Number((val).toFixed(2)).toLocaleString()
        val = val.split('.').length === 1 ? val + '.00' : (val.split('.')[1].length === 1 ? val + '0' : val)
        return [<span class="text" {...{ props }} >{val}</span>]
      } else {
        let moneyUnit = context.$grid.$parent.moneyUnit ? context.$grid.$parent.moneyUnit : 1
        val = Number((val / moneyUnit).toFixed(2)).toLocaleString()
        val = val.split('.').length === 1 ? val + '.00' : (val.split('.')[1].length === 1 ? val + '0' : val)
        return [<span class="text" {...{ props }} >{val}</span>]
      }
    } else {
      return [<span class="text" {...{ props }} ></span>]
    }
  },
  calculateFooter({ columns, data, $table, $grid, columnIndexText, combinedType }, context) {
    // let moneyUnit = $grid.$parent.moneyUnit ? $grid.$parent.moneyUnit : 1
    // console.log(moneyUnit)
    return columns.map((column, columnIndex) => {
      //  combinedType: ['average', 'total'],
      // let combinedType = 'total'
      if (columnIndex === 0) {
        return columnIndexText
      } else if (column.own.combinedType === 'switchTotal' || (column.own.combinedType + '').split(',').indexOf(combinedType) >= 0) {
        try {
          let result = data.map((item, index) => {
            let value = (typeof (item[column.property]) === 'number' || typeof (item[column.property]) === 'string') ? parseFloat(item[column.property].toString().split(',').join('')) : 0
            return isNaN(parseFloat(value)) ? 0 : parseFloat(value)
          })
          if (result.length) {
            result = result.reduce((prev, next) => {
              return prev + next
            })
            if (combinedType === 'average') {
              result = result / data.length
            }
            result = Number((result).toFixed(2)).toLocaleString()
            result = result.split('.').length === 1 ? result + '.00' : (result.split('.')[1].length === 1 ? result + '0' : result)
            return result
          } else {
            return '0.00'
          }
        } catch (e) {
          throw (e)
        }
      } else {
        return ''
      }
    })
  },
  calculateFooter_average({ columns, data, $table, $grid }) {
    // console.log(moneyUnit)
    return columns.map((column, columnIndex) => {
      //  combinedType: ['average', 'total'],
      // let combinedType = 'total'
      if (columnIndex === 0) {
        return '平均'
      } else if (column.own.combinedType === 'switchTotal' || (column.own.combinedType + '').split(',').indexOf('average') >= 0) {
        try {
          let result = data.map((item, index) => {
            let value = (typeof (item[column.property]) === 'number' || typeof (item[column.property]) === 'string') ? parseFloat(item[column.property].toString().split(',').join('')) : 0
            return isNaN(parseFloat(value)) ? 0 : parseFloat(value)
          })
          if (result.length) {
            result = result.reduce((prev, next) => {
              return prev + next
            })
            result = result / data.length
            return result
          } else {
            return '0.00'
          }
        } catch (e) {
          throw (e)
        }
      } else {
        return ''
      }
    })
  },
  calculateFooter_subTotal({ columns, data, $table, $grid }) {
    // console.log(moneyUnit)
    let selections = $grid.getCheckboxRecords()
    return columns.map((column, columnIndex) => {
      if (columnIndex === 0) {
        return '已选(' + $grid.getCheckboxRecords().length + ')'
      } else if (column.own.combinedType === 'switchTotal' || (column.own.combinedType + '').split(',').indexOf('subTotal') >= 0) {
        try {
          if (column.own.combinedType.includes('treeTotal')) {
            // 用于过滤树状结构数据父级金额的合计
            for (let i = 0; i < selections.length; i++) {
              if (selections[i].children && selections[i].children.length !== 0) {
                selections.splice(i, 1)
              }
            }
          }
          let result = selections.map((item, index) => {
            let value = (typeof (item[column.property]) === 'number' || typeof (item[column.property]) === 'string') ? parseFloat(item[column.property].toString().split(',').join('')) : 0
            return isNaN(parseFloat(value)) ? 0 : parseFloat(value)
          })
          if (result.length) {
            result = result.reduce((prev, next) => {
              return prev + next
            })
            return result
          } else {
            return '0.00'
          }
        } catch (e) {
          throw (e)
        }
      } else {
        return ''
      }
    })
  },
  calculateFooter_total({ columns, data, $table, $grid }) {
    return columns.map((column, columnIndex) => {
      if (columnIndex === 0) {
        return '合计'
      }  else if (column?.own?.combinedType?.includes('levelTotal')) {
        const nodeSeek = (tree, fn, result = []) => {
          tree.forEach(item => {
            fn(item) && result.push(item)
            item.children && nodeSeek(item.children, fn, result)
          })
          return result
        }
        let result = nodeSeek(data, node => +node.level_no === 99 || +node.levelNo === 99)
        let sum = 0
        for (let i of result) {
          sum += Number(i[column.property])
        }
        result = sum
        return result
      } else if (column.own.combinedType === 'switchTotal' || (column.own.combinedType + '').split(',').indexOf('total') >= 0) {
        try {
          // 使用bsTreeTable组件 底部有合计行时，bsTreeTotal必须为true
          let firstData = column.own.bsTreeTotal ? data.filter(it => +it.level === 0) : data
          let result = firstData.map((item, index) => {
            let value = (typeof (item[column.property]) === 'number' || typeof (item[column.property]) === 'string') ? parseFloat(item[column.property].toString().split(',').join('')) : 0
            return isNaN(parseFloat(value)) ? 0 : parseFloat(value)
          })
          if (result.length) {
            result = result.reduce((prev, next) => {
              // return prev + next
              return utilMethods.amendVal(prev, next, '+')
            })
            return result
          } else {
            return '0.00'
          }
        } catch (e) {
          throw (e)
        }
      } else {
        return ''
      }
    })
  },
  calculateFooter_totalAll({ columns, data, $table, $grid }) {
    // console.log(moneyUnit)
    let item = $grid.$parent.footerConfigIn.totalObj instanceof Object ? $grid.$parent.footerConfigIn.totalObj : null
    let pager = false
    if ($grid.$parent.pagerConfigIn) {
      pager = $grid.$parent.pagerConfigIn.total / $grid.$parent.pagerConfigIn.pageSize > 1
    }
    if (!item || !pager) {
      return defaultGlobalUtils.calculateFooter_total({ columns, data, $table, $grid })
    } else {
      return columns.map((column, columnIndex) => {
        if (columnIndex === 0) {
          return '总计'
        } else if (column.own.combinedType === 'switchTotal' || (column.own.combinedType + '').split(',').indexOf('total') >= 0) {
          try {
            let result = (typeof (item[column.property]) === 'number' || typeof (item[column.property]) === 'string') ? parseFloat(item[column.property].toString().split(',').join('')) : 0
            return result
          } catch (e) {
            throw (e)
          }
        } else {
          return ''
        }
      })
    }
  }
}
export const tableColumnsDefaultConfig = { // 默认配置列
  rowDrop: {
    width: 40,
    title: '按住后可以上下拖动排序！',
    className: 'table-drop',
    slots: {
      default: (obj, h) => {
        return [
          <span class="drag-btn">
            <i class="vxe-icon--menu"></i>
          </span>
        ]
      },
      header: ({ $table }, h) => {
        let bsTable = $table.$parent.$parent
        return [
          // <vxe-tooltip v-model={bsTable.showRowDropHelpTip} content="按住后可以上下拖动排序！" enterable>
          <i class="vxe-icon--question" onClick={() => { bsTable.showRowDropHelpTip = !bsTable.showRowDropHelpTip }}></i>
          // </vxe-tooltip>
        ]
      }
    }
  },
  seq: { // 序号
    title: '序号',
    type: 'seq',
    width: 54,
    align: 'center',
    className: 'table-sep',
    fixed: 'left',
    sortable: false
  },
  checkbox: { // 选择
    title: '',
    type: 'checkbox',
    width: 45,
    align: 'center',
    fixed: 'left',
    sortable: false,
    className: 'table-row-checkbox'
  },
  optionSort: { // 选择
    title: '手动排序',
    type: 'dragSort',
    field: 'dragSort',
    width: 150,
    align: 'center',
    fixed: 'right',
    sortable: false,
    cellRender: {
      name: '$vxeTableOptionSort'
    }
  },
  radio: { // 单选
    title: '单选',
    type: 'radio',
    width: 80,
    align: 'center',
    fixed: 'left',
    sortable: false,
    className: 'table-row-radio'
  },
  optionRow: { // 操作
    title: '操作',
    field: 'optionRow',
    type: 'optionRow',
    editable: false,
    width: 150,
    align: 'center',
    fixed: 'right',
    sortable: false,
    className: 'table-row-option',
    cellRender: {
      type: 'cellRender', // renderEdit
      name: '$vxeTableOptionRow'
    }
  },
  treeNode: {
    title: '展开树',
    type: 'treeNode',
    treeNode: true,
    width: 120,
    field: 'itemCode'
  }
}
export const pagerConfig = {
  align: 'right',
  // pageSizes: [20, 50, 100, 500, 1000, 1000000],f
  pageSizes: [
    {
      label: '20条',
      value: 20
    },
    {
      label: '50条',
      value: 50
    },
    {
      label: '100条',
      value: 100
    },
    {
      label: '500条',
      value: 500
    },
    {
      label: '1000条',
      value: 1000
    },
    {
      label: '全部',
      value: 1000000000
    }
  ],
  layouts: [
    'Sizes',
    'PrevJump',
    'PrevPage',
    'Number',
    'NextPage',
    'NextJump',
    'FullJump',
    'Total',
    'PageCount'
  ],
  perfect: true,
  slots: {
    left: 'pagerLeftSlots'
    // right: 'pagerRightSlots'
  }
}
export let tableFormConfig = {
  data: {
    keyWord: ''
  },
  items: [
    { field: 'keyWord', itemRender: { name: '$input', props: { placeholder: '请输入关键字过滤' } } },
    { itemRender: { name: '$buttons', children: [{ props: { type: 'submit', content: '查询', status: 'primary' } }, { props: { type: 'reset', content: '重置' } }] } }
  ]
}
export const tableStyleConfig = {
  height: 'auto', // 表格的高度； 支持铺满父容器或者固定高度， 如果设置 auto 为铺满父容器（ 如果设置自适应时， 必须确保存在父节点且不允许存在相邻元素）number | string:auto, % , px
  maxHeight: '100%', // 表格的最大高度number | string: %, px
  border: false, // 是否带有边框 boolean | string:default（ 默认）, full（ 完整边框）, outer（ 外边框）, inner（ 内边框）, none（ 无边框）,默认 false， 继承 setup.table.border
  highlightCurrentRow: false, // 是否要高亮当前行: boolean, false
  highlightHoverRow: true // 鼠标移到行是否要高亮显示:boolean,false
  // highlightCurrentColumn:是否要高亮当前列:booleanfalse
}
export const defaultFormatters = {
  formatMoney({ cellValue, row, column }) {
    // 数字逗号三位分开
    if (!cellValue) {
      return ''
    } else {
      let num = isNaN(parseFloat(cellValue)) ? 0 : parseFloat(cellValue)
      num = (num / this.moneyUnit).toFixed(2)
      if (typeof num === 'string') {
        return Number(parseFloat(num).toFixed(2)).toLocaleString()
      } else if (typeof num === 'number') {
        return Number(num.toFixed(2)).toLocaleString()
      }
    }
  },
  digitUppercase({ cellValue, row, column }) {
    let n = cellValue
    /* 现金额大写 */
    if (typeof n === 'number') {
      n = '' + n
    }
    n = n.replace(/,/g, '') // 替换tomoney()中的“,”
    n = n.replace(/ /g, '') // 替换tomoney()中的空格
    n = n.replace(/￥/g, '') // 替换掉可能出现的￥字符
    // if (isNaN(n)) { //验证输入的字符是否为数字
    //     //alert("请检查小写金额是否正确");
    //     return "";
    // };
    let fraction = ['角', '分']
    let digit = [
      '零', '壹', '贰', '叁', '肆',
      '伍', '陆', '柒', '捌', '玖'
    ]
    let unit = [
      ['元', '万', '亿', '万', '亿'],
      ['', '拾', '佰', '仟']
    ]
    let head = n < 0 ? '负' : ''
    n = Math.abs(n)
    let s = ''
    for (let i = 0; i < fraction.length; i++) {
      s += (digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '')
    }
    s = s || '整'
    n = Math.floor(n)
    for (let i = 0; i < unit[0].length && n > 0; i++) {
      let p = ''
      for (let j = 0; j < unit[1].length && n > 0; j++) {
        p = digit[n % 10] + unit[1][j] + p
        n = Math.floor(n / 10)
      }
      s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s
    }
    return head + s.replace(/(零.)*零元/, '元')
      .replace(/(零.)+/g, '零')
      .replace(/^整$/, '零元整')
  },
  formatAmount: ({ cellValue }, digits) => {
    return this.$XEUtils.commafy(cellValue, { digits: digits || 2 })
  }
}
export const footerConfig = {
  showFooter: true,
  totalObj: null, // 总计数据对象
  combinedType: ['subTotal', 'total', 'totalAll', 'switchTotal'], // 显示那些合计行类型，注意顺序
  footerMethod({ columns, data, $table, $grid }) {
    let bsTable = $grid.$parent
    let moneyUnit = $grid.$parent.moneyUnit ? $grid.$parent.moneyUnit : 1
    let combinedType = $grid.$parent.footerConfigIn.combinedType || ['switchTotal']
    let footerData = []

    if (combinedType.indexOf('switchCurPageTotal') >= 0) {
      if ($grid.getCheckboxRecords().length) {
        footerData = [defaultGlobalUtils['calculateFooter_subTotal']({ columns, data, $table, $grid })]
      } else {
        footerData = [defaultGlobalUtils['calculateFooter_total']({ columns, data, $table, $grid })]
      }
    } else if (combinedType.indexOf('switchTotal') >= 0) {
      if ($grid.getCheckboxRecords().length) {
        footerData = [defaultGlobalUtils['calculateFooter_subTotal']({ columns, data, $table, $grid })]
      } else if (bsTable.pagerConfigIn) {
        footerData = [defaultGlobalUtils['calculateFooter_totalAll']({ columns, data, $table, $grid })]
      } else {
        footerData = [defaultGlobalUtils['calculateFooter_total']({ columns, data, $table, $grid })]
      }
    } else {
      footerData = combinedType.map(item => {
        return defaultGlobalUtils['calculateFooter_' + item]({ columns, data, $table, $grid })
      })
    }
    $grid.$parent.viewFooterData = footerData
    // footerData.splice(1, 2)
    // const footerData = [
    //   // defaultGlobalUtils.calculateFooter({ columns, data, columnIndexText: '平均(元)', combinedType: 'average' }, context),
    //   defaultGlobalUtils.calculateFooter({ columns, data, $table, $grid, columnIndexText: '合计(元)', combinedType: 'total' })
    // ]
    return footerData.map((row) => {
      return row.map((item, index) => {
        if ((columns[index].own.combinedType + '').split(',').filter((item) => { return !!(item + '').replace(/null|undefined|true|false/ig, '') }).length) {
          let result = 0
          if (columns[index].own.combinedDigits) {
            result = $grid.$parent.transToNumberLocalString(item, columns[index].own.combinedDigits)
          } else if ((columns[index].own.combinedType + '').indexOf('integer') >= 0) {
            result = parseInt(item)
          } else if ((columns[index].own.combinedType + '').indexOf('float') >= 0) {
            result = parseFloat(item).toFixed(2)
          } else if (columns[index].own.combinedType.includes('levelTotal')) {
            if (item) {
              let render = columns[index].own.editRender || columns[index].own.cellRender
              result = Number((item / moneyUnit).toFixed(2)).toLocaleString()
              result = result.split('.').length === 1 ? result + '.00' : (result.split('.')[1].length === 1 ? result + '0' : result)
              if (render && render.name === '$vxeInput') {
                result = parseInt(item)
              }
            } else {
              result = ''
            }
          } else {
            let digits = (columns[index].params && columns[index].params.digits) || 2
            if (columns[index].params && columns[index].params.digits) {
              digits = columns[index].params.digits
              if (columns[index].params.moneyUnit) {
                result = $grid.$parent.transToNumber(item, digits)
              } else {
                result = $grid.$parent.transToNumber((item / moneyUnit), digits)
              }
            } else {
              result = Number((item / moneyUnit).toFixed(digits)).toLocaleString()
            }
            let render = columns[index].own.editRender || columns[index].own.cellRender
            // result = Number((item / moneyUnit).toFixed(2)).toLocaleString()
            result = result.split('.').length === 1 ? result + '.00' : (result.split('.')[1].length === 1 ? result + '0' : result)
            if (render && render.name === '$vxeInput') {
              result = parseInt(item)
            }
            // 整数型合计
            if (render?.props?.type === 'integer') {
              result = parseInt(Number((item / moneyUnit)))
            }
          }
          return result
        } else {
          return item
        }
      })
    })
  },
  footerSpanMethod({ $rowIndex, column, columnIndex, $columnIndex, _columnIndex, _rowIndex, data }) {
    if (_columnIndex === 0) {
      return {
        rowspan: 1,
        colspan: 2
      }
    } else if (_columnIndex === 1) {
      return {
        rowspan: 0,
        colspan: 0
      }
    } else {
      return {
        rowspan: 1,
        colspan: 1
      }
    }
  }
}

export const bodyTopRowsConfig = {
  enabled: true, // 是否开启首行自定义 默认false
  rowClassName: '', // 行class
  totalObj: null, // 总计数据对象
  combinedType: ['subTotal', 'total', 'totalAll', 'switchTotal', "switchCurPageTotal"], // 显示那些合计行类型，注意顺序
  dataMethod({ columns, data, $table, $grid }) {
    debugger
    let bsTable = $grid.$parent
    let moneyUnit = bsTable.moneyUnit ? bsTable.moneyUnit : 1
    let combinedType = bsTable.bodyTopRowsConfigIn.combinedType || ['switchTotal']
    
    let footerData = []
    if (combinedType.indexOf('switchCurPageTotal') >= 0) {
      if ($grid.getCheckboxRecords().length) {
        footerData = [defaultGlobalUtils['calculateFooter_subTotal']({ columns, data, $table, $grid }, bsTable.bodyTopRowsConfigIn)]
      } else {
        footerData = [defaultGlobalUtils['calculateFooter_total']({ columns, data, $table, $grid }, bsTable.bodyTopRowsConfigIn)]
      }
    } else if (combinedType.indexOf('switchTotal') >= 0) {
      if ($grid.getCheckboxRecords().length) {
        footerData = [defaultGlobalUtils['calculateFooter_subTotal']({ columns, data, $table, $grid }, bsTable.bodyTopRowsConfigIn)]
      } else if (bsTable.pagerConfigIn) {
        footerData = [defaultGlobalUtils['calculateFooter_totalAll']({ columns, data, $table, $grid }, bsTable.bodyTopRowsConfigIn)]
      } else {
        footerData = [defaultGlobalUtils['calculateFooter_total']({ columns, data, $table, $grid }, bsTable.bodyTopRowsConfigIn)]
      }
    } else {
      footerData = combinedType.map(item => {
        return defaultGlobalUtils['calculateFooter_' + item]({ columns, data, $table, $grid }, bsTable.bodyTopRowsConfigIn)
      })
    }
    $grid.$parent.viewTopData = footerData
    
    return footerData.map((row) => {
      return row.map((item, index) => {
        if ((columns[index].own.combinedType + '').split(',').filter((item) => { return !!(item + '').replace(/null|undefined|true|false/ig, '') }).length) {
          let result = 0
          if (columns[index].own.combinedDigits) {
            result = $grid.$parent.transToNumberLocalString(item, columns[index].own.combinedDigits)
          } else if ((columns[index].own.combinedType + '').indexOf('integer') >= 0) {
            result = parseInt(item)
          } else if ((columns[index].own.combinedType + '').indexOf('float') >= 0) {
            result = parseFloat(item).toFixed(2)
          } else if (columns[index].own.combinedType.includes('levelTotal')) {
            if (item) {
              let render = columns[index].own.editRender || columns[index].own.cellRender
              result = Number((item / moneyUnit).toFixed(2)).toLocaleString()
              result = result.split('.').length === 1 ? result + '.00' : (result.split('.')[1].length === 1 ? result + '0' : result)
              if (render && render.name === '$vxeInput') {
                result = parseInt(item)
              }
            } else {
              result = ''
            }
          } else {
            let digits = (columns[index].params && columns[index].params.digits) || 2
            if (columns[index].params && columns[index].params.digits) {
              digits = columns[index].params.digits
              if (columns[index].params.moneyUnit) {
                result = $grid.$parent.transToNumber(item, digits)
              } else {
                result = $grid.$parent.transToNumber((item / moneyUnit), digits)
              }
            } else {
              result = Number((item / moneyUnit).toFixed(digits)).toLocaleString()
            }
            let render = columns[index].own.editRender || columns[index].own.cellRender
            // result = Number((item / moneyUnit).toFixed(2)).toLocaleString()
            result = result.split('.').length === 1 ? result + '.00' : (result.split('.')[1].length === 1 ? result + '0' : result)
            if (render && render.name === '$vxeInput') {
              result = parseInt(item)
            }
            // 整数型合计
            if (render?.props?.type === 'integer') {
              result = parseInt(Number((item / moneyUnit)))
            }
          }
          return result
        } else {
          return item
        }
      })
    })
  },
  spanMethod({ $rowIndex, column, columnIndex, $columnIndex, _columnIndex, _rowIndex, data }) {
    if (_columnIndex === 0) {
      return {
        rowspan: 1,
        colspan: 2
      }
    } else if (_columnIndex === 1) {
      return {
        rowspan: 0,
        colspan: 0
      }
    } else {
      return {
        rowspan: 1,
        colspan: 1
      }
    }
  }
}

export const utilMethods = {
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
  }
}

export const contextMenuConfig = {
  header: {
    options: [
      [{
        code: 'hide',
        name: '隐藏列',
        children: [
          { code: 'hideColumn', name: '隐藏当前列', disabled: false },
          { code: 'showAllColumn', name: '取消所有隐藏列', disabled: false }
        ]
      },
      {
        code: 'fixed',
        name: '固定列',
        children: [
          { code: 'FIXED_LEFT_COLUMN', name: '将列固定到左侧', disabled: false },
          { code: 'FIXED_RIGHT_COLUMN', name: '将列固定到右侧', disabled: false },
          { code: 'CLEAR_FIXED_COLUMN', name: '清除固定列', disabled: false }
        ]
      },
      {
        code: 'reset',
        name: '重置列',
        children: [
          { code: 'RESET_RESIZABLE', name: '重置列宽状态', disabled: false },
          // { code: 'RESET_ALL', name: '重置列的所有状态', disabled: false },
          { code: 'recover_all', name: '恢复列为初始状态', disabled: false }
        ]
      },
      {
        code: 'FILTER',
        name: '筛选',
        children: [
          {
            code: 'CLEAR_FILTER',
            name: '清除选中列的筛选条件'
          },
          {
            code: 'CLEAR_ALL_FILTER',
            name: '清除所有列筛选条件'
          }
          // {
          //   code: 'FILTER_CELl',
          //   name: '根据单元格值筛选'
          // }
        ]
      },
      {
        code: 'sort',
        name: '排序',
        children: [
          {
            code: 'clearSort',
            name: '清除排序'
          },
          {
            code: 'sortAsc',
            name: '升序'
          },
          {
            code: 'sortDesc',
            name: '倒序'
          }]
        },
        {
          code: 'clear',
          name: '清空列',
          children: [
            { code: 'clear_column', name: '清空当前列', disabled: false },
            { code: 'revert_column', name: '恢复数据', disabled: false }
          ]
        }
      ]
    ]
  },
  body: {
    options: process.env.NODE_ENV === 'development' ? [
      [
        {
          code: 'FILTER',
          name: '行操作',
          children: [
            {
              code: 'remove',
              name: '移除当前行',
              disabled: false
            },
            {
              code: 'DELETE_SELECTED_ROW',
              name: '移除选中行',
              disabled: false
            },
            {
              code: 'CLEAR_ROW',
              name: '清除当前行数据的值'
            },
            {
              code: 'REVERT_ROW',
              name: '还原当前行数据的值'
            },
            {
              code: 'CLEAR_SELECTED_ROW',
              name: '清除选中行数据的值'
            },
            {
              code: 'REVERT_SELECTED_ROW',
              name: '还原选中行数据的值'
            },
            {
              code: 'CLEAR_ALL',
              name: '清除所有数据的值'
            },
            {
              code: 'REVERT_ALL',
              name: '还原所有数据的值'
            }
          ]
        }],
      [
        {
          code: 'clear',
          name: '清除当前单元格内容',
          visible: true,
          disabled: false
        },
        {
          code: 'insertAt',
          name: '新增一条数据',
          disabled: false
        },
        {
          code: 'INSERT_AT_ACTIVED_ROW',
          name: '插入数据到当前行',
          disabled: false
        },
        {
          code: 'verify',
          name: '校验并定位到第一个错误',
          disabled: false
        },
        {
          code: 'revert',
          name: '撤消所有操作',
          disabled: false
        },

        {
          code: 'zoom',
          name: ' 切换表格最大化/还原',
          disabled: false
        },
        {
          code: 'exportDataXlsx',
          name: '导出为Excel',
          disabled: false
        },
        {
          code: 'logCurrentData',
          name: 'log当前数据',
          disabled: false
        }
        // { code: 'copy', name: '复制', prefixIcon: 'fa fa-copy', disabled: false },
        // { code: 'paste', name: '粘贴', prefixIcon: 'fa fa-paste', disabled: false }
        // { code: 'reload', name: '刷新', disabled: false },
        // { code: 'save', name: '保存', prefixIcon: 'fa fa-save', disabled: false }
      ]

    ] : []
  },
  visibleMethod({ options, column }) {
    // let isDisabled = !column
    // options.forEach(list => {
    //   list.forEach(item => {
    //     item.disabled = isDisabled
    //   })
    // })
    return true
  }
}
export const filterTypeMap = {
  // number类型排序
  $vxeMoney: {
    filters: [{ data: { type: 'has', isCase: false, value: '', dataType: 'float', valuegt: '' } }],
    filterRender: { name: 'FilterComplex' }
  },
  $vxeCalculate: {
    filters: [{ data: { type: 'has', isCase: false, value: '', dataType: 'float', valuegt: '' } }],
    filterRender: { name: 'FilterComplex' }
  },
  $vxeDays: {
    filters: [{ data: { type: 'has', isCase: false, value: '', dataType: 'float', valuegt: '' } }],
    filterRender: { name: 'FilterComplex' }
  },
  // 字符类型排序
  $vxeTree: {
    filters: [{ data: { vals: [], sVal: '' } }],
    filterRender: { name: 'FilterContent' }
  },
  $vxeTime: {
    filters: [{ data: { type: 'has', isCase: false, value: '' } }],
    filterRender: { name: 'FilterComplex' }
  },
  $vxeProgress: {
    filters: [{ data: { type: 'has', isCase: false, value: '', dataType: 'float', valuegt: '' } }],
    filterRender: { name: 'FilterComplex' }
  },
  $vxeInput: {
    $vxeInputtext: {
      filters: [{ data: { vals: [], sVal: '' } }],
      filterRender: { name: 'FilterContent' }
    },
    $vxeInputinteger: {
      filters: [{ data: { type: 'has', isCase: false, value: '', dataType: 'integer' } }],
      filterRender: { name: 'FilterComplex' }
    },
    $vxeInputfloat: {
      filters: [{ data: { type: 'has', isCase: false, value: '', dataType: 'float', valuegt: '' } }],
      filterRender: { name: 'FilterComplex' }
    },
    $vxeInputnumber: {
      filters: [{ data: { type: 'has', isCase: false, value: '', dataType: 'number' } }],
      filterRender: { name: 'FilterComplex' }
    },
    $vxeInputyear: {
      filters: [{ data: { type: 'has', isCase: false, value: '', dataType: 'year' } }],
      filterRender: { name: 'FilterComplex' }
    },
    $vxeInputdate: {
      filters: [{ data: { type: 'has', isCase: false, value: '', dataType: 'date' } }],
      filterRender: { name: 'FilterComplex' }
    },
    $vxeInputglobal: {
      filters: [{ data: '' }],
      filterRender: { name: 'FilterInput' }
    }
  },
  $vxeEditD_ownTextarea: {
    filters: [{ data: { vals: [], sVal: '' } }],
    filterRender: { name: 'FilterContent' }
  },
  $vxeCheckbox: {
    filters: [{ data: { vals: [], sVal: '' } }],
    filterMultiple: true,
    filterRender: { name: 'FilterSelect' }
  },
  $vxeSelect: {
    filters: [{ data: { vals: [], sVal: '' } }],
    filterMultiple: true,
    filterRender: { name: 'FilterSelect' }
  },
  $vxeRadio: {
    filters: [{ data: '' }],
    filterRender: { name: 'FilterComplex' }
  },
  $$vxeEditD_ownJson: {
    filters: [{ data: '' }],
    filterRender: { name: 'FilterInput' }
  },
  $vxeEditD_ownConditions: {
    filters: [{ data: '' }],
    filterRender: { name: 'FilterInput' }
  },
  $vxeIntervar: {
    filters: [{ data: '' }],
    filterRender: { name: 'FilterInput' }
  }
}