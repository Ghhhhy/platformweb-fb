// import store from '@/store/index'
const proconf = {
  highQueryConfig: [
    {
      title: '业务年度',
      field: 'fiscalYear',
      width: '8',
      align: 'left',
      formula: '',
      name: '$vxeSelect',
      itemRender: {
        name: '$vxeSelect',
        options: [
          { value: '2020', label: '2020年' },
          { value: '2021', label: '2021年' },
          { value: '2022', label: '2022年' }
        ],
        props: {
          placeholder: '业务年度'
        }
      }
    },
    {
      title: '专项资金',
      field: 'speTypeName',
      width: '8',
      align: 'left',
      formula: '',
      name: '$vxeInput',
      itemRender: {
        name: '$vxeInput',
        props: {
          placeholder: '专项资金'
        }
      }
    },
    {
      title: '项目名称',
      field: 'proCodeName',
      width: '8',
      align: 'left',
      formula: '',
      name: '$vxeInput',
      itemRender: {
        name: '$vxeInput',
        props: {
          placeholder: '项目名称'
        }
      }
    },
    {
      title: '处室名称',
      field: 'bgtMofDepName',
      width: '8',
      align: 'left',
      formula: '',
      name: '$vxeInput',
      itemRender: {
        name: '$vxeInput',
        props: {
          placeholder: '处室名称'
        }
      }
    }
  ],
  highQueryData: {
    mofDivCode: '',
    bgtMofDepName: '',
    speTypeName: '',
    levels: '',
    proCodeName: ''
  },
  // 红灯系统整改
  redUndoNum: [
    {
      title: '预警规则',
      field: 'rule',
      align: 'center'
    },
    {
      title: '年度',
      field: 'fiscalYear',
      sortable: false,
      align: 'center'
    },
    {
      title: '地区',
      field: 'agencyName',
      sortable: false,
      align: 'right'
    },
    {
      title: '单位处室',
      field: 'corBgtDocNo',
      sortable: false,
      align: 'center'
    },
    {
      title: '问题明细',
      field: 'makePerson',
      sortable: false,
      align: 'right'
    },
    {
      title: '预警结果',
      field: 'warnResult',
      sortable: false,
      align: 'center',
      cellRender: {
        name: '$vxeIcon1',
        props: {
          $refs: this
        }
      }
    },
    {
      title: '预警时间',
      field: 'warnTime',
      sortable: false,
      align: 'right',
      cellRender: { name: '$vxeMoney' }
    },
    {
      title: '处理结果',
      field: 'handleResult',
      sortable: false,
      align: 'right'
    },
    {
      title: '查看原文',
      field: 'show',
      sortable: false,
      align: 'right',
      color: '#4293F4',
      textDecoration: 'underline'
    },
    {
      title: '整改时间',
      field: 'makeTime',
      sortable: false,
      align: 'right'
    }
  ],
  // 黄灯系统整改
  yellowConfig: [
    {
      title: '预警规则',
      field: 'rule',
      align: 'center'
    },
    {
      title: '年度',
      field: 'fiscalYear',
      sortable: false,
      align: 'center'
    },
    {
      title: '区划名称',
      field: 'mofDivName',
      sortable: false,
      align: 'right'
    },
    {
      title: '单位名称',
      field: 'agencyName',
      sortable: false,
      align: 'center'
    },
    {
      title: '专项资金',
      field: 'spe',
      sortable: false,
      align: 'right'
    },
    {
      title: '明细',
      field: 'detail',
      sortable: false,
      align: 'right',
      color: '#4293F4',
      textDecoration: 'underline'
    },
    {
      title: '预警结果',
      field: 'warnResult',
      sortable: false,
      align: 'center',
      cellRender: {
        name: '$vxeIcon2',
        props: {
          $refs: this
        }
      }
    },
    {
      title: '预警时间',
      field: 'warnTime',
      sortable: false,
      align: 'right'
    },
    {
      title: '认定结果',
      field: 'handleResult',
      sortable: false,
      align: 'right'
    },
    {
      title: '违规类型',
      field: 'type',
      sortable: false,
      align: 'right'
    },
    {
      title: '基本情况描述',
      field: 'jbqkms',
      sortable: false,
      align: 'right'
    },
    {
      title: '整改要求',
      field: 'zgyq',
      sortable: false,
      align: 'right'
    },
    {
      title: '认定附件',
      field: 'rdfj',
      sortable: false,
      align: 'right'
    },
    {
      title: '退回金额',
      field: 'dhje',
      sortable: false,
      align: 'right',
      cellRender: { name: '$vxeMoney' }
    },
    {
      title: '调停金额',
      field: 'tdje',
      sortable: false,
      align: 'right',
      cellRender: { name: '$vxeMoney' }
    },
    {
      title: '其他金额',
      field: 'qtje',
      sortable: false,
      align: 'right',
      cellRender: { name: '$vxeMoney' }
    },
    {
      title: '认定时间',
      field: 'rdsj',
      sortable: false,
      align: 'right'
    },
    {
      title: '整改意见',
      field: 'zgyj',
      sortable: false,
      align: 'right'
    },
    {
      title: '整改附件',
      field: 'zgfj',
      sortable: false,
      align: 'right'
    },
    {
      title: '整改时间',
      field: 'zgsj',
      sortable: false,
      align: 'right'
    },
    {
      title: '是否发文',
      field: 'sffw',
      sortable: false,
      align: 'right'
    },
    {
      title: '数据说明',
      field: 'sjsm',
      sortable: false,
      align: 'right'
    }
  ],
  // 黄灯警铃-未处理
  blueUndoNumConfig: [
    {
      title: '预警规则',
      field: 'rule',
      align: 'center'
    },
    {
      title: '年度',
      field: 'fiscalYear',
      sortable: false,
      align: 'center'
    },
    {
      title: '单位',
      field: 'agencyName',
      sortable: false,
      align: 'center'
    },
    {
      title: '查看原文',
      field: 'skyw',
      sortable: false,
      align: 'right',
      color: '#4293F4',
      textDecoration: 'underline'
    },
    {
      title: '专项资金',
      field: 'spe',
      sortable: false,
      align: 'right'
    },
    {
      title: '上级文号',
      field: 'supdocno',
      sortable: false,
      align: 'right'
    },
    {
      title: '预警结果',
      field: 'warnResult',
      sortable: false,
      align: 'center',
      cellRender: {
        name: '$vxeIcon4',
        props: {
          $refs: this
        }
      }
    },
    {
      title: '下达时间',
      field: 'warnTime',
      sortable: false,
      align: 'right'
    },
    {
      title: '超时提醒',
      field: 'cstx',
      sortable: false,
      align: 'right'
    },
    {
      title: '中央下达金额',
      field: 'zrxdje',
      sortable: false,
      align: 'right',
      cellRender: { name: '$vxeMoney' }
    },
    {
      title: '省级下达金额',
      field: 'sjxdje',
      sortable: false,
      align: 'right',
      cellRender: { name: '$vxeMoney' }
    },
    {
      title: '金额',
      field: 'je',
      sortable: false,
      align: 'right',
      cellRender: { name: '$vxeMoney' }
    }
  ]
}
const statusButtons = [
  {
    code: '1',
    label: '待整改',
    iconName: 'base-all.png',
    iconNameActive: 'base-all-active.png',
    type: 'button',
    curValue: '1'
  },
  {
    code: '2',
    label: '已整改',
    iconName: 'base-all.png',
    iconNameActive: 'base-all-active.png',
    type: 'button',
    curValue: '2'
  }
]
const statusButtons1 = [
  {
    code: '3',
    label: '待认定',
    iconName: 'base-all.png',
    iconNameActive: 'base-all-active.png',
    type: 'button',
    curValue: '3'
  },
  {
    code: '4',
    label: '已认定',
    iconName: 'base-all.png',
    iconNameActive: 'base-all-active.png',
    type: 'button',
    curValue: '4'
  },
  {
    code: '5',
    label: '待整改',
    iconName: 'base-all.png',
    iconNameActive: 'base-all-active.png',
    type: 'button',
    curValue: '5'
  },
  {
    code: '6',
    label: '已整改',
    iconName: 'base-all.png',
    iconNameActive: 'base-all-active.png',
    type: 'button',
    curValue: '6'
  }
]
const statusButtons2 = [
  {
    code: '7',
    label: '全部',
    iconName: 'base-all.png',
    iconNameActive: 'base-all-active.png',
    type: 'button',
    curValue: '7'
  }
]
const curStatusButton = {
  label: '待整改',
  code: '1',
  type: 'button',
  curValue: '1'
}
const curStatusButton1 = {
  label: '已整改',
  code: '2',
  type: 'button',
  curValue: '2'
}
const curStatusButton3 = {
  label: '已认定',
  code: '3',
  type: 'button',
  curValue: '3'
}
const curStatusButton4 = {
  label: '已认定',
  code: '4',
  type: 'button',
  curValue: '4'
}
const curStatusButton5 = {
  label: '待整改',
  code: '5',
  type: 'button',
  curValue: '5'
}
const curStatusButton6 = {
  label: '已整改',
  code: '6',
  type: 'button',
  curValue: '6'
}
const curStatusButton7 = {
  label: '全部',
  code: '7',
  type: 'button',
  curValue: '7'
}
const buttons1 = {
  1: [
    {
      label: '整改审核',
      code: 'toorbar_set',
      status: 'primary'
    }
  ],
  2: [
  ],
  3: [
    {
      label: '人工认定',
      code: 'peo_set',
      status: 'primary'
    },
    {
      label: '发送公文',
      code: 'send_set'
    }
  ],
  4: [
    {
      label: '认定修改',
      code: 'peo_mof',
      status: 'primary'
    },
    {
      label: '查看日志',
      code: 'show_log'
    }
  ],
  5: [
    {
      label: '整改意见',
      code: 'zgyj',
      status: 'primary'
    },
    {
      label: '查看日志',
      code: 'show_log'
    },
    {
      label: '发送公文',
      code: 'send_set',
      status: 'primary'
    }
  ],
  6: [
    {
      label: '意见修改',
      code: 'yjxg',
      status: 'primary'
    },
    {
      label: '查看日志',
      code: 'show_log'
    }
  ],
  7: [
  ]
}
const buttons2 = {
  1: [
    {
      label: '人工认定',
      code: 'peo_set',
      status: 'primary'
    }
  ],
  2: [
    {
      label: '发送公文',
      code: 'send_set',
      status: 'primary'
    }
  ]
}
export default proconf
export {
  statusButtons,
  curStatusButton,
  buttons1,
  curStatusButton1,
  statusButtons1,
  curStatusButton3,
  curStatusButton4,
  curStatusButton5,
  curStatusButton6,
  buttons2,
  curStatusButton7,
  statusButtons2
}
