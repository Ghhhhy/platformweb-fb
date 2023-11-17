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
      { code: 'detail', label: '查看详情', status: 'primary' }
    ]
  },
  highQueryConfig: [
    {
      title: '规则名称',
      field: 'firulename',
      width: '8',
      align: 'left',
      formula: '',
      name: '$vxeInput',
      itemRender: {
        name: '$vxeInput',
        options: [],
        props: {
          placeholder: '规则名称',
          clearable: true
        }
      }
    },
    {
      title: '监控类型',
      field: 'triggerClass',
      'width': 180,
      align: 'left',
      formula: '',
      name: '$vxeSelect',
      itemRender: {
        name: '$vxeSelect',
        options: [
          { value: '0', label: '实时' },
          { value: '1', label: '定时' }
        ],
        props: {
          placeholder: '监控类型',
          clearable: true
        }
      }
    },
    {
      title: '资金用途',
      field: 'useDes',
      'width': 180,
      align: 'left',
      formula: '',
      name: '$vxeInput',
      itemRender: {
        name: '$vxeInput',
        options: [],
        props: {
          placeholder: '资金用途',
          clearable: true
        }
      }
    },
    {
      title: '业务数据开始时间',
      field: 'businessTime',
      itemRender: {
        name: '$vxeTime',
        defaultValue: '',
        props: {
          format: 'YYYY-MM-DD',
          type: 'date', // "当前日期为：YYYY-MM-DD，星期W，为第Q季度，时间为：hh:mm:ss:c"
          placeholder: '业务数据开始时间',
          clearable: true
        }
      }
    },
    {
      title: '业务数据结束时间',
      field: 'endTime',
      itemRender: {
        name: '$vxeTime',
        defaultValue: '',
        props: {
          format: 'YYYY-MM-DD',
          type: 'date', // "当前日期为：YYYY-MM-DD，星期W，为第Q季度，时间为：hh:mm:ss:c"
          placeholder: '业务数据结束时间',
          clearable: true
        }
      }
    },
    {
      title: '是否疑似违规',
      field: 'isSign',
      'width': 180,
      align: 'left',
      formula: '',
      name: '$vxeSelect',
      itemRender: {
        name: '$vxeSelect',
        options: [
          { value: 0, label: '疑点信息' },
          { value: 1, label: '正常' },
          { value: 2, label: '违规' }
        ],
        props: {
          placeholder: '是否标记',
          clearable: true
        }
      }
    },
    {
      title: '支付申请编号',
      field: 'businessNo',
      name: '$vxeInput',
      itemRender: {
        name: '$vxeInput',
        props: {
          placeholder: '支付申请编号',
          clearable: true
        }
      }
    },
    {
      title: '是否作废',
      field: 'voidOrNot',
      width: 180,
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
          placeholder: '是否作废',
          clearable: true
        }
      }
    }
  ],
  highQueryData: {
    firulename: '',
    triggerClass: '',
    useDes: '',
    businessTime: '',
    endTime: '',
    isSign: '',
    businessNo: '',
    voidOrNot: ''
  },
  PoliciesTableColumns: [
    {
      title: '是否疑似违规',
      field: 'isSign',
      'width': 180,
      align: 'left',
      formula: '',
      'cellRender': {
        'name': '$vxeSelect',
        options: [
          { value: 0, label: '疑点信息' },
          { value: 1, label: '正常' },
          { value: 2, label: '违规' }
        ],
        props: {
          placeholder: '是否标记'
        }
      }
    },
    {
      title: '规则名称',
      'width': 180,
      field: 'firulename',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '主题',
      'width': 180,
      field: 'regulationClassName',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '资金用途',
      'width': 180,
      field: 'useDes',
      sortable: false,
      filters: false,
      align: 'left'
    },
    {
      title: '支付申请编号',
      width: 180,
      field: 'businessNo',
      sortable: false,
      filters: false,
      align: 'left'
    },
    {
      title: '支付金额',
      field: 'payAppAmt',
      sortable: false,
      filters: false,
      align: 'right',
      width: 180,
      combinedType: [
        'average',
        'subTotal',
        'total',
        'totalAll'
      ],
      cellRender: { name: '$vxeMoney' }
    },
    // {
    //   title: '触发菜单',
    //   'width': 180,
    //   field: 'fromMenuName',
    //   sortable: false,
    //   filters: false,
    //   align: 'center'
    // },
    {
      title: '区划',
      'width': 180,
      field: 'mofDiv',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '预警级别',
      'width': 180,
      field: 'warnLevel',
      sortable: false,
      align: 'center',
      filters: false,
      cellRender: {
        'name': '$vxeSelect',
        options: [
          { value: 1, label: '拦截' },
          { value: 2, label: '预警' },
          { value: 3, label: '冻结' }
        ]
      }
    },
    {
      title: '管理级次',
      'width': 180,
      field: 'regulationtype',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '预算单位',
      'width': 180,
      field: 'agency',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '监控类型',
      field: 'triggerClass',
      'width': 180,
      align: 'left',
      formula: '',
      'cellRender': {
        'name': '$vxeSelect',
        options: [
          { value: 1, label: '事中触发' },
          { value: 2, label: '定时触发' }
        ],
        props: {
          placeholder: '监控类型'
        }
      }
    },
    {
      title: '监控拦截时间',
      'width': 180,
      field: 'createTime',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '业务数据开始时间',
      'width': 180,
      field: 'businessTime',
      sortable: false,
      filters: false,
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
    // {
    //   title: '违规处理时间',
    //   'width': 180,
    //   field: 'handleTime',
    //   sortable: false,
    //   filters: false,
    //   align: 'center'
    // },
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
