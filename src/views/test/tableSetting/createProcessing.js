export const proconf = {

  // 生成时部分字段可编辑
  createConfig: [
    {
      field: 'fiRuleName',
      title: '监控规则',
      titleWidth: '180',
      span: 8,
      itemRender: {
        name: '$vxeInput',
        props: { placeholder: '监控规则', disabled: true }
      }
    },
    {
      title: '区划',
      field: 'mofDivCode',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '区划' } }
    },
    {
      title: '下发日期',
      field: 'issueTime',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '生成日期' }
      }
    },
    {
      title: '核实机构',
      field: 'HSJG',
      align: 'center',
      titleWidth: '180',
      span: 8,
      itemRender: {
        name: '$vxeSelect',
        options: [
          {
            value: 1,
            label: '预警，无需上传附件'
          },
          {
            value: 2,
            label: '预警，需上传附件'
          }
        ],
        props: { disabled: true, placeholder: '处理方式' }
      },
      name: '$vxeSelect'
    },
    {
      title: '疑点情况描述',
      field: 'mofDivCode',
      span: 24,
      titleWidth: '180',
      itemRender: {
        name: '$textarea',
        props: { disabled: true, class: 'test', placeholder: '请输入疑点情况描述' } }
    },
    {
      title: '核实建议描述',
      field: 'issueTime',
      span: 24,
      titleWidth: '180',
      itemRender: {
        name: '$textarea',
        props: { disabled: true, class: 'test2', placeholder: '请输入核实建议描述' }
      }
    }
  ],
  createConfig2: [
    {
      field: 'fiRuleName',
      title: '核实人员',
      titleWidth: '180',
      span: 8,
      itemRender: {
        name: '$vxeInput',
        props: { placeholder: '监控规则', disabled: false }
      }
    },
    {
      field: 'fiRuleName',
      title: '联系电话',
      titleWidth: '180',
      span: 8,
      itemRender: {
        name: '$vxeInput',
        props: { placeholder: '监控规则', disabled: false }
      }
    },
    {
      field: 'fiRuleName',
      title: '核实人员',
      titleWidth: '180',
      span: 8,
      itemRender: {
        name: '$vxeInput',
        props: { placeholder: '监控规则', disabled: false }
      }
    },
    {
      title: '反馈日期',
      field: 'issueTime',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: false, placeholder: '生成日期' }
      }
    },
    {
      title: '核实情况描述',
      field: 'issueTime',
      span: 24,
      titleWidth: '180',
      itemRender: {
        name: '$textarea',
        props: { disabled: false, class: 'test2', placeholder: '请输入核实情况描述' }
      }
    }
  ],
  createDataList: {
    issueTime: '',
    mofDivCode: '',
    handleType: '',
    handleResult: '',
    warnLevel: '',
    violateType: '',
    fiRuleName: '',
    HSJG: 1
  },
  createTableColumns: [ // 归档查询
    {
      title: '年度',
      width: 180,
      field: 'fiscalYear',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '区划',
      width: 180,
      field: 'mofDivName',
      sortable: false,
      filters: false,
      align: 'center',
      cellRender: {
        name: '$vxeInput',
        options: [],
        defaultValue: '',
        props: {
          format: '{mofDivCode}-{mofDivName}'
        }
      },
      props: {
        format: '{mofDivCode}-{mofDivName}'
      }
    },
    {
      title: '预算单位',
      width: 180,
      field: 'agencyName',
      sortable: false,
      filters: false,
      align: 'center',
      cellRender: {
        name: '$vxeInput',
        options: [],
        defaultValue: '',
        props: {
          format: '{agencyCode}-{agencyName}'
        }
      },
      props: {
        format: '{agencyCode}-{agencyName}'
      }
    },
    {
      title: '监控处理单号',
      width: 180,
      field: 'dealNo',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '生成日期',
      width: 180,
      field: 'issueTime',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      field: 'violateType',
      title: '违规类型',
      width: 180,
      disabled: true,
      itemRender: {
        name: '$vxeSelect',
        disabled: true,
        options: [
          {
            value: '指标使用不当',
            label: '指标使用不当'
          },
          {
            value: '支出进度太慢',
            label: '支出进度太慢'
          },
          {
            value: '资金使用方向错误',
            label: '资金使用方向错误'
          },
          {
            value: '资金超支',
            label: '资金超支'
          }
        ]
      }
    },
    {
      title: '监控规则',
      width: 180,
      field: 'fiRuleName',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '预警级别',
      field: 'warnLevel',
      fixed: '',
      width: '100',
      type: 'html',
      align: 'center',
      formula: '',
      constraint: '',
      combinedType: '',
      sortable: '1',
      associatedQuery: {
        queryMethods: '',
        queryUrl: '',
        params: {}
      },
      dragSort: null,
      className: '',
      combinedType_select_sort: '',
      filters: '',
      formatter: ({ row }) => {
        if (row.warnLevel === 3) {
          return '黄色预警'
        } else if (row.warnLevel === 2) {
          return '橙色预警'
        } else if (row.warnLevel === 1) {
          return '红色预警'
        } else if (row.warnLevel === 4) {
          return '蓝色预警'
        } else if (row.warnLevel === 5) {
          return '灰色预警'
        }
      }
    },
    {
      title: '处理方式',
      field: 'handleType',
      align: 'center',
      cellRender: {
        name: '$vxeSelect',
        options: [
          {
            value: 1,
            label: '预警，无需上传附件'
          },
          {
            value: 2,
            label: '预警，需上传附件'
          },
          {
            value: 3,
            label: '拦截'
          },
          {
            value: 4,
            label: '禁止'
          },
          {
            value: 5,
            label: '记录'
          }
        ],
        defaultValue: '',
        props: {}
      },
      name: '$vxeSelect'
    },
    {
      title: '单位整改意见',
      width: 180,
      field: 'information1',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '主管处室指导意见',
      width: 180,
      field: 'information2',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '主管处室整改意见',
      width: 180,
      field: 'information3',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '状态',
      width: 180,
      field: 'status',
      align: 'center',
      cellRender: {
        name: '$vxeSelect',
        options: [
          {
            value: 1,
            label: '已下发'
          },
          {
            value: 2,
            label: '已下发单位'
          },
          {
            value: 3,
            label: '单位反馈待审核'
          },
          {
            value: 4,
            label: '已整改'
          }
        ],
        defaultValue: '',
        props: {}
      },
      name: '$vxeSelect'
      // 0 未下发；1 已下发；2已整改；3已归档
    }
  ]
}
