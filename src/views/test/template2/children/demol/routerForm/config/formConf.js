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
          name: '新增ByRouter',
          callback: (obj, context, e) => {
            context.$parent.AddData(obj, context, e)
          }
        },
        {
          code: 'toolbar-insert-from',
          name: '新增ByForm',
          callback: (obj, context, e) => {
            context.$parent.AddDataFrom(obj, context, e)
          }
        },
        {
          code: 'toolbar-saveData',
          name: '保存',
          callback: (obj, context, e) => {
            context.$parent.saveData(obj, context, e)
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
