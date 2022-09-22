
<!--  Tab templeat   Author:Titans@2396757591@qq.com -->
<template>
  <div class="form-modulebox">
    <BsTab :tab-list="tabList" :default-select="defaultSelect" @onTabClick="onTabClick" />
    <div class="form-modulebox-combox">
      <component :is="curTabComponent" />
    </div>
  </div>
</template>

<script>
import vxe from './tab/vxe'
import testform from './tab/form'
export default {
  name: 'TabTable',
  components: {
    vxe,
    testform
  },
  data() {
    return {
      tabList: [
        { label: 'test-vxe', tabComponent: 'vxe' },
        { label: 'test-com', tabComponent: 'testform' }
      ],
      curTabComponent: 'form',
      defaultSelect: {
        label: 'test-com', tabComponent: 'testform'
      }
    }
  },
  methods: {
    onTabClick(obj) {
      this.curTabComponent = obj.tabComponent
    }
  },
  mounted() {}
}
</script>
<style lang='scss'>
</style>
