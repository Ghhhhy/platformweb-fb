<template>
  <div class="multi-add">
    <vxe-modal
      id="multiAdd"
      v-model="visible"
      width="1200"
      height="650"
      min-width="800"
      min-height="400"
      resize
      destroy-on-close
      transfer
    >
      <template v-slot:title>
        通过form表单新增8
      </template>
      <template>
        <div class="multi-add__content">
          <div class="multi-add__from">
            <BsForm
              ref="addForm"
              :form-config="{}"
              :is-editable="true"
              :form-items-config="formItemsConfig"
              :form-data-list.sync="formDataList"
              :form-validation-config="formValidationConfig"
            />
          </div>
          <div class="multi-add__footer">
            <vxe-button content="确定" status="primary" @click="confirmData" />
            <vxe-button content="取消" @click="closeDialog" />
          </div>
        </div>
      </template>
      <!-- <template v-slot:footer>
        <div class="multi-add__footer">
          <vxe-button content="确定" status="primary" @click="confirmData" />
          <vxe-button content="取消" @click="closeDialog" />
        </div>
      </template> -->
    </vxe-modal>
  </div>
</template>

<script>
export default {
  name: 'MultiAdd',
  props: {
    value: {
      type: Boolean
    }
  },
  data() {
    return {
      visible: this.value,
      formItemsConfig: [
        {
          field: 'payout_kind_',
          title: '支出项目类别',
          span: 8,
          itemRender: {
            name: '$formTreeInput',
            props: {
              isServer: true,
              isleaf: true,
              elecode: 'vw_payoutkind',
              serverUri: 'plan-service/queryTreeAssistData',
              queryparams: {
                useRight: false,
                batchno: 1,
                datatype: 1,
                eleCode: 'vw_payoutkind',
                sxspecroleguid: '999004'
              }
            }
          }
        },
        {
          field: 'name',
          title: '姓名',
          itemRender: {
            name: '$vxeFormInput',
            props: {
              type: 'text',
              placeholder: '请输入名称'
            }
          }
        },
        {
          field: 'sex',
          title: '性别',
          itemRender: {
            name: '$vxeFormSelect',
            options: [{
              value: 0,
              label: '女'
            }, {
              value: 1,
              label: '男'
            }],
            props: {
              placeholder: '请选择性别'
            }
          }
        }
      ],
      formDataList: {
        payout_kind_: '',
        name: 'John Brown',
        sex: 0
      },
      formValidationConfig: {
        payout_kind_: [
          {
            required: true,
            message: '请选择预算单位',
            trigger: 'change'
          }
        ],
        name: [
          {
            required: true,
            type: 'string',
            // message: '名称长度需在 3 到 5 个字符',
            message() {
              return '名称长度需在 2 到 20 个字符'
            },
            min: 2,
            max: 20,
            pattern: /^[a-zA-Z0-9_\s\u4e00-\u9fa5]+$/i,
            trigger: 'change'
          }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符' }
        ],
        sex: [
          {
            required: true,
            message: '请选择性别',
            trigger: 'change'
          }
        ]
      }
    }
  },
  methods: {
    // 关闭获取取消
    closeDialog() {
      this.visible = false
      // 关闭时，要重置数据，模态框再打开时才不会有留痕
      this.resetData()
    },

    // 确定
    confirmData() {
      const formData = this.$refs.addForm.getFormData()
      console.log(222, formData)
      // this.closeDialog()
    }

  },
  created() {

  },
  mounted() {
  },
  watch: {
    value(val) {
      this.visible = val
    },
    visible() {
      this.$emit('input', this.visible)
    }

  }
}
</script>

<style scoped lang="scss">
  .multi-add__content{
    .multi-add__footer{
      height: 40px;
      width: 100%;
      text-align: right;
      margin-top: 20px;
    }
  }
</style>
