<template>
  <div class="modelu-wrapper">
    <ModuleTitle title="社会保险情况" />
    <div
      class="module-table-container"
    >
      <!-- 城乡居民养老保险基金 -->
      <CommonTable
        :table-props="tableProps"
        :columns="socialSecurityColumn"
        :data="cityEndowmentInsuranceData"
      >
        <template #title>
          <div class="table-title">城乡居民养老保险基金</div>
        </template>
      </CommonTable>
      <!-- 城乡居民医疗保险基金 -->
      <CommonTable
        :table-props="tableProps"
        :columns="socialSecurityColumn"
        :data="cityMedicalInsuranceData"
      >
        <template #title>
          <div class="table-title">城乡居民医疗保险基金</div>
        </template>
      </CommonTable>
      <!-- 职工养老保险基金 -->
      <CommonTable
        :table-props="tableProps"
        :columns="socialSecurityColumn"
        :data="staffEndowmentInsuranceData"
      >
        <template #title>
          <div class="table-title">职工养老保险基金</div>
        </template>
      </CommonTable>
      <!-- 机关事业单位养老保险基金 -->
      <CommonTable
        :table-props="tableProps"
        :columns="socialSecurityColumn"
        :data="publicInstitutionEndowmentInsuranceData"
      >
        <template #title>
          <div class="table-title">机关事业单位养老保险基金</div>
        </template>
      </CommonTable>
      <!-- 社会保险基金预算 -->
      <CommonTable
        :table-props="tableProps"
        :columns="socialSecurityBudgetColumn"
        :data="endowmentInsuranceBudgetData"
      >
        <template #title>
          <div class="table-title">社会保险基金预算</div>
        </template>
      </CommonTable>
      <div class="chart-wrapper-debt-info">
        <CommonModultContainer title="社会保险基金预算">
          <div class="module-chart-container">
            <div
              v-for="(item, key) in budgetGaugeChartOption"
              :key="key"
              class="chart-wrapper"
            >
              <BarChart1
                :option="item"
              />
            </div>
          </div>
        </CommonModultContainer>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import CommonModultContainer from './CommonModultContainer'
import BarChart1 from './BarChart1'
import DetailTitle from './DetailTitle'
import ModuleTitle from './ModuleTitle'
import CommonTable from './CommonTable'

import { socialSecurityColumn, tableProps, socialSecurityBudgetColumn } from '../model/data'
import { useSocialSecurityTable } from '../hooks/useSocialSecurityTable'
import { useBudgetGaugeChart } from '../hooks/useBudgetGaugeChart'

export default defineComponent({
  components: {
    CommonModultContainer,
    BarChart1,
    ModuleTitle,
    CommonTable,
    DetailTitle
  },
  setup() {
    const {
      cityEndowmentInsuranceData,
      cityMedicalInsuranceData,
      staffEndowmentInsuranceData,
      publicInstitutionEndowmentInsuranceData,
      endowmentInsuranceBudgetData
    } = useSocialSecurityTable()
    const { budgetGaugeChartOption } = useBudgetGaugeChart()
    return {
      tableProps: tableProps(),
      socialSecurityColumn: socialSecurityColumn(),
      socialSecurityBudgetColumn: socialSecurityBudgetColumn(),
      cityEndowmentInsuranceData,
      cityMedicalInsuranceData,
      staffEndowmentInsuranceData,
      publicInstitutionEndowmentInsuranceData,
      endowmentInsuranceBudgetData,
      budgetGaugeChartOption
    }
  }
})
</script>

<style lang="scss" scoped>
.chart-wrapper-debt-info {
  width: 100%;
  padding: 16px 0 0 16px;
  margin-bottom: 16px;
  background: #fff;
  box-sizing: border-box;
}
.module-chart-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.module-table-container {

  .table-title {
    padding: 16px 16px 8px 16px;
    font-size: 14px;
    color: #666666;
    text-align: left;
    line-height: 24px;
    font-weight: 500;
    box-sizing: border-box;
    background: #fff;
  }
}
.chart-wrapper {
  display: flex;
  flex-shrink: 0;
  width: 240px;
  height: 253px;
  margin: 0 16px 16px 0;
  background: #FFFFFF;
  border: 1px solid rgba(236,236,236,1);
  border-radius: 2px;
  box-sizing: border-box;
}
</style>
