/*
 * @Author: 轻语
 * @Date: 2021-11-01 11:07:04
 * @LastEditors: 轻语
 * @LastEditTime: 2021-11-10 17:24:25
 * @Description: 初始化序号配置项
 */
import { rowUuidKeyName } from '../tools/const'

export default {
  props: {
    seqConfig: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      seqConfigIn: {}
    }
  },
  methods: {
    initSeqConfig() { // 初始化序号配置项
      this.seqConfigIn = {
        startIndex: this?.seqConfig?.startIndex || 1, // 设置序号的起始值 number0
        seqMethod: ({ seq, $seq, row }) => {
          if (this.pagerConfigIn && !this.treeConfig) {
            return (this.pagerConfigIn.pageSize > 0 ? this.pagerConfigIn.pageSize : 20) * ((this.pagerConfigIn.currentPage > 0 ? this.pagerConfigIn.currentPage : 1) - 1) + seq
          } else {
            let finalSeq = $seq === '' || $seq === undefined ? seq : $seq + '.' + seq
            if (this.isTreeSeqToFlat) {
              const arr = this.$XEUtils.toTreeArray(this.getTableData().treeExpandData)
              const index = arr.findIndex(item => item[rowUuidKeyName] === row[rowUuidKeyName])
              // 根据第一行是否是合计行判断
              if (arr[0]?.id === '#') {
                finalSeq = row.id === '#' ? '#' : index
              } else {
                finalSeq = index + 1
              }
            }

            // return $seq === '' || $seq === undefined ? seq : $seq + '.' + seq
            return finalSeq
          }
        }
      }
    }
  },
  mounted() {
    this.initSeqConfig()
  }
}
