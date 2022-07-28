<template>
  <el-dialog
    class="dialog absolute z-index-1"
    title="附件管理"
    :visible.sync="isVisible"
    width="60%"
    center
    @close="close"
  >
    <BsUpload
      ref="budgetUpload"
      uniqe-name="uploadBudgetFile"
      :queryparams="uploadDFileParams"
      :after-upload="afterUpload"
      :downloadparams="downloadparams"
    />
    <div class="detail" style="height: 500px">
      <BsTable
        ref="budgetAttatchTable"
        :table-columns-config="budgetAttatchTableCol"
        :toolbar-config="isedit ? budgetAttatchBtn : budgetAttatchBtnOnlyRead"
        :table-config="tableFileConfig"
        :pager-config="false"
        :table-data="attachDataList"
      />
    </div>
  </el-dialog>
</template>

<script>
import BudgetCommonRespons from '@/api/frame/main/budgetManager/BudgetCommon'
export default {
  name: 'BudgetAttach',
  props: {
    visible: {
      type: Boolean
    },
    isedit: {
      type: Boolean,
      default: false
    },
    curdata: {
      type: Object,
      default() {
        return { }
      }
    }
  },
  data() {
    return {
      downloadparams: {
        fileguid: ''
      },
      uploadDFileParams: {
        billguid: ''
      },
      isVisible: this.visible,
      afterUpload: this.OnAfterUpload,
      budgetAttatchTableCol: [
        {
          title: '创建时间',
          field: 'createtime',
          align: 'center',
          width: '250px',
          tooltip: true,
          visible: true,
          formatter: ''
        },
        {
          title: '附件名称',
          field: 'filename',
          align: 'center',
          tooltip: true,
          visible: true,
          formatter: ''
        }
      ],
      budgetAttatchBtn: {
        moneyConversion: false,
        buttons: [
          { code: 'toolbar-upload', name: '上传' },
          { code: 'toolbar-download', name: '下载' },
          { code: 'toolbar-deleterows', name: '删除附件' }
        ]
      },
      budgetAttatchBtnOnlyRead: {
        moneyConversion: false,
        buttons: [
          { code: 'toolbar-download', name: '下载' }
        ]
      },
      attachDataList: [],
      tableFileConfig: {
        methods: {
          toolbarButtonClickEvent: this.toolbarFileButtonClickEvent
        }
      },
      curSelectedData: this.curdata
    }
  },
  mounted() {
    // this.getFileList()
  },
  methods: {
    toolbarFileButtonClickEvent(obj, context, e) {
      switch (obj.code) {
        case 'toolbar-upload':
          // 文件上传
          this.upload(obj, context, e)
          break
        case 'toolbar-download':
          // 文件下载
          this.download(obj, context, e)
          break
        case 'toolbar-deleterows':
          // 删除行
          this.deleterows(obj, context, e)
          break
        default:
          console.log('default fallback')
      }
    },
    upload(obj, self, e) {
      this.uploadDFileParams.guid = this.uuid(32, 32)
      this.uploadDFileParams.billguid = this.curSelectedData.cor_bgt_doc_no
      this.$refs.budgetUpload.upload()
    },
    OnAfterUpload(data, fileid) {
      let param = { 'billguid': this.curSelectedData.cor_bgt_doc_no }
      this.getFileList(param)
    },
    download(obj, self, e) {
      if (self.selection.length !== 1) {
        this.$message.error('请选择一条数据')
        return
      }
      this.downloadparams.fileguid = self.selection[0].fileguid
      this.$refs.budgetUpload.downloadFile()
    },
    deleterows(obj, self, e) {
      if (self.selection.length < 1) {
        this.$message.error('请选择数据')
        return
      }
      let fileguids = ''
      for (let i = 0; i < self.selection.length; i++) {
        fileguids += self.selection[i].fileguid + ','
      }
      fileguids = fileguids.substr(0, fileguids.length - 1)
      BudgetCommonRespons.delfiles({ 'fileguids': fileguids, 'appid': 'mp-b-budget-service' })
        .then((res) => {
          if (res) {
            this.$message.info('删除成功')
            let param = { 'billguid': this.curSelectedData.cor_bgt_doc_no }
            this.getFileList(param)
          }
        })
        .catch((err) => {
          console.log(err)
          this.$message.error('请求失败')
        })
    },
    getFileList(params) {
      BudgetCommonRespons.getfiles(params)
        .then((res) => {
          this.attachDataList = JSON.parse(res)
        })
        .catch((err) => {
          console.log(err)
          this.$message.error('请求失败')
        })
    },
    uuid(len, radix) {
      var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split(
        ''
      )
      var uuid = []
      var i
      radix = radix || chars.length
      if (len) {
        for (i = 0; i < len; i++) uuid[i] = chars[0 | (Math.random() * radix)]
      } else {
        var r
        uuid[8] = uuid[13] = uuid[18] = uuid[23] = ''
        uuid[14] = '4'

        for (i = 0; i < 36; i++) {
          if (!uuid[i]) {
            r = 0 | (Math.random() * 16)
            uuid[i] = chars[i === 19 ? (r & 0x3) | 0x8 : r]
          }
        }
      }
      return uuid.join('')
    },
    close() {
      this.$emit('onClose')
      this.isVisible = false
      this.$emit('update:visible', this.isVisible)
    }
  },
  watch: {
    visible (newVal) {
      this.isVisible = newVal
      if (newVal) {
        let curData = this.curdata
        let param = { 'billguid': curData['cor_bgt_doc_no'] ? curData['cor_bgt_doc_no'] : curData['cor_bgt_doc_no_name'] }
        this.getFileList(param)
      }
    },
    curdata: {
      handler(newValue) {
        this.curSelectedData = newValue
      },
      deep: true,
      immediate: true
    }
  }
}
</script>

<style scoped>

</style>
