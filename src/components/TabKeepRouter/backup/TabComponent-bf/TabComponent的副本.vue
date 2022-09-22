<template>
  <div>
    <Tabs v-model="defaultTabObj" :tab-list="tabList" @onTabEdit="onTabEdit" @onTabClick="onTabClick" />
    <div>
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive && ifrouteractive" />
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive && ifrouteractive" />
    </div>
  </div>
</template>

<script>
import Tabs from './Tabs/Tabs'
export default {
  name: 'TabComponent',
  components: {
    Tabs
  },
  data() {
    return {
      ifrouteractive: true,
      tabList: [
        {
          code: 'home',
          name: '首页',
          routerName: 'Home'
        }
        // {
        //   title: 'Tab 1',
        //   name: 'Table',
        //   content: 'Tab 1 content'
        // },
        // {
        //   title: 'Tab 2',
        //   name: 'Tab2',
        //   content: 'Tab 2 content'
        // }
      ],
      defaultTabObj: {
        code: 'home',
        name: '首页',
        routerName: 'Home'
      }
    }
  },
  computed: {
    curRouteTabObj() {
      return this.$store.state.curNavRoute
    }
  },
  methods: {
    getDataType(obj) {
      // 获取数据类型
      return Object.prototype.toString.call(obj).slice(8, -1)
    },
    getIndexof(arr, obj, key) {
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
    arrunique(arr, key) {
      // 数组去重
      let temp = []
      for (let i = 0; i < arr.length; i++) {
        let indexof = this.getIndexof(temp, arr[i], 'key')
        if (indexof === -1) {
          temp.push(arr[i])
        }
      }
      return temp
    },
    registTabComs(obj) {
      // 注册路由
      if (this.getDataType(obj) === 'Object' && obj.code) {
        let indexOf = this.getIndexof(this.tabList, obj, 'name')
        if (indexOf === -1) {
          this.tabList.push(obj)
          this.defaultTabObj = obj
        } else {
          this.defaultTabObj = obj
        }
      }
    },
    onTabClick(obj, isfresh, indexOf) {
      if (isfresh) {
        this.refeshTabComs(obj, indexOf)
      } else {
        this.tabTabs(obj, indexOf)
      }
    },
    tabTabs(obj) {
      this.$router.push({ name: obj.routerName })
      // if (this.getDataType(this.curRouteTabObj) === 'Object' && this.curRouteTabObj.name !== obj.name) {
      // this.$store.commit('setCurNavModule', obj)
      // }
    },
    refeshTabComs(obj, indexOf) {
      this.ifrouteractive = false
      this.$nextTick(vm => {
        this.ifrouteractive = true
      })
      this.$router.push({ name: obj.routerName })
    },
    refeshTabComponents() {
      let self = this
      let arr = []
      this.tabList.forEach((item, index) => {
        let indexOf = self.getIndexof(self.tabComponents, item, 'name')
        if (indexOf >= 0) {
          arr.push(self.tabComponents[indexOf])
        }
      })
      this.tabComponents = arr
      this.defaultTabObj = this.tabList[0]
    },
    onTabEdit(tabList) {
      this.tabList = tabList
      this.refeshTabComponents()
    }
  },
  mounted() {},
  watch: {
    curRouteTabObj: {
      handler(newValue) {
        this.registTabComs(newValue, true)
      },
      immediate: true
    }
  }
}
</script>

<style lang='scss'>
</style>
