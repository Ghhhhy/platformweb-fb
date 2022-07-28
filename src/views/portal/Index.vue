<!--  组件模版   Author:Titans -->
<template>
  <div class="index">
    <!-- <czy-header /> -->
    <BsAppHeader />
    <!-- <div class="nav"></div> -->
    <div class="contain-main">
      <div class="content-tabs">
        <div class="basic-infor" @click="jumpTabs">
          <p></p><h3>基础信息管理</h3>
        </div>
        <div class="project" @click="jumpTabs">
          <p></p><h3>项目库管理</h3>
        </div>
        <div class="budget-organization" @click="jumpTabs">
          <p></p><h3>预算编制管理</h3>
        </div>
        <div class="budget-do" @click="jumpTabs">
          <p></p><h3>预算执行管理</h3>
        </div>
      </div>
      <div class="middle-box">
        <span>我的关注</span>
        <div class="set" @click="dialogVisible = true"><img src="../../assets/img/indeximg/btn_set_h.png" alt=""></div>
        <el-dialog
          title="提示"
          :visible.sync="dialogVisible"
          width="30%"
          :before-close="handleClose"
        >
          <span>这是一段信息</span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
          </span>
        </el-dialog>
      </div>
      <div class="main-content">
        <div class="midpanel"></div>
        <div class="midpane2"></div>
        <div class="midpane3"></div>
        <div class="midpane4"></div>
      </div>
      <div class="bottombox">
        <div class="bottombox-tabs">
          <div class="tabs-top" @click="setIsShow">我的待办</div>
          <div class="tabs-bottom">我的查询</div>
        </div>
        <div v-if="isShow" class="bottombox-contents">
          <div class="bottombox-contents-left">
            <div class="bottombox-header">
              <h3>基础信息管理</h3>
              <p>124</p>
            </div>
            <div class="bottombox-footer">
              <i class="base-font baserili" style="font-size:24px;"></i>
              <span>待办事项一</span>
              <ul>
                <li>现有部门一级目录</li>
                <li>现有部门一级目录</li>
                <li>现有部门一级目录</li>
              </ul>
            </div>
          </div>
          <div class="bottombox-contents-center">
            <div class="bottombox-header">
              <h3>项目库管理</h3>
              <p>124</p>
            </div>
            <div class="bottombox-footer">
              <ul>
                <li>现有部门一级目录</li>
                <li>现有部门一级目录</li>
                <li>现有部门一级目录</li>
              </ul>
            </div>
          </div>
          <div class="bottombox-contents-right">
            <div class="bottombox-header">
              <h3>预算编制管理</h3>
              <p>124</p>
            </div>
            <div class="bottombox-footer">
              <ul>
                <li>现有部门一级目录</li>
                <li>现有部门一级目录</li>
                <li>现有部门一级目录</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import CzyHeader from '../../components/layout/Header'
export default {
  name: 'Portal',
  components: {
    // CzyHeader
  }, // {组件1，组件2}，所导入组件名
  data() {
    return {
      dialogVisible: false,
      isShow: true
    }
  }, // 组件数据源
  created() {
    let { tokenid } = this.$store.getters.getLoginAuthentication
    if (!tokenid) {
      this.$router.push({
        name: 'Login'
      })
    }
  },
  mounted() {
    this.initEcharts()
    this.initEcharts1()
    this.initEcharts2()
    this.initEcharts3()
    // alert("虚拟dom已经挂载到实际dom树中,页面加载完成")
  },
  methods: {
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    jumpTabs() {
      this.$router.push('/Login')
    },
    methodName(arg) {
      // 要执行的操作
    },
    initEcharts() {
      let myCharts = this.$echarts.init(document.querySelector('.midpanel'))
      myCharts.setOption({
        title: {
          text: '2021年资金需求占比',
          x: 'left'
        },
        color: ['#CD5C5C', '#00CED1', '#9ACD32', '#FFC0CB'],
        stillShowZeroSum: false,
        series: [
          {
            name: 'bug分布',
            type: 'pie',
            radius: '80%',
            center: ['60%', '60%'],
            data: [
              { value: 1, name: '1' },
              { value: 3, name: '2' },
              { value: 7, name: '3' },
              { value: 4, name: '4' }
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(128, 128, 128, 0.5)'
              }
            }
          }
        ]
      })
    },
    initEcharts1() {
      let myCharts = this.$echarts.init(document.querySelector('.midpane2'))
      myCharts.setOption({
        title: {
          text: '2021年资金需求占比',
          x: 'left'
        },
        color: ['#CD5C5C', '#00CED1', '#9ACD32', '#FFC0CB'],
        stillShowZeroSum: false,
        series: [
          {
            name: 'bug分布',
            type: 'pie',
            radius: '80%',
            center: ['60%', '60%'],
            data: [
              { value: 1, name: '1' },
              { value: 3, name: '2' },
              { value: 7, name: '3' },
              { value: 4, name: '4' }
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(128, 128, 128, 0.5)'
              }
            }
          }
        ]
      })
    },
    initEcharts2() {
      let myCharts = this.$echarts.init(document.querySelector('.midpane3'))
      myCharts.setOption({
        title: {
          text: '2021年资金需求占比',
          x: 'left'
        },
        color: ['#CD5C5C', '#00CED1', '#9ACD32', '#FFC0CB'],
        stillShowZeroSum: false,
        series: [
          {
            name: 'bug分布',
            type: 'pie',
            radius: '80%',
            center: ['60%', '60%'],
            data: [
              { value: 2, name: '1' },
              { value: 5, name: '2' },
              { value: 7, name: '3' },
              { value: 9, name: '4' }
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(128, 128, 128, 0.5)'
              }
            }
          }
        ]
      })
    },
    initEcharts3() {
      let myCharts = this.$echarts.init(document.querySelector('.midpane4'))
      myCharts.setOption({
        title: {
          text: '2021年资金需求占比',
          x: 'left'
        },
        color: ['#0f0', '#f99', '#99f', '#9f9'],
        stillShowZeroSum: false,
        series: [
          {
            name: 'bug分布',
            type: 'pie',
            radius: '80%',
            center: ['60%', '60%'],
            data: [
              { value: 1, name: '1' },
              { value: 3, name: '2' },
              { value: 7, name: '3' },
              { value: 4, name: '4' }
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(128, 128, 128, 0.5)'
              }
            }
          }
        ]
      })
    },
    setIsShow() {
      this.isShow = !this.isShow
    }
  },
  watch: {
    dataobj: {
      handler() {
        // 要执行的操作
      },
      deep: true, // 是否深度监听，意为对象dataobj内部任何属性发生变化则全局重新渲染
      immediate: true // 代表在watch里声明了dataobj这个方法之后立即先去执行handler方法
    }
  }
}
</script>
<style lang="scss">
.index{
  // .header{
  //   height: 50px;
  //   background-color: var(--primary-color);
  // }
  // .nav{
  //   height:30px;
  //   background-color: #f99;
  // }
  .contain-main{
    height:100%;
    width:100%;
    // background-image: url('../../assets/img/indeximg/homebg.png') ;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    .content-tabs{
      display: flex;
      justify-content: space-around;
      div{
        border-radius: 15px;
        margin-top:20px;
        width:350px;
        height:80px;
      }
      .basic-infor{
        display: flex;
        background-image: url('../../assets/img/indeximg/toppanelbg1.png') ;
        background-repeat: no-repeat;
        background-size: 350px 80px;
        p{
          margin-left:20px;
          width:80px;
          height:80px;
          background-image: url('../../assets/img/indeximg/panel1.png') ;
          background-size: 80px 80px;
          background-repeat: no-repeat;
        }
      }
      .project{
        display: flex;
        background-image: url('../../assets/img/indeximg/toppanelbg2.png') ;
        background-repeat: no-repeat;
        background-size: 350px 80px;
        p{
          margin-left:20px;
          width:80px;
          height:80px;
          background-image: url('../../assets/img/indeximg/panel2.png') ;
          background-size: 80px 80px;
          background-repeat: no-repeat;
        }
      }
      h3{
          line-height: 80px;
          color:#fff;
          font-size: 24px;
          padding-left:40px;
        }
      .budget-organization{
        display: flex;
        background-image: url('../../assets/img/indeximg/toppanelbg3.png') ;
        background-repeat: no-repeat;
        background-size: 350px 80px;
        p{
          margin-left:20px;
          width:80px;
          height:80px;
          background-image: url('../../assets/img/indeximg/panel3.png') ;
          background-size: 70px 70px;
          background-repeat: no-repeat;
        }
      }
      .budget-do{
        display: flex;
        background-image: url('../../assets/img/indeximg/toppanelbg4.png') ;
        background-repeat: no-repeat;
        background-size: 350px 80px;
        p{
          margin-left:20px;
          width:80px;
          height:80px;
          background-image: url('../../assets/img/indeximg/panel4.png') ;
          background-size: 80px 80px;
          background-repeat: no-repeat;
        }
      }
    }
    .middle-box{
      height:65px;
      width:100%;
      span{
        line-height: 65px;
        font-size: 24px;
        padding-left:20px;
      }
      .set{
        width:20px;
          height:20px;
        float:right;
        padding-right:40px;
        padding-top:20px;
        img{
          width:20px;
          height:20px;
        }
      }
    }
    .main-content{
      display: flex;
      justify-content: space-around;
      div{
        width: 20%;
        height:280px;
      }
    }
    .bottombox{
      height: 400px;
      width:90%;
      margin-left:5%;
      margin-top:30px;
      .bottombox-tabs{
        float:left;
        width:10%;
        height:400px;
        background: var(--primary-color);
        div{
          color:#fff;
          height:200px;
          padding-left:20px;
          margin:0 auto;
          font-size: 24px;
          line-height: 200px;
        }
        .tabs-bottom{
          background:cadetblue;
        }
      }
      .bottombox-contents{
        float:right;
        width:90%;
        height:400px;
        display: flex;
        justify-content: space-around;
        div{
          width:30%;
          height:100%;
          .bottombox-header{
            border-radius: 5px;
            justify-content: space-between;
            display: flex;
            height:10%;
            width:100%;
            background:rgb(42, 139, 252);
            h3{
              padding-left:20px;
              line-height:40px;
              width:50%;
              font-size: 24px;
              color:#fff;
            }
            p{
              font-size: 12px;
              color:#fff;
              padding:10px 10px 10px 10px;
            }
          }
          .bottombox-footer{
            width:100%;
            height:90%;
            background:#fff;
            i{
              padding-left:20px;
              margin-top:30px;
            }
            span{
              color:rgb(135, 140, 143)
            }
            ul{
              padding-left: 20px;
              li{
                text-overflow: ellipsis;
                white-space: nowrap;
                overflow: hidden;
                line-height: 40px;
                font-size:16px;
                padding-left:10px;
              }
            }
          }
        }
      }
    }
  }
}
</style>
