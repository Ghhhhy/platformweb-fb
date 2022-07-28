<!--监控规则函数管理新增页面弹框-->
<template>
  <vxe-modal
    v-model="dialogVisible"
    class="dialog absolute z-index-1"
    :title="title"
    width="30%"
    height="40%"
    center
    :show-footer="true"
    @close="dialogClose"
  >
    <BsUpload
      ref="budgetUpload"
      uniqe-name="uploadBudgetFile"
      :queryparams="uploadDFileParams"
      :after-upload="afterUpload"
      :downloadparams="downloadparams"
    />
    <div slot="footer" class="vxeModalUnique" style="height: 80px;">
      <el-divider style="color:#E7EBF0" />
      <el-row type="flex" justify="space-around" style="margin-bottom:14px;margin-top:0px;">
        <el-col :span="8" style="margin-top:10px;" />
        <el-col :span="4" />
        <el-col :span="12" style="margin-top:0px;float:right;">
          <div>
            <el-button @click="dialogClose">取消</el-button>
            <el-button type="primary" style="margin-right:0px;" @click="upload">选择并上传</el-button>
          </div>
        </el-col>
      </el-row>
    </div>
  </vxe-modal>
</template>
<script>
// import { proconf } from '../PoliciesAndRegulationsManagement.js'

export default {
  name: 'ImportDialog',
  components: {
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
    selectData: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data() {
    return {
      afterUpload: this.OnAfterUpload,
      formValidationConfig: {
        reportName: [
          { required: true, message: '报表名不能为空', trigger: 'blur' }
        ],
        sqlCode: [
          { required: true, message: '数据源sql不能为空', trigger: 'blur' }
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
        reportName: '',
        sqlCode: ''
      },
      tableConfig: {},
      addFormItemsConfig: [
        {
          title: '报表名称',
          field: 'reportName',
          itemRender: { name: '$vxeNewInput', props: { type: 'string', disabled: false } },
          span: 24
        },
        {
          title: '数据源sql',
          field: 'sqlCode',
          itemRender: { name: '$vxeEditDownTextarea', props: { type: 'string', disabled: false } },
          span: 24
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
    upload() {
      this.$refs.budgetUpload.upload()
    },
    itemChange(property, value, dataList, itemsConfig) {
      this.formData = property.data
    },
    ajaxTableData({ params, currentPage, pageSize }) {
      this.mainPagerConfig.currentPage = currentPage
      this.mainPagerConfig.pageSize = pageSize
      this.queryTableDatas()
    },
    dialogClose() {
      this.$parent.dialogVisible = false
    },
    // 修改回显
    showInfo() {
      if (this.title === '新增') {
        this.attachmentId = this.$ToolFn.utilFn.getUuid()
        return
      }
      this.formData.ledgerId = this.selectData.ledgerId
      this.formData.reportName = this.selectData.reportName
      this.formData.sqlCode = this.selectData.sqlCode
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
  height:250px
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
