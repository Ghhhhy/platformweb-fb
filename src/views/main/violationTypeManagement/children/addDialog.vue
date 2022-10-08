<!--监控规则数据源管理新增页面弹框-->
<template>
  <vxe-modal
    v-model="dialogVisible"
    :title="title"
    width="80%"
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
                    <div
                      class="sub-title-add"
                      style="width: 120px; float: left; margin-top: 8px"
                    >
                      <font color="red">*</font>&nbsp;违规类型编码
                    </div>
                    <el-input
                      v-model="code"
                      placeholder="请输入违规类型编码"
                      maxlength="9"
                      style="width: 45%"
                    />
                  </el-row>
                </el-main>
              </el-container>
            </el-col>
            <el-col :span="12">
              <el-container>
                <el-main width="100%">
                  <el-row>
                    <div
                      class="sub-title-add"
                      style="width: 120px; float: left; margin-top: 8px"
                    >
                      <font color="red">*</font>&nbsp;违规类型名称
                    </div>
                    <el-input
                      v-model="name"
                      placeholder="请输入违规类型名称"
                      style="width: 45%"
                    />
                  </el-row>
                </el-main>
              </el-container>
            </el-col>
            <el-col :span="12">
              <el-container>
                <el-main width="100%">
                  <el-row>
                    <div
                      class="sub-title-add"
                      style="width: 120px; float: left; margin-top: 8px"
                    >父级名称
                    </div>
                    <div style="width: 45%; float: left; margin-top: 2px">
                      <BsTreeInput
                        ref="ruleTree"
                        v-model="parentRule"
                        :datas="parentRuleoptions"
                        :disabled="isDisabled"
                        :reloaddata="false"
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
                    <div
                      class="sub-title-add"
                      style="width: 120px; float: left; margin-top: 8px"
                    >
                      <font color="red">*</font>&nbsp;级次
                    </div>
                    <el-select
                      v-model="levelNo"
                      placeholder="级次"
                      style="width: 45%"
                      disabled
                    >
                      <el-option
                        v-for="item in rankOptions"
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
            <el-col :span="12">
              <el-container>
                <el-main width="100%">
                  <el-row>
                    <div
                      class="sub-title-add"
                      style="width: 120px; float: left; margin-top: 8px"
                    >
                      <font color="red">*</font>&nbsp;是否启用
                    </div>
                    <el-select
                      v-model="enable"
                      placeholder="请选择是否启用"
                      style="width: 45%"
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
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-container>
                <el-main width="100%">
                  <el-row>
                    <div
                      class="sub-title-add"
                      style="width: 120px; float: left; margin-top: 8px"
                    >
                      <font color="red">*</font>&nbsp;违规类型说明
                    </div>
                    <el-input
                      v-model="content"
                      type="textarea"
                      placeholder="请输入违规类型说明"
                      style="margin-bottom: 15px; width: 73.5%"
                    />
                  </el-row>
                </el-main>
              </el-container>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
    <div slot="footer" style="height: 80px; margin: 0 15px">
      <div v-if="showbox" id="bigbox"></div>
      <el-divider style="color: #e7ebf0" />
      <div type="flex" justify="space-around">
        <div>
          <vxe-button @click="dialogClose">取消</vxe-button>
          <vxe-button
            id="savebutton"
            status="primary"
            @click="doInsert"
          >保存
          </vxe-button>
        </div>
      </div>
    </div>
  </vxe-modal>
</template>
<script>
import HttpModule from '@/api/frame/main/baseConfigManage/violationTypeManagement.js'
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
    selectData: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      code: '',
      guid: '',
      parentName: '',
      parentId: '',
      parentRule: '',
      parentRuleoptions: [],
      enable: '',
      isEnableoptions: [
        { value: 0, label: '是' },
        { value: 1, label: '否' }
      ],
      rank: '',
      rankOptions: [
        { value: 1, label: '一级' },
        { value: 2, label: '二级' },
        { value: 3, label: '三级' }
      ],
      name: '',
      content: '',
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
      levelNo: 3,
      ruleList: [],
      isDisabled: false
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
        // this.getSysLists()
        this.levelNo = 1
        return
      }
      this.code = this.selectData.code
      this.name = this.selectData.name
      this.enable = Number(this.selectData.enable)
      this.levelNo = this.selectData.levelNo
      this.parentName = this.selectData.parentName
      this.guid = this.selectData.guid
      this.content = this.selectData.content
      this.isDisabled = true
      this.getSysLists()
      this.parentRule = this.selectData.parentId + '##' + this.selectData.parentId + '##' + this.selectData.parentName
    },
    selectRule(val) {
      let valArr = val.split('##')
      this.parentName = valArr[2]
      this.parentId = valArr[0]
      let busName = this.getSelect(this.parentRuleoptions, this.parentId)
      console.log(this.parentId, busName)
      if (busName !== undefined && busName !== 'undefined') {
        this.levelNo = busName.levelNo + 1
      }
      if (this.parentName === 'undefined' || this.parentName === undefined || this.parentName === null || this.parentName.trim() === '') {
        this.parentId = ''
        this.parentName = ''
        if (this.title === '新增') {
          this.levelNo = 1
        }
      }
    },
    getChildrenData(datas) {
      let that = this
      datas.forEach((item) => {
        item.label = item.code + '-' + item.name
        item.id = item.guid
        if (item.children) {
          that.getChildrenData(item.children)
        }
      })
      return datas
    },
    getSelect(data, id) {
      let that = this
      var result = null
      if (!data) {
        return
      }
      data.map((item) => {
        if (item.id === id) {
          result = item
        } else if (item.children) {
          result = that.getSelect(item.children, id)
        }
      })
      return result
    },
    // 业务系统下拉树
    getSysLists() {
      this.parentRuleoptions = this.getChildrenData(this.parentRuleoptions)
      HttpModule.getTreeData({ isLeaf: true }).then((res) => {
        if (res.code === '000000') {
          let treeResdata = this.getChildrenData(res.data)
          this.parentRuleoptions = treeResdata
        } else {
          this.$message.error('左侧树加载失败')
        }
      })
    },
    // 保存新增的计划信息
    doInsert() {
      const regx = /^[0-9A-Za-z]+$/
      if (!regx.test(this.code)) {
        this.$message.warning('请输入数字和字母组成的违规类型编码')
        return
      }
      if (this.name === '') {
        this.$message.warning('请输入违规类型名称')
        return
      }
      if (this.enable === '') {
        this.$message.warning('请选择是否启用')
        return
      }
      if (this.levelNo === '') {
        this.$message.warning('请输入级次')
        return
      }
      if (this.content === '') {
        this.$message.warning('请输入违规类型说明')
        return
      }
      if (this.title === '新增') {
        if (this.parentId === null || this.parentId === '') {
          this.levelNo = 1
        }
        // if (!this.code) {
        //   let rand = Math.floor(Math.random() * 900) + 100
        //   rand = ''
        //   for (var i = 0; i < 3; i++) {
        //     var r = Math.floor(Math.random() * 10)
        //     rand += r
        //   }
        //   this.code = rand
        // }
        let param = {
          parentName: this.parentName,
          parentId: this.parentId,
          enable: this.enable,
          name: this.name,
          content: this.content,
          levelNo: this.levelNo,
          guid: this.guid,
          code: this.code,
          menuName: this.$store.state.curNavModule.name
        }
        this.addLoading = true
        HttpModule.addPolicies(param).then((res) => {
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
          parentName: this.parentName,
          parentId: this.parentId,
          enable: this.enable,
          name: this.name,
          content: this.content,
          levelNo: this.levelNo,
          guid: this.guid,
          code: this.code
        }
        this.addLoading = true
        HttpModule.changePolicies(param).then((res) => {
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
  watch: {},
  created() {
    this.getSysLists()
    this.showInfo()
  }
}
</script>
<style lang="scss">
.payVoucherInput {
  margin: 15px;
  .el-card {
    margin-top: 0;
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
  opacity: 0.3;
}
.el-row-item .font-set-small .hline {
  width: 72px;
}
</style>
