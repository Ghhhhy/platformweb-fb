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

// 表格废弃原渲染同时计算改为计算后渲染，form仍然采用渲染实时计算。
const defaultGloabalUtils = {
  calculateRender(h, { props, name }, { $columnIndex, $rowIndex, items, column, data, row, $seq, $table, $type, columnIndex, isEdit, level, rowIndex, seq }, context) {
    props = props || {}
    let val = isNaN(parseFloat(row[column.property])) ? '' : parseFloat(row[column.property])
    if (val !== '') {
      row[column.property] = val.toFixed(2)
      if (context.$grid.$parent.toolbarConfigInCopy.disabledMoneyConversion) {
        val = Number((val).toFixed(2)).toLocaleString()
        val = val.split('.').length === 1 ? val + '.00' : (val.split('.')[1].length === 1 ? val + '0' : val)
      } else {
        let moneyUnit = context.$grid.$parent.moneyUnit ? context.$grid.$parent.moneyUnit : 1
        val = Number((val / moneyUnit).toFixed(2)).toLocaleString()
        val = val.split('.').length === 1 ? val + '.00' : (val.split('.')[1].length === 1 ? val + '0' : val)
      }
      row[column.property + '__viewSort'] = val
      return [<span class="text" {...{ props }} >{val}</span>]
    } else {
      row[column.property + '__viewSort'] = ''
      return [<span class="text" {...{ props }} ></span>]
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
  }
}
// 全局提供表格和form配套渲染器共 15 组，分别为： 新全局下拉树，文本数字输入，下拉选择，计算渲染器，金额输入，下拉文本框，天数，时间日期，单选，多选，间隔时间或数值选择输入渲染器，开关，进度条，条件渲染器。其中，条件渲染器，进度条（评测和developing）
const defaultPublicRenders = {
  // 表格form全局渲染器
  // 3组可多选
  $vxeTree: {
    // 全局树渲染器
    renderDefault(h, { name, props }, { row, column }) {
      let { multiple, format, showField, isHump } = (props && props.config) || { multiple: false, format: '{code}-{name}', showField: '', isHump: false }
      format = (props && props.cellViewFormat) || format || '{code}-{name}'
      if (showField) {
        row[showField] = (row[showField] + '').replace(/null|undefined/ig, '')
        row[column.property + '__viewSort'] = row[showField]
        return [<span class="text">{row[column.property + '__viewSort']}</span>]
      } else {
        let regR = new RegExp('({[a-zA-Z0-9_]*})', 'ig')
        let rowsKey = format.match(regR).map((key, keyIndex) => {
          return key.replace(/{|}/gi, '')
        })
        if (!multiple) {
          row[column.property] = [row[column.property + (isHump ? 'Code' : 'code')], row[column.property + (isHump ? 'Name' : 'name')], row[column.property + (isHump ? 'Id' : 'id')]].map((item, index) => {
            return (item + '').replace(/null|undefined/ig, '')
          }).join('##').replace('####', '')
          let arr = []
          rowsKey.map((key, indexkey) => {
            if (key === 'code') {
              (row[column.property + (isHump ? 'Code' : 'code')] + '').replace(/null|undefined|root/ig, '') !== '' && arr.push(row[column.property + (isHump ? 'Code' : 'code')])
            } else {
              (row[column.property + key] + '').replace(/null|undefined/ig, '') !== '' && arr.push(row[column.property + key])
            }
          })
          row[column.property + '__viewSort'] = row[column.property] === '' ? '' : arr.join('-')
        } else {
          let idNameCodeMap = {
            idArr: (typeof (row[column.property + (isHump ? 'Id' : 'id')]) === 'string' && (row[column.property + (isHump ? 'Id' : 'id')]) !== '') ? row[column.property + (isHump ? 'Id' : 'id')].split(',') : (Array.isArray(row[column.property + (isHump ? 'Id' : 'id')]) ? row[column.property + (isHump ? 'Id' : 'id')] : []),
            codeArr: (typeof (row[column.property + (isHump ? 'Code' : 'code')]) === 'string' && (row[column.property + (isHump ? 'Code' : 'code')]) !== '') ? row[column.property + (isHump ? 'Code' : 'code')].split(',') : (Array.isArray(row[column.property + (isHump ? 'Code' : 'code')]) ? row[column.property + (isHump ? 'Code' : 'code')] : []),
            nameArr: (typeof (row[column.property + (isHump ? 'Name' : 'name')]) === 'string' && (row[column.property + (isHump ? 'Name' : 'name')]) !== '') ? row[column.property + (isHump ? 'Name' : 'name')].split(',') : (Array.isArray(row[column.property + (isHump ? 'Name' : 'name')]) ? row[column.property + (isHump ? 'Name' : 'name')] : [])
          }
          row[column.property] = idNameCodeMap.nameArr.length ? idNameCodeMap.codeArr.map((item, index) => {
            return [idNameCodeMap.codeArr[index], idNameCodeMap.nameArr[index], idNameCodeMap.idArr[index]].map((item, index) => {
              return (item + '').replace(/null|undefined/ig, '')
            }).join('##').replace('####', '')
          }).join(',') : ''
          row[column.property + (isHump ? 'Id' : 'id')] = row[column.property] === '' ? '' : idNameCodeMap.idArr.join(',')
          row[column.property + (isHump ? 'Code' : 'code')] = row[column.property] === '' ? '' : idNameCodeMap.codeArr.join(',')
          row[column.property + (isHump ? 'Name' : 'name')] = row[column.property] === '' ? '' : idNameCodeMap.nameArr.join(',')
          row[column.property + (isHump ? 'Id__multiple' : 'id__multiple')] = row[column.property] === '' ? [] : idNameCodeMap.idArr
          row[column.property + (isHump ? 'Code__multiple' : 'code__multiple')] = row[column.property] === '' ? [] : idNameCodeMap.codeArr
          row[column.property + (isHump ? 'name__multiple' : 'name__multiple')] = row[column.property] === '' ? [] : idNameCodeMap.nameArr
          row[column.property + '__viewSort'] = row[column.property] === '' ? '' : idNameCodeMap.codeArr.map((item, index) => {
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
        return [<span class="text">{row[column.property + '__viewSort']}</span>]
      }
    },
    renderCell(h, { name, props }, { row, column }) {
      let { multiple, format, showField, isHump } = (props && props.config) || { multiple: false, format: '{code}-{name}', showField: '', isHump: false }
      format = (props && props.cellViewFormat) || format || '{code}-{name}'
      if (showField) {
        row[showField] = (row[showField] + '').replace(/null|undefined/ig, '')
        row[column.property + '__viewSort'] = row[showField]
        return [<span class="text">{row[column.property + '__viewSort']}</span>]
      } else {
        let regR = new RegExp('({[a-zA-Z0-9_]*})', 'ig')
        let rowsKey = format.match(regR).map((key, keyIndex) => {
          return key.replace(/{|}/gi, '')
        })
        if (!multiple) {
          row[column.property] = [row[column.property + (isHump ? 'Code' : 'code')], row[column.property + (isHump ? 'Name' : 'name')], row[column.property + (isHump ? 'Id' : 'id')]].map((item, index) => {
            return (item + '').replace(/null|undefined/ig, '')
          }).join('##').replace('####', '')
          let arr = []
          rowsKey.map((key, indexkey) => {
            if (key === 'code') {
              (row[column.property + (isHump ? 'Code' : 'code')] + '').replace(/null|undefined|root/ig, '') !== '' && arr.push(row[column.property + (isHump ? 'Code' : 'code')])
            } else {
              (row[column.property + key] + '').replace(/null|undefined/ig, '') !== '' && arr.push(row[column.property + key])
            }
          })
          row[column.property + '__viewSort'] = row[column.property] === '' ? '' : arr.join('-')
        } else {
          let idNameCodeMap = {
            idArr: (typeof (row[column.property + (isHump ? 'Id' : 'id')]) === 'string' && (row[column.property + (isHump ? 'Id' : 'id')]) !== '') ? row[column.property + (isHump ? 'Id' : 'id')].split(',') : (Array.isArray(row[column.property + (isHump ? 'Id' : 'id')]) ? row[column.property + (isHump ? 'Id' : 'id')] : []),
            codeArr: (typeof (row[column.property + (isHump ? 'Code' : 'code')]) === 'string' && (row[column.property + (isHump ? 'Code' : 'code')]) !== '') ? row[column.property + (isHump ? 'Code' : 'code')].split(',') : (Array.isArray(row[column.property + (isHump ? 'Code' : 'code')]) ? row[column.property + (isHump ? 'Code' : 'code')] : []),
            nameArr: (typeof (row[column.property + (isHump ? 'Name' : 'name')]) === 'string' && (row[column.property + (isHump ? 'Name' : 'name')]) !== '') ? row[column.property + (isHump ? 'Name' : 'name')].split(',') : (Array.isArray(row[column.property + (isHump ? 'Name' : 'name')]) ? row[column.property + (isHump ? 'Name' : 'name')] : [])
          }
          row[column.property] = idNameCodeMap.nameArr.length ? idNameCodeMap.codeArr.map((item, index) => {
            return [idNameCodeMap.codeArr[index], idNameCodeMap.nameArr[index], idNameCodeMap.idArr[index]].map((item, index) => {
              return (item + '').replace(/null|undefined/ig, '')
            }).join('##').replace('####', '')
          }).join(',') : ''
          row[column.property + (isHump ? 'Id' : 'id')] = row[column.property] === '' ? '' : idNameCodeMap.idArr.join(',')
          row[column.property + (isHump ? 'Code' : 'code')] = row[column.property] === '' ? '' : idNameCodeMap.codeArr.join(',')
          row[column.property + (isHump ? 'Name' : 'name')] = row[column.property] === '' ? '' : idNameCodeMap.nameArr.join(',')
          row[column.property + (isHump ? 'Id__multiple' : 'id__multiple')] = row[column.property] === '' ? [] : idNameCodeMap.idArr
          row[column.property + (isHump ? 'Code__multiple' : 'code__multiple')] = row[column.property] === '' ? [] : idNameCodeMap.codeArr
          row[column.property + (isHump ? 'name__multiple' : 'name__multiple')] = row[column.property] === '' ? [] : idNameCodeMap.nameArr
          row[column.property + '__viewSort'] = row[column.property] === '' ? '' : idNameCodeMap.codeArr.map((item, index) => {
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
        return [<span class="text">{row[column.property + '__viewSort']}</span>]
      }
    },
    renderEdit(h, renderOpts, params, context) {
      let { props } = renderOpts
      let { row, column } = params
      let bsTable = context.$grid.$parent
      let renderData = row
      let { valueKeys, isHump } = (props && props.config) || { multiple: false, valueKeys: ['code', 'name', 'id'] }
      valueKeys = valueKeys || ['code', 'name', 'id']
      return [
        h('BsTree', {
          props: {
            ref: 'vxe-tree-' + column.property,
            editable: true,
            value: row[column.property],
            ...props,
            isDropSelectTree: true
          },
          on: {
            input: (value) => {
              renderData[column.property] = value
            },
            onNodeClick({ node, treeData }) {
              if (node !== null) {
                renderData[column.property + (isHump ? 'Id' : 'id')] = node[valueKeys[2]]
                renderData[column.property + (isHump ? 'Code' : 'code')] = node[valueKeys[0]]
                renderData[column.property + (isHump ? 'Name' : 'name')] = node[valueKeys[1]]
              } else {
                renderData[column.property + (isHump ? 'Id' : 'id')] = ''
                renderData[column.property + (isHump ? 'Code' : 'code')] = ''
                renderData[column.property + (isHump ? 'Id' : 'name')] = ''
              }

              bsTable.cellOptionCallBack(params, { optionType: 'nodeClick', node, treeData })
            },
            onNodeCheckClick({ nodes, node, treeData, value }) {
              renderData[column.property + (isHump ? 'Id__multiple' : 'id__multiple')] = nodes.map((item, index) => {
                return item[valueKeys[2]] ? item[valueKeys[2]] : ''
              })
              renderData[column.property + (isHump ? 'Code__multiple' : 'code__multiple')] = nodes.map((item, index) => {
                return item[valueKeys[0]] ? item[valueKeys[0]] : ''
              })
              renderData[column.property + (isHump ? 'Name__multiple' : 'name__multiple')] = nodes.map((item, index) => {
                return item[valueKeys[1]] ? item[valueKeys[1]] : ''
              })
              renderData[column.property + (isHump ? 'Id' : 'id')] = renderData[column.property + (isHump ? 'Id__multiple' : 'id__multiple')].join(',')
              renderData[column.property + (isHump ? 'Code' : 'code')] = renderData[column.property + (isHump ? 'Code__multiple' : 'code__multiple')].join(',')
              renderData[column.property + (isHump ? 'Id' : 'name')] = renderData[column.property + (isHump ? 'Name__multiple' : 'name__multiple')].join(',')
              bsTable.cellOptionCallBack(params, { optionType: 'nodeCheckClick', node, nodes, treeData })
            }
          }
        })
      ]
    },
    renderItem(h, renderOpts, { $form, property, data }) {
      let { props } = renderOpts
      let renderData = data
      let { multiple, isHump, valueKeys } = (props && props.config) || { multiple: false, valueKeys: ['code', 'name', 'id'] }
      valueKeys = valueKeys || ['code', 'name', 'id']
      if (!multiple) {
        data[property] = [data[property + (isHump ? 'Code' : 'code')], data[property + (isHump ? 'Name' : 'name')], data[property + (isHump ? 'Id' : 'id')]].map((item, index) => {
          return (item + '').replace(/null|undefined/ig, '')
        }).join('##').replace('####', '')
        data[property + '__viewSort'] = data[property] === '' ? '' : [data[property + (isHump ? 'Code' : 'code')], data[property + (isHump ? 'Name' : 'name')]].map((item, index) => {
          return (item + '').replace(/null|undefined/ig, '')
        }).filter((item) => {
          return item !== ''
        }).join('-')
      } else {
        let idArr = (typeof (data[property + (isHump ? 'Id' : 'id')]) === 'string' && data[property + (isHump ? 'Id' : 'id')] !== '') ? data[property + (isHump ? 'Id' : 'id')].split(',') : (Array.isArray(data[property + (isHump ? 'Id' : 'id')]) ? data[property + (isHump ? 'Id' : 'id')] : [])
        let codeArr = (typeof (data[property + (isHump ? 'Code' : 'code')]) === 'string' && data[property + (isHump ? 'Code' : 'code')] !== '') ? data[property + (isHump ? 'Code' : 'code')].split(',') : (Array.isArray(data[property + (isHump ? 'Code' : 'code')]) ? data[property + (isHump ? 'Code' : 'code')] : [])
        let nameArr = (typeof (data[property + (isHump ? 'Name' : 'name')]) === 'string' && data[property + (isHump ? 'Name' : 'name')] !== '') ? data[property + (isHump ? 'Name' : 'name')].split(',') : (Array.isArray(data[property + (isHump ? 'Name' : 'name')]) ? data[property + (isHump ? 'Name' : 'name')] : [])
        data[property] = nameArr.length ? codeArr.map((item, index) => {
          return [codeArr[index], nameArr[index], idArr[index]].map((item, index) => {
            return (item + '').replace(/null|undefined/ig, '')
          }).join('##').replace('####', '')
        }).join(',') : ''
        data[property + (isHump ? 'Id' : 'id')] = data[property] === '' ? '' : idArr.join(',')
        data[property + (isHump ? 'Code' : 'code')] = data[property] === '' ? '' : codeArr.join(',')
        data[property + (isHump ? 'Name' : 'name')] = data[property] === '' ? '' : nameArr.join(',')
        data[property + (isHump ? 'Id__multiple' : 'id__multiple')] = data[property] === '' ? [] : idArr
        data[property + (isHump ? 'Code__multiple' : 'code__multiple')] = data[property] === '' ? [] : codeArr
        data[property + (isHump ? 'Name__multiple' : 'name__multiple')] = data[property] === '' ? [] : nameArr
        data[property + '__viewSort'] = data[property] === '' ? '' : codeArr.map((item, index) => {
          return [codeArr[index], nameArr[index]].map((item, index) => {
            return (item + '').replace(/null|undefined/ig, '')
          }).filter((item) => {
            return item !== ''
          }).join('-')
        }).join(',')
      }
      return [
        h('BsTree', {
          props: {
            ref: 'vxe-tree-' + property,
            editable: true,
            value: data[property],
            ...props,
            isDropSelectTree: true
          },
          on: {
            input: (value) => {
              data[property] = value
            },
            onNodeClick({ node, treeData }) {
              if (node !== null) {
                renderData[property + (isHump ? 'Id' : 'id')] = node[valueKeys[2]]
                renderData[property + (isHump ? 'Code' : 'code')] = node[valueKeys[0]]
                renderData[property + (isHump ? 'Name' : 'name')] = node[valueKeys[1]]
              } else {
                renderData[property + (isHump ? 'Id' : 'id')] = ''
                renderData[property + (isHump ? 'Code' : 'code')] = ''
                renderData[property + (isHump ? 'Name' : 'name')] = ''
              }
              renderData[property + '__viewSort'] = [renderData[property + (isHump ? 'Code' : 'code')], renderData[property + (isHump ? 'Name' : 'name')]].map((item, index) => {
                return (item + '').replace(/null|undefined/ig, '')
              }).filter((item) => {
                return item !== ''
              }).join('-')
              $form.$parent.itemChange({ $form, property, itemValue: data[property], data, renderOpts, node, treeData })
            },
            onNodeCheckClick({ node, nodes, treeData, value }) {
              renderData[property + (isHump ? 'Id__multiple' : 'id__multiple')] = nodes.map((item, index) => {
                return item[valueKeys[2]] ? item[valueKeys[2]] : ''
              })
              renderData[property + (isHump ? 'Code__multiple' : 'code__multiple')] = nodes.map((item, index) => {
                return item[valueKeys[0]] ? item[valueKeys[0]] : ''
              })
              renderData[property + (isHump ? 'Name__multiple' : 'name__multiple')] = nodes.map((item, index) => {
                return item[valueKeys[1]] ? item[valueKeys[1]] : ''
              })
              renderData[property + (isHump ? 'Id' : 'id')] = renderData[property + (isHump ? 'Id__multiple' : 'id__multiple')].join(',')
              renderData[property + (isHump ? 'Code' : 'code')] = renderData[property + (isHump ? 'Code__multiple' : 'code__multiple')].join(',')
              renderData[property + (isHump ? 'Name' : 'name')] = renderData[property + (isHump ? 'Name__multiple' : 'name__multiple')].join(',')
              renderData[property + '__viewSort'] = renderData[property + 'code__multiple'].map((item, index) => {
                return [renderData[property + 'code__multiple'][index], renderData[property + (isHump ? 'Name' : 'name')][index]].map((item, index) => {
                  return (item + '').replace(/null|undefined/ig, '')
                }).filter((item) => {
                  return item !== ''
                }).join('-')
              }).join(',')
              $form.$parent.itemChange({ $form, property, itemValue: data[property], data, renderOpts, node, nodes, treeData })
            }
          }
        })
      ]
    }
  },
  $vxeSelect: {
    // 下拉选择
    renderEdit(h, renderOpts, params, context) {
      let { props, options } = renderOpts
      let { row, column } = params
      let bsTable = context.$grid.$parent
      props = props || {}
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
              } else {
                row[column.property] = value
                options.forEach((item, index) => {
                  if (row[column.property] + '' === item.value + '') {
                    arrValue.push(item.label)
                  }
                })
              }
              bsTable.cellOptionCallBack(params, { optionType: 'select', field: column.property, value, label: arrValue, renderOpts })
            }
          }
        }, options.map(item => {
          return h('vxe-option', {
            props: {
              value: item.value,
              label: item.label
            }
          })
        }))
      ]
    },
    renderDefault(h, { props, options }, { row, column }, context) {
      props = props || {}
      row[column.property] = (row[column.property] + '').replace(/null|NaN|undefined/ig, '')
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
    renderCell(h, { props, options }, { row, column }, context) {
      props = props || {}
      row[column.property] = (row[column.property] + '').replace(/null|NaN|undefined/ig, '')
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
    renderItem(h, renderOpts, { $form, property, data }) {
      let { props, options } = renderOpts
      props = props || {}
      data[property] = (data[property] + '').replace(/null|NaN|undefined/ig, '')
      if (props.multiple) {
        data[property + '__multiple'] = (data[property] === '') ? [] : data[property].split(',')
      }
      if ($form.$parent.editable !== false) {
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
                  data[data.property + '__multiple'] = value
                  data[property] = value.join(',')
                } else {
                  data[property] = value
                }
              }
            }
          }, options.map(item => {
            return [
              h('vxe-option', {
                props: {
                  value: item.value + '',
                  label: item.label
                }
              })
            ]
          }))
        ]
      } else {
        if (props.multiple) {
          data[property + '__multiple'] = (data[property] === '') ? [] : data[property].split(',')
          let arrValue = []
          options.forEach((item, index) => {
            if (data[property + '__multiple'].indexOf(item.value + '') >= 0) {
              arrValue.push(item.label)
            }
          })
          data[property + '__viewSort'] = arrValue.join(',')
          return [
            <span>{data[property + '__viewSort']}</span>
          ]
        } else {
          let arrValue = []
          options.forEach((item, index) => {
            if (data[property] + '' === item.value + '') {
              arrValue.push(item.label)
            }
          })
          data[property + '__viewSort'] = arrValue.join(',')
          return [
            <span>{data[property + '__viewSort']}</span>
          ]
        }
      }
    }
  },
  $vxeCheckbox: {
    renderDefault(h, { options, props }, { row, column }, context) {
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
    renderCell(h, { options, props }, { row, column }) {
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
    renderEdit(h, renderOpts, params, context) {
      let { options, props, propsC } = renderOpts
      let { row, column } = params
      let bsTable = context.$grid.$parent
      props = props || {}
      propsC = propsC || {}
      row[column.property] = typeof (row[column.property]) === 'string' ? row[column.property] : (Array.isArray(row[column.property]) ? row[column.property].join(',') : '')
      row[column.property + '__multiple'] = row[column.property].split(',')
      // return [
      //   <vxe-checkbox-group {...{ props }} v-model={row[column.property]} placeholder="请选择">
      //     {options.map((item, index) => {
      //       return [
      //         <vxe-checkbox
      //           label={item.value}
      //           { ...{ propsC } }
      //         >
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
              bsTable.cellOptionCallBack(params, { optionType: 'check', value: checklist, renderOpts, field: column.property })
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
    },
    renderItem(h, renderOpts, { $form, property, data }) {
      let { props, propsC, options } = renderOpts
      data[property] = typeof (data[property]) === 'string' ? data[property] : (Array.isArray(data[property]) ? data[property].join(',') : '')
      data[property + '__multiple'] = data[property].split(',')

      if ($form.$parent.editable !== false) {
        return [
          h('vxe-checkbox-group', {
            props: {
              value: data[property + '__multiple'],
              ...props
            },
            on: {
              change({ $event, checked, checklist, label }) {
                data[property + '__multiple'] = checklist
                data[property] = checklist.join(',')
                $form.$parent.itemChange({ $form, property, itemValue: data[property], data, renderOpts })
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
                disabled: item.value !== data[property],
                label: item.value,
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
    renderItem(h, renderOpts, { $form, property, data }) {
      let { props } = renderOpts
      props = Object.assign({ type: 'text', placeholder: '请输入' }, props || {})
      if ($form.$parent.editable !== false) {
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
    renderDefault(h, { props }, { row, column, $grid }, context) {
      props = props || {}
      let bsTable = context.$grid.$parent
      let moneyUnit = bsTable.moneyUnit ? bsTable.moneyUnit : 1
      let showZero = bsTable.showZero
      let zero = bsTable.transToNumber('', props.digits || 2)
      let val = bsTable.transToNumber(row[column.property], props.digits || 2)
      if (val === zero && showZero) {
        val = '0.00'
      } else if (!bsTable.toolbarConfigInCopy.disabledMoneyConversion) {
        val = bsTable.transToNumber(bsTable.accurateChuFa(val, moneyUnit), props.digits || 2)
      } else {
      }
      val = bsTable.transToNumberLocalString(val, props.digits || 2)
      row[column.property + '__viewSort'] = val
      return [<span class="text">{val}</span>]
    },
    renderCell(h, { props }, { row, column, $grid }, context) {
      props = props || {}
      let bsTable = context.$grid.$parent
      let moneyUnit = bsTable.moneyUnit ? bsTable.moneyUnit : 1
      let showZero = bsTable.showZero
      let zero = bsTable.transToNumber('', props.digits || 2)
      let val = bsTable.transToNumber(row[column.property], props.digits || 2)
      if (val === zero && showZero) {
        val = '0.00'
      } else if (!bsTable.toolbarConfigInCopy.disabledMoneyConversion) {
        val = bsTable.transToNumber(bsTable.accurateChuFa(val, moneyUnit), props.digits || 2)
      } else {
      }
      val = bsTable.transToNumberLocalString(val, props.digits || 2)
      row[column.property + '__viewSort'] = val
      return [<span class="text">{val}</span>]
    },
    renderEdit(h, renderOpts, params, context) {
      let { props } = renderOpts
      let { row, column } = params
      let bsTable = context.$grid.$parent
      let moneyInputSwich = context.$grid.$parent.toolbarConfigIn ? context.$grid.$parent.toolbarConfigIn.moneyInputSwich : false
      let moneyUnit = moneyInputSwich ? (context.$grid.$parent.moneyUnit ? context.$grid.$parent.moneyUnit : 1) : 1
      props = props || {}
      let val = (row[column.property] + '').replace(/null|undefined|NaN/ig, '')
      row[column.property + '__moneySwitchinput'] = (val === '-' || val === '') ? (row[column.property + '__moneySwitchinput'] || '') : bsTable.accurateChuFa(val, moneyUnit) + ''
      return [
        h('vxe-input', {
          ref: 'vxe-input' + column.property,
          props: {
            value: row[column.property + '__moneySwitchinput'],
            step: 1,
            min: 0,
            max: 1000000000000,
            clearable: true,
            placeholder: '请输入',
            type: 'float',
            digits: props.digits || 2,
            ...props
          },
          on: {
            input(value) {
              row[column.property + '__moneySwitchinput'] = value
              row[column.property] = (value === '-' || value === '') ? '' : bsTable.accurateChengFa(row[column.property + '__moneySwitchinput'], moneyUnit)
            },
            blur({ value }) {
              row[column.property + '__moneySwitchinput'] = bsTable.transToNumber(value)
              row[column.property] = bsTable.transToNumber(bsTable.accurateChengFa(row[column.property + '__moneySwitchinput'], moneyUnit), props.digits || 2)
              bsTable.cellOptionCallBack(params, { optionType: 'input', value: row[column.property], field: column.property, renderOpts })
            }
          }
        })
      ]
    },
    renderItem(h, renderOpts, { $form, data, property }) {
      let { props } = renderOpts
      let bsForm = $form.$parent
      props = props || {}
      let moneyInputSwich = bsForm.moneyInputSwich || false
      let moneyUnit = moneyInputSwich ? (bsForm.moneyUnit || 1) : 1
      let val = (data[property] + '').replace(/null|undefined|NaN/ig, '')
      data[property + '__moneySwitchinput'] = (val === '-' || val === '') ? (data[property + '__moneySwitchinput'] || '') : bsForm.accurateChuFa(val, moneyUnit) + ''
      // data[property + '__moneySwitchinput'] = bsForm.accurateChuFa((data[property] + '').replace(/null|undefined|NaN/ig, ''), moneyUnit) + ''
      if (bsForm.editable !== false) {
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
              ...props
            },
            on: {
              input(value) {
                data[property + '__moneySwitchinput'] = value
                data[property] = (value === '-' || value === '') ? '' : bsForm.accurateChengFa(data[property + '__moneySwitchinput'], moneyUnit)
              },
              blur({ value }) {
                data[property + '__moneySwitchinput'] = bsForm.transToNumber(value, props.digits || 2)
                data[property] = bsForm.transToNumber(bsForm.accurateChengFa(data[property + '__moneySwitchinput'], moneyUnit), props.digits || 2)
                bsForm.itemChange({ $form, property, itemValue: data[property], data, renderOpts })
              }
            }
          })
        ]
      } else {
        return [<span class="text block" >{data[property]}</span>]
      }
    }
  },
  $vxeEditDownTextarea: {
    autofocus: '.vxe-input--inner',
    renderDefault(h, cellRender, { row, column }, context) {
      row[column.property] = (row[column.property] + '').replace(/undefined/ig, '')
      row[column.property + '__viewSort'] = row[column.property]
      return [<span class="text">{row[column.property]}</span>]
    },
    renderEdit(h, { props }, params) {
      let { column } = params
      return [
        h('edit-down-textarea', {
          ref: 'vxe-edit-down-textarea' + column.property,
          props: {
            type: 'table',
            params: params,
            props: props
          },
          on: {
            input(value) {

            }
          }
        })
      ]
    },
    renderCell(h, cellRender, { row, column }, context) {
      row[column.property] = (row[column.property] + '').replace(/undefined/ig, '')
      row[column.property + '__viewSort'] = row[column.property]
      return [<span class="text">{row[column.property]}</span>]
    },
    renderItem(h, renderOpts, { $form, property, data }) {
      const { props } = renderOpts
      if ($form.$parent.editable !== false) {
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
                defaultGloabalUtils.debounceItemChange(() => {
                  $form.$parent.itemChange({ $form, property, itemValue: value, data, renderOpts })
                })
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
    renderItem(h, renderOpts, { $form, property, data }) {
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
  $vxeTime: {
    autofocus: '.vxe-input--inner',
    // 时间格式化渲染器
    renderCell(h, { props }, { row, column }) {
      props = props || {}
      props.format = props.format || 'YYYY-MM-DD hh:mm:ss'
      let dateTime = (row[column.property] + '').replace(/null|NaN|undefined/ig, '')
      if (dateTime) {
        let date = dateTime.length === 8 ? dateTime.substring(0, 4) + '-' + dateTime.substring(4, 6) + '-' + dateTime.substring(6, 8) : (dateTime.length === 14 ? dateTime.substring(0, 4) + '-' + dateTime.substring(4, 6) + '-' + dateTime.substring(6, 8) + ' ' + dateTime.substring(8, 10) + ':' + dateTime.substring(10, 12) + ':' + dateTime.substring(12, 14) : '')
        row[column.property + '__viewSort'] = isNaN(new Date(dateTime).getTime()) ? new Date(date).format(props.format) : new Date(dateTime).format(props.format)
      } else {
        row[column.property + '__viewSort'] = ''
      }
      return [<span>{ row[column.property + '__viewSort'] }</span>]
    },
    renderDefault(h, { props }, { row, column }) {
      props = props || {}
      props.format = props.format || 'YYYY-MM-DD hh:mm:ss'
      let dateTime = (row[column.property] + '').replace(/null|NaN|undefined/ig, '')
      if (dateTime) {
        let date = dateTime.length === 8 ? dateTime.substring(0, 4) + '-' + dateTime.substring(4, 6) + '-' + dateTime.substring(6, 8) : (dateTime.length === 14 ? dateTime.substring(0, 4) + '-' + dateTime.substring(4, 6) + '-' + dateTime.substring(6, 8) + ' ' + dateTime.substring(8, 10) + ':' + dateTime.substring(10, 12) + ':' + dateTime.substring(12, 14) : '')
        row[column.property + '__viewSort'] = isNaN(new Date(dateTime).getTime()) ? new Date(date).format(props.format) : new Date(dateTime).format(props.format)
      } else {
        row[column.property + '__viewSort'] = ''
      }
      return [<span>{ row[column.property + '__viewSort'] }</span>]
    },
    renderEdit(h, renderOpts, params, context) {
      let { props } = renderOpts
      let { row, column } = params
      let bsTable = context.$grid.$parent
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
              // eslint-disable-next-line no-useless-escape
              row[column.property] = row[column.property + '__viewSort'].replace(/[-\/:\s]/ig, '')
              bsTable.cellOptionCallBack(params, { optionType: 'input', value: row[column.property], field: column.property, renderOpts })
            }
          }
        })
      ]
    },
    renderItem(h, renderOpts, { $form, property, data }) {
      let { props } = renderOpts
      props = props || {}
      props.format = props.format || 'YYYY-MM-DD hh:mm:ss'
      let dateTime = (data[property] + '').replace(/null|NaN|undefined/ig, '')
      if (dateTime) {
        let date = dateTime.length === 8 ? dateTime.substring(0, 4) + '-' + dateTime.substring(4, 6) + '-' + dateTime.substring(6, 8) : (dateTime.length === 14 ? dateTime.substring(0, 4) + '-' + dateTime.substring(4, 6) + '-' + dateTime.substring(6, 8) + ' ' + dateTime.substring(8, 10) + ':' + dateTime.substring(10, 12) + ':' + dateTime.substring(12, 14) : '')
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
              value: data[property + '__viewSort'],
              ...props,
              transfer: true
            },
            on: {
              input(value) {
                data[property + '__viewSort'] = value ? new Date(value).format(props.format) : ''
                // eslint-disable-next-line no-useless-escape
                data[property] = data[property + '__viewSort'].replace(/[-\/:\s]/ig, '')
                $form.$parent.itemChange({ $form, property, itemValue: data[property], itemViewValue: data[property + '__viewSort'], data, renderOpts })
              }
            }
          })
        ]
      } else {
        return [
          <span class="tc fn-inline" {...{ props }}> {data[property + '__viewSort']} </span>
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
      if ($form.$parent.editable !== false) {
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
                disabled: item.value !== data[property],
                label: item.value,
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
        <edit-down-json params={ params } type="table"></edit-down-json>
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
      if ($form.$parent.editable !== false) {
        return [
          h('edit-down-json', {
            props: {
              params: params
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
          <edit-down-json params={ params } type="form"></edit-down-json>
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
        <EditIntervarInput constProps = { props } params={ params } type='table' editable={false}></EditIntervarInput>
      ]
    },
    renderEdit(h, { props }, params) {
      return [
        <EditIntervarInput constProps={ props } params={ params } type='table' editable={true}></EditIntervarInput>
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
      return [
        <vxe-switch v-model={row[column.property]} open-label={ options[0].label } close-label={ options[1].label } open-value={ options[0].value } close-value={ options[1].value } disabled></vxe-switch>
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
      return [
        <vxe-switch v-model={row[column.property]} open-label={ options[0].label } close-label={ options[1].label } open-value={ options[0].value } close-value={ options[1].value } disabled></vxe-switch>

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
      return [
        <vxe-switch v-model={row[column.property]} open-label={ options[0].label } close-label={ options[1].label } open-value={ options[0].value } close-value={ options[1].value }></vxe-switch>
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
      const { options } = renderOpts
      if ($form.$parent.editable !== false) {
        return [
          h('vxe-switch', {
            props: {
              value: data[property],
              openLabel: options[0].label,
              closeLabel: options[1].label,
              openValue: options[0].value,
              closeValue: options[1].value
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
              disabled: true
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
  $vxeProgress: {
    // 进度条
    renderCell(h, { props, options }, { row, column }) {
      let value = parseFloat((row[column.property] + '').replace(/null|undefined|NaN|Infinity|\s+/ig, ''))
      row[column.property] = isNaN(value) ? 0 : value
      return [
        <el-progress text-inside={true} stroke-width={20} percentage={row[column.property]} style="line-height:30px"></el-progress>
      ]
    },
    renderDefault(h, { props, options }, { row, column }) {
      let value = parseFloat((row[column.property] + '').replace(/null|undefined|NaN|Infinity|\s+/ig, ''))
      row[column.property] = isNaN(value) ? 0 : value
      return [
        <el-progress text-inside={true} stroke-width={20} percentage={row[column.property]} style="line-height:30px"></el-progress>
      ]
    },
    renderEdit(h, { props, options }, { row, column }) {
      let value = parseFloat((row[column.property] + '').replace(/null|undefined|NaN|Infinity|\s+/ig, ''))
      row[column.property] = isNaN(value) ? 0 : value
      return [
        <el-progress text-inside={true} stroke-width={20} percentage={row[column.property]} style="line-height:30px"></el-progress>
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
      return [<span class="text">{row[column.property]}</span>]
    },
    renderCell(h, cellRender, { row, column }, context) {
      row[column.property + '__viewSort'] = row[column.property]
      return [<span class="text">{row[column.property]}</span>]
    },
    renderItem(h, renderOpts, params) {
      const { props } = renderOpts
      const { $form, property, data } = params
      if ($form.$parent.editable !== false) {
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
  $vxeInputDemo: {
    // 输入框
    autofocus: '.vxe-input--inner',
    renderEdit(h, { props }, { row, column, $rowIndex, data, items }, context) {
      let self = context.$grid.$parent
      return [
        <div style="display:flex;">
          <div style="flex:1">
            <vxe-input
              v-model={row[column.property]}
              placeholder="可清除"
              clearable
              { ...{ props } }
            ></vxe-input>
          </div>
          <div style="width:80px">
            <vxe-button class="primary" on-click={() => self.onOptionRowClick({ row, column, $rowIndex, data, items, optionType: '' })}>更新</vxe-button>
          </div>
        </div>

        // <input class="my-cell" text="text" v-model={ row[column.property] } />
      ]
    },
    renderCell(h, { props }, { row, column, $rowIndex, data, items }, context) {
      row[column.property] = (row[column.property] + '').replace(/null|NaN|undefined/ig, '')
      row[column.property + '__viewSort'] = row[column.property]
      return [
        <div style="display:flex;">
          <div style="flex:1">
            <span class="text">{row[column.property]}</span>
          </div>
          <div style="width:80px">
            <vxe-button class="primary" on-click={() => self.onOptionRowClick({ row, column, $rowIndex, data, items, optionType: '' })}>更新</vxe-button>
          </div>
        </div>
      ]
    },
    renderDefault(h, { props }, { row, column, $rowIndex, data, items }, context) {
      row[column.property] = (row[column.property] + '').replace(/null|NaN|undefined/ig, '')
      row[column.property + '__viewSort'] = row[column.property]
      return [
        <div style="display:flex;">
          <div style="flex:1">
            <span class="text">{row[column.property]}</span>
          </div>
          <div style="width:80px">
            <vxe-button class="primary" on-click={() => self.onOptionRowClick({ row, column, $rowIndex, data, items, optionType: '' })}>更新</vxe-button>
          </div>
        </div>
      ]
    }
  }
}
// 全局提供表格特有渲染器 5组，分别为：手动排序渲染器，超链接渲染器，嵌套表渲染器，空数据渲染器，操作列渲染器。
// 评测设计阶段渲染器1组，为动态项定制渲染器（评测和developing），
const defaultTableRenderers = {
  // 表格特有全局渲染器
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
      let { row } = params
      let propsN = Object.assign({}, context.$grid.$parent.contentTableConfig, props)
      return [
        h('BsTable', {
          props: {
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
      const { statusField, options } = props
      let renderOption = options[row[statusField]]
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
      let renderOption = options[row[statusField]]
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
                    return <a title={item.label} title={item.label} class={'fn-inline f14 ' + item.class || 'fn-inline f14'} status={item.btnStatus} onClick={() => self.onOptionRowClick({ row, column, optionType: item.code })}>{item.label}</a>
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
      let renderOption = options[row[statusField]]
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
  $vxeSlotRender: {
    // 通用自定义渲染（developing）
    renderDefault(h, renderOpts, params, context) {
      const { column } = params
      // <template slot-scope="{ row, index }" slot="dateNo"></template>
      return [
        <div class="table-custom-render">
          <slot name={'renderDefaultSlot' + column.property } params={ params }></slot>
        </div>
      ]
    },
    renderCell(h, renderOpts, params, context) {
      const { column } = params
      // <template slot-scope="{ row, index }" slot="dateNo"></template>
      return [
        <div class="table-custom-render">
          <slot name={'renderCellSlot' + column.property } params={ params }></slot>
        </div>
      ]
    },
    renderEdit(h, renderOpts, params, context) {
      const { column } = params
      let self = context.$grid.$parent
      // <template slot-scope="{ row, index }" slot="dateNo"></template>
      return [
        <div class="table-custom-render">
          {self.$scopedSlots['renderCellSlot' + column.property]({
            params: params
          })}
        </div>
      ]
    },
    renderItem(h, renderOpts, params, context) {
      const { property } = params
      // <template slot-scope="{ row, index }" slot="dateNo"></template>
      return [
        <div class="table-custom-render">
          <slot name={'renderEditSlot' + property } params={ params }></slot>
        </div>
      ]
    }
  },
  $vxeOptionSort: {
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
  $vxeOptionRow: {
    renderDefault(h, cellRender, { row, column }, context) {
      let self = context.$grid.$parent
      // <a class="optionRow" href={row.link}>{'操作' + row[column.property]}</a>
      if (row.status === 0) {
        return [
          <div class="row-option row-option-group">
            <a class="optionRow-delete fn-inline" onClick={() => self.onOptionRowClick({ row, column, optionType: 'delete' })}>删除</a>
            <a class="optionRow-edit fn-inline" onClick={() => self.onOptionRowClick({ row, column, optionType: 'edit' })}>编辑</a>
            <a class="optionRow-report fn-inline" onClick={() => self.onOptionRowClick({ row, column, optionType: 'report' })}>上报</a>
            <a class="optionRow-detail fn-inline" onClick={() => self.onOptionRowClick({ row, column, optionType: 'detail' })}>详情</a>
          </div>
        ]
      } else {
        return [
          <div class="row-option row-option-group">
            <a class="optionRow-delete fn-inline" onClick={() => self.onOptionRowClick({ row, column, optionType: 'delete' })}>删除</a>
            <a class="optionRow-detail fn-inline" onClick={() => self.onOptionRowClick({ row, column, optionType: 'detail' })}>详情</a>
          </div>
        ]
      }
    }
  },
  $vxeHref: {
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
  $vxeDynamicSelect: {
    renderEdit(h, { props, options }, { row, column }, { $excel, $grid, $table, $type }) {
      // let res = $grid.$parent.$asyncGet('/base-agency-service/baseAgency/v1/searchAssetByCode', { agency_code: row.agency_code, fixed_asset_type_code: row.asset_class_code })
      // let res = await $grid.$parent.$http.get('/base-agency-service/baseAgency/v1/searchAssetByCode', { agency_code: 129001, fixed_asset_type_code: 2030402 })
      // if (res && res.rscode === '100000') {
      //   let options = res.rows.map((item, index) => {
      //     return Object.assign(item, {
      //       value: item.asset_code,
      //       label: item.asset_code
      //     })
      //   })
      // return [
      //   <vxe-select v-model={row[column.property]} placeholder="请选择">
      //     {options.map((item, index) => {
      //       return [
      //         <vxe-option
      //           value={item.value}
      //           label={item.label}
      //         ></vxe-option>
      //       ]
      //     })}
      //   </vxe-select>
      // ]
      // } else {
      //   this.$message.warning(res.result)
      // }
      // row.options = row.options || []
      // return [
      //   h('vxe-select', {
      //     props: {
      //       ref: 'vxe-select-' + column.property,
      //       value: row[column.property],
      //       ...props
      //     },
      //     on: {
      //       change: ({ value }) => {
      //         row[column.property] = value
      //         // row.options.forEach((item) => {

      //         // })
      //       }
      //     }
      //   }, row.options.map(item => {
      //     return h('vxe-option', {
      //       props: {
      //         value: item.value,
      //         label: item.label
      //       }
      //     })
      //   })
      //   )
      // ]
      row.options = row.options || []
      return [
        <vxe-select v-model={row[column.property]} placeholder="请选择">
          {row.options.map((item, index) => {
            return [
              <vxe-option
                value={item.value}
                label={item.label}
              ></vxe-option>
            ]
          })}
        </vxe-select>
      ]
    },
    renderDefault(h, cellRender, { row, column }, context) {
      return [<span>{row[column.property]}</span>]
    },
    renderCell(h, renderOpts, { row, column }) {
      return [<span>{row[column.property]}</span>]
    }
  },
  $vxeTreeText: {
    renderCell(h, cellRender, { row, column }, context) {
      const name = row[`${column.property}name`] === ' ' ? '' : row[`${column.property}name`]
      const code = row[`${column.property}code`] === ' ' ? '' : row[`${column.property}code`]
      const noCode = cellRender.props && cellRender.props.noCode
      let text = ''
      if (name) {
        text = noCode ? `${name}` : `${code}-${name}`
      }
      return [<span class="text">{text}</span>]
    },
    renderEdit(h, cellRender, { row, column }, context) {
      const name = row[`${column.property}name`] === ' ' ? '' : row[`${column.property}name`]
      const code = row[`${column.property}code`] === ' ' ? '' : row[`${column.property}code`]
      const noCode = cellRender.props && cellRender.props.noCode
      let text = ''
      if (name) {
        text = noCode ? `${name}` : `${code}-${name}`
      }
      return [
        <vxe-input
          v-model={text}
          placeholder="自动计算"
          readonly
          clearable
        ></vxe-input>
      ]
      // return [<span class="text">{text}</span>]
    }
  },
  $vxeTreeinput: {
    renderCell(h, cellRender, { row, column, $rowIndex }, context) {
      // console.log('cell')
      // 2、反向给tree 3元素赋值
      let props = cellRender.props || {}
      let property = column.property
      props['prefix'] = property

      let timeStamp = +new Date()
      if (row[property]) {
        const valueArr = row[property].split('##')
        row[property + 'id'] = valueArr[0]
        row[property + 'code'] = valueArr[1]
        row[property + 'name'] = valueArr[2]
      }

      if (!row[property + 'id']) {
        row[property] = 'initId' + timeStamp + '## ## '
      } else {
        row[property] = row[property + 'id'] + '##' + row[property + 'code'] + '##' + row[property + 'name']
      }

      const name = row[`${column.property}name`]
      const code = row[`${column.property}code`]
      const noCode = cellRender.props && cellRender.props.noCode

      let text = ''
      if (name && name !== ' ') {
        text = noCode ? `${name}` : `${code}-${name}`
      }

      return [<span class = "text" > { text } </span>]
    },
    renderEdit(h, cellRender, { row, column }, context) {
      // console.log('edit')
      try {
        let props = cellRender.props || {}
        let property = column.property
        let options = cellRender.options || []

        props['prefix'] = property
        let timeStamp = +new Date()
        // 1、正向给tree 3元素赋值
        if (!row[property + 'id']) {
          // 情况1:只给了前缀，没有给3个值，初始化3个值
          row[property + 'id'] = 'initId' + timeStamp
          row[property + 'code'] = ' '
          row[property + 'name'] = ' '
        } else {
          // 情况2: 给了前缀和id  code与name可能给了，可能没给； 给了的话优先用给了的值
          row[property + 'code'] = row[property + 'code'] || ' '
          row[property + 'name'] = row[property + 'name'] || ' '
        }

        // 2、反向给tree 3元素赋值
        if (row[property]) {
          const valueArr = row[property].split('##')
          row[property + 'id'] = valueArr[0]
          row[property + 'code'] = valueArr[1]
          row[property + 'name'] = valueArr[2]
        }

        // 转接串  1、3个树节点均没有  2、有3个树节点数据
        if (!row[property + 'id']) {
          row[property] = 'initId' + timeStamp + '## ## '
        } else {
          row[property] = row[property + 'id'] + '##' + row[property + 'code'] + '##' + row[property + 'name']
        }
        return [
          <BsTreeInputTest datas={ options } v-model={row[column.property]} {...{ props }} ></BsTreeInputTest>
        ]
      } catch (e) {}
    }
  },
  $vxeTreeTextCheck: {
    renderCell(h, cellRender, { row, column }, context) {
      const name = row[`${column.property}name`] === ' ' ? '' : row[`${column.property}name`]
      const code = row[`${column.property}code`] === ' ' ? '' : row[`${column.property}code`]
      const noCode = cellRender.props && cellRender.props.noCode
      let text = ''
      if (name) {
        let names = name.split(',')
        let codes = code.split(',')
        let line = ''
        if (names.length === codes.length) {
          for (let i = 0, len = names.length; i < len; i++) {
            line += (noCode ? `${names[i]}` : `${codes[i]}-${names[i]}`)
            if (i < len - 1) {
              line += ','
            }
          }
        } else {
          console.log('table: code,name数量匹配不上')
        }
        text = line
      }
      return [<span class="text">{text}</span>]
    }
  },
  $vxeTreeinputCheck: {
    renderCell(h, cellRender, { row, column, $rowIndex }, context) {
      // console.log('cell')
      // 2、反向给tree 3元素赋值
      let props = cellRender.props || {}
      let property = column.property
      props['prefix'] = property

      let timeStamp = +new Date()
      if (row[property]) {
        const valueArr = row[property].split('##')
        row[property + 'id'] = valueArr[0]
        row[property + 'code'] = valueArr[1]
        row[property + 'name'] = valueArr[2]
      }

      if (!row[property + 'id']) {
        row[property] = 'initId' + timeStamp + '## ## '
      } else {
        row[property] = row[property + 'id'] + '##' + row[property + 'code'] + '##' + row[property + 'name']
      }

      const name = row[`${column.property}name`]
      const code = row[`${column.property}code`]
      const noCode = cellRender.props && cellRender.props.noCode

      let text = ''
      if (name && name !== ' ') {
        text = noCode ? `${name}` : `${code}-${name}`
      }

      return [<span class = "text" > { text } </span>]
    },
    renderEdit(h, cellRender, { row, column }, context) {
      // console.log('edit')
      try {
        let props = cellRender.props || {}
        let property = column.property
        let options = cellRender.options || []

        props['prefix'] = property
        let timeStamp = +new Date()
        // 1、正向给tree 3元素赋值
        if (!row[property + 'id']) {
          // 情况1:只给了前缀，没有给3个值，初始化3个值
          row[property + 'id'] = 'initId' + timeStamp
          row[property + 'code'] = ' '
          row[property + 'name'] = ' '
        } else {
          // 情况2: 给了前缀和id  code与name可能给了，可能没给； 给了的话优先用给了的值
          row[property + 'code'] = row[property + 'code'] || ' '
          row[property + 'name'] = row[property + 'name'] || ' '
        }

        // 2、反向给tree 3元素赋值
        if (row[property]) {
          const valueArr = row[property].split('##')
          row[property + 'id'] = valueArr[0]
          row[property + 'code'] = valueArr[1]
          row[property + 'name'] = valueArr[2]
        }

        // 转接串  1、3个树节点均没有  2、有3个树节点数据
        if (!row[property + 'id']) {
          row[property] = 'initId' + timeStamp + '## ## '
        } else {
          row[property] = row[property + 'id'] + '##' + row[property + 'code'] + '##' + row[property + 'name']
        }
        return [
          <BsTreeInputTest datas={ options } v-model={row[column.property]} {...{ props }} ></BsTreeInputTest>
        ]
      } catch (e) {}
    }
  }
  // $formTreeInput: { // form表单treeinput单选
  //   renderItem(h, { props, options }, { $form, property, data }) {
  //     props['prefix'] = `${property}`
  //     props['openQuerySeach'] = true
  //     let timeStamp = +new Date()
  //     // 如果新建没有初始值，赋初始值
  //     data[property + 'id'] = data[property + 'id'] || 'initId' + timeStamp
  //     data[property + 'code'] = data[property + 'code'] || ' '
  //     data[property + 'name'] = data[property + 'name'] || ' '
  //     data[property] = data[property + 'id'] + '##' + data[property + 'code'] + '##' + data[property + 'name']
  //     return [
  //       h('BsTreeInput', {
  //         ref: 'BsTreeInput' + property,
  //         props: {
  //           datas: options || [],
  //           value: data[property],
  //           ...props
  //         },
  //         on: {
  //           input(value) {
  //             data[property] = value
  //             const valueArr = data[property].split('##')
  //             data[property + 'id'] = valueArr[0]
  //             data[property + 'code'] = valueArr[1]
  //             data[property + 'name'] = valueArr[2]
  //             $form.$parent.itemChange({ $form, property, itemValue: value, data, renderOpts: { props, options } })
  //           }
  //         }
  //       })
  //     ]
  //   }
  // },
  // $formTreeInputCheck: { // form表单treeinput 多选
  //   renderItem(h, { props, options }, { $form, property, data }) {
  //     props['prefix'] = `${property}`
  //     props['openQuerySeach'] = true
  //     props['showcheckbox'] = true
  //     let timeStamp = +new Date()
  //     // 如果新建没有初始值，赋初始值
  //     data[property + 'id'] = data[property + 'id'] || 'initId' + timeStamp
  //     data[property + 'code'] = data[property + 'code'] || ' '
  //     data[property + 'name'] = data[property + 'name'] || ' '
  //     if (!data[property + 'name'].trim()) {
  //       data[property] = data[property + 'id'] + '##' + data[property + 'code'] + '##' + data[property + 'name']
  //     } else {
  //       const ids = data[property + 'id'] && data[property + 'id'].split(',')
  //       const codes = data[property + 'code'] && data[property + 'code'].split(',')
  //       const names = data[property + 'name'] && data[property + 'name'].split(',')
  //       let line = ''
  //       if (ids.length === names.length) {
  //         for (let i = 0, len = ids.length; i < len; i++) {
  //           line += `${ids[i]}##${codes[i]}##${names[i]}`
  //           if (i < len - 1) {
  //             line += ','
  //           }
  //         }
  //       } else {
  //         console.log('from: id,name数量匹配不上')
  //       }

  //       data[property] = line
  //     }

  //     return [
  //       h('BsTreeInput', {
  //         ref: 'BsTreeInput' + property,
  //         props: {
  //           datas: options || [],
  //           value: data[property],
  //           ...props
  //         },
  //         on: {
  //           input(value) {
  //             data[property] = value
  //             const nodes = data[property].split(',')
  //             let id = ''; let code = ''; let name = ''
  //             for (let i = 0, len = nodes.length; i < len; i++) {
  //               let item = nodes[i]
  //               if (!item) {
  //                 continue
  //               }
  //               id += item.split('##')[0] + ','
  //               code += item.split('##')[1] + ','
  //               name += item.split('##')[2] + ','
  //             }
  //             id = id.substr(0, id.length - 1)
  //             code = code.substr(0, code.length - 1)
  //             name = name.substr(0, name.length - 1)
  //             data[property + 'id'] = id
  //             data[property + 'code'] = code
  //             data[property + 'name'] = name
  //             $form.$parent.itemChange({ $form, property, itemValue: value, data, renderOpts: { props, options } })
  //           }
  //         }
  //       })
  //     ]
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
      options.forEach(option => {
        option.data = { type: 'has', isCase: false, value: '', valuegt: '' }
      })
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
            return (cellValue + '').replace(/null|NaN|undefined|\k+/ig, '') === ''
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
            return (cellValue + '').replace(/null|NaN|undefined|\k+/ig, '') === ''
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
