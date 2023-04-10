<!--监控规则数据源管理新增页面弹框-->
<template>
  <vxe-modal
    v-model="dialogVisible"
    :title="title"
    width="80%"
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
                    <div class="sub-title-add" style="width:120px;float:left;margin-top:8px"><font color="red">*</font>&nbsp;规则分类编码</div>
                    <el-input
                      v-model="code"
                      placeholder="请输入规则分类编码"
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
                    <div class="sub-title-add" style="width:120px;float:left;margin-top:8px"><font color="red">*</font>&nbsp;规则分类名称</div>
                    <el-input
                      v-model="ruleName"
                      placeholder="请输入规则分类名称"
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
                    <div class="sub-title-add" style="width:120px;float:left;margin-top:8px">父级规则分类</div>
                    <div style="width:45%;float:left;margin-top:2px">
                      <BsTreeInput
                        ref="ruleTree"
                        v-model="parentRule"
                        :datas="parentRuleoptions"
                        :reloaddata="false"
                        :disabled="isDisabled"
                        @input="selectRule"
                      />
                    </div>
                  </el-row>
                </el-main>
              </el-container>
            </el-col>
            <el-col :span="12">
              <el-container>
                <el-main width="100%">
                  <el-row>
                    <div class="sub-title-add" style="width:120px;float:left;margin-top:8px"><font color="red">*</font>&nbsp;是否启用</div>
                    <el-select
                      v-model="isEnable"
                      placeholder="请选择是否启用"
                      style="width:45%"
                    >
                      <el-option
                        v-for="item in isEnableoptions"
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
                    <div class="sub-title-add" style="width:120px;float:left;margin-top:8px"><font color="red">*</font>&nbsp;规则分类说明</div>
                    <el-input
                      v-model="description"
                      type="textarea"
                      :rows="5"
                      placeholder="请输入规则分类说明"
                      style="margin-bottom:15px; width:45%"
                    />
                  </el-row>
                </el-main>
              </el-container>
            </el-col>
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
import HttpModule from '@/api/frame/main/baseConfigManage/warnLevelManagement.js'
export default {
  name: 'AddDialog',
  components: {},
  computed: {
    curNavModule() {
      return this.$store.state.curNavModule
    },
    curRuleLevel() {
      return (this.$XEUtils.findTree(this.parentRuleoptions, item => item.id === this.parentId)?.item?.ruleLevel || 0) + 1
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
    selectData: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data() {
    return {
      parentRule: '',
      parentRuleName: '',
      parentCode: '',
      parentId: '',
      parentRuleoptions: [],
      isEnable: '',
      isEnableoptions: [
        { value: 1, label: '是' },
        { value: 2, label: '否' }
      ],
      ruleName: '',
      description: '',
      dialogVisible: true,
      addLoading: false,
      token: '',
      isContinuity: false,
      // 文件上传相关参数
      fileList: [],
      fileData: [],
      fileDataBakDel: [],
      attachmentId: '',
      showbox: false,
      ruleLevel: 3,
      ruleList: [],
      isDisabled: false,
      code: ''
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
        this.getSysLists()
        this.ruleLevel = 1
        return
      }
      this.code = this.selectData.code
      this.ruleName = this.selectData.ruleName
      // isEnable：String => Number
      this.isEnable = this.selectData.isEnable * 1
      this.description = this.selectData.description
      this.ruleLevel = this.selectData.ruleLevel
      if (this.ruleLevel === 1) {
        this.isDisabled = true
      }
      this.getSysLists()
      this.parentId = this.selectData.parentId == null ? '' : this.selectData.parentId
      this.parentCode = this.selectData.parentCode == null ? '' : this.selectData.parentCode
      this.parentRuleName = this.selectData.parentRuleName == null ? '' : this.selectData.parentRuleName
      this.parentRule = this.parentId + '##' + this.parentCode + '##' + this.parentRuleName
    },
    selectRule(val) {
      let valArr = val.split('##')
      this.parentRuleName = valArr[2]
      this.parentCode = valArr[1]
      this.parentId = valArr[0]
      let busName = this.ruleList.find(item => {
        return item.id === this.parentId
      })
      if (busName !== undefined && busName !== 'undefined') {
        this.ruleLevel = Number(busName.ruleLevel + 1)
      }
      if (this.parentRuleName === 'undefined' || this.parentRuleName === undefined || this.parentRuleName === null || this.parentRuleName.trim() === '') {
        this.parentId = ''
        this.parentRuleName = ''
        if (this.title === '新增') {
          this.ruleLevel = 1
        }
      }
    },
    getChildrenData(datas) {
      let that = this
      datas.forEach(item => {
        item.label = item.code + '-' + item.ruleName
        // item.code = item.code
        item.name = item.ruleName
        if (item.children) {
          that.getChildrenData(item.children)
        }
      })

      return datas
    },
    getSysLists() {
      HttpModule.getTree(this.ruleLevel).then(res => {
        if (res.code === '000000') {
          let treeResdata = this.getChildrenData(res.data)
          this.parentRuleoptions = treeResdata
        } else {
          this.$message.error('下拉树加载失败')
        }
      })
    },
    getAllList() {
      HttpModule.getAllList().then(res => {
        if (res.code === '000000') {
          this.ruleList = res.data
        } else {
          this.$message.error('所有规则列表加载失败')
        }
      })
    },
    // 保存新增的计划信息
    doInsert() {
      if (this.code.trim() === '') {
        this.$message.warning('请输入规则分类编码')
        return
      }
      if (this.ruleName.trim() === '') {
        this.$message.warning('请输入规则分类名称')
        return
      }
      if (this.ruleLevel !== 1 && (this.parentId === null || this.parentId === '')) {
        this.$message.warning('请选择父级规则分类')
        return
      }
      if (this.isEnable === '') {
        this.$message.warning('请选择是否启用')
        return
      }
      if (this.description === '') {
        this.$message.warning('请输入规则分类说明')
        return
      }
      if (this.title === '新增') {
        if (this.parentId === null || this.parentId === '') {
          this.ruleLevel = 1
        }
        let param = {
          code: this.code,
          parentRuleName: this.parentRuleName,
          parentId: this.parentId,
          parentCode: this.parentCode,
          isEnable: this.isEnable,
          ruleName: this.ruleName,
          description: this.description,
          ruleLevel: this.curRuleLevel,
          menuName: this.$store.state.curNavModule.name
        }
        this.addLoading = true
        HttpModule.addPolicies(param).then(res => {
          this.addLoading = false
          if (res.code === '000000') {
            this.$message.success('新增成功')
            this.$parent.dialogVisible = false
            this.$parent.queryTableDatas()
            this.$parent.getLeftTreeData()
          } else {
            this.$message.error(res.message)
          }
        })
      } else {
        let param = {
          id: this.selectData.id,
          code: this.code,
          parentRuleName: this.parentRuleName,
          parentId: this.parentId,
          parentCode: this.parentCode,
          isEnable: this.isEnable,
          ruleName: this.ruleName,
          description: this.description,
          ruleLevel: this.ruleLevel
        }
        this.addLoading = true
        HttpModule.changePolicies(param).then(res => {
          this.addLoading = false
          if (res.code === '000000') {
            this.$message.success('修改成功')
            this.$parent.dialogVisible = false
            this.$parent.queryTableDatas()
            this.$parent.getLeftTreeData()
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
    // this.getSysLists()
    this.showInfo()
    this.getAllList()
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
