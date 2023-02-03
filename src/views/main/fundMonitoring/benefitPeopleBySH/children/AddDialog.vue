<!--监控规则函数管理新增页面弹框-->
<template>
  <vxe-modal
    v-model="dialogVisible"
    class="ledger"
    :title="title"
    width="60%"
    height="50%"
    position="top"
    :show-footer="true"
    @close="dialogClose"
  >
    <div v-loading="addLoading" style="padding-bottom: 10px;">
      <BsForm
        ref="addForm"
        :form-items-config="addFormItemsConfig"
        :form-data-list="formData"
        :form-validation-config="formValidationConfig"
        :title-width="100"
        :form-gloabal-config="{ titleWidth: 100 }"
        @itemChange="itemChange"
      />
    </div>
    <div slot="footer" class="vxeModalUnique">
      <el-button size="mini" @click="dialogClose">取消</el-button>
      <el-button size="mini" type="primary" style="margin-right:0px;" @click="addOrUpdate">保存</el-button>
    </div>
  </vxe-modal>
</template>
<script>
// import { proconf } from '../PoliciesAndRegulationsManagement.js'
import HttpModule from '@/api/frame/main/fundMonitoring/benefitPeopleBySH.js'

export default {
  name: 'AddDialog',
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
    selectData: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data() {
    return {
      content: '',
      formValidationConfig: {
        mofDivCode: [
          { required: true, message: '区划不能为空', trigger: 'blur' }
        ],
        payCertNo: [
          { required: true, message: '支付凭证号不能为空', trigger: 'blur' }
        ]
      },
      mofShow: false,
      btnShow: true,
      mainPagerConfig: {
        total: 0,
        currentPage: 1,
        pageSize: 20
      },
      formData: {
        id: '',
        mofDivCode: '',
        payCertNo: '',
        amount: '',
        proCode: '',
        proName: '',
        payeeAcctName: '',
        payeeAcctNo: '',
        payeeAcctBankName: '',
        nhbh: ''
      },
      tableConfig: {},
      addFormItemsConfig: [
        {
          title: '区划',
          field: 'mofDivCode',
          itemRender: { name: '$vxeNewInput', props: { type: 'string', disabled: false, maxlength: 38, showWordLimit: true } },
          span: 12
        },
        {
          title: '支付凭证号',
          field: 'payCertNo',
          itemRender: { name: '$vxeNewInput', props: { type: 'string', disabled: false, maxlength: 38, showWordLimit: true } },
          span: 12
        },
        {
          title: '金额(元)',
          field: 'amount',
          itemRender: { name: '$vxeNewInput', props: { type: 'string', disabled: false, maxlength: 38, showWordLimit: true } },
          span: 12
        },
        {
          title: '项目代码',
          field: 'proCode',
          itemRender: { name: '$vxeNewInput', props: { type: 'string', disabled: false, maxlength: 38, showWordLimit: true } },
          span: 12
        },
        {
          title: '项目名称',
          field: 'proName',
          itemRender: { name: '$vxeNewInput', props: { type: 'string', disabled: false, maxlength: 38, showWordLimit: true } },
          span: 12
        },
        {
          title: '收款账户名称',
          field: 'payeeAcctName',
          itemRender: { name: '$vxeNewInput', props: { type: 'string', disabled: false, maxlength: 38, showWordLimit: true } },
          span: 12
        },
        {
          title: '收款方账户',
          field: 'payeeAcctNo',
          itemRender: { name: '$vxeNewInput', props: { type: 'string', disabled: false, maxlength: 38, showWordLimit: true } },
          span: 12
        },
        {
          title: '收款人开户银行',
          field: 'payeeAcctBankName',
          itemRender: { name: '$vxeNewInput', props: { type: 'string', disabled: false, maxlength: 38, showWordLimit: true } },
          span: 12
        },
        {
          title: '编号',
          field: 'nhbh',
          itemRender: { name: '$vxeNewInput', props: { type: 'string', disabled: false, maxlength: 38, showWordLimit: true } },
          span: 12
        }
      ],
      dataSourceCode: '',
      dataSourceName: '',
      functionType: '',
      functionName: '',
      functionApi: '',
      functionParameter: '',
      description: '',
      dialogVisible: true,
      addLoading: true,
      token: '',
      isContinuity: false,
      // 文件上传相关参数
      fileList: [],
      fileData: [],
      fileDataBakDel: [],
      attachmentId: '',
      showbox: false,
      addParam: {},
      fiRuleName: '',
      regulationClassName: ''
    }
  },
  methods: {
    itemChange(property, value, dataList, itemsConfig) {
      this.formData = property.data
    },
    ajaxTableData({ params, currentPage, pageSize }) {
      this.mainPagerConfig.currentPage = currentPage
      this.mainPagerConfig.pageSize = pageSize
      this.queryTableDatas()
    },
    dialogClose() {
      this.$parent.addDialogVisible = false
      this.$parent.queryTableDatas()
    },
    // 修改回显
    showInfo() {
      // if (this.title === '新增') {
      //   this.attachmentId = this.$ToolFn.utilFn.getUuid()
      //   return
      // }
      this.formData.mofDivCode = this.selectData.mofDivCode
      this.formData.payCertNo = this.selectData.payCertNo
      this.formData.amount = this.selectData.amount
      this.formData.proCode = this.selectData.proCode
      this.formData.proName = this.selectData.proName
      this.formData.payeeAcctName = this.selectData.payeeAcctName
      this.formData.payeeAcctNo = this.selectData.payeeAcctNo
      this.formData.payeeAcctBankName = this.selectData.payeeAcctBankName
      this.formData.nhbh = this.selectData.nhbh
      this.formData.id = this.selectData.id
    },
    // 保存新增的计划信息
    addOrUpdate() {
      console.log(this.formData.description)
      if (this.title === '新增') {
        this.addLoading = true
        // HttpModule.addLedger(this.formData).then((res) => {
        //   this.addLoading = false
        //   if (res.code === '000000') {
        //     this.$message.success('新增成功')
        //     this.$parent.addDialogVisible = false
        //     this.$parent.queryTableDatas()
        //   } else {
        //     this.$message.error(res.message)
        //   }
        // })
      } else {
        this.addLoading = true
        HttpModule.updateImport(this.formData).then(res => {
          this.addLoading = false
          if (res.code === '000000') {
            this.$message.success('编辑成功')
            this.$parent.addDialogVisible = false
            this.$parent.queryTableDatas()
          } else {
            this.$message.error(res.message)
          }
        })
      }
    }
  },
  watch: {
  },
  created() {
    /* if (this.userInfo.province === '610000000') {
      this.btnShow = false
    } */
    this.showInfo()
  }
}
</script>
<style lang="scss">
.payVoucherInput {
  margin: 15px;

  .el-card {
    margin-top: 0;
  }
}

.vxe-modal--wrapper .vxe-modal--box {
  z-index: 0;
}

.ledger .vxe-textarea {
  height: 150px
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
  opacity: 0.3;
}

.el-row-item .font-set-small .hline {
  width: 72px;
}
</style>
