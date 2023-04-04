/*
 * @Author: 轻语
 * @Date: 2021-11-10 11:30:14
 * @LastEditors: 轻语
 * @LastEditTime: 2022-03-07 16:20:19
 * @Description:
 */
import { pagerConfig } from '../config/tableDefaultConfig'
export default {
  props: {
    pagerConfig: { // 分页配置
      type: [Object, Boolean],
      default () {
        return {}
      }
    }
  },
  data() {
    return {
      pagerConfigIn: { // 分页配置
        total: 0,
        currentPage: 1,
        pageSize: 20,
        ...pagerConfig
      },
      pagerConfigInCp: {
        total: 0,
        currentPage: 1,
        pageSize: 20,
        ...pagerConfig
      },
      formSearchData: {
        filterValue: '',
        year: ''
      } // 表格搜索参数集合
    }
  },
  watch: {
    pagerConfig: { // 分页配置监听
      handler() {
        this.setPagerConfig()
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    setPagerConfig() {
      // 更新分页配置
      if (this.getBasicDataType(this.pagerConfig) === 'Boolean') {
        this.pagerConfigIn = undefined
      } else {
        this.pagerConfigIn = Object.assign({}, this.pagerConfigIn ? this.pagerConfigIn : this.pagerConfigInCp, this.pagerConfig)
      }
    },
    currentChange(obj) {
      // this.performTableDataCalculate(obj)
      this.$nextTick(() => {
        this.$emit('currentChange', obj, this, this.$refs.xGrid)
        this.$emit('ProxyEvent', 'currentChange', obj, this, this.$refs.xGrid)
      })
    }, // 只对 highlightCurrentRow 有效，当手动选中行并且值发生改变时触发的事件 { row, rowIndex, $rowIndex, column, columnIndex, $columnIndex, $event }
    /**
     * 分页改变事件
     *
     * @param {*} { currentPage, pageSize }
     */
    handlePageChange({ currentPage, pageSize }) {
      this.pagerConfigIn.currentPage = currentPage
      this.pagerConfigIn.pageSize = pageSize
      this.loadData()
    },
    handleRefresh() {
      // 刷新
      this.formSearchSubmit({ data: {} })
    },
    /**
     * 加载数据
     *
     */
    loadData() {
      let self = this
      let searchParams = {
        params: this.formSearchData,
        currentPage: this.pagerConfigIn.currentPage,
        pageSize: this.pagerConfigIn.pageSize
      }
      self.$emit('ajaxData', searchParams, this)
    }
  },
  mounted() {
  }
}
