<template>
  <vxe-modal
    v-model="modelShow"
    :title="title"
    class-name="count-down-modal"
    resize
    show-footer
    @close="closed"
    @confirm="confirm"
  >
    <div class="modalContent">
      <i class="el-icon-warning warnging-icon" style="color: wargin"></i>
      <div v-if="outFlag" class="content-text">
        登录即将过期，剩余时间<strong style="color: red;margin-right: 5px">{{ msg }}</strong>，请确认是否保持登录？
      </div>
      <div v-else class="content-text">
        登录已过期！
      </div>
    </div>
    <div slot="footer" class="vxeModalUnique">
      <el-row type="flex" justify="end">
        <el-button v-if="outFlag" size="medium" @click="closed">关闭</el-button>
        <el-button v-if="outFlag" size="medium" style="margin-right:0px;" type="primary" @click="confirm">保持登录</el-button>
        <el-button v-if="!outFlag" size="medium" type="primary" @click="outLgoin">确定</el-button>
      </el-row>
    </div>
  </vxe-modal>
</template>

<script>
import store from '../store/index'
import { get } from './http.js'
export default {
  props: {
    xclose: {
      type: Function,
      default: () => {}
    }
  },
  data() {
    return {
      title: '登录即将过期',
      dataList: [],
      selectRadio: '',
      modelShow: false,
      CountDownTime: null,
      currentTime: null,
      msg: '',
      outFlag: true
    }
  },
  methods: {
    show(time) {
      this.xclose()
      clearInterval(this.CountDownTime)
      this.CountDownTime = null
      if (time) {
        this.currentTime = time
        this.startTime = time
      }
      this.timeInterval()
      this.modelShow = true
    },
    // 弹窗计时器
    timeInterval() {
      let minutes = Math.floor(this.currentTime / 60)
      let seconds = Math.floor(this.currentTime % 60)
      this.msg = minutes ? minutes + '分' + seconds + '秒' : seconds + '秒'
      this.CountDownTime = setInterval(() => {
        // 判断时间如果大于5分钟
        if (this.currentTime > window.gloableToolFn?.outTime?.countDown / 1000) {
          clearInterval(this.CountDownTime)
          this.CountDownTime = null
          /**
           * 关闭弹窗，在http.js中，继续循环调用消耗掉剩余时间，现在时间 - 起始时间 >= outTime
           * 起始时间：现在时间Date.now() - (现在时间Date.now() - outTime + 剩余要走的时间)
           */
          let residueTiem = window.gloableToolFn?.outTime?.outTime - ((this.currentTime * 1000) - window.gloableToolFn?.outTime?.countDown)
          this.closed(Date.now() - residueTiem)
          return
        }
        if (this.currentTime > 0) {
          --this.currentTime
          if (this.currentTime <= this.startTime - window.gloableToolFn?.outTime?.getServerTime) this.getExpireTime()
          minutes = Math.floor(this.currentTime / 60)
          seconds = Math.floor(this.currentTime % 60)
          this.msg = minutes ? minutes + '分' + seconds + '秒' : seconds + '秒'
          this.$nextTick(() => {
            if (window.location.hash.includes('Login')) {
              sessionStorage.removeItem('tokenInfo')
              window.location.href = window.location.origin + window.location.pathname
            }
          })
        } else this.closedTime()
      }, 1000)
    },
    // 时间结束触发，判断是否登录
    closedTime() {
      clearInterval(this.CountDownTime)
      this.CountDownTime = null
      const { tokenid } = store.getters.getLoginAuthentication
      get('mp-b-sso-service/v2/checkTokenTime/' + tokenid).then((res) => {
        if (res.rscode === '100000') {
          if (res.data.checktoken) {
            this.currentTime = this.startTime = res.data.expire
            this.timeInterval()
          } else {
            this.outLgoin()
          }
        } else {
          this.$message.error(res.result)
          this.currentTime = this.startTime = 5 * 60
          this.timeInterval()
        }
      })
    },
    // 循环请求
    async getExpireTime() {
      clearInterval(this.CountDownTime)
      this.CountDownTime = null
      const { tokenid } = store.getters.getLoginAuthentication
      get('mp-b-sso-service/v2/checkTokenTime/' + tokenid).then(res => {
        if (res.rscode === '100000') {
          if (res.data.checktoken) {
            this.currentTime = this.startTime = res.data.expire
            this.timeInterval()
          } else this.outLgoin()
        } else this.$message.error(res.result)
      })
    },
    // 退出登录
    outLgoin() {
      if (!this.outFlag) {
        if (window.gloableToolFn.serverGatewayMap.gloableUrl.isLoginOutToPortal) {
          const { appguid } = store.getters.getLoginAuthentication
          let guid = store.state.curNavModule.guid
          let url = window.location.origin + window.location.pathname + '?' + this.objToQueryUrlString({
            guid: appguid || 'pay',
            intoMenu: guid && guid.length > 12 ? guid : '1'
          })
          window.location.href = window.gloableToolFn.serverGatewayMap.gloableUrl.portalLoginUrl + '?service=' + url
        } else {
          sessionStorage.removeItem('tokenInfo')
          window.location.href = window.location.origin + window.location.pathname
        }
      } else {
        this.title = '登录已过期'
        this.outFlag = false
      }
    },
    objToQueryUrlString(obj) {
      let pairs = []
      for (let key in obj) {
        pairs.push('' + key + '=' + obj[key])
      }
      return pairs.join('&')
    },
    closed(item) {
    },
    confirm() {
    }
  }
}
</script>
<style lang="scss" scoped>
.modalContent {
  padding: 10px 0 0 0;
  color: #606266;
  font-size: 14px;
  display: flex;
  .warnging-icon {
    color: #e6a23c;
    font-size: 24px!important;
    margin: 0 8px 0 0;
  }
  .content-text {
    display: inline-block;
    color: #606266;
    font-size: 14px;
    vertical-align: bottom;
  }
}
</style>
