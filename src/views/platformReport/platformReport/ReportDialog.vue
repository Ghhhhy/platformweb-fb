<template>
  <vxe-modal
    v-model="dialogVisible"
    :title="reportParams.paramsObj.title"
    width="90%"
    height="80%"
    :position="{ top: '10%', left: '5%' }"
    resize
    remember
    transfer
  >
    <div ref="box" class="height-all" style="padding-left: 0px">
      <DatavReportView :report-params="reportParams" />
    </div>
  </vxe-modal>
</template>

<script>

import DatavReportView from './index.vue'

export default {
  name: 'AddDialog',
  components: {
    DatavReportView
  },
  props: {
    reportParams: {
      type: Object,
      default: () => {
        return {}
      }
    },
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
    }
  },
  methods: {
  },
  created() {
  },
  mounted() {
    console.log(this.reportParams)
  },
  updated() {
  },
  watch: {
    dialogVisible: {
      handler(newval) {
        this.$emit('update:dialogVisible', newval)
      },
      deep: true,
      immediate: true
    }
  }
}
</script>

<style scoped>

</style>
