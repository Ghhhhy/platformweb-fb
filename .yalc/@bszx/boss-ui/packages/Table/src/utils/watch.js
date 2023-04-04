/*
 * @Author: 轻语
 * @Date: 2021-11-09 10:48:36
 * @LastEditors: Comer
 * @LastEditTime: 2022-05-10 17:42:14
 * @Description:
 */
export default {
  highConfig: {
    handler() {
      this.highConfigIn = Object.assign(this.highConfigIn, this.highConfig)
    },
    deep: true,
    immediate: true
  },
  contentTableConfig: {
    handler(newvalue, oldValue) {
    },
    deep: true,
    immediate: true
  },
  '$store.state.isClickTab': {
    handler(val) {
      if (typeof(val) === 'boolean' && val) {
        setTimeout(() => {
          // 每次切换页签的时候将表格数据清空并且总数改为0
          if (this.pagerConfigIn.total !== undefined) {
            this.tableDataIn = []
            this.pagerConfigIn.total = 0
            this.$store.commit('setIsClickTab', false)
          }
        }, 0)
      }
    }
  }
}
