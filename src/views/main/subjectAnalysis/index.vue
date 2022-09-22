<template>
  <div class="subject-analysis">
    <div class="subject-analysis-body">
      <header class="subject-analysis-header">{{ $route.query.menuName }}主题分析</header>
      <main>
        <div class="subject-analysis-main-top">
          <div
            class="subject-analysis-top-left"
          >
            <div
              class="chart-title"
              @click.stop="menuClick({
                name: '统计分析查询（按区划汇总）',
                index: 0,
              })"
            >
              统计分析查询（按区划汇总）
            </div>
            <AdminDivSummarize />
          </div>
          <div class="subject-analysis-top-right">
            <div
              class="chart-title"
              @click.stop="menuClick({
                name: '统计分析查询（按预警级别）',
                index: 1,
              })"
            >
              统计分析查询（按预警级别）
            </div>
            <WarningLevel />
          </div>
        </div>
        <div class="subject-analysis-main-bottom">
          <div class="subject-analysis-main-bottom-left">
            <div
              class="chart-title"
              @click.stop="menuClick({
                name: '统计分析查询（按区划）',
                index: 2,
              })"
            >
              统计分析查询（按区划）
            </div>
            <AdminDivBar />
          </div>
          <i class="cut-line"></i>
          <div class="subject-analysis-main-bottom-right">
            <AdminDivScatter />
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import AdminDivBar from './components/AdminDivBar'
import AdminDivSummarize from './components/AdminDivSummarize'
import WarningLevel from './components/WarningLevel'
import AdminDivScatter from './components/AdminDivScatter'

import store from '@/store'
import { menuModelData } from '../warningOverview/modal/data'
// import { useComputedChartWidth } from '@/views/main/financial-portrayal/hooks/useComputedChartWidth'

export default defineComponent({
  components: {
    AdminDivBar,
    AdminDivSummarize,
    WarningLevel,
    AdminDivScatter
  },
  setup(_, { root }) {
    const route = root.$route

    /**
     * 点击跳转报表
     * @param route
     */
    const menuClick = (obj) => {
      const menu = menuModelData.find(item => item.name === route.query?.menuName)
      if (!menu) return
      const params = {
        ...obj,
        // code必填，但是值随便都起作用
        code: '1',
        url: menu.report[obj.index]
      }
      store.commit('setCurMenuObj', params)
    }

    // useComputedChartWidth(null, '.subject-analysis')

    return {
      menuClick
    }
  }
})
</script>

<style lang="scss" scoped>
.subject-analysis {
  padding: 0 24px 24px;
  box-sizing: border-box;

  .subject-analysis-body {
    max-width: 1872px;
    margin: 0 auto;

    .subject-analysis-top-left,
    .subject-analysis-top-right,
    .subject-analysis-main-bottom-left {
      position: relative;
      .chart-title {
        position: absolute;
        top: 0;
        left: 0;
        padding: 16px 0 0 24px;
        font-size: 16px;
        color: #595959;
        line-height: 26px;
        font-weight: 500;
        cursor: pointer;
        z-index: 10;

        &:hover {
          color: var(--primary-color);
        }
      }
    }
  }
  &-header {
    padding: 12px 0 10px;
    font-size: 22px;
    color: #595959;
    line-height: 34px;
    font-weight: bold;
    text-align: center;
  }

  .subject-analysis-main-top {
    display: flex;
    justify-content: space-between;
    width: 100%;

    .subject-analysis-top-left,
    .subject-analysis-top-right{
      width: 924px;
      height: 442px;
    }

    .subject-analysis-top-right {
      margin-left: 16px;
    }
  }
  .subject-analysis-main-bottom {
    display: flex;
    align-items: center;
    height: 440px;
    margin-top: 16px;
    background: #fff;

    .cut-line {
      display: inline-block;
      height: 300px;
      width: 1px;
      background: #D8D8D8;
    }

    .subject-analysis-main-bottom-left {
      width: 866px;
      height: 100%;
      margin-right: 16px;
    }
    .subject-analysis-main-bottom-right {
      width: 1006px;
      height: 100%;
    }
  }
}
</style>
