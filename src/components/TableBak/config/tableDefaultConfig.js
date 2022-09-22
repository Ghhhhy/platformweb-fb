// tableDefaultConfig   Author:Titans@2396757591@qq.com
/* eslint-disable no-eval */
/* eslint-disable no-new-wrappers */
/* eslint-disable no-useless-escape */
const defaultGloabalUtils = {
  calculateRender(h, renderOpts, { $columnIndex, $rowIndex, items, column, data, row, $seq, $table, $type, columnIndex, isEdit, level, rowIndex, seq }, context) {
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
    if (context.$grid.$parent.toolbarConfigInCopy.disabledMoneyConversion) {
      val = Number((val).toFixed(2)).toLocaleString()
      val = val.split('.').length === 1 ? val + '.00' : (val.split('.')[1].length === 1 ? val + '0' : val)
      return [<span class="text" >{val}</span>]
    } else {
      let moneyUnit = context.$grid.$parent.moneyUnit ? context.$grid.$parent.moneyUnit : 1
      val = Number((val / moneyUnit).toFixed(2)).toLocaleString()
      val = val.split('.').length === 1 ? val + '.00' : (val.split('.')[1].length === 1 ? val + '0' : val)
      return [<span>{val}</span>]
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
      } else if (Array.isArray(column.own.combinedType) && column.own.combinedType.indexOf(combinedType) >= 0) {
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
        } catch (e) {}
      } else {
        return ''
      }
    })
  },
  calculateFooter_average({ columns, data, $table, $grid }) {
    let moneyUnit = $grid.$parent.moneyUnit ? $grid.$parent.moneyUnit : 1
    // console.log(moneyUnit)
    return columns.map((column, columnIndex) => {
      //  combinedType: ['average', 'total'],
      // let combinedType = 'total'
      if (columnIndex === 0) {
        return '平均'
      } else if (Array.isArray(column.own.combinedType) && column.own.combinedType.indexOf('average') >= 0) {
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
            result = Number((result / moneyUnit).toFixed(2)).toLocaleString()
            result = result.split('.').length === 1 ? result + '.00' : (result.split('.')[1].length === 1 ? result + '0' : result)
            return result
          } else {
            return '0.00'
          }
        } catch (e) {}
      } else {
        return ''
      }
    })
  },
  calculateFooter_subTotal({ columns, data, $table, $grid }) {
    let moneyUnit = $grid.$parent.moneyUnit ? $grid.$parent.moneyUnit : 1
    // console.log(moneyUnit)
    let selections = $grid.getCheckboxRecords()
    return columns.map((column, columnIndex) => {
      //  combinedType: ['average', 'total'],
      // let combinedType = 'total'
      if (columnIndex === 0) {
        return '已选(' + $grid.getCheckboxRecords().length + ')'
      } else if (Array.isArray(column.own.combinedType) && column.own.combinedType.indexOf('subTotal') >= 0) {
        try {
          let result = selections.map((item, index) => {
            let value = (typeof (item[column.property]) === 'number' || typeof (item[column.property]) === 'string') ? parseFloat(item[column.property].toString().split(',').join('')) : 0
            return isNaN(parseFloat(value)) ? 0 : parseFloat(value)
          })
          if (result.length) {
            result = result.reduce((prev, next) => {
              return prev + next
            })
            result = Number((result / moneyUnit).toFixed(2)).toLocaleString()
            result = result.split('.').length === 1 ? result + '.00' : (result.split('.')[1].length === 1 ? result + '0' : result)
            return result
          } else {
            return '0.00'
          }
        } catch (e) {}
      } else {
        return ''
      }
    })
  },
  calculateFooter_total({ columns, data, $table, $grid }) {
    let moneyUnit = $grid.$parent.moneyUnit ? $grid.$parent.moneyUnit : 1
    // console.log(moneyUnit)
    return columns.map((column, columnIndex) => {
      if (columnIndex === 0) {
        return '合计'
      } else if (Array.isArray(column.own.combinedType) && column.own.combinedType.indexOf('total') >= 0) {
        try {
          let result = data.map((item, index) => {
            let value = (typeof (item[column.property]) === 'number' || typeof (item[column.property]) === 'string') ? parseFloat(item[column.property].toString().split(',').join('')) : 0
            return isNaN(parseFloat(value)) ? 0 : parseFloat(value)
          })
          if (result.length) {
            result = result.reduce((prev, next) => {
              return prev + next
            })
            result = Number((result / moneyUnit).toFixed(2)).toLocaleString()
            result = result.split('.').length === 1 ? result + '.00' : (result.split('.')[1].length === 1 ? result + '0' : result)
            return result
          } else {
            return '0.00'
          }
        } catch (e) {}
      } else {
        return ''
      }
    })
  },
  calculateFooter_totalAll({ columns, data, $table, $grid }) {
    let moneyUnit = $grid.$parent.moneyUnit ? $grid.$parent.moneyUnit : 1
    // console.log(moneyUnit)
    let item = $grid.$parent.footerConfigIn.totalObj || {}
    return columns.map((column, columnIndex) => {
      if (columnIndex === 0) {
        return '总计'
      } else if (Array.isArray(column.own.combinedType) && column.own.combinedType.indexOf('totalAll') >= 0) {
        try {
          let value = (typeof (item[column.property]) === 'number' || typeof (item[column.property]) === 'string') ? parseFloat(item[column.property].toString().split(',').join('')) : 0
          let result = Number((value / moneyUnit).toFixed(2)).toLocaleString()
          result = result.split('.').length === 1 ? result + '.00' : (result.split('.')[1].length === 1 ? result + '0' : result)
          return result
        } catch (e) { }
      } else {
        return ''
      }
    })
  }
}
const cellRenderers = {
  // 全局渲染器
  // cellRender渲染器名字配置
  // autofocus 自动聚焦的类名
  // renderHeader(h, renderOpts, params) 表头
  // renderEdit(h, renderOpts, params) 表内容 - 编辑
  // renderCell(h, renderOpts, params) 表内容 - 显示
  // renderFooter(h, renderOpts, params) 表尾
  // editCellExportMethod(params) 单元格导出函数
  // footerCellExportMethod(params) 表尾单元格导出函数
  $vxeTree: {
    renderDefault(h, { name, props }, { row, column }) {
      const { multiple, multipleValueType } = (props && props.config) || { multiple: true, multipleValueType: 'Array' }
      if (!multiple) {
        row[column.property] = [row[column.property + 'code'], row[column.property + 'name'], row[column.property + 'id']].map((item, index) => {
          return (item + '').replace(/null|NaN|undefined/ig, '')
        }).join('##')
        row[column.property] = row[column.property] === '####' ? '' : row[column.property]
      } else {
        let idArr = typeof (row[column.property + 'id']) === 'string' ? row[column.property + 'id'].split(',') : (Array.isArray(row[column.property + 'id']) ? row[column.property + 'id'] : [])
        let codeArr = typeof (row[column.property + 'code']) === 'string' ? row[column.property + 'code'].split(',') : (Array.isArray(row[column.property + 'code']) ? row[column.property + 'code'] : [])
        let nameArr = typeof (row[column.property + 'name']) === 'string' ? row[column.property + 'name'].split(',') : (Array.isArray(row[column.property + 'name']) ? row[column.property + 'name'] : [])
        if (multipleValueType === 'String') {
          row[column.property + 'id'] = idArr.join(',')
          row[column.property + 'code'] = idArr.join(',')
          row[column.property + 'name'] = idArr.join(',')
        } else {
          row[column.property + 'id'] = idArr
          row[column.property + 'code'] = codeArr
          row[column.property + 'name'] = nameArr
        }
        row[column.property] = codeArr.map((item, index) => {
          return [codeArr[index], nameArr[index], idArr[index]].map((item, index) => {
            return (item + '').replace(/null|NaN|undefined/ig, '')
          }).join('##')
        }).join(',')
      }
      return [
        h('BsTree', {
          props: {
            ref: 'vxe-tree-' + column.property,
            value: row[column.property],
            editble: false,
            ...props,
            isDropSelectTree: true
          },
          on: {}
        })
      ]
    },
    renderCell(h, { name, props }, { row, column }) {
      const { multiple, multipleValueType } = (props && props.config) || { multiple: true, multipleValueType: 'Array' }
      if (!multiple) {
        row[column.property] = [row[column.property + 'code'], row[column.property + 'name'], row[column.property + 'id']].map((item, index) => {
          return (item + '').replace(/null|NaN|undefined/ig, ' ')
        }).join('##')
        row[column.property] = row[column.property] === '####' ? '' : row[column.property]
      } else {
        let idArr = typeof (row[column.property + 'id']) === 'string' ? row[column.property + 'id'].split(',') : (Array.isArray(row[column.property + 'id']) ? row[column.property + 'id'] : [])
        let codeArr = typeof (row[column.property + 'code']) === 'string' ? row[column.property + 'code'].split(',') : (Array.isArray(row[column.property + 'code']) ? row[column.property + 'code'] : [])
        let nameArr = typeof (row[column.property + 'name']) === 'string' ? row[column.property + 'name'].split(',') : (Array.isArray(row[column.property + 'name']) ? row[column.property + 'name'] : [])
        if (multipleValueType === 'String') {
          row[column.property + 'id'] = idArr.join(',')
          row[column.property + 'code'] = idArr.join(',')
          row[column.property + 'name'] = idArr.join(',')
        } else {
          row[column.property + 'id'] = idArr
          row[column.property + 'code'] = codeArr
          row[column.property + 'name'] = nameArr
        }
        row[column.property] = nameArr.length ? codeArr.map((item, index) => {
          return [codeArr[index], nameArr[index], idArr[index]].map((item, index) => {
            return (item + '').replace(/null|NaN|undefined/ig, ' ')
          }).join('##')
        }).join(',') : ''
      }
      return [
        h('BsTree', {
          props: {
            ref: 'vxe-tree-' + column.property,
            value: row[column.property],
            editble: false,
            ...props,
            isDropSelectTree: true
          },
          on: {
          }
        })
      ]
    },
    renderEdit(h, { name, props }, { row, column }) {
      const { multipleValueType } = (props && props.config) || { multiple: true, multipleValueType: 'Array' }
      let renderData = row
      return [
        h('BsTree', {
          props: {
            ref: 'vxe-tree-' + column.property,
            editble: true,
            value: row[column.property],
            ...props,
            isDropSelectTree: true
          },
          on: {
            input: (value) => {
              renderData[column.property] = value
            },
            onNodeClick({ data, treeData }) {
              renderData[column.property + 'id'] = data.id
              renderData[column.property + 'code'] = data.code
              renderData[column.property + 'name'] = data.name
            },
            onNodeCheckClick({ data, treeData, value }) {
              renderData[column.property + 'id'] = data.map((item, index) => {
                return item.id ? item.id : ''
              })
              renderData[column.property + 'code'] = data.map((item, index) => {
                return item.code ? item.code : ''
              })
              renderData[column.property + 'name'] = data.map((item, index) => {
                return item.name ? item.name : ''
              })
              if (multipleValueType === 'String') {
                renderData[column.property + 'id'] = renderData[column.property + 'id'].join(',')
                renderData[column.property + 'code'] = renderData[column.property + 'code'].join(',')
                renderData[column.property + 'name'] = renderData[column.property + 'name'].join(',')
              }
            }
          }
        })
      ]
    },
    renderItem(h, { props }, { $form, property, data }) {
      let renderData = data
      const { multipleValueType, multiple } = (props && props.config) || { multiple: true, multipleValueType: 'Array' }
      if (!multiple) {
        data[property] = [data[property + 'code'], data[property + 'name'], data[property + 'id']].map((item, index) => {
          return (item + '').replace(/null|NaN|undefined/ig, ' ')
        }).join('##')
      } else {
        let idArr = typeof (data[property + 'id']) === 'string' ? data[property + 'id'].split(',') : (Array.isArray(data[property + 'id']) ? data[property + 'id'] : [])
        let codeArr = typeof (data[property + 'code']) === 'string' ? data[property + 'code'].split(',') : (Array.isArray(data[property + 'code']) ? data[property + 'code'] : [])
        let nameArr = typeof (data[property + 'name']) === 'string' ? data[property + 'name'].split(',') : (Array.isArray(data[property + 'name']) ? data[property + 'name'] : [])
        if (multipleValueType === 'String') {
          data[property + 'id'] = idArr.join(',')
          data[property + 'code'] = idArr.join(',')
          data[property + 'name'] = idArr.join(',')
        } else {
          data[property + 'id'] = idArr
          data[property + 'code'] = codeArr
          data[property + 'name'] = nameArr
        }
        data[property] = nameArr.length ? codeArr.map((item, index) => {
          return [codeArr[index], nameArr[index], idArr[index]].map((item, index) => {
            return (item + '').replace(/null|NaN|undefined/ig, '')
          }).join('##')
        }).join(',') : ''
      }
      return [
        h('BsTree', {
          props: {
            ref: 'vxe-tree-' + property,
            editble: true,
            value: data[property],
            ...props,
            isDropSelectTree: true
          },
          on: {
            input: (value) => {
              data[property] = value
            },
            onNodeClick({ data, treeData }) {
              renderData[property + 'id'] = data.id
              renderData[property + 'code'] = data.code
              renderData[property + 'name'] = data.name
            },
            onNodeCheckClick({ data, treeData, value }) {
              renderData[property + 'id'] = data.map((item, index) => {
                return item.id ? item.id : ''
              })
              renderData[property + 'code'] = data.map((item, index) => {
                return item.code ? item.code : ''
              })
              renderData[property + 'name'] = data.map((item, index) => {
                return item.name ? item.name : ''
              })
              if (multipleValueType === 'String') {
                renderData[property + 'id'] = renderData[property + 'id'].join(',')
                renderData[property + 'code'] = renderData[property + 'code'].join(',')
                renderData[property + 'name'] = renderData[property + 'name'].join(',')
              }
            }
          }
        })
      ]
    }
  },
  NotData: {
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
  $calculateRender: {
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
    }
  },
  $moneyRender: {
    // 输入框
    renderDefault(h, { props }, { row, column }, context) {
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
    renderEdit(h, { props }, { row, column }) {
      // let val = isNaN(parseFloat(row[column.property])) ? '0.00' : parseFloat(row[column.property])
      // row[column.property] = val
      props = props || {}
      // <vxe-input v-model="value504" placeholder="小数间隔 2.3" type="float" step="2.3" clearable></vxe-input>
      return [
        <vxe-input
          v-model={row[column.property]}
          step={ 1 }
          type="float"
          min = { 0.00 }
          {...{ props }}
          max={1000000000000}
          placeholder="可清除"
          clearable
        ></vxe-input>
        // <input class="my-cell" text="text" v-model={ row[column.property] } />
      ]
    },
    renderCell(h, { props }, { row, column }, context) {
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
        return [<span class="text" {...{ props }}></span>]
      }
    }
  },
  $treeText: {
    renderCell(h, cellRender, { row, column }, context) {
      const name = row[`${column.property}name`] === ' ' ? '' : row[`${column.property}name`]
      const code = row[`${column.property}code`] === ' ' ? '' : row[`${column.property}code`]
      const noCode = cellRender.props && cellRender.props.noCode
      const treelineData = cellRender.props && cellRender.props.treelineData
      let text = ''
      if (treelineData) {
        text = row[`${column.property}`] ? row[`${column.property}`] : ''
      } else {
        if (name) {
          text = noCode ? `${name}` : `${code}-${name}`
        }
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
  $treeinput: {
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
          <BsTreeInput datas={ options } v-model={row[column.property]} {...{ props }} ></BsTreeInput>
        ]
      } catch (e) {}
    }
  },
  $treeTextCheck: {
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
  $treeinputCheck: {
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
  $EditDownTextarea: {
    autofocus: '.vxe-input--inner',
    renderEdit(h, renderOpts, params) {
      return [
        <edit-down-textarea params={ params }></edit-down-textarea>
      ]
    },
    renderCell(h, cellRender, { row, column }, context) {
      return [<span class="text">{row[column.property]}</span>]
    }
  },
  $EditDownJson: {
    autofocus: '.vxe-input--inner',
    renderEdit(h, renderOpts, params) {
      return [
        <edit-down-json params={ params }></edit-down-json>
      ]
    },
    // renderCell(h, renderOpts, params) {
    //   return [
    //     <edit-down-json params={ params }></edit-down-json>
    //   ]
    // }
    renderCell(h, cellRender, { row, column }, context) {
      let value = JSON.stringify(row[column.property])
      return [<span class="text">{value}</span>]
    }
  },
  $EditDownConditions: {
    autofocus: '.vxe-input--inner',
    renderEdit(h, { name, options, props }, params) {
      return [
        <edit-down-conditions constProps={ props } params={ params }></edit-down-conditions>
      ]
    },
    renderCell(h, cellRender, { row, column }, context) {
      return [<span class="text">{row[column.property]}</span>]
    }
  },
  $optionSort: {
    renderDefault(h, cellRender, { $columnIndex, $rowIndex, items, column, data, row, $seq, columnIndex, isEdit, level, rowIndex, seq }, { $excel, $grid, $table, $type }) {
      let self = $grid.$parent
      // <a class="optionRow" href={row.link}>{'操作' + row[column.property]}</a>
      return [
        <div class="row-dragsort-option row-option-group">
          <a class="optionRow-delete fn-inline" onClick={() => self.onOptionSortRowClick({ row, column, $rowIndex, data, items, optionType: 'upSort' })}>上移</a>
          <a class="optionRow-edit fn-inline" onClick={() => self.onOptionSortRowClick({ row, column, $rowIndex, data, items, optionType: 'downSort' })}>下移</a>
          <a class="optionRow-report fn-inline" onClick={() => self.onOptionSortRowClick({ row, column, $rowIndex, data, items, optionType: 'topSort' })}>置顶</a>
          <a class="optionRow-detail fn-inline" onClick={() => self.onOptionSortRowClick({ row, column, $rowIndex, data, items, optionType: 'bottomSort' })}>置底</a>
        </div>
      ]
    }
  },
  optionRow: {
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
  $vxeProgress: {
    // 进度条
    renderCell(h, { props, options }, { row, column }) {
      return [
        <el-progress text-inside="true" stroke-width="20" percentage={row[column.property]} style="line-height:30px"></el-progress>
      ]
    },
    renderDefault(h, { props, options }, { row, column }) {
      return [
        <el-progress text-inside="true" stroke-width="20" percentage={row[column.property]} style="line-height:30px"></el-progress>
      ]
    },
    renderEdit(h, { props, options }, { row, column }) {
      return [
        <el-progress text-inside="true" stroke-width="20" percentage={row[column.property]} style="line-height:30px"></el-progress>
      ]
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
        <el-switch
          {...{ props }}
          active-text={ options[0].label }
          inactive-text={ options[1].label }
          v-model={row[column.property]}
          active-color="#13ce66"
          active-value={ options[0].value }
          inactive-value={ options[1].value }>
        </el-switch>
      ]
    },
    renderDefault(h, { props, options }, { row, column }) {
      return [
        <el-switch
          {...{ props }}
          active-text={ options[0].label }
          inactive-text={ options[1].label }
          v-model={row[column.property]}
          active-color="#13ce66"
          active-value={ options[0].value }
          inactive-value={ options[1].value }>
        </el-switch>
      ]
    },
    renderEdit(h, { props, options }, { row, column }) {
      return [
        <el-switch
          {...{ props }}
          active-text={ options[0].label }
          inactive-text={ options[1].label }
          v-model={row[column.property]}
          active-color="#13ce66"
          active-value={ options[0].value }
          inactive-value={ options[1].value }>
        </el-switch>
      ]
    }
  },
  // $vxeSwitch: {
  //   // 开关
  //   // props: {
  //   //   options: [
  //   //     { label: '是', value: 1 },
  //   //     { label: '否', value: 0 }
  //   //   ]
  //   // }
  //   renderCell(h, { props, options }, { row, column }) {
  //     return [
  //       <vxe-switch
  //         {...{ props }}
  //         class = "switch-noteditble"
  //         on-label = { options[0].label }
  //         off-label = { options[1].label }
  //         on-value = { options[0].value }
  //         off-value = { options[1].value }
  //         v-model={row[column.property]}
  //       ></vxe-switch>
  //     ]
  //   },
  //   renderDefault(h, { props, options }, { row, column }) {
  //     return [
  //       <vxe-switch
  //         {...{ props }}
  //         disabled
  //         class = "switch-noteditble"
  //         on-label = { options[0].label }
  //         off-label = { options[1].label }
  //         on-value = { options[0].value }
  //         off-value = { options[1].value }
  //         v-model={row[column.property]}
  //       ></vxe-switch>
  //     ]
  //   },
  //   renderEdit(h, { props, options }, { row, column }) {
  //     return [
  //       <vxe-switch
  //         {...{ props }}
  //         class = "switch-editble"
  //         on-label = { options[0].label }
  //         off-label = { options[1].label }
  //         on-value = { options[0].value }
  //         off-value = { options[1].value }
  //         v-model={row[column.property]}
  //       ></vxe-switch>
  //     ]
  //   }
  // },
  $vxeDays: {
    // 天数渲染器，不足0.25天按0记，大于0.75天按1天记，其他按0.5天记
    renderCell(h, { props }, { row, column }) {
      let quiteDay = row[column.property] % 1
      quiteDay = quiteDay <= 0.25 ? 0 : (quiteDay >= 0.75 ? 1 : 0.5)
      row[column.property] = Math.floor(row[column.property] / 1) + quiteDay
      return [<span>{row[column.property]}</span>]
    },
    renderDefault(h, { props }, { row, column }) {
      let quiteDay = row[column.property] % 1
      quiteDay = quiteDay <= 0.25 ? 0 : (quiteDay >= 0.75 ? 1 : 0.5)
      row[column.property] = Math.floor(row[column.property] / 1) + quiteDay
      return [<span>{row[column.property]}</span>]
    },
    renderEdit(h, { props }, { row, column }) {
      // return [
      //   h('vxe-input', {
      //     ref: 'vxe-input' + column.property,
      //     props: {
      //       value: row[column.property],
      //       placeholder: '请输入天数',
      //       type: 'number',
      //       clearable: true,
      //       ...props
      //     },
      //     on: {
      //       input(value) {
      //         let quiteDay = value % 1
      //         quiteDay = quiteDay <= 0.25 ? 0 : (quiteDay >= 0.75 ? 1 : 0.5)
      //         row[column.property] = Math.floor(value / 1) + quiteDay
      //       }
      //     }
      //   })
      // ]
      return [
        <vxe-input
          placeholder = "请输入天数"
          type="number"
          clearable
          { ...{ props } }
          v-model={row[column.property]}
        ></vxe-input>
      ]
    }
  },
  $vxeTime: {
    // 天数渲染器，不足0.25天按0记，大于0.75天按1天记，其他按0.5天记
    renderCell(h, { props }, { row, column }) {
      props.format = props.format || 'YYYY-MM-DD hh:mm:ss'
      row[column.property] = row[column.property] ? new Date(row[column.property]).format(props.format) : ''
      return [<span>{row[column.property]}</span>]
    },
    renderDefault(h, { props }, { row, column }) {
      props.format = props.format || 'YYYY-MM-DD hh:mm:ss'
      row[column.property] = row[column.property] ? new Date(row[column.property]).format(props.format) : ''
      return [<span>{row[column.property]}</span>]
    },
    renderEdit(h, { props }, { row, column }) {
      // return [
      //   h('vxe-input', {
      //     ref: 'vxe-input' + column.property,
      //     props: {
      //       value: row[column.property],
      //       placeholder: '请输入天数',
      //       type: 'number',
      //       clearable: true,
      //       ...props
      //     },
      //     on: {
      //       input(value) {
      //         let quiteDay = value % 1
      //         quiteDay = quiteDay <= 0.25 ? 0 : (quiteDay >= 0.75 ? 1 : 0.5)
      //         row[column.property] = Math.floor(value / 1) + quiteDay
      //       }
      //     }
      //   })
      // ]
      return [
        <vxe-input
          placeholder = "请输入天数"
          type="date"
          clearable
          { ...{ props } }
          v-model={row[column.property]}
        ></vxe-input>
      ]
    }
  },
  $span: {
    // 文本渲染
    renderCell(h, renderOpts, { row, column }) {
      return [<span>{row[column.property]}</span>]
    },
    renderEdit(h, renderOpts, { row, column }) {
      return [
        <vxe-input
          v-model={row[column.property]}
          placeholder="自动计算"
          readonly
          clearable
        ></vxe-input>
      ]
      // return [<span>{row[column.property]}</span>]
    }
  },
  $href: {
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
  vexInput: {
    // 输入框
    // renderDefault(h, cellRender, { row, column }, context) {
    //   return [
    //     <span class="text">
    //       {row[column.property] === 1 ? '男男' : '女女'}
    //     </span>
    //   ]
    // },
    renderEdit(h, editRender, { row, column }) {
      return [
        <vxe-input
          v-model={row[column.property]}
          placeholder="可清除"
          clearable
        ></vxe-input>
        // <input class="my-cell" text="text" v-model={ row[column.property] } />
      ]
    },
    renderCell(h, cellRender, { row, column }, context) {
      return [<span class="text">{row[column.property]}</span>]
    }
  },
  $vxeSelect: {
    // 下拉选择
    renderEdit(h, { props, options }, { row, column }) {
      options = options || []
      return [
        <vxe-select v-model={row[column.property]} { ...{ props } } placeholder="请选择">
          {options.map((item, index) => {
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
    renderDefault(h, { props, options }, { row, column }, context) {
      props = props || {}
      props.multiple = props.multiple === undefined ? false : props.multiple
      options = options || []
      if (props.multiple) {
        let value = []
        options.forEach((item, index) => {
          if (Array.isArray(row[column.property]) ? row[column.property].indexOf(item.value) >= 0 : (row[column.property] + '').split(',').indexOf(item.value) >= 0) {
            value.push(item.label)
          }
        })
        row[column.property + '_select_sort'] = value.join(',')
        return [<span>{row[column.property + '_select_sort']}</span>]
      } else {
        let arrValue = options.filter((item, index) => {
          return item.value === row[column.property]
        })
        let value = arrValue[0] ? arrValue[0].label : ''
        return [<span>{value}</span>]
      }
    },
    renderCell(h, { props, options }, { row, column }, context) {
      props = props || {}
      props.multiple = props.multiple === undefined ? false : props.multiple
      options = options || []
      if (props.multiple) {
        let value = []
        options.forEach((item, index) => {
          if (Array.isArray(row[column.property]) ? row[column.property].indexOf(item.value) >= 0 : (row[column.property] + '').split(',').indexOf(item.value) >= 0) {
            value.push(item.label)
          }
        })
        row[column.property + '_select_sort'] = value.join(',')
        return [<span>{row[column.property + '_select_sort']}</span>]
      } else {
        let arrValue = options.filter((item, index) => {
          return item.value === row[column.property]
        })
        let value = arrValue[0] ? arrValue[0].label : ''
        return [<span>{value}</span>]
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
      return [<span>{value}</span>]
    },
    renderCell(h, { options, props }, { row, column }) {
      let value = ''
      options.forEach((item, index) => {
        if (row[column.property] === item.value) {
          value = item.label
        }
      })
      return [<span>{value}</span>]
    }
  },
  $vxeCheckbox: {
    renderEdit(h, { options, props, propsC }, { row, column }) {
      props = props || {}
      propsC = propsC || {}
      row[column.property] = Array.isArray(row[column.property]) ? row[column.property] : []
      return [
        <vxe-checkbox-group {...{ props }} v-model={row[column.property]} placeholder="请选择">
          {options.map((item, index) => {
            return [
              <vxe-checkbox
                label={item.value}
                { ...{ propsC } }
              >
                {item.label}
              </vxe-checkbox>
            ]
          })}
        </vxe-checkbox-group>
      ]
    },
    renderDefault(h, { options, props }, { row, column }, context) {
      row[column.property] = Array.isArray(row[column.property]) ? row[column.property] : []
      let value = []
      options.forEach((item, index) => {
        if (row[column.property].indexOf(item.value) >= 0) {
          value.push(item.label)
        }
      })
      row[column.property + '_checkbox_sort'] = value.join(',')
      return [<span>{row[column.property + '_checkbox_sort']}</span>]
    },
    renderCell(h, { options, props }, { row, column }) {
      row[column.property] = Array.isArray(row[column.property]) ? row[column.property] : []
      let value = []
      options.forEach((item, index) => {
        if (row[column.property].indexOf(item.value) >= 0) {
          value.push(item.label)
        }
      })
      row[column.property + '_checkbox_sort'] = value.join(',')
      return [<span>{row[column.property + '_checkbox_sort']}</span>]
    }
  },
  $vexDynamicSelect: {
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
  $contentTable: {
    renderExpand(h, { props }, { $columnIndex, $rowIndex, items, column, data, row, $seq, $table, $type, columnIndex, isEdit, level, rowIndex, seq }, context) {
      const tableConfig = {
        globalConfig: { // 全局默认渲染列配置
          // 全局配置
          checkType: '',
          seq: false
        }
      }
      return [
        <BsTable toolbarConfig={false} pagerConfig={false} tableConfig={ tableConfig } { ...{ props }} height="unset" tableColumnsConfig={ row.childCols } tableData={ row.childData }></BsTable>
      ]
    }
  }
}
const filterRenderers = {
  FilterComplex: {
    // 不显示底部按钮，使用自定义的按钮
    isFooter: false,
    // 筛选模板
    renderFilter(h, renderOpts, params) {
      return [
        <filter-complex params={params}></filter-complex>
      ]
    },
    // 重置数据方法
    filterResetMethod({ options }) {
      options.forEach(option => {
        option.data = { type: 'has', isCase: false, value: '' }
      })
    },
    // 筛选数据方法
    filterMethod({ option, row, column }) {
      let cellValue = row[column.property]
      let { type, isCase, value } = option.data
      if (cellValue) {
        if (isCase) {
          cellValue = cellValue.toLowerCase()
          value = value.toLowerCase()
        }
      }
      switch (type) {
        case 'has':
          return new String(cellValue).indexOf(value) > -1
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
          return Number(cellValue) < Number(value)
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
        if (new String(cellValue).indexOf('##') > 0) {
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
      return new String(cellValue).toLowerCase().indexOf(data.toLowerCase()) > -1
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
    // 筛选方法
    filterMethod({ option, row, column }) {
      const { options, data } = option
      const { vals } = data
      let cellValue = row[column.property]
      let value = []
      options.forEach((item, index) => {
        if (new String(cellValue).indexOf(item.value) >= 0) {
          value.push(item.label)
        }
      })
      return value.some((item) => {
        return vals.indexOf(item) >= 0
      })
    }
  }
}
export const defaultRenderers = {
  ...cellRenderers,
  ...filterRenderers
}
export const tableColumns = { // 默认配置列
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
    width: 60,
    align: 'center',
    className: 'table-sep',
    fixed: 'left',
    sortable: false
  },
  checkbox: { // 选择
    title: '',
    type: 'checkbox',
    width: 60,
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
    className: 'table-row-checkbox',
    cellRender: {
      type: 'cellRender',
      name: '$optionSort'
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
      name: 'optionRow'
    }
  }
}
export const pagerConfig = {
  align: 'right',
  // pageSizes: [20, 50, 100, 500, 1000, 1000000],
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
      value: 1000000
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
    'Total'
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
    let head = n < 0 ? '欠' : ''
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
  showFooter: false,
  totalObj: {}, // 总计数据对象
  combinedType: ['subTotal', 'total', 'totalAll', 'switchTotal'], // 显示那些合计行类型，注意顺序
  footerMethod({ columns, data, $table, $grid }) {
    let combinedType = $grid.$parent.footerConfigIn.combinedType || ['switchTotal']
    // let calculateFooterObj = {
    //     calculateFooter_subTotal: defaultGloabalUtils.calculateFooter_subTotal({ columns, data, $table, $grid }),
    //     calculateFooter_total: defaultGloabalUtils.calculateFooter_total({ columns, data, $table, $grid }),
    //     calculateFooter_totalAll :defaultGloabalUtils.calculateFooter_totalAll({ columns, data, $table, $grid }),
    // }
    let footerData = []
    if (combinedType.indexOf('switchTotal') >= 0) {
      if ($grid.getCheckboxRecords().length) {
        footerData = [defaultGloabalUtils['calculateFooter_subTotal']({ columns, data, $table, $grid })]
        // footerData[0][0] = '已选(' + $grid.getCheckboxRecords().length + ')'
      } else {
        footerData = [defaultGloabalUtils['calculateFooter_totalAll']({ columns, data, $table, $grid })]
        // footerData[0][0] = '总计'
      }
    } else {
      footerData = combinedType.map(item => {
        return defaultGloabalUtils['calculateFooter_' + item]({ columns, data, $table, $grid })
      })
    }
    // const footerData = [
    //   // defaultGloabalUtils.calculateFooter({ columns, data, columnIndexText: '平均(元)', combinedType: 'average' }, context),
    //   defaultGloabalUtils.calculateFooter({ columns, data, $table, $grid, columnIndexText: '合计(元)', combinedType: 'total' })
    // ]
    return footerData
  },
  footerSpanMethod({ $rowIndex, column, columnIndex, $columnIndex, data }) {
    return {
      rowspan: 1,
      colspan: 1
    }
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
      }]
    ]
  },
  body: {
    options: [
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

    ]
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
