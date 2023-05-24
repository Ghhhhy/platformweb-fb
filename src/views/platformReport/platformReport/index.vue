<!--
 * @Author: Comer
 * @Mail: xinlai@bosssoft.com.cn
 * @Date: 2021-12-16 10:22:56
 * @LastEditors: 罗景丹 luojingdan@bosssoft.com.cn
 * @LastEditTime: 2023-05-24 17:24:19
 * @Description:
-->
<template>
  <ReportView
    v-if="ifRenderReport"
    ref="reportView"
    class="platfromreport"
    :codes="code"
    :editable="editable"
    :init-params="initParams"
    :init-business-context="initBusinessContext"
    :enable-row-readable-authority="true"
    @export-excel="exportExcel"
    @print-pdf="printPdf"
  />
</template>
<script>
export default {
  name: 'PlatFormReport',
  props: {
    editable: {
      default: true,
      type: Boolean
    },
    reportParams: {
      type: Object,
      default() {
        return {

        }
      }
    },
    isload: {
      default: false,
      type: Boolean
    },
    exportLoading: {
      default: false,
      type: Boolean
    }
  },
  data() {
    return {
      businessContext: {
        token: this.$store.getters.getLoginAuthentication.tokenid
      },
      ifRenderReport: true,
      code: '',
      paramsObj: ''
    }
  },
  computed: {
  },
  methods: {
    /**
     * @description: initParams方法进行报表内容替换和搜索条件初始值设置
     * 例如设计端报表设置了占位符 #{city},等待应用端渲染完成后excel内容含有#{city}的占位符 将替换成'福建省'，
     * 如果搜索条件的关键字设置成city ，搜索条件的默认值会变成'福建省'
     * @param {*} params
     * @return {*}
     */
    batchExportExcel(excelParams) {
      this.$refs.reportView.batchExportExcel(excelParams) // 选中报表批量导出成Excel
    },
    batchExportPDF(excelParams) {
      this.$refs.reportView.batchExportPDF(excelParams) // 选中报表批量导出成PDF
    },
    exportCurrentExcel() {
      this.$refs.reportView.exportExcel() // 当前报表导出成Excel
    },
    exportCurrentPDF() {
      this.$refs.reportView.exportPDF() // 当前报表导出成PDF
    },
    print() {
      this.$refs.reportView.print() // 打印当前报表
    },
    batchPrint(draftList) {
      this.$refs.reportView.batchPrint(draftList) // 打印当前报表
    },
    submit() {
      console.log(82, this.$refs.reportView.getExcelData())
      return this.$refs.reportView.getSubmitFillData() // 提交前调用报表插件的
    },
    getExcelData() {
      return this.$refs.reportView.getExcelData()
    },
    encodeExcelPassword(password) {
      return this.$refs.reportView.excelPasswordEncode(password)
    },
    initParams(params) {
      return new Promise(resolve => {
        let paramsTemp = { ...this.paramsObj }
        console.log('当前报表参数为：', paramsTemp)
        Object.keys(params).map(key => {
          if (Object.hasOwnProperty.call(this.paramsObj, key)) {
            paramsTemp[key] = this.paramsObj[key]
          }
        })
        resolve(paramsTemp)
      })
    },
    searchData() {
      this.$refs.report_view.searchData(this.paramsObj) // 查询当前报表数据
    },
    /**
     * @description: 报表参数变了，刷新报表数据
     * @param {*}
     * @return {*}
     */
    refreshReport() {
      const { code, paramsObj } = this.reportParams
      this.code = code
      this.paramsObj = paramsObj
      // this.searchData()
    },
    parentCallSearch() {
      this.refreshReport()
      this.ifRenderReport = false
      this.$nextTick(() => {
        this.ifRenderReport = true
      })
    },
    /**
      * 若无权限控制，则插件中不需要绑定该方法
      * 设置业务上下文信息businessContext
      * 上下文信息会在数据获取时传递给应用后端进行权限控制 **/
    initBusinessContext() {
      return new Promise(resolve => {
        resolve(this.businessContext)
      })
    },
    getInstance() {
      let self = this
      var Xsheet = window.bossJS.Xsheet
      return Xsheet.getInstance({
        config: {
          appId: self.$store.state.loginAuthentication.appguid || 'gov-aims'
        }
      })
    },
    printPdf(options) {
      let instance = this.getInstance()
      let exportPages = instance.printingSheetRequest(options)
      let _this = this
      exportPages
        .done(function (data) {
          _this.$refs.reportview.batchPrintDone()
          console.log('print pdf success', data)
        })
        .fail(function (obj) {
          _this.$refs.reportview.batchPrintFail()
          console.log('print pdf error', obj)
        })
    },
    exportExcel(options) {
      let instance = this.getInstance()
      let exportPages = instance.printingSheetRequest(options)
      let _this = this
      exportPages
        .done(function (data) {
          _this.$refs.reportView.exportExcelDone()
          console.log('img print success', data)
        })
        .fail(function (obj) {
          _this.$refs.reportView.exportExcelFail()
          console.log('export excel error', obj)
        })
    },
    getreportParams() {
      let paramsObj = {}
      const { code, city } = this.$store.getters.getMenuParams5
      // eslint-disable-next-line no-unused-vars
      let param = this.$store.getters.getMenuParams5.paramsObj
      if (param) {
        param = param.substr(1) // 删除第一个字符
        param = param.substr(0, param.length - 1) // 删除最后一字符
        let arr = param.split(',')
        arr.map((item, index) => {
          if (!item.split(':')[0]) {
            return
          }
          paramsObj[item.split(':')[0]] = item.split(':')[1]
        })
      }
      paramsObj['fiscal_year'] = this.$store.state.userInfo.year
      return {
        code,
        city,
        paramsObj
      }
    }
  },
  created() {
    // console.log(this.reportParams.code, 89)
    // if (this.reportParams.code) {
    //   this.refreshReport()
    // }
  },
  watch: {
    reportParams: {
      // 查询参数
      handler(newVal, oldVal) {
        console.log(!newVal.code, 50144)
        if (!newVal.code) {
          this.ifRenderReport = false
          return false
        }
        // if (newVal && oldVal && JSON.stringfy(newVal) === JSON.stringfy(oldVal)) {
        //   this.ifRenderReport = false
        //   return false
        // }{}
        if (this.isload) {
          this.refreshReport()
          // this.ifRenderReport = false
          this.$nextTick(() => {
            this.ifRenderReport = true
          })
        }
      },
      deep: true,
      immediate: true
    },
    editable: {
      handler(newVal, oldVal) {
        this.parentCallSearch()
      },
      deep: true,
      immediate: true
    }
  },
  mounted() {
    window.bossJS.init && window.bossJS.init()
  }
}
</script>
<style scoped>
.platfromreport /deep/ input {
  vertical-align: inherit;
}

.platfromreport /deep/ .el-icon-arrow-down:before {
  color: #606266
}
</style>
