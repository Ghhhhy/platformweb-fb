<!--监控规则函数管理新增页面弹框-->
<template>
  <vxe-modal
    v-model="dialogVisible"
    class="ledger"
    :title="title"
    width="60%"
    height="80%"
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
      <div style="display: flex; padding: 0.5em 0.8em 0.5em 0;">
        <span style="width: 100px; padding-right: 10px; text-align: right; box-sizing: border-box">口径说明</span>
        <VueQuillEditor
          :content.sync="formData.description"
          style="height: 100px; flex: 1"
        />
      </div>
    </div>
    <div slot="footer" class="vxeModalUnique">
      <el-button size="mini" @click="dialogClose">取消</el-button>
      <el-button size="mini" type="primary" style="margin-right:0px;" @click="addOrUpdate">保存</el-button>
    </div>
  </vxe-modal>
</template>
<script>
// import { proconf } from '../PoliciesAndRegulationsManagement.js'
import HttpModule from '@/api/frame/main/fundMonitoring/ledger.js'
import VueQuillEditor from '@/components/vueQuillEditor/index.vue'

export default {
  name: 'AddDialog',
  components: {
    VueQuillEditor
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
      content: '',
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
        sqlCode: '',
        description: ''
      },
      tableConfig: {},
      addFormItemsConfig: [
        {
          title: '报表名称',
          field: 'reportName',
          itemRender: { name: '$vxeNewInput', props: { type: 'string', disabled: false, maxlength: 38, showWordLimit: true } },
          span: 24
        },
        {
          title: '数据源sql',
          field: 'sqlCode',
          itemRender: { name: '$vxeEditDownTextarea', props: { type: 'string', disabled: false, rows: 3 } },
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
      if (this.title === '新增') {
        this.attachmentId = this.$ToolFn.utilFn.getUuid()
        return
      }
      this.formData.ledgerId = this.selectData.ledgerId
      this.formData.reportName = this.selectData.reportName
      this.formData.sqlCode = this.selectData.sqlCode
      this.formData.description = this.selectData.description || ''
    },
    // 保存新增的计划信息
    addOrUpdate() {
      console.log(this.formData.description)
      if (this.title === '新增') {
        this.addLoading = true
        HttpModule.addLedger(this.formData).then((res) => {
          this.addLoading = false
          if (res.code === '000000') {
            this.$message.success('新增成功')
            this.$parent.addDialogVisible = false
            this.$parent.queryTableDatas()
          } else {
            this.$message.error(res.message)
          }
        })
      } else {
        this.addLoading = true
        HttpModule.updateLedger(this.formData).then((res) => {
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
