// import store from '@/store/index'
import store from '@/store'

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
      // // { code: 'sign', label: '疑似违规', status: 'primary' },
      { code: 'detail', label: '查看详情', status: 'primary' }
    ]
  },
  highQueryConfig: [
    {
      title: '支付申请编码',
      field: 'payApplyNumber',
      width: '8',
      align: 'left',
      formula: '',
      name: '$vxeInput',
      itemRender: {
        name: '$vxeInput',
        options: [],
        props: {
          placeholder: '支付申请编码'
        }
      }
    },
    {
      title: '规则名称',
      field: 'fiRuleName',
      width: '8',
      align: 'left',
      formula: '',
      name: '$vxeInput',
      itemRender: {
        name: '$vxeInput',
        options: [],
        props: {
          placeholder: '规则名称'
        }
      }
    },
    {
      title: '是否作废',
      field: 'voidOrNot',
      width: '8',
      align: 'left',
      formula: '',
      name: '$vxeSelect',
      itemRender: {
        name: '$vxeSelect',
        options: [
          { value: '1', label: '是' },
          { value: '2', label: '否' }
        ],
        props: {
          placeholder: '是否作废'
        }
      }
    }
  ],
  highQueryData: {
    payApplyNumber: '',
    fiRuleName: ''
  },
  PoliciesTableColumns: [
    {
      title: '年度',
      field: 'fiscalYear',
      width: '150',
      sortable: false,
      align: 'center'
    },
    {
      title: '区划',
      field: 'mofDivName',
      width: '150',
      sortable: false,
      align: 'center'
    },
    {
      title: '预警级别',
      field: 'warnLevel',
      width: '150',
      align: 'center',
      'cellRender': {
        'name': '$vxeSelect',
        options: store.state.warnInfo.warnLevelOptions.map(item => {
          return {
            ...item,
            value: String(item.value)
          }
        }),
        'defaultValue': '',
        'props': {}
      },
      'sortable': 'true',
      'name': '$vxeSelect'
    },
    {
      title: '管理级次',
      field: 'regulationType',
      width: '150',
      align: 'center',
      'cellRender': {
        'name': '$vxeSelect',
        'options': [
          {
            'value': '1',
            'label': '系统级'
          },
          {
            'value': '2',
            'label': '财政级'
          },
          {
            'value': '3',
            'label': '部门级'
          }
        ],
        'defaultValue': '',
        'props': {}
      },
      'sortable': 'true',
      'name': '$vxeSelect'
    },
    {
      title: '预算单位',
      field: 'agency',
      width: '150',
      sortable: false,
      align: 'center'
    },
    {
      title: '规则编码',
      field: 'fiRuleCode',
      width: '150',
      sortable: false,
      align: 'center'
    },
    {
      title: '规则名称',
      field: 'fiRuleName',
      width: '150',
      sortable: false,
      align: 'center'
    },
    {
      title: '处理情况',
      field: 'status',
      width: '150',
      align: 'center',
      'cellRender': {
        'name': '$vxeSelect',
        options: [
          { value: 1, label: '未处理' },
          { value: 2, label: '已处理' }
        ],
        'defaultValue': '',
        'props': {}
      },
      'sortable': 'true',
      'name': '$vxeSelect'
    },
    {
      title: '支付申请编码',
      field: 'payApplyNumber',
      width: '150',
      sortable: false,
      align: 'center'
    },
    {
      'title': '支付申请金额',
      'field': 'paymentAmount',
      'width': '150',
      'align': 'right',
      'filters': '[object Object]',
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
      'sortable': 'true',
      'associatedQuery': '',
      'className': '',
      'combinedType_select_sort': '平均值,选中合计,当前页合计,所有合计'
    },
    /* {
      title: '资金用途',
      field: 'useOfFunds',
      width: '150',
      sortable: false,
      align: 'center'
    }, */
    {
      title: '监控拦截时间',
      field: 'createTime',
      width: '150',
      sortable: false,
      align: 'center'
    },
    {
      title: '违规处理时间',
      field: 'handleTime',
      width: '150',
      sortable: false,
      align: 'center'
    },
    {
      title: '是否作废',
      field: 'voidOrNot',
      align: 'center',
      width: 180,
      cellRender: {
        name: '$vxeSelect',
        'options': [
          {
            'value': '1',
            'label': '是'
          },
          {
            'value': '2',
            'label': '否'
          }
        ],
        defaultValue: '',
        props: {}
      },
      name: '$vxeSelect'
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
