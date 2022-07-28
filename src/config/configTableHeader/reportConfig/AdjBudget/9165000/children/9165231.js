// 专项转移支付调剂-挑选项目的条件查询表单配置
export default {
  '9165231': {
    tableCols: [],
    editTableCols: [],
    formItems: [
      {
        title: '状态',
        field: 'status',
        span: 4,
        itemRender: {
          name: '$vxeSelect',
          props: {
            clearable: true,
            placeholder: '状态'
          },
          options: [{
            value: '1',
            label: '已储备未安排预算'
          }, {
            value: '2',
            label: '已安排预算'
          }]
        }
      },
      {
        field: 'proCat',
        title: '项目类别',
        span: 4,
        itemRender: {
          name: '$vxeTree',
          props: {
            queryparams: {
              eleCode: 'procat',
              queryConditions: 'and code like \'3%\' and code not in (\'311\',\'321\',\'33\',\'34\',\'35\',\'36\',\'39\')'
            },
            format: '{code}-{name}',
            config: {
              placeholder: '项目类别',
              isHump: true,
              multiple: false,
              readonly: false,
              isleaf: true,
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
              }
            }
          }
        }
      },
      {
        field: 'speType',
        title: '专项资金目录',
        span: 4,
        itemRender: {
          name: '$vxeTree',
          props: {
            queryparams: {
              usertype: '1',
              roleguid: '',
              proCatCode: '',
              procatmul: '1'
            },
            format: '{code}-{name}',
            config: {
              placeholder: '专项资金目录',
              isHump: true,
              multiple: false,
              readonly: false,
              isleaf: true,
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
                method: 'get', // 请求方式
                url: 'bisProject/project/speFund/resource/content/agency' // 是否调用接口直接获取数据，当此项有值时将会自动家数据
              }
            }
          }
        }
      },
      {
        title: '项目名称',
        field: 'proName',
        span: 4,
        itemRender: {
          name: '$vxeInput',
          props: {
            placeholder: '项目名称',
            clearable: true
          }
        }
      }
    ],
    validateRules: {},
    extendAttrs: {},
    formData: {}
  }
}
