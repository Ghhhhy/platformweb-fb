<!--监控规则数据源管理新增页面弹框-->
<template>
  <vxe-modal
    v-model="dialogVisible"
    :title="title"
    width="50%"
    height="65%"
    :show-footer="true"
    @close="dialogClose"
  >
    <div v-loading="addLoading" class="payVoucherInput">
      <div>
        <div>
          <el-row>
            <el-col :span="20">
              <el-container>
                <el-main width="100%">
                  <el-row>
                    <div class="sub-title-add" style="width:20%;float:left;margin-top:8px"><font color="red">*</font>&nbsp;区划</div>
                    <div style="width:70%;float:left;margin-top:2px">
                      <BsTreeInput
                        ref="ruleTree"
                        v-model="askProvince"
                        :datas="askProvinceOptions"
                        :reloaddata="false"
                        :isleaf="!isSx"
                        :showcheckbox="false"
                        @input="selectProvince"
                      />
                    </div>
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
                    <div class="sub-title-add" style="width:20%;float:left;margin-top:8px"><font color="red">*</font>&nbsp;年份</div>
                    <el-select
                      v-model="year"
                      placeholder="请选择年份"
                      style="width:70%"
                    >
                      <el-option
                        v-for="item in yearOptions"
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
            <el-col :span="20">
              <el-container>
                <el-main width="100%">
                  <el-row>
                    <div class="sub-title-add" style="width:20%;float:left;margin-top:8px"><font color="red">*</font>&nbsp;月份</div>
                    <el-select
                      v-model="startMonth"
                      placeholder="请选择月份"
                      style="width:70%"
                      @change="chooseRuleFlag"
                    >
                      <el-option
                        v-for="item in startMonthOptions"
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
        </div>
      </div>
    </div>
    <div slot="footer" style="height: 80px;margin:0 15px">
      <div v-if="showbox" id="bigbox"></div>
      <el-divider style="color:#E7EBF0" />
      <div type="flex" justify="space-around">
        <div>
          <vxe-button @click="dialogClose">取消</vxe-button>
          <vxe-button id="savebutton" status="primary" @click="doInsert">预览</vxe-button>
          <vxe-button id="importbutton" status="primary" @click="importbutton">导入</vxe-button>
        </div>
      </div>
    </div>
    <ImportModel
      ref="ImportModel"
      :file-config="fileConfig"
      :import-modal-visible.sync="importModalVisible"
      @onDownloadTemplateClick="onDownloadTemplateClick"
      @onImportClick="onImportClick"
      @onImportFileClick="onImportFileClick"
    />
  </vxe-modal>
</template>
<script>
import ImportModel from '@/components/TableBak/import/import.vue'
import { checkRscode } from '@/utils/checkRscode'
import { readLocalFile } from '@/utils/readLocalFile'
// import { proconf } from '../PoliciesAndRegulationsManagement.js'
import HttpModule from '@/api/frame/main/Monitoring/MonitoeReportCreate.js'
const routerMap = {
  'sanGongMonitoeReportCreate': {
    axiosStr: 'sangongCreate',
    code: '2'
  },
  'SpeProMonitoeReportCreate': {
    axiosStr: 'speProCreate',
    code: '3'
  },
  'sanBaoMonitoeReportCreate': {
    axiosStr: 'sanbaoCreate',
    code: '4'
  },
  'dynamicMonitoeReportCreate': {
    axiosStr: 'dynamicCreate',
    code: '5'
  },
  'directFundsCreate': {
    axiosStr: 'directFundsCreate',
    code: '6'
  }
}
export default {
  name: 'AddDialog',
  components: {
    ImportModel
  },
  computed: {
    curNavModule() {
      return this.$store.state.curNavModule
    }
  },
  props: {
    title: {
      type: String,
      default: ''
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
      fileName: '',
      fileDataBakDel: [],
      attachmentId: '',
      showbox: false,
      year: '',
      yearOptions: [
        { value: 2021, label: '2021年' },
        { value: 2022, label: '2022年' },
        { value: 2023, label: '2023年' }
      ],
      startMonth: '',
      endMonth: '',
      startMonthOptions: [
        { value: '01', label: '一月' },
        { value: '02', label: '二月' },
        { value: '03', label: '三月' },
        { value: '04', label: '四月' },
        { value: '05', label: '五月' },
        { value: '06', label: '六月' },
        { value: '07', label: '七月' },
        { value: '08', label: '八月' },
        { value: '09', label: '九月' },
        { value: '10', label: '十月' },
        { value: '11', label: '十一月' },
        { value: '12', label: '十二月' }
      ],
      isSx: true,
      userInfo: {},
      askProvince: '',
      askProvinceOptions: [],
      provinceNameList: [],
      importModalVisible: false, // 导入弹框
      fileConfig: {
        fileName: '',
        file: null,
        maxSize: 1024 * 1024 * 10
      } // 导入文件配置
    }
  },
  methods: {
    importbutton() {
      // if (this.askProvince === '') {
      //   this.$message.warning('请选择区划')
      //   return
      // }
      if (this.year === '') {
        this.$message.warning('请选择年份')
        return
      }
      if (this.startMonth === '') {
        this.$message.warning('请选择月份')
        return
      }
      // debugger
      this.fileConfig = {
        fileName: '',
        file: null,
        maxSize: 1024 * 1024 * 10
      }
      this.importModalVisible = true
      this.$refs.ImportModel.showDownLoadTemplate = false
      this.$set(this.$refs.ImportModel, 'fileList', [])
    },
    async onImportFileClick() {
      const { file } = await readLocalFile({
        types: ['xlsx', 'xls', 'docx', 'doc']
      })
      if (file.size >= this.fileConfig.maxSize) {
        this.$message.error('文件太大')
        return
      }
      this.fileConfig.file = file
      this.fileConfig.fileName = file.name
      this.$set(this.$refs.ImportModel, 'fileList', [{ fileName: file.name }])
    },
    async onImportClick() {
      if (!this.fileConfig?.file) {
        this.$message.warning('请先选择导入文件')
        return
      }
      let params = {
        year: this.year,
        month: this.startMonth,
        mofDivCode: this.provinceCode,
        mofDivName: this.provinceName,
        file: this.fileConfig.file,
        type: routerMap[this.$route.name].code
      }
      checkRscode(
        await HttpModule.importPersonAndCompany(params)
      )
      this.$message.success('导入成功')
      this.dtos = []
      this.importModalVisible = false
      this.$parent.dialogVisible = false
      this.$parent.fileName = ''
      this.$parent.queryTableDatas()
      // this.queryTableDatas1()
    },
    onDownloadTemplateClick() {
      console.log('点击下载模板')
    },
    dialogClose() {
      this.$parent.dialogVisible = false
      this.$parent.queryTableDatas()
    },
    // 保存新增的计划信息
    doInsert() {
      console.log(this.askProvince)
      if (this.year === '') {
        this.$message.warning('请选择年份')
        return
      }
      if (this.startMonth === '') {
        this.$message.warning('请选择月份')
        return
      }
      // if (this.endMonth === '') {
      //   this.$message.warning('请选择结束月份')
      //   return
      // }
      // if (this.endMonth < this.startMonth) {
      //   this.$message.warning('开始月份不得大于结束月份')
      //   return
      // }
      let param = {
        year: this.year,
        month: this.startMonth,
        fileName: this.fileName,
        reportType: routerMap[this.$route.name].code,
        // endMonth: this.endMonth,
        provinceCode: this.provinceCode,
        provinceName: this.provinceName
      }
      this.addLoading = true
      HttpModule.preViewCreate(routerMap[this.$route.name].axiosStr, param).then(res => {
        this.addLoading = false
        if (res.code === '000000') {
          this.$parent.filePreviewDialogVisible = true
          this.$parent.fileGuid = res.data.fileguid
          this.$parent.delId = res.data.id
          this.$parent.propsFileName = res.data.fileName
          this.$parent.previewYear = this.year
          this.$parent.previewStartMonth = this.startMonth
          // this.$parent.previewEndMonth = this.endMonth
          this.$parent.provinceCode = this.provinceCode
          this.$parent.provinceName = this.provinceName
          this.$parent.reportType = routerMap[this.$route.name].code
        } else {
          this.$message.error(res.message)
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
    getLeftTreeData() {
      let that = this
      let params = {}
      if (this.userInfo.province.substring(2, 9) === '0000000') {
        params = {
          elementcode: 'admdiv',
          province: this.userInfo.province,
          year: this.userInfo.year,
          wheresql: 'and code like \'' + this.userInfo.province.substring(0, 2) + '%\'' + 'and code not like \'%998\''
        }
      } else if (
        this.userInfo.province.substring(4, 9) === '00000' && this.userInfo.province.substring(2, 9) !== '0000000'
      ) {
        params = {
          elementcode: 'admdiv',
          province: this.userInfo.province,
          year: this.userInfo.year,
          wheresql: 'and code like \'' + this.userInfo.province.substring(0, 4) + '%\'' + 'and code not like \'%998\''
        }
      } else {
        params = {
          elementcode: 'admdiv',
          province: this.userInfo.province,
          year: this.userInfo.year,
          wheresql: 'and code like \'' + this.userInfo.province.substring(0, 6) + '%\'' + 'and code not like \'%998\''
        }
      }
      HttpModule.getLeftTree(params).then(res => {
        if (res.rscode === '100000') {
          let treeResdata = that.getRegulationChildrenData(res.data)
          that.askProvinceOptions = treeResdata
        } else {
          this.$message.error('左侧树加载失败')
        }
      })
    },
    selectProvince(val) {
      console.log(val)
      // let valArr = val.split(',')
      // let nameList = []
      // for (let i = 0; i < valArr.length; i++) {
      //   nameList.push(valArr[i].split('##')[2])
      // }
      this.provinceName = val.split('##')[2]
      this.provinceCode = val.split('##')[1]
      // console.log(nameList)
    }
  },
  watch: {
  },
  created() {
    this.userInfo = this.$store.state.userInfo
    this.isSx = this.$store.getters.isSx
    this.getLeftTreeData()
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
