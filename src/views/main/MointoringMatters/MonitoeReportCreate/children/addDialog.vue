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
                    <div class="sub-title-add" style="width:20%;float:left;margin-top:8px"><font color="red">*</font>&nbsp;开始月份</div>
                    <el-select
                      v-model="startMonth"
                      placeholder="请选择开始月份"
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
          <el-row>
            <el-col :span="20">
              <el-container>
                <el-main width="100%">
                  <el-row>
                    <div class="sub-title-add" style="width:20%;float:left;margin-top:8px"><font color="red">*</font>&nbsp;结束月份</div>
                    <el-select
                      v-model="endMonth"
                      placeholder="请选择结束月份"
                      style="width:70%"
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
        </div>
      </div>
    </div>
  </vxe-modal>
</template>
<script>
// import { proconf } from '../PoliciesAndRegulationsManagement.js'
import HttpModule from '@/api/frame/main/Monitoring/MonitoeReportCreate.js'
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
        { value: 2022, label: '2022年' }
      ],
      startMonth: '',
      endMonth: '',
      startMonthOptions: [
        { value: 1, label: '一月' },
        { value: 2, label: '二月' },
        { value: 3, label: '三月' },
        { value: 4, label: '四月' },
        { value: 5, label: '五月' },
        { value: 6, label: '六月' },
        { value: 7, label: '七月' },
        { value: 8, label: '八月' },
        { value: 9, label: '九月' },
        { value: 10, label: '十月' },
        { value: 11, label: '十一月' },
        { value: 12, label: '十二月' }
      ]
    }
  },
  methods: {
    dialogClose() {
      this.$parent.dialogVisible = false
      this.$parent.queryTableDatas()
    },
    // 保存新增的计划信息
    doInsert() {
      if (this.year === '') {
        this.$message.warning('请选择年份')
        return
      }
      if (this.startMonth === '') {
        this.$message.warning('请选择开始月份')
        return
      }
      if (this.endMonth === '') {
        this.$message.warning('请选择结束月份')
        return
      }
      if (this.endMonth < this.startMonth) {
        this.$message.warning('开始月份不得大于结束月份')
        return
      }
      let code = this.node.code
      let name = this.node.name
      let param = {
        year: this.year,
        startMonth: this.startMonth,
        endMonth: this.endMonth,
        provinceCode: code,
        provinceName: name
      }
      this.addLoading = true
      HttpModule.look(param).then(res => {
        this.addLoading = false
        if (res.code === '000000') {
          this.$parent.filePreviewDialogVisible = true
          this.$parent.fileGuid = res.data.fileguid
          this.$parent.delId = res.data.id
          this.$parent.previewYear = this.year
          this.$parent.previewStartMonth = this.startMonth
          this.$parent.previewEndMonth = this.endMonth
          this.$parent.previewCode = code
          this.$parent.previewName = name
        } else {
          this.$message.error(res.message)
        }
      })
    }
  },
  watch: {
  },
  created() {
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
