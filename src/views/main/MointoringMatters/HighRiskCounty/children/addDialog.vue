<!--监控规则数据源管理新增页面弹框-->
<template>
  <vxe-modal
    v-model="dialogVisible"
    width="60%"
    height="80%"
    :show-footer="true"
    @close="dialogClose"
  >
    <div v-loading="addLoading" class="payVoucherInput">
      <div>
        <el-row>
          <el-col :span="12">
            <el-container>
              <el-main width="100%">
                <el-row>
                  <div class="sub-title-add" style="float:left;margin-top:8px"><font color="red">*</font>&nbsp;请选择高风险县</div>
                  <BsTree
                    ref="rightTree"
                    style="height: calc(100% - 100px)"
                    :tree-data="treeData"
                    :config="{ multiple: false, rootName: '全部', treeProps: { nodeKey: 'code', label: 'name' } }"
                    @onNodeClick="onClickmethod"
                  />
                </el-row>
              </el-main>
            </el-container>
          </el-col>
        </el-row>
      </div>
    </div>
    <div slot="footer" style="height: 80px;margin:0 15px">
      <div v-if="showbox" id="bigbox"></div>
      <el-divider style="color:#E7EBF0" />
      <div type="flex" justify="space-around">
        <div>
          <vxe-button @click="dialogClose">取消</vxe-button>
          <vxe-button id="savebutton" status="primary" @click="doInsert">保存</vxe-button>
        </div>
      </div>
    </div>
  </vxe-modal>
</template>
<script>
import HttpModule from '@/api/frame/main/baseConfigManage/HighRiskCounty.js'
export default {
  name: 'AddDialog',
  components: {},
  computed: {
    curNavModule() {
      return this.$store.state.curNavModule
    }
  },
  props: {
  },
  data() {
    return {
      treeData: [],
      scope: [],
      mofDivCode: '',
      mofDivName: '',
      dialogVisible: true,
      addLoading: false,
      token: '',
      isContinuity: false,
      // 文件上传相关参数
      fileList: [],
      fileData: [],
      fileDataBakDel: [],
      attachmentId: '',
      showbox: false
    }
  },
  methods: {
    dialogClose() {
      this.$parent.dialogVisible = false
      this.$parent.queryTableDatas()
    },
    onClickmethod(node) {
      if (node.children?.length < 1) {
        this.mofDivCode = node.node.code
        this.mofDivName = node.node.name.split('-')[1]
      }
    },
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
    getWhereTree() {
      // let that = this
      let result = this.dealwithStr(this.$store.state.userInfo.province)
      // this.$store.state.userInfo.orgCode
      let param = {
        wheresql: 'and code like \'' + result + '%\'',
        elementCode: 'admdiv',
        // elementCode: 'AGENCY',
        year: this.$store.state.userInfo.year,
        province: this.$store.state.userInfo.province
      }
      HttpModule.getTreewhere(param).then(res => {
        this.getProvince(res.data[0])
      })
    },
    getCheckData(dataArr, data) {
      data.forEach(item => {
        if (item.isleaf === '1') {
          let obj = {
            mofDivCode: '',
            agencyCode: '',
            mofDiv: ''
          }
          obj.mofDivId = item.code
          obj.mofDivCode = item.name.split('-')[0]
          dataArr.push(obj)
        }
        if (item.children) {
          this.getCheckData(dataArr, item.children)
        }
      })
    },
    getProvince(data) {
      data.children.forEach(item => {
        if (item.code === this.$store.state.userInfo.province) {
          if (this.$store.state.userInfo.province.substring(2) === '0000000') {
            let arr = []
            arr.push(data)
            this.treeData = this.getChildrenNewData(arr)
            let dataArr = []
            this.getCheckData(dataArr, this.treeData)
            this.scope = dataArr
          } else {
            let arr = []
            arr.push(item)
            this.treeData = this.getChildrenNewData(arr)
          }
        } else {
          if (item.children) {
            // let arr = []
            // arr.push(item)
            this.getProvince(item)
          }
        }
      })
    },
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
    // 保存新增的计划信息
    doInsert() {
      if (this.mofDivCode === '') {
        this.$message.warning('请选择高风险县')
        return
      }
      if (this.mofDivName === '') {
        this.$message.warning('请选择高风险县')
        return
      }
      let param = {
        mofDivCode: this.mofDivCode,
        mofDivName: this.mofDivName
      }
      this.addLoading = true
      HttpModule.add(param).then(res => {
        this.addLoading = false
        if (res.code === '000000') {
          this.$message.success('新增成功')
          this.$parent.dialogVisible = false
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
