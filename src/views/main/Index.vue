<template>
  <div class="boss-main app-main">
    <div class="app-main-header-line" @mouseenter="showHeader($event)"></div>
    <div class="app-main-header" :class="isShowHeader ? isInited ? 'show' : '' : 'hide'" @mouseleave="contorHeaderShow($event)">
      <BsAppHeader :default-active-menu="defaultActiveMenu" @onMenuSelectChange="onMenuSelectChange" />
    </div>
    <div class="app-main-body">
      <div class="app-main-body-tab-router" :style="{ 'background': isShowHeader ? '#fff' : 'var(--primary-color)' }">
        <BsTabKeepRouter
          v-model="value"
          :tab-class="tabClass"
          :is-show-header="isShowHeader"
          :is-collect="isCollect"
          :tab-list="tabList"
          @onRefreshClick="onRefreshClick"
          @onTabListChange="onTabListChange"
          @onCollectClick="onCollectClick"
        >
          <template v-slot:tabKeepRouter-right>
            <div class="tab-home-showtyle">
              <label style="margin-bottom:4px;" :style="{ 'color': isShowHeader ? '#333' : '#fff' }" class="fn-inline">{{ homeShowType === 'Home-card' ? '卡片版' : '默认版' }}</label>
              <span class="fn-inline">
                <vxe-switch
                  v-model="homeShowType"
                  size="mini"
                  on-label="是"
                  on-value="Home-card"
                  off-label="否"
                  off-value="Home-default"
                />
              </span>
            </div>
          </template>
        </BsTabKeepRouter>
      </div>
      <div v-show="showType === 'router'" class="main-modulebox-contain" :style="{ 'marginLeft': leftNavWidth + 'px' }">
        <BsKeepAlive ref="keepAlive" :include="includedComponents">
          <router-view v-if="$route.meta.keepAlive && ifrouteractive " :key="$route.name" />
        </BsKeepAlive>
        <router-view v-if="!$route.meta.keepAlive && ifrouteractive" :key="$route.name" />
      </div>
      <div v-show="showType === 'iframe'" class="main-modulebox-contain" :style="{ 'marginLeft': leftNavWidth + 'px' }">
        <iframe
          frameborder="0"
          width="100%"
          height="100%"
          scrolling="y"
          :src="iframeSrc"
        ></iframe>
      </div>
      <div class="main-modulebox-quick-nav" :class="isShowHeader ? 'top60' : 'top0'">
        <BsQuickNav :nav-data="menuData" @onNavClick="onQuickNavClick" @fixedNavChange="onFixedNavChange" />
      </div>
      <GlobalSetting />
    </div>
  </div>
</template>

<script>
import MenuModule from '@/api/frame/common/menu.js'
import GlobalSetting from '@/views/main/GlobalSetting'
export default {
  name: 'Main',
  components: {
    GlobalSetting
  },
  data() {
    return {
      leftNavWidth: 0,
      tabClass: 'model2',
      isInited: false,
      isShowHeader: true,
      homeShowType: 'Home-card',
      iframeSrc: '',
      isCollect: false,
      dddown: true,
      ifrouteractive: true,
      includedComponents: [],
      excludedComponents: [],
      tabList: [
        {
          code: 'Home',
          name: '首页',
          url: 'Home',
          guid: 'HomeCard',
          noClear: true
        }
      ],
      tabListCp: [
      //   {
      //   code: 'FormTemplate',
      //   name: '模版',
      //   url: 'FormTemplate'
      // }
      ],
      value: '',
      defaultActiveMenu: {
        code: 'Home',
        name: '首页',
        url: 'Home',
        guid: 'Home',
        noClear: true
      },
      showType: 'router',
      menuData: [],
      list: []
    }
  },
  computed: {
    key() {
      return this.$route.name !== undefined ? this.$route.name + +new Date() : this.$route + +new Date()
    },
    curRouteTabObj() {
      return this.$store.state.curNavRoute
    },
    loginAuthentication() {
      return this.$store.state.loginAuthentication
    },
    userInfo() {
      return this.$store.state.userInfo
    },
    curMenuObj() {
      return this.$store.state.curMenuObj
    }
  },
  methods: {
    getDataType(obj) {
      // 获取数据类型
      return Object.prototype.toString.call(obj).slice(8, -1)
    },
    deepCopy(obj) { // 深拷贝通用方法
      try {
        let me = this
        if (typeof obj !== 'object' || obj === null) return obj
        let newObj = obj instanceof Array ? [] : {}
        for (let key in obj) {
          if (obj.hasOwnProperty(key)) {
            newObj[key] = typeof obj[key] === 'object' ? me.deepCopy(obj[key]) : obj[key]
          }
        }
        return newObj
      } catch (e) {
      }
    },
    getIndexof(arr, value, key) {
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
    onFixedNavChange(isFixedNav, navWidth) {
      if (isFixedNav) {
        this.leftNavWidth = navWidth
      } else {
        this.leftNavWidth = 0
      }
    },
    registTabComs(obj) {
      // 注册路由
      if (this.value !== obj.url) {
        if (this.getDataType(obj) === 'Object' && obj.code) {
          let indexOf = this.getIndexof(this.tabListCp, obj.url, 'url')
          if (indexOf === -1) {
            this.tabListCp.push(obj)
            this.tabList = this.deepCopy(this.tabListCp)
            this.value = obj.url
          } else {
            this.tabList = this.deepCopy(this.tabListCp)
            this.value = obj.url
          }
        }
      } else {
        this.onRefreshClick(obj.url)
      }
    },
    registIncludedComponents(value) {
      let self = this
      if (this.includedComponents.indexOf(value) === -1) {
        this.includedComponents = this.tabListCp.map((item, index) => {
          return item.url
        }).filter((item, index) => {
          if (item === self.$route.name) {
            return self.$route.meta.keepAlive
          } else {
            return item
          }
        })
      } else {
        this.includedComponents = this.tabListCp.map((item, index) => {
          return item.url
        }).filter((item, index) => {
          if (item === self.$route.name) {
            return self.$route.meta.keepAlive
          } else {
            return item
          }
        })
      }
      if (!this.$route.meta.keepAlive) {
        this.excludedComponents.push(self.$route.name)
        this.excludedComponents = [...new Set(this.excludedComponents)]
      }
      console.log(this.includedComponents)
    },
    tabTabs(value) {
      if (value !== '') {
        if (
          this.getDataType(this.curRouteTabObj) === 'Object' &&
          this.curRouteTabObj.url !== value
        ) {
          let indexOf = this.getIndexof(this.tabListCp, value, 'url')
          this.$store.commit('setCurNavModule', this.tabListCp[indexOf])
          // if (indexOf === -1) {
          //   this.onRefreshClick()
          // }
        }
        if (value === 'Home') {
          this.routerToHome(this.homeShowType)
          // this.$router.push(
          //   {
          //     name: value,
          //     params: {
          //       homeShowType: this.homeShowType,
          //       curNavModule: this.$store.getters.getCurNavModule
          //     }
          //   }
          // )
        } else {
          // this.isShowHeader = false
          if (value.indexOf('.html') >= 0 || value.indexOf('http:') >= 0 || value.indexOf('https') >= 0) {
            this.iframeSrc = value.indexOf('?') >= 0 ? value + '&bosssoftTokenid=' + this.$store.state.loginAuthentication.tokenid : value + '?bosssoftTokenid=' + this.$store.state.loginAuthentication.tokenid
            this.showType = 'iframe'
          } else {
            this.showType = 'router'
            this.iframeSrc = ''
            this.$router.push(
              {
                path: value,
                params: {
                  curNavModule: this.$store.getters.getCurNavModule
                }
              }
            )
          }
        }

        // this.$nextTick(() => {
        //   this.$nextTick(() => {
        //   })
        // })
      }
    },
    routerToHome(homeShowType) {
      if (homeShowType === 'Home-card') {
        this.$router.push({
          name: 'HomeCard',
          params: {
            homeShowType: homeShowType,
            curNavModule: this.$store.getters.getCurNavModule
          }
        })
      }
      if (homeShowType === 'Home-default') {
        this.$router.push({
          name: 'Home',
          params: {
            homeShowType: homeShowType,
            curNavModule: this.$store.getters.getCurNavModule
          }
        })
      }
    },
    onRefreshClick(obj) {
      let self = this
      self.$refs.keepAlive.destroy(this.$route.name)
      // self.updateIframeNode(this.$route.url, this.$store.getters.getCurNavModul.code, 'destory')
      self.ifrouteractive = false
      self.$nextTick(vm => {
        setTimeout(() => {
          self.ifrouteractive = true
        }, 100)
      })
    },
    onTabListChange(tabList) {
      this.list = tabList
      this.tabListCp = JSON.parse(JSON.stringify(tabList))
      this.registIncludedComponents()
    },
    changeHomeShowType(homeShowType) {
      if (this.value === 'Home') {
        this.routerToHome(homeShowType)
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
            // this.registTabComs(obj)
          }
        }).catch(error => {
          console.log(error)
          self.$error('error')
        })
      } else {
        self.$refs.keepAlive.destroy(obj.url)
        this.$store.commit('setCurMenuObj', obj)
        // this.registTabComs(obj)
      }
    },
    // 点击收藏按钮事件
    onCollectClick(isCurNavCollect) {
      this.isCollect = !isCurNavCollect
      let self = this
      let userInfo = self.$store.state.userInfo
      let menuInfo = self.$store.state.curNavModule
      if (!isCurNavCollect) {
        let param = {
          menuguid: [{ menuguid: menuInfo.guid, roleguid: menuInfo.roleguid }],
          userguid: userInfo.guid,
          year: userInfo.year,
          province: userInfo.province,
          appguid: userInfo.app.guid
        }
        MenuModule.saveCollectionMenu(param).then(res => {
          var result = JSON.parse(res)
          if (result && result.result) {
            self.$message({
              message: result.msg,
              type: 'success'
            })
          } else {
            self.$message({
              message: result.msg,
              type: 'success'
            })
          }
        })
      } else {
        let param = {
          menuguid: [{ menuguid: menuInfo.guid, roleguid: menuInfo.roleguid }],
          roleguid: menuInfo.roleguid,
          userguid: userInfo.guid,
          year: userInfo.year,
          province: userInfo.province,
          appguid: userInfo.app.guid
        }
        MenuModule.removeCollectionMenu(param).then(res => {
          var result = JSON.parse(res)
          if (result && result.result) {
            self.$message({
              message: result.msg,
              type: 'success'
            })
          } else {
            self.$message({
              message: result.msg,
              type: 'success'
            })
          }
        })
      }
    },
    // 是否收藏
    isCollection() {
      let self = this
      // let userInfo = self.$store.state.userInfo
      let menuInfo = self.$store.state.curNavModule
      let param = {
        menuguid: menuInfo.guid,
        roleguid: menuInfo.roleguid,
        userguid: self.userInfo.guid,
        year: self.userInfo.year,
        province: self.userInfo.province,
        appguid: self.userInfo.app.guid
      }
      MenuModule.isCollectionMenu(param).then(res => {
        var result = null
        try {
          result = JSON.parse(res)
        } catch (error) {
          result = res
        }
        if (result && result.result) {
          this.isCollect = true
        } else {
          this.isCollect = false
        }
      })
    },
    getObjByNestedIndex(arr, nestedId) {
      // 获取选中菜单的数据源
      let nestArr = nestedId.split('_')
      let obj = {}
      nestArr.forEach((item, index) => {
        if (index === 0) {
          obj = arr[parseInt(item)]
        } else {
          obj = obj.children[parseInt(item)]
        }
      })
      return obj
    },
    getMenus() {
      // 三级菜单请求
      let self = this
      MenuModule.getMenuInfo().then((res) => {
        // this.navMenuData[0].children = res
        // this.menuData = this.navMenuData
        if (Array.isArray(res)) {
          if (res.length) {
            self.menuData = res
            this.addDynamicRoutingRoute(this.recursiveChangeUrl(res))
            this.onMenuSelectChange(this.defaultActiveMenu)
            this.$store.commit('setSystemMenu', res) // 将菜单存储到store
          } else {
            // this.$message({
            //   dangerouslyUseHTMLString: true,
            //   message: '当前用户'
            // })
          }
        }
      })
    },
    recursiveChangeUrl(data, reuseRouts = []) {
      // 递归获取动态复用路由
      // this.addDynamicRoutingRoute(this.recursiveChangeUrl(res))
      let self = this
      data.forEach((item, index) => {
        if (Array.isArray(item.children) && item.children.length) {
          self.recursiveChangeUrl(item.children, reuseRouts)
        } else {
          if (item.url && item.url.indexOf('ReuseRoute') >= 0) {
            reuseRouts.push(Object.assign({}, item))
            item.url = '/' + item.code + item.url
          }
        }
      })
      return reuseRouts
    },
    addDynamicRoutingRoute(reuseRouts) {
      let route = this.$router.options.routes
      let mainRoute = {}
      route.forEach((item, index) => {
        if (item.name === 'Main') {
          mainRoute = item
        }
      })
      let mainAddRoute = []
      mainRoute.children.forEach((item, index) => {
        reuseRouts.forEach((ritem, rindex) => {
          if (item.name === ritem.url.replace('ReuseRoute', '')) {
            mainAddRoute.push({
              path: `/${ritem.code}${ritem.url}`,
              name: `${ritem.code}${ritem.url}`,
              component: item.component,
              meta: {
                keepAlive: true,
                requireAuth: true
              }
            })
          }
        })
      })
      mainRoute.children = mainAddRoute
      // mainRoute.children = mainRoute.children.concat(mainAddRoute)
      this.$router.addRoute(mainRoute)
      this.$router.options.routes = route
    },
    showHeader() {
      // this.isShowHeader = true
    },
    contorHeaderShow() {
      if (this.value !== 'Home') {
        // this.isShowHeader = false
      }
    },
    onQuickNavClick(obj) {
      this.onMenuSelectChange(obj)
    }
  },
  mounted() {
    this.isInited = true
    window.addEventListener('popstate', function () {
      window.history.forward()
    })
    this.getMenus()
  },
  watch: {
    curMenuObj: {
      handler(newValue) {
        if (newValue && Object.keys(newValue).length) {
          this.registTabComs(newValue, true)
          this.$store.commit('setCurMenuObj', {})
        }
      },
      deep: true,
      immediate: false
    },
    homeShowType: {
      handler(newValue) {
        this.changeHomeShowType(newValue)
      },
      immediate: false
    },
    value: {
      handler(newValue) {
        this.tabTabs(newValue)
        this.isCollection()
      },
      deep: true,
      immediate: false
    },
    '$route'(to, from) {
      /** 初始化其他数据 */
      this.registIncludedComponents(to.name)
    },
    isShowHeader: {
      handler(newValue) {
        if (newValue) {
          this.tabClass = 'model2'
          console.log(newValue, this.tabClass)
        } else {
          this.tabClass = 'model2 model3'
          console.log(newValue, this.tabClass)
        }
      },
      deep: true,
      immediately: true
    }
  }
}
</script>
