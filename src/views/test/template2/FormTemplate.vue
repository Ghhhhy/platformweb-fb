<template>
  <div class="main-modulebox">
    <BsTab :tab-list="tabList" tab-class="main-modulebox-tab" :default-select="TabSelect" @onTabClick="onTabClick" />
    <div class="main-modulebox-con main-modulebox-tabcon">
      <keep-alive :include="keepAliveInclude">
        <component :is="curTabComponent" :all-prop-data="allPropData" />
      </keep-alive>
    </div>
  </div>
</template>
<script>
import BasicInfo from './children/basicInfo/Form'
import MultiLine from './children/demol/addMultiline/table'
import RouterTable from './children/demol/routerForm/table'
import RouterForm from './children/demol/routerForm/add'
export default {
  name: 'Template',
  components: {
    BasicInfo,
    MultiLine,
    RouterTable,
    RouterForm
  },
  data() {
    return {
      keepAliveInclude: ['BasicInfo', 'MultiLine', 'RouterTable'],
      curTabComponent: 'RouterTable',
      tabList: [
        {
          label: '工具条demol',
          code: 'toolbar',
          component: 'BasicInfo'
        },
        {
          label: '添加多行demol',
          code: 'multi',
          component: 'MultiLine'
        },
        {
          label: 'router跳转到from',
          code: 'routerTofrom',
          component: 'RouterTable'
        },
        {
          label: '收支总表04',
          code: 'szzb'
        },
        {
          label: '汇总提交5',
          code: 'hztj'
        },
        {
          label: '指出预算22',
          code: 'szys'
        },
        {
          label: '收入预算23',
          code: 'srys'
        },
        {
          label: '收支总表24',
          code: 'szzb'
        },
        {
          label: '汇总提交25',
          code: 'hztj'
        },
        {
          label: '指出预算23',
          code: 'szys'
        },
        {
          label: '收入预算24',
          code: 'srys'
        },
        {
          label: '收支总表25',
          code: 'szzb'
        },
        {
          label: '汇总提交26',
          code: 'hztj'
        },
        {
          label: '基础信息32',
          code: 'toolbar',
          component: 'BasicInfo'
        },
        {
          label: '指出预算33',
          code: 'szys'
        },
        {
          label: '收入预算34',
          code: 'srys'
        },
        {
          label: '收支总表35',
          code: 'szzb'
        },
        {
          label: '汇总提交36',
          code: 'hztj'
        }
      ],
      TabSelect: {
        label: '添加多行demol',
        code: 'multi',
        component: 'MultiLine'
      },
      allPropData: {
        data: []
      }
    }
  },
  computed: {
    curNavModule() { // 获取当前菜单信息
      return this.$store.state.curNavModule
    },
    userInfo() { // 获取用户信息
      return this.$store.state.userInfo
    }
  },
  methods: {
    onTabClick(obj) {
      this.TabSelect = obj
      this.allPropData = {
        time: new Date().format('当前日期为：YYYY-MM-DD，星期W，为第Q季度，时间为：hh:mm:ss:c'),
        curTabData: obj
      }
      this.curTabComponent = obj.component ? obj.component : this.curTabComponent
    }
  }
}
</script>

<style lang="scss">

</style>
