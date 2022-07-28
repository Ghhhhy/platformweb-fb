<template>
  <div class="financial-xmind-wrapper">
    <DetailTitle style="marginLeft: 16px;" title="财政收支情况" />
    <div class="xmind-main">
      <!-- 左侧明细 -->
      <div class="left-details">
        <XmindNodeDetail
          v-for="item in currentleftDetail"
          :key="`expend-${item.color}-${item.label}`"
          :info="item"
        />
      </div>
      <div class="flex-center">
        <!-- 支出 -->
        <div class="expend-wrapper">
          <!-- 支出系列 -->
          <div class="left-bg-nodes">
            <XmindBgNode
              v-for="item in expendBgNode"
              :key="item.label"
              :info="item"
              type="expend"
              @change="lastChildrenChange"
            />
          </div>
        </div>
        <!-- 支出垂直线 -->
        <i
          class="expend-vertical-line vertical-line"
          :style="{ height: `${verticalLineHeight.expend}px` }"
        ></i>
        <!-- 中心区域 -->
        <div class="xmind-center-main-wrapper">
          <XmindNodeDetail
            :info="financialTree.income"
            style="marginBottom: -6px; width: 145px;"
          />
          <div class="xmind-center-main-container">
            <XmindCenterMain />
          </div>
          <XmindNodeDetail
            :info="financialTree.expend"
            style="marginTop: -6px; width: 145px"
          />
        </div>
        <!-- 收入垂直线 -->
        <i
          class="income-vertical-line vertical-line"
          :style="{ height: `${verticalLineHeight.income}px`, marginTop: '24px' }"
        ></i>
        <!-- 收入 -->
        <div class="income-wrapper">
          <!-- 支出系列 -->
          <div class="right-bg-nodes">
            <XmindBgNode
              v-for="item in incomeBgNode"
              :key="item.label"
              :info="item"
              type="income"
              @change="lastChildrenChange"
            />
          </div>
        </div>
      </div>
      <!-- 右侧明细 -->
      <div class="left-details">
        <XmindNodeDetail
          v-for="(item, key) in currentRightDetail"
          :key="`income-${key}-${item.color}-${item.label}`"
          :info="item"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import DetailTitle from './DetailTitle'
import XmindNodeDetail from './XmindNodeDetail'
import XmindBgNode from './XmindBgNode'
import XmindCenterMain from './XmindCenterMain'

import { useXmind } from '../hooks/useXmind'
import { useVerticalHeight } from '../hooks/useVerticalHeight'
export default defineComponent({
  components: {
    DetailTitle,
    XmindNodeDetail,
    XmindBgNode,
    XmindCenterMain
  },
  setup() {
    const {
      financialTree,
      getJustifyDetail,
      currentleftDetail,
      currentRightDetail,
      expendBgNode,
      incomeBgNode
    } = useXmind()
    const { verticalLineHeight } = useVerticalHeight()
    const lastChildrenChange = (data) => {
      console.log(data)
    }
    return {
      financialTree,
      getJustifyDetail,
      currentleftDetail,
      currentRightDetail,
      expendBgNode,
      incomeBgNode,
      lastChildrenChange,
      verticalLineHeight
    }
  }
})
</script>

<style lang="scss" scoped>
  .flex-center {
    display: flex;
    align-items: center;
  }

  .financial-xmind-wrapper {
    padding: 16px 0;
    background: #fff;
    box-sizing: border-box;
    margin-bottom: 16px;
  }

  .xmind-main {
    display: flex;
    // justify-content: center;
    height: 750px;
    padding: 30px 45px;
    box-sizing: border-box;
    overflow: auto;

    &::-webkit-scrollbar {
      width: 10px;
    }

    /* 滚动槽 */
    &::-webkit-scrollbar-track {
      -webkit-box-shadow:inset006pxrgba(0,0,0,0.3);
      border-radius: 10px;
    }

    /* 滚动条滑块 */
    &::-webkit-scrollbar-thumb {
      border-radius: 10px;
      background: rgba(0,0,0,0.1);
      cursor: pointer;
      -webkit-box-shadow: inset006pxrgba(0,0,0,0.5);

      &:hover {
        background: rgba(0,0,0,0.08);
      }
    }

    &::-webkit-scrollbar-thumb:window-inactive {
      background: #CDDDFD ;
    }

    .left-details {
      display: flex;
      flex-direction: column;
    }

    .left-bg-nodes,
    .right-bg-nodes {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      margin-left: 10px;
    }

    .right-bg-nodes {
      align-items: flex-start;
      margin-left: 0;
      margin-right: 10px;
    }

    .vertical-line {
      width: 0;
      border-left: 1px dashed #475C91;
    }

    .expend-wrapper {
      margin-top: 60px;
      margin-left: 10px;
    }
    .income-wrapper {
      margin-top: -40px;
      margin-right: 10px;
    }
  }

  .xmind-center-main-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
</style>
