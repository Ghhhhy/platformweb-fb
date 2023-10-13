<template>
  <div class="map-shanxi-container">
    <div
      class="map-tips"
    >
      <svg-icon name="map-top-border" class-name="map-tips-top-border" />
      <svg-icon name="map-bottom-border" class-name="map-tips-bottom-border" />
      <div class="map-tips-title">{{ mapTipsInfo.title.replace('本级','') }}预警数量</div>
      <!--该容器用来显示超出滚动条 最多展示十个-->
      <div
        class="map-tips-scroll"
        :style="{ maxHeight: `${expendState ? Math.min(mapTipsInfo.detail.length, 11) * 36 : 'auto'}px` }"
      >
        <!--真实承载内容高度容器-->
        <div
          class="map-tips-detial"
          :style="{ height: expendState ? `${mapTipsInfo.detail.length * 36}px` : mapTipsInfo.detail.length > 3 ? '108px' : 'auto' }"
        >
          <div
            v-for="(item, index) in mapTipsInfo.detail"
            :key="index"
            class="map-tips-detial-item"
          >
            <span class="map-tips-detial-item-label">{{ item.mofDivName }}</span>
            <span class="map-tips-detial-item-value">{{ item.warnCount }}</span>
          </div>
        </div>
      </div>
      <svg-icon
        v-show="mapTipsInfo.detail.length > 3"
        name="map-arrow"
        :class-name="['map-tips-arrow', { 'map-tips-arrow-close': expendState }]"
        @click.native="mapTipsTrigger"
      />
    </div>
    <div ref="shanxiMapRef" class="shanxi-map" style="width: 515px; height: 586px"></div>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import { useMap } from '../hooks/useMap'

export default defineComponent({
  setup() {
    const {
      shanxiMapRef,
      mapTipsInfo,
      expendState,
      mapTipsTrigger
    } = useMap()
    return {
      shanxiMapRef,
      mapTipsInfo,
      expendState,
      mapTipsTrigger
    }
  }
})
</script>

<style lang="scss" scoped>
.map-shanxi-container {
  position: relative;

  .map-tips {
    position: absolute;
    top: 0;
    left: 10px;
    width: 220px;
    padding: 24px 0 0px;
    border-left: 1px solid #5D80FF;
    border-right: 1px solid #5D80FF;
    background: rgba(255, 255, 255, 0.5);
    z-index: 10;
    box-sizing: border-box;

    .map-tips-scroll {
      padding: 0 15px;
      overflow-y: auto;
      overflow-x: hidden;
      box-sizing: border-box;
      &::-webkit-scrollbar-track-piece {
        background-color:transparent;
      }
      &::-webkit-scrollbar {
        width: 6px;
      }
    }

    .map-tips-detial {
      width: 190px;
    }

    .map-tips-arrow {
      transition: all 0.3s;

      &.map-tips-arrow-close {
        transform: rotate(-180deg);
      }
    }

    &-top-border {
      position: absolute;
      top: -1px;
      left: -1px;
      width: 220px;
    }

    &-bottom-border {
      position: absolute;
      bottom: -2px;
      left: -1px;
      width: 220px;
    }

    &-title {
      margin-bottom: 10px;
      font-size: 16px;
      color: #2E3133;
      text-align: center;
      font-weight: 400;
    }

    &-detial {
      height: 108px;
      transition: all 0.3s;
      overflow: hidden;
    }

    &-detial-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 36px;
      border-bottom: 1px dashed #979797;
      font-size: 16px;
      color: #2E3133;
      line-height: 36px;
      box-sizing: border-box;

      &-value {
        color: #5D80FF;
        font-weight: 400;
        font-family: var(--font-family-hyt);
      }

      &-value,
      &-label {
        flex-shrink: 0;
      }
    }

    &-arrow {
      display: block;
      margin:0 auto;
      padding: 10px 20px 12px;
      font-size: 13px;
      cursor: pointer;
      transition: all 0.3s;

      &-up {
        transform: rotate(-180deg);
      }
    }
  }
}
</style>
