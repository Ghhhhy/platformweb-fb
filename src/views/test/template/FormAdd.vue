
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
          <vxe-button v-preventClick="6000" status="primary" @click="onSureClick">确 定</vxe-button>
          <vxe-button code="reset" @click="dialogVisible = false">取 消</vxe-button>
        </div>
      </div>
      <BsTab :tab-list="tabList" :default-select="defaultSelect" />
      <div class="main-modulebox-tabcon ofa" style="height:calc(100% - 44px)">
        <BsForm
          v-if="isRenderForm"
          ref="addForm"
          :form-config="formConfig"
          :editable="true"
          :money-unit="moneyUnit"
          :form-items-config="formItemsConfig"
          :form-data-list="formData"
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
    formData: {
      type: Object,
      default() {
        return {}
      }
    },
    dialogVisible: {
      type: Boolean,
      default() {
        return false
      }
    }
  },
  data() {
    return {
      tabList: [
        { label: 'tabtabtabtabtabtabtabtab1', code: 1 },
        { label: 'tabtabtabtabtabtabtabtab2', code: 2 },
        { label: 'tabtabtabtabtabtabtabtab3', code: 3 },
        { label: 'tabtabtabtabtabtabtabtab4', code: 4 },
        { label: 'tabtabtabtabtabtabtabtab5', code: 5 },
        { label: 'tabtabtabtabtabtabtabtab6', code: 6 },
        { label: 'tabtabtabtabtabtabtabtab7', code: 7 },
        { label: 'tabtabtabtabtabtabtabtab8', code: 8 },
        { label: 'tabtabtabtabtabtabtabtab9', code: 9 },
        { label: 'tabtabtabtabtabtabtabtab10', code: 10 },
        { label: 'tabtabtabtabtabtabtabtab11', code: 11 },
        { label: 'tabtabtabtabtabtabtabtab12', code: 12 }
      ],
      defaultSelect: { label: 'tabtabtabtabtabtabtabtab1', code: 1 },
      moneyUnit: 1,
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
            name: '$vxeFormGroupTitle'
          }
        },
        {
          title: '预算单位',
          field: 'agency',
          align: 'left',
          itemRender: {
            name: '$vxeTree',
            props: {
              queryparams: {
                tokenid: 'b75ee9e2f1583f15b5259979c098549f',
                appguid: 'zfys',
                parameters: { 'eleCode': 'AGENCY', 'batchno': 2, 'sxspecroleguid': '7F6D5DF72BAA4D1A9A2D73B836D5309C', 'appguid': 'zfys' }
              },
              config: {
                disabled: false,
                multiple: true,
                readonly: false,
                format: '{code}-{name}',
                treeProps: {
                  // 树配置选项
                  labelFormat: '{code}-{name}', // {code}-{name}
                  nodeKey: 'id', // 树的主键
                  label: 'name', // 树的显示lalel字段
                  children: 'children' // 树的嵌套字段
                },
                axiosConfig: {
                  successCode: '200', // 成功code
                  statusField: 'rscode',
                  method: 'postStringify', // 请求方式
                  url: 'fb-govbudget-service/queryTreeAssistData?160464552085' // 'queryTreeAssistData', // 是否调用接口直接获取数据，当此项有值时将会自动家数据
                }
              }
            }
          }
        },
        {
          field: 'name',
          title: '姓名',
          itemRender: {
            name: '$vxeInput',
            slots: {
              prefix: {
                tip: '请输入姓名',
                ico: ''
              }
            },
            props: {
              editable: true,
              type: 'text',
              placeholder: '请输入名称'
            }
          }
        },
        {
          field: 'sex',
          title: '性别',
          itemRender: {
            name: '$vxeSelect',
            options: [{
              value: 0,
              label: '女'
            }, {
              value: 1,
              label: '男'
            }],
            props: {
              disabled: true,
              placeholder: '请选择性别'
            }
          }
        },
        {
          field: 'age',
          title: '年龄',
          itemRender: {
            name: '$vxeInput',
            props: {
              type: 'number',
              placeholder: '请输入年龄'
            }
          }
        },
        {
          field: 'otherInfo',
          groupTitle: '其他信息',
          span: 24,
          itemRender: {
            name: '$vxeFormGroupTitle',
            props: {
            }
          }
        },
        {
          field: 'interest',
          title: '兴趣爱好',
          span: 8,
          itemRender: {
            name: '$vxeCheckbox',
            options: [
              { value: '1', label: '绘画' },
              { value: '0', label: '棋牌' }
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
            name: '$vxeSelect',
            options: [
              { value: '前端', label: '前端' },
              { value: '后端', label: '后端' },
              { value: '运维', label: '测试' },
              { value: '实施', label: '实施' },
              { value: '测试', label: '测试' }
            ],
            props: {
              multiple: true,
              placeholder: '请输入角色'
            }
          }
        },
        {
          field: 'eduBack',
          title: '学历',
          itemRender: {
            name: '$vxeSelect',
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
          field: 'moneyUnit',
          title: '金额单位',
          span: 8,
          itemRender: {
            name: '$vxeSelect',
            options: [
              {
                value: 100000000,
                label: '亿元'
              },
              {
                value: 10000,
                label: '万元'
              },
              {
                value: 1,
                label: '元'
              }
            ],
            props: {
              disabled: false
            }
          }
        },
        {
          title: '收入',
          field: 'income',
          formula: '{age}>=18?Math.pow({age},4)/2:0',
          itemRender: {
            name: '$vxeMoney',
            props: {
              type: 'text',
              disabled: false,
              min: -1111111111,
              max: 10000000000000,
              placeholder: '请输入收入'
            }
          }
        },
        {
          title: '收入',
          field: 'bonus',
          itemRender: {
            name: '$vxeMoney',
            props: {
              type: 'text',
              disabled: false,
              min: -1111111111,
              max: 10000000000000,
              placeholder: '请输入收入'
            }
          }
        },
        {
          title: '是否在职',
          field: 'status',
          itemRender: {
            name: '$vxeRadio',
            options: [
              { value: '1', label: '是' },
              { value: '0', label: '否' }
            ],
            props: {
              placeholder: '是否在职'
            }
          }
        },
        {
          title: '通讯地址',
          field: 'address',
          align: 'left',
          span: 24,
          tooltip: true,
          itemRender: {
            name: '$vxeEditDownTextarea',
            props: {
              rows: 4,
              type: 'text',
              placeholder: '请填写通信地址,地址精确到小区门牌号。'
            }
          }
        },
        {
          title: 'In the time',
          field: 'time',
          span: 24,
          itemRender: {
            name: '$vxeTime',
            props: {
              format: 'YYYY-MM-DD',
              type: 'date', // "当前日期为：YYYY-MM-DD，星期W，为第Q季度，时间为：hh:mm:ss:c"
              placeholder: '入职时间'
            }
          }
        },
        {
          title: 'Working days',
          field: 'days',
          span: 24,
          itemRender: {
            name: '$vxeDays',
            defaultValue: 0,
            props: {
              placeholder: '在职天数',
              type: 'number'
            }
          }
        },
        {
          field: 'otherInfo',
          groupTitle: '条件渲染',
          span: 24,
          itemRender: {
            name: '$vxeFormGroupTitle',
            props: {
            }
          }
        },
        {
          title: '指标方向',
          field: 'indicatorsDirection',
          align: 'left',
          span: 8,
          isRenderConditions: true,
          filters: false,
          itemRender: {
            name: '$vxeSelect',
            options: [
              { value: '1', label: '大于' },
              { value: '2', label: '大于等于' },
              { value: '3', label: '等于' },
              { value: '4', label: '小于' },
              { value: '5', label: '小于等于' }
            ],
            props: {
              type: 'text',
              placeholder: '请录入指标方向'
            }
          }
        },
        {
          title: '指标性质',
          field: 'indicatorsNature',
          span: 8,
          align: 'left',
          filters: false,
          itemRender: {
            name: '$vxeRenderConditions',
            props: {
              format: '{indicatorsDirection}',
              default: {
                name: '$vxeInput',
                conditionsProps: {
                },
                props: {
                  type: 'text',
                  placeholder: '请录入三级指标'
                }
              },
              options: {
                default: {
                  name: '$vxeInput',
                  linkageRowValue: {

                  },
                  conditionsProps: {
                    diabled: '1?true:false',
                    editable: '1?true:false'
                  },
                  props: {
                    type: 'text',
                    placeholder: '请录入指标性质'
                  }
                },
                '1': {
                  name: '$vxeInput',
                  linkageValue: {

                  },
                  props: {
                    type: 'text',
                    placeholder: '请录入指标性质'
                  }
                },
                '2': {
                  name: '$vxeSelect',
                  options: [
                    { value: '1', label: '正向' },
                    { value: '2', label: '反向' },
                    { value: '3', label: '定性' }
                  ],
                  props: {
                    type: 'text',
                    placeholder: '请录入指标性质'
                  }
                }
              }
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
      // formDataCp: {
      //   name: '',
      //   nickname: '',
      //   age: '',
      //   sex: '',
      //   income: '',
      //   select: '',
      //   personality: '',
      //   treeinput: '',
      //   category: '',
      //   address: '',
      //   status: ''
      // },
      // formData: {
      //   name: 'John Brown',
      //   nickname: 'John Brown nick',
      //   age: 18,
      //   sex: 0,
      //   interest: 1,
      //   income: 100000,
      //   select: '001',
      //   personality: '',
      //   treeinput: '',
      //   category: '前端',
      //   bonus: 0,
      //   address: 'New York No. 1 Lake Park',
      //   status: 0
      // },
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
      // let sex = ['女', '男']
      // let age = ['优秀青年', '杰出中年', '颐养天年', '颐养天年', '颐养天年', '颐养天年']
      // switch (property) {
      //   case 'name' :
      //     this.formData = Object.assign({}, data, {
      //       age: 0,
      //       income: 0,
      //       personality: age[Math.floor(data.age / 25)] + sex[data.sex] })
      //     break
      //   case 'age' :
      //     this.formData = Object.assign({}, data, {
      //       income: 0,
      //       personality: age[Math.floor(data.age / 25)] + sex[data.sex]
      //     })
      //     break
      //   case 'sex' :
      //     this.formData = Object.assign({}, data, {
      //       income: 0,
      //       personality: age[Math.floor(data.age / 25)] + sex[data.sex]
      //     })
      //     break
      //   default :
      //     break
      // }
      // 以下为当formItemsConfig发生改变后视图不刷新时强制刷新方案
      // this.isRenderForm = false
      // this.$nextTick(() => {
      //   this.isRenderForm = true
      // })
      // 或者this.$set(this.formItemsConfig,index||key,this.formItemsConfig[index||key])
    }
  },
  mounted() {
    this.formDataCp = Object.assign({
      indicatorsDirection: '',
      indicatorsNature: ''
    }, this.formData)
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
