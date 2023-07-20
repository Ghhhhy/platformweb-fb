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
      // { code: 'Export', label: '导出', status: 'primary' }
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
    },
    {
      title: '监控主题',
      field: 'regulationClass',
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
            'placeholder': '监控主题',
            'multiple': false,
            'readonly': true,
            'isleaf': true
          }
        }
      }
    },
    {
      title: '监控规则',
      field: 'fiRuleName',
      width: '8',
      align: 'left',
      formula: '',
      name: '$vxeInput',
      itemRender: {
        name: '$vxeInput',
        props: {
          placeholder: '监控规则'
        }
      }
    }
  ],
  highQueryData: {
    fiscalYear: ''
  },
  PoliciesTableColumns: [
    {
      title: '规则名称',
      field: 'fiRuleName',
      width: '150',
      sortable: false,
      align: 'left'
    },
    {
      title: '整体预警情况',
      field: 'totals',
      sortable: false,
      align: 'left',
      children: [
        {
          title: '累计预警',
          field: 'wholeCount',
          width: '150',
          align: 'center'
        },
        {
          title: '其中红色预警',
          field: 'wholeHandleCount',
          width: '150',
          align: 'center'
        },
        {
          title: '红色预警未处理',
          field: 'wholeNoHandleCount',
          width: '150',
          align: 'center'
        },
        {
          title: '处理进度',
          field: 'wholeProcessingProgress',
          width: '150',
          align: 'center'
        }
      ]
    },
    {
      title: '监控问询情况',
      field: 'thing',
      sortable: false,
      align: 'left',
      children: [
        {
          title: '累计问询单',
          field: 'correctedCount',
          width: '150',
          align: 'center'
        },
        {
          title: '涉及金额',
          field: 'correctedAmount',
          width: '150',
          align: 'center'
        },
        {
          title: '已处理',
          field: 'orderCorrectionCount',
          width: '150',
          align: 'center'
        },
        {
          title: '已处理涉及金额',
          field: 'orderCorrectionAmount',
          width: '150',
          align: 'center'
        }
      ]
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
