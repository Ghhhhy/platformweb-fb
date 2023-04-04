<template>
  <div class="TabKeepRouter-con" :class="styleClass">
    <div
      ref="tabContents"
      class="tab-con-main fn-inline"
      style="display:flex"
      :style="{ background: isShowHeader ? '#fff' : '#1F8CFB' }"
    >
      <div
        :class="{ ishideprev }"
        class="fn-inline pointer left offset"
        @click="onPrevPrev"
      >
        <i
          class="fn-inline base-font baseqiehuanqizuo"
          :style="{ color: isShowHeader ? '#1F8CFB' : '#fff' }"
        ></i>
      </div>
      <div ref="tabList" class="fn-inline tabList">
        <ul class="fn-inline">
          <li
            v-for="(item, index) in tabListIn"
            :key="index"
            class="fn-inline"
            :class="((index === tabListIn.length - 1) ? 'end' : '') + ' ' + (item.isactive ? 'active' : '')"
            @click.stop="onTabBeforeClick(item, index)"
          >
            <el-tooltip
              v-if="item.name.length > 6"
              :content="item.name"
              placement="top"
            >
              <div class="tab-li">
                <div class="tab-li-text">
                  <div class="fn-inline" style="position:relative">
                    <span
                      ref="liHeader"
                      class="fn-inline olh"
                      :style="{ color: isShowHeader ? '#1F8CFB' : '#fff' }"
                    >{{ item.name }}</span>
                    <div class="tab-li-text-ac" style="position:absolute;left:50%;margin-left:-15px;bottom:0;"></div>
                  </div>
                  <em
                    v-if="!item.noClear"
                    class="fn-inline base-font basebaseline-close-px"
                    @click.stop="onTabElEditClick('remove', item, index)"
                  ></em>
                </div>

              </div>
            </el-tooltip>
            <div v-if="item.name.length <= 6" class="tab-li">
              <div class="tab-li-text">
                <div class="fn-inline" style="position:relative">
                  <span class="fn-inline olh">{{ item.name }}</span>
                  <div class="tab-li-text-ac" style="position:absolute;left:50%;margin-left:-15px;bottom:0;"></div>
                </div>
                <em
                  v-if="!item.noClear"
                  class="fn-inline base-font basebaseline-close-px"
                  @click.stop="onTabElEditClick('remove', item, index)"
                ></em>
              </div>

            </div>
          </li>
        </ul>
      </div>
      <div
        :class="{ ishideprev }"
        class="fn-inline pointer next offset"
        @click="onNextNext"
      >
        <i
          class="fn-inline base-font baseqiehuanqiyou"
          :style="{ color: isShowHeader ? '#1F8CFB' : '#fff' }"
        ></i>
      </div>
    </div>
    <div
      ref="tabContentsOption"
      class="tab-option-content fn-inline"
      :style="{ background: isShowHeader ? '#fff' : '#1F8CFB' }"
    >
      <div class="tab-picker fn-inline">
        <el-tooltip content="切换主题">
          <el-dropdown trigger="click" size="small">
            <span class="el-dropdown-link">
              <i class="ri-t-shirt-2-fill"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="handleThemePickerClick('#4d77e7')">
                <span class="color-plate" style="background: #4d77e7;"></span>
                沉稳紫(默认)
              </el-dropdown-item>
              <el-dropdown-item divided @click.native="handleThemePickerClick('#0189ff')">
                <span class="color-plate" style="background: #1E8CFB;"></span>
                冷静蓝
              </el-dropdown-item>
              <el-dropdown-item @click.native="handleThemePickerClick('#009688')">
                <span class="color-plate" style="background: #009688;"></span>
                水鸭青
              </el-dropdown-item>
              <el-dropdown-item @click.native="handleThemePickerClick('#ff5d7a')">
                <span class="color-plate" style="background: #ff5d7a;"></span>
                明亮粉
              </el-dropdown-item>
              <el-dropdown-item @click.native="handleThemePickerClick('#444444')">
                <span class="color-plate" style="background: #444444;"></span>
                深邃黑
              </el-dropdown-item>
              <el-dropdown-item @click.native="handleThemePickerClick('#a42e2d')">
                <span class="color-plate" style="background: #a42e2d;"></span>
                石榴裙
              </el-dropdown-item>
              <el-dropdown-item @click.native="handleThemePickerClick('#655156')">
                <span class="color-plate" style="background: #655156;"></span>
                玄天色
              </el-dropdown-item>
              <el-dropdown-item @click.native="handleThemePickerClick('#d37f9e')">
                <span class="color-plate" style="background: #d37f9e;"></span>
                苏梅色
              </el-dropdown-item>
              <el-dropdown-item divided @click.native="$refs.themePicker.showPicker">
                <BsThemePicker ref="themePicker" style="visibility: hidden" />
                自定义
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-tooltip>
      </div>
      <div
        class="tab-clection fn-inline pointer"
        :class="isCollect ? 'active' : ''"
        @click="onCollectClick"
      >
        <p ref="pCollection" :class="isCollect ? 'active' : 'activeBak'"></p>
        <span class="fn-inline">{{ isCollect ? '已收藏' : '未收藏' }}</span>
      </div>
      <div v-ClickOutside="hideSelectDrop" class="tab-option fn-inline">
        <div
          :style="{ background: isShowHeader ? '#fff' : '#1F8CFB' }"
          class="tab-option-select pointer"
          :class="selectDrop === true ? 'active' : 'down'"
          @click.capture="toggleDrop"
        >
          <span
            :style="{ color: isShowHeader ? '#2E3133' : '#fff' }"
            class="fn-inline"
          >页签操作</span>
          <p></p>
        </div>
        <div v-if="selectDrop" class="tab-option-list">
          <ul class="tab-option-listcon">
            <li
              v-for="(item, index) in rightOptions"
              :key="index"
              class="pointer"
              @click="onRightOptionsClick(item, index)"
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
import mixins from '../../tools/mixin'
import ClickOutside from './clickOutside.js'
export default {
  name: 'BsTabKeepRouter',
  mixins: [mixins],
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
    },
    isShowHeader: {
      type: Boolean,
      default() {
        return true
      }
    }
  },
  model: {
    prop: 'value',
    event: 'input'
  },
  data() {
    return {
      currTheme: false,
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
          // console.log(arr.shift(), arr.pop(), 111)
          arr.splice(1, 0, arr.pop())
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
    onPrevPrev() {
      // 左偏移
      this.$refs.tabList.scrollLeft -= this.$refs.tabList.offsetWidth
    },
    onNextNext() {
      // 右偏移
      this.$refs.tabList.scrollLeft += this.$refs.tabList.offsetWidth
    },
    onCollectClick() {
      this.$emit('onCollectClick', this.isCollect)
    },
    onTabBeforeClick(obj) {
      // 点击前
      this.newValue = obj.url
      this.$emit('input', this.newValue)
    },
    onTabElClick(value) {
      // 点击后
      this.curTabIndex = this.getIndexOf(this.tabListCp, value, 'url')
      this.tabListIn = this.arrAddProps(this.tabListIn, 'isactive', false)
      this.curSelectTab = this.tabListCp[this.curTabIndex]
      let indeOf = this.getIndexOf(this.tabListIn, value, 'url')
      if (indeOf >= 0) {
        this.$set(
          this.tabListIn,
          indeOf,
          Object.assign(this.tabListIn[indeOf], { isactive: true })
        )
      }
      if (!this.ishideprev) {
        this.$nextTick(() => {
          let active = this.$refs.tabList.querySelector('.active')
          this.$refs.tabList.scrollLeft = active.offsetLeft - 300
        })
      }
    },
    onTabElEditClick(action, item, index) {
      let self = this
      window.event && window.event.stopPropagation()
      if (action === 'remove' && item.code !== 'Home') {
        let indexOf = this.getIndexOf(this.tabListCp, item.url, 'url')
        // let delectIndexOf = this.curTabIndex >= 1 ? this.curTabIndex - 1 : this.tabListCp.length - 2
        if (indexOf <= this.curTabIndex) {
          this.tabListCp.splice(indexOf, 1)
          if (this.tabListCp.length > 0) {
            this.curTabIndex -= 1
          }
          this.$emit('onTabListChange', this.tabListCp)
          // this.tabListIn = this.tabListCp.slice(0, this.tabDefaultCount)
          if (this.tabListCp.length <= this.tabDefaultCount) {
            this.tabListIn = this.tabListCp.slice(0, this.tabDefaultCount)
          } else {
            this.tabListIn = this.tabListCp.slice(this.tabListCp.length - this.tabDefaultCount, this.tabListCp.length)
          }
          setTimeout(() => {
            self.newValue = self.tabListCp[self.curTabIndex].url
            self.$emit('input', self.newValue)
          }, 10)
        } else {
          this.tabListCp.splice(indexOf, 1)
          // this.tabListIn = this.tabListCp.slice(0, this.tabDefaultCount)
          if (this.tabListCp.length <= this.tabDefaultCount) {
            this.tabListIn = this.tabListCp.slice(0, this.tabDefaultCount)
          } else {
            this.tabListIn = this.tabListCp.slice(this.tabListCp.length - this.tabDefaultCount, this.tabListCp.length)
          }
          this.$emit('onTabListChange', this.tabListCp)
          setTimeout(() => {
            self.newValue = self.tabListCp[self.curTabIndex].url
            self.$emit('input', self.newValue)
          }, 10)
        }
      }
      this.$nextTick(() => {
        let end = this.$refs.tabList.querySelector('.end')
        if (end.offsetLeft + end.offsetWidth > this.$refs.tabList.offsetWidth) {
          this.ishideprev = false
        } else {
          this.ishideprev = true
        }
      })
    },
    isRenderMenu() {
      return Array.isArray(this.tabListCp) && this.tabListCp.length > 0
    },
    onRightOptionsClick(item) {
      // 下拉框执行操作
      switch (item.code) {
        case 'closeOther':
          if (this.curSelectTab.url === 'Home') {
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
            this.newValue = this.tabListCp[0].url
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
              this.newValue = this.tabListCp[this.curTabIndex].url
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
      this.tabDefaultCount = this.tabListCp.length
    },
    handleThemePickerClick(colorTheme) {
      let currTheme = localStorage.getItem('__boss__colortheme__') || '#4d77e7'
      this.$refs.themePicker.changeTheme(colorTheme)
      this.currTheme = currTheme
    },
    setNavDefaultIn() {
      // 设置渲染数据
      this.curTabIndex = this.getIndexOf(this.tabListCp, this.$store.state.curNavModule.url, 'url')
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
          this.ishideprev = false
          this.ishidenext = false
          this.tabListIn = this.tabListCp.slice(this.curTabIndex - this.tabDefaultCount + 1, this.curTabIndex + 1)
        } else {
          this.ishideprev = true
          this.ishidenext = false
          this.tabListIn = this.tabListCp.slice(0, this.tabDefaultCount)
        }
        if (this.tabListIn[this.tabListIn.length - 1] === this.lastel) {
          this.ishidenext = true
        }
      }
    }
  },
  mounted() {
    this.setNavCount()
    let currTheme = localStorage.getItem('__boss__colortheme__')
    if (!currTheme || !currTheme.startsWith('#')) {
      currTheme = '#4d77e7'
    }
    this.$refs.themePicker.changeTheme(currTheme)
    this.currTheme = currTheme
  },
  watch: {
    tabList: {
      handler() {
        this.tabListCp = [].concat(this.tabList)
        let scrollLeft = this.$refs.tabList.scrollLeft
        this.setNavCount()
        this.setNavDefaultIn()
        this.$nextTick(() => {
          let end = this.$refs.tabList.querySelector('.end')
          if (end.offsetLeft + end.offsetWidth > this.$refs.tabList.offsetWidth) {
            this.ishideprev = false
            this.$nextTick(() => {
              this.$refs.tabList.scrollTo({
                top: 0,
                left: scrollLeft,
                behavior: 'instant'
              })
              this.$nextTick(() => {
                let active = this.$refs.tabList.querySelector('.active')
                this.$refs.tabList.scrollLeft = active.offsetLeft - 300
              })
            })
          } else {
            this.ishideprev = true
          }
        })
      },
      immediately: true
    },
    isCollect: {
      handler() {},
      immediately: true
    },
    // tabList: {
    //   handler() {
    //     this.tabListCp = [].concat(this.tabList)
    //     this.setNavCount()
    //     this.setNavDefaultIn()
    //   },
    //   immediately: true
    // },
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
    isShowHeader: {
      handler(newValue) {
        // console.log(newValue, this.$refs.liHeader)
        // if (newValue) {
        //   this.$refs.liHeader[0].style.cssText = 'background: yellow;'
        //   console.log(this.$refs.liHeader[0].style.color)
        // } else {
        //   this.$refs.liHeader[0].style.cssText = 'background: red;'
        //   console.log(this.$refs.liHeader[0].style.color)
        // }
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
  // background: #d0e6fa;
  // border-bottom: 1px solid #ddd;
  position: relative;
  z-index: 100;
  .tabList {
    padding-top: 5px;
    scroll-behavior: smooth;
    margin-bottom: -24px;
    height: 44px;
    position: relative;
    width:calc(100% - 100px);
    // max-width: calc(100vw - 322px);
    // min-width: calc(100vw - 322px);
    overflow-y: hidden;
    overflow-x: auto;
    ul{
      display: flex!important;
      li{
        height: 40px;
        line-height:40px;
        .tab-li-text{
          height:36px;
        }
      }
    }
  }
  ::-webkit-scrollbar {
    width: 0px;
    height: 0px;
  }
  .tab-option {
    position: relative;
  }
  .tab-option-content {
    width: 265px;
    .tab-clection {
      margin-top: 11px;
      box-sizing: border-box;
      width: 76px;
      height: 24px;
      background: #f2f4f8;
      border-radius: 5px;
      line-height: 18px;
      text-align: center;
      border-radius: 2px;
      .active {
        display: inline-block;
        width: 12px;
        height: 12px;
        background: url('./img/yscicon.svg') left no-repeat;
        margin: 4px 4px 0 0;
        // color: #333;
        // font-size: 12px;
      }
      .activeBak {
        display: inline-block;
        width: 12px;
        height: 12px;
        background: url('./img/wscicon.svg') left no-repeat;
        margin: 4px 4px 0 0;
        // color: #333;
        // font-size: 12px;
      }
      span {
        line-height: 17px;
        color: #2e3133;
        font-size: 14px;
        padding-bottom: 10px;
      }
    }
    .tab-clection:hover {
      // border: 1px solid #1890ff;
      i {
        // color: #1890ff;
      }
      span {
        // color: #1890ff;
      }
    }
    .tab-clection.active {
      // border: 1px solid #1890ff;
      i {
        color: #f13939;
        // color: #1890ff;
      }
      span {
        color: #333;
        // color: #1890ff;
      }
    }
  }
  .tab-option {
    margin-top: 11px;
    width: 78px;
    margin-left: 10px;
  }
  .tab-option-select {
    box-sizing: border-box;
    width: 76px;
    height: 24px;
    line-height: 18px;
    // border: 1px solid #ddd;
    text-align: center;
    border-radius: 2px;
    p {
      display: inline-block;
      width: 12px;
      height: 12px;
      background: url('./img/down.svg') left no-repeat;
      margin: 4px 4px 0 0;
      // color: #333;
      // font-size: 12px;
    }
    span {
      line-height: 17px;
      color: #2e3133;
      font-size: 14px;
      padding-bottom: 10px;
    }
    // em {
    //   margin-left: 5px;
    //   color: #333;
    //   font-size: 5px;
    // }
  }
  .tab-option-select:hover {
    // border: 1px solid #1890ff;
    span {
      // color: #1890ff;
    }
    em {
      // color: #1890ff;
    }
  }
  .tab-option-select.active {
    // border: 1px solid #1890ff;
    span {
      color: #1890ff;
    }
    i {
      color: #1890ff;
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
        color: #1890ff;
      }
    }
  }
  .tab-con-main {
    width: calc(100% - 190px);
     .ishideprev{
      visibility:hidden
    }
    li {
      cursor: pointer;
      outline: none;
      text-align: center;
      box-sizing: border-box;
      .tab-li {
        border: none;
        line-height: 40px;
        &>div{
          padding: 0 10px;
          position: relative;
        }
        span {
          color: #1890ff;
          max-width: 126px;
          font-size: 14px;
        }
        em {
          margin-left: 10px;
          visibility: hidden;
          font-size: 14px;
          color: #333;
          position: absolute;
          right: -5px;
        }
      }
      .tab-li-text-ac {
        height: 3px;
        width: 30px;
        margin: 0 auto;
        margin-top: 0px;
      }
    }

    li.active {
      .tab-li {
        span {
          color: #1890ff;
          font-weight: bold;
        }
      }
      .tab-li-text-ac {
        background: #1890ff;
      }
    }
    li:hover {
      .tab-li {
        span {
          color: #1890ff;
        }
        em {
          visibility: visible;
          color: #fff;
        }
      }
      .tab-li-text-ac {
        background: #1890ff;
      }
    }
    .offset {
      padding: 10px;
      display: flex;
      align-items: center;
      i {
        color: #333;
        font-size: 14px;
      }
    }
    .offset:hover {
      i {
        color: #1890ff;
      }
    }
  }
}
.TabKeepRouter-con.model2 {
  display: flex;
  .tab-con-main {
    margin-left: 100px;
    width: calc(100% - 390px);
  }
  .tabKeepRouter-right {
    width: 96px;
    margin-top: 11px;
    border-radius: 4px;
    height: 24px;
    margin-left: 6px;
    label {
      padding-bottom: 7px;
      line-height: 17px;
      font-size: 14px;
      color: #2e3133;
      margin-right: 0px;
    }
    .vxe-switch {
      // line-height: 20px;
      // padding: 0 0 0 8px;
      .vxe-switch--button {
        margin-top: -6px;
        width: 44px;
        height: 28px;
        font-size: 0;
      }
      .vxe-switch--icon {
        margin-top: 0px;
        height: 28px;
        width: 22px;
        // margin: 3px 0 0 0;
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
    width: 239px;
    background: #1890ff;
    height: 47px;
  }
}
.TabKeepRouter-con.model3 {
  /*position: fixed;*/
  /*left: 0;*/
  /*right: 0;*/
  /*top: 50px;*/
  /*z-index: 99999;*/
  padding: 0 10px;
  font-size: 0;
  text-align: left;
  // background: #d0e6fa;
  // border-bottom: 1px solid #ddd;
  position: relative;
  z-index: 100;
  .tab-option {
    position: relative;
  }
  .tab-option-content {
    width: 266px;
    .tab-clection {
      margin-top: 11px;
      box-sizing: border-box;
      width: 76px;
      height: 24px;
      background: #beddfc;
      border-radius: 5px;
      line-height: 18px;
      text-align: center;
      border-radius: 2px;
      .active {
        display: inline-block;
        width: 12px;
        height: 12px;
        background: url('./img/yscicon.svg') left no-repeat;
        margin: 4px 4px 0 0;
        // color: #333;
        // font-size: 12px;
      }
      .activeBak {
        display: inline-block;
        width: 12px;
        height: 12px;
        background: url('./img/wscicon.svg') left no-repeat;
        margin: 4px 4px 0 0;
        // color: #333;
        // font-size: 12px;
      }
      span {
        line-height: 17px;
        color: #2e3133;
        font-size: 14px;
        padding-bottom: 10px;
      }
    }
    .tab-clection:hover {
      border: 1px solid #1890ff;
      i {
        // color: #1890ff;
      }
      span {
        // color: #1890ff;
      }
    }
    .tab-clection.active {
      border: 1px solid #1890ff;
      i {
        color: #1890ff;
      }
      span {
        color: #1890ff;
      }
    }
  }
  .tab-option {
    margin-top: 11px;
    width: 78px;
    margin-left: 10px;
  }
  .tab-option-select {
    box-sizing: border-box;
    width: 76px;
    height: 24px;
    line-height: 18px;
    // border: 1px solid #ddd;
    text-align: center;
    border-radius: 2px;
    p {
      display: inline-block;
      width: 12px;
      height: 12px;
      background: url('./img/down.svg') left no-repeat;
      margin: 4px 4px 0 0;
      // color: #333;
      // font-size: 12px;
    }
    span {
      line-height: 17px;
      color: #2e3133;
      font-size: 14px;
      padding-bottom: 10px;
    }
    // em {
    //   margin-left: 5px;
    //   color: #333;
    //   font-size: 5px;
    // }
  }
  .tab-option-select:hover {
    border: 1px solid #1890ff;
    span {
      // color: #1890ff;
    }
    em {
      // color: #1890ff;
    }
  }
  .tab-option-select.active {
    border: 1px solid #1890ff;
    span {
      color: #1890ff;
    }
    em {
      transform-origin: center center;
      transform: rotate(180deg);
      color: #1890ff;
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
        color: #1890ff;
      }
    }
  }
  .tab-con-main {
    // margin-left: 100px;
    // width: calc(100% - 390px);
    li {
      cursor: pointer;
      outline: none;
      text-align: center;
      box-sizing: border-box;
      .tab-li {
        border: none;
        line-height: 44px;
        &>div{
           padding: 0 10px;
        }
        span {
          color: #fff;
          //max-width: 126px;
          font-size: 14px;
        }
        em {
          margin-left: 10px;
          visibility: hidden;
          font-size: 14px;
          color: #333;

        }
      }
      .tab-li-text-ac {
        height: 3px;
        width: 30px;
        margin: 0 auto;
        margin-top: 0px;
      }
    }

    li.active {
      .tab-li {
        span {
          color: #fff;
          font-weight: bold;
        }
      }
      .tab-li-text-ac {
        background: #fff;
      }
    }
    li:hover {
      .tab-li {
        span {
          color: #1890ff;
        }
        em {
          visibility: visible;
          color: #fff;
        }
      }
      .tab-li-text-ac {
        background: #1890ff;
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
        color: #1890ff;
      }
    }
  }
}
.tab-picker {
  margin: 11px 10px 0 0;
  cursor: pointer;
}
.color-plate {
  box-shadow: 1px 1px 1px #21212188 inset;
  display: inline-block;
  width: 15px;
  height: 16px;
  margin-right: 5px;
  position: relative;
  top: 3px;
  border-radius: 2px;
}
</style>
