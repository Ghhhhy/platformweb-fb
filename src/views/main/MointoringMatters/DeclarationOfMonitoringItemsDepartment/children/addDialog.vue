<!--监控事项申报-部门 新增页面弹框-->
<template>
  <vxe-modal
    v-model="dialogVisible"
    :title="title"
    width="85%"
    height="80%"
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
                    <div class="sub-title-add" style="width:100px;float:left;margin-top:8px"><font color="red">*</font>&nbsp;事项名称</div>
                    <el-input
                      v-model="declareName"
                      placeholder="请输入事项名称"
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
                      filterable
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
                      :rows="2"
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
                      type="textarea"
                      :rows="2"
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
      <!-- 上传附件 -->
      <BsUploadBak ref="myUpload" :attachment-id="declareCode" :file-list="fileList" :file-data-bak-del.sync="fileDataBakDel" :file-data.sync="fileData" />
    </div>
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
import HttpModule from '@/api/frame/main/Monitoring/Declaration.js'
import { checkPhone } from '@/utils/index.js'
export default {
  name: 'AddDialog',
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
      dialogVisible: true,
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
    dialogClose() {
      this.$parent.dialogVisible = false
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
      if (this.title === '新增') {
        HttpModule.getCode().then(res => {
          if (res.code === '000000') {
            this.declareCode = res.data.bussinesCode
          } else {
            this.$message.error(res.message)
          }
        })
        return
      }
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
    },
    // 保存新增
    doInsert() {
      if (this.declareName === '') {
        this.$message.warning('请输入事项名称')
        return
      }
      if (this.declareMatter === '') {
        this.$message.warning('请输入申报事项')
        return
      }
      if (this.regulationsCode === '') {
        this.$message.warning('请选择政策法规名称')
        return
      }
      if (this.declarePersonTel === '') {
        this.$message.warning('请输入申报人电话')
        return
      }
      if (this.ruleAccord === '') {
        this.$message.warning('请输入规则依据')
        return
      }
      if (this.declareName.length > 20) {
        this.$message.warning('事项名称长度应小于等于20位')
        return
      }
      if (this.declareMatter.length > 200) {
        this.$message.warning('申报事项长度应小于等于200位')
        return
      }
      if (!checkPhone(this.declarePersonTel)) {
        this.$message.warning('请输入正确的电话号码')
        return
      }
      if (this.title === '新增') {
        let param = {
          declareCode: this.declareCode,
          declareName: this.declareName,
          declareMatter: this.declareMatter,
          regulationsCode: this.regulationsCode,
          declarePersonTel: this.declarePersonTel,
          ruleAccord: this.ruleAccord,
          declareTarget: this.declareTarget,
          menuId: this.$store.state.curNavModule.guid,
          menuName: this.$store.state.curNavModule.name
        }
        this.addLoading = true
        HttpModule.addPolicies(param).then(res => {
          this.addLoading = false
          if (res.code === '000000') {
            this.$message.success('新增成功')
            this.$parent.dialogVisible = false
            this.$parent.queryTableDatas()
            this.$parent.queryTableDatasCount()
          } else {
            this.$message.error(res.message)
          }
        })
      } else {
        let param = {
          declareCode: this.declareCode,
          declareName: this.declareName,
          declareMatter: this.declareMatter,
          regulationsCode: this.regulationsCode,
          declarePersonTel: this.declarePersonTel,
          ruleAccord: this.ruleAccord,
          declareTarget: this.declareTarget
        }
        this.addLoading = true
        HttpModule.changePolicies(param).then(res => {
          this.addLoading = false
          if (res.code === '000000') {
            this.$message.success('修改成功')
            this.$parent.dialogVisible = false
            this.$parent.queryTableDatas()
          } else {
            this.$message.error(res.message)
          }
        })
      }
    },
    onInput() {
      console.log('1111111111')
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
