/*
 * @Author: 轻语
 * @Date: 2021-11-16 15:40:30
 * @LastEditors: Comer
 * @LastEditTime: 2022-06-20 14:38:36
 * @Description:
 */
export default {
  props: {
  },
  data() {
    return {
      sortConfigIn: { // 排序配置
        orders: 'desc',
        sortMethod: ({ $table, data, column, property, order }) => {
          $table.clearCheckboxRow()
          let sortedData = $table.$parent.$parent.arrSort({ $table, data, column, property, order })
          this.$emit('onTableSorted', { $table, data, column, property, order, sortedData })
          return sortedData
        }
      }
    }
  },
  methods: {
    arrSortGlobal({ $table, data, column, property, order, rTypeSuffix }) {
      // 通用 排序
      data.sort(function (a, b) {
        if (order === 'asc') {
          if (isNaN(Number(a[property]))) {
            return (String(a[property])).localeCompare(String(b[property]))
          }
          return a[property] - b[property]
        } else {
          if (isNaN(Number(a[property]))) {
            return (String(b[property])).localeCompare(String(a[property]))
          }
          return b[property] - a[property]
        }
      })
      return data
    },
    muchFieldArrSort(arr, keys) {
      // 多字段排序s
      /** arr：原始数组。 keys:要排序的多个字段,必须为数组 */
      return arr.sort(compare)
      function compare(a, b, c = keys[0], i = 0) { // 按合并类型递归排序
        // var c = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : groupfieldarr[0];
        // var i = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
        if (a[c] === b[c]) { // 等于的话进行判断是否还有后续字段需要排序，没有则返回0；有则递归进行后续字段排序处理。
          if (i === (keys.length - 1)) { // 没有后续字段
            i = 0
            return 0
          }
          i += 1
          return compare(a, b, keys[i], i) // 递归排序后续字段
        } else if (a[c] > b[c]) { // 大于返回1
          return 1
        } else { // 小于返回-1
          return -1
        }
      }
    },
    arrSortString({ $table, data, column, property, order }) {
      // 字符 排序
      data.sort(function(a, b) {
        if (order === 'asc') {
          return (String(a[property])).localeCompare(String(b[property]))
        } else {
          return (String(b[property])).localeCompare(String(a[property]))
        }
      })
      return data
    },
    arrSortNumber({ $table, data, column, property, order }) {
      // 数字 排序
      data.sort(function(a, b) {
        if (order === 'asc') {
          return a[property] - b[property]
        } else {
          return b[property] - a[property]
        }
      })
      return data
    },
    arrSortStringSuffix({ $table, data, column, property, order, rTypeSuffix }) {
      // 通用 排序 new
      data.sort(function(a, b) {
        if (order === 'asc') {
          return (String(a[property])).localeCompare(String(b[property]))
        } else {
          return (String(b[property])).localeCompare(String(a[property]))
        }
      })
      return data
    },
    arrSortNumberSuffix({ $table, data, column, property, order, rTypeSuffix }) {
      // 兼容树形表格 => 递归排序后代节点
      function sortInner(data) {
        // <---原有逻辑开始
        // 通用 排序 new
        data.sort(function (a, b) {
          if (order === 'asc') {
            return parseFloat(a[property]) - parseFloat(b[property])
          } else {
            return parseFloat(b[property]) - parseFloat(a[property])
          }
        })
        // 原有逻辑结束--->
        $table.treeConfig && data.forEach(item => {
          if (item?.children?.length) {
            sortInner(item.children)
          }
        })
      }
      sortInner(data)
      return data
    },
    arrSort({ $table, data, column, property, order }) {
      // 排序
      let self = this
      const sortTypeMap = {
        // number类型排序
        $vxeMoney: 'arrSortNumberSuffix',
        $vxeDays: 'arrSortNumberSuffix',
        $vxeCalculate: 'arrSortNumberSuffix',
        // 字符类型排序
        $vxeTree: 'arrSortStringSuffix',
        $vxeInput: 'arrSortStringSuffix',
        $vxeSelect: 'arrSortStringSuffix',
        $vxeEditDownTextarea: 'arrSortStringSuffix',
        $vxeTime: 'arrSortStringSuffix',
        $vxeRadio: 'arrSortStringSuffix',
        $vxeCheckbox: 'arrSortStringSuffix',
        $$vxeEditDownJson: 'arrSortStringSuffix',
        $vxeEditDownConditions: 'arrSortStringSuffix',
        $vxeInterlet: 'arrSortStringSuffix'
      }
      let render = (column.own && (column.own.editRender || column.own.cellRender || column.own.contentRender))
      if (render && render.name && sortTypeMap[render.name]) {
        return self[sortTypeMap[render.name]]({ $table, data, column, property, order, rTypeSuffix: '__viewSort' })
      } else {
        data.sort(function(a, b) {
          if (order === 'asc') {
            if (isNaN(Number(a[property]))) {
              return (a[property].toString()).localeCompare(b[property].toString())
            }
            // console.log(isNaN(Number(a[property])), 11, a[property].length, 11)
            if (!isNaN(Number(a[property])) && a[property].length > 16) {
              if (
                Number(a[property].substring(0, 16)) ===
                Number(b[property].substring(0, 16))
              ) {
                return (
                  a[property].substring(16) - b[property].substring(16)
                )
              } else {
                return a[property].substring(0, 16) - b[property].substring(0, 16)
              }
            }
            // 判断是不是这种格式 code-name
            if ((/[0-9]+-[\u4e00-\u9fa5]+/).test(a[property])) {
              return a[property].split('-')[0] - b[property].split('-')[0]
            }
            return a[property] - b[property]
          } else {
            if (isNaN(Number(a[property]))) {
              return b[property]
                .toString()
                .localeCompare(a[property].toString())
            }
            if (!isNaN(Number(a[property])) && a[property].length > 16) {
              if (
                Number(a[property].substring(0, 16)) ===
                        Number(b[property].substring(0, 16))
              ) {
                return (
                  b[property].substring(16) -
                         a[property].substring(16)
                )
              } else {
                return (
                  b[property].substring(0, 16) - a[property].substring(0, 16)
                )
              }
            }
            // 判断是不是这种格式 code-name
            if ((/[0-9]+-[\u4e00-\u9fa5]+/).test(a[property])) {
              return b[property].split('-')[0] - a[property].split('-')[0]
            }

            return b[property] - a[property]
          }
        })
      }
      return data
    }
  },
  mounted() {
  }
}
