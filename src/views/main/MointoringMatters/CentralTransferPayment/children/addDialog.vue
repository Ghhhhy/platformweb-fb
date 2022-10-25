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
                    <div class="sub-title-add" style="width:120px;float:left;margin-top:8px"><font color="red">*</font>&nbsp;中央项目编码</div>
                    <el-input
                      v-model="proCode"
                      placeholder="请输入中央项目编码"
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
                    <div class="sub-title-add" style="width:120px;float:left;margin-top:8px"><font color="red">*</font>&nbsp;中央项目名称</div>
                    <el-input
                      v-model="proName"
                      placeholder="请输入中央项目名称"
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
                    <div class="sub-title-add" style="width:120px;float:left;margin-top:8px">&nbsp;资金类别编码</div>
                    <el-input
                      v-model="fundCategoryCode"
                      placeholder="请输入资金类别编码"
                      style="margin-bottom:15px; width:45%"
                    />
                  </el-row>
                </el-main>
              </el-container>
            </el-col>
            <el-col :span="12">
              <el-container>
                <el-main width="100%">
                  <el-row>
                    <div class="sub-title-add" style="width:120px;float:left;margin-top:8px">&nbsp;资金类别名称</div>
                    <el-input
                      v-model="fundCategoryName"
                      placeholder="请输入资金类别名称"
                      style="margin-bottom:15px; width:45%"
                    />
                  </el-row>
                </el-main>
              </el-container>
            </el-col>
            <el-col :span="12">
              <el-container>
                <el-main width="100%">
                  <el-row>
                    <div class="sub-title-add" style="width:120px;float:left;margin-top:8px"><font color="red">*</font>&nbsp;热点分类编码</div>
                    <el-input
                      v-model="cfsHotTopicCateCode"
                      placeholder="请输入"
                      style="width:45%"
                    />
                    <!--<el-select-->
                    <!--  v-model="cfsHotTopicCateCode"-->
                    <!--  placeholder="请选择热点分类编码"-->
                    <!--  style="width:45%"-->
                    <!--&gt;-->
                    <!--  <el-option-->
                    <!--    v-for="item in cfsHotTopicCateCodeOptions"-->
                    <!--    :key="item.value"-->
                    <!--    :label="item.label"-->
                    <!--    :value="item.label"-->
                    <!--  />-->
                    <!--</el-select>-->
                  </el-row>
                </el-main>
              </el-container>
            </el-col>
            <el-col :span="12">
              <el-container>
                <el-main width="100%">
                  <el-row>
                    <div class="sub-title-add" style="width:120px;float:left;margin-top:8px"><font color="red">*</font>&nbsp;热点分类名称</div>
                    <el-input
                      v-model="cfsHotTopicCateName"
                      placeholder="请输入"
                      style="width:45%"
                    />
                    <!--<el-select-->
                    <!--  v-model="cfsHotTopicCateName"-->
                    <!--  placeholder="请选择热点分类名称"-->
                    <!--  style="width:45%"-->
                    <!--&gt;-->
                    <!--  <el-option-->
                    <!--    v-for="item in cfsHotTopicCateNameOptions"-->
                    <!--    :key="item.value"-->
                    <!--    :label="item.label"-->
                    <!--    :value="item.label"-->
                    <!--  />-->
                    <!--</el-select>-->
                  </el-row>
                </el-main>
              </el-container>
            </el-col>
            <el-col :span="12">
              <el-container>
                <el-main width="100%">
                  <el-row>
                    <div class="sub-title-add" style="width:120px;float:left;margin-top:8px">父级项目编码</div>
                    <el-select
                      v-model="proFundCode"
                      placeholder="请选择父级项目编码"
                      style="width:45%"
                      @change="changePro"
                    >
                      <el-option
                        v-for="item in proFundCodeOptions"
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
                    <div class="sub-title-add" style="width:120px;float:left;margin-top:8px">父级项目名称</div>
                    <el-select
                      v-model="proFundName"
                      placeholder="请选择父级项目名称"
                      style="width:45%"
                    >
                      <el-option
                        v-for="item in proFundNameOptions"
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
          </el-row>
        </div>
      </div>
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
import HttpModule from '@/api/frame/main/baseConfigManage/CentralTransferPayment.js'
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
      id: '',
      proCode: '',
      proName: '',
      askTypeCode: '',
      fundCategoryCode: '',
      fundCategoryName: '',
      cfsHotTopicCateCode: '',
      cfsHotTopicCateName: '',
      proFundCode: '',
      proFundName: '',
      cfsHotTopicCateCodeOptions: [
        { value: '1', label: '01' },
        { value: '2', label: '02' },
        { value: '3', label: '09' }
      ],
      cfsHotTopicCateNameOptions: [
        { value: '1', label: '中央直达资金' },
        { value: '2', label: '中央参照直达资金' },
        { value: '3', label: '其他' }
      ],
      proFundCodeOptions: [
        { value: '1', label: '1' },
        { value: '2', label: '2' },
        { value: '3', label: '3' },
        { value: '4', label: '4' }
      ],
      proFundNameOptions: [
        { value: '一般性转移支付', label: '一般性转移支付' },
        { value: '共同财政事权转移支付', label: '共同财政事权转移支付' },
        { value: '专项转移支付', label: '专项转移支付' },
        { value: '支持基层落实减税降费和重点民生等专项转移支付', label: '支持基层落实减税降费和重点民生等专项转移支付' }
      ],
      dialogVisible: true,
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
      this.proCode = this.modifyData.proCode
      this.proName = this.modifyData.proName
      this.fundCategoryCode = this.modifyData.fundCategoryCode
      this.fundCategoryName = this.modifyData.fundCategoryName
      this.cfsHotTopicCateCode = this.modifyData.cfsHotTopicCateCode
      this.cfsHotTopicCateName = this.modifyData.cfsHotTopicCateName
      this.proFundCode = this.modifyData.proFundCode
      this.proFundName = this.modifyData.proFundName
      this.id = this.modifyData.id
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
    // 业务系统下拉树
    getSysLists() {
      const param = {
        businessType: 1,
        parentId: 0
      }
      this.addLoading = true
      HttpModule.getbusLists(param).then(res => {
        this.addLoading = false
        if (res.code === '000000') {
          this.businessSystemCodeoptions = res.data.results
          if (this.$parent.dialogTitle === '新增') {
            this.businessSystemCode = '1'
            this.changeSysCode(this.businessSystemCode)
          }
        } else {
          this.$message.error(res.message)
        }
      })
    },
    // 业务模块下拉树
    getModLists() {
      const param = {
        businessType: 2,
        parentId: this.SysparentId
      }
      this.addLoading = true
      HttpModule.getbusLists(param).then(res => {
        this.addLoading = false
        if (res.code === '000000') {
          this.businessModuleCodeoptions = res.data.results
        } else {
          this.$message.error(res.message)
        }
      })
    },
    changePro(val) {
      console.log(val)
      if (val === '1') {
        this.proFundName = '一般性转移支付'
      } else if (val === '2') {
        this.proFundName = '共同财政事权转移支付'
      } else if (val === '3') {
        this.proFundName = '专项转移支付'
      } else {
        this.proFundName = '支持基层落实减税降费和重点民生等专项转移支付'
      }
    },
    // 保存新增的计划信息
    doInsert() {
      if (this.proCode === '') {
        this.$message.warning('请输入中央项目编码')
        return
      }
      if (this.proName === '') {
        this.$message.warning('请输入中央项目名称')
        return
      }
      // if (this.fundCategoryCode === '') {
      //   this.$message.warning('请输入资金类别编码')
      //   return
      // }
      // if (this.fundCategoryName === '') {
      //   this.$message.warning('请输入资金类别名称')
      //   return
      // }
      if (this.cfsHotTopicCateCode === '') {
        this.$message.warning('请选择热点分类编码')
        return
      }
      if (this.cfsHotTopicCateName === '') {
        this.$message.warning('请选择热点分类名称')
        return
      }
      // if (this.askTypeName.length > 20) {
      //   this.$message.warning('问询函类型名称长度应小于等于20位')
      //   return
      // }
      // if (this.askTypeDesc.length > 200) {
      //   this.$message.warning('问询函类型描述应小于等于200位')
      //   return
      // }
      let param = {
        id: this.id || '',
        proCode: this.proCode,
        proName: this.proName,
        fundCategoryCode: this.fundCategoryCode,
        fundCategoryName: this.fundCategoryName,
        cfsHotTopicCateCode: this.cfsHotTopicCateCode,
        cfsHotTopicCateName: this.cfsHotTopicCateName,
        proFundCode: this.proFundCode,
        proFundName: this.proFundName
      }
      if (this.title === '新增') {
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
    }
  },
  watch: {
  },
  created() {
    this.showInfo()
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
