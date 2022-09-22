<template>
  <div class="new-home-414">
    <div class="nh4-sysnav">
      <ul class="nh4-sysnav-level0">
        <li v-for="(item,index) in sysMenuData" :key="index" class="fn-inline" :class="selectLevelSysMenu.name === item.name ? 'active' : ''" @click="onSysMenuClick(item,0)">
          <div class="nh4-syslabel pointer" :class="'nh4-syslabel' + (index + 1)">
            <div class="icobg fn-inline">
              <i class="nh4-syslabel-ico fn-inline"></i>
            </div>
            <span class="fn-inline">{{ item.name }}</span>
          </div>
        </li>
      </ul>
      <ul class="nh4-sysnav-son">
        <li v-for="(item1,index1) in selectLevelSysMenu.children || []" :key="index1">
          <div class="title-level1" @click="onSysMenuClick(item,1)">
            {{ item1.name }}
          </div>
          <div v-if="hasLavelc(item1)" class="title-level2">
            <div :key="index2" class="title-level2-list">
              <template v-for="(item2,index2) in item1.children || []">
                <div :key="index2" class="fn-inline title-level2-box-li" :class="hasLavelc(item2) ? 'w100' : ''">
                  <div class="title-level2-box">
                    <vxe-tooltip :content="item2.name" theme="dark">
                      <label class="fn-inline title-level2-text olh" @click="onSysMenuClick(item2,2)">{{ item2.name }}</label>
                    </vxe-tooltip>
                    <div v-if="!hasLavelc(item2)" class="fn-inline title-level2-btn-group">
                      <div v-if="item2.statusInfo && item2.statusInfo.todoCount" class="title-level2-btn title-level2-todo fn-inline">
                        <label class="fn-inline title-level2-label" @click="onSysMenuClick(item2,2,'todo')">代办</label>
                        <em class="fn-inline">{{ item2.statusInfo.todoCount + '个' }}</em>
                      </div>
                      <div v-if="item2.statusInfo && item2.statusInfo.toauditCount" class="title-level2-btn title-level2-todo fn-inline">
                        <label class="fn-inline title-level2-label" @click="onSysMenuClick(item2,2,'toaudit')">被退回</label>
                        <em class="fn-inline">{{ item2.statusInfo.toauditCount + '个' }}</em>
                      </div>
                    </div>
                  </div>
                  <div v-if="hasLavelc(item2)" class="title-level3-list">
                    <template v-for="(item3,index3) in item2.children || []">
                      <div :key="index3" class="title-level3-list-li fn-inline">
                        <div class="title-level3-box">
                          <vxe-tooltip :content="item2.name" theme="dark">
                            <label class="fn-inline title-level2-text olh" @click="onSysMenuClick(item3,3)">{{ item3.name }}</label>
                          </vxe-tooltip>
                          <div class="fn-inline title-level2-btn-group">
                            <div v-if="item3.statusInfo && item3.statusInfo.todoCount" class="title-level2-btn title-level2-todo fn-inline">
                              <label class="fn-inline title-level2-label" @click="onSysMenuClick(item3,3,'todo')">代办</label>
                              <em class="fn-inline">{{ item3.statusInfo.todoCount + '个' }}</em>
                            </div>
                            <div v-if="item3.statusInfo && item3.statusInfo.toauditCount" class="title-level2-btn title-level2-todo fn-inline">
                              <label class="fn-inline title-level2-label" @click="onSysMenuClick(item3,3,'toaudit')">被退回</label>
                              <em class="fn-inline">{{ item3.statusInfo.toauditCount + '个' }}</em>
                            </div>
                          </div>
                        </div>
                      </div>

                    </template>
                  </div>
                </div>
              </template>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="nh4-logininfo">
      <!-- <div class="nh4-logininfo-line">
        <div class="nh4-sys-time">
          <i class="fn-inline nh4-sys-time-ico"></i>
          <span class="fn-inline nh4-sys-time-text">{{ curTime }}</span>
        </div>
      </div> -->
      <ul class="nh4-logininfo-lable">
        <li class="fn-inline">

          <div class="nh4-syslabel pointer" :class="'nh4-syslabel3'">
            <div class="icobg fn-inline">
              <i class="nh4-syslabel-ico fn-inline">当前时间:</i>
            </div>
            <span class="fn-inline nh4-syslabel-label"></span>
            <span class="fn-inline nh4-syslabel-num">{{ curTime }}</span>
          </div>
        </li>
        <li class="fn-inline">
          <div class="nh4-syslabel pointer" :class="'nh4-syslabel1'">
            <div class="icobg fn-inline">
              <i class="nh4-syslabel-ico fn-inline"></i>
            </div>
            <span class="fn-inline nh4-syslabel-label">系统注册人数</span>
            <span class="fn-inline nh4-syslabel-num">{{ +usersInfoObj.registUsersTotal + '人' }}</span>
          </div>
        </li>
        <li class="fn-inline">
          <div class="nh4-syslabel pointer" :class="'nh4-syslabel2'">
            <div class="icobg fn-inline">
              <i class="nh4-syslabel-ico fn-inline"></i>
            </div>
            <span class="fn-inline nh4-syslabel-label">系统登录人数</span>
            <span class="fn-inline nh4-syslabel-num">{{ usersInfoObj.loginUsersTotal + '人' }}</span>
          </div>
        </li>
      </ul>
      <div class="nh4-logininfo-chart">
        <div class="nh4-logininfo-chartleft fn-inline">
          <div class="chart-title">
            <i class="fn-inline chart-title-ico"></i>
            <span class="fn-inline chart-title-text">系统注册人数</span>
          </div>
          <div class="chart">
            <v-chart ref="chart1" autoresize :options="chartOption1" />
          </div>
        </div>
        <div class="nh4-logininfo-chartright fn-inline">
          <div class="chart-title">
            <i class="fn-inline chart-title-ico"></i>
            <span class="fn-inline chart-title-text">系统登陆人数区域统计</span>
          </div>
          <div class="chart">
            <div class="chart-sbj-users">
              <div class="chart-sbj-users-line">
                <label class="fn-inline">陕西省本级注册人数:</label>
                <em class="fn-inline">{{ usersInfoObj.provincialGovRegistUsersTotal + '人' }}</em>
              </div>
              <div class="chart-sbj-users-line">
                <label class="fn-inline">陕西省本级登录人数</label>
                <em class="fn-inline">{{ usersInfoObj.provincialGovLoginUsersTotal + '人' }}</em>
              </div>
            </div>
            <v-chart ref="chart1" autoresize :options="chartOption2" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  components: {},
  data() {
    return {
      curTime: this.getNowDateStr(),
      sysMenuDataTest: [
        {
          name: '预算管理预算管理预算管理预算管理预算管理',
          children: [
            {
              name: '预算管理',
              children: [
                {
                  name: '预算管理'
                },
                {
                  name: '预算管理'
                },
                {
                  name: '预算管理'
                },
                {
                  name: '预算管理'
                }
              ]
            },
            {
              name: '预算管理',
              children: [
                {
                  name: '预算管理',
                  children: [
                    {
                      name: '预算管理',
                      statusInfo: {
                        todoCode: '1',
                        todoCount: 1111,
                        toauditCode: '4',
                        toauditCount: 2222
                      }
                    },
                    {
                      name: '预算管理'
                    }
                  ]
                },
                {
                  name: '预算管理'
                }
              ]
            },
            {
              name: '预算管理'
            }
          ]
        },
        {
          name: '预算管理1'
        },
        {
          name: '预算管理2'
        },
        {
          name: '预算管理3'
        },
        {
          name: '预算管理4'
        },
        {
          name: '预算管理5'
        },
        {
          name: '预算管理6'
        }
      ],
      selectLevelSysMenu: {},
      usersInfoObj: {
        provincialGovRegistUsersTotal: 11111,
        provincialGovLoginUsersTotal: 111111,
        registUsersTotal: 11111,
        loginUsersTotal: 10000,
        registUsersList: [
          { name: '西安市', value: 110 },
          { name: '榆林市', value: 230 },
          { name: '延安市', value: 30 },
          { name: '铜川市', value: 80 },
          { name: '咸阳市', value: 60 },
          { name: '渭南市', value: 50 },
          { name: '宝鸡市', value: 40 },
          { name: '商洛市', value: 70 },
          { name: '安康市', value: 70 },
          { name: '庆阳市', value: 50 },
          { name: '汉中市', value: 90 }
        ],
        loginUsersList: [
          { name: '西安市', value: 11 },
          { name: '榆林市', value: 23 },
          { name: '延安市', value: 3 },
          { name: '铜川市', value: 8 },
          { name: '咸阳市', value: 6 },
          { name: '渭南市', value: 5 },
          { name: '宝鸡市', value: 4 },
          { name: '商洛市', value: 7 },
          { name: '安康市', value: 7 },
          { name: '庆阳市', value: 5 },
          { name: '汉中市', value: 9 }
        ]
      },
      chartOption1: {
        legend: {
          orient: 'vertical',
          left: 20,
          top: 20,
          bottom: 20
        },
        color: ['#5662fe', '#f36612', '#f2b42d', '#fc8511', '#6896ff', '#fd628a', '#ffe063', '#56d2fe', '#54e2bf', '#e66fff', '#f07878', '#0c43c1', '#7b71ff', '#a4dad3', '#d8bcff'],
        toolbox: {
          show: false,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        label: {
          alignTo: 'edge',
          formatter: '{name|{b}}\n{value|{c}}',
          minMargin: 5,
          edgeDistance: 10,
          lineHeight: 15,
          rich: {
            time: {
              fontSize: 10,
              color: '#999'
            }
          }
        },
        series: [
          {
            name: '',
            type: 'pie',
            radius: [30, 200],
            center: ['55%', '50%'],
            roseType: 'area',
            itemStyle: {
              borderRadius: 8
            },
            data: [
              { name: '西安市', value: 110 },
              { name: '榆林市', value: 230 },
              { name: '延安市', value: 30 },
              { name: '铜川市', value: 80 },
              { name: '咸阳市', value: 60 },
              { name: '渭南市', value: 50 },
              { name: '宝鸡市', value: 40 },
              { name: '商洛市', value: 70 },
              { name: '安康市', value: 70 },
              { name: '庆阳市', value: 50 },
              { name: '汉中市', value: 90 }
            ]
          }
        ]
      },
      chartOption2: {
        roam: false,
        title: {
          text: '',
          subtext: '',
          left: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a0}:\n{b0}\n({c0})'
        },
        legend: {
          orient: 'vertical',
          right: 20,
          top: 20,
          bottom: 20,
          data: ['已登录', '已注册']
        },
        label: {
          formatter: '{c}',
          color: '#fff'
        },
        grid: {
          left: '5%',
          right: '5%',
          bottom: '10%',
          top: '10%',
          containLabel: true
        },
        series: [
          {
            name: '已登录',
            type: 'map',
            map: 'shanxi',
            mapType: 'shanxi',
            zoom: 1,
            label: {
              show: true,
              formatter: '{c}',
              color: '#fff'
            },
            itemStyle: {
              normal: {
                areaColor: '#2d8cf0',
                color: '#00ffae',
                label: {
                  show: true,
                  textStyle: {
                    color: '#fff',
                    fontSize: this.font
                  }
                }
              },
              emphasis: {
                areaColor: '#4ad2ff',
                label: {
                  show: true,
                  textStyle: {
                    color: '#fff',
                    fontSize: this.font
                  }
                }
              }
            },
            data: [
              { name: '西安市', value: 110 },
              { name: '榆林市', value: 230 },
              { name: '延安市', value: 30 },
              { name: '铜川市', value: 80 },
              { name: '咸阳市', value: 60 },
              { name: '渭南市', value: 50 },
              { name: '宝鸡市', value: 40 },
              { name: '商洛市', value: 70 },
              { name: '安康市', value: 70 },
              { name: '庆阳市', value: 50 },
              { name: '汉中市', value: 90 }
            ]
          },
          {
            name: '已注册',
            type: 'map',
            map: 'shanxi',
            mapType: 'shanxi',
            label: {
              show: true,
              formatter: '{c}',
              color: '#fff'
            },
            itemStyle: {
              normal: {
                areaColor: '#2d8cf0',
                color: '#00abff',
                label: {
                  show: true,
                  textStyle: {
                    color: '#fff',
                    fontSize: this.font
                  }
                }
              },
              emphasis: {
                areaColor: '#4ad2ff',
                label: {
                  show: true,
                  textStyle: {
                    color: '#fff',
                    fontSize: this.font
                  }
                }
              }
            },
            data: [
              { name: '西安市', value: 11 },
              { name: '榆林市', value: 23 },
              { name: '延安市', value: 3 },
              { name: '铜川市', value: 8 },
              { name: '咸阳市', value: 6 },
              { name: '渭南市', value: 5 },
              { name: '宝鸡市', value: 4 },
              { name: '商洛市', value: 7 },
              { name: '安康市', value: 7 },
              { name: '庆阳市', value: 5 },
              { name: '汉中市', value: 9 }
            ]
          }
        ]
      }
    }
  },
  computed: {
    sysMenuData() {
      return this.$store.state.systemMenu
    }
  },
  methods: {
    formatDate(date, format) {
      // new Date( year, month, date, hrs, min, sec)
      // new Date()       //参数可以为整数  也可以为字符串  但格式必须正确  example: new Date(2009,1,1)        //正确  new Date("2009/1/1")     //正确
      // example  new Date().format( "当前日期为：YYYY-MM-DD，星期W，为第Q季度，时间为：hh:mm:ss:c")
      let o = {
        'Y+': date.getFullYear() + '',
        'M+': date.getMonth() + 1, // month  MM
        'D+': date.getDate(), // day  DD
        'h+': date.getHours(), // hour  hh
        'm+': date.getMinutes(), // minute mm
        's+': date.getSeconds(), // second ss
        'Q+': Math.floor((date.getMonth() + 3) / 3), // quarter 季度 q
        'c+': date.getMilliseconds(), // millisecond 毫秒 c
        'W': ['一', '二', '三', '四', '五', '六', '日'][date.getDay() - 1] // week 星期
      }
      for (let k in o) {
        if (new RegExp('(' + k + ')').test(format)) {
          format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr((('' + o[k]).length >= 2 ? 2 : ('' + o[k]).length)))
        }
      }
      return format
    },
    hasLavelc(item2) {
      return Array.isArray(item2.children) && item2.children.length
    },
    getNowDateStr() { /* 获取现在的日期及时间 返回yyyy-MM-dd hh:mm:ss */
      var date = new Date()
      return date.format('YYYY-MM-DD hh:mm:ss')
    },
    initSysMenuData() {
      this.sysMenuData = this.$store.state.systemMenu
    },
    onSysMenuClick(obj, levelIndex, type) {
      let curClickNavObj = null
      if (levelIndex === 0) {
        this.selectLevelSysMenu = obj
      } else if (levelIndex === 1) {
        if (Array.isArray(obj.children) && !obj.children.length) {
          curClickNavObj = Object.assign({}, obj)
        }
      } else if (levelIndex === 2) {
        if (type === 'todo') {
          curClickNavObj = Object.assign({}, obj, { statusInfo: {
            code: '1',
            label: '代办'
          } })
        } else if (type === 'toaudit') {
          curClickNavObj = Object.assign({}, obj, { statusInfo: {
            code: '4',
            label: '被退回'
          } })
        } else {
          curClickNavObj = Object.assign({}, obj)
        }
      }
      this.$store.commit('setCurMenuObj', curClickNavObj)
    },
    setSysUsersInfoData(res) {
      res = {
        rescode: 100000,
        'city': ['陕西省本级', '西安市', '铜川市', '宝鸡市', '咸阳市', '渭南市', '延安市', '汉中市', '榆林市', '安康市', '西咸新区'],
        'totalnumber': [11000, 4500, 8800, 3300, 9200, 2100, 5510, 4820, 6610, 5320, 5510],
        'loginnumber': [2150, 1288, 1005, 1345, 2151, 1145, 1188, 1115, 1115, 1151, 1145]

      }
      let usersInfoObj = {
        loginUsersTotal: 0,
        registUsersTotal: 0,
        registUsersList: [],
        loginUsersList: []
      }
      const { city, totalnumber, loginnumber } = res
      city.forEach((item, index) => {
        if (index === 0) {
          usersInfoObj.provincialGovLoginUsersTotal = loginnumber[index]
          usersInfoObj.provincialGovRegistUsersTotal = totalnumber[index]
        }
        usersInfoObj.loginUsersTotal += loginnumber[index]
        usersInfoObj.registUsersTotal += totalnumber[index]
        usersInfoObj.registUsersList.push({
          name: city[index],
          value: totalnumber[index]
        })
        usersInfoObj.loginUsersList.push({
          name: city[index],
          value: loginnumber[index]
        })
      })
      this.usersInfoObj = usersInfoObj
    },
    renderChart(data) {
      const { registUsersList, loginUsersList } = data
      this.chartOption1 = {
        legend: {
          orient: 'vertical',
          left: 20,
          top: 20,
          bottom: 20
        },
        color: ['#5662fe', '#f36612', '#f2b42d', '#fc8511', '#6896ff', '#fd628a', '#ffe063', '#56d2fe', '#54e2bf', '#e66fff', '#f07878', '#0c43c1', '#7b71ff', '#a4dad3', '#d8bcff'],
        toolbox: {
          show: false,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        label: {
          alignTo: 'edge',
          formatter: '{name|{b}}\n{value|{c}}',
          minMargin: 5,
          edgeDistance: 10,
          lineHeight: 15,
          rich: {
            time: {
              fontSize: 10,
              color: '#999'
            }
          }
        },
        series: [
          {
            name: '',
            type: 'pie',
            radius: [30, 200],
            center: ['55%', '50%'],
            roseType: 'area',
            itemStyle: {
              borderRadius: 8
            },
            data: registUsersList
          }
        ]
      }
      this.chartOption2 = {
        roam: false,
        title: {
          text: '',
          subtext: '',
          left: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a0}:\n{b0}\n({c0})'
        },
        legend: {
          orient: 'vertical',
          right: 20,
          top: 20,
          bottom: 20,
          data: ['已登录', '已注册']
        },
        grid: {
          left: '5%',
          right: '5%',
          bottom: '10%',
          top: '10%',
          containLabel: true
        },
        series: [
          {
            name: '已登录',
            type: 'map',
            map: 'shanxi',
            mapType: 'shanxi',
            zoom: 1,
            label: {
              show: true,
              formatter: '{c}',
              color: '#fff'
            },
            itemStyle: {
              normal: {
                areaColor: '#2d8cf0',
                color: '#00ffae',
                label: {
                  show: true,
                  textStyle: {
                    color: '#fff',
                    fontSize: this.font
                  }
                }
              },
              emphasis: {
                areaColor: '#4ad2ff',
                label: {
                  show: true,
                  textStyle: {
                    color: '#fff',
                    fontSize: this.font
                  }
                }
              }
            },
            data: loginUsersList
          },
          {
            name: '已注册',
            type: 'map',
            map: 'shanxi',
            mapType: 'shanxi',
            label: {
              show: true,
              formatter: '{c}',
              color: '#fff'
            },
            itemStyle: {
              normal: {
                areaColor: '#2d8cf0',
                color: '#00abff',
                label: {
                  show: true,
                  textStyle: {
                    color: '#fff',
                    fontSize: this.font
                  }
                }
              },
              emphasis: {
                areaColor: '#4ad2ff',
                label: {
                  show: true,
                  textStyle: {
                    color: '#fff',
                    fontSize: this.font
                  }
                }
              }
            },
            data: registUsersList
          }
        ]
      }
      this.$refs.chart1.refresh()
      this.$refs.chart2.refresh()
    },
    initSysUsersInfoData() {
      this.$http.get('mp-b-user-service/v1/users/tolonline').then(res => {
        if (res.rescode === 100000) {
          this.setChartData(res)
        }
      })
    }
  },
  mounted() {
    // this.initSysMenuData()
    // let self = this
    this.initSysUsersInfoData()
    window.setInterval(() => {
      this.initSysUsersInfoData()
    }, 15000)
    window.setInterval(() => {
      this.curTime = this.getNowDateStr()
    }, 1000)
    // window.onresize = function() {
    //   self.$refs.chart1.resize()
    //   self.$refs.chart2.resize()
    // }
  },
  watch: {
    tem: {
      handler() {},
      deep: true,
      immediate: true
    }
  }
}
</script>

<style lang='scss'>
 .new-home-414{
  font-size:0;
  padding:10px;
  .nh4-sysnav{
    border: solid 1px #e8f0f9;
  }
  .nh4-sysnav-level0{
    li{
      width:20%;
      .nh4-syslabel{
        margin:10px 10px;
        padding: 20px 15px;
        .icobg{
          margin:10px 0px;
          height:50px;
          width:50px;
          border-radius:25px;
          line-height:50px;
          text-align:center;
          background: rgba(255,255,255,0.35);
        }
        i{
          height:20px;
          width:20px;
        }
        span{
          max-width:calc(100% - 70px);
          margin-left:20px;
          line-height:25px;
          color:#fff;
          font-size: 20px;
        }
      }
      .nh4-syslabel1{
        background:url(./assets/img/sys-ico1.png);
        background-size:100% 100%;
        .nh4-syslabel-ico{
          background:url(./assets/img/sys-icoi1.png);
          background-size:100% 100%;
        }
      }
      .nh4-syslabel2{
        background:url(./assets/img/sys-ico2.png);
        background-size:100% 100%;
        .nh4-syslabel-ico{
          background:url(./assets/img/sys-icoi2.png);
          background-size:100% 100%;
        }
      }
      .nh4-syslabel3{
        background:url(./assets/img/sys-ico3.png);
        background-size:100% 100%;
        .nh4-syslabel-ico{
          background:url(./assets/img/sys-icoi3.png);
          background-size:100% 100%;
        }
      }
      .nh4-syslabel4{
        background:url(./assets/img/sys-ico4.png);
        background-size:100% 100%;
        .nh4-syslabel-ico{
          background:url(./assets/img/sys-icoi4.png);
          background-size:100% 100%;
        }
      }
      .nh4-syslabel5{
        background:url(./assets/img/sys-ico5.png);
        background-size:100% 100%;
        .nh4-syslabel-ico{
          background:url(./assets/img/sys-icoi5.png);
          background-size:100% 100%;
        }
      }
      .nh4-syslabel6{
        background:url(./assets/img/sys-ico6.png);
        background-size:100% 100%;
        .nh4-syslabel-ico{
          background:url(./assets/img/sys-icoi6.png);
          background-size:100% 100%;
        }
      }
      .nh4-syslabel7{
        background:url(./assets/img/sys-ico7.png);
        background-size:100% 100%;
        .nh4-syslabel-ico{
          background:url(./assets/img/sys-icoi7.png);
          background-size:100% 100%;
        }
      }
      .nh4-syslabel8{
        background:url(./assets/img/sys-ico8.png);
        background-size:100% 100%;
        .nh4-syslabel-ico{
          background:url(./assets/img/sys-icoi8.png);
          background-size:100% 100%;
        }
      }
    }
    li:hover{
      .nh4-syslabel{
        transform: scale(1.05);
        box-shadow: 0 0 10px #515152;
      }
    }
    li.active{
      .nh4-syslabel{
        transform: scale(1.05);
        box-shadow: 0 0 10px #515152;
      }
    }
  }
  .nh4-sysnav-son{
    margin: 10px 10px 10px 10px;
    background: #ffffff;
    border-radius: 2px;
    text-align: left;
    border-radius: 20px;
    padding: 5px 0;
    li{
      padding: 5px 10px;
    }
    .title-level1{
      width:150px;
      display:inline-block;
      vertical-align:top;
      font-size: 14px;
      line-height:30px;
      color:#333;
      font-weight: 800;
      cursor:pointer;
      margin: 5px 0px;
    }
    .title-level2-btn-group{
      line-height:30px;
    }
    .title-level2-parent{
      font-size: 14px;
      line-height:30px;
      color:#333;
      font-weight: 400;
      cursor:pointer;
      margin: 0 10px 10px 10px;
    }
    .title-level2{
      width:calc(100% - 150px);
      display:inline-block;
      vertical-align:top;
      .title-level2-box-li{
        width:33.33%;
        margin: 5px 0px;
      }
      .title-level2-box{
        line-height: 30px;
        color: #333;
        display: flex;
        padding: 0 10px;
        margin: 0 10px;
        background:#fcfeff;
        border:solid 1px #eee;
      }
      .title-level2-text{
        cursor:pointer;
        flex:1;
        color:var(--primary-color);
        font-size: 14px;
      }
      .title-level3-box:hover .title-level2-text,
      .title-level2-box:hover .title-level2-text{
        text-decoration: underline;
      }
      .title-level2-box-li.w100{
        width:100%;
        .title-level2-box{
          background:transparent;
          border:solid 0px #eee;
        }
         .title-level2-box:hover {
           cursor:none;
           .title-level2-text{
            text-decoration: none;
           }
         }
      }
      .title-level3-list-li{
        width:33.33%;
        margin: 5px 0px;
      }

      .title-level3-box{
        line-height: 30px;
        color: #333;
        display: flex;
        padding: 0 10px;
        margin: 0 10px;
        background:#f8f8f8;
        border:solid 1px #eee;
        .title-level2-text{
          color: var(--menu-item-color);
          font-size: 14px;
        }
      }
      .title-level2-btn{
        height: 20px;
        line-height: 20px;
        border: solid 1px #b3d8ff;
        background: #ecf5ff;
        margin: 0 5px;
        padding: 0 5px;
        border-radius: 3px;
        text-align: center;
        cursor:pointer;
        .title-level2-label{
         color: var(--primary-color);
         font-size: 14px;
        }
        em {
           font-size: 14px;
           color: #FFA522;
           margin-left: 5px;
        }
      }
      .title-level2-btn:hover{
        border: solid 1px #b3d8ff;
        background: #cce1f7;
      }

    }
  }
  .nh4-logininfo{
    margin-top:10px;
    padding:10px 0;
    background: #eaf4ff;
    border: solid 1px #e8f0f9;
  }
  .nh4-logininfo-line{
     padding: 0 10px 10px 10px;
     .nh4-sys-time{
        height: 32px;
        width: 200px;
        line-height: 32px;
        text-align: center;
        background: #fff;
        border: solid 1px #eeee;
       .nh4-sys-time-ico{
         height:20px;
         width:20px;
         background:url(./assets/img/date-ico.png);
         background-size:100% 100%;
       }
       .nh4-sys-time-text{
         margin-left:15px;
         color:#333;
        font-size:12px;
       }
     }
  }
  .nh4-logininfo-lable{
    li{
      width:33.33%;
      .nh4-syslabel{
        margin:10px 10px;
        padding: 20px 15px;
        display:flex;
        .icobg{
          height:50px;
          width:50px;
        }
        i{
          height:50px;
          width:50px;
        }
        .nh4-syslabel-label{
           flex:1;
        }
        span{
          margin-left:20px;
          line-height:50px;
          color:#fff;
          font-size: 18px;
        }
      }
      .nh4-syslabel1{
        background:url(./assets/img/sys-label1.png);
        background-size:100% 100%;
        .nh4-syslabel-ico{
          background:url(./assets/img/tb-ico.png);
          background-size:100% 100%;
        }
      }
      .nh4-syslabel2{
        background:url(./assets/img/sys-label2.png);
        background-size:100% 100%;
        .nh4-syslabel-ico{
          background:url(./assets/img/sntq-ico.png);
          background-size:100% 100%;
        }
      }
      .nh4-syslabel3{
        background:url(./assets/img/sys-label3.png);
        background-size:100% 100%;
        .icobg{
          width:auto;
        }
        .nh4-syslabel-ico{
          line-height:50px;
          width:auto;
          color:#fff;
          font-size: 18px;
        }
      }
    }
  }
  .nh4-logininfo-chart{
    margin-top:10px;
    .chart-title{
        height: 40px;
        margin: 0 10px -1px 10px;
        line-height: 40px;
        text-align: left;
        padding: 0 10px;
        background: #fff;
        border: solid 1px #eeee;
       .chart-title-ico{
         height:20px;
         width:20px;
         background:url(./assets/img/titleico.png);
         background-size:100% 100%;
       }
       .chart-title-text{
         margin-left:15px;
         color:#333;
        font-size:14px;
       }
    }
    .nh4-logininfo-chartleft{
      width:50%;
    }
    .nh4-logininfo-chartright{
      width:50%;
    }
    .chart{
      margin:0 10px;
      height:500px;
      background: #fff;
      border: solid 1px #e8f0f9;
      position:relative;
      .chart-sbj-users{
        line-height: 30px;
        position: absolute;
        top: 20px;
        left: 30px;
        background: #fff;
        padding: 10px;
        box-shadow: 0 0 6px 0px #94c1f1;
        label{
            color: var(--primary-color);
            font-size: 14px;
        }
        em {
            font-size: 14px;
            color: #FFA522;
            margin-left: 5px;
        }
      }
      .echarts{
       height:100%;
       width:100%;
      }
    }
  }
 }
</style>
