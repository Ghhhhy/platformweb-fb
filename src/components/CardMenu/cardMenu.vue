<!-- 卡片菜单 -->
<template>
  <div ref="cardContent" class="card-menu__content">
    <div v-for="(item, index) in uiCardMenu" :key="index" class="menu-panel">
      <div ref="cardMenu" class="card-menu__card" :style="{ width: cardWidth, 'margin-left': marginWidth, 'margin-right': marginWidth, '--top-item-nums': allowNumIn }">
        <template v-if="!$store.getters.isXm">
          <Card
            v-for="(card, idx) in item.cardMenu"
            :key="idx"
            :card-global="cardGlobal"
            :card-menu="card"
            :row-no="item.rowNo"
            :active-btn="activeBtn"
            :seq="item.cardMenu.length === allowNumIn ? (idx === 0 ? 'first' : ((idx + 1) === item.cardMenu.length ? 'end' : 'middle')) : 'first'"
            :class="(idx === item.cardMenu.length - 1 ) ? 'row-last-card' : ''"
            @generateCardBtns="preGenerateCardBtns"
          />
        </template>
        <template v-else>
          <CardXM
            v-for="(card, idx) in item.cardMenu"
            :key="idx"
            :card-global="cardGlobal"
            :card-menu="card"
            :row-no="item.rowNo"
            :active-btn="activeBtn"
            :seq="item.cardMenu.length === allowNumIn ? (idx === 0 ? 'first' : ((idx + 1) === item.cardMenu.length ? 'end' : 'middle')) : 'first'"
            :class="(idx === item.cardMenu.length - 1 ) ? 'row-last-card' : ''"
            @generateCardBtns="preGenerateCardBtns"
          />
        </template>

      </div>
      <div v-show="curExtend === item.rowNo" ref="cardExtend" class="card-menu__extend" :style="{ width: extendWidth, 'margin-left': marginWidth, 'margin-right': marginWidth }">
        <div class="arrow" :class="arrowDirectClass"></div>
        <div class="extend-child">
          <!--自定义待办-->
          <MenuTodo v-if="currentBtn === 'agentItem'" :card="cur" />
          <PoperExtend v-if="currentBtn === 'doneItem'" v-loading="adLoading" :card-btns="cardBtns" :cur="cur" :allow-num="allowNumIn" />
          <CardMenuTree v-if="currentBtn === 'funMenu' && !$store.getters.isXm" :data="menuTree" />
          <CardMenuTreeXM v-if="currentBtn === 'funMenu' && $store.getters.isXm" :data="menuTree" />
          <CardVideo v-if="!isShowFJ && currentBtn === 'oprateGuide'" :card-btns="cardBtns" :cur="cur" :allow-num="allowNumIn" />
          <OperateGuideNew v-if="isShowFJ && currentBtn === 'oprateGuide'" :oprate-guide-datas="oprateGuideDatas" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Card from './card/card'
import CardXM from '@/components/CardMenu/cardXM/card.vue'
import CardMenuTree from './other/menuTree/index.vue'
import CardMenuTreeXM from '@/components/CardMenu/other/menuTreeXM/menuTree.vue'
import CardVideo from './other/video'
import PoperExtend from './poper/poper'
import MenuTodo from './other/menuTodo'
import data from './config/data'
import MenuModule from '@/api/frame/common/menu.js'
import { robotServe } from '@/utils/robotServer.js'
import OperateGuideNew from '@/views/main/guidOperation/operateGuidNew'

// import databf from './config/databf'

import { extend } from './utils'
// const CARDWIDTH = 476

export default {
  name: 'CardMenu',
  // mixins: [databf],
  mixins: [data],
  components: {
    Card,
    CardMenuTree,
    CardXM,
    CardMenuTreeXM,
    CardVideo,
    MenuTodo,
    PoperExtend,
    OperateGuideNew
  },
  props: {

  },
  data() {
    return {
      adLoading: false,
      uiCardMenu: {},
      menuTree: {},
      curExtend: false, // 当前展开的行
      currentBtn: '', // 当前card上点击的按钮
      currentCard: '', // 当前card模块
      activeBtn: '',
      extendWidth: '0px',
      cardWidth: '0px',
      marginWidth: '50px',
      allowNumIn: 0,
      arrowDirectClass: 'arrow-left',
      oprateGuideDatas: {}
    }
  },
  computed: {
    cur() {
      return {
        currentBtn: this.currentBtn,
        currentCard: this.currentCard,
        allowNum: this.allowNumIn,
        arrowDirectClass: this.arrowDirectClass
      }
    },
    isShowFJ() {
      return this.$store.getters.isFuJian
    }
  },
  methods: {
    // 生存配置项
    generateConfig() {
      // 1. 动态生成配置数据
      this.generateCardMenu()
      // 待办已办
      // this.generateCardBtns()
      // 1. 加载本地图片
      this.getImageUrl()
      // 3. 自适应缩放
      this.resize()
    },
    preGenerateCardBtns(status, menus) {
      console.log(213)
      this.adLoading = true
      this.generateCardBtns(status, menus).then(() => {
        this.adLoading = false
      })
    },
    // card上按钮，事件回调
    async bsCardClickEvent(obj, $this) {
      this.menuTree = {}
      // 同一行的，同一个模块，同一按钮点击如果已经展开，第二次点击则收
      const sysMenu = this.$store.state.systemMenu || []
      let self = this
      sysMenu.forEach(item => {
        if (obj.type === item.guid) {
          self.menuTree = item
        }
      })
      // this.cardBtns[obj.type].funMenu = sysMenu.menu
      if (this.curExtend === obj.rowNo && this.currentCard === obj.type && this.currentBtn === obj.code && this.curExtend) {
        this.curExtend = false
        this.activeBtn = ''
        return
      }
      switch (obj.seq) {
        case 'first':
          this.arrowDirectClass = 'arrow-left'
          break
        case 'middle':
          this.arrowDirectClass = 'arrow-middle'
          break
        case 'end':
          this.arrowDirectClass = 'arrow-right'
          break
        default:
          this.arrowDirectClass = 'arrow-left'
      }
      this.activeBtn = `${obj.type}-${obj.code}` // 激活的按钮，全局只有一个
      this.curExtend = obj.rowNo
      this.currentBtn = obj.code
      this.currentCard = obj.type
      if (obj.code === 'oprateGuide') {
        this.oprateGuideDatas = await this.getFileData(obj.type)
      }
    },

    // 展开面板，按钮回调
    bsCardPoperClickEvent(obj, $this) {
      console.log(56, '回调方式444', obj, $this.$options)
      this.getRouter(obj)
    },

    getRouter(value) {
      let arr = []
      arr.push(value)
      let valueNum = arr.slice(0, arr.length + 1)
      if (valueNum[0].name === valueNum[0].f_FullName) {
        this.onMenuSelectChange(value)
      }
    },
    onMenuSelectChange(obj) {
      let self = this
      if (obj.param5 && obj.param5.indexOf('needcheck=true') >= 0) { // 需要校验编报是否已关闭
        let params = {
          menuguid: obj.guid,
          appguid: obj.appid,
          appid: obj.appsysid,
          specroleguid: '',
          roleguid: obj.roleguid }
        MenuModule.getFbPageConfig(params).then(res => {
          Object.assign(obj, res)
          if (res.data.isbudgetbegin === 0 && res.data.datatype !== 8) {
            self.$message('预算编报已关闭')
          } else {
            this.$store.commit('setCurMenuObj', obj)
            if (this.$store.getters.isQingHai) {
              robotServe(this)// 客服机器人服务
            }
          }
        })
      } else {
        this.$store.commit('setCurMenuObj', obj)
        if (this.$store.getters.isQingHai) {
          robotServe(this)// 客服机器人服务
        }
      }
    },
    // 缩放
    resize() {
      let allowNum = 0
      if (this.$refs.cardContent.offsetWidth >= '1440') {
        allowNum = 4
      } else {
        allowNum = 3
      }
      if (this.$store.getters.isXm) {
        if (this.$refs.cardContent.offsetWidth >= '1440') {
          allowNum = 5
        } else {
          allowNum = 3
        }
      }
      let rows = []
      let menus = {}
      if (allowNum > 0) {
        // 将一个数组，按照几个元素一起分寸多个子数组
        for (let i = 0, len = this.cardMenu.length; i < len; i += allowNum) {
          rows.push(this.cardMenu.slice(i, i + allowNum))
        }

        this.extendWidth = (this.$refs.cardContent.offsetWidth - 100) + 'px'
        this.cardWidth = (this.$refs.cardContent.offsetWidth - 100) + 'px'
        this.allowNumIn = allowNum
      }

      rows.map((item, index) => {
        menus[`row${index + 1}`] = {
          rowNo: `row${index + 1}`,
          cardMenu: item
        }
      })

      this.uiCardMenu = extend(true, {}, menus)
      console.log(this.uiCardMenu, '12312')
    },
    getFileData(attachmentid) {
      if ((attachmentid ?? '') === '') {
        return
      }
      const params = {
        attachmentid,
        is_deleted: 2
      }
      return new Promise((resolve, reject) => {
        this.$http.post('fi-service/v2/fi/file/query', params).then(res => {
          const { data, rscode } = res
          if (rscode === '200') {
            resolve([].concat(data || []))
          } else {
            resolve([])
            // this.$XModal.message({ status: 'error', message: '获取信息失败！' })
          }
        }, err => {
          reject(err)
        })
      })
    }
  },
  created() {

  },
  mounted() {
    window.addEventListener('resize', this.resize)
    this.generateConfig()
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resize)
  },
  watch: {

  }
}
</script>

<style scoped lang="scss">
.maskbox{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
}
.contextClass{
  width: 100%;
  position: absolute;
  top: 90px;
  bottom: 0;
}
  .card-menu__content{
    // text-align: left;
    .card-menu__card{
      display: grid;
      grid-template-columns: repeat(var(--top-item-nums), 1fr);
      grid-column-gap: 24px;
      .row-last-card{
        margin-right: 0px;
      }
    }
    .card-menu__extend{
      // position: relative;
      // min-height: 139px;
      max-height: 400px;
      margin: 16px 10px 0 10px;
      background: #ffffff;
      border-radius: 2px;
      display: grid;
      grid-template-columns: 1fr;
      .arrow{
        position: absolute;
        width: 0px;
        height: 0px;
        border: 12px solid transparent;
        border-bottom-color: #fff;
        top: -23px;
        left: 36px;
      }
      .arrow-middle{
        left: 48%;
        right: unset;
      }
      .arrow-left{
        left: 36px;
        right: unset;
      }
      .arrow-right{
        right: 36px;
        left: unset;
      }
      .extend-child{
        width: 100%;
        // min-height: 139px;
        max-height: 400px;
        overflow: auto;
      }
    }
  }
</style>
