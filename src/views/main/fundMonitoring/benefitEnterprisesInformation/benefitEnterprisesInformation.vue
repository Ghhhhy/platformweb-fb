<template>
  <div v-loading="tableLoading" style="height: 100%">
    <BsMainFormListLayout :left-visible.sync="leftTreeVisible">
      <template v-slot:topTabPane>
        <BsTabPanel
          ref="tabPanel"
          show-zero
          :show-num="true"
          :tab-status-btn-config="toolBarStatusBtnConfig"
        />
      </template>
      <template v-slot:mainForm>
        <BsTable
          ref="mainTableRef"
          :table-config="tableConfig"
          :table-global-config="tableGlobalConfig"
          :toolbar-config="toolbarConfig"
          :height="420"
          :pager-config="pagerConfig"
          :tree-config="treeConfigTable"
          :footer-config="footerConfig"
          :table-columns-config="tableColumnsConfig"
          :table-data="tableData"
          @ajaxData="ajaxData"
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
    <AddDialog
      v-if="showModal"
      ref="dialogRef"
      :title="dialogTitle"
      :row="rowData"
      @close="dialogClose"
    />
  </div>
</template>

<script>
import api from '@/api/frame/main/fundMonitoring/benefitEnterprisesInformation.js'
import AddDialog from './children/AddDialog.vue'
export default {
  components: {
    AddDialog
  },
  data() {
    return {
      tableLoading: false,
      leftTreeVisible: false,
      // 弹窗
      showModal: false,
      dialogTitle: '',
      rowData: {},
      // 头部工具栏 BsTabPanel config
      toolBarStatusBtnConfig: {
        changeBtns: true,
        curButton: {
          type: 'button',
          iconName: 'base-all.png',
          iconNameActive: 'base-all-active.png',
          iconUrl: '',
          label: '全部',
          code: '1',
          curValue: '1'
        },
        buttonsInfo: {
          1: [
            { code: 'add', label: '新增', status: 'primary' },
            { code: 'update', label: '修改' },
            { code: 'delete', label: '删除' }
          ]
        },
        methods: {
          bsToolbarClickEvent: this.bsToolbarClickEvent
        }
      },

      // BsTable表格
      menuName: '企业信息列表',
      tableConfig: {
        renderers: {
          // 修改 配置 下发 删除
          $customerRender: {
            renderDefault: (h, cellRender, { row, rowIndex }, context) => {
              let vnode = (
                <div style="display:flex;justify-content: space-around;">
                  <a style="cursor: pointer" onClick={() => this.editRow(row)}>
                    修改
                  </a>
                  <a
                    style="cursor: pointer"
                    onClick={() => this.deleteRow(row)}
                  >
                    删除
                  </a>
                </div>
              )
              // {this.queryData.flowStatus === '2' ? <el-button type="primary" size="mini" onClick={() => this.withdraw(row)}>撤回</el-button> : ''}
              return [vnode]
            }
          }
        },
        globalConfig: {
          // 全局默认渲染列配置
          // 全局配置
          checkType: 'checkbox',
          seq: true
        }
      },
      tableGlobalConfig: {
        showOverflow: true
      },
      footerConfig: {
        showFooter: false
      },
      toolbarConfig: {
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
      treeConfigTable: {
        expandAll: true,
        indent: 10,
        accordion: false
      },
      pagerConfig: {
        total: 0,
        pageSize: 20,
        currentPage: 1
      },
      params: {
        current: 1,
        size: 20
      },
      tableColumnsConfig: [
        {
          title: '企业名称',
          field: 'corpName',
          align: 'center'
        },
        {
          title: '企业社会统一信用代码',
          field: 'unifsocCredCode',
          align: 'center'
        },
        {
          title: '企业性质',
          field: 'corpType',
          align: 'center'
        },
        {
          title: '办公地址',
          field: 'corpAddress',
          align: 'center'
        },
        {
          title: '企业人数',
          field: 'corpPersonNum',
          align: 'center'
        },
        {
          title: '是否重要企业',
          field: 'isImportant',
          align: 'center'
        },
        {
          title: '创建时间',
          field: 'createTime',
          align: 'center'
        },
        {
          title: '更新时间',
          field: 'update_time',
          align: 'center'
        },
        {
          title: '操作',
          filed: 'opration',
          align: 'center',
          fixed: 'right',
          sortable: false,
          filters: false,
          cellRender: {
            // name: '$vxeTableHref',
            // name: '$vxeTableOptionRow',
            name: '$customerRender',
            props: {}
          },
          name: '$customerRender'
        }
      ],
      tableData: [
        {
          corpName: '企业名称',
          unifsocCredCode: '企业社会统一征信代码',
          corpType: '国企',
          corpAddress: '重庆',
          corpPersonNum: '999',
          isImportant: '是',
          createTime: '2023-10-08',
          update_time: '2023-10-09'
        }
      ]
    }
  },
  created() {
    this.initTableData(this.params)
  },
  methods: {
    initTableData(params) {
      console.log(111)
      this.showLoading = true
      api.getReportTasks(params).then((res) => {
        this.showLoading = false
        if (res.rscode === '200') {
          this.tableData = res.data.objects
          // 将返回值中的页面参数同步
          this.pagerConfig.total = res.data.total
          this.pagerConfig.pageSize = res.data.size
          this.pagerConfig.currentPage = res.data.current
        } else {
          this.tableData = []
          this.pagerConfig.total = 0
          this.pagerConfig.currentPage = 1
          this.pagerConfig.pageSize = 20
        }
      }).finally(() => {
        this.showLoading = false
      })
    },
    // 表格数据加载
    ajaxData({ params, currentPage, pageSize }) {
      console.log(params, currentPage, pageSize)
      this.pagerConfig.currentPage = currentPage
      this.pagerConfig.pageSize = pageSize
      this.params = Object.assign(this.params, {
        params,
        current: currentPage,
        size: pageSize
      })
      this.initTableData(this.params)
    },
    // 按钮触发后，回调方式
    bsToolbarClickEvent(obj, $this) {
      switch (obj.code) {
        case 'add':
          this.addNewDataForm()
          break
        case 'delete':
          var selectionRow = this.$refs.mainTableRef.selection
          if (selectionRow.length === 0) {
            this.$message.warning('请选择至少一条任务删除')
            return
          }
          var deleteIds = []
          console.log(selectionRow, '行数据')
          selectionRow.forEach(function (item, index) {
            deleteIds.push(item.taskId)
          })
          this.deleteTask(deleteIds)
          break
        default:
          console.log('default fallback')
      }
    },
    // 新增数据
    addNewDataForm() {
      this.dialogTitle = '新增企业信息'
      this.showModal = true
    },
    // 删除任务
    deleteTask(deleteIds) {
      this.$confirm('此操作将永久删除选中数据, 是否继续?', '提示', {
        confirmButtonText: '删除',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.showLoading = true
          var _this = this
          console.log(deleteIds, 'deleteids')
          api
            .deleteTask(deleteIds)
            .then((res) => {
              _this.showLoading = false
              if (res.rscode === '200') {
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                })
                _this.initTableData()
              } else {
                let message = res?.errorMessage || res?.result
                this.$message.error('删除失败!' + message)
              }
            })
            .catch((_this.showLoading = false))
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // 修改行
    editRow(row) {
      this.dialogTitle = '修改企业信息'
      this.showModal = true
      this.rowData = row
    },
    // 删除某一行
    deleteRow({ taskId }) {
      // console.log([taskId])
      this.deleteTask([taskId])
    },
    dialogClose() {
      this.showModal = false
      this.rowData = {}
    }
  }
}
</script>

<style scoped>
</style>
