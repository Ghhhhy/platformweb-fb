import { extend } from '@/utils'
const CONFIG = {
  tableConf: {
    defaultConfig: {
      tableCols: [
        {
          title: '属性KEY',
          field: 'attrKey',
          align: 'left',
          minWidth: '180',
          editRender: {
            name: '$vxeInput',
            props: {
              maxlength: 200
            }
          }
        },
        {
          title: '属性值',
          field: 'attrValue',
          align: 'left',
          minWidth: '300',
          editRender: {
            name: '$vxeEditDownTextarea',
            props: {
              maxlength: 200
            }
          }
        },
        {
          title: '类型',
          field: 'attrType',
          align: 'left',
          minWidth: '180',
          editRender: {
            name: '$vxeSelect',
            options: [
              {
                value: '0',
                label: '字符'
              },
              {
                value: '1',
                label: '布尔值'
              },
              {
                value: '2',
                label: '数字'
              }
            ],
            props: { placeholder: '请选择类型' }
          }
        },
        {
          title: '备注',
          field: 'remark',
          align: 'left',
          minWidth: '400',
          editRender: {
            name: '$vxeEditDownTextarea',
            props: {
              maxlength: 280
            }
          }
        }
      ],
      tableValidateConfig: {
        attrKey: [
          { required: true, message: '请输入属性Key', trigger: 'change' }
        ],
        attrValue: [
          { required: true, message: '请输入属性值', trigger: 'change' }
        ]
      }
    }
  },
  formConf: {
    defaultConfig: {}
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
    let result = extend(true, CONFIG[configType]['defaultConfig'])
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
