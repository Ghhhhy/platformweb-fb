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
          :pager-config="mainPagerConfig"
          :toolbar-config="tableToolbarConfig"
          @onToolbarBtnClick="onToolbarBtnClick"
          @ajaxData="ajaxTableData"
          @cellClick="cellClick"
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
      <template v-slot:mainForm>
        <div
          class="contain-main-top"
          style="height: 100%"
        >
          <div class="Budget-performance-pay">
            <div class="Budget-performance-pay-top">
              <p style="padding-left: 20px;">当年{{ menuName }}汇总分析（按预算单位）</p>
            </div>
            <div class="Budget-performance-pay-buttom">
              <v-chart :options="initEcharts1" resize style="width: 100%;height:100%;" />
            </div>
          </div>
          <div class="speed-of-progress">
            <div class="speed-of-progress-top">
              <p style="padding-left: 20px;">当年{{ menuName }}分析（按月）</p>
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
import { proconf } from './BudgetImplementWarningDataMager'
import HttpModule from '@/api/frame/main/Monitoring/BudgetImplementWarningDataMager.js'
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
      menuName: '统计列表',
      param5: '',
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
        title: {
          show: false, // 是否显示title
          text: '亲，没有更多数据了！',
          left: 'center',
          top: 'center',
          textStyle: {
            color: '#606266',
            fontSize: 14,
            fontWeight: 'normal'
          }
        },
        legend: {
          data: ['违规次数/次'],
          right: '10%'
        },
        tooltip: {},
        color: ['#03c4f1', '#04a4f8', '#288bfd', '#6289fe', '#4ddfc1', '#36c19f'],
        xAxis: [
          {
            type: 'category',
            axisTick: { show: true },
            data: []
          }
        ],
        yAxis: {
          type: 'value',
          name: '单位(次)',
          min: 0,
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
          {
            name: '违规次数/次',
            type: 'bar',
            barWidth: 30,
            emphasis: {
              focus: 'series'
            },
            data: []
          }
        ]
      },
      initEcharts2: {
        title: {
          show: false, // 是否显示title
          text: '亲，没有更多数据了！',
          left: 'center',
          top: 'center',
          textStyle: {
            color: '#606266',
            fontSize: 14,
            fontWeight: 'normal'
          }
        },
        legend: {
          right: '10%'
        },
        tooltip: {},
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
          {
            name: this.title,
            type: 'line',
            smooth: true,
            data: []
          }
        ]
      },
      fiRuleCode: '',
      title: ''
    }
  },
  mounted() {
  },
  methods: {
    // table 右侧操作按钮
    onOptionRowClick({ row, optionType }, context) {
      // console.log(context.$parent.$parent.$parent)
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
      this.fiRuleCode = obj.row.fiRuleCode + ''
      this.title = obj.row.fiRuleName
      this.getDatasByAgency()
      this.getDatasByMonth()
    },
    // ruleSwich(row) {
    //   this.initEcharts1.dataset.source = row.mof_div
    //   this.initEcharts2.series[0].data = row.month
    // },
    // 刷新按钮 刷新查询栏，提示刷新 table 数据
    refresh() {
      this.queryTableDatas()
      this.fiRuleCode = ''
      this.getDatasByAgency()
      this.getDatasByMonth()
      // this.queryTableDatasCount()
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
        that.tabStatusNumConfig['1'] = res.data.unHandle
        that.tabStatusNumConfig['2'] = res.data.handle
        that.tabStatusNumConfig['3'] = res.data.unHandle + res.data.handle
      })
    },
    // 查询 table 数据
    queryTableDatas() {
      const param = {
        regulationClass: this.param5,
        fiRuleCode: this.fiRuleCode,
        page: this.mainPagerConfig.currentPage, // 页码
        pageSize: this.mainPagerConfig.pageSize // 每页条数
      }
      HttpModule.getTableDatas(param).then(res => {
        this.tableLoading = false
        if (res.code === '000000') {
          this.tableData = res.data.results
          this.mainPagerConfig.total = res.data.totalCount
          // this.queryTableDatasCount()
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
    getDatasByAgency() {
      const param = {
        fiRuleCode: this.fiRuleCode,
        regulationClass: this.param5
      }
      HttpModule.getDatasByAgency(param).then(res => {
        this.tableLoading = false
        if (res.code === '000000') {
          if (res.data.length === 0) {
            this.initEcharts1.title.show = true
          } else {
            this.initEcharts1.title.show = false
          }
          this.initEcharts1.xAxis[0].data = []
          this.initEcharts1.series[0].data = []
          res.data.forEach(item => {
            this.initEcharts1.xAxis[0].data.push(item.agencyName)
            this.initEcharts1.series[0].data.push(item.warnCount)
          })
        } else {
          this.$message.error(res.result)
        }
      })
    },
    getDatasByMonth() {
      const param = {
        fiRuleCode: this.fiRuleCode,
        regulationClass: this.param5
      }
      HttpModule.getDatasByMonth(param).then(res => {
        this.tableLoading = false
        if (res.code === '000000') {
          if (res.data.length === 0) {
            this.initEcharts2.title.show = true
          } else {
            this.initEcharts2.title.show = false
          }
          this.initEcharts2.series[0].data = []
          this.initEcharts2.series[0].name = this.title
          res.data.forEach(item => {
            this.initEcharts2.series[0].data = [item.month1, item.month2, item.month3, item.month4, item.month5, item.month6, item.month7, item.month8, item.month9, item.month10, item.month11, item.month12]
          })
          // this.initEcharts2.series
        } else {
          this.$message.error(res.result)
        }
      })
    }
  },
  created() {
    this.menuId = this.$store.state.curNavModule.guid
    this.roleguid = this.$store.state.curNavModule.roleguid
    this.tokenid = this.$store.getters.getLoginAuthentication.tokenid
    this.userInfo = this.$store.state.userInfo
    this.menuName = this.$store.state.curNavModule.name // .substring(0, 5)
    this.param5 = this.$store.state.curNavModule.param5
    this.title = this.$store.state.curNavModule.name
    this.queryTableDatas()
    this.getDatasByAgency()
    this.getDatasByMonth()
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
      background:linear-gradient(to right,var(--primary-color),var(--primary-color-shadow));
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
      background:linear-gradient(to right,var(--primary-color),var(--primary-color-shadow));
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
