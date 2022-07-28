<template>
  <div class="contain-main-bottom">
    <div class="contain-footer">
      <div class="contain-left">
        <div class="collect" :class="{ check: isSelected === 'C' }" @click="onChecked('C')"><span>我的收藏</span></div>
        <div class="collect" :class="{ check: isSelected === 'B' }" @click="onChecked('B')"><span>我的待办</span></div>
        <div class="collect" :class="{ check: isSelected === 'S' }" @click="onChecked('S')"><span>我的查询</span></div>
      </div>
      <div v-if="isSelected === 'C'" class="contain-right">
        <div v-for="(item,index) in containCollect" v-show="isShow" :key="index" class="right-main-C" @click="getRouter(item)">
          <i class="el-icon-circle-close close-icon" @click.stop="closeIcon(index, item.guid, item.roleguid)"></i>
          <!-- <img :src="item.pic" class="img"> -->
          <img :src="require('@/assets/img/homeImg/sqcard' + `${index % 6}` + '.png')" alt="" class="img">
          <p>{{ item.name }}</p>
        </div>
        <div class="right-main pointer" @click="addBox">
          <!-- <i class="el-icon-circle-close close-icon"></i> -->
          <div class="add-icon">
            <img src="../../../assets/img/homeImg/add.png" alt="" class="add-pic">
          </div>
          <p class="right-mian-add">新增</p>
        </div>
      </div>
      <div v-if="isSelected === 'B'" class="right-B">
        <div v-for="(item,index) in containBacklog" :key="index" class="right-main-B">
          <div class="right-box">
            <img :src="item.url" alt="" class="right-img">
          </div>
          <div class="right-text">
            <span class="desc">{{ item.desc }}</span>
            <span class="sum">{{ item.sum }}</span>
          </div>
        </div>
      </div>
      <div v-if="isSelected === 'S'" class="right-S">
        <div class="rightS-box">
          <p v-for="(item,index) in containSelect" :key="index" class="containSelect-text">{{ item.desc }}</p>
        </div>
        <div class="rightS-box">
          <p v-for="(item,index) in containList" :key="index" class="containSelect-text">{{ item.desc }}</p>
        </div>
        <div class="speed-of-progress-buttom"></div>
      </div>
    </div>
    <HomeMainDialog v-if="showHomeMainDialog" />
  </div>
</template>

<script>
import MenuModule from '@/api/frame/common/menu.js'
import HomeMainDialog from './HomeMainDialog.vue'
export default {
  name: 'HomeMain',
  components: { HomeMainDialog },
  data() {
    return {
      containCollect: [
        // {
        //   pic: require('@/assets/img/homeImg/sqcard0.png'),
        //   desc: '单位指标支付方式确认'
        // },
        // {
        //   pic: require('@/assets/img/homeImg/sqcard1.png'),
        //   desc: '指标审核'
        // },
        // {
        //   pic: require('@/assets/img/homeImg/sqcard2.png'),
        //   desc: '资产负债表'
        // },
        // {
        //   pic: require('@/assets/img/homeImg/sqcard3.png'),
        //   desc: '单位指标支付方式确认'
        // },
        // {
        //   pic: require('@/assets/img/homeImg/sqcard4.png'),
        //   desc: '单位指标支付方式确认'
        // },
        // {
        //   pic: require('@/assets/img/homeImg/sqcard5.png'),
        //   desc: '单位指标支付方式确认'
        // }
      ],
      containBacklog: [
        {
          url: require('@/assets/img/homeImg/card1.png'),
          desc: '指标管理',
          sum: '共计4928笔'
        },
        {
          url: require('@/assets/img/homeImg/card2.png'),
          desc: '国库支付管理',
          sum: '共计8355笔'
        },
        {
          url: require('@/assets/img/homeImg/card3.png'),
          desc: '公务卡管理',
          sum: '共计50笔'
        },
        {
          url: require('@/assets/img/homeImg/card4.png'),
          desc: '电子支付管理',
          sum: '共计363笔'
        },
        {
          url: require('@/assets/img/homeImg/card5.png'),
          desc: '总账管理',
          sum: '共计2笔'
        }
      ],
      containSelect: [
        { desc: '在线数据查询' },
        { desc: '转移支付指标全流程跟踪表' },
        { desc: '上级转移支付登记' },
        { desc: '本级库存登记管理' },
        { desc: '全辖库存登记管理' }
      ],
      containList: [
        { desc: '报表查询' },
        { desc: '预算执行动态监控情况表' },
        { desc: '单位指标明细查询' },
        { desc: '国库集中支付执行情况表' }
      ],
      isShow: true,
      isSelected: 'C',
      editableTabsValue: 1,
      tabIndex: 1,
      showHomeMainDialog: false,
      userInfo: null
    }
  },
  methods: {
    onChecked(type) {
      this.isSelected = type
      this.getCollectionMenu()
    },
    closeIcon(indexs, menuguid, roleguid) {
      let self = this
      let box = document.querySelectorAll('.right-main-C')
      for (let i = 0; i < box.length; i++) {
        if (indexs === i) {
          box[i].style.display = 'none'
        }
      }
      self.userInfo = self.$store.state.userInfo
      let param = {
        menuguid: [{ menuguid: menuguid, roleguid: roleguid }],
        userguid: self.userInfo.guid,
        year: self.userInfo.year,
        province: self.userInfo.province,
        appguid: self.userInfo.app.guid
      }
      MenuModule.removeCollectionMenu(param).then(res => {
        var result = JSON.parse(res)
        if (result && result.result) {
          this.getCollectionMenu()
          self.$message(result.msg)
        } else {
          this.getCollectionMenu()
          self.$message(result.msg)
        }
      })
    },
    addBox() {
      this.showHomeMainDialog = true
    },
    async getCollectionMenu() {
      let self = this
      let userInfo = self.$store.state.userInfo
      self.containCollect = []
      let param = {
        year: userInfo.year,
        province: userInfo.province,
        appguid: userInfo.app.guid
      }
      MenuModule.getCollectionMenu(param).then(res => {
        if (res) {
          self.containCollect = JSON.parse(res)
          // this.getNewDataColumns(self.containCollect)
        } else {
          console.error(JSON.parse(res))
        }
      })
    },
    getNewDataColumns(dataColums) {
      this.containCollect = []
      dataColums.map(item => {
        if (item.children) {
          this.getNewDataColumns(item.children)
        } else {
          let obj = {
            code: item.code,
            name: item.name,
            remark: item.remark
          }
          Object.assign(item, obj)
          this.containCollect.push(item)
        }
        return item
      })
      return dataColums
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
          }
        })
      } else {
        this.$store.commit('setCurMenuObj', obj)
        // this.registTabComs(obj)
      }
    },
    getRouter(value) {
      let arr = []
      arr.push(value)
      let valueNum = arr.slice(0, arr.length + 1)
      if (valueNum[0].name === valueNum[0].f_FullName) {
        this.onMenuSelectChange(value)
      }
    }
  },
  mounted() {
    this.getCollectionMenu()
  },
  watch: {
    status: {
      handler(newValue) {
      },
      immediate: false
    }
  }
}
</script>

<style lang='scss'>
  .contain-main-bottom{
    width: 100%;
    height: 50%;
    padding: 10px 0;
    box-sizing: border-box;
    .contain-footer {
      height: 100%;
      background: #fff;
      box-shadow: 1px 1px 10px 0px rgba(0,0,0,0.1);
      .contain-left {
        width: 20%;
        float:left;
        padding: 10px;
        height:100%;
            box-sizing: border-box;
        .collect {
          width: 90%;
          height: 28%;
          margin-top: 4%;
          font-size: 18px;
          font-weight: 600;
          background: #f6f7fb;
          border-radius: 4px;
          cursor:pointer;
          position:relative;
          span{
            position:absolute;
            width:100%;
            text-align: center;
            top:40%;
          }
        }
        .collect.check {
            background: var(--primary-color);
            color: #fff;
          }

      }
      .contain-right {
        width: 80%;
        height: 100%;
        overflow: auto;
        float:right;
        box-sizing: border-box;
        .right-main-C {
          width: 18%;
          height: 44%;
          float: left;
          margin-right: 2%;
          margin-top: 1%;
          background: rgba(0, 0, 0, 0.02);
          box-shadow: 1px 1px 10px 0px #dedede;
          position:relative;
          .close-icon {
            font-size: 18px;
            position: absolute;
            right: 10px;
            top: 5px;
            color: var(--primary-color);
          }
          .img {
            position: absolute;
            width: 70px;
            height: 70px;
            left: 50%;
            top: 10%;
            transform: translateX(-50%);
          }
          p{
            text-align: center;
            width: 100%;
            position: absolute;
            bottom: 20%;
            font-size: 16px;
          }
        }
        .right-main-C:hover,.right-main:hover {
          background: #fff;
          box-shadow: 1px 1px 10px 0px #dedede;
        }
        .right-main {
          width: 18%;
          height: 44%;
          float: left;
          margin-right: 2%;
          margin-top: 1%;
          background: rgba(0, 0, 0, 0.02);
          box-shadow: 1px 1px 10px 0px #dedede;
          position:relative;
          .close-icon {
            font-size: 18px;
            position: absolute;
            right: 10px;
            top: 5px;
            color: var(--primary-color);
          }
          .add-icon {
            width: 26%;
            margin: 6% auto;
            text-align: center;
            .add-pic {
              width: 70px;
              height: 70px;
              margin: 0 auto;
            }
          }
          .right-mian-add {
            width: 100%;
            position: absolute;
            bottom: 20%;
            font-size: 16px;
            margin: 0 auto;
            text-align: center;
          }
        }
      }
      .right-B {
        width: 80%;
        height: 100%;
        float:right;
        overflow: auto;
        box-sizing: border-box;
        .right-main-B {
          width: 30%;
          float: left;
          height: 40%;
          margin-top: 2%;
          margin-right: 3%;
          position:relative;
          .right-box {
            position: absolute;
            width: 25%;
            height: 100%;
            background: rgb(235, 239, 249);
            img{
              position:absolute;
              width:50px;
              height:50px;
              top:50%;
              left:50%;
              transform: translate(-50%,-50%);
            }
          }
          .right-text {
            position: absolute;
            width: 75%;
            left:25%;
            height:100%;
            font-size: 16px;
            background: rgb(246, 247, 251);
            >span{
              position:absolute;
              top:50%;
              transform: translateY(-50%);
            }
            .desc{
              left:10px;
              right:100px;
              text-overflow: ellipsis;
              overflow:hidden;
              white-space: nowrap;
            }
            .sum {
              right:10px;
              background: var(--primary-color);
              color: #fff;
              font-size: 12px;
              border-radius: 15px;
              padding: 5px;
            }
          }
          &:hover{
            box-shadow: 1px 1px 10px 0px #dedede;
            .right-box{
              background:#EEF6FF;
            }
            .right-text{
              background:#fff;
            }
          }
        }
      }
      .right-S {
        width: 80%;
        height: 100%;
        float:right;
        box-sizing: border-box;
        overflow-y: auto;
        padding:10px;
        .rightS-box {
          width: 30%;
          float: left;
          height: 90%;
          margin-top: 1%;
          margin-right: 3%;
          font-size: 16px;
          background: #f6f7fc;
          box-sizing: border-box;
          &:hover{
            background:#fff;
            box-shadow: 1px 1px 10px 0px #dedede;
          }
          .containSelect-text {
            margin-top: 10px;
            margin-left: 10px;
            cursor:pointer;
          }
          .containSelect-text:hover {
            color: var(--primary-color);
          }
        }
      }
    }
  }
  @media screen and ( max-width:1400px ){
    .contain-main-bottom{
      .contain-footer {
        .contain-left{
          .collect{
            font-size:14px;
            span{
              top:36%;
            }
          }
        }
        .contain-right {
          .right-main-C{
            .img{
              width:40px;
              height:40px;
            }
            p{
              font-size:12px;
            }
          }
          .right-main {
            .add-icon {
              .add-pic {
              width:40px;
              height:40px;
              margin-top: 15%;
              }
            }
            .right-mian-add{
              font-size:12px;
            }
          }
        }
        .right-B{
          .right-main-B {
            .right-text {
              .desc{
                font-size:14px;
              }
              .sum{
                padding: 0px 2px;
              }
            }
          }
        }
        .right-S{
          .rightS-box{
            font-size:12px;
          }
        }
      }
    }
  }
</style>
