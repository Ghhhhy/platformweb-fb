<!--监控规则数据源管理新增页面弹框-->
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
                    <div class="sub-title-add" style="width:120px;float:left;margin-top:8px"><font color="red">*</font>&nbsp;被问询区划</div>
                    <div style="width:240px;float:left;margin-top:2px">
                      <BsTreeInput
                        ref="ruleTree"
                        v-model="askProvince"
                        :datas="askProvinceOptions"
                        :reloaddata="false"
                        :isleaf="true"
                        @input="selectProvince"
                      />
                    </div>
                    <!-- <el-select
                      v-model="askProvince"
                      style="width:45%"
                      @change="changeSysCode"
                    >
                      <el-option
                        v-for="item in askProvinceOptions"
                        :key="item.id"
                        :label="item.label"
                        :value="item.label"
                      />
                    </el-select> -->
                  </el-row>
                </el-main>
              </el-container>
            </el-col>
            <el-col :span="12">
              <el-container>
                <el-main width="100%">
                  <el-row>
                    <div class="sub-title-add" style="width:120px;float:left;margin-top:8px"><font color="red">*</font>&nbsp;被问询单位</div>
                    <div style="width:240px;float:left;margin-top:2px">
                      <BsTreeInput
                        ref="ruleTree"
                        v-model="askAgency"
                        :datas="askAgencyOptions"
                        :reloaddata="false"
                        :isleaf="true"
                        @input="selectAgency"
                      />
                    </div>
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
                    <div class="sub-title-add" style="width:120px;float:left;margin-top:8px"><font color="red">*</font>&nbsp;问询事项</div>
                    <el-input
                      v-model="askName"
                      placeholder="请输入问询事项"
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
                    <div class="sub-title-add" style="width:120px;float:left;margin-top:8px"><font color="red">*</font>&nbsp;问询函编码</div>
                    <el-input
                      v-model="askCode"
                      :disabled="true"
                      placeholder="请输入问询函编码"
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
                    <div class="sub-title-add" style="width:120px;float:left;margin-top:8px"><font color="red">*</font>&nbsp;问询函类型</div>
                    <el-select
                      v-model="askTypeName"
                      style="width:45%"
                    >
                      <el-option
                        v-for="item in askTypeNameOptions"
                        :key="item.id"
                        :label="item.askTypeName"
                        :value="item.askTypeName"
                      />
                    </el-select>
                  </el-row>
                </el-main>
              </el-container>
            </el-col>
            <el-col :span="20">
              <el-container>
                <el-main width="100%">
                  <el-row>
                    <div class="sub-title-add" style="width:120px;float:left;margin-top:8px">&nbsp;类型描述</div>
                    <el-input
                      v-model="askDesc"
                      type="textarea"
                      :rows="2"
                      placeholder="请输入问询函类型描述"
                      style="margin-bottom:15px; width:85%"
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
          <vxe-button id="savebutton" status="primary" @click="doInsert">生成</vxe-button>
        </div>
      </div>
    </div>
  </vxe-modal>
</template>
<script>
// import { proconf } from '../PoliciesAndRegulationsManagement.js'
import HttpModule from '@/api/frame/main/baseConfigManage/InquiryLetter.js'
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
    dataSourceCode: {
      type: String,
      default: ''
    },
    modifyData: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      askCode: '',
      askName: '',
      askDesc: '',
      dialogVisible: true,
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
      treeQueryparams: { elementCode: 'admdiv', province: this.$store.state.userInfo.province, year: this.$store.state.userInfo.year, wheresql: 'and code like \'' + 61 + '%\'' },
      // treeQueryparams: { elementcode: 'admdiv', province: '610000000', year: '2021', wheresql: 'and code like \'' + 61 + '%\'' },
      askProvinceCode: '',
      askProvinceId: '',
      askProvinceName: '',
      askAgencyCode: '',
      askAgencyId: '',
      askAgencyName: '',
      askTypeName: '',
      askTypeNameOptions: []
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
        this.attachmentId = this.$ToolFn.utilFn.getUuid()
        return
      }
      this.askCode = this.modifyData.askCode
      this.askName = this.modifyData.askName
      this.askDesc = this.modifyData.askDesc
      this.askTypeName = this.modifyData.askTypeName
      this.askProvince = this.modifyData.askProvinceId + '##' + this.modifyData.askProvinceCode + '##' + this.modifyData.askProvinceName
      this.askAgency = this.modifyData.askAgencyId + '##' + this.modifyData.askAgencyCode + '##' + this.modifyData.askAgencyName
      this.askAgencyCode = this.modifyData.askAgencyCode
      this.askAgencyId = this.modifyData.askAgencyId
      this.askAgencyName = this.modifyData.askAgencyName
      this.askProvinceCode = this.modifyData.askProvinceCode
      this.askProvinceId = this.modifyData.askProvinceId
      this.askProvinceName = this.modifyData.askProvinceName
      this.attachmentId = this.modifyData.attachmentId
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
    },
    // 选择业务系统
    changeSysCode(val) {
      console.log(val)
      this.SysparentId = val
      this.businessModuleCode = ''
      let busName = this.businessSystemCodeoptions.find(item => {
        return item.id === val
      })
      this.businessSystemName = busName.businessName
      this.getModLists()
    },
    // 选择业务模块
    changeModCode(val) {
      console.log(val)
      this.ModparentId = val
      this.businessFunctionCode = ''
      let busName = this.businessModuleCodeoptions.find(item => {
        return item.id === val
      })
      this.businessModuleName = busName.businessName
      // this.getFunLists()
    },
    // 保存新增的计划信息
    doInsert() {
      if (this.askName === '') {
        this.$message.warning('请输入问询函类型名称')
        return
      }
      if (this.askName.length > 20) {
        this.$message.warning('问询函类型名称长度应小于等于20位')
        return
      }
      if (this.askDesc.length > 200) {
        this.$message.warning('问询函类型描述应小于等于200位')
        return
      }
      if (this.title === '新增') {
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
            this.$parent.dialogVisible = false
            this.$parent.queryTableDatas()
          } else {
            this.$message.error(res.message)
          }
        })
      }
    },
    selectProvince(val) {
      let valArr = val.split('##')
      this.askProvinceName = valArr[2]
      this.askProvinceCode = valArr[1]
      this.askProvinceId = valArr[0]
      this.getWhereTree()
    },
    selectAgency(val) {
      let valArr = val.split('##')
      this.askAgencyName = valArr[2]
      this.askAgencyCode = valArr[1]
      this.askAgencyId = valArr[0]
    },
    getAskCode() {
      HttpModule.getAskCode().then(res => {
        if (res.code === '000000') {
          this.askCode = res.data
        } else {
          this.$message.error(res.message)
        }
      })
    },
    getLeftTreeData() {
      let that = this
      HttpModule.getLeftTree(that.treeQueryparams).then(res => {
        if (res.rscode === '100000') {
          let treeResdata = that.getRegulationChildrenData(res.data)
          that.askProvinceOptions = treeResdata
        } else {
          this.$message.error('左侧树加载失败')
        }
      })
    },
    getRegulationChildrenData(datas) {
      let that = this
      datas.forEach(item => {
        item.label = item.text
        if (item.children && item.children.length > 0) {
          that.getRegulationChildrenData(item.children)
          item.leaf = false
        } else {
          item.leaf = true
        }
      })

      return datas
    },
    getChildrenNewData(datas) {
      let that = this
      datas.forEach(item => {
        item.label = item.text
        if (item.children && item.children.length > 0) {
          that.getChildrenNewData(item.children)
          item.leaf = false
        } else {
          item.leaf = true
        }
      })

      return datas
    },
    getWhereTree() {
      let param = {
        wheresql: 'and province =' + this.$store.state.userInfo.province,
        elementCode: 'AGENCY',
        // elementCode: 'AGENCY',
        year: this.$store.state.userInfo.year,
        province: this.askProvinceCode ? this.askProvinceCode : this.$store.state.userInfo.province
      }
      if (this.askProvinceCode) {
        param.wheresql = 'and province =' + this.askProvinceCode
      }
      HttpModule.getTreewhere(param).then(res => {
        let treeData = this.getChildrenNewData(res.data)
        this.askAgencyOptions = treeData
      })
    },
    getTypeList() {
      HttpModule.getTypeList().then(res => {
        this.askTypeNameOptions = res.data
      })
    }
  },
  watch: {
  },
  created() {
    if (this.title === '新增') {
      this.getAskCode()
    }
    this.showInfo()
    this.getLeftTreeData()
    this.getWhereTree()
    this.getTypeList()
    // this.getModLists()
    // this.getFunLists()
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
