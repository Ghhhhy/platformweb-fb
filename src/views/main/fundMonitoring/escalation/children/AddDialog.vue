<!--监控规则函数管理新增页面弹框-->
<template>
  <vxe-modal
    v-model="dialogVisible"
    class="ledger"
    :title="title"
    width="35%"
    height="80%"
    position="top"
    :show-footer="true"
    @close="dialogClose"
  >
    <div v-loading="addLoading" style="padding-bottom: 10px; text-align: center">
      <el-row>
        <el-col :span="11">
          <el-container>
            <el-main width="100%">
              <el-row>
                <div class="sub-title-add" style="width:100px;float:left;margin-top:8px"><font color="red">*</font>&nbsp;选择年度</div>
                <el-select v-model="fiscalYear" placeholder="年度">
                  <el-option
                    v-for="item in options"
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
        <el-col :span="11">
          <el-container>
            <el-main width="100%">
              <el-row>
                <div class="sub-title-add" style="width:100px;float:left;margin-top:8px"><font color="red">*</font>&nbsp;起始日期</div>
                <el-date-picker
                  v-model="form.startTime"
                  type="date"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期"
                />
              </el-row>
            </el-main>
          </el-container>
        </el-col>
        <el-col :span="11">
          <el-container>
            <el-main width="100%">
              <el-row>
                <div class="sub-title-add" style="width:100px;float:left;margin-top:8px"><font color="red">*</font>&nbsp;截止日期</div>
                <el-date-picker
                  v-model="form.endTime"
                  type="date"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期"
                />
              </el-row>
            </el-main>
          </el-container>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-container>
            <el-main width="100%">
              <el-row>
                <div class="sub-title-add" style="width:100px;float:left;margin-top:8px"><font color="red">*</font>&nbsp;生成范围</div>
                <BsTree
                  ref="rightTree"
                  style="height: calc(100%)"
                  :tree-data="treeData"
                  :default-expanded-keys="['619900000', '619800000']"
                  :config="{ multiple: true, rootName: '全部', disabled: disabled, treeProps: { nodeKey: 'code', label: 'label' } }"
                  @onNodeCheckClick="onNodeCheckClick"
                />
              </el-row>
            </el-main>
          </el-container>
        </el-col>
      </el-row>
    </div>
    <div slot="footer" class="vxeModalUnique">
      <el-button size="mini" @click="dialogClose">取消</el-button>
      <el-button size="mini" type="primary" style="margin-right:0px;" @click="addOrUpdate">生成</el-button>
    </div>
  </vxe-modal>
</template>
<script>
// import { proconf } from '../PoliciesAndRegulationsManagement.js'
import HttpModule from '@/api/frame/main/fundMonitoring/escalation.js'

export default {
  name: 'AddDialog',
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
    selectData: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data() {
    return {
      options: [{
        value: '2022',
        label: '2022年'
      }, {
        value: '2023',
        label: '2023年'
      }],
      fiscalYear: this.$store.state.userInfo.year,
      isStrictly: false,
      checkedKeys: [],
      endTime: '',
      treeData: [],
      scope: [],
      disabled: false,
      content: '',
      mofShow: false,
      btnShow: true,
      mainPagerConfig: {
        total: 0,
        currentPage: 1,
        pageSize: 20
      },
      formData: {
        reportName: '',
        sqlCode: '',
        description: ''
      },
      tableConfig: {},
      dataSourceCode: '',
      dataSourceName: '',
      functionType: '',
      functionName: '',
      mrTime: '',
      functionApi: '',
      functionParameter: '',
      description: '',
      dialogVisible: true,
      addLoading: true,
      token: '',
      isContinuity: false,
      // 文件上传相关参数
      fileList: [],
      fileData: [],
      fileDataBakDel: [],
      attachmentId: '',
      showbox: false,
      form: {
        startTime: '',
        endTime: ''
      },
      addParam: {},
      fiRuleName: '',
      regulationClassName: ''
    }
  },
  methods: {
    // 设置默认选中当前日期
    getNowTime() {
      let date = new Date()
      let year = date.toLocaleDateString().split('/')[0]
      let month = date.toLocaleDateString().split('/')[1]
      let day = date.toLocaleDateString().split('/')[2] - 1
      const defaultDate = year + '-' + month + '-' + day
      // const defaultDate1 = this.$store.state.userInfo.year + '-01-01'
      // this.$set(this.form, 'startTime', defaultDate1)
      this.$set(this.form, 'endTime', defaultDate)
    },
    onNodeCheckClick(data) {
      console.log(data)
      let arr = []
      data.nodes.forEach(item => {
        if (item.isleaf) {
          arr.push(item.code)
        }
      })
      console.log('arr', arr)
      this.scope = arr
    },
    itemChange(property, value, dataList, itemsConfig) {
      this.formData = property.data
    },
    ajaxTableData({ params, currentPage, pageSize }) {
      this.mainPagerConfig.currentPage = currentPage
      this.mainPagerConfig.pageSize = pageSize
      this.queryTableDatas()
    },
    dialogClose() {
      this.$parent.addDialogVisible = false
      this.$parent.queryTableDatas()
    },
    getProvince(data) {
      this.treeData = this.getChildrenNewData(data)
      // data.forEach(item => {
      //   if (item.code === this.$store.state.userInfo.province) {
      //     if (this.$store.state.userInfo.province === '610000000') {
      //       let arr = []
      //       arr.push(data)
      //       this.treeData = this.getChildrenNewData(arr)
      //       let dataArr = []
      //       this.getCheckData(dataArr, this.treeData)
      //       this.scope = dataArr
      //       console.log('scope', this.scope)
      //     } else {
      //       let arr = []
      //       arr.push(item)
      //       this.treeData = this.getChildrenNewData(arr)
      //     }
      //   } else {
      //     if (item.children) {
      //       // let arr = []
      //       // arr.push(item)
      //       this.getProvince(item.children)
      //     }
      //   }
      // })
    },
    getChildrenNewData(datas) {
      let that = this
      datas.forEach(item => {
        item.label = item.codeFragment + '-' + item.name
        if (item.children) {
          that.getChildrenNewData(item.children)
        }
      })

      return datas
    },
    getMofDiv() {
      HttpModule.getMofTreeData().then(res => {
        if (res.code === '000000') {
          console.log('data', res.data)
          this.getProvince(res.data)
          // let treeResdata = this.getChildrenNewData1(res.data)
          // this.treeData = treeResdata
          // let dataArr = []
          // this.getCheckData(dataArr, this.treeData)
          // this.scope = dataArr
          if (this.title === '生成') {
            let tempArr = []
            this.$nextTick(() => {
              this.$refs.rightTree.treeOptionFn().setCheckedKeys(tempArr)
            })
          }
        } else {
          this.$message.error(res.message)
        }
      })
    },
    getCheckData(dataArr, data) {
      data.forEach(item => {
        if (item.isleaf === '1') {
          let obj = {
            mofDivCode: ''
          }
          obj.mofDivCode = item.code
          dataArr.push(obj)
        }
        if (item.children) {
          this.getCheckData(dataArr, item.children)
        }
      })
    },
    getChildrenNewData1(datas) {
      let that = this
      datas.forEach(item => {
        item.label = item.code + '-' + item.name
        if (item.children) {
          that.getChildrenNewData1(item.children)
        }
      })
      return datas
    },
    // 保存新增的计划信息
    addOrUpdate() {
      if (this.title === '生成') {
        if (this.scope.length < 1) {
          this.$message.info('请选择生效范围！')
          return
        }
        if (this.form.startTime === '') {
          this.$message.info('请选择起始时间！')
          return
        }
        if (this.form.endTime === '') {
          this.$message.info('请选择截止时间！')
          return
        }
        const param = {
          scope: this.scope,
          fiscalYear: this.fiscalYear,
          startTime: this.form.startTime,
          endTime: this.form.endTime
        }
        this.addLoading = true
        HttpModule.addLog(param).then((res) => {
          this.addLoading = false
          if (res.code === '000000') {
            this.$message.success('生成中')
            this.$parent.addDialogVisible = false
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
    /* if (this.userInfo.province === '610000000') {
      this.btnShow = false
    } */
    this.getMofDiv()
    this.getNowTime()
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
.ledger .vxe-textarea {
  height: 150px
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
