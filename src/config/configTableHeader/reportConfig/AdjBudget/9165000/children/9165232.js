// 专项转移支付调剂-新增-上表项目信息表单配置
export default {
  '9165232': {
    tableCols: [],
    editTableCols: [],
    formItems: [
      {
        field: 'proCat',
        title: '项目类别',
        span: 8,
        itemRender: {
          name: '$vxeTree',
          props: {
            config: {
              isHump: true,
              disabled: true,
              placeholder: ''
            }
          }
        }
      },
      {
        field: 'proCode',
        title: '项目代码',
        span: 8,
        itemRender: {
          name: '$vxeInput',
          props: {
            disabled: true,
            placeholder: ''
          }
        }
      },
      {
        field: 'speType',
        title: '专项资金目录',
        span: 8,
        itemRender: {
          name: '$vxeTree',
          props: {
            config: {
              disabled: true,
              isHump: true,
              placeholder: ''
            }
          }
        }
      },
      {
        field: 'proName',
        title: '项目名称',
        span: 8,
        itemRender: {
          name: '$vxeInput',
          props: {
            disabled: true,
            placeholder: ''
          }
        }
      },
      {
        field: 'isTrack',
        title: '是否追踪',
        span: 8,
        itemRender: {
          name: '$vxeSelect',
          props: {
            placeholder: '',
            disabled: true
          },
          options: [
            { label: '否', value: '0' },
            { label: '是', value: '1' }
          ]
        }
      },
      {
        field: 'isAlle',
        title: '扶贫标识',
        span: 8,
        itemRender: {
          name: '$vxeTree',
          props: {
            config: {
              disabled: true,
              isHump: true,
              placeholder: ''
            }
          }
        }
      },
      {
        field: 'isScientific',
        title: '科研资金标识',
        span: 8,
        itemRender: {
          name: '$vxeSelect',
          props: {
            placeholder: '',
            disabled: true
          },
          options: [
            { label: '否', value: '0' },
            { label: '是', value: '1' }
          ]
        }
      },
      {
        field: 'f5',
        title: '项目金额(万元)',
        span: 8,
        itemRender: {
          name: '$vxeMoney',
          props: {
            type: 'float',
            min: 0,
            placeholder: '',
            disabled: true
          }
        }
      },
      {
        field: 'unuseBudgetAmt',
        title: '可申请追加预算金额(万元)',
        span: 8,
        itemRender: {
          name: '$vxeMoney',
          props: {
            type: 'float',
            min: 0,
            placeholder: '',
            disabled: true
          }
        }
      },
      {
        field: 'curAddtoamt',
        title: '本次申请追加总额(万元)',
        span: 8,
        itemRender: {
          name: '$vxeMoney',
          props: {
            type: 'float',
            min: 0,
            placeholder: '',
            disabled: true
          }
        }
      }
    ],
    validateRules: {},
    extendAttrs: {},
    formData: {}
  }
}
