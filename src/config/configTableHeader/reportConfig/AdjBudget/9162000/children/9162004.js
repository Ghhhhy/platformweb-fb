export default {
  '9162004': {
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
      }
      // {
      //   field: 'agency_',
      //   title: '预算单位',
      //   span: 4,
      //   type: 'treeinput-multiple',
      //   itemRender: {
      //     name: '$vxeTree',
      //     props: {
      //       queryparams: {
      //         eleCode: 'vw_agency_info_gd'
      //       },
      //       config: {
      //         placeholder: '预算单位',
      //         multiple: true,
      //         treeProps: {
      //           // 树配置选项
      //           labelFormat: '{code}-{name}', // {code}-{name}
      //           nodeKey: 'id', // 树的主键
      //           label: 'label', // 树的显示lalel字段
      //           children: 'children' // 树的嵌套字段
      //         },
      //         axiosConfig: {
      //           successCode: '100000', // 成功code
      //           statusField: 'rscode',
      //           method: 'post', // 请求方式
      //           url: 'fb-budget-service/basicinfo/getAgencyTreeByStatus' // 'queryTreeAssistData', // 是否调用接口直接获取数据，当此项有值时将会自动家数据
      //         }
      //       }
      //     }
      //   }
      // }
    ],
    validateRules: {},
    extendAttrs: {},
    formData: {
      proName: '',
      agency: '',
      agencyId: '',
      agencyCode: '',
      agencyName: '',
      speSql: ''
    }
  }
}
