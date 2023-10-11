export const getSchemas = () => {
  return [
    // {
    //   field: 'reportDetailType',
    //   title: '报表类型',
    //   titleWidth: 80,
    //   span: 5,
    //   required: true,
    //   itemRender: {
    //     name: '$select',
    //     props: {
    //       placeholder: '请选择',
    //       clearable: true
    //     },
    //     options: store.state.reportTypeList
    //   }
    // },
    {
      field: 'regionId',
      title: '期间',
      titleWidth: 80,
      span: 12,
      width: '8',
      required: true,
      itemRender: {
        name: '$vxeSelect',
        required: true,
        props: {
          required: true,
          placeholder: '请选择',
          clearable: true
        },
        options: []
      }
    },
    {
      field: 'reportList',
      title: '分析报表',
      titleWidth: 80,
      span: 12,
      width: '8',
      align: 'left',
      name: '$vxeTree',
      required: true,
      itemRender: {
        name: '$vxeTree',
        placeholder: '请选择分析报表',
        props: {
          clearable: true,
          config: {
            isPramas: false,
            placeholder: '请选择分析报表',
            multiple: true,
            isHump: true,
            treeProps: {
              labelFormat: '{name}',
              nodeKey: 'value',
              label: 'name',
              children: 'children'
            },
            isleaf: true,
            isStricty: false,
            valueKeys: ['value', 'name', 'value']
          }
        }
      }
    }
  ]
}
