<!--监控事项申报-部门 新增页面弹框-->
<template>
  <vxe-modal
    v-model="lookdialogVisible"
    title="查看"
    width="85%"
    height="70%"
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
                      :disabled="true"
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
                      :disabled="true"
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
                      :disabled="true"
                      type="textarea"
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
                      :disabled="true"
                      type="textarea"
                      placeholder="请输入申报目的"
                      style="width:45%"
                    />
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
                    <div class="sub-title-add" style="width:100px;float:left;margin-top:8px"><font color="red">*</font>&nbsp;申报人电话</div>
                    <el-input
                      v-model="declarePersonTel"
                      :disabled="true"
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
                    <div class="sub-title-add" style="width:100px;float:left;margin-top:8px"><font color="red">*</font>&nbsp;规则依据</div>
                    <el-input
                      v-model="ruleAccord"
                      :disabled="true"
                      type="textarea"
                      placeholder="请输入规则依据"
                      style=" width:45%"
                    />
                  </el-row>
                </el-main>
              </el-container>
            </el-col>
          </el-row>
        </div>
      </div>
      <!--附件预览-->
    </div>
    <div slot="footer" style="height: 80px;margin:0 15px">
      <div v-if="showbox" id="bigbox"></div>
      <el-divider style="color:#E7EBF0" />
      <div type="flex" justify="space-around">
        <div>
          <vxe-button id="savebutton" status="primary" @click="showAttachmentMask">附件预览</vxe-button>
          <vxe-button @click="dialogClose">确认</vxe-button>
        </div>
      </div>
    </div>
  </vxe-modal>
</template>
<script>
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
      declareTarget: '',
      declarePersonTel: '',
      ruleAccord: '',
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
          this.ruleAccord = res.data.ruleAccord
          this.regulationsCode = res.data.regulationsCode.toString()
          this.declareCode = this.declareCode != null ? this.declareCode : this.$ToolFn.utilFn.getUuid()
          let param = {
            billguid: this.declareCode,
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
        } else {
          this.$message.error(res.message)
        }
      })
    }
  },
  watch: {
  },
  created() {
    this.loadRegulationsCode()
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
