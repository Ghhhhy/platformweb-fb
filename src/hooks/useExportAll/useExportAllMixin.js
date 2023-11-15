// import { checkRscode } from '@/utils/checkRscode'
import { postDownloadXlsxInArrayBuffer } from '@/api/http'
export default (propsParams) => {
  return {
    data() {
      return {
        hasRegister: false,
        $instance: '',
        tableColumns: [],
        requestLoading: false,
        defaultConfig: { // 后端约定参数
          beforeRequest: (params = this.defaultConfig, context = this) => {}, // 请求前置钩子
          ref: 'bsTableRef', // 根据实例拿tableColumns 请确保唯一
          fileName: '下载文件',
          params: { // 后端约定参数
            headConfig: [] // 表头列
          },
          ...propsParams
        }
      }
    },
    methods: {
      // 手动注册实例
      register(instance) {
        if (this.$instance === instance || this.hasRegister) return
        this.$instance = instance
        this.hasRegister = true
      },

      // 自动注册实例
      autoRegister() {
        this.$instance = this.$refs[this.defaultConfig.ref]
      },

      // 递归遍历可视列 vxeTableColumnsInfo
      cursionVisibleCollectColumn(treeArray) {
        if (!Array.isArray(treeArray)) return
        return treeArray.filter(item => {
          item.children = this.cursionVisibleCollectColumn(item.children)
          return item.visible !== false
        })
      },

      // 递归遍历 vxeTableColumnsInfo
      cursionCollectColumn(treeArray) {
        if (!Array.isArray(treeArray)) return
        return treeArray.map(item => {
          item.own.children = this.cursionCollectColumn(item.children)
          return item.own
        })
      },

      // 导出方法
      async serverExport() {
        if (!this.$instance) return
        // 去掉函数参数
        let deepCopyData = JSON.parse(JSON.stringify(this.$instance?.getTableColumn().collectColumn))

        // 初始化请求列参数
        this.tableColumns = this.cursionCollectColumn(this.cursionVisibleCollectColumn(deepCopyData))
        this.defaultConfig.params.headConfig = JSON.stringify(this.tableColumns)

        // 请求前置钩子调用
        let customerRequesetParams = await this.defaultConfig.beforeRequest?.(this.defaultConfig, this)
        // 如果有返回值 则重新赋值 但是返回值记得是新的引用 否则会有JSON类型的循环引用错误
        if (customerRequesetParams) this.defaultConfig.params = customerRequesetParams
        // 文件流保存
        this.requestLoading = true
        await postDownloadXlsxInArrayBuffer(BSURL.dfr_zdzjledgerExportData, this.defaultConfig.params, this.defaultConfig.fileName)
        // to do something
        this.requestLoading = false
      }
    },
    mounted() {
      if (this.$instance || this.hasRegister) return
      this.autoRegister()
    }
  }
}
