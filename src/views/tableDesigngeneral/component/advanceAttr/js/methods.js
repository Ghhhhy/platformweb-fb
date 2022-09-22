import config from './config.js'
import { get, post } from '@/api/http'

/**
 * 初始化方法
 */
const initMethods = {
  initCreated() {
    this.initConfig()
  },
  initMounted() {
    this.getTableData()
  },
  initConfig() {
    this.tableCols = config('tableConf', 'defaultConfig', 'tableCols')
    this.tableValidateConfig = config('tableConf', 'defaultConfig', 'tableValidateConfig')
  }
}

/**
 * 界面交互逻辑方法
 */
const interfaceMethods = {
  handleClose() {
    this.visible = false
  },
  handleConfirm() {
    let self = this
    this.$refs.bsTableRef.validate().then(() => {
      self.tableLoading = true
      self.batchSaveAttrInfo().then(res => {
        if (res) {
          if (res.code === '100000') {
            self.$XModal.message({ status: 'success', message: '保存成功' })
            self.handleClose()
          } else {
            if (res.errorInfor && res.errorInfor.response && res.errorInfor.response.data && res.errorInfor.response.data.data) {
              self.$XModal.message({ status: 'error', message: res.errorInfor.response.data.data })
            }
            if (res.msg) {
              self.$XModal.message({ status: 'error', message: `错误：[${res.code}-${res.msg}]` })
            }
          }
        } else {
          self.$XModal.message({ status: 'error', message: '服务错误，请查看日志' })
          console.log(res)
        }
        self.tableLoading = false
      }).catch(err => {
        self.$XModal.message({ status: 'error', message: '网络连接失败，或前端逻辑错误。请查看日志' })
        console.log(err)
        self.tableLoading = false
      })
    })
  },
  insertFromTemplate() {
    this.advanceAttrTemplateVisible = true
  },
  onSetAttr(tableData, isFuGai) {
    if (isFuGai) {
      this.tableData = tableData
    } else {
      let dataList = this.$refs.bsTableRef.getListData()
      if (dataList.length === 0) {
        this.tableData = tableData
      } else {
        let copyData = {}
        for (let data of dataList) {
          copyData[data.attrKey] = data
        }
        for (let data of tableData) {
          copyData[data.attrKey] = data
        }
        this.tableData = Object.values(copyData)
      }
    }
  },
  insertRow() {
    let self = this
    this.$refs.bsTableRef.insertRowData({
      data: {
        type: self.type,
        dicId: self.dicInfoId,
        relationId: self.colId,
        attrType: '0'
      }
    })
    console.log(this.$refs.bsTableRef.getListData())
  },
  delRow() {
    let datas = this.$refs.bsTableRef.getSelectionData()
    if (!datas || datas.length === 0) {
      this.$XModal.message({ status: 'info', message: '未选中任何数据' })
      return
    }
    this.$refs.bsTableRef.deleteRowData(datas)
  },
  // 点击表格事件
  activeRowMethod({ row, rowIndex, $rowIndex, column, columnIndex, $columnIndex }) {
  }
}

/**
 * 数据方法（AJAX）
 */
const dataMethods = {
  getTableData() {
    this.tableLoading = true
    this.getAttrByTypeAndDicInfoId().then(res => {
      if (res) {
        if (res.code === '100000') {
          this.tableData = res.data
        } else {
          this.$XModal.message({ status: 'error', message: `错误：[${res.code}-${res.msg}]` })
        }
      } else {
        if (res.errorInfor && res.errorInfor.response && res.errorInfor.response.data && res.errorInfor.response.data.data) {
          this.$XModal.message({ status: 'error', message: res.errorInfor.response.data.data })
        }
        if (res.msg) {
          this.$XModal.message({ status: 'error', message: `错误：[${res.code}-${res.msg}]` })
        }
        console.log(res)
      }
      this.tableLoading = false
    }).catch(err => {
      this.$XModal.message({ status: 'error', message: '网络连接失败，或前端逻辑错误。请查看日志' })
      this.tableLoading = false
      console.log(err)
    })
  },
  getAttrByTypeAndDicInfoId() {
    let param = {
      dicInfoId: this.dicInfoId,
      type: this.type
    }
    if (this.type === '2') {
      param.colId = this.colId
    }
    return get('bisConfig/config/basDicAttr/getAttrByDicInfoIdAndType', param)
  },
  batchSaveAttrInfo() {
    let dataList = this.$refs.bsTableRef.getListData()
    let type = this.type
    let colId = this.colId
    let dicInfoId = this.dicInfoId
    return post(`bisConfig/config/basDicAttr/batchSaveOrUpdateAttrInfo?dicInfoId=${dicInfoId}&type=${type}&colId=${colId}`, dataList)
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
