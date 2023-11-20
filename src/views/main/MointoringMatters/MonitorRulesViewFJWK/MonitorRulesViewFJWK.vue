<!-- 监控规则查看 -->
<template>
  <div style="height: 100%">
    <BsMainFormListLayout :left-visible.sync="leftTreeVisible">
      <template v-slot:topTap></template>
      <template v-slot:topTabPane>
        <BsTabPanel
          ref="tabPanel"
          show-zero
          :show-num="true"
          :is-open="isShowQueryConditions"
          :tab-status-btn-config="toolBarStatusBtnConfig"
          :tab-status-num-config="tabStatusNumConfig"
          @btnClick="operationToolbarButtonClickEvent"
          @tabClick="onStatusTabClick"
          @onQueryConditionsClick="isShowQueryConditions = !isShowQueryConditions"
        />
      </template>
      <template v-slot:query>
        <div v-show="isShowQueryConditions" class="main-query">
          <BsQuery
            ref="queryFrom"
            :query-form-item-config="queryConfig"
            :query-form-data="searchDataList"
            @onSearchClick="onSearch"
            @onSearchResetClick="onSearchResetClick"
          />
        </div>
      </template>
      <!-- leftVisible不为undefined为渲染mainTree和mainForm插槽 ，否则渲染mainCon插槽-->
      <template v-if="showMonitorTree" v-slot:mainTree>
        <BsTreeSet
          v-model="leftTreeVisible"
          @onChangeInput="(value) => leftTreeConfig.filterText = value"
        />
        <BsTree
          v-loading="leftTreeConfig.loading"
          v-bind="leftTreeConfig"
          :tree-data="treeData"
          @onNodeClick="onClickmethod"
        />
      </template>
      <template v-slot:mainForm>
        <BsTable
          ref="mainTableRef"
          v-loading="tableLoading"
          :footer-config="tableFooterConfig"
          :table-columns-config="tableColumnsConfig"
          :table-data="tableData"
          :table-config="tableConfig"
          :pager-config="mainPagerConfig"
          :toolbar-config="tableToolbarConfig"
          @onToolbarBtnClick="onToolbarBtnClick"
          @ajaxData="ajaxTableData"
        >
          <template v-slot:toolbarSlots>
            <div class="table-toolbar-left">
              <div v-if="!leftTreeVisible && showMonitorTree" class="table-toolbar-contro-leftvisible" @click="leftTreeVisible = true"></div>
              <div class="table-toolbar-left-title">
                <span class="fn-inline">{{ menuName }}</span>
                <i class="fn-inline"></i>
              </div>
            </div>
          </template>
        </BsTable>
      </template>
    </BsMainFormListLayout>
    <ruleModal v-model="ruleModalVislbel" :regulation-code="propsRegulationCode" />
  </div>
</template>

<script>
import { proconf } from './MonitorRulesViewFJWK'
import HttpModule from '@/api/frame/main/Monitoring/levelRules.js'
import ruleModal from '@//views/main/MointoringMatters/MonitorRulesViewFJWK/children/ruleModal.vue'
// import store from '@/store/index'
export default {
  components: {
    ruleModal
  },
  watch: {},
  computed: {
    tableColumnsConfig() {
      const fieldList = ['mofDivName', 'regulationClassName', 'fiRuleTypeName', 'regulationType', 'regulationName', 'warningLevel', 'handleType', 'businessModuleName', 'isEnable']
      return proconf.PoliciesTableColumns.filter(item => fieldList.includes(item.field))
    }
  },
  data() {
    return {
      leftTreeClickNode: {},
      selectionData: [],
      ruleModalVislbel: false,
      menuName: '监控规则列表',
      tableLoading: false,
      queryConfig: proconf.highQueryConfig,
      searchDataList: proconf.highQueryData,
      treeData: [],
      propsRegulationCode: '',
      leftTreeVisible: true,
      toolBarStatusBtnConfig: {
        changeBtns: true,
        buttons: proconf.toolBarStatusButtons,
        curButton: proconf.toolBarStatusButtons[0],
        buttonsInfo: proconf.statusRightToolBarButton
      },
      tabStatusNumConfig: {
        '1': 0
      },
      isShowQueryConditions: true,
      currentSelectedTab: {},
      tableData: [],
      tableToolbarConfig: {
        // table工具栏配置
        disabledMoneyConversion: false,
        moneyConversion: false, // 是否有金额转换
        import: false, // 导入
        export: true, // 导出
        print: false, // 打印
        zoom: true, // 缩放
        custom: true, // 选配展示列
        slots: {
          tools: 'toolbarTools',
          buttons: 'toolbarSlots'
        }
      },
      regulationStatus: '1',
      mainPagerConfig: {
        total: 0,
        currentPage: 1,
        pageSize: 20
      },
      tableConfig: {},
      tableFooterConfig: {
        showFooter: false
      },
      // 操作日志
      logData: [],
      showLogView: false,
      // 新增弹窗
      param5: {},
      menuId: '',
      tokenid: '',
      userInfo: {},
      roleguid: this.$store.state.curNavModule.roleguid,
      // 文件
      showAttachmentDialog: false,
      billguid: '',
      leftTreeConfig: {
        loading: false,
        filterText: '',
        // defaultExpandedKeys: ['root'],
        config: {
          valueKeys: ['code', 'ruleName', 'id'],
          format: '{ruleName}',
          highlightCurrent: true,
          showFilter: false, // 是否显示过滤
          isInitLoadData: false,
          scrollLoad: false, // 是否开启滚动加载
          isleaf: false, // 指定节点是否为叶子节点，仅在指定了 lazy 属性的情况下生效
          levelno: -1, // 可选层级
          placeholder: '请选择',
          multipleValueType: 'String', // 多选值类型 String[逗号分割]，Array //废弃
          defaultExpandAll: true,
          treeProps: {
            nodeKey: 'id',
            children: 'children',
            label: 'ruleName',
            labelFormat: '{code}-{ruleName}'
          },
          multiple: false, // 是否多选,
          isLazeLoad: false, // 是否调用接口远程懒加载数据
          readonly: true,
          clearable: true
        }
      },
      codeList: [],
      provinceList: [],
      formDatas: {},
      showMonitorTree: true, // 控制树的展示隐藏
      regulation_code: '',
      isEnableState: true
    }
  },
  mounted() {
  },

  methods: {
    onSearchResetClick() {
      this.searchDataList = {}
      this.selectionData = []
      this.mainPagerConfig.currentPage = 1
      this.queryTableDatas()
    },
    onSearch(obj) {
      console.log('obj', obj)
      this.searchDataList = obj
      this.mainPagerConfig.currentPage = 1
      this.queryTableDatas()
    },
    // 切换状态栏
    onStatusTabClick(obj) {
      this.currentSelectedTab = obj
      this.queryTableDatas()
    },
    // 切换操作按钮
    operationToolbarButtonClickEvent(obj, context, e) {
      switch (obj.code) {
        // 查看
        case 'check':
          let datas = this.$refs.mainTableRef.getSelectionData()
          if (datas.length !== 1) {
            this.$message.warning('请选择一条数据')
            return
          }
          this.selectionData = datas
          this.ruleModalVislbel = true
          this.propsRegulationCode = datas[0].regulationCode
          break
      }
    },
    onToolbarBtnClick({ context, table, code }) {
      switch (code) {
        // 刷新
        case 'refresh':
          this.refresh()
          break
      }
    },
    onClickmethod(node) {
      this.leftTreeClickNode = node.node
      this.mainPagerConfig.currentPage = 1
      this.queryTableDatas()
    },
    refresh() {
      this.queryTableDatas()
    },
    ajaxTableData({ params, currentPage, pageSize }) {
      this.mainPagerConfig.currentPage = currentPage
      this.mainPagerConfig.pageSize = pageSize
      this.queryTableDatas()
    },
    // 查询 table 数据
    queryTableDatas() {
      let param = {
        page: this.mainPagerConfig.currentPage, // 页码
        pageSize: this.mainPagerConfig.pageSize, // 每页条数
        fiRuleTypeCode: this.searchDataList.fiRuleTypeCode, // 规则类型：1.系统级  2.财政级  3.部门级
        handleType: this.searchDataList.handleType, // 处理方式
        triggerClass: this.searchDataList.triggerClass, // 规则状态：1.新增  2.送审  3.审核
        regulationType: this.searchDataList.regulationType,
        regulationClass: this.leftTreeClickNode.code
      }
      if (param.regulationClass === 'root') {
        param.regulationClass = '0'
      }
      if (param.fiRuleTypeCode) {
        param.fiRuleTypeCode = param.fiRuleTypeCode.split(',').filter(Boolean).map(item => item.split('##')[0]).filter(Boolean).join(',')
      }
      this.tableLoading = true
      HttpModule.queryMonitorTableDatas(param).then(res => {
        this.tableLoading = false
        if (res.code === '000000') {
          this.tableData = res.data.results
          this.mainPagerConfig.total = res.data.totalCount
          this.tabStatusNumConfig['1'] = res.data.totalCount
        } else {
          this.$message.error(res.message)
        }
      })
    },
    getLeftTreeData() {
      this.leftTreeConfig.loading = true
      return this.$http.post(BSURL.lmp_ruleClassifyTree + '0').then(res => {
        this.leftTreeConfig.loading = false
        if (res.code === '000000') {
          this.treeData = [{
            id: 'root',
            ruleName: '全部',
            code: 'root',
            name: '全部',
            isleaf: '0',
            children: res.data
          }]
          this.leftTreeClickNode = {
            id: 'root',
            ruleName: '全部',
            code: 'root',
            name: '全部',
            isleaf: '0'
          }
        } else {
          this.$message.error('监控主体树获取失败')
        }
      })
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
    }
  },
  async created() {
    this.userInfo = this.$store.state.userInfo
    await this.getLeftTreeData()
    this.onStatusTabClick(proconf.toolBarStatusButtons[0])
  }
}
</script>
<style scoped>
.radio-right{
float: right;
}
.Titans-table ::v-deep .add-yellow {
  color: #BBBB00 !important;
}
.Titans-table ::v-deep .add-orange {
  color: orange !important;
}
.Titans-table ::v-deep .add-red {
  color: red !important;
}
.Titans-table ::v-deep .add-blue {
  color: blue !important;
}
.Titans-table ::v-deep .add-gray {
  color: gray !important;
}
.Titans-table ::v-deep  .vxe-body--row.row-yellow {
  background-color: yellow;
  color: #fff;
}
.Titans-table ::v-deep  .vxe-body--row.row-blue {
  background-color: blue;
  color: #fff;
}
.Titans-table ::v-deep  .vxe-body--row.row-red {
  background-color: red;
  color: #fff;
}
</style>
