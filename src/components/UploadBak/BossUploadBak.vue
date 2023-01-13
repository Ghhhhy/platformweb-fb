<template>
  <!-- <div style="height:118px"> -->
  <!-- 附件区域 -->
  <div class="fundPlanBody" style="margin-top:16px;">
    <div class="funPlanHeader">
      <div class="funPlanHeaderWord">附件上传</div>
    </div>
    <div v-if="isUpload" class="attachment">
      <el-upload
        ref="fileUpload"
        action="#"
        :show-file-list="false"
        :data="uploadDFileParams"
        :disabled="disabled"
        :on-remove="handleRemove"
        :http-request="handelUploadDebugfile"
      >
        <!-- <div class="fn-inline"> -->
        <div class="fn-inline" style="float:left">
          <div class="footer-btn">
            <el-row
              style="display: inline-block;height: 42px;float: left;"
            >
              <el-col :span="8">
                <img src="@/assets/img/upload/上传icon.svg" alt="" class="img-my">
              </el-col>
              <el-col :span="16">
                <span class="sp-my">上传附件</span>
              </el-col>
            </el-row>
          </div>
        </div>
        <div slot="tip" class="fn-inline upload-my-css">
          <div
            class="fn-inline"
            style="margin-top: 3px;height: 33px;float:left"
          >
            <img src="@/assets/img/upload/备注icon.svg" alt="" class="img-my-two">
          </div>
          <div class="fn-inline" style="height:33px;float:left">
            <span class="sp-my-two">支持png/jpg/pdf等，不超过{{ sizeNum }}M</span>
          </div>
        </div>
      </el-upload>
    </div>

    <div class="fn-inline enclosure-css fundPlanBodyTwo">
      <div class="fundPlanBodyThr">
        <div
          v-for="( file, index ) in fileData"
          :key="index"
          class="fn-inline enclosure-css1"
        >
          <div class="enclosure-css2 fn-inline">
            <div class="fn-inline enclosure-css5">
              <div class="fn-inline enclosure-css3">
                <span class="sp-my-thr">{{ file['filename'] }}</span>
              </div>
              <div class="fn-inline enclosure-css4">
                <button v-if="allowDelete" :disabled="disabled" @click="handleRemove(index, file)"><img src="@/assets/img/upload/deleteicon@2x.png" alt="" class="img-my-two"></button>
                <i v-if="allowDownload" class="ri-file-download-fill cursor" @click="handleDownload(file)"></i>
                <i v-if="allowPreview" class="ri-eye-fill cursor" @click="handleFilePreview(file)"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <bs-file-preview
      v-if="filePreviewDialogVisible"
      :visible.sync="filePreviewDialogVisible"
      :file-guid="currentFile.fileguid"
      :app-id="$store.getters.getLoginAuthentication.appguid"
    />
  </div>
  <!-- </div> -->
</template>
<script>
import HttpModule from '@/api/frame/main/Monitoring/Monitoring.js'
import { downloadByFileId } from '@/utils/download'

export default {
  props: {
    isUpload: {
      type: Boolean,
      default: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    attachmentId: {
      type: String,
      default: ''
    },
    fileDataBakDel: {
      type: Array,
      default() {
        return []
      }
    },
    fileData: {
      type: Array,
      default() {
        return []
      }
    },
    // 允许被删除
    allowDelete: {
      type: Boolean,
      default: true
    },
    // 允许下载
    allowDownload: {
      type: Boolean,
      default: false
    },
    // 允许预览
    allowPreview: {
      type: Boolean,
      default: false
    },
    // 文件大小
    sizeNum: {
      type: Number,
      default: 10
    }
  },
  data() {
    return {
      // 当前操作的file
      currentFile: null,
      // 文件预览弹窗显隐
      filePreviewDialogVisible: false,
      isChange: true,
      uploadDFileParams: {},
      fileDataBakAdd: []
    }
  },
  watch: {
    attachmentId() {
      // this.getAttachmentInfo()
    }
  },
  methods: {
    // 从附件服务中移除文件
    onRemove(val) {
      let fileguids = []
      val.forEach(item => {
        fileguids.push(item['fileguid'])
      })
      let params = 'fileguids=' + fileguids + ',&' + 'appid=pay_plan_voucher'
      HttpModule.deleteAttachment(params).then(res => {
        if (res.rscode === '100000') {
          //   let fileguidList = []
          //   // this.fileList.splice(index, 1)
          //   for (let i in this.fileData) {
          //     if (this.fileData[i].fileguid === file['fileguid']) {
          //       fileguidList.push(this.fileData[i].fileguid)
          //       this.fileData.splice(i, 1)
          //       break
          //     }
          //   }
          //   this.onRemove(fileguidList)
          //   this.$emit('update:fileData', this.fileData)
          //   this.$message.success('删除成功')
        }
      }).catch()
    },
    // 移除文件
    handleRemove(index, file) {
      console.log('file', file)
      for (let i in this.fileData) {
        if (this.fileData[i].fileguid === file['fileguid']) {
          this.fileDataBakDel.push(this.fileData[i])
          this.fileData.splice(i, 1)
          break
        }
      }
      console.log('this.fileDataBakDel', this.fileDataBakDel)
      let params = 'fileguids=' + file['fileguid'] + ',&' + 'appid=pay_plan_voucher'
      HttpModule.deleteAttachment(params).then(res => {
        if (res.rscode === '100000') {
          let fileguidList = []
          // this.fileList.splice(index, 1)
          for (let i in this.fileData) {
            if (this.fileData[i].fileguid === file['fileguid']) {
              fileguidList.push(this.fileData[i].fileguid)
              this.fileData.splice(i, 1)
              break
            }
          }
          this.onRemove(fileguidList)
          this.$emit('update:fileData', this.fileData)
          this.$message.success('删除成功')
        }
      }).catch()
    },
    // 单个删除
    deleteAttachment() {
      if (this.$refs.bsTableRef.getSelectionData().length === 0) {
        this.$message.warning('请选择需要删除的数据')
        return
      }
      const temp = this.attachmentList
      let fileguids = []
      var fileguid = ''
      this.$refs.bsTableRef.getSelectionData().forEach(v => {
        fileguids.push(v.fileguid)
        for (let i = 0; i < temp.length; i++) {
          if (v.fileguid === temp[i].fileguid) {
            fileguid = v.fileguid
            temp.splice(i, 1)
            i -= 1
          }
        }
      })
      let params = 'fileguids=' + fileguids + ',&' + 'appid=pay_plan_voucher'
      HttpModule.deleteAttachment(params).then(res => {
        if (res.rscode === '100000') {
          this.attachmentList = temp
          for (let i in this.fileData) {
            if (this.fileData[i].fileguid === fileguid) {
              this.fileData.splice(i, 1)
              break
            }
          }
          this.$emit('update:fileData', this.fileData)
          this.$message.success('删除成功')
        }
      }).catch()
    },
    // 取消时全部删除
    cancel() {
      console.log('调用子组件')
      // 只删除新增加的id
      let fileguids = []
      if (this.fileDataBakAdd.length === 0) {
        return
      }
      this.fileDataBakAdd.forEach(v => {
        fileguids.push(v['fileguid'])
      })
      let params = 'fileguids=' + fileguids + ',&' + 'appid=pay_plan_voucher'
      HttpModule.deleteAttachment(params).then(res => {
        if (res.rscode === '100000') {
          this.$message.success('已上传附件删除成功')
          // this.onRemove(fileguids)
          this.fileData = []
          this.$emit('update:fileData', this.fileData)
          this.isChange = true
        } else {
          this.$message.warning('已上传附件删除失败: ' + res.result)
          this.isChange = false
          return false
        }
      }).catch()
    },
    // 删除
    // 判断文件大小，限制1m
    beforeUpload(file) {
      let s = file.size
      if (s > 1024 * 1024 * this.sizeNum) {
        return false
      } else {
        return true
      }
    },
    // 上传文件
    handelUploadDebugfile(e) {
      console.log(e.file)
      if (this.beforeUpload(e.file) === false) {
        this.$message({ showClose: true, message: '上传失败:上传的文件大小不能超过' + this.sizeNum + 'M', type: 'warning' })
        return
      }
      const form = new FormData()
      const temp = []
      console.log(this.attachmentId)
      // 文件对象
      form.append('file', e.file)
      form.append('filename', e.file.name)
      form.append('appid', '4564CC930A9F45BAAEC7ADF7F6B7C6E5')
      temp.push(e.file.name)
      form.append('doctype', '')
      form.append('year', this.$store.state.userInfo.year)
      form.append('province', this.$store.state.userInfo.province)
      form.append('userguid', this.$store.state.userInfo.guid)
      form.append('billguid', this.attachmentId)
      console.log('attachmentId', this.attachmentId)
      this.addLoading = true
      HttpModule.fileUpload(form).then(res => {
        this.addLoading = false
        if (res.rscode === '100000') {
          let resultData = ''
          if (res.data || res.data != null) {
            resultData = res.data
          } else {
            resultData = res.result
          }
          let data = {}
          temp.push(resultData)
          // this.fileList.push(temp)1
          this.$emit('update:attachmentId', this.attachmentId)
          data['year'] = this.$store.state.userInfo.year
          data['count'] = 0
          data['filesize'] = e.file.size
          data['filename'] = e.file.name
          data['fileguid'] = resultData
          data['filepath'] = e.file.webkitRelativePath
          data['province'] = this.$store.state.userInfo.province
          data['appid'] = 'pay_plan_voucher'
          data['creater'] = e.file.uid
          data['guid'] = this.$store.state.userInfo.guid
          data['billguid'] = this.attachmentId
          data['importuser'] = this.$store.state.userInfo.name
          this.fileData.push(data)
          console.log(this.$store.state.userInfo)
          this.fileDataBakAdd.push(data)
          this.$emit('update:fileData', this.fileData)
          this.$message.success('上传成功')
        } else {
          this.$message.error('上传失败')
        }
      }).catch()
    },
    // 点击表格行触发事件
    /**
     * 根据fileId下载文件
     */
    handleDownload(file) {
      if (!file.fileguid) {
        this.$message.error('未知的文件id')
        return
      }
      downloadByFileId(file.fileguid)
    },
    /**
     * 预览
     */
    handleFilePreview(file) {
      this.currentFile = file
      this.filePreviewDialogVisible = true
    }
  }
}
</script>
<style  lang="scss">
  // 附件区域
  .upload-my-css {
      height: 33px;
      margin-top: 9px;
      float: left;
      margin-left: 16px;
    }
    .img-my {
      width: 12px;
      height: 12px;
      margin-left: 17px;
      margin-right: 9px;
      margin-top: 13.8px;
      margin-bottom: 14.4px;
    }
    .img-my-two {
      width: 14px;
      height: 14px;
      float: right;
    }
    .sp-my {
      width: 56px;
      font-size: 14px;
      line-height: 24px;
      display: inline-block;
      color: #000000;
      margin-top: 8px;
      margin-bottom: 8px;
      margin-right: 16px;
    }
    .sp-my-two {
      font-size: 12px;
      padding-left: 4px;
      color: #9EA4A9;
      line-height: 22px;
    }
    .attachment{
      height: 44px;
      margin-top: 16px;
      margin-left: 24px;
      margin-bottom: 16px;
      background-color: #F4FAFF;
      .footer-btn{
        border:1px solid#CFD2D4;
        border-radius: 5%;
        width:110px;
        height:40px;
        font-size: 14px;
        line-height: 24px;
        background: #FFFFFF;
      }
      .el-upload {
        text-align: left;
        float: left;
        .el-upload-dragger {
          width: calc(100% - 40px) ;
          height: 80px;
          margin: 20px 20px 0 20px;
          .el-icon-upload {
            margin: 0 ;
          }
        }
        .el-upload__tip {
          margin-left: 10px;
          margin-top: auto;
        }
      }
    }
    .title{
      height: 40px;
      font-size: 18px;
      /*border-bottom: 1px solid #ddd;*/
      line-height: 40px;
      padding: 0 20px;
    }
    .el-card {
      margin-top: 10px;
    }
    .below-table{
    /* 表格样式 */
      .pay-input-table{
        border: 2px solid #0c9fe3;
        color: #0c9fe3;
        width: 100%;
        margin: 0 auto;
        padding: 15px 0px;
      }
      table>tbody>tr>td {
        padding: 8px;
        border: 1px solid #0c9fe3;
        text-align: center;
      }
      /* 付款人列表 */
      .top-search-tip,.top-search-inputs{
        display: grid;
        grid-template-columns:2fr 2fr 2fr 0.3fr ;
        column-gap: 15px;
      }
    }
    .funPlanHeader {
    font-family: PingFangSC-Regular;
    font-size: 16px;
    color: #2E3133;
    letter-spacing: 0;
    line-height: 39px;
    border-bottom: 1px solid #CCD2D8;
    }
    .funPlanHeaderWord {
      font-family: PingFangSC-Regular;
      font-size: 16px;
      color: #2E3133;
      letter-spacing: 0;
      line-height: 24px;
      margin-left: 24px;
      padding-top: 7px;
      margin-bottom: 9px;
    }
    .fundPlanBody{
      background: #F4FAFF;
      height: 118px;
    }
    .fundPlanBodyTwo {
      background: #F4FAFF;
    }
    .fundPlanBodyThr {
      // margin-top: -80px;
      margin-left: 8px;
      margin-right: 24px;
    }
    .enclosure-css {
      margin-top: 0px;
      width: 100%;
      margin-bottom: 16px;
      .enclosure-css1 {
        height: 56px;
        width: 50%;
        .enclosure-css2 {
          margin-left: 16px;
          width: calc(100% - 16px);
          height: 40px;
          background-color: rgb(231, 241, 254);
          .enclosure-css5 {
            // width: calc(100% - 34px);
            width: 100%;
            height: 22px;
            padding-left: 16px;
            padding-right: 18px;
            padding-top: 9px;
            padding-bottom: 9px;
          }
          .enclosure-css3 {
            width: 50%;
            height: 22px;
              .sp-my-thr {
                font-size: 14px;
                line-height: 22px;
                display: inline-block;
              }
            }
          .enclosure-css4 {
            width: 45%;
            text-align: right;
            height: 22px;
          }
        }
      }
    }
</style>
