<!--  导入弹框   Author:Titans@2396757591@qq.com -->
<template>
  <div>
    <vxe-modal
      v-model="importModalVisible"
      width="800"
      title="导入"
      @click="closeAndClear"
    >
      <div class="import-download-template-up">
        <!-- 下载提示 -->
        <div class="idtu-tip">
          {{ config.reminder }}
        </div>
        <!-- 下载最新模板 -->
        <div class="idtu-download-template">
          <vxe-button
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
        </div>
        <div class="idtu-import-btn">
          <vxe-button
            v-deClick
            class="download-button-btn"
            type="primary"
            :disabled="fileConfig.fileName === '' || disabled"
            content="导入"
            @click="onImportClick"
          />
        </div>
      </div>
    </vxe-modal>
  </div>
</template>
<script>
const XLSX = require('xlsx')
export default {
  name: 'InvoicTable',
  props: {
    importModalVisible: {
      type: Boolean
    },
    config: {
      type: Object,
      default() {
        return {
          reminder: '请使用最新的导入模板,若是第一次,请在下方下载.',
          instructions:
            '文件大小不能大于10M,内容为纯文本或数字填写.模板中单位名称不能为空,其他信息请查看模板中说明.',
          downloadTemplateText: '下载最新模版',
          maxSize: 1024 * 1024 * 10,
          acceptType: 'xlsx'
        }
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
    },
    importType: {
      type: String,
      default() {
        return '1'
      }
    }
  },
  data() {
    return {
      disabled: false
    }
  },
  methods: {
    // 关闭对话框
    closeAndClear() {
      this.importModalVisible = false
    },
    onDownloadTemplateClick() {
      // 下载最新模板
      this.$emit('onDownloadTemplateClick', {}, this)
    },
    onImportFileClick() {
      // 选择文件
      this.$emit('onImportFileClick', {}, this)
    },
    readFile(file) { // 文件读取
      return new Promise(resolve => {
        let reader = new FileReader()
        reader.readAsBinaryString(file)// 以二进制的方式读取
        reader.onload = ev => {
          resolve(ev.target.result)
        }
      })
    },
    async onImportClick() {
      // 导入
      debugger
      let tempFileInfo = this.fileConfig.file
      if (!tempFileInfo) {
      } else {
        let data = await this.readFile(tempFileInfo)
        let workbook = XLSX.read(data, { type: 'binary' })// 解析二进制格式数据
        let worksheet = workbook.Sheets[workbook.SheetNames[0]]// 获取第一个Sheet
        let result = XLSX.utils.sheet_to_json(worksheet)// json数据格式
        let saveFileList = []
        result.forEach((item, index) => {
          let tempArr = []
          if (index !== 0) {
            for (const key in item) {
              tempArr.push(item[key])
            }
          }
          let tempFileInfo = {}
          if (tempArr.length > 0) {
            if (this.importType === 1) {
              tempFileInfo = {
                townCode: tempArr[0],
                townName: tempArr[1],
                villageCode: tempArr[2],
                villageName: tempArr[3],
                perName: tempArr[4],
                idenNo: tempArr[5],
                idenTypeName: tempArr[6],
                toPeopFamily: tempArr[7],
                payAmt: tempArr[8],
                xpayAmt: tempArr[9],
                addWord: tempArr[10],
                payMonth: tempArr[11],
                payCertNo: tempArr[12]
              }
            } else {
              tempFileInfo = {
                payMonth: tempArr[0],
                unifsocCredCode: tempArr[1],
                corpName: tempArr[2],
                subsidyAmt: tempArr[3],
                payCertNo: tempArr[4]
              }
            }
          }
          if (tempFileInfo.payCertNo) {
            saveFileList.push(tempFileInfo)
          }
        })
        this.$emit('onImportClick', saveFileList, this)
      }
    }
  },
  mounted() {},
  computed: {},
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
