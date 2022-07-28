<!--  tab切换组件   Author:Titans@2396757591@qq.com -->
<template>
  <div ref="tabContents" class="tabcon">
    <div class="tab-con-main fn-inline">
      <div
        class="fn-inline pointer left offset"
        :style="{ visibility: ishideprev ? 'hidden' : 'visible' }"
        @click="onPrev"
      >
        <i class="fn-inline base-font baseqiehuanqizuo"></i>
      </div>
      <ul class="fn-inline">
        <li
          v-for="(item,index) in tabDefaultListIn"
          :key="index"
          class="fn-inline"
          :class="item.isactive ? 'active' : ''"
          @click.stop=" onTabBeforeClick(item, index),onTabElClick(item,index)"
        >
          <div class="tab-li">
            <div class="tab-li-text">
              <span class="fn-inline olh" :title="item.name">{{ item.name }}</span>
              <!-- <em
                class="fn-inline base-font basebaseline-close-px"
              ></em> -->
            </div>
            <div class="tab-li-text-ac"></div>
          </div>
        </li>
        <li
          v-for="(item,index) in tabListIn"
          :key="index"
          class="fn-inline"
          :class="item.isactive ? 'active' : ''"
          @click.stop=" onTabBeforeClick(item, index),onTabElClick(item,index)"
        >
          <div class="tab-li">
            <div class="tab-li-text">
              <span class="fn-inline olh" :title="item.name">{{ item.name }}</span>
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
      <div class="tab-clection fn-inline pointer">
        <i class="fn-inline base-font baseshoucang"></i>
        <span class="fn-inline">未收藏</span>
      </div>
      <div class="tab-option fn-inline">
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
        return 'horizontal'
      } // 'horizontal'||'vertical'
    },
    tabDefaultList: {
      type: Array,
      default() {
        return [
        ]
      }
    },
    tabList: {
      type: Array,
      default() {
        return [
        //   {
        //     name: '头部Tab标签页面0',
        //     routerName: ''
        //   },
        //   {
        //     name: '头部Tab标签页面1',
        //     routerName: ''
        //   },
        //   {
        //     name: '头部Tab标签页面2',
        //     routerName: ''
        //   },
        //   {
        //     name: '头部Tab标签页面3',
        //     routerName: ''
        //   },
        //   {
        //     name: '头部Tab标签页面4',
        //     routerName: ''
        //   },
        //   {
        //     name: '头部Tab标签页面5',
        //     routerName: ''
        //   },
        //   {
        //     name: '头部Tab标签页面6',
        //     routerName: ''
        //   },
        //   {
        //     name: '头部Tab标签页面7',
        //     routerName: ''
        //   },
        //   {
        //     name: '头部Tab标签页面8',
        //     routerName: ''
        //   },
        //   {
        //     name: '头部Tab标签页面9',
        //     routerName: ''
        //   },
        //   {
        //     name: '头部Tab标签页面10',
        //     routerName: ''
        //   },
        //   {
        //     name: '头部Tab标签页面11',
        //     routerName: ''
        //   },
        //   {
        //     name: '头部Tab标签页面12',
        //     routerName: ''
        //   },
        //   {
        //     name: '头部Tab标签页面13',
        //     routerName: ''
        //   },
        //   {
        //     name: '头部Tab标签页面14',
        //     routerName: ''
        //   },
        //   {
        //     name: '头部Tab标签页面15',
        //     routerName: ''
        //   }
        ]
      }
    },
    defaultSelectTab: {
      // defaultSelect
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      selectDrop: false,
      firstel: '',
      lastel: '',
      ishideprev: true,
      ishidenext: false,
      tabListIn: [],
      tabListCp: [],
      tabDefaultListIn: [],
      isOne: false,
      defultselectTabCp: {},
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
  methods: {
    Arrmovebit: function(arr, movedirection, movebit) {
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
      arr.forEach(function(item, index) {
        arr[index][prop] = value
      })
      return arr
    },
    getIndexOf(arr, obj, key) {
      // 按key值获取索引
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
    onTabBeforeClick(obj, index) {
      // 点击前
      this.curTabIndex = this.getIndexOf(this.tabListCp, obj, 'name')
      this.defultselectTabCp = obj
      this.$emit('onTabClick', obj)
    },
    onTabElClick(obj, index) {
      // 点击后
      let indeOf = this.getIndexOf(this.tabListIn, obj, 'name')
      this.tabListIn = this.arrAddProps(this.tabListIn, 'isactive', false)
      this.$set(this.tabListIn, indeOf, Object.assign(obj, { isactive: true }))
    },
    onTabElEditClick(action, item, index) {
      let indexOf = this.getIndexOf(this.tabListCp, item, 'name')
      if (indexOf === this.curTabIndex) {
        this.tabListCp.splice(this.curTabIndex, 1)
        if (this.tabListCp.length > 0) {
          this.curTabIndex -= 1
          this.defultselectTabCp = this.tabListCp[this.curTabIndex]
          this.activeDefault(this.defultselectTabCp)
        }
        this.$emit('onTabListChange', this.tabListCp)
        this.tabListIn = this.tabListCp.slice(0, this.tabDefaultCount)
      } else {
        this.tabListCp.splice(indexOf, 1)
        this.tabListIn = this.tabListCp.slice(0, this.tabDefaultCount)
        this.$emit('onTabListChange', this.tabListCp)
      }
    },
    setNavCount() {
      // 设置默认显示菜单个数
      let tabContentsWidth = this.$refs.tabContents.offsetWidth
      let tabContentsOptionWidth = this.$refs.tabContentsOption.offsetWidth
      let navwidth = tabContentsWidth - tabContentsOptionWidth - 100
      let navCount = Math.floor(navwidth / 150)
      this.tabDefaultCount = navCount = this.defultselectTabCp.length
      // if (this.tabListCp.length <= this.tabDefaultCount) {
      //   this.tabDefaultCount = this.tabListCp.length
      // }
      return navCount
    },
    setNavDefaultIn() {
      // 设置渲染数据
      this.curTabIndex = this.getIndexOf(
        this.tabListCp,
        this.defultselectTabCp,
        'name'
      )
      this.firstel = this.tabListCp[0]
      this.lastel = this.tabListCp[this.tabListCp.length - 1]
      if (this.tabListCp.length <= this.tabDefaultCount) {
        this.ishideprev = true
        this.ishidenext = true
      }
      if (this.tabListCp.length === 1) {
        // this.isOne = true
        this.curTabIndex = 0
      }
      if (this.curTabIndex >= 0 && this.curTabIndex < this.tabListCp.length) {
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
        this.activeDefault(this.defultselectTabCp)
      }
    },
    activeDefault(obj) {
      // 设置点击效果
      let indexOf = this.getIndexOf(this.tabListIn, obj, 'name')
      if (indexOf >= 0) {
        this.onTabBeforeClick(obj, indexOf)
        this.onTabElClick(obj, indexOf)
      }
    },
    isRenderMenu() {
      return Array.isArray(this.tabListCp) && this.tabListCp.length > 0
    },
    onRightOptionsClick(item) {
      // 下拉框执行操作
      switch (item.code) {
        case 'closeOther':
          this.tabListCp = [...[this.defultselectTabCp]]
          this.tabListIn = this.tabListCp.slice(0, this.tabDefaultCount)
          this.$emit('onTabListChange', this.tabListCp)
          break
        case 'closeAll':
          this.tabListCp = []
          this.defultselectTabCp = this.tabListCp[0]
          this.tabListIn = this.tabListCp.slice(0, this.tabDefaultCount)
          this.activeDefault(this.defultselectTabCp)
          this.$emit('onTabListChange', this.tabListCp)
          break
        case 'closeCur':
          if (this.curTabIndex >= 1 && this.tabListCp[this.curTabIndex].code !== 'Home') {
            this.tabListCp.splice(this.curTabIndex, 1)
            if (this.tabListCp.length > 0) {
              this.curTabIndex -= 1
              this.defultselectTabCp = this.tabListCp[this.curTabIndex]
              this.activeDefault(this.defultselectTabCp)
            }
            this.tabListIn = this.tabListCp.slice(0, this.tabDefaultCount)
            this.$emit('onTabListChange', this.tabListCp)
          }
          break
        case 'refreshCur':
          if (this.curTabIndex >= 0) {
            this.defultselectTabCp = Object.assign({}, this.defultselectTabCp, { isactive: true })
            this.$emit('onTabClick', this.defultselectTabCp)
          }
          break
        default:
        // console.log('default')
      }
      this.selectDrop = false
    }
  },
  mounted() {
    this.setNavCount()
    this.tabDefaultListIn = JSON.parse(JSON.stringify(this.tabDefaultList))
    this.tabListCp = JSON.parse(JSON.stringify(this.tabList))
    this.defultselectTabCp = Object.assign({}, this.tabList[0])
    this.setNavDefaultIn()
  },
  watch: {
    tabDefaultList: {
      handler() {
        this.tabDefaultListIn = JSON.parse(JSON.stringify(this.tabDefaultList))
      },
      immediately: true
    },
    tabList: {
      handler() {
        this.tabListCp = JSON.parse(JSON.stringify(this.tabList))
      },
      immediately: true
    },
    defaultSelectTab: {
      handler(newValue) {
        if (this.defultselectTabCp.code !== this.defaultSelectTab.code) {
          this.defultselectTabCp = Object.assign({}, this.defaultSelectTab)
          this.setNavDefaultIn()
        }
      },
      deep: true,
      immediately: true
    }
  }
}
</script>
<style lang="scss">
.tabcon {
  padding: 0 10px;
  font-size: 0;
  text-align: left;
  background: #eee;
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
      border-radius: 4px;
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
    border-radius: 4px;
    span {
      color: #333;
      font-size: 14px;
      width: 60px;
    }
    em {
      margin-left: 5px;
      color: #333;
      font-size: 12px;
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
    z-index: 50;
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
      text-align: center;
      box-sizing: border-box;
      width: 150px;
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
</style>
