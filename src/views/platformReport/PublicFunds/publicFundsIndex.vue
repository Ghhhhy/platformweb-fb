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
import PublicFunds from './publicFunds'
import PublicFundsAudit from './publicFundsAudit'
export default {
  components: {
    PublicFunds,
    PublicFundsAudit
  },
  data() {
    return {
      agencyStatus: this.$store.getters.getMenuParams5.agencyStatus,
      action: this.$store.getters.getMenuParams5.reportStatus !== '2' ? '录入' : '修改',
      tabList: (this.$store.getters.getMenuParams5.IssuedType === '2' && this.$store.getters.getMenuParams5.reportStatus === '6') ? [
        {
          label: '结转结余审核',
          code: 'jzjysh',
          component: 'PublicFundsAudit'
        },
        {
          label: '结转结余修改',
          code: 'jzjyxg',
          component: 'PublicFunds'
        }
      ] : [
        {
          label: (this.$store.getters.getMenuParams5.IssuedType === '1' ? '三公经费' : '结转结余') + (this.$store.getters.getMenuParams5.reportStatus === '2' ? '录入' : '修改'),
          code: 'sgjflr',
          component: 'PublicFunds'
        },
        {
          label: this.$store.getters.getMenuParams5.IssuedType === '1' ? '三公经费审核' : '结转结余审核',
          code: 'sgjfsh',
          component: 'PublicFundsAudit'
        }
      ],
      showDeptTree: true,
      tabSelect: {
        label: (this.$store.getters.getMenuParams5.IssuedType === '1' ? '三公经费' : '结转结余') + (this.$store.getters.getMenuParams5.reportStatus === '2' ? '录入' : '修改'),
        code: 'sgjflr',
        component: 'PublicFunds'
      },
      curTabComponent: 'PublicFunds', // 当前选中的tab组件
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
    // if (+this.agencyStatus > 2) {
    //   this.tabList.push({
    //     label: '人代会表审核',
    //     code: 'srdhbsh',
    //     component: 'PublicSearchAudit'
    //   })
    // }
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
