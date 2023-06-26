const manageFormlistConf = {
  tableConf: {
    type: 'form',
    tableConfig: {
      globalConfig: {
        // 全局配置
        checkType: 'checkbox', // hasCheckbox
        seq: true, // 序号列
        // hasOptionRow: true // 操作列
        optionSort: true
      },
      formatters: {
      },
      cellRenderConfig: {
        // cellRender渲染器名字配置
        // autofocus 自动聚焦的类名
        // renderHeader(h, renderOpts, params) 表头
        // renderEdit(h, renderOpts, params) 表内容 - 编辑
        // renderCell(h, renderOpts, params) 表内容 - 显示
        // renderFooter(h, renderOpts, params) 表尾
        // editCellExportMethod(params) 单元格导出函数
        // footerCellExportMethod(params) 表尾单元格导出函数
        optionRow: {
          type: 'cellRender', // renderEdit
          name: 'optionRow'
        }
      },
      renderers: {
        optionRow: {
          renderDefault(h, cellRender, params, context) {
            let self = context.$grid.$parent
            let { row, column } = params
            // <a class="optionRow" href={row.link}>{'操作' + row[column.property]}</a>
            if (row.status === 0) {
              return [
                <a class="optionRow-delete fn-inline" onClick={() => self.onOptionRowClick({ row, column, optionType: 'delete' })}>删除</a>,
                <a class="optionRow-edit fn-inline" onClick={() => self.onOptionRowClick({ row, column, optionType: 'edit' })}>编辑</a>,
                <a class="optionRow-report fn-inline" onClick={() => self.onOptionRowClick({ row, column, optionType: 'report' })}>上报</a>,
                <a class="optionRow-detail fn-inline" onClick={() => self.onOptionRowClick({ row, column, optionType: 'detail' })}>详情</a>
              ]
            } else {
              return [
                <a class="optionRow-delete fn-inline" onClick={() => self.onOptionRowClick({ row, column, optionType: 'delete' })}>删除</a>,
                <a class="optionRow-detail fn-inline" onClick={() => self.onOptionRowClick({ row, column, optionType: 'detail' })}>详情</a>
              ]
            }
          }
        },
        personality: {
          renderDefault(h, cellRender, { row, column }, context) {
            let sex = ['女', '男']
            let age = ['优秀青年', '优秀青年', '优秀青年', '杰出中年', '杰出中年', '杰出中年', '颐养天年', '颐养天年', '颐养天年', '颐养天年', '颐养天年', '颐养天年', '颐养天年']
            let result = age[Math.floor(row.age / 10)] + sex[row.sex]
            return [<span class="text">{result}</span>]
          }
        }
      },
      methods: {
        // 用户自定义配置对应事件
        toolbarButtonClickEvent(obj, context, e) {
          switch (obj.code) {
            case '':
              break
            default:
          }
        },
        onOptionRowClick({ row, optionType }) {
          console.log(this)
          switch (optionType) {
            case 'delete':
              console.log('delete', row)
              break
            case 'edit':
              console.log('edit', row)
              break
            case 'report':
              console.log('report', row)
              break
            case 'detail':
              console.log('detail', row)
              break
            default:
          }
        }
      }
    },
    tableColumnsConfig: [
      {
        title: '列中文名',
        field: 'title',
        width: 200,
        align: 'center',
        sortable: false,
        filters: false,
        editRender: {
          name: '$input',
          defaultValue: '',
          props: {
            type: 'string',
            placeholder: '列中文名'
          }
        }
      },
      {
        title: '数据库字段',
        field: 'field',
        width: 200,
        sortable: false,
        filters: false,
        align: 'center',
        editRender: {
          name: '$input',
          defaultValue: '',
          props: {
            type: 'string',
            placeholder: '数据库字段'
          }
        }
      },
      {
        title: '列固定方式',
        field: 'fixed',
        width: 200,
        sortable: false,
        filters: false,
        align: 'center',
        editRender: {
          name: '$select',
          defaultValue: false,
          options: [
            { value: 'left', label: '居左' },
            { value: false, label: '不固定' },
            { value: 'right', label: '居右' }
          ],
          props: {
            placeholder: '列固定方式'
          }
        }
      },
      {
        title: '列宽度',
        field: 'width',
        width: 200,
        sortable: false,
        filters: false,
        align: 'center',
        editRender: {
          name: '$input',
          defaultValue: 200,
          props: {
            type: 'integer',
            placeholder: '列宽度'
          }
        }
      },
      {
        title: '列对齐方式',
        field: 'align',
        width: 200,
        sortable: false,
        filters: false,
        align: 'center',
        editRender: {
          name: '$select',
          defaultValue: 'center',
          options: [
            { value: 'left', label: '居左' },
            { value: 'center', label: '居中' },
            { value: 'right', label: '居右' }
          ],
          props: {
            placeholder: '列对齐方式'
          }
        }
      },

      {
        title: '是否可编辑',
        field: 'renderType',
        width: 200,
        sortable: false,
        filters: false,
        editRender: {
          name: '$select',
          defaultValue: 'cellRender',
          options: [
            { value: 'editRender', label: '可编辑' },
            { value: 'cellRender', label: '不可编辑' }
          ],
          props: {
            placeholder: '渲染器类型'
          }
        }
      },
      {
        title: '列类型',
        field: 'renderName',
        width: 120,
        sortable: false,
        filters: false,
        align: 'center',
        editRender: {
          name: '$select',
          options: [
            { value: '$input', label: 'input' },
            { value: '$select', label: 'select' },
            { value: '$EditDownTextarea', label: 'textarea' },
            { value: '$vxeDays', label: 'days' },
            { value: '$calculateRender', label: 'calculate' },
            { value: '$moneyRender', label: 'money' },
            { value: '$vxeSelect', label: 'vxeSelect' },
            { value: '$vxeRadio', label: 'radio' },
            { value: '$vxeTime', label: 'time' }
          ],
          props: {
            placeholder: '列类型'
          }
        }
      },
      {
        title: '列公式',
        field: 'formula',
        width: 300,
        sortable: false,
        filters: false,
        align: 'center',
        editRender: {
          name: '$EditDownTextarea',
          defaultValue: '',
          props: {
            type: 'text',
            placeholder: '下拉数据源'
          }
        }
      },
      {
        title: '列是否以及合计',
        field: 'combinedType',
        width: 120,
        sortable: false,
        filters: false,
        align: 'center',
        editRender: {
          name: '$select',
          options: [
            { value: 'average', label: '平均值' },
            { value: 'subTotal', label: '选中合计' },
            { value: 'total', label: '当前页合计' },
            { value: 'totalAll', label: '所有合计' }
          ],
          props: {
            placeholder: '列是否以及合计'
          }
        }
      },
      {
        field: 'options',
        title: '下拉数据源',
        span: 8,
        width: 250,
        sortable: false,
        filters: false,
        tooltip: true,
        editRender: {
          name: '$EditDownTextarea',
          defaultValue: '',
          props: {
            type: 'text',
            placeholder: '下拉数据源'
          }
        }
      },
      {
        field: 'defaultValue',
        title: '默认值',
        span: 8,
        width: 250,
        sortable: false,
        filters: false,
        tooltip: true,
        editRender: {
          name: '$input',
          defaultValue: '',
          props: {
            type: 'text',
            placeholder: '默认值'
          }
        }
      },
      {
        title: '是否可排序',
        field: 'sortable',
        width: 250,
        sortable: false,
        filters: false,
        align: 'center',
        editRender: {
          name: '$select',
          defaultValue: 1,
          options: [
            { value: true, label: '是' },
            { value: false, label: '否' }
          ],
          props: {
            placeholder: '是否可排序'
          }
        }
      },
      {
        title: '是否可筛选',
        field: 'filters',
        width: 250,
        sortable: false,
        filters: false,
        align: 'center',
        editRender: {
          name: '$select',
          defaultValue: 1,
          options: [
            { value: true, label: '是' },
            { value: false, label: '否' }
          ],
          props: {
            placeholder: '是否可筛选'
          }
        }
      },
      {
        field: 'props',
        title: '额外参数',
        span: 8,
        width: 250,
        sortable: false,
        filters: false,
        tooltip: true,
        editRender: {
          name: '$EditDownJson',
          defaultValue: {},
          props: {
            type: 'text',
            placeholder: '额外参数'
          }
        }
      }
    ],
    editRules: {
    },
    tableData: [
      {
        title: 'title', // 列中文名
        field: 'field', // 数据库字段
        fixed: false, // 列固定类型
        width: 200, // 列宽度
        align: 'center', // 列对齐方式
        sortable: true, // 是否可排序
        formula: '', // 公式
        filters: true, // 是否可筛选
        renderType: 'cellRender', // 是否可编辑
        renderName: '$input', // 渲染器名,
        combinedType: [],
        options: '009#博士后+001#小学+002#初中+003#高中+004#中专+005#大专+006#本科+007#硕士+008#博士', // 下拉数据源
        defaultValue: '', // 默认值
        props: {}// 额外参数
      }
    ],
    tableStandardData: [{
      title: 'title', // 列中文名
      field: 'field', // 数据库字段
      fixed: false, // 列固定类型
      width: 200, // 列宽度
      align: 'center', // 列对齐方式
      sortable: true, // 是否可排序
      filters: true, // 是否可筛选
      renderType: 'cellRender', // 是否可编辑
      renderName: '$input', // 渲染器名,
      formula: '', // 公式
      options: '009#博士后+001#小学+002#初中+003#高中+004#中专+005#大专+006#本科+007#硕士+008#博士', // 下拉数据源
      defaultValue: '', // 默认值
      params: {}, // 额外参数
      combinedType: ['average', 'subTotal', 'total', 'totalAll'],
      editRender: {
        name: '$input',
        defaultValue: 1,
        props: {
          type: 'number',
          placeholder: '抢输入年龄',
          redonly: true
        }
      }
    }],
    toolbarConfig: { // table工具栏配置
      moneyConversion: true, // 是否有金额转换
      slots: {
        tools: 'toolbarTools',
        buttons: 'toolbarSlots'
      }
    }
  },
  formConf: {
    formItemsConfig: [
      {
        title: '项中文名',
        field: 'title',
        width: 200,
        align: 'center',
        sortable: false,
        filters: false,
        editRender: {
          name: '$input',
          defaultValue: '',
          props: {
            type: 'string',
            placeholder: '项中文名'
          }
        }
      },
      {
        title: '数据库字段',
        field: 'field',
        width: 200,
        sortable: false,
        filters: false,
        align: 'center',
        editRender: {
          name: '$input',
          defaultValue: '',
          props: {
            type: 'string',
            placeholder: '数据库字段'
          }
        }
      },
      {
        title: '项固定方式',
        field: 'fixed',
        width: 200,
        sortable: false,
        filters: false,
        align: 'center',
        editRender: {
          name: '$select',
          defaultValue: false,
          options: [
            { value: 'left', label: '居左' },
            { value: false, label: '不固定' },
            { value: 'right', label: '居右' }
          ],
          props: {
            placeholder: '列固定方式'
          }
        }
      },
      {
        title: '项所占杉格宽度',
        field: 'width',
        width: 200,
        sortable: false,
        filters: false,
        align: 'center',
        editRender: {
          name: '$input',
          defaultValue: 200,
          props: {
            type: 'integer',
            placeholder: '项所占杉格宽度'
          }
        }
      },
      {
        title: '列对齐方式',
        field: 'align',
        width: 200,
        sortable: false,
        filters: false,
        align: 'center',
        editRender: {
          name: '$select',
          defaultValue: 'center',
          options: [
            { value: 'left', label: '居左' },
            { value: 'center', label: '居中' },
            { value: 'right', label: '居右' }
          ],
          props: {
            placeholder: '列对齐方式'
          }
        }
      },

      {
        title: '是否可编辑',
        field: 'renderType',
        width: 200,
        sortable: false,
        filters: false,
        editRender: {
          name: '$select',
          defaultValue: 'cellRender',
          options: [
            { value: 'editRender', label: '可编辑' },
            { value: 'cellRender', label: '不可编辑' }
          ],
          props: {
            placeholder: '渲染器类型'
          }
        }
      },
      {
        title: '列类型',
        field: 'renderName',
        width: 120,
        sortable: false,
        filters: false,
        align: 'center',
        editRender: {
          name: '$select',
          options: [
            { value: '$input', label: 'input' },
            { value: '$select', label: 'select' },
            { value: '$EditDownTextarea', label: 'textarea' },
            { value: '$vxeDays', label: 'days' },
            { value: '$calculateRender', label: 'calculate' },
            { value: '$moneyRender', label: 'money' },
            { value: '$vxeSelect', label: 'vxeSelect' },
            { value: '$vxeRadio', label: 'radio' },
            { value: '$vxeTime', label: 'time' }
          ],
          props: {
            placeholder: '列类型'
          }
        }
      },
      {
        title: '列公式',
        field: 'formula',
        width: 300,
        sortable: false,
        filters: false,
        align: 'center',
        editRender: {
          name: '$EditDownTextarea',
          defaultValue: '',
          props: {
            type: 'text',
            placeholder: '下拉数据源'
          }
        }
      },
      {
        title: '列是否以及合计',
        field: 'combinedType',
        width: 120,
        sortable: false,
        filters: false,
        align: 'center',
        editRender: {
          name: '$select',
          options: [
            { value: 'average', label: '平均值' },
            { value: 'subTotal', label: '选中合计' },
            { value: 'total', label: '当前页合计' },
            { value: 'totalAll', label: '所有合计' }
          ],
          props: {
            placeholder: '列是否以及合计'
          }
        }
      },
      {
        field: 'options',
        title: '下拉数据源',
        span: 8,
        width: 250,
        sortable: false,
        filters: false,
        tooltip: true,
        editRender: {
          name: '$EditDownTextarea',
          defaultValue: '',
          props: {
            type: 'text',
            placeholder: '下拉数据源'
          }
        }
      },
      {
        field: 'defaultValue',
        title: '默认值',
        span: 8,
        width: 250,
        sortable: false,
        filters: false,
        tooltip: true,
        editRender: {
          name: '$input',
          defaultValue: '',
          props: {
            type: 'text',
            placeholder: '默认值'
          }
        }
      },
      {
        title: '是否可排序',
        field: 'sortable',
        width: 250,
        sortable: false,
        filters: false,
        align: 'center',
        editRender: {
          name: '$select',
          defaultValue: 1,
          options: [
            { value: true, label: '是' },
            { value: false, label: '否' }
          ],
          props: {
            placeholder: '是否可排序'
          }
        }
      },
      {
        title: '是否可筛选',
        field: 'filters',
        width: 250,
        sortable: false,
        filters: false,
        align: 'center',
        editRender: {
          name: '$select',
          defaultValue: 1,
          options: [
            { value: true, label: '是' },
            { value: false, label: '否' }
          ],
          props: {
            placeholder: '是否可筛选'
          }
        }
      },
      {
        field: 'props',
        title: '额外参数',
        span: 8,
        width: 250,
        sortable: false,
        filters: false,
        tooltip: true,
        editRender: {
          name: '$EditDownJson',
          defaultValue: {},
          props: {
            type: 'text',
            placeholder: '额外参数'
          }
        }
      }
    ],
    queryformItemsConfig: [
      {
        field: 'tableName',
        title: '报表名称',
        itemRender: {
          name: '$vxeFormInput',
          props: {
            type: 'text',
            placeholder: '报表名称'
          }
        }
      },
      {
        field: 'businessTableName',
        title: '业务表名',
        itemRender: {
          name: '$vxeFormInput',
          props: {
            type: 'text',
            placeholder: '业务表名'
          }
        }
      },
      {
        field: 'tableNote',
        title: '报表备注',
        itemRender: {
          name: '$vxeFormInput',
          props: {
            type: 'text',
            placeholder: '备注'
          }
        }
      },
      {
        field: 'measuringUnit',
        title: '计量单位',
        itemRender: {
          name: '$vxeFormSelect',
          options: [
            { value: 1, label: '元' },
            { value: 10000, label: '万元' }
          ],
          props: {
            placeholder: '计量单位'
          }
        }
      },
      {
        field: 'viewOrder',
        title: '显示顺序',
        itemRender: {
          name: '$vxeFormSelect',
          options: [
            { value: '001', label: '升序' },
            { value: '002', label: '降序' }
          ],
          props: {
            placeholder: '显示顺序'
          }
        }
      },
      {
        field: 'editableBatch',
        title: '可编辑批次',
        itemRender: {
          name: '$vxeFormSelect',
          options: [
            { value: '001', label: '1-一上' },
            { value: '002', label: '1-二上' }
          ],
          props: {
            multiple: true,
            placeholder: '可编辑批次'
          }
        }
      },
      {
        field: 'tableType',
        title: '报表类型',
        itemRender: {
          name: '$vxeFormSelect',
          options: [
            { value: '000', label: '基础信息表' },
            { value: '001', label: '预算数据表' }
          ],
          props: {
            placeholder: '报表类型'
          }
        }
      },
      {
        title: '备注',
        field: 'note',
        align: 'center',
        span: 20,
        tooltip: true,
        itemRender: {
          name: 'textarea',
          props: {
            rows: 4,
            type: 'text',
            placeholder: '请填写备注'
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
    ]
  }
}

export default function (tableType, configType) {
  if (tableType && configType) {
    return manageFormlistConf[tableType][configType]
  } else if (tableType) {
    return manageFormlistConf[tableType]
  } else {
    return null
  }
}
