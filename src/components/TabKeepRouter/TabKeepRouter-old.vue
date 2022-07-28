<!--  tab切换组件   Author:Titans@2396757591@qq.com -->
<template>
  <div class="TabKeepRouter-con" :class="styleClass">
    <div ref="tabContents" class="tab-con-main fn-inline">
      <div
        class="fn-inline pointer left offset"
        :style="{ visibility: ishideprev ? 'hidden' : 'visible' }"
        @click="onPrev"
      >
        <i class="fn-inline base-font baseqiehuanqizuo"></i>
      </div>
      <ul class="fn-inline">
        <li
          v-for="(item,index) in tabListIn"
          :key="index"
          class="fn-inline"
          :class="item.isactive ? 'active' : ''"
          @click.stop="onTabBeforeClick(item, index)"
        >
          <el-tooltip v-if="item.name.length > 6" :content="item.name" placement="top">
            <div class="tab-li">
              <div class="tab-li-text">
                <span class="fn-inline olh">{{ item.name }}</span>
                <em
                  class="fn-inline base-font basebaseline-close-px"
                  @click.stop="onTabElEditClick('remove',item,index)"
                ></em>
              </div>
              <div class="tab-li-text-ac"></div>
            </div>
          </el-tooltip>
          <div v-if="item.name.length <= 6" class="tab-li">
            <div class="tab-li-text">
              <span class="fn-inline olh">{{ item.name }}</span>
              <em
                class="fn-inline base-font basebaseline-close-px"
                @click.stop="onTabElEditClick('remove',item,index)"
              ></em>
            </div>
            <div class="tab-li-text-ac"></div>
          </div>
        </li>
      </ul>
      <div
        class="fn-inline pointer next offset"
        :style="{ visibility: ishidenext ? 'hidden' : 'visible' }"
        @click="onNext"
      >
        <i class="fn-inline base-font baseqiehuanqiyou"></i>
      </div>
    </div>
    <div ref="tabContentsOption" class="tab-option-content fn-inline">
      <div
        class="tab-clection fn-inline pointer"
        :class="isCollect ? 'active' : ''"
        @click="onCollectClick"
      >
        <i class="fn-inline base-font baseshoucang"></i>
        <span class="fn-inline">{{ isCollect ? '已收藏' : '未收藏' }}</span>
      </div>
      <div v-ClickOutside="hideSelectDrop" class="tab-option fn-inline">
        <div
          class="tab-option-select pointer"
          :class="selectDrop === true ? 'active' : ''"
          @click.capture="toggleDrop"
        >
          <i class="fn-inline"></i>
          <span class="fn-inline">页签操作</span>
          <em class="fn-inline base-font basexiala"></em>
        </div>
        <div v-if="selectDrop" class="tab-option-list">
          <ul class="tab-option-listcon">
            <li
              v-for="(item,index) in rightOptions"
              :key="index"
              class="pointer"
              @click="onRightOptionsClick(item,index)"
            >
              <span class="fn-inline">{{ item.label }}</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="tabKeepRouter-right fn-inline">

        <slot name="tabKeepRouter-right"></slot>
      </div>
    </div>
    <slot></slot>
  </div>
</template>
<script>
import ClickOutside from './clickOutside.js'
export default {
  name: 'EpTab',
  directives: {
    ClickOutside
  },
  props: {
    tabClass: {
      type: String,
      default() {
        return 'model2'
      }
    },
    isCollect: {
      type: Boolean,
      default() {
        return false
      }
    },
    tabList: {
      type: Array,
      default() {
        return []
      }
    },
    value: {
      type: [String, Object],
      default() {
        return {}
      }
    }
  },
  model: {
    prop: 'value',
    event: 'input'
  },
  data() {
    return {
      newValue: null,
      selectDrop: false,
      firstel: '',
      lastel: '',
      ishideprev: true,
      ishidenext: false,
      tabListIn: [],
      tabListCp: [],
      curSelectTab: {},
      defaultTabList: [],
      isOne: false,
      navWidth: 'auto',
      tabDefaultCount: 9,
      rightOptions: [
        {
          code: 'closeOther',
          value: 'closeOther',
          label: '关闭除当前标签外其他'
        },
        {
          code: 'closeAll',
          value: 'closeAll',
          label: '关闭所有'
        },
        {
          code: 'closeCur',
          value: 'closeCur',
          label: '关闭当前'
        },
        {
          code: 'refreshCur',
          value: 'refreshCur',
          label: '刷新当前'
        }
      ]
    }
  },
  computed: {
    styleClass() {
      let styleClass = this.tabClass
      return styleClass
    }
  },
  methods: {
    Arrmovebit: function (arr, movedirection, movebit) {
      // 数组偏移
      for (var i = 0; i < movebit; i++) {
        if (movedirection === 'right') {
          arr.unshift(arr.pop())
        } else {
          arr.push(arr.shift())
        }
      }
      return arr
    },
    arrAddProps(arr, prop, value) {
      // 批更新重置属性
      arr.forEach(function (item, index) {
        arr[index][prop] = value
      })
      return arr
    },
    getIndexOf(arr, value, key) {
      // 按key值获取索引
      let indexOf = -1
      if (!Array.isArray(arr)) return -1
      let someof = arr.some((item, index) => {
        indexOf = index
        return item[key] === value
      })
      if (someof) {
        return indexOf
      }
      return -1
    },
    hideSelectDrop() {
      // 隐藏下拉集
      this.selectDrop = false
    },
    toggleDrop() {
      // 显示或隐藏下拉集
      this.selectDrop = !this.selectDrop
    },
    onPrev() {
      // 左偏移
      this.ishideprev = false
      this.ishidenext = false
      this.tabListCp = this.Arrmovebit(this.tabListCp, 'right', 1)
      this.tabListIn = this.tabListCp.slice(0, this.tabDefaultCount)
      if (this.tabListIn[0] === this.firstel) {
        this.ishideprev = true
      }
    },
    onNext() {
      // 右偏移
      this.ishideprev = false
      this.ishidenext = false
      this.tabListCp = this.Arrmovebit(this.tabListCp, 'left', 1)
      this.tabListIn = this.tabListCp.slice(0, this.tabDefaultCount)
      if (this.tabListIn[this.tabDefaultCount - 1] === this.lastel) {
        this.ishidenext = true
      }
    },
    onCollectClick() {
      this.$emit('onCollectClick', this.isCollect)
    },
    onTabBeforeClick(obj) {
      // 点击前
      this.newValue = obj.remark
      this.$emit('input', this.newValue)
    },
    onTabElClick(value) {
      // 点击后
      this.curTabIndex = this.getIndexOf(this.tabListCp, value, 'remark')
      let indeOf = this.getIndexOf(this.tabListIn, value, 'remark')
      this.tabListIn = this.arrAddProps(this.tabListIn, 'isactive', false)
      this.curSelectTab = this.tabListIn[indeOf]
      this.$set(
        this.tabListIn,
        indeOf,
        Object.assign(this.tabListIn[indeOf], { isactive: true })
      )
    },
    onTabElEditClick(action, item, index) {
      let self = this
      window.event.stopPropagation()
      if (action === 'remove' && item.code !== 'Home') {
        let indexOf = this.getIndexOf(this.tabListCp, item.remark, 'remark')
        // let delectIndexOf = this.curTabIndex >= 1 ? this.curTabIndex - 1 : this.tabListCp.length - 2
        if (indexOf <= this.curTabIndex) {
          this.tabListCp.splice(indexOf, 1)
          if (this.tabListCp.length > 0) {
            this.curTabIndex -= 1
          }
          this.$emit('onTabListChange', this.tabListCp)
          this.tabListIn = this.tabListCp.slice(0, this.tabDefaultCount)
          setTimeout(() => {
            self.newValue = self.tabListCp[self.curTabIndex].remark
            self.$emit('input', self.newValue)
          }, 10)
        } else {
          this.tabListCp.splice(indexOf, 1)
          this.tabListIn = this.tabListCp.slice(0, this.tabDefaultCount)
          this.$emit('onTabListChange', this.tabListCp)
          setTimeout(() => {
            self.newValue = self.tabListCp[self.curTabIndex].remark
            self.$emit('input', self.newValue)
          }, 10)
        }
      }
    },
    isRenderMenu() {
      return Array.isArray(this.tabListCp) && this.tabListCp.length > 0
    },
    onRightOptionsClick(item) {
      // 下拉框执行操作
      switch (item.code) {
        case 'closeOther':
          if (this.curSelectTab.remark === 'Home') {
            this.tabListCp = [...this.defaultTabList]
          } else {
            this.tabListCp = [...this.defaultTabList, ...[this.curSelectTab]]
          }
          this.tabListIn = this.tabListCp.slice(0, this.tabDefaultCount)
          this.$emit('onTabListChange', this.tabListCp)
          break
        case 'closeAll':
          this.tabListCp = [...this.defaultTabList]
          this.tabListIn = this.tabListCp.slice(0, this.tabDefaultCount)
          this.$emit('onTabListChange', this.tabListCp)
          this.$nextTick(() => {
            this.newValue = this.tabListCp[0].remark
            this.$emit('input', this.newValue)
          })
          break
        case 'closeCur':
          if (
            this.curTabIndex >= 1 &&
            this.tabListCp[this.curTabIndex].code !== 'Home'
          ) {
            this.tabListCp.splice(this.curTabIndex, 1)
            if (this.tabListCp.length > 0) {
              this.curTabIndex -= 1
            }
            this.tabListIn = this.tabListCp.slice(0, this.tabDefaultCount)
            this.$nextTick(() => {
              this.newValue = this.tabListCp[this.curTabIndex].remark
              this.$emit('input', this.newValue)
            })
          }
          break
        case 'refreshCur':
          if (this.curTabIndex >= 0) {
            this.$emit('onRefreshClick', this.value)
          }
          break
        default:
      }
      this.selectDrop = false
    },
    setNavCount() {
      // 设置默认显示菜单个数
      let tabContentsWidth = this.$refs.tabContents.offsetWidth
      let navwidth = tabContentsWidth - 100
      let navCount = Math.floor(navwidth / 150)
      this.tabDefaultCount = navCount
      // if (this.tabListCp.length <= this.tabDefaultCount) {
      //   this.tabDefaultCount = this.tabListCp.length
      // }
    },
    setNavDefaultIn() {
      // 设置渲染数据
      this.curTabIndex = this.getIndexOf(
        this.tabListCp,
        this.newValue,
        'remark'
      )
      if (this.curTabIndex < 0) {
        this.curTabIndex = 0
      }
      this.firstel = this.tabListCp[0]
      this.lastel = this.tabListCp[this.tabListCp.length - 1]
      if (this.tabListCp.length <= this.tabDefaultCount) {
        this.ishideprev = true
        this.ishidenext = true
      }
      if (this.curTabIndex < this.tabListCp.length) {
        if (this.curTabIndex > this.tabDefaultCount - 1) {
          let count = this.curTabIndex - this.tabDefaultCount + 1
          while (count > 0) {
            this.onNext()
            count--
          }
        }
        this.tabListIn = this.tabListCp.slice(0, this.tabDefaultCount)
        if (this.tabListIn[this.tabListIn.length - 1] === this.lastel) {
          this.ishidenext = true
        }
      }
    }
  },
  mounted() {
    this.setNavCount()
  },
  watch: {
    isCollect: {
      handler() {},
      immediately: true
    },
    tabList: {
      handler() {
        this.tabListCp = [].concat(this.tabList)
        this.setNavDefaultIn()
      },
      immediately: true
    },
    newValue: {
      handler(newValue) {
        if (newValue && this.tabListCp.length) {
          this.onTabElClick(this.newValue)
        }
        if (!this.defaultTabList.length) {
          this.defaultTabList = JSON.parse(JSON.stringify([this.tabList[0]]))
        }
      },
      deep: true,
      immediately: true
    },
    value: {
      handler(newValue) {
        this.newValue = this.value
        // if (newValue && this.tabListCp.length) {
        //   this.onTabElClick(this.newValue)
        // }
        // if (!this.defaultTabList.length) {
        //   this.defaultTabList = JSON.parse(JSON.stringify([this.tabList[0]]))
        // }
      },
      deep: true,
      immediately: true
    }
  }
}
</script>
<style lang="scss">
.TabKeepRouter-con {
  /*position: fixed;*/
  /*left: 0;*/
  /*right: 0;*/
  /*top: 50px;*/
  /*z-index: 99999;*/
  padding: 0 10px;
  font-size: 0;
  text-align: left;
  background: #d0e6fa;
  border-bottom: 1px solid #ddd;
  .tab-option {
    position: relative;
  }
  .tab-option-content {
    width: 190px;
    .tab-clection {
      box-sizing: border-box;
      width: 80px;
      height: 30px;
      line-height: 30px;
      border: 1px solid #ddd;
      text-align: center;
      border-radius: 2px;
      i {
        margin-right: 5px;
        color: #333;
        font-size: 12px;
      }
      span {
        color: #333;
        font-size: 14px;
      }
    }
    .tab-clection:hover {
      border: 1px solid var(--primary-color);
      i {
        color: var(--primary-color);
      }
      span {
        color: var(--primary-color);
      }
    }
    .tab-clection.active {
      border: 1px solid var(--primary-color);
      i {
        color: var(--primary-color);
      }
      span {
        color: var(--primary-color);
      }
    }
  }
  .tab-option {
    width: 100px;
    margin-left: 10px;
  }
  .tab-option-select {
    box-sizing: border-box;
    height: 30px;
    line-height: 30px;
    border: 1px solid #ddd;
    text-align: center;
    border-radius: 2px;
    span {
      color: #333;
      font-size: 14px;
      width: 60px;
    }
    em {
      margin-left: 5px;
      color: #333;
      font-size: 5px;
    }
  }
  .tab-option-select:hover {
    border: 1px solid var(--primary-color);
    span {
      color: var(--primary-color);
    }
    em {
      color: var(--primary-color);
    }
  }
  .tab-option-select.active {
    border: 1px solid var(--primary-color);
    span {
      color: var(--primary-color);
    }
    em {
      transform-origin: center center;
      transform: rotate(180deg);
      color: var(--primary-color);
    }
  }
  .tab-option-list {
    z-index: 300;
    position: absolute;
    top: 42px;
    right: 0;
    width: 180px;
    padding: 5px 0;
    background-color: #fff;
    box-sizing: border-box;
    border-radius: 4px;
    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
    li {
      line-height: 36px;
      span {
        display: block;
        color: #333;
        font-size: 14px;
        margin: 0 10px;
      }
    }
    li:hover {
      span {
        color: var(--primary-color);
      }
    }
  }
  .tab-con-main {
    width: calc(100% - 190px);
    li {
      cursor: pointer;
      outline: none;
      text-align: center;
      box-sizing: border-box;
      padding: 0 16px;
      .tab-li {
        border: none;
        padding: 0 10px;
        height: 30px;
        line-height: 30px;
        span {
          color: #333;
          max-width: 100px;
          font-size: 14px;
        }
        em {
          margin-left: 10px;
          display: none;
          font-size: 14px;
          color: #333;
        }
      }
      .tab-li-text-ac {
        height: 3px;
        width: 30px;
        margin: 0 auto;
        margin-top: 2px;
      }
    }

    li.active {
      .tab-li {
        span {
          color: var(--primary-color);
        }
      }
      .tab-li-text-ac {
        background: var(--primary-color);
      }
    }
    li:hover {
      .tab-li {
        span {
          color: var(--primary-color);
        }
        em {
          display: inline-block;
          color: #ed4014;
        }
      }
      .tab-li-text-ac {
        background: var(--primary-color);
      }
    }
    .offset {
      padding: 10px;
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
  }
}
.TabKeepRouter-con.model2 {
  .tab-con-main {
    margin-left: 100px;
    width: calc(100% - 390px);
  }
  .tabKeepRouter-right {
    width: 94px;
    margin-left: 6px;
    label {
      font-size: 12px;
      color: #2e3133;
      margin-right: 0px;
    }
    .vxe-switch {
      line-height: 20px;
      padding: 0 0 0 8px;
      .vxe-switch--button {
        width: 50px;
        height: 34px;
        font-size: 0;
      }
      .vxe-switch--icon {
        height: 26px;
        width: 26px;
        margin: 3px 0 0 0;
      }
    }
    .vxe-switch.is--off .vxe-switch--button {
      background: url('./img/icon-gz.png') center no-repeat;
      background-size: 100% 100%;
    }
    .vxe-switch.is--off .vxe-switch--icon {
      background: url('./img/icon-gy.png') center no-repeat;
      background-size: 100% 100%;
    }
    .vxe-switch.is--on .vxe-switch--button {
      background: url('./img/icon-bz.png') center no-repeat;
      background-size: 100% 100%;
    }
    .vxe-switch.is--on .vxe-switch--icon {
      background: url('./img/icon-by.png') center no-repeat;
      background-size: 100% 100%;
      transform: translateX(-25px);
    }
  }
  .tab-option-content {
    width: 290px;
  }
}
</style>
