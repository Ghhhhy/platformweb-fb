/*
 * @Author: 轻语
 * @Date: 2021-10-29 14:54:21
 * @LastEditors: 轻语
 * @LastEditTime: 2022-02-16 14:18:55
 * @Description: 行列拖拽
 */
export default {
  methods: {
    setRowDrop() {
      // 行拖拽排序
      this.$nextTick(() => {
        const xTable = this.$refs.xGrid
        if (!xTable) return
        let Sortable = this.$Sortable
        let XEUtils = this.$XEUtils
        this.sortable = Sortable.create(xTable.$el.querySelector('.body--wrapper>.vxe-table--body tbody'), {
          handle: '.drag-btn',
          onEnd: ({ item, oldIndex }) => {
            const options = { children: 'children' }
            const targetTrElem = item
            const wrapperElem = targetTrElem.parentNode
            const prevTrElem = targetTrElem.previousElementSibling
            const tableTreeData = this.tableDataIn
            const selfRow = xTable.getRowNode(targetTrElem).item
            const selfNode = XEUtils.findTree(tableTreeData, row => row === selfRow, options)
            if (prevTrElem) {
              // 移动到节点
              const prevRow = xTable.getRowNode(prevTrElem).item
              const prevNode = XEUtils.findTree(tableTreeData, row => row === prevRow, options)
              if (XEUtils.findTree(selfRow[options.children], row => prevRow === row, options)) {
                // 错误的移动
                const oldTrElem = wrapperElem.children[oldIndex]
                wrapperElem.insertBefore(targetTrElem, oldTrElem)
                return this.$XModal.message({ message: '不允许自己给自己拖动！', status: 'error' })
              }
              const currRow = selfNode.items.splice(selfNode.index, 1)[0]
              if (xTable.isTreeExpandByRow(prevRow)) {
                // 移动到当前的子节点
                prevRow[options.children].splice(0, 0, currRow)
              } else {
                // 移动到相邻节点
                prevNode.items.splice(prevNode.index + (selfNode.index < prevNode.index ? 0 : 1), 0, currRow)
              }
            } else {
              // 移动到第一行
              const currRow = selfNode.items.splice(selfNode.index, 1)[0]
              tableTreeData.unshift(currRow)
            }
            // 如果变动了树层级，需要刷新数据
            this.tableDataIn = [...tableTreeData]
          }
        })
      })
    },
    setColumnDrop() { // 设置列拖拽
      let self = this
      let Sortable = this.$Sortable
      const $table = this.$refs.xGrid
      this.$sortable = Sortable.create($table.$el.querySelector('.body--wrapper>.vxe-table--header .vxe-header--row'), {
        handle: '.vxe-header--column:not(.col--fixed)',
        onEnd: ({ item, newIndex, oldIndex }) => {
          const { fullColumn, tableColumn } = $table.getTableColumn()
          const targetThElem = item
          const wrapperElem = targetThElem.parentNode
          const newColumn = fullColumn[newIndex]
          if (newColumn.fixed) {
            // 错误的移动
            if (newIndex > oldIndex) {
              wrapperElem.insertBefore(targetThElem, wrapperElem.children[oldIndex])
            } else {
              wrapperElem.insertBefore(wrapperElem.children[oldIndex], targetThElem)
            }
            return this.$XModal.message({ content: '固定列不允许拖动！', status: 'error' })
          }
          // 转换真实索引
          const oldColumnIndex = $table.getColumnIndex(tableColumn[oldIndex])
          const newColumnIndex = $table.getColumnIndex(tableColumn[newIndex])
          // 移动到目标列
          const currRow = fullColumn.splice(oldColumnIndex, 1)[0]
          fullColumn.splice(newColumnIndex, 0, currRow)
          // $table.refreshColumn()
          $table.loadColumn(fullColumn)
          if (self.tableGlobalConfigIn.dragColumnsConfig.cacheStatus) {
            // resize之后的宽度拿不到，故暂时只缓存字段名
            const storageColumn = self.transTableColumnToSource(fullColumn).filter(k => !!k.field).map(k => k && k.field)
            // TODO 哈希表保存数据格式
            this.setCacheColumn({ key: self.tableId, value: storageColumn })
          }
        }
      })
    },
    // 获取传入表头数据
    transTableColumnToSource(cloumn) {
      if (!cloumn) return []
      const newColumn = []
      cloumn.forEach((k, v) => {
        k.own && newColumn.push(k.own)
        if (k && k.children) {
          newColumn[v].children = []
          newColumn[v].children.push(...this.transTableColumnToSource(k.children))
        }
      })
      return newColumn
    },
    setCacheColumn(data) {
      // 超过localStorage 5M的大小限制则删除前5条
      const getDateSize = (obj) => unescape(encodeURIComponent(JSON.stringify(obj))).length / 1024 / 1024
      const [dataSize, storageSize] = [getDateSize(data), getDateSize(localStorage)]
      const STORAGE_MAX_SIZE = 5

      if (dataSize + storageSize >= STORAGE_MAX_SIZE) {
        const cacheArr = Object.keys(localStorage).filter(item => {
          // 是否包含中文 不够严谨 之后优化
          const reg = new RegExp('[\\u4E00-\\u9FFF]+', 'g')
          return reg.test(item)
        })
        cacheArr.slice(0, 5).forEach(k => localStorage.removeItem(k))
      }

      const { key, value } = data
      localStorage.setItem(key, JSON.stringify(value))
    }
  },
  mounted() {
    if ((this.tableGlobalConfigIn.dragColumnsConfig && this.tableGlobalConfigIn.dragColumnsConfig.openDrag) || this.tableGlobalConfigIn.columnDrop) {
      this.setColumnDrop()
    }
    if (this.tableGlobalConfigIn.rowDrop) {
      this.setRowDrop()
    }
  }
}
