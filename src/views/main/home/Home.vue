<!--  组件模版   Author:Titans -->
<template>
  <div class="index-main">
    <div class="nav">
      <h3>我的关注</h3>
    </div>
    <div class="contain-main">
      <div class="contain-main-top">
        <div class="Budget-performance">
          <div class="Budget-performance-top">
            <p style="padding-left: 20px;">部门预算构成（资金来源）</p>
          </div>
          <div class="Budget-performance-buttom">
            <v-chart :options="initEcharts" resize style="width: 100%;height:100%;" />
          </div>
        </div>
        <div class="Budget-performance-pay">
          <div class="Budget-performance-pay-top">
            <p style="padding-left: 20px;">三公经费情况统计</p>
          </div>
          <div class="Budget-performance-pay-buttom">
            <v-chart :options="initEcharts1" resize style="width: 100%;height:100%;" />
          </div>
        </div>
        <div class="speed-of-progress">
          <div class="speed-of-progress-top">
            <p style="padding-left: 20px;">预算编报进度</p>
          </div>
          <div class="speed-of-progress-buttom">
            <v-chart :options="initEcharts2" resize style="width: 100%;height:100%;" />
          </div>
        </div>
      </div>
      <HomeMain @onMenuSelectChange="onMenuSelectChange" />
      <div class="intellect-div">
        <ul v-show="isShowIntellect" class="intellect-list">
          <li
            class="intellect-Li typeimg"
            @mouseenter="curIntellect = 'Intelligent'"
            @mouseleave="curIntellect = ''"
          >
            <el-tooltip
              class="item"
              effect="dark"
              content="智能推荐"
              placement="top-start"
            >
              <img
                :src="require('./assets/img/recommen.png')"
                data-original-title="智能推荐"
              >
            </el-tooltip>
            <ul
              v-show="curIntellect === 'Intelligent'"
              class="intellect-Li-nav"
            >
              <li
                v-for="(item, index) in intelligentRecommendation"
                :key="index"
                class="intellect-Li-nav-text"
                @click="onIntellectClick(item)"
              >
                {{ item.name }}
              </li>
            </ul>
          </li>
          <li
            class="intellect-Li typeimg"
            @mouseenter="curIntellect = 'nav'"
            @mouseleave="curIntellect = ''"
          >
            <el-tooltip
              class="item"
              effect="dark"
              content="新手导航"
              placement="top-start"
            >
              <img
                :src="require('./assets/img/nav.png')"
                data-original-title="新手导航"
              >
            </el-tooltip>
          </li>
          <li
            class="intellect-Li typeimg"
            @mouseenter="curIntellect = 'problem'"
            @mouseleave="curIntellect = ''"
          >
            <el-tooltip
              class="item"
              effect="dark"
              content="问题上报"
              placement="top-start"
            >
              <img
                :src="require('./assets/img/problem.png')"
                data-original-title="问题上报"
              >
            </el-tooltip>
          </li>
          <li
            class="intellect-Li typeimg"
            @mouseenter="curIntellect = 'help'"
            @mouseleave="curIntellect = ''"
          >
            <el-tooltip
              class="item"
              effect="dark"
              content="FAQ(帮助)"
              placement="top-start"
            >
              <img
                :src="require('./assets/img/help.png')"
                data-original-title="FAQ(帮助)"
              >
            </el-tooltip>
          </li>
        </ul>
        <div
          class="intellect-div-btn"
          @click="() => { isShowIntellect = !isShowIntellect }"
        >
          <img
            v-show="!isShowIntellect"
            class="noshow"
            :src="require('./assets/img/intellectIcon.png')"
          >
          <img
            v-show="isShowIntellect"
            class="show"
            :src="require('./assets/img/intellectIconClose.png')"
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import CzyHeader from '../../components/layout/Header'
import HomeMain from './HomeMain'
export default {
  name: 'Portal',
  components: {
    // CzyHeader
    HomeMain
  }, // {组件1，组件2}，所导入组件名
  data() {
    return {
      curIntellect: '',
      isShowIntellect: false,
      dialogVisible: false,
      isShow: true,
      charLegendData: [],
      charSeriesData: [],
      initEcharts: {
        title: {
          // text: '部门预算构成(资金来源)',
          // top: 'top',
          // left: 'center',
          // textStyle: {
          //   fontSize: 14,
          //   fontWeight: '',
          //   color: '#333'
          // }
        }, // 标题
        tooltip: {
          trigger: 'item',
          position: [20, 20],
          formatter: '{a} <br/>{b}: ({d}%)'
        }, // 提示框，鼠标悬浮交互时的信息提示
        legend: {
          show: false,
          orient: 'horizontal',
          x: 'left',
          y: 'top',
          data: []
        },
        series: [
          {
            name: '用户统计', // tooltip提示框中显示内容
            type: 'pie', // 图形类型，如饼状图，柱状图等
            color: ['#03c4f1', '#04a4f8', '#288bfd', '#6289fe', '#4ddfc1', '#36c19f'],
            radius: ['40%', '60%'], // 饼图的半径，数组的第一项是内半径，第二项是外半径。支持百分比，本例设置成环形图。具体可以看文档或改变其值试一试
            // center: ['25%', '50%'],
            // roseType:'area',是否显示成南丁格尔图，默认false
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  textStyle: { color: '#3c4858', fontSize: '12' },
                  formatter: function(val) { // 让series 中的文字进行换行
                    return val.name.split(':').join('\n')
                  }
                }, // 饼图图形上的文本标签，可用于说明图形的一些数据信息，比如值，名称等。可以与itemStyle属性同级，具体看文档
                labelLine: {
                  show: true,
                  lineStyle: { color: '#3c4858' }
                }// 线条颜色
              }, // 基本样式
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)', // 鼠标放在区域边框颜色
                textColor: '#000'
              }// 鼠标放在各个区域的样式
            },
            data: []
            // 数据，数据中其他属性，查阅文档
          } // 数组中一个{}元素，一个图，以此可以做出环形图
        ] // 系列列表
      },
      initEcharts1: {
        title: {
          // text: '三公经费情况统计',
          // top: 'top',
          // left: 'center',
          // textStyle: {
          //   fontSize: 14,
          //   fontWeight: '',
          //   color: '#333'
          // }
        }, // 标题
        tooltip: {
          trigger: 'item',
          position: [20, 20],
          formatter: '{a} <br/>{b}: {c} ({d}%)'
          //  formatter:function(val){   //让series 中的文字进行换行
          //        console.log(val);//查看val属性，可根据里边属性自定义内容
          //        var content = var['name'];
          //        return content;//返回可以含有html中标签
          //    },  // 自定义鼠标悬浮交互信息提示，鼠标放在饼状图上时触发事件
        }, // 提示框，鼠标悬浮交互时的信息提示
        legend: {
          show: false,
          orient: 'horizontal',
          x: 'left',
          y: 'top',
          data: []
        }, // 图例属性，以饼状图为例，用来说明饼状图每个扇区，data与下边series中data相匹配
        // graphic: {
        //   type: 'text',
        //   left: 'center',
        //   top: 'center',
        //   style: {
        //     text: '用户统计\n' + '100', // 使用“+”可以使每行文字居中
        //     textAlign: 'center',
        //     font: 'italic bolder 16px cursive',
        //     fill: '#000',
        //     width: 30,
        //     height: 30
        //   }
        // }, // 此例饼状图为圆环中心文字显示属性，这是一个原生图形元素组件，功能很多
        series: [
          {
            name: '用户统计', // tooltip提示框中显示内容
            type: 'pie', // 图形类型，如饼状图，柱状图等
            radius: ['40%', '60%'], // 饼图的半径，数组的第一项是内半径，第二项是外半径。支持百分比，本例设置成环形图。具体可以看文档或改变其值试一试
            color: ['#03c4f1', '#04a4f8', '#288bfd', '#6289fe', '#4ddfc1', '#36c19f'],
            // center: ['25%', '50%'],
            // roseType:'area',是否显示成南丁格尔图，默认false
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  textStyle: { color: '#3c4858', fontSize: '12' },
                  formatter: function(val) { // 让series 中的文字进行换行
                    return val.name.split(':').join('\n')
                  }
                }, // 饼图图形上的文本标签，可用于说明图形的一些数据信息，比如值，名称等。可以与itemStyle属性同级，具体看文档
                labelLine: {
                  show: true,
                  lineStyle: { color: '#3c4858' }
                }// 线条颜色
              }, // 基本样式
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)', // 鼠标放在区域边框颜色
                textColor: '#000'
              }// 鼠标放在各个区域的样式
            },
            data: []// 数据，数据中其他属性，查阅文档
          } // 数组中一个{}元素，一个图，以此可以做出环形图
        ] // 系列列表
      },
      initEcharts2: {
        legend: {},
        tooltip: {},
        dataset: {
          // dimensions: ['product', '预算金额', '指标金额', '已执行金额'],
          dimensions: ['product', '预算金额'],
          source: []
          //   [
          //   { product: '行政处', '预算金额': 260000, '指标金额': 120000, '已执行金额': 80000 },
          //   { product: '环资处', '预算金额': 90000, '指标金额': 50000, '已执行金额': 30000 },
          //   { product: '教科文处', '预算金额': 200000, '指标金额': 150000, '已执行金额': 50000 },
          //   { product: '经建处', '预算金额': 180000, '指标金额': 80000, '已执行金额': 70000 },
          //   { product: '农业处', '预算金额': 200000, '指标金额': 130000, '已执行金额': 60000 },
          //   { product: '社保处', '预算金额': 120000, '指标金额': 90000, '已执行金额': 30000 },
          //   { product: '政法处', '预算金额': 90000, '指标金额': 120000, '已执行金额': 90000 },
          //   { product: '综合处', '预算金额': 30000, '指标金额': 90000, '已执行金额': 120000 }
          // ]
        },
        color: ['#03c4f1', '#04a4f8', '#288bfd', '#6289fe', '#4ddfc1', '#36c19f'],
        xAxis: {
          type: 'category',
          axisLabel: {
            interval: 0,
            rotate: 20
          }
        },
        yAxis: {
          type: 'value',
          name: '单位(元)',
          axisTick: {
            inside: true
          },
          scale: true,
          axisLabel: {
            margin: 2,
            formatter: function (value, index) {
              if (value >= 10000 && value < 10000000) {
                value = value / 10000 + '万'
              } else if (value >= 10000000) {
                value = value / 10000000 + '千万'
              }
              return value
            }
          }
        },
        // Declare several bar series, each will be mapped
        // to a column of dataset.source by default.
        series: [
          // { type: 'bar' },
          // { type: 'bar' },
          { type: 'bar' }
        ]
      }
    }
  }, // 组件数据源
  computed: {
    systemMenu() {
      return this.$store.state.systemMenu
    },
    intelligentRecommendation() {
      return this.$store.state.systemMenu.length
        ? this.$store.state.systemMenu[1].children[0].children
        : [
          {
            code: 'Home',
            name: '首页',
            url: 'Home',
            guid: 'Home'
          }
        ]
    }
  },
  created() {

  },
  mounted() {
    this.getFiscalDataSetData()
    this.getFiscalSeriesData()
    // this.getLegendData()
    this.getSeriesData()
  },
  methods: {
    onIntellectClick(obj) {
      this.$store.commit('setCurMenuObj', obj)
    },
    methodName(arg) {
      // 要执行的操作
    },
    onMenuSelectChange(obj) {
      this.$emit('onMenuSelectChange', obj)
    },
    async getFiscalDataSetData() {
      let data = []
      await this.$http.get('/bisBudget/queryBudgetProgressData', {}).then(res => {
        if (res && res.rscode === '100000') {
          data = res.data
          // [
          //   { product: '行政处', '预算金额': 260000 },
          //   { product: '环资处', '预算金额': 90000 },
          //   { product: '教科文处', '预算金额': 200000 },
          //   { product: '经建处', '预算金额': 180000 },
          //   { product: '农业处', '预算金额': 200000 },
          //   { product: '社保处', '预算金额': 120000 },
          //   { product: '政法处', '预算金额': 90000 },
          //   { product: '综合处', '预算金额': 30000 }
          // ]
          // [
          //   { product: '行政处', '预算金额': 260000, '指标金额': 120000, '已执行金额': 80000 },
          //   { product: '环资处', '预算金额': 90000, '指标金额': 50000, '已执行金额': 30000 },
          //   { product: '教科文处', '预算金额': 200000, '指标金额': 150000, '已执行金额': 50000 },
          //   { product: '经建处', '预算金额': 180000, '指标金额': 80000, '已执行金额': 70000 },
          //   { product: '农业处', '预算金额': 200000, '指标金额': 130000, '已执行金额': 60000 },
          //   { product: '社保处', '预算金额': 120000, '指标金额': 90000, '已执行金额': 30000 },
          //   { product: '政法处', '预算金额': 90000, '指标金额': 120000, '已执行金额': 90000 },
          //   { product: '综合处', '预算金额': 30000, '指标金额': 90000, '已执行金额': 120000 }
          // ]
        } else {
          console.error(res.msg)
        }
      })

      this.initEcharts2.dataset.source = data
    },
    async getFiscalSeriesData() {
      let data = []
      await this.$http.get('/bisBudget/queryBudgetConstituteData', {}).then(res => {
        if (res && res.rscode === '100000') {
          data = res.data
          //   [
          //   { value: 89825, name: '公共预算拨款:89825万元' },
          //   { value: 25208, name: '专项资金项目:25208万元' },
          //   { value: 77462, name: '政府性基金拨款:77462万元' },
          //   { value: 23228, name: '事业收入:23228万元' },
          //   { value: 68631, name: '实户资金余额:68631万元' },
          //   { value: 67292, name: '事业单位经营收入:67292万元' },
          //   { value: 40427, name: '附属单位上缴收入:40427万元' },
          //   { value: 14473, name: '其他自有资金:14473万元' }
          // ]
        } else {
          console.error(res.msg)
        }
      })

      this.initEcharts.series[0].data = data
      // console.info(this.initEcharts)
    },
    // async getLegendData() {
    //   let data = []
    //   await this.$http.get('/bisBudget/queryFundStatisticsData', {}).then(res => {
    //     if (res && res.rscode === '100000') {
    //       let list = []
    //       let dataList = res.data
    //       for (var i = 0; i < dataList.length; i++) {
    //         list.push(dataList[i].name + ':' + dataList[i].value)
    //       }
    //       data = list
    //       // data = [
    //       //   '因公出国(境)费用:1548万元',
    //       //   '公务接待费:535万元',
    //       //   '公务用车运行维护费:510万元',
    //       //   '公务用车购置:735万元',
    //       //   '会议费:634万元',
    //       //   '培训费:650万元'
    //       // ]
    //     }
    //   })
    //   this.initEcharts1.legend.data = data
    // },
    async getSeriesData() {
      let data
      await this.$http.get('/bisBudget/queryFundStatisticsData', {}).then(res => {
        if (res && res.rscode === '100000') {
          data = res.data
          // data = [
          //   { value: 1548, name: '因公出国(境)费用:1548万元' },
          //   { value: 535, name: '公务接待费:535万元' },
          //   { value: 510, name: '公务用车运行维护费:510万元' },
          //   { value: 735, name: '公务用车购置:735万元' },
          //   { value: 634, name: '会议费:634万元' },
          //   { value: 650, name: '培训费:650万元' }
          // ]
        } else {
          console.error(res.msg)
        }
      })
      this.initEcharts1.series[0].data = data
      // console.info(this.initEcharts1)
    }
  },
  watch: {
    dataobj: {
      handler() {
        // 要执行的操作
      },
      deep: true, // 是否深度监听，意为对象dataobj内部任何属性发生变化则全局重新渲染
      immediate: true // 代表在watch里声明了dataobj这个方法之后立即先去执行handler方法
    },
    initEcharts: {
      handler() {
      },
      deep: true, // 是否深度监听，意为对象dataobj内部任何属性发生变化则全局重新渲染
      immediate: true // 代表在watch里声明了dataobj这个方法之后立即先去执行handler方法
    },
    initEcharts1: {
      handler() {
      },
      deep: true, // 是否深度监听，意为对象dataobj内部任何属性发生变化则全局重新渲染
      immediate: true // 代表在watch里声明了dataobj这个方法之后立即先去执行handler方法
    },
    initEcharts2: {
      handler() {
      },
      deep: true, // 是否深度监听，意为对象dataobj内部任何属性发生变化则全局重新渲染
      immediate: true // 代表在watch里声明了dataobj这个方法之后立即先去执行handler方法
    }

  }
}
</script>
<style lang="scss">
.index-main{
  height: 100%;
  padding: 10px 16px;
  box-sizing: border-box;
  // background-image: url('../../../assets/img/indeximg/homebg.png') ;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  .nav{
    line-height: 30px;
    height:30px;
  }
  .contain-main{
    height:calc( 100% - 30px );
    .contain-main-top{
      height: 50%;
      padding: 10px 0;
      box-sizing: border-box;
      >div{
        width:32%;
        margin-right:2%;
        height:100%;
        float:left;
      }
      .Budget-performance{
        .Budget-performance-top{
          border-radius: 5px 5px 0 0;
          color:#fff;
          line-height: 40px;
          height:40px;
          background:linear-gradient(to right,#feb485,#fb9a8d);
          width:100%;
          p{
            font-size:14px;
          }
        }
        .Budget-performance-buttom{
          height:calc( 100% - 40px );
          width:100%;
          background: #fff;
        }
      }
      .Budget-performance-pay{
        .Budget-performance-pay-top{
          border-radius: 5px 5px 0 0;
          color:#fff;
          line-height: 40px;
          height:40px;
          background:linear-gradient(to right,#5cd2bb,#2cc49c);
          width:100%;
          p{
            font-size:14px;
          }
        }
        .Budget-performance-pay-buttom{
          height:calc( 100% - 40px );
          width:100%;
          background: #fff;
        }
      }
      .speed-of-progress{
        margin-right:0;
        .speed-of-progress-top{
          border-radius: 5px 5px 0 0;
          color:#fff;
          line-height: 40px;
          height:40px;
          background:linear-gradient(to right,#b57eee,#9e57e7);
          width:100%;
          p{
            font-size:14px;
          }
        }
        .speed-of-progress-buttom{
          height:calc( 100% - 40px );
          width:100%;
          background: #fff;
        }
      }
    }
  }
}
  @media screen and ( max-width:1400px ){
    .index-main{
      .nav{
        height:20px;
        line-height:20px;
        h3{
          font-size:16px;
        }
      }
      .contain-main {
        height: calc( 100% - 20px);
        .contain-main-top{
          padding:5px 0;
        }
      }
    }
  }
.intellect-div {
  position: fixed;
  right: 20px;
  bottom: 50px;
  .intellect-div-btn {
    cursor: pointer;
    img.noshow {
      height: 100px;
      width: 100px;
    }
    img.show {
      height: 100px;
      width: 100px;
    }
  }
  .intellect-list {
    margin: 0 auto 20px auto;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.3);
    li.intellect-Li {
      width: 60px;
      cursor: pointer;
      height: auto;
      margin: 0 auto;
      padding: 10px;
      position: relative;
      img {
        width: 100%;
      }
    }
    .intellect-Li-nav {
      background-color: #fff;
      position: absolute;
      right: 80px;
      top: 0;
      overflow-y: auto;
      max-height: 200px;
      padding: 10px 0;
      border-radius: 4px;
      width: 200px;
      box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.3);
      li.intellect-Li-nav-text {
        cursor: pointer;
        line-height: 30px;
        font-size: 14px;
        color: #333;
        padding: 0 20px;
      }
    }
  }
}
</style>
