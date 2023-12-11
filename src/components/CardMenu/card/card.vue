<template>
  <div class="card-content">
    <img :src="cardMenuIn.bgUrl" class="content-bg">
    <div class="card-title">
      <!-- <i
        class="fn-inline base-font base-base-info-icon custom-title-icon"
        :class="cardMenuIn.title.icon"
        :style="{ color: cardMenuIn.iconColor }"
      ></i> -->
      <div class="fn-inline base-font icon_box" :style="{ background: cardMenuIn.iconColor }">
        <img :src="getStyleLevel1(cardMenuIn.title)" alt="">
      </div>
      <span class="custom-title">{{ cardMenuIn.title.title }}</span>
    </div>
    <div class="card-btns">
      <el-button
        v-for="(item, index) in cardMenuIn.buttons"
        :key="index"
        class="card-btn"
        :class="[cardMenuIn.btnHoverColorName, activeBtn === `${cardMenuIn.type}-${item.code}` ? 'btn-active' : '']"
        :style="{ '--btn-btnColor': cardMenuIn.btnColor, '--btn-iconColor': cardMenuIn.iconColor }"
        @click.stop="onClickBtn(item)"
      >
        <i
          class="fn-inline base-font"
          :class="[item.icon, cardMenuIn.iconColorName]"
        ></i>
        <span>{{ item.title }}</span>
        <span v-if="item.code === 'agentItem' && getTodoCount(cardMenu)" class="btn-num todo-num-bg">{{ getTodoCount(cardMenu) > 99 ? '99+' : getTodoCount(cardMenu) }}</span>
        <span v-else-if="item.code !== 'agentItem' && item.num" class="btn-num">{{ item.num > 99 ? '99+' : item.num }}</span>
      </el-button>
    </div>
  </div>
</template>

<script>
import { extend } from '../utils'
import { getPinYinFirstCharacter } from '@/components/CardMenu/utils/pinyin'
import { defaultCardConfig, defaultCardData } from './config/config'
export default {
  name: 'Card',
  props: {
    cardGlobal: {
      type: Object,
      default() {
        return {}
      }
    },
    cardMenu: {
      type: Object,
      default() {
        return {}
      }
    },
    bsMenuClickEvent: {
      type: Function,
      default: function(obj, $this) {}
    },
    rowNo: {
      type: String,
      default() {
        return ''
      }
    },
    activeBtn: {
      type: String,
      default() {
        return ''
      }
    },
    seq: {
      type: String,
      default() {
        return ''
      }
    }
  },
  data() {
    return {
      cardGlobalIn: extend(true, {}, this.cardGlobal),
      cardMenuIn: extend(true, {}, this.cardMenu),
      rowNumber: this.rowNo,
      seqIn: this.seq
    }
  },
  computed: {

  },
  methods: {
    // 获取待办数量
    getTodoCount(cardMenu) {
      return this.$store.getters['todoInfo/getMenuTodoInfo'](cardMenu?.menu?.guid)?.totalCount || 0
    },
    // card按钮点击事件
    onClickBtn(obj = {}, index) {
      // 按钮触发，事件回调
      let newData = Object.assign({}, obj, { type: this.cardMenuIn.type, rowNo: this.rowNumber, seq: this.seqIn, menu: this.cardMenuIn.menu })
      this.bsCardClickEvent(newData)
    },

    // 点击事件回调
    bsCardClickEvent(obj) {
      let self = this
      let methods = this.cardMenuIn.methods
      if (obj.code) {
        // this.cardMenuIn.menu 里面的children不对。直接从sysmenu里取吧，这里只给GUID
        if (obj.code === 'agentItem') {
          this.$emit('generateCardBtns', '0', this.cardMenuIn.menu.guid)
        } else if (obj.code === 'doneItem') {
          this.$emit('generateCardBtns', '1', this.cardMenuIn.menu.guid)
        } else if (obj.code === 'oprateGuide') {
          this.$emit('generateCardBtns', '2', this.cardMenuIn.menu.guid)
        }
      }
      if (typeof obj.callback === 'function') {
        // 方式一: 工具栏按钮点击事件回调
        obj.callback(obj, self)
      } else {
        // 方式二: toolbar事件代理
        typeof methods.bsCardClickEvent === 'function' &&
          methods.bsCardClickEvent(obj, self)
      }
    },

    initCardMenu() {
      let menuCp = extend(true, {}, this.cardMenuIn)
      let cardMenuInTemp = extend(true, defaultCardConfig, defaultCardData, this.cardMenuIn)
      if (menuCp.buttons && menuCp.buttons.length) {
        cardMenuInTemp.buttons = menuCp.buttons
      }

      this.cardMenuIn = extend(true, {}, cardMenuInTemp)
      // console.log('77', { ...this.cardMenuIn })
    },
    getStyleLevel1(item) {
      try {
        // 为啥不直接用中文？因为有个书包不会配nginx
        let title = getPinYinFirstCharacter(item.title, '', true)
        return require('@/components/CardMenu/imgSvg/' + title + '.svg')
      } catch {
        return require('@/components/CardMenu/imgSvg/default.svg')
      }
    }
  },
  created() {

  },
  mounted() {
  },
  watch: {
    cardGlobal: {
      handler(newValue, oldValue) {
        this.cardGlobalIn = Object.assign({}, this.cardGlobalIn, newValue)
      },
      deep: true,
      immediate: true
    },
    cardMenu: {
      handler(newValue, oldValue) {
        this.cardMenuIn = extend(true, {}, newValue)
        this.initCardMenu()
      },
      deep: true,
      immediate: true
    },
    rowNo(newValue) {
      this.rowNumber = newValue
    },
    seq(newValue) {
      this.seqIn = newValue
    }
  }
}
</script>

<style  lang="scss" scoped>
  .card-content{
    width: 356px;
    height: 224px;
    background: #FFFFFF;
    box-shadow: 0 0 12px 0 var(--primary-color-shadow);
    border-radius: 2px;
    padding: 0 5px 10px 5px;
    color: #2E3133;
    box-sizing: border-box;
    display: inline-block;
    position: relative;
    overflow: hidden;
    margin: 20px 0px 0 0px;
    .content-bg{
      width: 240px;
      height: 240px;
      position: absolute;
      right: -42px;
      top: -89px;
    }
    .card-title{
      height: 60px;
      padding: 22px 19px 12px 19px;
      .icon_box{
        height: 60px;
        width: 60px;
        border-radius: 50%;
        text-align: center;
        img{
          color:#fff;
          height: 30px;
          width: 30px;
          margin-top: 15px;
          // filter: drop-shadow(#fff 0px 0px)
          stroke: #fff;
        }
      }
      .custom-title-icon{
        width: 60px;
        height: 60px;
        font-size: 60px;
        line-height: 60px;
      }
      .custom-title{
        display: inline-block;
        width: 220px;
        font-size: 22px;
        color: #2E3133;
        letter-spacing: 0;
        text-align: left;
        margin-left: 13px;
        vertical-align: middle;
      }
    }

    .card-btns{
      display: grid;
      grid-template-columns: 1fr 1fr;
      font-size: 0;
      .base-font{
        font-size: 18px;
      }
      .card-btn{
        min-width: 163px;
        height: 50px;
        background: #E3F2FE;
        padding: 15px 24px;
        font-size: 16px;
        color: #2E3133;
        text-align: left;
        font-weight: unset;
        border-radius: 0px;
        position: relative;
        margin: 10px 5px 0px 5px;
        .btn-num{
          position: absolute;
          right: 10px;
          top: 50%;
          transform: translateY(-50%);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;

          &.todo-num-bg {
            min-width: 20px;
            height: 20px;
            border-radius: 10px;
            padding: 4px;
            box-sizing: border-box;
            background: #ED411E;
            color: #fff;
          }
        }
      }
      .icon-class{
        margin-top: -3px;
        color: var(--btn-iconColor);
      }

      .btn-hover__class{
        background-color: var(--btn-btnColor);
        border-color: var(--btn-btnColor);
      }
      .btn-hover__class:hover, .btn-hover__class:active, .btn-active{
        background-color: var(--btn-iconColor);
        border-color: var(--btn-iconColor);
        color: #fff;
        .icon-class{
          color: #fff;
        }
      }
    }
  }
</style>
