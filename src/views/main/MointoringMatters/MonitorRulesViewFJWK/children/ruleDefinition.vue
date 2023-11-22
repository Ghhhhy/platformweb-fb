<template>
  <div class="ruleDefinition">
    <!-- <vxe-button @click="log">测试</vxe-button> -->
    <vxe-form
      ref="vxeForm"
      class="vxeForm"
      v-bind="formStaticAttrs"
      :data="formData"
      :rules="formRules"
    >
      <vxe-form-item v-for="(item,index) in formItems" :key="index" v-bind="item" />
    </vxe-form>
    <BsTable
      ref="ruleTable"
      height="300px"
      class="ruleTable"
      v-bind="tableStaticConfig"
      :edit-rules="editRules"
      :table-columns-config="ruleTableColumns"
      :table-data="formData.regulationConfig"
    >
      <template v-slot:column-editParam="{ row, column }">
        <div class="custom-cell" style="font-size: 14px">
          <div v-if="row.paramType !== '5'">
            <vxe-input v-model="row.param" />
          </div>
          <div v-else>
            <vxe-select
              v-model="row.param"
              :options="functionSelectOptions"
              :option-props="{ label: 'value', value: 'regId' }"
              :placeholder="column.title"
            />
          </div>
        </div>
      </template>
      <template v-slot:column-defaultParam="{ row }">
        <span>{{ getFunctionLabel(row.param) }}</span>
      </template>
    </BsTable>

  </div>
</template>

<script>
const RELATION = [
  { value: '1', label: '等于' },
  { value: '2', label: '大于' },
  { value: '3', label: '小于' },
  { value: '4', label: '包含' },
  { value: '5', label: '不包含' },
  { value: '6', label: '大于等于' },
  { value: '7', label: '小于等于' },
  { value: '8', label: '开头' },
  { value: '9', label: '不等于' },
  { value: '10', label: '不为开头' }
]
const PARAM_TYPE_OPTION = [
  { value: '1', label: '文本' },
  { value: '2', label: '数字' },
  { value: '3', label: '值域' },
  { value: '4', label: '值集' }
]
const REGULATION_TYPE_OPTION = [
  { value: 1, label: '系统级' },
  { value: 2, label: '财政级' },
  { value: 3, label: '部门级' }
]
const TRIGGER_CLASS_OPTION = [
  { value: 1, label: '事中(实时)' },
  { value: 2, label: '定时触发' }
]
const WARN_LOCATION_OPTION = [
  { value: 1, label: '门户' },
  { value: 2, label: '核算' },
  { value: 3, label: '不提示' }
]
const RULE_FLAG_OPTION = [
  { value: 0, label: '或' },
  { value: 1, label: '且' }
]
const UPLOAD_FILE_OPTION = [
  { value: 0, label: '否' },
  { value: 1, label: '是' }
]
export default {
  props: {
    // eslint-disable-next-line
    value: {
      type: Object
    },
    viewType: {
      type: String,
      default: 'detail'
    }
  },
  computed: {
    formData: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      }
    },
    formItems() {
      return [
        {
          title: '业务模块',
          field: 'businessModuleCode',
          itemRender: {
            name: '$vxeTree',
            options: this.bussnessModuleOption,
            props: {
              config: {
                valueKeys: ['id', 'businessName'],
                format: '{businessName}',
                highlightCurrent: true,
                treeProps: {
                  nodeKey: 'id',
                  children: 'children',
                  label: 'businessName',
                  labelFormat: '{id}-{businessName}'
                },
                placeholder: '请选择监控规则名称',
                multiple: false,
                isleaf: true,
                disabled: this.viewType === 'detail'
              },
              value: '1##预算管理一体化系统##',
              placeholder: '请选择业务模块'
            }
          }
        },
        {
          title: '监控规则编码',
          field: 'regulationCode',
          itemRender: {
            name: '$input',
            props: {
              placeholder: '请输入监控规则编码',
              clearable: true,
              disabled: this.viewType === 'detail',
              value: this.formData.regulationCode
            }

          }
        },
        {
          title: '监控规则名称',
          field: 'regulationName',
          itemRender: {
            name: '$input',
            props: {
              clearable: true,
              placeholder: '请输入监控规则名称',
              disabled: this.viewType === 'detail',
              value: this.formData.regulationName
            }
          }
        },
        {
          title: '监控主题',
          field: 'regulationClass',
          itemRender: {
            name: '$vxeTree',
            options: this.regulationClassOption,
            props: {
              config: {
                valueKeys: ['code', 'ruleName'],
                highlightCurrent: true,
                format: '{ruleName}',
                treeProps: {
                  nodeKey: 'id,ruleName,code',
                  children: 'children',
                  label: 'ruleName'
                  // labelFormat: '{code}-{ruleName}'
                },
                placeholder: '请选择监控规则名称',
                multiple: false,
                isleaf: true,
                disabled: this.viewType === 'detail'
              },
              value: '0202##转移支付##',
              placeholder: '规则模板名称'
            }
          }
        },
        {
          title: '数据来源',
          field: 'fiSourceDesc',
          itemRender: {
            name: '$select',
            options: [],
            props: {
              clearable: true,
              disabled: this.viewType === 'detail',
              placeholder: '请选择数据来源',
              value: this.formData.fiSourceDesc
            }
          }
        },
        {
          title: '是否启用',
          field: 'isEnable',
          itemRender: {
            name: '$switch',
            value: Number(this.formData.isEnable),
            props: {
              disabled: this.viewType === 'detail',
              openValue: 1,
              closeValue: 0
            }
          }
        },
        {
          title: '支出标准',
          field: 'ZCBZ',
          itemRender: {
            name: '$select',
            options: [
              { label: '法定标准', value: '1' }
            ],
            props: {
              clearable: true,
              disabled: this.viewType === 'detail',
              placeholder: '请选择支出标准',
              value: '1'
            }
          }
        },
        {
          title: '规则设置主体',
          field: 'regulationType',
          itemRender: {
            name: '$select',
            options: REGULATION_TYPE_OPTION,
            props: {
              clearable: true,
              disabled: this.viewType === 'detail',
              placeholder: '请选择规则设置主体',
              value: this.formData.regulationType
            }
          }
        },
        {
          title: '监控处理方式',
          field: 'handleType',
          itemRender: {
            name: '$select',
            options: this.$store.state.warnInfo.warnControlTypeOptions.map(item => {
              return {
                label: item.warnTips,
                value: item.value
              }
            }),
            props: {
              clearable: true,
              placeholder: '请选择监控处理方式',
              disabled: this.viewType === 'detail',
              value: this.formData.handleType
            }
          }

        },
        { // 查询条件的配置 预警选择下拉框
          title: '预警级别',
          field: 'warnLevel',
          itemRender: {
            name: '$vxeSelect',
            options: this.$store.state.warnInfo.warnLevelOptions.map(item => {
              return {
                ...item,
                value: String(item.value)
              }
            }),
            props: {
              disabled: this.viewType === 'detail',
              placeholder: '请选择预警级别',
              value: String(this.formData.warningLevel)
            }
          }
        },
        {
          title: '监控阶段',
          field: 'triggerClass',
          itemRender: {
            name: '$select',
            options: TRIGGER_CLASS_OPTION,
            props: {
              clearable: true,
              disabled: this.viewType === 'detail',
              placeholder: '请选择监控阶段'
            }
          }
        },
        {
          title: '监控规则类型',
          field: 'fiRuleTypeCode',
          itemRender: {
            name: '$select',
            options: [
              { label: `${this.formData.fiRuleTypeCode}-${this.formData.fiRuleTypeName}`, value: this.formData.fiRuleTypeCode }
            ],
            props: {
              clearable: true,
              disabled: this.viewType === 'detail',
              placeholder: '请选择监控规则类型'
            }
          }
        },
        {
          title: '提醒位置',
          field: 'warnLocation',
          itemRender: {
            name: '$select',
            options: WARN_LOCATION_OPTION,
            props: {
              clearable: true,
              disabled: this.viewType === 'detail',
              placeholder: '请选择提醒位置'
            }
          }
        },
        {
          title: '规则逻辑关系',
          field: 'ruleFlag',
          itemRender: {
            name: '$select',
            options: RULE_FLAG_OPTION,
            props: {
              clearable: true,
              disabled: this.viewType === 'detail',
              placeholder: '请选择规则逻辑关系'
            }
          }
        },
        {
          title: '是否附件必传',
          field: 'uploadFile',
          itemRender: {
            name: '$select',
            options: UPLOAD_FILE_OPTION,
            props: {
              clearable: true,
              disabled: this.viewType === 'detail',
              placeholder: '请选择是否附件必传',
              value: Number(this.formData.uploadFile)
            }
          }
        },
        {
          title: '预警提示',
          field: 'warningTips',
          class: 'one-row',
          itemRender: {
            name: '$textarea',
            props: {
              clearable: true,
              disabled: this.viewType === 'detail',
              placeholder: '请输入预警提示'
            }
          }
        },
        {
          title: '规则描述',
          field: 'fiRuleDesc',
          class: 'one-row',
          itemRender: {
            name: '$textarea',
            props: {
              clearable: true,
              disabled: this.viewType === 'detail',
              placeholder: '请输入规则描述'
            }
          }
        },
        {
          title: '规则依据',
          field: 'implDesc',
          class: 'one-row',
          itemRender: {
            name: '$textarea',
            props: {
              clearable: true,
              disabled: this.viewType === 'detail',
              placeholder: '请输入规则依据'
            }
          }
        },
        {
          title: '白名单描述',
          field: 'des',
          class: 'one-row',
          itemRender: {
            name: '$textarea',
            props: {
              clearable: true,
              disabled: this.viewType === 'detail',
              placeholder: '请输入规则依据'
            }
          }
        },
        {
          title: '白名单依据',
          field: 'basis',
          class: 'one-row',
          itemRender: {
            name: '$textarea',
            props: {
              clearable: true,
              disabled: this.viewType === 'detail',
              placeholder: '请输入规则依据'
            }
          }
        },
        {
          title: '文件法规名称',
          field: 'regulationsName',
          class: 'one-row',
          itemRender: {
            name: '$textarea',
            props: {
              clearable: true,
              disabled: this.viewType === 'detail',
              placeholder: '请输入规则依据'
            }
          }
        }
      ]
    },
    ruleTableColumns() {
      return [
        {
          title: '函数名称',
          field: 'functionName',
          sortable: false,
          align: 'left'
        },
        {
          title: '函数参数',
          field: 'functionParameter',
          sortable: false,
          align: 'left'
        },
        {
          title: '函数描述',
          field: 'description',
          sortable: false,
          align: 'left'
        },
        {
          title: '关系',
          field: 'relation',
          align: 'left',
          sortable: false,
          formula: '',
          name: '$vxeSelect',
          editRender: {
            name: '$vxeSelect',
            options: RELATION,
            props: {
              placeholder: '关系'
            }
          }
        },
        {
          title: '值类型',
          field: 'paramType',
          sortable: false,
          align: 'left',
          formula: '',
          name: '$vxeSelect',
          editRender: {
            name: '$vxeSelect',
            options: PARAM_TYPE_OPTION,
            props: {
              placeholder: '关系'
            }
          }
        },
        {
          title: '参数值',
          sortable: false,
          field: 'param',
          align: 'left',
          formula: '',
          name: '$vxeInput',
          editRender: {
            name: '$vxeInput',
            options: [],
            props: {
              placeholder: '参数值'
            }
          }
        }
      ]
    },
    formRules() {
      return {
        businessModuleCode: [
          { required: true, message: '请选择违规类型', trigger: 'change' }
        ],
        fiRuleCode: [
          { required: true, message: '请输入监控规则编码' }
        ],
        fiRuleName: [
          { required: true, message: '请输入监控规则名称' }
        ],
        regulationClass: [
          { required: true, message: '请选择监控规则名称', trigger: 'change' }
        ],
        fiSourceDesc: [
          { required: true, message: '请选择数据来源', trigger: 'change' }
        ],
        isEnable: [
          { required: true, type: 'boolean', message: '请选择是否启用', trigger: 'change' }
        ],
        ZCBZ: [
          { required: true, message: '请选择支出标准', trigger: 'change' }
        ],
        regulationType: [
          { required: true, message: '请选择规则设置主体', trigger: 'change' }
        ],
        handleType: [
          { required: true, message: '请选择监控处理方式', trigger: 'change' }
        ],
        warnLevel: [
          { required: true, message: '请选择预警级别', trigger: 'change' }
        ],
        triggerClass: [
          { required: true, message: '请选择监控阶段', trigger: 'change' }
        ],
        fiRuleTypeCode: [
          { required: true, message: '请选择监控规则类型', trigger: 'change' }
        ],
        warnLocation: [
          { required: true, message: '请选择提醒位置', trigger: 'change' }
        ],
        ruleFlag: [
          { required: true, message: '请选择规则逻辑关系', trigger: 'change' }
        ],
        triggerCond: [
          { required: true, message: '请输入预警提示' }
        ],
        fiRuleDesc: [
          { required: true, message: '请输入规则描述' }
        ],
        implDesc: [
          { required: true, message: '请输入规则描述' }
        ]
      }
    }
  },
  data() {
    return {
      formStaticAttrs: {
        titleAlign: 'right',
        titleWidth: '120',
        titleColon: true,
        customLayout: false,
        disabled: this.viewType === 'detail'
      },
      bussnessModuleOption: [],
      regulationClassOption: [],
      tableStaticConfig: {
        tableConfig: {
          globalConfig: {
            // 全局配置
            checkType: this.viewType === 'detail' ? false : 'checkbox', // hasCheckbox
            seq: true // 序号列
          },
          wordLength: 7 // 全局配置单元格超过多少个字符鼠标划过单元格就出提示 默认7
        },
        autoResize: true,
        tableGlobalConfig: {
          showOverflow: false
        },
        footerConfig: { showFooter: false },
        toolbarConfig: false,
        pagerConfig: false,
        editConfig: {
          trigger: 'dblclick',
          mode: 'cell',
          editable: this.viewType !== 'detail'// 是否禁用编辑
        }
      },
      editRules: {
        param: [{ required: true, type: 'float', trigger: 'change', message: '请输入规则定义的参数值' }]
      },
      ruleTableData: []
    }
  },
  watch: {
  },
  created() {
    this.getBusinessModelCodeDatas()
    this.getRegulation()
  },
  methods: {
    getFunctionLabel(value) {
      return this.functionSelectOptions?.find(item => item.regId === value)?.value || value
    },
    resetFormDataListMessage() {
      this.$refs.vxeForm?.reset()
    },
    formatTreeLabel(datas) {
      if (Array.isArray(datas)) {
        datas.forEach(item => {
          item.code = item.id
          item.name = item.businessName
          item.label = item.id + '-' + item.businessName
          if (item.children) {
            this.formatTreeLabel(item.children)
          }
        })
      }
    },
    log() {},
    getRegulation() {
      this.$http.post(BSURL.lmp_ruleClassifyTree + '0').then(res => {
        if (res.code === '000000') {
          this.regulationClassOption = res.data
          console.log(res.data, 77)
        } else {
          this.$message.error('监控主体树获取失败')
        }
      })
    },
    // 获取 [业务模块or业务系统or业务功能]
    getBusinessModelCodeDatas() {
      const businessTypeEnum = {
        'businessSystem': '1',
        'businessModule': '2',
        'businessFunction': '3',
        '1': 'businessSystem',
        '2': 'businessModule',
        '3': 'businessFunction'
      }
      const params = {
        businessType: '1',
        parentId: 0
      }
      this.$http.post(BSURL.lmp_businessFunctionsList, params, null, 'multipart/form-data', 'openapi').then(res => {
        if (res.code === '000000' && res.data.results) {
          // 遍历tree 组装所需格式
          const resultTree = [
            {
              id: 'root',
              businessName: '全部',
              code: 'root',
              name: '全部',
              isleaf: '0',
              children: res.data.results
            }
          ]
          // let index = this.formItems.findIndex(item => item.filed === businessTypeEnum[params.businessType])
          this.bussnessModuleOption = resultTree
        } else {
          const title = this.formItems.find(item => item.filed === businessTypeEnum[params.businessType])?.title || ''
          this.$message.warning(`${title}加载失败`)
        }
      })
    }
  }
}

</script>

<style lang="scss" scoped>
.ruleDefinition{
  .vxeForm{
    display:flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items:center;
    /deep/ .vxe-form--item{
      width:33%;
      display:inline-block;
    }
    /deep/ .vxe-input{
      width:100%;
      min-width:120px;
    }
    /deep/ .vxe-select{
      width:100%;
      min-width:120px;
    }
    .one-row{
      width: 100% !important;
    }
  }
  .ruleTable{
    width:"100%";
    padding: 0.8em 0.5em 0;
    /deep/ .vxe-table--body-wrapper.body--wrapper{
      overflow:hidden;
    }
  }
}

</style>
