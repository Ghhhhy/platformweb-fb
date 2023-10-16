<!--处理弹框-->
<template>
  <div v-loading="tableLoading">
    <vxe-modal v-model="dialogVisible" :title="title" @close="dialogClose">
      <BsForm
        ref="refForm"
        :form-items-config="formItemsConfig"
        :form-data-list="formData"
        :form-validation-config="formValidationConfig"
        @itemChange="itemChange"
      />
      <el-divider />
      <div style="width: 100%; display: flex; justify-content: center">
        <vxe-button status="primary" @click="onSaveClick">保存</vxe-button>
        <vxe-button @click="dialogClose">取消</vxe-button>
      </div>
    </vxe-modal>
  </div>
</template>
<script>
import api from '@/api/frame/main/fundMonitoring/benefitEnterprisesInformation.js'
import VXETable from 'vxe-table'
import loadBsConfig from '@/views/main/dynamicTableSetting/config'
export default {
  name: 'HandleDialog',
  mixins: [loadBsConfig],
  props: {
    title: {
      type: String,
      default: ''
    },
    row: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      isAdd: true,
      tableLoading: false,
      dialogVisible: true,
      formData: {
        corpName: '',
        unifsocCredCode: '',
        corpType: '',
        corpAddress: '',
        corpPersonNum: '',
        isImportant: ''
      },
      formValidationConfig: {
        corpName: [
          {
            required: true,
            message: '请输入企业名称',
            trigger: 'change'
          }
        ],
        unifsocCredCode: [
          {
            required: true,
            message: '请输入企业社会统一征信代码',
            trigger: 'change'
          }
        ],
        // corpType: [
        //   {
        //     required: true,
        //     message: '请输入企业性质',
        //     trigger: 'change'
        //   }
        // ]
        corpAddress: [
          {
            required: true,
            message: '请输入办公地点',
            trigger: 'change'
          }
        ],
        // corpPersonNum: [
        //   {
        //     required: true,
        //     message: '请选择企业人数',
        //     trigger: 'change'
        //   }
        // ],
        isImportant: [
          {
            required: true,
            message: '请选择是否是重要企业',
            trigger: 'change'
          }
        ]
      },
      formItemsConfig: [
        {
          field: 'corpName',
          title: '企业名称',
          span: 12,
          itemRender: {
            name: '$vxeInput',
            props: {
              type: 'text',
              placeholder: '请输入企业名称'
            }
          }
        },
        {
          field: 'unifsocCredCode',
          title: '企业社会统一征信代码',
          span: 12,
          itemRender: {
            name: '$vxeInput',
            props: {
              type: 'text',
              placeholder: '请输入企业社会统一征信代码'
            }
          }
        },
        {
          field: 'corpType',
          title: '企业性质',
          span: 12,
          titleWidth: 100,
          titleAlign: 'left',
          itemRender: {
            name: '$vxeSelect',
            options: [
              { value: '0', label: '国企' },
              { value: '1', label: '民营企业' },
              { value: '2', label: '外企' },
              { value: '3', label: '其他' }
            ],
            props: { required: true, placeholder: '请选择企业性质' }
          }
        },
        {
          field: 'corpAddress',
          title: '办公地点',
          span: 12,
          itemRender: {
            name: '$vxeInput',
            props: {
              type: 'text',
              placeholder: '请输入办公地点'
            }
          }
        },
        {
          field: 'corpPersonNum',
          title: '企业人数',
          span: 12,
          titleWidth: 100,
          titleAlign: 'left',
          itemRender: {
            name: '$vxeInput',
            props: { required: true, placeholder: '请选择企业人数' }
          }
        },
        {
          field: 'isImportant',
          title: '是否是重要企业',
          span: 12,
          titleWidth: 100,
          titleAlign: 'left',
          itemRender: {
            name: '$vxeSelect',
            options: [
              { value: '0', label: '是' },
              { value: '1', label: '否' }
            ],
            props: { required: true, placeholder: '请选择是否是重要企业' }
          }
        }
      ]
    }
  },
  created() {
    this.formData = this.row
    console.log(Object.keys(this.formData).length === 0)
    Object.keys(this.formData).length === 0
      ? (this.isAdd = true)
      : (this.isAdd = false)
  },
  methods: {
    itemChange({ $form, property, itemValue, data }, bsform) {
      console.log(property, itemValue, data)
      this.formData = data
    },
    dialogClose() {
      this.dialogVisible = false
      this.formData = {}
      this.$emit('close')
    },
    onSaveClick() {
      // this.tableLoading = true
      const form = this.$refs.refForm.formOptionsFn()
      console.log(form, 'form_')
      var _this = this
      form
        .validate()
        .then(() => {
          console.log(this.formData)
          this.tableLoading = true
          if (_this.isAdd) {
            api.addTask(this.formData).then((res) => {
              if (res.code === '000000') {
                _this.$message.success('添加成功')
                _this.tableLoading = false
                this.dialogClose()
              }
            })
          } else {
            api.updateTask(_this.formData).then((res) => {
              if (res.code === '000000') {
                _this.$message.success('修改成功')
                _this.tableLoading = false
                this.dialogClose()
              }
            })
          }
        })
        .catch((err) => {
          _this.$message.error('添加失败')
          console.log('error', err)
          _this.tableLoading = false
        })
    }
  },
  watch: {},
  mounted() {},
  destoryed() {
    VXETable.renderer.delete('$customerFileRender')
  }
}
</script>
<style scoped>
::v-deep .vxe-modal--box {
  width: 800px;
  height: 380px;
}
::v-deep .vxe-form--item-inner {
  flex-direction: column;
  align-items: flex-start;
}
::v-deep .vxe-form--item-title {
  width: auto !important ;
}
::v-deep .vxe-form--item-content {
  width: 300px !important;
}
::v-deep .vxe-form .vxe-form--item-inner > .align--left {
  width: 100% !important;
}
</style>
