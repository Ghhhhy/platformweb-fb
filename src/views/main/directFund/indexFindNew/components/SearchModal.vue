<!-- 来源去向查看弹框 -->
<template>
  <div>
    <vxe-modal
      ref="projectDialog"
      v-model="dialogVisible"
      width="96%"
      height="96%"
      title="来源去向查看"
      @close="closeDialog"
    >
      <div class="formClass">
        <BsQuery
          ref="queryForm"
          :query-form-item-config="queryFormItemConfig"
          :query-form-data="queryFormData"
          @onSearchClick="onSearchClick"
          @onSearchResetClick="onSearchResetClick"
        />
        <BsTable
          ref="detailTable"
          show-zero
          style="height:calc(100% - 56px)"
          :loading="tableLoading"
          :table-data="tableData"
          :edit-rules="editRules"
          :edit-config="editConfig"
          :table-config="tableConfig"
          :pager-config="pagerConfig"
          :footer-config="footerConfig"
          :default-money-unit="defaultMoneyUnit"
          :table-columns-config="tableColumnsConfig"
          :cell-style="cellStyle"
          @radioChange="checkboxChange"
          @ajaxData="pageChangeHandle"
          @cellClick="cellClick"
          @onToolbarBtnClick="onToolbarOperrateClick"
        />
      </div>
      <div v-show="selectRow.length > 0" class="formClass1">
        <BsTable
          ref="hxTable"
          :loading="BtableLoading"
          :table-data="BtableData"
          :cell-style="BcellStyle"
          :table-config="tableConfig"
          :pager-config="BpagerConfig"
          :footer-config="footerConfig"
          :default-money-unit="defaultMoneyUnit"
          :table-columns-config="BtableColumnsConfig"
          @cellClick="BcellClick"
          @ajaxData="pageDownChangeHandle"
          @onToolbarBtnClick="onToolbarOperrateClick1"
        />
      </div>
    </vxe-modal>
    <DetailDialog
      v-if="detailVisible"
      :dialog-visible.sync="detailVisible"
      :detail-row="detailRow"
    />
    <BottomTargetDialog
      v-if="detailVisible1"
      :dialog-visible.sync="detailVisible1"
      :detail-row="detailRow1"
    />
    <BottomPayDialog
      v-if="detailVisible2"
      :dialog-visible.sync="detailVisible2"
      :detail-row="detailRow2"
    />
    <ProjectItem
      v-if="addDialogVisible"
      ref="projectDialog"
      :dialog-visible.sync="addDialogVisible"
      :pro-guid="proGuid"
      :pro-code="proCode"
      :mof-div-code="mofDivCode"
      :click-row-data="clickRowData"
    />o-guid="proGuid"
    />
  </div>

</template>

<script>
import commonMixin from '@//mixin/commonMixin'
import DetailDialog from './detailDialog.vue'
import BottomTargetDialog from './bottomTargetDialog.vue'
import BottomPayDialog from './bottomPayDialog.vue'
import ProjectItem from '../../../fundMonitoring/capitalAccount/children/ProjectItem.vue'
// import { post } from '@/api/http'
export default {
  name: 'SearchModal',
  mixins: [commonMixin],
  components: {
    DetailDialog,
    BottomTargetDialog,
    BottomPayDialog,
    ProjectItem
  },
  props: {
    dialogVisible: {
      type: Boolean,
      default() {
        return false
      }
    },
    closeDialogCall: {
      type: Function,
      default: () => { }
    },
    currentValue: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      addDialogVisible: false,
      proGuid: '',
      fiscalYear: '',
      mofDivCode: '',
      clickRowData: {},
      queryFormItemConfig: [
        // {
        //   title: '处室',
        //   field: 'manageMofDep',
        //   align: 'left',
        //   span: 6,
        //   itemRender: {
        //     name: '$vxeTree',
        //     options: [],
        //     'props': {
        //       'config': {
        //         'treeProps': {
        //           'nodeKey': 'id',
        //           'label': 'label',
        //           'children': 'children'
        //         },
        //         'placeholder': '请选择处室',
        //         'multiple': false,
        //         'readonly': true,
        //         'isleaf': true
        //       }
        //     }
        //   }
        // },
        {
          title: '指标文号',
          field: 'corBgtDocNo',
          align: 'left',
          span: 6,
          itemRender: {
            name: '$vxeInput',
            defaultValue: '',
            props: {
              placeholder: '请输入指标文号',
              size: 'small'
            }
          }
        }
        // {
        //   title: '区划名称',
        //   field: 'mofDiv',
        //   align: 'left',
        //   span: 6,
        //   itemRender: {
        //     name: '$vxeTree',
        //     options: [],
        //     'props': {
        //       'config': {
        //         'treeProps': {
        //           'nodeKey': 'id',
        //           'label': 'label',
        //           'children': 'children'
        //         },
        //         'placeholder': '请选择区划名称',
        //         'multiple': false,
        //         'readonly': true,
        //         'isleaf': true
        //       }
        //     }
        //   }
        // },
        // {
        //   title: '专项资金',
        //   field: 'trackPro',
        //   span: 6,
        //   itemRender: {
        //     name: '$vxeTree',
        //     options: [],
        //     'props': {
        //       'config': {
        //         'treeProps': {
        //           'nodeKey': 'id',
        //           'label': 'label',
        //           'children': 'children'
        //         },
        //         'placeholder': '请选择专项资金',
        //         'multiple': false,
        //         'readonly': true,
        //         'isleaf': true
        //       }
        //     }
        //   }
        // }
      ],
      queryFormData: {},
      selectRow: [],
      tableLoading: false,
      editRules: {},
      editConfig: {},
      footerConfig: {
        showFooter: true,
        combinedType: ['subTotal', 'total', 'totalAll', 'switchTotal']
      },
      pagerConfig: {
        total: 0,
        pageSize: 20,
        currentPage: 1
      },
      tableQuery: {},
      BpagerConfig: {
        total: 0,
        pageSize: 20,
        currentPage: 1
      },
      defaultMoneyUnit: 10000,
      tableColumnsConfig: [],
      tableConfig: {
        globalConfig: { // 全局配置
          checkType: 'radio', // 'checkbox'复选框
          seq: true // 序号列
        }
      },
      tableData: [],
      BtableLoading: false,
      BtableColumnsConfig: [],
      BtableData: [],
      detailVisible: false,
      detailRow: {},
      detailVisible1: false,
      detailRow1: {},
      detailVisible2: false,
      detailRow2: {},
      downParams: {
        corBgtDocNo: '',
        recDivCode: '',
        trackProCode: '',
        bgtId: ''
      }

    }
  },
  methods: {
    cellClick(obj, context, from) {
      console.log(obj.column.property)
      if (obj.column.property === 'payAppAmt') {
        this.detailRow = obj.row
        if (this.currentValue.sfzd === '其他') {
          this.detailRow.isDirCode = '09'
        }
        if (this.currentValue.sfzd === '中央直达资金') {
          this.detailRow.isDirCode = '01'
        }
        if (this.currentValue.sfzd === '中央参照直达资金') {
          this.detailRow.isDirCode = '02'
        }
        this.detailVisible = true
      } else if (obj.column.property === 'proName') {
        this.detailRow = obj.row
        // this.detailVisible = true
        console.log(obj.row.proGuid)
        if (!obj.row.proGuid) {
          this.$message.warning('未返proGuid,无法查看项目信息')
          return
        }
        this.proGuid = obj.row?.proGuid || ''
        this.mofDivCode = obj.row?.mofDivCode || ''
        this.fiscalYear = obj.row?.fiscalYear || ''
        let groupUrl = ''
        if (this.$store.getters.isSx) {
          let groups = window.gloableToolFn.getGroups || {}
          Object.keys(groups).forEach(key => {
            console.log(key, '-------------')
            if (groups[key].indexOf(this.mofDivCode?.slice(0, 4)) !== -1) {
              groupUrl = window.gloableToolFn.getProjectUrl[key]
              let url = `${groupUrl}/ProjectDetailIframe?isShowHead=0&tokenid=${this.$store.getters.getLoginAuthentication.tokenid}&appguid=ystztj&proGuid=${this.proGuid}&mofDivCode=${this.mofDivCode}&fiscalYear=${this.fiscalYear}`
              console.log('访问地址：', url)
              window.open(url)
            }
          })
        } else {
          this.clickRowData = obj.row
          let field = this.tableColumnsConfig[0].field
          // 第一行为合计则不可钻取
          if (obj.row[field].replace(/\s*/g, '') === '合计') return
          if (this.$store.state.userInfo.province?.slice(0, 4) === '3502') {
            if (obj.column.property === 'proName' || obj.column.property === 'proCodeName') {
              if (!obj.row.proGuid) {
                // this.$message.warning('未返proGuid,无法查看项目信息')
                return
              }
              this.proGuid = obj.row.proGuid || ''
              this.mofDivCode = obj.row.mofDivCode?.slice(0, 9) || ''
              this.addDialogVisible = true
            }
          } else if (this.$store.state.userInfo.province?.slice(0, 2) === '22') { // 吉林
            // const isInvalidCellValue11 = !(obj.row[obj.column.property] * 1)
            if (!this.clickRowData.proGuid || this.clickRowData.trackProName === '合计') { // 吉林第一行数据为合计  由后端返回  直接不准点击
              return
            }
            if (obj.column.property === 'proName' || obj.column.property === 'proCodeName') {
              this.mofDivCode = obj.row.mofDivCode?.slice(0, 9) || ''
              this.addDialogVisible = true
            }
          } else {
            if ((['proCode'].includes(obj.column.property) || ['proName'].includes(obj.column.property)) && this.transJson(this.params5 || '')?.projectCode !== 'SH') {
              if (!obj.row.proGuid) {
                // this.$message.warning('未返proGuid,无法查看项目信息')
                return
              }
              this.proGuid = obj.row.proGuid || ''
              this.mofDivCode = obj.row.mofDivCode?.slice(0, 9) || ''
              this.addDialogVisible = true
            }
          }
        }
      }
    },
    cellStyle({ row, rowIndex, column }) {
      if (column.property === 'payAppAmt' || column.property === 'proName') {
        return {
          color: '#4293F4',
          textDecoration: 'underline'
        }
      }
    },
    BcellStyle({ row, rowIndex, column }) {
      if (column.property === 'payAppAmt' || column.property === 'fpAmount' || column.property === 'proName') {
        return {
          color: '#4293F4',
          textDecoration: 'underline'
        }
      }
    },
    pageChangeHandle({ currentPage, pageSize }) { // 表格分页点击
      this.pagerConfig.currentPage = currentPage
      this.pagerConfig.pageSize = pageSize
      this.getTopTableData()
    },
    pageDownChangeHandle({ currentPage, pageSize }) { // 表格分页点击
      this.BpagerConfig.currentPage = currentPage
      this.BpagerConfig.pageSize = pageSize
      this.getBottomTableData()
    },
    onToolbarOperrateClick({ code }) {
      console.log(123, code)
      switch (code) {
        case 'refresh':
          this.onSearchClick()
          // this.reloadTableConlums(this.tableColumnsConfig)
          // this.refreshTable()
          break
      }
    },
    onToolbarOperrateClick1({ code }) {
      console.log(123, code)
      switch (code) {
        case 'refresh':
          this.getBottomTableData(this.selectRow[0])
          // this.reloadTableConlums(this.tableColumnsConfig)
          // this.refreshTable()
          break
      }
    },
    BcellClick(obj, context, from) {
      if (obj.column.property === 'payAppAmt') { // 指标明细
        this.detailRow2 = obj.row
        this.detailVisible2 = true
      } else if (obj.column.property === 'fpAmount') { // 支付明细
        this.detailRow1 = obj.row
        this.detailVisible1 = true
      } else if (obj.column.property === 'proName') {
        if (!obj.row.proGuid) {
          this.$message.warning('未返proGuid,无法查看项目信息')
          return
        }
        this.proGuid = obj.row?.proGuid || ''
        this.mofDivCode = obj.row?.mofDivCode || ''
        this.fiscalYear = obj.row?.fiscalYear || ''
        let groupUrl = ''
        let groups = window.gloableToolFn.getGroups || {}
        Object.keys(groups).forEach(key => {
          console.log(key, '-------------')
          if (groups[key].indexOf(this.mofDivCode?.slice(0, 4)) !== -1) {
            groupUrl = window.gloableToolFn.getProjectUrl[key]
            let url = `${groupUrl}/ProjectDetailIframe?isShowHead=0&tokenid=${this.$store.getters.getLoginAuthentication.tokenid}&appguid=ystztj&proGuid=${this.proGuid}&mofDivCode=${this.mofDivCode}&fiscalYear=${this.fiscalYear}`
            console.log('访问地址：', url)
            window.open(url)
          }
        })
      }
    },
    onSearchClick () {
      let data = this.$refs.queryForm.getFormData()
      let parentRow = this.currentValue
      this.queryFormData = {
        bgtId: parentRow.bgtId,
        corBgtDocNo: data.corBgtDocNo,
        trackProCode: parentRow.trackProCode
      }
      this.getTopTableData()
    },
    async onSearchResetClick () {
      this.queryFormData = {}
      await this.$refs.queryForm.reset()
      await this.getTopTableData()
    },
    async checkboxChange(obj, e) {
      this.selectRow = [obj.row]
      this.downParams.corBgtDocNo = obj.row.corBgtDocNo || ''
      this.downParams.recDivCode = obj.row.recDivCode || ''
      this.downParams.trackProCode = obj.row.trackProCode || ''
      this.downParams.bgtId = obj.row.bgtId || ''
      await this.getBottomTableData(obj.row)
    },
    closeDialog(type) {
      this.closeDialogCall(type)
    },
    getTableConfig() {
      this.tableColumnsConfig = [
        {
          field: 'mofDivName',
          title: '区划名称',
          treeNode: true,
          fixed: 'left'
        },
        {
          field: 'mofDepName',
          title: '处室',
          treeNode: true,
          fixed: 'left'
        },
        {
          field: 'corBgtDocNo',
          title: '指标文号',
          treeNode: true,
          fixed: 'left'
        },
        {
          field: 'agencyName',
          title: '单位'
        },
        {
          field: 'trackProName',
          title: '专项资金'
        },
        {
          field: 'proName',
          title: '项目名称'
        },
        {
          field: 'supBgtDocNo',
          title: '上级文号'
        },
        // {
        //   field: 'sjzxzj',
        //   title: '上级专项资金'
        // },
        {
          field: 'ysAmount',
          title: '预算金额',
          align: 'right',
          cellRender: {
            name: '$vxeMoney'
          },
          combinedType: ['subTotal', 'total', 'treeTotal'],
          sort: true
        },
        {
          field: 'fpAmount',
          title: '分配下级金额',
          align: 'right',
          cellRender: {
            name: '$vxeMoney'
          },
          combinedType: ['subTotal', 'total', 'treeTotal'],
          sort: true
        },
        {
          field: 'fpjd',
          title: '分配下级进度',
          align: 'right',
          formula: '({ysAmount}-0==0)?0:(({fpAmount})/{ysAmount}*100)',
          cellRender: {
            name: '$vxeRatio'
          },
          sort: true
        },
        {
          field: 'payAppAmt',
          title: '支付金额',
          align: 'right',
          cellRender: {
            name: '$vxeMoney'
          },
          combinedType: ['subTotal', 'total', 'treeTotal'],
          sort: true
        },
        {
          field: 'zfjd',
          title: '支付进度',
          align: 'right',
          formula: '({ysAmount}-0==0)?0:(({payAppAmt})/{ysAmount}*100)',
          cellRender: {
            name: '$vxeRatio'
          },
          sort: true
        }

      ]
      this.tableColumnsConfig.forEach((v) => {
        v.width = 220
      })
      this.BtableColumnsConfig = [
        {
          field: 'mofDivName',
          title: '区划名称',
          treeNode: true,
          fixed: 'left'
        },
        {
          field: 'mofDepName',
          title: '处室',
          treeNode: true,
          fixed: 'left'
        },
        {
          field: 'corBgtDocNo',
          title: '指标文号',
          treeNode: true,
          fixed: 'left'
        },
        {
          field: 'agencyName',
          title: '单位'
        },
        {
          field: 'trackProName',
          title: '专项资金'
        },
        {
          field: 'proName',
          title: '项目名称'
        },
        {
          field: 'supBgtDocNo',
          title: '上级文号'
        },
        // {
        //   field: 'sjzxzj',
        //   title: '上级专项资金'
        // },
        {
          field: 'ysAmount',
          title: '预算金额',
          align: 'right',
          cellRender: {
            name: '$vxeMoney'
          },
          combinedType: ['subTotal', 'total', 'treeTotal'],
          sort: true
        },
        {
          field: 'fpAmount',
          title: '分配下级金额',
          align: 'right',
          cellRender: {
            name: '$vxeMoney'
          },
          combinedType: ['subTotal', 'total', 'treeTotal'],
          sort: true
        },
        {
          field: 'fpjd',
          title: '分配下级进度',
          align: 'right',
          formula: '({ysAmount}-0==0)?0:(({fpAmount})/{ysAmount}*100)',
          cellRender: {
            name: '$vxeRatio'
          },
          sort: true
        },
        {
          field: 'payAppAmt',
          title: '支付金额',
          align: 'right',
          cellRender: {
            name: '$vxeMoney'
          },
          combinedType: ['subTotal', 'total', 'treeTotal'],
          sort: true
        },
        {
          field: 'zfjd',
          title: '支付进度',
          align: 'right',
          formula: '({ysAmount}-0==0)?0:(({payAppAmt})/{ysAmount}*100)',
          cellRender: {
            name: '$vxeRatio'
          },
          sort: true
        }
      ]
      this.BtableColumnsConfig.forEach((v) => {
        v.width = 220
      })
    },
    // post('', params)
    async getTopTableData() {
      this.tableLoading = true // 加载显示
      const { currentPage, pageSize } = this.pagerConfig
      const params = {
        current: currentPage, // 分页-当前页号
        size: pageSize, // 分页-规模
        ...this.tableQuery,
        ...this.queryFormData,
        reportCode: 'queryTop'
      }
      await this.$http.post('dfr-monitor-service/dfr/bgtInfoQuery/queryDetailPage', params).then((res) => {
        if (res.code === '000000' && res.data) {
          this.tableData = res.data.results
          this.pagerConfig.total = res.data.totalCount
        }
        this.tableLoading = false
      })
    },
    async getBottomTableData(row) {
      this.BtableLoading = true // 加载显示
      const { currentPage, pageSize } = this.BpagerConfig
      const params = {
        current: currentPage, // 分页-当前页号
        size: pageSize, // 分页-规模
        ...this.downParams,
        reportCode: 'queryDown'
      }
      await this.$http.post('dfr-monitor-service/dfr/bgtInfoQuery/queryDetailXjPage', params).then((res) => {
        if (res.code === '000000' && res.data) {
          this.BtableData = res.data.results
          this.BpagerConfig.total = res.data.totalCount
        } else {
          this.$message(res.message)
        }
        this.BtableLoading = false
      })
    },
    getRegulationChildrenData1(datas) {
      let that = this
      datas.forEach(item => {
        // item.code = item.code
        item.label = item.code + '-' + item.name
        if (item.children && item.children.length > 0) {
          that.getRegulationChildrenData1(item.children)
          item.leaf = false
        } else {
          item.leaf = true
        }
      })

      return datas
    }
    // async getTreeConfig() {
    //   await this.$http.get('large-monitor-platform/lmp/manageMofDep', {}).then((res) => { // 处室
    //     if (res.code === '000000' && res.data) {
    //       let treeResdata = this.getRegulationChildrenData1(res.data)
    //       this.queryFormItemConfig[0].itemRender.options = treeResdata
    //     } else {
    //       this.$message.error('下拉树加载失败')
    //     }
    //   })
    //   await this.$http.post('dfr-monitor-service/dfr/mofDivList/query', {}).then((res) => { // 区划
    //     if (res.code === '000000' && res.data) {
    //       let treeResdata = this.getRegulationChildrenData1(res.data)
    //       this.queryFormItemConfig[2].itemRender.options = treeResdata
    //     } else {
    //       this.$message.error('下拉树加载失败')
    //     }
    //   })
    //   await this.$http.post('dfr-monitor-service/dfr/mofDivList/querySpePro', {}).then((res) => { // 专项资金
    //     if (res.code === '000000' && res.data) {
    //       let treeResdata = this.getRegulationChildrenData1(res.data)
    //       this.queryFormItemConfig[3].itemRender.options = treeResdata
    //     } else {
    //       this.$message.error('下拉树加载失败')
    //     }
    //   })
    // }
  },
  mounted() {
    this.getTopTableData()
  },
  created() {
    this.getTableConfig()
    // this.getTreeConfig()
  },
  watch: {
    dialogVisible: {
      handler(newval) {
        this.$emit('update:dialogVisible', newval)
        if (newval) {
          this.tableQuery = {
            bgtId: this.currentValue.bgtId,
            trackProCode: this.currentValue.trackProCode
          }
        }
      },
      deep: true,
      immediate: true
    }
  }
}
</script>

<style  lang="scss" scoped>
.buttonClass{
  text-align: right;
  margin-bottom: 12px;
  .buttonClass1{
    float:left;
    padding-top: 10px;
  }
}

.formClass{
  height:52%;
}
.formClass1{
  height:48%;
  .formTitle{
    color: var(--secondary-color);
    border-left: 4px solid var(--secondary-color);
    padding-left: 15px;
    margin: 10px 0;
  }
}
</style>
