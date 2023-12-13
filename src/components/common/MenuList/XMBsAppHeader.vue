<template>
  <div style="display:flex">
    <el-popover
      placement="bottom-end"
      width="384"
      :open-delay="350"
      :visible-arrow="false"
      trigger="hover"
      popper-class="mainPopperClass"
    >
      <div v-if="navigationData.length" class="mainHoverWindow">
        <div v-for="item in navigationData" :key="item.id" class="selectModule" @click="urlSkip(item.url)">
          <div class="popperBackgroundImg">
            <img :src="item.appIconUrl" class="imgIcon"></img>
          </div>
          <span class="popperTitle">{{ item.appName }}</span>
        </div>
      </div>
      <div v-else class="mainHoverWindow">
        <div class="empty-data">
          <img style="width:90px" :src="emptyLogo">
          <div>没有关联系统</div>
        </div>
      </div>
      <div slot="reference" style="display: flex;align-items: center;cursor: pointer;" @click="urlSkip('')">
        <div style="display: flex">
          <img id="imgInit" style="height: 25px;width: 25px" :src="require('./img/' + headerImg)" alt="">
        </div>
        <div class="header-title">
          {{ headerTitle }}
        </div>
      </div>
    </el-popover>
    <div id="test" class="header-title center-title">|</div>
    <div class="header-title" style="padding-left: 0;font-size: 18px;" @click="skipHome">
      {{ headerTitleChild }}
    </div>
  </div>
</template>
<script>
import CryptoJS from 'crypto-js' // 引用AES源码js
export default {
  name: 'XMBsAppHeaderVue',
  data() {
    return {
      headerTitle: '厦门市智慧财政系统',
      headerTitleChild: '直达资金监控',
      emptyLogo: require('../../Table/assets/img/empty-data.jpg'),
      headerImg: window.gloableToolFn.globalTitle?.htmlLogo || 'LOGO_3-prod.png',
      navigationData: [],
      yearSelect: [] // 年份选择
    }
  },
  methods: {
    urlSkip(url) {
      /* eslint-disable-next-line */
      if (url) window.open(url, '_blank')
      else window.location.href = window.gloableToolFn.serverGatewayMap.gloableUrl.getProjectUrl
    },
    skipHome() {
      let tokenInfo = JSON.parse(localStorage.getItem('tokenInfo'))
      tokenInfo.intoMenu = ''
      localStorage.setItem('tokenInfo', JSON.stringify(tokenInfo))
      this.urlSkip(window.location.href)
    },
    navigationRequest() {
      const appId = window.gloableToolFn?.headerDeploy?.appId || this.$store.state?.loginAuthentication?.appguid
      const appKey = window.gloableToolFn?.headerDeploy?.appKey || this.$store.state?.loginAuthentication?.appKey
      let md5 = this.EncryptAes(appId + ' ' + appKey, window.gloableToolFn?.headerDeploy?.appSecret)

      let configs = {
        headers: {
          'x-auth-appGuid': appId,
          'x-auth-appKey': appKey,
          'x-auth-cipherText': md5
        }
      }
      this.$http.get(`platform-service/upc/external/app/v1/getAppByUserGuid?userGuid=${this.$store.state.userInfo.guid}`, null, null, null, null, configs).then(res => {
        if (res.success) {
          this.navigationData = res.data
        }
      })
    },
    MD5(words) {
      return CryptoJS.MD5(words).toString()
    },
    EncryptAes(content, key) {
      let srcs = CryptoJS.enc.Utf8.parse(content)
      key = this.MD5(key).substr(8, 16).toUpperCase()
      let encrypted = CryptoJS.AES.encrypt(srcs, CryptoJS.enc.Utf8.parse(key), {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
      })
      return encrypted.ciphertext.toString().toUpperCase()
    }
  },
  mounted() {
    // const el = document.getElementsById('test')
    // var event = new MouseEvent('mouseover', {
    //   bubbles: true,
    //   cancelable: true,
    //   view: window
    // })
    // el.dispatchEvent(event)
  },
  created() {
    this.navigationRequest() // 请求导航
  }
}
</script>
<style lang="scss" scoped>
  .mainPopperClass {
    padding: 0;
    .mainHoverWindow {
      width: 100%;
      overflow-y:scroll;
      display: flex;
      height:320px;
      justify-content:space-around;
      flex-direction: row;
      flex-wrap: wrap;
      margin: 24px 0 0;
      .empty-data {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
        margin: 30px 0;
        div {
          font-size: 16px;
          color: #333;
        }
      }
      .selectModule {
        cursor: pointer;
        width: 64px;
        // margin: 0 32px 32px 32px;
        margin: 0 21px 32px;
        .popperBackgroundImg {
          width: 64px;
          height: 64px;
          border-radius: 4px;
          background-color: #F6F7FB;
          display: flex;
          justify-content: center;
          align-items: center;
          .imgIcon {
            width: 48px;
            height: 48px;
            border-radius: 2px;
          }
        }
        .popperBackgroundImg:hover {
          background-color: #5176EA;
        }
        .popperTitle {
          color: #333;
          text-align: center;
          cursor: pointer;
          font-size: 14px;
          margin-top: 8px;
          width: 64px;
          overflow: hidden;
          text-overflow: ellipsis;
          word-break: break-all;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          // width: 100%;
          // display: block;
          // font-size: 16px;
          // color: #333;
          // margin-top: 8px;
          // text-align: center;
          // overflow: hidden;
          // text-overflow: ellipsis;
          // display: -webkit-box;
          // -webkit-line-clamp: 2;
          // -webkit-box-orient: vertical;
        }
      }
      // .selectModule:nth-child(1) {
      //   margin: 32px;
      // }
      // .selectModule:nth-child(2) {
      //   margin: 32px;
      // }
      // .selectModule:nth-child(3) {
      //   margin: 32px;
      // }
    }
  }
</style>
