export default {
  '9163005': {
    tableCols: [],
    editTableCols: [],
    formItems: [
      {
        title: '项目名称',
        field: 'proName',
        span: 4,
        type: 'text',
        itemRender: {
          name: '$vxeInput',
          defaultValue: '',
          props: {
            placeholder: '项目名称'
          }
        }
      },
      {
        title: '指标文号',
        field: 'corBgtDocNoName',
        span: 4,
        type: 'text',
        itemRender: {
          name: '$vxeInput',
          defaultValue: '',
          props: {
            placeholder: '指标文号'
          }
        }
      },
      {
        field: 'agency',
        title: '预算单位',
        span: 4,
        type: 'treeinput-multiple',
        itemRender: {
          name: '$vxeTree',
          props: {
            queryparams: {
              eleCode: 'vw_bas_agency_pr_tree'
            },
            config: {
              multiple: true,
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
        field: 'bgtMofDep',
        title: '资金主管处室',
        span: 4,
        type: 'treeinput-multiple',
        itemRender: {
          name: '$vxeTree',
          props: {
            queryparams: {
              eleCode: 'hold6'
            },
            config: {
              placeholder: '资金主管处室',
              multiple: true,
              treeProps: {
                // 树配置选项
                labelFormat: '{code}-{name}', // {code}-{name}
                nodeKey: 'id', // 树的主键
                label: 'label', // 树的显示lalel字段
                children: 'children' // 树的嵌套字段
              },
              axiosConfig: {
                successCode: '100000', // 成功code
                statusField: 'code',
                method: 'post', // 请求方式
                url: 'bisConfig/config/common/queryTreeAssistData' // 'queryTreeAssistData', // 是否调用接口直接获取数据，当此项有值时将会自动家数据数据
              }
            }
          }
        }
      }
    ],
    validateRules: {},
    extendAttrs: {},
    formData: {
      proName: '',
      corBgtDocNoName: '',
      agency: '',
      agencyId: '',
      agencyCode: '',
      agencyName: '',
      bgtMofDepId: '',
      bgtMofDepCode: '',
      bgtMofDepName: ''
    }
  }
}
