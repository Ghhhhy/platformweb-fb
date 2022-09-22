<!--  导入表体弹框，支持解析嵌套表头   Author:Titans@2396757591@qq.com -->
<template>
  <div class="idtu-template-generate">
    <vxe-modal
      v-model="importModalVisible"
      width="800"
      top="15"
      :position="{
        top: '10%',
      }"
      title="导入"
      @click="closeAndClear"
      @cancel="onCancelClick"
    >
      <div class="import-download-template-up">
        <!-- 下载提示 -->
        <div>
          <div v-if="config.downloadTemplate || config.downloadSample" class="idtu-tip">
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
            <vxe-button
              v-if="config.downloadSample"
              class="btn"
              content="下载示例模板"
              @click="onDownloadSampleClick"
            />
          </div>
        </div>

        <div class="idtu-import">
          <vxe-form
            :data="config"
            size="medium"
            title-width="150"
            title-align="right"
            align="left"
            title-colon
          >
            <vxe-form-item v-if="config.showTheadSelect" title="导入说明" :span="24">
              <div class="idtu-import-tip">
                {{ config.instructions }}
              </div>
            </vxe-form-item>
            <vxe-form-item title="导入选项" :span="24">
              <template v-slot>
                <div class="vxe-checkbox-group fn-inline">
                  <vxe-checkbox
                    v-model="config.importThead"
                    label="isEOnlySourceField"
                    content="导入表头"
                    size="medium"
                  />
                  <vxe-checkbox
                    v-model="config.importTbody"
                    label="isExportOnlySourceField"
                    content="导入表体"
                    size="medium"
                  />
                </div>
              </template>
            </vxe-form-item>
            <vxe-form-item v-if="config.showTheadSelect" title="指定表头行索引" :span="24">
              <vxe-input v-model="config.theadRowIndexStart" placeholder="开始行索引" type="integer" />
              <span class="fgx">-</span>
              <vxe-input v-model="config.theadRowIndexEnd" placeholder="结束行索引" type="integer" />
            </vxe-form-item>
            <vxe-form-item title="点击导入" :span="24">
              <vxe-button
                class="download-button-btn"
                type="text"
                status="primary"
                icon="fa fa-upload"
                content="点击导入文件"
                @click="onImportFileClick"
              />
            </vxe-form-item>
            <vxe-form-item v-if="config.filename !== ''" title="导入文件名" :span="24">
              <div class="idtu-importFile-tip">
                {{ config.filename }}
              </div>
            </vxe-form-item>
          </vxe-form>

        </div>
        <div class="idtu-import-btn">
          <vxe-button
            class="download-button-btn"
            status="primary"
            icon="fa fa-save"
            :disabled="config.filename === ''"
            content="导入"
            @click="onImportClick"
          />
        </div>
      </div>
    </vxe-modal>
  </div>
</template>
<script>
import ImportTableUtilCb from './importTableUtil.js'
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
          reminder: '请使用最新的导入模板,若是第一次,请在下方下载。',
          instructions:
            '导入模版只能为Excel,文件大小不能大于10M,内容为纯文本或数字填写.模板中科目名称和科目编码不能为空,其他信息请查看模板中说明。',
          downloadTemplateText: '下载最新模版',
          downloadTemplate: false, // 是否显示下载模版按钮
          maxSize: 1024 * 1024 * 10, //  接受文件尺寸
          acceptType: 'xlsx', // 接受文件类型
          importThead: true, // 导入表头
          importTbody: true, // 导入表体
          showTheadSelect: true, // 显示表头行索引选择
          theadRowIndexStart: 1, // 表头开始行索引
          theadRowIndexEnd: 1, // 表头结束行索引
          filename: '' // 文件名
        }
      }
    }
  },
  data() {
    return {}
  },
  methods: {
    // 关闭对话框
    closeAndClear() {
      this.importModalVisible = false
    },
    onDownloadTemplateClick() {
      // 下载最新模板
      this.$emit('onDownloadTemplateClick', {}, this)
      if (typeof this.downloadTemplate === 'function') {
        this.downloadTemplate(this)
      }
    },
    onDownloadSampleClick() {
      this.$emit('onDownloadSampleClick', {}, this)
      if (typeof this.downloadSample === 'function') {
        this.downloadSample(this)
      }
    },
    onImportFileClick() {
      // 选择文件
      let self = this
      if (typeof this.reSetConfig === 'function') {
        ImportTableUtilCb.importExcel({ config: this.reSetConfig(this.config) }, (data) => {
          self.curImportData = data
          self.config.filename = data.filename
        })
      } else {
        ImportTableUtilCb.importExcel({ config: this.config }, (data) => {
          self.curImportData = data
          self.config.filename = data.filename
        })
      }
    },
    onImportClick(data) { // 导入
      let self = this
      this.$emit('onImportClick', self.curImportData, this)
      if (typeof this.importSuccess === 'function') {
        this.importSuccess(self.curImportData, this)
      }
    },
    onCancelClick() {
      this.$emit('onCancel', this.content)
      if (typeof this.cancel === 'function') {
        this.cancel(this)
      }
    }
  },
  mounted() {
    if (typeof this.importConfig === 'object') {
      Object.assign(this.config, this.importConfig)
    }
  },
  computed: {},
  watch: {
    importModalVisible: {
      handler(newVal) {
        this.$emit('update:importModalVisible', newVal)
      },
      immediate: true
    },
    config: {
      handler(newVal) {
      },
      deep: true,
      immediate: true
    }
  }
}
</script>
<style lang="scss">
.idtu-template-generate{
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
      box-sizing: border-box;
      padding: 10px;
      .idtu-import-btn:hover {
        opacity: 0.75;
      }
      .idtu-import-tip {
        text-align: left;
        font-size: 14px;
        font-weight: bold;
      }
      .idtu-importFile-tip{
        text-align: left;
        margin-top: 0;
        font-size: 14px;
        font-weight: bold;
        background: transparent;
        color: #3b9afb;
        line-height: 20px;
        padding: 5px 0px;
      }
    }
    .idtu-import-btn {
      margin: 20px 0 0 0;
    }
    .vxe-form--item .vxe-form--item-inner .vxe-form--item-content{
      display:flex;
      .vxe-input.size--medium {
        flex:1;
      }
      .fgx{
        line-height: 32px;
        padding: 0 10px;
      }
    }
  }
}

</style>
