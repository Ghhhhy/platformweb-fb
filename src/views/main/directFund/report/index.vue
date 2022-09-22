<!--  formList模版   Author:Titans@2396757591@qq.com -->
<template>
  <div class="height-all">
    <BsMainFormListLayout ref="summaryTable":left-visible.sync="leftVisible">
      <!-- leftVisible不为undefined为渲染mainTree和mainForm插槽 ，否则渲染mainCon插槽-->
      <template v-slot:topTabPane>
        <BsTabPanel
          ref="bsTabPanel"
          :show-zero="false"
          :is-hide-query="true"
          :tab-status-btn-config="tabStatusBtnConfig"
          :tab-status-num-config="{}"
          @tabClick="onTabPaneltabClick"
          @btnClick="onTabPanelBtnClick"
        >
          <template v-slot:preBtns>
            <vxe-button
              v-show="!editStatus && false"
              size="medium"
              status="primary"
              content="提取"
              @click="getEditStatus"
            />
            <vxe-button
              v-show="editStatus && curStatusNum === 0"
              size="medium"
              status="primary"
              content="取消提取"
              @click="cancelEdit"
            />
            <vxe-button
              v-show="!editStatus && curStatusNum === 1 && isAllParent"
              size="medium"
              status="primary"
              content="编辑"
              style="margin-right:8px"
              @click="toEditSummary"
            />
            <vxe-button
              v-show="!editStatus && curStatusNum === 7 && isSummaryPage === 1"
              size="medium"
              status="primary"
              content="汇总"
              @click="doSummary"
            />
            <vxe-button
              v-show="editStatus && curStatusNum === 7"
              size="medium"
              status="primary"
              content="取消编辑"
              @click="summaryCancelEdit"
            />
          </template>
        </BsTabPanel>
      </template>
      <template v-slot:mainTree>
        <BsSplitPane
          :min-percent="0"
          split="horizontal"
          :default-percent="100"
        >
          <template slot="paneL">
            <div v-if="matchState()" class="mmc-left-tree" style="height:50%">
              <div class="mmc-left-tree-title">
                <div
                  class="tree-set__content"
                  style="--tree-set-no__icon: 7px"
                >
                  <div v-if="leftVisible" class="fn-inline aside-tree-show-leftvisible" @click="leftVisible = false">
                  </div>
                  <div class="fn-inline tree-set__tip">
                    <span>区划</span>
                  </div>
                  <div class="fn-inline tree-set__query">
                    <el-input v-model="inputTableTreeFilterText" prefix-icon="el-icon-search" placeholder="搜索区划" />
                  </div>
                </div>
              </div>
              <div class="mmc-left-tree-body">
                <BsTree
                  ref="mofDivTree"
                  open-loading
                  :filter-text="inputTableTreeFilterText"
                  :config="mofDivTreeConfig"
                  :tree-data="mofDivTreeData"
                  :queryparams="mofDivTreeQueryparams"
                  @onNodeCheckChange="mofDivTreeNodeCheckChange"
                  @onNodeCheckClick="mofDivTreeNodeCheckClick"
                  @onNodeClick="mofDivTreeNodeClick"
                />
              </div>
            </div>
            <div class="mmc-left-tree" :style="{ height: curStatusNum === 1 ? '50%' : '100%' }">
              <div class="mmc-left-tree-title">
                <div
                  class="tree-set__content"
                  style="--tree-set-no__icon: 7px"
                >
                  <div class="fn-inline tree-set__tip">
                    <span>查询表</span>
                  </div>
                  <div class="fn-inline tree-set__query">
                    <el-input v-model="mofDivTreeFilterText" prefix-icon="el-icon-search" placeholder="搜索查询表" />
                  </div>
                </div>
              </div>
              <div class="mmc-left-tree-body">
                <BsTree
                  ref="inputTableTree"
                  open-loading
                  :filter-text="mofDivTreeFilterText"
                  :config="inputTableTreeConfig"
                  :tree-data="inputTableTreeData"
                  :queryparams="inputTableTreeQueryparams"
                  @onNodeCheckChange="onInputTableTreeNodeCheckChange"
                  @onNodeCheckClick="onInputTableTreeNodeCheckClick"
                  @onNodeClick="onInputTableTreeNodeClick"
                />
              </div>
            </div>
          </template>
        </BsSplitPane>
        <div class=""></div>
      </template>
      <template v-slot:mainForm>
        <div style="height:100%">
          <div class="mmc-left-tree-title">
            <BsTab ref="bsTab" :tab-list.sync="tabDatas" :can-clear="true" :default-select="tabSelect" @onTabClick="clickTab" />
          </div>
          <BsTable
            ref="bsTableRef"
            style="padding: 8px 0; height:calc(100% - 48px)"
            :loading="showLoading"
            :footer-config="footerConfig"
            :table-config="tableConfig"
            :edit-config="editConfig"
            :table-columns-config="tableColumnsConfig"
            :table-data="tableData"
            :toolbar-config="toolbarConfig"
            :edit-rules="editRules"
            :pager-config="false"
            :default-money-unit="10000"
            :keyboard-config="tableKeyboardConfig"
            @onToolbarBtnClick="onTableToolbarBtnClick"
            @ajaxData="ajaxData"
          >
            <template v-slot:toolbarSlots>
              <div class="table-toolbar-left">
                <div
                  v-if="leftVisible === false"
                  class="table-toolbar-contro-leftvisible"
                  @click="leftVisible = true"
                ></div>
                <div class="table-toolbar-left-title">
                  <span class="fn-inline">{{ curTable.name }}</span>
                  <i class="fn-inline"></i>
                </div>
              </div>
            </template>
          </BsTable>
        </div>
      </template>
    </BsMainFormListLayout>
    <div>
      <AuditDialog
        v-if="showDialog"
        ref="AuditDialog"
        :dialog-visible.sync="showDialog"
      />
    </div>
    <div>
      <ReportPreviewDialog
        v-if="showPreviewDialog"
        ref="ReportPreviewDialog"
        :dialog-visible.sync="showPreviewDialog"
        :cur-report-id="curReportId"
      />
    </div>
    <div>
      <Accept
        v-if="showAcceptDialog"
        ref="AcceptDialog"
        :dialog-visible.sync="showAcceptDialog"
        :accept-type="acceptType"
        :cur-report-id="curReportId"
      />
    </div>
  </div>
</template>
<script>
import { myMethods } from './js/methods.js'
import AuditDialog from './summaryAuditDialog'
import ReportPreviewDialog from './ReportPreviewDialog'
import Accept from './accept'
export default {
  name: 'DepBudgetReportQuery',
  components: {
    AuditDialog,
    ReportPreviewDialog,
    Accept
  },
  props: {
  },
  data() {
    return {
      editConfig: {
        trigger: 'click',
        mode: 'cell',
        activeMethod: function () {
          return true
        }
      },
      tabDatas: [],
      tabSelect: {},
      fieldSize: 0,
      editStatus: false,
      showDialog: false,
      showPreviewDialog: false,
      showAcceptDialog: false,
      acceptType: 1,
      curReportId: '',
      leftVisible: true,
      mofDivTreeConfig: {},
      mofDivTreeData: [],
      mofDivTreeFilterText: '',
      mofDivTreeQueryparams: {},
      inputTableTreeConfig: {},
      inputTableTreeQueryparams: {},
      inputTableTreeFilterText: '',
      inputTableTreeData: [],
      pagerConfig: false,
      footerConfig: false,
      toolbarConfig: {},
      tableConfig: {},
      tableColumnsConfig: [],
      tableData: [],
      agencyIds: [],
      buttonConfig: [],
      editRules: {},
      fiscalConfig: {},
      curAgencyId: null,
      curAgency: {},
      showLoading: false,
      hasRight: false,
      isEdit: false,
      // curBatchNoStat: 2,
      // showBatchSwitch: true,
      topTip: '请点击左侧单位列表',
      tableKeyboardConfig: {
        isArrow: true,
        isDel: false,
        isEnter: true,
        isTab: true,
        isEdit: true
      },
      curTable: {
        name: '请选择报表'
      },
      curreportguid: '',
      curreportcode: '',
      queryBossFiscalTableConfig: {
        appguid: 'fiscal',
        isQueryTable: true,
        reportguid: '4FEE8F6F8BDB4EE7A7552F4DA10B3B7A',
        sxspecroleguid: '999004'
      },
      queryBossDesignReportData: {
        appguid: 'fiscal',
        appid: 'bisReport',
        menuguid: this.$store.state.curNavModule.guid,
        reportId: '',
        fieldSize: 0,
        sxspecroleguid: '999004',
        mofDivCode: '',
        summaryFlag: false
      },
      provinceFlag: false,
      tabStatusBtnConfig: {},
      curStatusNum: 0,
      isSummaryPage: 0,
      isShowDivTree: false,
      curMofDivCode: '',
      mofDivTreeClick: {
        code: '',
        name: ''
      },
      isSum: false,
      isAllParent: false,
      reportTableClickNode: {
        id: '',
        code: '',
        name: ''
      },
      param5: {} // 参数
    }
  },
  computed: {
    curNavModule() {
      return this.$store.state.curNavModule
    },
    userInfo() {
      return this.$store.state.userInfo
    }
  },
  methods: {
    ...myMethods,
    onTabPanelBtnClick(obj) { // 按钮点击
      let self = this
      switch (obj.code) {
        case 'toolbar-auit': // 勾稽审核
          self.showDialog = true
          break
        case 'commit': // 提交
          // self.showLoading = true
          // self.doCurrentLevelCommit()
          this.$XModal.message({ status: 'success', message: '提交成功!' })
          break
        case 'import': // 导出
          self.govExport()
          break
        case 'refresh': // 刷新
          self.getSpecTableData()
          break
        case 'summary_commit': // 汇总提交
          // self.showLoading = true
          // self.doCommit(2)
          this.$XModal.message({ status: 'success', message: '提交成功!' })
          break
        case 'toolbar-save': // 保存
          // self.showLoading = true
          // self.doCommit(1) 暂时先去掉演示
          this.$XModal.message({ status: 'success', message: '保存成功!' })
          this.cancelEdit()
          break
        case 'accept':// 接收
          if (this.curreportguid === '') {
            this.$XModal.message({ status: 'error', message: '请选择报表!' })
            return
          }
          self.acceptType = 1
          self.showAcceptDialog = true
          self.curReportId = self.curreportguid
          break
        case 'acceptTest':
          this.loadingPage = this.showLoadingScreen()
          setTimeout(() => {
            this.loadingPage.close()
            this.$XModal.message({ status: 'success', message: '检验成功!' })
          }, 3000)
          break
        case 'rocback':// 退回
          self.acceptType = 2
          self.showAcceptDialog = true
          break
        case 'toolbar-back':// 撤销
          // self.showLoading = true
          // self.doBack()
          this.$XModal.message({ status: 'success', message: '撤销成功!' })
          break
        case 'summary-save':// 汇总保存
          // self.summmarySave()
          this.$XModal.message({ status: 'success', message: '保存成功!' })
          this.summaryCancelEdit()
          break
        case 'toolbar-preview':
          if (this.curreportguid === '') {
            this.$XModal.message({ status: 'error', message: '请选择报表!' })
            return
          }
          self.curReportId = self.curreportguid
          self.showPreviewDialog = true
          break
        case 'reportcommit2audit': // 送审
          // self.showLoading = true
          // self.doAudit(3)
          // this.$XModal.message({ status: 'success', message: '送审成功!' })
          break
        case 'reportAudit': // 审核
          // self.showLoading = true
          // self.doAudit(4)
          this.$XModal.message({ status: 'success', message: '审核成功!' })
          break
        case 'reportReturn': // 审核退回
          // self.showLoading = true
          // self.doAudit(5)
          this.$XModal.message({ status: 'success', message: '退回成功!' })
          break
      }
    },
    onTabPaneltabClick(obj) { // 状态
      let self = this
      switch (obj.code) {
        case 'benji':
          self.curStatusNum = 0
          self.curMofDivCode = ''
          self.queryBossDesignReportData.summaryFlag = false
          break
        case 'summary':
          if (self.editStatus) {
            this.$XModal.message({ status: 'error', message: '请先退出编辑状态再进行操作' })
            return
          }
          self.curStatusNum = 7
          self.queryBossDesignReportData.summaryFlag = true
          self.isSummaryPage = 1
          break
        case 'unAccept':
          self.curStatusNum = 1
          break
        case 'accepted':
          self.curStatusNum = 2
          break
        case 'unAudit':
          self.curStatusNum = 5
          self.isShowDivTree = true
          if (this.param5.isAudit === '2') {
            self.queryBossDesignReportData.summaryFlag = true
          }
          break
        case 'audited':
          self.curStatusNum = 6
          self.isShowDivTree = true
          if (this.param5.isAudit === '2') {
            self.queryBossDesignReportData.summaryFlag = true
          }
          break
      }
      self.clickTab(self.reportTableClickNode)
    },
    getEditStatus() {
      if (this.curreportguid === '') {
        this.$XModal.message({ status: 'error', message: '请选择报表!' })
        return
      }
      this.editStatus = true
      this.$refs.bsTabPanel.rButtons = [
        {
          code: 'toolbar-save',
          label: '保存',
          status: 'primary'
        }]
      self.showLoading = true
      // this.doEextract() 暂时注释掉 造数据用于演示
      self.showLoading = false
    },
    cancelEdit() {
      this.editStatus = false
      this.$refs.bsTabPanel.rButtons = this.tabStatusBtnConfig.buttonsInfo['benji']
    },
    summaryCancelEdit() {
      this.editStatus = false
      this.canEdit = false
      this.refreshTable2Edit(false)
      this.getSpecTableData()
      this.$refs.bsTabPanel.rButtons = this.tabStatusBtnConfig.buttonsInfo['summary']
    },
    transJson(str) {
      if (!str) return
      var params = str.split(',')
      var result = {}
      if (params && params.length > 0) {
        for (var i = 0; i < params.length; i++) {
          var map = params[i].split('=')
          result[map[0]] = map[1]
        }
      }
      return result
    },
    matchState() {
      return (this.curStatusNum === 1 || this.curStatusNum === 2 || this.curStatusNum === 3 || this.curStatusNum === 7) || this.isShowDivTree
    },
    showLoadingScreen() {
      return this.$loading({
        lock: true,
        text: '正在处理中...请您稍后',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
    }
  },
  mounted() {
    this.initMounted()
    // setTimeout(() => {
    //   this.$refs.inputTableTree.treeDataIn[0].children = this.$refs.inputTableTree.treeDataIn[0].children.filter(item => { return item.code.indexOf("Z") === 0 })
    // }, 200)
  },
  created() {
    this.param5 = this.transJson(this.$store.state.curNavModule.param5)
    this.initCreated(this.param5)
  },
  watch: {
  }
}
</script>

<style lang='scss'>
.title-tip {
  color: red;
  font-weight: bold;
  font-size: 14px;
  padding-left: 20px;
}
.mmc-left-tree-body {
  overflow: auto;
}
.leftvisible-bmysbb {
    float: left;
    margin-left: 16px;
    height: 32px;
    width: 32px;
    cursor: pointer;
    background: url(/img/tree-hide-ico.e654e77d.svg);
    background-size: 100% 100%;
}
// 横向分割条
.T-mainFormListLayout-modulebox
  .mmc-formlist
  .vue-splitter-container
  .splitter-pane-resizer.horizontal {
  width: 100% !important;
  height: 5px !important;
}
</style>
