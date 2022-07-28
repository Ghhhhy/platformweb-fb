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
                    <div class="sub-title-add" style="width:120px;float:left;margin-top:8px"><font color="red">*</font>&nbsp;数据源名称</div>
                    <el-input
                      v-model="dataSourceName"
                      placeholder="请输入数据源名称"
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
                    <div class="sub-title-add" style="width:120px;float:left;margin-top:8px"><font color="red">*</font>&nbsp;业务系统</div>
                    <el-select
                      v-model="businessSystemCode"
                      placeholder="请选择业务系统"
                      style="width:45%"
                      @change="changeSysCode"
                    >
                      <el-option
                        v-for="item in businessSystemCodeoptions"
                        :key="item.id"
                        :label="item.businessName"
                        :value="item.id"
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
                    <div class="sub-title-add" style="width:120px;float:left;margin-top:8px"><font color="red">*</font>&nbsp;业务模块</div>
                    <el-select
                      v-model="businessModuleCode"
                      placeholder="请选择业务模块"
                      style="width:45%"
                      @change="changeModCode"
                    >
                      <el-option
                        v-for="item in businessModuleCodeoptions"
                        :key="item.id"
                        :label="item.businessName"
                        :value="item.id"
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
                    <div class="sub-title-add" style="width:120px;float:left;margin-top:8px">&nbsp;适配器服务地址</div>
                    <el-input
                      v-model="adapterAddr"
                      placeholder="请输入适配器服务地址"
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
                    <div class="sub-title-add" style="width:120px;float:left;margin-top:8px"><font color="red">*</font>&nbsp;数据库名称</div>
                    <el-input
                      v-model="databaseName"
                      placeholder="请输入数据库名称"
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
                    <div class="sub-title-add" style="width:120px;float:left;margin-top:8px"><font color="red">*</font>&nbsp;查询表名</div>
                    <el-input
                      v-model="tableName"
                      placeholder="请输入表名"
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
                    <div class="sub-title-add" style="width:120px;float:left;margin-top:8px">&nbsp;拼接SQL</div>
                    <el-input
                      v-model="sqlParam"
                      type="textarea"
                      :rows="5"
                      placeholder="请输入拼接SQL段"
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
                    <div class="sub-title-add" style="width:120px;float:left;margin-top:8px"><font color="red">*</font>&nbsp;数据源描述</div>
                    <el-input
                      v-model="dataSourceDesc"
                      type="textarea"
                      :rows="5"
                      placeholder="请输入数据源描述"
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
import HttpModule from '@/api/frame/main/baseConfigManage/Datasoure.js'
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
    }
  },
  data() {
    return {
      sqlParam: '',
      tableName: '',
      businessSystemCode: '',
      businessSystemName: '',
      businessSystemCodeoptions: [],
      businessModuleCode: '',
      businessModuleName: '',
      businessModuleCodeoptions: [],
      dataSourceName: '',
      adapterAddr: '',
      dataSourceDesc: '',
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
      databaseName: ''
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
      HttpModule.getDetail(this.dataSourceCode).then(res => {
        if (res.code === '000000') {
          this.dataSourceName = res.data.dataSourceName
          this.businessSystemCode = parseInt(res.data.businessSystemCode)
          this.SysparentId = this.businessSystemCode
          this.getModLists()
          this.businessSystemName = res.data.businessSystemName
          this.businessModuleCode = parseInt(res.data.businessModuleCode)
          this.businessModuleName = res.data.businessModuleName
          this.adapterAddr = res.data.adapterAddr
          this.dataSourceDesc = res.data.dataSourceDesc
          this.tableName = res.data.tableName
          this.sqlParam = res.data.sqlParam
          this.databaseName = res.data.databaseName
        } else {
          this.$message.error(res.message)
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
    // 保存新增的计划信息
    doInsert() {
      if (this.businessModuleCode === '') {
        this.$message.warning('请选择业务模块')
        return
      }
      if (this.dataSourceName === '') {
        this.$message.warning('请输入数据源名称')
        return
      }
      /* if (this.adapterAddr === '') {
        this.$message.warning('请输入适配器服务地址')
        return
      } */
      if (this.databaseName === '') {
        this.$message.warning('请输入数据库名称')
        return
      }
      if (this.tableName === '') {
        this.$message.warning('请输入查询表名')
        return
      }
      /* if (this.sqlParam === '') {
        this.$message.warning('请输入拼接SQL')
        return
      } */
      if (this.dataSourceDesc === '') {
        this.$message.warning('请输入数据源描述')
        return
      }
      if (this.dataSourceName.length > 20) {
        this.$message.warning('数据源名称长度应小于等于20位')
        return
      }
      // if (this.adapterAddr !== '' && this.adapterAddr.length > 500) {
      //   this.$message.warning('适配器服务地址长度应小于等于500位')
      //   return
      // }
      if (this.dataSourceDesc.length > 100) {
        this.$message.warning('数据源描述应小于等于100位')
        return
      }
      if (this.title === '新增') {
        let param = {
          businessSystemCode: this.businessSystemCode,
          businessSystemName: this.businessSystemName,
          businessModuleCode: this.businessModuleCode,
          businessModuleName: this.businessModuleName,
          dataSourceName: this.dataSourceName,
          adapterAddr: this.adapterAddr,
          dataSourceDesc: this.dataSourceDesc,
          menuName: this.$store.state.curNavModule.name,
          tableName: this.tableName,
          sqlParam: this.sqlParam,
          databaseName: this.databaseName
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
          dataSourceCode: this.dataSourceCode,
          businessSystemCode: this.businessSystemCode,
          businessSystemName: this.businessSystemName,
          businessModuleCode: this.businessModuleCode,
          businessModuleName: this.businessModuleName,
          dataSourceName: this.dataSourceName,
          adapterAddr: this.adapterAddr,
          dataSourceDesc: this.dataSourceDesc,
          tableName: this.tableName,
          sqlParam: this.sqlParam,
          databaseName: this.databaseName
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
    this.getSysLists()
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
