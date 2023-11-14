<!--处理弹框-->
<template>
  <div>
    <vxe-modal
      v-model="dialogVisible"
      :title="title"
      width="91%"
      height="57%"
      :show-footer="true"
      @close="dialogClose"
    >
      <div v-loading="addLoading" class="payVoucherInput">
        <template>
          <div>
            <div style="color:#40aaff;font-size:16px;font-weight:bold">处理信息</div>
            <el-row>
              <el-col :span="24">
                <el-container>
                  <el-main width="100%">
                    <el-row>
                      <div class="sub-title-add" style="width:100px;float:left;margin-top:8px">&nbsp;处理结果</div>
                      <el-select
                        v-model="handleResult"
                        :disabled="edit"
                        placeholder="处理结果"
                        style="width:45%"
                      >
                        <el-option
                          v-for="item in handleResultoptions"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        />
                      </el-select>
                    </el-row>
                  </el-main>
                </el-container>
              </el-col>
              <el-col :span="24">
                <el-container>
                  <el-main width="100%">
                    <el-row>
                      <div class="sub-title-add" style="width:100px;float:left;margin-top:8px">&nbsp;处理意见</div>
                      <el-input
                        v-model="handleDesc"
                        :disabled="edit"
                        placeholder="处理意见"
                        style="width:45%"
                      />
                    </el-row>
                  </el-main>
                </el-container>
              </el-col>
            </el-row>
          </div>
        </template>
      </div>
      <div slot="footer" style="height: 80px;margin:0 15px">
        <div v-if="showbox" id="bigbox"></div>
        <el-divider style="color:#E7EBF0" />
        <div type="flex" justify="space-around">
          <div>
            <vxe-button @click="dialogClose">取消</vxe-button>
            <vxe-button status="primary" @click="doInsert">确定</vxe-button>
          </div>
        </div>
      </div>
    </vxe-modal>
    <AddDialog
      v-if="dialogVisibleShow"
      :title="dialogTitle"
    />
  </div>
</template>
<script>
import HttpModule from '@/api/frame/main/Monitoring/WarningDataMager.js'
import AddDialog from './addDialog'
export default {
  name: 'HandleDialog',
  components: {
    AddDialog
  },
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
    warningInfoId: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data() {
    return {
      violationShow: true,
      warnMsg: '',
      dialogVisibleShow: false,
      dialogTitle: '查看详情',
      edit: false,
      handleResult: '1',
      handleDesc: '',
      handleResultoptions: [
        { value: '1', label: '放行' },
        { value: '2', label: '改正' },
        { value: '3', label: '禁止' }
      ],
      handletableData: [],
      dialogVisible: true,
      addLoading: false,
      showbox: false,
      DetailData: {}
    }
  },
  methods: {
    dialogClose() {
      this.$parent.batchDialogVisible = false
    },
    moneyFormat(amt) {
      const num = Math.round(amt * 100) / 100
      let c = (num.toString().indexOf('.') !== -1) ? num.toLocaleString() : num.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
      if (c.length >= 3 & c.indexOf('.', c.length - 2) === c.length - 2) {
        c = c + '0'
      }
      if (c.indexOf('.') === -1) {
        c = c + '.00'
      }
      return c
    },
    // 处理
    doInsert() {
      if (this.handleResult === '') {
        this.$message.warning('请选择处理结果')
        return
      }
      if (this.handleDesc === '') {
        this.$message.warning('请输入处理意见')
        return
      }
      if (this.title === '处理') {
        let param = {
          'ids': this.warningInfoId,
          'handleResult': this.handleResult,
          'handleDesc': this.handleDesc,
          'warningMsg': ''
        }
        this.addLoading = true
        HttpModule.batchBudgetHandleDetail(param).then(res => {
          this.addLoading = false
          if (res.code === '000000') {
            this.$message.success('处理成功')
            this.$parent.batchDialogVisible = false
            this.$parent.queryTableDatas()
          } else {
            this.$message.error(res.message)
          }
        })
      }
    }
  },
  watch: {},
  created() {
    this.showInfo()
    if (this.title === '处理') {
      this.showbtn = true
    }
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
