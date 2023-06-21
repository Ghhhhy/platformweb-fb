<!--处理弹框-->
<template>
  <div>
    <vxe-modal
      v-model="dialogVisible"
      :title="title"
      width="96%"
      height="90%"
      :show-footer="true"
      @close="dialogClose"
    >
      <div v-loading="addLoading" class="payVoucherInput">
        <div>
          <div style="color:#40aaff;margin-bottom:5px;font-size:16px;font-weight:bold">疑似违规信息</div>
          <BsForm
            ref="createRef"
            class="createRef"
            :form-items-config="createConfig"
            :form-data-list="createDataList"
            :form-validation-config="createValidate"
            :is-editable="isCreate"
            title-align="top"
            @itemChange="itemChange"
          />
          <div style="color:#40aaff;margin-bottom:5px;font-size:16px;font-weight:bold">核实反馈信息</div>
          <BsForm
            ref="createRef"
            class="createRef"
            :form-items-config="createConfig2"
            :form-data-list="createDataList"
            :form-validation-config="createValidate"
            :is-editable="isCreate"
            @itemChange="itemChange"
          />
          <template v-if="tabCode === 'dzg-hsfk'">
            <div style="color:#40aaff;margin-bottom:5px;font-size:16px;font-weight:bold">核实认定信息</div>
            <BsForm
              ref="createRef"
              class="createRef"
              :form-items-config="createConfig3"
              :form-data-list="createDataList"
              :form-validation-config="createValidate"
              :is-editable="isCreate"
              title-align="top"
              @itemChange="itemChange"
            />
            <div style="color:#40aaff;margin-bottom:5px;font-size:16px;font-weight:bold">整改反馈意见</div>
            <BsForm
              ref="createRef"
              class="createRef"
              :form-items-config="createConfig4"
              :form-data-list="createDataList"
              :form-validation-config="createValidate"
              :is-editable="isCreate"
              @itemChange="itemChange"
            />
          </template>
        </div>
        <BsUploadBak
          ref="myUpload"
          :disabled="false"
          :allow-delete="false"
          :allow-download="true"
          :allow-preview="true"
          :is-upload="true"
          :attachment-id="attachmentid3"
          :file-list="fileList3"
          :file-data-bak-del.sync="fileDataBakDel3"
          :file-data.sync="fileData3"
        />
      </div>
      <div slot="footer" style="height: 80px;margin:0 15px">
        <div v-if="showbox" id="bigbox"></div>
        <el-divider style="color:#E7EBF0" />
        <div type="flex" justify="space-around">
          <div>
            <vxe-button status="primary" @click="doFeedback">确定</vxe-button>
            <vxe-button @click="dialogClose">取消</vxe-button>
          </div>
        </div>
      </div>
    </vxe-modal>
  </div>
</template>
<script>
import { proconf } from './createProcessing.js'
import HttpModule from '@/api/frame/main/fundMonitoring/createProcessing.js'
import { checkPhone } from '@/utils/index.js'
export default {
  name: 'HandleDialog',
  computed: {

  },
  props: {

  },
  data() {
    return {
      tabCode: 'dcl-hsfk',
      title: '监控处理单',
      dialogVisible: false,
      createConfig: proconf.createConfig,
      createConfig2: proconf.createConfig2,
      createConfig3: proconf.createConfig,
      createConfig4: proconf.createConfig2,
      createValidate: {
        violateType: [
          { required: true, message: '请选择违规类型', trigger: 'change' }
        ]
      },
      createDataList: proconf.createDataList,
      attachmentid3: '',
      isCreate: true,
      showbox: false,
      fileList3: [{}],
      fileData3: [],
      fileDataBakDel3: [],
      addLoading: false,
      param5: {}
      // ----
    }
  },
  methods: {
    dialogClose() {
      this.dialogVisible = false
    },
    itemChange({ $form, property, itemValue, data }, bsform) {
      console.log('fuck')
      // form表单联动当前字段change事件代理
      switch (property) {
        case 'violateType' :
          this.$refs.createRef?.$refs?.form?.clearValidate?.()
          this.createDataList.violateType = itemValue
          break
        case 'handleType' :
          this.createDataList.handleType = itemValue
          break
        case 'handleResult' :
          this.createDataList.handleResult = itemValue
          break
        default :
          break
      }
    },
    // 反馈
    doFeedback() {
      if (this.phone2 && !checkPhone(this.phone2)) {
        this.$message.warning('请输入正确的电话号码')
        return
      }
      let param = {}
      HttpModule.handleFeedback(param).then(res => {
        this.addLoading = false
        if (res.code === '000000') {
          this.$message.success('操作成功')
          this.$parent.dialogVisible = false
          this.$parent.getdata()
        } else {
          this.$message.error(res.message)
        }
      })
    }
  },
  watch: {
  },
  created() {

  }
}
</script>
<style lang="scss" scoped>
 /deep/ .createRef{
  .vxe-form--item.vxe-col--24{
     .vxe-form--item-inner{
      align-items: flex-start !important;
    }
  }
  .vxe-textarea--inner[disabled]{
    background: var(--common-background) !important;
  }
}

</style>
