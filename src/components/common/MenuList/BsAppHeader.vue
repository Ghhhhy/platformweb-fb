<!-- author czb 导航栏-->
<template>
  <div>
    <div>
      <div class="BsAppHeader">
        <div class="MenuList-header flex">
          <div class="MenuList-header header-left flex">
            <div class="header-left header-left-title flex">
              <img src="./img/logo-new.png" alt="">
              <!-- <div class="header-img"></div>
            <div class="header-title">预算管理</div> -->
            </div>
            <!-- <div class="header-left header-left-menu flex">
            <div class="header-left-menu-list flex pointer">
              <LevelMenu @onMenuSelectChange="onMenuSelectChange" />
            </div>
            <div class="header-left-menu-list flex pointer">
              <i class="el-icon-star-off icon"></i>
              <MyFavorite @onMenuSelectChange="onMenuSelectChange" />
            </div>
          </div> -->
            <!-- <div class="header-left header-left-search flex" style="display:none">
              <div v-if="show" class="header-left-search search-select flex">
                <select class="search-select">
                  <option value="菜单">菜单</option>
                  <option value="全部">全部</option>
                  <option value="列表">列表</option>
                </select>
                <el-select
                  v-model="value"
                  filterable
                  placeholder="请选择"
                  size="mini"
                  @change="getData"
                >
                  <el-option
                    v-for="(item,v) in searchData"
                    :key="v"
                    :label="item.label"
                    :value="item.value"
                    :menu="item"
                  />
                </el-select>
              </div>
              <i @click="OnShowSelectSearch"><img src="~@/assets/img/basic/search.svg"> </i>
            </div> -->
          </div>
          <div v-for="(it,ids) in menuData" :key="ids" :class="[province.slice(0, 2) === '31' ? 'shHeader' : 'xmHeader', 'MenuList-header header-right flex']">
            <div class="header-right-title flex">
              <!-- <i class="el-icon-position"></i> -->
              <div v-if="it.unit && (it.unit.length + unit.length < 10)" class="header-marquee">{{ it.unit }}&nbsp;{{ unit }}</div>
              <el-tooltip v-else class="item" effect="dark" :content="it.unit + ' ' + unit" placement="top-start">
                <div class="header-marquee">{{ it.unit }}&nbsp;{{ unit }}</div>
              </el-tooltip>
            </div>
            <div class="divider"></div>
            <!-- <div class="header-right-message flex pointer" @click="isvisible = true">
              <i class="el-icon-chat-square icon"></i>
              <div class="header-right-detail">{{ it.message }}</div>
              <Chat v-if="isvisible" @onClose="isvisible = false" />
            </div> -->
            <el-dropdown class="search-select" trigger="click">
              <div class="header-right-year flex pointer" style="height: 50px">
                <span class="header-right-year-desc">{{ year }}年
                  <i class="ri-arrow-drop-down-line icon"></i>
                </span>
              </div>
              <el-dropdown-menu slot="dropdown" class="yearUl">
                <el-dropdown-item v-for="(item,ite) in yearList" :key="ite" @click.native="chooseYear(item)" v-text="item" />
              </el-dropdown-menu>
            </el-dropdown>
            <div class="divider"></div>
            <!--
            <div class="header-right-block-plan flex">
              <div class="block-plan flex pointer">
                <i class="el-icon-position icon"></i>
                <div class="block-plan-desc">{{ plan }}</div>
              </div>
              <div class="block-exit flex pointer">
                <i class="el-icon-s-custom icon"></i>
                <div class="block-plan-supper-user" @click="showPop">{{ name }}</div>
              </div>
            </div>-->
            <!-- 区划 -->
            <div class="header-right-block-plan flex">
              <div class="block-plan flex">
                <!-- <i class="el-icon-position icon"></i> -->
                <div class="block-plan-desc">{{ plan }}</div>
              </div>
              <!--
              <div class="block-exit flex pointer">
                <i class="el-icon-s-custom icon"></i>
                <div class="block-plan-supper-user" @click="showPop">{{ name }}</div>
              </div>
              -->
            </div>
            <!-- 上海-我要提问 -->
            <div v-if="province.slice(0, 2) === '31'" class="divider"></div>
            <div v-if="province.slice(0, 2) === '31'" class="header-right-block-plan flex">
              <div class="block-plan flex">
                <i class="issue icons" style="width: 14px; height: 14px;margin-right: 8px"></i>
                <div class="block-plan-desc issueText" @click="handleIssue">我要提问</div>
              </div>
            </div>
            <!-- 上海-BBS论坛 -->
            <div v-if="province.slice(0, 2) === '31'" class="divider"></div>
            <div v-if="province.slice(0, 2) === '31'" class="header-right-block-plan flex" @click="handleBbs">
              <div class="block-plan flex">
                <i class="bbs icons" style="width: 14px; height: 14px;margin-right: 8px"></i>
                <div class="block-plan-desc">BBS论坛</div>
              </div>
            </div>
            <!--用户-->
            <div class="divider"></div>
            <i class="ri-user-5-fill head_message"></i>
            <el-dropdown class="search-select pointer" trigger="click" @command="handleCommand">
              <div class="auto">
                <div class="header-name">{{ name }}
                  <i class="ri-arrow-drop-down-line head_message"></i>
                </div>
              </div>
              <el-dropdown-menu slot="dropdown">
                <!-- <el-dropdown-item @click.native="openPwdDialog">
                  <p class="showPopup-exit"><i class="ri-key-fill icon"></i> 修改密码</p>
                  <p class="showPopup-exit"><i class="ri-key-fill icon"></i> 退出登录</p>
                </el-dropdown-item>
                -->
                <el-dropdown-item command="a">修改密码</el-dropdown-item>
                <el-dropdown-item command="b">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <!--            <div v-if="supportChrome" style="margin:15px" @click="darkMode = !darkMode">-->
            <!--              <el-tooltip content="切换日间/夜间模式">-->
            <!--                <i style="font-size:16px;cursor:pointer" :class="darkMode ? 'ri-moon-clear-fill' : 'ri-sun-fill'"></i>-->
            <!--              </el-tooltip>-->
            <!--            </div>-->
            <div style="margin:15px" @click="toggleFullScreen(undefined)">
              <el-tooltip content="切换全屏模式">
                <i style="font-size:16px;cursor:pointer" :class="fullScreen ? 'ri-fullscreen-exit-line' : 'ri-fullscreen-line'"></i>
              </el-tooltip>
            </div>
          </div>
        </div>
        <!-- <div v-if="showOn" class="showPopup"> -->
        <!-- <p class="showPopup-exit" @click="exitUser"><i class="el-icon-switch-button icon"></i> 安全退出</p> -->
        <!-- <p class="showPopup-exit"><i class="el-icon-setting icon"></i> 修改密码</p> -->
        <!-- </div> -->
      </div>
      <!--<div style="height: 9.5vh;"></div>-->
    </div>
    <div>
      <vxe-modal
        ref="template"
        v-model="pwdVisible"
        title="修改密码"
        width="420px"
        height="260px"
        transfer
        @close="cancelDialog"
      >
        <div>
          <vxe-form>
            <table class="layout-table">
              <tr>
                <td class="label"><label>旧密码：</label></td>
                <td><vxe-input v-model="oldPwd" type="password" /></td>
              </tr>
              <tr>
                <td class="label"><label>新密码：</label></td>
                <td><vxe-input v-model="newPwd" type="password" /></td>
              </tr>
              <tr>
                <td class="label"><label>确认密码：</label></td>
                <td><vxe-input v-model="confirmPwd" type="password" /></td>
              </tr>
            </table>
          </vxe-form>
        </div>
        <div class="option-line-group center">
          <div class="fn-inline option-line-group-btn">
            <vxe-button status="primary" :loading="audLoading" @click="updatePwd">确 认</vxe-button>
            <vxe-button code="reset" @click="cancelDialog">返 回</vxe-button>
          </div>
        </div>
      </vxe-modal>
    </div>
    <BBS
      v-if="addDialogVisible"
      ref="bbsDialog"
      :dialog-visible.sync="addDialogVisible"
      title="BBS论坛"
    />
  </div>
</template>

<script>
import MenuModule from '../../../api/frame/common/menu.js'
import store from '@/store/index'
import BBS from './children/BBS.vue'
// import {
//   enable as enableDarkMode,
//   disable as disableDarkMode
// } from 'darkreader'
// import LevelMenu from './children/LevelMenu'
// import MyFavorite from './children/MyFavorite'
// import Chat from './children/Chat'
import { mapMutations } from 'vuex'
const serverGatewayMap = window.gloableToolFn.serverGatewayMap
export default {
  name: 'MenuList',
  components: {
    // LevelMenu
    // MyFavorite
    // Chat
    BBS
  },
  data () {
    return {
      // 是否开启暗黑模式
      darkMode: false,
      // 是否进入全屏
      fullScreen: false,
      // chrome是否支持
      supportChrome: false,
      // 控制消息弹框显隐
      isvisible: false,
      // 未读消息数
      unreadNum: 0,
      province: '',
      name: '',
      year: '',
      unit: '',
      plan: '',
      show: false,
      showOn: false,
      searchData: [
        // {
        //   value: '选项1',
        //   label: '单位信息审核(预算处)',
        //   name: 'UnitinFomainTainAdd'
        // }, {
        //   value: '选项2',
        //   label: '人员信息查看',
        //   name: ''
        // }
      ],
      yearList: [],
      value: '',
      ShowLevelMenu: false,
      gloableUrl: serverGatewayMap.gloableUrl,
      menuData: [{
        allMenu: '全部导航',
        favorite: '我的收藏',
        unit: '所属单位:',
        message: '消息',
        year: '年度',
        plan: '区划',
        supperUser: '预算超级用户'
      }],
      pwdVisible: false,
      oldPwd: '',
      newPwd: '',
      confirmPwd: '',
      audLoading: false,
      addDialogVisible: false
    }
  },
  computed: {
  },
  mounted () {
    this.darkMode = localStorage.getItem('__boss__darkmode__') === 'true' || false
    this.supportChrome = this.getChomeVersion()
    this.getFoundData()
    const userList = this.$store.getters.getuserInfo
    this.year = userList.year
    this.unit = userList.orgname || ''
    this.plan = userList.admdivname
    this.name = userList.name
    this.province = userList.province
    console.log('userList.app.yearSelect', userList.app.yearSelect)
    // this.yearList = userList.app.yearSelect
    this.yearList = userList.app.yearSelect
  },
  watch: {
    darkMode: {
      handler (newval) {
        if (this.supportChrome) {
          localStorage.setItem('__boss__darkmode__', newval)
          if (newval) {
            // enableDarkMode({
            //   brightness: 100,
            //   contrast: 90,
            //   sepia: 10
            // })
          } else {
            // disableDarkMode()
          }
        }
      }
    }
  },
  methods: {
    ...mapMutations('basicInfo', ['clearBossTree']),
    handleCommand (obj) {
      if (obj === 'a') {
        this.pwdVisible = true
      } else if (obj === 'b') {
        this.exitUser()
        this.$router.push({
          name: 'Login'
        })
      }
    },
    getChomeVersion () {
      let arr = navigator.userAgent.split(' ')
      let chromeVersion = false
      for (let i = 0; i < arr.length; i++) {
        if (/chrome/i.test(arr[i])) {
          chromeVersion = arr[i]
        }
      }
      if (chromeVersion) {
        console.log(`当前Chorme版本${Number(chromeVersion.split('/')[1].split('.')[0])}`)
        return Number(chromeVersion.split('/')[1].split('.')[0]) >= 70
      } else {
        return false
      }
    },
    OnShowSelectSearch (e) {
      // 点击搜索图标显示选择框以及搜索输入框
      this.show = !this.show
    },
    onMenuSelectChange (obj) {
      this.$emit('onMenuSelectChange', obj)
    },
    // 展示退出弹出框
    showPop () {
      this.showOn = !this.showOn
    },
    // 展示退出弹出框
    async chooseYear (year) {
      const { tokenid, appguid } = this.$store.getters.getLoginAuthentication
      if (!tokenid) {
        this.$router.push({
          name: 'Login'
        })
      } else {
        await this.$http
          .get('mp-b-user-service/v1/user/app/message', { appguid: appguid, year: year })
          .then((res) => {
            if (typeof res === 'string') {
              res = JSON.parse(res)
            }
            if (res.rscode === '118000') {
              this.$router.push({
                name: 'Login'
              })
            } else {
              this.$store.commit('setUserInfo', res.data)
              this.$store.dispatch('asyncUserRoles')
              location.reload()
              // this.$router.push({
              //   name: 'Main',
              //   params: {
              //     userInfo: res.data
              //   }
              // })
            }
          })
          .catch((e) => {
            console.log(e)
            this.$router.push({
              name: 'Login'
            })
          })
      }
    },
    // 退出
    exitUser () {
      this.clearUserData()
      if (this.gloableUrl.isLoginOutToPortal) {
        window.location.href = this.gloableUrl.portalLoginUrl
      } else {
        window.location.href = +window.location.pathname
      }
      // window.location.reload()
      // this.$router.push({
      //   name: 'Login'
      // })
    },
    // 清空用户缓存数据
    clearUserData () {
      // 清除localStorage数据
      this.$store.commit('setLoginAuthentication', {})
      // 清除store中数据
      this.$store.commit('setCurNavModule', {})
      this.clearBossTree()
    },
    // 菜单搜索
    getNewDataColumns (dataColums) {
      dataColums.map(item => {
        // this.$delete(item, 'width')
        if (item.children) {
          this.getNewDataColumns(item.children)
        } else {
          let obj = {
            value: '选项' + (this.searchData.length + 1),
            label: item.f_FullName,
            name: item.remark
          }
          Object.assign(item, obj)
          this.searchData.push(item)
          // console.log(this.searchData, 'searchData')
        }
        return item
      })
      return dataColums
    },
    getFoundData () {
      // 递归调整数据结构
      MenuModule.getMenuInfo().then(res => {
        this.getNewDataColumns(res)
      }).catch()
    },
    getData (value) {
      const valueNum = value.slice(2, value.length + 1)
      this.searchData[valueNum].name = this.searchData[valueNum].label
      this.$emit('onMenuSelectChange', this.searchData[valueNum])
      this.show = !this.show
    },
    openPwdDialog () {
      this.pwdVisible = true
    },
    toggleFullScreen (isFullscreen) {
      isFullscreen = isFullscreen === undefined ? !(document.fullScreen || document.mozFullScreen || document.webkitIsFullScreen) : isFullscreen
      this.fullScreen = isFullscreen
      let de = document.documentElement
      if (isFullscreen) { // 进入全屏,多重短路表达式
        if (de.requestFullscreen) {
          de.requestFullscreen()
        } else if (de.mozRequestFullScreen) {
          de.mozRequestFullScreen()
        } else if (de.webkitRequestFullScreen) {
          de.webkitRequestFullScreen()
        }
      } else { // 退出全屏,三目运算符
        de = document
        if (de.exitFullscreen) {
          de.exitFullscreen()
        } else if (de.mozCancelFullScreen) {
          de.mozCancelFullScreen()
        } else if (de.webkitExitFullscreen) {
          de.webkitExitFullscreen()
        }
      }
    },
    async updatePwd () {
      /*
      if (!(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/ig.test(this.oldPwd))) {
        this.$XModal.message({ status: 'error', message: '旧密码长度必须是8位，只能是数字加字母！' })
        return
      }
      if (!(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/ig.test(this.newPwd))) {
        this.$XModal.message({ status: 'error', message: '新密码长度必须是8位，只能是数字加字母！' })
        return
      }
      if (!(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/ig.test(this.confirmPwd))) {
        this.$XModal.message({ status: 'error', message: '确认密码长度必须是8位，只能是数字加字母！' })
        return
      }
      **/
      if (this.oldPwd === this.newPwd) {
        this.$XModal.message({ status: 'error', message: '旧密码与新密码一致，无需修改！' })
        return
      }
      if (this.newPwd !== this.confirmPwd) {
        this.$XModal.message({ status: 'error', message: '新密码与确认密码不一致，请重新输入！' })
        return
      }
      let self = this
      await this.$http
        .post('mp-b-user-service/v1/users/action/modifypwd', { oldPassword: this.oldPwd, newPassword: this.newPwd })
        .then((res) => {
          if (typeof res === 'string') {
            res = JSON.parse(res)
          }
          if (res.rscode === '100000') {
            self.pwdVisible = false
            this.$XModal.message({ status: 'success', message: res.result })
            location.reload()
          } else {
            this.$XModal.message({ status: 'error', message: res.result })
          }
        })
        .catch((e) => {
          console.log(e)
        })
    },
    cancelDialog () {
      this.pwdVisible = false
    },
    handleIssue() {
      console.log(window.gloableToolFn, 'window.gloableToolFn.getIssueUrl()')
      let url = window.gloableToolFn?.getIssueUrl || 'https://yth.czj.sh.cegn.cn/itsm/src/login/loginShczj.html'
      window.open(`${url}?tokenid=${store.getters.getLoginAuthentication.tokenid}&appguid=${store.getters.getLoginAuthentication.appguid}`)
    },
    handleBbs() {
      this.addDialogVisible = true
    }
  }
}
</script>
<style lang="scss">
/*.BsAppHeader{*/
/*  position: fixed;*/
/*  top: 0;*/
/*  left: 0;*/
/*  right: 0;*/
/*  z-index: 99999;*/
/*}*/
.el-icon-zoom-in {
  cursor: hand;
}
.auto {
  width: 100px;
  text-align: center;
}
.header-name {
  font-size: 13px;
  height: 50px;
  line-height: 50px;
}
.layout-table {
  width: 100%;
  padding: 0;
  margin: 0;
}
.layout-table tr {
  height: 40px;
  width: 100%;
}
.layout-table .label {
  width: 100px;
  text-align: right;
}
.layout-table .vxe-input {
  width: 220px;
}
.center {
  text-align: center;
}
.divider {
  height: 16px;
  width: 1px;
  background-color: rgb(255, 255, 255);
  margin-bottom: -3px;
}
.el-popper[x-placement^='bottom'] {
  margin-top: 5px !important;
}
.shHeader {
  width: 1000px !important
}
.xmHeader {
  width: 580px !important
}
i.icons:before {
  content: '';
  height: 14px !important;
  width: 14px !important;
  display: inline-block
}
i.issue:before {
  background: url(./img/issue.svg);
  background-size: 100% 100%;
}
i.bbs::before {
  background: url(./img/link.svg);
  background-size: 100% 100%;
}
.issueText {
  color: #6fe78d;
  cursor: pointer;
}
.issueText:hover {
  text-decoration: underline;
}
</style>
