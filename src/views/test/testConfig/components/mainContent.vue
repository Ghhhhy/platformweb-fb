<!--  -->
<template>
  <div class="">
    <el-card>
      <BsForm
        ref="form"
        :form-config="formConfig"
        :is-editable="true"
        :form-items-config="formItemsConfig"
        :form-data-list.sync="entryFormData"
        :form-validation-config="formValidationConfig"
        @itemChange="itemChange"
      />
      <div style="margin: 5px 0 15px">
        <el-row>
          <el-col :span="3" :offset="18">
            <el-button size="mini" @click="showDetail">高级属性</el-button>
          </el-col>
        </el-row>
      </div>
    </el-card>

    <el-card style="margin-top:20px">
      <BsTable
        ref="bsTableRef"
        height="300px"
        :footer-config="{
          showFooter: true,
          combinedType: ['subTotal', 'total', 'totalAll', 'switchTotal'],
        }"
        :table-config="tableConfig"
        :table-columns-config="tableColumnsConfig"
        :table-data="tableData"
        :edit-config="false"
        :pager-config="pagerConfig"
        :default-money-unit="1"
        @ajaxData="ajaxData"
      >
        <template v-slot:toolbarSlots>
          <div class="table-toolbar-left">
            <div
              v-if="leftVisible === false"
              class="table-toolbar-contro-leftvisible"
              @click="leftVisible = true"
            ></div>
            <div class="table-toolbar-left-title">
              <span class="fn-inline">部门预算调剂申请列表</span>
              <i class="fn-inline"></i>
            </div>
          </div>
        </template>
      </BsTable>
    </el-card>
    <el-drawer
      ref="drawer"
      title="我嵌套了 Form !"
      :before-close="handleClose"
      :visible.sync="dialog"
      direction="rtl"
      custom-class="demo-drawer"
    >
      <div class="demo-drawer__content">
        <el-form :model="form">
          <el-form-item label="活动名称" :label-width="formLabelWidth">
            <el-input v-model="form.name" size="mini" autocomplete="off" />
          </el-form-item>
          <el-form-item label="活动区域" :label-width="formLabelWidth">
            <el-select v-model="form.region" placeholder="请选择活动区域">
              <el-option label="区域一" value="shanghai" />
              <el-option label="区域二" value="beijing" />
            </el-select>
          </el-form-item>
        </el-form>
        <div class="demo-drawer__footer">
          <el-button size="mini" @click="dialog = false">取 消</el-button>
          <el-button size="mini" type="primary" :loading="loading">{{ loading ? '提交中 ...' : '确 定' }}</el-button>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>

export default {
  components: {},
  props: {},
  data() {
    return {
      loading: false,
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      formLabelWidth: '80px',
      dialog: false,
      currentPage: 1,
      pagerConfig: {
        currentPage: 1,
        total: 2
      },
      tableData: [
        {
          'status': 'ybc',
          'has_assign_source': 1,
          'agency_': '',
          'agency_code': '1600002',
          'agency_name': '体育局本级',
          'agency_id': '1600002',

          'pro_type_': '',
          'pro_type_code': '001',
          'pro_type_name': '物业管理1',
          'pro_type_id': '001',

          'pro_name': '物业管理费',
          'amount': 20000,
          'source': '11-本级财力',
          'nature': '111-一般公共预算拨款',
          'founs_type_': '2019999##其他一般公共服务支出##2019999',
          'founs_type_code': '2019999',
          'founs_type_name': '其他一般公共服务支出',
          'founs_type_id': '2019999',

          'gov_eco_type_': '50502##商品和服务支出##50502',
          'gov_eco_type_code': '50502',
          'gov_eco_type_name': '商品和服务支出',
          'gov_eco_type_id': '50502',

          'gov_dep_type_': '30209##物业管理费##30209',
          'gov_dep_type_code': '30209',
          'gov_dep_type_name': '物业管理费',
          'gov_dep_type_id': '30209',
          'zd_source': '物业管理费3',
          'application_no': 'BM202101050002'
        },
        {
          'status': 'bth',
          'has_assign_source': 0,
          'agency_': '',
          'agency_code': '1560002',
          'agency_name': '教育厅本级',
          'agency_id': '1560002',

          'pro_type_': '001##物业管理1##001',
          'pro_type_code': '001',
          'pro_type_name': '物业管理1',
          'pro_type_id': '001',

          'pro_name': '物业管理费',
          'amount': 10000,
          'source': '11-本级财力',
          'nature': ' 111-一般公共预算拨款',
          'founs_type_': '2019999##其他一般公共服务支出##2019999',
          'founs_type_code': '2019999',
          'founs_type_name': '其他一般公共服务支出',
          'founs_type_id': '2019999',

          'gov_eco_type_': '50502##商品和服务支出##50502',
          'gov_eco_type_code': '50502',
          'gov_eco_type_name': '商品和服务支出',
          'gov_eco_type_id': '50502',

          'gov_dep_type_': '30209##物业管理费##30209',
          'gov_dep_type_code': '30209',
          'gov_dep_type_name': '物业管理费',
          'gov_dep_type_id': '30209',
          'zd_source': '物业管理费3',
          'application_no': 'BM202101050002'
        }
      ],
      tableConfig: {
        globalConfig: {
          height: '200px',
          // 全局配置
          checkType: 'checkbox', // hasCheckbox
          seq: true // 序号列
        },
        methods: {
          onOptionRowClick: this.onOptionRowClick
        },
        renderers: {
          has_assign_source: {
            renderDefault(h, cellRender, { row, column }, context) {
              let self = context.$grid.$parent
              if (row[column.property] === 1) {
                return [
                  <a
                    onClick={() =>
                      self.onOptionRowClick({ row, column, optionType: 'has_assign_source' })
                    }
                    style="text-decoration:underline;cursor:pointer"
                  >是
                  </a>
                ]
              } else {
                return [<span>否</span>]
              }
            }
          },
          // 操作按钮
          $gloableOptionRow_Dwyssqlr: {
            renderDefault(h, cellRender, params, context) {
              let self = context.$grid.$parent
              let { row, column } = params
              return [
                <el-button onClick={() => self.onOptionRowClick({ row, column, optionType: 'more' })} size="mini" >高级属性</el-button>,
                <el-button onClick={() => self.onOptionRowClick({ row, column, optionType: 'delete' })} size="mini" >删除</el-button>
              ]
            }
          }
        }
      },
      tableColumnsConfig: [
        {
          title: '状态',
          field: 'status',
          width: 150,
          filters: [
            { value: 'ybc', label: '已保存' },
            { value: 'bth', label: '被退回' }
          ],
          filterMultiple: true,
          editRender: {
            name: '$vxeSelect',
            options: [
              { value: 'ybc', label: '已保存' },
              { value: 'bth', label: '被退回' }
            ],
            props: {
              placeholder: '请选择'
            }
          }
        },
        {
          title: '预算单位',
          field: 'agency_',
          width: 200,
          align: 'center',
          cellRender: {
            name: '$vxeTree',
            props: {
              placeholder: '预算单位',
              queryparams: {
                appguid: 'zfys',
                parameters: { 'eleCode': 'AGENCY' }
              },
              config: {
                multiple: true,
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
          title: '支出项目类别',
          field: 'pro_type_',
          width: 200,
          align: 'center',
          visible: false,
          cellRender: {
            name: '$vxeTree',
            props: {
              queryparams: {
                tokenid: 'b75ee9e2f1583f15b5259979c098549f',
                appguid: 'zfys',
                parameters: { 'eleCode': 'AGENCY' }
              },
              config: {
                multiple: false,
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
          title: '项目',
          field: 'pro_name',
          width: 150,
          cellRender: {
            name: 'vexInput',
            defaultValue: '',
            props: {
              placeholder: '请输入角色'
            }
          }
        },
        {
          title: '申请金额',
          width: 150,
          align: '',
          field: 'amount',
          combinedType: ['average', 'subTotal', 'total', 'totalAll'],
          cellRender: {
            name: '$moneyRender',
            props: {
              type: 'float'
            }
          }
        },
        {
          title: '资金来源',
          width: 150,
          align: '',
          field: 'source',
          cellRender: {
            name: 'vexInput',
            props: {
              type: 'text'
            }
          }
        },
        {
          title: '资金性质',
          width: 200,
          align: '',
          field: 'nature',
          cellRender: {
            name: 'vexInput',
            props: {
              type: 'text'
            }
          }
        },
        {
          title: '功能分类',
          field: 'founs_type_',
          width: 200,
          align: 'center',
          cellRender: {
            name: '$vxeTree',
            props: {
              queryparams: {
                tokenid: 'b75ee9e2f1583f15b5259979c098549f',
                appguid: 'zfys',
                parameters: { 'eleCode': 'AGENCY', 'batchno': 2, 'sxspecroleguid': '7F6D5DF72BAA4D1A9A2D73B836D5309C', 'appguid': 'zfys' }
              },
              config: {
                multiple: true,
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
          title: '政府经济分类',
          field: 'gov_eco_type_',
          width: 200,
          align: 'center',
          cellRender: {
            name: '$vxeTree',
            props: {
              queryparams: {
                tokenid: 'b75ee9e2f1583f15b5259979c098549f',
                appguid: 'zfys',
                parameters: { 'eleCode': 'AGENCY', 'batchno': 2, 'sxspecroleguid': '7F6D5DF72BAA4D1A9A2D73B836D5309C', 'appguid': 'zfys' }
              },
              config: {
                multiple: false,
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
          title: '部门经济分类',
          field: 'gov_dep_type_',
          width: 200,
          align: 'center',
          cellRender: {
            name: '$vxeTree',
            props: {
              queryparams: {
                tokenid: 'b75ee9e2f1583f15b5259979c098549f',
                appguid: 'zfys',
                parameters: { 'eleCode': 'AGENCY', 'batchno': 2, 'sxspecroleguid': '7F6D5DF72BAA4D1A9A2D73B836D5309C', 'appguid': 'zfys' }
              },
              config: {
                multiple: false,
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
          title: '指定来源',
          width: 150,
          align: '',
          field: 'zd_source',
          cellRender: {
            name: 'vexInput',
            props: {
              type: 'text'
            }
          }
        },
        {
          title: '是否有指定来源',
          width: 150,
          align: '',
          field: 'has_assign_source',
          cellRender: {
            name: 'has_assign_source',
            props: {
              type: 'text'
            }
          }
        },
        {
          title: '申请单号',
          width: 150,
          align: '',
          field: 'application_no',
          cellRender: {
            name: 'vexInput',
            props: {
              type: 'text'
            }
          }
        },
        {
          title: '操作',
          field: 'gloableOptionRow',
          className: 'gloableOptionRow',
          align: 'center',
          fixed: 'right',
          sortable: false,
          filters: false,
          width: 200,
          cellRender: {
            name: '$gloableOptionRow_Dwyssqlr'
          }
        }
      ],
      formConfig: {
      },
      formItemsConfig: [
        {
          title: '编码',
          field: 'code',
          align: 'center',
          titleWidth: '100px',
          itemRender: {
            name: '$input',
            props: {
              size: 'mini'
            }
          }
        },
        {
          title: '名称',
          field: 'name',
          align: 'center',
          titleWidth: '100px',
          itemRender: {
            name: '$input',
            props: {
              disabled: true,
              size: 'mini'
            }
          }
        },
        {
          title: '类型',
          field: 'type',
          align: 'center',
          titleWidth: '100px',
          itemRender: {
            name: '$input',
            props: {
              type: 'number',
              placeholder: '请输入金额',
              disabled: true,
              size: 'mini'
            }
          }
        },
        {
          title: '表名',
          field: 'apply_amount',
          titleWidth: '100px',
          fieldType: 'money',
          align: 'center',
          itemRender: {
            name: '$input',
            props: {
              type: 'number',
              placeholder: '请输入金额',
              disabled: true,
              size: 'mini'
            }
          }
        },
        {
          title: '视图名称',
          field: 'add_amount',
          titleWidth: '100px',
          fieldType: 'money',
          align: 'center',
          itemRender: {
            name: '$input',
            props: {
              size: 'mini'
            }
          }
        },
        {
          title: '是否可编辑',
          field: 'is_include_purchase',
          titleWidth: '100px',
          align: 'left',
          itemRender: {
            name: '$radio',
            defaultValue: 0,
            options: [
              { value: 1, label: '是' },
              { value: 0, label: '否' }
            ]
          }
        },
        {
          title: '列表',
          field: 'add_amount',
          fieldType: 'money',
          align: 'left',
          titleWidth: '100px',
          itemRender: {
            name: '$input',
            props: {
              disabled: true,
              size: 'mini'
            }
          }
        },
        {
          title: '是否复选',
          field: 'is_include_purchase',
          titleWidth: '100px',
          align: 'left',
          itemRender: {
            name: '$radio',
            defaultValue: 0,
            options: [
              { value: 1, label: '是' },
              { value: 0, label: '否' }
            ]
          }
        },
        {
          title: '是否拖拽',
          field: 'is_include_purchase',
          titleWidth: '100px',
          align: 'left',
          itemRender: {
            name: '$radio',
            defaultValue: 0,
            options: [
              { value: 1, label: '是' },
              { value: 0, label: '否' }
            ]
          }
        }
      ],
      entryFormData: {
        code: '001-特定类型项目',
        pro_name: '办公费',
        prd_amount: 50000,
        apply_amount: 20000,
        add_amount: 30000,
        is_include_purchase: 0
      },
      formValidationConfig: {
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
        ]
      }
    }
  },
  computed: {},
  methods: {
    // 自定义按钮操作
    onOptionRowClick(data) {
      switch (data.optionType) {
        case 'more':
          this.dialog = true
          break
        default:
          console.log('default callback')
      }
    },
    showDetail(index, rows) {
      this.dialog = true
    },
    itemChange({ $form, property, itemValue, data }, bsform) {
      console.log('fuck')
      // form表单联动当前字段change事件代理
      switch (property) {
        case 'name' :
          this.formDataList = Object.assign({}, data, {

          })
          break
        case 'is_include_purchase' :
          this.isShowBudget = itemValue === 1
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
    },
    handleClose(done) {
      this.$confirm('还有未保存的工作哦确定关闭吗？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    }
  },
  created() {

  },
  mounted() {

  },
  beforeDestroy() {},
  watch: {}
}
</script>
<style lang='scss' scoped>

</style>
