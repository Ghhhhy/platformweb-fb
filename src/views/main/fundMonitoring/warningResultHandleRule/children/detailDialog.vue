<!--明细弹框-->
<template>
  <div>
    <vxe-modal
      v-model="sdetailVisible"
      title="详细信息"
      width="96%"
      height="90%"
      :show-footer="true"
      @close="dialogClose"
    >
      <div v-loading="addLoading" class="payVoucherInput">
        <div>
          <BsForm
            ref="incomeMsgRef"
            :form-items-config="incomeMsgConfig"
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
import getFormData from '../warningResultHandleRule.js'
import HttpModule from '@/api/frame/main/fundMonitoring/warningResultHandleRule.js'
export default {
  name: 'SDetailDialog',
  computed: {
    curNavModule() {
      return this.$store.state.curNavModule
    }
  },
  props: {
    sdetailTitle: {
      type: String,
      default: ''
    },
    sDetailQueryParam: {
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
      incomeMsgConfig: getFormData('incomeMsgConfig'),
      supplyDataList: getFormData('supplyDataList'),
      sdetailVisible: true,
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
      this.$parent.sdetailVisible = false
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
      let params = this.sDetailQueryParam
      HttpModule.detailQuery(params).then(res => {
        this.addLoading = false
        if (res.code === '000000') {
          this.supplyDataList = { ...res.data, ...res.data.executeData }
          this.warnMsg = res.data.warnMsg
          if (res.data.executeData !== null) {
            this.supplyDataList.payAppAmt = this.moneyFormat(this.supplyDataList.payAppAmt)
            this.supplyDataList.agencyName = res.data.executeData.agencyCode + '-' + res.data.executeData.agencyName
            this.supplyDataList.proName = res.data.executeData.proName
            this.supplyDataList.proName = res.data.executeData.proName
            this.supplyDataList.payTypeName = res.data.executeData.payTypeCode + '-' + res.data.executeData.payTypeName
            this.supplyDataList.isFunName = res.data.executeData.isFunName === 1 ? '是' : '否'
            this.supplyDataList.expFuncName = res.data.executeData.expFuncCode + '-' + res.data.executeData.expFuncName
            this.supplyDataList.depBgtEcoName = res.data.executeData.depBgtEcoCode + '-' + res.data.executeData.depBgtEcoName
            this.supplyDataList.govBgtEcoName = res.data.executeData.govBgtEcoCode + '-' + res.data.executeData.govBgtEcoName
            this.supplyDataList.setModeName = res.data.executeData.setModeCode + '-' + res.data.executeData.setModeName
            this.supplyDataList.isDirName = (res.data.executeData.isDirCode === null ? '' : res.data.executeData.isDirCode) + '-' + (res.data.executeData.isDirName === null ? '' : res.data.executeData.isDirName)
            this.supplyDataList.isSalName = res.data.executeData.isSalCode + '-' + res.data.executeData.isSalName
            this.supplyDataList.manageMofDepName = res.data.executeData.manageMofDepCode + '-' + res.data.executeData.manageMofDepName
            this.supplyDataList.isUnionFunds = res.data.executeData.isUnionFunds + '-' + (res.data.executeData.isUnionFunds === 1 ? '是' : '否')
            this.supplyDataList.fiDate = res.data.executeData.fiDate
            this.supplyDataList.thrExpName = res.data.executeData.thrExpCode + (res.data.executeData.thrExpName === null ? '' : '-' + res.data.executeData.thrExpName)
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
