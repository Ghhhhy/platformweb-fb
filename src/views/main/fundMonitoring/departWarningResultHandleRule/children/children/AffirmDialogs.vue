<template>
  <vxe-modal
    v-model="affirmDialogVisibles"
    :title="title"
    width="40%"
    height="80%"
    :show-footer="true"
    @close="dialogClose"
  >
    <div v-loading="addLoading" class="payVoucherInput">
      <div>
        <div>
          <el-row>
            <el-col :span="24">
              <el-container>
                <el-main width="100%">
                  <el-row>
                    <div class="sub-title-add" style="width:90px;float:left;margin-top:2px"><font color="red">*</font>&nbsp;认定结果</div>
                    <el-radio v-model="affirmResult" label="1" @change="changeAffirm">正常</el-radio>
                    <el-radio v-model="affirmResult" label="2" @change="changeAffirm">违规</el-radio>
                  </el-row>
                </el-main>
              </el-container>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-container>
                <el-main width="100%">
                  <el-row>
                    <div class="sub-title-add" style="width:90px;float:left;margin-top:8px"><font color="red">*</font>&nbsp;违规类型</div>
                    <el-select v-if="affirmResult !== '1'" v-model="warnType" placeholder="请选择" style="width:80%">
                      <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select>
                    <el-select v-if="affirmResult === '1'" v-model="warnType" placeholder="请选择" style="width:80%">
                      <el-option
                        v-for="item in options1"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select>
                  </el-row>
                </el-main>
              </el-container>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-container>
                <el-main width="100%">
                  <el-row>
                    <div class="sub-title-add" style="width:90px;float:left;margin-top:15px"><font color="red">*</font>&nbsp;基本情况描述</div>
                    <el-input
                      v-model="matterDetail"
                      type="textarea"
                      :rows="5"
                      placeholder="请输入基本情况描述"
                      style="margin-bottom: 15px; width: 80%"
                    />
                  </el-row>
                </el-main>
              </el-container>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-container>
                <el-main width="100%">
                  <el-row>
                    <div class="sub-title-add" style="width:90px;float:left;margin-top:15px"><font color="red">*</font>&nbsp;整改要求</div>
                    <el-input
                      v-model="rectifyAsk"
                      type="textarea"
                      :rows="5"
                      placeholder="请输入整改要求"
                      style="margin-bottom: 15px; width: 80%"
                    />
                  </el-row>
                </el-main>
              </el-container>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-container>
                <el-main width="100%">
                  <el-row>
                    <div class="sub-title-add" style="width:90px;float:left;margin-top:8px">&nbsp;退回金额</div>
                    <el-input
                      v-model="returnAmt"
                      placeholder="请输入退回金额"
                      style="width:80%"
                    />
                  </el-row>
                </el-main>
              </el-container>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-container>
                <el-main width="100%">
                  <el-row>
                    <div class="sub-title-add" style="width:90px;float:left;margin-top:8px">&nbsp;调帐金额</div>
                    <el-input
                      v-model="transferAmt"
                      placeholder="请输入调帐金额"
                      style="width:80%"
                    />
                  </el-row>
                </el-main>
              </el-container>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-container>
                <el-main width="100%">
                  <el-row>
                    <div class="sub-title-add" style="width:90px;float:left;margin-top:8px">&nbsp;其他金额</div>
                    <el-input
                      v-model="otherAmt"
                      placeholder="请输入其他金额"
                      style="width:80%"
                    />
                  </el-row>
                </el-main>
              </el-container>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
    <BsUploadBak ref="myUpload" :attachment-id="attachmentId" :file-list="fileList" :file-data-bak-del.sync="fileDataBakDel" :file-data.sync="fileData" />
    <div slot="footer" style="height: 80px;margin:0 15px">
      <div v-if="showbox" id="bigbox"></div>
      <el-divider style="color:#E7EBF0" />
      <div type="flex" justify="space-around">
        <div>
          <vxe-button @click="dialogClose">取消</vxe-button>
          <vxe-button id="savebutton" status="primary" @click="doInsert">保存</vxe-button>
        </div>
      </div>
    </div>
  </vxe-modal>
</template>
<script>
import HttpModule from '@/api/frame/main/fundMonitoring/warningResultHandleRule.js'
export default {
  name: 'AddDialogs',
  components: {},
  computed: {
    curNavModule() {
      return this.$store.state.curNavModule
    }
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    selectData: {
      type: Object,
      default () {
        return {}
      }
    },
    selectIds: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data() {
    return {
      affirmResult: '1',
      options: [],
      options1: [{
        value: '正常',
        label: '正常'
      }],
      diBillId: '',
      rectifyDetail: '',
      rectifyAsk: '',
      warnType: '',
      returnAmt: '',
      transferAmt: '',
      otherAmt: '',
      dfrFileCode: '',
      askCode: '',
      askName: '',
      askDesc: '',
      affirmDialogVisibles: true,
      addLoading: false,
      token: '',
      isContinuity: false,
      attachmentId: '',
      showbox: false,
      // 文件上传相关参数
      fileList: [],
      fileData: [],
      fileDataBakDel: [],
      declareCode: '',
      askProvince: '',
      askProvinceOptions: [],
      askAgency: '',
      askAgencyOptions: [],
      askProvinceCode: '',
      askProvinceId: '',
      askProvinceName: '',
      askAgencyCode: '',
      askAgencyId: '',
      askAgencyName: '',
      askTypeName: '',
      detailType: '',
      matterDetail: '',
      fiRuleCode: '',
      affirmFileCode: '',
      askTypeNameOptions: []
    }
  },
  methods: {
    changeAffirm() {
      this.warnType = ''
    },
    dialogClose() {
      this.$emit('close')
      // this.$parent.showInfo()
      // this.$parent.affirmDialogVisibles = false
    },
    // 修改回显
    showInfo() {
      this.affirmResult = this.selectData.affirmResult
      this.warnType = this.selectData.warnType
      this.matterDetail = this.selectData.matterDetail
      this.rectifyAsk = this.selectData.rectifyAsk
      this.returnAmt = this.selectData.returnAmt
      this.transferAmt = this.selectData.transferAmt
      this.otherAmt = this.selectData.otherAmt
      this.affirmFileCode = this.selectData.affirmFileCode
      this.diBillId = this.selectData.diBillId
      if (this.title === '认定处理单') {
        this.attachmentId = this.$ToolFn.utilFn.getUuid()
      } else {
        this.attachmentId = this.selectData.affirmFileCode
      }
      if (this.attachmentId != null) {
        const param = {
          billguid: this.attachmentId,
          year: this.$store.state.userInfo.year,
          province: this.$store.state.userInfo.province
        }
        HttpModule.getFile(param).then(res => {
          if (res.rscode === '100000') {
            // 获取附件信息
            this.fileData = JSON.parse(res.data)
          } else {
            this.$message.error(res.result)
          }
        })
      }
      this.getViolationType()
    },
    // 保存新增的计划信息
    doInsert() {
      if (this.affirmResult === '') {
        this.$message.warning('请输入基本情况描述')
        return
      }
      if (this.rectifyAsk === '') {
        this.$message.warning('请输入整改要求')
        return
      }
      if (this.warnType === '') {
        this.$message.warning('请选择违规类型')
        return
      }
      if (this.title === '认定处理单' || this.title === '修改认定处理单') {
        let param = {
          affirmResult: this.affirmResult,
          matterDetail: this.matterDetail,
          rectifyAsk: this.rectifyAsk,
          warnType: this.warnType,
          returnAmt: this.returnAmt || 0,
          transferAmt: this.transferAmt || 0,
          otherAmt: this.otherAmt || 0,
          diBillId: this.diBillId,
          affirmFileCode: this.attachmentId
        }
        this.addLoading = true
        HttpModule.updateYellow(param).then(res => {
          this.addLoading = false
          if (res.code === '000000') {
            this.$message.success('认定成功')
            this.dialogClose()
          } else {
            this.$message.error(res.message)
          }
        })
      } else if (this.title === '批量认定处理单') {
        console.info('批量认定处理单')
        let param = {
          affirmResult: this.affirmResult,
          matterDetail: this.matterDetail,
          rectifyAsk: this.rectifyAsk,
          warnType: this.warnType,
          returnAmt: this.returnAmt || 0,
          transferAmt: this.transferAmt || 0,
          otherAmt: this.otherAmt || 0,
          affirmFileCode: this.attachmentId,
          selectIds: this.selectIds
        }
        this.addLoading = true
        HttpModule.batchUpdateYellow(param).then(res => {
          this.addLoading = false
          if (res.code === '000000') {
            this.$message.success('认定成功')
            this.dialogClose()
          } else {
            this.$message.error(res.message)
          }
        })
      } else {
        let param = {
          askProvinceCode: this.askProvinceCode,
          askProvinceName: this.askProvinceName,
          askProvinceId: this.askProvinceId,
          askAgencyName: this.askAgencyName,
          askAgencyCode: this.askAgencyCode,
          askAgencyId: this.askAgencyId,
          askCode: this.askCode,
          askName: this.askName,
          askDesc: this.askDesc,
          askTypeName: this.askTypeName,
          attachmentId: this.attachmentId
        }
        this.addLoading = true
        HttpModule.changePolicies(param).then(res => {
          this.addLoading = false
          if (res.code === '000000') {
            this.$message.success('修改成功')
            this.dialogClose()
          } else {
            this.$message.error(res.message)
          }
        })
      }
    },
    // 获取违规类型  lll 2023/5/8
    getViolationType() {
      let params = {
        page: 1,
        size: 99999
      }
      HttpModule.queryViolationType(params).then(res => {
        if (res.code === '000000') {
          res.data.results.map(v => {
            v.value = v.name
            v.label = v.name
          })
          this.options = res.data.results
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
