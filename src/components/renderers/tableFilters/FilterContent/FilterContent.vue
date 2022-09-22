
<template>
  <div class="my-filter-content" @keydown.stop>
    <div class="my-fc-search">
      <div class="my-fc-search-top">
        <vxe-input v-model="option.data.sVal" placeholder="搜索" suffix-icon="fa fa-search" @input="searchEvent" />
      </div>
      <div class="my-fc-search-content">
        <template v-if="valList.length">
          <ul class="my-fc-search-list my-fc-search-list-head">
            <li class="my-fc-search-item">
              <vxe-checkbox v-model="isAll" @change="changeAllEvent">全选</vxe-checkbox>
            </li>
          </ul>
          <ul class="my-fc-search-list my-fc-search-list-body">
            <li v-for="(item, sIndex) in valList" :key="sIndex" class="my-fc-search-item">
              <vxe-checkbox v-model="item.checked">{{ item.value }}</vxe-checkbox>
            </li>
          </ul>
        </template>
        <template v-else>
          <div class="my-fc-search-empty">无匹配项</div>
        </template>
      </div>
    </div>
    <div class="my-fc-footer">
      <vxe-button status="primary" @click="confirmFilterEvent">确认</vxe-button>
      <vxe-button @click="resetFilterEvent">重置</vxe-button>
    </div>
  </div>
</template>

<script>
import XEUtils from 'xe-utils'

export default {
  name: 'FilterContent',
  props: {
    params: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data () {
    return {
      size: 'mini',
      isAll: false,
      option: null,
      colValList: [],
      valList: []
    }
  },
  created () {
    this.load()
  },
  methods: {
    formatLabel(format, nodeData, valueKeys) {
      // 格式化显示label
      let regR = new RegExp('({[a-zA-Z0-9_]*})', 'ig')
      let rowsKey = format.match(regR).map((key, keyIndex) => {
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
      let rowsKey = format.match(regR).map((key, keyIndex) => {
        return key.replace(/{|}/gi, '')
      })
      rowsKey.map((key, indexkey) => {
        format = format.replace(new RegExp('{' + key + '}', 'ig'), obj[key] || (otheDataObj && otheDataObj[key]) || '')
      })
      return format
    },
    groupBy(data, key) {
      let itemMap = {}
      let itemkeys = []
      data.forEach((item, index) => {
        if (itemMap[item[key]]) {
          itemMap[item[key]].count = itemMap[item[key]].count + 1
          itemMap[item[key]].list.push(item)
        } else {
          itemMap[item[key]] = {
            count: 1,
            list: [item],
            firstItem: item
          }
          itemkeys.push(item[key])
        }
      })
      return {
        itemMap,
        itemkeys
      }
    },
    load () {
      // filters 可以配置多个，实际只用一个就可以满足需求了
      const { $table, column } = this.params
      const { fullData } = $table.getTableData()
      const option = column.filters[0]
      const { vals } = option.data
      let colValList = []
      let render = column.editRender || column.cellRender
      if (render && render.name === '$vxeTree') {
        let { multiple, format, showField, isHump, cellViewFormat } = (render && render.props && render.props.config) || { multiple: false, format: '{code}-{name}', showField: '', isHump: false }
        let fieldkeys = isHump ? ['Code', 'Name', 'Id'] : (column.property.endsWith('_') ? ['code', 'name', 'id'] : ['_code', '_name', '_id'])
        format = cellViewFormat || format || ('{' + fieldkeys[0] + '}-{' + fieldkeys[1] + '}')
        let { itemMap, itemkeys } = this.groupBy(fullData, column.property + fieldkeys[0])
        let colValListtext = itemkeys.map(val => {
          let row = itemMap[val].firstItem
          let cellValue = ''
          if (showField) {
            if (showField === true && format) {
              cellValue = self.format(format, row)
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
              cellValue = row[column.property + fieldkeys[0]] === '' ? '' : idNameCodeMap.codeArr.map((item, index) => {
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
          return cellValue
        })
        colValList = Array.from(new Set(colValListtext)).map(val => {
          return {
            checked: vals.includes(val),
            value: val
          }
        })
      } else {
        colValList = Object.keys(XEUtils.groupBy(fullData, column.property)).map(val => {
          return {
            checked: vals.includes(val),
            value: val
          }
        })
      }
      this.option = option
      this.colValList = colValList
      this.valList = colValList
    },
    searchEvent () {
      const { option, colValList } = this
      this.valList = option.data.sVal ? colValList.filter(item => item.value.indexOf(option.data.sVal) > -1) : colValList
    },
    changeAllEvent () {
      const { isAll } = this
      this.valList.forEach(item => {
        item.checked = isAll
      })
    },
    confirmFilterEvent (evnt) {
      const { params, option, valList } = this
      const { data } = option
      const { $panel } = params
      data.vals = valList.filter(item => item.checked).map(item => item.value)
      $panel.changeOption(evnt, true, option)
      $panel.confirmFilter()
    },
    resetFilterEvent () {
      const { $panel } = this.params
      $panel.resetFilter()
    }
  }
}
</script>

<style>
.my-filter-content {
  padding: 10px;
  user-select: none;
}
.my-filter-content .my-fc-search .my-fc-search-top {
  position: relative;
  padding: 5px 0;
}
.my-filter-content .my-fc-search .my-fc-search-top > input {
  border: 1px solid #ABABAB;
  padding: 0 20px 0 2px;
  width: 200px;
  height: 22px;
  line-height: 22px;
}
.my-filter-content .my-fc-search .my-fc-search-content {
  padding: 2px 10px;
}
.my-filter-content .my-fc-search-empty {
  text-align: center;
  padding: 20px 0;
}
.my-filter-content .my-fc-search-list {
  margin: 0;
  padding: 0;
  list-style: none;
}
.my-filter-content .my-fc-search-list-body {
  overflow: auto;
  height: 120px;
}
.my-filter-content .my-fc-search-list .my-fc-search-item {
  padding: 2px 0;
  display: block;
}
.my-filter-content .my-fc-footer {
  text-align: right;
  padding-top: 10px;
}
.my-filter-content .my-fc-footer button {
  padding: 0 15px;
  margin-left: 15px;
}
</style>
