<!-- 监控事项批复 -->
<template>
  <div v-loading="tableLoading" style="height: 100%">
    <BsMainFormListLayout :left-visible.sync="leftTreeVisible">
      <template v-slot:topTap></template>
      <template v-slot:topTabPane>
        <BsTabPanel
          ref="tabPanel"
          :is-open="isShowQueryConditions"
          :tab-status-btn-config="toolBarStatusBtnConfig"
          :tab-status-num-config="false"
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
      <!-- leftVisible不为undefined为渲染mainTree和mainForm插槽 ，否则渲染mainCon插槽-->
      <template v-slot:mainTree>
        <BsTreeSet
          ref="treeSet"
          v-model="leftTreeVisible"
          :tree-config="treeTypeConfig"
          @onChangeInput="changeInput"
          @onAsideChange="asideChange"
          @onConfrimData="treeSetConfrimData"
        />
        <BsTree
          ref="leftTree"
          open-loading
          :config="leftTreeConfig"
          :tree-data="treeData"
          @onNodeClick="onClickmethod"
        />
      </template>
      <template v-slot:mainForm>
        <div style="width:100%;height:45px;float:left;">
          <div v-if="leftTreeVisible === false" class="table-toolbar-contro-leftvisible" @click="leftTreeVisible = true"></div>
          <div v-for="(item,index) in tabbtn" :key="index" class="setbtn">
            <div :id="index" class="tabone" :class="activeIndex === index ? 'tabone1' : ''" @click="tabClick(index)">
              {{ item }}
            </div>
          </div>
          <div class="title">
            <p v-show="basicTable" style="marginLeft:150px;font-weight:700">{{ provinceName }}财政运行基础情况表<span style="color:red;font-size:12px">{{ hint }}</span></p>
            <p v-show="targetTable" style="marginLeft:150px;font-weight:700">{{ provinceName }}财政运行分析表</p>
          </div>
          <!--基础表-->
          <div v-show="basicTable" id="printDiv1" class="payVoucherInput" style="margin-top:50px;">
            <div class="body" style="font-size:16px;height:430px;overflow:auto;">
              <table class="basicTable">
                <tbody style="backgroundColor:#c6e0b4">
                  <tr>
                    <td rowspan="80" valign="top" style="font-weight:600;textAlign:center;paddingTop:10px;width:15%">一、综合类指标</td>
                    <td rowspan="2" style="font-weight:600;width:20%">1.户籍人口（万人）</td>
                    <td class="period" style="width:15%">上年同期</td>
                    <td style="width:50%"><el-input v-model="datas.registeredResidencePeriod" :disabled="disabled" /></td>
                  </tr>
                  <tr>
                    <td class="period">本&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期</td>
                    <td><el-input v-model="datas.registeredResidence" :disabled="disabled" /></td>
                  </tr>
                  <tr>
                    <td rowspan="2" style="font-weight:600">2.常住人口（万人）</td>
                    <td class="period">上年同期</td>
                    <td><el-input v-model="datas.residentPopulationPeriod" :disabled="disabled" /></td>
                  </tr>
                  <tr>
                    <td class="period">本&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期</td>
                    <td><el-input v-model="datas.residentPopulation" :disabled="disabled" /></td>
                  </tr>
                  <tr>
                    <td rowspan="2" style="font-weight:600">3.国民生产总值（亿元）和增速</td>
                    <td class="period"></td>
                    <td><el-input :disabled="true" /></td>
                  </tr>
                  <tr>
                    <td class="period"></td>
                    <td><el-input :disabled="true" /></td>
                  </tr>
                  <tr style="backgroundColor:#e2efda">
                    <td rowspan="2" style="padding-left:20px;">3.1 第一产业</td>
                    <td class="period">上年同期</td>
                    <td><el-input v-model="datas.gdpFirstPeriod" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#e2efda">
                    <td class="period">本&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期</td>
                    <td><el-input v-model="datas.gdpFirst" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#e2efda">
                    <td rowspan="2" style="padding-left:20px;">3.2 第二产业</td>
                    <td class="period">上年同期</td>
                    <td><el-input v-model="datas.gdpSecondPeriod" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#e2efda">
                    <td class="period">本&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期</td>
                    <td><el-input v-model="datas.gdpSecond" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#e2efda">
                    <td rowspan="2" style="padding-left:20px;">3.3 第三产业</td>
                    <td class="period">上年同期</td>
                    <td><el-input v-model="datas.gdpThirdPeriod" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#e2efda">
                    <td class="period">本&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期</td>
                    <td><el-input v-model="datas.gdpThird" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#e2efda">
                    <td rowspan="2" style="padding-left:20px;">3.4 国内生产总值增速（%）</td>
                    <td class="period">上年同期</td>
                    <td><el-input v-model="datas.gdpGrowthPeriod" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#e2efda">
                    <td class="period">本&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期</td>
                    <td><el-input v-model="datas.gdpGrowth" :disabled="disabled" /></td>
                  </tr>
                  <tr>
                    <td rowspan="2" style="font-weight:600">4.工业增加值（亿元）</td>
                    <td class="period"></td>
                    <td><el-input :disabled="true" /></td>
                  </tr>
                  <tr>
                    <td class="period"></td>
                    <td><el-input :disabled="true" /></td>
                  </tr>
                  <tr style="backgroundColor:#e2efda">
                    <td rowspan="2" style="padding-left:20px;">4.1 规上工业增加值</td>
                    <td class="period">上年同期</td>
                    <td><el-input v-model="datas.industrialOutputPeriod" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#e2efda">
                    <td class="period">本&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期</td>
                    <td><el-input v-model="datas.industrialOutput" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#e2efda">
                    <td rowspan="2" style="padding-left:20px;">4.2 战略性新兴产业增加值</td>
                    <td class="period">上年同期</td>
                    <td><el-input v-model="datas.risingOutputPeriod" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#e2efda">
                    <td class="period">本&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期</td>
                    <td><el-input v-model="datas.risingOutput" :disabled="disabled" /></td>
                  </tr>
                  <tr>
                    <td rowspan="2" style="font-weight:600">5.主要行业增加值（填写当地前三位经济支柱行业）</td>
                    <td class="period"></td>
                    <td><el-input :disabled="true" /></td>
                  </tr>
                  <tr>
                    <td class="period"></td>
                    <td><el-input :disabled="true" /></td>
                  </tr>
                  <tr style="backgroundColor:#e2efda">
                    <td rowspan="2" style="padding-left:20px;">5.1 煤炭开采和洗选业</td>
                    <td class="period">上年同期</td>
                    <td><el-input v-model="datas.coalMiningPeriod" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#e2efda">
                    <td class="period">本&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期</td>
                    <td><el-input v-model="datas.coalMining" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#e2efda">
                    <td rowspan="2" style="padding-left:20px;">5.2 石油和天然气开采业</td>
                    <td class="period">上年同期</td>
                    <td><el-input v-model="datas.oilGasExtractionPeriod" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#e2efda">
                    <td class="period">本&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期</td>
                    <td><el-input v-model="datas.oilGasExtraction" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#e2efda">
                    <td rowspan="2" style="padding-left:20px;">5.3 装备制造业</td>
                    <td class="period">上年同期</td>
                    <td><el-input v-model="datas.equipmentManufacturingPeriod" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#e2efda">
                    <td class="period">本&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期</td>
                    <td><el-input v-model="datas.equipmentManufacturing" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#e2efda">
                    <td rowspan="2" style="padding-left:20px;">5.4 不在上述行业的经济支柱行业，自行添加</td>
                    <td class="period">上年同期</td>
                    <td><el-input v-model="datas.otherIndustryPeriod" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#e2efda">
                    <td class="period">本&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期</td>
                    <td><el-input v-model="datas.otherIndustry" :disabled="disabled" /></td>
                  </tr>
                  <tr>
                    <td rowspan="2" style="font-weight:600">6.固定资产投资增速（%）和增加额（亿元）</td>
                    <td class="period"></td>
                    <td><el-input :disabled="true" /></td>
                  </tr>
                  <tr>
                    <td class="period"></td>
                    <td><el-input :disabled="true" /></td>
                  </tr>
                  <tr style="backgroundColor:#e2efda">
                    <td rowspan="2" style="padding-left:20px;">6.1 第一产业增速</td>
                    <td class="period">上年同期</td>
                    <td><el-input v-model="datas.fixedAssetsFirstGrowthPeriod" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#e2efda">
                    <td class="period">本&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期</td>
                    <td><el-input v-model="datas.fixedAssetsFirstGrowth" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#e2efda">
                    <td rowspan="2" style="padding-left:20px;">6.2 第二产业增速</td>
                    <td class="period">上年同期</td>
                    <td><el-input v-model="datas.fixedAssetsSecondGrowthPeriod" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#e2efda">
                    <td class="period">本&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期</td>
                    <td><el-input v-model="datas.fixedAssetsSecondGrowth" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#e2efda">
                    <td rowspan="2" style="padding-left:20px;">6.3 第三产业增速</td>
                    <td class="period">上年同期</td>
                    <td><el-input v-model="datas.fixedAssetsThirdGrowthPeriod" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#e2efda">
                    <td class="period">本&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期</td>
                    <td><el-input v-model="datas.fixedAssetsThirdGrowth" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#e2efda">
                    <td rowspan="2" style="padding-left:20px;">6.4 基础设施投资增速</td>
                    <td class="period">上年同期</td>
                    <td><el-input v-model="datas.fixedAssetsInfrastructureGrowthPeriod" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#e2efda">
                    <td class="period">本&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期</td>
                    <td><el-input v-model="datas.fixedAssetsInfrastructureGrowth" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#e2efda">
                    <td rowspan="2" style="padding-left:20px;">6.5 民间投资增速</td>
                    <td class="period">上年同期</td>
                    <td><el-input v-model="datas.fixedAssetsPrivateInvestmentGrowthPeriod" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#e2efda">
                    <td class="period">本&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期</td>
                    <td><el-input v-model="datas.fixedAssetsPrivateInvestmentGrowth" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#e2efda">
                    <td rowspan="2" style="padding-left:20px;">6.6 房地产开发投资增速</td>
                    <td class="period">上年同期</td>
                    <td><el-input v-model="datas.fixedAssetsRealEstateGrowthPeriod" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#e2efda">
                    <td class="period">本&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期</td>
                    <td><el-input v-model="datas.fixedAssetsRealEstateGrowth" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#e2efda">
                    <td rowspan="2" style="padding-left:20px;">6.7 第一产业增加额</td>
                    <td class="period">上年同期</td>
                    <td><el-input v-model="datas.fixedAssetsFirstPeriod" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#e2efda">
                    <td class="period">本&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期</td>
                    <td><el-input v-model="datas.fixedAssetsFirst" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#e2efda">
                    <td rowspan="2" style="padding-left:20px;">6.8 第二产业增加额</td>
                    <td class="period">上年同期</td>
                    <td><el-input v-model="datas.fixedAssetsSecondPeriod" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#e2efda">
                    <td class="period">本&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期</td>
                    <td><el-input v-model="datas.fixedAssetsSecond" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#e2efda">
                    <td rowspan="2" style="padding-left:20px;">6.9 第三产业增加额</td>
                    <td class="period">上年同期</td>
                    <td><el-input v-model="datas.fixedAssetsThirdPeriod" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#e2efda">
                    <td class="period">本&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期</td>
                    <td><el-input v-model="datas.fixedAssetsThird" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#e2efda">
                    <td rowspan="2" style="padding-left:20px;">6.10 基础设施投资增加额</td>
                    <td class="period">上年同期</td>
                    <td><el-input v-model="datas.fixedAssetsInfrastructurePeriod" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#e2efda">
                    <td class="period">本&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期</td>
                    <td><el-input v-model="datas.fixedAssetsInfrastructure" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#e2efda">
                    <td rowspan="2" style="padding-left:20px;">6.11 民间投资增加额</td>
                    <td class="period">上年同期</td>
                    <td><el-input v-model="datas.fixedAssetsPrivateInvestmentPeriod" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#e2efda">
                    <td class="period">本&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期</td>
                    <td><el-input v-model="datas.fixedAssetsPrivateInvestment" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#e2efda">
                    <td rowspan="2" style="padding-left:20px;">6.12 房地产开发投资增加额</td>
                    <td class="period">上年同期</td>
                    <td><el-input v-model="datas.fixedAssetsRealEstatePeriod" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#e2efda">
                    <td class="period">本&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期</td>
                    <td><el-input v-model="datas.fixedAssetsRealEstate" :disabled="disabled" /></td>
                  </tr>
                  <tr>
                    <td rowspan="2" style="font-weight:600">7.社会消费品零售总额（亿元）</td>
                    <td class="period">上年同期</td>
                    <td><el-input v-model="datas.retailTotalPeriod" :disabled="disabled" /></td>
                  </tr>
                  <tr>
                    <td class="period">本&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期</td>
                    <td><el-input v-model="datas.retailTotal" :disabled="disabled" /></td>
                  </tr>
                  <tr>
                    <td rowspan="2" style="font-weight:600">8.进出口总值（亿元）</td>
                    <td class="period"></td>
                    <td><el-input :disabled="true" /></td>
                  </tr>
                  <tr>
                    <td class="period"></td>
                    <td><el-input :disabled="true" /></td>
                  </tr>
                  <tr style="backgroundColor:#e2efda">
                    <td rowspan="2" style="padding-left:20px;">8.1 进口总值（亿元）</td>
                    <td class="period">上年同期</td>
                    <td><el-input v-model="datas.exportTotalPeriod" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#e2efda">
                    <td class="period">本&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期</td>
                    <td><el-input v-model="datas.exportTotal" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#e2efda">
                    <td rowspan="2" style="padding-left:20px;">8.2 出口总值（亿元）</td>
                    <td class="period">上年同期</td>
                    <td><el-input v-model="datas.importTotalPeriod" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#e2efda">
                    <td class="period">本&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期</td>
                    <td><el-input v-model="datas.importTotal" :disabled="disabled" /></td>
                  </tr>
                  <tr>
                    <td rowspan="2" style="font-weight:600">9.先行指标</td>
                    <td class="period"></td>
                    <td><el-input :disabled="true" /></td>
                  </tr>
                  <tr>
                    <td class="period"></td>
                    <td><el-input :disabled="true" /></td>
                  </tr>
                  <tr style="backgroundColor:#e2efda">
                    <td rowspan="2" style="padding-left:20px;">9.1 用电量（千瓦时）</td>
                    <td class="period">上年同期</td>
                    <td><el-input v-model="datas.electricityConsumptionPeriod" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#e2efda">
                    <td class="period">本&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期</td>
                    <td><el-input v-model="datas.electricityConsumption" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#e2efda">
                    <td rowspan="2" style="padding-left:20px;">9.2 金融机构人民币存款余额（亿元）</td>
                    <td class="period">上年同期</td>
                    <td><el-input v-model="datas.depositBalancePeriod" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#e2efda">
                    <td class="period">本&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期</td>
                    <td><el-input v-model="datas.depositBalance" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#e2efda">
                    <td rowspan="2" style="padding-left:20px;">9.3 金融机构人民币贷款余额（亿元）</td>
                    <td class="period">上年同期</td>
                    <td><el-input v-model="datas.loanBalancePeriod" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#e2efda">
                    <td class="period">本&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期</td>
                    <td><el-input v-model="datas.loanBalance" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#e2efda">
                    <td rowspan="2" style="padding-left:20px;">9.4 采购经理指数MPI（%）</td>
                    <td class="period">上年同期</td>
                    <td><el-input v-model="datas.pmiIndexPeriod" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#e2efda">
                    <td class="period">本&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期</td>
                    <td><el-input v-model="datas.pmiIndex" :disabled="disabled" /></td>
                  </tr>
                  <tr>
                    <td rowspan="2" style="font-weight:600">10.居民消费价格指数CPI（%）</td>
                    <td class="period">上年同期</td>
                    <td><el-input v-model="datas.cpiIndexPeriod" :disabled="disabled" /></td>
                  </tr>
                  <tr>
                    <td class="period">本&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期</td>
                    <td><el-input v-model="datas.cpiIndex" :disabled="disabled" /></td>
                  </tr>
                  <tr>
                    <td rowspan="2" style="font-weight:600">11.工业品出厂价格指数PPI（%）</td>
                    <td class="period">上年同期</td>
                    <td><el-input v-model="datas.ppiIndexPeriod" :disabled="disabled" /></td>
                  </tr>
                  <tr>
                    <td class="period">本&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期</td>
                    <td><el-input v-model="datas.ppiIndex" :disabled="disabled" /></td>
                  </tr>
                  <tr>
                    <td rowspan="2" style="font-weight:600">12.失业率</td>
                    <td class="period">上年同期</td>
                    <td><el-input v-model="datas.unemploymentRatePeriod" :disabled="disabled" /></td>
                  </tr>
                  <tr>
                    <td class="period">本&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期</td>
                    <td><el-input v-model="datas.unemploymentRate" :disabled="disabled" /></td>
                  </tr>
                </tbody>
                <tbody style="backgroundColor:#8497b0">
                  <tr>
                    <td rowspan="102" valign="top" style="font-weight:600;textAlign:center;paddingTop:10px">二、财政收入类指标</td>
                    <td rowspan="2" style="font-weight:600">1.一般公共预算</td>
                    <td class="period"></td>
                    <td style="width:20%"><el-input :disabled="true" /></td>
                  </tr>
                  <tr>
                    <td class="period"></td>
                    <td><el-input :disabled="true" /></td>
                  </tr>
                  <tr style="backgroundColor:#9bc2e6">
                    <td rowspan="2" style="font-weight:600;padding-left:20px;">1.1 一般公共预算收入</td>
                    <td class="period">上年同期</td>
                    <td><el-input v-model="datas.param1" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#9bc2e6">
                    <td class="period">本&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期</td>
                    <td><el-input v-model="datas.param2" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#bdd7ee">
                    <td rowspan="2" style="font-weight:600;padding-left:40px;">1.1.1 税收收入</td>
                    <td class="period">上年同期</td>
                    <td><el-input v-model="datas.param3" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#bdd7ee">
                    <td class="period">本&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期</td>
                    <td><el-input v-model="datas.param4" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#ddebf7">
                    <td rowspan="2" style="padding-left:60px;">1.1.1.1 增值税</td>
                    <td class="period">上年同期</td>
                    <td><el-input v-model="datas.param5" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#ddebf7">
                    <td class="period">本&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期</td>
                    <td><el-input v-model="datas.param6" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#ddebf7">
                    <td rowspan="2" style="padding-left:60px;">1.1.1.2 消费税</td>
                    <td class="period">上年同期</td>
                    <td><el-input v-model="datas.param7" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#ddebf7">
                    <td class="period">本&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期</td>
                    <td><el-input v-model="datas.param8" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#ddebf7">
                    <td rowspan="2" style="padding-left:60px;">1.1.1.3 企业所得税</td>
                    <td class="period">上年同期</td>
                    <td><el-input v-model="datas.param9" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#ddebf7">
                    <td class="period">本&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期</td>
                    <td><el-input v-model="datas.param10" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#ddebf7">
                    <td rowspan="2" style="padding-left:60px;">1.1.1.4 个人所得税</td>
                    <td class="period">上年同期</td>
                    <td><el-input v-model="datas.param11" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#ddebf7">
                    <td class="period">本&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期</td>
                    <td><el-input v-model="datas.param12" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#ddebf7">
                    <td rowspan="2" style="padding-left:60px;">1.1.1.5 资源税</td>
                    <td class="period">上年同期</td>
                    <td><el-input v-model="datas.param13" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#ddebf7">
                    <td class="period">本&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期</td>
                    <td><el-input v-model="datas.param14" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#ddebf7">
                    <td rowspan="2" style="padding-left:60px;">1.1.1.6 城镇土地使用税</td>
                    <td class="period">上年同期</td>
                    <td><el-input v-model="datas.param15" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#ddebf7">
                    <td class="period">本&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期</td>
                    <td><el-input v-model="datas.param16" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#ddebf7">
                    <td rowspan="2" style="padding-left:60px;">1.1.1.7 土地增值税</td>
                    <td class="period">上年同期</td>
                    <td><el-input v-model="datas.param17" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#ddebf7">
                    <td class="period">本&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期</td>
                    <td><el-input v-model="datas.param18" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#ddebf7">
                    <td rowspan="2" style="padding-left:60px;">1.1.1.8 城市维护建设税</td>
                    <td class="period">上年同期</td>
                    <td><el-input v-model="datas.param19" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#ddebf7">
                    <td class="period">本&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期</td>
                    <td><el-input v-model="datas.param20" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#ddebf7">
                    <td rowspan="2" style="padding-left:60px;">1.1.1.9 耕地占用税</td>
                    <td class="period">上年同期</td>
                    <td><el-input v-model="datas.param21" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#ddebf7">
                    <td class="period">本&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期</td>
                    <td><el-input v-model="datas.param22" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#ddebf7">
                    <td rowspan="2" style="padding-left:60px;">1.1.1.10 契税</td>
                    <td class="period">上年同期</td>
                    <td><el-input v-model="datas.param23" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#ddebf7">
                    <td class="period">本&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期</td>
                    <td><el-input v-model="datas.param24" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#bdd7ee">
                    <td rowspan="2" style="font-weight:600;padding-left:40px;">1.1.2 非税收入</td>
                    <td class="period">上年同期</td>
                    <td><el-input v-model="datas.param25" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#bdd7ee">
                    <td class="period">本&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期</td>
                    <td><el-input v-model="datas.param26" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#ddebf7">
                    <td rowspan="2" style="padding-left:60px;">1.1.2.1 专项收入</td>
                    <td class="period">上年同期</td>
                    <td><el-input v-model="datas.param27" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#ddebf7">
                    <td class="period">本&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期</td>
                    <td><el-input v-model="datas.param28" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#ddebf7">
                    <td rowspan="2" style="padding-left:60px;">1.1.2.2 行政事业性收费</td>
                    <td class="period">上年同期</td>
                    <td><el-input v-model="datas.param29" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#ddebf7">
                    <td class="period">本&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期</td>
                    <td><el-input v-model="datas.param30" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#ddebf7">
                    <td rowspan="2" style="padding-left:60px;">1.1.2.3 罚没收入</td>
                    <td class="period">上年同期</td>
                    <td><el-input v-model="datas.param31" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#ddebf7">
                    <td class="period">本&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期</td>
                    <td><el-input v-model="datas.param32" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#ddebf7">
                    <td rowspan="2" style="padding-left:60px;">1.1.2.4 国有资源（资产）有偿使用收入</td>
                    <td class="period">上年同期</td>
                    <td><el-input v-model="datas.param33" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#ddebf7">
                    <td class="period">本&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期</td>
                    <td><el-input v-model="datas.param34" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#ddebf7">
                    <td rowspan="2" style="padding-left:60px;">1.1.2.5 其他收入（就构成作简要说明，可自行增加）</td>
                    <td class="period">上年同期</td>
                    <td><el-input v-model="datas.param35" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#ddebf7">
                    <td class="period">本&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期</td>
                    <td><el-input v-model="datas.param36" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#9bc2e6">
                    <td rowspan="2" style="font-weight:600;padding-left:20px;">1.2 上级补助收入</td>
                    <td class="period">上年同期</td>
                    <td><el-input v-model="datas.param37" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#9bc2e6">
                    <td class="period">本&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期</td>
                    <td><el-input v-model="datas.param38" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#bdd7ee">
                    <td rowspan="2" style="padding-left:40px;">1.2.1 中央对该地区补助财政收入</td>
                    <td class="period">上年同期</td>
                    <td><el-input v-model="datas.param39" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#bdd7ee">
                    <td class="period">本&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期</td>
                    <td><el-input v-model="datas.param40" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#bdd7ee">
                    <td rowspan="2" style="padding-left:40px;">1.2.2 省以下对该地区补助财政收入</td>
                    <td class="period">上年同期</td>
                    <td><el-input v-model="datas.param41" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#bdd7ee">
                    <td class="period">本&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期</td>
                    <td><el-input v-model="datas.param42" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#9bc2e6">
                    <td rowspan="2" style="font-weight:600;padding-left:20px;">1.3 上年结转收入</td>
                    <td class="period">上年同期</td>
                    <td><el-input v-model="datas.param43" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#9bc2e6">
                    <td class="period">本&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期</td>
                    <td><el-input v-model="datas.param44" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#9bc2e6">
                    <td rowspan="2" style="font-weight:600;padding-left:20px;">1.4 调入资金</td>
                    <td class="period">上年同期</td>
                    <td><el-input v-model="datas.param45" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#9bc2e6">
                    <td class="period">本&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期</td>
                    <td><el-input v-model="datas.param46" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#bdd7ee">
                    <td rowspan="2" style="padding-left:40px;">1.4.1 政府性基金调入</td>
                    <td class="period">上年同期</td>
                    <td><el-input v-model="datas.param47" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#bdd7ee">
                    <td class="period">本&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期</td>
                    <td><el-input v-model="datas.param48" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#bdd7ee">
                    <td rowspan="2" style="padding-left:40px;">1.4.2 国有资本经营预算调入</td>
                    <td class="period">上年同期</td>
                    <td><el-input v-model="datas.param49" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#bdd7ee">
                    <td class="period">本&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期</td>
                    <td><el-input v-model="datas.param50" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#9bc2e6">
                    <td rowspan="2" style="font-weight:600;padding-left:20px;">1.5 债务（转贷）收入</td>
                    <td class="period">上年同期</td>
                    <td><el-input v-model="datas.param51" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#9bc2e6">
                    <td class="period">本&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期</td>
                    <td><el-input v-model="datas.param52" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#9bc2e6">
                    <td rowspan="2" style="font-weight:600;padding-left:20px;">1.6 调入预算稳定调节基金</td>
                    <td class="period">上年同期</td>
                    <td><el-input v-model="datas.param53" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#9bc2e6">
                    <td class="period">本&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期</td>
                    <td><el-input v-model="datas.param54" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#9bc2e6">
                    <td rowspan="2" style="font-weight:600;padding-left:20px;">1.7 财政总收入</td>
                    <td class="period">上年同期</td>
                    <td><el-input v-model="datas.param55" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#9bc2e6">
                    <td class="period">本&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期</td>
                    <td><el-input v-model="datas.param56" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#bdd7ee">
                    <td rowspan="2" style="padding-left:40px;">1.7.1 上划中央级收入</td>
                    <td class="period">上年同期</td>
                    <td><el-input v-model="datas.param57" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#bdd7ee">
                    <td class="period">本&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期</td>
                    <td><el-input v-model="datas.param58" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#bdd7ee">
                    <td rowspan="2" style="padding-left:40px;">1.7.2 上划省级收入</td>
                    <td class="period">上年同期</td>
                    <td><el-input v-model="datas.param59" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#bdd7ee">
                    <td class="period">本&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期</td>
                    <td><el-input v-model="datas.param60" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#bdd7ee">
                    <td rowspan="2" style="padding-left:40px;">1.7.3 上划市级收入</td>
                    <td class="period">上年同期</td>
                    <td><el-input v-model="datas.param61" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#bdd7ee">
                    <td class="period">本&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期</td>
                    <td><el-input v-model="datas.param62" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#9bc2e6">
                    <td rowspan="2" style="font-weight:600;padding-left:20px;">1.8 分行业税收收入</td>
                    <td class="period">上年同期</td>
                    <td><el-input v-model="datas.param63" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#9bc2e6">
                    <td class="period">本&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期</td>
                    <td><el-input v-model="datas.param64" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#bdd7ee">
                    <td rowspan="2" style="padding-left:40px;">1.8.1 煤炭开采和洗选业</td>
                    <td class="period">上年同期</td>
                    <td><el-input v-model="datas.param65" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#bdd7ee">
                    <td class="period">本&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期</td>
                    <td><el-input v-model="datas.param66" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#bdd7ee">
                    <td rowspan="2" style="padding-left:40px;">1.8.2 石油和天然气开采业</td>
                    <td class="period">上年同期</td>
                    <td><el-input v-model="datas.param67" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#bdd7ee">
                    <td class="period">本&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期</td>
                    <td><el-input v-model="datas.param68" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#bdd7ee">
                    <td rowspan="2" style="padding-left:40px;">1.8.3 装备制造业</td>
                    <td class="period">上年同期</td>
                    <td><el-input v-model="datas.param69" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#bdd7ee">
                    <td class="period">本&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期</td>
                    <td><el-input v-model="datas.param70" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#bdd7ee">
                    <td rowspan="2" style="padding-left:40px;">1.8.4 房地产业</td>
                    <td class="period">上年同期</td>
                    <td><el-input v-model="datas.param71" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#bdd7ee">
                    <td class="period">本&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期</td>
                    <td><el-input v-model="datas.param72" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#bdd7ee">
                    <td rowspan="2" style="padding-left:40px;">1.8.5 建筑业</td>
                    <td class="period">上年同期</td>
                    <td><el-input v-model="datas.param73" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#bdd7ee">
                    <td class="period">本&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期</td>
                    <td><el-input v-model="datas.param74" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#bdd7ee">
                    <td rowspan="2" style="padding-left:40px;">1.8.6 住宿餐饮业</td>
                    <td class="period">上年同期</td>
                    <td><el-input v-model="datas.param75" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#bdd7ee">
                    <td class="period">本&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期</td>
                    <td><el-input v-model="datas.param76" :disabled="disabled" /></td>
                  </tr>
                  <tr>
                    <td rowspan="2" style="font-weight:600">2.政府性基金</td>
                    <td class="period"></td>
                    <td style="width:20%"><el-input :disabled="true" /></td>
                  </tr>
                  <tr>
                    <td class="period"></td>
                    <td><el-input :disabled="true" /></td>
                  </tr>
                  <tr style="backgroundColor:#9bc2e6">
                    <td rowspan="2" style="font-weight:600;padding-left:20px;">2.1 政府性基金收入</td>
                    <td class="period">上年同期</td>
                    <td><el-input v-model="datas.param77" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#9bc2e6">
                    <td class="period">本&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期</td>
                    <td><el-input v-model="datas.param78" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#bdd7ee">
                    <td rowspan="2" style="padding-left:40px;">2.1.1 国有土地使用权出让金收入</td>
                    <td class="period">上年同期</td>
                    <td><el-input v-model="datas.param79" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#bdd7ee">
                    <td class="period">本&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期</td>
                    <td><el-input v-model="datas.param80" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#bdd7ee">
                    <td rowspan="2" style="padding-left:40px;">2.1.2 车辆通行费收入</td>
                    <td class="period">上年同期</td>
                    <td><el-input v-model="datas.param81" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#bdd7ee">
                    <td class="period">本&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期</td>
                    <td><el-input v-model="datas.param82" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#9bc2e6">
                    <td rowspan="2" style="font-weight:600;padding-left:20px;">2.2 上级补助收入</td>
                    <td class="period">上年同期</td>
                    <td><el-input v-model="datas.param83" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#9bc2e6">
                    <td class="period">本&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期</td>
                    <td><el-input v-model="datas.param84" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#bdd7ee">
                    <td rowspan="2" style="padding-left:40px;">2.2.1 中央对该地区补助财政收入</td>
                    <td class="period">上年同期</td>
                    <td><el-input v-model="datas.param85" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#bdd7ee">
                    <td class="period">本&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期</td>
                    <td><el-input v-model="datas.param86" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#bdd7ee">
                    <td rowspan="2" style="padding-left:40px;">2.2.2 省以下对该地区补助财政收入</td>
                    <td class="period">上年同期</td>
                    <td><el-input v-model="datas.param87" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#bdd7ee">
                    <td class="period">本&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期</td>
                    <td><el-input v-model="datas.param88" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#9bc2e6">
                    <td rowspan="2" style="font-weight:600;padding-left:20px;">2.3 上年结转收入</td>
                    <td class="period">上年同期</td>
                    <td><el-input v-model="datas.param89" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#9bc2e6">
                    <td class="period">本&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期</td>
                    <td><el-input v-model="datas.param90" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#9bc2e6">
                    <td rowspan="2" style="font-weight:600;padding-left:20px;">2.4 调入资金</td>
                    <td class="period">上年同期</td>
                    <td><el-input v-model="datas.param91" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#9bc2e6">
                    <td class="period">本&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期</td>
                    <td><el-input v-model="datas.param92" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#9bc2e6">
                    <td rowspan="2" style="font-weight:600;padding-left:20px;">2.5 债务（转贷）收入</td>
                    <td class="period">上年同期</td>
                    <td><el-input v-model="datas.param93" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#9bc2e6">
                    <td class="period">本&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期</td>
                    <td><el-input v-model="datas.param94" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#9bc2e6">
                    <td rowspan="2" style="font-weight:600;padding-left:20px;">2.6 收入总计</td>
                    <td class="period">上年同期</td>
                    <td><el-input v-model="datas.param95" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#9bc2e6">
                    <td class="period">本&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期</td>
                    <td><el-input v-model="datas.param96" :disabled="disabled" /></td>
                  </tr>
                  <tr>
                    <td rowspan="2" style="font-weight:600">3.国有资本经营预算收入</td>
                    <td class="period">上年同期</td>
                    <td style="width:20%"><el-input v-model="datas.param97" :disabled="disabled" /></td>
                  </tr>
                  <tr>
                    <td class="period">本&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期</td>
                    <td><el-input v-model="datas.param98" :disabled="disabled" /></td>
                  </tr>
                </tbody>
                <tbody style="backgroundColor:#ffd966">
                  <tr>
                    <td rowspan="50" valign="top" style="font-weight:600;textAlign:center;paddingTop:10px">三、财政支出类指标</td>
                    <td rowspan="2" style="font-weight:600">1.一般公共预算</td>
                    <td class="period"></td>
                    <td style="width:20%"><el-input :disabled="true" /></td>
                  </tr>
                  <tr>
                    <td class="period"></td>
                    <td><el-input :disabled="true" /></td>
                  </tr>
                  <tr style="backgroundColor:#ffe699">
                    <td rowspan="2" style="font-weight:600;padding-left:20px;">1.1 一般公共预算支出</td>
                    <td class="period">上年同期</td>
                    <td><el-input v-model="datas.param99" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#ffe699">
                    <td class="period">本&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期</td>
                    <td><el-input v-model="datas.param100" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#fff2cc">
                    <td rowspan="2" style="padding-left:40px;">1.1.1 一般公共服务支出</td>
                    <td class="period">上年同期</td>
                    <td><el-input v-model="datas.param101" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#fff2cc">
                    <td class="period">本&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期</td>
                    <td><el-input v-model="datas.param102" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#fff2cc">
                    <td rowspan="2" style="padding-left:40px;">1.1.2 教育支出</td>
                    <td class="period">上年同期</td>
                    <td><el-input v-model="datas.param103" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#fff2cc">
                    <td class="period">本&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期</td>
                    <td><el-input v-model="datas.param104" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#fff2cc">
                    <td rowspan="2" style="padding-left:40px;">1.1.3 科学技术支出</td>
                    <td class="period">上年同期</td>
                    <td><el-input v-model="datas.param105" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#fff2cc">
                    <td class="period">本&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期</td>
                    <td><el-input v-model="datas.param106" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#fff2cc">
                    <td rowspan="2" style="padding-left:40px;">1.1.4 社会保障和就业支出</td>
                    <td class="period">上年同期</td>
                    <td><el-input v-model="datas.param107" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#fff2cc">
                    <td class="period">本&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期</td>
                    <td><el-input v-model="datas.param108" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#fff2cc">
                    <td rowspan="2" style="padding-left:40px;">1.1.5 医疗卫生与计划生育支出</td>
                    <td class="period">上年同期</td>
                    <td><el-input v-model="datas.param109" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#fff2cc">
                    <td class="period">本&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期</td>
                    <td><el-input v-model="datas.param110" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#fff2cc">
                    <td rowspan="2" style="padding-left:40px;">1.1.6 节能环保支出</td>
                    <td class="period">上年同期</td>
                    <td><el-input v-model="datas.param111" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#fff2cc">
                    <td class="period">本&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期</td>
                    <td><el-input v-model="datas.param112" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#fff2cc">
                    <td rowspan="2" style="padding-left:40px;">1.1.7 城乡社区支出</td>
                    <td class="period">上年同期</td>
                    <td><el-input v-model="datas.param113" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#fff2cc">
                    <td class="period">本&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期</td>
                    <td><el-input v-model="datas.param114" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#fff2cc">
                    <td rowspan="2" style="padding-left:40px;">1.1.8 农林水支出</td>
                    <td class="period">上年同期</td>
                    <td><el-input v-model="datas.param115" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#fff2cc">
                    <td class="period">本&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期</td>
                    <td><el-input v-model="datas.param116" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#fff2cc">
                    <td rowspan="2" style="padding-left:40px;">1.1.9 交通运输支出</td>
                    <td class="period">上年同期</td>
                    <td><el-input v-model="datas.param117" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#fff2cc">
                    <td class="period">本&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期</td>
                    <td><el-input v-model="datas.param118" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#fff2cc">
                    <td rowspan="2" style="padding-left:40px;">1.1.10 住房保障支出</td>
                    <td class="period">上年同期</td>
                    <td><el-input v-model="datas.param119" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#fff2cc">
                    <td class="period">本&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期</td>
                    <td><el-input v-model="datas.param120" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#fff2cc">
                    <td rowspan="2" style="padding-left:40px;">1.1.11 债务发行费支出</td>
                    <td class="period">上年同期</td>
                    <td><el-input v-model="datas.param121" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#fff2cc">
                    <td class="period">本&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期</td>
                    <td><el-input v-model="datas.param122" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#fff2cc">
                    <td rowspan="2" style="padding-left:40px;">1.1.12 债务付息支出</td>
                    <td class="period">上年同期</td>
                    <td><el-input v-model="datas.param123" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#fff2cc">
                    <td class="period">本&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期</td>
                    <td><el-input v-model="datas.param124" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#ffe699">
                    <td rowspan="2" style="font-weight:600;padding-left:20px;">1.2 上解上级支出</td>
                    <td class="period">上年同期</td>
                    <td><el-input v-model="datas.param125" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#ffe699">
                    <td class="period">本&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期</td>
                    <td><el-input v-model="datas.param126" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#ffe699">
                    <td rowspan="2" style="font-weight:600;padding-left:20px;">1.3 债务还本支出</td>
                    <td class="period">上年同期</td>
                    <td><el-input v-model="datas.param127" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#ffe699">
                    <td class="period">本&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期</td>
                    <td><el-input v-model="datas.param128" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#ffe699">
                    <td rowspan="2" style="font-weight:600;padding-left:20px;">1.4 安排预算稳定调节基金</td>
                    <td class="period">上年同期</td>
                    <td><el-input v-model="datas.param129" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#ffe699">
                    <td class="period">本&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期</td>
                    <td><el-input v-model="datas.param130" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#ffe699">
                    <td rowspan="2" style="font-weight:600;padding-left:20px;">1.5 支出总计</td>
                    <td class="period">上年同期</td>
                    <td><el-input v-model="datas.param131" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#ffe699">
                    <td class="period">本&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期</td>
                    <td><el-input v-model="datas.param132" :disabled="disabled" /></td>
                  </tr>
                  <tr>
                    <td rowspan="2" style="font-weight:600;">2.政府性基金</td>
                    <td class="period"></td>
                    <td><el-input :disabled="true" /></td>
                  </tr>
                  <tr>
                    <td class="period"></td>
                    <td><el-input :disabled="true" /></td>
                  </tr>
                  <tr style="backgroundColor:#ffe699">
                    <td rowspan="2" style="font-weight:600;padding-left:20px;">2.1 政府性基金支出</td>
                    <td class="period">上年同期</td>
                    <td><el-input v-model="datas.param133" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#ffe699">
                    <td class="period">本&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期</td>
                    <td><el-input v-model="datas.param134" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#fff2cc">
                    <td rowspan="2" style="padding-left:40px;">2.1.1 债务付息支出</td>
                    <td class="period">上年同期</td>
                    <td><el-input v-model="datas.param135" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#fff2cc">
                    <td class="period">本&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期</td>
                    <td><el-input v-model="datas.param136" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#fff2cc">
                    <td rowspan="2" style="padding-left:40px;">2.1.2 债务发行费支出</td>
                    <td class="period">上年同期</td>
                    <td><el-input v-model="datas.param137" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#fff2cc">
                    <td class="period">本&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期</td>
                    <td><el-input v-model="datas.param138" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#ffe699">
                    <td rowspan="2" style="font-weight:600;padding-left:20px;">2.2 债务还本支出</td>
                    <td class="period">上年同期</td>
                    <td><el-input v-model="datas.param139" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#ffe699">
                    <td class="period">本&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期</td>
                    <td><el-input v-model="datas.param140" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#ffe699">
                    <td rowspan="2" style="font-weight:600;padding-left:20px;">2.3 支出总计</td>
                    <td class="period">上年同期</td>
                    <td><el-input v-model="datas.param141" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#ffe699">
                    <td class="period">本&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期</td>
                    <td><el-input v-model="datas.param142" :disabled="disabled" /></td>
                  </tr>
                  <tr>
                    <td rowspan="2" style="font-weight:600;">3.国有资本经营预算支出</td>
                    <td class="period">上年同期</td>
                    <td><el-input v-model="datas.param143" :disabled="disabled" /></td>
                  </tr>
                  <tr>
                    <td class="period">本&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期</td>
                    <td><el-input v-model="datas.param144" :disabled="disabled" /></td>
                  </tr>
                </tbody>
                <tbody style="backgroundColor:#a9d08e">
                  <tr>
                    <td rowspan="56" valign="top" style="font-weight:600;textAlign:center;paddingTop:10px">四、运行保障类指标</td>
                    <td rowspan="2" style="font-weight:600">1.刚性支出</td>
                    <td class="period"></td>
                    <td style="width:20%"><el-input :disabled="true" /></td>
                  </tr>
                  <tr>
                    <td class="period"></td>
                    <td><el-input :disabled="true" /></td>
                  </tr>
                  <tr style="backgroundColor:#c6e0b4">
                    <td rowspan="2" style="font-weight:600;padding-left:20px;">1.1 “三保”支出</td>
                    <td class="period">上年同期</td>
                    <td><el-input v-model="datas.param145" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#c6e0b4">
                    <td class="period">本&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期</td>
                    <td><el-input v-model="datas.param146" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#e2efda">
                    <td rowspan="2" style="padding-left:40px;">1.1.1 保工资支出</td>
                    <td class="period">上年同期</td>
                    <td><el-input v-model="datas.param147" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#e2efda">
                    <td class="period">本&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期</td>
                    <td><el-input v-model="datas.param148" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#e2efda">
                    <td rowspan="2" style="padding-left:40px;">1.1.2 保运转支出</td>
                    <td class="period">上年同期</td>
                    <td><el-input v-model="datas.param149" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#e2efda">
                    <td class="period">本&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期</td>
                    <td><el-input v-model="datas.param150" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#e2efda">
                    <td rowspan="2" style="padding-left:40px;">1.1.3 保基本民生支出</td>
                    <td class="period">上年同期</td>
                    <td><el-input v-model="datas.param151" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#e2efda">
                    <td class="period">本&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期</td>
                    <td><el-input v-model="datas.param152" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#e2efda">
                    <td rowspan="2" style="padding-left:50px;">其中：按国家标准测算的基本民生支出预算</td>
                    <td class="period">上年同期</td>
                    <td><el-input v-model="datas.param153" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#e2efda">
                    <td class="period">本&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期</td>
                    <td><el-input v-model="datas.param154" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#c6e0b4">
                    <td rowspan="2" style="font-weight:600;padding-left:20px;">1.2 对企业职工养老保险的补助</td>
                    <td class="period">上年同期</td>
                    <td><el-input v-model="datas.param155" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#c6e0b4">
                    <td class="period">本&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期</td>
                    <td><el-input v-model="datas.param156" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#c6e0b4">
                    <td rowspan="2" style="font-weight:600;padding-left:20px;">1.3 债卷付息支出</td>
                    <td class="period">上年同期</td>
                    <td><el-input v-model="datas.param157" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#c6e0b4">
                    <td class="period">本&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期</td>
                    <td><el-input v-model="datas.param158" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#c6e0b4">
                    <td rowspan="2" style="font-weight:600;padding-left:20px;">1.4 债卷发行费用支出</td>
                    <td class="period">上年同期</td>
                    <td><el-input v-model="datas.param159" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#c6e0b4">
                    <td class="period">本&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期</td>
                    <td><el-input v-model="datas.param160" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#c6e0b4">
                    <td rowspan="2" style="font-weight:600;padding-left:20px;">1.5 自由财力偿还债卷本金</td>
                    <td class="period">上年同期</td>
                    <td><el-input v-model="datas.param161" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#c6e0b4">
                    <td class="period">本&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期</td>
                    <td><el-input v-model="datas.param162" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#c6e0b4">
                    <td rowspan="2" style="font-weight:600;padding-left:20px;">1.6 招商引资支出</td>
                    <td class="period">上年同期</td>
                    <td><el-input v-model="datas.param163" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#c6e0b4">
                    <td class="period">本&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期</td>
                    <td><el-input v-model="datas.param164" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#c6e0b4">
                    <td rowspan="2" style="font-weight:600;padding-left:20px;">1.7 支持中小企业发展支出</td>
                    <td class="period">上年同期</td>
                    <td><el-input v-model="datas.param165" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#c6e0b4">
                    <td class="period">本&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期</td>
                    <td><el-input v-model="datas.param166" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#c6e0b4">
                    <td rowspan="2" style="font-weight:600;padding-left:20px;">1.8 财力安排用于暂付款消化金额</td>
                    <td class="period">上年同期</td>
                    <td><el-input v-model="datas.param167" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#c6e0b4">
                    <td class="period">本&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期</td>
                    <td><el-input v-model="datas.param168" :disabled="disabled" /></td>
                  </tr>
                  <tr>
                    <td rowspan="2" style="font-weight:600">2.财政供养人口（万人）</td>
                    <td class="period">上年同期</td>
                    <td><el-input v-model="datas.param169" :disabled="disabled" /></td>
                  </tr>
                  <tr>
                    <td class="period">本&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期</td>
                    <td><el-input v-model="datas.param170" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#c6e0b4">
                    <td rowspan="2" style="font-weight:600;padding-left:20px;">2.1 财政支开人数</td>
                    <td class="period">上年同期</td>
                    <td><el-input v-model="datas.param171" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#c6e0b4">
                    <td class="period">本&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期</td>
                    <td><el-input v-model="datas.param172" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#c6e0b4">
                    <td rowspan="2" style="font-weight:600;padding-left:20px;">2.2 财政补助开支人数</td>
                    <td class="period">上年同期</td>
                    <td><el-input v-model="datas.param173" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#c6e0b4">
                    <td class="period">本&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期</td>
                    <td><el-input v-model="datas.param174" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#c6e0b4">
                    <td rowspan="2" style="font-weight:600;padding-left:20px;">2.3 学生人数</td>
                    <td class="period">上年同期</td>
                    <td><el-input v-model="datas.param175" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#c6e0b4">
                    <td class="period">本&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期</td>
                    <td><el-input v-model="datas.param176" :disabled="disabled" /></td>
                  </tr>
                  <tr>
                    <td rowspan="2" style="font-weight:600">3.库款情况：</td>
                    <td class="period">上年同期</td>
                    <td><el-input v-model="datas.param177" :disabled="disabled" /></td>
                  </tr>
                  <tr>
                    <td class="period">本&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期</td>
                    <td><el-input v-model="datas.param178" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#c6e0b4">
                    <td rowspan="2" style="font-weight:600;padding-left:20px;">3.1 库款流入</td>
                    <td class="period">上年同期</td>
                    <td><el-input v-model="datas.param179" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#c6e0b4">
                    <td class="period">本&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期</td>
                    <td><el-input v-model="datas.param180" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#e2efda">
                    <td rowspan="2" style="padding-left:40px;">3.1.1 转移性收入</td>
                    <td class="period">上年同期</td>
                    <td><el-input v-model="datas.param181" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#e2efda">
                    <td class="period">本&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期</td>
                    <td><el-input v-model="datas.param182" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#e2efda">
                    <td rowspan="2" style="padding-left:40px;">3.1.2 暂付款收回</td>
                    <td class="period">上年同期</td>
                    <td><el-input v-model="datas.param183" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#e2efda">
                    <td class="period">本&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期</td>
                    <td><el-input v-model="datas.param184" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#e2efda">
                    <td rowspan="2" style="padding-left:40px;">3.1.3 债卷收入</td>
                    <td class="period">上年同期</td>
                    <td><el-input v-model="datas.param185" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#e2efda">
                    <td class="period">本&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期</td>
                    <td><el-input v-model="datas.param186" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#c6e0b4">
                    <td rowspan="2" style="font-weight:600;padding-left:20px;">3.2 库款流出</td>
                    <td class="period">上年同期</td>
                    <td><el-input v-model="datas.param187" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#c6e0b4">
                    <td class="period">本&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期</td>
                    <td><el-input v-model="datas.param188" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#e2efda">
                    <td rowspan="2" style="padding-left:40px;">3.2.1 转移性支出</td>
                    <td class="period">上年同期</td>
                    <td><el-input v-model="datas.param189" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#e2efda">
                    <td class="period">本&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期</td>
                    <td><el-input v-model="datas.param190" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#e2efda">
                    <td rowspan="2" style="padding-left:40px;">3.2.2 暂付款流出</td>
                    <td class="period">上年同期</td>
                    <td><el-input v-model="datas.param191" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#e2efda">
                    <td class="period">本&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期</td>
                    <td><el-input v-model="datas.param192" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#e2efda">
                    <td rowspan="2" style="padding-left:40px;">3.2.3 暂存库流出</td>
                    <td class="period">上年同期</td>
                    <td><el-input v-model="datas.param193" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#e2efda">
                    <td class="period">本&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期</td>
                    <td><el-input v-model="datas.param194" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#c6e0b4">
                    <td rowspan="2" style="font-weight:600;padding-left:20px;">3.3 库款保障倍数</td>
                    <td class="period">上年同期</td>
                    <td><el-input v-model="datas.param195" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#c6e0b4">
                    <td class="period">本&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期</td>
                    <td><el-input v-model="datas.param196" :disabled="disabled" /></td>
                  </tr>
                </tbody>
                <tbody style="backgroundColor:#9bc2e6">
                  <tr>
                    <td rowspan="24" valign="top" style="font-weight:600;textAlign:center;paddingTop:10px">五、直达资金类指标</td>
                    <td rowspan="2" style="font-weight:600">1.上级下达直达资金金额</td>
                    <td class="period">上年同期</td>
                    <td style="width:20%"><el-input v-model="datas.param197" :disabled="disabled" /></td>
                  </tr>
                  <tr>
                    <td class="period">本&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期</td>
                    <td><el-input v-model="datas.param198" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#bdd7ee">
                    <td rowspan="2" style="padding-left:20px;">1.1 中央下达</td>
                    <td class="period">上年同期</td>
                    <td><el-input v-model="datas.param199" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#bdd7ee">
                    <td class="period">本&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期</td>
                    <td><el-input v-model="datas.param200" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#bdd7ee">
                    <td rowspan="2" style="padding-left:20px;">1.2 地方安排</td>
                    <td class="period">上年同期</td>
                    <td><el-input v-model="datas.param201" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#bdd7ee">
                    <td class="period">本&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期</td>
                    <td><el-input v-model="datas.param202" :disabled="disabled" /></td>
                  </tr>
                  <tr>
                    <td rowspan="2" style="font-weight:600">2.直达资金分配进度</td>
                    <td class="period">上年同期</td>
                    <td style="width:20%"><el-input v-model="datas.param203" :disabled="disabled" /></td>
                  </tr>
                  <tr>
                    <td class="period">本&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期</td>
                    <td><el-input v-model="datas.param204" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#bdd7ee">
                    <td rowspan="2" style="padding-left:20px;">2.1 中央下达资金分配进度</td>
                    <td class="period">上年同期</td>
                    <td><el-input v-model="datas.param205" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#bdd7ee">
                    <td class="period">本&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期</td>
                    <td><el-input v-model="datas.param206" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#bdd7ee">
                    <td rowspan="2" style="padding-left:20px;">2.2 地方安排资金分配进度</td>
                    <td class="period">上年同期</td>
                    <td><el-input v-model="datas.param207" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#bdd7ee">
                    <td class="period">本&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期</td>
                    <td><el-input v-model="datas.param208" :disabled="disabled" /></td>
                  </tr>
                  <tr>
                    <td rowspan="2" style="font-weight:600">3.直达资金支出金额</td>
                    <td class="period">上年同期</td>
                    <td style="width:20%"><el-input v-model="datas.param209" :disabled="disabled" /></td>
                  </tr>
                  <tr>
                    <td class="period">本&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期</td>
                    <td><el-input v-model="datas.param210" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#bdd7ee">
                    <td rowspan="2" style="padding-left:20px;">3.1 中央下达</td>
                    <td class="period">上年同期</td>
                    <td><el-input v-model="datas.param211" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#bdd7ee">
                    <td class="period">本&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期</td>
                    <td><el-input v-model="datas.param212" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#bdd7ee">
                    <td rowspan="2" style="padding-left:20px;">3.2 地方安排</td>
                    <td class="period">上年同期</td>
                    <td><el-input v-model="datas.param213" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#bdd7ee">
                    <td class="period">本&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期</td>
                    <td><el-input v-model="datas.param214" :disabled="disabled" /></td>
                  </tr>
                  <tr>
                    <td rowspan="2" style="font-weight:600">4.直达资金支出进度</td>
                    <td class="period">上年同期</td>
                    <td style="width:20%"><el-input v-model="datas.param215" :disabled="disabled" /></td>
                  </tr>
                  <tr>
                    <td class="period">本&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期</td>
                    <td><el-input v-model="datas.param216" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#bdd7ee">
                    <td rowspan="2" style="padding-left:20px;">4.1 中央下达资金支出进度</td>
                    <td class="period">上年同期</td>
                    <td><el-input v-model="datas.param217" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#bdd7ee">
                    <td class="period">本&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期</td>
                    <td><el-input v-model="datas.param218" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#bdd7ee">
                    <td rowspan="2" style="padding-left:20px;">4.2 地方安排资金支出进度</td>
                    <td class="period">上年同期</td>
                    <td><el-input v-model="datas.param219" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#bdd7ee">
                    <td class="period">本&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期</td>
                    <td><el-input v-model="datas.param220" :disabled="disabled" /></td>
                  </tr>
                </tbody>
                <tbody style="backgroundColor:#ffd966">
                  <tr>
                    <td rowspan="30" valign="top" style="font-weight:600;textAlign:center;paddingTop:10px">六、政府债务类指标</td>
                    <td rowspan="2" style="font-weight:600">1.政府债务限额</td>
                    <td class="period">上年同期</td>
                    <td style="width:20%"><el-input v-model="datas.param336" :disabled="disabled" /></td>
                  </tr>
                  <tr>
                    <td class="period">本&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期</td>
                    <td><el-input v-model="datas.param337" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#ffe699">
                    <td rowspan="2" style="padding-left:20px;">1.1 一般债卷</td>
                    <td class="period">上年同期</td>
                    <td><el-input v-model="datas.param338" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#ffe699">
                    <td class="period">本&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期</td>
                    <td><el-input v-model="datas.param339" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#ffe699">
                    <td rowspan="2" style="padding-left:20px;">1.2 专项债卷</td>
                    <td class="period">上年同期</td>
                    <td><el-input v-model="datas.param340" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#ffe699">
                    <td class="period">本&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期</td>
                    <td><el-input v-model="datas.param341" :disabled="disabled" /></td>
                  </tr>
                  <tr>
                    <td rowspan="2" style="font-weight:600">2.政府债务余额</td>
                    <td class="period">上年同期</td>
                    <td style="width:20%"><el-input v-model="datas.param342" :disabled="disabled" /></td>
                  </tr>
                  <tr>
                    <td class="period">本&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期</td>
                    <td><el-input v-model="datas.param343" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#ffe699">
                    <td rowspan="2" style="padding-left:20px;">2.1 一般债卷</td>
                    <td class="period">上年同期</td>
                    <td><el-input v-model="datas.param344" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#ffe699">
                    <td class="period">本&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期</td>
                    <td><el-input v-model="datas.param345" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#ffe699">
                    <td rowspan="2" style="padding-left:20px;">2.2 专项债卷</td>
                    <td class="period">上年同期</td>
                    <td><el-input v-model="datas.param346" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#ffe699">
                    <td class="period">本&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期</td>
                    <td><el-input v-model="datas.param347" :disabled="disabled" /></td>
                  </tr>
                  <tr>
                    <td rowspan="2" style="font-weight:600">3.年内新增政府债卷限额</td>
                    <td class="period">上年同期</td>
                    <td style="width:20%"><el-input v-model="datas.param348" :disabled="disabled" /></td>
                  </tr>
                  <tr>
                    <td class="period">本&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期</td>
                    <td><el-input v-model="datas.param349" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#ffe699">
                    <td rowspan="2" style="padding-left:20px;">3.1 一般债卷</td>
                    <td class="period">上年同期</td>
                    <td><el-input v-model="datas.param350" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#ffe699">
                    <td class="period">本&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期</td>
                    <td><el-input v-model="datas.param351" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#ffe699">
                    <td rowspan="2" style="padding-left:20px;">3.2 专项债卷</td>
                    <td class="period">上年同期</td>
                    <td><el-input v-model="datas.param352" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#ffe699">
                    <td class="period">本&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期</td>
                    <td><el-input v-model="datas.param353" :disabled="disabled" /></td>
                  </tr>
                  <tr>
                    <td rowspan="2" style="font-weight:600">4.年内发行债卷额</td>
                    <td class="period">上年同期</td>
                    <td style="width:20%"><el-input v-model="datas.param354" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#ffe699">
                    <td class="period">本&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期</td>
                    <td><el-input v-model="datas.param355" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#ffe699">
                    <td rowspan="2" style="padding-left:20px;">4.1 一般债卷</td>
                    <td class="period">上年同期</td>
                    <td><el-input v-model="datas.param356" :disabled="disabled" /></td>
                  </tr>
                  <tr>
                    <td class="period">本&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期</td>
                    <td><el-input v-model="datas.param357" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#ffe699">
                    <td rowspan="2" style="padding-left:20px;">4.2 专项债卷</td>
                    <td class="period">上年同期</td>
                    <td><el-input v-model="datas.param358" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#ffe699">
                    <td class="period">本&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期</td>
                    <td><el-input v-model="datas.param359" :disabled="disabled" /></td>
                  </tr>
                  <tr>
                    <td rowspan="2" style="font-weight:600">5.年内偿还债卷额</td>
                    <td class="period">上年同期</td>
                    <td style="width:20%"><el-input v-model="datas.param360" :disabled="disabled" /></td>
                  </tr>
                  <tr>
                    <td class="period">本&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期</td>
                    <td><el-input v-model="datas.param361" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#ffe699">
                    <td rowspan="2" style="padding-left:20px;">5.1 一般债卷</td>
                    <td class="period">上年同期</td>
                    <td><el-input v-model="datas.param362" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#ffe699">
                    <td class="period">本&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期</td>
                    <td><el-input v-model="datas.param363" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#ffe699">
                    <td rowspan="2" style="padding-left:20px;">5.2 专项债卷</td>
                    <td class="period">上年同期</td>
                    <td><el-input v-model="datas.param364" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#ffe699">
                    <td class="period">本&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期</td>
                    <td><el-input v-model="datas.param365" :disabled="disabled" /></td>
                  </tr>
                </tbody>
                <tbody style="backgroundColor:#c9c9c9">
                  <tr>
                    <td rowspan="44" valign="top" style="font-weight:600;textAlign:center;paddingTop:10px">七、预算管理类指标</td>
                    <td rowspan="2" style="font-weight:600">1.预算执行进度</td>
                    <td class="period"></td>
                    <td style="width:20%"><el-input :disabled="true" /></td>
                  </tr>
                  <tr>
                    <td class="period"></td>
                    <td><el-input :disabled="true" /></td>
                  </tr>
                  <tr style="backgroundColor:#dbdbdb">
                    <td rowspan="2" style="padding-left:20px;">1.1 一般公共预算收入执行进度</td>
                    <td class="period">上年同期</td>
                    <td><el-input v-model="datas.param221" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#dbdbdb">
                    <td class="period">本&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期</td>
                    <td><el-input v-model="datas.param222" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#dbdbdb">
                    <td rowspan="2" style="padding-left:20px;">1.2 一般公共预算支出执行进度</td>
                    <td class="period">上年同期</td>
                    <td><el-input v-model="datas.param223" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#dbdbdb">
                    <td class="period">本&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期</td>
                    <td><el-input v-model="datas.param224" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#dbdbdb">
                    <td rowspan="2" style="padding-left:20px;">1.3 政府性基金预算收入执行进度</td>
                    <td class="period">上年同期</td>
                    <td><el-input v-model="datas.param225" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#dbdbdb">
                    <td class="period">本&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期</td>
                    <td><el-input v-model="datas.param226" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#dbdbdb">
                    <td rowspan="2" style="padding-left:20px;">1.4 政府性基金预算支出执行进度</td>
                    <td class="period">上年同期</td>
                    <td><el-input v-model="datas.param227" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#dbdbdb">
                    <td class="period">本&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期</td>
                    <td><el-input v-model="datas.param228" :disabled="disabled" /></td>
                  </tr>
                  <tr>
                    <td rowspan="2" style="font-weight:600">2.预算数</td>
                    <td class="period"></td>
                    <td style="width:20%"><el-input :disabled="true" /></td>
                  </tr>
                  <tr>
                    <td class="period"></td>
                    <td><el-input :disabled="true" /></td>
                  </tr>
                  <tr style="backgroundColor:#dbdbdb">
                    <td rowspan="2" style="padding-left:20px;">2.1 一般公共预算收入（含调整数）</td>
                    <td class="period">上年同期</td>
                    <td><el-input v-model="datas.param229" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#dbdbdb">
                    <td class="period">本&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期</td>
                    <td><el-input v-model="datas.param230" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#dbdbdb">
                    <td rowspan="2" style="padding-left:30px;">其中：调整数</td>
                    <td class="period">上年同期</td>
                    <td><el-input v-model="datas.param231" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#dbdbdb">
                    <td class="period">本&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期</td>
                    <td><el-input v-model="datas.param232" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#dbdbdb">
                    <td rowspan="2" style="padding-left:20px;">2.2 一般公共预算支出（含调整数）</td>
                    <td class="period">上年同期</td>
                    <td><el-input v-model="datas.param233" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#dbdbdb">
                    <td class="period">本&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期</td>
                    <td><el-input v-model="datas.param234" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#dbdbdb">
                    <td rowspan="2" style="padding-left:30px;">其中：调整数</td>
                    <td class="period">上年同期</td>
                    <td><el-input v-model="datas.param235" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#dbdbdb">
                    <td class="period">本&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期</td>
                    <td><el-input v-model="datas.param236" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#dbdbdb">
                    <td rowspan="2" style="padding-left:20px;">2.3 政府性基金预算收入（含调整数）</td>
                    <td class="period">上年同期</td>
                    <td><el-input v-model="datas.param237" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#dbdbdb">
                    <td class="period">本&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期</td>
                    <td><el-input v-model="datas.param238" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#dbdbdb">
                    <td rowspan="2" style="padding-left:30px;">其中：调整数</td>
                    <td class="period">上年同期</td>
                    <td><el-input v-model="datas.param239" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#dbdbdb">
                    <td class="period">本&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期</td>
                    <td><el-input v-model="datas.param240" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#dbdbdb">
                    <td rowspan="2" style="padding-left:20px;">2.4 政府性基金预算支出（含调整数）</td>
                    <td class="period">上年同期</td>
                    <td><el-input v-model="datas.param241" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#dbdbdb">
                    <td class="period">本&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期</td>
                    <td><el-input v-model="datas.param242" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#dbdbdb">
                    <td rowspan="2" style="padding-left:30px;">其中：调整数</td>
                    <td class="period">上年同期</td>
                    <td><el-input v-model="datas.param243" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#dbdbdb">
                    <td class="period">本&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期</td>
                    <td><el-input v-model="datas.param244" :disabled="disabled" /></td>
                  </tr>
                  <tr>
                    <td rowspan="2" style="font-weight:600">3.暂付款</td>
                    <td class="period"></td>
                    <td style="width:20%"><el-input :disabled="true" /></td>
                  </tr>
                  <tr>
                    <td class="period"></td>
                    <td><el-input :disabled="true" /></td>
                  </tr>
                  <tr style="backgroundColor:#dbdbdb">
                    <td rowspan="2" style="padding-left:20px;">3.1 暂付款期初余额</td>
                    <td class="period">上年同期</td>
                    <td><el-input v-model="datas.param245" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#dbdbdb">
                    <td class="period">本&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期</td>
                    <td><el-input v-model="datas.param246" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#dbdbdb">
                    <td rowspan="2" style="padding-left:20px;">3.2 当年新增暂付款金额</td>
                    <td class="period">上年同期</td>
                    <td><el-input v-model="datas.param247" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#dbdbdb">
                    <td class="period">本&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期</td>
                    <td><el-input v-model="datas.param248" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#dbdbdb">
                    <td rowspan="2" style="padding-left:20px;">3.3 当年减少暂付款金额</td>
                    <td class="period">上年同期</td>
                    <td><el-input v-model="datas.param249" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#dbdbdb">
                    <td class="period">本&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期</td>
                    <td><el-input v-model="datas.param250" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#dbdbdb">
                    <td rowspan="2" style="padding-left:20px;">3.4 暂付款期末余额</td>
                    <td class="period">上年同期</td>
                    <td><el-input v-model="datas.param251" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#dbdbdb">
                    <td class="period">本&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期</td>
                    <td><el-input v-model="datas.param252" :disabled="disabled" /></td>
                  </tr>
                </tbody>
                <tbody style="backgroundColor:#c6e0b4">
                  <tr>
                    <td rowspan="54" valign="top" style="font-weight:600;textAlign:center;paddingTop:10px">八、社会保险类指标</td>
                    <td rowspan="2" style="font-weight:600">1.城乡居民养老保险基金</td>
                    <td class="period"></td>
                    <td style="width:20%"><el-input :disabled="true" /></td>
                  </tr>
                  <tr>
                    <td class="period"></td>
                    <td><el-input :disabled="true" /></td>
                  </tr>
                  <tr style="backgroundColor:#e2efda">
                    <td rowspan="2" style="padding-left:20px;">1.1 当年基金收入</td>
                    <td class="period">上年同期</td>
                    <td><el-input v-model="datas.param253" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#e2efda">
                    <td class="period">本&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期</td>
                    <td><el-input v-model="datas.param254" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#e2efda">
                    <td rowspan="2" style="padding-left:20px;">1.2 当年基金支出</td>
                    <td class="period">上年同期</td>
                    <td><el-input v-model="datas.param255" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#e2efda">
                    <td class="period">本&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期</td>
                    <td><el-input v-model="datas.param256" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#e2efda">
                    <td rowspan="2" style="padding-left:20px;">1.3 基金累计金额</td>
                    <td class="period">上年同期</td>
                    <td><el-input v-model="datas.param257" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#e2efda">
                    <td class="period">本&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期</td>
                    <td><el-input v-model="datas.param258" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#e2efda">
                    <td rowspan="2" style="padding-left:20px;">1.4 缴费人数</td>
                    <td class="period">上年同期</td>
                    <td><el-input v-model="datas.param259" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#e2efda">
                    <td class="period">本&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期</td>
                    <td><el-input v-model="datas.param260" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#e2efda">
                    <td rowspan="2" style="padding-left:20px;">1.5 享受待遇人数</td>
                    <td class="period">上年同期</td>
                    <td><el-input v-model="datas.param261" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#e2efda">
                    <td class="period">本&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期</td>
                    <td><el-input v-model="datas.param262" :disabled="disabled" /></td>
                  </tr>
                  <tr>
                    <td rowspan="2" style="font-weight:600">2.城乡居民医疗保险基金</td>
                    <td class="period"></td>
                    <td style="width:20%"><el-input :disabled="true" /></td>
                  </tr>
                  <tr>
                    <td class="period"></td>
                    <td><el-input :disabled="true" /></td>
                  </tr>
                  <tr style="backgroundColor:#e2efda">
                    <td rowspan="2" style="padding-left:20px;">2.1 当年基金收入</td>
                    <td class="period">上年同期</td>
                    <td><el-input v-model="datas.param263" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#e2efda">
                    <td class="period">本&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期</td>
                    <td><el-input v-model="datas.param264" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#e2efda">
                    <td rowspan="2" style="padding-left:20px;">2.2 当年基金支出</td>
                    <td class="period">上年同期</td>
                    <td><el-input v-model="datas.param265" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#e2efda">
                    <td class="period">本&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期</td>
                    <td><el-input v-model="datas.param266" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#e2efda">
                    <td rowspan="2" style="padding-left:20px;">2.3 基金累计金额</td>
                    <td class="period">上年同期</td>
                    <td><el-input v-model="datas.param267" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#e2efda">
                    <td class="period">本&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期</td>
                    <td><el-input v-model="datas.param268" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#e2efda">
                    <td rowspan="2" style="padding-left:20px;">2.4 缴费人数</td>
                    <td class="period">上年同期</td>
                    <td><el-input v-model="datas.param269" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#e2efda">
                    <td class="period">本&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期</td>
                    <td><el-input v-model="datas.param270" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#e2efda">
                    <td rowspan="2" style="padding-left:20px;">2.5 享受待遇人数</td>
                    <td class="period">上年同期</td>
                    <td><el-input v-model="datas.param271" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#e2efda">
                    <td class="period">本&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期</td>
                    <td><el-input v-model="datas.param272" :disabled="disabled" /></td>
                  </tr>
                  <tr>
                    <td rowspan="2" style="font-weight:600">3.职工养老保险基金</td>
                    <td class="period"></td>
                    <td style="width:20%"><el-input :disabled="true" /></td>
                  </tr>
                  <tr>
                    <td class="period"></td>
                    <td><el-input :disabled="true" /></td>
                  </tr>
                  <tr style="backgroundColor:#e2efda">
                    <td rowspan="2" style="padding-left:20px;">3.1 当年基金收入</td>
                    <td class="period">上年同期</td>
                    <td><el-input v-model="datas.param273" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#e2efda">
                    <td class="period">本&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期</td>
                    <td><el-input v-model="datas.param274" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#e2efda">
                    <td rowspan="2" style="padding-left:20px;">3.2 当年基金支出</td>
                    <td class="period">上年同期</td>
                    <td><el-input v-model="datas.param275" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#e2efda">
                    <td class="period">本&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期</td>
                    <td><el-input v-model="datas.param276" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#e2efda">
                    <td rowspan="2" style="padding-left:20px;">3.3 基金累计金额</td>
                    <td class="period">上年同期</td>
                    <td><el-input v-model="datas.param277" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#e2efda">
                    <td class="period">本&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期</td>
                    <td><el-input v-model="datas.param278" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#e2efda">
                    <td rowspan="2" style="padding-left:20px;">3.4 缴费人数</td>
                    <td class="period">上年同期</td>
                    <td><el-input v-model="datas.param279" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#e2efda">
                    <td class="period">本&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期</td>
                    <td><el-input v-model="datas.param280" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#e2efda">
                    <td rowspan="2" style="padding-left:20px;">3.5 享受待遇人数</td>
                    <td class="period">上年同期</td>
                    <td><el-input v-model="datas.param281" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#e2efda">
                    <td class="period">本&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期</td>
                    <td><el-input v-model="datas.param282" :disabled="disabled" /></td>
                  </tr>
                  <tr>
                    <td rowspan="2" style="font-weight:600">4.机关事业单位养老保险基金</td>
                    <td class="period"></td>
                    <td style="width:20%"><el-input :disabled="true" /></td>
                  </tr>
                  <tr>
                    <td class="period"></td>
                    <td><el-input :disabled="true" /></td>
                  </tr>
                  <tr style="backgroundColor:#e2efda">
                    <td rowspan="2" style="padding-left:20px;">4.1 当年基金收入</td>
                    <td class="period">上年同期</td>
                    <td><el-input v-model="datas.param283" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#e2efda">
                    <td class="period">本&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期</td>
                    <td><el-input v-model="datas.param284" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#e2efda">
                    <td rowspan="2" style="padding-left:20px;">4.2 当年基金支出</td>
                    <td class="period">上年同期</td>
                    <td><el-input v-model="datas.param285" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#e2efda">
                    <td class="period">本&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期</td>
                    <td><el-input v-model="datas.param286" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#e2efda">
                    <td rowspan="2" style="padding-left:20px;">4.3 基金累计金额</td>
                    <td class="period">上年同期</td>
                    <td><el-input v-model="datas.param287" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#e2efda">
                    <td class="period">本&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期</td>
                    <td><el-input v-model="datas.param288" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#e2efda">
                    <td rowspan="2" style="padding-left:20px;">4.4 缴费人数</td>
                    <td class="period">上年同期</td>
                    <td><el-input v-model="datas.param289" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#e2efda">
                    <td class="period">本&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期</td>
                    <td><el-input v-model="datas.param290" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#e2efda">
                    <td rowspan="2" style="padding-left:20px;">4.5 享受待遇人数</td>
                    <td class="period">上年同期</td>
                    <td><el-input v-model="datas.param291" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#e2efda">
                    <td class="period">本&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期</td>
                    <td><el-input v-model="datas.param292" :disabled="disabled" /></td>
                  </tr>
                  <tr>
                    <td rowspan="2" style="font-weight:600">5.社会保险基金预算</td>
                    <td class="period"></td>
                    <td style="width:20%"><el-input :disabled="true" /></td>
                  </tr>
                  <tr>
                    <td class="period"></td>
                    <td><el-input :disabled="true" /></td>
                  </tr>
                  <tr style="backgroundColor:#e2efda">
                    <td rowspan="2" style="padding-left:20px;">5.1 社会保险基金预算收入</td>
                    <td class="period">上年同期</td>
                    <td><el-input v-model="datas.param293" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#e2efda">
                    <td class="period">本&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期</td>
                    <td><el-input v-model="datas.param294" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#e2efda">
                    <td rowspan="2" style="padding-left:20px;">5.2 社会保险基金预算支出</td>
                    <td class="period">上年同期</td>
                    <td><el-input v-model="datas.param295" :disabled="disabled" /></td>
                  </tr>
                  <tr style="backgroundColor:#e2efda">
                    <td class="period">本&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期</td>
                    <td><el-input v-model="datas.param296" :disabled="disabled" /></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <!--指标表-->
          <div v-show="targetTable" id="printDiv2" class="payVoucherInput" style="margin-top:50px;">
            <div class="body" style="font-size:20px;height:400px;overflow:auto;">
              <table class="basicTable">
                <tbody style="backgroundColor:#f2f2f2">
                  <tr>
                    <td rowspan="9" style="width:20%;font-weight:600;textAlign:center;">一、财政收入稳健指数</td>
                    <td class="period" style="width:20%">财政依存度</td>
                    <td style="width:60%"><el-input v-model="datas.param297" :disabled="disabled" /></td>
                  </tr>
                  <tr>
                    <td class="period">收入弹性</td>
                    <td><el-input v-model="datas.param298" :disabled="disabled" /></td>
                  </tr>
                  <tr>
                    <td class="period">税收收入占比</td>
                    <td><el-input v-model="datas.param299" :disabled="disabled" /></td>
                  </tr>
                  <tr>
                    <td class="period">大税占比</td>
                    <td><el-input v-model="datas.param300" :disabled="disabled" /></td>
                  </tr>
                  <tr>
                    <td class="period">税收收入上划比例</td>
                    <td><el-input v-model="datas.param301" :disabled="disabled" /></td>
                  </tr>
                  <tr>
                    <td class="period">财政自给率</td>
                    <td><el-input v-model="datas.param302" :disabled="disabled" /></td>
                  </tr>
                  <tr>
                    <td class="period">人均财政支出水平</td>
                    <td><el-input v-model="datas.param303" :disabled="disabled" /></td>
                  </tr>
                  <tr>
                    <td class="period">土地财政依赖的</td>
                    <td><el-input v-model="datas.param304" :disabled="disabled" /></td>
                  </tr>
                  <tr>
                    <td class="period">预算收入结构比例</td>
                    <td><el-input v-model="datas.param305" :disabled="disabled" /></td>
                  </tr>
                </tbody>
                <tbody style="backgroundColor:#d6dce4">
                  <tr>
                    <td rowspan="5" style="width:20%;font-weight:600;textAlign:center;">二、财政支出结构指数</td>
                    <td class="period">预算支出结构比例</td>
                    <td><el-input v-model="datas.param306" :disabled="disabled" /></td>
                  </tr>
                  <tr>
                    <td class="period">行政管理支出占比</td>
                    <td><el-input v-model="datas.param307" :disabled="disabled" /></td>
                  </tr>
                  <tr>
                    <td class="period">教育支出占比</td>
                    <td><el-input v-model="datas.param308" :disabled="disabled" /></td>
                  </tr>
                  <tr>
                    <td class="period">科技支出占比</td>
                    <td><el-input v-model="datas.param309" :disabled="disabled" /></td>
                  </tr>
                  <tr>
                    <td class="period">环境保护支出占比</td>
                    <td><el-input v-model="datas.param310" :disabled="disabled" /></td>
                  </tr>
                </tbody>
                <tbody style="backgroundColor:#fce4d6">
                  <tr>
                    <td rowspan="6" style="width:20%;font-weight:600;textAlign:center;">三、债务可持续指数</td>
                    <td class="period">政府债务债务率</td>
                    <td><el-input v-model="datas.param328" :disabled="disabled" /></td>
                  </tr>
                  <tr>
                    <td class="period">政府债务负债率</td>
                    <td><el-input v-model="datas.param329" :disabled="disabled" /></td>
                  </tr>
                  <tr>
                    <td class="period">一般债务支出占比</td>
                    <td><el-input v-model="datas.param330" :disabled="disabled" /></td>
                  </tr>
                  <tr>
                    <td class="period">一般债务限额使用率</td>
                    <td><el-input v-model="datas.param331" :disabled="disabled" /></td>
                  </tr>
                  <tr>
                    <td class="period">专项债务支出占比</td>
                    <td><el-input v-model="datas.param332" :disabled="disabled" /></td>
                  </tr>
                  <tr>
                    <td class="period">专项债务限额使用率</td>
                    <td><el-input v-model="datas.param333" :disabled="disabled" /></td>
                  </tr>
                </tbody>
                <tbody style="backgroundColor:#fff2cc">
                  <tr>
                    <td rowspan="7" style="width:20%;font-weight:600;textAlign:center;">四、社保基金可持续指数</td>
                    <td class="period">社保基金盈余率</td>
                    <td><el-input v-model="datas.param311" :disabled="disabled" /></td>
                  </tr>
                  <tr>
                    <td class="period">职工养老保险抚养比</td>
                    <td><el-input v-model="datas.param334" :disabled="disabled" /></td>
                  </tr>
                  <tr>
                    <td class="period">城乡居民养老保险抚养比</td>
                    <td><el-input v-model="datas.param335" :disabled="disabled" /></td>
                  </tr>
                  <tr>
                    <td class="period">职工养老保险盈余率</td>
                    <td><el-input v-model="datas.param312" :disabled="disabled" /></td>
                  </tr>
                  <tr>
                    <td class="period">城乡居民养老保险盈余率</td>
                    <td><el-input v-model="datas.param313" :disabled="disabled" /></td>
                  </tr>
                  <tr>
                    <td class="period">职工医疗保险盈余率</td>
                    <td><el-input v-model="datas.param314" :disabled="disabled" /></td>
                  </tr>
                  <tr>
                    <td class="period">城乡居民医疗保险盈余率</td>
                    <td><el-input v-model="datas.param315" :disabled="disabled" /></td>
                  </tr>
                </tbody>
                <tbody style="backgroundColor:#d9e1f2">
                  <tr>
                    <td rowspan="6" style="width:20%;font-weight:600;textAlign:center;">五、预算管理指数</td>
                    <td class="period">收入预决算偏离度</td>
                    <td><el-input v-model="datas.param316" :disabled="disabled" /></td>
                  </tr>
                  <tr>
                    <td class="period">支出预决算偏离度</td>
                    <td><el-input v-model="datas.param317" :disabled="disabled" /></td>
                  </tr>
                  <tr>
                    <td class="period">暂付款清理率</td>
                    <td><el-input v-model="datas.param318" :disabled="disabled" /></td>
                  </tr>
                  <tr>
                    <td class="period">月度库款保障水平均数</td>
                    <td><el-input v-model="datas.param319" :disabled="disabled" /></td>
                  </tr>
                  <tr>
                    <td class="period">一般公共预算调整率</td>
                    <td><el-input v-model="datas.param320" :disabled="disabled" /></td>
                  </tr>
                  <tr>
                    <td class="period">政府性基金预算调整率</td>
                    <td><el-input v-model="datas.param321" :disabled="disabled" /></td>
                  </tr>
                </tbody>
                <tbody style="backgroundColor:#e2efda">
                  <tr>
                    <td rowspan="6" style="width:20%;font-weight:600;textAlign:center;">六、财政保障指数</td>
                    <td class="period">“三保”预算占比</td>
                    <td><el-input v-model="datas.param322" :disabled="disabled" /></td>
                  </tr>
                  <tr>
                    <td class="period">“三保”预算偏离度</td>
                    <td><el-input v-model="datas.param323" :disabled="disabled" /></td>
                  </tr>
                  <tr>
                    <td class="period">刚性支出占比</td>
                    <td><el-input v-model="datas.param324" :disabled="disabled" /></td>
                  </tr>
                  <tr>
                    <td class="period">保工资支出占比</td>
                    <td><el-input v-model="datas.param325" :disabled="disabled" /></td>
                  </tr>
                  <tr>
                    <td class="period">保运转支出占比</td>
                    <td><el-input v-model="datas.param326" :disabled="disabled" /></td>
                  </tr>
                  <tr>
                    <td class="period">保工资支出占比</td>
                    <td><el-input v-model="datas.param327" :disabled="disabled" /></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </template>
    </BsMainFormListLayout>
    <BsOperationLog :logs-data="logData" :show-log-view="showLogView" />
    <!-- 附件弹框 -->
    <BsAttachment v-if="showAttachmentDialog" refs="attachmentboss" :user-info="userInfo" :billguid="billguid" />
    <GlAttachment
      v-if="showGlAttachmentDialog"
      :user-info="userInfo"
      :billguid="billguid"
    />
    <ImportModel
      :file-config="fileConfig"
      :import-modal-visible.sync="importModalVisible"
      @onDownloadTemplateClick="onDownloadTemplateClick"
      @onImportClick="onImportClick"
      @onImportFileClick="onImportFileClick"
    />
  </div>
</template>

<script>
import { proconf } from './FinancialBasicTableEntry'
import HttpModule from '@/api/frame/main/Monitoring/FinancialBasicTableEntry.js'
import GlAttachment from '../common/GlAttachment'
import { Export } from '@/components/Table/export/export/export.js'
import { Import } from '@/components/Table/import/import/import.js'
import $print from './print.js'
import ImportModel from '@/components/Table/import/import.vue'
import importFunction from './function.js'
import moment from 'moment'
export default {
  components: {
    GlAttachment, ImportModel
  },
  data() {
    return {
      importModalVisible: false,
      fileConfig: {},
      hint: '',
      importData: '',
      askName: '',
      activeIndex: 0,
      tabbtn: ['基础表', '指标表'],
      basicTable: true,
      targetTable: false,
      queryConfig: proconf.highQueryConfig,
      searchDataList: proconf.highQueryData,
      showGlAttachmentDialog: false,
      declareCode: '',
      radioShow: true,
      breakRuleVisible: false,
      treeTypeConfig: {
        curRadio: 'AGENCY'
      },
      treeGlobalConfig: {
        inputVal: ''
      },
      treeQueryparams: { elementcode: 'admdiv', province: '610000000', year: '2021', wheresql: 'and code like \'' + 61 + '%\'' },
      treeServerUri: 'http://10.77.18.172:32303/v2/basedata/simpletree/where',
      treeAjaxType: 'get',
      treeData: [],
      leftTreeVisible: true,
      // 头部工具栏 BsTabPanel config
      toolBarStatusBtnConfig: {
        changeBtns: true,
        buttons: proconf.toolBarStatusButtons,
        curButton: {
          type: 'button',
          iconName: 'base-all.png',
          iconNameActive: 'base-all-active.png',
          iconUrl: '',
          label: '未提交',
          code: '0',
          curValue: '0'
        },
        buttonsInfo: proconf.statusRightToolBarButton,
        methods: {
          bsToolbarClickEvent: this.onStatusTabClick
        }
      },
      buttonsInfo: proconf.statusRightToolBarButtonByBusDept,
      tabStatusNumConfig: {
        '1': 0,
        '2': 0,
        '3': 0
      },
      isShowQueryConditions: true,
      toolBarStatusSelect: {
        type: 'button',
        iconName: 'base-all.png',
        iconNameActive: 'base-all-active.png',
        iconUrl: '',
        label: '未提交',
        code: '0',
        curValue: '0'
      },
      // table 相关配置
      tableLoading: false,
      tableColumnsConfig: proconf.PoliciesTableColumns,
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
          $gloableOptionRow: proconf.gloableOptionRow
        },
        methods: {
          onOptionRowClick: this.onOptionRowClick
        }
      },
      tableFooterConfig: {
        showFooter: false
      },
      // 操作日志
      logData: [],
      showLogView: false,
      // 新增弹窗
      dialogVisible: false,
      dialogTitle: '新增',
      addTableData: [],
      modifyData: {},
      // 请求 & 角色权限相关配置
      menuName: '',
      params5: '',
      menuId: '',
      tokenid: '',
      userInfo: {},
      roleguid: this.$store.state.curNavModule.roleguid,
      appId: 'pay_voucher',
      isHaveZero: '0',
      // 文件
      showAttachmentDialog: false,
      billguid: '',
      condition: {},
      mofDivCodes: [],
      mofDivCode: '',
      leftTreeConfig: { // 左侧单位树配置
        showFilter: false, // 是否显示过滤
        isInitLoadData: false,
        scrollLoad: false, // 是否开启滚动加载
        isleaf: 0, // 指定节点是否为叶子节点，仅在指定了 lazy 属性的情况下生效
        levelno: -1, // 可选层级
        valueKeys: ['code', 'name', 'id'],
        format: '{code}-{name}',
        placeholder: '请选择',
        multipleValueType: 'String', // 多选值类型 String[逗号分割]，Array //废弃
        treeProps: {
          // 树配置选项
          labelFormat: '{label}', // {code}-{name}
          nodeKey: 'code', // 树的主键
          label: 'name', // 树的显示lalel字段
          children: 'children' // 树的嵌套字段
        },
        multiple: false, // 是否多选,
        isLazeLoad: false, // 是否调用接口远程懒加载数据
        readonly: true,
        clearable: true,
        codeList: []
      },
      month: '',
      disabled: false,
      datas: {},
      datas1: {
        // 基础表字段
        registeredResidencePeriod: '',
        registeredResidence: '',
        residentPopulation: '',
        residentPopulationPeriod: '',
        gdpFirst: '',
        gdpFirstPeriod: '',
        gdpSecond: '',
        gdpSecondPeriod: '',
        gdpThird: '',
        gdpThirdPeriod: '',
        gdpGrowth: '',
        gdpGrowthPeriod: '',
        industrialOutput: '',
        industrialOutputPeriod: '',
        risingOutput: '',
        risingOutputPeriod: '',
        coalMining: '',
        coalMiningPeriod: '',
        oilGasExtraction: '',
        oilGasExtractionPeriod: '',
        equipmentManufacturing: '',
        equipmentManufacturingPeriod: '',
        otherIndustry: '',
        otherIndustryPeriod: '',
        fixedAssetsFirstGrowthPeriod: '',
        fixedAssetsFirstGrowth: '',
        fixedAssetsSecondGrowthPeriod: '',
        fixedAssetsSecondGrowth: '',
        fixedAssetsThirdGrowthPeriod: '',
        fixedAssetsThirdGrowth: '',
        fixedAssetsInfrastructureGrowthPeriod: '',
        fixedAssetsInfrastructureGrowth: '',
        fixedAssetsPrivateInvestmentGrowthPeriod: '',
        fixedAssetsPrivateInvestmentGrowth: '',
        fixedAssetsRealEstateGrowthPeriod: '',
        fixedAssetsRealEstateGrowth: '',
        fixedAssetsFirstPeriod: '',
        fixedAssetsFirst: '',
        fixedAssetsSecondPeriod: '',
        fixedAssetsSecond: '',
        fixedAssetsThirdPeriod: '',
        fixedAssetsThird: '',
        fixedAssetsInfrastructurePeriod: '',
        fixedAssetsInfrastructure: '',
        fixedAssetsPrivateInvestmentPeriod: '',
        fixedAssetsPrivateInvestment: '',
        fixedAssetsRealEstatePeriod: '',
        fixedAssetsRealEstate: '',
        retailTotalPeriod: '',
        retailTotal: '',
        exportTotalPeriod: '',
        exportTotal: '',
        importTotalPeriod: '',
        importTotal: '',
        electricityConsumptionPeriod: '',
        electricityConsumption: '',
        depositBalancePeriod: '',
        depositBalance: '',
        loanBalancePeriod: '',
        loanBalance: '',
        pmiIndexPeriod: '',
        pmiIndex: '',
        cpiIndexPeriod: '',
        cpiIndex: '',
        ppiIndexPeriod: '',
        ppiIndex: '',
        unemploymentRatePeriod: '',
        unemploymentRate: '',
        param1: '',
        param2: '',
        param3: '',
        param4: '',
        param5: '',
        param6: '',
        param7: '',
        param8: '',
        param9: '',
        param10: '',
        param11: '',
        param12: '',
        param13: '',
        param14: '',
        param15: '',
        param16: '',
        param17: '',
        param18: '',
        param19: '',
        param20: '',
        param21: '',
        param22: '',
        param23: '',
        param24: '',
        param25: '',
        param26: '',
        param27: '',
        param28: '',
        param29: '',
        param30: '',
        param31: '',
        param32: '',
        param33: '',
        param34: '',
        param35: '',
        param36: '',
        param37: '',
        param38: '',
        param39: '',
        param40: '',
        param41: '',
        param42: '',
        param43: '',
        param44: '',
        param45: '',
        param46: '',
        param47: '',
        param48: '',
        param49: '',
        param50: '',
        param51: '',
        param52: '',
        param53: '',
        param54: '',
        param55: '',
        param56: '',
        param57: '',
        param58: '',
        param59: '',
        param60: '',
        param61: '',
        param62: '',
        param63: '',
        param64: '',
        param65: '',
        param66: '',
        param67: '',
        param68: '',
        param69: '',
        param70: '',
        param71: '',
        param72: '',
        param73: '',
        param74: '',
        param75: '',
        param76: '',
        param77: '',
        param78: '',
        param79: '',
        param80: '',
        param81: '',
        param82: '',
        param83: '',
        param84: '',
        param85: '',
        param86: '',
        param87: '',
        param88: '',
        param89: '',
        param90: '',
        param91: '',
        param92: '',
        param93: '',
        param94: '',
        param95: '',
        param96: '',
        param97: '',
        param98: '',
        param99: '',
        param100: '',
        param101: '',
        param102: '',
        param103: '',
        param104: '',
        param105: '',
        param106: '',
        param107: '',
        param108: '',
        param109: '',
        param110: '',
        param111: '',
        param112: '',
        param113: '',
        param114: '',
        param115: '',
        param116: '',
        param117: '',
        param118: '',
        param119: '',
        param120: '',
        param121: '',
        param122: '',
        param123: '',
        param124: '',
        param125: '',
        param126: '',
        param127: '',
        param128: '',
        param129: '',
        param130: '',
        param131: '',
        param132: '',
        param133: '',
        param134: '',
        param135: '',
        param136: '',
        param137: '',
        param138: '',
        param139: '',
        param140: '',
        param141: '',
        param142: '',
        param143: '',
        param144: '',
        param145: '',
        param146: '',
        param147: '',
        param148: '',
        param149: '',
        param150: '',
        param151: '',
        param152: '',
        param153: '',
        param154: '',
        param155: '',
        param156: '',
        param157: '',
        param158: '',
        param159: '',
        param160: '',
        param161: '',
        param162: '',
        param163: '',
        param164: '',
        param165: '',
        param166: '',
        param167: '',
        param168: '',
        param169: '',
        param170: '',
        param171: '',
        param172: '',
        param173: '',
        param174: '',
        param175: '',
        param176: '',
        param177: '',
        param178: '',
        param179: '',
        param180: '',
        param181: '',
        param182: '',
        param183: '',
        param184: '',
        param185: '',
        param186: '',
        param187: '',
        param188: '',
        param189: '',
        param190: '',
        param191: '',
        param192: '',
        param193: '',
        param194: '',
        param195: '',
        param196: '',
        param197: '',
        param198: '',
        param199: '',
        param200: '',
        param201: '',
        param202: '',
        param203: '',
        param204: '',
        param205: '',
        param206: '',
        param207: '',
        param208: '',
        param209: '',
        param210: '',
        param211: '',
        param212: '',
        param213: '',
        param214: '',
        param215: '',
        param216: '',
        param217: '',
        param218: '',
        param219: '',
        param220: '',
        param221: '',
        param222: '',
        param223: '',
        param224: '',
        param225: '',
        param226: '',
        param227: '',
        param228: '',
        param229: '',
        param230: '',
        param231: '',
        param232: '',
        param233: '',
        param234: '',
        param235: '',
        param236: '',
        param237: '',
        param238: '',
        param239: '',
        param240: '',
        param241: '',
        param242: '',
        param243: '',
        param244: '',
        param245: '',
        param246: '',
        param247: '',
        param248: '',
        param249: '',
        param250: '',
        param251: '',
        param252: '',
        param253: '',
        param254: '',
        param255: '',
        param256: '',
        param257: '',
        param258: '',
        param259: '',
        param260: '',
        param261: '',
        param262: '',
        param263: '',
        param264: '',
        param265: '',
        param266: '',
        param267: '',
        param268: '',
        param269: '',
        param270: '',
        param271: '',
        param272: '',
        param273: '',
        param274: '',
        param275: '',
        param276: '',
        param277: '',
        param278: '',
        param279: '',
        param280: '',
        param281: '',
        param282: '',
        param283: '',
        param284: '',
        param285: '',
        param286: '',
        param287: '',
        param288: '',
        param289: '',
        param290: '',
        param291: '',
        param292: '',
        param293: '',
        param294: '',
        param295: '',
        param296: '',
        param336: '',
        param337: '',
        param338: '',
        param339: '',
        param340: '',
        param341: '',
        param342: '',
        param343: '',
        param344: '',
        param345: '',
        param346: '',
        param347: '',
        param348: '',
        param349: '',
        param350: '',
        param351: '',
        param352: '',
        param353: '',
        param354: '',
        param355: '',
        param356: '',
        param357: '',
        param358: '',
        param359: '',
        param360: '',
        param361: '',
        param362: '',
        param363: '',
        param364: '',
        param365: '',
        // 指标表数据
        param297: '',
        param298: '',
        param299: '',
        param300: '',
        param301: '',
        param302: '',
        param303: '',
        param304: '',
        param305: '',
        param306: '',
        param307: '',
        param308: '',
        param309: '',
        param310: '',
        param311: '',
        param312: '',
        param313: '',
        param314: '',
        param315: '',
        param316: '',
        param317: '',
        param318: '',
        param319: '',
        param320: '',
        param321: '',
        param322: '',
        param323: '',
        param324: '',
        param325: '',
        param326: '',
        param327: '',
        param328: '',
        param329: '',
        param330: '',
        param331: '',
        param332: '',
        param333: '',
        param334: '',
        param335: ''
      },
      provinceName: ''
    }
  },
  mounted() {
    let date = new Date()
    this.month = Number(date.getMonth()) + 1
    this.searchDataList.month = this.month
    this.datas = this.datas1
    this.$Export = new Export({ unit: '元' })
    this.$Import = new Import()
  },
  methods: {
    ...importFunction,
    // 初始化高级查询data
    getSearchDataList() {
      // 下拉树
      let searchDataObj = {}
      this.queryConfig.forEach(item => {
        if (item.itemRender.name === '$formTreeInput' || item.itemRender.name === '$vxeTree') {
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
      this.queryConfig.forEach(item => {
        if (item.itemRender.name === '$formTreeInput' || item.itemRender.name === '$vxeTree') {
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
          } else if (typeof (this.searchDataList[key]) === 'string') {
            if (this.searchDataList[key].trim() !== '') {
              this.searchDataList[key].split(',').forEach(item => {
                condition[key].push(item)
              })
            }
          }
        }
      }
      if (this.searchDataList.dataSourceName && this.searchDataList.dataSourceName.trim() !== '') {
        condition.dataSourceName = this.searchDataList.dataSourceName
      }
      if (this.searchDataList.businessModuleName && this.searchDataList.businessModuleName.trim() !== '') {
        condition.businessModuleName = this.searchDataList.businessModuleName
      }
      this.condition = condition
      console.log(this.condition)
      this.month = Number(this.condition.month[0]) || moment().month() + 1
      this.searchDataList.month = this.month
      this.queryTableDatas()
    },
    // tab切换
    tabClick(index) {
      this.activeIndex = index
      if (this.activeIndex === 0) {
        this.basicTable = true
        this.targetTable = false
      } else if (this.activeIndex === 1) {
        this.basicTable = false
        this.targetTable = true
      }
    },
    getLeftTreeData() {
      console.log('getLeftTreeData')
      let that = this
      let params = {}
      if (this.userInfo.province === '610000000') {
        params = {
          elementcode: 'admdiv',
          province: '610000000',
          year: '2021',
          wheresql: 'and code like \'' + 61 + '%\''
        }
      } else if (
        this.userInfo.province === '610100000' ||
        this.userInfo.province === '610100000' ||
        this.userInfo.province === '610200000' ||
        this.userInfo.province === '610300000' ||
        this.userInfo.province === '610400000' ||
        this.userInfo.province === '610500000' ||
        this.userInfo.province === '610600000' ||
        this.userInfo.province === '610700000' ||
        this.userInfo.province === '610800000' ||
        this.userInfo.province === '610900000' ||
        this.userInfo.province === '611000000' ||
        this.userInfo.province === '611200000'
      ) {
        params = {
          elementcode: 'admdiv',
          province: this.userInfo.province,
          year: this.userInfo.year,
          wheresql: 'and code like \'' + this.userInfo.province.substring(0, 4) + '%\''
        }
      } else {
        params = {
          elementcode: 'admdiv',
          province: this.userInfo.province,
          year: this.userInfo.year,
          wheresql: 'and code like \'' + this.userInfo.province.substring(0, 6) + '%\''
        }
      }
      HttpModule.getLeftTree(params).then(res => {
        if (res.rscode === '000000') {
          let treeResdata = that.getChildrenData(res.data)
          that.treeData = treeResdata
        } else {
          this.$message.error('左侧树加载失败')
        }
      })
    },
    getChildrenData(datas) {
      let that = this
      datas.forEach(item => {
        item.label = item.text
        if (item.children) {
          that.getChildrenData(item.children)
        }
      })

      return datas
    },
    // 切换状态栏
    onStatusTabClick(obj) {
      if (!obj.type) {
        this.operationToolbarButtonClickEvent(obj)
        return
      }
      this.toolBarStatusSelect = obj
      switch (obj.curValue) {
        // 待批复
        case '0':
          this.radioShow = true
          this.disabled = false
          break
        case '1':
          this.radioShow = true
          this.disabled = true
          break
      }
      this.condition = {}
      this.mainPagerConfig.currentPage = 1
      this.refresh()
    },
    // 切换操作按钮
    operationToolbarButtonClickEvent(obj, context, e) {
      console.log(obj.code)
      switch (obj.code) {
        // 保存
        case 'save':
          this.save()
          break
        // 提交
        case 'confirm':
          this.confirm()
          break
        case 'revoke':
          this.revoke()
          break
        case 'export':
          this.export()
          break
        case 'import':
          this.import()
          break
        case 'print':
          this.print()
          break
        default:
          break
      }
    },
    print() {
      let divNode = ''
      if (this.basicTable) {
        divNode = document.getElementById('printDiv1')
      } else {
        divNode = document.getElementById('printDiv2')
      }
      $print(divNode)
    },
    export() {
      let exportModalFormData = {
        saveType: '.xlsx',
        fileName: 'export', // 文件名
        dataType: 'fullData',
        isExportOnlySourceField: false, // 是否只导出数据源表头字段，
        isExportOnlyViewTitle: false, // 是否只导出数据表头名称，
        isExportHead: true, // 是否导出表头
        exportViewTitleType: 'nestTitle',
        isExportFooter: false, // 是否导出表尾部
        isExportOriginalData: true, // 是否导出源数据
        isExportData: true, // 是否导出数据
        columns: proconf.columns, // 表头配置
        fullData: [],
        datas: [],
        selection: [], // 选中数据
        isExportTree: true, // 是否是树形数据
        index: true, // 是否添加序号,
        ignoreColsTypes: [], // 忽略导出的列类型
        viewValueFormat(value, row, column) {
          // 视图数据格式化方法
          // return value
        }
      }
      exportModalFormData.fullData.push(this.datas)
      exportModalFormData.datas.push(this.datas)
      this.$Export.exportExcel(exportModalFormData, this)
    },
    import() {
      this.importModalVisible = true
    },
    onDownloadTemplateClick() {
      this.export()
    },
    async onImportFileClick() {
      // 导入文件
      let self = this
      await this.$Import.importExcel({
      }, (result, filename) => {
        // this.tableDataIn = result
        this.$message.success('导入成功,请点击导入按钮保存')
        self.importData = result
        self.fileConfig.fileName = filename
        console.log(result)
      })
    },
    onImportClick() {
      // 导入提交
      if (this.importData === '') {
        this.$XModal.message({ status: 'error', message: '无数据导入请重新导入数据！' })
      } else {
        this.importModalVisible = false
        console.log(importFunction)
        Object.assign(this.datas, this.getImportData(this.importData['视图数据'][3]))
        console.log(this.datas)
        this.importData = ''
        this.fileConfig = {}
      }
    },
    changeVisible(val) {
      console.log(val, '输出')
      this.breakRuleVisible = val
    },
    // table 右侧操作按钮
    onOptionRowClick({ row, optionType }, context) {
      // console.log(context.$parent.$parent.$parent)
      switch (optionType) {
        // 新增
        case 'add':
          this.clickAddBtn(row)
          break
        // 操作日志
        case 'report':
          this.queryActionLog(row)
          break
        // 附件
        case 'attachment':
          this.showAttachment(row)
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
    // 左侧树
    changeInput(val) {
      this.treeGlobalConfig.inputVal = val
    },
    getItem(code, data) {
      data.forEach(item => {
        if (code === item.code) {
          let data = []
          data.push(item)
          this.getCodeList(data)
        } else if (item.children) {
          this.getItem(code, item.children)
        }
      })
    },
    getCodeList(data) {
      data.forEach(item => {
        this.codeList.push(item.code)
        if (item.children) {
          this.getCodeList(item.children)
        }
      })
    },
    onClickmethod(node) {
      let code = node.node.code
      if (node.id !== '0') {
        console.log(node)
        this.mofDivCode = code
        this.provinceName = node.node.name
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
      console.log('查看附件')
      if (row.declareCode === null || row.declareCode === '') {
        this.$message.warning('该数据无附件')
        return
      }
      this.billguid = row.declareCode
      // this.showAttachmentDialog = true
      this.showGlAttachmentDialog = true
    },
    // 查看附件
    showAttachment1(row) {
      this.billguid = row
      this.showGlAttachmentDialog = true
    },
    // 表格单元行单击
    cellClick(obj, context, e) {
      let key = obj.column.property
      console.log(key, obj.row)
      switch (key) {
      }
    },
    // 刷新按钮 刷新查询栏，提示刷新 table 数据
    refresh() {
      this.queryTableDatas()
    },
    ajaxTableData({ params, currentPage, pageSize }) {
      this.mainPagerConfig.currentPage = currentPage
      this.mainPagerConfig.pageSize = pageSize
      this.queryTableDatas()
    },
    // 展开折叠查询框
    onQueryConditionsClick(isOpen) {
      this.isShowQueryConditions = isOpen
    },
    queryTableDatasCount() {
      const params = {
        menuId: this.$store.state.curNavModule.guid
      }
      HttpModule.queryTableDatasCount(params).then(res => {
        if (res.code === '000000') {
          this.tabStatusNumConfig['1'] = res.data.waitFlowCount
          this.tabStatusNumConfig['2'] = res.data.alreadyFlowCount
          this.tabStatusNumConfig['3'] = res.data.allFlowCount
        } else {
          this.$message.error(res.message)
        }
      })
    },
    save() {
      const params = {
        mofDivCode: this.mofDivCode,
        fiscalYear: this.userInfo.year,
        month: this.month,
        datas: this.datas
      }
      this.tableLoading = true
      HttpModule.save(params).then(res => {
        this.tableLoading = false
        if (res.code === '000000') {
          this.$message.success('保存成功')
          this.queryTableDatas()
        } else {
          this.$message.error(res.message)
        }
      })
    },
    confirm() {
      const params = {
        mofDivCode: this.mofDivCode,
        fiscalYear: this.userInfo.year,
        month: this.month,
        datas: this.datas
      }
      this.$confirm('是否确定提交 ?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.tableLoading = true
        HttpModule.confirm(params).then(res => {
          this.tableLoading = false
          if (res.code === '000000') {
            this.$message.success('提交成功')
            this.queryTableDatas()
          } else {
            this.$message.error(res.message)
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    revoke() {
      const params = {
        id: this.datas.id
      }
      this.$confirm('是否确定撤回 ?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.tableLoading = true
        HttpModule.revoke(params).then(res => {
          this.tableLoading = false
          if (res.code === '000000') {
            this.$message.success('撤回成功')
            this.queryTableDatas()
          } else {
            this.$message.error(res.message)
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    // 查询 table 数据
    queryTableDatas() {
      const param = {
        mofDivCode: this.mofDivCode,
        fiscalYear: this.userInfo.year,
        month: this.month,
        status: this.toolBarStatusSelect.curValue
      }
      this.tableLoading = true
      HttpModule.queryTableDatas(param).then(res => {
        this.tableLoading = false
        if (res.code === '000000') {
          if (res.data === null) {
            this.datas = {}
            console.log(this.datas)
            return
          }
          this.datas = res.data.portraitBaseInfoEntity
          this.hint = res.data.hint
          console.log(this.datas)
          // this.datas = res.data
          if (res.data.status === 0) {
            this.disabled = false
          } else if (res.data.status === 1) {
            if (this.toolBarStatusSelect.curValue === '0') {
              this.$message.warning('当前数据已提交')
            }
            this.disabled = true
          }
        } else {
          this.$message.error(res.message)
        }
      })
    },
    // 操作日志
    queryActionLog(row) {
      const param = {
        menuId: this.$store.state.curNavModule.guid,
        menuName: this.$store.state.curNavModule.name,
        declareCode: row.declareCode
      }
      HttpModule.queryActionLog(param).then(res => {
        this.logData = res.data
        console.log(this.logData)
        this.showLogView = true
      })
    }
  },
  created() {
    let month = moment().month() + 1
    this.searchDataList.month = month
    // this.params5 = commonFn.transJson(this.$store.state.curNavModule.param5)
    this.menuId = this.$store.state.curNavModule.guid
    this.roleguid = this.$store.state.curNavModule.roleguid
    this.tokenid = this.$store.getters.getLoginAuthentication.tokenid
    this.userInfo = this.$store.state.userInfo
    console.log(this.userInfo)
    this.provinceName = this.$store.state.userInfo.admdivname
    this.getLeftTreeData()
  },
  watch: {
    queryConfig() {
      this.getSearchDataList()
    }
  }
}
</script>
<style scoped lang="scss">
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
.setbtn{
    width:10%;
    height:45px;
    float:left;
    margin-right:20px;
  }
  .tabone{
    width:100%;
    height:40px;
    text-align:center;
    line-height:40px;
    float:left;
    border:1px solid #ccc;
    border-radius:4px;
    font-size: 16px;
  }
  .title{
    float:left;
    width:70%;
  }
  .tabone1{
    width:100%;
    height:40px;
    text-align:center;
    line-height:40px;
    float:left;
    border:1px solid #ccc;
    background-color:#f2f2f2;
    border-radius:4px;
    font-size: 16px;
  }
  .basicTable{
    width: 100%;
    height: 300px;
    font-size: 16px;
    border-collapse: collapse;
    border: 1px solid #000000;
  }
  tr {
    border: none
  }
  td {
      border: 1px solid #000000;
      text-align: left
    }
  .period {
    text-align:center;
  }
/deep/.el-input__inner {
  color: #606266 !important;
}
.table-toolbar-contro-leftvisible {
      line-height: 45px;
      float: left;
      margin-right: 16px;
      height: 45px;
      width: 32px;
      cursor: pointer;
      border-radius: 2px;
      background-color: var(--primary-color);
      font-family: 'remixicon' !important;
      font-style: normal;
      font-size: 18px;
      color: #fff;
      text-align: center;
      background-size: 100% 100%;
}
.table-toolbar-contro-leftvisible::before {
  content: '\ee55';
}
</style>
