/*
 * @Author: 轻语
 * @Date: 2021-11-08 14:44:58
 * @LastEditors: Comer
 * @LastEditTime: 2023-03-31 11:35:00
 * @Description:
 */
/* eslint-disable no-eval */
import { filterTypeMap } from '../tableDefaultConfig'

// 表格废弃原渲染同时计算改为计算后渲染，form仍然采用渲染实时计算。
const defaultGlobalUtils = {
  calculateRender(h, { props, name }, { $columnIndex, $rowIndex, items, column, data, row, $seq, $table, $type, columnIndex, isEdit, level, rowIndex, seq }, context) {
    props = props || {}
    let val = isNaN(parseFloat(row[column.property])) ? '' : parseFloat(row[column.property])
    if (val !== '') {
      row[column.property] = val.toFixed(2)
      if (!context.$grid.$parent.toolbarConfigInCopy.moneyInputSwich || context.$grid.$parent.toolbarConfigInCopy.disabledMoneyConversion) {
        val = Number((val).toFixed(2)).toLocaleString()
        val = val.split('.').length === 1 ? val + '.00' : (val.split('.')[1].length === 1 ? val + '0' : val)
      } else {
        let moneyUnit = context.$grid.$parent.moneyUnit ? context.$grid.$parent.moneyUnit : 1
        val = Number((val / moneyUnit).toFixed(2)).toLocaleString()
        val = val.split('.').length === 1 ? val + '.00' : (val.split('.')[1].length === 1 ? val + '0' : val)
      }
      row[column.property + '__viewSort'] = val
      return [<span class="text block" {...{ props }} >{val}</span>]
    } else {
      row[column.property + '__viewSort'] = ''
      return [<span class="text block" {...{ props }} ></span>]
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
  debounceItemChange: (function(debounce) {
    return debounce(300)
  })(function(delay) {
  // 利用闭包保存定时器
    let timer = null
    return function(cb) {
      // 在规定时间内再次触发会先清除定时器后再重设定时器
      clearTimeout(timer)
      timer = setTimeout(function() {
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
  },
  eval(expresion, obj, otheDataObj) {
    let regR = new RegExp('({[a-zA-Z0-9_]*})', 'ig')
    let rowsKey = (expresion.match(regR) || []).map((key, keyIndex) => {
      return key.replace(/{|}/gi, '')
    })
    rowsKey.map((key, indexkey) => {
      expresion = expresion.replace(new RegExp('{' + key + '}', 'ig'), obj[key] || (otheDataObj && otheDataObj[key]) || '')
    })
    return eval(expresion)
  },
  mergeContrainConfig(renderOpts, params, context, type = 'table') { // 合并更新约束
    if (type === 'table') {
      let bsTable = context.$grid.$parent
      let { enabled, enabledType, calcAndConstraintItemCodeField } = bsTable.calculateConstraintConfigIn
      if (enabled && (enabledType.performColConstraint || enabledType.performCellConstraint)) {
        // 更新渲染配置
        let constrainRowDataMap = bsTable.constrainRowDataMap
        let curCellMap = constrainRowDataMap[params.row[calcAndConstraintItemCodeField]] && constrainRowDataMap[params.row[calcAndConstraintItemCodeField]][params.column.property]
        if (curCellMap) {
          if (curCellMap.options) {
            renderOpts.options = curCellMap.options
          }
          renderOpts.props = Object.assign(renderOpts.props, {
            disabled: curCellMap.disabled || renderOpts.props.disabled,
            editable: curCellMap.editable || renderOpts.props.editable,
            queryparams: curCellMap.queryparams || renderOpts.props.queryparams
          })
        }
        return renderOpts
      } else {
        return renderOpts
      }
    }
  }
}
// 全局提供表格和form配套渲染器共 15 组，分别为： 新全局下拉树，文本数字输入，下拉选择，计算渲染器，金额输入，下拉文本框，天数，时间日期，单选，多选，间隔时间或数值选择输入渲染器，开关，进度条，条件渲染器。其中，条件渲染器（评测和developing）
const defaultPublicRenders = {
  // 表格form全局渲染器
  // 3组可多选
  $vxeTree: {
    // 全局树渲染器
    renderDefault(h, { name, props }, { row, column }) {
      let { multiple, format, showField, isHump, valueKeys } = (props && props.config) || { multiple: false, format: '{code}-{name}', showField: '', isHump: false }
      valueKeys = valueKeys || ['code', 'name', 'id']
      let fieldkeys = isHump ? ['Code', 'Name', 'Id'] : (column.property.endsWith('_') ? ['code', 'name', 'id'] : ['_code', '_name', '_id'])
      let multiplefieldkeys = isHump ? ['Code__multiple', 'Name__multiple', 'Id__multiple', '__viewSort'] : (column.property.endsWith('_') ? ['code__multiple', 'name__multiple', 'id__multiple', '_viewSort'] : ['_code__multiple', '_name__multiple', '_id__multiple', '__viewSort'])
      format = (props && props.cellViewFormat) || format || ('{' + valueKeys[0] + '}-{' + valueKeys[1] + '}')
      if (showField) {
        row[showField] = (row[showField] + '').replace(/null|undefined/ig, '')
        row[column.property + multiplefieldkeys[3]] = row[showField]
        return [<span class="text block">{row[column.property + multiplefieldkeys[3]]}</span>]
      } else {
        let regR = new RegExp('({[a-zA-Z0-9_]*})', 'ig')
        let rowsKey = format.match(regR).map((key, keyIndex) => {
          return key.replace(/{|}/gi, '')
        })
        if (!multiple) {
          row[column.property] = [row[column.property + fieldkeys[0]], row[column.property + fieldkeys[1]], row[column.property + fieldkeys[2]]].map((item, index) => {
            return (item + '').replace(/null|undefined/ig, '')
          }).join('##').replace('####', '')
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
            idArr: (typeof (row[column.property + fieldkeys[2]]) === 'string' && (row[column.property + fieldkeys[2]]) !== '') ? row[column.property + fieldkeys[2]].split(',') : (Array.isArray(row[column.property + fieldkeys[2]]) ? row[column.property + fieldkeys[2]] : row[column.property + multiplefieldkeys[2]] ? row[column.property + multiplefieldkeys[2]] : []),
            codeArr: (typeof (row[column.property + fieldkeys[0]]) === 'string' && (row[column.property + fieldkeys[0]]) !== '') ? row[column.property + fieldkeys[0]].split(',') : (Array.isArray(row[column.property + fieldkeys[0]]) ? row[column.property + fieldkeys[0]] : row[column.property + multiplefieldkeys[0]] ? row[column.property + multiplefieldkeys[0]] : []),
            nameArr: (typeof (row[column.property + fieldkeys[1]]) === 'string' && (row[column.property + fieldkeys[1]]) !== '') ? row[column.property + fieldkeys[1]].split(',') : (Array.isArray(row[column.property + fieldkeys[1]]) ? row[column.property + fieldkeys[1]] : row[column.property + multiplefieldkeys[1]] ? row[column.property + multiplefieldkeys[1]] : [])
          }
          row[column.property] = (idNameCodeMap.nameArr.length || idNameCodeMap.codeArr.length) ? idNameCodeMap.codeArr.map((item, index) => {
            return [idNameCodeMap.codeArr[index], idNameCodeMap.nameArr[index], idNameCodeMap.idArr[index]].map((item, index) => {
              return (item + '').replace(/null|undefined/ig, '')
            }).join('##').replace('####', '')
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
        return [<span class="text block">{row[column.property + multiplefieldkeys[3]]}</span>]
      }
    },
    renderCell(h, { name, props }, { row, column }) {
      let { multiple, format, showField, isHump, valueKeys } = (props && props.config) || { multiple: false, format: '{code}-{name}', showField: '', isHump: false }
      valueKeys = valueKeys || ['code', 'name', 'id']
      let fieldkeys = isHump ? ['Code', 'Name', 'Id'] : (column.property.endsWith('_') ? ['code', 'name', 'id'] : ['_code', '_name', '_id'])
      let multiplefieldkeys = isHump ? ['Code__multiple', 'Name__multiple', 'Id__multiple', '__viewSort'] : (column.property.endsWith('_') ? ['code__multiple', 'name__multiple', 'id__multiple', '_viewSort'] : ['_code__multiple', '_name__multiple', '_id__multiple', '__viewSort'])

      format = (props && props.cellViewFormat) || format || ('{' + valueKeys[0] + '}-{' + valueKeys[1] + '}')
      if (showField) {
        row[showField] = (row[showField] + '').replace(/null|undefined/ig, '')
        row[column.property + multiplefieldkeys[3]] = row[showField]
        return [<span class="text block">{row[column.property + multiplefieldkeys[3]]}</span>]
      } else {
        let regR = new RegExp('({[a-zA-Z0-9_]*})', 'ig')
        let rowsKey = format.match(regR).map((key, keyIndex) => {
          return key.replace(/{|}/gi, '')
        })
        if (!multiple) {
          row[column.property] = [row[column.property + fieldkeys[0]], row[column.property + fieldkeys[1]], row[column.property + fieldkeys[2]]].map((item, index) => {
            return (item + '').replace(/null|undefined/ig, '')
          }).join('##').replace('####', '')
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
            }).join('##').replace('####', '')
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
        return [<span class="text block">{row[column.property + multiplefieldkeys[3]]}</span>]
      }
    },
    renderEdit(h, renderOpts, params, context) {
      renderOpts = defaultGloabalUtils.deepCopy(renderOpts)
      let { props, options } = renderOpts
      let { row, column } = params
      let bsTable = context.$grid.$parent
      let self = bsTable
      if (props.formatOptions) { // 配置映射
        props.options = props.options || {}
        let renderOption = props.options[defaultGloabalUtils.format(props.formatOptions, row, self.publicData.rowPublicData)]
        if (renderOption) {
          Object.assign(props.config, renderOption.config)
          props.queryparams = renderOption.queryparams || props.queryparams
        }
      }
      renderOpts = defaultGloabalUtils.mergeContrainConfig(renderOpts, params, context)
      let renderData = row
      let { valueKeys, isHump } = (props && props.config) || { multiple: false, valueKeys: ['code', 'name', 'id'] }
      let fieldkeys = isHump ? ['Code', 'Name', 'Id'] : (column.property.endsWith('_') ? ['code', 'name', 'id'] : ['_code', '_name', '_id'])
      let multiplefieldkeys = isHump ? ['Code__multiple', 'Name__multiple', 'Id__multiple'] : (column.property.endsWith('_') ? ['code__multiple', 'name__multiple', 'id__multiple'] : ['_code__multiple', '_name__multiple', '_id__multiple'])
      valueKeys = valueKeys || ['code', 'name', 'id']
      return [
        h('BsTree', {
          props: {
            ref: 'vxe-tree-' + column.property,
            editable: true,
            value: row[column.property],
            ...props,
            treeData: options || [],
            isDropSelectTree: true
          },
          on: {
            input: (value) => {
              renderData[column.property] = value
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
              bsTable.cellOptionCallBack(params, { optionType: 'nodeClick', node, treeData })
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
              bsTable.cellOptionCallBack(params, { optionType: 'nodeCheckClick', node, nodes, treeData })
            }
          }
        })
      ]
    },
    renderItem(h, renderOpts, { $form, property, data }) {
      let { props, options } = renderOpts
      let renderData = data
      let { multiple, isHump, valueKeys, format } = (props && props.config) || { format: '{code}-{name}', multiple: false, valueKeys: ['code', 'name', 'id'] }
      valueKeys = valueKeys || ['code', 'name', 'id']
      let fieldkeys = isHump ? ['Code', 'Name', 'Id'] : (property.endsWith('_') ? ['code', 'name', 'id'] : ['_code', '_name', '_id'])
      let multiplefieldkeys = isHump ? ['Code__multiple', 'Name__multiple', 'Id__multiple', '__viewSort'] : (property.endsWith('_') ? ['code__multiple', 'name__multiple', 'id__multiple', '_viewSort'] : ['_code__multiple', '_name__multiple', '_id__multiple', '__viewSort'])
      format = format || ('{' + valueKeys[0] + '}-{' + valueKeys[1] + '}')
      if (!multiple) {
        data[property] = [data[property + fieldkeys[0]], data[property + fieldkeys[1]], data[property + fieldkeys[2]]].map((item, index) => {
          return (item + '').replace(/null|undefined/ig, '')
        }).join('##').replace('####', '')
        data[property + multiplefieldkeys[3]] = data[property] === '' ? '' : defaultGlobalUtils.formatLabel(format, {
          [valueKeys[0]]: data[property + fieldkeys[0]],
          [valueKeys[1]]: data[property + fieldkeys[1]],
          [valueKeys[2]]: data[property + fieldkeys[2]]
        }, valueKeys)
      } else {
        // 处理多选复现事出现循环引用问题
        if (!data[property] && Array.isArray(data[property + multiplefieldkeys[2]]) && !data[property + multiplefieldkeys[2]].length) {
          delete data[property + multiplefieldkeys[2]]
        }
        if (!data[property] && Array.isArray(data[property + multiplefieldkeys[0]]) && !data[property + multiplefieldkeys[0]].length) {
          delete data[property + multiplefieldkeys[0]]
        }
        if (!data[property] && Array.isArray(data[property + multiplefieldkeys[1]]) && !data[property + multiplefieldkeys[1]].length) {
          delete data[property + multiplefieldkeys[1]]
        }
        let idArr = (typeof (data[property + fieldkeys[2]]) === 'string' && data[property + fieldkeys[2]] !== '') ? data[property + fieldkeys[2]].split(',') : (Array.isArray(data[property + fieldkeys[2]]) ? data[property + fieldkeys[2]] : (Array.isArray(data[property + multiplefieldkeys[2]]) && data[property + multiplefieldkeys[2]].length > 0) ? data[property + multiplefieldkeys[2]] : [])
        let codeArr = (typeof (data[property + fieldkeys[0]]) === 'string' && data[property + fieldkeys[0]] !== '') ? data[property + fieldkeys[0]].split(',') : (Array.isArray(data[property + fieldkeys[0]]) ? data[property + fieldkeys[0]] : (Array.isArray(data[property + multiplefieldkeys[0]]) && data[property + multiplefieldkeys[0]].length > 0) ? data[property + multiplefieldkeys[0]] : [])
        let nameArr = (typeof (data[property + fieldkeys[1]]) === 'string' && data[property + fieldkeys[1]] !== '') ? data[property + fieldkeys[1]].split(',') : (Array.isArray(data[property + fieldkeys[1]]) ? data[property + fieldkeys[1]] : (Array.isArray(data[property + multiplefieldkeys[1]]) && data[property + multiplefieldkeys[1]].length > 0) ? data[property + multiplefieldkeys[1]] : [])
        data[property] = (nameArr.length || codeArr.length) ? codeArr.map((item, index) => {
          return [codeArr[index], nameArr[index], idArr[index]].map((item, index) => {
            return (item + '').replace(/null|undefined/ig, '')
          }).join('##').replace('####', '')
        }).join(',') : ''
        data[property + fieldkeys[2]] = data[property] === '' ? '' : idArr.join(',')
        data[property + fieldkeys[0]] = data[property] === '' ? '' : codeArr.join(',')
        data[property + fieldkeys[1]] = data[property] === '' ? '' : nameArr.join(',')
        data[property + multiplefieldkeys[2]] = data[property] === '' ? [] : idArr
        data[property + multiplefieldkeys[0]] = data[property] === '' ? [] : codeArr
        data[property + multiplefieldkeys[1]] = data[property] === '' ? [] : nameArr
        data[property + multiplefieldkeys[3]] = data[property] === '' ? '' : codeArr.map((item, index) => {
          return defaultGlobalUtils.formatLabel(format, {
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
              value: data[property],
              ...props,
              treeData: options || [],
              isDropSelectTree: true
            },
            on: {
              input: (value) => {
                data[property] = value
                // 聚焦向外分发事件
                props?.autoFocusDispatch && $form.$parent.itemChange({ $form, property, itemValue: data[property], data, renderOpts, node: {}, treeData: [] })
              },
              onNodeClick({ node, treeData, value }) {
                // limitCheckedEnd 标识只能选取末级
                if (node !== null && (!props.limitCheckedEnd || (!node.children || (node.children && !node.children.length)))) {
                  renderData[property + fieldkeys[2]] = node[valueKeys[2]]
                  renderData[property + fieldkeys[0]] = node[valueKeys[0]]
                  renderData[property + fieldkeys[1]] = node[valueKeys[1]]
                } else {
                  renderData[property + fieldkeys[2]] = (node && value) ? (data[property + fieldkeys[2]] || '') : ''
                  renderData[property + fieldkeys[0]] = (node && value) ? (data[property + fieldkeys[0]] || '') : ''
                  renderData[property + fieldkeys[1]] = (node && value) ? (data[property + fieldkeys[1]] || '') : ''
                  value = ((node && value) && data[property]) || ''
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
        return [<span class="text block tl">{data[property + multiplefieldkeys[3]]}</span>]
      }
    }
  },
  $vxeSelect: {
    // 下拉选择
    renderDefault(h, { props = {}, options }, { row, column }, context) {
      row[column.property] = (row[column.property] + '').replace(/null|undefined/ig, '')
      if (props.multiple) {
        row[column.property + '__multiple'] = (row[column.property] === '') ? [] : row[column.property].split(',')
        let arrValue = []
        options.forEach((item, index) => {
          if (row[column.property + '__multiple'].indexOf(item.value + '') >= 0) {
            arrValue.push(item.label)
          }
        })
        row[column.property + '__viewSort'] = arrValue.join(',')
        return [<span>{row[column.property + '__viewSort']}</span>]
      } else {
        let arrValue = []
        options.forEach((item, index) => {
          if (row[column.property] + '' === item.value + '') {
            arrValue.push(item.label)
          }
        })
        row[column.property + '__viewSort'] = arrValue.join(',')
        return [<span>{row[column.property + '__viewSort']}</span>]
      }
    },
    renderCell(h, { props = {}, options }, { row, column }, context) {
      row[column.property] = (row[column.property] + '').replace(/null|undefined/ig, '')
      // // row[column.property] = typeof (row[column.property]) === 'string' ? row[column.property] : (Array.isArray(row[column.property]) ? row[column.property].join(',') : '')
      if (props.multiple) {
        row[column.property + '__multiple'] = (row[column.property] === '') ? [] : row[column.property].split(',')
        let arrValue = []
        options.forEach((item, index) => {
          if (row[column.property + '__multiple'].indexOf(item.value + '') >= 0) {
            arrValue.push(item.label)
          }
        })
        row[column.property + '__viewSort'] = arrValue.join(',')
        return [
          <span>{row[column.property + '__viewSort']}</span>
        ]
      } else {
        let arrValue = []
        options.forEach((item, index) => {
          if (row[column.property] + '' === item.value + '') {
            arrValue.push(item.label)
          }
        })
        row[column.property + '__viewSort'] = arrValue.join(',')
        return [
          <span>{row[column.property + '__viewSort']}</span>
        ]
      }
    },
    renderEdit(h, renderOpts, params, context) {
      let { props = {}, options } = renderOpts
      let { row, column } = params
      let bsTable = context.$grid.$parent
      row[column.property] = typeof (row[column.property]) === 'string' ? row[column.property] : (Array.isArray(row[column.property]) ? row[column.property].join(',') : '')
      if (props.multiple) {
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
        }, options.map(item => {
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
      data[property] = (data[property] + '').replace(/null|undefined/ig, '')
      // if (props.multiple) {
      //   data[property + '__multiple'] = (data[property] === '') ? [] : data[property].split(',')
      // }
      if ($form.$parent.editable !== false && props.editable !== false) {
        return [
          h('vxe-select', {
            props: {
              ref: 'vxe-select-' + property,
              value: props.multiple ? data[property + '__multiple'] : data[property],
              placeholder: '请选择',
              ...props,
              transfer: true
            },
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
          }, options.map(item => {
            return [
              h('vxe-option', {
                props: {
                  disabled: item.disabled,
                  value: String(item.value),
                  label: item.label
                }
              })
            ]
          }))
        ]
      } else {
        data[property + '__multiple'] = (data[property] === '') ? [] : data[property].split(',')
        let arrValue = []
        options.forEach((item, index) => {
          if (data[property + '__multiple'].indexOf(item.value + '') >= 0) {
            arrValue.push(item.label)
          }
        })
        data[property + '__viewSort'] = arrValue.join(',')
        return [<span class="text block">{data[property + '__viewSort']}</span>]
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
      return [<span>{row[column.property + '__viewSort']}</span>]
    },
    renderCell(h, { options, props = {} }, { row, column }) {
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
      return [<span>{row[column.property + '__viewSort']}</span>]
    },
    renderEdit(h, { options, props = {}, propsC = {} }, { row, column }) {
      row[column.property] = typeof (row[column.property]) === 'string' ? row[column.property] : (Array.isArray(row[column.property]) ? row[column.property].join(',') : '')
      row[column.property + '__multiple'] = row[column.property].split(',')
      // return [
      //   <vxe-checkbox-group {...{ props }} v-model={row[column.property]} placeholder="请选择">
      //     {options.map((item, index) => {
      //       return [
      //         <vxe-checkbox
      //           label={item.value}
      //           { ...{ propsC } }
      //         >1
      //           {item.label}
      //         </vxe-checkbox>
      //       ]
      //     })}
      //   </vxe-checkbox-group>
      // ]
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
      if ($form.$parent.editable !== false && props.editable !== false) {
        return [
          h('vxe-checkbox-group', {
            props: {
              value: data[property + '__multiple'],
              ...props
            },
            on: {
              change({ $event, checked, checklist, label }) {
                data[property] = checklist.join(',')
                $form.$parent.itemChange({ $form, property, itemValue: data[property], data, renderOpts })
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
                $form.$parent.itemChange({ $form, property, itemValue: checklist, data, renderOpts })
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
    renderEdit(h, { props = {} }, { row, column }) {
      props = Object.assign({ type: 'text', placeholder: '请输入' }, props || {})
      return [
        <vxe-input
          v-model={row[column.property]}
          placeholder="请输入"
          clearable
          {...{ props }}
          transfer={true}
        ></vxe-input>
        // <input class="my-cell" text="text" v-model={ row[column.property] } />
      ]
    },
    renderCell(h, { props = {} }, { row, column }, context) {
      let bsTable = context.$grid.$parent
      const type = (props && props.type) || 'text'
      const hiddenZero = (props && props.hiddenZero) || false
      row[column.property] = (row[column.property] + '').replace(/null|undefined/ig, '')
      switch (type) {
        case 'integer':
          row[column.property + '__viewSort'] = isNaN(parseInt(row[column.property])) ? '0' : parseInt(row[column.property])
          break
        case 'number':
          let numValue = isNaN(parseFloat(row[column.property])) ? '0' : parseFloat(row[column.property])
          row[column.property + '__viewSort'] = (+numValue === 0 && hiddenZero) ? '' : numValue
          break
        case 'float':
          row[column.property + '__viewSort'] = bsTable.transToNumber(row[column.property], props.digits || 2)
          break
        default:
          row[column.property + '__viewSort'] = row[column.property]
      }
      return [<span class="text block">{row[column.property + '__viewSort']}</span>]
    },
    renderDefault(h, { props = {} }, { row, column }, context) {
      let bsTable = context.$grid.$parent
      const type = (props && props.type) || 'text'
      const hiddenZero = (props && props.hiddenZero) || false
      row[column.property] = (row[column.property] + '').replace(/null|undefined/ig, '')
      switch (type) {
        case 'integer':
          row[column.property + '__viewSort'] = isNaN(parseInt(row[column.property])) ? '0' : parseInt(row[column.property])
          break
        case 'number':
          let numValue = isNaN(parseFloat(row[column.property])) ? '0' : parseFloat(row[column.property])
          row[column.property + '__viewSort'] = (+numValue === 0 && hiddenZero) ? '' : numValue
          break
        case 'float':
          let floatNumValue = bsTable.transToNumber(row[column.property], props.digits || 2)
          row[column.property + '__viewSort'] = (+floatNumValue === 0 && hiddenZero) ? '' : floatNumValue
          break
        default:
          row[column.property + '__viewSort'] = row[column.property]
      }
      return [<span class="text block">{row[column.property + '__viewSort']}</span>]
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
              },
              blur({ value }) {
                data[property] = value
                $form.$parent.itemChange({ $form, property, itemValue: value, data, renderOpts })
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
      return defaultGlobalUtils.calculateRender(h, renderOpts, { $columnIndex, $rowIndex, items, column, data, row, $seq, $table, $type, columnIndex, isEdit, level, rowIndex, seq }, context)
    },
    renderCell(h, renderOpts, { $columnIndex, $rowIndex, items, column, data, row, $seq, $table, $type, columnIndex, isEdit, level, rowIndex, seq }, context) {
      return defaultGlobalUtils.calculateRender(h, renderOpts, { $columnIndex, $rowIndex, items, column, data, row, $seq, $table, $type, columnIndex, isEdit, level, rowIndex, seq }, context)
    },
    renderEdit(h, renderOpts, { $columnIndex, $rowIndex, items, column, data, row, $seq, $table, $type, columnIndex, isEdit, level, rowIndex, seq }, context) {
      return defaultGlobalUtils.calculateRender(h, renderOpts, { $columnIndex, $rowIndex, items, column, data, row, $seq, $table, $type, columnIndex, isEdit, level, rowIndex, seq }, context)
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
      return defaultGlobalUtils.formCalculateRender(h, renderOpts, { $form, data, property })
    }
  },
  $vxeMoney: {
    // 输入框
    autofocus: '.vxe-input--inner',
    renderDefault(h, { props = {} }, { row, column, $grid }, context) {
      let bsTable = context.$grid.$parent
      let moneyUnit = bsTable.moneyUnit ? bsTable.moneyUnit : 1
      let isRound = bsTable.isRoundIn
      let showZero = bsTable.showZero
      let zero = bsTable.transToNumber('', props.digits || 2, isRound)
      let val = bsTable.transToNumber(row[column.property], props.digits || 2, isRound)
      // const digits = props.digits || (moneyUnit === 10000 ? 4 : 2) // 万元显示4位，元显示2位
      let digits = props.digits || 2
      // 显示整数处理
      if (props.type === 'integer') {
        digits = 0
      }
      if (val === zero && showZero) {
        val = '0.00'
      } else if (bsTable.toolbarConfigInCopy.moneyInputSwich) {
        val = bsTable.transToNumber(bsTable.accurateChuFa(val, moneyUnit), digits, isRound)
      } else { }
      val = bsTable.transToNumberLocalString(val, digits, isRound)
      let zeroNum = bsTable.transToNumber('', digits, isRound)
      const showVal = val === zeroNum ? (showZero ? zeroNum : '') : val
      row[column.property + '__viewSort'] = val
      return [<span class="text">{showVal}</span>]
    },
    renderCell(h, { props = {} }, { row, column, $grid }, context) {
      let bsTable = context.$grid.$parent
      let moneyUnit = bsTable.moneyUnit ? bsTable.moneyUnit : 1
      let isRound = bsTable.isRoundIn
      let showZero = bsTable.showZero
      let zero = bsTable.transToNumber('', props.digits || 2, isRound)
      let val = bsTable.transToNumber(row[column.property], props.digits || 2, isRound)
      // const digits = props.digits || (moneyUnit === 10000 ? 4 : 2) // 万元显示4位，元显示2位
      let digits = props.digits || 2
      // 显示整数处理
      if (props.type === 'integer') {
        digits = 0
      }
      if (val === zero && showZero) {
        val = '0.00'
      } else if (bsTable.toolbarConfigInCopy.moneyInputSwich) {
        val = bsTable.transToNumber(bsTable.accurateChuFa(val, moneyUnit), digits, isRound)
      } else { }

      val = bsTable.transToNumberLocalString(val, digits, isRound)
      let zeroNum = bsTable.transToNumber('', digits, isRound)
      const showVal = val === zeroNum ? (showZero ? zeroNum : '') : val
      row[column.property + '__viewSort'] = val

      return [<span class="text">{showVal}</span>]
    },
    renderEdit(h, renderOpts, params, context) {
      let { props = {} } = renderOpts
      let { row, column } = params
      let bsTable = context.$grid.$parent
      let moneyInputSwich = context.$grid.$parent.toolbarConfigIn ? context.$grid.$parent.toolbarConfigIn.moneyInputSwich : false
      let moneyUnit = moneyInputSwich ? (context.$grid.$parent.moneyUnit ? context.$grid.$parent.moneyUnit : 1) : 1
      let isRound = bsTable.isRoundIn
      // 匹配如果为空时输入-号也可正常输入显示
      let val = (row[column.property] === '-') ? '-' : ((row[column.property] + '').replace(/null|undefined|NaN/ig, '') / moneyUnit).toFixed(2).toString().replace('.', '') * moneyUnit / 100
      // let val = (row[column.property] + '').replace(/null|undefined|NaN/ig, '')
      let digits = bsTable.tableConfigCp.globalConfig.moneyLimit ? String(moneyUnit).length - 1 + 2 : 2
      const { min = -9007199254740991, max = 9007199254740991 } = props
      let inputdigits = props.inputdigits || digits || 2
      // 输入整数处理, 限制只能输入整数
      if (props.type === 'integer') {
        inputdigits = 0
        digits = 0
      }
      // row[column.property + '__moneySwitchinput'] = (val === '-' || val === '') ? (row[column.property + '__moneySwitchinput'] === '-' ? '-' : '') : bsTable.accurateChuFa(val, moneyUnit) + ''
      // row[column.property + '__moneySwitchinput'] = (val === '-' || val === '') ? (row[column.property + '__moneySwitchinput'] === '-' ? '-' : '') : bsTable.accurateMaxFixed(bsTable.accurateChuFa(val, moneyUnit), digits) + ''
      // 解决第二次编辑不能输入小数点的问题
      if (!(row[column.property + '__moneySwitchinput'] && (row[column.property + '__moneySwitchinput'] + '').split('.')[1]?.length <= 0)) row[column.property + '__moneySwitchinput'] = (val === '-' || val === '') ? (row[column.property + '__moneySwitchinput'] === '-' ? '-' : '') : bsTable.accurateChuFa(val, moneyUnit).toString()
      return [
        h('vxe-input', {
          ref: 'vxe-input' + column.property,
          props: {
            value: row[column.property + '__moneySwitchinput'],
            step: 1,
            min: -9007199254740991,
            max: 9007199254740991,
            clearable: true,
            placeholder: '请输入',
            digits: digits || 2,
            ...props,
            readonly: props.readonly || props.disabled,
            type: 'text'
          },
          on: {
            focus() {
              renderOpts.inputStatus = true
            },
            input(value) {
              // 因默认聚焦时值为0，输入-号后后不满足下面正则，会把-号丢失将前面-替换掉，导致聚焦时无法输入-号
              value = value.replace(/^[0-9]?-/, '-')
              var $event = window.event
              // 限制只能输入整数
              if (props.type === 'integer') {
                $event.currentTarget.value = value.toString().match(/^-?[0-9]\d*$/) || value.match(/-?/)
              }
            },
            keyup({ value, $event }) {
            },
            change({ value, $event }) {
              // const hasComma = value.split('.')[1]
              const valueLen = (value.split('.')[1] || '').length
              const isTrue = moneyUnit === 10000 ? valueLen <= (bsTable.tableConfigCp.globalConfig.moneyLimit ? 6 : 2) : valueLen <= 2 // 万元小数点后最多6位， 元小数点后最多2位
              if (isTrue) {
                value = bsTable.transInputToNumber($event.currentTarget.value)
                $event.currentTarget.value = value
                row[column.property + '__moneySwitchinput'] = value
                if (renderOpts.inputStatus) {
                  if (value > max) {
                    value = max
                  } else if (value < min) {
                    value = min
                  }
                  row[column.property + '__moneySwitchinput'] = value
                  $event.currentTarget.value = value
                }
                // 匹配如果为空时输入-号也可正常输入显示
                row[column.property] = (value === '') ? '' : (value === '-') ? '-' : bsTable.accurateChengFa(value, moneyUnit)
                // row[column.property] = (value === '-' || value === '') ? '' : bsTable.accurateChengFa(value, moneyUnit)
              } else {
                const oldValue = row[column.property + '__moneySwitchinput']
                $event.currentTarget.value = oldValue
                value = oldValue
              }
            },
            blur({ value, $event }) {
              let _v = value
              // 匹配如果为空时输入-号也可正常输入显示，如只输入了符号失去焦点值需清空
              if (value === '-') value = ''
              if (value && (value + '').split('.')[1]?.length <= 0) _v = (value + '').replace('.', '')
              renderOpts.inputStatus = false
              value = bsTable.transInputToNumber(_v)
              $event.currentTarget.value = value
              row[column.property + '__moneySwitchinput'] = value
              row[column.property] = bsTable.transToNumber(bsTable.accurateChengFa(row[column.property + '__moneySwitchinput'], moneyUnit), inputdigits, isRound)
              bsTable.cellOptionCallBack(params, { optionType: 'input', value: row[column.property], field: column.property, renderOpts })
            }
          }
        })
      ]
    },
    renderItem(h, renderOpts, { $form, data, property }) {
      let bsForm = $form.$parent
      let { editable, itemChange, constrainDataMap = {} } = bsForm
      let { props = {} } = renderOpts
      let moneyInputSwich = bsForm.moneyInputSwich || false
      let moneyUnit = moneyInputSwich ? (bsForm.moneyUnit || 1) : 1
      let isRound = bsForm.isRound
      let curConstrainDataMap = Object.assign({}, constrainDataMap[property] || {})
      let inputdigits = 2
      let digits = 2
      if (curConstrainDataMap['value'] !== undefined) {
        data[property] = String(curConstrainDataMap['value'])
        delete curConstrainDataMap['value']
      }
      let val = (data[property] + '').replace(/null|undefined|NaN/ig, '')
      props.inputdigits = String(moneyUnit).length - 1 + 2
      props = Object.assign({ type: 'text', placeholder: '请输入' }, props, curConstrainDataMap)
      // data[property + '__moneySwitchinput'] = bsForm.accurateChuFa((data[property] + '').replace(/null|undefined|NaN/ig, ''), moneyUnit) + ''
      inputdigits = props.inputdigits || props.digits || 2
      // 输入整数处理, 限制只能输入整数
      if (props.type === 'integer') {
        inputdigits = 0
        digits = 0
      }
      if (props.thousandsSymbolView !== false) {
        const { min = -9007199254740991, max = 9007199254740991 } = props
        if (!renderOpts.inputStatus) {
          data[property + '__moneySwitchinput'] = (val === '-' || val === '') ? (data[property + '__moneySwitchinput'] === '-' ? '-' : '') : bsForm.transToNumberLocalString(bsForm.accurateChuFa(val, moneyUnit), inputdigits)
        }
        if (editable !== false) {
          return [
            h('vxe-input', {
              ref: 'vxe-input-' + property,
              props: {
                value: data[property + '__moneySwitchinput'],
                ...props,
                readonly: props.readonly,
                disabled: props.disabled || props.editable === false,
                type: 'text'
              },
              on: {
                focus({ value, $event }) {
                  renderOpts.inputStatus = true
                  value = bsForm.transInputToNumber($event.currentTarget.value, inputdigits)
                  data[property + '__moneySwitchinput'] = value
                  $event.currentTarget.value = value
                },
                input(value) {
                  var $event = window.event
                  // 限制只能输入整数
                  if (props.type === 'integer') {
                    $event.currentTarget.value = value.toString().match(/^-?[0-9]\d*$/) || value.match(/-?/)
                  } else {
                    // $event.currentTarget.value = value.toString().match(/^\d+(?:\.\d{0,0})?/)
                    value = bsForm.transInputToNumber($event.currentTarget.value, inputdigits)
                    if (renderOpts.inputStatus) {
                      if (value > max) {
                        value = max
                      } else if (value < min) {
                        value = min
                      }
                      data[property + '__moneySwitchinput'] = value
                      $event.currentTarget.value = value
                    }
                    data[property] = (value === '-' || value === '') ? '' : bsForm.accurateChengFa(data[property + '__moneySwitchinput'], moneyUnit)
                  }
                },
                change({ value, $event }) {
                  renderOpts.inputing = true
                  $event = $event || window.event
                  value = bsForm.transInputToNumber($event.currentTarget.value, inputdigits)
                  if (renderOpts.inputStatus) {
                    if (value > max) {
                      value = max
                    } else if (value < min) {
                      value = min
                    }
                    data[property + '__moneySwitchinput'] = value
                    $event.currentTarget.value = value
                  }
                  data[property] = (value === '-' || value === '') ? '' : bsForm.accurateChengFa(data[property + '__moneySwitchinput'], moneyUnit)
                },
                blur({ value, $event }) {
                  if (renderOpts.inputing === true) {
                    value = bsForm.transToNumber($event.currentTarget.value, inputdigits, isRound)
                    data[property] = bsForm.accurateChengFa(value, moneyUnit)
                    value = bsForm.transToNumberLocalString(value, digits)
                    $event.currentTarget.value = value
                    data[property + '__moneySwitchinput'] = value
                    itemChange({ $form, property, itemValue: data[property], data, renderOpts })
                  } else {
                    value = bsForm.transToNumberLocalString(value, digits)
                    $event.currentTarget.value = value
                    data[property + '__moneySwitchinput'] = value
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
            return [<span class="text">{data[property + '__moneySwitchinput']}</span>]
          }
        }
      } else {
        data[property + '__moneySwitchinput'] = (val === '-' || val === '') ? (data[property + '__moneySwitchinput'] === '' ? '' : '') : bsForm.accurateChuFa(val, moneyUnit) + ''
        if (editable !== false && props.editable !== false) {
          return [
            h('vxe-input', {
              ref: 'vxe-input' + property,
              props: {
                value: data[property + '__moneySwitchinput'],
                step: 1,
                maxlength: 14,
                min: 0,
                max: 1000000000000,
                digits: props.digits || 2,
                type: 'float',
                ...props,
                readonly: props.readonly,
                disabled: props.disabled || props.editable === false
              },
              on: {
                input(value, $event) {
                  $event = $event || window.event
                  value = bsForm.transInputToNumber($event.currentTarget.value)
                  $event.currentTarget.value = value
                  data[property + '__moneySwitchinput'] = value
                  data[property] = (value === '-' || value === '') ? '' : bsForm.accurateChengFa(data[property + '__moneySwitchinput'], moneyUnit)
                },
                blur({ value }) {
                  data[property + '__moneySwitchinput'] = value
                  data[property] = bsForm.transToNumber(bsForm.accurateChengFa(data[property + '__moneySwitchinput'], moneyUnit), inputdigits, isRound)
                  bsForm.itemChange({ $form, property, itemValue: data[property], data, renderOpts })
                }
              }
            })
          ]
        } else {
          if ($form.$parent.uneditableBorder) {
            return [<span class="text tl border-text">{ data[property + '__moneySwitchinput']}</span>]
          } else {
            return [<span class="text">{ data[property + '__moneySwitchinput']}</span>]
          }
        }
      }
    }
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
      renderOpts = defaultGlobalUtils.deepCopy(renderOpts)
      // renderOpts = defaultGlobalUtils.mergeContrainConfig(renderOpts, params, context)
      let { props = {} } = renderOpts
      let { column, row } = params
      let bsTable = context.$grid.$parent
      return [
        h('edit-down-textarea', {
          ref: 'vxe-edit-down-textarea' + column.property,
          props: {
            type: 'table',
            clearable: true,
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
      if ($form.$parent.editable !== false && props.editable !== false) {
        return [
          h('vxe-textarea', {
            ref: 'vxe-textarea' + property,
            props: {
              value: data[property] + '',
              clearable: true,
              ...props,
              maxlength: props.maxlength || 1000,
              showWordCount: true,
              disabled: props.disabled
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
    renderCell(h, { props }, { row, column }) {
      let quiteDay = row[column.property] % 1
      quiteDay = quiteDay <= 0.25 ? 0 : (quiteDay >= 0.75 ? 1 : 0.5)
      row[column.property] = Math.floor(row[column.property] / 1) + quiteDay
      row[column.property + '__viewSort'] = row[column.property]
      return [<span>{row[column.property]}</span>]
    },
    renderDefault(h, { props }, { row, column }) {
      let quiteDay = row[column.property] % 1
      quiteDay = quiteDay <= 0.25 ? 0 : (quiteDay >= 0.75 ? 1 : 0.5)
      row[column.property] = Math.floor(row[column.property] / 1) + quiteDay
      row[column.property + '__viewSort'] = row[column.property]
      return [<span>{row[column.property]}</span>]
    },
    renderEdit(h, { props }, { row, column }) {
      return [
        <vxe-input
          placeholder = "请输入天数"
          type="number"
          clearable
          { ...{ props } }
          v-model={row[column.property]}
        ></vxe-input>
      ]
    },
    renderItem(h, renderOpts, { $form, property, data, item }) {
      let { props } = renderOpts
      props = props || {}
      if ($form.$parent.editable !== false && props.editable !== false) {
        return [
          h('vxe-input', {
            ref: 'vxe-input' + property,
            props: {
              placeholder: '请输入天数',
              type: 'number',
              clearable: true,
              value: data[property],
              ...props
            },
            on: {
              input(value) {
                data[property] = value
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
        return [
          <span class="text block"> {data[property]} </span>
        ]
      }
    }
  },
  $vxeTime: {
    autofocus: '.vxe-input--inner',
    // 时间格式化渲染器
    renderCell(h, { props }, { row, column }) {
      props = props || {}
      props.format = props.format || 'YYYY-MM-DD hh:mm:ss'
      let dateTime = (row[column.property] + '').replace(/null|undefined/ig, '')
      if (dateTime) {
        let date = dateTime.length === 8 ? dateTime.substring(0, 4) + '-' + dateTime.substring(4, 6) + '-' + dateTime.substring(6, 8) : (dateTime.length === 14 ? dateTime.substring(0, 4) + '-' + dateTime.substring(4, 6) + '-' + dateTime.substring(6, 8) + ' ' + dateTime.substring(8, 10) + ':' + dateTime.substring(10, 12) + ':' + dateTime.substring(12, 14) : dateTime)
        row[column.property + '__viewSort'] = isNaN(new Date(dateTime).getTime()) ? new Date(date).format(props.format) : new Date(dateTime).format(props.format)
      } else {
        row[column.property + '__viewSort'] = ''
      }
      return [<span>{ row[column.property + '__viewSort'] }</span>]
    },
    renderDefault(h, { props }, { row, column }) {
      props = props || {}
      props.format = props.format || 'YYYY-MM-DD hh:mm:ss'
      let dateTime = (row[column.property] + '').replace(/null|undefined/ig, '')
      if (dateTime) {
        let date = dateTime.length === 8 ? dateTime.substring(0, 4) + '-' + dateTime.substring(4, 6) + '-' + dateTime.substring(6, 8) : (dateTime.length === 14 ? dateTime.substring(0, 4) + '-' + dateTime.substring(4, 6) + '-' + dateTime.substring(6, 8) + ' ' + dateTime.substring(8, 10) + ':' + dateTime.substring(10, 12) + ':' + dateTime.substring(12, 14) : dateTime)
        row[column.property + '__viewSort'] = isNaN(new Date(dateTime).getTime()) ? new Date(date).format(props.format) : new Date(dateTime).format(props.format)
      } else {
        row[column.property + '__viewSort'] = ''
      }
      return [<span>{ row[column.property + '__viewSort'] }</span>]
    },
    renderEdit(h, { props }, { row, column }) {
      return [
        h('vxe-input', {
          ref: 'vxe-input' + column.property,
          props: {
            placeholder: '请选择时间',
            type: 'date',
            clearable: true,
            value: row[column.property + '__viewSort'],
            ...props,
            transfer: true
          },
          on: {
            input(value) {
              row[column.property + '__viewSort'] = value ? new Date(value).format(props.format) : ''
              row[column.property] = row[column.property + '__viewSort']
            },
            blur({ value }) {
              row[column.property + '__viewSort'] = value ? new Date(value).format(props.format) : ''
              row[column.property] = row[column.property + '__viewSort']
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
      if ($form.$parent.editable !== false && props.editable !== false) {
        return [
          h('vxe-input', {
            ref: 'vxe-input' + property,
            props: {
              placeholder: '请选择时间',
              type: 'date',
              clearable: true,
              value: data[property + '__viewSort'],
              ...props,
              transfer: true,
              'disabled-method': ({ date }) => {
                if (props.isLimitMinYear && props.minYear) {
                  return Number(new Date(date).getFullYear()) < Number(props.minYear)
                }
                return false
              }
            },
            on: {
              input(value) {
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
        return [
          <span class="text block"> {data[property + '__viewSort']} </span>
        ]
      }
    }
  },
  $vxeRadio: {
    renderEdit(h, { options, props, propsC }, { row, column }) {
      props = props || {}
      propsC = propsC || {}
      return [
        <vxe-radio-group {...{ props }} v-model={row[column.property]} placeholder="请选择">
          {options.map((item, index) => {
            return [
              <vxe-radio
                label={item.value}
                { ...{ propsC } }
              >
                {item.label}
              </vxe-radio>
            ]
          })}
        </vxe-radio-group>
      ]
    },
    renderDefault(h, { options, props }, { row, column }, context) {
      let value = ''
      options.forEach((item, index) => {
        if (row[column.property] === item.value) {
          value = item.label
        }
      })
      row[column.property + '__viewSort'] = value
      return [<span>{value}</span>]
    },
    renderCell(h, { options, props }, { row, column }) {
      let value = ''
      options.forEach((item, index) => {
        if (row[column.property] === item.value) {
          value = item.label
        }
      })
      row[column.property + '__viewSort'] = value
      return [<span>{value}</span>]
    },
    renderItem(h, renderOpts, { $form, property, data }) {
      let { props, propsC, options } = renderOpts
      if ($form.$parent.editable !== false && props.editable !== false) {
        return [
          h('vxe-radio-group', {
            props: {
              value: data[property],
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
                disabled: item.disabled,
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
              value: data[property],
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
        <edit-down-json type={'table'} params={ params } ></edit-down-json>
      ]
    },
    renderDefault(h, cellRender, { row, column }, context) {
      let value = JSON.stringify(row[column.property])
      row[column.property + '__viewSort'] = value
      return [<span class="text block">{value}</span>]
    },
    renderCell(h, cellRender, { row, column }, context) {
      let value = JSON.stringify(row[column.property])
      row[column.property + '__viewSort'] = value
      return [<span class="text block">{value}</span>]
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
                defaultGlobalUtils.debounceItemChange(() => {
                  $form.$parent.itemChange({ $form, property, itemValue: value, data, renderOpts })
                })
              }
            }
          })
        ]
      } else {
        return [
          <edit-down-json type={'form'} params={ params }></edit-down-json>
        ]
      }
    }
  },
  $vxeIntervar: {
    autofocus: '.vxe-input--inner',
    // 阶段选择 渲染器 基础版本
    renderCell(h, { props }, params) {
      const { row, column } = params
      const propertyArr = column.property.split('##')
      row[column.property] = row[propertyArr[0]] + '##' + row[propertyArr[1]]
      row[column.property + '__viewSort'] = row[propertyArr[0]] + '至' + row[propertyArr[1]]
      return [
        <EditIntervarInput constProps = { props } params={ params } type='table' editable={false}></EditIntervarInput>
      ]
    },
    renderDefault(h, { props }, params) {
      const { row, column } = params
      const propertyArr = column.property.split('##')
      row[column.property] = row[propertyArr[0]] + '##' + row[propertyArr[1]]
      row[column.property + '__viewSort'] = row[propertyArr[0]] + '至' + row[propertyArr[1]]
      return [
        <EditIntervarInput constProps={props} params={params} type='table' editable={false}></EditIntervarInput>
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
      if ($form.$parent.editable !== false && props.editable !== false) {
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
                  renderOpts })
              }
            }
          })
        ]
      } else {
        return [
          <EditIntervarInput constProps = { props } params={ params } type='form' editable={false}></EditIntervarInput>
        ]
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
      if (Object.keys(row).includes('openSwitch')) {
        props = Object.assign({}, props, { disabled: !row.openSwitch })
      }
      return [
        <vxe-switch v-model={row[column.property]} open-label={ options[0].label } close-label={ options[1].label } open-value={ options[0].value } close-value={ options[1].value } {...{ props }}></vxe-switch>
        // <el-switch
        //   {...{ props }}
        //   active-text={ options[0].label }
        //   inactive-text={ options[1].label }
        //   v-model={row[column.property]}
        //   active-color="#13ce66"
        //   active-value={ options[0].value }
        //   inactive-value={ options[1].value }>
        // </el-switch>
      ]
    },
    renderDefault(h, { props, options }, { row, column }) {
      if (Object.keys(row).includes('openSwitch')) {
        props = Object.assign({}, props, { disabled: !row.openSwitch }) || {}
      }
      console.log(props)
      return [
        <vxe-switch value={row[column.property]} open-label={ options[0].label } close-label={ options[1].label } open-value={ options[0].value } close-value={ options[1].value } {...{ props }}></vxe-switch>

        // <el-switch
        //   {...{ props }}
        //   active-text={ options[0].label }
        //   inactive-text={ options[1].label }
        //   v-model={row[column.property]}
        //   active-color="#13ce66"
        //   active-value={ options[0].value }
        //   inactive-value={ options[1].value }>
        // </el-switch>
      ]
    },
    renderEdit(h, { props, options }, { row, column }) {
      if (Object.keys(row).includes('openSwitch')) {
        props = Object.assign({}, props, { disabled: !row.openSwitch })
      }
      return [
        <vxe-switch v-model={row[column.property]} open-label={options[0].label} close-label={options[1].label} open-value={options[0].value} close-value={options[1].value} {...{ props } }></vxe-switch>
        // <el-switch
        //   {...{ props }}
        //   active-text={ options[0].label }
        //   inactive-text={ options[1].label }
        //   v-model={row[column.property]}
        //   active-color="#13ce66"
        //   active-value={ options[0].value }
        //   inactive-value={ options[1].value }>
        // </el-switch>
      ]
    },
    renderItem(h, renderOpts, params) {
      const { $form, property, data } = params
      const { props } = renderOpts
      const { options } = renderOpts
      if ($form.$parent.editable !== false && props.editable !== false) {
        return [
          h('vxe-switch', {
            props: {
              value: data[property],
              openLabel: options[0].label,
              closeLabel: options[1].label,
              openValue: options[0].value,
              closeValue: options[1].value,
              ...props
            },
            on: {
              input(value) {
                data[property] = value
                $form.$parent.itemChange({
                  $form,
                  property,
                  itemValue: value,
                  data,
                  renderOpts })
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
              disabled: true,
              ...props
            },
            on: {
              input(value) {
              }
            }
          })
        ]
      }
    }
  },
  $vxeFormDays: {
    // 天数渲染器，不足0.25天按0记，大于0.75天按1天记，其他按0.5天记
    renderItem(h, renderOpts, { $form, property, data }) {
      let { props } = renderOpts
      props = props || {}
      if ($form.$parent.editable !== false || props.editable !== false) {
        return [
          h('vxe-input', {
            ref: 'vxe-input' + property,
            props: {
              placeholder: '请输入天数',
              type: 'number',
              clearable: true,
              value: data[property],
              ...props
            },
            on: {
              input(value) {
                clearTimeout(data['timer_' + property])
                data['timer_' + property] = setTimeout(() => {
                  let quiteDay = data[property] % 1
                  quiteDay = quiteDay <= 0.25 ? 0 : (quiteDay >= 0.75 ? 1 : 0.5)
                  data[property] = Math.floor(data[property] / 1) + quiteDay
                  data[property] = value
                  $form.$parent.itemChange({ $form, property, itemValue: value, data, renderOpts })
                  clearTimeout(data['timer_' + property])
                })
              }
            }
          })
        ]
      } else {
        return [
          <span class="tc fn-inline" {...{ props }}> {data[property]} </span>
        ]
      }
    }
  },
  $vxeProgress: {
    // 进度条
    renderCell(h, { props, options }, { row, column }, context) {
      let bsTable = context.$grid.$parent
      let val = parseFloat((row[column.property] + '').replace(/null|undefined|NaN|Infinity\s+/ig, ''))
      val = Number(bsTable.accurateFixed(isNaN(val) ? 0 : val, 2))
      return [
        <el-progress text-inside={true} stroke-width={20} percentage={val} style="line-height:30px"></el-progress>
      ]
    },
    renderDefault(h, { props, options }, { row, column }, context) {
      let bsTable = context.$grid.$parent
      let val = parseFloat((row[column.property] + '').replace(/null|undefined|NaN|Infinity\s+/ig, ''))
      val = Number(bsTable.accurateFixed(isNaN(val) ? 0 : val, 2))
      return [
        <el-progress text-inside={true} stroke-width={20} percentage={val} style="line-height:30px"></el-progress>
      ]
    },
    renderEdit(h, { props, options }, { row, column }, context) {
      let bsTable = context.$grid.$parent
      let val = parseFloat((row[column.property] + '').replace(/null|undefined|NaN|Infinity\s+/ig, ''))
      val = Number(bsTable.accurateFixed(isNaN(val) ? 0 : val, 2))
      return [
        <el-progress text-inside={true} stroke-width={20} percentage={val} style="line-height:30px"></el-progress>
      ]
    },
    renderItem(h, renderOpts, params) {
      const { property, data, $form } = params
      let value = parseFloat((data[property] + '').replace(/null|undefined|NaN|Infinity|\s+/ig, ''))
      value = Number($form.$parent.accurateFixed(isNaN(value) ? 0 : value, 2))
      return [
        <el-progress text-inside={true} stroke-width={20} percentage={value} style="line-height:30px"></el-progress>
      ]
    }
  },
  $vxeEditDownConditions: {
    autofocus: '.vxe-input--inner',
    renderEdit(h, { name, options, props }, params) {
      return [
        <edit-down-conditions constProps={ props } params={ params } type='table'></edit-down-conditions>
      ]
    },
    renderDefault(h, cellRender, { row, column }, context) {
      row[column.property + '__viewSort'] = row[column.property]
      return [<span class="text block">{row[column.property]}</span>]
    },
    renderCell(h, cellRender, { row, column }, context) {
      row[column.property + '__viewSort'] = row[column.property]
      return [<span class="text block">{row[column.property]}</span>]
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
          <edit-down-conditions constProps={ props } params={ params } type='form'></edit-down-conditions>
        ]
      }
    }
  },
  $vxeRowCellRenderer: {
    // 列渲染器
    renderCell(h, renderOpts, { row, column }, context) {
      if (row[column.property + 'renderOpts'].name) {
        return defaultPublicRenders[row[column.property + 'renderOpts'].name].renderCell(h, row[column.property + 'renderOpts'], { row, column }, context)
      } else {
        return defaultPublicRenders[renderOpts.name] ? defaultPublicRenders[renderOpts.name].renderCell(h, row[column.property + 'renderOpts'], { row, column }, context) : ''
      }
    },
    renderEdit(h, renderOpts, { row, column }, context) {
      if (row[column.property + 'renderOpts'].name) {
        return defaultPublicRenders[row[column.property + 'renderOpts'].name].renderEdit(h, row[column.property + 'renderOpts'], { row, column }, context)
      } else {
        return defaultPublicRenders[renderOpts.name] ? defaultPublicRenders[renderOpts.name].renderEdit(h, row[column.property + 'renderOpts'], { row, column }, context) : ''
      }
    },
    renderDefault(h, renderOpts, { row, column }, context) {
      if (row[column.property + 'renderOpts'].name) {
        return defaultPublicRenders[row[column.property + 'renderOpts'].name].renderDefault(h, row[column.property + 'renderOpts'], { row, column }, context)
      } else {
        return defaultPublicRenders[renderOpts.name] ? defaultPublicRenders[renderOpts.name].renderDefault(h, row[column.property + 'renderOpts'], { row, column }, context) : ''
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
          return publicRender[render.name].renderEdit(h, render, { row, column }, context)
        } else if (!render && curRendermap.editable) {
          return publicRender['$vxeInput'].renderEdit(h, {}, { row, column }, context)
        } else if (render && publicRender[render.name]) {
          return publicRender[render.name].renderCell(h, render, { row, column }, context)
        } else {
          return publicRender['$vxeInput'].renderCell(h, {}, { row, column }, context)
        }
      } else {
        if (render && publicRender[render.name]) {
          return publicRender[render.name].renderCell(h, render, { row, column }, context)
        } else {
          return publicRender['$vxeInput'].renderCell(h, {}, { row, column }, context)
        }
      }
    },
    renderEdit(h, renderOpts, { row, column }, context) {
      let mode = context.$grid.$parent.$parent.mode
      let curRendermap = context.$grid.$parent.$parent.tableRenderMap.map[row['mapid']]
      let render = curRendermap.render
      if (mode !== 'detail') {
        if (render && curRendermap.editable) {
          return publicRender[render.name].renderEdit(h, render, { row, column }, context)
        } else if (!render && curRendermap.editable) {
          return publicRender['$vxeInput'].renderEdit(h, {}, { row, column }, context)
        } else if (render && !curRendermap.editable) {
          return publicRender[render.name].renderCell(h, render, { row, column }, context)
        } else {
          return publicRender['$vxeInput'].renderCell(h, {}, { row, column }, context)
        }
      } else {
        if (render) {
          return publicRender[render.name].renderCell(h, render, { row, column }, context)
        } else {
          publicRender['$vxeInput'].renderCell(h, {}, { row, column }, context)
        }
      }
    },
    renderDefault(h, renderOpts, { row, column }, context) {
      let editable = context.$grid.$parent.$parent.mode
      let curRendermap = context.$grid.$parent.$parent.tableRenderMap.map[row['mapid']]
      let render = curRendermap.render
      if (editable !== 'detail') {
        if (render && editable && curRendermap.editable) {
          return publicRender[render.name].renderEdit(h, render, { row, column }, context)
        } else if (!render && curRendermap.editable) {
          return publicRender['$vxeInput'].renderEdit(h, {}, { row, column }, context)
        } else if (render) {
          return publicRender[render.name].renderCell(h, render, { row, column }, context)
        } else {
          publicRender['$vxeInput'].renderCell(h, {}, { row, column }, context)
        }
      } else {
        if (render) {
          return publicRender[render.name].renderCell(h, render, { row, column }, context)
        } else {
          publicRender['$vxeInput'].renderCell(h, {}, { row, column }, context)
        }
      }
    }
  },
  $vxeEditDownTerm: {
    autofocus: '.vxe-input--inner',
    renderDefault(h, { props = {} }, params) {
      const { row, column } = params
      const value = row[column.property] || ''
      const year = value.slice(0, 2) || '0'
      const month = value.slice(2, 4) || '0'
      const day = value.slice(4, 6) || '0'
      row[column.property + '__viewSort'] = `${year}年${month}月${day}天`
      return [<span class="text block">{row[column.property + '__viewSort']}</span>]
    },
    renderEdit(h, renderOpts, params, context) {
      let { props = {} } = renderOpts
      const { row, column } = params
      let bsTable = context.$grid.$parent
      return [
        h('edit-down-term', {
          props: {
            editable: props.editable,
            value: row[column.property],
            ...props
          },
          on: {
            input(value) {
              row[column.property] = value
              bsTable.cellOptionCallBack(params)
            }
          }
        })
      ]
    },
    renderCell(h, { props = {} }, params) {
      const { row, column } = params
      const value = row[column.property] || ''
      const year = value.slice(0, 2) || '0'
      const month = value.slice(2, 4) || '0'
      const day = value.slice(4, 6) || '0'
      row[column.property + '__viewSort'] = `${year}年${month}月${day}天`
      return [<span class="text block">{row[column.property + '__viewSort']}</span>]
    },
    renderItem(h, renderOpts, { $form, property, data }) {
      const { props = {} } = renderOpts
      if ($form.$parent.editable !== false && props.editable !== false) {
        return [
          h('edit-down-term', {
            props: {
              editable: props.editable,
              value: data[property],
              ...props
            },
            on: {
              input(value) {
                data[property] = value
                $form.$parent.itemChange({ $form, property, itemValue: data[property], data })
              }
            }
          })
        ]
      } else {
        const value = data[property] || ''
        const year = value.slice(0, 2) || '0'
        const month = value.slice(2, 4) || '0'
        const day = value.slice(4, 6) || '0'
        return [
          <span class="text block" {...{ props }}>`${year}年${month}月${day}天`</span>
        ]
      }
    }
  },
  $vxeNewMoney: {
    // 输入框
    autofocus: '.vxe-input--inner',
    renderDefault(h, { props }, { row, column, $grid }, context) {
      props = props || {}
      let bsTable = context.$grid.$parent
      let showZero = context.$grid.$parent.showZero
      let viewDigits = 0
      let val = isNaN(parseFloat(row[column.property])) ? '' : parseFloat(row[column.property])
      if (props.unit === 2) {
        val = isNaN(parseFloat(row[column.property])) ? '' : parseFloat(row[column.property])
      } else if (props.unit === 1) {
        if (val) {
          val = Number((val).toFixed(2)).toLocaleString()
          val = val.split('.').length === 1 ? val + '.00' : (val.split('.')[1].length === 1 ? val + '0' : val)
          if (showZero) {
            val = val === '0.00' ? '' : val
          }
        }
      }
      row[column.property + '__viewSort'] = val?.toString().trim()?.length > 0 ? bsTable.transToNumberLocalString(val, viewDigits) : ''
      return [<span class="text">{val?.toString()?.trim()?.length > 0 ? bsTable.transToNumberLocalString(val, viewDigits) : ''}</span>]
    },
    // renderEdit(h, { props }, { row, column, $grid }) {
    //   // let val = isNaN(parseFloat(row[column.property])) ? '0.00' : parseFloat(row[column.property])
    //   // row[column.property] = val
    //   props = props || {}
    //   // <vxe-input v-model="value504" placeholder="小数间隔 2.3" type="float" step="2.3" clearable></vxe-input>
    //   return [
    //     <vxe-input
    //       v-model={row[column.property]}
    //       step={ 1 }
    //       type="float"
    //       min = { 0.00 }
    //       {...{ props }}
    //       max={999999999999999}
    //       placeholder="请输入"
    //       clearable
    //       disabled
    //     ></vxe-input>
    //     // <input class="my-cell" text="text" v-model={ row[column.property] } />
    //   ]
    // },
    renderCell(h, { props }, { row, column, $grid }, context) {
      props = props || {}
      let bsTable = context.$grid.$parent
      let val = isNaN(parseFloat(row[column.property])) ? '' : parseFloat(row[column.property])
      let viewDigits = 0
      let showZero = context.$grid.$parent.showZero
      if (props.unit === 2) {
      } else if (props.unit === 1) {
        val = Number((val).toFixed(2)).toLocaleString()
        val = val.split('.').length === 1 ? val + '.00' : (val.split('.')[1].length === 1 ? val + '0' : val)
        if (showZero) {
          val = val === '0.00' ? '' : val
        }
      }
      row[column.property + '__viewSort'] = val?.toString()?.trim()?.length > 0 ? bsTable.transToNumberLocalString(val, viewDigits) : ''
      return [<span class="text">{val?.toString()?.trim()?.length > 0 ? bsTable.transToNumberLocalString(val, viewDigits) : ''}</span>]
    },
    renderItem(h, renderOpts, { $form, data, property }) {
      let { props } = renderOpts
      props = props || {}
      if ($form.$parent.editable !== false) {
        return [
          h('vxe-input', {
            ref: 'vxe-input' + property,
            props: {
              value: data[property],
              step: 1,
              min: 0.00,
              ...props,
              max: 1000000000000
            },
            on: {
              input(value) {
                data[property] = value
                $form.$parent.itemChange({ $form, property, itemValue: value, data, renderOpts })
              }
            }
          })
        ]
      } else {
        let val = isNaN(parseFloat(data[property])) ? 0 : parseFloat(data[property])
        data[property] = val.toFixed(2)
        // let moneyUnit = context.$grid.$parent.moneyUnit ? context.$grid.$parent.moneyUnit : 1
        // eslint-disable-next-line no-useless-escape
        val = data[property]?.toString()?.trim()?.length > 0 ? Number(val.toFixed(2)).toLocaleString() : ''
        return [<span class="tl" >{val}</span>]
      }
    }
  },
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
  $vxeDateInput: {
    renderItem(h, renderOpts, { $form, property, data }) {
      data[property] = (data[property] + '').replace(/null|undefined/ig, '')
      let { props } = renderOpts
      props = props || {};
      if ($form.$parent.editable !== false || props.editable !== false) {
        return [
          h('vxe-input', {
            ref: 'vxe-input' + property,
            props: {
              value: data[property],
              ...props
            },
            on: {
              change(value) {
                data[property] = value?.value
                $form.$parent.itemChange({ $form, property, itemValue: value?.value, data, renderOpts });
              }
            }
          })
        ]
      } else {
        return [
          <span class="tl fn-inline" {...{ props }}> {data[property]} </span>
        ]
      }
    }
  }
}
// 全局提供表格特有渲染器 5组，分别为：手动排序渲染器，超链接渲染器，嵌套表渲染器，空数据渲染器，操作列渲染器。
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
    renderCell(h, renderOpts, { row, column }) {
      return [<span class="text href-a"><a>{row[column.property]}</a></span>]
    },
    renderEdit(h, renderOpts, { row, column }) {
      return [<span class="text href-a"><a>{row[column.property]}</a></span>]
    },
    renderDefault(h, renderOpts, { row, column }) {
      return [<span class="text href-a"><a>{row[column.property]}</a></span>]
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
      const { statusField, options = {} } = props
      let renderOption = options[row[statusField] || column.field]
      if (renderOption) {
        return [
          <div class="row-option row-option-group">
            {
              renderOption.map((item, index) => {
                if (item.type === 'button') {
                  let disabled = false
                  if (item.disabledHandle) {
                    disabled = item.disabledHandle(row)
                  }
                  return <vxe-button class={item.class || ''} disabled={disabled} status={!disabled ? item.btnStatus : 'info'} size="mini" on-click={() => self.onOptionRowClick({ row, column, optionType: item.code })}>{item.label}</vxe-button>
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
                    const { isAvailableObj = null } = item
                    let disabled = false
                    if (isAvailableObj) {
                      if (isAvailableObj.targetField) {
                        disabled = Number(row[isAvailableObj.targetField]) !== isAvailableObj.targetVal
                      }
                      // 只要目标字段有值，按钮就不可操作
                      if (isAvailableObj.valField) {
                        disabled = !['', null, 'null', undefined].includes(row[isAvailableObj.valField])
                      }
                      // 如果 isAvailableObj.disabled 为true， 优先处理isAvailableObj.disabled
                      if (isAvailableObj.disabled) {
                        disabled = isAvailableObj.disabled
                      }
                    }
                    if (item.disabledHandle) {
                      disabled = item.disabledHandle(row)
                    }
                    return <vxe-button class={item.class || ''} disabled={disabled} status={item.btnStatus} size="mini" on-click={() => self.onOptionRowClick({ row, column, optionType: item.code })}>{item.label}</vxe-button>
                  } else if (item.type === 'icon') {
                    return <span style="display:inline-block;width:18px;height:18px;font-size:12px;margin:0 2px;cursor:pointer;" on-click={() => self.onOptionRowClick({ row, column, optionType: item.code })}><i class={item.icon} style={item.color}></i></span>
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
                  let disabled = false
                  if (item.disabledHandle) {
                    disabled = item.disabledHandle(row)
                  }
                  return <vxe-button class={item.class || ''} disabled={disabled} status={item.btnStatus} on-click={() => self.onOptionRowClick({ row, column, optionType: item.code })}>{item.label}</vxe-button>
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
                    let disabled = false
                    if (item.disabledHandle) {
                      disabled = item.disabledHandle(row)
                    }
                    return <vxe-button class={item.class || ''} disabled={disabled} status={item.btnStatus} on-click={() => self.onOptionRowClick({ row, column, optionType: item.code })}>{item.label}</vxe-button>
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
                  let disabled = false
                  if (item.disabledHandle) {
                    disabled = item.disabledHandle(row)
                  }
                  return <vxe-button class={item.class || ''} disabled={disabled} status={item.btnStatus} on-click={() => self.onOptionRowClick({ row, column, optionType: item.code })}>{item.label}</vxe-button>
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
          <slot name={'CellDefaultSlot' + column.property } params={ params }></slot>
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
          <slot name={'CellEditSlot' + column.property } params={ params }></slot>
        </div>
      ]
    },
    renderItem(h, renderOpts, params, context) {
      const { property } = params
      // <template slot-scope="{ row, index }" slot="dateNo"></template>
      return [
        <div class="table-custom-render">
          <slot name={'itemSlot' + property } params={ params }></slot>
        </div>
      ]
    }
  },
  $vxeHref: {
    // 文本渲染
    renderCell(h, renderOpts, { row, column }, context) {
      // @click="bsTable.cellOptionCallBack(params, { optionType: 'input', value: row[column.property], field: column.property, renderOpts })"
      const bsTable = context.$grid.$parent
      return [<span class="text" style="color:#409eff;cursor:pointer;" href="javascript:;" on-click={() => bsTable.cellOptionCallBack(row, column)}>{row[column.property]}</span>]
    },
    renderEdit(h, renderOpts, { row, column }, context) {
      const bsTable = context.$grid.$parent
      return [<span class="text href-a" style="color:#409eff;cursor:pointer;" href="javascript:;" on-click={() => bsTable.cellOptionCallBack(row, column)}>{row[column.property]}</span>]
    },
    renderDefault(h, renderOpts, { row, column }, context) {
      const bsTable = context.$grid.$parent
      return [<span class="text href-a" style="color:#409eff;cursor:pointer;" href="javascript:;" on-click={() => bsTable.cellOptionCallBack(row, column)}>{row[column.property]}</span>]
    }
  }
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
          {gooupTitle }
        </BsTitle>
      ]
    }
  },
  $formCalculateRender: {
    renderItem(h, renderOpts, { $form, data, property }) {
      return defaultGlobalUtils.formCalculateRender(h, renderOpts, { $form, data, property })
    }
  },
  $formMoneyInputRender: {
    // 输入框
    renderItem(h, renderOpts, { $form, data, property }) {
      data[property] = (data[property] + '').replace(/null|undefined|Infinity/ig, '')
      let { props } = renderOpts
      props = props || {}
      if ($form.$parent.editable !== false || props.editable !== false) {
        return [
          h('vxe-input', {
            ref: 'vxe-input' + property,
            props: {
              value: data[property],
              step: 1,
              min: 0.00,
              ...props,
              max: 1000000000000
            },
            on: {
              input(value) {
                data[property] = value
                $form.$parent.itemChange({ $form, property, itemValue: value, data, renderOpts })
              }
            }
          })
        ]
      } else {
        let val = isNaN(parseFloat(data[property])) ? 0 : parseFloat(data[property])
        val = val.toFixed(2).toLocaleString()
        val = val.split('.').length === 1 ? val + '.00' : (val.split('.')[1].length === 1 ? val + '0' : val)
        return [<span class="tl fn-inline" {...{ props }} >{val}</span>]
      }
    }
  },
  $formMoneyTextRender: {
    // 废弃
    renderItem(h, renderOpts, { data, column, property }, context) {
      let { props } = renderOpts
      props = props || {}
      let val = isNaN(parseFloat(data[property])) ? 0 : parseFloat(data[property])
      data[property] = val.toFixed(2)
      // let moneyUnit = context.$grid.$parent.moneyUnit ? context.$grid.$parent.moneyUnit : 1
      // eslint-disable-next-line no-useless-escape
      val = Number(val.toFixed(2)).toLocaleString()
      return [<span class="tl" {...{ props }} >{val}</span>]
    }
  },
  $groupTitle: {
    renderItem(h, renderOpts, { $form, data, property }) {
      let gooupTitle = ''
      $form.items.forEach((item, index) => {
        if (item.field === property) {
          item.span = 24
          gooupTitle = item.groupTitle
        }
      })
      return [
        <div class="form-group-title" >
          <i class="fn-inline"></i>
          <span class="fn-inline">
            {gooupTitle}
          </span>
          <em class="fn-inline"></em>
        </div>
      ]
    }
  },
  $vxelinkageText: {
    renderItem(h, renderOpts, { $form, property, data }) {
      let { props } = renderOpts
      // let renderDataCb = 'renderDataCb'
      // $form.$parent.formItemsConfigIn.some((item) => {
      //   if (item['field'] === property) {
      //     renderDataCb = item.itemRender && item.itemRender.renderDataCb
      //     return true
      //   }
      // })
      // data[property] = typeof (renderDataCb) === 'function' ? renderDataCb(h, { props, name, options }, { $form, property, data }) : data[property]
      props = props || {}

      if ($form.$parent.editable !== false || props.editable !== false) {
        return [
          h('vxe-textarea', {
            ref: 'vxe-textarea' + property,
            props: {
              value: data[property],
              ...props
            },
            on: {
              input(value) {
                data[property] = value
                $form.$parent.itemChange({ $form, property, itemValue: value, data, renderOpts })
              }
            }
          })
        ]
      } else {
        return [
          <span class="tl fn-inline" {...{ props }}> {data[property]} </span>
        ]
      }
    }
  },
  $vxeFormDays: {
    // 天数渲染器，不足0.25天按0记，大于0.75天按1天记，其他按0.5天记
    renderItem(h, renderOpts, { $form, property, data }) {
      let { props } = renderOpts
      props = props || {}
      if ($form.$parent.editable !== false || props.editable !== false) {
        return [
          h('vxe-input', {
            ref: 'vxe-input' + property,
            props: {
              placeholder: '请输入天数',
              type: 'number',
              clearable: true,
              value: data[property],
              ...props
            },
            on: {
              input(value) {
                clearTimeout(data['timer_' + property])
                data['timer_' + property] = setTimeout(() => {
                  let quiteDay = data[property] % 1
                  quiteDay = quiteDay <= 0.25 ? 0 : (quiteDay >= 0.75 ? 1 : 0.5)
                  data[property] = Math.floor(data[property] / 1) + quiteDay
                  data[property] = value
                  $form.$parent.itemChange({ $form, property, itemValue: value, data, renderOpts })
                  clearTimeout(data['timer_' + property])
                })
              }
            }
          })
        ]
      } else {
        return [
          <span class="tc fn-inline" {...{ props }}> {data[property]} </span>
        ]
      }
    }
  },
  $vxeFormTime: {
    // 天数渲染器，不足0.25天按0记，大于0.75天按1天记，其他按0.5天记
    renderItem(h, renderOpts, { $form, property, data }) {
      data[property] = (data[property] + '').replace(/null|undefined/ig, '')
      let { props, format } = renderOpts
      format = format || 'YYYY-MM-DD hh:mm:ss'
      props = props || {}
      if ($form.$parent.editable !== false || props.editable !== false) {
        return [
          h('vxe-input', {
            ref: 'vxe-input' + property,
            props: {
              placeholder: '请选择时间',
              type: 'date',
              clearable: true,
              value: data[property],
              ...props
            },
            on: {
              input(value) {
                format = format || 'YYYY-MM-DD hh:mm:ss'
                data[property] = value ? new Date(value).format(format) : ''
                $form.$parent.itemChange({ $form, property, itemValue: value, data, renderOpts })
              }
            }
          })
        ]
      } else {
        return [
          <span class="tc fn-inline" {...{ props }}> {data[property]} </span>
        ]
      }
    }
  },
  $vxeFormText: {
    renderItem(h, { props, name, options }, { $form, property, data }) {
      if ($form.$parent.editable !== false || props.editable !== false) {
        return [
          h('vxe-textarea', {
            ref: 'vxe-textarea' + property,
            props: {
              value: data[property],
              ...props
            },
            on: {
              input(value) {
                data[property] = value
                $form.$parent.itemChange({ $form, property, itemValue: value, data })
              }
            }
          })
        ]
      } else {
        return [
          <span class="tl fn-inline" {...{ props }}> {data[property]} </span>
        ]
      }
    }

  },
  $vxeFormIntervar: {
    // 输入框
    // {
    //   field: 'prevfield#prevfield',
    //   title: '名称',
    //   span: 24,
    //   itemRender: {
    //     name: '$vxeFormIntervar',
    //     props: {
    //       disabled: true,
    //       type: 'text',
    //       placeholder: '请输入名称'
    //     }
    //   }
    // },
    renderItem(h, renderOpts, params) {
      let { props } = renderOpts
      const { property, data, $form } = params
      props = props || {}
      if ($form.$parent.editable !== false || props.editable !== false) {
        return [
          h('EditIntervar', {
            ref: 'vxe-input' + property,
            props: {
              params,
              props
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
          <span class="tl fn-inline" {...{ props }}> {data[property]} </span>
        ]
      }
    }
  },
  $vxeFormInput: {
    // 输入框
    // renderDefault(h, cellRender, { row, column }, context) {
    //   return [
    //     <span class="text">
    //       {row[column.property] === 1 ? '男男' : '女女'}
    //     </span>
    //   ]
    // },
    renderItem(h, renderOpts, { $form, property, data }) {
      data[property] = (data[property] + '').replace(/null|undefined/ig, '')
      let { props } = renderOpts
      props = props || {}
      if ($form.$parent.editable !== false || props.editable !== false) {
        return [
          h('vxe-input', {
            ref: 'vxe-input' + property,
            props: {
              value: data[property],
              ...props
            },
            on: {
              input(value) {
                data[property] = value
                $form.$parent.itemChange({ $form, property, itemValue: value, data, renderOpts })
              }
            }
          })
        ]
      } else {
        return [
          <span class="tl fn-inline" {...{ props }}> {data[property]} </span>
        ]
      }
    }
  },
  $vxeFormSelect: {
    // 下拉选择
    renderItem(h, renderOpts, { $form, property, data }) {
      let { props, options } = renderOpts
      props = props || {}
      if ($form.$parent.editable !== false || props.editable !== false) {
        return [
          h('vxe-select', {
            props: {
              ref: 'vxe-select-' + property,
              value: data[property],
              ...props
            },
            on: {
              change: ({ value }) => {
                data[property] = value
                $form.$parent.itemChange({ $form, property, itemValue: value, data, renderOpts })
              }
            }
          }, options.map(item => {
            return h('vxe-option', {
              props: {
                value: item.value,
                label: item.label
              }
            })
          })
          )
        ]
      } else {
        // let val = ''
        // options.forEach((item, index) => {
        //   if (data[property] === item.value) {
        //     val = item.label
        //   }
        // })
        // return [
        //   <span class="tl fn-inline"> {val} </span>
        // ]
        props.multiple = props.multiple === undefined ? false : props.multiple
        options = options || []
        if (props.multiple) {
          let value = []
          options.forEach((item, index) => {
            if (data[property].indexOf(item.value) >= 0) {
              value.push(item.label)
            }
          })
          data[property + '_select_sort'] = value.join(',')
          return [<span>{data[property + '_select_sort']}</span>]
        } else {
          let arrValue = options.filter((item, index) => {
            return item.value === data[property]
          })
          let value = arrValue[0] ? arrValue[0].label : ''
          return [<span>{value}</span>]
        }
      }
    }
  },
  $vxeFormRadio: {
    renderItem(h, renderOpts, { $form, property, data }) {
      let { props, propsC, options } = renderOpts
      if ($form.$parent.editable !== false || props.editable !== false) {
        return [
          h('vxe-radio-group', {
            props: {
              value: data[property],
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
                label: item.value,
                ...propsC
              }
            }, item.label)
          }))
        ]
      } else {
        let value = ''
        options.forEach((item, index) => {
          if (data[property] === item.value) {
            value = item.label
          }
        })
        return [<span>{value}</span>]
      }
    }
  },
  $vxeFormCheckbox: {
    renderItem(h, renderOpts, { $form, property, data }) {
      let { props, propsC, options } = renderOpts
      data[property] = Array.isArray(data[property]) ? data[property] : []
      if ($form.$parent.editable !== false || props.editable !== false) {
        return [
          h('vxe-checkbox-group', {
            props: {
              value: data[property],
              ...props
            },
            on: {
              change({ $event, checked, checklist, label }) {
                data[property] = checklist
                $form.$parent.itemChange({ $form, property, itemValue: checklist, data, renderOpts })
              }
            }
          }, options.map(item => {
            return h('vxe-checkbox', {
              props: {
                label: item.value,
                ...propsC
              }
            }, item.label)
          }))
        ]
      } else {
        data[property] = Array.isArray(data[property]) ? data[property] : []
        let value = []
        options.forEach((item, index) => {
          if (data[property].indexOf(item.value) >= 0) {
            value.push(item.label)
          }
        })
        data[property + '_checkbox_sort'] = value.join(',')
        return [<span>{data[property + '_checkbox_sort']}</span>]
      }
    }
  },
  $formTreeInput: { // form表单treeinput单选
    renderItem(h, { props, options }, { $form, property, data }) {
      props = props || {}
      if ($form.$parent.editable !== false || props.editable !== false) {
        props['prefix'] = `${property}`
        props['openQuerySeach'] = true
        let timeStamp = +new Date()
        // 如果新建没有初始值，赋初始值
        data[property + 'id'] = data[property + 'id'] || 'initId' + timeStamp
        data[property + 'code'] = data[property + 'code'] || ' '
        data[property + 'name'] = data[property + 'name'] || ' '
        data[property] = data[property + 'id'] + '##' + data[property + 'code'] + '##' + data[property + 'name']
        return [
          h('BsTreeInput', {
            ref: 'BsTreeInput' + property,
            props: {
              datas: options || [],
              value: data[property],
              ...props
            },
            on: {
              input(value) {
                data[property] = value
                const valueArr = data[property].split('##')
                data[property + 'id'] = valueArr[0]
                data[property + 'code'] = valueArr[1]
                data[property + 'name'] = valueArr[2]
                $form.$parent.itemChange({ $form, property, itemValue: value, data, renderOpts: { props, options } })
              }
            }
          })
        ]
      } else {
        data[property + '_tree_sort'] = props.formatter === '#code-#name' ? data[property + 'code'] + '-' + data[property + 'name'] : data[property + 'name']
        return [<span>{data[property + '_tree_sort']}</span>]
      }
    }
  },
  $formTreeInputCheck: { // form表单treeinput 多选
    renderItem(h, { props, options }, { $form, property, data }) {
      props['prefix'] = `${property}`
      props['openQuerySeach'] = true
      props['showcheckbox'] = true
      let timeStamp = +new Date()
      // 如果新建没有初始值，赋初始值
      data[property + 'id'] = data[property + 'id'] || 'initId' + timeStamp
      data[property + 'code'] = data[property + 'code'] || ' '
      data[property + 'name'] = data[property + 'name'] || ' '
      if (!data[property + 'name'].trim()) {
        data[property] = data[property + 'id'] + '##' + data[property + 'code'] + '##' + data[property + 'name']
      } else {
        const ids = data[property + 'id'] && data[property + 'id'].split(',')
        const codes = data[property + 'code'] && data[property + 'code'].split(',')
        const names = data[property + 'name'] && data[property + 'name'].split(',')
        let line = ''
        if (ids.length === names.length) {
          for (let i = 0, len = ids.length; i < len; i++) {
            line += `${ids[i]}##${codes[i]}##${names[i]}`
            if (i < len - 1) {
              line += ','
            }
          }
        } else {
          console.log('from: id,name数量匹配不上')
        }

        data[property] = line
      }

      return [
        h('BsTreeInput', {
          ref: 'BsTreeInput' + property,
          props: {
            datas: options || [],
            value: data[property],
            ...props
          },
          on: {
            input(value) {
              data[property] = value
              const nodes = data[property].split(',')
              let id = ''; let code = ''; let name = ''
              for (let i = 0, len = nodes.length; i < len; i++) {
                let item = nodes[i]
                if (!item) {
                  continue
                }
                id += item.split('##')[0] + ','
                code += item.split('##')[1] + ','
                name += item.split('##')[2] + ','
              }
              id = id.substr(0, id.length - 1)
              code = code.substr(0, code.length - 1)
              name = name.substr(0, name.length - 1)
              data[property + 'id'] = id
              data[property + 'code'] = code
              data[property + 'name'] = name
              $form.$parent.itemChange({ $form, property, itemValue: value, data, renderOpts: { props, options } })
            }
          }
        })
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
        <FilterComplex params = { params } ></FilterComplex>
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
            if (isCase) {
              return cellValue == value
            } else {
              return parseFloat(cellValue) == parseFloat(value)
            }
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
    renderFilter (h, renderOpts, params) {
      return [
        <filter-content params={ params }></filter-content>
      ]
    },
    // 重置数据方法
    filterResetMethod ({ options }) {
      options.forEach(option => {
        option.data = { vals: [], sVal: '' }
      })
    },
    // 筛选数据方法
    filterMethod({ option, row, column }) {
      const { vals } = option.data
      if (Array.isArray(vals) && vals.length) {
        const cellValue = row[column.property]
        if (String(cellValue).indexOf('##') > 0) {
          let value = cellValue.split('##')
          value.shift()
          return cellValue == value.join('-')
        }
        return vals.includes(cellValue)
      } else {
        return true
      }

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
    isFooter: false,
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
      let { data } = option
      // 布尔值搜索过滤时将是和否转为1和2
      const valMap = {
        '是': '1',
        '否': '2'
      }
      data = valMap[data] || data
      let cellValue = row[column.property]
      let fieldStr = column.property.replace(/Name/, '')
      // 处理列表 code-name 形式显示过滤
      if (column.cellRender && column.cellRender.name.includes('_$')) {
        let fields = column.cellRender.name.split('_$')
        fields.forEach(field => {
          cellValue += row[field.replace(/\$/g, '')]
        })
      } else if (row[`${fieldStr}Code`]) {
        cellValue += row[`${fieldStr}Code`]
      }
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
        <filter-Select renderOpts={ renderOpts } params={params}></filter-Select>
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
      let cellValue = row[column.property]
      let value = []
      options.forEach((item, index) => {
        if (String(cellValue).indexOf(item.value) >= 0) {
          value.push(item.label)
        }
      })
      return value.some((item) => {
        return vals.indexOf(item) >= 0
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
