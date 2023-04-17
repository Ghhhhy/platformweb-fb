<!--  组件模版   Author:Titans -->
<template>
  <div class="login flex">
    <!-- <czy-header /> -->
    <div class="loginHeader flex">
      <div class="title flex">预算管理一体化系统</div>
      <div class="content">
        <p class="contentTitle">用户登录</p>
        <div class="user-select flex">
          <i class="base-font baseyonghu icon"></i>
          <el-select
            v-model="value"
            placeholder="平台配置"
            filterable
            style="width:350px;border:none;"
            @visible-change="getSelect"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              :disabled="item.disabled"
            />
          </el-select>
        </div>

        <div class="userName flex" style="margin-top:20px">
          <div class="userName-left flex">
            <i class="base-font baseyonghu icon"></i>
            <input v-model="username" type="text" placeholder="用户名">
          </div>
          <span v-if="isErrors" style="color:red">*用户名格式不对</span>
        </div>
        <div class="passWord flex">
          <i class="base-font basemima icon"></i>
          <input v-model="password" type="password" placeholder="密码">
        </div>
        <div class="userNum flex">
          <i class="base-font baseyanzhengma1 icon"></i>
          <input v-model="usernum" type="text" placeholder="验证码" class="mate">
        </div>
        <div class="login-btns">
          <button class="btn pointer" @click="userLogin">登&nbsp;录</button>
        </div>
        <div class="tips">
          <p class="tips-text">
            如果您还没有账号，请在这里
            <span class="tips-text">注册账号</span>
          </p>
          <p class="tips-text">
            如果您是新成立单位，请在这里
            <span class="tips-text">用户进度</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import LoginModule from '@/api/frame/login/login'
export default {
  name: 'String',
  components: {
  },
  data() {
    return {
      isErrors: false, // 用户名格式信息
      username: '',
      password: '',
      usernum: '',
      optionsRes: [],
      options: [

      ],
      value: ''
    }
  }, // 组件数据源
  created() {
    this.loadPlatForm()
  },
  beforeRouteEnter(to, from, next) {
    // 进入路由前
    // console.log(this, 'beforeRouteUpdate')
    next((vm) => {
      // 因为当钩子执行前，组件实例还没被创建
      // vm 就是当前组件的实例相当于上面的 this，所以在 next 方法里你就可以把 vm 当 this 来用了。
      // 当前组件的实例
      // console.log(vm)
    })
  },
  methods: {
    getSelect(flag) {
      if (flag === false) {
      }
    },
    objToQueryUrlString(obj) {
      /* @description   对象序列化(对象转成url参数) @param  {Object} obj  @return {String} */
      let pairs = []
      for (let key in obj) {
        pairs.push('' + key + '=' + obj[key])
      }
      return pairs.join('&')
    },
    getUrlAllParams(url) { /* 获取全部url参数,并转换成json对象 */
      url = url || window.location.href
      let search = url.substring(url.indexOf('?') + 1, url.indexOf('#/') >= 0 ? url.indexOf('#/') : url.length)
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
    userLogin() {
      // this.$store.commit('setLoginAuthentication', { appguid: this.optionsRes[this.value].guid || 'fiscal', tokenid: undefined })
      var formData = new FormData()
      formData.append('username', this.username)
      // formData.append('password', this.$AESEAD.CryptoJS.SHA256(this.password).toString())
      formData.append('password', this.password)
      formData.append('captcha', this.usernum)
      let self = this
      // var formData = this.$http.smSecretUtils.encryptLogin({ isSecret: true, params: { username: self.username, password: self.password, usernum: self.usernum } })
      this.$http
        .post(
          'mp-b-sso-service/v2/userlogin',
          formData,
          false,
          'application/x-www-form-urlencoded'
        )
        .then((res) => {
          // data.tokenid = '22c0bab04c9b4b34fc7a0f6f754b9c97'
          if (res.rscode === '100000') {
            let obj = self.getUrlAllParams()
            window.location.href = window.location.origin + window.location.pathname + '?' + self.objToQueryUrlString(Object.assign(obj, {
              tokenid: res.data.tokenid,
              appguid: self.optionsRes[self.value].guid || 'fiscal'
            }))
            // this.$store.commit('setAppData', {
            //   tokenid: data.tokenid,
            //   appguid: self.optionsRes[self.value].guid || 'fiscal'
            // })
            // this.$store.commit('setUserInfo', data.user)
            // this.authentication()
          } else if (res.rscode === '113999') {
            self.$message({
              message: '用户名或密码错误！',
              type: 'warning'
            })
          } else {
            self.$message({
              message: '登录失败，请核查用户信息或联系管理员！',
              type: 'warning'
            })
          }
        })
        .catch()
    },
    async authentication() {
      const { tokenid, appguid } = this.$store.getters.getLoginAuthentication
      if (!tokenid) {
        this.ifrouteractive = true
        this.$router.push({
          name: 'Login'
        })
      } else {
        await this.$http.get('mp-b-user-service/v1/user/app/message', { appguid: appguid }).then((res) => {
          this.ifrouteractive = true
          res = JSON.parse(res)
          if (res.rscode === '118000') {
            this.$router.push({
              name: 'Login'
            })
          } else {
            this.$store.commit('setUserInfo', res.data)
            this.$store.dispatch('getUserRoles')
            this.$router.push({
              name: 'Main',
              params: {
                userInfo: res.data
              }
            })
            this.$message({
              message: '登录成功',
              type: 'success'
            })
          }
        }).catch(e => {
          console.log(e)
          this.ifrouteractive = true
          this.$router.push({
            name: 'Login'
          })
        })
      }
    },
    loadPlatForm() {
      // 获取平台数据
      LoginModule.getPlatform()
        .then((res) => {
          this.optionsRes = res
          const guidList = []
          const nameList = []
          for (let i = 0; i < res.length; i++) {
            guidList.push(res[i].guid)
            nameList.push(res[i].name)
            this.options.push({ value: i, label: nameList[i] })
          }
        })
        .catch()
    }
  },
  mounted () {
    console.log(666, this.username)
  },
  watch: {
    dataobj: {
      handler() {
      },
      deep: true, // 是否深度监听，意为对象dataobj内部任何属性发生变化则全局重新渲染
      immediate: true // 代表在watch里声明了dataobj这个方法之后立即先去执行handler方法
    },
    username(val) {
      console.log(5555, val)
    }
  }
}
</script>
<style lang="scss">
.el-scrollbar {
  padding: 5px 0;
  // .el-scrollbar__view .el-select-dropdown__item {
  //   padding-left: 30px;
  // }
  .el-select-dropdown__list{
    padding: 0;
  }
}

.login {
  width: 100vw;
  height: 100vh;
  background-image: url('./img/bg.png');
  background-size: auto 100%;
  background-position: center;
  justify-content: center;
  align-items: center;

  .loginHeader {
    justify-content: center;
    flex-direction: column;
    align-items: center;
    .title {
      font-size: 42px;
      color: #fff;
      align-items: center;
    }
  }
  .content {
    margin: 80px auto 0px;
    width: 430px;
    height: 420px;
    border: 1px solid #1a7db6;
    background: rgba(0, 0, 0, 0.4);
    border-radius: 24px;
    padding: 42px;
    box-shadow: 0 0 15px #38bbff;
    input {
      border: none;
      outline: none;
      padding-left: 30px;
      font-size: 16px;
    }
    .el-input__inner:focus {
          color: #333;
     }
    .user-select {
      width: 100%;
      height: 42px;
      align-items: center;
      background: #fff;
      border-radius: 21px;
    }
  }
  .contentTitle {
    font-size: 22px;
    font-family: 微软雅黑;
    margin-bottom: 22px;
    text-align: center;
    color: white;
    padding-top: 15px;
  }
  .userName {
    width: 100%;
    height: 42px;
    background: #fff;
    border-radius: 21px;
    margin-bottom: 18px;
    line-height: 42px;
    overflow: hidden;
    .userName-left {
    }
  }
  .passWord {
    width: 100%;
    height: 42px;
    align-items: center;
    background: #fff;
    border-radius: 21px;
    margin-bottom: 18px;
    line-height: 42px;
    overflow: hidden;
  }
  .userNum {
    padding-left: 10px;
    height: 42px;
    align-items: center;
    background: #fff;
    border-radius: 21px;
    margin-bottom: 18px;
    line-height: 42px;
    overflow: hidden;
    .mate {
      padding-left: 40px;
    }
  }
  .login-btns {
    width: 100%;
    height: 42px;
    border-radius: 21px;
    margin-bottom: 18px;
    line-height: 42px;
    overflow: hidden;
    .btn {
      width: 100%;
      height: 42px;
      border: none;
      outline: none;
      font-size: 20px;
      font-weight: 700;
      background: var(--primary-color);
      margin-top: 0;
      color: #fff;
      text-align: center;
    }
  }
  .icon {
    font-size: 24px;
    padding-left: 10px;
  }
  .tips {
    text-align: center;
    font-size: 12px;
    .tips-text {
      letter-spacing: 2px;
    }
    p {
      color: #fff;
    }
    span {
      color: skyblue;
    }
  }
}
</style>
