<!--政策法规管理新增页面弹框-->
<template>
  <vxe-modal
    v-model="dialogVisible"
    :title="title"
    width="80%"
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
                    <div class="sub-title-add" style="width:100px;float:left;margin-top:8px"><font color="red">*</font>&nbsp;政策法规名称</div>
                    <el-input
                      v-model="regulationsName"
                      placeholder="请输入政策法规名称"
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
                    <div class="sub-title-add" style="width:100px;float:left;margin-top:8px"><font color="red">*</font>&nbsp;所属级别</div>
                    <el-select
                      v-model="province"
                      placeholder="请选择所属级别"
                      style="width:45%"
                      @change="changeSysCode"
                    >
                      <el-option
                        v-for="item in provinceOptions"
                        :key="item.id || item.ID"
                        :label="item.dictInfoName || item.rule_name || item.RULE_NAME"
                        :value="item.dictInfoName || item.rule_name || item.RULE_NAME"
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
                    <div class="sub-title-add" style="width:100px;float:left;margin-top:8px"><font color="red">*</font>&nbsp;政策法规描述</div>
                    <el-input
                      v-model="description"
                      placeholder="请输入政策法规描述"
                      style="margin-bottom:15px; width:73.5%"
                    />
                  </el-row>
                </el-main>
              </el-container>
            </el-col>
          </el-row>
        </div>
      </div>
      <!-- 上传附件 -->
      <BsUploadBak ref="myUpload" :attachment-id="regulationsCode" :file-list="fileList" :file-data-bak-del.sync="fileDataBakDel" :file-data.sync="fileData" />
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
// import { proconf } from '../PoliciesAndRegulationsManagement.js'
import HttpModule from '@/api/frame/main/Monitoring/Policies.js'
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
    regulationsCode: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      regulationsName: '',
      description: '',
      dialogVisible: true,
      addLoading: false,
      token: '',
      isContinuity: false,
      // 文件上传相关参数
      fileList: [],
      fileData: [],
      fileDataBakDel: [],
      showbox: false,
      province: '',
      provinceOptions: []
    }
  },
  methods: {
    dialogClose() {
      this.$parent.dialogVisible = false
      this.$parent.queryTableDatas()
    },
    // 修改回显
    showInfo() {
      if (this.title === '新增') {
        HttpModule.getCode().then(res => {
          if (res.code === '000000') {
            this.regulationsCode = res.data.bussinesCode
          } else {
            this.$message.error(res.message)
          }
        })
        return
      }
      let params = {
        regulationsCode: this.regulationsCode
      }
      this.addLoading = true
      HttpModule.getDetail(params).then(res => {
        this.addLoading = false
        if (res.code === '000000') {
          this.regulationsName = res.data.regulationsName
          this.description = res.data.description
          this.province = res.data.province
        } else {
          this.$message.error(res.message)
        }
      })
      this.regulationsCode = this.regulationsCode != null ? this.regulationsCode : this.$ToolFn.utilFn.getUuid()
      let param = {
        billguid: this.regulationsCode,
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
    },
    // 保存新增
    doInsert() {
      if (this.regulationsName === '') {
        this.$message.warning('请输入政策法规名称')
        return
      }
      if (this.province === '') {
        this.$message.warning('请选择所属级别')
        return
      }
      if (this.description === '') {
        this.$message.warning('请输入政策法规描述')
        return
      }
      if (this.regulationsName.length > 100) {
        this.$message.warning('政策法规名称长度应小于等于100位')
        return
      }
      if (this.description.length > 200) {
        this.$message.warning('政策法规描述长度应小于等于200位')
        return
      }
      if (this.title === '新增') {
        let param = {
          regulationsCode: this.regulationsCode,
          regulationsName: this.regulationsName,
          description: this.description,
          province: this.province,
          menuName: this.$store.state.curNavModule.name
        }
        this.addLoading = true
        HttpModule.addPolicies(param).then(res => {
          this.addLoading = false
          if (res.code === '000000') {
            this.$message.success('新增成功')
            this.$parent.dialogVisible = false
            this.$parent.queryTableDatas()
          } else {
            this.$message.error(res.message)
          }
        })
      } else {
        let param = {
          regulationsCode: this.regulationsCode,
          regulationsName: this.regulationsName,
          description: this.description,
          province: this.province
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
    getProvince() {
      this.addLoading = true
      HttpModule.getProvince({ dictType: 'province' }).then(res => {
        this.addLoading = false
        if (res.code === '000000') {
          this.provinceOptions = res.data.results
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
    this.getProvince()
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
