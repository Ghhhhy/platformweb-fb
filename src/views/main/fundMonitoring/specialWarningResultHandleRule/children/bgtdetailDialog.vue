<!--明细弹框-->
<template>
  <div>
    <vxe-modal
      v-model="bgtdetailVisible"
      title="指标详细信息"
      width="96%"
      height="90%"
      :show-footer="true"
      @close="dialogClose"
    >
      <div v-loading="addLoading" class="payVoucherInput">
        <div>
          <BsForm
            ref="bgtMsgRef"
            :form-items-config="bgtMsgConfig"
            :form-data-list="supplyDataList"
          />
        </div>
      </div>
      <div slot="footer" style="height: 80px;margin:0 15px">
        <div v-if="showbox" id="bigbox"></div>
        <el-divider style="color:#E7EBF0" />
        <div type="flex" justify="space-around">
          <div>
            <vxe-button @click="dialogClose">关闭</vxe-button>
          </div>
        </div>
      </div>
    </vxe-modal>
  </div>
</template>
<script>
import getFormData from '../specialWarningResultHandleRule.js'
import HttpModule from '@/api/frame/main/fundMonitoring/warningResultHandleRule.js'
export default {
  name: 'BgtDetailDialog',
  computed: {
    curNavModule() {
      return this.$store.state.curNavModule
    }
  },
  props: {
    bgtdetailTitle: {
      type: String,
      default: ''
    },
    bgtDetailQueryParam: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      tableFooterConfig: {
        showFooter: false
      },
      edit: false,
      handleResult: '',
      handlePersonName: '',
      handleTime: '',
      handleDesc: '',
      handletableHsData: [],
      bgtMsgConfig: getFormData('bgtMsgConfig'),
      supplyDataList: getFormData('supplyDataList'),
      bgtdetailVisible: true,
      addLoading: false,
      token: '',
      isContinuity: false,
      // 文件上传相关参数
      fileList: [],
      fileData: [],
      fileDataBakDel: [],
      attachmentId: '',
      showbox: false,
      showbtn: false,
      dialogVisibleShow: false,
      DetailData: {}
    }
  },
  methods: {
    dialogClose() {
      this.$parent.bgtdetailVisible = false
    },
    moneyFormat(amt) {
      const num = Math.round(amt * 100) / 100
      let c = (num.toString().indexOf('.') !== -1) ? num.toLocaleString() : num.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
      if (c.length >= 3 & c.indexOf('.', c.length - 2) === c.length - 2) {
        c = c + '0'
      }
      if (c.indexOf('.') === -1) {
        c = c + '.00'
      }
      return c
    },
    // 回显
    showInfo() {
      this.addLoading = true
      let params = this.bgtDetailQueryParam
      console.info('bgtDetailQueryParam ==' + this.bgtDetailQueryParam)
      HttpModule.detailQueryBgt(params).then(res => {
        this.addLoading = false
        if (res.code === '000000') {
          this.supplyDataList = { ...res.data, ...res.data.execData }
          this.warnMsg = res.data.warnMsg
          if (res.data.execData !== null) {
            this.supplyDataList.trackProName = res.data.execData.trackProName
            this.supplyDataList.budgetLevelName = res.data.execData.budgetLevelName
            this.supplyDataList.createTime = res.data.execData.createTime
            this.supplyDataList.curAmt = this.moneyFormat(res.data.execData.curAmt)
            this.supplyDataList.amount = this.moneyFormat(res.data.execData.amount)
          }
        } else {
          this.$message.error(res.message)
        }
      })
    }
  },
  watch: {
  },
  created() {
    this.showInfo()
  }
}
</script>
<style lang="scss">
  .payVoucherInput {
    margin: 15px;
    .el-card {
      margin-top: 0
    }
  }
  .vxe-modal--wrapper .vxe-modal--box {
    z-index: 0;
  }
  #bigbox {
    width: 100%;
    height: 100%;
    background-color: white;
    z-index: 10;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: .3;
  }
  .el-row-item .font-set-small .hline{
    width:72px;
  }
</style>
