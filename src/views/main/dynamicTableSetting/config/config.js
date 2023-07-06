const statusButtons = [
  {
    label: '指标额度',
    code: 'zhibiao'
  },
  {
    label: '代办事项',
    code: 'dbsx',
    curValue: 'wcl',
    options: [
      {
        label: '未处理',
        code: 'wcl'
      },
      {
        label: '已处理',
        code: 'ycl'
      },
      {
        label: '未申报',
        code: 'wsb'
      },
      {
        label: '已申报',
        code: 'ysb'
      }
    ]
  },
  {
    label: '已办事项',
    code: 'ybsx',
    curValue: 'wxf',
    options: [
      {
        label: '未下发',
        code: 'wxf'
      },
      {
        label: '已下发',
        code: 'yxf'
      }
    ]
  },
  {
    label: '全部单据',
    code: 'danju'
  }
]

const curStatusButton = {
  type: 'select',
  label: '代办事项',
  code: 'dbsx',
  curValue: 'ycl'

  // or
  // type: 'button',
  // label: '指标额度',
  // code: 'zhibiao'
}

const tabStatusNumConfigDefault = {
  'zhibiao': 0,
  'wcl': 1,
  'ycl': 3,
  'wsb': 14,
  'ysb': 13,
  'wxf': 15,
  'yxf': 12
}

const buttonsInfos = {
  'wcl': [
    {
      label: '新增还房贷首付可减少到了房间',
      code: 'add',
      status: 'primary'
    },
    {
      label: '编辑',
      code: 'edit'
    },
    {
      label: '删除',
      code: 'delete'
    }
  ],
  'ycl': [
    {
      label: '新增',
      code: 'edit'
    },
    {
      label: '删除',
      code: 'delete'
    }
  ],
  'wxf': [
    {
      label: '删除',
      code: 'delete'
    }
  ],
  'zhibiao': [
    {
      label: '指标',
      code: '指标'
    }]
}

const buttons = [
  {
    label: '新增还房贷首付可减少到了房间',
    code: 'add',
    status: 'primary'
  },
  {
    label: '编辑',
    code: 'edit'
  },
  {
    label: '删除',
    code: 'delete'
  }
]
const buttonsLong = [
  {
    label: '新增',
    code: 'add',
    status: 'primary'
  },
  {
    label: '编辑',
    code: 'edit'
  },
  {
    label: '删除',
    code: 'delete'
  }, {
    label: '添加行',
    code: 'addRow'
  },
  {
    label: '复制行',
    code: 'copyRow'
  },
  {
    label: '删除行',
    code: 'deleteRow'
  },
  {
    label: '上传',
    code: 'upload'
  },
  {
    label: '下载',
    code: 'download'
  },
  {
    label: '导入哈哈费萨法还是短发萨法',
    code: 'import'
  },
  {
    label: '导出',
    code: 'export'
  },
  {
    label: '新增2',
    code: 'add',
    status: 'primary'
  },
  {
    label: '编辑2',
    code: 'edit'
  },
  {
    label: '删除2',
    code: 'delete'
  }, {
    label: '添加行2',
    code: 'addRow'
  },
  {
    label: '复制行2',
    code: 'copyRow'
  },
  {
    label: '删除行2',
    code: 'deleteRow'
  },
  {
    label: '上传2',
    code: 'upload'
  },
  {
    label: '下载2',
    code: 'download'
  },
  {
    label: '导入2',
    code: 'import'
  },
  {
    label: '导出2',
    code: 'export'
  },
  {
    label: '新增3',
    code: 'add',
    status: 'primary'
  },
  {
    label: '编辑3',
    code: 'edit'
  },
  {
    label: '删除3',
    code: 'delete'
  }, {
    label: '添加行3',
    code: 'addRow'
  },
  {
    label: '复制行3',
    code: 'copyRow'
  }

]

const buttonsMore = [
  {
    label: '添加行',
    code: 'addRow'
  },
  {
    label: '复制行',
    code: 'copyRow'
  },
  {
    label: '删除行',
    code: 'deleteRow'
  },
  {
    label: '上传',
    code: 'upload'
  },
  {
    label: '下载',
    code: 'download'
  },
  {
    label: '导入',
    code: 'import'
  },
  {
    label: '导出',
    code: 'export'
  }]

const statusButtonsBak = [
  {
    type: 'button',
    iconName: 'base-zhibaio.png',
    iconUrl: '',
    label: '指标额度',
    code: 'zhibiao'
  },
  {
    type: 'select',
    iconName: 'base-daiban.png',
    iconUrl: '',
    label: '代办事项',
    code: 'dbsx',
    curValue: 'ycl',
    options: [
      {
        label: '未处理',
        code: 'wcl'
      },
      {
        label: '已处理',
        code: 'ycl'
      },
      {
        label: '未申报',
        code: 'wsb'
      },
      {
        label: '已申报',
        code: 'ysb'
      }]
  },
  {
    type: 'select',
    iconName: 'base-yiban.png',
    iconUrl: '',
    label: '已办事项',
    code: 'ybsx',
    curValue: 'wxf',
    options: [
      {
        label: '未下发',
        code: 'wxf'
      },
      {
        label: '已下发',
        code: 'yxf'
      }]
  },
  {
    type: 'button',
    iconName: 'base-all.png',
    iconUrl: '',
    label: '全部单据',
    code: 'danju'
  }]

const treeConfig = {
  curRadio: 'zf',
  placeholder: '请输入政府部门树',
  radioGroup: [
    {
      code: 'zf',
      label: '政府部门树'
    },
    {
      code: 'xuexiao',
      label: '学校树'
    },
    {
      code: 'jigou',
      label: '机构树'
    }
  ]
}

export {
  statusButtons,
  curStatusButton,
  buttons,
  buttonsMore,
  buttonsLong,
  tabStatusNumConfigDefault,
  buttonsInfos,
  statusButtonsBak,
  treeConfig
}
