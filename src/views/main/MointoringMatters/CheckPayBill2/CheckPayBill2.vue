<template>
  <div>
    <ReportView
      v-if="ifRenderReport"
      ref="reportView"
      class="platfromreport"
      :codes="code"
      :editable="editable"
      :init-params="initParams"
      :init-business-context="initBusinessContext"
      :enable-row-readable-authority="true"
      @export-excel="exportExcel"
      @print-pdf="printPdf"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      code: ''
    }
  }
}
</script>

<style scoped>
</style>
