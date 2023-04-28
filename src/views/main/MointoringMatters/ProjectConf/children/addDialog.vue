<!--监控规则数据源管理新增页面弹框-->
<template>
  <vxe-modal
    v-model="dialogVisible"
    width="60%"
    title="新增"
    height="50%"
    :show-footer="true"
    @close="dialogClose"
  >
    <div class="payVoucherInput" style="margin-top:50px;">
      <el-main width="100%">
        <el-row>
          <div class="sub-title-add" style="width:150px;float:left;margin-top:8px"><font color="red">*</font>&nbsp;三保要素</div>
          <div style="width:80%;float:left;margin-top:2px">
            <BsTreeInput
              ref="rightTree"
              v-model="threeSafe"
              :datas="threeSafeOptions"
              :config="{ multiple: true, treeProps: { nodeKey: 'code', label: 'name' } }"
              @onNodeCheckClick="onNodeCheckClick"
              @input="selectRule"
            />
          </div>
        </el-row>
      </el-main>
      <el-main width="100%">
        <el-row>
          <BsForm
            ref="messageForm"
            :is-editable="true"
            :form-items-config="formItemsConfigMessage"
            :form-data-list.sync="formDatas"
            @itemChange="formItemChange"
          />
        </el-row>
      </el-main>
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
import HttpModule from '@/api/frame/main/baseConfigManage/ProjectConf.js'
import { proconf } from '../ProjectConf'
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
      threeSafe: '',
      threeSafeId: '',
      threeSafeCode: '',
      threeSafeName: '',
      threeSafeOptions: proconf.threeSafeOptions.itemRender.options,
      threeSafeData: [],
      treeData: [],
      scope: [],
      mofDivCode: '',
      mofDivName: '',
      dialogVisible: true,
      addLoading: false,
      token: '',
      formItemsConfigMessage: proconf.formItemsConfigMessage,
      paymentLen: 0,
      paymentData: [],
      formDatas: {
      },
      showbox: false
    }
  },
  methods: {
    dialogClose() {
      this.$parent.dialogVisible = false
      this.$parent.queryTableDatas()
      this.formItemsConfigMessage.splice(1, this.paymentLen)
      this.paymentLen = 0
      let form = this.$refs.messageForm
      form.clearValidate()
      this.resetFormDataListMessage()
      this.formItemsConfigMessage.forEach(item => {
        item.itemRender.props.disabled = false
      })
    },
    onClickmethod(node) {
      if (node.id !== '0') {
        this.mofDivCode = node.node.province
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
    resetFormDataListMessage() {
      let paymentsArr = ['exp_func_code', 'gov_bgt_eco_code', 'dep_bgt_eco_code']
      paymentsArr.forEach(item => {
        this.formDatas[item + '__viewSort'] = ''
        this.formDatas[item + 'code'] = ''
        this.formDatas[item + 'code__multiple'] = []
        this.formDatas[item + 'id'] = ''
        this.formDatas[item + 'id__multiple'] = []
        this.formDatas[item + 'name'] = ''
        this.formDatas[item + 'name__multiple'] = []
      })
      this.formDatas.payment = []
      this.formDatas.payment__multiple = []
      this.formDatas.gov_bgt_eco_code = []
      this.formDatas.exp_func_code = []
      this.formDatas.dep_bgt_eco_code = []
    },
    formItemChange(obj) {
      if (obj.property === 'payment') {
        let data = obj.itemValue ? obj.itemValue.split(',') : ''
        let content = this.formItemsConfigMessage[0].itemRender.options
        this.formItemsConfigMessage.splice(1, this.paymentLen)
        if (this.paymentData) {
          if (data.length < this.paymentLen) {
            this.paymentData.forEach(item => {
              if (data.indexOf(item) === -1) {
                this.formDatas[this.formItemsConfigMessage[0].itemRender.options[item].name + '__viewSort'] = ''
                this.formDatas[this.formItemsConfigMessage[0].itemRender.options[item].name + 'code'] = ''
                this.formDatas[this.formItemsConfigMessage[0].itemRender.options[item].name + 'code__multiple'] = []
                this.formDatas[this.formItemsConfigMessage[0].itemRender.options[item].name + 'id'] = ''
                this.formDatas[this.formItemsConfigMessage[0].itemRender.options[item].name + 'id__multiple'] = []
                this.formDatas[this.formItemsConfigMessage[0].itemRender.options[item].name + 'name'] = ''
                this.formDatas[this.formItemsConfigMessage[0].itemRender.options[item].name + 'name__multiple'] = []
              }
            })
          }
        }
        this.paymentData = data
        this.paymentLen = data.length
        console.log('xcx', data)
        let datas = {}
        data.forEach((item, index) => {
          datas = this.createObj(content[item], false)
          this.formItemsConfigMessage.splice(1 + index, 0, datas)
        })
      }
    },
    createObj(obj, disabled) {
      return {
        insertMark: obj.label,
        isNew: true,
        title: obj.label,
        field: obj.name,
        align: 'left',
        titleAlign: 'left',
        titleWidth: '150px',
        title__viewSort: obj.label,
        field__viewSort: obj.name,
        name: '$vxeTree',
        itemRender: {
          name: '$vxeTree',
          options: [],
          props: {
            config: {
              treeProps: {
                nodeKey: 'id',
                label: 'text',
                children: 'children' // 子级字段名
              },
              placeholder: `请选择${obj.label}`,
              disabled,
              multiple: true,
              isleaf: false,
              axiosConfig: {
                method: 'get',
                url: `mp-b-basedata-service/v2/elevalueset/view/jstreedata/${obj.urlC}`
              }
            },
            queryparams: {
              tokenid: this.$store.getters.getLoginAuthentication.tokenid,
              appguid: 'apaas',
              year: this.$store.state.userInfo.year,
              mofDivCode: this.$store.state.userInfo.province,
              parameters: {}
            }
          }
        }
      }
    },
    getRegulationChildrenData(datas) {
      let that = this
      datas.forEach(item => {
        item.label = item.code + '-' + item.name
        if (item.children.length > 0) {
          that.getRegulationChildrenData(item.children)
          item.leaf = false
        } else {
          item.leaf = true
        }
      })

      return datas
    },
    selectRule(val) {
      let valArr = val.split('##')
      this.threeSafeId = valArr[0]
      this.threeSafeCode = valArr[1]
      this.threeSafeName = valArr[2]
    },
    getRegulation() {
      let queryparams = {
        tokenid: this.$store.getters.getLoginAuthentication.tokenid,
        appguid: 'apaas',
        year: this.$store.state.userInfo.year,
        mofDivCode: this.$store.state.userInfo.province,
        parameters: {}
      }
      HttpModule.getTreeWhere(queryparams).then(res => {
        if (res.code === '100000') {
          let treeResdata = this.getRegulationChildrenData(res.data)
          this.threeSafeOptions = treeResdata
          this.threeSafeOptions.forEach(item => {
            item.label = item.code + '-' + item.name
          })
        } else {
          this.$message.error('下拉树加载失败')
        }
      })
    },
    onNodeCheckClick(data) {
      console.log(data.nodes)
      let arr = []
      data.nodes.forEach(item => {
        if (item.isleaf) {
          let obj = {
            code: '',
            id: '',
            name: ''
          }
          obj.id = item.id
          obj.code = item.code
          obj.name = item.name
          arr.push(obj)
        }
      })
      console.log('arr', arr)
      this.threeSafeData = arr
    },
    // 保存新增的计划信息
    doInsert() {
      let dataList = []
      let that = this
      console.log('vvv', that.threeSafe)
      if (this.threeSafeId === null || this.threeSafeId.trim() === '' || this.threeSafeCode === null || this.threeSafeCode.trim() === '' || this.threeSafeName === null || this.threeSafeName.trim() === '') {
        this.$message.warning('请选择需要新增的三保科目')
        return
      }
      if (that.formDatas.payment.indexOf('0') > -1) {
        that.formDatas.exp_func_id__multiple.forEach((item, index) => {
          let param = {
            proId: item,
            proCode: that.formDatas.exp_func_code__multiple[index],
            proName: that.formDatas.exp_func_name__multiple[index],
            type: 1,
            threeSafeId: this.threeSafeId,
            threeSafeCode: this.threeSafeCode,
            threeSafeName: this.threeSafeName
          }
          dataList.push(param)
        })
      }
      if (that.formDatas.payment.indexOf('1') > -1) {
        that.formDatas.gov_bgt_eco_id__multiple.forEach((item, index) => {
          let param = {
            proId: item,
            proCode: that.formDatas.gov_bgt_eco_code__multiple[index],
            proName: that.formDatas.gov_bgt_eco_name__multiple[index],
            type: 2,
            threeSafeId: this.threeSafeId,
            threeSafeCode: this.threeSafeCode,
            threeSafeName: this.threeSafeName
          }
          dataList.push(param)
        })
      }
      if (that.formDatas.payment.indexOf('2') > -1) {
        that.formDatas.dep_bgt_eco_id__multiple.forEach((item, index) => {
          let param = {
            proId: item,
            proCode: that.formDatas.dep_bgt_eco_code__multiple[index],
            proName: that.formDatas.dep_bgt_eco_name__multiple[index],
            type: 3,
            threeSafeId: this.threeSafeId,
            threeSafeCode: this.threeSafeCode,
            threeSafeName: this.threeSafeName
          }
          dataList.push(param)
        })
      }
      if (dataList === null || dataList.length === 0) {
        this.$message.warning('请选择需要新增的功能科目或政府经济分类或部门经济分类')
        return
      }
      this.addLoading = true
      HttpModule.add(dataList).then(res => {
        this.addLoading = false
        if (res.code === '000000') {
          this.$message.success(res.message)
          this.$parent.dialogVisible = false
          this.$parent.queryTableDatas()
          this.formItemsConfigMessage.splice(1, this.paymentLen)
          this.paymentLen = 0
          let form = this.$refs.messageForm
          form.clearValidate()
          this.resetFormDataListMessage()
          this.formItemsConfigMessage.forEach(item => {
            item.itemRender.props.disabled = false
          })
        } else {
          this.$message.error(res.message)
        }
      })
    }
  },
  watch: {
  },
  created() {
  }
}
</script>
<style lang="scss" scoped>
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

  ::v-deep .vxe-form .vxe-form--item.is--active:not(.is--hidden) {
    display: contents;
    margin-bottom: 10px;
  }
  ::v-deep .vxe-form.size--medium .vxe-form--item-inner {
    margin-bottom: 20px;
  }
</style>
