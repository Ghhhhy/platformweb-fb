<!--政策法规管理新增页面弹框-->
<template>
  <vxe-modal
    v-model="dialogVisible"
    :title="title"
    width="80%"
    height="90%"
    :show-footer="true"
    @close="dialogClose"
  >
    <div v-loading="addLoading" class="payVoucherInput">
      <div>
        <div>
          <el-row style="color:#1890ff;font-weight:bold">
            问询函信息
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-container>
                <el-main width="100%">
                  <el-row>
                    <div class="sub-title-add" style="width:120px;float:left;margin-top:8px">被问询区划</div>
                    <el-input
                      v-model="askProvinceName"
                      disabled="true"
                      placeholder=""
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
                    <div class="sub-title-add" style="width:120px;float:left;margin-top:8px">被问询单位</div>
                    <el-input
                      v-model="askAgencyName"
                      disabled="true"
                      placeholder=""
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
                    <div class="sub-title-add" style="width:120px;float:left;margin-top:8px">问询函编码</div>
                    <el-input
                      v-model="askCode"
                      disabled="true"
                      placeholder=""
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
                    <div class="sub-title-add" style="width:120px;float:left;margin-top:8px">问询事项</div>
                    <el-input
                      v-model="askName"
                      disabled="true"
                      placeholder=""
                      style="width:45%"
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
                    <div class="sub-title-add" style="width:120px;float:left;margin-top:8px">函询事项基本情况</div>
                    <el-input
                      v-model="askDesc"
                      type="textarea"
                      disabled="true"
                      placeholder=""
                      style="width:45%"
                    />
                  </el-row>
                </el-main>
              </el-container>
            </el-col>
          </el-row>
          <!-- <el-row>
            <el-col :span="24">
              <el-container>
                <el-main width="100%">
                  <el-row>
                    <div class="sub-title-add" style="width:120px;float:left;margin-top:8px">查看附件</div>
                  </el-row>
                  <div style="height:100px;margin-left:120px">
                    <BsTable
                      ref="table"
                      :footer-config="{ showFooter: false }"
                      :table-columns-config="tableColumnsConfig"
                      :table-data="tableData"
                      :table-config="tableConfig"
                      :toolbar-config="false"
                      :pager-config="false"
                    />
                  </div>
                </el-main>
              </el-container>
            </el-col>
          </el-row> -->
        </div>
        <div>
          <el-row style="color:#1890ff;font-weight:bold">
            问询函单位回复信息
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-container>
                <el-main width="100%">
                  <el-row>
                    <div class="sub-title-add" style="width:120px;float:left;margin-top:8px">被问询区划</div>
                    <el-input
                      v-model="askProvinceName"
                      disabled="true"
                      placeholder=""
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
                    <div class="sub-title-add" style="width:120px;float:left;margin-top:8px">被问询单位</div>
                    <el-input
                      v-model="askAgencyName"
                      disabled="true"
                      placeholder=""
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
                    <div class="sub-title-add" style="width:120px;float:left;margin-top:8px">函询事项单位回复人</div>
                    <el-input
                      v-model="agencyPerson"
                      disabled="true"
                      placeholder=""
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
                    <div class="sub-title-add" style="width:120px;float:left;margin-top:8px"><font color="red">*</font>函询事项单位回复人电话</div>
                    <el-input
                      v-model="askAgencyTel"
                      disabled="true"
                      placeholder=""
                      style="width:45%"
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
                    <div class="sub-title-add" style="width:120px;float:left;margin-top:8px"><font color="red">*</font>函询事项单位回复情况</div>
                    <el-input
                      v-model="agencyOption"
                      disabled="true"
                      type="textarea"
                      placeholder="请输入函询事项单位回复情况"
                      style="width:45%"
                    />
                  </el-row>
                </el-main>
              </el-container>
            </el-col>
          </el-row>
          <!-- <el-row>
            <el-col :span="24">
              <el-container>
                <el-main width="100%">
                  <el-row>
                    <div class="sub-title-add" style="width:120px;float:left;margin-top:8px">查看附件</div>
                  </el-row>
                  <div style="height:100px;margin-left:120px">
                    <BsTable
                      ref="table"
                      :footer-config="{ showFooter: false }"
                      :table-columns-config="tableColumnsConfig"
                      :table-data="tableData"
                      :table-config="tableConfig"
                      :toolbar-config="false"
                      :pager-config="false"
                    />
                  </div>
                </el-main>
              </el-container>
            </el-col>
          </el-row> -->
          <el-row style="color:#1890ff;font-weight:bold">
            问询函财政回复信息
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-container>
                <el-main width="100%">
                  <el-row>
                    <div class="sub-title-add" style="width:120px;float:left;margin-top:8px">函询事项财政回复人</div>
                    <el-input
                      v-model="financePerson"
                      disabled="true"
                      placeholder=""
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
                    <div class="sub-title-add" style="width:120px;float:left;margin-top:8px"><font color="red">*</font>函询事项财政回复人电话</div>
                    <el-input
                      v-model="askFinanceTel"
                      placeholder=""
                      style="width:45%"
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
                    <div class="sub-title-add" style="width:120px;float:left;margin-top:8px"><font color="red">*</font>函询事项财政回复情况</div>
                    <el-input
                      v-model="financeOption"
                      type="textarea"
                      placeholder="请输入函询事项财政回复情况"
                      style="width:45%"
                    />
                  </el-row>
                </el-main>
              </el-container>
            </el-col>
          </el-row>
        </div>
      </div>
      <!-- 上传附件 -->
      <BsUploadBak ref="myUpload" :attachment-id="attachmentId" :file-list="fileList" :file-data-bak-del.sync="fileDataBakDel" :file-data.sync="fileData" />
    </div>
    <div slot="footer" style="height: 80px;margin:0 15px">
      <el-divider style="color:#E7EBF0" />
      <div type="flex" justify="space-around">
        <div>
          <vxe-button @click="dialogClose">取消</vxe-button>
          <vxe-button id="savebutton" status="primary" @click="doInsert">确定</vxe-button>
        </div>
      </div>
    </div>
  </vxe-modal>
</template>
<script>
import { proconf } from './addDialog.js'
import HttpModule from '@/api/frame/main/Monitoring/InquiryLetterReplyByFinance.js'
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
    }
  },
  data() {
    return {
      dialogVisible: true,
      tableFooterConfig: {
        showFooter: false
      },
      tableColumnsConfig: proconf.PoliciesTableColumns,
      tableData: [{
        regulationCode: '测试'
      }],
      tableConfig: {
        renderers: {
          // 编辑 附件 操作日志
          $payVoucherInputGloableOptionRow: proconf.gloableOptionRow
        },
        methods: {
          onOptionRowClick: this.onOptionRowClick
        }
      },
      askProvinceName: '',
      askAgencyName: '',
      askCode: '',
      askName: '',
      askDesc: '',
      agencyPerson: '',
      askAgencyTel: '',
      agencyOption: '',
      financePerson: '',
      financeOption: '',
      askFinanceTel: '',
      userInfo: {},
      attachmentId: ''
    }
  },
  methods: {
    dialogClose() {
      this.$parent.dialogVisible = false
      this.$parent.queryTableDatas()
      this.$parent.queryTableDatasCount()
    },
    onToolbarBtnClick({ context, table, code }) {
      switch (code) {
        // 刷新
        case 'refresh':
          this.refresh()
          break
      }
    },
    ajaxTableData({ params, currentPage, pageSize }) {
      this.mainPagerConfig.currentPage = currentPage
      this.mainPagerConfig.pageSize = pageSize
      this.queryTableDatas()
    },
    // 表格单元行单击
    cellClick(obj, context, e) {
      let key = obj.column.property
      console.log(key, obj.row)
      switch (key) {
      }
    },
    doInsert() {
      if (this.askFinanceTel === '') {
        this.$message.warning('请填写函询事项单位回复人电话')
        return
      }
      if (this.financeOption === '') {
        this.$message.warning('请输入函询事项单位回复情况')
        return
      }
      let re = /^1\d{10}$/
      let re1 = /^\d{3}-\d{8}$|\d{4}-\d{7}$/
      if (!re.test(this.askFinanceTel)) {
        if (!re1.test(this.askFinanceTel)) {
          this.$message.warning('请输入正确的电话号码')
          return
        }
      }
      const params = {
        askCode: this.modifyData.askCode,
        menuId: this.$store.state.curNavModule.guid,
        askFinanceTel: this.askFinanceTel,
        financePerson: this.financePerson,
        financeOption: this.financeOption,
        attachmentId: this.attachmentId
      }
      HttpModule.pass(params).then(res => {
        if (res.code === '000000') {
          this.$message.success('回复成功')
          this.dialogClose()
        } else {
          this.$message.error(res.result)
        }
      })
    },
    showInfo() {
      this.attachmentId = this.modifyData.attachmentId
      this.askProvinceName = this.modifyData.askProvinceName
      this.askAgencyName = this.modifyData.askAgencyName
      this.askCode = this.modifyData.askCode
      this.askName = this.modifyData.askName
      this.askDesc = this.modifyData.askDesc
      this.agencyPerson = this.modifyData.agencyPerson
      this.askAgencyTel = this.modifyData.askAgencyTel
      this.agencyOption = this.modifyData.agencyOption
      this.financePerson = this.userInfo.name
    }
  },
  watch: {
  },
  created() {
    this.userInfo = this.$store.state.userInfo
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
  .setbtn{
    width:100px;
    height:45px;
    float:left;
    margin-right:20px;
  }
  .tabone{
    width:100px;
    height:40px;
    text-align:center;
    line-height:40px;
    float:left;
    border:1px solid #ccc;
    border-radius:4px;
  }
  .tabone1{
    width:100px;
    height:40px;
    text-align:center;
    line-height:40px;
    float:left;
    border:1px solid #ccc;
    background-color:#f2f2f2;
    border-radius:4px;
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
