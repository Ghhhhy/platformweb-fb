<!--  tab切换组件   Author:Titans@2396757591@qq.com -->
<template>
  <div ref="tabCon" class="T-tab" :class="typeClass + ' ' + tabClass + ' ' + tabMainClass">
    <div
      class="fn-inline pointer left offset"
      :class="isHidePrev ? 'hidden' : (curTransformXCount !== 0 ? 'visible' : 'visible-disabled')"
      @click="onPrev"
    >
      <i class="fn-inline base-font baseqiehuanqizuo"></i>
    </div>
    <div v-if="canRenderTab" ref="tabConList" class="tab-con-list fn-inline" :class="canClear ? 'hasclear' : ''">
      <ul ref="transformXScroll" class="transform-x-scroll" :style="{ 'transform': 'translateX(' + ( 0 - transformX) + 'px)' }">
        <li
          v-for="(item,index) in tabListIn"
          :key="index"
          :label="item.label"
          class="fn-inline pointer"
          :class="item.isHide ? 'hidden' : curTabSelect.label === item.label ? 'active' : ''"
          @mousemove="onTabElhover(item,index,true)"
          @click="onTabElClick(item,index,true)"
        >
          <template v-if="isToolBar">
            <div class="tab-li">
              <span class="fn-inline olh">{{ item.label }}
                <span v-if="showNum && (item.num || (showZero ? item.num === 0 : null))">
                  <span v-if="topTip" class="label-num__topTip">
                    {{ item.num }}
                  </span>
                  <span v-else>
                    (<span class="span-red">{{ item.num }}</span>)
                  </span>
                </span>
              </span>
            </div>
          </template>
          <template v-if="!isToolBar">
            <div class="tab-li">
              <span class="fn-inline olh">{{ item.label }}</span>
              <em
                v-if="canClear"
                class="fn-inline base-font basebaseline-close-px"
                @click.stop="onTabElEditClick('remove',item,index)"
              ></em>
              <div v-if="item.inforCount !== undefined" class="tabLi-infor">
                <span class="fn-inline tabLi-infor-count">{{ item.inforCount }}</span>
              </div>
            </div>
          </template>
        </li>
      </ul>
    </div>
    <div
      class="fn-inline pointer next offset"
      :class="isHideNext ? 'hidden' : (curTransformXCount !== (scrollXArray.length - 1) ? 'visible' : 'visible-disabled')"
      @click="onNext"
    >
      <i class="fn-inline base-font baseqiehuanqiyou"></i>
    </div>
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'EpTab',
  props: {
    canClear: {
      type: Boolean,
      default: false
    },
    showNum: {
      type: Boolean
    },
    topTip: {
      type: Boolean
    },
    showZero: {
      type: Boolean
    },
    isToolBar: {
      type: Boolean
    },
    tabClass: {
      type: String,
      default() {
        return ''
      }
    },
    type: {
      type: String,
      default() {
        return 'default'
      }
    },
    tabList: {
      type: [Array, Object],
      default() {
        return [
          {
            label: '标题标题标题标题标题标题标题1',
            code: '11',
            id: '11'
          },
          {
            label: '标题标题标题标题标题标题标题2',
            code: '12',
            id: '12'
          }, {
            label: '标题标题标题标题标题标题标题3',
            code: '13',
            id: '13'
          },
          {
            label: '标题标题标题标题标题标题标题4',
            code: '14',
            id: '14'
          },
          {
            label: '标题标题标题标题标题标题标题5',
            code: '15',
            id: '15'
          }, {
            label: '标题标题标题标题标题标题标题6',
            code: '16',
            id: '16'
          }, {
            label: '标题标题标题标题标题标题标题7',
            code: '17',
            id: '17'
          }, {
            label: '标题标题标题标题标题标题标题8',
            code: '18',
            id: '18'
          }, {
            label: '标题标题标题标题标题标题标题9',
            code: '19',
            id: '19'
          }, {
            label: '标题标题标题标题标题标题标题10',
            code: '20',
            id: '20'
          },
          {
            label: '标题标题11',
            code: '20',
            id: '20'
          },
          {
            label: '标题标题1',
            code: '11',
            id: '11'
          },
          {
            label: '标题标题2',
            code: '12',
            id: '12'
          }, {
            label: '标题标题3',
            code: '13',
            id: '13'
          },
          {
            label: '标题标题4',
            code: '14',
            id: '14'
          },
          {
            label: '标题标题5',
            code: '15',
            id: '15'
          }, {
            label: '标题标题标题标题标题标题标题6',
            code: '16',
            id: '16'
          }, {
            label: '标题标题标题标题标题题7',
            code: '17',
            id: '17'
          }, {
            label: '标题标题标题标题题标题8',
            code: '18',
            id: '18'
          }, {
            label: '标题标题标题标题题标题9',
            code: '19',
            id: '19'
          }, {
            label: '标题标题标题标题题标题10',
            code: '20',
            id: '20'
          },
          {
            label: '标题标题标题标题题标题11',
            code: '20',
            id: '20'
          }
        ]
      }
    },
    defaultSelect: {
      // defaultSelect
      type: [Object],
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      scrollXArray: [],
      transformXScrollwidth: 0,
      tabConListWidth: 0,
      transformX: 0,
      curTransformXCount: 0,
      canRenderTab: false,
      firstel: '',
      lastel: '',
      isHidePrev: true,
      isHideNext: true,
      tabListCp: [],
      defultTabIndex: 0,
      curSelectIndex: 0,
      isOne: false,
      tabCount: 0,
      navWidth: 'auto',
      tabMainClass: '',
      curTabSelect: {},
      typeClassMap: {
        default: 'default',
        button: 'button'
      },
      typeClass: 'default',
      tabListIn: []
    }
  },
  methods: {
    getbasicDataType(obj) { // 获取基础数据类型
      return Object.prototype.toString.call(obj).slice(8, -1)
    },
    Arrmovebit: function (arr, movedirection, movebit) { // 数组偏移
      for (var i = 0; i < movebit; i++) {
        if (movedirection === 'right') {
          arr.unshift(arr.pop())
        } else {
          arr.push(arr.shift())
        }
      }
      return arr
    },
    deepCopy(obj) { // 深拷贝通用方法
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
    getIndexOf(arr, obj, key) { // 按key值获取索引
      let indexOf = -1
      if (!Array.isArray(arr)) return -1
      let someof = arr.some((item, index) => {
        indexOf = index
        return item[key] === obj[key]
      })
      if (someof) {
        return indexOf
      }
      return -1
    },
    onPrev() { // 前一屏幕
      if (this.curTransformXCount >= 1) {
        this.curTransformXCount = this.curTransformXCount - 1
      }
      this.transformX = this.scrollXArray[this.curTransformXCount]
    },
    onNext() { // 后一屏幕
      if (this.curTransformXCount < (this.scrollXArray.length - 1)) {
        this.curTransformXCount = this.curTransformXCount + 1
      }
      this.transformX = this.scrollXArray[this.curTransformXCount]
    },
    offsetSomeone(obj) { // 定位并滚动在元素所在的那一屏
      let self = this
      let tablist = this.$refs.transformXScroll ? this.$refs.transformXScroll.children : []
      Array.from(tablist).some((item, index) => {
        return self.scrollXArray.some((itemC, indexC) => {
          if (item.attributes.label.value === obj.label && itemC <= item.offsetLeft && item.offsetLeft <= (itemC + self.tabConListWidth)) {
            self.curTransformXCount = indexC
            self.transformX = self.scrollXArray[self.curTransformXCount]
            return true
          } else {
            return false
          }
        })
      })
    },
    activeDefault(index, offsetIndex) { // 设置选中并滚动到那一屏
      let defaultActive = this.tabListIn[index]
      if (defaultActive) {
        this.offsetSomeone(offsetIndex === undefined ? defaultActive : this.tabListIn[offsetIndex])
        this.onTabElClick(this.tabListIn[index], index)
      }
    },
    onTabElClick(obj, index, isClick) { // 点击事件
      if (
        this.getbasicDataType(this.curTabSelect) === 'Object' &&
        obj.label !== this.curTabSelect.label
      ) {
        this.curTabIndex = index
        this.curTabSelect = Object.assign({}, obj)
        this.$emit('onTabClick', obj, isClick)
      }
    },
    onTabElhover(obj, index, isClick) { // hover后完整显示当前元素
      if (this.tabConListWidth !== this.$refs.tabConList.offsetWidth) {
        this.setTransformData()
      } else {
        let { offsetLeft, offsetWidth } = window.event.currentTarget
        if ((offsetLeft + offsetWidth) > this.transformX && offsetLeft < this.transformX) {
          this.transformX = offsetLeft
        } else if (offsetLeft < (this.transformX + this.tabConListWidth) && (offsetLeft + offsetWidth) > (this.transformX + this.tabConListWidth)) {
          this.transformX = this.transformX + ((offsetLeft + offsetWidth) - (this.transformX + this.tabConListWidth))
        } else {
        }
      }
    },
    onTabElEditClick(action, item, index) { // 移除
      this.curevent = window.event
      window.event.stopPropagation()
      if (action === 'remove' && this.canClear) {
        if (index <= this.curTabIndex) {
          this.$emit('onClearClick', this.tabListIn.splice(index, 1), this.tabListIn)
          if (this.tabListIn.length > 0) {
            this.curTabIndex -= 1
          }
        } else {
          this.$emit('onClearClick', this.tabListIn.splice(index, 1), this.tabListIn)
        }
        this.$emit('update:tabList', this.tabListIn)
        this.$nextTick(() => {
          this.setTransformData(index > 0 ? index - 1 : index)
        })
      }
    },
    init() { // 初始化
      this.tabListIn = this.deepCopy(this.tabList) // 修复上面的深度copy 方法丢失问题
      let defultTabIndex = this.getIndexOf(
        this.tabListIn,
        this.defaultSelect,
        'label'
      )
      this.curTabIndex = defultTabIndex < 0 ? 0 : defultTabIndex
      if (this.tabListIn[this.curTabIndex]) {
        this.curTabSelect = this.tabListIn[this.curTabIndex]
      }
      this.canRenderTab = true
      this.$nextTick(() => {
        this.setTransformData()
      })
    },
    setTransformData(transData) { // 设置多屏滚动数据
      let self = this
      self.transformXScrollwidth = self.$refs.transformXScroll ? self.$refs.transformXScroll.offsetWidth : 0
      self.tabConListWidth = self.$refs.tabConList ? self.$refs.tabConList.offsetWidth : 0
      if (self.tabConListWidth >= self.transformXScrollwidth) {
        self.isHidePrev = true
        self.isHideNext = true
      } else {
        self.isHidePrev = false
        self.isHideNext = false
        let scrollXcount = Math.ceil(self.transformXScrollwidth / self.tabConListWidth)
        let scrollXArray = []
        for (let i = 0; i < scrollXcount; i++) {
          if (i === 0) {
            scrollXArray.push(0)
          } else if (i === scrollXcount - 1) {
            scrollXArray.push(self.transformXScrollwidth - self.tabConListWidth)
          } else {
            scrollXArray.push(self.tabConListWidth * i)
          }
        }
        self.scrollXArray = scrollXArray
        self.$nextTick(() => {
          self.activeDefault(this.curTabIndex, transData)
        })
      }
    }
  },
  mounted() {
    this.init()
    this.typeClass = this.typeClassMap[this.type]
  },
  watch: {
    tabList: {
      handler() {
        this.init()
      },
      deep: true,
      immediately: true
    },
    tabListIn: {
      handler() {
      },
      deep: true,
      immediately: true
    },
    type: {
      handler() {
        this.typeClass = this.typeClassMap[this.type]
      },
      immediately: true
    },
    defaultSelect: {
      handler(newVal) {
        this.init()
      },
      deep: true,
      immediately: true
    }
  }

}
</script>
<style lang="scss">
// Tab组件
.T-tab {
  font-size: 0;
  text-align: left;
  box-sizing: border-box;
  width: auto;
  background: var(--common-background);
  padding: 0 10px;
  border-bottom: 1px solid #dcdee2;
  .offset {
    padding: 5px 10px;
    pointer-events:auto;
    cursor: pointer;
    i {
      color: #333;
      font-size: 14px;
    }
  }
  .offset:hover {
    i {
      color: var(--primary-color);
    }
  }
  .offset.visible-disabled{
    pointer-events:none;
    cursor: not-allowed;
    i {
      color: #333;
    }
  }
  .offset.visible-disabled:hover{
    pointer-events:none;
    cursor: not-allowed;
    i {
      color: #333;
    }
  }
  .offset.hidden {
    display: none;
  }
  .offset.visible{
    visibility: visible;
  }
  .tab-con-list {
    overflow: hidden;
    width: calc(100% - 70px);
    white-space: nowrap;
  }
  .transform-x-scroll{
     float:left;
     transition: all .3s ease-in-out;
  }

  li {
    cursor: pointer;
    text-align: center;
    .tab-li {
      margin-right: 4px;
      line-height: 30px;
      padding: 5px 15px 4px 15px;
      border-bottom: 0;
      transition: all .3s ease-in-out;
      position: relative;
      border-bottom: solid 2px transparent;
      span {
        font-size: 16px;
        color: #333;
      }
      em {
        padding-left: 5px;
        visibility: hidden;
        font-size: 14px;
        color: #333;
      }
      .tabLi-infor {
        .tabLi-infor-count {
          position: absolute;
          right: -5px;
          top: -10px;
          box-sizing: border-box;
          border-radius: 10px;
          font-size: 12px;
          line-height: 20px;
          min-width: 20px;
          background: red;
          color: #fff;
          padding: 0 5px;
        }
      }
    }
  }
  li.active {
    .tab-li {
      border-bottom: solid 2px var(--primary-color);
      span {
        color: var(--primary-color);
      }
      .tabLi-infor {
        .tabLi-infor-count {
          color: #fff;
        }
      }
    }
  }
  li:hover {
    .tab-li {
      // border-bottom: solid 2px var(--primary-color);
      span {
        color: var(--primary-color);
      }
      em {
       visibility: visible;
        color: #ed4014;
      }

      .tabLi-infor {
        .tabLi-infor-count {
          color: #fff;
        }
      }
    }
  }
}

.Ttab-con.button {
  font-size: 0;
  text-align: left;
  background: transparent;
  border: none;

  .tab-con-list {
    width: calc(100% - 70px);
    padding: 6px 0;
    text-align: center;
  }
  li {
    cursor: pointer;
    width: auto;
    text-align: center;
    .tab-li {
      margin: 0px 3px;
      line-height: 32px;
      padding: 0 8px;
      border: solid 1px #ddd;
      background: #fff;
      span {
        font-size: 14px;
        font-weight: normal;
        color: #333;
      }
    }
  }

  li.active {
    .tab-li {
      border: solid 1px #2a8bfd;

      span {
        color: #2a8bfd;
      }

      .tabLi-infor {
        .tabLi-infor-count {
          color: #fff;
        }
      }
    }
  }

  li:hover {
    .tab-li {
      box-shadow: 0px 0px 2px var(--primary-color);
      border: solid 1px transparent;

      span {
        color: #2a8bfd;
      }

      .tabLi-infor {
        .tabLi-infor-count {
          color: #fff;
        }
      }
    }
  }

  li.active:hover {
    .tab-li {
      box-shadow: 0px 0px 2px var(--primary-color);
      border: solid 1px #2a8bfd;

      span {
        color: #2a8bfd;
      }

      .tabLi-infor {
        .tabLi-infor-count {
          color: #fff;
        }
      }
    }
  }
}

.Ttab-con.w100 {
  .tab-con-list {
    width: 100%;
    text-align: left;
  }
  .offset {
    display: none;
  }
}

.Ttab-con.w-button-offset {
  .tab-con-list {
    width: calc(100% - 70px);
  }

  .offset {
    padding: 5px;
  }
}

.Ttab-con.w-default-offset {
  .tab-con-list {
    width: calc(100% - 70px);
  }
  .offset {
    padding: 10px;
  }
}
</style>
