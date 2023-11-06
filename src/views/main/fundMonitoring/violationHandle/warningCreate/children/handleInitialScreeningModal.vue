<!--处理弹框-->
<template>
  <vxe-modal
    v-model="showDialogVisible"
    :title="title"
    width="96%"
    height="90%"
    :show-footer="true"
  >
    <vxe-form
      ref="businessMsgRef1"
      class="Titans-form"
      v-bind="formStaticProperty"
      :data="createDataList"
      :rules="createValidate"
    >
      <div class="formItemTitle one-row">疑似违规信息</div>
      <vxe-form-item v-for="(item) in formItemConfig" v-if="item.visible" :key="item.field" v-bind="item" />
      <vxe-form-item field="fileList" title-width="0" title=" " class="one-row validShowRight">
        <BsUploadBak
          ref="myUpload"
          v-bind="uploadStaticProperty"
          :attachment-id="createDataList[`attachmentid${budgetlevelFieldNum + 1}`]"
          :file-data.sync="createDataList.fileList"
        />
      </vxe-form-item>
    </vxe-form>
    <template #footer>
      <vxe-button v-if="showType === 'add'" v-deClick size="small" type="primary" @click="handleClick">确定</vxe-button>
      <vxe-button size="small" @click="showDialogVisible = false">取消</vxe-button>
    </template>
  </vxe-modal>
</template>
<script>
/* eslint-disable-next-line */
import store from '@/store/index'
import moment from 'moment'
const showTypeMap = {
  'detail': '查看详情',
  'add': '初筛',
  'edit': '修改'
}
// lodash pick方法
/* eslint-disable-next-line */
const pickObjectField = (obj = {}, field) => {
  let newObj = {}
  Object.keys(obj).map(item => {
    if (field.includes(item)) {
      newObj[item] = obj[item]
    }
  })
  return newObj
}
export default {
  name: 'HandleInitialScreeningModal',
  components: {},
  props: {
    value: {
      type: Boolean,
      required: true
    },
    showType: {
      type: String,
      default: 'edit'
    },
    selectedData: {
      type: Array,
      default: () => {
        return []
      }
    },
    bussnessId: {
      type: String,
      default: '7'// 预算执行
    }
  },
  computed: {
    showDialogVisible: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      }
    },
    title() {
      return showTypeMap[this.showType]
    },
    /* eslint-disable no-alert, no-console */
    formItemConfig() {
      const isViolated = this.createDataList.handleResult === '2'// 是否违规 2 违规
      const isDistribute = this.createDataList.issueFlag === '2'// 是否下发 2 下发
      const isRectified = this.createDataList.issueType === '2'// 是否是整改  2 整改
      return [
        {
          field: 'fiRuleName',
          title: '监控规则',
          visible: true,
          titleWidth: '180',
          span: 8,
          itemRender: {
            name: '$input',
            props: { placeholder: '请输入监控规则', disabled: true }
          }
        },
        {
          title: '区划',
          field: 'mofDivName',
          span: 8,
          titleWidth: '180',
          visible: true,
          itemRender: {
            name: '$input',
            props: { disabled: true, placeholder: '请输入区划' }
          }
        },
        {
          title: '初筛认定',
          field: 'handleResult',
          span: 8,
          titleWidth: '180',
          visible: true,
          itemRender: {
            name: '$select',
            options: [
              { label: '认定正常', value: '1' },
              { label: '认定违规', value: '2' }
            ],
            props: { disabled: this.showType === 'detail', placeholder: '请选择初筛认定' }
          }
        },
        {
          field: 'violateType',
          title: '违规类型',
          titleWidth: '180',
          visible: isViolated,
          span: 8,
          itemRender: {
            name: '$select',
            props: { placeholder: '请选择违规类型' },
            options: this.violateTypeList
          }
        },
        {
          title: '是否下发',
          field: 'issueFlag',
          span: 8,
          titleWidth: '180',
          visible: isViolated,
          itemRender: {
            name: '$select',
            options: [
              { label: '是', value: '2' },
              { label: '否', value: '1' }
            ],
            props: { disabled: this.showType === 'detail', placeholder: '请选择是否下发' }
          }
        },
        {
          title: '下发类型',
          field: 'issueType',
          span: 8,
          titleWidth: '180',
          visible: isDistribute,
          itemRender: {
            name: '$select',
            options: [
              { label: '核实', value: '1' },
              { label: '整改', value: '2' }
            ],
            props: { disabled: this.showType === 'detail', placeholder: '请选择是否下发' }
          }
        },
        {
          title: '整改期限',
          field: 'ZGQX',
          span: 8,
          titleWidth: '180',
          visible: true,
          itemRender: {
            name: '$input',
            props: {
              type: 'date',
              disabled: this.showType === 'detail',
              placeholder: '请选择整改期限'
            }
          }
        },
        {
          title: '处理人',
          span: 8,
          titleWidth: '180',
          field: 'handler1',
          visible: true,
          align: 'center',
          itemRender: {
            name: '$input',
            props: { disabled: true, placeholder: '请输入处理人' }
          }
        },
        {
          title: '处理日期',
          span: 8,
          titleWidth: '180',
          field: 'updatetime1',
          visible: true,
          align: 'center',
          itemRender: {
            name: '$input',
            props: { disabled: true, placeholder: '请选择处理日期' }
          }
        },
        {
          title: '整改时间',
          span: 8,
          field: 'rectifyTime',
          titleWidth: '180',
          visible: true,
          itemRender: {
            name: '$input',
            props: {
              type: 'date',
              disabled: this.showType === 'detail',
              placeholder: '请选择整改时间'
            }
          }
        },
        {
          title: '疑点情况描述',
          span: 8,
          titleWidth: '180',
          field: 'doubtViolateExplain',
          class: 'one-row',
          visible: true,
          align: 'center',
          itemRender: {
            name: '$textarea',
            props: { disabled: this.showType === 'detail', placeholder: '请输入疑点情况描述' }
          }
        },
        {
          title: '核实建议描述',
          span: 8,
          titleWidth: '180',
          field: 'information1',
          class: 'one-row',
          visible: isRectified,
          align: 'center',
          itemRender: {
            name: '$textarea',
            props: { disabled: this.showType === 'detail', placeholder: '请输入核实建议描述' }
          }
        },
        {
          title: '整改情况描述',
          span: 8,
          titleWidth: '180',
          class: 'one-row',
          field: 'rectifyDetail',
          visible: true,
          align: 'center',
          itemRender: {
            name: '$textarea',
            props: { disabled: this.showType === 'detail', placeholder: '请输入整改情况描述' }
          }
        }
      ]
    },
    createValidate() {
      const isViolated = this.createDataList.handleResult === '2'// 是否违规 2 违规
      const isDistribute = this.createDataList.issueFlag === '2'// 是否下发 2 下发
      const isRectified = this.createDataList.issueType === '2'// 是否是整改  2 整改
      return {
        violateType: [
          { required: isViolated, message: '请选择违规类型' }
        ],
        issueFlag: [
          { required: isViolated, message: '请选择是否下发' }
        ],
        issueType: [
          { required: isViolated, message: '请选择下发类型' }
        ],
        ZGQX: [
          { required: isDistribute && isRectified, message: '请选择整改期限' }
        ],
        rectifyTime: [
          { required: isViolated && !isDistribute, message: '请选择整改时间' }
        ],
        rectifyDetail: [
          { required: isViolated && !isDistribute, message: '请输入整改情况描述' }
        ],
        fileList: [
          { type: 'array', min: (isViolated && !isDistribute) ? 1 : 0, trigger: 'change', required: isViolated && !isDistribute, message: '请上传附件' }
        ]
      }
    }
  },

  data() {
    return {
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
      budgetlevelFieldNum: 0,
      createDataList: {
        fiRuleName: '',
        mofDivName: '',
        handleResult: '',
        violateType: '',
        issueFlag: '',
        issueType: '',
        ZGQX: '',
        rectifyDetail: '',
        handler1: '',
        updatetime1: '',
        doubtViolateExplain: '',
        information1: '',
        rectifyTime: '',
        attachmentid1: ''
      },
      violateTypeList: []
    }
  },
  methods: {
    init() {
      if (this.showType === 'add') {
        this.createDataList = { ...this.createDataList, ...pickObjectField(this.selectedData[0], this.formItemConfig.map(item => item.field)) }
        this.createDataList.handleResult = ''
        this.createDataList.attachmentid1 = this.$ToolFn.utilFn.getUuid()
        this.createDataList.fileList = []
        this.createDataList.handler1 = store.getters.getuserInfo.name
        this.createDataList.updatetime1 = moment().format('YYYY-MM-DD HH:mm:ss')
      } else {
        this.createDataList = { ...this.createDataList, ...pickObjectField(this.selectedData[0], this.formItemConfig.map(item => item.field)) }
        this.createDataList.attachmentid1 = this.selectedData[0].attachmentid1
        this.getFileList()
      }
    },
    getViolationType() {
      let params = { page: 1, size: 99999 }
      this.$http.get(BSURL.lmp_dictionary_violationTypePageQuery, params).then(res => {
        if (res.code === '000000') {
          this.violateTypeList = res.data.results.map(item => {
            return { label: item.name, value: item.code }
          })
        }
      })
    },
    getFileList() {
      const param = {
        billguid: this.createDataList[`attachmentid${this.budgetlevelFieldNum + 1}`],
        year: this.$store.state.userInfo.year,
        province: this.$store.state.userInfo.province
      }
      this.$http.get(BSURL.api_fileservice_v2_files, param).then(res => {
        if (res.rscode === '100000') {
          // 获取附件信息
          this.$set(this.createDataList, 'fileList', JSON.parse(res.data))
        } else {
          this.$message.error(res.result)
        }
      })
    },
    async handleClick() {
      try {
        let valid = await this.$refs.businessMsgRef1?.validate()
        if (valid !== undefined) return undefined
        let dataList = this.selectedData.map(item => {
          return {
            ...pickObjectField(this.createDataList, this.formItemConfig.filter(item => item.visible).map(item => item.field)),
            attachmentid1: this.createDataList.attachmentid1,
            bgtMofDepId: item.bgtMofDepId,
            warnid: item.warnid,
            fiRuleCode: item.fiRuleCode,
            warningCode: item.warningCode
          }
        })
        let params = {
          businessModuleCode: this.bussnessId,
          menuId: this.$store.state.curNavModule.guid,
          menuName: this.$store.state.curNavModule.name,
          dataList
        }
        this.$http.post(BSURL.lmp_totalWarnAdd, params).then(res => {
          if (res.code === '000000') {
            this.showDialogVisible = false
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
    value(n, o) {
      if (n) {
        this.init()
      } else {
        this.$refs.businessMsgRef1.reset()
        this.$emit('close')
      }
    }
  },
  created() {
    this.getViolationType()
  }
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
      // font-size: 16px;
    }
  }
}
</style>
