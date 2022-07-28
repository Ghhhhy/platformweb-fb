
<template>
  <el-dialog
    v-if="visible"
    title="文件上传"
    :visible.sync="visible"
    width="70%"
    :close-on-click-modal="false"
    @close="closeDialog"
  >
    <div>
      <TabTable
        ref="fileInfoTableRef"
        :footer-config="{}"
        :buttons="fileInfobuttons"
        :table-datas="fileTableDatas"
        :table-config="fileTableConfig"
        :report-id="reportId"
        :need-custom-button="true"
        :custom-style="customStyle"
      />
      <BsUpload
        ref="uploadRef"
        :queryparams="queryparams"
        :deleteparams="deleteparams"
        :downloadparams="downloadparams"
        uniqe-name="uploadOne"
        :after-upload="afterUpload"
        :after-delete="afterFileDelete"
      />
    </div>
  </el-dialog>
</template>

<script>
import TabTable from '@/views/main/ysbzgl/components/tabTable'
import { findParentComponent } from '@/utils'
export default {
  name: 'OperationGuideDialog',
  components: {
    TabTable
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    customStyle: {
      type: Object,
      default() {
        return { height: '450px' }
      }
    },
    queryParam: {
      type: Object,
      default() {
        return { billId: '', doctype: '', title: '' }
      }
    }
  },
  data() {
    return {
      curLine: null,
      // 文件表格配置
      fileTableConfig: {
        globalConfig: {
          // 全局配置
          checkType: 'checkbox', // hasCheckbox
          seq: true, // 序号列
          hasOptionRow: true // 操作列
        },
        cellRenderConfig: {
          optionRow: {
            type: 'cellRender', // renderEdit
            name: 'optionRow'
          }
        },
        renderers: {
          optionRow: {
            renderDefault(h, cellRender, params, context) {
              let self = findParentComponent(context.$table, 'RefineBudget')
              let { row, column } = params
              return [
                <a class="optionRow-detail fn-inline" onClick={() => self.doDownload({ row, column })}>下载</a>
              ]
            }
          }
        }
      },
      // 表格字段配置id
      reportId: '9130003',
      fileTableDatas: [],
      queryparams: {
        billguid: ''
      },
      deleteparams: {
        fileguids: ''
      },
      downloadparams: {
        fileguid: ''
      },
      afterUpload: this.onAfterUpload,
      afterFileDelete: this.onAfterFileDelete,
      fileInfobuttons: [
        { code: 'toolbar-doUpLoad', name: '上传附件', status: 'primary', callback: this.doUpLoad },
        { code: 'toolbar-doDelFile', name: '删除附件', callback: this.doDelFile }
      ]
    }
  },
  methods: {
    closeDialog() {
      // this.visible = false
      this.$emit('update:visible', false)
    },
    // 新增行
    doInsert() {
      this.$refs.fileInfoTableRef.addLine({ doctype: '', filename: '' }, -1)
    },
    // 获取附件列表数据->数据库暂时未有存附件信息id
    getFileList() {
      let self = this
      self.queryparams.doctype = self.queryParam.doctype
      self.queryparams.billguid = self.queryParam.billId
      self.queryparams.province = self.$store.state.userInfo.province
      self.queryparams.year = self.$store.state.userInfo.year
      this.$http['get']('mp-b-todo-service/todo/opguide', self.queryparams).then(res => {
        if (res.rscode === '100000') {
          self.fileTableDatas = res.data
        } else {
          this.$message.error(res.result)
          this.loadingPage.close()
        }
      }).catch(err => {
        console.log(err)
        this.$message.error('请求数据失败')
      })
    },
    // 删除附件
    doDelFile(obj, self, e) {
      if (self.selection.length === 1) {
        if (self.selection[0]['fileguid'] === undefined || self.selection[0]['fileguid'] === '' || self.selection[0]['fileguid'] === null) {
          this
            .$confirm('是否确认删除?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            })
            .then(() => {
              self.$refs.xGrid.remove(self.selection)
            })
            .catch(() => {
              this.$message({
                type: 'info',
                message: '有问题'
              })
            })
        } else {
          this.deleteparams.fileguids = ''
          this
            .$confirm('是否确认删除?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            })
            .then(() => {
              let files = self.selection[0]
              this.deleteparams.fileguids = files.fileguid
              this.$refs.uploadRef.deleteFile()
              self.removeCheckboxRow()
            })
            .catch(() => {
              this.$message({
                type: 'info',
                message: '有问题'
              })
            })
        }
      } else {
        this.$message.error('请选择一条需要删除的数据！')
      }
    },
    // 下载
    doDownload(obj) {
      this.downloadparams.fileguid = obj.row.fileguid
      this.$refs.uploadRef.downloadFile()
    },
    doDeleteFile(obj, self, e) {
      self['selection'] = [obj.row]
      this.doDelFile(obj, self, e)
    },
    // 上传附件
    doUpLoad(obj, self, e) {
      this.queryparams.doctype = this.queryParam.doctype
      this.queryparams.billguid = this.queryParam.billId
      this.$refs.uploadRef.upload()
    },
    // 上传附件完成之后执行
    onAfterUpload(data, fileguid) {
      let self = this
      let param = {
        billguid: this.queryParam.billId,
        doctype: this.queryParam.doctype,
        title: this.queryParam.title,
        fileguid: fileguid
      }
      this.$http.post('mp-b-todo-service/todo/opguide', param)
        .then(res => {
          if (res.rscode === '100000') {
            self.getFileList()
          } else {
            self.$message.error('上传失败：' + res.result)
          }
        })
        .catch(err => {
          console.log(err)
          self.$message.error('请求数据失败')
        })
    },
    // 删除附件完成之后执行
    onAfterFileDelete() {
      let param = {
        billguid: this.queryParam.billId,
        fileguid: this.deleteparams.fileguids
      }
      this.$http.del('mp-b-todo-service/todo/opguide', param)
        .then(res => {
          if (res.rscode === '100000') {
            self.getFileList()
          } else {
            self.$message.error('删除失败：' + res.result)
          }
        })
        .catch(err => {
          console.log(err)
          self.$message.error('请求数据失败')
        })
    }
  },
  mounted() {
    this.$nextTick(function() {
      this.getFileList()
    })
  },
  watch: {

  },
  computed: {

  }
}
</script>

<style lang='scss'>
</style>
