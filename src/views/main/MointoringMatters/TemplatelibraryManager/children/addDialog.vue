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
            <!-- <el-col :span="22">
              <el-container>
                <el-main width="100%">
                  <el-row>
                    <div class="sub-title-add" style="width:100px;float:left;margin-top:8px"><font color="red">*</font>&nbsp;模板类型</div>
                    <el-select
                      v-model="value"
                      placeholder="请选择模板类型"
                      style="width:45%"
                    >
                      <el-option
                        v-for="item in fileTypeList"
                        :key="item.id"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select>
                  </el-row>
                </el-main>
              </el-container>
            </el-col> -->
            <el-col :span="22">
              <el-container>
                <el-main width="100%">
                  <el-row>
                    <div class="sub-title-add" style="width:100px;float:left;margin-top:8px"><font color="red">*</font>&nbsp;是否启用</div>
                    <el-select
                      v-model="value"
                      placeholder="请选择是否启用"
                      style="width:45%"
                    >
                      <el-option
                        v-for="item in isEnableList"
                        :key="item.id"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select>
                  </el-row>
                </el-main>
              </el-container>
            </el-col>
          </el-row>
        </div>
      </div>
      <!-- 上传附件 -->
      <BsUploadBak
        ref="myUpload"
        :attachment-id="templateId"
        :file-list="fileList"
        :file-data-bak-del.sync="fileDataBakDel"
        :file-data.sync="fileData"
        :size-num="100"
      />
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
import HttpModule from '@/api/frame/main/Monitoring/TemplateManager.js'
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
    addDetailData: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      templateId: '',
      isEnable: '',
      templateName: '',
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
      isEnableList: [
        {
          value: 1,
          label: '是'
        },
        {
          value: 2,
          label: '否'
        }
      ],
      fileTypeList: [
        {
          value: 2,
          label: '三公'
        },
        {
          value: 3,
          label: '专项行动'
        }
      ],
      value: 1,
      isUseMof: [
        {
          value: 1,
          label: '仅本级使用'
        },
        {
          value: 2,
          label: '本级和下级使用'
        }
      ],
      useMof: '',
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
            this.templateId = res.data.bussinesCode
          } else {
            this.$message.error(res.message)
          }
        })
        return
      }
      this.templateId = this.addDetailData.templateId
      this.templateName = this.addDetailData.templateName
      this.isEnable = this.addDetailData.isEnable
      let param = {
        billguid: this.templateId,
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
      if (this.title === '新增') {
        if (this.fileData.length === 0) {
          this.$message.info('请上传附件模板')
          return
        }
        let param = {
          templateId: this.templateId,
          isEnable: this.value,
          // fileType: this.value,
          templateName: this.fileData[0].filename,
          appId: this.fileData[0].appid,
          fileGuid: this.fileData[0].fileguid
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
          templateId: this.templateId,
          isEnable: this.value,
          templateName: this.templateName
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
