// 800023_reduce 资产配置预算表
export default {
  '9162012': {
    tableCols: [
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
        cellRender: {
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
            }
          }
        }
      },
      {
        title: '资产名称',
        field: 'assetName',
        width: 180,
        align: 'left',
        cellRender: {
          name: '$vxeInput',
          props: {
            disabled: false
          }
        }
      },
      {
        title: '资产申请数量',
        field: 'zcsqsl',
        children: [
          {
            title: '原数量',
            field: 'oldAssetQua',
            minWidth: '140',
            align: 'right',
            combinedType: ['average', 'total']
          },
          {
            title: '调减数量',
            field: 'assetQua',
            minWidth: '140',
            cellRender: { name: '$vxeInput', props: { type: 'number' } },
            align: 'right',
            combinedType: ['average', 'total']
          }
        ]
      },
      {
        title: '单价',
        field: 'dj',
        children: [
          {
            title: '原金额',
            field: 'oldPrice',
            minWidth: '140',
            align: 'right',
            cellRender: { name: '$vxeMoney' },
            combinedType: ['average', 'total']
          },
          {
            title: '调减金额',
            field: 'price',
            minWidth: '140',
            cellRender: { name: '$vxeMoney' },
            align: 'right',
            combinedType: ['average', 'total']
          }
        ]
      },
      {
        title: '总金额',
        field: 'zje',
        children: [
          {
            title: '原金额',
            field: 'oldSumAmt',
            minWidth: '140',
            align: 'right',
            cellRender: { name: '$vxeMoney' },
            combinedType: ['average', 'total']
          },
          {
            title: '调减金额',
            field: 'sumAmt',
            minWidth: '140',
            formula: '{price}*{assetQua}',
            cellRender: { name: '$vxeCalculate' },
            align: 'right',
            combinedType: ['average', 'total']
          }
        ]
      },
      {
        title: '公共预算拨款',
        field: 'ggysbk',
        children: [
          {
            title: '原金额',
            field: 'oldCc36',
            minWidth: '140',
            align: 'right',
            cellRender: { name: '$vxeMoney' },
            combinedType: ['average', 'total']
          },
          {
            title: '调减金额',
            field: 'cc36',
            minWidth: '140',
            cellRender: { name: '$vxeMoney' },
            align: 'right',
            combinedType: ['average', 'total']
          }
        ]
      },
      {
        title: '政府性基金拨款',
        field: 'zfxjjbk',
        children: [
          {
            title: '原金额',
            field: 'oldCc19',
            minWidth: 140,
            align: 'right',
            cellRender: { name: '$vxeMoney' },
            combinedType: ['average', 'total']
          },
          {
            title: '调减金额',
            field: 'cc19',
            minWidth: 140,
            cellRender: { name: '$vxeMoney' },
            align: 'right',
            combinedType: ['average', 'total']
          }
        ]
      },
      {
        title: '自有资金',
        field: 'zfxjjbk',
        children: [
          {
            title: '原金额',
            field: 'oldCc37',
            minWidth: 140,
            align: 'right',
            cellRender: { name: '$vxeMoney' },
            combinedType: ['average', 'total']
          },
          {
            title: '调减金额',
            field: 'cc37',
            minWidth: 140,
            cellRender: { name: '$vxeMoney' },
            align: 'right',
            combinedType: ['average', 'total']
          }
        ]
      },
      {
        title: '其他',
        field: 'qt',
        children: [
          {
            title: '原金额',
            field: 'oldCc38',
            minWidth: 140,
            align: 'right',
            cellRender: { name: '$vxeMoney' },
            combinedType: ['average', 'total']
          },
          {
            title: '调减金额',
            field: 'cc38',
            minWidth: 140,
            cellRender: { name: '$vxeMoney' },
            align: 'right',
            combinedType: ['average', 'total']
          }
        ]
      },
      {
        title: '备注',
        field: 'remark',
        width: 180,
        align: 'left',
        cellRender: { name: '$vxeInput', props: { type: 'text' } }
      }
    ],
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
              eleCode: 'ASSETTYPE'
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
        field: 'zcsqsl',
        children: [
          {
            title: '原数量',
            field: 'oldAssetQua',
            minWidth: '140',
            align: 'right',
            combinedType: ['average', 'total']
          },
          {
            title: '调减数量',
            field: 'assetQua',
            minWidth: '140',
            editRender: { name: '$vxeInput', props: { type: 'number' } },
            align: 'right',
            combinedType: ['average', 'total']
          }
        ]
      },
      {
        title: '单价',
        field: 'dj',
        children: [
          {
            title: '原金额',
            field: 'oldPrice',
            minWidth: '140',
            align: 'right',
            cellRender: { name: '$vxeMoney' },
            combinedType: ['average', 'total']
          },
          {
            title: '调减金额',
            field: 'price',
            minWidth: '140',
            editRender: { name: '$vxeMoney', props: { } },
            align: 'right',
            combinedType: ['average', 'total']
          }
        ]
      },
      {
        title: '总金额',
        field: 'zje',
        children: [
          {
            title: '原金额',
            field: 'oldSumAmt',
            minWidth: '140',
            align: 'right',
            cellRender: { name: '$vxeMoney' },
            combinedType: ['average', 'total']
          },
          {
            title: '调减金额',
            field: 'sumAmt',
            minWidth: '140',
            formula: '{price}*{assetQua}',
            editRender: { name: '$vxeCalculate' },
            align: 'right',
            combinedType: ['average', 'total']
          }
        ]
      },
      {
        title: '公共预算拨款',
        field: 'ggysbk',
        children: [
          {
            title: '原金额',
            field: 'oldCc36',
            minWidth: '140',
            align: 'right',
            cellRender: { name: '$vxeMoney' },
            combinedType: ['average', 'total']
          },
          {
            title: '调减金额',
            field: 'cc36',
            minWidth: '140',
            editRender: { name: '$vxeMoney', props: { } },
            align: 'right',
            combinedType: ['average', 'total']
          }
        ]
      },
      {
        title: '政府性基金拨款',
        field: 'zfxjjbk',
        children: [
          {
            title: '原金额',
            field: 'oldCc19',
            minWidth: 140,
            align: 'right',
            cellRender: { name: '$vxeMoney' },
            combinedType: ['average', 'total']
          },
          {
            title: '调减金额',
            field: 'cc19',
            minWidth: 140,
            editRender: { name: '$vxeMoney', props: { } },
            align: 'right',
            combinedType: ['average', 'total']
          }
        ]
      },
      {
        title: '自有资金',
        field: 'zfxjjbk',
        children: [
          {
            title: '原金额',
            field: 'oldCc37',
            minWidth: 140,
            align: 'right',
            cellRender: { name: '$vxeMoney' },
            combinedType: ['average', 'total']
          },
          {
            title: '调减金额',
            field: 'cc37',
            minWidth: 140,
            editRender: { name: '$vxeMoney', props: { } },
            align: 'right',
            combinedType: ['average', 'total']
          }
        ]
      },
      {
        title: '其他',
        field: 'qt',
        children: [
          {
            title: '原金额',
            field: 'oldCc38',
            minWidth: 140,
            align: 'right',
            cellRender: { name: '$vxeMoney' },
            combinedType: ['average', 'total']
          },
          {
            title: '调减金额',
            field: 'cc38',
            minWidth: 140,
            editRender: { name: '$vxeMoney', props: { } },
            align: 'right',
            combinedType: ['average', 'total']
          }
        ]
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
    validateRules: {},
    extendAttrs: {},
    formData: {}
  }
}
