
<template>
  <div class="main-modulebox-tabcon ofa">
    <BsForm
      v-if="isRenderForm"
      ref="addForm"
      :form-config="formConfig"
      :is-editable="true"
      :form-items-config="formItemsConfig"
      :form-data-list.sync="formDataList"
      :form-validation-config="formValidationConfig"
      @itemChange="itemChange"
    />
  </div>
</template>

<script>
export default {
  name: 'FormAdd',
  components: {
  },
  data() {
    return {
      formConfig: {
        axiosDatas: {
          saveData({ data }) {
            console.log('saveData', data)
          }
        }
      },
      formItemsConfig: [
        {
          title: '预算单位',
          field: 'agency_',
          width: 200,
          editRender: {
            name: '$formTreeInput',
            props: {
              isServer: true,
              elecode: 'AGENCY',
              disabled: true,
              queryparams: {
                eleCode: 'AGENCY',
                sxspecroleguid: '3250FC3332E1421DA1B0388AA0D34BDC'
              }
            }
          }
        },
        {
          field: 'payout_kind_',
          title: '支出项目类别',
          span: 8,
          itemRender: {
            name: '$formTreeInput',
            props: {
              isServer: true,
              isleaf: true,
              elecode: 'DEPBGTECO',
              serverUri: 'fiscal-config/queryTreeAssistData',
              queryparams: {
                useRight: false,
                batchno: 2,
                datatype: 5,
                eleCode: 'DEPBGTECO',
                sxspecroleguid: '637B6D5A823F459AB313CBF94C87765B'
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
        agency_: '',
        payout_kind_: '',
        name: 'John Brown',
        sex: 0
      },
      formValidationConfig: {
        agency_: [
          {
            required: true,
            message: '请选择预算单位',
            trigger: 'change'
          }
        ],
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
      },
      isRenderForm: true
    }
  },
  methods: {
    onSureClick() {
      let self = this
      let form = this.$refs.addForm.formOptionsFn()
      let formSubmit = new Promise((resolve, reject) => {
        form.validate().then(() => {
          resolve(form.data)
          console.log(form.data)
          self.dialogVisible = false
        }).catch(e => {
          reject(new Error('校验失败'))
        })
      })

      Promise.all([formSubmit]).then((result) => {
        // ['成功了', 'success']
        console.log(form.data, form.data)
        self.dialogVisible = false
      }).catch((error) => {
        console.log(error)
      })
    },
    itemChange({ $form, property, itemValue, data }, bsform) {
      console.log('111', bsform.getFormData())
      // form表单联动当前字段change事件代理
      let sex = ['女', '男']
      let age = ['优秀青年', '杰出中年', '颐养天年', '颐养天年', '颐养天年', '颐养天年']
      switch (property) {
        case 'name' :
          this.formDataList = Object.assign({}, data, {
            age: 0,
            income: 0,
            personality: age[Math.floor(data.age / 25)] + sex[data.sex] })
          break
        case 'age' :
          this.formDataList = Object.assign({}, data, {
            income: 0,
            personality: age[Math.floor(data.age / 25)] + sex[data.sex]
          })
          break
        case 'sex' :
          this.formDataList = Object.assign({}, data, {
            income: 0,
            personality: age[Math.floor(data.age / 25)] + sex[data.sex]
          })
          break
        default :
          break
      }
      // 以下为当formItemsConfig发生改变后视图不刷新时强制刷新方案
      // this.isRenderForm = false
      // this.$nextTick(() => {
      //   this.isRenderForm = true
      // })
      // 或者this.$set(this.formItemsConfig,index||key,this.formItemsConfig[index||key])
    }
  },
  mounted() {
  },
  watch: {

  }
}
</script>

<style lang='scss'>
</style>
