<!--监控规则函数管理新增页面弹框-->
<template>
  <vxe-modal
    v-model="dialogVisible"
    :title="title"
    width="50%"
    height="40%"
    :show-footer="true"
    @close="dialogClose"
  >
    <div v-loading="addLoading" class="payVoucherInput">
      {{ sql }}
    </div>
    <div slot="footer" style="height: 80px;margin:0 15px">
      <div v-if="showbox" id="bigbox"></div>
      <el-divider style="color:#E7EBF0" />
      <div type="flex" justify="space-around">
        <div>
          <vxe-button @click="dialogClose">取消</vxe-button>
          <vxe-button id="savebutton" status="primary" @click="doInsert">校验</vxe-button>
        </div>
      </div>
    </div>
  </vxe-modal>
</template>
<script>
import HttpModule from '@/api/frame/main/Monitoring/Monitoring.js'
export default {
  name: 'AddDialog',
  components: {},
  computed: {
    curNavModule() {
      return this.$store.state.curNavModule
    }
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    functionCode: {
      type: String,
      default: ''
    },
    businessModuleCode: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      dialogVisible: true,
      sql: ''
    }
  },
  methods: {
    dialogClose() {
      this.$parent.previewDialogVisible = false
      this.$parent.queryTableDatas()
    },
    getSql() {
      const params = {
        functionCode: this.functionCode
      }
      HttpModule.getSql(params).then(res => {
        if (res.code === '000000') {
          this.sql = res.data
        } else {
          this.$message.error(res.message)
        }
      })
    },
    doInsert() {
      const params = {
        sql: this.sql,
        functionCode: this.functionCode,
        businessModuleCode: this.businessModuleCode
      }
      HttpModule.checkSql(params).then(res => {
        if (res.code === '000000') {
          this.$message.success('校验成功')
          this.dialogClose()
        } else {
          this.$message.error(res.message)
        }
      })
    }
  },
  watch: {
  },
  created() {
    this.getSql()
  }
}
</script>
<style lang="scss">
  .payVoucherInput {
    margin: 15px;
    .el-card {
      margin-top: 0
    }
  }
  .vxe-modal--wrapper .vxe-modal--box {
    z-index: 0;
  }
  #bigbox {
    width: 100%;
    height: 100%;
    background-color: white;
    z-index: 10;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: .3;
  }
  .el-row-item .font-set-small .hline{
    width:72px;
  }
</style>
