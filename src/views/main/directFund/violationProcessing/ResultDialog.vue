<-- 报表任务录入弹窗-->
<template>
  <vxe-modal
    v-model="visible"
    v-loading="showLoading"
    :title="title"
    width="35%"
    height="68%"
    position="top"
    :show-footer="true"
    @close="closeAddDialog"
  >
    <div v-loading="isSubmitting">
      <BsForm
        ref="addForm"
        :form-items-config="addFormItemsConfig"
        :form-data-list="formData"
        :form-validation-config="formValidationConfig"
        :form-config="formConfig"
        @itemChange="itemChange"
      />
    </div>
    <div slot="footer" class="vxeModalUnique" style="height: 80px;">
      <el-divider style="color:#E7EBF0" />
      <el-row type="flex" justify="space-around" style="margin-bottom:14px;margin-top:0px;">
        <el-col :span="8" style="margin-top:10px;" />
        <el-col :span="4" />
        <el-col :span="12" style="margin-top:0px;float:right;">
          <div>
            <el-button @click="closeAddDialog">取消</el-button>
            <el-button type="primary" style="margin-right:0px;" @click="addOrUpdate">保存</el-button>
          </div>
        </el-col>
      </el-row>
    </div>
  </vxe-modal>
</template>

<script>

import api from '@/api/frame/main/directFund/dfrViolationProcessingBill'

export default {
  name: 'ResultDialog',
  props: {
    title: {
      type: String,
      default: ''
    },
    dialogVisible: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      showAddPlanDialogView: true,
      showLoading: false,
      formData: {
        id: '',
        billNo: '',
        violationType: '',
        identificationResult: '',
        agencyCode: '',
        violationDisc: '',
        rectificationRequirement: '',
        rectificationDate: '',
        handler: '',
        processingResult: '',
        processingDate: '',
        status: '0'
      },
      formData1: [],
      visible: this.dialogVisible,
      addFormItemsConfig: [
        {
          field: 'billNo',
          title: '单号',
          span: 24,
          align: 'center',
          disabled: true,
          itemRender: { name: '$vxeNewInput', props: { type: 'string', disabled: true } }
        },
        {
          field: 'identificationResult',
          title: '认定结果',
          span: 24,
          disabled: true,
          itemRender: {
            disabled: true,
            name: '$vxeSelect',
            options: [
              {
                value: '正常',
                label: '正常'
              },
              {
                value: '违规',
                label: '违规'
              }
            ],
            props: {
              disabled: true
            }
          }
        },
        {
          field: 'violationType',
          title: '违规类型',
          span: 24,
          disabled: true,
          itemRender: {
            name: '$vxeSelect',
            disabled: true,
            options: [
              {
                value: '指标使用不当',
                label: '指标使用不当'
              },
              {
                value: '支出进度太慢',
                label: '支出进度太慢'
              },
              {
                value: '资金使用方向错误',
                label: '资金使用方向错误'
              },
              {
                value: '资金超支',
                label: '资金超支'
              }
            ],
            props: {
              disabled: true
            }
          }
        },
        {
          field: 'violationDisc',
          title: '违规事项描述',
          disabled: true,
          span: 24,
          itemRender: { name: '$vxeNewInput', props: { type: 'string', disabled: true } }
        },
        {
          field: 'rectificationRequirement',
          title: '整改要求',
          disabled: true,
          span: 24,
          itemRender: { name: '$vxeNewInput', props: { type: 'string', disabled: true } }
        },
        {
          field: 'rectificationDate',
          title: '责令处理时间',
          disabled: true,
          span: 24,
          itemRender: { name: '$vxeNewInput', props: { type: 'date', placeholder: '请选择日期', disabled: true } }
        },
        {
          field: 'handler',
          title: '处理人',
          disabled: false,
          span: 24,
          itemRender: { name: '$vxeNewInput', props: { type: 'string' } }
        },
        {
          field: 'processingResult',
          title: '处理结果',
          disabled: false,
          span: 24,
          itemRender: { name: '$vxeNewInput', props: { type: 'string' } }
        },
        {
          field: 'processingDate',
          title: '处理时间',
          disabled: false,
          span: 24,
          itemRender: { name: '$vxeNewInput', props: { type: 'date', placeholder: '请选择日期' } }
        }
        // {
        //   field: 'status',
        //   title: '单据状态',
        //   // disabled: true,
        //   span: 24,
        //   itemRender: {
        //     name: '$vxeSwitch',
        //     props: {
        //       disabled: true
        //     },
        //     options: [
        //       {
        //         value: '1',
        //         label: '有效'
        //       },
        //       {
        //         value: '0',
        //         label: '无效'
        //       }
        //     ]
        //   }
        // }
      ]
    }
  },
  mounted() {

  },
  watch: {
    dialogVisible(val) {
      this.visible = val
    }
  },
  methods: {
    itemChange(property, value, dataList, itemsConfig) {
      this.formData = property.data
    },
    setForData(data) {
      // this.formData = data
      // this.formData.handler = ''
      // this.formData.processingResult = ''
      // this.formData.processingDate = ''
      this.formData.id = data.id
      this.formData.billNo = data.billNo
      this.formData.violationType = data.violationType
      this.formData.identificationResult = data.identificationResult
      this.formData.agencyCode = data.agencyCode
      this.formData.violationDisc = data.violationDisc
      this.formData.rectificationRequirement = data.rectificationRequirement
      this.formData.rectificationDate = data.rectificationDate
      this.formData.status = data.status
    },
    closeAddDialog() {
      this.$refs['addForm'].reset()
      this.$parent.addDialogVisible = false
      this.visible = false
    },
    addOrUpdate() {
      // if (this.formData.taskEndDate < this.formData.taskStartDate) {
      //   this.$message.error('截止日期不能晚于开始日期')
      //   return
      // }
      this.showLoading = true
      var _this = this
      _this.formData1[0] = _this.formData
      api.updateProc(_this.formData1)
        .then(res => {
          _this.showLoading = false
          if (res.code === '000000') {
            _this.$refs['addForm'].reset()
            _this.$parent.addDialogVisible = false
            _this.$parent.initTableDate()
            _this.visible = false
          }
        })
        .catch()
    },
    transJson(str) {
      if (!str) return
      var params = str.split(',')
      var result = {}
      if (params && params.length > 0) {
        for (var i = 0; i < params.length; i++) {
          var map = params[i].split('=')
          result[map[0]] = map[1]
        }
      }
      return result
    }
  }
}
</script>
<style lang="scss">
.vxeModalUnique {
  .el-divider--horizontal {
    display: block;
    height: 1px;
    width: 100%;
    margin-top: 0px;
    margin-bottom: 20px;
  }
}
.body{
  margin-left: 14px;
  margin-right: 14px;
  // max-height: 650px;
  .vxe-input--inner{
    text-align: center;
  }
  .vxe-input{
    height: 40px;
    width: 100%;
  }
  // 头部 table 样式
  .header-table{
    margin-top: 16px;
  }
  // 覆盖 el-divider 样式
  .el-divider--horizontal {
    display: block;
    height: 1px;
    width: 100%;
    margin-top: 2px;
    margin-left: 0px;
    margin-bottom: 0px;
  }
}
</style>
