/* eslint-disable no-eval */
// 全局渲染器   Author:Titans@2396757591@qq.com
// cellRender渲染器名字配置
// autofocus 自动聚焦的类名
// renderHeader(h, renderOpts, params) 表头
// renderEdit(h, renderOpts, params) 表内容 - 编辑
// renderCell(h, renderOpts, params) 表内容 - 显示
// renderFooter(h, renderOpts, params) 表尾
// editCellExportMethod(params) 单元格导出函数
// footerCellExportMethod(params) 表尾单元格导出函数
import { filterTypeMap } from './tableDefaultConfig'
import FilterNumberRange from '@/components/renderers/tableFilters/FilterNumberRange'
// let itemConfig = {
//   orderIndex: '', // 嵌套数据结构
//   orderPIndex: '', // 嵌套数据结构
//   title: '', // 项中文名
//   field: '', // 数据库字段
//   align: 'center', // 对齐方式 可选值：'left'||'right'||'center',
//   editable: 0, // 是否可编辑 可选值：0||1,
//   renderName: '$vxeInput', // 项类型 全局提供表格和form配套渲染器共 14组，分别为：新全局下拉树:$vxeTree，文本数字输入:$vxeInput，下拉选择:$vxeSelect，计算渲染器:$vxeCalculate，金额输入:$vxeMoney，下拉文本框:$vxeEditDownTextarea，天数:$vxeDays，时间日期:$vxeTime，单选:$vxeRadio，多选:$vxeCheckbox，间隔时间或数值选择输入渲染器:$vxeIntervar，开关:$vxeSwitch，进度条:vxeProgress。其中，条件渲染器，进度条（评测和developing
//   type: 'text', // text, search, number, integer, float, password, date, time, datetime, week, month, year,money,days,time
//   formula: '', // 项公式
//   options: '', // 下拉数据源 009#博士后+001#小学+002#初中+003#高中+004#中专+005#大专+006#本科+007#硕士+008#博士
//   defaultValue: '', // 默认值，
//   placeholder: '', // 编辑提示
//   clearable: 1, // 可清除的
//   visible: 1, // 是否可见,可选值：0||1,
//   disabled: 0, // 是否禁用,可选值：0||1,

//   min: 0, // 只对 type=number | integer | float 有效，最小值
//   max: 10000000000000, // 只对 type = number | integer | float 有效，最大值
//   digits: 2, // 只对 type=float 有效，小数位数
//   multiple: 0, // 是否多选，只对3组多选渲染器有效
//   className: '', // 项附加Class
//   format: '', // 格式化 对部分支持格式化的渲染器可用

//   // 表格特有
//   combinedType: 'subTotal,totalAll', // 是否施加合计以及合计类型，表格特有，可选值：average,subTotal,total,totalAll
//   fixed: '', // 列固定方式,表格特有 可选值：'left'||right||''
//   width: 200, // 列宽度,表格特有 integer||'auto',
//   sortable: 0, // 是否可排序，表格特有，可选值：0||1,
//   filters: 0, // 是否可筛选，表格特有，可选值：0||1,
//   resizable: 1, // 是否允许拖拽调整列宽,可选值：0||1,
//   // 表单特有
//   span: 8, // 项所占杉格宽度,表单特有 integer，可选值1-24,
//   titleWidth: 100, // 项标题所占宽度,表单特有 integer，可选值50-200,

//   validation: 0, // 是否施加校验,可选值：0||1,
//   validationMessage: '', // 校验不通过提示
//   required: 0, // 是否必填,可选值：0||1,
//   pattern: /[*]+/ig, // 校验正则,

//   // 扩展参数
//   props: '{}', // 额外配置，JSON.stringify(),
//   extensionProps: '{}', // 额外配置，JSON.stringify(),
//   params: '' // 额外私有参数 额外的参数（可以用来存放一些私有参数）any
// }
// 表格废弃原渲染同时计算改为计算后渲染，form仍然采用渲染实时计算。
const defaultGloabalUtils = {
  calculateRender(h, { props, name }, { $columnIndex, $rowIndex, items, column, data, row, $seq, $table, $type, columnIndex, isEdit, level, rowIndex, seq }, context) {
    props = props || {}
    let bsTable = context.$grid.$parent
    let showZero = bsTable.showZero
    let viewDigits = props.digits || bsTable.curSelectMoneyUnitOption.viewDigits
    let val = isNaN(parseFloat(row[column.property])) ? '' : parseFloat(row[column.property])
    if (val !== '' && val !== 0) {
      row[column.property] = bsTable.accurateFixed(val, 2)
      if (!context.$grid.$parent.toolbarConfigInCopy.moneyInputSwich) {
        val = bsTable.transToNumberLocalString(row[column.property], viewDigits)
      } else {
        let moneyUnit = context.$grid.$parent.moneyUnit ? context.$grid.$parent.moneyUnit : 1
        val = bsTable.transToNumber(bsTable.accurateChuFa(val, moneyUnit), viewDigits)
        val = bsTable.transToNumberLocalString(val, viewDigits)
      }
      row[column.property + '__viewSort'] = val
      return [<span class="text" >{bsTable.getHighlightedFilterText(val)}</span>]
    } else if (!showZero && (val === '' || val === 0)) {
      val = bsTable.transToNumberLocalString(val, viewDigits)
      row[column.property + '__viewSort'] = val
      return [<span class="text" ></span>]
    } else {
      val = bsTable.transToNumberLocalString(val, viewDigits)
      row[column.property + '__viewSort'] = val
      return [<span class="text">{bsTable.getHighlightedFilterText(val)}</span>]
    }
  },
  calculateRender_old(h, renderOpts, { $columnIndex, $rowIndex, items, column, data, row, $seq, $grid, $table, $type, columnIndex, isEdit, level, rowIndex, seq }, context) {
    function calclate(columns, row, key) {
      function rever(columns) {
        columns.some((item, index) => {
          if (item.field === key && regR.test(item.formula)) {
            formulaItem = item
            return true
          }
          if (!formulaItem && Array.isArray(item.children) && item.children.length) {
            rever(item.children)
          }
        })
      }
      let formulaItem = false
      let regR = new RegExp('({[a-zA-Z0-9_]*})', 'ig')
      rever(columns)
      if (formulaItem) {
        let formula = formulaItem.formula
        for (let keyC in row) {
          let reg = new RegExp('({' + keyC + '})', 'ig')
          if (reg.test(formula)) {
            calclate(items, row, keyC)
            let value = (typeof (row[keyC]) === 'number' || typeof (row[keyC]) === 'string') ? row[keyC] : 0
            formula = formula.replace(reg, isNaN(parseFloat(value)) ? 0 : parseFloat(value))
          }
        }
        if (regR.test(formula)) {
          formula = formula.replace(regR, 0)
          console.log(`计算时公式依赖的字段数值未定义可能导致计算有误,当前行数据为:${row},计算公式为:${formulaItem.formula}，替换值后公式为${formula}`)
        }
        row[key] = eval(formula).toFixed(2)
        // row[key] = parseFloat(row[key].split('.').length === 1 ? row[key] + '.00' : (row[key].split('.')[0].length === 1 ? row[key] + '0' : row[key]))
      }
      return row[key]
    }
    calclate(context.$grid.columns, row, column.property)
    let val = isNaN(parseFloat(row[column.property])) ? 0 : parseFloat(row[column.property])
    let showZero = context.$grid.$parent.showZero
    if (context.$grid.$parent.toolbarConfigInCopy.disabledMoneyConversion) {
      val = Number((val).toFixed(2)).toLocaleString()
      val = val.split('.').length === 1 ? val + '.00' : (val.split('.')[1].length === 1 ? val + '0' : val)
      if (!showZero) {
        return [<span class="text" >{val}</span>]
      } else {
        val = val === '0.00' ? '' : val
      }
    } else {
      let moneyUnit = context.$grid.$parent.moneyUnit ? context.$grid.$parent.moneyUnit : 1
      val = Number((val / moneyUnit).toFixed(2)).toLocaleString()
      val = val.split('.').length === 1 ? val + '.00' : (val.split('.')[1].length === 1 ? val + '0' : val)
      return [<span>{val}</span>]
    }
  },
  formCalculateRender(h, renderOpts, { data, property, $form }, context) {
    function calclate(columns, data, key) {
      function rever(columns) {
        columns.some((item, index) => {
          if (item.field === key && new RegExp('({[a-zA-Z0-9_]*})', 'ig').test(item.formula)) {
            formulaItem = item
          }
          if (!formulaItem && Array.isArray(item.children) && item.children.length) {
            rever(item.children)
          }
        })
      }
      let formulaItem = false
      rever(columns)
      if (formulaItem) {
        let formula = formulaItem.formula
        for (let keyC in data) {
          let reg = new RegExp('({' + keyC + '})', 'ig')
          if (reg.test(formula)) {
            calclate($form.items, data, keyC)
            let value = (typeof (data[keyC]) === 'number' || typeof (data[keyC]) === 'string') ? data[keyC] : 0
            formula = formula.replace(reg, isNaN(parseFloat(value)) ? 0 : parseFloat(value))
          }
        }
        // eslint-disable-next-line no-eval
        data[key] = parseFloat(eval(formula).toFixed(2))
      }
      return data[key]
    }
    calclate($form.items, data, property)
    let val = isNaN(parseFloat(data[property])) ? 0 : parseFloat(data[property])
    let moneyUnit = 1
    val = Number((val / moneyUnit).toFixed(2)).toLocaleString()
    // eslint-disable-next-line no-useless-escape
    return [<span>{val}</span>]
  },
  formatLabel(format, nodeData, valueKeys) {
    // 格式化显示label
    let regR = new RegExp('({[a-zA-Z0-9_]*})', 'ig')
    let rowsKey = (format.match(regR) || []).map((key, keyIndex) => {
      return key.replace(/{|}/gi, '')
    })
    let arr = []
    rowsKey.forEach((key, index) => {
      if (key === (valueKeys[0] || 'code' || 'code')) {
        nodeData[key] !== 'root' && nodeData[key] && arr.push(nodeData[key])
      } else {
        nodeData[key] && arr.push(nodeData[key])
      }
    })
    return arr.join('-')
  },
  debounceItemChange: (function (debounce) {
    return debounce(300)
  })(function (delay) {
    // 利用闭包保存定时器
    let timer = null
    return function (cb) {
      // 在规定时间内再次触发会先清除定时器后再重设定时器
      clearTimeout(timer)
      timer = setTimeout(function () {
        cb()
      }, delay)
    }
  }),
  format(format, obj, otheDataObj) {
    let regR = new RegExp('({[a-zA-Z0-9_]*})', 'ig')
    let rowsKey = (format.match(regR) || []).map((key, keyIndex) => {
      return key.replace(/{|}/gi, '')
    })
    rowsKey.map((key, indexkey) => {
      format = format.replace(new RegExp('{' + key + '}', 'ig'), obj[key] || (otheDataObj && otheDataObj[key]) || '')
    })
    return format
  },
  getleafChildrenList(data, result = []) {
    let self = this
    data.forEach((item, index) => {
      if (Array.isArray(item.children) && item.children.length) {
        self.getleafChildrenList(item.children, result)
      } else {
        result.push(item)
      }
    })
    return result
  },
  deepCopy(obj) {
    // 深拷贝通用方法
    let me = this
    let newObj = null
    if (typeof obj !== 'object' || obj === null) {
      newObj = obj
    } else {
      if (obj instanceof Array) {
        newObj = obj.map((item, index) => {
          return me.deepCopy(item)
        })
      } else if (obj instanceof Object) {
        newObj = {}
        for (let key in obj) {
          newObj[key] = me.deepCopy(obj[key])
        }
      } else if (obj instanceof Map) {
        newObj = new Map()
        obj.keys().forEach((mapV, mapK) => {
          newObj.set(mapK, me.deepCopy(mapV))
        })
      } else if (obj instanceof Set) {
        newObj = new Map()
        Set.forEach((setV, setI) => {
          newObj.add(me.deepCopy(setV))
        })
      } else {
      }
      // eslint-disable-next-line no-proto
      // newObj.__proto__ = obj.__proto__
    }
    return newObj
  },
  parseConditions(conditionsObj, data, otheDataObj = {}) {
    conditionsObj = conditionsObj || {}
    let result = {}
    for (let key in conditionsObj) {
      try {
        result[key] = eval(defaultGloabalUtils.format(conditionsObj[key], data, otheDataObj))
      } catch (e) {
        console.error(e)
        result[key] = ''
      }
    }
    return result
  }
}
// 全局提供表格和form配套渲染器共 15 组，分别为： 新全局下拉树，文本数字输入，下拉选择，计算渲染器，金额输入，下拉文本框，天数，时间日期，单选，多选，间隔时间或数值选择输入渲染器，开关，进度条，条件渲染器。其中，条件渲染器（评测和developing）
const defaultPublicRenders = {
  // 表格form全局渲染器
  // 3组可多选
  $vxeTree: {
    // 全局树渲染器
    renderDefault(h, { name, props }, { row, column }, context) {
      let bsTable = context.$grid.$parent
      let { multiple, format, showField, isHump, cellViewFormat } = (props && props.config) || { multiple: false, format: '{code}-{name}', showField: '', isHump: false }
      let fieldkeys = isHump ? ['Code', 'Name', 'Id'] : (column.property.endsWith('_') ? ['code', 'name', 'id'] : ['_code', '_name', '_id'])
      let multiplefieldkeys = isHump ? ['Code__multiple', 'Name__multiple', 'Id__multiple', '__viewSort'] : (column.property.endsWith('_') ? ['code__multiple', 'name__multiple', 'id__multiple', '_viewSort'] : ['_code__multiple', '_name__multiple', '_id__multiple', '__viewSort'])
      format = cellViewFormat || format || ('{' + fieldkeys[0] + '}-{' + fieldkeys[1] + '}')
      if (showField) {
        if (showField === true && format) {
          row[column.property + multiplefieldkeys[3]] = defaultGloabalUtils.format(format, row)
        } else {
          row[showField] = (row[showField] + '').replace(/null|undefined/ig, '')
          row[column.property + multiplefieldkeys[3]] = row[showField]
        }
        return [<span class="text">{row[column.property + multiplefieldkeys[3]]}</span>]
      } else {
        let regR = new RegExp('({[a-zA-Z0-9_]*})', 'ig')
        let rowsKey = format.match(regR).map((key, keyIndex) => {
          return key.replace(/{|}/gi, '')
        })
        if (!multiple) {
          row[column.property] = [row[column.property + fieldkeys[0]], row[column.property + fieldkeys[1]], row[column.property + fieldkeys[2]]].map((item, index) => {
            return (item + '').replace(/null|undefined/ig, '')
          }).join('##').replace(/####/ig, '')
          let arr = []
          rowsKey.map((key, indexkey) => {
            if (key === 'code') {
              (row[column.property + fieldkeys[0]] + '').replace(/null|undefined|root/ig, '') !== '' && arr.push(row[column.property + fieldkeys[0]])
            } else {
              key = isHump ? key.replace(/\b(\w)(\w*)/g, function ($0, $1, $2) { return $1.toUpperCase() + $2 }) : (column.property.endsWith('_') ? key : ('_' + key));
              (row[column.property + key] + '').replace(/null|undefined/ig, '') !== '' && arr.push(row[column.property + key])
            }
          })
          row[column.property + multiplefieldkeys[3]] = row[column.property] === '' ? '' : arr.join('-')
        } else {
          let idNameCodeMap = {
            idArr: (typeof (row[column.property + fieldkeys[2]]) === 'string' && (row[column.property + fieldkeys[2]]) !== '') ? row[column.property + fieldkeys[2]].split(',') : (Array.isArray(row[column.property + fieldkeys[2]]) ? row[column.property + fieldkeys[2]] : []),
            codeArr: (typeof (row[column.property + fieldkeys[0]]) === 'string' && (row[column.property + fieldkeys[0]]) !== '') ? row[column.property + fieldkeys[0]].split(',') : (Array.isArray(row[column.property + fieldkeys[0]]) ? row[column.property + fieldkeys[0]] : []),
            nameArr: (typeof (row[column.property + fieldkeys[1]]) === 'string' && (row[column.property + fieldkeys[1]]) !== '') ? row[column.property + fieldkeys[1]].split(',') : (Array.isArray(row[column.property + fieldkeys[1]]) ? row[column.property + fieldkeys[1]] : [])
          }
          row[column.property] = (idNameCodeMap.nameArr.length || idNameCodeMap.codeArr.length) ? idNameCodeMap.codeArr.map((item, index) => {
            return [idNameCodeMap.codeArr[index], idNameCodeMap.nameArr[index], idNameCodeMap.idArr[index]].map((item, index) => {
              return (item + '').replace(/null|undefined/ig, '')
            }).join('##').replace(/####/ig, '')
          }).join(',') : ''
          row[column.property + fieldkeys[2]] = row[column.property] === '' ? '' : idNameCodeMap.idArr.join(',')
          row[column.property + fieldkeys[0]] = row[column.property] === '' ? '' : idNameCodeMap.codeArr.join(',')
          row[column.property + fieldkeys[1]] = row[column.property] === '' ? '' : idNameCodeMap.nameArr.join(',')
          row[column.property + multiplefieldkeys[2]] = row[column.property] === '' ? [] : idNameCodeMap.idArr
          row[column.property + multiplefieldkeys[0]] = row[column.property] === '' ? [] : idNameCodeMap.codeArr
          row[column.property + multiplefieldkeys[1]] = row[column.property] === '' ? [] : idNameCodeMap.nameArr
          row[column.property + multiplefieldkeys[3]] = row[column.property] === '' ? '' : idNameCodeMap.codeArr.map((item, index) => {
            let arr = []
            rowsKey.map((key, indexkey) => {
              if (key === 'code') {
                idNameCodeMap[key + 'Arr'][index] !== 'root' && arr.push(idNameCodeMap[key + 'Arr'][index])
              } else {
                idNameCodeMap[key + 'Arr'][index] && arr.push(idNameCodeMap[key + 'Arr'][index])
              }
            })
            return arr.join('-')
          }).join(',')
        }
        return [<span class="text">{bsTable.getHighlightedFilterText(row[column.property + multiplefieldkeys[3]])}</span>]
      }
    },
    renderCell(h, { name, props }, { row, column }, context) {
      let bsTable = context.$grid.$parent
      let { multiple, format, showField, isHump, cellViewFormat } = (props && props.config) || { multiple: false, format: '{code}-{name}', showField: '', isHump: false }
      let fieldkeys = isHump ? ['Code', 'Name', 'Id'] : (column.property.endsWith('_') ? ['code', 'name', 'id'] : ['_code', '_name', '_id'])
      let multiplefieldkeys = isHump ? ['Code__multiple', 'Name__multiple', 'Id__multiple', '__viewSort'] : (column.property.endsWith('_') ? ['code__multiple', 'name__multiple', 'id__multiple', '_viewSort'] : ['_code__multiple', '_name__multiple', '_id__multiple', '__viewSort'])
      format = cellViewFormat || format || ('{' + fieldkeys[0] + '}-{' + fieldkeys[1] + '}')
      if (showField) {
        if (showField === true && format) {
          row[column.property + multiplefieldkeys[3]] = defaultGloabalUtils.format(format, row)
        } else {
          row[showField] = (row[showField] + '').replace(/null|undefined/ig, '')
          row[column.property + multiplefieldkeys[3]] = row[showField]
        }
        return [<span class="text">{row[column.property + multiplefieldkeys[3]]}</span>]
      } else {
        let regR = new RegExp('({[a-zA-Z0-9_]*})', 'ig')
        let rowsKey = format.match(regR).map((key, keyIndex) => {
          return key.replace(/{|}/gi, '')
        })
        if (!multiple) {
          row[column.property] = [row[column.property + fieldkeys[0]], row[column.property + fieldkeys[1]], row[column.property + fieldkeys[2]]].map((item, index) => {
            return (item + '').replace(/null|undefined/ig, '')
          }).join('##').replace(/####/ig, '')
          let arr = []
          rowsKey.map((key, indexkey) => {
            if (key === 'code') {
              (row[column.property + fieldkeys[0]] + '').replace(/null|undefined|root/ig, '') !== '' && arr.push(row[column.property + fieldkeys[0]])
            } else {
              key = isHump ? key.replace(/\b(\w)(\w*)/g, function ($0, $1, $2) { return $1.toUpperCase() + $2 }) : (column.property.endsWith('_') ? key : ('_' + key));
              (row[column.property + key] + '').replace(/null|undefined/ig, '') !== '' && arr.push(row[column.property + key])
            }
          })
          row[column.property + multiplefieldkeys[3]] = row[column.property] === '' ? '' : arr.join('-')
        } else {
          let idNameCodeMap = {
            idArr: (typeof (row[column.property + fieldkeys[2]]) === 'string' && (row[column.property + fieldkeys[2]]) !== '') ? row[column.property + fieldkeys[2]].split(',') : (Array.isArray(row[column.property + fieldkeys[2]]) ? row[column.property + fieldkeys[2]] : []),
            codeArr: (typeof (row[column.property + fieldkeys[0]]) === 'string' && (row[column.property + fieldkeys[0]]) !== '') ? row[column.property + fieldkeys[0]].split(',') : (Array.isArray(row[column.property + fieldkeys[0]]) ? row[column.property + fieldkeys[0]] : []),
            nameArr: (typeof (row[column.property + fieldkeys[1]]) === 'string' && (row[column.property + fieldkeys[1]]) !== '') ? row[column.property + fieldkeys[1]].split(',') : (Array.isArray(row[column.property + fieldkeys[1]]) ? row[column.property + fieldkeys[1]] : [])
          }
          row[column.property] = (idNameCodeMap.nameArr.length || idNameCodeMap.codeArr.length) ? idNameCodeMap.codeArr.map((item, index) => {
            return [idNameCodeMap.codeArr[index], idNameCodeMap.nameArr[index], idNameCodeMap.idArr[index]].map((item, index) => {
              return (item + '').replace(/null|undefined/ig, '')
            }).join('##').replace(/####/ig, '')
          }).join(',') : ''
          row[column.property + fieldkeys[2]] = row[column.property] === '' ? '' : idNameCodeMap.idArr.join(',')
          row[column.property + fieldkeys[0]] = row[column.property] === '' ? '' : idNameCodeMap.codeArr.join(',')
          row[column.property + fieldkeys[1]] = row[column.property] === '' ? '' : idNameCodeMap.nameArr.join(',')
          row[column.property + multiplefieldkeys[2]] = row[column.property] === '' ? [] : idNameCodeMap.idArr
          row[column.property + multiplefieldkeys[0]] = row[column.property] === '' ? [] : idNameCodeMap.codeArr
          row[column.property + multiplefieldkeys[1]] = row[column.property] === '' ? [] : idNameCodeMap.nameArr
          row[column.property + multiplefieldkeys[3]] = row[column.property] === '' ? '' : idNameCodeMap.codeArr.map((item, index) => {
            let arr = []
            rowsKey.map((key, indexkey) => {
              if (key === 'code') {
                idNameCodeMap[key + 'Arr'][index] !== 'root' && arr.push(idNameCodeMap[key + 'Arr'][index])
              } else {
                idNameCodeMap[key + 'Arr'][index] && arr.push(idNameCodeMap[key + 'Arr'][index])
              }
            })
            return arr.join('-')
          }).join(',')
        }
        return [<span class="text">{bsTable.getHighlightedFilterText(row[column.property + multiplefieldkeys[3]])}</span>]
      }
    },
    renderEdit(h, renderOpts, params, context) {
      let { props = {}, options = [] } = renderOpts
      let { row, column } = params
      let bsTable = context.$grid.$parent
      let { cellOptionCallBack } = bsTable
      let renderData = row
      let { valueKeys, isHump, multiple } = (props && props.config) || { multiple: false, valueKeys: ['code', 'name', 'id'] }
      let fieldkeys = isHump ? ['Code', 'Name', 'Id'] : (column.property.endsWith('_') ? ['code', 'name', 'id'] : ['_code', '_name', '_id'])
      let multiplefieldkeys = isHump ? ['Code__multiple', 'Name__multiple', 'Id__multiple'] : (column.property.endsWith('_') ? ['code__multiple', 'name__multiple', 'id__multiple'] : ['_code__multiple', '_name__multiple', '_id__multiple'])
      valueKeys = valueKeys || ['code', 'name', 'id']
      let valueIn = ''
      if (!multiple) {
        valueIn = [row[column.property + fieldkeys[0]], row[column.property + fieldkeys[1]], row[column.property + fieldkeys[2]]].map((item, index) => {
          return (item + '').replace(/null|undefined/ig, '')
        }).join('##')
        row[column.property] = valueIn.replace(/####/ig, '')
      } else {
        let idArr = (typeof (row[column.property + fieldkeys[2]]) === 'string' && row[column.property + fieldkeys[2]] !== '') ? row[column.property + fieldkeys[2]].split(',') : (Array.isArray(row[column.property + fieldkeys[2]]) ? row[column.property + fieldkeys[2]] : [])
        let codeArr = (typeof (row[column.property + fieldkeys[0]]) === 'string' && row[column.property + fieldkeys[0]] !== '') ? row[column.property + fieldkeys[0]].split(',') : (Array.isArray(row[column.property + fieldkeys[0]]) ? row[column.property + fieldkeys[0]] : [])
        let nameArr = (typeof (row[column.property + fieldkeys[1]]) === 'string' && row[column.property + fieldkeys[1]] !== '') ? row[column.property + fieldkeys[1]].split(',') : (Array.isArray(row[column.property + fieldkeys[1]]) ? row[column.property + fieldkeys[1]] : [])
        valueIn = (nameArr.length || codeArr.length) ? codeArr.map((item, index) => {
          return [codeArr[index], nameArr[index], idArr[index]].map((item, index) => {
            return (item + '').replace(/null|undefined/ig, '')
          }).join('##')
        }).join(',') : ''
        row[column.property] = valueIn.replace(/####/ig, '')
      }
      return [
        h('BsTree', {
          props: {
            ref: 'vxe-tree-' + column.property,
            editable: true,
            value: valueIn,
            ...props,
            disabled: props.disabled,
            treeData: options,
            isDropSelectTree: true
          },
          on: {
            input: (value) => {
              renderData[column.property] = value
            },
            onTreeLoaded({ treeData, tree }, bsTree) {
              cellOptionCallBack(params, { optionType: 'onTreeLoaded', treeData, tree, bsTree, renderOpts })
            },
            onNodeClick({ node, treeData }) {
              if (node !== null) {
                renderData[column.property + fieldkeys[2]] = node[valueKeys[2]]
                renderData[column.property + fieldkeys[0]] = node[valueKeys[0]]
                renderData[column.property + fieldkeys[1]] = node[valueKeys[1]]
              } else {
                renderData[column.property + fieldkeys[2]] = ''
                renderData[column.property + fieldkeys[0]] = ''
                renderData[column.property + fieldkeys[1]] = ''
              }
              cellOptionCallBack(params, { optionType: 'nodeClick', node, treeData, renderOpts })
            },
            onNodeCheckClick({ nodes, node, treeData, value }) {
              renderData[column.property + multiplefieldkeys[2]] = nodes.map((item, index) => {
                return item[valueKeys[2]] ? item[valueKeys[2]] : ''
              })
              renderData[column.property + multiplefieldkeys[0]] = nodes.map((item, index) => {
                return item[valueKeys[0]] ? item[valueKeys[0]] : ''
              })
              renderData[column.property + multiplefieldkeys[1]] = nodes.map((item, index) => {
                return item[valueKeys[1]] ? item[valueKeys[1]] : ''
              })
              renderData[column.property + fieldkeys[2]] = renderData[column.property + multiplefieldkeys[2]].join(',')
              renderData[column.property + fieldkeys[0]] = renderData[column.property + multiplefieldkeys[0]].join(',')
              renderData[column.property + fieldkeys[1]] = renderData[column.property + multiplefieldkeys[1]].join(',')
              cellOptionCallBack(params, { optionType: 'nodeCheckClick', node, nodes, treeData, renderOpts })
            }
          }
        })
      ]
    },
    renderItem(h, renderOpts, { $form, property, data }) {
      let { props, options } = renderOpts
      let renderData = data
      let { multiple, isHump, valueKeys, format, cellViewFormat } = (props && props.config) || { format: '{code}-{name}', multiple: false, valueKeys: ['code', 'name', 'id'] }
      valueKeys = valueKeys || ['code', 'name', 'id']
      let fieldkeys = isHump ? ['Code', 'Name', 'Id'] : (property.endsWith('_') ? ['code', 'name', 'id'] : ['_code', '_name', '_id'])
      let multiplefieldkeys = isHump ? ['Code__multiple', 'Name__multiple', 'Id__multiple', '__viewSort'] : (property.endsWith('_') ? ['code__multiple', 'name__multiple', 'id__multiple', '_viewSort'] : ['_code__multiple', '_name__multiple', '_id__multiple', '__viewSort'])
      format = cellViewFormat || format || ('{' + valueKeys[0] + '}-{' + valueKeys[1] + '}')
      let valueIn = ''
      if (!multiple) {
        valueIn = [data[property + fieldkeys[0]], data[property + fieldkeys[1]], data[property + fieldkeys[2]]].map((item, index) => {
          return (item + '').replace(/null|undefined/ig, '')
        }).join('##')
        data[property] = valueIn.replace(/####/ig, '')
        data[property + multiplefieldkeys[3]] = data[property] === '' ? '' : defaultGloabalUtils.formatLabel(format, {
          [valueKeys[0]]: data[property + fieldkeys[0]],
          [valueKeys[1]]: data[property + fieldkeys[1]],
          [valueKeys[2]]: data[property + fieldkeys[2]]
        }, valueKeys)
      } else {
        let idArr = (typeof (data[property + fieldkeys[2]]) === 'string' && data[property + fieldkeys[2]] !== '') ? data[property + fieldkeys[2]].split(',') : (Array.isArray(data[property + fieldkeys[2]]) ? data[property + fieldkeys[2]] : [])
        let codeArr = (typeof (data[property + fieldkeys[0]]) === 'string' && data[property + fieldkeys[0]] !== '') ? data[property + fieldkeys[0]].split(',') : (Array.isArray(data[property + fieldkeys[0]]) ? data[property + fieldkeys[0]] : [])
        let nameArr = (typeof (data[property + fieldkeys[1]]) === 'string' && data[property + fieldkeys[1]] !== '') ? data[property + fieldkeys[1]].split(',') : (Array.isArray(data[property + fieldkeys[1]]) ? data[property + fieldkeys[1]] : [])
        valueIn = (nameArr.length || codeArr.length) ? codeArr.map((item, index) => {
          return [codeArr[index], nameArr[index], idArr[index]].map((item, index) => {
            return (item + '').replace(/null|undefined/ig, '')
          }).join('##')
        }).join(',') : ''
        data[property] = valueIn.replace(/####/ig, '')
        data[property + fieldkeys[2]] = data[property] === '' ? '' : idArr.join(',')
        data[property + fieldkeys[0]] = data[property] === '' ? '' : codeArr.join(',')
        data[property + fieldkeys[1]] = data[property] === '' ? '' : nameArr.join(',')
        data[property + multiplefieldkeys[2]] = data[property] === '' ? [] : idArr
        data[property + multiplefieldkeys[0]] = data[property] === '' ? [] : codeArr
        data[property + multiplefieldkeys[1]] = data[property] === '' ? [] : nameArr
        data[property + multiplefieldkeys[3]] = data[property] === '' ? '' : codeArr.map((item, index) => {
          return defaultGloabalUtils.formatLabel(format, {
            [valueKeys[0]]: codeArr[index],
            [valueKeys[1]]: nameArr[index],
            [valueKeys[2]]: idArr[index]
          }, valueKeys)
        }).join(',')
      }
      if ($form.$parent.editable !== false && props.editable !== false) {
        return [
          h('BsTree', {
            props: {
              ref: 'vxe-tree-' + property,
              editable: true,
              value: valueIn,
              ...props,
              disabled: props.disabled,
              treeData: options || [],
              isDropSelectTree: true
            },
            on: {
              input: (value) => {
                data[property] = value
              },
              onTreeLoaded({ treeData, tree }, bsTree) {
                $form.$parent.itemOption({ $form, property, itemValue: data[property], optionType: 'onTreeLoaded', treeData, tree, bsTree, renderOpts })
              },
              onNodeClick({ node, treeData, value }) {
                if (node !== null) {
                  renderData[property + fieldkeys[2]] = node[valueKeys[2]]
                  renderData[property + fieldkeys[0]] = node[valueKeys[0]]
                  renderData[property + fieldkeys[1]] = node[valueKeys[1]]
                } else {
                  renderData[property + fieldkeys[2]] = ''
                  renderData[property + fieldkeys[0]] = ''
                  renderData[property + fieldkeys[1]] = ''
                }
                renderData[property + multiplefieldkeys[3]] = value
                $form.$parent.itemChange({ $form, property, itemValue: data[property], data, renderOpts, node, treeData })
              },
              onNodeCheckClick({ node, nodes, treeData, value }) {
                renderData[property + multiplefieldkeys[2]] = nodes.map((item, index) => {
                  return item[valueKeys[2]] ? item[valueKeys[2]] : ''
                })
                renderData[property + multiplefieldkeys[0]] = nodes.map((item, index) => {
                  return item[valueKeys[0]] ? item[valueKeys[0]] : ''
                })
                renderData[property + multiplefieldkeys[1]] = nodes.map((item, index) => {
                  return item[valueKeys[1]] ? item[valueKeys[1]] : ''
                })
                renderData[property + fieldkeys[2]] = renderData[property + multiplefieldkeys[2]].join(',')
                renderData[property + fieldkeys[0]] = renderData[property + multiplefieldkeys[0]].join(',')
                renderData[property + fieldkeys[1]] = renderData[property + multiplefieldkeys[1]].join(',')
                data[property + multiplefieldkeys[3]] = value
                $form.$parent.itemChange({ $form, property, itemValue: data[property], data, renderOpts, node, nodes, treeData })
              }
            }
          })
        ]
      } else {
        if ($form.$parent.uneditableBorder) {
          return [<span class="text tl border-text">{data[property + multiplefieldkeys[3]]}</span>]
        } else {
          return [<span class="text tl">{data[property + multiplefieldkeys[3]]}</span>]
        }
      }
    }
  },
  $vxeSelect: {
    // 下拉选择
    renderDefault(h, { props = {}, options }, { row, column }, context) {
      row[column.property] = (row[column.property] + '').replace(/null|undefined/ig, '')
      // // row[column.property] = typeof (row[column.property]) === 'string' ? row[column.property] : (Array.isArray(row[column.property]) ? row[column.property].join(',') : '')
      let arrValue = []
      if (props.multiple) {
        row[column.property + '__multiple'] = (row[column.property] === '') ? [] : row[column.property].split(',')
        if (props.optgroup) {
          options.forEach((itemP, indexP) => {
            itemP.children.forEach((item, index) => {
              if (row[column.property + '__multiple'].split(',').indexOf(item.value + '') >= 0) {
                arrValue.push(item.label)
              }
            })
          })
        } else {
          row[column.property + '__multiple'] = (row[column.property] === '') ? [] : row[column.property].split(',')
          options.forEach((item, index) => {
            if (row[column.property + '__multiple'].split(',').indexOf(item.value + '') >= 0) {
              arrValue.push(item.label)
            }
          })
        }
      } else {
        if (props.optgroup) {
          options.forEach((itemP, indexP) => {
            itemP.children.forEach((item, index) => {
              if (row[column.property] + '' === item.value + '') {
                arrValue.push(item.label)
              }
            })
          })
        } else {
          options.forEach((item, index) => {
            if (row[column.property] + '' === item.value + '') {
              arrValue.push(item.label)
            }
          })
        }
      }
      row[column.property + '__viewSort'] = arrValue.join(',')
      return [
        <span>{context.$grid.$parent.getHighlightedFilterText(row[column.property + '__viewSort'])}</span>
      ]
    },
    renderCell(h, { props = {}, options }, { row, column }, context) {
      row[column.property] = (row[column.property] + '').replace(/null|undefined/ig, '')
      // // row[column.property] = typeof (row[column.property]) === 'string' ? row[column.property] : (Array.isArray(row[column.property]) ? row[column.property].join(',') : '')
      let arrValue = []
      if (props.multiple) {
        row[column.property + '__multiple'] = (row[column.property] === '') ? [] : row[column.property].split(',')
        if (props.optgroup) {
          options.forEach((itemP, indexP) => {
            itemP.children.forEach((item, index) => {
              if (row[column.property + '__multiple'].indexOf(item.value + '') >= 0) {
                arrValue.push(item.label)
              }
            })
          })
        } else {
          row[column.property + '__multiple'] = (row[column.property] === '') ? [] : row[column.property].split(',')
          options.forEach((item, index) => {
            if (row[column.property + '__multiple'].indexOf(item.value + '') >= 0) {
              arrValue.push(item.label)
            }
          })
        }
      } else {
        if (props.optgroup) {
          options.forEach((itemP, indexP) => {
            itemP.children.forEach((item, index) => {
              if (row[column.property] + '' === item.value + '') {
                arrValue.push(item.label)
              }
            })
          })
        } else {
          options.forEach((item, index) => {
            if (row[column.property] + '' === item.value + '') {
              arrValue.push(item.label)
            }
          })
        }
      }
      row[column.property + '__viewSort'] = arrValue.join(',')
      return [
        <span>{context.$grid.$parent.getHighlightedFilterText(row[column.property + '__viewSort'])}</span>
      ]
    },
    renderEdit(h, renderOpts, params, context) {
      let { props = {}, options } = renderOpts
      let { row, column } = params
      let bsTable = context.$grid.$parent
      if (props.multiple) {
        row[column.property] = typeof (row[column.property]) === 'string' ? row[column.property] : (Array.isArray(row[column.property]) ? row[column.property].join(',') : '')
        row[column.property + '__multiple'] = row[column.property + '__multiple'] = (row[column.property] === '') ? [] : row[column.property].split(',')
      }
      return [
        h('vxe-select', {
          props: {
            ref: 'vxe-select-' + column.property,
            value: props.multiple ? row[column.property + '__multiple'] : row[column.property],
            placeholder: '请选择',
            ...props,
            transfer: true
          },
          scopedSlots: Object.assign({},
            renderOpts.slots && renderOpts.slots.prefix ? {
              prefix: props => {
                return (
                  <vxe-tooltip leaveDelay={0} placement="top" content={typeof (renderOpts.slots.prefix) === 'object' ? renderOpts.slots.prefix.tip : renderOpts.slots.prefix} enterable>
                    <i class={typeof (renderOpts.slots.prefix) === 'object' && renderOpts.slots.prefix.ico ? 'fa ' + renderOpts.slots.prefix.ico : 'fa vxe-icon--info'}></i>
                  </vxe-tooltip>
                )
              }
            } : {}
          ),
          on: {
            change: ({ value }) => {
              let arrValue = []
              if (props.multiple) {
                row[column.property + '__multiple'] = value
                row[column.property] = value.join(',')
                options.forEach((item, index) => {
                  if (row[column.property + '__multiple'].indexOf(item.value + '') >= 0) {
                    arrValue.push(item.label)
                  }
                })
                bsTable.cellOptionCallBack(params, { optionType: 'select', multiple: props.multiple, value, viewValue: arrValue, field: column.property, renderOpts })
              } else {
                row[column.property] = value
                options.forEach((item, index) => {
                  if (row[column.property] + '' === item.value + '') {
                    arrValue.push(item.label)
                  }
                })
                bsTable.cellOptionCallBack(params, { optionType: 'select', multiple: props.multiple, value, viewValue: arrValue[0], field: column.property, renderOpts })
              }
            }
          }
        }, props.optgroup ? options.map(item => {
          return h('vxe-optgroup', {
            props: {
              value: String(item.value),
              label: item.label
            }
          }, (item.children || []).map(item => {
            return h('vxe-option', {
              props: {
                value: String(item.value),
                label: item.label
              }
            })
          }))
        }) : options.map(item => {
          return h('vxe-option', {
            props: {
              value: String(item.value),
              label: item.label
            }
          })
        }))
      ]
    },
    renderItem(h, renderOpts, { $form, property, data }) {
      let { props = {}, options } = renderOpts
      if ($form.$parent.editable !== false) {
        return [
          h('vxe-select', {
            props: {
              ref: 'vxe-select-' + property,
              value: (props.multiple ? data[property + '__multiple'] : String(data[property])),
              placeholder: '请选择',
              ...props,
              disabled: props.disabled || props.editable === false,
              transfer: true
            },
            scopedSlots: Object.assign({},
              renderOpts.slots && renderOpts.slots.prefix ? {
                prefix: props => {
                  return (
                    <vxe-tooltip leaveDelay={0} placement="top" content={typeof (renderOpts.slots.prefix) === 'object' ? renderOpts.slots.prefix.tip : renderOpts.slots.prefix} enterable>
                      <i class={typeof (renderOpts.slots.prefix) === 'object' && renderOpts.slots.prefix.ico ? 'fa ' + renderOpts.slots.prefix.ico : 'fa vxe-icon--info'}></i>
                    </vxe-tooltip>
                  )
                }
              } : {}
            ),
            on: {
              change: ({ value }) => {
                if (props.multiple) {
                  data[property + '__multiple'] = value
                  data[property] = value.join(',')
                } else {
                  data[property] = value
                }
                $form.$parent.itemChange({ $form, property, itemValue: data[property], data, renderOpts })
              }
            }
          }, props.optgroup ? options.map(item => {
            return h('vxe-optgroup', {
              props: {
                value: String(item.value),
                label: item.label
              }
            }, (item.children || []).map(item => {
              return h('vxe-option', {
                props: {
                  value: String(item.value),
                  label: item.label
                }
              })
            }))
          }) : options.map(item => {
            return h('vxe-option', {
              props: {
                value: String(item.value),
                label: item.label
              }
            })
          }))
        ]
      } else {
        let dataM = (data[property] === '') ? [] : String(data[property]).split(',')
        let arrValue = []
        if (props.optgroup) {
          options.forEach((itemP, indexP) => {
            itemP.children.forEach((item, index) => {
              if (dataM + '' === item.value + '') {
                arrValue.push(item.label)
              }
            })
          })
        } else {
          options.forEach((item, index) => {
            if (dataM.indexOf(item.value + '') >= 0) {
              arrValue.push(item.label)
            }
          })
        }
        data[property + '__viewSort'] = arrValue.join(',')
        if ($form.$parent.uneditableBorder) {
          return [<span class="text tl border-text">{data[property + '__viewSort']}</span>]
        } else {
          return [<span class="text">{data[property + '__viewSort']}</span>]
        }
      }
    }
  },
  $vxeCheckbox: {
    renderDefault(h, { options, props = {} }, { row, column }, context) {
      row[column.property] = typeof (row[column.property]) === 'string' ? row[column.property] : (Array.isArray(row[column.property]) ? row[column.property].join(',') : '')
      row[column.property + '__multiple'] = row[column.property].split(',')
      let value = []
      options.forEach((item, index) => {
        item.value = item.value + ''
        if (row[column.property + '__multiple'].indexOf() >= 0) {
          value.push(item.label)
        }
      })
      row[column.property + '__viewSort'] = value.join(',')
      return [<span>{context.$grid.$parent.getHighlightedFilterText(row[column.property + '__viewSort'])}</span>]
    },
    renderCell(h, { options, props = {} }, { row, column }, context) {
      row[column.property] = typeof (row[column.property]) === 'string' ? row[column.property] : (Array.isArray(row[column.property]) ? row[column.property].join(',') : '')
      row[column.property + '__multiple'] = row[column.property].split(',')
      let value = []
      options.forEach((item, index) => {
        item.value = item.value + ''
        if (row[column.property + '__multiple'].indexOf(item.value + '') >= 0) {
          value.push(item.label)
        }
      })
      row[column.property + '__viewSort'] = value.join(',')
      return [<span>{context.$grid.$parent.getHighlightedFilterText(row[column.property + '__viewSort'])}</span>]
    },
    renderEdit(h, renderOpts, params, context) {
      let { options, props = {}, propsC = {} } = renderOpts
      let bsTable = context.$grid.$parent
      let { row, column } = params
      row[column.property] = typeof (row[column.property]) === 'string' ? row[column.property] : (Array.isArray(row[column.property]) ? row[column.property].join(',') : '')
      row[column.property + '__multiple'] = row[column.property].split(',')
      return [
        h('vxe-checkbox-group', {
          props: {
            value: row[column.property + '__multiple'],
            ...props
          },
          on: {
            change({ $event, checked, checklist, label }) {
              row[column.property + '__multiple'] = checklist
              row[column.property] = checklist.join(',')
              bsTable.cellOptionCallBack(params, { $event, checked, checklist, label, renderOpts })
            }
          }
        }, options.map(item => {
          return h('vxe-checkbox', {
            props: {
              disabled: item.disabled,
              label: String(item.value),
              ...propsC
            }
          }, item.label)
        }))
      ]
    },
    renderItem(h, renderOpts, { $form, property, data }) {
      let { props = {}, propsC = {}, options } = renderOpts
      // if (Array.isArray(data[property])) {
      //   data[property + '__multiple'] = [...data[property]]
      // } else if (typeof data[property] === 'string') {
      //   data[property + '__multiple'] = data[property].split(',')
      // } else {
      //   data[property] = ''
      //   data[property + '__multiple'] = []
      // }
      if ($form.$parent.editable !== false) {
        return [
          h('vxe-checkbox-group', {
            props: {
              value: data[property + '__multiple'] + '',
              ...props
            },
            on: {
              change({ $event, checked, checklist, label }) {
                data[property] = checklist.join(',')
                //  $form.$parent.itemChange({ $form, property, itemValue: data[property], data, renderOpts })
              }
            }
          }, options.map(item => {
            return h('vxe-checkbox', {
              props: {
                disabled: item.disabled || props.editable === false,
                label: String(item.value),
                ...propsC
              }
            }, item.label)
          }))
        ]
      } else {
        return [
          h('vxe-checkbox-group', {
            props: {
              value: data[property + '__multiple'],
              ...props
            },
            on: {
              change({ $event, checked, checklist, label }) {
                data[property] = checklist.join(',')
                // $form.$parent.itemChange({ $form, property, itemValue: checklist, data, renderOpts })
              }
            }
          }, options.map(item => {
            return h('vxe-checkbox', {
              props: {
                disabled: true,
                label: String(item.value),
                ...propsC
              }
            }, item.label)
          }))
        ]
      }
    }
  },
  // 单值
  $vxeInput: {
    // 输入框
    autofocus: '.vxe-input--inner',
    renderDefault(h, { props = {} }, { row, column }, context) {
      let bsTable = context.$grid.$parent
      const type = (props && props.type) || 'text'
      if (props.format) {
        row[column.property + '__viewSort'] = defaultGloabalUtils.format(props.format, row, bsTable.publicData.rowPublicData)
      } else {
        row[column.property] = (row[column.property] + '').replace(/null|undefined/ig, '')
        switch (type) {
          case 'integer':
            row[column.property + '__viewSort'] = isNaN(parseInt(row[column.property])) ? '0' : parseInt(row[column.property])
            break
          case 'number':
            row[column.property + '__viewSort'] = isNaN(parseFloat(row[column.property])) ? '0' : parseFloat(row[column.property])
            break
          case 'float':
            row[column.property + '__viewSort'] = bsTable.transToNumber(row[column.property], props.digits || 2)
            break
          default:
            row[column.property + '__viewSort'] = row[column.property]
        }
      }
      return [<span class="text" domPropsInnerHTML={bsTable.getHighlightedFilterText(row[column.property + '__viewSort'])}></span>]
    },
    renderCell(h, { props = {} }, { row, column }, context) {
      let bsTable = context.$grid.$parent
      const type = (props && props.type) || 'text'
      if (props.format) {
        row[column.property + '__viewSort'] = defaultGloabalUtils.format(props.format, row, bsTable.publicData.rowPublicData)
      } else {
        row[column.property] = (row[column.property] + '').replace(/null|undefined/ig, '')
        switch (type) {
          case 'integer':
            row[column.property + '__viewSort'] = isNaN(parseInt(row[column.property])) ? '0' : parseInt(row[column.property])
            break
          case 'number':
            row[column.property + '__viewSort'] = isNaN(parseFloat(row[column.property])) ? '0' : parseFloat(row[column.property])
            break
          case 'float':
            row[column.property + '__viewSort'] = bsTable.transToNumber(row[column.property], props.digits || 2)
            break
          default:
            row[column.property + '__viewSort'] = row[column.property]
        }
      }
      return [<span class="text" domPropsInnerHTML={bsTable.getHighlightedFilterText(row[column.property + '__viewSort'])}></span>]
    },
    renderEdit(h, renderOpts, params, context) {
      let { props = {} } = renderOpts
      let bsTable = context.$grid.$parent
      let { row, column } = params
      props = Object.assign({ type: 'text', placeholder: '请输入' }, props || {})
      return [
        h('vxe-input', {
          ref: 'vxe-input' + column.property,
          props: {
            value: row[column.property],
            controls: false,
            ...props,
            transfer: true
          },
          scopedSlots: Object.assign({},
            renderOpts.slots && renderOpts.slots.prefix ? {
              prefix: props => {
                return (
                  <vxe-tooltip leaveDelay={0} placement="top" content={typeof (renderOpts.slots.prefix) === 'object' ? renderOpts.slots.prefix.tip : renderOpts.slots.prefix} enterable>
                    <i class={typeof (renderOpts.slots.prefix) === 'object' && renderOpts.slots.prefix.ico ? 'fa ' + renderOpts.slots.prefix.ico : 'fa vxe-icon--info'}></i>
                  </vxe-tooltip>
                )
              }
            } : {},
            renderOpts.slots && renderOpts.slots.prefix.suffix ? {
              suffix: props => {
                return (
                  <vxe-tooltip leaveDelay={0} placement="top" content={typeof (renderOpts.slots.suffix) === 'object' ? renderOpts.slots.suffix.tip : renderOpts.slots.suffix} enterable>
                    <i class={typeof (renderOpts.slots.suffix) === 'object' && renderOpts.slots.suffix.ico ? 'fa ' + renderOpts.slots.suffix.ico : 'fa vxe-icon--warning'}></i>
                  </vxe-tooltip>
                )
              }
            } : {}),
          on: {
            change({ value, $event }) {
              if ('number|integer|float'.indexOf(props.type || 'text') >= 0) {
                value = bsTable.transInputToNumber($event.currentTarget.value)
                $event.currentTarget.value = value
                row[column.property] = value
              } else {
                row[column.property] = value
              }
            },
            blur({ value, $event }) {
              row[column.property] = value
              bsTable.cellOptionCallBack(params, { value, $event, renderOpts })
            }
          }
        })
      ]
    },
    renderItem(h, renderOpts, { $form, property, data, item }) {
      let { editable, itemChange, constrainDataMap } = $form.$parent
      let { props = {} } = renderOpts
      props = Object.assign({ type: 'text', placeholder: '请输入' }, props, constrainDataMap[property] || {})
      if (editable !== false) {
        return [
          h('vxe-input', {
            ref: 'vxe-input' + property,
            props: {
              value: data[property],
              controls: false,
              ...props,
              disabled: props.disabled || props.editable === false,
              transfer: true
            },
            scopedSlots: Object.assign({},
              renderOpts.slots && renderOpts.slots.prefix ? {
                prefix: props => {
                  return (
                    <vxe-tooltip leaveDelay={0} placement="top" content={typeof (renderOpts.slots.prefix) === 'object' ? renderOpts.slots.prefix.tip : renderOpts.slots.prefix} enterable>
                      <i class={typeof (renderOpts.slots.prefix) === 'object' && renderOpts.slots.prefix.ico ? 'fa ' + renderOpts.slots.prefix.ico : 'fa vxe-icon--question'}></i>
                    </vxe-tooltip>
                  )
                }
              } : {},
              renderOpts.slots && renderOpts.slots.prefix.suffix ? {
                suffix: props => {
                  return (
                    <div style="line-height: 30px;">
                      {props.info.title}
                    </div>
                  )
                }
              } : {}),
            on: {
              focus({ value, $event }) {
                $event.currentTarget.value = data[property]
              },
              change({ value, $event }) {
                if ('number|integer|float'.indexOf(props.type || 'text') >= 0) {
                  value = $form.$parent.transInputToNumber($event.currentTarget.value)
                  $event.currentTarget.value = value
                  data[property] = value
                } else {
                  data[property] = value
                }
              },
              blur({ value, $event }) {
                $event.currentTarget.value = data[property]
                itemChange({ $form, property, itemValue: data[property], data, renderOpts })
              },
              prefixClick({ value, $event }) {
                $form.$parent.itemOption({ $form, property, itemValue: data[property], optionType: 'prefixClick', renderOpts })
              },
              suffixClick({ value, $event }) {
                $form.$parent.itemOption({ $form, property, itemValue: data[property], optionType: 'suffixClick', renderOpts })
              }
            }
          })
        ]
      } else {
        if ($form.$parent.uneditableBorder) {
          return [<span class="text tl border-text">{data[property]}</span>]
        } else {
          return [<span class="text"> {data[property]} </span>]
        }
      }
    }
    // renderItem(h, renderOpts, { $form, property, data, item }) {
    //   let { props = {} } = renderOpts
    //   props = Object.assign({ type: 'text', placeholder: '请输入' }, props)
    //   if ($form.$parent.editable !== false && props.editable !== false) {
    //     return [
    //       h('vxe-input', {
    //         ref: 'vxe-input' + property,
    //         props: {
    //           value: data[property],
    //           ...props,
    //           transfer: true
    //         },
    //         on: {
    //           input(value) {
    //             data[property] = value
    //           },
    //           blur({ value }) {
    //             data[property] = value
    //             $form.$parent.itemChange({ $form, property, itemValue: value, data, renderOpts })
    //           }
    //         }
    //       })
    //     ]
    //   } else {
    //     return [
    //       <span class="text"> {data[property]} </span>
    //     ]
    //   }
    // }
  },
  $vxeCalculate: {
    // 计算列
    // let row = {
    //   a: 1,
    //   b: 2,
    //   c: 3
    // }
    // let formula = 'Math.pow({a}+{b},{c})'
    // for (let k in row) {
    // let reg = new RegExp('({' + k + '})', 'ig')
    //   if (reg.test(formula)) {
    //     formula = formula.replace(reg, row[k])
    //   }
    // }
    // let calcResult = (new Function('console.log(formula);return eval(formula)'))()
    renderDefault(h, renderOpts, { $columnIndex, $rowIndex, items, column, data, row, $seq, $table, $type, columnIndex, isEdit, level, rowIndex, seq }, context) {
      return defaultGloabalUtils.calculateRender(h, renderOpts, { $columnIndex, $rowIndex, items, column, data, row, $seq, $table, $type, columnIndex, isEdit, level, rowIndex, seq }, context)
    },
    renderCell(h, renderOpts, { $columnIndex, $rowIndex, items, column, data, row, $seq, $table, $type, columnIndex, isEdit, level, rowIndex, seq }, context) {
      return defaultGloabalUtils.calculateRender(h, renderOpts, { $columnIndex, $rowIndex, items, column, data, row, $seq, $table, $type, columnIndex, isEdit, level, rowIndex, seq }, context)
    },
    renderEdit(h, renderOpts, { $columnIndex, $rowIndex, items, column, data, row, $seq, $table, $type, columnIndex, isEdit, level, rowIndex, seq }, context) {
      return defaultGloabalUtils.calculateRender(h, renderOpts, { $columnIndex, $rowIndex, items, column, data, row, $seq, $table, $type, columnIndex, isEdit, level, rowIndex, seq }, context)
      // return [
      //   <vxe-input
      //     v-model={row[column.property]}
      //     placeholder="自动计算"
      //     readonly
      //     clearable
      //   ></vxe-input>
      // ]
    },
    renderItem(h, renderOpts, { $form, data, property }) {
      return defaultGloabalUtils.formCalculateRender(h, renderOpts, { $form, data, property })
    }
  },
  $vxeMoney: {
    // 输入框
    autofocus: '.vxe-input--inner',
    renderDefault(h, { props = {} }, { row, column, $grid }, context) {
      let bsTable = context.$grid.$parent
      let moneyUnit = bsTable.moneyUnit ? bsTable.moneyUnit : 1
      let showZero = bsTable.showZero
      let viewDigits = props.digits || bsTable.curSelectMoneyUnitOption.viewDigits
      let zero = bsTable.transToNumber('', viewDigits)
      let val = bsTable.transToNumber(row[column.property], viewDigits)

      if (val === zero && showZero) {
        val = '0.00'
      } else if ((val === zero || Number(val) === Number(zero)) && !showZero) {
        return [<span class="text"></span>]
      } else if (bsTable.toolbarConfigInCopy.moneyInputSwich) {
        val = bsTable.transToNumber(bsTable.accurateChuFa(val, moneyUnit), viewDigits)
      } else {
      }
      val = bsTable.transToNumberLocalString(val, viewDigits)
      row[column.property + '__viewSort'] = val
      return [<span class="text">{bsTable.getHighlightedFilterText(val)}</span>]
    },
    renderCell(h, { props = {} }, { row, column, $grid }, context) {
      let bsTable = context.$grid.$parent
      let moneyUnit = bsTable.moneyUnit ? bsTable.moneyUnit : 1
      let showZero = bsTable.showZero
      let viewDigits = props.digits || bsTable.curSelectMoneyUnitOption.viewDigits
      let zero = bsTable.transToNumber('', viewDigits)
      let val = bsTable.transToNumber(row[column.property], viewDigits)
      if (val === zero && showZero) {
        val = '0.00'
      } else if (val === zero && !showZero) {
        return [<span class="text"></span>]
      } else if (bsTable.toolbarConfigInCopy.moneyInputSwich) {
        val = bsTable.transToNumber(bsTable.accurateChuFa(val, moneyUnit), viewDigits)
      } else {
      }
      val = bsTable.transToNumberLocalString(val, viewDigits)
      row[column.property + '__viewSort'] = val
      return [<span class="text">{bsTable.getHighlightedFilterText(val)}</span>]
    },
    renderEdit(h, renderOpts, params, context) {
      let { props = {} } = renderOpts
      let { row, column } = params
      let bsTable = context.$grid.$parent
      let moneyInputSwich = context.$grid.$parent.toolbarConfigInCopy ? context.$grid.$parent.toolbarConfigInCopy.moneyInputSwich : false
      let moneyUnit = moneyInputSwich ? (context.$grid.$parent.moneyUnit ? context.$grid.$parent.moneyUnit : 1) : 1
      let val = (row[column.property] + '').replace(/null|undefined|NaN/ig, '')
      let inputDigits = bsTable.curSelectMoneyUnitOption.inputDigits
      let viewDigits = props.digits || bsTable.curSelectMoneyUnitOption.viewDigits
      const { min = 0, max = 1000000000000 } = props
      row[column.property + '__moneySwitchinput'] = (val === '-' || val === '') ? (row[column.property + '__moneySwitchinput'] === '-' ? '-' : '') : bsTable.accurateChuFa(val, moneyUnit) + ''
      row[column.property + '__moneySwitchinput'] = row[column.property + '__moneySwitchinput'] === '0' ? '' : row[column.property + '__moneySwitchinput']
      return [
        h('vxe-input', {
          ref: 'vxe-input' + column.property,
          props: {
            value: row[column.property + '__moneySwitchinput'] + '',
            step: 1,
            min: 0,
            max: 1000000000000,
            clearable: true,
            placeholder: '请输入',
            digits: inputDigits,
            ...props,
            readonly: props.readonly || props.disabled,
            type: 'text',
            controls: false
          },
          scopedSlots: Object.assign({},
            renderOpts.slots && renderOpts.slots.prefix ? {
              prefix: props => {
                return (
                  <vxe-tooltip leaveDelay={0} placement="top" content={typeof (renderOpts.slots.prefix) === 'object' ? renderOpts.slots.prefix.tip : renderOpts.slots.prefix} enterable>
                    <i class={typeof (renderOpts.slots.prefix) === 'object' && renderOpts.slots.prefix.ico ? 'fa ' + renderOpts.slots.prefix.ico : 'fa vxe-icon--info'}></i>
                  </vxe-tooltip>
                )
              }
            } : {},
            renderOpts.slots && renderOpts.slots.prefix.suffix ? {
              suffix: props => {
                return (
                  <vxe-tooltip leaveDelay={0} placement="top" content={typeof (renderOpts.slots.suffix) === 'object' ? renderOpts.slots.suffix.tip : renderOpts.slots.suffix} enterable>
                    <i class={typeof (renderOpts.slots.suffix) === 'object' && renderOpts.slots.suffix.ico ? 'fa ' + renderOpts.slots.suffix.ico : 'fa vxe-icon--warning'}></i>
                  </vxe-tooltip>
                )
              }
            } : {}),
          on: {
            focus() {
              renderOpts.inputStatus = true
            },
            keyup({ value, $event }) {
            },
            clear({ $event }) {
              $event = $event || window.event
              row[column.property + '__moneySwitchinput'] = ''
              $event.currentTarget.value = ''
              row[column.property] = ''
            },
            change({ value, $event }) {
              value = bsTable.transInputToNumber($event.currentTarget.value, inputDigits)
              $event.currentTarget.value = value
              row[column.property + '__moneySwitchinput'] = value
              if (renderOpts.inputStatus) {
                if (Number(value) > Number(max)) {
                  value = max
                } else if (Number(value) < Number(min)) {
                  value = min
                }
                row[column.property + '__moneySwitchinput'] = value
                $event.currentTarget.value = value
              }
              row[column.property] = (value === '-' || value === '') ? '' : bsTable.accurateChengFa(value, moneyUnit)
            },
            blur({ value, $event }) {
              value = value === '-' ? '' : value
              renderOpts.inputStatus = false
              value = bsTable.transInputToNumber(value)
              $event.currentTarget.value = value
              row[column.property + '__moneySwitchinput'] = value
              row[column.property] = bsTable.transToNumber(bsTable.accurateChengFa(row[column.property + '__moneySwitchinput'], moneyUnit), viewDigits)
              bsTable.cellOptionCallBack(params, { optionType: 'input', value: row[column.property], field: column.property, renderOpts })
            }
          }
        })
      ]
    },
    renderItem(h, renderOpts, { $form, data, property }) {
      let bsForm = $form.$parent
      let { editable, itemChange } = bsForm
      let { props = {} } = renderOpts
      let moneyInputSwich = bsForm.moneyInputSwich || false
      let moneyUnit = moneyInputSwich ? (bsForm.moneyUnit || 1) : 1
      let val = (data[property] + '').replace(/null|undefined|NaN/ig, '')
      props = Object.assign({ type: 'text', placeholder: '请输入' }, props)
      let inputDigits = bsForm.curSelectMoneyUnitOption.inputDigits
      let viewDigits = props.digits || bsForm.curSelectMoneyUnitOption.viewDigits
      // data[property + '__moneySwitchinput'] = bsForm.accurateChuFa((data[property] + '').replace(/null|undefined|NaN/ig, ''), moneyUnit) + ''
      if (props.thousandsSymbolView !== false) {
        const { min = 0, max = 100000000000000 } = props
        if (!renderOpts.inputStatus) {
          data[property + '__moneySwitchinput'] = (val === '-' || val === '') ? (data[property + '__moneySwitchinput'] === '-' ? '-' : '') : bsForm.transToNumberLocalString(bsForm.accurateChuFa(val, moneyUnit), viewDigits || 2)
        }
        if (editable !== false && props.editable !== false) {
          return [
            h('vxe-input', {
              ref: 'vxe-input-' + property,
              props: {
                value: data[property + '__moneySwitchinput'] + '',
                clearable: true,
                ...props,
                readonly: props.readonly,
                disabled: props.disabled,
                type: 'text',
                controls: false
              },
              scopedSlots: Object.assign({},
                renderOpts.slots && renderOpts.slots.prefix ? {
                  prefix: props => {
                    return (
                      <vxe-tooltip leaveDelay={0} placement="top" content={typeof (renderOpts.slots.prefix) === 'object' ? renderOpts.slots.prefix.tip : renderOpts.slots.prefix} enterable>
                        <i class={typeof (renderOpts.slots.prefix) === 'object' && renderOpts.slots.prefix.ico ? 'fa ' + renderOpts.slots.prefix.ico : 'fa vxe-icon--info'}></i>
                      </vxe-tooltip>
                    )
                  }
                } : {},
                renderOpts.slots && renderOpts.slots.prefix.suffix ? {
                  suffix: props => {
                    return (
                      <div style="line-height: 30px;">
                        {props.info.title}
                      </div>
                    )
                  }
                } : {}),
              on: {
                focus({ value, $event }) {
                  renderOpts.inputStatus = true
                  value = bsForm.transInputToNumber($event.currentTarget.value, inputDigits)
                  data[property + '__moneySwitchinput'] = value
                  $event.currentTarget.value = value
                },
                // keydown({ value, $event }) {
                //   renderOpts.inputStatus = true
                //   value = bsForm.transInputToNumber($event.currentTarget.value)
                //   data[property + '__moneySwitchinput'] = value
                //   $event.currentTarget.value = value
                // },
                clear({ $event }) {
                  $event = $event || window.event
                  data[property + '__moneySwitchinput'] = ''
                  $event.currentTarget.value = ''
                  data[property] = ''
                },
                change({ value, $event }) {
                  renderOpts.inputing = true
                  $event = $event || window.event
                  let val = bsForm.transInputToNumber($event.currentTarget.value, inputDigits)
                  if (renderOpts.inputStatus || value === '') {
                    if (Number(val) > Number(max)) {
                      val = max
                    } else if (Number(val) < Number(min)) {
                      val = min
                    }
                    data[property + '__moneySwitchinput'] = val
                    $event.currentTarget.value = value ? val : value
                  }
                  data[property] = (value === '-' || value === '') ? '' : bsForm.accurateChengFa(data[property + '__moneySwitchinput'], moneyUnit)
                },
                blur({ value, $event }) {
                  value = value === '-' ? '' : value
                  let val = value
                  if (renderOpts.inputing === true) {
                    val = bsForm.transToNumber($event.currentTarget.value, inputDigits)
                    data[property] = value ? bsForm.accurateChengFa(val, moneyUnit) : value
                    val = bsForm.transToNumberLocalString(val, viewDigits)
                    $event.currentTarget.value = value ? val : value
                    data[property + '__moneySwitchinput'] = val
                    itemChange({ $form, property, itemValue: data[property], data, renderOpts })
                  } else {
                    val = bsForm.transToNumberLocalString(val, viewDigits)
                    $event.currentTarget.value = val
                    data[property + '__moneySwitchinput'] = val
                  }
                  renderOpts.inputing = false
                  renderOpts.inputStatus = false
                }
              }
            })
          ]
        } else {
          if ($form.$parent.uneditableBorder) {
            return [<span class="text tl border-text">{data[property + '__moneySwitchinput']}</span>]
          } else {
            return [<span class="text" >{data[property + '__moneySwitchinput']}</span>]
          }
        }
      } else {
        data[property + '__moneySwitchinput'] = (val === '-' || val === '') ? (data[property + '__moneySwitchinput'] === '' ? '' : '') : bsForm.accurateChuFa(val, moneyUnit) + ''
        if (editable !== false && props.editable !== false) {
          return [
            h('vxe-input', {
              ref: 'vxe-input' + property,
              props: {
                value: data[property + '__moneySwitchinput'] + '',
                step: 1,
                maxlength: 14,
                min: 0,
                max: 1000000000000,
                digits: props.digits || 2,
                clearable: true,
                ...props,
                type: 'text',
                readonly: props.readonly,
                disabled: props.disabled,
                controls: false
              },
              on: {
                clear({ $event }) {
                  $event = $event || window.event
                  data[property + '__moneySwitchinput'] = ''
                  $event.currentTarget.value = ''
                  data[property] = ''
                },
                cahnge({ value, $event }) {
                  $event = $event || window.event
                  let val = value
                  val = bsForm.transInputToNumber($event.currentTarget.value, inputDigits)
                  $event.currentTarget.value = val
                  data[property + '__moneySwitchinput'] = val
                  data[property] = (value === '-' || value === '') ? '' : bsForm.accurateChengFa(data[property + '__moneySwitchinput'], moneyUnit)
                },
                blur({ value }) {
                  value = value === '-' ? '' : value
                  data[property] = value ? '' : bsForm.transToNumber(bsForm.accurateChengFa(data[property + '__moneySwitchinput'], moneyUnit), viewDigits)
                  bsForm.itemChange({ $form, property, itemValue: data[property], data, renderOpts })
                }
              }
            })
          ]
        } else {
          if ($form.$parent.uneditableBorder) {
            return [<span class="text tl border-text">{data[property + '__moneySwitchinput']}</span>]
          } else {
            return [<span class="text" >{data[property + '__moneySwitchinput']}</span>]
          }
        }
      }
    }
    // renderItem(h, renderOpts, { $form, data, property }) {
    //   let { props = {} } = renderOpts
    //   let bsForm = $form.$parent
    //   let moneyInputSwich = bsForm.moneyInputSwich || false
    //   let moneyUnit = moneyInputSwich ? (bsForm.moneyUnit || 1) : 1
    //   let val = (data[property] + '').replace(/null|undefined|NaN/ig, '')
    //   props.digits = moneyUnit.length - 1 + 2
    //   // data[property + '__moneySwitchinput'] = bsForm.accurateChuFa((data[property] + '').replace(/null|undefined|NaN/ig, ''), moneyUnit) + ''
    //   if (props.thousandsSymbolView !== false) {
    //     const { min = 0, max = 1000000000000 } = props
    //     if (!renderOpts.inputStatus) {
    //       data[property + '__moneySwitchinput'] = (val === '-' || val === '') ? (data[property + '__moneySwitchinput'] || '') : bsForm.transToNumberLocalString(bsForm.accurateChuFa(val, moneyUnit), props.digits || 2)
    //     }
    //     if (bsForm.editable !== false && prop.editable !== false) {
    //       return [
    //         h('vxe-input', {
    //           ref: 'vxe-input' + property,
    //           props: {
    //             value: data[property + '__moneySwitchinput'],
    //             ...props,
    //             type: 'text'
    //           },
    //           on: {
    //             focus({ value, $event }) {
    //               renderOpts.inputStatus = true
    //               value = bsForm.transInputToNumber($event.currentTarget.value)
    //               data[property + '__moneySwitchinput'] = value
    //               $event.currentTarget.value = value
    //             },
    //             input(value, $event) {
    //               $event = $event || window.event
    //               value = bsForm.transInputToNumber($event.currentTarget.value, props.digits || 2)
    //               if (renderOpts.inputStatus) {
    //                 if (value > max) {
    //                   value = max
    //                 } else if (value < min) {
    //                   value = min
    //                 }
    //                 data[property + '__moneySwitchinput'] = value
    //                 $event.currentTarget.value = value
    //               }
    //               data[property] = (value === '-' || value === '') ? '' : bsForm.accurateChengFa(data[property + '__moneySwitchinput'], moneyUnit)
    //             },
    //             blur({ value, $event }) {
    //               renderOpts.inputStatus = false
    //               value = bsForm.transToNumber($event.currentTarget.value, props.digits || 2)
    //               data[property] = bsForm.accurateChengFa(value, moneyUnit)
    //               value = bsForm.transToNumberLocalString(value, props.digits || 2)
    //               $event.currentTarget.value = value
    //               data[property + '__moneySwitchinput'] = value
    //               bsForm.itemChange({ $form, property, itemValue: data[property], data, renderOpts })
    //             }
    //           }
    //         })
    //       ]
    //     } else {
    //       return [<span class="text" >{data[property + '__moneySwitchinput']}</span>]
    //     }
    //   } else {
    //     data[property + '__moneySwitchinput'] = (val === '-' || val === '') ? (data[property + '__moneySwitchinput'] || '') : bsForm.accurateChuFa(val, moneyUnit) + ''
    //     if ($form.$parent.editable !== false && props.editable !== false) {
    //       return [
    //         h('vxe-input', {
    //           ref: 'vxe-input' + property,
    //           props: {
    //             value: data[property + '__moneySwitchinput'],
    //             step: 1,
    //             maxlength: 14,
    //             min: 0,
    //             max: 1000000000000,
    //             digits: props.digits || 2,
    //             type: 'float',
    //             ...props
    //           },
    //           on: {
    //             input(value, $event) {
    //               $event = $event || window.event
    //               value = bsForm.transInputToNumber($event.currentTarget.value)
    //               $event.currentTarget.value = value
    //               data[property + '__moneySwitchinput'] = value
    //               data[property] = (value === '-' || value === '') ? '' : bsForm.accurateChengFa(data[property + '__moneySwitchinput'], moneyUnit)
    //             },
    //             blur({ value }) {
    //               data[property + '__moneySwitchinput'] = value
    //               data[property] = bsForm.transToNumber(bsForm.accurateChengFa(data[property + '__moneySwitchinput'], moneyUnit), props.digits || 2)
    //               bsForm.itemChange({ $form, property, itemValue: data[property], data, renderOpts })
    //             }
    //           }
    //         })
    //       ]
    //     } else {
    //       return [<span class="text" >{data[property + '__moneySwitchinput']}</span>]
    //     }
    //   }
    // }
  },
  $vxeEditDownTextarea: {
    autofocus: '.vxe-input--inner',
    renderDefault(h, cellRender, { row, column }, context) {
      row[column.property] = (row[column.property] + '').replace(/null|undefined/ig, '')
      row[column.property + '__viewSort'] = row[column.property]
      return [<span class="text">{context.$grid.$parent.getHighlightedFilterText(row[column.property + '__viewSort'])}</span>]
    },
    renderCell(h, cellRender, { row, column }, context) {
      row[column.property] = (row[column.property] + '').replace(/null|undefined/ig, '')
      row[column.property + '__viewSort'] = row[column.property]
      return [<span class="text">{context.$grid.$parent.getHighlightedFilterText(row[column.property + '__viewSort'])}</span>]
    },
    renderEdit(h, renderOpts, params, context) {
      let { props = {} } = renderOpts
      let { column, row } = params
      let bsTable = context.$grid.$parent
      return [
        h('edit-down-textarea', {
          ref: 'vxe-edit-down-textarea' + column.property,
          props: {
            type: 'table',
            params: params,
            props: props
          },
          on: {
            change({ value }) {
              row[column.property] = value
            },
            blur({ value, $event }) {
              bsTable.cellOptionCallBack(params, { value, $event, renderOpts })
            }
          }
        })
      ]
    },
    renderItem(h, renderOpts, { $form, property, data }) {
      const { props = {} } = renderOpts
      if ($form.$parent.editable !== false) {
        return [
          h('vxe-textarea', {
            ref: 'vxe-textarea' + property,
            props: {
              value: data[property] + '',
              ...props,
              disabled: props.disabled || props.editable === false
            },
            on: {
              change({ value }) {
                data[property] = value
              },
              blur({ value }) {
                data[property] = value
                $form.$parent.itemChange({ $form, property, itemValue: value, data, renderOpts })
              }
            }
          })
        ]
      } else {
        if ($form.$parent.uneditableBorder) {
          return [<span class="text tl border-text">{data[property]}</span>]
        } else {
          return [<span class="text"> {data[property]} </span>]
        }
      }
    }
  },
  $vxeDays: {
    autofocus: '.vxe-input--inner',
    // 天数渲染器，不足0.25天按0记，大于0.75天按1天记，其他按0.5天记
    renderCell(h, { props }, { row, column }, context) {
      let quiteDay = row[column.property] % 1
      quiteDay = quiteDay <= 0.25 ? 0 : (quiteDay >= 0.75 ? 1 : 0.5)
      row[column.property] = Math.floor(row[column.property] / 1) + quiteDay
      row[column.property + '__viewSort'] = row[column.property]
      return [<span>{context.$grid.$parent.getHighlightedFilterText(row[column.property + '__viewSort'])}</span>]
    },
    renderDefault(h, { props }, { row, column }, context) {
      let quiteDay = row[column.property] % 1
      quiteDay = quiteDay <= 0.25 ? 0 : (quiteDay >= 0.75 ? 1 : 0.5)
      row[column.property] = Math.floor(row[column.property] / 1) + quiteDay
      row[column.property + '__viewSort'] = row[column.property]
      return [<span>{context.$grid.$parent.getHighlightedFilterText(row[column.property + '__viewSort'])}</span>]
    },
    renderEdit(h, renderOpts, params, context) {
      let { props = {} } = renderOpts
      let { row, column } = params
      let bsTable = context.$grid.$parent
      return [
        h('vxe-input', {
          ref: 'vxe-input' + column.property,
          props: {
            placeholder: '请输入天数',
            type: 'number',
            clearable: true,
            value: row[column.property] + '',
            controls: false,
            ...props
          },
          scopedSlots: Object.assign({},
            renderOpts.slots && renderOpts.slots.prefix ? {
              prefix: props => {
                return (
                  <vxe-tooltip leaveDelay={0} placement="top" content={typeof (renderOpts.slots.prefix) === 'object' ? renderOpts.slots.prefix.tip : renderOpts.slots.prefix} enterable>
                    <i class={typeof (renderOpts.slots.prefix) === 'object' && renderOpts.slots.prefix.ico ? 'fa ' + renderOpts.slots.prefix.ico : 'fa vxe-icon--info'}></i>
                  </vxe-tooltip>
                )
              }
            } : {},
            renderOpts.slots && renderOpts.slots.prefix.suffix ? {
              suffix: props => {
                return (
                  <vxe-tooltip leaveDelay={0} placement="top" content={typeof (renderOpts.slots.suffix) === 'object' ? renderOpts.slots.suffix.tip : renderOpts.slots.suffix} enterable>
                    <i class={typeof (renderOpts.slots.suffix) === 'object' && renderOpts.slots.suffix.ico ? 'fa ' + renderOpts.slots.suffix.ico : 'fa vxe-icon--warning'}></i>
                  </vxe-tooltip>
                )
              }
            } : {}),
          on: {
            change({ value, $event }) {
              if ('number|integer|float'.indexOf(props.type || 'number') >= 0) {
                value = bsTable.transInputToNumber($event.currentTarget.value)
                $event.currentTarget.value = value
                row[column.property] = value
              } else {
                row[column.property] = value
              }
            },
            blur({ value, $event }) {
              let quiteDay = row[column.property] % 1
              quiteDay = quiteDay <= 0.25 ? 0 : (quiteDay >= 0.75 ? 1 : 0.5)
              row[column.property] = Math.floor(row[column.property] / 1) + quiteDay
              bsTable.cellOptionCallBack(params, { value, $event, renderOpts })
            }
          }
        })
      ]
    },
    renderItem(h, renderOpts, { $form, property, data, item }) {
      let { props } = renderOpts
      props = props || {}
      if ($form.$parent.editable !== false) {
        return [
          h('vxe-input', {
            ref: 'vxe-input' + property,
            props: {
              placeholder: '请输入天数',
              type: 'number',
              clearable: true,
              value: data[property] + '',
              controls: false,
              ...props,
              disabled: props.disabled || props.editable === false
            },
            scopedSlots: Object.assign({},
              renderOpts.slots && renderOpts.slots.prefix ? {
                prefix: props => {
                  return (
                    <vxe-tooltip leaveDelay={0} placement="top" content={typeof (renderOpts.slots.prefix) === 'object' ? renderOpts.slots.prefix.tip : renderOpts.slots.prefix} enterable>
                      <i class={typeof (renderOpts.slots.prefix) === 'object' && renderOpts.slots.prefix.ico ? 'fa ' + renderOpts.slots.prefix.ico : 'fa vxe-icon--info'}></i>
                    </vxe-tooltip>
                  )
                }
              } : {},
              renderOpts.slots && renderOpts.slots.prefix.suffix ? {
                suffix: props => {
                  return (
                    <div style="line-height: 30px;">
                      {props.info.title}
                    </div>
                  )
                }
              } : {}),
            on: {
              change({ value, $event }) {
                if ('number|integer|float'.indexOf(props.type || 'number') >= 0) {
                  value = $form.$parent.transInputToNumber($event.currentTarget.value)
                  $event.currentTarget.value = value
                  data[property] = value
                } else {
                  data[property] = value
                }
              },
              blur({ value }) {
                let quiteDay = data[property] % 1
                quiteDay = quiteDay <= 0.25 ? 0 : (quiteDay >= 0.75 ? 1 : 0.5)
                data[property] = Math.floor(data[property] / 1) + quiteDay
                $form.$parent.itemChange({ $form, property, itemValue: value, data, renderOpts })
              }
            }
          })
        ]
      } else {
        if ($form.$parent.uneditableBorder) {
          return [<span class="text tl border-text">{data[property]}</span>]
        } else {
          return [<span class="text"> {data[property]} </span>]
        }
      }
    }
  },
  $vxeTime: {
    autofocus: '.vxe-input--inner',
    // 时间格式化渲染器
    renderCell(h, { props }, { row, column }, context) {
      props = props || {}
      props.format = props.format || 'YYYY-MM-DD hh:mm:ss'
      let dateTime = (row[column.property] + '').replace(/null|undefined/ig, '')
      if (dateTime) {
        let date = dateTime.length === 8 ? dateTime.substring(0, 4) + '-' + dateTime.substring(4, 6) + '-' + dateTime.substring(6, 8) : (dateTime.length === 14 ? dateTime.substring(0, 4) + '-' + dateTime.substring(4, 6) + '-' + dateTime.substring(6, 8) + ' ' + dateTime.substring(8, 10) + ':' + dateTime.substring(10, 12) + ':' + dateTime.substring(12, 14) : dateTime)
        row[column.property + '__viewSort'] = isNaN(new Date(dateTime).getTime()) ? new Date(date).format(props.format) : new Date(dateTime).format(props.format)
      } else {
        row[column.property + '__viewSort'] = ''
      }
      return [<span>{context.$grid.$parent.getHighlightedFilterText(row[column.property + '__viewSort'])}</span>]
    },
    renderDefault(h, { props }, { row, column }, context) {
      props = props || {}
      props.format = props.format || 'YYYY-MM-DD hh:mm:ss'
      let dateTime = (row[column.property] + '').replace(/null|undefined/ig, '')
      if (dateTime) {
        let date = dateTime.length === 8 ? dateTime.substring(0, 4) + '-' + dateTime.substring(4, 6) + '-' + dateTime.substring(6, 8) : (dateTime.length === 14 ? dateTime.substring(0, 4) + '-' + dateTime.substring(4, 6) + '-' + dateTime.substring(6, 8) + ' ' + dateTime.substring(8, 10) + ':' + dateTime.substring(10, 12) + ':' + dateTime.substring(12, 14) : dateTime)
        row[column.property + '__viewSort'] = isNaN(new Date(dateTime).getTime()) ? new Date(date).format(props.format) : new Date(dateTime).format(props.format)
      } else {
        row[column.property + '__viewSort'] = ''
      }
      return [<span>{context.$grid.$parent.getHighlightedFilterText(row[column.property + '__viewSort'])}</span>]
    },
    renderEdit(h, renderOpts, params, context) {
      let { row, column } = params
      let { props = {} } = renderOpts
      props.format = props.format || 'YYYY-MM-DD hh:mm:ss'
      let cellValue = row[column.property]
      let dateTime = (row[column.property] + '').replace(/null|undefined/ig, '')
      if (dateTime) {
        let date = dateTime.length === 8 ? dateTime.substring(0, 4) + '-' + dateTime.substring(4, 6) + '-' + dateTime.substring(6, 8) : (dateTime.length === 14 ? dateTime.substring(0, 4) + '-' + dateTime.substring(4, 6) + '-' + dateTime.substring(6, 8) + ' ' + dateTime.substring(8, 10) + ':' + dateTime.substring(10, 12) + ':' + dateTime.substring(12, 14) : dateTime)
        cellValue = isNaN(new Date(dateTime).getTime()) ? new Date(date).format(props.format) : new Date(dateTime).format(props.format)
      } else {
        cellValue = ''
      }
      let bsTable = context.$grid.$parent
      return [
        h('vxe-input', {
          ref: 'vxe-input' + column.property,
          props: {
            placeholder: '请选择时间',
            type: 'date',
            clearable: true,
            value: cellValue + '',
            controls: false,
            ...props,
            transfer: true
          },
          scopedSlots: Object.assign({},
            renderOpts.slots && renderOpts.slots.prefix ? {
              prefix: props => {
                return (
                  <vxe-tooltip leaveDelay={0} placement="top" content={typeof (renderOpts.slots.prefix) === 'object' ? renderOpts.slots.prefix.tip : renderOpts.slots.prefix} enterable>
                    <i class={typeof (renderOpts.slots.prefix) === 'object' && renderOpts.slots.prefix.ico ? 'fa ' + renderOpts.slots.prefix.ico : 'fa vxe-icon--info'}></i>
                  </vxe-tooltip>
                )
              }
            } : {},
            renderOpts.slots && renderOpts.slots.prefix.suffix ? {
              suffix: props => {
                return (
                  <vxe-tooltip leaveDelay={0} placement="top" content={typeof (renderOpts.slots.suffix) === 'object' ? renderOpts.slots.suffix.tip : renderOpts.slots.suffix} enterable>
                    <i class={typeof (renderOpts.slots.suffix) === 'object' && renderOpts.slots.suffix.ico ? 'fa ' + renderOpts.slots.suffix.ico : 'fa vxe-icon--warning'}></i>
                  </vxe-tooltip>
                )
              }
            } : {}),
          on: {
            input(value) {
              row[column.property + '__viewSort'] = value ? new Date(value).format(props.format) : ''
              row[column.property] = row[column.property + '__viewSort']
            },
            blur({ value, $event }) {
              row[column.property + '__viewSort'] = value ? new Date(value).format(props.format) : ''
              row[column.property] = row[column.property + '__viewSort']
              bsTable.cellOptionCallBack(params, { value: row[column.property + '__viewSort'], $event, renderOpts })
            }
          }
        })
      ]
    },
    renderItem(h, renderOpts, { $form, property, data }) {
      let { props } = renderOpts
      props = props || {}
      props.format = props.format || 'YYYY-MM-DD hh:mm:ss'
      let dateTime = (data[property] + '').replace(/null|undefined/ig, '')
      if (dateTime) {
        let date = dateTime.length === 8 ? dateTime.substring(0, 4) + '-' + dateTime.substring(4, 6) + '-' + dateTime.substring(6, 8) : (dateTime.length === 14 ? dateTime.substring(0, 4) + '-' + dateTime.substring(4, 6) + '-' + dateTime.substring(6, 8) + ' ' + dateTime.substring(8, 10) + ':' + dateTime.substring(10, 12) + ':' + dateTime.substring(12, 14) : dateTime)
        data[property + '__viewSort'] = isNaN(new Date(dateTime).getTime()) ? new Date(date).format(props.format) : new Date(dateTime).format(props.format)
      } else {
        data[property + '__viewSort'] = ''
      }
      if ($form.$parent.editable !== false) {
        return [
          h('vxe-input', {
            ref: 'vxe-input' + property,
            props: {
              placeholder: '请选择时间',
              type: 'date',
              clearable: true,
              value: data[property + '__viewSort'] + '',
              controls: false,
              ...props,
              disabled: props.disabled || props.editable === false,
              transfer: true
            },
            scopedSlots: Object.assign({},
              renderOpts.slots && renderOpts.slots.prefix ? {
                prefix: props => {
                  return (
                    <vxe-tooltip leaveDelay={0} placement="top" content={typeof (renderOpts.slots.prefix) === 'object' ? renderOpts.slots.prefix.tip : renderOpts.slots.prefix} enterable>
                      <i class={typeof (renderOpts.slots.prefix) === 'object' && renderOpts.slots.prefix.ico ? 'fa ' + renderOpts.slots.prefix.ico : 'fa vxe-icon--info'}></i>
                    </vxe-tooltip>
                  )
                }
              } : {},
              renderOpts.slots && renderOpts.slots.prefix.suffix ? {
                suffix: props => {
                  return (
                    <vxe-tooltip leaveDelay={0} placement="top" content={typeof (renderOpts.slots.suffix) === 'object' ? renderOpts.slots.suffix.tip : renderOpts.slots.suffix} enterable>
                      <i class={typeof (renderOpts.slots.suffix) === 'object' && renderOpts.slots.suffix.ico ? 'fa ' + renderOpts.slots.suffix.ico : 'fa vxe-icon--warning'}></i>
                    </vxe-tooltip>
                  )
                }
              } : {}),
            on: {
              change({ value, $event }) {
                data[property + '__viewSort'] = value ? new Date(value).format(props.format) : ''
                // eslint-disable-next-line no-useless-escape
                data[property] = data[property + '__viewSort']
                // data[property] = data[property + '__viewSort'].replace(/[-\/:\s]/ig, '')
                $form.$parent.itemChange({ $form, property, itemValue: data[property], itemViewValue: data[property + '__viewSort'], data, renderOpts })
              }
            }
          })
        ]
      } else {
        if ($form.$parent.uneditableBorder) {
          return [<span class="text tl border-text">{data[property + '__viewSort']}</span>]
        } else {
          return [<span class="text"> {data[property + '__viewSort']} </span>]
        }
      }
    }
  },
  $vxeRadio: {
    renderEdit(h, renderOpts, params, context) {
      let { options, props, propsC } = renderOpts
      let { row, column } = params
      let bsTable = context.$grid.$parent
      props = props || {}
      propsC = propsC || {}
      return [
        h('vxe-radio-group', {
          props: {
            value: String(row[column.property]),
            placeholder: '请选择',
            ...props
          },
          on: {
            change({ $event, label }) {
              row[column.property] = label
              bsTable.cellOptionCallBack(params, { value: String(row[column.property]), $event, renderOpts })
            }
          }
        }, options.map(item => {
          return h('vxe-radio', {
            props: {
              disabled: item.disabled,
              label: item.value,
              ...propsC
            }
          }, item.label)
        }))
      ]
    },
    renderDefault(h, { options, props }, { row, column }, context) {
      let value = ''
      options.forEach((item, index) => {
        if (row[column.property] + '' === item.value + '') {
          value = item.label
        }
      })
      row[column.property + '__viewSort'] = value
      return [<span>{context.$grid.$parent.getHighlightedFilterText(row[column.property + '__viewSort'])}</span>]
    },
    renderCell(h, { options, props }, { row, column }, context) {
      let value = ''
      options.forEach((item, index) => {
        if (row[column.property] + '' === item.value + '') {
          value = item.label
        }
      })
      row[column.property + '__viewSort'] = value
      return [<span>{context.$grid.$parent.getHighlightedFilterText(row[column.property + '__viewSort'])}</span>]
    },
    renderItem(h, renderOpts, { $form, property, data }) {
      let { props, propsC, options } = renderOpts
      if ($form.$parent.editable !== false) {
        return [
          h('vxe-radio-group', {
            props: {
              value: String(data[property]),
              ...props
            },
            on: {
              change({ $event, label }) {
                data[property] = label
                $form.$parent.itemChange({ $form, property, itemValue: label, data, renderOpts })
              }
            }
          }, options.map(item => {
            return h('vxe-radio', {
              props: {
                disabled: item.disabled || props.editable === false,
                label: String(item.value),
                ...propsC
              }
            }, item.label)
          }))
        ]
      } else {
        return [
          h('vxe-radio-group', {
            props: {
              value: data[property] + '',
              ...props
            },
            on: {
              change({ $event, label }) {
                data[property] = label
                $form.$parent.itemChange({ $form, property, itemValue: label, data, renderOpts })
              }
            }
          }, options.map(item => {
            return h('vxe-radio', {
              props: {
                disabled: true,
                label: String(item.value),
                ...propsC
              }
            }, item.label)
          }))
        ]
      }
    }
  },
  $vxeEditDownJson: {
    autofocus: '.vxe-input--inner',
    renderEdit(h, renderOpts, params) {
      return [
        <edit-down-json type={'table'} params={params} ></edit-down-json>
      ]
    },
    renderDefault(h, cellRender, { row, column }, context) {
      let value = JSON.stringify(row[column.property])
      row[column.property + '__viewSort'] = value
      return [<span class="text">{value}</span>]
    },
    renderCell(h, cellRender, { row, column }, context) {
      let value = JSON.stringify(row[column.property])
      row[column.property + '__viewSort'] = value
      return [<span class="text">{value}</span>]
    },
    renderItem(h, renderOpts, params) {
      const { $form, property, data } = params
      const { props } = renderOpts
      if ($form.$parent.editable !== false && props.editable !== false) {
        return [
          h('edit-down-json', {
            props: {
              params: params
            },
            on: {
              input(value) {
                defaultGloabalUtils.debounceItemChange(() => {
                  $form.$parent.itemChange({ $form, property, itemValue: value, data, renderOpts })
                })
              }
            }
          })
        ]
      } else {
        return [
          <edit-down-json type={'form'} params={params}></edit-down-json>
        ]
      }
    }
  },
  $vxeIntervar: {
    autofocus: '.vxe-input--inner',
    // 阶段选择 渲染器 基础版本
    renderDefault(h, { props }, params, context) {
      const { row, column } = params
      const propertyArr = column.property.split('##')
      row[column.property] = row[propertyArr[0]] + '##' + row[propertyArr[1]]
      row[column.property + '__viewSort'] = row[propertyArr[0]] + '至' + row[propertyArr[1]]
      return [
        <EditIntervarInput filterText={context.filtertext} constProps={props} params={params} type='table' editable={false}></EditIntervarInput>
      ]
    },
    renderCell(h, { props }, params, context) {
      const { row, column } = params
      const propertyArr = column.property.split('##')
      row[column.property] = row[propertyArr[0]] + '##' + row[propertyArr[1]]
      row[column.property + '__viewSort'] = row[propertyArr[0]] + '至' + row[propertyArr[1]]
      return [
        <EditIntervarInput filterText={context.filtertext} constProps={props} params={params} type='table' editable={false}></EditIntervarInput>
      ]
    },
    renderEdit(h, { props }, params) {
      return [
        <EditIntervarInput constProps={props} params={params} type='table' editable={true}></EditIntervarInput>
      ]
    },
    renderItem(h, renderOpts, params) {
      const { $form, property, data } = params
      const { props } = renderOpts
      const propertyArr = property.split('##')
      if ($form.$parent.editable !== false) {
        return [
          h('EditIntervarInput', {
            props: {
              value: data[property],
              constProps: props,
              params: params,
              type: 'form',
              editable: true
            },
            on: {
              input(value) {
                const valueArr = value.split('##')
                $form.$parent.itemChange({
                  $form,
                  property,
                  itemValue: {
                    [propertyArr[0]]: valueArr[0],
                    [propertyArr[1]]: valueArr[1]
                  },
                  data,
                  renderOpts
                })
              }
            }
          })
        ]
      } else {
        if ($form.$parent.uneditableBorder) {
          return [
            <span class="text tl border-text">
              <EditIntervarInput constProps={props} params={params} type='form' editable={false}></EditIntervarInput>
            </span>
          ]
        } else {
          return [<EditIntervarInput constProps={props} params={params} type='form' editable={false}></EditIntervarInput>]
        }
      }
    }
  },
  $vxeSwitch: {
    // 开关
    // props: {
    //   options: [
    //     { label: '是', value: 1 },
    //     { label: '否', value: 0 }
    //   ]
    // }
    renderCell(h, { props, options }, { row, column }) {
      return [
        <vxe-switch v-model={row[column.property]} open-label={options[0].label} close-label={options[1].label} open-value={options[0].value} close-value={options[1].value} disabled></vxe-switch>
      ]
    },
    renderDefault(h, { props, options }, { row, column }) {
      return [
        <vxe-switch v-model={row[column.property]} open-label={options[0].label} close-label={options[1].label} open-value={options[0].value} close-value={options[1].value} disabled></vxe-switch>
      ]
    },
    renderEdit(h, renderOpts, params, context) {
      let { options } = renderOpts
      let { row, column } = params
      let bsTable = context.$grid.$parent
      // return [
      //   <vxe-switch v-model={row[column.property]} open-label={options[0].label} close-label={options[1].label} open-value={options[0].value} close-value={options[1].value}></vxe-switch>
      //   // <el-switch
      //   //   {...{ props }}
      //   //   active-text={ options[0].label }
      //   //   inactive-text={ options[1].label }
      //   //   v-model={row[column.property]}
      //   //   active-color="#13ce66"
      //   //   active-value={ options[0].value }
      //   //   inactive-value={ options[1].value }>
      //   // </el-switch>
      // ]
      return [
        h('vxe-switch', {
          props: {
            value: row[column.property],
            openLabel: options[0].label,
            closeLabel: options[1].label,
            openValue: options[0].value,
            closeValue: options[1].value
          },
          on: {
            change({ value, $event }) {
              row[column.property] = value
              bsTable.cellOptionCallBack(params, { value: value, $event, renderOpts })
            }
          }
        })
      ]
    },
    renderItem(h, renderOpts, params) {
      const { $form, property, data } = params
      const { props = {} } = renderOpts
      const { options } = renderOpts
      if ($form.$parent.editable !== false) {
        return [
          h('vxe-switch', {
            props: {
              disabled: props.disabled || props.editable === false,
              value: data[property],
              openLabel: options[0].label,
              closeLabel: options[1].label,
              openValue: options[0].value,
              closeValue: options[1].value
            },
            on: {
              change({ value, $event }) {
                data[property] = value
                $form.$parent.itemChange({
                  $form,
                  property,
                  itemValue: value,
                  data,
                  renderOpts
                })
              }
            }
          })
        ]
      } else {
        return [
          h('vxe-switch', {
            props: {
              value: data[property],
              openLabel: options[0].label,
              closeLabel: options[1].label,
              openValue: options[0].value,
              closeValue: options[1].value,
              disabled: true
            },
            on: {
              change({ value, $event }) {
              }
            }
          })
        ]
      }
    }
  },
  $vxeProgress: {
    // 进度条
    renderCell(h, { props, options }, { row, column }) {
      let val = parseFloat((row[column.property] + '').replace(/null|undefined|NaN|Infinity\s+/ig, ''))
      val = isNaN(val) ? 0 : val
      return [
        <el-progress text-inside={true} stroke-width={20} percentage={val} style="line-height:30px"></el-progress>
      ]
    },
    renderDefault(h, { props, options }, { row, column }) {
      let val = parseFloat((row[column.property] + '').replace(/null|undefined|NaN|Infinity\s+/ig, ''))
      val = isNaN(val) ? 0 : val
      return [
        <el-progress text-inside={true} stroke-width={20} percentage={val} style="line-height:30px"></el-progress>
      ]
    },
    renderEdit(h, { props, options }, { row, column }) {
      let val = parseFloat((row[column.property] + '').replace(/null|undefined|NaN|Infinity\s+/ig, ''))
      val = isNaN(val) ? 0 : val
      return [
        <el-progress text-inside={true} stroke-width={20} percentage={val} style="line-height:30px"></el-progress>
      ]
    },
    renderItem(h, renderOpts, params) {
      const { property, data } = params
      let value = parseFloat((data[property] + '').replace(/null|undefined|NaN|Infinity|\s+/ig, ''))
      data[property] = isNaN(value) ? 0 : value
      return [
        <el-progress text-inside={true} stroke-width={20} percentage={data[data.property]} style="line-height:30px"></el-progress>
      ]
    }
  },
  $vxeEditDownConditions: {
    autofocus: '.vxe-input--inner',
    renderEdit(h, { name, options, props }, params) {
      return [
        <edit-down-conditions constProps={props} params={params} type='table'></edit-down-conditions>
      ]
    },
    renderDefault(h, cellRender, { row, column }, context) {
      row[column.property + '__viewSort'] = row[column.property]
      return [<span class="text">{row[column.property]}</span>]
    },
    renderCell(h, cellRender, { row, column }, context) {
      row[column.property + '__viewSort'] = row[column.property]
      return [<span class="text">{row[column.property]}</span>]
    },
    renderItem(h, renderOpts, params) {
      const { props } = renderOpts
      const { $form, property, data } = params
      if ($form.$parent.editable !== false && props.editable !== false) {
        return [
          h('edit-down-conditions', {
            props: {
              constProps: props,
              params: params,
              type: 'form'
            },
            on: {
              input(value) {
                $form.$parent.itemChange({ $form, property, itemValue: value, data, renderOpts })
              }
            }
          })
        ]
      } else {
        return [
          <edit-down-conditions constProps={props} params={params} type='form'></edit-down-conditions>
        ]
      }
    }
  },
  $vxeRenderConditions: { // 条件联动渲染器
    renderDefault(h, renderOpts, params, context) {
      let self = context.$grid.$parent
      const { props = {} } = renderOpts
      const { row, column } = params
      const { options = {}, format } = props
      let renderOption = props.default || {
        name: '$vxeInput',
        conditionsProps: {
        },
        props: {
          type: 'text',
          placeholder: '请录入' + column.title
        }
      }
      if (format) {
        renderOption = defaultGloabalUtils.deepCopy(options[defaultGloabalUtils.format(format, row, self.publicData.rowPublicData)])
      }
      if (!renderOption && options['default']) {
        renderOption = options['default']
      }

      renderOption = defaultGloabalUtils.deepCopy(renderOption)
      Object.assign(row, renderOption.linkageValue || {})
      renderOption.props = Object.assign(renderOption.props || {}, defaultGloabalUtils.parseConditions(renderOption.conditionsProps, row, self.publicData.rowPublicData))
      return defaultPublicRenders[renderOption.name].renderItem(h, renderOption, params, context)
    },
    renderCell(h, renderOpts, params, context) {
      let self = context.$grid.$parent
      const { props = {} } = renderOpts
      const { row, column } = params
      const { options = {}, format } = props
      let renderOption = props.default || {
        name: '$vxeInput',
        conditionsProps: {
        },
        props: {
          type: 'text',
          placeholder: '请录入' + column.title
        }
      }
      if (format) {
        renderOption = defaultGloabalUtils.deepCopy(options[defaultGloabalUtils.format(format, row, self.publicData.rowPublicData)])
      }
      if (!renderOption && options['default']) {
        renderOption = options['default']
      }

      renderOption = defaultGloabalUtils.deepCopy(renderOption)
      Object.assign(row, renderOption.linkageValue || {})
      renderOption.props = Object.assign(renderOption.props || {}, defaultGloabalUtils.parseConditions(renderOption.conditionsProps, row, self.publicData.rowPublicData))
      return defaultPublicRenders[renderOption.name].renderCell(h, renderOption, params, context)
    },
    renderEdit(h, renderOpts, params, context) {
      let self = context.$grid.$parent
      const { props = {} } = renderOpts
      const { row, column } = params
      const { options = {}, format } = props
      let renderOption = props.default || {
        name: '$vxeInput',
        conditionsProps: {
        },
        props: {
          type: 'text',
          placeholder: '请录入' + column.title
        }
      }
      if (format) {
        renderOption = defaultGloabalUtils.deepCopy(options[defaultGloabalUtils.format(format, row, self.publicData.rowPublicData)])
      }
      if (!renderOption && options['default']) {
        renderOption = options['default']
      }

      renderOption = defaultGloabalUtils.deepCopy(renderOption)
      Object.assign(row, renderOption.linkageValue || {})
      renderOption.props = Object.assign(renderOption.props || {}, defaultGloabalUtils.parseConditions(renderOption.conditionsProps, row, self.publicData.rowPublicData))
      return defaultPublicRenders[renderOption.name].renderEdit(h, renderOption, params, context)
    },
    renderItem(h, renderOpts, params, context) {
      const { props = {} } = renderOpts
      const { data, item } = params
      const { options = {}, format } = props
      let renderOption = props.default || {
        name: '$vxeInput',
        conditionsProps: {
        },
        props: {
          type: 'text',
          placeholder: '请录入' + item.title
        }
      }
      if (format) {
        renderOption = defaultGloabalUtils.deepCopy(options[defaultGloabalUtils.format(format, data)])
      }
      if (!renderOption && options['default']) {
        renderOption = options['default']
      }

      renderOption = defaultGloabalUtils.deepCopy(renderOption)
      Object.assign(data, renderOption.linkageValue || {})
      renderOption.props = Object.assign(renderOption.props || {}, defaultGloabalUtils.parseConditions(renderOption.conditionsProps, data))
      return defaultPublicRenders[renderOption.name].renderItem(h, renderOption, params, context)
    }
  }
}
// 全局提供表格特有渲染器 5组，分别为：手动排序渲染器，超链接渲染器，嵌套表渲染器，空数据渲染器，操作列渲染器,基础三列分级信息表专用组件。
// 评测设计阶段渲染器1组，为动态项定制渲染器（评测和developing），
const defaultTableRenderers = {
  // 表格特有全局渲染器
  $vxeTableOptionSort: {
    // 固定手动排序渲染
    renderDefault(h, cellRender, { $columnIndex, $rowIndex, items, column, data, row, $seq, columnIndex, isEdit, level, rowIndex, seq }, { $excel, $grid, $table, $type }) {
      let self = $grid.$parent
      // <a class="optionRow" href={row.link}>{'操作' + row[column.property]}</a>
      return [
        <div class="row-dragsort-option row-option-group">
          <a class="optionRow-upSort fn-inline" onClick={() => self.onOptionSortRowClick({ row, column, $rowIndex, data, items, optionType: 'upSort' })}>上移</a>
          <a class="optionRow-downSort fn-inline" onClick={() => self.onOptionSortRowClick({ row, column, $rowIndex, data, items, optionType: 'downSort' })}>下移</a>
          <a class="optionRow-topSort fn-inline" onClick={() => self.onOptionSortRowClick({ row, column, $rowIndex, data, items, optionType: 'topSort' })}>置顶</a>
          <a class="optionRow-bottomSort fn-inline" onClick={() => self.onOptionSortRowClick({ row, column, $rowIndex, data, items, optionType: 'bottomSort' })}>置底</a>
        </div>
      ]
    }
  },
  $vxeTableHref: {
    // 文本渲染
    renderDefault(h, renderOpts, { row, column }, context) {
      return [<span class="text href-a"><a>{context.$grid.$parent.getHighlightedFilterText(row[column.property])}</a></span>]
    },
    renderCell(h, renderOpts, { row, column }, context) {
      return [<span class="text href-a"><a>{context.$grid.$parent.getHighlightedFilterText(row[column.property])}</a></span>]
    },
    renderEdit(h, renderOpts, { row, column }, context) {
      return [<span class="text href-a"><a>{context.$grid.$parent.getHighlightedFilterText(row[column.property])}</a></span>]
    }
  },
  $vxeTableContentTable: {
    renderExpand(h, { props }, params, context) {
      // const tableConfig = {
      //   globalConfig: { // 全局默认渲染列配置
      //     // 全局配置
      //     checkType: '',
      //     seq: false
      //   }
      // }
      // return [
      //   <BsTable toolbarConfig={false} pagerConfig={false} tableConfig={ tableConfig } { ...{ props }} height="unset" tableColumnsConfig={ row.childCols } tableData={ row.childData }></BsTable>
      // ]
      let { row } = params
      let propsN = Object.assign({}, context.$grid.$parent.contentTableConfig, props)
      return [
        h('BsTable', {
          props: {
            ref: '',
            ...propsN,
            height: 'unset',
            tableColumnsConfig: row.childCols,
            tableData: row.childData
          },
          on: {
            ProxyEvent() {
              let arg = [...arguments]
              context.$grid.$parent.$emit('ProxyEventContentTable', arg[0], Object.assign(arg[1], { ParentsParams: params }), ...arg.slice(2))
            }
          }
        })
      ]
    }
  },
  $vxeNotData: {
    // 空内容模板
    renderEmpty(h, renderOpts) {
      return [
        <div>
          <span>
            <p>亲，没有更多数据了！</p>
          </span>
        </div>
      ]
    }
  },
  $vxeTableOptionRow: {
    // 操作列渲染
    renderDefault(h, renderOpts, params, context) {
      let self = context.$grid.$parent
      const { props } = renderOpts
      const { row, column } = params
      const { statusField, options, format } = props
      let renderOption = options[row[statusField] || column.field]
      if (format) {
        renderOption = options[defaultGloabalUtils.format(format, row, self.publicData.rowPublicData)]
      }
      if (renderOption) {
        return [
          <div class="row-option row-option-group">
            {
              renderOption.map((item, index) => {
                if (item.type === 'button') {
                  return <vxe-button class={item.class || ''} status={item.btnStatus} on-click={() => self.onOptionRowClick({ row, column, optionType: item.code })}>{item.label}</vxe-button>
                } else {
                  return <a title={item.label} class={'fn-inline f14 ' + item.class || 'fn-inline f14'} status={item.btnStatus} onClick={() => self.onOptionRowClick({ row, column, optionType: item.code })}>{item.label}</a>
                }
              })
            }
          </div>
        ]
      } else {
        renderOption = options['default']
        if (renderOption) {
          return [
            <div class="row-option row-option-group">
              {
                renderOption.map((item, index) => {
                  if (item.type === 'button') {
                    return <vxe-button class={item.class || ''} status={item.btnStatus} on-click={() => self.onOptionRowClick({ row, column, optionType: item.code })}>{item.label}</vxe-button>
                  } else {
                    return <a title={item.label} class={'fn-inline f14 ' + item.class || 'fn-inline f14'} status={item.btnStatus} onClick={() => self.onOptionRowClick({ row, column, optionType: item.code })}>{item.label}</a>
                  }
                })
              }
            </div>
          ]
        } else {
          return ''
        }
      }
    },
    renderCell(h, renderOpts, params, context) {
      let self = context.$grid.$parent
      const { props } = renderOpts
      const { row, column } = params
      const { statusField, options } = props
      let renderOption = options[row[statusField] || column.property]
      if (renderOption) {
        return [
          <div class="row-option row-option-group">
            {
              renderOption.map((item, index) => {
                if (item.type === 'button') {
                  return <vxe-button class={item.class || ''} status={item.btnStatus} on-click={() => self.onOptionRowClick({ row, column, optionType: item.code })}>{item.label}</vxe-button>
                } else {
                  return <a title={item.label} class={'fn-inline f14 ' + item.class || 'fn-inline f14'} status={item.btnStatus} onClick={() => self.onOptionRowClick({ row, column, optionType: item.code })}>{item.label}</a>
                }
              })
            }
          </div>
        ]
      } else {
        renderOption = options['default']
        if (renderOption) {
          return [
            <div class="row-option row-option-group">
              {
                renderOption.map((item, index) => {
                  if (item.type === 'button') {
                    return <vxe-button class={item.class || ''} status={item.btnStatus} on-click={() => self.onOptionRowClick({ row, column, optionType: item.code })}>{item.label}</vxe-button>
                  } else {
                    return <a title={item.label} class={'fn-inline f14 ' + item.class || 'fn-inline f14'} status={item.btnStatus} onClick={() => self.onOptionRowClick({ row, column, optionType: item.code })}>{item.label}</a>
                  }
                })
              }
            </div>
          ]
        } else {
          return ''
        }
      }
    },
    renderEdit(h, renderOpts, params, context) {
      let self = context.$grid.$parent
      const { props } = renderOpts
      const { row, column } = params
      const { statusField, options } = props
      let renderOption = options[row[statusField] || column]
      if (renderOption) {
        return [
          <div class="row-option row-option-group">
            {
              renderOption.map((item, index) => {
                if (item.type === 'button') {
                  return <vxe-button class={item.class || ''} status={item.btnStatus} on-click={() => self.onOptionRowClick({ row, column, optionType: item.code })}>{item.label}</vxe-button>
                } else {
                  return <a title={item.label} class={'fn-inline f14 ' + item.class || 'fn-inline f14'} status={item.btnStatus} onClick={() => self.onOptionRowClick({ row, column, optionType: item.code })}>{item.label}</a>
                }
              })
            }
          </div>
        ]
      } else {
        renderOption = options['default']
        if (renderOption) {
          return [
            <div class="row-option row-option-group">
              {
                renderOption.map((item, index) => {
                  if (item.type === 'button') {
                    return <vxe-button class={item.class || ''} status={item.btnStatus} on-click={() => self.onOptionRowClick({ row, column, optionType: item.code })}>{item.label}</vxe-button>
                  } else {
                    return <a title={item.label} class={'fn-inline f14 ' + item.class || 'fn-inline f14'} status={item.btnStatus} onClick={() => self.onOptionRowClick({ row, column, optionType: item.code })}>{item.label}</a>
                  }
                })
              }
            </div>
          ]
        } else {
          return ''
        }
      }
    }
  },
  $vxeTableCustomRender: {
    // 通用自定义渲染（developing）
    renderDefault(h, renderOpts, params, context) {
      const { column } = params
      // <template slot-scope="{ row, index }" slot="dateNo"></template>
      return [
        <div class="table-custom-render">
          <slot name={'CellDefaultSlot' + column.property} params={params}></slot>
        </div>
      ]
    },
    renderCell(h, renderOpts, params, context) {
      const { column } = params
      // <template slot-scope="{ row, index }" slot="dateNo"></template>
      const bsTable = context.$grid.$parent
      let $scopedSlots = bsTable.$scopedSlots
      if ($scopedSlots[column.field + 'SlotCell']) {
        return h('div',
          {
            attrs: {
              class: 'cell-custom'
            }
          },
          $scopedSlots[column.field + 'SlotCell'](params, context)
        )
      } else if (typeof column.own.customCellRender === 'function') {
        return h('div',
          {
            attrs: {
              class: 'cell-custom'
            }
          },
          column.own.customCellRender(h, renderOpts, params, context)
        )
      }
    },
    renderEdit(h, renderOpts, params, context) {
      const { column } = params
      // <template slot-scope="{ row, index }" slot="dateNo"></template>
      return [
        <div class="table-custom-render">
          <slot name={'CellEditSlot' + column.property} params={params}></slot>
        </div>
      ]
    },
    renderItem(h, renderOpts, params, context) {
      const { property } = params
      // <template slot-scope="{ row, index }" slot="dateNo"></template>
      return [
        <div class="table-custom-render">
          <slot name={'itemSlot' + property} params={params}></slot>
        </div>
      ]
    }
  },
  $vxeRowCellRenderer: {
    // 列渲染器
    renderCell(h, renderOpts, { row, column }, context) {
      if (row[column.property + 'renderOpts'].name) {
        return defaultPublicRenders[row[column.property + '__renderOpts'].name].renderCell(h, row[column.property + '__renderOpts'], { row, column }, context)
      } else {
        return defaultPublicRenders[renderOpts.name] ? defaultPublicRenders[renderOpts.name].renderCell(h, row[column.property + '__renderOpts'], { row, column }, context) : ''
      }
    },
    renderEdit(h, renderOpts, { row, column }, context) {
      if (row[column.property + '__renderOpts'].name) {
        return defaultPublicRenders[row[column.property + '__renderOpts'].name].renderEdit(h, row[column.property + '__renderOpts'], { row, column }, context)
      } else {
        return defaultPublicRenders[renderOpts.name] ? defaultPublicRenders[renderOpts.name].renderEdit(h, row[column.property + '__renderOpts'], { row, column }, context) : ''
      }
    },
    renderDefault(h, renderOpts, { row, column }, context) {
      if (row[column.property + '__renderOpts'].name) {
        return defaultPublicRenders[row[column.property + 'renderOpts'].name].renderDefault(h, row[column.property + '__renderOpts'], { row, column }, context)
      } else {
        return defaultPublicRenders[renderOpts.name] ? defaultPublicRenders[renderOpts.name].renderDefault(h, row[column.property + '__renderOpts'], { row, column }, context) : ''
      }
    }
  },
  $vxeBasicInfoRenderer: { // 基础信息渲染器
    renderCell(h, renderOpts, { row, column }, context) {
      let mode = context.$grid.$parent.$parent.mode
      let curRendermap = context.$grid.$parent.$parent.tableRenderMap.map[row['mapid']]
      let render = curRendermap.render
      if (mode === 'edit') {
        if (render && curRendermap.editable) {
          return defaultPublicRenders[render.name].renderEdit(h, render, { row, column }, context)
        } else if (!render && curRendermap.editable) {
          return defaultPublicRenders['$vxeInput'].renderEdit(h, {}, { row, column }, context)
        } else if (render && defaultPublicRenders[render.name]) {
          return defaultPublicRenders[render.name].renderCell(h, render, { row, column }, context)
        } else {
          return defaultPublicRenders['$vxeInput'].renderCell(h, {}, { row, column }, context)
        }
      } else {
        if (render && defaultPublicRenders[render.name]) {
          return defaultPublicRenders[render.name].renderCell(h, render, { row, column }, context)
        } else {
          return defaultPublicRenders['$vxeInput'].renderCell(h, {}, { row, column }, context)
        }
      }
    },
    renderEdit(h, renderOpts, { row, column }, context) {
      let mode = context.$grid.$parent.$parent.mode
      let curRendermap = context.$grid.$parent.$parent.tableRenderMap.map[row['mapid']]
      let render = curRendermap.render
      if (mode !== 'detail') {
        if (render && curRendermap.editable) {
          return defaultPublicRenders[render.name].renderEdit(h, render, { row, column }, context)
        } else if (!render && curRendermap.editable) {
          return defaultPublicRenders['$vxeInput'].renderEdit(h, {}, { row, column }, context)
        } else if (render && !curRendermap.editable) {
          return defaultPublicRenders[render.name].renderCell(h, render, { row, column }, context)
        } else {
          return defaultPublicRenders['$vxeInput'].renderCell(h, {}, { row, column }, context)
        }
      } else {
        if (render) {
          return defaultPublicRenders[render.name].renderCell(h, render, { row, column }, context)
        } else {
          defaultPublicRenders['$vxeInput'].renderCell(h, {}, { row, column }, context)
        }
      }
    },
    renderDefault(h, renderOpts, { row, column }, context) {
      let editable = context.$grid.$parent.$parent.mode
      let curRendermap = context.$grid.$parent.$parent.tableRenderMap.map[row['mapid']]
      let render = curRendermap.render
      if (editable !== 'detail') {
        if (render && editable && curRendermap.editable) {
          return defaultPublicRenders[render.name].renderEdit(h, render, { row, column }, context)
        } else if (!render && curRendermap.editable) {
          return defaultPublicRenders['$vxeInput'].renderEdit(h, {}, { row, column }, context)
        } else if (render) {
          return defaultPublicRenders[render.name].renderCell(h, render, { row, column }, context)
        } else {
          defaultPublicRenders['$vxeInput'].renderCell(h, {}, { row, column }, context)
        }
      } else {
        if (render) {
          return defaultPublicRenders[render.name].renderCell(h, render, { row, column }, context)
        } else {
          defaultPublicRenders['$vxeInput'].renderCell(h, {}, { row, column }, context)
        }
      }
    }
  },
  // change
  $vxeNewInput: {
    // 输入框
    autofocus: '.vxe-input--inner',
    renderEdit(h, { props }, { row, column }) {
      props = Object.assign({ type: 'text', placeholder: '请输入' }, props || {})
      return [
        <vxe-input
          v-model={row[column.property]}
          placeholder="可清除"
          clearable
          {...{ props }}
          transfer={true}
        ></vxe-input>
        // <input class="my-cell" text="text" v-model={ row[column.property] } />
      ]
    },
    renderCell(h, cellRender, { row, column }, context) {
      row[column.property] = (row[column.property] + '').replace(/null|undefined/ig, '')
      row[column.property + '__viewSort'] = row[column.property]
      return [<span class="text">{row[column.property]}</span>]
    },
    renderDefault(h, cellRender, { row, column }, context) {
      row[column.property] = (row[column.property] + '').replace(/null|undefined/ig, '')
      row[column.property + '__viewSort'] = row[column.property]
      return [<span class="text">{row[column.property]}</span>]
    },
    renderItem(h, renderOpts, { $form, property, data, item }) {
      let { props = {} } = renderOpts
      props = Object.assign({ type: 'text', placeholder: '请输入' }, props)
      if ($form.$parent.editable !== false && props.editable !== false) {
        return [
          h('vxe-input', {
            ref: 'vxe-input' + property,
            props: {
              value: data[property],
              ...props,
              transfer: true
            },
            on: {
              input(value) {
                data[property] = value
                $form.$parent.itemChange({ $form, property, itemValue: value, data, renderOpts })
              },
              blur({ value }) {
                data[property] = value
              }
            }
          })
        ]
      } else {
        return [
          <span class="text block"> {data[property]} </span>
        ]
      }
    }
  },
  // $vxeTableDynamicSelect: {
  //   // 废弃
  //   renderEdit(h, { props, options }, { row, column }, { $excel, $grid, $table, $type }) {
  //     row.options = row.options || []
  //     return [
  //       <vxe-select v-model={row[column.property]} placeholder="请选择">
  //         {row.options.map((item, index) => {
  //           return [
  //             <vxe-option
  //               value={item.value}
  //               label={item.label}
  //             ></vxe-option>
  //           ]
  //         })}
  //       </vxe-select>
  //     ]
  //   },
  //   renderDefault(h, cellRender, { row, column }, context) {
  //     return [<span>{row[column.property]}</span>]
  //   },
  //   renderCell(h, renderOpts, { row, column }) {
  //     return [<span>{row[column.property]}</span>]
  //   }
  // }
  $vxeIcon: {
    // 增加icon图标展示
    renderDefault(h, cellRander, params) {
      let { row, column, $table } = params
      return [
        <div style="margin-left:10px;display:flex">
          { (row.children?.length < 1 || !row.children) && <i class='el-icon-document' style="margin-right: 10px;line-height:32px"></i>}
          { $table.treeExpandeds.indexOf(row) === -1 && row.children?.length > 0 && <i class='el-icon-folder' style="margin-right: 10px;line-height:32px"></i>}
          { $table.treeExpandeds.indexOf(row) > -1 && row.children?.length > 0 && <i class='el-icon-folder-opened' style="margin-right: 10px;line-height:32px"></i>}
          <span style="overflow: hidden;text-overflow:ellipsis;flex:1;">{row[column.property]}</span>
        </div>
      ]
    }
  },
  $vxeIcon1: {
    // 增加icon图标展示 红灯
    renderDefault(h, cellRander, params) {
      let { row, column, $table } = params
      return [
        <div style="algin: center">
          { (row.children?.length < 1 || !row.children) && <i class='result-icon result-red' style="margin-right: 10px;line-height:32px"></i>}
          { $table.treeExpandeds.indexOf(row) === -1 && row.children?.length > 0 && <i class='result-icon result-red' style="margin-right: 10px;line-height:32px"></i>}
          { $table.treeExpandeds.indexOf(row) > -1 && row.children?.length > 0 && <i class='result-icon result-red' style="margin-right: 10px;line-height:32px"></i>}
          <span style="overflow: hidden;text-overflow:ellipsis;flex:1;">{row[column.property]}</span>
        </div>
      ]
    }
  },
  $vxeIcon2: {
    // 增加icon图标展示 黄灯
    renderDefault(h, cellRander, params) {
      let { row, column, $table } = params
      return [
        <div style="algin: center">
          { (row.children?.length < 1 || !row.children) && <i class='result-icon result-yellow' style="margin-right: 10px;line-height:32px"></i>}
          { $table.treeExpandeds.indexOf(row) === -1 && row.children?.length > 0 && <i class='result-icon result-yellow' style="margin-right: 10px;line-height:32px"></i>}
          { $table.treeExpandeds.indexOf(row) > -1 && row.children?.length > 0 && <i class='result-icon result-yellow' style="margin-right: 10px;line-height:32px"></i>}
          <span style="overflow: hidden;text-overflow:ellipsis;flex:1;">{row[column.property]}</span>
        </div>
      ]
    }
  },
  $vxeIcon3: {
    // 增加icon图标展示 绿灯
    renderDefault(h, cellRander, params) {
      let { row, column, $table } = params
      return [
        <div style="algin: center">
          { (row.children?.length < 1 || !row.children) && <i class='result-icon result-green' style="margin-right: 10px;line-height:32px"></i>}
          { $table.treeExpandeds.indexOf(row) === -1 && row.children?.length > 0 && <i class='result-icon result-green' style="margin-right: 10px;line-height:32px" />}
          { $table.treeExpandeds.indexOf(row) > -1 && row.children?.length > 0 && <i class='result-icon result-green' style="margin-right: 10px;line-height:32px"></i>}
          <span style="overflow: hidden;text-overflow:ellipsis;flex:1;">{row[column.property]}</span>
        </div>
      ]
    }
  },
  $vxeIcon4: {
    // 增加icon图标展示 警铃
    renderDefault(h, cellRander, params) {
      let { row, column, $table } = params
      return [
        <div style="algin: center">
          { (row.children?.length < 1 || !row.children) && <i class='result-icon result-yellow-bell' style="margin-right: 10px;line-height:32px"></i>}
          { $table.treeExpandeds.indexOf(row) === -1 && row.children?.length > 0 && <i class='result-icon result-yellow-bell' style="margin-right: 10px;line-height:32px" />}
          { $table.treeExpandeds.indexOf(row) > -1 && row.children?.length > 0 && <i class='result-icon result-yellow-bell' style="margin-right: 10px;line-height:32px"></i>}
          <span style="overflow: hidden;text-overflow:ellipsis;flex:1;">{row[column.property]}</span>
        </div>
      ]
    }
  },
  $vxeIcon6: {
    // 增加icon图标展示 橙色
    renderDefault(h, cellRander, params) {
      let { row, column, $table } = params
      return [
        <div style="algin: center">
          { (row.children?.length < 1 || !row.children) && <i class='result-icon result-orange' style="margin-right: 10px;line-height:32px"></i>}
          { $table.treeExpandeds.indexOf(row) === -1 && row.children?.length > 0 && <i class='result-icon result-orange' style="margin-right: 10px;line-height:32px" />}
          { $table.treeExpandeds.indexOf(row) > -1 && row.children?.length > 0 && <i class='result-icon result-orange' style="margin-right: 10px;line-height:32px"></i>}
          <span style="overflow: hidden;text-overflow:ellipsis;flex:1;">{row[column.property]}</span>
        </div>
      ]
    }
  },
  $vxeIcon7: {
    // 增加icon图标展示 蓝色
    renderDefault(h, cellRander, params) {
      let { row, column, $table } = params
      return [
        <div style="algin: center">
          { (row.children?.length < 1 || !row.children) && <i class='result-icon result-blue' style="margin-right: 10px;line-height:32px"></i>}
          { $table.treeExpandeds.indexOf(row) === -1 && row.children?.length > 0 && <i class='result-icon result-blue' style="margin-right: 10px;line-height:32px" />}
          { $table.treeExpandeds.indexOf(row) > -1 && row.children?.length > 0 && <i class='result-icon result-blue' style="margin-right: 10px;line-height:32px"></i>}
          <span style="overflow: hidden;text-overflow:ellipsis;flex:1;">{row[column.property]}</span>
        </div>
      ]
    }
  },
  $vxeIcon8: {
    // 增加icon图标展示 灰色
    renderDefault(h, cellRander, params) {
      let { row, column, $table } = params
      return [
        <div style="algin: center">
          { (row.children?.length < 1 || !row.children) && <i class='result-icon result-grey' style="margin-right: 10px;line-height:32px"></i>}
          { $table.treeExpandeds.indexOf(row) === -1 && row.children?.length > 0 && <i class='result-icon result-grey' style="margin-right: 10px;line-height:32px" />}
          { $table.treeExpandeds.indexOf(row) > -1 && row.children?.length > 0 && <i class='result-icon result-grey' style="margin-right: 10px;line-height:32px"></i>}
          <span style="overflow: hidden;text-overflow:ellipsis;flex:1;">{row[column.property]}</span>
        </div>
      ]
    }
  },
  $vxeIcon5: {
    // 增加icon图标展示
    renderDefault(h, cellRander, params) {
      let { row, column, $table } = params
      return [
        <div style="margin-left:10px;display:flex">
          { (row.hasChild === false) && <i class='el-icon-document' style="margin-right: 10px;line-height:32px"></i>}
          { $table.treeExpandeds.indexOf(row) === -1 && row.hasChild === true && <i class='el-icon-folder' style="margin-right: 10px;line-height:32px"></i>}
          { $table.treeExpandeds.indexOf(row) > -1 && row.hasChild === true && <i class='el-icon-folder-opened' style="margin-right: 10px;line-height:32px"></i>}
          <span style="overflow: hidden;text-overflow:ellipsis;flex:1;">{row[column.property]}</span>
        </div>
      ]
    }
  },
  // 单值
  $vxeRatio: {
    renderDefault(h, cellRander, params) {
      let { row, column } = params
      // 设置转换后的值供导出所用
      row[column.property + '__viewRatio'] = Number(row[column.property]) > 0 ? `${row[column.property]}%` : ''
      return [
        <span>{Number(row[column.property]) > 0 ? `${row[column.property]}%` : ''}</span>
      ]
    }
  }
}
// 全局提供form特有渲染器 1组，为分组标题渲染器（developing）
const defaultFormRenderers = {
  // 表单特有全局渲染器
  $vxeFormGroupTitle: {
    renderItem(h, renderOpts, { $form, data, property }) {
      let gooupTitle = ''
      $form.items.forEach((item, index) => {
        if (item.field === property) {
          item.span = 24
          gooupTitle = item.groupTitle
        }
      })
      // return [
      //   <div class="form-group-title" >
      //     <i class="fn-inline"></i>
      //     <span class="fn-inline">
      //       {gooupTitle}
      //     </span>
      //     <em class="fn-inline"></em>
      //   </div>
      // ]
      return [
        <BsTitle type={'left'}>
          {gooupTitle}
        </BsTitle>
      ]
    }
  }
}
// 全局提供过滤器 4组，分别为数值型渲染器，分组型数据渲染器，文本型过滤渲染器，下拉选择型数据过滤器（评测和developing）
const tablefilterRenderers = {
  FilterComplex: {
    // 不显示底部按钮，使用自定义的按钮
    isFooter: false,
    // 筛选模板
    renderFilter(h, renderOpts, params) {
      return [
        <FilterComplex params={params} ></FilterComplex>
      ]
    },
    // 重置数据方法
    filterResetMethod({ options, column }) {
      const { editRender, cellRender } = column.own
      let render = editRender || cellRender
      if (render && filterTypeMap[render.name]) {
        options[0].data = Object.assign({}, filterTypeMap[render.name].filters)
      } else {
        options[0].data = { type: 'has', isCase: false, value: '', dataType: 'float', valuegt: '' }
      }
      // options.forEach(option => {
      //   option.data = { type: 'has', isCase: false, value: '', dataType: 'float', valuegt: '' }
      // })
    },
    // 筛选数据方法

    filterMethod({ option, row, column }) {
      let cellValue = row[column.property]
      let { type, isCase, value, valuegt, dataType, format } = option.data
      if (cellValue) {
        if (isCase) {
          cellValue = cellValue.toLowerCase()
          value = value.toLowerCase()
        }
      }
      if (['float', 'number', 'integer'].indexOf(dataType) >= 0) {
        switch (type) {
          case 'has':
            return String(cellValue).indexOf(value) > -1
          case 'eq':
            /* eslint-disable eqeqeq */
            return parseFloat(cellValue) == parseFloat(value)
          case 'gt':
            return Number(cellValue) > Number(value)
          case 'lt':
            return Number(value) > Number(cellValue)
          case 'ltgt':
            return Number(cellValue) >= Number(value) && Number(cellValue) <= Number(valuegt)
          case 'null':
            return (cellValue + '').replace(/null|undefined|\k+/ig, '') === ''
        }
      } else if (['date', 'time', 'datetime', 'week', 'month', 'year'].indexOf(dataType) >= 0) {
        switch (type) {
          case 'has':
            return String(cellValue).indexOf(value) > -1
          case 'eq':
            /* eslint-disable eqeqeq */
            return new Date(value).format(format) === cellValue
          case 'gt':
            return cellValue > new Date(value).format(format)
          case 'lt':
            return new Date(value).format(format) > cellValue
          case 'ltgt':
            return cellValue >= new Date(value).format(format) && cellValue <= new Date(valuegt).format(format)
          case 'null':
            return (cellValue + '').replace(/null|undefined|\k+/ig, '') === ''
        }
      }
      return true
    }
  },
  FilterContent: {
    // 不显示底部按钮，使用自定义的按钮
    isFooter: false,
    // 筛选模板
    renderFilter(h, renderOpts, params) {
      return [
        <filter-content params={params}></filter-content>
      ]
    },
    // 重置数据方法
    filterResetMethod({ options }) {
      options.forEach(option => {
        option.data = { vals: [], sVal: '' }
      })
    },
    // 筛选数据方法
    filterMethod({ option, row, column }) {
      let cellValue = row[column.property]
      const { vals } = option.data
      if (!vals || !vals.length) {
        return true
      }
      let render = column.editRender || column.cellRender
      if (render && render.name === '$vxeTree') {
        let { multiple, format, showField, isHump, cellViewFormat } = (render && render.props && render.props.config) || { multiple: false, format: '{code}-{name}', showField: '', isHump: false }
        let fieldkeys = isHump ? ['Code', 'Name', 'Id'] : (column.property.endsWith('_') ? ['code', 'name', 'id'] : ['_code', '_name', '_id'])
        format = cellViewFormat || format || ('{' + fieldkeys[0] + '}-{' + fieldkeys[1] + '}')
        if (showField) {
          if (showField === true && format) {
            cellValue = defaultGloabalUtils.format(format, row)
          } else {
            row[showField] = (row[showField] + '').replace(/null|undefined/ig, '')
            cellValue = row[showField]
          }
        } else {
          let regR = new RegExp('({[a-zA-Z0-9_]*})', 'ig')
          let rowsKey = format.match(regR).map((key, keyIndex) => {
            return key.replace(/{|}/gi, '')
          })
          if (!multiple) {
            row[column.property] = [row[column.property + fieldkeys[0]], row[column.property + fieldkeys[1]], row[column.property + fieldkeys[2]]].map((item, index) => {
              return (item + '').replace(/null|undefined/ig, '')
            }).join('##')
            let arr = []
            rowsKey.map((key, indexkey) => {
              if (key === 'code') {
                (row[column.property + fieldkeys[0]] + '').replace(/null|undefined|root/ig, '') !== '' && arr.push(row[column.property + fieldkeys[0]])
              } else {
                key = isHump ? key.replace(/\b(\w)(\w*)/g, function ($0, $1, $2) { return $1.toUpperCase() + $2 }) : (column.property.endsWith('_') ? key : ('_' + key));
                (row[column.property + key] + '').replace(/null|undefined/ig, '') !== '' && arr.push(row[column.property + key])
              }
            })
            cellValue = row[column.property] === '' ? '' : arr.join('-')
          } else {
            let idNameCodeMap = {
              idArr: (typeof (row[column.property + fieldkeys[2]]) === 'string' && (row[column.property + fieldkeys[2]]) !== '') ? row[column.property + fieldkeys[2]].split(',') : (Array.isArray(row[column.property + fieldkeys[2]]) ? row[column.property + fieldkeys[2]] : []),
              codeArr: (typeof (row[column.property + fieldkeys[0]]) === 'string' && (row[column.property + fieldkeys[0]]) !== '') ? row[column.property + fieldkeys[0]].split(',') : (Array.isArray(row[column.property + fieldkeys[0]]) ? row[column.property + fieldkeys[0]] : []),
              nameArr: (typeof (row[column.property + fieldkeys[1]]) === 'string' && (row[column.property + fieldkeys[1]]) !== '') ? row[column.property + fieldkeys[1]].split(',') : (Array.isArray(row[column.property + fieldkeys[1]]) ? row[column.property + fieldkeys[1]] : [])
            }
            row[column.property] = (idNameCodeMap.nameArr.length || idNameCodeMap.codeArr.length) ? idNameCodeMap.codeArr.map((item, index) => {
              return [idNameCodeMap.codeArr[index], idNameCodeMap.nameArr[index], idNameCodeMap.idArr[index]].map((item, index) => {
                return (item + '').replace(/null|undefined/ig, '')
              }).join('##')
            }).join(',') : ''
            cellValue = row[column.property] === '' ? '' : idNameCodeMap.codeArr.map((item, index) => {
              let arr = []
              rowsKey.map((key, indexkey) => {
                if (key === 'code') {
                  idNameCodeMap[key + 'Arr'][index] !== 'root' && arr.push(idNameCodeMap[key + 'Arr'][index])
                } else {
                  idNameCodeMap[key + 'Arr'][index] && arr.push(idNameCodeMap[key + 'Arr'][index])
                }
              })
              return arr.join('-')
            }).join(',')
          }
        }
      }
      return vals.indexOf(cellValue) >= 0
      // debugger
      // console.log(option, row, column, row[column.property])
      // const { vals } = option.data
      // const cellValue = row[column.property]
      // /* eslint-disable eqeqeq */
      // return vals.some(val => {
      //   if (cellValue.indexOf('##') > 0) {
      //     let value = cellValue.split('##')
      //     value.shift()
      //     return val == value.join('-')
      //   } else {
      //     console.log(option, row, column, val == cellValue)
      //     return val == cellValue
      //   }
      //   //  return val == cellValue
      // })
    }
  },
  FilterInput: {
    // 筛选模板
    // filters: [{ data: '' }],
    // filterRender: { name: 'FilterInput' },
    renderFilter(h, renderOpts, params) {
      return [
        <filter-input params={params}></filter-input>
      ]
    },
    // 筛选方法
    filterMethod({ option, row, column }) {
      console.log(option, row, column)
      const { data } = option
      let cellValue = row[column.property]
      return String(cellValue).toLowerCase().indexOf(data.toLowerCase()) > -1
    }
  },
  FilterSelect: {
    isFooter: false,
    // 筛选模板
    // filters: [{ data: '' }],
    // filterRender: { name: 'FilterInput' },
    renderFilter(h, renderOpts, params) {
      return [
        <FilterSelect renderOpts={renderOpts} params={params}></FilterSelect>
      ]
    },
    filterResetMethod({ options }) {
      options.forEach(option => {
        option.data = { vals: [], sVal: '' }
      })
    },
    // 筛选方法
    filterMethod({ option, row, column }) {
      const { options, data } = option
      const { vals } = data
      if (vals.length) {
        let cellValue = row[column.property]
        let value = []
        defaultGloabalUtils.getleafChildrenList(options).forEach((item, index) => {
          if (String(cellValue).indexOf(item.value) >= 0) {
            value.push(item.label)
          }
        })
        return value.some((item) => {
          return vals.indexOf(item) >= 0
        })
      } else {
        return true
      }
    }
  },
  // 金额范围过滤渲染器
  FilterNumberRange: {
    /// 不显示底部按钮，使用自定义的按钮
    isFooter: false,
    renderFilter(h, renderOpts, params) {
      return [
        <FilterNumberRange params={params}></FilterNumberRange>
      ]
    },
    // 筛选方法
    filterMethod({ option, row, column }) {
      const { min, max } = option.data
      const property = column.property
      const sortProperty = `${property}__viewSort`

      let value = row[sortProperty] || row[property] || 0
      if (typeof value === 'string') {
        value = Number(value?.replace(/,/g, ''))
      }
      return min <= value && value <= max
    },
    // 重置
    filterResetMethod({ options }) {
      options.forEach(option => {
        option.data = { min: '', max: '' }
      })
    }
  }
}
export default {
  ...defaultPublicRenders,
  ...defaultTableRenderers,
  ...defaultFormRenderers,
  ...tablefilterRenderers
}
