let arr = [
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
    title: '业务数据单号',
    width: 180,
    field: 'businessNo',
    sortable: false,
    filters: false,
    align: 'center'
  },
  {
    title: '主题',
    width: 180,
    field: 'regulationClassName',
    sortable: false,
    filters: false,
    align: 'center'
  },
  {
    title: '违规时间',
    width: 180,
    field: 'warnTime',
    sortable: false,
    filters: false,
    align: 'center'
  },
  {
    title: '监控类型',
    field: 'triggerClass',
    align: 'center',
    width: 180,
    cellRender: {
      name: '$vxeSelect',
      options: [
        {
          value: 1,
          label: '事中触发'
        },
        {
          value: 2,
          label: '定时触发'
        }
      ],
      defaultValue: '',
      props: {}
    },
    name: '$vxeSelect'
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
    'title': '预警级别',
    'field': 'warnLevel',
    'fixed': '',
    'width': '100',
    'type': 'html',
    'align': 'center',
    'formula': '',
    'constraint': '',
    'combinedType': '',
    'sortable': '1',
    'associatedQuery': {
      'queryMethods': '',
      'queryUrl': '',
      'params': {}
    },
    'dragSort': null,
    'className': '',
    'combinedType_select_sort': '',
    'filters': '',
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
    width: 180,
    cellRender: {
      name: '$vxeSelect',
      options: [
        {
          value: 1,
          label: '拦截'
        },
        {
          value: 2,
          label: '预警，需上传附件'
        },
        {
          value: 3,
          label: '预警，无需上传附件'
        },
        {
          value: 4,
          label: '提醒'
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
    title: '支付金额',
    field: 'paymentAmount',
    sortable: false,
    filters: false,
    align: 'right',
    width: 180,
    combinedType: [
      'average',
      'subTotal',
      'total',
      'totalAll'
    ],
    cellRender: { name: '$vxeMoney' }
  },
  {
    title: '操作',
    field: 'opration',
    sortable: false,
    filters: false,
    align: 'center',
    fixed: 'right',
    width: 230,
    slots: {
      default: ({ row, rowIndex }, h) => {
        return [
          <div>
            {rowIndex !== 0 ? <el-button type="primary" size="mini" onClick={() => { this.handleRowClick(row, rowIndex) }}>查看详情{rowIndex}</el-button> : ''}
            {rowIndex === 1 ? <el-button type="primary" size="mini">删除</el-button> : ''}
            <el-button type="primary" size="mini">勾选</el-button>
          </div>
        ]
      }
    }
  }
]
