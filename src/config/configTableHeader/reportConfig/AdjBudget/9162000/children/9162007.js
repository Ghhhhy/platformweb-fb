// entryFormItemsConfig
export default {
  '9162007': {
    tableCols: [],
    editTableCols: [],
    formItems: [
      {
        title: '项目代码',
        field: 'proCode',
        align: 'left',
        itemRender: {
          name: '$vxeInput',
          props: {
            disabled: true
          }
        }
      },
      {
        title: '项目名称',
        field: 'proName',
        align: 'left',
        itemRender: {
          name: '$vxeInput',
          props: {
            disabled: true
          }
        }
      },
      {
        title: '项目类别',
        field: 'proCat',
        align: 'left',
        itemRender: {
          name: '$vxeTree',
          props: {
            disabled: true,
            config: {
              isHump: true,
              disabled: true
            }
          }

        }
      },
      {
        title: '项目金额',
        field: 'f5',
        align: 'right',
        itemRender: {
          name: '$vxeMoney',
          props: {
            placeholder: '请输入金额',
            disabled: true
          }
        }
      },
      {
        title: '可申请预算金额',
        field: 'unuseBudgetAmt',
        fieldType: 'money',
        align: 'right',
        itemRender: {
          name: '$vxeMoney',
          props: {
            placeholder: '请输入金额',
            disabled: true
          }
        }
      },
      {
        title: '本次申请金额',
        field: 'curAddtoamt',
        fieldType: 'money',
        align: 'right',
        itemRender: {
          name: '$vxeMoney',
          props: {
            placeholder: '请输入金额',
            disabled: true
          }
        }
      },
      {
        title: '是否包含政府采购',
        field: 'isGov',
        align: 'left',
        itemRender: {
          name: '$vxeSelect',
          defaultValue: '0',
          props: {
            disabled: false
          },
          options: [
            { value: '1', label: '是' },
            { value: '0', label: '否' }
          ]
        }
      },
      {
        title: '是否政府购买服务',
        field: 'isGovbuy',
        align: 'left',
        minWidth: 180,
        itemRender: {
          name: '$vxeSelect',
          props: {
            disabled: true
          },
          options: [
            { value: '1', label: '是' },
            { value: '0', label: '否' }
          ]
        }
      },
      {
        title: '是否新增资产配置',
        field: 'isAsset',
        align: 'left',
        minWidth: 180,
        itemRender: {
          name: '$vxeSelect',
          props: {
            disabled: true
          },
          options: [
            { value: '1', label: '是' },
            { value: '0', label: '否' }
          ]
        }
      },
      {
        field: 'remark',
        title: '备注',
        span: 24,
        itemRender: {
          name: '$vxeEditDownTextarea',
          props: {
            type: 'text',
            maxlength: 50,
            disabled: false,
            placeholder: '请输入申请理由，最多输入50个字符'
          }
        }
      }
    ],
    validateRules: { remark: [{ required: false, max: 100, type: 'textarea', trigger: 'change', message: '最多输入100个字符' }] },
    extendAttrs: {},
    formData: {
      proCode: '',
      proName: '',
      proCat: '',
      proCatId: '',
      proCatCode: '',
      proCatName: '',
      f5: null,
      unuseBudgetAmt: null,
      curAddtoamt: null,
      isGov: null,
      isGovbuy: null,
      isAsset: null,
      remark: ''
    }
  }
}
