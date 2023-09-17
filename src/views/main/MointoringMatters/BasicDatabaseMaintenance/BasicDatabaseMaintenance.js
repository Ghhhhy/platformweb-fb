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
      curValue: ''
    }
  ],
  // BsToolBar 右侧按钮
  statusRightToolBarButton: {
    '1': [
      { code: 'add', label: '新增', status: 'primary' },
      { code: 'update', label: '修改' },
      { code: 'delete', label: '删除' }
    ]
  },
  statusRightToolBarButtonByBusDept: {
    '1': [
      { code: 'check', label: '查看详情' }
    ]
  },
  highQueryConfig: [
    {
      title: '年份',
      field: 'year',
      'width': 180,
      align: 'left',
      formula: '',
      itemRender: {
        name: '$vxeInput',
        props: {
          placeholder: '年度',
          type: 'year',
          clearable: true,
          valueFormat: 'yyyy'
        }
      }
    },
    {
      title: '类别',
      field: 'typeName',
      'width': 180,
      align: 'left',
      formula: '',
      name: '$vxeSelect',
      itemRender: {
        name: '$vxeSelect',
        options: [
          { value: '预决算报告', label: '预决算报告' },
          { value: '审计报告', label: '审计报告' },
          { value: '财政监督报告', label: '财政监督报告' }
        ],
        props: {
          placeholder: '类别'
        }
      }
    },
    {
      title: '名称',
      field: 'basicName',
      width: '8',
      align: 'left',
      formula: '',
      name: '$vxeInput',
      itemRender: {
        name: '$vxeInput',
        options: [],
        props: {
          placeholder: '名称'
        }
      }
    },
    {
      title: '创建人',
      field: 'createPerson',
      width: '8',
      align: 'left',
      formula: '',
      name: '$vxeInput',
      itemRender: {
        name: '$vxeInput',
        options: [],
        props: {
          placeholder: '创建人'
        }
      }
    }
  ],
  highQueryData: {
    warningLevel: '',
    handleType: '',
    regulationType: '',
    year: ''
  },
  PoliciesTableColumns: [
    {
      title: '年度',
      field: 'year',
      sortable: false,
      filters: false,
      align: 'center',
      width: 150
    },
    {
      title: '区划',
      field: 'provinceName',
      sortable: false,
      filters: false,
      align: 'center',
      width: 150
    },
    {
      title: '单位',
      field: 'agencyName',
      sortable: false,
      filters: false,
      align: 'center',
      width: 150
    },
    {
      title: '类别',
      field: 'typeName',
      sortable: false,
      filters: false,
      align: 'center',
      width: 150
    },
    {
      title: '名称',
      field: 'basicName',
      sortable: false,
      align: 'center',
      width: 150
    },
    {
      title: '创建人',
      field: 'createPerson',
      sortable: false,
      align: 'center',
      width: 150
    },
    {
      title: '创建时间',
      field: 'createTime',
      sortable: false,
      align: 'center',
      width: 150
    },
    {
      'title': '操作',
      'field': 'gloableOptionRow',
      'className': 'gloableOptionRow',
      'align': 'center',
      'fixed': 'right',
      'sortable': 'false',
      'width': '100',
      'cellRender': {
        'name': '$payVoucherInputGloableOptionRow',
        'options': [],
        'defaultValue': '',
        'props': {}
      },
      'name': '$payVoucherInputGloableOptionRow',
      'formula': '',
      'constraint': '',
      'combinedType': '',
      'associatedQuery': '',
      'combinedType_select_sort': '',
      'filters': ''
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
        // <el-tooltip content="修改" placement="top" effect="light">
        //   <a class="gloable-option-row-edit gloable-option-row  fn-inline" onClick={() => self.onOptionRowClick({ row, column, optionType: 'uodate' })}>修改</a>
        // </el-tooltip>,
        <el-tooltip content="附件" placement="top" effect="light">
          <a class="gloable-option-row-attachment gloable-option-row  fn-inline" onClick={() => self.onOptionRowClick({ row, column, optionType: 'attachment' })}>附件</a>,
        </el-tooltip>
      ]
    }
  }
}
