// 导出视图数据映射以及对齐方式映射
import util from '../../tool/util.js'
export function defaultViewValueFormat(value, row, column) {
  let render = column.editRender || column.cellRender || column.contentRender
  let val = (value + '').replace(/null|undefined|root|NaN/ig, '')
  let valueArr = []
  let valStr = ''
  if (render && render.name) {
    let options = render.options || []
    const props = render.props || {}
    switch (render.name) {
      case '$vxeTree':
        let field = column.property || column.field
        let { multiple, format, showField, isHump, valueKeys = ['code', 'name', 'id'] } = (props && props.config) || { multiple: false, format: '{code}-{name}', showField: '', isHump: false }
        let fieldkeys = isHump ? ['Code', 'Name', 'Id'] : (field.endsWith('_') ? ['code', 'name', 'id'] : ['_code', '_name', '_id'])
        format = (props && props.cellViewFormat) || format || ('{' + valueKeys[0] + '}-{' + valueKeys[1] + '}')
        if (showField) {
          if (showField === true && format) {
            return util.formatFn(format, row)
          } else {
            row[showField] = (row[showField] + '').replace(/null|undefined/ig, '')
            return row[showField]
          }
        } else {
          let regR = new RegExp('({[a-zA-Z0-9_]*})', 'ig')
          let rowsKey = format.match(regR).map((key, keyIndex) => {
            return key.replace(/{|}/gi, '')
          })
          if (!multiple) {
            let arr = []
            rowsKey.map((key, indexkey) => {
              if (key === 'code') {
                (row[field + fieldkeys[0]] + '').replace(/null|undefined|root/ig, '') !== '' && arr.push(row[field + fieldkeys[0]])
              } else {
                key = isHump ? key.replace(/\b(\w)(\w*)/g, function ($0, $1, $2) { return $1.toUpperCase() + $2 }) : (field.endsWith('_') ? key : ('_' + key));
                (row[field + key] + '').replace(/null|undefined/ig, '') !== '' && arr.push(row[field + key])
              }
            })
            return arr.join('-')
          } else {
            let idNameCodeMap = {
              idArr: (typeof (row[column.property + fieldkeys[2]]) === 'string' && (row[column.property + fieldkeys[2]]) !== '') ? row[column.property + fieldkeys[2]].split(',') : (Array.isArray(row[column.property + fieldkeys[2]]) ? row[column.property + fieldkeys[2]] : []),
              codeArr: (typeof (row[column.property + fieldkeys[0]]) === 'string' && (row[column.property + fieldkeys[0]]) !== '') ? row[column.property + fieldkeys[0]].split(',') : (Array.isArray(row[column.property + fieldkeys[0]]) ? row[column.property + fieldkeys[0]] : []),
              nameArr: (typeof (row[column.property + fieldkeys[1]]) === 'string' && (row[column.property + fieldkeys[1]]) !== '') ? row[column.property + fieldkeys[1]].split(',') : (Array.isArray(row[column.property + fieldkeys[1]]) ? row[column.property + fieldkeys[1]] : [])
            }
            let valIn = (idNameCodeMap.nameArr.length || idNameCodeMap.codeArr.length) ? idNameCodeMap.codeArr.map((item, index) => {
              return [idNameCodeMap.codeArr[index], idNameCodeMap.nameArr[index], idNameCodeMap.idArr[index]].map((item, index) => {
                return (item + '').replace(/null|undefined/ig, '')
              }).join('##').replace('####', '')
            }).join(',') : ''
            return valIn === '' ? '' : idNameCodeMap.codeArr.map((item, index) => {
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

      case '$vxeInput':
        return (val + '').replace(/null|NaN|undefined/ig, '')
      case '$vxeSelect':
        props.multiple = props.multiple === undefined ? false : props.multiple
        if (props.multiple) {
          if (props.optgroup) {
            options.forEach((itemP, indexP) => {
              itemP.children.forEach((item, index) => {
                if ((val + '').split(',').indexOf(item.value + '') >= 0) {
                  valueArr.push(item.label)
                }
              })
            })
          } else {
            options.forEach((item, index) => {
              if ((val + '').split(',').indexOf(item.value + '') >= 0) {
                valueArr.push(item.label)
              }
            })
          }
        } else {
          if (props.optgroup) {
            options.forEach((itemP, indexP) => {
              itemP.children.forEach((item, index) => {
                if ((val + '') === item.value + '') {
                  valueArr.push(item.label)
                }
              })
            })
          } else {
            options.forEach((item, index) => {
              if ((val + '') === item.value + '') {
                valueArr.push(item.label)
              }
            })
          }
        }
        return valueArr.join(',')
      case '$vxeCalculate':
        if (val) {
          val = util.transToNumber(val, props.digits || 2)
          return val * 1
          // return util.transToNumberLocalString(val, props.digits || 2)
        } else {
          return 0
        }
      case '$vxeMoney':
        if (val) {
          val = util.transToNumber(val, props.digits || 2)
          return val * 1
          // return util.transToNumberLocalString(val, props.digits || 2)
        } else {
          return 0.00
        }
      case '$EditDownConditions':
        return val
      case '$vxeDays':
        let quiteDay = val % 1
        quiteDay = quiteDay <= 0.25 ? 0 : (quiteDay >= 0.75 ? 1 : 0.5)
        val = Math.floor(val / 1) + quiteDay
        return val
      case '$vxeTime':
        props.format = props.format || 'YYYY-MM-DD hh:mm:ss'
        let dateTime = (val + '').replace(/null|undefined/ig, '')
        if (dateTime) {
          let date = dateTime.length === 8 ? dateTime.substring(0, 4) + '-' + dateTime.substring(4, 6) + '-' + dateTime.substring(6, 8) : (dateTime.length === 14 ? dateTime.substring(0, 4) + '-' + dateTime.substring(4, 6) + '-' + dateTime.substring(6, 8) + ' ' + dateTime.substring(8, 10) + ':' + dateTime.substring(10, 12) + ':' + dateTime.substring(12, 14) : dateTime)
          return isNaN(new Date(dateTime).getTime()) ? new Date(date).format(props.format) : new Date(dateTime).format(props.format)
        } else {
          return ''
        }
      case '$vxeRadio':
        options.forEach((item, index) => {
          if (val === item.value) {
            valStr = item.label
          }
        })
        return valStr
      case '$vxeCheckbox':
        val = Array.isArray(val) ? val : (val + '').split(',')
        options.forEach((item, index) => {
          if (val.indexOf(item.value) >= 0) {
            valueArr.push(item.label)
          }
        })
        return valueArr.join(',')
      case '$vxeEditDownJson':
        val = JSON.stringify(val)
        return val
      case '$vxeSwitch':
        options.forEach((item, index) => {
          if (val === item.value) {
            valStr = item.label
          }
        })
        return valStr
      case '$vxeProgress':
        return val + '%'
      case '$vxeIntervar':
        return String(val).replace('##', '--')
      default:
        return val
    }
  } else {
    return val
  }
}
export function defaultViewValueFormatType(value, row, column) {
  let render = column.editRender || column.cellRender || column.contentRender
  if (render && render.name) {
    const props = render.props || {}
    // TypeString: 49,
    // TypeFormula: 0,
    // TypeNumeric: 1,
    // TypeBool: 0,
    // TypeInline: 0,
    // TypeError: 0,
    // TypeDate: 14,
    // TypeGeneral: 0
    switch (render.name) {
      case '$vxeTree':
        return 'TypeString'
      case '$vxeInput':
        // ['number', 'integer', 'float', 'year', 'month']
        if (['text', 'search', 'password', 'date', 'time', 'datetime', 'week', 'month', 'year'].indexOf(props.type) >= 0) {
          return 'TypeString'
        } else if (['number', 'integer', 'float'].indexOf(props.type) >= 0) {
          return 'TypeNumeric'
        } else {
          return 'TypeString'
        }
      case '$vxeSelect':
        return 'TypeString'
      case '$vxeCalculate':
        return 'TypeString'
      case '$vxeMoney':
        return 'TypeNumeric'
      case '$EditDownConditions':
        return 'TypeString'
      case '$vxeDays':
        return 'TypeNumeric'
      case '$vxeTime':
        return 'TypeString'
      case '$vxeRadio':
        return 'TypeString'
      case '$vxeCheckbox':
        return 'TypeString'
      case '$vxeEditDownJson':
        return 'TypeString'
      case '$vxeProgress':
        return 'TypeString'
      default:
        return 'TypeString'
    }
  } else {
    return 'TypeString'
  }
}

export function defaultViewValueFormatOld(value, row, column) {
  let render = column.editRender || column.cellRender || column.contentRender
  if (render && render.name) {
    let options = render.options || []
    const props = render.props || {}
    switch (render.name) {
      case '$treeinput':
        return props.noCode ? ((row[column.field + 'name'] + '').replace(/(null|undefined)/ig, '')) : (((row[column.field + 'code'] + '').replace(/(null|undefined)/ig, '')) ? (((row[column.field + 'code'] + '').replace(/(null|undefined)/ig, '')) + '-' + ((row[column.field + 'name'] + '').replace(/(null|undefined)/ig, ''))) : ((row[column.field + 'name'] + '').replace(/(null|undefined)/ig, '')))
      case '$treeText':
        return props.noCode ? ((row[column.field + 'name'] + '').replace(/(null|undefined)/ig, '')) : (((row[column.field + 'code'] + '').replace(/(null|undefined)/ig, '')) ? (((row[column.field + 'code'] + '').replace(/(null|undefined)/ig, '')) + '-' + ((row[column.field + 'name'] + '').replace(/(null|undefined)/ig, ''))) : ((row[column.field + 'name'] + '').replace(/(null|undefined)/ig, '')))
      case '$vxeMoney':
        value = Number(isNaN(parseFloat(value)) ? 0 : parseFloat(value).toFixed(2)).toLocaleString()
        value = value.split('.').length === 1 ? value + '.00' : (value.split('.')[1].length === 1 ? value + '0' : value)
        return value
      case '$moneyRender':
        value = Number(isNaN(parseFloat(value)) ? 0 : parseFloat(value).toFixed(2)).toLocaleString()
        value = value.split('.').length === 1 ? value + '.00' : (value.split('.')[1].length === 1 ? value + '0' : value)
        return value
      case '$vxeCalculate':
        value = Number(isNaN(parseFloat(value)) ? 0 : parseFloat(value).toFixed(2)).toLocaleString()
        value = value.split('.').length === 1 ? value + '.00' : (value.split('.')[1].length === 1 ? value + '0' : value)
        return value
      case '$calculateRender':
        value = Number(isNaN(parseFloat(value)) ? 0 : parseFloat(value).toFixed(2)).toLocaleString()
        value = value.split('.').length === 1 ? value + '.00' : (value.split('.')[1].length === 1 ? value + '0' : value)
        return value
      case '$vxeDays':
        return value
      case '$vxeIntervar':
        return value.replace('##', '-')
      case '$vxeCheckbox':
        let vxeCheckboxValue = []
        options.forEach((item, index) => {
          if (row[column.field].indexOf(item.value) >= 0) {
            vxeCheckboxValue.push(item.label)
          }
        })
        return vxeCheckboxValue.join(',')
      case '$vxeRadio':
        options.forEach((item, index) => {
          if (row[column.field] === item.value) {
            value = item.label
          }
        })
        return value
      case '$select':
        if (render.props && render.props.multiple) {
          let selectValue = []
          options.forEach((item, index) => {
            if (row[column.field].indexOf(item.value) >= 0) {
              selectValue.push(item.label)
            }
          })
          return selectValue.join(',')
        } else {
          options.forEach((item, index) => {
            if (row[column.field] === item.value) {
              value = item.label
            }
          })
          return value
        }
      case '$vxeSelect':
        if (render.props && render.props.multiple) {
          let selectValue = []
          options.forEach((item, index) => {
            if (row[column.field].indexOf(item.value) >= 0) {
              selectValue.push(item.label)
            }
          })
          return selectValue.join(',')
        } else {
          options.forEach((item, index) => {
            if (row[column.field] === item.value) {
              value = item.label
            }
          })
          return value
        }
      default:
        return value
    }
  } else {
    return value
  }
}
export function getCellValueAlign(column) {
  let render = column.editRender || column.cellRender
  switch (column.type) {
    case 'money':
      return 'right'
    case 'seqIndex':
      return 'center'
    default:
      if (render && render.name) {
        switch (render.name) {
          case '$vxeMoney':
            return 'right'
          case '$vxeCalculate':
            return 'right'
            // case '$moneyRender':
            //   return 'right'
            // case '$calculateRender':
            //   return 'right'
          case '$vxeDays':
            return 'right'
          case '$vxeCheckbox':
            return 'left'
          default:
            return column.align || 'left'
        }
      } else {
        return column.align || 'left'
      }
  }
}

export function getCellViewTitle(column, unit = '元') {
  let render = column.editRender || column.cellRender
  switch (column.type) {
    case 'money':
      return column.title + `(${unit})`
    case 'seqIndex':
      return '序号'
    default:
      if (render && render.name) {
        switch (render.name) {
          case '$vxeMoney':
            return column.title + `(${unit})`
          case '$vxeCalculate':
            return column.title + `(${unit})`
            // case '$moneyRender':
            //   return column.title + '(元)'
            // case '$calculateRender':
            //   return column.title + '(元)'
          case '$vxeDays':
            return column.title + '(天)'
          default:
            return column.title
        }
      } else {
        return column.title
      }
  }
}
