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
import BasicInfoNew from './children/basicInfoNew/Form'
import MultiLine from './children/addMultiline/table'
export default {
  name: 'Template',
  components: {
    BasicInfo,
    BasicInfoNew,
    MultiLine
  },
  data() {
    return {
      keepAliveInclude: ['BasicInfo', 'BasicInfoNew', 'MultiLine'],
      curTabComponent: 'BasicInfoNew',
      tabList: [
        {
          label: '新版模版',
          code: 'xbmb',
          component: 'BasicInfoNew'
        },
        {
          label: '添加多行demol',
          code: 'multi',
          component: 'MultiLine'
        },
        {
          label: '旧版模版',
          code: 'jbmb',
          component: 'BasicInfo'
        }
      ],
      TabSelect: {
        label: '基础信息01',
        code: 'jcxx',
        component: 'BasicInfo'
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
