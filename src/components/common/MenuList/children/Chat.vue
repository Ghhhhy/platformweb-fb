<template>
  <vxe-modal
    v-model="isvisible"
    center
    class="mychat"
    :show-header="false"
    remember
    transfer
  >
    <div class="chat_menu">
      <div class="userIcon">
        <img id="userIcon" src="../img/user.png">
      </div>
      <div class="userTabs">
        <i class="el-icon-chat-dot-round" :class="{ active: activetab1 }" @click="showchatsTab(true)"></i>
        <i class="el-icon-user" :class="{ active: activetab2 }" @click="showrolesTab"></i>
      </div>
    </div>
    <div class="chat_role">
      <el-input
        v-show="activetab1"
        v-model="input2"
        class="searchuser"
        maxlength="20"
        placeholder="搜索消息"
        prefix-icon="el-icon-search"
        @input="searchChat"
      />
      <div v-show="activetab1" class="chatlists">
        <template v-if="chatlist && chatlist.length > 0">
          <div v-for="(item1,index) in chatlist" :key="index">
            <div class="chatlist_level" :title="item1.name">{{ item1.name }}</div>
            <div v-for="(item,ind) in item1.userInfo" :key="ind" class="userlist" :class="{ active: activelistIndex === item.senderGuid }" @click="clicklist(item)">
              <i class="userlist_icon glyphicon glyphicon-globe"></i>
              <i v-if="item.num" class="unread_n">{{ item.num }}</i>
              <div class="userlist_con">
                <div class="userlist_name" :title="item.name">{{ item.name }}</div>
                <div v-if="item.orgcode !== null && item.orgname !== null" class="userlist_newinfo" :title="item.orgcode + item.orgname">{{ item.orgcode }}-{{ item.orgname }}</div>
              </div>
            </div>
          </div>
        </template>
      </div>
      <el-input
        v-show="activetab2"
        v-model="input1"
        class="searchuser"
        maxlength="20"
        placeholder="搜索用户"
        prefix-icon="el-icon-search"
      />
      <div v-show="activetab2" class="chatlists" :class="{ showbg: isshowbg }">
        <template v-if="frienddatas && frienddatas.length > 0">
          <div v-for="(item1,index) in frienddatas" :key="index">
            <div class="chatlist_level" :title="item1.name">{{ item1.name }}</div>
            <div v-for="(item,ind) in item1.userInfo" :key="ind" class="userlist" @click="clickFlist(item,index)">
              <i class="userlist_icon glyphicon glyphicon-globe"></i>
              <div class="userlist_con">
                <div class="userlist_name" :title="item.name">{{ item.name }}</div>
                <div v-if="item.orgcode !== null && item.orgname !== null" class="userlist_newinfo" :title="item.orgcode + item.orgname">{{ item.orgcode }}-{{ item.orgname }}</div>
              </div>
            </div>
          </div>
        </template>
        <template v-if="frienddatas.length === 0 && !isshowbg">
          <div class="nousers">没有用户信息</div>
        </template>
      </div>
    </div>
    <div class="chat_con">
      <div class="msgDivtitle">
        <div v-if="activetab1 || activechat" id="dialoguename">{{ nowchatName }}</div>
        <el-button type="text" icon="el-icon-close" class="close" @click="closeChat" />
      </div>
      <div v-show="activetab1 || activechat" id="msgDivcon" ref="msgDivcon" class="msgDivcon">
        <template v-if="chatdatas && chatdatas.length > 0">
          <div v-for="(item,index) in chatdatas" :key="index" class="msglist" :class="{ msgtwo: item.senderguid === user.guid }">
            <i v-if="item.senderguid !== user.guid" class="userlist_icon glyphicon glyphicon-globe"></i>
            <i v-else></i>
            <div class="msglisttext">{{ item.contents }}</div>
            <div v-if="item.msgtype === '1'" class="msgfile" @click="downFile(item)">
              <div class="msgfile_name" :title="item.contents.split('#')[0]">{{ item.contents }}</div>
              <div class="msgfile_size">{{ item.contents }}</div>
              <div class="msgfile_img" :class="{ hasdown: item.down === 0 }"></div>
            </div>
          </div>
        </template>
      </div>
      <div v-show="activetab1 || activechat" class="msgDivedit">
        <el-input v-model="textarea" class="sendmsg" type="textarea" @keyup.enter.native="sendMsg" />
        <el-button class="sendbtn" size="small" @click="sendMsg">发送</el-button>
        <el-button class="upload-demo sendfilebtn" icon="el-icon-folder-opened" type="text" @click="uploadFileOperate" />
        <BsUpload
          ref="fileMessage"
          :queryparams="fielQueryparams"
          :downloadparams="downloadParams"
          :after-upload="afterUpload"
          uniqe-name="fileMessage"
        />
      </div>
    </div>
  </vxe-modal>
</template>

<script>
import HTTPModule from '@/api/frame/common/home'
import uuid from '@/utils/dataUtils'

export default {
  name: 'Chat',
  props: {

  },
  data() {
    return {
      // 该用户所有数据
      user: {},
      // 是否弹窗显示
      isvisible: true,
      // 聊天列表激活
      activetab1: true,
      // 好友列表激活
      activetab2: false,
      // 点击用户列表，进入聊天界面 (false:该用户无聊天记录，进入新的聊天界面 ，不跳转到聊天列表;true:该用户已存在聊天，进入聊天)
      activechat: false,
      // 点击用户列表，activechat为false时，当前点击list序号
      activeFIndex: '',
      // 聊天信息用户列表
      chatlist: [],
      // 选中聊天信息用户对应的聊天信息
      chatdatas: [],
      // 好友列表
      frienddatas: [],
      // 当前聊天对象名称
      nowchatName: '',
      // 消息用户列表  当前active用户,当前聊天窗口信息
      activelistIndex: '',
      textarea: '',
      // 搜索用户的值
      input1: '',
      // 搜索聊天列表的值
      input2: '',
      userlistnum: {
        page: 0
      },
      isshowbg: true,
      // tokenid
      tokenid: null,
      // 下载文件参数
      downloadParams: {
        fileguid: ''
      },
      // 附件上传的参数
      fielQueryparams: { billguid: '' },
      // 当前激活用户信息
      nowData: null
    }
  },
  computed: {
    curNavModule() { // 获取当前菜单信息
      return this.$store.state.curNavModule
    },
    userInfo() { // 获取用户信息
      return this.$store.state.userInfo
    },
    authenticationInfo() { // 权限信息
      return this.$store.getters.getLoginAuthentication
    }
  },
  mounted() {
    this.initData()
    this.searchUser()
    setInterval(() => {
      this.initData()
    }, 30000)
  },
  methods: {
    // 获取未读消息条数
    getUnreadnum() {
      let self = this
      HTTPModule.doGetUnreadNum({ 'receiverguid': self.user.guid }).then(res => {
        if (res && res.length !== undefined && res.length >= 1) {
          self.$parent.unreadNum = res[0].count
        } else {
          self.$parent.unreadNum = 0
        }
      })
    },
    // 初始化消息列表数据
    initData() {
      let self = this
      self.getUnreadnum()
      let msgnum = 10 * (self.userlistnum.page + 1)
      // 初始化的时候根据加载页数确定每次加载多少用户
      HTTPModule.doGetLeftMsg({
        'msgnum': msgnum,
        'pagenum': 0
      }).then(res => {
        if (res && res.rscode === '100000') {
          // 加载消息列表信息
          self.chatlist = []
          if (res.data && res.data.length > 0) {
            for (let i = 0; i < res.data.length; i++) {
              self.chatlist.push(res.data[i])
            }
          }
          this.showChat()

          // 如果当前对话窗口有消息更新，直接显示在chatdata里
          if (self.activelistIndex !== '' && self.$parent.unreadNum > 0) { // 如果当前有对话窗口，且有新消息总数>0
            for (let k = 0, outer = true; k < self.chatlist.length && outer; k++) {
              for (let j = 0; j < self.chatlist[k].userInfo.length; j++) {
                if (self.activelistIndex === self.chatlist[k].userInfo[j].senderGuid && self.chatlist[k].userInfo[j].num > 0) { // 当前聊天窗口信息,有新消息
                  /* 显示当前聊天窗口信息开始 */
                  HTTPModule.doUpdateNum({ 'senderguid': self.activelistIndex }).then(res => {
                    if (res.result) {
                      console.log('更新成功')
                    } else {
                      console.log('更新失败')
                    }
                  })
                  // 更新首页未读显示
                  self.getUnreadnum()
                  // 更新当前消息列表未读
                  self.chatlist[k].userInfo[j].num = 0
                  // 更新chatdata
                  HTTPModule.doQueryRightMsg({
                    'senderguid': self.activelistIndex,
                    'msgnum': 10000
                  }).then(res => {
                    self.chatdatas = []
                    if (res) {
                      for (let m = res.length - 1; m >= 0; m--) {
                        self.chatdatas.push(res[m])
                      }
                    }
                  })
                  /* 显示当前聊天窗口信息结束 */
                  outer = false
                  break
                }
              }
            }
          }
        }
      })
    },
    // 点击用户menu，显示聊天界面
    showchatsTab(flag) {
      if (!flag) { // 当前用户之前无聊天记录，创建新的聊天界面 flag=false
        this.activechat = true
      } else { // 当前用户之前有聊天记录，进入聊天界面 flag=true
        this.activetab2 = false
        this.activetab1 = true
        this.activechat = false
        this.activelistIndex = ''
      }
      this.input1 = ''
    },
    // 显示用户列表
    showrolesTab() {
      this.activetab1 = false
      this.activetab2 = true
      this.input1 = ''
      // this.frienddatas = []
      // this.isshowbg = true
    },
    // 即时消息
    searchChat() {
      let self = this
      // 这里查询匹配用户s
      if (self.input2 === '') {
        self.chatlist = []
      } else {
        let params = {
          'content': self.input2,
          'receiverguid': self.user.guid
        }
        HTTPModule.doQueryChattedSearch(params).then(res => {
          if (res && res.rscode === '100000') {
            if (res.data && res.data.length > 0) {
              self.chatlist = []
              for (let i = 0; i < res.data.length; i++) {
                self.chatlist.push(res.data[i])
              }
            } else {
              self.chatlist = []
            }
          }
        })
      }
    },
    // 即时消息用户
    searchUser() {
      let self = this
      HTTPModule.doGetUser({ 'condition': self.input1 }).then(res => {
        if (res && res.rscode === '100000') {
          if (res.data && res.data.length > 0) {
            self.frienddatas = []
            for (let i = 0; i < res.data.length; i++) {
              self.frienddatas.push(res.data[i])
            }
            self.isshowbg = false
          } else {
            self.frienddatas = []
            self.isshowbg = true
          }
        }
      })
    },
    showChat() {
      // this.isvisible = true
      // 初次打开消息时，默认显示第一条聊天记录
      if (this.chatlist.length > 0 && this.activelistIndex === '') {
        this.clicklist(this.chatlist[0].userInfo[0])
      }
    },
    closeChat() {
      this.isvisible = false
      this.$emit('onClose', '关闭')
    },
    // 点击消息列表 用户
    clicklist(item) {
      console.log('clicklist.item', item)
      let self = this
      self.activelistIndex = item.senderGuid
      self.textarea = ''
      self.$parent.unreadNum = self.$parent.unreadNum - item.num // 点击未读消息，改变首页未读信息数
      item.num = 0
      // let msgnum = 10 * (self.userlistnum.page + 1)
      // 更新数据库未读消息
      HTTPModule.doUpdateNum({ 'senderguid': item.senderGuid }).then(res => {
        if (res.result) {
          console.log('更新成功')
        } else {
          console.log('更新失败')
        }
      })
      // 更新首页未读显示
      this.getUnreadnum()
      // 更新当前消息列表未读
      for (let i = 0, outer = true; i < self.chatlist.length && outer; i++) {
        for (let j = 0; j < self.chatlist[i].userInfo.length; j++) {
          if (self.activelistIndex === self.chatlist[i].userInfo[j].senderGuid) {
            self.chatlist[i].userInfo[j].num = 0
            outer = false
            break
          }
        }
      }
      if (item.senderGuid !== null && item.senderGuid !== undefined && item.senderGuid !== '') { // 路径参数不可为空
        HTTPModule.doQueryRightMsg({
          'senderguid': item.senderGuid,
          'msgnum': 10000
        }).then(res => {
          self.chatdatas = []
          if (res) {
            for (let m = res.length - 1; m >= 0; m--) {
              self.chatdatas.push(res[m])
            }
          }
        })
      }
    },
    // 返回文件大小
    getfileSize(size) {
      let s = parseInt(size)// 单位：b
      if (s < 1024) {
        return s + 'B'
      } else if (s > 1024 < 1024 * 1024) {
        return (s / 1024).toFixed(1) + 'KB'
      } else {
        return (s / 1024 / 1024).toFixed(1) + 'MB'
      }
    },
    // 下载文件
    downFile(item) {
      if (item.senderguid === this.user.guid) { // 自己发送的，不需要下载

      } else {
        this.downloadParams.fileguid = item.fileguid
        this.$refs.fileMessage.downloadFile()
      }
    },
    // 判断文件大小，限制100m
    beforeUpload(file) {
      let s = file.size
      if (s > 1024 * 1024 * 100) {
        this.$message({ showClose: true, message: '发送失败:发送的文件大小不能超过100M', type: 'warning' })
        return false
      } else {
        return true
      }
    },
    // 上传文件
    uploadFileOperate(file) {
      let fileSize = this.beforeUpload(file)
      if (!fileSize) {
        return
      }
      this.fielQueryparams.billguid = uuid.getUuid(32, 32)
      this.$refs.fileMessage.upload()
    },
    // 上传成功后回调
    afterUpload(file, data) {
      file.fileguid = data
      file.appid = 'message-service'
      this.sendMsg({ 'msgtype': '1', 'fileinfo': file })
    },
    sendMsg(msginfo) { // type为消息类型 不传为普通消息，1为文件
      let msgtype = msginfo.msgtype === '1' ? msginfo.msgtype : '0'
      let fileinfos

      if (msgtype === '1') { // 文件
        fileinfos = msginfo.fileinfo
      } else { // 普通信息
        if (this.textarea === '' || this.textarea === undefined || this.textarea === null || this.textarea.trim() === '') {
          this.$message({ showClose: true, message: '聊天内容不能为空！', type: 'error' })
          this.textarea = ''
          return false
        }
        if (this.textarea.length > 800) { // 限制内容长度
          this.$message({ showClose: true, message: '输入内容过长（不得超过800字符）', type: 'error' })
          this.textarea = ''
          return false
        }
      }

      this.chatdatas.push({ // 显示在聊天消息框里
        contents: msgtype === '1' ? (fileinfos.name + '#' + fileinfos.size) : this.textarea,
        senderguid: this.user.guid,
        msgtype: msgtype,
        fileguid: msgtype === '1' ? fileinfos.fileguid : ''
      })
      let data = { // 发送给对方的信息
        'receiverguid': '',
        'receivername': '',
        'receivercode': '',
        'contents': msgtype === '1' ? (fileinfos.file.name + '#' + fileinfos.file.size) : this.textarea,
        'sendername': this.user.name,
        'msgtype': msgtype,
        'filename': msgtype === '1' ? fileinfos.file.name : '',
        'fileSize': msgtype === '1' ? fileinfos.file.size : '',
        'fileguid': msgtype === '1' ? fileinfos.fileguid : ''
      }
      if (this.activechat) { // 未存在聊天记录 新建聊天记录，从用户列表 获取发送信息
        for (let i = 0, outer = true; i < this.frienddatas.length && outer; i++) {
          for (let j = 0; j < this.frienddatas[i].userInfo.length; j++) {
            if (this.activelistIndex === this.frienddatas[i].userInfo[j].guid) { // 当前用户信息
              this.nowData = this.frienddatas[i].userInfo[j]
              outer = false
              break
            }
          }
        }
        data.receiverguid = this.nowData.guid
        data.receivername = this.nowData.name
        data.receivercode = this.nowData.code
      } else { // 已存在聊天记录 从聊天列表 获取发送信息
        for (let i = 0, outer = true; i < this.chatlist.length && outer; i++) {
          for (let j = 0; j < this.chatlist[i].userInfo.length; j++) {
            if (this.activelistIndex === this.chatlist[i].userInfo[j].senderGuid) { // 当前用户信息
              this.nowData = this.chatlist[i].userInfo[j]
              outer = false
              break
            }
          }
        }
        data.receiverguid = this.nowData.guid
        data.receivername = this.nowData.name
        data.receivercode = this.nowData.code
      }
      let self = this
      HTTPModule.doMessageSave({ 'data': data }).then(res => {
        if (res && res.result === true) {
          self.textarea = ''
        } else {
          self.$message({ showClose: true, message: '发送失败', type: 'error' })
        }
      })
      self.textarea = ''
      this.scrolltobottom()
    },
    clickFlist(item, idx) { // 点击好友列表跳转到聊天界面
      this.isshowbg = false
      let guid = item.guid// 获得好友guid/senderGuid
      let flag = false// 该好友是否存在聊天信息列表
      for (let i = 0, outer = true; i < this.chatlist.length && outer; i++) {
        for (let j = 0; j < this.chatlist[i].userInfo.length; j++) {
          if (guid === this.chatlist[i].userInfo[j].senderGuid) {
            outer = false// 跳出外循环
            flag = true
            break
          }
        }
      }
      if (!flag) { // 该好友聊天记录  不存在
        this.chatdatas = []
        this.activeFIndex = guid
        let flag1 = false// 该好友 区划是否已存在
        for (let i = 0; i < this.chatlist.length; i++) {
          if (item.admdiv === this.chatlist[i].guid) { // 找到对应区划，push进该区划下
            flag1 = true
            this.chatlist[i].userInfo.push({
              admdiv: this.chatlist[i].guid,
              admdivname: this.chatlist[i].name,
              content: '',
              name: item.name,
              num: 0,
              orgcode: item.orgcode,
              orgname: item.orgname,
              province: item.province,
              senderGuid: guid
            })
            break
          }
        }
        if (!flag1) {
          this.chatlist.push({
            code: item.province,
            guid: item.admdiv,
            isleaf: '1',
            levelno: '',
            name: item.admdivname,
            superguid: '',
            userInfo: [{
              admdiv: item.admdiv,
              admdivname: item.admdivname,
              content: '',
              name: item.name,
              num: 0,
              orgcode: item.orgcode,
              orgname: item.orgname,
              province: item.province,
              senderGuid: guid
            }]
          })
        }
      }
      this.showchatsTab(flag)
      this.activelistIndex = guid
    },
    scrolltobottom() {
      // 自动滚动到容器底部
      var container = this.$el.querySelector('#msgDivcon')
      container.scrollTop = container.scrollHeight
    }
  },
  watch: {
    activelistIndex: function (newval) {
      for (let i = 0; i < this.chatlist.length; i++) {
        for (let j = 0; j < this.chatlist[i].userInfo.length; j++) {
          if (newval === this.chatlist[i].userInfo[j].senderGuid) {
            this.nowchatName = this.chatlist[i].userInfo[j].name
            return
          }
        }
      }
    },
    input1: function (newval, oldval) {
      this.searchUser()
    },
    frienddatas: function (newval) {
      if (newval.length > 0) {
        this.isshowbg = false
      }
    },
    chatdatas: function () {
      this.$nextTick(function () {
        this.scrolltobottom()
      })
    },
    authenticationInfo: {
      handler(newValue, oldValue) {
        this.tokenid = newValue.tokenid
      },
      deep: true,
      immediate: true
    },
    userInfo: {
      handler(newValue, oldValue) {
        this.user = newValue
        console.log('this.user', this.user)
      },
      deep: true,
      immediate: true
    }
  }
}
</script>

<style>
.mychat .vxe-modal--box {
    height: 510px;
    width: 860px;
}

/* .mychat .vxe-modal--header {
    display: none;
} */

.mychat .vxe-modal--body {
    width: 100%;
    height: 100%;
    position: relative;
    padding: 0;
}

/*左侧菜单*/
.mychat .chat_menu {
    position: absolute;
    width: 60px;
    height: 100%;
    background: #2f2a2a;
}

.mychat .userIcon {
    margin: 0 auto;
    padding-top: 20px;
    text-align: center;
}

.mychat #userIcon {
    border-radius: 3px;
    height: 34px;
    width: 34px;
}

.mychat .userTabs {
    margin-top: 25px;
    text-align: center;
}

.mychat .userTabs > i {
    display: block;
    color: #F0F0F0;
    font-size: 22px;
    margin-top: 25px;
    cursor: pointer;
}

.mychat .userTabs > i.active {
    color: #09bb07;
}

/*左侧用户列表*/
.mychat .chat_role {
    position: absolute;
    width: 250px;
    left: 60px;
    height: 100%;
    background: #ece9e7;
}

.searchuser {
    margin-top: 15px;
    margin-left: 20px;
}

.searchuser input {
    width: 200px;
    height: 30px;
    border-radius: 3px;
    padding-left: 25px;
    outline: none;
    border: 1px solid #dbd9d8;
    background: #dbd9d8;
}

.searchuser .el-input__prefix {
    top: -4px;
}

.searchuser input:hover {
    background: #fff;
}

.chatlists {
    position: absolute;
    top: 60px;
    bottom: 0;
    width: 100%;
    overflow: auto;
}

.chatlists .userlist {
    position: relative;
    height: 60px;
    cursor: pointer;
}

.userlist.active,
.userlist:hover {
    background: #C9C6C6;
}

.chatlists .userlist .userlist_icon {
    position: absolute;
    width: 60px;
    height: 60px;
    padding: 10px;
    font-size: 40px;
    color: #09bb07;
}

.chatlists .userlist .userlist_con {
    position: absolute;
    left: 60px;
    right: 0;
    height: 100%;
    padding: 10px 10px 10px 0;
}

.chatlists .userlist .userlist_name {
    font-size: 16px;
    color: #000;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.chatlists .userlist .userlist_newinfo {
    font-size: 12px;
    line-height: 20px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.chatlists .userlist.friendlist .userlist_name {
    line-height: 40px;
}

.chatlists.showbg {
    background: url('../img/chatlist_bg.png') no-repeat;
    background-size: 78%;
    background-position: center;
}

.unread_n {
    position: absolute;
    display: inline-block;
    top: 0;
    left: 5px;
    background: #f00;
    padding: 3px 2px;
    color: #fff;
    min-width: 10px;
    text-align: center;
    line-height: 14px;
    border-radius: 10px;
}
/*右侧主体内容*/
.mychat .chat_con {
    position: absolute;
    right: 0;
    width: 550px;
    height: 100%;
    background: #f5f5f5;
}

/*右侧顶部*/
.mychat .msgDivtitle {
    height: 60px;
    width: 100%;
    border-bottom: 1px solid #e7e7e7;
    position: absolute;
}

.mychat .msgDivtitle .close {
    position: absolute;
    top: 10px;
    right: 10px;
}

.mychat .msgDivtitle .refresh {
    position: absolute;
    right: 50px;
    font-size: 16px;
}

.mychat #dialoguename {
    position: absolute;
    height: 60px;
    line-height: 60px;
    left: 20px;
    right: 40px;
    font-size: 16px;
}

.mychat .msgDivcon {
    position: absolute;
    width: 90%;
    top: 60px;
    height: 285px;
    overflow: auto;
    padding: 10px 20px;
}

.mychat .msglist {
    margin: 10px 0;
    overflow: hidden;
    width: 100%;
}

.mychat .msglist > i {
    float: left;
    width: 32px;
    height: 32px;
    font-size: 32px;
    color: #09bb07;
}

.mychat .msglist.msgtwo > i {
    float: right;
    background: url('../img/user.png') no-repeat;
    background-size: contain;
}

.mychat .msglist .msglisttext {
    float: left;
    margin-left: 10px;
    max-width: 400px;
    background: #fff;
    border-radius: 2px;
    padding: 5px 10px;
}

.mychat .msglist.msgtwo .msglisttext {
    float: right;
    margin-right: 10px;
}

.mychat .msgDivedit {
    position: absolute;
    width: 100%;
    bottom: 0px;
    height: 165px;
    border-top: 1px solid #e7e7e7;
    background-color: #fff;
}

.mychat .sendmsg {
    width: 100%;
    height: calc(100% - 50px);
    padding-top: 35px;
}

.mychat .sendmsg textarea {
    width: 100%;
    resize: none;
    height: 100%;
    padding: 0 15px 15px;
    border: 0;
}

.mychat .sendbtn {
    position: absolute;
    right: 20px;
    bottom: 10px;
}

.mychat .sendfilebtn {
    position: absolute;
    top: 0;
    left: 10px;
    font-size: 20px;
    color: #aaa;
}

.mychat .sendfilebtn:hover {
    color: var(--primary-color);
}

.mychat .chatlist_level {
    line-height: 30px;
    padding-left: 10px;
}

.mychat .nousers {
    line-height: 60px;
    padding-left: 20px;
}

/*发送文件*/
.mychat .upload-demo .el-upload__input {
    display: none;
}

.mychat .msgfile {
    background: #fff;
    cursor: pointer;
    width: 200px;
    height: 80px;
    margin-left: 41px;
    padding: 15px;
    box-sizing: border-box;
    border: 1px solid #ddd;
    position: relative;
}

.mychat .msgfile:hover {
    background: #f6f6f6;
}

.mychat .msgtwo .msgfile {
    float: right;
    margin-right: 11px;
}

.mychat .msgfile .msgfile_name {
    font-size: 14px;
    width: 125px;
    color: #000;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}

.mychat .msgfile .msgfile_size {
    color: #ddd;
    font-size: 12px;
}

.mychat .msgfile .msgfile_img {
    position: absolute;
    right: 15px;
    top: 15px;
    width: 30px;
    height: 40px;
    background: url('../img/file.png') no-repeat;
}

.mychat .msgtwo .msgfile_img {

    background: url('../img/file_d.png') no-repeat;
}
</style>
