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
      { code: 'refech', label: '刷新', status: 'primary' }
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
      sortable: false,
      align: 'left'
    },
    {
      title: '地方标准“三保”支出（以地方实际结构填列，含国标）',
      field: 'totals',
      sortable: false,
      align: 'left',
      children: [
        {
          title: '合计',
          field: 'totals1',
          width: '150',
          align: 'center',
          children: [
            {
              'title': '预算数',
              'field': 'sbZbje',
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
              'title': '执行数',
              'field': 'sbZxje',
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
              title: '执行进度',
              'width': '150',
              field: 'percent',
              sortable: false,
              align: 'center'
            }
          ]
        },
        {
          title: '（一）保基本民生',
          field: 'totals2',
          width: '150',
          align: 'center',
          children: [
            {
              'title': '保基本民生预算数',
              'field': 'sbZbjeBjbms',
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
              'title': '保基本民生支付数',
              'field': 'sbZxjeBjbms',
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
              title: '保基本民生执行进度',
              field: 'bjbmsPercent',
              'width': '150',
              sortable: false,
              align: 'center'
            }
          ]
        },
        {
          title: '（二）保工资',
          field: 'totals3',
          width: '150',
          align: 'center',
          children: [
            {
              'title': '保工资预算数',
              'field': 'sbZbjeBgz',
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
              'title': '保工资支付数',
              'field': 'sbZxjeBgz',
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
              title: '保工资执行进度',
              field: 'bgzPercent',
              'width': '150',
              sortable: false,
              align: 'center'
            }
          ]
        },
        {
          title: '（三）保运转',
          field: 'totals4',
          width: '150',
          align: 'center',
          children: [
            {
              'title': '保运转预算数',
              'field': 'sbZbjeByz',
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
              'title': '保运转支付数',
              'field': 'sbZxjeByz',
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
              title: '保运转执行进度',
              field: 'byzPercent',
              'width': '150',
              sortable: false,
              align: 'center'
            }
          ]
        }
      ]
    },
    {
      title: '备注',
      field: 'rmake',
      'width': '150',
      sortable: false,
      align: 'left'
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
