<template>
  <div style="height: 100%" class="PayoutTab">
    <BsTab
      :tab-list="tabList"
      tab-class="main-modulebox-tab"
      :can-clear="false"
      :default-select="tabSelect"
      @onTabClick="onTabClick"
    />
    <div style="height: calc(100% - 48px)">
      <keep-alive :include="keepAliveInclude">
        <component :is="curTabComponent" :ref="tabSelect.component" />
      </keep-alive>
    </div>
  </div>
</template>

<script>
import PublicSearch from './DataPublic/publicSearch.vue'
import PublicSearchAudit from './DataPublic/publicSearchAudit.vue'
import ReportEnter from '@/views/main/reportEnter/ReportEnter.vue'
export default {
  components: {
    PublicSearch,
    PublicSearchAudit,
    ReportEnter
  },
  data() {
    return {
      agencyStatus: this.$store.getters.getMenuParams5.agencyStatus,
      tabList: [
        {
          label: '人代会表录入',
          code: 'srdhblr',
          component: 'ReportEnter'
        },
        {
          label: '人代会表导出',
          code: 'srdhbcx',
          component: 'PublicSearch'
        }
      ],
      showDeptTree: true,
      tabSelect: {
        label: '人代会表录入',
        code: 'srdhblr',
        component: 'ReportEnter'
      },
      curTabComponent: 'ReportEnter', // 当前选中的tab组件
      keepAliveInclude: [
        // 'DepBudgetBasicInfo',
        // 'DepBudgetPayout',
        // 'DepBudgetIncome',
        // 'DepBudgetReport',
        // 'DepBudgetSummary'
      ] // 缓存配置
    }
  },
  computed: {
    allDisabled() {
      if (this.$store.state.curNavModule && !this.$store.state.curNavModule.data.isbudgetbegin) {
        return true
      }
      return false
    }
  },
  created() {
    if (+this.agencyStatus > 2) {
      this.tabList.push({
        label: '人代会表审核',
        code: 'srdhbsh',
        component: 'PublicSearchAudit'
      })
    }
  },
  methods: {
    onTabClick(obj) {
      this.tabSelect = obj
      this.curTabComponent = obj.component
        ? obj.component
        : this.curTabComponent
    }
  }
}
</script>
