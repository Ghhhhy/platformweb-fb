const statusButtons = [
  {
    label: '未处理未处理',
    code: 'wcl'
  },
  {
    label: '已处理未处理',
    code: 'ycl'
  },
  {
    label: '未申报未处理',
    code: 'wsb'
  },
  {
    label: '已申报',
    code: 'ysb'
  },
  {
    label: '未下发',
    code: 'wxf'
  },
  {
    label: '已下发',
    code: 'yxf'
  },
  {
    label: '未审批',
    code: 'wsp'
  },
  {
    label: '已审批',
    code: 'ysp'
  }
]

const curStatusButton = {
  label: '未处理',
  code: 'wcl'
}

const tabStatusNumConfigDefault = {
  'wcl': 1,
  'ycl': 110,
  'wsb': 14,
  'ysb': 13,
  'wxf': 15,
  'yxf': 12,
  'wsp': 5,
  'ysp': 9
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

export {
  statusButtons,
  curStatusButton,
  buttons,
  buttonsMore,
  buttonsLong,
  tabStatusNumConfigDefault
}
