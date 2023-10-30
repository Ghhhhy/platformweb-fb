<template>
  <div>
    <vxe-modal v-model="dialogVisible" title="新增" @close="dialogClose">
      <BsForm
        ref="refForm"
        :form-items-config="formItemsConfig"
        :form-validation-config="formValidationConfig"
        :form-data-list="formData"
      />
      <div style="width: 100%;display: flex;justify-content: center;margin-top: 10px;">
        <vxe-button status="primary" @click="onSureClick">确定</vxe-button>
        <vxe-button @click="dialogClose">取消</vxe-button>
      </div>
    </vxe-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false,
      formItemsConfig: [
        {
          field: 'fiRuleCode',
          title: '规则编码',
          span: 24,
          itemRender: {
            name: '$vxeInput',
            props: {
              type: 'text',
              placeholder: '请输入规则编码'
            }
          }
        },
        {
          field: 'ruleDes',
          title: '规则描述',
          span: 24,
          itemRender: {
            name: '$vxeInput',
            props: {
              type: 'text',
              placeholder: '请输入规则描述'
            }
          }
        },
        {
          field: 'remark',
          title: '备注',
          span: 24,
          itemRender: {
            name: '$vxeInput',
            props: {
              type: 'text',
              placeholder: '请输入备注'
            }
          }
        }
      ],
      formValidationConfig: {
        fiRuleCode: [
          {
            required: true,
            type: 'string',
            trigger: 'change',
            message() {
              return '规则编码不能为空'
            }
          }
        ],
        ruleDes: [
          {
            required: true,
            type: 'string',
            trigger: 'change',
            message() {
              return '规则描述不能为空'
            }
          }
        ]
      },
      formData: {}
    }
  },
  methods: {
    dialogClose() {
      this.dialogVisible = false
    },
    onSureClick() {
      const form = this.$refs.refForm.formOptionsFn()
      form.validate().then((res) => {
        this.$message({
          showClose: true,
          message: '校验成功',
          type: 'success'
        })
      }).catch(err => {
        console.log('error', err)
      })
    }
  }
}
</script>

<style scoped>
::v-deep .vxe-modal--box {
  width: 40%;
  height: 40%;
}
::v-deep .vxe-form--item-title {
  width: 120px !important;
}
</style>
