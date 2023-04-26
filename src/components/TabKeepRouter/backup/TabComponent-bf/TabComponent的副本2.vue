<template>
  <div>
    <Tab
      :default-select-tab="defaultTabObj"
      :tab-list="tabList"
      @onTabListChange="onTabListChange"
      @onTabClick="onTabClick"
    />
    <div>
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive && ifrouteractive" />
      </keep-alive>
      <router-view v-if="ifrouteractive" />
    </div>
  </div>
</template>

<script>
import Tab from '../Tab/Tab'
export default {
  name: 'TabComponent',
  components: {
    Tab
  },
  data() {
    return {
      dddown: true,
      ifrouteractive: true,
      tabDefaultList: [
        {
          code: 'Home',
          name: '首页',
          remark: 'Home'
        }
      ],
      tabList: [
        {
          code: 'Home',
          name: '首页',
          remark: 'Home'
        }
      ],
      tabListCp: [],
      defaultTabObj: {}
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
        let indexOf = this.getIndexof(this.tabListCp, obj, 'name')
        if (indexOf === -1) {
          this.tabListCp.push(obj)
          this.tabList = JSON.parse(JSON.stringify(this.tabListCp))
          this.defaultTabObj = obj
        } else {
          this.defaultTabObj = obj
        }
      }
    },
    onTabClick(obj, index) {
\      if (obj.isactive) {
        this.refeshTabComs(obj, index)
      } else {
        this.tabTabs(obj, index)
      }
    },
    tabTabs(obj) {
      this.$router.push({ name: obj.remark })
      if (this.getDataType(this.curRouteTabObj) === 'Object' && this.curRouteTabObj.name !== obj.name) {
        this.defaultTabObj = obj
        if (window.self === window.top) {
          this.$store.commit('setCurNavModule', obj)
        }
      }
    },
    refeshTabComs(obj, indexOf) {
      this.ifrouteractive = false
      this.$nextTick(vm => {
        this.ifrouteractive = true
      })
    },
    onTabListChange(tabList) {
      this.tabListCp = JSON.parse(JSON.stringify(tabList))
    }
  },
  mounted() {
    this.tabListCp = JSON.parse(JSON.stringify(this.tabList))
  },
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
