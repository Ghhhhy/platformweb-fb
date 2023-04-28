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
      title: '高风险县名称',
      field: 'mofDivName',
      width: '8',
      align: 'left',
      formula: '',
      name: '$vxeInput',
      itemRender: {
        name: '$vxeInput',
        options: [],
        props: {
          placeholder: '高风险县名称'
        }
      }
    }
  ],
  highQueryData: {
    mofDivName: ''
  },
  PoliciesTableColumns: [
    {
      title: '高风险县编码',
      field: 'mofDivCode',
      sortable: true,
      align: 'center'
    },
    {
      title: '高风险县名称',
      field: 'mofDivName',
      sortable: false,
      align: 'center'
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
  }
}
