<template>
  <vxe-modal
    v-model="visible"
    :title="`${ type === '1' ? '表' : '列' }高级属性模板`"
    :loading="tableLoading"
    width="60%"
    height="80%"
    min-height="250px"
    min-width="800px"
    destroy-on-close="true"
    :position="{ top: '10%', left: '20%' }"
    @hide="handleClose"
  >
    <template v-slot>
      <div class="option-line-group">
        <div class="fn-inline option-line-group-btn">
          <vxe-button v-if="!isEmpty" size="mini" icon="ri-paint-brush-line" @click="insert(true)">覆盖插入</vxe-button>
          <vxe-button v-if="!isEmpty" size="mini" icon="ri-scissors-cut-fill" @click="insert(false)">增量插入</vxe-button>
        </div>
      </div>
      <BsForm
        v-if="!isEmpty"
        ref="queryFrom"
        class="col-attr-template-form"
        :form-gloabal-config="formGloabalConfig"
        :form-items-config="queryFormItemConfig"
        :form-data-list="queryFormData"
        :form-validation-config="validationConfig"
      />
      <el-col v-else :span="24" style="text-align:center">
        <span>暂无模板配置</span>
      </el-col>
    </template>
  </vxe-modal>
</template>

<script>
import mix from '../../mixins/index'
export default {
  name: 'AdvanceAttrTemplate',
  mixins: [mix],
  props: {
    visible: {
      type: Boolean,
      default() {
        return false
      }
    },
    type: {
      type: String,
      default: '1'
    },
    colType: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      formGloabalConfig: {},
      queryFormItemConfig: [],
      validationConfig: [],
      queryFormData: {},
      isEmpty: false,
      allItems: [ // 备份
        {
          title: '树请求链接:',
          field: 'url',
          align: 'left',
          span: 24,
          itemRender: {
            name: '$vxeInput',
            props: {
              placeholder: '请输入树请求链接'
            }
          }
        },
        {
          title: '树请求方式:',
          field: 'method',
          align: 'left',
          span: 8,
          itemRender: {
            name: '$vxeSelect',
            options: [
              {
                label: 'POST',
                value: 'post'
              },
              {
                label: 'GET',
                value: 'get'
              }
            ],
            props: {
              placeholder: '请选择树请求方式'
            }
          }
        },
        {
          title: '树请求参数:',
          field: 'queryConditions',
          align: 'left',
          span: 8,
          itemRender: {
            name: '$vxeInput',
            props: {
              placeholder: '请输入树请求参数'
            }
          }
        },
        {
          title: '树是否需要[全部]节点:',
          field: 'isNeedRoot',
          align: 'left',
          span: 8,
          itemRender: {
            name: '$vxeSelect',
            options: [
              {
                label: '是',
                value: 'true'
              },
              {
                label: '否',
                value: 'false'
              }
            ],
            props: {
              placeholder: '请选择树是否需要[全部]节点'
            }
          }
        },
        {
          title: '树可选层级:',
          field: 'levelno',
          align: 'left',
          span: 8,
          itemRender: {
            name: '$vxeSelect',
            options: [
              {
                label: '不限制（默认）',
                value: '-1'
              },
              {
                label: '一级',
                value: '1'
              },
              {
                label: '二级',
                value: '2'
              },
              {
                label: '三级',
                value: '3'
              }
            ],
            props: {
              placeholder: '请选择树可选层级'
            }
          }
        },
        {
          title: '是否逐级汇总汇总节点（表格）:',
          field: 'treeNode',
          align: 'left',
          span: 8,
          itemRender: {
            name: '$vxeSelect',
            options: [
              {
                label: '是',
                value: 'true'
              },
              {
                label: '否',
                value: ''
              }
            ],
            props: {
              placeholder: '请选择是否树节点'
            }
          }
        },
        {
          title: '列固定方式（表格）:',
          field: 'fixed',
          align: 'left',
          span: 8,
          itemRender: {
            name: '$vxeSelect',
            options: [
              {
                label: '左侧',
                value: 'left'
              },
              {
                label: '右侧',
                value: 'right'
              },
              {
                label: '无',
                value: ''
              }
            ],
            props: {
              placeholder: '请选择列固定方式'
            }
          }
        },
        {
          title: '时间格式:',
          field: 'format',
          align: 'left',
          span: 8,
          itemRender: {
            name: '$vxeSelect',
            options: [
              {
                label: '年月日时分秒',
                value: 'YYYY-MM-DD hh:mm:ss'
              },
              {
                label: '年月日',
                value: 'YYYY-MM-DD'
              },
              {
                label: '年月',
                value: 'YYYY-MM'
              },
              {
                label: '年',
                value: 'YYYY'
              }
            ],
            props: {
              placeholder: '请选择时间格式'
            }
          }
        },
        {
          title: 'footer行合计类型（表格）:',
          field: 'combinedType',
          align: 'left',
          span: 8,
          itemRender: {
            name: '$vxeSelect',
            options: [
              {
                label: '通用合计类型',
                value: 'average,subTotal,total,totalAll'
              },
              {
                label: '整数合计',
                value: 'average,subTotal,total,totalAll,integer'
              },
              {
                label: '无',
                value: ''
              }
            ],
            props: {
              placeholder: '请选择footer行合计类型'
            }
          }
        },
        {
          title: '是否多选:',
          field: 'multiple',
          align: 'left',
          span: 8,
          itemRender: {
            name: '$vxeSelect',
            options: [
              {
                label: '是',
                value: 'true'
              },
              {
                label: '否',
                value: 'false'
              }
            ],
            props: {
              placeholder: '请选择是否多选'
            }
          }
        },
        {
          title: '是否只能选中叶子节点:',
          field: 'isleaf',
          align: 'left',
          span: 8,
          itemRender: {
            name: '$vxeSelect',
            options: [
              {
                label: '是',
                value: '1'
              },
              {
                label: '否',
                value: '0'
              }
            ],
            props: {
              placeholder: '请选择是否只能选中叶子节点'
            }
          }
        },
        {
          title: '提示信息:',
          field: 'titlePrefixTip',
          align: 'left',
          span: 8,
          itemRender: {
            name: '$vxeInput',
            props: {
              placeholder: '请输入提示信息',
              maxlength: 250
            }
          }
        },
        {
          title: '是否可清除:',
          field: 'clearable',
          align: 'left',
          span: 8,
          itemRender: {
            name: '$vxeSelect',
            options: [
              {
                label: '是',
                value: 'true'
              },
              {
                label: '否',
                value: 'false'
              }
            ],
            props: {
              placeholder: '请选择是否可清除'
            }
          }
        },
        {
          title: '列类型:',
          field: 'type',
          align: 'left',
          span: 8,
          itemRender: {
            name: '$vxeSelect',
            options: [
              {
                label: '普通文本',
                value: 'text'
              },
              {
                label: '搜索',
                value: 'search'
              },
              {
                label: '数字',
                value: 'number'
              },
              // {
              //   label: '整型数字',
              //   value: 'integer'
              // },
              // {
              //   label: '浮点数字',
              //   value: 'float'
              // },
              {
                label: '密码',
                value: 'password'
              },
              {
                label: '日期',
                value: 'date'
              },
              {
                label: '时间',
                value: 'time'
              },
              {
                label: '日期时间',
                value: 'datetime'
              },
              {
                label: '周',
                value: 'week'
              },
              {
                label: '月',
                value: 'month'
              },
              {
                label: '年',
                value: 'year'
              },
              // {
              //   label: '金额',
              //   value: 'money'
              // },
              {
                label: '日期范围',
                value: 'days'
              }
            ],
            props: {
              placeholder: '请选择是否可清除'
            }
          }
        }
      ],
      formItems: {
        '$vxeTree': [
          {
            title: '树请求链接:',
            field: 'url',
            align: 'left',
            span: 24,
            itemRender: {
              name: '$vxeInput',
              props: {
                placeholder: '请输入树请求链接'
              }
            }
          },
          {
            title: '树请求方式:',
            field: 'method',
            align: 'left',
            span: 8,
            itemRender: {
              name: '$vxeSelect',
              options: [
                {
                  label: 'POST',
                  value: 'post'
                },
                {
                  label: 'GET',
                  value: 'get'
                }
              ],
              props: {
                placeholder: '请选择树请求方式'
              }
            }
          },
          {
            title: '树请求参数:',
            field: 'queryConditions',
            align: 'left',
            span: 8,
            itemRender: {
              name: '$vxeInput',
              props: {
                placeholder: '请输入树请求参数'
              }
            }
          },
          {
            title: '树是否需要[全部]节点:',
            field: 'isNeedRoot',
            align: 'left',
            span: 8,
            itemRender: {
              name: '$vxeSelect',
              options: [
                {
                  label: '是',
                  value: 'true'
                },
                {
                  label: '否',
                  value: 'false'
                }
              ],
              props: {
                placeholder: '请选择树是否需要[全部]节点'
              }
            }
          },
          {
            title: '树可选层级:',
            field: 'levelno',
            align: 'left',
            span: 8,
            itemRender: {
              name: '$vxeSelect',
              options: [
                {
                  label: '不限制（默认）',
                  value: '-1'
                },
                {
                  label: '一级',
                  value: '1'
                },
                {
                  label: '二级',
                  value: '2'
                },
                {
                  label: '三级',
                  value: '3'
                }
              ],
              props: {
                placeholder: '请选择树可选层级'
              }
            }
          },
          {
            title: '是否逐级汇总汇总节点（表格）:',
            field: 'treeNode',
            align: 'left',
            span: 8,
            itemRender: {
              name: '$vxeSelect',
              options: [
                {
                  label: '是',
                  value: 'true'
                },
                {
                  label: '否',
                  value: ''
                }
              ],
              props: {
                placeholder: '请选择是否树节点'
              }
            }
          },
          {
            title: '列固定方式（表格）:',
            field: 'fixed',
            align: 'left',
            span: 8,
            itemRender: {
              name: '$vxeSelect',
              options: [
                {
                  label: '左侧',
                  value: 'left'
                },
                {
                  label: '右侧',
                  value: 'right'
                },
                {
                  label: '无',
                  value: ''
                }
              ],
              props: {
                placeholder: '请选择列固定方式'
              }
            }
          },
          {
            title: '是否多选:',
            field: 'multiple',
            align: 'left',
            span: 8,
            itemRender: {
              name: '$vxeSelect',
              options: [
                {
                  label: '是',
                  value: 'true'
                },
                {
                  label: '否',
                  value: 'false'
                }
              ],
              props: {
                placeholder: '请选择是否多选'
              }
            }
          },
          {
            title: '是否只能选中叶子节点:',
            field: 'isleaf',
            align: 'left',
            span: 8,
            itemRender: {
              name: '$vxeSelect',
              options: [
                {
                  label: '是',
                  value: '1'
                },
                {
                  label: '否',
                  value: '0'
                }
              ],
              props: {
                placeholder: '请选择是否只能选中叶子节点'
              }
            }
          },
          {
            title: '提示信息:',
            field: 'titlePrefixTip',
            align: 'left',
            span: 8,
            itemRender: {
              name: '$vxeInput',
              props: {
                placeholder: '请输入提示信息',
                maxlength: 250
              }
            }
          },
          {
            title: '是否可清除:',
            field: 'clearable',
            align: 'left',
            span: 8,
            itemRender: {
              name: '$vxeSelect',
              options: [
                {
                  label: '是',
                  value: 'true'
                },
                {
                  label: '否',
                  value: 'false'
                }
              ],
              props: {
                placeholder: '请选择是否可清除'
              }
            }
          }
        ],
        '$vxeInput': [
          {
            title: '是否逐级汇总汇总节点（表格）:',
            field: 'treeNode',
            align: 'left',
            span: 8,
            itemRender: {
              name: '$vxeSelect',
              options: [
                {
                  label: '是',
                  value: 'true'
                },
                {
                  label: '否',
                  value: ''
                }
              ],
              props: {
                placeholder: '请选择是否树节点'
              }
            }
          },
          {
            title: '列固定方式（表格）:',
            field: 'fixed',
            align: 'left',
            span: 8,
            itemRender: {
              name: '$vxeSelect',
              options: [
                {
                  label: '左侧',
                  value: 'left'
                },
                {
                  label: '右侧',
                  value: 'right'
                },
                {
                  label: '无',
                  value: ''
                }
              ],
              props: {
                placeholder: '请选择列固定方式'
              }
            }
          },
          {
            title: 'footer行合计类型（表格）:',
            field: 'combinedType',
            align: 'left',
            span: 8,
            itemRender: {
              name: '$vxeSelect',
              options: [
                {
                  label: '通用合计类型',
                  value: 'average,subTotal,total,totalAll'
                },
                {
                  label: '整数合计',
                  value: 'average,subTotal,total,totalAll,integer'
                },
                {
                  label: '无',
                  value: ''
                }
              ],
              props: {
                placeholder: '请选择footer行合计类型'
              }
            }
          },
          {
            title: '提示信息:',
            field: 'titlePrefixTip',
            align: 'left',
            span: 8,
            itemRender: {
              name: '$vxeInput',
              props: {
                placeholder: '请输入提示信息',
                maxlength: 250
              }
            }
          },
          {
            title: '是否可清除:',
            field: 'clearable',
            align: 'left',
            span: 8,
            itemRender: {
              name: '$vxeSelect',
              options: [
                {
                  label: '是',
                  value: 'true'
                },
                {
                  label: '否',
                  value: 'false'
                }
              ],
              props: {
                placeholder: '请选择是否可清除'
              }
            }
          },
          {
            title: '列类型:',
            field: 'type',
            align: 'left',
            span: 8,
            itemRender: {
              name: '$vxeSelect',
              options: [
                {
                  label: '普通文本',
                  value: 'text'
                },
                {
                  label: '搜索',
                  value: 'search'
                },
                {
                  label: '数字',
                  value: 'number'
                },
                // {
                //   label: '整型数字',
                //   value: 'integer'
                // },
                // {
                //   label: '浮点数字',
                //   value: 'float'
                // },
                {
                  label: '密码',
                  value: 'password'
                },
                {
                  label: '日期',
                  value: 'date'
                },
                {
                  label: '时间',
                  value: 'time'
                },
                {
                  label: '日期时间',
                  value: 'datetime'
                },
                {
                  label: '周',
                  value: 'week'
                },
                {
                  label: '月',
                  value: 'month'
                },
                {
                  label: '年',
                  value: 'year'
                },
                // {
                //   label: '金额',
                //   value: 'money'
                // },
                {
                  label: '日期范围',
                  value: 'days'
                }
              ],
              props: {
                placeholder: '请选择是否可清除'
              }
            }
          }
        ],
        '$vxeSelect': [
          {
            title: '是否逐级汇总汇总节点（表格）:',
            field: 'treeNode',
            align: 'left',
            span: 8,
            itemRender: {
              name: '$vxeSelect',
              options: [
                {
                  label: '是',
                  value: 'true'
                },
                {
                  label: '否',
                  value: ''
                }
              ],
              props: {
                placeholder: '请选择是否树节点'
              }
            }
          },
          {
            title: '列固定方式（表格）:',
            field: 'fixed',
            align: 'left',
            span: 8,
            itemRender: {
              name: '$vxeSelect',
              options: [
                {
                  label: '左侧',
                  value: 'left'
                },
                {
                  label: '右侧',
                  value: 'right'
                },
                {
                  label: '无',
                  value: ''
                }
              ],
              props: {
                placeholder: '请选择列固定方式'
              }
            }
          },
          {
            title: '提示信息:',
            field: 'titlePrefixTip',
            align: 'left',
            span: 8,
            itemRender: {
              name: '$vxeInput',
              props: {
                placeholder: '请输入提示信息',
                maxlength: 250
              }
            }
          },
          {
            title: '是否可清除:',
            field: 'clearable',
            align: 'left',
            span: 8,
            itemRender: {
              name: '$vxeSelect',
              options: [
                {
                  label: '是',
                  value: 'true'
                },
                {
                  label: '否',
                  value: 'false'
                }
              ],
              props: {
                placeholder: '请选择是否可清除'
              }
            }
          }
        ],
        '$vxeCalculate': [
          {
            title: '列固定方式（表格）:',
            field: 'fixed',
            align: 'left',
            span: 8,
            itemRender: {
              name: '$vxeSelect',
              options: [
                {
                  label: '左侧',
                  value: 'left'
                },
                {
                  label: '右侧',
                  value: 'right'
                },
                {
                  label: '无',
                  value: ''
                }
              ],
              props: {
                placeholder: '请选择列固定方式'
              }
            }
          },
          {
            title: 'footer行合计类型（表格）:',
            field: 'combinedType',
            align: 'left',
            span: 8,
            itemRender: {
              name: '$vxeSelect',
              options: [
                {
                  label: '通用合计类型',
                  value: 'average,subTotal,total,totalAll'
                },
                {
                  label: '整数合计',
                  value: 'average,subTotal,total,totalAll,integer'
                },
                {
                  label: '无',
                  value: ''
                }
              ],
              props: {
                placeholder: '请选择footer行合计类型'
              }
            }
          },
          {
            title: '提示信息:',
            field: 'titlePrefixTip',
            align: 'left',
            span: 8,
            itemRender: {
              name: '$vxeInput',
              props: {
                placeholder: '请输入提示信息',
                maxlength: 250
              }
            }
          },
          {
            title: '是否可清除:',
            field: 'clearable',
            align: 'left',
            span: 8,
            itemRender: {
              name: '$vxeSelect',
              options: [
                {
                  label: '是',
                  value: 'true'
                },
                {
                  label: '否',
                  value: 'false'
                }
              ],
              props: {
                placeholder: '请选择是否可清除'
              }
            }
          }
        ],
        '$vxeMoney': [
          {
            title: '列固定方式（表格）:',
            field: 'fixed',
            align: 'left',
            span: 8,
            itemRender: {
              name: '$vxeSelect',
              options: [
                {
                  label: '左侧',
                  value: 'left'
                },
                {
                  label: '右侧',
                  value: 'right'
                },
                {
                  label: '无',
                  value: ''
                }
              ],
              props: {
                placeholder: '请选择列固定方式'
              }
            }
          },
          {
            title: 'footer行合计类型（表格）:',
            field: 'combinedType',
            align: 'left',
            span: 8,
            itemRender: {
              name: '$vxeSelect',
              options: [
                {
                  label: '通用合计类型',
                  value: 'average,subTotal,total,totalAll'
                },
                {
                  label: '整数合计',
                  value: 'average,subTotal,total,totalAll,integer'
                },
                {
                  label: '无',
                  value: ''
                }
              ],
              props: {
                placeholder: '请选择footer行合计类型'
              }
            }
          },
          {
            title: '提示信息:',
            field: 'titlePrefixTip',
            align: 'left',
            span: 8,
            itemRender: {
              name: '$vxeInput',
              props: {
                placeholder: '请输入提示信息',
                maxlength: 250
              }
            }
          },
          {
            title: '是否可清除:',
            field: 'clearable',
            align: 'left',
            span: 8,
            itemRender: {
              name: '$vxeSelect',
              options: [
                {
                  label: '是',
                  value: 'true'
                },
                {
                  label: '否',
                  value: 'false'
                }
              ],
              props: {
                placeholder: '请选择是否可清除'
              }
            }
          }
        ],
        '$vxeEditDownTextarea': [
          {
            title: '列固定方式（表格）:',
            field: 'fixed',
            align: 'left',
            span: 8,
            itemRender: {
              name: '$vxeSelect',
              options: [
                {
                  label: '左侧',
                  value: 'left'
                },
                {
                  label: '右侧',
                  value: 'right'
                },
                {
                  label: '无',
                  value: ''
                }
              ],
              props: {
                placeholder: '请选择列固定方式'
              }
            }
          },
          {
            title: '提示信息:',
            field: 'titlePrefixTip',
            align: 'left',
            span: 8,
            itemRender: {
              name: '$vxeInput',
              props: {
                placeholder: '请输入提示信息',
                maxlength: 250
              }
            }
          }
        ],
        '$vxeDays': [
          {
            title: '列固定方式（表格）:',
            field: 'fixed',
            align: 'left',
            span: 8,
            itemRender: {
              name: '$vxeSelect',
              options: [
                {
                  label: '左侧',
                  value: 'left'
                },
                {
                  label: '右侧',
                  value: 'right'
                },
                {
                  label: '无',
                  value: ''
                }
              ],
              props: {
                placeholder: '请选择列固定方式'
              }
            }
          },
          {
            title: '时间格式:',
            field: 'format',
            align: 'left',
            span: 8,
            itemRender: {
              name: '$vxeSelect',
              options: [
                {
                  label: '年月日时分秒',
                  value: 'YYYY-MM-DD hh:mm:ss'
                },
                {
                  label: '年月日',
                  value: 'YYYY-MM-DD'
                },
                {
                  label: '年月',
                  value: 'YYYY-MM'
                },
                {
                  label: '年',
                  value: 'YYYY'
                }
              ],
              props: {
                placeholder: '请选择时间格式'
              }
            }
          },
          {
            title: '提示信息:',
            field: 'titlePrefixTip',
            align: 'left',
            span: 8,
            itemRender: {
              name: '$vxeInput',
              props: {
                placeholder: '请输入提示信息',
                maxlength: 250
              }
            }
          },
          {
            title: '是否可清除:',
            field: 'clearable',
            align: 'left',
            span: 8,
            itemRender: {
              name: '$vxeSelect',
              options: [
                {
                  label: '是',
                  value: 'true'
                },
                {
                  label: '否',
                  value: 'false'
                }
              ],
              props: {
                placeholder: '请选择是否可清除'
              }
            }
          },
          {
            title: '列类型:',
            field: 'type',
            align: 'left',
            span: 8,
            itemRender: {
              name: '$vxeSelect',
              options: [
                {
                  label: '普通文本',
                  value: 'text'
                },
                {
                  label: '搜索',
                  value: 'search'
                },
                {
                  label: '数字',
                  value: 'number'
                },
                // {
                //   label: '整型数字',
                //   value: 'integer'
                // },
                // {
                //   label: '浮点数字',
                //   value: 'float'
                // },
                {
                  label: '密码',
                  value: 'password'
                },
                {
                  label: '日期',
                  value: 'date'
                },
                {
                  label: '时间',
                  value: 'time'
                },
                {
                  label: '日期时间',
                  value: 'datetime'
                },
                {
                  label: '周',
                  value: 'week'
                },
                {
                  label: '月',
                  value: 'month'
                },
                {
                  label: '年',
                  value: 'year'
                },
                // {
                //   label: '金额',
                //   value: 'money'
                // },
                {
                  label: '日期范围',
                  value: 'days'
                }
              ],
              props: {
                placeholder: '请选择是否可清除'
              }
            }
          }
        ],
        '$vxeTime': [
          {
            title: '列固定方式（表格）:',
            field: 'fixed',
            align: 'left',
            span: 8,
            itemRender: {
              name: '$vxeSelect',
              options: [
                {
                  label: '左侧',
                  value: 'left'
                },
                {
                  label: '右侧',
                  value: 'right'
                },
                {
                  label: '无',
                  value: ''
                }
              ],
              props: {
                placeholder: '请选择列固定方式'
              }
            }
          },
          {
            title: '时间格式:',
            field: 'format',
            align: 'left',
            span: 8,
            itemRender: {
              name: '$vxeSelect',
              options: [
                {
                  label: '年月日时分秒',
                  value: 'YYYY-MM-DD hh:mm:ss'
                },
                {
                  label: '年月日',
                  value: 'YYYY-MM-DD'
                },
                {
                  label: '年月',
                  value: 'YYYY-MM'
                },
                {
                  label: '年',
                  value: 'YYYY'
                }
              ],
              props: {
                placeholder: '请选择时间格式'
              }
            }
          },
          {
            title: '提示信息:',
            field: 'titlePrefixTip',
            align: 'left',
            span: 8,
            itemRender: {
              name: '$vxeInput',
              props: {
                placeholder: '请输入提示信息',
                maxlength: 250
              }
            }
          },
          {
            title: '是否可清除:',
            field: 'clearable',
            align: 'left',
            span: 8,
            itemRender: {
              name: '$vxeSelect',
              options: [
                {
                  label: '是',
                  value: 'true'
                },
                {
                  label: '否',
                  value: 'false'
                }
              ],
              props: {
                placeholder: '请选择是否可清除'
              }
            }
          },
          {
            title: '列类型:',
            field: 'type',
            align: 'left',
            span: 8,
            itemRender: {
              name: '$vxeSelect',
              options: [
                {
                  label: '普通文本',
                  value: 'text'
                },
                {
                  label: '搜索',
                  value: 'search'
                },
                {
                  label: '数字',
                  value: 'number'
                },
                // {
                //   label: '整型数字',
                //   value: 'integer'
                // },
                // {
                //   label: '浮点数字',
                //   value: 'float'
                // },
                {
                  label: '密码',
                  value: 'password'
                },
                {
                  label: '日期',
                  value: 'date'
                },
                {
                  label: '时间',
                  value: 'time'
                },
                {
                  label: '日期时间',
                  value: 'datetime'
                },
                {
                  label: '周',
                  value: 'week'
                },
                {
                  label: '月',
                  value: 'month'
                },
                {
                  label: '年',
                  value: 'year'
                },
                // {
                //   label: '金额',
                //   value: 'money'
                // },
                {
                  label: '日期范围',
                  value: 'days'
                }
              ],
              props: {
                placeholder: '请选择是否可清除'
              }
            }
          }
        ],
        '$vxeCheckbox': [
          {
            title: '是否逐级汇总汇总节点（表格）:',
            field: 'treeNode',
            align: 'left',
            span: 8,
            itemRender: {
              name: '$vxeSelect',
              options: [
                {
                  label: '是',
                  value: 'true'
                },
                {
                  label: '否',
                  value: ''
                }
              ],
              props: {
                placeholder: '请选择是否树节点'
              }
            }
          },
          {
            title: '列固定方式（表格）:',
            field: 'fixed',
            align: 'left',
            span: 8,
            itemRender: {
              name: '$vxeSelect',
              options: [
                {
                  label: '左侧',
                  value: 'left'
                },
                {
                  label: '右侧',
                  value: 'right'
                },
                {
                  label: '无',
                  value: ''
                }
              ],
              props: {
                placeholder: '请选择列固定方式'
              }
            }
          },
          {
            title: '提示信息:',
            field: 'titlePrefixTip',
            align: 'left',
            span: 8,
            itemRender: {
              name: '$vxeInput',
              props: {
                placeholder: '请输入提示信息',
                maxlength: 250
              }
            }
          }
        ],
        '$vxeRadio': [
          {
            title: '是否逐级汇总汇总节点（表格）:',
            field: 'treeNode',
            align: 'left',
            span: 8,
            itemRender: {
              name: '$vxeSelect',
              options: [
                {
                  label: '是',
                  value: 'true'
                },
                {
                  label: '否',
                  value: ''
                }
              ],
              props: {
                placeholder: '请选择是否树节点'
              }
            }
          },
          {
            title: '列固定方式（表格）:',
            field: 'fixed',
            align: 'left',
            span: 8,
            itemRender: {
              name: '$vxeSelect',
              options: [
                {
                  label: '左侧',
                  value: 'left'
                },
                {
                  label: '右侧',
                  value: 'right'
                },
                {
                  label: '无',
                  value: ''
                }
              ],
              props: {
                placeholder: '请选择列固定方式'
              }
            }
          },
          {
            title: '提示信息:',
            field: 'titlePrefixTip',
            align: 'left',
            span: 8,
            itemRender: {
              name: '$vxeInput',
              props: {
                placeholder: '请输入提示信息',
                maxlength: 250
              }
            }
          }
        ],
        '$vxeIntervar': [],
        '$vxeSwitch': [],
        '$vxeProgress': [],
        '$vxeTableHref': [
          {
            title: '点击跳转网址:',
            field: 'clickUrl',
            align: 'left',
            span: 24,
            itemRender: {
              name: '$vxeInput',
              props: {
                placeholder: '请输入跳转网址',
                maxlength: 100
              }
            }
          },
          {
            title: '点击触发方法:',
            field: 'clickMethod',
            align: 'left',
            span: 24,
            itemRender: {
              name: '$vxeInput',
              props: {
                placeholder: '请输入触发方法编码',
                maxlength: 20
              }
            }
          }
        ]
      },
      tableItems: [
        {
          title: '表名:',
          field: 'tableName',
          align: 'left',
          span: 12,
          itemRender: {
            name: '$vxeInput',
            props: {
              placeholder: '请输入表名'
            }
          }
        },
        {
          title: '视图名（一般是测算视图）:',
          field: 'viewName',
          align: 'left',
          span: 12,
          itemRender: {
            name: '$vxeInput',
            props: {
              placeholder: '请输入视图名'
            }
          }
        }
      ]
    }
  },
  methods: {
    handleClose() {
      this.$emit('update:visible', false)
    },
    insert(isFuGai) {
      let formData = this.$refs.queryFrom.getFormData()
      let tableDatas = []
      for (let item in formData) {
        if (formData[item] && formData[item] !== null && formData[item] !== '') {
          let tableData = {
            attrKey: item,
            attrValue: formData[item] || '',
            attrType: '0'
          }
          tableDatas.push(tableData)
        }
      }
      this.$emit('onSetAttr', tableDatas, isFuGai)
      this.$emit('update:visible', false)
    }
  },
  mounted() {
    if (this.type === '2') {
      this.queryFormItemConfig = this.formItems[this.colType] || []
    } else {
      this.queryFormItemConfig = this.tableItems
    }
    if (this.queryFormItemConfig.length === 0) {
      this.isEmpty = true
    }
  },
  created() {
  },
  watch: {
  }
}
</script>

<style lang="scss">
.col-attr-template-form {
  margin: 0 30px;
  .vxe-form.size--medium .vxe-form--item-inner {
    display: grid;
  }
  .vxe-form--item-title {
    font-size: 10px;
    text-align: left!important;
  }
  .vxe-form--item {
    float: inherit!important;
  }
}
</style>
