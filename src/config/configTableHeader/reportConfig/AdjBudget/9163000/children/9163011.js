export default {
  '9163011': {
    tableCols: [],
    editTableCols: [
      {
        title: '项目代码',
        field: 'proCode',
        width: 180,
        align: 'left'

      },
      {
        title: '项目名称',
        field: 'proName',
        width: 180,
        align: 'left'
      },
      {
        title: '资产分类',
        field: 'assetClass',
        width: 180,
        align: 'left',
        editRender: {
          name: '$vxeTree',
          props: {
            config: {
              multiple: false,
              isHump: true,
              treeProps: {
                // 树配置选项
                labelFormat: '{code}-{name}', // {code}-{name}
                nodeKey: 'id', // 树的主键
                label: 'name', // 树的显示lalel字段
                children: 'children' // 树的嵌套字段
              },
              axiosConfig: {
                successCode: '100000', // 成功code
                statusField: 'code',
                method: 'post', // 请求方式
                url: 'bisConfig/config/common/queryTreeAssistData' // 'queryTreeAssistData', // 是否调用接口直接获取数据，当此项有值时将会自动家数据
              },
              isleaf: true
            },
            queryparams: {
              eleCode: 'ASSETTYPE',
              sxspecroleguid: '3250FC3332E1421DA1B0388AA0D34BDC'
            }
          }
        }
      },
      {
        title: '资产名称',
        field: 'assetName',
        width: 180,
        align: 'left',
        editRender: {
          name: '$vxeInput',
          props: {
            disabled: false
          }
        }
      },
      {
        title: '资产申请数量',
        field: 'assetQua',
        width: 180,
        editRender: {
          name: '$vxeInput', props: { type: 'number' }
        }
      },
      {
        title: '单价',
        field: 'price',
        width: 180,
        editRender: {
          name: '$vxeMoney', props: { type: 'float' }
        },
        align: 'right'
      },
      {
        title: '总金额',
        field: 'sumAmt',
        width: 180,
        formula: '{price}*{assetQua}',
        editRender: { name: '$vxeCalculate' },
        align: 'right'
      },
      {
        title: '公共预算拨款',
        field: 'cc36',
        width: 180,
        editRender: {
          name: '$vxeMoney', props: { type: 'float' }
        },
        align: 'right'
      },
      {
        title: '政府性基金拨款',
        field: 'cc19',
        width: 180,
        editRender: {
          name: '$vxeMoney', props: { type: 'float' }
        },
        align: 'right'
      },
      {
        title: '自有资金',
        field: 'cc37',
        width: 180,
        editRender: {
          name: '$vxeMoney', props: { type: 'float', disabled: true }
        },
        align: 'right'
      },
      {
        title: '其他',
        field: 'cc38',
        width: 180,
        editRender: {
          name: '$vxeMoney', props: { type: 'float', disabled: true }
        },
        align: 'right'
      },
      {
        title: '备注',
        field: 'remark',
        width: 180,
        align: 'left',
        editRender: { name: '$vxeInput', props: { type: 'text' } }
      }
    ],
    formItems: [],
    validateRules: {
      assetClass: [{ required: true, type: 'string', trigger: 'change', message: '请输入资产分类' }], // 资产分类
      assetName: [{ required: true, type: 'string', max: 60, min: 1, trigger: 'change', message: '资产名称长度需在1-60之间' }], // 资产名称
      num: [{ required: true, type: 'number', trigger: 'change', message: '请输入资产数量' }], // 资产数量
      assetNo: [{ required: true, type: 'number', trigger: 'change', message: '请输入资产编制数' }], // 资产编制数
      assetQua: [{ required: true, type: 'number', trigger: 'change', message: '请输入资产申请数量' }], // 资产申请数量
      remark: [{ type: 'string', max: 200, min: 0, trigger: 'change', message: '备注长度需在0-200之间' }]
    },
    extendAttrs: {},
    formData: {}
  }
}
