<template>
  <div v-loading="showLoading" class="pay-according-to-income">
    <BsMainFormListLayout :left-visible="false">
      <template v-slot:topTabPane>
        <BsTabPanel
          ref="tabPanel"
          :is-open="isShowQueryConditions"
          :is-hide-query="true"
          :tab-status-btn-config="toolBarStatusBtnConfig"
          @onQueryConditionsClick="onQueryConditionsClick"
        />
      </template>
      <template v-slot:query>
        <div v-show="isShowQueryConditions" class="main-query">
          <BsQuery
            ref="queryFrom"
            :query-form-item-config="highQueryConfig"
            :query-form-data="searchDataList"
            @onSearchClick="onSearch"
          />
        </div>
      </template>
      <template v-slot:mainTree>
      </template>
      <template v-slot:mainForm>
        <BsTable
          ref="addTableRef"
          :table-columns-config="tableColumnsConfig"
          :table-data="tableData"
          :table-config="tableConfig"
          :toolbar-config="tableToolbarConfig"
          :pager-config="mainPagerConfig"
          @ajaxData="ajaxData"
          @onToolbarBtnClick="onToolbarBtnClick"
          @cellClick="onCellClick"
        >
          <template v-slot:toolbarSlots>
            <div class="table-toolbar-left">
              <div class="table-toolbar-left-title">
                <span class="fn-inline">{{ menuName }}</span>
                <i class="fn-inline"></i>
              </div>
            </div>
          </template>
        </BsTable>
      </template>
      <template v-slot:mainCon></template>
    </BsMainFormListLayout>
    <BsUpload
      ref="fileUpload"
      :queryparams="queryparams"
      :open-loading="false"
      uniqe-name="uploadOne"
      :accept="accept"
      :after-upload="afterUpload"
      :downloadparams="downloadParams"
      :designated-year="'2022'"
    />
    <FilePreview
      v-if="filePreviewDialogVisible"
      :visible.sync="filePreviewDialogVisible"
      :file-guid="fileGuid"
      :app-id="appId"
    />
  </div>
</template>
<script>
import MenuModule from '@/api/frame/common/menu.js'
const TABLE_COLUMNS = [
  { title: '文件名',
    field: 'filename',
    cellRender: {
      name: '$href'
    } },
  { title: '上传时间', field: 'createtime', width: 400 },
  {
    title: '操作',
    field: 'gloableOptionRow',
    className: 'gloableOptionRow',
    align: 'center',
    fixed: 'right',
    sortable: false,
    filters: false,
    width: 200,
    cellRender: {
      name: '$gloableOptionRow'
    }
  }
]

export default {
  name: 'DfrDatabase',
  components: {},
  data() {
    const self = this
    return {
      fileGuid: '',
      appId: 'fi',
      filePreviewDialogVisible: false,
      queryparams: {
        billguid: ''
      },
      selectCode: '1',
      billguidPrefix: 'DfrDatabase-',
      accept: 'jpg,png,pdf,doc,docx',
      showLoading: false,
      leftTreeVisible: false,
      isShowQueryConditions: false,
      highQueryConfig: [
      ],
      searchDataList: {},
      toolBarStatusBtnConfig: {
        // 状态按钮和左侧按钮触发后回调
        changeBtns: true,
        curButton: {
          code: '1',
          curValue: '1',
          type: 'button'
        },
        buttons: [
          {
            code: '1',
            label: '公告通知',
            iconName: 'base-all.png',
            iconNameActive: 'base-all-active.png',
            type: 'button',
            curValue: '1'
          },
          {
            code: '2',
            label: '学习资料',
            iconName: 'base-all.png',
            iconNameActive: 'base-all-active.png',
            type: 'button',
            curValue: '2'
          }
        ],
        buttonsInfo: this.transJson(this.$store.state.curNavModule?.param5).isShowTabButtons ? {
          '1': [
            { code: 'toolbar-upload', label: '上传文件' },
            { code: 'toolbar-deleteFile', label: '删除文件' }
          ],
          '2': [
            { code: 'toolbar-upload', label: '上传文件' },
            { code: 'toolbar-deleteFile', label: '删除文件' }
          ]
        } : false,
        methods: {
          bsToolbarClickEvent: self.onStatusTabClick
        }
      },
      tableFooterConfig: {
      },
      tableColumnsConfig: [],
      tableData: [],
      tableConfig: {
        renderers: {
          // 编辑 附件 操作日志
          $gloableOptionRow: {
            renderDefault(h, cellRender, params, context) {
              const { row, column } = params
              return [
                <el-tooltip content="查看" placement="top" effect="light">
                  <a class=" gloable-option-row fn-inline" onClick={() => self.onOptionRowClick({ row, column, optionType: 'showFile' })}>查看</a>,
                </el-tooltip>,
                <el-tooltip content="下载" placement="top" effect="light">
                  <a class=" gloable-option-row fn-inline" onClick={() => self.onOptionRowClick({ row, column, optionType: 'downloadFile' })}>下载</a>,
                </el-tooltip>
              ]
            }
          }
        },
        methods: {
          onOptionRowClick: self.onOptionRowClick
        }
      },
      tableToolbarConfig: {
        // table工具栏配置
        disabledMoneyConversion: false,
        moneyConversion: false, // 是否有金额转换
        search: false, // 是否有search
        import: false, // 导入
        export: false, // 导出
        print: false, // 打印
        zoom: true, // 缩放
        custom: false, // 选配展示列
        slots: {
          tools: 'toolbarTools',
          buttons: 'toolbarSlots'
        }
      },
      mainPagerConfig: {
        total: 0,
        pageSize: 20,
        currentPage: 1
      },
      menuName: '直达资金资料库',
      userInfo: {},
      conditions: {},
      downloadParams: {
        fileguid: ''
      }
    }
  },
  created() {
    this.userInfo = this.$store.state.userInfo
    // 不是财政或者管理员不显示按钮
    if (this.userInfo.usertype !== '1' && this.userInfo.usertype !== '2') {
      this.toolBarStatusBtnConfig.buttonsInfo = {}
    }
    this.getSearchDataList()
    this.generateTableColumns()
    this.onSearch()
  },
  computed: {
    mof_div_code() {
      return this.userInfo.province
    },
    fiscal_year() {
      return this.userInfo.year
    }
  },
  methods: {
    afterUpload(val1, val2) {
      this.refresh()
    },
    generateTableColumns() {
      this.tableColumnsConfig = TABLE_COLUMNS.map(el => {
        let tableColumn = {
          align: 'center',
          associatedQuery: '',
          className: '',
          combinedType: '',
          combinedType_select_sort: '',
          constraint: '',
          filters: false,
          fixed: '',
          formula: '',
          sortable: 'true',
          ...el
        }
        return tableColumn
      })
    },
    getSearchParams() {
      this.conditions = {}
      this.highQueryConfig.forEach(item => {
        this.conditions[item.field] = this.searchDataList[item.field + 'code__multiple']
      })
    },
    ajaxData({ params, currentPage, pageSize }) {
      this.mainPagerConfig.currentPage = currentPage
      this.mainPagerConfig.pageSize = pageSize
      this.refresh()
    },
    getTableData() {
      let billId = this.selectCode === '1' ? 'noticePublication-' : 'learningFiles-'
      let params = {
        billguid: billId,
        province: this.$store.state.userInfo.province,
        year: this.$store.state.userInfo.year
      }
      this.showLoading = true
      return new Promise((resolve, reject) => {
        MenuModule.getOperationGuideDatas(params).then(res => {
          const { data, rscode } = res
          if (rscode === '100000') {
            let tableData = [].concat(data)
            resolve(tableData)
          } else {
            reject(new Error('获取信息失败！'))
          }
          this.showLoading = false
        }, err => {
          this.showLoading = false
          reject(err)
        })
      })
    },
    getSearchDataList() {
      // 下拉树
      let searchDataObj = {}
      this.highQueryConfig.forEach(item => {
        if (item.field) {
          searchDataObj[item.field] = ''
        }
      })
      this.searchDataList = searchDataObj
    },
    asideChange() {
      this.leftTreeVisible = false
    },
    onQueryConditionsClick(isOpen) {
      this.isShowQueryConditions = isOpen
    },
    onToolbarBtnClick({ context, table, code }) {
      switch (code) {
        // 刷新
        case 'refresh':
          this.refresh()
          break
      }
    },
    async refresh() {
      const start = this.mainPagerConfig.pageSize * (this.mainPagerConfig.currentPage - 1)
      const end = start + this.mainPagerConfig.pageSize
      try {
        const result = await this.getTableData()
        this.tableData = result.slice(start, end)
        this.mainPagerConfig.total = result.length
      } catch (error) {
        this.$XModal.message({ status: 'error', message: '获取信息失败' })
      }
    },
    onSearch() {
      this.mainPagerConfig.currentPage = 1
      this.getSearchParams()
      this.refresh()
    },
    onStatusTabClick(btnObj) {
      if (!btnObj.type) {
        this.operationToolbarButtonClickEvent(btnObj)
        return
      }
      this.selectCode = btnObj?.code
      this.mainPagerConfig.currentPage = 1
      this.selectCode === '1' ? this.billguidPrefix = 'noticePublication-' : this.billguidPrefix = 'learningFiles-'
      this.menuName = this.selectCode === '1' ? '公告通知' : '学习资料'
      this.refresh()
    },
    operationToolbarButtonClickEvent(obj, context, e) {
      const { code } = obj
      switch (code) {
        case 'toolbar-upload':
          this.uploadFile()
          break
        case 'toolbar-deleteFile':
          this.deleteFiles()
          break
      }
    },
    uploadFile() {
      this.queryparams.billguid = this.billguidPrefix + this.$ToolFn.utilFn.getUuid()
      this.$refs.fileUpload.upload()
    },
    deleteFiles() {
      let selection = this.$refs.addTableRef.getSelectionData() || []
      if (selection.length < 1) {
        this.$XModal.message({ status: 'error', message: '请至少选择一条数据' })
        return
      }
      let fileguids = ''
      selection.forEach(item => {
        fileguids += item.fileguid + ','
      })
      let params = 'fileguids=' + fileguids + '&' + 'appid=fi'
      MenuModule.deleteAttachment(params).then(res => {
        if (res.rscode === '100000') {
          this.$XModal.message({ status: 'success', message: '删除文件成功' })
          this.refresh()
        } else {
          this.$XModal.message({ status: 'error', message: '删除文件失败' })
        }
      }).catch()
    },
    onOptionRowClick(option) {
      const { row, optionType } = option
      if (optionType === 'showFile') {
        this.showFile(row.fileguid)
      } else if (optionType === 'downloadFile') {
        this.downloadFile(row.fileguid)
      }
    },
    onCellClick(obj) {
      let key = obj.column.property
      switch (key) {
        case 'filename':
          this.showFile(obj.row.fileguid)
          break
      }
    },
    showFile(guid) {
      this.appId = 'fi'
      this.fileGuid = guid
      this.filePreviewDialogVisible = true
    },
    downloadFile(guid) {
      this.downloadParams.fileguid = guid
      this.$refs.fileUpload.downloadMoreFile()
    }
  }
}
</script>
<style lang="scss" scoped>
.pay-according-to-income{
  height: 100%;
}
.radio-right{
  float: right;
}
/deep/ .Titans-table .gloableOptionRow .gloable-option-row{
  font-size: 12px;
  line-height: 20px;
}
</style>
