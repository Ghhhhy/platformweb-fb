<template>
  <div class="warning-overview">
    <div class="warning-overview-body">
      <header class="warning-overview-header">{{ $store.state.userInfo.admdivname.replace('本级','') }}监控管理预警总览</header>
      <main>
        <!--顶部规则和地图-->
        <div class="warning-overview-top">
          <div class="rule-container">
            <div class="rule-use-wrapper">
              <!--<RuleUseInfoChart />-->
              <div class="f20 rule-swiper-title">监控整体情况</div>
              <div class="width1 color1 mgr15">
                <div class="rule-swiper-title">本月预警数据：<div class="font-style" @click="menuClick1">{{ warnMonthList.warnCount || '0' }}笔</div></div>
                <div class="rule-swiper-title">本月已处理：<div class="font-style">{{ warnMonthList.handAmount || '0' }}笔</div></div>
              </div>

              <div class="width2 color2 mgr15">
                <div class="rule-swiper-title">本年累计预警数据：<div class="font-style" @click="menuClick1">{{ warnYearList.warnCount || '0' }}笔</div></div>
                <div class="rule-swiper-title">本年累计已处理：<div class="font-style">{{ warnYearList.handAmount || '0' }}笔</div></div>
              </div>

              <div class="width3 color3 mgr15">
                <div class="rule-swiper-title">所有规则：<div class="font-style" @click="menuClick2">{{ ruleList.ruleCount || '0' }}笔</div></div>
                <div class="rule-swiper-title">启用规则：<div class="font-style">{{ ruleList.activeRuleCount || '0' }}笔</div></div>
              </div>
            </div>
            <div class="rule-scroll-wrapper">
              <RuleScroll />
            </div>
          </div>
          <div class="addParentBox">
            <div class="map-and-menu">
              <Map />
              <MenuModel />
            </div>
          </div>
        </div>
        <div class="warning-overview-bottom">
          <div v-param5Show="'showQuanShengYuJin'" class="do-info">
            <div class="module-wrapper">
              <p class="f20 rule-swiper-title">全省监控预警处理率排名</p>
              <vxe-grid
                :columns="tableColumnsConfig1"
                :data="tableData1"
                height="224"
                auto-resize
                sync-resize
                show-overflow="tooltip"
                show-header-overflow="tooltip"
                border="full"
                class="chart-table"
              />
            </div>
          </div>
          <div v-param5Show="'showZhiDaZiJin'" class="do-info">
            <div class="module-wrapper">
              <p class="f20 rule-swiper-title">直达资金管理工作情况排名</p>
              <vxe-grid
                :columns="tableColumnsConfig2"
                :data="tableData2"
                height="224"
                auto-resize
                sync-resize
                show-overflow="tooltip"
                show-header-overflow="tooltip"
                border="full"
                class="chart-table"
              />
            </div>
          </div>
          <div v-param5Show="'showSanGong'" class="warning-data">
            <div class="module-wrapper">
              <p class="f20 rule-swiper-title">全省“三公”经费预警处理率排名</p>
              <vxe-grid
                :columns="tableColumnsConfig3"
                :data="tableData3"
                height="224"
                auto-resize
                sync-resize
                show-overflow="tooltip"
                show-header-overflow="tooltip"
                border="full"
                class="chart-table"
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from '@vue/composition-api'
import Map from './components/Map'
import MenuModel from './components/MenuModel'
import RuleUseInfoChart from './components/RuleUseInfoChart'
import RuleScroll from './components/RuleScroll'
import ViewAllRules from './components/ViewAllRules'
import MonitoringHandlingInfo from './components/MonitoringHandlingInfo'
import { getWarnByMofDivCode, ruleActivateInfo, rankProcessing, ledgerProcessing } from '@/api/frame/main/warningOverview'
import store from '@/store/index'
import router from '@/router'
export default defineComponent({
  components: { Map, MenuModel, RuleUseInfoChart, RuleScroll, ViewAllRules, MonitoringHandlingInfo },
  setup() {
    // 表格数据
    const warnMonthList = ref({})
    const warnYearList = ref({})
    const ruleList = ref({})
    const tableData1 = ref([])
    const tableData2 = ref([])
    const tableData3 = ref([])
    /**
     * 获取按月数据
     * @return {Promise<void>}
     */
    async function getMonthData() {
      const { data } = await getWarnByMofDivCode({ type: 2 })
      warnMonthList.value = data[0] || {}
    }
    getMonthData()
    /**
     * 获取按年数据
     * @return {Promise<void>}
     */
    async function getYearData() {
      const { data } = await getWarnByMofDivCode({ type: 1 })
      warnYearList.value = data[0] || {}
    }
    getYearData()
    /**
     * 规则启用情况
     * @return {Promise<void>}
     */
    async function getRuleActivateInfo() {
      const { data } = await ruleActivateInfo()
      ruleList.value = data[0] || {}
    }
    getRuleActivateInfo()
    /**
     * 全省监控预警处理率排名
     * @return {Promise<void>}
     */
    async function getRankProcessing() {
      const { data } = await rankProcessing({ fiscalYear: store.state.userInfo.year })
      tableData1.value = data || []
    }
    getRankProcessing()
    /**
     * 全省“三公”监控预警处理率排名
     * @return {Promise<void>}
     */
    async function getRankSGProcessing() {
      const { data } = await rankProcessing({ fiscalYear: store.state.userInfo.year, regulationClass: '0205' })
      tableData3.value = data || []
    }
    getRankSGProcessing()
    /**
     * 全省监控预警
     * @return {Promise<void>}
     */
    async function getRankQSProcessing() {
      const { data } = await rankProcessing({ fiscalYear: store.state.userInfo.year, regulationClass: '0201' })
      tableData2.value = data || []
    }
    getRankQSProcessing()
    /**
     * 直达资金管理工作排名
     * @return {Promise<void>}
     */
    async function getLedgerProcessing() {
      const { data } = await ledgerProcessing({ fiscalYear: store.state.userInfo.year, reportCode: 'zdzjzcjdpm' })
      tableData2.value = data?.length > 0 && data.map(({ mofDivName, amountPro, amountPayPro }) => {
        return { mofDivName, amountPro, amountPayPro, rankProcess: tableData2['rankProcess'] }
      })
    }
    getLedgerProcessing()
    const menuClick1 = () => {
      router.push({
        name: 'SproWarnRegionSummary'
      })
      const route = {
        url: '/SproWarnRegionSummary',
        code: '892',
        name: ' 重点监督预警汇总_分地区 '
      }
      store.commit('setCurMenuObj', route)
    }
    const menuClick2 = () => {
      router.push({
        name: 'MonitorRulesViewFJ'
      })
      const route = {
        url: '/MonitorRulesViewFJ',
        code: '892',
        name: ' 监控规则库 '
      }
      store.commit('setCurMenuObj', route)
    }
    return {
      warnMonthList,
      warnYearList,
      ruleList,
      tableData1,
      tableData2,
      tableData3,
      menuClick1,
      menuClick2
    }
  },
  data() {
    return {
      tableColumnsConfig1: [
        {
          title: '名次',
          type: 'seq',
          sortable: false,
          align: 'center'
        },
        {
          title: '地区名称',
          field: 'mofDivName',
          sortable: false,
          align: 'center'
        },
        {
          title: '预警数据处理率',
          field: 'rankProcess',
          sortable: false,
          align: 'center',
          formatter: ({ row }) => {
            return row.rankProcess ? `${row.rankProcess}%` : '0%'
          }
        },
        {
          title: '问询处理率',
          field: 'rankAskProcess',
          sortable: false,
          align: 'center',
          formatter: ({ row }) => {
            return row.rankAskProcess ? `${row.rankAskProcess}%` : '0%'
          }
        }
      ],
      tableColumnsConfig2: [
        {
          title: '名次',
          type: 'seq',
          sortable: false,
          align: 'center'
        },
        {
          title: '预算下达进度',
          field: '',
          sortable: false,
          align: 'center',
          children: [
            {
              title: '区划名称',
              field: 'mofDivName',
              sortable: false,
              align: 'center'
            },
            {
              title: '进度',
              field: 'amountPro',
              sortable: false,
              align: 'center',
              formatter: ({ row }) => {
                return row.amountPro ? `${row.amountPro}%` : '0%'
              }
            }
          ]
        },
        {
          title: '资金支出进度',
          field: '',
          sortable: false,
          align: 'center',
          children: [
            {
              title: '区划名称',
              field: 'mofDivName',
              sortable: false,
              align: 'center'
            },
            {
              title: '进度',
              field: 'amountPayPro',
              sortable: false,
              align: 'center',
              formatter: ({ row }) => {
                return row.amountPayPro ? `${row.amountPayPro}%` : '0%'
              }
            }
          ]
        },
        {
          title: '预警数据处理率',
          field: '',
          sortable: false,
          align: 'center',
          children: [
            {
              title: '区划名称',
              field: 'mofDivName',
              sortable: false,
              align: 'center'
            },
            {
              title: '进度',
              field: 'rankProcess',
              sortable: false,
              align: 'center',
              formatter: ({ row }) => {
                return row.rankProcess ? `${row.rankProcess}%` : '0%'
              }
            }
          ]
        }
      ],
      tableColumnsConfig3: [
        {
          title: '名次',
          type: 'seq',
          sortable: false,
          align: 'center'
        },
        {
          title: '地区名称',
          field: 'mofDivName',
          sortable: false,
          align: 'center'
        },
        {
          title: '预警数据处理率',
          field: 'rankProcess',
          sortable: false,
          align: 'center',
          formatter: ({ row }) => {
            return row.rankProcess ? `${row.rankProcess}%` : '0%'
          }
        },
        {
          title: '问询处理率',
          field: 'rankAskProcess',
          sortable: false,
          align: 'center',
          formatter: ({ row }) => {
            return row.rankAskProcess ? `${row.rankAskProcess}%` : '0%'
          }
        }
      ]
    }
  }
})
</script>

<style lang='scss' scoped>
@import "../../px-to-vw-page/common/style/module-wrapper";
@import "../../px-to-vw-page/common/style/vxe-table-style";
.warning-overview {
  overflow-x:scroll;
  .addParentBox{
    width:1346px;
    overflow-x:scroll;
  }
  padding: 0 24px 24px;
  box-sizing: border-box;
  .warning-overview-body {
    // min-width: 1872px;
    margin: 0 auto;
  }
  &-header {
    padding: 12px 0 10px;
    font-size: 22px;
    color: #595959;
    line-height: 34px;
    font-weight: bold;
    text-align: center;
  }
}
.rule-swiper-title {
  padding: 16px 22px;
  font-size: 16px;
  color: #595959;
  //line-height: 26px;
  font-weight: bold;
  box-sizing: border-box;
}
.font-style{
  font-weight: bold;
  font-size: 20px;
}
.width1{
  height: 200px;
  width: 30%;
  display: inline-block;
}
.width2{
  height: 200px;
  width: 35%;
  display: inline-block;
}
.width3{
  height: 200px;
  width: 25%;
  display: inline-block;
}
.color1{
  background-color: #FBE4D9FF;
}
.color2{
  background-color: #f8cece;
}
.color3{
  background-color: #bafaf9;
}
.warning-overview-top {
  display: flex;
  height: 614px;

  .rule-container {
    width: 538px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-right: 10px;

    .rule-use-wrapper,
    .rule-scroll-wrapper{
      flex-shrink: 0;
      width: 538px;
      height: 266px;
      background: #fff;
    }

    .rule-scroll-wrapper {
      height: 298px;
    }
  }

  .map-and-menu {
    // display: flex;
    width: 1346px;
  }
}

.warning-overview-bottom {
  display: flex;
  margin-top: 16px;

  .do-info,
  .warning-data {
    height: 298px;
    width:100%;

  }
  .do-info {
    margin-right: 16px;
  }
}
</style>
<style>
.warning-overview {
--font-family-hyt: 站酷庆科黄油体;
}
</style>
