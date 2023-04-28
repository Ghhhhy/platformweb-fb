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
      { code: 'add', label: '新增', status: 'primary' },
      { code: 'del', label: '删除' }
    ]
  },
  highQueryConfig: [
    {
      title: '三保科目名称',
      field: 'threeSafeName',
      width: '8',
      align: 'left',
      formula: '',
      name: '$vxeInput',
      itemRender: {
        name: '$vxeInput',
        options: [],
        props: {
          placeholder: '三保科目名称'
        }
      }
    },
    {
      title: '科目名称',
      field: 'proName',
      width: '8',
      align: 'left',
      formula: '',
      name: '$vxeInput',
      itemRender: {
        name: '$vxeInput',
        options: [],
        props: {
          placeholder: '科目名称'
        }
      }
    }
  ],
  highQueryData: {
    threeSafeName: '',
    proName: ''
  },
  PoliciesTableColumns: [
    {
      title: '三保科目编码',
      field: 'threeSafeCode',
      sortable: true,
      align: 'center'
    },
    {
      title: '三保科目名称',
      field: 'threeSafeName',
      sortable: false,
      align: 'center'
    },
    {
      title: '科目编码',
      field: 'proCode',
      sortable: true,
      align: 'center'
    },
    {
      title: '科目名称',
      field: 'proName',
      sortable: false,
      align: 'center'
    },
    {
      'title': '科目类型',
      'width': 180,
      'field': 'type',
      'align': 'center',
      'cellRender': {
        'name': '$vxeSelect',
        'options': [
          {
            'value': '1',
            'label': '功能科目'
          },
          {
            'value': '2',
            'label': '政府经济科目'
          },
          {
            'value': '3',
            'label': '部门经济科目'
          }
        ],
        'defaultValue': '',
        'props': {}
      },
      'sortable': 'true',
      'name': '$vxeSelect'
    },
    {
      title: '创建人',
      field: 'createPersonName',
      sortable: false,
      align: 'center'
    },
    {
      title: '创建时间',
      field: 'createTime',
      sortable: false,
      align: 'center'
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
  },
  threeSafeOptions: {
    field: 'threeSafe',
    title: '三保要素',
    titleAlign: 'left',
    titleWidth: '150px',
    itemRender: {
      name: '$vxeSelect',
      props: {
        placeholder: '请选择三保要素',
        multiple: true,
        disabled: false
      },
      options: [
        {
          id: 'e767004b5b434d3c939a8f48def6eb491',
          code: '003',
          label: '三保',
          name: '三保',
          children: [
            {
              id: 'e767004b5b434d3c939a8f41d2f6eb492',
              code: '003001',
              label: '保工资',
              name: '保工资'
            },
            {
              id: 'e767004b5b434d3c939a8f41d2f6eb493',
              code: '003002',
              label: '保运转',
              name: '保运转'
            },
            {
              id: 'e767004b5b434d3c939a8f4111f2eb494',
              code: '003003',
              label: '保基本民生',
              name: '保基本民生'
            }
          ]
        }
      ]
    }
  },
  formItemsConfigMessage: [
    {
      field: 'payment',
      title: '基础要素',
      titleAlign: 'left',
      titleWidth: '150px',
      itemRender: {
        name: '$vxeSelect',
        props: {
          placeholder: '请选择基础要素',
          multiple: true,
          disabled: false
        },
        options: [
          {
            value: 0,
            label: '功能分类',
            urlC: 'EXPFUNC',
            name: 'exp_func'
          },
          {
            value: 1,
            label: '政府经济科目',
            urlC: 'GOVBGTECO',
            name: 'gov_bgt_eco'
          },
          {
            value: 2,
            label: '部门经济科目',
            urlC: 'DEPBGTECO',
            name: 'dep_bgt_eco'
          }
        ]
      }
    }
  ]
}
