import { extend } from '@/utils'
const CONFIG = {
  tableConf: {
    defaultConfig: {
      tableConfig: {
        globalConfig: {
          // 全局配置
          checkType: false, // hasCheckbox
          seq: false, // 序号列
          hasOptionRow: false // 操作列
        },
        renderers: {
          dragOrder: {
            renderDefault(h, cellRender, { row, column }, context) {
              return [
                <span class="drag-btn-custom">
                  <i class="el-icon-menu"></i>
                </span>
              ]
            },
            renderCell(h, cellRender, { row, column }, context) {
              return [
                <span class="drag-btn-custom">
                  <i class="el-icon-menu"></i>
                </span>
              ]
            }
          }
        }
      },
      tableEditConfig: {
        trigger: 'click',
        mode: 'cell',
        activeMethod({ row, rowIndex, column, columnIndex }) {
          return true
        }
      },
      tableCols: [
        {
          title: '序号',
          fixed: 'left',
          field: 'orderNum',
          align: 'center',
          width: '120',
          cellRender: {
            name: '$vxeInput'
          }
        },
        {
          title: '列中文名',
          field: 'title',
          align: 'left',
          width: '180',
          cellRender: {
            name: '$vxeInput'
          }
        },
        {
          title: '英文字段名',
          field: 'columnName',
          align: 'left',
          width: '180',
          cellRender: {
            name: '$vxeInput'
          }
        },
        // {
        //   title: '英文字段名',
        //   field: 'field',
        //   align: 'left',
        //   width: '180',
        //   cellRender: {
        //     name: '$vxeInput'
        //   }
        // },
        {
          title: '列类型',
          field: 'type',
          align: 'left',
          width: '150',
          cellRender: {
            name: '$vxeSelect',
            props: {
              clearable: true
            },
            options: [
              // { value: 'tree', label: '下拉树' },
              // { value: 'text', label: '文本输入框' },
              // { value: 'number', label: '数字输入框' },
              // { value: 'select', label: '下拉选择' },
              // { value: 'calculate', label: '金额计算渲染器' },
              // { value: 'money', label: '金额输入' },
              // { value: 'textarea', label: '下拉文本框' },
              // { value: 'days', label: '天数' },
              // { value: 'date', label: '时间日期' },
              // { value: 'checkbox', label: '多选' },
              // { value: 'radio', label: '单选' },
              // { value: 'intervar', label: '间隔时间或数值选择输入渲染器' },
              // { value: 'switch', label: '开关' },
              // { value: 'progress', label: '进度条' }
              { value: '$vxeTree', label: '下拉树' },
              { value: '$vxeInput', label: '输入框' },
              { value: '$vxeSelect', label: '下拉选择器' },
              { value: '$vxeCalculate', label: '金额计算列' },
              { value: '$vxeMoney', label: '金额输入框' },
              { value: '$vxeEditDownTextarea', label: '下拉文本框' },
              { value: '$vxeDays', label: '天数选择框' },
              { value: '$vxeTime', label: '时间日期选择框' },
              { value: '$vxeCheckbox', label: '多选列' },
              { value: '$vxeRadio', label: '单选列' },
              { value: '$vxeTableHref', label: '超链接' }
              // { value: '$vxeIntervar', label: '间隔时间或数值选择输入渲染器' },
              // { value: '$vxeSwitch', label: '开关列' },
              // { value: '$vxeProgress', label: '进度条' }
            ]
          }
        },
        {
          title: '下拉数据源',
          field: 'options',
          align: 'left',
          width: '180',
          cellRender: {
            name: '$vxeInput'
          }
        },
        {
          title: '列提示信息',
          field: 'placeholder',
          align: 'left',
          width: '180',
          cellRender: {
            name: '$vxeInput'
          }
        },
        {
          title: '列是否可见',
          field: 'visible',
          align: 'left',
          width: '180',
          cellRender: {
            name: '$vxeSelect',
            options: [
              { value: '1', label: '是' },
              { value: '0', label: '否' }
            ]
          }
        },
        {
          title: '是否必填',
          field: 'required',
          align: 'left',
          width: '150',
          cellRender: {
            name: '$vxeSelect',
            options: [
              { value: '1', label: '是' },
              { value: '0', label: '否' }
            ]
          }
        },
        {
          title: '字段长度',
          field: 'clengh',
          align: 'left',
          width: '150',
          cellRender: {
            name: '$vxeInput'
          }
        },
        {
          title: '是否可编辑',
          field: 'editable',
          align: 'left',
          width: '150',
          cellRender: {
            name: '$vxeSelect',
            options: [
              { value: '1', label: '是' },
              { value: '0', label: '否' }
            ]
          }
        },
        {
          title: '是否可用',
          field: 'disabled',
          align: 'left',
          width: '150',
          cellRender: {
            name: '$vxeSelect',
            options: [
              { value: '1', label: '是' },
              { value: '0', label: '否' }
            ]
          }
        },
        {
          title: '列数据水平对齐方式',
          field: 'align',
          align: 'left',
          width: '150',
          cellRender: {
            name: '$vxeSelect',
            options: [
              { value: 'left', label: '居左' },
              { value: 'center', label: '居中' },
              { value: 'right', label: '居右' }
            ]
          }
        },
        {
          title: '列是否允许排序',
          field: 'sortable',
          align: 'left',
          width: '150',
          cellRender: {
            name: '$vxeSelect',
            options: [
              { value: '1', label: '是' },
              { value: '0', label: '否' }
            ]
          }
        },
        {
          title: '列宽度',
          field: 'width',
          align: 'left',
          width: '150',
          cellRender: {
            name: '$vxeInput',
            props: {
              type: 'number',
              min: 0,
              max: 500
            }
          }
        },
        {
          title: '默认值',
          field: 'defaultValue',
          align: 'left',
          width: '180',
          cellRender: {
            name: '$vxeInput'
          }
        },
        // {
        //   title: '公式内容',
        //   field: 'formula',
        //   align: 'left',
        //   width: '200',
        //   cellRender: {
        //     name: '$vxeInput'
        //   }
        // },
        {
          title: '公式内容',
          field: 'formulaShow',
          align: 'left',
          width: '200',
          cellRender: {
            name: '$vxeInput'
          }
        },
        {
          title: '列是否允许导出',
          field: 'isExportCol',
          align: 'left',
          width: '150',
          cellRender: {
            name: '$vxeSelect',
            options: [
              { value: '1', label: '是' },
              { value: '0', label: '否' }
            ]
          }
        }
      ],
      tableEditCols: [
        {
          title: '排序',
          align: 'center',
          width: '60',
          titleHelp: {
            message: '长按排序'
          },
          cellRender: {
            name: 'dragOrder'
          }
        },
        {
          title: '序号',
          fixed: 'left',
          field: 'orderNum',
          align: 'center',
          width: '120'
        },
        {
          title: '列中文名',
          field: 'title',
          align: 'left',
          width: '180',
          editRender: {
            name: '$vxeInput'
          }
        },
        {
          title: '英文字段名',
          field: 'columnName',
          align: 'left',
          width: '180',
          editRender: {
            name: '$vxeInput'
          }
        },
        {
          title: '列类型',
          field: 'type',
          align: 'left',
          width: '150',
          editRender: {
            name: '$vxeSelect',
            props: {
              clearable: true
            },
            options: [
              // { value: 'tree', label: '下拉树' },
              // { value: 'text', label: '文本输入框' },
              // { value: 'number', label: '数字输入框' },
              // { value: 'select', label: '下拉选择' },
              // { value: 'calculate', label: '金额计算渲染器' },
              // { value: 'money', label: '金额输入' },
              // { value: 'textarea', label: '下拉文本框' },
              // { value: 'days', label: '天数' },
              // { value: 'date', label: '时间日期' },
              // { value: 'checkbox', label: '多选' },
              // { value: 'radio', label: '单选' },
              // { value: 'intervar', label: '间隔时间或数值选择输入渲染器' },
              // { value: 'switch', label: '开关' },
              // { value: 'progress', label: '进度条' }
              { value: '$vxeTree', label: '下拉树' },
              { value: '$vxeInput', label: '输入框' },
              { value: '$vxeSelect', label: '下拉选择器' },
              { value: '$vxeCalculate', label: '金额计算列' },
              { value: '$vxeMoney', label: '金额输入框' },
              { value: '$vxeEditDownTextarea', label: '下拉文本框' },
              { value: '$vxeDays', label: '天数选择框' },
              { value: '$vxeTime', label: '时间日期选择框' },
              { value: '$vxeCheckbox', label: '多选列' },
              { value: '$vxeRadio', label: '单选列' },
              { value: '$vxeTableHref', label: '超链接' }
              // { value: '$vxeIntervar', label: '间隔时间或数值选择输入渲染器' },
              // { value: '$vxeSwitch', label: '开关列' },
              // { value: '$vxeProgress', label: '进度条' }
            ]
          }
        },
        {
          title: '数据源',
          field: 'options',
          align: 'left',
          width: '180',
          editRender: {
            name: '$vxeEditDownTextarea',
            props: {
              maxlength: 1200
            }
          }
        },
        {
          title: '列提示信息',
          field: 'placeholder',
          align: 'left',
          width: '180',
          editRender: {
            name: '$vxeInput'
          }
        },
        {
          title: '列是否可见',
          field: 'visible',
          align: 'left',
          width: '180',
          editRender: {
            name: '$vxeSelect',
            options: [
              { value: '1', label: '是' },
              { value: '0', label: '否' }
            ]
          }
        },
        {
          title: '是否必填',
          field: 'required',
          align: 'left',
          width: '150',
          editRender: {
            name: '$vxeSelect',
            options: [
              { value: '1', label: '是' },
              { value: '0', label: '否' }
            ]
          }
        },
        {
          title: '字段长度',
          field: 'clengh',
          align: 'left',
          width: '150',
          editRender: {
            name: '$vxeInput'
          }
        },
        {
          title: '是否可编辑',
          field: 'editable',
          align: 'left',
          width: '150',
          editRender: {
            name: '$vxeSelect',
            options: [
              { value: '1', label: '是' },
              { value: '0', label: '否' }
            ]
          }
        },
        {
          title: '是否可用',
          field: 'disabled',
          align: 'left',
          width: '150',
          editRender: {
            name: '$vxeSelect',
            options: [
              { value: '1', label: '是' },
              { value: '0', label: '否' }
            ]
          }
        },
        {
          title: '列数据水平对齐方式',
          field: 'align',
          align: 'left',
          width: '150',
          editRender: {
            name: '$vxeSelect',
            options: [
              { value: 'left', label: '居左' },
              { value: 'center', label: '居中' },
              { value: 'right', label: '居右' }
            ]
          }
        },
        {
          title: '列是否允许排序',
          field: 'sortable',
          align: 'left',
          width: '150',
          editRender: {
            name: '$vxeSelect',
            options: [
              { value: '1', label: '是' },
              { value: '0', label: '否' }
            ]
          }
        },
        {
          title: '列宽度',
          field: 'width',
          align: 'left',
          width: '150',
          editRender: {
            name: '$vxeInput',
            props: {
              type: 'number',
              min: 0,
              max: 500
            }
          }
        },
        {
          title: '默认值',
          field: 'defaultValue',
          align: 'left',
          width: '180',
          editRender: {
            name: '$vxeInput'
          }
        },
        {
          title: '公式内容',
          field: 'formulaShow',
          align: 'left',
          width: '200',
          editRender: {
            name: '$vxeInput'
          }
        },
        {
          title: '列是否允许导出',
          field: 'isExportCol',
          align: 'left',
          width: '150',
          editRender: {
            name: '$vxeSelect',
            options: [
              { value: '1', label: '是' },
              { value: '0', label: '否' }
            ]
          }
        }
      ],
      tableEditRules: {
        title: [
          {
            message: '请输入列中文名',
            trigger: 'change',
            required: true
          }
        ],
        columnName: [
          {
            message: '该列为子行，请输入英文字段名',
            trigger: 'change',
            validator: ({ cellValue, row, rule }) => {
              let isBlank = (value) => {
                return (value === undefined || value === null || value === '')
              }
              if (!row.isparentrow) {
                if (isBlank(cellValue)) {
                  return new Error(rule.message)
                }
              }
              return true
            }
          }
        ],
        type: [
          {
            message: '该列为子行，请选择列类型',
            trigger: 'change',
            validator: ({ cellValue, row, rule }) => {
              let isBlank = (value) => {
                return (value === undefined || value === null || value === '')
              }
              if (!row.isparentrow) {
                if (isBlank(cellValue)) {
                  return new Error(rule.message)
                }
              }
              return true
            }
          }
        ],
        clengh: [
          {
            message: '该列为子行，请填写字段长度',
            trigger: 'change',
            validator: ({ cellValue, row, rule }) => {
              let isBlank = (value) => {
                return (value === undefined || value === null || value === '')
              }
              let needClength = ['$vxeEditDownTextarea', '$vxeInput']
              if (!row.isparentrow) {
                if (needClength.includes(row.type) && isBlank(cellValue)) {
                  return new Error(rule.message)
                }
              }
              return true
            }
          }
        ],
        options: [
          {
            trigger: 'change',
            validator: ({ cellValue, row, rule }) => {
              let isBlank = (value) => {
                return (value === undefined || value === null || value === '')
              }
              let requiredOptions = ['$vxeCheckbox', '$vxeRadio', '$vxeSelect', '$vxeTree']
              let needValidateOptions = ['$vxeCheckbox', '$vxeRadio', '$vxeSelect']
              if (requiredOptions.includes(row.type) && isBlank(cellValue)) {
                return new Error('请填写下拉数据源')
              }
              if (needValidateOptions.includes(row.type)) {
                let re = /^(([^?=#]+)=([^?=#]+)(#([^?=#]+)=([^?=#]+))*)$/
                if (!re.test(cellValue)) {
                  return new Error('数据源格式需要满足【值=键】，多个以#分隔')
                }
              }
              return true
            }
          }
        ]
      },
      tableKeyboardConfig: {
        isArrow: true,
        isDel: false,
        isEnter: true,
        isTab: true,
        isEdit: true
      }
    }
  },
  formConf: {
    defaultConfig: {
      queryFormData: {
        dicCode: '',
        dicName: '',
        parentId: '',
        parentCode: '',
        parentName: '',
        remark: '',
        orderNum: '',
        dicType: '',
        editable: '1',
        ischeck: '1',
        isfolder: '0',
        isImateForm: '0',
        kind: '',
        systemflag: '',
        guid: '',
        fiscalYear: '',
        mofDivCode: '',
        creater: '',
        createTime: '',
        updateTime: '',
        updater: '',
        versionNum: '',
        isDeleted: '0'
      },
      formGloabalConfig: {
        span: 8,
        align: 'left',
        size: 'medium',
        titleAlign: 'right',
        titleWidth: 0,
        titleColon: false,
        preventSubmit: false,
        loading: false,
        validConfig: {
          autoPos: true
        }
      },
      queryFormItemConfig: [
        {
          title: '报表名称',
          field: 'dicName',
          align: 'left',
          span: 6,
          itemRender: {
            name: '$vxeInput',
            defaultValue: '',
            props: {
              placeholder: '请输入报表名称',
              size: 'small',
              disabled: true
            }
          }
        },
        {
          title: '报表编码',
          field: 'dicCode',
          align: 'left',
          span: 6,
          itemRender: {
            name: '$vxeInput',
            defaultValue: '',
            props: {
              placeholder: '请输入报表名称',
              size: 'small',
              disabled: true
            }
          }
        },
        {
          title: '备注',
          field: 'remark',
          align: 'left',
          span: 6,
          itemRender: {
            name: '$vxeInput',
            props: {
              placeholder: '请输入备注',
              size: 'small',
              disabled: true
            }
          }
        },
        {
          title: '显示顺序',
          field: 'orderNum',
          align: 'left',
          span: 6,
          itemRender: {
            name: '$vxeInput',
            props: {
              placeholder: '请输入显示顺序',
              size: 'small',
              type: 'number',
              min: 0,
              max: 42,
              disabled: true
            }
          }
        },
        {
          title: '报表类型',
          field: 'dicType',
          align: 'left',
          span: 6,
          itemRender: {
            name: '$vxeSelect',
            props: {
              placeholder: '请输入报表类型',
              size: 'small',
              disabled: true
            },
            options: [
              {
                value: '1',
                label: '录入表'
              },
              {
                value: '2',
                label: '查询表'
              },
              {
                value: '3',
                label: '录入视图'
              },
              {
                value: '4',
                label: '列表视图'
              }
            ]
          }
        },
        // {
        //   title: '父级目录',
        //   field: 'parent',
        //   span: 6,
        //   itemRender: {
        //     name: '$vxeTree',
        //     props: {
        //       config: {
        //         isHump: true,
        //         treeProps: {
        //           labelFormat: '{code}-{name}',
        //           nodeKey: 'id',
        //           label: 'name',
        //           children: 'children'
        //         },
        //         multiple: false,
        //         isleaf: true,
        //         disabled: true,
        //         axiosConfig: {
        //           successCode: '100000', // 成功code
        //           statusField: 'code',
        //           method: 'get',
        //           url: 'bisConfig/config/basDicInfo/getDicInfoTree'
        //         }
        //       },
        //       queryparams: {
        //         isFolder: '1'
        //       }
        //     }
        //   }
        // },
        {
          title: '表格数据是否可编辑',
          field: 'editable',
          span: 6,
          itemRender: {
            name: '$vxeRadio',
            options: [
              { value: '1', label: '是' },
              { value: '0', label: '否' }
            ],
            props: {
              placeholder: '表格数据是否可编辑',
              disabled: true
            }
          }
        },
        {
          title: '是否显示复选框',
          field: 'ischeck',
          span: 6,
          itemRender: {
            name: '$vxeRadio',
            options: [
              { value: '1', label: '是' },
              { value: '0', label: '否' }
            ],
            props: {
              placeholder: '是否显示复选框',
              disabled: true
            }
          }
        },
        {
          title: '是否末级',
          field: 'isfolder',
          span: 6,
          itemRender: {
            name: '$vxeRadio',
            options: [
              { value: '0', label: '是' },
              { value: '1', label: '否' }
            ],
            props: {
              placeholder: '是否末级',
              disabled: true
            }
          }
        },
        {
          title: '是否测算表',
          field: 'isImateForm',
          span: 6,
          itemRender: {
            name: '$vxeRadio',
            options: [
              { value: '1', label: '是' },
              { value: '0', label: '否' }
            ],
            props: {
              placeholder: '是否测算表',
              disabled: true
            }
          }
        }
      ],
      queryFormItemEditConfig: [
        {
          title: '报表名称',
          field: 'dicName',
          align: 'left',
          span: 6,
          itemRender: {
            name: '$vxeInput',
            defaultValue: '',
            props: {
              placeholder: '请输入报表名称',
              size: 'small'
            }
          }
        },
        {
          title: '报表编码',
          field: 'dicCode',
          align: 'left',
          span: 6,
          itemRender: {
            name: '$vxeInput',
            defaultValue: '',
            props: {
              placeholder: '请输入报表编码',
              size: 'small'
            }
          }
        },
        {
          title: '备注',
          field: 'remark',
          align: 'left',
          span: 6,
          itemRender: {
            name: '$vxeInput',
            props: {
              placeholder: '请输入备注',
              size: 'small'
            }
          }
        },
        {
          title: '显示顺序',
          field: 'orderNum',
          align: 'left',
          span: 6,
          itemRender: {
            name: '$vxeInput',
            props: {
              placeholder: '请输入显示顺序',
              size: 'small',
              type: 'number',
              min: 0,
              max: 42
            }
          }
        },
        {
          title: '报表类型',
          field: 'dicType',
          align: 'left',
          span: 6,
          itemRender: {
            name: '$vxeSelect',
            props: {
              placeholder: '请输入报表类型',
              size: 'small'
            },
            options: [
              {
                value: '1',
                label: '录入表'
              },
              {
                value: '2',
                label: '查询表'
              },
              {
                value: '3',
                label: '录入视图'
              },
              {
                value: '4',
                label: '列表视图'
              }
            ]
          }
        },
        {
          title: '父级目录',
          field: 'parent',
          span: 6,
          itemRender: {
            name: '$vxeTree',
            props: {
              clearable: true,
              config: {
                isHump: true,
                treeProps: {
                  labelFormat: '{code}-{name}',
                  nodeKey: 'id',
                  label: 'name',
                  children: 'children'
                },
                multiple: false,
                isleaf: false,
                axiosConfig: {
                  successCode: '100000', // 成功code
                  statusField: 'code',
                  method: 'get',
                  url: 'bisConfig/config/basDicInfo/getDicInfoTree'
                }
              },
              queryparams: {
                isFolder: '1'
              }
            }
          }
        },
        {
          title: '表格数据是否可编辑',
          field: 'editable',
          span: 6,
          itemRender: {
            name: '$vxeRadio',
            options: [
              { value: '1', label: '是' },
              { value: '0', label: '否' }
            ],
            props: {
              placeholder: '表格数据是否可编辑'
            }
          }
        },
        {
          title: '是否显示复选框',
          field: 'ischeck',
          span: 6,
          itemRender: {
            name: '$vxeRadio',
            options: [
              { value: '1', label: '是' },
              { value: '0', label: '否' }
            ],
            props: {
              placeholder: '是否显示复选框'
            }
          }
        },
        {
          title: '是否末级',
          field: 'isfolder',
          span: 6,
          itemRender: {
            name: '$vxeRadio',
            options: [
              { value: '0', label: '是' },
              { value: '1', label: '否' }
            ],
            props: {
              placeholder: '是否末级'
            }
          }
        },
        {
          title: '是否测算表',
          field: 'isImateForm',
          span: 6,
          itemRender: {
            name: '$vxeRadio',
            options: [
              { value: '1', label: '是' },
              { value: '0', label: '否' }
            ],
            props: {
              placeholder: '是否测算表',
              disabled: false
            }
          }
        }
      ],
      validateConfig: {
        dicName: [
          {
            required: true,
            message: '请输入报表名称',
            trigger: 'change'
          }
        ],
        dicCode: [
          {
            required: true,
            message: '请输入报表编码',
            trigger: 'change'
          }
        ],
        orderNum: [
          {
            required: true,
            message: '请输入显示顺序',
            trigger: 'change'
          }
        ],
        dicType: [
          {
            required: true,
            message: '请选择报表类型',
            trigger: 'change'
          }
        ],
        editable: [
          {
            required: true,
            message: '请选择是否可编辑',
            trigger: 'change'
          }
        ],
        ischeck: [
          {
            required: true,
            message: '请选择是否展示多选框',
            trigger: 'change'
          }
        ],
        isfolder: [
          {
            required: true,
            message: '请选择是否末级',
            trigger: 'change'
          }
        ]
      }
    }
  }
}

export default function (configType, configItem, detailItem) {
  if (configType && configItem) {
    if (!CONFIG[configType]) {
      return null
    }
    if (!CONFIG[configType][configItem]) {
      configItem = 'defaultConfig'
    }
    let result = extend(true, {}, CONFIG[configType]['defaultConfig'])
    result = extend(true, result, CONFIG[configType][configItem])
    if (detailItem) {
      return result[detailItem]
    } else {
      return result
    }
  } else {
    return null
  }
}
