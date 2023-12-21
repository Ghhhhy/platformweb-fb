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
          :is-server="true"
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
          ref="tableRef"
          :footer-config="tableFooterConfig"
          :table-columns-config="tableColumnsConfig"
          :table-data="tableData"
          :toolbar-config="tableToolbarConfig"
          :pager-config="pagerConfig"
          :table-config="tableConfig"
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
      toolBarStatusBtnConfig: {
        changeBtns: true,
        methods: {
          bsToolbarClickEvent: this.onStatusTabClick
        }
      }
    }
  },
  methods: {
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
    onStatusTabClick(obj) {
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
      this.loadConfig()
      this.$refs.queryFrom.onSearchResetClick()
      this.condition = {}
      this.pagerConfig.currentPage = 1
      this.refresh()
    },
    async loadConfig() {
      let current = this.$parent.tableColumnsIdConfig.find(item => this.toolBarStatusSelect.curValue === item.code)
      let params = {
        tableId: {
          fiscalyear: this.userInfo.year,
          mof_div_code: this.userInfo.province,
          menuguid: this.menuId,
          userguid: this.userInfo.guid
        }
      }
      params.tableId.id = current?.tid
      let tableConfig = await this.loadBsConfig(params)
      this.tableColumnsConfig = tableConfig.itemsConfig
      params.tableId.id = current?.qid
      let queryConfig = await this.loadBsConfig(params)
      this.highQueryConfig = queryConfig.itemsConfig
    },
    getTableDataCount() {
      if (this.$parent.tableCountUrl) {
        let param = {
          menuId: this.menuId,
          roleId: this.$store.state.curNavModule.roleguid,
          condition: this.condition
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
        condition: this.condition
      }
      let apiparams = this.$parent.usePageParams ? {
        pageNum: this.pagerConfig.currentPage,
        pageSize: this.pagerConfig.pageSize
      } : this.isCustomApi ? Object.assign(param, this.$parent.tableParamsCustom) : Object.assign(param, this.$parent.tableParams)
      Object.assign(apiparams.condition, this.condition)
      if (this.$parent.isNoStatusCode) {
        delete apiparams.statusCode
      }
      this.$http.post(this.tableApi, apiparams).then(res => {
        this.showLoading = false
        if (res && res.rscode === '200') {
          this.tableData = res.data.rows
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
    }
  },
  watch: {

  },
  created() {
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
