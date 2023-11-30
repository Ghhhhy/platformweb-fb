<!--监控规则函数管理新增页面弹框-->
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
                    <div class="sub-title-add" style="width:100px;float:left;margin-top:8px"><font color="red">*</font>&nbsp;函数类型</div>
                    <el-select
                      v-model="functionType"
                      placeholder="请选择函数类型"
                      style="width:45%"
                      @change="functionTypeFun"
                    >
                      <el-option
                        v-for="item in functionTypeoptions"
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
                    <div class="sub-title-add" style="width:100px;float:left;margin-top:8px"><font color="red">*</font>&nbsp;函数名称</div>
                    <el-input
                      v-model="functionName"
                      placeholder="请输入函数名称"
                      style="width:45%"
                    />
                  </el-row>
                </el-main>
              </el-container>
            </el-col>
            <!--<el-col :span="12">-->
            <!--  <el-container>-->
            <!--    <el-main width="100%">-->
            <!--      <el-row>-->
            <!--        <div class="sub-title-add" style="width:100px;float:left;margin-top:8px">&nbsp;函数接口类型</div>-->
            <!--        <el-select-->
            <!--          v-model="functionApiType"-->
            <!--          placeholder="请输入函数接口类型"-->
            <!--          style="width:45%"-->
            <!--        >-->
            <!--          <el-option-->
            <!--            v-for="item in funcitonApiTypeOptions"-->
            <!--            :key="item.value"-->
            <!--            :label="item.label"-->
            <!--            :value="item.value"-->
            <!--          />-->
            <!--        </el-select>-->
            <!--      </el-row>-->
            <!--    </el-main>-->
            <!--  </el-container>-->
            <!--</el-col>-->
            <el-col :span="12">
              <el-container>
                <el-main width="100%">
                  <el-row>
                    <div class="sub-title-add" style="width:100px;float:left;margin-top:8px">&nbsp;函数接口</div>
                    <el-input
                      v-model="functionApi"
                      placeholder="请输入函数接口"
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
                    <div class="sub-title-add" style="width:100px;float:left;margin-top:8px"><font color="red">*</font>&nbsp;数据源名称</div>
                    <el-select
                      v-model="dataSourceCode"
                      placeholder="请选择数据源名称"
                      style="width:45%"
                    >
                      <el-option
                        v-for="item in dataSourceCodeoptions"
                        :key="item.dataSourceCode"
                        :label="item.dataSourceName"
                        :value="item.dataSourceCode"
                        @change="changeDataSourceCode"
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
                    <div class="sub-title-add" style="width:100px;float:left;margin-top:8px"><font v-if="functionType === '2'" color="red">*</font>&nbsp;查询类型</div>
                    <el-select
                      v-model="queryType"
                      placeholder="请选择查询类型"
                      style="width:45%"
                    >
                      <el-option
                        v-for="item in queryTypeOptions"
                        :key="item.id"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select>
                  </el-row>
                </el-main>
              </el-container>
            </el-col>
            <el-col v-if="$store.getters.isSx" :span="12">
              <el-container>
                <el-main width="100%">
                  <el-row>
                    <div class="sub-title-add" style="width:100px;float:left;margin-top:8px">函数值</div>
                    <el-select
                      v-model="elementCode"
                      placeholder="请选择函数值"
                      clearable
                      filterable
                      style="width:45%"
                    >
                      <el-option
                        v-for="item in elementCodeOption"
                        :key="item.code"
                        :label="item.name"
                        :value="item.code"
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
                    <div class="sub-title-add" style="width:100px;float:left;margin-top:8px"><font color="red">*</font>&nbsp;函数参数</div>
                    <el-input
                      v-model="functionParameter"
                      type="textarea"
                      :rows="7"
                      placeholder="请输入函数参数"
                      style="width:73%"
                    />
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
                    <div class="sub-title-add" style="width:100px;float:left;margin-top:8px"><font color="red">*</font>&nbsp;函数描述</div>
                    <el-input
                      v-model="description"
                      type="textarea"
                      :rows="5"
                      placeholder="请输入函数描述"
                      style="margin-bottom:15px; width:73%"
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
import HttpModule from '@/api/frame/main/Monitoring/Monitoring.js'
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
    functionCode: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      dataSourceCode: '',
      dataSourceName: '',
      dataSourceCodeoptions: [],
      functionType: '',
      functionTypeoptions: [
        { value: '1', label: '字段' },
        { value: '2', label: '自定义SQL' },
        { value: '3', label: '自定义接口' },
        { value: '4', label: '自定义校验接口' }
      ],
      queryType: '',
      queryTypeOptions: [
        { id: 'no', label: '无', value: ' ' },
        { id: 'inTable', label: '表内', value: '1' },
        { id: 'outTable', label: '表间', value: '2' },
        { id: 'inTableAll', label: '表内批量', value: '31' }
      ],
      elementCodeOption: [],
      elementCode: '',
      functionName: '',
      functionApi: '',
      functionApiType: '',
      funcitonApiTypeOptions: [],
      functionParameter: '',
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
      showbox: false
    }
  },
  methods: {
    dialogClose() {
      this.$parent.dialogVisible = false
      this.$parent.queryTableDatas()
    },
    // 获取数据源列表
    getDataSourceInfo() {
      let params = {
        page: '1', // 页码
        pageSize: '50' // 每页条数
        // dataSourceName: this.condition.dataSourceName ? this.condition.dataSourceName.toString() : '' // 搜索
      }
      HttpModule.queryDataSourceDatas(params).then(res => {
        if (res.code === '000000') {
          this.dataSourceCodeoptions = res.data.results
        } else {
          this.$message.error(res.message)
        }
      })
    },
    getElementCodeOption() {
      this.$http.get(BSURL.api_v2Dicds).then(res => {
        res.rscode === '100000' && (this.elementCodeOption = res.data)
      })
    },
    functionTypeFun() {
      console.log(this.functionType, 'functionTypeFun')
    },
    // 选择数据源编码
    changeDataSourceCode(val) {
      console.log(val)
      this.SysparentId = val
      this.dataSourceCode = ''
      let busName = this.dataSourceCodeoptions.find(item => {
        return item.id === val
      })
      this.dataSourceName = busName.dataSourceName
      this.dataSourceCode = busName.dataSourceCode
    },
    // 修改回显
    showInfo() {
      if (this.title === '新增') {
        this.attachmentId = this.$ToolFn.utilFn.getUuid()
        return
      }
      let params = {
        functionCode: this.functionCode
      }
      HttpModule.getDetail(params).then(res => {
        if (res.code === '000000') {
          this.functionName = res.data.functionName
          this.functionType = res.data.functionType.toString()
          this.functionApi = res.data.functionApi
          this.functionApiType = res.data.functionApiType == null ? res.data.functionApiType : res.data.functionApiType.toString()
          this.functionParameter = res.data.functionParameter
          this.description = res.data.description
          this.elementCode = res.data.elementCode
          this.dataSourceName = res.data.dataSourceName
          this.dataSourceCode = res.data.dataSourceCode
          this.queryType = res.data.queryType || ''
        } else {
          this.$message.error(res.message)
        }
      })
      this.attachmentId = this.modifyData.attachment_id != null ? this.modifyData.attachment_id : this.$ToolFn.utilFn.getUuid()
      let param = 'attachmentId=' + this.attachmentId
      HttpModule.getFiles(param).then(res => {
        if (res.rscode === '200') {
          // 获取附件信息
          this.fileData = res.data.fileList
        }
      })
    },
    // 保存新增的计划信息
    doInsert() {
      // if (this.functionType === '') {
      //   this.$message.warning('请选择函数类型')
      //   return
      // }
      if (this.functionName === '') {
        this.$message.warning('请输入函数名称')
        return
      }
      // if (this.functionType === '3') {
      //   if (this.functionApi === '' || this.functionApi == null) {
      //     this.$message.warning('接口类型，请输入函数接口')
      //     return
      //   }
      // }
      // if (this.functionType === '4') {
      //   if (this.functionApiType === '' || this.functionApiType == null) {
      //     this.$message.warning('校验接口类型，请选择函数接口类型')
      //     return
      //   }
      //   if (this.functionApi === '' || this.functionApi == null) {
      //     this.$message.warning('校验接口类型，请输入函数接口')
      //     return
      //   }
      // }
      if (this.dataSourceCode === '') {
        this.$message.warning('请选择数据源名称')
        return
      }
      if (this.functionParameter === '') {
        this.$message.warning('请输入函数参数')
        return
      }
      if (this.queryType === '' && this.functionType === '2') {
        this.$message.warning('请输入查询类型')
        return
      }
      if (this.description === '') {
        this.$message.warning('请输入函数描述')
        return
      }
      // 去掉限制
      // if (this.functionName.length > 20) {
      //   this.$message.warning('函数名称长度应小于等于20位')
      //   return
      // }
      // if (this.functionApi.length > 500) {
      //   this.$message.warning('函数接口长度应小于等于500位')
      //   return
      // }
      if (this.functionParameter.length > 5000) {
        this.$message.warning('函数参数长度应小于等于5000位')
        return
      }
      if (this.description.length > 100) {
        this.$message.warning('函数描述应小于等于100位')
        return
      }
      if (this.title === '新增') {
        let param = {
          functionType: this.functionType,
          functionName: this.functionName,
          functionApi: this.functionApi,
          functionApiType: this.functionApiType,
          functionParameter: this.functionParameter,
          elementCode: this.elementCode,
          description: this.description,
          dataSourceCode: this.dataSourceCode,
          menuName: this.$store.state.curNavModule.name,
          queryType: this.queryType || undefined
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
          functionCode: this.functionCode,
          functionType: this.functionType,
          functionName: this.functionName,
          elementCode: this.elementCode,
          functionApi: this.functionApi,
          functionApiType: this.functionApiType,
          functionParameter: this.functionParameter,
          description: this.description,
          dataSourceCode: this.dataSourceCode,
          queryType: this.queryType
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
    getFunctionApiType() {
      const params = {
        dictType: 'function_API_type'
      }
      HttpModule.getFunctionApiType(params).then(res => {
        if (res.code === '000000') {
          res.data.results.forEach(item => {
            item.value = item.dictInfoCode
            item.label = item.dictInfoName
          })
          this.funcitonApiTypeOptions = res.data.results
        } else {
          this.$message.error(res.message)
        }
      })
    }
  },
  watch: {
  },
  created() {
    this.getFunctionApiType()
    this.getDataSourceInfo()
    this.showInfo()
    this.getElementCodeOption()
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
