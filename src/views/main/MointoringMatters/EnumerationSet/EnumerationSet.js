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
      { code: 'change', label: '修改' },
      { code: 'del', label: '删除' },
      { code: 'detail', label: '列表' }
    ]
  },
  statusRightToolBarButton1: {
    '1': [
      { code: 'add', label: '新增', status: 'primary' },
      { code: 'change', label: '修改' },
      { code: 'del', label: '删除' },
      { code: 'close', label: '关闭' }
    ]
  },
  highQueryConfig: [
    {
      title: '枚举值名称',
      field: 'dictName',
      width: '8',
      align: 'left',
      formula: '',
      name: '$vxeInput',
      itemRender: {
        name: '$vxeInput',
        options: [],
        props: {
          placeholder: '枚举值名称'
        }
      }
    },
    {
      title: '状态',
      field: 'status',
      width: '8',
      align: 'left',
      formula: '',
      name: '$vxeSelect',
      itemRender: {
        name: '$vxeSelect',
        options: [
          {
            label: '正常',
            value: '1'
          },
          {
            label: '停用',
            value: '2'
          }
        ],
        props: {
          placeholder: '状态'
        }
      }
    }
  ],
  highQueryData: {
    dictName: '',
    status: ''
  },
  PoliciesTableColumns: [
    {
      title: '枚举值名称',
      field: 'dictName',
      sortable: false,
      align: 'center'
    },
    {
      title: '枚举值类型',
      field: 'dictType',
      sortable: false,
      align: 'center'
    },
    {
      title: '状态',
      field: 'status',
      sortable: false,
      align: 'center',
      cellRender: {
        name: '$vxeSelect',
        options: [
          { value: 1, label: '正常' },
          { value: 2, label: '停用' }
        ]
      }
    },
    {
      title: '备注',
      field: 'dictDesc',
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
  PoliciesTableColumns1: [
    {
      title: '枚举值名称',
      field: 'dictInfoName',
      sortable: false,
      align: 'center'
    },
    {
      title: '枚举值类型',
      field: 'dictType',
      sortable: false,
      align: 'center'
    },
    {
      title: '枚举值',
      field: 'dictInfoCode',
      sortable: false,
      align: 'center'
    },
    {
      title: '枚举值排序',
      field: 'sort',
      sortable: false,
      align: 'center'
    },
    {
      title: '状态',
      field: 'status',
      sortable: false,
      align: 'center',
      cellRender: {
        name: '$vxeSelect',
        options: [
          { value: 1, label: '正常' },
          { value: 2, label: '停用' }
        ]
      }
    },
    {
      title: '枚举值描述',
      field: 'dictInfoDesc',
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
  }
}
