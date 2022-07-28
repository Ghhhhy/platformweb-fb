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
        }
      },
      tableTbodyEditConfig: {
        trigger: 'click',
        mode: 'cell',
        activeMethod({ row, rowIndex, column, columnIndex }) {
          return true
        }
      },
      tableEditConfig: {
        trigger: 'click',
        mode: 'cell',
        activeMethod({ row, rowIndex, column, columnIndex }) {
          return true
        }
      },
      itemConfig: {
        orderIndex: '', // 嵌套数据结构
        orderPIndex: '', // 嵌套数据结构
        title: '', // 项中文名
        field: '', // 数据库字段
        align: 'center', // 对齐方式 可选值：'left'||'right'||'center',
        editable: 0, // 是否可编辑 可选值：0||1,
        renderName: '$vxeInput', // 项类型 全局提供表格和form配套渲染器共 14组，分别为：新全局下拉树:$vxeTree，文本数字输入:$vxeInput，下拉选择:$vxeSelect，计算渲染器:$vxeCalculate，金额输入:$vxeMoney，下拉文本框:$vxeEditDownTextarea，天数:$vxeDays，时间日期:$vxeTime，单选:$vxeRadio，多选:$vxeCheckbox，间隔时间或数值选择输入渲染器:$vxeIntervar，开关:$vxeSwitch，进度条:vxeProgress。其中，条件渲染器，进度条（评测和developing
        type: 'text', // text, search, number, integer, float, password, date, time, datetime, week, month, year,money,days,time
        formula: '', // 项公式
        options: '', // 下拉数据源 009#博士后+001#小学+002#初中+003#高中+004#中专+005#大专+006#本科+007#硕士+008#博士
        defaultValue: '', // 默认值，
        placeholder: '', // 编辑提示
        clearable: 1, // 可清除的
        visible: 1, // 是否可见,可选值：0||1,
        disabled: 0, // 是否禁用,可选值：0||1,

        min: 0, // 只对 type=number | integer | float 有效，最小值
        max: 10000000000000, // 只对 type = number | integer | float 有效，最大值
        digits: 2, // 只对 type=float 有效，小数位数
        multiple: 0, // 是否多选，只对3组多选渲染器有效
        className: '', // 项附加Class
        format: '', // 格式化 对部分支持格式化的渲染器可用

        // 表格特有
        combinedType: 'subTotal,totalAll', // 是否施加合计以及合计类型，表格特有，可选值：average,subTotal,total,totalAll
        fixed: '', // 列固定方式,表格特有 可选值：'left'||right||''
        width: 200, // 列宽度,表格特有 integer||'auto',
        sortable: 0, // 是否可排序，表格特有，可选值：0||1,
        filters: 0, // 是否可筛选，表格特有，可选值：0||1,
        resizable: 1, // 是否允许拖拽调整列宽,可选值：0||1,
        // 表单特有
        span: 8, // 项所占杉格宽度,表单特有 integer，可选值1-24,
        titleWidth: 100, // 项标题所占宽度,表单特有 integer，可选值50-200,

        validation: 0, // 是否施加校验,可选值：0||1,
        validationMessage: '', // 校验不通过提示
        required: 0, // 是否必填,可选值：0||1,
        pattern: /[*]+/ig, // 校验正则,

        // 扩展参数
        props: '{}', // 额外配置，JSON.stringify(),
        extensionProps: '{}', // 额外配置，JSON.stringify(),
        params: '' // 额外私有参数 额外的参数（可以用来存放一些私有参数）any
      },
      tableCols: [
        {
          title: '序号',
          fixed: 'left',
          field: 'orderNum',
          align: 'left',
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
          title: '渲染类型',
          field: 'type',
          align: 'left',
          width: '150',
          cellRender: {
            name: '$vxeSelect',
            props: {
              clearable: true
            },
            options: [
              { value: '$vxeTree', label: '下拉树' },
              { value: '$vxeSelect', label: '下拉选择器' },
              { value: '$vxeCalculate', label: '金额计算列' },
              { value: '$vxeMoney', label: '金额输入框' },
              { value: '$vxeEditDownTextarea', label: '下拉文本框' },
              { value: '$vxeDays', label: '天数选择框' },
              { value: '$vxeTime', label: '时间日期选择框' },
              { value: '$vxeCheckbox', label: '多选列' },
              { value: '$vxeRadio', label: '单选列' },
              { value: '$vxeSwitch', label: '开关列' },
              { value: '$vxeProgress', label: '进度条' },
              { value: '$vxeInput', label: '输入框' },
              { value: '$vxeInput__search', label: '查询录入' },
              { value: '$vxeInput__text', label: '文本录入' },
              { value: '$vxeInput__number', label: '数字录入' },
              { value: '$vxeInput__integer', label: '整数录入' },
              { value: '$vxeInput__float', label: '浮点型录入' },
              { value: '$vxeInput__password', label: '密码录入' },
              { value: '$vxeInput__date', label: '日期录入' },
              { value: '$vxeInput__time', label: '时间输入' },
              { value: '$vxeInput__datetime', label: '日期时间录入' },
              { value: '$vxeInput__week', label: '周录入' },
              { value: '$vxeInput__month', label: '月份录入' },
              { value: '$vxeInput__year', label: '年份录入' },
              { value: '$vxeIntervar', label: '间隔时间或数值选择输入渲染器' }
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
              { value: 1, label: '是' },
              { value: 0, label: '否' }
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
              { value: 1, label: '是' },
              { value: 0, label: '否' }
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
              { value: 1, label: '是' },
              { value: 0, label: '否' }
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
              { value: 1, label: '是' },
              { value: 0, label: '否' }
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
              { value: 1, label: '是' },
              { value: 0, label: '否' }
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
          editRender: {
            name: '$vxeEditDownTextarea',
            props: {
              maxlength: 1200
            }
          }
        },
        {
          title: '是否分级汇总列',
          field: 'gradedSummary',
          align: 'center',
          width: '150',
          editRender: {
            name: '$vxeSelect',
            options: [
              { value: 0, label: '否' },
              { value: 1, label: '是' }
            ]
          }
        },
        // {
        //   title: '是否施加筛选',
        //   field: 'filters',
        //   align: 'center',
        //   width: '150',
        //   editRender: {
        //     name: '$vxeSelect',
        //     options: [
        //       { value: 1, label: '是' },
        //       { value: 0, label: '否' }
        //     ]
        //   }
        // },
        {
          title: '是否固定列',
          field: 'fixed',
          align: 'center',
          width: '150',
          editRender: {
            name: '$vxeSelect',
            options: [
              { value: '', label: '不固定' },
              { value: 'left', label: '固定在左边' },
              { value: 'left', label: '固定在右边' }
            ]
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
              { value: 1, label: '是' },
              { value: 0, label: '否' }
            ]
          }
        }
      ],
      tableEditCols: [
        {
          width: 40,
          title: '按住后可以上下拖动排序！',
          className: 'table-drop',
          slots: {
            default: (obj, h) => {
              return [
                <span class="drag-btn drag-btn-custom">
                  <i class="vxe-icon--menu"></i>
                </span>
              ]
            },
            header: ({ $table }, h) => {
              let bsTable = $table.$parent.$parent
              return [
                // <vxe-tooltip v-model={bsTable.showRowDropHelpTip} content="按住后可以上下拖动排序！" enterable>
                <i class="vxe-icon--question" onClick={() => { bsTable.showRowDropHelpTip = !bsTable.showRowDropHelpTip }}></i>
                // </vxe-tooltip>
              ]
            }
          }
        },
        // {
        //   title: '排序',
        //   align: 'left',
        //   width: '60',
        //   titleHelp: {
        //     message: '长按排序'
        //   },
        //   cellRender: {
        //     name: 'dragOrder'
        //   }
        // },
        {
          title: '序号',
          fixed: 'left',
          field: 'orderNum',
          align: 'left',
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
              { value: '$vxeTree', label: '下拉树' },
              { value: '$vxeSelect', label: '下拉选择器' },
              { value: '$vxeCalculate', label: '金额计算列' },
              { value: '$vxeMoney', label: '金额输入框' },
              { value: '$vxeEditDownTextarea', label: '下拉文本框' },
              { value: '$vxeDays', label: '天数选择框' },
              { value: '$vxeTime', label: '时间日期选择框' },
              { value: '$vxeCheckbox', label: '多选列' },
              { value: '$vxeRadio', label: '单选列' },
              { value: '$vxeSwitch', label: '开关列' },
              { value: '$vxeProgress', label: '进度条' },
              { value: '$vxeInput', label: '输入框' },
              { value: '$vxeInput__search', label: '查询录入' },
              { value: '$vxeInput__text', label: '文本录入' },
              // { value: '$vxeInput__number', label: '数字录入' },
              // { value: '$vxeInput__integer', label: '整数录入' },
              // { value: '$vxeInput__float', label: '浮点型录入' },
              // { value: '$vxeInput__password', label: '密码录入' },
              // { value: '$vxeInput__date', label: '日期录入' },
              // { value: '$vxeInput__time', label: '时间输入' },
              // { value: '$vxeInput__datetime', label: '日期时间录入' },
              // { value: '$vxeInput__week', label: '周录入' },
              // { value: '$vxeInput__month', label: '月份录入' },
              // { value: '$vxeInput__year', label: '年份录入' },
              { value: '$vxeIntervar', label: '间隔时间或数值选择输入渲染器' }
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
              { value: 1, label: '是' },
              { value: 0, label: '否' }
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
              { value: 1, label: '是' },
              { value: 0, label: '否' }
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
              { value: 1, label: '是' },
              { value: 0, label: '否' }
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
              { value: 1, label: '是' },
              { value: 0, label: '否' }
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
              { value: 1, label: '是' },
              { value: 0, label: '否' }
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
            name: '$vxeEditDownTextarea',
            props: {
              maxlength: 1200
            }
          }
        },
        {
          title: '是否分级汇总列',
          field: 'gradedSummary',
          align: 'center',
          width: '150',
          editRender: {
            name: '$vxeSelect',
            options: [
              { value: 0, label: '否' },
              { value: 1, label: '是' }
            ]
          }
        },
        // {
        //   title: '是否施加筛选',
        //   field: 'filters',
        //   align: 'center',
        //   width: '150',
        //   editRender: {
        //     name: '$vxeSelect',
        //     options: [
        //       { value: 1, label: '是' },
        //       { value: 0, label: '否' }
        //     ]
        //   }
        // },
        {
          title: '是否固定列',
          field: 'fixed',
          align: 'center',
          width: '150',
          editRender: {
            name: '$vxeSelect',
            options: [
              { value: '', label: '不固定' },
              { value: 'left', label: '固定在左边' },
              { value: 'left', label: '固定在右边' }
            ]
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
              { value: 1, label: '是' },
              { value: 0, label: '否' }
            ]
          }
        }
      ],
      tableEditRules: {
        title: [
          {
            message: '该列为子行，请输入英文字段名',
            trigger: 'change',
            validator: ({ $table, cellValue, rule, rules, row, rowIndex, column, columnIndex }) => {
              return new Promise((resolve, reject) => {
                let result = ''
                let mapObj = {}
                if (!cellValue) {
                  result = '列标题不能为空，不能重复！'
                } else {
                  $table.tableFullData.map((item) => {
                    if (!mapObj[item.title]) {
                      mapObj[item.title] = 1
                    } else {
                      if ((cellValue === item.title)) {
                        result = '当前列标题' + cellValue + '重复,重复，请调整标题名称'
                      }
                    }
                  })
                }
                if (!result) {
                  resolve(true)
                } else {
                  reject(new Error(result))
                }
              })
            }
          }
        ],
        columnName: [
          {
            message: '该列为子行，请输入英文字段名',
            trigger: 'change',
            validator: ({ $table, cellValue, rule, rules, row, rowIndex, column, columnIndex }) => {
              return new Promise((resolve, reject) => {
                let result = ''
                let mapObj = {}
                if (!row.isparentrow) {
                  if (!cellValue) {
                    result = '字段只能由字母数字和下划线组成，不能为空，不能重复！'
                  } else if (!/^[0-9A-Za-z_]{1,}$/ig.test(cellValue)) {
                    result = '字段只能由字母数字和下划线组成'
                  } else {
                    $table.tableFullData.map((item) => {
                      if (!mapObj[item.columnName]) {
                        mapObj[item.columnName] = 1
                      } else {
                        if ((cellValue === item.columnName)) {
                          result = '当前字段' + cellValue + '重复，请调整字段名称'
                        }
                      }
                    })
                  }
                  if (!result) {
                    resolve(true)
                  } else {
                    reject(new Error(result))
                  }
                } else {
                  if (cellValue === '') {
                    resolve(true)
                  } else {
                    result = '父级字段需为空！'
                    reject(new Error(result))
                  }
                }
              })
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
        // clengh: [
        //   {
        //     message: '该列为子行，请填写字段长度',
        //     trigger: 'change',
        //     validator: ({ cellValue, row, rule }) => {
        //       let isBlank = (value) => {
        //         return (value === undefined || value === null || value === '')
        //       }
        //       let needClength = ['$vxeEditDownTextarea', '$vxeInput']
        //       if (!row.isparentrow) {
        //         if (needClength.includes(row.type) && isBlank(cellValue)) {
        //           return new Error(rule.message)
        //         }
        //       }
        //       return true
        //     }
        //   }
        // ],
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
          title: '报表id',
          field: 'guid',
          align: 'left',
          span: 6,
          itemRender: {
            name: '$vxeInput',
            defaultValue: '',
            props: {
              placeholder: '请输入报表id',
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
          title: '区划编码',
          field: 'mofDivCode',
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
        // {
        //   title: '区划',
        //   field: 'mof_div_', // 区划对应字段 mof_div
        //   align: 'center',
        //   width: 260,
        //   filters: false,
        //   editRender: {
        //     name: '$vxeTree',
        //     props: {
        //       options: [], // 如果url为空, treeData会从options中获取, 如果有url, 会自动发请求
        //       config: {
        //         treeProps: {
        //           nodeKey: 'id',
        //           label: 'label',
        //           children: 'children'
        //         },
        //         multiple: false,
        //         axiosConfig: {
        //           method: 'post',
        //           url: 'plan-service/v2/elementtree'
        //         }
        //       },
        //       queryparams: {
        //         elementCode: 'ADM_DIV' // 全国的参数
        //       }
        //     }
        //   }
        // },
        // {
        //   title: '区域编码',
        //   field: 'mofDiv',
        //   align: 'left',
        //   span: 6,
        //   itemRender: {
        //     name: '$vxeTree',
        //     props: {
        //       clearable: true,
        //       disabled: true,
        //       config: {
        //         disabled: true,
        //         isHump: true,
        //         format: '{code}-{name}',
        //         treeProps: {
        //           labelFormat: '{code}-{name}',
        //           nodeKey: 'id',
        //           label: 'name',
        //           children: 'children'
        //         },
        //         multiple: false,
        //         isleaf: true,
        //         axiosConfig: {
        //           successCode: '100000', // 成功code
        //           statusField: 'code',
        //           method: 'get',
        //           url: 'bisConfig/config/basDicInfo/getDicInfoTree'
        //         }
        //       },
        //       queryparams: {
        //         eleCode: 'mofDivCode'
        //       }
        //     }
        //   }
        // },
        {
          title: '年份',
          field: 'fisalYear',
          align: 'left',
          span: 6,
          itemRender: {
            name: '$vxeSelect',
            props: {
              disabled: true,
              placeholder: '请录入年份'
            },
            options: [
              {
                value: '2021',
                label: '2021年'
              },
              {
                value: '2022',
                label: '2022年'
              },
              {
                value: '2023',
                label: '2023年'
              },
              {
                value: '2024',
                label: '2024年'
              },
              {
                value: '2025',
                label: '2025年'
              }
            ]
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
        // {
        //   title: '显示顺序',
        //   field: 'orderNum',
        //   align: 'left',
        //   span: 6,
        //   itemRender: {
        //     name: '$vxeInput',
        //     props: {
        //       placeholder: '请输入显示顺序',
        //       size: 'small',
        //       type: 'number',
        //       min: 0,
        //       max: 42,
        //       disabled: true
        //     }
        //   }
        // },
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
        {
          title: '公式和约束等依赖的行坐标字段',
          field: 'rowCoordFieldName',
          span: 6,
          itemRender: {
            name: '$vxeInput',
            options: [],
            props: {
              placeholder: '公式和约束等依赖的行坐标字段',
              disabled: true
            }
          }
        },
        {
          title: '父级目录',
          field: 'parent',
          span: 6,
          itemRender: {
            name: '$vxeTree',
            props: {
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
                disabled: false,
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
              { value: 1, label: '是' },
              { value: 0, label: '否' }
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
              { value: 1, label: '是' },
              { value: 0, label: '否' }
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
              { value: 0, label: '是' },
              { value: 1, label: '否' }
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
              { value: 1, label: '是' },
              { value: 0, label: '否' }
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
          title: '报表id',
          field: 'guid',
          align: 'left',
          span: 6,
          itemRender: {
            name: '$vxeInput',
            defaultValue: '',
            props: {
              placeholder: '请输入报表id',
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
              placeholder: '请输入报表编码',
              size: 'small'
            }
          }
        },
        {
          title: '区划编码',
          field: 'mofDivCode',
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
          title: '年份',
          field: 'fisalYear',
          align: 'left',
          span: 6,
          itemRender: {
            name: '$vxeSelect',
            props: {
              placeholder: '请录入年份'
            },
            options: [
              {
                value: '2021',
                label: '2021年'
              },
              {
                value: '2022',
                label: '2022年'
              },
              {
                value: '2023',
                label: '2023年'
              },
              {
                value: '2024',
                label: '2024年'
              },
              {
                value: '2025',
                label: '2025年'
              }
            ]
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
        // {
        //   title: '显示顺序',
        //   field: 'orderNum',
        //   align: 'left',
        //   span: 6,
        //   itemRender: {
        //     name: '$vxeInput',
        //     props: {
        //       placeholder: '请输入显示顺序',
        //       size: 'small',
        //       type: 'number',
        //       min: 0,
        //       max: 42
        //     }
        //   }
        // },
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
          title: '公式和约束等依赖的行坐标字段',
          field: 'rowCoordFieldName',
          span: 6,
          itemRender: {
            name: '$vxeInput',
            options: [],
            props: {
              placeholder: '公式和约束等依赖的行坐标字段',
              disabled: false
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
              { value: 1, label: '是' },
              { value: 0, label: '否' }
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
              { value: 1, label: '是' },
              { value: 0, label: '否' }
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
              { value: 1, label: '是' },
              { value: 0, label: '否' }
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
        // orderNum: [
        //   {
        //     required: true,
        //     message: '请输入显示顺序',
        //     trigger: 'change'
        //   }
        // ],
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
