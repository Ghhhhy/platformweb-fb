<!--政策法规管理新增页面弹框-->
<template>
  <vxe-modal
    v-model="dialogVisible"
    v-bind="modalStaticProperty"
    @close="dialogClose"
  >
    <vxe-form
      ref="businessMsgRef1"
      class="Titans-form"
      v-bind="formStaticProperty"
      :data="createDataList"
      :rules="createValidate"
    >
      <div class="formItemTitle one-row">疑似违规信息</div>
      <vxe-form-item v-for="(item) in createConfig" :key="item.field" v-bind="item" />
      <div class="formItemTitle one-row">监控部门指导意见</div>
      <vxe-form-item v-for="(item) in createConfig2" :key="item.field" v-bind="item" />
      <vxe-form-item field="fileList" class="one-row validShowRight">
        <BsUploadBak
          ref="myUpload"
          v-bind="uploadStaticProperty"
          :attachment-id="createDataList[`attachmentid${budgetlevelFieldNum + 1}`]"
          :file-data.sync="createDataList.fileList"
        />
      </vxe-form-item>
    </vxe-form>
    <template #footer>
      <el-button v-if="showType === 'edit'" type="primary" @click="handleClick">确定</el-button>
      <el-button @click="dialogClose">取消</el-button>
    </template>
  </vxe-modal>
</template>
<script>
import { suspectedViolationFormItem, departmentalGuidanceFormItem } from './columns.js'
import HttpModules from '@/api/frame/main/fundMonitoring/createProcessing.js'
import moment from 'moment'
import store from '@/store/index'
import { mapGetters } from 'vuex'
const statusMap = {
  '2': 2,
  '5': 7,
  '8': 1,
  '9': 1
}
export default {
  props: {
    detailData: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  components: {
  },
  computed: {
    ...mapGetters(['getuserInfo']),
    budgetlevelFieldNum() {
      const LevelFieldMap = { // 2  省级  4 市级   5 县级
        '4': 4,
        '2': 4,
        '5': 5
      }
      return LevelFieldMap[this.getuserInfo.budgetlevelcode]
    }
  },
  data() {
    return {
      dialogVisible: false,
      showType: '',
      modalStaticProperty: {
        title: '监控问询单信息',
        width: '96%',
        height: '80%',
        position: 'center',
        minWidth: '900',
        showFooter: true
      },
      formStaticProperty: {
        titleWidth: '180',
        titleAlign: 'right',
        class: 'orderAddClass'// 这儿可以额外添加class
      },
      uploadStaticProperty: {
        disabled: false,
        allowDelete: true,
        allowDownload: true,
        allowPreview: true,
        isUpload: true
      },
      fileList: [],
      fileData: [],
      fileDataBakDel: [],
      createConfig: suspectedViolationFormItem(this),
      createConfig2: [],
      createDataList: {
        violateType: '',
        fiRuleName: '',
        warnLevel: '',
        handleType: '',
        mofDivCode: '',
        doubtViolateExplain: '',
        commentDept: '',
        // ---市/省 级-- start
        phone4: '',
        handler4: '',
        updateTime4: '',
        information4: '',
        attachmentid5: '',
        // ---end
        // 县级--start
        phone5: '',
        handler5: '',
        updateTime5: '',
        information5: '',
        attachmentid6: '',
        // ---end
        fileList: []
      },
      createValidate: {
        commentDept: [
          { required: true, message: '请选择指导意见', trigger: 'change' }
        ]
        // fileList: [
        //   { required: true, message: '请上传附件', type: 'array', min: 1, trigger: 'change' }
        // ]
      }
    }
  },
  methods: {
    pickObjectField (obj = {}, field) {
      let newObj = {}
      Object.keys(obj).map(item => {
        if (field.includes(item)) {
          newObj[item] = obj[item]
        }
      })
      return newObj
    },
    logSlot() {
      console.log(777, ...arguments)
    },
    init() {
      this.createConfig = suspectedViolationFormItem(this)
      this.createConfig2 = departmentalGuidanceFormItem(this)
      if (this.showType === 'edit') {
        let pickField = Object.keys(this.createDataList).filter(item => { return item.field !== 'commentDept' })
        this.createDataList = this.pickObjectField(this.detailData[0], pickField)
        this.createDataList[`attachmentid${this.budgetlevelFieldNum + 1}`] = this.$ToolFn.utilFn.getUuid()// 初始化赋予uuid
        this.createDataList[`updateTime${this.budgetlevelFieldNum}`] = moment().format('YYYY-MM-DD HH:mm:ss')
        this.createDataList[`phone${this.budgetlevelFieldNum}`] = store.getters.getuserInfo.phonenumber
        this.createDataList[`handler${this.budgetlevelFieldNum}`] = store.getters.getuserInfo.name
        this.uploadStaticProperty.disabled = false
        this.uploadStaticProperty.allowDelete = true
      } else if (this.showType === 'detail') {
        let pickField = Object.keys(this.createDataList)
        this.createDataList = this.pickObjectField(this.detailData[0], pickField)
        this.uploadStaticProperty.disabled = true
        this.uploadStaticProperty.allowDelete = false
        if (this.createDataList[`attachmentid${this.budgetlevelFieldNum + 1}`]) {
          this.getFileList()
        }
      }
      this.getViolationType()
    },
    getFileList() {
      const param = {
        billguid: this.createDataList[`attachmentid${this.budgetlevelFieldNum + 1}`],
        year: this.$store.state.userInfo.year,
        province: this.$store.state.userInfo.province
      }
      HttpModules.getFile(param).then(res => {
        if (res.rscode === '100000') {
          // 获取附件信息
          this.$set(this.createDataList, 'fileList', JSON.parse(res.data))
          // this.createDataList.fileList = JSON.parse(res.data)
        } else {
          this.$message.error(res.result)
        }
      })
    },
    getViolationType() { // 初始化疑似整改信息option
      let params = {
        page: 1,
        size: 99999
      }
      HttpModules.queryViolationType(params).then(res => {
        if (res.code === '000000') {
          res.data.results.map(v => {
            v.value = v.name
            v.label = v.name
          })
          let config = this.createConfig
          for (let i = 0; i < config.length; i++) {
            const element = config[i]
            if (element.field === 'violateType') {
              config[i].itemRender.options = res.data.results
            }
          }
        }
      })
    },
    dialogClose() {
      this.dialogVisible = false
      this.$emit('closeModal')
    },
    async handleClick() {
      try {
        let valid = await this.$refs.businessMsgRef1?.validate()
        if (valid !== undefined) return undefined
        let param = {
          ...this.createDataList,
          dealNo: this.detailData[0].dealNo
          // regulationClass: transJson(this.$store.state.curNavModule.param5)?.regulationClass
        }
        param.status = statusMap[param.commentDept]
        HttpModules.handleFeedbackForDeal(param).then(res => {
          if (res.code === '000000') {
            this.$message.success('操作成功')
            // this.dialogVisible = false
            this.dialogClose()
          } else {
            this.$message.error(res.message)
          }
        })
      } catch (error) {
        console.log('校验错误信息list', error)
      }
    }
  },
  watch: {
    dialogVisible() {
      this.$refs.businessMsgRef1?.clearValidate()
      this.createDataList = {
        violateType: '',
        fiRuleName: '',
        warnLevel: '',
        handleType: '',
        mofDivCode: '',
        doubtViolateExplain: '',
        commentDept: '',
        // ---市/省 级-- start
        phone4: '',
        handler4: '',
        updateTime4: '',
        information4: '',
        attachmentid5: '',
        // ---end
        // 县级--start
        phone5: '',
        handler5: '',
        updateTime5: '',
        information5: '',
        attachmentid6: '',
        // ---end
        fileList: []
      }
      this.init()
    }
  },
  created() {}
}
</script>
<style lang="scss" scoped>

.Titans-form{
  /deep/ .vxe-textarea--inner[disabled] {
      color: #333;
      background: #f7fafd;
      cursor: not-allowed;
  }
  .formItemTitle {
  display: inline-block;
  color: #40aaff;
  margin-bottom: 5px;
  font-size: 16px;
  font-weight: bold;
}
  .one-row{
    width: 100% !important;
    .vxe-form--item-inner{
    }
  }
  .validShowRight{
    /deep/ .vxe-form--item-valid{
      text-align: right;
      font-size: 16px;
    }
  }
}
</style>
