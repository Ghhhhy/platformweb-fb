<!--  export配置弹框   Author:Titans@2396757591@qq.com -->
<template>
  <vxe-modal
    v-model="visible"
    title="导出参数设置"
    width="1000"
    height="auto"
    remember
    resize
    transfer
    :position="{ top: 100 }"
    @close="onCancelClick"
    @cancel="onCancelClick"
  >
    <div class="export-module">
      <vxe-form
        :data="exportConfigIn"
        size="medium"
        title-width="120"
        title-align="right"
        align="left"
        title-colon
      >
        <vxe-form-item title="导出类型" :span="24">
          <template v-slot>
            <div class="vxe-checkbox-group fn-inline">
              <vxe-checkbox
                v-model="exportConfigIn.isSingle"
                label="isSingle"
                content="单文件"
                size="medium"
              />
              <vxe-checkbox
                v-model="exportConfigIn.isMore"
                label="isMore"
                content="多文件"
                size="medium"
              />
            </div>
          </template>
        </vxe-form-item>
        <!--  <vxe-form-item title="保存类型" field="saveType" :span="24">
          <template v-slot>
            <vxe-select v-model="exportConfigIn.saveType" placeholder="请选择保存类型" clearable>
              <vxe-option value=".xlsx" label="Excel 工作簿(*.xlsx)" />
            </vxe-select>
          </template>
        </vxe-form-item>
        -->
        <vxe-form-item title="导出报表" field="exportOption" :span="24">
          <template v-slot>
            <div class="export-option">
              <div class="export-option-tree">
                <el-tree
                  ref="exportColumsTree"
                  :data="columns"
                  show-checkbox
                  node-key="nestedId"
                  default-expand-all
                  :default-checked-keys="defaultCheckedKeys"
                  :props="defaultProps"
                  @check="checkTreeNode"
                />
              </div>
            </div>
          </template>
        </vxe-form-item>
        <vxe-form-item title="区划选项" field="exportOption" :span="24">
          <template v-slot>
            <div class="export-option">
              <div class="export-option-tree">
                <el-tree
                  ref="exportColumsSecondTree"
                  :data="secondColumns"
                  show-checkbox
                  node-key="nestedId"
                  default-expand-all
                  :default-checked-keys="defaultCheckedSecondKeys"
                  :props="defaultSecondProps"
                  @check="checkSecondTreeNode"
                />
              </div>
            </div>
          </template>
        </vxe-form-item>
        </vxe-form-item>
      </vxe-form>
      <div class="btn-group">
        <vxe-button type="submit" status="primary" size="medium" @click="onExportClick">导出</vxe-button>
      </div>
    </div>
  </vxe-modal>
</template>

<script>
import resolveResult from './result.js'
export default {
  name: 'GovBudgetExport',
  components: {},
  props: {
    exportModalVisible: {
      type: Boolean
    },
    customExportConfig: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      visible: false,
      exportConfigIn: {
        isMore: false, // 是否只导出数据表头名称
        tableIdJson: '',
        mofDivVOS: [],
        isSingle: true
      },
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      defaultCheckedKeys: [],
      defaultCheckedSecondKeys: [],
      checkAllColumns: false,
      checkAllSecondColumns: false,
      columns: [],
      secondColumns: [],
      defaultSecondProps: {},
      checkedKeys: {},
      checkedSecondKeys: {}
    }
  },
  computed: {
    isShowHighOptions() {
      return !(this.exportConfigIn.isSingle || this.exportConfigIn.isMore)
    }
  },
  methods: {
    ...resolveResult,
    deepCopy(obj) {
      // 深拷贝通用方法
      if (typeof obj !== 'object' || obj === null) return obj
      let newObj = obj instanceof Array ? [] : {}
      for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
          newObj[key] =
            typeof obj[key] === 'object' ? this.deepCopy(obj[key]) : obj[key]
        }
      }
      return newObj
    },
    generateTree(arr) {
      // 平行数据转化树形数据
      let copy = this.deepCopy(arr)
      let obj = {}
      copy.forEach((item, index) => {
        delete item.children
        obj[item.nestedId] = item
      })
      let res = []
      copy.forEach((item) => {
        if (item.nestedPid === 0) {
          res.push(item)
        }
        for (let key in obj) {
          if (item.nestedId === obj[key].nestedPid) {
            if (item.children) {
              item.children.push(obj[key])
            } else {
              item.children = [obj[key]]
            }
          }
        }
      })
      return res
    },
    init() {
      this.exportConfigIn = Object.assign(
        this.exportConfigIn,
        this.exportConfig,
        this.customExportConfig
      )
    },
    onPrintClick() {
      // 打印点击事件

    },
    onCancelClick() {
      this.$emit('onCancel', this.content)
      if (typeof this.cancel === 'function') {
        this.cancel(this)
      }
    },
    onExportClick() {
      // 导出点击事件
      let self = this
      if (self.exportConfigIn.tableIdJson === '') {
        self.$XModal.message({ status: 'error', message: '请至少选择一张报表进行导出!' })
        return
      }
      let flag = self.exportConfigIn.isMore
      self.$http.post('bisReport/report/tableExport', self.exportConfigIn).then(res => {
        if (res.code === '100000') {
          let blob = self.dataURLtoBlob(res.data, flag)
          let url = window.URL.createObjectURL(blob)
          const link = document.createElement('a') // 创建a标签
          link.href = url
          link.download = '导出报表' + new Date().format('YYYY-MM-DD:HH:MM:ss') // 重命名文件
          link.click()
          URL.revokeObjectURL(url) // 释放内存
          self.$XModal.message({ status: 'success', message: '导出成功!' })
          self.loadingPage.close()
        } else {
          self.$XModal.message({ status: 'error', message: '导出失败：' + res.msg })
          self.loadingPage.close()
        }
      }).catch(e => {
        self.$XModal.message({ status: 'error', message: '导出失败：' + e })
        self.loadingPage.close()
      })
    },
    dataURLtoBlob(base64Str, isMore) {
      var bstr = atob(base64Str)
      var n = bstr.length
      var u8arr = new Uint8Array(n)
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
      }
      if (!isMore) {
        return new Blob([u8arr], { type: 'application/vnd.ms-excel;charset=utf-8' })
      } else {
        return new Blob([u8arr], { type: 'application/zip' })
      }
    },
    showLoading() {
      return this.$loading({
        lock: true,
        text: '正在加载中...请您稍候',
        spinner: 'ri-loader-4-line roll',
        background: 'rgba(0, 0, 0, 0.7)'
      })
    },
    getColumns() {
      let self = this
      self.loadingPage = self.showLoading()
      let param = {
        appguid: 'fiscal',
        batchno: 1,
        datatype: 8,
        sxspecroleguid: '999004'
      }
      self.$http.post('bisReport/report/getQueryTable', param).then(res => {
        self.loadingPage.close()
        self.resolveResult(data => {
          self.columns = data
        }, res)
      }).catch(e => {
        self.$XModal.message({ status: 'error', message: '获取列表失败：' + e })
        self.loadingPage.close()
      })
    },
    checkTreeNode(checkedNodes, checkedKeys, halfCheckedNodes, halfCheckedKeys) {
      let tableIds = []
      checkedKeys.checkedNodes.forEach(item => {
        tableIds.push(item.id)
      })
      if (tableIds.length > 0) {
        this.exportConfigIn.tableIdJson = JSON.stringify(tableIds)
      } else {
        this.exportConfigIn.tableIdJson = ''
      }
    },
    checkSecondTreeNode(checkedNodes, checkedKeys, halfCheckedNodes, halfCheckedKeys) {
      this.checkedSecondKeys = checkedKeys
    }
  },
  mounted() {
    this.init()
    this.getColumns()
  },
  watch: {
    exportModalVisible: {
      handler(newVal) {
        this.visible = newVal
        if (newVal) {
          this.init()
        }
      },
      immediate: true
    },
    visible: {
      handler(newVal) {
        this.$emit('update:exportModalVisible', newVal)
      },
      immediate: true
    },
    customExportConfig: {
      handler() {
        this.init()
      },
      deep: true,
      immediate: true
    },
    'exportConfigIn.isSingle': {
      handler(value) {
        if (value) {
          this.exportConfigIn.isMore = !value
        }
      },
      deep: true,
      immediate: true
    },
    'exportConfigIn.isMore': {
      handler(value) {
        if (value) {
          this.exportConfigIn.isSingle = !value
        }
      },
      deep: true,
      immediate: true
    }
  }
}
</script>

<style lang='scss'>
.export-module {
  padding: 0 0 20px 0;
  .vxe-form {
    padding: 0 60px;
    margin: 0 auto;
    .vxe-form--item {
      padding: 3px 0;
    }
    .export-option {
      border: 1px solid #dcdfe6;
      margin: 3px 0;
      border-radius: 4px;
      user-select: none;
      .export-option-title {
        background-color: #f8f8f9;
        font-weight: 700;
        border-bottom: 1px solid #dadce0;
        line-height: 30px;
        padding: 0 23px;
      }
      .export-option-tree {
        max-height: 155px;
        overflow: auto;
      }

      .vxe-checkbox-group {
        line-height: 24px;
        line-height: normal;
        .vxe-checkbox {
          margin: 0 5px 0 0;
        }
        .vxe-checkbox + .vxe-checkbox {
          margin: 0 5px 0 0;
        }
      }
      .vxe-checkbox-group {
        line-height: 24px;
      }
    }
  }
  .btn-group {
    text-align: right;
    padding: 0 20px;
    .vxe-button {
      border-radius: 6px;
    }
  }
}
</style>
