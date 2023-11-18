
import store from '@/store'
export let proconf = {
  toolBarStatusButtons: [
    {
      type: 'button',
      iconName: 'base-all.png',
      iconNameActive: 'base-all-active.png',
      iconUrl: '',
      label: '全部',
      code: '1',
      curValue: ''
    }
  ],
  // BsToolBar 右侧按钮
  statusRightToolBarButton: {
    '1': [
      { code: 'check', label: '查看详情' }
    ]
  },
  highQueryConfig: [
    {
      title: '规则类型',
      field: 'fiRuleTypeCode',
      width: '180',
      align: 'left',
      itemRender: {
        name: '$vxeTree',
        options: [
          { value: '1',
            label: '中央监控规则',
            children: [
              { value: '11', label: '通用类监控规则' },
              { value: '12', label: '专项类监控规则' },
              { value: '19', label: '其他监控规则' }
            ]
          },
          { value: '2',
            label: '地方监控规则',
            children: [
              { value: '21', label: '通用类监控规则' },
              { value: '22', label: '专项类监控规则' },
              { value: '29', label: '其他监控规则' }
            ]
          }
        ],
        props: {
          config: {
            valueKeys: ['value', 'label', 'value'],
            format: '{value}-{label}',
            treeProps: {
              labelFormat: '{value}-{label}', // {code}-{name}
              nodeKey: 'value',
              label: 'label',
              children: 'children'
            },
            placeholder: '规则类型',
            multiple: false,
            readonly: false,
            isleaf: true
          }
        }
      }
    },
    {
      title: '管理级次',
      field: 'regulationType',
      width: 180,
      align: 'left',
      formula: '',
      name: '$vxeSelect',
      itemRender: {
        name: '$vxeSelect',
        options: [
          { value: '1', label: '系统级' },
          { value: '2', label: '财政级' },
          { value: '3', label: '部门级' }
        ],
        props: {
          clearable: true,
          placeholder: '管理级次'
        }
      }
    },
    {
      title: '触发方式',
      field: 'triggerClass',
      width: 180,
      align: 'left',
      formula: '',
      name: '$vxeSelect',
      itemRender: {
        name: '$vxeSelect',
        options: [
          { value: '1', label: '事中触发' },
          { value: '2', label: '定时触发' }
        ],
        props: {
          clearable: true,
          placeholder: '触发方式'
        }
      }
    }
  ],
  highQueryData: {
    warningLevel: '',
    handleType: '',
    regulationType: '',
    fiRuleTypeCode: '',
    isDir: '',
    isSpeType: ''
  },
  PoliciesTableColumns: [
    {
      title: '财政区划',
      width: 150,
      field: 'mofDivName',
      sortable: false,
      filters: false,
      align: 'left'
    },
    {
      title: '监控主题',
      width: 120,
      field: 'regulationClassName',
      sortable: false,
      filters: false,
      align: 'left'
    },
    {
      title: '规则类型',
      width: 180,
      field: 'fiRuleTypeName',
      sortable: false,
      filters: false,
      align: 'left'
    },
    {
      'title': '管理级次',
      width: 180,
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
      width: 130,
      field: 'regulationCode',
      sortable: false,
      filters: false,
      align: 'left'
    },
    {
      title: '监控规则名称',
      width: 300,
      field: 'regulationName',
      sortable: false,
      align: 'left'
    },
    {
      title: '预警级别',
      field: 'warningLevel',
      width: 180,
      align: 'left',
      formula: '',
      filters: store.state.warnInfo.warnLevelOptions,
      filterRender: {
        name: '$vxeSelect'
      },
      cellRender: {
        name: '$warningLevelRender',
        props: {
          placeholder: '预警级别'
        }
      }
    },
    {
      title: '处理方式',
      field: 'handleType',
      width: 180,
      align: 'left',
      name: '$vxeSelect',
      cellRender: {
        name: '$vxeSelect',
        options: store.state.warnInfo.warnControlTypeOptions,
        props: {
          placeholder: '处理方式'
        }
      }
    },
    {
      title: '规则模板',
      width: 180,
      field: 'regulationModelName',
      sortable: false,
      align: 'left'
    },
    {
      title: '业务模块',
      width: 180,
      field: 'businessModuleName',
      sortable: false,
      align: 'left'
    },
    {
      title: '业务功能',
      width: 180,
      field: 'menuNameList',
      sortable: false,
      align: 'left'
    },
    {
      title: '触发方式',
      width: 180,
      field: 'triggerClass',
      sortable: false,
      align: 'left',
      name: '$vxeSelect',
      cellRender: {
        name: '$vxeSelect',
        options: [
          { value: 1, label: '事中触发' },
          { value: 2, label: '定时触发' }
        ],
        props: {
          placeholder: '触发方式'
        }
      }
    },
    {
      title: '是否启用',
      width: 180,
      field: 'isEnable',
      sortable: false,
      align: 'left',
      name: '$vxeSelect',
      cellRender: {
        name: '$vxeSelect',
        options: [
          { value: 0, label: '否' },
          { value: 1, label: '是' }
        ],
        props: {
          placeholder: '处理方式'
        }
      }
    },
    {
      title: '启用人',
      width: 180,
      field: 'createPersonName',
      sortable: false,
      align: 'left'
    },
    {
      title: '规则说明',
      width: 180,
      field: 'ruleRemark',
      sortable: false,
      align: 'left'
    },
    {
      title: '事由',
      width: 180,
      field: 'ruleDesc',
      sortable: false,
      align: 'left'
    },
    {
      title: '启用时间',
      field: 'openTime',
      width: 180,
      sortable: false,
      align: 'left'
    },
    {
      title: '创建时间',
      field: 'createTime',
      width: 180,
      sortable: false,
      align: 'left'
    },
    {
      title: '白名单说明',
      field: 'ruleElementDesc',
      width: 180,
      sortable: false,
      align: 'left'
    },
    {
      title: '操作',
      field: 'monitorGloableOptionRow',
      className: 'gloableOptionRow',
      align: 'center',
      fixed: 'right',
      sortable: false,
      filters: false,
      width: 100,
      cellRender: {
        name: '$monitorGloableOptionRow'
      }
    }
  ]
}
