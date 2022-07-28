<!--  组件模版   Author:Titans -->
<template>
  <div class="index">
    <!-- <div class="nav"></div> -->
    <div class="contain-main">
      <div class="contain-main-top">
        <div class="Basic-budget">
          <div class="Basic-budget-header">
            <p style="float: left">预算基本情况</p>
            <p style="float: right">金额单位：&nbsp;万元</p>
          </div>
          <div class="Basic-budget-footer">
            <div class="Basic-budget-footer-top" style="height:15%;">
              <p style="float: left">预算数</p>
              <span style="float: right;line-height: 35px;">27,188661,19万元</span>
            </div>
            <div class="Basic-budget-footer-middle">
              <div class="left">
                <p>本年预算</p>
                <p>27,188661,19万元</p>
              </div>
              <div class="right">
                <p>本年预算</p>
                <p>27,188661,19万元</p>
              </div>
            </div>
            <ul style="height:55%">
              <li style="height:15%">
                <p style="float: left">预算数</p>
                <span style="float: right;line-height: 12px;">27,188661,19万元</span>

              </li>
              <li style="height:15%">
                <p style="float: left">预算数</p>
                <span style="float: right;line-height: 12px;">27,188661,19万元</span>

              </li>
              <li style="height:15%">
                <p style="float: left">预算数</p>
                <span style="float: right;line-height: 12px;">27,188661,19万元</span>
              </li>
            </ul>
          </div>
        </div>
        <div class="Budget-performance"></div>
        <div class="Budget-performance-pay"></div>
        <div class="speed-of-progress"></div>
      </div>
      <!--      <div class="content-tabs">-->
      <!--        <div class="basic-infor" @click="jumpTabs">-->
      <!--          <p></p><h3>基础信息管理</h3>-->
      <!--        </div>-->
      <!--        <div class="project" @click="jumpTabs">-->
      <!--          <p></p><h3>项目库管理</h3>-->
      <!--        </div>-->
      <!--        <div class="budget-organization" @click="jumpTabs">-->
      <!--          <p></p><h3>预算编制管理</h3>-->
      <!--        </div>-->
      <!--        <div class="budget-do" @click="jumpTabs">-->
      <!--          <p></p><h3>预算执行管理</h3>-->
      <!--        </div>-->
      <!--      </div>-->
      <!--      <div class="middle-box">-->
      <!--        <span>我的关注</span>-->
      <!--        <div class="set" @click="dialogVisible = true"><img src="../../../assets/img/indeximg/btn_set_h.png" alt=""></div>-->
      <!--        <el-dialog-->
      <!--          title="提示"-->
      <!--          :visible.sync="dialogVisible"-->
      <!--          width="30%"-->
      <!--          :before-close="handleClose"-->
      <!--        >-->
      <!--          <span>这是一段信息</span>-->
      <!--          <span slot="footer" class="dialog-footer">-->
      <!--            <el-button @click="dialogVisible = false">取 消</el-button>-->
      <!--            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>-->
      <!--          </span>-->
      <!--        </el-dialog>-->
      <!--      </div>-->
      <!--      <div class="main-content">-->
      <!--        <div class="midpanel"></div>-->
      <!--        <div class="midpane2"></div>-->
      <!--        <div class="midpane3"></div>-->
      <!--        <div class="midpane4"></div>-->
      <!--      </div>-->
      <!--      <div class="bottombox">-->
      <!--        <div class="bottombox-tabs">-->
      <!--          <div class="tabs-top" @click="setIsShow">我的待办</div>-->
      <!--          <div class="tabs-bottom">我的查询</div>-->
      <!--        </div>-->
      <!--        <div v-if="isShow" class="bottombox-contents">-->
      <!--          <div class="bottombox-contents-left">-->
      <!--            <div class="bottombox-header">-->
      <!--              <h3>基础信息管理</h3>-->
      <!--              <p>124</p>-->
      <!--            </div>-->
      <!--            <div class="bottombox-footer">-->
      <!--              <i class="base-font baserili" style="font-size:24px;"></i>-->
      <!--              <span>待办事项一</span>-->
      <!--              <ul>-->
      <!--                <li>现有部门一级目录</li>-->
      <!--                <li>现有部门一级目录</li>-->
      <!--                <li>现有部门一级目录</li>-->
      <!--              </ul>-->
      <!--            </div>-->
      <!--          </div>-->
      <!--          <div class="bottombox-contents-center">-->
      <!--            <div class="bottombox-header">-->
      <!--              <h3>项目库管理</h3>-->
      <!--              <p>124</p>-->
      <!--            </div>-->
      <!--            <div class="bottombox-footer">-->
      <!--              <ul>-->
      <!--                <li>现有部门一级目录</li>-->
      <!--                <li>现有部门一级目录</li>-->
      <!--                <li>现有部门一级目录</li>-->
      <!--              </ul>-->
      <!--            </div>-->
      <!--          </div>-->
      <!--          <div class="bottombox-contents-right">-->
      <!--            <div class="bottombox-header">-->
      <!--              <h3>预算编制管理</h3>-->
      <!--              <p>124</p>-->
      <!--            </div>-->
      <!--            <div class="bottombox-footer">-->
      <!--              <ul>-->
      <!--                <li>现有部门一级目录</li>-->
      <!--                <li>现有部门一级目录</li>-->
      <!--                <li>现有部门一级目录</li>-->
      <!--              </ul>-->
      <!--            </div>-->
      <!--          </div>-->
      <!--        </div>-->
      <!--      </div>-->
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
    .contain-main{
      height:800px;
      width:100%;
      // background-image: url('../../../assets/img/indeximg/homebg.png') ;
      background-repeat: no-repeat;
      background-size: 100% 100%;
      .contain-main-top{
        width:85%;
        margin:50px auto;
        border: 1px solid red;
        height:300px;
        display: flex;
        justify-content: space-between;
        .Basic-budget{
          .Basic-budget-header{
            height:10%;
            background:rgb(53,154,247);
            width:100%;
            p{
              /*font-size:24px;*/
              line-height: 30px;
              color:#fff;
            }
          }
          .Basic-budget-footer{
            height:90%;
            ul{
              li{
                p{
                  color:#fff;
                  width:70px;
                  height:100%;
                  background:rgb(53,154,247);
                  // margin:10px 5px;
                  border-radius:0 15px 0 0;
                }
              }
            }
            .Basic-budget-footer-top{
              p{
                /*line-height: 35px;*/
                color:#fff;
                width:70px;
                height:20px;
                background:rgb(53,154,247);
                margin:10px 5px;
                border-radius:0 15px 0 0;
              }
            }
            .Basic-budget-footer-middle{
              height:30%;
              display: flex;
              div{
                width:50%;
                height:100%;
                background: rgb(247,251,255)
              }
            }
          }
        }
        div{
          width:260px;
          height:100%;
          // background: #f99;
          p{
            color:rgb(161,161,163);
            float: right;
          }
        }
      }
    }
  }
</style>
