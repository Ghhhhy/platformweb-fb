<!-- 卡片菜单 -->
<template>
  <div v-loading="tableLoading" class="card-menu">
    <CardMenu />
    <!--直达资金支出进度排名-->
    <ExpenditureProgressRankingModal v-if="visible" v-model="visible" />
    <!--财政上报确认提醒-->
    <EscalationModal v-if="visibles" v-model="visibles" />
    <!-- 监控平台首页时推送监控预警信息 -->
    <div>
      <vxe-modal
        v-model="dialogVisible"
        title="保工资预警"
        style="z-index:101;"
        @close="dialogClose"
      >
        <MonitorWarningInformation ref="MonitorWarningInformation" />
      </vxe-modal>
    </div>
  </div>
</template>

<script>
import { post } from '@/api/http'
import ExpenditureProgressRankingModal from './ExpenditureProgressRankingModal'
import EscalationModal from './EscalationModal'
import MonitorWarningInformation from './MonitorWarningInformation/MonitorWarningInformation.vue'
import api from '@/api/frame/main/fundMonitoring/escalation'
import { checkRscode } from '@/utils/checkRscode'
// 直达资金应用code
const dfrCode = 'DFR'
const lmpCode = 'LMP'
export default {
  name: 'HomeCard',
  components: {
    ExpenditureProgressRankingModal,
    EscalationModal,
    MonitorWarningInformation
  },
  props: {},
  computed: {
    visible: {
      get() {
        return (
          this.$store.state.rankingModalVisible &&
          this.$store.state.userInfo?.app?.code?.toUpperCase() === dfrCode
        )
      },
      set(val) {
        this.$store.commit('setRankingModalVisible', val)
      }
    },
    visibles: {
      get() {
        return (
          this.$store.state.escalationModalVisible &&
          this.$store.state.userInfo?.app?.code?.toUpperCase() === dfrCode
        )
      },
      set(val) {
        this.$store.commit('setEscalationModalVisible', val)
      }
    },
    dialogVisible: {
      get() {
        return (this.$store.state.monitorWarningModalVisible && this.$store.state.userInfo?.app?.code?.toUpperCase() === lmpCode)
      },
      set(val) {
        this.$store.commit('setMonitorWarningModalVisible', val)
      }
    }
  },
  data() {
    return {
      tableLoading: false,
      monitorDetailData: []
    }
  },
  methods: {
    getSalaryNoticeData() {
      this.tableLoading = true
      post(BSURL.lmp_guaranteedSalaryNotice).then(res => {
        if (res.code === '000000') {
          this.dialogVisible = res.data.notifacationSwitch
          if (res.data.notifacationSwitch) {
            this.$nextTick(() => {
              this.$refs.MonitorWarningInformation.init(res.data.salaryVOS || [])
            })
          }
        }
        this.tableLoading = false
      }).catch(() => {
        this.tableLoading = false
      })
    },
    dialogClose() {
      this.dialogVisible = false
    },
    async initEscalationVisible() {
      let params = {
        confirmStatus: '0'
      }
      const { data } = checkRscode(await api.queryLogs(params))
      this.visibles = !!data.results?.length
    },
    findObjByKeyValue(arr, key, intoMenu) {
      function recursive(arr) {
        arr?.forEach(item => {
          if (item[key] === intoMenu) {
            findObj = item
          }
          item?.children?.length !== 0 && recursive(item.children)
        })
      }
      let findObj = null
      recursive(arr)
      return findObj
    }
  },
  created() {
    if (this.$store.state.systemMenu) {
      this.$store.dispatch('todoInfo/getMenuMapTodoInfo', this.$store.state.systemMenu || [])// 首页刷新需要重新请求代办信息
      let { intoMenu } = this.$store.state.loginAuthentication// 通过外部链接携带的跳转菜单信息 并且需要先有首页 再跳转
      if (intoMenu) {
        let findIntoMenu = this.findObjByKeyValue(this.$store.state.systemMenu, 'guid', intoMenu)
        this.$store.commit('deleteLoginAuthenticationIntoMenu')// 删除intoMenu 防止一直跳转
        if (findIntoMenu) { // 设置菜单信息 例如params5等
          this.$store.commit('setCurMenuObj', findIntoMenu)
        } else {
          this.$message.warning('未找到通过外部链接intoMenu的guid对应菜单！')
          this.$router.push({
            name: 'HomeCard'
          })
        }
      }
    }
    console.log('%c状态机', 'background: red;color:white;padding:2px;border-radius:2px;', this.$store.state)
    console.log('%c当前用户信息', 'background: green;color:white;padding:2px;border-radius:2px;', this.$store.state.userInfo)
    console.log('%c预警以及颜色字典', 'background: green;color:white;padding:2px;border-radius:2px;', this.$store.getters.dict)
  },
  async mounted() {
    // !this.$store.state.hasQueryMonitorWarningModalVisible && this.getSalaryNoticeData()
    // this.$store.commit('setHasQueryMonitorWarningModalVisible')
    // this.initEscalationVisible()
  }
}
</script>

<style scoped lang="scss">
.card-menu {
  height: 100%;
  overflow-y: auto;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  // background-image: url('../../../assets/img/indeximg/homebg.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
::v-deep .vxe-modal--box {
  width: 80%;
  height: 80%;
}
</style>
