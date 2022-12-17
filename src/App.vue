<template>
  <div id="app" :class="[theme]" style="height: calc(100vh / var(--bs-zoom) - 10px)">
    <div class="app-main">
      <!-- <keep-alive>
        <router-view v-if="$route.meta.keepAlive && ifrouteractive" />
      </keep-alive> -->
      <router-view v-if="ifrouteractive" />
    </div>
  </div>
</template>
<script>
import Store from '@/utils/store'
import goLogin from './utils/goLogin'
const BS_SXCZY_ACCESS_TOKEN = 'bsSxczyAccessToken'
const BS_SXCZY_APPGUID = 'bsSxczyAppguid'
const USER_INFO = 'userInfo'

export default {
  name: 'Index',
  data() {
    return {
      // 用户失效弹框是否被激活
      logOutPopUp: false,
      logOutPopInterval: null,
      theme: 'FiscalCloud',
      ifrouteractive: false
    }
  },
  computed: {},
  methods: {
    getUrlSearchByName(name) {
      var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
      var r = window.location.search.substr(1).match(reg)
      if (r != null) return unescape(r[2])
      return null
    },
    getUrlAllParams(url) {
      /* 获取全部url参数,并转换成json对象 */
      url = url || window.location.href
      let search = url.substring(
        url.indexOf('?') + 1,
        url.indexOf('#/') >= 0 ? url.indexOf('#/') : url.length
      )
      let searchArr = search.split('&')
      let result = {}
      for (let i = 0, _len = searchArr.length; i < _len; i++) {
        let pos = searchArr[i].indexOf('=')
        if (pos === -1) {
          continue
        }
        let name = searchArr[i].substring(0, pos)
        let value = window.decodeURIComponent(searchArr[i].substring(pos + 1))
        result[name] = value
      }
      return result
    },
    async getUser(tokenid) {
      await this.$http
        .get('mp-b-sso-service/v2/user/token/' + tokenid)
        .then((res) => {
          // await this.$http.get('mp-b-sso-service/v1/user/app/message' + tokenid).then((res) => {
          if (res.rscode === '100000') {
            this.$store.commit('setUserInfo', res.data)
            this.$store.dispatch('asyncUserRoles')
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    getUrlSearchToken() {
      let { tokenid, appguid } = this.getUrlAllParams()
      tokenid = tokenid || this.getCookie('tokenid')
      appguid = appguid || this.getCookie('appguid')
      if (tokenid) {
        this.$store.commit('setLoginAuthentication', {
          tokenid,
          appguid
        })
        // 如果是通过外链进入预算系统，因为别的系统不会存储用户信息，所以需要请求用户信息
      } else {
        this.ifrouteractive = true
      }
      // 缓存url参数后更新URL
      window.history.pushState({}, '', window.location.pathname + '#/')
    },
    async authentication() {
      const { tokenid, appguid } = this.$store.getters.getLoginAuthentication
      if (!tokenid) {
        this.ifrouteractive = true
        goLogin()
      } else {
        await this.$http
          .get('mp-b-user-service/v1/user/app/message', { appguid: appguid })
          .then((res) => {
            this.ifrouteractive = true
            if (typeof res === 'string') {
              res = JSON.parse(res)
            }
            if (res.rscode === '118000') {
              goLogin()
            } else {
              this.$store.commit('setUserInfo', res.data)
              this.$store.dispatch('asyncUserRoles')
              Store(USER_INFO, res.data)
              Store(BS_SXCZY_APPGUID, appguid)
              Store(BS_SXCZY_ACCESS_TOKEN, tokenid)
              this.$router.push({
                name: 'Main',
                params: {
                  userInfo: res.data
                }
              })
            }
          })
          .catch((e) => {
            console.log(e)
            this.ifrouteractive = true
            goLogin()
          })
      }
    },
    // 轮询token是否过期
    intervalQuest() {
      const { appguid } = this.$store.getters.getLoginAuthentication
      this.$http
        .get('mp-b-user-service/v1/user/app/message', { appguid: appguid })
        .then((res) => {
          if (res.rscode === '118000') {
            if (!this.logOutPopUp) {
              this.$XModal
                .confirm('用户信息失效，请点击确认返回首页重新登录')
                .then((type) => {
                  if (type === 'confirm') {
                    localStorage.removeItem('__boss_cache__bsSxczyAccessToken')
                    goLogin()
                  }
                })
            }
            this.logOutPopUp = true
            clearInterval(this.logOutPopInterval)
          }
        })
    },
    showLogo() {
      // console.log('%c预算管理', 'padding:15px;font-size:30vmin;background: #009688;font-family: \'PingFang SC\', \'Hiragino Sans GB\', \'Microsoft YaHei\', Arial, \'Helvetica Neue\', Helvetica;text-shadow:0vmin 1vmin 0vmin #b5b5b5, -1vmin 2vmin 0 #333, 1vmin 2vmin 0 #333, -1vmin 2.5vmin 0 #333, 1vmin 2.5vmin 0 #333, 0.4vmin 2.55vmin 0 #333, -0.25vmin 2.55vmin 0 #333, -1vmin 3.55vmin 0 #222, -0.25vmin 3.55vmin 0 #222, 0.25vmin 3.55vmin 0 #222, 0.75vmin 3.55vmin 0 #222;')
      console.log('%c                             ', 'filter:drop-shadow(0px 0px 0px #202124);background:url(data:image/png;base64,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) no-repeat;font-size:450%')
    },
    setCookie(name, value, seconds) {
      seconds = seconds || 0 // seconds有值就直接赋值，没有为0
      var expires = ''
      if (seconds !== 0) { // 设置cookie生存时间
        var date = new Date()
        date.setTime(date.getTime() + (seconds * 1000))
        expires = '; expires=' + date.toGMTString()
      }
      document.cookie = name + '=' + escape(value) + expires + '; path=/' // 转码并赋值
    },
    // 取得cookie
    getCookie(name) {
      var nameEQ = name + '='
      var ca = document.cookie.split(';')
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i]
        while (c.charAt(0) === ' ') {
          c = c.substring(1, c.length)
        }
        if (c.indexOf(nameEQ) === 0) {
          return unescape(c.substring(nameEQ.length, c.length))
        }
      }
      return false
    }
  },
  created() {
    this.getUrlSearchToken()
    this.authentication()
    // 获取预警信息
    this.$store.dispatch('warnInfo/getWarnInfo')
  },

  mounted() {
    let self = this
    this.logOutPopInterval = setInterval(() => {
      self.intervalQuest()
    }, 300000)
    window.onunload = () => {
      localStorage.removeItem('bsSxczyAccessToken')
      localStorage.removeItem('bsSxczyAppguid')
      self.setCookie('appguid', self.$store.getters.getLoginAuthentication.appguid, 10)
      self.setCookie('tokenid', self.$store.getters.getLoginAuthentication.tokenid, 10)
    }
    this.showLogo()
  },
  watch: {}
}
</script>
<style >
.el-loading-mask {
  position: absolute;
  z-index: 2021 !important;
  background-color: rgba(255, 255, 255, 0.9);
  margin: 0;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  -webkit-transition: opacity 0.3s;
  transition: opacity 0.3s;
}
.el-message {
  margin-top: 20px;
}
.el-message--warning {
  background-color: #fff2cf;
  border-width: 0px;
  font-size: 14px;
}
.el-message--success {
  background-color: #ffffff;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  border-width: 0px;
  font-size: 14px;
}
.el-message--success .el-message__content {
  color: #555555;
}
.el-message--success .el-icon-warning {
  color: #00cc7b;
}
.el-message--warning .el-message__content {
  color: #555555;
}
.el-message--warning .el-icon-warning {
  color: #ffcc32;
}
.app-main .boss-main .el-tab-pane {
  height: 82.5vh;
}
/*遮罩层中message层级问题*/
.modal-layout-message {
  z-index: 3105 !important;
}
</style>
