<!--    Author:Titans@2396757591@qq.com -->
<template>
  <div>
    <div class="option-line-group">
      <div class="fn-inline option-line-group-btn">
        <vxe-button v-preventClick="6000" status="primary" @click="onSureClick">确 定</vxe-button>
        <vxe-button code="reset" @click="dialogVisible = false">取 消</vxe-button>
      </div>
    </div>
    <BsPerformanceBasicInfo ref="performanceBasicInfo" />
    <BsPerformanceTable ref="performanceTable" />
  </div>
</template>

<script>
export default {
  name: 'PerformanceTable',
  components: {},
  props: {},
  data() {
    return {
      tem: ''
    }
  },
  methods: {
    onSureClick() {
      this.$refs.performanceBasicInfo.validate().then((res) => {
        console.log(res)
      }).catch((errMap) => {
        console.log(errMap)
      })
    }
  },
  crated() {},
  mounted() {},
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
</style>
