<-- 查看指标附件弹窗-->
<template>
  <div v-loading="showLoading">
    <vxe-modal
      v-model="showAttachmentDialog"
      :title="title"
      width="63%"
      @close="dialogClose"
    >
      <div v-loading="showLoading" style="height:400px;margin: 8px 10px 24px 10px;">
        <el-row type="flex" justify="end" style="margin-bottom:10px;">
          <BsUpload
            ref="attachmentUpload"
            :downloadparams="downloadParams"
            uniqe-name="attachmentUpload"
          />
          <!-- <el-button type="primary" @click="deleteAttachment">删除</el-button> -->
          <el-button type="primary" @click="downloadAttachment">下载</el-button>
          <!-- <el-button @click="preview">预览</el-button>-->
        </el-row>
        <div style="height:360px;">
          <BsTable
            ref="table"
            :footer-config="{ showFooter: false }"
            :table-columns-config="tableColumnsConfig"
            :table-data="tableData"
            :table-config="tableConfig"
            :toolbar-config="false"
            :pager-config="false"
          />
          <FilePreview
            v-if="filePreviewDialogVisible"
            :visible.sync="filePreviewDialogVisible"
            :file-guid="fileGuid"
            :app-id="appId"
          />
        </div>
      </div>
    </vxe-modal>
  </div>
</template>

<script>

import HTTPModule from '@/api/frame/main/Monitoring/GlAttachment'
import { proconf } from './js/GlAttachment'
import FilePreview from './filePreview.vue'

export default {
  name: 'GlAttachment',
  components: {
    FilePreview
  },
  props: {
    userInfo: {
      type: Object,
      default: null
    },
    billguid: {
      type: String,
      default: ''
    },
    mofDivCode: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      // 弹窗相关配置
      showAttachmentDialog: true,
      title: '附件',
      // 表格配置
      tableColumnsConfig: proconf.attachmentDialogColumnsConfig,
      tableData: [],
      tableConfig: {},
      downloadParams: {
        fileguid: ''
      },
      province: '',
      year: '',
      filePreviewDialogVisible: false,
      fileGuid: '',
      delId: ''
    }
  },
  computed: {
  },
  methods: {
    // 获取附件信息
    getAttachmentInfo() {
      const param = {
        year: this.userInfo.year,
        province: this.mofDivCode === '' ? this.userInfo.province : this.mofDivCode,
        billguid: this.billguid
      }
      this.showLoading = true
      HTTPModule.getFile(param).then((res) => {
        this.showLoading = false
        if (res.rscode === '100000') {
          this.tableData = JSON.parse(res.data)
          this.tableData.forEach(element => {
            let size = element.filesize / 1024
            element.filesize = size.toFixed(2) + 'KB'
          })
        } else {
          this.$message.error('获取附件信息失败: ' + res.result)
        }
      })
    },
    // 下载附件
    downloadAttachment() {
      let selection = this.$refs.table.getSelectionData()
      if (selection.length === 1) {
        this.downloadParams.fileguid = selection[0].fileguid
        this.$refs.attachmentUpload.downloadFileFile()
      } else {
        this.$message.error('请选择一条数据！')
      }
    },
    // 预览文件
    preview() {
      let selection = this.$refs.table.getSelectionData()
      if (selection.length === 1) {
        this.downloadParams.fileguid = selection[0].fileguid
        // this.appId = data.appid
        this.fileGuid = selection[0].fileguid
        this.filePreviewDialogVisible = true
      } else {
        this.$message.error('请选择一条数据！')
      }
    },
    // 关闭弹窗
    dialogClose() {
      this.$parent.showGlAttachmentDialog = false
    },
    refresh() {
      this.getAttachmentInfo()
    }
  },
  created() {
    this.getAttachmentInfo()
  },
  mounted() {
  }
}
</script>
<style>
</style>
