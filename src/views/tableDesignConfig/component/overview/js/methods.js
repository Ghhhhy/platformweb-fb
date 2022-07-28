import { get } from '@/api/http'

/**
 * 初始化方法
 */
const initMethods = {
  initCreated() {
    this.getTableConfig()
  },
  initMounted() {
  }
}

/**
 * 界面交互逻辑方法
 */
const interfaceMethods = {
  handleClose() {
    this.visible = false
  },
  handleValidate() {
    if (this.type === 'table') {
      this.$refs.bsTableRef.validate().then(() => {
        this.$XModal.message({ status: 'success', message: '校验通过' })
      })
    } else if (this.type === 'form') {
      this.$refs.queryFrom.validate().then(() => {
        this.$XModal.message({ status: 'success', message: '校验通过' })
      })
    } else if (this.type === 'singleRowTable') {
      this.$refs.BsBasicInfoTable.validateAll().then(_ => {
        this.$XModal.message({ status: 'success', message: '校验通过' })
      })
    }
  },
  insertRow() {
    this.$refs.bsTableRef.insertRowData()
  },
  getTableConfig() {
    if (this.dicInfoCode !== null) {
      this.tableLoading = true
      this.getBossReportConfig(this.dicInfoCode).then(res => {
        if (res) {
          if (res.code === '100000') {
            this.tableCols = JSON.parse(res.data.editTableCols)
            console.log(this.tableCols)
            this.formGloabalConfig = {
              span: 8,
              align: 'left',
              size: 'medium',
              titleAlign: 'right',
              titleWidth: 0,
              titleColon: false,
              preventSubmit: false,
              loading: false,
              validConfig: {
                autoPos: true
              }
            }
            this.queryFormItemConfig = JSON.parse(res.data.formItems)
            console.log(this.queryFormItemConfig)
            console.log(this.queryFormData)
            if (this.type === null) {
              this.type = res.data.type === 'form' ? 'form' : 'table'
            }
            this.queryFormData = res.data.formData
            this.validationConfig = JSON.parse(res.data.validateRules)
            this.initCompleted = true
          } else {
            if (res.errorInfor && res.errorInfor.response && res.errorInfor.response.data && res.errorInfor.response.data.data) {
              this.$XModal.message({ status: 'error', message: res.errorInfor.response.data.data })
            }
            if (res.msg) {
              this.$XModal.message({ status: 'error', message: `错误：[${res.code}-${res.msg}]` })
            }
          }
        } else {
          this.$XModal.message({ status: 'error', message: '服务错误，请查看日志' })
          console.log(res)
        }
        this.tableLoading = false
      }).catch(err => {
        this.$XModal.message({ status: 'error', message: '网络连接失败，或前端逻辑错误。请查看日志' })
        this.tableLoading = false
        console.log(err)
      })
    }
  }
}

/**
 * 数据方法（AJAX）
 */
const dataMethods = {
  getBossReportConfig(dicInfoCode) {
    let param = {
      dicCode: dicInfoCode
    }
    return get('bisConfig/config/report/getBossReportConfig', param)
  }
}

/**
 * 校验方法（表单、表格）
 */
const validateMethods = {}

export const myMethods = {
  ...initMethods,
  ...interfaceMethods,
  ...dataMethods,
  ...validateMethods
}
