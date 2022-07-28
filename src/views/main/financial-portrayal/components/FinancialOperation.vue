<template>
  <div class="modelu-wrapper">
    <ModuleTitle title="财政运行情况" data-title="财政运行情况" class="nav-child" />
    <FinancialXmind />
    <div class="chart-wrapper-debt-info">
      <div class="financial-module-wrapper">
        <CommonModultContainer title="财政收入稳健指数" data-title="财政收入稳健指数" class="nav-child container-base financial-income">
          <div class="module-chart-container">
            <!-- 财政收入稳健指数 -->
            <div class="financial-soundness-chart-wrapper" style="width: 817px;">
              <div
                v-for="(item, key) in financialSoundnessGaugeChartOption"
                :key="key"
                style="width: 188px; height: 208px"
                class="chart-wrapper"
              >
                <BarChart1
                  :option="item"
                  chart-width="180px"
                  chart-height="202px"
                />
              </div>
            </div>
          </div>
        </CommonModultContainer>
        <CommonModultContainer title="财政支出结构指数" data-title="财政支出结构指数" class="nav-child container-base">
          <div class="module-chart-container fiscal-expend-chart-container" style="width: 770px;">
            <!-- 财政支出结构指数 -->
            <div class="fiscal-expend-chart-wrapper">
              <div
                v-for="(item, key) in fiscalExpendLiquidFill"
                :key="key"
                style="width: 242px; height: 208px"
                class="chart-wrapper"
              >
                <BarChart1
                  :option="item"
                />
              </div>
            </div>
            <div class="fiscal-expend-chart-wrapper">
              <div
                v-for="(item, key) in fiscalExpendGauge"
                :key="key"
                style="width: 370px; height: 208px"
                class="chart-wrapper"
              >
                <BarChart1
                  :option="item"
                />
              </div>
            </div>
          </div>
        </CommonModultContainer>
      </div>
      <CommonModultContainer title="预算管理" data-title="预算管理" class="nav-child container-base" style="margin-bottom: 16px; padding-bottom: 16px;">
        <div>
          <div class="module-chart-container flex-center-between">
            <!-- 一般预算公共收入 -->
            <div class="chart-wrapper" style="width: 389px; height: 344px; position: relative">
              <BarChart1 :option="publicBudgetIncomeChartOption" />
              <div class="budget-amount-container">
                <Amount
                  :option="amountList"
                />
                <LastAmount :option="LastAmountList" />
              </div>
              <LastAmount :option="AdjustList" />
            </div>
            <!-- 一般预算公共支出 -->
            <div class="chart-wrapper" style="width: 389px; height: 344px; position: relative">
              <BarChart1 :option="publicBudgetExpendChartOption" />
              <div class="budget-amount-container">
                <Amount
                  :option="amountList"
                />
                <LastAmount :option="LastAmountList" />
              </div>
              <LastAmount :option="AdjustList" />
            </div>
            <!-- 政府性基金预算收入 -->
            <div class="chart-wrapper" style="width: 389px; height: 344px; position: relative">
              <BarChart1 :option="governmentBudgetIncomeChartOption" />
              <div class="budget-amount-container">
                <div>
                  <Amount
                    :option="amountList"
                  />
                </div>
                <div style="margin-top: 60px">
                  <LastAmount :option="GovernmentAdjust1" style="margin-bottom: 8px" />
                  <LastAmount :option="GovernmentAdjust2" style="margin-bottom: 8px" />
                  <LastAmount :option="GovernmentAdjust3" />
                </div>
              </div>
            </div>
            <!-- 政府性基金预算支出 -->
            <div class="chart-wrapper" style="width: 389px; height: 344px; position: relative">
              <BarChart1 :option="governmentBudgetExpendChartOption" />
              <div class="budget-amount-container">
                <div>
                  <Amount
                    :option="amountList"
                  />
                </div>
                <div style="margin-top: 60px">
                  <LastAmount :option="GovernmentPayAdjust1" style="margin-bottom: 8px" />
                  <LastAmount :option="GovernmentPayAdjust2" style="margin-bottom: 8px" />
                  <LastAmount :option="GovernmentPayAdjust3" />
                </div>
              </div>
            </div>
          </div>
          <div class="budget-amount-bottom">
            <!-- 暂付款 -->
            <div class="budget-manage-bottom-left">
              <CommonTable
                :columns="suspensePaymentColumn"
                :data="budgetManageTableData"
                :wrapper-style="{ marginBottom: 0 }"
              >
                <template #title>
                  <DetailTitle title="暂付款" :show-dot="true" style="margin: 16px 0 10px 16px" />
                </template>
              </CommonTable>
            </div>
            <div class="budget-manage-bottom-right">
              <DetailTitle title="月度库款保障水平平均数" :show-dot="true" style="marginBottom: 25px" />
              <SpecificNumber :value-wrapper-style="{ marginBottom: '14px' }" />
            </div>
          </div>
        </div>
      </CommonModultContainer>
      <CommonModultContainer title="财政保障指数" data-title="财政保障指数" class="nav-child container-base" style="padding-bottom: 16px;">
        <div class="module-chart-container">
          <div class="flex-center">
            <!-- 刚性支出额 -->
            <div class="chart-wrapper" style="width: 840px; height: 394px">
              <BarChart1
                :option="rigidExpenditureLineChart"
              />
            </div>
            <!-- 财政供养人员 -->
            <div class="chart-wrapper" style="width: 750px; height: 394px">
              <BarChart1
                :option="financialSupportBarChart"
              />
            </div>
          </div>
          <div class="flex-center">
            <!-- 三保支出 -->
            <div class="financial-bottom financial-bottom-left">
              <div class="chart-wrapper" style="width: 594px; height: 234px">
                <BarChart1
                  :option="threeInsuranceExpendTopOption"
                />
              </div>
              <div class="flex-center-between">
                <div class="chart-wrapper" style="width: 188px; height: 234px; marginRight: 0;">
                  <span class="chart-monery">45,128,391.42</span>
                  <BarChart1
                    :option="threeInsuranceExpendBottomOption.left"
                  />
                </div>
                <div class="chart-wrapper" style="width: 188px; height: 234px; marginRight: 0;">
                  <span class="chart-monery">45,128,391.42</span>
                  <BarChart1
                    :option="threeInsuranceExpendBottomOption.center"
                  />
                </div>
                <div class="chart-wrapper" style="width: 188px; height: 234px; marginRight: 0;">
                  <span class="chart-monery">45,128,391.42</span>
                  <BarChart1
                    :option="threeInsuranceExpendBottomOption.right"
                  />
                </div>
              </div>
            </div>
            <div class="financial-bottom financial-bottom-center">
              <!-- 时序图 -->
              <div class="time-sque-chart-top">
                <TimeSequenceChart />
              </div>
              <div class="chart-wrapper" style="width: 490px; height: 484px;">
                <BarChart1
                  :option="threeInsuranceExpendTimeSqueOption"
                />
              </div>
            </div>
            <div class="financial-bottom financial-bottom-right">
              <div class="chart-wrapper" style="width: 490px; height: 484px;">
                <BarChart1
                  :option="maintenanceExpenditureOption"
                />
                <div class="financial-bottom-right-bottom">
                  <DepositsAmount />
                </div>
              </div>
            </div>
          </div>
        </div>
      </CommonModultContainer>
      <CommonModultContainer title="直达资金" data-title="直达资金" class="nav-child container-base">
        <div class="module-chart-container">
          <!-- 上级下达 -->
          <div class="chart-wrapper" style="width: 388px; height: 256px;">
            <BarChart1
              :option="directFundsBarChart"
            />
          </div>
          <!-- 分配进度 -->
          <div class="chart-wrapper" style="width: 388px; height: 256px;">
            <BarChart1
              :option="distributeScheduleBarChart"
            />
          </div>
          <div class="chart-wrapper" style="width: 388px; height: 256px;">
            <BarChart1
              :option="expenditureAmountBarChart"
            />
          </div>
          <div class="chart-wrapper" style="width: 388px; height: 256px;">
            <BarChart1
              :option="expenditureScheduleBarChart"
            />
          </div>
        </div>
      </CommonModultContainer>
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import FinancialXmind from './FinancialXmind.vue'
import ModuleTitle from './ModuleTitle.vue'
import BarChart1 from './BarChart1.vue'
import Amount from './Amount .vue'
import LastAmount from './LastAmount.vue'
import CommonModultContainer from './CommonModultContainer.vue'
import CommonTable from './CommonTable.vue'
import DetailTitle from './DetailTitle.vue'
import SpecificNumber from './SpecificNumber.vue'
import CommonChartContainer from './CommonChartContainer'
import PolarBarChart from './PolarBarChart'
import TimeSequenceChart from './TimeSequenceChart'
import DepositsAmount from './DepositsAmount'

import { suspensePaymentColumn } from '../model/data'
import { useDirectFundsBarChart } from '../hooks/useDirectFundsBarChart'
import { useDistributeScheduleBarChart } from '../hooks/useDistributeScheduleBarChart'
import { useExpenditureAmountBarChart } from '../hooks/useExpenditureAmountBarChart'
import { useExpenditureScheduleBarChart } from '../hooks/useExpenditureScheduleBarChart'
import { useRigidExpenditureLineChart } from '../hooks/useRigidExpenditureLineChart'
import { useFinancialSupportBarChart } from '../hooks/useFinancialSupportBarChart'
import { useGdpBudgetBarChart } from '../hooks/useGdpBudgetBarChart'
import { useFinancialSoundnessGaugeChart } from '../hooks/useFinancialSoundnessGaugeChart'
import { useFiscalExpendSteady } from '../hooks/useFiscalExpendSteady'
import { useBudgetManageBottom } from '../hooks/useBudgetManageBottom'
import { useImplementateChart } from '../hooks/useImplementateChart'
import { useImplementatePayChart } from '../hooks/useImplementatePayChart'
import { useThreeInsuranceExpend } from '../hooks/useThreeInsuranceExpend'
export default defineComponent({
  components: {
    ModuleTitle,
    CommonModultContainer,
    CommonChartContainer,
    BarChart1,
    PolarBarChart,
    Amount,
    LastAmount,
    CommonTable,
    DetailTitle,
    SpecificNumber,
    FinancialXmind,
    TimeSequenceChart,
    DepositsAmount
  },
  setup() {
    const { directFundsBarChart } = useDirectFundsBarChart()
    const { distributeScheduleBarChart } = useDistributeScheduleBarChart()
    const { expenditureAmountBarChart } = useExpenditureAmountBarChart()
    const { expenditureScheduleBarChart } = useExpenditureScheduleBarChart()
    const { rigidExpenditureLineChart } = useRigidExpenditureLineChart()
    const { financialSupportBarChart } = useFinancialSupportBarChart()
    const { financialSoundnessGaugeChartOption } = useFinancialSoundnessGaugeChart()
    const { fiscalExpendLiquidFill, fiscalExpendGauge } = useFiscalExpendSteady()
    const { budgetManageTableData } = useBudgetManageBottom()
    const {
      amountList,
      LastAmountList,
      AdjustList,
      GovernmentAdjust1,
      GovernmentAdjust2,
      GovernmentAdjust3,
      GovernmentPayAdjust1,
      GovernmentPayAdjust2,
      GovernmentPayAdjust3 } = useGdpBudgetBarChart()
    const {
      publicBudgetIncomeChartOption,
      publicBudgetExpendChartOption,
      governmentBudgetIncomeChartOption,
      governmentBudgetExpendChartOption
    } = useImplementateChart()
    const { ImplementatePayCommonChartOption, ImplementatePayCurrentChartOption, ImplementatePayLastChartOption } = useImplementatePayChart()
    const {
      threeInsuranceExpendTopOption,
      threeInsuranceExpendBottomOption,
      threeInsuranceExpendTimeSqueOption,
      maintenanceExpenditureOption
    } = useThreeInsuranceExpend()
    return {
      financialSoundnessGaugeChartOption,
      fiscalExpendLiquidFill,
      fiscalExpendGauge,
      suspensePaymentColumn: suspensePaymentColumn(),
      budgetManageTableData,
      directFundsBarChart,
      distributeScheduleBarChart,
      expenditureAmountBarChart,
      expenditureScheduleBarChart,
      rigidExpenditureLineChart,
      financialSupportBarChart,
      amountList,
      LastAmountList,
      AdjustList,
      GovernmentAdjust1,
      GovernmentAdjust2,
      GovernmentAdjust3,
      GovernmentPayAdjust1,
      GovernmentPayAdjust2,
      GovernmentPayAdjust3,
      publicBudgetIncomeChartOption,
      ImplementatePayCommonChartOption,
      ImplementatePayCurrentChartOption,
      ImplementatePayLastChartOption,
      threeInsuranceExpendTopOption,
      threeInsuranceExpendBottomOption,
      publicBudgetExpendChartOption,
      governmentBudgetIncomeChartOption,
      governmentBudgetExpendChartOption,
      threeInsuranceExpendTimeSqueOption,
      maintenanceExpenditureOption
    }
  }
})
</script>

<style lang="scss" scoped>
.flex-center {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}

.flex-center-between {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-between;
}

.financial-soundness-chart-wrapper {
  display: flex;
  flex-wrap: wrap;
  width: 833px;
}

.financial-module-wrapper {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;

  .financial-income {
    margin-right: 16px;
  }
}

.container-base {
  background: #FFFFFF;
  border: 1px solid rgba(236, 236, 236, 1);
  border-radius: 2px;
  padding: 16px 0 0 16px;
  margin-bottom: 16px;
  box-sizing: border-box;
}

.fiscal-expend-chart-wrapper {
  display: flex;
  flex-wrap: wrap;
  width: 802px;
}
.module-chart-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.budget-amount-bottom {
  display: flex;
  width: 100%;

  .budget-manage-bottom-right {
    display: inline-block;
    width: 392px;
    flex-shrink: 0;
    margin: 0 16px;
    background: #FFFFFF;
    border: 1px solid rgba(236, 236, 236, 1);
    border-radius: 2px;
    padding: 16px;
    box-sizing: border-box;
  }

  .budget-manage-bottom-left {
    flex: 1;
    overflow:hidden;
    background: #FFFFFF;
    border: 1px solid rgba(236, 236, 236, 1);
    border-radius: 2px;
    box-sizing: border-box;
  }
}

.fiscal-expend-chart-container {
  display: block;
}

.chart-wrapper {
  position: relative;
  display: flex;
  flex-shrink: 0;
  width: 394px;
  height: 258px;
  margin: 0 16px 16px 0;
  background: #FFFFFF;
  border: 1px solid rgba(236, 236, 236, 1);
  border-radius: 2px;
  box-sizing: border-box;
  overflow: hidden;

  &.time-spe-chart-wrapper {
  }

  .chart-monery{
    position: absolute;
    top: 60px;
    left: 0;
    width: 100%;
    font-size: 20px;
    font-family: var(--font-family-hyt);
    color: #E86452;
    text-align: center;
    line-height: 24px;
    z-index: 5;
  }
}
.chart-wrapper-debt-info {
  width: 100%;
  box-sizing: border-box;
}
.budget-amount-container {
  position: absolute;
  top: 45px;
  left: 17px;
  right: 17px;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
}

.unemployment-rate-container {
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin-top: 110px;
  }
.government-rate-container {
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin-top: 60px;
}

.financial-bottom-left {
  width: 590px;
}

.financial-bottom-center,
.financial-bottom-right {
  position: relative;
  width: 490px;
  height: 484px;
  .time-sque-chart-top {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 5;
  }

  .financial-bottom-right-bottom {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 16px;
    box-sizing: border-box;
    z-index: 5;
  }
}

.financial-bottom {
  height: 484px;
  margin-right: 16px;
}
</style>
