// xxx101表的列配置定义
export default {
  '9131001': {
    tableCols: [], // 只读表格列
    editTableCols: [{
      title: '财政区划',
      field: 'subMofDiv',
      sortable: true,
      filters: true,
      align: 'center',
      minWidth: 180,
      cellRender: {
        name: '$vxeTree',
        props: {
          clearable: false,
          config: {
            axiosConfig: {
              method: 'post',
              statusField: 'code',
              successCode: '100000',
              url: 'bisConfig/config/common/queryTreeAssistData'
            },
            disabled: true,
            format: '{code}-{name}',
            isHump: true,
            isLazeLoad: false,
            isleaf: 1,
            levelno: -1,
            multiple: false,
            treeProps: {
              children: 'children',
              label: 'name',
              labelFormat: '{code}-{name}',
              nodeKey: 'id'
            },
            valueKeys: [
              'code',
              'name',
              'id'
            ]
          },
          queryparams: {
            queryConditions: '',
            eleCode: 'MOF_DIV'
          }
        }
      }
    },
    {
      title: '分配金额',
      field: 'disAmount',
      sortable: true,
      align: 'left',
      width: '200px',
      combinedType: ['subTotal', 'total', 'totalAll'],
      editRender: {
        name: '$vxeMoney',
        defaultValue: '',
        props: {
          type: 'text'
        }
      }
    }], // 可编辑表格列
    formItems: [], // 表单列
    validateRules: {}, // 校验规则
    extendAttrs: {}, // 高级属性
    formData: {} // 默认值
  }
}
