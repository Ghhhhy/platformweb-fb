<!--单位用款申请(按计划)录入新增页面弹框-->
<template>
  <vxe-modal
    v-model="mofShow"
    title="生效范围"
    width="80%"
    height="90%"
    :show-footer="false"
    @close="dialogClose"
  >
    <!--生效范围-->
    <div class="payVoucherInput" style="margin-top:50px;">
      <div>
        <el-row>
          <el-col :span="12">
            <el-container>
              <el-main width="100%">
                <el-row>
                  <div class="sub-title-add" style="width:100px;float:left;margin-top:8px"><font color="red">*</font>&nbsp;生效范围</div>
                  <BsTree
                    ref="rightTree"
                    v-model="rightTreeValue"
                    :tree-data="treeData"
                    :config="{ multiple: true, rootName: '全部', disabled: false }"
                    @onNodeCheckClick="onNodeCheckClick"
                  />
                </el-row>
              </el-main>
            </el-container>
          </el-col>
        </el-row>
      </div>
      <div slot="footer" style="height: 80px; margin: 0 15px;float: right">
        <div type="flex" justify="space-around">
          <div>
            <vxe-button status="primary" @click="doInsert">执行</vxe-button>
            <vxe-button @click="dialogClose">取消</vxe-button>
          </div>
        </div>
      </div>
    </div>
  </vxe-modal>
</template>
<script>
// import { proconf } from '../SystemLevelRulesFlow.js'
import HttpModule from '@/api/frame/main/Monitoring/levelRules.js'
export default {
  name: 'MofDialog',
  components: {},
  computed: {
    curNavModule() {
      return this.$store.state.curNavModule
    }
  },
  props: {
    addParam: {
      type: Object,
      default: function _default() {
        return {}
      }
    }
  },
  data() {
    return {
      rightTreeValue: [],
      treeData: [],
      disabled: false,
      scope: [],
      mofShow: true
    }
  },
  methods: {
    getChildrenNewData(datas) {
      let that = this
      datas.forEach(item => {
        item.label = item.text
        item.code = item.id
        item.guid = item.id
        item.name = item.text
        if (item.children) {
          that.getChildrenNewData(item.children)
        }
      })

      return datas
    },
    onNodeCheckClick(data) {
      console.log(data.nodes)
      let arr = []
      data.nodes.forEach(item => {
        if (item.isleaf) {
          let obj = {
            mofDivCode: '',
            agencyCode: '',
            mofDiv: ''
          }
          obj.mofDivId = item.code
          obj.mofDivCode = item.name.split('-')[0]
          arr.push(obj.mofDivCode)
        }
      })
      this.scope = arr
    },
    dialogClose() {
      this.$parent.mofShow = false
    },
    // 处理字符串
    dealwithStr(str) {
      let result = ''
      if (str) {
        if (str.substring(str.length - 7) === '0000000') {
          result = '61'
        } else if (str.substring(str.length - 5) === '00000') {
          result = str.substring(0, 4)
        } else if (str.substring(str.length - 3) === '000') {
          result = str.substring(0, 6)
        } else {
          result = str
        }
        return result
      }
    },
    // 获取生效范围
    getWhereTree() {
      let that = this
      let result = this.dealwithStr(this.$store.state.userInfo.province)
      // this.$store.state.userInfo.orgCode
      let param = {
        wheresql: 'and code like \'' + result + '%\'',
        elementCode: 'admdiv',
        // elementCode: 'AGENCY',
        year: this.$store.state.userInfo.year,
        province: this.$store.state.userInfo.province
      }
      // let regulationType = this.$store.state.curNavModule.f_FullName.substring(0, 3)
      HttpModule.getTreewhere(param).then(res => {
        that.treeData = that.getChildrenNewData(res.data)
      })
    },
    // 保存新增的计划信息
    doInsert() {
      console.log('-+-', this.scope)
      // this.addParam.mof
      HttpModule.warnLogAdd(this.addParam).then((res) => {
        this.addLoading = false
        if (res.code === '000000') {
          this.$message.success('新增成功')
          this.$parent.addDialogVisible = false
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
    console.log('xxx---xxx')
    this.getWhereTree()
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
</style>
