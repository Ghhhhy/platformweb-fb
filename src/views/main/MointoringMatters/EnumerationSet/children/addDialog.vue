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
                    <div class="sub-title-add" style="width:120px;float:left;margin-top:8px"><font color="red">*</font>&nbsp;枚举值名称</div>
                    <el-input
                      v-model="dictName"
                      placeholder="请输入枚举值名称"
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
                    <div class="sub-title-add" style="width:120px;float:left;margin-top:8px"><font color="red">*</font>&nbsp;枚举值类型</div>
                    <el-input
                      v-model="dictType"
                      placeholder="请输入枚举值类型"
                      :disabled="isDisable"
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
                    <div
                      class="sub-title-add"
                      style="width: 120px; float: left; margin-top: 8px"
                    >
                      <font color="red">*</font>&nbsp;状态
                    </div>
                    <el-select
                      v-model="status"
                      placeholder="请选择状态"
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
            <el-col :span="12">
              <el-container>
                <el-main width="100%">
                  <el-row>
                    <div class="sub-title-add" style="width:120px;float:left;margin-top:8px"><font color="red">*</font>&nbsp;备注</div>
                    <el-input
                      v-model="dictDesc"
                      type="textarea"
                      :rows="3"
                      placeholder="请输入备注"
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
import HttpModule from '@/api/frame/main/baseConfigManage/EnumerationSet.js'
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
    updateData: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      isDisable: false,
      dictName: '',
      dictType: '',
      dictDesc: '',
      status: '',
      isEnableoptions: [
        { value: 1, label: '正常' },
        { value: 2, label: '停用' }
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
      } else {
        this.isDisable = true
      }
      this.dictName = this.updateData.dictName
      this.dictType = this.updateData.dictType
      this.dictDesc = this.updateData.dictDesc
      this.status = this.updateData.status && Number(this.updateData.status)
    },
    // 保存新增的计划信息
    doInsert() {
      if (this.dictName === '') {
        this.$message.warning('请输入枚举值名称')
        return
      }
      if (this.dictType === '') {
        this.$message.warning('请输入枚举值类型')
        return
      }
      if (this.dictDesc === '') {
        this.$message.warning('请输入备注')
        return
      }
      if (this.status === '') {
        this.$message.warning('请选择状态')
        return
      }
      if (this.dictName.length > 20) {
        this.$message.warning('枚举值名称长度应小于等于20位')
        return
      }
      if (this.title === '新增') {
        let param = {
          dictName: this.dictName,
          dictType: this.dictType,
          dictDesc: this.dictDesc,
          status: this.status
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
          id: this.updateData.id,
          dictName: this.dictName,
          dictType: this.dictType,
          dictDesc: this.dictDesc,
          status: this.status
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
