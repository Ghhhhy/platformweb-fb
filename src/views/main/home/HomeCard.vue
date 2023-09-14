<!-- 卡片菜单 -->
<template>
  <div class="card-menu">
    <CardMenu />
    <!--直达资金支出进度排名-->
    <ExpenditureProgressRankingModal
      v-if="visible"
      v-model="visible"
    />
    <!--财政上报确认提醒-->
    <EscalationModal
      v-if="visibles"
      v-model="visibles"
    />
  </div>
</template>

<script>
import MenuModule from '@/api/frame/common/menu.js'
import ExpenditureProgressRankingModal from './ExpenditureProgressRankingModal'
import EscalationModal from './EscalationModal'
import api from '@/api/frame/main/fundMonitoring/escalation'
import { checkRscode } from '@/utils/checkRscode'
// 直达资金应用code
const dfrCode = 'DFR'
export default {
  name: 'HomeCard',
  components: { ExpenditureProgressRankingModal, EscalationModal },
  props: {

  },
  computed: {
    visible: {
      get() {
        return this.$store.state.rankingModalVisible &&
          this.$store.state.userInfo?.app?.code?.toUpperCase() === dfrCode
      },
      set(val) {
        this.$store.commit('setRankingModalVisible', val)
      }
    },
    visibles: {
      get() {
        return this.$store.state.escalationModalVisible &&
          this.$store.state.userInfo?.app?.code?.toUpperCase() === dfrCode
      },
      set(val) {
        this.$store.commit('setEscalationModalVisible', val)
      }
    }
  },
  data() {
    return {
    }
  },
  methods: {
    async initEscalationVisible () {
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
    this.getMenus()
    console.log('this.$store.state', this.$store.state)
  },
  async mounted() {
    // this.initEscalationVisible()
  }
}
</script>

<style scoped lang="scss">
  .card-menu{
    height: 100%;
    overflow-y: auto;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    // background-image: url('../../../assets/img/indeximg/homebg.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }
</style>
