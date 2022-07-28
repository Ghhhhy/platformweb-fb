<!-- 系统级规则管理 -->
<template>
  <div v-loading="tableLoading" style="height: 100%">
    <BsMainFormListLayout>
      <template v-slot:topTap>
        <BsTable
          ref="mainTableRef"
          style="height: 40%"
          :footer-config="tableFooterConfig"
          :table-columns-config="tableColumnsConfig"
          :table-data="tableData"
          :table-config="tableConfig"
          :pager-config="false"
          :toolbar-config="false"
          @onToolbarBtnClick="onToolbarBtnClick"
          @ajaxData="ajaxTableData"
          @cellClick="cellClick"
        />
      </template>
      <template v-slot:mainForm>
        <div
          class="contain-main-top"
          style="height: 100%"
        >
          <div class="Budget-performance-pay">
            <div class="Budget-performance-pay-top">
              <p style="padding-left: 20px;">当年直达资金监控规则预警数据汇总（按区划）</p>
            </div>
            <div class="Budget-performance-pay-buttom">
              <v-chart :options="initEcharts1" resize style="width: 100%;height:100%;" />
            </div>
          </div>
          <div class="speed-of-progress">
            <div class="speed-of-progress-top">
              <p style="padding-left: 20px;">当年直达资金监控规则预警数据汇总（按月份）</p>
            </div>
            <div class="speed-of-progress-buttom">
              <!-- <ve-line
                :data="chartData"
                :settings="chartSettings"
                :grid="grid"
                :colors="colors"
                :extend="chartExtend"
                :mark-line="markLine"
                :mark-point="markPoint"
              > -->
              <v-chart :options="initEcharts2" resize style="width: 100%;height:100%;" />
            </div>
          </div>
        </div>
      </template>

    </BsMainFormListLayout> -->
  </div>
</template>

<script>
import { proconf } from './PayMonitorRulesMager'
// import AddDialog from './children/addDialog'
import HttpModule from '@/api/frame/main/Monitoring/levelRules.js'
export default {
  // components: {
  //   AddDialog
  // },
  watch: {
  },
  data() {
    return {
      tabStatusNumConfig: {
        '1': 2,
        '2': 0,
        '3': 0
      },
      // table 相关配置
      tableLoading: false,
      tableColumnsConfig: proconf.tableColumnsConfig,
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
      leftNode: {},
      regulationStatus: '1',
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
      // 新增弹窗
      dialogVisible: false,
      dialogTitle: '新增',
      addTableData: [],
      // 请求 & 角色权限相关配置
      menuName: '系统级监控规则',
      params5: '',
      menuId: '',
      tokenid: '',
      userInfo: {},
      roleguid: this.$store.state.curNavModule.roleguid,
      appId: 'pay_voucher',
      isHaveZero: '0',
      condition: {},
      handleType: '',
      isEnable: '',
      regulationType: '',
      warningLevel: '',
      DetailData: {},
      initEcharts1: {
        legend: {},
        tooltip: {},
        dataset: {
          dimensions: ['mof_div_name', 'count'],

          // dimensions: ['product', '预算金额', '指标金额', '已执行金额'],
          // dimensions: ['product', '预算金额'],
          source:
            [
              { mof_div_name: '区划1', 'count': 26 },
              { mof_div_name: '区划2', 'count': 90 },
              { mof_div_name: '区划3', 'count': 20 },
              { mof_div_name: '区划4', 'count': 180 },
              { mof_div_name: '区划5', 'count': 200 },
              { mof_div_name: '区划6', 'count': 12 },
              { mof_div_name: '区划7', 'count': 9 },
              { mof_div_name: '区划8', 'count': 30 },
              { mof_div_name: '区划9', 'count': 200 },
              { mof_div_name: '区划10', 'count': 12 },
              { mof_div_name: '区划11', 'count': 9 },
              { mof_div_name: '区划12', 'count': 30 }
            ]
        },
        color: ['#03c4f1', '#04a4f8', '#288bfd', '#6289fe', '#4ddfc1', '#36c19f'],
        xAxis: {
          type: 'category',
          axisLabel: {
            interval: 0,
            rotate: 20
          }
        },
        yAxis: {
          type: 'value',
          name: '单位(个)',
          axisTick: {
            inside: true
          },
          scale: true,
          axisLabel: {
            margin: 2,
            formatter: function (value, index) {
              if (value >= 10000 && value < 10000000) {
                value = value / 10000 + '万'
              } else if (value >= 10000000) {
                value = value / 10000000 + '千万'
              }
              return value
            }
          }
        },
        // Declare several bar series, each will be mapped
        // to a column of dataset.source by default.
        series: [
          { type: 'bar', barWidth: 30 }
        ]
      },
      initEcharts2: {
        legend: {},
        tooltip: {},
        // dataset: {
        // dimensions: ['month', 'count'],

        // dimensions: ['product', '预算金额', '指标金额', '已执行金额'],
        // dimensions: ['product', '预算金额'],
        // source: [1, 30, 89, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        // [
        // { month_: '1月', 'count': 26 },
        // { month_: '2月', 'count': 90 },
        // { month_: '区划3', 'count': 20 },
        // { month_: '区划4', 'count': 180 },
        // { month_: '区划5', 'count': 200 },
        // { month_: '区划6', 'count': 12 },
        // { month_: '区划7', 'count': 9 },
        // { month_: '区划8', 'count': 30 },
        // { month_: '区划9', 'count': 200 },
        // { month_: '区划10', 'count': 12 },
        // { month_: '区划11', 'count': 9 },
        // { month_: '区划12', 'count': 30 }
        // ]
        // },
        color: ['#03c4f1', '#04a4f8', '#288bfd', '#6289fe', '#4ddfc1', '#36c19f'],
        xAxis: {
          data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
          type: 'category',
          axisLabel: {
            interval: 0,
            rotate: 20
          }
        },
        yAxis: {
          type: 'value',
          name: '单位(个)',
          axisTick: {
            inside: true
          },
          scale: true,
          axisLabel: {
            margin: 2,
            formatter: function (value, index) {
              if (value >= 10000 && value < 10000000) {
                value = value / 10000 + '万'
              } else if (value >= 10000000) {
                value = value / 10000000 + '千万'
              }
              return value
            }
          }
        },
        series: [
          { name: 'count', type: 'line', data: [1, 30, 89, 0, 0, 0, 0, 0, 0, 0, 0, 0], smooth: true }
        ]
      }
    }
  },
  mounted() {
  },
  methods: {
    // table 右侧操作按钮
    onOptionRowClick({ row, optionType }, context) {
      // console.log(context.$parent.$parent.$parent)
      console.log(row.attachment_id)
      switch (optionType) {
        // 新增
        case 'add':
          break
        // 操作日志
        case 'report':
          this.queryActionLog(row)
          break
        // 附件
        case 'attachment':
          break
        default:
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
    // 表格单元行单击
    cellClick(obj, context, e) {
      let key = obj.column.property
      console.log(key, obj.row)
      switch (key) {
        case 'regulationName':
          this.ruleSwich(obj.row)
          break
      }
    },
    ruleSwich(row) {
      this.initEcharts1.dataset.source = row.mof_div
      this.initEcharts2.series[0].data = row.month
    },
    // 刷新按钮 刷新查询栏，提示刷新 table 数据
    refresh() {
      this.queryTableDatas()
      this.queryTableDatasCount()
    },
    ajaxTableData({ params, currentPage, pageSize }) {
      this.mainPagerConfig.currentPage = currentPage
      this.mainPagerConfig.pageSize = pageSize
      this.queryTableDatas()
    },
    queryTableDatasCount() {
      let that = this
      let regulationType = this.$store.state.curNavModule.f_FullName.substring(0, 3)
      if (regulationType === '系统级') {
        regulationType = '1'
      } else if (regulationType === '部门级') {
        regulationType = '3'
      } else if (regulationType === '财政级') {
        regulationType = '2'
      }
      const params = {
        menuType: 1,
        regulationType: regulationType
      }
      HttpModule.queryTableDatasCount(params).then(res => {
        console.log('res.code', res.code)
        that.tabStatusNumConfig['1'] = res.data.unHandle
        that.tabStatusNumConfig['2'] = res.data.handle
        that.tabStatusNumConfig['3'] = res.data.unHandle + res.data.handle
      })
    },
    // 查询 table 数据
    queryTableDatas() {
      console.log(this.$store.state.curNavModule.f_FullName.substring(0, 3))
      let regulationType = this.$store.state.curNavModule.f_FullName.substring(0, 3)
      if (regulationType === '系统级') {
        regulationType = '1'
      } else if (regulationType === '部门级') {
        regulationType = '3'
      } else if (regulationType === '财政级') {
        regulationType = '2'
      }

      const param = {
        page: this.mainPagerConfig.currentPage, // 页码
        pageSize: this.mainPagerConfig.pageSize, // 每页条数
        'regulationType': regulationType, // 规则类型：1.系统级  2.财政级  3.部门级
        'warningLevel': this.warningLevel, // 预警级别
        'handleType': this.handleType, // 处理方式
        'businessModelCode': '', // 业务模块
        'businessFeaturesCode': '', // 业务功能
        'regulationStatus': this.regulationStatus, // 规则状态：1.新增  2.送审  3.审核
        'isEnable': this.isEnable,
        'regulationName': this.regulationName,
        menuType: 1
      }
      if (this.leftNode.businessType === 2) {
        param.businessModelCode = this.leftNode.code
      } else if (this.leftNode.businessType === 3) {
        param.businessFeaturesCode = this.leftNode.code
      }
      this.tableLoading = true
      HttpModule.getMainTableDataList(param).then(res => {
        this.tableLoading = false
        if (res.code === '000000') {
          this.tableData = res.data.results
          this.mainPagerConfig.total = res.data.totalCount
          this.queryTableDatasCount()
        } else {
          this.$message.error(res.result)
        }
      })
    },
    getChildrenData(datas) {
      let that = this
      datas.forEach(item => {
        item.label = item.id + '-' + item.businessName
        item.code = item.id
        item.name = item.businessName
        if (item.children) {
          that.getChildrenData(item.children)
        }
      })

      return datas
    },
    getTableDatas() {
      this.tableData = proconf.tableData
      this.tableData.forEach(item => {
        item.month.forEach((cItem, index) => {
          let no = index + 1
          item['month' + no] = cItem
        })
      })
      this.initEcharts1.dataset.source = this.tableData[0].mof_div
      this.initEcharts2.series[0].data = this.tableData[0].month
    }
  },
  created() {
    console.log('this.$store.state.curNavModule', this.$store.state.curNavModule)
    this.menuId = this.$store.state.curNavModule.guid
    this.roleguid = this.$store.state.curNavModule.roleguid
    this.tokenid = this.$store.getters.getLoginAuthentication.tokenid
    this.userInfo = this.$store.state.userInfo
    this.menuName = this.$store.state.curNavModule.name.substring(0, 5)
    this.getTableDatas()

    // this.queryTableDatas()
  }
}
</script>
<style lang='scss'>
.contain-main-top{
      height: 50%;
      padding: 10px 0;
      box-sizing: border-box;
      >div{
        width:49%;
        margin-right:2%;
        height:100%;
        float:left;
      }
      .Budget-performance-pay{
        .Budget-performance-pay-top{
          border-radius: 5px 5px 0 0;
          color:#fff;
          line-height: 40px;
          height:40px;
          background:linear-gradient(to right,#41bbeb,#3734bb);
          width:100%;
          p{
            font-size:14px;
          }
        }
        .Budget-performance-pay-buttom{
          height:calc( 100% - 20px );
          width:100%;
          background: #fff;
        }
      }
      .speed-of-progress{
        margin-right:0;
        .speed-of-progress-top{
          border-radius: 5px 5px 0 0;
          color:#fff;
          line-height: 40px;
          height:40px;
          background:linear-gradient(to right,#41bbeb,#3734bb);
          width:100%;
          p{
            font-size:14px;
          }
        }
        .speed-of-progress-buttom{
          height:calc( 100% - 20px );
          width:100%;
          background: #fff;
        }
      }
    }
.radio-right{
float: right;
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
