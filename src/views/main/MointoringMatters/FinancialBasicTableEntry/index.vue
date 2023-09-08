<template>
  <div v-loading="tableLoading" style="height: 100%">
    <BsMainFormListLayout :left-visible.sync="leftTreeVisible">
      <template v-slot:topTabPane>
        <BsTabPanel
          ref="tabPanel"
          :is-open="isShowQueryConditions"
          :tab-status-btn-config="toolBarStatusBtnConfig"
          :tab-status-num-config="tabStatusNumConfig"
          @onQueryConditionsClick="onQueryConditionsClick"
        />
      </template>
      <template v-slot:query>
        <div v-show="isShowQueryConditions" class="main-query">
          <BsQuery
            ref="queryFrom"
            :query-form-item-config="queryConfig"
            :query-form-data="searchDataList"
            @onSearchClick="search"
          />
        </div>
      </template>
      <template v-slot:mainForm>
        <BsTable
          ref="mainTableRef"
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
              <!-- <div
                v-if="leftTreeVisible === false"
                class="table-toolbar-contro-leftvisible"
                @click="leftTreeVisible = true"
              ></div> -->
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
import HttpModule from '@/api/frame/main/Monitoring/FinancialBasicTableEntry.js'
import { proconf } from './FinancialBasicTableEntry'

export default {
  components: {},
  watch: {
    queryConfig() {
      this.getSearchDataList()
    }
  },
  data() {
    return {
      leftTreeVisible: false,
      isShowQueryConditions: true,
      menuName: '',
      status: 0,
      // 头部工具栏 BsTabPanel config
      toolBarStatusBtnConfig: {
        changeBtns: true,
        buttons: proconf.toolBarStatusButtons1,
        curButton: {
          type: 'button',
          iconName: 'base-all.png',
          iconNameActive: 'base-all-active.png',
          iconUrl: '',
          label: '全部',
          code: '0',
          curValue: '0'
        },
        methods: {
          bsToolbarClickEvent: this.onStatusTabClick
        }
      },
      buttonsInfo: proconf.statusRightToolBarButtonByBusDept,
      tabStatusNumConfig: {
        1: 0
      },
      // BsQuery 查询栏
      queryConfig: [
        {
          title: '年度',
          field: 'fiscalYear',
          align: 'left',
          formula: '',
          name: '$vxeSelect',
          itemRender: {
            name: '$vxeSelect',
            options: [
              { value: '2023', label: '2023' },
              { value: '2022', label: '2022' },
              { value: '2021', label: '2021' }
            ],
            props: {
              placeholder: '年度'
            }
          }
        },
        {
          title: '区划',
          field: 'mofDivCodeList',
          width: '8',
          align: 'left',
          formula: '',
          name: '$vxeTree',
          itemRender: {
            name: '$vxeTree',
            options: [],
            'props': {
              'config': {
                'treeProps': {
                  'nodeKey': 'id',
                  'label': 'label',
                  'children': 'children',
                  'check-strictly': true
                },
                'placeholder': '区划',
                'multiple': true,
                'readonly': true,
                'isleaf': false
              }
            }
          }
        },
        /* {
          title: '提交状态',
          field: 'status',
          align: 'left',
          formula: '',
          name: '$vxeSelect',
          itemRender: {
            name: '$vxeSelect',
            options: [
              { value: '0', label: '未提交' },
              { value: '1', label: '已提交' }
            ],
            props: {
              placeholder: '提交状态'
            }
          }
        }, */
        {
          title: '月份',
          field: 'month',
          itemRender: {
            name: '$vxeTime',
            defaultValue: '',
            props: {
              format: 'YYYY-MM',
              type: 'month', // "当前日期为：YYYY-MM-DD，星期W，为第Q季度，时间为：hh:mm:ss:c"
              placeholder: '月份'
            }
          }
        }
        /* ,
        {
          title: '季度',
          field: 'quarterly',
          itemRender: {
            name: '$vxeTime',
            defaultValue: '',
            props: {
              format: 'YYYY-Q',
              type: 'month', // "当前日期为：YYYY-MM-DD，星期W，为第Q季度，时间为：hh:mm:ss:c"
              placeholder: '季度'
            }
          }
        } */
      ],
      searchDataList: {
        mofDivCode: '',
        status: '',
        month: '',
        fiscalYear: ''
        // quarterly: ''
      },
      toolBarStatusSelect: {
        type: 'button',
        iconName: 'base-all.png',
        iconNameActive: 'base-all-active.png',
        iconUrl: '',
        label: '全部',
        code: '1',
        curValue: '1'
      },
      // table 相关配置
      tableLoading: false,
      tableColumnsConfig: proconf.PoliciesTableColumns1,
      tableData: [],
      tableToolbarConfig: {
        // table工具栏配置
        disabledMoneyConversion: false,
        moneyConversion: false, // 是否有金额转换
        search: false, // 是否有search
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
      mainPagerConfig: {
        total: 0,
        currentPage: 1,
        pageSize: 20
      },
      tableConfig: {
        renderers: {
          // 编辑 附件 操作日志
          $payVoucherInputGloableOptionRow: proconf.gloableOptionRow
        },
        methods: {
          onOptionRowClick: this.onOptionRowClick
        }
      },
      tableFooterConfig: {
        showFooter: false
      },
      treeQueryparams: {
        elementcode: 'admdiv',
        province: '610000000',
        year: '2021',
        wheresql: 'and code like \'' + 61 + '%\''
      }
    }
  },
  methods: {
    // 展开折叠查询框
    onQueryConditionsClick(isOpen) {
      this.isShowQueryConditions = isOpen
    },
    // 初始化高级查询data
    getSearchDataList() {
      // 下拉树
      let searchDataObj = {}
      this.queryConfig.forEach((item) => {
        if (
          item.itemRender.name === '$formTreeInput' ||
          item.itemRender.name === '$vxeTree'
        ) {
          if (item.field) {
            searchDataObj[item.field + 'code'] = ''
          }
        } else {
          if (item.field) {
            searchDataObj[item.field] = ''
          }
        }
      })
      this.searchDataList = searchDataObj
    },
    // 初始化高级查询参数condition
    getConditionList() {
      let condition = {}
      this.queryConfig.forEach((item) => {
        if (
          item.itemRender.name === '$formTreeInput' ||
          item.itemRender.name === '$vxeTree'
        ) {
          if (item.field) {
            if (item.field === 'cor_bgt_doc_no_') {
              condition[item.field + 'name'] = []
            } else {
              condition[item.field + 'code'] = []
            }
          }
        } else {
          if (item.field) {
            condition[item.field] = []
          }
        }
      })
      return condition
    },
    // 切换状态栏
    onStatusTabClick(obj) {
      if (!obj.type) {
        this.operationToolbarButtonClickEvent(obj)
        return
      }
      this.toolBarStatusSelect = obj
      switch (obj.curValue) {
        // 全部
        case '-1':
          this.menuName = '未录入'
          this.status = -1
          this.tableColumnsConfig = proconf.PoliciesTableColumns1
          this.tabStatusNumConfig[this.status] = this.mainPagerConfig.total
          break
        case '0':
          this.menuName = '未处理'
          this.status = 0
          this.tableColumnsConfig = proconf.PoliciesTableColumns2
          this.tabStatusNumConfig[this.status] = this.mainPagerConfig.total
          break
        case '1':
          this.menuName = '已处理'
          this.status = 1
          this.tableColumnsConfig = proconf.PoliciesTableColumns2
          this.tabStatusNumConfig[this.status] = this.mainPagerConfig.total
          break
      }
      this.condition = {}
      this.mainPagerConfig.currentPage = 1
      this.refresh()
      this.$refs.mainTableRef.$refs.xGrid.clearScroll()
    },
    // 搜索
    search(val) {
      console.log(val)
      this.searchDataList = val
      let condition = this.getConditionList()
      for (let key in condition) {
        if (
          (this.searchDataList[key] !== undefined) &
          (this.searchDataList[key] !== null)
        ) {
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
      this.mofDivCodeList = val.mofDivCodeList_code__multiple
      this.condition = condition
      this.queryTableDatas()
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
      if (
        node.children !== null &&
        node.children.length !== 0 &&
        node.id !== '0'
      ) {
        return
      }
      if (node.id !== '0') {
        let key =
          this.$refs.treeSet.treeConfigIn.curRadio.toLowerCase() + '_code'
        this.condition[key] = node.code
      } else {
        this.condition = {}
      }
      this.queryTableDatas()
    },
    treeSetConfrimData(curTree) {
      this.treeQueryparams.elementCode = curTree.code
      this.$refs.leftTree.refreshTree()
    },
    asideChange() {
      this.leftTreeVisible = false
    },
    // 查看附件
    showAttachment(row) {
      this.billguid = row.attachment_id
      this.showAttachmentDialog = true
    },
    // 刷新查询栏，提示刷新 table 数据
    refresh() {
      this.queryTableDatas()
      // this.queryTableDatasCount()
    },
    ajaxTableData({ params, currentPage, pageSize }) {
      this.mainPagerConfig.currentPage = currentPage
      this.mainPagerConfig.pageSize = pageSize
      this.queryTableDatas()
    },
    // 查询 table 数据
    queryTableDatas() {
      const param = {
        page: this.mainPagerConfig.currentPage, // 页码
        pageSize: this.mainPagerConfig.pageSize, // 每页条数
        status: this.status,
        // quarterly: this.condition.quarterly
        //   ? this.condition.quarterly.toString()
        //   : '',
        monthStr: this.condition.month
          ? this.condition.month.toString()
          : '',
        fiscalYear: this.condition.fiscalYear
          ? this.condition.fiscalYear.toString()
          : '',
        mofDivCodeList: this.mofDivCodeList
      }
      this.tableLoading = true
      HttpModule.pageQuery(param).then((res) => {
        this.tableLoading = false
        if (res.code === '000000') {
          this.tableData = res.data.results
          console.log(this.tableData)
          this.mainPagerConfig.total = res.data.totalCount
          this.tabStatusNumConfig[this.status] = res.data.totalCount
        } else {
          this.$message.error(res.message)
        }
      })
    },
    getLeftTreeData() {
      let that = this
      HttpModule.getLeftTree(that.treeQueryparams).then(res => {
        if (res.rscode === '100000') {
          console.log(this.queryConfig)
          let treeResdata = that.getRegulationChildrenData(res.data)
          this.queryConfig[1].itemRender.options = treeResdata
        } else {
          this.$message.error('左侧树加载失败')
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
    }
  },
  created() {
    let date = new Date()
    let year = date.toLocaleDateString().split('/')[0]
    this.searchDataList.fiscalYear = year
    // this.params5 = commonFn.transJson(this.$store.state.curNavModule.param5)
    this.menuId = this.$store.state.curNavModule.guid
    this.roleguid = this.$store.state.curNavModule.roleguid
    this.tokenid = this.$store.getters.getLoginAuthentication.tokenid
    this.userInfo = this.$store.state.userInfo
    this.getLeftTreeData()
  },
  mounted() {
  }
}
</script>
<style scoped>
.radio-right {
  float: right;
}

.Titans-table ::v-deep .vxe-body--row.row-yellow {
  background-color: yellow;
  color: #fff;
}

.Titans-table ::v-deep .vxe-body--row.row-blue {
  background-color: blue;
  color: #fff;
}

.Titans-table ::v-deep .vxe-body--row.row-red {
  background-color: red;
  color: #fff;
}
</style>
