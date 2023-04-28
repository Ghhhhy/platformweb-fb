// import store from '@/store/index'
export let proconf = {
  // BsToolBar 状态栏
  toolBarStatusButtons: [
    {
      type: 'button',
      iconName: 'base-all.png',
      iconNameActive: 'base-all-active.png',
      iconUrl: '',
      label: '全部',
      code: '1',
      curValue: '1'
    }
  ],
  // BsToolBar 右侧按钮
  statusRightToolBarButton: {
    '1': [
      // { code: 'sign', label: '疑似违规', status: 'primary' },
      // { code: 'detail', label: '查看详情', status: 'primary' }
    ]
  },
  highQueryConfig: [
    {
      title: '业务年度',
      field: 'fiscalYear',
      'width': 180,
      align: 'left',
      formula: '',
      name: '$vxeSelect',
      itemRender: {
        name: '$vxeSelect',
        options: [
          { value: '2021', label: '2021' },
          { value: '2022', label: '2022' },
          { value: '2023', label: '2023' }
        ],
        props: {
          placeholder: '业务年度'
        }
      }
    },
    // {
    //   title: '区划名称',
    //   field: 'mofDivName',
    //   width: '8',
    //   align: 'left',
    //   formula: '',
    //   name: '$vxeInput',
    //   itemRender: {
    //     name: '$vxeInput',
    //     options: [],
    //     props: {
    //       placeholder: '区划名称'
    //     }
    //   }
    // },
    {
      title: '区划',
      field: 'mofDivCodeList',
      width: '8',
      align: 'left',
      formula: '',
      name: '$vxeTree',
      itemRender: {
        name: '$vxeTree',
        options: [],
        'props': {
          'config': {
            'treeProps': {
              'nodeKey': 'id',
              'label': 'label',
              'children': 'children'
            },
            'placeholder': '区划',
            'multiple': true,
            'readonly': true,
            'isleaf': false
          }
        }
      }
    }
  ],
  highQueryData: {
    fiscalYear: ''
  },
  PoliciesTableColumns1: [
    {
      title: '账务日期',
      field: 'date',
      sortable: false,
      align: 'center'
    },
    {
      title: '期初库款余额',
      field: 'remainamt',
      sortable: false,
      align: 'center'
    },
    {
      title: '本期库款流入',
      field: 'lramt',
      sortable: false,
      align: 'center'
    },
    {
      title: '本期库款流出',
      field: 'lcamt',
      sortable: false,
      align: 'center'
    },
    {
      title: '期末库款余额',
      field: 'terminal',
      sortable: false,
      align: 'center'
    },
    {
      title: '库款保障天数',
      field: 'day',
      sortable: false,
      align: 'center'
    },
    {
      'title': '状态',
      'field': 'status',
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
      'filters': ''
    }
  ],
  PoliciesTableColumns: [
    {
      title: '区划编码',
      field: 'mofDivCode',
      sortable: false,
      align: 'center'
    },
    {
      title: '区划名称',
      field: 'mofDivName',
      sortable: false,
      align: 'center'
    },
    {
      'title': '阈值',
      'field': 'threshold',
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
      'filters': ''
    },
    {
      'title': '1月',
      'field': 'month1',
      'align': 'center',
      children: [
        {
          title: '红色',
          field: 'red_1',
          width: '100',
          align: 'center',
          headerClassName: 'add-red'
        },
        {
          title: '黄色',
          field: 'yellow_1',
          width: '100',
          align: 'center',
          headerClassName: 'add-yellow'
        }
      ],
      'cellRender': {
        'name': '$vxeSelect',
        'defaultValue': '',
        'props': {}
      },
      'sortable': 'true',
      'name': '$vxeSelect'
    },
    {
      'title': '2月',
      'field': 'month2',
      'align': 'center',
      children: [
        {
          title: '红色',
          field: 'red_2',
          width: '100',
          align: 'center',
          headerClassName: 'add-red'
        },
        {
          title: '黄色',
          field: 'yellow_2',
          width: '100',
          align: 'center',
          headerClassName: 'add-yellow'
        }
      ],
      'cellRender': {
        'name': '$vxeSelect',
        'defaultValue': '',
        'props': {}
      },
      'sortable': 'true',
      'name': '$vxeSelect'
    },
    {
      'title': '3月',
      'field': 'month3',
      'align': 'center',
      children: [
        {
          title: '红色',
          field: 'red_3',
          width: '100',
          align: 'center',
          headerClassName: 'add-red'
        },
        {
          title: '黄色',
          field: 'yellow_3',
          width: '100',
          align: 'center',
          headerClassName: 'add-yellow'
        }
      ],
      'cellRender': {
        'name': '$vxeSelect',
        'defaultValue': '',
        'props': {}
      },
      'sortable': 'true',
      'name': '$vxeSelect'
    },
    {
      'title': '4月',
      'field': 'month4',
      'align': 'center',
      children: [
        {
          title: '红色',
          field: 'red_4',
          width: '100',
          align: 'center',
          headerClassName: 'add-red'
        },
        {
          title: '黄色',
          field: 'yellow_4',
          width: '100',
          align: 'center',
          headerClassName: 'add-yellow'
        }
      ],
      'cellRender': {
        'name': '$vxeSelect',
        'defaultValue': '',
        'props': {}
      },
      'sortable': 'true',
      'name': '$vxeSelect'
    },
    {
      'title': '5月',
      'field': 'month5',
      'align': 'center',
      children: [
        {
          title: '红色',
          field: 'red_5',
          width: '100',
          align: 'center',
          headerClassName: 'add-red'
        },
        {
          title: '黄色',
          field: 'yellow_5',
          width: '100',
          align: 'center',
          headerClassName: 'add-yellow'
        }
      ],
      'cellRender': {
        'name': '$vxeInput',
        'defaultValue': '',
        'props': {}
      },
      'sortable': 'true',
      'name': '$vxeSelect'
    },
    {
      'title': '6月',
      'field': 'month6',
      'align': 'center',
      children: [
        {
          title: '红色',
          field: 'red_6',
          width: '100',
          align: 'center',
          headerClassName: 'add-red'
        },
        {
          title: '黄色',
          field: 'yellow_6',
          width: '100',
          align: 'center',
          headerClassName: 'add-yellow'
        }
      ],
      'cellRender': {
        'name': '$vxeSelect',
        'defaultValue': '',
        'props': {}
      },
      'sortable': 'true',
      'name': '$vxeSelect'
    },
    {
      'title': '7月',
      'field': 'month7',
      'align': 'center',
      children: [
        {
          title: '红色',
          field: 'red_7',
          width: '100',
          align: 'center',
          headerClassName: 'add-red'
        },
        {
          title: '黄色',
          field: 'yellow_7',
          width: '100',
          align: 'center',
          headerClassName: 'add-yellow'
        }
      ],
      'cellRender': {
        'name': '$vxeSelect',
        'defaultValue': '',
        'props': {}
      },
      'sortable': 'true',
      'name': '$vxeSelect'
    },
    {
      'title': '8月',
      'field': 'month8',
      'align': 'center',
      children: [
        {
          title: '红色',
          field: 'red_8',
          width: '100',
          align: 'center',
          headerClassName: 'add-red'
        },
        {
          title: '黄色',
          field: 'yellow_8',
          width: '100',
          align: 'center',
          headerClassName: 'add-yellow'
        }
      ],
      'cellRender': {
        'name': '$vxeSelect',
        'defaultValue': '',
        'props': {}
      },
      'sortable': 'true',
      'name': '$vxeSelect'
    },
    {
      'title': '9月',
      'field': 'month9',
      'align': 'center',
      children: [
        {
          title: '红色',
          field: 'red_9',
          width: '100',
          align: 'center',
          headerClassName: 'add-red'
        },
        {
          title: '黄色',
          field: 'yellow_9',
          width: '100',
          align: 'center',
          headerClassName: 'add-yellow'
        }
      ],
      'cellRender': {
        'name': '$vxeSelect',
        'defaultValue': '',
        'props': {}
      },
      'sortable': 'true',
      'name': '$vxeSelect'
    },
    {
      'title': '10月',
      'field': 'month10',
      'align': 'center',
      children: [
        {
          title: '红色',
          field: 'red_10',
          width: '100',
          align: 'center',
          headerClassName: 'add-red'
        },
        {
          title: '黄色',
          field: 'yellow_10',
          width: '100',
          align: 'center',
          headerClassName: 'add-yellow'
        }
      ],
      'cellRender': {
        'name': '$vxeSelect',
        'defaultValue': '',
        'props': {}
      },
      'sortable': 'true',
      'name': '$vxeSelect'
    },
    {
      'title': '11月',
      'field': 'month11',
      'align': 'center',
      children: [
        {
          title: '红色',
          field: 'red_11',
          width: '100',
          align: 'center',
          headerClassName: 'add-red'
        },
        {
          title: '黄色',
          field: 'yellow_11',
          width: '100',
          align: 'center',
          headerClassName: 'add-yellow'
        }
      ],
      'cellRender': {
        'name': '$vxeSelect',
        'defaultValue': '',
        'props': {}
      },
      'sortable': 'true',
      'name': '$vxeSelect'
    },
    {
      'title': '12月',
      'field': 'month12',
      'align': 'center',
      children: [
        {
          title: '红色',
          field: 'red_12',
          width: '100',
          align: 'center',
          headerClassName: 'add-red'
        },
        {
          title: '黄色',
          field: 'yellow_12',
          width: '100',
          align: 'center',
          headerClassName: 'add-yellow'
        }
      ],
      'cellRender': {
        'name': '$vxeSelect',
        'defaultValue': '',
        'props': {}
      },
      'sortable': 'true',
      'name': '$vxeSelect'
    }
  ],
  // table 操作按钮
  gloableOptionRow: {
    renderDefault(h, cellRender, params, context) {
      let self = context.$grid.$parent
      let { row, column } = params
      // const main = self.$parent.$parent.$parent.$parent
      // let status = main._data.toolBarStatusSelect.curValue
      return [
        <el-tooltip content="新增" placement="top" effect="light">
          <a class="gloable-option-row-add gloable-option-row  fn-inline" onClick={() => self.onOptionRowClick({ row, column, optionType: 'add' })}>新增</a>
        </el-tooltip>,
        <el-tooltip content="附件" placement="top" effect="light">
          <a class="gloable-option-row-attachment gloable-option-row  fn-inline" onClick={() => self.onOptionRowClick({ row, column, optionType: 'attachment' })}>附件</a>,
        </el-tooltip>
      ]
    }
  }
}
