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
      { code: 'del', label: '删除' }
    ]
  },
  statusRightToolBarButtonByBusDept: {
    '1': [
      { code: 'add', label: '新增', status: 'primary' },
      { code: 'change', label: '修改' },
      { code: 'del', label: '删除' }
    ]
  },
  highQueryConfig: [
    {
      title: '项目名称',
      field: 'proName',
      width: '8',
      align: 'left',
      formula: '',
      name: '$vxeInput',
      itemRender: {
        name: '$vxeInput',
        options: [],
        props: {
          placeholder: '项目名称'
        }
      }
    },
    {
      title: '资金分类名称',
      field: 'fundCategoryName',
      width: '8',
      align: 'left',
      formula: '',
      name: '$vxeInput',
      itemRender: {
        name: '$vxeInput',
        options: [],
        props: {
          placeholder: '资金分类名称'
        }
      }
    },
    {
      title: '热点分类名称',
      field: 'cfsHotTopicCateName',
      width: '8',
      align: 'left',
      formula: '',
      name: '$vxeInput',
      itemRender: {
        name: '$vxeInput',
        options: [],
        props: {
          placeholder: '热点分类名称'
        }
      }
    },
    {
      title: '中央项目资金名称',
      field: 'proFundName',
      width: '8',
      align: 'left',
      formula: '',
      name: '$vxeInput',
      itemRender: {
        name: '$vxeInput',
        options: [],
        props: {
          placeholder: '中央项目资金名称'
        }
      }
    }
  ],
  highQueryData: {
    proName: '',
    fundCategoryName: '',
    cfsHotTopicCateName: '',
    proFundName: ''
  },
  PoliciesTableColumns: [
    {
      title: '项目编码',
      field: 'proCode',
      sortable: false,
      align: 'left'
    },
    {
      title: '项目名称',
      field: 'proName',
      sortable: false,
      align: 'left'
    },
    {
      title: '资金分类编码',
      field: 'fundCategoryCode',
      sortable: false,
      align: 'left'
    },
    {
      title: '资金分类名称',
      field: 'fundCategoryName',
      sortable: false,
      align: 'left'
    },
    {
      title: '热点分类编码',
      field: 'cfsHotTopicCateCode',
      sortable: false,
      align: 'left'
    },
    {
      title: '热点分类名称',
      field: 'cfsHotTopicCateName',
      sortable: false,
      align: 'left'
    },
    {
      title: '中央项目资金名称编码',
      field: 'proFundCode',
      sortable: false,
      align: 'left'
    },
    {
      title: '中央项目资金名称',
      field: 'proFundName',
      sortable: false,
      align: 'left'
    }
    // ,{
    //   title: '数据源地址',
    //   field: 'adapterAddr',
    //   sortable: false,
    //   align: 'left'
    // }
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
