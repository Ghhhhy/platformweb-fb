<!--  导入弹框   Author:Titans@2396757591@qq.com -->
<template>
  <div>
    <vxe-modal
      v-model="importModalVisible"
      width="800"
      title="导入"
      @click="closeAndClear"
      @close="$emit('update:importModalVisible', false)"
    >
      <div class="import-download-template-up">
        <!-- 下载提示 -->
        <div class="idtu-tip">
          {{ config.reminder }}
        </div>
        <!-- 下载最新模板 -->
        <div class="idtu-download-template">
          <vxe-button
            v-if="config.downloadTemplate"
            class="btn"
            content="下载最新模板"
            @click="onDownloadTemplateClick"
          />
        </div>
        <div class="idtu-import">
          <div class="idtu-import-btn btn" @click="onImportFileClick">
            点击导入文件
          </div>
          <div class="idtu-import-tip">
            {{ config.instructions }}
          </div>
          <div v-if="fileConfig.fileName !== ''" class="idtu-importFile-tip">
            {{ fileConfig.fileName }}
          </div>
          <div v-if="fileList.length > 0 && fileList.constructor === Array">
            <div v-for="(k, v) in fileList" :key="v" class="idtu-importFile-tip">
              {{ k.name }}
            </div>
          </div>
        </div>
        <div v-if="!config.isMultiple" class="idtu-import-btn">
          <vxe-button
            class="download-button-btn"
            type="primary"
            :disabled="fileConfig.fileName === ''"
            content="导入"
            @click="onImportClick"
          />
        </div>
        <div v-else class="idtu-import-btn">
          <vxe-button
            class="download-button-btn"
            type="primary"
            :disabled="isFileList"
            content="上传"
            @click="onUpload"
          />
          <p style="font-size:12px; ">多选类型只支持上传</p>
        </div>
      </div>
    </vxe-modal>
  </div>
</template>
<script>
const importConfigData = {
  reminder: '请使用最新的导入模板,若是第一次,请在下方下载.',
  instructions:
    '文件大小不能大于10M,内容为纯文本或数字填写.模板中单位名称不能为空,其他信息请查看模板中说明.',
  downloadTemplateText: '下载最新模版',
  downloadTemplate: true, // 是否显示下载模版按钮
  maxSize: 1024 * 1024 * 10,
  acceptType: 'xlsx',
  useloadTemplate: false, // 是否使用本地的excel模板
  loadTemplateUrl: '', // 本地excel模板地址
  replaceFileName: false,
  isMultiple: true,
  DownloadTemplateWay: 'load' // 'load': 本地excel模板 port: 业务代码中走接口下载: default: 分析columns生成模板
}
export default {
  name: 'InvoicTable',
  props: {
    importModalVisible: {
      type: Boolean
    },
    importConfig: {
      type: Object,
      default() {
        return {}
      }
    },
    fileConfig: {
      type: Object,
      default() {
        return {
          fileName: '',
          maxSize: 1024 * 1024 * 10
        }
      }
    }
  },
  computed: {
    config() {
      return { ...importConfigData, ...this.importConfig }
    }
  },
  data() {
    return {
      isFileList: true,
      fileList: []
    }
  },
  methods: {
    onUpload() {
      this.$emit('onImportUpload', { ...this.config }, this)
    },
    // 关闭对话框
    closeAndClear() {
      this.fileList = []
      this.isFileList = true
      this.$emit('clear')
      this.$emit('update:importModalVisible', false)
    },
    onDownloadTemplateClick() {
      switch (this.config.DownloadTemplateWay) {
        case 'load':
          if (!this.config.loadTemplateUrl) {
            self.$message({
              message: '请传入loadTemplateUrl',
              type: 'warning'
            })
            return
          }
          window.open(this.config.loadTemplateUrl)
          break
        case 'port':
          this.$emit('onDownloadTemplateClickByPort')
          break
        default:
          // 下载最新模板
          if (this.config.useloadTemplate) {
            this.onDownloadLocalTemplate(this.config.loadTemplateUrl, this.config.replaceFileName)
          } else {
            this.$emit('onDownloadTemplateClick', {}, this)
          }
          break
      }
    },
    onDownloadLocalTemplate(url, name) {
      console.log(url, name, '------ 模板地址 ------')
      // 对配置replaceFileName的导出文件名进行替换
      if (name) {
        const link = document.createElement('a')
        link.style.display = 'none'
        link.href = url
        link.setAttribute('download', name)
        document.body.appendChild(link)
        link.click()
      } else {
        window.location.href = url
      }
    },
    onImportFileClick() {
      // 选择文件
      this.$emit('onImportFileClick', { isMultiple: this.config.isMultiple, cb: this.onImportFileClickCb }, this)
    },
    onImportFileClickCb(files) {
      if (this.config.isMultiple) {
        this.fileList.push(...files)
      } else {
        this.fileList = files
      }
      this.isFileList = false
    },
    onImportClick() {
      // 导入
      this.$emit('onImportClick', { data: [] }, this)
    }
  },
  mounted() {},
  watch: {
    importModalVisible: {
      handler(newVal) {
        this.$emit('update:importModalVisible', newVal)
      },
      immediate: true
    }
  }
}
</script>
<style lang="scss">
.import-download-template-up {
  padding: 10px 50px 15px 50px;
  .idtu-tip {
    font-size: 14px;
    font-weight: bold;
  }
  .idtu-download-template {
    margin: 10px 0 0 0;
  }
  .idtu-import {
    margin-top: 10px;
    border: 1px dashed #d9d9d9;
    width: 100%;
    padding: 10px;
    .idtu-import-btn {
      font-size: 16px;
      margin: auto;
      width: 200px;
      text-align: center;
      color: rgb(31, 140, 251);
    }
    .idtu-import-btn:hover {
      opacity: 0.75;
    }
    .idtu-import-tip {
      text-align: center;
      margin-top: 20px;
      font-size: 14px;
      font-weight: bold;
    }
    .idtu-importFile-tip{
          text-align: left;
    margin-top: 20px;
    font-size: 14px;
    font-weight: bold;
    background: #e3e2e2;
    color: #3b9afb;
    line-height: 20px;
    padding: 10px 20px;
    }
  }
  .idtu-import-btn {
    margin: 20px 0 0 0;
  }
}
</style>
