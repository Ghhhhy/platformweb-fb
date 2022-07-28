<!-- 状态按钮左右可滑动工具条组件  by comer -->
<template>
  <div class="boss-toolbar">
    <ul ref="toolbarContent" class="boss-toolbar__content">
      <!--折叠&收起-->
      <li v-if="!isHide" ref="arrow" class="toolbar-btns toolbar-arrow">
        <div class="toolbar-arrow__btn fn-inline" @click="changeAside">
          <i v-if="leftVisible" class="fn-inline base-font basetoggle-left"></i>
          <i v-if="!leftVisible" class="fn-inline base-font basetoggle-right"></i>
        </div>
      </li>

      <!--状态按钮-->
      <li
        v-if="tabList.length"
        ref="normal"
        class="toolbar-btns toobar-status__buttons"
        :class="statusButtonsNums"
      >
        <BsTab
          type="button"
          :tab-list="tabList"
          show-num
          is-tool-bar
          :top-tip="topTip"
          :show-zero="showZero"
          :default-select="curTabSelect"
          @onTabClick="onTabClick"
        />
      </li>

      <!--右侧按钮组-->
      <li class="toolbar-btns toobar-right__buttons">
        <!--前置按钮插槽组-->
        <slot ref="extendPre" name="preBtns"></slot>
        <div v-if="rButtons.length" class="right-button__content Ttab-con button">
          <ul ref="btnNomal">
            <li
              v-for="(item,index) in rButtons"
              :key="index"
              class="fn-inline pointer"
              @click.stop="onClickBtn(item)"
            >
              <div :ref="`rBtn${index}`" class="tab-li fn-inline olh">
                <span>{{ item.label }}</span>
              </div>
            </li>
            <li v-if="rButtonsMore.length" class="fn-inline pointer">
              <vxe-button ref="btnMore" content="更多">
                <template v-slot:dropdowns>
                  <div
                    v-for="(item, index) in rButtonsMore"
                    :key="index"
                    @click.stop="onClickBtn(item)"
                  >
                    <vxe-button type="text" :content="item.label" />
                  </div>
                </template>
              </vxe-button>
            </li>
          </ul>
        </div>
        <!--后置按钮插槽组-->
        <slot ref="extendLast" name="lastBtns"></slot>
      </li>
    </ul>
  </div>
</template>

<script>
import {
  defaultTabStatusConfig,
  defaultServerConfig,
  buttonsNum
} from './config/config'
import api from '@/api/components/test/toolbar/toolbar'
export default {
  name: 'BsToolBar',
  props: {
    isHide: {
      // 是否隐藏折叠按钮  默认不隐藏
      type: Boolean
    },
    topTip: {
      // 数字右上角提示
      type: Boolean
    },
    showZero: {
      // num为0时是否显示tip提示，默认不显示
      type: Boolean
    },
    value: {
      // 左侧是否折叠起来，默认不折叠
      type: Boolean,
      default() {
        return true
      }
    },
    tabStatusBtnConfig: {
      // 左侧状态按钮，配置项
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
    }
  },
  data() {
    return {
      statusButtonsNums: 'toolbar-6__nums',
      leftVisible: this.value,
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
      loading: false
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
        this.tabStatusBtnConfig
      )
      this.tabList = this.tabStatusBtnConfigIn.buttons
      this.curTabSelect = this.tabStatusBtnConfigIn.curButton
      this.rButtonsInfo = this.tabStatusBtnConfigIn.buttonsInfo
      this.rButtons = this.rButtonsInfo[this.curTabSelect.code] || []
      this.statusButtonsNums =
        buttonsNum[this.tabStatusBtnConfigIn.limit] || buttonsNum[6]
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
        let num = self.tabStatusNumConfigIn[item.code]
        if (num) {
          item.num = num
          item.labelNum = `${item.label}(${num})`
        } else {
          item.num = 0
          item.labelNum = item.label
        }
      })

      this.tabList = [...list]

      // let curNum = this.tabStatusNumConfigIn[this.curTabSelect.code]
      // if (curNum) {
      //   this.curTabSelect.label = `${this.curTabSelect.label}(${curNum})`
      // }
    },

    // aside状态切换
    changeAside() {
      this.leftVisible = !this.leftVisible
      this.$emit('input', this.leftVisible)
      this.$emit('onAsideChange', this.leftVisible)
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
      this.curTabSelect = obj
      // 如果右侧按钮组需要随着状态按钮切换而切换，则切换右侧按钮组
      if (this.tabStatusBtnConfigIn.changeBtns) {
        this.rButtons = []
        this.rButtonsMore = []
        this.rButtons = this.deepCopy(this.rButtonsInfo[obj.code] || [])
        this.$nextTick(() => {
          this.resize()
        })
      }

      this.bsToolbarClickEvent(obj)
    },

    // 右侧按钮组点击
    onClickBtn(obj) {
      // 按钮触发，事件回调
      this.bsToolbarClickEvent(obj)
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
      if (this.loading) {
        return
      }
      this.loading = true
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

      await api.getToolbarData().then((res) => {
        if (res.rscode === 200) {
          self.dealDataAfterLoad(res.data)
        }
      })
    },

    // 加载完后处理数据
    dealDataAfterLoad(resData = {}) {
      this.dealData(resData)
      this.tabList = this.tabStatusBtnConfigIn.buttons || []
      this.curTabSelect = this.tabStatusBtnConfigIn.curButton
      this.rButtonsInfo = this.tabStatusBtnConfigIn.buttonsInfo
      this.rButtons = this.rButtonsInfo[this.curTabSelect.code] || []
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
      const contentW =
        (this.$refs.toolbarContent && this.$refs.toolbarContent.offsetWidth) || 0
      // const arrowW = (this.$refs.arrow && this.$refs.arrow.offsetWidth) || 0
      const normalW = (this.$refs.normal && this.$refs.normal.offsetWidth) || 0
      const preSlotW =
        (this.$refs.extendPre && this.$refs.extendPre.offsetWidth) || 0
      const lastSlotW =
        (this.$refs.extendLast && this.$refs.extendLast.offsetWidth) || 0
      let overage = contentW - normalW - 180 - preSlotW - lastSlotW
      this.dealRbuttons(overage)
    },
    dealRbuttons(overage) {
      let self = this
      const btnNomalW =
        (this.$refs.btnNomal && this.$refs.btnNomal.offsetWidth - 74) || 0 // 右侧按钮组，去除更多剩余按钮的宽度
      const preSlotW =
        (this.$refs.extendPre && this.$refs.extendPre.offsetWidth) || 0
      const lastSlotW =
        (this.$refs.extendLast && this.$refs.extendLast.offsetWidth) || 0
      // console.log('55', overage, btnNomalW)
      if (btnNomalW > overage) {
        // 放不下
        if (this.rButtons.length) {
          const btn = this.rButtons.pop()
          this.rButtonsMore.unshift(btn)
          let newOverage = btnNomalW - 74 - preSlotW - lastSlotW // 右侧按钮组,去除更多剩余空间
          this.$nextTick(() => {
            self.dealRbuttons(newOverage)
          })
        }
      }

      if (overage > btnNomalW && overage - btnNomalW > 150) {
        if (this.rButtonsMore.length) {
          const btn = this.rButtonsMore.shift()
          this.rButtons.push(btn)
          let newOverage = overage - 74
          this.$nextTick(() => {
            self.dealRbuttons(newOverage)
          })
        }
      }
    }
  },
  created() {},
  mounted() {
    window.addEventListener('resize', this.resize)
    this.initData()
    this.loadStatusBtns()
    this.initTabStatusNumConfig()
    this.resize()
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resize)
  },
  watch: {
    value(val) {
      this.leftVisible = val
    },
    tabStatusBtnConfig: {
      handler(newValue, oldValue) {
        if (JSON.stringify(newValue) !== JSON.stringify(oldValue)) {
          this.initTabStatusBtnConfig()
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
    }
  }
}
</script>

<style lang="scss" scope>
.boss-toolbar {
  position: relative;
  padding: 5px 5px;
  background: var(--hightlight-color);
  box-sizing: border-box;
  .Ttab-con .button li {
    width: 90px;
  }
  .Ttab-con {
    .tab-li .fn-inline {
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
      .tab-li {
        max-width: 70px;
        .label-num__topTip {
          position: absolute;
          color: white !important;
          font-size: 12px;
          background-color: red;
          height: 20px;
          padding: 0 8px;
          line-height: 20px;
          right: -6%;
          top: -8px;
          z-index: 99;
          text-align: center;
          border-radius: 24px;
        }
      }
    }

    .toolbar-arrow {
       margin: 0 30px 0 0;
       width: 90px;
      .toolbar-arrow__btn {
        cursor: pointer;
        color: #f83704;
        width: 36px;
        height: 36px;
        background: #fff;
        width: 36px;
        height: 36px;
        flex-shrink: 0;
        text-align: center;
        border: solid 1px #f83704;
        box-sizing: border-box;
      }
      .base-font {
        font-size: 24px;
        font-style: normal;
      }
    }
    .toolbar-2__nums {
      width: 290px;
    }
    .toolbar-3__nums {
      width: 380px;
    }
    .toolbar-4__nums {
      width: 480px;
    }
    .toolbar-5__nums {
      width: 580px;
    }
    .toolbar-6__nums {
      width: 675px;
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
      margin-right: -3px;
      flex-grow: 1;
      display: inline-flex;
      align-items: center;
      justify-content: flex-end;
      .Ttab-con {
        padding: 0px;
      }
      .right-button__content {
        max-width: 100%;
        .tab-li {
          max-height: 32px;
          padding: 0 14px;
        }
        .vxe-button--dropdown {
          margin-left: 3px;
        }
      }
    }
  }
}
</style>
