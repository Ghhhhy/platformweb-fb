<template>
  <div>
    <div v-if="oprateGuideDatas.length" v-loading="showLoading" class="menu-children__tree">
      <div v-for="(item, index) in oprateGuideDatas" :key="index" class="menuData">
        <div class="menuChildren">
          <el-row>
            <el-col :span="6">
              <span class="twoChildren"><a class="threeData" @click="doPreview(item.fileguid)">{{ (index + 1) + '. ' + item.filename }}</a></span>
            </el-col>
            <vxe-button size="mini" status="primary" @click="doPreview(item.fileguid)">预览</vxe-button>
            <vxe-button size="mini" status="primary" @click="doDownload(item.fileguid)">下载</vxe-button>
          </el-row>

        </div>
      </div>
      <FilePreview
        v-if="filePreviewDialogVisible"
        :visible.sync="filePreviewDialogVisible"
        :file-guid="fileGuid"
        :app-id="appId"
      />
      <BsUpload
        ref="fileUpload"
        :downloadparams="downloadParams"
        :open-loading="false"
        uniqe-name="uploadOne"
      />
    </div>
    <div v-else class="no-data__content">
      暂无数据
    </div>
  </div>
</template>

<script>
import FilePreview from './filePreview'

export default {
  name: 'OperateGuid',
  components: { FilePreview },
  props: {
    oprateGuideDatas: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      downloadParams: {
        fileguid: ''
      },
      showLoading: false,
      filePreviewDialogVisible: false,
      appId: 'pay_plan_voucher',
      fileGuid: ''
    }
  },
  methods: {
    doPreview(fileguid) {
      this.fileGuid = fileguid
      this.filePreviewDialogVisible = true
    },
    // 下载附件
    doDownload(fileguid) {
      this.downloadParams.fileguid = fileguid
      this.downloadParams.appid = 'pay_plan_voucher'
      this.$refs.fileUpload.downloadFile()
    }
  },
  created() {
  },
  mounted() {
  },
  watch: {
  }
}
</script>

<style scoped lang="scss">
  .no-data__content{
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    color: #dFE1E2;
    height: 120px;
  }
  .menu-children__tree{
    height: 136px;
    .menuData {
      width: 100%;
      height: 30px;
      .menuChildren {
        width: 95%;
        height: auto;
        margin: 10px auto 10px;
        .twoChildren {
          font-size: 16px;
          font-weight: 500;
          margin-top: 5px;
        }
        .threeData {
          display: flex;
          flex-wrap: wrap;
          width: 90%;
          height: auto;;
          margin-left: 20px;
          color: rgba(104, 99, 206, 1);
          font-size: 14px;
          float: right;
          span {
            margin-top: 5px;
            margin-left: 20px;
            cursor: pointer;
          }
          span:hover {
            color: red;
          }
        }
      }
    }
  }
</style>
