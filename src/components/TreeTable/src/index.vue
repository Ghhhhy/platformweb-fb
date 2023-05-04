
<template>
  <div class="bs-tree-table-wrap">
    <BsTable
      id="bsTreeTable"
      ref="bsTreeTable"
      v-bind="$attrs"
      :loading="tableLoading"
      :table-config="tableConfigs"
      :tree-config="false"
      :table-columns-config="tableColumnsConfigMiddleWare"
      :table-data="tableDataMiddleWare"
      :is-tree-table="true"
      :high-config="highConfig"
      :import-config="importConfig"
      :checkbox-config="checkboxConfig"
      :edit-config="{ activeMethod: tableActiveMethod }"
      v-on="$listeners"
      @checkboxChange="checkboxChange"
      @checkboxAll="checkboxAll"
      @editClosed="editClosed"
    >
      <template
        v-for="slotName in scopedSlotsMapKeys"
        :slot="slotName"
      >
        <slot :name="slotName"></slot>
      </template>
      <!--<div slot="toolbarSlots">-->
      <!--  <slot name="toolbarSlots"></slot>-->
      <!--</div>-->
      <!--<div slot="toolbar-custom-slot">-->
      <!--  <slot name="toolbar-custom-slot"></slot>-->
      <!--</div>-->
    </BsTable>
  </div>
</template>

<script>
import BsTable from '../../Table/Table'
export default {
  name: 'BsTreeTable',
  components: { BsTable },
  props: {
    interval: {
      type: Number,
      default: 300
    },
    isEditor: {
      type: Boolean,
      default: false
    },
    showLevel: {
      type: [String, Number],
      default: '0'
    },
    tableColumnsConfig: {
      type: Array,
      default: () => []
    },
    tableConfig: {
      type: Object,
      default: () => { }
    },
    tableData: {
      type: Array,
      default: () => []
    },
    loading: {
      type: Boolean,
      default: false
    },
    globalConfig: {
      type: Object,
      default: () => ({ // 全局配置
        checkType: 'checkbox', // hasCheckbox
        seq: false, // 序号列
        cellClickCheck: false
      })
    },
    importConfig: {
      type: Object,
      default: () => ({})
    },
    highConfig: {
      type: Object,
      default: () => ({})
    },
    checkboxConfig: {
      type: Object,
      default: () => ({ checkField: 'checked' })
    }
  },
  watch: {
    loading: {
      handler(newVal) {
        this.tableLoading = newVal
      },
      immediate: true
    },
    tableData: {
      handler(newVal) {
        if (!newVal?.length) {
          this.tableDataMiddleWare = []
          return
        }
        this.initTableData(newVal)
      },
      deep: true,
      immediate: true
    }
  },
  computed: {
    scopedSlotsMapKeys() {
      return Object.keys(this.$scopedSlots)
    },
    tableColumnsConfigMiddleWare() {
      return [{
        title: '序号',
        type: 'seq',
        width: 60,
        field: '_index',
        fixed: 'left',
        cellRender: { name: 'seqRender' }
      }, ...this.tableColumnsConfig.map(k => {
        if (k.treeNode) {
          const obj = {
            name: 'bsTreeNodeRender'
          }
          k.cellRender = obj
        } else if (k.levelLine) {
          const obj = {
            name: 'bsLevelLineRender'
          }
          k.cellRender = obj
        }
        if (!this.isEditor) {
          const render = k.cellRender || k.editRender
          k.cellRender = render
        }
        return k
      })]
    }
  },
  data() {
    return {
      backUpData: [],
      tableDataMiddleWare: [],
      tableLoading: false,
      tableConfigs: {
        renderers: {
          'bsTreeNodeRender': { // 自定义render函数名，因为全局要唯一性，建议起名时  模块名+OperateBtns 比如：AccountOperateBtns
            renderDefault(h, cellRender, params, context) {
              let self = context.$grid.$parent
              let { row, column, rowIndex } = params
              const { property } = column
              // 获取自定义的展开、收起、叶子节点icon
              let { iconClose, iconOpen } = self.$parent.$attrs?.['tree-config'] || {}
              const closeIcon = iconOpen
                ? <span><i class={iconOpen}></i><i class="el-icon-folder-opened" style="margin: 0 10px;"></i></span>
                : '➖'
              const openIcon = iconClose
                ? <span><i class={iconClose}></i><i class="el-icon-folder" style="margin: 0 10px;"></i></span>
                : '➕'
              const leafNodeIcon = <i class="el-icon-document" style="margin: 0 10px;"></i>
              return [
                <div
                  class="optionRow fn-inline"
                  style={{ textIndent: `${row.level * 2}em` }}
                  onClick={() => self.onOptionRowClick({ row, column, optionType: 'formAdd', $this: self, rowIndex })}
                >
                  {!row?.children?.length ? leafNodeIcon : row.hasExpend ? closeIcon : openIcon} {row[property]}
                </div>
              ]
            }
          },
          'bsLevelLineRender': { // 自定义render函数名，因为全局要唯一性，建议起名时  模块名+OperateBtns 比如：AccountOperateBtns
            renderDefault(h, cellRender, params, context) {
              // let self = context.$grid.$parent
              let { row, column } = params
              const { property } = column
              return [
                <div
                  class="optionRow fn-inline"
                  style={{ paddingLeft: `${row.level * 20}px` }}
                >
                  {row[property]}
                </div>
              ]
            }
          },
          'seqRender': { // 自定义render函数名，因为全局要唯一性，建议起名时  模块名+OperateBtns 比如：AccountOperateBtns
            renderDefault(h, cellRender, params, context) {
              let { row, data } = params
              const { isTreeSeqToFlat } = context.$grid.$parent?.$parent.$attrs?.['tree-config'] || {}
              const flatRowIndex = data.findIndex(item => item === row) + 1
              return [
                <span style="text-align:left;display: inline-block;">{isTreeSeqToFlat ? flatRowIndex : row._index}</span>
              ]
            }
          },
          ...this.tableConfig.renderers
        },
        methods: {
          onOptionRowClick: this.onOptionRowClick
          // ...this.tableConfig.methods
        },
        globalConfig: {
          ...this.globalConfig
        },
        isTree2ListTable: true
      },
      selection: []
    }
  },
  methods: {
    initTableData(tableData) {
      const list = Object.freeze(this.deepCopy(tableData).map(k => ({ ...k, parentId: k.parentId || k.parent_id, checkField: k.checkField || 'checked' })))
      this.backUpData = this.deepCopy(list) // 备份数据
      // 表转树
      const list2tree = (list) => {
        // eslint-disable-next-line
        const info = list.reduce((map, node) => (map[node.id] = node, node.children = [], map), {})
        return list.filter(node => {
          (node.parentId && !(node.parentId === '0' || node.parentId === '')) && info[node.parentId].children.push(node)
          return !(node.parentId && node.parentId !== '')
        })
      }

      // 树遍历添加属性
      const forEachTree = (tree, newTree = []) => {
        tree.map((k, v) => {
          let node = {
            _index: k._index || `${v + 1}`,
            ...k,
            hasExpend: false,
            hasChild: !!k?.children?.length
          }
          if (k?.children?.length) {
            node.children = []
            forEachTree(k.children.map((v, vv) => ({
              ...v,
              trunkIds: `${node.trunkIds || ''}&${node.id}`, // 所有层级id拼接传递至最底级
              _index: `${node._index || ''}.${vv + 1}`,
              ...(v.parentId && { levelOId: node.levelOId || node.id }) // 为所有子节点添加顶级节点id
            })), node.children)
          }
          newTree.push(node)
        })
        return newTree
      }
      // 后端返回的平行数据转成树形，在递归遍历添加对应属性
      const data = forEachTree(list2tree(list))
      //  业务需求：如果可以编辑，则需要冒泡汇总
      this.tableDataMiddleWare = this.isEditor ? this.bubbleCollect(data) : data;
      //  业务需求：初始化根据showLevel展开至固定层级
      (data.length && +this.showLevel > 0) && this.expand2Level(this.showLevel)
    },
    freshData() {
      let { fullData } = this.$refs.bsTreeTable.$refs.xGrid.getTableData()
      fullData.forEach(item => {
        item.children = undefined
      })
      const list2tree = (list) => {
        // eslint-disable-next-line
        const info = list.reduce((map, node) => (map[node.id] = node, node.children = node.children || [], map), {})
        return list.filter(node => {
          (node.parentId && !(node.parentId === '0' || node.parentId === '')) && info[node.parentId].children.push(node)
          return !(node.parentId && node.parentId !== '')
        })
      }
      const tree = list2tree(fullData)
      const forEachTree = (tree, fn, result = []) => {
        tree.forEach(item => {
          item.children && forEachTree(item.children, fn, result)
          fn(item) && result.push(item)
        })
        return result
      }
      const columns = forEachTree(this.tableColumnsConfigMiddleWare, k => k.treeTotal).map(k => k.field)
      forEachTree(tree, k => {
        if (k.hasChild || k?.children?.length) {
          columns.forEach(item => {
            k[item] = k.children.reduce((pre, next) => pre + +next[item] || 0, 0)
          })
        }
      })
      let nowData = this.$refs.bsTreeTable.getTableData().fullData
      nowData.forEach(item => {
        if (item.lastYearExceAmt !== null && item.curYearBgtAmt !== null) {
          item.percent = (Math.abs(+item.curYearBgtAmt) / Math.abs(+item.lastYearExceAmt) * 100)
          item.percent = Object.is(item.percent, NaN) ? '0.00%' : (Number(item.percent).toFixed(2) + '%')
        } else {
          item.percent = '0.00%'
        }
      })
    },
    countPercent(data) {
      // console.log(data)
      data.forEach(item => {
        if (item.lastYearExceAmt !== null && item.curYearBgtAmt !== null) {
          item.percent = (Math.abs(+item.curYearBgtAmt) / Math.abs(+item.lastYearExceAmt) * 100)
          item.percent = Object.is(item.percent, NaN) ? '0.00%' : (Number(item.percent).toFixed(2) + '%')
        } else {
          item.percent = '0.00%'
        }
        if (item.hasChild || item?.children?.length) {
          this.countPercent(item.children)
        }
      })
      // console.log(data)
    },
    // 冒泡汇总：父级数据由子级数据累加而来
    bubbleCollect(data) {
      const forEachTree1 = (tree, fn, result = []) => {
        tree.forEach(item => {
          item.children && forEachTree1(item.children, fn, result)
          fn(item) && result.push(item)
        })
        return result
      }
      // 递归找出需要冒泡汇总的列
      const columns = forEachTree1(this.tableColumnsConfigMiddleWare, k => k.treeTotal).map(k => k.field)
      if (columns?.length) {
        forEachTree1(data, k => {
          let _k = Object.assign({}, k)
          if (_k.hasChild || _k?.children?.length) { // 深度优先冒泡汇总
            columns.forEach(item => {
              _k[item] = _k.children.reduce((pre, next) => pre + +next[item] || 0, 0)
            })
          }
        })
      }
      this.countPercent(data)
      return data
    },
    // 展开至指定层级
    expand2Level(level = 0) {
      const interval = this.interval || 1000
      this.$nextTick(() => {
        // 设计思路：递归调用setAllTreeExpand，逐次展开，以期缓解数据量过大时的渲染压力
        const fn = (arr) => {
          if (!arr.length) return
          this.setAllTreeExpand(false, interval).then(() => {
            arr.pop()
            fn(arr)
          })
        }
        // length - 1 - 1 只需要递归showLevel-1次即可
        const arr = Array.from(({ length: +level - 1 })).map((v, k) => k)
        fn(arr)
      })
    },
    // 全选事件
    checkboxAll({ records, checked, $event }) {
      const { fullData } = this.$refs.bsTreeTable.$refs.xGrid.getTableData()
      const treeForEach = (tree, fn) => {
        tree.forEach(item => {
          fn(item)
          item.children && treeForEach(item.children, fn)
        })
      }
      treeForEach(fullData, node => {
        node.checked = checked
      })
      this.$emit('checkboxAllTree', { records, checked })
    },
    checkboxChange({ checked, row }) {
      const { fullData } = this.$refs.bsTreeTable.$refs.xGrid.getTableData()
      setTimeout(() => {
        // 子级全选则父级也要选中
        if (+row.level !== 0) {
          const fn = (crtRow) => {
            if (!crtRow.parentId) return
            const parent = fullData.filter(i => i.id === crtRow.parentId)[0]
            const childIds = parent?.children?.map(i => i.id) || []
            const recordIds = this.$refs.bsTreeTable.$refs.xGrid.getCheckboxRecords().map(i => i.id)
            const includes = (arr1, arr2) => arr2.every(val => arr1.includes(val)) // arr1是否包含arr2
            this.$refs.bsTreeTable.$refs.xGrid.setCheckboxRow(parent, includes(recordIds, childIds))
            fn(parent)
          }
          fn(row)
        }

        // 点击父级则子级全部选中
        const arr = []
        const forEachTree = (tree, result = []) => {
          tree.forEach(item => {
            result.push(item.id)
            item.checked = checked
            item.children && forEachTree(item.children, result)
          })
          return result
        }

        const ids = forEachTree([row])
        fullData.forEach(k => {
          if (ids.includes(k.id)) {
            arr.push(k)
            this.$refs.bsTreeTable.$refs.xGrid.setCheckboxRow(k, checked)
          }
        })

        if (row?.children && row?.children.length > 0) {
          // 展开当前级至最底级
          let idss = []
          const treeForEach = (tree, fn) => {
            tree.forEach(item => {
              fn(item)
              item.children && treeForEach(item.children, fn)
            })
          }
          treeForEach([row], k => {
            fullData.slice().reverse().forEach((item, index, fullData1) => {
              if (item.id === k.id && !item.hasExpend) {
                item.checked = checked
                const data = item.children
                data && fullData.splice(fullData1.length - index, 0, ...data.map(k => ({ ...k, hasExpend: false })))
                const ids = data?.map(i => i.id) || []
                idss.push(data?.map(i => i.id))
                this.$refs.bsTreeTable.$refs.xGrid.setCheckboxRow(fullData.filter(k => ids.includes(k.id)), true)
                item.hasExpend = true
              }
            })
          })
          if (idss && idss.length > 0) this.$refs.bsTreeTable.$refs.xGrid.setCheckboxRow(fullData.filter(k => idss.includes(k.id)), true)
          const xTable = this.$refs.bsTreeTable.$refs.xGrid
          xTable.loadData(fullData)
        }
        let records = this.$refs.bsTreeTable.$refs.xGrid.getCheckboxRecords()
        this.$emit('checkboxChangeTree', { records, checked, row })
      }, 300)
    },
    editClosed({ row, column }) {
      if (this.isEditor) {
        if (column?.own?.treeTotal && row.trunkIds) {
          const { property } = column
          const { fullData } = this.$refs.bsTreeTable.$refs.xGrid.getTableData()
          const trunkIds = row?.['trunkIds']?.split('&').filter(Boolean)
          const datas = fullData.filter(k => {
            return (k?.trunkIds === row?.trunkIds) || trunkIds.includes(k.id)
          })
          this.treeTotal([property], datas)
        }
      }
      this.$emit('editClosedTree', { row, column })
    },
    /**
     * 冒泡汇总：由最底级向上汇总
     * @param {*} filedArr 字段列表
     * 默认合计列配置的项
     */
    treeTotal(fieldArr = [], selection = []) {
      if (!this.isEditor) return // 非编辑类型无需汇总
      const forEachTree = (tree, fn, result = []) => {
        tree.forEach(item => {
          item.children && forEachTree(item.children, fn, result)
          fn(item) && result.push(item)
        })
        return result
      }
      const columns = fieldArr?.length ? fieldArr
        : forEachTree(this.tableColumnsConfigMiddleWare, k => k.treeTotal).map(k => k.field)

      if (!columns.length) return

      let { fullData } = this.$refs.bsTreeTable.$refs.xGrid.getTableData()
      if (selection.length) {
        //  存在selection不为一个完整树的情况，故而需要在fullData中根据level0Id获取完整树数据
        const level0Ids = new Set()
        selection.forEach(k => level0Ids.add(k.levelOId))
        fullData = fullData.filter(k => {
          return Array.from(level0Ids).includes(k.levelOId || k.id)
        })
      }
      if (this.isEditor) {
        // console.log(fullData)
        fullData.forEach(item => {
          item.children = undefined
          // if (item.lastYearExceAmt !== null && item.curYearBgtAmt !== null) {
          //   item.percent = (+item.curYearBgtAmt / +item.lastYearExceAmt * 100)
          //   item.percent = Object.is(item.percent, NaN) ? '0.00%' : (Number(item.percent).toFixed(2) + '%')
          // } else {
          //   item.percent = '0.00%'
          // }
        })
        // console.log(fullData)
      }
      const list2tree = (list) => {
        // eslint-disable-next-line
        const info = list.reduce((map, node) => (map[node.id] = node, node.children = node.children || [], map), {})

        return list.filter(node => {
          (node.parentId && !(node.parentId === '0' || node.parentId === '')) && info[node.parentId].children.push(node)
          return !(node.parentId && node.parentId !== '')
        })
      }
      const tree = list2tree(fullData)
      forEachTree(tree, k => {
        if (k.hasChild || k?.children?.length) {
          columns.forEach(item => {
            k[item] = k.children.reduce((pre, next) => pre + +next[item] || 0, 0)
          })
        }
      })
    },
    clearTreeExpand() {
      let { fullData } = this.$refs.bsTreeTable.$refs.xGrid.getTableData()
      const forEachTree = (tree, fn) => {
        tree.forEach(item => {
          fn(item)
          item.children && item.children.length > 0 && forEachTree(item.children, fn)
        })
      }
      const idss = []
      forEachTree(fullData, node => {
        node.checked = false
        // this.$refs.bsTreeTable.$refs.xGrid.setCheckboxRow(node, false)
        idss.push(node)
      })
      if (idss && idss.length > 0) this.$refs.bsTreeTable.$refs.xGrid.setCheckboxRow(idss, false)
      const xTable = this.$refs.bsTreeTable.$refs.xGrid
      if (xTable) {
        xTable.loadData(fullData.filter(k => +k.level === 0).map(k => ({ ...k, hasExpend: false })))
      }
      return this.$nextTick()
    },
    /**
     * 逐级展开
     * @expandToBottom boolean = false 是否直接展开至底级
     * @timeout
     */
    setAllTreeExpand(expandToBottom = false, timeout = 4) {
      this.tableLoading = true
      return new Promise(resolve => {
        setTimeout(() => {
          const { fullData } = this.$refs.bsTreeTable.$refs.xGrid.getTableData()
          if (expandToBottom) {
            // 展开当前级至最底级
            const treeForEach = (tree, fn) => {
              tree.forEach(item => {
                fn(item)
                item.children && treeForEach(item.children, fn)
              })
            }
            const data = this.$refs.bsTreeTable.$refs.xGrid.getTableData().fullData.filter(k => +k.level === 0)
            treeForEach(data, k => {
              fullData.slice().reverse().forEach((item, index, fullData1) => {
                if (item.id === k.id && !item.hasExpend) {
                  const data = item.children
                  data && fullData.splice(fullData1.length - index, 0, ...data.map(k => ({ ...k, hasExpend: false })))
                  item.hasExpend = true
                }
              })
            })
          } else {
            fullData.slice().reverse().forEach((item, index, fullData1) => {
              if (!item.hasExpend) {
                const data = item.children
                data && fullData.splice(fullData1.length - index, 0, ...data.map(k => ({ ...k, hasExpend: false })))

                if (item.checked) {
                  const ids = data?.map(i => i.id) || []
                  this.$refs.bsTreeTable.$refs.xGrid.setCheckboxRow(fullData.filter(k => ids.includes(k.id)), true)
                }
                item.hasExpend = true
              }
            })
          }
          const xTable = this.$refs.bsTreeTable.$refs.xGrid
          xTable.loadData(fullData)
          this.tableLoading = false
          resolve()
        }, timeout)
      })
    },
    onOptionRowClick(params) {
      const { row, rowIndex, optionType } = params

      if (optionType && optionType === 'formAdd') { // 树状结构展开/收起
        this.tableLoading = true
        const { fullData } = this.$refs.bsTreeTable.$refs.xGrid.getTableData()

        if (!row.hasExpend) {
          const data = row.children
          data && fullData.splice(rowIndex + 1, 0, ...data.map(k => ({ ...k, hasExpend: false })))
          if (row.checked) {
            const ids = data?.map(i => i.id) || []
            this.$refs.bsTreeTable.$refs.xGrid.setCheckboxRow(fullData.filter(k => ids.includes(k.id)), true)
          }
        } else {
          fullData.slice().reverse().forEach(function (item, index, fullData1) {
            if (item['trunkIds']?.includes(row.id)) {
              fullData.splice(fullData1.length - 1 - index, 1)
            }
          })
          // 递归设置所有子级checked为false  强耦合折叠与选中的关联，以规避子级未渲染时需要的数据操作，要操作数据 必须让其先渲染
          const forEachTree = (tree) => {
            tree.forEach(item => {
              item.checked = false
              item.children && forEachTree(item.children)
            })
          }
          forEachTree([row])
          this.$refs.bsTreeTable.$refs.xGrid.setCheckboxRow(row, false)
          // 向上查找 如果子级全部取消选中 则父级也要取消
          if (+row.level !== 0) {
            const fn = (crtRow) => {
              if (!crtRow.parentId) return
              const parent = fullData.filter(i => i.id === crtRow.parentId)[0]
              const childIds = parent?.children?.map(i => i.id)
              const recordIds = this.$refs.bsTreeTable.$refs.xGrid.getCheckboxRecords().map(i => i.id)
              const includes = (arr1, arr2) => arr2.every(val => arr1.includes(val)) // arr1是否包含arr2
              this.$refs.bsTreeTable.$refs.xGrid.setCheckboxRow(parent, includes(recordIds, childIds))
              fn(parent)
            }
            fn(row)
          }
        }

        const xTable = this.$refs.bsTreeTable.$refs.xGrid
        if (xTable) {
          xTable.loadData(fullData)
        }
        this.tableLoading = false
        row.hasExpend = !row.hasExpend
      }
    },
    expand2CrtBottom(row, fullData) {
      // 展开当前级至最底级
      const treeForEach = (tree, fn) => {
        tree.forEach(item => {
          fn(item)
          item.children && treeForEach(item.children, fn)
        })
      }
      treeForEach([row], k => {
        fullData.slice().reverse().forEach((item, index, fullData1) => {
          if (item.id === k.id && !item.hasExpend) {
            // item.checked = true
            item.hasExpend = true
            const data = item.children
            data && fullData.splice(fullData1.length - index, 0, ...data.map(k => ({ ...k, hasExpend: false })))

            if (data?.length) {
              const ids = data.map(k => k.id)
              row.checked && this.$refs.bsTreeTable.$refs.xGrid.setCheckboxRow(fullData.filter(v => ids.includes(v.id)), true)
            }
          }
        })
      })
      const xTable = this.$refs.bsTreeTable.$refs.xGrid
      xTable.loadData(fullData)
    },
    tableActiveMethod({ row, column }) {
      // return this.$parent.tableActiveMethodTree({ row, column })
      // 由于 $parent 有时候读不到值
      return this.$attrs['edit-config'].activeMethod({ row, column })
    },
    /**
     * 插入数据
     * @list Array 必填 要插入的数据
     * @row Object 可选 要插入的层级 如果不传则插入顶级
     */
    insertData(list, row = null) {
      const treeForEach = (tree, fn, result = []) => {
        tree.forEach(item => {
          fn(item) && result.push(item.id)
          item.children && treeForEach(item.children, fn, result)
        })
        return result
      }
      const ids = treeForEach(list, k => k.id)
      const { fullData } = this.$refs.bsTreeTable.$refs.xGrid.getTableData()
      if (fullData.findIndex(k => ids.includes(k.id)) > -1) {
        this.$warn('列表已存在需插入的数据，不能重复插入')
        return
      }
      const forEachTree = (tree, newTree = [], insertTop = false, rowData) => {
        tree.map((k, v) => {
          let node = {
            _index: insertTop
              ? (k._index || `${fullData.filter(k => +k.level === 0).length + v + 1}`)
              : `${rowData._index}.${rowData?.children?.length + v + 1}`,
            ...k,
            level: k.level || (+rowData?.level + 1 || 0),
            hasChild: !!k?.children?.length,
            ...(rowData && { parentId: k.parentId || rowData.id }),
            ...(rowData && { trunkIds: k.trunkIds || `${rowData.trunkIds || rowData.id}` })
            // ...(rowData && { trunkIds: k.trunkIds || (`${rowData.trunkIds || rowData.id}&${k.id}`) })
          }
          if (k?.children?.length) {
            node.children = []
            forEachTree(k.children.map((v, vv) => ({
              ...v,
              trunkIds: `${node.trunkIds || ''}&${node.id}`,
              _index: `${node._index || ''}.${vv + 1}`,
              level: +node.level + 1
            })), node.children, insertTop, rowData)
          }
          newTree.push(node)
        })
        return newTree
      }
      if (!row?.id) {
        const data = forEachTree(this.deepCopy(list), [], true)
        fullData.splice(fullData.length, 0, ...data) // 插入到当前节点所有子节点之后
        this.$nextTick(() => this.expand2CrtBottom(data[0], fullData))
      } else {
        fullData.forEach((kk, vv) => {
          if (kk.id === row.id) {
            const data = forEachTree(list, [], false, kk)
            // 插入到当前节点所有子节点之后
            const allChildrenIndex = fullData.filter(k => k.trunkIds?.includes(row.id)).length
            fullData.splice(allChildrenIndex + vv + 1, 0, ...data)
            row.checked && this.$refs.bsTreeTable.$refs.xGrid.setCheckboxRow(fullData.filter(v => data.map(k => k.id).includes(v.id)), true)
            kk.children.push(...data) // 推送到其children中，以期再次展开正常展示
          }
        })
        this.$nextTick(() => this.expand2CrtBottom(row, fullData))
      }
    },
    updateFooter() {
      return this.$refs.bsTreeTable.$refs.xGrid.updateFooter()
    },
    updateBodyTopRows() {
      return this.$refs.bsTreeTable.$refs.xGrid.updateBodyTopRows && this.$refs.bsTreeTable.$refs.xGrid.updateBodyTopRows()
    },
    reloadData(data) {
      const fullData = data || this.$refs.bsTreeTable.$refs.xGrid.getTableData().fullData
      const xTable = this.$refs.bsTreeTable.$refs.xGrid
      xTable.loadData(fullData)
    },
    getTableData() {
      let { fullData } = this.$refs.bsTreeTable.$refs.xGrid.getTableData()
      // eslint-disable-next-line
      const info = fullData.reduce((k, v) => (k[v.id] = v, k), {})

      const tableData = this.backUpData.map(k => {
        return info[k.id] || k
      })
      return {
        fullData: tableData,
        tableData
      }
    },
    deepCopy(obj) {
      let me = this
      if (typeof obj !== 'object' || obj === null) return obj
      let newObj = obj instanceof Array ? [] : {}
      for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
          newObj[key] = typeof obj[key] === 'object' ? me.deepCopy(obj[key]) : obj[key]
        }
      }
      return newObj
    },
    tableOptionFn() {
      // 全局表格组件调用实例
      return this.$refs.bsTreeTable
    },
    gridOptionFn() {
      // 返回xgrid实例
      return this.$refs.bsTreeTable.$refs.xGrid
    }
  },
  mounted() {
    console.log(this.$scopedSlots)
  }
}
</script>

<style lang="scss">
.optionRow {
  cursor: pointer;
}

.bs-tree-table-wrap {
  height: 100%;

  .vxe-tree--btn-wrapper {
    display: none
  }

  .vxe-tree-cell {
    padding-left: 0;
  }
}
</style>
