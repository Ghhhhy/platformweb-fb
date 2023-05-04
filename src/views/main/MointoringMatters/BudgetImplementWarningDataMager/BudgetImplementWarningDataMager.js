// import store from '@/store/index'
import store from '@/store'

export let proconf = {
  PoliciesTableColumns: [
    {
      'title': '管理级次',
      'width': 100,
      'field': 'regulationType',
      'align': 'center',
      'cellRender': {
        'name': '$vxeSelect',
        'options': [
          {
            'value': '1',
            'label': '系统级'
          },
          {
            'value': '2',
            'label': '财政级'
          },
          {
            'value': '3',
            'label': '部门级'
          }
        ],
        'defaultValue': '',
        'props': {}
      },
      'sortable': 'true',
      'name': '$vxeSelect'
    },
    {
      title: '监控规则编码',
      'width': 100,
      field: 'regulationCode',
      sortable: false,
      filters: false,
      align: 'left'
    },
    {
      title: '监控规则名称',
      'width': 100,
      field: 'regulationName',
      sortable: false,
      align: 'left'
    },
    {
      title: '预警级别',
      field: 'warningLevel',
      'width': 100,
      align: 'left',
      formula: '',
      'cellRender': {
        'name': '$vxeSelect',
        options: [
          { value: 1, label: '一级' },
          { value: 2, label: '二级' },
          { value: 3, label: '三级' }
        ],
        'defaultValue': '',
        'props': {}
      },
      'sortable': 'true',
      'name': '$vxeSelect'
    },
    {
      title: '处理方式',
      field: 'handleType',
      'width': 100,
      align: 'left',
      'cellRender': {
        'name': '$vxeSelect',
        options: store.state.warnInfo.warnControlTypeOptions,
        'defaultValue': '',
        'props': {}
      },
      'sortable': 'true',
      'name': '$vxeSelect'
    },
    {
      title: '业务模块',
      'width': 100,
      field: 'businessModuleName',
      sortable: false,
      align: 'left'
    },
    {
      title: '业务功能',
      'width': 100,
      field: 'businessFunctionName',
      sortable: false,
      align: 'left'
    },
    {
      title: '是否启用',
      'width': 100,
      field: 'isEnable',
      sortable: false,
      align: 'left',
      'cellRender': {
        'name': '$vxeSelect',
        options: [
          { value: 0, label: '否' },
          { value: 1, label: '是' }
        ],
        'defaultValue': '',
        'props': {}
      },
      'name': '$vxeSelect'
    },
    {
      title: '规则说明',
      'width': 100,
      field: 'ruleRemark',
      sortable: false,
      align: 'left'
    },
    {
      'title': '状态',
      'field': 'regulationStatus',
      'align': 'center',
      'width': 100,
      'cellRender': {
        'name': '$vxeSelect',
        options: [
          {
            'value': '1',
            'label': '新增'
          },
          {
            'value': '2',
            'label': '送审'
          },
          {
            'value': '3',
            'label': '审核'
          }
        ],
        'defaultValue': '',
        'props': {}
      },
      'name': '$vxeSelect'
    }
    // {
    //   title: '变更记录',
    //   field: '',
    //   sortable: false,
    //   align: 'left'
    // }
  ],
  tableColumnsConfig: [
    {
      title: '规则名称',
      width: 100,
      field: 'fiRuleName',
      sortable: false,
      align: 'left'
    },
    {
      title: '预警级别',
      field: 'warnLevel',
      'width': 170,
      align: 'left',
      formula: '',
      'cellRender': {
        'name': '$vxeSelect',
        options: [
          { value: 1, label: '一级' },
          { value: 2, label: '二级' },
          { value: 3, label: '三级' }
        ],
        'defaultValue': '',
        'props': {}
      },
      'sortable': 'true',
      'name': '$vxeSelect'
    },
    {
      title: '处理方式',
      field: 'controlType',
      'width': 170,
      align: 'left',
      'cellRender': {
        'name': '$vxeSelect',
        options: store.state.warnInfo.warnControlTypeOptions,
        'defaultValue': '',
        'props': {}
      },
      'sortable': 'true',
      'name': '$vxeSelect'
    },
    {
      title: '合计数量',
      'width': 70,
      field: 'sumData',
      // formula: '{month1} + {month2} + {month3} + {month4} + {month5} + {month6} + {month7} + {month8} + {month9} + {month10} + {month11} + {month12}',
      sortable: false,
      align: 'left'
    },
    {
      title: '合计金额',
      'width': 70,
      field: 'sumAmount',
      sortable: false,
      align: 'left'
    },
    {
      title: '已处理数量',
      'width': 70,
      field: 'handleData',
      sortable: false,
      align: 'left'
    },
    {
      title: '已处理金额',
      'width': 70,
      field: 'handleAmount',
      sortable: false,
      align: 'left'
    },
    {
      title: '一月',
      'width': 70,
      field: 'month1',
      sortable: false,
      align: 'left',
      cellRender: {
        name: '$vxeInput',
        defaultValue: '',
        props: {
          // format: '{month}{[0]}'
        }
      }
    },
    {
      title: '二月',
      'width': 70,
      field: 'month2',
      sortable: false,
      align: 'left',
      cellRender: {
        name: '$vxeInput',
        defaultValue: '',
        props: {
          // format: '{month}[0]'
        }
      }
    },
    {
      title: '三月',
      'width': 70,
      field: 'month3',
      sortable: false,
      align: 'left'
    },
    {
      title: '四月',
      'width': 70,
      field: 'month4',
      sortable: false,
      align: 'left'
    },
    {
      title: '五月',
      'width': 70,
      field: 'month5',
      sortable: false,
      align: 'left'
    },
    {
      title: '六月',
      'width': 70,
      field: 'month6',
      sortable: false,
      align: 'left'
    },
    {
      title: '七月',
      'width': 70,
      field: 'month7',
      sortable: false,
      align: 'left'
    },
    {
      title: '八月',
      'width': 70,
      field: 'month8',
      sortable: false,
      align: 'left'
    },
    {
      title: '九月',
      'width': 70,
      field: 'month9',
      sortable: false,
      align: 'left'
    },
    {
      title: '十月',
      'width': 70,
      field: 'month10',
      sortable: false,
      align: 'left'
    },
    {
      title: '十一月',
      'width': 70,
      field: 'month11',
      sortable: false,
      align: 'left'
    },
    {
      title: '十二月',
      'width': 70,
      field: 'month12',
      sortable: false,
      align: 'left'
    }
  ],
  tableData: [
    {
      'regulationName': '规则名称',
      'warningLevel': '2',
      'handleType': '2',
      'ruleLevel': '',
      'mof_div': [
        {
          'mof_div_id': '1',
          'mof_div_code': '170000000',
          'mof_div_name': '区划1',
          'count': '10'
        },
        {
          'mof_div_id': '2',
          'mof_div_code': '170000001',
          'mof_div_name': '区划2',
          'count': '20'
        },
        {
          'mof_div_id': '3',
          'mof_div_code': '170000002',
          'mof_div_name': '区划3',
          'count': '30'
        },
        {
          'mof_div_id': '4',
          'mof_div_code': '170000002',
          'mof_div_name': '区划4',
          'count': '20'
        },
        {
          'mof_div_id': '3',
          'mof_div_code': '170000002',
          'mof_div_name': '区划5',
          'count': '12'
        },
        {
          'mof_div_id': '3',
          'mof_div_code': '170000002',
          'mof_div_name': '区划6',
          'count': '15'
        },
        {
          'mof_div_id': '3',
          'mof_div_code': '170000002',
          'mof_div_name': '区划7',
          'count': '30'
        },
        {
          'mof_div_id': '3',
          'mof_div_code': '170000002',
          'mof_div_name': '区划8',
          'count': '100'
        },
        {
          'mof_div_id': '3',
          'mof_div_code': '170000002',
          'mof_div_name': '区划9',
          'count': '87'
        },
        {
          'mof_div_id': '3',
          'mof_div_code': '170000002',
          'mof_div_name': '区划10',
          'count': '11'
        },
        {
          'mof_div_id': '3',
          'mof_div_code': '170000002',
          'mof_div_name': '区划11',
          'count': '45'
        },
        {
          'mof_div_id': '3',
          'mof_div_code': '170000002',
          'mof_div_name': '区划12',
          'count': '70'
        }
      ],
      'month': [1, 30, 89, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    },
    {
      'regulationName': '规则名称',
      'warningLevel': '1',
      'handleType': '3',
      'ruleLevel': '',
      'mof_div': [
        {
          'mof_div_id': '1',
          'mof_div_code': '170000000',
          'mof_div_name': '区划1',
          'count': '1'
        },
        {
          'mof_div_id': '2',
          'mof_div_code': '170000001',
          'mof_div_name': '区划2',
          'count': '2'
        },
        {
          'mof_div_id': '3',
          'mof_div_code': '170000002',
          'mof_div_name': '区划3',
          'count': '3'
        },
        {
          'mof_div_id': '4',
          'mof_div_code': '170000002',
          'mof_div_name': '区划4',
          'count': '20'
        },
        {
          'mof_div_id': '3',
          'mof_div_code': '170000002',
          'mof_div_name': '区划5',
          'count': '12'
        },
        {
          'mof_div_id': '3',
          'mof_div_code': '170000002',
          'mof_div_name': '区划6',
          'count': '72'
        },
        {
          'mof_div_id': '3',
          'mof_div_code': '170000002',
          'mof_div_name': '区划7',
          'count': '30'
        },
        {
          'mof_div_id': '3',
          'mof_div_code': '170000002',
          'mof_div_name': '区划8',
          'count': '100'
        },
        {
          'mof_div_id': '3',
          'mof_div_code': '170000002',
          'mof_div_name': '区划9',
          'count': '87'
        },
        {
          'mof_div_id': '3',
          'mof_div_code': '170000002',
          'mof_div_name': '区划10',
          'count': '11'
        },
        {
          'mof_div_id': '3',
          'mof_div_code': '170000002',
          'mof_div_name': '区划11',
          'count': '60'
        },
        {
          'mof_div_id': '3',
          'mof_div_code': '170000002',
          'mof_div_name': '区划12',
          'count': '8'
        }
      ],
      'month': [1, 30, 89, 1, 2, 3, 4, 5, 4, 3, 2, 1]
    },
    {}
  ]
}
