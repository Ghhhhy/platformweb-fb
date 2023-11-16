<!--处理弹框-->
<template>
  <div v-loading="tableLoading">
    <vxe-modal
      v-model="dialogVisible"
      :title="title"
      width="96%"
      height="90%"
      :show-footer="true"
      @close="dialogClose"
    >
      <monitProcFeedbackFormInstance ref="monitProcFeedbackFormInstance" :default-form-data="createDataList" />
      <div slot="footer" style="height: 80px;margin:0 15px">
        <el-divider style="color:#E7EBF0" />
        <div type="flex" justify="space-around">
          <div>
            <vxe-button status="primary" @click="doFeedback">确定</vxe-button>
            <vxe-button @click="dialogClose">取消</vxe-button>
          </div>
        </div>
      </div>
    </vxe-modal>
  </div>
</template>
<script>
import monitProcFeedbackFormInstance from '@/views/main/monitProcFeedback/monitProcFeedbackFormInstance.vue'
export default {
  name: 'HandleDialog',
  components: {
    monitProcFeedbackFormInstance
  },
  // eslint-disable-next-line
  props: ['createDataList'],
  data() {
    return {
      tableLoading: false,
      title: '监控处理单',
      dialogVisible: false
    }
  },
  methods: {
    dialogClose() {
      this.dialogVisible = false
      this.$emit('close')
    },
    doFeedback() {
      this.$refs.monitProcFeedbackFormInstance.doFeedback().then(res => {
        if (res.code === '000000') {
          this.dialogClose()
          this.$parent.queryTableDatas()
        } else {
          this.$message.error(res.message)
        }
      })
    }
  },
  watch: {

  },
  created() {

  },
  mounted() {

  },
  destoryed() {
  }
}
</script>
<style lang="scss" scoped>
 /deep/ .createRef{
  .vxe-form--item.vxe-col--24{
     .vxe-form--item-inner{
      align-items: flex-start !important;
    }
  }
  .vxe-textarea--inner[disabled]{
    background: var(--common-background) !important;
  }
}

</style>
