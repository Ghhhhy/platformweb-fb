<template>
  <div>
    <div class="f20 rule-swiper-title">实时触发规则滚动显示图</div>
    <div v-if="!news.length">
      <BsEmpty />
    </div>
    <div
      v-else
      class="rule-handle-container"
      @mouseenter="swiperEnterHandle"
      @mouseleave="swiperLeaveHandle"
    >
      <transition name="ruleSymbolShow">
        <div
          v-show="showRuleCurrentSymbol"
          class="rule-current-symbol"
        >
        </div>
      </transition>
      <div class="swiper-container swiper-no-swiping rule-swiper-container">
        <div class="swiper-wrapper">
          <div
            v-for="(item, index) in news"
            :key="index"
            class="swiper-slide rule-swiper-slide"
          >
            <el-tooltip class="item" effect="light" :content="`${item.fiRuleCode || item.firulecode}-${item.fiRuleName || item.firulename}`" placement="top-start">
              <div class="rule-content">{{ item.fiRuleCode || item.firulecode }}-{{ item.fiRuleName || item.firulename }}</div>
            </el-tooltip>
            <div class="right-time">
              <span>{{ item.createTime }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, unref, onMounted, onBeforeUnmount, watch, nextTick } from '@vue/composition-api'
import Swiper from 'swiper'

import { getLatestData } from '@/api/frame/main/warningOverview'

export default defineComponent({
  setup() {
    // 规则列表数据
    const news = ref([])

    // 定时器
    let timer = null
    // 间隔
    const interval = 60000 * 5

    const getLatestDataHandle = async () => {
      const { data } = await getLatestData()
      news.value = data || []
      timer = setInterval(async () => {
        const { data } = await getLatestData()
        news.value = data || []
      }, interval)
    }

    // 是否显示当前规则的图标
    const showRuleCurrentSymbol = ref(true)

    // swiper实例
    let swiperInstance = null

    // swiper参数配置
    const swiperOption = {
      direction: 'vertical',
      height: 240,
      slidesPerView: 5,
      // 循环切换
      loop: {
        loop: true,
        loopedSlides: 7
      },
      // 自动切换
      autoplay: {
        delay: 2000,
        disableOnInteraction: false
      },
      effects: {
        effect: 'fade'
      },
      // 切换速度
      speed: 400,
      touches: {
        simulateTouch: false
      },
      observer: true,
      observeParents: true,
      // 监听时间
      on: {
        slideChangeTransitionStart() {
          showRuleCurrentSymbol.value = false
        },
        slideChangeTransitionEnd() {
          showRuleCurrentSymbol.value = true
        }
      }
    }
    /**
     * 初始化swiper
     */
    const initSwiper = () => {
      nextTick(() => {
        swiperInstance = new Swiper('.rule-swiper-container', swiperOption)
      })
    }

    /**
     * 鼠标移入 => 暂停swiper
     */
    const swiperEnterHandle = () => {
      swiperInstance?.autoplay?.stop()
    }
    /**
     * 鼠标移出 => 开启swiper
     */
    const swiperLeaveHandle = () => {
      swiperInstance?.autoplay?.start()
    }

    /**
     * 禁止swiper
     */
    const disableSwiper = () => {
      swiperOption.loop = false
      swiperOption.autoplay = false
      swiperOption.enabled = false
      initSwiper()
    }

    /**
     * 启用swiper
     */
    const enableSwiper = () => {
      swiperOption.loop = { loop: true, loopedSlides: 7 }
      swiperOption.autoplay = { delay: 2000, disableOnInteraction: false }
      swiperOption.enabled = true
      initSwiper()
    }

    /**
     * 更像swiper
     */
    const updateSwiper = () => {
      unref(news)?.length <= 5 ? disableSwiper() : enableSwiper()
    }

    watch(news, () => {
      updateSwiper()
    }, { deep: true })

    onMounted(() => {
      getLatestDataHandle()
    })

    onBeforeUnmount(() => {
      timer && clearInterval(timer)
    })

    return {
      news,
      showRuleCurrentSymbol,
      swiperEnterHandle,
      swiperLeaveHandle
    }
  }
})
</script>

<style lang="scss" scoped>
.rule-swiper-title {
  padding: 16px 22px;
  font-size: 16px;
  color: #595959;
  line-height: 26px;
  font-weight: bold;
  box-sizing: border-box;
}
.rule-swiper-container {
  height: 240px;
  width: 100%;
  padding: 0 24px;
  box-sizing: border-box;

  .rule-swiper-slide {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 48px !important;
    border-top: 1px solid #e0e0e0;
    box-sizing: border-box;

    &:last-child {
      border-bottom: 1px solid #e0e0e0;
    }

    .rule-content {
      width: 362px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      font-size: 14px;
      color: #2E3133;
    }

    .right-time {
      font-size: 12px;
      color: #8A9299;
    }
  }
}

.rule-handle-container {
  position: relative;

  .rule-current-symbol {
    position: absolute;
    top: 0;
    left: 0;
    height: 48px;
    display: flex;
    align-items: center;
    border-left: 4px solid #2A8BFD;

    &::after {
      display: inline-block;
      width: 0;
      height: 0;
      margin-left: 2px;
      border: 6px solid transparent;
      border-left-color: #2A8BFD;
      content: '';
    }
  }
}

.ruleSymbolShow-leave, .ruleSymbolShow-enter-to {
  opacity: 1;
  transform: scale(1);
  transition: all 0.1s;
}
.ruleSymbolShow-leave-to, .ruleSymbolShow-enter {
  opacity: 0;
  transform: scale(0);
  transition: all 0.2s;
}
</style>
