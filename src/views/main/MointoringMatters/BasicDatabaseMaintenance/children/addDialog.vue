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
            <el-col :span="8">
              <el-container>
                <el-main width="100%">
                  <el-row>
                    <div class="sub-title-add" style="width:100px;float:left;margin-top:8px"><font color="red">*</font>&nbsp;年度</div>
                    <el-select
                      v-model="year"
                      placeholder="请选择年度"
                    >
                      <el-option
                        v-for="item in yearOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select>
                    <!-- <vxe-NewInput v-model="year" placeholder="年度" type="year" /> -->
                  </el-row>
                </el-main>
              </el-container>
            </el-col>
            <el-col :span="8">
              <el-container>
                <el-main width="100%">
                  <el-row>
                    <div class="sub-title-add" style="width:100px;float:left;margin-top:8px"><font color="red">*</font>&nbsp;类别</div>
                    <el-select
                      v-model="typeName"
                      placeholder="请选择类别"
                    >
                      <el-option
                        v-for="item in typeNameOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select>
                  </el-row>
                </el-main>
              </el-container>
            </el-col>
            <el-col :span="8">
              <el-container>
                <el-main width="100%">
                  <el-row>
                    <div class="sub-title-add" style="width:100px;float:left;margin-top:8px"><font color="red">*</font>&nbsp;名称</div>
                    <el-input
                      v-model="basicName"
                      placeholder="请输入名称"
                      style="width:65%"
                    />
                  </el-row>
                </el-main>
              </el-container>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-container>
                <el-main width="100%">
                  <el-row>
                    <div class="sub-title-add" style="width:120px;float:left;margin-top:8px">&nbsp;基础资料库说明</div>
                    <el-input
                      v-model="basicDesc"
                      type="textarea"
                      :rows="2"
                      placeholder="请输入基础资料库说明"
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
// import { proconf } from '../PoliciesAndRegulationsManagement.js'
import HttpModule from '@/api/frame/main/Monitoring/BasicDatabaseMaintenance.js'
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
    modifyData: {
      type: Object,
      default: null
    },
    node: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
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
      year: '',
      yearOptions: [
        { value: 2021, label: '2021年' },
        { value: 2022, label: '2022年' },
        { value: 2023, label: '2023年' },
        { value: 2024, label: '2024年' },
        { value: 2025, label: '2025年' },
        { value: 2022, label: '2026年' },
        { value: 2027, label: '2027年' }
      ],
      typeName: '',
      typeNameOptions: [
        { value: '预决算报告', label: '预决算报告' },
        { value: '审计报告', label: '审计报告' },
        { value: '财政监督报告', label: '财政监督报告' }
      ],
      basicName: '',
      basicDesc: '',
      provinceCode: '',
      provinceName: '',
      id: ''
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
      this.year = Number(this.modifyData.year)
      this.typeName = this.modifyData.typeName
      this.basicName = this.modifyData.basicName
      this.basicDesc = this.modifyData.basicDesc
      this.attachmentId = this.modifyData.attachmentId
      this.provinceName = this.modifyData.provinceName
      this.provinceCode = this.modifyData.provinceCode
      this.id = this.modifyData.id
      let param = {
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
    // 保存新增的计划信息
    doInsert() {
      if (this.year === '') {
        this.$message.warning('请选择年度')
        return
      }
      if (this.typeName === '') {
        this.$message.warning('请选择类别')
        return
      }
      if (this.basicName === '') {
        this.$message.warning('请输入名称')
        return
      }
      if (this.title === '新增') {
        let name = this.node.name
        let code = this.node.code
        let param = {
          year: this.year,
          typeName: this.typeName,
          basicName: this.basicName,
          basicDesc: this.basicDesc,
          attachmentId: this.attachmentId,
          provinceName: name,
          provinceCode: code,
          fileData: this.fileData
        }
        this.addLoading = true
        HttpModule.add(param).then(res => {
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
          year: this.year,
          typeName: this.typeName,
          basicName: this.basicName,
          basicDesc: this.basicDesc,
          attachmentId: this.attachmentId,
          provinceName: this.provinceName,
          provinceCode: this.provinceCode,
          id: this.id,
          fileData: this.fileData
        }
        this.addLoading = true
        HttpModule.update(param).then(res => {
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
