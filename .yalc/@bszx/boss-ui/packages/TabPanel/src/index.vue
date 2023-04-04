<!-- select toolbar新工具条组件 by comer-->
<template>
  <div class="boss-slect__toolbar">
    <ul ref="toolbarContent" class="boss-toolbar__content">
      <!--状态按钮-->
      <li
        v-if="tabList.length"
        ref="normal"
        class="toolbar-btns toobar-status__buttons"
      >
        <TabSelect
          v-if="menuType === 'menuOne'"
          ref="tabPanel"
          :tab-list.sync="tabList"
          :show-num="showNum"
          :show-zero="showZero"
          :default-select="curTabSelect"
          @onTabClick="onTabClick"
          @onTabAfterLoad="onTabAfterLoad"
        />
        <TabSelectTwo
          v-if="menuType === 'menuTwo'"
          ref="tabPanel"
          :tab-list.sync="tabList"
          :show-num="showNum"
          :show-zero="showZero"
          :default-select="curTabSelect"
          @onTabClick="onTabClick"
          @onTabAfterLoad="onTabAfterLoad"
        />
      </li>
      <!--右侧按钮组-->
      <li
        class="toolbar-btns toobar-right__buttons"
        :style="{ '--right-btns__bottom': menuType === 'menuOne' ? '1px solid #E4E7ED' : 'unset' }"
      >
        <span class="right-btns__hover"></span>
        <!--前置按钮插槽组-->
        <slot ref="extendPre" name="preBtns"></slot>
        <div class="right-button__content Ttab-con button">
          <ul ref="btnNomal">
            <li
              v-for="(item,index) in rButtons"
              :key="index"
              class="fn-inline pointer"
            >
              <!-- 普通Button按钮 -->
              <vxe-button
                v-if="!item.options || (item.options && !item.options.length) "
                v-show="!item.isHide"
                :ref="`rBtn${index}`"
                :status="`${item.status ? item.status : ''}`"
                :title="item.label"
                class="select-tab-li fn-inline olh"
                :content="item.label"
                size="medium"
                :loading="item.loading"
                @click="onClickBtn(item)"
              />
              <!-- select按钮 -->
              <vxe-select
                v-else
                :ref="`rBtn${index}`"
                v-model="item.curValue"
                :status="`${item.status ? item.status : ''}`"
                class="select-tab-li-options fn-inline olh"
                size="medium"
                :transfer="true"
                @change="onClickBtn(item)"
              >
                <vxe-option
                  v-for="(it, idx) in item.options"
                  :key="idx"
                  :value="it.code"
                  :label="it.label"
                />
              </vxe-select>
            </li>
            <li v-if="rButtonsMore.length" class="fn-inline pointer">
              <vxe-button ref="btnMore" content="更多">
                <template v-slot:dropdowns>
                  <div
                    v-for="(item, index) in rButtonsMore"
                    :key="index"
                    @click.stop="onClickBtn(item)"
                  >
                    <vxe-button v-if="!item.options || (item.options && !item.options.length)" type="text" :content="item.label" />
                    <div
                      v-for="(it, idx) in item.options"
                      v-else
                      :key="idx"
                    >
                      <vxe-button type="text" :content="it.label" />
                    </div>
                  </div>
                </template>
              </vxe-button>
            </li>
          </ul>
        </div>
        <!--后置按钮插槽组-->
        <slot ref="extendLast" name="lastBtns"></slot>
        <span
          v-if="rButtons.length > 0 && !isHideQuery"
          class="splitLine"
        ></span>
        <vxe-button
          v-if="!isHideQuery"
          ref="queryBtn"
          size="medium"
          class="query-btn"
          @click="onQueryClick"
        >
          <!-- <a :class="isPack ? 'toolbar-quest__close' : 'toolbar-quest__open'" class="fn-inline"></a> -->
          <i v-show="isPack" class="vxe-button--icon base-font baseicon-shouqitiaojian"></i>
          <i v-show="!isPack" class="vxe-button--icon base-font baseicon-zhankaitiaojian"></i>
          <span class="fn-inline">{{ packBtnName }}</span>
          <i
            class="fn-inline drop"
            :class="isPack ? 'vxe-icon--arrow-top' : 'vxe-icon--arrow-bottom'"
          ></i>
        </vxe-button>
      </li>
    </ul>
    <!-- <el-divider /> -->
  </div>
</template>

<script>
import {
  defaultTabStatusConfig,
  defaultServerConfig,
  defaultStatusButtons,
  defaultStatusButtonsKey
} from './config/config'
import TabSelect from './components/TabSelect.vue'
import TabSelectTwo from './components/TabSelectTwo.vue'
import mixins from '../../tools/mixin'

export default {
  name: 'BsTabPanel',
  mixins: [mixins],
  components: {
    TabSelect,
    TabSelectTwo
  },
  props: {
    menuType: {
      type: String,
      default() {
        return 'menuTwo'
      }
    },
    showNum: {
      type: Boolean,
      default() {
        return true
      }
    },
    showZero: {
      // num为0时是否显示tip提示，默认不显示
      type: Boolean
    },
    tabStatusBtnConfig: {
      // 左侧状态按钮，配置项
      type: Object,
      default() {
        return {}
      }
    },
    buttonsInfo: {
      // 右侧按钮组，动态配置
      type: Object,
      default() {
        return {}
      }
    },
    serverConfig: {
      // api接口配置
      type: Object,
      default() {
        return {}
      }
    },
    rightButtons: {
      // 右侧按钮组 切记：如果要使用自己的右侧按钮，而不随状态按钮切换而切换,记得将配置changeBtns改为false
      type: Array,
      default() {
        return []
      }
    },
    tabStatusNumConfig: {
      // 状态按钮，数量配置
      type: Object,
      default() {
        return {}
      }
    },
    isHideQuery: { // 是否隐藏收起和展开查询控制按钮，默认不隐藏
      type: Boolean
    },
    isOpen: { // 是否收起查询面板，默认不收起
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isNoSearchData: false,
      tabStatusBtnConfigIn: { ...defaultTabStatusConfig },
      tabStatusNumConfigIn: this.tabStatusNumConfig,
      serverConfigIn: { ...defaultServerConfig },
      tabList: [],
      curTabSelect: {},
      rButtonsInfo: {},
      rBtns: [...this.rightButtons],
      rButtons: [...this.rightButtons],
      rButtonsMore: [],
      queryparams: {},
      loading: false,
      isPack: this.isOpen,
      statusButtons: { ...defaultStatusButtons },
      init: true,
      hasMoreBtn: false,
      buttonsInfoIn: { ...this.buttonsInfo }
    }
  },
  computed: {
    packBtnName() {
      return this.isPack ? '收起条件' : '展开条件'
    },
    project() {
      return window.__BS_UI_GLOBAL_CONFIG__.project || {}
    }
  },
  methods: {
    // 初始化参数
    initData() {
      this.initTabStatusBtnConfig()
      this.initServerConfig()
    },

    // 初始化按钮数据
    initTabStatusBtnConfig() {
      this.tabStatusBtnConfigIn = Object.assign(
        {},
        this.tabStatusBtnConfigIn,
        this.deepCopy(this.tabStatusBtnConfig || {})
      )
      this.tabList = this.minixStatusButtons(this.tabStatusBtnConfigIn.buttons)
      this.curTabSelect = this.tabStatusBtnConfigIn.curButton
      this.generateRightButtons()
      this.$nextTick(() => {
        this.$refs.tabPanel && this.$refs.tabPanel.getImageUrl()
      })
    },

    // 生成右侧按钮组
    generateRightButtons() {
      this.rButtonsInfo = this.tabStatusBtnConfigIn.buttonsInfo || this.buttonsInfoIn
      this.rButtons = this.tabStatusBtnConfigIn.changeBtns ? (this.rButtonsInfo[this.curTabSelect.curValue || this.curTabSelect.code] || []) : this.rButtons
    },

    // 合并状态按钮
    minixStatusButtons(newButtons = []) {
      let list = []
      newButtons.map((item) => {
        if (defaultStatusButtonsKey.includes(item.code)) {
          let newBtn = Object.assign({}, defaultStatusButtons[item.code], item)
          list.push(newBtn)
        } else {
          list.push(item)
        }
      })

      return list
    },

    // 初始化api服务数据
    initServerConfig() {
      this.serverConfigIn = Object.assign(
        {},
        this.serverConfigIn,
        this.serverConfig
      )
      this.queryparams = this.serverConfigIn.queryparams
    },

    // 初始化状态按钮label数量携带处理
    initTabStatusNumConfig() {
      let self = this
      let list = [...this.tabList]
      list.forEach((item) => {
        if (item.type === 'button') {
          let num = self.tabStatusNumConfigIn[item.code]
          if (num) {
            item.num = num
            item.labelNum = item.labelZero = `${item.label} (${num})`
          } else {
            item.num = 0
            item.labelNum = `${item.label}`
            item.labelZero = `${item.label} (0)`
          }
        }

        if (item.type === 'select') {
          let optionsCp = item.options
          optionsCp.forEach((option) => {
            let num = self.tabStatusNumConfigIn[option.code]
            if (num) {
              option.num = num
              option.labelNum = option.labelZero = item.label ? `${item.label} - ${option.label} (${num})` : `${option.label} (${num})`
            } else {
              option.num = 0
              option.labelNum = item.label ? `${item.label} - ${option.label}` : `${option.label}`
              option.labelZero = item.label ? `${item.label} - ${option.label} (0)` : `${option.label} (0)`
            }
          })

          item.options = [...optionsCp]
        }
      })

      this.tabList = [...list]
      // console.log('111', this.tabList)
      this.$emit('onTabClick', this.curTabSelect)
    },

    onQueryClick() {
      if (!this.isNoSearchData) {
        this.isPack = !this.isPack
        this.$emit('onQueryConditionsClick', this.isPack)
      } else {
        this.$message.warning('暂无查询条件！')
      }
    },

    deepCopy(obj) {
      // 深拷贝通用方法
      // var new_arr = JSON.parse(JSON.stringify(arr)) // 不仅可拷贝数组还能拷贝对象（ 但不能拷贝函数）
      // 只拷贝对象
      let me = this
      if (typeof obj !== 'object' || obj === null) return obj
      // 根据obj的类型判断是新建一个数组还是一个对象
      let newObj = obj instanceof Array ? [] : {}
      for (let key in obj) {
        // 遍历obj,并且判断是obj的属性才拷贝
        if (obj.hasOwnProperty(key)) {
          // 判断属性值的类型，如果是对象递归调用深拷贝
          newObj[key] =
            typeof obj[key] === 'object' ? me.deepCopy(obj[key]) : obj[key]
        }
      }
      return newObj
    },

    // 状态按钮切换
    onTabClick(obj) {
      // eslint-disable-next-line no-irregular-whitespace
      // 每次切换页签的时候将表格数据清空并且总数改为0, 这块记录标识
      if (obj.curValue !== this.curTabSelect.val && this.$lodash.keys(this.$store.state || {}).includes('isClickTab')) {
        this.$store.commit('setIsClickTab', true)
      }
      this.curTabSelect = obj
      // 如果右侧按钮组需要随着状态按钮切换而切换，则切换右侧按钮组
      if (this.tabStatusBtnConfigIn.changeBtns) {
        this.rButtons = []
        this.rButtonsMore = []
        const code = obj.type === 'select' ? obj.curValue : obj.code
        this.rButtons = this.deepCopy(this.rButtonsInfo[code] || [])
        this.$nextTick(() => {
          this.resize()
        })
      }

      this.bsToolbarClickEvent(obj)
      this.$emit('tabClick', obj, this)
    },
    onTabAfterLoad(obj) {
      this.curTabSelect = obj
      // 如果右侧按钮组需要随着状态按钮切换而切换，则切换右侧按钮组
      if (this.tabStatusBtnConfigIn.changeBtns) {
        this.rButtons = []
        this.rButtonsMore = []
        const code = obj.type === 'select' ? obj.curValue : obj.code
        this.rButtons = this.deepCopy(this.rButtonsInfo[code] || [])
        this.$nextTick(() => {
          this.resize()
        })
      }

      this.bsToolbarClickEvent(obj)
      this.$emit('onTabAfterLoad', obj, this)
    },

    // 右侧按钮组点击
    onClickBtn(obj = {}) {
      let newObj = Object.create(null)
      if (obj.options && obj.options.length) {
        newObj = obj.options.filter((item) => { return item.code === obj.curValue })[0] || {}
        obj = newObj
      }
      // 按钮触发，事件回调
      this.bsToolbarClickEvent(obj)
      this.$emit('btnClick', obj, this)
    },

    // 点击事件回调
    bsToolbarClickEvent(obj) {
      let self = this
      let methods = this.tabStatusBtnConfigIn.methods
      if (typeof obj.callback === 'function') {
        // 方式一: 工具栏按钮点击事件回调
        obj.callback(obj, self)
      } else {
        // 方式二: toolbar事件代理
        typeof methods.bsToolbarClickEvent === 'function' &&
          methods.bsToolbarClickEvent(obj, self)
      }
    },

    // api 请求获取状态按钮数据
    loadStatusBtns() {
      if (this.serverConfigIn.isServer) {
        this.getHttpData()
      }
    },

    // 获取请求数据
    async getHttpData() {
      let self = this
      if (self.loading) {
        return
      }
      self.loading = true
      // await this.$http[this.serverConfigIn.ajaxType](this.serverConfigIn.serverUri, this.queryparams)
      //   .then(res => {
      //     if (res.rscode === 200) {
      //       self.dealDataAfterLoad(res.data)
      //     }
      //     self.loading = false
      //   })
      //   .catch(err => {
      //     self.loading = false
      //     console.log(err, '状态按钮接口异常')
      //   })
    },

    // 加载完后处理数据
    dealDataAfterLoad(resData = {}) {
      this.dealData(resData)
      this.tabList = this.minixStatusButtons(this.tabStatusBtnConfigIn.buttons || [])
      this.curTabSelect = this.tabStatusBtnConfigIn.curButton
      this.generateRightButtons()
    },

    // 处理数据，赋值给tabStatusBtnConfigIn
    dealData(resData = {}) {
      let newStatusInfo = []
      let newStatusButtonInfo = Object.create(null)
      const { statusInfo, statusButtonInfo } = resData
      statusInfo.map((item) => {
        let btn = {
          code: item.statuscode,
          label: item.displaytitle,
          codeBak: item.code
        }

        newStatusInfo.push(Object.assign({}, item, btn))
      })

      Object.keys(statusButtonInfo).forEach((key) => {
        let btn = statusButtonInfo[key] || []
        btn.forEach((item) => {
          item.codeBak = item.code
          item.code = item.guid
          item.label = item.displaytitle
        })

        newStatusButtonInfo[key] = [...btn]
      })

      const tabStatusBtnConfigAjax = {
        buttons: newStatusInfo,
        buttonsInfo: newStatusButtonInfo,
        curButton: newStatusInfo[0]
      }

      this.tabStatusBtnConfigIn = Object.assign(
        {},
        this.tabStatusBtnConfigIn,
        tabStatusBtnConfigAjax
      )
    },
    resize() {
      let self = this
      setTimeout(() => {
        const contentW =
          (self.$refs.toolbarContent && self.$refs.toolbarContent.offsetWidth) ||
          0
        const queryBtn = self.isHideQuery ? 0 : 130
        const normalW = (self.$refs.normal && self.$refs.normal.offsetWidth) || 0
        const preSlotW =
          (self.$refs.extendPre && self.$refs.extendPre.offsetWidth) || 0
        const lastSlotW =
          (self.$refs.extendLast && self.$refs.extendLast.offsetWidth) || 0
        let overage = contentW - normalW - queryBtn - preSlotW - lastSlotW - 30
        self.dealRbuttons(overage - 82)
      }, 100)
    },
    dealRbuttons(overage) {
      this.rButtons = [...this.rButtons, ...this.rButtonsMore]
      this.rButtonsMore = []
      let btnwidth = 0
      this.rButtons.map((item, index) => {
        btnwidth = btnwidth + (item.label.length * 12 + 36)
      })
      if (btnwidth > overage) {
        let count = 0
        let bwidth = 0
        for (let i = 0; i < this.rButtons.length; i++) {
          bwidth = bwidth + (this.rButtons[i].label.length * 12 + 36)
          if (bwidth > overage) {
            count = i
            break
          }
        }
        let arr = this.rButtons.splice(count, this.rButtons.length - 1)
        this.rButtonsMore = arr.filter((item) => { return !item.isHide })
      }
    }
  },
  created() {},
  mounted() {
    window.addEventListener('resize', this.resize)
    this.initData()
    this.initTabStatusNumConfig()
    this.$nextTick(() => {
      this.resize()
    })
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resize)
  },
  watch: {
    '$store.state.showConditionStatus': {
      immediate: true,
      handler(val) {
        if (typeof(val) === 'boolean') { 
          if (val) {
            this.isNoSearchData = false
            this.isPack = true
            this.packBtnName = '收起条件'
          } else {
            this.isNoSearchData = true
            this.isPack = false
            this.packBtnName = '展开条件'
          }
        }
      }
    },
    tabStatusBtnConfig: {
      handler(newValue, oldValue) {
        // if (JSON.stringify(newValue) !== JSON.stringify(oldValue)) {
        this.initTabStatusBtnConfig()
        this.initTabStatusNumConfig()
        // }
      },
      deep: true,
      immediate: true
    },
    buttonsInfo: {
      handler(newValue, oldValue) {
        if (JSON.stringify(newValue) !== JSON.stringify(oldValue)) {
          this.buttonsInfoIn = Object.assign({}, oldValue, newValue)
          this.generateRightButtons()
        }
      },
      deep: true,
      immediate: true
    },
    tabStatusNumConfig: {
      handler(newValue, oldValue) {
        this.tabStatusNumConfigIn = newValue
        this.initTabStatusNumConfig()
      },
      deep: true,
      immediate: true
    },
    serverConfig: {
      handler(newValue, oldValue) {
        this.initServerConfig()
      },
      deep: true,
      immediate: true
    },
    rightButtons: {
      handler(newValue, oldValue) {
        let btns = newValue || []
        this.rBtns = [...btns]
        this.rButtons = [...btns]
      },
      immediate: true
    },
    queryparams: {
      handler(newValue, oldValue) {
        const flag = JSON.stringify(newValue) === JSON.stringify(oldValue)
        if (this.serverConfigIn.openQuerySeach && !flag && oldValue) {
          this.loadStatusBtns()
        }
      },
      deep: true,
      immediate: true
    },
    isOpen(val) {
      this.isPack = val
    }
  }
}
</script>

<style lang="scss">
.splitLine {
  display: inline-block;
  width: 2px;
  height: 26px;
  background: #e5eaf0;
  margin: 0 16px;
}
.boss-slect__toolbar {
  position: relative;
  background: #fff;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  height: 48px;
  padding-right: 24px;
  .Ttab-con .button li {
    width: 90px;
  }
  .Ttab-con {
    .select-tab-li .fn-inline {
      width: 74px;
      max-width: 74px;
    }
  }
  .boss-toolbar__content {
    user-select: none;
    display: flex;
    white-space: nowrap;
    position: relative;
    font-size: 0;
    align-items: center;
    height: 48px;
    border-bottom: 1px solid #e7ebf0;
    .li {
      margin: 0;
      padding: 0;
      list-style: none;
    }
    .toolbar-btns {
      padding: 0;
      min-width: 28px;
      max-height: 34px;
      text-align: center;
      vertical-align: top;
      cursor: pointer;
      .tab-con-list li {
        position: relative;
      }
      .select-tab-li {
        max-width: 100px;
      }
    }
    .toobar-status__buttons {
      // width:650px;
      flex-shrink: 0;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      .Ttab-con {
        width: 100%;
      }
    }

    .toobar-right__buttons {
      flex-grow: 1;
      display: inline-flex;
      align-items: center;
      justify-content: flex-end;
      position:relative;
      .toolbar-quest__close{
        background: url(./img/icon-close-quest.svg) no-repeat center;
        background-size: 100% 100%;
        font-size: 0;
        height: 15px;
        width: 15px;
        cursor: pointer;
      }
      .toolbar-quest__open{
        background: url(./img/icon-open-quest.svg) no-repeat center;
        background-size: 100% 100%;
        font-size: 0;
        height: 15px;
        width: 15px;
        cursor: pointer;
      }
      .right-btns__hover{
        position: absolute;
        width: 100%;
        height: 48px;
        border-bottom: var(--right-btns__bottom);
      }
      button{
        height: 32px;
        padding: 0 18px;
        box-sizing: border-box;
        border-radius: 2px;
        margin: 0px;
        font-size: 12px;
      }
      .query-btn{
        background-color: #E4F2FF;
        color: #1F8CFB;
        border-color: #E4F2FF;
        // margin-left: 8px;
      }
      .Ttab-con {
        padding: 0px;
      }
      .right-button__content {
        max-width: 100%;
        .vxe-button--content, .vxe-button--icon, .vxe-button--loading-icon{
          vertical-align: initial;
        }

        .select-tab-li {
          height: 32px;
          padding: 0 14px;
          margin: 0 0 0 8px;
          span{
            font-size: 12px;
            font-weight: normal;
          }
        }
        .select-tab-li-options{
           max-width: 100px;
          padding: 0px;
          height: 32px;
          margin: 0 0 0 8px;
          span{
            font-size: 12px;
            font-weight: normal;
          }
          .vxe-input--inner{
            border-radius: unset;
          }
        }
        .vxe-button--dropdown {
          margin-left: 8px;
        }
      }
    }
  }
}
</style>
