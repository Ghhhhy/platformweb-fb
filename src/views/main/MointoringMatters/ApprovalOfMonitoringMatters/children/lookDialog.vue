<!--监控事项批复新增页面弹框-->
<template>
  <vxe-modal
    v-model="lookdialogVisible"
    title="查看"
    width="70%"
    height="60%"
    :show-footer="true"
    @close="dialogClose"
  >
    <div v-loading="addLoading" class="payVoucherInput">
      <div>
        <div>
          <el-row>
            <el-col :span="12">
              <el-container>
                <el-main width="100%">
                  <el-row>
                    <div class="sub-title-add" style="width:100px;float:left;margin-top:8px"><font color="red">*</font>&nbsp;申报名称</div>
                    <el-input
                      v-model="declareName"
                      :disabled="edit"
                      placeholder="请输入申报名称"
                      style="width:45%"
                    />
                  </el-row>
                </el-main>
              </el-container>
            </el-col>
            <el-col :span="12">
              <el-container>
                <el-main width="100%">
                  <el-row>
                    <div class="sub-title-add" style="width:100px;float:left;margin-top:8px"><font color="red">*</font>&nbsp;政策法规名称</div>
                    <el-select
                      v-model="regulationsCode"
                      :disabled="edit"
                      placeholder="请选择政策法规名称"
                      style="width:45%"
                    >
                      <el-option
                        v-for="item in regulationsCodeoptions"
                        :key="item.regulationsCode"
                        :label="item.regulationsName"
                        :value="item.regulationsCode"
                      />
                    </el-select>
                  </el-row>
                </el-main>
              </el-container>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-container>
                <el-main width="100%">
                  <el-row>
                    <div class="sub-title-add" style="width:100px;float:left;margin-top:8px"><font color="red">*</font>&nbsp;申报事项</div>
                    <el-input
                      v-model="declareMatter"
                      type="textarea"
                      :disabled="edit"
                      placeholder="请输入申报事项"
                      style=" width:45%"
                    />
                  </el-row>
                </el-main>
              </el-container>
            </el-col>
            <el-col :span="12">
              <el-container>
                <el-main width="100%">
                  <el-row>
                    <div class="sub-title-add" style="width:100px;float:left;margin-top:8px">&nbsp;申报目的</div>
                    <el-input
                      v-model="declareTarget"
                      type="textarea"
                      :disabled="edit"
                      placeholder="请输入申报目的"
                      style="width:45%"
                    />
                  </el-row>
                </el-main>
              </el-container>
            </el-col>
          </el-row>
          <el-row />
          <el-row>
            <el-col :span="12">
              <el-container>
                <el-main width="100%">
                  <el-row>
                    <div class="sub-title-add" style="width:100px;float:left;margin-top:8px"><font color="red">*</font>&nbsp;申报人电话</div>
                    <el-input
                      v-model="declarePersonTel"
                      :disabled="edit"
                      placeholder="请输入申报人电话"
                      style="width:45%"
                    />
                  </el-row>
                </el-main>
              </el-container>
            </el-col>
            <el-col :span="12">
              <el-container>
                <el-main width="100%">
                  <el-row>
                    <div class="sub-title-add" style="width:100px;float:left;margin-top:8px">&nbsp;{{ $store.getters.getuserInfo.budgetlevelcode === '4' ? '省' : '' }}监控机构审核意见</div>
                    <el-select
                      v-model="monitorFlowOpinion"
                      placeholder="监控机构审核意见"
                      :disabled="edit"
                      style="width:45%"
                    >
                      <el-option
                        v-for="item in monitorFlowOpinions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select>
                  </el-row>
                </el-main>
              </el-container>
            </el-col>
            <el-col :span="12">
              <el-container>
                <el-main width="100%">
                  <el-row>
                    <div class="sub-title-add" style="width:100px;float:left;margin-top:8px">&nbsp;区本级审核意见</div>
                    <el-input
                      v-model="flowOptionByQu"
                      :disabled="edit"
                      placeholder=""
                      style="width:45%"
                    />
                    <!--<el-select
                      v-model="financeFlowOpinion"
                      placeholder="财政审核意见"
                      :disabled="edit"
                      style="width:45%"
                    >
                      <el-option
                        v-for="item in financeFlowOpinions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select>-->
                  </el-row>
                </el-main>
              </el-container>
            </el-col>
            <el-col :span="12">
              <el-container>
                <el-main width="100%">
                  <el-row>
                    <div class="sub-title-add" style="width:100px;float:left;margin-top:8px">&nbsp;市本级审核意见</div>
                    <el-input
                      v-model="flowOptionByShi"
                      :disabled="edit"
                      placeholder=""
                      style="width:45%"
                    />
                    <!--<el-select
                      v-model="financeFlowOpinion"
                      placeholder="财政审核意见"
                      :disabled="edit"
                      style="width:45%"
                    >
                      <el-option
                        v-for="item in financeFlowOpinions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select>-->
                  </el-row>
                </el-main>
              </el-container>
            </el-col>
          </el-row>
          <!--<el-row>
            <el-col :span="24">
              <el-container>
                <el-main width="100%">
                  <el-row>
                    <div class="sub-title-add" style="width:100px;float:left;margin-top:8px">&nbsp;财政审核意见</div>
                    <el-select
                      v-model="financeFlowOpinion"
                      placeholder="财政审核意见"
                      :disabled="edit"
                      style="width:45%"
                    >
                      <el-option
                        v-for="item in financeFlowOpinions"
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
                    <div class="sub-title-add" style="width:100px;float:left;margin-top:8px">&nbsp;监控机构审核意见</div>
                    <el-select
                      v-model="monitorFlowOpinion"
                      placeholder="监控机构审核意见"
                      :disabled="edit"
                      style="width:45%"
                    >
                      <el-option
                        v-for="item in monitorFlowOpinions"
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
                    <div class="sub-title-add" style="width:100px;float:left;margin-top:8px">&nbsp;监控系统管理员批复意见</div>
                    <el-select
                      v-model="replyFlowOpinion"
                      :disabled="edit"
                      placeholder="监控系统管理员批复意见"
                      style="width:45%"
                    >
                      <el-option
                        v-for="item in replyFlowOpinions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select>
                  </el-row>
                </el-main>
              </el-container>
            </el-col>
          </el-row>-->
        </div>
      </div>
    </div>
    <div slot="footer" style="height: 80px;margin:0 15px">
      <div v-if="showbox" id="bigbox"></div>
      <el-divider style="color:#E7EBF0" />
      <div type="flex" justify="space-around">
        <div>
          <!--附件预览-->
          <vxe-button id="savebutton" status="primary" @click="showAttachmentMask">附件预览</vxe-button>
          <vxe-button @click="dialogClose">确定</vxe-button>
        </div>
      </div>
    </div>
  </vxe-modal>
</template>
<script>
// import { proconf } from '../PoliciesAndRegulationsManagement.js'
import HttpModule from '@/api/frame/main/Monitoring/Declaration.js'
export default {
  name: 'AddDialog',
  components: {},
  computed: {
    curNavModule() {
      return this.$store.state.curNavModule
    }
  },
  props: {
    declareCode: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      edit: true,
      replyFlowOpinion: '',
      flowOptionByShi: '',
      flowOptionByQu: '',
      replyFlowOpinions: [
        { value: '批复通过', label: '批复通过' },
        { value: '退回修改', label: '退回修改' }
      ],
      monitorFlowOpinion: '',
      monitorFlowOpinions: [
        { value: '审核通过', label: '审核通过' },
        { value: '退回修改', label: '退回修改' }
      ],
      financeFlowOpinion: '',
      financeFlowOpinions: [
        { value: '审核通过', label: '审核通过' },
        { value: '退回修改', label: '退回修改' }
      ],
      declareTarget: '',
      declarePersonTel: '',
      regulationsCode: '',
      regulationsCodeoptions: [],
      declareName: '',
      declareMatter: '',
      lookdialogVisible: true,
      addLoading: false,
      token: '',
      isContinuity: false,
      // 文件上传相关参数
      fileList: [],
      fileData: [],
      fileDataBakDel: [],
      attachmentId: '',
      showbox: false
    }
  },
  methods: {
    // 附件预览
    showAttachmentMask() {
      this.$parent.showAttachment1(this.declareCode)
    },
    dialogClose() {
      this.$parent.lookdialogVisible = false
      this.$parent.queryTableDatas()
    },
    // 政策法规编码
    loadRegulationsCode() {
      HttpModule.regulationsLists().then(res => {
        if (res.code === '000000') {
          this.regulationsCodeoptions = res.data.results
        }
      })
    },
    // 修改回显
    showInfo() {
      let params = {
        declareCode: this.declareCode
      }
      this.addLoading = true
      HttpModule.getDetail(params).then(res => {
        this.addLoading = false
        if (res.code === '000000') {
          this.declareName = res.data.declareName
          this.declareMatter = res.data.declareMatter
          this.declareTarget = res.data.declareTarget
          this.declarePersonTel = res.data.declarePersonTel
          this.regulationsCode = res.data.regulationsCode.toString()
          this.financeFlowOpinion = res.data.financeFlowOpinion
          this.monitorFlowOpinion = res.data.monitorFlowOpinion
          this.replyFlowOpinion = res.data.replyFlowOpinion
          this.flowOptionByQu = res.data.flowOptionByQu
          this.flowOptionByShi = res.data.flowOptionByShi
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
    this.loadRegulationsCode()
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
