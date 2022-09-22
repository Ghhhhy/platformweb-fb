const statusButtons = [
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

const buttons = [
  {
    label: '新增',
    code: 'add',
    status: 'primary'
  },
  {
    label: '编辑',
    code: 'edit'
  }
]

export {
  statusButtons,
  curStatusButton,
  buttons
}
