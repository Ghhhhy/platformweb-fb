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
      title: '月份',
      field: 'acctPeriod',
      'width': 180,
      align: 'left',
      formula: '',
      name: '$vxeSelect',
      itemRender: {
        name: '$vxeSelect',
        options: [
          { value: '1', label: '1' },
          { value: '2', label: '2' },
          { value: '3', label: '3' },
          { value: '4', label: '4' },
          { value: '5', label: '5' },
          { value: '6', label: '6' },
          { value: '7', label: '7' },
          { value: '8', label: '8' },
          { value: '9', label: '9' },
          { value: '10', label: '10' },
          { value: '11', label: '11' },
          { value: '12', label: '12' }
        ],
        props: {
          placeholder: '月份'
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
    },
    {
      title: '当期情况',
      field: 'flag',
      'width': 180,
      align: 'left',
      formula: '',
      name: '$vxeSelect',
      itemRender: {
        name: '$vxeSelect',
        options: [
          { value: '1', label: '新增项(+)' },
          { value: '-1', label: '消化项(-)' },
          { value: '0', label: '全部' }
        ],
        props: {
          placeholder: '当期情况'
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
      title: '会计科目',
      field: 'account',
      sortable: false,
      align: 'center'
    },
    {
      title: '期初数',
      field: 'remainamt',
      sortable: false,
      align: 'center'
    },
    {
      title: '借方发生',
      field: 'dramt',
      sortable: false,
      align: 'center'
    },
    {
      title: '贷方发生',
      field: 'cramt',
      sortable: false,
      align: 'center'
    },
    {
      title: '期末数',
      field: 'endAmt',
      sortable: false,
      align: 'center'
    },
    {
      title: '摘要',
      field: 'day',
      sortable: false,
      align: 'center'
    }
  ],
  PoliciesTableColumns: [
    {
      title: '区划编码',
      field: 'mofDivCode',
      sortable: false,
      width: 150,
      align: 'center'
    },
    {
      title: '区划名称',
      field: 'mofDivName',
      sortable: false,
      width: 150,
      align: 'center'
    },
    {
      'title': '暂付性款项余额',
      'field': 'bottonAmt',
      'width': '300',
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
      'title': '暂付性款项期初数',
      'field': 'topAmt',
      'width': '250',
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
      'title': '暂付性款项余额比对',
      'field': 'present',
      'align': 'center',
      children: [
        {
          title: '与当年6月比对',
          field: 'amtPresentNow6d',
          width: '100',
          align: 'center'
          // headerClassName: 'add-red'
        },
        {
          title: '与上年底比对',
          field: 'amtPresentLast12',
          width: '100',
          align: 'center'
          // headerClassName: 'add-yellow'
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
      'title': '一般公共预算支出',
      'field': 'commonAmt',
      'width': '200',
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
      'title': '政府性基金预算支出',
      'field': 'govAmt',
      'width': '200',
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
      title: '暂付款项余额/（一般公共预算支出+政府性基金预算支出）',
      field: 'amtPresent',
      sortable: false,
      align: 'center',
      type: 'html',
      width: 250
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
