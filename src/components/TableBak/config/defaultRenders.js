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
const defaultGloabalUtils = {
  calculateRender(h, renderOpts, { $columnIndex, $rowIndex, items, column, data, row, $seq, $grid, $table, $type, columnIndex, isEdit, level, rowIndex, seq }, context) {
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
const defaultPublicRenders = {
  // 表格form全局渲染器
  $vxeInput: {
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
    },
    renderDefault(h, cellRender, { row, column }, context) {
      return [<span class="text">{row[column.property]}</span>]
    },
    renderItem(h, renderOpts, { $form, property, data }) {
      let { props } = renderOpts
      props = props || {}
      if ($form.$parent.editable !== false) {
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
          if (row[column.property].indexOf(item.value) >= 0) {
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
          if (row[column.property].indexOf(item.value) >= 0) {
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
    renderItem(h, renderOpts, { $form, property, data }) {
      let { props, options } = renderOpts
      props = props || {}
      if ($form.$parent.editable !== false) {
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
        let val = ''
        options.forEach((item, index) => {
          if (data[property] === item.value) {
            val = item.label
          }
        })
        return [
          <span class="tl fn-inline"> {val} </span>
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
      // return defaultGloabalUtils.calculateRender(h, renderOpts, { $columnIndex, $rowIndex, items, column, data, row, $seq, $table, $type, columnIndex, isEdit, level, rowIndex, seq }, context)
      return [<span>{row[column.property]}</span>]
    },
    renderCell(h, renderOpts, { $columnIndex, $rowIndex, items, column, data, row, $seq, $table, $type, columnIndex, isEdit, level, rowIndex, seq }, context) {
      // return defaultGloabalUtils.calculateRender(h, renderOpts, { $columnIndex, $rowIndex, items, column, data, row, $seq, $table, $type, columnIndex, isEdit, level, rowIndex, seq }, context)
      return [<span>{row[column.property]}</span>]
    },
    renderEdit(h, renderOpts, { $columnIndex, $rowIndex, items, column, data, row, $seq, $table, $type, columnIndex, isEdit, level, rowIndex, seq }, context) {
      // return defaultGloabalUtils.calculateRender(h, renderOpts, { $columnIndex, $rowIndex, items, column, data, row, $seq, $table, $type, columnIndex, isEdit, level, rowIndex, seq }, context)
      // return [
      //   <vxe-input
      //     v-model={row[column.property]}
      //     placeholder="自动计算"
      //     readonly
      //     clearable
      //   ></vxe-input>
      // ]
      return [<span>{row[column.property]}</span>]
    },
    renderItem(h, renderOpts, { $form, data, property }) {
      return defaultGloabalUtils.formCalculateRender(h, renderOpts, { $form, data, property })
    }
  },
  $vxeMoney: {
    // 输入框
    renderDefault(h, { props }, { row, column, $grid }, context) {
      props = props || {}
      let showZero = context.$grid.$parent.showZero
      let val = isNaN(parseFloat(row[column.property])) ? '' : parseFloat(row[column.property])
      if (val === '') {
        return [<span class="text" {...{ props }} >{val}</span>]
      } else {
        row[column.property] = val.toFixed(2)
        if (context.$grid.$parent.toolbarConfigInCopy.disabledMoneyConversion) {
          val = Number((val).toFixed(2)).toLocaleString()
          val = val.split('.').length === 1 ? val + '.00' : (val.split('.')[1].length === 1 ? val + '0' : val)
          if (!showZero) {
            return [<span class="text" {...{ props }} >{val}</span>]
          } else {
            val = val === '0.00' ? '' : val
            return [<span class="text" {...{ props }} >{val}</span>]
          }
        } else {
          let moneyUnit = context.$grid.$parent.moneyUnit ? context.$grid.$parent.moneyUnit : 1
          val = Number((val / moneyUnit).toFixed(2)).toLocaleString()
          val = val.split('.').length === 1 ? val + '.00' : (val.split('.')[1].length === 1 ? val + '0' : val)
          if (!showZero) {
            return [<span class="text" {...{ props }} >{val}</span>]
          } else {
            val = val === '0.00' ? '' : val
            return [<span class="text" {...{ props }} >{val}</span>]
          }
        }
      }
    },
    renderEdit(h, { props }, { row, column, $grid }) {
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
    renderCell(h, { props }, { row, column, $grid }, context) {
      props = props || {}
      let showZero = context.$grid.$parent.showZero
      let val = isNaN(parseFloat(row[column.property])) ? '' : parseFloat(row[column.property])
      if (val === '') {
        return [<span class="text" {...{ props }} >{val}</span>]
      } else {
        row[column.property] = val.toFixed(2)
        if (context.$grid.$parent.toolbarConfigInCopy.disabledMoneyConversion) {
          val = Number((val).toFixed(2)).toLocaleString()
          val = val.split('.').length === 1 ? val + '.00' : (val.split('.')[1].length === 1 ? val + '0' : val)
          if (!showZero) {
            return [<span class="text" {...{ props }} >{val}</span>]
          } else {
            val = val === '0.00' ? '' : val
            return [<span class="text" {...{ props }} >{val}</span>]
          }
        } else {
          let moneyUnit = context.$grid.$parent.moneyUnit ? context.$grid.$parent.moneyUnit : 1
          val = Number((val / moneyUnit).toFixed(2)).toLocaleString()
          val = val.split('.').length === 1 ? val + '.00' : (val.split('.')[1].length === 1 ? val + '0' : val)
          if (!showZero) {
            return [<span class="text" {...{ props }} >{val}</span>]
          } else {
            val = val === '0.00' ? '' : val
            return [<span class="text" {...{ props }} >{val}</span>]
          }
        }
      }
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
        val = Number(val.toFixed(2)).toLocaleString()
        return [<span class="tl" {...{ props }} >{val}</span>]
      }
    }
  },
  $vxeEditDownTextarea: {
    autofocus: '.vxe-input--inner',
    renderDefault(h, cellRender, { row, column }, context) {
      return [<span class="text">{row[column.property]}</span>]
    },
    renderEdit(h, renderOpts, params) {
      return [
        <edit-down-textarea params={ params }></edit-down-textarea>
      ]
    },
    renderCell(h, cellRender, { row, column }, context) {
      return [<span class="text">{row[column.property]}</span>]
    },
    renderItem(h, { props, name, options }, { $form, property, data }) {
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
    // 天数渲染器，不足0.25天按0记，大于0.75天按1天记，其他按0.5天记
    renderCell(h, { props, format }, { row, column }) {
      format = format || 'YYYY-MM-DD hh:mm:ss'
      // row[column.property] = row[column.property] ? new Date(row[column.property]).format(format) : ''
      return [<span>{row[column.property]}</span>]
    },
    renderDefault(h, { props, format }, { row, column }) {
      format = format || 'YYYY-MM-DD hh:mm:ss'
      // row[column.property] = row[column.property] ? new Date(row[column.property]).format(format) : ''
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
    },
    renderItem(h, renderOpts, { $form, property, data }) {
      let { props, format } = renderOpts
      format = format || 'YYYY-MM-DD hh:mm:ss'
      props = props || {}
      if ($form.$parent.editable !== false) {
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
  $vxeText: {
    // 文本渲染
    renderCell(h, renderOpts, { row, column }) {
      return [<span>{row[column.property]}</span>]
    },
    renderDefault(h, renderOpts, { row, column }) {
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
    },
    renderItem(h, renderOpts, { $form, property, data }) {
      let { props } = renderOpts
      props = props || {}
      return [
        <span class="tc fn-inline" {...{ props }}> {data[property]} </span>
      ]
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
    },
    renderItem(h, renderOpts, { $form, property, data }) {
      let { props, propsC, options } = renderOpts
      data[property] = Array.isArray(data[property]) ? data[property] : []
      if ($form.$parent.editable !== false) {
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
      if ($form.$parent.editable !== false) {
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
  }
}
const defaultTableRenderers = {
  // 表格全局渲染器
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
  $vxeEditDownJson: {
    autofocus: '.vxe-input--inner',
    renderEdit(h, renderOpts, params) {
      return [
        <edit-down-json params={ params }></edit-down-json>
      ]
    },
    renderDefault(h, cellRender, { row, column }, context) {
      let value = JSON.stringify(row[column.property])
      return [<span class="text">{value}</span>]
    },
    renderCell(h, cellRender, { row, column }, context) {
      let value = JSON.stringify(row[column.property])
      return [<span class="text">{value}</span>]
    }
  },
  $vxeEditDownConditions: {
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
  $vxeContentTable: {
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
  },
  $vxeGroupTitle: {
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
export default {
  ...defaultPublicRenders,
  ...defaultTableRenderers
}
