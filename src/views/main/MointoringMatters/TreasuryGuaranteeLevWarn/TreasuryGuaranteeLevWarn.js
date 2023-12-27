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
    // {
    //   title: '业务年度',
    //   field: 'fiscalYear',
    //   'width': 180,
    //   align: 'left',
    //   formula: '',
    //   name: '$vxeSelect',
    //   itemRender: {
    //     name: '$vxeSelect',
    //     options: [
    //       { value: '2021', label: '2021' },
    //       { value: '2022', label: '2022' },
    //       { value: '2023', label: '2023' }
    //     ],
    //     props: {
    //       placeholder: '业务年度'
    //     }
    //   }
    // },
    {
      title: '区划名称',
      field: 'mofDivName',
      width: '8',
      align: 'left',
      formula: '',
      name: '$vxeInput',
      itemRender: {
        name: '$vxeInput',
        options: [],
        props: {
          placeholder: '区划名称'
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
    }
  ],
  highQueryData: {
    fiscalYear: '',
    mofDivName: '',
    mofDivCodeList: []
  },
  highQueryConfig1: [
    {
      title: '账务日期',
      field: 'date',
      itemRender: {
        name: '$vxeTime',
        defaultValue: '',
        props: {
          format: 'YYYY-MM-DD',
          type: 'date', // "当前日期为：YYYY-MM-DD，星期W，为第Q季度，时间为：hh:mm:ss:c"
          placeholder: '账务日期'
        }
      }
    },
    {
      title: '区划名称',
      field: 'mofDivName',
      width: '8',
      align: 'left',
      formula: '',
      name: '$vxeInput',
      itemRender: {
        name: '$vxeInput',
        options: [],
        props: {
          placeholder: '区划名称'
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
    }
  ],
  highQueryData1: {
    date: '',
    mofDivName: '',
    mofDivCodeList: []
  },
  PoliciesTableColumns: [
    {
      title: '区划编码',
      field: 'mofDivCode',
      width: '150',
      sortable: false,
      align: 'left'
    },
    {
      title: '区划名称',
      field: 'mofDivName',
      width: '150',
      sortable: false,
      align: 'left'
    }
  ],
  PoliciesTableColumns2: [
    {
      title: '区划编码',
      field: 'mofDivCode',
      width: '150',
      sortable: false,
      align: 'left'
    },
    {
      title: '区划名称',
      field: 'mofDivName',
      width: '150',
      sortable: false,
      align: 'left'
    },
    {
      title: '月份',
      field: 'month',
      sortable: false,
      align: 'center'
    },
    {
      title: '日期',
      field: 'date',
      sortable: false,
      align: 'center'
    },
    {
      title: '期初库款余额',
      field: 'beginningTreasuryBalance',
      width: '170',
      sortable: false,
      align: 'right',
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
      'associatedQuery': '',
      'className': '',
      'combinedType_select_sort': '平均值,选中合计,当前页合计,所有合计'
    },
    {
      title: '本期库款流入',
      field: 'currentTreasuryInflow',
      width: '170',
      sortable: false,
      align: 'right',
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
      'associatedQuery': '',
      'className': '',
      'combinedType_select_sort': '平均值,选中合计,当前页合计,所有合计'
    },
    {
      title: '本期库款流出',
      field: 'currentTreasuryOutflow',
      width: '170',
      sortable: false,
      align: 'right',
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
      'associatedQuery': '',
      'className': '',
      'combinedType_select_sort': '平均值,选中合计,当前页合计,所有合计'
    },
    {
      title: '期末库款余额',
      field: 'closingTreasuryBalance',
      width: '170',
      sortable: false,
      align: 'right',
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
      'associatedQuery': '',
      'className': '',
      'combinedType_select_sort': '平均值,选中合计,当前页合计,所有合计'
    },
    {
      title: '库款保障水平',
      field: 'treasuryGuaranteeLevel',
      sortable: false,
      align: 'center'
    },
    {
      title: '状态',
      field: 'status',
      align: 'center',
      type: 'html',
      'cellRender': {
        'name': '$vxeSelect',
        'options': [
          {
            'value': '1',
            'label': '库款预警'
          },
          {
            'value': '2',
            'label': '库款偏低'
          },
          {
            'value': '3',
            'label': '库款正常'
          },
          {
            'value': '4',
            'label': '库款闲置'
          },
          {
            'value': '-',
            'label': '-'
          }
        ],
        'defaultValue': '',
        'props': {}
      }
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
