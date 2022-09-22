<!--  三级菜单  Author:Titans@2396757591@qq.com -->
<template>
  <div class="leftnav" :class="navClass">
    <div v-for="(item,index) in navDataIn" :key="index" class="menu-ml">
      <div
        class="level1 levelobj"
        :class="('-' + index === level0 || curlevel === '-' + index) ? 'active' : ''"
        @click="onClick(index)"
      >
        <i :class="'fn-inline basic-font el-icon-menu ' + item.fontCode"></i>
        <span class="fn-inline line-ellipsis" :title="item.name">{{ item.name }}</span>
        <em v-if="hasChildren(item)" class="fn-inline base-font basexiala"></em>
      </div>
      <transition name>
        <ul
          v-if="hasChildren(item)"
          v-show="('-' + index === level0) ? true : false"
          class="level2list"
        >
          <li v-for="(item1,index1) in getchildren(item)" :key="index + '-' + index1">
            <div
              class="level2 levelobj"
              :class="('-' + index + '-' + index1 === level1 || curlevel === '-' + index + '-' + index1) ? 'active' : ''"
              @click="onClick(index,index1)"
              @mouseenter="onMouseenter(item1)"
            >
              <i class="fn-inline el-icon-menu"></i>
              <span class="fn-inline line-ellipsis" :title="item1.name">{{ item1.name }}</span>
              <em v-if="hasChildren(item1)" class="fn-inline base-font basexiala"></em>
            </div>
            <!-- <transition name>
              <dl
                v-if="hasChildren(item1)"
                v-show="('-' + index + '-' + index1 === level1) ? true : false"
                class="level3list"
              >
                <dt
                  v-for="(item2,index2) in getchildren(item1)"
                  :key="index + '-' + index1 + '-' + index2"
                >
                  <div
                    class="level3 levelobj"
                    :class="('-' + index + '-' + index1 + '-' + index2 === level2 || curlevel === '-' + index + '-' + index1 + '-' + index2) ? 'active' : ''"
                    @click="onClick(index,index1,index2)"
                  >
                    <i class="fn-inline" :class="item2.fontCode ? item2.fontCode : ''"></i>
                    <em class="fn-inline"></em>
                    <span class="line-ellipsis fn-inline" :title="item2.name">{{ item2.name }}</span>
                  </div>
                </dt>
              </dl>
            </transition>-->
          </li>
        </ul>
      </transition>
    </div>
  </div>
</template>
<script>
export default {
  name: 'EpLeftNav',
  components: {},
  props: {
    navClass: {
      // 菜单class
      type: String, // leftnav菜单Class
      default() {
        return ''
      }
    },
    navData: {
      // leftnav数据
      type: Array,
      default() {
        return []
      }
    },
    defaultActiveNav: {
      // 默认选择嵌套索引
      type: Array,
      default() {
        return []
      }
    },
    activeRouterObj: {
      // 默认选中菜单对象
      type: [Object, Boolean],
      default() {
        return false
      }
    }
  },
  data() {
    return {
      navDataIn: JSON.parse(JSON.stringify(this.navData || [])),
      level: [],
      curlevel: 'curlevel',
      level0: 'level0', // -0
      level1: 'level1', // -0-0
      level2: 'level2', // -0-0-0
      leveldata0: 'leveldata0', // -0
      leveldata1: 'leveldata1', // -0-0
      leveldata2: 'leveldata2', // -0-0-0
      leftnavarg: {
        arg1: 0,
        arg2: 0,
        arg3: 0
      }
    }
  },
  computed: {},
  methods: {
    getchildren(item) {
      // 获取children
      return Array.isArray(item.children) ? item.children : []
    },
    hasChildren(item) {
      // 是否children
      return (
        item.hasOwnProperty('children') &&
        Array.isArray(item.children) &&
        item.children.length > 0
      )
    },
    setEmitCurNav(obj) {
      // 当前菜单点击后下一步操作
      let self = this
      let str = ''
      let result = self.level.every(function (t, i) {
        str = str + '-' + t
        return self['level' + i] === self['leveldata' + i]
      })
      if (obj) {
        if (
          result &&
          this.curSelectObj.remark === obj.remark &&
          self.level.length > 0
        ) {
          if (!self.hasChildren(obj)) {
            self.curlevel = str
            self.$emit('onNavClick', obj, true)
          } else {
            self['level' + (self.level.length - 1)] =
              'level' + (self.level.length - 1)
          }
        } else {
          let arr = [0, 1, 2]
          arr.forEach(function (t, i) {
            if (i >= self.level.length) {
              self['level' + i] = 'level' + i
            } else {
              self['level' + i] = self['leveldata' + i]
            }
          })
          self.curlevel = str
          if (self.level.length === 2) {
            self.$emit('onNavClick', obj, false)
          }
        }
      }
      this.curSelectObj = obj
    },
    onClick(arg, arg1, arg2) {
      // 菜单点击事件
      let self = this
      let str = ''
      let obj = {}
      let crumbsArr = []
      self.leftnavarg.arg1 = arg
      self.leftnavarg.arg2 = arg1 >= 0 ? arg1 : self.leftnavarg.arg2
      self.leftnavarg.arg3 = arg2 >= 0 ? arg2 : self.leftnavarg.arg3
      self.level = []
      self.navDataIn.length > 0 &&
        Array.from(arguments).forEach(function (item, index) {
          if (item >= 0) {
            self.level.push(item)
            str = str + '-' + item
            self['leveldata' + index] = str
            if (index === 0) {
              obj = self.navDataIn[item] ? self.navDataIn[item] : obj
              crumbsArr.push(obj)
            } else if (obj.children && obj.children.length) {
              obj = obj.children[item]
              crumbsArr.push(obj)
            } else {
            }
          }
        })
      obj.crumbsdata = crumbsArr
      if (crumbsArr.length > 0) {
        this.setEmitCurNav(obj)
      }
    },
    onMouseenter(obj) {
      this.$emit('onMouseenter', obj)
    },
    isInit() {
      // 判断是否初始化
      let obj = {}
      try {
        for (let i = 0; i < this.defaultActiveNav.length; i++) {
          if (i === 0) {
            obj = this.navData[this.defaultActiveNav[i]]
          } else {
            obj = obj.children[this.defaultActiveNav[i]]
          }
        }
      } catch (e) {
        obj = {}
        console.log(e)
      }
      if (obj && obj.remark) {
        return true
      } else {
        return false
      }
    },
    initLeftNav() {
      // 初始化
      this.navDataIn = JSON.parse(JSON.stringify(this.navData || []))
      if (
        (this.navData.length > 0 &&
        this.defaultActiveNav.length > 0 &&
        this.defaultActiveNav.length <= 3) ||
        (this.navData.length > 0 && this.activeRouterObj.nestId)
      ) {
        if (this.activeRouterObj.nestId) {
          this.onClick(...this.activeRouterObj.nestId.split('_'))
        } else {
          this.onClick(...this.defaultActiveNav)
        }
      }
    }
  },
  mounted() {
    this.initLeftNav()
  },
  watch: {
    navData: {
      handler(newvalue) {
        this.initLeftNav()
      },
      immediate: true
    },
    defaultActiveNav: {
      handler(newvalue) {
        this.initLeftNav()
      },
      immediate: true
    },
    navClass: {
      handler(newvalue) {},
      immediate: true
    },
    activeRouterObj: {
      handler(newvalue) {},
      deep: true,
      immediate: true
    }
  }
}
</script>
<style lang='scss'>
.leftnav {
  font-size: 0;
  .menu-ml {
    .line-ellipsis {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .level1 {
      height: 40px;
      box-sizing: border-box;
      padding: 10px 0px 10px 0px;
      color: #fff;
      opacity: 0.75;
      cursor: pointer;
      a {
        display: block;
      }
      img {
        width: 14px;
        margin: 0 10px 0 24px;
        display: none;
      }
      i {
        width: 14px;
        font-size: 14px;
        margin: 0 10px 0 24px;
        vertical-align: middle;
      }
      span {
        width: 200px;
        font-size: 14px;
      }
      em {
        font-size: 12px;
      }
    }
    .level1.active {
      opacity: 1;
      em {
        transform-origin: center center;
        transform: rotate(180deg);
        font-weight: 600;
      }
      span {
        font-weight: 600;
      }
    }
    .level2 {
      height: 40px;
      line-height: 40px;
      padding: 0 10px 0 0px;
      background: #3259af;
      color: #fff;
      opacity: 0.75;
      cursor: pointer;
      a {
        padding: 0 10px 0 27px;
        display: block;
        margin: 0 -10px 0 -27px;
      }
      i {
        width: 14px;
        font-size: 14px;
        margin: 0 10px 0 24px;
        opacity: 0;
        vertical-align: middle;
      }
      span {
        font-size: 14px;
        width: 200px;
      }
      em {
        transform-origin: center center;
        transform: rotate(-90deg) scale(0.85);
        font-size: 12px;
      }
    }
    .level2:hover {
      background: #2a8bfd;
      opacity: 1;
      span {
        font-weight: 600;
      }
      em {
        font-weight: 600;
      }
    }
    .level2.active {
      background: #2a8bfd;
      opacity: 1;
      span {
        font-weight: 600;
      }
      em {
        font-weight: 600;
      }
    }
    dl {
      margin: 9px 0;
    }
    .level3 {
      height: 40px;
      padding: 10px 0 10px 47px;
      position: relative;
      line-height: 20px;
      font-size: 14px;
      color: #fff;
      cursor: pointer;
      a {
        display: block;
        margin-left: -47px;
        padding-left: 47px;
      }
      i {
        width: 10px;
        height: 10px;
      }
      em {
        height: 26px;
        width: 2px;
        font-size: 12px;
      }
      span {
        margin-left: 5px;

        max-width: 105px;
      }
    }
    dl dt:last-child em {
      display: none;
    }
    .level3.active {
      padding-left: 47px;
      position: relative;
      span {
        color: #fff;
      }
    }
  }
  .level2list,
  .level3list {
    background: #3259af;
    transform-origin: top;
  }
}

.dropdown-height-enter-active {
  animation: transitionDropIn 0.3s running ease-in-out;
}

.dropdown-height-leave-active {
  animation: transitionDropOut 0.3s running ease-in-out;
}

@keyframes transitionDropIn {
  0% {
    opacity: 0;
    // transform: scaleY(0);
    height: 0;
  }

  100% {
    opacity: 1;
    // transform: scaleY(1);
    height: auto;
  }
}

@keyframes transitionDropOut {
  0% {
    opacity: 1;
    height: auto;
    // transform: scaleY(1);
  }

  100% {
    opacity: 0;
    height: 0;
    // transform: scaleY(0);
  }
}
</style>
