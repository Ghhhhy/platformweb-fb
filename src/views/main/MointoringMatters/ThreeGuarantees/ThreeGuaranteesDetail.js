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
      // { code: 'add', label: '新增', status: 'primary' },
      // { code: 'change', label: '修改' },
      // { code: 'del', label: '删除' }
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
      title: '区划',
      field: 'province',
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
      title: '指标文号',
      field: 'corBgtDocNo',
      width: '8',
      align: 'left',
      formula: '',
      name: '$vxeInput',
      itemRender: {
        name: '$vxeInput',
        options: [],
        props: {
          placeholder: '指标文号'
        }
      }
    },
    {
      title: '项目编码',
      field: 'proCode',
      width: '8',
      align: 'left',
      formula: '',
      name: '$vxeInput',
      itemRender: {
        name: '$vxeInput',
        options: [],
        props: {
          placeholder: '项目编码'
        }
      }
    },
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
      title: '收支类型编码',
      field: 'proCatCode',
      width: '8',
      align: 'left',
      formula: '',
      name: '$vxeInput',
      itemRender: {
        name: '$vxeInput',
        options: [],
        props: {
          placeholder: '收支类型编码'
        }
      }
    },
    {
      title: '收支类型名称',
      field: 'proCatName',
      width: '8',
      align: 'left',
      formula: '',
      name: '$vxeInput',
      itemRender: {
        name: '$vxeInput',
        options: [],
        props: {
          placeholder: '收支类型名称'
        }
      }
    },
    {
      title: '预算单位',
      field: 'agencyCodeList',
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
            'placeholder': '预算单位',
            'multiple': true,
            'readonly': true,
            'isleaf': false
          }
        }
      }
    }
  ],
  highQueryData: {
    dataSourceName: '',
    businessModuleName: ''
  },
  PoliciesTableColumns: [
    // {
    //   title: '区划编码',
    //   field: 'mofDivCode',
    //   sortable: false,
    //   align: 'left'
    // },
    {
      title: '区划名称',
      field: 'mofDivName',
      width: 200,
      sortable: false,
      align: 'left'
    },
    {
      title: '单位编码',
      field: 'agencyCode',
      sortable: false,
      align: 'left'
    },
    {
      title: '单位名称',
      field: 'agencyName',
      sortable: false,
      align: 'left'
    },
    {
      title: '指标文号',
      field: 'corBgtDocNo',
      sortable: false,
      align: 'left'
    },
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
      title: '收支类别编码',
      field: 'proCatCode',
      sortable: false,
      align: 'left'
    },
    {
      title: '收支类别名称',
      field: 'proCatName',
      sortable: false,
      align: 'left'
    },
    {
      title: '项目现有三保标识',
      field: 'yy',
      sortable: false,
      align: 'left'
    },
    {
      'title': '预算金额',
      'field': 'ysAmt',
      'width': '150',
      'align': 'right',
      'filters': '[object Object]',
      'filterRender': {
        'name': 'FilterNumberCompare'
      },
      'combinedType': 'average,subTotal,total,totalAll',
      'cellRender': {
        'name': '$vxeMoney',
        'options': [],
        'defaultValue': '',
        'props': {}
      },
      'name': '$vxeMoney',
      'fixed': '',
      'formula': '',
      'constraint': '',
      'sortable': '',
      'associatedQuery': '',
      'className': '',
      'combinedType_select_sort': '平均值,选中合计,当前页合计,所有合计'
    },
    {
      'title': '支付金额',
      'field': 'payAmt',
      'width': '150',
      'align': 'right',
      'filters': '[object Object]',
      'filterRender': {
        'name': 'FilterNumberCompare'
      },
      'combinedType': 'average,subTotal,total,totalAll',
      'cellRender': {
        'name': '$vxeMoney',
        'options': [],
        'defaultValue': '',
        'props': {}
      },
      'name': '$vxeMoney',
      'fixed': '',
      'formula': '',
      'constraint': '',
      'sortable': '',
      'associatedQuery': '',
      'className': '',
      'combinedType_select_sort': '平均值,选中合计,当前页合计,所有合计'
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
