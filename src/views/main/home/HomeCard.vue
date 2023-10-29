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
        @close="dialogClose"
      >
        <MonitorWarningInformation :data="monitorDetailData" />
      </vxe-modal>
    </div>
  </div>
</template>

<script>
import { post } from '@/api/http'
import MenuModule from '@/api/frame/common/menu.js'
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
        return (
          this.$store.state.monitorWarningModalVisible &&
          this.$store.state.userInfo?.app?.code?.toUpperCase() === lmpCode
        )
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
          this.monitorDetailData = res.data.salaryVOS
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
    getMenus() {
      MenuModule.getMenuInfo().then((res) => {
        if (Array.isArray(res)) {
          if (res.length) {
            this.$store.commit('setSystemMenu', res) // 将菜单存储到store
            // 根据菜单信息获取待办
            this.$store.dispatch('todoInfo/getMenuMapTodoInfo', res || [])
          }
        }
      })
    }
  },
  created() {
    this.getSalaryNoticeData()
    this.getMenus()
    console.log('this.$store.state', this.$store.state)
  },
  async mounted() {
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
