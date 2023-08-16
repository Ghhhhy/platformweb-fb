const manageFormlistConf = {
  tableInforConf: {
    type: 'form',
    tableConfig: {
      globalConfig: {
        // 全局配置
        checkType: 'checkbox', // hasCheckbox
        seq: true, // 序号列
        // hasOptionRow: true // 操作列
        optionSort: false
      }
    },
    tableColumnsConfig: [
      {
        field: 'mof_div_code',
        title: '区划',
        // width: 200,
        editRender: {
          name: '$vxeSelect',
          defaultValue: '310000000',
          options: [
            { value: '310000000', label: '上海' },
            { value: '220000000', label: '吉林省' },
            { value: '610000000', label: '陕西省' },
            { value: '350000000', label: '福建' }
          ],
          props: {
            type: 'text',
            placeholder: '区划'
          }
        }
      },
      {
        field: 'fiscalyear',
        title: '年份',
        // width: 200,
        editRender: {
          name: '$vxeSelect',
          options: [
            { value: '2021', label: '2021' },
            { value: '2022', label: '2022' },
            { value: '2023', label: '2023' }
          ],
          defaultValue: '2022',
          props: {
            type: 'text',
            placeholder: '年份'
          }
        }
      },
      {
        field: 'tablename',
        title: '报表名称',
        // width: 200,
        editRender: {
          name: '$vxeInput',
          props: {
            type: 'text',
            placeholder: '报表名称'
          }
        }
      },
      {
        field: 'type',
        title: '报表类型',
        // width: 200,
        editRender: {
          name: '$vxeSelect',
          options: [
            { value: 'tableConf', label: '展示表' },
            { value: 'formConf', label: '录入项' },
            { value: 'detailConf', label: '展示项' },
            { value: 'radioConf', label: '单选项' },
            { value: 'tabPaneConf', label: '页签' },
            { value: 'enteringDefault', label: '录入默认值' }
          ],
          props: {
            type: 'text',
            placeholder: '报表名称'
          }
        }
      },
      {
        field: 'menuname',
        title: '菜单名',
        // width: 200,
        editRender: {
          name: '$vxeInput',
          props: {
            type: 'text',
            placeholder: '报表名称'
          }
        }
      },
      {
        field: 'menuguid',
        title: '菜单id',
        // width: 200,
        editRender: {
          name: '$vxeInput',
          props: {
            type: 'text',
            placeholder: '报表id'
          }
        }
      },
      {
        field: 'id',
        title: '报表id',
        // width: 200,
        editRender: {
          name: '$vxeInput',
          props: {
            type: 'text',
            placeholder: '报表名称'
          }
        }
      },
      {
        field: 'updatetime',
        title: '更新时间',
        // width: 200,
        editRender: {
          name: '$vxeInput',
          props: {
            type: 'text',
            placeholder: '报表名称'
          }
        }
      }
      // {
      //   field: 'businessTableName',
      //   title: '业务表名',
      //   width: 200,
      //   editRender: {
      //     name: '$input',
      //     props: {
      //       type: 'text',
      //       placeholder: '业务表名'
      //     }
      //   }
      // },
      // {
      //   field: 'tableNote',
      //   title: '报表备注',
      //   width: 300,
      //   editRender: {
      //     name: '$input',
      //     props: {
      //       type: 'text',
      //       placeholder: '报表备注'
      //     }
      //   }
      // },
      // {
      //   field: 'measuringUnit',
      //   title: '计量单位',
      //   width: 200,
      //   editRender: {
      //     name: '$select',
      //     options: [
      //       { value: 1, label: '元' },
      //       { value: 10000, label: '万元' }
      //     ],
      //     props: {
      //       placeholder: '计量单位'
      //     }
      //   }
      // },
      // {
      //   field: 'viewOrder',
      //   title: '显示顺序',
      //   width: 200,
      //   editRender: {
      //     name: '$select',
      //     options: [
      //       { value: '001', label: '升序' },
      //       { value: '002', label: '降序' }
      //     ],
      //     props: {
      //       placeholder: '显示顺序'
      //     }
      //   }
      // },
      // {
      //   field: 'editableBatch',
      //   title: '可编辑批次',
      //   width: 200,
      //   editRender: {
      //     name: '$select',
      //     options: [
      //       { value: '001', label: '1-一上' },
      //       { value: '002', label: '1-二上' }
      //     ],
      //     props: {
      //       multiple: true,
      //       placeholder: '可编辑批次'
      //     }
      //   }
      // },
      // {
      //   field: 'tableType',
      //   title: '报表类型',
      //   width: 200,
      //   editRender: {
      //     name: '$select',
      //     options: [
      //       { value: '000', label: '基础信息表' },
      //       { value: '001', label: '预算数据表' }
      //     ],
      //     props: {
      //       placeholder: '报表类型'
      //     }
      //   }
      // },
      // {
      //   title: '备注',
      //   field: 'note',
      //   align: 'center',
      //   width: 200,
      //   tooltip: true,
      //   editRender: {
      //     name: '$EditDownTextarea',
      //     props: {
      //       rows: 4,
      //       type: 'text',
      //       placeholder: '请填写备注'
      //     }
      //   }
      // },
      // {
      //   title: '是否自动建表和视图',
      //   field: 'autoBuiltTables',
      //   align: 'center',
      //   width: 200,
      //   editRender: {
      //     name: '$select',
      //     options: [
      //       { value: 0, label: '否' },
      //       { value: 1, label: '是' }
      //     ],
      //     props: {
      //       placeholder: '是否自动建表和视图'
      //     }
      //   }
      // },
      // {
      //   title: '表格是否可编辑',
      //   field: 'editble',
      //   align: 'center',
      //   width: 200,
      //   editRender: {
      //     name: '$select',
      //     options: [
      //       { value: 0, label: '否' },
      //       { value: 1, label: '是' }
      //     ],
      //     props: {
      //       placeholder: '报表类型'
      //     }
      //   }
      // },
      // {
      //   title: '是否显示复选框',
      //   field: 'showCheckbox',
      //   align: 'center',
      //   width: 200,
      //   editRender: {
      //     name: '$select',
      //     options: [
      //       { value: 0, label: '否' },
      //       { value: 1, label: '是' }
      //     ],
      //     props: {
      //       placeholder: '是否显示复选框'
      //     }
      //   }
      // },
      // {
      //   title: '是否显示小计行',
      //   field: 'subtotalRows',
      //   align: 'center',
      //   width: 200,
      //   editRender: {
      //     name: '$select',
      //     options: [
      //       { value: 0, label: '否' },
      //       { value: 1, label: '是' }
      //     ],
      //     props: {
      //       placeholder: '是否显示小计行'
      //     }
      //   }
      // }
    ],
    tableData: [
      {
        tableName: '1',
        businessTableName: '1',
        tableNote: '1',
        measuringUnit: 1,
        viewOrder: '001',
        editableBatch: '001',
        tableType: '001',
        note: '1',
        autoBuiltTables: false,
        editble: true,
        showCheckbox: true,
        canUse: true,
        aSingleTable: false,
        batchModify: false,
        rowConfig: false,
        noRecordIsAllowedToReport: true,
        subtotalRows: true
      }],
    editRules: {},
    toolbarConfig: { // table工具栏配置
      moneyConversion: true, // 是否有金额转换
      slots: {
        tools: 'toolbarTools',
        buttons: 'toolbarSlots'
      }
    }
  },
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
      renderers: {}
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
          name: '$vxeInput',
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
          name: '$vxeInput',
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
          name: '$vxeSelect',
          defaultValue: '',
          options: [
            { value: 'left', label: '居左' },
            { value: '', label: '不固定' },
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
          name: '$vxeInput',
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
          name: '$vxeSelect',
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
          name: '$vxeSelect',
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
          name: '$vxeSelect',
          options: [
            { value: '$vxeInput', label: '输入框' },
            { value: '$vxeSelect', label: '下拉选择' },
            { value: '$vxeCalculate', label: '计算' },
            { value: '$vxeMoney', label: '金额' },
            { value: '$vxeEditDownTextarea', label: '文本输入框' },
            { value: '$vxeDays', label: '天数' },
            { value: '$vxeTime', label: '时间' },
            { value: '$vxeRadio', label: '单选' },
            { value: '$vxeCheckbox', label: '复选' },
            { value: '$treeinput', label: '下拉树' },
            { value: '$EditDownJson', label: 'JSON' },
            { value: '$href', label: '链接' },
            { value: '$vxeProgress', label: '进度条' },
            { value: '$vxeSwitch', label: '开关' },
            { value: '$vxeTree', label: '通用树' }
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
        title: '列约束',
        field: 'constraint',
        width: 300,
        sortable: false,
        filters: false,
        align: 'center',
        editRender: {
          name: '$EditDownTextarea',
          defaultValue: '',
          props: {
            type: 'text',
            placeholder: '列约束'
          }
        }
      },
      {
        title: '列合计类型',
        field: 'combinedType',
        width: 120,
        sortable: false,
        filters: false,
        align: 'center',
        editRender: {
          name: '$vxeSelect',
          options: [
            { value: 'average', label: '平均值' },
            { value: 'subTotal', label: '选中合计' },
            { value: 'total', label: '当前页合计' },
            { value: 'totalAll', label: '所有合计' }
          ],
          props: {
            multiple: true,
            placeholder: '列合计类型'
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
          name: '$vxeInput',
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
          name: '$vxeSelect',
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
          name: '$vxeSelect',
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
        field: 'associatedQuery',
        title: '关联查询条件',
        span: 8,
        width: 250,
        sortable: false,
        filters: false,
        tooltip: true,
        editRender: {
          name: '$EditDownJson',
          defaultValue: {
            queryMethods: '',
            queryUrl: '',
            params: {}
          },
          props: {
            type: 'text',
            placeholder: '额外参数'
          }
        }
      },
      {
        field: 'className',
        title: '列附加class',
        span: 8,
        width: 250,
        sortable: false,
        filters: false,
        tooltip: true,
        editRender: {
          name: '$vxeInput',
          defaultValue: '',
          props: {
            type: 'text',
            placeholder: '列附加class'
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

    editRules: {},
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
        props: {} // 额外参数
      }],
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
      calculator: false,
      refresh: false,
      slots: {
        tools: 'toolbarTools',
        buttons: 'toolbarSlots'
      }
    }
  },
  radioConf: {
    // 单选框配置
    radioColumnsConfig: [
      {
        title: '单选项名称',
        field: 'label',
        width: 200,
        align: 'center',
        sortable: false,
        filters: false,
        editRender: {
          name: '$vxeInput',
          defaultValue: '',
          props: {
            type: 'string',
            placeholder: '单选项名称'
          }
        }
      },
      {
        title: '数据库字段',
        field: 'code',
        width: 200,
        sortable: false,
        filters: false,
        align: 'center',
        editRender: {
          name: '$vxeInput',
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
          name: '$vxeSelect',
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
          name: '$vxeInput',
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
          name: '$vxeSelect',
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
          name: '$vxeSelect',
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
          name: '$vxeSelect',
          options: [
            { value: '$vxeInput', label: '输入框' },
            { value: '$vxeSelect', label: '下拉选择' },
            { value: '$vxeCalculate', label: '计算' },
            { value: '$vxeMoney', label: '金额' },
            { value: '$vxeEditDownTextarea', label: '文本输入框' },
            { value: '$vxeDays', label: '天数' },
            { value: '$vxeTime', label: '时间' },
            { value: '$vxeRadio', label: '单选' },
            { value: '$vxeCheckbox', label: '复选' },
            { value: '$treeinput', label: '下拉树' },
            { value: '$EditDownJson', label: 'JSON' },
            { value: '$href', label: '链接' },
            { value: '$vxeProgress', label: '进度条' },
            { value: '$vxeSwitch', label: '开关' },
            { value: '$vxeTree', label: '通用树' }
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
        title: '列约束',
        field: 'constraint',
        width: 300,
        sortable: false,
        filters: false,
        align: 'center',
        editRender: {
          name: '$EditDownTextarea',
          defaultValue: '',
          props: {
            type: 'text',
            placeholder: '列约束'
          }
        }
      },
      {
        title: '列合计类型',
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
            placeholder: '列合计类型'
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
          name: '$vxeInput',
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
          name: '$vxeSelect',
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
          name: '$vxeSelect',
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
        field: 'associatedQuery',
        title: '关联查询条件',
        span: 8,
        width: 250,
        sortable: false,
        filters: false,
        tooltip: true,
        editRender: {
          name: '$EditDownJson',
          defaultValue: {
            queryMethods: '',
            queryUrl: '',
            params: {}
          },
          props: {
            type: 'text',
            placeholder: '额外参数'
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
    ]
  },
  formConf: {
    formItemsDatas: [{}],
    formItemsConfig: [
      {
        title: '项中文名',
        field: 'title',
        width: 200,
        align: 'center',
        sortable: false,
        filters: false,
        editRender: {
          name: '$vxeInput',
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
          name: '$vxeInput',
          defaultValue: '',
          props: {
            type: 'string',
            placeholder: '数据库字段'
          }
        }
      },
      // {
      //   title: '项固定方式',
      //   field: 'fixed',
      //   width: 200,
      //   sortable: false,
      //   filters: false,
      //   align: 'center',
      //   editRender: {
      //     name: '$select',
      //     defaultValue: false,
      //     options: [
      //       { value: 'left', label: '居左' },
      //       { value: false, label: '不固定' },
      //       { value: 'right', label: '居右' }
      //     ],
      //     props: {
      //       placeholder: '列固定方式'
      //     }
      //   }
      // },
      {
        title: '项所占杉格宽度',
        field: 'width',
        width: 200,
        sortable: false,
        filters: false,
        align: 'center',
        editRender: {
          name: '$vxeInput',
          defaultValue: 8,
          props: {
            type: 'integer',
            placeholder: '项所占杉格宽度'
          }
        }
      },
      {
        title: '项对齐方式',
        field: 'align',
        width: 200,
        sortable: false,
        filters: false,
        align: 'center',
        editRender: {
          name: '$vxeSelect',
          defaultValue: 'left',
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
      // {
      //   title: '渲染器',
      //   field: 'renderType',
      //   width: 200,
      //   sortable: false,
      //   filters: false,
      //   editRender: {
      //     name: '$select',
      //     defaultValue: 'cellRender',
      //     options: [
      //       { value: 'itemRender', label: '表单' }
      //     ],
      //     props: {
      //       placeholder: '渲染器类型'
      //     }
      //   }
      // },
      {
        title: '项类型',
        field: 'renderName',
        width: 120,
        sortable: false,
        filters: false,
        align: 'center',
        editRender: {
          name: '$vxeSelect',
          options: [
            { value: '$vxeInput', label: '输入框' },
            { value: '$vxeSelect', label: '下拉选择' },
            { value: '$vxeCalculate', label: '计算' },
            { value: '$formMoneyInputRender', label: '金额' },
            { value: '$vxeEditDownTextarea', label: '文本输入' },
            { value: '$vxeDays', label: '天数' },
            { value: '$vxeTime', label: '时间选择' },
            { value: '$vxeFormRadio', label: '单选' },
            { value: '$vxeFormCheckbox', label: '复选' },
            { value: '$formTreeInput', label: '下拉树' },
            { value: '$vxeProgress', label: '进度条' },
            { value: '$vxeSwitch', label: '开关' },
            { value: '$vxeTree', label: '通用树' }
          ],
          props: {
            placeholder: '列类型'
          }
        }
      },
      {
        title: '项公式',
        field: 'formula',
        width: 300,
        sortable: false,
        filters: false,
        align: 'center',
        editRender: {
          name: '$vxeEditDownTextarea',
          defaultValue: '',
          props: {
            type: 'text',
            placeholder: '下拉数据源'
          }
        }
      },
      // {
      //   title: '列是否以及合计',
      //   field: 'combinedType',
      //   width: 120,
      //   sortable: false,
      //   filters: false,
      //   align: 'center',
      //   editRender: {
      //     name: '$select',
      //     options: [
      //       { value: 'average', label: '平均值' },
      //       { value: 'subTotal', label: '选中合计' },
      //       { value: 'total', label: '当前页合计' },
      //       { value: 'totalAll', label: '所有合计' }
      //     ],
      //     props: {
      //       placeholder: '列是否以及合计'
      //     }
      //   }
      // },
      {
        field: 'options',
        title: '下拉数据源',
        span: 8,
        width: 250,
        sortable: false,
        filters: false,
        tooltip: true,
        editRender: {
          name: '$vxeEditDownTextarea',
          defaultValue: '',
          props: {
            type: 'text',
            placeholder: '下拉数据源'
          }
        }
      },
      // {
      //   field: 'defaultValue',
      //   title: '默认值',
      //   span: 8,
      //   width: 250,
      //   sortable: false,
      //   filters: false,
      //   tooltip: true,
      //   editRender: {
      //     name: '$input',
      //     defaultValue: '',
      //     props: {
      //       type: 'text',
      //       placeholder: '默认值'
      //     }
      //   }
      // },
      // {
      //   title: '是否可排序',
      //   field: 'sortable',
      //   width: 250,
      //   sortable: false,
      //   filters: false,
      //   align: 'center',
      //   editRender: {
      //     name: '$select',
      //     defaultValue: 1,
      //     options: [
      //       { value: true, label: '是' },
      //       { value: false, label: '否' }
      //     ],
      //     props: {
      //       placeholder: '是否可排序'
      //     }
      //   }
      // },
      // {
      //   title: '是否可筛选',
      //   field: 'filters',
      //   width: 250,
      //   sortable: false,
      //   filters: false,
      //   align: 'center',
      //   editRender: {
      //     name: '$select',
      //     defaultValue: 1,
      //     options: [
      //       { value: true, label: '是' },
      //       { value: false, label: '否' }
      //     ],
      //     props: {
      //       placeholder: '是否可筛选'
      //     }
      //   }
      // },
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
    toolbarConfig: { // table工具栏配置
      moneyConversion: true, // 是否有金额转换
      calculator: false,
      refresh: false,
      slots: {
        tools: 'toolbarTools',
        buttons: 'toolbarSlots'
      }
    },
    queryformItemsConfigCp: [
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
  },
  defaultConf: {
    defaultItemsDatas: [{}],
    tableConfig: {
      globalConfig: {
        // 全局配置
        checkType: 'checkbox', // hasCheckbox
        seq: true, // 序号列
        // hasOptionRow: true // 操作列
        optionSort: true
      },
      renderers: {}
    },
    defaultItemsConfig: [
      {
        title: '要素',
        field: 'title',
        width: 200,
        align: 'center',
        sortable: false,
        filters: false,
        editRender: {
          name: '$vxeSelect',
          options: [
            { value: 'AGENCY', label: '预算单位' },
            { value: 'FUNDTYPE', label: '资金性质' },
            { value: 'MANAGE_MOF_DEP', label: '业务主管处' },
            { value: 'EXP_FUNC', label: '功能科目' },
            { value: 'GOV_BGT_ECO', label: '政府经济科目' },
            { value: 'DEP_BGT_ECO', label: '部门经济科目' },
            { value: 'PAYTYPE', label: '支付方式' },
            { value: 'SETMODE', label: '结算方式' },
            { value: 'aeexpfunc', label: '资金调拨科目' }
          ]
        }
      },
      {
        title: '下拉选择树',
        field: 'select_',
        width: 200,
        align: 'center',
        editRender: {
          name: '$vxeTree',
          props: {
            config: {
              isleaf: true,
              disabled: true,
              placeholder: '请先选择要素',
              treeProps: {
                nodeKey: 'id',
                label: 'label',
                children: 'children'
              },
              axiosConfig: {
                method: 'post',
                url: 'pay-voucher-service/v2/elementtree'
              }
            },
            isServer: true,
            queryparams: {
              elementCode: ''
            }
          }
        }
      },
      {
        title: 'id',
        field: 'select_id',
        width: 200,
        align: 'center',
        sortable: false,
        filters: false,
        editRender: {
          name: '$vxeInput',
          defaultValue: '',
          props: {
            type: 'string',
            disabled: true,
            placeholder: 'id'
          }
        }
      },
      {
        title: 'code',
        field: 'select_code',
        width: 200,
        align: 'center',
        sortable: false,
        filters: false,
        editRender: {
          name: '$vxeInput',
          defaultValue: '',
          props: {
            type: 'string',
            placeholder: 'code'
          }
        }
      },
      {
        title: 'name',
        field: 'select_name',
        width: 260,
        align: 'center',
        sortable: false,
        filters: false,
        editRender: {
          name: '$vxeInput',
          defaultValue: '',
          props: {
            type: 'string',
            placeholder: 'name'
          }
        }
      }
    ],
    toolbarConfig: { // table工具栏配置
      moneyConversion: true, // 是否有金额转换
      calculator: false,
      refresh: false,
      slots: {
        tools: 'toolbarTools',
        buttons: 'toolbarSlots'
      }
    },
    queryformItemsConfigCp: [
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
  },
  // 页签配置
  subTabConf: {
    defaultItemsDatas: [{}],
    tableConfig: {
      globalConfig: {
        // 全局配置
        checkType: 'checkbox', // hasCheckbox
        // seq: true, // 序号列
        // hasOptionRow: true // 操作列
        optionSort: true
      },
      renderers: {}
    },
    buttonsItemsConfig: [
      {
        title: 'type',
        field: 'type',
        width: 150,
        align: 'center',
        sortable: false,
        filters: false,
        editRender: {
          name: '$vxeSelect',
          defaultValue: '',
          options: [
            { value: 'button', label: 'button' },
            { value: 'select', label: 'select' }
          ],
          props: {
            type: 'string'
          }
        }
      },
      {
        title: 'code',
        field: 'code',
        width: 150,
        align: 'center',
        sortable: false,
        filters: false,
        editRender: {
          name: '$vxeInput',
          defaultValue: '',
          props: {
            type: 'string',
            placeholder: 'code'
          }
        }
      },
      {
        title: 'curValue',
        field: 'curValue',
        width: 150,
        align: 'center',
        sortable: false,
        filters: false,
        editRender: {
          name: '$vxeInput',
          defaultValue: '',
          props: {
            type: 'string',
            placeholder: 'curValue'
          }
        }
      },
      {
        title: 'label',
        field: 'label',
        width: 200,
        align: 'center',
        sortable: false,
        filters: false,
        editRender: {
          name: '$vxeInput',
          defaultValue: '',
          props: {
            type: 'string',
            placeholder: 'label'
          }
        }
      },
      {
        title: 'iconName',
        field: 'iconName',
        width: 150,
        align: 'center',
        sortable: false,
        filters: false,
        editRender: {
          name: '$vxeSelect',
          defaultValue: '',
          props: {
            type: 'string'
          },
          options: [
            { value: 'base-zhibaio.png', label: '待办' },
            { value: 'base-yiban.png', label: '已办' },
            { value: 'base-all.png', label: '全部' }
          ]
        }
      },
      {
        title: 'iconNameActive',
        field: 'iconNameActive',
        width: 150,
        align: 'center',
        sortable: false,
        filters: false,
        editRender: {
          name: '$vxeSelect',
          defaultValue: '',
          props: {
            type: 'string'
          },
          options: [
            { value: 'base-zhibaio-active.png', label: '待办' },
            { value: 'base-yiban-active.png', label: '已办' },
            { value: 'base-all-active.png', label: '全部' }
          ]
        }
      },
      {
        title: 'options',
        field: 'options',
        align: 'center',
        sortable: false,
        filters: false,
        editRender: {
          name: '$EditDownTextarea',
          defaultValue: '',
          props: {
            type: 'text'
          }
        }
      }
    ],
    buttonsInfoItemsConfig: [
      {
        title: '父页签',
        field: 'parentCode',
        width: 200,
        align: 'center',
        editRender: {
          name: '$vxeSelect',
          defaultValue: '',
          props: {
            type: 'string'
          },
          options: [
            { value: '1', label: '1' },
            { value: '2', label: '2' },
            { value: '4', label: '4' },
            { value: '5', label: '5' },
            { value: '1,4', label: '1,4' },
            { value: '2,5', label: '2,5' },
            { value: '9', label: '9' },
            { value: '0', label: '0' }
          ]
        }
      },
      {
        title: 'code',
        field: 'code',
        width: 200,
        align: 'center',
        sortable: false,
        filters: false,
        editRender: {
          name: '$vxeInput',
          defaultValue: '',
          props: {
            type: 'string',
            placeholder: 'code'
          }
        }
      },
      {
        title: 'label',
        field: 'label',
        width: 200,
        align: 'center',
        sortable: false,
        filters: false,
        editRender: {
          name: '$vxeInput',
          defaultValue: '',
          props: {
            type: 'string',
            placeholder: 'label'
          }
        }
      },
      {
        title: 'status',
        field: 'status',
        width: 200,
        align: 'center',
        sortable: false,
        filters: false,
        editRender: {
          name: '$vxeInput',
          defaultValue: '',
          props: {
            type: 'string',
            placeholder: 'status'
          }
        }
      },
      // {
      //   title: 'params',
      //   field: 'params',
      //   width: 200,
      //   align: 'center',
      //   sortable: false,
      //   filters: false,
      //   editRender: {
      //     name: '$vxeInput',
      //     defaultValue: '',
      //     disabled: true,
      //     props: {
      //       type: 'string',
      //       placeholder: 'params'
      //     }
      //   }
      // },
      {
        title: 'cptList',
        field: 'cptList',
        width: 200,
        align: 'center',
        sortable: false,
        filters: false,
        editRender: {
          name: '$EditDownTextarea',
          defaultValue: '',
          props: {
            type: 'string'
          }
        }
      }
    ],
    toolbarConfig: { // table工具栏配置
      moneyConversion: true, // 是否有金额转换
      calculator: false,
      refresh: false,
      slots: {
        tools: 'toolbarTools',
        buttons: 'toolbarSlots'
      }
    }
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

export const config = {
  templateConfig: {
    templateType: 'public', // 模版类型，public
    showType: {
      showTapPanel: true, // 展示tapPanel
      showQuery: true, // 查询条件
      showLeftTree: true, // 左侧树
      showTable: true // table，默认true
    },
    toolBarConfig: {},
    queryConfig: {},
    leftTreeConfig: {},
    tableConfig: {
      configType: 'tableConf', // 'tableConf' || 'formConf'
      mof_div_code: '', // 区划
      fiscalyear: '', // 年份
      id: '', // 表id
      menuguid: '', // 菜单id
      configure: { // 配置
        globalConfig: {}, // 全局配置
        itemsConfig: [], // 项配置
        pageConfig: {}, // 分页配置
        editConfig: {}, // 编辑配置
        editRules: {}, // 校验规则
        footerConfig: {}, // 表尾配置
        dataConfig: {
          dataSouceType: 'query'
        }
      }
    }
  }
}
