<template>
  <vxe-modal
    v-model="dialogVisible"
    :title="title"
    width="96%"
    height="90%"
    :show-footer="true"
    @close="dialogClose"
  >
    <BsTable
      ref="bsTableRef"
      :footer-config="tableFooterConfig"
      :table-columns-config="addFormItemsConfig"
      :table-data="tableData"
      :table-config="tableConfig"
      :toolbar-config="tableToolbarConfig"
      :pager-config="pagerConfig"
      :expand-config="{
        showIcon: true,
        accordion: true,
        lazy: true,
        toggleMethod: toggleContentMethod,
        loadMethod: loadContentMethod,
        visibleMethod: visibleContentMethod,
      }"
      @onToolbarBtnClick="onToolbarBtnClick"
      @cellClick="onCellClick"
      @ajaxData="ajaxTableData"
    />
    <div slot="footer" class="vxeModalUnique" style="height: 80px;">
      <el-divider style="color:#E7EBF0" />
      <el-row type="flex" justify="space-around" style="margin-bottom:14px;margin-top:0px;">
        <el-col :span="8" style="margin-top:10px;" />
        <el-col :span="4" />
        <el-col :span="12" style="margin-top:0px;float:right;">
          <div>
            <el-button @click="dialogClose">取消</el-button>
            <el-button type="primary" style="margin-right:0px;" :loading="showLoading" @click="extraction">抽取</el-button>
          </div>
        </el-col>
      </el-row>
    </div>
  </vxe-modal>
</template>
<script>
// import { proconf } from '../PoliciesAndRegulationsManagement.js'
import HttpModule from '@/api/frame/main/fundMonitoring/dataExtraction.js'
export default {
  name: 'AddDialog',
  components: {},
  computed: {
    // curNavModule() {
    //   return this.$store.state.curNavModule
    // }
  },
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      tableFooterConfig: {
        showFooter: false
      },
      tableConfig: {
        // globalConfig: {
        //   // 全局配置
        //   seq: true // 序号列
        // }
      },
      addFormItemsConfig: [
        {
          'title': '表名',
          'field': 'formCode',
          'align': 'center',
          'sortable': 'true'
        },
        {
          title: '主键字段',
          field: 'primaryCode',
          sortable: false,
          align: 'center'
        },
        {
          'title': '表描述',
          'field': 'formName',
          'align': 'center',
          'sortable': 'true'
        }
      ],
      table1: {
        formCode: '',
        primaryCode: '',
        formName: ''
      },
      tables: [],
      formData: [],
      tableData: [],
      tableToolbarConfig: {
        // table工具栏配置
        disabledMoneyConversion: false,
        moneyConversion: false, // 是否有金额转换
        search: false, // 是否有search
        import: false, // 导入
        export: false, // 导出
        print: false, // 打印
        zoom: false, // 缩放
        custom: false, // 选配展示列
        slots: {
          tools: 'toolbarTools',
          buttons: 'toolbarSlots'
        }
      },
      pagerConfig: {
        total: 0,
        currentPage: 1,
        pageSize: 20
      },
      dialogVisible: true,
      showLoading: false
    }
  },
  methods: {
    // 表格单元行单击
    onCellClick(obj, context, e) {
      let key = obj
      console.log(key)
      if (key.column.type === 'checkbox') {
        this.ruleAccord = key.row.ruleAccord
      }
    },
    toggleContentMethod({ expanded, column, columnIndex, row, rowIndex }) {
      this.$refs.bsTableRef.tableOptionFn().clearRowExpandLoaded(row)
      return true
    },
    loadContentMethod({ row, rowIndex, $rowIndex }) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve()
        }, 500)
      })
    },
    onToolbarBtnClick({ context, table, code }) {
      switch (code) {
        // 刷新
        case 'refresh':
          this.refresh()
          break
      }
    },
    fullExtraction(datas) {
      this.showLoading = true
      const tables = []
      for (let i = 0; i < datas.length; i++) {
        this.table1.formName = datas[i].formName
        this.table1.formCode = datas[i].formCode
        this.table1.primaryCode = datas[i].primaryCode
        tables.push({ ...this.table1 })
      }
      // 这有啥用？
      this.table1 = {
        formCode: '',
        primaryCode: '',
        formName: ''
      }
      const param = {
        tables
      }
      var _this = this
      HttpModule.fullExtract(param)
        .then(res => {
          _this.showLoading = false
          if (res.code === '000000') {
            this.$message.success('抽取成功！')
            _this.$parent.dialogVisible = false
            _this.$parent.queryTableDatas()
            _this.dialogVisible = false
          } else {
            this.$message.error(res.message)
          }
        })
        .catch()
        .finally(() => {
          _this.showLoading = false
        })
    },
    addExtraction(datas) {
      this.showLoading = true
      const tables = []
      for (let i = 0; i < datas.length; i++) {
        this.table1.formName = datas[i].formName
        this.table1.formCode = datas[i].formCode
        tables.push({ ...this.table1 })
      }
      this.table1 = {
        formCode: '',
        primaryCode: '',
        formName: ''
      }
      const param = {
        tables
      }
      var _this = this
      HttpModule.addExtract(param)
        .then(res => {
          _this.showLoading = false
          if (res.code === '000000') {
            this.$message.success('抽取成功！')
            _this.$parent.dialogVisible = false
            _this.$parent.queryTableDatas()
            _this.dialogVisible = false
          } else {
            this.$message.error(res.message)
          }
        })
        .catch()
        .finally(() => {
          _this.showLoading = false
        })
    },
    extraction() {
      const selectionRow = this.$refs.bsTableRef.selection
      // const selectionRow = this.$refs.bsTableRef.$refs.xGrid.getCheckboxRecords()
      console.log(selectionRow)
      if (selectionRow.length === 0) {
        this.$message.warning('请选择至少一条数据进行抽取')
        return
      }
      if (this.title === '全量抽取') {
        this.fullExtraction(selectionRow)
      } else {
        this.addExtraction(selectionRow)
      }
    },
    dialogClose() {
      this.showLoading = false
      this.$parent.dialogVisible = false
      this.$parent.queryTableDatas()
    },
    ajaxTableData({ params, currentPage, pageSize }) {
      this.pagerConfig.currentPage = currentPage
      this.pagerConfig.pageSize = pageSize
      this.queryTableDatas()
    },
    // 查询 table 数据
    queryTableDatas() {
      const param = {
        page: this.pagerConfig.currentPage, // 页码
        pageSize: this.pagerConfig.pageSize // 每页条数
      }
      HttpModule.getTableDatas(param).then(res => {
        if (res.code === '000000') {
          this.tableData = res.data.results
          this.pagerConfig.total = res.data.totalCount
          // this.tabStatusNumConfig['1'] = res.data.totalCount
        } else {
          this.$message.error(res.message)
        }
      })
    },
    // 修改回显
    showInfo() {
      this.queryTableDatas()
      // this.tableData = [
      //   {
      //     formCode: 'ba_tr_bgt_info',
      //     primaryCode: 'bgt_id',
      //     formName: '直达资金分配表'
      //   },
      //   {
      //     formCode: 'ba_bgt_info',
      //     primaryCode: 'bgt_id',
      //     formName: '直达资金指标信息表'
      //   },
      //   {
      //     formCode: 'ba_tr_bgt_rec',
      //     primaryCode: 'bgt_id',
      //     formName: '直达资金接收表'
      //   },
      //   {
      //     formCode: 'pay_voucher',
      //     primaryCode: 'voucher_id',
      //     formName: ''
      //   },
      //   {
      //     formCode: 'budget_t_pro_adm_county',
      //     primaryCode: 'ori_bgt_id',
      //     formName: ''
      //   }
      // ]
      // this.pagerConfig.total = 3
    }
  },
  watch: {
  },
  created() {
    // this.getSysLists()
    this.showInfo()
    // this.getModLists()
    // this.getFunLists()
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
.container{
  padding: 5px 10px 20px;
  border-radius: 4px;
  background-color: #fff;
  position: relative;
  .head-title{
    position: relative;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: nowrap;
    flex-wrap: nowrap;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    font-size: 18px;
    font-weight: bolder;
    line-height: 50px;
    border-bottom: 1px solid #efefef;
    color: #1890ff;
    span: {
      width: 150px;
      height: 30px;
      line-height: 30px;
      font-size: 18px;
    }
    .title1{
      position: absolute;
      left: 0;
      right: 0;
      margin: auto;
      .fn-inline{
        font-size: 16px;
      }
    }
    .title2{
      position: absolute;
      right: 20px;
    }
  }
  .head-title::before {
    position: absolute;
    content: " ";
    left: -10px;
    right: 0;
    top: 0;
    width: 3px;
    height: 30px;
    background-color: #1890ff;
  }
}
</style>
