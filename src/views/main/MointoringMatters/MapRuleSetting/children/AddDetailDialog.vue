<template>
  <div>
    <vxe-modal v-model="addDetailDialogVisible" title="新增规则明细" @close="dialogClose">
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
      addDetailDialogVisible: false,
      formItemsConfig: [
        {
          field: 'indicatorsTargetvalue',
          title: '目标值',
          span: 24,
          itemRender: {
            name: '$vxeInput',
            props: {
              type: 'text',
              placeholder: '请输入目标值'
            }
          }
        },
        {
          field: 'indicatorsTargetvalueDesc',
          title: '目标值描述',
          span: 24,
          itemRender: {
            name: '$vxeInput',
            props: {
              type: 'text',
              placeholder: '请输入目标值描述'
            }
          }
        },
        {
          field: 'mapValue',
          title: '映射值',
          span: 24,
          itemRender: {
            name: '$vxeInput',
            props: {
              type: 'text',
              placeholder: '请输入映射值'
            }
          }
        },
        {
          field: 'mapValueDesc',
          title: '映射值描述',
          span: 24,
          itemRender: {
            name: '$vxeInput',
            props: {
              type: 'text',
              placeholder: '请输入映射值描述'
            }
          }
        }
      ],
      formValidationConfig: {
        indicatorsTargetvalue: [
          {
            required: true,
            type: 'string',
            trigger: 'change',
            message() {
              return '目标值不能为空'
            }
          }
        ],
        indicatorsTargetvalueDesc: [
          {
            required: true,
            type: 'string',
            trigger: 'change',
            message() {
              return '目标值描述不能为空'
            }
          }
        ],
        mapValue: [
          {
            required: true,
            type: 'string',
            trigger: 'change',
            message() {
              return '映射值不能为空'
            }
          }
        ],
        mapValueDesc: [
          {
            required: true,
            type: 'string',
            trigger: 'change',
            message() {
              return '映射值描述不能为空'
            }
          }
        ]
      },
      formData: {}
    }
  },
  methods: {
    dialogClose() {
      this.addDetailDialogVisible = false
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
