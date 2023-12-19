<!--单位用款申请(按计划)录入新增页面弹框-->
<template>
  <vxe-modal
    v-model="descVisible"
    v-loading="descLoading"
    :title="title"
    width="50%"
    height="35%"
    :show-footer="false"
    @close="dialogClose"
  >
    <div>
      <div>
        <el-row>
          <el-col :span="24">
            <el-container>
              <el-main width="100%">
                <el-row>
                  <el-input
                    v-model="desc"
                    type="textarea"
                    placeholder="请输入事由"
                    style="width:100%"
                    :rows="5"
                  />
                </el-row>
              </el-main>
            </el-container>
          </el-col>
        </el-row>
      </div>
      <div slot="footer" style="width:100%;height: 80px;">
        <div v-if="showbox" id="bigbox"></div>
        <el-divider style="color:#E7EBF0" />
        <div type="flex" justify="end">
          <div style="width:100%">
            <vxe-button id="savebutton" style="float:right;margin-right:20px" status="primary" @click="doInsert">保存</vxe-button>
            <vxe-button style="float:right;margin-right:20px" @click="dialogClose">取消</vxe-button>
          </div>
        </div>
      </div>
    </div>
  </vxe-modal>
</template>
<script>
import HttpModule from '@/api/frame/main/Monitoring/levelRules.js'
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
    mofDivCodeList: {
      type: Array,
      default: null
    },
    idList: {
      type: Array,
      default: null
    }
  },
  data() {
    return {
      showbox: false,
      descVisible: true,
      desc: '',
      descLoading: false
    }
  },
  methods: {
    dialogClose() {
      this.$parent.descVisible = false
      this.$parent.queryTableDatas()
    },
    doInsert() {
      if (this.desc === '') {
        this.$message.warning('请输入事由')
        return
      }
      this.$message.info('保存中')
      this.descLoading = true
      if (this.title === '启用事由') {
        const params = {
          regulationCodes: this.idList,
          mofDivCodes: this.mofDivCodeList,
          openDesc: this.desc,
          menuName: this.$store.state.curNavModule.name
        }
        HttpModule.open(params).then(res => {
          if (res.code === '000000') {
            this.$message.success('启用成功')
            this.$parent.descVisible = false
            this.$parent.queryTableDatas()
          } else {
            this.$message.warning(res.message)
          }
        })
      } else {
        const params = {
          regulationCodes: this.idList,
          mofDivCodes: this.mofDivCodeList,
          openDesc: this.desc,
          menuName: this.$store.state.curNavModule.name
        }
        HttpModule.stop(params).then(res => {
          if (res.code === '000000') {
            this.$message.success('停用成功')
            this.$parent.descVisible = false
            this.$parent.queryTableDatas()
          } else {
            this.$message.warning(res.message)
          }
        })
      }
    }
  },
  watch: {
  },
  mounted() {
  },
  created() {
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
  .setbtn{
    width:100px;
    height:45px;
    float:left;
    margin-right:20px;
  }
  .tabone{
    width:100px;
    height:40px;
    text-align:center;
    line-height:40px;
    float:left;
    border:1px solid #ccc;
    border-radius:4px;
  }
  .tabone1{
    width:100px;
    height:40px;
    text-align:center;
    line-height:40px;
    float:left;
    border:1px solid #ccc;
    background-color:#f2f2f2;
    border-radius:4px;
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
  .vxe-toolbar{
    .vxe-button--wrapper{
      display:flex;
          justify-Content: end;
    }
  }
</style>
