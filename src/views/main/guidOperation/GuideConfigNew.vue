<template>
  <div v-loading="showLoading" class="pay-according-to-income">
    <BsMainFormListLayout :left-visible.sync="leftTreeVisible">
      <template v-slot:topTap></template>
      <template v-slot:topTabPane>
        <BsTabPanel
          ref="tabPanel"
          :show-zero="false"
          :is-open="false"
          :tab-status-btn-config="toolBarStatusBtnConfig"
          :tab-status-num-config="tabStatusNumConfig"
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
        <BsTreeSet
          ref="treeSet"
          v-model="leftTreeVisible"
          :tree-config="treeTypeConfig"
          @onChangeInput="changeInput"
          @onAsideChange="asideChange"
          @onConfrimData="treeSetConfrimData"
        />
        <BsBossTree
          ref="leftTree"
          open-loading
          style="overflow: hidden"
          :defaultexpandedkeys="['0']"
          :is-server="false"
          :ajax-type="treeAjaxType"
          :server-uri="treeServerUri"
          :datas="treeData"
          :queryparams="treeQueryparams"
          :global-config="treeGlobalConfig"
          :clickmethod="handleNodeClick"
        />
      </template>
      <template v-slot:mainForm>
        <BsTable
          ref="addTableRef"
          :footer-config="tableFooterConfig"
          :table-columns-config="tableColumnsConfig"
          :table-data="tableData"
          :table-config="tableConfig"
          :toolbar-config="tableToolbarConfig"
          :pager-config="mainPagerConfig"
          @ajaxData="ajaxData"
          @onToolbarBtnClick="onToolbarBtnClick"
          @columnDrag="columnDrag"
          @cellClick="onCellClick"
        >
          <template v-slot:toolbarSlots>
            <div class="table-toolbar-left">
              <div
                v-if="leftTreeVisible === false"
                class="table-toolbar-contro-leftvisible"
                @click="leftTreeVisible = true"
              ></div>
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
    <BsAttachment v-if="showAttachmentDialog" :user-info="userInfo" :billguid="billguid" />
    <BsUpload
      ref="fileUpload"
      :queryparams="queryparams"
      :downloadparams="downloadParams"
      :open-loading="false"
      uniqe-name="uploadOne"
      :accept="accept"
      :after-upload="afterUpload"
    />
    <FilePreview
      v-if="filePreviewDialogVisible"
      :visible.sync="filePreviewDialogVisible"
      :file-guid="fileGuid"
      :app-id="'pay_plan_voucher'"
    />
  </div>
</template>
<script>
export default {
  name: 'IncomeRefund',
  components: {},
  mixins: [],
  data() {
    const self = this
    return {
      downloadParams: {
        fileguid: ''
      },
      filePreviewDialogVisible: false,
      fileGuid: '',
      queryparams: {},
      statusVisible: false,
      statusParam: {},
      stampDialogVisible: false,
      batchAddDialogVisible: false,
      isWorkFlow: false,
      showUpload: false,
      upTitle: '',
      selectObj: {},
      printGuids: [],
      printViewVisible: false,
      cptList: [],
      showLogView: false,
      logsData: [],
      tabStatusNumConfig: {
        '1': 0,
        '2': 0,
        '3': 0,
        '4': 0,
        '5': 0
      },
      dialogVisible7: false,
      title: '预览签章',
      voucherArr: [],
      detailVtcode: '',
      detailArr: [],
      detailNos: [],
      dialogVisible: false,
      param: {},
      dialogVisible2: false,
      dialogTitle: '新增',
      addDialogVisible: false,
      showLoading: false,
      leftTreeVisible: true,
      isShowQueryConditions: false,
      highQueryConfig: [],
      searchDataList: {},
      treeTypeConfig: {
        curRadio: 'buget_level',
        radioGroup: [ ]
      },
      treeAjaxType: 'get',
      treeData: [],
      treeServerUri: 'pay-clear-service/v2/lefttree',
      treeQueryparams: { elementCode: 'BUDGET_LEVEL' },
      treeGlobalConfig: {
        inputVal: ''
      },
      toolBarStatusBtnConfig: {
        // 状态按钮和左侧按钮触发后回调
        changeBtns: true,
        curButton: {
          type: 'button',
          code: '1',
          curValue: '1'
        },
        buttonsInfo: {
          '1': [
            { code: 'toolbar-upload', label: '上传', status: 'primary' },
            { code: 'toolbar-preview', label: '预览', status: 'primary' },
            { code: 'toolbar-download', label: '下载', status: 'primary' },
            { code: 'toolbar-delete', label: '删除' }
          ]
        },
        buttons: [
          {
            type: 'button',
            iconName: 'base-all.png',
            iconNameActive: 'base-all-active.png',
            iconUrl: '',
            label: '全部单据',
            code: '1',
            curValue: '1'
          }
        ],
        methods: {
          bsToolbarClickEvent: self.onStatusTabClick
        }
      },
      tableFooterConfig: {
        totalObj: {
          return_amt: 0
        },
        combinedType: ['switchTotal'],
        showFooter: true
      },
      tableColumnsConfig: [
        {
          title: '附件文件名',
          field: 'filename',
          align: 'left'
        },
        {
          title: '上传时间',
          field: 'create_time',
          align: 'left'
        },
        {
          title: '文件大小',
          field: 'size',
          align: 'left'
        }
      ],
      tableData: [],
      tableConfig: {
        methods: {
          onOptionRowClick: self.onOptionRowClick
        }
      },
      tableToolbarConfig: {
        // table工具栏配置
        disabledMoneyConversion: false,
        moneyConversion: true, // 是否有金额转换
        search: false, // 是否有search
        import: false, // 导入
        export: true, // 导出
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
        pageSize: 50,
        currentPage: 1
      },
      menuName: this.$route.params.curNavModule.name,
      menuId: this.$route.params.curNavModule.guid,
      curNavModule: this.$route.params.curNavModule,
      appId: 'income_refund',
      radioShow: false,
      isHaveZerobak: false,
      userInfo: {},
      conditions: {},
      selectCode: '',
      // 高级查询id
      advancedQueryId: 'A3005F1D2DEF4B678E639A1AC40SRTHS',
      // 表头id
      tableColumnsId: '24670DD61C004C68A01C3CE0624SRTHS',
      // 页签id
      subTabId: 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
      showAttachmentDialog: false,
      billguid: '',
      attachmentid: null
    }
  },
  created() {
    this.treeData = this.returnSysMenu()
    this.userInfo = this.$store.state.userInfo
    this.getSearchDataList()
  },
  computed: {
    mof_div_code() {
      return this.userInfo.province
    },
    fiscal_year() {
      return this.userInfo.year
    },
    uploadPack() {
      return this.$refs.fileUpload
    }
  },
  methods: {
    afterUpload(file, res) {
      let item = {
        fileguid: res,
        filesize: file.size,
        filename: file.name,
        billguid: this.attachmentid
      }
      let data = []
      data.push(item)
      const params = {
        attachmentid: this.attachmentid,
        data
      }
      this.showLoading = true
      // 'pay-clear-service/v2/pay/file/action/insert'
      return new Promise((resolve, reject) => {
        this.$http.post('fi-service/v2//fi/insert', params).then(res => {
          const { rscode } = res
          if (rscode !== '200') {
            this.$XModal.message({ status: 'error', message: '保存信息失败！' })
          }
          this.refresh()
          this.showLoading = false
          resolve(res)
        }, err => {
          this.showLoading = false
          reject(err)
        })
      })
    },
    // 动态表头
    async loadConfig(id) {
      let params = {
        tableId: {
          id: '',
          fiscalyear: this.userInfo.year,
          mof_div_code: this.userInfo.province,
          menuguid: this.$store.state.curNavModule.guid,
          userguid: ''
        }
      }
      // 高级查询
      if (id === this.advancedQueryId) {
        params.tableId.id = id
        let configQueryData = await this.loadBsConfig(params)
        if (typeof configQueryData.itemsConfig !== 'undefined') {
          this.highQueryConfig = configQueryData.itemsConfig
        }
      }
      // 表头
      if (id === this.tableColumnsId) {
        params.tableId.id = id
        params.tableId.userguid = this.userInfo.guid
        let configData = await this.loadBsConfig(params)
        if (typeof configData.itemsConfig !== 'undefined') {
          this.tableColumnsConfig = configData.itemsConfig
        }
      }
      // 页签id
      if (id === this.subTabId) {
        params.tableId.id = id
        let configQueryData = await this.loadBsConfig(params)
        // 如果页签数据存在则采用
        if (configQueryData?.subTabConfig) {
          this.toolBarStatusBtnConfig = configQueryData.subTabConfig
          // 添加状态点击方法
          this.toolBarStatusBtnConfig.methods.bsToolbarClickEvent = this.onStatusTabClick
        }
      }
    },
    // 保存表头的方法
    saveConfig(id, configure) {
      let saveName = JSON.stringify({
        id: id,
        fiscalyear: this.userInfo.year,
        mof_div_code: this.userInfo.province,
        menuguid: this.$store.state.curNavModule.guid,
        userguid: this.userInfo.guid
      })
      window.localStorage.setItem(saveName, JSON.stringify(configure))
    },
    columnDrag(columns) {
      let itemsConfigTemp = []
      columns.forEach(item => {
        if (item.type !== 'checkbox' && item.type !== 'seq') {
          itemsConfigTemp.push(item.own)
        }
      })
      switch (this.toolBarStatusSelect.curValue) {
        // 指标额度
        case '9':
          this.saveConfig(this.quotaId, itemsConfigTemp)
          break
        // 其他表头
        case '1': // 未送审
        case '2': // 已送审
        case '4': // 被退回
        case '5': // 已作废
        case '1,4': // 待办事项
        case '2,5': // 已办事项
          this.saveConfig(this.tableColumnsId, itemsConfigTemp)
          break
        case '1,2,4,5': // 全部单据
        case '0': // 全部单据
          this.saveConfig(this.documentsId, itemsConfigTemp)
          break
        default:
      }
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
      if ((this.attachmentid ?? '') === '') {
        return
      }
      const params = {
        attachmentid: this.attachmentid,
        is_deleted: 2
      }
      this.showLoading = true
      return new Promise((resolve, reject) => {
        this.$http.post('fi-service/v2/fi/file/query', params).then(res => {
          const { data, rscode } = res
          if (rscode === '200') {
            this.tableData = [].concat(data || [])
            this.tableData.forEach(element => {
              let size = element.filesize / 1024
              element.size = size.toFixed(2) + 'KB'
            })
          } else {
            this.$XModal.message({ status: 'error', message: '获取信息失败！' })
          }
          this.showLoading = false
          resolve(res)
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
    changeInput(val) {
      this.treeGlobalConfig.inputVal = val
      this.$refs.leftTree.filterText = val
    },
    asideChange() {
      this.leftTreeVisible = false
    },
    treeSetConfrimData(curTree) {
      this.treeQueryparams.elementCode = curTree.code
      this.$refs.leftTree.refreshTree()
    },
    handleNodeClick(node) {
      if (node.children !== null && node.children.length !== 0 && node.id !== '0') {
        return
      }
      if (node.id !== '0') {
        this.attachmentid = node.guid
      }
      this.refresh()
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
    refresh() {
      this.getTableData()
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
      const { curValue } = btnObj
      this.selectCode = curValue
      this.refresh()
    },
    operationToolbarButtonClickEvent(obj, context, e) {
      switch (obj.code) {
        // 新增
        case 'toolbar-delete':
          this.doDelete()
          break
        case 'toolbar-preview':
          this.doPreview()
          break
        case 'toolbar-download':
          this.doDownload()
          break
        case 'toolbar-upload':
          this.doUpload()
          break
      }
    },
    onOptionRowClick(option) {
    },
    doDeleteByPT(fileguids) {
      let selection = this.$refs.addTableRef.getSelectionData()
      if (selection.length < 1) {
        this.$message.error('请至少选择一条数据！')
      }
      let params = 'fileguids=' + fileguids + ',&' + 'appid=pay_plan_voucher'
      this.$http.del('fileservice/v2/files?' + params).then(res => {
        // if (res.rscode === '100000') {
        //   this.$message.success('删除文件成功！')
        // } else {
        //   this.$message.error('删除文件失败:' + res.result)
        // }
      }).catch()
    },
    // 预览文件
    doPreview() {
      let selection = this.$refs.addTableRef.getSelectionData()
      if (selection.length === 1) {
        this.fileGuid = selection[0].fileguid
        this.filePreviewDialogVisible = true
      } else {
        this.$message.error('请选择一条数据！')
      }
    },
    // 下载附件
    doDownload() {
      let selection = this.$refs.addTableRef.getSelectionData()
      if (selection.length > 0) {
        for (var i = 0; i < selection.length; i++) {
          this.downloadParams.fileguid = selection[i].fileguid
          this.downloadParams.appid = 'pay_plan_voucher'
          this.$refs.fileUpload.downloadFile()
        }
      } else {
        this.$message.error('请选择一条数据！')
      }
    },
    doDelete() {
      let selection = this.$refs.addTableRef.getSelectionData()
      if (selection.length < 1) {
        this.$message.error('请至少选择一条数据！')
        return
      }
      let fileguids = []
      selection.forEach(item => {
        fileguids.push(item.fileguid)
      })
      let param = {
        fileguids
      }
      this.showLoading = true
      this.$http.post('fi-service/v2/pay/file/action/delete', param).then((res) => {
        this.showLoading = false
        if (res.rscode === '200') {
          this.doDeleteByPT(fileguids)
          this.$message.success('删除成功')
          this.refresh()
        } else {
          this.$message.error('删除附件信息失败: ' + res.result)
        }
      })
    },
    // 查看附件
    showAttachment(row) {
      this.billguid = row.attachment_id
      this.showAttachmentDialog = true
    },
    onCellClick(obj) {
      let key = obj.column.property
      switch (key) {
        // 申请编号
        case 'return_no':
          this.seeDetail(obj.row)
          break
      }
    },
    // 上传
    doUpload() {
      if ((this.attachmentid ?? '') === '') {
        this.$message.warning('请选择左侧菜单！')
        return
      }
      this.queryparams.billguid = this.attachmentid
      this.uploadPack.upload()
    },
    // 返回左侧树
    returnSysMenu() {
      let allMenu = JSON.parse(JSON.stringify(this.$store.state.systemMenu))
      allMenu = allMenu.map(item => {
        item.label = item.name
        item.children = []
        return item
      })

      return allMenu
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

</style>
