
<template>
  <vxe-modal
    v-model="dialogVisible"
    title="infortable"
    width="90%"
    height="90%"
    :position="{ top: '8%',left: '5%' }"
    resize
    remember
    transfer
  >
    <div class="height-all">
      <div class="option-line-group">
        <div class="fn-inline option-line-group-btn">
          <vxe-button status="primary" @click="onSureClick">确 定</vxe-button>
          <vxe-button code="reset" @click="dialogVisible = false">取 消</vxe-button>
        </div>
      </div>
      <div class="main-modulebox-tabcon ofa" style="height:calc(100% - 44px)">
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
    </div>
  </vxe-modal>
</template>

<script>
export default {
  name: 'FormAdd',
  components: {
  },
  props: {
    dialogVisible: {
      type: Boolean,
      default() {
        return false
      }
    }
  },
  data() {
    return {
      formConfig: {
        // renderers: {
        //   $personality: {
        //     // 项显示模板
        //     renderItem(h, { props }, { data, property }) {
        //       let sex = ['女', '男']
        //       let age = ['优秀青年', '杰出中年', '颐养天年', '颐养天年', '颐养天年', '颐养天年']
        //       let value = age[Math.floor(data.age / 25)] + sex[data.sex]
        //       data.property = value
        //       return [
        //         <vxe-input readonly v-model={ data.property } { ...{ props } }></vxe-input>
        //       ]
        //     }
        //   }
        // },
        // formRenderConfig: {},
        axiosDatas: {
          saveData({ data }) {
            console.log('saveData', data)
          }
        }
      },
      formItemsConfig: [
        {
          field: 'basicInfo',
          groupTitle: '基础信息',
          span: 24,
          itemRender: {
            name: '$groupTitle'
          }
        },
        // {
        //   field: 'name',
        //   title: '名称',
        //   span: 24,
        //   itemRender: {
        //     name: '$input',
        //     props: {
        //       disabled: true,
        //       type: 'text',
        //       placeholder: '请输入名称'
        //     }
        //   }
        // },
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
        },
        {
          field: 'age',
          title: '年龄',
          itemRender: {
            name: '$vxeFormInput',
            props: {
              type: 'number',
              placeholder: '抢输入年龄'
            }
          }
        },
        {
          field: 'otherInfo',
          groupTitle: '其他信息',
          span: 24,
          itemRender: {
            name: '$groupTitle',
            props: {
              placeholder: '请输入角色'
            }
          }
        },
        {
          field: 'interest',
          title: '兴趣爱好',
          span: 8,
          itemRender: {
            name: '$vxeFormCheckbox',
            options: [
              { value: 1, label: '绘画' },
              { value: 0, label: '棋牌' }
            ],
            props: {
              placeholder: '请选择兴趣'
            }
          }
        },
        {
          field: 'category',
          title: '角色',
          itemRender: {
            name: '$vxeFormSelect',
            options: [
              { value: '前端', label: '前端' },
              { value: '后端', label: '后端' },
              { value: '运维', label: '测试' },
              { value: '实施', label: '实施' },
              { value: '测试', label: '测试' }
            ],
            props: {
              placeholder: '请输入角色'
            }
          }
        },
        {
          field: 'select',
          title: '学历',
          itemRender: {
            name: '$vxeFormSelect',
            options: ((str) => {
              return str.split('+').map((item, index) => {
                return { value: item.split('#')[0], label: item.split('#')[1] }
              })
            })('009#博士后+001#小学+002#初中+003#高中+004#中专+005#大专+006#本科+007#硕士+008#博士'),
            props: {
              placeholder: '请选择学历'
            }
          }
        },
        {
          title: '收入',
          field: 'income',
          itemRender: {
            name: '$vxeFormInput',
            props: {
              type: 'float',
              min: 0,
              max: 10000000000000,
              placeholder: '请输入收入'
            }
          }
        },
        {
          field: 'personality',
          title: '人员类型',
          itemRender: {
            name: '$vxeFormInput',
            props: {
              readonly: true,
              type: 'string',
              clearable: true,
              placeholder: '人员类型'
            }
          }
        },
        {
          title: '是否在职',
          field: 'status',
          itemRender: {
            name: '$vxeFormRadio',
            options: [
              { value: 1, label: '是' },
              { value: 0, label: '否' }
            ],
            props: {
              placeholder: '是否在职'
            }
          }
        },
        {
          title: '通讯地址',
          field: 'address',
          align: 'center',
          span: 24,
          tooltip: true,
          itemRender: {
            name: 'textarea',
            props: {
              rows: 4,
              type: 'text',
              placeholder: '请填写通信地址,地址精确到小区门牌号。'
            }
          }
        }
        // {
        //   align: 'center',
        //   span: 24,
        //   itemRender: {
        //     name: '$buttons',
        //     children: [{
        //       props: {
        //         type: 'submit',
        //         content: '提交',
        //         status: 'primary'
        //       }
        //     }, {
        //       props: {
        //         type: 'reset',
        //         content: '重置'
        //       }
        //     }]
        //   }
        // },
      ],
      formDataListCp: {
        name: '',
        nickname: '',
        age: '',
        sex: '',
        income: '',
        select: '',
        personality: '',
        treeinput: '',
        category: '',
        address: '',
        status: ''
      },
      formDataList: {
        name: 'John Brown',
        nickname: 'John Brown nick',
        age: 18,
        sex: 0,
        interest: 1,
        income: 100000,
        select: '001',
        personality: '',
        treeinput: '',
        category: '前端',
        bonus: 0,
        address: 'New York No. 1 Lake Park',
        status: 0
      },
      formValidationConfig: {
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
        nickname: [
          {
            required: true,
            type: 'string',
            message: '请输入昵称',
            trigger: 'change',
            // eslint-disable-next-line no-useless-escape
            // pattern: /^[a-zA-Z0-9_\(\)\{\}·.、\[\]\（\）\【\】\u4e00-\u9fa5]+$/i
            validator({ itemValue, rule, rules, data, property, $form }) {
              return new Promise((resolve, reject) => {
                let result = false
                if (data.type === 'shengfenz') {
                  // eslint-disable-next-line no-useless-escape
                  result = /^[a-zA-Z0-9_\(\)\{\}·.、\[\]\（\）\【\】\u4e00-\u9fa5]+$/i.test(itemValue)
                } else {
                  result = true
                }
                if (result) {
                  resolve(true)
                } else {
                  reject(new Error(
                    '校验失败'
                  ))
                }
              })
            }
          }
        ],
        sex: [
          {
            required: true,
            message: '请选择性别',
            trigger: 'change'
          }
        ],
        age: [
          {
            required: true,
            message: '请输入年龄',
            min: 1,
            max: 150,
            type: 'number',
            trigger: 'change'
          }
        ],
        eduBack: [
          {
            required: true,
            message: '请选择education background',
            trigger: 'change'
          }
        ],
        // category: [
        //   {
        //     required: true,
        //     message: '请选择角色',
        //     trigger: 'change'
        //   }
        // ],
        income: [
          {
            required: true,
            message: '请输入收入',
            trigger: 'change'
          }
        ],
        personality: [
          {
            required: true,
            message: '请选择角色',
            trigger: 'change'
          }
        ],
        address: [
          {
            required: true,
            message: '请填写通信地址',
            trigger: 'change'
          }
        ],
        status: [
          {
            required: true,
            message: '请选择是否在职',
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
    this.formDataListCp = Object.assign({}, this.formDataList)
  },
  watch: {
    dialogVisible: {
      handler(newval) {
        this.$emit('update:dialogVisible', newval)
      },
      deep: true,
      immediate: true
    }
  }
}
</script>

<style lang='scss'>
</style>
