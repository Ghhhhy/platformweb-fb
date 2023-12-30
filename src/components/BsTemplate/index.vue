<!-- 收款账户备案录入 -->
<template>
  <div v-loading="showLoading" style="height: 100%">
    <BsMainFormListLayout :left-visible.sync="leftTreeVisible">
      <template v-slot:topTabPane>
        <BsTabPanel
          :show-zero="$parent.hideZero ? false : true"
          is-open
          :tab-status-btn-config="toolBarStatusBtnConfig"
          :tab-status-num-config="tabStatusNumConfig"
          @onQueryConditionsClick="onQueryConditionsClick"
        />
      </template>
      <template v-slot:query>
        <div v-show="isShowQueryConditions">
          <BsQuery
            ref="queryFrom"
            :query-form-item-config="highQueryConfig"
            :query-form-data="searchDataList"
            @onSearchClick="search"
          />
        </div>
      </template>
      <template v-if="!$parent.hideTree" v-slot:mainTree>
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
          :is-checkbox="$parent.isCheckbox || false"
          :ajax-type="treeAjaxType"
          :server-uri="treeServerUri"
          :datas="treeData"
          :queryparams="treeQueryparams"
          :global-config="treeGlobalConfig"
          :nodecheckmethod="nodecheckmethod"
          :clickmethod="clickmethod"
        />
      </template>
      <template v-slot:mainForm>
        <BsTable
          ref="tableRef"
          :footer-config="tableFooterConfig"
          :table-columns-config="tableColumnsConfig"
          :table-data="tableData"
          :toolbar-config="tableToolbarConfig"
          :pager-config="pagerConfig"
          :table-config="tableConfig"
          :show-zero="true"
          @ajaxData="ajaxTableData"
          @onToolbarBtnClick="onToolbarBtnClick"
        >
          <template v-slot:toolbarSlots>
            <div class="table-toolbar-left">
              <div
                v-if="leftTreeVisible === false && !$parent.hideTree"
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
    </BsMainFormListLayout>
    <BsOperationLog :logs-data="logData" :show-log-view="showLogView" />
  </div>
</template>
<script>

import mixin from '@/mixin/mixin'
export default {
  mixins: [ mixin ],
  data() {
    return {
      isCustomApi: false,
      tableApi: '',
      logData: [],
      showLogView: false,
      toolBarStatusBtnConfig: {
        changeBtns: true,
        methods: {
          bsToolbarClickEvent: this.onStatusTabClick
        }
      },
      searchDataList: {},
      treeServerUri: '/dfr-monitor-service/dfr/common/elementtree',
      treeAjaxType: 'post',
      treeQueryparams: {
        'elementCode': 'agency'
      },
      treeGlobalConfig: {
        inputVal: ''
      },
      tableDataParams: {
        condition: {}
      },
      tableConfig: {},
      treeData: []
    }
  },
  watch: {
    highQueryConfig(newVal) {
      if (newVal && newVal.length) {
        this.searchDataList = this.initHightSearch(newVal)
      }
    }
  },
  methods: {
    // 初始化高级查询参数
    initHightSearch(hightQueryConfig) {
      // 下拉树
      let searchDataObj = {}
      hightQueryConfig.forEach(item => {
        let field = item.field
        if (item.itemRender) {
          let renderName = item.itemRender.name
          if (renderName === '$formTreeInput' || renderName === '$vxeTree') {
            if (!field.endsWith('_')) {
              field = field + '_'
            }
            searchDataObj[field + 'code'] = ''
          } else if (renderName === '$vxeInput' && item.itemRender.props.readonly) {
            if (field) {
              searchDataObj[field + 'code'] = ''
            }
          } else {
            if (field) {
              searchDataObj[field] = ''
            }
          }
        } else {
          if (field) {
            searchDataObj[field] = ''
          }
        }
      })
      return searchDataObj
    },
    highSearch() {
      let condition = {}
      this.highQueryConfig.forEach(item => {
        // 下拉树
        if (item.itemRender && (item.itemRender.name === '$formTreeInput' || item.itemRender.name === '$vxeTree')) {
          if (item.field) {
            condition[item.field + 'code'] = []
          }
        } else {
          if (item.field) {
            condition[item.field] = ''
          }
        }
      })
      for (let key in condition) {
        if ((this.searchDataList[key] !== undefined) & (this.searchDataList[key] !== null)) {
          if (Array.isArray(this.searchDataList[key])) {
            condition[key] = this.searchDataList[key]
          } else if (typeof this.searchDataList[key] === 'string') {
            if (this.searchDataList[key].trim() !== '') {
              this.searchDataList[key].split(',').forEach((item) => {
                condition[key].push(item)
              })
            }
          }
        }
      }
      return condition
    },
    clickmethod(cureentClickNode, node, context) {
      const set = new Set([])
      set.add(cureentClickNode.code)
      if (Array.isArray(cureentClickNode.children) && cureentClickNode.children.length) {
        const cursion = (arr) => {
          arr.forEach(item => {
            set.add(item.code)
            if (Array.isArray(item.children) && item.children.length) {
              cursion(item.children)
            }
          })
        }
        cursion(cureentClickNode.children)
      }
      const arr = Array.from(set)
      const key = 'pro_agency_code'
      this.condition = { [key]: arr }
      this.pagerConfig.pageNum = 1
      this.mergeCondition(() => {
        this.getTableData()
      })
    },
    search(val) {
      this.searchDataList = Object.assign(this.searchDataList, val)
      const condition = this.mergeCondition()
      if (this.searchDataList.create_date && this.searchDataList.create_date.trim() !== '') {
        condition.create_date = this.searchDataList.create_date.replace(/-/g, '')
      }
      this.tableDataParams.condition = condition
      this.getTableData()
    },
    onToolbarBtnClick({ context, table, code }) {
      switch (code) {
        case 'refresh':
          this.refresh()
          break
      }
    },
    refresh() {
      this.getTableData()
      this.getTableDataCount()
    },
    operationToolbarButtonClickEvent(obj, context, e) {
      this.$emit('btnclick', obj)
    },
    operationFn(idName, id, url, params, type) {
      this.showLoading = true
      let param = {}
      param[idName] = this.$refs.tableRef.getSelectionData().map(item => item[id])
      let apiparams = Object.assign(param, params)
      this.$http.post(url, apiparams).then(res => {
        this.showLoading = false
        if (res.rscode === '200') {
          this.$message.success(type + '成功')
          this.refresh()
        } else {
          this.$message.error(type + '失败：' + res.result)
        }
      })
    },
    getSelectionRcd() {
      return this.$refs.tableRef.getSelectionData()
    },
    async onStatusTabClick(obj) {
      if (!obj.type) {
        this.operationToolbarButtonClickEvent(obj)
        return
      }
      if (obj.customApi) {
        this.isCustomApi = true
        this.tableApi = obj.customApi
      } else {
        this.isCustomApi = false
        this.tableApi = this.$parent.tableUrl
      }
      this.toolBarStatusSelect = obj
      await this.loadConfig()
      this.$refs.queryFrom.onSearchResetClick()
      this.condition = {}
      this.pagerConfig.currentPage = 1
      this.refresh()
    },
    async loadConfig() {
      let self = this
      let current = this.$parent.tableColumnsIdConfig.find(item => this.toolBarStatusSelect.curValue === item.code)
      let params = {
        tableId: {
          fiscalyear: this.userInfo.year,
          mof_div_code: this.userInfo.province,
          menuguid: this.menuId
          // userguid: this.userInfo.guid
        }
      }
      params.tableId.id = current?.tid
      let tableConfig = await this.loadBsConfig(params)
      this.tableColumnsConfig = tableConfig.itemsConfig
      this.tableFooterConfig = this.isEmptyObject(tableConfig.footerConfig) ? this.tableFooterConfig : tableConfig.footerConfig
      this.tableToolbarConfig = this.isEmptyObject(tableConfig.tableToolbarConfig) ? this.tableToolbarConfig : tableConfig.tableToolbarConfig
      params.tableId.id = current?.qid
      let queryConfig = await this.loadBsConfig(params)
      this.highQueryConfig = queryConfig.itemsConfig || [{
        title: '预算单位',
        field: 'pro_agency_',
        itemRender: {
          name: '$formTreeInput',
          props: {
            reloaddata: true,
            isServer: true,
            ajaxType: 'post',
            serverUri: '/dfr-monitor-service/dfr/common/elementtree',
            queryparams: {
              'elementCode': 'agency'
            }
          }
        }
      }]
      this.highQueryConfig.forEach(item => {
        self.$set(this.searchDataList, item.field, '')
      })
    },
    getTableDataCount() {
      if (this.$parent.tableCountUrl) {
        let param = {
          menuId: this.menuId,
          roleId: this.$store.state.curNavModule.roleguid,
          condition: this.tableDataParams.condition
        }
        let apiparams = Object.assign(param, this.$parent.tableCountParams)
        this.$http.post(this.$parent.tableCountUrl, apiparams).then(res => {
          if (res && res.rscode === '200') {
            this.tabStatusNumConfig = res.data
          } else {
            if (res.result) {
              this.$message.error('获取数量失败:' + res.result)
            } else {
              this.$message.error('获取数量失败!')
            }
          }
        })
      }
    },
    // 左侧树
    nodecheckmethod(obj, isChecked, ischildChecked) {
      const arr = isChecked.checkedNodes.map(item => item.code)
      const key = 'pro_agency_code'
      this.condition = { [key]: arr }
      this.pagerConfig.pageNum = 1
      this.mergeCondition(() => {
        this.getTableData()
      })
    },
    // agencyCode取左侧树和高级搜素并集
    mergeCondition(cb) {
      const keyCode = 'pro_agency_code'
      const isEmptyCondition = () => !Object.keys(this.highSearch(this.highQueryConfig, this.searchDataList)).length
      let code
      if (!isEmptyCondition()) {
        const [toolbarCode = [], treeCode = []] = [this.highSearch(this.highQueryConfig, this.searchDataList)[keyCode], this.condition[keyCode]]
        code = Array.from(new Set([...toolbarCode, ...treeCode]))
      } else {
        code = this.condition[keyCode]
      }
      const condition = { ...this.highSearch(this.highQueryConfig, this.searchDataList), [keyCode]: code }
      this.tableDataParams.condition = condition
      cb && cb()
      return condition
    },
    getTableData() {
      this.showLoading = true
      let param = {
        menuId: this.menuId,
        appId: this.appId,
        // roleId: this.roleguid,
        // roleguid: this.roleguid,
        // params: this.params5,
        pageNum: this.pagerConfig.currentPage,
        pageSize: this.pagerConfig.pageSize,
        statusCode: this.toolBarStatusSelect.curValue,
        // sumFieldArr: ['aviamt', 'useamt', 'canuseamt'],
        // scopeColumnArr: ['aviamt', 'plan_amt', 'create_time'],
        // sort: 'create_time desc',
        condition: this.tableDataParams.condition
      }
      let apiparams = this.$parent.usePageParams ? {
        pageNum: this.pagerConfig.currentPage,
        pageSize: this.pagerConfig.pageSize
      } : this.isCustomApi ? Object.assign(param, this.$parent.tableParamsCustom) : Object.assign(param, this.$parent.tableParams)
      Object.assign(apiparams.condition, this.tableDataParams.condition)
      if (this.$parent.isNoStatusCode) {
        delete apiparams.statusCode
      }
      this.$http.post(this.tableApi, apiparams).then(res => {
        this.showLoading = false
        if (res && res.rscode === '200') {
          this.formatTargetField(res.data.list, this.tableColumnsConfig)
          this.tableData = res.data.list
          this.pagerConfig.total = res.data.total
          this.tableFooterConfig.totalObj = res.data.sums
        } else {
          if (res.result) {
            this.$message.error('获取列表失败:' + res.result)
          } else {
            this.$message.error('获取列表失败!')
          }
        }
      })
    },
    getLeftTree() {
      this.$http.post(this.treeServerUri, this.treeQueryparams).then(res => {
        console.log(res)
        if (res && res.rscode === '200') {
          this.treeData = res.data
        }
      })
    }
  },
  created() {
    this.getLeftTree()
    if (this.$parent.pageTblColumns && this.$parent.pageTblColumns.length) {
      this.tableColumnsConfig = this.$parent.pageTblColumns
    }
    this.menuName = this.$parent.menuName
    this.leftTreeVisible = !this.$parent.hideTree
    this.toolBarStatusBtnConfig = Object.assign({}, this.toolBarStatusBtnConfig, this.$parent.toolBarStatusBtnConfig)
    this.tableApi = this.toolBarStatusBtnConfig.curButton.customApi ? this.toolBarStatusBtnConfig.curButton.customApi : this.$parent.tableUrl
  }
}
</script>
