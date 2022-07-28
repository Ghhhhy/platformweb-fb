const tableConf = {
  tableInfo: {
    tableColumnsConfig: [
      {
        title: '摘要',
        field: 'title',
        align: 'left',
        filters: [{ data: { vals: [], sVal: '' } }],
        filterRender: { name: 'FilterContent' },
        width: 300,
        tooltip: true,
        editRender: {
          name: '$EditDownTextarea',
          defaultValue: '',
          props: {
            type: 'text',
            placeholder: '请输入摘要'
          }
        }
      },
      {
        title: '金额',
        field: 'money',
        sortable: true,
        width: 200,
        align: 'center',
        combinedType: ['average'],
        editRender: {
          name: '$input',
          defaultValue: 1,
          props: {
            type: 'number',
            placeholder: '请输入金额',
            redonly: true
          }
        }
      },
      {
        title: '预算单位',
        field: 'agency_',
        width: 200,
        editRender: {
          name: '$treeinput',
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
        title: '支出功能分类',
        field: 'exp_func_',
        width: 250,
        align: 'left',
        editRender: {
          name: '$treeinput',
          props: {
            isServer: true,
            elecode: 'EXPFUNC',
            queryparams: {
              eleCode: 'EXPFUNC',
              sxspecroleguid: '3250FC3332E1421DA1B0388AA0D34BDC'
            }
          }
        }
      },
      {
        title: '资金性质',
        field: 'nature',
        width: 250,
        editRender: {
          name: '$select',
          defaultValue: '教育',
          options: [
            { value: '教育', label: '教育' },
            { value: '科研', label: '科研' },
            { value: '军事', label: '军事' }
          ],
          props: {
            placeholder: '请输入资金性质'
          }
        }
      },
      {
        title: '收款机构',
        field: 'payee',
        width: 250,
        editRender: {
          name: '$select',
          defaultValue: '学校',
          options: [
            { value: '学校', label: '学校' },
            { value: '航天研究所', label: '航天研究所' },
            { value: '军事研究所', label: '军事研究所' },
            { value: '卫星研究所', label: '卫星研究所' }
          ],
          props: {
            placeholder: '请输入收款机构'
          }
        }
      }
    ],
    toolbarConfig: {
      moneyConversion: false,
      search: false, // 是否有search
      buttons: [
        {
          code: 'toolbar-insert',
          name: '新增',
          callback: (obj, context, e) => {
            context.$parent.$parent.$parent.AddData(obj, context, e)
          }
        },
        {
          code: 'toolbar-saveData',
          name: '保存',
          callback: (obj, context, e) => {
            context.$parent.$parent.$parent.saveData(obj, context, e)
          }
        }
      ]
    },
    tableData: [
      {
        title: '科研预算',
        money: 5000000000,
        agency_: '',
        exp_func_: '',
        nature: '科研',
        payee: '卫星研究所'
      },
      {
        title: '新建学校',
        money: 200000000,
        agency_: '',
        exp_func_: '',
        nature: '教育',
        payee: '学校'
      }
    ]
  },
  addmodeTop: {
    tableColumnsConfig: [
      {
        title: '摘要',
        field: 'title',
        align: 'center',
        width: 150,
        tooltip: true,
        sortable: false,
        filters: false,
        editRender: {
          name: '$EditDownTextarea',
          defaultValue: '',
          props: {
            type: 'text',
            placeholder: '请输入摘要'
          }
        }
      },
      {
        title: '金额',
        field: 'money',
        width: 100,
        align: 'center',
        combinedType: ['average'],
        sortable: false,
        filters: false,
        editRender: {
          name: '$input',
          defaultValue: 1,
          props: {
            type: 'number',
            placeholder: '请输入金额',
            redonly: true
          }
        }
      },
      {
        title: '预算单位',
        field: 'agency_',
        width: 250,
        sortable: false,
        filters: false,
        editRender: {
          name: '$treeinput',
          props: {
            isServer: true,
            elecode: 'AGENCY',
            queryparams: {
              eleCode: 'AGENCY',
              sxspecroleguid: '3250FC3332E1421DA1B0388AA0D34BDC'
            }
          }
        }
      },
      {
        title: '支出功能分类',
        field: 'exp_func_',
        width: 248,
        align: 'left',
        sortable: false,
        filters: false,
        editRender: {
          name: '$treeinput',
          props: {
            isServer: true,
            elecode: 'EXPFUNC',
            queryparams: {
              eleCode: 'EXPFUNC',
              sxspecroleguid: '3250FC3332E1421DA1B0388AA0D34BDC'
            }
          }
        }
      },
      {
        title: '资金性质',
        field: 'nature',
        width: 120,
        sortable: false,
        filters: false,
        editRender: {
          name: '$select',
          defaultValue: '教育',
          options: [
            { value: '教育', label: '教育' },
            { value: '科研', label: '科研' },
            { value: '军事', label: '军事' }
          ],
          props: {
            placeholder: '请输入资金性质'
          }
        }
      },
      {
        title: '收款机构',
        field: 'payee',
        width: 150,
        sortable: false,
        filters: false,
        editRender: {
          name: '$select',
          defaultValue: '学校',
          options: [
            { value: '学校', label: '学校' },
            { value: '航天研究所', label: '航天研究所' },
            { value: '军事研究所', label: '军事研究所' },
            { value: '卫星研究所', label: '卫星研究所' }
          ],
          props: {
            placeholder: '请输入收款机构'
          }
        }
      },
      {
        title: '操作',
        field: 'optionRow',
        type: 'optionRow',
        editable: false,
        width: 150,
        align: 'center',
        fixed: 'right',
        sortable: false,
        className: 'table-row-option',
        cellRender: {
          type: 'cellRender',
          name: 'AccountOperateBtnsOne'
        }
      }
    ],
    editRules: {
      title: [
        {
          required: true,
          message: '请填写资金摘要',
          trigger: 'change'
        }],
      money: [
        {
          required: true,
          message: '请输入金额',
          type: 'number',
          min: 0,
          max: 9999999999999999,
          trigger: 'change'
        }],
      agency_: [
        {
          required: true,
          message: '请选择预算单位',
          trigger: 'change'
        }],
      exp_func_: [
        {
          required: true,
          message: '请选择支出功能分类',
          trigger: 'change'
        }],
      nature: [
        {
          required: true,
          message: '请选择资金性质',
          trigger: 'change'
        }],
      payee: [
        {
          required: true,
          message: '请选择收款机构',
          trigger: 'change'
        }]
    },
    tableData: [
      {
        title: '',
        money: '',
        agency_: '',
        exp_func_: '',
        nature: '',
        payee: ''
      }
    ],
    tableConfig: {
      globalConfig: {
        // 全局配置
        checkType: false, // hasCheckbox
        seq: false, // 序号列
        hasOptionRow: false, // 禁止掉默认操作列
        optionSort: false
      },
      renderers: {
        AccountOperateBtnsOne: { // 自定义render函数名，因为全局要唯一性，建议起名时  模块名+OperateBtns 比如：AccountOperateBtns
          renderDefault(h, cellRender, params, context) {
            let self = context.$grid.$parent
            let { row, column } = params
            return [
              <a class="optionRow-delete fn-inline" onClick={() => self.onOptionRowClick({ row, column, optionType: 'formAdd', $this: self })}>添加</a>
            ]
          }
        }
      },
      methods: {
        onOptionRowClick({ row, optionType, $this }) {
          let self = $this.$parent.$parent
          switch (optionType) {
            case 'formAdd':
              self.addRow(row)
              break
            default:
          }
        }
      }
    }
  },
  addmodeBottom: {
    tableColumnsConfig: [
      {
        title: '摘要',
        field: 'title',
        align: 'center',
        width: 150,
        tooltip: true,
        sortable: false,
        filters: false,
        editRender: {
          name: '$EditDownTextarea',
          defaultValue: '',
          props: {
            type: 'text',
            placeholder: '请输入摘要'
          }
        }
      },
      {
        title: '金额',
        field: 'money',
        width: 100,
        align: 'center',
        combinedType: ['average'],
        sortable: false,
        filters: false,
        editRender: {
          name: '$input',
          defaultValue: 1,
          props: {
            type: 'number',
            placeholder: '请输入金额',
            redonly: true
          }
        }
      },
      {
        title: '预算单位',
        field: 'agency_',
        width: 250,
        sortable: false,
        filters: false,
        editRender: {
          name: '$treeinput',
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
        title: '支出功能分类',
        field: 'exp_func_',
        width: 150,
        align: 'left',
        sortable: false,
        filters: false,
        editRender: {
          name: '$treeinput',
          props: {
            isServer: true,
            elecode: 'EXPFUNC',
            queryparams: {
              eleCode: 'EXPFUNC',
              sxspecroleguid: '3250FC3332E1421DA1B0388AA0D34BDC'
            }
          }
        }
      },
      {
        title: '资金性质',
        field: 'nature',
        width: 148,
        sortable: false,
        filters: false,
        editRender: {
          name: '$select',
          defaultValue: '教育',
          options: [
            { value: '教育', label: '教育' },
            { value: '科研', label: '科研' },
            { value: '军事', label: '军事' }
          ],
          props: {
            placeholder: '请输入资金性质'
          }
        }
      },
      {
        title: '收款机构',
        field: 'payee',
        width: 160,
        sortable: false,
        filters: false,
        editRender: {
          name: '$select',
          defaultValue: '学校',
          options: [
            { value: '学校', label: '学校' },
            { value: '航天研究所', label: '航天研究所' },
            { value: '军事研究所', label: '军事研究所' },
            { value: '卫星研究所', label: '卫星研究所' }
          ],
          props: {
            placeholder: '请输入收款机构'
          }
        }
      },
      {
        title: '操作',
        field: 'optionRow',
        type: 'optionRow',
        editable: false,
        width: 150,
        align: 'center',
        fixed: 'right',
        sortable: false,
        className: 'table-row-option',
        cellRender: {
          type: 'cellRender',
          name: 'AccountOperateBtnsTwo'
        }
      }
    ],
    tableData: [

    ],
    tableConfig: {
      globalConfig: {
        // 全局配置
        checkType: false, // hasCheckbox
        seq: true, // 序号列
        hasOptionRow: false, // 禁止掉默认操作列
        optionSort: false
      },
      renderers: {
        AccountOperateBtnsTwo: {
          renderDefault(h, cellRender, params, context) {
            let self = context.$grid.$parent
            let { row, column } = params
            return [
              <a class="optionRow-delete fn-inline" onClick={() => self.onOptionRowClick({ row, column, optionType: 'delete', $this: self })}>删除</a>,
              <a class="optionRow-detail fn-inline" onClick={() => self.onOptionRowClick({ row, column, optionType: 'detail', $this: self })}>详情</a>
            ]
          }
        }
      },
      methods: {
        onOptionRowClick({ row, optionType, $this }) {
          let self = $this.$parent.$parent
          switch (optionType) {
            case 'delete':
              self.deleteRow()
              break
            case 'detail':
              self.showDetail()
              break
            default:
          }
        }
      }
    }
  }
}

export default function (tableType, configType) {
  if (tableType && configType) {
    return tableConf[tableType][configType]
  } else if (tableType) {
    return tableConf[tableType]
  } else {
    return null
  }
}
